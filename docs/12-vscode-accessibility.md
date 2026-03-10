# VS Code: Accessibility Deep Dive

> **Listen to Episode 11:** [VS Code Setup and Accessibility](../PODCASTS.md) - a conversational audio overview covering both [Chapter 11](11-vscode-interface.md) and this chapter.

## Accessibility Features for Power Users

> **Day 2, Block 1 Material (continued)**
>
> This chapter covers the accessibility features that make VS Code productive for screen reader users, keyboard-only users, and low-vision users: essential keyboard navigation, the Problems panel, the Terminal, Copilot Chat, Accessible Help/View/Diff, Accessibility Signals, and VS Code Speech.
>
> For VS Code interface basics (setup, sign-in, Activity Bar, Settings, keyboard shortcuts), see [Chapter 11: VS Code Interface and Setup](11-vscode-interface.md).

## 12. Essential Keyboard Navigation and Find/Filter

### Panels and Areas

> **Mac users:** Substitute `Cmd` for `Ctrl` and `Option` for `Alt` in all shortcuts below.

| Area | Shortcut (Windows) | What Gets Focus |
| --- | --- | --- |
| Explorer (file tree) | `Ctrl+Shift+E` | Folder/file list |
| Search | `Ctrl+Shift+F` | Search input |
| Source Control (Git) | `Ctrl+Shift+G` | Changes list |
| Extensions | `Ctrl+Shift+X` | Extensions list |
| Terminal | `` Ctrl+` `` | Terminal input |
| Copilot Chat | `Ctrl+Shift+I` | Chat input |
| Command Palette | `Ctrl+Shift+P` | Command search input |
| Editor | `Ctrl+1` | Active editor file |
| Problems panel | `Ctrl+Shift+M` | List of all errors and warnings |

### Within the Editor

| Action | Shortcut |
| --- | --- |
| Go to beginning of file | `Ctrl+Home` |
| Go to end of file | `Ctrl+End` |
| Go to line N | `Ctrl+G` then type line number |
| Go to line and column | `Ctrl+G` then type `N:C` (e.g., `10:5`) |
| Go to symbol (heading in Markdown) | `Ctrl+Shift+O` |
| Go to definition | `F12` |
| Find in file | `Ctrl+F` |
| Next find result | `F3` |
| Previous find result | `Shift+F3` |
| Next error or warning | `F8` |
| Previous error or warning | `Shift+F8` |
| Open file by name | `Ctrl+P` then type filename |
| Toggle word wrap | `Alt+Z` |
| Toggle Tab focus mode | `Ctrl+M` (makes Tab move focus instead of indenting) |
| Increase/decrease font size | `Ctrl+=` / `Ctrl+-` |
| Breadcrumb navigation | `Ctrl+Shift+;` then arrow keys to navigate path segments |

### Find in Current File (`Ctrl+F`)

When the Find widget opens, three toggle buttons refine what matches:

| Toggle | Shortcut | What It Does |
| --- | --- | --- |
| Match Case | `Alt+C` | Limits results to exact uppercase/lowercase |
| Match Whole Word | `Alt+W` | Matches full words only, not substrings |
| Use Regular Expression | `Alt+R` | Enables regex patterns in the search box |

#### Screen reader interactions inside the Find widget

- Toggles are announced as checkboxes - press `Space` to toggle each one
- Match count is announced as you type (example: `3 of 12 matches`)
- `F3` / `Shift+F3` move through matches while the widget stays open
- `Escape` closes the widget and returns focus to your last cursor position

**Replace (`Ctrl+H`):** Opens the Find widget with a second input for the replacement text.

- `Ctrl+Shift+1` - replace the current match
- `Ctrl+Alt+Enter` - replace all matches at once

### Global Search Across the Workspace (`Ctrl+Shift+F`)

The global Search panel has a rich filtering system - all keyboard-accessible:

| Action | How |
| --- | --- |
| Open global search | `Ctrl+Shift+F` |
| Search input | Focus lands here automatically - type your query |
| Toggle case / word / regex | `Alt+C`, `Alt+W`, `Alt+R` (same as Find) |
| Include files filter | `Tab` to "files to include" field then type glob patterns |
| Exclude files filter | `Tab` to "files to exclude" field then type glob patterns |
| Collapse all results | `Ctrl+Shift+J` |
| Open a result | Navigate the result tree with `Up/Down Arrow` then `Enter` to open |

#### Glob pattern examples for this workshop

```text
docs/*.md          - all Markdown files in the docs folder
*.agent.md         - all agent definition files
.github/**         - everything inside the .github folder
!node_modules/**   - exclude node_modules folder
```

### Type-to-Filter in Tree Views

In the **Explorer** file tree and the **Source Control** changes list, type characters to narrow visible items:

1. Focus the Explorer (`Ctrl+Shift+E`)
2. Start typing a filename - a filter input appears at the bottom of the tree
3. The tree instantly narrows to matching files
4. Press `Escape` to clear the filter and restore full view

### Go to Symbol with Inline Filtering (`Ctrl+Shift+O`)

In any Markdown file, `Ctrl+Shift+O` opens a symbol picker populated by every heading. Type to narrow the list, then press `Enter` to jump.

### Explorer (File Tree) Navigation

| Action | Key |
| --- | --- |
| Navigate items | `Up/Down Arrow` |
| Expand folder | `Right Arrow` |
| Collapse folder | `Left Arrow` |
| Open file | `Enter` |
| Rename file | `F2` |
| Delete file | `Delete` |
| New file | `Ctrl+N` (then save with `Ctrl+S`) |


---

## 13. The Problems Panel

The **Problems panel** (`Ctrl+Shift+M`) shows all errors, warnings, and informational messages from linters, compilers, and extensions for every open file in your workspace.

### Opening the Problems Panel

- **Keyboard:** `Ctrl+Shift+M`
- **Status Bar:** Click the errors/warnings count (bottom-left of window)
- **Menu Bar:** View then Problems
- **From the editor:** Press `F8` to jump to the next problem (cycles through errors in the current file)

### Navigating Problems

| Action | Shortcut |
| --- | --- |
| Open Problems panel | `Ctrl+Shift+M` |
| Next problem in editor | `F8` |
| Previous problem in editor | `Shift+F8` |
| Filter problems | Type in the filter box at the top of the panel |
| Jump to problem source | `Enter` on a problem row |

### Understanding Problem Entries

Each entry shows:

- **Severity icon:** Error (red circle with X), Warning (yellow triangle), Info (blue circle with i)
- **Message:** Description of the problem
- **Source:** Which tool reported it (e.g., "markdownlint", "eslint", "Pylance")
- **File and line:** Where the problem is located

### Learning Cards: Problems Panel

<details>
<summary>Screen reader users</summary>

- Press `Ctrl+Shift+M` to focus the Problems panel. Your screen reader announces the total count.
- Each problem is read as: severity, message, source, file name, and line number
- Press `Enter` on any problem to jump directly to that line in the editor
- Use `F8` / `Shift+F8` from inside the editor to cycle through problems without opening the panel
- The status bar errors/warnings count updates in real time and is announced when you Tab to it

</details>

<details>
<summary>Low vision users</summary>

- Problems are color-coded: red for errors, yellow for warnings, blue for info
- The errors/warnings count in the Status Bar gives a quick overview
- Click any problem to jump to the exact file and line
- Filter the panel by typing keywords to reduce visual noise

</details>

<details>
<summary>Sighted users</summary>

- The Problems panel is in the bottom Panel area alongside Terminal and Output
- Red squiggly underlines in the editor correspond to problems in this panel
- Click any problem to navigate to its location
- Use the filter and severity toggles to focus on what matters

</details>


---

## 14. The Terminal

VS Code includes a fully featured integrated terminal. You can run shell commands, Git operations, and scripts without leaving the editor.

### Opening and Managing Terminals

| Action | Shortcut |
| --- | --- |
| Toggle terminal | `` Ctrl+` `` (backtick) |
| New terminal | `` Ctrl+Shift+` `` |
| Split terminal | `Ctrl+Shift+5` |
| Next terminal | Focus terminal then `Ctrl+PageDown` |
| Previous terminal | Focus terminal then `Ctrl+PageUp` |
| Kill terminal | Type `exit` or use the trash icon |

### Terminal Shell Integration

VS Code's shell integration enhances the terminal with:

- **Command decoration marks** - visual indicators showing where each command started and whether it succeeded or failed
- **Run recent command** (`Ctrl+R` in terminal) - VS Code's quick pick of your recent commands, searchable by name
- **Terminal IntelliSense** (`Ctrl+Space`) - completion suggestions for shell commands, file paths, and arguments

Enable Terminal IntelliSense: Settings (`Ctrl+,`) then search `terminal.integrated.suggest.enabled` then set to `on`.

### Terminal Accessibility

| Feature | How to Access |
| --- | --- |
| Accessible Help in terminal | `Alt+H` while terminal is focused |
| Navigate terminal output lines | `` Alt+Ctrl+PageUp `` / `` Alt+Ctrl+PageDown `` |
| Select terminal output | `Shift+Arrow keys` while in the terminal |
| Minimum contrast ratio | Settings then search `terminal.integrated.minimumContrastRatio` (default: 4.5 for WCAG AA) |

### Learning Cards: Terminal

<details>
<summary>Screen reader users</summary>

- Press `` Ctrl+` `` to toggle the terminal. Your screen reader announces "Terminal" and the shell prompt.
- The terminal acts like a standard text input - type commands and press `Enter`
- Press `Alt+H` while in the terminal for a full list of terminal-specific keyboard shortcuts
- Use `Ctrl+R` to open the "Run Recent Command" picker - a searchable list of your recent commands
- Terminal Navigation Mode: Commands for moving between lines help when reviewing output with a screen reader.

</details>

<details>
<summary>Low vision users</summary>

- VS Code enforces a minimum contrast ratio (4.5:1 by default) for terminal text
- Increase terminal font size: Settings then search `terminal.integrated.fontSize`
- Terminal themes inherit from your VS Code color theme - High Contrast themes apply here too
- Use `Ctrl+=` / `Ctrl+-` to zoom the entire window including the terminal

</details>

<details>
<summary>Sighted users</summary>

- The terminal appears in the bottom Panel - drag the top border to resize
- Click the `+` icon to create new terminals, the split icon to split, the trash icon to close
- Right-click in the terminal for copy/paste and other context menu options
- Multiple terminal tabs let you keep different shells open simultaneously

</details>


---

## 15. Copilot Chat Window

The **Copilot Chat** window (`Ctrl+Shift+I`) is your conversational AI assistant within VS Code. It can answer questions, generate code, explain code, fix problems, and help with documentation.

### Opening Copilot Chat

| Method | Shortcut |
| --- | --- |
| Chat view (sidebar) | `Ctrl+Shift+I` |
| Inline chat (in editor) | `Ctrl+I` |
| Quick chat (floating) | `Ctrl+Shift+Alt+L` |
| Command Palette | `Ctrl+Shift+P` then type `Chat: Open` |

### Chat Modes

| Mode | What It Does |
| --- | --- |
| **Ask** | Question-answer mode - explain code, answer questions, generate snippets |
| **Edit** | Multi-file editing mode - Copilot proposes edits across your workspace |
| **Agent** | Autonomous mode - Copilot can run terminal commands, create files, and perform complex tasks |

Switch modes using the mode picker at the top of the Chat view, or use keyboard shortcuts:
- `workbench.action.chat.openAsk` - Ask mode
- `workbench.action.chat.openEdit` - Edit mode
- `workbench.action.chat.openAgent` - Agent mode

### Using Chat Participants

Type `@` in the chat input to see available participants:

- **@workspace** - Ask questions about your entire codebase
- **@vscode** - Ask about VS Code settings and features
- **@terminal** - Run commands or explain terminal output

### Learning Cards: Copilot Chat

<details>
<summary>Screen reader users</summary>

- Press `Ctrl+Shift+I` to open Chat. Focus lands in the text input - start typing your question.
- After submitting, wait for the response to complete (audio cue plays if `accessibility.signals.chatResponseReceived` is on)
- Press `Alt+F2` (Accessible View) to read the complete response in a clean, navigable text view
- Navigate response content with `Up/Down Arrow` in the Accessible View
- Press `Escape` to return to the chat input for follow-up questions

</details>

<details>
<summary>Low vision users</summary>

- The Chat view appears in the sidebar and respects your zoom level and font settings
- Copilot responses include syntax-highlighted code blocks
- Use `Ctrl+I` for inline chat that appears right where your cursor is in the editor
- Resize the Chat panel by dragging its border for a comfortable reading width

</details>

<details>
<summary>Sighted users</summary>

- Click the Copilot icon in the sidebar or use `Ctrl+Shift+I`
- Code blocks in responses have a "Copy" button and an "Insert at Cursor" button
- The mode picker at the top lets you switch between Ask, Edit, and Agent modes
- Use `@workspace` to ask questions about your specific project context

</details>


---

## 16. Accessible Help, Accessible View, and Accessible Diff

VS Code has a family of purpose-built accessibility features that give screen reader users complete, structured access to content that is otherwise conveyed visually or through dynamic regions. These three are the most important to know before working with Copilot and diffs.


### 16.1 Accessible Help - Context-Aware Keyboard Guide

Every interactive area of VS Code - the editor, the terminal, the diff view, the Copilot Chat panel - has its own keyboard commands. **Accessible Help** surfaces those commands in a plain-text, fully readable dialog, tailored to exactly where your focus is right now.

#### How to open Accessible Help

| Context | Shortcut |
| --- | --- |
| Inside the editor | `Alt+H` |
| Inside the terminal | `Alt+H` |
| Inside a diff view | `Alt+H` |
| Inside Copilot Chat | `Alt+H` |
| Any VS Code widget | `Alt+H` |

The dialog is announced with a heading and a complete list of keyboard shortcuts for that specific widget. Navigate with `Up/Down Arrow`. Press `Escape` to dismiss and return focus to where you were.

**Why this matters:** You do not need to memorize every shortcut in every panel. Open Accessible Help in any unfamiliar area and VS Code will tell you exactly what you can do there. It is the built-in answer to "what can I press from here?"

#### Example output when pressing `Alt+H` in the editor

```text
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


### 16.2 Accessible View - Reading Dynamic and Streamed Content

**Accessible View** (`Alt+F2`) gives screen reader users a clean, static, fully readable version of content that is otherwise presented dynamically, in tooltips, or in streaming form.

#### How to open Accessible View

| Shortcut | When to Use |
| --- | --- |
| `Alt+F2` | Open Accessible View for the currently focused element |
| `Escape` | Close Accessible View and return to the editor |

#### What Accessible View provides

| Content Type | Without Accessible View | With Accessible View (`Alt+F2`) |
| --- | --- | --- |
| Copilot Chat response | Fragmented - announced as tokens stream in | Full complete response, read sequentially with Arrow keys |
| Inline Copilot suggestion | Ghost text - may not be announced | Announced as "Suggestion: [full text]" |
| Hover documentation | Popup tooltip - announced only briefly | Full content, fully navigable with Arrow keys |
| Error / warning details | On-focus message only | Full error text, error code, and suggested fix |
| Terminal output | May be truncated by live region limits | Full output in review mode with scroll |
| Notification banners | Announced once and dismissed | Persistent readable content until you close it |

#### Recommended workflow for Copilot Chat

1. Type your prompt in the Chat input
2. Wait for the response to finish (NVDA: live region announcements stop; JAWS: typing indicator disappears; VoiceOver: busy state clears)
3. Press `Alt+F2` - Accessible View opens with the complete response
4. Navigate with `Up/Down Arrow` through the response
5. Press `Escape` to return to the chat input

#### Recommended workflow for hover documentation

1. Navigate to a symbol or link with keyboard
2. Press `Ctrl+K I` to trigger hover programmatically (no mouse needed)
3. Press `Alt+F2` to open Accessible View with the full hover content
4. Press `Escape` to dismiss


### 16.3 Accessible Diff Viewer - Reading Changes Without Visual Scanning

When you open a file diff - in Source Control, in the GitHub PR extension, or during a merge conflict - VS Code normally shows it as a side-by-side or inline visual view. For screen reader users, tracking which lines changed and how can be difficult without a structured reading mode.

**The Accessible Diff Viewer** presents the same diff as a plain, navigable list of changed lines - organized by hunk, labeled by change type (added, removed, unchanged), with the line number announced for each line.

#### How to open the Accessible Diff Viewer

| Shortcut | What Happens |
| --- | --- |
| `F7` | Move to the next diff hunk (from within the diff editor) |
| `Shift+F7` | Move to the previous diff hunk |
| Command Palette | `Ctrl+Shift+P` then type "Open Accessible Diff Viewer" |

#### What the Accessible Diff Viewer announces

For each hunk (a block of related changes), the viewer announces:

- The hunk number and total hunk count (`Hunk 2 of 5`)
- The line range affected
- Each line, prefixed with its change type:

```text
Hunk 1 of 3 - lines 12 to 18
  Unchanged: ## Screen Reader Cheat Sheet
- Line removed: > Quick reference for NVDA users.
+ Line added: > Quick reference for NVDA, JAWS, and VoiceOver users.
  Unchanged:
  Unchanged: Use this document during the workshop.
```

This gives you the complete picture of what changed, in reading order, without visual diff scanning.

#### Practical uses during this workshop

- **Before approving a PR:** Open the diff then `F7` to enter the first hunk then navigate each change then `F7` for next hunk then repeat until all hunks reviewed
- **During a merge conflict:** The conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) appear as lines in the viewer - you can read both conflicting versions before deciding which to keep
- **After Copilot generates an edit:** Open the diff (`Ctrl+Shift+G` then navigate to the changed file then `Enter`) then review exactly what Copilot changed vs. what was there before

#### Audio cues for diffs

With `accessibility.signals.diffLineInserted` and `accessibility.signals.diffLineDeleted` both set to `on` in Settings, VS Code plays a distinct tone when your cursor moves over an added line (higher pitched) or a removed line (lower pitched). You receive change-type information through sound before the line text is announced.


---

## 17. Accessibility Signals

VS Code communicates editor state through **Accessibility Signals** -- non-verbal cues that tell you what is happening as you move through code, run commands, and interact with Copilot. Signals replaced the older "Audio Cues" system (deprecated since VS Code 1.85) and are significantly more powerful.

> **Official documentation:** [VS Code Accessibility -- Accessibility Signals](https://code.visualstudio.com/docs/configure/accessibility/accessibility#_accessibility-signals)

### How Signals Work: The Dual-Channel Architecture

Every accessibility signal has **two independent channels** that you control separately:

| Channel | What It Does | Who Benefits |
| --- | --- | --- |
| **Sound** | Plays a short audio tone | Everyone -- sighted users, low vision users, and screen reader users all benefit from audio feedback |
| **Announcement** | Sends a status message that screen readers and braille displays announce | Primarily screen reader and braille users |

Each channel accepts one of these values:

| Value | Meaning |
| --- | --- |
| `"on"` | Always enabled regardless of screen reader state |
| `"off"` | Always disabled |
| `"auto"` | Enabled only when VS Code detects a screen reader (default for most announcement channels) |
| `"userGesture"` | Enabled only when the user explicitly triggers the action (used by Save and Format signals to avoid noise from auto-save) |

This means you can enable sounds for everyone while keeping announcements on `auto` so they only fire when a screen reader is attached. Or you can turn on announcements without sounds. Full independent control.

### Discovering Signals: The Two Essential Commands

VS Code provides two commands that let you **browse every available signal, hear what each one sounds like, and toggle them on or off** without editing settings.json:

| Command (Command Palette `Ctrl+Shift+P`) | What It Does |
| --- | --- |
| **Help: List Signal Sounds** | Opens a picker listing every signal sound. As you arrow through the list, each sound plays so you can hear it. Press `Enter` to toggle the selected signal on or off. |
| **Help: List Signal Announcements** | Same experience for announcement messages. Arrow through the list to hear the announcement text read by your screen reader, then toggle. |

These are the fastest way to configure signals. You do not need to memorize setting names.

<details>
<summary>Screen reader users</summary>

The **Help: List Signal Announcements** command is especially valuable. It lists every announcement message VS Code can send to your screen reader. Arrow through the list -- your screen reader reads each announcement label. Press `Enter` to toggle. This is faster than searching through Settings and ensures you hear the exact phrasing VS Code will use.

</details>

<details>
<summary>Low vision users</summary>

Even if you do not use a screen reader, signal sounds add a valuable audio layer. When you land on an error line, a distinct error tone plays before you even read the squiggly underline. When a terminal command finishes, a completion chime saves you from watching the terminal. Open **Help: List Signal Sounds** to preview and enable the ones that help your workflow.

</details>

<details>
<summary>Sighted users</summary>

Signal sounds are not just for accessibility -- they improve any workflow. Enable `taskCompleted` and `taskFailed` to know when builds finish while you are reading documentation in another tab. Enable `chatResponseReceived` to hear when Copilot finishes generating while you work in a different file. Open **Help: List Signal Sounds** to hear what each one sounds like.

</details>

### Volume Control

Control signal volume independently from your system volume:

| Setting | Range | Default | Purpose |
| --- | --- | --- | --- |
| `accessibility.signalOptions.volume` | 0 -- 100 | 50 | Master volume for all accessibility signal sounds |

Set this in Settings (`Ctrl+,`) by searching "signal volume" or add it to `settings.json`:

```json
{
  "accessibility.signalOptions.volume": 70
}
```

### Complete Signal Reference

VS Code registers **30+ accessibility signals** organized into categories. The tables below list every signal, its setting key, the sound it plays, and whether it supports announcements.

#### Editor Signals

These fire when your cursor moves to a line or position with a specific marker:

| Setting Key | Fires When | Sound | Announcement |
| --- | --- | --- | --- |
| `accessibility.signals.lineHasError` | Cursor moves to a line containing an error | Error tone | "Error on Line" |
| `accessibility.signals.lineHasWarning` | Cursor moves to a line containing a warning | Warning tone (lower pitch) | "Warning on Line" |
| `accessibility.signals.positionHasError` | Cursor moves to the exact position of an error | Error tone | "Error" |
| `accessibility.signals.positionHasWarning` | Cursor moves to the exact position of a warning | Warning tone | "Warning" |
| `accessibility.signals.lineHasFoldedArea` | Cursor moves to a line with a collapsed/folded region | Folded area tone | "Folded" |
| `accessibility.signals.lineHasBreakpoint` | Cursor moves to a line with a breakpoint | Break tone | "Breakpoint" |
| `accessibility.signals.lineHasInlineSuggestion` | Cursor moves to a line with a Copilot ghost text suggestion | Quick fix tone | -- |
| `accessibility.signals.nextEditSuggestion` | Next Edit Suggestion appears on the line | Next edit tone | "Next Edit Suggestion" |
| `accessibility.signals.noInlayHints` | Cursor is on a line with no inlay hints | Error tone | "No Inlay Hints" |

> **Line vs Position signals:** The `lineHasError` signal fires once when your cursor enters the line. The `positionHasError` signal fires when the cursor reaches the exact character where the error starts. Both can be enabled simultaneously for layered feedback.

#### Diff Signals

These fire when navigating changes in the diff editor or reviewing pull requests:

| Setting Key | Fires When | Sound |
| --- | --- | --- |
| `accessibility.signals.diffLineInserted` | Cursor moves over an added (green) line | Inserted tone (higher pitch) |
| `accessibility.signals.diffLineDeleted` | Cursor moves over a removed (red) line | Deleted tone (lower pitch) |
| `accessibility.signals.diffLineModified` | Cursor moves over a modified line | Modified tone |

These are critical for pull request review. You hear the type of change before reading the content.

#### Terminal Signals

| Setting Key | Fires When | Sound | Announcement |
| --- | --- | --- | --- |
| `accessibility.signals.terminalBell` | Terminal sends a bell character | Bell tone | -- |
| `accessibility.signals.terminalQuickFix` | Terminal detects a quick fix suggestion | Quick fix tone | "Quick Fix" |
| `accessibility.signals.terminalCommandSucceeded` | A terminal command exits successfully | Command succeeded tone | -- |
| `accessibility.signals.taskCompleted` | A VS Code Task finishes successfully | Task completed tone | -- |
| `accessibility.signals.taskFailed` | A VS Code Task exits with an error | Task failed tone | -- |

> **Workshop tip:** Enable `taskCompleted` and `taskFailed` immediately. When you run `git push` or `npm test` in the terminal, you hear whether it succeeded without switching back to the terminal panel.

#### Chat and Copilot Signals

| Setting Key | Fires When | Sound | Announcement |
| --- | --- | --- | --- |
| `accessibility.signals.chatRequestSent` | You send a message to Copilot Chat | Request sent tone | -- |
| `accessibility.signals.chatResponsePending` | Copilot is generating a response (loops) | Progress tone | -- |
| `accessibility.signals.chatResponseReceived` | Copilot finishes generating | One of 4 random response tones | -- |
| `accessibility.signals.chatEditModifiedFile` | Copilot Edits modifies a file in your workspace | Modified file tone | -- |
| `accessibility.signals.chatUserActionRequired` | Copilot needs you to take an action (accept/reject) | Action required tone | -- |
| `accessibility.signals.editsKept` | You accept Copilot's suggested edits | Edits kept tone | -- |
| `accessibility.signals.editsUndone` | You reject/undo Copilot's suggested edits | Edits undone tone | -- |

> **Why four response sounds?** `chatResponseReceived` plays a randomly chosen variant each time (responseReceived1 through responseReceived4). This prevents habituation -- your brain stays alert to the signal instead of filtering it out after hearing the same sound repeatedly. This is an intentional accessibility design pattern.

#### Debug Signals

| Setting Key | Fires When | Sound | Announcement |
| --- | --- | --- | --- |
| `accessibility.signals.onDebugBreak` | Debugger stops on a breakpoint | Break tone | "Breakpoint" |

#### Editor Action Signals

These fire on user-triggered actions and use the `"userGesture"` value to distinguish manual saves from auto-saves:

| Setting Key | Fires When | Sound |
| --- | --- | --- |
| `accessibility.signals.save` | File is saved | Save tone |
| `accessibility.signals.format` | File is formatted | Format tone |
| `accessibility.signals.clear` | Terminal or output is cleared | Clear tone |

Set these to `"userGesture"` rather than `"on"` if auto-save is enabled, to avoid a sound on every keystroke pause:

```json
{
  "accessibility.signals.save": {
    "sound": "userGesture",
    "announcement": "off"
  }
}
```

#### Voice Signals

| Setting Key | Fires When | Sound |
| --- | --- | --- |
| `accessibility.signals.voiceRecordingStarted` | Voice dictation begins | Recording started tone |
| `accessibility.signals.voiceRecordingStopped` | Voice dictation ends | Recording stopped tone |

#### Code Action Signals

| Setting Key | Fires When | Sound |
| --- | --- | --- |
| `accessibility.signals.codeActionTriggered` | A code action (quick fix, refactor) is triggered | Code action triggered tone |
| `accessibility.signals.codeActionApplied` | A code action is applied to the code | Code action applied tone |

### Debounce Settings for Position Signals

When you hold an arrow key and your cursor moves rapidly through lines, position-based signals (error/warning at position) could fire dozens of times per second. VS Code debounces these by default:

| Setting | Default | Purpose |
| --- | --- | --- |
| `accessibility.signalOptions.debouncePositionChanges` | `true` | Enable position signal debouncing |
| `accessibility.signalOptions.experimental.delays.errorAtPosition` | `{ sound: 300, announcement: 3000 }` | Millisecond delay before error-at-position fires |
| `accessibility.signalOptions.experimental.delays.warningAtPosition` | `{ sound: 300, announcement: 3000 }` | Millisecond delay before warning-at-position fires |
| `accessibility.signalOptions.experimental.delays.general` | `{ sound: 300, announcement: 3000 }` | Default delay for all other position-based signals |

The announcement delay is intentionally longer (3 seconds) because screen reader interruptions are more disruptive than brief sounds.

### Recommended Workshop Profile

Add this to your VS Code `settings.json` (`Ctrl+Shift+P` then "Preferences: Open User Settings (JSON)"):

```json
{
  "editor.accessibilitySupport": "on",

  "accessibility.signalOptions.volume": 70,

  "accessibility.signals.lineHasError": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.lineHasWarning": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.lineHasFoldedArea": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.lineHasBreakpoint": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.taskCompleted": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.taskFailed": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.terminalCommandSucceeded": {
    "sound": "on",
    "announcement": "off"
  },
  "accessibility.signals.chatResponseReceived": {
    "sound": "on",
    "announcement": "auto"
  },
  "accessibility.signals.diffLineInserted": {
    "sound": "on",
    "announcement": "off"
  },
  "accessibility.signals.diffLineDeleted": {
    "sound": "on",
    "announcement": "off"
  },
  "accessibility.signals.save": {
    "sound": "userGesture",
    "announcement": "off"
  },

  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "none",
  "editor.wordWrap": "on"
}
```

This profile enables core sounds for everyone and sets announcements to `auto` so they activate only when a screen reader is detected. The `save` signal uses `userGesture` to avoid noise from auto-save. Diff signals are sound-only because rapid line navigation with announcements would overwhelm a screen reader.

<details>
<summary>Screen reader users</summary>

Focus on announcements more than sounds. Set the signals you care about most to `"announcement": "on"` (not just `"auto"`) to guarantee they fire even if VS Code does not detect your screen reader. The most valuable announcements for this workshop are:

- `lineHasError` -- "Error on Line" as you navigate code
- `taskCompleted` / `taskFailed` -- know when git operations finish
- `chatResponseReceived` -- know when Copilot is done responding
- `lineHasBreakpoint` -- confirm breakpoint placement during debugging

Use **Help: List Signal Announcements** (`Ctrl+Shift+P` then type "List Signal Announcements") to hear and toggle each one.

</details>

<details>
<summary>Low vision users</summary>

Sounds give you status confirmation without needing to find and read small visual indicators. The most impactful signals:

- `lineHasError` + `lineHasWarning` -- hear errors as you navigate instead of scanning for red/yellow squiggles
- `diffLineInserted` + `diffLineDeleted` -- hear change types in pull request diffs before reading the color coding
- `taskCompleted` + `taskFailed` -- audio confirmation when terminal commands finish
- `chatResponseReceived` -- know when Copilot is done while you read other content

Raise the volume with `accessibility.signalOptions.volume` (try 80 or 90) if your system volume competes with screen magnification software audio.

</details>

<details>
<summary>Sighted users</summary>

Do not skip this section because you can see the screen. Signal sounds make you faster:

- **Build notifications:** Enable `taskCompleted` and `taskFailed`. Start a build, switch to writing code, hear the chime when it finishes.
- **Copilot flow:** Enable `chatResponseReceived`. Ask Copilot a question, continue editing, hear the response tone.
- **Error awareness:** Enable `lineHasError`. As you type, you hear immediately when you introduce a syntax error without glancing at the Problems panel.
- **Code review:** Enable diff signals. Arrow through a PR diff and hear inserted/deleted/modified tones. Your eyes stay on the code while your ears track the change type.

Start with **Help: List Signal Sounds** to preview each tone and build your personal selection.

</details>

### Migrating from Legacy Audio Cues

If you previously configured the older `audioCues.*` settings (deprecated since VS Code 1.85), VS Code automatically maps them to the new `accessibility.signals.*` namespace. However, the new settings offer the dual sound/announcement structure that the old settings did not have. Review your configured signals using **Help: List Signal Sounds** and **Help: List Signal Announcements** to take advantage of the new independent controls.

**Note:** `minimap.enabled: false` in the recommended profile removes the visual minimap that adds no value for screen reader users and can cause some accessibility tools to announce additional regions.


---

## 18. VS Code Speech - Voice Input and Output

The VS Code Speech extension adds speech-to-text and text-to-speech capabilities to VS Code. All voice processing happens locally on your machine - no audio data is sent to any online service. This makes it useful for dictation, talking to Copilot Chat, and having Chat responses read aloud.

### Installing VS Code Speech

1. Open Extensions: `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`)
2. Search for **VS Code Speech**
3. Find **VS Code Speech** (publisher: Microsoft, identifier: `ms-vscode.vscode-speech`)
4. Press `Enter` to open the extension detail page, then `Tab` to "Install" and press `Enter`

After installation, a microphone icon appears in all Chat input fields and new voice commands become available in the Command Palette.

> **Microphone permissions:** On macOS, go to System Settings, Privacy and Security, Microphone, and confirm Visual Studio Code is enabled. On Windows, go to Settings, Privacy and security, Microphone, and confirm that "Let desktop apps access your microphone" is on. Without this permission, voice input fails silently.

### Editor Dictation - Type with Your Voice

Editor dictation lets you speak and have your words appear as text wherever your cursor is. This works in the code editor, the SCM commit input box, and the comments field when reviewing pull requests.

| Action | Windows/Linux | macOS |
| ------ | ------------- | ----- |
| Start dictation | `Ctrl+Alt+V` | `Cmd+Alt+V` |
| Stop dictation | `Escape` | `Escape` |
| Walky-talky mode | Press and hold `Ctrl+Alt+V`, speak, release to stop | Press and hold `Cmd+Alt+V`, speak, release to stop |

When dictation is active, a small microphone icon appears at the cursor position. Speak naturally and your words are transcribed into text. Press `Escape` to stop.

**Walky-talky mode:** Press and hold the keyboard shortcut instead of tapping it. Voice recognition stays active as long as you hold the keys. When you release, dictation stops automatically. This is the fastest way to dictate a short phrase.

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

- When dictation starts, the accessibility signal `voiceRecordingStarted` plays (if configured in section 17). Your screen reader may also announce "Recording started."
- Dictated text appears at the cursor position and is announced by your screen reader as it is inserted, just like typed text.
- Press `Escape` to stop. The `voiceRecordingStopped` signal plays.
- If you do not hear dictated text being announced, check that your screen reader is in focus mode (NVDA: `Insert+Space` to toggle) so it reads editor changes.

</details>

<details>
<summary>Low vision users</summary>

- The microphone icon that appears at the cursor is small. At 200%+ zoom it may be hard to spot, but dictation works regardless of whether you see the icon.
- Dictated text appears at your configured editor font size with full contrast - no ghost text or gray previews.
- **Check status bar:** When dictation is active, the status bar shows a recording indicator. Press `F6` to cycle to the status bar and confirm.

</details>

### Voice in Copilot Chat - Talk to Copilot

Instead of typing prompts, you can speak them. This works in the Chat panel, inline chat, and quick chat.

| Action | Windows/Linux | macOS |
| ------ | ------------- | ----- |
| Start voice chat (auto-selects best location) | `Ctrl+I` | `Cmd+I` |
| Start voice in Chat panel specifically | Command Palette: "Chat: Voice Chat in Chat View" | Same |
| Start inline voice chat | Command Palette: "Chat: Inline Voice Chat" | Same |
| Start quick voice chat | Command Palette: "Chat: Quick Voice Chat" | Same |

When voice chat is active, a microphone icon appears in the chat input field. Speak your prompt naturally. When you pause, the prompt is automatically submitted.

> **Automatic submission:** By default, VS Code submits your voice prompt after a pause. You can adjust the wait time with the `accessibility.voice.speechTimeout` setting (in milliseconds), or set it to `0` to disable auto-submit entirely so you can review before sending.

**Walky-talky mode in chat:** Press and hold `Ctrl+I` (Mac: `Cmd+I`). Speak your prompt. When you release the keys, voice recognition stops and the prompt is submitted automatically.

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

- `Ctrl+I` with Speech installed starts voice input. If the Chat view is not focused, it opens the Chat view. If you are in the editor, it opens inline chat.
- Speak your prompt instead of typing. Your screen reader announces the transcribed text as it appears in the input field.
- When the response arrives, press `Alt+F2` (Accessible View) to read it at your own pace, just as you would with a typed prompt.
- The automatic submission after a pause may catch you off guard. If you need more time to compose a multi-sentence prompt, set `accessibility.voice.speechTimeout` to `0` and submit manually with `Ctrl+Enter`.

</details>

### Text-to-Speech - Listen to Chat Responses

VS Code Speech can read Copilot Chat responses aloud. Each chat response shows a speaker icon you can activate to hear that specific response.

#### Automatic read-aloud after voice input

Enable this setting to have every Chat response automatically spoken aloud when you used voice to ask the question:

```json
{
  "accessibility.voice.autoSynthesize": true
}
```

When auto-synthesize is on:

1. You speak a question using voice chat
2. Copilot responds in text
3. The response is automatically read aloud
4. To stop playback mid-sentence, press `Escape` or activate the stop icon

#### Manual read-aloud for any response

Even without `autoSynthesize`, every Chat response has a speaker icon. Activate it to hear that specific response read aloud. This works for responses from typed prompts too, not just voice prompts.

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

- Text-to-speech uses a separate audio channel from your screen reader. Both may speak at the same time, which can be confusing.
- **Recommended approach:** If you use a screen reader, you may prefer to keep `autoSynthesize` off and use Accessible View (`Alt+F2`) to read responses yourself. The text-to-speech voice is more useful for sighted users who want a hands-free experience.
- If you do want to try text-to-speech alongside your screen reader, reduce your screen reader volume or temporarily mute it while Copilot speaks.

</details>

### "Hey Code" - Hands-Free Activation

You can configure VS Code to listen continuously for the wake phrase "Hey Code" to start a voice chat session without touching the keyboard.

Enable it in Settings:

```json
{
  "accessibility.voice.keywordActivation": "chatInView"
}
```

| Setting value | What happens when you say "Hey Code" |
| ------------- | ------------------------------------- |
| `"off"` | Disabled (default) |
| `"chatInView"` | Opens voice chat in the Chat view |
| `"quickChat"` | Opens voice quick chat (floating) |
| `"inlineChat"` | Opens voice inline chat in the editor |
| `"chatInContext"` | Opens voice chat in whichever chat location is most relevant |

When "Hey Code" listening is active, a microphone icon appears in the status bar to show that VS Code is listening for the wake phrase.

> **Privacy note:** Even with "Hey Code" enabled, all processing is local. No audio leaves your machine. The extension listens for the wake phrase only and starts transcription only after detecting it.

### Language Configuration

VS Code Speech supports 26 languages. By default it matches your VS Code display language. To change it:

```json
{
  "accessibility.voice.speechLanguage": "en-US"
}
```

When you start speech recognition for the first time with a new language, VS Code may install an additional language extension automatically.

### All Voice Settings Reference

| Setting | Default | Purpose |
| ------- | ------- | ------- |
| `accessibility.voice.speechLanguage` | `"auto"` | Language for speech recognition and synthesis. `"auto"` uses your VS Code display language. |
| `accessibility.voice.speechTimeout` | `1250` | Milliseconds of silence before auto-submitting a voice chat prompt. Set to `0` to disable auto-submit. |
| `accessibility.voice.autoSynthesize` | `false` | Automatically read Chat responses aloud when voice was used as input. |
| `accessibility.voice.keywordActivation` | `"off"` | Enable "Hey Code" wake phrase. Values: `"off"`, `"chatInView"`, `"quickChat"`, `"inlineChat"`, `"chatInContext"`. |

### All Voice Commands Reference

| Command | Default shortcut | What it does |
| ------- | ---------------- | ------------ |
| Voice: Start Dictation in Editor | `Ctrl+Alt+V` (Mac: `Cmd+Alt+V`) | Begin dictating text at the cursor |
| Voice: Stop Dictation in Editor | `Escape` | Stop dictation |
| Chat: Start Voice Chat | `Ctrl+I` (Mac: `Cmd+I`) | Start voice input in the most appropriate chat location |
| Chat: Voice Chat in Chat View | None | Start voice chat specifically in the Chat panel |
| Chat: Inline Voice Chat | None | Start voice chat inline in the editor |
| Chat: Quick Voice Chat | None | Start voice chat in the floating quick chat |
| Chat: Stop Listening and Submit | None | End voice input and submit the prompt |
| Chat: Read Aloud | None | Read a specific chat response using text-to-speech |
| Chat: Stop Reading Aloud | `Escape` | Stop text-to-speech playback |

### Custom Keybindings for Voice

You can assign your own shortcuts for voice commands. Open the Keyboard Shortcuts editor (`Ctrl+K Ctrl+S`) and search for "voice" or "dictation". Example custom keybinding in `keybindings.json`:

```json
[
  {
    "key": "ctrl+u",
    "command": "workbench.action.chat.startVoiceChat",
    "when": "!voiceChatInProgress"
  },
  {
    "key": "ctrl+u",
    "command": "workbench.action.chat.stopListeningAndSubmit",
    "when": "voiceChatInProgress"
  },
  {
    "key": "ctrl+d",
    "command": "workbench.action.editorDictation.start",
    "when": "!editorDictation.inProgress"
  },
  {
    "key": "ctrl+d",
    "command": "workbench.action.editorDictation.stop",
    "when": "editorDictation.inProgress"
  }
]
```

The `when` clauses ensure the same key toggles the feature on and off.

### Supported Platforms

| Platform | Architecture |
| -------- | ------------ |
| Windows | x64, ARM |
| macOS | x64 (Intel), ARM (Apple Silicon) |
| Linux | x64, ARM32, ARM64 (Ubuntu 20.04/22.04/24.04, Debian 11/12, RHEL 8, CentOS 8) |

On Linux, the extension requires the ALSA shared library (`libasound`). Install it with `sudo apt install libasound2` on Debian/Ubuntu if it is not already present.


---


---

*Next: [How Git Works](13-how-git-works.md)*
*Back: [VS Code: Interface and Setup](11-vscode-interface.md)*
*Related: [VS Code Reference](appendix-g-vscode-reference.md) | [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
