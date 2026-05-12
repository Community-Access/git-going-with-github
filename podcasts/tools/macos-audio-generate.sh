#!/usr/bin/env bash
set -euo pipefail

if [ -d .venv ]; then
  source .venv/bin/activate
fi

npm run validate:podcasts
npm run podcast:audio:queue
npm run build:podcast-audio
npm run podcast:metadata:check
npm run podcast:metadata:write
npm run build:podcast-site
npm run validate:podcast-feed
npm run podcast:inventory:check

echo "Audio generation, metadata tagging, feed build, and inventory validation complete."
