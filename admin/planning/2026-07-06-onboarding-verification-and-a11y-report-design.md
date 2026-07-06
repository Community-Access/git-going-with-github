# Onboarding verification and accessibility-report design

Date: 2026-07-06
Status: Approved for implementation

## Background

Two real support incidents (Community-Access/support#61 and #62) exposed two unrelated
but structurally similar problems in the workshop's automation:

1. The learning-room accessibility checker floods PRs with near-duplicate findings,
   making it hard for a screen reader user to find the actual actionable content (and,
   in Deborah Armstrong's case, to find the merge-conflict controls buried beneath it).
2. Two separate automations (enrollment invitations, Challenge 7 conflict seeding) each
   silently assume a precondition holds, and say nothing when it doesn't - leaving the
   learner confused with no signal that anything is wrong until they file a support
   ticket.

This spec covers two independent fixes. They touch different files and different
audiences (learner-facing bot output vs. maintainer-owned provisioning code) and can be
implemented and landed independently, but are specified together since both were
designed in the same review.

## Part A: Fix the accessibility-checker flood

**Files:** `learning-room/.github/scripts/check_accessibility.py`,
`learning-room/.github/workflows/content-validation.yml`

### Root cause

`check_accessibility.py`'s table-description check (around line 88) fires on every
line that looks like it's part of a table (`if '|' in line`), rather than once per
table. A single N-row table produces N near-identical "Table Description" findings
instead of 1. This is what turned Deborah's PR into a 100+ item report.

### Fix

- Detect a table by its *header line* only: a line containing `|` immediately
  followed by a separator line matching `^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$`
  (standard GFM table separator). Emit at most one "Table Description" finding per
  table block (keyed by the header line's line number), not one per row.
- Everything else in the file (alt text, link text) is already correctly scoped to
  one finding per occurrence - no change needed there.

### Comment presentation

In `content-validation.yml`'s "Post validation feedback" step:

- Group `feedback.accessibility` items by `file` under a `#### <file>` sub-heading
  inside the existing `### Accessibility` section, so a screen reader user can skip
  a whole file's worth of findings via heading navigation.
- Add a one-line count summary immediately under `### Accessibility`, e.g.
  `**3 suggestions across 2 files.**`, so scope is clear before reading further.
- Same treatment is not needed for `errors`/`warnings` right now - only
  `accessibility` has shown this volume in practice. Do not add speculative grouping
  to sections with no evidence of the problem (YAGNI).

### Testing

No test harness exists today for `learning-room/.github/scripts/*.py` (verified: no
`__tests__`, no pytest config). Add
`learning-room/.github/scripts/__tests__/test_check_accessibility.py` using Python's
stdlib `unittest` (no new dependency), asserting:

- A 10-row, single-header table produces exactly 1 "Table Description" finding.
- A file with 2 separate tables produces exactly 2 findings, each attributed to the
  correct file and header line.
- A non-table block containing `|` characters (e.g. inline code with a pipe) does not
  produce a false positive.

## Part B: Verify-then-tell-the-truth for two silent-assumption spots

### B1: Enrollment invitation status

**Files:** `.github/scripts/provisioning/github-client.js`,
`.github/scripts/provisioning/provision-core.js`,
`.github/scripts/provisioning/roster.js`, `roster.schema.json`,
`.github/scripts/provisioning/sync-intake-to-roster.js`

`github-client.js`'s `ensureCollaborator()` already returns
`{ status: 'invited' | 'already-collaborator' }` (both the raw-`request` and
`fromOctokit` variants). Today `provision-core.js` calls it and discards the result.

Changes:

1. **Roster schema:** add `intake_issue_number` (integer) and `intake_repo` (string,
   `owner/name`) as optional fields on a learner record in `roster.schema.json`.
2. **`sync-intake-to-roster.js`:** populate these two fields directly (structured data)
   instead of only embedding `from intake issue #N` inside the free-text `notes`
   field. Keep writing to `notes` too, for human readability - just stop being the
   only source.
3. **`github-client.js`:** add a `commentOnIssue({ owner, repo, issue_number, body })`
   method to both the raw-`request` client and the `fromOctokit` adapter.
4. **`provision-core.js`:** capture the `ensureCollaborator()` result, include it in
   `provisionLearner()`'s return value (`{ result, healed, templateSha, collaboratorStatus }`),
   and - when `intake_issue_number`/`intake_repo` are available on the learner record -
   post one follow-up comment on the intake issue:
   - `invited`: "Your invitation email is on its way - accept it to open your
     learning room."
   - `already-collaborator`: "You already have access - no invitation needed. Your
     learning room is at `<link>`." (This is the exact message that would have
     resolved support#62 automatically, with no support ticket needed.)
   - If no intake issue is known for the learner (older roster rows predating this
     field), skip the comment silently - do not fail provisioning over it.

### B2: Challenge 7 conflict-practice verification

**File:** `learning-room/.github/scripts/challenge-progression.js`

After `ensureMergeConflictPractice()` opens the dedicated practice PR (around line
477), before posting the success comment:

1. Poll `GET /repos/{owner}/{repo}/pulls/{number}` up to 3 attempts, 2 seconds apart
   (GitHub computes `mergeable_state` asynchronously - the same lag observed on
   Deborah's PR #10), checking for `mergeable_state === 'dirty'`. The delay must be
   injectable (a parameter defaulting to 2000ms) so tests can run with 0ms delay
   instead of actually sleeping.
2. If confirmed dirty: post the existing success comment unchanged.
3. If still not dirty after retries: post a fallback comment with the same manual
   conflict-creation steps already documented in Chapter 7 ("edit the same line
   directly on `main`, then return to this PR"), so a learner is never left with a
   silently-non-conflicting practice PR and no signal that anything's wrong.

### Testing

- Extend `provision-core.test.js` with a fake client asserting: `collaboratorStatus`
  is threaded through `provisionLearner()`'s return value for both `invited` and
  `already-collaborator`, and that `commentOnIssue` is called with the right message
  for each, and is skipped (not thrown) when intake fields are absent.
- Add `learning-room/.github/scripts/__tests__/challenge-progression.test.js` (Node
  built-in `node --test`, matching this repo's existing convention) with a fake
  `request` function asserting: a `dirty` mergeable state posts the success comment,
  a non-dirty state after exhausting retries posts the fallback comment.

## Out of scope

- No generic/abstract "verification framework" for future automations. Both B1 and B2
  are concrete fixes for the two known incidents, not a reusable platform - building
  one now would be speculative (YAGNI).
- No change to `errors`/`warnings` grouping in the content-validation comment (no
  evidence of the same volume problem there).
- No change to how `check_links.py` or `check_markdown.py` work.

## Authoritative Sources

Use these files as the current source of truth for the claims in this design - the
code itself, not this document, is authoritative once implemented.

- [`learning-room/.github/scripts/check_accessibility.py`](../../learning-room/.github/scripts/check_accessibility.py)
- [`learning-room/.github/workflows/content-validation.yml`](../../learning-room/.github/workflows/content-validation.yml)
- [`.github/scripts/provisioning/provision-core.js`](../../.github/scripts/provisioning/provision-core.js)
- [`.github/scripts/provisioning/github-client.js`](../../.github/scripts/provisioning/github-client.js)
- [`.github/scripts/provisioning/roster.js`](../../.github/scripts/provisioning/roster.js)
- [`.github/scripts/provisioning/sync-intake-to-roster.js`](../../.github/scripts/provisioning/sync-intake-to-roster.js)
- [`learning-room/.github/scripts/challenge-progression.js`](../../learning-room/.github/scripts/challenge-progression.js)
- [`.github/workflows/registration.yml`](../../.github/workflows/registration.yml)

### Section-Level Source Map

- **Background:** Community-Access/support issues #61 and #62 (external, not in this repo).
- **Part A (accessibility-checker flood):** [`check_accessibility.py`](../../learning-room/.github/scripts/check_accessibility.py), [`content-validation.yml`](../../learning-room/.github/workflows/content-validation.yml).
- **Part B1 (enrollment invitation status):** [`github-client.js`](../../.github/scripts/provisioning/github-client.js), [`provision-core.js`](../../.github/scripts/provisioning/provision-core.js), [`roster.js`](../../.github/scripts/provisioning/roster.js), [`sync-intake-to-roster.js`](../../.github/scripts/provisioning/sync-intake-to-roster.js), [`registration.yml`](../../.github/workflows/registration.yml).
- **Part B2 (Challenge 7 conflict verification):** [`challenge-progression.js`](../../learning-room/.github/scripts/challenge-progression.js).
