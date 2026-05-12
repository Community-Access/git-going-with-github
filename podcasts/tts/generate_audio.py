#!/usr/bin/env python3
"""Unified podcast audio generation entry point.

Kokoro is the production default. Piper remains available as an explicit
fallback/comparison engine.
"""

from __future__ import annotations

import argparse
import subprocess
import sys


def add_if_present(args: list[str], flag: str, value) -> None:
    if value is not None:
        args.extend([flag, str(value)])


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate podcast audio with Kokoro by default, or Piper when explicitly requested.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python -m podcasts.tts.generate_audio --dry-run\n"
            "  python -m podcasts.tts.generate_audio --start 0 --end 0 --force --audio-format mp3\n"
            "  python -m podcasts.tts.generate_audio --engine piper --start 0 --end 0 --audio-format mp3"
        ),
    )
    parser.add_argument("--engine", choices=["kokoro", "piper"], default="kokoro")
    parser.add_argument("--start", type=int, default=None, help="First episode/challenge number, inclusive")
    parser.add_argument("--end", type=int, default=None, help="Last episode/challenge number, inclusive")
    parser.add_argument("--group", choices=["all", "chapters", "challenges", "appendices"], default=None)
    parser.add_argument("--audio-format", choices=["wav", "mp3", "both"], default="mp3")
    parser.add_argument("--dry-run", action="store_true", help="Print the listening-order queue without audio synthesis")
    parser.add_argument("--force", action="store_true", help="Regenerate even when the engine supports skipping existing output")

    known, passthrough = parser.parse_known_args()
    module = "podcasts.tts.generate_all_kokoro" if known.engine == "kokoro" else "podcasts.tts.generate_all"
    command = [sys.executable, "-m", module]

    add_if_present(command, "--start", known.start)
    add_if_present(command, "--end", known.end)
    add_if_present(command, "--group", known.group)
    add_if_present(command, "--audio-format", known.audio_format)

    if known.dry_run:
                command.append("--dry-run")
    if known.force:
                command.append("--force")

    command.extend(passthrough)

    print(f"Audio engine: {known.engine}")
    print("Command: " + " ".join(command))
    return subprocess.call(command)


if __name__ == "__main__":
    raise SystemExit(main())