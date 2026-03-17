# Git Going with GitHub - Audio Series

## Episode 11: VS Code Setup and Accessibility

**Series:** Git Going with GitHub
**Episode:** 11 of 44
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

- What VS Code is and why it is used for this workshop
- The github.dev browser-based VS Code experience
- Screen reader mode and how to enable it
- The Command Palette: the most important keyboard shortcut
- Navigating the sidebar, editor, terminal, and panels
- Accessibility settings every screen reader user should configure


### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

- [ ] **What VS Code is: a free, extensible code editor by Microsoft**
- [ ] **The github.dev experience: press . on any repo to open VS Code in the browser**
- [ ] **Screen reader mode: what it enables and how to turn it on**
- [ ] **The accessibility help dialog: Control+Shift+H (what it tells you)**
- [ ] **The Command Palette: Control+Shift+P - the most important shortcut**
- [ ] **The Activity Bar: Explorer, Search, Source Control, Extensions, etc.**
- [ ] **Navigating between the sidebar, editor, terminal, and panels**
- [ ] **The integrated terminal and how to open it**
- [ ] **Opening a folder versus opening a file**
- [ ] **Installing extensions from the Extensions view**
- [ ] **Key accessibility settings: editor.accessibilitySupport, screen reader announcements**
- [ ] **Audio cues and what they signal**
- [ ] **The accessible diff viewer (Accessible Diff Viewer in Command Palette)**
- [ ] **Keyboard shortcut customization**

### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

- Episode 1: You installed VS Code and Git

### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

- VS Code Accessibility Reference - all settings

### Primary Source Material

# VS Code Setup & Accessibility Basics
> **Listen to Episode 11:** [VS Code Setup and Accessibility](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Your Accessible Development Environment - Part 1: Foundation

> **Day 2, Block 1 Material**
>
> This guide covers VS Code fundamentals: why VS Code for open source, accessing VS Code through github.dev (no installation), screen reader configuration, keyboard navigation essentials, and VS Code's three primary accessibility tools (Accessible Help, Accessible View, Accessible Diff).
> 
> **Prerequisites:** Complete Day 1 walkthrough of GitHub's browser interface before working through VS Code material.


## Table of Contents

1. [Why VS Code for Open Source Contribution](#1-why-vs-code-for-open-source-contribution)
2. [The Bridge: github.dev - VS Code in Your Browser](#2-the-bridge-githubdev--vs-code-in-your-browser)
3. [Screen Reader Mode in VS Code](#3-screen-reader-mode-in-vs-code)
4. [Essential Keyboard Navigation and Find/Filter](#4-essential-keyboard-navigation-and-findfilter)
5. [Accessible Help, Accessible View, and Accessible Diff](#5-accessible-help-accessible-view-and-accessible-diff)


## 1. Why VS Code for Open Source Contribution

GitHub's browser interface is excellent for reviewing, discussing, and triaging. VS Code is where you create. The difference:

| Task | Browser | VS Code |
|------|---------|---------|
| Navigate a repository | Excellent | Explorer sidebar |
| Read issues and PRs | Excellent | GitHub PR extension |
| Comment on a PR | Excellent | GitHub PR extension |
| Edit a file | Web editor | Full text editor with Copilot |
| Review a diff | Files Changed tab | Three-way merge view with navigation |
| Get AI help while writing | Not available | Copilot inline + Chat |
| Run Accessibility Agents agents | Not available | Copilot Chat with agent files |
| See errors in your contribution | After push | Real-time as you type |

For Markdown contributions (which is most of what `accessibility-agents` needs), VS Code gives you Copilot assistance, live preview, and the same Git workflow - with less tab switching and with agents available on every file you open.


## 2. The Bridge: github.dev - VS Code in Your Browser

**Before you install anything: try VS Code right now in your browser.**

GitHub provides a web-based version of VS Code called **github.dev**. It runs entirely in your browser with zero installation. The keyboard shortcuts, screen reader mode, and editor experience are identical to the desktop app.

### How to Access github.dev

**Method 1: The Period Key Shortcut (Fastest)**

From any GitHub repository page:

1. Press `.` (period key - just the period, no modifier keys)
2. The page transforms into VS Code
3. You're now editing in github.dev
4. The URL changes to `github.dev/owner/repo`
5. Screen reader mode works exactly as it does in desktop VS Code (toggle with `Shift+Alt+F1`)

**Where it works:**
- Repository home pages
- File view pages
- Pull request pages
- Any branch or commit view

**Screen reader note:** The period key shortcut is a single keypress - no modifier keys. It's GitHub's universal "open this in VS Code" command.

**Alternative: Press `>` (Shift+Period)** to open github.dev in a **new tab**. This preserves your GitHub page and is the preferred method when you want to keep both interfaces open.

**Method 2: Direct URL**

Change the domain in any GitHub URL:
- `github.com/owner/repo` → `github.dev/owner/repo`
- Works for any branch, file, or commit URL

**Method 3: From the Repository Page**

<details>
<summary>Visual / mouse users</summary>

1. Click the green **Code** button on any repository page
2. In the dropdown, click **Open with github.dev**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Navigate to the Code button (press `B` or `Tab` until you hear "Code, button" or similar)
2. Press `Enter` to open the dropdown menu
3. Press `Down Arrow` to reach "Open with github.dev"
4. Press `Enter`

</details>


### What You Get in github.dev

Everything in the list below works **exactly like desktop VS Code**:

**Full text editor with syntax highlighting**  
**All VS Code keyboard shortcuts** (see [Keyboard Reference](13-github-copilot.md#8-keyboard-shortcuts-reference))  
**Screen reader mode** (`Shift+Alt+F1` to activate - Mac: `Shift+Option+F1`)  
**File Explorer** (`Ctrl+Shift+E` - Mac: `Cmd+Shift+E`) - browse the entire repository  
**Search across files** (`Ctrl+Shift+F` - Mac: `Cmd+Shift+F`)  
**Source Control (Git)** (`Ctrl+Shift+G` - Mac: `Cmd+Shift+G`) - stage, commit, push changes  
**Markdown preview** (`Ctrl+Shift+V` - Mac: `Cmd+Shift+V`)  
**Command Palette** (`Ctrl+Shift+P` - Mac: `Cmd+Shift+P`) - access every VS Code command  
**Go to File** (`Ctrl+P` - Mac: `Cmd+P`) - instant file picker  
**Go to Symbol** (`Ctrl+Shift+O` - Mac: `Cmd+Shift+O`) - navigate by headings in Markdown  
**Multiple editor tabs and split view**  
**Settings sync** - if you sign in, your VS Code settings apply here too


### What github.dev Does NOT Have

**No terminal** - can't run shell commands, npm, git CLI  
**No GitHub Copilot** - Copilot requires the desktop app or a Codespace  
**No Accessibility Agents agents** - agents rely on extensions that need desktop VS Code  
**No extension installation** - extensions are disabled in github.dev  
**No debugger** - debugging requires a local environment  
**No live server or preview** - except Markdown preview, which does work

These limitations are why **desktop VS Code exists**. github.dev is for quick edits and reading code. Desktop is for Copilot, agents, terminal workflows, and full development.


### Why github.dev Matters for This Workshop

**It's the bridge.** You spend Day 1 in the GitHub browser interface. You'll spend Day 2 in desktop VS Code. github.dev sits in between:

- Same keyboard shortcuts as desktop VS Code (you learn them once)
- Same screen reader mode (you configure it once)
- Same file navigation patterns (Explorer, `Ctrl+P` / Mac: `Cmd+P`, `Ctrl+Shift+O` / Mac: `Cmd+Shift+O`)
- But accessible instantly from any GitHub page with one keystroke

**Use github.dev when:**
- You want to edit a file quickly without switching apps
- You're on a machine where you can't install software
- You want to browse code with VS Code navigation (symbols, search, split view)
- You're reviewing a PR and want to see the full file context

**Use desktop VS Code when:**
- You need Copilot inline suggestions
- You want to run Accessibility Agents agents
- You're making multi-file changes that benefit from AI assistance
- You need a terminal for git commands or running scripts


### Screen Reader Experience in github.dev

**Activate screen reader mode immediately:**

1. Press `.` on any GitHub repository to open github.dev
2. Press `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to enable screen reader mode
3. VS Code announces "Screen reader optimized"

**What changes:**
- Focus behavior adjusts for keyboard navigation
- Code suggestions are announced via ARIA live regions
- Error messages are announced when you navigate to them
- Inline decorations are suppressed to reduce noise

**Navigation:**
- Use `Ctrl+Shift+E` to open the Explorer (file tree)
- Use `Up/Down Arrow` to navigate files
- Press `Enter` on a file to open it in the editor
- The editor behaves like a standard text area - your screen reader's reading commands work normally

**NVDA/JAWS users:**
- You remain in Browse/Virtual mode for the overall interface
- When focus enters the editor text area, you're automatically in Forms/Focus mode
- All standard cursor movement works: `Home`, `End`, `Ctrl+Home`, `Ctrl+End`, `Ctrl+F` to find

**VoiceOver users:**
- Quick Nav OFF when inside the editor (`Left Arrow + Right Arrow` to toggle)
- Use `VO+Shift+Down` to interact with the editor area
- Standard text navigation (`Control+A` for line start, `Control+E` for line end, etc.)


### Try It Right Now

Before reading the rest of this guide:

1. Open [github.com/community-access/accessibility-agents](https://github.com/community-access/accessibility-agents) in your browser
2. Press `.` (period key)
3. github.dev opens
4. Press `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to enable screen reader mode
5. Press `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`) to open the Explorer
6. Navigate to `README.md` and press `Enter`
7. Press `Ctrl+Home` (Mac: `Cmd+Up`) to go to the top of the file
8. Press `Ctrl+Shift+O` (Mac: `Cmd+Shift+O`) to see the outline (all headings)
9. Close the tab when done

**You just used VS Code.** The desktop version in the rest of this guide is the same experience - with Copilot and agents added.


## 3. Screen Reader Mode in VS Code

> **Who needs this section?** If you use NVDA, JAWS, VoiceOver, or another screen reader, read this section before continuing. If you are not using a screen reader, you can skip to [Section 4](#4-essential-keyboard-navigation-and-findfilter) - VS Code works fully without enabling this mode.

VS Code has built-in accessibility support designed for screen reader users. It changes how focus moves, how announcements work, and how navigation behaves.

### Activating Screen Reader Mode

| Method | Steps |
|--------|-------|
| Keyboard shortcut | `Shift+Alt+F1` (Windows) / `Shift+Option+F1` (Mac) |
| Command Palette | `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (Mac) → type "screen reader" → select "Toggle Screen Reader Accessibility Mode" |
| Auto-detection | VS Code detects NVDA and JAWS automatically on Windows; VoiceOver on macOS |

**Verify it is active:**
Open Settings (`Ctrl+,` - Mac: `Cmd+,`) → search for `accessibility support` → confirm it shows `on` (not `auto`).

### What Changes in Screen Reader Mode

| Area | Normal Mode | Screen Reader Mode |
|------|-------------|-------------------|
| Suggestions list | Popup overlay | Announced via ARIA live region |
| Diff navigation | Visual highlighting | Announces "Added" / "Removed" before line content |
| Error indicators | Red underlines | Announced on focus |
| Inline decorations | Displayed visually | Suppressed to reduce noise |
| Tab completion | Visual ghost text | Announced as suggestion |

### NVDA-Specific Settings for VS Code

VS Code uses a web-based renderer. Configure NVDA for best results:

1. Open NVDA Menu → Preferences → Settings → Browse Mode
2. Set "Maximum length of text on a single line" to `10000` (prevents truncation in long lines)
3. Under Object Presentation: set "Report tooltip delay" to `off`
4. Recommended: use **NVDA + Google Chrome** for the integrated browser panels

### JAWS-Specific Settings for VS Code

1. JAWS should detect VS Code automatically and switch to PC Cursor mode for the editor
2. If the editor feels unresponsive, press `Insert+Z` to toggle virtual cursor off
3. For the integrated terminal: use `Insert+Z` to enter forms/PC mode, then interact with the terminal

### VoiceOver-Specific Settings for VS Code (macOS)

1. Open VS Code → `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to confirm screen reader mode
2. In VoiceOver Utility: Verbosity → set "Punctuation" to "All" for reading code
3. Use Quick Nav OFF (`Left+Right Arrow`) when inside the editor - standard cursor navigation is more predictable
4. Use `VO+Shift+Down` to interact with the editor, `VO+Shift+Up` to stop interacting


## 4. Essential Keyboard Navigation and Find/Filter

### Panels and Areas

> **Mac users:** Substitute `Cmd` for `Ctrl` and `Option` for `Alt` in all shortcuts below.
>
> For example: `Ctrl+Shift+E` → `Cmd+Shift+E`, `Ctrl+Backtick` → `Ctrl+Backtick` (same on Mac), `Ctrl+Shift+P` → `Cmd+Shift+P`.

| Area | Shortcut (Windows) | What Gets Focus |
|------|----------|----------------|
| Explorer (file tree) | `Ctrl+Shift+E` | Folder/file list |
| Search | `Ctrl+Shift+F` | Search input |
| Source Control (Git) | `Ctrl+Shift+G` | Changes list |
| Extensions | `Ctrl+Shift+X` | Extensions list |
| Terminal | `Ctrl+Backtick` | Terminal input |
| Copilot Chat | `Ctrl+Shift+I` | Chat input |
| Command Palette | `Ctrl+Shift+P` | Command search input |
| Editor | `Ctrl+1` | Active editor file |
| Problems panel | `Ctrl+Shift+M` | List of all errors and warnings |

### Within the Editor

| Action | Shortcut |
|--------|----------|
| Go to beginning of file | `Ctrl+Home` |
| Go to end of file | `Ctrl+End` |
| Go to line N | `Ctrl+G` → type line number |
| Go to line and column | `Ctrl+G` → type `N:C` (e.g., `10:5` for line 10, column 5) |
| Go to character offset | `Ctrl+G` → type `::N` (e.g., `::599` for the 599th character in the file) |
| Go to symbol (heading in Markdown) | `Ctrl+Shift+O` |
| Go to definition | `F12` |
| Find in file | `Ctrl+F` |
| Next find result | `F3` |
| Previous find result | `Shift+F3` |
| Next error or warning | `F8` |
| Previous error or warning | `Shift+F8` |
| Open file by name | `Ctrl+P` → type filename |
| Toggle word wrap | `Alt+Z` |
| Toggle Tab focus mode | `Ctrl+M` (makes Tab move focus instead of indenting) |
| Increase/decrease font size | `Ctrl+=` / `Ctrl+-` |
| Breadcrumb navigation | `Ctrl+Shift+;` → Arrow keys to navigate path segments |

### Rich Find and Filtering Experiences

VS Code's Find and Search tools go far beyond a simple text match. Every option below is keyboard-accessible, and all toggles are announced as checkboxes by screen readers.

#### Find in Current File (`Ctrl+F`)

When the Find widget opens, three toggle buttons refine what matches:

| Toggle | Shortcut | What It Does |
|--------|----------|--------------|
| Match Case | `Alt+C` | Limits results to exact uppercase/lowercase |
| Match Whole Word | `Alt+W` | Matches full words only, not substrings |
| Use Regular Expression | `Alt+R` | Enables regex patterns in the search box |

**Screen reader interactions inside the Find widget:**
- Toggles are announced as checkboxes - press `Space` to toggle each one
- Match count is announced as you type (example: `3 of 12 matches`)
- `F3` / `Shift+F3` move through matches while the widget stays open
- `Escape` closes the widget and returns focus to your last cursor position

**Replace (`Ctrl+H`):** Opens the Find widget with a second input for the replacement text.
- `Ctrl+Shift+1` - replace the current match
- `Ctrl+Alt+Enter` - replace all matches at once

#### Global Search Across the Workspace (`Ctrl+Shift+F`)

The global Search panel has a rich filtering system - all keyboard-accessible:

| Action | How |
|--------|-----|
| Open global search | `Ctrl+Shift+F` |
| Search input | Focus lands here automatically - type your query |
| Toggle case / word / regex | `Alt+C`, `Alt+W`, `Alt+R` (same as Find) |
| Include files filter | `Tab` to "files to include" field → type glob patterns |
| Exclude files filter | `Tab` to "files to exclude" field → type glob patterns |
| Collapse all results | `Ctrl+Shift+J` |
| Open a result | Navigate the result tree with `Up/Down Arrow` → `Enter` to open |

**Glob pattern examples for this workshop:**
```
docs/*.md          → all Markdown files in the docs folder
*.agent.md         → all Accessibility Agents agent definition files
.github/**         → everything inside the .github folder
!node_modules/**   → exclude the node_modules folder from results
```

#### Finding Settings (`Ctrl+,`)

The Settings editor has built-in search that filters by keyword as you type. Additional filter options:

| Filter | What It Shows |
|--------|---------------|
| `@modified` | Only settings you have changed from their defaults |
| `@tag:accessibility` | All accessibility-related settings |
| `@tag:advanced` | Advanced settings - useful for finding less common configuration options |
| `@tag:experimental` | Experimental features not enabled by default |

Type any of these directly in the Settings search box (`Ctrl+,`).

#### Terminal IntelliSense (`Ctrl+Space`)

The VS Code integrated terminal now offers completions for shell commands, file paths, and arguments. Press `Ctrl+Space` while typing in the terminal to trigger the completion list. Navigate suggestions with `Up/Down Arrow`, accept with `Tab` or `Enter`.

Enable with: Settings (`Ctrl+,`) → search `terminal.integrated.suggest.enabled` → set to `on`.

**Screen reader note:** Terminal IntelliSense completions are announced via ARIA live regions. The completion popup behaves the same as editor IntelliSense.

#### Type-to-Filter in Tree Views

In the **Explorer** file tree and the **Source Control** changes list, you can type characters to narrow the visible items - no scrolling required:

1. Focus the Explorer (`Ctrl+Shift+E`)
2. Start typing a filename - a filter input appears at the bottom of the tree
3. The tree instantly narrows to matching files
4. Press `Escape` to clear the filter and restore full view

This is one of VS Code's most useful keyboard affordances for large repositories with many files.

#### Go to Symbol with Inline Filtering (`Ctrl+Shift+O`)

In any Markdown file, `Ctrl+Shift+O` opens a symbol picker populated by every heading in the document. Type to narrow the list:

- `Ctrl+Shift+O` → symbol picker opens
- Type `## Day` → results narrow to all H2 headings containing "Day"
- `Up/Down Arrow` → move through results
- `Enter` → jump to the selected heading

For navigating `accessibility-agents`'s longer reference documents, this is faster than heading-by-heading screen reader navigation.

### Explorer (File Tree) Navigation

| Action | Key |
|--------|-----|
| Navigate items | `Up/Down Arrow` |
| Expand folder | `Right Arrow` |
| Collapse folder | `Left Arrow` |
| Open file | `Enter` |
| Rename file | `F2` |
| Delete file | `Delete` |
| New file | `Ctrl+N` (then save with `Ctrl+S`) |


## 5. Accessible Help, Accessible View, and Accessible Diff

VS Code has a family of purpose-built accessibility features that give screen reader users complete, structured access to content that is otherwise conveyed visually or through dynamic regions. These three are the most important to know before working with Copilot and diffs.


### 5.1 Accessible Help - Context-Aware Keyboard Guide

Every interactive area of VS Code - the editor, the terminal, the diff view, the Copilot Chat panel - has its own keyboard commands. **Accessible Help** surfaces those commands in a plain-text, fully readable dialog, tailored to exactly where your focus is right now.

**How to open Accessible Help:**

| Context | Shortcut |
|---------|----------|
| Inside the editor | `Alt+H` |
| Inside the terminal | `Alt+H` |
| Inside a diff view | `Alt+H` |
| Inside Copilot Chat | `Alt+H` |
| Any VS Code widget | `Alt+H` |

The dialog is announced with a heading and a complete list of keyboard shortcuts for that specific widget. Navigate with `Up/Down Arrow`. Press `Escape` to dismiss and return focus to where you were.

**Why this matters:** You do not need to memorize every shortcut in every panel. Open Accessible Help in any unfamiliar area and VS Code will tell you exactly what you can do there. It is the built-in answer to "what can I press from here?"

**Example output when pressing `Alt+H` in the editor:**
```
Accessible Help: Editor

Press F8 to jump to the next error or warning.
Press Shift+F8 to jump to the previous error or warning.
Press Ctrl+Shift+M to open the Problems panel.
Press F12 to go to a definition.
Press Alt+F12 to peek a definition inline.
Press Ctrl+Shift+O to go to a symbol in this file.
Press Alt+F2 to open the Accessible View.
Press Alt+H to view this help content again.
```

Use Accessible Help as your first action whenever you land somewhere new in VS Code.


### 5.2 Accessible View - Reading Dynamic and Streamed Content

**Accessible View** (`Alt+F2`) gives screen reader users a clean, static, fully readable version of content that is otherwise presented dynamically, in tooltips, or in streaming form.

**How to open Accessible View:**

| Shortcut | When to Use |
|----------|-------------|
| `Alt+F2` | Open Accessible View for the currently focused element |
| `Escape` | Close Accessible View and return to the editor |

**What Accessible View provides:**

| Content Type | Without Accessible View | With Accessible View (`Alt+F2`) |
|-------------|-------------------------|---------------------------------|
| Copilot Chat response | Fragmented - announced as tokens stream in | Full complete response, read sequentially with Arrow keys |
| Inline Copilot suggestion | Ghost text - may not be announced | Announced as "Suggestion: [full text]" |
| Hover documentation | Popup tooltip - announced only briefly | Full content, fully navigable with Arrow keys |
| Error / warning details | On-focus message only | Full error text, error code, and suggested fix |
| Terminal output | May be truncated by live region limits | Full output in review mode with scroll |
| Notification banners | Announced once and dismissed | Persistent readable content until you close it |

**Recommended workflow for Copilot Chat:**
1. Type your prompt in the Chat input
2. Wait for the response to finish (NVDA: live region announcements stop; JAWS: typing indicator disappears; VoiceOver: busy state clears)
3. Press `Alt+F2` - Accessible View opens with the complete response
4. Navigate with `Up/Down Arrow` through the response
5. Press `Escape` to return to the chat input

**Recommended workflow for hover documentation:**
1. Navigate to a symbol or link with keyboard
2. Press `Ctrl+K I` to trigger hover programmatically (no mouse needed)
3. Press `Alt+F2` to open Accessible View with the full hover content
4. Press `Escape` to dismiss


### 5.3 Accessible Diff Viewer - Reading Changes Without Visual Scanning

When you open a file diff - in Source Control, in the GitHub PR extension, or during a merge conflict - VS Code normally shows it as a side-by-side or inline visual view. For screen reader users, tracking which lines changed and how can be difficult without a structured reading mode.

**The Accessible Diff Viewer** presents the same diff as a plain, navigable list of changed lines - organized by hunk, labeled by change type (added, removed, unchanged), with the line number announced for each line.

**How to open the Accessible Diff Viewer:**

| Shortcut | What Happens |
|----------|--------------|
| `F7` | Move to the next diff hunk (from within the diff editor) |
| `Shift+F7` | Move to the previous diff hunk |
| Command Palette | `Ctrl+Shift+P` → type "Open Accessible Diff Viewer" |

**What the Accessible Diff Viewer announces:**

For each hunk (a block of related changes), the viewer announces:
- The hunk number and total hunk count (`Hunk 2 of 5`)
- The line range affected
- Each line, prefixed with its change type:

```
Hunk 1 of 3 - lines 12 to 18
  Unchanged: ## Screen Reader Cheat Sheet
- Line removed: > Quick reference for NVDA users.
+ Line added: > Quick reference for NVDA, JAWS, and VoiceOver users.
  Unchanged:
  Unchanged: Use this document during the workshop.
```

This gives you the complete picture of what changed, in reading order, without visual diff scanning.

**Practical uses during this workshop:**

- **Before approving a PR:** Open the diff → `F7` to enter the first hunk → navigate each change → `F7` for next hunk → repeat until all hunks reviewed
- **During a merge conflict:** The conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) appear as lines in the viewer - you can read both conflicting versions before deciding which to keep
- **After Copilot generates an edit:** Open the diff (`Ctrl+Shift+G` → navigate to the changed file → `Enter`) then review exactly what Copilot changed vs. what was there before

**Audio cues for diffs:**

With `accessibility.signals.diffLineInserted` and `accessibility.signals.diffLineDeleted` both set to `on` in Settings, VS Code plays a distinct tone when your cursor moves over an added line (higher pitched) or a removed line (lower pitched). You receive change-type information through sound before the line text is announced.


## Accessibility Signals and Audio Cues

VS Code can communicate editor state through accessibility signals - sounds that announce when you move past line breaks, reach the end of a file, land on an error, or complete a task. This is particularly useful for screen reader users who benefit from non-verbal state confirmation.

### Enabling Accessibility Signals

Open Settings (`Ctrl+,`) → search "accessibility signals":

| Setting | Recommended Value | What It Does |
|---------|-------------------|-------------|
| `editor.accessibilitySupport` | `on` | Full screen reader mode |
| `accessibility.signals.lineHasError` | `on` | Sound when cursor is on a line with an error |
| `accessibility.signals.lineHasWarning` | `auto` | Sound on warnings (lower pitch than errors) |
| `accessibility.signals.taskCompleted` | `on` | Sound when a terminal command completes |
| `accessibility.signals.taskFailed` | `on` | Different sound when a command fails |
| `accessibility.signals.diffLineInserted` | `on` | Sound when navigating over added lines in a diff |
| `accessibility.signals.diffLineDeleted` | `on` | Sound when navigating over deleted lines in a diff |
| `accessibility.signals.chatResponsePending` | `on` | Sound while Copilot is generating |
| `accessibility.signals.chatResponseReceived` | `on` | Sound when Copilot response is complete |

### Recommended Profile for Screen Reader Users

Add this to your VS Code `settings.json` (Command Palette → "Open User Settings JSON"):

```json
{
  "editor.accessibilitySupport": "on",
  "accessibility.signals.lineHasError": "on",
  "accessibility.signals.taskCompleted": "on",
  "accessibility.signals.taskFailed": "on",
  "accessibility.signals.chatResponseReceived": "on",
  "accessibility.signals.diffLineInserted": "on",
  "accessibility.signals.diffLineDeleted": "on",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on"
}
```

**Note:** `minimap.enabled: false` removes the visual minimap that adds no value for screen reader users and can cause some accessibility tools to announce additional regions.


*Next: [Git & Source Control in VS Code](11-git-source-control.md)*  
*Back: [Day 2 Agenda](admin/DAY2_AGENDA.md)*  
*Related: [GitHub Pull Requests Extension](12-github-pull-requests-extension.md) | [GitHub Copilot](13-github-copilot.md)*



### Supplementary: VS Code Accessibility Reference - all settings

# Appendix M: VS Code Accessibility Reference
> **Listen to Episode 30:** [VS Code Accessibility Reference](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Complete Technical Reference for Screen Reader Users

> **Purpose:** This appendix provides comprehensive technical documentation for all VS Code accessibility features, settings, and keyboard shortcuts. The main chapters cover essentials; this appendix is your complete reference manual.
>
> **Referenced by:** [VS Code Setup & Accessibility Basics](05-vscode-accessibility.md), [GitHub Copilot](13-github-copilot.md)


## Table of Contents

1. [Complete Accessibility Settings Reference](#1-complete-accessibility-settings-reference)
2. [Audio Cues - All Options](#2-audio-cues--all-options)
3. [Accessible Diff Viewer - Complete Guide](#3-accessible-diff-viewer--complete-guide)
4. [Screen Reader-Specific Configurations](#4-screen-reader-specific-configurations)
5. [Complete Keyboard Shortcuts](#5-complete-keyboard-shortcuts)
6. [Accessibility Signals Types and Customization](#6-accessibility-signals-types-and-customization)
7. [Settings.json Configuration Examples](#7-settingsjson-configuration-examples)


## 1. Complete Accessibility Settings Reference

All settings can be accessed via Settings UI (`Ctrl+,`) or by editing `settings.json` directly (`Ctrl+Shift+P` → "Open User Settings JSON").

### Core Accessibility Settings

| Setting Path | Values | Default | Description |
|--------------|--------|---------|-------------|
| `editor.accessibilitySupport` | `auto`, `on`, `off` | `auto` | Enables screen reader optimizations. `auto` detects NVDA/JAWS/VoiceOver. Set to `on` to force. |
| `editor.accessibilityPageSize` | number (lines) | `10` | Number of lines to read when using Page Up/Down in screen reader mode |
| `editor.guides.bracketPairs` | boolean | `false` | Shows bracket pair guides. Disable for screen readers (visual only). |
| `editor.guides.bracketPairsHorizontal` | boolean | `false` | Shows horizontal bracket guides. Disable for screen readers. |
| `editor.guides.highlightActiveBracketPair` | boolean | `true` | Highlights matching brackets. Not announced by screen readers. |
| `editor.guides.highlightActiveIndentation` | boolean | `true` | Highlights active indentation. Visual only. |
| `editor.guides.indentation` | boolean | `true` | Shows indentation guides. Not useful for screen readers. |
| `editor.hover.enabled` | boolean | `true` | Enables hover popups. Use `Alt+F2` (Accessible View) to read hover content. |
| `editor.minimap.enabled` | boolean | `true` | Shows visual minimap. **Recommended:** Set to `false` for screen readers. |
| `editor.occurrencesHighlight` | boolean | `true` | Highlights occurrences of selected text. Visual only. |
| `editor.renderWhitespace` | `none`, `boundary`, `selection`, `trailing`, `all` | `selection` | Shows whitespace characters. **Recommended:** `none` for screen readers. |
| `editor.wordWrap` | `off`, `on`, `wordWrapColumn`, `bounded` | `off` | Wraps long lines. **Recommended:** `on` for screen readers. |
| `workbench.editor.enablePreview` | boolean | `true` | Opens files in preview mode (single tab). Set to `false` to always open in new tab. |

### Diff and Merge Settings

| Setting Path | Values | Default | Description |
|--------------|--------|---------|-------------|
| `diffEditor.codeLens` | boolean | `false` | Shows CodeLens in diff view. Visual only. |
| `diffEditor.diffAlgorithm` | `legacy`, `advanced` | `advanced` | Diff calculation method. `advanced` produces better hunks for screen readers. |
| `diffEditor.ignoreTrimWhitespace` | boolean | `true` | Ignores whitespace changes in diffs. **Recommended:** `true` to reduce noise. |
| `diffEditor.renderSideBySide` | boolean | `true` | Shows diffs side-by-side. Set to `false` for inline view (easier for screen readers). |
| `diffEditor.wordWrap` | `off`, `on`, `inherit` | `inherit` | Word wrap in diff view. `on` recommended for long lines. |
| `merge-conflict.decorators.enabled` | boolean | `true` | Shows merge conflict decorators. Use Accessible Diff instead (`F7`). |

### Terminal Settings

| Setting Path | Values | Default | Description |
|--------------|--------|---------|-------------|
| `terminal.integrated.accessibleViewFocusesTerminal` | boolean | `true` | Returns focus to terminal after closing Accessible View. |
| `terminal.integrated.accessibleViewPreserveCursorPosition` | boolean | `false` | Preserves cursor position when opening Accessible View. |
| `terminal.integrated.enableBell` | boolean | `false` | Enables terminal bell sound. **Recommended:** `true` for audio feedback. |
| `terminal.integrated.screenReaderMode` | `auto`, `on`, `off` | `auto` | Optimizes terminal for screen readers. |

### Notification Settings

| Setting Path | Values | Default | Description |
|--------------|--------|---------|-------------|
| `accessibility.verbosity.comments` | boolean | `true` | Announces comment threads in code. |
| `accessibility.verbosity.diff-editor` | boolean | `true` | Announces diff editor context. |
| `accessibility.verbosity.editor` | boolean | `true` | Announces editor operations. |
| `accessibility.verbosity.hover` | boolean | `true` | Announces hover content. Use `Alt+F2` for full reading. |
| `accessibility.verbosity.inline-chat` | boolean | `true` | Announces inline chat responses. |
| `accessibility.verbosity.inline-completions` | boolean | `true` | Announces Copilot suggestions. |
| `accessibility.verbosity.keybindings-editor` | boolean | `true` | Announces keybindings editor context. |
| `accessibility.verbosity.notebook` | boolean | `true` | Announces notebook cell operations. |
| `accessibility.verbosity.panel-chat` | boolean | `true` | Announces Copilot Chat panel responses. |
| `accessibility.verbosity.settings-editor` | boolean | `true` | Announces settings editor context. |
| `accessibility.verbosity.terminal` | boolean | `true` | Announces terminal operations. |


## 2. Audio Cues - All Options

Audio cues provide non-verbal feedback through sound. Each cue can be configured independently.

### Accessing Audio Cue Settings

**Settings UI:** `Ctrl+,` → search "audio cue"

**Settings.json:** Edit directly (see Section 7)

### Audio Cue Values

| Value | Behavior |
|-------|----------|
| `auto` | Play sound in screen reader mode only |
| `on` | Always play sound |
| `off` | Never play sound |

### Complete Accessibility Signals List

| Setting | When It Plays | Recommended |
|---------|--------------|-------------|
| `accessibility.signals.clear` | When clearing the terminal or output | `on` |
| `accessibility.signals.chatRequestSent` | When sending a Copilot Chat prompt | `on` |
| `accessibility.signals.chatResponsePending` | While Copilot is generating a response | `auto` |
| `accessibility.signals.chatResponseReceived` | When Copilot finishes responding | `on` |
| `accessibility.signals.debugBreakpoint` | When hitting a breakpoint in debugger | `on` |
| `accessibility.signals.diffLineDeleted` | When navigating over a deleted line in diff | `on` |
| `accessibility.signals.diffLineInserted` | When navigating over an added line in diff | `on` |
| `accessibility.signals.diffLineModified` | When navigating over a modified line in diff | `on` |
| `accessibility.signals.format` | When auto-formatting completes | `auto` |
| `accessibility.signals.lineHasBreakpoint` | When cursor is on a line with a breakpoint | `auto` |
| `accessibility.signals.lineHasError` | When cursor is on a line with an error | `on` |
| `accessibility.signals.lineHasFoldedArea` | When cursor is on a line with collapsed code | `auto` |
| `accessibility.signals.lineHasInlineSuggestion` | When an inline suggestion appears | `on` |
| `accessibility.signals.lineHasWarning` | When cursor is on a line with a warning | `auto` |
| `accessibility.signals.noInlayHints` | When inlay hints are not available | `off` |
| `accessibility.signals.notebookCellCompleted` | When a notebook cell finishes executing | `on` |
| `accessibility.signals.notebookCellFailed` | When a notebook cell fails | `on` |
| `accessibility.signals.onDebugBreak` | When debugger pauses execution | `on` |
| `accessibility.signals.save` | When saving a file | `auto` |
| `accessibility.signals.taskCompleted` | When a terminal task completes successfully | `on` |
| `accessibility.signals.taskFailed` | When a terminal task fails | `on` |
| `accessibility.signals.terminalBell` | When terminal bell rings | `on` |
| `accessibility.signals.terminalCommandFailed` | When a terminal command exits with error | `on` |
| `accessibility.signals.terminalQuickFix` | When a terminal quick fix is available | `auto` |
| `accessibility.signals.voiceRecordingStarted` | When voice input begins | `on` |
| `accessibility.signals.voiceRecordingStopped` | When voice input ends | `on` |
| `accessibility.signals.volume` | Volume level (0-100) | `70` |

### Customizing Signal Sounds

**Advanced feature:** You can replace default sounds with custom audio files.

1. `Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"
2. Add custom sound paths:

```json
{
  "accessibility.signals.lineHasError.sound": "file:///C:/Users/YourName/sounds/error.wav",
  "accessibility.signals.taskCompleted.sound": "file:///C:/Users/YourName/sounds/success.wav",
  "accessibility.signals.diffLineInserted.sound": "file:///C:/Users/YourName/sounds/added.wav"
}
```

**Sound file requirements:**
- Format: WAV, MP3, or OGG
- Duration: Keep under 2 seconds
- Volume: Normalize to avoid clipping


## 3. Accessible Diff Viewer - Complete Guide

The Accessible Diff Viewer presents file diffs as a structured, line-by-line list instead of a visual side-by-side view.

### When to Use Accessible Diff Viewer

- Reviewing pull request changes
- Resolving merge conflicts
- Comparing file versions (Timeline view)
- Reviewing Copilot-generated edits
- Any time you need to understand what changed in a file

### Opening Accessible Diff Viewer

| Method | Steps |
|--------|-------|
| Keyboard (in diff editor) | Press `F7` to jump to first hunk, `Alt+F2` to open Accessible View |
| Command Palette | `Ctrl+Shift+P` → "Open Accessible Diff Viewer" |
| Automatic | Some contexts open it automatically in screen reader mode |

### Diff Viewer Structure

**Top-level structure:**

```
Accessible Diff Viewer
├── Header (file path, change summary)
├── Hunk 1 of N
│   ├── Hunk location (line range)
│   ├── Unchanged lines (context)
│   ├── Modified/Added/Removed lines (with prefix)
│   └── More unchanged lines (context)
├── Hunk 2 of N
│   └── ...
└── Footer (totals: X additions, Y deletions)
```

**Line prefixes:**

| Prefix | Meaning | Screen Reader Announcement |
|--------|---------|----------------------------|
| (no prefix) | Unchanged line (context) | "Unchanged: [line content]" |
| `+` | Added line | "Added: [line content]" or "Line added: [content]" |
| `-` | Removed line | "Removed: [line content]" or "Line removed: [content]" |
| `| ~` | Modified line (original) | "Modified from: [old content]" |
| `| +` | Modified line (new version) | "Modified to: [new content]" |

### Navigating Hunks

**Hunk = a block of related changes**

| Action | Keyboard |
|--------|----------|
| Jump to next hunk | `F7` |
| Jump to previous hunk | `Shift+F7` |
| Jump to next change | `F8` (in some contexts) |
| Jump to previous change | `Shift+F8` |

### Screen Reader-Specific Navigation

**NVDA/JAWS:**
1. Open diff: `Enter` on file in Source Control, or `F7` in an open diff
2. `Alt+F2` to open Accessible Diff Viewer
3. Navigate with `Up/Down Arrow` (line by line)
4. Use `H` key to jump between hunks (each hunk has a heading)
5. `Escape` to close and return to editor

**VoiceOver:**
1. `VO+Arrow` to navigate to diff file → `VO+Space` to open
2. `Option+F2` for Accessible Diff Viewer
3. `VO+Arrow` keys to navigate lines
4. `VO+Command+H` to jump between hunk headings
5. `Escape` to close

### Understanding Context Lines

The diff shows 3 unchanged lines before and after each change for context. These are announced as "Unchanged: [content]".

**Example:**

```
Hunk 1 of 3 - lines 42-48

  Unchanged: ## Screen Reader Setup
  Unchanged:
- Removed: This guide covers NVDA only.
+ Added: This guide covers NVDA, JAWS, and VoiceOver.
  Unchanged:
  Unchanged: ### Installing NVDA
```

The unchanged lines help you understand where in the file the change occurred.

### Inline Diff View vs Side-by-Side

**Inline view (recommended for screen readers):**
- All changes in a single editor
- Removed lines followed by added lines
- Easier to navigate with screen reader reading commands

**Side-by-side view (default, visual):**
- Left panel: original file
- Right panel: modified file
- Requires navigating between panels

**To switch to inline view:**

1. Open Settings: `Ctrl+,`
2. Search: "diffEditor.renderSideBySide"
3. Uncheck the box (or set to `false` in settings.json)


## 4. Screen Reader-Specific Configurations

### NVDA Configuration for VS Code

**Recommended NVDA settings:**

1. **Browse Mode settings:**
   - NVDA Menu → Preferences → Settings → Browse Mode
   - "Maximum length of text on a single line": `10000`
   - "Automatic focus mode for focus changes": **Checked**
   - "Automatic focus mode for caret movement": **Unchecked**

2. **Object Presentation:**
   - "Report tooltips": **Unchecked** (reduces interruptions; use `Alt+F2` instead)
   - "Report notifications": **Checked**
   - "Report object descriptions": **Checked**

3. **Speech settings:**
   - "Punctuation/symbol level": **Some** or **Most** (for code reading)
   - "Automatic language switching": **Checked** (useful for multilingual docs)

4. **Input Composition:**
   - "Announce candidates during IME text composition": **Checked**

**NVDA add-ons for VS Code:**
- **Focus Highlight** - shows focus location visually (helpful for sighted trainers)
- **IndentNav** - navigate by indentation level (useful for Python, YAML)

**VS Code-specific NVDA commands:**

| Action | NVDA Command |
|--------|--------------|
| Read from cursor | `Insert+Down Arrow` |
| Read all | `Insert+Down Arrow` (twice) |
| Stop speech | `Control` |
| Say all in focus mode | `NVDA+Shift+Down Arrow` |
| Move to containing browse mode document | `NVDA+Control+Space` |

### JAWS Configuration for VS Code

**Recommended JAWS settings:**

1. **Settings Center → HTML/PDF/Accessibility:**
   - "Auto Forms Mode": **Checked**
   - "ARIA Live Region Verbosity": **Polite** or **Assertive** (depending on preference)
   - "Report tooltip text": **Unchecked** (use `Alt+F2` instead)

2. **Settings Center → Reading:**
   - "Punctuation Level": **Most** (for code)
   - "Speak Long Lines Continuously": **Yes**

3. **Settings Center → Text Processing:**
   - "Blank Line Announcement": **Tone** (less verbose than speech)

**JAWS scripts for VS Code:**

Custom JAWS scripts exist for VS Code. Check: [jaws-vscode-scripts (GitHub)](https://github.com/search?q=jaws+vscode+scripts) for community-maintained scripts.

**VS Code-specific JAWS commands:**

| Action | JAWS Command |
|--------|--------------|
| Say current line | `Insert+Up Arrow` |
| Read from cursor | `Insert+Page Down` |
| Read to end | `Insert+Page Down` (twice) |
| Toggle virtual cursor | `Insert+Z` |
| List links | `Insert+F7` |
| List headings | `Insert+F6` |

### VoiceOver Configuration for VS Code (macOS)

**Recommended VoiceOver Utility settings:**

1. **Verbosity → Text:**
   - "Punctuation": **All** (for code and Markdown)
   - "Capitalization": **Speak cap** (useful for acronyms and code)
   - "Reading Units": Set to **sentenceboundary** for prose, **word** for code

2. **Verbosity → Announcements:**
   - "Content Changes": **On** (for live regions like Copilot Chat)
   - "Status Messages": **On**

3. **Navigation:**
   - "Quick Nav": **OFF** when inside editor (use `Left+Right Arrow` to toggle)
   - "Auto-interact with elements": **Off** (manual control preferred)

4. **Sound:**
   - "Enable positional audio": **On** (helps orient focus location)
   - "Mute sound effects": **Off** (audio cues are helpful)

**VS Code-specific VoiceOver commands:**

| Action | VoiceOver Command |
|--------|--------------|
| Read from cursor | `VO+A` |
| Read all | `VO+Shift+Down Arrow` (in text area) |
| Stop reading | `Control` |
| Interact with element | `VO+Shift+Down Arrow` |
| Stop interacting | `VO+Shift+Up Arrow` |
| Jump to heading | `VO+Command+H` |
| Open rotor | `VO+U` |
| Navigate rotor | `Left/Right Arrow`, then `Up/Down Arrow` |

**Quick Nav navigation (when enabled):**

| Command | Action |
|---------|--------|
| `H` | Next heading |
| `Shift+H` | Previous heading |
| `L` | Next link |
| `T` | Next table |
| `B` | Next button |
| `F` | Next form control |

**Note:** Quick Nav should be OFF when editing text (conflicts with text navigation).


## 5. Complete Keyboard Shortcuts

> For screen reader navigation shortcuts when using GitHub in a browser (NVDA, JAWS, VoiceOver), see [Appendix B - Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md).

### Global Navigation

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open (Go to File) | `Ctrl+P` | `Cmd+P` |
| Settings | `Ctrl+,` | `Cmd+,` |
| Keyboard Shortcuts | `Ctrl+K Ctrl+S` | `Cmd+K Cmd+S` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |
| Toggle Panel (terminal/output) | `Ctrl+J` | `Cmd+J` |
| Toggle Full Screen | `F11` | `Ctrl+Cmd+F` |
| Zen Mode | `Ctrl+K Z` | `Cmd+K Z` |
| Close Window | `Ctrl+W` | `Cmd+W` |
| New Window | `Ctrl+Shift+N` | `Cmd+Shift+N` |

### Sidebar Panels

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Explorer | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| Search | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Run and Debug | `Ctrl+Shift+D` | `Cmd+Shift+D` |
| Extensions | `Ctrl+Shift+X` | `Cmd+Shift+X` |

### Editor - File Operations

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| New File | `Ctrl+N` | `Cmd+N` |
| Open File | `Ctrl+O` | `Cmd+O` |
| Save | `Ctrl+S` | `Cmd+S` |
| Save As | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| Save All | `Ctrl+K S` | `Cmd+Option+S` |
| Close Editor | `Ctrl+W` | `Cmd+W` |
| Close All Editors | `Ctrl+K W` | `Cmd+K W` |
| Reopen Closed Editor | `Ctrl+Shift+T` | `Cmd+Shift+T` |
| Switch Between Editors | `Ctrl+Tab` | `Ctrl+Tab` |
| Focus First Editor | `Ctrl+1` | `Cmd+1` |
| Focus Second Editor | `Ctrl+2` | `Cmd+2` |
| Split Editor | `Ctrl+\` | `Cmd+\` |

### Editor - Navigation

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Go to Line | `Ctrl+G` | `Ctrl+G` |
| Go to Symbol | `Ctrl+Shift+O` | `Cmd+Shift+O` |
| Go to Definition | `F12` | `F12` |
| Peek Definition | `Alt+F12` | `Option+F12` |
| Go to References | `Shift+F12` | `Shift+F12` |
| Go Back (navigate history) | `Alt+Left` | `Ctrl+-` |
| Go Forward | `Alt+Right` | `Ctrl+Shift+-` |
| Scroll Up | `Ctrl+Up` | `Cmd+Up` |
| Scroll Down | `Ctrl+Down` | `Cmd+Down` |
| Move to Top of File | `Ctrl+Home` | `Cmd+Home` or `Cmd+Up` |
| Move to Bottom of File | `Ctrl+End` | `Cmd+End` or `Cmd+Down` |
| Move to Beginning of Line | `Home` | `Cmd+Left` |
| Move to End of Line | `End` | `Cmd+Right` |
| Expand Selection | `Shift+Alt+Right` | `Shift+Option+Right` |
| Shrink Selection | `Shift+Alt+Left` | `Shift+Option+Left` |

### Editor - Editing

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Cut Line | `Ctrl+X` | `Cmd+X` |
| Copy Line | `Ctrl+C` | `Cmd+C` |
| Paste | `Ctrl+V` | `Cmd+V` |
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Shift+Z` or `Ctrl+Y` | `Cmd+Shift+Z` |
| Delete Line | `Ctrl+Shift+K` | `Cmd+Shift+K` |
| Insert Line Below | `Ctrl+Enter` | `Cmd+Enter` |
| Insert Line Above | `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` |
| Move Line Up | `Alt+Up` | `Option+Up` |
| Move Line Down | `Alt+Down` | `Option+Down` |
| Copy Line Up | `Shift+Alt+Up` | `Shift+Option+Up` |
| Copy Line Down | `Shift+Alt+Down` | `Shift+Option+Down` |
| Join Lines | `Ctrl+J` | `Cmd+J` |
| Toggle Line Comment | `Ctrl+/` | `Cmd+/` |
| Toggle Block Comment | `Shift+Alt+A` | `Shift+Option+A` |
| Format Document | `Shift+Alt+F` | `Shift+Option+F` |
| Format Selection | `Ctrl+K Ctrl+F` | `Cmd+K Cmd+F` |

### Editor - Find and Replace

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Find | `Ctrl+F` | `Cmd+F` |
| Replace | `Ctrl+H` | `Cmd+H` |
| Find Next | `F3` or `Enter` | `Cmd+G` or `Enter` |
| Find Previous | `Shift+F3` | `Cmd+Shift+G` |
| Select All Occurrences | `Ctrl+Shift+L` | `Cmd+Shift+L` |
| Add Selection to Next Find Match | `Ctrl+D` | `Cmd+D` |
| Toggle Match Case | `Alt+C` | `Option+C` |
| Toggle Whole Word | `Alt+W` | `Option+W` |
| Toggle Regex | `Alt+R` | `Option+R` |

### Editor - Multi-Cursor

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Add Cursor Above | `Ctrl+Alt+Up` | `Cmd+Option+Up` |
| Add Cursor Below | `Ctrl+Alt+Down` | `Cmd+Option+Down` |
| Add Cursor to Line Ends | `Shift+Alt+I` | `Shift+Option+I` |
| Undo Last Cursor Operation | `Ctrl+U` | `Cmd+U` |

### Terminal

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Toggle Terminal | `Ctrl+Backtick` | `Ctrl+Backtick` |
| Create New Terminal | `Ctrl+Shift+Backtick` | `Ctrl+Shift+Backtick` |
| Focus Terminal | `Ctrl+Backtick` | `Ctrl+Backtick` |
| Kill Terminal | `Ctrl+Shift+K` (in terminal) | `Cmd+Shift+K` |
| Scroll Up in Terminal | `Ctrl+Shift+Up` | `Cmd+Shift+Up` |
| Scroll Down in Terminal | `Ctrl+Shift+Down` | `Cmd+Shift+Down` |

### Source Control (Git)

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Open Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Commit (in message field) | `Ctrl+Enter` | `Cmd+Enter` |
| Stage File | `Ctrl+Enter` (on file) | `Cmd+Enter` |
| Refresh Source Control | `Ctrl+R` (in SC panel) | `Cmd+R` |

### Diff Viewer

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Next Diff Hunk | `F7` | `F7` |
| Previous Diff Hunk | `Shift+F7` | `Shift+F7` |
| Open Accessible Diff Viewer | `Alt+F2` | `Option+F2` |

### Copilot

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Accept Suggestion | `Tab` | `Tab` |
| Reject Suggestion | `Escape` | `Escape` |
| Accept Word | `Ctrl+Right` | `Cmd+Right` |
| Next Suggestion | `Alt+]` | `Option+]` |
| Previous Suggestion | `Alt+[` | `Option+[` |
| Open Suggestions List | `Ctrl+Enter` | `Cmd+Enter` |
| Open Suggestion in Accessible View | `Alt+F2` | `Option+F2` |
| Insert Suggestion from Accessible View | `Ctrl+/` | `Cmd+/` |
| Open Copilot Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| Inline Chat | `Ctrl+I` | `Cmd+I` |
| Quick Chat | `Ctrl+Shift+Alt+I` | `Cmd+Shift+Ctrl+I` |

### Accessibility Features

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Toggle Screen Reader Mode | `Shift+Alt+F1` | `Shift+Option+F1` |
| Accessible Help | `Alt+H` | `Option+H` |
| Accessible View | `Alt+F2` | `Option+F2` |
| Announce Cursor Position | `Ctrl+Alt+Shift+G` | `Cmd+Option+Shift+G` |
| Open Accessibility Help | `Ctrl+Shift+P` → "Help: Accessibility Help" | Same |

### Problems Panel

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Show Problems | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Go to Next Error/Warning | `F8` | `F8` |
| Go to Previous Error/Warning | `Shift+F8` | `Shift+F8` |

### Markdown Preview

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Toggle Preview | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Open Preview to Side | `Ctrl+K V` | `Cmd+K V` |


## 6. Accessibility Signals Types and Customization

Accessibility signals are events that trigger announcements or audio cues. Beyond audio cues, VS Code has verbal announcements for various events.

### Announcement Verbosity Settings

Control how much information VS Code announces:

| Setting | Values | Default | Controls |
|---------|--------|---------|----------|
| `accessibility.verbosity.diffEditor` | `verbose`, `minimal`, `off` | `verbose` | Diff viewer context announcements |
| `accessibility.verbosity.editor` | `verbose`, `minimal`, `off` | `verbose` | General editor announcements |
| `accessibility.verbosity.hover` | `verbose`, `minimal`, `off` | `verbose` | Hover popup announcements |
| `accessibility.verbosity.inlineCompletions` | `verbose`, `minimal`, `off` | `verbose` | Copilot suggestion announcements |
| `accessibility.verbosity.terminal` | `verbose`, `minimal`, `off` | `verbose` | Terminal operation announcements |

**`verbose`:** Announces full context and details  
**`minimal`:** Announces only essential information  
**`off`:** No automatic announcements (use Accessible View manually)

### Custom Announcement Timing

Control when and how often announcements occur:

| Setting | Values | Default | Description |
|---------|--------|---------|-------------|
| `accessibility.signals.debouncePositionChanges` | number (ms) | `500` | Delay before announcing position changes (prevents spam during rapid navigation) |
| `accessibility.signals.onDidChangeFocus` | boolean | `true` | Announce focus changes |
| `accessibility.signals.onDidChangeModelContent` | boolean | `false` | Announce content changes (very verbose) |

### Signal Priorities

When multiple signals occur simultaneously, VS Code prioritizes them:

1. **Errors** (highest priority) - always announced
2. **Warnings** - announced after errors
3. **Completions** - announced if no errors/warnings
4. **Focus changes** - announced last

This prevents overlapping announcements.


## 7. Settings.json Configuration Examples

### Minimal Screen Reader Profile

**For users who prefer minimal announcements and use Accessible View manually:**

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on",
  "diffEditor.renderSideBySide": false,
  "accessibility.verbosity.diffEditor": "minimal",
  "accessibility.verbosity.editor": "minimal",
  "accessibility.verbosity.hover": "minimal",
  "accessibility.verbosity.inlineCompletions": "minimal",
  "accessibility.signals.lineHasError": "on",
  "accessibility.signals.taskCompleted": "on",
  "accessibility.signals.taskFailed": "on"
}
```

### Maximum Feedback Profile

**For users who want all audio and verbal announcements:**

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on",
  "diffEditor.renderSideBySide": false,
  "accessibility.verbosity.diffEditor": "verbose",
  "accessibility.verbosity.editor": "verbose",
  "accessibility.verbosity.hover": "verbose",
  "accessibility.verbosity.inlineCompletions": "verbose",
  "accessibility.verbosity.terminal": "verbose",
  "accessibility.signals.lineHasError": "on",
  "accessibility.signals.lineHasWarning": "on",
  "accessibility.signals.taskCompleted": "on",
  "accessibility.signals.taskFailed": "on",
  "accessibility.signals.diffLineInserted": "on",
  "accessibility.signals.diffLineDeleted": "on",
  "accessibility.signals.chatResponseReceived": "on",
  "accessibility.signals.chatResponsePending": "on",
  "accessibility.signals.save": "on",
  "accessibility.signals.clear": "on",
  "accessibility.signals.format": "on",
  "accessibility.signals.terminalBell": "on",
  "accessibility.signals.terminalCommandFailed": "on",
  "terminal.integrated.enableBell": true
}
```

### Copilot-Optimized Profile

**For users working heavily with GitHub Copilot:**

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "accessibility.verbosity.inlineCompletions": "minimal",
  "accessibility.verbosity.panelChat": "minimal",
  "accessibility.signals.lineHasInlineSuggestion": "on",
  "accessibility.signals.chatResponsePending": "on",
  "accessibility.signals.chatResponseReceived": "on",
  "accessibility.signals.chatRequestSent": "on",
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": false,
    "markdown": true
  }
}
```

**Note:** The `github.copilot.enable` object controls which file types get Copilot suggestions.

### Git/Diff-Optimized Profile

**For users doing heavy PR review and diff work:**

```json
{
  "editor.accessibilitySupport": "on",
  "diffEditor.renderSideBySide": false,
  "diffEditor.ignoreTrimWhitespace": true,
  "diffEditor.wordWrap": "on",
  "diffEditor.diffAlgorithm": "advanced",
  "accessibility.verbosity.diffEditor": "verbose",
  "accessibility.signals.diffLineInserted": "on",
  "accessibility.signals.diffLineDeleted": "on",
  "accessibility.signals.diffLineModified": "on",
  "scm.diffDecorations": "gutter",
  "scm.diffDecorationsGutterWidth": 2
}
```

### Performance-Optimized Profile

**For users on slower machines or with large repositories:**

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.guides.indentation": false,
  "editor.guides.bracketPairs": false,
  "editor.occurrencesHighlight": false,
  "editor.selectionHighlight": false,
  "editor.hover.enabled": true,
  "editor.hover.delay": 1000,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.vscode": false
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true
  }
}
```


## Quick Copy: Complete Recommended Settings

**Paste this into your `settings.json` for a balanced screen reader profile:**

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on",
  "diffEditor.renderSideBySide": false,
  "diffEditor.ignoreTrimWhitespace": true,
  "diffEditor.wordWrap": "on",
  "accessibility.verbosity.diffEditor": "verbose",
  "accessibility.verbosity.editor": "verbose",
  "accessibility.verbosity.hover": "verbose",
  "accessibility.verbosity.inlineCompletions": "minimal",
  "accessibility.verbosity.panelChat": "minimal",
  "accessibility.signals.lineHasError": "on",
  "accessibility.signals.lineHasWarning": "auto",
  "accessibility.signals.taskCompleted": "on",
  "accessibility.signals.taskFailed": "on",
  "accessibility.signals.diffLineInserted": "on",
  "accessibility.signals.diffLineDeleted": "on",
  "accessibility.signals.chatResponseReceived": "on",
  "terminal.integrated.enableBell": true,
  "workbench.editor.enablePreview": false
}
```


*Back to: [VS Code Setup & Accessibility Basics](05-vscode-accessibility.md) | [GitHub Copilot](13-github-copilot.md) | [Accessibility Agents](16-accessibility-agents.md)*  
*Related: [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
