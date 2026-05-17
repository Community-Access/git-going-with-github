#!/usr/bin/env python3
"""Validate a hash-backed audio completion record for a single slug."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.completion_records import (  # noqa: E402
    build_record,
    read_json,
    record_matches,
    record_path,
)
from podcasts.verify_audio_inventory import (  # noqa: E402
    AUDIO_DIR,
    DEFAULT_AUDIO_DIR,
    CHAPTERS_DIR,
    SEGMENTS_DIR,
    build_targets,
    find_audio_file,
    find_file_recursive,
)


def locate_target(slug: str):
    for target in build_targets(include_appendices=True):
        if target.slug == slug:
            return target
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description="Check an audio completion record")
    parser.add_argument("--slug", required=True, help="Episode slug to validate")
    parser.add_argument("--audio-dir", action="append", default=[], help="Additional audio directories")
    args = parser.parse_args()

    target = locate_target(args.slug)
    if not target:
        print(f"Unknown slug: {args.slug}", file=sys.stderr)
        return 1

    audio_dirs = [Path(path) for path in args.audio_dir] + [AUDIO_DIR, DEFAULT_AUDIO_DIR]
    audio_dirs = [path if path.is_absolute() else REPO_ROOT / path for path in audio_dirs]

    script_path = find_file_recursive(ROOT / "scripts", target.script_name)
    transcript_path = find_file_recursive(ROOT / "transcripts", target.transcript_name)
    segment_manifest = SEGMENTS_DIR / target.slug / "manifest.json"
    chapter_path = CHAPTERS_DIR / f"{target.slug}.json"
    audio_path = find_audio_file(target.audio_name, audio_dirs)
    completion_file = record_path(ROOT / "logs" / "audio-complete", target.slug)

    if not (
        script_path
        and transcript_path
        and chapter_path.exists()
        and audio_path
        and completion_file.exists()
    ):
        return 1

    expected = build_record(
        slug=target.slug,
        script_path=script_path,
        transcript_path=transcript_path,
        manifest_path=segment_manifest if segment_manifest.exists() else None,
        chapter_path=chapter_path,
        audio_path=audio_path,
    )
    try:
        record = read_json(completion_file)
    except Exception:
        return 1
    return 0 if record_matches(record, expected) else 1


if __name__ == "__main__":
    raise SystemExit(main())
