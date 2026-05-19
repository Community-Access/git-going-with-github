# Tooling Inventory (Stage 1.4)

Purpose: identify every source file in the content repo and the deploy/site repo that hardcodes an episode identifier, an appendix letter, or an audio slug, so Stage 1.3 (Site IA) and Stage 2+ (refactor) can be scoped accurately.

The canonical identity source is now [docs/EPISODE_MAP.json](EPISODE_MAP.json). Every locked field below should ultimately resolve through that map by `narration_id`, `filename`, or `topic_prefix` + `topic_number`.

Scope of this inventory:

- Source-controlled tooling and authoring files in `c:\code\git-going-with-github`.
- Top-level scripts (`generate-*.bat`, `build-rss-feed.bat`, `validate-rss-feed.bat`, `generate-podcast-scripts.py`).
- `podcasts/` tooling and configuration (excluding `audio/`, `chapters/`, `transcripts/`, `bundles/`, `challenge-bundles/`, `logs/`, `_backups/`, `_snapshot-*/`, `llm-podcast-generator-review/generated/`, `__pycache__/`).
- `scripts/` directory.
- `docs/` (excluding `EPISODE_MAP.json` and `EPISODE-MAP-SCHEMA.json`).
- `admin/` markdown (excluding `qa-bundle/` which is regenerated copy).
- Site repo `c:\code\ggg`.

Out of scope (excluded as noise):

- `html/` (generated site output).
- `podcasts/audio/` (binary tagged mp3s, already updated).
- `podcasts/_snapshot-pre-tagging-20260518/`, `podcasts/_snapshot-pre-gpt55-20260518-164221/`, `podcasts/_backups/` (snapshots).
- `podcasts/logs/`, `tmp-*` files.
- `podcasts/chapters/`, `podcasts/transcripts/`, `podcasts/bundles/`, `podcasts/challenge-bundles/` (regenerable build outputs).
- `podcasts/llm-podcast-generator-review/generated/` (regression run outputs).
- `admin/qa-bundle/` (regenerated copy of admin docs).
- `node_modules/`, `.git/`, `epub/`, `learning-room/`, `classroom/` (out of reorg scope).

Counts shown below are raw hits from ripgrep against the patterns `\bep[0-9]{2}\b`, `appendix-[a-z]+`, and `cc-bonus-[a-e]`.

## Group A: Live tooling that drives audio identity (MUST refactor)

These files are part of the active audio/feed pipeline. Each one currently encodes the legacy `ep##-slug` / `cc-NN-slug` / `cc-bonus-X-slug` identity scheme and will need to switch to the canonical map.

| File | Counts | Role | Refactor required |
|------|--------|------|-------------------|
| [podcasts/config/listening-order.json](../podcasts/config/listening-order.json) | 58 ep, 5 bonus | Defines the listener-facing order of all 79 items by slug, grouped by section headers ("Day 1: Issues...", "Day 2: ..."). Consumed by `podcasts/lib/listening-plan.js`, `podcasts/generate-site.js`, and the RSS feed builder via `npm run build:podcast-site`. | Heavy. Replace with derivation from `EPISODE_MAP.json` `track_number` ordering. Section headers will need to be added as a new field on map entries (e.g. `section_title`) or driven by `learning_band` groupings. Decision needed: keep section breaks, or flatten to single-stream feed. |
| [podcasts/build-bundles.js](../podcasts/build-bundles.js) | 77 appendix-, plus a large hardcoded `const episodes = [...]` array | Generates NotebookLM source bundles for each episode. Carries the entire episode catalog inline (`slug`, `sources`, `concepts`, `crossRefs`, `prerequisites`, `duration`) and a `SOURCE_ALIASES` table that maps historical `docs/*.md` filenames to current ones. Consumed by `npm run build:podcast-bundles` and indirectly by `generate-transcripts.bat`. | Heavy. The hardcoded `episodes` array is the parallel catalog of truth. Refactor to read from `EPISODE_MAP.json` and a separate `bundle-config.json` (concepts / crossRefs / prerequisites are bundle-only data not in the map; keep them, but key them by `narration_id`). `SOURCE_ALIASES` is an orthogonal docs/* concern. |
| [podcasts/build-challenge-bundles.js](../podcasts/build-challenge-bundles.js) | 3 appendix- | Companion to `build-bundles.js` for the 16 challenges and 5 bonus challenges. Same shape: inline catalog of slugs. | Heavy. Same treatment as `build-bundles.js`. Key challenge bundles by challenge `narration_id` / `topic_prefix=cc` / `topic_prefix=cc-bonus`. |
| [podcasts/generate-draft-transcripts.js](../podcasts/generate-draft-transcripts.js) | 1 ep## ref | Generates the draft `podcasts/scripts/**/*.txt` files. Slug-aware: emits to `podcasts/scripts/{chapters,challenges,appendices}/<slug>.txt`. The three-bucket directory structure (`chapters/`, `challenges/`, `appendices/`) is hardcoded. | Medium. The three-bucket layout no longer matches the locked nine-band model (chapter, challenge, bonus, ref, git, tools, agents, sec, a11y). Decision needed: rename `appendices/` to nine band-named subdirs, or keep flat. |
| [podcasts/tts/generate_episode.py](../podcasts/tts/generate_episode.py) | 4 ep## | TTS dispatcher invoked by `generate-audio*.bat` via `python -m podcasts.tts.generate_audio --slug <slug>`. Resolves slug to a script path under `podcasts/scripts/{chapters,challenges,appendices}/<slug>.txt`. | Medium. Update path resolution if `podcasts/scripts/` layout changes. Otherwise the script name (still `ep##-...`) is the lookup key for the existing 79 mp3s, so this can stay slug-keyed until filenames are rotated in Stage 2. |
| [podcasts/tts/generate_all_kokoro.py](../podcasts/tts/generate_all_kokoro.py) | 2 ep## | Higher-level batch driver around `generate_episode.py`. | Low. Same pattern as `generate_episode.py`. |
| [podcasts/listening_plan.py](../podcasts/listening_plan.py) | 1 ep## | Reads `podcasts/config/listening-order.json` and emits a structured plan. | Medium. Refactor once `listening-order.json` is replaced with map-derived ordering. |
| [podcasts/generate-site.js](../podcasts/generate-site.js) | 1 ep## | Builds `podcasts/feed.xml` and `admin/PODCASTS.md`. Consumes `podcasts/config/listening-order.json` (and the catalog). | Medium. Refactor to consume `EPISODE_MAP.json` directly. Outputs `feed.xml` `<item>` order must match `track_number`. |
| [podcasts/validate-catalog.js](../podcasts/validate-catalog.js) | 1 ep## | Validates the legacy catalog of episodes. | Medium-Low. Either retarget to validate `EPISODE_MAP.json` against the schema (which we already do in `podcasts.tools.episode_map`), or retire. |
| [podcasts/verify_audio_inventory.py](../podcasts/verify_audio_inventory.py) | 1 ep## | Checks mp3s vs catalog. | Low. Now superseded by `python -m podcasts.tools.verify_id3`. Mark as legacy. |

## Group B: Live tooling that touches docs/ markdown identifiers (orthogonal concern)

These files key on `docs/*.md` filenames (chapter prefixes `00-` ... `22-`, appendix letters `a` ... `ac`). They are NOT consumers of the audio slug; they operate on the source-of-truth markdown that drives both the book/eBook and the podcast bundles.

Decision required before refactor: keep the `docs/appendix-X-*.md` filenames as they are, or rename them to match the new `ref` / `git` / `tools` / `agents` / `sec` / `a11y` topic bands. The locked feed and audio identity do NOT require renaming the docs markdown - the map can carry both audio identity and `source_docs` references separately. Recommendation: KEEP `docs/appendix-X-*.md` filenames as-is to avoid blast radius into eBook, HTML, and learning-room references. If renamed later, the files below all need updates.

| File | Counts | Role | Refactor required if docs/ keeps current names |
|------|--------|------|------------------------------------------------|
| [scripts/add-authoritative-sources.js](../scripts/add-authoritative-sources.js) | 16 appendix- | Maps `docs/*.md` topic paths to authoritative source datasets via `topicPath.includes('appendix-X')` checks. | None. Stable. |
| [scripts/build-epub.js](../scripts/build-epub.js) | ref to appendix- | Builds the eBook from `docs/*.md`. | None. Stable. |
| [scripts/build-html.js](../scripts/build-html.js) | ref to appendix- | Builds `html/` from `docs/*.md`. | None. Stable. |
| `docs/*.md` (all chapters + appendices) | 2-26 each | Cross-references between chapters and appendices via relative links. | None. Stable. Inline cross-links are content, not tooling. |
| [scripts/classroom/Add-AutograderSafeguards.ps1](../scripts/classroom/Add-AutograderSafeguards.ps1) | ref to appendix- | Classroom autograder safeguard script. Outside the reorg scope per Stage 1.4 exclusion of `classroom/`. | None for this stage. |

## Group C: Legacy or deprecated tooling (delete or supersede in Stage 2)

| File | Counts | Status |
|------|--------|--------|
| [podcasts/tag-audio-metadata.py](../podcasts/tag-audio-metadata.py) | 2 ep## | Superseded by `podcasts/tools/tag_id3.py` (which now drives identity from `EPISODE_MAP.json`). Still invoked by `generate-audio*.bat` `:WriteMetadata` subroutine. Replace the bat-file call, then delete this script. |
| [generate-podcast-scripts.py](../generate-podcast-scripts.py) | 0 ep## in head | Legacy OpenAI batch generator. References an external `../OPENAI_BATCH_PROMPTS.json` that is not in this repo. Appears unused by current pipeline (`generate-transcripts.bat` calls `npm run generate:podcast-transcripts`, not this script). Confirm and remove. |
| [podcasts/backfill_completion_markers.py](../podcasts/backfill_completion_markers.py), [podcasts/check_completion_record.py](../podcasts/check_completion_record.py), [podcasts/completion_records.py](../podcasts/completion_records.py) | 0 visible refs | Completion-tracking helpers invoked by the audio-generation bat files. Operate on slug strings, not appendix letters. Still useful for incremental regeneration. Keep. Audit only for hard-coded directory layout. |
| [podcasts/lib/listening-plan.js](../podcasts/lib/listening-plan.js) | 0 visible refs | Library helper for `listening-order.json` consumers. Will need parallel update if `listening-order.json` is replaced. Keep. |

## Group D: Top-level batch / shell wrappers (slug-blind, low refactor)

These wrappers iterate over whatever lives in `podcasts/scripts/**/*.txt` and pass the basename through as a `--slug` argument. They are NOT slug-aware in a hardcoded way - they only assume the three-bucket subdirectory layout (`chapters/`, `challenges/`, `appendices/`) and the `ep*` / `cc-*` filename prefixes (used by glob filters like `Where-Object { $_.BaseName -like 'ep*' -or $_.BaseName -like 'cc-*' }`).

| File | Hardcoded assumption | Refactor required |
|------|---------------------|-------------------|
| [generate-audio-largest-first.bat](../generate-audio-largest-first.bat) | `BaseName -like 'ep*' -or 'cc-*'` glob in PowerShell sort | Low. If filenames rotate in Stage 2, expand the glob to match new prefixes (`ref-*`, `git-*`, `tools-*`, `agents-*`, `sec-*`, `a11y-*`). |
| [generate-audio-smallest-first.bat](../generate-audio-smallest-first.bat) | Same as above | Low. Same. |
| [generate-audio.bat](../generate-audio.bat) | Calls `python -m podcasts.tts.generate_audio --start N --end N` | Low. The `--start/--end` semantics are episode-number based ("episodes 5 through 10"). If renumbering, update help text and semantics. |
| [generate-llm-batch-jobs.bat](../generate-llm-batch-jobs.bat) | Calls `node podcasts/llm-podcast-generator-review/src/...` | None. The LLM pipeline is opaque to slug schema at this layer. |
| [generate-llm-scripts-only.bat](../generate-llm-scripts-only.bat) | Same | None. |
| [generate-transcripts.bat](../generate-transcripts.bat) | Calls `npm run build:podcast-bundles` / `build:podcast-challenge-bundles` / `generate:podcast-transcripts` | None at this layer; refactor propagates from `build-bundles.js`. |
| [build-rss-feed.bat](../build-rss-feed.bat) | Calls `npm run build:podcast-site` | None at this layer; refactor propagates from `generate-site.js`. |
| [validate-rss-feed.bat](../validate-rss-feed.bat) | RSS validator | None. |
| [package.json](../package.json) | Holds the `npm run` script aliases | None directly. Verify aliases still resolve after Group A refactor. |

## Group E: LLM-driven content generation pipeline (review separately)

The `podcasts/llm-podcast-generator-review/` subtree is a self-contained pipeline for generating podcast scripts via the OpenAI / OpenRouter API. It has its own documentation and config.

| File | Counts | Notes |
|------|--------|-------|
| [podcasts/llm-podcast-generator-review/src/artifact-utils.js](../podcasts/llm-podcast-generator-review/src/artifact-utils.js) | 1 ep## | Only source-tree JS file in this subtree that references `ep##`. Worth inspecting for hardcoded paths. |
| [podcasts/llm-podcast-generator-review/docs/setup-and-wiring.md](../podcasts/llm-podcast-generator-review/docs/setup-and-wiring.md) | 13 ep## | Documentation. References should be updated when audio identity rotates. |
| [podcasts/llm-podcast-generator-review/examples/commands.ps1.txt](../podcasts/llm-podcast-generator-review/examples/commands.ps1.txt) | 9 ep## | Example command snippets. Documentation. |
| [podcasts/llm-podcast-generator-review/README.md](../podcasts/llm-podcast-generator-review/README.md) | 5 ep## | Documentation. |
| [podcasts/llm-podcast-generator-review/docs/repository-integration-plan.md](../podcasts/llm-podcast-generator-review/docs/repository-integration-plan.md) | 3 ep## | Documentation. |
| [podcasts/tools/agentic-pilot/README.md](../podcasts/tools/agentic-pilot/README.md) | 8 ep## | Documentation for the agentic pilot subdir. |
| [podcasts/README.md](../podcasts/README.md), [podcasts/MICHAEL_AUDIO_HANDOFF.md](../podcasts/MICHAEL_AUDIO_HANDOFF.md), [podcasts/REGENERATION.md](../podcasts/REGENERATION.md) | Low counts | Documentation. Mark for review/update at Stage 2 / Stage 3. |

## Group F: Regenerable artifacts (no manual edit; verify by rebuild)

These files contain many `ep##` / `appendix-X` references but are entirely regenerated by tooling. After the Group A refactor lands, regenerate these and diff:

| File | Counts | Regeneration command |
|------|--------|----------------------|
| [admin/PODCASTS.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/PODCASTS.md) | 174 ep##, 29 appendix-, 15 cc-bonus | `npm run build:podcast-site` (via `build-rss-feed.bat`) |
| [podcasts/feed.xml](../podcasts/feed.xml) | excluded | `npm run build:podcast-site` |
| [podcasts/manifest.json](../podcasts/manifest.json) | excluded | `npm run build:podcast-site` |
| [podcasts/validate-report.json](../podcasts/validate-report.json) | excluded | validator output |
| [podcasts/tools/quality_triage_report.md](../podcasts/tools/quality_triage_report.md), [podcasts/tools/quality_triage_report.csv](../podcasts/tools/quality_triage_report.csv) | 112 ep##, 5 cc-bonus each | Whatever produced them; mark as regenerable. |
| `html/**/*.html` and `html/**/search-index.json` | very high | `npm run build:html` (via `scripts/build-html.js`) |
| `admin/qa-bundle/**` | high | Whatever produces the qa-bundle copy. |

## Group G: Authoring documentation (manual update at content cutover)

These are human-authored markdown documents that mention episodes/appendices by ID. They are NOT tooling and will need text updates - not code refactor - when audio identity changes.

| File | Counts | Notes |
|------|--------|-------|
| [docs/course-guide.md](course-guide.md) | 29 appendix- | Course outline. Update at Stage 3. |
| [docs/Home.md](Home.md) | 29 appendix- | Landing page. Update at Stage 3. |
| [docs/appendix-x-resources.md](appendix-x-resources.md) | 26 appendix- | Cross-references between appendices. Update at Stage 3. |
| [README.md](../README.md) | 27 appendix- | Repo README. Update at Stage 3. |
| [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md) | 26 appendix- | QA runbook. Update at Stage 3. |
| [admin/FAQ.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/FAQ.md) | 24 appendix- | FAQ. Update at Stage 3. |
| [admin/GITHUB_PROPOSAL.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/GITHUB_PROPOSAL.md) | 24 appendix- | Proposal doc. Update at Stage 3. |
| [admin/CURRICULUM_2.0_ORGANIZATION.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/CURRICULUM_2.0_ORGANIZATION.md) | 22 appendix- | Curriculum org doc. Update at Stage 3. |
| [admin/TROUBLESHOOTING.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/TROUBLESHOOTING.md), [admin/ACCESSIBILITY_TESTING.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/ACCESSIBILITY_TESTING.md), [admin/QUICK_REFERENCE.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/QUICK_REFERENCE.md), [admin/DAY1_AGENDA.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/DAY1_AGENDA.md), [admin/DAY2_AGENDA.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/DAY2_AGENDA.md), [admin/DAY2_QUICK_START.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/DAY2_QUICK_START.md), [admin/STUDENT_ONBOARDING_EMAIL.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/STUDENT_ONBOARDING_EMAIL.md), [admin/PROGRESS_TRACKER.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/PROGRESS_TRACKER.md), [admin/VALIDATION_AUDIT.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/VALIDATION_AUDIT.md), [admin/ANNOUNCEMENT.md](https://github.com/Community-Access/git-going-with-github/blob/main/admin/ANNOUNCEMENT.md) | 1-8 each | Various admin docs. Update at Stage 3. |
| [docs/_Sidebar.md](_Sidebar.md) | 3 appendix- | Wiki sidebar. Update at Stage 3. |
| [GO-LIVE-QA-GUIDE.md](../GO-LIVE-QA-GUIDE.md), [CONTRIBUTING.md](../CONTRIBUTING.md), [work.md](../work.md), [work.html](../work.html) | 1 each | Light references. Update at Stage 3. |

## Group H: Site / deploy repo `c:\code\ggg`

The deploy repo `c:\code\ggg` contains a parallel `generator/` pipeline with its own copy of `listening-order.json` and its own bundle builders. This is independent from the content repo build chain.

| File (relative to `c:\code\ggg`) | Counts | Role | Refactor required |
|------|--------|------|-------------------|
| `generator/manifest.json` | 148 | Catalog of episodes for the deployed site. | Heavy. Drive from content repo's `EPISODE_MAP.json` (vendor it into the deploy repo at build time, or fetch via a published URL). |
| `generator/config/listening-order.json` | 79 | Duplicate of `podcasts/config/listening-order.json`. | Heavy. Same treatment - replace with map-derived ordering. |
| `generator/generate-all-html.js` | 4 | HTML generator for the deployed site. | Medium. Refactor to consume the map. |
| `generator/build-challenge-bundles.js` | 3 | Mirror of content-repo `build-challenge-bundles.js`. | Heavy. Same treatment. |
| `generator/_e.js`, `generator/_q.js`, `generator/_top.js`, `generator/_bot.js` | 1-3 each | Small HTML-fragment template helpers. | Low. Verify slug references after Stage 2. |
| `DEPLOY-UBUNTU.md` | 1 | Deploy doc. | Low. Stage 3 doc update. |

## Recommendations for Stage 1.3 (Site IA) given this inventory

1. The new IA can safely assume nine top-level audio bands (chapter, challenge, bonus, ref, git, tools, agents, sec, a11y) at the URL routing layer regardless of how Group B (`docs/*.md`) is named. The audio identity is decoupled from the docs identity by `EPISODE_MAP.json`. Recommendation: keep the docs/ markdown filenames unchanged in this reorg; do the audio rotation first.

2. The single biggest pivot is replacing `podcasts/config/listening-order.json` + `podcasts/build-bundles.js` + `podcasts/build-challenge-bundles.js` with a thin layer over `EPISODE_MAP.json`. This is the bulk of Stage 2 effort and should be a single coordinated refactor (Stage 2.1: new map-driven build chain; Stage 2.2: delete the legacy files).

3. The deploy repo `c:\code\ggg` is a parallel pipeline that needs the same refactor. Treat it as a separate Stage 2.5 or fold it into the same effort with shared library code if reasonable.

4. `generate-audio*.bat` wrappers do not need refactor until physical mp3 filenames rotate (Stage 2.3 or later). Until then, the existing `ep##-slug` mp3 filenames continue to work because identity is now carried inside ID3 tags via `narration_id` UUID, not the filename.

5. Documentation updates (Group G) and regenerable artifacts (Group F) are last-mile work, done after the tooling refactor is stable.

## Authoritative Sources

Use these official references when you need the current source of truth for this inventory.

- [Episode map](EPISODE_MAP.json)
- [Episode map schema](EPISODE-MAP-SCHEMA.json)
- [Site information architecture](SITE-IA.md)
- [Reorganization master plan](../REORG-PLAN.md)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Purpose / scope / exclusions:** [Reorganization master plan](../REORG-PLAN.md), [Site Information Architecture (Stage 1.3)](SITE-IA.md)
- **Group A - live tooling that drives audio identity:** [Episode map](EPISODE_MAP.json), [Episode map schema](EPISODE-MAP-SCHEMA.json)
- **Group B-D - docs tooling, legacy tools, wrappers:** [Reorganization master plan](../REORG-PLAN.md), [Site Information Architecture (Stage 1.3)](SITE-IA.md)
- **Group E-G - generation pipeline, artifacts, authoring docs:** [Reorganization master plan](../REORG-PLAN.md), [Episode map](EPISODE_MAP.json)
- **Group H / recommendations:** [Site Information Architecture (Stage 1.3)](SITE-IA.md), [Reorganization master plan](../REORG-PLAN.md), [Episode map](EPISODE_MAP.json)
