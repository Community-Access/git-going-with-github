# Working with Pull Requests
>
> **Listen to Episode 6:** [Working with Pull Requests](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix C: Markdown Reference](appendix-c-markdown-reference.md) | [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)
> **Authoritative sources:** [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) | [GitHub Accessibility Guide: Pull Requests](https://accessibility.github.com/documentation/guide/pull-requests/)

## Creating, Reviewing, and Merging Pull Requests with a Screen Reader

> **See also:** [Chapter 15: Code Review](15-code-review.md) covers the full review workflow including multi-file diffs and suggested changes.

> Pull requests are where your work becomes a contribution. This guide takes you through the full pull request workflow - from opening one to participating in review - using only your keyboard and screen reader.
>
> **Official GitHub Accessibility Guide:** GitHub publishes an NVDA-focused guide for working with pull requests using a screen reader at [Using GitHub Pull Requests with a Screen Reader](https://accessibility.github.com/documentation/guide/pull-requests/). This chapter covers the same material with additional perspectives (VoiceOver, low vision, CLI) and workshop-specific challenges. Use the official guide as a companion reference.
>
> **Screen reader note - New Files Changed Experience:** This guide uses GitHub's improved Files Changed experience, which adds proper ARIA landmark structure to the Files Changed tab, including the file tree and diff navigation. This feature may already be active for your account - it has been broadly rolled out and may no longer appear as a Feature Preview toggle at all.
>
> **To verify:** Activate the **User Menu** button (top-right of any GitHub page) → activate **"Feature preview"** → scan the list for **"New Files Changed Experience"**:
>
> - If listed and the toggle announces **"Pressed"** (or **"Disable"**) - already enabled, no action needed
> - If listed but **not Pressed** (or **"Enable"**) - activate the toggle to enable it
> - If not listed at all - the feature has graduated to the standard interface; it is active automatically
>
> Full step-by-step instructions with per-screen-reader commands are in [Pre-Workshop Setup, Step 4](00-pre-workshop-setup.md#step-4---check-github-feature-preview-settings).
>
> **Browse vs Focus Mode (NVDA):** Use **Browse Mode** (the default) for reading PR conversations, navigating headings, and reviewing diffs. Switch to **Focus Mode** (`NVDA+Space`) only when you need to type in comment boxes or search fields. Switch back to Browse Mode to resume navigation. Maximize your browser window for consistent landmark layout.

## Workshop Recommendation (Chapter 6)

Chapter 6 is the first **PR-validated chapter** where students convert issue work into merge-ready contributions.

- **Challenge count:** 3
- **Time per challenge:** under 10 minutes each
- **Evidence:** PR metadata, bot checks, and merged issue linkage
- **Pattern:** small change -> linked PR -> green checks

### Chapter 6 Challenge Set

1. **Create one small branch change** - edit a practice file on a new branch.
2. **Open a linked PR** - use the PR template and include `Closes #XX`.
3. **Pass required checks** - respond to bot feedback until all required checks pass.

> **Branch guidance for Chapter 6:** This is the first chapter where you edit files and create branches. Use one of these two paths:
>
> - **Web editor (recommended for beginners):** When you edit a file on GitHub.com and click "Propose changes," GitHub creates a branch for you automatically. Name it `fix/yourname-issueXX` (for example, `fix/maria-issue42`).
> - **Local Git (if you cloned in Block 0):** Create a feature branch with `git checkout -b fix/yourname-issueXX` from `main`. See the "Local Git Alternative" section below for the full command sequence.
>
> **Do not reuse your `learn/<username>` branch for this short exercise unless your facilitator tells you to.** Chapter 6 works best with a short-lived feature branch such as `fix/yourname-issueXX`, because it teaches the pull request loop without mixing multiple challenges on one branch.

### Challenge 6.1 Step-by-Step: Create One Small Branch Change

**Goal:** Edit one of the practice files and save your change on a new branch.

**Where you are working:** your Learning Room repository on GitHub.com, using the web editor.

**Before you start:** Open your **assigned Chapter 6.1 challenge issue** (the one titled "Chapter 6.1: Create One Small Branch Change (@yourname)"). The issue description tells you which file to edit and what to fix.

The Learning Room has three practice files with intentional problems. Your assigned issue points you to one of them:

The following table summarizes the practice files in the learning-room, what each file contains, and the type of issues to look for.

| File | What it contains | What to fix |
|------|-----------------|-------------|
| `docs/welcome.md` | Introduction to open source contribution | Three `[TODO]` sections where content is missing |
| `docs/keyboard-shortcuts.md` | Screen reader shortcut reference tables | Intentional errors in shortcut references |
| `docs/setup-guide.md` | Getting-started instructions | Broken links and incomplete steps |

**Steps using the web editor:**

1. In your Learning Room repository, navigate to the file specified in your issue. Use the file tree or the "Go to file" button (`T` keyboard shortcut).
2. Open the file and activate the **pencil icon** (Edit this file) button.
   - Screen reader users (NVDA/JAWS): Press `B` to navigate buttons, find "Edit this file," and press `Enter`.
   - VoiceOver users: Press `VO+U`, open Buttons rotor, find "Edit this file," and press `VO+Space`.
3. The file opens in the web editor. Make your change. For example:
   - If your issue is about a `[TODO]` section: replace the `[TODO]` placeholder with the requested content (one to three sentences).
   - If your issue is about a broken link: find and correct the URL.
   - If your issue is about a shortcut error: find and fix the incorrect value in the table.
4. Keep your change small and focused. Edit only what the issue asks for.

**Proposing your changes (this creates your branch):**

5. After editing, activate the **Commit changes** button (green button above the editor).
6. A dialog appears. In the **Branch name** field, type: `fix/yourname-issueXX` (replace `yourname` with your GitHub username, and `XX` with the issue number).
7. Select **Create a new branch for this commit and start a pull request**.
8. Activate **Propose changes**.

**You are done when:** GitHub shows the "Open a pull request" page. Your file change is saved on a new branch. Continue to Challenge 6.2.

### Challenge 6.2 Step-by-Step: Open a Linked PR

**Goal:** Open a pull request

> **Agentic strategy:** AI agents do not just deploy code directly; they submit pull requests. Learning to edit a file, format it in Markdown, and review a PR today prepares you to audit and approve AI-generated changes tomorrow. Make your Markdown clean and structured, and include the `Closes #XX` line that links to your challenge issue so it closes automatically on merge.

**Where you are working:** the "Open a pull request" page that appeared after Challenge 6.1 (or navigate to Pull Requests tab and select "Compare and pull request").

1. In the **Title** field, write a short description of your change. Examples:
   - "Complete the Who Can Contribute section in welcome.md"
   - "Fix broken accessibility settings link in setup-guide.md"
   - "Correct NVDA modifier key in keyboard-shortcuts.md"
2. In the **Body** field, use the PR template if one is provided. Make sure to include:
   - A summary of what you changed and why (at least 50 characters).
   - The line `Closes #XX` where `XX` is the number of your **assigned Chapter 6 challenge issue**.
3. Verify the **base branch** is `main` and the **compare branch** is your `fix/yourname-issueXX` branch.
4. Activate the **Create pull request** button.

**You are done when:** Your PR appears in the Pull Requests list. The bot will begin running checks within about 30 seconds. Continue to Challenge 6.3.

### Challenge 6.3 Step-by-Step: Pass Required Checks

**Goal:** Read bot feedback, fix any issues it finds, and get all required checks to pass.

**Where you are working:** the Conversation tab of your open pull request.

1. Wait approximately 30 seconds after opening the PR. The bot posts a validation comment.
2. Read the bot comment carefully. It checks:
   - That your PR references an issue with `Closes #XX`.
   - That your PR description is detailed enough (50+ characters).
   - That your changed files are in the `learning-room/` folder.
   - Accessibility checks: heading hierarchy, descriptive link text, valid alt text.
3. If the bot reports failures:
   - Open the changed file from the **Files changed** tab.
   - Activate the pencil icon to edit the file again (directly on your branch).
   - Fix the issue the bot identified.
   - Commit the fix to the **same branch** (the bot re-runs automatically on each push).
4. Repeat step 3 until all required checks show a green checkmark.
5. When all checks pass, request a review from a peer or the facilitator.

**You are done when:** The bot comment shows all required checks passed (green checkmarks). Your PR is ready for human review and merge.

### Expected Outcomes

- Student opens a focused PR that maps to one issue.
- Student uses `Closes #XX` correctly.
- Student can interpret bot feedback and improve the PR.

### If You Get Stuck

1. Confirm your PR includes `Closes #XX` in title or body.
2. Check that changed files are only in `learning-room/`.
3. Open the bot validation comment and resolve one required check at a time.
4. If checks still fail, ask for peer or facilitator review with the exact error message.
5. Finished but not sure you did it right? Compare your work against the [Challenge 6 reference solution](solutions/solution-06-first-pr.md).

### Learning Moment

A great PR is small, linked to an issue, and easy to review. Faster feedback builds confidence and momentum.

### Why this feels achievable

- Scope is intentionally small.
- Feedback is immediate and specific.
- Success is visible (green checks + closed issue).

### About Learning Cards in This Chapter

This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. Not every card appears at every step. Open the ones that match how you work.

The following table describes the six learning card types used in this chapter.

| Card | Who it helps | What it covers |
| --- | --- | --- |
| Visual / mouse | Sighted users navigating with a mouse or trackpad | Click targets, visual cues, layout orientation |
| Low vision | Users with magnification, zoom, or high-contrast themes | Zoom-friendly navigation, finding controls at high magnification, high contrast visibility |
| NVDA / JAWS (Windows) | Screen reader users on Windows | Keystroke sequences, Focus and Browse mode, landmark paths |
| VoiceOver (macOS) | Screen reader users on macOS | VO key sequences, rotor usage, interaction model |
| GitHub.com web | All users working in the browser | Browser-based workflows without local tools |
| CLI (git / gh) | Terminal users on any platform | Git and GitHub CLI commands for PR management |

## Local Git Alternative: The Full Branch-Edit-PR Workflow

<details>
<summary>If you cloned the learning-room in Block 0 and prefer working locally</summary>

The web editor workflow (pencil button, "Propose changes") is the primary path taught in this chapter. If you cloned the Learning Room in Block 0 and are comfortable in a terminal, here is the local equivalent. This is the same workflow covered in depth in [Chapter 11: Git and Source Control](14-git-in-practice.md).

**Step 1 - Sync and create a feature branch:**

```bash
cd ~/Documents/learning-room
git checkout main
git pull origin main
git checkout -b fix/welcome-todos
```

**Step 2 - Edit the file in your editor:**

Open the file in VS Code or your preferred editor:

```bash
code docs/welcome.md
```

Make your changes and save the file.

**Step 3 - Stage, commit, and push:**

```bash
git add docs/welcome.md
git commit -m "Complete TODO sections in welcome.md"
git push -u origin fix/welcome-todos
```

**Step 4 - Open a pull request:**

```bash
gh pr create --title "Complete TODO sections in welcome.md" \
  --body "Closes #42" --base main
```

Or open interactively:

```bash
gh pr create
```

The GitHub CLI walks you through title, body, base branch, and reviewers.

**What happens next is identical:** the Learning Room bot validates your PR, posts feedback, and you request a human reviewer - the same as the web workflow.

> **Tip:** You can also create a named feature branch with `git checkout -b fix/yourname-issueXX` if you prefer that naming convention over the practice branch.

</details>

## What Is a Pull Request?

A pull request (PR) is a proposal to merge changes from one branch into another. When you have:

- Edited a file directly on GitHub (web editor)
- Made changes in your fork
- Made changes on a feature branch

...you open a PR to request that those changes be merged into the target branch (usually `main`).

A PR shows:

- **What** changed - a diff of every file
- **Why** it changed - your PR description
- **Conversation** - comments, reviews, and discussion
- **Status** - automated checks (CI/CD) and review status

> **Learning Room connection:** In the Learning Room repository, every hands-on contribution follows this pattern. For example, when you complete Challenge 3 (filling the `[TODO]` sections in `docs/welcome.md`), you open a PR that shows your added content as green `+` lines in the diff, your description explains which TODOs you completed and why, and the validation bot posts automated check results. The scenarios in this chapter use Learning Room files so you can follow along with real content.

## Navigating to Pull Requests

> **Global pull requests dashboard:** GitHub now shows a global pull requests page at [github.com/pulls](https://github.com/pulls) listing all open PRs across every repository you have access to. This is now the **default landing page** when you click "Pull requests" in the top navigation bar (the one above the repository content, not inside a repository). You can opt out in your GitHub settings if you prefer the old behavior. Screen reader path: top navigation region > "Pull requests" link > Enter (or navigate to github.com/pulls directly).

<details>
<summary>Visual / mouse users</summary>

Click the **Pull requests** tab in the repository navigation bar. The tab shows the count of open PRs. Click any PR title to open it.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The **Pull requests** tab is in the repository navigation bar near the top of the page. At 200% browser zoom or higher, the tab bar may wrap to a second line. The tab text includes the open PR count in parentheses.

- In **Windows High Contrast** mode, the active tab is indicated by a system-colored underline, not just a color change.
- At high magnification, use `Tab` to move through the repository navigation links if the tab bar is hard to target with a pointer.
- Once in the PR list, PR titles are links with standard hover underlines. They remain clickable at any zoom level.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. `D` → "Repository navigation" landmark
2. `K` to navigate tabs → "Pull requests, [N] open"
3. `Enter` to open

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` → Landmarks → navigate to "Repository navigation"
2. Quick Nav `K` or `VO+Right` to navigate tabs → "Pull requests"
3. `VO+Space` to open

</details>

### From a PR notification

If you received a notification about a PR, follow the notification link directly to the PR page.

<details>
<summary>GitHub CLI (gh) alternative</summary>

List and view pull requests from your terminal:

```bash
# List open PRs
gh pr list

# Filter by review status
gh pr list --search "review-requested:@me"

# View a specific PR in the terminal
gh pr view 42

# Open a PR in your browser
gh pr view 42 --web
```

**Setup:** Install the GitHub CLI from [cli.github.com](https://cli.github.com) and authenticate with `gh auth login`. See [Appendix D](appendix-d-git-authentication.md) for details.

</details>

### Learning Cards: Navigating to Pull Requests

**Screen reader users:**
- Press `D` to jump to the "Repository navigation" landmark, then `K` to reach the "Pull requests" tab link -- this is faster than arrowing through the entire page
- The tab link announces the open PR count ("Pull requests, 7 open"), giving you a quick triage number without opening the list
- From any GitHub page, press `G` then `P` (two sequential key presses in Focus Mode) to jump directly to the repository's Pull Requests tab

**Low-vision users:**
- The Pull requests tab is in the repository navigation bar near the page top; at 200%+ zoom the tab bar may wrap to a second line, but each tab remains a distinct clickable link
- The open PR count appears in parentheses next to the tab text; zoom into the tab area to read it without opening the list
- Use `Tab` key navigation to step through the repository nav links if pointer targeting is difficult at high magnification

**Sighted users:**
- Click the **Pull requests** tab in the horizontal navigation bar below the repository name; the badge shows the number of open PRs
- Bookmark the URL pattern `github.com/OWNER/REPO/pulls` to skip navigation entirely
- The active tab is underlined; open PRs are the default view -- use the "Closed" filter link to toggle

## The Pull Request List Page

The PR list works identically to the Issues list:

- `3` to navigate PR titles (they are h3 headings)
- `I` to navigate list items
- `F` or `E` / `Shift+E` to reach the search/filter field
- Filters work the same as Issues: `is:open`, `author:@me`, `review-requested:@me`, etc.

> **Screen reader note - PR list semantics:** The PR list does **not** have individual ARIA item containers with per-item semantics. To read a PR's full detail (title, author, labels, status), you must navigate sequentially with `Tab` or arrow keys through the elements for each item. Starting from a PR title link, `Tab` forward to find the author, labels, and review status for that same PR before moving to the next title.
>
> **Hovercards:** Hovercards appear when you hover over usernames and links in the PR list, adding extra verbosity. To reduce this noise: go to your GitHub Profile → Accessibility settings → disable "Show link previews" and similar hover triggers. This makes sequential navigation significantly less cluttered.

## Anatomy of a Pull Request Page

A PR page has three main tabs:

```text
[PR title - h1]
[State badge: Open / Merged / Closed / Draft]
[Author, base ← compare, timestamp]

[ Conversation ] [ Commits ] [ Files changed ]
                                ↑ tab bar landmark

─── Conversation Tab ────────────────────────────────────────
[PR description - authored by opener]
[Status checks summary]
[Activity / review thread]
  [Review comment - h3]
  [Line comments - nested]
[Merge controls (for maintainers)]
[Comment box]

─── Commits Tab ─────────────────────────────────────────────
[List of commits, grouped by date - h3 for dates]
[Each commit as a list item with SHA, message, author]

─── Files Changed Tab ────────────────────────────────────────
[File filter search]
[File tree (left panel)]
[Diff for each file - each file is a heading]
[Line-level comment threads within diffs]
```

## Navigating the PR Tab Bar

The Conversation, Commits, and Files changed tabs are in a “Pull request navigation tabs” landmark.

<details>
<summary>Visual / mouse users</summary>

The three tabs - **Conversation**, **Commits**, and **Files changed** - appear just below the PR title. Click the tab you want. The active tab is underlined. The count on **Files changed** shows how many files were modified.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The PR tab bar sits just below the PR title and state badge. At high zoom levels:

- The three tabs (**Conversation**, **Commits**, **Files changed**) may stack or wrap. Each tab remains a distinct clickable link.
- The active tab is distinguished by an underline. In Windows High Contrast mode, the underline uses a system accent color for visibility.
- The **Files changed** tab includes a count (for example, "Files changed 3"). This count is part of the link text, not a separate element.
- If the tabs are hard to click at high magnification, use `Tab` key navigation from the PR title area to reach each tab link sequentially.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. Press `D` → navigate to “Pull request navigation tabs”
2. Press `←` or `→` arrow keys to move between tab options
3. Press `Enter` to activate a tab

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `VO+U` → Landmarks → “Pull request navigation tabs”
2. `VO+Right` to move between tabs
3. `VO+Space` to activate

</details>

Each tab link reads with its name and the count: "Files changed, 3 files changed."

## Reading the Conversation Tab

### PR Description

1. `2` → navigate to "Description" h2 heading
2. `↓` to read the description
3. Markdown renders as semantic HTML - headings, lists, code blocks are fully accessible

### Status Checks Section

Below the description, the status checks summary shows whether automated tests passed. Look for:

- “All checks have passed” / “Some checks failed” / “Checks pending”
- A “Show all checks” button or link

<details>
<summary>Visual / mouse users</summary>

Status checks appear as a coloured banner below the PR description - green tick for passed, red X for failed, yellow spinner for running. Click **Show all checks** to expand the full list. Click a check name to go to its run log.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Press `H` or `2` to find the "Checks" or "Status checks" heading
2. Press `K` to navigate links for individual check names
3. Press `Enter` on a check to see its details

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Quick Nav `H` or `VO+Cmd+H` to jump to the "Checks" or "Status checks" heading
2. Quick Nav `K` to navigate check name links
3. `VO+Space` on a check to see its details

</details>

See [GitHub Actions & Workflows](appendix-q-actions-workflows.md) for full guidance on reading status checks.

### Review Comments

Each review comment thread is an h3. Navigate with `3`:

- Hear the reviewer's username, timestamp, and their review verdict ("approved" or "requested changes")
- Then the body of their review comment
- Then any replies to that comment

To reply to a review comment:

```text
Step 1: Navigate to the comment (3)
Step 2: Tab to "Reply…" link/button
Step 3: The reply text area appears - Focus Mode → type your reply
Step 4: Ctrl+Enter to submit
```

#### Resolving conversations

When a review comment has been addressed, you can mark the conversation as resolved:

1. Navigate to the conversation thread (`3` to jump between comment headings)
2. `Tab` to the end of the thread to find the **"Resolve conversation"** button
3. Press `Enter` to mark it resolved
4. The conversation collapses and shows as "Resolved"

Resolved conversations are still accessible - they collapse but can be expanded again. This helps both reviewers and authors track which feedback items have been addressed.

### Learning Cards: Reading the Conversation Tab

<details>
<summary>Screen reader users</summary>

- Press `2` to jump between H2 headings: "Description" (the PR body) and "Activity" (the comment thread)
- Press `3` to jump between individual review comments (each is an H3); each announces the reviewer's username, timestamp, and verdict
- Press `D` to jump to the "Add a comment" landmark at the bottom to skip directly to the reply box

</details>

<details>
<summary>Low vision users</summary>

- Status checks below the description show green checkmarks (passed), red X marks (failed), or yellow spinners (running); zoom in on this area after opening a PR
- Review comments have a colored left border: green for "Approved," red for "Request changes," grey for "Comment"
- The merge button section at the bottom turns green when all checks pass; it is disabled (greyed out) when checks are pending or reviews are missing

</details>

<details>
<summary>Sighted users</summary>

- The Conversation tab has a timeline layout: PR description at the top, status checks below, then comments and events in chronological order
- Review verdicts appear as banners in the timeline: a green banner for Approve, a red banner for Request Changes
- The merge section at the bottom shows which requirements are met (green checkmarks) and which are pending (yellow dots)

</details>

## Reading the Commits Tab

```text
Step 1: Navigate to Commits tab (D → PR tabs → Enter)
Step 2: 3 to navigate date group headings ("Commits on April 20")
Step 3: I to navigate individual commits within a date group
Step 4: Each commit: SHA link, message, author, [Verified] badge if signed
Step 5: Enter on a commit to open its diff
```

## Reading the Checks Tab

The Checks tab shows the status of automated tests, CI workflows, and other verification processes running on your PR. It helps you verify whether your changes pass all required tests before merging.

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the **"Pull request tabs"** landmark (`D`)
2. Navigate between tab links (`K` or `Tab`) and activate "Checks"
3. Press `D` to jump to the **"check suites"** section - this moves focus to the collapsed details button of the first check
4. Press `B` or `Tab` to navigate between check buttons; each button is labeled with the check's name
5. Press `Enter` or `Space` to expand a check and reveal its logs:
   - Navigate through the check steps with `K` or `Tab`
   - Activate a step for more details
6. For a summary view: press `D` to navigate to the **"check run summary"** section

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` -> Landmarks -> "Pull request tabs" -> activate "Checks"
2. `VO+U` -> Landmarks -> navigate to "check suites" section
3. `VO+Right` to move through check buttons, `VO+Space` to expand
4. For summary: `VO+U` -> Landmarks -> "check run summary"

</details>

### Learning Cards: Reading the Checks Tab

**Screen reader users:**
- Each check button is labeled with the check's name and its pass/fail state; listen for "success" or "failure" in the ARIA label before expanding the details
- Press `D` to jump between the "check suites" and "check run summary" landmarks to get a high-level pass/fail overview without expanding every check
- If a check fails, expand it and press `K` to navigate step links inside the log -- the failing step is usually labeled with a red X icon described in the accessible name

**Low-vision users:**
- Passed checks show a green checkmark icon; failed checks show a red X icon; pending checks show a yellow dot -- in Windows High Contrast mode these map to system success/error/warning colors
- At high zoom, each check row may wrap; the icon and check name stay on the first line, while the duration and "Details" link may appear on a second line
- Click the "Details" link next to a failed check to jump to the CI log; failed steps are highlighted with a red background that remains visible in high-contrast themes

**Sighted users:**
- Scan the Checks tab for a row of green checkmarks (all passed) or spot a red X (failed); the summary banner at the top reads "All checks have passed" or "Some checks were not successful"
- Click any check name to expand its step log inline; failed steps are bolded and marked with a red X so you can skip passing steps quickly
- The "Re-run" button (circular arrow) appears next to each check for maintainers; use it to retry a flaky check without pushing a new commit

## Reading the Files Changed Tab

This is the core of a code review. You will read diffs - the before/after state of every file that changed.

> **Note:** This guide uses GitHub's improved Files Changed experience. If your Files Changed tab doesn't match these steps, refer to the screen reader verification steps in the prerequisite callout at the top of this chapter - the feature may need to be enabled in Feature Preview, or it may already be active for your account with no action required.

### File Tree (left panel)

The file tree lists every changed file. Use it to jump directly to a specific file’s diff.

<details>
<summary>Visual / mouse users</summary>

The file tree panel is on the left side of the Files Changed tab. It lists every modified file. Click a filename to scroll the diff view to that file. You can collapse or expand folders by clicking the arrow. Type in the filter box at the top to narrow the file list.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The file tree panel is on the left side of the Files Changed tab. At 200% zoom or higher:

- The panel may collapse into a toggle button or hamburger menu. Look for a sidebar toggle icon in the top-left area of the Files Changed tab.
- File names in the tree may be truncated. Hover over a truncated name to see the full path in a tooltip.
- The filter box at the top of the file tree lets you type a filename to narrow the list. This is faster than scrolling through a long file list at high magnification.
- Each file entry shows an icon indicating the change type (added, modified, deleted). In high-contrast themes, these icons use distinct system colors rather than relying on green/red alone.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. `D` → navigate to "File tree" region
2. `↑/↓` to navigate the file list
3. `Enter` to jump to that file's diff

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` → Landmarks → navigate to "File tree" region
2. `VO+Down` to move through the file list
3. `VO+Space` to jump to that file's diff

</details>

### The Diff for a File

Each changed file has:

- A **file heading** (its path, e.g., "src/index.html") - navigable with `3` or `H`
- A **stats line** ("24 additions, 6 deletions")
- The **diff content** - a table where each row is one line of code

#### Lines in a diff are read as

- `+ Added line` - line that was added
- `- Removed line` - line that was removed
- `Context line` - unchanged line shown for context

### Navigating the diff with a screen reader

<details>
<summary>Visual / mouse users</summary>

Each file’s diff shows added lines in green and removed lines in red. Scroll the page to read through changes. Unchanged context lines are shown in white/grey. Collapse a file’s diff by clicking the arrow next to its filename heading. Use `Ctrl+F` (browser Find) to search for specific text within visible diffs.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The diff view uses color-coded backgrounds: green for added lines, red for removed lines, and white or grey for unchanged context.

**Tips for reading diffs at high magnification:**

- Enable **Split diff** view (dropdown at the top of Files Changed tab) to see old and new versions side-by-side. At very high zoom, **Unified diff** may be more comfortable because it uses a single column.
- Each line has a `+` or `-` prefix in addition to the color. In Windows High Contrast mode, the color backgrounds are replaced with system contrast colors and the `+`/`-` prefixes remain visible.
- Use `Ctrl+F` (browser Find) to search for specific text within the visible diffs. This is often faster than scrolling through long diffs at high zoom.
- Line numbers appear on the left margin. At extreme zoom levels, these may overlap the code text. Hover over a line number to see the full number in a tooltip.
- To collapse a long diff and reduce visual clutter, click the arrow next to the file heading.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. `T` to jump to the next diff table
2. Switch to Focus Mode: `Insert+Space` (NVDA) or `Insert+Z` (JAWS)
3. `Ctrl+Alt+↓` to move down one row (next diff line), `Ctrl+Alt+↑` to move up
4. `Ctrl+Alt+→` to read across columns (line number | change type | content)
5. The screen reader reads: “+  Add accessible name to submit button”
6. Collapsed sections contain unchanged code. Focus the expand/disclosure control and activate it (`Enter` or `Space`) to reveal the hidden lines.

> **Tip:** You can also use `↓` and `↑` in Focus Mode for simpler line-by-line reading when you don’t need column-level detail. Use `NVDA+F7` to get a headings overview of all changed files before diving into individual diffs.

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `T` or `VO+U` → Tables → select the diff table
2. `VO+Shift+Down` to enter the table
3. `VO+Right/Left` for columns, `VO+Up/Down` for rows

</details>

### Placing an inline comment on a diff line

<details>
<summary>Visual / mouse users</summary>

Hover over any line in the diff - a blue `+` button appears on the left margin. Click it to open a comment box for that line. Type your comment, then click **Add single comment** (posts immediately) or **Start a review** (batches the comment with others). To select a range of lines, click and drag across the line numbers on the left.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The inline comment button (a blue `+` icon) appears on hover near the left margin of each diff line. At high magnification:

- The `+` button can be small and hard to target. **Keyboard alternative:** `Tab` into the diff line area, then press `Enter` on the focused line to open the comment box.
- Once the comment box opens, it spans the full width of the diff area. At 200% zoom, you may need to scroll down to see the **Add single comment** and **Start a review** buttons below the text area.
- In Windows High Contrast mode, the `+` button uses the system link color rather than blue, and the comment box border uses the system window frame color.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the specific line in the diff (using the table navigation above)
2. While focused on that line, a comment button appears - press `Enter` or `Space` to activate it
3. A comment box opens below the line
4. Focus Mode → type your comment
5. `Tab` to **Add single comment** button (instant comment) OR **Start a review** (to batch comments)

#### Multi-line comment (Windows)

1. Focus the first line you want to comment on
2. Press `Shift+↓` to extend the selection to additional lines
3. A comment button appears - activate it
4. The comment applies to the full range of selected lines

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Navigate to the specific line in the diff (using the table navigation above)
2. While focused on that line, `VO+Space` on the comment button that appears
3. A comment box opens below the line
4. `VO+Shift+Down` to interact with the text area, then type your comment
5. `VO+Shift+Up` to stop interacting, then `Tab` to **Add single comment** and `VO+Space`

#### Multi-line comment (macOS)

1. Focus the first line and `Shift+↓` to extend the selection
2. `VO+Space` on the comment button that appears
3. The comment applies to the full range of selected lines

</details>

### Viewing comments within the diff

Inline comments appear as expandable threads within the diff table. Navigate to them with `3` (they are h3 headings). Each thread shows the comment, any replies, and a "Reply" button.

### Learning Cards: Reading the Files Changed Tab

<details>
<summary>Screen reader users</summary>

- Press `D` to jump to the "File tree" landmark on the left; use `Up/Down Arrow` to navigate files, `Enter` to jump to that file's diff
- Press `T` to jump to the next diff table; use `Ctrl+Alt+Down Arrow` to walk through diff lines row by row
- Each line is announced with its change type: `+` for additions, `-` for deletions, and context lines with no prefix

</details>

<details>
<summary>Low vision users</summary>

- Added lines have a green background; removed lines have a red background; in high-contrast themes, these use bolder system-color shading
- Toggle between Split diff (two-column) and Unified diff (single-column) using the dropdown at the top of the Files Changed tab; Unified is easier at high zoom
- Each file heading shows the path and a summary like "+24 -6"; zoom in on this to quickly assess the scope of changes per file

</details>

<details>
<summary>Sighted users</summary>

- The file tree panel on the left lists every changed file; click a filename to scroll the right panel to that file's diff
- Green-highlighted lines are additions; red-highlighted lines are deletions; grey lines are unchanged context
- Hover over any line number in the diff to reveal a blue "+" button for adding an inline review comment

</details>

## Opening a Pull Request

### Tool Cards: Open a Pull Request

**github.com (browser):**
1. Push your branch, then click the **Compare & pull request** banner (or go to **Pull requests > New pull request**).
2. Set base branch to `main`, compare branch to yours.
3. Fill in the title and description, then click **Create pull request**.

**github.dev (web editor):**
1. After committing changes, click the **Source Control** icon.
2. Click **Create Pull Request** in the Source Control panel header.
3. Fill in details and submit.

**VS Code Desktop (GitHub Pull Requests extension):**
1. Press `Ctrl+Shift+P`, type **GitHub Pull Requests: Create Pull Request**.
2. Select base and compare branches.
3. Fill in the title and description, then click **Create**.

**GitHub Desktop:**
1. After pushing your branch, click **Create Pull Request** in the banner or **Branch > Create Pull Request**.
2. This opens github.com with the PR form pre-filled.

**Git CLI / GitHub CLI:**
```bash
git push -u origin your-branch
gh pr create --title "Your title" --body "Description"
```

### From the web editor workflow (editing a file on GitHub)

1. You edited a file → GitHub showed a "Propose changes" form
2. You named your branch and activated "Propose changes"
3. GitHub redirected you to the "Open a pull request" page

### From a fork or feature branch

<details>
<summary>Visual / mouse users</summary>

1. Navigate to the repository on GitHub
2. If you recently pushed, a yellow banner “Compare & pull request” appears at the top - click it
3. If no banner appears: click the **Pull requests** tab → click the green **New pull request** button
4. Use the branch dropdowns to choose your **base** branch (what to merge into) and your **compare** branch (your changes)
5. Click **Create pull request**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the repository
2. A "Compare & pull request" banner may appear (if you recently pushed) - activate it
3. OR: Navigate to Pull Requests tab → "New pull request"
4. Choose your base branch (what to merge into) and compare branch (your changes)

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Navigate to the repository
2. Check for a "Compare & pull request" banner - Quick Nav `B` to find and `VO+Space` to activate it
3. OR: navigate to Pull Requests tab (`VO+U` → Landmarks → Repository navigation) → Quick Nav `B` for "New pull request"
4. Use the branch dropdowns (`VO+Space` to open, arrow keys to select) to choose base and compare branches

</details>

### Filling out the PR form

#### Title field

```text
Step 1: F to navigate to the title field
Step 2: Focus Mode → type a descriptive title
Step 3: Good: "Add keyboard navigation for carousel component"
Step 4: Bad: "Fix bugs"
```

#### Description field

```text
Step 1: Tab to the body text area
Step 2: Focus Mode → type using the PR template (if provided)
```

> **Copilot can write your PR description:** If your account has Copilot access, a **"Copilot actions"** button appears in the description toolbar. Activate it to open a menu with options to generate a summary of your changes or an outline of the most important changes in the PR. Screen reader users: `Tab` from the description text area to find the "Copilot actions" button, then press `Enter` to open the menu and `↑/↓` to choose an option.

If no template, use this structure:

```markdown
## Summary

What does this PR change and why?

## Changes

- Added `aria-label` to the search button
- Fixed keyboard trap in the modal dialog
- Replaced `<div>` with `<button>` for the dismiss control

## Related Issues

Closes #42

## Testing

- Tested with NVDA + Chrome on Windows 11
- Tested with VoiceOver + Safari on macOS Sonoma
- Keyboard-only navigation verified

## Screenshots / recordings

[Include if relevant - with descriptive alt text for any images]
```

> **Learning Room example:** In the Learning Room repository, a PR template is provided for you. Here is what a completed PR looks like for Challenge 3 (Complete Welcome Guide):
>
> ```markdown
> ## Description
>
> Completed three [TODO] sections in docs/welcome.md:
> - Added paragraph about contributors from all backgrounds
> - Added guidance on evaluating issues before starting
> - Added note about GitHub profile and portfolio impact
>
> ## Related Issue
>
> Closes #12
>
> ## Type of change
>
> - [x] Documentation update
>
> ## Accessibility checklist
>
> - [x] Heading levels follow a logical hierarchy
> - [x] Link text is descriptive (no "click here")
> - [x] No images added (or alt text provided)
> ```
>
> The `Closes #12` line tells GitHub to automatically close issue 12 when this PR merges. The validation bot checks that this line is present and that your description is at least 50 characters long.

### Setting a Draft PR

If your work is not finished, open as a Draft:

1. After filling in the form, find the dropdown arrow next to "Create pull request"
2. Select "Create draft pull request"
3. This signals to reviewers that it is not ready for formal review yet

### Draft Pull Requests - Full Lifecycle

A **draft pull request** is a PR explicitly marked as a work in progress. It is visible to the team, can receive comments, and runs CI - but is blocked from being merged until you mark it ready.

#### When to use a draft

- You want to show your approach and get early feedback before finishing
- You need CI to run but don't want accidental merges
- You are working across multiple days and want your progress visible
- You want to pair with a collaborator on the work

#### What a draft PR does differently

- The merge button is disabled - even an authorized maintainer cannot merge a draft
- The PR header shows a grey "Draft" badge instead of the green "Open" badge
- Reviewers are not auto-notified (no review requests are sent until ready)
- CI workflows still run normally

#### Mark a draft ready for review

1. Open the PR
2. Navigate to the "Reviewers" sidebar or scroll to bottom of the Conversation tab
3. Find and activate the **"Ready for review"** button
4. The draft badge changes to "Open" and reviewers are notified

#### Screen reader path

```text
Scroll to bottom of Conversation tab
→ B to navigate buttons
→ "Ready for review" button → Enter
→ Confirmation: PR status changes to Open
```

#### Convert an open PR to draft (after opening)

1. In the right sidebar, find the "Reviewers" section
2. Look for the **"Convert to draft"** link (below the review status)
3. Confirm in the dialog - this removes merge eligibility until you mark it ready again

<details>
<summary>GitHub CLI (gh) alternative - draft PR lifecycle</summary>

Manage draft PRs from your terminal:

```bash
# Create a draft PR
gh pr create --draft --title "WIP: Add carousel keyboard nav"

# Mark a draft ready for review
gh pr ready 42

# Check PR status (shows draft state)
gh pr view 42

# List only draft PRs
gh pr list --draft
```

</details>

### Learning Cards: Opening a Pull Request

<details>
<summary>Screen reader users</summary>

- After editing a file on GitHub, the "Propose changes" form has a branch name field and a commit message field; press `Tab` to move between them
- On the "Open a pull request" page, press `F` to jump to the Title field; `Tab` moves to the Description text area
- Press `Ctrl+Enter` from inside the description text area to submit the PR without finding the Create button

</details>

<details>
<summary>Low vision users</summary>

- The "Compare & pull request" yellow banner appears at the top of the repo after a recent push; at high zoom it may span the full width of the page
- The branch comparison dropdowns (base and compare) use small text; zoom in on the area above the diff preview to read them
- Draft PR: look for the dropdown arrow next to the green "Create pull request" button to switch to "Create draft pull request"

</details>

<details>
<summary>Sighted users</summary>

- After pushing a branch, a yellow "Compare & pull request" banner appears at the top of the repository page; click it to pre-fill the PR form
- The PR form shows a diff preview below the description field so you can verify your changes before submitting
- The dropdown arrow next to "Create pull request" lets you switch to Draft mode; the button text changes to "Create draft pull request"

</details>

## Requesting reviewers

From the sidebar Reviewers section:

1. Navigate to "Reviewers" heading (`3` or `H`)
2. Activate the gear button
3. Type a username in the search field
4. Select from the dropdown
5. Escape to save

> **Why some reviews are requested automatically:** A file called `CODEOWNERS` in many repositories maps file paths to specific people or teams. When your PR touches a file covered by a CODEOWNERS rule, GitHub automatically adds those people as required reviewers - you'll see them appear in the Reviewers sidebar without you adding them. You cannot remove a CODEOWNERS-required reviewer. If a required reviewer hasn't responded, reach out to them directly or leave a comment on the PR.

## Submitting a Review

When you are asked to review a PR, you have three options:

- **Comment** - leave feedback without a verdict; does not block merging
- **Approve** - signal you are satisfied; often required before merge
- **Request changes** - indicate changes must be addressed; blocks merge until resolved

### Starting a review

On the Files Changed tab, when you add inline comments, choose "Start a review" instead of "Add single comment." This batches all your comments into one review submission.

### Completing and submitting a review

After adding your inline comments via “Start a review,” you must submit the review to notify the PR author. The review is pending until you submit it.

<details>
<summary>Visual / mouse users</summary>

1. Look for the **Finish your review** button in the top-right area of the Files Changed tab (it shows the number of pending comments)
2. Click it - a popover appears with a summary text area and three radio buttons: **Comment**, **Approve**, **Request changes**
3. Optionally type a summary comment
4. Select your verdict by clicking the radio button
5. Click **Submit review**

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The **Finish your review** button is in the top-right area of the Files Changed tab. It shows a badge with the number of pending comments. At high magnification:

- The button may scroll off-screen to the right. Use horizontal scrolling or press `Tab` from the page top to cycle through focusable elements until you reach it.
- When clicked, a popover appears with a summary text area and three radio buttons (**Comment**, **Approve**, **Request changes**). At 200%+ zoom, the popover may extend below the visible viewport. Scroll down within the popover to see the **Submit review** button.
- The radio buttons are standard HTML radio buttons. In Windows High Contrast mode, the selected radio button uses the system highlight color.
- **Keyboard shortcut:** If the button is hard to find visually, press `Ctrl+Shift+Enter` from within any review comment text area to open the submit review dialog directly.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. Press `1` to go to the h1 (PR title)
2. Press `B` (or `Tab`) to navigate to the **“Submit review”** button and activate it (`Enter`/`Space`)
3. A “Submit review” dialog/panel appears
4. Switch to Focus Mode (`NVDA+Space`) if prompted to type
5. Optionally type a summary comment in the “markdown value” textbox
6. `Tab` to the “Review Event” radio group
7. Use `↑/↓` to select one of:
   - **Comment** - general feedback, does not block merge
   - **Approve** - you are satisfied; signals merge readiness
   - **Request changes** - must be addressed before merge
8. `Tab` to the “Submit review” button and press `Enter`

</details>
<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Quick Nav `H` or `VO+Cmd+H` to navigate to the PR title (h1)
2. Quick Nav `B` or `Tab` to find the **"Submit review"** button → `VO+Space`
3. A "Submit review" dialog/panel appears
4. `VO+Shift+Down` to interact with the summary text area, type an optional comment
5. `VO+Shift+Up` to stop interacting, then `Tab` to the "Review Event" radio group
6. `VO+Left/Right` or arrow keys to select:
   - **Comment** - general feedback, does not block merge
   - **Approve** - you are satisfied; signals merge readiness
   - **Request changes** - must be addressed before merge
7. `Tab` to the "Submit review" button → `VO+Space`

</details>
> **Tip from accessibility.github.com:** If you submitted comments as "Add single comment" instead of "Start a review," each comment is already posted individually. The "Submit review" flow is only needed when you chose "Start a review" to batch comments together.

<details>
<summary>GitHub CLI (gh) alternative - reviewing a PR</summary>

Review a pull request from your terminal:

```bash
# View the PR diff in your terminal
gh pr diff 42

# Approve a PR
gh pr review 42 --approve

# Approve with a comment
gh pr review 42 --approve --body "Looks good - heading hierarchy is correct."

# Request changes
gh pr review 42 --request-changes --body "The alt text on line 34 needs to describe the image content."

# Leave a comment-only review (no verdict)
gh pr review 42 --comment --body "A few suggestions - see inline comments."
```

**Note:** `gh pr diff` outputs the full diff to your terminal, which a screen reader can read line by line. For inline comments on specific lines, use the web interface or VS Code.

</details>

### GitHub shortcuts for pull requests

These are the GitHub built-in shortcuts for PR pages. Enable Focus Mode first (NVDA: `NVDA+Space`, JAWS: `Insert+Z`) before using single-key shortcuts.

#### On the PR list page

| Shortcut | Action |
| ---  | ---  |
| `G P` | Jump to the Pull Requests tab from anywhere in the repo |
| `C` | Create a new pull request |
| `Ctrl+/` (Win) or `Cmd+/` (Mac) | Focus the PR search bar |

**Shortcut note:** For `G P`, press `G`, release it, then press `P` (two sequential key presses, not simultaneous).

#### On an open pull request

| Shortcut | Action |
| ---  | ---  |
| `?` | Show all shortcuts for this page |
| `Q` | Request a reviewer |
| `M` | Set a milestone |
| `L` | Apply a label |
| `A` | Set an assignee |
| `R` | Quote selected text in your reply |
| `Ctrl+Shift+P` | Toggle Write and Preview tabs in the comment box |
| `Ctrl+Enter` | Submit comment from inside the text area |

#### On the Files Changed tab

| Shortcut | Action |
| ---  | ---  |
| `T` | Jump to the "Filter changed files" field |
| `C` | Open the commits dropdown to filter which commits are shown |
| `Ctrl+G` (Win) or `Cmd+G` (Mac) | Insert a code suggestion block around selected code |
| `Ctrl+Shift+Enter` (Win) or `Cmd+Shift+Enter` (Mac) | Submit a review comment |

For the full shortcut system, see [Screen Reader Cheat Sheet - GitHub Shortcuts section](appendix-b-screen-reader-cheatsheet.md#github-built-in-keyboard-shortcuts).

### Learning Cards: Submitting a Review

**Screen reader users:**
- The review verdict controls are inside a popover triggered by the "Finish your review" button; press `1` to return to the h1 (PR title), then `B` or `Tab` forward to find the button -- it is easy to miss because it is not a landmark
- Inside the popover, `Tab` past the summary text area to reach a radio group labeled "Review Event"; use `Up/Down Arrow` to switch between Comment, Approve, and Request Changes
- Shortcut: press `Ctrl+Shift+Enter` from any review comment text area to open the submit review dialog directly, bypassing the search for the button

**Low-vision users:**
- The "Finish your review" button sits in the top-right corner of the Files Changed tab with a small badge showing your pending comment count; at 200%+ zoom it may scroll off-screen to the right
- Inside the submit popover, the three radio buttons (Comment, Approve, Request changes) are small standard HTML radios; zoom in on the popover area or use `Tab` to step between them
- After submitting, your review verdict appears as a colored banner in the Conversation timeline: green for Approve, red for Request Changes, grey for Comment

**Sighted users:**
- Look for the green "Finish your review" button in the sticky header of the Files Changed tab; the badge shows how many comments are pending
- The popover has a text area for an overall summary at the top and three radio buttons at the bottom: Comment, Approve, Request changes -- select one before clicking "Submit review"
- If you added comments with "Add single comment" instead of "Start a review," those are already posted; the submit review flow only applies to batched review comments

### Suggested Changes

A **suggested change** is a special form of inline review comment where the reviewer proposes exact replacement text. The PR author can apply the suggestion directly from GitHub - no copy-paste or separate commit needed.

#### As a reviewer - inserting a suggestion

1. On the Files Changed tab, navigate to the line you want to propose a change for
2. Activate the **line comment button** for that line (the `+` that appears on hover, or Tab to navigate to it)
3. In the comment text area that opens, press `Ctrl+G` (Windows) or `Cmd+G` (Mac)
4. GitHub wraps a suggestion block around the current line content:

   ````markdown
   ```suggestion
   the current line content here
   ```
   ````

5. Edit the text inside the suggestion block to show your proposed change
6. Add context above the block if helpful: "This makes the alt text more descriptive:"
7. Submit as part of your review ("Start a review" → batch with other comments)

**Screen reader note:** The suggestion block is plain Markdown text in the comment editor. Type it directly:

```text
```suggestion
your proposed text here
```text

```

(Three backticks, the word `suggestion`, Enter, your text, Enter, three backticks.)

#### As an author - applying a suggestion

1. Open the PR Conversation or Files Changed tab
2. Navigate to the inline comment containing a suggestion (it shows a diff-style preview)
3. Find and activate the **"Apply suggestion"** button below the suggestion block
4. GitHub creates a commit automatically that applies the change - no file editing required
5. The conversation thread is marked as resolved

#### Batching multiple suggestions into one commit

1. For each suggestion you want to apply, activate **"Add suggestion to batch"** instead of "Apply suggestion"
2. After selecting all suggestions, activate the **"Commit suggestions"** button that appears at the top
3. GitHub applies all batched suggestions in a single commit

#### When to use suggestions vs. comments

- Use a suggestion when you know the exact text that would fix the issue
- Use a plain comment when the change requires judgment from the author (e.g., "this alt text isn't descriptive - can you describe what the image shows?")

1. After adding all your inline comments, navigate to the review summary button
2. On Files Changed tab: find the "Review changes" button (B to navigate buttons)
3. Press Enter to open the review dialog
4. A panel opens:
   - A summary text area for overall comments
   - Radio buttons for Comment / Approve / Request changes
5. Switch to Focus Mode → type your summary comment
6. Navigate to the radio buttons with arrow keys → select your verdict
7. Tab to "Submit review" button → Enter

### Learning Cards: Suggested Changes

**Screen reader users:**
- To insert a suggestion block, press `Ctrl+G` (Windows) or `Cmd+G` (Mac) in the comment text area; the screen reader announces the inserted fence -- arrow down to edit the text between the backtick lines
- Alternatively type the block manually: three backticks, the word `suggestion`, Enter, your replacement text, Enter, three backticks -- this avoids relying on the keyboard shortcut
- As a PR author, navigate to a suggestion comment with `3`, then `Tab` to the "Apply suggestion" button; GitHub commits the change automatically with no file editing required

**Low-vision users:**
- Suggestion blocks render as a mini inline diff: the original line in red/pink background and your proposed replacement in green background; in high-contrast mode these use system diff colors
- The "Apply suggestion" button is small and sits below the suggestion diff preview; zoom into the comment area to find it, or `Tab` from the suggestion text to reach it
- When batching multiple suggestions, a floating "Commit suggestions" bar appears at the top of the page; at high zoom scroll up or press `Home` to find it

**Sighted users:**
- In the comment box, press `Ctrl+G` / `Cmd+G` to wrap the current line in a suggestion block; edit the text inside to show your proposed replacement -- the preview tab renders it as an inline diff
- As a PR author, each suggestion shows an "Apply suggestion" button and an "Add suggestion to batch" button; use batching to combine several suggestions into one clean commit
- Applied suggestions auto-resolve the conversation thread and create a commit attributed to both the reviewer (author of the suggestion) and you (committer)

## Understanding Merge Options (for Maintainers)

When a PR is approved and checks pass, a maintainer can merge it. The merge button section appears at the bottom of the Conversation tab.

```text

Step 1: Navigate to the bottom of the Conversation tab
Step 2: Find "Merge pull request" button (or similar)
Step 3: A dropdown arrow next to the button offers strategy options:

- Create a merge commit
- Squash and merge
- Rebase and merge
Step 4: Choose strategy → activate the button
Step 5: Confirm in the dialog that appears

```

<details>
<summary>GitHub CLI (gh) alternative - merging a PR</summary>

Merge a pull request from your terminal:

```bash
# Merge with default strategy (merge commit)
gh pr merge 42

# Squash and merge
gh pr merge 42 --squash

# Rebase and merge
gh pr merge 42 --rebase

# Delete the branch after merging
gh pr merge 42 --squash --delete-branch

# Enable auto-merge (merges when checks pass)
gh pr merge 42 --auto --squash
```

</details>

## After a PR is merged

- The PR status badge changes to "Merged" (purple)
- The source branch can be deleted - a "Delete branch" button appears
- Any linked issues with `Closes #N` in the description are automatically closed

> **Screen reader tip - deleting the branch after merge:** Navigate to the "Add a comment" section (`D`), then press `Shift+B` to navigate backwards to the **"Delete branch"** button and activate it. This keeps your repository clean by removing the now-merged feature branch.

## Auto-Merge - Merging When You Can't Wait Around

**Auto-merge** lets you pre-authorize a PR to merge automatically the moment all branch protection requirements are satisfied - required reviews approved, all status checks passing, and the branch up to date.

This is especially useful when:

- You've addressed all review comments and are waiting for CI to finish
- A maintainer has approved the PR but a required check is still running
- You're in a different time zone from the reviewers

### Enabling Auto-Merge on Your PR

```text
1. Open your PR → scroll to the merge box at the bottom
2. Tab to the merge button dropdown arrow (next to "Merge pull request")
3. Select "Enable auto-merge"
4. Choose your merge strategy (squash, rebase, or merge commit)
5. Confirm in the dialog - the merge box now shows "Auto-merge enabled"
```

#### Screen reader path

```text
Conversation tab → End key → merge box region
Tab → dropdown button (announced as "Select merge method" or similar)
Enter → arrow keys through options → "Enable auto-merge" → Enter
Dialog: Tab → confirm button → Enter
```

#### What happens next

- The PR merge box changes to show "Auto-merge enabled - merge will happen automatically"
- When the last required check passes (or last required review arrives), GitHub merges the PR silently
- You receive a notification: "Your PR was automatically merged"
- If a reviewer requests changes after auto-merge is enabled, auto-merge is automatically cancelled (a new approval is required before it re-enables)

### Cancelling Auto-Merge

```text
Merge box → Tab → "Disable auto-merge" button → Enter
```

> **Note:** Auto-merge is only available if the repository administrator has enabled it in Settings → General. Many open source repos have it on; some do not.

## Practical Scenarios

### Scenario A: "I want to review an assigned PR"

**Example:** You are assigned to review a PR titled "Add missing NVDA shortcut to keyboard-shortcuts.md." The PR modifies `docs/keyboard-shortcuts.md` in the Learning Room repository and references Challenge 2.

```text
1. Notifications → open the PR notification
2. D → PR tabs → Files changed tab
3. T → enter the first diff table → navigate lines with arrow keys
4. Check: does the new shortcut appear in the correct NVDA table? Is the table formatting preserved?
5. For each concern: activate the line comment button → type comment → Start a review
6. D → PR tabs → Conversation → scroll to bottom
7. B → "Review changes" button → type summary → select verdict → Submit review
```

### Scenario B: "I want to respond to review feedback on my PR"

**Example:** Your PR for Challenge 3 (Complete Welcome Guide) received a review comment: "The [TODO] about evaluating issues is good, but the paragraph could mention checking if the issue is already assigned." The validation bot also flagged a link text issue.

```text
1. Open your PR (Notifications → PR link, or find it in PR list)
2. 3 to navigate review comments
3. For the reviewer's comment: read it → Tab to "Reply" → Focus Mode → type "Good point - I will add a sentence about checking assignees. Pushing a fix now."
4. For the bot's link text flag: fix the link in docs/welcome.md, commit, and push
5. When all addressed: Tab to "Re-request review" button → Enter
```

### Scenario C: "My PR has a merge conflict"

```text
1. You will see a "This branch has conflicts that must be resolved" message near the bottom
2. Tab to "Resolve conflicts" button → GitHub opens a web conflict editor
3. The editor shows conflict markers - see Merge Conflicts guide (07-merge-conflicts.md)
4. Edit the file to resolve → Mark as resolved → Commit merge
```

## Common PR Mistakes to Avoid

| Mistake | Better Approach |
| ---------  | ----------------  |
| Opening a PR without an associated issue | Link to or create an issue first; comment "I'd like to work on this" |
| A vague title like "Fix things" | Be specific: "Fix missing alt text on homepage hero image" |
| Missing the PR template sections | Fill all sections - description, testing, related issues |
| Pushing many unrelated changes in one PR | One PR per logical change (smaller PRs get faster reviews) |
| Not testing your own changes | Test before requesting review |
| Not responding to reviewer comments | Acknowledge all comments, even if you disagree |

## Writing PR Descriptions That Get Reviewed

> **See also:** [Appendix C: Markdown Reference](appendix-c-markdown-reference.md) for formatting your PR description with headings, lists, and task lists.

A pull request is only as useful as its description. Reviewers decide whether to pick up your PR -- and how carefully to read it -- based on what you write in that text box. A strong description saves everyone time, catches misunderstandings early, and makes the review conversation productive instead of confused.

This section walks you through what reviewers expect, how to structure your description, and the patterns that separate descriptions people actually read from descriptions people skip.

### What Reviewers Look For

When a reviewer opens your PR, they are asking four questions before they ever look at the diff:

1. **Why does this change exist?** -- What problem does it solve, or what goal does it advance?
2. **What is the scope?** -- Which files changed, and roughly how big is the change?
3. **How was it tested?** -- Did you verify that the change works, and how?
4. **What should I pay attention to?** -- Are there tricky parts, trade-offs, or areas where you want a second opinion?

If your description answers all four, the reviewer can jump straight into the code with context. If it answers none, the reviewer has to reverse-engineer your intent from the diff -- and that slows everything down.

> **Screen reader tip:** When you write your description in the GitHub comment box, use Markdown headings (`##` or `###`) to separate sections. Reviewers using screen readers can then press `H` to jump between sections instead of arrowing through a wall of text.

### The `Closes #XX` Pattern

GitHub recognizes special keywords in PR descriptions that automatically close linked issues when the PR merges. You do not need to close issues by hand -- just include the right keyword followed by the issue number.

| Keyword | Effect When PR Merges | When to Use |
| ------- | --------------------- | ----------- |
| `Closes #12` | Closes issue #12 | The PR fully resolves the issue |
| `Fixes #12` | Closes issue #12 | The PR fixes a bug described in the issue |
| `Resolves #12` | Closes issue #12 | The PR resolves a discussion or question in the issue |

All three keywords behave identically -- GitHub closes the linked issue on merge. The difference is purely semantic. Use whichever word best describes the relationship between your PR and the issue.

You can link multiple issues in one description:

```text
Closes #12
Closes #14
```

If your PR is related to an issue but does not fully resolve it, skip the keyword and write a plain reference instead: "Related to #12" or "See #12 for background." That creates a clickable link without triggering auto-close.

> **Screen reader tip:** After your PR merges, navigate to the linked issue. GitHub adds a cross-reference comment like "Closed by #25" that you can find by pressing `3` to jump between comments. This confirms the link worked.

### Before/After Structure

One of the most effective patterns for PR descriptions is showing the state before your change and the state after. This gives the reviewer an instant mental model of what changed without reading the diff line by line.

For text-based changes, use a simple two-part layout:

```text
**Before:** The welcome page had a [TODO] placeholder where the
introduction paragraph should be.

**After:** The welcome page now has a three-sentence introduction
that describes what the Learning Room is and who it is for.
```

For visual changes -- layout shifts, color updates, new UI elements -- describe what the reviewer would see. Since this curriculum prioritizes accessibility, write your before/after as text descriptions rather than relying solely on screenshots. A reviewer using a screen reader cannot see an image, but they can read "Before: the sidebar had no skip link. After: the sidebar has a skip link targeting the main content area."

If you do include screenshots, always add alt text that conveys the same information as the image. The screenshot is a convenience, not the only source of truth.

### A PR Description Template

Here is a template you can copy into your PR descriptions. Not every section applies to every PR, but filling in even a few sentences per section makes a meaningful difference.

```markdown
## Summary

One or two sentences describing what this PR does and why.

## Changes Made

- Bullet list of specific changes
- One bullet per logical change
- Reference filenames when helpful

## Related Issues

Closes #XX

## Testing

- How you verified the change works
- Any edge cases you checked

## Checklist

- [ ] I tested my changes locally
- [ ] I checked for accessibility (alt text, heading order, link text)
- [ ] I linked the related issue
```

You will see a version of this template in the Learning Room's `.github/PULL_REQUEST_TEMPLATE.md` file. When a repository has a PR template, GitHub auto-fills the description box with it every time you open a new PR. You just fill in the blanks. See [Chapter 5](05-working-with-issues.md) for how issue templates work the same way.

### Common Description Mistakes

Even experienced contributors make these mistakes. Knowing what to avoid is half the battle.

| Mistake | Why It Hurts | Better Version |
| ------- | ------------ | -------------- |
| Empty description | Reviewer has zero context; they may skip the PR entirely | Write at least a Summary and Related Issues section |
| "Fixed stuff" or "Updates" | No one can tell what changed or why | "Add missing alt text to three images on the setup page" |
| Describing HOW but not WHY | The diff already shows how; the description should explain the motivation | "The setup page had three images with empty alt attributes, which caused screen readers to announce 'image' with no context" |
| Forgetting to link issues | The reviewer cannot see what problem you are solving, and the issue stays open after merge | Add `Closes #XX` or at minimum "Related to #XX" |
| Pasting a massive paragraph | Hard to scan, especially with a screen reader | Use Markdown headings and bullet lists to break it up |

### Good vs. Bad: Side by Side

**Bad description:**

```text
fixed the file
```

That is the entire description. No context, no linked issue, no explanation of what file or what was wrong with it. A reviewer seeing this has to open the diff, figure out which file changed, read every line, and guess at the intent. Most reviewers will either skip this PR or leave a comment asking for more information -- which delays the merge.

**Good description:**

```text
## Summary

Fill in the [TODO] introduction section on the welcome page so new
visitors understand what the Learning Room is.

## Changes Made

- Replaced the [TODO] placeholder in docs/welcome.md with a
  three-sentence introduction paragraph
- Added a "What you will learn" bullet list below the introduction

## Related Issues

Closes #7

## Testing

- Opened docs/welcome.md in the VS Code preview and confirmed the
  new text renders correctly
- Checked heading order with the accessibility linter -- no warnings
- Verified the [TODO] marker is completely removed

## Checklist

- [x] I tested my changes locally
- [x] I checked for accessibility (alt text, heading order, link text)
- [x] I linked the related issue
```

This version answers every question a reviewer has before they touch the diff. They know the file, the issue, the change, and the testing. The review conversation can focus on the content itself rather than on figuring out what the PR is about.

> **Screen reader tip:** When scanning a list of open PRs, the title and first line of the description are what you hear first. Front-load the most important information so you can triage PRs quickly using `Arrow Down` from the PR title.

### Learning Cards: Writing PR Descriptions That Get Reviewed

<details>
<summary>Screen reader users</summary>

- Use Markdown headings (`##`) in your description (Summary, Changes, Related Issues, Testing) so reviewers can press `H` to jump between sections
- Type `Closes #` followed by the issue number to auto-close the linked issue on merge; GitHub autocompletes when you type `#`
- Press `Ctrl+Shift+P` in the description text area to toggle between Write and Preview modes; Preview renders your Markdown so you can check structure before submitting

</details>

<details>
<summary>Low vision users</summary>

- Use the Preview tab to verify your Markdown renders correctly; headings, bullet lists, and code blocks are easier to proofread in rendered form
- Keep bullet points short (one line each) so the description is scannable at high zoom without excessive horizontal scrolling
- When including screenshots, add alt text in the Markdown image syntax: `![description](url)` so every reader gets the same information

</details>

<details>
<summary>Sighted users</summary>

- A well-structured description uses bold section headers and bullet lists; reviewers scan these visually to decide whether to dive into the diff
- The `Closes #XX` link renders as a clickable cross-reference; GitHub adds a small icon showing the linked issue's state (open/closed)
- Use the checklist syntax (`- [ ]` and `- [x]`) for your testing and accessibility checklist; these render as interactive checkboxes

</details>

## Try It: Read a Real Pull Request

**Time:** 3 minutes | **What you need:** Browser, signed in to GitHub

Go to the Learning Room repository's Pull Requests tab and find any open or recently closed PR:

1. Navigate to Pull Requests (`G` then `P` in Focus Mode)
2. Open the first PR in the list (press `Enter` on its title)
3. **Read the description** - press `2` to jump to the first section heading, then arrow down to read. Look for: which file was changed (`docs/welcome.md`, `docs/keyboard-shortcuts.md`, or `docs/setup-guide.md`)? Which challenge was this PR solving? Does the description reference `Closes #XX`?
4. **Check the conversation** - press `3` to jump between comments. Read what the validation bot reported - did the bot find any accessibility issues like broken headings or non-descriptive links? How did the author respond?
5. **Look at the diff** - press `D` to the "Pull request tabs" landmark, then navigate to "Files changed" and press `Enter`. Press `H` to scan the changed file headings. If the PR touched `docs/welcome.md`, you should see `+` lines where the `[TODO]` sections were filled in. If it touched `docs/keyboard-shortcuts.md`, you should see new rows added to a shortcut table.

**You're done.** You just read a complete PR - description, conversation, and code changes.

> **What success feels like:** You followed a PR from description to diff using only headings and landmarks. The next time you open a PR - yours or someone else's - you'll know exactly where everything is.

> ### Day 2 Amplifier - Accessibility Agents: `@pr-review`
>
> **Review at least two pull requests manually before using any agent.** A review generated by `@pr-review` is only as useful as your ability to read, edit, and challenge it. The agent writes a first draft - you supply the context, the history, and the final judgment that no diff can contain.
>
> Once you have mastered manual pull request review:
>
> - **In VS Code** - `@pr-review review PR #N` generates line-numbered diffs with change maps, risk assessment, before/after snapshots, CI results, and suggested inline comments - a documented starting point for your own review, not a replacement for it
> - **In your repo** - Accessibility Agents' review capabilities work across every repository you have access to by default; fork [accessibility-agents](https://github.com/Community-Access/accessibility-agents) and those capabilities travel with your project from day one
> - **In the cloud** - GitHub Agentic Workflows can auto-generate PR descriptions, verify linked issues, and post accessibility impact summaries on a `pull_request` trigger - running the moment a PR is opened, whether or not anyone is watching
>
> *The agent documents the diff. You bring the context that no diff can contain.*

> **Challenge Time:** Go to the [Challenge Hub](CHALLENGES.md) and complete **Challenges 4, 5, and 6** to open your first PR. Aria will guide you from there.

---

*Next: [Chapter 07: Merge Conflicts](07-merge-conflicts.md)*  
*Back: [Chapter 05: Working with Issues](05-working-with-issues.md)*  
*Related appendices: [Appendix C: Markdown Reference](appendix-c-markdown-reference.md) | [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*

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

- **Creating, Reviewing, and Merging Pull Requests with a Screen Reader:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Workshop Recommendation (Chapter 6):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Local Git Alternative: The Full Branch-Edit-PR Workflow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What Is a Pull Request?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Navigating to Pull Requests:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **The Pull Request List Page:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Anatomy of a Pull Request Page:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Navigating the PR Tab Bar:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Reading the Conversation Tab:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Reading the Commits Tab:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Reading the Checks Tab:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Reading the Files Changed Tab:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Opening a Pull Request:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Summary:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Screenshots / recordings:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
