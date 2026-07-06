# Provisioning Verification Messaging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make two provisioning automations verify what actually happened and tell the learner the truth, instead of assuming success and going silent when the assumption is wrong: (1) enrollment access - invitation sent vs. instant org-member access; (2) Challenge 7 conflict-practice PR - actually conflicting vs. silently not.

**Architecture:** `github-client.js`'s `ensureCollaborator()` already returns which case occurred (`invited` vs `already-collaborator`) but the result is discarded; thread it through `provision-core.js` and post a tailored follow-up comment on the learner's public enrollment issue (new `commentOnIssue` client method, new `enrollment_repo`/`enrollment_issue_number` roster fields sourced from the existing private intake issue's "Public issue:" line). Separately, `challenge-progression.js`'s Challenge 7 conflict-seeder polls the practice PR's `mergeable_state` after opening it and posts a manual-fallback comment if it never turns out to actually conflict.

**Tech Stack:** Node.js, `node --test` (no new dependency), matching this repo's existing provisioning-subsystem conventions exactly (dependency-injected `client`/`request` objects, fake-client test doubles).

## Global Constraints

- Pure orchestration stays pure: `provision-core.js` still takes an injected `client` and never touches the network directly (existing project rule - see `.github/scripts/provisioning/provision-core.js` file header).
- A courtesy follow-up comment (enrollment status, conflict fallback) must never cause provisioning or seeding to fail. Wrap in try/catch and swallow.
- No generic verification framework. These are two concrete fixes for two known incidents (support#61, support#62), not a reusable platform (YAGNI - see spec's "Out of scope").
- `roster.schema.json` has `"additionalProperties": false` on the learner object - new fields must be added there explicitly or the schema (documentation only, not runtime-enforced) goes stale.
- Existing roster rows predating this change have no `enrollment_repo`/`enrollment_issue_number` - all new code must treat their absence as "skip the comment," never as an error.

---

### Task 1: Add `enrollment_repo`/`enrollment_issue_number` to the roster schema and `upsertLearner`

**Files:**
- Modify: `roster.schema.json`
- Modify: `.github/scripts/provisioning/roster.js:145-155`
- Test: `.github/scripts/provisioning/__tests__/roster.test.js`

**Interfaces:**
- Consumes: nothing new.
- Produces: `upsertLearner(roster, entry)` now persists `entry.enrollment_repo` and
  `entry.enrollment_issue_number` (both optional, default `null`) on newly-inserted
  learner records. Later tasks read `learner.enrollment_repo` /
  `learner.enrollment_issue_number` off roster entries.

- [ ] **Step 1: Write the failing test**

Open `.github/scripts/provisioning/__tests__/roster.test.js` and add this test
(near the other `upsertLearner` tests):

```js
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
```

(Check the top of the file to confirm `emptyRoster` and `upsertLearner` are
already imported from `../roster` - they are used by existing tests in this
file, so no new import line should be needed.)

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test .github/scripts/provisioning/__tests__/roster.test.js`

Expected: FAIL - `next.learners[0].enrollment_repo` is `undefined`, not the
expected value (and `undefined` for the second test's `null` check too).

- [ ] **Step 3: Add the fields to `upsertLearner`**

In `.github/scripts/provisioning/roster.js`, in `upsertLearner`'s insert
branch (the `next.learners.push({...})` call), change:

```js
  next.learners.push({
    github_handle: entry.github_handle,
    cohort_id: entry.cohort_id,
    path: entry.path || 'day1-day2',
    learning_room_repo: entry.learning_room_repo || null,
    provision_state: entry.provision_state || 'pending',
    status: entry.status || 'awaiting-ack',
    registered_at: entry.registered_at || null,
    last_signal_at: entry.last_signal_at || null,
    notes: entry.notes || ''
  });
```

to:

```js
  next.learners.push({
    github_handle: entry.github_handle,
    cohort_id: entry.cohort_id,
    path: entry.path || 'day1-day2',
    learning_room_repo: entry.learning_room_repo || null,
    provision_state: entry.provision_state || 'pending',
    status: entry.status || 'awaiting-ack',
    registered_at: entry.registered_at || null,
    last_signal_at: entry.last_signal_at || null,
    enrollment_repo: entry.enrollment_repo || null,
    enrollment_issue_number: entry.enrollment_issue_number || null,
    notes: entry.notes || ''
  });
```

(The update branch, `Object.assign(existing, entry)`, already passes through
arbitrary fields - no change needed there.)

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test .github/scripts/provisioning/__tests__/roster.test.js`

Expected: all tests in the file PASS.

- [ ] **Step 5: Update the schema documentation**

In `roster.schema.json`, inside `definitions.learner.properties`, add after
the `notes` property:

```json
        "enrollment_repo": {
          "type": ["string", "null"],
          "description": "owner/name of the public repo hosting the learner's [ENROLL] issue. Used to post a follow-up comment once provisioning completes. Null when unknown (e.g. roster rows predating this field)."
        },
        "enrollment_issue_number": {
          "type": ["integer", "null"],
          "description": "Issue number of the learner's public [ENROLL] issue in enrollment_repo. Null when unknown."
        }
```

(Remember the trailing comma after the existing `"notes"` block's closing
brace, since this is not the last property anymore.)

- [ ] **Step 6: Commit**

```bash
git add roster.schema.json .github/scripts/provisioning/roster.js .github/scripts/provisioning/__tests__/roster.test.js
git commit -m "feat(provisioning): add enrollment_repo/enrollment_issue_number to roster

Structured fields for the learner's public [ENROLL] issue, so provisioning
can post a follow-up comment there once it knows whether access was granted
by invitation or instantly (existing org member). Previously this
information only existed embedded in a free-text notes string."
```

---

### Task 2: Parse the public enrollment issue reference out of the private intake issue

**Files:**
- Modify: `.github/scripts/provisioning/sync-intake-to-roster.js:40-91`
- Test: `.github/scripts/provisioning/__tests__/sync-intake-to-roster.test.js`

**Interfaces:**
- Consumes: `upsertLearner` now accepts `enrollment_repo`/`enrollment_issue_number`
  (Task 1).
- Produces: `parseIntakeIssue(issue)` return value now also includes
  `enrollment_repo` (string or `null`) and `enrollment_issue_number` (number or
  `null`), parsed from the intake issue body's existing
  `- Public issue: https://github.com/OWNER/REPO/issues/N` line (this line is
  already written by `registration.yml` today - see
  `.github/workflows/registration.yml:310` and `:740`). `syncIntakeToRoster`
  passes these through to the roster.

- [ ] **Step 1: Write the failing tests**

In `.github/scripts/provisioning/__tests__/sync-intake-to-roster.test.js`,
add:

```js
test('parseIntakeIssue extracts the public enrollment issue reference', () => {
  const parsed = parseIntakeIssue(intakeIssue({ login: 'alice' }));
  assert.equal(parsed.enrollment_repo, 'Community-Access/git-going-with-github');
  assert.equal(parsed.enrollment_issue_number, 42);
});

test('parseIntakeIssue tolerates a missing public issue line', () => {
  const issue = intakeIssue({ login: 'alice' });
  issue.body = issue.body.replace(/^- Public issue:.*\n/m, '');
  const parsed = parseIntakeIssue(issue);
  assert.equal(parsed.enrollment_repo, null);
  assert.equal(parsed.enrollment_issue_number, null);
});

test('syncIntakeToRoster carries the enrollment reference onto the roster entry', () => {
  const roster = { version: 1, cohorts: [], learners: [] };
  const result = syncIntakeToRoster({
    roster,
    intakeIssues: [intakeIssue({ number: 1, login: 'alice' })],
    cohortId: 'self-paced-2026'
  });
  assert.equal(result.roster.learners[0].enrollment_repo, 'Community-Access/git-going-with-github');
  assert.equal(result.roster.learners[0].enrollment_issue_number, 42);
});
```

(The `intakeIssue()` test helper already at the top of this file bakes in
`'- Public issue: https://github.com/Community-Access/git-going-with-github/issues/42'`
- that's where the `42` and repo name above come from.)

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test .github/scripts/provisioning/__tests__/sync-intake-to-roster.test.js`

Expected: FAIL - `parsed.enrollment_repo` is `undefined`.

- [ ] **Step 3: Parse the "Public issue:" line**

In `.github/scripts/provisioning/sync-intake-to-roster.js`, change
`parseIntakeIssue` from:

```js
function parseIntakeIssue(issue) {
  if (!issue || typeof issue.title !== 'string') return null;
  if (!issue.title.startsWith(INTAKE_TITLE_PREFIX)) return null;
  const body = String(issue.body || '');
  const submitted = body.match(/^- Submitted by: @(\S+)\s*$/m);
  if (!submitted || !isValidHandle(submitted[1])) return null;
  const captured = body.match(/^- Captured at: (\S+)\s*$/m);
  return {
    github_handle: submitted[1],
    registered_at: (captured && captured[1]) || issue.created_at || null,
    intake_issue_number: issue.number
  };
}
```

to:

```js
function parseIntakeIssue(issue) {
  if (!issue || typeof issue.title !== 'string') return null;
  if (!issue.title.startsWith(INTAKE_TITLE_PREFIX)) return null;
  const body = String(issue.body || '');
  const submitted = body.match(/^- Submitted by: @(\S+)\s*$/m);
  if (!submitted || !isValidHandle(submitted[1])) return null;
  const captured = body.match(/^- Captured at: (\S+)\s*$/m);
  const publicIssue = body.match(
    /^- Public issue: https:\/\/github\.com\/([^/\s]+\/[^/\s]+)\/issues\/(\d+)\s*$/m
  );
  return {
    github_handle: submitted[1],
    registered_at: (captured && captured[1]) || issue.created_at || null,
    intake_issue_number: issue.number,
    enrollment_repo: publicIssue ? publicIssue[1] : null,
    enrollment_issue_number: publicIssue ? Number(publicIssue[2]) : null
  };
}
```

Then update `syncIntakeToRoster`'s `upsertLearner` call from:

```js
    next = upsertLearner(next, {
      github_handle: parsed.github_handle,
      cohort_id: cohortId,
      path: 'day1-day2',
      provision_state: 'pending',
      status: 'awaiting-ack',
      registered_at: parsed.registered_at,
      notes: `from intake issue #${parsed.intake_issue_number}`
    });
```

to:

```js
    next = upsertLearner(next, {
      github_handle: parsed.github_handle,
      cohort_id: cohortId,
      path: 'day1-day2',
      provision_state: 'pending',
      status: 'awaiting-ack',
      registered_at: parsed.registered_at,
      enrollment_repo: parsed.enrollment_repo,
      enrollment_issue_number: parsed.enrollment_issue_number,
      notes: `from intake issue #${parsed.intake_issue_number}`
    });
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test .github/scripts/provisioning/__tests__/sync-intake-to-roster.test.js`

Expected: all tests in the file PASS.

- [ ] **Step 5: Commit**

```bash
git add .github/scripts/provisioning/sync-intake-to-roster.js .github/scripts/provisioning/__tests__/sync-intake-to-roster.test.js
git commit -m "feat(provisioning): carry the public enrollment issue onto roster entries

registration.yml already records '- Public issue: <url>' in the private
intake mirror issue; parse it out and store it as structured
enrollment_repo/enrollment_issue_number fields so provisioning can post a
follow-up comment on the learner's actual enrollment issue later."
```

---

### Task 3: Add `commentOnIssue` to the GitHub client

**Files:**
- Modify: `.github/scripts/provisioning/github-client.js`
- Test: `.github/scripts/provisioning/__tests__/github-client.test.js`

**Interfaces:**
- Consumes: nothing new.
- Produces: both `createFetchClient(...)` and `fromOctokit(...)` now expose
  `commentOnIssue({ owner, repo, issue_number, body })`, returning the created
  comment (or throwing on failure - callers are responsible for deciding
  whether a failure here should be fatal; Task 4 will treat it as non-fatal).

- [ ] **Step 1: Write the failing tests**

In `.github/scripts/provisioning/__tests__/github-client.test.js`, add:

```js
test('commentOnIssue posts to the issue comments endpoint', async () => {
  let body;
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'POST /repos/o/r/issues/42/comments': (opts) => {
        body = JSON.parse(opts.body);
        return { status: 201, async json() { return { id: 1 }; } };
      }
    })
  });
  const result = await client.commentOnIssue({ owner: 'o', repo: 'r', issue_number: 42, body: 'hello' });
  assert.equal(body.body, 'hello');
  assert.equal(result.id, 1);
});

test('commentOnIssue throws with detail on failure', async () => {
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'POST /repos/o/r/issues/42/comments': () => ({ status: 404, async text() { return 'not found'; } })
    })
  });
  await assert.rejects(
    () => client.commentOnIssue({ owner: 'o', repo: 'r', issue_number: 42, body: 'hello' }),
    /commentOnIssue failed \(HTTP 404\).*not found/
  );
});

test('fromOctokit commentOnIssue delegates to issues.createComment', async () => {
  let called;
  const octokit = {
    rest: {
      issues: {
        createComment: async (args) => {
          called = args;
          return { data: { id: 7 } };
        }
      }
    }
  };
  const client = fromOctokit(octokit);
  const result = await client.commentOnIssue({ owner: 'o', repo: 'r', issue_number: 5, body: 'hi' });
  assert.deepEqual(called, { owner: 'o', repo: 'r', issue_number: 5, body: 'hi' });
  assert.equal(result.id, 7);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test .github/scripts/provisioning/__tests__/github-client.test.js`

Expected: FAIL - `client.commentOnIssue is not a function`.

- [ ] **Step 3: Implement `commentOnIssue` in both client variants**

In `.github/scripts/provisioning/github-client.js`, in the object returned by
`createFetchClient`, add (after `ensureCollaborator`, before
`listWorkflowPaths`):

```js
    async commentOnIssue({ owner, repo, issue_number, body }) {
      const res = await request(
        'POST',
        `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
        { body }
      );
      if (res.status === 201) return res.json();
      const detail = await res.text();
      throw new Error(
        `commentOnIssue failed (HTTP ${res.status}) for ${owner}/${repo}#${issue_number}: ${detail}`
      );
    },
```

In the object returned by `fromOctokit`, add (after `ensureCollaborator`,
before `listWorkflowPaths`):

```js
    async commentOnIssue({ owner, repo, issue_number, body }) {
      const res = await octokit.rest.issues.createComment({ owner, repo, issue_number, body });
      return res.data;
    },
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test .github/scripts/provisioning/__tests__/github-client.test.js`

Expected: all tests in the file PASS.

- [ ] **Step 5: Commit**

```bash
git add .github/scripts/provisioning/github-client.js .github/scripts/provisioning/__tests__/github-client.test.js
git commit -m "feat(provisioning): add commentOnIssue to the GitHub client

Needed so provisioning can post a follow-up comment on a learner's public
enrollment issue once it knows whether access was granted by invitation or
instantly."
```

---

### Task 4: Post the true enrollment-access message from `provision-core.js`

**Files:**
- Modify: `.github/scripts/provisioning/provision-core.js`
- Test: `.github/scripts/provisioning/__tests__/provision-core.test.js`

**Interfaces:**
- Consumes: `client.ensureCollaborator(...)` already returns
  `{ status: 'invited' | 'already-collaborator' }` (existing). `client.commentOnIssue`
  from Task 3. `learner.enrollment_repo` / `learner.enrollment_issue_number`
  from Task 1/2.
- Produces: `provisionOne(...)` now returns
  `{ result, healed, templateSha, collaboratorStatus }`. A new exported
  `notifyEnrollmentIssue({ client, enrollmentRepo, enrollmentIssueNumber, collaboratorStatus, learningRoomRepo })`
  helper posts the tailored comment and never throws.

- [ ] **Step 1: Write the failing tests**

In `.github/scripts/provisioning/__tests__/provision-core.test.js`, add:

```js
test('posts an instant-access comment when the learner is already an org member', async () => {
  const comments = [];
  const { client } = makeClient({
    async ensureCollaborator() {
      return { status: 'already-collaborator' };
    },
    async commentOnIssue(args) {
      comments.push(args);
    }
  });
  const roster = rosterWith({
    github_handle: 'alice',
    cohort_id: 'c1',
    enrollment_repo: 'Community-Access/git-going-with-github',
    enrollment_issue_number: 250
  });
  const { roster: out } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(comments.length, 1);
  assert.equal(comments[0].owner, 'Community-Access');
  assert.equal(comments[0].repo, 'git-going-with-github');
  assert.equal(comments[0].issue_number, 250);
  assert.match(comments[0].body, /already have access/);
  assert.match(comments[0].body, /Community-Access\/learning-room-c1-alice/);
});

test('posts an invitation-pending comment for a new collaborator', async () => {
  const comments = [];
  const { client } = makeClient({
    async ensureCollaborator() {
      return { status: 'invited' };
    },
    async commentOnIssue(args) {
      comments.push(args);
    }
  });
  const roster = rosterWith({
    github_handle: 'alice',
    cohort_id: 'c1',
    enrollment_repo: 'Community-Access/git-going-with-github',
    enrollment_issue_number: 250
  });
  await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(comments.length, 1);
  assert.match(comments[0].body, /Watch for a GitHub repository invitation/);
});

test('skips the enrollment comment silently when no enrollment issue is known', async () => {
  const comments = [];
  const { client } = makeClient({
    async commentOnIssue(args) {
      comments.push(args);
    }
  });
  const roster = rosterWith({ github_handle: 'alice', cohort_id: 'c1' });
  const { roster: out } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(comments.length, 0);
});

test('a failed enrollment comment does not fail provisioning', async () => {
  const { client } = makeClient({
    async commentOnIssue() {
      throw new Error('comment boom');
    }
  });
  const roster = rosterWith({
    github_handle: 'alice',
    cohort_id: 'c1',
    enrollment_repo: 'Community-Access/git-going-with-github',
    enrollment_issue_number: 250
  });
  const { roster: out, summary } = await provisionRoster({ roster, client, config, sleep: noSleep });

  assert.equal(out.learners[0].provision_state, 'provisioned');
  assert.equal(summary.error, 0);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test .github/scripts/provisioning/__tests__/provision-core.test.js`

Expected: FAIL - the first three new tests report `comments.length` as `0`
(or the wrong body), since nothing calls `commentOnIssue` yet.

- [ ] **Step 3: Thread `collaboratorStatus` through and add `notifyEnrollmentIssue`**

In `.github/scripts/provisioning/provision-core.js`, change the
`provisionOne` function signature from:

```js
async function provisionOne({
  client,
  handle,
  studentOwner,
  templateOwner,
  templateRepo,
  repoName,
  requiredWorkflows,
  permission,
  verifyRetries = 10,
  verifyDelayMs = 3000,
  sleep = sleepReal
}) {
```

to:

```js
async function provisionOne({
  client,
  handle,
  studentOwner,
  templateOwner,
  templateRepo,
  repoName,
  requiredWorkflows,
  permission,
  enrollmentRepo,
  enrollmentIssueNumber,
  verifyRetries = 10,
  verifyDelayMs = 3000,
  sleep = sleepReal
}) {
```

Change the `ensureCollaborator` call and everything through the function's
`return` from:

```js
  await client.ensureCollaborator({
    owner: studentOwner,
    repo: repoName,
    username: handle,
    permission
  });
```

...(verification and seeding block unchanged)...

```js
  return { result, healed, templateSha };
}
```

to:

```js
  const collaboratorResult = await client.ensureCollaborator({
    owner: studentOwner,
    repo: repoName,
    username: handle,
    permission
  });

  await notifyEnrollmentIssue({
    client,
    enrollmentRepo,
    enrollmentIssueNumber,
    collaboratorStatus: collaboratorResult.status,
    learningRoomRepo: `${studentOwner}/${repoName}`
  });
```

...(verification and seeding block unchanged)...

```js
  return { result, healed, templateSha, collaboratorStatus: collaboratorResult.status };
}

/**
 * Tell the learner what actually happened when granting access: GitHub sends
 * an invitation email for a brand-new collaborator, but grants instant
 * access with no notification at all to someone who is already a member of
 * the Community-Access organization (support#62). Best-effort only - a
 * courtesy comment must never fail provisioning.
 */
async function notifyEnrollmentIssue({
  client,
  enrollmentRepo,
  enrollmentIssueNumber,
  collaboratorStatus,
  learningRoomRepo
}) {
  if (!enrollmentRepo || !enrollmentIssueNumber || typeof client.commentOnIssue !== 'function') {
    return;
  }
  const [owner, repo] = String(enrollmentRepo).split('/');
  if (!owner || !repo) {
    return;
  }
  const body =
    collaboratorStatus === 'already-collaborator'
      ? `Your learning room is ready: \`${learningRoomRepo}\`. You already have access - no invitation needed, since you're already a member of the Community-Access organization. Open it directly: https://github.com/${learningRoomRepo}`
      : `Your learning room is ready: \`${learningRoomRepo}\`. Watch for a GitHub repository invitation (notification bell and email) and accept it to open it.`;
  try {
    await client.commentOnIssue({ owner, repo, issue_number: enrollmentIssueNumber, body });
  } catch (err) {
    console.error(
      `Could not post enrollment follow-up comment on ${enrollmentRepo}#${enrollmentIssueNumber}: ${err.message}`
    );
  }
}
```

Then, in `provisionRoster`'s call to `provisionOne` (inside the
`withRateLimitRetry(() => provisionOne({...`), add the two new fields:

```js
        () =>
          provisionOne({
            client,
            handle,
            studentOwner,
            templateOwner,
            templateRepo,
            repoName,
            requiredWorkflows,
            permission,
            enrollmentRepo: learner.enrollment_repo,
            enrollmentIssueNumber: learner.enrollment_issue_number,
            verifyRetries,
            verifyDelayMs,
            sleep
          }),
```

Finally, add `notifyEnrollmentIssue` to `module.exports` at the bottom of the
file (alongside the existing exports):

```js
module.exports = {
  provisionRoster,
  provisionOne,
  notifyEnrollmentIssue,
  defaultRepoName,
  isSecondaryRateLimit,
  missingWorkflows,
  summarize
};
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test .github/scripts/provisioning/__tests__/provision-core.test.js`

Expected: all tests in the file PASS (including the pre-existing ones - the
`makeClient()` helper's default `ensureCollaborator` already returns
`{ status: 'invited' }`, and roster entries built via `rosterWith(...)` without
`enrollment_repo`/`enrollment_issue_number` will have those fields `null`, so
existing tests take the "skip silently" path with no behavior change).

- [ ] **Step 5: Commit**

```bash
git add .github/scripts/provisioning/provision-core.js .github/scripts/provisioning/__tests__/provision-core.test.js
git commit -m "feat(provisioning): tell learners the truth about enrollment access

Thread ensureCollaborator's already-known invited/already-collaborator
status through provisionOne and post the matching message on the learner's
public enrollment issue: 'watch for an invitation' for a new collaborator,
or 'you already have access, no invitation needed' for an existing org
member. Closes the exact gap behind support#62 - George Kerscher never
got an invitation because he was already a Community-Access org member,
and had no way to know that from the generic enrollment message."
```

---

### Task 5: Verify the Challenge 7 conflict-practice PR actually conflicts

**Files:**
- Modify: `learning-room/.github/scripts/challenge-progression.js`
- Create: `learning-room/.github/scripts/__tests__/challenge-progression.test.js`

**Interfaces:**
- Consumes: the existing `githubRequest`-shaped `request(route, options, retries)`
  function already used throughout this file.
- Produces: `ensureMergeConflictPractice(issueNumber, request, delayMs)` (new
  optional third parameter, defaulting to `2000`) now verifies the practice
  PR's `mergeable_state` before declaring success, and calls the new exported
  `postConflictFallbackComment(issueNumber, prNumber, request)` when
  verification fails.

- [ ] **Step 1: Write the failing tests**

Create `learning-room/.github/scripts/__tests__/challenge-progression.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');

process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'test-token';
process.env.GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'Community-Access/learning-room-test';

const { ensureMergeConflictPractice } = require('../challenge-progression');

function makeFakeRequest(routes) {
  const calls = [];
  const request = async (route, options = {}) => {
    calls.push({ route, method: options.method || 'GET' });
    const key = `${options.method || 'GET'} ${route}`;
    for (const [pattern, handler] of routes) {
      if (pattern.test(key)) return handler(route, options);
    }
    throw new Error(`Unexpected request in test: ${key}`);
  };
  return { request, calls };
}

test('posts the success comment when the practice PR registers as conflicting', async () => {
  const { request, calls } = makeFakeRequest([
    [/^GET .*\/pulls\?head=/, () => []],
    [/^GET .*\/git\/ref\/heads\/main$/, () => ({ object: { sha: 'main-sha' } })],
    [/^GET .*\/contents\/docs\/welcome\.md\?ref=main$/, () => ({
      sha: 'file-sha',
      content: Buffer.from('Hello world').toString('base64')
    })],
    [/^POST .*\/git\/refs$/, () => ({})],
    [/^PUT .*\/contents\/docs\/welcome\.md$/, () => ({})],
    [/^POST .*\/pulls$/, () => ({ number: 99, html_url: 'https://example.test/pr/99' })],
    [/^GET .*\/pulls\/99$/, () => ({ mergeable_state: 'dirty' })],
    [/^POST .*\/issues\/11\/comments$/, () => ({})]
  ]);

  await ensureMergeConflictPractice(11, request, 0);

  const commentCall = calls.find((c) => c.route.includes('/issues/11/comments'));
  assert.ok(commentCall, 'expected a comment to be posted on the challenge issue');
});

test('posts the fallback comment when the practice PR never registers as conflicting', async () => {
  let commentBody = null;
  const { request } = makeFakeRequest([
    [/^GET .*\/pulls\?head=/, () => []],
    [/^GET .*\/git\/ref\/heads\/main$/, () => ({ object: { sha: 'main-sha' } })],
    [/^GET .*\/contents\/docs\/welcome\.md\?ref=main$/, () => ({
      sha: 'file-sha',
      content: Buffer.from('Hello world').toString('base64')
    })],
    [/^POST .*\/git\/refs$/, () => ({})],
    [/^PUT .*\/contents\/docs\/welcome\.md$/, () => ({})],
    [/^POST .*\/pulls$/, () => ({ number: 99, html_url: 'https://example.test/pr/99' })],
    [/^GET .*\/pulls\/99$/, () => ({ mergeable_state: 'clean' })],
    [/^POST .*\/issues\/11\/comments$/, (route, options) => {
      commentBody = JSON.parse(options.body).body;
      return {};
    }]
  ]);

  await ensureMergeConflictPractice(11, request, 0);

  assert.ok(commentBody, 'expected a fallback comment to be posted');
  assert.match(commentBody, /did not register a conflict/);
  assert.match(commentBody, /main/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test learning-room/.github/scripts/__tests__/challenge-progression.test.js`

Expected: FAIL on both tests - `Unexpected request in test: GET
/repos/.../pulls/99` (nothing polls the PR today), and the second test's
`commentBody` assertion fails because today's code always posts the success
comment regardless of `mergeable_state`.

- [ ] **Step 3: Add verification and the fallback comment**

In `learning-room/.github/scripts/challenge-progression.js`, add two new
constants near the existing `CONFLICT_*` constants (after
`const CONFLICT_PR_TITLE = 'Challenge 7 practice: resolve this merge conflict';`):

```js
const CONFLICT_VERIFY_ATTEMPTS = 3;
const CONFLICT_VERIFY_DELAY_MS = 2000;
```

Add two new functions after `postConflictPracticeComment` (before
`async function ensureMergeConflictPractice`):

```js
async function waitForConflictState(prNumber, request = githubRequest, delayMs = CONFLICT_VERIFY_DELAY_MS) {
  for (let attempt = 1; attempt <= CONFLICT_VERIFY_ATTEMPTS; attempt += 1) {
    const pr = await request(`/repos/${owner}/${repo}/pulls/${prNumber}`, {}, 1);
    if (pr && pr.mergeable_state === 'dirty') {
      return true;
    }
    if (attempt < CONFLICT_VERIFY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return false;
}

async function postConflictFallbackComment(issueNumber, prNumber, request = githubRequest) {
  if (!issueNumber) {
    return;
  }
  await request(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: 'POST',
    body: {
      body: [
        `Your merge conflict practice PR is open (#${prNumber}), but it did not register a conflict yet.`,
        '',
        'You can create one yourself instead:',
        '1. Open `docs/welcome.md` for editing directly on the `main` branch (the pencil icon, committing straight to `main`).',
        `2. Find the sentence marked with \`${CONFLICT_ANCHOR}\` and reword it slightly.`,
        '3. Commit that change directly to `main`.',
        `4. Go back to PR #${prNumber} - it should now show "This branch has conflicts that must be resolved."`,
        '5. Follow Steps 2-5 in this issue to resolve it.'
      ].join('\n')
    }
  });
}
```

Then change `ensureMergeConflictPractice`'s signature and its final block
from:

```js
async function ensureMergeConflictPractice(issueNumber, request = githubRequest) {
```

...(unchanged body up to)...

```js
    log('INFO', `Opened Challenge 7 conflict practice PR: ${pr.html_url}`);
    console.log(`Opened Challenge 7 conflict practice PR: ${pr.html_url}`);

    await postConflictPracticeComment(targetIssueNumber, pr.number, request);
  } catch (error) {
    log('WARN', `Could not set up merge conflict practice: ${error.message}. Student can still resolve manually.`);
  }
}
```

to:

```js
async function ensureMergeConflictPractice(issueNumber, request = githubRequest, delayMs = CONFLICT_VERIFY_DELAY_MS) {
```

...(unchanged body up to)...

```js
    log('INFO', `Opened Challenge 7 conflict practice PR: ${pr.html_url}`);
    console.log(`Opened Challenge 7 conflict practice PR: ${pr.html_url}`);

    const isConflicting = await waitForConflictState(pr.number, request, delayMs);
    if (isConflicting) {
      await postConflictPracticeComment(targetIssueNumber, pr.number, request);
    } else {
      log('WARN', `Practice PR #${pr.number} did not register as conflicting after retries.`);
      await postConflictFallbackComment(targetIssueNumber, pr.number, request);
    }
  } catch (error) {
    log('WARN', `Could not set up merge conflict practice: ${error.message}. Student can still resolve manually.`);
  }
}
```

Finally, add the two new functions to `module.exports` at the bottom of the
file:

```js
module.exports = {
  resolveValidAssignee,
  ensurePeerSimulationArtifacts,
  ensureLabel,
  ensurePeerIssue,
  ensurePeerSimulationBranch,
  ensurePeerSimulationPullRequest,
  ensureMergeConflictPractice,
  waitForConflictState,
  postConflictFallbackComment
};
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test learning-room/.github/scripts/__tests__/challenge-progression.test.js`

Expected: both tests PASS.

- [ ] **Step 5: Run the full provisioning and automation suites as a regression check**

Run: `npm run test:provisioning && npm run test:automation`

Expected: all pre-existing tests still PASS (these changes are additive to
files those suites already cover for `test:provisioning`; `test:automation`
is unaffected but confirms nothing else broke).

- [ ] **Step 6: Commit**

```bash
git add learning-room/.github/scripts/challenge-progression.js learning-room/.github/scripts/__tests__/challenge-progression.test.js
git commit -m "fix(learning-room): verify the Challenge 7 practice PR actually conflicts

GitHub computes mergeable_state asynchronously, so a freshly-opened practice
PR can briefly (or, rarely, permanently) not show as conflicting even though
both branches touched the same line. Poll it after opening the PR; if it
never turns dirty, post manual conflict-creation steps instead of silently
leaving a learner with a PR that looks ready but isn't (support#61)."
```

## Self-Review Notes

- **Spec coverage:** B1 (roster schema, sync-intake parsing, github-client
  `commentOnIssue`, `provision-core.js` wiring) is Tasks 1-4. B2 (Challenge 7
  verification) is Task 5. Both testing sections from the spec are covered.
- **Type/name consistency:** `enrollment_repo`/`enrollment_issue_number` are
  spelled identically across `roster.schema.json`, `roster.js`,
  `sync-intake-to-roster.js`, and `provision-core.js`. `commentOnIssue`'s
  parameter shape (`{ owner, repo, issue_number, body }`) matches between
  `github-client.js`'s two implementations, its tests, and
  `notifyEnrollmentIssue`'s call site.
- **No placeholders:** every step has complete, runnable code.
- **Silent-skip guarantee:** Task 4's `notifyEnrollmentIssue` returns early
  (no throw, no call) when `enrollmentRepo`/`enrollmentIssueNumber` are falsy,
  and wraps the actual call in try/catch - covered by the "skips ... silently"
  and "does not fail provisioning" tests.

## Authoritative Sources

- [Design spec: onboarding verification and a11y report](2026-07-06-onboarding-verification-and-a11y-report-design.md)
- [`roster.schema.json`](../../roster.schema.json)
- [`.github/scripts/provisioning/roster.js`](../../.github/scripts/provisioning/roster.js)
- [`.github/scripts/provisioning/sync-intake-to-roster.js`](../../.github/scripts/provisioning/sync-intake-to-roster.js)
- [`.github/scripts/provisioning/github-client.js`](../../.github/scripts/provisioning/github-client.js)
- [`.github/scripts/provisioning/provision-core.js`](../../.github/scripts/provisioning/provision-core.js)
- [`.github/workflows/registration.yml`](../../.github/workflows/registration.yml)
- [`learning-room/.github/scripts/challenge-progression.js`](../../learning-room/.github/scripts/challenge-progression.js)

### Section-Level Source Map

- **Task 1 (roster schema fields):** [Design spec, Part B1](2026-07-06-onboarding-verification-and-a11y-report-design.md), [`roster.schema.json`](../../roster.schema.json), [`roster.js`](../../.github/scripts/provisioning/roster.js).
- **Task 2 (parse public enrollment issue):** [`sync-intake-to-roster.js`](../../.github/scripts/provisioning/sync-intake-to-roster.js), [`registration.yml`](../../.github/workflows/registration.yml).
- **Task 3 (commentOnIssue client method):** [`github-client.js`](../../.github/scripts/provisioning/github-client.js).
- **Task 4 (post enrollment message):** [Design spec, Part B1](2026-07-06-onboarding-verification-and-a11y-report-design.md), [`provision-core.js`](../../.github/scripts/provisioning/provision-core.js).
- **Task 5 (Challenge 7 verification):** [Design spec, Part B2](2026-07-06-onboarding-verification-and-a11y-report-design.md), [`challenge-progression.js`](../../learning-room/.github/scripts/challenge-progression.js).
