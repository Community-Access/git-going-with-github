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
