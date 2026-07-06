#!/usr/bin/env node
/**
 * Sync enrollment intake issues into the roster of record.
 *
 * The registration workflow stores each [ENROLL] submission as an
 * "[ENROLL-INTAKE] ..." issue in the private admin repository. Until now a
 * human had to hand-copy those into roster.json before provisioning could see
 * them - the manual hop that left enrollees unprovisioned. This script closes
 * that gap: it reads the open intake issues, upserts a `pending` roster entry
 * for each new learner (idempotent on github_handle + cohort_id, and it never
 * touches an existing entry), and writes the roster back for the provisioning
 * loop to act on.
 *
 * Pure parsing/merge logic is exported for unit tests; only main() touches the
 * network, using the same injected-fetch style as the rest of the subsystem.
 *
 * Usage:
 *   node sync-intake-to-roster.js --roster path/to/roster.json
 *
 * Environment:
 *   INTAKE_REPO               owner/name of the private admin repo (required)
 *   INTAKE_TOKEN              token that can read issues in INTAKE_REPO (required)
 *   PROVISIONING_COHORT_ID    cohort to enroll new learners into (required)
 *   GITHUB_API_URL            default https://api.github.com
 */

'use strict';

const fs = require('node:fs');

const { parseRoster, serializeRoster, findLearner, upsertLearner, isValidHandle } =
  require('./roster');

const INTAKE_TITLE_PREFIX = '[ENROLL-INTAKE]';

/**
 * Extract { github_handle, registered_at } from an intake issue, or null when
 * the issue is not a parseable intake record.
 */
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

/**
 * Merge intake issues into the roster. Returns { roster, added, skipped }.
 * Existing learners (any provision_state) are never modified, so a re-run or a
 * duplicate submission can never reset someone who is already provisioned.
 */
function syncIntakeToRoster({ roster, intakeIssues, cohortId }) {
  if (!cohortId) throw new Error('syncIntakeToRoster requires cohortId');
  let next = {
    version: 1,
    generated_at: roster.generated_at,
    cohorts: (roster.cohorts || []).map((c) => ({ ...c })),
    learners: (roster.learners || []).map((l) => ({ ...l }))
  };
  const added = [];
  const skipped = [];

  for (const issue of intakeIssues || []) {
    const parsed = parseIntakeIssue(issue);
    if (!parsed) {
      if (issue && issue.title && String(issue.title).startsWith(INTAKE_TITLE_PREFIX)) {
        skipped.push({ number: issue.number, reason: 'unparseable intake issue' });
      }
      continue;
    }
    if (findLearner(next, parsed.github_handle, cohortId)) {
      continue; // already known (pending, provisioned, or otherwise) - leave untouched
    }
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
    added.push(parsed.github_handle);
  }

  if (added.length && !next.cohorts.some((c) => c.cohort_id === cohortId)) {
    next.cohorts.push({ cohort_id: cohortId, label: 'Self-paced enrollment' });
  }

  return { roster: next, added, skipped };
}

async function fetchOpenIntakeIssues({ repoFull, token, apiBaseUrl, fetchImpl = fetch }) {
  const baseUrl = String(apiBaseUrl || 'https://api.github.com').replace(/\/+$/, '');
  const issues = [];
  for (let page = 1; page <= 10; page += 1) {
    const res = await fetchImpl(
      `${baseUrl}/repos/${repoFull}/issues?state=open&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'glow-provisioning'
        }
      }
    );
    if (res.status !== 200) {
      const detail = await res.text();
      throw new Error(`Failed to list intake issues (HTTP ${res.status}): ${detail}`);
    }
    const batch = await res.json();
    for (const issue of batch) {
      if (!issue.pull_request) issues.push(issue);
    }
    if (batch.length < 100) break;
  }
  return issues;
}

async function main() {
  const rosterFlag = process.argv.indexOf('--roster');
  const rosterPath = rosterFlag >= 0 ? process.argv[rosterFlag + 1] : null;
  if (!rosterPath) {
    process.stderr.write('Usage: node sync-intake-to-roster.js --roster <file>\n');
    process.exit(2);
  }
  const env = process.env;
  const repoFull = env.INTAKE_REPO;
  const token = env.INTAKE_TOKEN;
  const cohortId = env.PROVISIONING_COHORT_ID;
  if (!repoFull || !repoFull.includes('/')) throw new Error('INTAKE_REPO (owner/name) is required');
  if (!token) throw new Error('INTAKE_TOKEN is required');
  if (!cohortId) throw new Error('PROVISIONING_COHORT_ID is required');

  const roster = parseRoster(fs.readFileSync(rosterPath, 'utf8'));
  const intakeIssues = await fetchOpenIntakeIssues({
    repoFull,
    token,
    apiBaseUrl: env.GITHUB_API_URL
  });

  const { roster: updated, added, skipped } = syncIntakeToRoster({
    roster,
    intakeIssues,
    cohortId
  });

  if (added.length) {
    fs.writeFileSync(rosterPath, serializeRoster(updated));
  }
  process.stdout.write(
    `Intake sync: ${added.length} new learner(s) added to roster` +
      (added.length ? ` (${added.join(', ')})` : '') +
      `; ${skipped.length} unparseable intake issue(s).\n`
  );
  for (const s of skipped) {
    process.stdout.write(`  Warning: intake issue #${s.number}: ${s.reason}\n`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    process.stderr.write(`Intake sync failed: ${err.message}\n`);
    process.exit(1);
  });
}

module.exports = { parseIntakeIssue, syncIntakeToRoster, fetchOpenIntakeIssues };
