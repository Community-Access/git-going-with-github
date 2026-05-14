# OpenRouter/OpenAI Model Cost Report for 5.4-Focused Full Podcast Generation

Generated for the Git Going with GitHub LLM podcast proposal.

## Pricing used

OpenAI model pricing snapshot (commonly exposed through OpenRouter routes):

| Model | Input / 1M tokens | Cached input / 1M tokens | Output / 1M tokens |
|---|---:|---:|---:|
| GPT-5.4 | $2.50 | $0.25 | $15.00 |
| GPT-5.4 mini | $0.75 | $0.075 | $4.50 |

Batch API can save 50% on inputs and outputs when the workflow can run asynchronously.

## Corpus assumptions

The estimate assumes all chapters, appendices, and challenges are generated from source Markdown.

Planning assumptions:

- Approximately 79 source files / generation targets.
- One generation call per target for the first pass.
- Source Markdown plus prompt/instructions per call.
- Rich Alex/Jamie output, not short summaries.
- Local Kokoro/Piper audio generation, so no OpenAI TTS cost is included.
- Human review before promotion.

## Token scenarios

| Scenario | Input tokens | Output tokens | Description |
|---|---:|---:|---|
| Lean first pass | 500,000 | 320,000 | Shorter scripts, limited expansion |
| Likely rich first pass | 900,000 | 550,000 | Strong conversational scripts |
| Full NotebookLM-style first pass | 1,500,000 | 900,000 | Deep teaching, richer examples |
| Generate plus QA/rewrite | 2,500,000 | 1,400,000 | Generation plus second-pass repair |

## Standard API estimated cost

| Scenario | GPT-5.4 | GPT-5.4 mini |
|---|---:|---:|
| Lean first pass | $6.05 | $1.82 |
| Likely rich first pass | $10.50 | $3.15 |
| Full NotebookLM-style first pass | $17.25 | $5.18 |
| Generate plus QA/rewrite | $27.25 | $8.18 |

## Batch API estimated cost

| Scenario | GPT-5.4 Batch | GPT-5.4 mini Batch |
|---|---:|---:|
| Lean first pass | $3.03 | $0.91 |
| Likely rich first pass | $5.25 | $1.58 |
| Full NotebookLM-style first pass | $8.63 | $2.59 |
| Generate plus QA/rewrite | $13.63 | $4.09 |

## Recommended budget

Practical recommendation for this review lane:

- **Prototype:** $2 to $10 using GPT-5.4 mini for a few episodes.
- **Full mini regression pass:** about $3 to $9 depending on richness.
- **Mini + selective GPT-5.4 rescue:** balances quality and cost.
- **All-in GPT-5.4 runs:** use when consistency matters more than lowest cost.
- **Comfortable experimentation ceiling:** $100.

## Recommended cost strategy

1. Run dry-run prompts first.
2. Run mini-first regression across a small chapter subset.
3. Capture actual token usage from candidate JSON output.
4. Keep mini as default for broad catalog sweeps.
5. Trigger GPT-5.4 only for mini failures or final polish.
6. Use Batch API for full-catalog runs when turnaround time can be asynchronous.

## What is excluded

This estimate excludes:

- OpenAI TTS
- Web search
- GitHub Actions minutes
- GitHub LFS/storage
- Human review time
- Hosted audio processing
