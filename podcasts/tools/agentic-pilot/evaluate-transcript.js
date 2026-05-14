#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'how',
  'if', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their',
  'this', 'to', 'up', 'use', 'using', 'what', 'when', 'while', 'with', 'your'
]);

const NOISE_HEADINGS = /^(listen to episode|related appendices|authoritative sources)$/i;
const ALLOWED_MARKERS = new Set(['ALEX', 'JAMIE', 'PAUSE']);
const DEFAULT_GATES = {
  minSpeakerWordShare: 0.3,
  maxSpeakerWordShare: 0.7,
  maxConsecutiveTurns: 4,
  maxRepeatedTemplateCount: 2
};

function parseArgs(argv) {
  const args = { source: [], concept: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : true;
    if (key === 'source') args.source.push(value);
    else if (key === 'concept') args.concept.push(value);
    else args[key] = value;
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
  return String(text || '')
    .replace(/\r/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(text) {
  return cleanText(String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|]/g, ' '));
}

function extractHeadings(markdown) {
  const headings = [];
  for (const line of String(markdown || '').replace(/\r/g, '').split('\n')) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (!match) continue;
    const title = stripMarkdown(match[2]);
    if (!title || NOISE_HEADINGS.test(title)) continue;
    headings.push({ level: match[1].length, title });
  }
  return headings;
}

function normalizeConceptList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(item => String(item || '').trim()).filter(Boolean);
  return String(value)
    .split(/\r?\n|[;]+/)
    .map(item => item.replace(/^\s*[-*]\s*/, '').trim())
    .filter(Boolean);
}

function tokenize(text) {
  return cleanText(text)
    .toLowerCase()
    .split(/[^a-z0-9@#+-]+/)
    .map(token => token.trim())
    .filter(token => token.length >= 3 && !STOPWORDS.has(token));
}

function coverageForConcept(transcriptLower, conceptTitle) {
  const exact = transcriptLower.includes(String(conceptTitle).toLowerCase());
  const keywords = [...new Set(tokenize(conceptTitle))];
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

function summarizeCoverage(items) {
  return {
    covered: items.filter(item => item.status === 'covered').length,
    partial: items.filter(item => item.status === 'partial').length,
    missing: items.filter(item => item.status === 'missing').length,
    total: items.length
  };
}

function parseTranscript(script) {
  const lines = String(script || '').replace(/\r/g, '').split('\n');
  const segments = [];
  const invalidMarkers = [];
  const markerPlacementIssues = [];
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
      if (!ALLOWED_MARKERS.has(marker)) {
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
    if (!currentSpeaker) {
      markerPlacementIssues.push({ line: index + 1, content: trimmed.slice(0, 120) });
    }
    currentLines.push(trimmed);
  }

  flush();
  return { segments, invalidMarkers, markerPlacementIssues };
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

function firstSentence(text) {
  if (!text) return '';
  const sentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  return cleanText(sentence).toLowerCase();
}

function lastSentence(text) {
  if (!text) return '';
  const sentences = cleanText(text).split(/(?<=[.!?])\s+/);
  return (sentences[sentences.length - 1] || '').toLowerCase();
}

function collectRepeats(values, minLength = 25, maxItems = 10) {
  const counts = new Map();
  for (const value of values) {
    const normalized = cleanText(String(value || '')).toLowerCase();
    if (normalized.length < minLength) continue;
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1])
    .slice(0, maxItems)
    .map(([text, count]) => ({ text, count }));
}

function findRepeatedStarts(segments) {
  const counts = new Map();
  for (const segment of segments) {
    if (segment.speaker === 'PAUSE' || !segment.text) continue;
    const start = firstSentence(segment.text).slice(0, 90);
    if (start.length < 25) continue;
    counts.set(start, (counts.get(start) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 10)
    .map(([text, count]) => ({ count, text }));
}

function findRepeatedLongSegments(segments, minLength = 120) {
  const counts = new Map();
  for (const segment of segments) {
    if (segment.speaker === 'PAUSE' || !segment.text) continue;
    const normalized = cleanText(segment.text).toLowerCase();
    if (normalized.length < minLength) continue;
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 20)
    .map(([text, count]) => ({ count, text }));
}

function findRepeatedLongLines(script) {
  const longLines = String(script || '')
    .replace(/\r/g, '')
    .split('\n')
    .map(line => cleanText(line))
    .filter(line => line.length >= 80 && !/^\[(ALEX|JAMIE|PAUSE)\]$/i.test(line));
  return collectRepeats(longLines, 80, 15);
}

function openerPattern(segments) {
  const opener = segments.find(segment => segment.speaker !== 'PAUSE' && segment.text);
  if (!opener) return { label: 'none', text: '' };
  const sentence = firstSentence(opener.text);
  const patterns = [
    { label: 'welcome-to', regex: /^welcome to\b/ },
    { label: 'welcome-back', regex: /^welcome back\b/ },
    { label: 'this-is', regex: /^this is\b/ },
    { label: 'you-are-listening', regex: /^you are listening\b/ },
    { label: 'episode-number', regex: /^episode \d+/ },
    { label: 'generic-question', regex: /^(what|how|why)\b/ }
  ];
  const match = patterns.find(item => item.regex.test(sentence));
  return { label: match ? match.label : 'custom', text: sentence.slice(0, 120) };
}

function findStockLineHits(transcriptLower) {
  const stockPatterns = [
    /that is episode \d+/g,
    /carry the map/g,
    /orient, act, verify/g,
    /and i am jamie/g,
    /what should people carry with them after this/g,
    /that is a better way to say it than just follow the steps/g
  ];
  const hits = [];
  for (const pattern of stockPatterns) {
    const found = transcriptLower.match(pattern);
    if (found && found.length) hits.push({ pattern: String(pattern), count: found.length });
  }
  return hits;
}

function analyzeDialogueBalance(segments, summary) {
  const spokenSegments = segments.filter(segment => segment.speaker !== 'PAUSE');
  const totalSpokenWords = summary.ALEX.words + summary.JAMIE.words;
  const alexShare = totalSpokenWords ? summary.ALEX.words / totalSpokenWords : 0;
  const jamieShare = totalSpokenWords ? summary.JAMIE.words / totalSpokenWords : 0;

  let maxConsecutiveTurns = 0;
  let currentSpeaker = null;
  let currentRun = 0;
  const monologueRuns = [];

  for (const segment of spokenSegments) {
    if (segment.speaker === currentSpeaker) currentRun += 1;
    else {
      currentSpeaker = segment.speaker;
      currentRun = 1;
    }
    if (currentRun > maxConsecutiveTurns) maxConsecutiveTurns = currentRun;
    if (currentRun > DEFAULT_GATES.maxConsecutiveTurns) {
      monologueRuns.push({
        speaker: currentSpeaker,
        consecutiveTurns: currentRun,
        sample: segment.text.slice(0, 140)
      });
    }
  }

  return {
    totalSpokenWords,
    alexWordShare: Number(alexShare.toFixed(4)),
    jamieWordShare: Number(jamieShare.toFixed(4)),
    maxConsecutiveTurns,
    monologueRuns
  };
}

function resolveSources(args) {
  if (args.packet) {
    const packetPath = ensureAbsolute(args.packet);
    const packet = JSON.parse(readRequired(packetPath));
    const packetSources = (packet.sourceFiles || []).map(source => {
      const sourcePath = ensureAbsolute(source.path);
      const exists = fs.existsSync(sourcePath);
      return {
        sourcePath,
        sourceLabel: source.label || path.basename(sourcePath),
        exists,
        content: exists ? readRequired(sourcePath) : '',
        concepts: normalizeConceptList(source.concepts)
      };
    });
    return {
      packetPath,
      packet,
      sources: packetSources,
      concepts: normalizeConceptList(packet.concepts)
    };
  }

  const sources = (args.source || []).map(sourcePath => {
    const absolute = ensureAbsolute(sourcePath);
    const exists = fs.existsSync(absolute);
    return {
      sourcePath: absolute,
      sourceLabel: path.basename(absolute),
      exists,
      content: exists ? readRequired(absolute) : '',
      concepts: []
    };
  });

  return {
    packetPath: null,
    packet: null,
    sources,
    concepts: normalizeConceptList(args.concept)
  };
}

function evaluateTranscript(options) {
  const transcriptLower = options.transcript.toLowerCase();
  const sourceCoverage = [];
  const allHeadingCoverage = [];
  const aggregatedConcepts = [];
  const missingSourceFiles = [];

  for (const source of options.sources) {
    if (!source.exists) {
      missingSourceFiles.push(source.sourcePath);
      sourceCoverage.push({
        sourcePath: source.sourcePath,
        sourceLabel: source.sourceLabel,
        exists: false,
        headingCoverage: [],
        coverageSummary: { covered: 0, partial: 0, missing: 0, total: 0 }
      });
      continue;
    }

    const headings = extractHeadings(source.content);
    const headingCoverage = headings.map(heading => ({
      level: heading.level,
      title: heading.title,
      ...coverageForConcept(transcriptLower, heading.title)
    }));
    const coverageSummary = summarizeCoverage(headingCoverage);
    sourceCoverage.push({
      sourcePath: source.sourcePath,
      sourceLabel: source.sourceLabel,
      exists: true,
      headingsAnalyzed: headings.length,
      coverageSummary,
      headingCoverage
    });
    allHeadingCoverage.push(...headingCoverage.map(item => ({ ...item, sourcePath: source.sourcePath })));
    aggregatedConcepts.push(...(source.concepts || []));
  }

  const catalogConcepts = [...new Set([...(options.concepts || []), ...aggregatedConcepts])];
  const conceptCoverage = catalogConcepts.map(concept => ({
    concept,
    ...coverageForConcept(transcriptLower, concept)
  }));

  const headingCoverageSummary = summarizeCoverage(allHeadingCoverage);
  const conceptCoverageSummary = summarizeCoverage(conceptCoverage);
  const { segments, invalidMarkers, markerPlacementIssues } = parseTranscript(options.transcript);
  const segmentSummary = summarizeSegments(segments);
  const dialogueBalance = analyzeDialogueBalance(segments, segmentSummary);
  const repeatedStarts = findRepeatedStarts(segments);
  const repeatedLongSegments = findRepeatedLongSegments(segments);
  const repeatedLongLines = findRepeatedLongLines(options.transcript);
  const spokenSegments = segments.filter(segment => segment.speaker !== 'PAUSE' && segment.text);
  const repeatedOpeners = collectRepeats(
    spokenSegments.slice(0, Math.min(10, spokenSegments.length)).map(segment => firstSentence(segment.text)),
    20,
    10
  );
  const repeatedClosers = collectRepeats(
    spokenSegments.slice(-Math.min(10, spokenSegments.length)).map(segment => lastSentence(segment.text)),
    20,
    10
  );
  const markerFormatPass = invalidMarkers.length === 0 && markerPlacementIssues.length === 0;
  const dialogueBalancePass = dialogueBalance.alexWordShare >= DEFAULT_GATES.minSpeakerWordShare
    && dialogueBalance.alexWordShare <= DEFAULT_GATES.maxSpeakerWordShare
    && dialogueBalance.jamieWordShare >= DEFAULT_GATES.minSpeakerWordShare
    && dialogueBalance.jamieWordShare <= DEFAULT_GATES.maxSpeakerWordShare
    && dialogueBalance.maxConsecutiveTurns <= DEFAULT_GATES.maxConsecutiveTurns;
  const repetitionPass = repeatedLongLines.length === 0
    && repeatedOpeners.every(item => item.count <= DEFAULT_GATES.maxRepeatedTemplateCount)
    && repeatedClosers.every(item => item.count <= DEFAULT_GATES.maxRepeatedTemplateCount)
    && repeatedStarts.every(item => item.count <= DEFAULT_GATES.maxRepeatedTemplateCount);
  const coveragePass = missingSourceFiles.length === 0
    && headingCoverageSummary.missing === 0
    && conceptCoverageSummary.missing === 0;
  const gates = {
    coveragePass,
    stylePass: markerFormatPass && dialogueBalancePass,
    repetitionPass
  };
  gates.pass = gates.coveragePass && gates.stylePass && gates.repetitionPass;
  gates.failureReasons = [];
  if (!gates.coveragePass) gates.failureReasons.push('coverage');
  if (!gates.stylePass) gates.failureReasons.push('style');
  if (!gates.repetitionPass) gates.failureReasons.push('repetition');

  return {
    generatedAt: new Date().toISOString(),
    transcriptPath: options.transcriptPath,
    transcriptWords: options.transcript.split(/\s+/).filter(Boolean).length,
    transcriptCharacters: options.transcript.length,
    sourcesAnalyzed: sourceCoverage.length,
    missingSourceFiles,
    sourceCoverage,
    headingCoverageSummary,
    conceptCoverageSummary,
    conceptCoverage,
    invalidMarkers,
    markerPlacementIssues,
    segmentSummary,
    dialogueBalance,
    repeatedStarts,
    repeatedOpeners,
    repeatedClosers,
    repeatedLongSegments,
    repeatedLongLines,
    openerPattern: openerPattern(segments),
    stockLineHits: findStockLineHits(transcriptLower),
    gates
  };
}

function analyzeTranscript({ sourcePath, transcriptPath, source, transcript }) {
  const report = evaluateTranscript({
    transcriptPath,
    transcript,
    sources: [{
      sourcePath,
      sourceLabel: path.basename(sourcePath),
      exists: true,
      content: source,
      concepts: []
    }],
    concepts: []
  });

  return {
    generatedAt: report.generatedAt,
    sourcePath,
    transcriptPath,
    transcriptWords: report.transcriptWords,
    transcriptCharacters: report.transcriptCharacters,
    headingsAnalyzed: report.headingCoverageSummary.total,
    coverageSummary: report.headingCoverageSummary,
    invalidMarkers: report.invalidMarkers,
    segmentSummary: report.segmentSummary,
    repeatedStarts: report.repeatedStarts,
    repeatedLongSegments: report.repeatedLongSegments,
    openerPattern: report.openerPattern,
    stockLineHits: report.stockLineHits,
    headingCoverage: report.sourceCoverage[0] ? report.sourceCoverage[0].headingCoverage : [],
    gates: report.gates
  };
}

function evaluateQualityGates(report, args) {
  const maxMissing = Number.isFinite(Number(args['max-missing'])) ? Number(args['max-missing']) : Number.POSITIVE_INFINITY;
  const maxRepeatedStarts = Number.isFinite(Number(args['max-repeated-starts'])) ? Number(args['max-repeated-starts']) : Number.POSITIVE_INFINITY;
  const maxRepeatedLong = Number.isFinite(Number(args['max-repeated-long'])) ? Number(args['max-repeated-long']) : Number.POSITIVE_INFINITY;
  const maxStockHits = Number.isFinite(Number(args['max-stock-hits'])) ? Number(args['max-stock-hits']) : Number.POSITIVE_INFINITY;

  const failures = [];
  if ((report.invalidMarkers || []).length > 0) failures.push(`Invalid markers: ${report.invalidMarkers.length}`);
  if ((report.coverageSummary || report.headingCoverageSummary || { missing: 0 }).missing > maxMissing) failures.push(`Missing concepts/headings ${(report.coverageSummary || report.headingCoverageSummary).missing} > ${maxMissing}`);
  if ((report.repeatedStarts || []).length > maxRepeatedStarts) failures.push(`Repeated starts ${report.repeatedStarts.length} > ${maxRepeatedStarts}`);
  if ((report.repeatedLongSegments || []).length > maxRepeatedLong) failures.push(`Repeated long segments ${report.repeatedLongSegments.length} > ${maxRepeatedLong}`);
  const stockHitCount = (report.stockLineHits || []).reduce((sum, item) => sum + item.count, 0);
  if (stockHitCount > maxStockHits) failures.push(`Stock line hits ${stockHitCount} > ${maxStockHits}`);

  return {
    pass: failures.length === 0,
    failures,
    thresholds: { maxMissing, maxRepeatedStarts, maxRepeatedLong, maxStockHits }
  };
}

function usage() {
  return 'Usage: node podcasts/tools/agentic-pilot/evaluate-transcript.js --transcript <script> (--packet <packet-json> | --source <markdown> [--source <markdown> ...]) [--concept <text>] [--out <json>]';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.transcript || ((!args.source || args.source.length === 0) && !args.packet)) {
    console.error(usage());
    process.exit(1);
  }

  const transcriptPath = ensureAbsolute(args.transcript);
  const transcript = readRequired(transcriptPath);
  const sourceConfig = resolveSources(args);
  const report = evaluateTranscript({
    transcript,
    transcriptPath,
    sources: sourceConfig.sources,
    concepts: sourceConfig.concepts
  });
  report.qualityGates = evaluateQualityGates(report, args);
  if (sourceConfig.packetPath) {
    report.packetPath = sourceConfig.packetPath;
    report.packetSlug = sourceConfig.packet && sourceConfig.packet.slug;
  }

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

module.exports = {
  extractHeadings,
  parseTranscript,
  analyzeTranscript,
  evaluateQualityGates,
  evaluateTranscript,
  resolveSources,
  normalizeConceptList,
  findRepeatedStarts,
  findRepeatedLongSegments,
  openerPattern
};
