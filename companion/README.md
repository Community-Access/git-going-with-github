# GLOW Companion (optional, accessible front door)

The companion is the optional Flask service that sits at the edges of the Hybrid
architecture in [golden.md](../golden.md) (Option C) and [SPEC.md](../SPEC.md)
section 11. It makes a good thing nicer; it never makes a working thing necessary.

If this service is ever down, learners can still register and complete the entire
workshop on GitHub through the issue-form front door, and facilitators can still read
the admin-issue dashboard. The companion is non-critical by design.

## What it provides

- An accessible registration landing page that writes to the owned roster.
- A facilitator cohort dashboard that reads the owned roster and derived progress.
- A redacted `roster.json` endpoint for facilitator tooling.

## What it deliberately does not do

- It does not invent a parallel store of record. The only state it touches is the
  owned roster JSON, through the same contract the provisioning subsystem uses.
- It does not provision repositories directly. Provisioning is the GitHub-native
  subsystem's job (see [../admin/OWNED_PROVISIONING.md](../admin/OWNED_PROVISIONING.md)).

## Accessibility (WCAG 2.2 AA)

Every template is authored screen-reader-first and keyboard-operable:

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a visible skip link.
- Correct heading order and labeled form controls with hint and error associations
  via `aria-describedby` and `aria-invalid`.
- An error summary with in-page links to each invalid field.
- Live-region announcements for flash messages (`role="status"`, `aria-live`).
- Visible focus styles and no keyboard traps.
- No information conveyed by color alone; no emoji.
- A data table with a `caption`, `scope`-d headers, and an intro sentence.

Run a manual screen reader pass (NVDA, JAWS, VoiceOver) before any cohort, per the
project accessibility testing guidance.

## Security (OWASP-aware)

- Output is auto-escaped by Jinja2.
- Per-session CSRF tokens protect every state-changing POST.
- Facilitator actions require sign-in; the token is compared in constant time.
- Input is validated (GitHub handle regex, cohort, path enum) before any write.
- Best-effort per-IP rate limiting on registration and sign-in.
- Strict security headers: a restrictive `Content-Security-Policy` (no inline
  scripts), `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
- Secrets come only from the environment; cookies are `HttpOnly`, `SameSite=Lax`,
  and `Secure` by default.

## Configuration

All configuration is environment-driven:

| Variable | Purpose | Default |
|---|---|---|
| `COMPANION_SECRET_KEY` | Flask session signing key | random per process (set this in production) |
| `COMPANION_ROSTER_PATH` | Path to the owned `roster.json` | `roster.json` |
| `COMPANION_FACILITATOR_TOKEN` | Facilitator sign-in token | empty (dashboard locked until set) |
| `COMPANION_SECURE_COOKIES` | Set `0` only for local HTTP testing | `1` |
| `COMPANION_RATE_LIMIT_MAX` | Requests per window per IP | `10` |
| `COMPANION_RATE_LIMIT_WINDOW` | Rate-limit window in seconds | `300` |
| `PORT` | Port for the built-in dev server | `5000` |

## Run locally

```bash
cd companion
python -m venv .venv
.venv/bin/pip install -r requirements.txt    # Windows: .venv\Scripts\pip install -r requirements.txt

export COMPANION_SECRET_KEY="dev-only-not-a-real-secret"
export COMPANION_FACILITATOR_TOKEN="dev-token"
export COMPANION_SECURE_COOKIES=0
export COMPANION_ROSTER_PATH="../admin/examples/roster.example.json"

.venv/bin/python app.py
# Visit http://127.0.0.1:5000/
```

For production, serve `app:app` behind a WSGI server (for example gunicorn) and a
TLS-terminating reverse proxy, set a strong `COMPANION_SECRET_KEY`, and point
`COMPANION_ROSTER_PATH` at a working copy of the admin roster that a separate job
commits back to the admin repository.

## Test

```bash
cd companion
.venv/bin/python -m unittest discover -s tests
```

The suite covers routing, CSRF enforcement, input validation, facilitator auth,
rate limiting, roster redaction, and the accessible page shell.

## Routes

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/` | none | Redirects to `/register` |
| GET, POST | `/register` | none | Accessible registration form; writes the roster |
| GET | `/register/success` | none | Confirmation and next steps |
| GET, POST | `/login` | none | Facilitator sign-in |
| POST | `/logout` | session | Sign out |
| GET | `/dashboard` | facilitator | Cohort dashboard |
| GET | `/roster.json` | facilitator | Redacted roster JSON |
| GET | `/healthz` | none | Liveness probe |
