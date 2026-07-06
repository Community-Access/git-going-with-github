/**
 * Owned roster of record for the GIT Going with GitHub (GLOW) workshop.
 *
 * The roster maps a learner GitHub handle to a cohort, path, provisioning state,
 * and progression status. It is the canonical, vendor-independent source of truth
 * required by the decoupling contract in golden.md and SPEC.md section 6.1.
 *
 * Everything here is pure and synchronous so it is fully unit-testable and can be
 * driven from a workflow, the CLI, or the Flask companion without a network call.
 * Persistence (where the JSON physically lives) is the caller's concern.
 */

'use strict';

const PROVISION_STATES = Object.freeze(['pending', 'provisioned', 'failed', 'healed']);
const STATUSES = Object.freeze([
  'awaiting-ack',
  'active-day1',
  'day1-complete',
  'day2-released',
  'needs-info'
]);
const PATHS = Object.freeze(['day1-day2', 'day2-only']);

// GitHub usernames: 1-39 chars, alphanumeric or single hyphens, no leading/trailing hyphen.
const HANDLE_RE = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

function normalizeHandle(handle) {
  return String(handle || '').trim().replace(/^@+/, '').toLowerCase();
}

function isValidHandle(handle) {
  return HANDLE_RE.test(String(handle || '').replace(/^@+/, ''));
}

function emptyRoster() {
  return { version: 1, cohorts: [], learners: [] };
}

/**
 * Parse a roster from a JSON string, tolerating an empty/missing input by
 * returning a fresh empty roster. Throws on malformed JSON or wrong shape.
 */
function parseRoster(json) {
  if (json === undefined || json === null || String(json).trim() === '') {
    return emptyRoster();
  }
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  return validateRoster(data);
}

function validateRoster(data) {
  const errors = [];
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('Roster must be an object');
  }
  if (data.version !== 1) {
    errors.push(`Unsupported roster version: ${data.version}`);
  }
  if (!Array.isArray(data.learners)) {
    errors.push('Roster.learners must be an array');
  }
  if (data.cohorts !== undefined && !Array.isArray(data.cohorts)) {
    errors.push('Roster.cohorts must be an array');
  }
  if (errors.length) {
    throw new Error(`Invalid roster: ${errors.join('; ')}`);
  }
  const seen = new Set();
  for (const learner of data.learners) {
    const problems = validateLearner(learner);
    if (problems.length) {
      throw new Error(`Invalid learner ${learner && learner.github_handle}: ${problems.join('; ')}`);
    }
    const key = learnerKey(learner.github_handle, learner.cohort_id);
    if (seen.has(key)) {
      throw new Error(`Duplicate learner for key ${key}`);
    }
    seen.add(key);
  }
  return {
    version: 1,
    generated_at: data.generated_at,
    cohorts: data.cohorts || [],
    learners: data.learners
  };
}

function validateLearner(learner) {
  const problems = [];
  if (!learner || typeof learner !== 'object') {
    return ['learner must be an object'];
  }
  if (!isValidHandle(learner.github_handle)) {
    problems.push('invalid github_handle');
  }
  if (!learner.cohort_id) {
    problems.push('missing cohort_id');
  }
  if (!PATHS.includes(learner.path)) {
    problems.push(`invalid path: ${learner.path}`);
  }
  if (!PROVISION_STATES.includes(learner.provision_state)) {
    problems.push(`invalid provision_state: ${learner.provision_state}`);
  }
  if (!STATUSES.includes(learner.status)) {
    problems.push(`invalid status: ${learner.status}`);
  }
  return problems;
}

function learnerKey(handle, cohortId) {
  return `${normalizeHandle(handle)}@@${String(cohortId || '').trim()}`;
}

function findLearner(roster, handle, cohortId) {
  const key = learnerKey(handle, cohortId);
  return roster.learners.find((l) => learnerKey(l.github_handle, l.cohort_id) === key) || null;
}

/**
 * Insert or update a learner, keyed on (github_handle, cohort_id). Returns a new
 * roster object (does not mutate the input) so callers can diff/compare safely.
 */
function upsertLearner(roster, entry) {
  const problems = validateLearner({
    github_handle: entry.github_handle,
    cohort_id: entry.cohort_id,
    path: entry.path || 'day1-day2',
    provision_state: entry.provision_state || 'pending',
    status: entry.status || 'awaiting-ack'
  });
  if (problems.length) {
    throw new Error(`Cannot upsert learner: ${problems.join('; ')}`);
  }
  const next = cloneRoster(roster);
  const key = learnerKey(entry.github_handle, entry.cohort_id);
  const existing = next.learners.find(
    (l) => learnerKey(l.github_handle, l.cohort_id) === key
  );
  if (existing) {
    Object.assign(existing, entry);
    return next;
  }
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
  return next;
}

function cloneRoster(roster) {
  return {
    version: 1,
    generated_at: roster.generated_at,
    cohorts: (roster.cohorts || []).map((c) => ({ ...c })),
    learners: (roster.learners || []).map((l) => ({ ...l }))
  };
}

/**
 * Serialize a roster to canonical, stable JSON: learners sorted by key so diffs
 * are minimal and reviewable in the admin repository.
 */
function serializeRoster(roster, { now = new Date() } = {}) {
  const next = cloneRoster(roster);
  next.generated_at = now.toISOString();
  next.learners.sort((a, b) =>
    learnerKey(a.github_handle, a.cohort_id).localeCompare(
      learnerKey(b.github_handle, b.cohort_id)
    )
  );
  return `${JSON.stringify(next, null, 2)}\n`;
}

/**
 * Return the entries the provisioning loop should act on: pending or failed.
 * Mirrors the algorithm guard in SPEC.md section 7.2b.
 */
function entriesToProvision(roster) {
  return roster.learners.filter(
    (l) => l.provision_state === 'pending' || l.provision_state === 'failed'
  );
}

/**
 * Public, redacted view of the roster suitable for any non-private surface.
 * Drops facilitator notes and never leaks anything beyond handle/cohort/status.
 */
function publicView(roster) {
  return {
    version: 1,
    learners: roster.learners.map((l) => ({
      github_handle: l.github_handle,
      cohort_id: l.cohort_id,
      path: l.path,
      provision_state: l.provision_state,
      status: l.status
    }))
  };
}

module.exports = {
  PROVISION_STATES,
  STATUSES,
  PATHS,
  emptyRoster,
  parseRoster,
  validateRoster,
  validateLearner,
  isValidHandle,
  normalizeHandle,
  learnerKey,
  findLearner,
  upsertLearner,
  serializeRoster,
  entriesToProvision,
  publicView
};
