const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { JobLedger } = require('../job-ledger');
const { JOB_MODE, JOB_STATUS } = require('../constants');
const { computeRequestHash } = require('../request-hash');
const { runSyncJobs } = require('../sync-runner');
const { mapBatchLinesByCustomId, pollBatches } = require('../batch-runner');
const { CircuitBreaker } = require('../retry-circuit');
const { OpenAIClient, detectProvider } = require('../openai-client');

function tempDbPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-jobs-test-'));
  return { dir, dbPath: path.join(dir, 'ai_jobs.sqlite') };
}

function insertPendingJob(ledger, overrides = {}) {
  const requestHash = computeRequestHash({
    model: 'openai/gpt-5.4',
    endpoint: '/chat/completions',
    systemPrompt: 'sys',
    userPrompt: 'usr',
    sourceChecksum: 'abc',
    generationParams: { temperature: 0.5 }
  });
  return ledger.insertOrReuseJob({
    job_id: `job-${Math.random().toString(16).slice(2)}`,
    job_type: 'unit-test',
    source_file: 'test.md',
    source_record_id: `slug-${Math.random().toString(16).slice(2)}`,
    request_hash: overrides.request_hash || requestHash,
    model: overrides.model || 'openai/gpt-5.4',
    endpoint: '/chat/completions',
    mode: overrides.mode || JOB_MODE.SYNC,
    input_tokens_estimated: 100,
    cost_estimated: 1,
    request_payload: {
      model: 'openai/gpt-5.4',
      messages: [{ role: 'system', content: 'sys' }, { role: 'user', content: 'usr' }],
      max_tokens: 200
    }
  }).job;
}

test('request hashing prevents duplicates', () => {
  const { dbPath, dir } = tempDbPath();
  const ledger = new JobLedger(dbPath);
  const hash = computeRequestHash({
    model: 'openai/gpt-5.4',
    endpoint: '/chat/completions',
    systemPrompt: 'a',
    userPrompt: 'b',
    sourceChecksum: 'c',
    generationParams: { temperature: 0.65 }
  });
  const first = ledger.insertOrReuseJob({
    job_id: 'job-a',
    job_type: 'test',
    source_file: 'x.md',
    source_record_id: 'x',
    request_hash: hash,
    model: 'openai/gpt-5.4',
    endpoint: '/chat/completions',
    mode: JOB_MODE.SYNC,
    input_tokens_estimated: 1,
    cost_estimated: 0.01,
    request_payload: {}
  }).job;
  ledger.updateJobStatus(first.job_id, JOB_STATUS.COMPLETED);
  ledger.saveResult(first.job_id, { ok: true });
  const second = ledger.insertOrReuseJob({
    job_id: 'job-b',
    job_type: 'test',
    source_file: 'x.md',
    source_record_id: 'x',
    request_hash: hash,
    model: 'openai/gpt-5.4',
    endpoint: '/chat/completions',
    mode: JOB_MODE.SYNC,
    input_tokens_estimated: 1,
    cost_estimated: 0.01,
    request_payload: {}
  });
  assert.equal(second.reused, true);
  ledger.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('retryable errors are retried', async () => {
  const { dbPath, dir } = tempDbPath();
  const ledger = new JobLedger(dbPath);
  const job = insertPendingJob(ledger);
  let calls = 0;
  const client = {
    async chatCompletions() {
      calls += 1;
      if (calls < 3) {
        const err = new Error('503');
        err.status = 503;
        throw err;
      }
      return { usage: { prompt_tokens: 10, completion_tokens: 20 }, choices: [{ message: { content: '{}' } }] };
    }
  };
  await runSyncJobs({ ledger, client, jobs: [job], maxAttempts: 4 });
  const row = ledger.getJob(job.job_id);
  assert.equal(row.status, JOB_STATUS.COMPLETED);
  assert.equal(row.attempt_count, 3);
  ledger.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('non-retryable errors are not retried', async () => {
  const { dbPath, dir } = tempDbPath();
  const ledger = new JobLedger(dbPath);
  const job = insertPendingJob(ledger);
  let calls = 0;
  const client = {
    async chatCompletions() {
      calls += 1;
      const err = new Error('401 unauthorized');
      err.status = 401;
      throw err;
    }
  };
  await runSyncJobs({ ledger, client, jobs: [job], maxAttempts: 4 });
  const row = ledger.getJob(job.job_id);
  assert.equal(calls, 1);
  assert.equal(row.status, JOB_STATUS.FAILED);
  ledger.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('batch output maps by custom_id', () => {
  const output = [
    { custom_id: 'a', response: { body: { ok: 1 } } },
    { custom_id: 'b', response: { body: { ok: 2 } } }
  ].map(item => JSON.stringify(item)).join('\n');
  const errors = [
    { custom_id: 'c', error: { code: 'x' } }
  ].map(item => JSON.stringify(item)).join('\n');
  const mapped = mapBatchLinesByCustomId(output, errors);
  assert.equal(mapped.get('b').response.body.ok, 2);
  assert.equal(mapped.get('c').error.code, 'x');
});

test('expired batch items are reported as expired', async () => {
  const { dbPath, dir } = tempDbPath();
  const ledger = new JobLedger(dbPath);
  const job = insertPendingJob(ledger, { mode: JOB_MODE.BATCH });
  ledger.updateJobStatus(job.job_id, JOB_STATUS.SUBMITTED, { batch_id: 'batch-1', custom_id: 'cid-1' });
  const client = {
    async getBatch() { return { id: 'batch-1', status: 'expired' }; }
  };
  await pollBatches({ ledger, client, pollIntervalMs: 1, maxPolls: 1 });
  const row = ledger.getJob(job.job_id);
  assert.equal(row.status, JOB_STATUS.EXPIRED);
  ledger.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('circuit breaker activates after repeated failures', () => {
  const breaker = new CircuitBreaker({ failureThreshold: 2, cooldownMs: 1000 });
  breaker.registerRetryableFailure('http-503');
  assert.equal(breaker.canProceed(), true);
  breaker.registerRetryableFailure('http-503');
  assert.equal(breaker.canProceed(), false);
  assert.equal(breaker.currentConcurrency, 2);
});

test('dry-run mode does not require API key and does not call API', () => {
  const scriptPath = path.join(process.cwd(), 'podcasts', 'llm-podcast-generator-review', 'src', 'execution', 'run-ai-jobs.js');
  const env = { ...process.env, OPENAI_API_KEY: '', OPENROUTER_API_KEY: '', OPENAI_BASE_URL: 'https://api.openai.com/v1' };
  const result = spawnSync(process.execPath, [scriptPath, '--mode', 'sync', '--dry-run'], {
    cwd: process.cwd(),
    env,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test('provider detection disables native batch on openrouter', () => {
  assert.equal(detectProvider('https://openrouter.ai/api/v1'), 'openrouter');
  assert.equal(detectProvider('https://api.openai.com/v1'), 'openai');
  const openRouterClient = new OpenAIClient({ apiKey: 'sk-or-v1-test-key', baseUrl: 'https://openrouter.ai/api/v1' });
  const openAiClient = new OpenAIClient({ apiKey: 'sk-test-key', baseUrl: 'https://api.openai.com/v1' });
  assert.equal(openRouterClient.supportsNativeBatch(), false);
  assert.equal(openAiClient.supportsNativeBatch(), true);
});
