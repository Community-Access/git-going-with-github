# Accessibility Report Dedup and Grouping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the learning-room accessibility checker from flooding student PRs with duplicate "Table Description" findings, and group whatever findings remain by file in the PR comment.

**Architecture:** Two independent fixes in the `learning-room/` template (copied into every student repo): (1) `check_accessibility.py`'s table-description check currently fires once per table *row* instead of once per table - fix the detection to key off the header+separator row pair; (2) extract the inline comment-building script in `content-validation.yml` into a plain, testable module (`build-content-validation-comment.js`, mirroring the existing `.github/scripts/validation-report.js` pattern at the repo root) and group accessibility findings by file with a summary count line.

**Tech Stack:** Python 3 stdlib (`re`, `unittest`) for the checker; Node.js (`node --test`, no new dependency) for the comment builder, matching this repo's existing conventions.

## Global Constraints

- No new dependencies (Python stdlib only; Node built-in test runner only) - matches this repo's "no test framework dependency" convention (see root `CLAUDE.md`).
- Do not change `check_links.py`, `check_markdown.py`, or the `errors`/`warnings` sections of the PR comment - no evidence of the same duplication/volume problem there (YAGNI).
- Preserve the exact existing "does this table have a description before it" heuristic (blank or `|`-starting previous line) - only change *how many times* it fires per table, not what it decides.
- This is the `learning-room/` template only. Existing already-provisioned student repos are not touched by this plan (out of scope - see spec).

---

### Task 1: Fix per-row duplication in the table-description check

**Files:**
- Modify: `learning-room/.github/scripts/check_accessibility.py`
- Create: `learning-room/.github/scripts/__tests__/test_check_accessibility.py`

**Interfaces:**
- Consumes: nothing new.
- Produces: `check_accessibility(filepath)` (unchanged signature, already exists) now returns at most one `{'title': 'Table Description', ...}` finding per table instead of one per row.

- [ ] **Step 1: Write the failing tests**

Create `learning-room/.github/scripts/__tests__/test_check_accessibility.py`:

```python
#!/usr/bin/env python3
"""Tests for check_accessibility.py's table-description detection.

Run with: python learning-room/.github/scripts/__tests__/test_check_accessibility.py
"""

import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from check_accessibility import check_accessibility  # noqa: E402


def write_temp_md(content):
    fd, path = tempfile.mkstemp(suffix='.md')
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write(content)
    return path


class TableDescriptionDedupTests(unittest.TestCase):
    def test_single_table_produces_one_finding_regardless_of_row_count(self):
        rows = '\n'.join(f'| Row {i} | Value {i} |' for i in range(10))
        content = (
            'Some intro text.\n\n'
            '| Name | Value |\n'
            '|------|-------|\n'
            f'{rows}\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 1)

    def test_two_tables_produce_two_findings(self):
        content = (
            'Intro.\n\n'
            '| A | B |\n'
            '|---|---|\n'
            '| 1 | 2 |\n\n'
            'Middle text.\n\n'
            '| C | D |\n'
            '|---|---|\n'
            '| 3 | 4 |\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 2)

    def test_inline_pipe_outside_table_is_not_flagged(self):
        content = (
            'Use the command `a | b` to pipe output.\n\n'
            'Just a line with | in it but no real table.\n'
        )
        path = write_temp_md(content)
        try:
            issues = check_accessibility(path)
        finally:
            os.remove(path)
        table_findings = [i for i in issues if i.get('title') == 'Table Description']
        self.assertEqual(len(table_findings), 0)


if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `python learning-room/.github/scripts/__tests__/test_check_accessibility.py -v`

Expected: `test_single_table_produces_one_finding_regardless_of_row_count` and
`test_two_tables_produce_two_findings` FAIL (`AssertionError: 10 != 1` and
`AssertionError: 20 != 2` respectively - one finding per row today, not per
table). `test_inline_pipe_outside_table_is_not_flagged` passes already; that's
expected and fine.

- [ ] **Step 3: Fix the table-description detection**

In `learning-room/.github/scripts/check_accessibility.py`, add a module-level
regex and helper right after the imports (after line 15, before
`def check_accessibility(filepath):`):

```python
TABLE_SEPARATOR_RE = re.compile(r'^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$')


def _is_table_header(line, next_line):
    """A line is a GFM table header when it contains '|' and the next line is
    a valid separator row (e.g. '|---|---|'). Matching on the header plus its
    separator - not on every row that merely contains '|' - means a 10-row
    table produces one finding instead of ten (support#61)."""
    return '|' in line and bool(TABLE_SEPARATOR_RE.match(next_line))
```

Then replace the existing table-check block (currently):

```python
        # Check for tables without descriptions
        if '|' in line and any('|' in lines[i] for i in range(max(0, line_num-2), min(len(lines), line_num+2))):
            # Likely a table
            # Check if there's a caption or description before it
            if line_num > 1:
                prev_line = lines[line_num-2].strip()
                if prev_line and not prev_line.startswith('|'):
                    # There's a description
                    pass
                else:
                    # Could use a description
                    issues.append({
                        'file': filepath,
                        'line': line_num,
                        'type': 'suggestion',
                        'title': 'Table Description',
                        'message': 'Consider adding a brief description before tables explaining their content.',
                        'fix': 'Add one sentence before the table explaining what data it contains.'
                    })
```

with:

```python
        # Check for tables without descriptions. Only the header line is
        # inspected (paired with the separator row that follows it), so a
        # single table produces at most one finding regardless of row count.
        if line_num < len(lines) and _is_table_header(line, lines[line_num]):
            if line_num > 1:
                prev_line = lines[line_num - 2].strip()
                if not prev_line or prev_line.startswith('|'):
                    issues.append({
                        'file': filepath,
                        'line': line_num,
                        'type': 'suggestion',
                        'title': 'Table Description',
                        'message': 'Consider adding a brief description before tables explaining their content.',
                        'fix': 'Add one sentence before the table explaining what data it contains.'
                    })
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `python learning-room/.github/scripts/__tests__/test_check_accessibility.py -v`

Expected: all 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add learning-room/.github/scripts/check_accessibility.py learning-room/.github/scripts/__tests__/test_check_accessibility.py
git commit -m "fix(learning-room): flag each table once, not once per row

check_accessibility.py's table-description check fired on every table row
because it matched on any line containing '|'. A 10-row table produced 10
near-identical findings, which is what turned a student PR into a 100+ item
report (support#61). Key detection off the header+separator row pair instead."
```

---

### Task 2: Extract the comment builder and group accessibility findings by file

**Files:**
- Create: `learning-room/.github/scripts/build-content-validation-comment.js`
- Create: `learning-room/.github/scripts/__tests__/build-content-validation-comment.test.js`
- Modify: `learning-room/.github/workflows/content-validation.yml:66-163`

**Interfaces:**
- Consumes: nothing new.
- Produces: `buildContentValidationComment(feedback)` where `feedback` is
  `{ errors: [...], warnings: [...], accessibility: [...] }` (same shape
  `validation-feedback.json` already has), returning the full markdown comment
  string. `content-validation.yml`'s "Post validation feedback" step now
  requires this module instead of building the string inline.

- [ ] **Step 1: Write the failing tests**

Create `learning-room/.github/scripts/__tests__/build-content-validation-comment.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');

const { buildContentValidationComment } = require('../build-content-validation-comment');

test('reports all-clear when there is no feedback', () => {
  const comment = buildContentValidationComment({ errors: [], warnings: [], accessibility: [] });
  assert.match(comment, /All checks passed/);
});

test('groups accessibility findings by file under a heading with a summary count', () => {
  const feedback = {
    errors: [],
    warnings: [],
    accessibility: [
      { file: 'docs/a.md', line: 5, title: 'Table Description', message: 'm1', fix: 'f1' },
      { file: 'docs/a.md', line: 20, title: 'Table Description', message: 'm2', fix: 'f2' },
      { file: 'docs/b.md', line: 3, title: 'Table Description', message: 'm3', fix: 'f3' }
    ]
  };
  const comment = buildContentValidationComment(feedback);

  assert.match(comment, /\*\*3 suggestions across 2 files\.\*\*/);
  assert.match(comment, /#### docs\/a\.md/);
  assert.match(comment, /#### docs\/b\.md/);

  const aHeadingIndex = comment.indexOf('#### docs/a.md');
  const bHeadingIndex = comment.indexOf('#### docs/b.md');
  const m1Index = comment.indexOf('m1');
  const m2Index = comment.indexOf('m2');
  const m3Index = comment.indexOf('m3');
  assert.ok(aHeadingIndex < m1Index && m1Index < bHeadingIndex, 'a.md findings appear under its own heading');
  assert.ok(bHeadingIndex < m3Index, 'b.md findings appear under its own heading');
  assert.ok(m2Index < bHeadingIndex, 'both a.md findings stay grouped before the b.md heading');
});

test('singular wording when there is exactly one finding in one file', () => {
  const comment = buildContentValidationComment({
    errors: [],
    warnings: [],
    accessibility: [{ file: 'docs/a.md', line: 1, title: 'Table Description', message: 'm', fix: 'f' }]
  });
  assert.match(comment, /\*\*1 suggestion across 1 file\.\*\*/);
});

test('required fixes and suggestions sections still render unchanged', () => {
  const comment = buildContentValidationComment({
    errors: [{ file: 'docs/a.md', line: 2, message: 'bad thing', fix: 'fix it' }],
    warnings: [{ file: 'docs/b.md', message: 'minor thing' }],
    accessibility: []
  });
  assert.match(comment, /### Required Fixes/);
  assert.match(comment, /### Suggestions/);
  assert.doesNotMatch(comment, /### Accessibility/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test learning-room/.github/scripts/__tests__/build-content-validation-comment.test.js`

Expected: FAIL - `Cannot find module '../build-content-validation-comment'`.

- [ ] **Step 3: Create the comment-builder module**

Create `learning-room/.github/scripts/build-content-validation-comment.js`:

```js
/**
 * Build the "Content Validation Report" PR comment from checker feedback.
 */

function groupByFile(items) {
  const byFile = new Map();
  for (const item of items) {
    if (!byFile.has(item.file)) byFile.set(item.file, []);
    byFile.get(item.file).push(item);
  }
  return byFile;
}

function buildContentValidationComment(feedback) {
  const safeFeedback = feedback || { errors: [], warnings: [], accessibility: [] };
  const errors = safeFeedback.errors || [];
  const warnings = safeFeedback.warnings || [];
  const accessibility = safeFeedback.accessibility || [];

  let comment = '## Content Validation Report\n\n';

  if (!errors.length && !warnings.length && !accessibility.length) {
    comment += '**All checks passed.** Your content looks ready for review.\n\n';
  } else {
    if (errors.length) {
      comment += '### Required Fixes\n\n';
      errors.forEach(err => {
        comment += `- **${err.file}** (Line ${err.line || '?'}):\n`;
        comment += `  ${err.message}\n`;
        if (err.fix) {
          comment += `  **Fix:** ${err.fix}\n`;
        }
        comment += '\n';
      });
    }

    if (warnings.length) {
      comment += '### Suggestions\n\n';
      warnings.forEach(warn => {
        comment += `- **${warn.file}**:\n`;
        comment += `  ${warn.message}\n`;
      });
      comment += '\n';
    }

    if (accessibility.length) {
      const byFile = groupByFile(accessibility);
      const fileCount = byFile.size;
      const itemCount = accessibility.length;
      comment += '### Accessibility\n\n';
      comment += `**${itemCount} suggestion${itemCount === 1 ? '' : 's'} across ${fileCount} file${fileCount === 1 ? '' : 's'}.**\n\n`;
      for (const [file, items] of byFile) {
        comment += `#### ${file}\n\n`;
        items.forEach(item => {
          comment += `- **${item.title}** (Line ${item.line || '?'})\n`;
          comment += `  ${item.message}\n`;
          if (item.fix) {
            comment += `  **Fix:** ${item.fix}\n`;
          }
          comment += '\n';
        });
      }
    }
  }

  comment += '### Learning Resources\n\n';
  comment += '- [Markdown Reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/appendix-c-markdown-reference.md)\n';
  comment += '- [Accessibility Standards](https://github.com/Community-Access/git-going-with-github/blob/main/docs/appendix-m-accessibility-standards.md)\n';
  comment += '- [Working with Pull Requests](https://github.com/Community-Access/git-going-with-github/blob/main/docs/06-working-with-pull-requests.md)\n\n';
  comment += '---\n';
  comment += '*Automated validation by Learning Room. Questions? Check the guides or mention @facilitator.*';
  return comment;
}

module.exports = { buildContentValidationComment };
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test learning-room/.github/scripts/__tests__/build-content-validation-comment.test.js`

Expected: all 4 tests PASS.

- [ ] **Step 5: Wire the module into the workflow**

In `learning-room/.github/workflows/content-validation.yml`, replace the
"Post validation feedback" step's `script:` block (currently lines 70-132,
from `const fs = require('fs');` through the closing of the `comment +=`
chain) with:

```js
            const fs = require('fs');
            const { buildContentValidationComment } = require('./.github/scripts/build-content-validation-comment.js');

            let feedback = { errors: [], warnings: [], accessibility: [] };

            try {
              if (fs.existsSync('validation-feedback.json')) {
                const newFeedback = JSON.parse(fs.readFileSync('validation-feedback.json', 'utf8'));
                feedback = { ...feedback, ...newFeedback };
              }
            } catch (error) {
              console.error('Error reading validation feedback:', error);
            }

            const comment = buildContentValidationComment(feedback);
```

Leave the rest of the step (the `try { listComments / updateComment /
createComment } catch` block, currently lines 134-163) unchanged - it already
references the `comment` variable by name.

- [ ] **Step 6: Commit**

```bash
git add learning-room/.github/scripts/build-content-validation-comment.js learning-room/.github/scripts/__tests__/build-content-validation-comment.test.js learning-room/.github/workflows/content-validation.yml
git commit -m "fix(learning-room): group accessibility findings by file in PR comment

Extract the inline comment-building script into a plain, testable module
(matching the .github/scripts/validation-report.js pattern already used at
the repo root), and group accessibility findings under a per-file heading
with a summary count so a long report is navigable by heading for screen
reader users instead of one long flat list (support#61)."
```

## Self-Review Notes

- **Spec coverage:** Part A's root-cause fix (Task 1) and comment
  presentation fix (Task 2, grouping + count) are both covered. `errors`/
  `warnings` sections are explicitly left unchanged per the spec.
- **Type/name consistency:** `buildContentValidationComment` is the single
  exported name used in both the test file and the workflow `require()` call.
  `check_accessibility`'s public signature is unchanged.
- **No placeholders:** every step has complete, runnable code.
