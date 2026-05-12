# Legacy Podcast Tools

These scripts are retained for diagnostics, forensic comparison, and one-off repair work from earlier podcast production passes. They are not part of the supported production pipeline.

Use the supported commands in [../../README.md](../../README.md) for normal transcript, feed, metadata, inventory, and audio generation work.

Production audio generation uses `python -m podcasts.tts.generate_all_kokoro --audio-format mp3`. The legacy Piper fallback remains available through `npm run build:podcast-audio:piper`.
