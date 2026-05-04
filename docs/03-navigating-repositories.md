# Navigating Repositories
>
> **Listen to Episode 3:** [Navigating Repositories](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix A: Glossary](appendix-a-glossary.md) | [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)
> **Authoritative sources:** [GitHub Docs: About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories) | [GitHub Accessibility Guide: Repositories](https://accessibility.github.com/documentation/guide/repos/)


## A Screen Reader Guide to GitHub Repositories

> This guide covers everything you need to explore a GitHub repository using your keyboard and screen reader. No mouse required.

> **Official GitHub Accessibility Guide:** GitHub publishes an NVDA-focused guide for navigating repositories with a screen reader at [Using GitHub Repositories with a Screen Reader](https://accessibility.github.com/documentation/guide/repos/). This chapter covers the same material with additional perspectives (VoiceOver, low vision, CLI) and workshop-specific guidance. Use the official guide as a companion reference.


## Workshop Recommendation (Chapter 2)

Chapter 2 is a **confidence-building orientation chapter**.

- **Challenge count:** none
- **Automation check:** none
- **Why:** this chapter teaches navigation foundations that are practiced in later issue and PR chapters.

### Safety-First Learning Pattern

Use this sequence before moving to graded chapters:

1. Learn the page structure (heading, landmarks, tabs).
2. Practice orientation (`1`, `D`, heading list).
3. Confirm readiness with a peer or facilitator.
4. Move to Chapter 4 for issue-based, traceable challenges.


### About Learning Cards in This Chapter

This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. Not every card appears at every step. Open the ones that match how you work.

The following table describes the four learning card types used in this chapter.

| Card | Who it helps | What it covers |
| --- | --- | --- |
| Visual / mouse | Sighted users navigating with a mouse or trackpad | Click targets, visual cues, layout orientation |
| Low vision | Users with magnification, zoom, or high-contrast themes | Zoom-friendly navigation, locating controls at high magnification |
| Screen reader (NVDA / JAWS) | Screen reader users on Windows | Keystroke sequences, Focus and Browse mode, landmark navigation |
| Screen reader (VoiceOver) | Screen reader users on macOS | VO key sequences, rotor usage, interaction model |


## What Is a Repository Page?

When you navigate to a GitHub repository (e.g., `https://github.com/owner/repo-name`), you land on the **repository home page** (also called the Code tab). This page has several distinct regions:

### Description

The repository home page is organized from top to bottom as follows. The Navigation bar (GitHub global nav) contains the avatar menu, Notifications, and search. Below that is the Repository header showing "owner / repo-name" as the H1 heading, plus Star, Watch, and Fork buttons. Next are the Repository navigation tabs (a landmark) with Code (active), Issues, Pull requests, Actions, and more. The main content area is split into two columns: on the left is the File tree / code panel with the branch selector, Files table (navigable as a table), and last commit message; on the right is the Sidebar with the About section, topics, and releases. Below both columns is the rendered README.md in a separate landmark region.


## Landing on a Repository - What to Expect

When you first navigate to a repo URL:

1. **The page title** is announced with the format: `owner/repo-name: Short description - GitHub`
2. **First heading** (`1` key) will navigate to the repo name: "owner/repo-name"
3. **The tab bar** is a landmark labeled "Repository navigation"

### Orientation sequence (do this on every new repo)

```text
Step 1: Press 1 - hear the repo name
Step 2: Press D - navigate through landmarks to learn page structure
Step 3: Press NVDA+F7 (or VO+U) - scan headings to understand what's on the page
```

> **Key landmark names you will hear with `D`:** Repository pages have three main landmark sections: **"Repository Navigation"** (the tab bar), **"Main"** (the file tree, branch selector, repo details, and contributors), and **"Repository Files Navigation"** (the rendered README content). Within each landmark, press `H` or `2` to navigate subsections - most are organized under heading level 2.


## Navigating the Repository Tabs

The main tabs are: **Code**, **Issues**, **Pull Requests**, **Discussions**, **Actions**, **Projects**, **Wiki**, **Security**, **Insights**, and **Settings** (Settings only visible to maintainers). Not all tabs appear on every repository - Discussions, Wiki, and Projects must be enabled by the repository owner.

### How to reach the tabs

<details>
<summary>Visual / mouse users</summary>

The tab bar is visible just below the repository name. Click the tab you want - **Code**, **Issues**, **Pull requests**, etc. The active tab is underlined. The number next to a tab (e.g., "Issues · 14") shows how many open items are in that section.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The tab bar is just below the repository name. At 200% browser zoom or higher:

- The tabs may wrap to two lines. Each tab remains a standard link.
- The active tab is indicated by an underline. In Windows High Contrast mode, the underline uses the system accent color.
- Tab counts ("Issues · 14") appear as part of each tab's text and remain readable at high magnification.
- If tabs are hard to click at high zoom, press `Tab` from the repo heading to cycle through each tab link sequentially.
- **Keyboard shortcut:** Press `G` then `I` to jump directly to Issues, or `G` then `P` for Pull requests. These two-key shortcuts work from any page in the repository.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. Press `D` to jump to the **"Repository navigation"** landmark
2. Press `K` or `Tab` to navigate between the tab links

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `VO+U` → Landmarks rotor → navigate to **"Repository navigation"**
2. `VO+Right` to move through items in the landmark

</details>

### Reading the tab labels

Each tab link reads with its name and the count of items: "Issues, 14 open" or "Pull requests, 3 open." The active tab is marked with `aria-selected="true"` - your screen reader will announce it as "selected" or "current."


## The Files Table

> **See also:** [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md) lists the keyboard shortcuts for navigating repository file trees.

The files table is the core of the Code tab - it shows every file and folder in the repo.

### Reaching the files table

<details>
<summary>Visual / mouse users</summary>

The file table is the main panel of the Code tab, showing folders and files with their most recent commit message and how long ago each was changed. It’s visible immediately below the branch selector. Click any folder name to open it, or click a file name to view the file.

</details>

<details><summary>Low vision users (zoom, high contrast)</summary>

The file table occupies the main content area of the Code tab. At high magnification:

- The table has three columns: Name, Message (last commit), and Date. At 200%+ zoom, the Message and Date columns may be truncated. Hover over truncated text to see the full message in a tooltip.
- Folder icons appear before folder names; file icons appear before file names. In Windows High Contrast mode, these icons use system colors with visible outlines.
- Click any folder or file name to navigate into it. The names are standard links with hover underlines.
- Use `Ctrl+F` (browser Find) to search for a specific file name rather than scrolling a long file list at high zoom.
- The **Go to file** button (`T` keyboard shortcut) opens a search-as-you-type file finder. This is the fastest way to navigate to a specific file at any zoom level.

</details>

<details><summary>Screen reader users</summary>

Press `T` to jump to the next table on the page. The first table you will hit is usually the files table. NVDA will announce: “Table with [N] rows and 3 columns.”

</details>

The three columns are:

1. **Name** - file or folder name
2. **Message** - the most recent commit message that changed this file
3. **Age** - how long ago that commit happened

### Navigating the files table

| Goal | Keys (NVDA/JAWS) | Keys (VoiceOver) |
| ------  | -----------------  | -----------------  |
| Move down one row (next file) | `Ctrl+Alt+↓` | `VO+Shift+↓` |
| Move up one row | `Ctrl+Alt+↑` | `VO+Shift+↑` |
| Move right one column | `Ctrl+Alt+→` | `VO+Shift+→` |
| Move left one column | `Ctrl+Alt+←` | `VO+Shift+←` |
| Open a file or folder | `Enter` (on the Name column) | `VO+Space` |

#### Reading a row

Navigate to the Name column, hear the filename, then move right to read the commit message, then right again for the age. For example: "docs/ | Add accessibility guide | 3 days ago"

### Folder vs file

- Folders end with a `/` in the Name column
- When you open a folder, the page reloads showing the contents of that folder
- Press the back button or use the breadcrumb links to go back up

### Learning Cards: The Files Table

<details>
<summary>Screen reader users</summary>

- Press `T` in Browse Mode to jump to the files table; NVDA announces "Table with N rows and 3 columns"
- Navigate rows with `Ctrl+Alt+Down Arrow`; each row reads: filename, last commit message, age
- Press `Enter` on the Name column to open a file or folder; press `Alt+Left Arrow` in your browser to go back

</details>

<details>
<summary>Low vision users</summary>

- The files table uses alternating row shading; switch to a high-contrast GitHub theme if rows blend together at your zoom level
- Folder icons (small triangle) appear before folder names; file icons (small document) appear before file names
- If the commit message column is truncated at high zoom, hover over it to see the full message in a tooltip

</details>

<details>
<summary>Sighted users</summary>

- The files table is the large panel in the center of the Code tab, listing folders first (alphabetically), then files
- The rightmost column shows relative timestamps like "3 days ago"; hover to see the exact date and time
- Click a folder name to drill into it; breadcrumb links above the table let you navigate back up the path

</details>


## The Branch Selector

The branch selector button sits just above the files table. It lets you switch which branch you are viewing.

### How to open the branch selector

<details>
<summary>Visual / mouse users</summary>

Mouse users see the current branch name as a button with a dropdown arrow (e.g., `main ▼`) just above the file table. Click it to open the branch list. Type to filter branches, then click a branch name to switch.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The branch selector button shows the current branch name (e.g., "main") with a dropdown arrow. It sits just above the file table.

- At high magnification, the button may wrap next to other controls. It is a standard button with visible border and text.
- Click it to open a dropdown with a search field and branch list. Type part of a branch name to filter the list.
- In the dropdown, branch names can be long. At high zoom, they may truncate. Hover for the full name.
- In Windows High Contrast mode, the currently active branch is highlighted with the system selection color.
- **Alternative:** Press `W` to open the branch/tag picker directly from the keyboard. This avoids needing to find and click the button.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. After reaching the repository navigation landmark, press `B` to navigate to buttons
2. The branch button reads: “[branch-name] branch” (e.g., “main branch”)
3. Press `Enter` to open the dropdown

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `Tab` to the branch button (it will be labeled with the current branch name)
2. `VO+Space` to open

</details>

### Inside the branch dropdown

```text
Step 1: The dropdown panel opens - it is a live region
Step 2: A search field appears - you can type to filter branches
Step 3: Press Tab to move to the results list
Step 4: Press ↓/↑ or Tab/Shift+Tab to navigate the list of branches
Step 5: Press Enter to switch to the selected branch
Step 6: Press Escape to close without switching
```

To return to the search field from the list: navigate to the tabs control at the top of the dropdown ("Branches" and "Tags" tabs), then use `Shift+Tab`.

**VoiceOver:** After activating the button, `VO+Down` to interact with the dropdown → `VO+Right` to navigate items.

### Switching to a tag

Tags mark specific releases or versions. The branch dropdown also provides tag navigation:

1. Open the branch button (same steps as above)
2. Inside the dropdown, navigate to the **tabs control** at the top (reads as "Branches tab" and "Tags tab")
3. Use `←/→` to switch to the **Tags** tab
4. `Tab` to move to the tags list
5. Navigate with `↑/↓` and press `Enter` to select a tag

The repository page reloads showing the code at that tagged version.


## Cloning a Repository

Cloning copies the repository to your local machine so you can work with it in VS Code or the terminal.

<details>
<summary>Visual / mouse users</summary>

1. On the repository’s main page (Code tab), find and click the green **Code** button above the file table
2. A popover opens showing **HTTPS**, **SSH**, and **GitHub CLI** tabs
3. Click the **HTTPS** tab (default) and click the **copy** icon next to the URL
4. Open your terminal, `cd` to where you want the folder, and run `git clone <pasted-URL>`
5. Alternatively, click **Download ZIP** to get a one-time archive without Git

</details>

<details>
<summary>Screen reader users</summary>

1. Press `1` or `Shift+1` to navigate to the repository h1 heading
2. Press `B` to navigate to the next button - look for the **“Code”** button
3. Press `Enter` or `Space` to open the Code flyout panel
4. The flyout has tabs: **HTTPS**, **SSH**, **GitHub CLI**
5. `Tab` to the HTTPS tab or SSH tab according to your preference
6. `Tab` to the “Copy url to clipboard” button and press `Enter`
7. The URL is now in your clipboard - paste it into VS Code or your terminal

**Alternative:** `Tab` further to find **Download ZIP** if you want a one-time copy without Git.

> **VoiceOver:** After activating the Code button, interact with the flyout panel with `VO+Shift+Down`. Use `VO+Right` to move to HTTPS/SSH tabs and `VO+Space` to select.

</details>

<details>
<summary>GitHub CLI (gh) alternative</summary>

Clone a repository with one command using the GitHub CLI:

```bash
# Clone using the repo's owner/name (no URL needed)
gh repo clone community-access/git-going-with-github

# Clone and cd into the folder
gh repo clone community-access/git-going-with-github && cd git-going-with-github
```

## Or with standard Git

```bash
git clone https://github.com/community-access/git-going-with-github.git
cd git-going-with-github
```

**Setup:** Install the GitHub CLI from [cli.github.com](https://cli.github.com) and authenticate with `gh auth login`. See [Appendix D](appendix-d-git-authentication.md) for details.

</details>

### Learning Cards: Cloning a Repository

<details>
<summary>Screen reader users</summary>

- Navigate to the green "Code" button with `B` (Browse Mode), press `Enter` to open the flyout, then `Tab` to reach the HTTPS URL and the "Copy url to clipboard" button
- After cloning in VS Code's terminal, press `Ctrl+Shift+E` to focus the Explorer panel; the cloned repository's file tree appears there
- If the clone fails with an authentication error, VS Code will open a browser tab for OAuth sign-in; press `Alt+Tab` to switch back after approving

</details>

<details>
<summary>Low vision users</summary>

- The green "Code" button is above the file table on the right side; at high zoom it may shift below the branch selector
- The clone URL in the flyout panel uses small monospace text; use the copy button (clipboard icon) instead of trying to select the text manually
- After cloning, VS Code's Explorer panel shows the folder tree on the left; zoom VS Code independently with `Ctrl+=` if needed

</details>

<details>
<summary>Sighted users</summary>

- The green "Code" dropdown shows three tabs: HTTPS (default), SSH, and GitHub CLI, each with a one-click copy button
- After cloning, look for a notification in VS Code's bottom-right corner asking "Would you like to open the cloned repository?"; click "Open"
- The Source Control icon in VS Code's Activity Bar shows a badge number when there are uncommitted changes in your clone

</details>

### Tool Cards: Clone a Repository

**github.com (browser):**
1. Click the green **Code** button above the file table.
2. Copy the HTTPS URL.
3. You will paste this into your local tool of choice below.

**github.dev (web editor):**
No clone needed. Press `.` on any repository page to open it in the browser-based editor instantly.

**VS Code Desktop:**
1. Press `Ctrl+Shift+P`, type **Git: Clone**, press `Enter`.
2. Paste the HTTPS URL and choose a local folder.
3. Click **Open** when prompted.

**GitHub Desktop:**
1. **File > Clone Repository** (or `Ctrl+Shift+O`).
2. Paste the URL or select from your GitHub account list.
3. Choose a local path and click **Clone**.

**Git CLI (terminal):**
```bash
git clone https://github.com/owner/repo.git
cd repo
```


## Fork vs. Clone vs. Branch - What Is the Difference?

These three concepts are related but serve different purposes. Students often confuse them, so here is a side-by-side comparison.

The following table compares forks, clones, and branches across six dimensions.

| Dimension | Fork | Clone | Branch |
| --- | --- | --- | --- |
| **What it creates** | A new repository on GitHub under your account | A local copy of a repository on your computer | A named pointer to a line of commits within the same repository |
| **Where it lives** | On GitHub (your account) | On your local machine | Inside any repository (local or remote) |
| **Relationship to original** | Linked (GitHub tracks the "parent" repo) | Independent copy (but has `origin` remote pointing to GitHub) | Part of the same repository |
| **When to use it** | Contributing to a repo where you do not have write access (most open source) | Working locally with Git and VS Code | Creating an isolated workspace for a feature, fix, or experiment |
| **How to contribute back** | Open a pull request from your fork to the original (upstream) repo | Push your branch to the remote, then open a PR | Open a pull request from your branch to `main` |
| **Workshop usage** | Not required for the Learning Room (you have direct write access) | Optional in Block 0 (for local Git work in Ch11+) | Required from Chapter 6 onward (feature branches for every PR) |

**In this workshop,** you will primarily use **branches** (Chapter 6 onward) and optionally **clone** the Learning Room for local work (Chapter 11). Forking is the standard workflow when contributing to repositories where you are not a collaborator, which is covered in [Contributing to Open Source](08-open-source-culture.md).

### Learning Cards: Fork vs. Clone vs. Branch

<details>
<summary>Screen reader users</summary>

- Fork: press `B` to find the "Fork" button on any repo page, then `Enter`; the fork creation page opens with fields for owner and name
- Clone: use the green "Code" button or run `gh repo clone owner/repo` in VS Code's terminal (`` Ctrl+` ``)
- Branch: you will create branches starting in Chapter 6; the branch selector (`W` shortcut in Focus Mode) lists all branches in the current repo

</details>

<details>
<summary>Low vision users</summary>

- The Fork button shows a count (e.g., "Fork 8") in the top-right of the repo page near Watch and Star
- After forking, your fork's URL changes to `github.com/your-username/repo-name`; check the address bar to confirm you are on your fork
- Branches are listed in the branch selector dropdown; the currently active branch is highlighted with your theme's selection color

</details>

<details>
<summary>Sighted users</summary>

- Fork, Watch, and Star buttons are grouped in the top-right corner of the repository page, right-aligned below the global nav
- A forked repo shows "forked from owner/repo" in small text just below the repository name
- Branches appear in the branch dropdown (click the branch name above the file tree); the default branch is usually labeled "main" or "master"

</details>


## Watching, Starring, and Forking

These three actions let you follow, bookmark, or copy a repository.

### Watching (subscribe to notifications)

<details>
<summary>Visual / mouse users</summary>

The **Watch**, **Star**, and **Fork** buttons are at the top-right of the repository page, just below the global navigation bar. Click **Watch** to open a dropdown of subscription options: **Participating and @mentions**, **All Activity**, or **Ignore**. Select your preference and click **Apply**.

</details>

<details>
<summary>Screen reader users</summary>

1. Press `L` to navigate through list items to reach the **Main** landmark
2. Continue pressing `L` until you find the **Watch** button (reads as “Watch this repository”)
3. Press `Enter` to open the subscription submenu
4. Press `↑/↓` to browse options: Participating, All Activity, Ignore, Custom
5. Press `Enter` to confirm
6. If you choose **Custom**, a dialog opens with checkboxes for specific activity types (Issues, Pull requests, Releases, Discussions, Security alerts). Check the boxes you want and activate the **Apply** button.

</details>

### Forking (create your own copy)

<details>
<summary>Visual / mouse users</summary>

Click the **Fork** button (top-right, next to Watch and Star). A page opens asking you to choose the owner and repository name for your fork. Fill in the details and click **Create fork**.

</details>

<details>
<summary>Screen reader users</summary>

1. Press `L` to navigate list items in the Main landmark
2. Press `I` to navigate individual list items until you find “Fork your own copy”
3. Press `Enter` to start the fork workflow
4. The fork creation page lets you choose the owner and repository name
5. Tab to “Create fork” and press `Enter`

</details>

### Starring (bookmarking)

<details>
<summary>Visual / mouse users</summary>

Click the **Star** button (top-right). The button changes to **Starred** with a filled star icon to confirm. Click it again to unstar.

</details>

<details>
<summary>Screen reader users</summary>

1. Press `L` to navigate list items in the Main landmark
2. Press `I` to navigate individual list items until you find “Star this repository”
3. Press `Enter` or `Space` to star
4. The button text changes to “Unstar” on the next focus

> **Tip:** If the Watch/Fork/Star area is not immediately found with `L`, press `D` to navigate to the **Main** landmark first, then use `I` to browse list items within that region.

</details>


## Viewing a Single File

When you open a file from the files table, the page shows the rendered content (for Markdown files) or the raw code (for code files).

### File page landmarks

```text
D → "Repository navigation" - repo tab bar
D → "Repository header" - file breadcrumb path
D → "Main" - the file content area
D → "Repository files navigation" - contains: Raw, Blame, History buttons
```

### Reading a Markdown file (like README.md)

The README renders with full heading structure. Use:

- `H` - navigate headings within the README
- `T` - find any tables
- `L` - find lists
- `K` - navigate links

### Reading a code file

Code files render as a table where each row is one line of code. Content is read line by line.

| Goal | Keys |
| ------  | ------  |
| Read the file content | `↓` to read line by line |
| Jump to a specific line | Open Raw view (`R` button), then use browser `Ctrl+F` |
| View in Focus Mode | `NVDA+Space`, then `↓` arrows through lines |

### The file action buttons

Above the file content, there are buttons:

- **Raw** - view the file as plain text in a new page
- **Blame** - see which commit changed each line (see below)
- **History** - see the full commit history for this file
- **Edit (pencil)** - edit the file directly on GitHub (if you have write access or it's your fork)

#### How to reach these buttons

Press `B` from within the file area, OR use `D` to navigate to the "Repository files navigation" landmark.

### Editing a file

<details>
<summary>Visual / mouse users</summary>

1. Open the file you want to edit
2. Click the **pencil icon** (Edit file) in the top-right of the file content area
3. The file opens in a web editor - click in the content area and edit
4. When done, scroll down to “Commit changes”, type a commit message, and click the green **Commit changes** button
5. Choose “Commit directly to `main`” (or your branch) and confirm

</details>

<details>
<summary>Screen reader users</summary>

1. Open the file you want to edit
2. Press `K` to navigate links until you find the **“Edit file”** link (may be labeled with a pencil icon description)
3. Press `Enter` to activate the link - the page opens in edit mode with a code editor textarea
4. Switch to Focus Mode: press `NVDA+Space` (NVDA) or `Insert+Z` (JAWS)
5. Make your changes using standard text editing keys
6. When done, press `Escape` to exit the textarea
7. Press `Shift+Tab` to navigate backwards to the **“Commit Changes”** button
8. Press `Enter` to open the commit dialog
9. Type your commit message in the dialog, then Tab to the confirm button and press `Enter`

> **Note:** Switch back to Browse Mode after step 6 (`NVDA+Space`) to use `Shift+Tab` more reliably to reach the commit button.

</details>

### Learning Cards: Viewing a Single File

<details>
<summary>Screen reader users</summary>

- On a Markdown file, the rendered content has full heading structure; press `H` to navigate headings within the file, `T` for tables, `K` for links
- On a code file, content reads as a table with one line per row; press `Down Arrow` in Focus Mode to read line by line
- The action buttons (Raw, Blame, History, Edit) are above the file content; press `B` or navigate to the "Repository files navigation" landmark with `D` to find them

</details>

<details>
<summary>Low vision users</summary>

- Markdown files render with styled headings and formatted text; code files render with syntax highlighting in a monospace font
- The Edit button (pencil icon) is in the top-right corner of the file content area; at high zoom it appears above the first line of the file
- Use the Raw button to view files as plain text in a new page, which can be easier to read at high zoom without the GitHub page chrome

</details>

<details>
<summary>Sighted users</summary>

- The file action buttons (Raw, Blame, History, pencil icon for Edit) are in a toolbar row above the file content
- Line numbers appear on the left side of code files; click a line number to highlight that line and generate a permalink URL
- The breadcrumb path above the file (e.g., "repo > docs > README.md") is clickable; each segment navigates to that folder level

</details>


## The Blame View

Blame shows you who changed each line of a file, in what commit, and when. It is useful for tracing why a particular change was made.

### Navigating Blame

1. From a file page, activate the "Blame" button
2. The page reloads in Blame view
3. The content is a table: **left column** = commit info (who, when, message), **right column** = the line of code

```text
T - jump to the blame table
Ctrl+Alt+→ - move from commit info column to code column
Ctrl+Alt+↓ - move to the next line
K - navigate the commit links (opens that commit's detail page)
```


## Commit History

Two ways to view history:

- **Repo-level history:** On the Code tab, find the "commits" link near the top (it shows a number like "1,234 commits"). Press `K` and navigate links to find it.
- **File-level history:** From any file page, activate the "History" button.

### Reading the Commits List Page

```text
H or 3 - navigate by date headings (commits are grouped by date)
I - navigate individual commit list items
K - navigate commit links (SHA hashes, short descriptions)
Enter - open a commit to see its diff
```

### Reading a Commit Page

A commit page shows:

- The commit message (heading)
- Author and date
- Parent commit link
- A diff for every file changed

```text
1 - go to commit message heading
H or 3 - navigate file headings in the diff
T - navigate to the stats table (files changed, lines added/deleted)
+ - skip table navigation and read file diffs by line
```


## Searching for a File

The "Go to file" shortcut is extremely useful when you know what you are looking for.

### How to use Go to File

1. Make sure you are on the Code tab of a repository
   - If hovercards are off, no navigation penalty - just navigate normally
2. Find the search box: press `F` or `E` to jump to the next edit field - look for one labeled "Go to file" or "Filter files by name"
3. Type the filename or partial path
4. Results appear as a dropdown - use `↓` to navigate, `Enter` to open

**GitHub keyboard shortcut:** `T` - opens the Go to File dialog.

**Screen reader conflict warning:** `T` normally means "next table" in NVDA/JAWS Browse Mode. GitHub's `T` shortcut conflicts with this. To use GitHub's `T` shortcut:

- **Option 1:** Switch to Focus Mode first (`Insert+Space` for NVDA, `Insert+Z` for JAWS)
- **Option 2:** Use `F` key to find the "Go to file" or "Find file" edit field instead
- **Recommended:** Option 2 is more reliable and doesn't require mode switching.

### Learning Cards: Searching for a File

<details>
<summary>Screen reader users</summary>

- Press `F` or `E` in Browse Mode to jump to the "Go to file" search field; type a filename and results appear as a dropdown navigable with `Down Arrow`
- The GitHub `T` shortcut also opens the file finder, but it conflicts with the "next table" key in Browse Mode; switch to Focus Mode first (`NVDA+Space`) or use `F` instead
- After selecting a result and pressing `Enter`, the file page loads; press `1` to hear the file name, then `H` to navigate its headings

</details>

<details>
<summary>Low vision users</summary>

- The "Go to file" button is near the top of the Code tab, above the file table; it opens a search overlay in the center of the screen
- Search results highlight matching characters in bold; at high zoom the overlay may cover part of the file table underneath
- Use browser `Ctrl+F` as a fallback to search for a filename visible in the file table without opening the overlay

</details>

<details>
<summary>Sighted users</summary>

- The "Go to file" button (or press `T`) opens a search-as-you-type overlay showing matching file paths as you type
- Results show the full file path with matching characters highlighted in bold; press `Enter` on a result to open the file
- Fuzzy matching works: typing "readme" matches "README.md" and "docs/readme.txt" and any other file with those characters in order

</details>


## GitHub Shortcuts for Repository Navigation - Spotlight

These are the GitHub built-in shortcuts you will use most on repository pages. They work by sending keystrokes directly to GitHub's JavaScript, so **enable Focus Mode first** (NVDA: `NVDA+Space`, JAWS: `Insert+Z`).

| Shortcut | What it does | When you need it |
| ---  | ---  | ---  |
| `?` | Show all shortcuts for this page | Any time - get the full context-specific list |
| `G C` | Jump to the Code tab | You're on Issues or PRs and want the file tree |
| `G I` | Jump to the Issues tab | You're browsing code and spot a bug to report |
| `G P` | Jump to the Pull Requests tab | You want to review open PRs |
| `G A` | Jump to Actions / workflow runs | You want to check CI status |
| `G G` | Jump to Discussions | You want to participate in project conversations |
| `G W` | Jump to Wiki | You want to view the repository wiki |

**How to use:** Press `G`, release it, then press the second letter. For example: press `G`, release, press `C` (not `G+C` together).
| `.` or `>` | Open repository in github.dev (VS Code in browser) | You want to edit a file or read code with VS Code shortcuts |
| `W` | Switch branch or tag | You want to browse a different branch of the code |
| `Y` | Expand URL to permanent canonical link | You want a link that always points to this exact commit |

**Press `?` now** on any GitHub repository page to see the live shortcut list for that specific context.

> **Screen reader tip - reading the shortcut dialog:** When the `?` dialog opens it is a modal overlay. Press `NVDA+Space` (NVDA) or ensure JAWS Virtual Cursor is active to browse the dialog content with `H` for headings and `↓` to read each shortcut. The dialog is **context-aware** - the shortcuts listed change based on the page you are on. Press `Escape` to close.

For the full shortcut system including issues, PRs, comments, and notifications, see [Screen Reader Cheat Sheet - GitHub Shortcuts section](appendix-b-screen-reader-cheatsheet.md#github-built-in-keyboard-shortcuts).

The sidebar (on desktop-width windows) contains:

- **About** - the repo description and topics
- **Releases** - recent published releases
- **Packages** - Docker/npm packages attached to the repo
- **Contributors** - the top contributors
- **Languages** - the percentage breakdown of programming languages

### Navigating the sidebar

The sidebar content is inside the "Main" landmark, after the files table and README. After the README, press `H` or `2` to reach "About" and the sidebar section headings.

**VoiceOver:** Navigate past the README section with `VO+Right` - the sidebar elements follow sequentially in the reading order.


## The Repository About Section

Quick way to check the project description, website link, and topics:

1. Press `D` to walk through landmarks
2. Look for a heading "About" in the sidebar
3. `2` or `H` to jump to that "About" heading
4. Then `↓` to read the description, URL, and topics


## Practical Scenarios

### Scenario A: "I want to find out what this project does"

1. Navigate to the repo URL
2. Press `1` - hear the repo name
3. `↓` - read the description (announced as a paragraph after the heading)
4. Navigate to README: `D` → "Repository files navigation" → `H` within the README

### Scenario B: "I want to find a good file to edit"

1. Open the files table with `T`
2. Navigate rows with `Ctrl+Alt+↓`
3. Move right with `Ctrl+Alt+→` to read the commit message (what's been changing recently)
4. When found, press `Enter` on the Name column to open the file

### Scenario C: "I want to know who has been working on this file recently"

1. Open the file
2. Activate the "Blame" button (`B` from the Repository files navigation landmark)
3. Navigate the blame table to see authors

### Scenario D: "I want to understand what changed in the last release"

1. Navigate to the sidebar "Releases" section (`H` or `2`)
2. Activate the latest release link
3. Read the release notes (rendered Markdown with headings and lists)

### Scenario E: "I want to contribute - where do I start?"

1. Navigate to the Code tab
2. Look for `CONTRIBUTING.md` in the files table
3. Open it and read the contributing guidelines
4. Then go to Issues tab and filter by `good first issue`


## If You Get Stuck

| Problem | What to do |
|---|---|
| Clone fails with "authentication required" | You need to sign in. See [Appendix D](appendix-d-git-authentication.md) for HTTPS authentication setup. |
| Cannot find the Code button for cloning | Press `B` to cycle buttons. The green "Code" button is above the file table. On narrow screens it may be hidden behind a "..." overflow menu. |
| File finder (`T` shortcut) does not open | Ensure you are in Focus Mode (NVDA: `NVDA+Space`). The `T` shortcut only works in the repository Code tab. |
| Forking creates a repo I did not expect | By default, forking copies only the default branch. Go to your fork's settings if you need to adjust. The original repo is untouched. |
| `G I` or `G P` shortcuts do not work | These require two separate key presses (G, release, then I or P), not simultaneous. Ensure Focus Mode is active first. |
| Everything else | Post a comment on your challenge issue describing what you tried. A facilitator or buddy will help. |


## Try It: The Five-Tab Tour

**Time:** 3 minutes | **What you need:** Browser with screen reader, signed in to GitHub

Navigate to the [Accessibility Agents repository](https://github.com/community-access/accessibility-agents) and do this:

1. **Code tab** - Press `D` to the "Repository navigation" landmark, then `K` to find "Code". Press `Enter`. You're on the file list.
2. **Issues tab** - Press `G` then `I` (Focus Mode first: `NVDA+Space`). How many open issues are there? Press `3` to jump through issue titles.
3. **Pull Requests tab** - Press `G` then `P`. Are there any open PRs?
4. **Find a file** - Press `T` (in Focus Mode) to open the file finder. Type `README` and press `Enter`. You just navigated straight to a file without scrolling.
5. **Read the README** - Press `1` to find the page title, then `2` to scan sections.

**You're done.** You just toured a real repository using only your keyboard.

> **What success feels like:** You visited four tabs and opened a file without touching a mouse. Every repository on GitHub has this same layout - you now know how to navigate all of them.


> ### Day 2 Amplifier - Accessibility Agents: `@daily-briefing`
>
> **Navigate every folder of [accessibility-agents](https://github.com/Community-Access/accessibility-agents) manually today before using any agent.** Find `.github/agents/`, open a `.agent.md` file, and read it - that file is how an agent knows what to do. You must understand the structure before you can evaluate whether an agent understood it correctly.
>
> Once you have mastered manual repository navigation:
>
> - **In VS Code** - `@daily-briefing morning briefing` sweeps every repository you have access to and delivers one prioritized document: open issues, PR status, CI results, security alerts, community reactions - all without opening a browser tab
> - **In your repo** - Fork [accessibility-agents](https://github.com/community-access/accessibility-agents) and the `.github/agents/` folder travels with every clone; every collaborator on your fork has access to the same agents you do
> - **In the cloud** - GitHub Agentic Workflows can generate daily status reports on a schedule, running inside GitHub Actions and posting digests to a designated issue thread - no VS Code, no local setup required
>
> *An agent's output only makes sense when you already know what it is describing. You are building that knowledge right now.*


> ➡️ **Next Step:** Move on to [Chapter 04: The Learning Room](04-the-learning-room.md) to understand where we'll be practicing our new skills.

---


*Next: [Chapter 04: The Learning Room](04-the-learning-room.md)*  
*Back: [Chapter 02: Understanding GitHub](02-understanding-github.md)*  
*Related appendices: [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*

