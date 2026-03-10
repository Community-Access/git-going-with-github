# Facilitator Guide
## Open Source Assistive Technology Hackathon

> This document is for workshop facilitators only. Participants should start with [README.md](README.md) and [docs/00-pre-workshop-setup.md](docs/00-pre-workshop-setup.md).

** If you're looking for Challenge Management (issue generation, monitoring, bot setup):  See [FACILITATOR_CHALLENGES.md](FACILITATOR_CHALLENGES.md)**


## Quick Reference Timeline

**Skip to your current phase:**

### Phase 1: Setup (2 weeks before)
- [ ] Create GitHub org/repo
- [ ] Configure repo settings (Issues, Discussions, branch protection)
- [ ] Enable Actions with write permissions
- [ ] Test GitHub Skills modules (Introduction to GitHub, Markdown, Review PRs)
- **Time:** ~2 hours

### Phase 2: Launch (1 week before)
- [ ] Create 10 labels (accessibility, bug, documentation, good first issue, etc.)
- [ ] Create "Hackathon Day 1" milestone
- [ ] Create 1 Welcome issue (unassigned)
- [ ] Create pre-seeded practice PR on `practice-review` branch
- [ ] Create participant issues (10 per student for Chapters 4,5,6,11; e.g., 100 issues for 10 students)
- [ ] Update `.github/data/student-roster.json` with participant names/usernames
- [ ] Create `day1-practice` branch (differs from main by 2-3 files)
- **Time:** ~3-4 hours

### Phase 3: Day 1 (30 min before session)
- [ ] Verify all participant issues created, assigned, labeled
- [ ] Verify bot automation is working (test a PR comment)
- [ ] Connect screen share: show learning-room repo structure
- **Time:** 30 min checklist

### Phase 4: Day 1 Session - Saturday, March 7, 2026 (7.5 hours)
- **Block 0 (9:00-9:45):** Welcome, setup verification, **git clone learning-room**
- **Block 1 (9:30-10:10):** Screen reader orientation to GitHub
- **Block 2 (10:10-11:00):** Navigating repositories & Markdown setup
- **Break (11:00-11:15)**
- **Block 3 (11:15-12:10):** Working with Issues & Pull Requests
- **Block 4 (12:10-1:00 PM):** Pull Request review and merge
- **Lunch (1:00-2:00 PM)**
- **Block 5 (2:00-3:00 PM):** Contribution sprint (students work on assigned learning-room issues)
- **Break (3:00-3:15 PM)**
- **Block 6 (3:15-4:30 PM):** Community tools & wrap-up

### Phase 5: Day 2 Morning (30 min before session)
- [ ] Verify VS Code + extensions are installed (demo machine)
- [ ] Test Copilot Chat + Accessibility Agents
- [ ] Test slash commands (`/find-issues`, `/daily-briefing`)
- [ ] Check all student PRs from Day 1 (merge any ready ones)
- **Time:** 30 min checklist

### Phase 6: Day 2 Session - Sunday, March 8, 2026 (7.5 hours)
- **Block 0 (9:00-9:30):** Day 1 debrief & goal-setting
- **Block 1 (9:30-10:30):** VS Code setup & screen reader mode
- **Break (10:30-10:45)**
- **Block 2 (10:45-12:00):** Deep contribution with Copilot Chat
- **Lunch (12:00-1:00 PM)**
- **Block 3 (1:00-2:00 PM):** Accessibility Agents activation
- **Block 4 (2:00-3:00 PM):** Agentic workflows in action
- **Break (3:00-3:15 PM)**
- **Block 5 (3:15-4:15 PM):** Ship your contribution (upstream PR to accessibility-agents)
- **Block 6 (4:15-5:00 PM):** Spec kit & future planning

### Phase 7: Post-Workshop
- [ ] Post completion stats/badges
- [ ] Collect feedback on automation
- [ ] Archive student roster
- [ ] Schedule retrospective


## Full Details

(See sections below for complete instructions on each phase)


## Repository Structure

This is the single repository students clone. Everything they need for both days is here:

```
learning-room/                  ← workshop repository root
├── README.md                   ← participant-facing start page
├── CONTRIBUTING.md             ← contribution guide
├── CODE_OF_CONDUCT.md          ← community standards
├── FACILITATOR.md              ← this file
├── .gitignore
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── config.yml          ← disables blank issues, links to Skills modules
│   │   ├── accessibility-bug.yml ← accessibility bug report YAML form
│   │   └── feature-request.yml ← feature/improvement request YAML form
│   ├── PULL_REQUEST_TEMPLATE.md ← PR template with accessibility checklist
│   ├── agents/                 ← Accessibility Agents - 55 Copilot agents across 3 teams
│   │   ├── daily-briefing.agent.md
│   │   ├── issue-tracker.agent.md
│   │   ├── pr-review.agent.md
│   │   ├── analytics.agent.md
│   │   ├── insiders-a11y-tracker.agent.md
│   │   ├── template-builder.agent.md
│   │   └── preferences.example.md
│   └── prompts/                ← 54+ slash commands for Copilot Chat
│       ├── a11y-update.prompt.md
│       ├── create-issue.prompt.md
│       ├── daily-briefing.prompt.md
│       ├── explain-code.prompt.md
│       ├── review-pr.prompt.md
│       ├── triage.prompt.md
│       └── ... (48 more - see docs/appendix-l-agents-reference.md)
├── docs/                       ← full workshop curriculum (17 chapters + appendices A-Z)
│   ├── 00-pre-workshop-setup.md
│   ├── 02-understanding-github.md
│   ├── 03-navigating-repositories.md
│   ├── 04-the-learning-room.md
│   ├── 05-working-with-issues.md
│   ├── 11-vscode-interface.md
│   ├── 06-working-with-pull-requests.md
│   ├── 07-merge-conflicts.md
│   ├── 08-open-source-culture.md
│   ├── 09-labels-milestones-projects.md
│   ├── 10-notifications-and-day-1-close.md
│   ├── 14-git-in-practice.md
│   ├── 15-code-review.md
│   ├── 16-github-copilot.md
│   ├── 15-code-review.md
│   ├── 17-issue-templates.md
│   ├── 19-accessibility-agents.md
│   ├── appendix-a-glossary.md              ← every term explained
│   ├── appendix-b-screen-reader-cheatsheet.md ← full shortcut reference
│   ├── appendix-c through appendix-x      ← deep-dive references (C-X)
│   └── (see appendix-x-resources.md for complete file listing)
└── learning-room/              ← practice content (contribution sprint targets)
    ├── README.md
    └── docs/
        ├── welcome.md          ← has [TODO] gaps for participants to complete
        ├── keyboard-shortcuts.md ← has intentional errors and a heading hierarchy problem
        └── setup-guide.md      ← has a broken URL and [TODO] markers
```


## Two Weeks Before the Workshop

### Create the GitHub Organization and Repository

1. Create a GitHub org (recommended) or use your personal account
2. Create a new repository named `learning-room` (or your preferred name)
3. Make it **Public** - participants need read access without being org members
4. Push the contents of this repository to it:
   ```
   git remote add origin https://github.com/[org]/learning-room
   git push -u origin main
   ```

### Configure the Repository

**Enable Issues:**
Settings → Features → check Issues

**Enable Discussions (optional):**
Settings → Features → check Discussions (useful for async Q&A)

**Branch protection for `main`:**
Settings → Branches → Add rule:
- Require pull request before merging:
- Require at least 1 approving review:
- Do not require up-to-date branches before merging (reduces friction for beginners)

**Mark as Template Repository (recommended):**
Settings → check "Template repository"
This allows you to create a fresh copy for each cohort with one click.


## One Week Before the Workshop

### Create Labels

Navigate to Issues → Labels → create these labels (delete GitHub defaults if desired):

| Label | Color | Description |
|-------|-------|-------------|
| `accessibility` | `#0075ca` | Keyboard, screen reader, WCAG |
| `good first issue` | `#7057ff` | Good for new contributors |
| `documentation` | `#0075ca` | Improvements to docs |
| `needs triage` | `#e4e669` | Awaiting review by a maintainer |
| `bug` | `#d73a4a` | Something isn't working |
| `enhancement` | `#a2eeef` | New feature or request |
| `help wanted` | `#008672` | Extra attention needed |
| `question` | `#d876e3` | More information needed |
| `wontfix` | `#ffffff` | This will not be addressed |
| `duplicate` | `#cfd3d7` | This issue already exists |

### Create a Milestone

Issues → Milestones → New milestone:
- Title: `Hackathon Day 1`
- Due date: Day 1 date
- Description: "Issues targeted for the Day 1 contribution sprint"

### Pre-Seed Issues for the Contribution Sprint

Create one issue per participant, assigned to them. Each issue points to a specific problem in `learning-room/docs/`. Template:

**Issue title:** `Fix: [specific problem] in [filename]`
**Issue body:**
```markdown
## What to Fix

[Specific description of the problem - be precise enough that the participant knows exactly
what line or section to look at.]

## File to Edit

`learning-room/docs/[filename].md`

## Acceptance Criteria

- [ ] [Specific thing that should be true when the fix is complete]
- [ ] No new heading-level skips introduced
- [ ] Link text is descriptive (not "click here")

## How to Contribute

See [Working with Issues](docs/05-working-with-issues.md) and the [Day 1 Agenda](DAY1_AGENDA.md) for the full contribution workflow.
```

**Pre-seeded issues to create (by file):**

| File | Problem to fix | Label |
|------|---------------|-------|
| `keyboard-shortcuts.md` | Heading jumps from `#` (h1) to `####` (h4) for NVDA section sub-headings - should be `##` and `###` | `accessibility`, `good first issue` |
| `keyboard-shortcuts.md` | The Accessibility Settings link is broken: `htps://` has a typo | `bug`, `good first issue` |
| `setup-guide.md` | Step 2 link has a typo: `htps://github.com/settings/accessibility` - missing one `t` | `bug`, `good first issue` |
| `setup-guide.md` | "Note: Links marked [TODO]" callout at the bottom - replace with actual links to the workshop repo | `documentation`, `good first issue` |
| `welcome.md` | `Last reviewed: [DATE]` placeholder at the bottom - replace with today's date (format: YYYY-MM-DD) | `documentation`, `good first issue` |
| `welcome.md` | [TODO] paragraph about who can contribute (line 22) | `documentation`, `good first issue` |
| `welcome.md` | [TODO] paragraph about reading an issue to decide if it's right for you (line 40) | `documentation`, `good first issue` |
| `welcome.md` | [TODO] sentence about what a merged PR means for GitHub profile (line 52) | `documentation`, `good first issue` |

Create extras for any additional participants.

### Create the Welcome Issue

Create this issue, unassigned, labeled `good first issue`:

**Title:** `Welcome! Introduce yourself`
**Body:**
```markdown
Welcome to the workshop repository! This issue is for introductions.

## How to participate

Leave a comment on this issue introducing yourself:

- Your name (first name or preferred name)
- Your screen reader and operating system
- One thing you are hoping to learn or do during this workshop

Use Markdown in your comment:
- Use `**bold**` to highlight your screen reader name
- Use a task list (`- [ ]`) for things you want to accomplish

There is no wrong answer. This is practice, and it is also a real community.
```

### Create the Pre-Seeded PR

Create a PR from a `practice-review` branch with a meaningful change to `learning-room/docs/welcome.md` - add one paragraph, change one heading, correct one small issue. This PR exists so participants can practice reviewing in Block 4 before the contribution sprint.

PR title: `Expand the "What Is Open Source?" section`
Description: Use the PR template. Fill in all fields.


## Day 1 - Pre-Session Checklist

Run through this 30 minutes before participants arrive:

- [ ] All participant issues created, assigned, and labeled
- [ ] Welcome issue open and unlabeled
- [ ] Pre-seeded practice PR open on `practice-review` branch
- [ ] `learning-room` milestone created and linked to all participant issues
- [ ] All labels created
- [ ] `day1-practice` branch created (differs from `main` by 2-3 files - for Branch Navigation exercise in Block 2)
- [ ] Repository is public and accessible without login
- [ ] GitHub Skills modules tested (go through the first 2 steps of each to verify Mona responds)

### GitHub Skills Pre-Test (Important)

Test each module at least 3 days before the workshop:
1. [Introduction to GitHub](https://github.com/skills/introduction-to-github) - complete Steps 1-3 in a test account
2. [Communicate Using Markdown](https://github.com/skills/communicate-using-markdown) - start and verify Mona creates the first issue
3. [Review Pull Requests](https://github.com/skills/review-pull-requests) - start and verify Mona creates the practice PR

**Note:** GitHub Skills modules occasionally have delayed Mona responses. If Mona does not respond within 2 minutes:
1. Check that the repo was created as **Public** (Mona requires this on the free tier)
2. Navigate to the Actions tab of the student's new repo - confirm a workflow run is listed
3. If the workflow failed: click it → read the error → the most common cause is a rate limit (wait 1-2 minutes and re-trigger by creating another commit)
4. Have backup screenshots of Mona's expected responses ready for demo purposes


## Day 2 - Pre-Session Checklist

- [ ] VS Code installed on any shared/demo machine
- [ ] GitHub Copilot Chat extension installed and authenticated
- [ ] GitHub Pull Requests extension installed
- [ ] Accessibility Agents agents verified: open Copilot Chat → type `@daily-briefing morning briefing` → confirm a response
- [ ] Slash commands verified: type `/find-issues good first issue` → confirm a response
- [ ] Each participant's upstream PR target ready (if doing the accessibility-agents contribution)


## GitHub Skills - Facilitator Script

### Block 1: Introducing Introduction to GitHub

> *"Before we explore the learning-room repo, I want you to do something first. We're going to navigate to a GitHub Skills module - this is an interactive learning course built into GitHub itself. When you activate it, GitHub creates a copy of the course repository in your own account. Then a bot called Mona starts guiding you through steps - and it responds to real GitHub actions that you take."*

Walk through the setup together. Wait until everyone sees Mona's Issue #1 before continuing.

> *"Look at your repositories list. You now own a repository on GitHub. Mona is waiting inside it. Keep that tab open - we'll come back to it throughout the day."*

### Block 3: Mona Responds to the PR

When participants create their PR and Mona responds:

> *"Pause what you're doing. Navigate to your Pull Request tab in your Skills repo. What does Mona say? Read it with your screen reader."*

Wait a moment.

> *"What just happened is exactly how real open source bots work. Dependabot, GitHub Actions CI, automated labelers - they all watch for GitHub events and respond automatically. You just experienced that for the first time on your own repository."*

### Wrap-Up: Completion Certificates

When checking Skills module completions:

> *"Navigate to github.com/skills/introduction-to-github. Do you see your completion badge? That's yours. It's tied to your GitHub profile. It will be there when you apply for jobs, when you introduce yourself to a new open source community, when you want to demonstrate that you know how to use GitHub."*


## Managing Learning Room Automation

The Learning Room includes comprehensive automation that provides instant feedback while preserving the educational value of human peer review.

### Automation Components

**1. PR Validation Bot** (`.github/workflows/learning-room-pr-bot.yml`)
- Welcomes first-time contributors
- Validates PRs against quality standards
- Checks accessibility (headings, links, alt text, broken links)
- Provides educational feedback with links to resources
- Auto-applies labels (first-time-contributor, documentation, needs-work, accessibility)
- Responds to keywords: @bot help, "merge conflict", "request review"

**2. Skills Progression Engine** (`.github/workflows/skills-progression.yml`)
- Tracks student progress through skill levels (Beginner → Intermediate → Advanced → Expert)
- Awards badges for specific achievements (Markdown Master, Accessibility Advocate, etc.)
- Unlocks new challenges based on merged PR count
- Celebrates milestones (1st, 5th, 10th, 25th merged PRs)
- Posts progress updates with stats

**3. Student Pairing & Grouping** (`.github/workflows/student-grouping.yml`)
- Automatically assigns peer reviewers to PRs
- Balances review load using "least_reviews" strategy
- Creates study groups when triggered manually
- Provides review guidance to both author and reviewer

### Before the Workshop: Configure Automation

**Update Student Roster** (`.github/data/student-roster.json`)
```json
{
  "cohort": "Your Cohort Name 2024",
  "facilitators": ["your-github-username"],
  "students": [
    {
      "username": "student-github-username",
      "name": "Student Display Name",
      "timezone": "America/Los_Angeles",
      "interests": ["accessibility", "frontend"],
      "pronouns": "they/them",
      "screenReader": false,
      "mergedPRs": 0,
      "currentLevel": "Beginner",
      "badges": [],
      "joinedDate": "2024-01-15"
    }
  ]
}
```

**Verify Workflows Are Enabled**
- Navigate to Actions tab
- Ensure workflows are enabled (not disabled by GitHub)
- Check that GitHub Actions has write permissions:
  - Settings → Actions → General → Workflow permissions
  - Select "Read and write permissions"
  - Check "Allow GitHub Actions to create and approve pull requests"

**Test Automation**
1. Open a test PR before workshop
2. Verify bot comments within ~30 seconds
3. Check that labels are applied
4. Verify validation results are accurate
5. Test @bot help keyword response

### During the Workshop: Interacting with Automation

**Introducing the Bot (Day 1, Block 5)**

> *"When you open your PR, you'll see a comment from a bot within about 30 seconds. This bot is not grading you - it's teaching you. Read its feedback carefully. It will tell you about accessibility issues, link you to resources, and celebrate things you did well."*

Walk through a sample bot comment:
- Required checks (must pass)
- Suggestions (optional improvements)
- Accessibility analysis (detailed feedback with fixes)
- Learning resources (relevant documentation links)

> *"The bot is consistent and instant, but it's not perfect. If you disagree with its feedback, comment on your PR explaining why. Always request human review - peer review teaches things the bot cannot."*

**Monitoring Bot Behavior**

Watch for:
- Bot comments that are incorrect (file issues with label `automation-feedback`)
- Bot overwhelming participants (adjust timing if needed)
- Students relying solely on bot without requesting reviews (remind them of human review value)

**Overriding Bot Checks**

If bot incorrectly flags something:
1. Facilitator comments: "Bot feedback incorrect here - [explanation]"
2. Approve PR despite bot warning
3. File issue to improve validation script later

**Manual Skill Progression Adjustments**

If a student completes work outside tracked PRs:
1. Update their entry in `.github/data/student-roster.json`
2. Increment `mergedPRs` count
3. Update `currentLevel` if appropriate
4. Add badges to `badges` array
5. Commit and push to apply

### Creating Study Groups

**Manual Creation:**
Run the student-grouping workflow manually:
1. Navigate to Actions tab
2. Select "Student Pairing & Grouping"
3. Click "Run workflow"
4. Choose pairing strategy:
   - `random`: Shuffle and divide
   - `skill_match`: Mix skill levels (recommended)
   - `timezone_match`: Group by timezone
5. Bot creates issue thread for each group

**Group Sizes:**
- 2-3 students: Ideal for focused collaboration
- 4-5 students: Good for larger cohorts
- Edit `groupSize` variable in workflow to adjust

**Monitoring Groups:**
- Check group issue threads for activity
- Ensure all members are participating
- Intervene if one person dominates or is left out

### Automation Philosophy

**Automation Provides:**
- Instant feedback (students don't wait)
- Educational resources (links to learning materials)
- Consistency (same standards for everyone)
- Unlimited patience (can run on every commit)

**Human Review Provides:**
- Creative suggestions (beyond rule-checking)
- Contextual judgment (understanding nuance)
- Social learning (building relationships)
- Encouragement (celebrating growth)

**The Goal:** Automation handles technical checks so humans can focus on higher-level feedback, mentorship, and community building.

### Troubleshooting Automation

**Bot not commenting:**
- Check Actions tab for workflow runs
- Verify workflow triggered (visible in Actions)
- Check workflow permissions (Settings → Actions)
- Review workflow logs for errors

**Incorrect validation results:**
- Review `.github/scripts/validate-pr.js` logic
- Check if file paths match expectations
- Test validation script locally: `node .github/scripts/validate-pr.js`
- File issue with details for post-workshop fixes

**Bot commenting multiple times:**
- Should only update one comment per PR
- If creating multiple: check workflow logic in `find-comment` step
- May be multiple workflows triggering (check Actions tab)

**Skills not unlocking:**
- Verify PR was merged (not just closed)
- Check that issue was linked with "Closes #XX"
- Review skills-progression.yml workflow logs
- Manually update `student-roster.json` if needed

**Peer reviewers not assigned:**
- Check that student-roster.json has active students
- Verify pairing workflow triggered
- Review logs for errors
- Manually request reviewers as fallback

### Customizing Automation

**Adjusting Validation Rules:**
Edit `.github/scripts/validate-pr.js`:
- Modify `checkDescription()` to change min character count
- Add new validation functions
- Adjust accessibility checks (heading hierarchy, link text patterns)
- Update messages and resources

**Changing Skill Progression:**
Edit `.github/data/challenge-progression.json`:
- Adjust required PR counts per level
- Add new skill levels
- Create new badge types
- Change challenge lists

**Adding New Challenges:**
1. Create issue template in `.github/ISSUE_TEMPLATE/`
2. Add to `learning-room/docs/CHALLENGES.md`
3. Add to `.github/data/challenge-progression.json`
4. Add to progression data

### Post-Workshop: Reviewing Automation Impact

After the workshop, analyze:
- Did bot feedback help students improve faster?
- Were validation messages clear and educational?
- Did automation reduce facilitator burden?
- Was peer review still valued despite automation?
- What false positives/negatives occurred?
- Did skills progression motivate continued participation?

**Collect Feedback:**
Create issue labeled `automation-retrospective` asking:
- What bot feedback was most helpful?
- What feedback was confusing?
- Did automation enhance or detract from learning?
- Would you want more or less automation?

**Iterate:**
Use feedback to improve validation scripts, messages, and workflows for next cohort.


## Accessibility Notes for Facilitators

- Deliver all verbal instructions slowly - participants are simultaneously navigating and listening
- When demonstrating on screen, describe what you are doing out loud: "I am pressing Tab three times to reach the Issues tab, then pressing Enter"
- Pause after introducing each new concept before moving to the next
- When a participant is stuck: ask "what does your screen reader say right now?" before any other question - this locates them precisely
- Respect different reading speeds. Some participants' screen readers read faster, some slower. Build buffer time into each activity.
- If the room has mixed screen reader experience: pair advanced and new users during the contribution sprint - code review is a natural collaboration opportunity
- **Bot accessibility:** Automation comments are standard GitHub comments, fully accessible with screen readers. Bot uses clear headings, lists, and links for easy navigation.


## Personalizing This Workshop

The curriculum, agent files, and practice documents are designed to be adapted:

- **Rename `learning-room`** to reflect your project or organization
- **Replace the practice issues** with real issues from an AT project you support
- **Edit the agent files** in `.github/agents/` to be project-specific
- **Add more slash commands** by creating new `.prompt.md` files in `.github/prompts/`
- **Add more practice docs** to `learning-room/docs/` with intentional issues relevant to your project's actual documentation

The workshop is licensed under Creative Commons Attribution. Attribution: "Based on the Open Source AT Hackathon Learning Room by [your name]."


## Chapter-by-Chapter Facilitation Guide

### Chapters 0-2: Pre-Workshop & Orientation (Day 1 Blocks 0-1)

**Chapter 0: Pre-Workshop Setup**
- **Facilitator role:** Verify everyone completed this before arriving
- **Common issues:** 
  - Screen reader not announcing page headings (turn off hovercards)
  - GitHub modern experience disabled (enable in Feature Options)
  - Accessibility settings not found (keyboard shortcut: `G` then `D` then `A`)
- **What to watch for:** Participants may not realize page titles are headings - emphasize pressing `1` to find them
- **Talking point:** "The first heading on every GitHub page tells you where you are. It's your anchor point."

**Chapter 1: Understanding GitHub's Web Structure**
- **Purpose:** Mental model - three levels of organization + landmark structure
- **Key concept demo:** Have everyone press `D` to navigate landmarks on the learning-room repo page; call out "Navigation Menu," "Repository Navigation," "Main," "Search Results"
- **Common confusion:** The difference between repository navigation (Code, Issues, PRs tabs) and global navigation (top bar)
- **Accessibility teaching point:** "Landmarks are not visual features - they are semantic markers your screen reader uses to let you jump around instead of reading every line"
- **Demo script:**
  ```
  "I'm opening github.com/community-access/learning-room
   I press 1, twice - what do I hear? [let people answer]
   Yes, the first heading is the page title. The second is a section heading.
   Now I press D - I move through landmarks.
   I hear Navigation Menu - that's the top bar.
   I move forward with D again - Repository Navigation - that's where Code, Issues, PRs live.
   Now I press D again - Main - that's the content area where the file list is.
   If I press D one more time - it might say Search Results landmark, but there's nothing there right now.
   These landmarks are the skeleton of every GitHub page."
  ```

**Chapter 2: Navigating Repositories**
- **Purpose:** Concrete navigation patterns using single-key shortcuts
- **Key practice:** Have everyone navigate the learning-room repo using `H` to browse headings, then `T` to find tables, then open `docs/welcome.md`
- **Common struggle:** Memorizing which key does what - reassure them that pressing `H-H-H` is faster than searching visually
- **Demo the Elements List:** `NVDA+F7` / `Insert+F3` / `VO+U` - show everyone that the list view of headings, links, and buttons exists
- **Accessibility insight:** "The Elements List is a speed tool. When you know what you're looking for, listing all links or buttons gets you there faster than pressing `K` fifteen times."
- **Demo script:**
  ```
  "Let's open the learning-room README together.
   We're looking for the section that explains what files to work on.
   I could press H to go heading-by-heading. That's fine.
   But I could also press NVDA+F7 to open the Elements List, jump to Headings tab, and see all of them at once.
   I can see [describes list] - let me jump to 'The Practice Files' heading.
   Much faster than stepping through."
  ```

### Chapter 3: The Learning Room (Day 1 Block 1-5)

**Key before starting:** Everyone must read this chapter before Day 1 begins. It explains the environment, PR workflow, bot feedback, and peer review model.

- **Facilitator role:** Reinforce the fork-edit-PR workflow
- **What not to do:** Don't let participants edit the `learning-room` repo directly. They must fork first.
- **Automation introduction:** Explain that the bot comments are not grading - they are teaching
- **Common errors:** Editing `main` instead of creating a branch; committing directly instead of PRing; not requesting a human review
- **Demo the bot feedback:**
  ```
  "When you open your PR, within 30 seconds you'll see a comment from a bot.
   The bot is checking: does your heading hierarchy go H1, H2, H3 (not skipping)?
   Are your links descriptive (not 'click here')?
   Did you spell everything correctly?
   It will link you to resources explaining the rules.
   But here's the important part: the bot is not rejecting your PR.
   It's teaching. You can learn from the bot feedback and still ask your reviewers for human judgment."
  ```

### Chapters 4-6: Issues, VS Code Accessibility & Pull Requests (Day 1 Blocks 2-4)

**Chapter 4: Working with Issues**
- **Purpose:** Understanding issue lifecycle, templates, labeling
- **Live demo:** Open an issue in the learning-room repo, show the anatomy - title, description, labels, assignee, milestone, comments
- **Interactive activity:** Have participants navigate an issue end-to-end with their screen reader
  - Find the issue title (should be first heading)
  - Navigate to the description with `H` or by scrolling
  - Find the labels (usually below description)
  - See the comments section
- **Accessibility teaching point:** "An issue is a conversation. Each comment is timestamped. Your screen reader can navigate them with `D` to find the 'Comments' section, then use arrow keys through the list."
- **Demo script for issue anatomy:**
  ```
  "I'm opening issue #1 in the learning-room repo.
   My screen reader announces it: heading level 1, 'Welcome! Introduce yourself'.
   That's the issue title. Below it is the issue body - the full description.
   If I press H, I move to the next heading. There shouldn't be one - just the comments below.
   If I press D, I move through landmarks until I find the Comments section.
   Then I can use arrow keys to navigate each comment one by one.
   The bot comment, the first person's introduction, the second person's - they're all visible
   because they're in the same accessibility tree."
  ```

**Chapter 6: Working with Pull Requests**
- **Purpose:** Understanding PR anatomy, creating a PR, reviewing, merging
- **Emphasize:** A PR is a proposal. It asks, "Can you merge these commits to main?" It is not automatic.
- **Interactive activity:** Have everyone read the sample PR (pre-seeded on practice-review branch) with their screen reader
- **Common confusion:** Difference between suggesting changes (non-blocking) versus requesting changes (blocking)
- **Accessibility insight:** "A PR conversation is denser than issues because diffs are involved. Your screen reader will announce code blocks as such. You may find it easier to read diffs by requesting changes (which shows the side-by-side) than by trying to parse the raw diff."
- **Demo the diff navigation:**
  ```
  "Opens a PR with a change to a markdown file
   The diff section uses <pre> tags - screen readers announce them as code blocks.
   Instead of reading the raw diff, I can press R to request changes.
   That opens a suggestion editor where I can see the old and new side-by-side.
   Much more readable."
  ```

### Chapter 7: Merge Conflicts (Reference; covered in-context)

**When it matters:** Usually NOT during the workshop, but valuable for future contribution
- **Facilitator talking point:** "Merge conflicts happen when two people edit the same line. GitHub shows you both changes and asks you to pick. You will probably not see this in the workshop - we'll stagger everyone working on different files."
- **If conflict occurs:** Don't panic. Open the file. You'll see markers like `<<<<<<` and `======` and `>>>>>>`. They show the conflicting sections. You delete one, keep the other.
- **Common error:** Thinking a merge conflict is a failure. It's not - it's normal in large projects.

### Chapter 8: Culture & Etiquette (Day 1 Block 6)

**Purpose:** Building inclusive communities, understanding norms
- **Facilitator role:** Model the behavior described
- **Accessibility-specific point:** "In this project, we document accessibility decisions because our contributors include people with disabilities. That's not a burden - it's a feature. It's how we ensure no one is left out."
- **Common misunderstanding:** "I don't want to break the build." Reassure participants that CI failures are learning moments, not disasters.
- **Demo:** Show a PR with a helpful, kind review comment versus a curt one. Discuss the difference.

### Chapters 9-10: Tracking & Notifications (Day 1 Block 6)

**Chapter 9: Labels, Milestones, Projects**
- **In practice:** Students won't be creating labels, but they will see them and need to understand what they mean
- **Facilitator tip:** "Before Block 5, create a quick reference list of your labels and what they mean. Pin it to a document. Students can refer to it."
- **Interactive activity:** Show the learning-room repo's label bar. Have everyone navigate labels on an issue: press `K` to move through links until they find a label link, press Enter, they see all issues with that label

**Chapter 10: Notifications**
- **Value:** "Notifications let you stay aware without being overwhelmed. You control what creates a notification - starring, watching, participating in a conversation."
- **Accessibility point:** "Your notification inbox is more reliable than email forwarding. GitHub's inbox is fully accessible."
- **Demo:** Open the notification bell. Navigate to the inbox. Show how to navigate notification history.

### Chapters 5 and 11-16: Day 2 Deep Dives (Day 2 Blocks 1-5)

**Chapter 5: VS Code Accessibility**
- **Before starting:** Everyone should have VS Code installed and VS Code Insiders Extension Pack installed
- **Screen reader mode:** This is critical. Demo it - `Shift+Alt+F1` to toggle
- **Navigation shortcuts:**
  - `Ctrl+P` - quick file open
  - `Ctrl+Shift+P` - command palette
  - `Ctrl+Shift+E` - explorer/file tree
  - `Ctrl+G` - go to line
- **Common struggle:** "Why is the code so hard to read?" Answer: "You're not meant to read it top-to-bottom. You navigate by symbols, jumps, search. VS Code accessibility mode makes that workflow clear."
- **Demo script:**
  ```
  "Opens VS Code with a project
   I press Ctrl+P - Quick Open appears.
   I type the filename I want - say, 'daily-briefing'
   I get instant matches. Press Enter - file opens.
   Now I press Ctrl+Shift+P - Command Palette.
   I'm looking for a command - maybe 'Go to Definition'
   I type it, press Enter, VS Code jumps me to where that function is defined.
   This is how sighted devs navigate with a mouse - using 'Go', 'Find', 'Definition'.
   Screen reader mode + keyboard makes that pattern native."
  ```

**Chapter 11: Git & Source Control**
- **Prerequisites:** Git installed locally. VS Code's Source Control panel visible.
- **Workflow recap:** 
  1. Create a branch (VS Code UI or terminal `git checkout -b`)
  2. Make edits (edit files)
  3. Commit (Source Control panel → message → commit)
  4. Push (Terminal: `git push origin branch-name`)
  5. Open PR (GitHub web)
- **Common error:** Forgetting to push. Changes exist locally but not on GitHub until pushed.
- **Demo:**
  ```
  "I've made changes to a file in VS Code.
   I open the Source Control panel - Ctrl+Shift+G
   It shows me which files changed.
   I type a commit message: 'Add documentation for markdown syntax'
   I press Ctrl+Enter to commit.
   Now I'm ready to push.
   But wait - I need a branch first. Let me create one.
   Terminal: git checkout -b fix-docs
   Now I commit to that branch.
   Now I push: git push origin fix-docs
   GitHub sees that push and offers me a button to create a PR from that branch.
   Click it, and I'm in familiar territory - the PR form."
  ```

**Chapter 12: GitHub Pull Requests Extension**
- **Value:** "This extension brings GitHub into VS Code. No context switching."
- **Demo:**  Open the PR panel (click icon in left sidebar). Show how to see all assigned PRs, review right from VS Code.
- **Advantage for screen reader users:** "You can navigate a PR's diff, comments, and details without leaving VS Code. The context is continuous."

**Chapter 13: GitHub Copilot** (Introduce carefully)
- **Important caveat:** "Copilot is a tool, not a replacement for thinking. It makes suggestions based on training data. You evaluate them."
- **Accessibility note:** "Copilot inline suggestions appear in the editor. Screen reader users may need to toggle suggestions on/off depending on focus preference. Demo: `Ctrl+Alt+\` to toggle."
- **Use case:** "Copilot is great for boilerplate, docstrings, and repetitive patterns. It is not great for novel or domain-specific logic."
- **Demo:**
  ```
  "I'm writing a Python function to validate GitHub URLs.
   I type: def validate_github_url(url):
   I press Ctrl+/ wait a moment
   Copilot suggests some code.
   I can press Tab to accept, Escape to reject, or keep typing to override.
   I choose to accept, then I modify it for my specific needs.
   Copilot handled the boilerplate."
  ```

**Chapter 14: Accessible Code Review**
- **Purpose:** Teaching the review perspective, not just the author's
- **Key concept:** "Good code review feedback is specific, kind, and teaches. It's not gatekeeping."
- **Interactive activity:** Have participants read a sample PR and draft review comments together
- **Accessibility focus:** "When reviewing, check heading hierarchy, link text, alt text, color contrast. These are code quality issues, not afterthoughts."

**Chapter 15: Issue Templates** (Usually pre-configured; reference only)
- **What's happening:** Your repo's issue template is guiding participants' reports
- **If customizing:** Make sure template is accessible - test with screen reader before using
- **Demo:** Create a sample issue using the template to show participants what structure they should follow

**Chapter 16: Accessibility Agents** 
- **This is the capstone.** Participants use the tools from all previous chapters to understand and improve a real open source project.
- **Facilitator role:** Enable not prescribe. Answer questions, don't drive choices.
- **Common pattern:** "I found a bug in the agent tool. Can I fix it?" YES! That's a real contribution. Show them how to file an issue, fork, clone, edit, and PR.


## Accessibility Testing Checklist for Facilitators

Before Day 1 and Day 2 start, verify the following on your demo machine AND participant machines:

### Screen Reader Setup (NVDA)
- [ ] NVDA installed, latest stable version
- [ ] Browse Mode / Focus Mode switching works (`NVDA+Space`)
- [ ] Single-key navigation active: `H` (headings), `D` (landmarks), `K` (links), `T` (tables)
- [ ] Elements List opens (`Insert+F3`)
- [ ] GitHub.com announces page headings correctly
- [ ] GitHub issue/PR pages announce title, description, comments in order
- [ ] Markdown tables are readable (table mode navigates rows/cols with arrows)
- [ ] Code blocks announce as code
- [ ] Buttons and form fields navigate with `B` and `F`

### Screen Reader Setup (JAWS)
- [ ] JAWS installed, latest version
- [ ] Browse Mode / Forms Mode toggling works
- [ ] Virtual cursor navigation works
- [ ] Virtual PC cursor works for mousing interactions
- [ ] Table reading mode navigates correctly
- [ ] Headings landmark navigation works

### Screen Reader Setup (VoiceOver - macOS)
- [ ] VoiceOver enabled (Cmd+F5)
- [ ] Web rotor works (VO+U)
- [ ] Rotor shows headings, form fields, links in order
- [ ] Keyboard navigation works (VO+Right Arrow through elements)

### Browser Configuration
- [ ] Hovercards are OFF (GitHub Settings → Accessibility → Turn off hovercards)
- [ ] GitHub modern experience is ON if using Issues/Projects (Feature preview)
- [ ] JavaScript is enabled (required for GitHub)
- [ ] Dark mode or light mode is stable (no flashing or flickering when toggling)

### VS Code (for Day 2)
- [ ] VS Code installed (latest stable)
- [ ] Screen reader mode enabled (`Shift+Alt+F1` or Settings)
- [ ] Accessibility support setting is `on`
- [ ] Single-key file navigation works (`Ctrl+P`)
- [ ] Command palette works (`Ctrl+Shift+P`)
- [ ] Terminal opens and is readable (`Ctrl+Backtick`)
- [ ] Source control panel visible (`Ctrl+Shift+G`)
- [ ] Markdown preview renders tables accessibly
- [ ] Extensions are readable in the sidebar

### Exercise Verification
- [ ] Learning-room repo is public and accessible without login
- [ ] Issues tab shows the practice issues clearly
- [ ] Pull requests tab shows the practice PR
- [ ] Markdown files in `learning-room/docs/` render without errors
- [ ] No broken links in practice files (if they're supposed to be broken for the exercise, verify they display clearly as broken)


## Facilitator Q&A Guide

### "I pressed H and nothing happens"
**Problem:** Single-key navigation is disabled or broken.  
**Solution:**  
1. Are you in Browse Mode? (NVDA: press `NVDA+Space`)
2. Is the page a GitHub page, or a different website where H might be reserved?
3. Try pressing `H` again while holding `Shift` in case it's a mode issue.
4. Refresh the page (`Ctrl+R` or `Cmd+R`).  
**Escalation:** If still broken, it may be a NVDA/screen reader version issue - consider restarting the screen reader.

### "I can't find the Issues tab"
**Problem:** Repository navigation is not visible/not announced.  
**Solution:**  
1. Press `H` to go to the next heading. If you hear "Code," "Issues," "Pull Requests," you're in the repo navigation.
2. If not, press `D` to jump to the Repository Navigation landmark.
3. Once you hear any of those tabs, press `K` to navigate the links within it.  
**Teaching point:** "The tabs are links, not buttons. Press Enter, not Space."

### "The table is hard to read"
**Problem:** Markdown tables are rendering but the screen reader isn't navigating them well.  
**Solution:**  
1. Are you in table mode? (NVDA: when in a table, you can press `NVDA+Alt+T` to toggle table mode)
2. In table mode, arrow keys navigate cells, `Ctrl+Home` jumps to the first cell.
3. If still hard: read the table headers first (usually first row or first column), then navigate row by row.  
**Accessibility note:** Markdown tables have limitations - HTML tables are more accessible, but Markdown is what we have here.

### "I filed an issue but the bot didn't respond"
**Problem:** Bot has not commented after 5 minutes.  
**Solution:**  
1. Verify the repository is PUBLIC (bots require this on free tier).
2. Navigate to the Actions tab in that repository. You should see a workflow run. Has it completed?
3. If the run failed, click it to see logs. Most common error: GitHub Actions didn't have permission to comment (Settings → Actions → Permissions).
4. If the run is still pending, wait up to 2 minutes more.
5. If 5+ minutes and no action: refresh the page. Sometimes the UI doesn't update.  
**Escalation:** Manually verify the issue was created (it should be in the Issues tab).

### "I can't commit because 'nothing to commit'"
**Problem:** A student tries to commit but the VS Code terminal says "nothing to commit."  
**Solution:**  
1. Did you actually edit a file? Open the file and make sure your changes are there.
2. Did you save the file? (`Ctrl+S`)
3. Does the Source Control panel show the file as changed? (`Ctrl+Shift+G`)
4. If you see the file in the Source Control panel but it won't show as changed: the file may not be part of your workspace. Make sure you're working in the right folder.  
**Teaching point:** Git only tracks changes to files it already knows about. If you create a new file, it will show in Source Control as "Untracked" - you must add it first (click the `+` next to the filename).

### "I don't understand the diff"
**Problem:** The GitHub diff view is hard to parse on a screen reader.  
**Solution:**  
1. If reading a diff on GitHub's web, try requesting changes (`R` key) to get a suggestion view (side-by-side or inline).
2. If reading in VS Code, the diff viewer is more accessible than GitHub's web diff.
3. Alternative: just read the file as it is now. The diff is additive context - not always necessary to review.  
**Accessibility teaching point:** "Code reviews aren't always about reading diffs. They're about understanding intent. Ask the author: What changed and why? That conversation might matter more than parsing the diff syntax."

### "I keep getting permission denied when pushing"
**Problem:** Git push fails with "Permission denied" or "Authentication failed."  
**Solution:**  
1. Are you authenticated to GitHub? (`gh auth status`)
2. If not authenticated: `gh auth login` → follow prompts.
3. If authenticated but still failing: Is the branch name spelled right? (`git branch` to see your current branch)
4. Is the remote correct? (`git remote -v` to verify origin points to your fork)
5. Have you pushed this branch before, or is it new? (First push requires `git push -u origin branch-name`)  
**Common beginner error:** Trying to push to the upstream repo instead of their fork. Push to your fork first, then open a PR upstream.

### "The agent command didn't work"
**Problem:** User typed `@accessibility-lead write a test` and got no response.  
**Solution:**  
1. Are you in Copilot Chat? (Icon in the left sidebar, or `Ctrl+Alt+I`)
2. Did you include the `@agent-name`? Some agents are invoked with @ symbol, some with `/slash commands.`
3. Did Copilot Chat load correctly? Try closing the panel and reopening.
4. Is the agent installed in your `.github/agents/` folder? (Verify by navigating to `.github/` and checking the file list)
5. If you're offline, agents won't work (they're running in the cloud).  
**Escalation:** Check Copilot Chat logs (bottom of chat panel) for error messages.

### "I don't know what commit message to write"
**Problem:** Student is staring at the commit message prompt, uncertain what to say.  
**Talking point / suggestion:**  
```
"A good commit message is:
- First line: one sentence, present tense, no more than 50 characters
- Example: 'Add keyboard shortcuts for JAWS'
- Second line: blank line
- Rest (optional): details explaining why (not what - git diff shows what)
- Example: 'JAWS users requested this feature in issue #42'"
```
**Demo:**
```
git commit -m "Add keyboard shortcuts for JAWS

This resolves #42. JAWS users noted the shortcuts were missing from the docs."
```

### "What if I make a breaking change?"
**Problem:** Participant is worried their edit might break something.  
**Reassurance:**  
1. "You're editing documentation or adding features. Documentation changes don't break anything - they clarify. Feature additions go in a PR where others review first."
2. "If you do break something, that's how we learn. We'll see it in CI (if we have tests) or in code review. You revert it, we move on."
3. "The main branch is protected. You can't accidentally push breaking changes directly - you must PR first, be reviewed, then merge."

### "How do I know if my PR is good enough?"
**Problem:** Participant is uncertain whether their work meets the standard.  
**Process to explain:**  
1. Submit your PR (you've already done the hard part).
2. Wait for bot feedback. Does it pass checks?
3. Request human review (ask @ people in the comments).
4. Read their suggestions.
5. Make changes if you agree.
6. When you and the reviewers agree, they'll approve and merge.
7. If you disagree with feedback, explain why in a comment. Conversation happens.  
**Philosophy:** "There's no 'good enough' - there's 'what did you try?' and 'what did you learn?' Your first contribution might be small, but it counts."


## Common Patterns & How to Explain Them

### The Fork-Edit-PR Workflow
**Why it's confusing:** It requires working across three repositories (upstream, your fork, local clone). Visual developers see this as click-fork-click-edit-click-PR. Screen reader users navigate three different sites.

**How to teach it:**
```
"Let me walk through the three repositories.

1. Upstream repo - Community-Access/learning-room
   This is the official repository. You can't edit it directly.

2. Your fork - [your-name]/learning-room
   When you click Fork, GitHub copies the entire repo to your account.
   This is your personal copy. You CAN edit this one.

3. Your local clone - on your laptop, in a folder
   You get the fork onto your laptop with git clone.
   You edit here, in actual files, then push back to the fork.

The flow: Edit locally → commit → push to fork → open PR from fork to upstream.
All three repositories are talking to each other, but you're the only one editing the one you control."
```

### GitHub Actions / Automation
**Why it's confusing:** Something happens automatically behind the scenes. Users can't see the mechanism.

**How to teach it:**
```
"When you open a PR, GitHub has optional 'watchers' - like automated reviewers.
A bot watches for the PR and runs checks.
Did you follow the format? The bot checks.
Are there any typos? The bot can scan.
Invalid markdown? The bot flags it.
All within 30 seconds. The bot isn't smart - it's just very, very fast.
And it's not mean - it's teaching. It links you to resources, not blocking you."
```

### Merge Conflicts
**Why it's confusing:** Two people can't both change the same line. Git doesn't know which version is right.

**How to teach it:**
```
"Imagine a document you and I are both editing.
You added a sentence to line 10.
I also added a sentence to line 10.
You do it first - your sentence is on main now.
I try to push my sentence to line 10.
Git says: 'I have TWO sentences here. I don't know which one is correct.'
I have to go in and pick one, delete the other, or combine them.
Then I commit the fix and push again.
It's not a failure - it's just how parallel editing works."
```


*Questions about facilitation? Open an issue with the `question` label. Contributions to this guide are welcome.*
