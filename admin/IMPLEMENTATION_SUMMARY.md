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

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Active Model:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Configuration Required:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Workflow Changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **QA and Testing Updates:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Readiness Checklist:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
