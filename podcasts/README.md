# Podcast Audio Pipeline

This directory contains the complete pipeline for producing the Git Going with GitHub audio series: 54 companion episodes of two-host conversational content designed for blind and low-vision developers, plus 21 Challenge Coach episodes placed near the chapters they support.

## Pipeline Overview

```
build-bundles.js     Generate source bundles from chapter content
        |
        v
  bundles/*.md       One bundle per episode (production prompt + source material)
        |
        v
  scripts/*.txt      Conversational scripts with [ALEX]/[JAMIE]/[PAUSE] markers
        |
        v
  transcripts/*-chapters.json  Ordered chapter plans by segment index
        |
        v
  tts/               Local neural TTS (ONNX models, pronunciation lexicon)
        |
        v
      audio/*.(wav|mp3)  Final episode files (gitignored - hosted on GitHub Releases)
        |
        v
generate-site.js     Build PODCASTS.md player page and RSS feed from manifest
```

Audio is generated locally using ONNX text-to-speech models. No cloud APIs, no API keys, no billing. Runs entirely on your machine.

Use the unified audio command as the front door. It defaults to Kokoro, the production audio path. Piper remains available only when explicitly selected for fallback or comparison. See [Piper Fallback TTS](tts/PIPER.md) for setup, scope, and validation guidance.

```bash
python -m podcasts.tts.generate_audio --audio-format mp3
python -m podcasts.tts.generate_audio --engine kokoro --audio-format mp3
python -m podcasts.tts.generate_audio --engine piper --audio-format mp3
```

`podcasts/config/listening-order.json` controls the public listening path. It interleaves companion lessons, Challenge Coach episodes, and reference episodes so podcast apps and the generated player page present the workshop as one end-to-end experience. The audio generators and inventory tools use the same order, so generation queues match the learner path.

Final episode output format is configurable through `podcasts/tts/voice-config.ini` (`episode_audio_format = wav|mp3|both`). MP3 generation requires `ffmpeg` on your PATH.

After all MP3 files and segment manifests are generated, run the metadata pass to add ID3 tags, embed the source script, and derive smart chapter markers for each episode. The metadata pass defaults to a dry run so it can verify the full 75-file set before touching audio.

## Directory Structure

The following tree separates source files, generated artifacts, local caches, and legacy helpers.

```text
podcasts/
  README.md                         This guide
  REGENERATION.md                   Full regeneration runbook
  config/listening-order.json       Canonical public listening path
  lib/listening-plan.js             Shared JavaScript listening-order resolver
  listening_plan.py                 Shared Python listening-order resolver
  build-bundles.js                  Companion episode catalog and bundle generator
  build-challenge-bundles.js        Challenge Coach catalog and bundle generator
  generate-draft-transcripts.js     Reviewable Alex/Jamie script generator
  generate-site.js                  Generates admin/PODCASTS.md and feed.xml
  validate-catalog.js               Validates source coverage
  validate-listening-order.js       Validates the complete public listening path
  validate-feed.js                  Validates RSS structure and enclosures
  verify_audio_inventory.py         Validates scripts, transcripts, manifests, and MP3s
  tag-audio-metadata.py             Writes ID3 metadata and chapter markers
  manifest.json                     Companion episode metadata
  feed.xml                          Generated RSS feed
  bundles/                          Generated companion prompt packets
  challenge-bundles/                Generated Challenge Coach prompt packets
  scripts/                          Committed transcript source scripts
      transcripts/                      Derived segment JSON transcripts and chapter plans
      chapters/                         Podcasting 2.0 chapter JSON sidecars written during metadata tagging
  audio/                            Local audio output and segment cache, not committed
  logs/                             Local generation and inventory reports
      tools/agentic-pilot/              One-episode packet builder and transcript evaluation helpers
  tools/legacy/                     Older diagnostic and one-off helpers
  tts/                              Production and fallback TTS package
```

## Prerequisites

- Python 3.10 or later
- Kokoro TTS: `pip install kokoro-onnx soundfile numpy`
- FFmpeg on your PATH for MP3 conversion
- Mutagen for MP3 ID3 metadata: `pip install mutagen`
- Node.js 18 or later (for bundle/site generation only)

For full regeneration guidance after curriculum changes, see [Podcast Regeneration Runbook](REGENERATION.md).

## Quick Start

### 1. Install Kokoro and metadata tooling

```bash
pip install kokoro-onnx soundfile numpy
pip install mutagen
```

### 2. Download voice models (if not already present)

```bash
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

This downloads the Kokoro ONNX model and voices file to `podcasts/tts/models/`.

### 3. Validate the catalog and generate fresh local bundles

```bash
npm run validate:podcasts
npm run build:podcast-bundles
npm run build:podcast-challenge-bundles
npm run generate:podcast-transcripts
```

`podcasts/bundles/*.md` files are generated prompt packets. They are intentionally ignored by git and should be regenerated when needed.
`podcasts/challenge-bundles/*.md` files are the same kind of generated prompt packet, but scoped to individual Challenge Coach episodes.

Transcript generation now writes three artifacts for each episode or challenge:

- the transcript source in `podcasts/scripts/`
- the segment manifest in `podcasts/transcripts/*-segments.json`
- the ordered chapter plan in `podcasts/transcripts/*-chapters.json`

The chapter plan is sequential, not time-based. It stores chapter titles with segment indexes. Later, the metadata pass converts those ordered boundaries into timed ID3 chapter markers and Podcasting 2.0 chapter sidecars after audio generation.

You can also regenerate a subset instead of rebuilding all 75 scripts:

```bash
npm run generate:podcast-transcript -- --slug ep05-working-with-issues
npm run generate:podcast-transcript -- --start 1 --end 4 --group challenges
npm run generate:podcast-transcript -- --start 20 --end 25 --group appendices
```

### 4. Generate all episodes

Preview the listening-order generation queue without loading models or creating audio:

```bash
npm run podcast:audio:queue
```

Then generate audio when you are ready:

```bash
python -m podcasts.tts.generate_audio --audio-format mp3
```

This batch command processes the full committed script set: all `ep*.txt` companion episodes plus all `cc-*.txt` Challenge Coach and bonus episodes.

Or generate a single episode:

```bash
python -m podcasts.tts.generate_audio --start 0 --end 0 --force --audio-format mp3
python -m podcasts.tts.generate_audio --start 5 --end 5 --force --audio-format mp3
```

Or a range:

```bash
python -m podcasts.tts.generate_audio --start 0 --end 10 --audio-format mp3
```

### 5. Build player page and RSS feed

```bash
npm run build:podcast-site
```

## Voice Configuration

The default voices are:

| Host  | Kokoro Voice | Character | Description |
|-------|--------------|-----------|-------------|
| Alex  | am_liam      | Lead host, experienced, warm | Male, polished delivery with stronger presence |
| Jamie | af_jessica   | Co-host, curious, energetic | Female, clear and natural delivery |

Listen to samples in `podcasts/tts/samples/` to try different voices.

To change Kokoro voices, pass `--male-voice` and `--female-voice` through the unified command: `python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica`.

Pitch can be configured independently per host in `podcasts/tts/voice-config.ini`:

```ini
male_pitch_semitones = -1.0
female_pitch_semitones = 0.8
```

For backwards compatibility, `pitch_semitones` is still accepted and applies the same shift to both voices.

## Pronunciation Lexicon

The file `podcasts/tts/lexicon.txt` contains pronunciation overrides for technical terms, acronyms, and jargon. The lexicon is applied as text substitution before Kokoro synthesizes each segment.

Format: one entry per line, tab-separated `WORD<tab>REPLACEMENT`. Lines starting with `#` are comments.

Example entries:

```
WCAG    W-Cag
NVDA    N V D A
GitHub  Git Hub
JSON    Jason
```

Add new entries when Kokoro mispronounces a word. The lexicon is loaded once per run and uses word-boundary matching so entries like `GUI` do not affect words like "guidelines".

## Manifest Status Flow

Each episode in manifest.json progresses through these statuses:

```
bundle-ready  -->  script-ready  -->  audio-ready  -->  published
(build-bundles)    (scripts/)         (tts/)            (GitHub Release)
```

## All npm Scripts

The following table lists the supported podcast build and validation commands.

| Command | What It Does |
|---------|-------------|
| `npm run validate:podcasts` | Validate episode catalog source mappings and the complete listening order |
| `npm run build:podcast-bundles` | Generate source bundles from chapters |
| `npm run build:podcast-challenge-bundles` | Generate source bundles for Challenge Coach episodes |
| `npm run generate:podcast-transcripts` | Replace old scripts with fresh reviewable Alex/Jamie draft transcripts |
| `npm run generate:podcast-transcript -- --slug <slug>` | Regenerate one selected transcript or a filtered range using `--start`, `--end`, and `--group` |
| `npm run podcast:agentic:packet -- --slug <slug>` | Build a single episode source packet for GPT-5.4 rewrite and review workflows |
| `npm run podcast:agentic:promote -- --slug <slug>` | Promote an accepted GPT-5.4 pilot transcript into the live script path and refresh its segment JSON |
| `npm run podcast:chapters:normalize` | Normalize generated chapter-plan sidecars to remove weak or overly generic titles |
| `npm run podcast:chapters:audit` | Audit all generated chapter-plan sidecars and report title quality across the full catalog |
| `npm run build:podcast-transcripts` | Run validation, regenerate bundles, regenerate transcripts, and rebuild podcast page/feed |
| `npm run build:podcast-audio` | Generate MP3 audio for all companion, Challenge Coach, and bonus scripts with local Kokoro TTS |
| `npm run build:podcast-audio:piper` | Generate audio with the legacy local Piper TTS path |
| `npm run build:podcast-audio:kokoro` | Generate MP3 audio with the Kokoro TTS path |
| `npm run podcast:audio:queue` | Print the listening-order audio generation queue without creating MP3 files |
| `npm run build:podcast-transcripts-and-audio` | Run full transcript pipeline, generate audio, and rebuild podcast page/feed |
| `npm run build:podcast-site` | Build player page and RSS feed |
| `npm run podcast:metadata:check` | Dry-run validation that all 75 MP3s and matching scripts are present before tagging |
| `npm run podcast:metadata:write` | Write ID3 metadata, embed episode scripts and smart chapters, write chapter JSON sidecars, and touch all 75 MP3 files |
| `npm run build:podcasts` | Bundles + site |
| `npm run build` | Full build: podcasts + HTML site |

## Publishing Audio

Audio files are hosted on GitHub Releases (not in the repository, they are gitignored).

1. Generate all audio as MP3 files: `npm run build:podcast-audio`
2. Confirm all expected MP3 files exist: `npm run podcast:metadata:check`
3. Write ID3 tags, embed the source script, derive smart chapter markers, and touch each MP3: `npm run podcast:metadata:write`
4. Build the podcast page and RSS feed: `npm run build:podcast-site`
5. Create a GitHub Release tagged `podcasts`
6. Upload the MP3 files from `podcasts/audio/` or the selected voice output folder as release assets
7. The RSS feed points to release asset URLs, links chapter JSON sidecars, and embeds clean script text in each item
8. Update manifest status to `published` and rebuild the site

## Updating Episodes

When chapter content changes:

1. `npm run validate:podcasts` to catch missing source mappings and coverage gaps
2. `npm run build:podcast-bundles` to regenerate local chapter and appendix bundles
3. `npm run build:podcast-challenge-bundles` to regenerate local challenge bundles
4. `npm run generate:podcast-transcripts` to replace old scripts with fresh reviewable drafts
5. Review and edit the scripts in `podcasts/scripts/`
6. `python -m podcasts.tts.generate_all_kokoro --start <number> --end <number> --force --audio-format mp3` to regenerate audio
7. `npm run podcast:metadata:check` to verify the complete MP3 set before tagging
8. `npm run podcast:metadata:write` to refresh ID3 tags, smart chapters, chapter JSON, and touch every generated MP3
9. `npm run build:podcast-site` to update the player page and RSS feed
10. Upload new audio to the GitHub Release
11. Commit reviewed scripts, metadata, generated site/feed files, and source changes

## MP3 Metadata, Embedded Scripts, and Chapters

The metadata tool writes the following ID3 fields to each MP3:

- Title: episode or challenge title
- Artist, album artist, and publisher: Community Access
- Album: Git Going with GitHub - Audio Series
- Author website: [Community Access website](http://www.community-access.org)
- Description: episode description or challenge focus
- Episode script: the matching `podcasts/scripts/*.txt` source embedded as both a custom text frame and an unsynchronized lyrics frame
- Smart chapters: ID3 chapter frames derived from `podcasts/audio/segments/<episode>/manifest.json`, preferring transcript-authored chapter plans from `podcasts/transcripts/*-chapters.json` when available
- Chapter sidecars: Podcasting 2.0 JSON files in `podcasts/chapters/`, linked from RSS as `podcast:chapters`

Chapter markers now have a two-stage flow:

1. Transcript generation writes ordered chapter plans using segment indexes, while the lesson structure is still available.
2. Metadata tagging converts those segment indexes into timed chapter markers after audio generation.

If no transcript-authored chapter plan exists, the metadata tool falls back to the older pause-aware heuristic. That fallback starts with the opening segment, prefers natural boundaries after `[PAUSE]`, avoids very short chapters, and forces a new marker when a section grows too long.

For one-episode GPT-5.4 pilot work, see `podcasts/tools/agentic-pilot/README.md`.

For a full-catalog refresh, the recommended sequence is:

```bash
npm run generate:podcast-transcripts
npm run podcast:chapters:normalize
npm run podcast:chapters:audit
```

Run the dry-run check first:

```bash
npm run podcast:metadata:check
```

Only after all 75 MP3 files and segment manifests exist, write tags, chapters, and refresh file modification times:

```bash
npm run podcast:metadata:write
```

If you are testing a partial batch intentionally, call the tool directly with `--allow-missing` and an explicit audio directory. Do not use that option for the final publishing pass.

## Troubleshooting

### Kokoro dependencies missing

Ensure Kokoro and audio dependencies are installed:

```bash
pip install kokoro-onnx soundfile numpy
```

### Model not found

Download models first:

```bash
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

The legacy Piper model downloader is still available for fallback runs:

```bash
python -m podcasts.tts.download_samples
```

### Mispronounced word

Add an entry to `podcasts/tts/lexicon.txt` with the correct pronunciation and regenerate the episode.

### Script quality issues

If generated scripts miss concepts or have formatting issues:

- Regenerate `podcasts/bundles/*.md` from the current source material
- Edit the script manually in `podcasts/scripts/` before generating audio
- Check that the final script uses only `[ALEX]`, `[JAMIE]`, and `[PAUSE]` markers
- Keep the Alex/Jamie banter style while making the teaching accurate

### Audio sounds robotic or unnatural

- Try different Kokoro voices with `--male-voice` and `--female-voice`
- Adjust the generator options in `podcasts/tts/generate_all_kokoro.py` for spacing and chunking
- Add pronunciation fixes to `podcasts/tts/lexicon.txt`

## Cost Summary

| Step | Tool | Cost |
|------|------|------|
| Bundle generation | Local Node.js script | Free |
| Script drafting | Manual or AI-assisted, reviewed before commit | Depends on chosen tool |
| Audio synthesis | Local Kokoro TTS | Free |
| Site and RSS generation | Local Node.js script | Free |
