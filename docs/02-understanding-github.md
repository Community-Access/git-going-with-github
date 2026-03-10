# Understanding GitHub's Web Structure
>
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
10. [The Mental Model - Building Your Internal Map](#10-the-mental-model---building-your-internal-map)

## 1. GitHub's Three-Level Structure

GitHub is not a single page or a single kind of page. It is three nested levels, and understanding which level you are on changes how you navigate.

```text
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
| ---  | ---  | ---  |
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

When you are inside a repository, a second navigation bar appears below the global bar. This contains the repository's tabs: Code, Issues, Pull requests, Actions, Projects, Wiki, Security, Insights, and Settings.

**Screen reader landmark:** This is labeled **"Repository navigation"**. Press `D` to jump to it directly.


## 3. How to Tell Where You Are

Three signals tell you exactly where you are on GitHub, without needing to see the visual layout:

### Signal 1: The URL

GitHub URLs are readable descriptions of your location:

| URL pattern | Where you are |
| ---  | ---  |
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
| ---  | ---  |
| Repository home | `owner/repo: Short description - GitHub` |
| Issues list | `Issues · owner/repo` |
| Specific issue | `Issue title · Issue #42 · owner/repo` |
| Pull request | `PR title · Pull Request #7 · owner/repo` |
| Your notifications | `Notifications - GitHub` |
| Settings | `Category - Settings` |

### Signal 3: The first H1 heading

Press `1` (in Browse Mode) on any GitHub page to jump to the first H1 heading. What you hear tells you what type of page you are on:

| You hear | You are on |
| ---  | ---  |
| `owner/repo-name` | Repository home page |
| `Issues` | Issues list |
| The issue title | Issue detail page |
| The PR title | Pull request detail page |
| Your username | Your profile page |
| A settings category name | A settings page |


## 4. The Five Key Page Types

### Page Type 1: Repository Home (Code Tab)

This is the central hub of any project. It is where you find the file tree, the README, branch information, and links to all other parts of the repository.

#### What to expect

- H1: `owner/repo-name`
- Repository navigation landmark (Code, Issues, PRs, Actions tabs)
- A file tree table - navigate with `T` then `Ctrl+Alt+Arrow`
- A rendered README below the file tree
- A sidebar with About, Topics, Releases, Contributors

### Page Type 2: Issues List

A searchable, filterable list of all issues in the repository.

#### What to expect

- H1: `Issues`
- A search and filter bar at the top
- Each issue is a link with: issue title, labels, number, author, comment count
- Issue titles are H3 headings - press `3` to jump between them
- Landmark: "Search Results List"

### Page Type 3: Issue Detail

The full view of a single issue: the original report, all comments, labels, assignees, and the timeline.

#### What to expect

- H1: The issue title
- H2: "Description" (original issue body)
- H2: "Activity" (comments and events)
- Landmark: "Add a comment" (the reply box at the bottom)
- Sidebar: assignees, labels, milestone, linked PRs

### Page Type 4: Pull Request Detail

The most complex page on GitHub - it has three tabs (Conversation, Commits, Files Changed), each with its own structure.

#### What to expect

- H1: The PR title
- Landmark: "Pull request tabs" (Conversation, Commits, Files changed)
- Conversation tab: same structure as an issue detail
- Files Changed tab: a file tree on the left + diff view on the right
- Landmark: "Pull request navigation tabs" - use `D` to reach it, then `Left`/`Right Arrow` to switch tabs

### Page Type 5: Your Personal Feed and Profile

Your personal home (`github.com`) shows activity from repositories you follow. Your profile (`github.com/username`) shows your contribution graph, pinned repos, and bio.

#### What to expect on your feed

- A "For you" activity stream - recent activity from repos you watch
- A sidebar of suggested repositories and topics

#### What to expect on your profile

- H1: Your username
- A contribution activity graph (visually prominent; read as a table by screen readers)
- Pinned repositories
- A list of your recent public activity


## 5. Visual Map of a Repository Page

### Description

A repository home page is laid out from top to bottom as follows. The Global Navigation bar (landmark: "Navigation Menu") contains the GitHub logo, Search, Copilot, Pull Requests, Issues, Notifications bell, and your avatar. Below that are the Repository Tabs (landmark: "Repository navigation") showing Code, Issues (12), Pull requests (3), Actions, and more. Next is the Repository Header, which is the H1 heading "owner / repo-name" plus Star (42), Watch, and Fork (8) buttons. The main content area is split into two columns. On the left is the File Area with the branch selector (main), Go to file button, Code button, and the File Table (a landmark) listing files like .github/, docs/, and README.md with dates. On the right is the Sidebar with the About section, description text, topics (accessibility), Releases (3), Contributors (5), and Languages (Markdown 100%). Below both columns is the rendered README (landmark: "Repository files navigation"), and at the bottom is the Footer.

### Screen reader navigation of this page

Press 1 to hear "owner/repo-name" (the H1, confirms you are on the right repo). Press D to hear "Navigation Menu," then D again for "Repository navigation," then D again for "Main" (the file tree area). Press T to jump to the file table, then Ctrl+Alt+Down Arrow to navigate rows. Press D again to reach "Repository files navigation" and read the README.


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

```text
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

```text
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
>
> - **NVDA / JAWS:** Press `D` to cycle through landmarks, `Shift+D` to go backwards
> - **VoiceOver (macOS):** Press `VO+U`, then Left/Right to select "Landmarks", then Up/Down to navigate

### Repository home page landmarks (in order)

| Landmark (what you hear with `D`) | Contains |
| ---  | ---  |
| Navigation Menu | Global nav bar - logo, search, PRs, Issues, notifications, avatar |
| Repository navigation | Code, Issues, PRs, Actions, etc. tabs |
| Main | Everything below the tabs - file tree, README |
| Repository files navigation | The rendered README specifically |

### Issues list page landmarks

| Landmark | Contains |
| ---  | ---  |
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Main | Filter bar + issue list |
| Search Results List | The actual list of issues |
| Pagination | Next/previous page buttons |

### Issue detail page landmarks

| Landmark | Contains |
| ---  | ---  |
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Main | Issue title, description, comments, sidebar |
| Add a comment | The reply text area and Submit button |

### Pull request Conversation tab landmarks

| Landmark | Contains |
| ---  | ---  |
| Navigation Menu | Global nav |
| Repository navigation | Repo tabs |
| Pull request tabs | Conversation, Commits, Files changed tab links |
| Main | PR description, review threads, merge section |
| Add a comment | The reply box |

### Pull request Files Changed tab landmarks

| Landmark | Contains |
| ---  | ---  |
| Navigation Menu | Global nav |
| Pull request tabs | Tab links |
| Main | File tree + diff view |
| (no "Add a comment" - inline commenting works differently) | - |


## 8. GitHub's Heading Hierarchy in Practice

GitHub uses a predictable heading structure. Learning this pattern means you can navigate any page by heading level alone.

### Repository home

```text
H1: owner/repo-name
  H2: About (sidebar section)
  H2: Releases
  H2: (README sections - whatever the author wrote)
```

### Issues list

```text
H1: Issues
  (no H2s - issues are listed as links, not headings)
  (use I for list items, or 3 for issue headings in some views)
```

### Issue detail

```text
H1: Issue title
  H2: Description
  H2: Activity
    H3: Each comment header (author + timestamp)
```

### Pull request detail - Conversation tab

```text
H1: PR title
  H2: (description, if any)
  H2: Activity
    H3: Each comment header
    H3: Each review submission
    H4: Each inline comment within a review
```

### Pull request detail - Files Changed tab

```text
H1: PR title
  H2: File tree (with "New Files Changed Experience" enabled)
    H3: Each file name heading
      H4: Each diff hunk heading
```

> **Why this matters:** Pressing `3` on a PR Files Changed tab jumps between file headings - this is how you quickly navigate to a specific file without tabbing through the entire diff.


## 9. How GitHub's Layout Changes by Viewport

GitHub is a responsive web application. The layout shifts at different screen widths, and this affects what landmarks and headings you encounter.

### At full desktop width (1200px+)

- File tree and sidebar are visible alongside the main content
- The full repository tab bar is visible
- All landmark regions described above are present

### At tablet width (768-1199px)

- Sidebar may collapse or move below the main content
- Some navigation items may move into a "More" dropdown
- Landmark structure remains the same - only visual position changes

### At mobile width (below 768px)

- Global navigation collapses to a hamburger-style menu
- Tabs may scroll horizontally or collapse
- The landmark structure is the same but the "Navigation Menu" landmark becomes a toggle

**Consistent experience recommendation:** Use your browser maximized or at full desktop width during this workshop. GitHub's landmark and heading structure is most consistent at desktop width. If you hear different landmarks or headings than described in this guide, maximize your browser window.


## 10. The Mental Model - Building Your Internal Map

After your first day of using GitHub, you will have an internal map. Here is what that map should look like:

```text
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

> Once you have this mental model solid, the Accessibility Agents make more sense. The `@daily-briefing` agent reads your GitHub notifications and presents a structured report - but the report structure mirrors the landmark structure of GitHub itself: global activity, then per-repo activity, then per-issue and per-PR detail. The agent describes the same building you have already walked through manually.


*Next: [Navigating Repositories](03-navigating-repositories.md)*
*Back: [Pre-Workshop Setup](00-pre-workshop-setup.md)*
*Reference: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md) | [GitHub Concepts Glossary](appendix-a-glossary.md)*
