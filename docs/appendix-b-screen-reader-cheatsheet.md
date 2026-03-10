# Appendix B: Screen Reader Cheat Sheet
>
> **Listen to Episode 19:** [Screen Reader Cheat Sheet](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## GitHub Navigation with NVDA, JAWS, and VoiceOver

> **How to use this sheet:** Keep it open in a second window or print it. Commands are organized by task so you can find what you need quickly while you work. All commands are keyboard-only - no mouse required.


## Screen Reader Mode Basics

Before navigating GitHub, understand the two fundamental modes that all screen readers use on the web:

### Browse Mode (also called Virtual Cursor / Reading Mode)

This is your primary mode for **reading and navigating** pages. The screen reader intercepts keystrokes and uses them as navigation commands - for example, pressing `H` jumps to the next heading rather than typing the letter H.

| Screen Reader | How to know you're in Browse Mode |
| ---------------  | ----------------------------------  |
| **NVDA** | Lower-pitched sound when switching; NVDA says "browse mode" |
| **JAWS** | JAWS says "virtual cursor on" |
| **VoiceOver** | No mode switching needed - VoiceOver uses the VO modifier keys |

### Focus Mode (also called Forms or Application Mode)

This mode is for **typing and interacting** with form fields, text areas, buttons, and interactive widgets. Your keystrokes go directly to the web page instead of being captured by the screen reader.

| Screen Reader | Toggle Focus/Browse Mode | When to use |
| ---------------  | --------------------------  | -------------  |
| **NVDA** | `NVDA+Space` (Insert+Space or CapsLock+Space) | Type in comment boxes, issue titles, PR descriptions |
| **JAWS** | `JAWS+Z` (Insert+Z) or automatic | Same |
| **VoiceOver** | `VO+Shift+Down` to interact with an element | Same |

> **Rule of thumb:** Browse mode to navigate, Focus mode to type.


## Quick Navigation Keys (Browse Mode)

These single-key shortcuts work in Browse Mode (NVDA and JAWS). VoiceOver users with Quick Nav enabled use the same keys.

### Heading Navigation - Your Most-Used Tool

GitHub structures pages with headings. Jumping between headings is the fastest way to navigate.

| Key | Action | VoiceOver |
| -----  | --------  | -----------  |
| `H` | Next heading (any level) | `H` (Quick Nav on) |
| `Shift+H` | Previous heading | `Shift+H` |
| `1` | Next h1 (page title) | `1` |
| `2` | Next h2 (section heading) | `2` |
| `3` | Next h3 (issue/PR titles are h3) | `3` |
| `4` | Next h4 (commit titles in PRs) | `4` |

### Landmark Navigation - Jump Between Page Regions

Landmarks are named regions of a page (navigation, main content, sidebar, etc.). GitHub uses landmarks heavily.

| Key | Action | VoiceOver |
| -----  | --------  | -----------  |
| `D` | Next landmark / region | `VO+U` → Landmarks rotor |
| `Shift+D` | Previous landmark | Same, navigate backwards |

#### GitHub landmarks you will encounter

| Landmark Label | What It Contains |
| ----------------  | -----------------  |
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
| -----  | --------  | -----------------  | -----------  |
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
| -----  | --------  | -------  |
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
| ---------------  | -------------------  | ---------------  |
| **NVDA** | `NVDA+F7` (Insert+F7 or CapsLock+F7) | Headings, Links, Form fields, Buttons, Landmarks (tabs within the dialog) |
| **JAWS** | `Insert+F6` (headings) / `Insert+F7` (links) | Headings list / Links list |
| **VoiceOver** | `VO+U` | Rotor - switch between Headings, Links, Landmarks, Form Controls |

### How to use it

1. Press the keyboard shortcut above
2. Navigate between the tabs (Headings, Links, etc.) with `Tab` or arrow keys
3. Type to filter the list (e.g., type "new issue" to find the New Issue button)
4. Press `Enter` to jump to the item on the page


## Per-Screen-Reader Command Reference

A compact reference organized by screen reader. For task-based navigation guides (navigating a PR, leaving a comment, etc.), see the sections below.

### NVDA (Windows)

#### Single-key navigation (Browse Mode)

| Key | Moves to |
| -----  | ----------  |
| `H` / `Shift+H` | Next / previous heading |
| `1`-`6` | Next heading of that level |
| `K` | Next link |
| `B` | Next button |
| `F` or `E` | Next form field |
| `T` | Next table |
| `D` | Next landmark region |
| `L` | Next list |
| `I` | Next list item |

#### Mode switching and reading

| Key | Action |
| -----  | --------  |
| `Insert+Space` | Toggle Browse / Focus Mode |
| `Insert+F7` | Elements list (headings, links, form fields, buttons) |
| `NVDA+↓` | Start reading from cursor (Say All) |
| `NVDA+↑` | Read current line |
| `Ctrl` | Stop reading |

### JAWS (Windows)

#### Single-key navigation (Virtual Cursor)

| Key | Moves to |
| -----  | ----------  |
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

#### Mode switching and reading

| Key | Action |
| -----  | --------  |
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
| ---------  | --------  |
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
| ------  | -------------  |
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
| ------  | -------------  |
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
| ------  | -------------  |
| Read the issue description | `2` to "Description" heading |
| Read activity and comments | `2` to "Activity" heading, then `Down Arrow` to read |
| Jump to the comment box | `D` to "Add a comment", then `E` to the edit field |
| Type a comment | Switch to Focus mode (`NVDA+Space`), then type |
| Submit the comment | `Tab` to the "Comment" button then `Enter` - or `Ctrl+Enter` from the text area |
| Close the issue | `Tab` to the "Close" button, then `Enter` |
| Navigate assignees and labels sidebar | `3` (sidebar items are h3 headings) |

### Pull Requests List Page

| Goal | Key Sequence |
| ------  | -------------  |
| Find the PR list | `D` to "Pull requests list" landmark |
| Navigate PR titles | `Tab` (no per-item heading semantics - tab through) |
| Open a PR | `Enter` on the PR title |
| Create a new pull request | `K` to the "New pull request" link |
| Filter PRs | `F` to the search field, then `Enter` |

### Pull Request Detail - Conversation Tab

| Goal | Key Sequence |
| ------  | -------------  |
| Read PR description | `2` to the first h2 heading |
| Navigate comment threads | `3` (comments are h3 headings) |
| Open pull request tabs | `D` to "Pull request tabs", then `K` to navigate links |
| Add a comment | `D` to "Add a comment", then `E`, then Focus mode, then type |
| Submit review | `B` to the "Submit review" button |

### Pull Request Detail - Commits Tab

| Goal | Key Sequence |
| ------  | -------------  |
| Switch to Commits tab | `D` to "Pull request navigation tabs", then `Tab` between tab controls, then `Left` or `Right Arrow` |
| Navigate commits by date | `3` (date headings are h3) |
| Navigate individual commits | `4` (commit names are h4) or `I` (list items) |
| Open a commit | `Enter` on the commit heading or link |

### Pull Request Detail - Files Changed Tab

| Goal | Key Sequence |
| ------  | -------------  |
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

#### NVDA / JAWS (Browse Mode)

| Goal | Key Sequence |
| ------  | --------------  |
| Open User Menu | `B` repeatedly until "Open user navigation menu, button" → `Enter` |
| Open Feature Preview panel | `↓` or `K` to "Feature preview" → `Enter` |
| Navigate the feature list | `↓` or `I` (list items) |
| Check if a feature is enabled | Toggle announces **"Pressed"** or **"Disable"** = enabled; **"not Pressed"** or **"Enable"** = disabled |
| Enable a feature | `Enter` or `Space` on the toggle when it is not Pressed |
| Feature not listed | Feature has graduated - active automatically, no action needed |

#### VoiceOver (macOS)

| Goal | Key Sequence |
| ------  | --------------  |
| Open User Menu | `VO+U` → Buttons → "Open user navigation menu" → `Enter` |
| Open Feature Preview panel | `VO+Down Arrow` to "Feature preview" → `VO+Space` |
| Check if a feature is enabled | Toggle announces **"checked"** = enabled; **"unchecked"** = disabled |
| Enable a feature | `VO+Space` on an unchecked toggle |

> See [Pre-Workshop Setup, Step 4](00-pre-workshop-setup.md#step-4---check-github-feature-preview-settings) for full details on what each feature enables and why it matters for screen reader users.


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
| ----------  | --------  |
| `Ctrl+B` | **Bold** |
| `Ctrl+I` | *Italic* |
| `Ctrl+E` | `Inline code` |
| `Ctrl+K` | [Insert link] |
| `Ctrl+Shift+.` | > Blockquote |
| `Ctrl+Shift+L` | Unordered list |
| `Ctrl+Shift+7` | Ordered list |


## Dropdown Menus and Flyouts

GitHub uses popup flyout menus for labels, assignees, reviewers, and branch selection. Here is how to handle them:

```text
Step 1: Navigate to the button (D for landmark, B for button, or Tab)
Step 2: Activate the button (Enter or Space) - flyout opens
Step 3: Type to filter results OR use ↑/↓ arrow keys to navigate
Step 4: Select an item (Enter)
Step 5: Close the flyout (Esc) - selections apply on close
```

### VoiceOver users

```text
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
| ---  | ---  |
| **NVDA** | Press `NVDA+Space` to enter Focus Mode, use the shortcut, then `NVDA+Space` to return to Browse Mode |
| **JAWS** | Press `Insert+Z` to toggle Virtual Cursor off, use the shortcut, then `Insert+Z` to turn it back on |
| **VoiceOver** | GitHub shortcuts generally work without mode switching - VoiceOver handles this differently |

**Exceptions that always work in Browse Mode:** `?` (shows all shortcuts) and `S`/`/` (focus the search bar) work at any time because they immediately move browser focus to an interactive element.

#### Practical sequence for `G` shortcuts

```text
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

##### NVDA

```text
Step 1: Press Shift+/ to open the dialog → NVDA announces "dialog" and reads the title
Step 2: Press NVDA+Space to enter Browse Mode inside the dialog
Step 3: Press H to navigate between shortcut categories (they are h2 headings)
Step 4: Press ↓ to read each shortcut row in the category
Step 5: Press Escape or Tab to the Close button → Enter to close
```

##### JAWS

```text
Step 1: Press Shift+/ → JAWS announces the dialog and its title
Step 2: Use ↓ to read through the contents, or Ctrl+Home to start from the top
Step 3: Use Tab to move between interactive elements (the Close button)
Step 4: Press Escape to close
```

##### VoiceOver (macOS)

```text
Step 1: Press Shift+/ → VoiceOver announces the dialog
Step 2: Use VO+Right to move through the dialog contents
Step 3: Use VO+Command+H to jump between heading categories
Step 4: Press Escape or navigate to the Close button (VO+Space)
```

##### Key facts about the shortcut dialog

- It is **context-aware** - the shortcuts shown change based on your current page
- It is **always current** - GitHub automatically updates it when they add new shortcuts
- The dialog is divided into sections: Site-wide, Source code browsing, Issues, Pull requests, Notifications, etc. - only sections relevant to the current page appear
- You do not need to be in Focus Mode to open it - `?` works from Browse Mode


### Site-wide - work on every GitHub page

| Shortcut | Action |
| ---  | ---  |
| `?` | Show all keyboard shortcuts for the current page |
| `S` or `/` | Focus the search bar |
| `G` then `N` | Go to your Notifications |


### Repository navigation - on any repository page

| Shortcut | Action | Screen reader note |
| ---  | ---  | ---  |
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
| ---  | ---  | ---  |
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
| ---  | ---  | ---  |
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
| ---  | ---  |
| `Q` | Request a reviewer (pull requests only) |
| `M` | Set a milestone |
| `L` | Apply a label |
| `A` | Set an assignee |
| `X` | Link an issue from the same repository |
| `Ctrl+Shift+P` (Win) or `Cmd+Shift+P` (Mac) | Toggle Write and Preview tabs in the comment editor |
| `R` | Quote selected text in your reply - select text first, then press `R` |

> **Tip for `R` - quote a specific part of a comment:** In Browse Mode, select the text you want to quote by holding `Shift` and pressing arrow keys. Then press `R` - GitHub puts it directly into the comment box as a Markdown blockquote, with the author attributed. This is much faster than manually typing `>`.


### Comments - inside any text area (Focus Mode required)

These shortcuts work while typing in any GitHub comment or description field:

| Action | Windows / Linux | Mac |
| ---  | ---  | ---  |
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
>
> **Insert suggestion (`Ctrl+G`):** Select the code you want to suggest a change to (in the diff), then press `Ctrl+G`. GitHub wraps it in a ` ```suggestion ` block. The PR author can apply your exact change with one button press.


### Files Changed tab in pull requests

| Shortcut | Action |
| ---  | ---  |
| `C` | Open the commits dropdown - filter which commits are shown in the diffs |
| `T` | Move focus to the "Filter changed files" search field |
| `Ctrl+Shift+Enter` (Win) or `Cmd+Shift+Enter` (Mac) | Submit a review comment |


### Notifications page

On your Notifications page ([github.com/notifications](https://github.com/notifications)):

| Shortcut | Action |
| ---  | ---  |
| `E` | Mark notification as done |
| `Shift+U` | Mark as unread |
| `Shift+I` | Mark as read |
| `Shift+M` | Unsubscribe from thread |


### GitHub Actions

On any Actions page in a repository:

| Shortcut | Action |
| ---  | ---  |
| `G` then `F` | Go to the workflow file |
| `Shift+T` or `T` | Toggle timestamps in logs |
| `Shift+F` or `F` | Toggle full-screen log view |
| `Esc` | Exit full-screen log view |
| `Ctrl+Space` (Win) or `Cmd+Space` (Mac) | Get AI suggestions in the workflow editor |


### Projects (board and table view)

| Shortcut | Action |
| ---  | ---  |
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
| --------  | ------  |
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
| -------  | ----------  |
| VS Code keyboard navigation and accessibility | [Appendix M - VS Code Accessibility Reference](appendix-g-vscode-reference.md) |
| GitHub Copilot Chat and inline suggestions | [Appendix W - GitHub Copilot Reference](appendix-k-copilot-reference.md) |
| VS Code setup and configuration shortcuts | [Chapter 5 - VS Code Basics](11-vscode-interface.md) |
| GitHub Copilot activation and model switching | [Chapter 13 - GitHub Copilot](16-github-copilot.md) |


## Screen Reader Compatibility Notes

The commands in this cheat sheet have been written for and tested with the following screen readers:

| Screen Reader | Platform | Version Tested | Notes |
| ---------------  | ----------  | ---------------  | -------  |
| **NVDA** | Windows | 2025.3.3+ | Free, open source. Primary screen reader for this workshop. |
| **JAWS** | Windows | 2026+ | Commercial. Trial available. |
| **VoiceOver** | macOS | Built into macOS Sonoma+ | No installation required. |

### If a command doesn't work as described

1. Check that you are in the correct mode (Browse Mode vs. Focus Mode)
2. Verify your screen reader version - older versions may use different key assignments
3. Check GitHub's own shortcut dialog (`?` key) for the current page's shortcuts
4. See [Troubleshooting](#troubleshooting-common-issues) above for common fixes


*Appendix B - keep this open as a reference throughout both days.*
*Return to: [Day 1 Agenda](../DAY1_AGENDA.md) | [Understanding GitHub's Web Structure](02-understanding-github.md)*
*See also: [GitHub Concepts Glossary](appendix-a-glossary.md)*
