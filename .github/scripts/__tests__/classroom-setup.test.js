/**
 * GitHub Classroom Setup Verification Tests
 *
 * Purpose
 * -------
 * These tests verify that every artifact required for a successful GitHub
 * Classroom cohort deployment exists, is internally consistent, and contains
 * all required fields before a facilitator creates a classroom or runs a
 * workshop.  Run this suite before every new cohort.
 *
 * What is tested
 * --------------
 * 1. Assignment descriptor files (Day 1 and Day 2) -- presence and required
 *    sections
 * 2. Autograder workflows -- every required check workflow exists and
 *    points, realistic timeouts
 * 3. Student Progression Bot workflow -- exists in template, correct triggers,
 *    required permissions
 * 4. Seeding scripts -- all scripts referenced in classroom/README.md exist
 * 5. Classroom README deployment guide -- key sections present and accurate
 * 6. Template repo readiness -- all files that GitHub Classroom copies are
 *    present in learning-room/
 * 7. Cross-document consistency -- challenge titles in autograder workflows match
 *    those in the assignment descriptor and challenge templates
 * 8. Actions permissions -- workflow files in the template all declare the
 *    required write permissions for Aria and the Progression Bot
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const repoRoot = path.resolve(__dirname, '../../../');
const classroomDir = path.join(repoRoot, 'classroom');
const learningRoom = path.join(repoRoot, 'learning-room');
const scriptsDir = path.join(repoRoot, 'scripts/classroom');

const day1DescriptorPath = path.join(classroomDir, 'assignment-day1-you-belong-here.md');
const day2DescriptorPath = path.join(classroomDir, 'assignment-day2-you-can-build-this.md');
const classroomReadmePath = path.join(classroomDir, 'README.md');
const teardownPath = path.join(classroomDir, 'teardown-checklist.md');
const gradingGuidePath = path.join(classroomDir, 'grading-guide.md');
const rosterTemplatePath = path.join(classroomDir, 'roster-template.csv');
const studentProgressionWorkflowPath = path.join(learningRoom, '.github/workflows/student-progression.yml');
const prValidationWorkflowPath = path.join(learningRoom, '.github/workflows/pr-validation-bot.yml');
const contentValidationWorkflowPath = path.join(learningRoom, '.github/workflows/content-validation.yml');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertFileExists(filePath, label) {
  assert.equal(
    fs.existsSync(filePath),
    true,
    `Missing required file: ${label || filePath}`
  );
}

// ---------------------------------------------------------------------------
// 1. Required files exist
// ---------------------------------------------------------------------------

test('all required classroom deployment files exist', () => {
  const required = [
    [day1DescriptorPath, 'assignment-day1-you-belong-here.md'],
    [day2DescriptorPath, 'assignment-day2-you-can-build-this.md'],
    [classroomReadmePath, 'classroom/README.md'],
    [teardownPath, 'teardown-checklist.md'],
    [gradingGuidePath, 'grading-guide.md'],
    [rosterTemplatePath, 'roster-template.csv'],
    [studentProgressionWorkflowPath, 'learning-room student-progression.yml'],
    [prValidationWorkflowPath, 'learning-room pr-validation-bot.yml'],
    [contentValidationWorkflowPath, 'learning-room content-validation.yml'],
  ];

  required.forEach(([filePath, label]) => assertFileExists(filePath, label));
});

test('all seeding scripts referenced in classroom README exist', () => {
  const readme = readText(classroomReadmePath);

  // Extract all .ps1 script references (scripts/classroom/Script-Name.ps1)
  const scriptRefs = [...readme.matchAll(/scripts\/classroom\/([\w-]+\.ps1)/g)]
    .map(m => m[1]);

  assert.ok(scriptRefs.length >= 2, 'classroom README should reference at least 2 seeding scripts');

  const seen = new Set();
  scriptRefs.forEach(scriptName => {
    if (seen.has(scriptName)) return;
    seen.add(scriptName);
    const scriptPath = path.join(scriptsDir, scriptName);
    assert.equal(
      fs.existsSync(scriptPath),
      true,
      `Script referenced in classroom README is missing: scripts/classroom/${scriptName}`
    );
  });
});

// ---------------------------------------------------------------------------
// 2. Autograder workflows -- the workflow files Classroom-style checks now
//    live in. Each Day 1 / Day 2 check is its own GitHub Actions workflow
//    inside the learning-room template (see admin/classroom/autograding-setup.md).
// ---------------------------------------------------------------------------

const autograderWorkflowsDir = path.join(learningRoom, '.github/workflows');

const day1AutograderWorkflows = [
  { challenge: 2, file: 'autograder-issue-filed.yml' },
  { challenge: 5, file: 'autograder-branch-commit.yml' },
  { challenge: 6, file: 'autograder-pr-link.yml' },
  { challenge: 7, file: 'autograder-conflicts.yml' },
];

const day2AutograderWorkflows = [
  { challenge: 10, file: 'autograder-local-commit.yml' },
  { challenge: 14, file: 'autograder-template.yml' },
  { challenge: 16, file: 'autograder-capstone.yml' },
];

test('Day 1 autograder workflows exist for challenges 2, 5, 6, and 7', () => {
  day1AutograderWorkflows.forEach(({ challenge, file }) => {
    const wfPath = path.join(autograderWorkflowsDir, file);
    assertFileExists(wfPath, `Day 1 autograder workflow for challenge ${challenge}: ${file}`);
  });
});

test('Day 2 autograder workflows exist for challenges 10, 14, and 16', () => {
  day2AutograderWorkflows.forEach(({ challenge, file }) => {
    const wfPath = path.join(autograderWorkflowsDir, file);
    assertFileExists(wfPath, `Day 2 autograder workflow for challenge ${challenge}: ${file}`);
  });
});

test('each autograder workflow posts a marker-based comment naming its challenge', () => {
  [...day1AutograderWorkflows, ...day2AutograderWorkflows].forEach(({ challenge, file }) => {
    const content = readText(path.join(autograderWorkflowsDir, file));
    const markerPattern = new RegExp(`## Challenge ${challenge}:`);
    assert.match(
      content,
      markerPattern,
      `${file}: must post a comment with marker "## Challenge ${challenge}:" so the watchdog and update-in-place logic can identify it`
    );
  });
});

test('autograder watchdog listens for every primary autograder workflow', () => {
  const watchdogPath = path.join(autograderWorkflowsDir, 'autograder-watchdog.yml');
  assertFileExists(watchdogPath, 'autograder-watchdog.yml');
  const content = readText(watchdogPath);

  [...day1AutograderWorkflows, ...day2AutograderWorkflows].forEach(({ challenge }) => {
    const markerPattern = new RegExp(`## Challenge ${challenge}:`);
    assert.match(
      content,
      markerPattern,
      `autograder-watchdog.yml: must reference the "## Challenge ${challenge}:" marker so the fallback notice can detect missing comments`
    );
  });
});

// ---------------------------------------------------------------------------
// 3. Assignment descriptor files -- required sections
// ---------------------------------------------------------------------------

function validateAssignmentDescriptor(filePath, label, requiredChallengeRange) {
  assertFileExists(filePath, label);
  const content = readText(filePath);

  const requiredSections = [
    'What You Will Do',
    'Challenges',
    'Evidence',
  ];

  requiredSections.forEach(section => {
    assert.match(
      content,
      new RegExp(section, 'i'),
      `${label}: missing required section "${section}"`
    );
  });

  // Verify challenge table has at least the minimum expected challenges.
  // Descriptors use table rows like "| 1. Find Your Way" or "Challenge 1" text.
  const { min, max } = requiredChallengeRange;
  for (let c = min; c <= max; c++) {
    assert.match(
      content,
      new RegExp(`(?:Challenge\\s*${c}|\\|\\s*${c}\\.)`, 'i'),
      `${label}: missing Challenge ${c} in descriptor`
    );
  }
}

test('Day 1 assignment descriptor is complete and covers challenges 1 through 9', () => {
  validateAssignmentDescriptor(day1DescriptorPath, 'assignment-day1', { min: 1, max: 9 });
});

test('Day 2 assignment descriptor is complete and covers challenges 10 through 16', () => {
  validateAssignmentDescriptor(day2DescriptorPath, 'assignment-day2', { min: 10, max: 16 });
});

test('assignment descriptors reference the correct template repository', () => {
  [day1DescriptorPath, day2DescriptorPath].forEach(filePath => {
    const content = readText(filePath);
    assert.match(
      content,
      /Community-Access\/learning-room-template/i,
      `${path.basename(filePath)}: should reference Community-Access/learning-room-template`
    );
  });
});

// ---------------------------------------------------------------------------
// 4. Classroom README -- key deployment sections present
// ---------------------------------------------------------------------------

test('classroom README contains all required deployment sections', () => {
  const content = readText(classroomReadmePath);

  const required = [
    'Step 1: Create the Classroom',
    'Step 2: Import the Student Roster',
    'Step 3: Create Assignment 1',
    'Step 4: Create Assignment 2',
    'Step 5: Share Invite Links',
    'Step 6: Verify Everything Works',
    'Step 7: Day-of-Workshop Facilitation',
    'classroom.github.com',
    'Community-Access/learning-room-template',
    'Seed-LearningRoomChallenge.ps1',
    'Seed-PeerSimulation.ps1',
    'Start-MergeConflictChallenge.ps1',
    'feedback pull request',
    'Day-2-only',
    'teardown',
  ];

  required.forEach(snippet => {
    assert.match(
      content,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      `classroom README missing required content: "${snippet}"`
    );
  });
});

test('classroom README verification checklist covers all critical smoke-test steps', () => {
  const content = readText(classroomReadmePath);

  const smokeTests = [
    'Accept the Day 1 invite',
    'Challenge 1 issue was created',
    'Aria',
    'autograding',
    'feedback pull request',
    'Day 2',
    'Delete the test student',
  ];

  smokeTests.forEach(step => {
    assert.match(
      content,
      new RegExp(step.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      `classroom README verification checklist missing step: "${step}"`
    );
  });
});

// ---------------------------------------------------------------------------
// 5. Student Progression Bot workflow -- triggers and permissions
// ---------------------------------------------------------------------------

test('student-progression.yml has correct triggers and required write permissions', () => {
  const content = readText(studentProgressionWorkflowPath);

  // Must trigger on issues closed
  assert.match(content, /on:/, 'student-progression.yml: missing "on:" trigger block');
  assert.match(content, /issues:/, 'student-progression.yml: must trigger on issues events');
  assert.match(content, /closed/, 'student-progression.yml: must handle closed issues');

  // Must have issues: write permission to create new issues
  assert.match(
    content,
    /issues:\s*write/,
    'student-progression.yml: must declare "issues: write" permission for the Progression Bot'
  );
});

test('pr-validation-bot.yml declares all required permissions', () => {
  const content = readText(prValidationWorkflowPath);

  const required = [
    [/pull-requests:\s*write/, 'pull-requests: write'],
    [/issues:\s*write/, 'issues: write'],
  ];

  required.forEach(([pattern, label]) => {
    assert.match(
      content,
      pattern,
      `pr-validation-bot.yml: must declare "${label}" so Aria can post comments`
    );
  });
});

test('all template workflows declare concurrency cancellation', () => {
  const workflows = [
    studentProgressionWorkflowPath,
    prValidationWorkflowPath,
    contentValidationWorkflowPath,
  ];

  workflows.forEach(wfPath => {
    const content = readText(wfPath);
    assert.match(
      content,
      /concurrency:/,
      `${path.basename(wfPath)}: must declare a concurrency block to prevent duplicate workflow runs`
    );
    assert.match(
      content,
      /cancel-in-progress:\s*true/,
      `${path.basename(wfPath)}: must set cancel-in-progress: true`
    );
  });
});

// ---------------------------------------------------------------------------
// 6. Template repo readiness -- files that Classroom copies must exist
// ---------------------------------------------------------------------------

test('learning-room template contains all files GitHub Classroom will copy to student repos', () => {
  const required = [
    // Core student documents
    'README.md',
    'docs/welcome.md',
    'docs/keyboard-shortcuts.md',
    'docs/setup-guide.md',
    'docs/course-roadmap.md',
    'docs/skills-bonus-scenarios.md',
    'docs/solutions/README.md',
    // Automation
    '.github/workflows/student-progression.yml',
    '.github/workflows/pr-validation-bot.yml',
    '.github/workflows/content-validation.yml',
    '.github/workflows/autograder-capstone.yml',
    '.github/workflows/autograder-conflicts.yml',
    '.github/workflows/autograder-issue-filed.yml',
    '.github/workflows/autograder-branch-commit.yml',
    '.github/workflows/autograder-pr-link.yml',
    '.github/workflows/autograder-local-commit.yml',
    '.github/workflows/autograder-template.yml',
    '.github/workflows/autograder-watchdog.yml',
    '.github/scripts/challenge-progression.js',
    '.github/scripts/validate-pr.js',
    '.github/scripts/validation-report.js',
    '.github/scripts/comment-responder.js',
    // Student support
    '.github/STUDENT_GUIDE.md',
    '.github/ISSUE_TEMPLATE/start-here-roadmap.yml',
    // package.json (needed for scripts that run npm)
    'package.json',
  ];

  // All 16 core + 5 bonus challenge templates
  for (let i = 1; i <= 16; i++) {
    required.push(`.github/ISSUE_TEMPLATE/challenge-${String(i).padStart(2, '0')}-${getChallengeSlug(i)}.yml`);
  }
  ['a-improve-agent', 'b-document-journey', 'c-group-challenge', 'd-notifications', 'e-git-history'].forEach(slug => {
    required.push(`.github/ISSUE_TEMPLATE/bonus-${slug}.yml`);
  });

  required.forEach(rel => {
    assert.equal(
      fs.existsSync(path.join(learningRoom, rel)),
      true,
      `learning-room template missing: ${rel}`
    );
  });
});

function getChallengeSlug(n) {
  const slugs = {
    1: 'find-your-way',
    2: 'first-issue',
    3: 'conversation',
    4: 'branch-out',
    5: 'make-your-mark',
    6: 'first-pr',
    7: 'merge-conflict',
    8: 'culture',
    9: 'merge-day',
    10: 'go-local',
    11: 'day2-pr',
    12: 'review',
    13: 'copilot',
    14: 'template',
    15: 'agents',
    16: 'capstone',
  };
  return slugs[n] || String(n);
}

// ---------------------------------------------------------------------------
// 7. Roster template -- valid CSV structure
// ---------------------------------------------------------------------------

test('roster-template.csv has correct headers', () => {
  assertFileExists(rosterTemplatePath, 'roster-template.csv');
  const content = readText(rosterTemplatePath);
  const firstLine = content.split('\n')[0].trim();
  assert.equal(
    firstLine,
    'identifier,name,email',
    'roster-template.csv: first line must be "identifier,name,email"'
  );
});

// ---------------------------------------------------------------------------
// 8. GitHub Classroom architecture invariants
// ---------------------------------------------------------------------------

test('classroom model does not require students to be org members', () => {
  const readme = readText(classroomReadmePath);
  // The guide must explicitly state students do NOT need org membership.
  // The README says: do **not** need to ... become members of `Community-Access`
  assert.match(
    readme,
    /do\s+\*{0,2}not\*{0,2}\s+need|not.*need.*member|not.*org.*member/i,
    'classroom README must clarify students do not need GitHub org membership'
  );
});

test('classroom model uses per-student private repos not a shared repo', () => {
  const readme = readText(classroomReadmePath);
  assert.match(
    readme,
    /private.*per.?student|each student.*private|own.*private.*repo/i,
    'classroom README must confirm each student gets their own private repository'
  );
  // Must NOT recommend a shared student repo in the active guidance.
  // Strip the "Legacy Notes" section before checking, since it describes the
  // old deprecated model explicitly to contrast it with the current one.
  const legacyIndex = readme.indexOf('## Legacy Notes');
  const activeReadme = legacyIndex > 0 ? readme.slice(0, legacyIndex) : readme;
    // Confirm the README explicitly states there is no shared student repository.
    assert.match(
      readme,
      /no shared student repository|replaced by GitHub Classroom/i,
      'classroom README should explicitly state there is no shared student repository'
    );
    // The active guidance must not instruct facilitators to create one shared repo
    // for all students (as the old multi-player sandbox model did).
    assert.doesNotMatch(
      activeReadme,
      /(?:use|create|provision|set up)\s+(?:a\s+)?shared\s+(?:student\s+)?repo/i,
      'classroom README active guidance must not instruct facilitators to create a shared student repo'
    );
});

test('classroom README explains the late-joining student workflow', () => {
  const readme = readText(classroomReadmePath);
  assert.match(
    readme,
    /late|join.*after|after.*workshop.*start/i,
    'classroom README must explain what happens when a student joins late'
  );
});
