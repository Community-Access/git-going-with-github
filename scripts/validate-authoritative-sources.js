#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

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

  // Tooling instructions and maintainer logs, not curriculum content.
  const excludedRootFiles = ['CLAUDE.md', 'gold.md'];
  if (excludedRootFiles.includes(n)) return false;

  if (n.startsWith('docs/')) return true;
  if (n.startsWith('classroom/')) return true;
  if (n.startsWith('learning-room/')) return true;
  if (n.startsWith('admin/')) return true;

  if (!n.includes('/')) return true;
  return false;
}

function getTargets() {
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

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith('.md')) continue;
    if (includeContentFile(entry.name)) targets.add(entry.name);
  }

  return Array.from(targets).sort();
}

function hasHeading(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${escaped}\\s*$`, 'm');
  return re.test(content);
}

function main() {
  const targets = getTargets();
  const missingAuthoritative = [];
  const missingSectionMap = [];

  for (const relPath of targets) {
    const fullPath = path.join(root, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');

    if (!hasHeading(content, '## Authoritative Sources')) {
      missingAuthoritative.push(relPath);
    }
    if (!hasHeading(content, '### Section-Level Source Map')) {
      missingSectionMap.push(relPath);
    }
  }

  if (missingAuthoritative.length || missingSectionMap.length) {
    console.error(`Checked ${targets.length} markdown content files.`);

    if (missingAuthoritative.length) {
      console.error('\nMissing "## Authoritative Sources" in:');
      for (const relPath of missingAuthoritative) console.error(`- ${relPath}`);
    }

    if (missingSectionMap.length) {
      console.error('\nMissing "### Section-Level Source Map" in:');
      for (const relPath of missingSectionMap) console.error(`- ${relPath}`);
    }

    process.exit(1);
  }

  console.log(`Checked ${targets.length} markdown content files.`);
  console.log('All required authoritative source sections are present.');
}

main();
