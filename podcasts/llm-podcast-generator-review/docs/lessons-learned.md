# LLM Podcast Generator Lessons Learned

This file captures durable guidance for future utilization.
Keep recommendations process-oriented so they remain valid as curriculum and models evolve.

## Stable operating principles

- Use packet-driven generation to preserve multi-source coverage.
- Start with a small mixed validation set before scaling.
- Use mini-first for prompt tuning and gate calibration.
- Use GPT-5.4 for polish when mini results need improvement.
- Persist prompt artifacts and raw model outputs for reproducible debugging.

## Reusable workflow

1. Parse the local key file safely and export only the key token.
2. Run a small regression subset and inspect failure themes.
3. Improve prompt constraints and parser resilience for top themes.
4. Re-run the same subset until outcomes stabilize.
5. Expand scope in stages and keep costs controlled with mini-first passes.

## Failure themes to watch

- Speaker marker style drift can occur; reinforce marker constraints in prompts.
