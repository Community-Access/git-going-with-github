/**
 * Owned progress of record for the GLOW workshop.
 *
 * Progress is never authored by a vendor. It is *derived* from deterministic
 * signals the project controls: challenge issue state, PR closing keywords,
 * labels, and the plain-text signals `ack` and `day1-complete`. See SPEC.md
 * section 6.2. Re-running this over the same signals yields the same status,
 * so the roster status column is always reconstructable.
 *
 * Pure and synchronous: the caller supplies an already-collected snapshot of
 * signals (typically gathered by the workflow via the GitHub API) and gets back
 * a derived status plus the evidence behind it.
 */

'use strict';

const CHALLENGE_TITLE_RE = /challenge\s+(\d+)/i;
const CLOSES_RE = /\b(?:closes|fixes|resolves)\s+#(\d+)/gi;

function hasTextSignal(comments, signal) {
  const needle = String(signal).toLowerCase();
  return (comments || []).some((c) => {
    const body = String((c && c.body) || '').toLowerCase();
    // Match the signal as a standalone token so "acknowledge" never fires "ack".
    return new RegExp(`(^|[^a-z0-9-])${escapeRegExp(needle)}([^a-z0-9-]|$)`).test(body);
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasLabel(labels, name) {
  const target = String(name).toLowerCase();
  return (labels || []).some((l) => {
    const value = typeof l === 'string' ? l : (l && l.name);
    return String(value || '').toLowerCase() === target;
  });
}

function challengeNumberFromTitle(title) {
  const match = String(title || '').match(CHALLENGE_TITLE_RE);
  return match ? Number(match[1]) : null;
}

/**
 * Count distinct completed (closed) challenge issues from an issues snapshot.
 * snapshot.issues: array of { title, state, labels }.
 */
function completedChallenges(issues) {
  const done = new Set();
  for (const issue of issues || []) {
    if (String(issue.state).toLowerCase() !== 'closed') continue;
    const n = challengeNumberFromTitle(issue.title);
    if (n !== null) done.add(n);
  }
  return [...done].sort((a, b) => a - b);
}

/**
 * Extract issue numbers a PR body closes via closing keywords.
 */
function closedIssueRefs(prBody) {
  const refs = new Set();
  let match;
  const re = new RegExp(CLOSES_RE);
  while ((match = re.exec(String(prBody || ''))) !== null) {
    refs.add(Number(match[1]));
  }
  return [...refs];
}

/**
 * Derive a learner's status from a signals snapshot.
 *
 * snapshot = {
 *   path: 'day1-day2' | 'day2-only',
 *   comments: [{ body }],            // issue/PR comments in the learner repo
 *   labels: [{ name } | string],     // labels on the enrollment/tracking issue
 *   issues: [{ title, state, labels }]
 * }
 *
 * Returns { status, evidence: { acked, day1Complete, day2Released, completedChallenges } }.
 * The precedence intentionally walks the journey forward, latest milestone wins.
 */
function deriveStatus(snapshot) {
  const path = snapshot.path || 'day1-day2';
  const comments = snapshot.comments || [];
  const labels = snapshot.labels || [];
  const issues = snapshot.issues || [];

  const acked = hasTextSignal(comments, 'ack') || hasLabel(labels, 'acked');
  const day1Complete =
    hasTextSignal(comments, 'day1-complete') || hasLabel(labels, 'day1-complete');
  const day2Released = hasLabel(labels, 'day2-released');
  const needsInfo = hasLabel(labels, 'needs-info');
  const done = completedChallenges(issues);

  let status;
  if (needsInfo) {
    status = 'needs-info';
  } else if (day2Released) {
    status = 'day2-released';
  } else if (day1Complete || path === 'day2-only') {
    status = 'day1-complete';
  } else if (acked || done.length > 0) {
    status = 'active-day1';
  } else {
    status = 'awaiting-ack';
  }

  return {
    status,
    evidence: {
      acked,
      day1Complete,
      day2Released,
      needsInfo,
      completedChallenges: done
    }
  };
}

/**
 * Whether a learner is eligible for the Day 2 release. Eligible when Day 1 is
 * complete (or they are a day2-only learner) and Day 2 has not been released yet.
 */
function isDay2Eligible(snapshot) {
  const { status } = deriveStatus(snapshot);
  return status === 'day1-complete';
}

module.exports = {
  deriveStatus,
  isDay2Eligible,
  completedChallenges,
  closedIssueRefs,
  challengeNumberFromTitle,
  hasTextSignal,
  hasLabel
};
