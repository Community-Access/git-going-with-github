// Regression tests for peer simulation seeding in the student-facing
// challenge progression script. Challenges 1-13 reference a seeded
// "Peer Simulation: Welcome Link Needs Context" issue and a
// "Peer Simulation: Improve contribution guidance" pull request. These were
// originally created by scripts/classroom/Seed-PeerSimulation.ps1, which was
// deleted with GitHub Classroom, leaving provisioned rooms without the
// artifacts (support issue Community-Access/support#58, 2026-07-04). The
// progression script must seed them idempotently on every run.
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

const {
  ensurePeerSimulationArtifacts,
  ensureLabel,
  ensurePeerSimulationBranch,
  ensurePeerSimulationPullRequest
} = require('../../../learning-room/.github/scripts/challenge-progression');

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
    // Defaults that describe an empty, freshly provisioned room.
    if (method === 'GET' && route.startsWith('/repos/org/room/issues?')) {
      return [];
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/pulls?')) {
      return [];
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/git/ref/heads/peer-simulation')) {
      throw new Error('GET failed: 404 Not Found');
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/git/ref/heads/main')) {
      return { object: { sha: 'abc123' } };
    }
    if (method === 'GET' && route.startsWith('/repos/org/room/contents/')) {
      throw new Error('GET failed: 404 Not Found');
    }
    if (method === 'POST' && route === '/repos/org/room/issues') {
      return { number: 42, html_url: 'https://example.test/issue/42' };
    }
    if (method === 'POST' && route === '/repos/org/room/pulls') {
      return { number: 7, html_url: 'https://example.test/pull/7' };
    }
    return null;
  };
  return { calls, request };
}

test('seeds labels, both issues, branch, file, and PR in an empty room', async () => {
  const { calls, request } = fakeRequest();

  await ensurePeerSimulationArtifacts(request);

  const posts = calls.filter((c) => c.method === 'POST');
  const labelPosts = posts.filter((c) => c.route === '/repos/org/room/labels');
  assert.equal(labelPosts.length, 4);

  const issuePosts = posts.filter((c) => c.route === '/repos/org/room/issues');
  assert.deepEqual(
    issuePosts.map((c) => c.body.title),
    [
      'Peer Simulation: Welcome Link Needs Context',
      'Peer Simulation: Review Request for Contribution Guidance'
    ]
  );
  assert.ok(issuePosts[0].body.labels.includes('peer-simulation'));

  const refPosts = posts.filter((c) => c.route === '/repos/org/room/git/refs');
  assert.equal(refPosts.length, 1);
  assert.equal(refPosts[0].body.ref, 'refs/heads/peer-simulation/review-pr');
  assert.equal(refPosts[0].body.sha, 'abc123');

  const filePuts = calls.filter((c) => c.method === 'PUT');
  assert.equal(filePuts.length, 1);
  assert.ok(filePuts[0].route.includes('docs/samples/peer-review-practice.md'));
  assert.equal(filePuts[0].body.branch, 'peer-simulation/review-pr');

  const prPosts = posts.filter((c) => c.route === '/repos/org/room/pulls');
  assert.equal(prPosts.length, 1);
  assert.equal(prPosts[0].body.title, 'Peer Simulation: Improve contribution guidance');
  assert.equal(prPosts[0].body.head, 'peer-simulation/review-pr');
  assert.equal(prPosts[0].body.base, 'main');
  assert.match(prPosts[0].body.body, /#42/);
});

test('is idempotent: creates nothing when the artifacts already exist', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/issues?': () => [
      { number: 5, title: 'Peer Simulation: Welcome Link Needs Context' },
      { number: 6, title: 'Peer Simulation: Review Request for Contribution Guidance' }
    ],
    'GET /repos/org/room/git/ref/heads/peer-simulation': () => ({ object: { sha: 'abc123' } }),
    'GET /repos/org/room/contents/': () => ({ sha: 'filesha' }),
    'GET /repos/org/room/pulls?': () => [{ number: 7 }]
  });

  await ensurePeerSimulationArtifacts(request);

  const writes = calls.filter(
    (c) => (c.method === 'POST' || c.method === 'PUT') && c.route !== '/repos/org/room/labels'
  );
  assert.deepEqual(writes, []);
});

test('never throws: progression survives a seeding failure', async () => {
  const request = async () => {
    throw new Error('boom: no network');
  };

  await assert.doesNotReject(ensurePeerSimulationArtifacts(request));
});

test('ensureLabel tolerates a label that already exists', async () => {
  const request = async () => {
    throw new Error('POST /repos/org/room/labels failed: 422 already_exists');
  };

  await assert.doesNotReject(
    ensureLabel({ name: 'peer-simulation', color: '5319e7', description: 'x' }, request)
  );
});

test('branch seeding skips the commit when the practice file is present', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/git/ref/heads/peer-simulation': () => ({ object: { sha: 'abc123' } }),
    'GET /repos/org/room/contents/': () => ({ sha: 'filesha' })
  });

  await ensurePeerSimulationBranch(request);

  assert.deepEqual(calls.filter((c) => c.method !== 'GET'), []);
});

test('PR seeding skips creation when a PR for the branch exists in any state', async () => {
  const { calls, request } = fakeRequest({
    'GET /repos/org/room/pulls?': () => [{ number: 7, state: 'closed' }]
  });

  await ensurePeerSimulationPullRequest(6, request);

  assert.deepEqual(calls.filter((c) => c.method === 'POST'), []);
});
