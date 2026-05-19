"""Stage 1.2 - compute feed ordering, track_number, and chapter <-> challenge
pairing for every entry in docs/EPISODE_MAP.json.

User-approved layout (locked 2026-05-18):

    1            ch-00 Welcome
    2..33        ch-01 cc-01 ch-02 cc-02 ... ch-16 cc-16   (16 paired blocks)
    34..39       ch-17, ch-18, ch-19, ch-20, ch-21, ch-22  (no challenges)
    40..44       cc-bonus-a..e                              (no pairs)
    45..50       ref-01..ref-06
    51..55       git-01..git-05
    56..67       tools-01..tools-12
    68..73       agents-01..agents-06
    74..75       sec-01..sec-02
    76..79       a11y-01..a11y-04

Pairing:
    cc-NN.pairs_with_uuid = ch-NN.uuid for NN = 01..16
    cc-NN.pair_order      = 1
    Everything else: pairs_with_uuid = null, pair_order unset

Idempotent. No mp3 changes are made here; the tagger picks up TRCK on the
next pass.

Run:

    python -m podcasts.tools.apply_stage_1_2
    python -m podcasts.tools.apply_stage_1_2 --dry-run
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path
from typing import Any

from podcasts.tools.episode_map import MAP_PATH, REPO_ROOT, integrity_check, load, validate

CSV_PATH = REPO_ROOT / "tmp-proposed-feed-order.csv"

# Order of appendix bands in the feed
APPENDIX_BAND_ORDER = ["ref", "git", "tools", "agents", "sec", "a11y"]


def _key_by_prefix_number(prefix: str, number: str, episodes: list[dict[str, Any]]) -> dict[str, Any]:
    for e in episodes:
        if e.get("topic_prefix") == prefix and e.get("topic_number") == number:
            return e
    raise KeyError(f"no entry for {prefix}-{number}")


def build_ordering(episodes: list[dict[str, Any]]) -> list[tuple[int, dict[str, Any], str | None]]:
    """Return list of (track_number, entry, pairs_with_uuid_or_None) in feed order."""
    by_uuid: dict[str, dict[str, Any]] = {e["uuid"]: e for e in episodes}

    # Index by (prefix, number) for fast lookup
    def find(prefix: str, number: str) -> dict[str, Any]:
        return _key_by_prefix_number(prefix, number, episodes)

    ordering: list[tuple[dict[str, Any], str | None]] = []

    # 1. ch-00 (unpaired)
    ordering.append((find("ch", "00"), None))

    # 2. ch-01..ch-16 paired with cc-01..cc-16
    for i in range(1, 17):
        nn = f"{i:02d}"
        ch = find("ch", nn)
        cc = find("cc", nn)
        ordering.append((ch, None))
        ordering.append((cc, ch["uuid"]))

    # 3. ch-17..ch-22 unpaired
    for i in range(17, 23):
        ordering.append((find("ch", f"{i:02d}"), None))

    # 4. cc-bonus-a..e unpaired
    for letter in ["a", "b", "c", "d", "e"]:
        ordering.append((find("cc-bonus", letter), None))

    # 5. Appendices grouped by band
    for band in APPENDIX_BAND_ORDER:
        # Find all entries for this band ordered by topic_number ascending
        band_entries = sorted(
            [e for e in episodes if e.get("topic_prefix") == band],
            key=lambda e: int(e["topic_number"]),
        )
        for e in band_entries:
            ordering.append((e, None))

    # Sanity: 79 entries, each unique
    assert len(ordering) == 79, f"ordering produced {len(ordering)} entries, expected 79"
    seen_uuids: set[str] = set()
    for entry, _ in ordering:
        if entry["uuid"] in seen_uuids:
            raise ValueError(f"duplicate uuid in ordering: {entry['uuid']}")
        seen_uuids.add(entry["uuid"])
    missing = set(by_uuid) - seen_uuids
    if missing:
        raise ValueError(f"ordering missed {len(missing)} uuid(s): {sorted(missing)[:5]}...")

    # Assign track numbers
    return [(i + 1, entry, pair_uuid) for i, (entry, pair_uuid) in enumerate(ordering)]


def write_csv(rows: list[tuple[int, dict[str, Any], str | None]], path: Path, by_uuid: dict[str, dict[str, Any]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "track_number",
            "filename",
            "topic_prefix",
            "learning_band",
            "title",
            "pairs_with",
        ])
        for track, entry, pair_uuid in rows:
            pair_repr = ""
            if pair_uuid:
                pair_entry = by_uuid[pair_uuid]
                pair_repr = pair_entry.get("filename", pair_entry["uuid"][:8])
            writer.writerow([
                track,
                entry.get("filename", ""),
                entry.get("topic_prefix", ""),
                entry.get("learning_band", ""),
                entry.get("title", ""),
                pair_repr,
            ])


def apply_to_map(map_data: dict[str, Any], rows: list[tuple[int, dict[str, Any], str | None]]) -> int:
    """Set track_number, pairs_with_uuid, pair_order on every entry. Returns changes."""
    # Build assignment by uuid
    assignments: dict[str, dict[str, Any]] = {}
    for track, entry, pair_uuid in rows:
        a: dict[str, Any] = {"track_number": track}
        if pair_uuid is not None:
            a["pairs_with_uuid"] = pair_uuid
            a["pair_order"] = 1
        else:
            a["pairs_with_uuid"] = None
        assignments[entry["uuid"]] = a

    changed = 0
    for entry in map_data["episodes"]:
        a = assignments[entry["uuid"]]
        before = {
            "track_number": entry.get("track_number"),
            "pairs_with_uuid": entry.get("pairs_with_uuid"),
            "pair_order": entry.get("pair_order"),
        }
        # Apply
        entry["track_number"] = a["track_number"]
        entry["pairs_with_uuid"] = a["pairs_with_uuid"]
        if "pair_order" in a:
            entry["pair_order"] = a["pair_order"]
        else:
            # Remove stale pair_order on unpaired items
            entry.pop("pair_order", None)
        after = {
            "track_number": entry.get("track_number"),
            "pairs_with_uuid": entry.get("pairs_with_uuid"),
            "pair_order": entry.get("pair_order"),
        }
        if before != after:
            changed += 1
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description="Apply Stage 1.2 ordering to the episode map")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    emap = load()
    by_uuid = {e["uuid"]: e for e in emap.episodes}

    # Pre-check: every entry must have topic_prefix/topic_number/learning_band/filename (Stage 1.1).
    missing = [e["uuid"] for e in emap.episodes if not e.get("topic_prefix") or not e.get("topic_number")]
    if missing:
        print(f"ERROR: Stage 1.1 fields missing on {len(missing)} entries. Run apply_stage_1_1 first.")
        return 1

    rows = build_ordering(emap.episodes)
    write_csv(rows, CSV_PATH, by_uuid)
    print(f"Wrote CSV: {CSV_PATH.relative_to(REPO_ROOT)}")

    if args.dry_run:
        print("\nFirst 10 rows:")
        for track, entry, pair_uuid in rows[:10]:
            pair = by_uuid[pair_uuid]["filename"] if pair_uuid else ""
            print(f"  {track:3d}  {entry['filename']:55}  pair={pair}")
        print(f"... last 5:")
        for track, entry, pair_uuid in rows[-5:]:
            print(f"  {track:3d}  {entry['filename']:55}")
        return 0

    map_data = json.loads(MAP_PATH.read_text(encoding="utf-8"))
    changed = apply_to_map(map_data, rows)
    MAP_PATH.write_text(json.dumps(map_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated EPISODE_MAP.json: {changed} entries changed.")

    # Revalidate
    emap2 = load()
    schema_errors = validate(emap2)
    if schema_errors:
        print("SCHEMA ERRORS:")
        for e in schema_errors[:10]:
            print(f"  {e}")
        return 1
    integrity_errors = integrity_check(emap2)
    if integrity_errors:
        print("INTEGRITY ERRORS:")
        for e in integrity_errors[:10]:
            print(f"  {e}")
        return 1
    print("Schema and integrity passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
