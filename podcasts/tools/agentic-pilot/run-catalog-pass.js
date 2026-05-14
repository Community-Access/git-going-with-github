#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { episodes, resolveSourceName } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const { evaluateTranscript } = require('./evaluate-transcript');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const DOCS_DIR = path.join(ROOT, 'docs');
const SCRIPTS_DIR = path.join(PODCASTS_DIR, 'scripts');
const PILOT_DIR = path.join(PODCASTS_DIR, 'logs', 'agentic-pilots');
const CANDIDATES_DIR = path.join(PILOT_DIR, 'candidates');
const REPORTS_DIR = path.join(PILOT_DIR, 'reports');

function scriptPathForSlug(slug) {
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(SCRIPTS_DIR, group, `${slug}.txt`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(SCRIPTS_DIR, `${slug}.txt`);
}

function listTargets() {
  const companionTargets = episodes.map(episode => ({
    kind: 'companion',
    slug: `ep${String(episode.number).padStart(2, '0')}-${episode.slug}`,
    title: `Episode ${episode.number}: ${episode.title}`,
    concepts: Array.isArray(episode.concepts) ? episode.concepts : [],
    sourceFiles: (episode.sources || []).map(source => path.join(DOCS_DIR, resolveSourceName(source)))
  }));

  const challengeTargets = challenges.map(challenge => ({
    kind: 'challenge',
    slug: `cc-${challenge.id}-${challenge.slug}`,
    title: `Challenge ${challenge.id}: ${challenge.title}`,
    concepts: [challenge.focus || '', `Challenge title: ${challenge.title}`].filter(Boolean),
    sourceFiles: [
      path.join(ROOT, challenge.template),
      path.join(ROOT, challenge.solution),
      ...(challenge.chapters || []).map(file => path.join(ROOT, file))
    ]
  }));

  return [...companionTargets, ...challengeTargets];
}

function latestCandidatePath(slug) {
  const slugDir = path.join(CANDIDATES_DIR, slug);
  if (!fs.existsSync(slugDir)) return null;
  const candidates = fs.readdirSync(slugDir)
    .filter(fileName => /^attempt-\d{3}\.txt$/.test(fileName))
    .sort();
  if (!candidates.length) return null;
  return path.join(slugDir, candidates[candidates.length - 1]);
}

function evaluateVersion(target, transcriptPath) {
  if (!fs.existsSync(transcriptPath)) return null;
  const transcript = fs.readFileSync(transcriptPath, 'utf8');
  return evaluateTranscript({
    transcript,
    transcriptPath,
    sources: target.sourceFiles.map(sourcePath => ({
      sourcePath,
      sourceLabel: path.basename(sourcePath),
      exists: fs.existsSync(sourcePath),
      content: fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, 'utf8') : '',
      concepts: []
    })),
    concepts: target.concepts
  });
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n', 'utf8');
}

function repetitionScore(report) {
  if (!report) return 0;
  return report.repeatedLongLines.length
    + report.repeatedOpeners.length
    + report.repeatedClosers.length
    + report.repeatedStarts.length;
}

function main() {
  const targets = listTargets();
  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const perEpisode = [];
  const failures = [];
  const aggregate = {
    heading: { covered: 0, partial: 0, missing: 0, total: 0 },
    concept: { covered: 0, partial: 0, missing: 0, total: 0 }
  };
  let totalWordsBefore = 0;
  let totalWordsAfter = 0;
  let repetitionBefore = 0;
  let repetitionAfter = 0;
  let candidateCompared = 0;
  let candidatePromotable = 0;
  let passCount = 0;
  let failCount = 0;

  for (const target of targets) {
    const livePath = scriptPathForSlug(target.slug);
    const candidatePath = latestCandidatePath(target.slug);
    const beforeReport = evaluateVersion(target, livePath);
    const afterReport = candidatePath ? evaluateVersion(target, candidatePath) : beforeReport;

    if (!beforeReport) {
      failCount += 1;
      failures.push({
        slug: target.slug,
        reason: 'missing-live-script',
        path: livePath
      });
      continue;
    }

    if (candidatePath) {
      candidateCompared += 1;
      if (afterReport && afterReport.gates.pass) candidatePromotable += 1;
    }

    const finalReport = afterReport || beforeReport;
    totalWordsBefore += beforeReport.transcriptWords;
    totalWordsAfter += finalReport.transcriptWords;
    repetitionBefore += repetitionScore(beforeReport);
    repetitionAfter += repetitionScore(finalReport);

    aggregate.heading.covered += finalReport.headingCoverageSummary.covered;
    aggregate.heading.partial += finalReport.headingCoverageSummary.partial;
    aggregate.heading.missing += finalReport.headingCoverageSummary.missing;
    aggregate.heading.total += finalReport.headingCoverageSummary.total;
    aggregate.concept.covered += finalReport.conceptCoverageSummary.covered;
    aggregate.concept.partial += finalReport.conceptCoverageSummary.partial;
    aggregate.concept.missing += finalReport.conceptCoverageSummary.missing;
    aggregate.concept.total += finalReport.conceptCoverageSummary.total;

    const gatePass = finalReport.gates.pass;
    if (gatePass) passCount += 1;
    else {
      failCount += 1;
      failures.push({
        slug: target.slug,
        reason: 'quality-gates-failed',
        failureReasons: finalReport.gates.failureReasons,
        missingSourceFiles: finalReport.missingSourceFiles
      });
    }

    const coveragePath = path.join(REPORTS_DIR, `${target.slug}.coverage.json`);
    writeJson(coveragePath, {
      slug: target.slug,
      title: target.title,
      kind: target.kind,
      comparedCandidate: Boolean(candidatePath),
      liveTranscriptPath: beforeReport.transcriptPath,
      selectedTranscriptPath: finalReport.transcriptPath,
      headingCoverageSummary: finalReport.headingCoverageSummary,
      conceptCoverageSummary: finalReport.conceptCoverageSummary,
      conceptCoverage: finalReport.conceptCoverage,
      sourceCoverage: finalReport.sourceCoverage,
      gates: finalReport.gates
    });

    perEpisode.push({
      slug: target.slug,
      kind: target.kind,
      comparedCandidate: Boolean(candidatePath),
      beforeWords: beforeReport.transcriptWords,
      afterWords: finalReport.transcriptWords,
      beforeRepetition: repetitionScore(beforeReport),
      afterRepetition: repetitionScore(finalReport),
      gates: finalReport.gates
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    processed: targets.length,
    passCount,
    failCount,
    candidateCompared,
    candidatePromotable,
    coverage: {
      heading: aggregate.heading,
      concept: aggregate.concept
    },
    repetition: {
      before: repetitionBefore,
      after: repetitionAfter,
      delta: repetitionAfter - repetitionBefore
    },
    length: {
      wordsBefore: totalWordsBefore,
      wordsAfter: totalWordsAfter,
      deltaWords: totalWordsAfter - totalWordsBefore
    },
    failuresNeedingManualFollowUp: failures,
    perEpisode
  };

  const outPath = path.join(REPORTS_DIR, 'catalog-pass.json');
  writeJson(outPath, summary);
  console.log(`Catalog pass complete. Wrote report: ${outPath}`);
  console.log(`Processed: ${summary.processed}, Passed: ${summary.passCount}, Failed: ${summary.failCount}`);
}

if (require.main === module) {
  main();
}
