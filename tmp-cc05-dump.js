const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const d = new DatabaseSync('podcasts/llm-podcast-generator-review/generated/execution/ai_jobs.sqlite');
const cols = d.prepare("PRAGMA table_info(ai_job_results)").all();
console.log('ai_job_results cols:', cols.map(c => c.name));
const row = d.prepare("SELECT * FROM ai_job_results WHERE job_id='job-cc-05-make-your-mark-4c06f4a8-e4a0-4700-8ba7-daf4716f10bf'").get();
if (!row) { console.log('no result row'); process.exit(0); }
console.log('keys:', Object.keys(row));
// pick content-bearing column
for (const k of Object.keys(row)) {
  const v = row[k];
  if (typeof v === 'string' && v.length > 100) {
    fs.writeFileSync(`tmp-cc05-${k}.txt`, v);
    console.log(`wrote tmp-cc05-${k}.txt (${v.length} bytes)`);
  } else {
    console.log(k, '=', v);
  }
}
