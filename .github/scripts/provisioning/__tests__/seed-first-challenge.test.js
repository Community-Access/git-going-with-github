const test = require('node:test');
const assert = require('node:assert/strict');

const { createChallengeSeeder } = require('../seed-first-challenge');

function fakeSpawn(result) {
  const calls = [];
  const spawn = (cmd, args, opts) => {
    calls.push({ cmd, args, opts });
    return { status: 0, stdout: '', stderr: '', ...result };
  };
  return { calls, spawn };
}

test('requires a token and a learning room directory', () => {
  assert.throws(() => createChallengeSeeder({ learningRoomDir: '/lr' }), /token/);
  assert.throws(() => createChallengeSeeder({ token: 't' }), /learningRoomDir/);
});

test('runs the challenge progression script against the student repo', async () => {
  const { calls, spawn } = fakeSpawn({ stdout: 'Created Challenge 1' });
  const seeder = createChallengeSeeder({ token: 'tok', learningRoomDir: '/lr', spawn });

  const result = await seeder.seedFirstChallenge({
    owner: 'org',
    repo: 'room',
    assignee: 'alice'
  });

  assert.equal(calls.length, 1);
  const call = calls[0];
  assert.equal(call.cmd, process.execPath);
  assert.match(call.args[0], /challenge-progression\.js$/);
  assert.equal(call.opts.cwd, '/lr');
  assert.equal(call.opts.env.GITHUB_TOKEN, 'tok');
  assert.equal(call.opts.env.GITHUB_REPOSITORY, 'org/room');
  assert.equal(call.opts.env.START_CHALLENGE, '1');
  assert.equal(call.opts.env.CHALLENGE_ASSIGNEE, 'alice');
  assert.equal(result.output, 'Created Challenge 1');
});

test('passes an empty assignee through as an empty string', async () => {
  const { calls, spawn } = fakeSpawn({});
  const seeder = createChallengeSeeder({ token: 'tok', learningRoomDir: '/lr', spawn });
  await seeder.seedFirstChallenge({ owner: 'org', repo: 'room' });
  assert.equal(calls[0].opts.env.CHALLENGE_ASSIGNEE, '');
});

test('throws with script output when the script exits non-zero', async () => {
  const { spawn } = fakeSpawn({ status: 1, stderr: 'FATAL: creation exploded' });
  const seeder = createChallengeSeeder({ token: 'tok', learningRoomDir: '/lr', spawn });

  await assert.rejects(
    () => seeder.seedFirstChallenge({ owner: 'org', repo: 'room', assignee: 'alice' }),
    /creation exploded/
  );
});

test('throws when the script cannot be spawned at all', async () => {
  const { spawn } = fakeSpawn({ error: new Error('ENOENT node missing'), status: null });
  const seeder = createChallengeSeeder({ token: 'tok', learningRoomDir: '/lr', spawn });

  await assert.rejects(
    () => seeder.seedFirstChallenge({ owner: 'org', repo: 'room', assignee: 'alice' }),
    /ENOENT/
  );
});
