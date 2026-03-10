# Appendix K: Branch Protection Rules and Repository Rulesets
>
> **Listen to Episode 28:** [Branch Protection and Rulesets](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## How Merging Rules Work and Why Your PR May Be Blocked

> **Who this is for:** Contributors who have submitted a PR and are wondering why it cannot be merged yet, as well as workshop facilitators who configure branch protection for practice repositories.


## Quick Navigation

1. [What Branch Protection Does](#1-what-branch-protection-does)
2. [Common Branch Protection Rules](#2-common-branch-protection-rules)
3. [Repository Rulesets - The Modern Approach](#3-repository-rulesets---the-modern-approach)
4. [Why Your PR Cannot Be Merged - Diagnosis Guide](#4-why-your-pr-cannot-be-merged---diagnosis-guide)
5. [Navigating the Merge Box with a Screen Reader](#5-navigating-the-merge-box-with-a-screen-reader)
6. [Status Checks - What They Are and What They Mean](#6-status-checks---what-they-are-and-what-they-mean)
7. [Who Can Configure Branch Protection](#7-who-can-configure-branch-protection)
8. [Workshop Repository Configuration Reference](#8-workshop-repository-configuration-reference)


## 1. What Branch Protection Does

A **branch protection rule** is a set of requirements that must be satisfied before a PR can be merged into a specific branch (typically `main`). Branch protection exists to:

- Require that code is reviewed before it enters the default branch
- Require that automated tests pass before merging
- Prevent direct pushes to `main` without a PR
- Ensure the branch is up-to-date before merging
- Require commits to be signed (GPG or SSH signatures)

Think of branch protection as the quality gate for a repository's primary branch.


## 2. Common Branch Protection Rules

### Required Reviews

The most common rule. The maintainer requires a minimum number of approving reviews before the PR can be merged.

**Example:** "Require 1 approving review"

What this means for you:

- Your PR shows a "1 review required" notice in the merge box
- If a reviewer requests changes, their approval is revoked - you need at least one new approval after your latest push
- After you push new commits, re-request review from the original reviewer

**Dismiss stale reviews:** Some repos have this enabled - whenever you push a new commit, all existing approvals are automatically withdrawn and you need a fresh review. This prevents sneaking in bad code after approval.

### Required Status Checks

Automated workflows (GitHub Actions or third-party CI) must complete successfully before merging is allowed.

#### Example checks you may see

- `ci / build` - compiles the code
- `ci / test` - runs the test suite
- `lint` - code style checks
- `accessibility-check` - automated accessibility scanning
- `CodeQL` - security analysis
- `netlify/deploy-preview` - preview deployment must succeed

**What "Required" means:** The merge button is grayed out (or shows an error) until all required checks show a green checkmark. A failing or pending check blocks the merge.

### Require Branches to Be Up to Date

Before merging, your PR branch must include all changes from `main`. This prevents merge conflicts from being introduced silently.

If your PR is behind `main`:

- The merge box shows: "This branch is out of date with the base branch"
- Button: "Update branch" - merges current `main` into your branch
- Alternative: Rebase your branch (only if the maintainer permits rebase merges)

### Require Signed Commits

All commits in the PR must have a Verified badge (see [Appendix D: Git Authentication](appendix-d-git-authentication.md)). If your commits are unverified, the PR cannot be merged until you re-commit with signing enabled.

### Require Linear History

Only squash merges or rebase merges are permitted - no merge commits. This keeps the commit history linear and readable.

If you see: "This repository requires a linear history" - the maintainer will squash or rebase merge your PR, not create a merge commit.

### Lock Branch

A locked branch cannot receive any merges - it is effectively read-only. This is sometimes used for archived repositories or during release freezes.


## 3. Repository Rulesets - The Modern Approach

**Repository Rulesets** (introduced in late 2023) are the next generation of branch protection. They extend branch protection rules with:

- **Organization-level rules** - apply across all repos in an org from one place
- **Bypass lists** - specific users or roles can be exempted from rules (e.g., release bots)
- **Target multiple branches** - one ruleset can target a pattern like `release/*` or `v*`
- **Violation insights** - audit log of when rules were bypassed and by whom
- **Rule enforcement** - Active (enforced), Evaluate (only log violations, don't block), Disabled

### Rulesets vs. Branch Protection Rules

| Feature | Branch Protection Rules | Repository Rulesets |
| ---------  | ------------------------  | ---------------------  |
| Scope | Single branch, single repo | Patterns, multi-branch, cross-org |
| Bypass | No bypass capability | Configurable bypass list |
| Enforcement modes | Active only | Active, Evaluate, Disabled |
| Organization-level | No | Yes (org rulesets) |
| Status | Classic (still supported) | Current/modern approach |

Most repositories you encounter still use classic branch protection rules. Rulesets will become more common as maintainers migrate.

### Finding and Reading Rulesets

If you want to understand why certain rules apply to a branch:

```text
Repository → Insights tab → Rulesets (if you have access - contributors usually don't)
Or: Repository → Settings → Rules → Rulesets (admin only)
```

Alternatively, PR merge box messages describe which rules are blocking - you don't need admin access to understand what's required.


## 4. Why Your PR Cannot Be Merged - Diagnosis Guide

When you open a PR and the merge button is grayed out or shows an error, the merge box tells you exactly what needs to happen. Here is how to read it.

### "X review required / X reviews required"

**What it means:** The required number of approvals hasn't been reached yet.

#### What to do

1. Request review from a codeowner or maintainer (right sidebar → Reviewers → request)
2. Check if any reviews exist but requested changes - those count against you
3. Wait for the reviewer to submit their review
4. Respond to requested changes by pushing new commits, then re-requesting review

### "Some checks haven't completed yet" or "Some checks were not successful"

**What it means:** A required status check is pending or failing.

#### What to do

1. Scroll down to the merge box - expand "Show all checks"
2. Find the failing check → click "Details" to see the full log
3. Fix the underlying issue (test failure, lint error, build error) in your branch
4. Push new commits - checks re-run automatically
5. Wait for checks to complete (typically 1-5 minutes for most CI)

**If checks pass on `main` but fail on your PR:** The issue is specific to your changes. Read the check log carefully.

**If checks are stuck "in progress" for over 30 minutes:** The workflow runner may have an issue - contact the maintainer.

### "This branch is out of date with the base branch"

**What it means:** New commits were pushed to `main` after you created your PR branch. The maintainer requires everything to be current.

#### What to do

- Click **"Update branch"** in the merge box - GitHub does a merge commit from `main` into your branch
- Or locally: `git fetch upstream && git rebase upstream/main` then force-push (only if you are comfortable with rebase)

### "Commits must have verified signatures"

**What it means:** Branch protection requires signed commits (see [Appendix D: Git Authentication](appendix-d-git-authentication.md)).

#### What to do

1. Enable commit signing locally before making more commits
2. For existing unsigned commits, you need to rebase-rewrite them - this is advanced; ask the maintainer if there is a workaround

### "Merging is blocked"

**What it means:** A ruleset or branch protection has explicitly blocked merging for a reason not covered by other messages. Check the PR for a pinned comment from the mergeable status check or a GitHub Actions check that posts a comment explaining the block.


## 5. Navigating the Merge Box with a Screen Reader

The merge box lives at the bottom of every PR page. With a screen reader, navigating to it efficiently is important.

### Reaching the Merge Box

```text
PR page → End key (jump to bottom of page)
Or: B key (NVDA Browse Mode) → navigate buttons → look for "Merge pull request" button
Or: H key → navigate to "Merge" heading area
```

### Reading the Merge Box Status

```text
From the merge box area:
H → section heading ("Merging is blocked" or "This branch has no conflicts")
↓ → first status message
↓/Tab → each requirement listed (required reviews, required checks, etc.)
```

#### NVDA specific path

```text
NVDA+F7 → Elements list → Filter by type: Headings
Find "Merge" related heading → move focus to that section
Then ↓ through the section content
```

#### JAWS specific path

```text
H → navigate to merge section
Then ↓ key → read each item in the requirements list
```

### Checking Status Checks

```text
Merge box area → Tab → "Show all checks" link or button → Enter
Expands to show: each check name, its status (passed/failed/pending), "Details" link
Tab through each check → "Details" link → Enter to open the check log
```

### Reading Check Details

The check log is a text-heavy page in a pre-formatted block.

```text
Check log page: H → "Summary" heading → ↓ to read summary
To read the full log: F → form controls → step dropdown (if multi-step)
Or: Tab → each step accordion → Enter to expand → ↓ to read log lines
Log content is usually in a scrollable region: ↓ key scrolls through lines
```


## 6. Status Checks - What They Are and What They Mean

Status checks come from two sources:

### GitHub Actions Status Checks

Defined in `.github/workflows/*.yml` in the repository. Each `job:` in a workflow file becomes a status check. Example:

```yaml
# .github/workflows/ci.yml
jobs:
  test:           ← this creates the "test" status check
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm test
```

### Third-Party Status Checks

Services like Netlify, Vercel, Codecov, and Snyk post status checks via the GitHub API. You will recognize them by their app name prefix (e.g., `netlify/deploy-preview - Deploy Preview ready`).

### Status Check States

| Icon | State | Meaning |
| ------  | -------  | ---------  |
| Yellow circle | Pending | Running now or queued |
| Green checkmark | Success | Passed, no issues |
| Red X | Failure | Failed - PR cannot be merged until fixed |
| Red circle | Error | Unexpected error in the check runner (not your code's fault) |
| Grey circle | Skipped | Not relevant for this PR (conditional run) |
| Neutral | Neutral | Informational - does not block merge |


## 7. Who Can Configure Branch Protection

| Role | Can view requirements | Can modify requirements |
| ------  | -----------------------  | -------------------------  |
| Public viewer | No (only via PR merge box) | No |
| Contributor | PR merge box only | No |
| Triage | PR merge box only | No |
| Write | Settings → Rules (read-only in most cases) | No |
| Maintain | Yes | Partial |
| Admin | Yes | Yes - full control |
| Org admin | Yes | Yes - including org-level rulesets |

As a workshop participant, you are typically a **contributor** to the main `community-access/accessibility-agents` repo and an **admin** of your own fork. On your fork, you can configure branch protection however you like - including disabling it entirely for practice purposes.


## 8. Workshop Repository Configuration Reference

The `community-access/accessibility-agents` repository uses the following branch protection configuration on `main`:

| Rule | Setting |
| ------  | ---------  |
| Required reviews | 1 approving review |
| Dismiss stale reviews | Yes - new commits require re-review |
| Require status checks | `ci / build` and `ci / test` |
| Up-to-date requirement | Yes |
| Signed commits | No (to reduce friction for workshop participants) |
| Restrict direct pushes | Yes - all changes must come through PRs |

**Workshop tip:** Your personal fork of [accessibility-agents](https://github.com/Community-Access/accessibility-agents) has no branch protection by default. If you want to practice the full "review before merge" workflow with a partner, you can add branch protection to your fork:

```text
Your fork → Settings → Branches → Add branch protection rule
Branch name pattern: main
Check: Require a pull request before merging
Check: Require approvals → 1
Save changes
```

Then practice opening a PR on your fork and requesting your workshop partner's review.


## Related Resources

- [Appendix D - Git Authentication and Commit Signing](appendix-d-git-authentication.md)
- [Appendix Q - GitHub Actions Workflows](appendix-q-actions-workflows.md)
- [Appendix L - GitHub Security Features](appendix-p-security-features.md)
- [Chapter 6 - Working with Pull Requests](../docs/06-working-with-pull-requests.md)
- [Chapter 7 - Merge Conflicts](../docs/07-merge-conflicts.md)


*Return to: [Resources](appendix-x-resources.md) | [Appendix L - Security Features](appendix-p-security-features.md)*
