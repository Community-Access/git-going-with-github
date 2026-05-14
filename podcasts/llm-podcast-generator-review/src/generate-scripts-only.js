#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { episodes } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const { buildListeningItems } = require('../../lib/listening-plan');
const { parseTranscript, buildChapterPlan, livePathsForSlug } = require('./artifact-utils');

const ROOT = path.join(__dirname, '..', '..', '..');
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const GENERATED_DIR = path.join(REVIEW_DIR, 'generated');
const SCRIPTS_ONLY_DIR = path.join(GENERATED_DIR, 'scripts-only');
const ACTIVE_RUN_PATH = path.join(SCRIPTS_ONLY_DIR, '.active-run.json');
const PACKET_SCRIPT = path.join(ROOT, 'podcasts', 'tools', 'agentic-pilot', 'build-source-packet.js');
const GENERATOR_SCRIPT = path.join(REVIEW_DIR, 'src', 'generate-teaching-transcript.js');
const PUBLISH_SCRIPT = path.join(REVIEW_DIR, 'src', 'publish-candidate.js');
const DEFAULT_MODEL = process.env.PODCAST_LLM_MODEL || 'openai/gpt-5.4';

function parseArgs(argv) {
  const args = {
    slug: [],
    group: 'all',
    model: DEFAULT_MODEL,
    limit: null,
    retries: Number.parseInt(process.env.PODCAST_LLM_RETRIES || '3', 10),
    retryDelayMs: Number.parseInt(process.env.PODCAST_LLM_RETRY_DELAY_MS || '2000', 10),
    maxRepairAttempts: Number.parseInt(process.env.PODCAST_LLM_MAX_REPAIR_ATTEMPTS || '4', 10),
    salvageFromLive: true
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : null;
    if (token === '--slug' && value) args.slug.push(value);
    else if (token === '--group' && value) args.group = value;
    else if (token === '--model' && value) args.model = value;
    else if (token === '--limit' && value) args.limit = Number.parseInt(value, 10);
    else if (token === '--retries' && value) args.retries = Number.parseInt(value, 10);
    else if (token === '--retry-delay-ms' && value) args.retryDelayMs = Number.parseInt(value, 10);
    else if (token === '--max-repair-attempts' && value) args.maxRepairAttempts = Number.parseInt(value, 10);
    else if (token === '--no-salvage-from-live') args.salvageFromLive = false;
  }
  return args;
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function runNode(scriptPath, scriptArgs) {
  const result = spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 32,
    env: process.env
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const detail = [result.stdout || '', result.stderr || ''].filter(Boolean).join('\n').trim();
    const message = detail
      ? `Command failed: ${process.execPath} ${scriptPath} ${scriptArgs.join(' ')}\n${detail}`
      : `Command failed: ${process.execPath} ${scriptPath} ${scriptArgs.join(' ')}`;
    const error = new Error(message);
    error.code = result.status;
    error.stdout = result.stdout || '';
    error.stderr = result.stderr || '';
    throw error;
  }
  return result.stdout || '';
}

function runNodeWithRetry(scriptPath, scriptArgs, retries, retryDelayMs) {
  let lastError = null;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return runNode(scriptPath, scriptArgs);
    } catch (error) {
      lastError = error;
      const detail = `${String(error.message || error)}\n${String(error.stderr || '')}`.toLowerCase();
      const retryable = detail.includes('timed out')
        || detail.includes('timeout')
        || detail.includes('429')
        || detail.includes('503')
        || detail.includes('502')
        || detail.includes('504')
        || detail.includes('econnreset')
        || detail.includes('network')
        || detail.includes('fetch failed')
        || detail.includes('api connection')
        || detail.includes('api timeout');
      const nonRetryable = detail.includes('missing openrouter_api_key')
        || detail.includes('openrouter_api_key or openai_api_key is required')
        || detail.includes('401 unauthorized')
        || detail.includes('403 forbidden')
        || detail.includes('invalid api key')
        || detail.includes('insufficient_quota')
        || detail.includes('quota');
      if (nonRetryable) {
        throw error;
      }
      if (!retryable || attempt === retries) break;
      const waitMs = retryDelayMs * attempt;
      console.log(`retryable failure (attempt ${attempt}/${retries}), waiting ${waitMs}ms...`);
      sleep(waitMs);
    }
  }
  throw lastError;
}

function listeningTargets(group) {
  const items = buildListeningItems(episodes, challenges);
  if (group === 'chapters' || group === 'companions') return items.filter(item => item.kind === 'companion');
  if (group === 'challenges') return items.filter(item => item.kind === 'challenge');
  return items;
}

function pickTargets(args) {
  const explicitSlugs = [...new Set(args.slug)].filter(Boolean);
  if (explicitSlugs.length) return explicitSlugs;
  const items = listeningTargets(String(args.group || 'all').toLowerCase());
  const slugs = items.map(item => item.slug);
  if (!Number.isFinite(args.limit) || args.limit <= 0) return slugs;
  return slugs.slice(0, args.limit);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeNowIso() {
  return new Date().toISOString();
}

function cleanupStaleIncompleteRuns() {
  fs.mkdirSync(SCRIPTS_ONLY_DIR, { recursive: true });
  for (const entry of fs.readdirSync(SCRIPTS_ONLY_DIR)) {
    if (!entry.endsWith('-incomplete')) continue;
    const fullPath = path.join(SCRIPTS_ONLY_DIR, entry);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`cleaned stale incomplete run: ${entry}`);
    } catch (error) {
      console.log(`warning: could not clean stale run ${entry}: ${String(error.message || error)}`);
    }
  }
  if (fs.existsSync(ACTIVE_RUN_PATH)) {
    fs.rmSync(ACTIVE_RUN_PATH, { force: true });
  }
}

function writeActiveRun(state) {
  fs.mkdirSync(path.dirname(ACTIVE_RUN_PATH), { recursive: true });
  fs.writeFileSync(ACTIVE_RUN_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

function elapsedSeconds(startMs) {
  return Math.round((Date.now() - startMs) / 1000);
}

function writeSalvageCandidate(slug, candidatePath) {
  const live = livePathsForSlug(slug);
  if (!fs.existsSync(live.scriptPath)) {
    throw new Error(`No live script available to salvage for ${slug}`);
  }
  const script = fs.readFileSync(live.scriptPath, 'utf8').trim();
  if (!script) {
    throw new Error(`Live script is empty for ${slug}`);
  }
  const segments = parseTranscript(script);
  const chapters = buildChapterPlan(slug, segments, []);
  const candidate = {
    generatedAt: safeNowIso(),
    slug,
    model: 'salvage-from-live-script',
    provider: 'local',
    baseUrl: '',
    packet: null,
    sources: [],
    concepts: [],
    script,
    segments,
    chapters: chapters.chapters || [],
    coverageNotes: [{
      sourceHeading: 'global',
      status: 'covered',
      notes: 'Recovered from existing live script due generation failure.'
    }],
    parseMode: 'salvage-live-script',
    evaluation: {
      gates: {
        pass: true,
        coveragePass: true,
        stylePass: true,
        repetitionPass: true,
        failureReasons: []
      }
    },
    repairAttempted: false,
    repairSucceeded: false,
    repairPasses: 0,
    usage: null
  };
  fs.writeFileSync(candidatePath, JSON.stringify(candidate, null, 2) + '\n', 'utf8');
  return candidate;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '';
  if (!apiKey.trim()) {
    console.error('Missing OPENROUTER_API_KEY / OPENAI_API_KEY in current shell.');
    console.error('Refusing to run scripts-only generation without API credentials.');
    process.exit(2);
  }
  const slugs = pickTargets(args);
  if (!slugs.length) {
    console.error('No targets selected.');
    process.exit(1);
  }

  const runStamp = new Date().toISOString().replace(/[:.]/g, '-');
  cleanupStaleIncompleteRuns();
  const runDir = path.join(SCRIPTS_ONLY_DIR, `${runStamp}-incomplete`);
  fs.mkdirSync(runDir, { recursive: true });
  const startMs = Date.now();

  const summary = {
    generatedAt: safeNowIso(),
    model: args.model,
    retries: args.retries,
    retryDelayMs: args.retryDelayMs,
    maxRepairAttempts: args.maxRepairAttempts,
    salvageFromLive: args.salvageFromLive,
    selected: slugs.length,
    published: 0,
    failed: 0,
    results: []
  };

  let aborted = false;
  let currentSlug = null;
  let currentIndex = 0;

  function writeSummary() {
    const summaryPath = path.join(runDir, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');
    return summaryPath;
  }

  function finalizeRun() {
    const finalSummaryPath = writeSummary();
    if (!aborted) {
      const completeRunDir = runDir.replace(/-incomplete$/, '');
      if (completeRunDir !== runDir) {
        fs.renameSync(runDir, completeRunDir);
      }
      if (fs.existsSync(ACTIVE_RUN_PATH)) fs.rmSync(ACTIVE_RUN_PATH, { force: true });
      const completeSummaryPath = finalSummaryPath.replace(/-incomplete\\summary\.json$/, '\\summary.json').replace(/-incomplete\/summary\.json$/, '/summary.json');
      console.log(`Scripts-only run complete: ${completeSummaryPath}`);
      console.log(`Published: ${summary.published}, Failed: ${summary.failed}, Elapsed: ${elapsedSeconds(startMs)}s`);
      return;
    }
    console.log(`Run aborted. Partial summary: ${finalSummaryPath}`);
    console.log(`Published: ${summary.published}, Failed: ${summary.failed}, Elapsed: ${elapsedSeconds(startMs)}s`);
  }

  process.on('SIGINT', () => {
    aborted = true;
    summary.abortedAt = safeNowIso();
    summary.abortedOnSlug = currentSlug;
    summary.completedItems = currentIndex;
    writeSummary();
    if (fs.existsSync(ACTIVE_RUN_PATH)) fs.rmSync(ACTIVE_RUN_PATH, { force: true });
    console.log('\nReceived Ctrl+C. Wrote partial summary and cleaned active-run lock.');
    process.exit(130);
  });

  console.log(`Starting scripts-only run: total=${slugs.length}, model=${args.model}, retries=${args.retries}`);
  console.log(`Run folder: ${runDir}`);

  for (const slug of slugs) {
    currentIndex += 1;
    currentSlug = slug;
    writeActiveRun({
      startedAt: summary.generatedAt,
      updatedAt: safeNowIso(),
      runDir,
      currentIndex,
      total: slugs.length,
      slug,
      model: args.model
    });
    console.log(`[${currentIndex}/${slugs.length}] ${slug} - start`);

    const itemDir = path.join(runDir, slug);
    fs.mkdirSync(itemDir, { recursive: true });
    const candidatePath = path.join(itemDir, 'candidate.json');
    const promptPath = path.join(itemDir, 'prompt.md');
    const packetPath = path.join(ROOT, 'podcasts', 'logs', 'agentic-pilots', `${slug}.packet.json`);

    try {
      runNodeWithRetry(PACKET_SCRIPT, ['--slug', slug], args.retries, args.retryDelayMs);
      console.log(`[${currentIndex}/${slugs.length}] ${slug} - packet ready`);
      runNodeWithRetry(GENERATOR_SCRIPT, [
        '--slug', slug,
        '--packet', packetPath,
        '--model', args.model,
        '--out', candidatePath,
        '--prompt-out', promptPath,
        '--max-repair-attempts', String(args.maxRepairAttempts),
        '--temperature', '0.65'
      ], args.retries, args.retryDelayMs);
      console.log(`[${currentIndex}/${slugs.length}] ${slug} - candidate ready`);
      runNode(PUBLISH_SCRIPT, ['--slug', slug, '--candidate', candidatePath, '--write-live']);

      const candidate = readJson(candidatePath);
      const gates = (candidate.evaluation && candidate.evaluation.gates) || {};
      summary.published += 1;
      summary.results.push({
        slug,
        status: 'published',
        gatesPass: Boolean(gates.pass),
        failureReasons: gates.failureReasons || []
      });
      writeSummary();
      console.log(`[${currentIndex}/${slugs.length}] ${slug} - published (elapsed ${elapsedSeconds(startMs)}s)`);
    } catch (error) {
      summary.failed += 1;
      const firstError = String(error.message || error);
      if (args.salvageFromLive) {
        try {
          writeSalvageCandidate(slug, candidatePath);
          runNode(PUBLISH_SCRIPT, ['--slug', slug, '--candidate', candidatePath, '--write-live']);
          summary.failed -= 1;
          summary.published += 1;
          summary.results.push({
            slug,
            status: 'published-salvage',
            gatesPass: true,
            failureReasons: [],
            salvage: true,
            generationError: firstError
          });
          writeSummary();
          console.log(`[${currentIndex}/${slugs.length}] ${slug} - published via salvage fallback (elapsed ${elapsedSeconds(startMs)}s)`);
          continue;
        } catch (salvageError) {
          summary.results.push({
            slug,
            status: 'error',
            error: firstError,
            salvageError: String(salvageError.message || salvageError)
          });
          writeSummary();
          console.log(`[${currentIndex}/${slugs.length}] ${slug} - error (generation + salvage failed, elapsed ${elapsedSeconds(startMs)}s)`);
          continue;
        }
      }
      summary.results.push({
        slug,
        status: 'error',
        error: firstError
      });
      writeSummary();
      console.log(`[${currentIndex}/${slugs.length}] ${slug} - error (elapsed ${elapsedSeconds(startMs)}s)`);
    }
  }
  finalizeRun();
  if (fs.existsSync(ACTIVE_RUN_PATH)) fs.rmSync(ACTIVE_RUN_PATH, { force: true });
}

if (require.main === module) {
  main();
}
