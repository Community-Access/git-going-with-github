const { DatabaseSync } = require('node:sqlite');
const d = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const counts = d.prepare("SELECT status, COUNT(*) c FROM ai_jobs WHERE model='openai/gpt-5.5' GROUP BY status").all();
console.log('=== gpt-5.5 status counts ===');
for (const r of counts) console.log(r.status.padEnd(14), r.c);
const pending = d.prepare("SELECT source_record_id, status, error_code, updated_at FROM ai_jobs WHERE model='openai/gpt-5.5' AND status != 'completed' ORDER BY updated_at DESC").all();
console.log('\n=== non-completed ===');
for (const r of pending) console.log(r.status.padEnd(12), (r.error_code || '').padEnd(20), r.source_record_id);
