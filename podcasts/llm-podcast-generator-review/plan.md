# LLM Podcast Generation Readiness Plan

## Objective

Deliver a stable, low-cost, 5.4-first generation lane that can produce reviewable transcripts, segment/chapter artifacts, and metadata-ready outputs without requiring full-catalog generation.

## Implemented

1. Mini-first regression runner with optional 5.4 polish fallback (`src/run-regression.js`).
2. Strong transcript constraints to keep spoken flow natural and avoid spoken chapter labels (`src/generate-teaching-transcript.js`).
3. Candidate publishing pipeline that emits:
   - script text
   - segments JSON
   - chapter plan JSON
   - chapter-time estimate preview JSON
   (`src/publish-candidate.js`, `src/artifact-utils.js`).
4. Optional live-write mode to update `podcasts/scripts/*` and `podcasts/transcripts/*` directly when ready.
5. Updated commands and documentation for setup, regression, publishing, and integration in:
   - `README.md`
   - `docs/setup-and-wiring.md`
   - `docs/repository-integration-plan.md`
   - `examples/commands.ps1.txt`
   - root `package.json` scripts.

## Quality Gates

- Repository automation checks pass.
- Podcast catalog and listening-order validation pass.
- Publish flow smoke test confirmed artifact generation for a real candidate.

## Operating Mode

- Use GPT-5.4 mini for tuning and broad regression.
- Use GPT-5.4 for rescue/polish only when mini fails.
- Keep generation in batches until strict gates are consistently stable.
- Do not run full 79-item generation until content expansion is complete.

## Productized Future Utilization

- Keep prompt artifacts and lessons-learned files as reusable process assets.
- Reuse packet-driven source ingestion to support evolving markdown content.
- Treat chapter preview timestamps as planning guidance; final audio chapter timing comes from the existing metadata tagging pipeline.
