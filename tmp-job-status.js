const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
console.log('by model/status:', db.prepare("SELECT model, status, COUNT(*) AS c FROM ai_jobs GROUP BY model, status ORDER BY model, status").all());
console.log('gpt-5.5 totals:', db.prepare("SELECT status, COUNT(*) AS c FROM ai_jobs WHERE model='openai/gpt-5.5' GROUP BY status").all());
console.log('in_progress:', db.prepare("SELECT source_record_id, model, updated_at FROM ai_jobs WHERE status='in_progress'").all());
console.log('latest 5 completed:', db.prepare("SELECT source_record_id, model, completed_at FROM ai_jobs WHERE status='completed' ORDER BY completed_at DESC LIMIT 5").all());
console.log('pending (gpt-5.5):', db.prepare("SELECT source_record_id FROM ai_jobs WHERE status='pending' AND model='openai/gpt-5.5'").all().map(r => r.source_record_id));
