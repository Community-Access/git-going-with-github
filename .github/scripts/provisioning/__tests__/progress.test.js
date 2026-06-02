const test = require('node:test');
const assert = require('node:assert/strict');

const {
  deriveStatus,
  isDay2Eligible,
  completedChallenges,
  closedIssueRefs,
  challengeNumberFromTitle,
  hasTextSignal
} = require('../progress');

test('awaiting-ack when no signals present', () => {
  const { status } = deriveStatus({ comments: [], labels: [], issues: [] });
  assert.equal(status, 'awaiting-ack');
});

test('ack text signal moves to active-day1', () => {
  const { status, evidence } = deriveStatus({ comments: [{ body: 'ack' }] });
  assert.equal(status, 'active-day1');
  assert.equal(evidence.acked, true);
});

test('ack matches as a standalone token only', () => {
  assert.equal(hasTextSignal([{ body: 'I acknowledge the rules' }], 'ack'), false);
  assert.equal(hasTextSignal([{ body: 'ack!' }], 'ack'), true);
  assert.equal(hasTextSignal([{ body: 'Ready: ack' }], 'ack'), true);
});

test('day1-complete signal moves to day1-complete', () => {
  const { status } = deriveStatus({ comments: [{ body: 'day1-complete' }] });
  assert.equal(status, 'day1-complete');
});

test('day2-only learners are day1-complete by default', () => {
  const { status } = deriveStatus({ path: 'day2-only', comments: [] });
  assert.equal(status, 'day1-complete');
});

test('day2-released label takes precedence', () => {
  const { status } = deriveStatus({
    comments: [{ body: 'day1-complete' }],
    labels: ['day2-released']
  });
  assert.equal(status, 'day2-released');
});

test('needs-info label overrides everything', () => {
  const { status } = deriveStatus({
    comments: [{ body: 'day1-complete' }],
    labels: [{ name: 'needs-info' }, 'day2-released']
  });
  assert.equal(status, 'needs-info');
});

test('completed challenges from closed issues, deduped and sorted', () => {
  const issues = [
    { title: 'Challenge 2: file an issue', state: 'closed' },
    { title: 'Challenge 1: find your way', state: 'closed' },
    { title: 'Challenge 1: find your way', state: 'closed' },
    { title: 'Challenge 3: branch out', state: 'open' }
  ];
  assert.deepEqual(completedChallenges(issues), [1, 2]);
});

test('a closed challenge makes a silent learner active-day1', () => {
  const { status } = deriveStatus({
    issues: [{ title: 'Challenge 1', state: 'closed' }]
  });
  assert.equal(status, 'active-day1');
});

test('closedIssueRefs parses closing keywords', () => {
  assert.deepEqual(closedIssueRefs('This closes #12 and fixes #34, resolves #12'), [12, 34]);
});

test('challengeNumberFromTitle extracts the number', () => {
  assert.equal(challengeNumberFromTitle('Challenge 10: capstone'), 10);
  assert.equal(challengeNumberFromTitle('No number here'), null);
});

test('isDay2Eligible true only at day1-complete', () => {
  assert.equal(isDay2Eligible({ comments: [{ body: 'day1-complete' }] }), true);
  assert.equal(isDay2Eligible({ comments: [{ body: 'ack' }] }), false);
  assert.equal(isDay2Eligible({ labels: ['day2-released'] }), false);
});
