# Appendix J: GitHub Codespaces
>
> **Listen to Episode 31:** [GitHub Codespaces](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 01: Choose Your Tools](01-choose-your-tools.md) | Also relevant: [Chapter 11](11-vscode-interface.md)
>
> **Authoritative source:** [GitHub Docs: Codespaces](https://docs.github.com/en/codespaces)

## Cloud Development Environments - Accessibility Guide

> GitHub Codespaces gives you a full VS Code development environment in your browser or connected to your local VS Code, running on a cloud machine. For screen reader users, this means a consistent, pre-configured environment with no local setup required.

## Table of Contents

1. [What Is GitHub Codespaces?](#1-what-is-github-codespaces)
2. [Creating a Codespace](#2-creating-a-codespace)
3. [Codespace Environments](#3-codespace-environments)
4. [Accessibility in Codespaces](#4-accessibility-in-codespaces)
5. [Screen Reader Configuration](#5-screen-reader-configuration)
6. [Keyboard Shortcuts in Codespaces](#6-keyboard-shortcuts-in-codespaces)
7. [Managing Your Codespaces](#7-managing-your-codespaces)
8. [Dotfiles and Persistent Configuration](#8-dotfiles-and-persistent-configuration)
9. [Codespaces vs GitHub.dev](#9-codespaces-vs-githubdev)
10. [Common Issues and Workarounds](#10-common-issues-and-workarounds)

## 1. What Is GitHub Codespaces?

A Codespace is a cloud-hosted development environment. When you open one, GitHub provisions a virtual machine, clones your repository into it, and connects it to a VS Code interface - either in your browser or via your local VS Code Desktop.

### Why this matters for accessibility

- No local installation of tools, compilers, or language runtimes required
- Your screen reader and OS settings stay on your machine; only the editor runs in the cloud
- VS Code's full accessibility features (audio cues, screen reader optimized mode, diff viewer) are available
- The environment is identical for every workshop participant - facilitators can reproduce issues reliably

**Free tier:** GitHub provides a monthly free allowance of Codespace hours for personal accounts. Workshop usage typically falls well within the free tier.

### Learning Cards: Cloud Editors Overview

<details>
<summary>Screen reader users</summary>

- Codespaces gives you a full VS Code interface with terminal access -- your screen reader and OS settings stay on your local machine
- The browser-based editor activates screen reader optimized mode automatically if your OS signals a screen reader is running
- Connect a Codespace to your local VS Code Desktop (via the Codespaces extension) for the most familiar screen reader experience

</details>

<details>
<summary>Low vision users</summary>

- Settings Sync carries your font size, theme, and zoom preferences from local VS Code into Codespaces automatically
- The browser-based editor supports `Ctrl+=` / `Ctrl+-` zoom just like desktop VS Code
- Use a high-contrast VS Code theme -- it applies identically in the cloud editor

</details>

<details>
<summary>Sighted users</summary>

- Press `.` on any GitHub repository page to open it instantly in github.dev (browser editor, no terminal)
- Codespaces provisions a full VM with terminal -- use it when you need to run code, not just edit
- The default 2-core machine is sufficient for workshop exercises; upgrade only for heavy builds

</details>

## 2. Creating a Codespace

### From a Repository Page

1. Navigate to the repository on GitHub
2. Press the **Code** button (keyboard shortcut: there is no direct shortcut - Tab to the button)
3. In the panel that opens, choose the **Codespaces** tab
4. Activate **Create codespace on main** (or your branch name)
5. The Codespace opens in a new browser tab after provisioning (typically 30-60 seconds)

### From the Codespaces Dashboard

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Activate **New codespace**
3. Use the search field to find your repository
4. Choose a branch, machine type, and region
5. Activate **Create codespace**

### Machine Types

| Type | CPU | RAM | Best for |
| ------  | -----  | -----  | ----------  |
| 2-core | 2 vCPU | 8 GB | General development, documentation |
| 4-core | 4 vCPU | 16 GB | Builds, tests, moderate workloads |
| 8-core | 8 vCPU | 32 GB | Heavy builds, multiple services |

For workshop exercises, the default 2-core machine is sufficient.

## 3. Codespace Environments

### Browser (VS Code for the Web)

The Codespace opens directly in your browser as a fully functional VS Code interface.

- Works in Chrome, Edge, Firefox, and Safari
- Screen reader support varies slightly by browser - Chrome and Edge have the most consistent behavior with NVDA and JAWS
- No installation needed
- Some VS Code extensions are not available in the browser version

### Local VS Code Desktop

If you prefer your local VS Code setup with your extensions and settings:

1. Install the [GitHub Codespaces extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) in VS Code
2. Sign in to GitHub in VS Code
3. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
4. Run **Codespaces: Connect to Codespace**
5. Select an existing Codespace or create a new one

When connected via local VS Code, your screen reader interacts with your local VS Code installation - all your familiar settings apply.

## 4. Accessibility in Codespaces

### Screen Reader Optimized Mode

When VS Code detects a screen reader, it automatically activates **Screen Reader Optimized** mode. You can verify or toggle it manually:

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Search for **Toggle Screen Reader Accessibility Mode**
3. Press Enter to activate

In this mode:

- The editor reads content line by line instead of character by character
- Diff views are rendered as accessible text comparisons
- Inline suggestions from Copilot are announced on a keypress rather than automatically

### Audio Cues

VS Code in Codespaces supports the same audio cues as the desktop version:

| Event | Default Audio Cue |
| -------  | ------------------  |
| Error on current line | Tone |
| Warning on current line | Tone |
| Breakpoint hit | Tone |
| Task completed | Chime |
| Copilot suggestion available | Tone |

Enable audio cues via Settings → search for "audio cues" or run **Help: List Audio Cues** from the Command Palette.

### Terminal Accessibility

The integrated terminal in a Codespace is a standard terminal:

- Screen readers read terminal output in NVDA and JAWS using their document/browse mode after output arrives
- In NVDA: Switch to Browse Mode to read static terminal output, then back to Focus Mode to type
- VS Code also has **Accessible View** (`Alt+F2` when cursor is in the terminal) which renders terminal output in a navigable buffer

### Learning Cards: Codespace Accessibility

<details>
<summary>Screen reader users</summary>

- Screen Reader Optimized mode activates automatically -- verify with Command Palette `Ctrl+Shift+P` then "Toggle Screen Reader Accessibility Mode"
- Audio cues (error, warning, task completed, Copilot suggestion) work identically in Codespaces and desktop VS Code
- In NVDA, switch to Browse Mode to read terminal output, then Focus Mode to type -- same pattern as local VS Code

</details>

<details>
<summary>Low vision users</summary>

- All VS Code zoom and theme settings apply in the browser-based Codespace -- `Ctrl+=` increases editor font size
- Audio cues for errors and Copilot suggestions supplement visual indicators you might miss at lower zoom levels
- Chrome and Edge provide the most consistent rendering of the Codespace UI at high zoom and magnification levels

</details>

<details>
<summary>Sighted users</summary>

- The Codespace browser tab looks and feels like desktop VS Code -- same layout, same panels, same shortcuts
- Look for the green "Codespaces" badge in the bottom-left corner to confirm you are connected to a cloud environment
- If an extension is unavailable in the browser, connect the Codespace to local VS Code Desktop for full extension support

</details>

## 5. Screen Reader Configuration

### NVDA

No special NVDA profile is required for Codespaces in the browser. The same settings recommended in [Appendix B](appendix-b-screen-reader-cheatsheet.md) apply:

- Ensure Browse Mode is on for reading, Focus Mode for typing
- Set maximum line length to 10000 in NVDA Settings → Browse Mode
- In Chrome or Edge, NVDA's Browse Mode detection is generally reliable

### JAWS

- Use Virtual Cursor for reading page content
- Switch to PC Cursor (Insert+Z or Num Pad Plus) when inside the editor and writing code
- JAWS works best with the Codespace in Chrome or Edge

### VoiceOver (macOS)

- Use Quick Nav (Left+Right arrows) for moving through the VS Code interface
- The Rotor (VO+U) surfaces VS Code's landmark regions
- If text in the editor is not reading fluently, ensure Screen Reader Optimized mode is active (see above)

## 6. Keyboard Shortcuts in Codespaces

Codespaces uses standard VS Code keyboard shortcuts. The most important ones for workshop exercises:

### Navigation

| Shortcut | Action |
| ----------  | --------  |
| Ctrl+Shift+P | Command Palette |
| Ctrl+P | Quick Open (search files by name) |
| Ctrl+` | Toggle integrated terminal |
| Ctrl+Shift+E | Explorer panel |
| Ctrl+Shift+G | Source Control panel |
| Ctrl+Shift+X | Extensions panel |
| Ctrl+B | Toggle sidebar |

### Editor

| Shortcut | Action |
| ----------  | --------  |
| Ctrl+Shift+K | Delete line |
| Alt+↑ / Alt+↓ | Move line up/down |
| Ctrl+/ | Toggle line comment |
| Ctrl+G | Go to line number |
| F8 | Next error or warning |
| Shift+F8 | Previous error or warning |
| Alt+F2 | Accessible View (terminal, notifications, Copilot output) |

### Source Control

| Shortcut | Action |
| ----------  | --------  |
| Ctrl+Shift+G | Open Source Control panel |
| Ctrl+Enter | Commit (when focus is on message field) |

## 7. Managing Your Codespaces

### Stopping a Codespace

Codespaces automatically stop after a period of inactivity (default: 30 minutes). To stop manually:

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Find your Codespace in the list
3. Activate the **…** menu next to it
4. Choose **Stop codespace**

Stopped Codespaces retain your files and changes. They do not use compute hours while stopped.

### Deleting a Codespace

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Activate the **…** menu next to the Codespace
3. Choose **Delete**

> **Note:** Deleting a Codespace removes any uncommitted or unpushed changes permanently. Always commit and push your work before deleting.

### Resuming a Codespace

1. Go to [github.com/codespaces](https://github.com/codespaces)
2. Find your stopped Codespace
3. Activate **Open in …** to resume it in the browser or in VS Code Desktop

## 8. Dotfiles and Persistent Configuration

If you have a repository named `dotfiles` on your GitHub account, Codespaces will automatically apply it when provisioning new environments. This is useful for:

- Setting your preferred shell (bash, zsh, fish)
- Adding shell aliases and functions
- Pre-installing command-line tools

To set up dotfiles: create a repository named `dotfiles` and add an `install.sh` script. Codespaces will run it automatically.

VS Code settings (themes, font size, keybindings) can be synchronized to Codespaces via **Settings Sync** (sign in with your GitHub account in VS Code settings).

## 9. Codespaces vs GitHub.dev

| Feature | GitHub Codespaces | GitHub.dev |
| ---------  | -----------------  | ------------  |
| Access | github.com/codespaces or press `.` then choose Codespaces | Press `.` on any repository |
| Terminal | Yes - full terminal | No terminal |
| Extensions | Most VS Code extensions | Web-compatible extensions only |
| Run code | Yes | No |
| Cost | Free tier, then usage-based | Free |
| Screen reader support | Full VS Code + terminal | Full VS Code (no terminal) |
| Best for | Active development, running tests | Quick edits, reading code |

For workshop exercises that involve running scripts or tests, use Codespaces. For quickly browsing or editing a file, GitHub.dev is faster to open.

### Learning Cards: Choosing Your Cloud Editor

<details>
<summary>Screen reader users</summary>

- GitHub.dev has no terminal -- choose Codespaces when you need to run commands, and github.dev for quick file edits
- Both editors support screen reader mode, but Codespaces gives you the full terminal Accessible View (`Alt+F2`) that github.dev lacks
- Press `.` on any repo page for github.dev; use the Codespaces dashboard at github.com/codespaces for a full environment

</details>

<details>
<summary>Low vision users</summary>

- GitHub.dev loads instantly with your synced VS Code theme -- good for quick high-contrast reading of source files
- Codespaces takes 30-60 seconds to provision but gives you terminal, builds, and the same zoom/theme settings
- Both editors scale with browser zoom (`Ctrl+=`) in addition to VS Code's own font-size settings

</details>

<details>
<summary>Sighted users</summary>

- Use github.dev (press `.`) for quick drive-by edits -- it opens immediately with no provisioning wait
- Use Codespaces when you need to run scripts, install dependencies, or test your changes before committing
- The comparison table above summarizes every difference -- refer back to it when deciding which to open

</details>

## 10. Common Issues and Workarounds

### The Codespace takes a long time to open

Provisioning a new Codespace can take up to 90 seconds. If it hangs beyond that, refresh the browser tab and try again. Resuming an existing Codespace is much faster (5-10 seconds).

### Screen reader stops reading after I switch to the terminal

Switch to Browse Mode (NVDA: Insert+Space; JAWS: Insert+Z) to read the terminal output, then return to Focus Mode to type your next command.

### Audio cues are not working in the browser

Some browsers mute audio by default for new tabs. Check your browser's site permissions to ensure audio is allowed for github.dev or the Codespace URL.

### Extensions I rely on locally are not available

Some extensions are not compatible with the browser-based VS Code. Connect to the Codespace via VS Code Desktop instead (see [Section 3](#3-codespace-environments)) to access your full extension library.

### I accidentally deleted my Codespace before pushing

If the branch exists on GitHub, you can create a new Codespace from it. Uncommitted changes in a deleted Codespace cannot be recovered.

### My changes are not showing in GitHub after committing

You may have committed but not pushed. In the Source Control panel, look for the **Sync Changes** or **Push** button. Run `git push` in the terminal if needed.

---

*Next: [Appendix K: Copilot Reference](appendix-k-copilot-reference.md)*  
*Back: [Appendix I: GitHub CLI Reference](appendix-i-github-cli.md)*  
*Teaching chapter: [Chapter 01: Choose Your Tools](01-choose-your-tools.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Cloud Development Environments - Accessibility Guide:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **1. What Is GitHub Codespaces?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **2. Creating a Codespace:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **3. Codespace Environments:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **4. Accessibility in Codespaces:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **5. Screen Reader Configuration:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **6. Keyboard Shortcuts in Codespaces:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **7. Managing Your Codespaces:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **8. Dotfiles and Persistent Configuration:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **9. Codespaces vs GitHub.dev:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- **10. Common Issues and Workarounds:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat), [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview), [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
