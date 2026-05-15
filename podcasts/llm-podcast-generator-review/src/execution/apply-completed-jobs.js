#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JobLedger } = require('./job-ledger');
const { JOB_STATUS } = require('./constants');
const { parseModelResult, parseSegments } = require('../generate-teaching-transcript');
const { evaluateTranscript } = require('../../../tools/agentic-pilot/evaluate-transcript');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const REVIEW_DIR = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review');
const DB_PATH = path.join(REVIEW_DIR, 'generated', 'execution', 'ai_jobs.sqlite');
const OUTPUT_DIR = path.join(REVIEW_DIR, 'generated', 'execution', 'applied');
const PUBLISH_SCRIPT = path.join(REVIEW_DIR, 'src', 'publish-candidate.js');

function parseArgs(argv) {
  const args = { onlyUnapplied: true };
  for (const token of argv) {
    if (token === '--all') args.onlyUnapplied = false;
  }
  return args;
}

function runNode(args) {
  execFileSync(process.execPath, args, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8'
  });
}

function extractResponseContent(resultRow) {
  if (!resultRow || !resultRow.response_body) return '';
  const parsed = JSON.parse(resultRow.response_body);
  const body = parsed.response && parsed.response.body ? parsed.response.body : parsed;
  return body && body.choices && body.choices[0] && body.choices[0].message ? (body.choices[0].message.content || '') : '';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const ledger = new JobLedger(DB_PATH);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const completedJobs = ledger.listJobsByStatus([JOB_STATUS.COMPLETED]);
  let applied = 0;
  let skipped = 0;
  const failures = [];

  for (const job of completedJobs) {
    const markerPath = path.join(OUTPUT_DIR, `${job.job_id}.applied`);
    if (args.onlyUnapplied && fs.existsSync(markerPath)) continue;
    const slug = job.source_record_id;
    try {
      const resultRow = ledger.getResultByJobId(job.job_id);
      const content = extractResponseContent(resultRow);
      if (!content) {
        skipped += 1;
        continue;
      }
      const parsed = parseModelResult(content);
      const packetPath = job.source_file;
      const packet = JSON.parse(fs.readFileSync(packetPath, 'utf8'));
      const sourceEntries = (packet.sourceFiles || []).map(source => {
        const absolute = path.isAbsolute(source.path) ? source.path : path.join(ROOT, source.path);
        return {
          sourcePath: absolute,
          sourceLabel: path.basename(absolute),
          exists: fs.existsSync(absolute),
          content: fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '',
          concepts: []
        };
      });
      const transcript = parsed.script || '';
      const segments = parseSegments(transcript);
      const evaluation = evaluateTranscript({
        transcriptPath: `${slug}.batch.candidate`,
        transcript,
        sources: sourceEntries,
        concepts: packet.concepts || []
      });
      const candidatePath = path.join(OUTPUT_DIR, `${slug}.candidate.json`);
      const payload = {
        generatedAt: new Date().toISOString(),
        slug,
        model: job.model,
        provider: 'batch',
        script: transcript,
        segments,
        chapters: parsed.chapters || [],
        coverageNotes: parsed.coverageNotes || [],
        parseMode: parsed.parseMode,
        evaluation,
        repairAttempted: false,
        repairSucceeded: false,
        repairPasses: 0,
        usage: null
      };
      fs.writeFileSync(candidatePath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
      runNode([PUBLISH_SCRIPT, '--slug', slug, '--candidate', candidatePath, '--write-live']);
      fs.writeFileSync(markerPath, new Date().toISOString(), 'utf8');
      applied += 1;
    } catch (error) {
      failures.push({
        slug,
        jobId: job.job_id,
        error: error && error.message ? error.message : String(error)
      });
      console.warn(`[WARN] Skipped apply for ${slug} (${job.job_id}): ${error.message || error}`);
    }
  }

  console.log(`Applied completed jobs to live scripts: ${applied}`);
  if (skipped > 0) console.log(`Skipped jobs with empty result payload: ${skipped}`);
  if (failures.length) {
    console.log(`Skipped jobs with parse/publish errors: ${failures.length}`);
    failures.forEach(item => {
      console.log(`- ${item.slug} (${item.jobId}): ${item.error}`);
    });
  }
  ledger.close();
}

if (require.main === module) {
  main();
}
