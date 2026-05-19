#!/usr/bin/env python3
"""Normalize podcast scripts to TTS-safe pure ASCII.

Kokoro and other neural TTS engines mispronounce or skip many non-ASCII
typographic characters (curly quotes, ellipsis, en-dash, em-dash, smart
apostrophes, multiplication signs, etc). This tool rewrites scripts in
place using a deterministic replacement table, then verifies the result
contains no characters above codepoint 127.

Usage:
  python podcasts/tools/normalize_ascii.py --all
  python podcasts/tools/normalize_ascii.py --slug cc-15-discover-accessibility-agents
  python podcasts/tools/normalize_ascii.py --check  (read-only audit)
"""

from __future__ import annotations

import argparse
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_ROOT = ROOT / "scripts"
TRANSCRIPTS_ROOT = ROOT / "transcripts"
SCRIPT_GROUPS = ("chapters", "challenges", "appendices")

# Deterministic typographic to ASCII map. Anything outside this map that is
# still non-ASCII after NFKD decomposition is reported as a defect and the
# normalizer falls back to a safe replacement.
REPLACEMENTS = {
    # Curly single quotes / apostrophes
    "\u2018": "'", "\u2019": "'", "\u201A": "'", "\u201B": "'",
    "\u2032": "'", "\u2035": "'",
    # Curly double quotes
    "\u201C": '"', "\u201D": '"', "\u201E": '"', "\u201F": '"',
    "\u2033": '"', "\u2036": '"',
    # Dashes
    "\u2010": "-", "\u2011": "-", "\u2012": "-", "\u2013": " - ",
    "\u2014": " - ", "\u2015": " - ", "\u2212": "-",
    # Ellipsis
    "\u2026": "...",
    # Bullets, middle dot
    "\u2022": "-", "\u2023": "-", "\u2043": "-", "\u00B7": "-",
    # Non-breaking and exotic spaces
    "\u00A0": " ", "\u2002": " ", "\u2003": " ", "\u2004": " ",
    "\u2005": " ", "\u2006": " ", "\u2007": " ", "\u2008": " ",
    "\u2009": " ", "\u200A": " ", "\u202F": " ", "\u205F": " ",
    "\u3000": " ",
    # Zero-width / direction marks (strip entirely)
    "\u200B": "", "\u200C": "", "\u200D": "", "\u2060": "",
    "\uFEFF": "", "\u200E": "", "\u200F": "",
    # Math / typography
    "\u00D7": "x", "\u00F7": "/", "\u2044": "/",
    "\u00B1": "+/-", "\u2248": "approximately",
    "\u2260": "not equal to", "\u2264": "<=", "\u2265": ">=",
    # Arrows
    "\u2190": "<-", "\u2192": "->", "\u2194": "<->",
    "\u21D0": "<=", "\u21D2": "=>", "\u21D4": "<=>",
    # Common symbols
    "\u00A9": "(c)", "\u00AE": "(R)", "\u2122": "(TM)",
    "\u00B0": " degrees", "\u00A7": "section", "\u00B6": "paragraph",
    "\u20AC": "EUR", "\u00A3": "GBP", "\u00A5": "JPY", "\u00A2": "cents",
    # Fractions
    "\u00BC": "1/4", "\u00BD": "1/2", "\u00BE": "3/4",
    "\u2153": "1/3", "\u2154": "2/3",
    # Ligatures
    "\uFB00": "ff", "\uFB01": "fi", "\uFB02": "fl",
    "\uFB03": "ffi", "\uFB04": "ffl",
}


def replace_known(text: str) -> tuple[str, dict[str, int]]:
    counts: dict[str, int] = {}
    chars: list[str] = []
    for ch in text:
        if ch in REPLACEMENTS:
            counts[ch] = counts.get(ch, 0) + 1
            chars.append(REPLACEMENTS[ch])
        else:
            chars.append(ch)
    return "".join(chars), counts


def fallback_decompose(text: str) -> tuple[str, list[tuple[str, str]]]:
    """For anything still non-ASCII, NFKD-decompose then strip combining marks.

    Returns the cleaned text plus a list of (original_char, replacement) pairs
    for reporting. Characters that decompose to empty or remain non-ASCII are
    replaced with '?' as a last resort.
    """
    out: list[str] = []
    notes: list[tuple[str, str]] = []
    for ch in text:
        if ord(ch) < 128:
            out.append(ch)
            continue
        decomposed = unicodedata.normalize("NFKD", ch)
        stripped = "".join(c for c in decomposed if unicodedata.category(c) != "Mn")
        if all(ord(c) < 128 for c in stripped) and stripped:
            out.append(stripped)
            notes.append((ch, stripped))
        else:
            out.append("?")
            notes.append((ch, "?"))
    return "".join(out), notes


def normalize_text(text: str) -> tuple[str, dict[str, int], list[tuple[str, str]]]:
    text1, counts = replace_known(text)
    text2, fallback_notes = fallback_decompose(text1)
    return text2, counts, fallback_notes


def iter_script_paths(slug: str | None) -> list[Path]:
    paths: list[Path] = []
    for group in SCRIPT_GROUPS:
        group_dir = SCRIPTS_ROOT / group
        if not group_dir.is_dir():
            continue
        for path in sorted(group_dir.glob("*.txt")):
            # Skip sidecar / backup files like .gpt54.txt
            stem_parts = path.name.split(".")
            if len(stem_parts) > 2:
                continue
            if slug and path.stem != slug:
                continue
            paths.append(path)
    return paths


def iter_chapter_plan_paths(slug: str | None) -> list[Path]:
    if not TRANSCRIPTS_ROOT.is_dir():
        return []
    paths: list[Path] = []
    for path in sorted(TRANSCRIPTS_ROOT.rglob("*-chapters.json")):
        if slug and not path.name.startswith(f"{slug}-"):
            continue
        paths.append(path)
    return paths


def process(path: Path, write: bool) -> dict:
    original = path.read_text(encoding="utf-8")
    cleaned, counts, fallback_notes = normalize_text(original)
    changed = cleaned != original
    nonascii_remaining = [ch for ch in cleaned if ord(ch) > 127]
    if changed and write:
        path.write_text(cleaned, encoding="utf-8", newline="\n")
    return {
        "path": str(path.relative_to(ROOT.parent).as_posix()),
        "changed": changed,
        "replacements": {f"U+{ord(k):04X}": v for k, v in sorted(counts.items())},
        "fallback_notes": [
            {"from": f"U+{ord(a):04X}", "to": b} for a, b in fallback_notes[:20]
        ],
        "still_non_ascii": len(nonascii_remaining),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--all", action="store_true", help="Process every script under podcasts/scripts/<group>/")
    parser.add_argument("--slug", help="Process a single script by its stem (e.g. cc-15-discover-accessibility-agents)")
    parser.add_argument("--check", action="store_true", help="Read-only; report what would change without writing")
    args = parser.parse_args()

    if not args.all and not args.slug:
        parser.error("Provide --all or --slug <name>")

    paths = iter_script_paths(args.slug)
    chapter_paths = iter_chapter_plan_paths(args.slug)
    all_paths = paths + chapter_paths
    if not all_paths:
        print(f"[normalize_ascii] No matching scripts found.", file=sys.stderr)
        return 2

    write = not args.check
    changed_count = 0
    leftover_count = 0
    for path in all_paths:
        result = process(path, write=write)
        if result["changed"]:
            changed_count += 1
            replacements = result["replacements"]
            summary = ", ".join(f"{k} x{v}" for k, v in list(replacements.items())[:6]) or "(decompose-only)"
            verb = "WROTE" if write else "WOULD WRITE"
            print(f"[{verb}] {result['path']}: {summary}")
            if result["fallback_notes"]:
                preview = ", ".join(f"{n['from']}->'{n['to']}'" for n in result["fallback_notes"][:5])
                print(f"    fallback: {preview}")
        if result["still_non_ascii"]:
            leftover_count += result["still_non_ascii"]
            print(f"[WARN]  {result['path']} still has {result['still_non_ascii']} non-ASCII chars after normalization")

    mode = "checked" if args.check else "normalized"
    print(f"[normalize_ascii] {mode} {len(all_paths)} files ({len(paths)} scripts + {len(chapter_paths)} chapter plans); {changed_count} would change; {leftover_count} non-ASCII chars remain.")
    return 1 if leftover_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
