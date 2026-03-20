# Facilitator Operations Guide

How to monitor, support, and troubleshoot the workshop challenge system during a live cohort. For deployment and classroom setup, see the [Workshop Deployment Guide](../classroom/README.md).


## How the Challenge System Works

Each student gets a **private repository** from GitHub Classroom. Inside that repo, three automation systems run independently:

| System | What it does |
|---|---|
| **Student Progression Bot** | Creates the next challenge issue when the student closes the current one |
| **Aria (PR Validation Bot)** | Validates PR structure, welcomes first-timers, responds to `@aria-bot` help |
| **Autograders** | Runs automated tests on specific challenges to verify completion evidence |

Challenges are sequential. A student cannot see Challenge 5 until they close Challenge 4. This keeps students focused and prevents overwhelm.


## Monitoring Student Progress

### GitHub Classroom Dashboard

The primary monitoring tool is the classroom dashboard at [classroom.github.com](https://classroom.github.com):

- **Accepted assignments** -- how many students have started
- **Recent commits** -- who is actively working
- **Autograding results** -- pass/fail per student per test

### Checking Individual Students

To inspect a specific student's repo, open it from the classroom dashboard or navigate directly:

```bash
# Open the student's repo from the classroom org
# Pattern: Community-Access-Classroom/learning-room-[username]

# List open challenge issues in a student's repo
gh issue list --repo Community-Access-Classroom/learning-room-studentname --state open

# List closed (completed) challenges
gh issue list --repo Community-Access-Classroom/learning-room-studentname --state closed
```

### Identifying Students Who Are Stuck

Look for these signals on the classroom dashboard:

- Student accepted the assignment but has zero commits (may need help getting started)
- Student has not closed an issue in over an hour (may be stuck on a challenge)
- Autograding shows repeated failures (may need guidance on what the test expects)


## Responding to Help Requests

### When a Student Says "I am stuck"

1. Open their repo from the classroom dashboard
2. Check which challenge issue is open -- that is where they are stuck
3. Read the challenge instructions in the issue body (every challenge includes a "If You Get Stuck" section)
4. Comment on their issue: "Let me help. Try [specific step] next. Let me know how it goes."

The issue becomes a support thread. Every comment builds evidence of learning.

### When a Student Uses @aria-bot

Students can comment `@aria-bot` followed by a question on any PR. Aria responds automatically with guidance. If Aria's response is insufficient:

1. Read Aria's reply to understand what it already covered
2. Add your own comment with more specific guidance
3. No need to disable Aria -- your comment supplements the bot's response

### Priority Intervention Triggers

Act immediately when you see:

- A student closes 3+ issues within 2 minutes (they may be closing without completing -- check for evidence)
- A student has zero activity for over 90 minutes after accepting (they may be lost)
- Aria posts an error or does not respond to a PR within 60 seconds (workflow may be disabled)


## Validating Challenges

### Challenges with Automatic Validation

These challenges have autograding tests that verify completion:

| Challenge | What the autograder checks |
|---|---|
| 4 - Branch Out | Branch exists with correct naming |
| 5 - Make Your Mark | File was edited on the branch |
| 6 - Your First Pull Request | PR references an issue with `Closes #` |
| 7 - Resolve a Merge Conflict | No conflict markers remain in the file |
| 9 - Merge Day | PR was merged successfully |
| 10 - Go Local | Local commit was pushed to GitHub |
| 11 - Open a Day 2 PR | Push from local to remote succeeded |
| 12 - Review Like a Pro | Review comment exists on a PR |
| 14 - Template Remix | YAML file passes validation |
| 16 - Build Your Agent (Capstone) | Agent file is present and structured correctly |

### Challenges That Require Manual Review

Challenges 1, 2, 3, 8, 13, and 15 do not have autograders. The Progression Bot still unlocks the next challenge when the student closes the issue. Facilitators review the evidence in the issue comments using the [grading guide](../classroom/grading-guide.md).

What to look for:
1. Clear evidence the student completed the task (screenshot description, pasted output, or linked artifact)
2. Correct application of the concept (not just clicking through)
3. Genuine engagement (not copy-pasting the example verbatim)

Comment on the issue: "Great work! Your [specific thing] shows you understand [concept]."


## Troubleshooting

### Progression Bot Did Not Create the Next Challenge

**Symptoms:** Student closes an issue but no new issue appears.

**Possible causes:**
- The student edited the issue title (the bot matches on title pattern)
- GitHub Actions is disabled in the student's repo
- The workflow file was deleted or corrupted during a student's edit

**Fix:**
1. Check the Actions tab in the student's repo for workflow run errors
2. If the workflow did not trigger, verify `.github/workflows/student-progression.yml` exists
3. If the file is missing, the student may have accidentally deleted it -- restore from the template
4. As a last resort, manually create the next challenge issue using the issue template

### Aria Did Not Comment on a PR

**Symptoms:** Student opens a PR but Aria does not respond.

**Possible causes:**
- Workflow permissions: the repo may need `GITHUB_TOKEN` write access
- The PR validation workflow is not enabled
- The student opened the PR against a branch other than `main`

**Fix:**
1. Go to the student's repo > Settings > Actions > General
2. Verify "Read and write permissions" is selected for workflow permissions
3. Check the Actions tab for the `pr-validation-bot` workflow -- did it trigger?
4. If it triggered but failed, read the error log for specifics

### Autograding Reports a Failure the Student Believes Is Wrong

**Symptoms:** Student completed the challenge correctly but the autograder fails.

**Fix:**
1. Open the student's repo > Actions tab > most recent autograding run
2. Read the test output to see what specifically failed
3. Common false failures:
   - File is in the wrong directory (student created it in repo root instead of `docs/`)
   - Branch name does not match expected pattern (case sensitivity)
   - YAML has a formatting error the student cannot see
4. Guide the student to fix the specific issue
5. The autograder reruns automatically on the next push

### Student Cannot Accept the Invite Link

**Symptoms:** Student clicks the invite but gets an error or cannot see the assignment.

**Fix:**
1. Verify the student has a GitHub account and is signed in
2. If using a roster, confirm the student's GitHub username matches the roster entry exactly
3. Try having the student open the link in an incognito/private window to rule out caching
4. If persistent, add the student to the roster manually from the classroom settings


## Challenge Metadata

### Labels

The Progression Bot applies these labels to each challenge issue it creates:

| Label | Purpose | Example values |
|---|---|---|
| `challenge` | Identifies the issue as a workshop challenge | Always applied |
| Level | Difficulty tier | `challenge: beginner`, `challenge: intermediate` |
| Skill | Topic category | `skill: github-issues`, `skill: pull-requests`, `skill: git-source-control` |
| Day | Workshop day | `day: 1` (Challenges 1-9), `day: 2` (Challenges 10-16) |

### Issue Title Convention

```
Challenge [NUMBER]: [Title]
```

Examples:
```
Challenge 1: Find Your Way Around
Challenge 7: Resolve a Merge Conflict
Challenge 16: Build Your Agent
```

The Progression Bot uses these exact titles. Do not rename challenge issues in student repos or the bot will not recognize them for sequencing.


## Automation File References

All automation files live in the student's repo (copied from the template):

| File | Purpose |
|---|---|
| `.github/workflows/student-progression.yml` | Progression Bot -- creates next challenge on issue close |
| `.github/workflows/pr-validation-bot.yml` | Aria -- PR feedback and `@aria-bot` responses |
| `.github/scripts/comment-responder.js` | Aria's response logic for `@aria-bot` mentions |
| `.github/workflows/autograder-conflicts.yml` | Validates Challenge 7 (merge conflicts) |
| `.github/workflows/autograder-local-commit.yml` | Validates Challenge 10 (local commit) |
| `.github/workflows/autograder-template.yml` | Validates Challenge 14 (YAML template) |
| `.github/workflows/autograder-capstone.yml` | Validates Challenge 16 (agent file) |


## Success Metrics

### Track During the Workshop

**Participation:**
- Assignments accepted (visible on classroom dashboard)
- Challenges completed per student (count of closed issues)
- Autograding pass rate (percentage of tests that pass on first push)

**Quality:**
- Comments per challenge issue (discussion depth)
- PR review engagement (are students reviewing each other's work?)
- Merge rate (percentage of PRs merged without facilitator intervention)

**Support Load:**
- Number of students requiring direct facilitator help per hour
- Autograding failures per hour (if high, may indicate unclear challenge instructions)
- Aria response failures (if any, indicates workflow configuration issue)


## FAQ

### "A student says they completed a challenge but the next one did not appear"

Check whether they actually **closed** the issue. Students sometimes comment "done" without clicking Close. Guide them to close the issue, and the Progression Bot will create the next challenge within seconds.

### "Can students skip challenges?"

Not by default. The Progression Bot creates challenges sequentially. If a student demonstrates mastery and you want to skip them ahead, manually create the next challenge issue using the appropriate issue template.

### "A student accidentally deleted a workflow file"

Restore it from the template. The easiest method:

1. Open the `Community-Access/learning-room-template` repo
2. Navigate to the missing file
3. Copy its contents
4. In the student's repo, create the file at the same path
5. Commit directly to `main`

### "How do I know if the autograder is too strict?"

Track the first-attempt pass rate on the classroom dashboard. If fewer than 50% of students pass a specific test on their first try, the test criteria may need adjustment. Update the test in the Classroom assignment settings -- changes apply to all future pushes.

### "Can I add more challenges mid-workshop?"

Yes. Add new issue templates to the `learning-room-template` repo and update the Progression Bot's challenge sequence in `student-progression.yml`. New challenges will only appear for students who have not yet passed the insertion point.


## Pre-Workshop Checklist

- [ ] Classroom created and assignments configured (see [Workshop Deployment Guide](../classroom/README.md))
- [ ] Roster imported with all expected student usernames
- [ ] Verification completed with a test account (Progression Bot, Aria, and autograding all confirmed working)
- [ ] Classroom dashboard loads and shows the assignments
- [ ] Facilitators have the classroom dashboard bookmarked
- [ ] [Grading guide](../classroom/grading-guide.md) reviewed by all facilitators
- [ ] Invite links ready to share (posted in agenda documents and available for chat/email)
- [ ] One facilitator has completed a full challenge end-to-end as a test run

