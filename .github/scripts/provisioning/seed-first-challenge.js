/**
 * First-challenge seeding for provisioning (SPEC.md section 7.2b step 3).
 *
 * A freshly provisioned learning room has no issues, and the Student
 * Progression Bot inside the room only fires when a challenge issue is closed
 * or manually dispatched - so without this step every new room starts with an
 * empty Issues tab and the progression chain never begins.
 *
 * Rather than duplicating the issue-rendering logic, this module runs the same
 * challenge-progression.js script the student repo uses, from the workshop
 * checkout's learning-room/ directory, pointed at the student repo with the
 * App installation token. The script is idempotent (it skips creation when a
 * matching challenge issue already exists) and degrades to an unassigned issue
 * when the learner's collaborator invitation is still pending.
 *
 * Note: challenge-progression.js talks to https://api.github.com directly; it
 * does not honor GITHUB_API_URL. That matches every current deployment.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function createChallengeSeeder({
  token,
  learningRoomDir,
  spawn = spawnSync,
  execPath = process.execPath
}) {
  if (!token) throw new Error('createChallengeSeeder requires a token');
  if (!learningRoomDir) throw new Error('createChallengeSeeder requires learningRoomDir');

  const scriptPath = path.join(learningRoomDir, '.github', 'scripts', 'challenge-progression.js');
  // Fail at construction, not per learner, when the checkout layout is wrong.
  if (spawn === spawnSync && !fs.existsSync(scriptPath)) {
    throw new Error(`createChallengeSeeder cannot find ${scriptPath}`);
  }

  return {
    async seedFirstChallenge({ owner, repo, assignee }) {
      const result = spawn(execPath, [scriptPath], {
        cwd: learningRoomDir,
        encoding: 'utf8',
        env: {
          ...process.env,
          GITHUB_TOKEN: token,
          GITHUB_REPOSITORY: `${owner}/${repo}`,
          GITHUB_EVENT_NAME: 'provisioning-seed',
          START_CHALLENGE: '1',
          CHALLENGE_ASSIGNEE: assignee || ''
        }
      });

      if (result.error) throw result.error;
      if (result.status !== 0) {
        const detail = String(result.stderr || result.stdout || '')
          .trim()
          .split(/\r?\n/)
          .slice(-5)
          .join(' | ');
        throw new Error(
          `seedFirstChallenge failed for ${owner}/${repo} (exit ${result.status}): ${detail}`
        );
      }
      return { output: String(result.stdout || '').trim() };
    }
  };
}

module.exports = { createChallengeSeeder };
