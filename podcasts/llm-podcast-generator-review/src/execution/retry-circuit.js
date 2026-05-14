const { RETRYABLE_HTTP, NON_RETRYABLE_HTTP } = require('./constants');

function parseRetryAfterMs(responseHeaders) {
  if (!responseHeaders) return null;
  const retryAfter = responseHeaders.get ? responseHeaders.get('retry-after') : null;
  if (!retryAfter) return null;
  const numeric = Number.parseInt(retryAfter, 10);
  if (Number.isFinite(numeric)) return numeric * 1000;
  const dateMs = Date.parse(retryAfter);
  if (!Number.isNaN(dateMs)) return Math.max(0, dateMs - Date.now());
  return null;
}

function classifyError(error) {
  const status = error && typeof error.status === 'number' ? error.status : null;
  const message = String(error && (error.message || error.error_message || error) || '').toLowerCase();
  if (status !== null) {
    if (NON_RETRYABLE_HTTP.has(status)) return { retryable: false, reason: `http-${status}` };
    if (RETRYABLE_HTTP.has(status)) return { retryable: true, reason: `http-${status}` };
  }
  if (message.includes('apiconnectionerror') || message.includes('api connection')) return { retryable: true, reason: 'api-connection' };
  if (message.includes('apitimeouterror') || message.includes('api timeout') || message.includes('timeout')) return { retryable: true, reason: 'api-timeout' };
  if (message.includes('invalid api key') || message.includes('authentication') || message.includes('permission') || message.includes('quota')) {
    return { retryable: false, reason: 'auth-or-quota' };
  }
  return { retryable: false, reason: 'unknown' };
}

function backoffDelayMs(attemptNumber, baseMs = 1000, maxMs = 60000) {
  const exp = Math.min(maxMs, baseMs * (2 ** Math.max(0, attemptNumber - 1)));
  const jitter = Math.floor(Math.random() * Math.floor(exp * 0.25));
  return exp + jitter;
}

class CircuitBreaker {
  constructor({
    failureThreshold = 5,
    cooldownMs = 5 * 60 * 1000,
    slowdownCooldownMs = 15 * 60 * 1000
  } = {}) {
    this.failureThreshold = failureThreshold;
    this.cooldownMs = cooldownMs;
    this.slowdownCooldownMs = slowdownCooldownMs;
    this.failures = 0;
    this.openUntil = 0;
    this.currentConcurrency = 4;
  }

  canProceed(now = Date.now()) {
    return now >= this.openUntil;
  }

  registerSuccess() {
    this.failures = 0;
    if (this.currentConcurrency < 4) this.currentConcurrency += 1;
  }

  registerRetryableFailure(reason = '') {
    this.failures += 1;
    if (this.failures < this.failureThreshold) return;
    const slowdown = String(reason).includes('503') || String(reason).includes('slow down');
    this.openUntil = Date.now() + (slowdown ? this.slowdownCooldownMs : this.cooldownMs);
    this.currentConcurrency = Math.max(1, Math.floor(this.currentConcurrency / 2));
  }
}

module.exports = {
  parseRetryAfterMs,
  classifyError,
  backoffDelayMs,
  CircuitBreaker
};
