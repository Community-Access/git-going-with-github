# Culture, Etiquette, and Community Standards
>
> **Listen to Episode 8:** [Open Source Culture and Etiquette](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix M: Accessibility Standards](appendix-m-accessibility-standards.md) | [Appendix F: Git Security](appendix-f-git-security.md) | [Appendix O: Branch Protection](appendix-o-branch-protection.md) | [Appendix W: GitHub Pages](appendix-w-github-pages.md)
> **Authoritative sources:** [GitHub Docs: Contributing to open source](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) | [Open Source Guides: How to Contribute](https://opensource.guide/how-to-contribute/)

## How to Be an Effective and Respectful Open Source Contributor

> Technical skills get your code into a project. Communication skills keep you welcomed in the community. This guide covers the human side of open source.

## Workshop Recommendation (Chapter 8)

Chapter 8 is a **communication and culture chapter**.

- **Challenge count:** 1 guided reflection (no bot grading)
- **Automation check:** none - communication quality is too subjective for fair automated scoring
- **Evidence:** structured reflection comment on your assigned challenge issue
- **Pattern:** read, reflect, commit to one behavior

### Chapter 8 Challenge Set

1. **Guided reflection** - read the chapter, then post a short reflection comment committing to three specific collaboration behaviors.

### Challenge 8.1 Step-by-Step: Guided Reflection

**Goal:** Identify three concrete communication behaviors you will practice during the rest of the workshop.

**Where you are working:** your assigned Chapter 8 challenge issue in your Learning Room repository on GitHub.com.

1. Read through the chapter content below, paying attention to the sections on GitHub Flow, constructive feedback, and asking for help.
2. As you read, think about one situation from Day 1 where communication helped (or could have helped) you.
3. Open your **assigned Chapter 8 challenge issue** (the one titled "Chapter 8.1: Guided Reflection (@yourname)").
4. Scroll to the comment box at the bottom of the issue.
5. Post a reflection comment using this format:

```text
Chapter 8 reflection:
- One respectful review habit I will use:
- One way I will ask for help clearly:
- One way I will respond to feedback constructively:
```

6. For each prompt, write one specific, actionable sentence - not a vague goal. Examples:
   - Good: "I will start review comments with what the author did well before suggesting changes."
   - Vague: "I will be nice."
   - Good: "I will include the exact step where I got stuck and what I already tried."
   - Vague: "I will ask good questions."
7. Activate the **Comment** button (or press `Ctrl+Enter`).

**You are done when:** Your reflection comment appears on the issue with three specific, actionable behaviors.

### Completing Chapter 8: Submit Your Evidence

The reflection comment itself is your evidence. No additional steps are needed. The facilitator reviews your comment for specificity. Close your Chapter 8 challenge issue when done.

### Expected Outcomes

- Student can name specific, actionable respectful collaboration behaviors.
- Student can prepare a constructive feedback style before review work in later chapters.
- Student feels safer asking for help in public threads.

### If You Get Stuck

1. Use one simple sentence per prompt - do not overthink it.
2. Focus on one real behavior you can start doing today, not an abstract principle.
3. If writing feels hard, draft bullet points first in a text editor, then paste into the comment.
4. Look at the "Giving Feedback" and "Asking for Help" sections in this chapter for concrete examples.
5. Ask facilitator for one example response and adapt it to your own words.
6. Finished but not sure you did it right? Compare your work against the [Challenge 8 reference solution](solutions/solution-08-culture.md).

### Learning Moment

Technical quality and communication quality work together. Respectful, clear communication helps good code get merged faster. The behaviors you commit to here will directly improve your PR reviews in Chapters 12 and 14.

### Learning Pattern Used in This Chapter

1. Read and absorb community norms (not just rules, but reasons).
2. Reflect on personal experience (what worked, what was hard).
3. Commit to specific behaviors in writing (public accountability).
4. Apply those behaviors in upcoming chapters (reviews, comments, PRs).

## GitHub Flow - The Standard Contribution Workflow

Before diving into communication norms, it helps to understand the workflow that gives all of those conversations their context. **GitHub Flow** is the lightweight branching model recommended for open source contribution. It is simple by design and works whether you are making a one-line documentation fix or a major feature addition.

### The Six Steps of GitHub Flow

```text
1. Create a branch
   └─ Branch off main with a descriptive name
      (e.g., fix/missing-alt-text, docs/update-contributing-guide)

2. Make your changes and commit
   └─ Work in small, logical commits with clear messages
      Each commit should represent one coherent, complete change

3. Open a Pull Request
   └─ Share your work early - even as a Draft PR
      Describe what you changed, why, and how to test it
      Link to the related issue (Closes #42)

4. Discuss and review
   └─ Reviewers leave feedback → you refine your work
      This is collaborative, not adversarial

5. Pass status checks
   └─ Automated tests and linting must pass
      The project's quality gates exist to protect everyone

6. Merge
   └─ A maintainer merges your PR into main
      The linked issue closes automatically
      Your contribution is now part of the project
```

### Why This Model Works

- **`main` is always deployable.** Nothing goes into `main` directly - every change goes through a PR and review. This protects the project and all its users.
- **Branches are cheap and disposable.** Create a branch per task. Delete it after merging. There is no overhead to starting fresh.
- **PRs are the unit of conversation.** Everything about a change - the why, the tradeoffs, the review, the approval - lives in one place.
- **Small changes move faster.** A 5-file PR gets reviewed in an hour. A 50-file PR sits for days. The most effective contributors keep PRs small and focused.

### GitHub Flow vs Git Flow

You may encounter "Git Flow" (sometimes written "GitFlow") in older projects or enterprise environments. This section explains what Git Flow is, how it differs from GitHub Flow, and why this workshop teaches GitHub Flow.

#### What Git Flow Is

Git Flow is a branching model published by Vincent Driessen in 2010. It was designed for teams that ship versioned releases on a schedule (desktop software, mobile apps, embedded systems). It defines five branch types:

The following table describes each Git Flow branch type, its lifetime, and its purpose.

| Branch | Lifetime | Purpose |
| --- | --- | --- |
| `main` (or `master`) | Permanent | Always reflects the latest production release. Only receives merges from `release/` or `hotfix/` branches. |
| `develop` | Permanent | Integration branch where completed features accumulate. Represents the next planned release. |
| `feature/` | Temporary | Branched from `develop`. One branch per feature. Merged back into `develop` when complete. Deleted after merge. |
| `release/` | Temporary | Branched from `develop` when enough features are ready. Used for final testing, version bumps, and changelog updates. Merged into both `main` and `develop`, then deleted. |
| `hotfix/` | Temporary | Branched from `main` to patch a critical production bug. Merged into both `main` and `develop`, then deleted. |

#### How the Git Flow Cycle Works

1. Developers branch `feature/my-feature` off `develop` and work there.
2. Completed features merge back into `develop` via pull request.
3. When `develop` has enough features for a release, a `release/1.2.0` branch is created.
4. The release branch gets final testing, bug fixes, and version number updates.
5. The release branch merges into `main` (tagged with the version) and back into `develop`.
6. If a critical bug is found in production, a `hotfix/` branch is created from `main`, fixed, and merged into both `main` and `develop`.

#### How GitHub Flow Differs

The following table compares GitHub Flow and Git Flow across key dimensions.

| Dimension | GitHub Flow | Git Flow |
| --- | --- | --- |
| Long-lived branches | `main` only | `main` and `develop` (plus temporary `release/` and `hotfix/`) |
| Feature work | Branch off `main`, PR back to `main` | Branch off `develop`, PR back to `develop` |
| Releases | Every merge to `main` is deployable | Explicit `release/` branches with version numbers |
| Hotfixes | Same as any other PR to `main` | Dedicated `hotfix/` branch merged to both `main` and `develop` |
| Complexity | Low - one rule: `main` is always deployable | High - multiple branch types with specific merge targets |
| Best for | Continuous deployment, web apps, open source | Scheduled releases, versioned software, large enterprise teams |

#### When You Might See Git Flow

- **Enterprise products** with quarterly or annual release cycles
- **Mobile apps** that go through app store review before release
- **Embedded systems or firmware** where "deploying" means shipping hardware
- **Legacy projects** that adopted it before continuous deployment became common

#### Why This Workshop Uses GitHub Flow

For open source contribution - especially at a hackathon or when contributing to web-based projects - **GitHub Flow is what you want**. It is what GitHub itself uses and what most modern open source projects follow. The single-branch simplicity means you can focus on your contribution rather than navigating branch logistics.

If you join a project that uses Git Flow, the pull request skills you learn here transfer directly. The difference is which branch you target (usually `develop` instead of `main`) and the additional coordination around release timing.

### The Unwritten Rule: One Thing Per Branch

A branch and its PR should do **one thing**. If you are fixing a broken link and you notice a typo nearby, fix the typo in a **separate branch and PR**. This keeps reviews fast, history clean, and reduces the risk of one unrelated problem blocking an urgent fix.

### Learning Cards: GitHub Flow

<details>
<summary>Screen reader users</summary>

- The six steps (branch, commit, PR, review, checks, merge) map to six distinct pages on GitHub; you can verify your stage by pressing `1` to hear the page title on each
- When you open a PR, press `D` to the "Pull request navigation tabs" landmark; the Conversation tab confirms your PR is open and shows the linked issue
- After merge, press `G I` to jump to the Issues tab and verify the linked issue closed automatically (it now shows a purple "Closed" badge)

</details>

<details>
<summary>Low vision users</summary>

- Each PR in the Pull Requests list has a colored icon: green circle for open, purple merged icon for merged, red circle for closed
- The "Compare & pull request" yellow banner appears at the top of the repo after pushing a branch; it is full-width and prominent at any zoom level
- Before merging, the status checks area below the PR description shows green checkmarks (passed) or red X marks (failed); zoom in to read individual check names

</details>

<details>
<summary>Sighted users</summary>

- GitHub Flow uses one long-lived branch (`main`) plus short-lived feature branches; the branch dropdown on the Code tab shows all active branches
- After pushing, look for the yellow "Compare & pull request" banner at the top of the repository page to quickly open a PR
- The PR timeline on the Conversation tab shows the entire story: description, bot checks, review comments, and merge status in chronological order

</details>

## Keeping Your Fork Up to Date

When you fork a repository, you get a snapshot of the project at that moment. The original repository (called "upstream") continues to evolve. To keep your fork current with upstream changes:

### Why Sync Your Fork?

- **Stay compatible** - upstream changes may affect your work
- **Avoid conflicts** - the longer you wait, the more conflicts you'll face when merging
- **Get bug fixes** - benefit from improvements made while you worked
- **Keep branches clean** - start new PRs from an up-to-date main branch

### Method 1: GitHub Web Interface (Easiest)

<details>
<summary>Visual / mouse users</summary>

1. Navigate to your fork's main page: `github.com/your-username/repo-name`
2. Look for the sync indicator: "This branch is X commits behind upstream/main"
3. Click the **"Sync fork"** button
4. Click **"Update branch"**

GitHub merges the upstream changes into your fork automatically.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Navigate to your fork's main page: `github.com/your-username/repo-name`
2. The sync button appears in the landmark that contains the branch selector
3. Press `D` to cycle through landmarks until you reach that region
4. Press `B` to cycle buttons until you hear "Sync fork" → press `Enter`
5. A dialog or page update presents "Update branch" - activate it

</details>

### Method 2: Git Command Line (VS Code Terminal)

If you're working locally in VS Code:

#### One-time setup - add the upstream remote

```bash
git remote add upstream https://github.com/original-owner/repo-name.git
git remote -v  # Verify it was added
```

#### Sync process

```bash
# 1. Switch to your main branch
git checkout main

# 2. Fetch upstream changes
git fetch upstream

# 3. Merge upstream's main into yours
git merge upstream/main

# 4. Push the updated main to your fork on GitHub
git push origin main
```

## When to sync

- Before starting work on a new feature
- Before submitting a PR (to ensure you're working off the latest code)
- Periodically on long-running branches (weekly if actively developed)

### Method 3: GitHub Desktop

1. Open GitHub Desktop
2. Select **Repository → Pull** to get your fork's latest
3. Select **Branch → Merge into Current Branch**
4. Choose **upstream/main**
5. Push the changes to your fork on GitHub

### Learning Cards: Keeping Your Fork Up to Date

**Screen reader users:**
- In the GitHub web interface, press `D` to cycle landmarks until you reach the branch region, then press `B` to find the "Sync fork" button.
- In the terminal, run `git remote -v` to confirm your upstream remote is configured before fetching -- the output reads back both `origin` and `upstream` URLs.
- After `git fetch upstream && git merge upstream/main`, run `git log --oneline -3` to hear the latest commits and verify the merge succeeded.

**Low-vision users:**
- On github.com, the "Sync fork" button and its "X commits behind" indicator sit near the branch selector -- zoom to 200% and the button remains in the same row.
- In GitHub Desktop, the merge dialog uses high-contrast text for branch names; confirm you see "upstream/main" before activating Merge.
- If the terminal output of `git fetch` scrolls too fast, pipe it through `| more` or increase your terminal font size before running sync commands.

**Sighted users:**
- The yellow "This branch is N commits behind" banner on your fork's main page is your visual cue -- click **Sync fork** then **Update branch** and watch the banner disappear.
- In GitHub Desktop, the branch graph in History view shows where upstream diverged; after merging, the graph lines should rejoin.
- In VS Code's Source Control sidebar, the sync icon (circular arrows) in the status bar updates your branch with one click once the upstream remote is configured.

## Writing Good Commit Messages

Every commit you make includes a message describing what changed. Good commit messages make project history understandable months or years later. They also show professionalism and consideration for future contributors (including yourself).

### The commit message format

```text
<type>: <short summary in imperative mood>

<optional body: more detailed explanation>

<optional footer: references to issues>
```

### The First Line (Required)

**Keep it under 50 characters.** This is the commit summary that appears in logs and GitHub's commit list. Think of it as an email subject line.

**Use the imperative mood:** Write as if giving a command to the codebase.

"Fix broken link in README"  
"Add alt text to hero image"  
"Remove deprecated function"  

"Fixed broken link" - past tense  
"Fixing broken link" - gerund  
"I fixed the broken link" - too personal  

**Why imperative?** It matches Git's autogen messages: "Merge pull request #42" or "Revert commit abc123."

**Optional prefixes** (common in some projects):

- `fix:` - bug fix
- `feat:` - new feature
- `docs:` - documentation only
- `style:` - formatting, no code change
- `refactor:` - code restructuring
- `test:` - adding or updating tests
- `chore:` - maintenance (bump dependencies, etc.)

Example: `fix: correct ARIA label on submit button`

### The Body (Optional)

If the summary isn't enough, add a body explaining:

- **Why** you made the change (more important than what)
- **What** trade-offs you considered
- **How** the change affects behavior

Leave a blank line between the summary and the body.

Example:

```text
feat: add keyboard shortcuts for issue navigation

The previous interface required excessive tabbing to reach issue actions.
This change adds G+I to jump to issues list and C to comment inline.

Shortcuts follow GitHub's existing pattern (G+letter for navigation).
Tested with NVDA, JAWS, and VoiceOver.
```

### The Footer (Optional)

Link commits to issues or PRs:

```text
Closes #42
Fixes #17
Part of #89
```

When the commit is merged, GitHub automatically closes linked issues.

### Atomic Commits

Each commit should represent **one logical change**. Don't bundle unrelated fixes into a single commit.

Good: One commit adds alt text; another fixes a typo  
Bad: One commit adds alt text, fixes a typo, reformats code, and updates dependencies  

**Why?** If a commit introduces a bug, you want to revert just that change-not everything.

### Common mistakes to avoid

- "WIP" or "more changes" - not descriptive
- "Update file.js" - GitHub already knows that
- "Fixed it" - doesn't say what "it" is
- Commit messages filled with expletives or frustration
- Extremely long summaries that get cut off in logs

### Good commit messages in practice

```text
fix: prevent crash when username contains special characters

Previously, usernames with @ or # caused a parsing error in the
notification system. This escapes special characters before processing.

Fixes #142
```

```text
docs: add screen reader instructions to contribution guide

New section covers NVDA, JAWS, and VoiceOver setup for contributors
using assistive technology. Based on workshop feedback.

Part of #200
```

**When you make a habit of writing good commit messages, you build trust.** Maintainers see that you care about the project's long-term health, not just your immediate contribution.

### Learning Cards: Writing Good Commit Messages

<details>
<summary>Screen reader users</summary>

- In VS Code's Source Control panel (`Ctrl+Shift+G`), the commit message input is the first field; type your message there and press `Ctrl+Enter` to commit
- On the Commits tab of a PR, press `3` to jump between date-group headings, then `I` to navigate individual commits; each commit announces its message and author
- Good commit messages start with a verb in imperative mood ("Add," "Fix," "Remove"); your screen reader will read these as the first word when navigating commit lists

</details>

<details>
<summary>Low vision users</summary>

- In the commit history view, only the first line (subject) of each commit message is visible by default; click "..." to expand the full body
- Keep the subject line under 50 characters so it does not truncate in GitHub's commit list view at any zoom level
- VS Code shows a vertical ruler in the commit message field at 72 characters; lines longer than this may wrap awkwardly in terminal and email displays

</details>

<details>
<summary>Sighted users</summary>

- The commit list on GitHub shows one commit per row with the subject line, author avatar, and relative timestamp; descriptive subjects make scanning easy
- Use the format "type: description" (e.g., `fix: remove broken link in setup guide`) to categorize commits at a glance
- Separate the subject from the body with a blank line; GitHub renders the body as expandable detail below the subject

</details>

## The Nature of Open Source Communication

Open source collaboration happens primarily **in writing**, **asynchronously**, **in public**. Understanding these three characteristics shapes everything about how we communicate.

### In writing

- There is no tone of voice, body language, or immediate clarification
- A message that sounds terse in your head may read as hostile to the reader
- Sarcasm and irony are nearly impossible to convey safely - avoid them
- **Solution:** Be explicit. "I think this might cause a problem because..." is clearer than "This is problematic."

### Asynchronously  

- Comments are not instant messages - the reader may see your post hours or days later
- You may be in a rush; they are not receiving urgency from your message
- Comments exist without the context of what you were thinking when you wrote them
- **Solution:** Provide all necessary context in every message. Do not assume continuity.

### In public

- Everything you write is visible to everyone, forever, and may be indexed and shared
- Future contributors, employers, and the broader community will read your words
- A dismissive reply to a beginner casts a shadow on the entire project
- **Solution:** Write as if your most supportive and most critical reader are both watching.

## The Anatomy of Helpful Feedback

Whether commenting on an issue, reviewing a PR, or responding to a question, effective feedback has a structure:

### 1. Acknowledge what's working

Before identifying problems, name what is good. This is not flattery - it is accuracy. Most contributions have real strengths.

> "The approach of separating the icon from the button text is exactly right - makes the screen reader label much cleaner."

### 2. Identify the specific concern

Be precise. Vague feedback is not actionable.

"This code is inaccessible."  
"This button has no accessible name - `aria-label` or visible text is needed for screen readers to announce its purpose."

### 3. Explain why it matters

Context turns a complaint into a lesson. It also respects the contributor - they deserve to understand, not just comply.

> "Without an accessible name, screen readers will announce the button as simply 'button,' which gives the user no information about what activating it will do."

### 4. Suggest a path forward (when you can)

If you have an idea for a solution, offer it as a suggestion, not a mandate.

> "Something like `aria-label='Close navigation menu'` would work well here. Happy to help if you'd like."

### 5. Signal the weight of the concern

Help contributors understand what is a blocker versus a preference.

- `nit:` - minor, optional suggestion ("nit: there's a trailing space here")
- No qualifier - normal concern, should be addressed
- "This is a blocker because..."  - must be fixed before merge
- "Just a thought, not a blocker..." - feedback but no requirement

## Language and Tone

### Prefer "we" or describe the code, not the person

"You made an error here."  
"There's an error here." or "This line does X but we need Y."

### Use tentative language for uncertainty

"This will crash on mobile."  
"I think this might cause issues on mobile - have you tested with a narrower viewport?"

### Acknowledge cultural and language diversity

Open source is global. Contributors may be:

- Writing in their second or third language
- Unfamiliar with idioms ("it's a no-brainer," "hit the ground running," "over the top")
- Accustomed to different norms of directness

**When reading someone's comment:** Assume good intent unless there is clear evidence otherwise.  
**When writing:** Choose plain words over clever ones.

### Avoid urgency markers unless genuinely urgent

"I need this fixed ASAP"  
"This is blocking our release scheduled for next Friday - is there capacity to look at it this week?"

## Commenting Etiquette

### Keep comments focused

Each comment should address one concern. If you have three issues, leave three comments - unless they are closely related.

### Don't leave comments unresolved

If you asked a question and got an answer, respond. "Thanks, that makes sense" or resolving the conversation thread signals that the thread is complete.

### Resolving conversations

On a PR, conversations (inline comment threads) can be "resolved" once addressed. The author of the change and the reviewer can both resolve them. If you addressed a reviewer's comment, resolve the thread and leave a note: "Fixed in commit a1b2c3d."

### Do not "pile on"

If five people already said the same thing about an issue, you don't need to add a sixth comment saying the same thing. A reaction on an existing comment is enough.

### Reactions

GitHub reactions () are an efficient way to express agreement, appreciation, or concern without adding noise to a thread.

### Saved Replies - Your Accessibility Win

GitHub lets you save frequently used responses as **Saved Replies** - reusable text snippets you can insert into any comment box with a few keystrokes. This is a significant accessibility win for anyone who types the same comments repeatedly during triage, reviews, or issue management.

#### Common uses

- "Thank you for your contribution! I'll take a look this week."
- "This looks like a duplicate of #N - closing, please continue the discussion there."
- "I've labeled this `good first issue`. To claim it, leave a comment saying you'd like to work on it and I'll assign you."
- Your team's standard accessibility issue acknowledgement template

#### Creating a Saved Reply

1. Navigate to `github.com/settings/replies`
2. Activate **"Add a saved reply"**
3. Give it a title (e.g., "Good first issue claim") - this is what you search for
4. Type the full reply text in the body (Markdown is supported)
5. Save

#### Using a Saved Reply in a comment

1. Navigate to any comment text area
2. Activate the **Saved Replies button** (the speech bubble icon in the comment toolbar, or press `Ctrl+.` if enabled)
3. A dropdown appears showing your saved replies - type to filter by title
4. Select the reply - it inserts into the text area
5. Edit as needed before submitting

#### Screen reader path

```text
In a comment text area:
→ Tab to the toolbar icons
→ "Saved replies" button → Enter
→ Filter by typing part of the title
→ ↑/↓ to select → Enter to insert
```

**Limit:** GitHub allows up to 100 saved replies per account.

### Learning Cards: Commenting Etiquette

<details>
<summary>Screen reader users</summary>

- Press `D` to jump to the "Add a comment" landmark on any issue or PR, then switch to Focus Mode (`NVDA+Space`) to type your comment
- Use `Ctrl+Enter` to submit a comment directly from the text area without needing to find the Submit button
- In a comment, type `@` followed by a username to trigger autocomplete; press `Down Arrow` to navigate suggestions and `Enter` to select

</details>

<details>
<summary>Low vision users</summary>

- The comment box has a formatting toolbar above it (bold, italic, code, link); at high zoom these icons may wrap but remain functional
- Use the Preview tab next to Write to check how your Markdown renders before posting; this helps catch formatting issues at any zoom level
- Saved replies are accessed via the speech bubble icon in the comment toolbar; they insert pre-written text to save typing on common responses

</details>

<details>
<summary>Sighted users</summary>

- The comment box appears at the bottom of every issue and PR Conversation tab; it supports full Markdown with a live Preview tab
- Use `Ctrl+B` for bold, `Ctrl+I` for italic, `Ctrl+K` for links, and `Ctrl+E` for inline code while typing in the comment area
- GitHub renders @mentions, issue references (`#42`), and emoji shortcodes (`:+1:`) automatically in the posted comment

</details>

## Code Review Etiquette - For Reviewers

### Review the code, not the person

"You clearly don't understand accessibility."  
"This implementation doesn't account for keyboard navigation - here's how to add it."

### Don't gatekeep knowledge

If a contributor makes a mistake because they didn't know something, explain the concept. They're here to learn.

### Ask questions instead of making demands

"Change this to use `aria-label`."  
"What do you think about using `aria-label` here instead? Screen readers would then announce the button's purpose directly."

### Distinguish opinion from requirement

If something is your stylistic preference but NOT a bug or correctness issue, say so.

> "The current implementation is correct. I personally prefer the pattern in utils/helpers.js, but this is a nit - feel free to keep it as-is."

### Approve explicitly

When a PR is ready to merge, say so clearly - either by using the Approve review option, or in a comment: "This looks great to me! No blockers on my end."

## Code Review Etiquette - For Authors

### Say thank you

When someone takes time to review your work, acknowledge it - even if you disagree with some feedback.

> "Thanks so much for the thorough review! I've addressed all but the last comment - see my note there."

### Don't take feedback personally

Code review is about the code, not your worth as a person or developer. Even the most senior contributors receive change requests.

### Explain your choices

If you are keeping your implementation despite feedback, explain why.

> "I considered `aria-label` here, but I went with a visually-hidden `<span>` instead because it allows translators to localize the text more easily. Let me know if you think that tradeoff is wrong."

### Surface blockers early

Don't wait until you have finished a 500-line PR to mention that you weren't sure about the approach. Open a Draft PR early and ask.

## Inclusive Commenting for Accessibility Issues

When filing or discussing accessibility bugs, additional context helps:

- **Describe what was announced** - quote your screen reader's exact output when possible
- **Do not assume all users experience the same thing** - NVDA users, JAWS users, and VoiceOver users may have different experiences
- **Be precise about versions** - accessibility behavior changes between OS and screen reader versions
- **Represent the gap** - "This means that [group of people] cannot [do the thing]" - frame in impact, not just symptoms
- **Don't catastrophize or be dismissive** - "No blind person can use this" may be inaccurate; be precise about the specific failure and its scope

## The "Good First Issue" Social Contract

When a maintainer labels an issue `good first issue`, they are:

- **Investing time** - good first issues require extra documentation and mentorship
- **Signaling welcome** - they want to support a new contributor

When you take a good first issue, your responsibilities:

1. **Comment to claim it** - "Hi, I'd like to work on this. Can I be assigned?"
2. **Wait for assignment** - do not start until assigned; two people working in parallel wastes everyone's time
3. **Check in if stuck** - "I've been working on this for a day and I'm stuck on X - can you point me in the right direction?"
4. **Check in if unavailable** - "Life got busy and I can't finish this by the original estimate - is it okay if I extend by a week, or should you reassign?"
5. **Don't disappear** - if you claim an issue, see it through or explicitly hand it back

## Handling Difficult Situations

### When you receive harsh feedback

1. Take a breath before responding - there is no urgency; the thread will wait
2. Look for the valid concern underneath the harsh words
3. Respond to the concern, not the tone
4. If the behavior crosses into harassment, report it via the "..." button on the comment → "Report"

### When you disagree with a decision

1. Make your case once, clearly and with evidence
2. Accept that the maintainer has the final say in their project
3. If you strongly disagree, you can fork the project and take it in a different direction - this is legitimate in open source

### When someone is rude to you

1. You do not have to engage
2. You can reply once to state your boundary: "I'm happy to discuss the technical merits, but I'd prefer if we kept the conversation constructive."
3. Report via GitHub's reporting tools if the behavior is abusive

### When you accidentally caused offense

1. Acknowledge it directly: "I can see how that came across as dismissive - that wasn't my intention."
2. Do not over-explain or defend excessively
3. Adjust going forward

## Writing Your First README

> **See also:** [Appendix W: GitHub Pages](appendix-w-github-pages.md) for publishing your README as a website.

A README is the front door of your project. It is the first file visitors read, and often the only file they read before deciding whether to stay or move on.

### What belongs in a README

Every README should answer these questions, roughly in this order:

| Section | What it answers |
| --- | --- |
| **Project name** | What is this? |
| **Description** | Why does it exist? What problem does it solve? |
| **Installation** | How do I get it running on my machine? |
| **Usage** | How do I use it once it is installed? |
| **Contributing** | How can I help? (or link to CONTRIBUTING.md) |
| **License** | What am I allowed to do with this code? |

You do not need all six sections for a tiny project, but you should have at least a name, a one-sentence description, and a license.

### A skeleton you can copy

```markdown
# Project Name

One sentence that describes what this project does.

## Installation

Steps to install and set up the project locally.

## Usage

Show a basic example of how to use the project.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full text.
```

### Accessibility in READMEs

Your README is a web page -- GitHub renders it as HTML. That means the same accessibility rules apply:

- **Alt text for images and badges.** A badge that says `![](https://img.shields.io/badge/build-passing-green)` is invisible to screen readers. Write `![Build status: passing](...)` instead.
- **Heading hierarchy.** Use `#` for the project name, `##` for top-level sections, `###` for subsections. Never skip levels.
- **Descriptive link text.** Write `See the [installation guide](docs/install.md)` -- not `Click [here](docs/install.md)`.

> **Screen reader tip:** When you navigate a README with a screen reader, the heading list (`Insert + F7` in NVDA, `Rotor > Headings` in VoiceOver) is your table of contents. A flat list of `##` headings with clear names makes the document fast to scan.

### Good README vs. bad README

**Bad:** A single paragraph that says "This is my project. Run it with npm start." No headings, no license, no description of what the project does.

**Good:** A clear name, a sentence explaining the purpose, a short install block, a usage example, a link to CONTRIBUTING.md, and a license section -- all under well-structured headings.

The difference is about two minutes of writing and saves every future visitor from guessing.

### Learning Cards: Writing Your First README

**Screen reader users:**
- Maintain strict heading hierarchy (`#` then `##` then `###`) -- your heading list shortcut (`Insert+F7` in NVDA, Rotor in VoiceOver) becomes a usable table of contents only when levels are not skipped.
- Write descriptive alt text on every badge and image: `![Build status: passing](...)` rather than an empty `![]()` that reads as "image" with no context.
- Use real Markdown link text (`[installation guide](docs/install.md)`) instead of bare URLs, so your screen reader announces the destination rather than spelling out a long URL.

**Low-vision users:**
- Use `##` headings to create clear visual blocks -- GitHub's rendered Markdown adds spacing and larger font weight to headings, making the README scannable at high zoom.
- Keep code blocks short (under 10 lines) and use syntax-highlighted fenced blocks (` ```bash `) so keywords stand out in your high-contrast or dark theme.
- Put the most important information (project name, one-line description, install command) in the first 5 lines so it is visible without scrolling at 200% zoom.

**Sighted users:**
- Preview your README in VS Code (`Ctrl+Shift+V`) or on GitHub after pushing -- the rendered view reveals formatting mistakes that are invisible in raw Markdown.
- Add a badge row near the top (build status, license, version) for a quick visual health check, but always include alt text for each badge.
- Use a table for structured information (like the "What belongs in a README" table in this section) -- tables render as clean grids on GitHub and are faster to scan than bullet lists for tabular data.

## Community Health Files

Community health files tell contributors how your project operates before they write a single line of code. GitHub recognizes these files and surfaces them in the repository's **Community Standards** page (under the **Insights** tab), so visitors can see at a glance which expectations are documented.

### CONTRIBUTING.md

This file answers the question every newcomer asks: "How do I help?" A good CONTRIBUTING.md covers:

- **How to report bugs** -- what information to include, which issue template to use
- **How to suggest features** -- whether to open a Discussion first or go straight to an Issue
- **Code style** -- formatting rules, linter settings, naming conventions
- **PR process** -- branch naming, commit message format, who reviews, how long to wait

Keep the tone welcoming. A sentence like "We are glad you are here" costs nothing and signals that newcomers are expected, not tolerated.

**Always read CONTRIBUTING.md before opening a PR.** Skipping it leads to rejected PRs and wasted effort on both sides. See [Chapter 6](06-working-with-pull-requests.md) for the full PR workflow.

### CODE_OF_CONDUCT.md

A code of conduct sets the social contract for your project. Without one, "acceptable behavior" is whatever each participant assumes it is -- and those assumptions vary widely.

Most projects adopt the [Contributor Covenant](https://www.contributor-covenant.org/), which covers:

- Expected behavior (be respectful, use welcoming language, accept constructive criticism)
- Unacceptable behavior (harassment, trolling, personal attacks)
- Enforcement -- who to contact and what happens after a report

When you see a CODE_OF_CONDUCT.md in a repository, it means the maintainers take community health seriously, there is a process for reporting violations, and you are both protected and expected to protect others.

### SECURITY.md

> **See also:** [Appendix F: Git Security](appendix-f-git-security.md) and [Appendix P: Security Features](appendix-p-security-features.md) for security best practices.

If someone discovers a vulnerability in your project, you do not want them to file a public issue. A SECURITY.md file tells reporters how to disclose responsibly:

- **Supported versions** -- which releases still receive security patches
- **How to report** -- a private email address or GitHub's private vulnerability reporting feature
- **What to expect** -- typical response time and disclosure timeline

Even small projects benefit from this file. It takes five minutes to write and prevents an accidental public disclosure that could affect your users.

### LICENSE

Without a license file, your code is "all rights reserved" by default -- meaning nobody can legally use, copy, or modify it, regardless of whether the repository is public. Adding a LICENSE file is a one-time step that makes your project genuinely open source.

You do not need to become a licensing expert. The [choosealicense.com](https://choosealicense.com/) site walks you through the most common options. For class projects, MIT or Apache 2.0 are typical choices.

### Finding these files on GitHub

Navigate to any repository and click **Insights** then **Community Standards**. GitHub shows a checklist of which community health files are present and links to add any that are missing. This is the fastest way to audit a project before you contribute.

> **Screen reader tip:** The Community Standards page is a simple checklist. Each item is a link -- if the file exists, the link text includes a checkmark. You can tab through the list to quickly confirm which files are in place.

### Learning Cards: Community Health Files

<details>
<summary>Screen reader users</summary>

- Navigate to any repo's Insights tab by pressing `D` to the repository navigation landmark, then `K` to find "Insights"; from there, find "Community Standards"
- On the Community Standards page, each file is announced as a list item with a checkmark status (present or missing); `Tab` through the list to audit quickly
- When creating a README, use heading levels (`#`, `##`, `###`) so screen readers can navigate sections with `H`; start with a single H1 for the project name

</details>

<details>
<summary>Low vision users</summary>

- The Community Standards checklist uses green checkmarks for present files and grey circles for missing ones; in high-contrast mode these use distinct system colors
- README files render below the file table on the repository's Code tab; zoom in on the rendered Markdown for the most comfortable reading experience
- When writing a README, keep paragraphs short (3-4 sentences) and use bullet lists so the content is scannable at high magnification

</details>

<details>
<summary>Sighted users</summary>

- Navigate to Insights tab, then Community Standards to see a checklist of recommended files (README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, etc.)
- Each missing file has an "Add" link next to it that opens a pre-filled template editor on GitHub
- The README renders as formatted Markdown below the file table on the main Code tab; it is the first thing visitors see when they land on your repository

</details>

## When to Use Different Communication Channels

| Channel | Use For |
| ---------  | ---------  |
| **Issue** | Bug reports, feature requests, questions about a specific problem |
| **PR comment** | Feedback on a specific code change |
| **PR review** | Formal verdict (approve/request changes) with consolidated feedback |
| **Discussion** | Open-ended conversation, proposals, community Q&A |
| **Email / direct** | Sensitive matters (security vulnerabilities, Code of Conduct reports) |

**GitHub Discussions are separate from Issues.** Use Discussions for: "What do people think about X approach?" and Issues for: "The X button is broken."

## Quick Reference: Phrases That Work

| Instead of... | Try... |
| ---------------  | --------  |
| "This is wrong." | "This looks like it might cause X - is that intended?" |
| "Everyone knows you should..." | "A common pattern for this is..." |
| "This is terrible." | "I think this approach has some drawbacks - here's what I'm seeing." |
| "Fix this." | "What do you think about changing this to X?" |
| "Obviously..." | *(just omit the word "obviously")* |
| "This is a major issue." | "This is a blocker for users who rely on keyboard navigation." |
| "Can't you just..." | "One approach that might work is..." |
| "No." | "I don't think this approach is right for this project because..." |

## Try It: Rewrite One Comment

**Time:** 2 minutes | **What you need:** Just your brain

Read this code review comment and rewrite it to be constructive:

> **Original:** "This alt text is bad. Fix it."

Use the five-step feedback anatomy from this chapter:

1. **What** you noticed
2. **Why** it matters
3. **What** you suggest
4. **Why** the suggestion helps
5. **Encouragement**

Here's one way:

> **Rewritten:** "The alt text on this image says 'image1.png' - screen reader users will hear the filename instead of what's in the image. Could you describe what the screenshot shows, like 'Settings page with the Accessibility section expanded'? That way everyone gets the same information. Nice catch adding the image though - it really helps illustrate the step!"

Notice: same feedback, completely different experience for the person receiving it.

> **What success feels like:** You turned a two-word dismissal into help that someone would actually want to receive. That's the difference between a comment that fixes code and a comment that also keeps a contributor coming back.

> ### Day 2 Amplifier - Accessibility Agents Outputs Are Your Responsibility
>
> **Every communication principle in this guide applies with extra force when agents are involved.** When `@pr-review` generates review comments, *you* are responsible for their tone before you post them. When `@issue-tracker` drafts a triage reply, *your* name appears on it in the repository's public history. The agent writes - the contributor publishes.
>
> As you work with agents on Day 2, use this guide as your editing checklist:
>
> - **In VS Code** - Review every agent-generated comment against the "anatomy of helpful feedback" section before posting; use the "phrases that work" table to refine anything that reads as automated, generic, or cold
> - **In your repo** - Accessibility Agents outputs are first drafts, not final words; the community you contribute to experiences your judgment, not the agent's draft
> - **In the cloud** - GitHub Agentic Workflow comments must be designed with the same care as human comments: clear purpose, respectful language, and a transparent signal that automation posted them
>
> *A community's culture is shaped by every message posted in its name - including the ones an agent wrote for you.*

*Next: [Labels, Milestones, and Projects](09-labels-milestones-projects.md)*
*Back: [Merge Conflicts](07-merge-conflicts.md)*
*Related: [Working with Issues](05-working-with-issues.md) | [Working with Pull Requests](06-working-with-pull-requests.md)*

---

## Contributing to Open Source

> *This section was previously Appendix T. It is now part of the teaching narrative.*

>
> **Listen to Episode 37:** [Contributing to Open Source](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## A Guide for First-Time Contributors

> You do not need to be a professional developer to contribute to open source. Documentation, accessibility improvements, and bug reports are among the most valuable contributions any project can receive.

## Table of Contents

1. [What Is Open Source?](#1-what-is-open-source)
2. [Who Can Contribute?](#2-who-can-contribute)
3. [What Makes a Good First Contribution?](#3-what-makes-a-good-first-contribution)
4. [Finding Something to Work On](#4-finding-something-to-work-on)
5. [Reading an Issue Before You Start](#5-reading-an-issue-before-you-start)
6. [Making Your Contribution](#6-making-your-contribution)
7. [Getting Help](#7-getting-help)
8. [After Your Contribution Is Merged](#8-after-your-contribution-is-merged)
9. [Building a Contribution Habit](#9-building-a-contribution-habit)

## 1. What Is Open Source?

Open source software is software whose source code is publicly available. Anyone can read it, use it, and - in most cases - contribute to it. Contributions can include:

- Fixing bugs in the software
- Writing or improving documentation
- Filing bug reports that help maintainers understand problems
- Reviewing other people's changes and leaving thoughtful feedback
- Translating content into other languages
- Improving accessibility - adding alt text, fixing heading structure, testing with screen readers

The projects that power much of today's web infrastructure - operating systems, programming languages, screen readers, and developer tools - are maintained by contributors who started exactly where you are now.

## 2. Who Can Contribute?

Contributors come from all backgrounds, skill levels, and countries. A first contribution could be fixing a typo, adding a missing full stop, or filing a bug report that saves a maintainer hours of debugging.

Assistive technology users bring a perspective that most sighted, mouse-first developers cannot - you notice when heading structure is broken, when a button has no accessible name, or when a form cannot be completed with a keyboard. These are real, high-value contributions that improve projects for everyone.

You do not need permission to start. If a repository's issues are public, you can file a bug or suggest an improvement today.

## 3. What Makes a Good First Contribution?

A good first contribution is:

- **Specific** - it addresses one problem clearly, not a general "this could be better"
- **Scoped** - it does not try to fix everything at once; one PR, one problem
- **Described** - the PR or issue explains what changed and why, not just what
- **Tested** - for documentation, this means reading it aloud with your screen reader before submitting; for code, it means verifying the fix works

### Signs a contribution is too large for a first attempt

- The PR touches more than three or four files
- You need to understand the entire codebase to make the change
- The issue has been open for a long time with many comments suggesting it is complex

Start small. A well-executed small contribution is far more valuable than a large contribution that cannot be merged because it is out of scope.

## 4. Finding Something to Work On

Most open source projects label issues that are suitable for new contributors. Look for:

| Label | Meaning |
| -------  | ---------  |
| `good first issue` | Explicitly recommended for first-time contributors |
| `first-timers-only` | Reserved for people making their first contribution to this project |
| `help wanted` | Maintainers are actively looking for someone to pick this up |
| `beginner` or `easy` | Lower complexity than average |
| `documentation` | No coding required - writing or editing docs |
| `accessibility` | Directly relevant to AT users; high-value work |

**How to search:** On any GitHub repository, go to Issues → filter by label. Or use GitHub's global search: `label:"good first issue" is:open language:markdown` to find documentation issues across all public repositories.

### Learning Cards: Finding Something to Work On

**Screen reader users:**
- On a repository's Issues page, use the landmark shortcut (`D` in NVDA browse mode) to jump to the filter region, then type a label name like `good first issue` in the Label filter field and press `Enter` to narrow results.
- GitHub's global search (`label:"good first issue" is:open language:markdown`) returns a results list navigable by heading level -- each issue title is a link, so press `K` (next link) or `Tab` to step through them efficiently.
- Before claiming an issue, press `End` to jump to the bottom of the issue page and listen for recent comments -- if someone already said "I'll take this," move on to the next one.

**Low-vision users:**
- GitHub color-codes labels, but do not rely on color alone -- hover over a label to see its text name in a tooltip, or use the Label dropdown which lists label names as text.
- Zoom to 150-200% when scanning the Issues list; the issue title, label pills, and comment count remain in a single row up to about 250% zoom before wrapping.
- Use the Sort dropdown ("Newest," "Recently updated") to push stale issues down the list so you focus on actively maintained work first.

**Sighted users:**
- Skim the colored label pills on the Issues list for `good first issue` (typically green) or `help wanted` (typically yellow) -- these stand out visually in a long list.
- Check the comment count and last-updated date on the right side of each issue row; a high comment count on a `first-timers-only` issue often means someone is already working on it.
- Use GitHub's global search bar with `label:"good first issue" is:open` and add `language:` or `topic:` filters to match your interests across all public repositories.

## 5. Reading an Issue Before You Start

Before commenting "I'll take this" on an issue, ask yourself:

- **Is the description clear enough to act on?** If you are not sure what the problem is, ask a clarifying question before starting work.
- **Is anyone else already working on it?** Look for recent comments from others saying they are working on it, or an open PR that references this issue. If a PR exists, it may already be in review.
- **Is the issue in scope for me?** A documentation task does not require programming knowledge. A bug fix in compiled code may require understanding the codebase.
- **How old is the issue?** Very old issues (2+ years) may be stale or no longer relevant. You can ask the maintainer if it is still valid before investing time.

If the issue looks right for you, comment briefly to let the team know you are working on it: "I'd like to work on this. I'll open a draft PR shortly." This prevents duplicate work.

## 6. Making Your Contribution

### Tool Cards: Fork, Clone, and Contribute

**github.com (browser):**
1. Click **Fork** on the repository page, then **Create fork**.
2. Edit files directly in your fork's web interface.
3. Click **Contribute > Open pull request** to submit back to the original.

**github.dev (web editor):**
1. Fork the repo on github.com first.
2. Navigate to your fork and press `.` to open in the web editor.
3. Edit, commit, and create a PR from the Source Control panel.

**VS Code Desktop:**
1. Fork on github.com, then clone your fork: `Ctrl+Shift+P` > **Git: Clone**.
2. Create a branch, make edits, commit and push.
3. Use **GitHub Pull Requests: Create Pull Request** to submit.

**GitHub Desktop:**
1. **File > Clone Repository**, select your fork.
2. Create a branch via **Branch > New Branch**, make edits.
3. Push and click **Create Pull Request** (opens browser).

**Git CLI / GitHub CLI:**
```bash
gh repo fork owner/repo --clone
cd repo
git checkout -b fix/my-change
# edit files
git add . && git commit -m "fix: description"
git push -u origin fix/my-change
gh pr create
```

### The Basic Workflow

1. **Fork the repository** - creates your own copy on GitHub
2. **Clone your fork** to your computer (or open a Codespace - see [Appendix N](appendix-j-cloud-editors.md))
3. **Create a branch** - name it something descriptive: `fix/broken-link-setup-guide`
4. **Make your change** - edit the file, save, verify
5. **Commit with a clear message** - "Fix broken link in setup-guide.md line 34"
6. **Push to your fork**
7. **Open a pull request** from your branch to the original repository's default branch
8. **Respond to review feedback** - maintainers may ask for changes; this is normal and not a rejection

### Writing a Good PR Description

A PR description should answer:

- **What** did you change?
- **Why** was the change needed?
- **How** did you verify it works?

Example:
> Fixed a broken link on line 34 of `setup-guide.md`. The link pointed to `/docs/old-setup` which no longer exists. Updated it to `/docs/00-pre-workshop-setup.md`, verified the target file exists and the anchor is correct.

This gives the reviewer everything they need to approve quickly.

## 7. Getting Help

It is always acceptable to ask a question on an issue or pull request. Good questions:

- **Are specific:** "I'm trying to fix the broken link on line 24 of `setup-guide.md`. The link currently points to `/docs/old-setup`. Where should it point?"
- **Show what you tried:** "I searched the repository for the correct URL but couldn't find a file at that path."
- **Are polite:** Assume good intent from maintainers, even if they are slow to respond. Maintainers are often volunteers with day jobs.

If you opened a PR and are waiting for a review, it is appropriate to leave one polite follow-up comment after a week or two. Start with: "Hi, just checking in on this PR when you have a moment."

## 8. After Your Contribution Is Merged

When your pull request is merged:

- Your name appears in the project's **commit history permanently** - it cannot be removed
- The issue you fixed is closed
- You are officially listed as a **contributor** to this project, visible on the repository's Contributors page

This matters for your GitHub profile. Each merged contribution demonstrates real-world collaboration with a project team: you scoped a problem, communicated with maintainers, addressed feedback, and saw the work through. That record is visible to anyone who views your profile.

Over time, a series of contributions builds a portfolio that shows how you work - not just what you can do in isolation.

## 9. Building a Contribution Habit

The hardest part of open source contribution is starting. Once you have one merged PR, the next is easier - you know the workflow, you have proof it is possible, and you have already navigated the social dynamics of working with a maintainer.

### Practical habits

- **Keep a list** of projects you use and like. These are natural candidates for contributions because you already understand what they do.
- **File bug reports** when you encounter problems, even if you cannot fix them yourself. A clear, reproducible bug report is a real contribution.
- **Review other PRs.** Even as a new contributor, you can leave useful feedback: "Does this change affect screen reader users?" or "The example in the PR description is missing a step."
- **Set a low bar.** A contribution does not need to be impressive. A fixed typo merged into a project used by thousands of people is more valuable than a perfect contribution never submitted.

> **Challenge Time:** Complete **Challenge 8: The Culture Layer** in the [Challenge Hub](CHALLENGES.md), then advance to [Chapter 09: Labels, Milestones and Projects](09-labels-milestones-projects.md).

---

*Next: [Chapter 09: Labels, Milestones, and Projects](09-labels-milestones-projects.md)*  
*Back: [Chapter 07: Merge Conflicts](07-merge-conflicts.md)*  
*Related appendices: [Appendix M: Accessibility Standards](appendix-m-accessibility-standards.md) | [Appendix F: Git Security](appendix-f-git-security.md) | [Appendix O: Branch Protection](appendix-o-branch-protection.md)*

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

- **How to Be an Effective and Respectful Open Source Contributor:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Workshop Recommendation (Chapter 8):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **GitHub Flow - The Standard Contribution Workflow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Keeping Your Fork Up to Date:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **When to sync:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Writing Good Commit Messages:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The Nature of Open Source Communication:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The Anatomy of Helpful Feedback:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Language and Tone:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Commenting Etiquette:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Code Review Etiquette - For Reviewers:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Code Review Etiquette - For Authors:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Inclusive Commenting for Accessibility Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The "Good First Issue" Social Contract:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Handling Difficult Situations:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Writing Your First README:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
