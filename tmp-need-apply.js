const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const d = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const completed = d.prepare("SELECT DISTINCT source_record_id FROM ai_jobs WHERE model='openai/gpt-5.5' AND status='completed' ORDER BY source_record_id").all();
const appliedDir = 'podcasts/llm-podcast-generator-review/generated/execution/applied';
const need = [];
for (const r of completed) {
  const slug = r.source_record_id;
  const marker = `${appliedDir}/${slug}.candidate.json`;
  if (!fs.existsSync(marker)) { need.push(slug); continue; }
  // marker exists, but check if it predates the gpt-5.5 completion
  const markerMtime = fs.statSync(marker).mtimeMs;
  const lastJob = d.prepare("SELECT completed_at FROM ai_jobs WHERE source_record_id=? AND model='openai/gpt-5.5' AND status='completed' ORDER BY completed_at DESC LIMIT 1").get(slug);
  if (lastJob && lastJob.completed_at) {
    const jobMs = new Date(lastJob.completed_at).getTime();
    if (jobMs > markerMtime + 1000) need.push(slug + '  (stale: gpt-5.5 newer than marker)');
  }
}
console.log('=== gpt-5.5 completed total:', completed.length);
console.log('=== needing apply (' + need.length + ') ===');
for (const s of need) console.log(s);
