# Batch Command Reference

This file documents the cmd.exe batch files in the repo root for podcast operations.
All batch files change directory to the repo root automatically, so they work correctly
from any location.

## Workflow order

Run operations in this sequence for a full podcast build from scratch:

1. `generate-transcripts.bat` - write episode scripts from the catalog
2. `generate-audio.bat` - synthesise MP3 audio from those scripts
3. `build-rss-feed.bat` - generate the RSS feed and podcast listing
4. `validate-rss-feed.bat` - verify the feed is valid before publishing

## generate-transcripts.bat

Validates the podcast catalog, builds episode and challenge bundles, then writes
all episode and challenge coach scripts to `podcasts\scripts\`.

```
generate-transcripts.bat
```

Output files: `podcasts\scripts\ep*.txt` and `podcasts\scripts\cc-*.txt`

Note: transcript generation always rebuilds all episodes from the catalog.
Range selection is not supported at this stage. Run this step whenever the
catalog or source docs change.

## generate-audio.bat

Synthesises MP3 audio for all episodes or a specific numbered range.
Audio format, voice model, pitch, and speed settings are read from
`podcasts\tts\voice-config.ini`.

The script echoes each episode name and index as it is processed.
ffmpeg is required for MP3 output and is located automatically from the
machine PATH, including after a fresh winget install.

```
generate-audio.bat                  generate all 75 episodes
generate-audio.bat 5                generate episodes 5 and above
generate-audio.bat 5 10             generate episodes 5 through 10
```

Output files: `podcasts\audio\*.mp3`

To change audio format, voice pitch, or speed, edit `podcasts\tts\voice-config.ini`
before running this command.

## build-rss-feed.bat

Generates the RSS 2.0 / iTunes-compatible podcast feed and the admin podcast listing.
Reads MP3 file sizes from `podcasts\audio\` and episode metadata from the catalog.

```
build-rss-feed.bat
```

Output files:

- `podcasts\feed.xml` - the RSS feed for podcast directories
- `admin\PODCASTS.md` - human-readable episode listing

Run this command after `generate-audio.bat` completes so that enclosure lengths
reflect the final MP3 file sizes.

## validate-rss-feed.bat

Runs local RSS 2.0 and iTunes compliance checks on `podcasts\feed.xml`.

```
validate-rss-feed.bat
```

Checks performed:

- Required channel elements: title, link, description, language
- Required per-item elements: title, enclosure, guid
- Enclosure URL, byte length, and MIME type
- Duplicate GUID detection

Run `build-rss-feed.bat` first. The validator exits with a non-zero code on
any failure so it can be used in CI scripts.

## Configuration file

`podcasts\tts\voice-config.ini` controls all audio generation settings.

The following table lists the available settings.

| Key | Description | Example |
|-----|-------------|---------|
| `male_model` | Piper ONNX model file for the male voice (Alex) | `en_US-ryan-high.onnx` |
| `female_model` | Piper ONNX model file for the female voice (Jamie) | `en_US-lessac-high.onnx` |
| `male_pitch_semitones` | Pitch shift in semitones for the male voice | `-2` |
| `female_pitch_semitones` | Pitch shift in semitones for the female voice | `2` |
| `speech_rate` | Words per minute (passed to Piper) | `180` |
| `episode_audio_format` | Output format: `wav`, `mp3`, or `both` | `mp3` |

## npm scripts

The batch files wrap these npm scripts. They can also be run directly from
a PowerShell or bash session at the repo root.

| npm script | Description |
|------------|-------------|
| `npm run validate:podcasts` | Validate the podcast catalog |
| `npm run generate:podcast-transcripts` | Generate transcript scripts |
| `npm run build:podcast-audio` | Generate audio (all episodes) |
| `npm run build:podcast-site` | Build RSS feed and podcast listing |
| `npm run validate:podcast-feed` | Validate the RSS feed |

To pass a range to the audio build from npm:

```
npm run build:podcast-audio -- --start 5 --end 10
```
