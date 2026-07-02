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
  const normalizedInstallationId = normalizeInstallationId(installationId);
  const jwt = createAppJwt({ appId, privateKey, now });
  const baseUrl = String(apiBaseUrl || 'https://api.github.com').replace(/\/+$/, '');
  const res = await fetchImpl(
    `${baseUrl}/app/installations/${normalizedInstallationId}/access_tokens`,
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
    const hint =
      res.status === 404
        ? ' Check PROVISIONING_APP_INSTALLATION_ID (numeric ID or the installation settings URL),' +
          ' and confirm the App is actually installed on the target organization;' +
          ' leaving PROVISIONING_APP_INSTALLATION_ID unset lets provisioning discover it automatically.'
        : '';
    throw new Error(
      `Failed to mint installation token (HTTP ${res.status}): ${detail}.${hint}`
    );
  }
  const body = await res.json();
  return { token: body.token, expires_at: body.expires_at };
}

/**
 * Discover the App's installation ID for a target org/user by listing the App's
 * installations with an App JWT. Removes the need to store the installation ID
 * as a secret: it cannot be mis-pasted, and it survives App re-installation
 * (which changes the ID).
 */
async function discoverInstallationId({
  appId,
  privateKey,
  owner,
  apiBaseUrl = 'https://api.github.com',
  fetchImpl = fetch,
  now = Date.now()
}) {
  if (!owner) throw new Error('discoverInstallationId requires owner');
  const jwt = createAppJwt({ appId, privateKey, now });
  const baseUrl = String(apiBaseUrl || 'https://api.github.com').replace(/\/+$/, '');
  const res = await fetchImpl(`${baseUrl}/app/installations?per_page=100`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'glow-provisioning'
    }
  });
  if (res.status !== 200) {
    const detail = await safeText(res);
    throw new Error(`Failed to list App installations (HTTP ${res.status}): ${detail}`);
  }
  const installations = await res.json();
  if (!Array.isArray(installations) || installations.length === 0) {
    throw new Error(
      'The GitHub App has no installations. Install the App on the target organization ' +
        '(Organization settings -> GitHub Apps) before provisioning.'
    );
  }
  const wanted = String(owner).toLowerCase();
  const match = installations.find(
    (i) => i && i.account && String(i.account.login).toLowerCase() === wanted
  );
  if (!match) {
    const installed = installations
      .map((i) => (i && i.account ? i.account.login : 'unknown'))
      .join(', ');
    throw new Error(
      `The GitHub App is not installed on ${owner}. It is installed on: ${installed}. ` +
        'Install the App on the target organization before provisioning.'
    );
  }
  return String(match.id);
}

function normalizeInstallationId(value) {
  if (value == null) {
    throw new Error('mintInstallationToken requires installationId');
  }
  const raw = String(value).trim();
  if (!raw) {
    throw new Error('mintInstallationToken requires installationId');
  }
  if (/^\d+$/.test(raw)) {
    return raw;
  }
  const urlMatch = raw.match(/\/installations\/(\d+)(?:[/?#]|$)/i);
  if (urlMatch) {
    return urlMatch[1];
  }
  throw new Error(
    'Invalid installationId. Provide the numeric ID or a full URL that includes /installations/<id>.'
  );
}

async function safeText(res) {
  try {
    return await res.text();
  } catch (err) {
    return `<unreadable body: ${err.message}>`;
  }
}

module.exports = {
  createAppJwt,
  mintInstallationToken,
  base64url,
  normalizeInstallationId,
  discoverInstallationId
};
