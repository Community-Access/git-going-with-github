# Git Going with GitHub - Audio Series

## Episode 3: Navigating Repositories

**Series:** Git Going with GitHub
**Episode:** 3 of 44
**Audience:** Blind and low-vision developers learning GitHub and open source
**Estimated length:** 12-15 min


### Audio Production Direction

Generate a conversational two-host podcast episode about this topic.
The audience is blind and low-vision developers attending a two-day workshop on GitHub.

**Tone and style:**

- Welcoming and encouraging - many listeners are encountering these concepts for the first time
- Use spatial and structural descriptions, not visual references
- Say "navigate to" or "move to the section called" instead of "look for" or "you will see"
- Define technical terms on first use - do not assume familiarity with programming jargon
- Focus on deep conceptual understanding - explain WHY, not just HOW
- Share practical tips, common mistakes, and real-world context
- When describing keyboard shortcuts, say the full key names: "Control plus Shift plus P" not "Ctrl+Shift+P"
- Keep the conversation natural - two hosts discussing the topic, not reading a script
- Include at least one real-world analogy per major concept
- End with a brief summary of key takeaways and what comes next

**Episode focus:**

- What a repository is and what it contains
- The tab bar: Code, Issues, Pull Requests, Actions, and more
- Reading the file tree, README, and commit history
- Navigating branches and understanding the default branch
- Cloning a repository to your computer


### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

- [ ] **What a repository is: a project folder tracked by Git**
- [ ] **The repository tab bar: Code, Issues, Pull Requests, Actions, Settings**
- [ ] **The Code tab: file tree, README rendering, branch selector**
- [ ] **What a branch is and why repositories have them**
- [ ] **The default branch (usually main) and what it means**
- [ ] **Reading commit history: who changed what and when**
- [ ] **What cloning means: copying a remote repo to your computer**
- [ ] **The difference between cloning and forking**
- [ ] **Using gh repo clone versus git clone versus downloading a ZIP**
- [ ] **The About section, topics, and license on a repository page**

### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

- Episode 2: GitHub page structure, headings, keyboard shortcuts

### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

- Glossary - repository, branch, commit, clone, fork

### Primary Source Material

# Navigating Repositories
> **Listen to Episode 3:** [Navigating Repositories](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## A Screen Reader Guide to GitHub Repositories

> This guide covers everything you need to explore a GitHub repository using your keyboard and screen reader. No mouse required.


## What Is a Repository Page?

When you navigate to a GitHub repository (e.g., `https://github.com/owner/repo-name`), you land on the **repository home page** (also called the Code tab). This page has several distinct regions:

```
┌────────────────────────────────────────────────────┐
│  Navigation bar (GitHub global nav)                │
│  avatar menu | Notifications | search               │
├────────────────────────────────────────────────────┤
│  Repository header                                  │
│  owner / repo-name  (h1)                            │
│  [Star] [Watch] [Fork] buttons                      │
├────────────────────────────────────────────────────┤
│  Repository navigation tabs (landmark)              │
│  < Code > Issues  Pull requests  Actions  etc.      │
├─────────────────────────────┬──────────────────────┤
│  File tree / code panel     │  Sidebar              │
│  Branch selector            │  About section        │
│  Files table (t:table)      │  Topics               │
│  Last commit message         │  Releases             │
├─────────────────────────────┴──────────────────────┤
│  README.md (rendered)                               │
│  (a separate landmark region)                       │
└────────────────────────────────────────────────────┘
```


## Landing on a Repository - What to Expect

When you first navigate to a repo URL:

1. **The page title** is announced with the format: `owner/repo-name: Short description - GitHub`
2. **First heading** (`1` key) will navigate to the repo name: "owner/repo-name"
3. **The tab bar** is a landmark labeled "Repository navigation"

### Orientation sequence (do this on every new repo)

```
Step 1: Press 1 - hear the repo name
Step 2: Press D - navigate through landmarks to learn page structure
Step 3: Press NVDA+F7 (or VO+U) - scan headings to understand what's on the page
```


## Navigating the Repository Tabs

The main tabs are: **Code**, **Issues**, **Pull Requests**, **Discussions**, **Actions**, **Projects**, **Wiki**, **Security**, **Insights**, and **Settings** (Settings only visible to maintainers). Not all tabs appear on every repository - Discussions, Wiki, and Projects must be enabled by the repository owner.

### How to reach the tabs

<details>
<summary>Visual / mouse users</summary>

The tab bar is visible just below the repository name. Click the tab you want - **Code**, **Issues**, **Pull requests**, etc. The active tab is underlined. The number next to a tab (e.g., "Issues · 14") shows how many open items are in that section.

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

The files table is the core of the Code tab - it shows every file and folder in the repo.

### Reaching the files table

<details>
<summary>Visual / mouse users</summary>

The file table is the main panel of the Code tab, showing folders and files with their most recent commit message and how long ago each was changed. It’s visible immediately below the branch selector. Click any folder name to open it, or click a file name to view the file.

</details>

<details>
<summary>Screen reader users</summary>

Press `T` to jump to the next table on the page. The first table you will hit is usually the files table. NVDA will announce: “Table with [N] rows and 3 columns.”

</details>

The three columns are:
1. **Name** - file or folder name
2. **Message** - the most recent commit message that changed this file
3. **Age** - how long ago that commit happened

### Navigating the files table

| Goal | Keys (NVDA/JAWS) | Keys (VoiceOver) |
|------|-----------------|-----------------|
| Move down one row (next file) | `Ctrl+Alt+↓` | `VO+Shift+↓` |
| Move up one row | `Ctrl+Alt+↑` | `VO+Shift+↑` |
| Move right one column | `Ctrl+Alt+→` | `VO+Shift+→` |
| Move left one column | `Ctrl+Alt+←` | `VO+Shift+←` |
| Open a file or folder | `Enter` (on the Name column) | `VO+Space` |

**Reading a row:**
Navigate to the Name column, hear the filename, then move right to read the commit message, then right again for the age. For example: "docs/ | Add accessibility guide | 3 days ago"

### Folder vs file
- Folders end with a `/` in the Name column
- When you open a folder, the page reloads showing the contents of that folder
- Press the back button or use the breadcrumb links to go back up


## The Branch Selector

The branch selector button sits just above the files table. It lets you switch which branch you are viewing.

### How to open the branch selector

<details>
<summary>Visual / mouse users</summary>

Mouse users see the current branch name as a button with a dropdown arrow (e.g., `main ▼`) just above the file table. Click it to open the branch list. Type to filter branches, then click a branch name to switch.

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

```
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
gh repo clone community-access/learning-room

# Clone and cd into the folder
gh repo clone community-access/git-going-with-github && cd git-going-with-github
```

**Or with standard Git:**

```bash
git clone https://github.com/community-access/git-going-with-github.git
cd git-going-with-github
```

**Setup:** Install the GitHub CLI from [cli.github.com](https://cli.github.com) and authenticate with `gh auth login`. See [Appendix D](appendix-d-git-authentication.md) for details.

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
4. Press `↑/↓` to browse options: Participating, All Activity, Ignore
5. Press `Enter` to confirm

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

```
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
|------|------|
| Read the file content | `↓` to read line by line |
| Jump to a specific line | Open Raw view (`R` button), then use browser `Ctrl+F` |
| View in Focus Mode | `NVDA+Space`, then `↓` arrows through lines |

### The file action buttons

Above the file content, there are buttons:
- **Raw** - view the file as plain text in a new page
- **Blame** - see which commit changed each line (see below)
- **History** - see the full commit history for this file
- **Edit (pencil)** - edit the file directly on GitHub (if you have write access or it's your fork)

**How to reach these buttons:**
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


## The Blame View

Blame shows you who changed each line of a file, in what commit, and when. It is useful for tracing why a particular change was made.

### Navigating Blame

1. From a file page, activate the "Blame" button
2. The page reloads in Blame view
3. The content is a table: **left column** = commit info (who, when, message), **right column** = the line of code

```
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

```
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

```
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


## GitHub Shortcuts for Repository Navigation - Spotlight

These are the GitHub built-in shortcuts you will use most on repository pages. They work by sending keystrokes directly to GitHub's JavaScript, so **enable Focus Mode first** (NVDA: `NVDA+Space`, JAWS: `Insert+Z`).

| Shortcut | What it does | When you need it |
|---|---|---|
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
> **Navigate every folder of `accessibility-agents` manually today before using any agent.** Find `.github/agents/`, open a `.agent.md` file, and read it - that file is how an agent knows what to do. You must understand the structure before you can evaluate whether an agent understood it correctly.
>
> Once you have mastered manual repository navigation:
> - **In VS Code** - `@daily-briefing morning briefing` sweeps every repository you have access to and delivers one prioritized document: open issues, PR status, CI results, security alerts, community reactions - all without opening a browser tab
> - **In your repo** - Fork [accessibility-agents](https://github.com/community-access/accessibility-agents) and the `.github/agents/` folder travels with every clone; every collaborator on your fork has access to the same agents you do
> - **In the cloud** - GitHub Agentic Workflows can generate daily status reports on a schedule, running inside GitHub Actions and posting digests to a designated issue thread - no VS Code, no local setup required
>
> *An agent's output only makes sense when you already know what it is describing. You are building that knowledge right now.*


*Next: [The Learning Room](03-the-learning-room.md)*
*Back: [Understanding GitHub's Web Structure](01-understanding-github-web-structure.md)*
*Reference: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*



### Supplementary: Glossary - repository, branch, commit, clone, fork

# Appendix A: GitHub Concepts & Glossary
> **Listen to Episode 18:** [Glossary of Terms](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Every Term You Need for Open Source Contribution

> This glossary is your reference for the entire two-day workshop. When you hear a term you don't recognize - check here first. Terms are grouped by category and also sorted alphabetically at the end.


## Part 1: The Building Blocks

### Repository (Repo)

A repository is the container for an entire project. It holds all the project's files, folders, documentation, and the complete history of every change ever made. Think of it as a project folder that has a time machine built in - you can see every version of every file going back to the beginning.

A repository lives on GitHub at an address like: `https://github.com/owner/repo-name`

**Related terms:** remote repository (the one on GitHub), local repository (a copy on your computer), upstream (the original repo), fork (your personal copy)


### Organization (Org)

An organization is a group account on GitHub that multiple people can belong to. Open source projects typically live inside an organization rather than under a personal account. For example: `https://github.com/microsoft/vscode` - here `microsoft` is the organization and `vscode` is the repository.


### Fork

A fork is a personal copy of someone else's repository, living in your own GitHub account. When you fork a repo, you get all its files and history. Changes you make to your fork do not automatically affect the original. To propose your changes to the original project, you submit a pull request.

**Why fork?** You do not have write access to most open source repos. Forking lets you work freely and then propose changes.


### Remote

A remote is a connection to a repository hosted elsewhere (usually on GitHub). Your local Git repository can have multiple remotes. The most common remotes are:

- **`origin`** - your fork on GitHub
- **`upstream`** - the original repository you forked from

When you run `git push origin main`, you're pushing your local `main` branch to the remote named `origin`.

**To see your remotes:**
```bash
git remote -v
```

**To add a remote:**
```bash
git remote add upstream https://github.com/original-owner/repo.git
```


### Origin

`origin` is the default name Git gives to the remote repository you cloned from. When you clone your fork, `origin` points to your fork on GitHub. 

Commands like `git push` and `git pull` default to using `origin` unless you specify otherwise.


### .gitignore

`.gitignore` is a special file in the root of your repository that tells Git which files or folders to ignore - meaning Git will not track or commit them.

**Why use .gitignore?**

- Prevent committing temporary files (`.DS_Store`, `Thumbs.db`)
- Ignore build outputs (`dist/`, `build/`, `node_modules/`)
- Keep secrets out of Git (`.env` files, API keys, credentials)
- Avoid committing IDE-specific files (`.vscode/`, `.idea/`)

**Example `.gitignore`:**

```
# Dependencies
node_modules/
vendor/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

**Important:** `.gitignore` only ignores **untracked** files. If you already committed a file, you must remove it from Git's tracking first:

```bash
git rm --cached filename
```

Then add it to `.gitignore` and commit the change.


### Clone

Cloning copies a repository from GitHub to your local computer so you can work with it in VS Code or your preferred editor. When you clone, you get all the files and the complete history.

```
git clone https://github.com/your-username/repo-name.git
```

**Fork vs Clone:** Fork = your copy on GitHub. Clone = a copy on your computer. You usually clone your fork.


### Branch

A branch is a separate line of development inside a repository. The main branch (often called `main` or `master`) holds the stable, released version of the project. When you want to add a feature or fix a bug, you create a new branch so your work doesn't affect `main` until it's ready.

Think of branches like parallel timelines - each branch is its own version of the project that can evolve independently and be merged back together later.

**Common branch names:**
- `main` - the primary, stable branch
- `develop` - integration branch (not all projects have this)
- `feature/my-new-thing` - convention for feature branches
- `fix/broken-button` - convention for bug fix branches
- `docs/update-readme` - convention for documentation-only branches


### Commit

A commit is a saved snapshot of your changes at a moment in time. Every commit has:
- A **message** describing what changed and why
- A unique **SHA hash** (a fingerprint like `a1b2c3d`)
- The **author** and timestamp
- The **changes** (additions and deletions to files)

Good commit messages are in the imperative mood: "Fix typo in README" not "Fixed typo" or "Fixing typo."

Example of a well-written commit message:
```
Fix broken link in accessibility guide

The link to the NVDA download page was using an outdated URL.
Updated to the current direct download page.

Fixes #42
```


### Diff

A diff (short for difference) shows what changed between two versions of a file. Lines that were **added** are shown in green (with a `+` prefix). Lines that were **removed** are shown in red (with a `-` prefix). Lines that are unchanged are shown in grey for context.

Reading diffs is one of the core skills for code review. When you view a Pull Request's "Files Changed" tab, you are reading a diff.


## Part 2: Collaboration Workflow

### Issue

An issue is a discussion item in a GitHub repository. Issues are used for:
- Reporting bugs
- Requesting features or improvements
- Asking questions
- Discussing ideas
- Tracking work items

Every issue gets a sequential number (like `#42`) and can have labels, assignees, milestones, and comments. Issues are the starting point for most contributions - it's best practice to open or find an issue before making code changes.


### Pull Request (PR)

A pull request is a proposal to merge changes from one branch into another. When you have finished working on your fork or feature branch, you open a PR to say "here is my work - please review it and consider merging it."

A PR shows:
- Which branch you want to merge into which target branch
- The diff (all changes you made)
- A description of what you changed and why
- Discussion threads and reviews from others

The name "pull request" means you are requesting that the maintainers pull your changes into their project.


### Code Review

Code review is the process of one or more collaborators reading and providing feedback on a PR before it is merged. Reviewers can:
- **Comment** - leave a note on a line (not a formal verdict)
- **Approve** - signal that they are happy with the changes
- **Request Changes** - indicate that specific things need to be addressed before merging

Good code reviews are kind, specific, and constructive.


### Merge

Merging is combining changes from one branch into another. When a PR is approved, a maintainer merges it. There are three merge strategies:

| Strategy | What It Does | When Used |
|----------|-------------|-----------|
| **Merge commit** | Creates a new commit recording the merge | Default on most projects |
| **Squash and merge** | Combines all PR commits into one commit | Keeping history clean |
| **Rebase and merge** | Replays commits on top of target branch | Linear history projects |


### Merge Conflict

A merge conflict happens when two branches have both changed the same part of the same file in different ways. Git doesn't know which version to keep, so it pauses and asks you to resolve it manually.

Conflict markers look like this in a file:

```text
<<<<<<< HEAD
The current content on your branch
=======
The incoming content from the other branch
>>>>>>> feature/other-branch
```

You resolve a conflict by editing the file to have the correct final content, removing the conflict markers, and then committing.

See [Merge Conflicts Guide](07-merge-conflicts.md) for step-by-step instructions.


### Upstream

Upstream refers to the original repository that you forked from. When the upstream project has new changes that you want to bring into your fork, you "sync" your fork with upstream.

```
Your Fork → upstream → Original Repo
Your changes flow this way: Original Repo ← Pull Request ← Your Fork
```


### Label

Labels are colored tags applied to issues and PRs to categorize them. Common labels:
- `bug` - something isn't working
- `enhancement` - new feature or request
- `documentation` - documentation-only change
- `good first issue` - good for newcomers (look for this when finding your first contribution!)
- `help wanted` - maintainers want community help
- `accessibility` - accessibility-related


### Milestone

A milestone groups issues and PRs toward a goal or deadline. For example: "v2.0 Release" or "Hackathon Day 1." Milestones show progress as a percentage of closed versus open items.


### Project (GitHub Projects)

A GitHub Project is a flexible board for tracking work. It can show issues and PRs in table view, board view (kanban), or roadmap view. Projects are especially useful for hackathon-style coordination.


## Part 3: People and Roles

### Maintainer

A maintainer is someone with write or admin access to a repository. Maintainers review PRs, triage issues, manage releases, and make decisions about the project's direction. Most open source projects have between one and five core maintainers.


### Contributor

Anyone who contributes to an open source project is a contributor. Contributing includes code, documentation, design, testing, translation, issue triage, and community support. You do not need commit access to contribute.


### Triage

Triaging issues means reviewing new issues to categorize them, add labels, assign them, close duplicates, and communicate with the reporter. Triage is an important contribution that doesn't require coding skills.


### Collaborator

A collaborator is someone who has been explicitly granted write access to a repository. Collaborators can commit directly to the repo without forking (though good practice is still to use branches and PRs).


## Part 4: Common Abbreviations and Slang

These abbreviations appear frequently in GitHub comments, PR descriptions, and commit messages:

| Term | Stands For | Meaning |
|------|-----------|---------|
| **LGTM** | Looks Good To Me | Informal approval - "I reviewed it and it looks correct" |
| **WIP** | Work In Progress | This PR is not ready for review yet |
| **nit** | Nitpick | A minor, optional suggestion - "not a blocker" |
| **RFC** | Request For Comments | Seeking broad feedback on an idea or approach |
| **PTAL** | Please Take A Look | Asking someone to review something |
| **IMO / IMHO** | In My (Humble) Opinion | Softening a suggestion |
| **AFAICT** | As Far As I Can Tell | "Based on what I can see..." |
| **TIL** | Today I Learned | Sharing a discovery |
| **FYI** | For Your Information | Sharing information, no action needed |
| **EOD / EOW** | End of Day / Week | Deadline |
| **Closes #42** | - | When merged, this PR closes issue #42 (automatic linking) |
| **Fixes #42** | - | Same as Closes - use when the PR fixes a bug |
| **Resolves #42** | - | Same as Closes - general resolution |
| **Refs #42** | References #42 | Links to the issue without closing it |
| **cc @username** | Carbon copy | Notifying someone without requiring their action |
| **/cc** | Same as cc | Alternative form |
| **stale** | - | An issue or PR with no recent activity |
| **WONTFIX** | - | The project won't address this issue (it's not a bug, or by design) |
| **upstream** | - | The original repo you forked from |
| **downstream** | - | A fork or project that depends on this one |
| **breaking change** | - | A change that will break existing functionality for users |


## Part 5: Technical GitHub Concepts

### HEAD

`HEAD` is Git's way of saying "where you are right now." It's a pointer to the current commit on the current branch.

- When you're on `main`, `HEAD` points to the latest commit on `main`
- When you switch branches, `HEAD` moves to that branch
- `HEAD^` or `HEAD~1` means "the commit before HEAD"

You'll see HEAD referenced in commands like:
```bash
git reset HEAD~1  # Undo the last commit
git diff HEAD     # Show uncommitted changes
```


### Detached HEAD

A "detached HEAD" occurs when you check out a specific commit instead of a branch. You're no longer "on" a branch - just looking at a snapshot in time.

**Why it happens:**
```bash
git checkout a1b2c3d  # Checking out a commit directly
```

**What this means:**
- Any commits you make won't belong to any branch
- If you switch branches, those commits become "orphaned"

**How to fix it:**
If you made commits in detached HEAD state and want to keep them:
```bash
git branch new-branch-name  # Creates a branch from your current position
git checkout new-branch-name
```

**Screen reader note:** Git will warn you verbosely when entering detached HEAD state. Read the guidance carefully.


### Stash

`git stash` temporarily saves your uncommitted changes and reverts your working directory to a clean state. It's useful when you need to switch branches but aren't ready to commit.

**Common workflow:**
```bash
# You're working on branch A
git stash  # Save your changes temporarily
git checkout main  # Switch to main
# Do something on main...
git checkout branch-a  # Switch back
git stash pop  # Restore your changes
```

**Stash commands:**
- `git stash` - save changes
- `git stash list` - see what's stashed
- `git stash pop` - restore and remove from stash
- `git stash apply` - restore but keep in stash
- `git stash drop` - delete a stash

**Use case:** "I need to quickly switch branches to check something, but I'm in the middle of work I'm not ready to commit."


### Rebase

Rebasing is an alternative to merging. Instead of creating a merge commit, rebase moves (replays) your commits on top of another branch.

**Merge:**
```
main:    A---B---C
               \
feature:        D---E---F
                         \
result:  A---B---C-------M (merge commit)
```

**Rebase:**
```
main:    A---B---C
feature:             D'---E'---F' (commits "replayed" on top of C)
```

**When to use rebase:**
- Keep a linear project history
- Clean up your branch before submitting a PR
- Incorporate upstream changes into your feature branch

**When NOT to rebase:**
- Shared branches (never rebase `main` or public branches)
- After pushing to GitHub (unless you're comfortable force pushing)

**Basic rebase workflow:**
```bash
git checkout feature-branch
git rebase main
# Fix any conflicts
git push --force-with-lease  # See Force Push below
```

**Screen reader note:** Rebase conflicts are resolved the same way as merge conflicts (edit file, remove markers, `git add`, `git rebase --continue`).


### Cherry-Pick

Cherry-picking applies a single commit from one branch onto another. It's like copy-pasting a commit.

**Use case:** You made a bug fix on the wrong branch and want to apply it to `main` without merging the whole branch.

```bash
git checkout main
git cherry-pick a1b2c3d  # Apply commit a1b2c3d to main
```

**When to use:**
- Extract a single fix from a larger feature branch
- Backport a bug fix to an older release branch
- Undo a commit on one branch but keep it on another

**Warning:** Cherry-picking duplicates commits (creates a new commit with the same changes). Avoid cherry-picking commits that are part of an active feature branch - it causes confusion.


### Fetch vs Pull

**`git fetch`** downloads changes from a remote repository but doesn't merge them into your current branch. It updates your local copy of remote branches (like `origin/main` or `upstream/main`) without touching your working files.

```bash
git fetch origin  # Download updates from origin
```

**`git pull`** = `git fetch` + `git merge`. It downloads changes **and** immediately merges them into your current branch.

```bash
git pull origin main  # Fetch + merge origin/main into current branch
```

**When to use fetch:**
- You want to see what changed without committing to merging
- You want to review changes before integrating them
- You're syncing upstream and want to inspect first

**When to use pull:**
- You know you want the latest changes merged immediately
- You're working alone on a branch

**Best practice for collaboration:** Use `fetch` first, review with `git log origin/main`, then decide to merge or rebase.


### Force Push

Force pushing (`git push --force` or `git push -f`) overwrites the remote branch with your local version, replacing its history. This is **dangerous** because it can delete commits that others have based work on.

**When force push is okay:**
- Your own feature branch that no one else is working on
- After rebasing to clean up history before merging a PR

**When force push is NEVER okay:**
- The `main` branch
- Shared branches where others have based work on your commits
- Public branches with collaborators

**Safer alternative: `--force-with-lease`**

```bash
git push --force-with-lease origin feature-branch
```

`--force-with-lease` only force pushes if no one else has pushed to the remote branch since you last fetched. If someone pushed changes, the command fails and warns you.

**Why force push is needed after rebase:**

When you rebase, Git rewrites commit history. The remote branch and your local branch now have conflicting histories. A normal `git push` fails. Force pushing resolves this by saying "trust my version."

**Rule of thumb:** If you're not sure whether you need to force push, you probably shouldn't.


### SHA / Hash

Every commit, file, and tree in Git is identified by a SHA hash - a 40-character string of letters and numbers (e.g., `a1b2c3d4e5f6...`). You will see shortened versions like `a1b2c3d` in the GitHub UI. These are unique fingerprints.


### Tag / Release

A tag marks a specific commit as significant - usually a version release like `v1.0.0`. Tags are permanent references (unlike branches, which move with each new commit). GitHub Releases are built on top of tags and can include release notes and downloadable files.


### Actions / Workflow / CI/CD

GitHub Actions is an automation platform built into GitHub. Workflows are automated scripts (written in YAML) that run in response to events - like a PR being opened or code being pushed. CI/CD stands for Continuous Integration / Continuous Deployment.

In practice: when you open a PR, you will often see automated checks run (tests, linting, accessibility checks). These are GitHub Actions. See [GitHub Actions & Workflows](appendix-q-github-actions-workflows.md) for a full explanation.


### Status Check

A status check is the result of an automated test or workflow run on a PR. Status checks show as:
- Green checkmark - all checks passed
- Red X - one or more checks failed
- Yellow dot - checks are still running

Maintainers often require status checks to pass before merging.


### Webhook

A webhook is an automated notification that GitHub sends to another service when something happens (a push, a PR opened, etc.). Webhooks power integrations with tools like Slack, project management systems, and CI services. As a contributor, you typically don't configure webhooks - they are set up by maintainers.


### GitHub Discussions

Discussions are a threaded forum built into GitHub, separate from Issues. They are used for open-ended conversation, Q&A, and community announcements. Not all projects use Discussions - some prefer issues or external forums.


### Profile

Your GitHub profile is your public identity. It shows your name, bio, location, repositories, contribution activity (the green squares), and pinned projects. Your profile URL is `https://github.com/your-username`.


### GitHub Copilot

GitHub Copilot is an AI-powered coding assistant. It suggests code, documentation, and commit messages. In this workshop, we use Copilot to help write issue descriptions, PR descriptions, documentation, and code. See [GitHub Copilot](13-github-copilot.md) for the full walkthrough.


## Part 6: Community Files

Every healthy open source project has these files in the root of the repository:

| File | Purpose |
|------|---------|
| `README.md` | Project overview, how to use it, how to contribute |
| `CONTRIBUTING.md` | How to contribute - setup, workflow, PR guidelines |
| `CODE_OF_CONDUCT.md` | Community standards and expectations |
| `LICENSE` | Legal terms for using the software |
| `SECURITY.md` | How to report security vulnerabilities responsibly |
| `CHANGELOG.md` | History of notable changes by version |
| `.github/ISSUE_TEMPLATE/` | Templates for bug reports, feature requests, etc. |
| `.github/PULL_REQUEST_TEMPLATE.md` | Template for PR descriptions |


## Alphabetical Quick Reference

| Term | Definition |
|------|-----------|
| .gitignore | File specifying which files Git should ignore |
| Assignee | Person responsible for an issue or PR |
| Base branch | The branch a PR merges INTO |
| Branch | A parallel line of development |
| Cherry-pick | Apply a specific commit from one branch to another |
| CI/CD | Continuous Integration / Continuous Deployment |
| Clone | Copy a repo to your local computer |
| Code review | Reviewing PR changes before merging |
| Codespaces | Cloud-based VS Code development environment |
| Collaborator | Someone with write access to a repo |
| Comment | Discussion note on an issue, PR, or specific line |
| Commit | A saved snapshot of changes |
| Compare branch | The branch a PR merges FROM |
| Contributor | Anyone who contributes to a project |
| Default branch | The main branch (usually named "main") |
| Detached HEAD | Checking out a specific commit instead of a branch |
| Diff | The visual difference between two file versions |
| Discussions | Threaded forum space for Q&A and community conversation |
| Draft PR | A PR not yet ready for review |
| Feature preview | Opt-in GitHub UI experiments |
| Fetch | Download remote changes without merging |
| Force push | Overwrite remote branch history (use with caution) |
| Fork | Your personal copy of another repo |
| Git | The version control system GitHub is built on |
| GitHub Pages | Free static site hosting from a GitHub repository |
| Gist | Shareable code snippet or small file collection |
| Hash / SHA | Unique identifier for a commit or object |
| HEAD | Pointer to your current commit/branch |
| Issue | A discussion item (bug, feature, question) |
| Label | Colored tag for categorizing issues/PRs |
| Maintainer | Person with repo write/admin access |
| Merge | Combining changes from one branch into another |
| Merge conflict | When two branches changed the same content differently |
| Milestone | A goal grouping related issues/PRs |
| Organization | A group GitHub account |
| Origin | Default name for the remote you cloned from (your fork) |
| PR | Pull Request |
| Pull | Fetch changes and merge them (`git pull`) |
| Pull Request | Proposal to merge your changes |
| README | The main project documentation file |
| Rebase | Replay commits on top of another branch |
| Release | A versioned snapshot with notes and downloads |
| Remote | A connection to a repository hosted elsewhere |
| Repository | A project container with all files and history |
| Review | Formal feedback on a PR (approve/comment/request changes) |
| SHA | Unique hash identifier |
| Squash merge | Combining all PR commits into one |
| Stash | Temporarily save uncommitted changes |
| Status check | Automated pass/fail result shown on a PR |
| Tag | A permanent named reference to a specific commit |
| Triage | Reviewing and categorizing new issues |
| Upstream | The original repo you forked from |
| Wiki | Multi-page documentation space in a repository |
| Tag | A permanent named reference to a specific commit |
| Triage | Reviewing and categorizing new issues |
| Upstream | The original repo you forked from |


*Appendix B - look up any term here at any point during the workshop.*
*Return to: [Day 1 Agenda](02-day1-agenda.md) | [Understanding GitHub's Web Structure](01-understanding-github-web-structure.md)*
*See also: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
