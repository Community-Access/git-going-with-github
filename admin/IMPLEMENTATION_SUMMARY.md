# Registration + Classroom Integration Summary

Date: 2026-05-12

## Active Model

The repository now uses assignment-link automation without organization invitation automation.

### Student interaction sequence

1. Student submits enrollment issue.
2. Workflow validates and posts Day 1 assignment link.
3. Student replies `ack` after confirming access.
4. Student replies `day1-complete` (or facilitator applies `day2-eligible`).
5. Day 2 release workflow posts Day 2 assignment link.

## Configuration Required

### Variables

- `CLASSROOM_DAY1_ASSIGNMENT_URL`
- `CLASSROOM_DAY2_ASSIGNMENT_URL`
- `PRIVATE_STUDENT_DATA_REPO`
- `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT`
- `ENABLE_PUBLIC_REGISTRATION_EXPORT`

### Secrets

- `PRIVATE_STUDENT_DATA_TOKEN`
- `INSTRUCTOR_DASHBOARD_TOKEN` (for dashboard sync)

## Workflow Changes

- `registration.yml`
  - Removed org invite dependency.
  - Removed classroom join variable dependency.
  - Keeps duplicate/waitlist behavior.
  - Keeps assignment-link posting.

- `day2-release.yml`
  - Uses issue signals (`day1-complete` or `day2-eligible`) to release Day 2.
  - No org API dependency.

- `instructor-dashboard-sync.yml`
  - Uses enrollment issue labels/comments for status snapshots.
  - No classroom org scan dependency.

## QA and Testing Updates

Updated documents:

- `GO-LIVE-QA-GUIDE.md`
- `admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md`
- `admin/ENROLLMENT_SETUP_CHECKLIST.md`
- `admin/REGISTRATION-QUICKSTART.md`
- `admin/REGISTRATION-ADMIN.md`
- `admin/QUICK_START_SETUP.md`
- `admin/CLASSROOM_INTEGRATION_GUIDE.md`

## Readiness Checklist

- Day 1 link variable set and validated.
- Day 2 link variable set and validated.
- Student test confirms `ack` and `day1-complete` path.
- Day 2 release comment verified.
- Dashboard sync workflow produces student status issues in admin repo.
