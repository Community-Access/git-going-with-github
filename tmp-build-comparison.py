"""Generate a transcript comparison report between the gpt-5.4 snapshot and current gpt-5.5 live scripts.

Outputs:
  podcasts/_snapshot-pre-gpt55-20260518-164221/COMPARISON.md
  podcasts/_snapshot-pre-gpt55-20260518-164221/COMPARISON.csv

Per-slug metrics: chars, lines, ALEX segments, JAMIE segments, PAUSE markers, and percent change.
"""
from __future__ import annotations

import csv
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent
SNAPSHOT = REPO / "podcasts" / "_snapshot-pre-gpt55-20260518-164221" / "scripts"
LIVE = REPO / "podcasts" / "scripts"
OUT_MD = REPO / "podcasts" / "_snapshot-pre-gpt55-20260518-164221" / "COMPARISON.md"
OUT_CSV = REPO / "podcasts" / "_snapshot-pre-gpt55-20260518-164221" / "COMPARISON.csv"

GROUPS = ("chapters", "appendices", "challenges")

ALEX_RE = re.compile(r"^\[ALEX\]\s*$", re.MULTILINE)
JAMIE_RE = re.compile(r"^\[JAMIE\]\s*$", re.MULTILINE)
PAUSE_RE = re.compile(r"^\[PAUSE\]\s*$", re.MULTILINE)


def measure(path: Path) -> dict[str, int]:
    text = path.read_text(encoding="utf-8")
    return {
        "chars": len(text),
        "lines": text.count("\n") + (0 if text.endswith("\n") else 1),
        "alex": len(ALEX_RE.findall(text)),
        "jamie": len(JAMIE_RE.findall(text)),
        "pause": len(PAUSE_RE.findall(text)),
    }


def pct(old: int, new: int) -> str:
    if old == 0:
        return "+inf%" if new else "0%"
    return f"{((new - old) / old) * 100:+.1f}%"


def collect() -> list[dict]:
    rows: list[dict] = []
    for group in GROUPS:
        snap_dir = SNAPSHOT / group
        live_dir = LIVE / group
        if not snap_dir.exists():
            continue
        for snap_file in sorted(snap_dir.glob("*.txt")):
            slug = snap_file.stem
            live_file = live_dir / snap_file.name
            if not live_file.exists():
                continue
            old = measure(snap_file)
            new = measure(live_file)
            rows.append({
                "group": group,
                "slug": slug,
                "old_chars": old["chars"],
                "new_chars": new["chars"],
                "chars_pct": pct(old["chars"], new["chars"]),
                "old_lines": old["lines"],
                "new_lines": new["lines"],
                "old_alex": old["alex"],
                "new_alex": new["alex"],
                "old_jamie": old["jamie"],
                "new_jamie": new["jamie"],
                "old_pause": old["pause"],
                "new_pause": new["pause"],
            })
    return rows


def write_csv(rows: list[dict]) -> None:
    if not rows:
        return
    with OUT_CSV.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def write_md(rows: list[dict]) -> None:
    total_old = sum(r["old_chars"] for r in rows)
    total_new = sum(r["new_chars"] for r in rows)
    lines = [
        "# gpt-5.4 -> gpt-5.5 transcript comparison",
        "",
        f"Slugs compared: {len(rows)}",
        f"Total chars before: {total_old:,}",
        f"Total chars after: {total_new:,}",
        f"Overall char change: {pct(total_old, total_new)}",
        "",
        "Per-slug metrics. Columns: chars (old -> new, %), ALEX (old -> new), JAMIE (old -> new), PAUSE (old -> new).",
        "",
        "| Group | Slug | Chars (old -> new) | Char % | ALEX | JAMIE | PAUSE |",
        "| --- | --- | --- | --- | --- | --- | --- |",
    ]
    for r in rows:
        lines.append(
            f"| {r['group']} | {r['slug']} | "
            f"{r['old_chars']:,} -> {r['new_chars']:,} | "
            f"{r['chars_pct']} | "
            f"{r['old_alex']} -> {r['new_alex']} | "
            f"{r['old_jamie']} -> {r['new_jamie']} | "
            f"{r['old_pause']} -> {r['new_pause']} |"
        )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    rows = collect()
    write_csv(rows)
    write_md(rows)
    print(f"Wrote {OUT_MD.relative_to(REPO)}")
    print(f"Wrote {OUT_CSV.relative_to(REPO)}")
    print(f"Rows: {len(rows)}")


if __name__ == "__main__":
    main()
