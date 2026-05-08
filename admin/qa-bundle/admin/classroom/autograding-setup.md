# Autograding Setup and Verification

This guide makes Classroom autograding setup repeatable and reliable for facilitators.

## Scope

- Day 1 tests come from `classroom/autograding-day1.json`
- Day 2 tests come from `classroom/autograding-day2.json`
- All entries below are copy-accurate from those files

## UI Entry Rules (Use for Every Test)

For each test you add in Classroom:

- Set **Test name** exactly as shown below
- Set **Run command** exactly as shown below
- Set **Comparison** to `exact`
- Leave **Setup**, **Input**, and **Expected output** empty unless noted
- Set **Timeout** and **Points** exactly as shown below

Do not paste raw JSON into the UI. Add tests one by one.

## Day 1 Autograding Tests

### Test 1

- Test name: `Challenge 2: Issue Filed`
- Run command:

```bash
gh issue list --repo $GITHUB_REPOSITORY --author $GITHUB_ACTOR --state all --json number --jq 'length' | xargs test 0 -lt
```

- Comparison: `exact`
- Timeout: `10`
- Points: `10`

### Test 2

- Test name: `Challenge 5: Commit Exists`
- Run command:

```bash
git log --oneline --all --author=$GITHUB_ACTOR | head -1 | grep -q '.'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `10`

### Test 3

- Test name: `Challenge 6: PR with Issue Link`
- Run command:

```bash
gh pr list --repo $GITHUB_REPOSITORY --author $GITHUB_ACTOR --state all --json body --jq '.[0].body' | grep -iq 'closes\|fixes\|resolves'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `15`

### Test 4

- Test name: `Challenge 7: No Conflict Markers`
- Run command:

```bash
! grep -rn '<<<<<<< \|======= \|>>>>>>> ' docs/ 2>/dev/null
```

- Comparison: `exact`
- Timeout: `10`
- Points: `15`

## Day 2 Autograding Tests

### Test 1

- Test name: `Challenge 10: Go Local - Commit on Branch`
- Run command:

```bash
git log --oneline origin/main..HEAD 2>/dev/null | head -1 | grep -q '.' || git branch -r --list 'origin/*' | grep -v main | head -1 | xargs -I{} git log --oneline origin/main..{} | head -1 | grep -q '.'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `15`

### Test 2

- Test name: `Challenge 14: Template Remix - Custom Issue Template Exists`
- Run command:

```bash
find .github/ISSUE_TEMPLATE -name '*.yml' ! -name 'challenge-*.yml' ! -name 'bonus-*.yml' ! -name 'config.yml' 2>/dev/null | head -1 | grep -q '.'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `15`

### Test 3

- Test name: `Challenge 14: Template Remix - Template Has Required Fields`
- Run command:

```bash
TEMPLATE=$(find .github/ISSUE_TEMPLATE -name '*.yml' ! -name 'challenge-*.yml' ! -name 'bonus-*.yml' ! -name 'config.yml' 2>/dev/null | head -1); grep -q '^name:' "$TEMPLATE" && grep -q '^description:' "$TEMPLATE"
```

- Comparison: `exact`
- Timeout: `10`
- Points: `10`

### Test 4

- Test name: `Challenge 16: Build Your Agent - Agent File Exists`
- Run command:

```bash
find agents community-agents -name '*.md' 2>/dev/null | head -1 | grep -q '.'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `10`

### Test 5

- Test name: `Challenge 16: Build Your Agent - Agent Has Frontmatter`
- Run command:

```bash
AGENT=$(find agents community-agents -name '*.md' 2>/dev/null | head -1); head -1 "$AGENT" | grep -q '^---'
```

- Comparison: `exact`
- Timeout: `10`
- Points: `10`

### Test 6

- Test name: `Challenge 16: Build Your Agent - Agent Has Responsibilities and Guardrails`
- Run command:

```bash
AGENT=$(find agents community-agents -name '*.md' 2>/dev/null | head -1); grep -qi '## responsibilities\|## what this agent does' "$AGENT" && grep -qi '## guardrails\|## limitations\|## boundaries' "$AGENT"
```

- Comparison: `exact`
- Timeout: `10`
- Points: `15`

## Hardening Checklist Before Cohort Start

1. Add all tests and save assignment.
2. Confirm test count:
   - Day 1 has 4 tests
   - Day 2 has 6 tests
3. Confirm point totals:
   - Day 1 total = 50
   - Day 2 total = 75
4. Use a test student account to accept each assignment.
5. Trigger one known pass on each assignment.
6. Trigger one known fail on each assignment and confirm feedback appears.
7. Confirm rerun passes after fix.
8. Capture one screenshot of pass and one of fail for facilitator reference.

## Fast Validation Scenarios

### Day 1 quick checks

- Pass check: open an issue, make a commit, open a PR with `Closes #<issue-number>`, ensure no conflict markers remain in `docs/`.
- Fail check: open a PR without `Closes`, `Fixes`, or `Resolves` in the body.

### Day 2 quick checks

- Pass check: create one non-main commit, add a custom issue template with `name:` and `description:`, add an agent markdown file with frontmatter and required sections.
- Fail check: create an agent file without a `## Responsibilities` section.

## Troubleshooting

### Test stays red after student fix

1. Confirm student pushed a new commit to the same PR branch.
2. Open PR checks and inspect the failing command output.
3. Verify required text is in the file body, not only in issue comments.

### Challenge 14 tests fail unexpectedly

- Verify template filename is `.yml`.
- Verify it is under `.github/ISSUE_TEMPLATE`.
- Verify filename does not match `challenge-*.yml`, `bonus-*.yml`, or `config.yml`.

### Challenge 16 section check fails

- Ensure headings use markdown heading syntax (for example `## Responsibilities`).
- Ensure guardrail heading uses one accepted form:
  - `## Guardrails`
  - `## Limitations`
  - `## Boundaries`

## Keep This Guide Synced

If autograding JSON changes, update this file in the same pull request:

- `classroom/autograding-day1.json`
- `classroom/autograding-day2.json`
