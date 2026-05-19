const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const rows = db.prepare("SELECT source_record_id, completed_at FROM ai_jobs WHERE status='completed' AND model='openai/gpt-5.5' ORDER BY completed_at").all();
for (const r of rows) console.log(r.completed_at, r.source_record_id);
console.log('COUNT', rows.length);
