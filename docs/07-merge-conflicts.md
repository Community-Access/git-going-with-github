# Merge Conflicts
>
> **Listen to Episode 7:** [Merge Conflicts Are Not Scary](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix E: Advanced Git](appendix-e-advanced-git.md) | [Appendix G: VS Code Reference](appendix-g-vscode-reference.md)
> **Authoritative sources:** [GitHub Docs: Resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) | [Git SCM: Basic Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts)


## Understanding, Preventing, and Resolving Conflicts

> Merge conflicts sound intimidating but are a normal, manageable part of collaborative development. This guide explains what conflicts are, how to read conflict markers, and how to resolve them - step by step.


## Workshop Recommendation (Chapter 7)

Chapter 7 uses **one controlled practice challenge** so students can learn conflict resolution without high-pressure scenarios.

- **Challenge count:** 1
- **Time:** under 10 minutes
- **Evidence:** issue-linked PR and completion comment
- **Pattern:** observe, resolve, verify

### Chapter 7 Challenge Set

1. **Resolve conflict markers** - identify and clean up conflict markers in a practice file, then open a linked PR.

> **Branch guidance for Chapter 7:** Use a short-lived feature branch: `fix/yourname-issueXX` (for example, `fix/maria-issue48`). The same pattern you used in Chapter 6.

### Challenge 7.1 Step-by-Step: Resolve Conflict Markers

**Goal:** Identify the three types of conflict markers in a practice file, decide which content to keep, remove the markers, and submit a clean PR.

**Where you are working:** the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com (web editor) or in VS Code if you cloned locally.

**Before you start:** Open your **assigned Chapter 7 challenge issue** (the one titled "Chapter 7.1: Resolve Conflict Markers (@yourname)"). The issue description tells you which practice file contains the conflict markers.

Practice sample: [`learning-room/docs/samples/chapter-6-conflict-practice-sample.md`](../learning-room/docs/samples/chapter-6-conflict-practice-sample.md)

1. Open the practice file specified in your challenge issue.
2. Search the file for `<<<<<<<`. This is the **start marker** - it shows where the conflict begins.
3. Read the content between `<<<<<<<` and `=======`. This is **your version** (the current branch).
4. Read the content between `=======` and `>>>>>>>`. This is **their version** (the incoming branch).
5. Decide which content to keep:
   - Keep only your version, or
   - Keep only their version, or
   - Combine both versions into one clean paragraph.
6. Delete all three marker lines:
   - The `<<<<<<< HEAD` line (or similar)
   - The `=======` separator line
   - The `>>>>>>> branch-name` line
7. Review the file to confirm no marker lines remain. Search for `<<<<<<<` again - there should be zero results.
8. Commit your changes on a branch named `fix/yourname-issueXX`.
9. Open a pull request with:
   - Title: `fix: resolve conflict markers in [filename]`
   - Body: Include `Closes #XX` (your challenge issue number) and a 1-2 sentence description of which content you kept and why.

**Screen reader tip:** Use your screen reader's find command (`Ctrl+F` in browser, `Ctrl+H` in VS Code) to jump directly to `<<<<<<<`. The markers are plain text, so they are fully readable.

**You are done when:** Your PR passes bot validation checks and contains no remaining conflict markers.

### Completing Chapter 7: Submit Your Evidence

When your PR is open and passing checks, post a comment on your assigned Chapter 7 challenge issue:

```text
Chapter 7 completed:
- Challenge 7.1: Opened PR #[number] resolving conflict markers in [filename]
- Content decision: kept [your version / their version / combined both] because [reason]
```

### Expected Outcomes

- Student can identify the three conflict marker lines (`<<<<<<<`, `=======`, `>>>>>>>`) immediately.
- Student can read both sides of a conflict and make an intentional content decision.
- Student can remove all markers and submit a clean, issue-linked PR.

### If You Get Stuck

1. Can't find the markers? Use `Ctrl+F` and search for `<<<<<<<` - they are always in sets of three.
2. Not sure which side to keep? Read both versions aloud. Pick the one that is clearer, or combine them.
3. Accidentally deleted too much? Undo with `Ctrl+Z` and start the section over.
4. PR bot says content is wrong? Double-check that zero marker lines remain - search for `<<<<<<<`, `=======`, and `>>>>>>>`.
5. Ask facilitator to sanity-check your final content before opening the PR.

### Learning Moment

Merge conflicts are not failures. They are a normal collaboration checkpoint and a chance to make an intentional content decision. In real open source projects, conflicts happen whenever two people edit near the same lines. The skill is not avoiding them - it is resolving them calmly and clearly.

### Learning Pattern Used in This Chapter

1. Start with a controlled, safe conflict (practice file with known markers).
2. Learn to read the conflict structure (your version vs. their version).
3. Make a deliberate content decision (not just deleting randomly).
4. Submit clean evidence through the PR workflow.
5. Build confidence for real conflicts in future contributions.


### About Learning Cards in This Chapter

This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. Not every card appears at every step. Open the ones that match how you work.

The following table describes the five learning card types used in this chapter.

| Card | Who it helps | What it covers |
| --- | --- | --- |
| Visual / mouse | Sighted users navigating with a mouse or trackpad | Click targets, visual cues, color-coded conflict regions |
| Low vision | Users with magnification, zoom, or high-contrast themes | Zoom-friendly navigation, high contrast marker visibility, enlargement tips |
| NVDA / JAWS (Windows) | Screen reader users on Windows | Keystroke sequences, Focus and Browse mode, verbosity tips |
| VoiceOver (macOS) | Screen reader users on macOS | VO key sequences, rotor navigation, interaction model |
| CLI (git / gh) | Terminal users on any platform | Git and GitHub CLI commands for conflict detection and resolution |


## Local Git Alternative: Resolving Conflicts from Your Terminal

<details>
<summary>If you cloned the learning-room in Block 0 and prefer resolving conflicts locally</summary>

The GitHub web conflict editor works well and is the primary method taught in this chapter. If you cloned the Learning Room in Block 0 and prefer working in your terminal, here is how to resolve conflicts locally. This is the same workflow covered in depth in [Chapter 11: Git and Source Control](14-git-in-practice.md).

**Step 1 - Sync main and merge into your branch:**

```bash
cd ~/Documents/learning-room
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```

If there is a conflict, Git will report which files are affected and stop the merge.

**Step 2 - Open the conflicted file:**

```bash
code docs/welcome.md   # or your preferred editor
```

Look for the conflict markers:

```text
<<<<<<< HEAD
Your version of the content
=======
The incoming version from main
>>>>>>> main
```

**Step 3 - Resolve by editing:**

- Keep the version you want (or combine both)
- Delete all three marker lines (`<<<<<<<`, `=======`, `>>>>>>>`)
- Save the file

**Step 4 - Mark resolved, commit, and push:**

```bash
git add docs/welcome.md
git commit -m "Resolve merge conflict in welcome.md"
git push
```

Your PR on GitHub updates automatically with the resolved content. The same bot checks and human review process apply.

</details>


## What Is a Merge Conflict?

A merge conflict occurs when two people have both changed the **same part of the same file** in **different ways**, and Git cannot automatically decide which version is correct.

Git can merge changes automatically when they touch different parts of a file. Conflicts only happen when two changes overlap - for example:

- Person A changed line 12 to say "Submit form"
- Person B changed line 12 to say "Send message"
- Git asks: which one do you want to keep?


## Why Conflicts Happen

The most common causes:

| Cause | Example |
| -------  | ---------  |
| Two people edited the same line | You both fixed the same typo differently |
| One person deleted a file but another edited it | You removed an old function; they fixed a bug in it |
| Two people restructured the same section | You reorganized a list; they added items to it |
| A long-running PR diverged from main | Your branch is weeks old and main has changed significantly |


## How to Prevent Conflicts (Prevention is Easier Than Resolution)

Avoiding conflicts in the first place saves time and reduces stress. Here are the most effective strategies:

### 1. **Keep your branches short-lived**

Work in small, focused chunks. A branch that lives for 3 days has far fewer conflicts than one that lives for 3 weeks.

- Target: 1-3 days from branch to merge
- If a feature takes longer, break it into smaller PRs

### 2. **Sync with main frequently**

The longer your branch diverges from main, the more likely conflicts become.

**Best practice:** Sync daily if main is active:

```bash
# From your feature branch
git fetch origin
git merge origin/main
# Or: git rebase origin/main (if comfortable with rebasing)
```

**GitHub web method:** Use the "Update branch" button on your PR if it appears.

### 3. **Communicate with your team**

Let others know what files you're working on. Use issue comments:

> "Heads up: I'm working on the `[TODO]` sections in `docs/welcome.md` for Challenge 3. If you're also editing welcome.md, let's coordinate so we don't conflict."

In the Learning Room, this is especially important because multiple students may claim challenges that touch the same file. Challenges 1 and 3 both modify `docs/welcome.md` - if two students work on both simultaneously without coordinating, a merge conflict will occur.

### 4. **Avoid mass reformatting**

Running a formatter on an entire file creates conflicts with anyone else editing that file. If you must:

- Do it in a **separate PR** before functional changes
- Announce it to the team
- Merge it quickly so everyone can sync

### 5. **Pull before you push**

Always fetch and merge (or pull) before pushing your changes:

```bash
git pull origin main  # Sync your local main
git checkout your-branch
git merge main        # Merge main into your branch
git push              # Now push
```

This catches conflicts locally where they're easier to resolve.

### 6. **Work on separate files when possible**

If multiple people are working simultaneously, divide tasks by files or modules rather than everyone touching the same code.

### 7. **Keep PRs small**

A 50-file PR will almost certainly conflict with something. A 5-file PR merges quickly and cleanly.

The most effective contributors make many small PRs rather than one giant one.

### 8. **Use Draft PRs for early visibility**

Open your PR as a draft while still working. Others can see what you're changing and avoid overlapping work. Convert to "Ready for review" when done.

### Learning Cards: How to Prevent Conflicts

<details>
<summary>Screen reader users</summary>

- Before starting work, run `git pull origin main` in VS Code's terminal (`` Ctrl+` ``) to sync your branch; this prevents conflicts from stale branches
- On GitHub, check the PR's merge status section by pressing `D` toward the bottom of the Conversation tab; "This branch has conflicts" warns you before you waste review time
- Use issue comments to announce which files you are editing; press `D` to the "Add a comment" landmark on the issue and type your coordination message

</details>

<details>
<summary>Low vision users</summary>

- The "Update branch" button on a PR appears near the merge section at the bottom of the Conversation tab; it has a white-on-green style when available
- When multiple students are editing the same file, GitHub shows a yellow conflict banner; zoom in on the merge area to check for it before requesting review
- Draft PRs show a grey "Draft" badge in the PR list; opening drafts early gives teammates visibility into which files you are changing

</details>

<details>
<summary>Sighted users</summary>

- Keep your PR small: a 5-file PR merges quickly and rarely conflicts; a 50-file PR almost certainly will
- The "Update branch" button appears on PRs that are behind the base branch; click it to merge the latest changes from main into your branch
- Draft PRs are shown with a grey "Draft" label in the PR list view; open them early so teammates can see your in-progress file changes

</details>


## Advanced Prevention: Understanding Fast-Forward Merges

When your branch is perfectly up to date with main and adds new commits on top, GitHub can do a "fast-forward" merge - main simply moves forward to your latest commit. No merge commit needed. No possibility of conflicts.

**How to achieve this:** Rebase your branch on main right before merging:

```bash
git checkout your-branch
git fetch origin
git rebase origin/main
git push --force-with-lease  # See warning below about force pushing
```

**Warning:** Force pushing rewrites history. Only do this on branches you alone control (not shared branches). Never force push to `main`.

For more on force pushing and rebasing, see the [Glossary](appendix-a-glossary.md#force-push).


## When Conflicts Are Actually Good

Conflicts indicate that multiple people are actively improving the project. In a healthy, collaborative environment, occasional conflicts are normal and manageable.

If you never have conflicts, it might mean:

- You're the only contributor (less review, less learning)
- PRs are moving too slowly (stagnation)
- People are avoiding working on important files (technical debt)

**The goal isn't zero conflicts.** The goal is catching them early, resolving them cleanly, and learning patterns that reduce future conflicts.


## Spotting a Conflict on GitHub

### Tool Cards: Resolve a Merge Conflict

**github.com (browser):**
1. On the PR page, click **Resolve conflicts** if the button is available.
2. Edit the file in the web editor to remove conflict markers.
3. Click **Mark as resolved**, then **Commit merge**.

**github.dev (web editor):**
1. Open the PR's branch by pressing `.` on the repository page.
2. Open the conflicting file -- conflict markers are highlighted in the editor.
3. Edit to resolve, commit via Source Control panel.

**VS Code Desktop:**
1. Pull the latest changes: `git pull origin main`.
2. VS Code highlights conflicts with **Accept Current / Accept Incoming / Accept Both** buttons.
3. Click your choice, save, stage, and commit.

**GitHub Desktop:**
1. **Branch > Update from main** (or the merge prompt banner).
2. GitHub Desktop opens your editor with conflict markers highlighted.
3. Resolve in the editor, return to GitHub Desktop, and click **Commit merge**.

**Git CLI (terminal):**
```bash
git merge main
# Edit conflicting files to remove <<<<<<< / ======= / >>>>>>>
git add resolved-file.md
git commit -m "resolve merge conflict"
```


When a PR has a merge conflict, you will see this message on the Conversation tab, near the merge section:

> “This branch has conflicts that must be resolved”

You will also see a “Resolve conflicts” button. If you cannot see it (it may require write access), contact the PR author.

<details>
<summary>Visual / mouse users</summary>

Scroll to the bottom of the Conversation tab. The conflict message appears as a yellow or orange banner above the merge button area. Click **Resolve conflicts** to open the web conflict editor.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The conflict banner sits near the bottom of the Conversation tab, above the merge button area. If your browser zoom is at 200% or higher, you may need to scroll past lengthy comment threads to reach it.

- The banner uses a yellow or orange background. In **Windows High Contrast** mode, it renders with the system alert color so it remains visible.
- The **Resolve conflicts** button is a standard link-style button. If it is hard to target at high zoom, use `Tab` to reach it after the merge status section and press `Enter`.
- If the button does not appear, you may lack write access to the repository. Ask the PR author or a maintainer for help.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Press `D` to reach the bottom of the Conversation tab
2. Navigate down with `H` or `↓` past the comment threads
3. Find the heading or region containing "This branch has conflicts"
4. Press `B` to find the **Resolve conflicts** button → `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` → Landmarks or `VO+Down` to move toward the bottom of the Conversation tab
2. Quick Nav `H` or `VO+Cmd+H` past comment headings until you reach the conflict notice
3. Quick Nav `B` to find the **Resolve conflicts** button → `VO+Space`

</details>


## Conflict Markers - What They Mean

When conflict markers appear in a file, your editor is showing you both versions of the conflicted content so you can choose. The format is always:

```text
<<<<<<< HEAD
The content that is on YOUR current branch
=======
The content coming from the OTHER branch (or main)
>>>>>>> branch-name-or-commit-hash
```

### Breakdown

- `<<<<<<< HEAD` - the start of YOUR version (HEAD = "the branch you are currently on")
- `=======` - the dividing line between the two versions
- `>>>>>>> branch-name` - the end of the INCOMING version (from the branch being merged in)

### Example in a real file

#### Original file (`docs/keyboard-shortcuts.md`) before conflict

```markdown
| Insert+Space | Toggle between Browse Mode and Focus Mode |
```

#### After two students both added a shortcut to the same table row

```
<<<<<<< HEAD
  Insert+Space -- Toggle between Browse Mode and Focus Mode
  Insert+F5 -- List elements by type
=======
  Insert+Space -- Toggle between Browse Mode and Focus Mode
  Insert+F7 -- Elements list (links, headings, form fields)
>>>>>>> add-nvda-shortcut
```

#### Resolution options

1. Keep your version: add only `Insert+F5`
2. Keep their version: add only `Insert+F7`
3. Keep both rows: add both shortcuts to the table (often the right answer when two students added different valid shortcuts)

### Learning Cards: Conflict Markers

<details>
<summary>Screen reader users</summary>

- Conflict markers are three lines: `<<<<<<< HEAD`, `=======`, and `>>>>>>> branch-name`; your screen reader may spell out each `<`, `=`, and `>` character individually
- Everything between `<<<<<<< HEAD` and `=======` is YOUR version; everything between `=======` and `>>>>>>>` is the INCOMING version
- After resolving, search the file for `<<<<` using `Ctrl+F` to verify no markers remain; any leftover markers will break the file

</details>

<details>
<summary>Low vision users</summary>

- In GitHub's conflict editor, each version is highlighted with a different background color (typically green for yours, blue for incoming); high-contrast themes use bolder system colors
- The three marker lines (`<<<`, `===`, `>>>`) span the full width of the editor; look for rows that contain only repeated symbols
- After resolving, zoom in on the edited area and confirm the marker lines are completely deleted, not just partially removed

</details>

<details>
<summary>Sighted users</summary>

- Conflict markers appear as three distinctive lines of repeated symbols: `<<<<<<<`, `=======`, and `>>>>>>>`; they visually bracket the two conflicting versions
- The `HEAD` label after `<<<<<<<` means "your current branch"; the branch name after `>>>>>>>` identifies where the incoming change came from
- After editing, delete all three marker lines plus the version you do not want; the remaining content should read naturally as valid code or Markdown

</details>


## Resolving Conflicts on GitHub (Web Editor)

GitHub has a built-in conflict editor that you can use without any local tools.

### Step-by-step: GitHub Conflict Editor

<details>
<summary>Visual / mouse users</summary>

1. Click **Resolve conflicts** on the PR Conversation tab
2. GitHub opens a full-page text editor showing each conflicted file
3. The conflict markers are highlighted - everything between `<<<<<<` and `=======` is your version; between `=======` and `>>>>>>>` is the incoming version
4. Edit the content directly: delete the lines you don’t want, including the three marker lines (`<<<`, `===`, `>>>`)
5. When the file looks correct, click **Mark as resolved** (top-right of the file)
6. If there are multiple conflicted files, a file list on the left lets you jump between them
7. After all files are resolved, click **Commit merge**

</details>

<details><summary>Low vision users (zoom, high contrast)</summary>

1. Open the conflict editor from the **Resolve conflicts** button on the PR Conversation tab.
2. GitHub opens a monospace text editor. At 200% zoom or higher, the editor scrolls horizontally. Use `Shift+Scroll` or horizontal scrollbar to navigate wide lines.
3. Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) are displayed in highlighted bands. In high-contrast themes, the markers use distinct system colors for good visibility.
4. The file list panel (left side) may collapse at high zoom levels. Look for a toggle or hamburger icon in the top-left corner to reopen it.
5. Edit directly in the editor: delete unwanted lines, including all three marker lines.
6. Click **Mark as resolved** in the top-right. At high zoom, this button may require horizontal scrolling to find. You can also `Tab` to reach it.
7. After all files are resolved, click **Commit merge**.

**Tip:** Increase your browser's minimum font size (Settings, Appearance, Font size) for a more comfortable editing experience in the conflict editor. This setting persists across GitHub pages.

</details>

<details><summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Activate the **Resolve conflicts** button from the PR Conversation tab
2. GitHub opens the conflict editor - a full-page text editor
3. Navigate between conflicted files using the file list (press `NVDA+F7` or `VO+U` to find the file navigation panel)
4. Switch to Focus Mode (`NVDA+Space`) to enter the text editor
5. Read the conflict markers line by line with `↓`:
   - `<<<<<<< HEAD` marks the start of your version
   - `=======` is the dividing line
   - `>>>>>>> branch-name` marks the end of the incoming version
6. Edit to keep the desired content - delete the conflict marker lines and the version you don't want
7. `Tab` to **Mark as resolved** button → `Enter`
8. Repeat for all conflicted files
9. `Tab` to **Commit merge** button → `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Activate the **Resolve conflicts** button from the PR Conversation tab
2. GitHub opens the conflict editor - a full-page text editor
3. `VO+U` → navigate to the file navigation panel to switch between conflicted files
4. `VO+Shift+Down` to interact with the text editor
5. `VO+Down` to read the conflict markers line by line:
   - `<<<<<<< HEAD` marks the start of your version
   - `=======` is the dividing line
   - `>>>>>>> branch-name` marks the end of the incoming version
6. Edit to keep the desired content - delete the conflict marker lines and the version you don't want
7. `VO+Shift+Up` to stop interacting, then `Tab` to **Mark as resolved** → `VO+Space`
8. Repeat for all conflicted files
9. `Tab` to **Commit merge** → `VO+Space`

</details>

### What it looks like in the editor

When the conflict editor opens, your screen reader will announce a text editor. In Focus Mode, navigate with arrow keys. The content reads:

```text
<  <  <  <  <  <  <  H  E  A  D
<button aria-label="Submit form">Submit</button>
=  =  =  =  =  =  =
<button type="submit">Send message</button>
>  >  >  >  >  >  >  f  e  a  t  u  r  e  /  f  o  r  m - i  m  p  r  o  v  e  m  e  n  t  s
```

*(Note: screen readers may spell out the `<` and `>` characters letter by letter - this is normal)*

### Learning Cards: Resolving Conflicts on GitHub

<details>
<summary>Screen reader users</summary>

- After clicking "Resolve conflicts," GitHub opens a text editor; switch to Focus Mode (`NVDA+Space`) and use `Down Arrow` to read line by line through the conflict markers
- After editing, press `Tab` to find the "Mark as resolved" button (top-right of the file); then `Tab` again to "Commit merge" after all files are resolved
- Use `NVDA+F7` to open the Elements List and find the file navigator if there are multiple conflicted files

</details>

<details>
<summary>Low vision users</summary>

- The conflict editor is a monospace text editor that may require horizontal scrolling at high zoom; use `Shift+Scroll` for wide lines
- The file list panel on the left shows all conflicted files; at high zoom it may collapse to a toggle icon in the top-left corner
- The "Mark as resolved" button is in the top-right of each file's editor; at 200%+ zoom you may need to scroll right to find it

</details>

<details>
<summary>Sighted users</summary>

- The conflict editor highlights your version and the incoming version with different background colors, with the `=======` divider between them
- A file list on the left side lets you jump between conflicted files; a checkmark appears next to each file after you click "Mark as resolved"
- After all files show checkmarks, the green "Commit merge" button becomes available at the top of the editor

</details>


## Resolving Conflicts in VS Code (Day 2)

> **See also:** [Appendix E: Advanced Git](appendix-e-advanced-git.md) covers rebase, cherry-pick, and other advanced conflict resolution strategies.

VS Code has excellent merge conflict tooling with full screen reader support. This is covered in depth in [Git & Source Control in VS Code](14-git-in-practice.md), but here is an overview:

### VS Code shows conflicts as

```
<<<<<<< HEAD (Current Change)
Your version
======= original                   -- (3-way merge, if enabled)
Original version before both edits
=======
Incoming version
>>>>>>> branch-name (Incoming Change)
```

### VS Code merge conflict actions

<details>
<summary>Visual / mouse users</summary>

When your cursor is on a conflict region, VS Code shows **CodeLens action links** above the conflict block in the editor:

- **Accept Current Change** - keeps your version (HEAD)
- **Accept Incoming Change** - keeps the branch version being merged
- **Accept Both Changes** - keeps both (stacked one after the other)
- **Compare Changes** - opens a side-by-side diff

Click the link you want. The conflict markers disappear and your chosen content remains. Save the file with `Ctrl+S`.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

VS Code highlights conflict regions with colored background bands:

- **Current Change** (your version) appears with a green-tinted background
- **Incoming Change** (their version) appears with a blue-tinted background

In high-contrast themes, these colors map to system theme colors that remain distinguishable. The **CodeLens action links** (Accept Current Change, Accept Incoming Change, Accept Both Changes, Compare Changes) appear as small text links above the conflict block.

**Tips for comfort at high zoom:**

- At 200% editor zoom (`Ctrl+=`), the CodeLens links remain clickable. If they feel small, use `Ctrl+Shift+P` and type `Merge Conflict: Accept Current` (or `Incoming`, `Both`) to trigger the same actions from the Command Palette without clicking.
- Enable **Editor, Minimap: Enabled = false** in settings to reclaim horizontal space at high zoom.
- Use `Ctrl+Shift+M` to open the Problems panel. After resolving markers, this panel confirms no remaining conflict errors.
- Use `F8` (Next Problem) to jump between remaining conflict regions across the file without scrolling.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Open the conflicted file
2. Press `↓` to navigate to a conflict marker (`<<<<<<<`)
3. The CodeLens links appear above - press `Tab` to reach them
4. Press `Enter` on your chosen action
5. Save the file (`Ctrl+S`)
6. Stage the resolved file: `Ctrl+Shift+G` → find the file → **Stage changes**
7. Commit the merge

**GitHub Copilot can help:** With the cursor in a conflict region, open Copilot Chat (`Ctrl+Shift+I`) and type: "Resolve this merge conflict - keep meaningful changes from both sides." Copilot will suggest a resolution that you can review and accept.

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Open the conflicted file
2. `VO+Down` or arrow keys to navigate to a conflict marker (`<<<<<<<`)
3. The CodeLens links appear above - `Tab` to reach them
4. `VO+Space` on your chosen action
5. Save the file (`Cmd+S`)
6. Stage the resolved file: `Cmd+Shift+G` → find the file → **Stage changes**
7. Commit the merge

**GitHub Copilot can help:** With the cursor in a conflict region, open Copilot Chat (`Cmd+Option+I`) and type: "Resolve this merge conflict - keep meaningful changes from both sides." Copilot will suggest a resolution that you can review and accept.

</details>


## When You Feel Stuck

### Ask for help - it's normal

If you are unsure which version to keep:

1. Leave a comment on the PR: "I have a merge conflict in `filename.js` and I'm not sure which version to keep - could someone help me understand the intent of these two changes?"
2. Tag the PR author or a maintainer with `@username`

### Abandon and start fresh (nuclear option)

If a conflict is severe (the branch diverged a lot from main):

1. Close the PR without merging
2. Start a new branch from the latest `main`
3. Apply only your intended changes to the new branch
4. Open a new PR

This is legitimate - not a failure.

### Learning Cards: When You Feel Stuck

<details>
<summary>Screen reader users</summary>

- Leave a PR comment asking for help: press `D` to the "Add a comment" landmark, type your question including the filename and your confusion, then `Ctrl+Enter` to submit
- Use `@username` to tag the PR author or a maintainer so they receive a notification; type `@` and GitHub autocompletes usernames
- If you need to abandon and start fresh, close the PR (Tab to "Close pull request" button), create a new branch from main, and re-apply only your intended changes

</details>

<details>
<summary>Low vision users</summary>

- When stuck, scroll to the comment box at the bottom of the PR's Conversation tab and describe which file and which lines are confusing
- The "Close pull request" button is at the bottom of the Conversation tab next to the comment box; closing a conflicted PR is a valid strategy, not a failure
- After starting a new branch, verify you are on the latest main by checking the branch selector in the top-left of the Code tab

</details>

<details>
<summary>Sighted users</summary>

- Post a comment on the PR with a screenshot or code snippet showing the conflict you cannot resolve; tag the author with `@username`
- The "Close pull request" button is a red-outlined button at the bottom of the Conversation tab; use it to close and start fresh if the conflict is severe
- When starting over, use the branch dropdown on the Code tab to verify you branched from the latest `main` before re-applying your changes

</details>


## Reading a Conflict Message from Git (Command Line Reference)

If you work locally, `git merge` or `git pull` will say:

```text
CONFLICT (content): Merge conflict in src/index.html
Automatic merge failed; fix conflicts and then commit the result.
```

And `git status` will show:

```text
both modified: src/index.html
```

These are normal outputs. The conflict markers are inserted into the file by Git - open the file and follow the steps above.

<details>
<summary>Git CLI alternative - resolving conflicts in the terminal</summary>

Resolve merge conflicts entirely from the command line:

```bash
# 1. Start the merge that causes the conflict
git merge main

# 2. See which files have conflicts
git status
# Look for "both modified:" entries

# 3. Open each conflicted file in your editor
# Edit the file: remove <<<<<<, =======, >>>>>> markers
# Keep the content you want

# 4. After editing, mark the file as resolved
git add src/index.html

# 5. Complete the merge
git commit
# Git auto-fills the merge commit message

# Check the result
git log --oneline -3
```

</details>

<details>
<summary>GitHub CLI (gh) alternative - checking PR conflict status</summary>

Check whether a PR has conflicts without opening a browser:

```bash
# View PR status (shows merge state)
gh pr view 42

# Check all PR checks and merge readiness
gh pr checks 42

# View the diff to understand what changed
gh pr diff 42
```

If conflicts exist, the `gh pr view` output shows "This branch has conflicts that must be resolved." Resolve locally using `git merge` (above) then push, or use the web editor.

</details>


## Summary Checklist

```text
Before you start:
  □ My PR is small and focused (fewer conflicts = easier life)
  □ I checked that others aren't editing the same files

When you see a conflict:
  □ Don't panic - conflicts are normal
  □ Read both versions (between <<< and ===, and between === and >>>)
  □ Decide: keep one, keep both, or combine intelligently
  □ Remove ALL three conflict marker lines (<<<, ===, >>>)
  □ Verify the final file makes sense
  □ Mark as resolved → Commit merge

After resolving:
  □ Re-check that the PR description and issue link are still accurate
  □ Comment on the PR: "Resolved merge conflict - kept both the aria-label and type attribute"
  □ Request re-review if reviewers already approved before the conflict was introduced
```


## Try It: Read a Conflict (Without Fear)

**Time:** 2 minutes | **What you need:** Any text editor or just read below

Read this merge conflict aloud. The goal is not to resolve it - just to understand what you're hearing:

```text
The button should have an
<<<<<<< HEAD
aria-label="Submit form"
=======
aria-label="Send your response"
>>>>>>> feature-branch
attribute for screen readers.
```

Answer these three questions:

1. **What does your branch say?** (The text between `<<<<<<< HEAD` and `=======`)
2. **What does the other branch say?** (The text between `=======` and `>>>>>>>`)
3. **Which version would you keep, and why?**

**You're done.** You just read a merge conflict. That's the entire skill - everything else is just choosing which lines to keep and deleting the three marker lines.

> **What success feels like:** Conflicts aren't mysterious anymore. They're just two versions side by side with markers telling you which is which. You already know how to pick the right one.


> ### Day 2 Amplifier - Copilot Chat & Conflict Prevention
>
> **Resolve at least one conflict completely by hand before using any AI assistance.** You must be able to read `<<<<<<<`, `=======`, and `>>>>>>>` markers and understand what each version represents. An AI-suggested resolution you cannot independently verify is a liability - you are accepting a change you do not understand into a codebase other people depend on.
>
> Once you have mastered manual conflict resolution:
>
> - **In VS Code** - Copilot Chat (`Ctrl+Shift+I`) can explain a conflict in plain language - *"Person A renamed the button to 'Submit Form'; Person B renamed it to 'Send Message'. Which intent should take priority?"* - but you decide what survives
> - **In your repo** - Accessibility Agents' `@pr-review` can identify high-risk overlapping changes before a conflict occurs, flagging when two contributors are editing the same file area and giving you time to coordinate before it escalates
> - **In the cloud** - GitHub Agentic Workflows can detect stale PRs diverging from `main` and automatically notify contributors with a suggested rebase checklist - preventing the conflict before it is ever introduced
>
> *Understanding conflict markers is not a stepping stone to letting AI handle conflicts. It is the skill that tells you when AI got it wrong.*

---

*Next: [Chapter 08: Open Source Culture](08-open-source-culture.md)*  
*Back: [Chapter 06: Working with Pull Requests](06-working-with-pull-requests.md)*  
*Related appendices: [Appendix E: Advanced Git](appendix-e-advanced-git.md)*

