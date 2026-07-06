/**
 * Idempotent provisioning core for the GLOW workshop: the GitHub-native
 * replacement for GitHub Classroom. Implements the serial, backoff, idempotent
 * algorithm in SPEC.md section 7.2b.
 *
 * This module is pure orchestration. It takes an injected `client` (see
 * github-client.js) so it can run against the real GitHub API from the workflow
 * or the CLI, and against a fake client in unit tests. It never reads secrets,
 * never touches the network directly, and never persists state itself: it
 * returns an updated roster plus a provisioning log for the caller to store.
 */

'use strict';

const { entriesToProvision, learnerKey } = require('./roster');
const { REQUIRED_WORKFLOWS } = require('./github-client');

function defaultRepoName(handle, cohortId) {
  const safeHandle = String(handle).toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const safeCohort = String(cohortId).toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return `learning-room-${safeCohort}-${safeHandle}`;
}

function isSecondaryRateLimit(err) {
  if (!err) return false;
  if (err.status === 403 || err.status === 429) return true;
  return /HTTP (403|429)/.test(String(err.message || ''));
}

const sleepReal = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Provision (or heal) every pending/failed learner in the roster.
 *
 * config = {
 *   studentOwner,            // org/user that owns student repos
 *   templateOwner,
 *   templateRepo,
 *   requiredWorkflows,       // defaults to REQUIRED_WORKFLOWS
 *   repoNameFor,             // (handle, cohortId) => name; defaults to defaultRepoName
 *   delayMs,                 // delay between entries (default 1500)
 *   maxRetries,              // backoff attempts on secondary rate limit (default 5)
 *   verifyRetries,           // verification attempts after create/heal (default 10)
 *   verifyDelayMs,           // delay between verification attempts (default 3000)
 *   collaboratorPermission   // default 'push'
 * }
 *
 * Returns { roster (updated), log: [entries], summary }.
 */
async function provisionRoster({
  roster,
  client,
  config = {},
  sleep = sleepReal,
  now = () => new Date(),
  logger = () => {}
}) {
  const studentOwner = required(config, 'studentOwner');
  const templateOwner = required(config, 'templateOwner');
  const templateRepo = required(config, 'templateRepo');
  const requiredWorkflows = config.requiredWorkflows || REQUIRED_WORKFLOWS;
  const repoNameFor = config.repoNameFor || defaultRepoName;
  const delayMs = config.delayMs == null ? 1500 : config.delayMs;
  const maxRetries = config.maxRetries == null ? 5 : config.maxRetries;
  const verifyRetries = config.verifyRetries == null ? 10 : config.verifyRetries;
  const verifyDelayMs = config.verifyDelayMs == null ? 3000 : config.verifyDelayMs;
  const permission = config.collaboratorPermission || 'push';

  const log = [];
  const targets = entriesToProvision(roster);

  for (let i = 0; i < targets.length; i += 1) {
    const learner = targets[i];
    const handle = learner.github_handle;
    const cohortId = learner.cohort_id;
    const repoName = repoNameFor(handle, cohortId);
    const repo = `${studentOwner}/${repoName}`;
    const attemptAt = now().toISOString();

    let result;
    try {
      result = await withRateLimitRetry(
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
        { maxRetries, sleep, logger }
      );
    } catch (err) {
      learner.provision_state = 'failed';
      learner.learning_room_repo = repo;
      const entry = {
        github_handle: handle,
        cohort_id: cohortId,
        attempt_at: attemptAt,
        result: 'error',
        repo,
        template_sha: null,
        error_detail: String(err && err.message ? err.message : err)
      };
      log.push(entry);
      logger(`FAILED ${learnerKey(handle, cohortId)}: ${entry.error_detail}`);
      if (i < targets.length - 1) await sleep(delayMs);
      continue;
    }

    learner.provision_state = result.healed ? 'healed' : 'provisioned';
    learner.learning_room_repo = repo;
    log.push({
      github_handle: handle,
      cohort_id: cohortId,
      attempt_at: attemptAt,
      result: result.result,
      repo,
      template_sha: result.templateSha,
      error_detail: null
    });
    logger(`OK ${learnerKey(handle, cohortId)}: ${result.result} -> ${repo}`);

    if (i < targets.length - 1) await sleep(delayMs);
  }

  const summary = summarize(log);
  return { roster, log, summary };
}

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
  const exists = await client.repoExists({ owner: studentOwner, repo: repoName });

  let result = 'created';
  let healed = false;

  if (exists) {
    const present = await client.listWorkflowPaths({ owner: studentOwner, repo: repoName });
    const missing = missingWorkflows(requiredWorkflows, present);
    if (missing.length === 0) {
      result = 'already-exists';
    } else if (typeof client.seedContent === 'function') {
      await client.seedContent({
        owner: studentOwner,
        repo: repoName,
        templateOwner,
        templateRepo,
        missing
      });
      healed = true;
      result = 'healed';
    } else {
      throw new Error(
        `Repo ${studentOwner}/${repoName} exists but is missing required workflows: ${missing.join(', ')}`
      );
    }
  } else {
    await client.createFromTemplate({
      templateOwner,
      templateRepo,
      owner: studentOwner,
      repo: repoName,
      isPrivate: true
    });
    result = 'created';
  }

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

  // Final verification gate: required workflows must be present. On a fresh
  // create (or heal), GitHub copies template content asynchronously after the
  // API returns, so give the copy time to land instead of failing the learner.
  const attempts = result === 'already-exists' ? 1 : Math.max(1, verifyRetries);
  let stillMissing = requiredWorkflows;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const present = await client.listWorkflowPaths({ owner: studentOwner, repo: repoName });
    stillMissing = missingWorkflows(requiredWorkflows, present);
    if (stillMissing.length === 0) break;
    if (attempt < attempts) await sleep(verifyDelayMs);
  }
  if (stillMissing.length > 0) {
    throw new Error(
      `Verification failed for ${studentOwner}/${repoName}: missing ${stillMissing.join(', ')}`
    );
  }

  // A room without a Challenge 1 issue never starts the progression chain:
  // the Student Progression Bot only fires on issue close or manual dispatch.
  // Seed after content verification so the issue never points at an empty
  // repo. The seeder is idempotent (skips when a challenge issue exists).
  if (typeof client.seedFirstChallenge === 'function') {
    await client.seedFirstChallenge({
      owner: studentOwner,
      repo: repoName,
      assignee: handle
    });
  }

  let templateSha = null;
  if (typeof client.getDefaultBranchSha === 'function') {
    templateSha = await client.getDefaultBranchSha({ owner: studentOwner, repo: repoName });
  }

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

async function withRateLimitRetry(fn, { maxRetries, sleep, logger }) {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (isSecondaryRateLimit(err) && attempt < maxRetries) {
        const backoff = Math.min(60000, 1000 * 2 ** attempt);
        attempt += 1;
        logger(`Secondary rate limit hit; backing off ${backoff}ms (attempt ${attempt})`);
        await sleep(backoff);
        continue;
      }
      throw err;
    }
  }
}

function missingWorkflows(required, present) {
  const have = new Set((present || []).map((p) => String(p).toLowerCase()));
  return required.filter((w) => !have.has(String(w).toLowerCase()));
}

function summarize(log) {
  const summary = {
    total: log.length,
    created: 0,
    already_exists: 0,
    healed: 0,
    error: 0
  };
  for (const entry of log) {
    if (entry.result === 'created' || entry.result === 'seeded') summary.created += 1;
    else if (entry.result === 'already-exists') summary.already_exists += 1;
    else if (entry.result === 'healed') summary.healed += 1;
    else if (entry.result === 'error') summary.error += 1;
  }
  return summary;
}

function required(config, key) {
  if (!config[key]) throw new Error(`provisionRoster config requires "${key}"`);
  return config[key];
}

module.exports = {
  provisionRoster,
  provisionOne,
  notifyEnrollmentIssue,
  defaultRepoName,
  isSecondaryRateLimit,
  missingWorkflows,
  summarize
};
