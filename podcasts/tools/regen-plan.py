"""Emit the list of podcast slugs to regenerate, sorted by triage verdict.

Reads ``podcasts/tools/quality_triage_report.csv`` and prints slugs (one per
line, suitable for piping into ``xargs`` or capturing into ``--slug`` args for
``prepare-script-jobs.js``).

The slug is derived from the file basename without the ``.txt`` extension, so a
row ``podcasts/scripts/challenges/cc-15-discover-accessibility-agents.txt``
yields the slug ``cc-15-discover-accessibility-agents``.

Usage::

    # All FULL_REWRITE files
    python podcasts/tools/regen-plan.py

    # The 5 worst FULL_REWRITE files
    python podcasts/tools/regen-plan.py --limit 5

    # Include HEAVY_EDIT as well
    python podcasts/tools/regen-plan.py --tier FULL_REWRITE --tier HEAVY_EDIT

    # JSON for tooling
    python podcasts/tools/regen-plan.py --format json
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

DEFAULT_CSV = Path("podcasts/tools/quality_triage_report.csv")
TIERS = ["FULL_REWRITE", "HEAVY_EDIT", "SURGICAL_EDIT", "TOUCH_UP"]


def slug_from_rel_path(rel_path: str) -> str:
    return Path(rel_path).stem


def load_rows(csv_path: Path):
    if not csv_path.exists():
        print(f"Triage CSV not found: {csv_path}. Run quality_triage.py first.", file=sys.stderr)
        sys.exit(2)
    with csv_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                row["score"] = int(row.get("score") or 0)
            except ValueError:
                row["score"] = 0
            try:
                row["stale_hits"] = int(row.get("stale_hits") or 0)
            except ValueError:
                row["stale_hits"] = 0
            yield row


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--csv", type=Path, default=DEFAULT_CSV, help=f"Path to triage CSV (default: {DEFAULT_CSV}).")
    parser.add_argument(
        "--tier",
        action="append",
        choices=TIERS,
        help="Verdict tier(s) to include. Repeatable. Defaults to FULL_REWRITE.",
    )
    parser.add_argument("--group", action="append", choices=["challenges", "chapters", "appendices"], help="Restrict to one or more groups. Repeatable.")
    parser.add_argument("--limit", type=int, default=None, help="Cap the number of slugs returned.")
    parser.add_argument("--format", choices=["slugs", "json", "csv"], default="slugs", help="Output format.")
    args = parser.parse_args()

    tiers = set(args.tier or ["FULL_REWRITE"])
    groups = set(args.group or [])

    rows = [
        r for r in load_rows(args.csv)
        if r.get("verdict") in tiers and (not groups or r.get("group") in groups)
    ]
    # Highest score first so the regen pipeline tackles the worst offenders
    # before spending on cheaper-but-numerous tail items.
    rows.sort(key=lambda r: r.get("score", 0), reverse=True)
    if args.limit is not None:
        rows = rows[: args.limit]

    if args.format == "slugs":
        for r in rows:
            print(slug_from_rel_path(r["rel_path"]))
    elif args.format == "json":
        out = [
            {
                "slug": slug_from_rel_path(r["rel_path"]),
                "rel_path": r["rel_path"],
                "group": r.get("group"),
                "verdict": r.get("verdict"),
                "score": r.get("score"),
                "stale_hits": r.get("stale_hits"),
            }
            for r in rows
        ]
        json.dump(out, sys.stdout, indent=2)
        sys.stdout.write("\n")
    elif args.format == "csv":
        w = csv.writer(sys.stdout)
        w.writerow(["slug", "rel_path", "group", "verdict", "score", "stale_hits"])
        for r in rows:
            w.writerow([
                slug_from_rel_path(r["rel_path"]),
                r["rel_path"],
                r.get("group"),
                r.get("verdict"),
                r.get("score"),
                r.get("stale_hits"),
            ])

    print(f"# selected {len(rows)} slug(s) from tiers={sorted(tiers)} groups={sorted(groups) or 'ALL'}", file=sys.stderr)


if __name__ == "__main__":
    main()
