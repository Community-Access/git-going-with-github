#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');
const { livePathsForSlug } = require('./artifact-utils');

const ROOT = process.cwd();
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const PUBLISH_SCRIPT = path.join(REVIEW_DIR, 'src', 'publish-candidate.js');

function parseArgs(argv) {
  const args = {
    slug: null,
    candidate: null,
    audioDir: path.join('podcasts', 'audio', 'kokoro-am_liam-af_jessica'),
    engine: 'kokoro'
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--candidate' && value) args.candidate = value;
    else if (token === '--audio-dir' && value) args.audioDir = value;
    else if (token === '--engine' && value) args.engine = value;
  }
  return args;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} exited with code ${result.status}`);
  }
}

function scriptSelectionForSlug(slug) {
  if (/^cc-\d+/.test(slug)) {
    const numeric = Number.parseInt(slug.split('-')[1], 10);
    return { start: numeric, end: numeric, group: 'challenges' };
  }
  const episode = slug.match(/^ep(\d+)-/i);
  if (!episode) {
    throw new Error(`Unsupported slug format: ${slug}`);
  }
  const number = Number.parseInt(episode[1], 10);
  const livePaths = livePathsForSlug(slug);
  return { start: number, end: number, group: livePaths.group };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug || !args.candidate) {
    console.error('Usage: node podcasts/llm-podcast-generator-review/src/render-and-tag.js --slug <slug> --candidate <candidate-json> [--engine kokoro|piper] [--audio-dir <path>]');
    process.exit(1);
  }

  run(process.execPath, [PUBLISH_SCRIPT, '--slug', args.slug, '--candidate', args.candidate, '--write-live']);

  const selection = scriptSelectionForSlug(args.slug);
  run('python', [
    '-m', 'podcasts.tts.generate_audio',
    '--engine', args.engine,
    '--group', selection.group,
    '--start', String(selection.start),
    '--end', String(selection.end),
    '--force',
    '--audio-format', 'mp3'
  ]);

  run('python', [
    'podcasts/tag-audio-metadata.py',
    '--slug', args.slug,
    '--audio-dir', args.audioDir,
    '--expected-count', '1',
    '--write'
  ]);

  console.log(`Rendered and tagged ${args.slug}`);
}

if (require.main === module) {
  main();
}
