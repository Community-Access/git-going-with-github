# GitHub Classroom Integration Architecture

This document describes the current production architecture for registration and classroom handoff.

## Design Goals

- Keep enrollment automation in a public repository without exposing private intake details.
- Avoid organization invitation dependencies.
- Use deterministic issue signals for Day 2 release and dashboard status.

## High-Level Flow

1. Student opens enrollment or registration issue.
2. `registration.yml` validates submission and posts assignment links.
3. Student replies `ack` after Day 1 link verification.
4. Student replies `day1-complete` after Day 1 milestone.
5. `day2-release.yml` posts Day 2 assignment link when completion signal is present.
6. `instructor-dashboard-sync.yml` writes status snapshots to private admin repo issues.

## Core Workflows

### `registration.yml`

- Handles duplicate and waitlist behavior.
- Stores detailed intake in private repo when configured.
- Redacts public issue body for privacy.
- Posts Day 1 and Day 2 links from repository variables.

### `day2-release.yml`

- Runs on schedule and manual dispatch.
- Reads enrollment issues with `enrolled` label.
- Releases Day 2 when either condition is true:
  - Label `day2-eligible` or `day1-complete` is present.
  - Student comment contains `day1-complete`.

### `instructor-dashboard-sync.yml`

- Reads enrollment issues and comments from this repo.
- Computes status categories:
  - `awaiting-ack`
  - `active-day1`
  - `day1-complete`
  - `day2-released`
  - `needs-info`
- Upserts one dashboard issue per student in the private admin repo.

## Configuration Surface

### Variables

- `CLASSROOM_DAY1_ASSIGNMENT_URL`
- `CLASSROOM_DAY2_ASSIGNMENT_URL`
- `PRIVATE_STUDENT_DATA_REPO`
- `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT`
- `ENABLE_PUBLIC_REGISTRATION_EXPORT`

### Secrets

- `PRIVATE_STUDENT_DATA_TOKEN`
- `INSTRUCTOR_DASHBOARD_TOKEN` (dashboard sync)

## Student Interaction Contract

Required student replies:

- `ack` after opening Day 1 assignment.
- `day1-complete` after Day 1 milestone completion.

These text signals are intentionally simple so facilitators can test and recover quickly.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Design Goals:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **High-Level Flow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Core Workflows:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **Configuration Surface:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Student Interaction Contract:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
