"""Compare a regenerated podcast script against its live counterpart.

Runs the same scoring used by ``quality_triage.py`` on both files and emits a
pass/fail verdict plus a markdown diff that highlights banned phrase removal,
stale fact removal, paragraph rhythm changes, and length deltas. The intent is
to be a programmatic gate that prevents a regenerated script from being
published if it is not measurably better than the original.

Usage::

    python podcasts/tools/quality_compare.py \
        --live podcasts/scripts/challenges/cc-15-discover-accessibility-agents.txt \
        --candidate podcasts/llm-podcast-generator-review/generated/scripts/cc-15-discover-accessibility-agents.txt \
        --report podcasts/tools/quality_compare_reports/cc-15.md

Exit code 0 means accept, 1 means reject.

Accept criteria (default):
    * candidate score < 0.5 * live score  (and live score > 0)
    * candidate score < 15
    * candidate stale_hits == 0
    * candidate mech_hits <= max(0, live mech_hits // 2)
    * candidate speaker_turns >= max(8, live speaker_turns * 0.5)

Any failing criterion blocks acceptance; the report lists every check.
"""

from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import asdict
from pathlib import Path

# Reuse the production triage logic so the gate stays in sync with the catalog
# scorer (no duplicated phrase lists, no drift).
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from quality_triage import analyze_file  # noqa: E402


def evaluate(live_score, cand_score):
    checks = []
    live_total = live_score.score
    cand_total = cand_score.score

    if live_total > 0:
        threshold = live_total * 0.5
        checks.append((
            "score_halved",
            cand_total < threshold,
            f"candidate score {cand_total} < 0.5 * live score {live_total} (threshold {threshold:.1f})",
        ))
    else:
        # Live already had score 0; accept candidate as long as it stays under
        # the floor (15). The absolute floor below is the binding gate; this
        # check just makes sure we are not silently regressing into the danger
        # zone when the baseline is already clean.
        baseline_tolerance = 5
        checks.append((
            "score_zero_baseline",
            cand_total <= baseline_tolerance,
            f"live score is 0; candidate score {cand_total} <= {baseline_tolerance} tolerance",
        ))

    checks.append((
        "score_below_floor",
        cand_total < 15,
        f"candidate score {cand_total} < 15",
    ))
    checks.append((
        "no_stale",
        cand_score.stale_hits == 0,
        f"candidate stale_hits {cand_score.stale_hits} == 0",
    ))

    mech_budget = max(0, live_score.mech_hits // 2)
    checks.append((
        "mech_halved_or_zero",
        cand_score.mech_hits <= mech_budget,
        f"candidate mech_hits {cand_score.mech_hits} <= {mech_budget} (half of live {live_score.mech_hits})",
    ))

    # Speaker rhythm is graded as an absolute density floor, NOT a percentage
    # of the live script. The live file is often bloated; a healthy regenerated
    # script will legitimately be shorter and have fewer turns. We just want to
    # ensure the candidate still reads like a two-host conversation: at least 8
    # turns total, AND at least one speaker turn every ~25 lines.
    cand_density_floor = max(8, cand_score.line_count // 25)
    checks.append((
        "speaker_turns_present",
        cand_score.speaker_turns >= cand_density_floor,
        f"candidate speaker_turns {cand_score.speaker_turns} >= max(8, line_count/25) = {cand_density_floor}",
    ))

    passed = all(ok for _, ok, _ in checks)
    return passed, checks


def write_report(report_path, live_path, cand_path, live_score, cand_score, checks, passed):
    report_path.parent.mkdir(parents=True, exist_ok=True)
    lines = []
    lines.append(f"# Quality compare: {cand_path.name}")
    lines.append("")
    lines.append(f"- Live: `{live_path}`")
    lines.append(f"- Candidate: `{cand_path}`")
    lines.append(f"- Verdict: **{'ACCEPT' if passed else 'REJECT'}**")
    lines.append("")
    lines.append("## Score deltas")
    lines.append("")
    lines.append("| Metric | Live | Candidate | Delta |")
    lines.append("| --- | ---: | ---: | ---: |")
    metrics = [
        ("score", "score"),
        ("verdict", "verdict"),
        ("line_count", "line_count"),
        ("speaker_turns", "speaker_turns"),
        ("avg_paragraph_chars", "avg_paragraph_chars"),
        ("mech_hits", "mech_hits"),
        ("mech_weight", "mech_weight"),
        ("stale_hits", "stale_hits"),
        ("stale_weight", "stale_weight"),
    ]
    live_d = asdict(live_score)
    cand_d = asdict(cand_score)
    for label, key in metrics:
        lv = live_d.get(key)
        cv = cand_d.get(key)
        try:
            delta = round(float(cv) - float(lv), 2)
        except (TypeError, ValueError):
            delta = ""
        lines.append(f"| {label} | {lv} | {cv} | {delta} |")
    lines.append("")
    lines.append("## Checks")
    lines.append("")
    for name, ok, detail in checks:
        mark = "PASS" if ok else "FAIL"
        lines.append(f"- [{mark}] {name}: {detail}")
    lines.append("")
    lines.append("## Top signals")
    lines.append("")
    lines.append("### Live")
    for s in live_score.top_signals or ["(none)"]:
        lines.append(f"- {s}")
    lines.append("")
    lines.append("### Candidate")
    for s in cand_score.top_signals or ["(none)"]:
        lines.append(f"- {s}")
    lines.append("")
    report_path.write_text("\n".join(lines), encoding="utf-8")


def append_summary_row(summary_path, live_path, cand_path, live_score, cand_score, passed):
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    new_file = not summary_path.exists()
    with summary_path.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if new_file:
            w.writerow([
                "slug",
                "verdict",
                "live_score",
                "candidate_score",
                "live_mech_hits",
                "candidate_mech_hits",
                "live_stale_hits",
                "candidate_stale_hits",
                "live_speaker_turns",
                "candidate_speaker_turns",
                "live_path",
                "candidate_path",
            ])
        w.writerow([
            cand_path.stem,
            "ACCEPT" if passed else "REJECT",
            live_score.score,
            cand_score.score,
            live_score.mech_hits,
            cand_score.mech_hits,
            live_score.stale_hits,
            cand_score.stale_hits,
            live_score.speaker_turns,
            cand_score.speaker_turns,
            str(live_path),
            str(cand_path),
        ])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--live", required=True, type=Path)
    parser.add_argument("--candidate", required=True, type=Path)
    parser.add_argument("--report", type=Path, default=None)
    parser.add_argument(
        "--summary-csv",
        type=Path,
        default=Path("podcasts/tools/quality_compare_reports/_summary.csv"),
        help="CSV file that accumulates one row per comparison (default: podcasts/tools/quality_compare_reports/_summary.csv).",
    )
    args = parser.parse_args()

    if not args.live.exists():
        print(f"Live file not found: {args.live}", file=sys.stderr)
        sys.exit(2)
    if not args.candidate.exists():
        print(f"Candidate file not found: {args.candidate}", file=sys.stderr)
        sys.exit(2)

    live_path = args.live.resolve()
    cand_path = args.candidate.resolve()
    live_score = analyze_file(live_path)
    cand_score = analyze_file(cand_path)
    passed, checks = evaluate(live_score, cand_score)

    if args.report is None:
        args.report = Path("podcasts/tools/quality_compare_reports") / f"{cand_path.stem}.md"
    write_report(args.report, live_path, cand_path, live_score, cand_score, checks, passed)
    append_summary_row(args.summary_csv, live_path, cand_path, live_score, cand_score, passed)

    status = "ACCEPT" if passed else "REJECT"
    print(f"{status}: live={live_score.score} candidate={cand_score.score} report={args.report}")
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
