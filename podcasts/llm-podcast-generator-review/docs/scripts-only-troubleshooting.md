# Scripts-Only Completion Troubleshooting

This guide is for completing all 79 script/transcript items with the 5.4 scripts-only lane.

For highest reliability/cost control on offline runs, use the durable batch lane:

```powershell
npm run podcast:llm:ai:prepare
npm run podcast:llm:ai:run:batch
npm run podcast:llm:ai:apply
```

This uses a SQLite ledger (`generated/execution/ai_jobs.sqlite`) so restarts resume without repaying for already-completed identical requests.
If `OPENAI_BASE_URL` points to OpenRouter, batch mode automatically runs through the durable sync fallback path.

## Standard run

From repo root:

```powershell
npm run podcast:llm:scripts-only
```

The runner prints live progress:

- `[N/79] <slug> - start`
- `packet ready`
- `candidate ready`
- `published` or `error`

## What self-cleaning does

- Removes stale incomplete runs before a new run starts.
- Tracks active work in `generated/scripts-only/.active-run.json`.
- On Ctrl+C, writes partial summary and clears active lock.
- Uses `<timestamp>-incomplete` while running, then renames to complete folder on success.

## Find latest summary

```powershell
Get-ChildItem "podcasts/llm-podcast-generator-review/generated/scripts-only" -Directory `
| Sort-Object LastWriteTime -Descending `
| Select-Object -First 1 `
| ForEach-Object { Join-Path $_.FullName "summary.json" }
```

## Retry only failed slugs

```powershell
npm run podcast:llm:scripts-only:retry-failed -- --summary "podcasts/llm-podcast-generator-review/generated/scripts-only/<run>/summary.json"
```

This reads `status=error` entries and re-runs only those slugs.

## Recommended fallback tuning for unstable APIs

```powershell
node podcasts/llm-podcast-generator-review/src/generate-scripts-only.js `
  --group all `
  --model openai/gpt-5.4 `
  --retries 4 `
  --retry-delay-ms 3000 `
  --max-repair-attempts 5
```

## Failure classes and responses

1. Network/provider transient errors (`429`, `502/503/504`, timeout, reset)
   - Increase retries and retry delay.
   - Re-run failed slugs only.
2. Generation quality/gate failures
   - Increase `--max-repair-attempts`.
   - Re-run failed slugs only.
3. Persistent slug failure
   - Script salvage fallback uses existing live script for that slug so full-catalog processing can continue.
   - Check summary for `published-salvage`.

## Completion check

After run:

```powershell
$summary = Get-Content "podcasts/llm-podcast-generator-review/generated/scripts-only/<run>/summary.json" -Raw | ConvertFrom-Json
"selected=$($summary.selected) published=$($summary.published) failed=$($summary.failed)"
```

Completion target is `published == selected`.
