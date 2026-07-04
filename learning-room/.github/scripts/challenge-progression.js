#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY || '';
const actor = process.env.CHALLENGE_ASSIGNEE || process.env.GITHUB_ACTOR;
const eventName = process.env.GITHUB_EVENT_NAME || '';
const requestedChallenge = Number(process.env.START_CHALLENGE || 0);
const closedIssueTitle = process.env.CLOSED_ISSUE_TITLE || '';

// Logging helper
function log(level, message) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [${level}] ${message}`);
}

if (!token) {
  throw new Error('GITHUB_TOKEN is required.');
}

const [owner, repo] = repository.split('/');
if (!owner || !repo) {
  throw new Error('GITHUB_REPOSITORY must be set to owner/repo.');
}

log('INFO', `Starting challenge progression for ${repository}`);
log('INFO', `Event: ${eventName}, Actor: ${actor}, Requested Challenge: ${requestedChallenge}`);
log('INFO', `Closed issue title: "${closedIssueTitle}"`);

const challengeDirectory = path.join(process.cwd(), '.github', 'ISSUE_TEMPLATE');

// Validate challenge directory exists
if (!fs.existsSync(challengeDirectory)) {
  throw new Error(`Challenge template directory not found: ${challengeDirectory}`);
}

function getChallengeNumberFromTitle(title) {
  const match = title.match(/Challenge\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function getProgressionTargets() {
  if (requestedChallenge > 0) {
    log('DEBUG', `Using requested challenge: ${requestedChallenge}`);
    return [{ kind: 'challenge', number: requestedChallenge }];
  }

  if (eventName === 'issues' && closedIssueTitle) {
    const current = getChallengeNumberFromTitle(closedIssueTitle);
    log('DEBUG', `Extracted challenge number from title "${closedIssueTitle}": ${current}`);
    if (!current) {
      log('WARN', 'Could not extract challenge number from closed issue title');
      return [];
    }
    if (current >= 1 && current < 15) {
      const next = current + 1;
      log('INFO', `Next challenge after ${current} is ${next}`);
      return [{ kind: 'challenge', number: next }];
    }
    if (current === 15) {
      log('INFO', 'Challenge 15 closed. Unlocking Challenge 16 and Bonus A-E.');
      return [
        { kind: 'challenge', number: 16 },
        { kind: 'bonus', template: 'bonus-a-improve-agent.yml' },
        { kind: 'bonus', template: 'bonus-b-document-journey.yml' },
        { kind: 'bonus', template: 'bonus-c-group-challenge.yml' },
        { kind: 'bonus', template: 'bonus-d-notifications.yml' },
        { kind: 'bonus', template: 'bonus-e-git-history.yml' }
      ];
    }
    if (current === 16) {
      log('INFO', 'Challenge 16 is the last core challenge. Progression complete.');
      return [];
    }
  }

  log('DEBUG', `Event name: "${eventName}", Challenge determination failed`);
  return [];
}

function findTemplate(challengeNumber) {
  if (!Number.isInteger(challengeNumber) || challengeNumber < 1 || challengeNumber > 99) {
    throw new Error(`Invalid challenge number: ${challengeNumber}`);
  }

  const prefix = `challenge-${String(challengeNumber).padStart(2, '0')}-`;
  log('DEBUG', `Looking for template with prefix: ${prefix}`);
  
  try {
    const templates = fs.readdirSync(challengeDirectory);
    log('DEBUG', `Available templates: ${templates.length}`);
    const found = templates.find(fileName => fileName.startsWith(prefix) && fileName.endsWith('.yml'));
    
    if (!found) {
      throw new Error(`No template found matching ${prefix}*.yml`);
    }
    
    log('INFO', `Found template: ${found}`);
    return found;
  } catch (error) {
    throw new Error(`Failed to find template for Challenge ${challengeNumber}: ${error.message}`);
  }
}

function readQuotedField(content, fieldName) {
  const match = content.match(new RegExp(`^${fieldName}:\\s*"([^"]+)"`, 'm'));
  if (!match) {
    log('DEBUG', `Field ${fieldName} not found in template`);
    return '';
  }
  return match[1];
}

function readLabels(content) {
  const match = content.match(/^labels:\s*\[([^\]]+)\]/m);
  if (!match) {
    log('DEBUG', 'No labels found in template, using default [challenge]');
    return ['challenge'];
  }
  const labels = match[1]
    .split(',')
    .map(label => label.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);
  log('DEBUG', `Extracted labels: ${labels.join(', ')}`);
  return labels;
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

async function githubRequest(route, options = {}, retries = 3) {
  const method = options.method || 'GET';
  const url = `https://api.github.com${route}`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      log('DEBUG', `${method} ${route} (attempt ${attempt}/${retries})`);
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (response.status === 403) {
        const body = await response.text();
        log('ERROR', `Rate limited or forbidden: ${response.status} ${body}`);
        if (attempt < retries) {
          const waitTime = Math.min(2 ** attempt * 1000, 30000);
          log('INFO', `Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      }

      if (!response.ok) {
        const body = await response.text();
        const errorMsg = `${method} ${route} failed: ${response.status} ${body}`;
        if (attempt < retries) {
          log('WARN', `${errorMsg} (retrying...)`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        throw new Error(errorMsg);
      }

      if (response.status === 204) {
        log('DEBUG', `${method} ${route} succeeded (no content)`);
        return null;
      }

      const data = await response.json();
      log('DEBUG', `${method} ${route} succeeded`);
      return data;
    } catch (error) {
      log('ERROR', `Request failed: ${error.message}`);
      if (attempt < retries) {
        log('INFO', `Retrying in 1 second...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw error;
      }
    }
  }
}

async function findIssueByTitlePrefix(titlePrefix, request = githubRequest) {
  log('INFO', `Checking if issue exists with prefix: "${titlePrefix}"`);
  try {
    // Fetch with pagination to handle more than 100 issues
    let page = 1;
    const perPage = 100;
    while (page <= 5) { // Check up to 500 issues max
      const issues = await request(`/repos/${owner}/${repo}/issues?state=all&per_page=${perPage}&page=${page}`);

      if (!Array.isArray(issues)) {
        log('WARN', `Expected array from issues API, got: ${typeof issues}`);
        break;
      }

      if (issues.length === 0) {
        log('DEBUG', `No more issues to check (page ${page})`);
        break;
      }

      const found = issues.find(issue => issue.title && issue.title.startsWith(titlePrefix));
      if (found) {
        log('INFO', `Found existing issue: ${found.title} (#${found.number})`);
        return found;
      }

      page += 1;
    }

    log('DEBUG', `No existing issue found with prefix "${titlePrefix}"`);
    return null;
  } catch (error) {
    log('ERROR', `Failed to check for existing issues: ${error.message}`);
    throw error;
  }
}

async function issueAlreadyExists(titlePrefix, request = githubRequest) {
  return Boolean(await findIssueByTitlePrefix(titlePrefix, request));
}

// A GitHub user can only be assigned when they have access to the repository.
// Right after provisioning the learner's collaborator invitation is still
// pending, so they exist as a user but are not yet assignable; creating the
// issue with them as assignee fails with HTTP 422. Check assignability in
// this repository (204 when assignable, 404 when not) and degrade to an
// unassigned issue instead of failing the run.
async function resolveValidAssignee(candidate, request = githubRequest) {
  if (!candidate) {
    return null;
  }
  log('DEBUG', `Validating assignee: ${candidate}`);
  try {
    await request(`/repos/${owner}/${repo}/assignees/${candidate}`, {}, 1);
    log('DEBUG', `Assignee ${candidate} can be assigned in this repository`);
    return candidate;
  } catch (error) {
    log('WARN', `Assignee ${candidate} cannot be assigned yet (pending invitation or no repo access): ${error.message}`);
    log('INFO', 'Issue will be created without an assignee.');
    return null;
  }
}

async function createChallenge(challengeNumber) {
  const templateName = findTemplate(challengeNumber);
  return createIssueFromTemplate(templateName, `Challenge ${challengeNumber}`);
}

async function createIssueFromTemplate(templateName, fallbackLabel) {
  log('INFO', `Creating issue from template ${templateName}...`);

  try {
    const templatePath = path.join(challengeDirectory, templateName);
    
    log('DEBUG', `Reading template: ${templatePath}`);
    const content = fs.readFileSync(templatePath, 'utf8');
    
    if (!content || content.trim().length === 0) {
      throw new Error(`Template file is empty: ${templatePath}`);
    }

    const canonicalName = readQuotedField(content, 'name');
    const titleTemplate = readQuotedField(content, 'title') || canonicalName;
    if (!titleTemplate) {
      throw new Error('Could not extract title from template');
    }

    // Handle username in title - support @{username} pattern
    const finalTitle = titleTemplate.replace(/@\{username\}/g, `@${actor || 'student'}`);
    const titlePrefix = canonicalName || fallbackLabel || finalTitle.replace(/\s+\(@[^)]+\)$/, '');
    
    log('INFO', `Generated title: "${finalTitle}"`);

    const existingIssue = await issueAlreadyExists(titlePrefix);
    if (existingIssue) {
      log('WARN', `${titlePrefix} already exists. Skipping duplicate creation.`);
      return;
    }

    const validAssignee = await resolveValidAssignee(actor);

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

    const body = bodyParts.filter(Boolean).join('\n\n---\n\n');
    log('DEBUG', `Body length: ${body.length} characters`);

    const labels = readLabels(content);
    const assignees = validAssignee ? [validAssignee] : [];

    log('INFO', `Creating issue with:
      - Title: "${finalTitle}"
      - Labels: [${labels.join(', ')}]
      - Assignees: [${assignees.join(', ') || '(none)'}]`);

    const issue = await githubRequest(`/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      body: {
        title: finalTitle,
        body,
        labels,
        assignees
      }
    });

    log('INFO', `Successfully created issue: ${issue.html_url}`);
    console.log(`Created ${finalTitle}: ${issue.html_url}`);
  } catch (error) {
    log('ERROR', `Failed to create issue from template ${templateName}: ${error.message}`);
    throw error;
  }
}

async function seedMergeConflict() {
  const filePath = 'docs/welcome.md';
  log('INFO', 'Seeding merge conflict for Challenge 7...');
  try {
    const fileData = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}?ref=main`);
    const currentContent = Buffer.from(fileData.content.replace(/\n/g, ''), 'base64').toString('utf8');
    const todoPattern = /\[TODO: Add a paragraph explaining that contributors come from all backgrounds[^\]]+\]/;
    const replacement = 'Contributors come from many backgrounds, skill levels, countries, and access needs. People who use assistive technology bring practical insight that helps projects work better for everyone.';
    if (!todoPattern.test(currentContent)) {
      log('INFO', 'TODO placeholder not found on main — conflict already seeded or student replaced it. Skipping.');
      return;
    }
    const newContent = currentContent.replace(todoPattern, replacement);
    const encoded = Buffer.from(newContent).toString('base64');
    await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      body: {
        message: 'Workshop: seed merge conflict for Challenge 7 practice',
        content: encoded,
        sha: fileData.sha,
        branch: 'main'
      }
    });
    log('INFO', 'Merge conflict seeded successfully on main.');
    console.log('Merge conflict seeded on main for Challenge 7.');
  } catch (error) {
    log('WARN', `Could not seed merge conflict: ${error.message}. Students can still resolve manually.`);
  }
}

// Peer simulation artifacts. Challenges 1-13 tell the student to comment on,
// react to, review, or compare with a seeded "peer" issue and pull request.
// These were originally created by scripts/classroom/Seed-PeerSimulation.ps1,
// which was removed with GitHub Classroom; the learning room now seeds them
// itself. Every helper is idempotent so this can run on every progression
// event and quietly repair a room that is missing an artifact.
const PEER_SIM_ISSUE_TITLE = 'Peer Simulation: Welcome Link Needs Context';
const PEER_SIM_REVIEW_ISSUE_TITLE = 'Peer Simulation: Review Request for Contribution Guidance';
const PEER_SIM_PR_TITLE = 'Peer Simulation: Improve contribution guidance';
const PEER_SIM_BRANCH = 'peer-simulation/review-pr';
const PEER_SIM_FILE = 'docs/samples/peer-review-practice.md';

const PEER_SIM_LABELS = [
  { name: 'peer-simulation', color: '5319e7', description: 'Seeded scenario that simulates peer collaboration in a private Learning Room' },
  { name: 'needs-triage', color: 'fbca04', description: 'Needs issue triage or clarification' },
  { name: 'accessibility', color: '0052cc', description: 'Accessibility-related practice item' },
  { name: 'review-practice', color: '0e8a16', description: 'Pull request review practice' }
];

async function ensureLabel(label, request = githubRequest) {
  try {
    await request(`/repos/${owner}/${repo}/labels`, { method: 'POST', body: label }, 1);
    log('INFO', `Created label: ${label.name}`);
  } catch (error) {
    if (/already_exists|422/.test(error.message)) {
      log('DEBUG', `Label ${label.name} already exists.`);
      return;
    }
    throw error;
  }
}

async function ensurePeerIssue(title, bodyLines, labels, request = githubRequest) {
  const existing = await findIssueByTitlePrefix(title, request);
  if (existing) {
    log('DEBUG', `${title} already exists (#${existing.number}).`);
    return existing;
  }
  const issue = await request(`/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    body: { title, body: bodyLines.join('\n'), labels }
  });
  log('INFO', `Created peer simulation issue: ${issue.html_url}`);
  console.log(`Created ${title}: ${issue.html_url}`);
  return issue;
}

async function ensurePeerSimulationBranch(request = githubRequest) {
  try {
    await request(`/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(PEER_SIM_BRANCH)}`, {}, 1);
    log('DEBUG', `Branch ${PEER_SIM_BRANCH} already exists.`);
  } catch (error) {
    const mainRef = await request(`/repos/${owner}/${repo}/git/ref/heads/main`, {}, 1);
    await request(`/repos/${owner}/${repo}/git/refs`, {
      method: 'POST',
      body: { ref: `refs/heads/${PEER_SIM_BRANCH}`, sha: mainRef.object.sha }
    });
    log('INFO', `Created branch ${PEER_SIM_BRANCH}.`);
  }

  try {
    await request(`/repos/${owner}/${repo}/contents/${PEER_SIM_FILE}?ref=${encodeURIComponent(PEER_SIM_BRANCH)}`, {}, 1);
    log('DEBUG', `${PEER_SIM_FILE} already exists on ${PEER_SIM_BRANCH}.`);
    return;
  } catch (error) {
    log('DEBUG', `${PEER_SIM_FILE} not found on ${PEER_SIM_BRANCH}; creating it.`);
  }

  const sampleLines = [
    '# Peer Review Practice',
    '',
    'This file simulates a contribution from another workshop participant.',
    '',
    '## Proposed Change',
    '',
    'Open source contributors should explain what they changed and why it matters. This practice file gives you something realistic to review without requiring access to another student repository.',
    '',
    '## Review Prompts',
    '',
    '- Is the purpose of the change clear?',
    '- Is the language welcoming?',
    '- Is anything missing for screen reader users?',
    '- What is one specific improvement you can suggest?'
  ];
  await request(`/repos/${owner}/${repo}/contents/${PEER_SIM_FILE}`, {
    method: 'PUT',
    body: {
      message: 'Add peer review practice scenario',
      content: Buffer.from(sampleLines.join('\n') + '\n').toString('base64'),
      branch: PEER_SIM_BRANCH
    }
  });
  log('INFO', `Committed ${PEER_SIM_FILE} to ${PEER_SIM_BRANCH}.`);
}

async function ensurePeerSimulationPullRequest(reviewIssueNumber, request = githubRequest) {
  const existing = await request(`/repos/${owner}/${repo}/pulls?head=${owner}:${encodeURIComponent(PEER_SIM_BRANCH)}&state=all`, {}, 1);
  if (Array.isArray(existing) && existing.length > 0) {
    log('DEBUG', `Peer simulation PR already exists (#${existing[0].number}).`);
    return;
  }
  const bodyLines = [
    '## Peer Simulation PR',
    '',
    'This pull request simulates a contribution from another workshop participant.',
    '',
    'Use it for challenges that ask you to review, comment on, or compare with a peer contribution.',
    reviewIssueNumber ? `\nRelated issue: #${reviewIssueNumber}` : ''
  ].filter(Boolean);
  const pr = await request(`/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    body: {
      title: PEER_SIM_PR_TITLE,
      head: PEER_SIM_BRANCH,
      base: 'main',
      body: bodyLines.join('\n')
    }
  });
  log('INFO', `Created peer simulation PR: ${pr.html_url}`);
  console.log(`Created ${PEER_SIM_PR_TITLE}: ${pr.html_url}`);
}

async function ensurePeerSimulationArtifacts(request = githubRequest) {
  log('INFO', 'Ensuring peer simulation artifacts exist...');
  try {
    for (const label of PEER_SIM_LABELS) {
      await ensureLabel(label, request);
    }

    const studentLine = actor
      ? `This scenario was prepared for @${actor}.`
      : 'This scenario was prepared for the student using this repository.';

    await ensurePeerIssue(PEER_SIM_ISSUE_TITLE, [
      '## Peer Simulation: Welcome Link Needs Context',
      '',
      studentLine,
      '',
      'A simulated peer noticed that `docs/welcome.md` still has placeholder TODO content and does not yet explain why assistive technology users bring valuable perspective to open source projects.',
      '',
      '### Your collaboration task',
      '',
      'Use this issue when a challenge asks you to interact with another person. Treat this as a real peer report:',
      '',
      '1. Read the issue description.',
      '2. Leave a constructive comment or clarifying question.',
      '3. Practice an @mention in one comment when a challenge asks for it. Mentioning your own username works fine.',
      '4. Add a reaction if the challenge asks you to practice reactions.',
      '5. For triage practice, add or discuss useful labels.',
      '',
      '### Real-world skill',
      '',
      'This simulates reviewing a teammate issue in a shared open source project while keeping the workshop repository private.'
    ], ['peer-simulation', 'needs-triage', 'accessibility'], request);

    const reviewIssue = await ensurePeerIssue(PEER_SIM_REVIEW_ISSUE_TITLE, [
      '## Peer Simulation: Review Request for Contribution Guidance',
      '',
      studentLine,
      '',
      'A simulated peer opened a pull request that improves contribution guidance. Your task is to review it the way you would review a teammate contribution.',
      '',
      '### What to practice',
      '',
      '- Read the linked peer simulation pull request.',
      '- Leave at least one specific comment.',
      '- For Challenge 12, submit a formal review verdict if GitHub offers that option.',
      '- Be kind, specific, and useful.',
      '',
      'This issue exists so private learning rooms can still include realistic peer collaboration.'
    ], ['peer-simulation', 'review-practice'], request);

    await ensurePeerSimulationBranch(request);
    await ensurePeerSimulationPullRequest(reviewIssue && reviewIssue.number, request);
    log('INFO', 'Peer simulation artifacts are in place.');
  } catch (error) {
    // Never fail challenge progression because peer simulation seeding
    // hiccuped; the next progression event will retry, and students can
    // fall back to a real buddy repository.
    log('WARN', `Could not fully seed peer simulation artifacts: ${error.message}`);
    console.log(`Warning: peer simulation seeding incomplete: ${error.message}`);
  }
}

if (require.main === module) {
  const progressionTargets = getProgressionTargets();
  if (!progressionTargets.length) {
    log('INFO', 'No challenge to create for this event.');
    console.log('No challenge to create for this event.');
  } else {
    log('INFO', `Proceeding with ${progressionTargets.length} progression target(s).`);
    (async () => {
      // Seed (or repair) the peer simulation issue, branch, and PR before the
      // next challenge issue lands, so its instructions always have something
      // to point at.
      await ensurePeerSimulationArtifacts();

      for (const target of progressionTargets) {
        if (target.kind === 'challenge') {
          await createChallenge(target.number);
        } else if (target.kind === 'bonus') {
          await createIssueFromTemplate(target.template, 'Bonus');
        }
      }

      if (progressionTargets.some(target => target.kind === 'challenge' && target.number === 7)) {
        await seedMergeConflict();
      }
    })()
      .catch(error => {
        log('ERROR', `Challenge progression failed: ${error.message}`);
        log('ERROR', error.stack);
        console.error(`FATAL: ${error.message}`);
        process.exitCode = 1;
      });
  }
}

module.exports = {
  resolveValidAssignee,
  ensurePeerSimulationArtifacts,
  ensureLabel,
  ensurePeerIssue,
  ensurePeerSimulationBranch,
  ensurePeerSimulationPullRequest
};