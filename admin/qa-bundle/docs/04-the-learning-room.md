# The Learning Room: Your Personal Practice Repository
>
> **Listen to Episode 4:** [The Learning Room](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix A: Glossary](appendix-a-glossary.md) | [Appendix C: Markdown Reference](appendix-c-markdown-reference.md)
> **Authoritative sources:** [GitHub Docs: About README files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) | [GitHub Docs: Editing files](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)

## What Is the Learning Room?

The **Learning Room** is your **own private GitHub repository** for the workshop. When you accept the GitHub Classroom assignment in Block 0, GitHub copies the [`Community-Access/learning-room-template`](https://github.com/Community-Access/learning-room-template) repository into the workshop classroom organization as `<workshop-org>/learning-room-<your-username>`. That copy is yours to use for the workshop - you have write access, your own branches, your own pull requests, and your own automated feedback from Aria the PR validation bot.

You do **not** work directly in `Community-Access/learning-room-template`. Think of the template as the clean master copy facilitators maintain. Your work happens in the private Learning Room repository created for you by GitHub Classroom.

Throughout this chapter and the rest of Day 1, "your Learning Room repository" or "your Learning Room repo" refers to this private copy. Every student gets one, and every copy starts from the same template files. You will not see other students' work in your repo, and they will not see yours - but everyone is doing the same challenges in parallel. Peer-simulation issues and pull requests inside your repo provide realistic collaboration practice, and facilitators may also pair students for real peer review when access is intentionally provided.

You do **not** need to create a GitHub organization or change repository permission settings. The workshop organization, template repository, Classroom assignment, and GitHub Actions permissions are managed by the facilitators.

## Why a Per-Student Repo?

GitHub Classroom gives each participant their own repository for three reasons:

- **Safety** -- you can experiment, break things, and recover without affecting anyone else
- **Authenticity** -- you practice real repository work: issues, branches, pull requests, checks, reviews, and merging
- **Pace** -- you progress through the 9 Day 1 challenges as fast or as slow as you need; nobody is waiting on you and you are not blocking anybody else

Real open source projects are shared spaces, and you will absolutely contribute to one on Day 2 (`accessibility-agents`) and through the Bonus C challenge. The Learning Room exists so you can build the muscle memory for issue, branch, PR, review, merge in a space where every mistake is a learning opportunity, not a public problem.

## Step-by-Step: Accept Your Classroom Assignment and Open Your Repo

This is the very first hands-on step of Day 1. By the end of this walkthrough you will have your own Learning Room repository on GitHub and your first challenge issue waiting for you. The whole flow takes about five minutes.

> **What you need before you start:**
>
> - A GitHub account you are signed into in your browser ([Pre-Workshop Setup, Step 1](00-pre-workshop-setup.md#step-1---create-your-github-account))
> - The **Day 1 Classroom assignment link** -- the facilitator pastes this link in the workshop chat at the start of Block 0. It looks like `https://classroom.github.com/a/<random-id>`. If you do not have it, ask in chat or DM the facilitator.

### 1. Open the assignment link

1. In the same browser where you are signed into GitHub, open the Day 1 assignment link the facilitator shared.
2. The page that loads is hosted on `classroom.github.com`. Your screen reader announces a heading with the assignment name (for example, "Git Going with GitHub -- Day 1").
3. If the page asks you to authorize **GitHub Classroom** to access your GitHub account, activate **Authorize GitHub Classroom**. This is a one-time step.

### 2. Identify yourself (if asked)

GitHub Classroom may ask you to pick your name from a roster so the facilitators can match your GitHub username to the registration list.

1. If a roster page appears, navigate the list with arrow keys or use Find-in-Page (`Ctrl+F` / `Cmd+F`) to search for your name.
2. Activate the link or button next to your name.
3. If you do not see your name on the roster, activate the **Skip to the next step** link and tell the facilitator in chat. They will reconcile the roster after your repo is created.

### 3. Accept the assignment

1. You now see a screen with a button that says **Accept this assignment** (or just **Accept the assignment**). Activate it.
2. The page changes to a status screen that says something like "You are ready to go!" with a refresh option. GitHub Classroom is now copying the `learning-room-template` repository into the workshop classroom organization and granting you access to your private copy. This usually takes 10-30 seconds.
3. Activate the **Refresh** link (or reload the page with `F5`) every 15 seconds or so until you see a link to your new repository. The link looks like `https://github.com/<workshop-org>/learning-room-<your-username>`.

> **Screen reader tip:** The status page does not auto-announce when the repo is ready. Use Browse mode and press `K` to step through links until you hear your repository link, or refresh the page until it appears.

### 4. Open your new repository

1. Activate the link to your repository. You land on the standard GitHub repo page for `<workshop-org>/learning-room-<your-username>`.
2. Verify three things on this page:
   - The **repo name** in the heading matches `learning-room-<your-username>`.
   - The **About** sidebar (or repo description) confirms this is a private workshop copy.
   - You see folders like `docs/`, `.github/`, and files like `README.md`. These came from the template.
3. Bookmark this page. You will return here for every Day 1 challenge.

### 5. Find your first challenge issue

When your Learning Room repo is ready, **Challenge 1** appears as a GitHub issue in your repo. The facilitators prepare this by running the Student Progression Bot after students accept the Classroom assignment. The next challenges unlock one at a time as you close the previous ones.

1. From your repository page, navigate to the **Issues** tab. Keyboard shortcut: press `G` then `I`.
2. You should see at least one open issue with a title like **"Challenge 1: Find Your Way Around"** authored by `aria-bot` (or `github-actions[bot]`).
3. Open Challenge 1. Read the issue body -- it tells you what to do, where to find evidence, and how to submit completion.

> **If Challenge 1 is missing after 2 minutes:** Refresh the Issues tab once. If it still does not appear:
>
> 1. Open the **Actions** tab and check whether the **Student Progression Bot** workflow ran successfully.
> 2. If it failed or never ran, post a message in the workshop chat with the link to your repo. The facilitator can trigger `student-progression.yml` or create Challenge 1 from the issue template.

### 6. Confirm Aria can talk to you

The PR validation bot, **Aria**, posts educational feedback whenever you open a pull request. To confirm Aria is wired up, open the **Actions** tab in your repo and look for a workflow named **pr-validation-bot** (or **Aria PR Validation**). The workflow should appear in the list even before you have opened a PR. You do not need to run anything yet -- you just want to confirm it exists.

You are now done with Block 0. Continue with the chapter below to learn how the Learning Room is organized, then jump to [Chapter 5](05-working-with-issues.md) to start Challenge 1.

## Workshop Recommendation (Chapter 4)

Chapter 4 is a **system orientation chapter**.

- **Challenge count:** none
- **Automation check:** none
- **Why:** this chapter explains how your repo is set up and prepares you for the issue-based challenges that start in Chapter 5.

### Readiness Checkpoint

Before starting Chapter 5 challenges, you should be able to:

1. Find `docs/CHALLENGES.md` in your Learning Room repository.
2. Explain the flow: issue -> branch -> pull request -> review -> merge.
3. Identify where Aria bot feedback appears on a PR (the Conversation tab).

## Two Tracks That Reinforce Each Other

Throughout Day 1 you work on **two parallel learning tracks**, both in your own account:

### Track 1: GitHub Skills Modules (Optional Self-Paced Practice)

- **[Introduction to GitHub](https://github.com/skills/introduction-to-github)** - Create branch, open PR, merge
- **[Communicate Using Markdown](https://github.com/skills/communicate-using-markdown)** - Write headings, links, code, tables
- **[Review Pull Requests](https://github.com/skills/review-pull-requests)** - Comment, approve, suggest changes

**Scope:** Your personal account, optional and self-paced
**Bot:** Mona (GitHub's automated learning bot) guides each step
**Purpose:** Hands-on practice of individual skills, complementary to the workshop

### Track 2: Your Learning Room Repository (Required Workshop Track)

- **Blocks 1-4 (Day 1 morning/afternoon):** Challenges 1-7 -- find your way, file an issue, branch, commit, open a PR, survive a merge conflict
- **Block 5 (Day 1 evening):** Challenges 8-9 -- culture and merge day
- **Block 6 (Day 1 evening):** Community tools (labels, milestones, notifications)

**Scope:** Your private Learning Room repository (created from `learning-room-template` via Classroom)
**Bot:** **Aria** -- a PR validation bot that posts educational feedback on every push, plus a Student Progression bot that auto-creates the next challenge issue when you close the current one
**Purpose:** End-to-end practice of the full workflow in a real repository where you have full control

#### How the Two Tracks Compare

| Step | GitHub Skills (optional) | Your Learning Room (required) |
| --- | --- | --- |
| 1 | Create a branch in a Skills repo | Create a branch in your Learning Room |
| 2 | Open a PR | Open a PR |
| 3 | Get instant bot feedback from Mona | Get instant bot feedback from Aria |
| 4 | Mona verifies your step | Aria validates structure; you self-merge or peer-review |
| 5 | Next Skills step unlocked | Closing the issue auto-unlocks the next challenge |

### Learning Cards: Two Tracks, One Account

<details>
<summary>Screen reader users</summary>

- GitHub Skills modules run in your personal account; press `G I` from any Skills repo to see the issue thread where Mona posts instructions
- Your Learning Room repository lives at a different URL inside the workshop organization; bookmark it and use `Alt+D` (address bar) to confirm which repo you are in
- Aria's bot comments on your PRs appear as PR conversation comments; press `3` on the PR page to jump between them

</details>

<details>
<summary>Low vision users</summary>

- GitHub Skills repos have a distinct green banner at the top of the README that says "Start course"; your Learning Room repo has no such banner
- Check the repository name in the top-left header to confirm which track you are working in (Skills repo vs. your Learning Room)
- Aria's avatar appears next to bot comments; your human reviewer's avatar appears next to peer review comments

</details>

<details>
<summary>Sighted users</summary>

- Skills modules appear as separate repos under your account page (github.com/your-username); your Learning Room appears under the workshop organization assigned by your facilitators
- Aria's comments have a distinct grey bot badge next to the username, just like Mona's
- Keep both repos open in separate browser tabs so you can switch between tracks during the workshop

</details>

## Your Learning Room Folder Structure

Every Learning Room repository (yours and every other participant's) starts as an exact copy of `learning-room-template` and contains these files and folders:

- **README.md** -- Getting started guide
- **.github/**
  - **STUDENT_GUIDE.md** -- How the bot works
  - **IMPLEMENTATION_GUIDE.md** -- Full setup walkthrough
  - **SETUP_AND_MAINTENANCE.md** -- Maintenance reference
  - **workflows/** -- 3 automation workflows
    - learning-room-pr-bot.yml (PR validation)
    - student-progression.yml (challenge delivery)
    - skills-progression.yml (achievement tracking)
    - student-grouping.yml (peer pairing)
  - **scripts/**
    - validate-pr.js (validation logic)
  - **data/**
    - student-roster.json (your cohort info)
    - challenge-progression.json (levels, badges)
- **docs/**
  - CHALLENGES.md -- 21 challenges (16 core + 5 bonus)
  - welcome.md -- Has a TODO to complete
  - keyboard-shortcuts.md -- Has intentional errors
  - setup-guide.md -- Has broken links
- Other files for practice

## Your Practice Branch

In your own Learning Room repository, **you decide what branches to create**. The Day 1 challenge sequence asks you to work on a single feature branch named after yourself:

> **Branch naming convention for Day 1:** `learn/<your-github-username>` (all lowercase)

**Examples:**
- If your GitHub username is `payown`, your branch is `learn/payown`
- If your username is `BudgieMom`, your branch is `learn/budgiemom`
- If your username is `Weijun-Zhang-1996`, your branch is `learn/weijun-zhang-1996`

### Why you create a separate branch

- **Protected main branch** - The `main` branch in your Learning Room is protected; changes have to land via pull request even though you own the repo. This mirrors how mature open source projects work.
- **Your workspace** - Your `learn/<username>` branch is where you commit and push changes before opening a PR
- **Clean history** - Keeping experiments off `main` until they are reviewed (by you, by Aria, or by a peer) keeps your project history easy to read
- **Realistic workflow** - Contributors to real open source projects always create feature branches before opening a PR. You are practicing exactly that pattern.

### How to use your branch

The Day 1 challenges (4 onward) walk you through creating and using your branch on GitHub.com. Once you start working locally in Chapter 14, the same branch is what you check out:

```bash
git checkout learn/<your-github-username>
```

1. Create the branch on GitHub.com (Challenge 4) or locally with `git checkout -b learn/<username>` from `main`
2. Make your changes and commit them to the branch
3. Push the branch to GitHub if you created it locally
4. Open a pull request from `learn/<username>` -> `main` (Challenge 6)

> **Which branch do I use and when?**
>
> | Chapter | Branch needed? | What to use |
> |---------|---------------|-------------|
> | Chapter 5 (Issues) | No | Work happens in issue threads directly. No branch or file editing required. |
> | Chapter 6 (PRs, web editor) | Yes | Create `learn/<username>` from `main` (Challenge 4) and edit on it. |
> | Chapter 6 (PRs, local clone) | Yes, create manually | `git checkout -b learn/<username>` from `main`. |
> | Chapter 14+ (Local Git) | Yes | Reuse `learn/<username>`, or create additional `fix/<short-description>` branches from `main` for new work. |
>
> **Summary:** Chapter 5 needs no branch. Chapters 6-7 use the same `learn/<username>` branch. Day 2 reuses that branch and adds short-lived `fix/` branches when you tackle additional issues.

### Learning Cards: Your Practice Branch

<details>
<summary>Screen reader users</summary>

- To switch branches on GitHub.com, press `W` (in Focus Mode) to open the branch selector, type your branch name (`learn/<username>`), and press `Enter` when it appears
- In VS Code's terminal, type `git checkout learn/<your-github-username>` (lowercase)
- Press `Ctrl+Shift+G` in VS Code to open Source Control; the current branch name is announced at the top of the panel

</details>

<details>
<summary>Low vision users</summary>

- The branch selector button shows the current branch name (e.g., "main") above the file table; click it and type "learn" to filter to your branch
- After switching branches, the branch name updates in the selector button; verify it reads `learn/<username>`, not "main"
- In VS Code, the current branch name appears in the bottom-left corner of the Status Bar in small text; zoom in or check Source Control panel header for a larger display

</details>

<details>
<summary>Sighted users</summary>

- The branch selector is the dropdown button above the file table showing the current branch name with a down-arrow icon
- Your branch follows the pattern `learn/<username>` (all lowercase); type "learn" in the dropdown search to find it quickly
- In VS Code, the current branch is shown in the bottom-left of the Status Bar; click it to switch branches via a dropdown

</details>

### Tool Cards: Switch to Your Practice Branch

**github.com (browser):**
1. On the repository page, click the branch selector dropdown (shows "main").
2. Type `learn` to filter, then select `learn/<username>`.

**github.dev (web editor):**
1. Click the branch name in the bottom-left status bar.
2. Select your `learn/<username>` branch from the list.

**VS Code Desktop:**
1. Click the branch name in the bottom-left status bar (or press `Ctrl+Shift+P` then type **Git: Checkout to**).
2. Select `origin/learn/<username>` from the branch list.

**GitHub Desktop:**
1. Click the **Current Branch** dropdown at the top.
2. Type `learn` to filter, then select `learn/<username>`.

**Git CLI (terminal):**
```bash
git checkout learn/<username>
```

---

## The Practice Files: What You Will Work On

> **See also:** [Appendix C: Markdown Reference](appendix-c-markdown-reference.md) covers all Markdown syntax with accessible examples -- you will need it for editing these files.

The `docs/` folder contains three practice files with intentional issues. These are the files you will edit, fix, and submit pull requests for during the contribution sprint. Here is exactly what you will encounter in each file.

### docs/welcome.md - Introduction to Open Source Contribution

This file introduces newcomers to open source. It has **three [TODO] sections** where content is missing:

#### [TODO] 1 - "Who Can Contribute?" section
>
> [TODO: Add a paragraph explaining that contributors come from all backgrounds, skill levels, and countries. Emphasize that using assistive technology is not a barrier to contribution - in fact, AT users bring a perspective that improves projects for everyone.]

#### [TODO] 2 - "Finding Something to Work On" section
>
> [TODO: Add two or three sentences about how to read an issue to decide if it is right for you. What questions should you ask yourself? Is the description clear enough? Is anyone else already working on it?]

#### [TODO] 3 - "After Your Contribution Is Merged" section
>
> [TODO: Add a sentence or two about what this means for someone's GitHub profile and open source portfolio.]

It also has a broken internal link that needs to be found and fixed. **Challenges 1 and 3** from CHALLENGES.md map directly to this file.

### docs/keyboard-shortcuts.md - Screen Reader Shortcut Reference

This is a comprehensive reference with tables for NVDA, JAWS, and VoiceOver shortcuts. It contains **intentional errors** in some shortcut references that students need to find and fix.

The file has three major sections:

- **NVDA (Windows)** - Single-key navigation, mode switching, reading commands
- **JAWS (Windows)** - Virtual cursor navigation, mode switching, reading commands
- **VoiceOver (macOS)** - Rotor navigation, VO commands for GitHub

Plus cross-platform shortcuts for GitHub pages and common workarounds.

**Challenge 2** asks you to add a missing shortcut to the correct table. When you edit this file, you must preserve the Markdown table formatting. The bot validates that tables remain well-formed.

### docs/setup-guide.md - Getting Ready to Contribute

This step-by-step guide walks through GitHub account setup, accessibility settings, screen reader configuration, and repository forking. It contains **broken links** that point to incorrect URLs and **incomplete steps**.

Look for:

- Links to GitHub settings pages that may have changed
- A `[TODO]` note at the bottom referencing items for facilitators
- Steps that reference forking a "workshop repository" without providing the actual URL

This file is used for **intermediate and advanced challenges** (Challenges 4-6) where students fix heading hierarchy, improve link text, and add missing descriptions.

### docs/CHALLENGES.md - Your Challenge Menu

This file lists all 21 challenges organized by progression level:

| Level | Challenges | Requirement |
| -------  | -----------  | -------------  |
| Explorer (01-03) | Scavenger hunt, first issue, join conversation | Getting started |
| Contributor (04-07) | Branch out, make your mark, first PR, merge conflict | 3+ challenges |
| Collaborator (08-09) | Culture reflection, merge day | 7+ challenges |
| Operator (10-11) | Go local, Day 2 PR | 9+ challenges |
| Reviewer (12-14) | Code review, Copilot, issue template | 11+ challenges |
| Agent Navigator (15-16) | Agents, capstone | 14+ challenges |
| Bonus (A-E) | Accessibility audit, mentor, cross-repo, workflow, docs | Optional |

Each challenge lists the file(s) to edit, estimated time, skills practiced, and success criteria.

### Bonus Challenges

Five bonus challenges (A through E) are available for students who finish faster. These include an accessibility audit, mentoring a peer, cross-repository contribution, creating a custom workflow, and documentation improvement.

## How PR Sharing Works

### Step 1: Student Opens a PR

#### Student A (working on Challenge 3: Complete Welcome Guide)

1. Finds their assigned issue (Issues tab → filter `Assignee:@me`)
2. Opens `docs/welcome.md` and edits the three `[TODO]` sections
3. Commits to a new branch: `fix/studentA-issue12`
4. Opens a pull request with description:

   ```markdown
   ## What Changed
   Completed the three [TODO] sections in docs/welcome.md:
   - Added contributor backgrounds paragraph
   - Added guidance on evaluating issues
   - Added note about GitHub profile impact

   Closes #12
   ```

5. **Submits the PR**

**Visibility:** The PR immediately appears in the repo's Pull Requests tab. All students can see it.

### Step 2: Automation Bot Validates

#### Bot (`.github/workflows/learning-room-pr-bot.yml`)

- Runs within 30 seconds
- Checks:
  - Issue reference (does PR link to issue with `Closes #12`?)
  - File location (only `docs/` directory files changed?)
  - Markdown accessibility (headings, links, alt text, broken links)
  - [TODO] markers (all three removed from welcome.md?)
- Posts a comprehensive comment with:
  - Required checks (must pass)
  - Suggestions (optional improvements)
  - Accessibility analysis (detailed issues + fixes)
  - Learning resources (links to docs)
- Applies labels (documentation, accessibility, needs-review)
- Creates commit status check visible in PR checks

**Visibility:** The bot comment appears in your PR. You see it; the facilitators see it; nobody else does unless they have been added as a collaborator on your repo.

### Step 3: Peer Review (Facilitator-Arranged)

The `learning-room-template` ships with a peer-pairing workflow (`.github/workflows/student-grouping.yml`) that was designed for a single shared repo. Under the GitHub Classroom model used in this workshop, **peer review is arranged by the facilitators rather than auto-assigned**, because each student's repo is private.

When Challenge 3 ("Join the Conversation") or Challenge 8 ("Culture") asks for peer review:

1. The facilitators (Jeff and Michael) pair you with another participant.
2. They add each of you as a collaborator on the other's Learning Room repo.
3. Each of you receives a notification: "You have been added as a collaborator."
4. You can now read the other person's PRs, leave comments, request changes, and approve.
5. After the challenge is complete, the collaborator access remains until the workshop ends -- you can keep helping each other as you work through the rest of Day 1.

#### Visibility

- You see PRs in the repos you have been added to (yours plus any peers you have been paired with)
- Notifications show review requests in your GitHub Notifications inbox
- Other participants in the cohort cannot see your repo unless they are paired with you

### Step 4: Reviewer Reads and Comments

#### Your assigned peer reviewer (when one is paired with you)

1. Receives notification: "PR review requested"
2. Navigates to the PR in your Learning Room repo (they have collaborator access)
3. Reads:
   - PR title: "Complete [TODO] sections in welcome.md"
   - PR description: lists which sections were completed
   - Aria's feedback: checks that all `[TODO]` markers are removed, heading hierarchy is valid
   - The actual file changes (Files Changed tab): sees the diff showing old `[TODO]` markers replaced with new content
4. Leaves review comments:
   - Inline comment on the "Who Can Contribute?" paragraph: "Great addition - I especially like the point about AT users bringing valuable perspective."
   - Overall comment: "The content reads well and all TODOs are resolved. One suggestion: the 'Finding Something to Work On' section could mention checking if an issue already has an assignee."
5. Submits review: **Approve** (or **Request Changes** if a `[TODO]` marker was missed)

#### Visibility

- You (the PR author) get a notification: "Your PR has a new review"
- The reviewer's comments appear in your PR thread
- Their name shows in the Reviewers sidebar of your PR

### Step 5: Author Responds and Updates

#### You (PR author)

1. Read Aria's feedback and any human review
2. Talks to the reviewer if something is unclear
3. Makes changes based on feedback
4. Pushes new commits to the same branch
5. Re-addresses the feedback

#### Visibility

- Aria re-validates on each new commit and updates its comment
- Your reviewer sees the updated activity in the PR
- The PR timeline shows iteration happening

### Step 6: Merge and Celebration

#### When the review is approved (or you decide to self-merge)

- You merge the PR (button becomes available)
- PR closes, shows "merged"

#### Progression Bot Posts the Next Challenge

- The Student Progression bot detects the merged PR and the closed challenge issue
- Posts a celebration comment (challenge badge earned)
- Auto-creates the next challenge issue in your repo so you can keep moving
- Updates the progress tracking file

#### Visibility

- You see the merged PR and the new challenge issue
- Your peer reviewer (if you have one) is notified the PR was merged
- Other participants only see this if they have been paired with you

### Learning Cards: How PR Sharing Works

<details>
<summary>Screen reader users</summary>

- When a bot comment appears on your PR, press `3` on the Conversation tab to jump between comment headers; bot comments include the bot's username in the heading
- To find your assigned reviewer, press `D` to reach the sidebar landmark, then `H` until you hear "Reviewers" -- your reviewer's username follows
- When you receive a "review requested" notification, press `G N` from any GitHub page to go to Notifications and find the review request

</details>

<details>
<summary>Low vision users</summary>

- Bot comments are visually indented and often have a colored banner (green for pass, yellow for warnings); zoom in on the banner text for the summary
- The Reviewers section in the PR sidebar shows a small avatar and username; at high zoom avatars may overlap -- read the text username instead
- Merge button turns green when all required checks pass and the reviewer approves; it appears at the bottom of the Conversation tab

</details>

<details>
<summary>Sighted users</summary>

- Bot comments appear in the PR timeline with a small "bot" badge next to the commenter's name
- The green "Merge pull request" button appears at the bottom of the Conversation tab once all checks pass and the reviewer approves
- The PR sidebar (right side) shows Reviewers, Assignees, Labels, and Linked Issues; each section has its own heading

</details>

## What You and Your Peers See

| What | Where | Who Sees It |
| ------  | -------  | -----------  |
| Your open PRs | Pull Requests tab in your repo | You, the facilitators, and any peers added as collaborators |
| PR description & changes | PR page in your repo | Same as above |
| Aria's bot feedback | PR comments | Same as above |
| Peer review comments | PR comments | Same as above |
| Reviewer assignments | PR sidebar "Reviewers" | Same as above |
| Progression bot's next-challenge issue | Issues tab in your repo | Same as above |
| Your review requests for someone else's PR | Your notification inbox | You and the PR author you were paired with |

## The Learning Automation System

When you open a PR in the Learning Room, you get **three types of feedback**:

### Type 1: Automated Bot Feedback (30 seconds)

- Technical validation (links, headings, file locations)
- Accessibility checking (detailed)
- Educational messaging (WHY each thing matters)
- Links to learning resources
- Never fails the PR; always educational

### Type 2: Peer Reviewer Feedback (15-60 minutes)

- Human judgment on content
- Creative suggestions
- Encouragement and mentorship
- Understanding of context
- Can approve, request changes, or comment

### Type 3: Progress Tracking (on merge)

- Skill badges (Markdown Master, Accessibility Advocate)
- Level progression (Beginner → Intermediate → Advanced → Expert)
- Milestone celebrations (1st, 5th, 10th PR)
- Motivational comments

**Together:** Instant technical feedback + human mentorship + visible progress

## Study Groups (Optional)

If your facilitators create study groups, you will be paired with 2-3 other participants and added as collaborators on each other's Learning Room repos:

1. **Group Issue Thread** - Private communication space for your group
2. **Shared Review Responsibility** - You review each other's work
3. **Collaborative Challenges** - Optional group exercises
4. **Peer Support** - Tag each other with questions

### Example

```text
Study Group #2: @studentA, @studentC, @studentE

This is your collaboration space!
- Review each other's PRs (beyond automated pairing)
- Share tips and resources
- Support each other through challenges
- Celebrate each other's achievements
```

## Key Differences: Skills Module vs. Your Learning Room

| Aspect | GitHub Skills (Your Account) | Your Learning Room (Classroom) |
| --------  | ---  | ---  |
| **Repo** | Your personal copy of a Skills repo | Your private copy of `learning-room-template` |
| **Bot** | Mona (GitHub) | Aria (PR validation) and the Student Progression bot |
| **Reviewer** | Mona (auto) | You (self-merge) or a peer paired by your facilitator |
| **Visibility** | Private to you (unless you make it public) | Private to you and the workshop organization |
| **Pace** | Self-directed | Self-paced, anchored by the workshop schedule |
| **Purpose** | Individual skill building | End-to-end practice of the full real-world workflow |
| **Feedback** | Instant, next-step only | Bot feedback on every push plus optional peer review |
| **Completion** | Badge on your profile | Closing the issue auto-creates the next challenge |
| **Community** | You alone | You, with facilitator-arranged peer pairings when challenges call for it |

## Tips for Reviewing a Peer's PR

When the facilitators pair you with another participant for Challenge 3 or Challenge 8, you will be added as a collaborator on their Learning Room repo. Here is how to find the PRs they want you to look at.

### Finding PRs to Review

<details>
<summary>Visual / mouse users</summary>

1. Go to your peer's Learning Room repo (the URL the facilitators sent you, or open it from your GitHub Notifications inbox)
2. Click the **Pull Requests** tab
3. Click the **Filters** dropdown -> "Review requested" -> your username
4. Click any PR title to open it

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
1. Go to your peer's Learning Room repo
2. Press D -> "Repository navigation"
3. Press K -> navigate to "Pull Requests" tab
4. Filter: Press F, type "review-requested:@me"
5. Press H repeatedly to navigate PR titles
6. Press Enter to open a PR
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
1. Go to your peer's Learning Room repo
2. VO+U -> Landmarks -> "Repository navigation"
3. Quick Nav K -> navigate to "Pull Requests" tab -> VO+Space
4. Filter: Quick Nav F, type "review-requested:@me", press Return
5. Quick Nav H (or VO+Cmd+H) to navigate PR titles
6. VO+Space to open a PR
```

</details>

### Reading a PR You're Assigned To

<details>
<summary>Visual / mouse users</summary>

- **Conversation tab:** Scroll through the discussion. Reviewers are listed in the right sidebar.
- **Files Changed tab:** Changed files are in a tree on the left. Click a filename to jump to its diff. Green = added lines, red = removed lines.
- Line comments appear as inline cards within the diff.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Conversation Tab (reading reviews):
  1. Press H → navigate headings
  2. Listen for "Reviewers" heading (h3)
  3. Your name appears as reviewer
  4. Read bot comment
  5. Read peer feedback

Files Changed Tab (what actually changed):
  1. Press H to navigate files
  2. Press T to explore file tree
  3. Read the diff with your screen reader
  4. Navigate line comments with H → nested headings
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Conversation Tab (reading reviews):
  1. Quick Nav H or VO+Cmd+H → navigate headings
  2. Listen for "Reviewers" heading
  3. Your name appears as reviewer
  4. VO+Down to read bot comment and peer feedback

Files Changed Tab (what actually changed):
  1. Quick Nav H to navigate file headings
  2. VO+U → Landmarks → "File tree" to explore files
  3. VO+Shift+Down to interact with the diff table, then VO+Down for lines
  4. Navigate line comments with Quick Nav H → nested headings
```

</details>

### Leaving a Review

<details>
<summary>Visual / mouse users</summary>

1. Scroll to the comment box on the Conversation tab
2. Type your review comment
3. Click **"Review Changes"** (top-right of the Files Changed tab, or at the bottom of the PR page)
4. Select your review type: Comment / Approve / Request changes
5. Click **"Submit review"**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
1. On Conversation tab, scroll to comment box
2. Switch to Focus Mode (NVDA+Space / Insert+Z)
3. Type your review comment
4. Tab to "Review Changes" button
5. Select review type:
   - "Comment" (just feedback)
   - "Approve" (good to merge)
   - "Request changes" (needs fixes)
6. Tab to "Submit review"
7. Press Enter
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
1. On Conversation tab, Quick Nav F or VO+U → Landmarks → "Add a comment"
2. VO+Shift+Down to interact with the comment text area
3. Type your review comment
4. VO+Shift+Up → Tab to "Review Changes" button → VO+Space
5. Select review type:
   - "Comment" (just feedback)
   - "Approve" (good to merge)
   - "Request changes" (needs fixes)
6. Tab to "Submit review" → VO+Space
```

</details>

### Responding to Feedback

<details>
<summary>Visual / mouse users</summary>

1. Open your PR (Pull Requests tab → click your PR)
2. Read all comments and bot feedback
3. Click in the comment box to reply
4. Push your fixes to the same branch
5. Comment: "Updates pushed, ready for review"

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
1. Open your PR (find in Pull Requests tab)
2. Read all comments and bot feedback
3. Scroll to comment box
4. Type your response
5. Mention reviewers with @ if clarifying
6. Push your fixes to the same branch
7. Comment: "Updates pushed, ready for review"
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
1. Open your PR (find in Pull Requests tab → Quick Nav H to navigate PR titles)
2. Quick Nav H and VO+Down to read all comments and bot feedback
3. VO+U → Landmarks → "Add a comment" to reach the comment box
4. VO+Shift+Down → type your response
5. Mention reviewers with @ if clarifying
6. Push your fixes to the same branch
7. Comment: "Updates pushed, ready for review"
```

</details>

### Learning Cards: Tips for PR Sharing

<details>
<summary>Screen reader users</summary>

- To find PRs assigned to you for review, navigate to Pull Requests tab and type `review-requested:@me` in the filter field; press `Enter` to apply
- On the Files Changed tab, press `3` to jump between file headings in the diff; press `Tab` to navigate to inline comment buttons
- When leaving a review, press `Tab` from the comment box to reach the "Review Changes" button; the review type selector uses radio buttons navigable with `Arrow` keys

</details>

<details>
<summary>Low vision users</summary>

- In the Files Changed tab, additions are highlighted in green and deletions in red; use a high-contrast theme if these colors are hard to distinguish
- Inline review comments appear as small text boxes embedded in the diff; at high zoom they may be narrow -- resize the browser window wider if text wraps awkwardly
- The "Submit review" button changes appearance based on your selected review type; "Approve" shows a green icon, "Request changes" shows a red icon

</details>

<details>
<summary>Sighted users</summary>

- The review filter `review-requested:@me` in the Pull Requests tab filters to only PRs waiting for your review
- On the Files Changed tab, click the "+" icon that appears when you hover over a line number to leave an inline comment at that exact line
- The "Review Changes" button (top-right of Files Changed tab) opens a dropdown with three radio options: Comment, Approve, or Request Changes

</details>

## FAQ: Pull Requests in Your Learning Room

### "Can I see other students' PRs?"

Not inside their Learning Room repos -- those are private to each student. **You can see other participants' work in two ways:**

- During Challenge 3 ("Join the Conversation") and Challenge 8 ("Culture"), the facilitators pair you with classmates and add you as a collaborator on each other's repos so you can review.
- During Day 2 (and the Bonus C challenge), everyone contributes to the public `accessibility-agents` repo, where every PR is visible to everyone.

### "What if I don't agree with my assigned reviewer?"

When the facilitators pair you for peer review, the pairing is a starting point, not a mandate. You can request additional reviewers manually. Click "Reviewers" -> select someone else, or ask the facilitators to pair you differently.

### "Will my PR get lost when everyone is working at once?"

No. Your repo is your own; you only see your own PRs. Aria's feedback is on your PR alone, and any peer reviewer is specifically assigned to you.

### "Can I comment on someone else's PR?"

When the facilitators pair you for review, yes -- you will be added as a collaborator and can comment, approve, and request changes on their PR. On the public `accessibility-agents` repo, anyone can comment on any open PR.

### "What if my reviewer doesn't respond?"

Mention them directly in a PR comment: "@name, any thoughts on the changes I pushed?" Or ask a facilitator to follow up.

### "Can I work with a friend?"

The facilitators arrange peer pairings, but if you know someone else in the cohort and you want to review each other's work, ask either Jeff or Michael to add you to each other's repos.

### "How long does review take?"

When pairings happen during a workshop block, typically 15-60 minutes. If a reviewer is slow, the facilitators can step in or assign someone else.

### "What if bot feedback is wrong?"

Comment on the PR explaining why. Aria is intentionally educational, not punitive -- if you disagree with a check, the facilitators can override it. Aria is not perfect, which is exactly why human review still matters.

### "Do I need to complete every challenge?"

No. The Learning Room has challenges for all skill levels. You can pick what interests you, complete at your pace, and continue after the workshop -- your repo stays yours.

## If You Get Stuck

| Problem | What to do |
|---|---|
| Cannot find your `learn/<username>` branch | If you have not created it yet, follow Challenge 4. If you created it but cannot see it, refresh the branch selector or run `git fetch origin` from a local clone. |
| Push rejected to main branch | Main is protected. You need to push to your `learn/<username>` branch: `git checkout learn/<your-username>` then push again. |
| I want to see another student's PR | Ask a facilitator -- when peer review is part of a challenge, they will add you as a collaborator on the other student's repo. |
| Practice file has no TODO markers | Verify you are on the correct branch. Run `git branch` to see your current branch. The main branch may have already been updated. |
| Accidentally committed to main | Do not panic. See the failsafe instructions in [Chapter 13](13-how-git-works.md#10-if-you-get-stuck) or ask a facilitator. |
| Everything else | Post a comment on your challenge issue describing what happened. That always counts as participation. |
| I finished Challenge 4 but I am not sure I did it right | Compare your work against the [Challenge 4 reference solution](solutions/solution-04-branch-out.md). Any branch with any name is a success. |
| I finished Challenge 5 but I am not sure I did it right | Compare your work against the [Challenge 5 reference solution](solutions/solution-05-make-your-mark.md). Any clear edit with a descriptive commit message is a success. |

## Celebration: You're Contributing

Every PR you open and merge in the Learning Room is a **real contribution**:

You found something to improve  
You made a meaningful change  
You received feedback (technical + human)  
You incorporated suggestions  
You merged your work  

**That is open source contribution.** Your facilitator has a record. The GitHub repo has a record. You have a merged commit in your history.

This is not hypothetical. This is not simulation. This is real.

> **Challenge Time:** Let's practice. Go to the [Challenge Hub](CHALLENGES.md) and complete **Challenge 1: Find Your Way Around**, then return for [Chapter 05: Working with Issues](05-working-with-issues.md).

---

*Next: [Chapter 05: Working with Issues](05-working-with-issues.md)*  
*Back: [Chapter 03: Navigating Repositories](03-navigating-repositories.md)*  
*Related appendices: [Appendix A: Glossary](appendix-a-glossary.md)*

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

- **What Is the Learning Room?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Why a Per-Student Repo?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Step-by-Step: Accept Your Classroom Assignment and Open Your Repo:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Workshop Recommendation (Chapter 4):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Two Tracks That Reinforce Each Other:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Your Learning Room Folder Structure:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Your Practice Branch:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The Practice Files: What You Will Work On:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **How PR Sharing Works:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What You and Your Peers See:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The Learning Automation System:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Study Groups (Optional):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Key Differences: Skills Module vs. Your Learning Room:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Tips for Reviewing a Peer's PR:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **FAQ: Pull Requests in Your Learning Room:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **If You Get Stuck:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
