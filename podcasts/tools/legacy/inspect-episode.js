const fs = require('fs');
const path = require('path');

// Copy of parsing logic from generate-all-multispeaker.js
function parseScript(text) {
  const segments = [];
  const lines = text.split('\n');
  let currentSpeaker = null;
  let currentText = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed === '[ALEX]') {
      if (currentSpeaker && currentText.length > 0) {
        segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
      }
      currentSpeaker = 'ALEX';
      currentText = [];
    } else if (trimmed === '[JAMIE]') {
      if (currentSpeaker && currentText.length > 0) {
        segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
      }
      currentSpeaker = 'JAMIE';
      currentText = [];
    } else if (trimmed === '[PAUSE]') {
      if (currentSpeaker && currentText.length > 0) {
        segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
        currentText = [];
      }
      segments.push({ speaker: 'PAUSE', text: '' });
    } else {
      currentText.push(trimmed);
    }
  }
  if (currentSpeaker && currentText.length > 0) {
    segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
  }
  return segments;
}

function splitLongSegments(segments) {
  const MAX_CHARS_PER_CALL = 400;
  const result = [];
  for (const seg of segments) {
    if (seg.speaker === 'PAUSE' || seg.text.length <= MAX_CHARS_PER_CALL) {
      result.push(seg);
      continue;
    }
    const sentences = seg.text.match(/[^.!?]+[.!?]+/g) || [seg.text];
    let chunk = '';
    for (const sentence of sentences) {
      if (chunk.length + sentence.length > MAX_CHARS_PER_CALL && chunk.length > 0) {
        result.push({ speaker: seg.speaker, text: chunk.trim() });
        chunk = '';
      }
      chunk += sentence;
    }
    if (chunk.trim().length > 0) result.push({ speaker: seg.speaker, text: chunk.trim() });
  }
  return result;
}

function extractPreviewsFromLog(logText) {
  const lines = logText.split(/\r?\n/);
  const previews = [];
  const re = /\[\s*\d+\/\s*\d+\]\s*(?:Alex|Jamie|PAUSE).*"([^"]+)\.\.\."/i;
  for (const l of lines) {
    const m = l.match(re);
    if (m) previews.push(m[1].replace(/\n/g, ' ').trim());
  }
  return previews;
}

async function inspect(epNum) {
  const scriptsDir = path.join(__dirname, 'scripts');
  const logsDir = path.join(__dirname, 'logs');
  const scriptFile = fs.readdirSync(scriptsDir).find(f => f.startsWith(`ep${String(epNum).padStart(2,'0')}-`));
  if (!scriptFile) return console.error('Script not found for ep', epNum);
  const scriptPath = path.join(scriptsDir, scriptFile);
  const logFile = fs.readdirSync(logsDir).find(f => f.includes(`ep${String(epNum).padStart(2,'0')}-`));

  const scriptText = fs.readFileSync(scriptPath, 'utf8');
  const raw = parseScript(scriptText);
  const segments = splitLongSegments(raw);

  console.log(`Script: ${scriptFile}`);
  console.log(`  Raw segments: ${raw.length}`);
  console.log(`  Post-split segments: ${segments.length}`);

  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    const preview = s.text.substring(0, 80).replace(/\n/g, ' ');
    console.log(`  [${i+1}/${segments.length}] ${s.speaker} - ${preview.replace(/"/g,'')}`);
  }

  if (!logFile) return console.warn('No log file found for this episode in podcasts/logs');
  const logText = fs.readFileSync(path.join(logsDir, logFile), 'utf8');
  const previews = extractPreviewsFromLog(logText);
  console.log('\nPreviews from log:');
  previews.forEach((p, idx) => console.log(`  [${idx+1}/${previews.length}] ${p}`));

  // Compare counts
  console.log('\nComparison:');
  console.log(`  segments: ${segments.length}, log previews: ${previews.length}`);
  const min = Math.min(segments.length, previews.length);
  for (let i = 0; i < min; i++) {
    const s = segments[i].text.substring(0,50).trim();
    const l = previews[i].substring(0,50).trim();
    if (s !== l) console.log(`  MISMATCH [${i+1}]: script="${s}" | log="${l}"`);
  }

  // If a manifest exists, compare manifest ordering and statuses
  const segDir = path.join(__dirname, 'audio', 'segments', path.basename(scriptFile, '.txt'));
  const manifestPath = path.join(segDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    console.log('\nFound manifest:', manifestPath);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`  Manifest entries: ${manifest.length}`);
    // Check for sequence gaps / failures
    const seqs = manifest.map(m => m.seq);
    for (let i = 0; i < manifest.length; i++) {
      const m = manifest[i];
      const expectedSeq = i + 1;
      if (m.seq !== expectedSeq) console.log(`  SEQ-MISMATCH at index ${i}: expected ${expectedSeq}, manifest has ${m.seq}`);
      if (m.status && m.status !== 'ok' && m.status !== 'reused' && m.status !== 'repaired') console.log(`  WARNING seq ${m.seq} status=${m.status}`);
      if (m.filename) {
        const fpath = path.join(segDir, m.filename);
        if (!fs.existsSync(fpath)) console.log(`  MISSING file for seq ${m.seq}: ${m.filename}`);
      }
    }
    // Compare manifest text previews to parsed segments
    const min2 = Math.min(segments.length, manifest.length);
    for (let i = 0; i < min2; i++) {
      const s = segments[i].text.substring(0,50).trim();
      const mtxt = (manifest[i].text||'').substring(0,50).trim();
      if (s !== mtxt) console.log(`  MANIFEST-MISMATCH [${i+1}]: script="${s}" | manifest="${mtxt}"`);
    }
  } else {
    console.log('\nNo manifest found for this episode.');
  }
}

const arg = process.argv[2];
if (!arg) { console.error('Usage: node inspect-episode.js <episodeNumber>'); process.exit(1); }
inspect(Number(arg)).catch(err => console.error(err));
