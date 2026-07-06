const test = require('node:test');
const assert = require('node:assert/strict');

const {
  emptyRoster,
  parseRoster,
  upsertLearner,
  serializeRoster,
  findLearner,
  entriesToProvision,
  isValidHandle,
  normalizeHandle,
  learnerKey,
  publicView,
  validateLearner
} = require('../roster');

test('parseRoster returns empty roster for empty input', () => {
  const r = parseRoster('');
  assert.equal(r.version, 1);
  assert.deepEqual(r.learners, []);
});

test('parseRoster validates and rejects bad version', () => {
  assert.throws(() => parseRoster(JSON.stringify({ version: 2, learners: [] })), /version/);
});

test('parseRoster rejects duplicate learner keys', () => {
  const data = {
    version: 1,
    learners: [
      { github_handle: 'alice', cohort_id: 'c1', path: 'day1-day2', provision_state: 'pending', status: 'awaiting-ack' },
      { github_handle: 'Alice', cohort_id: 'c1', path: 'day1-day2', provision_state: 'pending', status: 'awaiting-ack' }
    ]
  };
  assert.throws(() => parseRoster(JSON.stringify(data)), /Duplicate/);
});

test('isValidHandle accepts valid and rejects invalid handles', () => {
  assert.ok(isValidHandle('octo-cat'));
  assert.ok(isValidHandle('@octocat'));
  assert.equal(isValidHandle('-bad'), false);
  assert.equal(isValidHandle('bad-'), false);
  assert.equal(isValidHandle('two--hyphens'), false);
  assert.equal(isValidHandle(''), false);
});

test('normalizeHandle strips @ and lowercases', () => {
  assert.equal(normalizeHandle('@OctoCat'), 'octocat');
});

test('learnerKey is case-insensitive on handle', () => {
  assert.equal(learnerKey('Alice', 'c1'), learnerKey('alice', 'c1'));
});

test('upsertLearner inserts then updates without mutating input', () => {
  const r0 = emptyRoster();
  const r1 = upsertLearner(r0, { github_handle: 'alice', cohort_id: 'c1' });
  assert.equal(r0.learners.length, 0);
  assert.equal(r1.learners.length, 1);
  assert.equal(r1.learners[0].provision_state, 'pending');

  const r2 = upsertLearner(r1, { github_handle: 'alice', cohort_id: 'c1', provision_state: 'provisioned' });
  assert.equal(r2.learners.length, 1);
  assert.equal(r2.learners[0].provision_state, 'provisioned');
});

test('upsertLearner rejects invalid handle', () => {
  assert.throws(() => upsertLearner(emptyRoster(), { github_handle: '-bad', cohort_id: 'c1' }), /handle/);
});

test('upsertLearner persists enrollment_repo and enrollment_issue_number', () => {
  const roster = emptyRoster();
  const next = upsertLearner(roster, {
    github_handle: 'alice',
    cohort_id: 'c1',
    enrollment_repo: 'Community-Access/git-going-with-github',
    enrollment_issue_number: 250
  });
  assert.equal(next.learners[0].enrollment_repo, 'Community-Access/git-going-with-github');
  assert.equal(next.learners[0].enrollment_issue_number, 250);
});

test('upsertLearner defaults enrollment fields to null when omitted', () => {
  const roster = emptyRoster();
  const next = upsertLearner(roster, { github_handle: 'bob', cohort_id: 'c1' });
  assert.equal(next.learners[0].enrollment_repo, null);
  assert.equal(next.learners[0].enrollment_issue_number, null);
});

test('findLearner locates by key', () => {
  const r = upsertLearner(emptyRoster(), { github_handle: 'Bob', cohort_id: 'c2' });
  assert.ok(findLearner(r, 'bob', 'c2'));
  assert.equal(findLearner(r, 'bob', 'cX'), null);
});

test('entriesToProvision returns pending and failed only', () => {
  let r = emptyRoster();
  r = upsertLearner(r, { github_handle: 'a', cohort_id: 'c', provision_state: 'pending' });
  r = upsertLearner(r, { github_handle: 'b', cohort_id: 'c', provision_state: 'failed' });
  r = upsertLearner(r, { github_handle: 'c', cohort_id: 'c', provision_state: 'provisioned' });
  const targets = entriesToProvision(r);
  assert.equal(targets.length, 2);
});

test('serializeRoster sorts learners and stamps generated_at', () => {
  let r = emptyRoster();
  r = upsertLearner(r, { github_handle: 'zed', cohort_id: 'c1' });
  r = upsertLearner(r, { github_handle: 'amy', cohort_id: 'c1' });
  const out = serializeRoster(r, { now: new Date('2026-01-01T00:00:00Z') });
  const parsed = JSON.parse(out);
  assert.equal(parsed.learners[0].github_handle, 'amy');
  assert.equal(parsed.generated_at, '2026-01-01T00:00:00.000Z');
  assert.ok(out.endsWith('\n'));
});

test('publicView omits notes and extra fields', () => {
  let r = emptyRoster();
  r = upsertLearner(r, { github_handle: 'a', cohort_id: 'c', notes: 'secret note' });
  const view = publicView(r);
  assert.equal(view.learners[0].notes, undefined);
  assert.equal(view.learners[0].github_handle, 'a');
});

test('validateLearner reports each problem', () => {
  const problems = validateLearner({ github_handle: '-x', cohort_id: '', path: 'nope', provision_state: 'nope', status: 'nope' });
  assert.ok(problems.length >= 4);
});
