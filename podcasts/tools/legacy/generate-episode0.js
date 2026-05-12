#!/usr/bin/env node
/**
 * Generate full episode 0 podcast with two-speaker alternation.
 * Alex = Schedar (male), Jamie = Aoede (female)
 * Output: podcasts/audio/ep00-welcome.wav
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const { GoogleAuth } = require('google-auth-library');
const API_KEY = process.env.GEMINI_API_KEY || '';
const MODEL = 'gemini-2.5-flash-preview-tts';

function readProjectId() {
  if (process.env.GCP_PROJECT_ID) return process.env.GCP_PROJECT_ID;
  try {
    const txt = fs.readFileSync(path.join(__dirname, 'gcp_project.txt'), 'utf8').trim();
    if (txt) return txt;
  } catch (e) {}
  return '';
}

const PROJECT_ID = readProjectId();

async function getAccessToken() {
  if (API_KEY) return null;
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const res = await client.getAccessToken();
  return res && res.token ? res.token : null;
}

const VOICES = {
  ALEX: 'Schedar',
  JAMIE: 'Aoede'
};

const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const PAUSE_SECONDS = 1.5;

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

async function callGeminiTTS(text, voiceName) {
  // Offline fallback
  if (process.env.PODCASTS_OFFLINE) {
    const words = (String(text || '')).split(/\s+/).filter(Boolean).length;
    const seconds = Math.max(1, Math.min(12, Math.ceil(words / 2)));
    const samples = SAMPLE_RATE * CHANNELS * seconds;
    return Buffer.alloc(samples * (BITS_PER_SAMPLE / 8));
  }

  const body = JSON.stringify({
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName }
        }
      }
    }
  });

  // Build endpoint URL; prefer using API key if provided, otherwise use ADC token
  let urlStr = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) };
  if (API_KEY) {
    urlStr += `?key=${API_KEY}`;
  } else {
    const token = await getAccessToken();
    if (!token) throw new Error('No access token available; set GEMINI_API_KEY or run gcloud auth application-default login');
    headers['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = { hostname: url.hostname, path: url.pathname + url.search, method: 'POST', headers };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        try {
          const json = JSON.parse(raw);
          if (json.error) return reject(new Error(`API error (${voiceName}): ${json.error.message}`));
          const audioPart = json.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (!audioPart) return reject(new Error(`No audio in response for ${voiceName}`));
          resolve(Buffer.from(audioPart.data, 'base64'));
        } catch (e) { reject(new Error(`Parse error (${voiceName}): ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(60000, () => { req.abort(); reject(new Error('TTS request timed out')); });
    req.write(body);
    req.end();
  });
}

function generateSilence(seconds) {
  const numSamples = Math.floor(SAMPLE_RATE * seconds * CHANNELS);
  return Buffer.alloc(numSamples * (BITS_PER_SAMPLE / 8));
}

function writeWav(filepath, pcmBuffer) {
  const byteRate = SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8);
  const blockAlign = CHANNELS * (BITS_PER_SAMPLE / 8);
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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const scriptPath = path.join(__dirname, 'scripts', 'ep00-welcome.txt');
  const outDir = path.join(__dirname, 'audio');
  const outPath = path.join(outDir, 'ep00-welcome.wav');

  fs.mkdirSync(outDir, { recursive: true });

  const scriptText = fs.readFileSync(scriptPath, 'utf8');
  const segments = parseScript(scriptText);

  console.log(`Parsed ${segments.length} segments from ep00-welcome.txt`);
  console.log(`Voices: Alex = ${VOICES.ALEX}, Jamie = ${VOICES.JAMIE}`);
  console.log('');

  const pcmParts = [];
  // Add a brief leading silence
  pcmParts.push(generateSilence(0.5));

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    if (seg.speaker === 'PAUSE') {
      process.stdout.write(`  [${i + 1}/${segments.length}] PAUSE (${PAUSE_SECONDS}s)\n`);
      pcmParts.push(generateSilence(PAUSE_SECONDS));
      continue;
    }

    const voice = VOICES[seg.speaker];
    const preview = seg.text.substring(0, 60).replace(/\n/g, ' ');
    process.stdout.write(`  [${i + 1}/${segments.length}] ${seg.speaker} (${voice}): "${preview}..." `);

    let retries = 3;
    while (retries > 0) {
      try {
        const pcm = await callGeminiTTS(seg.text, voice);
        const durationSec = (pcm.length / (SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8))).toFixed(1);
        console.log(`OK (${durationSec}s)`);
        pcmParts.push(pcm);
        // Add a short gap between speakers (0.6s)
        pcmParts.push(generateSilence(0.6));
        break;
      } catch (err) {
        retries--;
        if (retries > 0) {
          console.log(`RETRY (${err.message})`);
          await sleep(5000);
        } else {
          console.log(`FAILED: ${err.message}`);
        }
      }
    }

    // Delay between API calls to avoid rate limits
    await sleep(1500);
  }

  // Concatenate all PCM
  const fullPcm = Buffer.concat(pcmParts);
  const totalDuration = (fullPcm.length / (SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8))).toFixed(1);

  writeWav(outPath, fullPcm);

  const fileSizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log('');
  console.log(`Episode 0 generated: ${outPath}`);
  console.log(`Duration: ${totalDuration}s (~${(totalDuration / 60).toFixed(1)} min)`);
  console.log(`File size: ${fileSizeMB} MB`);
}

main().catch(console.error);
