const path = require('path');
const { JobLedger } = require('./src/execution/job-ledger');
const dbPath = path.join(__dirname, 'generated', 'execution', 'ai_jobs.sqlite');
const ledger = new JobLedger(dbPath);
const slug = process.argv[2] || 'cc-15-discover-accessibility-agents';
const cols = ledger.db.prepare("PRAGMA table_info(ai_jobs)").all().map(c => c.name);
console.log('ai_jobs columns:', cols.join(', '));
const jobs = ledger.db.prepare("SELECT * FROM ai_jobs WHERE source_record_id = ? ORDER BY rowid DESC LIMIT 5").all(slug);
console.log('Recent jobs for', slug);
for (const j of jobs) console.log(' ', j);
if (jobs[0]) {
  const r = ledger.getResultByJobId(jobs[0].job_id);
  console.log('Has result row:', !!r);
  if (r && r.response_body) {
    const body = JSON.parse(r.response_body);
    const content = body && body.choices && body.choices[0] && body.choices[0].message ? body.choices[0].message.content : '';
    console.log('Response content length:', content.length);
    console.log('First 400 chars:', content.slice(0, 400));
  }
}
ledger.close();
