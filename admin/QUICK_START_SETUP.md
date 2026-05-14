# Quick Start: Assignment-Link Registration Setup

This quick start configures registration automation for the current student interaction model.

## Prerequisites

- Classroom assignments exist in GitHub Classroom.
- You have admin access to `Community-Access/git-going-with-github`.
- You can copy Day 1 and Day 2 assignment invite links.

## Step 1: Copy Assignment Invite Links

From `https://classroom.github.com`:

1. Open Day 1 assignment and copy invite link.
2. Open Day 2 assignment and copy invite link.

Expected format:

- `https://classroom.github.com/a/<short-code>`

## Step 2: Configure Repository Variables

Go to `https://github.com/Community-Access/git-going-with-github/settings/variables/actions`.

Create or update:

| Name | Value |
|---|---|
| `CLASSROOM_DAY1_ASSIGNMENT_URL` | Day 1 invite link |
| `CLASSROOM_DAY2_ASSIGNMENT_URL` | Day 2 invite link |

## Step 3: Validate Registration Flow

1. Open a test enrollment issue.
2. Confirm welcome comment includes Day 1 link.
3. Reply `ack` from test student account.
4. Reply `day1-complete` from test student account.
5. Confirm Day 2 release comment appears.

## Expected Results

- Enrollment issue is processed successfully.
- No org-invite dependency exists.
- Day 2 release is driven by issue signal (`day1-complete` or `day2-eligible`).

## Troubleshooting

| Problem | Fix |
|---|---|
| Day 1 link missing | Verify `CLASSROOM_DAY1_ASSIGNMENT_URL` is set with no extra spaces |
| Day 2 release did not trigger | Add `day1-complete` comment or apply `day2-eligible` label |
| Wrong assignment opened | Re-copy invite links and update variables |

## Operational Notes

- Student org membership is not part of this flow.
- Assignment acceptance remains student-driven in GitHub Classroom.
- Private intake and dashboard workflows continue to run independently.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Prerequisites:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- **Expected Results:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Troubleshooting:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Operational Notes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
