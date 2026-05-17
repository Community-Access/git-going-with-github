#!/usr/bin/env python3
"""Shared helpers for audio completion records."""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def record_path(completion_dir: Path, slug: str) -> Path:
    return completion_dir / f"{slug}.json"


def build_record(
    *,
    slug: str,
    script_path: Path,
    transcript_path: Path,
    manifest_path: Path | None,
    chapter_path: Path,
    audio_path: Path,
) -> dict[str, Any]:
    record: dict[str, Any] = {
        "slug": slug,
        "status": "complete",
        "verifiedAt": datetime.now(timezone.utc).isoformat(),
        "script": {
            "path": str(script_path),
            "sha256": sha256_file(script_path),
        },
        "transcript": {
            "path": str(transcript_path),
            "sha256": sha256_file(transcript_path),
        },
        "chapterSidecar": {
            "path": str(chapter_path),
            "sha256": sha256_file(chapter_path),
        },
        "audio": {
            "path": str(audio_path),
            "sha256": sha256_file(audio_path),
        },
    }
    if manifest_path is not None:
        record["segmentManifest"] = {
            "path": str(manifest_path),
            "sha256": sha256_file(manifest_path),
        }
    return record


def record_matches(record: dict[str, Any], expected: dict[str, Any]) -> bool:
    if record.get("slug") != expected.get("slug"):
        return False
    if record.get("status") != "complete":
        return False

    for key, wanted in expected.items():
        if key in {"slug", "status", "verifiedAt"}:
            continue
        if not isinstance(wanted, dict):
            continue
        actual = record.get(key) or {}
        if actual.get("sha256") != wanted.get("sha256"):
            return False
    return True


@dataclass(frozen=True)
class CompletionCheckResult:
    ok: bool
    reason: str | None = None
