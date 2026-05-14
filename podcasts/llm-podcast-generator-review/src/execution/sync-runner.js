const { JOB_STATUS } = require('./constants');
const { classifyError, backoffDelayMs, parseRetryAfterMs, CircuitBreaker } = require('./retry-circuit');
const { estimateJobCost } = require('./cost-estimator');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSyncJobs({
  ledger,
  client,
  jobs,
  maxAttempts = 4
}) {
  const breaker = new CircuitBreaker();
  const results = [];

  for (const job of jobs) {
    const dedupe = ledger.findCompletedByHash(job.request_hash, job.mode);
    if (dedupe) {
      results.push({ job_id: dedupe.job_id, reused: true });
      continue;
    }
    let attempt = 0;
    let completed = false;

    while (attempt < maxAttempts && !completed) {
      if (!breaker.canProceed()) {
        const pauseMs = breaker.openUntil - Date.now();
        if (pauseMs > 0) {
          console.log(`[WARN] Circuit breaker open, pausing sync requests for ${Math.ceil(pauseMs / 1000)}s`);
          await sleep(pauseMs);
        }
      }

      attempt += 1;
      const startedAt = new Date().toISOString();
      try {
        ledger.updateJobStatus(job.job_id, JOB_STATUS.IN_PROGRESS, { attempt_count: attempt });
        const payload = JSON.parse(job.request_payload || '{}');
        const response = await client.chatCompletions(payload);
        const usage = response.usage || {};
        const outputTokens = Number(usage.completion_tokens || 0);
        const actualCost = estimateJobCost({
          model: job.model,
          inputTokens: Number(usage.prompt_tokens || job.input_tokens_estimated || 0),
          outputTokens
        }) || 0;
        ledger.saveResult(job.job_id, response);
        ledger.recordAttempt({
          job_id: job.job_id,
          attempt_number: attempt,
          status_code: 200,
          retryable: false,
          error_code: null,
          error_message: null,
          started_at: startedAt,
          finished_at: new Date().toISOString()
        });
        ledger.updateJobStatus(job.job_id, JOB_STATUS.COMPLETED, {
          attempt_count: attempt,
          output_tokens_actual: outputTokens,
          cost_actual: actualCost,
          error_code: null,
          error_message: null
        });
        breaker.registerSuccess();
        completed = true;
        results.push({ job_id: job.job_id, reused: false, completed: true });
      } catch (error) {
        const classification = classifyError(error);
        const code = error.status ? `HTTP_${error.status}` : classification.reason;
        ledger.recordAttempt({
          job_id: job.job_id,
          attempt_number: attempt,
          status_code: error.status || null,
          retryable: classification.retryable,
          error_code: code,
          error_message: String(error.message || error),
          started_at: startedAt,
          finished_at: new Date().toISOString()
        });
        if (!classification.retryable || attempt >= maxAttempts) {
          ledger.updateJobStatus(job.job_id, classification.retryable ? JOB_STATUS.RETRYABLE_FAILED : JOB_STATUS.FAILED, {
            attempt_count: attempt,
            error_code: code,
            error_message: String(error.message || error)
          });
          results.push({ job_id: job.job_id, completed: false, error: String(error.message || error) });
          break;
        }
        breaker.registerRetryableFailure(classification.reason);
        const retryAfterMs = parseRetryAfterMs(error.headers);
        const waitMs = retryAfterMs || backoffDelayMs(attempt);
        await sleep(waitMs);
      }
    }
  }

  return results;
}

module.exports = {
  runSyncJobs
};
