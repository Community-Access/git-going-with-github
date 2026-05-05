const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function readWorkflow(relativePath) {
  const workflowPath = path.resolve(__dirname, '../../../', relativePath);
  return fs.readFileSync(workflowPath, 'utf8');
}

test('comment-responder uses lockfile-aware dependency install', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/pr-validation-bot.yml');

  assert.match(
    workflow,
    /comment-responder:[\s\S]*?- name: Install dependencies[\s\S]*?if \[ -f package-lock\.json \]; then[\s\S]*?npm ci[\s\S]*?else[\s\S]*?npm install[\s\S]*?fi/,
    'comment-responder job should install dependencies with lockfile fallback logic'
  );
});

test('pr-validation-bot workflow does not use raw npm ci command', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/pr-validation-bot.yml');

  assert.equal(
    /\brun:\s*npm ci\b/.test(workflow),
    false,
    'workflow should avoid raw npm ci to prevent failures when lockfile is missing'
  );
});

test('pr-validation-bot workflow enables concurrency cancellation', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/pr-validation-bot.yml');

  assert.match(
    workflow,
    /concurrency:[\s\S]*group:\s*pr-validation-\$\{\{[\s\S]*cancel-in-progress:\s*true/,
    'workflow should use concurrency cancellation to reduce duplicate noisy runs'
  );
});

test('comment-responder is keyword-gated on issue_comment events', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/pr-validation-bot.yml');

  assert.match(
    workflow,
    /comment-responder:[\s\S]*if:\s*>-[\s\S]*github\.event_name == 'issue_comment'[\s\S]*contains\(github\.event\.comment\.body, '@bot help'\)[\s\S]*contains\(github\.event\.comment\.body, 'merge conflict'\)/,
    'comment-responder should only run for relevant help keywords'
  );
});

test('comment-responder ignores bot-authored comments', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/pr-validation-bot.yml');

  assert.match(
    workflow,
    /comment-responder:[\s\S]*github\.event\.comment\.user\.type != 'Bot'/,
    'comment-responder should not react to comments authored by bots'
  );
});

test('content-validation workflow has concurrency cancellation and timeout', () => {
  const workflow = readWorkflow('learning-room/.github/workflows/content-validation.yml');

  assert.match(
    workflow,
    /concurrency:[\s\S]*group:\s*content-validation-\$\{\{[\s\S]*cancel-in-progress:\s*true/,
    'content-validation should cancel obsolete in-progress runs for the same PR'
  );
  assert.match(
    workflow,
    /validate-content:[\s\S]*timeout-minutes:\s*15/,
    'content-validation job should enforce a timeout'
  );
});

test('student and skills progression workflows have concurrency cancellation', () => {
  const studentWorkflow = readWorkflow('learning-room/.github/workflows/student-progression.yml');
  const skillsWorkflow = readWorkflow('learning-room/.github/workflows/skills-progression.yml');

  assert.match(
    studentWorkflow,
    /concurrency:[\s\S]*group:\s*student-progression-\$\{\{[\s\S]*cancel-in-progress:\s*true/,
    'student progression should cancel stale duplicate runs'
  );
  assert.match(
    skillsWorkflow,
    /concurrency:[\s\S]*group:\s*skills-progression-\$\{\{[\s\S]*cancel-in-progress:\s*true/,
    'skills progression should cancel stale duplicate runs'
  );
});
