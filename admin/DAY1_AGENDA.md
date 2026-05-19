# Day 1 Agenda

## Open Source Assistive Technology Workshop - GitHub Classroom Edition

> **Day 1 Focus:** The GitHub web interface -- navigating repositories, filing and responding to issues, understanding pull requests, and contributing through the browser using only your keyboard and screen reader.
>
> **How learning works today:** Each participant has their own private repository, created automatically when you accept the Classroom assignment. Inside that repo, an automation system called Gandalf guides you through a series of challenges delivered as GitHub Issues. The live session prioritizes the core path through repository navigation, issues, branches, commits, and a first pull request. The remaining challenges stay available for async completion during open lab time or after the event.

## Coverage Promise

This agenda is a live facilitation plan, not a requirement that every chapter and challenge be completed in the room. The full curriculum contains more material than a shortened live day can responsibly cover.

- **Live core:** Participants should leave able to navigate a repository, file and discuss issues, create a branch, edit a file, commit, and open a pull request.
- **Live support if time allows:** Merge conflicts, review practice, labels, milestones, notifications, and culture exercises.
- **Async follow-up:** Challenges 7-9 and the reference chapters remain available after the live session. Facilitators can use open lab time for catch-up instead of moving the whole room forward.
- **Remote-ready delivery:** Remote participants should receive the same Classroom links, Slack channel, CART/ASL access where available, and written checkpoints. Every block should include a clear "you are done when" checkpoint so people can pause and resume later.

## Your Classroom Repository

When you accept the Day 1 assignment link, GitHub creates a private copy of the template repository for you in the workshop classroom organization. You do not work directly in the template repository. Your private Learning Room repo comes pre-configured with:

- **Gandalf bot** -- an automated assistant that validates your pull requests and provides educational feedback within 30 seconds
- **Challenge progression** -- when you close one challenge issue, the next one opens automatically
- **Practice files** in `docs/` with intentional issues for you to find and fix
- **21 challenge templates** (Challenges 1-9 today, 10-16 + bonus on Day 2)

**How Gandalf works:**

1. You open Challenge 1 as your first issue after facilitators seed it for your private repo
2. You work through the instructions and submit your evidence
3. When you close the issue, the progression system creates Challenge 2
4. When you open a pull request, Gandalf comments within 30 seconds with structured validation feedback
5. This continues through all 9 Day 1 challenges

**Why this matters:** You are not reading about GitHub. You are doing GitHub, in your own repository, and an automated system is verifying your work and giving you feedback. The mechanics are identical to what happens when you contribute to any real open source project.

## At a Glance

The following table summarizes the Pacific-time live agenda and identifies which blocks are required live coverage versus stretch or async material.

| Time (Pacific) | Block | Topic | Coverage |
|----------------|-------|-------|----------|
| 9:00-9:30 AM | Event welcome | Check-in, breakfast, access services, and orientation | Required live |
| 9:30-10:00 AM | Keynote | Making real change through real learning | Required live |
| 10:00-10:15 AM | Opening remarks | Event goals, agenda, and participation norms | Required live |
| 10:15-10:45 AM | Block 0 | Learning Room setup and Classroom assignment acceptance | Required live |
| 10:45-11:20 AM | Block 1 | Screen reader orientation to GitHub | Required live: Challenge 1 |
| 11:20 AM-12:00 PM | Block 2 | Issues and conversations | Required live: Challenges 2-3 |
| 12:00-1:00 PM | Lunch | Food, rest, informal support | Required break |
| 1:00-1:50 PM | Block 3 | Branching, editing, and committing | Required live: Challenges 4-5 |
| 1:50-2:45 PM | Block 4 | Pull requests and review basics | Required live: Challenge 6; Challenge 7 if time allows |
| 2:45-3:00 PM | Break | Rest and facilitator triage | Required break |
| 3:00-4:00 PM | Block 5 | Contribution lab and merge-conflict support | Live support: finish Challenges 4-7 |
| 4:00-4:30 PM | Block 6 | Culture, triage, labels, and notifications | Async or stretch: Challenges 8-9 |
| 4:30-5:00 PM | Wrap-up | Reflection, next steps, remote catch-up path | Required live |

**Total:** 8 hours of event time (9:00 AM - 5:00 PM Pacific), with about 5 hours of hands-on GitHub instruction after keynote, opening remarks, lunch, and breaks.

## Pre-Day Checklist

Before entering the room (or joining the call), participants should have completed everything in [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md). The facilitator will do a quick verification at the start.

## Block 0 - Learning Room Setup and Orientation (10:15 AM, 30 min)

### Date and Location

**Day 1: May 21, 2026** | 9:00 AM - 5:00 PM Pacific
**Day 2: May 22, 2026** | 9:00 AM - 5:00 PM Pacific

### Facilitators

- **Jeff Bishop** -- lead facilitator, maintainer of [Accessibility Agents](https://github.com/community-access/accessibility-agents)
- **Michael Babcock** -- co-facilitator

Both Jeff and Michael run all sessions together. "The facilitator" or "your facilitator" in this agenda refers to whichever of the two is leading a given moment; either can step in for the other on any task.

### Purpose

Make participants comfortable, set expectations, verify setups, and create a psychologically safe space for the day.

### Activities

**Facilitator introduces:**

- The purpose of this session: building real, usable GitHub skills for open source AT contribution
- What "contribution" means -- it is not only code. Documentation, accessibility testing, issue triage, and feedback are all valuable contributions.
- The "ask before you assume" norm -- it is always OK to ask what something means
- The Classroom model: each participant has their own private repo with Gandalf bot and challenge progression

**Quick setup verification (10 min):**

- Can everyone navigate to github.com?
- Does everyone's screen reader announce page headings?
- Is hovercards turned off? (If not -- navigate to Accessibility Settings now)
- Can everyone access GitHub Issues and Pull Requests? (see Step 4 in [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md))

**Accept the Classroom assignment (10 min):**
The facilitator shares the Day 1 assignment link. Each participant follows the [Step-by-Step: Accept Your Classroom Assignment and Open Your Repo](../docs/04-the-learning-room.md#step-by-step-accept-your-classroom-assignment-and-open-your-repo) walkthrough in Chapter 4. The short version:

1. Opens the assignment link in their browser
2. Accepts the assignment -- GitHub creates a private repo in the workshop organization
3. Waits ~30 seconds for the repo to finish creating
4. Navigates to their new repository
5. Checks the Issues tab -- Challenge 1 should appear automatically

> **If Challenge 1 does not appear:** Wait 60 seconds and refresh. If it still does not appear, the facilitator can manually create it from the issue template.

**Introductions:**

- Each participant: your name, your screen reader and OS, what brings you here

## Block 1 - Screen Reader Orientation to GitHub (10:45 AM, 35 min)

### Purpose

Establish a shared navigation foundation. Every participant leaves this block able to confidently navigate a GitHub repository page using their screen reader.

### Key Concepts Covered

- Browse Mode vs Focus Mode -- when to be in each
- Single-key navigation: H (headings), D (landmarks), K (links), B (buttons), F (form fields)
- The Elements List (`NVDA+F7` / `Insert+F3` JAWS / VoiceOver Rotor `VO+U`)
- How GitHub uses landmarks -- navigation, main, search-results
- Submitting text with `Ctrl+Enter`

### Part A - Navigate GitHub Together (15 min)

**Navigate the GitHub homepage:**

1. Open GitHub.com -- what is announced? (heading level, landmark)
2. Press `H` repeatedly -- list the headings aloud
3. Press `D` -- what landmarks exist?
4. Open Elements List -- how many links are on the page?

**Navigate your Classroom repository:**

1. Go to your repository URL (provided by the facilitator or visible in your Classroom dashboard)
2. Find the repo name with `1` (h1)
3. Find the tab bar (Issues, Pull Requests, etc.) with `D` -- repository navigation landmark
4. Navigate the files table with `T` then `Ctrl+Alt+Down`
5. Open `README.md` -- read the description of what this repository contains

**Explore the practice files:**
The `docs/` folder contains files with intentional issues that you will fix during today's challenges:

| File | What it contains | What you will fix |
|------|------------------|-------------------|
| `docs/welcome.md` | Introduction to open source contribution | `[TODO]` sections to complete, a broken link to find |
| `docs/keyboard-shortcuts.md` | NVDA, JAWS, and VoiceOver shortcut tables | Intentional errors in keyboard shortcut references |
| `docs/setup-guide.md` | Step-by-step GitHub setup instructions | Broken links and incomplete steps |

1. Open `docs/welcome.md` -- navigate with `H` to read the headings. Notice the `[TODO]` markers.

> **Key insight:** These files are intentionally imperfect. You will fix them during your challenges. For now, notice the structure -- headings, tables, links -- and how your screen reader announces each one.

### Part B - Start Challenge 1: Find Your Way Around (25 min)

> **Your first challenge is waiting.** Navigate to the Issues tab in your repo. Challenge 1 is a scavenger hunt across the repository.

**What Challenge 1 asks you to do:**

- Find the Code tab and count root files
- Open the Issues tab and find an open issue
- Navigate to `docs/welcome.md` and read the first paragraph
- Find the repository description
- Locate the README and identify the workshop audience
- Find the About section

**Work through the scavenger hunt using your screen reader.**

When you finish, submit your evidence in the challenge issue and close it. Within seconds, the progression system creates Challenge 2 for you.

> **Magic Moment:** You just completed your first GitHub challenge in your own repository, and an automated system detected it and responded. This is the same mechanism used by real open source projects -- automated workflows responding to contributor actions.

### Reference Document

[Screen Reader Cheat Sheet](../docs/appendix-b-screen-reader-cheatsheet.md)

## Block 2 - Issues and Conversations (11:20 AM, 40 min)

### Purpose

Participants can file, read, respond to, and navigate issues -- and understand how GitHub's conversation model works.

### Key Concepts Covered

- What issues are and why they matter
- Searching and filtering the issues list
- Filing a new issue using a template
- Commenting with Markdown -- headings, bold, links, code, task lists
- @mentions and cross-references

### Part A - Challenge 2: File Your First Issue (25 min)

Challenge 2 asks you to find a TODO in `docs/welcome.md` and file a well-structured issue describing the problem.

**Key skills you practice:**

1. Navigating to a file and finding specific content
2. Going to the Issues tab and creating a new issue
3. Writing a clear, descriptive title (not just "Fix TODO")
4. Writing a description that explains what, where, and why

> **Markdown practice:** Your issue description is Markdown. Use `##` for headings, `**bold**` for emphasis, and backtick-wrapped text for file names. Every comment you write on GitHub is Markdown -- you are practicing it in context, not in isolation.

When you close Challenge 2, Challenge 3 appears.

### Part B - Challenge 3: Join the Conversation (25 min)

Challenge 3 asks you to comment on a classmate's issue, use @mentions, and add reactions.

**What you will do:**

1. Find a classmate's Challenge 2 issue (your facilitator will help pair you)
2. Leave a meaningful comment -- confirm you see the same problem, suggest an approach, or ask a clarifying question
3. Use `@username` to mention your classmate
4. Add a reaction (thumbs up, heart, or any emoji) to their original issue

**Good commenting tips:**

- Be specific ("I found the same TODO on line 12" beats "I agree")
- Be encouraging ("Great find!" is always welcome)
- Be constructive (suggest, do not just criticize)

After submitting your evidence, close Challenge 3. Challenge 4 opens.

### Reference Document

[Working with Issues](../docs/05-working-with-issues.md) | [Glossary](../docs/appendix-a-glossary.md)

## Lunch (12:00 PM, 60 min)

Encourage participants to stand, stretch, and rest their ears. Screen reader listening is cognitively demanding work.

## Block 3 - Branching, Editing, and Committing (1:00 PM, 50 min)

### Purpose

Participants create a branch, edit a file on GitHub, and commit with a meaningful message -- the core Git workflow that every contribution uses.

### Key Concepts Covered

- What branches are and why they exist
- Creating a branch from the GitHub UI
- Editing a file in the browser editor
- Writing meaningful commit messages
- The difference between committing to a branch vs. main

### Part A - Challenge 4: Branch Out (20 min)

Challenge 4 asks you to create a personal branch named `learn/YOUR-USERNAME`.

**Step by step:**

1. Make sure you are on the Code tab of your repository
2. Find the branch dropdown (it shows "main" by default) -- use `B` to navigate buttons
3. Type `learn/YOUR-USERNAME` (replace with your actual GitHub username)
4. Select "Create branch: learn/YOUR-USERNAME from main"

> **Why branches matter:** A branch is your private workspace. You can make changes without affecting anyone else. When you are ready, you open a pull request to propose merging your changes into `main`. This is how every contribution works in open source.

Submit your evidence and close Challenge 4. Challenge 5 appears.

### Part B - Challenge 5: Make Your Mark (25 min)

Challenge 5 asks you to edit `docs/welcome.md` on your branch to fix the TODO you identified in Challenge 2, then commit with a meaningful message.

**Step by step:**

1. Make sure you are on your `learn/YOUR-USERNAME` branch (check the branch dropdown)
2. Navigate to `docs/welcome.md`
3. Find the edit button (pencil icon) -- use `B` to navigate buttons
4. Switch to Focus Mode and make your edit
5. Write a meaningful commit message:

| Instead of this | Write this |
|-----------------|-----------|
| Update welcome.md | Add workshop description to replace TODO in welcome.md |
| Fix stuff | Replace placeholder text with actual welcome message |
| changes | Add participant introduction section to welcome.md |

1. Commit directly to your branch

> **Key insight:** A good commit message answers two questions: **What** did you change and **Why?** Future contributors (including future you) will read these messages to understand the project's history.

Submit your evidence and close Challenge 5. Challenge 6 appears.

### Part C - Catch-Up and Exploration (10 min)

If you finished Challenges 4-5, explore your repository using the navigation skills from Block 1:

- View your commit history (navigate to the Commits section)
- Compare your branch to `main` -- what differs?
- Read `docs/keyboard-shortcuts.md` and find the intentional errors you will fix later

If you are still working on a challenge, use this time to finish.

### Reference Document

[Working with Pull Requests](../docs/06-working-with-pull-requests.md)

## Block 4 - Pull Requests, Review, and Merge Conflicts (1:50 PM, 55 min)

### Purpose

Participants open their first pull request, experience automated feedback from Gandalf bot, and resolve a facilitator-triggered merge conflict.

### Key Concepts Covered

- Anatomy of a PR (title, description, base/compare branches)
- Navigating the three PR tabs: Conversation, Commits, Files Changed
- Reading a diff -- additions, deletions, context lines
- The `Closes #XX` pattern for linking PRs to issues
- Status checks and automated feedback
- What merge conflicts are and how to resolve them

### Part A - Challenge 6: Open Your First Pull Request (20 min)

Challenge 6 asks you to open a PR from your `learn/YOUR-USERNAME` branch to `main`, linking it to the issue you filed in Challenge 2.

**Step by step:**

1. Navigate to the Pull Requests tab
2. Activate "New pull request"
3. Set base to `main`, compare to `learn/YOUR-USERNAME`
4. Review the diff -- your edits to `docs/welcome.md` appear as additions
5. Write a descriptive PR title
6. In the PR description, include `Closes #XX` (replace XX with your Challenge 2 issue number)
7. Submit the pull request

> **Magic Moment:** Within 30 seconds, Gandalf bot comments on your PR. Navigate to the Conversation tab and read the comment with your screen reader. Gandalf checks for:
>
> - Issue reference (did you include `Closes #XX`?)
> - Description quality
> - File location
> - Heading hierarchy
> - Link text quality
> - `[TODO]` markers (did you remove them all?)
>
> The feedback explains WHY each issue matters and links to resources. This is automated feedback on your real GitHub action, from an actual GitHub Actions workflow running in your repository.

**If Gandalf flags issues:**

1. Address any required checks
2. Push your changes to the same branch -- Gandalf re-checks automatically
3. The bot is educational, not punitive. Every message tells you what to fix and why.

Submit your evidence and close Challenge 6. Challenge 7 appears.

### Part B - Challenge 7: Survive a Merge Conflict (20 min)

Challenge 7 is facilitator-triggered. Your facilitator will make a change to `main` that conflicts with your branch, creating a merge conflict in your PR.

**What you will see:**
Your PR shows a message that it has conflicts. The "Merge pull request" button is disabled.

**What conflict markers look like:**

```text
<<<<<<< HEAD
The version currently on the target branch
=======
Your version from your branch
>>>>>>> learn/your-username
```

**How to resolve:**

1. Select "Resolve conflicts" in your PR (or edit the file directly on your branch)
2. Find the conflict markers
3. Decide which content to keep (or combine both)
4. Delete all three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Commit the resolution

> **Key insight:** Merge conflicts are normal. They happen whenever two people edit the same part of the same file. The markers show both versions so you can choose the right content. In real projects, conflicts happen regularly and resolving them is a routine skill.

**Autograded:** The autograder checks that no conflict markers remain in your file and that the file has meaningful content.

Submit your evidence and close Challenge 7. Challenge 8 appears.

### Part C - Navigating a PR with Your Screen Reader (10 min)

Before the afternoon break, practice navigating the PR you just opened:

1. **Conversation tab:** Read the PR title, description, and Gandalf's comment
2. **Commits tab:** How many commits? Navigate the list
3. **Files Changed tab:** Navigate the diff -- what changed?
4. **Leave an inline comment:** In Files Changed, find a changed line, find the comment button (`B` for buttons or `Shift+F10` for context menu), type a comment, submit as "Start a review"
5. Submit your review with an overall comment

### Reference Document

[Working with Pull Requests](../docs/06-working-with-pull-requests.md) | [Merge Conflicts](../docs/07-merge-conflicts.md)

## Break (2:45 PM, 15 min)

## Block 5 - Contribution Lab and Merge-Conflict Support (3:00 PM, 60 min)

Use this block as supported lab time first. If most participants have already opened a pull request, move into culture, triage, and merge-day practice. If not, keep facilitators focused on helping participants finish Challenges 4-7.

### Purpose

Participants reflect on open source culture, practice issue triage, and get their Day 1 PR merged.

### Part A - Challenge 8: The Culture Layer (25 min)

Challenge 8 has two parts:

**Part 1 - Reflection:**
Think about your experience so far. Answer one or more:

- What made you feel welcome when you arrived?
- What would make this workshop more accessible or inclusive?
- What is one thing you learned from a classmate today?

**Part 2 - Triage an issue:**

1. Go to the Issues tab and find an open issue (yours or a classmate's)
2. Add at least one label that describes the issue (`bug`, `enhancement`, `documentation`, `good first issue`)
3. If you think the issue needs someone's attention, leave a comment tagging them

> **Why labels matter:** Labels are how maintainers organize hundreds of issues. A well-labeled issue gets found faster. The `good first issue` label is specifically how newcomers find their first contribution in any project.

Submit your evidence and close Challenge 8. Challenge 9 appears.

### Part B - Challenge 9: Merge Day (25 min)

Challenge 9 is the Day 1 capstone: get your PR merged.

**Merge checklist:**

- [ ] Your PR has no merge conflicts (if it does, resolve them first)
- [ ] Your PR links to your issue with `Closes #XX`
- [ ] Your commit message is meaningful
- [ ] You have reviewed your own changes one last time

**Steps:**

1. Open your PR on the Pull Requests tab
2. If all checks pass (green checkmarks), you are ready to merge
3. Select "Merge pull request" (your facilitator may handle this step)
4. After the merge, go to the Code tab and verify your changes appear on `main`
5. Check that your linked issue was automatically closed

> **Magic Moment:** If your PR merged today, navigate to the Code tab. Your changes are on `main`. The issue you filed is closed. Your name is in the commit history. If your PR is still in progress, you have the same path in front of you: finish the review, merge when ready, and the result is real.

Submit your evidence and close Challenge 9.

### Part C - Help a Classmate (10 min)

If you finished Challenges 8-9, find a classmate who is still working:

- Help them resolve a merge conflict
- Review their PR and leave a constructive comment
- Answer a question about something you figured out

If everyone is done, browse the bonus challenges (A through E) for extra practice.

## Block 6 - Community: Communication, Labels, and Notifications (4:00 PM, 30 min)

This block is stretch content for live delivery. If participants are still finishing pull requests, use this time as supported lab time and assign the culture, triage, labels, and notifications material as async follow-up.

### Purpose

Participants understand the human side of open source: how to communicate well, how to stay organized, and how to manage their GitHub notification experience.

### Part A - Community Health Files (15 min)

**Discussion:** What makes an open source project a welcoming place?

**Hands-on:** Navigate the community health files in your repository:

1. Read `CODE_OF_CONDUCT.md` -- what does it commit to?
2. Read `CONTRIBUTING.md` -- what does the project ask of contributors?
3. Navigate to `.github/ISSUE_TEMPLATE/` and open a challenge template. What information does it require and why?
4. Read the Student Guide (`.github/STUDENT_GUIDE.md`) -- find the "Common Validation Issues and Fixes" section. This explains every Gandalf bot feedback message you might see.

**Key insight:** These files exist to lower barriers AND set expectations. A project with these files sends a signal of maturity and intention.

### Part B - Communication and Review Culture (30 min)

**Discussion: How to communicate in open source (10 min)**

Open source communication is asynchronous. Your comment will be read out of context, by many people, over a long time. These principles matter:

- Clarity and precision: "I noticed X, which might cause Y" vs "This is wrong"
- The difference between critiquing code and critiquing people
- Handling disagreement: "I see it differently because..." rather than "No, that's incorrect"
- Acknowledging effort: starting with what is working before identifying problems
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

1. "This is obviously wrong -- anyone can see it does not handle nulls."
2. "LGTM but TBH this feels like over-engineering IMO."
3. "Fix this before EOD."

Then write a review comment for this change: "A PR removes the `<main>` landmark element from a page."

### Part C - Labels, Milestones, and Cross-References (20 min)

**Labels -- organizing intent:**

- Creating a label: Issues > Labels > New label
- Applying labels from the issue sidebar
- Filtering issues by multiple labels
- Label naming conventions

**Cross-references -- linking work:**

- From a PR description: `Closes #42` auto-closes the issue on merge
- Referencing across repos: `owner/repo#42`
- From comments: type `#` and a number

**Hands-on:**
Practice applying labels to a challenge issue in your repo. If you have completed all your challenges, help a classmate label theirs.

### Part D - Notifications: Taking Control of Your Inbox (10 min)

**Concepts:**

- GitHub Notifications inbox: `github.com/notifications`
- Subscribed vs Participating vs @mentioned
- Notification preferences per repository
- The "Done" button

**Hands-on:**

1. Navigate to your Notifications inbox
2. Find the notification from your PR or issue comment
3. Mark it as Done
4. Change your repository Watch settings to "Participating and @mentions only"

## Wrap-Up (4:30 PM, 30 min)

### What You Built Today (10 min)

Today you navigated real GitHub repositories, filed real issues, opened real pull requests, reviewed real contributions, and merged real changes -- in your own repository with automated feedback. Those skills work on every GitHub repository in the world, not just this workshop.

### Challenge Progress Check (10 min)

Where are you in the challenge sequence?

| Status | What to Do |
|--------|-----------|
| Challenges 1-9 complete | Celebrate. Browse the bonus challenges for extra practice tonight. |
| Challenges 7-8 in progress | Finish during tonight's optional time or first thing tomorrow. |
| Challenge 6 or earlier | Talk to your facilitator about a catch-up plan for tonight. |

Your repository is yours. Gandalf is waiting. You can work through challenges at your own pace after the session ends.

### Reflection (10 min)

- What is one thing you did not know before today?
- What is one thing you want to get better at?
- What is one contribution you want to make to a real accessibility project this week?

### If You Are Joining Us Tomorrow for Day 2

Day 2 moves from the browser to **Visual Studio Code**. Here is what is coming:

- **VS Code Screen Reader Mode** -- Accessible Help (`Alt+H`), Accessible View (`Alt+F2`), Accessible Diff Viewer (`F7`)
- **Accessibility Agents** -- your earned reward for completing Day 1. An ecosystem of AI agents across 3 teams and 5 platforms that amplify the exact skills you built today.
- **Ship a real PR upstream** -- `community-access/accessibility-agents` is a live repository. Your name in its commit history is the Day 2 capstone.

> **Start thinking now:** As you reflect on today's experience -- navigating repositories, filing issues, reviewing PRs by hand -- ask yourself:
>
> - What took the longest? What was repetitive?
> - What would be easier if an AI agent could handle the mechanical parts?
> - What accessibility problem have you encountered that no tool addresses well?
>
> Tomorrow you will see the agents in action and have the opportunity to contribute new agents, improve existing ones, or shape the project's roadmap. The best contributions come from people who have done the manual work first -- and that is exactly what you did today.

**Tonight (optional):**

- Install VS Code and the GitHub Copilot Chat extension (see [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md))
- Complete any remaining Day 1 challenges
- Browse the bonus challenges (A through E) for extra practice
- Fork [accessibility-agents](https://github.com/community-access/accessibility-agents) -- it will be ready and waiting when you open VS Code tomorrow
- Browse the [agents by team](../docs/19-accessibility-agents.md) -- which ones spark ideas for you?

### If Today Is Your Only Day

Everything you learned today is complete and self-contained. You can now:

- **Navigate any GitHub repository** and understand its structure
- **File issues** that communicate clearly and help maintainers
- **Open pull requests** that follow contribution standards
- **Review other people's work** with constructive, specific feedback
- **Merge contributions** and see your name in a project's history

**What to do next on your own:**

- Explore the [Next Steps](../docs/22-what-comes-next.md) guide for continuing your GitHub journey independently
- Browse [github.com/topics/accessibility](https://github.com/topics/accessibility) for projects that need contributors
- Look for issues labeled `good first issue` on any project that interests you
- Complete the bonus challenges (A through E) in your Classroom repository
- Share what you built today with someone who might want to learn GitHub too

## Facilitator Notes

### Before Day 1

**Template repository setup:**
Ensure the template repo (`learning-room-template` or equivalent) has all automation configured and tested. See [classroom/README.md](../classroom/README.md) for the full deployment guide.

**Classroom assignment:**
Create the Day 1 assignment ("You Belong Here") in GitHub Classroom linked to the template repo. Set it to individual assignment, private repos.

Students do not need an organization, owner access, or repository settings access. They only need a GitHub account and access to the private repository GitHub Classroom creates for them. Facilitators configure organization-level Actions permissions before the cohort.

**Pre-create the merge conflict trigger:**
For Challenge 7, you need to edit `docs/welcome.md` on `main` in each student's repo AFTER they have committed to their branch but BEFORE they try to merge. Plan the timing:

- Watch for students reaching Challenge 6 (opening a PR)
- Push a conflicting edit to `main` in their repos, or use a workflow to trigger it
- This must happen between Challenge 6 and Challenge 7

### Pacing Tips

- **Block 0:** Allow the full 30 minutes for assignment acceptance. Some screen reader users may need help navigating the Classroom acceptance page.
- **Block 1, Part B:** Allow 25 minutes for Challenge 1. The scavenger hunt requires navigating multiple repository sections, which takes longer with a screen reader.
- **Blocks 2-3:** Challenges 2-5 are the core workflow (issue, branch, edit, commit). If a participant gets stuck on one, help them directly rather than moving on -- these skills build on each other.
- **Block 4, Part B:** The merge conflict is facilitator-triggered. Time it carefully. If a participant has not opened their PR yet, wait before triggering the conflict.
- **Block 5:** If participants finish Challenges 8-9 quickly, direct them to bonus challenges or peer review.
- **Stragglers:** Some participants will not finish all 9 challenges in-session. This is fine -- the repos are theirs and Gandalf is waiting. They can finish on their own time.

### The Emotional Arc

Day 1 has three peaks:

1. **The first Gandalf response** (Block 1) -- participants see an automated system react to their action
2. **The first PR feedback** (Block 4) -- Gandalf comments on their real PR within 30 seconds
3. **The merge** (Block 5) -- their changes are on `main` and their issue auto-closed

Do not rush these moments. Give each one time to land.

*Day 2: [Day 2 Agenda](DAY2_AGENDA.md)*
*Related: [Navigating Repositories](../docs/03-navigating-repositories.md) | [Working with Issues](../docs/05-working-with-issues.md) | [Working with Pull Requests](../docs/06-working-with-pull-requests.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Open Source Assistive Technology Workshop - GitHub Classroom Edition:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Coverage Promise:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Your Classroom Repository:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **At a Glance:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Pre-Day Checklist:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Block 0 - Learning Room Setup and Orientation (10:15 AM, 30 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Skills catalog](https://skills.github.com/), [GitHub Learning Pathways](https://resources.github.com/learn/pathways/)
- **Block 1 - Screen Reader Orientation to GitHub (10:45 AM, 35 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Block 2 - Issues and Conversations (11:20 AM, 40 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Lunch (12:00 PM, 60 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Block 3 - Branching, Editing, and Committing (1:00 PM, 50 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Block 4 - Pull Requests, Review, and Merge Conflicts (1:50 PM, 55 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Break (2:45 PM, 15 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Block 5 - Contribution Lab and Merge-Conflict Support (3:00 PM, 60 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Block 6 - Community: Communication, Labels, and Notifications (4:00 PM, 30 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Projects docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects), [Labels docs](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels), [Milestones docs](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones)
- **Wrap-Up (4:30 PM, 30 min):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Facilitator Notes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
