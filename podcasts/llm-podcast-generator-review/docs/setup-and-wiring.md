# Setup and Wiring Guide

This guide explains what you need to make the LLM-first podcast workflow run.

## 1. Local prerequisites

Install these from the repository root:

```powershell
npm install
python -m pip install --upgrade pip
python -m pip install kokoro-onnx soundfile numpy mutagen
python -m podcasts.tts.download_kokoro_samples --english-high-quality-only
```

Recommended baseline:

- Node.js 20 or newer
- Python 3.10 or newer
- Git
- PowerShell 7 or Windows PowerShell
- A clean branch for testing

## 2. API key setup (OpenRouter first)

Set your OpenRouter key in the shell. The generator also supports direct OpenAI keys, but OpenRouter is the default path in this review lane.

PowerShell:

```powershell
$env:OPENROUTER_API_KEY = "sk-or-v1-your-key-here"
$env:PODCAST_LLM_MODEL_MINI = "openai/gpt-5.4-mini"
$env:PODCAST_LLM_MODEL_POLISH = "openai/gpt-5.4"
```

Bash:

```bash
export OPENROUTER_API_KEY="sk-or-v1-your-key-here"
export PODCAST_LLM_MODEL_MINI="openai/gpt-5.4-mini"
export PODCAST_LLM_MODEL_POLISH="openai/gpt-5.4"
```

Optional:

```powershell
$env:OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
$env:OPENROUTER_SITE_URL = "https://github.com/Community-Access/git-going-with-github"
$env:OPENROUTER_APP_TITLE = "git-going-with-github-podcast-review"
$env:PODCAST_LLM_TEMPERATURE = "0.7"
$env:PODCAST_LLM_MAX_OUTPUT_TOKENS = "12000"
```

## 3. First dry run

A dry run writes the prompt but does not call the API. Build a packet first so multi-source episodes and challenge episodes are covered correctly.

```powershell
node podcasts/tools/agentic-pilot/build-source-packet.js --slug ep05-working-with-issues

node podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js `
  --slug ep05-working-with-issues `
  --packet podcasts/logs/agentic-pilots/ep05-working-with-issues.packet.json `
  --dry-run
```

Review:

```text
podcasts/llm-podcast-generator-review/generated/ep05-working-with-issues.prompt.md
```

## 4. First generation run

```powershell
node podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js `
  --slug ep05-working-with-issues `
  --packet podcasts/logs/agentic-pilots/ep05-working-with-issues.packet.json `
  --model openai/gpt-5.4-mini `
  --out podcasts/llm-podcast-generator-review/generated/ep05-working-with-issues.mini.candidate.json
```

Expected output:

```text
podcasts/llm-podcast-generator-review/generated/ep05-working-with-issues.mini.candidate.json
podcasts/llm-podcast-generator-review/generated/ep05-working-with-issues.mini.candidate.txt
```

## 5. Human review checklist

Before promoting any generated transcript:

- Does Alex sound like the warm expert guide?
- Does Jamie ask learner-centered questions?
- Does the transcript cover every meaningful source heading?
- Does it avoid visual-only language?
- Does it teach accessibility as central to the experience?
- Does it preserve challenge evidence requirements?
- Are chapter titles specific and useful?
- Are commands explained before being used?
- Does the output avoid hallucinated GitHub behavior?

## 6. Regression flow: mini then 5.4 polish

Run a low-cost pass with mini, then automatically run GPT-5.4 polish only for mini failures:

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --group chapters --limit 5
```

Mini-only pass (no polish):

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --group chapters --limit 5 --skip-polish
```

Full catalog dry-run prompt build:

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --dry-run --group all
```

The runner writes:

```text
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/mini.candidate.json
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/mini.prompt.md
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/polish.candidate.json
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/<slug>/polish.prompt.md
podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/summary.json
podcasts/llm-podcast-generator-review/docs/lessons-learned.md
```

Passing criteria in regression are strict: candidates pass only when heading and concept coverage are fully covered (no partial or missing items).

Publish passing artifacts for end-to-end metadata flow:

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --group chapters --limit 5 --publish-passing
```

Write directly to live script/transcript paths only when you are ready:

```powershell
node podcasts/llm-podcast-generator-review/src/run-regression.js --group chapters --limit 5 --publish-passing --write-live
```

Per published slug:

```text
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>.txt
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-segments.json
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-chapters.json
podcasts/llm-podcast-generator-review/output/published/<slug>/<slug>-chapter-preview.json
```

The chapter preview contains estimated chapter start seconds for planning and QA. Final audio timestamps are derived by the existing metadata tagging flow from generated segment manifests.

## 7. Production wiring after approval

The review lane keeps outputs isolated. When a transcript is approved, promote it into the live scripts and regenerate podcast artifacts.

## 8. After transcript promotion

Run:

```powershell
npm run build:podcast-site
npm run podcast:chapters:audit
npm run validate:podcasts
```

Then generate audio:

```powershell
npm run podcast:audio:queue
python -m podcasts.tts.generate_audio --start 5 --end 5 --force --audio-format mp3
```

Write metadata and chapters for one slug:

```powershell
python podcasts/tag-audio-metadata.py --slug ep05-working-with-issues --audio-dir podcasts/audio/kokoro-am_liam-af_jessica --expected-count 1 --write
```

One-step review-lane render and tag from a candidate:

```powershell
node podcasts/llm-podcast-generator-review/src/render-and-tag.js `
  --slug ep05-working-with-issues `
  --candidate podcasts/llm-podcast-generator-review/generated/regression/<timestamp>/ep05-working-with-issues/mini.candidate.json
```

### Technical integration notes

- Audio generation reads live scripts from `podcasts/scripts/<group>/<slug>.txt`.
- Audio generation writes segment audio and timing manifests to `podcasts/audio/segments/<slug>/manifest.json`.
- Metadata tagging reads chapter plans from `podcasts/transcripts/<group>/<slug>-chapters.json`.
- Metadata tagging combines chapter plans with segment timing manifests to produce:
  - embedded ID3 chapter frames in MP3 files
  - chapter sidecars in `podcasts/chapters/<slug>.json`.
- The review lane is compatible when promoted candidates are written to live script/transcript paths (`--write-live` or `render-and-tag.js`).

## 9. Recommended model strategy

Use this model sequence:

1. **GPT-5.4 mini** for broad regression and prompt tuning.
2. **GPT-5.4** for mini failures and final quality polish.
3. Keep deterministic transcript tooling available as a fallback lane.
4. **Batch API** when running many episodes asynchronously.

## 10. Scripts-only full catalog generation (5.4 only)

Use this when you want all 79 scripts/transcripts generated with no audio rendering:

```powershell
npm run podcast:llm:scripts-only
```

Direct command with explicit retries:

```powershell
node podcasts/llm-podcast-generator-review/src/generate-scripts-only.js `
  --group all `
  --model openai/gpt-5.4 `
  --retries 3 `
  --retry-delay-ms 2000 `
  --max-repair-attempts 4
```

Outputs:

- Run artifacts and summaries in `podcasts/llm-podcast-generator-review/generated/scripts-only/<timestamp>/`.
- Live scripts/transcripts updated in:
  - `podcasts/scripts/<group>/<slug>.txt`
  - `podcasts/transcripts/<group>/<slug>-segments.json`
  - `podcasts/transcripts/<group>/<slug>-chapters.json`

This path intentionally skips audio and metadata steps.
Use `docs/scripts-only-troubleshooting.md` for completion, retry, and recovery workflow.

Fallback behavior for high-completion runs:

- Retries transient API/network failures (`429`, `502/503/504`, timeouts, connection resets).
- Uses multiple repair passes in generator (`--max-repair-attempts`).
- If generation still fails for a slug, salvages from the existing live script so run progress continues.
- Disable salvage behavior only if you want hard-fail semantics:

```powershell
node podcasts/llm-podcast-generator-review/src/generate-scripts-only.js --group all --model openai/gpt-5.4 --no-salvage-from-live
```

## 11. Durable sync/batch execution layer

Use this for durable, resumable API execution with de-duplication and run reports.

Prepare jobs (creates/updates `generated/execution/ai_jobs.sqlite`):

```powershell
npm run podcast:llm:ai:prepare
```

Dry-run estimate (no API calls):

```powershell
node podcasts/llm-podcast-generator-review/src/execution/run-ai-jobs.js --mode batch --dry-run
```

Submit/poll batch jobs:

```powershell
npm run podcast:llm:ai:run:batch
node podcasts/llm-podcast-generator-review/src/execution/run-ai-jobs.js --mode batch --action poll
```

With OpenRouter (`OPENAI_BASE_URL=https://openrouter.ai/api/v1`), `--mode batch` automatically uses a durable sync fallback (ledger + retries + dedupe) because native Files/Batches endpoints are not used in that provider path.

Sync execution for interactive subsets:

```powershell
npm run podcast:llm:ai:run:sync
```

Resume and apply completed jobs to live scripts/transcripts:

```powershell
node podcasts/llm-podcast-generator-review/src/execution/run-ai-jobs.js --mode batch --action resume
npm run podcast:llm:ai:apply
```

Run reports are written to:

```text
podcasts/llm-podcast-generator-review/generated/execution/reports/
```

## 12. Time-critical full end-to-end validation (highest-quality pass)

This section is for podcast/LLM pipeline validation. Learning Room template go-live gating remains controlled by `GO-LIVE-QA-GUIDE.md` and `admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md`.

Use this sequence to validate generation, publication, podcast build surfaces, and release checks.

1. Run durable generation from `cmd.exe`:

```bat
generate-llm-batch-jobs.bat
```

2. Confirm durable execution completed:

```powershell
Get-ChildItem "podcasts/llm-podcast-generator-review/generated/execution/reports" -File `
| Sort-Object LastWriteTime -Descending `
| Select-Object -First 1 -ExpandProperty FullName
```

3. Confirm all selected scripts were published:

```powershell
$summary = Get-Content "podcasts/llm-podcast-generator-review/generated/scripts-only/<run>/summary.json" -Raw | ConvertFrom-Json
"selected=$($summary.selected) published=$($summary.published) failed=$($summary.failed)"
```

4. Run repository validation gates:

```powershell
npm run test:automation
npm run test:llm-execution
npm run validate:podcasts
npm run validate:podcast-feed
npm run build:podcast-site
```

5. If audio integration is required for signoff, run a targeted live slug check:

```powershell
python -m podcasts.tts.generate_audio --start 5 --end 5 --force --audio-format mp3
python podcasts/tag-audio-metadata.py --slug ep05-working-with-issues --audio-dir podcasts/audio/kokoro-am_liam-af_jessica --expected-count 1 --write
```

Release-quality completion criteria:

- Latest execution report exists and contains no unresolved blocker failures.
- Script/transcript publication counts match expected scope.
- `test:automation`, `test:llm-execution`, `validate:podcasts`, and `validate:podcast-feed` all pass.
- Podcast site builds from current sources without manual patching.
