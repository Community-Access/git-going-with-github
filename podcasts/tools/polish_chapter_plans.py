#!/usr/bin/env python3
"""Polish LLM-emitted chapter plan titles to consistent podcast-app style.

Walks every podcasts/transcripts/**/<slug>-chapters.json file and applies
a deterministic set of fixes:

  * Strip trailing punctuation (".", "?", "!", ":").
  * Strip narrator filler prefixes ("Question:", "Let us pause on", ...).
  * Collapse internal double spaces.
  * Trim to 80 characters at a word boundary.
  * Drop chapters whose title becomes empty after cleanup.
  * Re-anchor the first chapter to startSegmentIndex 0 if the LLM missed it.

Usage:
  python podcasts/tools/polish_chapter_plans.py --all
  python podcasts/tools/polish_chapter_plans.py --slug cc-15-discover-accessibility-agents
  python podcasts/tools/polish_chapter_plans.py --check  (report only)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPTS_ROOT = ROOT / "transcripts"

NARRATOR_PREFIXES = [
    re.compile(r"^(?:question|note|aside|callout|tip|reminder|recap)\s*[:\-]\s*", re.IGNORECASE),
    re.compile(r"^let\s+(?:us|'s)\s+pause\s+on\s+", re.IGNORECASE),
    re.compile(r"^now\s+(?:we\s+)?(?:bring|turn|move|shift)\s+", re.IGNORECASE),
    re.compile(r"^(?:chapter|section|part)\s+\d+\s*[:\-\.]\s*", re.IGNORECASE),
    re.compile(r"^introduction\s*[:\-]\s*", re.IGNORECASE),
]
TRAILING_STRIP = re.compile(r"[\.\?!:;,]+$")


def polish_title(title: str) -> str:
    text = str(title or "").strip()
    text = re.sub(r"\s+", " ", text)
    for pattern in NARRATOR_PREFIXES:
        text = pattern.sub("", text).strip()
    text = TRAILING_STRIP.sub("", text).strip()
    # Strip stray surrounding quotes the model sometimes adds.
    text = text.strip("'\"")
    if len(text) > 80:
        boundary = text.rfind(" ", 0, 78)
        text = (text[:boundary] if boundary > 40 else text[:78]).rstrip() + "..."
    return text


def polish_plan(plan: dict, slug_fallback: str) -> tuple[dict, list[str]]:
    notes: list[str] = []
    chapters = plan.get("chapters") or []
    polished: list[dict] = []
    seen_index: set[int] = set()
    for chapter in chapters:
        original_title = str(chapter.get("title") or "")
        cleaned = polish_title(original_title)
        if not cleaned:
            notes.append(f"drop empty: '{original_title}'")
            continue
        seg_index = chapter.get("startSegmentIndex")
        try:
            seg_index = int(seg_index)
        except (TypeError, ValueError):
            notes.append(f"drop bad segmentIndex: '{cleaned}'")
            continue
        if seg_index in seen_index:
            notes.append(f"drop duplicate segmentIndex {seg_index}: '{cleaned}'")
            continue
        seen_index.add(seg_index)
        if cleaned != original_title:
            notes.append(f"polish: '{original_title}' -> '{cleaned}'")
        polished.append({"title": cleaned, "startSegmentIndex": seg_index})
    polished.sort(key=lambda item: item["startSegmentIndex"])
    if polished and polished[0]["startSegmentIndex"] != 0:
        notes.append(f"re-anchor first chapter from index {polished[0]['startSegmentIndex']} to 0")
        polished[0] = {**polished[0], "startSegmentIndex": 0}
    return {
        "version": int(plan.get("version") or 1),
        "slug": plan.get("slug") or slug_fallback,
        "chapters": polished,
    }, notes


def iter_chapter_files(slug: str | None) -> list[Path]:
    if not TRANSCRIPTS_ROOT.is_dir():
        return []
    out: list[Path] = []
    for path in sorted(TRANSCRIPTS_ROOT.rglob("*-chapters.json")):
        if slug and not path.name.startswith(f"{slug}-"):
            continue
        out.append(path)
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--slug")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    if not args.all and not args.slug:
        parser.error("Provide --all or --slug <name>")

    paths = iter_chapter_files(args.slug)
    if not paths:
        print("[polish_chapter_plans] No chapter plan files found.", file=sys.stderr)
        return 2

    changed = 0
    for path in paths:
        slug_fallback = path.name.replace("-chapters.json", "")
        try:
            plan = json.loads(path.read_text(encoding="utf-8-sig"))
        except json.JSONDecodeError as exc:
            print(f"[ERROR] {path}: {exc}", file=sys.stderr)
            continue
        polished, notes = polish_plan(plan, slug_fallback)
        before = json.dumps(plan.get("chapters") or [], sort_keys=True)
        after = json.dumps(polished["chapters"], sort_keys=True)
        if before != after:
            changed += 1
            verb = "WOULD WRITE" if args.check else "WROTE"
            rel = path.relative_to(ROOT.parent).as_posix()
            print(f"[{verb}] {rel}")
            for note in notes[:6]:
                print(f"    {note}")
            if not args.check:
                path.write_text(
                    json.dumps(polished, indent=2) + "\n",
                    encoding="utf-8",
                    newline="\n",
                )
    print(f"[polish_chapter_plans] {('checked' if args.check else 'polished')} {len(paths)} files; {changed} changed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
