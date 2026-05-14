# Agentic Pilot Workflow

This folder contains repeatable tooling for running an LLM-assisted transcript workflow with automatic model selection, without overwriting committed podcast scripts until quality gates pass.

## Goal

Use the existing podcast pipeline for source extraction, script structure, segment manifests, and metadata tagging, while adding a repeatable human-in-the-loop rewrite workflow for better voice, stronger chapter names, and tighter quality checks.

## Workflow

1. Build the podcast source bundles if the curriculum has changed.
2. Generate or refresh the baseline transcript for one episode or challenge.
3. Build a source packet for that slug.
4. Rewrite the transcript with Copilot CLI (auto model selection) using the packet as source of truth.
5. Save the candidate transcript in `podcasts/logs/agentic-pilots/candidates/`.
6. Evaluate the candidate transcript against all mapped source files for that episode/challenge.
7. When accepted, promote the transcript into `podcasts/scripts/`.
8. Run catalog-level repetition and coverage summaries.
9. Audit chapter-plan quality across the catalog and refine weak titles.
10. Regenerate audio and metadata.

## Useful Commands

Generate a single transcript by slug:

```powershell
npm run generate:podcast-transcript -- --slug ep05-working-with-issues
```

Generate a range of companion episodes:

```powershell
npm run generate:podcast-transcript -- --start 5 --end 10 --group chapters
```

Generate a range of challenge episodes:

```powershell
npm run generate:podcast-transcript -- --start 1 --end 4 --group challenges
```

Build the source packet for one slug:

```powershell
npm run podcast:agentic:packet -- --slug ep05-working-with-issues
```

Rewrite one transcript to a candidate and evaluate quality gates:

```powershell
npm run podcast:agentic:rewrite -- --slug ep05-working-with-issues
```

Rewrite and promote one transcript only if quality gates pass:

```powershell
npm run podcast:agentic:rewrite -- --slug ep05-working-with-issues --promote
```

Run full listening-order batch (all episodes/items), generate candidates, and promote only passing rewrites:

```powershell
npm run podcast:agentic:rewrite:batch:promote
```

Evaluate any transcript against all mapped sources with explicit thresholds:

```powershell
node podcasts/tools/agentic-pilot/evaluate-transcript.js \
  --packet podcasts/logs/agentic-pilots/ep05-working-with-issues.packet.json \
  --transcript podcasts/logs/agentic-pilots/candidates/ep05-working-with-issues/attempt-001.txt \
  --max-missing 4 \
  --max-repeated-starts 2 \
  --max-repeated-long 0 \
  --max-stock-hits 0 \
  --out podcasts/logs/agentic-pilots/candidates/ep05-working-with-issues/attempt-001.txt.report.json
```

Run a full-catalog pass with per-episode coverage reports:

```powershell
npm run podcast:agentic:catalog
```

Promote an accepted candidate into the live script path and refresh its segment JSON:

```powershell
npm run podcast:agentic:promote -- --slug ep05-working-with-issues
```

Audit chapter-plan quality across every generated `*-chapters.json` file:

```powershell
npm run podcast:chapters:audit
```

Normalize chapter-plan sidecars after a full rebuild to drop generic or overly granular titles:

```powershell
npm run podcast:chapters:normalize
```

## Chapter Marker Flow

Transcript generation now writes three artifacts for each selected script:

- the transcript text file in `podcasts/scripts/`
- the derived segment file in `podcasts/transcripts/*-segments.json`
- the ordered chapter plan in `podcasts/transcripts/*-chapters.json`

The chapter plan is sequential, not time-based. Each entry stores a chapter title plus a `startSegmentIndex`. Later, `podcasts/tag-audio-metadata.py` converts those ordered segment boundaries into timed ID3 chapters and Podcasting 2.0 chapter sidecars after audio generation. This keeps chapter naming in the transcript layer, where the teaching context is still available.

## What Scales Across All 79 Listening-Order Items

- selective transcript generation by slug, range, and group
- reusable source-packet generation
- reusable transcript rewrite + evaluation
- candidate-first promotion flow
- full-catalog batch rewrite summary with repetition metrics
- sequential chapter-plan generation for metadata tagging
- reusable chapter-plan auditing across the full catalog

The rewrite itself is automated through Copilot CLI with automatic model selection. Everything around that step is scriptable and repeatable across the full catalog.
