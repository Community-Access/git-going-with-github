from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST_PATH = ROOT / "manifest.json"
CONFIG_LISTENING_ORDER_PATH = ROOT / "config" / "listening-order.json"
LEGACY_LISTENING_ORDER_PATH = ROOT / "listening-order.json"
CHALLENGE_CATALOG_PATH = ROOT / "build-challenge-bundles.js"


@dataclass(frozen=True)
class ListeningTarget:
    kind: str
    group: str
    slug: str
    title: str
    script_name: str
    transcript_name: str
    audio_name: str
    sequence: int
    section: str


def load_manifest(path: Path = MANIFEST_PATH) -> list[dict]:
    return json.loads(path.read_text(encoding="utf-8"))


def listening_order_path() -> Path:
    return CONFIG_LISTENING_ORDER_PATH if CONFIG_LISTENING_ORDER_PATH.exists() else LEGACY_LISTENING_ORDER_PATH


def load_listening_order() -> list[dict]:
    path = listening_order_path()
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def load_challenges(path: Path = CHALLENGE_CATALOG_PATH) -> dict[str, dict]:
    text = path.read_text(encoding="utf-8")
    results: dict[str, dict] = {}
    pattern = re.compile(r"\{ id: '([^']+)', slug: '([^']+)', title: '([^']+)', day: '([^']+)', .*? focus: '([^']+)' \}")
    for match in pattern.finditer(text):
        challenge = {
            "id": match.group(1),
            "slug": match.group(2),
            "title": match.group(3),
            "day": match.group(4),
            "focus": match.group(5),
        }
        audio_slug = f"cc-{challenge['id']}-{challenge['slug']}"
        results[audio_slug] = challenge
    return results


def companion_group(episode: dict) -> str:
    source = ((episode.get("sources") or [""])[0] or "").lower()
    return "appendices" if source.startswith("appendix-") else "chapters"


def companion_audio_name(episode: dict) -> str:
    number = int(episode["number"])
    return episode.get("audio") or f"ep{number:02d}-{episode['slug']}.mp3"


def companion_target(episode: dict, sequence: int, section: str) -> ListeningTarget:
    number = int(episode["number"])
    ep_slug = str(episode["slug"])
    audio_name = companion_audio_name(episode)
    audio_slug = Path(audio_name).stem
    return ListeningTarget(
        kind="companion",
        group=companion_group(episode),
        slug=audio_slug,
        title=f"Episode {number}: {episode['title']}",
        script_name=f"ep{number:02d}-{ep_slug}.txt",
        transcript_name=f"ep{number:02d}-{ep_slug}-segments.json",
        audio_name=audio_name,
        sequence=sequence,
        section=section,
    )


def challenge_target(challenge: dict, sequence: int, section: str) -> ListeningTarget:
    file_stub = f"cc-{challenge['id']}-{challenge['slug']}"
    return ListeningTarget(
        kind="challenge",
        group="challenges",
        slug=file_stub,
        title=f"Challenge {challenge['id']}: {challenge['title']}",
        script_name=f"{file_stub}.txt",
        transcript_name=f"{file_stub}-segments.json",
        audio_name=f"{file_stub}.mp3",
        sequence=sequence,
        section=section,
    )


def build_listening_targets(include_appendices: bool = True) -> list[ListeningTarget]:
    manifest = load_manifest()
    challenges = load_challenges()
    companions_by_slug = {Path(companion_audio_name(episode)).stem: episode for episode in manifest}

    targets: list[ListeningTarget] = []
    used: set[str] = set()
    section = "Audio Path"

    for entry in load_listening_order():
        kind = entry.get("kind")
        slug = entry.get("slug")
        if kind == "section":
            section = entry.get("title") or section
            continue
        if not slug:
            continue

        target: ListeningTarget | None = None
        if kind == "companion" and slug in companions_by_slug:
            target = companion_target(companions_by_slug[slug], len(targets) + 1, section)
            if target.group == "appendices" and not include_appendices:
                target = None
        elif kind == "challenge" and slug in challenges:
            target = challenge_target(challenges[slug], len(targets) + 1, section)

        if target is None:
            continue
        key = f"{target.kind}:{target.slug}"
        if key in used:
            continue
        used.add(key)
        targets.append(target)

    section = "Additional Episodes"
    for episode in manifest:
        target = companion_target(episode, len(targets) + 1, section)
        key = f"{target.kind}:{target.slug}"
        if key not in used and (include_appendices or target.group != "appendices"):
            used.add(key)
            targets.append(target)

    for challenge in challenges.values():
        target = challenge_target(challenge, len(targets) + 1, section)
        key = f"{target.kind}:{target.slug}"
        if key not in used:
            used.add(key)
            targets.append(target)

    return targets


def script_index(path: Path) -> int | None:
    stem = path.stem
    if stem.startswith("ep"):
        try:
            return int(stem.split("-", 1)[0].replace("ep", ""))
        except ValueError:
            return None
    if stem.startswith("cc-"):
        parts = stem.split("-", 2)
        if len(parts) > 1 and parts[1].isdigit():
            return int(parts[1])
    return None


def script_group(path: Path) -> str:
    parent = path.parent.name.lower()
    if parent in {"chapters", "challenges", "appendices"}:
        return parent
    if path.stem.startswith("cc-"):
        return "challenges"
    return "chapters"


def script_sort_key(path: Path) -> tuple[int, int, str]:
    stem = path.stem
    if stem.startswith("ep"):
        return (0, script_index(path) or 0, stem)
    if stem.startswith("cc-"):
        index = script_index(path)
        return (1, index if index is not None else 999, stem)
    return (2, 999, stem)


def find_file_recursive(base: Path, file_name: str) -> Path | None:
    direct = base / file_name
    if direct.exists():
        return direct
    matches = sorted(path for path in base.rglob(file_name) if path.is_file())
    return matches[0] if matches else None


def ordered_script_paths(scripts_dir: Path, include_unlisted: bool = True) -> list[Path]:
    all_scripts = sorted(
        [
            path
            for path in scripts_dir.rglob("*.txt")
            if path.is_file() and (path.stem.startswith("ep") or path.stem.startswith("cc-"))
        ],
        key=script_sort_key,
    )
    by_name = {path.name: path for path in all_scripts}
    ordered: list[Path] = []
    used: set[Path] = set()

    for target in build_listening_targets(include_appendices=True):
        path = by_name.get(target.script_name)
        if path and path not in used:
            ordered.append(path)
            used.add(path)

    if include_unlisted:
        for path in all_scripts:
            if path not in used:
                ordered.append(path)
                used.add(path)

    return ordered


def normalize_text(value: str) -> str:
    return " ".join(str(value or "").split())


def segment_matches(expected: dict, actual: dict) -> bool:
    return (
        str(expected.get("speaker", "")) == str(actual.get("speaker", ""))
        and normalize_text(expected.get("text", "")) == normalize_text(actual.get("text", ""))
    )