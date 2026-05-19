const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const SCRIPTS_DIR = path.join(PODCASTS_DIR, 'scripts');
const TRANSCRIPTS_DIR = path.join(PODCASTS_DIR, 'transcripts');

function cleanText(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/\r/g, '')
    .replace(/[\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\u2026/g, '...')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTranscript(script) {
  const segments = [];
  const lines = String(script || '').replace(/\r/g, '').split('\n');
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
      throw new Error(`Transcript content before speaker marker on line ${index + 1}`);
    }
    currentLines.push(trimmed);
  }

  flush();
  if (!segments.length) throw new Error('Transcript did not produce any segments.');
  return segments;
}

function normalizeChapterTitle(value) {
  return cleanText(value).replace(/^[:\-\s]+/, '').trim().slice(0, 90);
}

function buildChapterPlan(slug, segments, modelChapters) {
  const validModelChapters = (modelChapters || [])
    .map(item => ({
      title: normalizeChapterTitle(item.title || ''),
      startSegmentIndex: Number.parseInt(item.startSegmentIndex, 10)
    }))
    .filter(item => item.title && Number.isInteger(item.startSegmentIndex) && item.startSegmentIndex >= 0 && item.startSegmentIndex < segments.length)
    .sort((a, b) => a.startSegmentIndex - b.startSegmentIndex);

  const deduped = [];
  for (const chapter of validModelChapters) {
    const prev = deduped[deduped.length - 1];
    if (prev && prev.startSegmentIndex === chapter.startSegmentIndex) {
      prev.title = chapter.title;
      continue;
    }
    deduped.push(chapter);
  }
  if (deduped.length) {
    if (deduped[0].startSegmentIndex !== 0) {
      deduped.unshift({ title: `${slug}: Overview`, startSegmentIndex: 0 });
    }
    return { version: 1, slug, chapters: deduped };
  }

  const chapters = [{ title: `${slug}: Overview`, startSegmentIndex: 0 }];
  let spokenSinceLast = 0;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (segment.speaker !== 'PAUSE') {
      spokenSinceLast += 1;
      continue;
    }
    const next = segments[index + 1];
    if (!next || next.speaker === 'PAUSE') continue;
    if (spokenSinceLast < 10) continue;
    chapters.push({
      title: `Section ${chapters.length + 1}`,
      startSegmentIndex: index + 1
    });
    spokenSinceLast = 0;
  }
  return { version: 1, slug, chapters };
}

function estimatedChapterPreview(plan, segments) {
  const msPerWord = 340;
  const cumulativeMs = [];
  let running = 0;
  for (const segment of segments) {
    cumulativeMs.push(running);
    if (segment.speaker === 'PAUSE') {
      running += 800;
    } else {
      const words = segment.text.split(/\s+/).filter(Boolean).length;
      running += Math.max(1000, words * msPerWord);
    }
  }
  return {
    slug: plan.slug,
    estimateModel: 'word-rate',
    chapters: plan.chapters.map(chapter => ({
      title: chapter.title,
      startSegmentIndex: chapter.startSegmentIndex,
      estimatedStartSeconds: Math.max(0, Math.round((cumulativeMs[chapter.startSegmentIndex] || 0) / 1000))
    }))
  };
}

const MANIFEST_PATH = path.join(PODCASTS_DIR, 'manifest.json');
let manifestGroupCache = null;

function loadManifestGroupMap() {
  if (manifestGroupCache) return manifestGroupCache;
  const map = new Map();
  try {
    const entries = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    for (const e of entries) {
      const n = parseInt(e.number, 10);
      if (!Number.isFinite(n) || !e.slug) continue;
      const stem = `ep${String(n).padStart(2, '0')}-${e.slug}`;
      const firstSource = String(((e.sources || [])[0]) || '').toLowerCase();
      const group = firstSource.startsWith('appendix-') ? 'appendices' : 'chapters';
      map.set(stem, group);
    }
  } catch (_) {
    // manifest unavailable; fall back to heuristics below
  }
  manifestGroupCache = map;
  return map;
}

function findGroupForSlug(slug) {
  if (/^cc-/i.test(slug)) return 'challenges';
  const manifestGroup = loadManifestGroupMap().get(slug);
  if (manifestGroup) return manifestGroup;
  // Fall back: prefer an existing on-disk script if manifest doesn't cover the slug.
  for (const group of ['chapters', 'appendices', 'challenges']) {
    if (fs.existsSync(path.join(SCRIPTS_DIR, group, `${slug}.txt`))) return group;
  }
  if (/appendix/i.test(slug)) return 'appendices';
  return 'chapters';
}

function livePathsForSlug(slug) {
  const group = findGroupForSlug(slug);
  return {
    group,
    scriptPath: path.join(SCRIPTS_DIR, group, `${slug}.txt`),
    segmentsPath: path.join(TRANSCRIPTS_DIR, group, `${slug}-segments.json`),
    chaptersPath: path.join(TRANSCRIPTS_DIR, group, `${slug}-chapters.json`)
  };
}

module.exports = {
  parseTranscript,
  buildChapterPlan,
  estimatedChapterPreview,
  livePathsForSlug
};
