const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const rows = db.prepare("SELECT source_record_id FROM ai_jobs WHERE model='openai/gpt-5.5' AND status='completed' ORDER BY source_record_id").all();
rows.forEach(r => console.log(r.source_record_id));
