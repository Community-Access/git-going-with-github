# Mac Audio Generation Handoff

This handoff is for generating the Git Going with GitHub podcast MP3 files on a fast Mac. Kokoro is the default production engine. Piper is available only as an explicit fallback.

## What Is Included

The handoff folder includes:

- `podcasts/scripts/` - source audio scripts with `[ALEX]`, `[JAMIE]`, and `[PAUSE]` markers.
- `podcasts/transcripts/` - derived transcript segment JSON.
- `podcasts/config/listening-order.json` - the canonical generation and feed order.
- `podcasts/tts/` - Kokoro and Piper generation code, lexicon, and requirements.
- `podcasts/lib/` and `podcasts/listening_plan.py` - shared listening-order helpers.
- `podcasts/manifest.json` and `podcasts/build-challenge-bundles.js` - metadata needed for ordering and tagging.
- `package.json` and `package-lock.json` - Node commands and locked dependencies.

The folder does not include generated MP3/WAV files, local TTS models, or `node_modules`.

## Mac Prerequisites

Install these once:

```bash
brew install python ffmpeg node
```

Use Python 3.10 or later. Apple Silicon Macs work well with the default Python wheels.

## Setup

From the handoff folder root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r podcasts/tts/requirements.txt
npm ci
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

Or run the setup helper:

```bash
bash podcasts/tools/macos-audio-setup.sh
```

The model download writes to `podcasts/tts/models/`. That folder is intentionally local and not committed.

## Preview the Queue

This prints the full listening path without generating audio:

```bash
npm run podcast:audio:queue
```

The queue should show 75 scripts in learning order, with Challenge Coach episodes interleaved near supporting chapters.

## Generate a Single Trial Episode

Start with Episode 00:

```bash
python -m podcasts.tts.generate_audio --start 0 --end 0 --force --audio-format mp3
```

Verify the output:

```bash
python podcasts/verify_audio_inventory.py --include-appendices --write-report --audio-dir podcasts/audio/kokoro-am_liam-af_jessica
```

A partial run is expected to report missing audio for the other 74 episodes.

## Generate the Full Production Batch

After the Episode 00 trial sounds good:

```bash
npm run build:podcast-audio
```

Or run the full helper, which generates audio, writes metadata, rebuilds the feed, and validates inventory:

```bash
bash podcasts/tools/macos-audio-generate.sh
```

This uses Kokoro by default and writes MP3s to:

```text
podcasts/audio/kokoro-am_liam-af_jessica/
```

## Tag Metadata

After all 75 MP3s and segment manifests exist:

```bash
npm run podcast:metadata:check
npm run podcast:metadata:write
```

The metadata pass writes:

- Title
- Artist and album artist: Community Access
- Album: Git Going with GitHub - Audio Series
- Publisher
- Track number matching listening order
- Author website and contact email
- Episode description
- Embedded source script
- ID3 chapter frames
- Podcasting 2.0 chapter JSON sidecars in `podcasts/chapters/`

## Build and Validate Feed

```bash
npm run build:podcast-site
npm run validate:podcast-feed
npm run podcast:inventory:check
```

When all audio is present, feed validation should report 75 checked items.

## Optional Piper Fallback

Use Piper only if Kokoro cannot run or if you need a comparison render:

```bash
python -m podcasts.tts.generate_audio --engine piper --start 0 --end 0 --audio-format mp3
```

See `podcasts/tts/PIPER.md` for Piper setup and scope.

## Files to Return

After generation, return these folders/files:

```text
podcasts/audio/kokoro-am_liam-af_jessica/*.mp3
podcasts/audio/segments/**/manifest.json
podcasts/chapters/*.json
podcasts/audio/metadata-touch-report.json
podcasts/logs/audio_inventory_report.json
podcasts/feed.xml
admin/PODCASTS.md
```

The segment WAV files are useful for debugging but are large. Return them only if we need to inspect timing or regenerate assembled audio without re-synthesizing speech.
