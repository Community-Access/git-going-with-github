
**Table: TTS pipeline outcomes and provided commands**
# TTS Setup: Piper and Kokoro

This runbook documents the end-to-end local setup for the workshop TTS toolchain.

For full GitHub Classroom deployment, use [classroom/README.md](../../classroom/README.md). That guide covers classroom creation, assignments, invite links, seeding, testing, and teardown.

## What this runbook covers

It covers the following setup outcomes.

| Outcome | Provided by |
|---|---|
| Install Piper CLI/runtime | `python -m pip install piper-tts` |
| Download Piper `en_US` voices and WAV samples | `python -m podcasts.tts.download_samples` |
| Install Kokoro ONNX runtime | `python -m pip install kokoro-onnx` |
| Download Kokoro model files | `python -m podcasts.tts.download_kokoro_samples` |
| Generate Kokoro WAV samples for all voices | `python -m podcasts.tts.download_kokoro_samples` |
| Generate Kokoro English high-quality voice samples only | `python -m podcasts.tts.download_kokoro_samples --english-high-quality-only` |

## Install requirements

From repository root:

```powershell
python -m pip install --upgrade pip
python -m pip install piper-tts kokoro-onnx soundfile numpy
```

## One-command setup via npm scripts

From repository root:

```powershell
npm run tts:setup-all
```

This runs Piper sample download plus Kokoro model and sample generation.

## Piper setup and samples

Download all `en_US` Piper voices and synthesize one WAV sample per voice:

```powershell
python -m podcasts.tts.download_samples
```

Generate one specific Piper voice sample:

```powershell
python -m podcasts.tts.download_samples --voice en_US-ryan-high
```

Piper files are written here:

- Models: `podcasts/tts/models/`
- Samples: `podcasts/tts/samples/`
- Log file: `podcasts/logs/piper_samples.log`

## Kokoro setup and samples

Generate samples for all Kokoro voices:

```powershell
python -m podcasts.tts.download_kokoro_samples
```

Generate only English high-quality voices:

```powershell
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

Generate one specific Kokoro voice:

```powershell
python -m podcasts.tts.download_kokoro_samples --voice af_sarah
```

Kokoro files are written here:

- Model files: `podcasts/tts/models/kokoro-v1.0.onnx` and `podcasts/tts/models/voices-v1.0.bin`
- All-voice samples: `podcasts/tts/samples/kokoro/all/`
- English high-quality samples: `podcasts/tts/samples/kokoro/english-high-quality/`
- Voice catalogs: `podcasts/logs/kokoro_voices_all.txt` and `podcasts/logs/kokoro_voices_english_high_quality.txt`

## Notes

- Large model and sample artifacts are ignored by git via `.gitignore` (`podcasts/tts/models/` and `podcasts/tts/samples/`).
- Kokoro does not publish low/medium/high voice tiers like Piper. In this repository, English voices are treated as the high-quality English set for practical testing.