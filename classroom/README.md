# Workshop Deployment Guide

> **Status note (2026-07):** GitHub Classroom and the `scripts/classroom/` PowerShell tooling described in this guide have been removed. Current cohorts use hybrid provisioning (`.github/scripts/provisioning/`, triggered by the `provision-learning-rooms.yml` workflow), and peer simulation artifacts are seeded automatically by the Student Progression Bot inside each learning room. Where this guide references a `scripts/classroom/*.ps1` script, use the Student Progression Bot's **Run workflow** dispatch (inputs `start_challenge` and `assignee`) instead. This guide is retained for the parts that are still accurate (challenge flow, bots, grading).

> Single, end-to-end guide for deploying a new Git Going with GitHub workshop cohort. Covers everything from creating the classroom through post-workshop teardown. This is the only deployment document you need.

> Before sharing invite links with students, complete the [Go-Live QA Guide](../GO-LIVE-QA-GUIDE.md). It is the final release gate for content, workflows, Classroom setup, podcasts, accessibility, and human test coverage.

> If you need one practical execution script from registration through full student challenge completion (podcast work excluded), use [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](../admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md).

> Before creating assignments, sync and validate the latest template deployment using `scripts/classroom/Prepare-LearningRoomTemplate.ps1` and `scripts/classroom/Test-LearningRoomTemplate.ps1`.

## How the Workshop Works

Each student gets their own **private repository** created by GitHub Classroom from the `learning-room-template`. Inside that repo, three automation systems guide the student through all 21 challenges without facilitator intervention:

1. **Gandalf** (the PR Validation Bot) -- welcomes first-time contributors, validates PR structure, responds to `@gandalf-bot` help requests, and provides real-time feedback on every push
2. **Student Progression Bot** -- creates the first challenge when triggered by a facilitator script, then creates the next challenge issue whenever a student closes the current challenge issue
3. **Autograders** -- automated tests that verify objective evidence of challenge completion (branch exists, conflict markers removed, template file valid, agent file structured correctly)

No shared student repository. Students do not clone the template or configure permissions. The facilitator's deployment work is creating the classroom and two assignments in the GitHub Classroom web UI, then running the seeding scripts after each student repo is created.

Students only need a GitHub account. They do **not** need to create an organization, become members of `Community-Access`, or change GitHub Actions settings. Organization and repository workflow permissions are facilitator responsibilities.

### Architecture

```text
Community-Access/learning-room-template (template repo)
    |
    +--> GitHub Classroom creates one private repo per student
    |       learning-room-student-a
    |       learning-room-student-b
    |       ...
    |
    +--> Each student repo contains:
    |       Gandalf (pr-validation-bot.yml)          -- PR feedback and help responses
    |       Student Progression Bot               -- Unlocks challenges sequentially
    |       Autograders                            -- Validates specific challenges
    |       Issue templates (16 core + 5 bonus)   -- Challenge definitions
    |       Feedback PR (created by Classroom)     -- Facilitator async comments
    |
   +--> Student flow:
   |       Accept invite --> repo created --> facilitator seeds Challenge 1
    |       --> complete challenge --> close issue --> next challenge unlocked
    |       --> repeat through all challenges
    |
       +--> Capstone (Challenge 16):
          Student chooses Accessibility Agents, GLOW, or another meaningful project
          Opens a PR or prepares review-ready contribution evidence
```

### Two Participation Paths

| Path | Who it is for | Assignment | Entry point |
|---|---|---|---|
| **Day 1 + Day 2** | Participants starting from scratch | Assignment 1 (Day 1) then Assignment 2 (Day 2) | [Day 1 Agenda](../admin/DAY1_AGENDA.md) |
| **Day 2 only** | Participants with GitHub fundamentals | Assignment 2 only | [Day 2 Quick Start](../admin/DAY2_QUICK_START.md) then [Day 2 Agenda](../admin/DAY2_AGENDA.md) |

Day-2-only participants skip Assignment 1 entirely. They verify readiness using the [Day 2 Quick Start](../admin/DAY2_QUICK_START.md) self-assessment, then accept only the Day 2 invite link.

### What Is in This Directory

| File | Purpose |
|---|---|
| [assignment-day1-you-belong-here.md](assignment-day1-you-belong-here.md) | Assignment description for Day 1 (paste into Classroom UI) |
| [assignment-day2-you-can-build-this.md](assignment-day2-you-can-build-this.md) | Assignment description for Day 2 (paste into Classroom UI) |
| [grading-guide.md](grading-guide.md) | Facilitator rubric for all 21 challenges |
| [roster-template.csv](https://github.com/Community-Access/git-going-with-github/blob/main/classroom/roster-template.csv) | Starter CSV for importing student roster |
| [student-progression.yml](https://github.com/Community-Access/git-going-with-github/blob/main/classroom/student-progression.yml) | Reference copy of the progression bot workflow |
| [HUMAN_TEST_MATRIX.md](HUMAN_TEST_MATRIX.md) | End-to-end human walkthrough for all 16 core and 5 bonus challenges |
| [teardown-checklist.md](teardown-checklist.md) | Post-workshop cleanup steps |
| [../GO-LIVE-QA-GUIDE.md](../GO-LIVE-QA-GUIDE.md) | Final release-readiness guide and checklist |
| [../admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](../admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md) | Single operator runbook from registration to student completion (podcast excluded) |

---

## Prerequisites

Before starting, confirm the following:

- [ ] You have **Owner** or **Admin** access to the Community-Access GitHub organization
- [ ] Your facilitator GitHub account has a verified email address
- [ ] The `Community-Access/learning-room-template` repository exists and is public (or the classroom org has read access)
- [ ] The template repo has GitHub Actions enabled with **Read and write** permissions for `GITHUB_TOKEN` (Settings > Actions > General) -- Gandalf needs this to post comments
- [ ] "Allow GitHub Actions to create and approve pull requests" is checked in the template repo
- [ ] You have the student list (GitHub usernames required; real names optional)
- [ ] You have confirmed dates for Day 1 and Day 2

### Role separation for testing

Use separate accounts for facilitator and student testing.

- Keep your facilitator account (for example, `accesswatch`) as classroom admin/instructor only
- Use a dedicated test-student account to accept invite links and complete challenge flow
- Avoid using the facilitator account as a student for validation runs - admin permissions can hide real student experience issues

This keeps grading data clean, avoids permission edge cases, and gives you an accurate end-to-end student test.

---

## Step 1: Create the Classroom

1. Go to [classroom.github.com](https://classroom.github.com) and sign in with your facilitator account
2. Click **New classroom**
3. Select the **Community-Access** organization (if you do not see it, accept the GitHub Classroom invitation from your org admin)
4. Name the classroom using this pattern: `Git Going - [Cohort Name] - [Month Year]`
   - Example: `Git Going - Spring Cohort - March 2026`
   - Example: `Git Going - Seattle Accessibility Bootcamp - June 2026`
5. **Skip the TA / co-teacher setup** -- facilitators use organization-level permissions instead
6. Click **Create classroom**

---

## Step 2: Import the Student Roster

The roster links GitHub usernames to student identities so facilitators can track progress on the classroom dashboard.

1. Open the classroom you just created
2. Go to **Settings** (gear icon) then **Roster Management**
3. Click **Import from CSV**
4. Upload a completed version of [roster-template.csv](https://github.com/Community-Access/git-going-with-github/blob/main/classroom/roster-template.csv):

```csv
identifier,name,email
octocat,The Octocat,octocat@example.com
student-a,Alice Student,alice@example.com
```

- The `identifier` column **must** match the student's exact GitHub username
- `name` and `email` are optional but helpful for facilitator reference
- Students not on the roster can still accept; they appear as "unidentified"
- Verify all expected students appear in the roster list
- Students can be added later -- the roster is not locked

---

## Step 3: Create Assignment 1 -- You Belong Here (Day 1)

This assignment covers Challenges 1 through 9. When a student accepts the invite link, GitHub Classroom creates their private repo from the template. After acceptance, facilitators run `scripts/classroom/Seed-LearningRoomChallenge.ps1` to trigger the Student Progression Bot and create Challenge 1. As the student closes each challenge issue, the bot unlocks the next one.

**Day-2-only participants skip this assignment entirely.**

From the classroom dashboard, click **New assignment** and fill in the assignment settings:

| Setting | Value |
|---|---|
| **Title** | You Belong Here |
| **Type** | Individual |
| **Visibility** | Private (student repos visible only to the student and facilitators) |
| **Template repository** | `Community-Access/learning-room-template` |
| **Grant students admin access** | No |
| **Enable feedback pull requests** | Yes |
| **Deadline** | End of Day 1 (deadline is soft -- late work is still accepted) |

Then complete the remaining fields:

1. **Assignment description:** Open [assignment-day1-you-belong-here.md](assignment-day1-you-belong-here.md), copy everything below the HTML metadata comment, and paste it into the description field
2. **Autograding tests:** Leave this section empty. Day 1 autograded checks (Challenges 2, 5, 6, 7) run as GitHub Actions workflows inside the template repo, so no Classroom test cases are required. See [admin/classroom/autograding-setup.md](../admin/classroom/autograding-setup.md) for the full list of workflows.
3. Click **Create assignment** -- this generates your Day 1 invite link

### What the student experiences (Day 1)

1. Student clicks the invite link
2. GitHub Classroom creates their private repo (30-60 seconds)
3. Facilitator seeds Challenge 1 (Find Your Way Around) using `student-progression.yml`
4. Student completes the challenge, posts evidence, closes the issue
5. Progression Bot creates Challenge 2 issue with full instructions
6. Student repeats through Challenge 9 (Merge Day)
7. Gandalf provides real-time feedback on every PR along the way
8. Autograders validate Challenges 4, 5, 6, 7, and 9 automatically

---

## Step 4: Create Assignment 2 -- You Can Build This (Day 2)

This assignment covers Challenges 10 through 16 plus the 5 bonus challenges. **Both full-workshop and Day-2-only participants accept this assignment.**

Day-2-only participants will not have completed Assignment 1, but Assignment 2 does not depend on Assignment 1 artifacts.

Click **New assignment** again and fill in the settings:

   | Setting | Value |
   |---|---|
   | **Title** | You Can Build This |
   | **Type** | Individual |
   | **Visibility** | Private |
   | **Template repository** | `Community-Access/learning-room-template` |
   | **Grant students admin access** | No |
   | **Enable feedback pull requests** | Yes |
   | **Deadline** | One week after Day 2 (gives students time for the capstone and bonus challenges) |

Then complete the remaining fields:

1. **Assignment description:** Use [assignment-day2-you-can-build-this.md](assignment-day2-you-can-build-this.md)
2. **Autograding tests:** Leave this section empty. Day 2 autograded checks (Challenges 10, 14, 16) run as GitHub Actions workflows inside the template repo. See [admin/classroom/autograding-setup.md](../admin/classroom/autograding-setup.md).
3. Click **Create assignment** -- this generates your Day 2 invite link

### What the student experiences (Day 2)

1. Student clicks the Day 2 invite link
2. GitHub Classroom creates a new private repo for Day 2
3. Facilitator seeds Challenge 10 (Go Local) using `student-progression.yml`
4. Student clones the repo, works locally, pushes, and closes the issue
5. Progression Bot unlocks Challenges 11 through 16 sequentially
6. Challenge 16 (Capstone) has the student choose Accessibility Agents, GLOW, or another meaningful project and prepare a PR, branch, issue, or contribution plan
7. Bonus challenges (A through E) are available via issue templates for students who finish early

---

## Step 5: Share Invite Links

Each assignment generates a unique invite URL.

### Where to add the links

1. Copy the **Day 1 invite URL** from the assignment page
2. In the `git-going-with-github` repository, open `DAY1_AGENDA.md` and replace the `[INVITE_LINK]` placeholder
3. Copy the **Day 2 invite URL**
4. Open `DAY2_AGENDA.md` and replace its `[INVITE_LINK]` placeholder
5. Optionally, email the invite links directly to students before the workshop

### What students see when they click

1. GitHub shows a "Join classroom" page if they are not already on the roster
2. If on the roster, they see "Accept this assignment"
3. After accepting, GitHub creates their private repo within 30-60 seconds
4. The student's repository URL follows the pattern: `github.com/<classroom-org>/<assignment-slug>-<github-username>` (example: `you-belong-here-accesswatch`).

### Which links to send

| Participant type | Send Day 1 link | Send Day 2 link |
|---|---|---|
| Full workshop (Day 1 + Day 2) | Yes | Yes |
| Day-2-only | No | Yes |

---

## Step 6: Verify Everything Works

Run this verification with a test account before the workshop. Do not skip this step.

### Verification checklist

- [ ] Accept the Day 1 invite with a test GitHub account
- [ ] Verify a student repository was created under the classroom org
- [ ] Verify the learning-room template files are present (`docs/welcome.md`, `docs/keyboard-shortcuts.md`, `docs/setup-guide.md`)
- [ ] Verify Challenge 1 issue was created by the Progression Bot after running `Seed-LearningRoomChallenge.ps1`
- [ ] Open a test PR with a trivial change
- [ ] Verify Gandalf (PR validation bot) comments within 60 seconds
- [ ] Verify autograding runs and reports a score
- [ ] Verify a feedback pull request was created by Classroom
- [ ] Close Challenge 1 and verify Challenge 2 is created by the Progression Bot
- [ ] Accept the Day 2 invite with the same test account
- [ ] Verify Challenge 10 issue appears in the Day 2 repo
- [ ] Repeat the PR test for the Day 2 repository
- [ ] Delete the test student repositories when done

### Seeding the first challenge

After a student accepts the assignment, seed the first challenge from this repository:

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 1 -Assignee studentname
```

For Day 2, use `-Challenge 10`.

### Seeding peer simulation

Because each learning room repository is private, students cannot automatically see a classmate's issues or pull requests. To preserve realistic collaboration without exposing private student repos, peer-simulation artifacts are seeded into each student's repository automatically: the Student Progression Bot creates them the first time it opens a challenge issue, and repairs them on later runs if any are missing. No facilitator action is required.

This creates two peer-simulation issues and one peer-simulation pull request. Challenges that ask students to comment, react, review, compare, or practice peer collaboration can use those seeded artifacts. If facilitators intentionally provision real buddy access, students may use real buddy repositories instead.

### Triggering merge conflict practice

Challenge 7 needs a real conflict. After the student has edited `docs/welcome.md` on their challenge branch and opened a pull request, run:

```powershell
scripts/classroom/Start-MergeConflictChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -StudentBranch learn/studentname
```

The script changes the same TODO area on `main`, which should cause the student's pull request to report a merge conflict if they edited that TODO on their branch.

### Autograder workflow verification

All autograded checks now run as GitHub Actions workflows inside each student repo (not as Classroom test cases). To verify they work:

1. In the test student repo, create a branch and make a change that should pass a check
2. Open a PR
3. Go to the **Actions** tab and verify the relevant `autograder-*` workflow ran
4. On the PR (or relevant issue) confirm a comment was posted reporting pass or fail
5. Push a change that should fail a check and verify the comment updates in place

### Gandalf verification

1. Open a PR without a `Closes #XX` reference
2. Verify Gandalf posts a comment asking for an issue link
3. Comment `@gandalf-bot I have a merge conflict, can you explain this?`
4. Verify the comment responder replies with guidance

---

## Step 7: Day-of-Workshop Facilitation

### Before students arrive

- [ ] Verify the classroom dashboard loads at [classroom.github.com](https://classroom.github.com)
- [ ] Have both invite links ready to share (on-screen, in chat, or printed on cards)
- [ ] Open the [grading-guide.md](grading-guide.md) for reference during the day
- [ ] Have the [Challenge Hub](../docs/CHALLENGES.md) open in a browser tab

### During the workshop

**Monitor the classroom dashboard:** It shows accepted assignments, recent commits, and autograding results in real time.

**Common student issues and fixes:**

| Issue | What to Do |
|---|---|
| "I cannot find the invite link" | Reshare the link; post it in the workshop chat channel |
| "My next challenge did not appear" | The student may not have closed the previous issue; check their Issues tab |
| "The autograder bot says I failed" | Open the Actions tab in the student repo and read the failing `autograder-*` workflow log; the bot comment links to the run |
| "I do not see the feedback PR" | It appears after the first push; have them make any commit and push |
| "Gandalf did not comment on my PR" | Check the Actions tab in the student repo; workflows may need to be enabled |
| "Assignment not showing my work" | Student may have pushed to the wrong branch; check their repo's branches |

### Using the feedback PR

The feedback pull request is Classroom's built-in channel for async facilitator comments:

1. Open a student's repository from the classroom dashboard
2. Go to the **Pull Requests** tab
3. Open the feedback PR (titled "Feedback")
4. Leave comments, encouragement, and guidance here
5. Students receive email notifications for your comments

---

## How Challenges Flow Through the System

### Challenge progression

The Student Progression Bot manages the entire challenge sequence. Each student works through challenges independently in their own repo:

#### Day 1 (Assignment 1): Challenges 1-9

| Challenge | Title | How it completes | Gandalf validates | Autograded |
|---|---|---|---|---|
| 1 | Find Your Way Around | Close issue | -- | -- |
| 2 | File Your First Issue | Close issue | -- | -- |
| 3 | Join the Conversation | Close issue | -- | -- |
| 4 | Branch Out | Close issue | -- | Yes (branch exists) |
| 5 | Make Your Mark | Close issue | -- | Yes (file edited) |
| 6 | Open Your First Pull Request | Close issue | Yes (PR structure) | Yes (issue reference) |
| 7 | Survive a Merge Conflict | Close issue | Yes (PR feedback) | Yes (no conflict markers) |
| 8 | The Culture Layer | Close issue | -- | -- |
| 9 | Merge Day | Close issue | Yes (merge) | Yes (PR merged) |

#### Day 2 (Assignment 2): Challenges 10-16 + Bonus

| Challenge | Title | How it completes | Gandalf validates | Autograded |
|---|---|---|---|---|
| 10 | Go Local | Close issue | -- | Yes (local commit) |
| 11 | Open a Day 2 PR | Close issue | Yes (PR structure) | Yes (local push) |
| 12 | Review Like a Pro | Close issue | -- | Yes (review comment) |
| 13 | AI as Your Copilot | Close issue | -- | -- |
| 14 | Template Remix | Close issue | -- | Yes (YAML valid) |
| 15 | Meet the Agents | Close issue | -- | -- |
| 16 | Capstone Project | Close issue | -- | Yes for Accessibility Agents path; facilitator review for GLOW or another project |
| A-E | Bonus challenges | Close issue | -- | -- |

### Challenges that cannot be automated

Challenges 1, 2, 3, 8, 13, and 15 are evaluated manually using the [grading-guide.md](grading-guide.md). The Progression Bot still unlocks the next challenge when the student closes the issue -- the facilitator reviews evidence in the issue comments.

---

## Post-Workshop

Follow the [teardown-checklist.md](teardown-checklist.md) for complete post-workshop steps. The key actions:

1. **Export grades** from the classroom dashboard
2. **Archive the classroom** in the Classroom UI (this preserves student repos as read-only portfolio pieces)
3. **Review feedback** and update facilitation notes for next cohort
4. **Route ongoing learner support** to [Community-Access/support](https://github.com/Community-Access/support)

---

## Customization Options

### Adjusting deadlines

Edit the assignment deadline in the Classroom UI at any time. Students who already accepted will see the updated deadline.

### Adding or removing autograding tests

Modify tests in the Classroom UI:

1. Open the assignment
2. Scroll to **Autograding**
3. Add, edit, or remove individual tests
4. Changes apply to all future student pushes (not retroactively)

### Changing point values

The point values in the JSON files are suggestions. Adjust them in the Classroom UI to match your grading approach. The [grading-guide.md](grading-guide.md) has recommended completion thresholds.

### Disabling autograding

If you prefer manual-only grading, skip adding the autograding tests when creating the assignment. Gandalf and the Progression Bot still work independently of autograding.

---

## Legacy Notes

Previous versions of this workshop used a shared "multi-player sandbox" repository model where a facilitator manually provisioned challenge issues for each student using PowerShell scripts (`create_all_challenges.ps1` and `create_student_issues.ps1`). That approach required:

- Creating a per-cohort `learning-room-[cohort]` repository from the template
- Inviting all students to the GitHub organization
- Running batch scripts to create challenge issues per student via the GitHub API (the scripts split chapters into sub-challenges like 04.1, 04.2, 04.3, totaling 26 issues per student)
- Updating curriculum links with find-and-replace across all Markdown files

The current model replaces all of that with GitHub Classroom. Each student gets their own private repo automatically when they accept the invite link, and the Student Progression Bot handles challenge delivery. The legacy scripts are preserved in the repository's Git history for reference but are no longer needed for deployment.

Key decisions preserved from the legacy scripts:

- The scripts defined 26 sub-challenges across chapters 4-16, which the current system consolidates into 16 core challenges + 5 bonus challenges (21 total)
- Challenges used two submission types: issue comment (evidence-based) and PR with `Closes #XX` (code-based)
- The script was idempotent -- safe to rerun for late-joining students
- Labels followed the pattern: `challenge`, `challenge: [level]`, `skill: [tag]`, `day: [1 or 2]`

## After the Workshop

See [teardown-checklist.md](teardown-checklist.md) for the complete post-workshop cleanup process, including:

- Exporting grades from the classroom dashboard
- Archiving the classroom
- Cleaning up student repositories
- Documenting facilitator notes for the next cohort

## Reference Links

- [GitHub Classroom documentation](https://docs.github.com/en/education/manage-coursework-with-github-classroom)
- [Autograding documentation](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/use-autograding)
- [Facilitator Guide](../admin/FACILITATOR_GUIDE.md) -- workshop-level facilitation reference
- [Challenge Hub](../docs/CHALLENGES.md) -- all 21 challenges with instructions
- [Solutions Directory](../docs/solutions/) -- reference solutions for facilitator use
- [Grading Guide](grading-guide.md) -- per-challenge rubric and completion levels
- [Support Hub Operations](../admin/SUPPORT_HUB_OPERATIONS.md) -- operating model for async support after the workshop

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **How the Workshop Works:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Prerequisites:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **How Challenges Flow Through the System:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Post-Workshop:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Customization Options:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Legacy Notes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **After the Workshop:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Reference Links:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
