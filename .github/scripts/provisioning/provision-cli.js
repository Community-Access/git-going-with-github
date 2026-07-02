#!/usr/bin/env node
/**
 * Provisioning CLI: the standalone runner for the owned, GitHub-native
 * provisioning subsystem. Reads the roster of record, provisions every
 * pending/failed learner idempotently, writes the roster back, and appends to
 * the provisioning log. See SPEC.md sections 7 and 16, and admin/OWNED_PROVISIONING.md.
 *
 * Modes (PROVISIONING_MODE):
 *   github-app  (production)  mints a short-lived installation token from
 *                             PROVISIONING_APP_ID + PROVISIONING_APP_PRIVATE_KEY
 *                             + PROVISIONING_APP_INSTALLATION_ID.
 *   actions-bot (Phase 1 spike only) uses PROVISIONING_TOKEN, a least-privilege
 *                             fine-grained PAT.
 *
 * Usage:
 *   node provision-cli.js --roster path/to/roster.json [--log path/to/log.json] [--dry-run]
 *
 * No third-party dependencies: uses Node built-ins and global fetch.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { parseRoster, serializeRoster } = require('./roster');
const { provisionRoster } = require('./provision-core');
const { createFetchClient, REQUIRED_WORKFLOWS } = require('./github-client');
const { createChallengeSeeder } = require('./seed-first-challenge');
const { mintInstallationToken, discoverInstallationId } = require('./github-app-auth');

function parseArgs(argv) {
  const args = { dryRun: false, checkAuth: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--roster') args.roster = argv[++i];
    else if (a === '--log') args.log = argv[++i];
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--check-auth') args.checkAuth = true;
    else if (a === '--help' || a === '-h') args.help = true;
  }
  return args;
}

function usage() {
  return [
    'Usage: node provision-cli.js --roster <file> [--log <file>] [--dry-run]',
    '       node provision-cli.js --check-auth',
    '',
    '--check-auth mints a token and verifies the template repo is reachable,',
    'then exits. Use it as a credentials health check; it makes no changes.',
    '',
    'Environment:',
    '  PROVISIONING_MODE                github-app | actions-bot',
    '  LEARNING_ROOM_TEMPLATE_REPO      owner/name of the template (required)',
    '  PROVISIONING_STUDENT_OWNER       org/user that owns student repos (required)',
    '  GITHUB_API_URL                   default https://api.github.com',
    '  github-app mode:',
    '    PROVISIONING_APP_ID',
    '    PROVISIONING_APP_PRIVATE_KEY            (PEM, or @path to a PEM file)',
    '    PROVISIONING_APP_INSTALLATION_ID        (optional; discovered from the',
    '                                             App installations when unset)',
    '  actions-bot mode:',
    '    PROVISIONING_TOKEN'
  ].join('\n');
}

function readPrivateKey(value) {
  if (!value) return value;
  if (value.startsWith('@')) {
    return fs.readFileSync(value.slice(1), 'utf8');
  }
  // Support keys passed with literal \n escapes (common in CI secrets).
  return value.includes('\\n') && !value.includes('\n')
    ? value.replace(/\\n/g, '\n')
    : value;
}

async function resolveToken(env, apiBaseUrl, deps = {}) {
  const mode = env.PROVISIONING_MODE || 'github-app';
  if (mode === 'actions-bot') {
    if (!env.PROVISIONING_TOKEN) throw new Error('actions-bot mode requires PROVISIONING_TOKEN');
    return env.PROVISIONING_TOKEN;
  }
  if (mode === 'github-app') {
    const appId = env.PROVISIONING_APP_ID;
    const privateKey = readPrivateKey(env.PROVISIONING_APP_PRIVATE_KEY);
    const fetchImpl = deps.fetchImpl || fetch;
    let installationId = String(env.PROVISIONING_APP_INSTALLATION_ID || '').trim();
    if (!installationId) {
      // No stored ID: discover it from the App's installations. This removes a
      // copy-paste failure mode and survives App re-installation.
      installationId = await discoverInstallationId({
        appId,
        privateKey,
        owner: env.PROVISIONING_STUDENT_OWNER,
        apiBaseUrl,
        fetchImpl
      });
    }
    const { token } = await mintInstallationToken({
      appId,
      privateKey,
      installationId,
      apiBaseUrl,
      fetchImpl
    });
    return token;
  }
  throw new Error(`Unknown PROVISIONING_MODE: ${mode}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.roster && !args.checkAuth)) {
    process.stdout.write(`${usage()}\n`);
    process.exit(args.help ? 0 : 2);
  }

  const env = process.env;
  const apiBaseUrl = env.GITHUB_API_URL || 'https://api.github.com';
  const templateRepoFull = env.LEARNING_ROOM_TEMPLATE_REPO;
  const studentOwner = env.PROVISIONING_STUDENT_OWNER;
  if (!templateRepoFull) throw new Error('LEARNING_ROOM_TEMPLATE_REPO is required');
  if (!studentOwner) throw new Error('PROVISIONING_STUDENT_OWNER is required');
  const [templateOwner, templateRepo] = templateRepoFull.split('/');
  if (!templateOwner || !templateRepo) {
    throw new Error('LEARNING_ROOM_TEMPLATE_REPO must be owner/name');
  }

  if (args.checkAuth) {
    const token = await resolveToken(env, apiBaseUrl);
    const client = createFetchClient({ token, apiBaseUrl });
    const templateVisible = await client.repoExists({
      owner: templateOwner,
      repo: templateRepo
    });
    if (!templateVisible) {
      throw new Error(
        `Auth check failed: token minted but cannot see ${templateRepoFull}. ` +
          'Check the App installation repository access and Contents permission.'
      );
    }
    process.stdout.write(
      `Auth check OK: token minted and template ${templateRepoFull} is reachable.\n`
    );
    return;
  }

  const rosterJson = fs.readFileSync(args.roster, 'utf8');
  const roster = parseRoster(rosterJson);

  if (args.dryRun) {
    const { entriesToProvision } = require('./roster');
    const targets = entriesToProvision(roster);
    process.stdout.write(
      `Dry run: ${targets.length} learner(s) would be provisioned:\n` +
        targets.map((t) => `  - ${t.github_handle} (${t.cohort_id})`).join('\n') +
        '\n'
    );
    return;
  }

  const token = await resolveToken(env, apiBaseUrl);
  // The seeder runs the learning-room progression script from this checkout,
  // so provisioned rooms start with their Challenge 1 issue already open.
  const seeder = createChallengeSeeder({
    token,
    learningRoomDir: path.join(__dirname, '..', '..', '..', 'learning-room')
  });
  const client = { ...createFetchClient({ token, apiBaseUrl }), ...seeder };

  // Preflight: fail with one clear message if the token cannot even see the
  // template, instead of a confusing per-learner error cascade.
  const templateVisible = await client.repoExists({
    owner: templateOwner,
    repo: templateRepo
  });
  if (!templateVisible) {
    throw new Error(
      `Preflight failed: cannot see template ${templateRepoFull} with the minted token. ` +
        'Check the App installation repository access and Contents permission.'
    );
  }

  const { roster: updated, log, summary } = await provisionRoster({
    roster,
    client,
    config: {
      studentOwner,
      templateOwner,
      templateRepo,
      requiredWorkflows: REQUIRED_WORKFLOWS
    },
    logger: (msg) => process.stdout.write(`${msg}\n`)
  });

  fs.writeFileSync(args.roster, serializeRoster(updated));

  if (args.log) {
    appendLog(args.log, log);
  }

  process.stdout.write(`\nProvisioning summary: ${JSON.stringify(summary)}\n`);
  if (summary.error > 0) {
    process.exitCode = 1;
  }
}

function appendLog(logPath, entries) {
  let existing = [];
  if (fs.existsSync(logPath)) {
    const raw = fs.readFileSync(logPath, 'utf8').trim();
    if (raw) existing = JSON.parse(raw);
  } else {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }
  const merged = existing.concat(entries);
  fs.writeFileSync(logPath, `${JSON.stringify(merged, null, 2)}\n`);
}

if (require.main === module) {
  main().catch((err) => {
    process.stderr.write(`Provisioning failed: ${err.message}\n`);
    process.exit(1);
  });
}

module.exports = { parseArgs, resolveToken, readPrivateKey, usage };
