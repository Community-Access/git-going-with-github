# Challenge System Architecture Summary

## Overview

This document summarizes the complete challenge system architecture built for the Git-Going-With-GitHub workshop. It's designed to be:

- **Student-friendly**: Easy to discover, claim, complete, and track challenges
- **Facilitator-friendly**: Automated issue generation, bot validation, progress monitoring
- **Scalable**: Works for any cohort size with batch script
- **Self-documenting**: Every issue explains what to do and how bot validation works


## System Components

### 1. Challenge Discovery (Student-Facing)

**Primary Path:** GitHub Issues tab (pre-assigned by @username)
- Students go to Issues → filter by assignee
- See issues like: `Chapter 4.1: Create Your First Issue (@yourname)`
- Click issue → read full instructions → complete → PR with `Closes #XX`

**Secondary Paths:**
- GitHub Advanced Search: `is:issue assignee:@yourname label:challenge`
- Challenge Hub: [learning-room/docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) (expandable reference)

**Documentation Updates:**
- [README.md](README.md) - " Your Challenges Are Waiting" section (lines 100-120)
- [learning-room/docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) - Welcome + discovery methods (top section)

### 2. Challenge Templates (Issue Infrastructure)

Located in `.github/ISSUE_TEMPLATE/` (Chapters 4, 6, 11) and inline in `scripts/create_all_challenges.ps1` (Chapters 5, 8-10, 12-16):

| Chapter | Challenges | Submission | Bot Validated | Skill | Day | Status |
|---------|-----------|------------|---------------|-------|-----|--------|
| **04** Issues | 3 | Issue comment (evidence links) | No (manual) | github-issues | 1 | Created |
| **05** VS Code Accessibility | 1 | Issue comment | No | vs-code | 1 | Created |
| **06** Pull Requests | 3 | PR with `Closes #XX` | Yes | pull-requests | 1 | Created |
| **07** Merge Conflicts | 1 | PR with `Closes #XX` | Yes | merge-conflicts | 1 | Created |
| **08** Culture and Etiquette | 1 | Issue comment | No | collaboration | 1 | Created |
| **09** Labels, Milestones, Projects | 1 | Issue comment | No | triage | 1 | Created |
| **10** Notifications | 1 | Issue comment | No | notifications | 1 | Created |
| **11** Git Source Control | 3 | PR with `Closes #XX` | Yes | git-source-control | 2 | Created |
| **12** PR Extension | 2 | Issue comment | No | pr-extension | 2 | Created |
| **13** GitHub Copilot | 3 | Issue comment | No | copilot | 2 | Created |
| **14** Accessible Code Review | 2 | Issue comment | No | code-review | 2 | Created |
| **15** Issue Templates | 2 | Comment or PR | No | issue-templates | 2 | Created |
| **16** Accessibility Agents | 3 | Issue comment | No | agents | 2 | Created |

**Total: 26 challenges per student**

Chapters 6, 7, and 11 use PR-based submission with `Closes #XX` syntax. Chapter 4 uses issue-comment-based submission where students post evidence links on their assigned challenge issue (no branch or file editing required). All other chapters use issue-comment-based submission where students post evidence as a checklist comment.

**Template Contents:**
- YAML frontmatter with placeholders: `{CHAPTER}`, `{CHALLENGE_NUM}`, `{CHALLENGE_TITLE}`, `{USERNAME}`, `{ISSUE_NUMBER}`
- Challenge instructions with links to chapter docs
- "If You Get Stuck" guidance (5 escalation paths per challenge)
- Bot validation expectations (for automated chapters)
- Labels (challenge, level, skill, day)
- Assignee field (for batch substitution)

**Placeholder Reference:**
```yaml
title: "Chapter {CHAPTER}.{CHALLENGE_NUM}: {CHALLENGE_TITLE} (@{USERNAME})"
labels: ["challenge", "challenge: beginner", "skill: {SKILL_TAG}", "day: {DAY}"]
assignees: ["{USERNAME}"]
```

### 3. Batch Issue Generation (Facilitator Tool)

**Scripts:**

| Script | Purpose | Chapters |
|--------|---------|----------|
| `scripts/create_student_issues.ps1` | Original 10 challenges (template-based) | 04, 06, 07, 11 |
| `scripts/create_all_challenges.ps1` | All 26 challenges (self-contained) | 05, 08-10, 12-16 |

#### Primary Script: `create_all_challenges.ps1`

**Usage:**
```powershell
# Preview what would be created
.\scripts\create_all_challenges.ps1 -DryRun

# Create all missing challenges for all org members
.\scripts\create_all_challenges.ps1

# Create only specific chapters (e.g., just the new ones)
.\scripts\create_all_challenges.ps1 -ChaptersOnly "05,08,09,10,12,13,14,15,16"
```

**What It Does:**
1. Defines all 16 challenge templates inline (Chapters 5, 8-10, 12-16; 16 challenges)
2. Loads org members via `gh api`
3. Checks all existing open challenge issues (paginated)
4. Compares each student's existing issues against the full template set
5. Creates only missing challenges (safe to rerun)
6. Assigns to student, applies correct labels
7. Reports success/failure count

**Rerunning for New Members:**
The script is designed to be rerun periodically. It only creates issues for challenges a student does not already have, so running it again after new members join will create their full set without duplicating existing students' issues.

#### Legacy Script: `create_student_issues.ps1`

Creates the original 10 challenges (Ch 04, 06, 07, 11) by cloning from Weijun-Zhang-1996's template issues. Still functional but superseded by `create_all_challenges.ps1` for new chapters.

**Prerequisites for Both Scripts:**
- GitHub CLI (`gh`) installed and authenticated
- Org admin or owner access (to list members and assign issues)
- Labels must exist in the learning-room repo (see Issue Labels section)

### 4. Bot Validation System (Automation)

**Applicable Chapters:**
- Chapter 4: Working with Issues (issue evidence + quality validation)
- Chapter 6: Pull Requests (PR workflow validation)
- Chapter 7: Merge Conflicts (conflict resolution validation)
- Chapter 11: Git & Source Control (Git operations validation)

**How It Works:**
1. Student opens PR with `Closes #ISSUE_NUMBER` in title or body
2. GitHub Actions workflow triggers (`.github/workflows/learning-room-pr-bot.yml`)
3. Validation script (`.github/scripts/validate-pr.js`) checks:
   -  `Closes #XX` syntax is correct
   -  PR references an actual challenge issue
   -  Markdown syntax is valid
   -  No major accessibility violations (headings, links, alt text)
   -  Files changed are in appropriate directory
4. Bot posts comment with pass/fail status
5. If failed: student fixes and pushes again (bot re-validates automatically)
6. When all checks pass: PR can be merged, issue auto-closes

**Bot Feedback Style:**
- Constructive and specific: "Heading hierarchy broken: jumped from H1 to H3"
- Actionable: "Try adding a H2 heading before this section"
- Non-blocking: allows manual override if needed

**Configuration:**
- Rule strictness: Configurable in `.github/scripts/validate-pr.js`
- Rule exceptions: Can exclude specific files per cohort
- Workflow schedule: Runs on every PR opened/updated to main


## Facilitator Operations

**Complete guide:** [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md)

### Pre-Workshop Setup (1 hour)

1. Ensure all students have accepted org invitations (check org members list)
2. Run dry run: `.\scripts\create_all_challenges.ps1 -DryRun` (verify student count and challenge count)
3. Run production: `.\scripts\create_all_challenges.ps1` (creates all 26 challenges per org member)
4. Verify issues created: `gh issue list -R Community-Access/learning-room --label challenge --limit 100`
5. Verify bot workflow enabled: `gh workflow list -R Community-Access/learning-room`
6. Do a dry run: one facilitator completes one challenge end-to-end
7. Communicate to students where to find challenges

### During Workshop

- **Monitor progress:** `gh issue list -R Community-Access/learning-room --label challenge --state open --limit 100`
- **Help stuck students:** Review their issue, guide them through "If You Get Stuck" section
- **Track bot failures:** Students needing help → look at bot feedback comment
- **Measure success:** % of issues closed = % of students completing challenges

### Post-Workshop

- Archive issues: `gh issue close --comment "Cohort complete" [issue_ids]`
- Prepare for next cohort: Update `student-usernames.txt`, re-run batch script
- No need to delete old issues; they remain searchable and valuable for reference


## Data Structures

### Issue Title Convention

```
Chapter {XX}.{Y}: {Challenge_Title} (@{USERNAME})
```

Chapter numbers are zero-padded to two digits (04, 05, 06, 07... 16) so issues sort correctly when filtered alphabetically.

**Example:**
```
Chapter 04.1: Create Your First Issue (@accesswatch)
Chapter 6.2: Open Your First Pull Request (@amandarush)
Chapter 11.3: Push to GitHub (@andysq62)
Chapter 13.2: Ask Copilot to Explain a Repo (@apelli95)
```

**Why This Works:**
- Clear chapter numbering (students know where they are)
- Short challenge number within chapter
- Username is visible (students instantly recognize their issue)
- Sortable by chapter and student

### Issue Labels

Applied consistently across all challenges:

| Label Category | Values | Example |
|---|---|---|
| Type | `challenge` | Always applied |
| Level | `challenge: beginner`, `challenge: intermediate`, `challenge: advanced`, `challenge: expert` | Based on chapter content |
| Skill | `skill: github-issues`, `skill: pull-requests`, `skill: markdown`, `skill: merge-conflicts`, `skill: git-source-control`, `skill: collaboration`, `skill: triage`, `skill: notifications`, `skill: vs-code`, `skill: pr-extension`, `skill: copilot`, `skill: code-review`, `skill: issue-templates`, `skill: agents` | Links to learning topic |
| Day | `day: 1`, `day: 2` | When challenge is typically done |

**Filter Examples:**
```bash
# All challenges for one student
gh issue list --assignee @accesswatch --label challenge

# All day 1 challenges open
gh issue list --label "day: 1" --label challenge --state open

# All intermediate challenges
gh issue list --label "challenge: intermediate" --state open
```

### Lifecycle States

Each challenge issue transitions through states. PR-based challenges (Ch 04, 05, 06, 11) auto-close when a PR merges. Comment-based challenges (Ch 8-10, 12-16) are closed manually by the student or facilitator after evidence is posted.

| State | Condition | PR-Based | Comment-Based |
|-------|-----------|----------|---------------|
| **Open** | Issue created, student has not started | Student adds comment "I'm working on this!" | Same |
| **In Progress** | Student commented, work is happening | PR opened with `Closes #XX` | Student working through steps |
| **Evidence Posted** | Challenge work is complete | PR submitted for review | Checklist comment posted on issue |
| **Closed** | Challenge confirmed complete | PR merged (auto-closes issue) | Student or facilitator closes issue |


## Success Metrics

### For Students

- **Participation:** How many challenges did you complete?
  - Good: 50% of challenges
  - Great: 75%+
  - Stretch: 100%

- **Quality:** Did your PR pass bot validation?
  - Good: Pass on first try
  - Great: Understand feedback and fix on second try
  - Stretch: Help peers understand bot feedback

### For Workshop Facilitators

- **Generation:** Did all expected issues create without error (`students x 26` for all chapters)?
- **Adoption:** What % of students have at least one open challenge?
- **Completion:** What % of challenges reached "closed" state?
- **Bot Effectiveness:** What % of PRs pass bot validation on first attempt?
  - Target: 70% first-pass rate (30% needing one fix is acceptable)
- **Support Load:** How many "I'm stuck" comments per day?
  - Trend is more important than absolute number
  - Declining over 2 days = students gaining competence

### For Workshop Design

- **Clarity:** Do issue descriptions match Challenge Hub documentation?
  - Check: No student asks for clarification on challenge requirements
- **Relevance:** Does each challenge teach intended concept?
  - Check: Students successfully demonstrate skill in PR
- **Pacing:** Are challenges completable in allotted time?
  - Check: 80%+ of students reach Chapter 7 on Day 1
- **Motivation:** Do students attempt optional challenges (not required)?
  - Check: Any student attempts Chapters 12-16 (guided, not automated)


## File Structure

```
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── challenge-chapter-4.md       <- Issue template (Chapter 4)
│   │   ├── challenge-chapter-5.md       <- Issue template (Chapter 6)
│   │   ├── challenge-chapter-6.md       <- Issue template (Chapter 7)
│   │   ├── challenge-chapter-11.md      <- Issue template (Chapter 11)
│   │   └── challenge-hub.md             <- Generic template with placeholders
│   ├── data/
│   │   └── challenge-progression.json   <- Progression levels and badges
│   ├── workflows/
│   │   └── learning-room-pr-bot.yml     <- Bot validation trigger
│   └── scripts/
│       ├── validate-pr.js               <- Bot validation logic
│       └── comment-responder.js         <- Issue comment handler
│
├── scripts/
│   ├── create_student_issues.ps1        <- Original 10-challenge creator (Ch 04/05/06/11)
│   └── create_all_challenges.ps1        <- Full 26-challenge creator (Ch 8-16)
│
├── learning-room/
│   └── docs/
│       └── CHALLENGES.md                <- Challenge Hub (student reference)
│
├── docs/
│   ├── 05-working-with-issues.md
│   ├── 06-working-with-pull-requests.md
│   ├── 07-merge-conflicts.md
│   ├── 08-open-source-culture.md
│   ├── 09-labels-milestones-projects.md
│   ├── 10-notifications-and-day-1-close.md
│   ├── 11-vscode-interface.md
│   ├── 14-git-in-practice.md
│   ├── 15-code-review.md
│   ├── 16-github-copilot.md
│   ├── 15-code-review.md
│   ├── 17-issue-templates.md
│   └── 19-accessibility-agents.md
│
├── README.md                            <- Challenge discovery section
├── FACILITATOR.md                       <- Main facilitator guide (links to challenges)
├── FACILITATOR_CHALLENGES.md            <- Challenge-specific facilitator ops
├── CHALLENGE_SYSTEM_ARCHITECTURE.md     <- This document
└── student-usernames.txt                <- Input for legacy batch script
```


## Integration Points

### From Student Docs
- [docs/05-working-with-issues.md](docs/05-working-with-issues.md) - links to Chapter 4 challenges
- [docs/06-working-with-pull-requests.md](docs/06-working-with-pull-requests.md) - links to Chapter 6 challenges
- [docs/07-merge-conflicts.md](docs/07-merge-conflicts.md) - links to Chapter 7 challenges
- [docs/08-open-source-culture.md](docs/08-open-source-culture.md) - links to Chapter 8 challenges
- [docs/09-labels-milestones-projects.md](docs/09-labels-milestones-projects.md) - links to Chapter 9 challenges
- [docs/10-notifications-and-day-1-close.md](docs/10-notifications-and-day-1-close.md) - links to Chapter 10 challenges
- [docs/11-vscode-interface.md](docs/11-vscode-interface.md) - links to Chapter 5 challenges
- [docs/14-git-in-practice.md](docs/14-git-in-practice.md) - links to Chapter 11 challenges
- [docs/15-code-review.md](docs/15-code-review.md) - links to Chapter 12 challenges
- [docs/16-github-copilot.md](docs/16-github-copilot.md) - links to Chapter 13 challenges
- [docs/15-code-review.md](docs/15-code-review.md) - links to Chapter 14 challenges
- [docs/17-issue-templates.md](docs/17-issue-templates.md) - links to Chapter 15 challenges
- [docs/19-accessibility-agents.md](docs/19-accessibility-agents.md) - links to Chapter 16 challenges

### From README
- [README.md](README.md) section " Your Challenges Are Waiting" → directs students to Issues tab
- README → links to [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md) for facilitators

### From Challenge Hub
- [learning-room/docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) → links back to chapter docs
- Challenge Hub → links to individual issue URLs
- Challenge Hub → links to [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md) for facilitators

### From Facilitator Docs
- [FACILITATOR.md](FACILITATOR.md) → links to [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md)
- [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md) → links to template files, scripts, chapter docs


## Naming Conventions

### Github Usernames (from `student-usernames.txt`)
- Lowercase, no spaces, @-prefixed in issues
- Examples: `@accesswatch`, `@amandarush`, `@andysq62`

### Issue Titles

```
Chapter {X}.{Y}: {Challenge_Title} (@{USERNAME})
```

**Constraints:**
- Chapter XX: Two-digit zero-padded chapter number (04-16)
- Challenge Y: Integer sequence within chapter (1-3 typically)
- Title: 40-60 characters, action verb, clear outcome
- Username: GitHub login of the assigned student

**Valid Examples:**
```
Chapter 04.1: Create Your First Issue (@accesswatch)
Chapter 6.2: Review and Approve a Pull Request (@amandarush)
Chapter 7.1: Resolve a Merge Conflict (@andysq62)
Chapter 11.3: Push Your Work to GitHub (@apelli95)
Chapter 14.1: Review a PR with Inline Comments (@JeffBlumentworker)
Chapter 16.3: Agent Instructions Deep Dive (@ChrisDuffley)
```

### Branch Names (for Git challenges)

Students create branches following pattern:
```
challenge/XX-short-description
```

**Example:**
```
challenge/11-add-sci-fi-themes
challenge/6-resolve-merge-conflict
```

The PR bot validates branch names for Chapter 11 (Git challenges).


## Customization & Extension

### Adding a New Chapter to Challenges

1. Add challenge definition to `scripts/create_all_challenges.ps1` in the `$challengeDefs` hashtable
2. Define: title template, labels array, and body template using `New-ChallengeBody`
3. Create matching label in learning-room if new skill tag is needed
4. Decide: Bot validated (PR-based) or manual (comment-based)?
5. Add to [learning-room/docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) Challenge Map
6. Run script: `.\scripts\create_all_challenges.ps1 -ChaptersOnly "NEWNUM"`

### Changing Bot Validation Rules

Edit `.github/scripts/validate-pr.js`:
- Make checks stricter (fail more PRs early)
- Add new checks (custom validations)
- Create exceptions (exclude certain files/students)

After changes, test with `-DryRun`:
```powershell
.\scripts\create_all_challenges.ps1 -DryRun -ChaptersOnly "NEWNUM"
```

### Reusing for Other Workshops

This system works for any 2-day, 16-chapter technical workshop:

1. Copy `create_all_challenges.ps1`, update challenge definitions
2. Update org name and repo name in script header
3. Customize Challenge Hub documentation
4. Update facilitator guides with your timelines/agenda
5. Run: `.\scripts\create_all_challenges.ps1 -DryRun` then `.\scripts\create_all_challenges.ps1`


## Common Issues & Solutions

### Issue: "I can't find my challenges"
**Solution:** Remind student to go to the **Issues** tab and check **Filters** for their username. They can also use the Challenge Hub as a reference.

### Issue: "Bot rejected my PR but I don't understand why"
**Solution:** Read the bot's comment carefully. It explains exactly what failed. Have student look at the suggested fix and try again.

### Issue: "Many students are failing the same bot check"
**Solution:** This means the bot rule might be too strict. Either:
- Loosen the rule in `.github/scripts/validate-pr.js`
- Update student docs to be clearer about the requirement
- Manually approve PRs for this cohort while you improve documentation

### Issue: "I generated issues but some are missing"
**Solution:** Check the script output for failures. Some issues might not have created due to:
- Duplicate issue titles (same challenge, same student) - check for re-runs
- Permission issues (bot user doesn't have issue create permission)
- GitHub API rate limiting - wait a few minutes and rerun


## Success Story (By the Numbers)

### Generated for a 30-person cohort:
- 780 individual challenge issues (26 per student)
- 0 collisions (each student has their own issues)
- 4 bot-validated chapters (auto-feedback on PR submission)
- 12 comment-based chapters (evidence posted as issue comments)
- Script is rerunnable: new members get their full set automatically
- Labels: 4 levels, 14 skills, 2 days


## Next Steps (Future Enhancements)

### Short Term
- [x] Add templates for guided chapters (7-10, 12-16) -- completed via `create_all_challenges.ps1`
- [ ] Create facilitator monitoring dashboard (custom actions)
- [ ] Add bulk archive script for end-of-workshop cleanup

### Medium Term
- [ ] Student self-assessment: "Did this challenge teach the concept?"
- [ ] Difficulty calibration: Track which challenges take longest
- [ ] Peer feedback: Students comment on each other's solutions

### Long Term
- [ ] Gamification: Badges for challenge streaks, skill level badges
- [ ] Difficulty curves: AI recommendation of next challenge based on pace
- [ ] Mobile: GitHub Mobile app integration for easier issue tracking


## Document Control

| Role | Document | Action |
|------|----------|--------|
| **Students** | [README.md](README.md) + [learning-room/docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) | Read, discover, complete |
| **Facilitators** | [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md) | Set up, manage, monitor |
| **Admins** | [scripts/create_all_challenges.ps1](scripts/create_all_challenges.ps1) | Run, troubleshoot |
| **Developers** | `.github/workflows/`, `.github/scripts/` | Maintain bot logic and rules |


**Last Updated:** March 2026
**Archive Location:** [https://github.com/git-going-with-github/](https://github.com/git-going-with-github/)
**Questions?** See [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md) FAQ section.
