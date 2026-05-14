#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { episodes } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const { evaluateTranscript, evaluateQualityGates, parseTranscript } = require('./evaluate-transcript');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const PILOT_DIR = path.join(PODCASTS_DIR, 'logs', 'agentic-pilots');
const CANDIDATE_DIR = path.join(PILOT_DIR, 'candidates');

function parseArgs(argv) {
  const args = { slug: null, promote: false, force: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--candidate-dir' && value) args.candidateDir = value;
    else if (token === '--promote') args.promote = true;
    else if (token === '--force') args.force = true;
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing file: ${filePath}`);
  return fs.readFileSync(filePath, 'utf8');
}

function resolveAbsolute(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
}

function findScriptPath(slug) {
  const candidates = [
    path.join(PODCASTS_DIR, 'scripts', 'chapters', `${slug}.txt`),
    path.join(PODCASTS_DIR, 'scripts', 'appendices', `${slug}.txt`),
    path.join(PODCASTS_DIR, 'scripts', 'challenges', `${slug}.txt`),
    path.join(PODCASTS_DIR, 'scripts', `${slug}.txt`)
  ];
  const existing = candidates.filter(candidate => fs.existsSync(candidate));
  if (existing.length === 0) throw new Error(`Could not resolve script path for slug ${slug}`);
  if (existing.length > 1) throw new Error(`Multiple script paths found for slug ${slug}`);
  return existing[0];
}

function buildPacket(slug) {
  execFileSync('node', [path.join('podcasts', 'tools', 'agentic-pilot', 'build-source-packet.js'), '--slug', slug], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 16
  });
  const packetPath = path.join(PILOT_DIR, `${slug}.packet.json`);
  return JSON.parse(readRequired(packetPath));
}

function compactTranscriptForPrompt(text, maxLength = 18000) {
  const normalized = String(text || '').trim();
  if (normalized.length <= maxLength) return normalized;
  const head = normalized.slice(0, Math.floor(maxLength * 0.7)).trim();
  const tail = normalized.slice(-Math.floor(maxLength * 0.3)).trim();
  return `${head}\n\n[...middle omitted for length...]\n\n${tail}`;
}

function buildPrompt(packet, currentTranscript) {
  const headingLines = packet.sourceFiles
    .flatMap(source => (source.headings || []).map(heading => `${'#'.repeat(heading.level)} ${heading.title}`))
    .slice(0, 60);
  const conceptLines = (packet.concepts || []).slice(0, 80);
  const stockLineBlock = [
    'do not start with "Welcome to..." in most episodes',
    'do not use "And I am Jamie." as a fixed boilerplate line',
    'avoid repeating "orient, act, verify"',
    'avoid repeating "Carry the map"'
  ];

  return [
    'You are rewriting a podcast transcript for variety and teachability.',
    'Use automatic model selection (no model is specified by caller).',
    'Return ONLY the transcript text with valid speaker markers.',
    '',
    'Hard format requirements:',
    '- Allowed markers only: [ALEX], [JAMIE], [PAUSE]',
    '- Marker line must be on its own line',
    '- Keep script structure conversational and teachable',
    '- Keep concept coverage aligned to source materials',
    '',
    `Slug: ${packet.slug}`,
    `Title: ${packet.title}`,
    `Description: ${packet.description || ''}`,
    '',
    'Concept checklist to preserve:',
    ...conceptLines.map(line => `- ${line}`),
    '',
    'Source heading checklist to preserve (topic coverage, can paraphrase):',
    ...headingLines.map(line => `- ${line}`),
    '',
    'Anti-repetition constraints:',
    ...stockLineBlock.map(line => `- ${line}`),
    '- vary opening style across episodes; avoid repetitive intros',
    '- avoid repeating long lines verbatim inside this script',
    '- preserve the same overall script flow and marker order as the current transcript',
    '',
    'Current transcript to rewrite:',
    '<<<TRANSCRIPT>>>',
    compactTranscriptForPrompt(currentTranscript),
    '<<<END_TRANSCRIPT>>>',
    ''
  ].join('\n');
}

function extractTranscript(responseText) {
  const withoutFences = responseText
    .replace(/```(?:text|markdown)?/gi, '')
    .replace(/```/g, '')
    .trim();

  const lines = withoutFences.replace(/\r/g, '').split('\n');
  const cleaned = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      cleaned.push('');
      continue;
    }
    if (/^\[(ALEX|JAMIE|PAUSE)\]$/.test(trimmed)) {
      cleaned.push(trimmed);
      continue;
    }
    if (cleaned.length === 0) continue;
    cleaned.push(trimmed);
  }
  const transcript = cleaned.join('\n').trim();
  if (!transcript.includes('[ALEX]') || !transcript.includes('[JAMIE]')) {
    throw new Error('Candidate transcript is missing required speaker markers.');
  }
  const parsed = parseTranscript(transcript);
  if (parsed.invalidMarkers.length) throw new Error('Candidate transcript includes invalid markers.');
  return `${transcript}\n`;
}

function runCopilotPrompt(promptText) {
  return execFileSync('gh', ['copilot', '-s', '--no-color', '-C', ROOT, '--allow-tool', 'none', '-p', promptText], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 1024 * 1024 * 48
  });
}

function nextCandidatePath(candidateRoot, slug) {
  const slugDir = path.join(candidateRoot, slug);
  ensureDir(slugDir);
  const attemptNumbers = fs.readdirSync(slugDir)
    .map(fileName => {
      const match = fileName.match(/^attempt-(\d{3})\.txt$/);
      return match ? Number.parseInt(match[1], 10) : 0;
    })
    .filter(Boolean);
  const next = (attemptNumbers.length ? Math.max(...attemptNumbers) : 0) + 1;
  return path.join(slugDir, `attempt-${String(next).padStart(3, '0')}.txt`);
}

function conceptCoverage(concepts, transcript) {
  const transcriptLower = String(transcript || '').toLowerCase();
  const normalizedConcepts = (concepts || []).map(item => String(item || '').trim()).filter(Boolean);
  let covered = 0;
  const missing = [];
  for (const concept of normalizedConcepts) {
    const words = concept.toLowerCase().split(/[^a-z0-9]+/).filter(token => token.length >= 4);
    if (!words.length) continue;
    const matchCount = words.filter(word => transcriptLower.includes(word)).length;
    const ratio = matchCount / words.length;
    if (ratio >= 0.45 || transcriptLower.includes(concept.toLowerCase())) covered += 1;
    else missing.push(concept);
  }
  const total = normalizedConcepts.length;
  return {
    covered,
    total,
    ratio: total === 0 ? 1 : covered / total,
    missingConcepts: missing.slice(0, 20)
  };
}

function promoteCandidate(slug, candidatePath, reportPath) {
  execFileSync('node', [path.join('podcasts', 'tools', 'agentic-pilot', 'promote-pilot.js'), '--slug', slug, '--pilot', candidatePath, '--report', reportPath], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 8
  });
}

function runRewriteForSlug(input) {
  const slug = input.slug;
  if (!slug) throw new Error('Missing slug');
  const packet = buildPacket(slug);
  const scriptPath = findScriptPath(slug);
  const currentTranscript = readRequired(scriptPath);
  const sourceEntries = (packet.sourceFiles || []).map(source => ({
    sourcePath: source.path,
    sourceLabel: path.basename(source.path),
    exists: source.exists !== false,
    content: source.content || '',
    concepts: []
  }));

  const baselineReport = evaluateTranscript({
    transcriptPath: scriptPath,
    transcript: currentTranscript,
    sources: sourceEntries,
    concepts: packet.concepts || []
  });

  const candidateRoot = input.candidateDir ? resolveAbsolute(input.candidateDir) : CANDIDATE_DIR;
  ensureDir(candidateRoot);
  const promptPath = path.join(candidateRoot, `${slug}.rewrite-prompt.md`);
  const prompt = buildPrompt(packet, currentTranscript);
  fs.writeFileSync(promptPath, prompt, 'utf8');

  const rawResponse = runCopilotPrompt(prompt);
  const candidateTranscript = extractTranscript(rawResponse);

  const candidatePath = nextCandidatePath(candidateRoot, slug);
  fs.writeFileSync(candidatePath, candidateTranscript, 'utf8');

  const candidateReport = evaluateTranscript({
    transcriptPath: candidatePath,
    transcript: candidateTranscript,
    sources: sourceEntries,
    concepts: packet.concepts || []
  });

  const baselineStockHits = baselineReport.stockLineHits.reduce((sum, item) => sum + item.count, 0);
  const maxMissing = Math.max(
    baselineReport.headingCoverageSummary.missing + baselineReport.conceptCoverageSummary.missing + 2,
    Math.floor((candidateReport.headingCoverageSummary.total + candidateReport.conceptCoverageSummary.total) * 0.2)
  );
  const thresholds = {
    'max-missing': maxMissing,
    'max-repeated-starts': baselineReport.repeatedStarts.length,
    'max-repeated-long': baselineReport.repeatedLongSegments.length,
    'max-stock-hits': Math.max(0, baselineStockHits - 1)
  };
  const gateResult = evaluateQualityGates(candidateReport, thresholds);
  const conceptReport = conceptCoverage(packet.concepts || [], candidateTranscript);
  if (conceptReport.ratio < 0.75) {
    gateResult.pass = false;
    gateResult.failures.push(`Concept coverage ratio ${conceptReport.ratio.toFixed(2)} < 0.75`);
  }
  const report = {
    generatedAt: new Date().toISOString(),
    slug,
    scriptPath,
    transcriptPath: candidatePath,
    candidatePath,
    baseline: baselineReport,
    candidate: candidateReport,
    conceptCoverage: conceptReport,
    qualityGate: gateResult,
    gates: gateResult
  };

  const reportPath = `${candidatePath}.report.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');

  const passed = gateResult.pass || input.force;
  let promoted = false;
  if (input.promote && passed) {
    promoteCandidate(slug, candidatePath, reportPath);
    promoted = true;
  }

  return { slug, passed, promoted, reportPath, candidatePath, promptPath, failureReasons: gateResult.failures };
}

function knownSlug(slug) {
  if (episodes.some(ep => `ep${String(ep.number).padStart(2, '0')}-${ep.slug}` === slug)) return true;
  if (challenges.some(challenge => `cc-${challenge.id}-${challenge.slug}` === slug)) return true;
  return false;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Usage: node podcasts/tools/agentic-pilot/rewrite-transcript.js --slug <slug> [--candidate-dir <dir>] [--promote] [--force]');
    process.exit(1);
  }
  if (!knownSlug(args.slug)) {
    console.error(`Unknown slug: ${args.slug}`);
    process.exit(1);
  }

  const result = runRewriteForSlug(args);
  console.log(`Rewrite complete for ${result.slug}`);
  console.log(`Candidate: ${result.candidatePath}`);
  console.log(`Prompt packet: ${result.promptPath}`);
  console.log(`Report: ${result.reportPath}`);
  console.log(`Quality gate: ${result.passed ? 'pass' : 'fail'}`);
  if (result.failureReasons.length) {
    for (const failure of result.failureReasons) console.log(`- ${failure}`);
  }
  if (result.promoted) console.log('Promotion: completed');
}

if (require.main === module) {
  main();
}

module.exports = { runRewriteForSlug };
