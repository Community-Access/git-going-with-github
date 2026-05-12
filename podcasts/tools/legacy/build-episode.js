#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;
const BYTES_PER_SAMPLE = BITS_PER_SAMPLE / 8;

function sha256(buf){ return crypto.createHash('sha256').update(buf).digest('hex'); }

function stripWavHeader(buf){
  if (buf.length > 12 && buf.toString('ascii',0,4) === 'RIFF' && buf.toString('ascii',8,12) === 'WAVE'){
    return buf.subarray(44);
  }
  return buf;
}

function writeWav(filepath, pcmBuffer){
  const byteRate = SAMPLE_RATE * CHANNELS * BYTES_PER_SAMPLE;
  const blockAlign = CHANNELS * BYTES_PER_SAMPLE;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF',0); header.writeUInt32LE(36 + dataSize, 4); header.write('WAVE',8);
  header.write('fmt ',12); header.writeUInt32LE(16,16); header.writeUInt16LE(1,20);
  header.writeUInt16LE(CHANNELS,22); header.writeUInt32LE(SAMPLE_RATE,24);
  header.writeUInt32LE(byteRate,28); header.writeUInt16LE(blockAlign,32); header.writeUInt16LE(BITS_PER_SAMPLE,34);
  header.write('data',36); header.writeUInt32LE(dataSize,40);
  fs.writeFileSync(filepath, Buffer.concat([header, pcmBuffer]));
}

const { execFileSync } = require('child_process');

async function main(){
  const argv = process.argv.slice(2);
  const slug = argv[0];
  const resume = argv.includes('--resume') || argv.includes('-r');
  if (!slug){
    console.error('Usage: node build-episode.js <episode-slug>');
    process.exit(1);
  }
  const base = __dirname;
  const manifestPath = path.join(base, 'audio', 'segments', slug, 'manifest.json');
  if (!fs.existsSync(manifestPath)){
    console.error('manifest not found for', slug);
    process.exit(2);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  const logPath = path.join(base, 'audio', 'segments', slug, 'process.log');
  function writeLog(line){ try { fs.appendFileSync(logPath, new Date().toISOString() + ' ' + line + '\n'); } catch(e){} }

  const problems = [];
  const pcmParts = [];
  let totalSamples = 0;

  for (const entry of manifest){
    if (!entry.filename){
      problems.push(`missing-filename seq ${entry.seq}`);
      continue;
    }
    const filePath = path.join(base, 'audio', 'segments', slug, entry.filename);
    if (!fs.existsSync(filePath)){
      problems.push(`missing-file ${entry.filename}`);
      continue;
    }
    let buf;
    try { buf = fs.readFileSync(filePath); } catch (e){ problems.push(`read-error ${entry.filename} ${e.message}`); continue; }
    const pcm = stripWavHeader(buf);
    const h = sha256(pcm);
    if (entry.sha256 && entry.sha256 !== h) problems.push(`sha-mismatch ${entry.filename}`);
    pcmParts.push(pcm);
    totalSamples += Math.floor(pcm.length / BYTES_PER_SAMPLE);
  }

  if (problems.length){
    console.error('Found problems:', problems.slice(0,10));
    writeLog(`found problems: ${problems.slice(0,10).join('; ')}`);
    if (resume){
      console.log('Attempting to resume: synthesizing missing/invalid segments for', slug);
      try{
        execFileSync('node', [path.join(__dirname, 'synthesize-episode.js'), slug], { cwd: __dirname, stdio: 'inherit' });
      } catch (e){
        console.error('Auto-synthesis failed:', e.message || e);
        writeLog(`auto-synthesis-failed ${e && e.message ? e.message : e}`);
        process.exit(4);
      }
      // re-run verification after repair
      return main();
    }
    console.error(JSON.stringify({ slug, manifestCount: manifest.length, problems }, null, 2));
    writeLog(`verification failed; problems: ${JSON.stringify(problems)}`);
    process.exit(3);
  }

  const outDir = path.join(base, 'audio');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outName = `ep-${slug}.wav`; // deterministic name
  const tmpPath = path.join(outDir, outName + '.tmp');
  const finalPath = path.join(outDir, outName);

  const finalPcm = Buffer.concat(pcmParts);
  writeWav(tmpPath, finalPcm);
  fs.renameSync(tmpPath, finalPath);
  writeLog(`built episode ${finalPath} duration=${duration} sha=${finalSha}`);

  const duration = totalSamples / SAMPLE_RATE;
  const finalSha = sha256(finalPcm);
  const report = { slug, manifestCount: manifest.length, output: finalPath, duration, sha256: finalSha };
  console.log(JSON.stringify(report, null, 2));
}

main();
