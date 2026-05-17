#!/usr/bin/env python3
"""Prune segment artifacts for verified completed episodes.

Safety model:
- Only prune slugs that pass check_completion_record.
- Completion records remain the source of truth after pruning.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = ROOT.parent
SEGMENTS_DIR = ROOT / "audio" / "segments"
DEFAULT_AUDIO_DIR = ROOT / "audio" / "kokoro-am_liam-af_jessica"
CHECK_SCRIPT = ROOT / "check_completion_record.py"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Prune segment folders for slugs with valid completion records"
    )
    parser.add_argument(
        "--audio-dir",
        type=Path,
        default=DEFAULT_AUDIO_DIR,
        help="Audio directory used by completion checker",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show segment folders that would be deleted without deleting",
    )
    return parser.parse_args()


def completion_ok(slug: str, audio_dir: Path) -> bool:
    result = subprocess.run(
        [
            sys.executable,
            str(CHECK_SCRIPT),
            "--slug",
            slug,
            "--audio-dir",
            str(audio_dir),
        ],
        cwd=str(REPO_ROOT),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return result.returncode == 0


def main() -> int:
    args = parse_args()
    audio_dir = args.audio_dir if args.audio_dir.is_absolute() else REPO_ROOT / args.audio_dir

    if not SEGMENTS_DIR.exists():
        print("No segments directory found; nothing to prune.")
        return 0

    checked = 0
    eligible = 0
    deleted_dirs = 0

    for slug_dir in sorted(path for path in SEGMENTS_DIR.iterdir() if path.is_dir()):
        slug = slug_dir.name
        checked += 1

        if not completion_ok(slug, audio_dir):
            continue

        eligible += 1
        if args.dry_run:
            print(f"DRY-RUN delete: {slug_dir.relative_to(REPO_ROOT)}")
        else:
            shutil.rmtree(slug_dir)
        deleted_dirs += 1

    mode = "DRY-RUN" if args.dry_run else "DONE"
    print(f"{mode}: checked={checked}, eligible={eligible}, segment_dirs_deleted={deleted_dirs}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
