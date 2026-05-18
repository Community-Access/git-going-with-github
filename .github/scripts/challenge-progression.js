#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY || '';
const actor = process.env.CHALLENGE_ASSIGNEE || process.env.GITHUB_ACTOR;
const eventName = process.env.GITHUB_EVENT_NAME || '';
const requestedChallenge = Number(process.env.START_CHALLENGE || 0);
const closedIssueTitle = process.env.CLOSED_ISSUE_TITLE || '';

if (!token) {
  throw new Error('GITHUB_TOKEN is required.');
}

const [owner, repo] = repository.split('/');
if (!owner || !repo) {
  throw new Error('GITHUB_REPOSITORY must be set to owner/repo.');
}

const challengeDirectory = path.join(process.cwd(), '.github', 'ISSUE_TEMPLATE');

function getChallengeNumberFromTitle(title) {
  const match = title.match(/Challenge\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function getNextChallengeNumber() {
  if (requestedChallenge > 0) {
    return requestedChallenge;
  }

  if (eventName === 'issues' && closedIssueTitle) {
    const current = getChallengeNumberFromTitle(closedIssueTitle);
    if (!current) {
      return null;
    }
    if (current >= 1 && current < 16) {
      return current + 1;
    }
  }

  return null;
}

function findTemplate(challengeNumber) {
  const prefix = `challenge-${String(challengeNumber).padStart(2, '0')}-`;
  return fs.readdirSync(challengeDirectory)
    .find(fileName => fileName.startsWith(prefix) && fileName.endsWith('.yml'));
}

function readQuotedField(content, fieldName) {
  const match = content.match(new RegExp(`^${fieldName}:\\s*"([^"]+)"`, 'm'));
  return match ? match[1] : '';
}

function readLabels(content) {
  const match = content.match(/^labels:\s*\[([^\]]+)\]/m);
  if (!match) {
    return ['challenge'];
  }
  return match[1]
    .split(',')
    .map(label => label.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);
}

function extractBlockLines(lines, startIndex) {
  const block = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === '') {
      block.push('');
      continue;
    }
    if (!line.startsWith('        ')) {
      break;
    }
    block.push(line.slice(8));
  }
  return block.join('\n').trim();
}

function readMarkdownBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].trim() === 'value: |') {
      const block = extractBlockLines(lines, index);
      if (block) {
        blocks.push(block);
      }
    }
  }
  return blocks;
}

function readEvidencePrompt(content) {
  const label = readQuotedField(content, '      label') || 'Your evidence';
  const descriptionMatch = content.match(/^\s+description:\s*"?([^"\n]+)"?/m);
  const placeholderMatch = content.match(/^\s+placeholder:\s*\|\r?\n([\s\S]*?)(?:\n\s+validations:|\n\s+- type:|$)/m);
  const placeholder = placeholderMatch
    ? placeholderMatch[1].split(/\r?\n/).map(line => line.replace(/^        /, '')).join('\n').trim()
    : '';

  return [
    `## ${label}`,
    descriptionMatch ? descriptionMatch[1] : 'Add your evidence as a comment, then close this issue when you are done.',
    placeholder ? `\nSuggested format:\n\n\`\`\`text\n${placeholder}\n\`\`\`` : ''
  ].filter(Boolean).join('\n\n');
}

async function githubRequest(route, options = {}) {
  const response = await fetch(`https://api.github.com${route}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${options.method || 'GET'} ${route} failed: ${response.status} ${body}`);
  }

  return response.status === 204 ? null : response.json();
}

async function issueAlreadyExists(titlePrefix) {
  const issues = await githubRequest(`/repos/${owner}/${repo}/issues?state=all&per_page=100`);
  return issues.some(issue => issue.title && issue.title.startsWith(titlePrefix));
}

async function ensurePeerSimulationIssue() {
  const peerTitle = 'Peer Simulation: Welcome Link Needs Context';
  if (await issueAlreadyExists(peerTitle)) {
    console.log('Peer simulation issue already exists. Skipping seed.');
    return;
  }

  const body = [
    '## Peer Simulation: Welcome Link Needs Context',
    '',
    'A learner reported that the welcome content still has TODO context and could be clearer for first-time contributors.',
    '',
    '### Prompt for reviewers',
    '- Confirm whether you can find the same TODO/context gap.',
    '- Leave one constructive suggestion.',
    '- Use an @mention in your comment.',
    '',
    'This issue exists to support Challenge 3 conversation practice.'
  ].join('\n');

  const issue = await githubRequest(`/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    body: {
      title: peerTitle,
      body,
      labels: ['peer-simulation', 'challenge']
    }
  });

  console.log(`Created peer simulation issue: ${issue.html_url}`);
}

async function createChallenge(challengeNumber) {
  const templateName = findTemplate(challengeNumber);
  if (!templateName) {
    console.log(`No template found for Challenge ${challengeNumber}.`);
    return;
  }

  const templatePath = path.join(challengeDirectory, templateName);
  const content = fs.readFileSync(templatePath, 'utf8');
  const titleTemplate = readQuotedField(content, 'title') || readQuotedField(content, 'name');
  const title = titleTemplate.replace('@{username}', `@${actor || 'student'}`);
  const titlePrefix = `Challenge ${challengeNumber}:`;

  if (await issueAlreadyExists(titlePrefix)) {
    console.log(`${titlePrefix} already exists. Skipping duplicate creation.`);
    return;
  }

  if (challengeNumber <= 3) {
    await ensurePeerSimulationIssue();
  }

  const bodyParts = [
    ...readMarkdownBlocks(content),
    readEvidencePrompt(content),
    [
      '## How to finish this challenge',
      '1. Complete the steps above.',
      '2. Add your evidence as a comment on this issue.',
      '3. Close this issue when you are done. Gandalf will open your next challenge.'
    ].join('\n')
  ];

  const issue = await githubRequest(`/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    body: {
      title,
      body: bodyParts.filter(Boolean).join('\n\n---\n\n'),
      labels: readLabels(content),
      assignees: actor ? [actor] : []
    }
  });

  console.log(`Created ${title}: ${issue.html_url}`);
}

const nextChallenge = getNextChallengeNumber();
if (!nextChallenge) {
  console.log('No challenge to create for this event.');
} else {
  createChallenge(nextChallenge).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}