const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const { JOB_STATUS } = require('./constants');

function nowIso() {
  return new Date().toISOString();
}

class JobLedger {
  constructor(dbPath) {
    this.dbPath = dbPath;
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    this.db = new DatabaseSync(dbPath);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.init();
  }

  init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ai_jobs (
        job_id TEXT PRIMARY KEY,
        job_type TEXT NOT NULL,
        source_file TEXT,
        source_record_id TEXT,
        request_hash TEXT NOT NULL,
        model TEXT NOT NULL,
        endpoint TEXT NOT NULL,
        mode TEXT NOT NULL,
        status TEXT NOT NULL,
        attempt_count INTEGER DEFAULT 0,
        batch_id TEXT,
        custom_id TEXT,
        input_tokens_estimated INTEGER DEFAULT 0,
        output_tokens_actual INTEGER DEFAULT 0,
        cost_estimated REAL DEFAULT 0,
        cost_actual REAL DEFAULT 0,
        error_code TEXT,
        error_message TEXT,
        request_payload TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        completed_at TEXT
      );
      CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_jobs_hash_mode ON ai_jobs(request_hash, mode);
      CREATE INDEX IF NOT EXISTS idx_ai_jobs_status ON ai_jobs(status);
      CREATE TABLE IF NOT EXISTS ai_job_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id TEXT NOT NULL,
        attempt_number INTEGER NOT NULL,
        status_code INTEGER,
        retryable INTEGER NOT NULL,
        error_code TEXT,
        error_message TEXT,
        started_at TEXT NOT NULL,
        finished_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS ai_job_results (
        job_id TEXT PRIMARY KEY,
        response_body TEXT,
        output_file_id TEXT,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS ai_runs (
        run_id TEXT PRIMARY KEY,
        mode TEXT NOT NULL,
        model TEXT,
        started_at TEXT NOT NULL,
        completed_at TEXT,
        summary_path TEXT,
        report_path TEXT
      );
    `);
  }

  insertOrReuseJob(job) {
    const existing = this.db.prepare('SELECT * FROM ai_jobs WHERE request_hash = ? AND mode = ?').get(job.request_hash, job.mode);
    if (existing && existing.status === JOB_STATUS.COMPLETED) {
      return { reused: true, job: existing };
    }
    if (existing) {
      this.db.prepare(`
        UPDATE ai_jobs
        SET job_type = ?, source_file = ?, source_record_id = ?, model = ?, endpoint = ?,
            status = ?, input_tokens_estimated = ?, cost_estimated = ?, request_payload = ?, updated_at = ?
        WHERE job_id = ?
      `).run(
        job.job_type,
        job.source_file,
        job.source_record_id,
        job.model,
        job.endpoint,
        JOB_STATUS.PENDING,
        job.input_tokens_estimated || 0,
        job.cost_estimated || 0,
        JSON.stringify(job.request_payload || {}),
        nowIso(),
        existing.job_id
      );
      return { reused: false, job: this.getJob(existing.job_id) };
    }
    this.db.prepare(`
      INSERT INTO ai_jobs (
        job_id, job_type, source_file, source_record_id, request_hash, model, endpoint, mode, status,
        attempt_count, batch_id, custom_id, input_tokens_estimated, output_tokens_actual, cost_estimated, cost_actual,
        error_code, error_message, request_payload, created_at, updated_at, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NULL, NULL, ?, 0, ?, 0, NULL, NULL, ?, ?, ?, NULL)
    `).run(
      job.job_id,
      job.job_type,
      job.source_file || null,
      job.source_record_id || null,
      job.request_hash,
      job.model,
      job.endpoint,
      job.mode,
      JOB_STATUS.PENDING,
      job.input_tokens_estimated || 0,
      job.cost_estimated || 0,
      JSON.stringify(job.request_payload || {}),
      nowIso(),
      nowIso()
    );
    return { reused: false, job: this.getJob(job.job_id) };
  }

  getJob(jobId) {
    return this.db.prepare('SELECT * FROM ai_jobs WHERE job_id = ?').get(jobId);
  }

  getResultByJobId(jobId) {
    return this.db.prepare('SELECT * FROM ai_job_results WHERE job_id = ?').get(jobId) || null;
  }

  findCompletedByHash(hash, mode) {
    return this.db.prepare(`
      SELECT j.*, r.response_body
      FROM ai_jobs j
      LEFT JOIN ai_job_results r ON r.job_id = j.job_id
      WHERE j.request_hash = ? AND j.mode = ? AND j.status = ?
    `).get(hash, mode, JOB_STATUS.COMPLETED);
  }

  listJobsByStatus(statuses, mode) {
    const placeholders = statuses.map(() => '?').join(',');
    const values = [...statuses];
    let query = `SELECT * FROM ai_jobs WHERE status IN (${placeholders})`;
    if (mode) {
      query += ' AND mode = ?';
      values.push(mode);
    }
    query += ' ORDER BY created_at ASC';
    return this.db.prepare(query).all(...values);
  }

  updateJobStatus(jobId, status, extra = {}) {
    const row = this.getJob(jobId);
    if (!row) return;
    const completedAt = status === JOB_STATUS.COMPLETED ? nowIso() : (extra.completed_at || row.completed_at);
    this.db.prepare(`
      UPDATE ai_jobs
      SET status = ?, attempt_count = ?, batch_id = ?, custom_id = ?, output_tokens_actual = ?, cost_actual = ?,
          error_code = ?, error_message = ?, updated_at = ?, completed_at = ?
      WHERE job_id = ?
    `).run(
      status,
      typeof extra.attempt_count === 'number' ? extra.attempt_count : row.attempt_count,
      extra.batch_id !== undefined ? extra.batch_id : row.batch_id,
      extra.custom_id !== undefined ? extra.custom_id : row.custom_id,
      typeof extra.output_tokens_actual === 'number' ? extra.output_tokens_actual : row.output_tokens_actual,
      typeof extra.cost_actual === 'number' ? extra.cost_actual : row.cost_actual,
      extra.error_code !== undefined ? extra.error_code : row.error_code,
      extra.error_message !== undefined ? extra.error_message : row.error_message,
      nowIso(),
      completedAt,
      jobId
    );
  }

  recordAttempt({
    job_id,
    attempt_number,
    status_code,
    retryable,
    error_code,
    error_message,
    started_at,
    finished_at
  }) {
    this.db.prepare(`
      INSERT INTO ai_job_attempts (
        job_id, attempt_number, status_code, retryable, error_code, error_message, started_at, finished_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      job_id,
      attempt_number,
      status_code || null,
      retryable ? 1 : 0,
      error_code || null,
      error_message || null,
      started_at || nowIso(),
      finished_at || nowIso()
    );
  }

  saveResult(jobId, responseBody, outputFileId = null) {
    const existing = this.getResultByJobId(jobId);
    if (existing) {
      this.db.prepare('UPDATE ai_job_results SET response_body = ?, output_file_id = ?, updated_at = ? WHERE job_id = ?')
        .run(JSON.stringify(responseBody || {}), outputFileId, nowIso(), jobId);
      return;
    }
    this.db.prepare('INSERT INTO ai_job_results (job_id, response_body, output_file_id, updated_at) VALUES (?, ?, ?, ?)')
      .run(jobId, JSON.stringify(responseBody || {}), outputFileId, nowIso());
  }

  createRun(run) {
    this.db.prepare('INSERT INTO ai_runs (run_id, mode, model, started_at) VALUES (?, ?, ?, ?)')
      .run(run.run_id, run.mode, run.model || null, nowIso());
  }

  completeRun(runId, { summaryPath, reportPath }) {
    this.db.prepare('UPDATE ai_runs SET completed_at = ?, summary_path = ?, report_path = ? WHERE run_id = ?')
      .run(nowIso(), summaryPath || null, reportPath || null, runId);
  }

  listJobAttempts(jobId) {
    return this.db.prepare('SELECT * FROM ai_job_attempts WHERE job_id = ? ORDER BY attempt_number ASC').all(jobId);
  }

  close() {
    this.db.close();
  }
}

module.exports = {
  JobLedger
};
