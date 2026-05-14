const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { JOB_STATUS } = require('./constants');
const { classifyError } = require('./retry-circuit');
const { estimateJobCost } = require('./cost-estimator');

function parseJsonl(text) {
  return String(text || '').split('\n').map(line => line.trim()).filter(Boolean).map(line => JSON.parse(line));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uniqueId(prefix = 'job') {
  return `${prefix}-${crypto.randomUUID()}`;
}

function groupJobsForBatch(jobs) {
  const groups = new Map();
  for (const job of jobs) {
    const key = `${job.model}::${job.endpoint}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(job);
  }
  return [...groups.values()];
}

function buildBatchLine(job) {
  const payload = JSON.parse(job.request_payload || '{}');
  return {
    custom_id: job.custom_id || uniqueId(job.job_id),
    method: 'POST',
    url: job.endpoint,
    body: payload
  };
}

function mapBatchLinesByCustomId(outputText, errorText) {
  const outputLines = parseJsonl(outputText);
  const errorLines = parseJsonl(errorText);
  const byCustomId = new Map();
  for (const line of outputLines) byCustomId.set(line.custom_id, line);
  for (const line of errorLines) byCustomId.set(line.custom_id, line);
  return byCustomId;
}

async function submitBatchGroups({
  ledger,
  client,
  jobs,
  outputDir,
  dryRun = false
}) {
  const groups = groupJobsForBatch(jobs);
  const submissions = [];

  fs.mkdirSync(outputDir, { recursive: true });
  for (const group of groups) {
    const lines = group.map(buildBatchLine);
    const jsonl = lines.map(line => JSON.stringify(line)).join('\n') + '\n';
    const model = group[0].model;
    const endpoint = group[0].endpoint;
    const fileName = `${model.replace(/[^\w.-]/g, '_')}-${Date.now()}.jsonl`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, jsonl, 'utf8');

    if (dryRun) {
      submissions.push({ dryRun: true, model, endpoint, count: group.length, filePath });
      continue;
    }

    const uploaded = await client.uploadBatchInput(fileName, jsonl);
    const batch = await client.createBatch({
      inputFileId: uploaded.id,
      endpoint,
      completionWindow: '24h',
      metadata: { model, count: String(group.length) }
    });
    for (const [index, job] of group.entries()) {
      const customId = lines[index].custom_id;
      ledger.updateJobStatus(job.job_id, JOB_STATUS.SUBMITTED, {
        batch_id: batch.id,
        custom_id: customId
      });
    }
    submissions.push({ dryRun: false, model, endpoint, count: group.length, batchId: batch.id, inputFileId: uploaded.id });
  }

  return submissions;
}

async function pollBatches({
  ledger,
  client,
  pollIntervalMs = 30000,
  maxPolls = 240
}) {
  const jobs = ledger.listJobsByStatus([JOB_STATUS.SUBMITTED, JOB_STATUS.IN_PROGRESS], 'batch');
  const batchIds = [...new Set(jobs.map(job => job.batch_id).filter(Boolean))];
  const summaries = [];

  for (const batchId of batchIds) {
    let pollCount = 0;
    let batch = null;
    while (pollCount < maxPolls) {
      pollCount += 1;
      batch = await client.getBatch(batchId);
      const status = String(batch.status || '').toLowerCase();
      if (status === 'completed' || status === 'failed' || status === 'expired' || status === 'cancelled') break;
      for (const job of jobs.filter(item => item.batch_id === batchId)) {
        ledger.updateJobStatus(job.job_id, JOB_STATUS.IN_PROGRESS);
      }
      await sleep(pollIntervalMs);
    }

    if (!batch) continue;
    const status = String(batch.status || '').toLowerCase();
    if (status === 'completed') {
      const outputText = batch.output_file_id ? await client.getFileContent(batch.output_file_id) : '';
      const errorText = batch.error_file_id ? await client.getFileContent(batch.error_file_id) : '';
      const byCustomId = mapBatchLinesByCustomId(outputText, errorText);
      const related = jobs.filter(job => job.batch_id === batchId);
      for (const job of related) {
        const line = byCustomId.get(job.custom_id);
        if (!line) {
          ledger.updateJobStatus(job.job_id, JOB_STATUS.EXPIRED, { error_code: 'BATCH_MISSING_RESULT', error_message: 'No output line for custom_id' });
          continue;
        }
        const body = line.response && line.response.body ? line.response.body : null;
        const lineError = line.error || (line.response && line.response.error);
        if (lineError) {
          const classification = classifyError({ status: line.response && line.response.status_code, message: JSON.stringify(lineError) });
          ledger.updateJobStatus(job.job_id, classification.retryable ? JOB_STATUS.RETRYABLE_FAILED : JOB_STATUS.FAILED, {
            error_code: String((lineError.code || '') || (line.response && line.response.status_code) || 'BATCH_ERROR'),
            error_message: JSON.stringify(lineError)
          });
          continue;
        }
        const usage = body && body.usage ? body.usage : {};
        const outputTokens = Number(usage.completion_tokens || 0);
        const actualCost = estimateJobCost({
          model: job.model,
          inputTokens: Number(usage.prompt_tokens || job.input_tokens_estimated || 0),
          outputTokens
        }) || 0;
        ledger.saveResult(job.job_id, line);
        ledger.updateJobStatus(job.job_id, JOB_STATUS.COMPLETED, {
          output_tokens_actual: outputTokens,
          cost_actual: actualCost,
          error_code: null,
          error_message: null
        });
      }
      summaries.push({ batchId, status, outputFileId: batch.output_file_id, errorFileId: batch.error_file_id });
      continue;
    }

    const related = jobs.filter(job => job.batch_id === batchId);
    const targetStatus = status === 'expired' ? JOB_STATUS.EXPIRED : (status === 'cancelled' ? JOB_STATUS.CANCELLED : JOB_STATUS.RETRYABLE_FAILED);
    for (const job of related) {
      ledger.updateJobStatus(job.job_id, targetStatus, {
        error_code: `BATCH_${status.toUpperCase()}`,
        error_message: `Batch ${batchId} ended with status ${status}`
      });
    }
    summaries.push({ batchId, status });
  }

  return summaries;
}

module.exports = {
  submitBatchGroups,
  pollBatches,
  mapBatchLinesByCustomId
};
