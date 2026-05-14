# QA Readiness Test Pack (Non-Podcast)

This folder contains local, repeatable QA readiness evidence for deployment, automation setup, challenge reliability coverage, and release-gate integrity.

## Scope

Included:

- Registration workflow readiness checks.
- Classroom deployment and template readiness checks.
- Challenge inventory and reliability-gate coverage checks.
- Runbook and go-live gate integrity checks.
- Existing validation and automation tests under `.github/scripts/__tests__/`.

Excluded:

- Podcast generation and podcast validation workflows.

## Test Entry Point

Run locally from repository root:

```powershell
npm run test:automation
```

Current test harness executes all Node tests in `.github/scripts/__tests__/*.test.js`.

## New Unit Tests Added in This QA Pass

- `.github/scripts/__tests__/qa-readiness-gates.test.js`
- `.github/scripts/__tests__/challenge-reliability-coverage.test.js`
- `.github/scripts/__tests__/registration-workflow-readiness.test.js`

## Latest Results

See:

- [UNIT-TEST-RESULTS-2026-05-08.md](UNIT-TEST-RESULTS-2026-05-08.md)

## Interpreting Confidence

Local unit tests provide strong confidence for:

- Static configuration correctness.
- Presence and structure of workflows/templates/docs.
- Internal consistency across challenge and runbook artifacts.

Local unit tests do not replace live platform verification for:

- GitHub Classroom invite acceptance behavior.
- Organization permission edge cases.
- Workflow timing/latency in hosted GitHub Actions.
- Human interpretation and recovery behavior in real challenge execution.

Use this pack together with:

- [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](../LEARNING-ROOM-E2E-QA-RUNBOOK.md)
- [GO-LIVE-QA-GUIDE.md](../../GO-LIVE-QA-GUIDE.md)

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Scope:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Test Entry Point:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **New Unit Tests Added in This QA Pass:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Latest Results:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Interpreting Confidence:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
