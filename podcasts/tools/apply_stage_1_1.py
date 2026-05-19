# lint-no-hardcoded-slugs: allow (one-time Stage 1.1 migration tool; documents legacy slug-to-chapter mapping)
"""Stage 1.1 - populate filename, topic_prefix, topic_number, learning_band,
and title for every entry in docs/EPISODE_MAP.json.

The mapping was approved by the user in chat on 2026-05-18:

    Chapters (23):
        ep00..ep17 -> ch-00..ch-17 (mechanical)
        ep46 -> ch-18  (How Git Works: Mental Model)
        ep47 -> ch-19  (Fork and Contribute)
        ep48 -> ch-20  (Build Your Agent: Capstone)
        ep37 -> ch-21  (Contributing to Open Source)
        ep79 -> ch-22  (What Comes Next)

    Challenges (16):  cc-NN preserved as-is.
    Bonus     (5):    cc-bonus-<a..e> preserved as-is.

    Appendices (35) across six bands (ops/reach dropped, a11y added):
        ref    (6): ep18, ep19, ep20, ep38, ep42, ep43
        git    (5): ep21, ep50, ep51, ep52, ep53
        tools (12): ep22, ep23, ep24, ep25, ep26, ep27,
                    ep31, ep32, ep33, ep34, ep35, ep36
        agents (6): ep39, ep40, ep41, ep44, ep54, ep55
        sec    (2): ep28, ep29
        a11y   (4): ep30, ep45, ep49, ep56

Within each appendix band, items are numbered in ascending original
narration_id order.

The script writes:

    - tmp-proposed-stage-1-1.csv  (audit trail)
    - docs/EPISODE_MAP.json        (updated in place)

It also runs schema + integrity validation. Idempotent: rerunning produces
no diff.

Run:

    python -m podcasts.tools.apply_stage_1_1
    python -m podcasts.tools.apply_stage_1_1 --dry-run
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path
from typing import Any

from podcasts.tools.episode_map import MAP_PATH, REPO_ROOT, integrity_check, load, validate

CHAPTERS_DIR = REPO_ROOT / "podcasts" / "chapters"
CSV_PATH = REPO_ROOT / "tmp-proposed-stage-1-1.csv"

# narration_id -> chapter index 0..22
CHAPTER_ASSIGNMENTS: dict[str, int] = {
    **{f"ep{n:02d}": n for n in range(0, 18)},
    "ep46": 18,
    "ep47": 19,
    "ep48": 20,
    "ep37": 21,
    "ep79": 22,
}

# Appendix band assignments: band -> ordered list of narration_ids
APPENDIX_BANDS: dict[str, list[str]] = {
    "ref":    ["ep18", "ep19", "ep20", "ep38", "ep42", "ep43"],
    "git":    ["ep21", "ep50", "ep51", "ep52", "ep53"],
    "tools":  ["ep22", "ep23", "ep24", "ep25", "ep26", "ep27",
               "ep31", "ep32", "ep33", "ep34", "ep35", "ep36"],
    "agents": ["ep39", "ep40", "ep41", "ep44", "ep54", "ep55"],
    "sec":    ["ep28", "ep29"],
    "a11y":   ["ep30", "ep45", "ep49", "ep56"],
}

# Human label used in TIT2 titles per band
BAND_LABELS: dict[str, str] = {
    "ch": "Chapter",
    "cc": "Challenge",
    "cc-bonus": "Bonus",
    "ref": "Reference",
    "git": "Git Toolkit",
    "tools": "Tooling",
    "agents": "Agents",
    "sec": "Security",
    "a11y": "Accessibility",
}


def _descriptive_title(slug: str) -> str:
    """Pull the descriptive part of the title from podcasts/chapters/<slug>.json.

    Strips any leading 'Episode N: ', 'Challenge NN: ', or 'Challenge bonus-x: '
    prefix so we can reattach a new label.
    """
    path = CHAPTERS_DIR / f"{slug}.json"
    if not path.exists():
        # Fall back to slug words
        return slug.replace("-", " ").title()
    data = json.loads(path.read_text(encoding="utf-8"))
    raw = data.get("title") or slug
    # Strip known prefixes
    for pattern in (
        r"^Episode\s+\d+:\s*",
        r"^Challenge\s+\d+:\s*",
        r"^Challenge\s+bonus-[a-z]:\s*",
    ):
        new = re.sub(pattern, "", raw, count=1, flags=re.IGNORECASE)
        if new != raw:
            return new.strip()
    return raw.strip()


def _slug_suffix(current_slug: str) -> str:
    """Drop the leading 'epNN-', 'ccNN-', 'cc-bonus-x-' segment from the slug."""
    m = re.match(r"^(ep\d+|cc-\d+|cc-bonus-[a-z])-(.+)$", current_slug)
    if not m:
        return current_slug
    return m.group(2)


def build_assignments(emap_episodes: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Return a list of assignment rows aligned with episodes (one per entry)."""
    rows: list[dict[str, Any]] = []

    # Pre-compute appendix narration_id -> (band, index 1-based)
    appendix_lookup: dict[str, tuple[str, int]] = {}
    for band, nids in APPENDIX_BANDS.items():
        for i, nid in enumerate(nids, start=1):
            appendix_lookup[nid] = (band, i)

    for entry in emap_episodes:
        nid = entry["narration_id"]
        slug = entry["current_slug"]
        suffix = _slug_suffix(slug)
        desc = _descriptive_title(slug)

        if entry["group"] == "challenge":
            number_int = int(nid.split("-")[1])
            prefix = "cc"
            topic_number = f"{number_int:02d}"
            band = "challenge"
            filename = f"cc-{topic_number}-{suffix}.mp3"
            title = f"Challenge {topic_number}: {desc}"
        elif entry["group"] == "bonus":
            letter = nid.split("-")[-1]
            prefix = "cc-bonus"
            topic_number = letter
            band = "bonus"
            filename = f"cc-bonus-{letter}-{suffix}.mp3"
            title = f"Bonus {letter.upper()}: {desc}"
        elif nid in CHAPTER_ASSIGNMENTS:
            ch_num = CHAPTER_ASSIGNMENTS[nid]
            prefix = "ch"
            topic_number = f"{ch_num:02d}"
            band = "chapter"
            filename = f"ch-{topic_number}-{suffix}.mp3"
            title = f"Chapter {topic_number}: {desc}"
        elif nid in appendix_lookup:
            band, index = appendix_lookup[nid]
            prefix = band
            topic_number = f"{index:02d}"
            filename = f"{prefix}-{topic_number}-{suffix}.mp3"
            label = BAND_LABELS[prefix]
            title = f"{label} {topic_number}: {desc}"
        else:
            raise ValueError(
                f"Unclassified narration_id {nid!r} (slug {slug!r}). "
                "Update CHAPTER_ASSIGNMENTS or APPENDIX_BANDS."
            )

        rows.append(
            {
                "uuid": entry["uuid"],
                "current_slug": slug,
                "narration_id": nid,
                "filename": filename,
                "topic_prefix": prefix,
                "topic_number": topic_number,
                "learning_band": band,
                "title": title,
            }
        )

    return rows


def write_csv(rows: list[dict[str, Any]], path: Path) -> None:
    fieldnames = [
        "uuid",
        "current_slug",
        "narration_id",
        "filename",
        "topic_prefix",
        "topic_number",
        "learning_band",
        "title",
    ]
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def apply_to_map(map_data: dict[str, Any], rows: list[dict[str, Any]]) -> int:
    """Merge assignment rows into the map. Returns number of entries changed."""
    by_uuid = {row["uuid"]: row for row in rows}
    changed = 0
    for entry in map_data["episodes"]:
        row = by_uuid[entry["uuid"]]
        new_values = {
            "filename": row["filename"],
            "topic_prefix": row["topic_prefix"],
            "topic_number": row["topic_number"],
            "learning_band": row["learning_band"],
            "title": row["title"],
        }
        if any(entry.get(k) != v for k, v in new_values.items()):
            changed += 1
            entry.update(new_values)
    return changed


def sanity_check(rows: list[dict[str, Any]]) -> list[str]:
    errors: list[str] = []
    seen_filenames: set[str] = set()
    for row in rows:
        if row["filename"] in seen_filenames:
            errors.append(f"duplicate filename: {row['filename']}")
        seen_filenames.add(row["filename"])

    # Tally band counts
    counts: dict[str, int] = {}
    for row in rows:
        counts[row["learning_band"]] = counts.get(row["learning_band"], 0) + 1
    expected = {
        "chapter": 23,
        "challenge": 16,
        "bonus": 5,
        "ref": 6,
        "git": 5,
        "tools": 12,
        "agents": 6,
        "sec": 2,
        "a11y": 4,
    }
    for band, want in expected.items():
        got = counts.get(band, 0)
        if got != want:
            errors.append(f"band {band}: expected {want}, got {got}")
    total = sum(counts.values())
    if total != 79:
        errors.append(f"total: expected 79, got {total}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Apply Stage 1.1 assignments to the episode map")
    parser.add_argument("--dry-run", action="store_true", help="Compute and write CSV but not the map")
    args = parser.parse_args()

    emap = load()
    rows = build_assignments(emap.episodes)

    errs = sanity_check(rows)
    if errs:
        print("SANITY CHECK FAILED:")
        for e in errs:
            print(f"  {e}")
        return 1
    print(f"Sanity check passed: 79 assignments across 9 bands.")

    write_csv(rows, CSV_PATH)
    print(f"Wrote CSV: {CSV_PATH.relative_to(REPO_ROOT)}")

    if args.dry_run:
        # Preview five
        print("\nPreview (first 5):")
        for row in rows[:5]:
            print(f"  {row['current_slug']:55} -> {row['filename']:55}  {row['title']}")
        print(f"... and {len(rows) - 5} more")
        return 0

    # Apply to map
    map_data = json.loads(MAP_PATH.read_text(encoding="utf-8"))
    changed = apply_to_map(map_data, rows)
    MAP_PATH.write_text(json.dumps(map_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated EPISODE_MAP.json: {changed} entries changed.")

    # Revalidate
    emap2 = load()
    schema_errors = validate(emap2)
    if schema_errors:
        print("SCHEMA ERRORS after update:")
        for e in schema_errors[:10]:
            print(f"  {e}")
        return 1
    integrity_errors = integrity_check(emap2)
    if integrity_errors:
        print("INTEGRITY ERRORS after update:")
        for e in integrity_errors[:10]:
            print(f"  {e}")
        return 1
    print("Schema and integrity checks passed after update.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
