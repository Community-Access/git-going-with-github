#!/usr/bin/env python3
"""Regenerate transcript segment JSON files from corrected script sources.

This keeps the .txt scripts as the source of truth while refreshing the
derived -segments.json files that downstream validation and tagging use.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = ROOT.parent

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.tts.generate_episode import parse_script  # noqa: E402

SCRIPTS_DIR = ROOT / "scripts"
TRANSCRIPTS_DIR = ROOT / "transcripts"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Regenerate transcript segment JSON from podcast script .txt files"
    )
    parser.add_argument("--slug", action="append", default=[], help="Limit to one or more slugs")
    parser.add_argument(
        "--group",
        choices=["chapters", "challenges", "appendices", "all"],
        default="all",
        help="Limit to one transcript group",
    )
    parser.add_argument("--dry-run", action="store_true", help="Show changes without writing files")
    return parser.parse_args()


def selected(path: Path, args: argparse.Namespace) -> bool:
    if args.group != "all":
        try:
            if path.relative_to(SCRIPTS_DIR).parts[0] != args.group:
                return False
        except ValueError:
            return False

    if args.slug:
        return path.stem in set(args.slug)
    return True


def main() -> int:
    args = parse_args()
    scripts = sorted(path for path in SCRIPTS_DIR.rglob("*.txt") if path.is_file() and selected(path, args))
    if not scripts:
        print("No matching script files found.")
        return 1

    changed = 0
    for script_path in scripts:
        rel = script_path.relative_to(SCRIPTS_DIR)
        transcript_path = TRANSCRIPTS_DIR / rel.parent / f"{script_path.stem}-segments.json"
        payload = json.dumps(parse_script(script_path.read_text(encoding="utf-8")), indent=2) + "\n"
        current = transcript_path.read_text(encoding="utf-8") if transcript_path.exists() else None
        if current == payload:
            continue
        print(f"{('DRY-RUN ' if args.dry_run else '')}update: {transcript_path.relative_to(ROOT)}")
        changed += 1
        if not args.dry_run:
            transcript_path.parent.mkdir(parents=True, exist_ok=True)
            transcript_path.write_text(payload, encoding="utf-8")

    print(f"Matched scripts: {len(scripts)}")
    print(f"Updated transcripts: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())