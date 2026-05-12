#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BYTES_PER_SAMPLE = 2;

function generateSilence(seconds) {
  const numSamples = Math.floor(SAMPLE_RATE * seconds * CHANNELS);
  return Buffer.alloc(numSamples * BYTES_PER_SAMPLE);
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function writeWav(filepath, pcmBuffer) {
  const byteRate = SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE;
  const blockAlign = CHANNELS * BYTES_PER_SAMPLE;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(CHANNELS, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  fs.writeFileSync(filepath, Buffer.concat([header, pcmBuffer]));
}

function parseScript(text) {
  const segments = [];
  const lines = text.split('\n');
  let currentSpeaker = null;
  let currentText = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t === '[ALEX]' || t === '[JAMIE]') {
      if (currentSpeaker && currentText.length) segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
      currentSpeaker = t.replace(/\[|\]/g, '');
      currentText = [];
    } else if (t === '[PAUSE]') {
      if (currentSpeaker && currentText.length) { segments.push({ speaker: currentSpeaker, text: currentText.join(' ') }); currentText = []; }
      segments.push({ speaker: 'PAUSE', text: '' });
    } else {
      currentText.push(t);
    }
  }
  if (currentSpeaker && currentText.length) segments.push({ speaker: currentSpeaker, text: currentText.join(' ') });
  return segments;
}

function splitLongSegments(segments) {
  const MAX = 400;
  const out = [];
  for (const s of segments) {
    if (s.speaker === 'PAUSE' || s.text.length <= MAX) { out.push(s); continue; }
    const sentences = s.text.match(/[^.!?]+[.!?]+/g) || [s.text];
    let chunk = '';
    for (const sent of sentences) {
      if (chunk.length + sent.length > MAX && chunk.length) { out.push({ speaker: s.speaker, text: chunk.trim() }); chunk = ''; }
      chunk += sent;
    }
    if (chunk.trim()) out.push({ speaker: s.speaker, text: chunk.trim() });
  }
  return out;
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function processAll(startIdx, endIdx) {
  const scriptsDir = path.join(__dirname, 'scripts');
  const audioDir = path.join(__dirname, 'audio');
  const transcriptsDir = path.join(__dirname, 'transcripts');
  ensureDir(audioDir); ensureDir(transcriptsDir);
  let files = fs.readdirSync(scriptsDir).filter(f => f.match(/^ep\d{2}-.+\.txt$/)).sort();
  // If start/end provided, limit files to that numeric range
  if (typeof startIdx === 'number' && typeof endIdx === 'number' && !isNaN(startIdx) && !isNaN(endIdx)) {
    files = files.filter(f => {
      const num = parseInt(f.substr(2,2), 10);
      return num >= startIdx && num <= endIdx;
    });
  }
  for (const f of files) {
    const slug = f.replace('.txt','');
    const text = fs.readFileSync(path.join(scriptsDir,f),'utf8');
    const raw = parseScript(text);
    const segments = splitLongSegments(raw);
    fs.writeFileSync(path.join(transcriptsDir, `${slug}-segments.json`), JSON.stringify(segments,null,2));

    const segDir = path.join(audioDir, 'segments', slug);
    ensureDir(segDir);
    const manifestPath = path.join(segDir,'manifest.json');
    // If a manifest already exists, do not overwrite it. This avoids wiping
    // out synthesized filenames or metadata created by repair/build steps.
    if (fs.existsSync(manifestPath)) {
      console.log('Manifest exists, skipping dry-run creation for', slug);
      continue;
    }
    const manifest = [];
    for (let i=0;i<segments.length;i++) {
      const seq = i+1; const seqStr=String(seq).padStart(3,'0');
      const seg = segments[i];
      if (seg.speaker === 'PAUSE') {
        // For pauses, create a real silent WAV so the segment slot is visible
        // on disk and there are no numbering gaps.
        const pauseDuration = 1.5;
        const pauseFilename = `seg${seqStr}-pause.wav`;
        try {
          const silence = generateSilence(pauseDuration);
          const tmp = path.join(segDir, pauseFilename + '.tmp');
          writeWav(tmp, silence);
          fs.renameSync(tmp, path.join(segDir, pauseFilename));
        } catch (e) {
          // ignore write errors for dry-run
        }
        manifest.push({ seq, speaker: 'PAUSE', text: '', filename: pauseFilename, status: 'pause', duration: pauseDuration, sha256: sha256(generateSilence(pauseDuration)) });
        continue;
      }
      // For dry-run placeholders, do NOT write real .wav files. Create a small marker
      // file instead and leave `filename` null so synthesis logic treats the segment
      // as missing and will regenerate a proper WAV when requested.
      const filename = null;
      const duration = Math.max(0.6, Math.min(8, seg.text.split(/\s+/).filter(Boolean).length / 2.5));
      // write a marker file for visibility (optional) instead of a .wav
      const markerName = `seg${seqStr}-${seg.speaker.toLowerCase()}.placeholder`;
      try {
        fs.writeFileSync(path.join(segDir, markerName), `placeholder\nseq=${seq}\nspeaker=${seg.speaker}\n`);
      } catch (e) {
        // ignore marker write errors
      }
      manifest.push({ seq, speaker: seg.speaker, text: seg.text, filename, status: 'placeholder', duration: parseFloat(duration.toFixed(2)), sha256: null });
    }
    fs.writeFileSync(path.join(segDir,'manifest.json'), JSON.stringify(manifest,null,2));
    console.log('Created manifest for', slug);
  }
}

// Accept optional start/end numeric args: node create-manifests-dryrun.js <start> <end>
const argv = process.argv.slice(2);
let sIdx = null, eIdx = null;
if (argv.length >= 2) {
  const a = parseInt(argv[0], 10);
  const b = parseInt(argv[1], 10);
  if (!isNaN(a) && !isNaN(b) && a >= 0 && b >= a) { sIdx = a; eIdx = b; }
}
processAll(sIdx, eIdx);
