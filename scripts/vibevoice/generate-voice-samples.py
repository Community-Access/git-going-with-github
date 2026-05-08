"""
VibeVoice Voice Comparison Sample Generator
--------------------------------------------
Generates one WAV file per available English speaker using the same
comparison text, so you can listen and pick the voice that fits your project.

Requirements
  - Python 3.10+
  - VibeVoice repo cloned and installed (run setup-vibevoice.bat first)
  - NVIDIA GPU with CUDA recommended; runs on CPU but will be slow

Usage (from the VibeVoice repo root, with the venv active)
  python ../scripts/vibevoice/generate-voice-samples.py

Outputs
  ./voice-samples/<speaker_name>.wav   one file per voice
  ./voice-samples/README.md            voice descriptions summary

Available built-in English voices (no additional download needed)
  Carter  - male, neutral American
  Davis   - male, slightly warmer tone
  Emma    - female, clear American
  Frank   - male, deeper resonance
  Grace   - female, softer delivery
  Mike    - male, conversational
  Samuel  - male, Indian-English accent

Experimental voice packs (run demo/download_experimental_voices.sh first)
  en1 pack - 5-6 additional English style variants
  en2 pack - 5-6 additional English style variants
  Plus: German, French, Italian, Japanese, Korean, Dutch, Polish, Portuguese, Spanish
"""

import argparse
import copy
import glob
import os
import sys
import time

import torch
import soundfile as sf

# ---------------------------------------------------------------------------
# Sample text used for all voice comparisons -- keep it short enough to be
# fast but long enough to capture speaking style.
# ---------------------------------------------------------------------------
COMPARISON_TEXT = (
    "Welcome. I am your guide for today. "
    "This is a short voice comparison sample so you can evaluate tone, "
    "pace, and clarity before choosing the right voice for your project. "
    "Let me know which one sounds best to you."
)

# ---------------------------------------------------------------------------
# Voice metadata -- supplement the file names with human-readable notes
# ---------------------------------------------------------------------------
VOICE_NOTES = {
    "en-carter_man":  "Male | Neutral American | Clear diction",
    "en-davis_man":   "Male | Warm American | Slightly slower cadence",
    "en-emma_woman":  "Female | Clear American | Professional tone",
    "en-frank_man":   "Male | Deeper resonance | Authoritative",
    "en-grace_woman": "Female | Softer delivery | Friendly",
    "en-mike_man":    "Male | Conversational | Natural pace",
    "in-samuel_man":  "Male | Indian-English accent | Distinct character",
}


def detect_device() -> str:
    if torch.cuda.is_available():
        name = torch.cuda.get_device_name(0)
        vram = torch.cuda.get_device_properties(0).total_memory // (1024 ** 3)
        print(f"[INFO] CUDA device: {name} ({vram} GB VRAM)")
        return "cuda"
    if torch.backends.mps.is_available():
        print("[INFO] Using Apple MPS backend")
        return "mps"
    print("[WARNING] No GPU detected -- running on CPU. This will be slow.")
    return "cpu"


def load_model(model_path: str, device: str):
    """Load VibeVoice streaming model and processor."""
    from vibevoice.modular.modeling_vibevoice_streaming_inference import (
        VibeVoiceStreamingForConditionalGenerationInference,
    )
    from vibevoice.processor.vibevoice_streaming_processor import (
        VibeVoiceStreamingProcessor,
    )

    print(f"[INFO] Loading model from: {model_path}")
    attn_impl = "flash_attention_2" if device == "cuda" else "sdpa"

    try:
        if device == "cuda":
            model = VibeVoiceStreamingForConditionalGenerationInference.from_pretrained(
                model_path,
                torch_dtype=torch.bfloat16,
                device_map="cuda",
                attn_implementation=attn_impl,
            )
        elif device == "mps":
            model = VibeVoiceStreamingForConditionalGenerationInference.from_pretrained(
                model_path,
                torch_dtype=torch.float32,
                attn_implementation="sdpa",
                device_map=None,
            )
            model.to("mps")
        else:
            model = VibeVoiceStreamingForConditionalGenerationInference.from_pretrained(
                model_path,
                torch_dtype=torch.float32,
                device_map="cpu",
                attn_implementation="sdpa",
            )
    except Exception:
        print("[WARNING] flash_attention_2 failed; retrying with SDPA")
        model = VibeVoiceStreamingForConditionalGenerationInference.from_pretrained(
            model_path,
            torch_dtype=torch.bfloat16 if device == "cuda" else torch.float32,
            device_map=device if device in ("cuda", "cpu") else None,
            attn_implementation="sdpa",
        )
        if device == "mps":
            model.to("mps")

    model.eval()
    model.set_ddpm_inference_steps(num_steps=5)

    processor = VibeVoiceStreamingProcessor.from_pretrained(model_path)
    print("[INFO] Model and processor loaded.")
    return model, processor


def discover_voices(voices_dir: str, english_only: bool) -> dict:
    """Return {voice_key: pt_file_path} sorted alphabetically."""
    if not os.path.isdir(voices_dir):
        print(f"[ERROR] Voices directory not found: {voices_dir}")
        print("        Make sure you are running from the VibeVoice repo root,")
        print("        or pass --voices-dir explicitly.")
        sys.exit(1)

    pt_files = glob.glob(os.path.join(voices_dir, "**", "*.pt"), recursive=True)
    voices = {}
    for pt in pt_files:
        key = os.path.splitext(os.path.basename(pt))[0].lower()
        if english_only and not (key.startswith("en-") or key.startswith("in-")):
            continue
        voices[key] = os.path.abspath(pt)

    voices = dict(sorted(voices.items()))
    if not voices:
        print("[ERROR] No .pt voice files found. Check --voices-dir path.")
        sys.exit(1)

    print(f"[INFO] Discovered {len(voices)} voice(s): {', '.join(voices.keys())}")
    return voices


def generate_sample(
    model,
    processor,
    voice_path: str,
    text: str,
    device: str,
) -> tuple:
    """
    Generate audio for the given text using the supplied voice preset.
    Returns (audio_tensor, sample_rate).
    """
    from transformers.cache_utils import DynamicCache
    from transformers.modeling_outputs import BaseModelOutputWithPast

    with torch.serialization.safe_globals([BaseModelOutputWithPast, DynamicCache]):
        prefilled = torch.load(voice_path, map_location=device, weights_only=True)

    inputs = processor.process_input_with_cached_prompt(
        text=text,
        cached_prompt=prefilled,
        padding=True,
        return_tensors="pt",
        return_attention_mask=True,
    )
    for k, v in inputs.items():
        if torch.is_tensor(v):
            inputs[k] = v.to(device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=None,
        cfg_scale=1.5,
        tokenizer=processor.tokenizer,
        generation_config={"do_sample": False},
        verbose=False,
        all_prefilled_outputs=copy.deepcopy(prefilled),
    )
    audio = outputs.speech_outputs[0]
    return audio, 24000


def main():
    parser = argparse.ArgumentParser(
        description="Generate one WAV sample per VibeVoice English speaker for comparison"
    )
    parser.add_argument(
        "--model-path",
        default="microsoft/VibeVoice-Realtime-0.5B",
        help="HuggingFace model ID or local path (default: microsoft/VibeVoice-Realtime-0.5B)",
    )
    parser.add_argument(
        "--voices-dir",
        default=None,
        help="Path to demo/voices/streaming_model directory. "
             "Defaults to <repo-root>/demo/voices/streaming_model",
    )
    parser.add_argument(
        "--output-dir",
        default="./voice-samples",
        help="Directory to save comparison WAV files (default: ./voice-samples)",
    )
    parser.add_argument(
        "--text",
        default=COMPARISON_TEXT,
        help="Text to synthesize for every voice (override with your own sentence)",
    )
    parser.add_argument(
        "--all-languages",
        action="store_true",
        help="Include non-English voices (requires running download_experimental_voices.sh first)",
    )
    parser.add_argument(
        "--device",
        default=None,
        help="cuda | mps | cpu (auto-detected if omitted)",
    )
    args = parser.parse_args()

    device = args.device or detect_device()

    # Resolve voices directory
    if args.voices_dir:
        voices_dir = args.voices_dir
    else:
        # Assume script is run from VibeVoice repo root
        voices_dir = os.path.join("demo", "voices", "streaming_model")

    english_only = not args.all_languages
    voices = discover_voices(voices_dir, english_only)

    model, processor = load_model(args.model_path, device)

    os.makedirs(args.output_dir, exist_ok=True)
    print(f"\n[INFO] Saving samples to: {os.path.abspath(args.output_dir)}")
    print(f"[INFO] Comparison text:\n       {args.text}\n")

    results = []
    for key, pt_path in voices.items():
        print(f"[GEN ] {key} ...")
        t0 = time.time()
        try:
            audio, sr = generate_sample(model, processor, pt_path, args.text, device)
            elapsed = time.time() - t0
            out_path = os.path.join(args.output_dir, f"{key}.wav")
            audio_np = audio.squeeze().float().cpu().numpy()
            sf.write(out_path, audio_np, sr)
            duration = len(audio_np) / sr
            note = VOICE_NOTES.get(key, "")
            print(f"       Saved: {out_path}  ({duration:.1f}s audio, {elapsed:.1f}s gen time)")
            results.append((key, note, out_path, True))
        except Exception as exc:
            print(f"       FAILED: {exc}")
            results.append((key, "", "", False))

    # Write a quick README so you know what each file contains
    readme_path = os.path.join(args.output_dir, "README.md")
    with open(readme_path, "w", encoding="utf-8") as fh:
        fh.write("# VibeVoice Comparison Samples\n\n")
        fh.write(f"Sample text used:\n> {args.text}\n\n")
        fh.write("| File | Voice Key | Notes | Generated |\n")
        fh.write("|------|-----------|-------|-----------|\n")
        for key, note, path, ok in results:
            fname = os.path.basename(path) if ok else "FAILED"
            fh.write(f"| `{fname}` | `{key}` | {note} | {'yes' if ok else 'no'} |\n")
        fh.write("\n")
        fh.write("## Online Demo\n\n")
        fh.write("If you want to try voices before running locally:\n\n")
        fh.write("- HuggingFace Space: <https://huggingface.co/spaces/anycoderapps/VibeVoice-Realtime-0.5B>\n")
        fh.write("- Project demos with audio: <https://microsoft.github.io/VibeVoice/>\n")
        fh.write("- Colab notebook: <https://colab.research.google.com/github/microsoft/VibeVoice/blob/main/demo/vibevoice_realtime_colab.ipynb>\n")

    print("\n============================================================")
    print(" Voice comparison samples generated.")
    print(f" Output folder: {os.path.abspath(args.output_dir)}")
    print(f" Summary:       {readme_path}")
    print("============================================================")
    ok_count = sum(1 for _, _, _, ok in results if ok)
    print(f" {ok_count}/{len(results)} voices generated successfully.")
    if ok_count < len(results):
        print(" Some voices failed -- check messages above.")


if __name__ == "__main__":
    main()
