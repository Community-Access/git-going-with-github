# GitHub Classroom Setup Guide

> Complete guide for creating, configuring, and managing a Git Going with GitHub workshop cohort using GitHub Classroom. This guide covers everything from initial setup through post-workshop teardown.

## What GitHub Classroom Does

GitHub Classroom is an assignment distribution engine. When a student accepts an assignment:

1. Classroom forks the template repository into the student's own private copy
2. Autograding workflows run automatically on every push
3. A feedback pull request is created for facilitator comments
4. The classroom dashboard shows progress across all students

For this workshop, Classroom handles the infrastructure so facilitators can focus on teaching and mentoring.

### Architecture Overview

```text
Community-Access/learning-room-template (template repo)
    |
    +--> [Classroom clones per student]
    |       student-a/learning-room-student-a
    |       student-b/learning-room-student-b
    |       ...
    |
    +--> Autograding workflows run in each student repo
    |       autograder-conflicts.yml   (Challenge 07)
    |       autograder-local-commit.yml (Challenge 10)
    |       autograder-template.yml    (Challenge 14)
    |       pr-validation-bot.yml      (all PR challenges)
    |
    +--> Feedback PRs (one per student, created by Classroom)
            Facilitators comment here for async feedback

Community-Access/accessibility-agents (upstream target)
    |
    +--> autograder-capstone.yml (Challenge 16)
            Validates agent file structure in real PRs
```

### What Is in This Directory

| File | Purpose |
|---|---|
| [assignment-day1-you-belong-here.md](assignment-day1-you-belong-here.md) | Assignment description for Day 1 (paste into Classroom UI) |
| [assignment-day2-you-can-build-this.md](assignment-day2-you-can-build-this.md) | Assignment description for Day 2 (paste into Classroom UI) |
| [autograding-day1.json](autograding-day1.json) | Test definitions for Day 1 autograder |
| [autograding-day2.json](autograding-day2.json) | Test definitions for Day 2 autograder |
| [grading-guide.md](grading-guide.md) | Facilitator rubric for all 21 challenges |
| [roster-template.csv](roster-template.csv) | Starter CSV for importing student roster |
| [teardown-checklist.md](teardown-checklist.md) | Post-workshop cleanup steps |


## Prerequisites

Before creating your first classroom, confirm the following:

- [ ] You have **Owner** or **Admin** access to the Community-Access GitHub organization
- [ ] Your facilitator GitHub account has a verified email address
- [ ] The `Community-Access/learning-room-template` repository is public (or the classroom org has read access)
- [ ] You have the student list (GitHub usernames are required; real names are optional)
- [ ] You have confirmed dates for Day 1 and Day 2
- [ ] You have tested that GitHub Actions are enabled on the organization (Settings then Actions then General)


> **Note on Automation:** While we use scripts to automate repository creation and API settings, GitHub deliberately restricts Classroom creation to the Web GUI to prevent spam. You will need to click through the creation screens, but all assets (rosters, test payloads, config values) have been templated for you in this directory.

## Phase 1: Create the Classroom

1. Go to [classroom.github.com](https://classroom.github.com) and sign in with your facilitator account
2. Click **New classroom**
3. Select the **Community-Access** organization (if you do not see it, accept the GitHub Classroom invitation from your org admin)
4. Name the classroom using this pattern: `Git Going - [Cohort Name] - [Month Year]`
   - Example: `Git Going - Spring Cohort - March 2026`
   - Example: `Git Going - Seattle Accessibility Bootcamp - June 2026`
5. **Skip the TA / co-teacher setup** -- facilitators use organization-level permissions instead
6. Click **Create classroom**


## Phase 2: Import the Student Roster

The roster links GitHub usernames to student identities.

1. Open the classroom you just created
2. Go to **Settings** (gear icon) then **Roster Management**
3. Click **Import from CSV**
4. Upload a completed version of [roster-template.csv](roster-template.csv):

```csv
identifier,name,email
octocat,The Octocat,octocat@example.com
student-a,Alice Student,alice@example.com
```

- The `identifier` column **must** match the student's exact GitHub username
- `name` and `email` are optional but helpful for facilitator reference
- Students who are not on the roster can still accept the assignment; they will appear as "unidentified"

5. Verify all expected students appear in the roster list
6. Students can be added later -- the roster is not locked


## Phase 3: Create Assignment 1 -- You Belong Here (Day 1)

This assignment covers Challenges 01 through 09 (Day 1 of the workshop).

1. From the classroom dashboard, click **New assignment**
2. Fill in the assignment settings:

| Setting | Value |
|---|---|
| **Title** | You Belong Here |
| **Type** | Individual |
| **Visibility** | Private (student repos are only visible to the student and facilitators) |
| **Template repository** | `Community-Access/learning-room-template` |
| **Grant students admin access** | No |
| **Enable feedback pull requests** | Yes |
| **Deadline** | End of Day 1 for this cohort (deadline is soft -- late work is still accepted) |

3. **Assignment description:** Open [assignment-day1-you-belong-here.md](assignment-day1-you-belong-here.md), copy everything below the HTML metadata comment, and paste it into the description field
4. **Autograding tests:** Open [autograding-day1.json](autograding-day1.json) and add each test entry manually:
   - For each test in the JSON array, click **Add test**
   - Set the **Test name**, **Run command**, **Comparison**, and **Points** to match the JSON values
   - Set timeout to 60 seconds per test unless otherwise specified

5. Click **Create assignment** (this generates your Day 1 invite link)


## Phase 4: Create Assignment 2 -- You Can Build This (Day 2)

This assignment covers Challenges 10 through 16 plus the 5 bonus challenges.

1. Click **New assignment** again
2. Fill in the settings:

| Setting | Value |
|---|---|
| **Title** | You Can Build This |
| **Type** | Individual |
| **Visibility** | Private |
| **Template repository** | `Community-Access/learning-room-template` |
| **Grant students admin access** | No |
| **Enable feedback pull requests** | Yes |
| **Deadline** | One week after Day 2 (gives students time for the capstone and bonus challenges) |

3. **Assignment description:** Use [assignment-day2-you-can-build-this.md](assignment-day2-you-can-build-this.md)
4. **Autograding tests:** Use [autograding-day2.json](autograding-day2.json)
5. Click **Create assignment** (this generates your Day 2 invite link)


## Phase 5: Share Invite Links

Each assignment has a unique invite URL that students click to accept the assignment.

### Where to Add the Links

1. Copy the **Day 1 invite URL** from the assignment page
2. In the `git-going-with-github` repository, open `DAY1_AGENDA.md` and replace the `[INVITE_LINK]` placeholder
3. Copy the **Day 2 invite URL**
4. Open `DAY2_AGENDA.md` and replace its `[INVITE_LINK]` placeholder
5. Optionally, email the invite links directly to students before the workshop

### What Students See When They Click

1. GitHub shows a "Join classroom" page if they are not already on the roster
2. If on the roster, they see "Accept this assignment"
3. After accepting, GitHub creates their private fork within 30-60 seconds
4. The student's repository URL follows the pattern: `github.com/Community-Access-Classroom/learning-room-[username]`


## Phase 6: Verify Everything Works

Run this verification with a test account before the workshop. Do not skip this step.

### Quick Verification Checklist

- [ ] Accept the Day 1 invite with a test GitHub account
- [ ] Verify a student repository was created under the classroom org
- [ ] Verify the learning-room template files are present (docs/welcome.md, docs/keyboard-shortcuts.md, docs/setup-guide.md)
- [ ] Open a test PR with a trivial change
- [ ] Verify the PR validation bot comments within 60 seconds
- [ ] Verify autograding runs and reports a score
- [ ] Verify a feedback pull request was created by Classroom
- [ ] Accept the Day 2 invite with the same test account
- [ ] Repeat the PR test for the Day 2 repository
- [ ] Delete the test student repositories when done

### Autograding Verification

To test that specific autograding checks work:

1. In the test student repo, create a branch and make a change that should pass a check
2. Open a PR
3. Go to the **Actions** tab and verify the autograding workflow ran
4. Check the workflow output -- each test should report pass or fail correctly
5. Try a change that should fail a check and verify it catches the problem


## Phase 7: Day-of-Workshop Facilitation

### Before Students Arrive

- [ ] Verify the classroom dashboard loads at [classroom.github.com](https://classroom.github.com)
- [ ] Have both invite links ready to share (on-screen, in chat, or printed on cards)
- [ ] Open the [grading-guide.md](grading-guide.md) for reference during the day
- [ ] Have the [Challenge Hub](../docs/CHALLENGES.md) open in a browser tab

### During the Workshop

**Monitor the classroom dashboard:** It shows the number of accepted assignments, recent commits, and autograding results in real time.

**Common student issues and fixes:**

| Issue | What to Do |
|---|---|
| "I cannot find the invite link" | Reshare the link; post it in the workshop chat channel |
| "Assignment not showing my work" | Student may have pushed to wrong branch; check their repo's branches |
| "Autograding says I failed" | Check the workflow output; often a formatting issue; use it as a teaching moment |
| "I do not see the feedback PR" | It appears after the first push; have them make any commit and push |
| "The bot did not comment on my PR" | Check Actions tab in the student repo; may need to enable workflows |

### Using the Feedback PR

The feedback pull request is Classroom's built-in channel for async facilitator comments:

1. Open a student's repository from the classroom dashboard
2. Go to the **Pull Requests** tab
3. Open the feedback PR (titled "Feedback")
4. Leave comments, encouragement, and guidance here
5. Students receive email notifications for your comments


## How Autograding Maps to Challenges

The autograding JSON files define automated tests that check for objective evidence of challenge completion:

### Day 1 Tests (from autograding-day1.json)

| Test | Challenge | What It Checks |
|---|---|---|
| Branch exists | 04: Branch Out | At least one non-main branch exists |
| File edited | 05: Make Your Mark | A file on a branch differs from the original |
| PR structure | 06: First PR | PR has title, body, and issue reference |
| No conflict markers | 07: Merge Conflict | Changed files contain no `<<<<<<<` or `>>>>>>>` markers |
| Merge status | 09: Merge Day | At least one PR has been merged |

### Day 2 Tests (from autograding-day2.json)

| Test | Challenge | What It Checks |
|---|---|---|
| Local clone signature | 10: Go Local | Commit author does not match the GitHub web editor pattern |
| PR from local | 11: Day 2 PR | A PR exists with commits pushed from a local Git client |
| Review comment | 12: Code Review | Student left a review comment on another student's PR |
| Template file exists | 14: Issue Template | A `.yml` file exists in `.github/ISSUE_TEMPLATE/` with valid frontmatter |
| Capstone structure | 16: Capstone | Agent file exists with `name`, `description`, and `responsibilities` fields |

Tests that cannot be automated (like Challenge 03: Join the Conversation or Challenge 08: Culture) are evaluated manually using the [grading-guide.md](grading-guide.md).


## Customization Options

### Adjusting Deadlines

Edit the assignment deadline in the Classroom UI at any time. Students who already accepted the assignment will see the updated deadline.

### Adding or Removing Tests

Modify the autograding tests in the Classroom UI:

1. Open the assignment
2. Scroll to **Autograding**
3. Add, edit, or remove individual tests
4. Changes apply to all future student pushes (not retroactively)

### Changing Point Values

The point values in the JSON files are suggestions. Adjust them in the Classroom UI to match your grading approach. The [grading-guide.md](grading-guide.md) has recommended completion thresholds.

### Disabling Autograding

If you prefer manual-only grading, skip adding the autograding tests when creating the assignment. The PR validation bot and feedback PRs will still work.


## After the Workshop

See [teardown-checklist.md](teardown-checklist.md) for the complete post-workshop cleanup process, including:

- Exporting grades from the classroom dashboard
- Archiving the classroom
- Cleaning up student repositories
- Documenting facilitator notes for the next cohort


## Reference Links

- [GitHub Classroom documentation](https://docs.github.com/en/education/manage-coursework-with-github-classroom)
- [Autograding documentation](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/use-autograding)
- [Facilitator Guide](admin/FACILITATOR.md) -- workshop-level facilitation reference
- [Challenge Hub](../docs/CHALLENGES.md) -- all 21 challenges with instructions
- [Solutions Directory](../docs/solutions/) -- reference solutions for facilitator use
- [Grading Guide](grading-guide.md) -- per-challenge rubric and completion levels
