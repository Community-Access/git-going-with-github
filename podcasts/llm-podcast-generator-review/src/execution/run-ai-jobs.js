#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { JobLedger } = require('./job-ledger');
const { OpenAIClient } = require('./openai-client');
const { runSyncJobs } = require('./sync-runner');
const { submitBatchGroups, pollBatches } = require('./batch-runner');
const { JOB_MODE, JOB_STATUS } = require('./constants');
const { writeRunReport } = require('./report');

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const EXEC_DIR = path.join(REVIEW_DIR, 'generated', 'execution');
const DB_PATH = path.join(EXEC_DIR, 'ai_jobs.sqlite');
const DEFAULT_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

function parseArgs(argv) {
  const args = {
    mode: 'sync',
    action: 'run',
    maxAttempts: Number.parseInt(process.env.PODCAST_LLM_MAX_ATTEMPTS || '4', 10),
    dryRun: false,
    dayBudgetUsd: Number.parseFloat(process.env.PODCAST_LLM_DAY_BUDGET_USD || '100'),
    runBudgetUsd: Number.parseFloat(process.env.PODCAST_LLM_RUN_BUDGET_USD || '50'),
    modelAllowlist: String(process.env.PODCAST_LLM_MODEL_ALLOWLIST || 'openai/gpt-5.4,openai/gpt-5.4-mini,openai/gpt-5.5,openai/gpt-5.5-pro,gpt-5.4,gpt-5.4-mini,gpt-5.5,gpt-5.5-pro')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean),
    pollIntervalMs: Number.parseInt(process.env.PODCAST_LLM_BATCH_POLL_MS || '30000', 10)
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--mode' && value) args.mode = value;
    else if (token === '--action' && value) args.action = value;
    else if (token === '--max-attempts' && value) args.maxAttempts = Number.parseInt(value, 10);
    else if (token === '--day-budget-usd' && value) args.dayBudgetUsd = Number.parseFloat(value);
    else if (token === '--run-budget-usd' && value) args.runBudgetUsd = Number.parseFloat(value);
    else if (token === '--poll-interval-ms' && value) args.pollIntervalMs = Number.parseInt(value, 10);
    else if (token === '--dry-run') args.dryRun = true;
  }
  return args;
}

function ensureAllowedModels(jobs, allowlist) {
  const blocked = jobs.filter(job => !allowlist.includes(job.model));
  if (blocked.length) {
    const models = [...new Set(blocked.map(job => job.model))];
    throw new Error(`Blocked by model allowlist: ${models.join(', ')}`);
  }
}

function todayRange() {
  const now = new Date();
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setUTCHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

function getJobsForRun(ledger, mode) {
  const statuses = [JOB_STATUS.PENDING, JOB_STATUS.RETRYABLE_FAILED];
  return ledger.listJobsByStatus(statuses, mode);
}

function sumEstimatedCost(jobs) {
  return jobs.reduce((sum, job) => sum + Number(job.cost_estimated || 0), 0);
}

function enforceBudget(ledger, runCostEstimate, args) {
  if (!Number.isFinite(args.runBudgetUsd) || args.runBudgetUsd <= 0) return;
  if (runCostEstimate > args.runBudgetUsd) {
    throw new Error(`Run estimate $${runCostEstimate.toFixed(6)} exceeds run budget $${args.runBudgetUsd.toFixed(6)}`);
  }
  if (!Number.isFinite(args.dayBudgetUsd) || args.dayBudgetUsd <= 0) return;
  const { start, end } = todayRange();
  const spentRows = ledger.db.prepare(`
    SELECT cost_actual FROM ai_jobs
    WHERE completed_at >= ? AND completed_at <= ? AND status = ?
  `).all(start, end, JOB_STATUS.COMPLETED);
  const spentToday = spentRows.reduce((sum, row) => sum + Number(row.cost_actual || 0), 0);
  if ((spentToday + runCostEstimate) > args.dayBudgetUsd) {
    throw new Error(`Day budget exceeded. spent=$${spentToday.toFixed(6)} + estimate=$${runCostEstimate.toFixed(6)} > $${args.dayBudgetUsd.toFixed(6)}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(EXEC_DIR, { recursive: true });
  const ledger = new JobLedger(DB_PATH);
  const runId = `run-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const mode = args.mode === 'batch' ? JOB_MODE.BATCH : JOB_MODE.SYNC;

  const jobs = getJobsForRun(ledger, mode);
  if (!jobs.length) {
    console.log(`No ${mode} jobs pending.`);
    ledger.close();
    return;
  }
  ensureAllowedModels(jobs, args.modelAllowlist);
  const runCostEstimate = sumEstimatedCost(jobs);
  enforceBudget(ledger, runCostEstimate, args);

  const run = {
    run_id: runId,
    mode,
    model: jobs.length === 1 ? jobs[0].model : 'mixed'
  };
  ledger.createRun(run);

  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY || '';
  if (!apiKey && !args.dryRun) {
    throw new Error('Missing OPENAI_API_KEY/OPENROUTER_API_KEY');
  }
  const client = args.dryRun ? null : new OpenAIClient({ apiKey, baseUrl: DEFAULT_BASE_URL });

  if (args.dryRun) {
    console.log(`[DRY-RUN] mode=${mode} jobs=${jobs.length} estimatedCost=$${runCostEstimate.toFixed(6)}`);
    const reportPath = writeRunReport({
      outputDir: path.join(EXEC_DIR, 'reports'),
      run: {
        ...run,
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      },
      jobs
    });
    ledger.completeRun(runId, { summaryPath: null, reportPath });
    ledger.close();
    return;
  }

  if (mode === JOB_MODE.SYNC && args.action === 'run') {
    await runSyncJobs({
      ledger,
      client,
      jobs,
      maxAttempts: args.maxAttempts
    });
  } else if (mode === JOB_MODE.BATCH && client && !client.supportsNativeBatch()) {
    console.warn('[WARN] Provider does not expose native Batch API at this base URL. Using durable sync fallback for batch jobs.');
    await runSyncJobs({
      ledger,
      client,
      jobs,
      maxAttempts: args.maxAttempts
    });
  } else if (mode === JOB_MODE.BATCH && (args.action === 'run' || args.action === 'submit')) {
    const submissions = await submitBatchGroups({
      ledger,
      client,
      jobs,
      outputDir: path.join(EXEC_DIR, 'batch-inputs'),
      dryRun: false
    });
    console.log(`Submitted ${submissions.length} batch group(s).`);
  } else if (mode === JOB_MODE.BATCH && (args.action === 'poll' || args.action === 'resume')) {
    const summaries = await pollBatches({
      ledger,
      client,
      pollIntervalMs: args.pollIntervalMs
    });
    console.log(`Polled ${summaries.length} batch(es).`);
  } else {
    throw new Error(`Unsupported combination: mode=${mode}, action=${args.action}`);
  }

  const postJobs = ledger.db.prepare('SELECT * FROM ai_jobs').all();
  const reportPath = writeRunReport({
    outputDir: path.join(EXEC_DIR, 'reports'),
    run: {
      ...run,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    },
    jobs: postJobs
  });
  ledger.completeRun(runId, {
    summaryPath: null,
    reportPath
  });
  console.log(`Run report: ${reportPath}`);
  ledger.close();
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}
