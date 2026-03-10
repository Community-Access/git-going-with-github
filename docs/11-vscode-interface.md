# VS Code: Interface and Setup

> **Listen to Episode 11:** [VS Code Setup and Accessibility](../PODCASTS.md) - a conversational audio overview covering both this chapter and [Chapter 12](12-vscode-accessibility.md).

## Your Accessible Development Environment - The Foundation

> **Day 2, Block 1 Material**
>
> This chapter covers the VS Code interface: launching VS Code, signing in to GitHub, verifying Copilot is active, configuring screen reader mode, and navigating the Activity Bar, Status Bar, menus, settings, and keyboard shortcuts.
>
> For accessibility deep-dive topics (keyboard navigation, Problems panel, Terminal, Copilot Chat, Accessible Help/View/Diff, Accessibility Signals, and VS Code Speech), see [Chapter 12: VS Code Accessibility Deep Dive](12-vscode-accessibility.md).
>
> **Prerequisites:** Complete Day 1 walkthrough of GitHub's browser interface before working through VS Code material.

## Workshop Recommendation (Chapter 5)

For this workshop, Chapter 5 is a **guided setup chapter** with a lightweight completion challenge.

- **Challenge count:** 1 guided walkthrough
- **Automation check:** none - setup state is local/account-level and cannot be validated by the Learning Room PR bot
- **Evidence:** structured completion comment on your assigned challenge issue
- **Pattern:** open, configure, navigate, verify

### Chapter 5 Challenge Set

1. **VS Code accessibility baseline** - open VS Code (github.dev or desktop), enable screen reader mode, sign in to GitHub, verify Copilot status, and navigate core surfaces.

### Challenge 5.1 Step-by-Step: VS Code Accessibility Baseline

**Goal:** Confirm you can access VS Code (github.dev or desktop), enable screen reader support, sign in to GitHub, check Copilot status, and perform core navigation.

**Where you are working:** github.dev (VS Code in the browser) or desktop VS Code if you installed it in Block 0.

**Estimated time:** 10-15 minutes.

1. Open the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com.
2. Press `.` (the period key) on your keyboard. This launches **github.dev** - a full VS Code editor running in your browser. Wait a few seconds for it to load.
3. Enable screen reader mode:
   - **Windows (NVDA/JAWS):** Press `Shift+Alt+F1`. You should hear an announcement confirming screen reader mode is on.
   - **Mac (VoiceOver):** Screen reader mode is usually already optimized. If navigation feels wrong, open Command Palette (`Cmd+Shift+P`) and run `Toggle Screen Reader Accessibility Mode`.
4. Open the **Explorer** panel with `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`). Your screen reader should announce the file tree.
5. Navigate to and open `README.md` from the file tree. Use arrow keys to move through files and `Enter` to open.
6. Open the **outline/symbols** view with `Ctrl+Shift+O` (Mac: `Cmd+Shift+O`). This shows all headings and sections in the current file - a key navigation tool for screen reader users.
7. Open the **Command Palette** with `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`). Type any command name (for example, `Toggle Word Wrap`) and press `Enter` to run it. Press `Escape` to close without running.
8. Check the **Accounts** button in the Activity Bar (bottom-left of the sidebar). If you are signed in, your screen reader announces your GitHub username. If not, activate it and sign in with GitHub.
9. Check the **Status Bar** at the bottom of the window. Tab or arrow through it to find GitHub Copilot status. If Copilot is active, you hear an indicator showing it is ready.

**You are done when:** You have successfully opened github.dev, enabled screen reader mode, signed in to GitHub, confirmed Copilot status, opened a file, viewed its outline, and run a command from the Command Palette.

### Completing Chapter 5: Submit Your Evidence

Return to GitHub.com, open your **assigned Chapter 5 challenge issue**, and post a completion comment:

```text
Chapter 5 completed:
- Opened github.dev: yes / no
- Screen reader mode enabled: yes / no
- Signed in to GitHub: yes / no
- Copilot status checked: yes / no
- Opened file in Explorer: yes / no
- Opened outline/symbols: yes / no
- Opened Command Palette: yes / no
```

If any step was "no," add a note explaining where you got stuck so the facilitator can help. Close your Chapter 5 challenge issue when done.

### Expected Outcomes

- Student can launch and navigate github.dev or desktop VS Code.
- Student can enable screen reader mode and hear navigation announcements.
- Student has signed in to GitHub and can see their account status.
- Student has verified GitHub Copilot is active (or knows it requires desktop VS Code).
- Student can open core navigation surfaces (Explorer, Outline, Command Palette).
- Student is ready for VS Code-based contribution chapters (6-16).

### If You Get Stuck

1. Nothing happens when you press `.`? Make sure you are on the repository's main page (not inside an issue or PR). The `.` shortcut only works on repository code pages.
2. Screen reader mode toggle did not announce anything? Open Command Palette (`Ctrl+Shift+P`) and type `Screen Reader` to find the toggle manually.
3. Explorer panel is empty? VS Code may still be loading the repository. Wait 5-10 seconds and press `Ctrl+Shift+E` again.
4. On Mac with VoiceOver, navigation feels wrong? Run `Toggle Screen Reader Accessibility Mode` from Command Palette. VoiceOver sometimes needs the explicit toggle.
5. Cannot find the Accounts button? Open Command Palette and type `Accounts` to manage sign-in from there.
6. Copilot not showing in the status bar? github.dev does not support Copilot - you need desktop VS Code or a Codespace.
7. Shortcut not working? Use Command Palette as a fallback for any action - type what you want to do and VS Code will find the command.
8. Ask facilitator for a side-by-side demo and repeat the same steps.

### Learning Moment

Tool setup is part of contribution skill. A stable, accessible editor reduces stress and increases contribution quality. The surfaces you just tested - github.dev launch, screen reader mode, GitHub sign-in, Copilot status, Explorer, Outline, and Command Palette - are the foundation for everything in Day 2.

### Learning Pattern Used in This Chapter

1. Open the tool in the simplest way possible (`.` key for github.dev).
2. Sign in and verify your identity and tools are ready (Accounts, Copilot).
3. Configure accessibility before doing any work (screen reader mode first).
4. Verify each navigation surface works with your assistive technology.
5. Record what worked and what didn't (evidence comment).


## Table of Contents

1. [Why VS Code for Open Source Contribution](#1-why-vs-code-for-open-source-contribution)
2. [The Bridge: github.dev - VS Code in Your Browser](#2-the-bridge-githubdev---vs-code-in-your-browser)
3. [Screen Reader Mode in VS Code](#3-screen-reader-mode-in-vs-code)
4. [The VS Code Interface Tour](#4-the-vs-code-interface-tour)
5. [The Accounts Button and GitHub Sign-In](#5-the-accounts-button-and-github-sign-in)
6. [Verifying GitHub Copilot Status](#6-verifying-github-copilot-status)
7. [The Status Bar](#7-the-status-bar)
8. [The Menu Bar](#8-the-menu-bar)
9. [Settings Sync](#9-settings-sync)
    - [Profiles](#profiles)
10. [The Settings Editor](#10-the-settings-editor)
11. [The Keyboard Shortcuts Editor](#11-the-keyboard-shortcuts-editor)
12. [Essential Keyboard Navigation and Find/Filter](#12-essential-keyboard-navigation-and-findfilter)
13. [The Problems Panel](#13-the-problems-panel)
14. [The Terminal](#14-the-terminal)
15. [Copilot Chat Window](#15-copilot-chat-window)
16. [Accessible Help, Accessible View, and Accessible Diff](#16-accessible-help-accessible-view-and-accessible-diff)
17. [Accessibility Signals](#17-accessibility-signals)
18. [VS Code Speech - Voice Input and Output](#18-vs-code-speech---voice-input-and-output)
19. [Git Operations Inside VS Code](#19-git-operations-inside-vs-code)


---

## 1. Why VS Code for Open Source Contribution

GitHub's browser interface is excellent for reviewing, discussing, and triaging. VS Code is where you create. The difference:

| Task | Browser | VS Code |
| --- | --- | --- |
| Navigate a repository | Excellent | Explorer sidebar |
| Read issues and PRs | Excellent | GitHub PR extension |
| Comment on a PR | Excellent | GitHub PR extension |
| Edit a file | Web editor | Full text editor with Copilot |
| Review a diff | Files Changed tab | Three-way merge view with navigation |
| Get AI help while writing | Not available | Copilot inline + Chat |
| Run Accessibility Agents | Not available | Copilot Chat with agent files |
| See errors in your contribution | After push | Real-time as you type |

For Markdown contributions (which is most of what [accessibility-agents](https://github.com/Community-Access/accessibility-agents) needs), VS Code gives you Copilot assistance, live preview, and the same Git workflow - with less tab switching and with agents available on every file you open.


---

## 2. The Bridge: github.dev - VS Code in Your Browser

### Before you install anything: try VS Code right now in your browser

GitHub provides a web-based version of VS Code called **github.dev**. It runs entirely in your browser with zero installation. The keyboard shortcuts, screen reader mode, and editor experience are identical to the desktop app.

### How to Access github.dev

#### Method 1: The Period Key Shortcut (Fastest)

From any GitHub repository page:

1. Press `.` (period key - just the period, no modifier keys)
2. The page transforms into VS Code
3. You are now editing in github.dev
4. The URL changes to `github.dev/owner/repo`
5. Screen reader mode works exactly as it does in desktop VS Code (toggle with `Shift+Alt+F1`)

#### Where it works

- Repository home pages
- File view pages
- Pull request pages
- Any branch or commit view

**Screen reader note:** The period key shortcut is a single keypress - no modifier keys. It is GitHub's universal "open this in VS Code" command.

**Alternative: Press `>` (Shift+Period)** to open github.dev in a **new tab**. This preserves your GitHub page and is the preferred method when you want to keep both interfaces open.

#### Method 2: Direct URL

Change the domain in any GitHub URL:

- `github.com/owner/repo` becomes `github.dev/owner/repo`
- Works for any branch, file, or commit URL

#### Method 3: From the Repository Page

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

- **Full text editor with syntax highlighting**
- **All VS Code keyboard shortcuts** (see [Section 11: Keyboard Shortcuts Editor](#11-the-keyboard-shortcuts-editor) and [Appendix M](appendix-g-vscode-reference.md#5-complete-keyboard-shortcuts))
- **Screen reader mode** (`Shift+Alt+F1` to activate - Mac: `Shift+Option+F1`)
- **File Explorer** (`Ctrl+Shift+E` - Mac: `Cmd+Shift+E`) - browse the entire repository
- **Search across files** (`Ctrl+Shift+F` - Mac: `Cmd+Shift+F`)
- **Source Control (Git)** (`Ctrl+Shift+G` - Mac: `Cmd+Shift+G`) - stage, commit, push changes
- **Markdown preview** (`Ctrl+Shift+V` - Mac: `Cmd+Shift+V`)
- **Command Palette** (`Ctrl+Shift+P` - Mac: `Cmd+Shift+P`) - access every VS Code command
- **Go to File** (`Ctrl+P` - Mac: `Cmd+P`) - instant file picker
- **Go to Symbol** (`Ctrl+Shift+O` - Mac: `Cmd+Shift+O`) - navigate by headings in Markdown
- **Multiple editor tabs and split view**
- **Settings sync** - if you sign in, your VS Code settings apply here too


### What github.dev Does NOT Have

- **No terminal** - cannot run shell commands, npm, git CLI
- **No GitHub Copilot** - Copilot requires the desktop app or a Codespace
- **No Accessibility Agents** - agents rely on extensions that need desktop VS Code
- **No extension installation** - extensions are disabled in github.dev
- **No debugger** - debugging requires a local environment
- **No live server or preview** - except Markdown preview, which does work

These limitations are why **desktop VS Code exists**. github.dev is for quick edits and reading code. Desktop is for Copilot, agents, terminal workflows, and full development.


### Why github.dev Matters for This Workshop

**It is the bridge.** You spend Day 1 in the GitHub browser interface. You spend Day 2 in desktop VS Code. github.dev sits in between:

- Same keyboard shortcuts as desktop VS Code (you learn them once)
- Same screen reader mode (you configure it once)
- Same file navigation patterns (Explorer, `Ctrl+P` / Mac: `Cmd+P`, `Ctrl+Shift+O` / Mac: `Cmd+Shift+O`)
- But accessible instantly from any GitHub page with one keystroke

#### Use github.dev when

- You want to edit a file quickly without switching apps
- You are on a machine where you cannot install software
- You want to browse code with VS Code navigation (symbols, search, split view)
- You are reviewing a PR and want to see the full file context

#### Use desktop VS Code when

- You need Copilot inline suggestions
- You want to run Accessibility Agents
- You are making multi-file changes that benefit from AI assistance
- You need a terminal for git commands or running scripts


### Screen Reader Experience in github.dev

#### Activate screen reader mode immediately

1. Press `.` on any GitHub repository to open github.dev
2. Press `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to enable screen reader mode
3. VS Code announces "Screen reader optimized"

#### What changes

- Focus behavior adjusts for keyboard navigation
- Code suggestions are announced via ARIA live regions
- Error messages are announced when you navigate to them
- Inline decorations are suppressed to reduce noise

#### Navigation

- Use `Ctrl+Shift+E` to open the Explorer (file tree)
- Use `Up/Down Arrow` to navigate files
- Press `Enter` on a file to open it in the editor
- The editor behaves like a standard text area - your screen reader's reading commands work normally

#### NVDA/JAWS users

- You remain in Browse/Virtual mode for the overall interface
- When focus enters the editor text area, you are automatically in Forms/Focus mode
- All standard cursor movement works: `Home`, `End`, `Ctrl+Home`, `Ctrl+End`, `Ctrl+F` to find

#### VoiceOver users

- Quick Nav OFF when inside the editor (`Left Arrow + Right Arrow` to toggle)
- Use `VO+Shift+Down` to interact with the editor area
- Standard text navigation (`Control+A` for line start, `Control+E` for line end, etc.)


### Try It Right Now

Before reading the rest of this guide:

1. Open [github.com/community-access/learning-room](https://github.com/community-access/learning-room) in your browser
2. Press `.` (period key)
3. github.dev opens
4. Press `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to enable screen reader mode
5. Press `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`) to open the Explorer
6. Navigate to `README.md` and press `Enter`
7. Press `Ctrl+Home` (Mac: `Cmd+Up`) to go to the top of the file
8. Press `Ctrl+Shift+O` (Mac: `Cmd+Shift+O`) to see the outline (all headings)
9. Close the tab when done

**You just used VS Code.** The desktop version in the rest of this guide is the same experience - with Copilot, agents, and a terminal added.


---

## 3. Screen Reader Mode in VS Code

> **Who needs this section?** If you use NVDA, JAWS, VoiceOver, or another screen reader, read this section before continuing. If you are not using a screen reader, you can skip to [Section 4](#4-the-vs-code-interface-tour) - VS Code works fully without enabling this mode.

VS Code has built-in accessibility support designed for screen reader users. It changes how focus moves, how announcements work, and how navigation behaves.

### Activating Screen Reader Mode

| Method | Steps |
| --- | --- |
| Keyboard shortcut | `Shift+Alt+F1` (Windows) / `Shift+Option+F1` (Mac) |
| Command Palette | `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (Mac) then type "screen reader" then select "Toggle Screen Reader Accessibility Mode" |
| Auto-detection | VS Code detects NVDA and JAWS automatically on Windows; VoiceOver on macOS |

#### Verify it is active

Open Settings (`Ctrl+,` - Mac: `Cmd+,`) then search for `accessibility support` then confirm it shows `on` (not `auto`).

### What Changes in Screen Reader Mode

| Area | Normal Mode | Screen Reader Mode |
| --- | --- | --- |
| Suggestions list | Popup overlay | Announced via ARIA live region |
| Diff navigation | Visual highlighting | Announces "Added" / "Removed" before line content |
| Error indicators | Red underlines | Announced on focus |
| Inline decorations | Displayed visually | Suppressed to reduce noise |
| Tab completion | Visual ghost text | Announced as suggestion |

### NVDA-Specific Settings for VS Code

VS Code uses a web-based renderer. Configure NVDA for best results:

1. Open NVDA Menu then Preferences then Settings then Browse Mode
2. Set "Maximum length of text on a single line" to `10000` (prevents truncation in long lines)
3. Under Object Presentation: set "Report tooltip delay" to `off`
4. Recommended: use **NVDA + Google Chrome** for the integrated browser panels

### JAWS-Specific Settings for VS Code

1. JAWS should detect VS Code automatically and switch to PC Cursor mode for the editor
2. If the editor feels unresponsive, press `Insert+Z` to toggle virtual cursor off
3. For the integrated terminal: use `Insert+Z` to enter forms/PC mode, then interact with the terminal

### VoiceOver-Specific Settings for VS Code (macOS)

1. Open VS Code then `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to confirm screen reader mode
2. In VoiceOver Utility: Verbosity then set "Punctuation" to "All" for reading code
3. Use Quick Nav OFF (`Left+Right Arrow`) when inside the editor - standard cursor navigation is more predictable
4. Use `VO+Shift+Down` to interact with the editor, `VO+Shift+Up` to stop interacting


---

## 4. The VS Code Interface Tour

Before diving into individual features, here is how VS Code is organized. Every area is reachable by keyboard.

### The Five Major Regions

```text
+----------------------------------------------------------+
|  Menu Bar (File, Edit, View, Go, Run, Terminal, Help)    |
+------+---------------------------------------------------+
|      |                                                    |
| A    |  Editor Area                                       |
| c    |  (your files open here)                            |
| t    |                                                    |
| i    |                                                    |
| v    |                                                    |
| i    +---------------------------------------------------+
| t    |                                                    |
| y    |  Panel (Terminal, Problems, Output, Debug Console) |
|      |                                                    |
| B    +---------------------------------------------------+
| a    |  Status Bar (line, column, language, Git branch,   |
| r    |   Copilot status, encoding, notifications)         |
+------+---------------------------------------------------+
```

**Text description of the layout above:** VS Code has five major regions arranged in a grid. The **Menu Bar** spans the full width across the top. Below it, the **Activity Bar** runs vertically along the left edge (it contains icons for Explorer, Source Control, Search, Extensions, and more). The **Sidebar** appears to the right of the Activity Bar and shows content for the selected activity (file tree, search results, etc.). The **Editor Area** fills the large central region where your files open. Below the Editor Area, the **Panel** stretches across the bottom and contains the Terminal, Problems, Output, and Debug Console tabs. Finally, the **Status Bar** runs along the very bottom showing line number, column, language mode, Git branch, Copilot status, encoding, and notifications.

### Navigating Between Regions

| Region | Keyboard Shortcut | What You Hear (Screen Reader) |
| --- | --- | --- |
| Activity Bar icons | `Ctrl+Shift+E` / `G` / `F` / `X` / etc. | "Explorer", "Source Control", etc. |
| Sidebar content | Follows activity bar selection | Tree view or list content |
| Editor area | `Ctrl+1` (first editor group) | File name and cursor position |
| Panel | `Ctrl+Backtick` (terminal) or `Ctrl+Shift+M` (problems) | Panel name announcement |
| Status Bar | `F6` cycles through regions | Status bar items read left to right |

**Key insight:** Press `F6` repeatedly to cycle focus through the major regions: Sidebar, Editor, Panel, Status Bar, and back. This is the universal "where am I, take me somewhere else" key in VS Code.

### Learning Cards: Finding Your Way Around VS Code

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

- **F6** is your best friend - it cycles through regions and your screen reader announces each one
- **Ctrl+Shift+P** (Command Palette) is your safety net - type any action name and VS Code finds it
- **Alt+H** (Accessible Help) tells you what shortcuts work in your current context
- Use **Ctrl+Shift+E** for Explorer, **Ctrl+Shift+G** for Source Control, **Ctrl+Shift+F** for Search
- The editor text area acts like a standard text field - all your screen reader reading commands work

</details>

<details>
<summary>Low vision users</summary>

- **Ctrl+=** / **Ctrl+-** to zoom the entire VS Code window (all UI elements scale)
- **Ctrl+,** then search `editor.fontSize` to set a comfortable default editor font size
- **Ctrl+,** then search `window.zoomLevel` to set a persistent zoom level
- High Contrast themes: **Ctrl+K Ctrl+T** then choose "High Contrast" or "High Contrast Light"
- **Ctrl+,** then search `minimap` - set `editor.minimap.enabled` to `false` to remove the small code overview that may be hard to see
- **Ctrl+B** toggles the sidebar to give the editor more space

</details>

<details>
<summary>Sighted users</summary>

- Click icons in the Activity Bar (left edge) to switch sidebar views
- The bottom Panel shows Terminal, Problems, Output, and Debug Console
- Drag panel borders to resize regions or double-click to collapse them
- **Ctrl+B** toggles the sidebar for a wider editor area
- **Ctrl+J** toggles the bottom Panel
- **Ctrl+Shift+P** opens the Command Palette - the universal search for any action

</details>


---

## 5. The Accounts Button and GitHub Sign-In

The **Accounts** button sits at the bottom of the Activity Bar (the vertical icon strip on the left side of VS Code). It manages your authentication with GitHub, Microsoft, and other services.

### Why Sign In Matters

- **GitHub Copilot** requires an active GitHub sign-in to function
- **Settings Sync** requires sign-in to synchronize your preferences across machines
- **GitHub Pull Requests extension** needs authentication to create and review PRs from VS Code
- Your GitHub identity appears in commits you make from VS Code

### Signing In

#### From the Accounts Button

1. Press `F6` until you hear the Activity Bar, then arrow down to the **Accounts** button (it is at the very bottom of the bar)
2. Press `Enter` to open the Accounts menu
3. Select **"Sign in with GitHub to use GitHub Copilot"** (or a similar prompt)
4. A browser window opens for GitHub OAuth authorization
5. Authorize VS Code, then return to the editor
6. Your screen reader announces your GitHub username in the Accounts button

#### From the Command Palette

1. Press `Ctrl+Shift+P` then type `sign in`
2. Select **"GitHub: Sign In"**
3. Complete the browser OAuth flow and return to VS Code

### Verifying You Are Signed In

- **Accounts button:** Press `F6` to reach the Activity Bar, arrow down to Accounts. A screen reader announces your username.
- **Command Palette:** `Ctrl+Shift+P` then type `GitHub Copilot: Status`. If Copilot shows ready, you are signed in.
- **Status Bar:** Look for (or hear) the Copilot icon in the status bar at the bottom of the window.

### Learning Cards: GitHub Sign-In

<details>
<summary>Screen reader users</summary>

- Press `F6` to cycle to the Activity Bar, then `Down Arrow` to the bottom to find the Accounts button
- After signing in, the Accounts button label changes from "Accounts" to your GitHub username
- If browser OAuth does not redirect back automatically, check for a "paste this code" dialog in VS Code - type the code displayed in your browser

</details>

<details>
<summary>Low vision users</summary>

- The Accounts icon is the person silhouette at the bottom of the leftmost icon column
- After sign-in, a small dot or badge appears on the icon indicating active session
- If the icon is hard to see, use **Ctrl+Shift+P** and type `Accounts` to manage sign-in from the Command Palette

</details>

<details>
<summary>Sighted users</summary>

- Click the person icon at the bottom of the Activity Bar
- A dropdown menu shows your sign-in status and available accounts
- After sign-in, the icon changes to show your GitHub avatar

</details>


---

## 6. Verifying GitHub Copilot Status

GitHub Copilot is your AI pair programmer. Before starting any contribution work, confirm it is active and responding.

### Where to Check Copilot Status

#### Status Bar Indicator

The Copilot icon appears in the **Status Bar** at the bottom-right of the VS Code window.

| Icon State | Meaning |
| --- | --- |
| Copilot icon (normal) | Copilot is active and ready |
| Copilot icon with warning triangle | Copilot has a configuration issue |
| Copilot icon with slash-through | Copilot is disabled for this file type |
| No Copilot icon | Extension not installed or not signed in |

#### Command Palette Check

1. Press `Ctrl+Shift+P`
2. Type `GitHub Copilot: Status`
3. The output shows whether Copilot is signed in, active, or has errors

#### Quick Test

1. Open any `.md` file in the editor
2. Start typing a sentence (for example, `## Getting Started with`)
3. If Copilot is active, a gray ghost-text suggestion appears after a brief pause
4. Press `Tab` to accept or `Escape` to dismiss

### Troubleshooting Copilot

| Problem | Solution |
| --- | --- |
| No Copilot icon in status bar | Install the GitHub Copilot extension: `Ctrl+Shift+X` then search `GitHub Copilot` then install |
| Icon shows warning | Open Output panel (`Ctrl+Shift+U`), select "GitHub Copilot" from the dropdown, read the error |
| "Not signed in" | Sign in to GitHub (Section 5 above) |
| Copilot not suggesting | Check that Copilot is not disabled for the file type: `Ctrl+Shift+P` then `GitHub Copilot: Toggle` |
| Works on desktop but not github.dev | Expected behavior. github.dev does not support Copilot. Use desktop VS Code or a Codespace. |

### Learning Cards: Copilot Status

<details>
<summary>Screen reader users</summary>

- The Copilot status bar item is announced when you Tab through the status bar
- After sign-in, press `Ctrl+Shift+P` then type `Copilot Status` - the announcement tells you the full state
- When Copilot generates a suggestion, NVDA and JAWS announce it as ghost text; press `Tab` to accept
- Press `Alt+F2` (Accessible View) to read the full Copilot suggestion in a clean text view

</details>

<details>
<summary>Low vision users</summary>

- The Copilot icon is a small two-petal/sparkle icon near the right side of the Status Bar
- Copilot suggestions appear as dimmed gray text ahead of your cursor - increase editor contrast or zoom level if they are hard to see
- Use a High Contrast theme for clearer distinction between your text and Copilot ghost text

</details>

<details>
<summary>Sighted users</summary>

- Look for the Copilot sparkle icon in the bottom-right Status Bar
- Gray ghost text after your cursor means Copilot is generating a suggestion
- Click the Copilot icon for a quick status menu showing enabled/disabled state

</details>


---

## 7. The Status Bar

The **Status Bar** is the thin strip at the bottom of the VS Code window. It provides real-time information about your workspace, file, and active tools.

### What the Status Bar Contains (Left to Right)

| Item | What It Shows | How to Interact |
| --- | --- | --- |
| Git branch | Current branch name (e.g., `main`) | Click or press to switch branches |
| Sync status | Pending push/pull count | Click to sync (push/pull) |
| Errors and warnings | Error/warning count in workspace | Click opens Problems panel (`Ctrl+Shift+M`) |
| Line and column | Cursor position (e.g., `Ln 42, Col 8`) | Click opens Go to Line (`Ctrl+G`) |
| Indentation | Spaces or tabs and count | Click to change indent settings |
| Encoding | File encoding (e.g., `UTF-8`) | Click to change encoding |
| End of line | `LF` or `CRLF` | Click to change line endings |
| Language mode | File type (e.g., `Markdown`) | Click to change language |
| Copilot status | GitHub Copilot state | Click for Copilot menu |
| Notification bell | Unread notifications | Click to view notifications |

### Navigating the Status Bar with a Keyboard

1. Press `F6` until your screen reader announces the Status Bar
2. Use `Tab` to move between items from left to right
3. Press `Enter` on any item to activate it (open a picker, toggle a setting, etc.)
4. Press `Escape` to return to the editor

### Learning Cards: Status Bar

<details>
<summary>Screen reader users</summary>

- Press `F6` repeatedly until you hear "Status Bar" - then `Tab` through items
- Each item is announced with its current value (e.g., "Ln 42, Col 8" or "main branch")
- The errors/warnings item announces the count - press `Enter` to jump to the Problems panel
- After reviewing, press `Escape` then `Ctrl+1` to return to the editor

</details>

<details>
<summary>Low vision users</summary>

- The Status Bar text is small by default - use `Ctrl+=` to zoom the entire window
- Different-colored sections help identify areas: left side (Git/sync), center (position), right side (Copilot/language)
- Status Bar background color changes in certain contexts (e.g., debugging turns it orange, no folder is purple)

</details>

<details>
<summary>Sighted users</summary>

- Click any Status Bar item to interact with it
- The colored background indicates context: blue (normal workspace), purple (no folder open), orange (debugging)
- Hover over items for tooltips with additional detail

</details>


---

## 8. The Menu Bar

The **Menu Bar** runs along the top of the VS Code window and provides structured access to every command category.

### Menu Bar Structure

| Menu | Key Contents |
| --- | --- |
| **File** | New File, Open Folder, Save, Auto Save, Preferences (Settings, Keyboard Shortcuts, Extensions) |
| **Edit** | Undo, Redo, Cut, Copy, Paste, Find, Replace |
| **Selection** | Select All, Expand Selection, Add Cursor |
| **View** | Explorer, Search, Source Control, Extensions, Terminal, Problems, Command Palette, Appearance (zoom, sidebar, panel toggles) |
| **Go** | Go to File, Go to Symbol, Go to Line, Go to Definition, Back/Forward navigation |
| **Run** | Start Debugging, Run Without Debugging, Add Configuration |
| **Terminal** | New Terminal, Split Terminal, Run Active File, Run Selected Text |
| **Help** | Welcome, Documentation, Keyboard Shortcuts Reference, Accessibility Help |

### Accessing the Menu Bar

| Method | Steps |
| --- | --- |
| Keyboard (Windows/Linux) | Press `Alt` or `F10` to focus the menu bar, then use arrow keys |
| Keyboard (Mac) | `Ctrl+F2` or use the system menu bar |
| Command Palette | `Ctrl+Shift+P` gives access to all the same commands without the menu |

### Learning Cards: Menu Bar

<details>
<summary>Screen reader users</summary>

- Press `F10` (or `Alt`) to enter the Menu Bar. Your screen reader announces "File" menu
- Use `Left/Right Arrow` to move between menus (File, Edit, View, Go, Run, Terminal, Help)
- Press `Enter` or `Down Arrow` to open a menu and browse items
- Each menu item includes its keyboard shortcut in the announcement (e.g., "New File, Ctrl+N")
- Press `Escape` to close and return to the editor

</details>

<details>
<summary>Low vision users</summary>

- The Menu Bar respects your zoom level - increase window zoom for larger text
- Menu items show keyboard shortcuts on the right side of each entry
- Use the Help menu to access "Keyboard Shortcuts Reference" for a printable cheat sheet

</details>

<details>
<summary>Sighted users</summary>

- Click any menu name to open its dropdown
- Keyboard shortcuts are displayed to the right of each menu item
- The View menu controls which panels and sidebars are visible

</details>


---

## 9. Settings Sync

**Settings Sync** synchronizes your VS Code configuration across multiple machines and between desktop VS Code and github.dev. When you sign in and enable sync, your settings, keyboard shortcuts, extensions, UI state, and profiles travel with you.

### What Gets Synced

| Category | Examples |
| --- | --- |
| Settings | `editor.fontSize`, `editor.accessibilitySupport`, color theme, zoom level |
| Keyboard Shortcuts | All custom keybindings |
| Extensions | Installed extensions list |
| UI State | Sidebar position, panel visibility, recent files |
| Profiles | Named collections of settings for different workflows |

### Enabling Settings Sync

1. Open the **Accounts** button (Activity Bar, bottom-left) or press `Ctrl+Shift+P` then type `Settings Sync: Turn On`
2. Sign in with your GitHub account (or Microsoft account)
3. Select which categories to sync (recommended: sync everything)
4. VS Code syncs immediately and on every subsequent change

### Conflict Resolution

If settings differ between machines, VS Code shows a merge editor where you choose which version to keep. This is similar to a Git merge conflict but for settings.

### Learning Cards: Settings Sync

<details>
<summary>Screen reader users</summary>

- After enabling sync, all your accessibility settings (screen reader mode, accessibility signals, minimap disabled) apply on every machine
- Changes sync automatically in the background - no manual action needed after initial setup
- If a conflict occurs, VS Code opens a merge editor that is navigable with standard diff commands (F7 / Shift+F7)

</details>

<details>
<summary>Low vision users</summary>

- Your zoom level, font size, and High Contrast theme sync across machines
- After initial setup on one machine, every other VS Code instance immediately gets the same visual configuration
- Use Profiles to maintain separate configurations (e.g., "Presentation" profile with extra-large fonts)

</details>

<details>
<summary>Sighted users</summary>

- The sync status appears as a circular arrow icon in the Activity Bar (bottom-left, near Accounts)
- Conflicts and sync status are shown via notification banners
- Use `Ctrl+Shift+P` then "Settings Sync: Show Synced Data" to review what was synchronized

</details>

### Profiles

VS Code **Profiles** let you create named collections of settings, extensions, keyboard shortcuts, snippets, tasks, and UI state. Each profile is independent - switching profiles changes your entire VS Code configuration instantly. This is useful when you work in different contexts (workshop vs. daily development) or need to present with different display settings.

#### Creating a Profile

| Method | Steps |
| --- | --- |
| Command Palette | `Ctrl+Shift+P` then type `Profiles: Create Profile` |
| Gear menu | Click the gear icon (bottom-left of Activity Bar) then `Profiles` then `Create Profile` |

When creating a profile, you choose what to include:

- **Settings** - editor preferences, accessibility options, theme
- **Keyboard Shortcuts** - all custom keybindings
- **Extensions** - which extensions are installed and enabled
- **Snippets** - code snippet definitions
- **Tasks** - task runner configurations
- **UI State** - sidebar position, panel layout, view visibility

You can start from the current configuration, an empty profile, or an existing profile template.

#### Switching Profiles

| Method | Steps |
| --- | --- |
| Command Palette | `Ctrl+Shift+P` then type `Profiles: Switch Profile` |
| Gear menu | Click the gear icon then `Profiles` then select a profile name |
| Status Bar | The current profile name appears in the Status Bar when you are not using the Default profile - click it to switch |

The active profile name appears in the VS Code title bar and Status Bar so you always know which configuration is active.

#### Workshop Profile Recommendations

Create these profiles before the workshop:

| Profile Name | Purpose | Key Settings |
| --- | --- | --- |
| **Workshop** | Accessibility-optimized for this event | Screen reader mode on, accessibility signals enabled, minimap off, word wrap on (see the [Recommended Workshop Profile](#recommended-workshop-profile) settings in Section 17) |
| **Presentation** | Large fonts for demos or shared screens | `editor.fontSize: 24`, `terminal.integrated.fontSize: 20`, `window.zoomLevel: 2`, High Contrast theme |
| **Default** | Your everyday development settings | Whatever you normally use |

#### Exporting and Sharing Profiles

Profiles can be exported and shared:

1. `Ctrl+Shift+P` then type `Profiles: Export Profile`
2. Choose what to include (settings, extensions, etc.)
3. Export as a **GitHub gist** (shareable link) or a **local file**
4. Share the link or file with others

To import: `Ctrl+Shift+P` then `Profiles: Import Profile` and paste the gist URL or select the file.

**Workshop tip:** Facilitators can export a pre-configured Workshop profile as a GitHub gist and share the link. Students import it in one step and immediately have all accessibility settings configured.

#### Profiles and Settings Sync

Profiles sync across machines through Settings Sync. When you create a profile on one machine and have Settings Sync enabled, the profile appears on every other machine where you are signed in. Each profile syncs independently - changes to one profile do not affect others.

#### Learning Cards: Profiles

<details>
<summary>Screen reader users</summary>

- The Command Palette is the fastest way to switch profiles: `Ctrl+Shift+P` then type `Switch Profile`
- Your screen reader announces the profile name when you switch - listen for the confirmation
- Create a **Workshop** profile with `editor.accessibilitySupport: "on"` and all your accessibility signals configured, so you can switch to it instantly at the start of each session
- The Default profile is always available as a fallback

</details>

<details>
<summary>Low vision users</summary>

- Create a **Presentation** profile with large fonts, high zoom, and a High Contrast theme for pair programming or demos
- Switching profiles changes everything at once - no need to adjust multiple settings individually
- The current profile name in the title bar confirms which configuration is active

</details>

<details>
<summary>Sighted users</summary>

- The gear icon in the Activity Bar (bottom-left) provides quick access to profile management
- Profile names appear in the title bar so you always know your current context
- Export your team's recommended profile as a GitHub gist for easy onboarding

</details>


---

## 10. The Settings Editor

The Settings Editor is where you customize VS Code. There are two views: the graphical settings UI and the raw `settings.json` file.

### Opening the Settings Editor

| Method | Shortcut |
| --- | --- |
| Graphical Settings UI | `Ctrl+,` (Mac: `Cmd+,`) |
| JSON Settings file | `Ctrl+Shift+P` then type "Open User Settings (JSON)" |

### Navigating the Settings Editor

The graphical Settings UI has a **search box** at the top. Type any keyword and the settings list filters instantly.

#### Special Search Filters

| Filter | What It Shows |
| --- | --- |
| `@modified` | Only settings you have changed from their defaults |
| `@tag:accessibility` | All accessibility-related settings |
| `@tag:advanced` | Advanced, less commonly used settings |
| `@tag:experimental` | Experimental features not yet enabled by default |
| `@ext:github.copilot` | Settings for the GitHub Copilot extension |

### Key Accessibility Settings to Configure

```json
{
  "editor.accessibilitySupport": "on",
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.renderWhitespace": "none",
  "editor.fontSize": 16,
  "accessibility.signals.lineHasError": "on",
  "accessibility.signals.taskCompleted": "on",
  "accessibility.signals.chatResponseReceived": "on"
}
```

### Learning Cards: Settings Editor

<details>
<summary>Screen reader users</summary>

- Press `Ctrl+,` to open Settings. Focus lands in the search box - start typing immediately
- Type `@tag:accessibility` to see all accessibility settings grouped together
- Each setting is a form control (checkbox, dropdown, or text input) - use standard form navigation
- For direct JSON editing: `Ctrl+Shift+P` then "Open User Settings (JSON)" - this gives you a standard text editor

</details>

<details>
<summary>Low vision users</summary>

- Search for `editor.fontSize` to set your preferred font size for the code editor
- Search for `window.zoomLevel` to set the overall window zoom (affects all UI)
- Search for `theme` to switch to High Contrast or High Contrast Light themes
- The gear icon has a checkmark for modified settings, making it easy to spot what you have changed

</details>

<details>
<summary>Sighted users</summary>

- Click the gear icon in the bottom-left corner, then select "Settings"
- Use the search box to filter thousands of settings down to what you need
- The "Modified" indicator (blue bar) shows which settings you have customized
- Use the tabs at the top to switch between User settings (global) and Workspace settings (per-project)

</details>


---

## 11. The Keyboard Shortcuts Editor

The Keyboard Shortcuts Editor lets you view, search, and customize every keyboard shortcut in VS Code.

### Opening the Keyboard Shortcuts Editor

| Method | Shortcut |
| --- | --- |
| Graphical editor | `Ctrl+K Ctrl+S` |
| JSON editor | `Ctrl+Shift+P` then type "Open Keyboard Shortcuts (JSON)" |
| From Menu Bar | File then Preferences then Keyboard Shortcuts |

### Searching for Shortcuts

The editor has a search box that supports:

- **Command name:** Type `toggle terminal` to find the terminal toggle shortcut
- **Keystroke recording:** Click the keyboard icon (or press the record keys button) to record a key combination and find what it does
- **When clause:** Find shortcuts that only apply in specific contexts

### Customizing a Shortcut

1. Find the command in the list
2. Double-click the keybinding column (or press `Enter` on the row, then `Enter` again on the keybinding)
3. Press your desired key combination
4. Press `Enter` to confirm

### Learning Cards: Keyboard Shortcuts Editor

<details>
<summary>Screen reader users</summary>

- Press `Ctrl+K Ctrl+S` to open the Keyboard Shortcuts Editor. Focus lands in the search box.
- The results list is a table. Each row announces: Command name, Keybinding, When clause, and Source.
- Navigate rows with `Up/Down Arrow`. Press `Enter` to edit a keybinding.
- Tip: search for `accessibility` to find all accessibility-related shortcuts at once.

</details>

<details>
<summary>Low vision users</summary>

- The shortcut editor is a searchable, sortable table - zoom in as needed
- The Source column shows whether a shortcut is from Default, User, or an Extension
- Use the record keys feature to check what any key combination currently does

</details>

<details>
<summary>Sighted users</summary>

- Press `Ctrl+K Ctrl+S` to open the visual editor
- Click the keyboard icon in the search bar to record a keystroke and find its binding
- Right-click any row for options to change, remove, or reset a keybinding

</details>


---


---

*Next: [VS Code: Accessibility Deep Dive](12-vscode-accessibility.md)*
*Back: [Notifications and Day 1 Close](10-notifications-and-day-1-close.md)*
*Related: [VS Code Reference](appendix-g-vscode-reference.md) | [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
