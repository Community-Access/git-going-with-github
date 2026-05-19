const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const all = db.prepare("SELECT source_record_id AS slug, status, mode, created_at, completed_at FROM ai_jobs WHERE model = 'openai/gpt-5.5' ORDER BY source_record_id").all();
console.log('Total gpt-5.5 rows:', all.length);
const counts = {};
for (const r of all) counts[r.slug] = (counts[r.slug] || 0) + 1;
const dupes = Object.entries(counts).filter(([_, c]) => c > 1);
console.log('Duplicate slugs:', dupes);
if (dupes.length) {
  const slug = dupes[0][0];
  const rows = db.prepare("SELECT job_id, source_record_id, status, mode, job_type, created_at, completed_at FROM ai_jobs WHERE model='openai/gpt-5.5' AND source_record_id = ?").all(slug);
  console.log('Rows for', slug, ':');
  for (const r of rows) console.log(' ', r);
}
