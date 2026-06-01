/**
 * GitHub App authentication helpers, implemented with Node's built-in `crypto`
 * so the provisioning subsystem needs no extra npm dependencies. See SPEC.md
 * section 7.2a.
 *
 * A GitHub App is the production identity for provisioning because it is not tied
 * to a human account, mints short-lived installation tokens, and uses fine-grained
 * least-privilege permissions. This module turns an App ID plus a PEM private key
 * into a short-lived installation token, fetched fresh on every provisioning run
 * and never persisted.
 */

'use strict';

const crypto = require('node:crypto');

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Create a signed RS256 JWT for a GitHub App. Valid for `expiresInSeconds`
 * (max 600 per GitHub) with a 60s backdated `iat` to tolerate clock drift.
 */
function createAppJwt({ appId, privateKey, now = Date.now(), expiresInSeconds = 540 }) {
  if (!appId) throw new Error('createAppJwt requires appId');
  if (!privateKey) throw new Error('createAppJwt requires privateKey (PEM)');
  if (expiresInSeconds > 600) {
    throw new Error('GitHub App JWT lifetime must not exceed 600 seconds');
  }
  const iat = Math.floor(now / 1000) - 60;
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = { iat, exp: iat + expiresInSeconds + 60, iss: String(appId) };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(payload)
  )}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  const signature = signer
    .sign(privateKey)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${signingInput}.${signature}`;
}

/**
 * Exchange an App JWT for a short-lived installation access token.
 * Uses global fetch (Node 18+). Returns { token, expires_at }.
 */
async function mintInstallationToken({
  appId,
  privateKey,
  installationId,
  apiBaseUrl = 'https://api.github.com',
  fetchImpl = fetch,
  now = Date.now()
}) {
  if (!installationId) throw new Error('mintInstallationToken requires installationId');
  const jwt = createAppJwt({ appId, privateKey, now });
  const res = await fetchImpl(
    `${apiBaseUrl}/app/installations/${installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'glow-provisioning'
      }
    }
  );
  if (res.status !== 201) {
    const detail = await safeText(res);
    throw new Error(
      `Failed to mint installation token (HTTP ${res.status}): ${detail}`
    );
  }
  const body = await res.json();
  return { token: body.token, expires_at: body.expires_at };
}

async function safeText(res) {
  try {
    return await res.text();
  } catch (err) {
    return `<unreadable body: ${err.message}>`;
  }
}

module.exports = { createAppJwt, mintInstallationToken, base64url };
