# Scenario Inventory

Last reviewed: May 12, 2026

This inventory lists scenario families that need current-product validation before learner-facing edits are made.

## Audit Surface Summary

The first scan found 388 markdown and text assets in scope across `admin`, `classroom`, `docs`, `learning-room`, and `podcasts`.

The following table summarizes the number of markdown and text assets by area.

| Area | File count | Notes |
| --- | ---: | --- |
| `admin` | 139 | Facilitator, registration, classroom, QA, support, and operations guides |
| `classroom` | 8 | Assignments, grading, human test matrix, and challenge review content |
| `docs` | 73 | Core curriculum chapters and appendices |
| `learning-room` | 16 | Learner-facing template repository content and references |
| `podcasts` | 161 | Scripts, transcripts, regeneration docs, TTS docs, and challenge bundles |

## Critical Scenario Families

The following table maps high-risk scenarios to starting content locations and validation targets.

| Scenario ID | Scenario family | Primary audience | Starting files | Validation target | Initial severity |
| --- | --- | --- | --- | --- | --- |
| SCN-001 | Workshop onboarding and prerequisites | Learner | [README.md](../../README.md), [docs/course-guide.md](../../docs/course-guide.md), [admin/DAY2_QUICK_START.md](../DAY2_QUICK_START.md) | Account setup, Copilot availability language, VS Code path, support path, and current prerequisites | P0 |
| SCN-002 | Find repository, files, and README on GitHub.com | Learner | [docs/03-navigating-repositories.md](../../docs/03-navigating-repositories.md), [docs/04-the-learning-room.md](../../docs/04-the-learning-room.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md) | Current Code tab layout, file list, README rendering, repository header, and keyboard route | P0 |
| SCN-003 | Create and manage issues | Learner | [docs/05-working-with-issues.md](../../docs/05-working-with-issues.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md), [learning-room/README.md](../../learning-room/README.md) | New issue path, templates, assignee filtering, comments, mentions, close issue behavior | P0 |
| SCN-004 | Create branch and commit in browser | Learner | [docs/04-the-learning-room.md](../../docs/04-the-learning-room.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md), [docs/13-how-git-works.md](../../docs/13-how-git-works.md) | Branch selector labels, web editor entry point, commit button labels, file edit flow | P0 |
| SCN-005 | Create, review, and merge pull requests | Learner | [docs/06-working-with-pull-requests.md](../../docs/06-working-with-pull-requests.md), [docs/15-code-review.md](../../docs/15-code-review.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md) | Pull request creation, compare selector, Conversation/Files changed/Checks tabs, review comments, merge buttons | P0 |
| SCN-006 | Resolve merge conflicts | Learner | [docs/07-merge-conflicts.md](../../docs/07-merge-conflicts.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md), podcast Challenge 7 scripts | Current conflict UI, conflict marker workflow, VS Code Source Control conflict flow, validation output | P0 |
| SCN-007 | VS Code basics and accessibility | Learner | [docs/11-vscode-interface.md](../../docs/11-vscode-interface.md), [docs/12-vscode-accessibility.md](../../docs/12-vscode-accessibility.md), [docs/appendix-g-vscode-reference.md](../../docs/appendix-g-vscode-reference.md) | Command Palette labels, Activity Bar and panel behavior, Accessible View, terminal focus, current settings paths | P0 |
| SCN-008 | Git locally through VS Code and terminal | Learner | [docs/14-git-in-practice.md](../../docs/14-git-in-practice.md), [admin/DAY2_QUICK_START.md](../DAY2_QUICK_START.md), classroom Day 2 content | Clone, branch, stage, commit, push, publish branch, co-author behavior, prompt behavior | P0 |
| SCN-009 | Copilot setup and usage | Learner | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/appendix-k-copilot-reference.md](../../docs/appendix-k-copilot-reference.md), [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md) | Copilot Free, Pro, Student, chat limits, model selection, inline chat entry points, account sign-in, VS Code UI | P0 |
| SCN-010 | Copilot billing, credits, and model volatility | Learner and facilitator | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/appendix-k-copilot-reference.md](../../docs/appendix-k-copilot-reference.md), [admin/FAQ.md](../FAQ.md) | Usage-based billing, AI Credits, code review Actions minutes, included usage, model deprecations, current plan names | P0 |
| SCN-011 | Copilot cloud agent and agentic workflows | Learner and facilitator | [README.md](../../README.md), [docs/19-accessibility-agents.md](../../docs/19-accessibility-agents.md), [docs/20-build-your-agent.md](../../docs/20-build-your-agent.md) | GitHub.com agent session paths, VS Code agent entry points, preview labeling, cloud agent controls | P1 |
| SCN-012 | VS Code integrated browser and agents | Learner | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/19-accessibility-agents.md](../../docs/19-accessibility-agents.md), VS Code appendices | Explicit browser sharing, agent-initiated sharing prompt, stop-sharing control, privacy language | P0 |
| SCN-013 | Agent sandbox and terminal approvals | Learner and facilitator | [docs/16-github-copilot.md](../../docs/16-github-copilot.md), [docs/19-accessibility-agents.md](../../docs/19-accessibility-agents.md), admin QA docs | `allowNetwork`, temp-folder write approvals, organization-managed settings, expected prompts | P1 |
| SCN-014 | GitHub Classroom assignment creation and progression | Facilitator | [classroom/README.md](../../classroom/README.md), [admin/CLASSROOM_INTEGRATION_GUIDE.md](../CLASSROOM_INTEGRATION_GUIDE.md), [admin/COHORT_PROVISIONING.md](../COHORT_PROVISIONING.md) | Classroom invite flow, assignment setup, roster, student repo creation, progression bot behavior | P0 |
| SCN-015 | Facilitator registration and student management | Facilitator | [admin/REGISTER.md](../REGISTER.md), [admin/REGISTRATION-ADMIN.md](../REGISTRATION-ADMIN.md), [admin/STUDENT_MANAGEMENT.md](../STUDENT_MANAGEMENT.md) | Current registration forms, admin screens, removal paths, progress checking, support escalation | P1 |
| SCN-016 | Workflow validation and autograding | Facilitator and learner | [classroom/README.md](../../classroom/README.md), [classroom/grading-guide.md](../../classroom/grading-guide.md), [admin/VALIDATION_AUDIT.md](../VALIDATION_AUDIT.md) | Distinguish Classroom autograding, workflow checks, Gandalf comments, and manual grading | P0 |
| SCN-017 | GitHub Projects, labels, milestones, and notifications | Learner | [docs/09-labels-milestones-projects.md](../../docs/09-labels-milestones-projects.md), [docs/10-notifications-and-day-1-close.md](../../docs/10-notifications-and-day-1-close.md), [docs/appendix-r-projects-deep-dive.md](../../docs/appendix-r-projects-deep-dive.md) | Current Projects UI, notification settings, filters, labels, milestones, and keyboard navigation | P1 |
| SCN-018 | GitHub Mobile and remote workflows | Learner | [docs/appendix-v-github-mobile.md](../../docs/appendix-v-github-mobile.md), [docs/16-github-copilot.md](../../docs/16-github-copilot.md) | GitHub Mobile repository creation, Copilot tab, remote CLI session control, mobile accessibility | P2 |
| SCN-019 | Branch protection, rulesets, and repository settings | Facilitator and learner | [docs/appendix-o-branch-protection.md](../../docs/appendix-o-branch-protection.md), [admin/FINE_GRAINED_TOKEN_SETUP.md](../FINE_GRAINED_TOKEN_SETUP.md) | Ruleset user bypass, branch renaming, protected branch messages, token permissions | P1 |
| SCN-020 | Podcast and transcript alignment | Learner and facilitator | [podcasts/README.md](../../podcasts/README.md), `podcasts/scripts`, `podcasts/transcripts` | Ensure corrected docs propagate to scripts/transcripts without reintroducing stale autogenerated language | P1 |

## Highest-Risk Files For First Manual Validation

The following table lists the first files to inspect during P0 remediation.

| Priority | File | Reason |
| --- | --- | --- |
| 1 | [docs/16-github-copilot.md](../../docs/16-github-copilot.md) | Highest concentration of Copilot, model, billing, agent, and VS Code behavior risk |
| 2 | [docs/06-working-with-pull-requests.md](../../docs/06-working-with-pull-requests.md) | Critical learner PR workflow with likely UI drift |
| 3 | [docs/05-working-with-issues.md](../../docs/05-working-with-issues.md) | Critical issue workflow and template path |
| 4 | [docs/11-vscode-interface.md](../../docs/11-vscode-interface.md) | Current VS Code UI and command route accuracy |
| 5 | [docs/12-vscode-accessibility.md](../../docs/12-vscode-accessibility.md) | Current Accessible View, terminal, and screen reader behavior |
| 6 | [docs/14-git-in-practice.md](../../docs/14-git-in-practice.md) | Local Git, VS Code, terminal, and AI co-author side effects |
| 7 | [classroom/challenge-content-review.md](../../classroom/challenge-content-review.md) | Dense step-by-step source with many UI labels and challenge outcomes |
| 8 | [classroom/README.md](../../classroom/README.md) | Classroom automation, autograding, progression, and admin paths |
| 9 | [admin/CLASSROOM_INTEGRATION_GUIDE.md](../CLASSROOM_INTEGRATION_GUIDE.md) | High-risk facilitator setup path |
| 10 | [learning-room/docs/keyboard-shortcuts.md](../../learning-room/docs/keyboard-shortcuts.md) | Current GitHub keyboard and feature-preview guidance |

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Audit Surface Summary:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Critical Scenario Families:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Highest-Risk Files For First Manual Validation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
