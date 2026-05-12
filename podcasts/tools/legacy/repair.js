#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { GoogleAuth } = require('google-auth-library');

const PROJECT_ID = process.env.GCP_PROJECT_ID || '';
const REGION = process.env.GCP_REGION || 'us-central1';
const MODEL = 'gemini-2.5-flash-preview-tts';
const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const BYTES_PER_SAMPLE = BITS_PER_SAMPLE / 8;

if (!PROJECT_ID && !process.env.PODCASTS_OFFLINE) {
  console.error('Set GCP_PROJECT_ID to your project ID (or set PODCASTS_OFFLINE=1 to run offline)');
  process.exit(1);
}

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
let cachedToken = null;
async function getAccessToken() {
  if (cachedToken) return cachedToken;
  const client = await auth.getClient();
  const res = await client.getAccessToken();
  cachedToken = res.token;
  return cachedToken;
}

console.log('Using TTS model:', MODEL);

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
  header.writeUInt16LE(BITS_PER_SAMPLE, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  fs.writeFileSync(filepath, Buffer.concat([header, pcmBuffer]));
}

async function callGeminiTTS(text, voiceName) {
  // Offline fallback for debugging/hangs: if PODCASTS_OFFLINE is set
  // generate a silent PCM buffer instead of calling the network.
  if (process.env.PODCASTS_OFFLINE) {
    const words = (String(text || '')).split(/\s+/).filter(Boolean).length;
    const seconds = Math.max(1, Math.min(12, Math.ceil(words / 2)));
    const samples = SAMPLE_RATE * CHANNELS * seconds;
    const buf = Buffer.alloc(samples * BYTES_PER_SAMPLE);
    try { fs.appendFileSync(path.join(__dirname, 'logs', 'tts-http.log'), new Date().toISOString() + ` offline silent seconds=${seconds} words=${words}\n`); } catch(e){}
    return buf;
  }

  const token = await getAccessToken();
  const vertexPath = `/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${MODEL}:generateContent`;
  const hostname = `${REGION}-aiplatform.googleapis.com`;
  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text }] }],
    generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } } }
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path: vertexPath,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'Authorization': `Bearer ${token}` }
    };
    const req = https.request(options, res => {
      const chunks = [];
      const start = Date.now();
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const elapsed = Date.now() - start;
        const buf = Buffer.concat(chunks);
        try {
          const text = buf.toString('utf8');
          let json = null;
          try { json = JSON.parse(text); } catch (e) { /* not JSON */ }
          // log status and size for diagnostics
          try { fs.appendFileSync(path.join(__dirname, 'logs', 'tts-http.log'), new Date().toISOString() + ` status=${res.statusCode} bytes=${buf.length} elapsedMs=${elapsed}\n`); } catch(e){}
          const audioPart = json?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (!audioPart) {
            // dump full response for debugging
            try { fs.writeFileSync(path.join(__dirname, 'logs', `tts-response-${Date.now()}.json`), text); } catch(e){}
            return reject(new Error('No audio in response (see logs/tts-response-*.json)'));
          }
          resolve(Buffer.from(audioPart.data, 'base64'));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    // add a 60s socket timeout to avoid hanging indefinitely
    req.setTimeout(60000, () => {
      req.abort();
      reject(new Error('TTS request timed out after 60000ms'));
    });
    req.write(body);
    req.end();
  });
}

async function main() {
  const [,, slug, seqArg, voiceOverride] = process.argv;
  if (!slug || !seqArg) {
    console.error('Usage: node repair.js <episode-slug> <seq> [voiceOverride]');
    process.exit(1);
  }
  const seq = parseInt(seqArg, 10);
  const audioDir = path.join(__dirname, 'audio');
  const segDir = path.join(audioDir, 'segments', slug);
  const manifestPath = path.join(segDir, 'manifest.json');
  const logPath = path.join(segDir, 'process.log');
  function writeLog(line){ try { fs.appendFileSync(logPath, new Date().toISOString() + ' ' + line + '\n'); } catch(e){} }
  if (!fs.existsSync(manifestPath)) {
    console.error('manifest.json not found for', slug);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const entry = manifest.find(e => e.seq === seq);
  if (!entry) {
    console.error('seq not found in manifest');
    process.exit(1);
  }
  if (!entry.text) {
    console.error('entry has no text (PAUSE?)');
    process.exit(1);
  }
  // Build a consistent speaker -> voice mapping (male/female choices)
  function getVoiceForSpeaker(speaker) {
    if (!speaker) return 'Aoede';
    const s = String(speaker).toUpperCase();
    const male = new Set(['ALEX', 'HOST', 'MALE', 'JAMES', 'JOHN']);
    const female = new Set(['BETH', 'GUEST', 'FEMALE', 'JANE', 'EMMA']);
    if (male.has(s)) return 'Schedar';
    if (female.has(s)) return 'Aoede';
    return 'Aoede';
  }

  function defaultFilenameFor(seqNum, speaker) {
    return `seg${String(seqNum).padStart(3,'0')}-${String(speaker || 's').toLowerCase()}.wav`;
  }

  async function synthAndWrite(manifestEntry, voiceNameForEntry) {
    if (!manifestEntry.text) return null;
    const filename = manifestEntry.filename || defaultFilenameFor(manifestEntry.seq, manifestEntry.speaker);
    const finalPath = path.join(segDir, filename);
    const logPath = path.join(segDir, 'process.log');
    function writeLog(line) { try { fs.appendFileSync(logPath, new Date().toISOString() + ' ' + line + '\n'); } catch(e){} }
    if (fs.existsSync(finalPath)) { writeLog(`skipping seq ${manifestEntry.seq} existing ${filename}`); return { path: finalPath, skipped: true }; }
    console.log('Synthesizing seq', manifestEntry.seq, '->', filename, 'voice', voiceNameForEntry);
    writeLog(`synth start seq=${manifestEntry.seq} voice=${voiceNameForEntry} file=${filename}`);
    const pcm = await callGeminiTTS(manifestEntry.text, voiceNameForEntry);
    const tmpPath = finalPath + '.tmp';
    // remove any existing placeholder marker or stale final file BEFORE writing
    try {
      const seqStr = String(manifestEntry.seq).padStart(3, '0');
      const marker = path.join(segDir, `seg${seqStr}-${String(manifestEntry.speaker||'').toLowerCase()}.placeholder`);
      if (fs.existsSync(marker)) { fs.unlinkSync(marker); writeLog(`removed placeholder ${marker}`); }
      if (fs.existsSync(finalPath)) { fs.unlinkSync(finalPath); writeLog(`removed stale file ${finalPath}`); }
    } catch (e) { writeLog && writeLog(`cleanup-before-write failed: ${e && e.message}`); }
    // On Windows some environments block atomic rename of temp files.
    // Write directly to the final path to avoid EPERM during rename.
    writeWav(finalPath, pcm);
    // remove any dry-run placeholder marker file if present
    try {
      const seqStr = String(manifestEntry.seq).padStart(3, '0');
      const marker = path.join(segDir, `seg${seqStr}-${String(manifestEntry.speaker||'').toLowerCase()}.placeholder`);
      if (fs.existsSync(marker)) fs.unlinkSync(marker);
    } catch (e) {}
    writeLog(`synth wrote seq=${manifestEntry.seq} bytes=${pcm.length}`);
    manifestEntry.filename = filename;
    manifestEntry.status = 'repaired';
    manifestEntry.voice = voiceNameForEntry;
    manifestEntry.sha256 = sha256(pcm);
    manifestEntry.duration = (pcm.length / (SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE));
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    return { path: finalPath, skipped: false };
  }

  // Find missing segments (file absent or voice mismatch). By default only
  // rebuild the requested seq to avoid regenerating the entire episode when
  // a single segment is requested. If you want to rebuild all missing
  // segments, call this script with a special flag in future.
  const missing = manifest.filter(e => {
    if (!e || !e.seq) return false;
    if (e.speaker === 'PAUSE') return false;
    const filename = e.filename || defaultFilenameFor(e.seq, e.speaker);
    const filepath = path.join(segDir, filename);
    const expectedVoice = getVoiceForSpeaker(e.speaker);
    const hasVoiceMismatch = e.voice && e.voice !== expectedVoice;
    return (!fs.existsSync(filepath)) || hasVoiceMismatch;
  });

  // Only rebuild the requested sequence (if it's missing or mismatched).
  const toRebuild = missing.filter(m => m.seq === seq);
  if (toRebuild.length > 0) {
    for (const m of toRebuild) {
      try {
        const voiceFor = getVoiceForSpeaker(m.speaker);
        writeLog && writeLog(`rebuild missing seq=${m.seq} expectedVoice=${voiceFor} currentVoice=${m.voice||'<none>'}`);
        await synthAndWrite(m, voiceFor);
      } catch (err) {
        console.error('Failed to rebuild seq', m.seq, err.message || err);
        writeLog && writeLog(`rebuild-failed seq=${m.seq} error=${err && err.message ? err.message : err}`);
      }
    }
  }

  // Now synthesize the requested seq (apply voiceOverride if provided)
  const voiceName = voiceOverride || getVoiceForSpeaker(entry.speaker);
  console.log('Re-synthesizing', slug, 'seq', seq, 'voice', voiceName);
  try {
    const pcm = await callGeminiTTS(entry.text, voiceName);
    const filename = entry.filename || defaultFilenameFor(seq, entry.speaker);
    const tmpPath = path.join(segDir, filename + '.tmp');
    // remove any placeholder marker or stale final file before writing
    try {
      const seqStr = String(seq).padStart(3, '0');
      const marker = path.join(segDir, `seg${seqStr}-${String(entry.speaker||'').toLowerCase()}.placeholder`);
      if (fs.existsSync(marker)) { fs.unlinkSync(marker); writeLog && writeLog(`removed placeholder ${marker}`); }
      const finalPath = path.join(segDir, filename);
      if (fs.existsSync(finalPath)) { fs.unlinkSync(finalPath); writeLog && writeLog(`removed stale file ${finalPath}`); }
    } catch (e) { writeLog && writeLog(`cleanup-before-write failed: ${e && e.message}`); }
    // Write directly to final path to avoid rename permission errors on Windows
    const finalPath = path.join(segDir, filename);
    writeWav(finalPath, pcm);
    entry.filename = filename;
    entry.status = 'repaired';
    entry.sha256 = sha256(pcm);
    entry.duration = (pcm.length / (SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE));
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Wrote', finalPath);
  } catch (e) {
    console.error('Repair failed:', e.message);
    process.exit(1);
  }
}

main();
