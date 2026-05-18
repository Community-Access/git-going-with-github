const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { challenges } = require('../../../podcasts/build-challenge-bundles');

const repoRoot = path.resolve(__dirname, '../../../');
const templatesDir = path.join(repoRoot, 'learning-room/.github/ISSUE_TEMPLATE');
const challengeHubPath = path.join(repoRoot, 'docs/CHALLENGES.md');
const humanMatrixPath = path.join(repoRoot, 'classroom/HUMAN_TEST_MATRIX.md');
const facilitatorGuidePath = path.join(repoRoot, 'admin/FACILITATOR_GUIDE.md');
const learningRoomSolutionsIndexPath = path.join(repoRoot, 'learning-room/docs/solutions/README.md');
const skillsBonusScenariosPath = path.join(repoRoot, 'learning-room/docs/skills-bonus-scenarios.md');
const learningRoomRoadmapPath = path.join(repoRoot, 'learning-room/docs/course-roadmap.md');
const learningRoomReadmePath = path.join(repoRoot, 'learning-room/README.md');
const studentGuidePath = path.join(repoRoot, 'learning-room/.github/STUDENT_GUIDE.md');
const startHereTemplatePath = path.join(repoRoot, 'learning-room/.github/ISSUE_TEMPLATE/start-here-roadmap.yml');
const assignmentDay1Path = path.join(repoRoot, 'classroom/assignment-day1-you-belong-here.md');
const assignmentDay2Path = path.join(repoRoot, 'classroom/assignment-day2-you-can-build-this.md');
const podcastScriptsDir = path.join(repoRoot, 'podcasts/scripts');

function getChallengeTemplateFiles() {
  return fs
    .readdirSync(templatesDir)
    .filter(name => /^challenge-\d{2}-.+\.yml$/.test(name) || /^bonus-[a-e]-.+\.yml$/.test(name))
    .sort();
}

function readTemplate(fileName) {
  return fs.readFileSync(path.join(templatesDir, fileName), 'utf8');
}

function parseQuotedField(content, fieldName) {
  const match = content.match(new RegExp(`^${fieldName}:\\s*"([^"]+)"`, 'm'));
  return match ? match[1] : null;
}

function getCanonicalChallengeTitles() {
  return getChallengeTemplateFiles().map(fileName => {
    const content = readTemplate(fileName);
    const name = parseQuotedField(content, 'name');
    assert.ok(name, `${fileName}: missing canonical name field`);
    return { fileName, title: name, content };
  });
}

function titleVariants(title) {
  const variants = new Set([title]);
  const challengePrefix = title.match(/^Challenge\s+(\d+):\s+(.+)$/i);
  if (challengePrefix) {
    variants.add(challengePrefix[2]);
    variants.add(`${challengePrefix[1]}. ${challengePrefix[2]}`);
  }

  if (/pull request/i.test(title)) {
    variants.add(title.replace(/pull request/gi, 'PR'));
  }
  if (/\bPR\b/.test(title)) {
    variants.add(title.replace(/\bPR\b/g, 'Pull Request'));
  }

  variants.add(title.replace(/\s*\(Capstone\)/i, '').trim());

  return Array.from(variants);
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertContainsAnyTitleVariant(targetText, fileName, title, targetLabel) {
  const variants = titleVariants(title);
  const found = variants.some(variant => new RegExp(escapeRegex(variant)).test(targetText));
  assert.equal(found, true, `${fileName}: title missing from ${targetLabel}`);
}

function assertCanonicalTitlesInDocument(documentPath, targetLabel, challengeNumberPattern) {
  const content = fs.readFileSync(documentPath, 'utf8');
  const titles = getCanonicalChallengeTitles().filter(({ fileName }) => challengeNumberPattern.test(fileName));

  titles.forEach(({ fileName, title }) => {
    assertContainsAnyTitleVariant(content, fileName, title, targetLabel);
  });
}

test('classroom assignment docs use canonical challenge titles', () => {
  assertCanonicalTitlesInDocument(assignmentDay1Path, 'classroom/assignment-day1-you-belong-here.md', /^challenge-0[1-9]-/);
  assertCanonicalTitlesInDocument(assignmentDay2Path, 'classroom/assignment-day2-you-can-build-this.md', /^challenge-(1[0-6])-/);
});

test('challenge coach catalog titles match canonical issue templates', () => {
  const canonicalByTemplate = new Map(
    getCanonicalChallengeTitles().map(({ fileName, title }) => [fileName, title.replace(/^Challenge\s+\d+:\s*/, '')])
  );

  challenges
    .filter(challenge => /^\d+$/.test(challenge.id))
    .forEach(challenge => {
      const templateName = path.basename(challenge.template);
      assert.equal(
        challenge.title,
        canonicalByTemplate.get(templateName),
        `${templateName}: podcast Challenge Coach title should match canonical template name`
      );
    });
});

test('generated podcast scripts avoid stale boilerplate', () => {
  if (!fs.existsSync(podcastScriptsDir)) return;

  const bannedFragments = [
    'as if we are standing together in a classroom',
    'not just memorizing clicks',
    'GitHub work is not magic',
    'Listen before reading to preview the concepts',
    'preview or review the key concepts',
    'Episode coming soon'
  ];

  function collectTxtFiles(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...collectTxtFiles(fullPath));
      } else if (entry.name.endsWith('.txt')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const scriptFiles = collectTxtFiles(podcastScriptsDir);
  assert.ok(scriptFiles.length > 0, 'podcasts/scripts should contain generated script files');

  scriptFiles.forEach(filePath => {
    const script = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(podcastScriptsDir, filePath);
    bannedFragments.forEach(fragment => {
      assert.equal(
        script.includes(fragment),
        false,
        `${fileName}: remove stale generated phrase: ${fragment}`
      );
    });
  });
});

test('challenge hub contains all canonical challenge and bonus titles', () => {
  const hub = fs.readFileSync(challengeHubPath, 'utf8');
  const titles = getCanonicalChallengeTitles();

  titles.forEach(({ fileName, title }) => {
    assertContainsAnyTitleVariant(hub, fileName, title, 'docs/CHALLENGES.md');
  });

  assert.match(hub, /16 core challenges and 5 bonus challenges/i, 'Challenge Hub should declare 16 core + 5 bonus');
});

test('human test matrix contains all canonical challenge and bonus titles', () => {
  const matrix = fs.readFileSync(humanMatrixPath, 'utf8');
  const titles = getCanonicalChallengeTitles();

  titles.forEach(({ fileName, title }) => {
    assertContainsAnyTitleVariant(matrix, fileName, title, 'classroom/HUMAN_TEST_MATRIX.md');
  });
});

test('facilitator guide progression map aligns with challenge model', () => {
  const guide = fs.readFileSync(facilitatorGuidePath, 'utf8');

  const requiredSnippets = [
    "There it is! Challenge 2 just appeared. That's how progression works.",
    'Challenge 10 is waiting for you.',
    '| **Core** | 10-13 |',
    '| **Advanced** | 14-16 |',
    '| **Bonus** | bonus-a through bonus-e |',
    'The progression bot unlocks them when challenges are closed.'
  ];

  requiredSnippets.forEach(snippet => {
    assert.match(
      guide,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      `facilitator guide missing expected progression snippet: ${snippet}`
    );
  });
});

test('all challenge templates reference valid local solution files', () => {
  const titles = getCanonicalChallengeTitles();

  titles.forEach(({ fileName, content }) => {
    const solutionMatches = content.match(/solution-[a-z0-9-]+\.md/gi) || [];
    assert.ok(solutionMatches.length > 0, `${fileName}: no solution link found`);

    solutionMatches.forEach(solutionFile => {
      const localSolutionPath = path.join(repoRoot, 'docs/solutions', solutionFile);
      assert.equal(
        fs.existsSync(localSolutionPath),
        true,
        `${fileName}: solution target missing at docs/solutions/${solutionFile}`
      );
    });
  });
});

test('learning-room solutions index exists and documents all challenge references', () => {
  assert.equal(fs.existsSync(learningRoomSolutionsIndexPath), true, 'Missing learning-room/docs/solutions/README.md');

  const content = fs.readFileSync(learningRoomSolutionsIndexPath, 'utf8');
  assert.match(content, /## Core Challenges \(1-16\)/, 'Solutions index should include core challenge section');
  assert.match(content, /## Bonus Challenges \(A-E\)/, 'Solutions index should include bonus challenge section');

  const titles = getCanonicalChallengeTitles();
  titles.forEach(({ fileName, title }) => {
    assertContainsAnyTitleVariant(content, fileName, title, 'learning-room/docs/solutions/README.md');
  });
});

test('skills-inspired bonus scenarios doc includes source attribution', () => {
  assert.equal(fs.existsSync(skillsBonusScenariosPath), true, 'Missing learning-room/docs/skills-bonus-scenarios.md');

  const content = fs.readFileSync(skillsBonusScenariosPath, 'utf8');
  const requiredSources = [
    'https://skills.github.com/quickstart',
    'https://github.com/skills/introduction-to-github',
    'https://github.com/skills/review-pull-requests',
    'https://github.com/skills/resolve-merge-conflicts'
  ];

  requiredSources.forEach(sourceUrl => {
    assert.match(
      content,
      new RegExp(escapeRegex(sourceUrl)),
      `skills-bonus-scenarios.md missing source URL: ${sourceUrl}`
    );
  });
});

test('course roadmap exists and includes full student path guidance', () => {
  assert.equal(fs.existsSync(learningRoomRoadmapPath), true, 'Missing learning-room/docs/course-roadmap.md');

  const content = fs.readFileSync(learningRoomRoadmapPath, 'utf8');
  const requiredSnippets = [
    '## Day 1 Path (Challenges 1-9)',
    '## Day 2 Path (Challenges 10-16)',
    '## Bonus Path (A-E)',
    'Challenge 16: Capstone Project',
    'After Challenge 15, the path branches',
    'Challenge Hub'
  ];

  requiredSnippets.forEach(snippet => {
    assert.match(
      content,
      new RegExp(escapeRegex(snippet)),
      `course-roadmap.md missing expected content: ${snippet}`
    );
  });
});

test('learning-room entry points link to the course roadmap', () => {
  const readme = fs.readFileSync(learningRoomReadmePath, 'utf8');
  const studentGuide = fs.readFileSync(studentGuidePath, 'utf8');

  assert.match(
    readme,
    /\[\*\*Follow the Full Course Roadmap →\*\*\]\(docs\/course-roadmap\.md\)/,
    'learning-room/README.md should link to course roadmap'
  );

  assert.match(
    readme,
    /\[\*\*View Available Challenges →\*\*\]\(\.\.\/docs\/CHALLENGES\.md\)/,
    'learning-room/README.md should link to canonical challenge hub path'
  );

  assert.match(
    studentGuide,
    /\[Course Roadmap\]\(\.\.\/docs\/course-roadmap\.md\)/,
    'learning-room/.github/STUDENT_GUIDE.md should link to course roadmap'
  );
});

test('start-here issue template exists and points to roadmap resources', () => {
  assert.equal(fs.existsSync(startHereTemplatePath), true, 'Missing learning-room/.github/ISSUE_TEMPLATE/start-here-roadmap.yml');

  const content = fs.readFileSync(startHereTemplatePath, 'utf8');
  const requiredReferences = [
    'Start Here: Student Course Roadmap',
    'https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/docs/course-roadmap.md',
    'https://github.com/Community-Access/git-going-with-github/blob/main/docs/CHALLENGES.md',
    'https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/docs/solutions/README.md',
    'https://github.com/Community-Access/git-going-with-github/blob/main/learning-room/.github/STUDENT_GUIDE.md'
  ];

  requiredReferences.forEach(text => {
    assert.match(
      content,
      new RegExp(escapeRegex(text)),
      `start-here-roadmap.yml missing required reference: ${text}`
    );
  });
});
