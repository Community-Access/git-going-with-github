"""Idempotent ID3 tagger driven by docs/EPISODE_MAP.json.

This tool writes only the frames whose source data is present in the map.
It is safe to run multiple times: each run brings ID3 into sync with the
current map. No frame is written more than once per run.

Frames managed by this tool (only the ones with data in the map are written):

    Always (when map has entry):
        TPE1                 fixed artist string
        TALB                 fixed album string
        TXXX:UUID            episode UUID (immutable)
        TXXX:TOPIC           narration_id (immutable: what the narrator calls it)
        TXXX:LEARNING_BAND   group or learning_band

    When map has data:
        TIT2                 title (falls back to current_slug provisional title)
        TRCK                 track_number
        COMM:eng             summary
        TDRC                 published_at year
        APIC                 cover_art (skipped when no art is supplied)

Run:

    python -m podcasts.tools.tag_id3                # tag every mp3
    python -m podcasts.tools.tag_id3 --dry-run      # show planned changes
    python -m podcasts.tools.tag_id3 --slug ep05-working-with-issues
    python -m podcasts.tools.tag_id3 --uuid 5782d363-...
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any

from mutagen.id3 import (
    COMM,
    ID3,
    ID3NoHeaderError,
    TALB,
    TDRC,
    TIT2,
    TPE1,
    TRCK,
    TXXX,
)
from mutagen.mp3 import MP3

from podcasts.tools.episode_map import AUDIO_DIR, EpisodeMap, load

SHOW_TITLE = "Git Going with GitHub"
SHOW_ARTIST = "Git Going with GitHub Team"

# Frames this tool manages. On each run, every frame listed here is removed
# from the file before the new set is written. This is what makes the tagger
# idempotent: a frame that no longer has source data in the map vanishes.
MANAGED_FRAMES = {
    "TPE1",
    "TALB",
    "TIT2",
    "TRCK",
    "COMM",
    "TDRC",
}
MANAGED_TXXX_DESCRIPTIONS = {"UUID", "TOPIC", "LEARNING_BAND"}


def _provisional_title(entry: dict[str, Any]) -> str:
    """Title to write when map has no explicit 'title' field yet.

    Uses the current slug, capitalised, as a placeholder. Stage 1.1 fills in
    real titles; the tagger reruns and overwrites this.
    """
    slug = entry["current_slug"]
    return slug.replace("-", " ").strip()


def _learning_band(entry: dict[str, Any]) -> str:
    if "learning_band" in entry:
        return entry["learning_band"]
    group = entry["group"]
    if group == "challenge":
        return "challenge"
    if group == "bonus":
        return "bonus"
    return "chapter"


def _set_txxx(tags: ID3, desc: str, value: str) -> None:
    """Replace any existing TXXX:<desc> frame with a new one."""
    key = f"TXXX:{desc}"
    if key in tags:
        del tags[key]
    tags.add(TXXX(encoding=3, desc=desc, text=[value]))


def plan_for_entry(entry: dict[str, Any]) -> dict[str, str]:
    """Build the dict of (frame_key -> intended_value) for one entry."""
    plan: dict[str, str] = {
        "TPE1": SHOW_ARTIST,
        "TALB": SHOW_TITLE,
        "TIT2": entry.get("title") or _provisional_title(entry),
        "TXXX:UUID": entry["uuid"],
        "TXXX:TOPIC": entry["narration_id"],
        "TXXX:LEARNING_BAND": _learning_band(entry),
    }
    if "track_number" in entry:
        plan["TRCK"] = str(entry["track_number"])
    if "summary" in entry and entry["summary"]:
        plan["COMM"] = entry["summary"]
    pub = entry.get("published_at")
    if pub:
        plan["TDRC"] = pub[:10]
    return plan


def apply_plan(mp3_path: Path, plan: dict[str, str]) -> bool:
    """Write the plan to ``mp3_path``. Returns True if the file was changed."""
    audio = MP3(str(mp3_path))
    if audio.tags is None:
        audio.add_tags()
    tags: ID3 = audio.tags  # type: ignore[assignment]

    # Snapshot current managed frame state to detect a no-op.
    before = _snapshot_managed_frames(tags)

    # Drop every managed frame, then re-add from plan. This guarantees that
    # removing a field from the map deletes its frame from ID3.
    for key in list(tags.keys()):
        if key in MANAGED_FRAMES:
            del tags[key]
        elif key.startswith("TXXX:") and key.split(":", 1)[1] in MANAGED_TXXX_DESCRIPTIONS:
            del tags[key]

    for key, value in plan.items():
        if key == "TPE1":
            tags.add(TPE1(encoding=3, text=[value]))
        elif key == "TALB":
            tags.add(TALB(encoding=3, text=[value]))
        elif key == "TIT2":
            tags.add(TIT2(encoding=3, text=[value]))
        elif key == "TRCK":
            tags.add(TRCK(encoding=3, text=[value]))
        elif key == "COMM":
            tags.add(COMM(encoding=3, lang="eng", desc="", text=[value]))
        elif key == "TDRC":
            tags.add(TDRC(encoding=3, text=[value]))
        elif key.startswith("TXXX:"):
            _set_txxx(tags, key.split(":", 1)[1], value)
        else:  # pragma: no cover - defensive
            raise ValueError(f"unknown frame key in plan: {key}")

    after = _snapshot_managed_frames(tags)
    changed = before != after
    if changed:
        audio.save(v2_version=3)
    return changed


def _snapshot_managed_frames(tags: ID3) -> dict[str, str]:
    snap: dict[str, str] = {}
    for key, frame in tags.items():
        if key in MANAGED_FRAMES:
            snap[key] = str(frame)
        elif key.startswith("TXXX:") and key.split(":", 1)[1] in MANAGED_TXXX_DESCRIPTIONS:
            snap[key] = str(frame)
    return snap


def run(
    emap: EpisodeMap,
    audio_dir: Path = AUDIO_DIR,
    slug_filter: str | None = None,
    uuid_filter: str | None = None,
    dry_run: bool = False,
) -> tuple[int, int, list[str]]:
    """Tag every (or filtered) mp3. Returns (touched, total, errors)."""
    touched = 0
    total = 0
    errors: list[str] = []

    for entry in emap.episodes:
        if slug_filter and entry["current_slug"] != slug_filter:
            continue
        if uuid_filter and entry["uuid"] != uuid_filter:
            continue
        total += 1
        mp3_path = audio_dir / entry["current_filename"]
        if not mp3_path.exists():
            errors.append(f"missing file: {mp3_path}")
            continue
        plan = plan_for_entry(entry)
        if dry_run:
            print(f"[dry-run] {entry['current_filename']}")
            for k, v in plan.items():
                shown = v if len(v) <= 80 else v[:77] + "..."
                print(f"    {k} = {shown}")
            continue
        try:
            changed = apply_plan(mp3_path, plan)
        except (ID3NoHeaderError, OSError) as e:
            errors.append(f"{entry['current_filename']}: {e}")
            continue
        if changed:
            touched += 1
            print(f"tagged {entry['current_filename']}")

    return touched, total, errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Idempotent ID3 tagger driven by EPISODE_MAP.json")
    parser.add_argument("--slug", help="Tag only this current_slug")
    parser.add_argument("--uuid", help="Tag only this uuid")
    parser.add_argument("--dry-run", action="store_true", help="Show planned changes, write nothing")
    parser.add_argument("--audio-dir", type=Path, default=AUDIO_DIR, help="Override audio dir")
    args = parser.parse_args()

    emap = load()
    touched, total, errors = run(
        emap,
        audio_dir=args.audio_dir,
        slug_filter=args.slug,
        uuid_filter=args.uuid,
        dry_run=args.dry_run,
    )

    print()
    print(f"considered: {total}")
    if args.dry_run:
        print("dry-run: no files changed")
    else:
        print(f"tagged (changed): {touched}")
        print(f"already in sync: {total - touched - len(errors)}")
    if errors:
        print(f"errors: {len(errors)}")
        for msg in errors[:10]:
            print(f"  {msg}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
