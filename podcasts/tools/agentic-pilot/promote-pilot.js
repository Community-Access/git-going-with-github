#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const SCRIPTS_DIR = path.join(PODCASTS_DIR, 'scripts');
const TRANSCRIPTS_DIR = path.join(PODCASTS_DIR, 'transcripts');
const PILOT_DIR = path.join(PODCASTS_DIR, 'logs', 'agentic-pilots');

function parseArgs(argv) {
  const args = { slug: null, pilot: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--pilot' && value) args.pilot = value;
  }
  return args;
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function findScriptPath(slug) {
  const matches = [];
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(SCRIPTS_DIR, group, `${slug}.txt`);
    if (fs.existsSync(candidate)) matches.push(candidate);
  }
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) throw new Error(`Multiple script matches found for ${slug}`);
  return path.join(SCRIPTS_DIR, `${slug}.txt`);
}

function findTranscriptDirForSlug(slug) {
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(TRANSCRIPTS_DIR, group);
    const chapterPath = path.join(candidate, `${slug}-chapters.json`);
    const segmentPath = path.join(candidate, `${slug}-segments.json`);
    if (fs.existsSync(chapterPath) || fs.existsSync(segmentPath)) return candidate;
  }
  return path.join(TRANSCRIPTS_DIR, 'chapters');
}

function cleanText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTranscript(script) {
  const segments = [];
  const lines = script.replace(/\r/g, '').split('\n');
  let currentSpeaker = null;
  let currentLines = [];

  function flush() {
    if (currentSpeaker && currentLines.length) {
      segments.push({ speaker: currentSpeaker, text: cleanText(currentLines.join(' ')) });
      currentLines = [];
    }
  }

  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const marker = trimmed.match(/^\[(ALEX|JAMIE|PAUSE)\]$/);
    if (marker) {
      flush();
      if (marker[1] === 'PAUSE') {
        segments.push({ speaker: 'PAUSE', text: '' });
        currentSpeaker = null;
      } else {
        currentSpeaker = marker[1];
      }
      continue;
    }
    if (!currentSpeaker) {
      throw new Error(`Transcript content encountered before a speaker marker on line ${index + 1}`);
    }
    currentLines.push(trimmed);
  }

  flush();
  if (!segments.length) {
    throw new Error('Transcript did not produce any segments.');
  }
  return segments;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Usage: node podcasts/tools/agentic-pilot/promote-pilot.js --slug <slug> [--pilot <path>]');
    process.exit(1);
  }

  const pilotPath = args.pilot
    ? (path.isAbsolute(args.pilot) ? args.pilot : path.join(ROOT, args.pilot))
    : path.join(PILOT_DIR, `${args.slug}-gpt54.txt`);

  const scriptPath = findScriptPath(args.slug);
  const transcriptDir = findTranscriptDirForSlug(args.slug);
  const scriptText = readRequired(pilotPath).trim() + '\n';
  const segments = parseTranscript(scriptText);

  fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
  fs.mkdirSync(transcriptDir, { recursive: true });
  fs.writeFileSync(scriptPath, scriptText, 'utf8');
  fs.writeFileSync(path.join(transcriptDir, `${args.slug}-segments.json`), JSON.stringify(segments, null, 2) + '\n', 'utf8');

  console.log(`Promoted pilot transcript to ${scriptPath}`);
  console.log(`Rewrote segments to ${path.join(transcriptDir, `${args.slug}-segments.json`)}`);
  console.log('Chapter plan was left unchanged; regenerate or replace it separately if the pilot changed the teaching structure materially.');
}

if (require.main === module) {
  main();
}