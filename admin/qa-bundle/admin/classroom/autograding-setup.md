# Autograding Setup -- Not Required

> **Status: deprecated as of May 2026.** You do **not** need to configure any test cases in the GitHub Classroom autograding UI for this workshop. Skip that step entirely when creating Day 1 and Day 2 assignments.

## Why this changed

GitHub Classroom's "test cases" panel intermittently fails to save edits (the modal closes with no error and the test list comes back empty). Rather than fight a broken UI on every cohort, every autograded check has been re-implemented as a normal GitHub Actions workflow inside `Community-Access/learning-room-template`. Those workflows are copied into each student repo automatically when GitHub Classroom creates the repo from the template -- no Classroom configuration required.

## Where the checks live now

Each check below runs as its own workflow in the student repo. Results are posted as a single PR or issue comment that updates in place on each push.

### Day 1 checks

| Challenge | What it verifies | Workflow file |
|---|---|---|
| 2: Issue Filed | Student has opened at least one issue in their repo | `.github/workflows/autograder-issue-filed.yml` |
| 5: Commit on a branch | At least one commit on a non-default branch | `.github/workflows/autograder-branch-commit.yml` |
| 6: PR links to an issue | PR body contains `Closes`, `Fixes`, or `Resolves #N` | `.github/workflows/autograder-pr-link.yml` |
| 7: No conflict markers | No `<<<<<<<`, `=======`, or `>>>>>>>` markers in `docs/` | `.github/workflows/autograder-conflicts.yml` |

### Day 2 checks

| Challenge | What it verifies | Workflow file |
|---|---|---|
| 10: Local commit | At least one commit on a non-default branch | `.github/workflows/autograder-local-commit.yml` |
| 14: Custom issue template | A non-challenge YAML template under `.github/ISSUE_TEMPLATE/` with `name:` and `description:` fields | `.github/workflows/autograder-template.yml` |
| 16: Capstone agent file | Agent markdown file with frontmatter, responsibilities, and guardrails | `.github/workflows/autograder-capstone.yml` |

A separate workflow, `.github/workflows/autograder-watchdog.yml`, listens for `workflow_run` completion of every autograder above. If one of them ends with `conclusion: failure` and no challenge-result comment has been posted on the open PR for that branch, the watchdog posts a single fallback notice telling the student the check could not complete and to ping a facilitator. If the in-job error handler already posted a comment, the watchdog is a no-op. This is a safety net only -- the seven primary workflows remain the source of truth for pass/fail.

## What to do during cohort setup

When creating Day 1 and Day 2 assignments in GitHub Classroom:

1. Paste the assignment description as usual.
2. **Skip the autograding tests section.** Leave it empty. Do not click `Add test`.
3. Save the assignment and copy the invite URL.

That is the entire change. Everything else in `live-facilitation-flow.md` still applies.

## Verifying the checks work

Before sharing invite links, use a test student account to verify each workflow posts its comment. The procedure is in `live-facilitation-flow.md` (Phase 3: Verify Autograder Workflows).

## Historical reference

The Classroom test-case definitions that used to live in `classroom/autograding-day1.json` and `classroom/autograding-day2.json` were deleted in May 2026 along with this workflow migration. The autograder workflow files (`learning-room/.github/workflows/autograder-*.yml`) are the only remaining source of truth for what each check verifies. Git history retains the old JSONs if you ever need to read them.
