"""Owned roster store for the optional Flask companion.

This is a faithful Python port of the roster contract in
.github/scripts/provisioning/roster.js (SPEC.md section 6.1). The companion
never invents a parallel state store of record: it reads and writes the same
roster JSON shape that the GitHub-native provisioning subsystem owns, so if the
companion disappears the roster is still valid and complete.

Pure, synchronous, dependency-free (standard library only) so it is trivially
unit-testable and safe to run without a network call.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

PROVISION_STATES = ("pending", "provisioned", "failed", "healed")
STATUSES = (
    "awaiting-ack",
    "active-day1",
    "day1-complete",
    "day2-released",
    "needs-info",
)
PATHS = ("day1-day2", "day2-only")

# GitHub usernames: 1-39 chars, alphanumeric or single hyphens, no leading or
# trailing hyphen. Mirrors the regex in roster.js.
_HANDLE_RE = re.compile(r"^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$")


class RosterError(ValueError):
    """Raised when roster data or an input fails validation."""


def normalize_handle(handle: str) -> str:
    return (handle or "").strip().lstrip("@").lower()


def is_valid_handle(handle: str) -> bool:
    return bool(_HANDLE_RE.match((handle or "").lstrip("@")))


def learner_key(handle: str, cohort_id: str) -> str:
    return f"{normalize_handle(handle)}@@{(cohort_id or '').strip()}"


@dataclass
class Roster:
    version: int = 1
    cohorts: List[Dict[str, Any]] = field(default_factory=list)
    learners: List[Dict[str, Any]] = field(default_factory=list)
    generated_at: Optional[str] = None

    @staticmethod
    def empty() -> "Roster":
        return Roster()

    @staticmethod
    def parse(text: Optional[str]) -> "Roster":
        if text is None or str(text).strip() == "":
            return Roster.empty()
        data = json.loads(text)
        return Roster.from_dict(data)

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "Roster":
        if not isinstance(data, dict):
            raise RosterError("Roster must be an object")
        if data.get("version") != 1:
            raise RosterError(f"Unsupported roster version: {data.get('version')}")
        learners = data.get("learners")
        if not isinstance(learners, list):
            raise RosterError("Roster.learners must be a list")
        seen = set()
        for learner in learners:
            problems = validate_learner(learner)
            if problems:
                raise RosterError(
                    f"Invalid learner {learner.get('github_handle')}: {'; '.join(problems)}"
                )
            key = learner_key(learner["github_handle"], learner["cohort_id"])
            if key in seen:
                raise RosterError(f"Duplicate learner for key {key}")
            seen.add(key)
        return Roster(
            version=1,
            cohorts=data.get("cohorts", []) or [],
            learners=learners,
            generated_at=data.get("generated_at"),
        )

    def find(self, handle: str, cohort_id: str) -> Optional[Dict[str, Any]]:
        key = learner_key(handle, cohort_id)
        for learner in self.learners:
            if learner_key(learner["github_handle"], learner["cohort_id"]) == key:
                return learner
        return None

    def upsert(self, entry: Dict[str, Any]) -> Dict[str, Any]:
        """Insert or update a learner keyed on (github_handle, cohort_id).

        Returns the stored learner record. Raises RosterError on invalid input.
        """
        candidate = {
            "github_handle": (entry.get("github_handle") or "").lstrip("@"),
            "cohort_id": entry.get("cohort_id"),
            "path": entry.get("path") or "day1-day2",
            "provision_state": entry.get("provision_state") or "pending",
            "status": entry.get("status") or "awaiting-ack",
        }
        problems = validate_learner(candidate)
        if problems:
            raise RosterError("; ".join(problems))
        existing = self.find(candidate["github_handle"], candidate["cohort_id"])
        if existing is not None:
            existing.update({k: v for k, v in entry.items() if v is not None})
            return existing
        record = {
            "github_handle": candidate["github_handle"],
            "cohort_id": candidate["cohort_id"],
            "path": candidate["path"],
            "learning_room_repo": entry.get("learning_room_repo"),
            "provision_state": candidate["provision_state"],
            "status": candidate["status"],
            "registered_at": entry.get("registered_at"),
            "last_signal_at": entry.get("last_signal_at"),
            "notes": entry.get("notes", ""),
        }
        self.learners.append(record)
        return record

    def to_json(self, now: Optional[datetime] = None) -> str:
        now = now or datetime.now(timezone.utc)
        learners = sorted(
            self.learners,
            key=lambda l: learner_key(l["github_handle"], l["cohort_id"]),
        )
        payload = {
            "version": 1,
            "generated_at": now.astimezone(timezone.utc)
            .isoformat()
            .replace("+00:00", "Z"),
            "cohorts": self.cohorts,
            "learners": learners,
        }
        return json.dumps(payload, indent=2) + "\n"

    def public_view(self) -> Dict[str, Any]:
        """Redacted view: never leaks facilitator notes."""
        return {
            "version": 1,
            "learners": [
                {
                    "github_handle": l["github_handle"],
                    "cohort_id": l["cohort_id"],
                    "path": l["path"],
                    "provision_state": l["provision_state"],
                    "status": l["status"],
                }
                for l in self.learners
            ],
        }


def validate_learner(learner: Any) -> List[str]:
    problems: List[str] = []
    if not isinstance(learner, dict):
        return ["learner must be an object"]
    if not is_valid_handle(learner.get("github_handle", "")):
        problems.append("invalid github_handle")
    if not learner.get("cohort_id"):
        problems.append("missing cohort_id")
    if learner.get("path") not in PATHS:
        problems.append(f"invalid path: {learner.get('path')}")
    if learner.get("provision_state") not in PROVISION_STATES:
        problems.append(f"invalid provision_state: {learner.get('provision_state')}")
    if learner.get("status") not in STATUSES:
        problems.append(f"invalid status: {learner.get('status')}")
    return problems
