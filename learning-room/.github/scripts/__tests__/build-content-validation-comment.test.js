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
