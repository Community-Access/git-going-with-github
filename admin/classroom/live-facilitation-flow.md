# Live Facilitation Flow Checklist

Use this checklist when setting up a new cohort so you can run the full Classroom workflow in one pass.

## Phase 1: Classroom and Roster

- [ ] Open classroom.github.com and create or select the target classroom.
- [ ] Confirm organization is correct (Community-Access).
- [ ] Import roster CSV and verify expected usernames appear.
- [ ] Confirm template repository is available: `Community-Access/learning-room-template`.

## Phase 2: Create Day 1 Assignment

- [ ] Click New assignment.
- [ ] Set title to You Belong Here.
- [ ] Set type to Individual.
- [ ] Set visibility to Private.
- [ ] Set starter template repository to `Community-Access/learning-room-template`.
- [ ] Set Grant students admin access to No.
- [ ] Set Enable feedback pull requests to Yes.
- [ ] Set deadline for your cohort.
- [ ] Copy description from `day1-assignment-copy-paste.md` and paste into Classroom.

## Phase 3: Verify Autograder Workflows (no Classroom configuration)

Autograded checks are GitHub Actions workflows shipped inside the template repo. **Do not configure any test cases in the Classroom UI** -- leave that section empty when you save the assignment. See [autograding-setup.md](autograding-setup.md) for the full rationale.

- [ ] Confirm `Community-Access/learning-room-template` contains all of the following workflow files under `.github/workflows/`:
  - [ ] `autograder-issue-filed.yml`
  - [ ] `autograder-branch-commit.yml`
  - [ ] `autograder-pr-link.yml`
  - [ ] `autograder-conflicts.yml`
  - [ ] `autograder-local-commit.yml`
  - [ ] `autograder-template.yml`
  - [ ] `autograder-capstone.yml`
  - [ ] `autograder-watchdog.yml`
- [ ] In the Day 1 assignment editor, leave the **Add test** / autograding tests area empty.
- [ ] Save assignment.

## Phase 4: Create Day 2 Assignment

- [ ] Click New assignment.
- [ ] Set title to You Can Build This.
- [ ] Set type to Individual.
- [ ] Set visibility to Private.
- [ ] Set starter template repository to `Community-Access/learning-room-template`.
- [ ] Set Grant students admin access to No.
- [ ] Set Enable feedback pull requests to Yes.
- [ ] Set deadline for your cohort.
- [ ] Copy description from `day2-assignment-copy-paste.md` and paste into Classroom.

## Phase 5: Verify Day 2 Autograder Workflows (no Classroom configuration)

Same model as Phase 3 -- the Day 2 checks (Challenges 10, 14, 16) run from the same template workflows. Do not enter any tests in the Classroom UI.

- [ ] Confirm the Day 2 autograder workflows are present in the template (`autograder-local-commit.yml`, `autograder-template.yml`, `autograder-capstone.yml`).
- [ ] In the Day 2 assignment editor, leave the **Add test** / autograding tests area empty.
- [ ] Save assignment.

## Phase 6: Publish and Share

- [ ] Publish Day 1 assignment.
- [ ] Publish Day 2 assignment.
- [ ] Copy Day 1 invite link and store in facilitator notes.
- [ ] Copy Day 2 invite link and store in facilitator notes.
- [ ] Update agenda docs/placeholders with final invite links.

## Phase 7: First Student Acceptance and Seeding

After a student accepts, run these commands from the repository root.

### Day 1 seeding

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 1 -Assignee studentname
```

### Day 2 seeding

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 10 -Assignee studentname
```

### Peer simulation seeding

```powershell
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access-Classroom/learning-room-studentname -StudentUsername studentname
```

## Phase 8: Verification Gate

- [ ] Confirm challenge issue exists after seeding.
- [ ] Confirm Student Progression workflow run appears in Actions.
- [ ] Confirm at least one autograder workflow posts a fail comment for a known-bad state, and a pass comment after the fix is pushed.
- [ ] Confirm peer simulation artifacts exist (2 issues + 1 PR).

## Phase 9: Cohort Readiness Sign-Off

- [ ] Day 1 and Day 2 assignments published.
- [ ] Invite links validated.
- [ ] Autograder workflows verified to post comments in a test student repo.
- [ ] Seeding scripts verified against a test student repo.
- [ ] Facilitator notes updated with links and fallback instructions.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Phase 1: Classroom and Roster:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 2: Create Day 1 Assignment:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 3: Verify Autograder Workflows (no Classroom configuration):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **Phase 4: Create Day 2 Assignment:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 5: Verify Day 2 Autograder Workflows (no Classroom configuration):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **Phase 6: Publish and Share:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 7: First Student Acceptance and Seeding:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 8: Verification Gate:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Phase 9: Cohort Readiness Sign-Off:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
