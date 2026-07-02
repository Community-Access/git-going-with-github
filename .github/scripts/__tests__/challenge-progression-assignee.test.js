// Regression tests for the assignee handling in the student-facing challenge
// progression script. At provisioning time the learner's collaborator
// invitation is still pending, so they exist as a GitHub user but cannot yet
// be assigned issues in the repository; the script must degrade to an
// unassigned issue instead of failing with HTTP 422 (see learning rooms for
// waphi and accesswatch-student on 2026-07-02).
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

process.env.GITHUB_TOKEN = 'test-token';
process.env.GITHUB_REPOSITORY = 'org/room';
process.env.START_CHALLENGE = '';
process.env.GITHUB_EVENT_NAME = '';
process.env.CLOSED_ISSUE_TITLE = '';

// The script resolves its issue-template directory from the working
// directory, so requiring it must happen from inside learning-room/.
process.chdir(path.join(__dirname, '..', '..', '..', 'learning-room'));

const { resolveValidAssignee } = require('../../../learning-room/.github/scripts/challenge-progression');

test('validates assignability in the repository, not global user existence', async () => {
  const routes = [];
  const request = async (route) => {
    routes.push(route);
    return null;
  };

  const result = await resolveValidAssignee('waphi', request);

  assert.equal(result, 'waphi');
  assert.deepEqual(routes, ['/repos/org/room/assignees/waphi']);
});

test('returns null when the user cannot be assigned yet (pending invitation)', async () => {
  const request = async () => {
    throw new Error('GET /repos/org/room/assignees/waphi failed: 404');
  };

  assert.equal(await resolveValidAssignee('waphi', request), null);
});

test('returns null for a missing actor without calling the API', async () => {
  let called = false;
  const request = async () => {
    called = true;
  };

  assert.equal(await resolveValidAssignee('', request), null);
  assert.equal(called, false);
});
