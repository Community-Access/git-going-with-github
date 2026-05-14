#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const TRANSCRIPTS_DIR = path.join(ROOT, 'podcasts', 'transcripts');

const BLOCKED_TITLES = /^(learning cards?:|step-by-step$|on the issues list page$|on an open issue$|title field$|description \/ body field$|quick navigation$|useful filter queries$|what happened$|what i expected$|how to reproduce$|environment$|assigning labels from the sidebar$)/i;
const GENERIC_TITLES = /^(challenge roadmap|what success looks like|recovery moves|the learning pattern|cli alternative|search and filter issues|link issues together|write better issues|file your first issue)$/i;
const ALLOWED_GENERIC_TITLES = new Set(['Opening', 'Closing Takeaways', 'Final Checkpoint']);

function trimTitle(text, maxLength = 64) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const boundary = normalized.lastIndexOf(' ', maxLength - 1);
  return `${normalized.slice(0, boundary > 24 ? boundary : maxLength - 1).trim()}...`;
}

function normalizePlan(chapters) {
  const normalized = [];
  for (const chapter of chapters) {
    const title = trimTitle(chapter.title);
    const segmentIndex = Number.parseInt(chapter.startSegmentIndex, 10);
    if (!title || Number.isNaN(segmentIndex)) continue;
    if (BLOCKED_TITLES.test(title)) continue;
    if (GENERIC_TITLES.test(title) && !ALLOWED_GENERIC_TITLES.has(title)) continue;
    const previous = normalized[normalized.length - 1];
    if (previous && previous.title === title) continue;
    if (previous && previous.startSegmentIndex === segmentIndex) {
      previous.title = title;
      continue;
    }
    normalized.push({ title, startSegmentIndex: segmentIndex });
  }
  return normalized;
}

function main() {
  let rewritten = 0;
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const groupDir = path.join(TRANSCRIPTS_DIR, group);
    if (!fs.existsSync(groupDir)) continue;

    for (const entry of fs.readdirSync(groupDir)) {
      if (!entry.endsWith('-chapters.json')) continue;
      const filePath = path.join(groupDir, entry);
      const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const before = Array.isArray(payload.chapters) ? payload.chapters : [];
      const after = normalizePlan(before);
      if (JSON.stringify(before) === JSON.stringify(after)) continue;
      payload.chapters = after;
      fs.writeFileSync(filePath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
      rewritten += 1;
    }
  }

  console.log(`Normalized chapter plans: ${rewritten}`);
}

if (require.main === module) {
  main();
}