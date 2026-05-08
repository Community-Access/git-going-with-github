---
status: reference-only
former_source: .github/ISSUE_TEMPLATE/challenge-hub.md
---

# Challenge Issue Template Reference

This reference template is intentionally stored outside `.github/ISSUE_TEMPLATE/` so GitHub does not present placeholder values to workshop participants. Facilitators can copy it when generating cohort-specific challenge issues.

## Template

```markdown
name: "Challenge: {CHAPTER_NAME}"
about: "Chapter {CHAPTER_NUM} Challenge - {CHALLENGE_SUMMARY}"
title: "Chapter {CHAPTER_NUM}.{CHALLENGE_NUM}: {CHALLENGE_TITLE} (@{USERNAME})"
labels: ["challenge", "challenge: {CHALLENGE_DIFFICULTY}", "skill: {SKILL_TAG}", "day: {DAY}"]
assignees: ["{USERNAME}"]

> [!WARNING]
> This issue is part of the **GIT Going with GitHub** course.
> Do not start this challenge until the course officially begins.

# Chapter {CHAPTER_NUM}: {CHAPTER_NAME} Challenge

**Student:** @{USERNAME}
**Estimated Time:** {TIME_ESTIMATE}
**Skill Level:** {CHALLENGE_DIFFICULTY}

## Challenge Overview

{CHALLENGE_OVERVIEW}

**All challenges in this chapter are linked to the [Challenge Hub](https://github.com/Community-Access/git-going-with-github/blob/main/docs/CHALLENGES.md) for full context and instructions.**

## Your Challenge: {CHALLENGE_TITLE}

{CHALLENGE_BODY_FROM_HUB}

## What You Need to Do

1. **Complete the challenge** following the instructions in the Challenge Hub.
2. **Open a pull request** that references this issue: `Closes #{ISSUE_NUMBER}`.
3. **Submit your work** - your PR should include proof of completion.
4. **See your issue close** automatically when your PR merges.

## How to Submit

### Step 1: Claim This Issue

Reply with a comment: `I'm working on this!`

### Step 2: Create Your Branch

```bash
git checkout -b chapter-{CHAPTER_NUM}-challenge-{USERNAME}
```

### Step 3: Complete the Challenge

Follow the detailed steps in the Challenge Hub.

{CHALLENGE_SPECIFIC_STEPS}

### Step 4: Open a Pull Request

When ready:

```bash
git push origin chapter-{CHAPTER_NUM}-challenge-{USERNAME}
```

Then open a PR with:

- **Title:** `Chapter {CHAPTER_NUM}: {CHALLENGE_TITLE}`
- **Description:** Include `Closes #{ISSUE_NUMBER}` and add evidence of your work
- **Evidence:** Links to created issues, pull requests, or proof of completion per the Challenge Hub

### Step 5: Watch for Validation

{VALIDATION_TEXT}

## Expected Outcomes

{EXPECTED_OUTCOMES}

## If You Get Stuck

1. Re-read the Challenge Hub.
2. Check the [Screen Reader Cheat Sheet](https://github.com/Community-Access/git-going-with-github/blob/main/docs/appendix-b-screen-reader-cheatsheet.md).
3. Listen to the companion episode in [PODCASTS.md](https://github.com/Community-Access/git-going-with-github/blob/main/PODCASTS.md).
4. Ask in the workshop help channel with your challenge number.
5. Comment on this issue with what is blocking you.

## Learning Moment

{LEARNING_MOMENT}
```