const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '../../../');

function read(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('E2E runbook includes hard no-go readiness gates', () => {
    const content = read('admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md');

    const requiredSnippets = [
        'Critical Precondition Gates (No-Go if any fail)',
        'Issue form template `workshop-registration.yml` exists',
        'Required labels exist: `registration`, `duplicate`, `waitlist`',
        'Learning Room Template Deployment Gate',
        'Prove template freshness',
        'Challenge Reliability and Failure-Mode Coverage (Required)',
        'Student-visible expected state map (required cross-check)',
        'Student recovery and reset playbook (required)',
        'Cross-cutting failure modes (must be tested at least once)',
        'Challenge reliability/failure-mode coverage complete:',
    ];

    requiredSnippets.forEach(snippet => {
        assert.match(
            content,
            new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Runbook missing required gate text: ${snippet}`
        );
    });
});

test('Go-live release checklist contains required non-podcast readiness gates', () => {
    const content = read('GO-LIVE-QA-GUIDE.md');

    const requiredChecklistItems = [
        'Registration issue form template and labels are configured',
        'Learning Room source has been synced to `Community-Access/learning-room-template`',
        'Template smoke validation from `Community-Access/learning-room-template` succeeded',
        'Template freshness proof confirms smoke repo content matches latest merged template sync changes',
        'Challenge tracking log includes explicit status and evidence for Challenges 1-16 and Bonus A-E',
        'Challenge reliability matrix includes happy path, failure path, and recovery evidence for each challenge family',
        'All in-scope automation workflows and facilitator scripts were validated with expected behavior and evidence',
    ];

    requiredChecklistItems.forEach(item => {
        assert.match(
            content,
            new RegExp(item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Go-live checklist missing required item: ${item}`
        );
    });
});

test('recovery restore script exists and is discoverable in scripts/classroom', () => {
    const scriptPath = path.join(repoRoot, 'scripts/classroom/Restore-LearningRoomFiles.ps1');
    assert.equal(fs.existsSync(scriptPath), true, 'Missing recovery restore script in scripts/classroom');

    const content = fs.readFileSync(scriptPath, 'utf8');
    assert.match(content, /Profile\s*=\s*'core-day1'/i, 'Recovery script should provide default restore profile');
    assert.match(content, /OpenPullRequest/i, 'Recovery script should support opening a recovery pull request');
});
