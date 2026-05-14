#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { episodes } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const { buildListeningItems } = require('../../lib/listening-plan');
const { analyzeTranscript, parseTranscript } = require('./evaluate-transcript');
const { runRewriteForSlug } = require('./rewrite-transcript');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const SCRIPTS_DIR = path.join(PODCASTS_DIR, 'scripts');
const PILOT_DIR = path.join(PODCASTS_DIR, 'logs', 'agentic-pilots');
const CANDIDATE_DIR = path.join(PILOT_DIR, 'candidates');
const SUMMARY_PATH = path.join(PILOT_DIR, 'rewrite-catalog-summary.json');

function parseArgs(argv) {
  const args = { promotePassing: false, force: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--promote-passing') args.promotePassing = true;
    else if (token === '--force') args.force = true;
  }
  return args;
}

function findScriptPath(slug) {
  const candidates = [
    path.join(SCRIPTS_DIR, 'chapters', `${slug}.txt`),
    path.join(SCRIPTS_DIR, 'appendices', `${slug}.txt`),
    path.join(SCRIPTS_DIR, 'challenges', `${slug}.txt`),
    path.join(SCRIPTS_DIR, `${slug}.txt`)
  ];
  return candidates.find(candidate => fs.existsSync(candidate));
}

function buildSlugList(singleSlug) {
  if (singleSlug) return [singleSlug];
  const listeningItems = buildListeningItems(episodes, challenges);
  return listeningItems.map(item => item.slug);
}

function readTranscript(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function catalogMetrics(slugs) {
  const openerCounts = new Map();
  const longLineCounts = new Map();
  let words = 0;

  for (const slug of slugs) {
    const scriptPath = findScriptPath(slug);
    if (!scriptPath) continue;
    const text = readTranscript(scriptPath);
    if (!text) continue;
    const report = analyzeTranscript({
      sourcePath: `${slug}.source-not-required`,
      transcriptPath: scriptPath,
      source: '## placeholder',
      transcript: text
    });
    words += report.transcriptWords;
    const openerKey = report.openerPattern.label;
    openerCounts.set(openerKey, (openerCounts.get(openerKey) || 0) + 1);

    const { segments } = parseTranscript(text);
    for (const segment of segments) {
      if (segment.speaker === 'PAUSE' || !segment.text) continue;
      const normalized = segment.text.toLowerCase().replace(/\s+/g, ' ').trim();
      if (normalized.length < 120) continue;
      longLineCounts.set(normalized, (longLineCounts.get(normalized) || 0) + 1);
    }
  }

  const repeatedOpeners = [...openerCounts.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0);
  const repeatedLongLines = [...longLineCounts.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0);
  return {
    totalWords: words,
    repeatedOpeners,
    repeatedLongLines,
    openerDistribution: Object.fromEntries([...openerCounts.entries()].sort((a, b) => b[1] - a[1]))
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(CANDIDATE_DIR, { recursive: true });
  const slugs = buildSlugList(args.slug);
  const before = catalogMetrics(slugs);
  const results = [];
  let passed = 0;
  let promoted = 0;

  for (const slug of slugs) {
    try {
      const result = runRewriteForSlug({
        slug,
        candidateDir: CANDIDATE_DIR,
        promote: args.promotePassing,
        force: args.force
      });
      results.push(result);
      if (result.passed) passed += 1;
      if (result.promoted) promoted += 1;
      console.log(`${slug}: ${result.passed ? 'pass' : 'fail'}${result.promoted ? ' (promoted)' : ''}`);
    } catch (error) {
      results.push({
        slug,
        passed: false,
        promoted: false,
        failureReasons: [String(error.message || error)]
      });
      console.log(`${slug}: fail`);
      console.log(`- ${String(error.message || error)}`);
    }
  }

  const after = catalogMetrics(slugs);
  const summary = {
    generatedAt: new Date().toISOString(),
    totalItems: slugs.length,
    passed,
    failed: slugs.length - passed,
    promoted,
    before,
    after,
    netWordDelta: after.totalWords - before.totalWords,
    results
  };

  fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2) + '\n', 'utf8');
  console.log(`Wrote summary: ${SUMMARY_PATH}`);
  console.log(`Quality pass: ${passed}/${slugs.length}`);
  console.log(`Promoted: ${promoted}`);
}

if (require.main === module) {
  main();
}
