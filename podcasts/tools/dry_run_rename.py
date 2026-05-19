"""
Stage 3.1 - dry-run rename planner.

Read-only. Reads docs/EPISODE_MAP.json and prints/exports the rename plan:
for every episode whose `current_filename` differs from `filename`, emit
the mv pair. Touches no files.

Usage:
    python podcasts/tools/dry_run_rename.py
    python podcasts/tools/dry_run_rename.py --csv tmp-proposed-rename.csv
    python podcasts/tools/dry_run_rename.py --audio-dir podcasts/audio/kokoro-am_liam-af_jessica

Exit codes:
    0  plan is sound (every current_filename exists on disk, no target collisions)
    1  plan would fail (missing source file, target collision, archived entry with rename)
"""

# lint-no-hardcoded-slugs: allow (Stage 3 cutover tooling; reads slug values from the map)

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
MAP_PATH = REPO_ROOT / "docs" / "EPISODE_MAP.json"
DEFAULT_AUDIO_DIR = REPO_ROOT / "podcasts" / "audio" / "kokoro-am_liam-af_jessica"


def load_map(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def build_plan(emap: dict) -> list[dict]:
    plan: list[dict] = []
    for e in emap["episodes"]:
        cur = e.get("current_filename")
        new = e.get("filename")
        if not cur or not new:
            continue
        if cur == new:
            continue
        plan.append({
            "uuid": e["uuid"],
            "track_number": e.get("track_number"),
            "current_filename": cur,
            "filename": new,
            "archived": bool(e.get("archived")),
            "group": e.get("group"),
        })
    plan.sort(key=lambda r: (r.get("track_number") or 9999, r["current_filename"]))
    return plan


def validate_plan(plan: list[dict], audio_dir: Path) -> list[str]:
    errors: list[str] = []
    targets_seen: dict[str, str] = {}
    sources_seen: set[str] = set()
    on_disk = {p.name for p in audio_dir.glob("*.mp3")} if audio_dir.exists() else set()

    for row in plan:
        cur = row["current_filename"]
        new = row["filename"]
        if row["archived"]:
            errors.append(f"archived entry has rename: {cur} -> {new}")
        if cur in sources_seen:
            errors.append(f"source listed twice: {cur}")
        sources_seen.add(cur)
        if new in targets_seen and targets_seen[new] != cur:
            errors.append(f"target collision: both {targets_seen[new]} and {cur} -> {new}")
        targets_seen[new] = cur
        if on_disk and cur not in on_disk:
            errors.append(f"source missing on disk: {cur}")
        if on_disk and new in on_disk and new != cur:
            errors.append(f"target already exists on disk: {new}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Stage 3.1 dry-run rename planner")
    parser.add_argument("--map", type=Path, default=MAP_PATH)
    parser.add_argument("--audio-dir", type=Path, default=DEFAULT_AUDIO_DIR)
    parser.add_argument("--csv", type=Path, default=None, help="Write plan to this CSV path.")
    parser.add_argument("--quiet", action="store_true", help="Suppress per-row output; just summary.")
    args = parser.parse_args()

    if not args.map.exists():
        print(f"FAIL: map not found at {args.map}", file=sys.stderr)
        return 1

    emap = load_map(args.map)
    plan = build_plan(emap)
    errors = validate_plan(plan, args.audio_dir)

    print(f"== Stage 3.1 dry-run rename plan ==")
    print(f"  Map:       {args.map}")
    print(f"  Audio dir: {args.audio_dir}  ({'exists' if args.audio_dir.exists() else 'MISSING'})")
    print(f"  Renames:   {len(plan)}")
    print(f"  No-op (current==filename): {sum(1 for e in emap['episodes'] if e.get('current_filename')==e.get('filename'))}")
    print("")

    if not args.quiet:
        for row in plan:
            tn = row.get("track_number")
            tn_str = f"[t={tn:>3}]" if tn is not None else "[t=  -]"
            print(f"  {tn_str} {row['current_filename']:<60} ->  {row['filename']}")
        print("")

    if args.csv:
        with args.csv.open("w", encoding="utf-8", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=["uuid", "track_number", "group", "current_filename", "filename"])
            w.writeheader()
            for row in plan:
                w.writerow({k: row.get(k) for k in w.fieldnames})
        print(f"  CSV written: {args.csv}")

    if errors:
        print("")
        print(f"FAIL: {len(errors)} validation error(s):")
        for msg in errors[:50]:
            print(f"  - {msg}")
        return 1

    print("")
    print("OK: rename plan is internally consistent and ready to execute.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
