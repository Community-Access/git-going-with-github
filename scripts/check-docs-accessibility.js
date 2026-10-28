#!/usr/bin/env node
/*
 * Markdown accessibility check for the workshop documentation.
 *
 * This is the repository's automated accessibility check (Open Source
 * Accessibility Framework, Testing action 1). It reads the Markdown sources
 * that become the published site, the ePub and the braille files, and reports
 * barriers a screen reader user would meet:
 *
 *   heading-single-h1      a page has no H1, or more than one
 *   heading-increment      a heading skips a level going down (H2 to H4)
 *   image-alt              an image has no alternative text, or only a
 *                          placeholder such as "image" or "screenshot"
 *   link-text              link text that means nothing out of context
 *                          ("click here", "here", "read more", "link")
 *   table-empty-header     a table header row has an empty cell
 *   code-fence-language    a fenced code block has no language identifier
 *   emoji                  an emoji, which the house style forbids
 *
 * Fenced code blocks, inline code and HTML comments are skipped.
 *
 * Existing findings are recorded in scripts/docs-accessibility-baseline.json,
 * counted per file and rule. The check fails when a file has more findings
 * for a rule than its baseline allows, so new barriers are blocked while the
 * recorded ones are fixed and tracked (issues labeled `accessibility`).
 *
 * Usage:
 *   node scripts/check-docs-accessibility.js              check against the baseline
 *   node scripts/check-docs-accessibility.js --report     list every finding, never fail
 *   node scripts/check-docs-accessibility.js --update-baseline
 *   node scripts/check-docs-accessibility.js FILE...      check only these files
 *
 * Not checked: learning-room/ (the student template, which contains
 * deliberate accessibility defects for learners to fix), generated files,
 * podcast pipeline internals and agent definitions. No automated check finds
 * every barrier; see ACCESSIBILITY.md for the manual checks.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const baselinePath = path.join(__dirname, 'docs-accessibility-baseline.json');

const RULES = {
  'heading-single-h1': 'Each page needs exactly one H1, its title.',
  'heading-increment': 'Headings must not skip a level going down.',
  'image-alt': 'Every image needs alternative text; write a decorative image as an HTML img with alt="".',
  'link-text': 'Link text must describe the destination on its own.',
  'table-empty-header': 'Every table column needs a header.',
  'code-fence-language': 'Fenced code blocks need a language, such as bash or text.',
  emoji: 'The house style forbids emoji; screen readers announce each by name.'
};

const PLACEHOLDER_ALT_TEXT = new Set(['image', 'img', 'picture', 'photo', 'screenshot', 'graphic', 'icon', 'alt']);

const AMBIGUOUS_LINK_TEXT = new Set([
  'click here',
  'here',
  'click',
  'read more',
  'more',
  'learn more',
  'this',
  'this link',
  'link',
  'this page',
  'go',
  'details'
]);

// Root-level Markdown that is generated, scratch or tooling, not published docs.
const EXCLUDED_ROOT_FILES = new Set(['CLAUDE.md', 'work.md', 'golden.md', 'gold.md']);
const CONTENT_DIRS = ['docs', 'admin', 'classroom'];

function normalize(p) {
  return p.replace(/\\/g, '/');
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function getTargets() {
  const targets = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.md')) continue;
    if (EXCLUDED_ROOT_FILES.has(entry.name) || entry.name.startsWith('tmp-')) continue;
    targets.push(entry.name);
  }
  for (const dir of CONTENT_DIRS) {
    const absolute = path.join(root, dir);
    if (!fs.existsSync(absolute)) continue;
    for (const file of walk(absolute)) targets.push(normalize(path.relative(root, file)));
  }
  return targets.sort();
}

// Replace HTML comments with blanks of the same shape, so line numbers hold.
function stripComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, (match) => match.replace(/[^\n]/g, ' '));
}

function stripInlineCode(line) {
  return line.replace(/(`+)([\s\S]*?)\1/g, (match) => ' '.repeat(match.length));
}

function cleanLinkText(text) {
  return text
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.:;,!?]+$/, '')
    .toLowerCase();
}

function splitTableRow(line) {
  let row = line.trim();
  if (row.startsWith('|')) row = row.slice(1);
  if (row.endsWith('|') && !row.endsWith('\\|')) row = row.slice(0, -1);
  return row.split(/(?<!\\)\|/).map((cell) => cell.trim());
}

const TABLE_SEPARATOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
const EMOJI = /\p{Extended_Pictographic}/u;
const NOT_EMOJI = new Set(['\u00a9', '\u00ae', '\u2122']);

function findEmoji(line) {
  for (const ch of line) {
    if (EMOJI.test(ch) && !NOT_EMOJI.has(ch)) return ch;
  }
  return null;
}

/**
 * Check one Markdown document. Returns findings as
 * { rule, line, message } objects, in line order.
 */
function checkMarkdown(text, options = {}) {
  const findings = [];
  const add = (rule, line, detail) => findings.push({ rule, line, message: `${RULES[rule]} ${detail}`.trim() });

  const lines = stripComments(text.replace(/\r\n?/g, '\n')).split('\n');
  let fence = null; // { char, length }
  let previousLevel = 0;
  let h1Count = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const lineNo = i + 1;

    const fenceMatch = raw.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence.char && fenceMatch[1].length >= fence.length && !fenceMatch[2].trim()) {
        fence = null;
      }
      continue;
    }
    if (fenceMatch) {
      fence = { char: fenceMatch[1][0], length: fenceMatch[1].length };
      if (!fenceMatch[2].trim()) add('code-fence-language', lineNo, '');
      continue;
    }

    const line = stripInlineCode(raw);

    // Headings: ATX Markdown headings and HTML h1 to h6.
    const levels = [];
    const atx = line.match(/^\s{0,3}(#{1,6})(\s+|$)/);
    if (atx) levels.push(atx[1].length);
    for (const m of line.matchAll(/<h([1-6])\b/gi)) levels.push(Number(m[1]));
    for (const level of levels) {
      if (level === 1) h1Count += 1;
      if (previousLevel && level > previousLevel + 1) {
        add('heading-increment', lineNo, `H${previousLevel} is followed by H${level}.`);
      }
      previousLevel = level;
    }

    for (const m of line.matchAll(/!\[([^\]]*)\]\(/g)) {
      if (!m[1].trim()) add('image-alt', lineNo, 'Markdown image with empty alt text.');
      else if (PLACEHOLDER_ALT_TEXT.has(cleanLinkText(m[1]))) add('image-alt', lineNo, `Placeholder alt text "${m[1].trim()}".`);
    }
    for (const m of line.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt\s*=/i.test(m[0])) add('image-alt', lineNo, 'HTML img with no alt attribute.');
    }

    for (const m of line.matchAll(/(^|[^!\]])\[([^\]\n]+)\]\(([^)\s]+)[^)]*\)/g)) {
      const linkText = cleanLinkText(m[2]);
      if (AMBIGUOUS_LINK_TEXT.has(linkText)) add('link-text', lineNo, `Link text "${m[2].trim()}".`);
    }
    for (const m of line.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
      const linkText = cleanLinkText(m[1].replace(/<[^>]+>/g, ''));
      if (AMBIGUOUS_LINK_TEXT.has(linkText)) add('link-text', lineNo, `Link text "${m[1].trim()}".`);
    }

    if (line.includes('|') && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      // Inline code counts as header text here, so keep a placeholder for it.
      const cells = splitTableRow(raw.replace(/(`+)([\s\S]*?)\1/g, 'code'));
      const empty = cells.filter((cell) => !cell).length;
      if (cells.length > 1 && empty) add('table-empty-header', lineNo, `${empty} empty header cell(s).`);
    }

    const emoji = findEmoji(line);
    if (emoji) add('emoji', lineNo, `Found U+${emoji.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}.`);
  }

  // Wiki partials such as docs/_Sidebar.md are fragments, not pages.
  if (h1Count !== 1 && !options.fragment) add('heading-single-h1', 1, `Found ${h1Count} H1 headings.`);
  return findings;
}

function countByRule(findings) {
  const counts = {};
  for (const f of findings) counts[f.rule] = (counts[f.rule] || 0) + 1;
  return counts;
}

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) return { files: {} };
  return JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
}

function main(argv) {
  const args = argv.slice(2);
  const report = args.includes('--report');
  const update = args.includes('--update-baseline');
  const explicit = args.filter((a) => !a.startsWith('--')).map(normalize);
  const targets = explicit.length ? explicit : getTargets();

  const results = {};
  for (const rel of targets) {
    const text = fs.readFileSync(path.join(root, rel), 'utf8');
    results[rel] = checkMarkdown(text, { fragment: path.basename(rel).startsWith('_') });
  }

  const totals = {};
  let total = 0;
  for (const findings of Object.values(results)) {
    for (const [rule, n] of Object.entries(countByRule(findings))) {
      totals[rule] = (totals[rule] || 0) + n;
      total += n;
    }
  }

  if (update) {
    const files = {};
    for (const [rel, findings] of Object.entries(results)) {
      if (findings.length) files[rel] = countByRule(findings);
    }
    const baseline = {
      description:
        'Known findings from scripts/check-docs-accessibility.js, counted per file and rule. ' +
        'Counts may only go down. Lower a count when you fix a finding; never raise one to let a new barrier in.',
      files
    };
    fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
    console.log(`Baseline written: ${total} findings in ${Object.keys(files).length} files.`);
    return 0;
  }

  if (report) {
    for (const [rel, findings] of Object.entries(results)) {
      for (const f of findings) console.log(`${rel}:${f.line} ${f.rule} ${f.message}`);
    }
    console.log(`\nChecked ${targets.length} Markdown files: ${total} findings.`);
    for (const rule of Object.keys(RULES)) console.log(`  ${rule}: ${totals[rule] || 0}`);
    return 0;
  }

  const baseline = loadBaseline().files || {};
  const regressions = [];
  for (const [rel, findings] of Object.entries(results)) {
    const allowed = baseline[rel] || {};
    const counts = countByRule(findings);
    for (const [rule, n] of Object.entries(counts)) {
      if (n > (allowed[rule] || 0)) {
        regressions.push({ rel, rule, n, allowed: allowed[rule] || 0, findings: findings.filter((f) => f.rule === rule) });
      }
    }
  }

  console.log(`Checked ${targets.length} Markdown files: ${total} known findings (see the baseline).`);
  if (!regressions.length) {
    console.log('No new accessibility findings.');
    return 0;
  }

  console.error('\nNew accessibility findings (more than the baseline allows):');
  for (const r of regressions) {
    console.error(`\n${r.rel}: ${r.rule}, ${r.n} found, ${r.allowed} allowed`);
    for (const f of r.findings) console.error(`  line ${f.line}: ${f.message}`);
  }
  console.error('\nFix these, or explain in the pull request why one cannot be fixed. Rules are described in ACCESSIBILITY.md.');
  return 1;
}

if (require.main === module) {
  process.exitCode = main(process.argv);
}

module.exports = { checkMarkdown, RULES };
