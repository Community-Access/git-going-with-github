const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const { createAppJwt, mintInstallationToken, base64url } = require('../github-app-auth');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

function decodeSegment(seg) {
  return JSON.parse(Buffer.from(seg.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
}

test('createAppJwt produces a verifiable RS256 token with correct claims', () => {
  const now = 1_700_000_000_000;
  const jwt = createAppJwt({ appId: '12345', privateKey, now });
  const [headerB64, payloadB64, sigB64] = jwt.split('.');
  const header = decodeSegment(headerB64);
  const payload = decodeSegment(payloadB64);

  assert.equal(header.alg, 'RS256');
  assert.equal(payload.iss, '12345');
  assert.equal(payload.iat, Math.floor(now / 1000) - 60);

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${headerB64}.${payloadB64}`);
  verifier.end();
  const signature = Buffer.from(sigB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  assert.ok(verifier.verify(publicKey, signature));
});

test('createAppJwt rejects lifetimes over 600 seconds', () => {
  assert.throws(() => createAppJwt({ appId: '1', privateKey, expiresInSeconds: 601 }), /600/);
});

test('createAppJwt requires appId and privateKey', () => {
  assert.throws(() => createAppJwt({ privateKey }), /appId/);
  assert.throws(() => createAppJwt({ appId: '1' }), /privateKey/);
});

test('base64url has no padding or url-unsafe chars', () => {
  const out = base64url('hello world??>>');
  assert.equal(/[+/=]/.test(out), false);
});

test('mintInstallationToken posts to the right endpoint and returns the token', async () => {
  let captured;
  const fakeFetch = async (url, opts) => {
    captured = { url, opts };
    return {
      status: 201,
      async json() {
        return { token: 'ghs_faketoken', expires_at: '2026-01-01T01:00:00Z' };
      }
    };
  };
  const result = await mintInstallationToken({
    appId: '12345',
    privateKey,
    installationId: '99',
    fetchImpl: fakeFetch
  });
  assert.equal(result.token, 'ghs_faketoken');
  assert.match(captured.url, /\/app\/installations\/99\/access_tokens$/);
  assert.equal(captured.opts.method, 'POST');
  assert.match(captured.opts.headers.Authorization, /^Bearer /);
});

test('mintInstallationToken throws a clear error on failure', async () => {
  const fakeFetch = async () => ({
    status: 403,
    async text() {
      return 'forbidden';
    }
  });
  await assert.rejects(
    () => mintInstallationToken({ appId: '1', privateKey, installationId: '2', fetchImpl: fakeFetch }),
    /HTTP 403.*forbidden/
  );
});
