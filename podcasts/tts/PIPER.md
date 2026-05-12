# Piper Fallback TTS

Kokoro is the production audio path for this project. Piper is kept as a durable fallback and comparison engine for machines where Kokoro is unavailable or when maintainers want to compare voice quality.

## When to Use Piper

Use Piper only when:

- Kokoro dependencies cannot be installed on the target machine.
- You need a local fallback to compare pronunciation, pacing, or voice character.
- You are diagnosing whether an issue is script-related or engine-related.

Do not use Piper for the final published audio unless the project intentionally switches production engines.

## Setup

Run these commands from the repository root:

```powershell
python -m pip install piper-tts
python -m podcasts.tts.download_samples
```

The downloaded Piper models live under `podcasts/tts/models/`, which is intentionally ignored by git.

## Generate Audio with Piper

Use the npm wrapper:

```powershell
npm run build:podcast-audio:piper
```

Or call the unified audio command directly:

```powershell
python -m podcasts.tts.generate_audio --engine piper --start 0 --end 10 --audio-format mp3
```

The older Piper module remains available for diagnostics:

```powershell
python -m podcasts.tts.generate_all --start 0 --end 10
```

The legacy Piper batch path follows the same canonical listening order as Kokoro, so Challenge Coach episodes stay near the chapters they support.

## Configuration

Piper runtime settings live in `podcasts/tts/voice-config.ini` and can also be overridden with environment variables documented in `generate_episode.py`.

The default Piper voices are:

| Host | Piper model | Purpose |
|---|---|---|
| Alex | `en_US-ryan-high.onnx` | Lead host fallback voice |
| Jamie | `en_US-lessac-high.onnx` | Co-host fallback voice |

## Validation

After a Piper test run, use the same checks as Kokoro:

```powershell
npm run podcast:inventory:check
npm run podcast:metadata:check
npm run build:podcast-site
npm run validate:podcast-feed
```

For production, return to Kokoro unless maintainers explicitly decide otherwise.
