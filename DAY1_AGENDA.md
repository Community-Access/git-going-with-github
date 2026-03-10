# Day 1 Agenda
## Open Source Assistive Technology Hackathon - GitHub Learning Lab

> **Day 1 Focus:** The GitHub web interface - navigating repositories, filing and responding to issues, understanding pull requests, and contributing through the browser using only your keyboard and screen reader.
>
> **How learning works today:** Each participant works through two tracks in parallel. GitHub Skills modules give you a real repository in your own GitHub account, with a bot called Mona that responds to your actions automatically and guides you through each step. The shared `learning-room` repo is for group exercises and the collaborative contribution sprint. The two tracks reinforce exactly the same skills.


## GitHub Skills Modules Used Today

Three modules run across Day 1. You will set each one up during the block where it is introduced - no pre-work required.

| Module | When | What Mona teaches |
|--------|------|-------------------|
| [Introduction to GitHub](https://github.com/skills/introduction-to-github) | Blocks 1-3 | Branches, commits, pull requests, merge |
| [Communicate Using Markdown](https://github.com/skills/communicate-using-markdown) | Block 3 | Headings, emphasis, links, code, task lists, tables |
| [Review Pull Requests](https://github.com/skills/review-pull-requests) | Block 4 | Assign reviewers, leave comments, suggest changes, approve, merge |

**How GitHub Skills modules work:**
1. You navigate to the module URL and activate "Start course" - this copies the repository to your GitHub account
2. Mona (a GitHub Actions bot) reads your account's new repo, creates an issue with Step 1 instructions, and waits
3. You follow the instructions in the issue. When you complete a step - create a branch, open a PR, merge - Mona detects it and responds with the next step
4. Repeat until completion. You receive a course completion badge on your profile.

**Why this is different from a tutorial:** You are not reading about GitHub. You are doing GitHub, in your own repository, and an automated system is verifying each step and giving you feedback. The mechanics are identical to what happens when you contribute to any real open source project.


## Read This BEFORE Day 1 Starts

**[Chapter 3: The Learning Room](docs/04-the-learning-room.md)** - Your complete guide to the shared repo, PR sharing workflow, and how the automation system works. Read this before Block 0 to understand the environment where you'll be making real contributions.


## At a Glance

| Block | Time | Topic | Skills Module |
|-------|------|-------|--------------|
| 0 | 9:00 AM | Welcome, setup verification, and introductions | - |
| 1 | 9:30 AM | Screen reader orientation to GitHub | Introduction to GitHub (setup) |
| 2 | 10:10 AM | Navigating repositories and Markdown module setup | Introduction to GitHub (Steps 1-2) + Communicate Using Markdown (setup) |
| - | 11:00 AM | **Break** | - |
| 3 | 11:15 AM | Working with Issues and Pull Requests | Introduction to GitHub (Steps 2-4) |
| 4 | 12:10 PM | Pull Request review and merge | Review Pull Requests |
| - | 1:00 PM | **Lunch** | - |
| 5 | 2:00 PM | Your first real contribution sprint | `learning-room` (group) |
| - | 3:00 PM | **Break** | - |
| 6 | 3:15 PM | Community: culture, etiquette, labels, and notifications | `learning-room` (group) |
| - | 4:30 PM | Wrap-up, completions, and Day 2 preview | - |

**Total:** ~7.5 hours of structured time


## Pre-Day Checklist

Before entering the room (or joining the call), participants should have completed everything in [Pre-Workshop Setup](docs/00-pre-workshop-setup.md). The facilitator will do a quick verification at the start.

GitHub Skills modules require no pre-work - they are set up together, in-session, during the blocks where they are used.


## Block 0 - Welcome and Orientation (9:00 AM, 45 min)

### Date & Location
**Saturday, March 7, 2026** | 9:00 AM - 5:00 PM  
**Sunday, March 8, 2026** | 9:00 AM - 5:00 PM

### Purpose
Make participants comfortable, set expectations, verify setups, and create a psychologically safe space for the day.

### Activities

**Facilitator introduces:**
- The purpose of this session: building real, usable GitHub skills for open source AT contribution
- What "contribution" means - it is not only code. Documentation, accessibility testing, issue triage, and feedback are all valuable contributions.
- The "ask before you assume" norm - it is always OK to ask what something means
- The two-track learning model: GitHub Skills (your own account) + `learning-room` (group exercises)

**Quick setup verification (10 minutes):**
- Can everyone navigate to the repo URL?
- Does everyone's screen reader announce page headings?
- Is hovercards turned off? (If not - navigate to Accessibility Settings now)
- Can everyone access GitHub Issues and Pull Requests? (Modern experience may already be active - if not, verify via User Menu → Feature preview; see Step 4 in [Pre-Workshop Setup](docs/00-pre-workshop-setup.md))

**Clone the learning-room repository (15 minutes):**
Everyone will work in the shared `learning-room` repository today. Clone it now so it's ready for Block 5:
1. Open your terminal (or GitHub Desktop if you prefer GUI)
2. Navigate to where you store projects: `cd ~/Documents` (or your preferred location)
3. Clone the repository:
   ```bash
   git clone https://github.com/Community-Access/learning-room.git
   cd learning-room
   ```
4. Verify you can see the files: `ls` (you should see `README.md`, `docs/`, etc.)
5. **Optional:** Open the folder in your code editor to explore the file structure

**Introductions:**
- Each participant: your name, your screen reader and OS, what brings you here


## Block 1 - Screen Reader Orientation to GitHub (9:30 AM, 40 min)

### Purpose
Establish a shared navigation foundation AND set up the Introduction to GitHub Skills module. Every participant leaves this block with a real repository in their own account and a message from Mona waiting for them.

### Key Concepts Covered
- Browse Mode vs Focus Mode - when to be in each
- Single-key navigation: H (headings), D (landmarks), K (links), B (buttons), F (form fields)
- The Elements List (`NVDA+F7` / `Insert+F3` JAWS / VoiceOver Rotor `VO+U`)
- How GitHub uses landmarks - navigation, main, search-results
- Submitting text with `Ctrl+Enter`

### Part A - Navigate GitHub Together (15 min)

**Navigate the GitHub homepage:**
1. Open GitHub.com - what is announced? (heading level, landmark)
2. Press `H` repeatedly - list the headings aloud
3. Press `D` - what landmarks exist?
4. Open Elements List - how many links are on the page?

**Navigate the learning-room repo (group):**
1. Go to `github.com/Community-Access/learning-room`
2. Find the repo name with `1` (h1)
3. Find the tab bar (Issues, Pull Requests, etc.) with `D` → repository navigation landmark
4. Navigate the files table with `T` then `Ctrl+Alt+↓`
5. Open `README.md` - read the "What Is in This Repository" table

**Explore the practice files:**
The `docs/` folder contains three files with intentional issues that you will fix during today's contribution sprint:

| File | What it contains | What students will fix |
|------|------------------|----------------------|
| `docs/welcome.md` | Introduction to open source contribution | Three `[TODO]` sections to complete (contributor backgrounds, evaluating issues, GitHub profile impact) |
| `docs/keyboard-shortcuts.md` | NVDA, JAWS, and VoiceOver shortcut tables | Intentional errors in keyboard shortcut references |
| `docs/setup-guide.md` | Step-by-step GitHub setup instructions | Broken links and incomplete steps |

6. Open `docs/welcome.md` - navigate with `H` to read the headings. Notice the `[TODO]` markers. You will fix these during the contribution sprint in Block 5.

> **Key insight:** These files are intentionally imperfect. You will explore them in detail during Block 5 when you are ready to contribute. For now, notice the structure - headings, tables, links - and how your screen reader announces each one.

### Part B - Set Up Your First GitHub Skills Repository

> **Magic Moment #1:** You are about to copy a real repository to your own GitHub account. When you complete this, you will have made your first GitHub action - and Mona will respond automatically.

**Group activity - follow together:**

1. Navigate to the [Introduction to GitHub skills course](https://github.com/skills/introduction-to-github)
2. Read the repository description with your screen reader
3. Find and activate the **"Start course"** button (NVDA/JAWS: `B` to navigate buttons; VoiceOver: `VO+Right` → find the button → `VO+Space`)
4. GitHub opens a "Create a new repository" page - fill in:
   - Owner: your account
   - Repository name: accept the pre-filled name
   - Public or private: Public
5. Activate "Create repository"

**Wait together:** GitHub redirects you to your new repository. Mona is running in the background. Within 20 seconds, Mona will:
- Create an issue: "Welcome to GitHub!"
- Tag you in it with `@[your-username]`
- Post Step 1 instructions

**Verify:** Navigate to the Issues tab → open Issue #1. What does Mona say? Read it aloud using your screen reader.

> This is the same mechanism used by open source projects with bot-assisted workflows - Dependabot, GitHub Actions CI, automated labelers. You are experiencing that pattern for the first time right now.

### Reference Document
[Screen Reader Cheat Sheet](docs/appendix-b-screen-reader-cheatsheet.md)


## Block 2 - Navigating Repositories (10:10 AM, 50 min)

### Purpose
Participants can confidently explore any GitHub repository using only their screen reader and keyboard - both your own (Skills repo) and others.

### Key Concepts Covered
- Anatomy of a repository page (tabs, description, files table, README)
- Switching branches
- Viewing a file's history
- Reading a commit
- Finding contributor information

### Part A - Introduction to GitHub: Step 1 (20 min)

Mona's issue told you to create a branch. Before doing that, explore your new repository with your screen reader.

> **Screen reader navigation practice:** Answer these questions using only keyboard navigation - no mouse.

1. How many files are in the root of your repo?
2. What is the repository description?
3. When was the README last committed (find the commit date in the file table)?
4. Who created the repo? (find the "About" sidebar)

**Now follow Mona's Step 1 instructions:** Create a branch named `my-first-branch`

- Find the branch switcher button on the Code tab (B to navigate buttons → find "main")
- Activate it, type the new branch name: `my-first-branch`
- Activate "Create branch: my-first-branch"

Mona detects the new branch and updates the issue with Step 2 instructions.

### Part B - Exploring the learning-room Repo (25 min)

Now practice the same navigation skills in the shared group repo.

**Activity 2A - Repo Exploration:**
Find the answers to these questions using keyboard navigation in `learning-room`:
1. How many files are in the `docs/` folder?
2. What is the description of the repo?
3. Who opened the last commit?
4. When was `docs/welcome.md` last edited?
5. How many branches exist?

**Activity 2B - Reading Practice File Content:**
1. Open `docs/keyboard-shortcuts.md`
2. Navigate to the NVDA section using `2` (H2 headings)
3. Find the "Single-Key Navigation" table with `T`
4. Read through the table rows - how many shortcuts are listed for NVDA?
5. Navigate to the VoiceOver section - what is the VoiceOver modifier key combination?
6. Open `docs/CHALLENGES.md` - navigate to "Beginner Challenges" with `2`
7. Read Challenge 1 - which file does it ask you to fix, and what is the issue?

**Activity 2C - Reading a Commit:**
1. Navigate to the Commits tab
2. Find the most recent commit - read its message aloud
3. Open that commit - navigate the diff with your screen reader
4. What file(s) changed, and what specifically changed?

**Activity 2D - Branch Navigation:**
1. Open the branch dropdown (find the "main" button)
2. Switch to the `day1-practice` branch
3. Navigate to `docs/` - do any files differ from `main`?
4. Switch back to `main`

### Part C - Set Up Communicate Using Markdown Skills Module (10 min)

> **The Markdown module** runs alongside everything else you do today. Every comment you write, every issue you file, every PR description - you are practicing Markdown in real GitHub contexts.

1. Navigate to the [Communicate Using Markdown skills course](https://github.com/skills/communicate-using-markdown)
2. "Start course" → create the repo in your account
3. Wait for Mona to create Issue #1 with Step 1 instructions
4. Read the instructions - Mona will walk you through: headers, emphasis, images, code blocks, task lists, and tables

You will work through each Markdown step during the natural pauses in Blocks 3 and 4. Your facilitator will call out when to switch.

### Reference Document
[Navigating Repositories](docs/03-navigating-repositories.md)


## Break (11:00 AM, 15 min)

Encourage participants to stand, stretch, and rest their ears. Screen reader listening is cognitively demanding work.


## Block 3 - Working with Issues and Pull Requests (11:15 AM, 55 min)

### Purpose
Participants can file, read, respond to, and navigate issues - and open their first pull request.

### Catch-Up Buffer (5 min)

If you are still completing a Skills module step from Block 2, finish it now. If you are on pace, start a Communicate Using Markdown step - you will use Markdown in every activity from this point forward.

### Key Concepts Covered
- What issues are and why they matter
- Searching and filtering the issues list
- Filing a new issue using a template
- Commenting with Markdown - headings, bold, links, code, task lists
- @mentions and cross-references
- `good first issue` label

### Part A - Introduction to GitHub: Step 2 - Add a File (15 min)

Mona's Step 2 instructions ask you to commit a new file to your `my-first-branch` branch.

1. Navigate to your Skills repo → switch to `my-first-branch`
2. Find and activate "Add file" button → "Create new file"
3. Name the file: `PROFILE.md`
4. In the editor (switch to Focus Mode): type a brief self-introduction:

```markdown
# Hello, I am [your name]

I use [your screen reader] on [your OS].

I am contributing to open source because...
```

5. Commit the file to `my-first-branch` (fill in a commit message → "Commit new file")

Mona detects your commit and responds with Step 3 instructions: open a pull request.

### Part B - Introduction to GitHub: Step 3 - Open a Pull Request (15 min)

Return to your `introduction-to-github` Skills repo. Mona has asked you to open a pull request from `my-first-branch` into `main`.

1. Navigate to the Pull Requests tab
2. Activate "New pull request"
3. The base should be `main`, the compare branch `my-first-branch`
4. Review the diff - your `PROFILE.md` appears as an addition
5. Fill in the PR title: `Add my profile`
6. In the PR description field (Focus Mode), write:\
```markdown
## What this adds

A profile introduction for [your name].

## Why

Getting started with open source AT contributions.
```
7. Submit the PR

> **Magic Moment #2:** Mona will respond to your PR within seconds. Navigate to the Conversations tab of your new PR. Mona has left a comment - read it with your screen reader. This is automated feedback on your real GitHub action, from an actual GitHub Actions workflow running in your repository.

### Part C - Issues Practice in learning-room (20 min)

**Activity 3A - Find and read a challenge issue:**
1. Navigate to `learning-room` Issues tab
2. Filter by `good first issue` label: type `is:open label:"good first issue"` in the filter bar
3. Open issue #1 - "Welcome! Introduce yourself"
4. Read the full issue description with your screen reader

**Activity 3B - Leave a comment on the welcome issue:**
1. Navigate to the comment box (`D` → "Add a comment" landmark or region)
2. Switch to Focus Mode - type your introduction using Markdown:
   - Use `##` for a heading with your name
   - Bold your screen reader name with `**NVDA**` or `**JAWS**` or `**VoiceOver**`
   - Add a task list of things you want to learn:
     ```markdown
     - [ ] Fix a broken link in setup-guide.md
     - [ ] Complete a [TODO] section in welcome.md
     - [ ] Add a keyboard shortcut to keyboard-shortcuts.md
     ```
3. Submit with `Ctrl+Enter`

**Activity 3C - File a new issue based on what you found:**
1. Navigate to Issues → New issue
2. Choose the "Beginner Challenge" template (this maps to Challenge 1, 2, or 3 from CHALLENGES.md)
3. In the title, be specific: "Fix broken link in docs/welcome.md" or "Add missing NVDA shortcut to keyboard-shortcuts.md"
4. In the description, reference the file and line where you found the issue:
   ```markdown
   ## What I found
   The `[DATE]` placeholder at the bottom of `docs/welcome.md` needs to be updated with today's date.

   ## Which challenge
   Challenge 1: Update [DATE] Placeholder (from CHALLENGES.md)
   ```
5. Submit - note the issue number. You will use `Closes #XX` in your PR during Block 5

### Reference Document
[Working with Issues](docs/05-working-with-issues.md) | [GitHub Concepts Glossary](docs/appendix-a-glossary.md)


## Block 4 - Understanding Pull Requests (12:10 PM, 50 min)

### Purpose
Participants understand what pull requests are, how to read one, and how to participate in a review - by reviewing a PR that Mona creates specifically for them.

### Catch-Up Buffer (5 min)

If you are still completing Step 2 or Step 3 from the Introduction to GitHub module, finish your current step now. If you are on pace, work through a Communicate Using Markdown step.

### Key Concepts Covered
- Anatomy of a PR (title, description, base/compare branches)
- Navigating the three PR tabs: Conversation, Commits, Files Changed
- Reading a diff - additions, deletions, context lines
- Reviewing a PR - inline comments, overall comments, approvals
- Status checks

### Part A - Set Up Review Pull Requests Skills Module (10 min)

> **Magic Moment #3:** Instead of reviewing a pre-built PR in a shared repo, you are about to review a pull request that Mona creates *exclusively for you*, in *your own repository*. The content of the PR is real. Your review will be read by Mona and trigger the next step.

1. Navigate to the [Review Pull Requests skills course](https://github.com/skills/review-pull-requests)
2. "Start course" → create the repo in your account
3. Wait for Mona to create Issue #1 and a practice pull request titled "Update the game over message"
4. Navigate to the Pull Requests tab - open the PR Mona created

### Part B - Review the Pull Request (25 min)

Work through Mona's instructions for the review:

**Navigate the PR with your screen reader:**
1. Read the PR title and description (Conversation tab)
2. Navigate to Commits tab - how many commits? Who authored them?
3. Navigate to Files Changed tab
4. Navigate the diff - what changed in which file?

**Leave an inline comment:**
1. In Files Changed, navigate to the changed line
2. Find the comment button (screen reader note: in the New Files Changed Experience, changed lines have a comment button - use `B` to find it, or right-click/`Shift+F10` on the line)
3. Type an inline comment: "This change improves clarity for users who have lost - good improvement."
4. Submit as "Start a review"

**Submit your review:**
1. Back on the Conversation tab, navigate to "Finish your review"
2. Add an overall comment: "Good change. I've left one inline note."
3. Select "Approve"
4. Submit your review

> **Mona responds:** After you submit the approval, Mona merges the PR automatically and creates the next step.

### Part C - Introduction to GitHub: Step 4 - Merge Your PR (10 min)

Return to your `introduction-to-github` Skills repo. Mona has been waiting for you to merge your own PR.

1. Navigate to your open PR ("Add my profile")
2. Confirm there are no merge conflicts (Mona will have noted this)
3. Find and activate the "Merge pull request" button
4. Confirm the merge
5. Navigate back to the Code tab - `PROFILE.md` now appears on `main`

> **Magic Moment #4:** The `introduction-to-github` course is now complete. Navigate to the [Introduction to GitHub skills course](https://github.com/skills/introduction-to-github) - your completion badge appears on the course page. Your GitHub profile now shows this course as completed.

### Reference Document
[Working with Pull Requests](docs/06-working-with-pull-requests.md)


## Lunch (1:00 PM, 60 min)


## Block 5 - Your First Real Contribution Sprint (2:00 PM, 60 min)

### Purpose
Every participant makes at least one real contribution to the `learning-room` repo. This block is where the mechanics practiced in the Skills modules get applied to a collaborative, real-world contribution - with both automated bot feedback AND another human reviewer on the other end.

> **The difference from Skills modules:** Mona gave you instant, automated feedback. Now you will experience TWO types of feedback:
> 1. **Bot feedback** - instant, technical checking (accessibility, formatting, links)
> 2. **Human feedback** - considered, contextual suggestions (what matters most, creative ideas, encouragement)
> 
> Both are valuable. Both are part of professional open source development.

### Merge Conflicts: What to Expect (10 min)

When multiple contributors edit the same file at the same time, Git cannot automatically combine the changes. This is called a **merge conflict**. During this sprint, conflicts are likely because several participants will be editing `docs/welcome.md` simultaneously.

**Before you start your challenge**, read the conflict prevention strategies and resolution steps in [Chapter 7: Merge Conflicts](docs/07-merge-conflicts.md). Key points:

- **Communicate with your team.** If two people are both working on `docs/welcome.md`, coordinate who edits which `[TODO]` section.
- **Pull before you push.** Always sync with the latest `main` before opening a PR.
- **If you see conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`), do not panic. The markers show both versions. Keep the correct content, delete the markers, and commit.

The facilitator will walk through a live conflict resolution if one occurs during the sprint.

### Setup
The `learning-room` repo has a `docs/` folder with three intentionally imperfect practice files. Each participant will work on one of the first three challenges from [docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md):

| Challenge | File | What to fix | Difficulty |
|-----------|------|-------------|-----------|
| Challenge 1: Fix Broken Link | `docs/welcome.md` | Update the `[DATE]` placeholder with today's date | 5-10 min |
| Challenge 2: Add Keyboard Shortcut | `docs/keyboard-shortcuts.md` | Add a missing shortcut to the correct table | 15-20 min |
| Challenge 3: Complete Welcome Guide | `docs/welcome.md` | Fill in the three `[TODO]` sections | 20-30 min |
### Know Your File Before You Fix It (5 min)

Before starting your challenge, explore the file you will be editing. This is the reconnaissance you previewed in Block 1 - now with purpose.

**If your challenge targets `docs/welcome.md` (Challenges 1 and 3):**
1. Open `docs/welcome.md` - press `H` to navigate through all headings
2. Find the `[TODO]` markers - these are the sections you will complete
3. Press `K` to check the internal links - is there a broken one?
4. Note the heading hierarchy: H1, H2, H3. Your additions must follow this pattern.

**If your challenge targets `docs/keyboard-shortcuts.md` (Challenge 2):**
1. Open `docs/keyboard-shortcuts.md` - press `2` to navigate H2 sections (NVDA, JAWS, VoiceOver)
2. Press `T` to navigate into the shortcut tables
3. Read through the table rows - can you spot the intentional errors?
4. Check: does every screen reader section have the same set of shortcuts?

**If your challenge targets `docs/setup-guide.md` (Advanced):**
1. Open `docs/setup-guide.md` - press `K` to navigate all links
2. Which links are broken? Where should they point?
3. Read the step-by-step instructions - which steps are incomplete?

The challenges in [docs/CHALLENGES.md](learning-room/docs/CHALLENGES.md) map directly to these files and list success criteria for each.
Each participant will:
1. Find their assigned issue (which maps to one of these challenges)
2. Edit the practice file on GitHub
3. Commit, branch, and open a PR
4. **Wait for bot feedback** (watch for comment within 30 seconds)
5. Address bot feedback if needed
6. Request review from another participant
7. Review someone else's PR

### Full Workflow

**Example walkthrough: Challenge 3 - Complete the welcome guide**

This example shows the full workflow for filling in `[TODO]` sections in `docs/welcome.md`. Your actual challenge may differ.

```
Step 1: Find your issue
  Issues tab → filter by Assignee: me
  Open the issue - it says: "Complete the [TODO] sections in docs/welcome.md"
  Read the full description - it references Challenge 3 from CHALLENGES.md

Step 2: Navigate to the file
  Code tab → docs/ folder → welcome.md
  Read the file - find the [TODO] markers:
    • "Who Can Contribute?" section: [TODO: Add a paragraph explaining 
      that contributors come from all backgrounds...]
    • "Finding Something to Work On" section: [TODO: Add two or three 
      sentences about how to read an issue...]
    • "After Your Contribution Is Merged" section: [TODO: Add a sentence
      or two about what this means for someone's GitHub profile...]

Step 3: Edit the file on GitHub
  Find the edit pencil button (B for buttons → "Edit this file")
  Switch to Focus Mode → replace each [TODO] with real content
  Example for the first [TODO]:
    "Contributors come from all backgrounds, skill levels, and 
    countries. Using assistive technology is not a barrier to 
    contribution - in fact, AT users bring a perspective that 
    improves projects for everyone."

Step 4: Commit and branch
  Commit changes → select "Create a new branch"
  Name: fix/[your-name]-issue-[number]
  "Propose changes"

Step 5: Open the Pull Request
  Fill in the PR description using the template:
    ## What Changed
    Completed the three [TODO] sections in docs/welcome.md

    ## Related Issue
    Closes #[your-issue-number]

    ## Checklist
    - [x] All [TODO] markers removed
    - [x] Content matches the style of existing sections
    - [x] Heading hierarchy is correct (H1 → H2 → H3)

WAIT FOR BOT (30 seconds)
  The Learning Room bot will automatically comment on your PR
  Read the comment carefully - it checks for:
    • Issue reference (did you include "Closes #XX"?)
    • File location (are changes in docs/ only?)
    • Heading hierarchy (no H1→H3 skips)
    • Link text quality (no "click here")
    • [TODO] markers (did you remove them all?)
  The bot explains WHY each issue matters and links to resources

Step 6: Fix bot issues (if any)
  Address any required checks the bot flagged
  Push your changes to the same branch - the bot re-checks automatically

Step 7: Request human review
  Click "Reviewers" → select another participant
  THE BOT IS NOT A SUBSTITUTE FOR HUMAN REVIEW
  You need both: bot technical feedback + human judgment

Step 8: Review someone else's PR
  Find the PR opened by another participant
  Leave a constructive comment addressing:
    • The issues the bot flagged (did they fix them well?)
    • Content quality (is the writing clear and inclusive?)
    • Accessibility (do headings, links, and structure work for screen readers?)
  Approve if it looks good
```

**Other challenge examples:**

**Challenge 1 (Fix Broken Link):** Open `docs/welcome.md`, find the broken internal link, determine the correct file path, and update the link. The bot will verify the link resolves correctly.

**Challenge 2 (Add Keyboard Shortcut):** Open `docs/keyboard-shortcuts.md`, find the appropriate screen reader section (NVDA, JAWS, or VoiceOver), add a missing shortcut to the table using proper Markdown table syntax. The bot checks that table formatting is preserved.

### What the Bot Checks
The automation bot validates these things:
- **Broken links** - do internal and external links work?
- **Heading hierarchy** - no skips (H1→H3), proper structure
- **Image descriptions** - all images have meaningful alt text
- **Link text quality** - links use descriptive text (not "click here")
- **[TODO] markers** - all must be completed
- **Document formatting** - tables, code blocks, lists are correct

**The bot is educational.** Every issue includes:
- What the problem is
- WHY it matters (accessibility, clarity, usability)
- HOW to fix it (with examples)
- Links to learning resources

**See:** [Student Guide](learning-room/.github/STUDENT_GUIDE.md) for detailed explanation of bot feedback

### What to look for in each practice file

**`docs/welcome.md`** (Challenges 1 and 3):
- Three `[TODO]` sections that need real content (see "Who Can Contribute?", "Finding Something to Work On", "After Your Contribution Is Merged")
- A broken internal link to verify and fix
- Heading hierarchy to check (H1 → H2 flow)

**`docs/keyboard-shortcuts.md`** (Challenge 2):
- NVDA, JAWS, and VoiceOver shortcut tables
- Intentional errors in some shortcut references
- Missing shortcuts that should be added
- Table formatting that must be preserved

**`docs/setup-guide.md`** (Advanced challenges):
- Broken links to GitHub settings pages
- Incomplete setup steps
- A note at the bottom referencing `[TODO]` items

**`docs/CHALLENGES.md`** lists all 21 challenges with success criteria for each. When reviewing a peer's PR, check their work against the success criteria listed for their challenge.


## Break (3:00 PM, 15 min)

Stand, stretch, and rest your ears. The contribution sprint demands focus. The final block is discussion-centered and lower intensity.


## Block 6 - Community: Culture, Etiquette, Labels, and Notifications (3:15 PM, 75 min)

### Purpose
Participants understand the human side of open source: how to communicate well, how to stay organized, and how to manage their GitHub notification experience.

### Part 6A - Community Health Files (15 min)

**Discussion:** What makes an open source project a welcoming place?

**Hands-on:** Navigate the community health files in `learning-room`:
1. Read `CODE_OF_CONDUCT.md` - what does it commit to?
2. Read `CONTRIBUTING.md` - what does the project ask of contributors?
3. Read the Issue Templates - navigate to `.github/ISSUE_TEMPLATE/` and open the beginner challenge template. What information does it require and why?
4. Read the Student Guide (`.github/STUDENT_GUIDE.md`) - find the "Common Validation Issues and Fixes" section. This explains every bot feedback message you might see.

**Key insight:** These files exist to lower barriers AND set expectations. A project with these files sends a signal of maturity and intention.

### Part 6B - Communication and Review Culture (30 min)

**Discussion: How to communicate in open source (10 min)**

Open source communication is asynchronous. Your comment will be read out of context, by many people, over a long time. These principles matter:

- Clarity and precision: "I noticed X, which might cause Y" vs "This is wrong"
- The difference between critiquing code and critiquing people
- Handling disagreement: "I see it differently because..." rather than "No, that's incorrect"
- Acknowledging effort: starting with what's working before identifying problems
- Avoiding jargon and acronyms that exclude newcomers

**The anatomy of a good review comment (10 min)**

A useful comment includes:
1. **What** you noticed
2. **Why** it matters
3. **A suggestion** (optional but helpful)

Example:
> "The `alt` attribute on line 42 is empty. Screen readers will skip this image entirely, which means blind users miss the chart. A description like 'Bar chart showing monthly downloads from January to June' would help. Happy to help draft one if useful!"

**Practices to demonstrate:**
- Separating factual observations from preferences ("This might be a typo" vs "I personally prefer single quotes")
- Using `nit:` to signal non-blocking suggestions
- Asking clarifying questions instead of assuming intent
- Marking your review as "Comment" when you are not sure whether something is a blocker

**Exercise: Rewrite and write (10 min)**

Rewrite these comments to be more inclusive:
1. "This is obviously wrong - anyone can see it doesn't handle nulls."
2. "LGTM but TBH this feels like over-engineering IMO."
3. "Fix this before EOD."

Then write a review comment for this change: "A PR removes the `<main>` landmark element from a page."

### Part 6C - Labels, Milestones, and Cross-References (20 min)

**Labels - organizing intent:**
- Creating a label: Issues → Labels → New label
- Applying labels from the issue sidebar
- Filtering issues by multiple labels
- Label naming conventions

**Milestones - organizing time:**
- Navigate to Issues → Milestones
- Open the "Hackathon Day 1" milestone
- Add your issue to it from the sidebar

**Cross-references - linking work:**
- From a PR description: `Closes #42` auto-closes the issue on merge
- Referencing across repos: `owner/repo#42`
- From comments: type `#` and a number

### Part 6D - Notifications: Taking Control of Your Inbox (10 min)

**Concepts:**
- GitHub Notifications inbox: `github.com/notifications`
- Subscribed vs Participating vs @mentioned
- Notification preferences per repository
- The "Done" button

**Hands-on:**
1. Navigate to your Notifications inbox
2. Find the notification from your PR comment
3. Mark it as Done
4. Change `learning-room` Watch settings to "Participating and @mentions only"


## Wrap-Up and Day 2 Preview (4:30 PM, 30 min)

### Skills Module Completion Check (10 min)

> **Magic Moment #5:** Before the Day 2 preview, check your completions.

1. Navigate to the [Introduction to GitHub skills course](https://github.com/skills/introduction-to-github) - completed?
2. Navigate to the [Review Pull Requests skills course](https://github.com/skills/review-pull-requests) - completed?
3. Navigate to the [Communicate Using Markdown skills course](https://github.com/skills/communicate-using-markdown) - how many steps complete?
4. Navigate to your GitHub profile - what appears there now?

These completions are yours permanently. They travel to every GitHub profile page you have. They are evidence of skills, not just reading.

### Reflection (10 min)
- What is one thing you did not know before today?
- What is one thing you want to get better at?
- What is one contribution you want to make to a real accessibility project this week?

### Day 2 Preview (10 min)
Tomorrow we move from the browser to **Visual Studio Code**. Here is what is coming:

- **VS Code Screen Reader Mode** - Accessible Help (`Alt+H`), Accessible View (`Alt+F2`), Accessible Diff Viewer (`F7`)
- **Accessibility Agents** - your earned reward for completing Day 1. An ecosystem of **55 AI agents across 3 teams and 5 platforms** that amplify the exact skills you built today. Explore the agents that match your interests and workflows - there is no fixed subset you are required to use.
- **Ship a real PR upstream** - `community-access/accessibility-agents` is a live repository. Your name in its commit history is the Day 2 capstone.

> **Start thinking now:** Accessibility Agents has 26 agents for accessibility auditing (web, documents, mobile, ePub), 12 for GitHub workflows, and 6 for developer tools. As you reflect on today's experience - navigating repositories, filing issues, reviewing PRs by hand - ask yourself:
>
> - What took the longest? What was repetitive?
> - What would be easier if an AI agent could handle the mechanical parts?
> - What accessibility problem have you encountered that no tool addresses well?
>
> Tomorrow you will see the agents in action and have the opportunity to **contribute new agents, improve existing ones, or shape the project's roadmap**. The best contributions come from people who have done the manual work first - and that is exactly what you did today.

**Tonight (optional):**
- Install VS Code and the GitHub Copilot Chat extension (see [Pre-Workshop Setup](docs/00-pre-workshop-setup.md))
- Complete any Markdown Skills module steps you didn't finish
- Browse the bonus challenges (A through E) in the [Challenge Hub](learning-room/docs/CHALLENGES.md) for extra practice
- Fork [accessibility-agents](https://github.com/community-access/accessibility-agents) - it will be ready and waiting when you open VS Code tomorrow
- Browse the [55 agents by team](docs/19-accessibility-agents.md#3-the-ecosystem-55-agents-3-teams-5-platforms) - which ones spark ideas for you?


## Facilitator Notes

### Sandbox Repo Setup Required Before Day 1

Create the `learning-room` repo in your org with the following:

**Pre-seeded issues:**
- `#1` - "Welcome! Introduce yourself" (open, labeled `good first issue`, no assignee)
- `#2` through `#N` - pre-assigned to each participant, each mapping to a specific challenge from `docs/CHALLENGES.md`:
  - Challenges 1-3 (Beginner): Fix broken link in `welcome.md`, add shortcut to `keyboard-shortcuts.md`, complete `[TODO]` sections in `welcome.md`
  - Challenges 4-6 (Intermediate): Fix heading hierarchy, improve link text, add alt text across docs
  - Advanced challenges for faster students: review, documentation creation, mentoring
- Several unlabeled "triage practice" issues for Part 6E
- One issue labeled `accessibility` with a realistic AT-related bug report for reference

**Pre-seeded PR:**
- "Fix typo in keyboard-shortcuts.md" - a clean PR fixing a minor error in the NVDA shortcuts table, with a meaningful diff, at least two commits, and active status checks. This is the PR students examine in Block 4.

**Pre-created branch:** `day1-practice` with edits to `docs/welcome.md` and `docs/setup-guide.md` that differ from `main` (used in Block 2 Activity 2D)

**Files included in learning-room repo:**
```
learning-room/
├── README.md                           ← Getting started guide with file inventory
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── .github/
│   ├── STUDENT_GUIDE.md                ← Bot feedback guide with fix examples
│   ├── ISSUE_TEMPLATE/
│   │   ├── config.yml
│   │   └── [21 challenge templates]        ← 16 core + 5 bonus
│   ├── PULL_REQUEST_TEMPLATE.md        ← Checklist template students fill out
│   ├── workflows/
│   │   ├── learning-room-pr-bot.yml    ← PR validation + educational feedback
│   │   ├── skills-progression.yml      ← Progress tracking + badge awards
│   │   └── student-grouping.yml        ← Auto-assigns peer reviewers
│   └── scripts/
│       └── validate-pr.js              ← Validation logic (checks headings, links, TODOs)
├── docs/
│   ├── CHALLENGES.md                   ← 21 challenges: 16 core + 5 bonus
│   ├── welcome.md                      ← 3 [TODO] sections + broken link
│   ├── keyboard-shortcuts.md           ← NVDA/JAWS/VO tables with errors
│   └── setup-guide.md                  ← Broken links + incomplete steps
└── [GITHUB_SKILLS.md]                  ← Self-paced GitHub Skills module reference
```

### Pacing Tips for Skills Modules

- **Block 1, Part B:** Allow 10 minutes for every participant to copy the Skills repo and see Mona's first message. If someone does not see Mona's response within 2 minutes, check: was the repo created as public? (Mona requires public visibility on the free tier.)
- **Block 3, Part A:** Participants work at different speeds. Have a "bonus" ready: while waiting for Mona, participants can start the Communicate Using Markdown module setup.
- **Block 4, Part A:** The `review-pull-requests` module creates its PR automatically. Give everyone 5 minutes to copy the repo before moving to Part B - Mona needs time to set up the PR.
- **If a Skills module step gets stuck:** Do not spend more than 5 minutes unblocking one participant's bot issue. Have them watch your screen while you continue with the group, and revisit during activity periods.
- **Completion badges:** Not all participants will complete every module in-session. This is fine - the repos are theirs, Mona is waiting, and they can finish on their own time.


*Day 2: [Day 2 Agenda](DAY2_AGENDA.md)*
*Related: [Navigating Repositories](docs/03-navigating-repositories.md) | [Working with Issues](docs/05-working-with-issues.md) | [Working with Pull Requests](docs/06-working-with-pull-requests.md)*
