const test = require('node:test');
const assert = require('node:assert/strict');

const { provisionRoster, defaultRepoName, missingWorkflows, isSecondaryRateLimit } = require('../provision-core');
const { upsertLearner, emptyRoster } = require('../roster');

const REQUIRED = ['pr-validation-bot.yml', 'student-progression.yml', 'content-validation.yml'];

function makeClient(overrides = {}) {
  const state = {
    repos: new Map(), // repoName -> { workflows: [...] }
    calls: { create: 0, collaborator: 0, list: 0 }
  };
  const client = {
    async repoExists({ repo }) {
      return state.repos.has(repo);
    },
    async createFromTemplate({ repo }) {
      state.calls.create += 1;
      state.repos.set(repo, { workflows: [...REQUIRED] });
      return { full_name: repo };
    },
    async ensureCollaborator() {
      state.calls.collaborator += 1;
      return { status: 'invited' };
    },
    async listWorkflowPaths({ repo }) {
      state.calls.list += 1;
      const r = state.repos.get(repo);
      return r ? r.workflows : [];
    },
    async getDefaultBranchSha() {
      return 'abc123';
    },
    ...overrides
  };
  return { client, state };
}

const noSleep = async () => {};
const config = {
  studentOwner: 'Community-Access',
  templateOwner: 'Community-Access',
  templateRepo: 'learning-room-template',
  requiredWorkflows: REQUIRED,
  delayMs: 0
};

function rosterWith(...learners) {
  let r = emptyRoster();
  for (const l of learners) r = upsertLearner(r, l);
  return r;
}

test('defaultRepoName is deterministic and sanitized', () => {
  assert.equal(defaultRepoName('Octo.Cat', 'Spring 2026'), 'learning-room-spring-2026-octo-cat');
});

test('missingWorkflows is case-insensitive', () => {
  assert.deepEqual(missingWorkflows(['A.yml', 'B.yml'], ['a.yml']), ['B.yml']);
});

test('provisions a new learner end to end', async () => {
  const { client, state } = makeClient();
  const roster = rosterWith({ github_handle: 'alice', cohort_id: 'c1' });
  const { roster: out, log, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(out.learners[0].learning_room_repo, 'Community-Access/learning-room-c1-alice');
  assert.equal(state.calls.create, 1);
  assert.equal(state.calls.collaborator, 1);
  assert.equal(summary.created, 1);
  assert.equal(log[0].result, 'created');
  assert.equal(log[0].template_sha, 'abc123');
});

test('idempotent: existing complete repo is already-exists, no create', async () => {
  const { client, state } = makeClient();
  state.repos.set('learning-room-c1-alice', { workflows: [...REQUIRED] });
  const roster = rosterWith({ github_handle: 'alice', cohort_id: 'c1' });
  const { roster: out, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(state.calls.create, 0);
  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(summary.already_exists, 1);
});

test('heals an incomplete repo when seedContent is available', async () => {
  let seeded = false;
  const { client, state } = makeClient({
    async seedContent({ repo }) {
      seeded = true;
      state.repos.get(repo).workflows = [...REQUIRED];
    }
  });
  state.repos.set('learning-room-c1-bob', { workflows: ['pr-validation-bot.yml'] });
  const roster = rosterWith({ github_handle: 'bob', cohort_id: 'c1' });
  const { roster: out, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.ok(seeded);
  assert.equal(out.learners[0].provision_state, 'healed');
  assert.equal(summary.healed, 1);
});

test('waits for asynchronous template copy before verifying a fresh repo', async () => {
  // GitHub's generate-from-template API returns before the content copy
  // finishes; verification must wait instead of marking the learner failed.
  const { client, state } = makeClient();
  client.createFromTemplate = async ({ repo }) => {
    state.calls.create += 1;
    state.repos.set(repo, { workflows: [] });
    return { full_name: repo };
  };
  let listCalls = 0;
  client.listWorkflowPaths = async ({ repo }) => {
    listCalls += 1;
    if (listCalls >= 3) state.repos.get(repo).workflows = [...REQUIRED];
    return state.repos.get(repo).workflows;
  };
  let slept = 0;
  const countingSleep = async () => { slept += 1; };

  const roster = rosterWith({ github_handle: 'dana', cohort_id: 'c1' });
  const { roster: out, summary } = await provisionRoster({
    roster,
    client,
    config,
    sleep: countingSleep
  });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(summary.created, 1);
  assert.equal(summary.error, 0);
  assert.ok(slept >= 1, 'should have waited between verification attempts');
});

test('still fails when content never arrives after creation', async () => {
  const { client, state } = makeClient();
  client.createFromTemplate = async ({ repo }) => {
    state.calls.create += 1;
    state.repos.set(repo, { workflows: [] });
    return { full_name: repo };
  };
  const roster = rosterWith({ github_handle: 'erin', cohort_id: 'c1' });
  const { roster: out, log, summary } = await provisionRoster({
    roster,
    client,
    config: { ...config, verifyRetries: 2, verifyDelayMs: 0 },
    sleep: noSleep
  });

  assert.equal(out.learners[0].provision_state, 'failed');
  assert.equal(summary.error, 1);
  assert.match(log[0].error_detail, /Verification failed/);
});

test('fails loudly when repo exists but incomplete and cannot heal', async () => {
  const { client, state } = makeClient();
  state.repos.set('learning-room-c1-carol', { workflows: ['pr-validation-bot.yml'] });
  const roster = rosterWith({ github_handle: 'carol', cohort_id: 'c1' });
  const { roster: out, log, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(out.learners[0].provision_state, 'failed');
  assert.equal(summary.error, 1);
  assert.match(log[0].error_detail, /missing required workflows/);
});

test('retries on secondary rate limit then succeeds', async () => {
  let attempts = 0;
  const { client } = makeClient({
    async repoExists() {
      attempts += 1;
      if (attempts === 1) {
        const err = new Error('HTTP 403 secondary rate limit');
        err.status = 403;
        throw err;
      }
      return false;
    }
  });
  const roster = rosterWith({ github_handle: 'dave', cohort_id: 'c1' });
  const sleeps = [];
  const { roster: out } = await provisionRoster({
    roster,
    client,
    config,
    sleep: async (ms) => sleeps.push(ms)
  });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.ok(sleeps.includes(1000));
});

test('a failure does not stop the batch; others still provision', async () => {
  let firstChecked = false;
  const { client, state } = makeClient({
    async repoExists({ repo }) {
      if (repo.endsWith('-eve') && !firstChecked) {
        firstChecked = true;
        throw new Error('boom');
      }
      return state.repos.has(repo);
    }
  });
  const roster = rosterWith(
    { github_handle: 'eve', cohort_id: 'c1' },
    { github_handle: 'frank', cohort_id: 'c1' }
  );
  const { roster: out, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  const eve = out.learners.find((l) => l.github_handle === 'eve');
  const frank = out.learners.find((l) => l.github_handle === 'frank');
  assert.equal(eve.provision_state, 'failed');
  assert.equal(frank.provision_state, 'provisioned');
  assert.equal(summary.error, 1);
  assert.equal(summary.created, 1);
});

test('isSecondaryRateLimit detects status and message forms', () => {
  assert.ok(isSecondaryRateLimit({ status: 429 }));
  assert.ok(isSecondaryRateLimit({ message: 'oops HTTP 403 here' }));
  assert.equal(isSecondaryRateLimit({ message: 'HTTP 404' }), false);
});
