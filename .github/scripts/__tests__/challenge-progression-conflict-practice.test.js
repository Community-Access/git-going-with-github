// Regression tests for Challenge 7 merge conflict seeding. The previous
// implementation replaced a `[TODO]` placeholder in docs/welcome.md on main,
// but that placeholder is always resolved back in Challenge 1, long before
// Challenge 7 opens - so the seed silently skipped every time and no student
// ever saw a real conflict (Community-Access/support#61, 2026-07-05). The
// fix opens a dedicated branch and commits a different edit to the same line
// on that branch and on main, then opens a PR between them, so a genuine
// conflict exists regardless of what any earlier challenge did.
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

const { ensureMergeConflictPractice } = require('../../../learning-room/.github/scripts/challenge-progression');

const WELCOME_CONTENT = 'Welcome to the Learning Room!\n';
const WELCOME_SHA = 'welcome-sha';

function fakeRequest(overrides = {}) {
  const calls = [];
  const request = async (route, options = {}) => {
    const method = options.method || 'GET';
    calls.push({ method, route, body: options.body });
    for (const [pattern, handler] of Object.entries(overrides)) {
      const [overrideMethod, routePrefix] = pattern.split(' ');
      if (method === overrideMethod && route.startsWith(routePrefix)) {
        return handler({ route, options });
      }
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/pulls?')) {
      return [];
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/git/ref/heads/main')) {
      return { object: { sha: 'main-sha' } };
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/contents/docs/welcome.md')) {
      return { content: Buffer.from(WELCOME_CONTENT).toString('base64'), sha: WELCOME_SHA };
    }
    if (method === 'POST' && route === '/repos/org/room/pulls') {
      return { number: 99, html_url: 'https://example.test/pull/99' };
    }
    if (method === 'GET' && route === '/repos/org/room/pulls/99') {
      return { mergeable_state: 'dirty' };
    }
    return null;
  };
  return { calls, request };
}

test('opens a branch, two conflicting edits, a PR, and comments the issue', async () => {
  const { calls, request } = fakeRequest();

  await ensureMergeConflictPractice(11, request, 0);

  const refPosts = calls.filter((c) => c.method === 'POST' && c.route === '/repos/org/room/git/refs');
  assert.equal(refPosts.length, 1);
  assert.equal(refPosts[0].body.ref, 'refs/heads/challenge-7/conflict-practice');
  assert.equal(refPosts[0].body.sha, 'main-sha');

  const filePuts = calls.filter((c) => c.method === 'PUT');
  assert.equal(filePuts.length, 2);
  assert.equal(filePuts[0].body.branch, 'challenge-7/conflict-practice');
  assert.equal(filePuts[1].body.branch, 'main');
  const branchText = Buffer.from(filePuts[0].body.content, 'base64').toString('utf8');
  const mainText = Buffer.from(filePuts[1].body.content, 'base64').toString('utf8');
  assert.notEqual(branchText, mainText);
  assert.match(branchText, /practice branch/);
  assert.match(mainText, /directly on main/);

  const prPosts = calls.filter((c) => c.method === 'POST' && c.route === '/repos/org/room/pulls');
  assert.equal(prPosts.length, 1);
  assert.equal(prPosts[0].body.head, 'challenge-7/conflict-practice');
  assert.equal(prPosts[0].body.base, 'main');
  assert.match(prPosts[0].body.body, /#11/);

  const issueComments = calls.filter((c) => c.method === 'POST' && c.route === '/repos/org/room/issues/11/comments');
  assert.equal(issueComments.length, 1);
  assert.match(issueComments[0].body.body, /practice PR is ready/);
});

test('is idempotent: does nothing when a practice PR already exists in any state', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/pulls?': () => [{ number: 5, state: 'closed' }]
  });

  await ensureMergeConflictPractice(11, request, 0);

  const writes = calls.filter((c) => c.method === 'POST' || c.method === 'PUT');
  assert.deepEqual(writes, [
    { method: 'POST', route: '/repos/org/room/issues/11/comments', body: { body: 'Your merge conflict practice PR is ready: #5. Open that PR (not any other pull request you may already have open) and follow Step 1 below.' } }
  ]);
});

test('is idempotent: skips when the conflict anchor is already on main', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/contents/docs/welcome.md': () => ({
      content: Buffer.from(`${WELCOME_CONTENT}\n<!-- challenge-7-conflict-anchor -->\n`).toString('base64'),
      sha: WELCOME_SHA
    })
  });

  await ensureMergeConflictPractice(11, request, 0);

  const writes = calls.filter((c) => c.method === 'POST' || c.method === 'PUT');
  assert.deepEqual(writes, []);
});

test('falls back to looking up the issue when no issue number is passed', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/issues?': () => [
      { number: 21, title: 'Challenge 7: Survive a Merge Conflict (@student)' }
    ]
  });

  await ensureMergeConflictPractice(null, request, 0);

  const issueComments = calls.filter((c) => c.method === 'POST' && c.route === '/repos/org/room/issues/21/comments');
  assert.equal(issueComments.length, 1);
});

test('never throws: progression survives a seeding failure', async () => {
  const request = async () => {
    throw new Error('boom: no network');
  };

  await assert.doesNotReject(ensureMergeConflictPractice(11, request, 0));
});

test('falls back to manual instructions when the practice PR never registers as conflicting', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/pulls/99': () => ({ mergeable_state: 'clean' })
  });

  await ensureMergeConflictPractice(11, request, 0);

  const successComments = calls.filter(
    (c) => c.method === 'POST' && c.route === '/repos/org/room/issues/11/comments' && /practice PR is ready/.test(c.body.body)
  );
  const fallbackComments = calls.filter(
    (c) => c.method === 'POST' && c.route === '/repos/org/room/issues/11/comments' && /did not register a conflict/.test(c.body.body)
  );
  assert.equal(successComments.length, 0);
  assert.equal(fallbackComments.length, 1);
  assert.match(fallbackComments[0].body.body, /#99/);
  assert.match(fallbackComments[0].body.body, /main/);
});
