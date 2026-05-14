#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { episodes } = require('../../../build-bundles');
const { challenges } = require('../../../build-challenge-bundles');
const { buildListeningItems } = require('../../../lib/listening-plan');
const { readPacket, buildPrompt } = require('../generate-teaching-transcript');
const { JobLedger } = require('./job-ledger');
const { computeRequestHash, checksumContent } = require('./request-hash');
const { estimateTokensFromText, estimateJobCost } = require('./cost-estimator');
const { JOB_MODE } = require('./constants');

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const DB_PATH = path.join(REVIEW_DIR, 'generated', 'execution', 'ai_jobs.sqlite');
const PACKET_SCRIPT = path.join(ROOT, 'podcasts', 'tools', 'agentic-pilot', 'build-source-packet.js');
const DEFAULT_MODEL = process.env.PODCAST_LLM_MODEL || 'openai/gpt-5.4';
const DEFAULT_ENDPOINT = '/chat/completions';
const DEFAULT_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

function parseArgs(argv) {
  const args = {
    group: 'all',
    mode: 'batch',
    model: DEFAULT_MODEL,
    endpoint: DEFAULT_ENDPOINT,
    maxTokens: Number.parseInt(process.env.PODCAST_LLM_MAX_OUTPUT_TOKENS || '12000', 10),
    temperature: Number.parseFloat(process.env.PODCAST_LLM_TEMPERATURE || '0.65'),
    limit: null,
    slug: [],
    dryRun: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--group' && value) args.group = value;
    else if (token === '--mode' && value) args.mode = value;
    else if (token === '--model' && value) args.model = value;
    else if (token === '--endpoint' && value) args.endpoint = value;
    else if (token === '--max-tokens' && value) args.maxTokens = Number.parseInt(value, 10);
    else if (token === '--temperature' && value) args.temperature = Number.parseFloat(value);
    else if (token === '--limit' && value) args.limit = Number.parseInt(value, 10);
    else if (token === '--slug' && value) args.slug.push(value);
    else if (token === '--dry-run') args.dryRun = true;
  }
  return args;
}

function runNode(scriptPath, args) {
  const { spawnSync } = require('child_process');
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 16
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Command failed: ${result.stderr || result.stdout || ''}`);
}

function listeningTargets(group) {
  const items = buildListeningItems(episodes, challenges);
  if (group === 'chapters' || group === 'companions') return items.filter(item => item.kind === 'companion');
  if (group === 'challenges') return items.filter(item => item.kind === 'challenge');
  return items;
}

function pickSlugs(args) {
  if (args.slug.length) return [...new Set(args.slug)];
  const slugs = listeningTargets(String(args.group || 'all').toLowerCase()).map(item => item.slug);
  if (!Number.isFinite(args.limit) || args.limit <= 0) return slugs;
  return slugs.slice(0, args.limit);
}

function makeJobId(slug) {
  return `job-${slug}-${crypto.randomUUID()}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slugs = pickSlugs(args);
  if (!slugs.length) {
    console.error('No slugs selected.');
    process.exit(1);
  }

  const ledger = new JobLedger(DB_PATH);
  const mode = args.mode === 'sync' ? JOB_MODE.SYNC : JOB_MODE.BATCH;
  const systemPrompt = 'You are an expert instructional podcast writer. Return JSON only.';
  const created = [];
  const reused = [];

  for (const slug of slugs) {
    const packetPath = path.join(ROOT, 'podcasts', 'logs', 'agentic-pilots', `${slug}.packet.json`);
    if (!fs.existsSync(packetPath)) {
      runNode(PACKET_SCRIPT, ['--slug', slug]);
    }
    const packetData = readPacket(packetPath);
    const sourceTexts = packetData.sourceFiles.filter(source => source.exists).map(source => ({
      label: source.sourceLabel,
      path: source.sourcePath,
      content: source.content
    }));
    const prompt = buildPrompt({ slug, sourceTexts, sourceLabels: sourceTexts.map(source => source.label) });
    const sourceChecksum = checksumContent(sourceTexts.map(source => source.content).join('\n\n'));
    const generationParams = {
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      response_format: { type: 'json_object' }
    };
    const requestPayload = {
      model: args.model,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    };
    const requestHash = computeRequestHash({
      model: args.model,
      endpoint: args.endpoint,
      systemPrompt,
      userPrompt: prompt,
      sourceChecksum,
      generationParams
    });
    const inputTokens = estimateTokensFromText(systemPrompt) + estimateTokensFromText(prompt);
    const costEstimate = estimateJobCost({
      model: args.model,
      inputTokens,
      outputTokens: args.maxTokens
    }) || 0;

    const prepared = {
      job_id: makeJobId(slug),
      job_type: 'podcast-script-generation',
      source_file: packetPath,
      source_record_id: slug,
      request_hash: requestHash,
      model: args.model,
      endpoint: args.endpoint,
      mode,
      input_tokens_estimated: inputTokens,
      cost_estimated: costEstimate,
      request_payload: requestPayload
    };

    if (args.dryRun) {
      created.push(prepared);
      continue;
    }
    const record = ledger.insertOrReuseJob(prepared);
    if (record.reused) reused.push(record.job);
    else created.push(record.job);
  }

  const estimatedCost = created.reduce((sum, item) => sum + Number(item.cost_estimated || 0), 0);
  console.log(`Prepared jobs: ${created.length}, Reused completed: ${reused.length}`);
  console.log(`Estimated run cost: $${estimatedCost.toFixed(6)}`);
  if (args.dryRun) {
    console.log('Dry run mode: no jobs written to ledger.');
  }
  ledger.close();
}

if (require.main === module) {
  main();
}

module.exports = {
  parseArgs,
  pickSlugs
};
