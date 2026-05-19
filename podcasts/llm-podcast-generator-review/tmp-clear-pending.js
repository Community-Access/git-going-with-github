const path = require('path');
const { JobLedger } = require('./src/execution/job-ledger');
const dbPath = path.join(__dirname, 'generated', 'execution', 'ai_jobs.sqlite');
const ledger = new JobLedger(dbPath);
const info = ledger.db.prepare("DELETE FROM ai_jobs WHERE status IN ('pending','retryable_failed')").run();
console.log('Deleted pending/retryable_failed jobs:', info.changes);
const remain = ledger.db.prepare('SELECT status, COUNT(*) as n FROM ai_jobs GROUP BY status').all();
console.log('Remaining job status counts:', remain);
ledger.close();
