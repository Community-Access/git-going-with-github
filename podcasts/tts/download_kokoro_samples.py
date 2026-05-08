#!/usr/bin/env python3
"""Download Kokoro model files and generate sample WAV files.

Usage:
  python -m podcasts.tts.download_kokoro_samples
  python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
  python -m podcasts.tts.download_kokoro_samples --voice af_sarah
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from urllib.request import urlretrieve

import soundfile as sf
from kokoro_onnx import Kokoro


ROOT = Path(__file__).resolve().parent.parent
TTS_DIR = ROOT / "tts"
MODELS_DIR = TTS_DIR / "models"
SAMPLES_DIR = TTS_DIR / "samples" / "kokoro"
LOGS_DIR = ROOT / "logs"

MODEL_URL = (
    "https://github.com/thewh1teagle/kokoro-onnx/releases/download/"
    "model-files-v1.0/kokoro-v1.0.onnx"
)
VOICES_URL = (
    "https://github.com/thewh1teagle/kokoro-onnx/releases/download/"
    "model-files-v1.0/voices-v1.0.bin"
)

MODEL_PATH = MODELS_DIR / "kokoro-v1.0.onnx"
VOICES_PATH = MODELS_DIR / "voices-v1.0.bin"

# Kokoro does not publish low/medium/high tiers. In this repo, the English
# voice set is treated as the "high-quality English" set for sampling.
ENGLISH_PREFIXES = ("af_", "am_", "bf_", "bm_")
LANGUAGE_BY_PREFIX = {
    "a": "en-us",
    "b": "en-gb",
    "e": "es",
    "f": "fr-fr",
    "h": "hi",
    "i": "it",
    "j": "ja",
    "p": "pt-br",
    "z": "zh",
}


def _log(message: str) -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    path = LOGS_DIR / "kokoro_samples.log"
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    with path.open("a", encoding="utf-8") as handle:
        handle.write(f"[{timestamp}] {message}\n")


def ensure_model_files() -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)

    if not MODEL_PATH.exists():
        _log(f"DOWNLOAD {MODEL_URL}")
        urlretrieve(MODEL_URL, MODEL_PATH)

    if not VOICES_PATH.exists():
        _log(f"DOWNLOAD {VOICES_URL}")
        urlretrieve(VOICES_URL, VOICES_PATH)


def is_english_voice(voice: str) -> bool:
    return voice.startswith(ENGLISH_PREFIXES)


def infer_lang(voice: str) -> str:
    prefix = voice.split("_", 1)[0]
    if not prefix:
        return "en-us"
    return LANGUAGE_BY_PREFIX.get(prefix[0], "en-us")


def sample_text_for_voice(voice: str) -> str:
    return (
        "Hello from the Git Going with GitHub voice lab. "
        f"This is a sample generated with Kokoro voice {voice}."
    )


def write_catalog(voices: list[str], english: list[str]) -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    (LOGS_DIR / "kokoro_voices_all.txt").write_text(
        "\n".join(sorted(voices)) + "\n", encoding="utf-8"
    )
    (LOGS_DIR / "kokoro_voices_english_high_quality.txt").write_text(
        "\n".join(sorted(english)) + "\n", encoding="utf-8"
    )

    manifest = {
        "all_voice_count": len(voices),
        "english_high_quality_count": len(english),
        "all_voices": sorted(voices),
        "english_high_quality_voices": sorted(english),
    }
    (LOGS_DIR / "kokoro_voice_manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )


def synthesize_samples(
    kokoro: Kokoro,
    voices: list[str],
    destination: Path,
    *,
    force: bool,
) -> tuple[int, int]:
    destination.mkdir(parents=True, exist_ok=True)

    generated = 0
    skipped = 0

    for voice in voices:
        out_wav = destination / f"{voice}.wav"
        if out_wav.exists() and not force:
            skipped += 1
            continue

        text = sample_text_for_voice(voice)
        lang = infer_lang(voice)
        try:
            samples, sample_rate = kokoro.create(text, voice=voice, speed=1.0, lang=lang)
        except RuntimeError:
            # Some local espeak builds do not include every language variant.
            # Retry with English so sample generation can continue.
            samples, sample_rate = kokoro.create(text, voice=voice, speed=1.0, lang="en-us")
        sf.write(out_wav, samples, sample_rate)
        generated += 1
        _log(f"SYNTH {voice} -> {out_wav}")

    return generated, skipped


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Download Kokoro model assets and synthesize sample voice WAVs."
    )
    parser.add_argument(
        "--voice",
        help="Generate one specific voice sample, for example: af_sarah",
    )
    parser.add_argument(
        "--english-high-quality-only",
        action="store_true",
        help="Generate only English voices (af/am/bf/bm prefixes).",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate samples even if WAV files already exist.",
    )
    args = parser.parse_args()

    ensure_model_files()
    kokoro = Kokoro(str(MODEL_PATH), str(VOICES_PATH))

    all_voices = sorted(kokoro.get_voices())
    english_hq_voices = sorted([voice for voice in all_voices if is_english_voice(voice)])
    write_catalog(all_voices, english_hq_voices)

    if args.voice:
        targets = [args.voice]
        out_dir = SAMPLES_DIR / "single"
    elif args.english_high_quality_only:
        targets = english_hq_voices
        out_dir = SAMPLES_DIR / "english-high-quality"
    else:
        targets = all_voices
        out_dir = SAMPLES_DIR / "all"

    generated, skipped = synthesize_samples(
        kokoro,
        targets,
        out_dir,
        force=args.force,
    )

    print(f"Kokoro voices available: {len(all_voices)}")
    print(f"English high-quality voices: {len(english_hq_voices)}")
    print(f"Target voices this run: {len(targets)}")
    print(f"Generated: {generated}")
    print(f"Skipped existing: {skipped}")
    print(f"Samples folder: {out_dir}")


if __name__ == "__main__":
    main()
