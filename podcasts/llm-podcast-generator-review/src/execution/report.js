const fs = require('fs');
const path = require('path');
const { summarizeCosts } = require('./cost-estimator');

function countBy(items, field) {
  const map = new Map();
  for (const item of items) {
    const key = item[field] || 'unknown';
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function recommendNextAction(stats) {
  if (stats.retryableFailures > 0) return 'Re-run in resume mode to retry retryable failures.';
  if (stats.expiredJobs > 0) return 'Resubmit expired batch jobs.';
  if (stats.failedJobs > 0) return 'Inspect failed job errors and resolve non-retryable conditions.';
  return 'No action required.';
}

function buildRunReport({ run, jobs }) {
  const started = run.started_at || new Date().toISOString();
  const completed = run.completed_at || new Date().toISOString();
  const total = jobs.length;
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const failedJobs = jobs.filter(job => job.status === 'failed').length;
  const retryableFailures = jobs.filter(job => job.status === 'retryable_failed').length;
  const expiredJobs = jobs.filter(job => job.status === 'expired').length;
  const costs = summarizeCosts(jobs);
  const topErrors = countBy(jobs.filter(job => job.error_code), 'error_code').slice(0, 10);
  const mode = run.mode || 'unknown';
  const model = run.model || 'mixed';

  const lines = [
    '# AI Execution Run Report',
    '',
    `- Started: ${started}`,
    `- Completed: ${completed}`,
    `- Model: ${model}`,
    `- Mode: ${mode}`,
    `- Total jobs: ${total}`,
    `- Completed jobs: ${completedJobs}`,
    `- Failed jobs: ${failedJobs}`,
    `- Retryable failures: ${retryableFailures}`,
    `- Expired jobs: ${expiredJobs}`,
    `- Estimated cost: $${costs.estimated.toFixed(6)}`,
    `- Actual cost: $${costs.actual.toFixed(6)}`,
    '',
    '## Top error codes',
    ''
  ];

  if (!topErrors.length) lines.push('- none');
  else topErrors.forEach(([code, count]) => lines.push(`- ${code}: ${count}`));

  lines.push('', `## Recommended next action`, '', `- ${recommendNextAction({ retryableFailures, expiredJobs, failedJobs })}`, '');
  return lines.join('\n');
}

function writeRunReport({ outputDir, run, jobs }) {
  fs.mkdirSync(outputDir, { recursive: true });
  const reportPath = path.join(outputDir, `${run.run_id}.md`);
  const content = buildRunReport({ run, jobs });
  fs.writeFileSync(reportPath, content, 'utf8');
  return reportPath;
}

module.exports = {
  buildRunReport,
  writeRunReport
};
