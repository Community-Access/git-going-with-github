#!/usr/bin/env python3
"""Backfill episode completion markers from already-verified audio outputs."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.verify_audio_inventory import (  # noqa: E402
    AUDIO_DIR,
    DEFAULT_AUDIO_DIR,
    LOGS_DIR,
    build_targets,
    verify_target,
)
from podcasts.completion_records import (  # noqa: E402
    build_record,
    record_matches,
    record_path,
    write_json,
)

COMPLETION_DIR = LOGS_DIR / "audio-complete"


def main() -> int:
    parser = argparse.ArgumentParser(description="Backfill audio completion markers")
    parser.add_argument(
        "--include-appendices",
        action="store_true",
        help="Include appendix companions when deriving markers.",
    )
    parser.add_argument(
        "--audio-dir",
        action="append",
        default=[],
        help="Additional audio directory to inspect.",
    )
    args = parser.parse_args()

    audio_dirs = [Path(path) for path in args.audio_dir] + [AUDIO_DIR, DEFAULT_AUDIO_DIR]
    deduped: list[Path] = []
    seen: set[str] = set()
    for path in audio_dirs:
        key = str(path.resolve()) if path.exists() else str(path)
        if key in seen:
            continue
        seen.add(key)
        deduped.append(path)

    targets = build_targets(include_appendices=args.include_appendices)
    COMPLETION_DIR.mkdir(parents=True, exist_ok=True)

    created = 0
    removed = 0
    for target in targets:
        result = verify_target(target, deduped, 3.0)
        issues = [
            issue
            for issue in result["issues"]
            if not issue.startswith("missing completion record")
            and not issue.startswith("completion record hash mismatch")
        ]
        marker = record_path(COMPLETION_DIR, target.slug)
        if issues:
            if marker.exists():
                marker.unlink()
                removed += 1
            old_marker = COMPLETION_DIR / f"{target.slug}.done"
            if old_marker.exists():
                old_marker.unlink()
                removed += 1
            continue
        transcript_path = Path(result["transcript"]) if result["transcript"] else None
        chapter_path = Path(result["chapter_sidecar"]) if result["chapter_sidecar"] else None
        audio_path = Path(result["audio"]) if result["audio"] else None
        segment_manifest = Path(result["segment_manifest"]) if result["segment_manifest"] else None
        script_path = Path(result["script"]) if result["script"] else None
        if not transcript_path or not chapter_path or not audio_path or not segment_manifest or not script_path:
            continue
        expected = build_record(
            slug=target.slug,
            script_path=script_path,
            transcript_path=transcript_path,
            manifest_path=segment_manifest,
            chapter_path=chapter_path,
            audio_path=audio_path,
        )
        old_marker = COMPLETION_DIR / f"{target.slug}.done"
        if not marker.exists() or not record_matches(
            json.loads(marker.read_text(encoding="utf-8-sig")),
            expected,
        ):
            write_json(marker, expected)
            created += 1
        if old_marker.exists():
            old_marker.unlink()

    print(f"Backfilled {created} completion markers; removed {removed} stale markers")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())