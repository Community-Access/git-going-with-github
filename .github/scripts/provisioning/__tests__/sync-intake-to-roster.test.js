const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseIntakeIssue,
  syncIntakeToRoster
} = require('../sync-intake-to-roster');

function intakeIssue({ number = 1, login = 'octocat', captured = '2026-06-05T12:00:00.000Z', title } = {}) {
  return {
    number,
    title: title || `[ENROLL-INTAKE] Test Person ${number}`,
    created_at: '2026-06-05T11:59:00Z',
    body: [
      '## Classroom Enrollment Intake',
      '',
      '- Public issue: https://github.com/Community-Access/git-going-with-github/issues/42',
      `- Submitted by: @${login}`,
      '- Full Name: Test Person',
      '- Email Address: test@example.com',
      '',
      `- Captured at: ${captured}`
    ].join('\n')
  };
}

test('parseIntakeIssue extracts handle and registration time', () => {
  const parsed = parseIntakeIssue(intakeIssue({ login: 'Some-User' }));
  assert.equal(parsed.github_handle, 'Some-User');
  assert.equal(parsed.registered_at, '2026-06-05T12:00:00.000Z');
});

test('parseIntakeIssue falls back to issue created_at and rejects non-intake issues', () => {
  const noCapture = intakeIssue();
  noCapture.body = noCapture.body.replace(/- Captured at: .*/, '');
  assert.equal(parseIntakeIssue(noCapture).registered_at, '2026-06-05T11:59:00Z');

  assert.equal(parseIntakeIssue({ title: 'Some other issue', body: '' }), null);
  const badHandle = intakeIssue();
  badHandle.body = badHandle.body.replace(/@octocat/, '@-bad-handle-');
  assert.equal(parseIntakeIssue(badHandle), null);
});

test('syncIntakeToRoster adds pending learners and the cohort, idempotently', () => {
  const roster = { version: 1, cohorts: [], learners: [] };
  const issues = [
    intakeIssue({ number: 1, login: 'alice' }),
    intakeIssue({ number: 2, login: 'bob' }),
    intakeIssue({ number: 3, login: 'alice' }) // duplicate submission
  ];
  const result = syncIntakeToRoster({ roster, intakeIssues: issues, cohortId: 'self-paced-2026' });

  assert.deepEqual(result.added.sort(), ['alice', 'bob']);
  assert.equal(result.roster.learners.length, 2);
  assert.ok(result.roster.learners.every((l) => l.provision_state === 'pending'));
  assert.ok(result.roster.cohorts.some((c) => c.cohort_id === 'self-paced-2026'));

  // Second run adds nothing.
  const again = syncIntakeToRoster({
    roster: result.roster,
    intakeIssues: issues,
    cohortId: 'self-paced-2026'
  });
  assert.deepEqual(again.added, []);
  assert.equal(again.roster.learners.length, 2);
});

test('syncIntakeToRoster never resets an already-provisioned learner', () => {
  const roster = {
    version: 1,
    cohorts: [{ cohort_id: 'self-paced-2026', label: 'Self-paced' }],
    learners: [
      {
        github_handle: 'alice',
        cohort_id: 'self-paced-2026',
        path: 'day1-day2',
        learning_room_repo: 'Community-Access/learning-room-self-paced-2026-alice',
        provision_state: 'provisioned',
        status: 'active-day1',
        registered_at: '2026-06-01T00:00:00Z',
        last_signal_at: null,
        notes: ''
      }
    ]
  };
  const result = syncIntakeToRoster({
    roster,
    intakeIssues: [intakeIssue({ login: 'alice' })],
    cohortId: 'self-paced-2026'
  });
  assert.deepEqual(result.added, []);
  assert.equal(result.roster.learners[0].provision_state, 'provisioned');
  assert.equal(
    result.roster.learners[0].learning_room_repo,
    'Community-Access/learning-room-self-paced-2026-alice'
  );
});

test('syncIntakeToRoster requires a cohort id', () => {
  assert.throws(
    () => syncIntakeToRoster({ roster: { version: 1, cohorts: [], learners: [] }, intakeIssues: [] }),
    /cohortId/
  );
});
