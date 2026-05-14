#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const PILOT_DIR = path.join(ROOT, 'podcasts', 'logs', 'agentic-pilots');
const CANDIDATE_ROOT = path.join(PILOT_DIR, 'candidates');

function parseArgs(argv) {
  const args = { slug: null, input: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--input' && value) args.input = value;
  }
  return args;
}

function ensureAbsolute(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
}

function nextAttemptPath(slug) {
  const slugDir = path.join(CANDIDATE_ROOT, slug);
  fs.mkdirSync(slugDir, { recursive: true });
  const attemptNumbers = fs.readdirSync(slugDir)
    .map(fileName => {
      const match = fileName.match(/^attempt-(\d{3})\.txt$/);
      return match ? Number.parseInt(match[1], 10) : 0;
    })
    .filter(Boolean);
  const next = (attemptNumbers.length ? Math.max(...attemptNumbers) : 0) + 1;
  return path.join(slugDir, `attempt-${String(next).padStart(3, '0')}.txt`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug || !args.input) {
    console.error('Usage: node podcasts/tools/agentic-pilot/stage-candidate-rewrite.js --slug <slug> --input <candidate-script-path>');
    process.exit(1);
  }

  const inputPath = ensureAbsolute(args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Missing input candidate script: ${inputPath}`);
    process.exit(1);
  }

  const candidateText = fs.readFileSync(inputPath, 'utf8').trim() + '\n';
  const outPath = nextAttemptPath(args.slug);
  fs.writeFileSync(outPath, candidateText, 'utf8');
  console.log(`Staged candidate rewrite: ${outPath}`);
}

if (require.main === module) {
  main();
}
