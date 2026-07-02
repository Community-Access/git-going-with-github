const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const {
  createAppJwt,
  mintInstallationToken,
  base64url,
  normalizeInstallationId,
  discoverInstallationId
} = require('../github-app-auth');

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

test('mintInstallationToken accepts installation settings URLs', async () => {
  let captured;
  const fakeFetch = async (url) => {
    captured = url;
    return {
      status: 201,
      async json() {
        return { token: 'ghs_faketoken', expires_at: '2026-01-01T01:00:00Z' };
      }
    };
  };

  await mintInstallationToken({
    appId: '12345',
    privateKey,
    installationId:
      'https://github.com/organizations/Community-Access/settings/installations/99?target_type=Organization',
    fetchImpl: fakeFetch
  });

  assert.match(captured, /\/app\/installations\/99\/access_tokens$/);
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
    /HTTP 403.*forbidden\./
  );
});

test('normalizeInstallationId accepts numeric IDs and installation URLs', () => {
  assert.equal(normalizeInstallationId('12345'), '12345');
  assert.equal(
    normalizeInstallationId(
      'https://github.com/organizations/Community-Access/settings/installations/98765432'
    ),
    '98765432'
  );
});

test('normalizeInstallationId rejects invalid values', () => {
  assert.throws(() => normalizeInstallationId(''), /requires installationId/);
  assert.throws(() => normalizeInstallationId('not-an-installation-id'), /Invalid installationId/);
});

test('discoverInstallationId finds the installation for the target owner', async () => {
  let captured;
  const fakeFetch = async (url, opts) => {
    captured = { url, opts };
    return {
      status: 200,
      async json() {
        return [
          { id: 111, account: { login: 'Someone-Else' } },
          { id: 222, account: { login: 'Community-Access' } }
        ];
      }
    };
  };
  const id = await discoverInstallationId({
    appId: '12345',
    privateKey,
    owner: 'community-access',
    fetchImpl: fakeFetch
  });
  assert.equal(id, '222');
  assert.match(captured.url, /\/app\/installations\?per_page=100$/);
  assert.match(captured.opts.headers.Authorization, /^Bearer /);
});

test('discoverInstallationId explains when the app is not installed on the owner', async () => {
  const fakeFetch = async () => ({
    status: 200,
    async json() {
      return [{ id: 111, account: { login: 'Someone-Else' } }];
    }
  });
  await assert.rejects(
    () =>
      discoverInstallationId({
        appId: '12345',
        privateKey,
        owner: 'Community-Access',
        fetchImpl: fakeFetch
      }),
    /not installed on Community-Access/
  );
});

test('discoverInstallationId explains when the app has no installations at all', async () => {
  const fakeFetch = async () => ({
    status: 200,
    async json() {
      return [];
    }
  });
  await assert.rejects(
    () =>
      discoverInstallationId({
        appId: '12345',
        privateKey,
        owner: 'Community-Access',
        fetchImpl: fakeFetch
      }),
    /no installations.*Install the App/i
  );
});

test('discoverInstallationId surfaces API errors', async () => {
  const fakeFetch = async () => ({
    status: 401,
    async text() {
      return 'bad credentials';
    }
  });
  await assert.rejects(
    () =>
      discoverInstallationId({
        appId: '12345',
        privateKey,
        owner: 'Community-Access',
        fetchImpl: fakeFetch
      }),
    /HTTP 401.*bad credentials/
  );
});
