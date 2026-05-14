# Audio and Metadata Integration (Technical)

## Goal

Ensure LLM-generated review outputs can pass through existing MP3 rendering and metadata automation without custom downstream changes.

## Runtime data flow

1. Candidate generation (review lane):
   - `src/generate-teaching-transcript.js`
   - emits candidate JSON with script and chapter plan fields.
2. Candidate publishing (review lane):
   - `src/publish-candidate.js`
   - writes:
     - review output artifacts under `output/published/<slug>/`
     - live artifacts under `podcasts/scripts/<group>/` and `podcasts/transcripts/<group>/` when `--write-live` is used.
3. Audio synthesis (existing pipeline):
   - `python -m podcasts.tts.generate_audio`
   - reads live script text from `podcasts/scripts/**/<slug>.txt`
   - writes segment audio and `podcasts/audio/segments/<slug>/manifest.json`.
4. Metadata tagging (existing pipeline):
   - `python podcasts/tag-audio-metadata.py`
   - reads live chapter plans from `podcasts/transcripts/**/<slug>-chapters.json`
   - combines plan indexes with segment timing manifest
   - writes ID3 tags and chapter sidecars (`podcasts/chapters/<slug>.json`).

## Integration decisions

- The review lane writes chapter plans in the same shape used by metadata tagging (`chapters[].startSegmentIndex`).
- Spoken transcripts are constrained to avoid spoken chapter-label phrasing; chapter structure remains metadata-driven.
- Metadata tagging now supports `--slug` targeting so partial review rollout can be tagged safely without full-catalog writes.
- `--expected-count` now defaults to selected target count when omitted, which keeps slug-scoped runs deterministic.

## New helper for end-to-end single slug

- `src/render-and-tag.js` performs:
  1. publish candidate with `--write-live`
  2. generate MP3 for that slug
  3. run metadata tagging for that slug (`--slug`, `--expected-count 1`).

This enables a clean regression loop for one chapter/challenge/appendix at a time.

## Validation strategy

- Keep repository validation (`npm run validate:podcasts`) as baseline integrity check.
- For one-slug technical verification:
  1. publish candidate to live paths
  2. generate one MP3
  3. run `tag-audio-metadata.py --slug <slug> --write`
  4. confirm chapter sidecar and ID3 tags were written.
