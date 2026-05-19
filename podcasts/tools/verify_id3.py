"""Verify ID3 tags on every mp3 match the EPISODE_MAP.

Checks each entry in the map against the mp3 on disk:

    - TXXX:UUID matches entry uuid (required, immutable)
    - TXXX:TOPIC matches entry narration_id (required, immutable)
    - TXXX:LEARNING_BAND is populated
    - TPE1 / TALB / TIT2 are populated
    - TRCK present iff map has track_number
    - duration_seconds in map matches mp3 file (within 1.0 s)

Optional ``--chapters`` mode also checks for CHAP / CTOC frames (Stage 0.5+).

Run:

    python -m podcasts.tools.verify_id3
    python -m podcasts.tools.verify_id3 --chapters
    python -m podcasts.tools.verify_id3 --slug ep05-working-with-issues
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any

from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3

from podcasts.tools.episode_map import AUDIO_DIR, EpisodeMap, load


def _txxx(tags: ID3, desc: str) -> str | None:
    frame = tags.get(f"TXXX:{desc}")
    if frame is None:
        return None
    text = frame.text
    return str(text[0]) if text else None


def _text(tags: ID3, key: str) -> str | None:
    frame = tags.get(key)
    if frame is None or not getattr(frame, "text", None):
        return None
    return str(frame.text[0])


def verify_entry(
    entry: dict[str, Any],
    audio_dir: Path,
    check_chapters: bool,
) -> list[str]:
    """Return a list of failure messages. Empty list means pass."""
    errors: list[str] = []
    mp3_path = audio_dir / entry["current_filename"]
    if not mp3_path.exists():
        return [f"missing file: {mp3_path}"]
    try:
        audio = MP3(str(mp3_path))
    except ID3NoHeaderError:
        return [f"{entry['current_filename']}: no ID3 header"]
    tags = audio.tags
    if tags is None:
        return [f"{entry['current_filename']}: no ID3 tags"]

    # Identity
    got_uuid = _txxx(tags, "UUID")
    if got_uuid != entry["uuid"]:
        errors.append(f"TXXX:UUID mismatch: file={got_uuid!r} map={entry['uuid']!r}")
    got_topic = _txxx(tags, "TOPIC")
    if got_topic != entry["narration_id"]:
        errors.append(f"TXXX:TOPIC mismatch: file={got_topic!r} map={entry['narration_id']!r}")
    if not _txxx(tags, "LEARNING_BAND"):
        errors.append("TXXX:LEARNING_BAND missing")

    # Required text frames
    for key in ("TPE1", "TALB", "TIT2"):
        if not _text(tags, key):
            errors.append(f"{key} missing or empty")

    # Conditional frames
    if "track_number" in entry:
        got = _text(tags, "TRCK")
        if got != str(entry["track_number"]):
            errors.append(f"TRCK mismatch: file={got!r} map={entry['track_number']!r}")
    if entry.get("summary"):
        if not tags.getall("COMM"):
            errors.append("COMM missing despite summary in map")

    # Duration sanity
    file_dur = audio.info.length
    map_dur = entry["duration_seconds"]
    if abs(file_dur - map_dur) > 1.0:
        errors.append(f"duration drift: file={file_dur:.2f}s map={map_dur:.2f}s")

    # Chapters (Stage 0.5+)
    if check_chapters:
        if not tags.getall("CHAP"):
            errors.append("no CHAP frames")
        if not tags.getall("CTOC"):
            errors.append("no CTOC frame")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify ID3 tags against EPISODE_MAP.json")
    parser.add_argument("--slug", help="Verify only this current_slug")
    parser.add_argument("--chapters", action="store_true", help="Also require CHAP/CTOC frames")
    parser.add_argument("--audio-dir", type=Path, default=AUDIO_DIR)
    parser.add_argument("--verbose", action="store_true", help="Print pass lines too")
    args = parser.parse_args()

    emap = load()
    total = 0
    passed = 0
    failures: list[tuple[str, list[str]]] = []

    for entry in emap.episodes:
        if args.slug and entry["current_slug"] != args.slug:
            continue
        total += 1
        errs = verify_entry(entry, args.audio_dir, args.chapters)
        if errs:
            failures.append((entry["current_filename"], errs))
        else:
            passed += 1
            if args.verbose:
                print(f"PASS {entry['current_filename']}")

    print()
    print(f"checked: {total}")
    print(f"passed:  {passed}")
    print(f"failed:  {len(failures)}")
    if failures:
        print()
        for name, errs in failures[:20]:
            print(f"FAIL {name}")
            for e in errs:
                print(f"    {e}")
        if len(failures) > 20:
            print(f"  ... and {len(failures) - 20} more")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
