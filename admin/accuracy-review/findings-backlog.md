# Accuracy Findings Backlog

Last reviewed: May 12, 2026

This backlog starts with source-backed risk areas. It is not a completed audit finding list yet. Each item must be verified against the current UI or official docs before a content patch is made.

## P0 Findings To Verify First

The following table lists likely P0 findings that can block or mislead learners if left stale.

| Finding ID | Scenario | Evidence source | Current risk | Candidate files | Next action |
| --- | --- | --- | --- | --- | --- |
| ACC-P0-001 | Copilot billing and plan guidance | EXT-001, EXT-003, EXT-004 | Content may describe premium requests, free/pro limits, model availability, or paid access in ways that become inaccurate on June 1, 2026 | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/appendix-k-copilot-reference.md](../../docs/appendix-k-copilot-reference.md), [admin/FAQ.md](../FAQ.md), [README.md](../../README.md) | Replace volatile claims with AI Credits language, last-verified date, and official source links |
| ACC-P0-002 | Copilot code review cost and Actions minutes | EXT-002 | Content may imply Copilot code review is free or only consumes Copilot plan usage | [docs/15-code-review.md](../../docs/15-code-review.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md), classroom Day 2 content | Add cost caveat and facilitator guidance for June 1, 2026 and later |
| ACC-P0-003 | GitHub.com issue and PR walkthroughs | GAP-001 | Step labels and tab names may drift from current GitHub.com UI | [docs/05-working-with-issues.md](../../docs/05-working-with-issues.md), [docs/06-working-with-pull-requests.md](../../docs/06-working-with-pull-requests.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md) | Live-validate each click path and patch labels/outcomes |
| ACC-P0-004 | VS Code agent browser sharing | EXT-011 | Agent workflows may omit required browser-sharing consent and stop-sharing controls | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/19-accessibility-agents.md](../../docs/19-accessibility-agents.md), VS Code appendices | Add explicit sharing, approval, and privacy steps |
| ACC-P0-005 | Classroom workflow validation versus autograding | SCN-016 | Learners may confuse GitHub Classroom autograding, Aria comments, workflow checks, and manual grading | [classroom/README.md](../../classroom/README.md), [classroom/grading-guide.md](../../classroom/grading-guide.md), challenge scripts/transcripts | Normalize terminology and make completion evidence match current automation |
| ACC-P0-006 | Copilot plan availability for learners | EXT-004, EXT-025 | Content may overpromise Copilot availability or imply all AI features are free because VS Code AI work is being open sourced | [README.md](../../README.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [admin/DAY2_QUICK_START.md](../DAY2_QUICK_START.md) | Add plain prerequisite language: GitHub account and eligible Copilot plan or access path required |

## P1 Findings To Verify Next

The following table lists likely P1 findings that may confuse learners or facilitators.

| Finding ID | Scenario | Evidence source | Current risk | Candidate files | Next action |
| --- | --- | --- | --- | --- | --- |
| ACC-P1-001 | Static model recommendations | EXT-005, EXT-006, EXT-012 | Model names and availability can change quickly | [docs/appendix-k-copilot-reference.md](../../docs/appendix-k-copilot-reference.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md), podcast scripts | Convert static model guidance to selection principles and source-linked examples |
| ACC-P1-002 | VS Code terminal and sandbox prompts | EXT-014, EXT-020 | Current approval prompts and terminal focus routes may differ from docs | [docs/11-vscode-interface.md](../../docs/11-vscode-interface.md), [docs/12-vscode-accessibility.md](../../docs/12-vscode-accessibility.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md) | Validate prompt flow and update keyboard recovery guidance |
| ACC-P1-003 | AI co-authoring on commits | EXT-018 | Git commit guidance may omit Copilot co-author behavior when AI makes changes | [docs/14-git-in-practice.md](../../docs/14-git-in-practice.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md), classroom challenge 13 | Add authorship expectation and setting reference |
| ACC-P1-004 | Classroom and registration admin UI | GAP-002 | Classroom and registration steps may not match current web UI | [admin/CLASSROOM_INTEGRATION_GUIDE.md](../CLASSROOM_INTEGRATION_GUIDE.md), [admin/REGISTER.md](../REGISTER.md), [admin/REGISTRATION-ADMIN.md](../REGISTRATION-ADMIN.md), [admin/STUDENT_MANAGEMENT.md](../STUDENT_MANAGEMENT.md) | Live-validate facilitator path and patch labels/statuses |
| ACC-P1-005 | Branch protection and rulesets | EXT-021 | Ruleset bypass and branch rename behavior may be outdated | [docs/appendix-o-branch-protection.md](../../docs/appendix-o-branch-protection.md), [admin/FINE_GRAINED_TOKEN_SETUP.md](../FINE_GRAINED_TOKEN_SETUP.md) | Review current ruleset UI and update troubleshooting |
| ACC-P1-006 | GitHub PR extension labels in VS Code | GAP-003 | Plus-button and view labels may differ from current extension UI | [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md), VS Code chapters | Validate with installed extension version and patch ambiguous labels |

## P2 Findings To Verify During Cleanup

The following table lists lower-risk drift areas for the consistency pass.

| Finding ID | Scenario | Evidence source | Current risk | Candidate files | Next action |
| --- | --- | --- | --- | --- | --- |
| ACC-P2-001 | GitHub Mobile features | EXT-017, EXT-023 | Mobile appendix may omit current repository creation or remote session control | [docs/appendix-v-github-mobile.md](../../docs/appendix-v-github-mobile.md) | Update after live mobile or docs validation |
| ACC-P2-002 | Markdown preview route | EXT-015 | Markdown preview docs may omit current switch commands | [docs/11-vscode-interface.md](../../docs/11-vscode-interface.md), [admin/ACCESSIBILITY_TESTING.md](../ACCESSIBILITY_TESTING.md) | Add current route if relevant |
| ACC-P2-003 | MCP, BYOK, and skills management | EXT-007, EXT-010, EXT-019 | Advanced appendix may omit current BYOK, `.mcp.json`, or skill management capabilities | [docs/appendix-k-copilot-reference.md](../../docs/appendix-k-copilot-reference.md), [docs/19-accessibility-agents.md](../../docs/19-accessibility-agents.md) | Update advanced reference after P0/P1 work |
| ACC-P2-004 | Podcast duplicate drift | SCN-020 | Podcast scripts can repeat stale UI and pricing claims after docs are corrected | [podcasts/README.md](../../podcasts/README.md), `podcasts/scripts`, `podcasts/transcripts` | Regenerate or manually sync only after source docs are corrected |

## Search Terms Used

The following table lists useful search terms from the first scan.

| Topic | Search terms |
| --- | --- |
| Commercial claims | `pricing`, `price`, `paid`, `free plan`, `Pro`, `Business`, `Enterprise`, `trial`, `premium request`, `AI Credits`, `usage-based`, `billing`, `minutes`, `cost` |
| Copilot and models | `Copilot`, `agent mode`, `cloud agent`, `Copilot CLI`, `model picker`, `model selection`, `Claude`, `Codex`, `GPT`, `BYOK`, `MCP`, `custom instructions`, `skills` |
| Walkthrough steps | `click`, `select`, `press`, `activate`, `button`, `tab`, `menu`, `dropdown`, `settings`, `Command Palette`, `Ctrl`, `Alt+`, `NVDA`, `JAWS`, `VoiceOver`, `GitHub.com`, `VS Code` |
| Automation and outcomes | `autograding`, `workflow`, `checks`, `Aria`, `Student Progression Bot`, `validation`, `merge`, `review`, `status`, `output`, `error`, `success` |
