#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const TRANSCRIPTS_DIR = path.join(ROOT, 'podcasts', 'transcripts');
const OUTPUT_PATH = path.join(ROOT, 'podcasts', 'logs', 'agentic-pilots', 'chapter-plan-audit.json');

const GENERIC_PATTERNS = [
  /^challenge roadmap$/i,
  /^what success looks like$/i,
  /^recovery moves$/i,
  /^the learning pattern$/i,
  /^cli alternative$/i,
  /^what issues are for$/i,
  /^search and filter issues$/i,
  /^link issues together$/i,
  /^write better issues$/i,
  /^file your first issue$/i
];

const WEAK_PATTERNS = [
  /^part \d+/i,
  /^section \d+/i,
  /^chapter \d+/i,
  /^learning cards?:/i,
  /^step-by-step$/i
];

function scoreTitle(title) {
  if (WEAK_PATTERNS.some(pattern => pattern.test(title))) return 'weak';
  if (GENERIC_PATTERNS.some(pattern => pattern.test(title))) return 'generic';
  return 'strong';
}

function auditPlan(filePath) {
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const chapters = Array.isArray(payload.chapters) ? payload.chapters : [];
  const findings = chapters.map((chapter, index) => ({
    index: index + 1,
    title: String(chapter.title || ''),
    startSegmentIndex: chapter.startSegmentIndex,
    score: scoreTitle(String(chapter.title || ''))
  }));

  return {
    slug: payload.slug || path.basename(filePath, '-chapters.json'),
    filePath,
    chapterCount: chapters.length,
    weakCount: findings.filter(item => item.score === 'weak').length,
    genericCount: findings.filter(item => item.score === 'generic').length,
    findings
  };
}

function main() {
  const files = [];
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const groupDir = path.join(TRANSCRIPTS_DIR, group);
    if (!fs.existsSync(groupDir)) continue;
    for (const entry of fs.readdirSync(groupDir)) {
      if (entry.endsWith('-chapters.json')) files.push(path.join(groupDir, entry));
    }
  }

  const reports = files.map(auditPlan).sort((left, right) => (right.weakCount + right.genericCount) - (left.weakCount + left.genericCount));
  const summary = {
    generatedAt: new Date().toISOString(),
    plansAudited: reports.length,
    weakTitles: reports.reduce((sum, report) => sum + report.weakCount, 0),
    genericTitles: reports.reduce((sum, report) => sum + report.genericCount, 0),
    worstOffenders: reports
      .filter(report => report.weakCount + report.genericCount > 0)
      .slice(0, 20)
      .map(report => ({
        slug: report.slug,
        chapterCount: report.chapterCount,
        weakCount: report.weakCount,
        genericCount: report.genericCount
      })),
    reports
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2) + '\n', 'utf8');
  console.log(`Wrote chapter-plan audit: ${OUTPUT_PATH}`);
  console.log(`Plans audited: ${summary.plansAudited}`);
  console.log(`Weak titles: ${summary.weakTitles}`);
  console.log(`Generic titles: ${summary.genericTitles}`);
}

if (require.main === module) {
  main();
}