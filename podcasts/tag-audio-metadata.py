#!/usr/bin/env python3
"""Apply podcast ID3 metadata to generated MP3 episode files.

This tool intentionally defaults to dry-run mode. Use --write only after all
expected MP3 files have been generated.

Examples:
  python podcasts/tag-audio-metadata.py --expected-count 75
  python podcasts/tag-audio-metadata.py --write --expected-count 75
  python podcasts/tag-audio-metadata.py --audio-dir podcasts/audio/kokoro-am_liam-af_jessica --write --expected-count 75
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

try:
    from mutagen.id3 import CHAP, COMM, CTOC, ID3, TALB, TIT2, TPE1, TPE2, TPUB, TRCK, TXXX, USLT, WOAR, WXXX, ID3NoHeaderError
except ImportError:  # pragma: no cover - exercised by operator environment
    print(
        "Missing dependency: mutagen. Install it before writing tags: python -m pip install mutagen",
        file=sys.stderr,
    )
    raise SystemExit(2)

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent
MANIFEST_PATH = ROOT / "manifest.json"
LISTENING_ORDER_PATH = ROOT / "config" / "listening-order.json"
SCRIPTS_DIR = ROOT / "scripts"
AUDIO_DIR = ROOT / "audio"
DEFAULT_KOKORO_AUDIO_DIR = AUDIO_DIR / "kokoro-am_liam-af_jessica"
SEGMENTS_DIR = AUDIO_DIR / "segments"
CHAPTERS_DIR = ROOT / "chapters"
CHALLENGE_BUNDLES_PATH = ROOT / "build-challenge-bundles.js"

SERIES_TITLE = "Git Going with GitHub - Audio Series"
AUTHOR = "Community Access"
AUTHOR_URL = "http://www.community-access.org"
CONTACT_EMAIL = "opensource@communityaccess.nyc"
TAG_REPORT_PATH = AUDIO_DIR / "metadata-touch-report.json"


@dataclass(frozen=True)
class EpisodeTarget:
    kind: str
    number: int
    file_name: str
    slug: str
    title: str
    description: str
    script_path: Path


@dataclass(frozen=True)
class ChapterMarker:
    element_id: str
    title: str
    start_ms: int
    end_ms: int
    text: str

    @property
    def start_seconds(self) -> int:
        return max(0, round(self.start_ms / 1000))


def clean_text(value: str) -> str:
    """Remove characters that are invalid in XML/ID3 text contexts."""
    return "".join(
        char for char in str(value).replace("\r\n", "\n").replace("\r", "\n")
        if char == "\n" or char == "\t" or ord(char) >= 0x20
    ).strip()


def load_manifest() -> list[dict]:
    if not MANIFEST_PATH.exists():
        raise FileNotFoundError(f"Missing manifest: {MANIFEST_PATH}")
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def find_script_by_name(file_name: str) -> Path:
    direct = SCRIPTS_DIR / file_name
    if direct.exists():
        return direct
    matches = sorted(path for path in SCRIPTS_DIR.rglob(file_name) if path.is_file())
    return matches[0] if matches else direct


def find_episode_script(episode: dict) -> Path:
    number = int(episode["number"])
    pad = f"{number:02d}"
    expected_name = f"ep{pad}-{episode['slug']}.txt"
    expected = find_script_by_name(expected_name)
    if expected.exists():
        return expected
    matches = sorted(path for path in SCRIPTS_DIR.rglob(f"ep{pad}-*.txt") if path.is_file())
    if matches:
        return matches[0]
    return find_script_by_name(expected_name)


def companion_file_name(episode: dict) -> str:
    number = int(episode["number"])
    pad = f"{number:02d}"
    return episode.get("audio") or f"ep{pad}-{episode['slug']}.mp3"


def load_challenges() -> list[dict]:
    # Keep this parser narrow and deterministic: the challenge catalog is a JS
    # literal list with one object per line near the top of build-challenge-bundles.js.
    text = CHALLENGE_BUNDLES_PATH.read_text(encoding="utf-8")
    challenges: list[dict] = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("{ id: "):
            continue
        try:
            fields = {}
            for key in ("id", "slug", "title", "focus"):
                marker = f"{key}: '"
                start = stripped.index(marker) + len(marker)
                end = stripped.index("'", start)
                fields[key] = stripped[start:end]
            challenges.append(fields)
        except ValueError as exc:
            raise ValueError(f"Unable to parse challenge catalog line: {line}") from exc
    return challenges


def challenge_file_name(challenge: dict) -> str:
    return f"cc-{challenge['id']}-{challenge['slug']}.mp3"


def load_listening_order() -> list[dict]:
    if not LISTENING_ORDER_PATH.exists():
        return []
    return json.loads(LISTENING_ORDER_PATH.read_text(encoding="utf-8"))


def with_track_number(target: EpisodeTarget, number: int) -> EpisodeTarget:
    return EpisodeTarget(
        kind=target.kind,
        number=number,
        file_name=target.file_name,
        slug=target.slug,
        title=target.title,
        description=target.description,
        script_path=target.script_path,
    )


def expected_targets(include_challenges: bool) -> list[EpisodeTarget]:
    companion_targets: dict[str, EpisodeTarget] = {}
    for episode in load_manifest():
        number = int(episode["number"])
        file_name = companion_file_name(episode)
        target = EpisodeTarget(
            kind="companion",
            number=0,
            file_name=file_name,
            slug=Path(file_name).stem,
            title=f"Episode {number}: {episode['title']}",
            description=episode.get("description", ""),
            script_path=find_episode_script(episode),
        )
        companion_targets[target.slug] = target

    challenge_targets: dict[str, EpisodeTarget] = {}
    if include_challenges:
        for challenge in load_challenges():
            file_name = challenge_file_name(challenge)
            target = EpisodeTarget(
                kind="challenge",
                number=0,
                file_name=file_name,
                slug=Path(file_name).stem,
                title=f"Challenge {challenge['id']}: {challenge['title']}",
                description=challenge.get("focus", ""),
                script_path=find_script_by_name(f"cc-{challenge['id']}-{challenge['slug']}.txt"),
            )
            challenge_targets[target.slug] = target

    ordered: list[EpisodeTarget] = []
    used: set[str] = set()
    for entry in load_listening_order():
        kind = entry.get("kind")
        slug = entry.get("slug")
        if kind == "section" or not slug:
            continue
        if kind == "companion":
            target = companion_targets.get(slug)
        elif kind == "challenge" and include_challenges:
            target = challenge_targets.get(slug)
        else:
            target = None
        if target is None:
            continue
        key = f"{kind}:{slug}"
        used.add(key)
        ordered.append(with_track_number(target, len(ordered) + 1))

    for target in companion_targets.values():
        key = f"companion:{target.slug}"
        if key not in used:
            used.add(key)
            ordered.append(with_track_number(target, len(ordered) + 1))

    if include_challenges:
        for target in challenge_targets.values():
            key = f"challenge:{target.slug}"
            if key not in used:
                used.add(key)
                ordered.append(with_track_number(target, len(ordered) + 1))

    return ordered


def discover_audio_files(audio_dirs: Iterable[Path]) -> dict[str, Path]:
    found: dict[str, Path] = {}
    for audio_dir in audio_dirs:
        if not audio_dir.exists():
            continue
        for path in audio_dir.rglob("*.mp3"):
            found.setdefault(path.name, path)
    return found


def remove_existing_frames(tags: ID3, descriptions: Iterable[str]) -> None:
    for description in descriptions:
        for key in list(tags.keys()):
            frame = tags[key]
            if getattr(frame, "desc", None) == description:
                del tags[key]


def segment_manifest_path(target: EpisodeTarget) -> Path:
    return SEGMENTS_DIR / target.slug / "manifest.json"


def load_segment_manifest(target: EpisodeTarget) -> list[dict]:
    manifest_path = segment_manifest_path(target)
    if not manifest_path.exists():
        return []
    return json.loads(manifest_path.read_text(encoding="utf-8"))


def missing_segment_files(target: EpisodeTarget, entries: list[dict]) -> list[str]:
    segment_dir = SEGMENTS_DIR / target.slug
    missing: list[str] = []
    for entry in entries:
        filename = entry.get("filename")
        if filename and not (segment_dir / filename).exists():
            missing.append(str((segment_dir / filename).relative_to(REPO_ROOT)))
    return missing


def first_sentence(text: str) -> str:
    cleaned = clean_text(text).replace("\n", " ")
    for delimiter in (". ", "? ", "! "):
        index = cleaned.find(delimiter)
        if index >= 24:
            return cleaned[:index + 1].strip()
    return cleaned.strip()


def trim_title(text: str, max_length: int = 72) -> str:
    text = " ".join(clean_text(text).replace("\n", " ").split())
    text = text.strip(' "\'')
    if len(text) <= max_length:
        return text
    boundary = text.rfind(" ", 0, max_length - 1)
    return f"{text[:boundary if boundary > 36 else max_length - 1].rstrip()}..."


def title_from_text(text: str, fallback: str) -> str:
    sentence = first_sentence(text)
    if not sentence:
        return fallback

    patterns = [
        ("The big idea today:", "Big Idea"),
        ("Here is the plain-English version of", "Plain English"),
        ("This is where", "How It Fits"),
        ("That matters because", "Why It Matters"),
        ("The practical anchors are", "Practice Anchors"),
        ("Keep the learner anchored in", "Learning Context"),
        ("Before the learner moves on", "Before Moving On"),
    ]
    lower = sentence.lower()
    for prefix, label in patterns:
        if lower.startswith(prefix.lower()):
            remainder = sentence[len(prefix):].strip(" :.-")
            return label if not remainder else trim_title(f"{label}: {remainder}")

    if sentence.endswith("?"):
        return trim_title(f"Question: {sentence}")
    return trim_title(sentence)


def chapter_boundary_after_pause(entries: list[dict], index: int) -> bool:
    if index <= 0 or index >= len(entries):
        return False
    return str(entries[index - 1].get("speaker", "")).upper() == "PAUSE"


def derive_chapters(target: EpisodeTarget, entries: list[dict]) -> list[ChapterMarker]:
    if not entries:
        return []

    starts: list[tuple[int, str]] = []
    current_ms = 0
    last_boundary_ms = 0
    min_gap_ms = 120_000
    max_gap_ms = 420_000

    starts.append((0, "Opening"))
    for index, entry in enumerate(entries):
        duration_ms = round((float(entry.get("duration") or 0)) * 1000)
        speaker = str(entry.get("speaker", "")).upper()
        text = clean_text(entry.get("text", ""))

        if speaker != "PAUSE" and index > 0:
            since_last = current_ms - last_boundary_ms
            natural_pause = chapter_boundary_after_pause(entries, index) and since_last >= min_gap_ms
            forced_break = since_last >= max_gap_ms
            if natural_pause or forced_break:
                starts.append((current_ms, title_from_text(text, f"Part {len(starts) + 1}")))
                last_boundary_ms = current_ms

        current_ms += duration_ms

    total_ms = max(current_ms, 1)
    if len(starts) == 1 and total_ms >= min_gap_ms:
        starts[0] = (0, title_from_text(next((clean_text(entry.get("text", "")) for entry in entries if entry.get("text")), target.title), "Opening"))

    chapters: list[ChapterMarker] = []
    for index, (start_ms, title) in enumerate(starts):
        end_ms = starts[index + 1][0] if index + 1 < len(starts) else total_ms
        if end_ms <= start_ms:
            continue
        chapters.append(
            ChapterMarker(
                element_id=f"chp{index + 1:03d}",
                title=trim_title(title),
                start_ms=start_ms,
                end_ms=end_ms,
                text="",
            )
        )
    return chapters


def remove_chapter_frames(tags: ID3) -> None:
    for key in list(tags.keys()):
        if key.startswith("CHAP:") or key.startswith("CTOC:"):
            del tags[key]


def write_chapter_sidecar(target: EpisodeTarget, chapters: list[ChapterMarker]) -> Path | None:
    if not chapters:
        return None
    CHAPTERS_DIR.mkdir(parents=True, exist_ok=True)
    chapter_path = CHAPTERS_DIR / f"{target.slug}.json"
    chapter_path.write_text(json.dumps({
        "version": "1.2.0",
        "title": target.title,
        "chapters": [
            {
                "startTime": chapter.start_seconds,
                "title": chapter.title,
            }
            for chapter in chapters
        ],
    }, indent=2) + "\n", encoding="utf-8")
    return chapter_path


def add_id3_chapters(tags: ID3, chapters: list[ChapterMarker]) -> None:
    remove_chapter_frames(tags)
    if not chapters:
        return

    child_ids = []
    for chapter in chapters:
        child_ids.append(chapter.element_id)
        tags.add(CHAP(
            element_id=chapter.element_id,
            start_time=chapter.start_ms,
            end_time=chapter.end_ms,
            start_offset=0xFFFFFFFF,
            end_offset=0xFFFFFFFF,
            sub_frames=[TIT2(encoding=3, text=chapter.title)],
        ))

    tags.add(CTOC(
        element_id="toc",
        flags=0x03,
        child_element_ids=child_ids,
        sub_frames=[TIT2(encoding=3, text="Chapters")],
    ))


def apply_tags(mp3_path: Path, target: EpisodeTarget, script_text: str, chapters: list[ChapterMarker], *, touch: bool) -> None:
    try:
        tags = ID3(mp3_path)
    except ID3NoHeaderError:
        tags = ID3()

    remove_existing_frames(tags, [
        "Author website",
        "Contact email",
        "Episode description",
        "Episode script",
    ])

    title = clean_text(target.title)
    description = clean_text(target.description)
    script = clean_text(script_text)

    tags.delall("TIT2")
    tags.delall("TPE1")
    tags.delall("TPE2")
    tags.delall("TALB")
    tags.delall("TPUB")
    tags.delall("TRCK")
    tags.delall("WOAR")
    tags.delall("WXXX")
    tags.delall("USLT")

    tags.add(TIT2(encoding=3, text=title))
    tags.add(TPE1(encoding=3, text=AUTHOR))
    tags.add(TPE2(encoding=3, text=AUTHOR))
    tags.add(TALB(encoding=3, text=SERIES_TITLE))
    tags.add(TPUB(encoding=3, text=AUTHOR))
    tags.add(TRCK(encoding=3, text=str(target.number)))
    tags.add(WOAR(url=AUTHOR_URL))
    tags.add(WXXX(encoding=3, desc="Author website", url=AUTHOR_URL))
    tags.add(TXXX(encoding=3, desc="Author website", text=AUTHOR_URL))
    tags.add(TXXX(encoding=3, desc="Contact email", text=CONTACT_EMAIL))
    tags.add(TXXX(encoding=3, desc="Episode description", text=description))
    tags.add(TXXX(encoding=3, desc="Episode script", text=script))
    tags.add(USLT(encoding=3, lang="eng", desc="Episode script", text=script))
    tags.add(COMM(encoding=3, lang="eng", desc="Episode description", text=description))
    add_id3_chapters(tags, chapters)

    tags.save(mp3_path, v2_version=3)
    if touch:
        now = time.time()
        os.utime(mp3_path, (now, now))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Tag generated podcast MP3 files with ID3 metadata and embedded scripts.")
    parser.add_argument(
        "--audio-dir",
        action="append",
        type=Path,
        default=[],
        help="Directory to search for MP3 files. Can be passed more than once.",
    )
    parser.add_argument(
        "--expected-count",
        type=int,
        default=75,
        help="Expected number of MP3 files before writes are allowed.",
    )
    parser.add_argument(
        "--companions-only",
        action="store_true",
        help="Only require and tag companion episodes from manifest.json.",
    )
    parser.add_argument(
        "--allow-missing",
        action="store_true",
        help="Do not fail when files/scripts are missing. Useful for partial test runs.",
    )
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write ID3 tags and touch files. Omit for dry-run validation only.",
    )
    parser.add_argument(
        "--no-touch",
        action="store_true",
        help="Write ID3 tags but do not force-refresh file modification times.",
    )
    parser.add_argument(
        "--report",
        type=Path,
        default=TAG_REPORT_PATH,
        help="Where to write the JSON report in --write mode.",
    )
    parser.add_argument(
        "--chapters-dir",
        type=Path,
        default=CHAPTERS_DIR,
        help="Directory for Podcasting 2.0 chapter JSON sidecars.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    global CHAPTERS_DIR
    CHAPTERS_DIR = args.chapters_dir if args.chapters_dir.is_absolute() else REPO_ROOT / args.chapters_dir
    audio_dirs = args.audio_dir or [AUDIO_DIR, DEFAULT_KOKORO_AUDIO_DIR]
    audio_dirs = [path if path.is_absolute() else REPO_ROOT / path for path in audio_dirs]
    targets = expected_targets(include_challenges=not args.companions_only)
    discovered = discover_audio_files(audio_dirs)

    missing_audio: list[str] = []
    missing_scripts: list[str] = []
    missing_segment_manifests: list[str] = []
    missing_segments: list[str] = []
    ready: list[tuple[EpisodeTarget, Path, str, list[ChapterMarker]]] = []

    for target in targets:
        mp3_path = discovered.get(target.file_name)
        if not mp3_path:
            missing_audio.append(target.file_name)
            continue
        if not target.script_path.exists():
            missing_scripts.append(str(target.script_path.relative_to(REPO_ROOT)))
            continue
        script_text = target.script_path.read_text(encoding="utf-8")
        segment_entries = load_segment_manifest(target)
        if not segment_entries:
            missing_segment_manifests.append(str(segment_manifest_path(target).relative_to(REPO_ROOT)))
            continue
        missing_segments.extend(missing_segment_files(target, segment_entries))
        chapters = derive_chapters(target, segment_entries)
        ready.append((target, mp3_path, script_text, chapters))

    expected_count = args.expected_count
    count_ok = len(ready) == expected_count
    complete_ok = not missing_audio and not missing_scripts and not missing_segment_manifests and not missing_segments
    can_write = args.write and (args.allow_missing or (count_ok and complete_ok))

    print(f"Audio search dirs: {', '.join(str(path) for path in audio_dirs)}")
    print(f"Expected MP3 count: {expected_count}")
    print(f"Ready to tag: {len(ready)}")
    if missing_audio:
        print(f"Missing audio files ({len(missing_audio)}): {', '.join(missing_audio[:20])}")
        if len(missing_audio) > 20:
            print(f"  ...and {len(missing_audio) - 20} more")
    if missing_scripts:
        print(f"Missing script files ({len(missing_scripts)}): {', '.join(missing_scripts[:20])}")
        if len(missing_scripts) > 20:
            print(f"  ...and {len(missing_scripts) - 20} more")
    if missing_segment_manifests:
        print(f"Missing segment manifests ({len(missing_segment_manifests)}): {', '.join(missing_segment_manifests[:20])}")
        if len(missing_segment_manifests) > 20:
            print(f"  ...and {len(missing_segment_manifests) - 20} more")
    if missing_segments:
        print(f"Missing retained segment files ({len(missing_segments)}): {', '.join(missing_segments[:20])}")
        if len(missing_segments) > 20:
            print(f"  ...and {len(missing_segments) - 20} more")

    if args.write and not can_write:
        print("Refusing to write tags until all expected audio, script, and segment files are present.", file=sys.stderr)
        print("Use --allow-missing only for an intentional partial test.", file=sys.stderr)
        return 1

    touched: list[dict] = []
    if can_write:
        for target, mp3_path, script_text, chapters in ready:
            chapter_path = write_chapter_sidecar(target, chapters)
            apply_tags(mp3_path, target, script_text, chapters, touch=not args.no_touch)
            touched.append({
                "file": str(mp3_path.relative_to(REPO_ROOT)),
                "title": target.title,
                "script": str(target.script_path.relative_to(REPO_ROOT)),
                "chapters": len(chapters),
                "chapterFile": str(chapter_path.relative_to(REPO_ROOT)) if chapter_path else None,
            })
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps({
            "written": True,
            "count": len(touched),
            "author": AUTHOR,
            "authorUrl": AUTHOR_URL,
            "chaptersDir": str(CHAPTERS_DIR.relative_to(REPO_ROOT)),
            "files": touched,
        }, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote ID3 tags and touched {len(touched)} files.")
        print(f"Report: {args.report}")
    else:
        print("Dry run only. Re-run with --write after all expected MP3s exist.")

    return 0 if args.allow_missing or (count_ok and complete_ok) else 1


if __name__ == "__main__":
    raise SystemExit(main())
