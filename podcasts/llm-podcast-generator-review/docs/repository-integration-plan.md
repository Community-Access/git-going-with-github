# Repository Integration Plan

## Current pipeline

The existing podcast pipeline already has these layers:

1. Podcast catalog validation.
2. Bundle generation from source Markdown.
3. Deterministic transcript generation.
4. Segment JSON and chapter-plan JSON generation.
5. Local TTS audio generation.
6. Site and RSS feed generation.
7. Metadata and inventory checks.

The proposed LLM generator should replace only layer 3 for selected episodes. Everything downstream should remain compatible.

The review lane now uses:

- `podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js`
- `podcasts/llm-podcast-generator-review/src/run-regression.js`
- source packets from `podcasts/tools/agentic-pilot/build-source-packet.js`
- transcript quality gates from `podcasts/tools/agentic-pilot/evaluate-transcript.js`

## Safe adoption path

### Phase 1: Review folder only

Keep this folder in the root of the repository:

```text
podcasts/llm-podcast-generator-review/
```

No live pipeline changes.

### Phase 2: Pilot branch

Create a branch:

```powershell
git checkout -b feature/llm-podcast-generator
```

Move the generator into:

```text
podcasts/tools/llm/generate-teaching-transcript.js
```

Add scripts to `package.json`.

### Phase 3: One chapter and one challenge

Generate:

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --slug ep05-working-with-issues --limit 1
node podcasts/llm-podcast-generator-review/src/run-regression.js --slug cc-02-file-your-first-issue --limit 1
```

Review for quality and source coverage.

### Phase 4: Publish and promote pilot transcripts

Once accepted:

```powershell
node podcasts/llm-podcast-generator-review/src/publish-candidate.js --slug ep05-working-with-issues --candidate <path-to-candidate.json> --write-live
node podcasts/llm-podcast-generator-review/src/publish-candidate.js --slug cc-02-file-your-first-issue --candidate <path-to-candidate.json> --write-live
```

Then:

```powershell
npm run build:podcast-site
npm run podcast:chapters:audit
npm run validate:podcasts
python -m podcasts.tts.generate_audio --group chapters --start 5 --end 5 --force --audio-format mp3
python podcasts/tag-audio-metadata.py --slug ep05-working-with-issues --audio-dir podcasts/audio/kokoro-am_liam-af_jessica --expected-count 1 --write
```

### Phase 5: Batch small groups

Generate in reviewable groups with `run-regression.js`:

- core chapters
- appendices
- challenge episodes
- bonus challenges

Do not regenerate everything at once until the review process is proven.

## Artifact mapping

LLM output should create or update:

```text
podcasts/llm-podcast-generator-review/generated/<slug>.prompt.md
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/mini.candidate.json
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/polish.candidate.json
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/summary.json
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>.txt
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-segments.json
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-chapters.json
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-chapter-preview.json
```

## Promotion rule

A generated transcript should not become production merely because it exists. It should pass:

- source coverage review
- accessibility language review
- host voice review
- chapter title review
- technical accuracy review
- screen reader workflow review

## Why this is magical but safe

The magic is in the teaching: a model can transform dense Markdown into a warm, complete, conversational lesson.

The safety is in the pipeline: source Markdown remains the authority, transcripts remain reviewable text, and existing audio/site tooling remains intact.
