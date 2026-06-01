"""Optional accessible Flask companion for the GLOW workshop.

This service lives strictly at the edges (golden.md Option C, SPEC.md section 11).
It makes a good thing nicer; it never makes a working thing necessary. If it is
down, the GitHub-native issue-form front door and admin-issue dashboard carry the
entire workshop.

What it provides:
  - An accessible registration landing page that writes to the owned roster.
  - A facilitator cohort dashboard that reads the owned roster and progress.

Hard constraints honored here (SPEC.md sections 11.2, 12, 13):
  - WCAG 2.2 AA templates: landmarks, heading order, labeled controls, visible
    focus, aria-live announcements, an error summary, no keyboard traps.
  - OWASP-aware: Jinja2 autoescaping, per-session CSRF tokens, facilitator
    authentication with constant-time comparison, input validation, rate
    limiting, security headers, secrets only from the environment.
  - Stateless about anything critical: the only store of record it touches is the
    owned roster JSON, through the same contract the provisioning subsystem uses.
"""

from __future__ import annotations

import hmac
import os
import secrets
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from functools import wraps
from typing import Deque, Dict

from flask import (
    Flask,
    abort,
    flash,
    get_flashed_messages,
    redirect,
    render_template,
    request,
    session,
    url_for,
)

from roster_store import Roster, RosterError, is_valid_handle, PATHS

# In-memory, best-effort rate limiter. Good enough for a low-traffic facilitator
# front door; a multi-process deployment should front this with a shared store.
_RATE_BUCKETS: Dict[str, Deque[float]] = defaultdict(deque)


def create_app(config: Dict | None = None) -> Flask:
    app = Flask(__name__)
    app.config.update(
        SECRET_KEY=os.environ.get("COMPANION_SECRET_KEY") or secrets.token_hex(32),
        ROSTER_PATH=os.environ.get("COMPANION_ROSTER_PATH", "roster.json"),
        FACILITATOR_TOKEN=os.environ.get("COMPANION_FACILITATOR_TOKEN", ""),
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
        SESSION_COOKIE_SECURE=os.environ.get("COMPANION_SECURE_COOKIES", "1") == "1",
        RATE_LIMIT_MAX=int(os.environ.get("COMPANION_RATE_LIMIT_MAX", "10")),
        RATE_LIMIT_WINDOW=int(os.environ.get("COMPANION_RATE_LIMIT_WINDOW", "300")),
    )
    if config:
        app.config.update(config)

    register_security(app)
    register_routes(app)
    return app


# ---------------------------------------------------------------------------
# Security plumbing
# ---------------------------------------------------------------------------

def register_security(app: Flask) -> None:
    @app.after_request
    def set_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        # No inline scripts are used anywhere in the templates.
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; img-src 'self'; style-src 'self'; "
            "script-src 'self'; base-uri 'none'; form-action 'self'; "
            "frame-ancestors 'none'"
        )
        return response

    @app.context_processor
    def inject_csrf():
        return {"csrf_token": _ensure_csrf_token()}


def _ensure_csrf_token() -> str:
    token = session.get("_csrf_token")
    if not token:
        token = secrets.token_urlsafe(32)
        session["_csrf_token"] = token
    return token


def _check_csrf() -> None:
    expected = session.get("_csrf_token", "")
    provided = request.form.get("csrf_token", "")
    if not expected or not hmac.compare_digest(expected, provided):
        abort(400, description="Invalid or missing CSRF token.")


def _rate_limited(app: Flask, key: str) -> bool:
    window = app.config["RATE_LIMIT_WINDOW"]
    limit = app.config["RATE_LIMIT_MAX"]
    now = time.time()
    bucket = _RATE_BUCKETS[key]
    while bucket and now - bucket[0] > window:
        bucket.popleft()
    if len(bucket) >= limit:
        return True
    bucket.append(now)
    return False


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("facilitator"):
            return redirect(url_for("login", next=request.path))
        return view(*args, **kwargs)

    return wrapped


# ---------------------------------------------------------------------------
# Roster persistence (the only store of record the companion touches)
# ---------------------------------------------------------------------------

def load_roster(app: Flask) -> Roster:
    path = app.config["ROSTER_PATH"]
    if not os.path.exists(path):
        return Roster.empty()
    with open(path, "r", encoding="utf-8") as handle:
        return Roster.parse(handle.read())


def save_roster(app: Flask, roster: Roster) -> None:
    path = app.config["ROSTER_PATH"]
    directory = os.path.dirname(os.path.abspath(path))
    os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(roster.to_json())


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

def register_routes(app: Flask) -> None:
    @app.route("/")
    def index():
        return redirect(url_for("register"))

    @app.route("/healthz")
    def healthz():
        return {"status": "ok"}, 200

    @app.route("/register", methods=["GET", "POST"])
    def register():
        errors = []
        form = {"github_handle": "", "cohort_id": "", "path": "day1-day2"}
        if request.method == "POST":
            _check_csrf()
            if _rate_limited(app, f"register:{request.remote_addr}"):
                abort(429, description="Too many registrations from this address. Please wait and try again.")
            form["github_handle"] = (request.form.get("github_handle") or "").strip()
            form["cohort_id"] = (request.form.get("cohort_id") or "").strip()
            form["path"] = (request.form.get("path") or "day1-day2").strip()

            if not is_valid_handle(form["github_handle"]):
                errors.append(("github_handle", "Enter a valid GitHub username (letters, numbers, single hyphens)."))
            if not form["cohort_id"]:
                errors.append(("cohort_id", "Choose the cohort you are registering for."))
            if form["path"] not in PATHS:
                errors.append(("path", "Choose a valid workshop path."))

            if not errors:
                roster = load_roster(app)
                try:
                    roster.upsert(
                        {
                            "github_handle": form["github_handle"].lstrip("@"),
                            "cohort_id": form["cohort_id"],
                            "path": form["path"],
                            "provision_state": "pending",
                            "status": "awaiting-ack",
                            "registered_at": datetime.now(timezone.utc)
                            .isoformat()
                            .replace("+00:00", "Z"),
                        }
                    )
                    save_roster(app, roster)
                except RosterError as exc:
                    errors.append(("github_handle", str(exc)))
                else:
                    flash("Registration received. Your Learning Room will be provisioned shortly.", "success")
                    return redirect(url_for("register_success", handle=form["github_handle"].lstrip("@")))

        return render_template("register.html", errors=errors, form=form, paths=PATHS)

    @app.route("/register/success")
    def register_success():
        handle = request.args.get("handle", "")
        if not is_valid_handle(handle):
            handle = ""
        return render_template("register_success.html", handle=handle)

    @app.route("/login", methods=["GET", "POST"])
    def login():
        error = None
        if request.method == "POST":
            _check_csrf()
            if _rate_limited(app, f"login:{request.remote_addr}"):
                abort(429, description="Too many sign-in attempts. Please wait and try again.")
            token = request.form.get("token", "")
            expected = app.config["FACILITATOR_TOKEN"]
            if expected and hmac.compare_digest(token, expected):
                session["facilitator"] = True
                target = request.args.get("next") or url_for("dashboard")
                # Only allow local redirects.
                if not target.startswith("/"):
                    target = url_for("dashboard")
                return redirect(target)
            error = "That facilitator access token was not recognized."
        return render_template("login.html", error=error)

    @app.route("/logout", methods=["POST"])
    def logout():
        _check_csrf()
        session.pop("facilitator", None)
        flash("You have signed out.", "success")
        return redirect(url_for("login"))

    @app.route("/dashboard")
    @login_required
    def dashboard():
        roster = load_roster(app)
        cohort_filter = request.args.get("cohort", "").strip()
        learners = roster.learners
        if cohort_filter:
            learners = [l for l in learners if l["cohort_id"] == cohort_filter]
        learners = sorted(learners, key=lambda l: (l["cohort_id"], l["github_handle"].lower()))
        cohorts = sorted({l["cohort_id"] for l in roster.learners})
        summary = _summarize(roster.learners)
        return render_template(
            "dashboard.html",
            learners=learners,
            cohorts=cohorts,
            cohort_filter=cohort_filter,
            summary=summary,
        )

    @app.route("/roster.json")
    @login_required
    def roster_json():
        roster = load_roster(app)
        return roster.public_view(), 200

    @app.errorhandler(400)
    def bad_request(err):
        return render_template("error.html", code=400, message=err.description), 400

    @app.errorhandler(404)
    def not_found(err):
        return render_template("error.html", code=404, message="Page not found."), 404

    @app.errorhandler(429)
    def too_many(err):
        return render_template("error.html", code=429, message=err.description), 429


def _summarize(learners):
    summary = {"total": len(learners)}
    for learner in learners:
        key = f"provision_{learner['provision_state']}"
        summary[key] = summary.get(key, 0) + 1
        status_key = f"status_{learner['status']}"
        summary[status_key] = summary.get(status_key, 0) + 1
    return summary


# Module-level app for `flask run` / gunicorn `companion.app:app` usage.
app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")))
