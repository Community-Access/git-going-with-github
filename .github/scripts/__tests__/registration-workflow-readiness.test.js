const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '../../../');

function read(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('registration workflow contains required label and duplicate/waitlist flows', () => {
    const workflow = read('.github/workflows/registration.yml');

    const requiredSnippets = [
        "contains(github.event.issue.title, '[REGISTER]')",
        "labels: ['duplicate']",
        "labels: ['waitlist']",
        "labels: ['registration']",
        'Please reply `ack` on this issue after you receive your learning room invitation.',
        'Upload CSV as artifact',
        'Sync Student Roster (No PII)',
        // Hybrid model: enrollment triggers provisioning directly.
        'createWorkflowDispatch',
        // PII hygiene: the [REGISTER] path stores intake privately, then redacts.
        'Registration submission (redacted)',
    ];

    requiredSnippets.forEach(snippet => {
        assert.match(
            workflow,
            new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Registration workflow missing expected behavior marker: ${snippet}`
        );
    });

    // GitHub Classroom was removed in the June 2026 Hybrid transition; the
    // workflow must never send registrants to classroom.github.com again.
    assert.equal(
        /CLASSROOM_DAY[12]_ASSIGNMENT_URL|classroom\.github\.com/i.test(workflow),
        false,
        'Registration workflow must not reference removed GitHub Classroom assignment links'
    );
});

test('registration issue form template exists', () => {
    const templatePath = path.join(repoRoot, '.github/ISSUE_TEMPLATE/workshop-registration.yml');
    assert.equal(fs.existsSync(templatePath), true, 'Missing workshop-registration.yml issue form template');

    const content = fs.readFileSync(templatePath, 'utf8');
    assert.match(content, /name:\s*"?Workshop Registration/i, 'Registration template should have user-facing name');
    assert.match(content, /body:/i, 'Registration template should define issue form body');
});
