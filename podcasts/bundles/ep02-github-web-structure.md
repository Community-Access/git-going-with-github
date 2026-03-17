# Git Going with GitHub - Audio Series

## Episode 2: Understanding GitHub on the Web

**Series:** Git Going with GitHub
**Episode:** 2 of 44
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

- How GitHub organizes its web pages: repository, issue, PR, profile
- The heading structure and landmarks screen readers can use
- Keyboard shortcuts built into GitHub
- How to orient yourself on any GitHub page using headings and regions
- The difference between the dashboard, repository, and settings pages


### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

- [ ] **GitHub page types: dashboard, repository, issue, pull request, profile, settings**
- [ ] **The HTML heading hierarchy GitHub uses on each page type**
- [ ] **ARIA landmarks and regions on GitHub pages**
- [ ] **The global navigation bar and how to reach it by keyboard**
- [ ] **GitHub built-in keyboard shortcuts: pressing ? to see them**
- [ ] **The jump-to-content skip link on every GitHub page**
- [ ] **How to orient yourself on an unfamiliar page using headings**
- [ ] **The command palette: / or Control+K for quick navigation**
- [ ] **The difference between GitHub.com and github.dev**

### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

- Episode 1: You have a GitHub account and Git installed

### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

- Screen Reader Cheat Sheet - GitHub shortcuts

### Primary Source Material

# Understanding GitHub's Web Structure
> **Listen to Episode 2:** [Understanding GitHub on the Web](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## How GitHub Is Organized, and How to Orient Yourself on Every Page

> **Read this before navigating GitHub for the first time.** This lesson gives you the mental model that makes every subsequent guide easier. Once you understand how GitHub pages are built - their landmark structure, heading hierarchy, and URL patterns - you will know how to orient yourself on any page you land on, even ones this guide never mentions.


## Table of Contents

1. [GitHub's Three-Level Structure](#1-githubs-three-level-structure)
2. [What Is Always on Every GitHub Page](#2-what-is-always-on-every-github-page)
3. [How to Tell Where You Are](#3-how-to-tell-where-you-are)
4. [The Five Key Page Types](#4-the-five-key-page-types)
5. [Visual Map of a Repository Page](#5-visual-map-of-a-repository-page)
6. [Screen Reader Orientation Sequence](#6-screen-reader-orientation-sequence)
7. [Landmark Structure by Page Type](#7-landmark-structure-by-page-type)
8. [GitHub's Heading Hierarchy in Practice](#8-githubs-heading-hierarchy-in-practice)
9. [How GitHub's Layout Changes by Viewport](#9-how-githubs-layout-changes-by-viewport)
10. [The Mental Model - Building Your Internal Map](#10-the-mental-model--building-your-internal-map)


## 1. GitHub's Three-Level Structure

GitHub is not a single page or a single kind of page. It is three nested levels, and understanding which level you are on changes how you navigate.

```
Level 1: Your Account / Profile
   github.com/your-username
   github.com/settings/...
   github.com/notifications

Level 2: An Organization or User's Space
   github.com/microsoft
   github.com/community-access
   github.com/github

Level 3: A Repository - where all the work happens
   github.com/community-access/accessibility-agents
   github.com/community-access/accessibility-agents/issues
   github.com/community-access/accessibility-agents/pull/42
```

**Most of this workshop happens at Level 3.** Issues, pull requests, code, and actions all live inside a repository. When someone says "go to the repo," they mean Level 3.

> **Screen reader orientation tip:** The first heading (`H` then `1`) on any page tells you what level you are on. On a repository page, it reads "owner/repo-name." On your profile page, it reads your username. On a settings page, it reads the settings category name.


## 2. What Is Always on Every GitHub Page

No matter where you navigate on GitHub, the same global navigation bar is at the top of every page. Understanding its landmark structure means you always have a fixed orientation point.

### The Global Navigation Bar (always present)

Visually, the top bar contains (left to right):

| Element | What It Is | How to Reach It |
|---|---|---|
| GitHub logo / home link | Returns to your personal feed | First link in "Navigation Menu" landmark |
| Search bar | Global search across all of GitHub | `S` or `/` shortcut; or `D` → Navigation Menu → `K` to search |
| Copilot icon | Quick access to GitHub Copilot chat | `K` navigation from search bar |
| Pull Requests | Your PRs across all repos | `K` navigation |
| Issues | Your issues across all repos | `K` navigation |
| Notifications (bell) | Your notification inbox | `G` then `N` shortcut |
| Profile avatar | Account menu, settings, sign out | `K` to last link in nav; or go directly via URL |

**Screen reader landmark:** All of these live inside the landmark labeled **"Navigation Menu"**. Press `D` to cycle landmarks until you hear "Navigation Menu," then press `K` to move through the links inside it.

> **Important:** These are standard anchor links. You do not need to switch to Focus Mode to activate them. Press `Enter` in Browse Mode and they work.

### Secondary navigation (repository pages only)

When you are inside a repository, a second navigation bar appears below the global bar. This contains the repository's tabs:

```
Code | Issues | Pull requests | Actions | Projects | Wiki | Security | Insights | Settings
```

**Screen reader landmark:** This is labeled **"Repository navigation"**. Press `D` to jump to it directly.


## 3. How to Tell Where You Are

Three signals tell you exactly where you are on GitHub, without needing to see the visual layout:

### Signal 1: The URL

GitHub URLs are readable descriptions of your location:

| URL pattern | Where you are |
|---|---|
| `github.com` | Your personal feed / home |
| `github.com/username` | A user profile page |
| `github.com/org` | An organization profile |
| `github.com/owner/repo` | Repository home page (Code tab) |
| `github.com/owner/repo/issues` | Issues list |
| `github.com/owner/repo/issues/42` | A specific issue (number 42) |
| `github.com/owner/repo/pull/7` | A specific pull request (number 7) |
| `github.com/owner/repo/tree/main/docs` | A folder inside the repo |
| `github.com/owner/repo/blob/main/README.md` | A specific file |
| `github.com/owner/repo/commit/a1b2c3d` | A specific commit |
| `github.com/settings/accessibility` | Your accessibility settings |
| `github.com/notifications` | Your notification inbox |

**Screen reader tip:** Your browser's address bar is always reachable with `Alt+D` (Windows) or `Cmd+L` (Mac). Press it, listen to the URL, and you will know exactly where you are.

### Signal 2: The browser tab title

GitHub formats page titles consistently:

| Page type | Title format |
|---|---|
| Repository home | `owner/repo: Short description - GitHub` |
| Issues list | `Issues · owner/repo` |
| Specific issue | `Issue title · Issue #42 · owner/repo` |
| Pull request | `PR title · Pull Request #7 · owner/repo` |
| Your notifications | `Notifications - GitHub` |
| Settings | `Category - Settings` |

### Signal 3: The first H1 heading

Press `1` (in Browse Mode) on any GitHub page to jump to the first H1 heading. What you hear tells you what type of page you are on:

| You hear | You are on |
|---|---|
| `owner/repo-name` | Repository home page |
| `Issues` | Issues list |
| The issue title | Issue detail page |
| The PR title | Pull request detail page |
| Your username | Your profile page |
| A settings category name | A settings page |


## 4. The Five Key Page Types

### Page Type 1: Repository Home (Code Tab)

This is the central hub of any project. It is where you find the file tree, the README, branch information, and links to all other parts of the repository.

**What to expect:**
- H1: `owner/repo-name`
- Repository navigation landmark (Code, Issues, PRs, Actions tabs)
- A file tree table - navigate with `T` then `Ctrl+Alt+Arrow`
- A rendered README below the file tree
- A sidebar with About, Topics, Releases, Contributors

### Page Type 2: Issues List

A searchable, filterable list of all issues in the repository.

**What to expect:**
- H1: `Issues`
- A search and filter bar at the top
- Each issue is a link with: issue title, labels, number, author, comment count
- Issue titles are H3 headings - press `3` to jump between them
- Landmark: "Search Results List"

### Page Type 3: Issue Detail

The full view of a single issue: the original report, all comments, labels, assignees, and the timeline.

**What to expect:**
- H1: The issue title
- H2: "Description" (original issue body)
- H2: "Activity" (comments and events)
- Landmark: "Add a comment" (the reply box at the bottom)
- Sidebar: assignees, labels, milestone, linked PRs

### Page Type 4: Pull Request Detail

The most complex page on GitHub - it has three tabs (Conversation, Commits, Files Changed), each with its own structure.

**What to expect:**
- H1: The PR title
- Landmark: "Pull request tabs" (Conversation, Commits, Files changed)
- Conversation tab: same structure as an issue detail
- Files Changed tab: a file tree on the left + diff view on the right
- Landmark: "Pull request navigation tabs" - use `D` to reach it, then `Left`/`Right Arrow` to switch tabs

### Page Type 5: Your Personal Feed and Profile

Your personal home (`github.com`) shows activity from repositories you follow. Your profile (`github.com/username`) shows your contribution graph, pinned repos, and bio.

**What to expect on your feed:**
- A "For you" activity stream - recent activity from repos you watch
- A sidebar of suggested repositories and topics

**What to expect on your profile:**
- H1: Your username
- A contribution activity graph (visually prominent; read as a table by screen readers)
- Pinned repositories
- A list of your recent public activity


## 5. Visual Map of a Repository Page

This diagram shows the layout of a repository home page. It is presented as ASCII art - every screen reader will read it correctly as text, left to right, top to bottom.

```
+----------------------------------------------------------+
|  GLOBAL NAVIGATION (landmark: "Navigation Menu")         |
|  [GitHub] [Search] [Copilot] [PRs] [Issues] [Bell] [You]|
+----------------------------------------------------------+
|  REPOSITORY TABS (landmark: "Repository navigation")     |
|  [Code] [Issues 12] [Pull requests 3] [Actions] [...]   |
+----------------------------------------------------------+
|  REPOSITORY HEADER                                        |
|  owner / repo-name  (this is the H1 heading)             |
|  [Star 42]  [Watch]  [Fork 8]                             |
+-----------------------------+----------------------------+
|  FILE AREA                  |  SIDEBAR                   |
|  Branch: [main v]           |  About                     |
|  [Go to file]  [Code v]     |  Description text          |
|                             |  Topics: accessibility     |
|  FILE TABLE (landmark)      |  Releases: 3               |
|  .github/     3 days ago    |  Contributors: 5           |
|  docs/        2 days ago    |  Languages: Markdown 100%  |
|  README.md    yesterday     |                            |
+-----------------------------+----------------------------+
|  README (landmark: "Repository files navigation")         |
|  # Rendered README content here                           |
|  ...                                                      |
+----------------------------------------------------------+
|  FOOTER                                                   |
+----------------------------------------------------------+
```

**Screen reader navigation of this page:**
- `1` → hear "owner/repo-name" (the H1, confirms you are on the right repo)
- `D` → "Navigation Menu" → `D` → "Repository navigation" → `D` → "Main" (file tree area)
- `T` → jump to the file table → `Ctrl+Alt+Down Arrow` to navigate rows
- `D` → "Repository files navigation" → read the README


## 6. Screen Reader Orientation Sequence

Do this every time you land on a new GitHub page. It takes about 10 seconds once you are practiced. Make it automatic.

<details>
<summary>Visual / mouse users - page orientation</summary>

When you land on a GitHub page, scan these areas to orient yourself:

1. **Browser tab title** - tells you the page type and repo context
2. **Global nav bar** (top strip) - GitHub logo, search box, bells/icons
3. **Repo tabs** (below global nav, visible only inside a repo) - Code, Issues, Pull Requests, etc.
4. **H1 heading** - tells you exactly what page you're on (repo name / "Issues" / issue title / PR title)
5. **Main content area** - file tree, issue list, PR diff, etc.

That's your visual map. Click anything visible to navigate.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS) - 10-second orientation sequence</summary>

```
Step 1: Press 1
        → Hear: what page type are you on? (repo name / "Issues" / issue title / PR title)

Step 2: Press D repeatedly
        → Hear: what landmark regions exist on this page?
        → Build a map: "Navigation Menu, Repository navigation, Main, Add a comment, Pagination"

Step 3: Press NVDA+F7 (NVDA) or Insert+F3 (JAWS)
        → Open the Elements List → choose "Headings" tab
        → Hear: the full heading outline of the page
        → This tells you every major section available
```

After these three steps, you know:
- **What** page you are on (step 1)
- **Where** the page regions are (step 2)
- **What** content is available and how it is organized (step 3)

From there, navigate with purpose: `D` to jump to regions, `H` or `3` to jump to content headings, `K` for links, `B` for buttons.

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS) - 10-second orientation sequence</summary>

```
Step 1: Quick Nav H (with Quick Nav on) or VO+Cmd+H → navigate to h1
        → Hear: what page type are you on? (repo name / "Issues" / issue title / PR title)

Step 2: VO+U → press Left/Right Arrow to choose "Landmarks" → Up/Down to explore
        → Build a map: "Navigation Menu, Repository navigation, Main, Add a comment, Pagination"
        → Escape to dismiss the rotor

Step 3: VO+U → press Left/Right Arrow to choose "Headings"
        → Hear: the full heading outline of the page
        → Up/Down to navigate headings; Enter to jump to one
```

After these three steps, you know:
- **What** page you are on (step 1)
- **Where** the page regions are (step 2)
- **What** content is available and how it is organized (step 3)

From there, navigate with purpose: `VO+U → Landmarks` to jump to regions, Quick Nav `H` to jump to content headings, Quick Nav `K` for links, Quick Nav `B` for buttons.

> **VoiceOver tip:** `VO` = `Control+Option`. Turn Quick Nav on/off by pressing `Left Arrow + Right Arrow` simultaneously. Quick Nav lets you use single keys (`H`, `B`, `K`, `T`) without holding `VO`, matching the feel of NVDA/JAWS browse mode.

</details>


## 7. Landmark Structure by Page Type

Each GitHub page type has a consistent landmark pattern. Knowing the pattern means you can skip steps 2 and 3 above for familiar pages.

> **Landmark navigation quick reference:**
> - **NVDA / JAWS:** Press `D` to cycle through landmarks, `Shift+D` to go backwards
> - **VoiceOver (macOS):** Press `VO+U`, then Left/Right to select "Landmarks", then Up/Down to navigate


### Repository home page landmarks (in order)

| Landmark (what you hear with `D`) | Contains |
|---|---|
| Navigation Menu | Global nav bar - logo, search, PRs, Issues, notifications, avatar |
| Repository navigation | Code, Issues, PRs, Actions, etc. tabs |
| Main | Everything below the tabs - file tree, README |
| Repository files navigation | The rendered README specifically |

### Issues list page landmarks

| Landmark | Contains |
|---|---|
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Main | Filter bar + issue list |
| Search Results List | The actual list of issues |
| Pagination | Next/previous page buttons |

### Issue detail page landmarks

| Landmark | Contains |
|---|---|
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Main | Issue title, description, comments, sidebar |
| Add a comment | The reply text area and Submit button |

### Pull request Conversation tab landmarks

| Landmark | Contains |
|---|---|
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Pull request tabs | Conversation, Commits, Files changed tab links |
| Main | PR description, review threads, merge section |
| Add a comment | The reply box |

### Pull request Files Changed tab landmarks

| Landmark | Contains |
|---|---|
| Navigation Menu | Global nav |
| Pull request tabs | Tab links |
| Main | File tree + diff view |
| (no "Add a comment" - inline commenting works differently) | - |


## 8. GitHub's Heading Hierarchy in Practice

GitHub uses a predictable heading structure. Learning this pattern means you can navigate any page by heading level alone.

### Repository home

```
H1: owner/repo-name
  H2: About (sidebar section)
  H2: Releases
  H2: (README sections - whatever the author wrote)
```

### Issues list

```
H1: Issues
  (no H2s - issues are listed as links, not headings)
  (use I for list items, or 3 for issue headings in some views)
```

### Issue detail

```
H1: Issue title
  H2: Description
  H2: Activity
    H3: Each comment header (author + timestamp)
```

### Pull request detail - Conversation tab

```
H1: PR title
  H2: (description, if any)
  H2: Activity
    H3: Each comment header
    H3: Each review submission
    H4: Each inline comment within a review
```

### Pull request detail - Files Changed tab

```
H1: PR title
  H2: File tree (with "New Files Changed Experience" enabled)
    H3: Each file name heading
      H4: Each diff hunk heading
```

> **Why this matters:** Pressing `3` on a PR Files Changed tab jumps between file headings - this is how you quickly navigate to a specific file without tabbing through the entire diff.


## 9. How GitHub's Layout Changes by Viewport

GitHub is a responsive web application. The layout shifts at different screen widths, and this affects what landmarks and headings you encounter.

**At full desktop width (1200px+):**
- File tree and sidebar are visible alongside the main content
- The full repository tab bar is visible
- All landmark regions described above are present

**At tablet width (768-1199px):**
- Sidebar may collapse or move below the main content
- Some navigation items may move into a "More" dropdown
- Landmark structure remains the same - only visual position changes

**At mobile width (below 768px):**
- Global navigation collapses to a hamburger-style menu
- Tabs may scroll horizontally or collapse
- The landmark structure is the same but the "Navigation Menu" landmark becomes a toggle

**Consistent experience recommendation:** Use your browser maximized or at full desktop width during this workshop. GitHub's landmark and heading structure is most consistent at desktop width. If you hear different landmarks or headings than described in this guide, maximize your browser window.


## 10. The Mental Model - Building Your Internal Map

After your first day of using GitHub, you will have an internal map. Here is what that map should look like:

```
GitHub as a building:

LOBBY (global nav bar)
  Always here, same on every floor
  Contains: search, your inbox, your identity
  Landmark: "Navigation Menu"

FLOOR SELECTOR (repository nav tabs)
  Changes based on which repo you're in
  Contains: Code, Issues, PRs, Actions, Settings
  Landmark: "Repository navigation"

MAIN ROOM (the primary content area)
  Changes completely depending on which floor you're on
  Landmark: "Main"

MAILBOX (Add a comment)
  At the bottom of Issues and PR Conversation pages
  Landmark: "Add a comment"

ELEVATOR BUTTONS (keyboard shortcuts)
  G+I = Issues floor
  G+P = Pull requests floor
  G+C = Code floor
  G+A = Actions floor
  ? = Show all buttons in this building
```

When you get disoriented:
1. Press `1` - hear the H1 - know what floor you are on
2. Press `D` - hear the landmarks - know what rooms are available
3. Press `NVDA+F7` - see the full outline - know what's in the room

You are never lost. You always have these three fallbacks.


## Try It: The 60-Second Orientation

**Time:** 1 minute | **What you need:** A browser with your screen reader running

Open any GitHub repository - try [github.com/community-access/accessibility-agents](https://github.com/community-access/accessibility-agents) - and prove to yourself that the mental model works:

1. Press `1` - your screen reader announces the repo name. You know where you are.
2. Press `D` - you hear the first landmark. Press `D` again to hear the next one. You now know the rooms on this floor.
3. Press `2` - you jump to the first section heading. Press `2` again to scan the page structure.
4. Press `H` three times - you're moving through headings at any level. You're reading the outline.

**You're done.** Four keys, under a minute. You just navigated a GitHub repository by ear.

> **What success feels like:** You heard a repo name, at least two landmarks, and several headings. If you did, you can orient yourself on *any* GitHub page using these same four keys.


## Day 2 Amplifier

> Once you have this mental model solid, the Accessibility Agents agents make more sense. The `@daily-briefing` agent reads your GitHub notifications and presents a structured report - but the report structure mirrors the landmark structure of GitHub itself: global activity, then per-repo activity, then per-issue and per-PR detail. The agent describes the same building you have already walked through manually.


*Next: [Navigating Repositories](02-navigating-repositories.md)*
*Back: [Pre-Workshop Setup](00-pre-workshop-setup.md)*
*Reference: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md) | [GitHub Concepts Glossary](appendix-a-glossary.md)*



### Supplementary: Screen Reader Cheat Sheet - GitHub shortcuts

# Appendix B: Screen Reader Cheat Sheet
> **Listen to Episode 19:** [Screen Reader Cheat Sheet](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## GitHub Navigation with NVDA, JAWS, and VoiceOver

> **How to use this sheet:** Keep it open in a second window or print it. Commands are organized by task so you can find what you need quickly while you work. All commands are keyboard-only - no mouse required.


## Screen Reader Mode Basics

Before navigating GitHub, understand the two fundamental modes that all screen readers use on the web:

### Browse Mode (also called Virtual Cursor / Reading Mode)

This is your primary mode for **reading and navigating** pages. The screen reader intercepts keystrokes and uses them as navigation commands - for example, pressing `H` jumps to the next heading rather than typing the letter H.

| Screen Reader | How to know you're in Browse Mode |
|---------------|----------------------------------|
| **NVDA** | Lower-pitched sound when switching; NVDA says "browse mode" |
| **JAWS** | JAWS says "virtual cursor on" |
| **VoiceOver** | No mode switching needed - VoiceOver uses the VO modifier keys |

### Focus Mode (also called Forms or Application Mode)

This mode is for **typing and interacting** with form fields, text areas, buttons, and interactive widgets. Your keystrokes go directly to the web page instead of being captured by the screen reader.

| Screen Reader | Toggle Focus/Browse Mode | When to use |
|---------------|--------------------------|-------------|
| **NVDA** | `NVDA+Space` (Insert+Space or CapsLock+Space) | Type in comment boxes, issue titles, PR descriptions |
| **JAWS** | `JAWS+Z` (Insert+Z) or automatic | Same |
| **VoiceOver** | `VO+Shift+Down` to interact with an element | Same |

> **Rule of thumb:** Browse mode to navigate, Focus mode to type.


## Quick Navigation Keys (Browse Mode)

These single-key shortcuts work in Browse Mode (NVDA and JAWS). VoiceOver users with Quick Nav enabled use the same keys.

### Heading Navigation - Your Most-Used Tool

GitHub structures pages with headings. Jumping between headings is the fastest way to navigate.

| Key | Action | VoiceOver |
|-----|--------|-----------|
| `H` | Next heading (any level) | `H` (Quick Nav on) |
| `Shift+H` | Previous heading | `Shift+H` |
| `1` | Next h1 (page title) | `1` |
| `2` | Next h2 (section heading) | `2` |
| `3` | Next h3 (issue/PR titles are h3) | `3` |
| `4` | Next h4 (commit titles in PRs) | `4` |

### Landmark Navigation - Jump Between Page Regions

Landmarks are named regions of a page (navigation, main content, sidebar, etc.). GitHub uses landmarks heavily.

| Key | Action | VoiceOver |
|-----|--------|-----------|
| `D` | Next landmark / region | `VO+U` → Landmarks rotor |
| `Shift+D` | Previous landmark | Same, navigate backwards |

**GitHub landmarks you will encounter:**

| Landmark Label | What It Contains |
|----------------|-----------------|
| Navigation Menu | Your avatar menu and global nav |
| Repository navigation | Code, Issues, PRs, Actions tabs |
| Main | The primary page content |
| Repository files navigation | README display |
| Pull requests list | The list of PRs |
| Search Results List | Issues or PR list results |
| Add a comment | Comment submission form |
| Pagination | Next/Previous page buttons |

### Link, Button, and Form Navigation

| Key | Action | JAWS Equivalent | VoiceOver |
|-----|--------|-----------------|-----------|
| `K` | Next link | `Tab` or `U` | `VO+U` → Links rotor |
| `Shift+K` | Previous link | `Shift+U` | - |
| `B` | Next button | `B` | `VO+U` → Buttons rotor |
| `Shift+B` | Previous button | `Shift+B` | - |
| `F` or `E` | Next edit/form field | `F` | `VO+U` → Form Controls |
| `Tab` | Next interactive element (any type) | `Tab` | `Tab` |
| `Shift+Tab` | Previous interactive element | `Shift+Tab` | `Shift+Tab` |
| `Enter` / `Space` | Activate link or button | Same | `VO+Space` |

### List and Table Navigation

| Key | Action | Notes |
|-----|--------|-------|
| `L` | Next list | Useful for spotting issue/PR lists |
| `I` | Next list item | Navigate within a list |
| `T` | Next table | **Use this for the files table in a repo** |
| `Ctrl+Alt+→` | Move right in a table cell | Navigate table columns |
| `Ctrl+Alt+←` | Move left in a table cell | |
| `Ctrl+Alt+↓` | Move down in a table (next row) | Navigate file list rows |
| `Ctrl+Alt+↑` | Move up in a table | |


## The Elements List - Your Navigation Superpower

This is one of the most powerful tools for navigating complex pages. It opens a dialog listing all headings, links, buttons, form fields, or landmarks on the page.

| Screen Reader | Open Elements List | What It Shows |
|---------------|-------------------|---------------|
| **NVDA** | `NVDA+F7` (Insert+F7 or CapsLock+F7) | Headings, Links, Form fields, Buttons, Landmarks (tabs within the dialog) |
| **JAWS** | `Insert+F6` (headings) / `Insert+F7` (links) | Headings list / Links list |
| **VoiceOver** | `VO+U` | Rotor - switch between Headings, Links, Landmarks, Form Controls |

**How to use it:**
1. Press the keyboard shortcut above
2. Navigate between the tabs (Headings, Links, etc.) with `Tab` or arrow keys
3. Type to filter the list (e.g., type "new issue" to find the New Issue button)
4. Press `Enter` to jump to the item on the page


## Per-Screen-Reader Command Reference

A compact reference organized by screen reader. For task-based navigation guides (navigating a PR, leaving a comment, etc.), see the sections below.

### NVDA (Windows)

**Single-key navigation (Browse Mode)**

| Key | Moves to |
|-----|----------|
| `H` / `Shift+H` | Next / previous heading |
| `1`-`6` | Next heading of that level |
| `K` | Next link |
| `B` | Next button |
| `F` or `E` | Next form field |
| `T` | Next table |
| `D` | Next landmark region |
| `L` | Next list |
| `I` | Next list item |

**Mode switching and reading**

| Key | Action |
|-----|--------|
| `Insert+Space` | Toggle Browse / Focus Mode |
| `Insert+F7` | Elements list (headings, links, form fields, buttons) |
| `NVDA+↓` | Start reading from cursor (Say All) |
| `NVDA+↑` | Read current line |
| `Ctrl` | Stop reading |

### JAWS (Windows)

**Single-key navigation (Virtual Cursor)**

| Key | Moves to |
|-----|----------|
| `H` / `Shift+H` | Next / previous heading |
| `1`-`6` | Next heading of that level |
| `U` | Next unvisited link |
| `K` | Next link |
| `B` | Next button |
| `F` | Next form field |
| `T` | Next table |
| `R` | Next landmark region |
| `L` | Next list |
| `I` | Next list item |

**Mode switching and reading**

| Key | Action |
|-----|--------|
| `Insert+Z` | Toggle Virtual PC Cursor (Browse / Focus) |
| `Num Pad Plus` | Exit forms mode (open PC Cursor) |
| `Insert+F6` | Headings list |
| `Insert+F7` | Links list |
| `Insert+↓` | Start reading from cursor (Say All) |
| `Insert+↑` | Read current line |
| `Ctrl` | Stop reading |

### VoiceOver (macOS)

Activate VoiceOver: `Cmd+F5`. The VO modifier key is `Control+Option` (abbreviated `VO`).

**Rotor navigation:** Open with `VO+U`, use `←/→` to switch between element types (Headings, Links, Form Controls, Tables, Landmarks), and `↑/↓` to navigate within a type.

| Command | Action |
|---------|--------|
| `VO+U` | Open Rotor |
| `VO+Right` / `VO+Left` | Move forward / backward |
| `VO+Space` | Activate current element |
| `VO+Shift+Down` | Interact with element (enter Focus Mode) |
| `VO+Shift+Up` | Stop interacting |
| `VO+A` | Start reading from cursor |
| `Ctrl` | Stop reading |
| `Cmd+F5` | Start / stop VoiceOver |


## Navigating Specific GitHub Pages

### Repository Main Page

| Goal | Key Sequence |
|------|-------------|
| Find the repo name and description | `1` - jumps to the h1 heading (the repo name) |
| Jump to repo navigation tabs | `D` to "Repository navigation" landmark |
| Open the files table | `T` (next table) |
| Navigate files | `Ctrl+Alt+Down Arrow` for next row, `Ctrl+Alt+Right Arrow` for next column |
| Open a file | `Enter` on the filename |
| Find the Clone or Download button | `B` (next button after the h1) |
| Switch branches | `B` to find the branch button, then `Enter` |
| Search for a file | `F` to reach the "go to file" field, then type filename |

### Issues List Page

| Goal | Key Sequence |
|------|-------------|
| Find the issue list | `1` then `L` (next list) or `D` to "Search Results List" landmark |
| Navigate issue titles | `3` (issue titles are h3 headings) |
| Navigate list items | `I` (next list item within the search results list) |
| Open an issue | `Enter` on the issue title link |
| Open in a new tab | `Ctrl+Enter` |
| Search or filter issues | `F` to the edit field, type search query, then `Enter` |
| Create a new issue | `Tab` from search field until "New issue" link |
| Filter by label | `Tab` to the filter toolbar buttons, `Enter`, then arrow keys in the dropdown |

### Issue Detail Page

| Goal | Key Sequence |
|------|-------------|
| Read the issue description | `2` to "Description" heading |
| Read activity and comments | `2` to "Activity" heading, then `Down Arrow` to read |
| Jump to the comment box | `D` to "Add a comment", then `E` to the edit field |
| Type a comment | Switch to Focus mode (`NVDA+Space`), then type |
| Submit the comment | `Tab` to the "Comment" button then `Enter` - or `Ctrl+Enter` from the text area |
| Close the issue | `Tab` to the "Close" button, then `Enter` |
| Navigate assignees and labels sidebar | `3` (sidebar items are h3 headings) |

### Pull Requests List Page

| Goal | Key Sequence |
|------|-------------|
| Find the PR list | `D` to "Pull requests list" landmark |
| Navigate PR titles | `Tab` (no per-item heading semantics - tab through) |
| Open a PR | `Enter` on the PR title |
| Create a new pull request | `K` to the "New pull request" link |
| Filter PRs | `F` to the search field, then `Enter` |

### Pull Request Detail - Conversation Tab

| Goal | Key Sequence |
|------|-------------|
| Read PR description | `2` to the first h2 heading |
| Navigate comment threads | `3` (comments are h3 headings) |
| Open pull request tabs | `D` to "Pull request tabs", then `K` to navigate links |
| Add a comment | `D` to "Add a comment", then `E`, then Focus mode, then type |
| Submit review | `B` to the "Submit review" button |

### Pull Request Detail - Commits Tab

| Goal | Key Sequence |
|------|-------------|
| Switch to Commits tab | `D` to "Pull request navigation tabs", then `Tab` between tab controls, then `Left` or `Right Arrow` |
| Navigate commits by date | `3` (date headings are h3) |
| Navigate individual commits | `4` (commit names are h4) or `I` (list items) |
| Open a commit | `Enter` on the commit heading or link |

### Pull Request Detail - Files Changed Tab

| Goal | Key Sequence |
|------|-------------|
| Navigate to Files Changed | `D` to "Pull request navigation tabs", then `Left` or `Right Arrow` to "Files changed", then `Enter` |
| Navigate file headings | `H` or `3` |
| Find a specific file | `E` to "Filter changed files" field, then type filename |
| Navigate file tree | `2` to "file tree", then `Up Arrow` or `Down Arrow` |
| Navigate diff lines | `NVDA+Space` for Focus mode, then arrow keys in the diff table |
| Read across a diff row | `Ctrl+Alt+Right Arrow` (columns: line number, change type, content) |
| Comment on a line | Focus the line, then `Enter` (activates comment mode) |
| Multi-line comment | Focus start line, then `Shift+Down Arrow` to extend, then `Enter` |
| Submit review | `1` then `B` to "Submit review" button |

### Checking and Enabling Feature Previews

GitHub Feature Previews are opt-in UI improvements. For screen reader users, two are especially important: **New Issues Experience** and **New Files Changed Experience**. Both may already be active - or may have graduated out of Feature Preview entirely.

**NVDA / JAWS (Browse Mode):**

| Goal | Key Sequence |
|------|--------------|
| Open User Menu | `B` repeatedly until "Open user navigation menu, button" → `Enter` |
| Open Feature Preview panel | `↓` or `K` to "Feature preview" → `Enter` |
| Navigate the feature list | `↓` or `I` (list items) |
| Check if a feature is enabled | Toggle announces **"Pressed"** or **"Disable"** = enabled; **"not Pressed"** or **"Enable"** = disabled |
| Enable a feature | `Enter` or `Space` on the toggle when it is not Pressed |
| Feature not listed | Feature has graduated - active automatically, no action needed |

**VoiceOver (macOS):**

| Goal | Key Sequence |
|------|--------------|
| Open User Menu | `VO+U` → Buttons → "Open user navigation menu" → `Enter` |
| Open Feature Preview panel | `VO+Down Arrow` to "Feature preview" → `VO+Space` |
| Check if a feature is enabled | Toggle announces **"checked"** = enabled; **"unchecked"** = disabled |
| Enable a feature | `VO+Space` on an unchecked toggle |

> See [Pre-Workshop Setup, Step 4](00-pre-workshop-setup.md#step-4-check-github-feature-preview-settings) for full details on what each feature enables and why it matters for screen reader users.


## Typing and Submitting Content

### Entering text in GitHub (Focus Mode required)

1. Navigate to the text field using Browse Mode: `F` or `E` for edit fields, `Tab` for any interactive element
2. **Switch to Focus Mode**:
   - NVDA: `Insert+Space`
   - JAWS: `Insert+Z` (or it switches automatically)
   - VoiceOver: `VO+Shift+Down` to interact with the text area
3. Type your content
4. **Return to Browse Mode** when done typing:
   - NVDA: `Insert+Space`
   - JAWS: `Insert+Z`
   - VoiceOver: `VO+Shift+Up` to stop interacting

### Markdown formatting shortcuts in GitHub text areas

These work while in Focus Mode inside a GitHub text area:

| Shortcut | Effect |
|----------|--------|
| `Ctrl+B` | **Bold** |
| `Ctrl+I` | *Italic* |
| `Ctrl+E` | `Inline code` |
| `Ctrl+K` | [Insert link] |
| `Ctrl+Shift+.` | > Blockquote |
| `Ctrl+Shift+L` | Unordered list |
| `Ctrl+Shift+7` | Ordered list |


## Dropdown Menus and Flyouts

GitHub uses popup flyout menus for labels, assignees, reviewers, and branch selection. Here is how to handle them:

```
Step 1: Navigate to the button (D for landmark, B for button, or Tab)
Step 2: Activate the button (Enter or Space) - flyout opens
Step 3: Type to filter results OR use ↑/↓ arrow keys to navigate
Step 4: Select an item (Enter)
Step 5: Close the flyout (Esc) - selections apply on close
```

**VoiceOver users:**
```
Step 1: Navigate to the button with Tab or VO+Right
Step 2: Activate with VO+Space
Step 3: VO+Down to enter the flyout
Step 4: VO+Right/Left to navigate items
Step 5: VO+Space to select, Esc to close
```


## GitHub Built-In Keyboard Shortcuts

GitHub has a dedicated keyboard shortcut system built into every page. These are completely separate from your screen reader's navigation keys - they are JavaScript-powered shortcuts that trigger GitHub actions directly without using the mouse.

### Using GitHub shortcuts alongside a screen reader

The key issue: when your screen reader is in Browse Mode, it intercepts keystrokes before they reach the page. GitHub's shortcut system relies on the page receiving the keystroke directly. Here is how to unlock them:

| Screen Reader | How to use GitHub shortcuts |
|---|---|
| **NVDA** | Press `NVDA+Space` to enter Focus Mode, use the shortcut, then `NVDA+Space` to return to Browse Mode |
| **JAWS** | Press `Insert+Z` to toggle Virtual Cursor off, use the shortcut, then `Insert+Z` to turn it back on |
| **VoiceOver** | GitHub shortcuts generally work without mode switching - VoiceOver handles this differently |

**Exceptions that always work in Browse Mode:** `?` (shows all shortcuts) and `S`/`/` (focus the search bar) work at any time because they immediately move browser focus to an interactive element.

**Practical sequence for `G` shortcuts:**
```
Step 1: Press NVDA+Space (or Insert+Z in JAWS) - enter Focus Mode
Step 2: Press G, pause half a second
Step 3: Press the second key (I, P, A, etc.)
Step 4: Press NVDA+Space to return to Browse Mode on the new page
```

### Discover shortcuts on any page - The `?` Key

> **Start here every time you're on an unfamiliar GitHub page.** The `?` key opens GitHub's built-in keyboard shortcut help dialog. It lists every shortcut for the exact page you are on - the set changes depending on whether you are on a repository, an issue, a PR, the notifications inbox, etc.

Press `?` (Shift+/) from any GitHub page **when not inside a text field** to open the shortcut dialog.

#### Reading the shortcut dialog with a screen reader

The dialog is a standard ARIA modal (`role="dialog"`). When it opens, browser focus moves inside it automatically.

**NVDA:**
```
Step 1: Press Shift+/ to open the dialog → NVDA announces "dialog" and reads the title
Step 2: Press NVDA+Space to enter Browse Mode inside the dialog
Step 3: Press H to navigate between shortcut categories (they are h2 headings)
Step 4: Press ↓ to read each shortcut row in the category
Step 5: Press Escape or Tab to the Close button → Enter to close
```

**JAWS:**
```
Step 1: Press Shift+/ → JAWS announces the dialog and its title
Step 2: Use ↓ to read through the contents, or Ctrl+Home to start from the top
Step 3: Use Tab to move between interactive elements (the Close button)
Step 4: Press Escape to close
```

**VoiceOver (macOS):**
```
Step 1: Press Shift+/ → VoiceOver announces the dialog
Step 2: Use VO+Right to move through the dialog contents
Step 3: Use VO+Command+H to jump between heading categories
Step 4: Press Escape or navigate to the Close button (VO+Space)
```

**Key facts about the shortcut dialog:**
- It is **context-aware** - the shortcuts shown change based on your current page
- It is **always current** - GitHub automatically updates it when they add new shortcuts
- The dialog is divided into sections: Site-wide, Source code browsing, Issues, Pull requests, Notifications, etc. - only sections relevant to the current page appear
- You do not need to be in Focus Mode to open it - `?` works from Browse Mode


### Site-wide - work on every GitHub page

| Shortcut | Action |
|---|---|
| `?` | Show all keyboard shortcuts for the current page |
| `S` or `/` | Focus the search bar |
| `G` then `N` | Go to your Notifications |


### Repository navigation - on any repository page

| Shortcut | Action | Screen reader note |
|---|---|---|
| `G` then `C` | Go to the Code tab | Safe - use Focus Mode first |
| `G` then `I` | Go to the Issues tab | Safe - use Focus Mode first |
| `G` then `P` | Go to the Pull Requests tab | Safe - use Focus Mode first |
| `G` then `A` | Go to the Actions tab | Safe - use Focus Mode first |
| `G` then `W` | Go to the Wiki tab | Safe - use Focus Mode first |
| `G` then `G` | Go to the Discussions tab | Safe - use Focus Mode first |
| `.` (period) | Open repository in github.dev, same tab | Opens VS Code in your browser |
| `>` (Shift+Period) | Open repository in github.dev, new tab | Preserves your GitHub page - preferred |
| `T` | Open file finder (Go to File) | Conflicts with NVDA `T` = next table - use `F` to find the field instead |

> **Shortcut spotlight - `.` and `>`:** These open github.dev, which is VS Code running inside your browser - same keyboard shortcuts, same screen reader mode. `>` opens a new tab so you keep your current GitHub page. This is the fastest way to start editing a file without installing anything.


### Source code browsing - viewing a file

| Shortcut | Action | Screen reader note |
|---|---|---|
| `T` | Activate the file finder | Conflicts with NVDA table nav - use `F` for the field instead |
| `L` | Jump to a specific line number | Conflicts with NVDA `L` = next list - use Focus Mode first |
| `W` | Switch to a new branch or tag | - |
| `Y` | Expand URL to its permanent canonical form | Useful for linking to a specific commit of a file - the URL never changes |
| `I` | Show or hide comments on diffs | - |
| `A` | Show or hide annotations on diffs | - |
| `B` | Open blame view (who changed each line, and when) | Conflicts with NVDA `B` = next button - use Focus Mode first |


### Issue and pull request lists

These shortcuts work on the Issues list page and the Pull Requests list page:

| Shortcut | Action | Screen reader note |
|---|---|---|
| `C` | Create a new issue | Use Focus Mode first |
| `Ctrl+/` (Win) or `Cmd+/` (Mac) | Focus the issues or PR search bar | Works in Browse Mode - uses Ctrl |
| `U` | Filter by author | Use Focus Mode first |
| `L` | Filter by or edit labels | Conflicts with NVDA `L` = next list - use Focus Mode |
| `M` | Filter by or edit milestones | Use Focus Mode first |
| `A` | Filter by or edit assignee | Use Focus Mode first |
| `O` or `Enter` | Open the currently selected issue or PR | - |


### Issue and pull request detail pages

When viewing an open issue or pull request:

| Shortcut | Action |
|---|---|
| `Q` | Request a reviewer (pull requests only) |
| `M` | Set a milestone |
| `L` | Apply a label |
| `A` | Set an assignee |
| `X` | Link an issue from the same repository |
| `Ctrl+Shift+P` (Win) or `Cmd+Shift+P` (Mac) | Toggle Write and Preview tabs in the comment editor |
| `R` | Quote selected text in your reply - select text first, then press `R` |

> **Tip for `R` - quote a specific part of a comment:** In Browse Mode, select the text you want to quote by holding `Shift` and pressing arrow keys. Then press `R` - GitHub puts it directly into the comment box as a Markdown blockquote, with the author attributed. This is much faster than manually typing `> `.


### Comments - inside any text area (Focus Mode required)

These shortcuts work while typing in any GitHub comment or description field:

| Action | Windows / Linux | Mac |
|---|---|---|
| Bold | `Ctrl+B` | `Cmd+B` |
| Italic | `Ctrl+I` | `Cmd+I` |
| Inline code | `Ctrl+E` | `Cmd+E` |
| Insert link | `Ctrl+K` | `Cmd+K` |
| Paste as Markdown link (over selected text) | `Ctrl+V` | `Cmd+V` |
| Paste HTML link as plain text | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Blockquote | `Ctrl+Shift+.` | `Cmd+Shift+.` |
| Ordered list | `Ctrl+Shift+7` | `Cmd+Shift+7` |
| Unordered list | `Ctrl+Shift+8` | `Cmd+Shift+8` |
| Toggle Write / Preview | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Insert a code suggestion block | `Ctrl+G` | `Cmd+G` |
| **Submit comment** | **`Ctrl+Enter`** | **`Cmd+Enter`** |

> **The most important one:** `Ctrl+Enter` submits a comment from inside the text area - you do not have to Tab to the Submit button and press Enter. Your focus stays in context.

> **Insert suggestion (`Ctrl+G`):** Select the code you want to suggest a change to (in the diff), then press `Ctrl+G`. GitHub wraps it in a ` ```suggestion ` block. The PR author can apply your exact change with one button press.


### Files Changed tab in pull requests

| Shortcut | Action |
|---|---|
| `C` | Open the commits dropdown - filter which commits are shown in the diffs |
| `T` | Move focus to the "Filter changed files" search field |
| `Ctrl+Shift+Enter` (Win) or `Cmd+Shift+Enter` (Mac) | Submit a review comment |


### Notifications page

On your Notifications page ([github.com/notifications](https://github.com/notifications)):

| Shortcut | Action |
|---|---|
| `E` | Mark notification as done |
| `Shift+U` | Mark as unread |
| `Shift+I` | Mark as read |
| `Shift+M` | Unsubscribe from thread |


### GitHub Actions

On any Actions page in a repository:

| Shortcut | Action |
|---|---|
| `G` then `F` | Go to the workflow file |
| `Shift+T` or `T` | Toggle timestamps in logs |
| `Shift+F` or `F` | Toggle full-screen log view |
| `Esc` | Exit full-screen log view |
| `Ctrl+Space` (Win) or `Cmd+Space` (Mac) | Get AI suggestions in the workflow editor |


### Projects (board and table view)

| Shortcut | Action |
|---|---|
| `Ctrl+F` or `Cmd+F` | Focus the filter field |
| `Enter` | Toggle edit mode for the focused cell |
| `Esc` | Cancel editing |
| `Shift+Space` | Select item |
| `Space` | Open selected item |
| `E` | Archive selected items |
| `Ctrl+Shift+\` or `Cmd+Shift+\` | Open row actions menu |


> **Keep the official reference handy:** [github.com/keyboard-shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts) - and press `?` on any GitHub page for the context-specific subset.


## Common Navigation Patterns - Quick Reference

Print or bookmark this section:

| Action | Keys |
|--------|------|
| Switch browse or focus mode | `NVDA+Space` or `JAWS+Z` |
| Elements list | `NVDA+F7` / `JAWS+F6` or `F7` / `VO+U` |
| Next heading (any level) | `H` |
| Next h3 (issue or PR title) | `3` |
| Next landmark or region | `D` |
| Next link | `K` |
| Next button | `B` |
| Next form field | `F` or `E` |
| Next list item | `I` |
| Jump to file table | `T` then `Ctrl+Alt+Arrow` keys |
| Activate item | `Enter` or `Space` |
| Submit comment | `Ctrl+Enter` (in text area) |
| Open dropdown | `Enter`, then `Up` or `Down Arrow`, then `Enter`, then `Escape` |


## Troubleshooting Common Issues

### "The page doesn't match the instructions"

- **Solution:** Maximize your browser window. GitHub's layout changes at smaller widths, and landmarks/headings may appear in different positions. Full-screen or maximized window gives the most consistent experience.

### "I'm hearing too much or navigating too slowly"

- Disable hovercards in GitHub Accessibility Settings (see [Pre-Workshop Setup](00-pre-workshop-setup.md))
- Adjust your screen reader verbosity settings
- Use `NVDA+F7` / `VO+U` to get a filtered list rather than tabbing through everything
- **NVDA reads GitHub too slowly:** In NVDA Settings → Browse Mode → increase "Maximum number of characters on one line" to 10000. This prevents NVDA from pausing to wrap long lines.

### "I pressed H but it's typing the letter H"

- You are in **Focus Mode** - press `NVDA+Space` (or `JAWS+Z`) to return to Browse Mode
- In Browse Mode, H is a navigation key, not a typing key

### "I can't find the comment box"

- Use `D` to navigate to the "Add a comment" landmark
- Then `E` or `F` to jump to the edit field
- Switch to Focus Mode before typing

### "The diff/code area is hard to navigate"

- The Files Changed tab requires Focus Mode to navigate the diff table
- Use `NVDA+Space` to enter Focus Mode, then use arrow keys
- Use `Ctrl+Alt+Arrow` keys to move between table cells


## Official Screen Reader Resources

- [GitHub Repos Screen Reader Guide](https://accessibility.github.com/documentation/guide/repos/)
- [GitHub Issues Screen Reader Guide](https://accessibility.github.com/documentation/guide/issues/)
- [GitHub Pull Requests Screen Reader Guide](https://accessibility.github.com/documentation/guide/pull-requests/)
- [GitHub Copilot in VS Code Screen Reader Guide](https://accessibility.github.com/documentation/guide/github-copilot-vsc/)
- [GitHub Accessibility Settings Docs](https://docs.github.com/en/get-started/accessibility)
- [GitHub Keyboard Shortcuts Reference](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [JAWS Getting Started Documentation](https://www.freedomscientific.com/training/jaws/getting-started/)
- [VoiceOver User Guide for Mac](https://support.apple.com/guide/voiceover/welcome/mac)
- [GitHub Accessibility Community Discussions](https://github.com/orgs/community/discussions/categories/accessibility)


## Keyboard Shortcuts in Other Appendices

This cheat sheet covers GitHub web navigation and screen reader commands. Additional keyboard shortcuts for specific tools are documented in:

| Topic | Location |
|-------|----------|
| VS Code keyboard navigation and accessibility | [Appendix M - VS Code Accessibility Reference](appendix-m-vscode-accessibility-reference.md) |
| GitHub Copilot Chat and inline suggestions | [Appendix W - GitHub Copilot Reference](appendix-w-github-copilot-reference.md) |
| VS Code setup and configuration shortcuts | [Chapter 5 - VS Code Basics](05-vscode-accessibility.md) |
| GitHub Copilot activation and model switching | [Chapter 13 - GitHub Copilot](13-github-copilot.md) |


## Screen Reader Compatibility Notes

The commands in this cheat sheet have been written for and tested with the following screen readers:

| Screen Reader | Platform | Version Tested | Notes |
|---------------|----------|---------------|-------|
| **NVDA** | Windows | 2025.3.3+ | Free, open source. Primary screen reader for this workshop. |
| **JAWS** | Windows | 2026+ | Commercial. Trial available. |
| **VoiceOver** | macOS | Built into macOS Sonoma+ | No installation required. |

**If a command doesn't work as described:**
1. Check that you are in the correct mode (Browse Mode vs. Focus Mode)
2. Verify your screen reader version - older versions may use different key assignments
3. Check GitHub's own shortcut dialog (`?` key) for the current page's shortcuts
4. See [Troubleshooting](#troubleshooting-common-issues) above for common fixes


*Appendix B - keep this open as a reference throughout both days.*
*Return to: [Day 1 Agenda](admin/DAY1_AGENDA.md) | [Understanding GitHub's Web Structure](01-understanding-github-web-structure.md)*
*See also: [GitHub Concepts Glossary](appendix-a-glossary.md)*
