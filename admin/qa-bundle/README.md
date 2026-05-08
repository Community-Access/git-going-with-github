# QA Bundle (Grab-and-Go)

This folder is a convenience copy of the files needed to run end-to-end QA for the course (excluding podcast workflows).

## What this bundle is for

Use this folder when you want quick local access to all key QA artifacts without navigating the full repo.

## Start here

1. [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md)
2. [GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md)
3. [admin/qa-readiness/UNIT-TEST-RESULTS-2026-05-08.md](admin/qa-readiness/UNIT-TEST-RESULTS-2026-05-08.md)

## Included content sets

- Registration deployment and QA docs and workflow files.
- Classroom deployment and autograding setup docs.
- Learning Room automation docs, workflows, and issue templates.
- Facilitator scripts for template sync, seeding, conflict setup, and recovery.
- Challenge definitions and student onboarding references.
- Local unit-test readiness evidence.

## HTML copy of E2E runbook

- [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.html](admin/LEARNING-ROOM-E2E-QA-RUNBOOK.html)

## Important notes

- This bundle is a convenience snapshot, not the canonical source of truth.
- Canonical files remain in the repository root paths.
- Rebuild this bundle after significant workflow/challenge/runbook updates.

## Local vs GitHub deployment for unit tests

- Unit tests run locally with `npm run test:automation`.
- GitHub deployment is not required to execute local unit tests.
- Hosted GitHub/Classroom gates are still required for final release readiness.
