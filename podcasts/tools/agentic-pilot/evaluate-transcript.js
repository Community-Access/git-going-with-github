#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'how',
  'if', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their',
  'this', 'to', 'up', 'use', 'using', 'what', 'when', 'while', 'with', 'your'
]);

const NOISE_HEADINGS = /^(listen to episode|related appendices|authoritative sources)$/i;

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : true;
    args[key] = value;
  }
  return args;
}

function ensureAbsolute(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
}

function readRequired(filePath) {
  const absolutePath = ensureAbsolute(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing file: ${absolutePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function cleanText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(text) {
  return cleanText(text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|]/g, ' '));
}

function extractHeadings(markdown) {
  const headings = [];
  for (const line of markdown.replace(/\r/g, '').split('\n')) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (!match) continue;
    const title = stripMarkdown(match[2]);
    if (!title || NOISE_HEADINGS.test(title)) continue;
    headings.push({ level: match[1].length, title });
  }
  return headings;
}

function tokenize(text) {
  return cleanText(text)
    .toLowerCase()
    .split(/[^a-z0-9@#+-]+/)
    .map(token => token.trim())
    .filter(token => token.length >= 3 && !STOPWORDS.has(token));
}

function coverageForHeading(transcriptLower, heading) {
  const exact = transcriptLower.includes(heading.title.toLowerCase());
  const keywords = [...new Set(tokenize(heading.title))];
  if (keywords.length === 0) {
    return { status: exact ? 'covered' : 'unknown', ratio: exact ? 1 : 0, keywords: [] };
  }

  let matched = 0;
  for (const keyword of keywords) {
    if (transcriptLower.includes(keyword)) matched += 1;
  }

  const ratio = matched / keywords.length;
  let status = 'missing';
  if (exact || ratio >= 0.85) status = 'covered';
  else if (ratio >= 0.5) status = 'partial';

  return { status, ratio, keywords };
}

function parseTranscript(script) {
  const lines = script.replace(/\r/g, '').split('\n');
  const segments = [];
  const invalidMarkers = [];
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
    const markerMatch = trimmed.match(/^\[(.+)\]$/);
    if (markerMatch) {
      const marker = markerMatch[1];
      if (!['ALEX', 'JAMIE', 'PAUSE'].includes(marker)) {
        invalidMarkers.push({ line: index + 1, marker: trimmed });
        continue;
      }
      flush();
      if (marker === 'PAUSE') {
        segments.push({ speaker: 'PAUSE', text: '' });
        currentSpeaker = null;
      } else {
        currentSpeaker = marker;
      }
      continue;
    }
    currentLines.push(trimmed);
  }

  flush();
  return { segments, invalidMarkers };
}

function summarizeSegments(segments) {
  const perSpeaker = { ALEX: { segments: 0, words: 0 }, JAMIE: { segments: 0, words: 0 }, PAUSE: { segments: 0, words: 0 } };
  for (const segment of segments) {
    perSpeaker[segment.speaker].segments += 1;
    if (segment.text) {
      perSpeaker[segment.speaker].words += segment.text.split(/\s+/).filter(Boolean).length;
    }
  }
  return perSpeaker;
}

function findRepeatedStarts(segments) {
  const counts = new Map();
  for (const segment of segments) {
    if (segment.speaker === 'PAUSE' || !segment.text) continue;
    const start = segment.text.split(/(?<=[.!?])\s+/)[0].toLowerCase().slice(0, 90);
    if (start.length < 25) continue;
    counts.set(start, (counts.get(start) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 10)
    .map(([text, count]) => ({ count, text }));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.source || !args.transcript) {
    console.error('Usage: node podcasts/tools/agentic-pilot/evaluate-transcript.js --source <markdown> --transcript <script> [--out <json>]');
    process.exit(1);
  }

  const sourcePath = ensureAbsolute(args.source);
  const transcriptPath = ensureAbsolute(args.transcript);
  const source = readRequired(sourcePath);
  const transcript = readRequired(transcriptPath);

  const headings = extractHeadings(source);
  const transcriptLower = transcript.toLowerCase();
  const headingCoverage = headings.map(heading => ({
    level: heading.level,
    title: heading.title,
    ...coverageForHeading(transcriptLower, heading)
  }));

  const coverageSummary = {
    covered: headingCoverage.filter(item => item.status === 'covered').length,
    partial: headingCoverage.filter(item => item.status === 'partial').length,
    missing: headingCoverage.filter(item => item.status === 'missing').length,
    total: headingCoverage.length
  };

  const { segments, invalidMarkers } = parseTranscript(transcript);
  const words = transcript.split(/\s+/).filter(Boolean).length;

  const report = {
    generatedAt: new Date().toISOString(),
    sourcePath,
    transcriptPath,
    transcriptWords: words,
    transcriptCharacters: transcript.length,
    headingsAnalyzed: headings.length,
    coverageSummary,
    invalidMarkers,
    segmentSummary: summarizeSegments(segments),
    repeatedStarts: findRepeatedStarts(segments),
    headingCoverage
  };

  const json = JSON.stringify(report, null, 2) + '\n';
  if (args.out) {
    const outPath = ensureAbsolute(args.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json, 'utf8');
    console.log(`Wrote report: ${outPath}`);
  } else {
    process.stdout.write(json);
  }
}

if (require.main === module) {
  main();
}