# LLM Podcast Generator Review Package

This folder is a safe review area for the proposed **LLM-first podcast generation workflow** for Git Going with GitHub.

Nothing in this folder changes the live podcast pipeline. It is here so you can examine the architecture, code, cost estimates, setup instructions, and integration plan before deciding whether to promote the idea into the production podcast tooling.

## What This Is

The current repository already has a strong podcast pipeline: source bundles, deterministic Alex/Jamie draft scripts, transcript segments, chapter markers, site generation, RSS generation, metadata tagging, and local audio generation.

This review package proposes an additional LLM-first lane that can produce richer, more varied, more conversational teaching scripts while preserving the existing downstream artifacts.

Think of the goal as a NotebookLM-style teaching experience, but governed by your source Markdown and tuned for blind and low-vision learners.

## Review Contents

- `docs/setup-and-wiring.md` - OpenRouter/OpenAI setup plus 5.4-focused execution commands.
- `docs/scripts-only-troubleshooting.md` - run completion and failed-slug retry playbook.
- `docs/openai-model-cost-report.md` - cost estimates and budget strategy for full-catalog generation.
- `docs/repository-integration-plan.md` - integration path into the current podcast infrastructure.
- `src/generate-teaching-transcript.js` - packet-aware generator with built-in coverage gating output.
- `src/run-regression.js` - full-listening-order regression runner.
- `src/generate-scripts-only.js` - full scripts-only writer using GPT-5.4 to populate live script/transcript files.
- `src/publish-candidate.js` - converts a candidate into script/segments/chapter artifacts for metadata-ready flow.
- `src/execution/*` - durable AI execution layer (SQLite ledger, sync runner, batch runner, reporting).
- `examples/commands.ps1.txt` - quick start command cookbook.

## Design Goals

The LLM generator should:

1. Read each source Markdown chapter, appendix, or challenge as the source of truth.
2. Teach every substantive concept, not summarize selectively.
3. Preserve the Alex and Jamie two-host teaching format.
4. Use varied, natural phrasing so episodes do not sound templated.
5. Create meaningful chapter markers tied to transcript segment indexes.
6. Produce output artifacts compatible with the current podcast pipeline.
7. Leave the existing deterministic generator available as a fallback.

## Recommended First Pilot

From the repository root after installing dependencies and setting `OPENROUTER_API_KEY`:

```powershell
node podcasts/tools/agentic-pilot/build-source-packet.js --slug ep05-working-with-issues

node podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js `
  --slug ep05-working-with-issues `
  --packet podcasts/logs/agentic-pilots/ep05-working-with-issues.packet.json `
  --dry-run
```

Then generate a candidate:

```powershell
node podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js `
  --slug ep05-working-with-issues `
  --packet podcasts/logs/agentic-pilots/ep05-working-with-issues.packet.json `
  --model openai/gpt-5.4-mini
```

## Durable execution path (recommended for full 79)

1. Prepare durable jobs (dedupe + cost estimate):
   ```powershell
   npm run podcast:llm:ai:prepare
   ```
2. Submit/poll via Batch API:
   ```powershell
   npm run podcast:llm:ai:run:batch
   ```
3. Apply completed jobs to live scripts/transcripts:
   ```powershell
   npm run podcast:llm:ai:apply
   ```
   Or run the root helper from `cmd.exe`:
   ```bat
   generate-llm-batch-jobs.bat
   ```
   For a strict from-scratch run that clears prior durable ledger and published artifacts first:
   ```bat
   generate-llm-batch-jobs.bat --clean
   ```

Batch mode does not send one giant request for all 79. It creates one request per slug in a single batch file so each item is independently resumable and deduplicated by `request_hash`.

Provider behavior:

1. OpenAI base URL (`https://api.openai.com/v1`) uses native Files + Batches APIs.
2. OpenRouter base URL (`https://openrouter.ai/api/v1`) uses durable sync fallback when running `--mode batch`, so you still get resumable ledger/retries/dedupe without native batch endpoints.

Scripts-only production path (no audio):

1. Run `npm run podcast:llm:scripts-only`.
2. This processes all 79 listening-order items with `openai/gpt-5.4`.
3. Each generated candidate is written to live script/transcript paths via `--write-live` behavior.
4. Audio is intentionally excluded from this path.

Scripts-only fallback layers:

1. API retry with backoff for transient provider/network failures.
2. Increased in-model repair attempts for coverage/style recovery.
3. Final salvage fallback from existing live script if generation cannot complete for a slug, so catalog processing can continue.

Published artifact flow:

1. `run-regression.js --publish-passing` writes per-slug artifacts to `output/published/<slug>/`.
2. Each published slug includes script text, segment JSON, chapter plan JSON, and estimated chapter-time preview JSON.
3. `--write-live` also writes to `podcasts/scripts/<group>/` and `podcasts/transcripts/<group>/`, making the episode ready for metadata and audio steps.

Audio and metadata integration:

1. `python -m podcasts.tts.generate_audio` renders MP3 and per-segment manifests from live scripts.
2. `python podcasts/tag-audio-metadata.py` reads transcript chapter plans (`*-chapters.json`) plus audio segment manifests to write ID3 chapter frames and chapter sidecars.
3. `podcasts/tag-audio-metadata.py --slug <slug>` enables safe partial tagging for review-lane rollout.

## Prompt and lessons retention

- Per-run prompts are stored under `podcasts/llm-podcast-generator-review/generated/regression/<run>/<slug>/`.
- Durable lessons are captured in `podcasts/llm-podcast-generator-review/docs/lessons-learned.md`.
- Keep lessons process-focused (not tied to specific chapter wording) so the guidance stays valid as source content evolves.
