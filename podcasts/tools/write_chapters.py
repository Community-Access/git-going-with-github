"""Write CHAP and CTOC ID3 frames from podcasts/chapters/<slug>.json.

The chapter source is the authored JSON at ``podcasts/chapters/<slug>.json``:

    {
      "version": "1.2.0",
      "title": "Episode N: ...",
      "chapters": [
        {"startTime": 0, "title": "Intro"},
        {"startTime": 22, "title": "First topic"},
        ...
      ]
    }

This tool reads that file per episode in the map, computes end_time for each
chapter from the next chapter's startTime (last one ends at the mp3 duration),
and writes mutagen CHAP frames plus a single CTOC frame as the table of
contents. Idempotent: each run replaces the existing CHAP / CTOC frames.

Run:

    python -m podcasts.tools.write_chapters
    python -m podcasts.tools.write_chapters --dry-run
    python -m podcasts.tools.write_chapters --slug ep05-working-with-issues
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from mutagen.id3 import CHAP, CTOC, CTOCFlags, ID3, TIT2
from mutagen.mp3 import MP3

from podcasts.tools.episode_map import AUDIO_DIR, REPO_ROOT, EpisodeMap, load

CHAPTERS_DIR = REPO_ROOT / "podcasts" / "chapters"


def load_chapters(slug: str) -> list[dict[str, Any]]:
    path = CHAPTERS_DIR / f"{slug}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    chapters = data.get("chapters", [])
    if not chapters:
        raise ValueError(f"{path}: no chapters in file")
    for i, c in enumerate(chapters):
        if "startTime" not in c or "title" not in c:
            raise ValueError(f"{path}: chapter {i} missing startTime or title")
    # Ensure monotonically increasing startTime
    last = -1.0
    for i, c in enumerate(chapters):
        if c["startTime"] < last:
            raise ValueError(
                f"{path}: chapter {i} startTime {c['startTime']} < previous {last}"
            )
        last = float(c["startTime"])
    return chapters


def build_frames(
    chapters: list[dict[str, Any]], total_duration_seconds: float
) -> tuple[list[CHAP], CTOC]:
    """Build the CHAP list and CTOC frame from a chapters list."""
    chap_frames: list[CHAP] = []
    child_ids: list[str] = []
    total_ms = int(round(total_duration_seconds * 1000))

    for i, c in enumerate(chapters):
        start_ms = int(round(float(c["startTime"]) * 1000))
        if i + 1 < len(chapters):
            end_ms = int(round(float(chapters[i + 1]["startTime"]) * 1000))
        else:
            end_ms = total_ms
        # Clamp: end never beyond file length, never before start.
        end_ms = max(end_ms, start_ms + 1)
        end_ms = min(end_ms, total_ms)
        element_id = f"chp{i + 1:03d}"
        child_ids.append(element_id)
        chap_frames.append(
            CHAP(
                element_id=element_id,
                start_time=start_ms,
                end_time=end_ms,
                start_offset=0xFFFFFFFF,
                end_offset=0xFFFFFFFF,
                sub_frames=[TIT2(encoding=3, text=[str(c["title"])])],
            )
        )

    ctoc = CTOC(
        element_id="toc",
        flags=CTOCFlags.TOP_LEVEL | CTOCFlags.ORDERED,
        child_element_ids=child_ids,
        sub_frames=[TIT2(encoding=3, text=["Table of Contents"])],
    )
    return chap_frames, ctoc


def apply_chapters(
    mp3_path: Path, chap_frames: list[CHAP], ctoc: CTOC
) -> bool:
    """Replace existing CHAP / CTOC frames. Returns True if file changed."""
    audio = MP3(str(mp3_path))
    if audio.tags is None:
        audio.add_tags()
    tags: ID3 = audio.tags  # type: ignore[assignment]

    planned = _structural_view(chap_frames, ctoc)
    existing_chaps = sorted(
        [tags[k] for k in tags.keys() if k.startswith("CHAP:")],
        key=lambda c: str(c.element_id),
    )
    existing_ctoc = next((tags[k] for k in tags.keys() if k.startswith("CTOC:")), None)
    current = _structural_view(existing_chaps, existing_ctoc) if existing_ctoc else None

    if current == planned:
        return False

    # Remove every existing CHAP and CTOC, then add fresh.
    for key in list(tags.keys()):
        if key.startswith("CHAP:") or key == "CHAP" or key.startswith("CTOC:") or key == "CTOC":
            del tags[key]

    for chap in chap_frames:
        tags.add(chap)
    tags.add(ctoc)

    audio.save(v2_version=3)
    return True


def _structural_view(chap_frames: list[CHAP], ctoc: CTOC | None) -> tuple:
    """Stable structural representation of CHAP/CTOC for equality comparison."""

    def chap_tuple(c: CHAP) -> tuple:
        title = ""
        sub = c.sub_frames
        if sub is not None:
            tit2 = sub.get("TIT2") if hasattr(sub, "get") else None
            if tit2 is not None and getattr(tit2, "text", None):
                title = str(tit2.text[0])
        return (
            str(c.element_id),
            int(c.start_time),
            int(c.end_time),
            title,
        )

    chaps = tuple(chap_tuple(c) for c in chap_frames)
    ctoc_children: tuple = ()
    ctoc_title = ""
    if ctoc is not None:
        ctoc_children = tuple(str(x) for x in ctoc.child_element_ids)
        if ctoc.sub_frames is not None:
            tit2 = ctoc.sub_frames.get("TIT2") if hasattr(ctoc.sub_frames, "get") else None
            if tit2 is not None and getattr(tit2, "text", None):
                ctoc_title = str(tit2.text[0])
    return (chaps, ctoc_children, ctoc_title)


def run(
    emap: EpisodeMap,
    audio_dir: Path = AUDIO_DIR,
    slug_filter: str | None = None,
    dry_run: bool = False,
) -> tuple[int, int, list[str]]:
    touched = 0
    total = 0
    errors: list[str] = []

    for entry in emap.episodes:
        if slug_filter and entry["current_slug"] != slug_filter:
            continue
        total += 1
        slug = entry["current_slug"]
        mp3_path = audio_dir / entry["current_filename"]
        chapters_path = CHAPTERS_DIR / f"{slug}.json"
        if not mp3_path.exists():
            errors.append(f"missing mp3: {mp3_path}")
            continue
        if not chapters_path.exists():
            errors.append(f"missing chapters: {chapters_path}")
            continue
        try:
            chapters = load_chapters(slug)
            chap_frames, ctoc = build_frames(chapters, entry["duration_seconds"])
        except (ValueError, json.JSONDecodeError) as e:
            errors.append(f"{slug}: {e}")
            continue
        if dry_run:
            print(f"[dry-run] {entry['current_filename']}: {len(chap_frames)} chapters")
            for chap in chap_frames[:3]:
                title = chap.sub_frames["TIT2"].text[0]
                print(f"    {chap.element_id}: {chap.start_time}-{chap.end_time} ms  {title}")
            if len(chap_frames) > 3:
                print(f"    ... and {len(chap_frames) - 3} more")
            continue
        try:
            changed = apply_chapters(mp3_path, chap_frames, ctoc)
        except OSError as e:
            errors.append(f"{slug}: write failed: {e}")
            continue
        if changed:
            touched += 1
            print(f"chaptered {entry['current_filename']} ({len(chap_frames)} chapters)")

    return touched, total, errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Write CHAP/CTOC frames from chapters JSON")
    parser.add_argument("--slug", help="Only this current_slug")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--audio-dir", type=Path, default=AUDIO_DIR)
    args = parser.parse_args()

    emap = load()
    touched, total, errors = run(
        emap,
        audio_dir=args.audio_dir,
        slug_filter=args.slug,
        dry_run=args.dry_run,
    )

    print()
    print(f"considered: {total}")
    if args.dry_run:
        print("dry-run: no files changed")
    else:
        print(f"chaptered (changed): {touched}")
        print(f"already in sync: {total - touched - len(errors)}")
    if errors:
        print(f"errors: {len(errors)}")
        for msg in errors[:10]:
            print(f"  {msg}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
