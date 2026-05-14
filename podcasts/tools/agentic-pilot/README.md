# Agentic Pilot Workflow

This folder contains the repeatable tooling for running a GPT-5.4-assisted transcript workflow one episode at a time without overwriting the committed podcast scripts until you choose to do so.

## Goal

Use the existing podcast pipeline for source extraction, script structure, segment manifests, and metadata tagging, while adding a repeatable human-in-the-loop rewrite workflow for better voice, stronger chapter names, and tighter quality checks.

## Workflow

1. Build the podcast source bundles if the curriculum has changed.
2. Generate or refresh the baseline transcript for one episode or challenge.
3. Build a source packet for that slug.
4. Rewrite the transcript with GPT-5.4 using the packet as source of truth.
5. Save the candidate transcript in `podcasts/logs/agentic-pilots/`.
6. Evaluate the candidate transcript against the original lesson source.
7. When accepted, promote the transcript into `podcasts/scripts/`.
8. Audit chapter-plan quality across the catalog and refine weak titles.
9. Regenerate audio and metadata.

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

Evaluate a candidate transcript against the lesson source:

```powershell
node podcasts/tools/agentic-pilot/evaluate-transcript.js \
  --source docs/05-working-with-issues.md \
  --transcript podcasts/logs/agentic-pilots/ep05-working-with-issues-gpt54.txt \
  --out podcasts/logs/agentic-pilots/ep05-working-with-issues-gpt54.report.json
```

Promote an accepted GPT-5.4 pilot into the live script path and refresh its segment JSON:

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

## What Scales Across All 75 Episodes

- selective transcript generation by slug, range, and group
- reusable source-packet generation
- reusable transcript evaluation
- reusable pilot promotion
- sequential chapter-plan generation for metadata tagging
- reusable chapter-plan auditing across the full catalog

The only human-in-the-loop step is the GPT-5.4 rewrite itself. Everything around that step is now scriptable and repeatable across the full catalog.