# Facilitator Operations Guide

This section is for facilitators and administrators managing the workshop challenge system.


##  Pre-Workshop Setup (Facilitator Only)

### Step 1: Prepare the Student List

Get a CSV or list of GitHub usernames for all workshop participants:

```
accesswatch
amandarush
andysq62
apelli95
arqamgrt
...
```

Save this list as `student-usernames.txt` in the repository root (commit it but don't modify between workshops).

### Step 2: Generate Challenge Issues

**Use the batch issue generator script:**

```bash
python scripts/batch_create_challenges.py \
  --students student-usernames.txt \
  --chapters 4,5,6,11 \
  --cohort "March 2026"
```

This creates:
- Challenge 4.1, 4.2, 4.3 (one set per student)
- Challenge 6.1, 5.2, 5.3 (one set per student)
- Challenge 7.1 (one per student)
- Challenge 11.1, 11.2, 11.3 (one set per student)

**Total generated:** 10 issues per student (for these 4 chapters). Example: 12 students = 120 issues.

### Step 3: Verify Generation

Check that issues were created:

```bash
# List all challenges by label
gh issue list --label challenge --limit 100

# Count issues by chapter
gh issue list --label challenge --label "skill: github-issues" --limit 100
```

Each issue should:
-  Have the student's `@username` in the title
-  Be assigned to that student
-  Have labels: `challenge`, level label, skill label, day label
-  Have a clear, complete description with links to this hub and the chapter docs
-  Have a link to the full Challenge Hub

### Step 4: Set Up Bot Validation (Optional)

If using PR bot validation for Chapters 4, 5, 6, 11:

```bash
# Verify the PR validation workflow exists
ls .github/workflows/learning-room-pr-bot.yml

# Check bot configuration
cat .github/scripts/validate-pr.js
```

The bot automatically validates PRs that reference challenge issues.

### Step 5: Brief Students

In your opening welcome, say:

> "You have 30+ challenges pre-assigned to you. Go to the **Issues** tab, filter by your username, and your challenges appear. Click any issue to read the full instructions. Complete the challenge, open a PR that says `Closes #XX`, and watch the bot validate your work. When it passes, merge and move to the next challenge."

**That's it.** Instructions are self-contained in the issues and the Challenge Hub.


##  Managing Challenges During the Workshop

### Monitoring Student Progress

**Real-time dashboard:**

```bash
# See all open challenges by chapter
gh issue list --label challenge --label "day: 1" --state open

# See which students have uncompleted challenges
gh issue list --label challenge --assignee @USERNAME --state open

# See completed challenges (auto-closed on PR merge)
gh issue list --label challenge --state closed --limit 20
```

### Responding to Help Requests

When a student says **"I'm stuck on Challenge 4.2":**

1. Open their issue: `gh issue view [issue_number]`
2. See the exact challenge description
3. Review the "If You Get Stuck" section in the issue
4. Post a comment with: "Let me help. Try [step] next. Let me know how it goes."

The issue becomes a support thread. Every comment builds evidence of learning.

### Validating Difficult Challenges

For challenges **without bot validation** (Chapters 5, 8-10, 12-16):

1. Review the student's PR or issue comment
2. Look for: clear evidence, correct steps, good explanation
3. Comment: "Great work! Your [X] shows you understand [concept].  Moving you to the next challenge."
4. Leave the PR open or issue open - don't auto-merge/close until you've reviewed

### Troubleshooting Failed Bot Validation

If a student's PR fails bot checks:

1. Read the bot's comment carefully - it explains exactly what failed
2. Ask: "Can you check the bot comment and try [specific fix]?"
3. Have them push again - bot re-validates automatically
4. If it's a real bot bug, flag it for later and manually approve the PR


##  Post-Workshop Cleanup

### Step 1: Archive Old Issues

After the workshop ends:

```bash
# Close all challenge issues for this cohort
gh issue list --label challenge --state open \
  | xargs -I {} gh issue close {} --comment "Cohort complete. Thanks for participating!"
```

Issues remain searchable, but students know they're closed.

### Step 2: Update the Student List

For the **next cohort**, update `student-usernames.txt` with new usernames and re-run the batch script.

The script will:
- Create fresh issues with the new usernames
- Auto-assign to new students
- Old issues stay archived and searchable (great for future reference)

### Step 3: Refresh Issue Templates

Before running the batch script for a new cohort:

```bash
# Verify templates are up to date
ls -la .github/ISSUE_TEMPLATE/challenge-chapter-*.md

# Update if chapter content changed
git pull origin main
```

The templates pull from the chapter documentation, so they're always fresh.


##  Challenge Metadata

### Issue Labels (Standard Across All Challenges)

| Label | Purpose | Values |
|-------|---------|--------|
| `challenge` | Marks an issue as a workshop challenge | Always applied |
| Level | Difficulty | `challenge: beginner`, `challenge: intermediate` |
| Skill | Topic | `skill: github-issues`, `skill: pull-requests`, `skill: git-source-control`, etc. |
| Day | When assigned | `day: 1` (Chapters 2-10) or `day: 2` (Chapters 11-16) |

### Issue Title Convention

```
Chapter X.Y: [Challenge Name] (@YOUR_USERNAME)
```

**Example:**
```
Chapter 4.1: Create Your First Issue (@accesswatch)
Chapter 6.2: Open Your First Pull Request (@amandarush)
Chapter 11.3: Push to GitHub (@andysq62)
```

This makes it **instantly clear** which challenge, which chapter, which student.


##  Automation & Bot Validation

### Challenges with Automatic Validation

These chapters have PR bot validation:

| Chapter | Bot Checks | What It Validates |
|---------|-----------|------------------|
| **4: Issues** |  PR bot | `Closes #XX`, evidence issue reference, created issue quality |
| **5: Pull Requests** |  PR bot | `Closes #XX` syntax, Markdown, accessibility |
| **6: Merge Conflicts** |  PR bot | Clean conflict resolution, commit message |
| **11: Git & Source Control** |  PR bot | Branch name, commit presence, push success |
| **12-16** | Manual | Facilitator reviews |

### How PR Bot Works (Behind the Scenes)

1. Student opens PR with `Closes #ISSUE_NUMBER`
2. GitHub workflow (`.github/workflows/learning-room-pr-bot.yml`) triggers
3. Bot script (`.github/scripts/validate-pr.js`) checks:
   -  PR references an issue with `Closes #`
   -  Changed files are in appropriate folder (`learning-room/docs/`)
   -  Markdown syntax is valid
   -  No major accessibility violations (heading hierarchy, link text, alt text)
4. Bot posts a comment with pass/fail status and specific fixes
5. Student pushes fixes, bot re-validates automatically
6. When all checks pass, bot approves the PR

### Disabling Bot Checks (If Needed)

If a student hits a false positive:

```bash
# Temporarily disable the workflow
gh workflow disable learning-room-pr-bot

# After manual review, re-enable
gh workflow enable learning-room-pr-bot
```

Then manually approve the PR.


##  Success Metrics

### Track These During the Workshop

**Participation:**
- Issues claimed per chapter
- PRs opened per chapter
- Bot validation pass rate (% of PRs that passed checks on first try)

**Quality:**
- Average comments per issue (discussion depth)
- Review feedback quality (are students helping each other?)
- Merge rate (% of PRs that merged without changes)

**Support Load:**
- "I'm stuck" comments per day (indicates challenge clarity)
- Bot validation failures per day (indicates if bot is too strict)

**Example Command:**
```bash
# See bot validation pass rate
gh issue list --label challenge --state closed --limit 50 | \
  jq '.[] | .pull_request' | \
  xargs -I {} gh pr view {} --json statusCheckRollup
```


##  File References

### Templates Used by Batch Script

- `.github/ISSUE_TEMPLATE/challenge-chapter-4.md` - Chapter 4 issues
- `.github/ISSUE_TEMPLATE/challenge-chapter-5.md` - Chapter 6 issues
- `.github/ISSUE_TEMPLATE/challenge-chapter-6.md` - Chapter 7 issues
- `.github/ISSUE_TEMPLATE/challenge-chapter-11.md` - Chapter 11 issues

### Bot Validation

- `.github/workflows/learning-room-pr-bot.yml` - Workflow trigger
- `.github/scripts/validate-pr.js` - Validation logic
- `learning-room/bot-config.json` - Bot rules and exceptions

### Student Documentation

- `docs/CHALLENGES.md` - Master challenge hub (YOU ARE HERE)
- `docs/05-working-with-issues.md` - Chapter 4 detailed guide
- `docs/06-working-with-pull-requests.md` - Chapter 6 detailed guide
- `docs/14-git-in-practice.md` - Chapter 11 detailed guide


##  FAQ - Facilitators

### "A student claims they completed a challenge but I don't see evidence"

Check the PR that references their issue:
```bash
gh pr list --assignee @STUDENT_USERNAME --state merged
```

If there's no PR, the issue is still open and they haven't submitted. Guide them to open a PR.

### "The bot gave false positive feedback. Can I manually approve?"

Yes:
1. Review the PR manually
2. Comment: `@github-actions approve` (workflow-dependent)
3. Or manually merge if you have permissions
4. Update the bot config if this is a pattern

### "I want to add challenges for Chapters 12-16"

The challenge hub already has them! But they're **manual validation** (no bot). You can:
1. Create issues using the same template pattern
2. Review student submissions manually
3. Close issues when quality is good

### "Can students skip chapters?"

It's possible but not recommended. The arc builds: Ch 4 (issues) → Ch 6 (PRs) → Ch 7 (conflicts) → Ch 11 (local Git). Each depends on the previous.

*Recommended:* "Try them in order first. You can skip only if you've already mastered that skill."

### "How do I know if my bot configuration is too strict?"

Track daily: "How many students needed bot help and retries?"

If >80% of students need retries → bot might be too strict. Relax rules or add exceptions.


##  Final Checklist (Pre-Workshop)

- [ ] `student-usernames.txt` committed and updated
- [ ] Batch script runs without errors: `python scripts/batch_create_challenges.py --dry-run`
- [ ] Expected challenge issues created (students × 10 for Chapters 4,5,6,11)
- [ ] Each issue has correct labels, assignment, and description
- [ ] Bot workflow is enabled: `gh workflow list | grep learning-room`
- [ ] PR bot script is in place: `.github/scripts/validate-pr.js` exists
- [ ] Challenge Hub is accessible: `docs/CHALLENGES.md`
- [ ] README.md directs to Challenge Hub clearly
- [ ] All chapter docs (4-16) link to their challenge issues
- [ ] Facilitators understand the "How to Monitor Progress" section
- [ ] Dry run: one facilitator completes one challenge end-to-end as a test

**This checklist ready? You're go for launch.** 

