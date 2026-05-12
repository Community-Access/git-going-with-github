# Facilitator Grading Guide

How to evaluate student work across the 16 core challenges and 5 bonus challenges.

## Grading Philosophy

This is a learning workshop, not a competitive course. The grading system measures participation and engagement, not perfection.

- **Completion, not correctness:** If a student attempted the challenge and produced evidence, they completed it
- **Effort over elegance:** A messy first attempt that shows learning is better than a polished copy-paste
- **Partial credit always:** Any progress counts. No student should feel like they failed.

## Automated Checks

Automated checks run as GitHub Actions workflows shipped inside each student repo (from `Community-Access/learning-room-template`). They check for:

- Existence of files, branches, and commits
- Presence of required fields in templates
- Absence of merge conflict markers

Automated checks handle the objective criteria. Facilitator judgment handles everything else.

**What is auto-checked today** (see workflow files under `.github/workflows/autograder-*.yml` in the template repo, and [admin/classroom/autograding-setup.md](../admin/classroom/autograding-setup.md) for the full mapping):

- Day 1: Challenges **2, 5, 6, 7** (issue filed, commit on branch, PR with `Closes/Fixes/Resolves`, no conflict markers)
- Day 2: Challenges **10, 14, 16** (local commit on branch, custom issue template with `name`/`description`, agent file with frontmatter and required sections)

The `(auto)` tag in the per-challenge tables below marks rows where an autograder workflow will post pass/fail results as an issue or PR comment. All other rows require facilitator review.

## Per-Challenge Grading

### Day 1 Challenges (01-09)

| # | Challenge | Evidence | Complete if... |
|---|---|---|---|
| 01 | Find Your Way Around | Issue comment listing findings | Student explored multiple tabs and found key files |
| 02 | First Issue (auto) | Open issue | Title is clear and body has context |
| 03 | Join the Conversation | Comment thread with @mention | At least one substantive reply to the peer-simulation issue or a real buddy issue if access is provisioned |
| 04 | Branch Out | Branch exists | Any branch with any name exists |
| 05 | Make Your Mark (auto) | Commit on branch | File was edited and commit message is descriptive |
| 06 | First PR (auto) | Open or merged PR | PR has title + description + `Closes #N` |
| 07 | Merge Conflict (auto) | Clean file in PR | No conflict markers remain |
| 08 | Culture | Comment or issue body with reflection | Shows genuine engagement with governance files |
| 09 | Merge Day | Merged PR | At least one PR was reviewed and merged |

### Day 2 Challenges (10-16)

| # | Challenge | Evidence | Complete if... |
|---|---|---|---|
| 10 | Go Local (auto) | Branch pushed from local clone | Git log shows local commits |
| 11 | Day 2 PR | PR from locally-pushed branch | PR exists with description |
| 12 | Code Review | Review comment on the peer-simulation PR or a real buddy PR if access is provisioned | At least one specific, constructive comment |
| 13 | Copilot | Evidence of Copilot interaction | Shows both Copilot output AND student evaluation |
| 14 | Issue Template (auto) | YAML file in `.github/ISSUE_TEMPLATE/` | Has `name` and `description` fields |
| 15 | Agents | Exploration notes in issue or PR | Examined at least one agent's instructions |
| 16 | Capstone (auto) | Agent file with PR to accessibility-agents, plus peer-simulation or real peer review evidence | Has frontmatter, responsibilities, guardrails |

### Bonus Challenges (A-E)

| # | Challenge | Evidence | Complete if... |
|---|---|---|---|
| A | Accessibility Audit | Issue or PR with findings | Identified at least 2 real accessibility issues |
| B | Mentor a Peer | Thread showing guidance | Helped another student resolve a challenge, or provided high-quality guidance on a peer-simulation issue if real peer access is unavailable |
| C | Cross-Repo Contribution | PR to accessibility-agents or git-going repo | PR submitted to a repo outside the learning room |
| D | Custom Workflow | Workflow file or documentation | Created or documented a reusable workflow |
| E | Documentation Champion | Doc improvements in any repo | Improved existing documentation with a merged PR |

Bonus challenges are entirely optional and do not affect core completion. Award bonus points for any genuine attempt.

## Completion Levels

| Level | Day 1 + Day 2 participants | Day 2 only participants | Label |
|---|---|---|---|
| Workshop Complete | 7 of 9 (Day 1) + 5 of 7 (Day 2) | 5 of 7 (Day 2) | Participated fully |
| Workshop Complete with Distinction | 9 of 9 + 7 of 7 | 7 of 7 | Completed all core challenges |
| Workshop Complete with Honors | 9 of 9 + 7 of 7 + 2 bonus | 7 of 7 + 2 bonus | Exceeded expectations |

> **Day-2-only participants** are evaluated only on Day 2 challenges (10-16). They are not penalized for missing Day 1.

## Edge Cases

- **Student used a different tool than described:** Still counts. The learning objective is the skill, not the tool.
- **Student's evidence is in the wrong place:** Still counts. Redirect them for next time.
- **Student helped others but did not finish their own work:** Give credit for completed challenges. Helping others is valuable but does not substitute for personal evidence.
- **Student worked ahead and completed Day 2 challenges on Day 1:** Fine. Do not penalize initiative.
- **Student joined on Day 2 without attending Day 1:** Evaluate on Day 2 challenges only. They verified their GitHub fundamentals via the Day 2 Quick Start self-assessment. Do not require Day 1 challenge completion.
