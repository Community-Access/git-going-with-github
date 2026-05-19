"""
Stage 3.2 - audio rename executor.

Renames every mp3 in podcasts/audio/kokoro-am_liam-af_jessica/ from
`current_filename` to `filename` per docs/EPISODE_MAP.json. Atomic per file.
After a clean run, rewrites the map so current_filename == filename for all
entries (i.e. retires the cutover state).

Usage:
    # 1) preview (default, no FS writes):
    python podcasts/tools/rename_audio.py

    # 2) execute the renames:
    python podcasts/tools/rename_audio.py --apply

    # 3) execute and also update docs/EPISODE_MAP.json:
    python podcasts/tools/rename_audio.py --apply --finalize-map

Exit codes:
    0 success
    1 pre-flight validation failed (use dry_run_rename.py to diagnose)
    2 rename failed partway through (logged; manual recovery needed)
"""

# lint-no-hardcoded-slugs: allow (Stage 3 cutover tooling; reads slug values from the map)

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MAP_PATH = REPO_ROOT / "docs" / "EPISODE_MAP.json"
DEFAULT_AUDIO_DIR = REPO_ROOT / "podcasts" / "audio" / "kokoro-am_liam-af_jessica"
DEFAULT_CHAPTERS_DIR = REPO_ROOT / "podcasts" / "chapters"
LOG_PATH = REPO_ROOT / "tmp-rename-audit.log"


def _build_plan(emap: dict) -> list[tuple[str, str, str]]:
    """Return list of (uuid, current_filename, filename) for entries needing rename."""
    plan: list[tuple[str, str, str]] = []
    for e in emap["episodes"]:
        cur = e.get("current_filename")
        new = e.get("filename")
        if not cur or not new or cur == new:
            continue
        if e.get("archived"):
            continue
        plan.append((e["uuid"], cur, new))
    return plan


def _preflight(plan: list[tuple[str, str, str]], audio_dir: Path) -> list[str]:
    """Return list of error messages. Empty list == clean."""
    errors: list[str] = []
    if not audio_dir.exists():
        return [f"audio dir missing: {audio_dir}"]
    on_disk = {p.name for p in audio_dir.glob("*.mp3")}
    sources: set[str] = set()
    targets: dict[str, str] = {}
    for uuid, cur, new in plan:
        if cur in sources:
            errors.append(f"source listed twice: {cur}")
        sources.add(cur)
        if new in targets and targets[new] != cur:
            errors.append(f"target collision: {targets[new]} and {cur} both -> {new}")
        targets[new] = cur
        if cur not in on_disk:
            errors.append(f"source missing on disk: {cur} (uuid {uuid})")
        if new in on_disk and new != cur and new not in sources:
            # target already on disk but isn't somebody else's source
            errors.append(f"target already exists on disk: {new}")
    return errors


def _write_map_no_bom(path: Path, data: dict) -> None:
    text = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    path.write_bytes(text.encode("utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description="Stage 3.2 audio rename executor")
    parser.add_argument("--map", type=Path, default=MAP_PATH)
    parser.add_argument("--audio-dir", type=Path, default=DEFAULT_AUDIO_DIR)
    parser.add_argument("--chapters-dir", type=Path, default=DEFAULT_CHAPTERS_DIR,
                        help="Directory of per-episode chapter JSON files to rename in parallel with mp3.")
    parser.add_argument("--skip-chapters", action="store_true",
                        help="Do not rename parallel chapter JSON files.")
    parser.add_argument("--apply", action="store_true",
                        help="Actually perform the renames. Without this flag, runs in preview mode.")
    parser.add_argument("--finalize-map", action="store_true",
                        help="After successful rename, set current_filename = filename in the map.")
    args = parser.parse_args()

    if not args.map.exists():
        print(f"FAIL: map not found at {args.map}", file=sys.stderr)
        return 1

    emap = json.loads(args.map.read_text(encoding="utf-8"))
    plan = _build_plan(emap)

    mode = "APPLY" if args.apply else "PREVIEW"
    print(f"== Stage 3.2 audio rename ({mode}) ==")
    print(f"  Map:       {args.map}")
    print(f"  Audio dir: {args.audio_dir}")
    print(f"  Planned renames: {len(plan)}")

    errors = _preflight(plan, args.audio_dir)
    if errors:
        print("")
        print(f"FAIL preflight: {len(errors)} error(s):")
        for msg in errors[:30]:
            print(f"  - {msg}")
        return 1
    print("  Preflight: OK")
    print("")

    if not args.apply:
        for uuid, cur, new in plan[:10]:
            print(f"  WOULD MV  {cur}  ->  {new}")
        if len(plan) > 10:
            print(f"  ... and {len(plan) - 10} more")
        print("")
        print("PREVIEW only. Re-run with --apply to execute.")
        return 0

    # Execute. Two-phase if any rename's target equals another rename's source
    # (true rename cycles among renames are rare here but we guard with .stage temp suffix).
    sources = {cur for _, cur, _ in plan}
    targets = {new for _, _, new in plan}
    cycle_targets = sources & targets  # targets that are also sources

    with LOG_PATH.open("w", encoding="utf-8") as logf:
        logf.write(f"# Stage 3.2 audio rename log\n# audio_dir: {args.audio_dir}\n")
        try:
            # Phase 1: move all cycle-involved files to a .stage suffix first.
            for uuid, cur, new in plan:
                src = args.audio_dir / cur
                if new in cycle_targets:
                    tmp = args.audio_dir / (cur + ".stage")
                    src.rename(tmp)
                    logf.write(f"PHASE1\t{cur}\t{cur}.stage\n")
            # Phase 2: rename to final names.
            renamed_count = 0
            for uuid, cur, new in plan:
                tmp_or_cur = args.audio_dir / (cur + ".stage")
                if not tmp_or_cur.exists():
                    tmp_or_cur = args.audio_dir / cur
                dst = args.audio_dir / new
                tmp_or_cur.rename(dst)
                logf.write(f"RENAME\t{cur}\t{new}\t{uuid}\n")
                renamed_count += 1
        except Exception as exc:
            logf.write(f"ERROR\t{exc!r}\n")
            print(f"FAIL during rename: {exc!r}", file=sys.stderr)
            print(f"Audit log: {LOG_PATH}", file=sys.stderr)
            return 2

    print(f"  Renamed {renamed_count} mp3 file(s).")

    # Parallel chapter JSON rename: ep##-slug.json -> ch-##-slug.json (etc.)
    chapters_renamed = 0
    if not args.skip_chapters and args.chapters_dir.exists():
        with LOG_PATH.open("a", encoding="utf-8") as logf:
            logf.write("# chapter JSON renames\n")
            for uuid, cur, new in plan:
                cur_json = args.chapters_dir / (cur[:-4] + ".json")
                new_json = args.chapters_dir / (new[:-4] + ".json")
                if cur_json.exists() and not new_json.exists():
                    cur_json.rename(new_json)
                    logf.write(f"CHAPTER\t{cur_json.name}\t{new_json.name}\n")
                    chapters_renamed += 1
        print(f"  Renamed {chapters_renamed} chapter JSON file(s).")

    print(f"  Audit log: {LOG_PATH}")

    if args.finalize_map:
        for e in emap["episodes"]:
            cur = e.get("current_filename")
            new = e.get("filename")
            if cur and new and cur != new:
                e["current_filename"] = new
                # current_slug follows filename minus .mp3
                if new.endswith(".mp3"):
                    e["current_slug"] = new[:-4]
        _write_map_no_bom(args.map, emap)
        print(f"  Map finalized: current_filename now equals filename for all entries.")

    print("")
    print("OK: rename complete.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
