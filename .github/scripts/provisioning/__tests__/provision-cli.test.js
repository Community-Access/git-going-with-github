const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { parseArgs, readPrivateKey, resolveToken, usage } = require('../provision-cli');

test('parseArgs reads roster, log, dry-run, help', () => {
  const a = parseArgs(['--roster', 'r.json', '--log', 'l.json', '--dry-run']);
  assert.equal(a.roster, 'r.json');
  assert.equal(a.log, 'l.json');
  assert.equal(a.dryRun, true);
  assert.equal(parseArgs(['-h']).help, true);
});

test('parseArgs reads check-auth', () => {
  assert.equal(parseArgs(['--check-auth']).checkAuth, true);
  assert.equal(parseArgs(['--roster', 'r.json']).checkAuth, false);
});

test('usage mentions both modes', () => {
  assert.match(usage(), /github-app/);
  assert.match(usage(), /actions-bot/);
});

test('readPrivateKey reads @file references', () => {
  const tmp = path.join(os.tmpdir(), `key-${Date.now()}.pem`);
  fs.writeFileSync(tmp, 'PEMDATA');
  try {
    assert.equal(readPrivateKey(`@${tmp}`), 'PEMDATA');
  } finally {
    fs.unlinkSync(tmp);
  }
});

test('readPrivateKey converts literal escaped newlines', () => {
  assert.equal(readPrivateKey('line1\\nline2'), 'line1\nline2');
});

test('resolveToken returns PAT in actions-bot mode', async () => {
  const token = await resolveToken(
    { PROVISIONING_MODE: 'actions-bot', PROVISIONING_TOKEN: 'pat123' },
    'https://api.github.com'
  );
  assert.equal(token, 'pat123');
});

test('resolveToken actions-bot mode requires a token', async () => {
  await assert.rejects(
    () => resolveToken({ PROVISIONING_MODE: 'actions-bot' }, 'https://api.github.com'),
    /PROVISIONING_TOKEN/
  );
});

test('resolveToken rejects unknown mode', async () => {
  await assert.rejects(
    () => resolveToken({ PROVISIONING_MODE: 'banana' }, 'https://api.github.com'),
    /Unknown PROVISIONING_MODE/
  );
});

const crypto = require('node:crypto');
const { privateKey: testPem } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

function fakeAppApi() {
  const calls = [];
  const fetchImpl = async (url, opts) => {
    calls.push({ url, opts });
    if (/\/app\/installations\?/.test(url)) {
      return {
        status: 200,
        async json() {
          return [{ id: 777, account: { login: 'Community-Access' } }];
        }
      };
    }
    if (/\/app\/installations\/777\/access_tokens$/.test(url)) {
      return {
        status: 201,
        async json() {
          return { token: 'ghs_discovered', expires_at: '2026-01-01T01:00:00Z' };
        }
      };
    }
    return { status: 404, async text() { return 'unexpected call'; } };
  };
  return { calls, fetchImpl };
}

test('resolveToken github-app mode discovers the installation when the ID is unset', async () => {
  const { fetchImpl } = fakeAppApi();
  const token = await resolveToken(
    {
      PROVISIONING_MODE: 'github-app',
      PROVISIONING_APP_ID: '12345',
      PROVISIONING_APP_PRIVATE_KEY: testPem,
      PROVISIONING_STUDENT_OWNER: 'Community-Access'
    },
    'https://api.github.com',
    { fetchImpl }
  );
  assert.equal(token, 'ghs_discovered');
});

test('resolveToken github-app mode uses a configured installation ID directly', async () => {
  const { calls, fetchImpl } = fakeAppApi();
  const token = await resolveToken(
    {
      PROVISIONING_MODE: 'github-app',
      PROVISIONING_APP_ID: '12345',
      PROVISIONING_APP_PRIVATE_KEY: testPem,
      PROVISIONING_APP_INSTALLATION_ID: '777',
      PROVISIONING_STUDENT_OWNER: 'Community-Access'
    },
    'https://api.github.com',
    { fetchImpl }
  );
  assert.equal(token, 'ghs_discovered');
  assert.equal(calls.some((c) => /\/app\/installations\?/.test(c.url)), false);
});
