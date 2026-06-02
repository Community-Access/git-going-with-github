/**
 * Minimal GitHub REST client for the provisioning subsystem.
 *
 * Implements exactly the operations the idempotent provisioning algorithm needs
 * (SPEC.md section 7.2b) and nothing more, so the surface stays auditable. Two
 * constructors are provided:
 *
 *   - createFetchClient(...)  uses global fetch + a bearer token (App installation
 *     token or a fine-grained PAT). This is what the CLI uses.
 *   - fromOctokit(octokit)    wraps the `github` client that actions/github-script
 *     injects, so the workflow path needs no extra dependency.
 *
 * Every method is idempotent-friendly: existence checks return booleans rather
 * than throwing, so the algorithm can branch on state instead of on exceptions.
 */

'use strict';

const REQUIRED_WORKFLOWS = Object.freeze([
  'pr-validation-bot.yml',
  'student-progression.yml',
  'content-validation.yml'
]);

function createFetchClient({
  token,
  apiBaseUrl = 'https://api.github.com',
  fetchImpl = fetch,
  userAgent = 'glow-provisioning'
}) {
  if (!token) throw new Error('createFetchClient requires a token');

  async function request(method, path, body) {
    const res = await fetchImpl(`${apiBaseUrl}${path}`, {
      method,
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': userAgent,
        ...(body ? { 'Content-Type': 'application/json' } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    return res;
  }

  return {
    async repoExists({ owner, repo }) {
      const res = await request('GET', `/repos/${owner}/${repo}`);
      if (res.status === 200) return true;
      if (res.status === 404) return false;
      throw new Error(`repoExists failed (HTTP ${res.status}) for ${owner}/${repo}`);
    },

    async createFromTemplate({ templateOwner, templateRepo, owner, repo, isPrivate = true }) {
      const res = await request(
        'POST',
        `/repos/${templateOwner}/${templateRepo}/generate`,
        {
          owner,
          name: repo,
          private: isPrivate,
          include_all_branches: false
        }
      );
      if (res.status === 201) return res.json();
      const detail = await res.text();
      throw new Error(
        `createFromTemplate failed (HTTP ${res.status}) for ${owner}/${repo}: ${detail}`
      );
    },

    async ensureCollaborator({ owner, repo, username, permission = 'push' }) {
      const res = await request(
        'PUT',
        `/repos/${owner}/${repo}/collaborators/${username}`,
        { permission }
      );
      // 201 = invitation created, 204 = already a collaborator. Both are success.
      if (res.status === 201 || res.status === 204) {
        return { status: res.status === 201 ? 'invited' : 'already-collaborator' };
      }
      const detail = await res.text();
      throw new Error(
        `ensureCollaborator failed (HTTP ${res.status}) for ${username} on ${owner}/${repo}: ${detail}`
      );
    },

    async listWorkflowPaths({ owner, repo }) {
      const res = await request(
        'GET',
        `/repos/${owner}/${repo}/contents/.github/workflows`
      );
      if (res.status === 404) return [];
      if (res.status !== 200) {
        throw new Error(`listWorkflowPaths failed (HTTP ${res.status}) for ${owner}/${repo}`);
      }
      const entries = await res.json();
      return entries.filter((e) => e.type === 'file').map((e) => e.name);
    },

    async getDefaultBranchSha({ owner, repo }) {
      const repoRes = await request('GET', `/repos/${owner}/${repo}`);
      if (repoRes.status !== 200) {
        throw new Error(`getDefaultBranchSha failed (HTTP ${repoRes.status}) for ${owner}/${repo}`);
      }
      const meta = await repoRes.json();
      const branch = meta.default_branch || 'main';
      const refRes = await request(
        'GET',
        `/repos/${owner}/${repo}/git/ref/heads/${branch}`
      );
      if (refRes.status !== 200) return null;
      const ref = await refRes.json();
      return ref.object ? ref.object.sha : null;
    }
  };
}

/**
 * Adapt the Octokit instance that actions/github-script injects as `github` to
 * the client interface above. Lets the workflow reuse the algorithm verbatim.
 */
function fromOctokit(octokit) {
  return {
    async repoExists({ owner, repo }) {
      try {
        await octokit.rest.repos.get({ owner, repo });
        return true;
      } catch (err) {
        if (err.status === 404) return false;
        throw err;
      }
    },
    async createFromTemplate({ templateOwner, templateRepo, owner, repo, isPrivate = true }) {
      const res = await octokit.rest.repos.createUsingTemplate({
        template_owner: templateOwner,
        template_repo: templateRepo,
        owner,
        name: repo,
        private: isPrivate,
        include_all_branches: false
      });
      return res.data;
    },
    async ensureCollaborator({ owner, repo, username, permission = 'push' }) {
      const res = await octokit.rest.repos.addCollaborator({ owner, repo, username, permission });
      return { status: res.status === 201 ? 'invited' : 'already-collaborator' };
    },
    async listWorkflowPaths({ owner, repo }) {
      try {
        const res = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: '.github/workflows'
        });
        const entries = Array.isArray(res.data) ? res.data : [];
        return entries.filter((e) => e.type === 'file').map((e) => e.name);
      } catch (err) {
        if (err.status === 404) return [];
        throw err;
      }
    },
    async getDefaultBranchSha({ owner, repo }) {
      const meta = await octokit.rest.repos.get({ owner, repo });
      const branch = meta.data.default_branch || 'main';
      try {
        const ref = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
        return ref.data.object.sha;
      } catch (err) {
        if (err.status === 404) return null;
        throw err;
      }
    }
  };
}

module.exports = { createFetchClient, fromOctokit, REQUIRED_WORKFLOWS };
