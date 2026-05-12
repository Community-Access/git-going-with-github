#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const podcastsDir = __dirname;
const segmentsBase = path.join(podcastsDir, 'audio', 'segments');
const report = { generatedTxts: 0, episodes: {}, summary: {} };

if (!fs.existsSync(segmentsBase)) {
  console.error('No segments directory found at', segmentsBase);
  process.exit(1);
}

const episodeDirs = fs.readdirSync(segmentsBase).filter(d => {
  const p = path.join(segmentsBase, d);
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
});

for (const ep of episodeDirs) {
  const epDir = path.join(segmentsBase, ep);
  const manifestPath = path.join(epDir, 'manifest.json');
  const epReport = { total: 0, txtCreated: 0, missingFiles: [], missingSeqs: [], pauses: 0 };
  if (!fs.existsSync(manifestPath)) {
    epReport.error = 'manifest.json missing';
    report.episodes[ep] = epReport;
    continue;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    epReport.error = 'manifest.json parse error';
    report.episodes[ep] = epReport;
    continue;
  }

  epReport.total = manifest.length;
  const seqs = manifest.map(m => Number(m.seq)).filter(n => Number.isFinite(n)).sort((a,b)=>a-b);
  if (seqs.length) {
    const min = seqs[0], max = seqs[seqs.length-1];
    for (let s=min; s<=max; s++) if (!seqs.includes(s)) epReport.missingSeqs.push(s);
  }

  for (const entry of manifest) {
    if (!entry.text) { epReport.pauses++; continue; }
    const filename = entry.filename || (`seg${String(entry.seq).padStart(3,'0')}-${entry.speaker.toLowerCase()}.wav`);
    const wavPath = path.join(epDir, filename);
    if (!fs.existsSync(wavPath)) epReport.missingFiles.push(filename);

    const txtName = filename.replace(/\.wav$/i, '.txt');
    const txtPath = path.join(epDir, txtName);
    if (!fs.existsSync(txtPath)) {
      try {
        fs.writeFileSync(txtPath, entry.text, 'utf8');
        epReport.txtCreated++;
        report.generatedTxts++;
      } catch (e) {
        // record but continue
        (epReport.writeErrors || (epReport.writeErrors=[])).push({ file: txtName, error: e.message });
      }
    }
  }

  report.episodes[ep] = epReport;
}

// summarize
const episodes = Object.keys(report.episodes);
let episodesWithMissing = 0, totalMissingFiles = 0, totalMissingSeqs = 0;
for (const ep of episodes) {
  const r = report.episodes[ep];
  if (r.missingFiles && r.missingFiles.length) { episodesWithMissing++; totalMissingFiles += r.missingFiles.length; }
  if (r.missingSeqs && r.missingSeqs.length) totalMissingSeqs += r.missingSeqs.length;
}

report.summary.episodesProcessed = episodes.length;
report.summary.generatedTxts = report.generatedTxts;
report.summary.episodesWithMissingFiles = episodesWithMissing;
report.summary.totalMissingFiles = totalMissingFiles;
report.summary.totalMissingSeqs = totalMissingSeqs;

const outPath = path.join(podcastsDir, 'audio', 'gaps-report.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');

console.log('Processed', report.summary.episodesProcessed, 'episodes');
console.log('Created', report.summary.generatedTxts, 'segment .txt files');
console.log('Episodes with missing audio files:', report.summary.episodesWithMissingFiles, 'total missing files:', report.summary.totalMissingFiles);
console.log('Total missing seq numbers detected:', report.summary.totalMissingSeqs);
console.log('Gaps report written to', outPath);

process.exit(0);
