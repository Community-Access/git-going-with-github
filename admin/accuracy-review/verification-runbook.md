# Scenario Verification Runbook

Last reviewed: May 12, 2026

Use this runbook to validate scenario accuracy before making learner-facing edits.

## Preparation

1. Start from a clean browser session or documented learner account state.
2. Record the date, browser, OS, VS Code version, relevant extension versions, GitHub account plan, and repository permissions.
3. Use only official sources listed in [external-change-register.md](external-change-register.md) for product facts.
4. Capture exact UI labels, prompts, and final outcomes in notes.
5. Do not rely on screenshots alone. Record text that a screen reader or keyboard user can verify.

## Verification Record Template

The following table defines the fields required for each verification record.

| Field | Required value |
| --- | --- |
| Scenario ID | Use the ID from [scenario-inventory.md](scenario-inventory.md) |
| Date verified | Use `YYYY-MM-DD` |
| Verifier | Name or initials |
| Environment | Browser, OS, VS Code version, extension versions, account plan |
| Source content | File path and heading or section |
| Current documented step | Exact text or summary |
| Observed current behavior | Exact UI label, prompt, command output, or page state |
| Result | `pass`, `needs-update`, `blocked`, or `not-applicable` |
| Severity | `P0`, `P1`, or `P2` |
| Recommended edit | One sentence describing the needed change |
| Source link | Official source or live validation note |

## P0 Manual Validation Checklist

The following table lists the P0 scenario checks to run first.

| Scenario ID | Manual check | Pass condition |
| --- | --- | --- |
| SCN-003 | Create an issue from GitHub.com with the current repository issue template flow | Documented steps match current labels and issue appears with expected title/body |
| SCN-005 | Create a pull request from a non-default branch on GitHub.com | Compare selector, create form, tabs, checks area, and final PR URL match documentation |
| SCN-006 | Resolve or inspect a merge conflict in GitHub.com and VS Code | Conflict markers, web conflict editor, VS Code Source Control, and validation language match current behavior |
| SCN-007 | Navigate VS Code interface and accessibility features | Command names, Accessible View route, terminal focus behavior, and settings paths match VS Code 1.119 or current stable |
| SCN-009 | Sign into Copilot and use a basic chat/inline workflow | Prerequisite language, sign-in prompts, and current UI entry points match docs |
| SCN-010 | Inspect current Copilot plan/billing pages | Plan, AI Credits, billing, and model claims are source-linked and last-verified |
| SCN-012 | Share an integrated browser tab with an agent in VS Code | Documentation includes explicit sharing, approval prompt, and stop-sharing control |
| SCN-014 | Create or validate a Classroom assignment path | Classroom setup, roster, student repository, and challenge seeding steps match current UI |
| SCN-016 | Verify workflow validation and autograding messaging | Terms are consistent across Classroom autograding, workflow comments, Aria feedback, and manual grading |

## Automated Repository Checks

Run these checks after each remediation batch.

The following table lists the automated checks currently available in this repository.

| Check | Command | Expected result |
| --- | --- | --- |
| Unit and automation tests | `npm run test:automation` | Exit code 0 |
| Podcast catalog validation | `npm run validate:podcasts` | Exit code 0 |
| Podcast feed validation | `npm run validate:podcast-feed` | Exit code 0 |

## Live UI Notes

1. For GitHub.com, record whether feature preview toggles are present or whether the feature has graduated to the standard interface.
2. For VS Code, record whether a feature is stable, preview, experimental, or Insiders-only.
3. For Copilot, record whether behavior depends on plan, organization policy, model availability, or rollout.
4. For Classroom, record whether a step requires organization owner, classroom admin, or repository maintainer permissions.
5. For billing and pricing, always include date verified and link to the official page.
