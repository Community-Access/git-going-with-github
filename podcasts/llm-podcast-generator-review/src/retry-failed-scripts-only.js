#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..', '..');
const SCRIPTS_ONLY_SCRIPT = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review', 'src', 'generate-scripts-only.js');

function parseArgs(argv) {
  const args = {
    summary: null,
    model: process.env.PODCAST_LLM_MODEL || 'openai/gpt-5.4',
    retries: Number.parseInt(process.env.PODCAST_LLM_RETRIES || '3', 10),
    retryDelayMs: Number.parseInt(process.env.PODCAST_LLM_RETRY_DELAY_MS || '2000', 10),
    maxRepairAttempts: Number.parseInt(process.env.PODCAST_LLM_MAX_REPAIR_ATTEMPTS || '4', 10)
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--summary' && value) args.summary = value;
    else if (token === '--model' && value) args.model = value;
    else if (token === '--retries' && value) args.retries = Number.parseInt(value, 10);
    else if (token === '--retry-delay-ms' && value) args.retryDelayMs = Number.parseInt(value, 10);
    else if (token === '--max-repair-attempts' && value) args.maxRepairAttempts = Number.parseInt(value, 10);
  }
  return args;
}

function resolveSummaryPath(summaryArg) {
  if (!summaryArg) throw new Error('Provide --summary <summary.json>');
  return path.isAbsolute(summaryArg) ? summaryArg : path.join(ROOT, summaryArg);
}

function runNode(args) {
  return execFileSync(process.execPath, [SCRIPTS_ONLY_SCRIPT, ...args], {
    cwd: ROOT,
    stdio: 'inherit',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 32
  });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const summaryPath = resolveSummaryPath(args.summary);
  if (!fs.existsSync(summaryPath)) {
    throw new Error(`Summary not found: ${summaryPath}`);
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  const failures = (summary.results || [])
    .filter(item => item.status === 'error')
    .map(item => item.slug)
    .filter(Boolean);

  if (!failures.length) {
    console.log('No failed slugs found in summary. Nothing to retry.');
    return;
  }

  console.log(`Retrying ${failures.length} failed slugs from: ${summaryPath}`);
  runNode([
    '--model', args.model,
    '--retries', String(args.retries),
    '--retry-delay-ms', String(args.retryDelayMs),
    '--max-repair-attempts', String(args.maxRepairAttempts),
    ...failures.flatMap(slug => ['--slug', slug])
  ]);
}

if (require.main === module) {
  main();
}
