const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function checkEpisode(slug) {
  const tPath = path.join(__dirname, 'transcripts', `${slug}-segments.json`);
  const mPath = path.join(__dirname, 'audio', 'segments', slug, 'manifest.json');
  if (!fs.existsSync(tPath)) return { error: 'missing-transcript' };
  if (!fs.existsSync(mPath)) return { error: 'missing-manifest' };
  const trans = JSON.parse(fs.readFileSync(tPath, 'utf8'));
  const man = JSON.parse(fs.readFileSync(mPath, 'utf8'));
  const report = { slug, transcriptCount: trans.length, manifestCount: man.length, issues: [] };
  if (trans.length !== man.length) report.issues.push('count-mismatch');
  for (let i = 0; i < man.length; i++) {
    const m = man[i];
    if (m.seq !== i + 1) report.issues.push(`seq-mismatch at index ${i}: ${m.seq} != ${i+1}`);
    if (m.filename) {
      const fp = path.join(__dirname, 'audio', 'segments', slug, m.filename);
      if (!fs.existsSync(fp)) {
        report.issues.push(`missing-file ${m.filename}`);
        continue;
      }
      try {
        const buf = fs.readFileSync(fp);
        let pcm = buf;
        if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WAVE') {
          pcm = buf.subarray(44);
        }
        const hash = crypto.createHash('sha256').update(pcm).digest('hex');
        if (m.sha256 && m.sha256 !== hash) report.issues.push(`sha-mismatch ${m.filename} (manifest ${m.sha256} != actual ${hash})`);
      } catch (e) {
        report.issues.push(`read-error ${m.filename} ${e.message}`);
      }
    }
  }
  return report;
}

const slug = process.argv[2] || 'ep05-working-with-issues';
checkEpisode(slug).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(e); process.exit(1); });
