const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const cols = db.prepare("PRAGMA table_info(ai_job_results)").all();
console.log('ai_job_results columns:', cols.map(c => c.name).join(', '));
const row = db.prepare(`
  SELECT j.source_record_id AS slug, j.status, j.output_tokens_actual, j.cost_actual,
         r.response_body IS NOT NULL AS has_response,
         LENGTH(r.response_body) AS payload_bytes
  FROM ai_jobs j
  LEFT JOIN ai_job_results r ON r.job_id = j.job_id
  WHERE j.model = 'openai/gpt-5.5' AND j.status = 'completed'
  ORDER BY j.updated_at DESC
  LIMIT 6
`).all();
console.log('Completed gpt-5.5 jobs (with payload presence):');
for (const r of row) console.log(' ', String(r.slug).padEnd(28), 'tokens=' + String(r.output_tokens_actual).padStart(5), 'payload_bytes=' + r.payload_bytes);
