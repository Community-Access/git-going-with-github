const { DatabaseSync } = require('node:sqlite');
const d = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const row = d.prepare("SELECT job_id, request_payload, length(request_payload) lp FROM ai_jobs WHERE job_id='job-cc-05-make-your-mark-4c06f4a8-e4a0-4700-8ba7-daf4716f10bf'").get();
console.log('job', row.job_id, 'payload bytes:', row.lp);
// Look for response in a separate table?
const tbls = d.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('tables:', tbls);
