const test = require('node:test');
const assert = require('node:assert/strict');

const { createFetchClient, fromOctokit, REQUIRED_WORKFLOWS } = require('../github-client');

function fakeFetchFactory(routes) {
  return async (url, opts) => {
    const method = (opts && opts.method) || 'GET';
    const key = `${method} ${url.replace('https://api.github.com', '')}`;
    const handler = routes[key];
    if (!handler) throw new Error(`Unexpected request: ${key}`);
    return handler(opts);
  };
}

test('REQUIRED_WORKFLOWS lists the core automation files', () => {
  assert.ok(REQUIRED_WORKFLOWS.includes('pr-validation-bot.yml'));
  assert.ok(REQUIRED_WORKFLOWS.includes('student-progression.yml'));
});

test('createFetchClient requires a token', () => {
  assert.throws(() => createFetchClient({}), /token/);
});

test('repoExists returns true on 200 and false on 404', async () => {
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'GET /repos/o/yes': () => ({ status: 200 }),
      'GET /repos/o/no': () => ({ status: 404 })
    })
  });
  assert.equal(await client.repoExists({ owner: 'o', repo: 'yes' }), true);
  assert.equal(await client.repoExists({ owner: 'o', repo: 'no' }), false);
});

test('createFromTemplate posts to generate endpoint', async () => {
  let body;
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'POST /repos/o/tmpl/generate': (opts) => {
        body = JSON.parse(opts.body);
        return { status: 201, async json() { return { full_name: 'o/new' }; } };
      }
    })
  });
  const repo = await client.createFromTemplate({
    templateOwner: 'o',
    templateRepo: 'tmpl',
    owner: 'o',
    repo: 'new'
  });
  assert.equal(repo.full_name, 'o/new');
  assert.equal(body.private, true);
  assert.equal(body.name, 'new');
});

test('ensureCollaborator treats 201 and 204 as success', async () => {
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'PUT /repos/o/r/collaborators/alice': () => ({ status: 201 }),
      'PUT /repos/o/r/collaborators/bob': () => ({ status: 204 })
    })
  });
  assert.equal((await client.ensureCollaborator({ owner: 'o', repo: 'r', username: 'alice' })).status, 'invited');
  assert.equal((await client.ensureCollaborator({ owner: 'o', repo: 'r', username: 'bob' })).status, 'already-collaborator');
});

test('listWorkflowPaths returns file names and [] on 404', async () => {
  const client = createFetchClient({
    token: 't',
    fetchImpl: fakeFetchFactory({
      'GET /repos/o/has/contents/.github/workflows': () => ({
        status: 200,
        async json() {
          return [
            { type: 'file', name: 'a.yml' },
            { type: 'dir', name: 'sub' }
          ];
        }
      }),
      'GET /repos/o/none/contents/.github/workflows': () => ({ status: 404 })
    })
  });
  assert.deepEqual(await client.listWorkflowPaths({ owner: 'o', repo: 'has' }), ['a.yml']);
  assert.deepEqual(await client.listWorkflowPaths({ owner: 'o', repo: 'none' }), []);
});

test('fromOctokit adapts repoExists 404 to false', async () => {
  const octokit = {
    rest: {
      repos: {
        get: async () => {
          const err = new Error('nf');
          err.status = 404;
          throw err;
        }
      }
    }
  };
  const client = fromOctokit(octokit);
  assert.equal(await client.repoExists({ owner: 'o', repo: 'r' }), false);
});

test('fromOctokit listWorkflowPaths filters files and handles 404', async () => {
  const octokit = {
    rest: {
      repos: {
        getContent: async () => ({ data: [{ type: 'file', name: 'x.yml' }, { type: 'dir', name: 'd' }] })
      }
    }
  };
  const client = fromOctokit(octokit);
  assert.deepEqual(await client.listWorkflowPaths({ owner: 'o', repo: 'r' }), ['x.yml']);
});
