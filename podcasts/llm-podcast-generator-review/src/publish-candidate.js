#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  parseTranscript,
  buildChapterPlan,
  estimatedChapterPreview,
  livePathsForSlug
} = require('./artifact-utils');

const ROOT = process.cwd();
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const OUTPUT_DIR = path.join(REVIEW_DIR, 'output');
const PUBLISHED_DIR = path.join(OUTPUT_DIR, 'published');

function parseArgs(argv) {
  const args = { slug: null, candidate: null, writeLive: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--candidate' && value) args.candidate = value;
    else if (token === '--write-live') args.writeLive = true;
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug || !args.candidate) {
    console.error('Usage: node podcasts/llm-podcast-generator-review/src/publish-candidate.js --slug <slug> --candidate <candidate-json> [--write-live]');
    process.exit(1);
  }

  const candidatePath = path.isAbsolute(args.candidate)
    ? args.candidate
    : path.join(ROOT, args.candidate);
  if (!fs.existsSync(candidatePath)) {
    throw new Error(`Candidate file not found: ${candidatePath}`);
  }

  const candidate = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
  const scriptText = String(candidate.script || '').trim();
  if (!scriptText) throw new Error(`Candidate script is empty: ${candidatePath}`);

  const segments = parseTranscript(scriptText);
  const chapterPlan = buildChapterPlan(args.slug, segments, candidate.chapters || []);
  const chapterPreview = estimatedChapterPreview(chapterPlan, segments);

  const publishDir = path.join(PUBLISHED_DIR, args.slug);
  ensureDir(publishDir);
  fs.writeFileSync(path.join(publishDir, `${args.slug}.txt`), `${scriptText}\n`, 'utf8');
  fs.writeFileSync(path.join(publishDir, `${args.slug}-segments.json`), `${JSON.stringify(segments, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(publishDir, `${args.slug}-chapters.json`), `${JSON.stringify(chapterPlan, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(publishDir, `${args.slug}-chapter-preview.json`), `${JSON.stringify(chapterPreview, null, 2)}\n`, 'utf8');

  if (args.writeLive) {
    const livePaths = livePathsForSlug(args.slug);
    ensureDir(path.dirname(livePaths.scriptPath));
    ensureDir(path.dirname(livePaths.segmentsPath));
    fs.writeFileSync(livePaths.scriptPath, `${scriptText}\n`, 'utf8');
    fs.writeFileSync(livePaths.segmentsPath, `${JSON.stringify(segments, null, 2)}\n`, 'utf8');
    fs.writeFileSync(livePaths.chaptersPath, `${JSON.stringify(chapterPlan, null, 2)}\n`, 'utf8');
    console.log(`Wrote live artifacts to podcasts/${livePaths.group}/ for ${args.slug}`);
  }

  console.log(`Published candidate artifacts to ${publishDir}`);
}

if (require.main === module) {
  main();
}
