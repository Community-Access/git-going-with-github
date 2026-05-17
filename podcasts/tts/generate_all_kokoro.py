#!/usr/bin/env python3
"""Batch-generate podcast episodes with Kokoro voices.

Usage:
  python -m podcasts.tts.generate_all_kokoro
  python -m podcasts.tts.generate_all_kokoro --male-voice am_liam --female-voice af_jessica
    python -m podcasts.tts.generate_all_kokoro --start 0 --end 74 --force --audio-format mp3
    python -m podcasts.tts.generate_all_kokoro --slug ep05-working-with-issues --audio-format mp3
"""

from __future__ import annotations

import argparse
import ctypes
import datetime as dt
import json
import shutil
import sys
import time
import traceback
from pathlib import Path

np = None
sf = None
Kokoro = None

ROOT = Path(__file__).resolve().parent.parent  # podcasts/
REPO_ROOT = ROOT.parent
SCRIPTS_DIR = ROOT / "scripts"
TTS_DIR = ROOT / "tts"
MODELS_DIR = TTS_DIR / "models"

MODEL_PATH = MODELS_DIR / "kokoro-v1.0.onnx"
VOICES_PATH = MODELS_DIR / "voices-v1.0.bin"
SEGMENTS_DIR = ROOT / "audio" / "segments"
LOGS_DIR = ROOT / "logs"
FAILURE_LOG_PATH = LOGS_DIR / "kokoro_generation_failures.jsonl"

# Kokoro pacing defaults tuned for a slightly faster conversational cadence.
DEFAULT_PAUSE_SECONDS = 1.0
DEFAULT_INTER_SEGMENT_SECONDS = 0.18
DEFAULT_INTER_SPEAKER_SECONDS = 0.28
DEFAULT_FINAL_SEGMENT_TAIL_SECONDS = 0.18
DEFAULT_SPEECH_SPEED = 1.08
DEFAULT_MAX_SEGMENT_CHARS = 360


if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.tts.generate_episode import apply_lexicon, convert_wav_to_mp3, parse_script, safe_text  # noqa: E402
from podcasts.listening_plan import ordered_script_paths, script_group, script_index, segment_matches  # noqa: E402


class KeepAwakeGuard:
    """Prevent system sleep while long-running generation is active on Windows."""

    ES_CONTINUOUS = 0x80000000
    ES_SYSTEM_REQUIRED = 0x00000001

    def __init__(self, enabled: bool) -> None:
        self.enabled = enabled
        self._active = False

    def __enter__(self) -> "KeepAwakeGuard":
        if not self.enabled or sys.platform != "win32":
            return self
        try:
            result = ctypes.windll.kernel32.SetThreadExecutionState(  # type: ignore[attr-defined]
                self.ES_CONTINUOUS | self.ES_SYSTEM_REQUIRED
            )
            if result:
                self._active = True
                print("Keep-awake active: preventing system sleep during generation")
                print("  (does not prevent manual Ctrl+C interruption)")
            else:
                print("[WARN] Unable to enable keep-awake; generation will continue")
        except Exception as exc:
            print(f"[WARN] Keep-awake setup failed: {exc}")
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        if not self._active:
            return
        try:
            ctypes.windll.kernel32.SetThreadExecutionState(self.ES_CONTINUOUS)  # type: ignore[attr-defined]
            print("Keep-awake released: normal power management restored")
        except Exception:
            # Do not mask generation failures due to cleanup issues.
            pass


def load_kokoro_dependencies() -> None:
    global np, sf, Kokoro
    if np is not None and sf is not None and Kokoro is not None:
        return
    try:
        import numpy as numpy_module
        import soundfile as soundfile_module
        from kokoro_onnx import Kokoro as KokoroClass
    except ModuleNotFoundError as ex:
        raise SystemExit(
            "Missing Kokoro audio dependency. Install with: "
            "python -m pip install kokoro-onnx soundfile numpy"
        ) from ex
    np = numpy_module
    sf = soundfile_module
    Kokoro = KokoroClass


def infer_lang(voice: str) -> str:
    if voice.startswith(("af_", "am_")):
        return "en-us"
    if voice.startswith(("bf_", "bm_")):
        return "en-gb"
    if voice.startswith("jf_"):
        return "ja"
    if voice.startswith("zf_"):
        return "zh"
    return "en-us"


def generate_silence(seconds: float, sample_rate: int) -> np.ndarray:
    frames = max(0, int(round(seconds * sample_rate)))
    return np.zeros(frames, dtype=np.float32)


def split_text_for_tts(text: str, max_chars: int) -> list[str]:
    text = " ".join(text.split())
    if len(text) <= max_chars:
        return [text]

    chunks: list[str] = []
    current = ""
    sentences = []
    start = 0
    for idx, char in enumerate(text):
        if char in ".!?" and (idx + 1 == len(text) or text[idx + 1].isspace()):
            sentences.append(text[start:idx + 1].strip())
            start = idx + 1
    remainder = text[start:].strip()
    if remainder:
        sentences.append(remainder)

    if not sentences:
        sentences = [text]

    for sentence in sentences:
        if len(sentence) > max_chars:
            if current:
                chunks.append(current)
                current = ""
            words = sentence.split()
            word_chunk = ""
            for word in words:
                candidate = f"{word_chunk} {word}".strip()
                if len(candidate) > max_chars and word_chunk:
                    chunks.append(word_chunk)
                    word_chunk = word
                else:
                    word_chunk = candidate
            if word_chunk:
                chunks.append(word_chunk)
            continue

        candidate = f"{current} {sentence}".strip()
        if len(candidate) > max_chars and current:
            chunks.append(current)
            current = sentence
        else:
            current = candidate

    if current:
        chunks.append(current)
    return [chunk for chunk in chunks if chunk]


def write_wav_with_retry(path: Path, pcm: np.ndarray, sample_rate: int, retries: int = 4) -> None:
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.unlink(missing_ok=True)
            sf.write(path, pcm, sample_rate)
            return
        except Exception as ex:
            last_error = ex
            if attempt == retries:
                break
            time.sleep(0.15 * attempt)
    raise RuntimeError(f"Error writing '{path}': {last_error}")


def synthesize_speaker(
    kokoro: Kokoro,
    text: str,
    voice: str,
    speed: float,
) -> tuple[np.ndarray, int]:
    lang = infer_lang(voice)
    try:
        samples, sample_rate = kokoro.create(text, voice=voice, speed=speed, lang=lang)
    except RuntimeError:
        samples, sample_rate = kokoro.create(text, voice=voice, speed=speed, lang="en-us")
    return np.asarray(samples, dtype=np.float32), sample_rate


def synthesize_text(
    kokoro: Kokoro,
    text: str,
    voice: str,
    max_segment_chars: int,
    speed: float,
) -> tuple[np.ndarray, int]:
    parts: list[np.ndarray] = []
    current_sample_rate: int | None = None
    for chunk in split_text_for_tts(text, max_segment_chars):
        pcm, sample_rate = synthesize_speaker(kokoro, chunk, voice, speed)
        if current_sample_rate is None:
            current_sample_rate = sample_rate
        elif sample_rate != current_sample_rate:
            raise RuntimeError(f"Chunk sample rate mismatch: got {sample_rate}, expected {current_sample_rate}")
        parts.append(pcm)
    if current_sample_rate is None:
        current_sample_rate = 24000
    return np.concatenate(parts) if parts else generate_silence(0.1, current_sample_rate), current_sample_rate


def manifest_complete(script_path: Path) -> bool:
    slug = script_path.stem
    manifest_path = SEGMENTS_DIR / slug / "manifest.json"
    if not manifest_path.exists():
        return False
    try:
        segments = parse_script(script_path.read_text(encoding="utf-8"))
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception:
        return False
    if len(manifest) != len(segments):
        return False
    for expected_seq, (segment, entry) in enumerate(zip(segments, manifest), start=1):
        if entry.get("seq") != expected_seq:
            return False
        if not segment_matches(segment, entry):
            return False
        filename = entry.get("filename")
        if not filename or not (SEGMENTS_DIR / slug / filename).exists():
            return False
    return True


def remove_incomplete_segment_dir(script_path: Path) -> None:
    slug = script_path.stem
    seg_dir = SEGMENTS_DIR / slug
    if seg_dir.exists() and not manifest_complete(script_path):
        shutil.rmtree(seg_dir)


def recover_partial_manifest(script_path: Path, segments: list[dict], seg_dir: Path) -> list[dict]:
    """Recover a partial segment folder by keeping only a contiguous valid prefix.

    Safety behavior:
    - Keep only the contiguous valid prefix from manifest.json.
    - Remove all files after the first inconsistency.
    - Remove the last kept segment to avoid carrying forward a partially written tail.
    """
    manifest_path = seg_dir / "manifest.json"
    if not manifest_path.exists():
        return []

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception:
        return []

    if not isinstance(manifest, list):
        return []

    kept: list[dict] = []
    for expected_seq, expected_segment in enumerate(segments, start=1):
        if expected_seq > len(manifest):
            break
        entry = manifest[expected_seq - 1]
        if not isinstance(entry, dict):
            break
        if entry.get("seq") != expected_seq:
            break
        if not segment_matches(expected_segment, entry):
            break
        filename = entry.get("filename")
        if not filename or not (seg_dir / filename).exists():
            break
        kept.append(entry)

    # Remove any manifest-tail files that do not belong to the contiguous valid prefix.
    for entry in manifest[len(kept):]:
        if isinstance(entry, dict):
            filename = entry.get("filename")
            if filename:
                (seg_dir / str(filename)).unlink(missing_ok=True)

    # Delete the last kept segment so resume always restarts from a known-good boundary.
    if kept:
        last = kept.pop()
        filename = last.get("filename")
        if filename:
            (seg_dir / str(filename)).unlink(missing_ok=True)

    # Remove orphan segment WAV files that are not referenced by the recovered manifest.
    keep_names = {str(entry.get("filename")) for entry in kept if entry.get("filename")}
    for wav in seg_dir.glob("seg*.wav"):
        if wav.name not in keep_names:
            wav.unlink(missing_ok=True)

    return kept


def log_failure(script_path: Path, error: Exception) -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    record = {
        "timestamp": dt.datetime.now(dt.timezone.utc).isoformat(),
        "script": str(script_path.relative_to(REPO_ROOT)),
        "slug": script_path.stem,
        "error": str(error),
        "traceback": traceback.format_exc(),
    }
    with FAILURE_LOG_PATH.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=True) + "\n")


def generate_episode_with_kokoro(
    kokoro: Kokoro,
    script_path: Path,
    out_wav: Path,
    male_voice: str,
    female_voice: str,
    audio_format: str,
    max_segment_chars: int,
    verbose_segments: bool,
    pause_seconds: float,
    inter_segment_seconds: float,
    inter_speaker_seconds: float,
    final_segment_tail_seconds: float,
    speech_speed: float,
    resume_partial: bool,
) -> None:
    slug = script_path.stem
    text = script_path.read_text(encoding="utf-8")
    segments = parse_script(text)
    if not segments:
        raise RuntimeError(f"No segments parsed from {script_path}")

    seg_dir = SEGMENTS_DIR / slug
    seg_dir.mkdir(parents=True, exist_ok=True)

    manifest: list[dict] = []
    current_sample_rate: int | None = None

    if resume_partial:
        manifest = recover_partial_manifest(script_path, segments, seg_dir)
        if manifest:
            first_seq = manifest[0].get("seq")
            last_seq = manifest[-1].get("seq")
            print(f"  resume: keeping validated segments {first_seq}-{last_seq}, rebuilding from {last_seq + 1}", flush=True)
            for entry in manifest:
                filename = entry.get("filename")
                if not filename:
                    continue
                seg_path = seg_dir / filename
                try:
                    pcm, sample_rate = sf.read(seg_path, dtype="float32")
                    if pcm.ndim > 1:
                        pcm = pcm[:, 0]
                    if current_sample_rate is None:
                        current_sample_rate = int(sample_rate)
                    elif int(sample_rate) != current_sample_rate:
                        raise RuntimeError(
                            f"Sample rate mismatch in resumed segments for {slug}: "
                            f"got {sample_rate}, expected {current_sample_rate}"
                        )
                except Exception:
                    # If an existing segment cannot be read, fall back to clean regeneration.
                    manifest = []
                    current_sample_rate = None
                    break

    start_idx = len(manifest) + 1

    for idx, segment in enumerate(segments[start_idx - 1:], start=start_idx):
        speaker = segment["speaker"]
        seq_str = f"{idx:03d}"
        if verbose_segments:
            print(f"  [{idx}/{len(segments)}] {speaker}", flush=True)
        elif idx == 1 or idx == len(segments) or idx % 5 == 0:
            print(f"  progress {idx}/{len(segments)} ({speaker})", flush=True)

        if speaker == "PAUSE":
            if current_sample_rate is None:
                current_sample_rate = 24000
            pcm = generate_silence(pause_seconds, current_sample_rate)
            filename = f"seg{seq_str}-pause.wav"
            write_wav_with_retry(seg_dir / filename, pcm, current_sample_rate)
            manifest.append(
                {
                    "seq": idx,
                    "speaker": "PAUSE",
                    "text": "",
                    "filename": filename,
                    "duration": round(float(len(pcm)) / float(current_sample_rate), 3),
                    "status": "pause",
                }
            )
            continue

        source_text = safe_text(segment["text"])
        source_text = apply_lexicon(source_text)
        voice = male_voice if speaker == "ALEX" else female_voice

        try:
            pcm, sample_rate = synthesize_text(
                kokoro,
                source_text,
                voice,
                max_segment_chars,
                speech_speed,
            )
        except Exception as ex:
            preview = source_text[:160].replace("\n", " ")
            raise RuntimeError(
                f"{script_path.name} segment {idx}/{len(segments)} "
                f"speaker={speaker} chars={len(source_text)} preview={preview!r}: {ex}"
            ) from ex

        if current_sample_rate is None:
            current_sample_rate = sample_rate
        elif sample_rate != current_sample_rate:
            raise RuntimeError(
                f"Sample rate mismatch in {script_path.name}: "
                f"got {sample_rate}, expected {current_sample_rate}"
            )

        if idx < len(segments):
            next_speaker = segments[idx]["speaker"]
            if next_speaker != "PAUSE":
                gap = inter_speaker_seconds if next_speaker != speaker else inter_segment_seconds
                if gap > 0:
                    pcm = np.concatenate([pcm, generate_silence(gap, current_sample_rate)])

        if idx == len(segments) and final_segment_tail_seconds > 0:
            pcm = np.concatenate([pcm, generate_silence(final_segment_tail_seconds, current_sample_rate)])

        filename = f"seg{seq_str}-{speaker.lower()}" + ".wav"
        write_wav_with_retry(seg_dir / filename, pcm, current_sample_rate)
        manifest.append(
            {
                "seq": idx,
                "speaker": speaker,
                "text": segment["text"],
                "filename": filename,
                "duration": round(float(len(pcm)) / float(current_sample_rate), 3),
                "status": "synthesized",
            }
        )

    if current_sample_rate is None:
        raise RuntimeError(f"No synthesized content in {script_path.name}")

    (seg_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    episode_parts: list[np.ndarray] = []
    for entry in manifest:
        filename = entry.get("filename")
        if not filename:
            raise RuntimeError(f"Missing filename in manifest entry for {slug}")
        seg_path = seg_dir / filename
        if not seg_path.exists():
            raise RuntimeError(f"Missing segment file referenced by manifest: {seg_path}")
        pcm, sample_rate = sf.read(seg_path, dtype="float32")
        if pcm.ndim > 1:
            pcm = pcm[:, 0]
        if int(sample_rate) != current_sample_rate:
            raise RuntimeError(
                f"Sample rate mismatch while building episode {slug}: "
                f"got {sample_rate}, expected {current_sample_rate}"
            )
        episode_parts.append(np.asarray(pcm, dtype=np.float32))

    full = np.concatenate(episode_parts) if episode_parts else generate_silence(0.1, current_sample_rate)
    out_wav.parent.mkdir(parents=True, exist_ok=True)
    write_wav_with_retry(out_wav, full, current_sample_rate)
    if audio_format in ("mp3", "both"):
        out_mp3 = out_wav.with_suffix(".mp3")
        convert_wav_to_mp3(out_wav, out_mp3)
        if audio_format == "mp3":
            out_wav.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate all podcast episodes with Kokoro")
    parser.add_argument("--start", type=int, default=0, help="First episode number (inclusive)")
    parser.add_argument("--end", type=int, default=999, help="Last episode number (inclusive)")
    parser.add_argument("--male-voice", default="am_liam", help="Kokoro voice for ALEX")
    parser.add_argument("--female-voice", default="af_jessica", help="Kokoro voice for JAMIE")
    parser.add_argument(
        "--speech-speed",
        type=float,
        default=DEFAULT_SPEECH_SPEED,
        help="Kokoro speed multiplier (higher is faster).",
    )
    parser.add_argument(
        "--pause-seconds",
        type=float,
        default=DEFAULT_PAUSE_SECONDS,
        help="Duration of [PAUSE] segments in seconds.",
    )
    parser.add_argument(
        "--inter-segment-seconds",
        type=float,
        default=DEFAULT_INTER_SEGMENT_SECONDS,
        help="Silence between consecutive turns by the same speaker.",
    )
    parser.add_argument(
        "--inter-speaker-seconds",
        type=float,
        default=DEFAULT_INTER_SPEAKER_SECONDS,
        help="Silence between turns when the speaker changes.",
    )
    parser.add_argument(
        "--final-segment-tail-seconds",
        type=float,
        default=DEFAULT_FINAL_SEGMENT_TAIL_SECONDS,
        help="Silence appended after the final segment in an episode.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=ROOT / "audio" / "kokoro-am_liam-af_jessica",
        help="Output folder for rendered episodes",
    )
    parser.add_argument(
        "--audio-format",
        choices=["wav", "mp3", "both"],
        default="wav",
        help="Final episode output format. MP3 requires ffmpeg on PATH.",
    )
    parser.add_argument("--force", action="store_true", help="Regenerate even if target file exists")
    parser.add_argument(
        "--max-segment-chars",
        type=int,
        default=DEFAULT_MAX_SEGMENT_CHARS,
        help="Split long script turns into chunks no longer than this many characters before TTS.",
    )
    parser.add_argument(
        "--keep-partial-segments",
        action="store_true",
        help="Keep incomplete segment folders before regeneration instead of cleaning them.",
    )
    parser.add_argument(
        "--verbose-segments",
        action="store_true",
        help="Print each segment number before synthesis for failure diagnostics.",
    )
    parser.add_argument(
        "--group",
        choices=["all", "chapters", "challenges", "appendices"],
        default="all",
        help="Limit generation to a script category.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the listening-order generation queue without loading models or generating audio.",
    )
    parser.add_argument(
        "--slug",
        action="append",
        default=[],
        help="Restrict generation to one or more exact slugs (for example ep05-working-with-issues).",
    )
    parser.add_argument(
        "--no-resume-partial",
        action="store_true",
        help="Do not resume from partial segments; use legacy behavior.",
    )
    parser.add_argument(
        "--no-keep-awake",
        action="store_true",
        help="Do not request keep-awake mode on Windows during generation.",
    )
    args = parser.parse_args()

    scripts = ordered_script_paths(SCRIPTS_DIR)

    # Keep exactly one physical script per filename. If duplicates exist across
    # folders, prefer the shortest path (then lexical path) deterministically.
    best_by_name: dict[str, Path] = {}
    for script in scripts:
        key = script.name
        best = best_by_name.get(key)
        candidate_rank = (len(str(script)), str(script))
        if best is None:
            best_by_name[key] = script
            continue
        best_rank = (len(str(best)), str(best))
        if candidate_rank < best_rank:
            best_by_name[key] = script

    deduped_scripts: list[Path] = []
    for script in scripts:
        key = script.name
        if best_by_name.get(key) == script:
            deduped_scripts.append(script)
            del best_by_name[key]
    scripts = deduped_scripts

    requested_slugs = {slug.strip() for slug in args.slug if str(slug).strip()}
    if requested_slugs:
        selected = [script for script in scripts if script.stem in requested_slugs]
        found = {script.stem for script in selected}
        missing = sorted(requested_slugs - found)
        if missing:
            print("Unknown slug(s): " + ", ".join(missing))
            return 1
    else:
        def in_selected_range(path: Path) -> bool:
            idx = script_index(path)
            if idx is None:
                # Keep unindexed scripts in full-batch mode.
                return args.start <= 0 and args.end >= 999
            return args.start <= idx <= args.end

        selected = [
            s
            for s in scripts
            if in_selected_range(s) and (args.group == "all" or script_group(s) == args.group)
        ]

    if not selected:
        print("No episode scripts matched the selected range")
        return 1

    if args.dry_run:
        print(f"Generation queue ({len(selected)} scripts, group={args.group}, order=listening):")
        for index, script in enumerate(selected, start=1):
            print(f"{index:02d}. {script.stem} ({script_group(script)})")
        return 0

    if not MODEL_PATH.exists() or not VOICES_PATH.exists():
        raise SystemExit(
            "Kokoro model files are missing. Run: python -m podcasts.tts.download_kokoro_samples"
        )

    load_kokoro_dependencies()
    kokoro = Kokoro(str(MODEL_PATH), str(VOICES_PATH))
    available_voices = set(kokoro.get_voices())
    if args.male_voice not in available_voices:
        raise SystemExit(f"Male voice not found: {args.male_voice}")
    if args.female_voice not in available_voices:
        raise SystemExit(f"Female voice not found: {args.female_voice}")

    print(
        f"Generating {len(selected)} episodes"
        f" (group={args.group}) with "
        f"ALEX={args.male_voice}, JAMIE={args.female_voice}"
    )
    print(
        "Pacing: "
        f"speed={args.speech_speed}, pause={args.pause_seconds}s, "
        f"same-speaker-gap={args.inter_segment_seconds}s, "
        f"speaker-change-gap={args.inter_speaker_seconds}s, "
        f"tail={args.final_segment_tail_seconds}s"
    )
    print(f"Output dir: {args.output_dir}")

    generated = 0
    skipped = 0
    failures = 0

    interrupted = False
    with KeepAwakeGuard(enabled=not args.no_keep_awake):
        try:
            for i, script in enumerate(selected, start=1):
                slug = script.stem
                out_wav = args.output_dir / f"{slug}.wav"
                out_mp3 = args.output_dir / f"{slug}.mp3"
                expected_outputs = {
                    "wav": [out_wav],
                    "mp3": [out_mp3],
                    "both": [out_wav, out_mp3],
                }[args.audio_format]
                has_expected_outputs = all(path.exists() for path in expected_outputs)
                has_complete_manifest = manifest_complete(script)
                if has_expected_outputs and has_complete_manifest and not args.force:
                    skipped += 1
                    print(f"[{i}/{len(selected)}] Skip existing: {slug}")
                    continue

                if not args.keep_partial_segments:
                    remove_incomplete_segment_dir(script)

                print(f"[{i}/{len(selected)}] Generating: {slug}")
                try:
                    generate_episode_with_kokoro(
                        kokoro=kokoro,
                        script_path=script,
                        out_wav=out_wav,
                        male_voice=args.male_voice,
                        female_voice=args.female_voice,
                        audio_format=args.audio_format,
                        max_segment_chars=args.max_segment_chars,
                        verbose_segments=args.verbose_segments,
                        pause_seconds=args.pause_seconds,
                        inter_segment_seconds=args.inter_segment_seconds,
                        inter_speaker_seconds=args.inter_speaker_seconds,
                        final_segment_tail_seconds=args.final_segment_tail_seconds,
                        speech_speed=args.speech_speed,
                        resume_partial=not args.no_resume_partial,
                    )
                    generated += 1
                except KeyboardInterrupt:
                    interrupted = True
                    print(f"\n[INTERRUPTED] Generation cancelled by user at slug: {slug}")
                    break
                except Exception as ex:
                    failures += 1
                    log_failure(script, ex)
                    print(f"  Failed: {slug} ({ex})")
        except KeyboardInterrupt:
            interrupted = True
            print("\n[INTERRUPTED] Generation cancelled by user.")

    print(f"Done. Generated={generated}, Skipped={skipped}, Failed={failures}")
    if interrupted:
        return 130
    return 0 if failures == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
