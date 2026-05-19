# Quality compare: cc-15-discover-accessibility-agents.gpt55.txt

- Live: `C:\code\git-going-with-github\podcasts\scripts\challenges\cc-15-discover-accessibility-agents.gpt54.txt`
- Candidate: `C:\code\git-going-with-github\podcasts\scripts\challenges\cc-15-discover-accessibility-agents.gpt55.txt`
- Verdict: **REJECT**

## Score deltas

| Metric | Live | Candidate | Delta |
| --- | ---: | ---: | ---: |
| score | 0 | 4 | 4.0 |
| verdict | TOUCH_UP | TOUCH_UP |  |
| line_count | 159 | 337 | 178.0 |
| speaker_turns | 48 | 104 | 56.0 |
| avg_paragraph_chars | 159.2 | 161.3 | 2.1 |
| mech_hits | 0 | 2 | 2.0 |
| mech_weight | 0 | 4 | 4.0 |
| stale_hits | 0 | 0 | 0.0 |
| stale_weight | 0 | 0 | 0.0 |

## Checks

- [FAIL] score_zero_baseline: live score is 0; candidate score 4 must not regress
- [PASS] score_below_floor: candidate score 4 < 15
- [PASS] no_stale: candidate stale_hits 0 == 0
- [FAIL] mech_halved_or_zero: candidate mech_hits 2 <= 0 (half of live 0)
- [PASS] speaker_turns_present: candidate speaker_turns 104 >= max(8, line_count/25) = 13

## Top signals

### Live
- (none)

### Candidate
- Then: x2
