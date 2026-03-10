# Appendix G: VS Code Accessibility Reference
>
> **Listen to Episode 30:** [VS Code Accessibility Reference](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 11: VS Code Interface](11-vscode-interface.md) | Also relevant: [Chapter 12](12-vscode-accessibility.md)
>
> **Authoritative source:** [VS Code Docs: Accessibility](https://code.visualstudio.com/docs/editor/accessibility)

## Complete Technical Reference for Screen Reader Users

> **Purpose:** This appendix provides comprehensive technical documentation for all VS Code accessibility features, settings, and keyboard shortcuts. The main chapters cover essentials; this appendix is your complete reference manual.
>
> **Referenced by:** [VS Code Setup & Accessibility Basics](11-vscode-interface.md), [GitHub Copilot](16-github-copilot.md)


### Learning Cards: VS Code Accessibility Reference Overview

<details>
<summary>Screen reader users</summary>

- This appendix is your lookup manual -- use `Ctrl+G` (Go to Line) or `Ctrl+Shift+O` (Go to Symbol) to jump directly to a setting name
- Every table is structured with headers; use `T` in browse mode to jump between tables, then arrow through rows
- Bookmark this file in VS Code (`Ctrl+K Ctrl+K`) so you can return instantly when you need a setting path

</details>

<details>
<summary>Low vision users</summary>

- Increase editor font size (`Ctrl+=`) before scanning the long settings tables -- column values are easier to compare at larger sizes
- Use the Minimap (if sighted enough) or breadcrumbs bar to orient within this large reference file
- High-contrast themes make the table grid lines and code spans easier to distinguish from body text

</details>

<details>
<summary>Sighted users</summary>

- The Table of Contents links jump directly to each section -- click any link to scroll there instantly
- Use `Ctrl+Shift+O` to open the outline view and see all 7 sections as a navigable list
- The settings tables use consistent columns (Setting Path, Values, Default, Description) -- scan the Default column to see what changes from your current setup

</details>


## Table of Contents

1. [Complete Accessibility Settings Reference](#1-complete-accessibility-settings-reference)
2. [Audio Cues - All Options](#2-audio-cues---all-options)
3. [Accessible Diff Viewer - Complete Guide](#3-accessible-diff-viewer---complete-guide)
4. [Screen Reader-Specific Configurations](#4-screen-reader-specific-configurations)
5. [Complete Keyboard Shortcuts](#5-complete-keyboard-shortcuts)
6. [Accessibility Signals Types and Customization](#6-accessibility-signals-types-and-customization)
7. [Settings.json Configuration Examples](#7-settingsjson-configuration-examples)


## 1. Complete Accessibility Settings Reference

All settings can be accessed via Settings UI (`Ctrl+,`) or by editing `settings.json` directly (`Ctrl+Shift+P` → "Open User Settings JSON").

### Core Accessibility Settings

| Setting Path | Values | Default | Description |
| --------------  | --------  | ---------  | -------------  |
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
| --------------  | --------  | ---------  | -------------  |
| `diffEditor.codeLens` | boolean | `false` | Shows CodeLens in diff view. Visual only. |
| `diffEditor.diffAlgorithm` | `legacy`, `advanced` | `advanced` | Diff calculation method. `advanced` produces better hunks for screen readers. |
| `diffEditor.ignoreTrimWhitespace` | boolean | `true` | Ignores whitespace changes in diffs. **Recommended:** `true` to reduce noise. |
| `diffEditor.renderSideBySide` | boolean | `true` | Shows diffs side-by-side. Set to `false` for inline view (easier for screen readers). |
| `diffEditor.wordWrap` | `off`, `on`, `inherit` | `inherit` | Word wrap in diff view. `on` recommended for long lines. |
| `merge-conflict.decorators.enabled` | boolean | `true` | Shows merge conflict decorators. Use Accessible Diff instead (`F7`). |

### Terminal Settings

| Setting Path | Values | Default | Description |
| --------------  | --------  | ---------  | -------------  |
| `terminal.integrated.accessibleViewFocusesTerminal` | boolean | `true` | Returns focus to terminal after closing Accessible View. |
| `terminal.integrated.accessibleViewPreserveCursorPosition` | boolean | `false` | Preserves cursor position when opening Accessible View. |
| `terminal.integrated.enableBell` | boolean | `false` | Enables terminal bell sound. **Recommended:** `true` for audio feedback. |
| `terminal.integrated.screenReaderMode` | `auto`, `on`, `off` | `auto` | Optimizes terminal for screen readers. |

### Notification Settings

| Setting Path | Values | Default | Description |
| --------------  | --------  | ---------  | -------------  |
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
| -------  | ----------  |
| `auto` | Play sound in screen reader mode only |
| `on` | Always play sound |
| `off` | Never play sound |

### Complete Accessibility Signals List

| Setting | When It Plays | Recommended |
| ---------  | --------------  | -------------  |
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

#### Sound file requirements

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
| --------  | -------  |
| Keyboard (in diff editor) | Press `F7` to jump to first hunk, `Alt+F2` to open Accessible View |
| Command Palette | `Ctrl+Shift+P` → "Open Accessible Diff Viewer" |
| Automatic | Some contexts open it automatically in screen reader mode |

### Diff Viewer Structure

#### Top-level structure

##### Description

The Accessible Diff Viewer starts with a header showing the file path and change summary. It then shows each hunk (changed section) in order. Each hunk contains: the hunk location (line range), unchanged context lines, the modified, added, or removed lines with their prefix, and more context lines. After all hunks, a footer shows the totals for additions and deletions.

#### Line prefixes

| Prefix | Meaning | Screen Reader Announcement |
| --------  | ---------  | ----------------------------  |
| (no prefix) | Unchanged line (context) | "Unchanged: [line content]" |
| `+` | Added line | "Added: [line content]" or "Line added: [content]" |
| `-` | Removed line | "Removed: [line content]" or "Line removed: [content]" |
| `\|~` | Modified line (original) | "Modified from: [old content]" |
| `\|+` | Modified line (new version) | "Modified to: [new content]" |

### Navigating Hunks

#### Hunk = a block of related changes

| Action | Keyboard |
| --------  | ----------  |
| Jump to next hunk | `F7` |
| Jump to previous hunk | `Shift+F7` |
| Jump to next change | `F8` (in some contexts) |
| Jump to previous change | `Shift+F8` |

### Screen Reader-Specific Navigation

#### NVDA/JAWS

1. Open diff: `Enter` on file in Source Control, or `F7` in an open diff
2. `Alt+F2` to open Accessible Diff Viewer
3. Navigate with `Up/Down Arrow` (line by line)
4. Use `H` key to jump between hunks (each hunk has a heading)
5. `Escape` to close and return to editor

#### VoiceOver

1. `VO+Arrow` to navigate to diff file → `VO+Space` to open
2. `Option+F2` for Accessible Diff Viewer
3. `VO+Arrow` keys to navigate lines
4. `VO+Command+H` to jump between hunk headings
5. `Escape` to close

### Understanding Context Lines

The diff shows 3 unchanged lines before and after each change for context. These are announced as "Unchanged: [content]".

#### Example

```text
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

#### Inline view (recommended for screen readers)

- All changes in a single editor
- Removed lines followed by added lines
- Easier to navigate with screen reader reading commands

#### Side-by-side view (default, visual)

- Left panel: original file
- Right panel: modified file
- Requires navigating between panels

#### To switch to inline view

1. Open Settings: `Ctrl+,`
2. Search: "diffEditor.renderSideBySide"
3. Uncheck the box (or set to `false` in settings.json)


### Learning Cards: Accessible Diff Viewer

<details>
<summary>Screen reader users</summary>

- Press `F7` in any diff editor to jump to the first changed hunk -- then `F7` / `Shift+F7` to move between hunks
- Use `Alt+F2` (Accessible View) to read the full diff in a structured, non-streaming pane with proper line prefixes
- Switch to inline diff view (`diffEditor.renderSideBySide: false`) so all changes appear in one editor instead of two panels

</details>

<details>
<summary>Low vision users</summary>

- Inline diff view places removed and added lines back-to-back with color-coded backgrounds -- increase font size for easier scanning
- Enable `accessibility.signals.diffLineInserted` and `diffLineDeleted` for audio feedback as you arrow through changed lines
- Zoom the diff editor independently with `Ctrl+=` if the surrounding UI is already at a comfortable size

</details>

<details>
<summary>Sighted users</summary>

- Green-highlighted lines are additions; red-highlighted lines are deletions -- look for the `+` and `-` gutters on the left
- Use the minimap sidebar to spot clusters of changes in a long diff without scrolling
- Click the hunk arrows in the gutter to jump directly to the next block of changes

</details>


## 4. Screen Reader-Specific Configurations

### NVDA Configuration for VS Code

#### Recommended NVDA settings

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

#### NVDA add-ons for VS Code

- **Focus Highlight** - shows focus location visually (helpful for sighted trainers)
- **IndentNav** - navigate by indentation level (useful for Python, YAML)

#### VS Code-specific NVDA commands

| Action | NVDA Command |
| --------  | --------------  |
| Read from cursor | `Insert+Down Arrow` |
| Read all | `Insert+Down Arrow` (twice) |
| Stop speech | `Control` |
| Say all in focus mode | `NVDA+Shift+Down Arrow` |
| Move to containing browse mode document | `NVDA+Control+Space` |

### JAWS Configuration for VS Code

#### Recommended JAWS settings

1. **Settings Center → HTML/PDF/Accessibility:**
   - "Auto Forms Mode": **Checked**
   - "ARIA Live Region Verbosity": **Polite** or **Assertive** (depending on preference)
   - "Report tooltip text": **Unchecked** (use `Alt+F2` instead)

2. **Settings Center → Reading:**
   - "Punctuation Level": **Most** (for code)
   - "Speak Long Lines Continuously": **Yes**

3. **Settings Center → Text Processing:**
   - "Blank Line Announcement": **Tone** (less verbose than speech)

#### JAWS scripts for VS Code

Custom JAWS scripts exist for VS Code. Check: [jaws-vscode-scripts (GitHub)](https://github.com/search?q=jaws+vscode+scripts) for community-maintained scripts.

#### VS Code-specific JAWS commands

| Action | JAWS Command |
| --------  | --------------  |
| Say current line | `Insert+Up Arrow` |
| Read from cursor | `Insert+Page Down` |
| Read to end | `Insert+Page Down` (twice) |
| Toggle virtual cursor | `Insert+Z` |
| List links | `Insert+F7` |
| List headings | `Insert+F6` |

### VoiceOver Configuration for VS Code (macOS)

#### Recommended VoiceOver Utility settings

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

#### VS Code-specific VoiceOver commands

| Action | VoiceOver Command |
| --------  | --------------  |
| Read from cursor | `VO+A` |
| Read all | `VO+Shift+Down Arrow` (in text area) |
| Stop reading | `Control` |
| Interact with element | `VO+Shift+Down Arrow` |
| Stop interacting | `VO+Shift+Up Arrow` |
| Jump to heading | `VO+Command+H` |
| Open rotor | `VO+U` |
| Navigate rotor | `Left/Right Arrow`, then `Up/Down Arrow` |

#### Quick Nav navigation (when enabled)

| Command | Action |
| ---------  | --------  |
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
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
| Explorer | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| Search | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Run and Debug | `Ctrl+Shift+D` | `Cmd+Shift+D` |
| Extensions | `Ctrl+Shift+X` | `Cmd+Shift+X` |

### Editor - File Operations

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
| Add Cursor Above | `Ctrl+Alt+Up` | `Cmd+Option+Up` |
| Add Cursor Below | `Ctrl+Alt+Down` | `Cmd+Option+Down` |
| Add Cursor to Line Ends | `Shift+Alt+I` | `Shift+Option+I` |
| Undo Last Cursor Operation | `Ctrl+U` | `Cmd+U` |

### Terminal

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Toggle Terminal | `Ctrl+Backtick` | `Ctrl+Backtick` |
| Create New Terminal | `Ctrl+Shift+Backtick` | `Ctrl+Shift+Backtick` |
| Focus Terminal | `Ctrl+Backtick` | `Ctrl+Backtick` |
| Kill Terminal | `Ctrl+Shift+K` (in terminal) | `Cmd+Shift+K` |
| Scroll Up in Terminal | `Ctrl+Shift+Up` | `Cmd+Shift+Up` |
| Scroll Down in Terminal | `Ctrl+Shift+Down` | `Cmd+Shift+Down` |

### Source Control (Git)

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Open Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Commit (in message field) | `Ctrl+Enter` | `Cmd+Enter` |
| Stage File | `Ctrl+Enter` (on file) | `Cmd+Enter` |
| Refresh Source Control | `Ctrl+R` (in SC panel) | `Cmd+R` |

### Diff Viewer

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Next Diff Hunk | `F7` | `F7` |
| Previous Diff Hunk | `Shift+F7` | `Shift+F7` |
| Open Accessible Diff Viewer | `Alt+F2` | `Option+F2` |

### Copilot

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
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
| --------  | ---------------  | -------  |
| Toggle Screen Reader Mode | `Shift+Alt+F1` | `Shift+Option+F1` |
| Accessible Help | `Alt+H` | `Option+H` |
| Accessible View | `Alt+F2` | `Option+F2` |
| Announce Cursor Position | `Ctrl+Alt+Shift+G` | `Cmd+Option+Shift+G` |
| Open Accessibility Help | `Ctrl+Shift+P` → "Help: Accessibility Help" | Same |

### Problems Panel

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Show Problems | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Go to Next Error/Warning | `F8` | `F8` |
| Go to Previous Error/Warning | `Shift+F8` | `Shift+F8` |

### Markdown Preview

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Toggle Preview | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Open Preview to Side | `Ctrl+K V` | `Cmd+K V` |


## 6. Accessibility Signals Types and Customization

Accessibility signals are events that trigger announcements or audio cues. Beyond audio cues, VS Code has verbal announcements for various events.

### Announcement Verbosity Settings

Control how much information VS Code announces:

| Setting | Values | Default | Controls |
| ---------  | --------  | ---------  | ----------  |
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
| ---------  | --------  | ---------  | -------------  |
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


### Learning Cards: Accessibility Signals

<details>
<summary>Screen reader users</summary>

- Start with `auto` for most signals -- they play only when screen reader mode is active, keeping things quiet otherwise
- The `lineHasError` and `taskFailed` signals are the highest-value audio cues; enable these first
- Use `accessibility.signals.volume` (0-100) to balance signal volume against your screen reader speech

</details>

<details>
<summary>Low vision users</summary>

- Audio cues supplement visual indicators you might miss -- enable `lineHasWarning` and `lineHasError` for sounds on the current line
- The `save` and `format` signals confirm file operations completed without needing to check the status bar visually
- Pair audio cues with high-contrast gutter icons for a dual-channel (sight + sound) feedback loop

</details>

<details>
<summary>Sighted users</summary>

- Audio cues can speed up your workflow even with full vision -- the `taskCompleted` chime saves you from watching terminal output
- Search "accessibility.signals" in Settings UI to see all toggles in one filtered view with checkboxes
- Custom sound files (WAV/MP3, under 2 seconds) can replace defaults if you want distinctive tones per event

</details>


## 7. Settings.json Configuration Examples

The configuration examples below are JSON blocks you paste into your `settings.json` file. To apply a complete set at once, consider using **VS Code Profiles** -- named configuration bundles that let you switch your entire setup instantly. See [Chapter 5, Section 9: Profiles](11-vscode-interface.md#profiles) for how to create, switch, export, and share profiles.

### Minimal Screen Reader Profile

#### For users who prefer minimal announcements and use Accessible View manually

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

#### For users who want all audio and verbal announcements

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

#### For users working heavily with GitHub Copilot

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

#### For users doing heavy PR review and diff work

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

#### For users on slower machines or with large repositories

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

### Paste this into your `settings.json` for a balanced screen reader profile

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

---

*Next: [Appendix H: GitHub Desktop](appendix-h-github-desktop.md)*  
*Back: [Appendix F: Git Security](appendix-f-git-security.md)*  
*Teaching chapter: [Chapter 11: VS Code Interface](11-vscode-interface.md)*

