#!/usr/bin/env python3
"""Batch-generate podcast episodes with Kokoro voices.

Usage:
  python -m podcasts.tts.generate_all_kokoro
  python -m podcasts.tts.generate_all_kokoro --male-voice am_liam --female-voice af_jessica
    python -m podcasts.tts.generate_all_kokoro --start 0 --end 74 --force --audio-format mp3
"""

from __future__ import annotations

import argparse
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

# Keep spacing aligned with the current production voice-config.ini defaults.
PAUSE_SECONDS = 1.3
INTER_SEGMENT_SECONDS = 0.3
INTER_SPEAKER_SECONDS = 0.45
FINAL_SEGMENT_TAIL_SECONDS = 0.25
DEFAULT_MAX_SEGMENT_CHARS = 360


if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.tts.generate_episode import apply_lexicon, convert_wav_to_mp3, parse_script, safe_text  # noqa: E402
from podcasts.listening_plan import ordered_script_paths, script_group, script_index, segment_matches  # noqa: E402


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
) -> tuple[np.ndarray, int]:
    lang = infer_lang(voice)
    try:
        samples, sample_rate = kokoro.create(text, voice=voice, speed=1.0, lang=lang)
    except RuntimeError:
        samples, sample_rate = kokoro.create(text, voice=voice, speed=1.0, lang="en-us")
    return np.asarray(samples, dtype=np.float32), sample_rate


def synthesize_text(
    kokoro: Kokoro,
    text: str,
    voice: str,
    max_segment_chars: int,
) -> tuple[np.ndarray, int]:
    parts: list[np.ndarray] = []
    current_sample_rate: int | None = None
    for chunk in split_text_for_tts(text, max_segment_chars):
        pcm, sample_rate = synthesize_speaker(kokoro, chunk, voice)
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
) -> None:
    slug = script_path.stem
    text = script_path.read_text(encoding="utf-8")
    segments = parse_script(text)
    if not segments:
        raise RuntimeError(f"No segments parsed from {script_path}")

    seg_dir = SEGMENTS_DIR / slug
    seg_dir.mkdir(parents=True, exist_ok=True)

    episode_parts: list[np.ndarray] = []
    manifest: list[dict] = []
    current_sample_rate: int | None = None

    for idx, segment in enumerate(segments, start=1):
        speaker = segment["speaker"]
        seq_str = f"{idx:03d}"
        if verbose_segments:
            print(f"  [{idx}/{len(segments)}] {speaker}", flush=True)
        elif idx == 1 or idx == len(segments) or idx % 5 == 0:
            print(f"  progress {idx}/{len(segments)} ({speaker})", flush=True)

        if speaker == "PAUSE":
            if current_sample_rate is None:
                current_sample_rate = 24000
            pcm = generate_silence(PAUSE_SECONDS, current_sample_rate)
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
            episode_parts.append(pcm)
            continue

        source_text = safe_text(segment["text"])
        source_text = apply_lexicon(source_text)
        voice = male_voice if speaker == "ALEX" else female_voice

        try:
            pcm, sample_rate = synthesize_text(kokoro, source_text, voice, max_segment_chars)
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
                gap = INTER_SPEAKER_SECONDS if next_speaker != speaker else INTER_SEGMENT_SECONDS
                if gap > 0:
                    pcm = np.concatenate([pcm, generate_silence(gap, current_sample_rate)])

        if idx == len(segments) and FINAL_SEGMENT_TAIL_SECONDS > 0:
            pcm = np.concatenate([pcm, generate_silence(FINAL_SEGMENT_TAIL_SECONDS, current_sample_rate)])

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
        episode_parts.append(pcm)

    if current_sample_rate is None:
        raise RuntimeError(f"No synthesized content in {script_path.name}")

    (seg_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
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
    args = parser.parse_args()

    scripts = ordered_script_paths(SCRIPTS_DIR)

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
    print(f"Output dir: {args.output_dir}")

    generated = 0
    skipped = 0
    failures = 0

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
            )
            generated += 1
        except Exception as ex:
            failures += 1
            log_failure(script, ex)
            print(f"  Failed: {slug} ({ex})")

    print(f"Done. Generated={generated}, Skipped={skipped}, Failed={failures}")
    return 0 if failures == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
