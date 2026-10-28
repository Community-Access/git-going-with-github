const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { checkMarkdown } = require('../../../scripts/check-docs-accessibility');

const repoRoot = path.resolve(__dirname, '../../../');

function rules(text, options) {
  return checkMarkdown(text, options).map((f) => f.rule);
}

test('a clean page has no findings', () => {
  const page = [
    '# Title',
    '',
    '## Section',
    '',
    'Read the [Contributing Guide](CONTRIBUTING.md).',
    '',
    '| Action | Key |',
    '|---|---|',
    '| Search | `/` |',
    '',
    '```bash',
    'npm run build:html',
    '```'
  ].join('\n');
  assert.deepEqual(rules(page), []);
});

test('heading rules: one H1 and no skipped levels', () => {
  assert.deepEqual(rules('## No title'), ['heading-single-h1']);
  assert.deepEqual(rules('# One\n\n# Two'), ['heading-single-h1']);
  assert.deepEqual(rules('# Title\n\n### Skipped'), ['heading-increment']);
  assert.deepEqual(rules('# Title\n\n## A\n\n### B\n\n## C'), []);
});

test('wiki fragments are exempt from the H1 rule', () => {
  assert.deepEqual(rules('## Sidebar', { fragment: true }), []);
});

test('headings, links and emoji inside code are ignored', () => {
  const page = '# Title\n\n```markdown\n#### not a heading [here](x) \u{1F680}\n```\n\nUse `[here](x)` as a bad example.';
  assert.deepEqual(rules(page), []);
});

test('HTML comments are ignored', () => {
  assert.deepEqual(rules('# Title\n\n<!-- [click here](x) -->'), []);
});

test('images need real alternative text', () => {
  assert.deepEqual(rules('# T\n\n![](a.png)'), ['image-alt']);
  assert.deepEqual(rules('# T\n\n![Screenshot](a.png)'), ['image-alt']);
  assert.deepEqual(rules('# T\n\n<img src="a.png">'), ['image-alt']);
  assert.deepEqual(rules('# T\n\n<img src="a.png" alt="">'), []);
  assert.deepEqual(rules('# T\n\n![The new issue form](a.png)'), []);
});

test('ambiguous link text is reported', () => {
  assert.deepEqual(rules('# T\n\nClick [here](x).'), ['link-text']);
  assert.deepEqual(rules('# T\n\n[Read more.](x)'), ['link-text']);
  assert.deepEqual(rules('# T\n\n<a href="x">click here</a>'), ['link-text']);
  assert.deepEqual(rules('# T\n\n[Read the setup guide](x)'), []);
});

test('table headers must not be empty; inline code counts as text', () => {
  assert.deepEqual(rules('# T\n\n| | |\n|---|---|\n| a | b |'), ['table-empty-header']);
  assert.deepEqual(rules('# T\n\n| `flag` | Result |\n| --- | --- |\n| a | b |'), []);
});

test('code fences need a language; closing fences are not counted', () => {
  assert.deepEqual(rules('# T\n\n```\noutput\n```'), ['code-fence-language']);
  assert.deepEqual(rules('# T\n\n````markdown\n```\ninner\n```\n````'), []);
});

test('emoji are reported, copyright and trademark signs are not', () => {
  assert.deepEqual(rules('# T\n\nDone \u2705'), ['emoji']);
  assert.deepEqual(rules('# T\n\n\u00a9 Community Access, GitHub\u2122'), []);
});

test('the repository has no findings beyond its recorded baseline', () => {
  const env = { ...process.env };
  const output = execFileSync(process.execPath, [path.join(repoRoot, 'scripts/check-docs-accessibility.js')], {
    cwd: repoRoot,
    env,
    encoding: 'utf8'
  });
  assert.match(output, /No new accessibility findings/);
});

test('the baseline only lists files that exist', () => {
  const baseline = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/docs-accessibility-baseline.json'), 'utf8'));
  for (const rel of Object.keys(baseline.files)) {
    assert.ok(fs.existsSync(path.join(repoRoot, rel)), `${rel} is in the baseline but does not exist`);
  }
});
