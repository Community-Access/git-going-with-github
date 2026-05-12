#!/usr/bin/env bash
set -euo pipefail

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required. Install it from https://brew.sh/ and rerun this script." >&2
  exit 1
fi

brew install python ffmpeg node
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r podcasts/tts/requirements.txt
npm ci
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
npm run validate:podcasts
npm run podcast:audio:queue

echo "Mac audio setup complete. Run: source .venv/bin/activate && npm run build:podcast-audio"
