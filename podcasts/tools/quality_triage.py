"""Quality triage scanner for podcast scripts.

Scores every .txt under podcasts/scripts/{challenges,chapters,appendices} on
mechanical-template indicators, stale-phrase indicators, and conversational
rhythm. Emits a ranked CSV and a markdown summary so we can prioritize the
worst offenders without reading each file by hand.

Usage:
    python podcasts/tools/quality_triage.py

Outputs:
    podcasts/tools/quality_triage_report.csv
    podcasts/tools/quality_triage_report.md
"""

from __future__ import annotations

import csv
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import List

REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPTS_ROOT = REPO_ROOT / "podcasts" / "scripts"
OUT_DIR = REPO_ROOT / "podcasts" / "tools"

# Phrases that mark the LLM-template "voice" we are trying to eliminate.
# Each phrase is weighted by how strong a signal it is.
MECHANICAL_PHRASES = {
    "has three jobs": 5,
    "Section-Level Source Map": 5,
    "name the idea": 4,
    "give the learner a move": 4,
    "show what counts as evidence": 4,
    "GitHub Docs, home, GitHub Changelog": 5,
    "Think of this as": 3,
    "The next useful detail is concrete": 4,
    "The point is not speed; the point is never losing your place": 4,
    "That is the difference between guessing and knowing": 4,
    "This is the move inside": 4,
    "Anchor this part on": 4,
    "For someone navigating by keyboard or screen reader": 3,
    "The teaching point here is not": 3,
    "The durable skill is not memorizing one screen": 4,
    "It is knowing how to find your footing when the screen changes": 4,
    "Keep it that plain": 3,
    "That is the rhythm: orient, act, verify, continue": 4,
    "Each step should leave a trace you can name": 4,
    "That small check between steps is what makes the workflow reliable": 4,
    "Put another way": 2,
    "This part earns its place because": 3,
    "Start here:": 2,
    "Then:": 2,
    "Next:": 2,
    "Last:": 2,
    "That matters in practice:": 3,
}

# Stale facts / removed framings that should not appear in the current curriculum.
STALE_PHRASES = {
    "Fork the accessibility-agents repository": 6,
    "80 AI-powered agents": 5,
    "eighty AI-powered agents": 5,
    "eighty agents": 4,
    "Build Your Agent (Capstone)": 5,
    "Build Your Own Agent": 4,
    "if you finish early": 4,
    "finish early": 3,
    "55 agents": 3,
    "fifty-five agents": 3,
    "cross-fork PR": 4,
}

# Lines that look like a transcript speaker tag.
SPEAKER_RE = re.compile(r"^\[(ALEX|JAMIE|HOST|GUEST)\]", re.IGNORECASE)
PAUSE_RE = re.compile(r"^\[PAUSE", re.IGNORECASE)


@dataclass
class FileScore:
    rel_path: str
    group: str
    line_count: int
    speaker_turns: int
    avg_paragraph_chars: float
    mech_hits: int
    mech_weight: int
    stale_hits: int
    stale_weight: int
    score: int = 0
    verdict: str = ""
    top_signals: List[str] = field(default_factory=list)


def classify(score: int, has_stale: bool) -> str:
    if score >= 40 or has_stale and score >= 20:
        return "FULL_REWRITE"
    if score >= 15:
        return "HEAVY_EDIT"
    if score >= 5 or has_stale:
        return "SURGICAL_EDIT"
    return "TOUCH_UP"


def analyze_file(path: Path) -> FileScore:
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    speaker_turns = sum(1 for ln in lines if SPEAKER_RE.match(ln))

    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    avg_para = (sum(len(p) for p in paragraphs) / len(paragraphs)) if paragraphs else 0.0

    mech_hits = 0
    mech_weight = 0
    signals: List[tuple[int, str]] = []
    for phrase, weight in MECHANICAL_PHRASES.items():
        count = len(re.findall(re.escape(phrase), text, re.IGNORECASE))
        if count:
            mech_hits += count
            mech_weight += count * weight
            signals.append((count * weight, f"{phrase} x{count}"))

    stale_hits = 0
    stale_weight = 0
    for phrase, weight in STALE_PHRASES.items():
        count = len(re.findall(re.escape(phrase), text, re.IGNORECASE))
        if count:
            stale_hits += count
            stale_weight += count * weight
            signals.append((count * weight, f"[STALE] {phrase} x{count}"))

    # Rhythm penalty: long paragraphs with no speaker tag are template-y.
    rhythm_penalty = 0
    if speaker_turns < max(8, len(lines) // 40):
        rhythm_penalty += 8
    if avg_para > 600:
        rhythm_penalty += 6

    score = mech_weight + stale_weight + rhythm_penalty

    signals.sort(reverse=True)
    top = [s for _, s in signals[:5]]

    try:
        rel = path.relative_to(SCRIPTS_ROOT).as_posix()
        group = rel.split("/", 1)[0] if "/" in rel else ""
    except ValueError:
        rel = path.as_posix()
        group = path.parent.name
    fs = FileScore(
        rel_path=rel,
        group=group,
        line_count=len(lines),
        speaker_turns=speaker_turns,
        avg_paragraph_chars=round(avg_para, 1),
        mech_hits=mech_hits,
        mech_weight=mech_weight,
        stale_hits=stale_hits,
        stale_weight=stale_weight,
        score=score,
        top_signals=top,
    )
    fs.verdict = classify(score, stale_hits > 0)
    return fs


def main() -> None:
    all_files: List[Path] = []
    for sub in ("challenges", "chapters", "appendices"):
        d = SCRIPTS_ROOT / sub
        if d.exists():
            all_files.extend(sorted(p for p in d.glob("*.txt") if p.is_file()))

    results = [analyze_file(p) for p in all_files]
    results.sort(key=lambda r: r.score, reverse=True)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    csv_path = OUT_DIR / "quality_triage_report.csv"
    md_path = OUT_DIR / "quality_triage_report.md"

    with csv_path.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow([
            "score", "verdict", "group", "rel_path", "line_count",
            "speaker_turns", "avg_paragraph_chars",
            "mech_hits", "mech_weight", "stale_hits", "stale_weight",
            "top_signals",
        ])
        for r in results:
            w.writerow([
                r.score, r.verdict, r.group, r.rel_path, r.line_count,
                r.speaker_turns, r.avg_paragraph_chars,
                r.mech_hits, r.mech_weight, r.stale_hits, r.stale_weight,
                " | ".join(r.top_signals),
            ])

    buckets = {"FULL_REWRITE": [], "HEAVY_EDIT": [], "SURGICAL_EDIT": [], "TOUCH_UP": []}
    for r in results:
        buckets[r.verdict].append(r)

    lines: List[str] = []
    lines.append("# Podcast Script Quality Triage")
    lines.append("")
    lines.append(f"Total scripts scanned: {len(results)}")
    lines.append("")
    for verdict in ("FULL_REWRITE", "HEAVY_EDIT", "SURGICAL_EDIT", "TOUCH_UP"):
        lines.append(f"- {verdict}: {len(buckets[verdict])}")
    lines.append("")
    for verdict in ("FULL_REWRITE", "HEAVY_EDIT", "SURGICAL_EDIT", "TOUCH_UP"):
        items = buckets[verdict]
        if not items:
            continue
        lines.append(f"## {verdict} ({len(items)})")
        lines.append("")
        lines.append("| Score | Group | File | Lines | Turns | Mech | Stale | Top signals |")
        lines.append("|---:|---|---|---:|---:|---:|---:|---|")
        for r in items:
            sig = "; ".join(r.top_signals) if r.top_signals else ""
            lines.append(
                f"| {r.score} | {r.group} | `{r.rel_path}` | {r.line_count} | "
                f"{r.speaker_turns} | {r.mech_weight} | {r.stale_weight} | {sig} |"
            )
        lines.append("")

    md_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {csv_path}")
    print(f"Wrote {md_path}")
    for verdict in ("FULL_REWRITE", "HEAVY_EDIT", "SURGICAL_EDIT", "TOUCH_UP"):
        print(f"  {verdict}: {len(buckets[verdict])}")


if __name__ == "__main__":
    main()
