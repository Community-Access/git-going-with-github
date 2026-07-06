const test = require('node:test');
const assert = require('node:assert/strict');

process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'test-token';
process.env.GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'Community-Access/learning-room-test';

const { ensureMergeConflictPractice } = require('../challenge-progression');

function makeFakeRequest(routes) {
  const calls = [];
  const request = async (route, options = {}) => {
    calls.push({ route, method: options.method || 'GET' });
    const key = `${options.method || 'GET'} ${route}`;
    for (const [pattern, handler] of routes) {
      if (pattern.test(key)) return handler(route, options);
    }
    throw new Error(`Unexpected request in test: ${key}`);
  };
  return { request, calls };
}

test('posts the success comment when the practice PR registers as conflicting', async () => {
  const { request, calls } = makeFakeRequest([
    [/^GET .*\/pulls\?head=/, () => []],
    [/^GET .*\/git\/ref\/heads\/main$/, () => ({ object: { sha: 'main-sha' } })],
    [/^GET .*\/contents\/docs\/welcome\.md\?ref=main$/, () => ({
      sha: 'file-sha',
      content: Buffer.from('Hello world').toString('base64')
    })],
    [/^POST .*\/git\/refs$/, () => ({})],
    [/^PUT .*\/contents\/docs\/welcome\.md$/, () => ({})],
    [/^POST .*\/pulls$/, () => ({ number: 99, html_url: 'https://example.test/pr/99' })],
    [/^GET .*\/pulls\/99$/, () => ({ mergeable_state: 'dirty' })],
    [/^POST .*\/issues\/11\/comments$/, () => ({})]
  ]);

  await ensureMergeConflictPractice(11, request, 0);

  const commentCall = calls.find((c) => c.route.includes('/issues/11/comments'));
  assert.ok(commentCall, 'expected a comment to be posted on the challenge issue');
});

test('posts the fallback comment when the practice PR never registers as conflicting', async () => {
  let commentBody = null;
  const { request } = makeFakeRequest([
    [/^GET .*\/pulls\?head=/, () => []],
    [/^GET .*\/git\/ref\/heads\/main$/, () => ({ object: { sha: 'main-sha' } })],
    [/^GET .*\/contents\/docs\/welcome\.md\?ref=main$/, () => ({
      sha: 'file-sha',
      content: Buffer.from('Hello world').toString('base64')
    })],
    [/^POST .*\/git\/refs$/, () => ({})],
    [/^PUT .*\/contents\/docs\/welcome\.md$/, () => ({})],
    [/^POST .*\/pulls$/, () => ({ number: 99, html_url: 'https://example.test/pr/99' })],
    [/^GET .*\/pulls\/99$/, () => ({ mergeable_state: 'clean' })],
    [/^POST .*\/issues\/11\/comments$/, (route, options) => {
      commentBody = options.body.body;
      return {};
    }]
  ]);

  await ensureMergeConflictPractice(11, request, 0);

  assert.ok(commentBody, 'expected a fallback comment to be posted');
  assert.match(commentBody, /did not register a conflict/);
  assert.match(commentBody, /main/);
});
