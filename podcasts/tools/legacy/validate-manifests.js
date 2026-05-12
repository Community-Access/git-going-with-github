const fs = require('fs');
const path = require('path');

function checkEpisode(scriptFile) {
  const scriptsDir = path.join(__dirname, 'scripts');
  const audioSegDir = path.join(__dirname, 'audio', 'segments');
  const scriptPath = path.join(scriptsDir, scriptFile);
  const slug = scriptFile.replace('.txt', '');
  const segDir = path.join(audioSegDir, slug);
  const transcriptPath = path.join(__dirname, 'transcripts', `${slug}-segments.json`);
  const manifestPath = path.join(segDir, 'manifest.json');

  const result = { script: scriptFile, manifest: false, transcript: false, issues: [] };

  if (!fs.existsSync(transcriptPath)) {
    result.issues.push('missing transcript segments');
  } else {
    result.transcript = true;
    const segments = JSON.parse(fs.readFileSync(transcriptPath, 'utf8'));
    result.transcriptCount = segments.length;
  }

  if (!fs.existsSync(manifestPath)) {
    result.issues.push('missing manifest');
  } else {
    result.manifest = true;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    result.manifestCount = manifest.length;
    // check seq continuity and file existence
    for (let i = 0; i < manifest.length; i++) {
      const m = manifest[i];
      const expected = i + 1;
      if (m.seq !== expected) result.issues.push(`seq mismatch at index ${i}: ${m.seq} != ${expected}`);
      if (m.filename) {
        const fpath = path.join(segDir, m.filename);
        if (!fs.existsSync(fpath)) result.issues.push(`missing file ${m.filename}`);
      }
      if (m.status === 'failed') result.issues.push(`failed segment seq ${m.seq}`);
    }
  }
  return result;
}

function main() {
  const scriptsDir = path.join(__dirname, 'scripts');
  const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.match(/^ep\d{2}-.+\.txt$/)).sort();
  const report = [];
  for (const sf of scriptFiles) {
    report.push(checkEpisode(sf));
  }
  const summary = { total: report.length, problems: 0 };
  for (const r of report) {
    if (r.issues.length > 0) summary.problems++;
  }
  console.log(JSON.stringify({ summary, report }, null, 2));
}

main();
