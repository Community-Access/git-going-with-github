# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

"GIT Going with GitHub" - an accessible, screen-reader-first workshop teaching blind and low-vision users to contribute to open source on GitHub. This is primarily a documentation project (Markdown in `docs/`) with three supporting systems: an HTML build pipeline, a podcast audio pipeline, and GitHub Actions automation that provisions and grades per-student "Learning Room" repositories.

## Commands

```bash
npm run build:html          # Regenerate html/ from Markdown (also regenerates work.md)
npm run watch:html          # Auto-rebuild HTML on Markdown changes
npm run clean               # Delete html/

npm run test:automation     # node --test .github/scripts/__tests__/*.test.js
npm run test:provisioning   # node --test .github/scripts/provisioning/__tests__/*.test.js
npm run test:llm-execution  # Podcast LLM job execution tests

# Single test file:
node --test .github/scripts/provisioning/__tests__/roster.test.js

npm run validate:podcasts               # Podcast catalog + listening-order validation
npm run validate:authoritative-sources  # Checks "Authoritative Sources" sections in docs
```

Tests use the built-in Node test runner (Node >= 20), no test framework dependency. The podcast audio/TTS steps (`build:podcast-audio`, metadata, inventory) require Python and ffmpeg and run locally; treat them as out of scope unless asked.

## Critical Workflow: HTML Is Committed, Not CI-Built

There is no CI build for the docs. After editing any `.md` file, run `npm run build:html` and commit both the Markdown source and the regenerated `html/` output in the same commit. `docs/*.md` -> `html/docs/*.html`, `README.md` -> `html/index.html`, plus `learning-room/` and root-level docs. The build template and CSS live in `scripts/build-html.js`.

## Architecture

- `docs/` - The curriculum: chapters `00`-`22` plus `appendix-*.md`, `CHALLENGES.md` (challenge hub), and `solutions/` (reference solutions). Note: appendix display letters (A-Z in README tables) do NOT match appendix filenames - they were renumbered; go by the README tables, not the filename letter.
- `learning-room/` - Template repository copied into each student's private repo during provisioning. Its own `.github/` holds the student-facing automation (challenge issue templates, validation bot, progression workflows). `scripts/generate-work-md.js` derives `work.md` from these challenge templates.
- `.github/scripts/provisioning/` - "Hybrid provisioning": the GitHub-native replacement for GitHub Classroom (which was removed entirely). `provision-core.js` is pure orchestration - it takes an injected client (`github-client.js`), never touches the network or secrets directly, and returns an updated roster plus a log. Tests run it against a fake client. `github-app-auth.js` handles GitHub App authentication; `roster.js` and `roster.schema.json` define the student roster; `provision-cli.js` is the entry point; the workflow is `provision-learning-rooms.yml`. The algorithm (serial, backoff, idempotent) is specified in SPEC.md section 7.2b - keep code and spec in sync.
- `.github/scripts/` (top level) - PR validation and challenge-progression bots. Some are legacy from the old shared-repository model; see `.github/README.md` for which workflows are active vs. legacy.
- `podcasts/` - Audio companion pipeline: `build-bundles.js` -> per-episode source bundles -> scripts -> local ONNX TTS (Kokoro default, Piper fallback) -> `generate-site.js` builds the player page and RSS feed. `config/listening-order.json` is the canonical episode order shared by JS (`lib/listening-plan.js`) and Python (`listening_plan.py`) resolvers. Audio files are gitignored and hosted on GitHub Releases.
- `scripts/` - Repo-level build tooling (HTML, ePub, BRF, diagram SVGs, source validation).

Root-level `tmp-*` files, `work.md`/`work.html`, and `golden.md`/`golden.html` are generated or scratch artifacts - do not hand-edit them.

## Conventions

- Never use emojis anywhere: docs, code, comments, commit messages (from `.github/copilot-instructions.md`).
- All documentation is written screen-reader-first: semantic headings, descriptive link text, keyboard-only instructions, no meaning conveyed by visuals alone.
- Docs end with an "Authoritative Sources" section plus a "Section-Level Source Map"; `npm run validate:authoritative-sources` checks these. Preserve them when editing docs.
- Commit messages in this repo follow conventional-commit style (`docs:`, `build:`, `refactor:`, ...).
- License is CC BY 4.0.
