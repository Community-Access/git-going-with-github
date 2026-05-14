#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { episodes } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const { buildListeningItems } = require('../../lib/listening-plan');

const ROOT = path.join(__dirname, '..', '..', '..');
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const GENERATED_DIR = path.join(REVIEW_DIR, 'generated');
const LESSONS_PATH = path.join(REVIEW_DIR, 'docs', 'lessons-learned.md');
const PACKET_SCRIPT = path.join(ROOT, 'podcasts', 'tools', 'agentic-pilot', 'build-source-packet.js');
const GENERATOR_SCRIPT = path.join(REVIEW_DIR, 'src', 'generate-teaching-transcript.js');
const PUBLISH_SCRIPT = path.join(REVIEW_DIR, 'src', 'publish-candidate.js');
const DEFAULT_MINI_MODEL = process.env.PODCAST_LLM_MODEL_MINI || 'openai/gpt-5.4-mini';
const DEFAULT_POLISH_MODEL = process.env.PODCAST_LLM_MODEL_POLISH || 'openai/gpt-5.4';

function parseArgs(argv) {
  const args = {
    slug: [],
    group: 'all',
    miniModel: DEFAULT_MINI_MODEL,
    polishModel: DEFAULT_POLISH_MODEL,
    skipPolish: false,
    dryRun: false,
    limit: null,
    publishPassing: false,
    writeLive: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : null;
    if (token === '--slug' && value) args.slug.push(value);
    else if (token === '--group' && value) args.group = value;
    else if (token === '--mini-model' && value) args.miniModel = value;
    else if (token === '--polish-model' && value) args.polishModel = value;
    else if (token === '--limit' && value) args.limit = Number.parseInt(value, 10);
    else if (token === '--skip-polish') args.skipPolish = true;
    else if (token === '--dry-run') args.dryRun = true;
    else if (token === '--publish-passing') args.publishPassing = true;
    else if (token === '--write-live') args.writeLive = true;
  }
  return args;
}

function runNodeScript(scriptPath, scriptArgs) {
  return execFileSync(process.execPath, [scriptPath, ...scriptArgs], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 32
  });
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

function strictCoverageResult(candidate) {
  const evaluation = candidate && candidate.evaluation ? candidate.evaluation : {};
  const heading = evaluation.headingCoverageSummary || { covered: 0, partial: 0, missing: 0, total: 0 };
  const concept = evaluation.conceptCoverageSummary || { covered: 0, partial: 0, missing: 0, total: 0 };
  const gatesPass = Boolean(evaluation.gates && evaluation.gates.pass);

  const failures = [];
  if (!gatesPass) failures.push(...((evaluation.gates && evaluation.gates.failureReasons) || ['quality-gate']));
  if (heading.missing > 0) failures.push(`heading-missing:${heading.missing}`);
  if (heading.partial > 0) failures.push(`heading-partial:${heading.partial}`);
  if (concept.missing > 0) failures.push(`concept-missing:${concept.missing}`);
  if (concept.partial > 0) failures.push(`concept-partial:${concept.partial}`);
  if (candidate.parseMode && candidate.parseMode !== 'json') failures.push(`parse-mode:${candidate.parseMode}`);

  return {
    pass: failures.length === 0,
    failures,
    heading,
    concept
  };
}

function classifyFailures(summary) {
  const buckets = {
    jsonOutputFormatting: 0,
    styleOrMarkers: 0,
    coverageOrQualityGates: 0,
    authOrProvider: 0,
    unknownErrors: 0
  };
  for (const result of summary.results) {
    const failureText = `${result.error || ''}\n${(result.failures || []).join('\n')}`.toLowerCase();
    if (!failureText.trim()) continue;
    if (failureText.includes('unterminated string in json') || failureText.includes('json')) buckets.jsonOutputFormatting += 1;
    else if (failureText.includes('style') || failureText.includes('marker')) buckets.styleOrMarkers += 1;
    else if (failureText.includes('coverage') || failureText.includes('repetition')) buckets.coverageOrQualityGates += 1;
    else if (failureText.includes('401') || failureText.includes('authentication') || failureText.includes('api key')) buckets.authOrProvider += 1;
    else buckets.unknownErrors += 1;
  }
  return buckets;
}

function appendLessonsLearned(summary) {
  const buckets = classifyFailures(summary);
  const observedThemes = [];
  if (buckets.jsonOutputFormatting > 0) observedThemes.push('- JSON shape drift can occur; keep parser fallback and raw-response capture enabled.');
  if (buckets.styleOrMarkers > 0) observedThemes.push('- Speaker marker style drift can occur; reinforce marker constraints in prompts.');
  if (buckets.coverageOrQualityGates > 0) observedThemes.push('- Coverage/repetition quality gates need regular calibration as source content evolves.');
  if (buckets.authOrProvider > 0) observedThemes.push('- Key parsing and provider environment wiring must be validated before large runs.');
  if (buckets.unknownErrors > 0) observedThemes.push('- Unknown failures should be triaged in small batches before scaling.');
  if (!observedThemes.length) observedThemes.push('- No new systemic failure theme detected in this run sample.');

  const content = [
    '# LLM Podcast Generator Lessons Learned',
    '',
    'This file captures durable guidance for future utilization.',
    'Keep recommendations process-oriented so they remain valid as curriculum and models evolve.',
    '',
    '## Stable operating principles',
    '',
    '- Use packet-driven generation to preserve multi-source coverage.',
    '- Start with a small mixed validation set before scaling.',
    '- Use mini-first for prompt tuning and gate calibration.',
    '- Use GPT-5.4 for polish when mini results need improvement.',
    '- Persist prompt artifacts and raw model outputs for reproducible debugging.',
    '',
    '## Reusable workflow',
    '',
    '1. Parse the local key file safely and export only the key token.',
    '2. Run a small regression subset and inspect failure themes.',
    '3. Improve prompt constraints and parser resilience for top themes.',
    '4. Re-run the same subset until outcomes stabilize.',
    '5. Expand scope in stages and keep costs controlled with mini-first passes.',
    '',
    '## Failure themes to watch',
    '',
    ...observedThemes,
    ''
  ].join('\n');

  fs.mkdirSync(path.dirname(LESSONS_PATH), { recursive: true });
  fs.writeFileSync(LESSONS_PATH, content, 'utf8');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const runStamp = new Date().toISOString().replace(/[:.]/g, '-');
  const runDir = path.join(GENERATED_DIR, 'regression', runStamp);
  fs.mkdirSync(runDir, { recursive: true });

  const slugs = pickTargets(args);
  if (!slugs.length) {
    console.error('No targets selected.');
    process.exit(1);
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    runDir,
    mode: args.dryRun ? 'dry-run' : 'live',
    group: args.group,
    miniModel: args.miniModel,
    polishModel: args.polishModel,
    skipPolish: args.skipPolish,
    publishPassing: args.publishPassing,
    writeLive: args.writeLive,
    selected: slugs.length,
    passedMini: 0,
    passedPolish: 0,
    failed: 0,
    results: []
  };

  for (const slug of slugs) {
    const itemDir = path.join(runDir, slug);
    fs.mkdirSync(itemDir, { recursive: true });

    let packetPath = path.join(ROOT, 'podcasts', 'logs', 'agentic-pilots', `${slug}.packet.json`);
    try {
      runNodeScript(PACKET_SCRIPT, ['--slug', slug]);
      if (!fs.existsSync(packetPath)) {
        throw new Error(`Source packet was not created for slug ${slug}`);
      }

      const miniPath = path.join(itemDir, 'mini.candidate.json');
      runNodeScript(GENERATOR_SCRIPT, [
        '--slug', slug,
        '--packet', packetPath,
        '--model', args.miniModel,
        '--out', miniPath,
        '--prompt-out', path.join(itemDir, 'mini.prompt.md'),
        ...(args.dryRun ? ['--dry-run'] : [])
      ]);

      if (args.dryRun) {
        summary.results.push({ slug, status: 'dry-run', miniPath });
        console.log(`${slug}: dry-run prompt built`);
        continue;
      }

      const miniCandidate = readJson(miniPath);
      const miniCoverage = strictCoverageResult(miniCandidate);
      const miniPassed = miniCoverage.pass;
      if (miniPassed) {
        if (args.publishPassing) {
          runNodeScript(PUBLISH_SCRIPT, [
            '--slug', slug,
            '--candidate', miniPath,
            ...(args.writeLive ? ['--write-live'] : [])
          ]);
        }
        summary.passedMini += 1;
        summary.results.push({ slug, status: 'passed-mini', miniPath });
        console.log(`${slug}: pass on mini`);
        continue;
      }

      if (args.skipPolish) {
        summary.failed += 1;
        summary.results.push({
          slug,
          status: 'failed-mini',
          miniPath,
          failures: miniCoverage.failures,
          coverage: { heading: miniCoverage.heading, concept: miniCoverage.concept }
        });
        console.log(`${slug}: fail on mini`);
        continue;
      }

      const polishPath = path.join(itemDir, 'polish.candidate.json');
      runNodeScript(GENERATOR_SCRIPT, [
        '--slug', slug,
        '--packet', packetPath,
        '--model', args.polishModel,
        '--out', polishPath,
        '--prompt-out', path.join(itemDir, 'polish.prompt.md')
      ]);
      const polishCandidate = readJson(polishPath);
      const polishCoverage = strictCoverageResult(polishCandidate);
      const polishPassed = polishCoverage.pass;
      if (polishPassed) {
        if (args.publishPassing) {
          runNodeScript(PUBLISH_SCRIPT, [
            '--slug', slug,
            '--candidate', polishPath,
            ...(args.writeLive ? ['--write-live'] : [])
          ]);
        }
        summary.passedPolish += 1;
        summary.results.push({ slug, status: 'passed-polish', miniPath, polishPath });
        console.log(`${slug}: fail on mini, pass on polish`);
      } else {
        summary.failed += 1;
        summary.results.push({
          slug,
          status: 'failed-polish',
          miniPath,
          polishPath,
          failures: polishCoverage.failures,
          coverage: { heading: polishCoverage.heading, concept: polishCoverage.concept }
        });
        console.log(`${slug}: fail on mini and polish`);
      }
    } catch (error) {
      summary.failed += 1;
      summary.results.push({ slug, status: 'error', error: String(error.message || error) });
      console.log(`${slug}: error`);
      console.log(`- ${String(error.message || error)}`);
    }
  }

  const summaryPath = path.join(runDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');
  appendLessonsLearned(summary);
  console.log(`Regression run complete: ${summaryPath}`);
  console.log(`Lessons learned updated: ${LESSONS_PATH}`);
  console.log(`Mini passed: ${summary.passedMini}, Polish rescued: ${summary.passedPolish}, Failed: ${summary.failed}`);
}

if (require.main === module) {
  main();
}
