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

function getNextChallengeNumber() {
  if (requestedChallenge > 0) {
    log('DEBUG', `Using requested challenge: ${requestedChallenge}`);
    return requestedChallenge;
  }

  if (eventName === 'issues' && closedIssueTitle) {
    const current = getChallengeNumberFromTitle(closedIssueTitle);
    log('DEBUG', `Extracted challenge number from title "${closedIssueTitle}": ${current}`);
    if (!current) {
      log('WARN', 'Could not extract challenge number from closed issue title');
      return null;
    }
    if (current >= 1 && current < 16) {
      const next = current + 1;
      log('INFO', `Next challenge after ${current} is ${next}`);
      return next;
    }
    if (current === 16) {
      log('INFO', 'Challenge 16 is the last core challenge. Progression complete.');
      return null;
    }
  }

  log('DEBUG', `Event name: "${eventName}", Challenge determination failed`);
  return null;
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

async function issueAlreadyExists(titlePrefix) {
  log('INFO', `Checking if issue exists with prefix: "${titlePrefix}"`);
  try {
    // Fetch with pagination to handle more than 100 issues
    let page = 1;
    const perPage = 100;
    while (page <= 5) { // Check up to 500 issues max
      const issues = await githubRequest(`/repos/${owner}/${repo}/issues?state=all&per_page=${perPage}&page=${page}`);
      
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
        return true;
      }

      page += 1;
    }

    log('DEBUG', `No existing issue found with prefix "${titlePrefix}"`);
    return false;
  } catch (error) {
    log('ERROR', `Failed to check for existing issues: ${error.message}`);
    throw error;
  }
}

async function createChallenge(challengeNumber) {
  log('INFO', `Creating challenge ${challengeNumber}...`);
  
  try {
    const templateName = findTemplate(challengeNumber);
    const templatePath = path.join(challengeDirectory, templateName);
    
    log('DEBUG', `Reading template: ${templatePath}`);
    const content = fs.readFileSync(templatePath, 'utf8');
    
    if (!content || content.trim().length === 0) {
      throw new Error(`Template file is empty: ${templatePath}`);
    }

    const titleTemplate = readQuotedField(content, 'title') || readQuotedField(content, 'name');
    if (!titleTemplate) {
      throw new Error('Could not extract title from template');
    }

    // Handle username in title - support @{username} pattern
    const finalTitle = titleTemplate.replace(/@\{username\}/g, `@${actor || 'student'}`);
    const titlePrefix = `Challenge ${challengeNumber}:`;
    
    log('INFO', `Generated title: "${finalTitle}"`);

    const existingIssue = await issueAlreadyExists(titlePrefix);
    if (existingIssue) {
      log('WARN', `${titlePrefix} already exists. Skipping duplicate creation.`);
      return;
    }

    // Validate actor if assignees will be used
    let validAssignee = actor;
    if (actor) {
      log('DEBUG', `Validating assignee: ${actor}`);
      try {
        await githubRequest(`/users/${actor}`);
        log('DEBUG', `Assignee ${actor} exists`);
      } catch (error) {
        log('WARN', `Assignee ${actor} does not exist or is inaccessible: ${error.message}`);
        log('INFO', `Issue will be created without assignee. Ensure assignee is valid in GitHub.`);
        validAssignee = null;
      }
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

    log('INFO', `Successfully created challenge: ${issue.html_url}`);
    console.log(`Created ${finalTitle}: ${issue.html_url}`);
  } catch (error) {
    log('ERROR', `Failed to create challenge ${challengeNumber}: ${error.message}`);
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

const nextChallenge = getNextChallengeNumber();
if (!nextChallenge) {
  log('INFO', 'No challenge to create for this event.');
  console.log('No challenge to create for this event.');
} else {
  log('INFO', `Proceeding with Challenge ${nextChallenge}`);
  const afterCreate = nextChallenge === 7
    ? () => seedMergeConflict()
    : () => Promise.resolve();
  createChallenge(nextChallenge)
    .then(afterCreate)
    .catch(error => {
      log('ERROR', `Challenge progression failed: ${error.message}`);
      log('ERROR', error.stack);
      console.error(`FATAL: ${error.message}`);
      process.exitCode = 1;
    });
}