#!/usr/bin/env node
/**
 * Challenge Podcast Bundle Generator
 *
 * Creates local prompt bundles for short Challenge Coach episodes. These are
 * generated working files and are intentionally ignored by git.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'challenge-bundles');

const COMMON_SOURCES = [
  'docs/CHALLENGES.md',
  'classroom/assignment-day1-you-belong-here.md',
  'classroom/assignment-day2-you-can-build-this.md'
];

const challenges = [
  { id: '01', slug: 'find-your-way-around', title: 'Find Your Way Around', day: 'Day 1 foundation', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-01-find-your-way.yml', solution: 'docs/solutions/solution-01-scavenger-hunt.md', chapters: ['docs/02-understanding-github.md', 'docs/03-navigating-repositories.md', 'docs/04-the-learning-room.md'], focus: 'Repository orientation, headings, tabs, file tree navigation, and confidence in the Learning Room.' },
  { id: '02', slug: 'file-your-first-issue', title: 'File Your First Issue', day: 'Day 1 foundation', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-02-first-issue.yml', solution: 'docs/solutions/solution-02-first-issue.md', chapters: ['docs/05-working-with-issues.md'], focus: 'Finding a TODO, creating a clear issue, and explaining what needs to change.' },
  { id: '03', slug: 'join-the-conversation', title: 'Join the Conversation', day: 'Day 1 foundation', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-03-conversation.yml', solution: 'docs/solutions/solution-03-conversation.md', chapters: ['docs/05-working-with-issues.md', 'docs/08-open-source-culture.md'], focus: 'Comments, mentions, reactions, and constructive peer communication.' },
  { id: '04', slug: 'branch-out', title: 'Branch Out', day: 'Day 1 contribution', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-04-branch-out.yml', solution: 'docs/solutions/solution-04-branch-out.md', chapters: ['docs/04-the-learning-room.md', 'docs/06-working-with-pull-requests.md'], focus: 'Creating a safe working branch and understanding why branches protect main.' },
  { id: '05', slug: 'make-your-mark', title: 'Make Your Mark', day: 'Day 1 contribution', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-05-make-your-mark.yml', solution: 'docs/solutions/solution-05-make-your-mark.md', chapters: ['docs/04-the-learning-room.md', 'docs/06-working-with-pull-requests.md'], focus: 'Editing a file, writing a useful commit message, and connecting a change to an issue.' },
  { id: '06', slug: 'open-your-first-pr', title: 'Open Your First Pull Request', day: 'Day 1 contribution', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-06-first-pr.yml', solution: 'docs/solutions/solution-06-first-pr.md', chapters: ['docs/06-working-with-pull-requests.md'], focus: 'Opening a pull request, comparing branches, and using closing keywords.' },
  { id: '07', slug: 'survive-a-merge-conflict', title: 'Survive a Merge Conflict', day: 'Day 1 stretch', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-07-merge-conflict.yml', solution: 'docs/solutions/solution-07-merge-conflict.md', chapters: ['docs/07-merge-conflicts.md'], focus: 'Reading conflict markers, choosing content, deleting markers, and committing a resolution.' },
  { id: '08', slug: 'open-source-culture', title: 'The Culture Layer', day: 'Day 1 stretch', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-08-culture.yml', solution: 'docs/solutions/solution-08-culture.md', chapters: ['docs/08-open-source-culture.md', 'docs/09-labels-milestones-projects.md'], focus: 'Reflection, community norms, issue triage, labels, and respectful communication.' },
  { id: '09', slug: 'merge-day', title: 'Merge Day', day: 'Day 1 stretch', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-09-merge-day.yml', solution: 'docs/solutions/solution-09-merge-day.md', chapters: ['docs/06-working-with-pull-requests.md', 'docs/10-notifications-and-day-1-close.md'], focus: 'Final PR readiness, review signals, merging, and verifying linked issue closure.' },
  { id: '10', slug: 'go-local', title: 'Go Local', day: 'Day 2 local workflow', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-10-go-local.yml', solution: 'docs/solutions/solution-10-go-local.md', chapters: ['docs/13-how-git-works.md', 'docs/14-git-in-practice.md'], focus: 'Cloning, local branches, commits, pushing, and understanding local versus remote.' },
  { id: '11', slug: 'day-2-pull-request', title: 'Open a Day 2 PR', day: 'Day 2 local workflow', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-11-day2-pr.yml', solution: 'docs/solutions/solution-11-day2-pr.md', chapters: ['docs/14-git-in-practice.md', 'docs/15-code-review.md'], focus: 'Opening a pull request from a locally pushed branch and reading it in VS Code.' },
  { id: '12', slug: 'code-review', title: 'Review Like a Pro', day: 'Day 2 local workflow', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-12-review.yml', solution: 'docs/solutions/solution-12-review.md', chapters: ['docs/15-code-review.md', 'docs/08-open-source-culture.md'], focus: 'Reviewing a classmate PR, leaving specific feedback, and owning review tone.' },
  { id: '13', slug: 'copilot-as-collaborator', title: 'AI as Your Copilot', day: 'Day 2 local workflow', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-13-copilot.yml', solution: 'docs/solutions/solution-13-copilot.md', chapters: ['docs/16-github-copilot.md'], focus: 'Using Copilot as a reviewed writing partner while keeping human judgment in charge.' },
  { id: '14', slug: 'design-an-issue-template', title: 'Template Remix', day: 'Day 2 capstone', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-14-template.yml', solution: 'docs/solutions/solution-14-template.md', chapters: ['docs/17-issue-templates.md'], focus: 'YAML issue forms, accessible labels, required fields, and useful maintainer intake.' },
  { id: '15', slug: 'discover-accessibility-agents', title: 'Meet the Agents', day: 'Day 2 capstone', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-15-agents.yml', solution: 'docs/solutions/solution-15-agents.md', chapters: ['docs/19-accessibility-agents.md', 'docs/appendix-l-agents-reference.md'], focus: 'Exploring agent files, running agents carefully, and verifying AI output against manual skill.' },
  { id: '16', slug: 'build-your-own-agent', title: 'Build Your Agent (Capstone)', day: 'Day 2 capstone', template: 'learning-room/.github/ISSUE_TEMPLATE/challenge-16-capstone.yml', solution: 'docs/solutions/solution-16-capstone.md', chapters: ['docs/20-build-your-agent.md', 'docs/19-accessibility-agents.md'], focus: 'Designing an agent, writing responsibilities and guardrails, and preparing a contribution.' },
  { id: 'bonus-a', slug: 'improve-agent', title: 'Improve an Agent', day: 'Bonus', template: 'learning-room/.github/ISSUE_TEMPLATE/bonus-a-improve-agent.yml', solution: 'docs/solutions/solution-bonus-a.md', chapters: ['docs/19-accessibility-agents.md', 'docs/20-build-your-agent.md'], focus: 'Extending or improving an existing agent with a clear accessibility purpose.' },
  { id: 'bonus-b', slug: 'document-your-journey', title: 'Document Your Journey', day: 'Bonus', template: 'learning-room/.github/ISSUE_TEMPLATE/bonus-b-document-journey.yml', solution: 'docs/solutions/solution-bonus-b.md', chapters: ['docs/08-open-source-culture.md', 'docs/appendix-c-markdown-reference.md'], focus: 'Reflective documentation, portfolio language, and accessible Markdown.' },
  { id: 'bonus-c', slug: 'group-challenge', title: 'Group Challenge', day: 'Bonus', template: 'learning-room/.github/ISSUE_TEMPLATE/bonus-c-group-challenge.yml', solution: 'docs/solutions/solution-bonus-c.md', chapters: ['docs/08-open-source-culture.md', 'docs/15-code-review.md'], focus: 'Collaborative contribution, division of work, and communication across a small team.' },
  { id: 'bonus-d', slug: 'notifications', title: 'Notifications', day: 'Bonus', template: 'learning-room/.github/ISSUE_TEMPLATE/bonus-d-notifications.yml', solution: 'docs/solutions/solution-bonus-d.md', chapters: ['docs/10-notifications-and-day-1-close.md'], focus: 'Notification hygiene, mentions, subscriptions, and avoiding overload.' },
  { id: 'bonus-e', slug: 'git-history', title: 'Git History', day: 'Bonus', template: 'learning-room/.github/ISSUE_TEMPLATE/bonus-e-git-history.yml', solution: 'docs/solutions/solution-bonus-e.md', chapters: ['docs/13-how-git-works.md', 'docs/appendix-e-advanced-git.md'], focus: 'Reading history, understanding commits over time, and using history as a learning tool.' }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readRequired(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required source: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function buildPrompt(challenge) {
  return `# Git Going with GitHub - Challenge Coach Bundle

## Challenge ${challenge.id}: ${challenge.title}

**Series:** Challenge Coach
**Group:** ${challenge.day}
**Audience:** Blind and low-vision learners completing the Learning Room challenges
**Target length:** 5-8 minutes

---

### Audio Production Direction

Generate a short, conversational two-host teaching episode for this challenge.

**Required script format:**

- Use only [ALEX], [JAMIE], and [PAUSE] markers on their own lines
- Do not include headings, bullet lists, stage directions, music cues, citations, or markdown tables in the final script
- Alex is the warm expert guide
- Jamie is curious, funny, and willing to ask the learner's nervous questions
- Keep the banter kind, practical, and tied to the teaching moment
- Use spatial and structural language instead of visual-only instructions
- Say full key names, such as "Control plus Shift plus P"

**Teaching structure:**

1. Set the scene: what skill this challenge teaches and why it matters
2. Name the anxiety: what usually feels confusing here
3. Teach the concept before the steps
4. Walk the task in screen-reader-friendly language
5. Explain the evidence the learner submits
6. Explain what Aria or the autograder checks, if applicable
7. Name common mistakes and recovery paths
8. Describe what success sounds or feels like
9. Bridge to the next challenge

**Challenge focus:**

${challenge.focus}

---

`;
}

function buildBundle(challenge) {
  const sections = [buildPrompt(challenge)];
  const sources = [
    ...COMMON_SOURCES,
    challenge.template,
    challenge.solution,
    ...challenge.chapters
  ];

  const seen = new Set();
  for (const source of sources) {
    if (seen.has(source)) continue;
    seen.add(source);
    sections.push(`\n---\n\n## Source: ${source}\n\n${readRequired(source)}\n`);
  }

  return sections.join('\n');
}

function buildChallengeBundles() {
  ensureDir(OUT_DIR);
  let built = 0;

  for (const challenge of challenges) {
    const fileName = `challenge-${challenge.id}-${challenge.slug}.md`;
    const outPath = path.join(OUT_DIR, fileName);
    fs.writeFileSync(outPath, buildBundle(challenge), 'utf8');
    built += 1;
    console.log(`  ${fileName}`);
  }

  console.log(`\nChallenge podcast bundles generated: ${built}`);
  console.log(`Output directory: ${OUT_DIR}`);
}

module.exports = { challenges, buildChallengeBundles };

if (require.main === module) {
  buildChallengeBundles();
}
