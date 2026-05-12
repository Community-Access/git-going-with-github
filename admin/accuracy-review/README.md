# Accuracy Review Program

Last reviewed: May 12, 2026

This folder contains the approval package and execution plan for a source-backed accuracy review of GitHub, VS Code, Copilot, Classroom, and related walkthrough content in this repository.

## Purpose

The review validates that curriculum, admin guides, classroom materials, website-facing content, and podcast scripts match current product behavior. The scope covers pricing and billing, but it also covers web page walkthroughs, VS Code steps, scenario outcomes, UI labels, commands, shortcuts, prompts, and support paths.

## Source Set

The following official sources are the baseline for this review.

The following table lists the authoritative source groups and what each one controls.

| Source group | Official source | Used for |
| --- | --- | --- |
| GitHub changelog | [GitHub Changelog](https://github.blog/changelog/) | Recent GitHub UI, governance, security, Copilot, Actions, and account-management changes |
| Copilot changelog | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Copilot model, code review, cloud agent, CLI, billing, and usage-metrics changes |
| Copilot plans | [GitHub Copilot plans](https://github.com/features/copilot/plans) | Current individual and business plan language, limits, and temporary purchase-state messaging |
| Copilot billing | [Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) | GitHub AI Credits, included usage, overage behavior, and June 1, 2026 migration details |
| Copilot billing announcement | [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) | Product rationale, plan migration summary, Actions minutes impact for code review |
| VS Code release notes | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) and [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | Agent browser sharing, remote control, sandboxing, model details, Markdown preview, and accessibility changes |
| VS Code FAQ | [Visual Studio Code FAQ](https://code.visualstudio.com/docs/supporting/faq) | Copilot subscription relationship, AI feature disablement, telemetry, platform support, extension marketplace rules |

## Deliverables

The following table lists the review artifacts in this folder and how they are used.

| Artifact | Purpose |
| --- | --- |
| [external-change-register.md](external-change-register.md) | Source-backed register of platform changes that may affect repository content |
| [scenario-inventory.md](scenario-inventory.md) | Scenario and walkthrough inventory with file ownership and validation targets |
| [findings-backlog.md](findings-backlog.md) | Initial P0/P1/P2 backlog for remediation planning |
| [verification-runbook.md](verification-runbook.md) | Manual and automated verification procedure for scenario accuracy |

## Review Rules

1. Treat official GitHub, Copilot, and VS Code sources as authoritative.
2. Do not rely on memory for UI labels, plan names, model names, prices, or quotas.
3. Do not keep volatile claims without a last-verified date and source link.
4. Validate high-risk walkthroughs in the current UI before editing learner-facing steps.
5. Keep remediation batches small enough to review and test independently.

## Severity Model

The following table defines severity levels for accuracy findings.

| Severity | Definition | Required action |
| --- | --- | --- |
| P0 | Incorrect content can block a learner, misstate billing, create unsafe guidance, or break a critical walkthrough | Fix before the next cohort or public release |
| P1 | Content is likely to confuse learners or facilitators but has a workable recovery path | Fix in the first remediation cycle |
| P2 | Wording is stale, inconsistent, or lower-risk | Fix during cleanup and consistency passes |

## Execution Sequence

1. Confirm source register coverage.
2. Validate P0 scenarios against the current GitHub and VS Code UI.
3. Patch P0 documentation and scripts.
4. Validate P1 scenarios and patch in topic batches.
5. Normalize all volatile pricing, billing, model, and limit language.
6. Run repository validation commands and scenario spot checks.
7. Publish a final accuracy review report with unresolved risks.
