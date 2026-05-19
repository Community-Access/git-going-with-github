#!/usr/bin/env node
// lint-no-hardcoded-slugs: allow (appendix-X topic routing; will be remapped when appendices renumber in Stage 3)
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const SOURCE_SETS = {
  base: [
    ['GitHub Docs, home', 'https://docs.github.com/en'],
    ['GitHub Changelog', 'https://github.blog/changelog/']
  ],
  git: [
    ['About Git', 'https://docs.github.com/en/get-started/using-git/about-git'],
    ['GitHub flow', 'https://docs.github.com/en/get-started/using-github/github-flow'],
    ['About pull requests', 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests'],
    ['About issues', 'https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues'],
    ['Contributing to a project', 'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project']
  ],
  copilot: [
    ['GitHub Copilot docs', 'https://docs.github.com/en/copilot'],
    ['Custom instructions support matrix', 'https://docs.github.com/en/copilot/reference/custom-instructions-support'],
    ['About custom agents', 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents'],
    ['About agent skills', 'https://docs.github.com/en/copilot/concepts/agents/about-agent-skills'],
    ['About auto model selection', 'https://docs.github.com/en/copilot/concepts/auto-model-selection'],
    ['Copilot changelog feed', 'https://github.blog/changelog/label/copilot/']
  ],
  vscode: [
    ['VS Code Copilot chat overview', 'https://code.visualstudio.com/docs/copilot/chat/copilot-chat'],
    ['VS Code agent overview', 'https://code.visualstudio.com/docs/copilot/agents/overview'],
    ['VS Code custom instructions', 'https://code.visualstudio.com/docs/copilot/customization/custom-instructions']
  ],
  actions: [
    ['Workflow syntax for GitHub Actions', 'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax'],
    ['Secure use reference for GitHub Actions', 'https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions'],
    ['GitHub Actions changelog', 'https://github.blog/changelog/label/actions/']
  ],
  security: [
    ['GitHub security features', 'https://docs.github.com/en/code-security/getting-started/github-security-features'],
    ['Dependabot docs', 'https://docs.github.com/en/code-security/dependabot'],
    ['Secret scanning docs', 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning']
  ],
  accessibility: [
    ['W3C Web Content Accessibility Guidelines (WCAG) 2 overview', 'https://www.w3.org/WAI/standards-guidelines/wcag/'],
    ['WAI tutorials for accessible design patterns', 'https://www.w3.org/WAI/tutorials/'],
    ['WAI-ARIA Authoring Practices Guide', 'https://www.w3.org/WAI/ARIA/apg/'],
    ['GitHub accessibility statement', 'https://docs.github.com/en/site-policy/other-site-policies/github-accessibility-statement']
  ],
  mobile: [
    ['GitHub Mobile docs', 'https://docs.github.com/en/get-started/using-github/github-mobile'],
    ['GitHub Mobile changelog', 'https://github.blog/changelog/label/client-apps/']
  ],
  pages: [
    ['GitHub Pages docs', 'https://docs.github.com/en/pages'],
    ['GitHub Pages quickstart', 'https://docs.github.com/en/pages/quickstart']
  ],
  cli: [
    ['GitHub CLI manual', 'https://cli.github.com/manual/'],
    ['GitHub Copilot CLI docs', 'https://docs.github.com/en/copilot/github-copilot-in-the-cli']
  ],
  desktop: [
    ['GitHub Desktop docs', 'https://docs.github.com/en/desktop'],
    ['GitHub Desktop site', 'https://desktop.github.com/']
  ],
  discussions: [
    ['GitHub Discussions docs', 'https://docs.github.com/en/discussions'],
    ['GitHub Gists docs', 'https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists']
  ],
  projects: [
    ['GitHub Projects docs', 'https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects'],
    ['Labels docs', 'https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels'],
    ['Milestones docs', 'https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones']
  ],
  search: [
    ['GitHub code search syntax', 'https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax'],
    ['Advanced search docs', 'https://docs.github.com/en/search-github/searching-on-github/searching-on-github']
  ],
  releases: [
    ['About releases', 'https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases'],
    ['Managing releases and tags', 'https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository']
  ],
  identity: [
    ['Git authentication overview', 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github'],
    ['Managing personal access tokens', 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens']
  ],
  protection: [
    ['About protected branches', 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches'],
    ['About rulesets', 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets']
  ],
  skills: [
    ['GitHub Skills catalog', 'https://skills.github.com/'],
    ['GitHub Learning Pathways', 'https://resources.github.com/learn/pathways/']
  ]
};

function normalize(p) {
  return p.replace(/\\/g, '/');
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
      continue;
    }
    if (entry.isFile() && full.toLowerCase().endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function includeContentFile(relPath) {
  const n = normalize(relPath);
  if (!n.toLowerCase().endsWith('.md')) return false;

  const excludedPrefixes = [
    'podcasts/',
    'html/',
    '.github/instructions/',
    '.github/skills/',
    '.github/agents/',
    '.github/prompts/',
    'agents/'
  ];

  if (excludedPrefixes.some(prefix => n.startsWith(prefix))) return false;

  if (n.startsWith('docs/')) return true;
  if (n.startsWith('classroom/')) return true;
  if (n.startsWith('learning-room/')) return true;
  if (n.startsWith('admin/')) return true;

  if (!n.includes('/')) return true;
  return false;
}

function canonicalForTopic(relPath) {
  if (relPath.startsWith('admin/qa-bundle/docs/')) {
    return `docs/${relPath.slice('admin/qa-bundle/docs/'.length)}`;
  }
  if (relPath.startsWith('admin/qa-bundle/classroom/')) {
    return `classroom/${relPath.slice('admin/qa-bundle/classroom/'.length)}`;
  }
  if (relPath.startsWith('admin/qa-bundle/learning-room/')) {
    return `learning-room/${relPath.slice('admin/qa-bundle/learning-room/'.length)}`;
  }
  return relPath;
}

function addSourceSet(unique, setName) {
  const set = SOURCE_SETS[setName] || [];
  for (const [label, url] of set) unique.set(url, [label, url]);
}

function makeTopicLinks(relPath) {
  const topicPath = canonicalForTopic(relPath).toLowerCase();
  const unique = new Map();

  addSourceSet(unique, 'base');

  if (topicPath.includes('copilot') || topicPath.includes('agent') || topicPath.includes('appendix-k') || topicPath.includes('appendix-l') || topicPath.includes('appendix-aa') || topicPath.includes('appendix-ab') || topicPath.includes('appendix-ac')) {
    addSourceSet(unique, 'copilot');
    addSourceSet(unique, 'vscode');
  }
  if (topicPath.includes('accessibility') || topicPath.includes('screen-reader') || topicPath.includes('appendix-m') || topicPath.includes('markdown-reference') || topicPath.includes('human_test_matrix')) addSourceSet(unique, 'accessibility');
  if (topicPath.includes('actions') || topicPath.includes('workflow') || topicPath.includes('appendix-q')) addSourceSet(unique, 'actions');
  if (topicPath.includes('security') || topicPath.includes('appendix-f') || topicPath.includes('appendix-p') || topicPath.includes('authentication') || topicPath.includes('appendix-d')) addSourceSet(unique, 'security');
  if (topicPath.includes('vscode') || topicPath.includes('appendix-g') || topicPath.includes('cloud-editors') || topicPath.includes('appendix-j')) addSourceSet(unique, 'vscode');
  if (topicPath.includes('mobile') || topicPath.includes('appendix-v')) addSourceSet(unique, 'mobile');
  if (topicPath.includes('pages') || topicPath.includes('appendix-w')) addSourceSet(unique, 'pages');
  if (topicPath.includes('appendix-i') || topicPath.includes('cli')) addSourceSet(unique, 'cli');
  if (topicPath.includes('appendix-h') || topicPath.includes('desktop')) addSourceSet(unique, 'desktop');
  if (topicPath.includes('appendix-u') || topicPath.includes('discussions') || topicPath.includes('gist')) addSourceSet(unique, 'discussions');
  if (topicPath.includes('appendix-r') || topicPath.includes('appendix-o') || topicPath.includes('labels') || topicPath.includes('milestones') || topicPath.includes('projects')) addSourceSet(unique, 'projects');
  if (topicPath.includes('appendix-n') || topicPath.includes('search')) addSourceSet(unique, 'search');
  if (topicPath.includes('appendix-s') || topicPath.includes('release') || topicPath.includes('tags') || topicPath.includes('insights')) addSourceSet(unique, 'releases');
  if (topicPath.includes('appendix-d') || topicPath.includes('auth')) addSourceSet(unique, 'identity');
  if (topicPath.includes('appendix-o') || topicPath.includes('branch-protection')) addSourceSet(unique, 'protection');
  if (topicPath.includes('appendix-z') || topicPath.includes('skills')) addSourceSet(unique, 'skills');

  if (topicPath.startsWith('classroom/') || topicPath.includes('challenge') || /^docs\/[0-9]{2}-/.test(topicPath)) {
    addSourceSet(unique, 'git');
  }

  return Array.from(unique.values());
}

function extractMajorHeadings(content) {
  const rawHeadings = content
    .split(/\r?\n/)
    .map(line => line.match(/^##\s+(.+?)\s*$/))
    .filter(Boolean)
    .map(match => match[1].trim())
    .filter(heading => !/^Authoritative Sources$/i.test(heading));

  const ignoredHeadings = new Set([
    'table of contents',
    'what happened',
    'what i expected',
    'how to reproduce',
    'environment',
    'additional context',
    'description',
    'related issue',
    'type of change',
    'testing',
    'checklist',
    'screenshots',
    'problem',
    'context',
    'solution ideas',
    'tone',
    'constraints',
    'behavior',
    'describe the bug',
    'steps to reproduce',
    'before submitting',
    'how to test',
    'accessibility considerations',
    'my github username',
    'repositories i work on most',
    'preferred output format',
    'notification priority',
    'issues opened (last 24 hours)',
    'pull requests awaiting your review',
    'ci failures on your branches',
    'security alerts',
    'community activity',
    'related issues',
    'related issue',
    'what does this pr do?',
    'why is this useful?',
    'recommendations',
    'how was this tested?',
    'purpose',
    'your capabilities',
    'domain knowledge',
    'responsibilities',
    'response guidelines'
  ]);

  const ignoredPatterns = [
    /^screenshots?(\s*\(if applicable\))?$/,
    /^what to do$/,
    /^what you'll learn$/,
    /^what you will learn$/,
    /^quick reference( card)?$/,
    /^step \d+[:\-\s].*$/,
    /^checkpoint$/, 
    /^expected behavior$/,
    /^actual behavior$/,
    /^component affected$/,
    /^your assistive technology setup$/,
    /^wcag success criterion(.*)$/,
    /^open issues(.*)$/,
    /^draft reply(.*)$/,
    /^pr review[:\-\s].*$/,
    /^team velocity(.*)$/,
    /^accessibility changes(.*)$/
  ];

  const normalized = new Set();
  const filtered = [];

  for (const heading of rawHeadings) {
    const canonical = heading
      .toLowerCase()
      .replace(/^\d+[a-z]?\.?\s+/, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!canonical) continue;
    if (ignoredHeadings.has(canonical)) continue;
    if (ignoredPatterns.some(pattern => pattern.test(canonical))) continue;
    if (normalized.has(canonical)) continue;

    normalized.add(canonical);
    filtered.push(heading);
  }

  return filtered.slice(0, 16);
}

function sectionLinksForHeading(relPath, heading) {
  const h = heading.toLowerCase();
  const unique = new Map();
  addSourceSet(unique, 'base');

  // Start with file-level topic context so every heading inherits core references.
  for (const [label, url] of makeTopicLinks(relPath)) unique.set(url, [label, url]);

  if (/(copilot|agent|model|prompt|mcp|cli)/.test(h)) {
    addSourceSet(unique, 'copilot');
    addSourceSet(unique, 'vscode');
  }
  if (/(issue|pull request|pr\b|branch|commit|merge|fork|git|repository)/.test(h)) addSourceSet(unique, 'git');
  if (/(action|workflow|runner|pipeline|ci\b|cd\b|oidc)/.test(h)) addSourceSet(unique, 'actions');
  if (/(security|secret|dependabot|vulnerability|auth|token|credential)/.test(h)) {
    addSourceSet(unique, 'security');
    addSourceSet(unique, 'identity');
    addSourceSet(unique, 'protection');
  }
  if (/(accessibility|screen reader|aria|wcag|keyboard|contrast|alt text)/.test(h)) addSourceSet(unique, 'accessibility');
  if (/(vscode|visual studio code|editor|chat|agents window)/.test(h)) addSourceSet(unique, 'vscode');
  if (/(project|label|milestone|board|planning)/.test(h)) addSourceSet(unique, 'projects');
  if (/(search|query|filter)/.test(h)) addSourceSet(unique, 'search');
  if (/(release|tag|version|insight|analytics)/.test(h)) addSourceSet(unique, 'releases');
  if (/(mobile|ios|android)/.test(h)) addSourceSet(unique, 'mobile');
  if (/(pages|site|static)/.test(h)) addSourceSet(unique, 'pages');
  if (/(desktop app|github desktop)/.test(h)) addSourceSet(unique, 'desktop');
  if (/(discussion|gist|community)/.test(h)) addSourceSet(unique, 'discussions');
  if (/(skill|learning|training|pathway)/.test(h)) addSourceSet(unique, 'skills');

  return Array.from(unique.values()).slice(0, 5);
}

function buildSectionLevelMap(relPath, content) {
  const headings = extractMajorHeadings(content);
  if (!headings.length) {
    const links = sectionLinksForHeading(relPath, 'File Overview')
      .map(([label, url]) => `[${label}](${url})`)
      .join(', ');

    return [
      '### Section-Level Source Map',
      '',
      'Use this map to verify facts for each major section in this file.',
      '',
      `- **File Overview:** ${links}`,
      ''
    ].join('\n');
  }

  const lines = [];
  lines.push('### Section-Level Source Map');
  lines.push('');
  lines.push('Use this map to verify facts for each major section in this file.');
  lines.push('');

  for (const heading of headings) {
    const links = sectionLinksForHeading(relPath, heading)
      .map(([label, url]) => `[${label}](${url})`)
      .join(', ');
    lines.push(`- **${heading}:** ${links}`);
  }

  lines.push('');
  return lines.join('\n');
}

function stripCurrentSection(content) {
  const lines = content.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s+Authoritative\s+Sources\s*$/i.test(lines[i].trim())) {
      start = i;
      break;
    }
  }
  if (start === -1) return content.trimEnd();

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }

  return [...lines.slice(0, start), ...lines.slice(end)].join('\n').trimEnd();
}

function buildSection(relPath) {
  const links = makeTopicLinks(relPath);
  const bulletLines = links.map(([label, url]) => `- [${label}](${url})`).join('\n');
  return `## Authoritative Sources\n\nUse these official references when you need the current source of truth for facts in this chapter.\n\n${bulletLines}\n`;
}

function refreshFile(relPath) {
  const fullPath = path.join(root, relPath);
  const original = fs.readFileSync(fullPath, 'utf8');
  const base = stripCurrentSection(original);
  const section = buildSection(relPath);
  const sectionMap = buildSectionLevelMap(relPath, base);
  const combined = sectionMap ? `${section}\n${sectionMap}` : section;
  const next = `${base}\n\n${combined}`.replace(/\n{3,}/g, '\n\n');
  if (next !== original) {
    fs.writeFileSync(fullPath, next, 'utf8');
    return 1;
  }
  return 0;
}

const targets = new Set();
const contentRoots = ['docs', 'classroom', 'learning-room', 'admin'];

for (const dir of contentRoots) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) continue;
  for (const filePath of walk(absolute)) {
    const relPath = normalize(path.relative(root, filePath));
    if (includeContentFile(relPath)) targets.add(relPath);
  }
}

for (const filePath of fs.readdirSync(root, { withFileTypes: true })) {
  if (!filePath.isFile()) continue;
  if (!filePath.name.toLowerCase().endsWith('.md')) continue;
  if (includeContentFile(filePath.name)) targets.add(filePath.name);
}

let updated = 0;
for (const relPath of targets) updated += refreshFile(relPath);

console.log(`targets ${targets.size}`);
console.log(`updated ${updated}`);
