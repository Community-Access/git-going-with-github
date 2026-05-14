const JOB_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  RETRYABLE_FAILED: 'retryable_failed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
};

const JOB_MODE = {
  SYNC: 'sync',
  BATCH: 'batch'
};

const RETRYABLE_HTTP = new Set([429, 500, 503]);
const NON_RETRYABLE_HTTP = new Set([400, 401, 403, 404, 422]);

module.exports = {
  JOB_STATUS,
  JOB_MODE,
  RETRYABLE_HTTP,
  NON_RETRYABLE_HTTP
};
