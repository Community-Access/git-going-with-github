#!/usr/bin/env python3
"""Verify podcast script/transcript/segment/MP3 integrity and generation queue.

Checks, per listening-order target:
- script exists and parses
- transcript segments JSON exists and matches parsed script exactly
- segment manifest exists and matches script exactly
- every segment WAV listed in manifest exists
- MP3 exists
- MP3 duration approximately matches summed segment manifest duration

Also emits prioritized generation queues:
1) challenges missing MP3 (in listening order)
2) chapters missing MP3 (in listening order)
3) appendices missing MP3 (in listening order)
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    from mutagen.mp3 import MP3
except Exception:  # pragma: no cover
    MP3 = None

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent
MANIFEST_PATH = ROOT / "manifest.json"
CHALLENGE_CATALOG_PATH = ROOT / "build-challenge-bundles.js"
SCRIPTS_DIR = ROOT / "scripts"
TRANSCRIPTS_DIR = ROOT / "transcripts"
AUDIO_DIR = ROOT / "audio"
DEFAULT_AUDIO_DIR = AUDIO_DIR / "kokoro-am_liam-af_jessica"
SEGMENTS_DIR = AUDIO_DIR / "segments"
LOGS_DIR = ROOT / "logs"
REPORT_PATH = LOGS_DIR / "audio_inventory_report.json"

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.tts.generate_episode import parse_script  # noqa: E402
from podcasts.listening_plan import build_listening_targets, listening_order_path  # noqa: E402

LISTENING_ORDER_PATH = listening_order_path()


@dataclass(frozen=True)
class Target:
    kind: str
    group: str
    slug: str
    title: str
    script_name: str
    transcript_name: str
    audio_name: str


def normalize_text(value: str) -> str:
    return " ".join(str(value or "").split())


def load_manifest() -> list[dict]:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def load_listening_order() -> list[dict]:
    return json.loads(LISTENING_ORDER_PATH.read_text(encoding="utf-8"))


def load_challenges() -> dict[str, dict]:
    text = CHALLENGE_CATALOG_PATH.read_text(encoding="utf-8")
    results: dict[str, dict] = {}
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("{ id: "):
            continue
        fields: dict[str, str] = {}
        ok = True
        for key in ("id", "slug", "title", "focus"):
            marker = f"{key}: '"
            start = stripped.find(marker)
            if start < 0:
                ok = False
                break
            start += len(marker)
            end = stripped.find("'", start)
            if end < 0:
                ok = False
                break
            fields[key] = stripped[start:end]
        if ok:
            audio_slug = f"cc-{fields['id']}-{fields['slug']}"
            results[audio_slug] = fields
    return results


def find_file_recursive(base: Path, file_name: str) -> Path | None:
    direct = base / file_name
    if direct.exists():
        return direct
    matches = sorted(path for path in base.rglob(file_name) if path.is_file())
    return matches[0] if matches else None


def find_audio_file(file_name: str, audio_dirs: list[Path]) -> Path | None:
    for directory in audio_dirs:
        direct = directory / file_name
        if direct.exists():
            return direct
    for directory in audio_dirs:
        if not directory.exists():
            continue
        matches = sorted(path for path in directory.rglob(file_name) if path.is_file())
        if matches:
            return matches[0]
    return None


def companion_group(episode: dict) -> str:
    source = ((episode.get("sources") or [""])[0] or "").lower()
    return "appendices" if source.startswith("appendix-") else "chapters"


def build_targets(include_appendices: bool) -> list[Target]:
    return build_listening_targets(include_appendices=include_appendices)


def compare_segments(script_segments: list[dict], other_segments: list[dict]) -> list[str]:
    issues: list[str] = []
    if len(script_segments) != len(other_segments):
        issues.append(f"segment count mismatch: script={len(script_segments)} other={len(other_segments)}")
        return issues

    for index, (expected, actual) in enumerate(zip(script_segments, other_segments), start=1):
        expected_speaker = str(expected.get("speaker", ""))
        actual_speaker = str(actual.get("speaker", ""))
        if expected_speaker != actual_speaker:
            issues.append(f"segment {index}: speaker mismatch script={expected_speaker} other={actual_speaker}")
            continue

        expected_text = normalize_text(expected.get("text", ""))
        actual_text = normalize_text(actual.get("text", ""))
        if expected_text != actual_text:
            issues.append(f"segment {index}: text mismatch")
    return issues


def manifest_to_segments(entries: list[dict]) -> list[dict]:
    return [{"speaker": entry.get("speaker", ""), "text": entry.get("text", "")} for entry in entries]


def verify_target(target: Target, audio_dirs: list[Path], duration_tolerance_seconds: float) -> dict[str, Any]:
    script_path = find_file_recursive(SCRIPTS_DIR, target.script_name)
    transcript_path = find_file_recursive(TRANSCRIPTS_DIR, target.transcript_name)
    segment_manifest_path = SEGMENTS_DIR / target.slug / "manifest.json"
    audio_path = find_audio_file(target.audio_name, audio_dirs)

    result: dict[str, Any] = {
        "kind": target.kind,
        "group": target.group,
        "slug": target.slug,
        "title": target.title,
        "script": str(script_path) if script_path else None,
        "transcript": str(transcript_path) if transcript_path else None,
        "segment_manifest": str(segment_manifest_path) if segment_manifest_path.exists() else None,
        "audio": str(audio_path) if audio_path else None,
        "issues": [],
    }

    if not script_path:
        result["issues"].append("missing script")
        return result

    script_text = script_path.read_text(encoding="utf-8")
    script_segments = parse_script(script_text)
    if not script_segments:
        result["issues"].append("script parsed to zero segments")
        return result

    if not transcript_path:
        result["issues"].append("missing transcript segments JSON")
    else:
        transcript_segments = json.loads(transcript_path.read_text(encoding="utf-8"))
        transcript_issues = compare_segments(script_segments, transcript_segments)
        result["issues"].extend(f"transcript: {issue}" for issue in transcript_issues)

    manifest_entries: list[dict] = []
    if not segment_manifest_path.exists():
        result["issues"].append("missing segment manifest")
    else:
        manifest_entries = json.loads(segment_manifest_path.read_text(encoding="utf-8"))
        for expected_seq, entry in enumerate(manifest_entries, start=1):
            if entry.get("seq") != expected_seq:
                result["issues"].append(f"manifest: seq mismatch at position {expected_seq}")
                break

        manifest_issues = compare_segments(script_segments, manifest_to_segments(manifest_entries))
        result["issues"].extend(f"manifest: {issue}" for issue in manifest_issues)

        segment_dir = SEGMENTS_DIR / target.slug
        missing_segment_files: list[str] = []
        for entry in manifest_entries:
            filename = entry.get("filename")
            if not filename:
                result["issues"].append("manifest: missing segment filename")
                continue
            if not (segment_dir / filename).exists():
                missing_segment_files.append(filename)
        if missing_segment_files:
            result["issues"].append(f"missing segment wav files: {len(missing_segment_files)}")

    expected_duration = sum(float(entry.get("duration") or 0.0) for entry in manifest_entries)
    result["segment_duration_seconds"] = round(expected_duration, 3)

    if not audio_path:
        result["issues"].append("missing MP3")
    elif MP3 is None:
        result["issues"].append("duration check skipped (mutagen.mp3 unavailable)")
    else:
        try:
            audio_seconds = float(MP3(audio_path).info.length)
            result["audio_duration_seconds"] = round(audio_seconds, 3)
            if expected_duration > 0:
                delta = abs(audio_seconds - expected_duration)
                result["audio_duration_delta_seconds"] = round(delta, 3)
                if delta > duration_tolerance_seconds:
                    result["issues"].append(
                        f"duration mismatch: mp3={audio_seconds:.2f}s manifest={expected_duration:.2f}s delta={delta:.2f}s"
                    )
        except Exception as exc:  # pragma: no cover
            result["issues"].append(f"unable to read MP3 duration: {exc}")

    return result


def build_queue(results: list[dict], group: str) -> list[str]:
    queue: list[str] = []
    for item in results:
        if item["group"] != group:
            continue
        issues = set(item.get("issues") or [])
        if "missing MP3" in issues:
            queue.append(item["slug"])
    return queue


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify podcast audio inventory and integrity")
    parser.add_argument("--include-appendices", action="store_true", help="Include appendix companions in target set")
    parser.add_argument("--audio-dir", action="append", default=[], help="Additional audio directory to search")
    parser.add_argument("--duration-tolerance", type=float, default=3.0, help="Allowed MP3 vs manifest duration delta in seconds")
    parser.add_argument("--write-report", action="store_true", help="Write JSON report to podcasts/logs/audio_inventory_report.json")
    args = parser.parse_args()

    audio_dirs = [Path(path) for path in args.audio_dir] + [AUDIO_DIR, DEFAULT_AUDIO_DIR]
    deduped_audio_dirs: list[Path] = []
    seen = set()
    for path in audio_dirs:
        key = str(path.resolve()) if path.exists() else str(path)
        if key in seen:
            continue
        seen.add(key)
        deduped_audio_dirs.append(path)

    targets = build_targets(include_appendices=args.include_appendices)
    results = [verify_target(target, deduped_audio_dirs, args.duration_tolerance) for target in targets]

    passing = [item for item in results if not item["issues"]]
    failing = [item for item in results if item["issues"]]

    report = {
        "targets_checked": len(results),
        "pass_count": len(passing),
        "fail_count": len(failing),
        "queues": {
            "challenges_missing_mp3": build_queue(results, "challenges"),
            "chapters_missing_mp3": build_queue(results, "chapters"),
            "appendices_missing_mp3": build_queue(results, "appendices"),
        },
        "results": results,
    }

    print(f"Targets checked: {report['targets_checked']}")
    print(f"Pass: {report['pass_count']}")
    print(f"Fail: {report['fail_count']}")
    print(f"Queue challenges (missing MP3): {len(report['queues']['challenges_missing_mp3'])}")
    print(f"Queue chapters (missing MP3): {len(report['queues']['chapters_missing_mp3'])}")
    print(f"Queue appendices (missing MP3): {len(report['queues']['appendices_missing_mp3'])}")

    if failing:
        print("\nFailures (first 20):")
        for item in failing[:20]:
            print(f"- {item['slug']}: {', '.join(item['issues'])}")

    if args.write_report:
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"\nWrote report: {REPORT_PATH}")

    return 0 if not failing else 2


if __name__ == "__main__":
    raise SystemExit(main())
