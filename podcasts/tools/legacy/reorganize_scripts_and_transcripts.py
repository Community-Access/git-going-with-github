#!/usr/bin/env python3
"""Reorganize podcast scripts/transcripts into category folders.

Moves files into:
  podcasts/scripts/chapters
  podcasts/scripts/challenges
  podcasts/scripts/appendices
  podcasts/transcripts/chapters
  podcasts/transcripts/challenges
  podcasts/transcripts/appendices

Default mode is dry-run. Pass --write to apply changes.
"""

from __future__ import annotations

import argparse
import json
import shutil
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST_PATH = ROOT / "manifest.json"
CHALLENGE_CATALOG_PATH = ROOT / "build-challenge-bundles.js"
SCRIPTS_DIR = ROOT / "scripts"
TRANSCRIPTS_DIR = ROOT / "transcripts"
GROUPS = {"chapters", "challenges", "appendices"}


@dataclass(frozen=True)
class MovePlan:
    source: Path
    destination: Path


def load_manifest() -> list[dict]:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def load_challenges() -> list[dict]:
    text = CHALLENGE_CATALOG_PATH.read_text(encoding="utf-8")
    challenges: list[dict] = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("{ id: "):
            continue
        fields = {}
        for key in ("id", "slug", "title", "focus"):
            marker = f"{key}: '"
            start = stripped.find(marker)
            if start < 0:
                fields = {}
                break
            start += len(marker)
            end = stripped.find("'", start)
            if end < 0:
                fields = {}
                break
            fields[key] = stripped[start:end]
        if fields:
            challenges.append(fields)
    return challenges


def companion_group(episode: dict) -> str:
    first_source = ((episode.get("sources") or [""])[0] or "").lower()
    if first_source.startswith("appendix-"):
        return "appendices"
    return "chapters"


def expected_script_groups() -> tuple[dict[str, str], dict[str, str]]:
    file_to_group: dict[str, str] = {}
    slug_to_group: dict[str, str] = {}

    for episode in load_manifest():
        number = int(episode["number"])
        slug = str(episode["slug"])
        file_name = f"ep{number:02d}-{slug}.txt"
        group = companion_group(episode)
        file_to_group[file_name] = group
        slug_to_group[f"ep{number:02d}-{slug}"] = group

    for challenge in load_challenges():
        file_name = f"cc-{challenge['id']}-{challenge['slug']}.txt"
        file_to_group[file_name] = "challenges"
        slug_to_group[f"cc-{challenge['id']}-{challenge['slug']}"] = "challenges"

    return file_to_group, slug_to_group


def iter_candidate_files(base_dir: Path, suffix: str):
    if not base_dir.exists():
        return
    for path in base_dir.rglob(f"*{suffix}"):
        if not path.is_file():
            continue
        rel = path.relative_to(base_dir)
        if rel.parts and rel.parts[0] in GROUPS:
            # Already grouped; still yield for conflict checks.
            yield path
        else:
            yield path


def plan_script_moves(file_to_group: dict[str, str]) -> list[MovePlan]:
    plans: list[MovePlan] = []
    for path in iter_candidate_files(SCRIPTS_DIR, ".txt"):
        group = file_to_group.get(path.name)
        if not group:
            continue
        destination = SCRIPTS_DIR / group / path.name
        if path.resolve() == destination.resolve():
            continue
        plans.append(MovePlan(path, destination))
    return plans


def plan_transcript_moves(slug_to_group: dict[str, str]) -> list[MovePlan]:
    plans: list[MovePlan] = []
    for path in iter_candidate_files(TRANSCRIPTS_DIR, "-segments.json"):
        slug = path.name.replace("-segments.json", "")
        group = slug_to_group.get(slug)
        if not group:
            continue
        destination = TRANSCRIPTS_DIR / group / path.name
        if path.resolve() == destination.resolve():
            continue
        plans.append(MovePlan(path, destination))
    return plans


def apply_plans(plans: list[MovePlan], write: bool) -> tuple[int, int]:
    moved = 0
    skipped = 0
    for plan in plans:
        if plan.destination.exists() and plan.destination.resolve() != plan.source.resolve():
            skipped += 1
            print(f"SKIP (destination exists): {plan.destination}")
            continue
        print(f"MOVE: {plan.source.relative_to(ROOT)} -> {plan.destination.relative_to(ROOT)}")
        if write:
            plan.destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(plan.source), str(plan.destination))
            moved += 1
    return moved, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description="Reorganize podcast scripts/transcripts by category")
    parser.add_argument("--write", action="store_true", help="Apply filesystem changes (default is dry-run)")
    args = parser.parse_args()

    file_to_group, slug_to_group = expected_script_groups()

    for group in GROUPS:
        (SCRIPTS_DIR / group).mkdir(parents=True, exist_ok=True)
        (TRANSCRIPTS_DIR / group).mkdir(parents=True, exist_ok=True)

    script_plans = plan_script_moves(file_to_group)
    transcript_plans = plan_transcript_moves(slug_to_group)

    print(f"Script moves planned: {len(script_plans)}")
    print(f"Transcript moves planned: {len(transcript_plans)}")
    if not args.write:
        print("Dry-run only. Re-run with --write to apply.")

    moved_scripts, skipped_scripts = apply_plans(script_plans, args.write)
    moved_transcripts, skipped_transcripts = apply_plans(transcript_plans, args.write)

    print("\nSummary")
    print(f"  Scripts moved: {moved_scripts}")
    print(f"  Scripts skipped (destination existed): {skipped_scripts}")
    print(f"  Transcripts moved: {moved_transcripts}")
    print(f"  Transcripts skipped (destination existed): {skipped_transcripts}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
