#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const BYTES_PER_SAMPLE = BITS_PER_SAMPLE / 8;
// default pause length in milliseconds; can be overridden via CLI
let DEFAULT_MS = 300;

// parse CLI args: --default-ms N or -m N
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--default-ms' || a === '-m') {
    const v = argv[i+1];
    if (v && !isNaN(Number(v))) {
      DEFAULT_MS = Math.max(0, parseInt(v, 10));
      i++;
    }
  }
}

function sha256(buf){ return crypto.createHash('sha256').update(buf).digest('hex'); }

function writeWav(filepath, pcmBuffer){
  const byteRate = SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE;
  const blockAlign = CHANNELS * BYTES_PER_SAMPLE;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF',0); header.writeUInt32LE(36+dataSize,4); header.write('WAVE',8);
  header.write('fmt ',12); header.writeUInt32LE(16,16); header.writeUInt16LE(1,20);
  header.writeUInt16LE(CHANNELS,22); header.writeUInt32LE(SAMPLE_RATE,24);
  header.writeUInt32LE(byteRate,28); header.writeUInt16LE(blockAlign,32); header.writeUInt16LE(BITS_PER_SAMPLE,34);
  header.write('data',36); header.writeUInt32LE(dataSize,40);
  fs.writeFileSync(filepath, Buffer.concat([header, pcmBuffer]));
}

const podcastsDir = __dirname;
const segmentsBase = path.join(podcastsDir, 'audio', 'segments');
if (!fs.existsSync(segmentsBase)) { console.error('No segments dir'); process.exit(1); }

const eps = fs.readdirSync(segmentsBase).filter(d=>fs.statSync(path.join(segmentsBase,d)).isDirectory());
let totalSilences = 0;

for (const ep of eps){
  const epDir = path.join(segmentsBase, ep);
  const manifestPath = path.join(epDir,'manifest.json');
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  let changed = false;
  for (const entry of manifest){
    // treat entries with no filename and no text as a pause to fill
    if ((!entry.filename || entry.filename.trim()==='') && (!entry.text || entry.text.trim()==='')){
      const ms = entry.pauseMs || DEFAULT_MS;
      const samples = Math.max(1, Math.round((ms/1000)*SAMPLE_RATE));
      const pcm = Buffer.alloc(samples * BYTES_PER_SAMPLE, 0);
      const filename = `seg${String(entry.seq).padStart(3,'0')}-pause.wav`;
      const tmp = path.join(epDir, filename + '.tmp');
      const final = path.join(epDir, filename);
      try{
        writeWav(tmp, pcm);
        fs.renameSync(tmp, final);
        entry.filename = filename;
        entry.status = 'pause';
        entry.duration = samples / SAMPLE_RATE;
        entry.sha256 = sha256(pcm);
        changed = true;
        totalSilences++;
      }catch(e){ console.error('write failed', ep, entry.seq, e.message); }
    }
  }
  if (changed) fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

console.log('Wrote', totalSilences, 'silence segments across', eps.length, 'episodes');
process.exit(0);
