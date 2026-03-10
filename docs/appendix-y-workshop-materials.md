# Appendix Y: Accessing and Downloading Workshop Materials
>
> **Listen to Episode 42:** [Accessing Workshop Materials](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## How to Get, Read, and Keep These Documents

> **Why this appendix exists:** The workshop content is available in multiple formats - Markdown source files, pre-built HTML pages, and a live GitHub Pages site. This guide explains how to access each format, download materials for offline use, and keep your copy up to date.

### Learning Cards: Accessing Workshop Materials

<details>
<summary>Screen reader users</summary>

- The GitHub Pages site includes skip-to-content links and ARIA landmarks -- press `D` (NVDA) or `R` (JAWS) to jump to the main content landmark on any page
- On GitHub.com, press `T` on the repository's main page to open the file finder -- type any filename to jump directly to it without navigating the file tree
- After cloning the repository, open it in VS Code and use the Explorer panel (`Ctrl+Shift+E`) to browse the file tree with arrow keys

</details>

<details>
<summary>Low vision users</summary>

- The HTML version in the `html/` folder provides the most polished reading experience with styled, navigable pages that work offline in any browser
- For reading Markdown source files, use VS Code's built-in preview (`Ctrl+Shift+V`) which renders headings, links, and code blocks in a formatted view
- When downloading a ZIP from GitHub, the Code button and its dropdown appear near the top of the repository page -- look for the green button

</details>

<details>
<summary>Sighted users</summary>

- Three ways to access materials: GitHub Pages site (online, styled), GitHub.com (browse rendered Markdown), or local clone (offline, editable)
- The repository's `docs/` folder contains all Markdown source files; the `html/` folder contains pre-built HTML versions of every page
- Use `git clone` for a full copy you can update with `git pull` -- ZIP downloads are snapshots that do not update automatically

</details>


## Table of Contents

1. [Browsing Online (GitHub Pages)](#1-browsing-online-github-pages)
2. [Reading on GitHub.com](#2-reading-on-githubcom)
3. [Downloading Everything](#3-downloading-everything)
4. [Downloading Individual Files](#4-downloading-individual-files)
5. [What's in Each Folder](#5-whats-in-each-folder)
6. [Offline Reading](#6-offline-reading)
7. [Keeping Your Copy Updated](#7-keeping-your-copy-updated)
8. [Which Format Should I Use?](#8-which-format-should-i-use)


## 1. Browsing Online (GitHub Pages)

If the facilitator has enabled GitHub Pages for this repository, the workshop materials are available as a website at a URL like:

```text
https://<organization>.github.io/Learning-Room/
```

Your facilitator will share the exact URL. Once you have it:

1. Open the URL in your browser
2. The landing page (`index.html`) is the workshop homepage - equivalent to the README
3. Use headings (`H` key in NVDA/JAWS browse mode) to navigate within any page
4. All internal links between chapters and appendices work - click any cross-reference to go directly to that page
5. Bookmark the URL for quick access during the workshop

**Screen reader tip:** The HTML pages include skip-to-content links, breadcrumb navigation, and ARIA landmarks. Press `D` (NVDA) or `R` (JAWS) to jump to the main landmark on any page.

For details on how GitHub Pages works, see [Appendix P - Publishing with GitHub Pages](appendix-w-github-pages.md).


## 2. Reading on GitHub.com

You can read every file directly on GitHub.com without downloading anything:

1. Go to the repository page (your facilitator will share the link)
2. The README renders automatically as the repository homepage
3. Click into the `docs/` folder to see all chapters and appendices
4. Click any `.md` file - GitHub renders it as formatted text with headings, links, and code blocks

### Navigating the repository with a screen reader

- **File list:** The repository file listing is a grid. Use `T` to jump to the file table, then arrow keys to navigate rows
- **File content:** Once inside a file, GitHub renders the Markdown. Use `H` to navigate headings
- **Breadcrumbs:** At the top of each file view, breadcrumb links show the path (e.g., `Learning-Room / docs / 06-working-with-pull-requests.md`). Use these to navigate back
- **Go to File shortcut:** Press `T` on the repository's main page to open the file finder - type any filename to jump to it


## 3. Downloading Everything

### Option A: Clone with Git (recommended)

Cloning gives you a full copy of the repository that you can update later with `git pull`:

```bash
# Clone the repository
git clone https://github.com/community-access/Learning-Room.git

# Move into the folder
cd Learning-Room
```

After cloning, every file (Markdown source, HTML output, scripts, learning-room materials) is on your computer.

**Screen reader tip:** After cloning, open the folder in VS Code (`code .`) and use the Explorer panel (`Ctrl+Shift+E`) to browse the file tree. Press `Enter` on any file to open it in the editor.

### Option B: Download ZIP (no Git required)

If you do not have Git installed or prefer not to use the command line:

1. Go to the repository page on GitHub.com
2. Press `T` to find the file finder, or navigate to the green **Code** button (it is a dropdown button near the top of the file listing)
3. Activate the **Code** button - a dropdown menu opens
4. Choose **Download ZIP**
5. Save the file and extract it to a folder on your computer

#### Screen reader navigation for the Code dropdown

- The **Code** button is near the repository description, after the branch selector
- In NVDA/JAWS browse mode, press `B` to jump between buttons until you reach "Code"
- Activate it with `Enter` or `Space`
- The dropdown contains options including "Download ZIP" - arrow down to find it

**Note:** A ZIP download is a snapshot. It does not update automatically - see [Section 7](#7-keeping-your-copy-updated) for how to get updates.


## 4. Downloading Individual Files

To download a single file (for example, one chapter or the screen reader cheat sheet):

### From GitHub.com

1. Navigate to the file in the repository
2. Click the **Raw** button (it appears above the file content, in the toolbar with "Preview", "Code", "Blame" buttons)
3. The browser shows the raw file content
4. Press `Ctrl+S` (Windows/Linux) or `Cmd+S` (macOS) to save the page

**For HTML files:** Navigate to the `html/` folder and download the `.html` version of any file using the same Raw → Save method.

### From a cloned repository

If you have already cloned the repo, every file is already on your computer. Open the folder and copy whichever files you need.


## 5. What's in Each Folder

| Folder | Contents | Format |
| --------  | ----------  | --------  |
| `docs/` | All 17 chapters (00-16) and 31 appendices (A-Z, AA-AE) | Markdown (`.md`) |
| `html/` | Pre-built HTML versions of every Markdown file | HTML (`.html`) |
| `html/docs/` | HTML versions of all chapters and appendices | HTML (`.html`) |
| `learning-room/` | Practice repository files: challenges, group exercises, setup guides | Markdown (`.md`) |
| `html/learning-room/` | HTML versions of learning-room documents | HTML (`.html`) |
| `.github/` | Issue templates, PR template, Copilot agents, slash commands | YAML and Markdown |
| `scripts/` | Build script that converts Markdown to HTML | JavaScript |
| Root (`/`) | README, agendas, facilitator guide, contributing guide, and other project files | Markdown (`.md`) |


## 6. Offline Reading

Once you have downloaded or cloned the repository, you can read everything offline:

### Reading Markdown files

Open `.md` files in any text editor. They are plain text with lightweight formatting syntax. VS Code renders Markdown with a preview panel (`Ctrl+Shift+V`).

### Reading HTML files

1. Open `html/index.html` in any web browser
2. All internal links between pages work locally - no internet connection required
3. Navigate between chapters using the links at the bottom of each page

**Screen reader tip:** The HTML files work the same offline as online. All ARIA landmarks, heading structure, and skip links are embedded in each file.

### Recommended offline reading setup

- **VS Code with Markdown:** Open the repo folder in VS Code, browse the Explorer, and read files directly in the editor. Use `Ctrl+Shift+V` to open the rendered preview
- **Browser with HTML:** Open `html/index.html` and navigate from there - this gives the most polished reading experience


## 7. Keeping Your Copy Updated

### If you cloned with Git

```bash
# Navigate to your local copy
cd Learning-Room

# Pull the latest changes
git pull
```

If you have not made local changes, this updates your copy cleanly. If you have local edits, Git will attempt to merge - see [Chapter 7 - Merge Conflicts](07-merge-conflicts.md) if needed.

After pulling, rebuild the HTML to ensure it matches:

```bash
npm run build:html
```

### If you downloaded a ZIP

Download a fresh ZIP from the repository and replace your local copy. There is no incremental update for ZIP downloads.


## 8. Which Format Should I Use?

| Need | Best format | Why |
| ------  | -------------  | -----  |
| Reading during the workshop | **GitHub Pages** (online HTML) | No setup, always current, fully accessible |
| Offline reference | **Local HTML** (`html/` folder) | Works in any browser, no internet needed, styled and navigable |
| Editing or contributing | **Markdown** (`.md` files) | The source format - edit these, then rebuild HTML |
| Quick lookup of one section | **GitHub.com** | Navigate directly in the browser, no download |
| Archiving a copy | **ZIP download** or **Git clone** | Full snapshot of all materials |
| Staying updated long-term | **Git clone** | One-command updates with `git pull` |

### Learning Cards: Choosing the Right Format

<details>
<summary>Screen reader users</summary>

- For workshop use, the GitHub Pages HTML site is the most accessible option -- it includes skip links, landmarks, and proper heading structure in every page
- For offline reference, the local HTML files in the `html/` folder work identically to the online version with full navigation between pages
- For contributing edits, work with the Markdown source files in `docs/` using VS Code -- these are the canonical source that generates everything else

</details>

<details>
<summary>Low vision users</summary>

- GitHub Pages and local HTML both support browser zoom to 200%+ without layout breakage -- use whichever gives you a better reading experience
- VS Code's Markdown preview inherits your editor theme -- if you use a high-contrast theme, the preview will match
- If viewing on GitHub.com, enable GitHub's dark theme (Settings then Appearance) for reduced eye strain during long reading sessions

</details>

<details>
<summary>Sighted users</summary>

- Use the GitHub Pages site during the workshop for the most polished, hyperlinked reading experience with no setup required
- Clone the repository for a permanent offline copy -- the `html/index.html` file serves as a local homepage linking to all content
- The Markdown source in `docs/` is what you edit to contribute improvements -- changes are rebuilt to HTML automatically via the GitHub Actions workflow

</details>


*Return to: [Appendix X - Copilot AI Models](appendix-k-copilot-reference.md) | [Appendix A - Glossary](appendix-a-glossary.md) | [README](../README.md)*
