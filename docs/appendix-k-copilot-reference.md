# Appendix K: Copilot Reference

> **Reference companion to:** [Chapter 16: GitHub Copilot](16-github-copilot.md)
>
> **Authoritative sources:** [GitHub Docs: Copilot](https://docs.github.com/en/copilot) | [VS Code Docs: Agents window](https://code.visualstudio.com/docs/copilot/agents/agents-window) | [VS Code 1.120 release notes](https://code.visualstudio.com/updates/v1_120)

> This appendix consolidates Copilot reference tables and Copilot model-selection guidance into one complete reference.

---

## Copilot Reference Tables

>
> **Listen to Episode 40:** [GitHub Copilot - Complete Reference](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Keyboard Shortcuts, Chat, Screen Reader Workflow, Plugin Ecosystem, and GitHub Agentic Workflows

> Quick-reference card for GitHub Copilot in VS Code and the broader agentic ecosystem - plugins, MCP servers, and cloud-based automation. For the Copilot lesson, see [Chapter 16: GitHub Copilot](16-github-copilot.md). For Accessibility Agents specifically, see [Appendix L: Accessibility Agents Reference](appendix-l-agents-reference.md).

## Table of Contents

1. [Keyboard Shortcuts](#1-keyboard-shortcuts)
2. [Chat Participants](#2-chat-participants)
3. [Chat Slash Commands](#3-chat-slash-commands)
4. [Chat Modes](#4-chat-modes)
4A. [VS Code 1.120+ Agents Window and Accessibility](#4a-vs-code-1120-agents-window-and-accessibility)
4B. [MCP Servers - Accessibility Scanning Tools](#4b-mcp-servers---accessibility-scanning-tools)
4C. [Smart Actions](#4c-smart-actions)
4D. [Browser Agent (Experimental)](#4d-browser-agent-experimental)
4E. [Plan Agent](#4e-plan-agent)
4F. [Copilot Spaces - Team Knowledge Base](#4f-copilot-spaces---team-knowledge-base)
5. [Custom Instructions - All Levels](#5-custom-instructions---all-levels)
6. [Accessible View Workflow](#6-accessible-view-workflow)
7. [Configuration Scope Reference](#7-configuration-scope-reference)
8. [Instruction Priority and Conflicts](#8-instruction-priority-and-conflicts)
9. [All File Types Quick Reference](#9-all-file-types-quick-reference)
10. [VS Code Settings Reference](#10-vs-code-settings-reference)
11. [Diagnostics and Troubleshooting](#11-diagnostics-and-troubleshooting)
12. [Screen Reader Workflow - Official Guide](#12-screen-reader-workflow---official-guide)
13. [awesome-copilot - Plugin Ecosystem](#13-awesome-copilot---plugin-ecosystem)
14. [GitHub Agentic Workflows and Third-Party Agents](#14-github-agentic-workflows-and-third-party-agents)
15. [Copilot Pricing, Free Plan, and Usage Limits](#15-copilot-pricing-free-plan-and-usage-limits)

## 1. Keyboard Shortcuts

### Inline Suggestions (Ghost Text)

| Action | Windows / Linux | macOS |
| --------  | ----------------  | -------  |
| Accept entire suggestion | `Tab` | `Tab` |
| Reject suggestion | `Escape` | `Escape` |
| Accept one word at a time | `Ctrl+Right Arrow` | `Cmd+Right Arrow` |
| Show next alternative suggestion | `Alt+]` | `Option+]` |
| Show previous alternative suggestion | `Alt+[` | `Option+[` |
| Open full suggestion list | `Ctrl+Enter` | `Cmd+Enter` |
| Open suggestion in Accessible View | `Alt+F2` | `Option+F2` |
| Insert suggestion from Accessible View at cursor | `Ctrl+/` | `Cmd+/` |

**Word-by-word acceptance (`Ctrl+Right Arrow`) is recommended for screen reader users** - it lets you review the suggestion incrementally before committing to it.

**Accessible View workflow for screen reader users:** Press `Alt+F2` when a suggestion appears to hear the full text without streaming noise, then press `Ctrl+/` to insert it directly from the Accessible View without closing the panel first.

### Copilot Chat

| Action | Windows / Linux | macOS |
| --------  | ----------------  | -------  |
| Open Chat panel | `Ctrl+Alt+I` | Use **Chat: Open Chat** from the Command Palette if your keymap differs |
| Open inline chat (in-file, at cursor) | `Ctrl+I` | `Cmd+I` |
| Open Quick Chat (floating dialog) | `Ctrl+Shift+Alt+I` | `Cmd+Shift+Ctrl+I` |
| Send message | `Ctrl+Enter` | `Cmd+Enter` |
| Clear chat history | `Ctrl+L` | `Cmd+L` |

### Accessibility

| Action | Windows / Linux | macOS |
| --------  | ----------------  | -------  |
| Open Accessible View | `Alt+F2` | `Option+F2` |
| Open Accessible Help | `Alt+H` | `Option+H` |
| Close Accessible View | `Escape` | `Escape` |

**Use Accessible View (`Alt+F2`) every time Copilot responds.** It provides the complete response in a readable pane - no streaming, no live region noise, proper heading structure.

## 2. Chat Participants

Type these in the Copilot Chat input to give Copilot context from a specific source.

### `@` Participants - Scope Context

| Participant | What It Does |
| -------------  | -------------  |
| `@workspace` | Searches your entire VS Code workspace for relevant context |
| `@github` | Accesses GitHub.com data - search issues, PRs, code across the platform |
| `@terminal` | Provides context from the VS Code integrated terminal |

#### Example prompts

```text
@workspace find all places where heading hierarchy is documented

@github search community-access/accessibility-agents for issues labeled accessibility

@terminal what did the last command output mean?
```

### `#` Variables - Specific Context

| Variable | What It Attaches |
| ----------  | -----------------  |
| `#file` | Opens a file picker - attach any file from your workspace |
| `#selection` | Attaches your currently selected text |
| `#codebase` | Searches the full codebase for relevant snippets |
| `#terminalLastCommand` | Attaches the last terminal command and its output |

#### Example prompts

```text
Review #selection for heading hierarchy violations

Explain what #file does (then pick a file from the picker)

What does this error mean? #terminalLastCommand

Search #codebase for all screen reader navigation instructions
```

## 3. Chat Slash Commands

Type `/` in Copilot Chat to see the available built-in commands.

| Command | What It Does | Example |
| ---------  | -------------  | ---------  |
| `/explain` | Explains the selected code or text in plain language | Select a complex block → `/explain` |
| `/fix` | Suggests fixes for problems in the selected code | Select broken code → `/fix` |
| `/tests` | Generates unit tests for the selected function (code files) | Select a function → `/tests` |
| `/doc` | Generates documentation (JSDoc, docstring) for parsed code | Select a function → `/doc` |
| `/new` | Scaffolds a new file or project structure | `/new React component for notifications` |
| `/help` | Shows all available Copilot commands and participants | `/help` |
| `/clear` | Clears the current chat history | `/clear` |

### Workspace management slash commands

| Command | What It Does | Example |
| ---------  | -------------  | --------  |
| `/init` | Analyzes your workspace and auto-generates a `.github/copilot-instructions.md` tailored to your project | `/init` |
| `/savePrompt` | Saves the current chat conversation as a reusable `.prompt.md` slash command file | After a useful exchange, type `/savePrompt` |

**Note:** These are Copilot's built-in chat slash commands. Accessibility Agents adds 28 additional workspace-level slash commands from `.github/prompts/` - see [Appendix L](appendix-l-agents-reference.md) for the full list.

### Using Slash Commands for Documentation Work

```text
Select a section of Markdown → /explain
→ Copilot explains the purpose and structure of that section

Select a complex code example → /explain
→ Copilot explains what the code does in plain language

Select a broken YAML template → /fix
→ Copilot suggests what is wrong and how to correct it
```

## 4. Chat Modes

Copilot Chat has four modes. Select the current mode from the dropdown at the bottom of the Chat input area.

| Mode | What It Does | Best For |
| ------  | -------------  | ----------  |
| **Ask** | Conversational Q&A. Copilot explains, suggests, and answers but does not directly edit files. | Questions, explanations, discussion, exploring ideas |
| **Edit** | You define a working set of files; Copilot proposes edits as a diff that you approve or reject. | Targeted, controlled multi-file edits |
| **Agent** | Copilot works autonomously - it decides which files to touch, reads/writes code, runs terminal commands. | Larger end-to-end tasks |
| **Plan** | Copilot writes an implementation plan first; no code is written until you approve the plan. (Public preview) | Complex features where you want to validate the approach first |

**Screen reader note:** The mode selector is in the Chat panel toolbar at the bottom. Tab through the bottom of the Chat view to find it. The current mode name is its accessible label. Press `Space` or `Enter` to open the dropdown.

**Model selection** is a separate control, also at the bottom of the Chat input. See [Appendix K: GitHub Copilot Reference](appendix-k-copilot-reference.md) for a complete guide to choosing models.

### Learning Cards: Chat Participants, Commands, and Modes

<details>
<summary>Screen reader users</summary>

- Type `@` in Chat to scope context (`@workspace`, `@terminal`, `@github`) -- the autocomplete list is keyboard-navigable with arrow keys
- Type `/` for slash commands (`/explain`, `/fix`, `/tests`) -- each is announced with its description as you arrow through
- The mode selector is at the bottom of the Chat panel toolbar; Tab to it, then `Space` or `Enter` to open the dropdown

</details>

<details>
<summary>Low vision users</summary>

- Chat responses appear in the panel with syntax highlighting -- increase the Chat panel font size via `editor.fontSize` in settings
- The `@` and `/` trigger characters are small but the autocomplete popup that follows is large and themed to your current color scheme
- Use Ask mode for reading explanations, Agent mode for controlled multi-file changes and autonomous tasks (Edit mode is being deprecated into Agent mode as of VS Code 1.118)

</details>

<details>
<summary>Sighted users</summary>

- The `@` participant picker and `/` command picker both show inline descriptions -- scan them visually to discover available options
- The mode dropdown at the bottom of Chat shows the current mode name; the icon changes shape per mode for quick visual identification
- Code blocks in Chat responses have a "Copy" and "Insert at Cursor" button in the top-right corner of each block

</details>

## 4A. VS Code 1.120+ Agents Window and Accessibility: Complete Guide

### Agents Window (Agent-First Workflow)

VS Code 1.120 introduces the **Agents window** (Preview, now Stable) for agent-first workflows. This dedicated window lets you:

- Orchestrate tasks across multiple projects and workspaces
- Track, review, and manage agent sessions (Copilot CLI, Copilot Cloud, Claude)
- Access a Customizations panel for agent personas, skills, hooks, MCP servers, and plugins
- Use an integrated browser and terminal for validating agent changes
- Start sessions on remote machines (SSH, dev tunnel)
- Create sub-sessions for parallel tasks in the same workspace
- Review all agent changes before committing, merging, or discarding
- Use extension support (static content auto-activates, others opt-in via `extensions.supportAgentsWindow`)

#### Key Features

| Feature | Description |
|---------|-------------|
| Agent-first workflow | Dedicated window for describing tasks, tracking sessions, reviewing changes |
| Session management | Manage, pin, filter, and review sessions across all workspaces |
| Customizations | Direct access to agent personas, skills, hooks, MCP servers, plugins |
| Integrated browser | Validate web changes in a persistent browser tab |
| Remote/dev tunnel | Start agent sessions on remote machines via SSH or dev tunnel |
| Sub-sessions | Parallel tasks in the same workspace (except Claude agent) |
| Extension support | Many extensions work; opt-in for others via settings |
| Markdown diff preview | Review documentation changes visually, with smart selection and HTML id validation |
| Risk assessment | Terminal commands show AI-generated risk badges (safe, caution, review carefully) |
| Output compression | Large terminal output is compressed to save context window space |
| BYOK support | Bring-your-own-key models (OpenAI, Anthropic, etc.) with token usage and thinking effort controls |
| Accessibility | Accessible View, keyboard navigation, screen reader/low vision/sighted workflows |

#### How to Open the Agents Window

1. Select **Open in Agents** from the VS Code title bar
2. Open the Command Palette and run **Chat: Open Agents Window**
3. Run `code --agents` from a terminal

#### Interface Overview

| Area | What It Contains |
|------|------------------|
| Sessions list | All agent sessions across workspaces |
| Customizations panel | Agents, skills, instructions, hooks, MCP servers, plugins |
| Chat area | Conversation and prompts for the selected session |
| Changes panel | Files tab (explorer) and Changes tab (agent edits, diffs, feedback, commit/merge/discard) |

#### Safe Review Workflow

1. Open the Agents window
2. Start a new session (Ctrl+N)
3. Choose workspace/repo, trust folder if prompted
4. Select agent type (Copilot CLI, Cloud, Claude)
5. Prefer **worktree isolation** for Git projects (keeps agent edits separate until review)
6. Use Files panel sync before agent starts to pull upstream changes
7. Type a clear, single task
8. Review all changes in the Changes panel before accepting
9. Run validation tasks (build, test) as needed
10. Commit, merge, or discard only after review

#### Accessibility and Inclusion

- **Accessible View**: Press `Alt+F2` for screen reader-friendly suggestion review and insertion
- **Keyboard navigation**: All panels and controls are keyboard accessible
- **Screen reader/low vision/sighted workflows**: See learning cards below for detailed guidance
- **Markdown diff preview**: Use for documentation changes; supports smart selection and HTML id validation

#### Learning Cards: Agents Window

<details>
<summary>Screen reader users</summary>

- Open the Agents window from the Command Palette (`Chat: Open Agents Window`)
- Use `Alt+F1` for Accessibility Help, `F6`/`Shift+F6` to move between areas
- Use `F7`/`Shift+F7` for diff navigation, `Alt+F2` for Accessible View
- Listen for approval prompts before terminal commands
- Prefer worktree isolation for safe review

</details>

<details>
<summary>Low vision users</summary>

- Increase zoom (`Ctrl+=`), use high-contrast theme (`Ctrl+K Ctrl+T`)
- Use modal diff view for cramped layouts
- Widen Chat/Changes panels for large sessions
- Override settings in the Agents window as needed
- Use Markdown preview diff for visual review

</details>

<details>
<summary>Keyboard-only users</summary>

- All navigation is keyboard accessible
- Use Tab/Shift+Tab to move between controls
- Use Enter/Space to activate dropdowns and buttons
- Use Ctrl+N to start new sessions, F6 to cycle panels

</details>

<details>
<summary>Sighted users</summary>

- Use Sessions list as a dashboard; pin/filter sessions
- Watch changed-file counts before opening diffs
- Use Files/Changes panels to inspect agent edits
- Validate in integrated browser/terminal before merging

</details>

#### Other VS Code 1.120+ Features to Highlight

| Feature | Why It Matters | Workshop Guidance |
|---------|---------------|-------------------|
| Terminal command risk assessment | AI-generated risk badges for terminal commands | Useful for all users; always review command details |
| Output compression | Summarizes large terminal output | Saves context window space; ask for raw output if needed |
| Markdown diff preview | Visual review of documentation changes | Use for PRs, especially with headings/tables |
| Plan mode inline control | Edit plans before agent starts work | Use for complex features or when validating approach |
| BYOK token usage/thinking effort | Track/manage model context/cost | Advanced users only; defaults are safe |
| Model picker by provider | Easier model selection | Start with Auto; use provider grouping as needed |
| Copilot CLI plugin discovery | Plugins auto-discovered in VS Code | Reduces setup for advanced users |
| Markdown HTML id completion/validation | Easier anchor link management | Useful for long docs with many anchors |
| Smart selection for Markdown tables | Expand selection from cell to row/table | Helpful for keyboard/low vision users |

#### Settings and Limitations

| Setting | Status | Description |
|---------|--------|-------------|
| `chat.tools.riskAssessment.enabled` | Experimental | AI risk labels for terminal commands |
| `chat.tools.compressOutput.enabled` | Preview | Compresses large terminal output |
| `chat.planWidget.inlineEditor.enabled` | Current | Inline plan editing for supported agents |
| `workbench.diffEditorAssociations` | Current | Markdown files open with preview diffs |
| `extensions.supportAgentsWindow` | Preview | Opt-in extensions for Agents window |
| `chat.notifyWindowOnResponseReceived` | Current | OS notifications for chat responses |
| `chat.notifyWindowOnConfirmation` | Current | OS notifications for agent input/confirmation |

**Limitations:**
- Agents window is Preview in 1.120; not all agent types/extensions supported
- Multi-root sessions not yet supported
- Some extensions require opt-in
- Agent cannot directly open integrated browser (use localhost link or command)
- Org policy may restrict agents/cloud/model choices

#### Placement in the Workshop

Introduce the Agents window after learners complete Chat and Agent mode in [Chapter 16](16-github-copilot.md). Use it as an advanced review and orchestration surface, not a replacement for learning Git, diffs, PRs, and manual accessibility review.

### Other VS Code 1.120 Changes Worth Calling Out

The following VS Code 1.120 release-note items are most relevant to this workshop.

| Feature | Why It Matters | Workshop Guidance |
| ------- | -------------- | ----------------- |
| Terminal command risk assessment, Experimental | Command confirmations can include a risk badge and a short explanation of what the command does | Useful for beginners and screen reader users, but still read the full command yourself before approving |
| Terminal tool output compression, Preview | Long terminal output can be summarized before it enters chat context | Helpful for large `git diff`, install, and test logs; ask for raw output if exact lines matter |
| Markdown preview for diffs, Preview | Markdown diffs can be reviewed as rendered content instead of only raw source | Useful for documentation PRs, especially when headings, lists, and tables matter visually |
| Plan mode inline control for Claude and Copilot CLI | Plans can be edited inline before implementation starts | Use this when you want learners to shape the plan before the agent edits files |
| BYOK token usage in Chat | Bring-your-own-key models now show more accurate context-window usage | Helpful for advanced users managing context and cost; not required for workshop beginners |
| BYOK thinking effort controls | Reasoning models can expose thinking-effort settings from the model picker | Advanced setting only; leave defaults unless a facilitator gives specific guidance |
| Model picker grouped by provider | Models are organized by provider and searchable by name | Tell learners to start with Auto and use provider grouping only when they must choose a specific model |
| Copilot CLI plugin discovery | Plugins installed with GitHub Copilot CLI can be picked up by VS Code | Reduces duplicate setup for advanced agent users; document only as a convenience note |
| Markdown HTML `id` completion and validation | Markdown links to HTML `id` anchors are easier to complete and validate | Useful for this repo because long docs use many internal anchors |
| Smart selection for Markdown tables | Expand Selection can grow from a cell to a row and then the whole table | Helpful when editing large reference tables with keyboard or low vision workflows |

### Recommended Settings to Know

The following table lists settings that matter for this 1.120 update.

| Setting | Status | What It Does |
| ------- | ------ | ------------ |
| `chat.tools.riskAssessment.enabled` | Experimental | Shows AI-generated risk labels for terminal command confirmations |
| `chat.tools.compressOutput.enabled` | Preview | Compresses large terminal output before it is sent to the model |
| `chat.planWidget.inlineEditor.enabled` | Current | Controls inline plan editing for supported agents |
| `workbench.diffEditorAssociations` | Current | Can make Markdown files open with rendered Markdown preview diffs by default |
| `extensions.supportAgentsWindow` | Preview | Opts specific installed extensions into the Agents window |
| `chat.notifyWindowOnResponseReceived` | Current | Sends OS notifications when a chat response arrives |
| `chat.notifyWindowOnConfirmation` | Current | Sends OS notifications when an agent needs input or confirmation |

Example Markdown preview diff setting:

```json
{
  "workbench.diffEditorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  }
}
```

Example extension opt-in for the Agents window:

```json
{
  "extensions.supportAgentsWindow": {
    "publisher.extension-id": true
  }
}
```

### Limitations to Teach Explicitly

- The Agents window is still a Preview feature in VS Code 1.120.
- Not every agent type or third-party agent is supported in the Agents window yet.
- Multi-root sessions are not supported in the Agents window yet.
- Some extensions work automatically, but extension support is still evolving.
- The agent cannot directly open the integrated browser for you; use a localhost link or **Browser: Open Integrated Browser**.
- Organization policy can disable or limit agents, cloud agents, model choices, approvals, and BYOK features.

### Recommended Placement in the Workshop

Introduce the Agents window after learners complete the normal Chat and Agent mode flow in [Chapter 16](16-github-copilot.md). Treat it as an advanced navigation and review surface, not a replacement for learning Git, diffs, pull requests, and manual accessibility review.

## 4B. MCP Servers - Accessibility Scanning Tools

Model Context Protocol (MCP) servers expose accessibility scanning tools that work with any MCP-compatible client - VS Code, Claude Desktop, other MCP-aware tools, and CI/CD pipelines.

### What is MCP?

MCP is an open protocol (anthropic/model-context-protocol) that lets AI agents access tools and data sources through a standardized interface. The Accessibility Agents project operates an HTTP-based MCP server with 30+ accessibility tools - no installation needed, just connect and scan.

**Benefits for accessibility work:**
- Use the same tools across different AI platforms (Copilot, Claude, Gemini, CI/CD)
- Tools work offline or in restricted environments via local HTTP server
- Streaming responses with live progress updates
- Compliance audit history and trending

### Core 30+ MCP Tools Catalog

**Web Accessibility Scanning (8 tools):**
- `scan-page` - Scan a live URL with axe-core WCAG 2.2 AA rules
- `scan-pages` - Batch scan multiple URLs
- `scan-dom` - Scan raw HTML/DOM without loading a page
- `scan-with-lighthouse` - Lighthouse accessibility audit
- `scan-with-playwright` - Behavioral testing with Playwright
- `get-page-outline` - Extract heading hierarchy and landmarks
- `detect-color-contrast` - Analyze contrast ratios across a page
- `find-aria-roles` - Map all ARIA roles and their state changes

**Document Accessibility Scanning (10 tools):**
- `scan-word` - Microsoft Word .docx accessibility scan
- `scan-excel` - Microsoft Excel .xlsx accessibility scan
- `scan-powerpoint` - Microsoft PowerPoint .pptx accessibility scan
- `scan-pdf` - PDF accessibility scan with PDF/UA validation
- `scan-epub` - ePub and digital publication scan
- `list-documents` - Find and inventory documents in a folder
- `export-findings-csv` - Export audit results to CSV
- `generate-vpat` - Generate Voluntary Product Accessibility Template (VPAT)
- `generate-compliance-report` - Section 508, EN 301 549, EAA reporting
- `remediate-document` - Apply fixes to scanned documents

**Markdown & Content Scanning (4 tools):**
- `scan-markdown` - Markdown file accessibility check
- `lint-markdown` - Markdownlint rules with accessibility focus
- `validate-links` - Check link structure and destinations
- `check-headings` - Verify heading hierarchy and anchor links

**Compliance & Reporting (5 tools):**
- `calculate-severity-score` - WCAG severity scoring (0-100)
- `trend-audit-results` - Compare audits across time
- `generate-audit-report` - Full markdown audit report
- `map-to-wcag` - Map findings to specific WCAG criteria
- `map-to-compliance-standard` - Section 508, EN 301 549, EAA mapping

**GitHub & CI/CD Integration (3+ tools):**
- `post-audit-to-issue` - Comment audit results on a GitHub issue
- `create-accessibility-pr` - Create PR with accessibility fixes
- `trigger-ci-scan` - Start accessibility scanning in CI pipeline

### How to Use MCP Tools in VS Code

**Option 1: Via Copilot Chat (direct)**

```text
@workspace use the scan-page MCP tool to scan https://example.com
```

Copilot will recognize "scan-page" and invoke it through the MCP server.

**Option 2: Via a custom agent**

Create a `.github/agents/my-scanner.agent.md` that declares MCP tool access:

```yaml
---
name: My Scanner
description: Custom agent using MCP accessibility tools
tools: ['scan-page', 'scan-word', 'export-findings-csv']
---

You have access to MCP accessibility scanning tools...
```

**Option 3: Via MCP server connection in settings**

Add to `.vscode/settings.json`:

```json
{
  "modelContext.servers": {
    "accessibility-agents": {
      "command": "node",
      "args": ["path/to/mcp-server/index.js"],
      "env": {
        "PORT": "3000"
      }
    }
  }
}
```

### MCP Tools in CI/CD

Use MCP tools in GitHub Actions to run accessibility scans on every commit:

```yaml
name: Accessibility Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Accessibility Agents MCP server
        run: npx @a11y-agent-team/mcp-server &
      - name: Scan changed files
        run: npx accessibility-agents scan --mcp-url http://localhost:3000
```

### Learning Cards: MCP Servers

<details>
<summary>Screen reader users</summary>

- MCP servers work with any MCP client, including VS Code and Claude Desktop -- they expose tools through a standardized interface
- The 30+ accessibility tools are named predictably: `scan-*` for audits, `export-*` for reporting, `generate-*` for compliance
- MCP tool responses appear in Copilot Chat like any agent output -- press `Alt+F2` to read in Accessible View

</details>

<details>
<summary>Low vision users</summary>

- MCP tools return structured JSON that Copilot renders as Markdown tables and lists -- zoom affects rendering the same as other Chat output
- The `export-findings-csv` tool produces download links; use `Ctrl+S` to save CSV to your downloads folder
- Generate reports with `generate-audit-report` for complete details; CSV export is for data analysis and trending

</details>

<details>
<summary>Sighted users</summary>

- Scan results appear as Markdown tables in Chat with color-coded severity (High / Medium / Low)
- MCP tool icons in the Chat toolbar indicate tool use; hover to see the tool name
- Use `/export-findings-csv` slash command to save results without manual download
- MCP server logs appear in VS Code Output panel if you need to debug tool calls

</details>

### References

- [Model Context Protocol (MCP) Specification](https://spec.modelcontextprotocol.io/)
- [Anthropic MCP GitHub](https://github.com/anthropic/model-context-protocol)
- [Accessibility Agents MCP Server Documentation](https://github.com/Community-Access/accessibility-agents/tree/main/mcp-server)

## 4C. Smart Actions

**Smart Actions** are predefined AI-powered actions for common coding tasks. They appear as options when you click on code, errors, or use the lightbulb menu.

### Available Smart Actions

| Action | Trigger | What It Does |
|--------|---------|-------------|
| Generate Commit Message | Staged changes in Git | Creates a descriptive commit message from your staged diff |
| Rename Symbol | Any symbol in code | Rename a variable/function and all references automatically |
| Fix Error | Error inline squiggle | Suggests fixes for compilation, lint, or test errors |
| Semantic Search | Selection in editor | Search your workspace for conceptually related code (not just text match) |
| Document Code | Function or method | Generate docstrings and inline comments |
| Refactor Code | Selection | Suggest refactoring patterns (extract function, simplify, etc.) |
| Explain Code | Selection | Provide a plain-language explanation of selected code |

### How to Trigger Smart Actions

1. **Lightbulb menu:** Click the lightbulb icon in the left margin of the editor (or press `Ctrl+.`)
2. **Git integration:** Stage changes with `git add`; the commit panel offers "Generate Commit Message"
3. **Error squiggles:** Hover over an error and press `Ctrl+.` to see fixes
4. **Keyboard shortcut:** `Ctrl+.` opens available actions for the current selection

### Keyboard Shortcuts for Smart Actions

| Action | Windows / Linux | macOS |
|--------|-----------------|-------|
| Open Smart Actions menu | `Ctrl+.` | `Cmd+.` |
| Accept first suggestion | `Enter` | `Enter` |
| Navigate menu | `Up/Down Arrow` | `Up/Down Arrow` |

### Screen Reader & Low Vision Workflows

<details>
<summary>Screen reader users</summary>

- When the lightbulb appears, VS Code announces it as a clickable action
- Press `Ctrl+.` to open the actions list; it becomes a dropdown menu navigable with arrow keys
- Each action is announced with a short description (e.g., "Generate Commit Message")
- Press `Enter` to activate the selected action
- Results appear as code suggestions or inline edits that you can review before accepting

</details>

<details>
<summary>Low vision users</summary>

- The lightbulb icon is visible in the left margin when actions are available
- Increase zoom (`Ctrl+=`) to make the lightbulb and menu more visible
- Use high-contrast theme to distinguish the lightbulb from surrounding text
- The action menu can be wide; resize the editor panel if needed
- Results are shown as code suggestions with "Accept" and "Reject" buttons

</details>

<details>
<summary>Keyboard-only users</summary>

- Press `Ctrl+.` from any position in the editor
- Use `Up/Down Arrow` to navigate through available actions
- Press `Enter` to activate; `Escape` to dismiss
- After accepting an action, review the change and use `Ctrl+Z` to undo if needed

</details>

<details>
<summary>Sighted mouse users</summary>

- Click the lightbulb icon that appears when actions are available
- Browse the dropdown menu visually
- Click an action to run it
- Hover over actions to see descriptions

</details>

### Workshop Guidance

Introduce Smart Actions as a shortcut for common tasks, but emphasize manual understanding first:
- Teach learners to rename variables manually before showing "Rename Symbol"
- Teach error-fixing patterns before showing "Fix Error"
- Use "Generate Commit Message" as a review tool, not a replacement for writing meaningful messages

---

## 4D. Browser Agent (Experimental)

**Browser Agent (Experimental)** lets your Copilot agent test and validate web applications directly. The agent can open your app in the integrated browser, verify features, check for layout issues, and take screenshots.

### What the Browser Agent Can Do

- Open a web app (local or remote) in the integrated browser
- Verify that a feature works as expected
- Check for layout or visual issues
- Take screenshots for documentation
- Navigate forms and test user flows
- Report accessibility or functionality issues

### How to Use Browser Agent

1. Start a Copilot agent session (Chat or Agents window)
2. Ask the agent to test your web app:
   ```text
   Open the web app at localhost:3000 and verify the login form works correctly.
   ```
3. The agent opens the integrated browser automatically
4. It interacts with the page and reports findings
5. Review results in Chat and take action as needed

### Example Prompts

```text
Open http://localhost:3000 and take a screenshot of the homepage.

Test the search form at localhost:8080 - enter "accessibility" and verify results appear.

Check the mobile layout of localhost:3000 at 320px width and report any overlapping text.

Verify the light and dark mode toggle works on localhost:3000.
```

### Important: Browser Agent is Experimental

- Feature availability may change
- Not all browsers or endpoints are supported
- Use only with development servers you control
- Results may require human verification
- Do not rely on Browser Agent alone for accessibility or security testing

### Accessibility & Testing Considerations

<details>
<summary>Screen reader users</summary>

- Browser Agent interactions are reported in Copilot Chat as text descriptions
- Press `Alt+F2` to read the full response in Accessible View
- Screenshots taken by the agent appear as images in Chat (not screen-reader friendly)
- Request text descriptions instead: "Describe what you see on the page instead of taking a screenshot"

</details>

<details>
<summary>Low vision users</summary>

- Browser Agent can zoom the test environment independently of your VS Code zoom
- Request large screenshots: "Take a screenshot at 150% zoom"
- Increase Chat panel zoom to read agent responses
- Use high-contrast mode for the integrated browser

</details>

<details>
<summary>Keyboard-only users</summary>

- All Browser Agent interactions are text-based in Chat
- You cannot directly interact with the integrated browser keyboard-only (it's agent-driven)
- Request text interaction: "Use the keyboard to navigate the form and tab through fields"

</details>

<details>
<summary>Sighted users</summary>

- Browser Agent opens the integrated browser as a visible panel
- Watch the agent interact with your app in real time
- Screenshots are useful for documentation or layout verification

</details>

### Workshop Guidance

- Treat Browser Agent as a supplementary testing tool, not a replacement for manual testing
- Teach learners to write clear test descriptions: "Check for visible text overlaps" vs. "Is it broken?"
- Use sparingly; each agent session consumes model tokens
- For accessibility testing, prefer manual screen reader / keyboard testing + Browser Agent screenshots

---

## 4E. Plan Agent

The **Plan Agent** is a specialized Copilot agent that breaks down a task into a structured implementation plan before writing code. It analyzes your codebase, asks clarifying questions, and produces a step-by-step plan that you can review and refine before implementation starts.

### How Plan Agent Works

1. **Start an agent session** and describe your task
2. **Plan Agent** analyzes your codebase structure and conventions
3. **Asks clarifying questions** to understand requirements ("Should this use TypeScript or JavaScript?")
4. **Generates a plan** with concrete steps, file changes, and testing approach
5. **You review and edit** the plan inline (if editing is enabled)
6. **Handoff to implementation** - either Plan Agent or another agent executes the plan
7. **Agent runs tests** and reports success or asks for refinement

### Example Workflow

```text
Prompt: "Add a new feature that lets users export data as CSV."

Plan Agent asks:
- Where should the CSV export button go in the UI?
- Should we use an existing CSV library or write our own?
- Do we need to support large files or streaming?

Plan generates:
- Step 1: Create export utility in lib/export.ts
- Step 2: Add button to UI component
- Step 3: Wire button to export function
- Step 4: Add tests for export logic
- Step 5: Test with large dataset

You review and edit the plan → Agent implements → Tests run → Feature complete
```

### Plan Agent vs. Full Implementation Agent

| Aspect | Plan Agent | Implementation Agent |
|--------|-----------|----------------------|
| **Purpose** | Breaks down complex tasks into steps | Executes the full task end-to-end |
| **Interaction** | Reviews and refines plan before coding | Codes as it goes |
| **Best for** | Large features, unfamiliar codebases, design review | Well-scoped tasks, known patterns |
| **Control** | Plan can be edited inline | Limited control once coding starts |
| **Time** | Slower upfront, faster overall if plan is good | Faster initial, may need rework |

### When to Use Plan Agent

- Complex features requiring multi-file changes
- Unfamiliar codebases where structure isn't obvious
- When design review is important before implementation
- When you want to validate the approach before committing
- Team workflows where plan review is a step before coding

### Keyboard Shortcuts for Plan Agent

| Action | Windows / Linux | macOS |
|--------|-----------------|-------|
| Open Agents window | `Code --agents` or Command Palette | Same |
| Start new session | `Ctrl+N` | `Cmd+N` |
| Edit plan inline (if enabled) | Click edit button or `Tab` into plan | Same |
| Send plan for implementation | `Ctrl+Enter` | `Cmd+Enter` |

### Accessibility & Planning Workflows

<details>
<summary>Screen reader users</summary>

- Plan Agent generates structured text outlines, easy to navigate with headings
- Press `H` to jump between steps in the plan
- Use `Alt+F2` to read full plans in Accessible View
- Inline plan editing (if enabled) is keyboard-friendly; Tab to edit fields

</details>

<details>
<summary>Low vision users</summary>

- Plans are text-based with clear step numbers; zoom as needed
- Headings are large and bold; navigate with heading jumps
- Use high-contrast theme to distinguish plan steps from chat text

</details>

<details>
<summary>Keyboard-only users</summary>

- All plan review is keyboard-accessible
- Tab through plan items; arrow keys move between steps
- Inline editing: focus on a step and press `Enter` to edit
- Use `Ctrl+Enter` to accept plan and start implementation

</details>

<details>
<summary>Sighted users</summary>

- Plans appear as bulleted outlines with indentation showing sub-tasks
- Icons indicate status (pending, done, in-progress)
- Click steps to expand details
- Visual progress bar shows plan completion

</details>

### Workshop Guidance

Introduce Plan Agent as a **design-first** approach:
- Use it for larger features or refactors
- Teach learners to ask clarifying questions back to the plan
- Emphasize code review: "Is this plan what you expected?"
- Use Plan Agent output as documentation for your team

---

## 4F. Copilot Spaces - Team Knowledge Base

**Copilot Spaces** (in preview) lets teams create a shared knowledge base that Copilot uses when answering questions. A Space includes documentation, codebases, and domain knowledge, all indexed for fast retrieval by AI.

### What is a Copilot Space?

A **Space** is a collection of:
- Project documentation
- Code repositories
- Architectural guides
- API documentation
- Team conventions and style guides
- Links to external resources

When someone uses Copilot in the Space, the AI uses that knowledge to provide more accurate, context-aware answers.

### Why Copilot Spaces Matter

- **Consistency**: All team members get answers grounded in the same authoritative sources
- **Onboarding**: New team members get expert-level context immediately
- **Domain expertise**: Copilot learns your project's conventions, architecture, and best practices
- **Reduced hallucinations**: Fewer wrong or outdated answers

### How to Create a Copilot Space

1. Go to [github.com/copilot/spaces](https://github.com/copilot/spaces)
2. Click **Create a new Space**
3. Name your Space (e.g., "My Project Team")
4. Add repositories and documentation:
   - Link GitHub repositories
   - Add documentation links (GitHub Pages, wikis, external docs)
   - Upload or reference team guides
5. Configure access (public, private, organization-only)
6. Save and share the Space URL with your team

### Using a Copilot Space

1. Open Copilot Chat in VS Code or GitHub
2. Select your Space from the Space picker (top of Chat)
3. Ask questions - Copilot uses the Space knowledge
4. Example:
   ```text
   We're adding a new API endpoint. What patterns does our team use in src/api/?
   ```
5. Copilot searches the Space and returns context-aware answers

### Accessibility & Team Workflows

<details>
<summary>Screen reader users</summary>

- Space configuration is fully keyboard-accessible on github.com
- Use `H` to navigate section headings when setting up a Space
- The Space picker in Chat is a keyboard-navigable dropdown
- Documentation links in the Space are announced as regular links

</details>

<details>
<summary>Low vision users</summary>

- Space configuration has good color contrast on GitHub.com
- Zoom in on the Space picker to see available options
- Documentation within a Space renders according to your GitHub theme

</details>

<details>
<summary>Keyboard-only users</summary>

- Tab through Space creation form fields
- Use arrow keys in the Space picker to switch Spaces
- All configuration actions are keyboard-accessible

</details>

<details>
<summary>Sighted users</summary>

- Space picker shows Space name and owner as a visual list
- Each Space has an icon and description
- Click to switch Spaces or manage settings

</details>

### Workshop Guidance

- Treat Copilot Spaces as an advanced team feature (not for individual learners)
- If your workshop uses an organization Space, mention it as a **reference context** for facilitators
- Point out: "Your facilitator may have created a Copilot Space with workshop documentation. Select it from the Space picker to get team-specific answers."
- Link to Spaces documentation as a post-workshop resource

---

## 5. Custom Instructions - All Levels

GitHub Copilot supports multiple ways to provide custom instructions. They differ by scope, priority, trigger mechanism, and which tools recognize them. This section documents every supported approach.

### 4A. Always-On Instructions - `.github/copilot-instructions.md`

**What it is:** The primary VS Code Copilot instruction file. Content is automatically included in every chat request and inline suggestion context - you never need to invoke it.

**When to use:** Project-wide conventions everyone on the team should follow: coding standards, documentation style, commit message format, tone, accessibility requirements.

**Location:** `.github/copilot-instructions.md` (fixed path; workspace-level only)

**Format:** Plain Markdown - no frontmatter, no special syntax required.

```markdown
# Copilot Instructions for accessibility-agents

## Accessibility Standards
- Include semantic HTML elements in generated markup
- Never use color as the only indicator of meaning
- Ensure all interactive elements are keyboard accessible

## Documentation Style
- Write for screen reader users first
- Use active voice and imperative mood
- Never skip heading levels (H1 → H2 → H3 only)

## Commit Message Format
- Conventional commits: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Reference issues: "Fixes #123"

## Code Quality
- Prefer explicit over implicit
- Write self-documenting code; add comments only where logic is non-obvious
- Error handling must be intentional - no silent catch blocks
```

### Auto-generate with `/init`

1. Open Copilot Chat
2. Type `/init`
3. VS Code analyzes your workspace and generates a tailored `copilot-instructions.md`
4. Review and edit the result before committing

### 4B. Always-On Instructions - `AGENTS.md` (Multi-Tool / Monorepo)

**What it is:** An open standard instruction file recognized by multiple AI tools - GitHub Copilot, Claude Code, Gemini CLI, and others. Use this instead of `copilot-instructions.md` when you want one instruction file that works across all AI coding assistants.

**When to use:** Multi-tool teams, or when you want monorepo-level granularity where different subdirectories have different rules.

**Location:** `AGENTS.md` at the workspace root. For monorepos, also supported nested in subdirectories (closest file to the current directory wins).

```text
repo-root/
  AGENTS.md               ← applies everywhere
  frontend/
    AGENTS.md             ← overrides root for frontend/ and below
  backend/
    AGENTS.md             ← overrides root for backend/ and below
```

**Enable nested files:** In VS Code settings, set `chat.useNestedAgentsMdFiles: true`.

**Enable/disable AGENTS.md:** Set `chat.useAgentsMdFile: true` (default: on).

**Format:** Identical to `copilot-instructions.md` - plain Markdown, no frontmatter.

**Rule:** Choose either `copilot-instructions.md` OR `AGENTS.md` for your project - not both.

### 4C. Always-On Instructions - `CLAUDE.md` (Cross-Tool Compatibility)

**What it is:** Instructions file originally from Claude Code that VS Code Copilot also recognizes. Useful when your team uses both.

**When to use:** Mixed AI tool environments where Claude Code and VS Code Copilot are both used. Uses the same format as the other always-on files.

#### Supported locations

| File | Scope | Committed? |
| ------  | -------  | -----------  |
| `CLAUDE.md` (workspace root) | All requests in workspace | Yes |
| `.claude/CLAUDE.md` | All requests in workspace | Yes |
| `CLAUDE.local.md` (workspace root) | All requests; local only | No - gitignored |
| `~/.claude/CLAUDE.md` | All workspaces; user-level | Personal |

**Enable/disable:** Set `chat.useClaudeMdFile: true` (default: on).

**Claude Rules format** (for `.claude/rules/` and `~/.claude/rules/`):

Use `.instructions.md` files under `.claude/rules/` using `paths:` instead of `applyTo:` for glob matching:

```markdown
description: "Python coding standards"
paths: ["**/*.py"]

Follow PEP 8. Use type hints on all function signatures.
Write docstrings for all public functions and classes.
```

### 4D. Conditional / Scoped Instructions - `.instructions.md`

**What it is:** Instructions that apply only when specific file types or folders are involved in the chat. More targeted than always-on instructions.

**When to use:** Language-specific rules (Python style, TypeScript patterns), framework conventions, folder-specific standards (docs/, tests/, src/api/).

#### Locations

| Scope | Location |
| -------  | ----------  |
| Workspace | `.github/instructions/*.instructions.md` |
| Additional workspace folders | Configure with `chat.instructionsFilesLocations` |
| User / Personal | VS Code profile folder `*.instructions.md` |

#### Frontmatter

```yaml
name: "Display Name"          # Optional - shown in UI and diagnostics; defaults to filename
description: "Use when..."    # Optional - enables on-demand matching; make keyword-rich
applyTo: "**/*.py"            # Optional glob - auto-attach when matching files are in context
```

#### `applyTo` glob patterns

```yaml
applyTo: "**"                            # Always included (careful - applies to everything)
applyTo: "**/*.py"                       # All Python files
applyTo: "**/*.{ts,tsx}"                 # TypeScript and TSX
applyTo: "docs/**"                       # Everything under docs/
applyTo: ["src/**", "lib/**"]            # Multiple patterns - OR logic
applyTo: "**/*.test.{js,ts}"            # Test files only
applyTo: ".github/ISSUE_TEMPLATE/**"    # Issue template files only
```

#### How files are triggered

| Discovery Mode | How It Works |
| ---------------  | -------------  |
| **Automatic** (via `applyTo`) | Instruction loads automatically when a matching file is in the chat context |
| **On-demand** (via `description`) | Agent detects from the description that this instruction is relevant to the task |
| **Manual** | User selects "Add Context → Instructions" in the Chat panel |

#### Example - test file conventions

```markdown
name: "Test File Standards"
description: "Use when writing, generating, or reviewing test files. Covers test structure, naming, and coverage expectations."
applyTo: "**/*.test.{js,ts}"

# Test Standards

- Use `describe`/`it` structure (not `test()` directly)
- Test names must describe behavior: "returns null when input is empty" not "test case 1"
- Each `it` tests exactly one behavior
- Include at least one edge case and one error case per function
- Avoid snapshot tests for logic; use explicit assertions
- Mock external dependencies; do not test third-party libraries
```

## Create an instructions file

- `Ctrl+Shift+P` → "Chat: New Instructions File" → choose scope (Workspace or User)
- Or create the file manually in `.github/instructions/`

### 4E. Organization-Level Instructions (GitHub Enterprise and Teams)

**What it is:** Organization administrators define custom instructions that apply to all repositories in the organization. Every team member automatically gets these instructions added to their Copilot context.

**Priority:** Lowest - workspace and user instructions both override these. However, they are additive - they are appended to, not replacing, other instructions.

#### Requirements

- GitHub Enterprise or Teams plan with Copilot enabled
- Admin configures instructions in organization settings on GitHub.com
- Each user must enable discovery in VS Code:

```json
// User settings.json
{
  "github.copilot.chat.organizationInstructions.enabled": true
}
```

**Use for:** Organization-wide coding standards, security policies, legal disclaimers (open source license obligations), toolchain conventions.

### 4F. Settings-Based Instructions (Deprecated - Use Files Instead)

> **Note:** These settings-based instructions are deprecated and may be removed in a future VS Code release. For new work, use `copilot-instructions.md` or `.instructions.md` files.

VS Code settings can inject instructions for specific task types:

```json
// settings.json (workspace .vscode/settings.json or user settings)
{
  "github.copilot.chat.codeGeneration.instructions": [
    { "text": "Always add JSDoc comments to exported functions." },
    { "file": ".github/instructions/code-style.instructions.md" }
  ],
  "github.copilot.chat.testGeneration.instructions": [
    { "text": "Use describe/it structure. Include edge cases." }
  ],
  "github.copilot.chat.reviewSelection.instructions": [
    { "text": "Check for WCAG 2.2 Level AA compliance in HTML markup." }
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [
    { "text": "Use conventional commits: type(scope): description" }
  ]
}
```

Each setting accepts an array of `{ text: "..." }` (inline) or `{ file: "relative/path.md" }` (from file).

### 4G. Comparison - When to Use Each Approach

| Approach | Scope | Always-on? | Multi-tool? | Best For |
| ----------  | -------  | ------------  | -------------  | ---------  |
| `copilot-instructions.md` | Workspace | Yes | VS Code only | Primary project instructions |
| `AGENTS.md` | Workspace + monorepo | Yes | All AI tools | Multi-tool teams or large monorepos |
| `CLAUDE.md` | Workspace + user | Yes | Copilot + Claude | Claude Code compatibility |
| `.instructions.md` | Workspace or user | Conditional | VS Code only | Scoped rules for file types |
| Organization setting | All repos in org | Yes | GitHub Copilot | Org-wide policy |
| Settings-based | Workspace or user | Per-task | VS Code only | Deprecated - avoid for new work |

### Learning Cards: Custom Instructions

**Screen reader users:**
- The three-level scope hierarchy (Organization, Workspace, User) means instructions can come from multiple places -- use Chat Diagnostics (gear icon in Chat header) to list every loaded instruction file and its source
- `.github/copilot-instructions.md` is always-on and requires no frontmatter -- just write plain Markdown; screen readers read the source file like any other Markdown document
- `.instructions.md` files use YAML frontmatter with `applyTo` globs -- the frontmatter is the first few lines between `---` delimiters; arrow through carefully to verify syntax

**Low-vision users:**
- The Diagnostics panel (Chat gear, then Diagnostics) lists loaded files in a scrollable pane -- increase font size in VS Code settings if the file paths are hard to read
- YAML frontmatter is indentation-sensitive -- enable VS Code's indentation guides (`editor.guides.indentation`) and use a high-contrast theme so the guide lines are visible
- The `/init` command auto-generates `copilot-instructions.md` from your workspace -- review the generated file in your editor at your preferred zoom before committing

**Sighted users:**
- The comparison table above maps each instruction type to its scope, always-on status, and multi-tool compatibility -- scan the "Best For" column to choose the right approach
- Look in `.github/instructions/` for scoped instruction files and `.github/copilot-instructions.md` for always-on instructions -- both are plain Markdown files you can edit directly
- Use the `applyTo` glob pattern in `.instructions.md` frontmatter to limit when instructions activate -- `"**/*.py"` for Python-only rules, `"docs/**"` for documentation-only rules

## 6. Accessible View Workflow

Copilot Chat responses stream in token by token, which can fragment screen reader announcements. **Accessible View** (`Alt+F2`) gives you a complete, static, properly structured version of the response.

### Recommended Workflow - Every Copilot Interaction

```text
1. Open Copilot Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs
2. Type your prompt
3. Press Ctrl+Enter to send
4. Press Alt+F2 to open Accessible View (open immediately - no need to wait)
5. Follow as the response streams in the Accessible View in real-time
6. Read or re-read any part with Arrow keys at your own pace
7. Press Escape to close Accessible View
```

> **VS Code December 2025:** The Accessible View now streams dynamically. You can open it immediately after sending a prompt and follow the response as it arrives - no need to wait for the response to finish before pressing `Alt+F2`.

### Why Accessible View Is Better for Screen Reader Users

| Without Accessible View | With Accessible View (`Alt+F2`) |
| ------------------------  | --------------------------------  |
| Responses announced in fragments as tokens arrive | Full, complete response in one readable pane |
| Live region updates may interrupt or overlap | No streaming, no live region noise |
| Difficult to re-read specific sections | Navigate with `Up/Down Arrow` at your own pace |
| Context can be lost in streaming | Full context preserved from start to finish |
| Code blocks may run together | Code blocks formatted as `<pre>` elements, line-by-line |

### Screen Reader Navigation in Accessible View

#### NVDA / JAWS

- `Up/Down Arrow` - read line by line
- `Ctrl+Home` - jump to start
- `H` - navigate by headings (if response has sections)
- `Escape` - close Accessible View, return to Chat

#### VoiceOver

- `VO+Shift+Down` - interact with the Accessible View content
- `Down Arrow` - read line by line
- `VO+Escape` - stop interacting
- `Escape` - close Accessible View

### Accessible View for Inline Suggestions

When a multi-line ghost text suggestion appears in the editor:

```text
1. Do not accept immediately
2. Press Alt+F2
3. Accessible View shows: "Suggestion: [full text]"
4. Read the complete suggestion at your own pace
5. Press Escape to close
6. Press Tab to accept, or Escape to reject
```

This is especially important for multi-line suggestions where ghost text is hard to review incrementally.

### Accessible View for Code Blocks

- Code blocks appear inside `<pre>` elements in Accessible View
- Screen readers announce "code block" or "pre-formatted text" at the start
- Each line is on its own line (not run together)
- Indentation is preserved

### Learning Cards: Accessible View Workflow

<details>
<summary>Screen reader users</summary>

- Press `Alt+F2` immediately after sending a prompt -- Accessible View now streams dynamically so you can follow along in real time
- Navigate Chat responses with `Up/Down Arrow`; headings, code blocks, and lists are structurally intact in the view
- For inline suggestions, press `Alt+F2` to read the full ghost text, then `Ctrl+/` to insert it directly from the Accessible View

</details>

<details>
<summary>Low vision users</summary>

- Accessible View renders Chat responses as a static, scrollable pane -- easier to read at high zoom than the streaming Chat panel
- Code blocks in Accessible View preserve indentation and syntax -- pair with a high-contrast theme for maximum readability
- `Ctrl+Home` jumps to the start of the response; `Ctrl+End` to the end -- useful for long multi-section outputs

</details>

<details>
<summary>Sighted users</summary>

- Even with full vision, Accessible View (`Alt+F2`) is useful for reviewing long Copilot responses without streaming distraction
- Code blocks are rendered as `<pre>` elements with line breaks preserved -- easy to scan and compare against your editor
- Press `Escape` to close Accessible View and return focus to the Chat input for your next prompt

</details>

## 7. Configuration Scope Reference

Every Copilot customization file lives at one of three scopes. VS Code **combines all** matching files from all scopes - it is additive, not winner-takes-all.

### Workspace (Repository) - Team-Shared

Files committed to your repository. Everyone who clones the repo gets them.

| File Type | Location |
| -----------  | ----------  |
| Always-on instructions | `.github/copilot-instructions.md` |
| Always-on (multi-tool) | `AGENTS.md` (root), `<folder>/AGENTS.md` (nested) |
| Always-on (Claude compat) | `CLAUDE.md`, `.claude/CLAUDE.md` |
| Local only (not committed) | `CLAUDE.local.md`, `.claude/settings.local.json` |
| Scoped instructions | `.github/instructions/*.instructions.md` |
| Claude rules (scoped) | `.claude/rules/*.instructions.md` |
| Custom agents | `.github/agents/*.agent.md` |
| Prompts / slash commands | `.github/prompts/*.prompt.md` |
| Agent skills | `.github/skills/<name>/SKILL.md` |
| Hooks (team-shared) | `.github/hooks/*.json` |
| Claude hooks/settings | `.claude/settings.json` |
| Personal preferences | `.github/agents/preferences.md` (gitignored) |

### User / Personal - Follows You Across Workspaces

Files in your VS Code profile folder. Syncs with Settings Sync. Available in every workspace you open.

**Path on Windows:** `C:\Users\<you>\AppData\Roaming\Code - Insiders\User\prompts\`
**Path on macOS:** `~/Library/Application Support/Code - Insiders/User/prompts/`

| File Type | Location |
| -----------  | ----------  |
| Instructions | `<profile>/prompts/*.instructions.md` |
| Agents | `<profile>/prompts/*.agent.md` |
| Prompts | `<profile>/prompts/*.prompt.md` |
| Claude instructions | `~/.claude/CLAUDE.md` |
| Claude rules | `~/.claude/rules/*.instructions.md` |
| Claude settings | `~/.claude/settings.json` |
| Agent skills | `~/.copilot/skills/<name>/`, `~/.agents/skills/<name>/`, `~/.claude/skills/<name>/` |

### Organization - GitHub-Configured (Enterprise/Teams)

Configured by administrators in GitHub organization settings. Automatically applied to all organization members.

- Enable discovery: `github.copilot.chat.organizationInstructions.enabled: true`
- Lowest priority - workspace and user instructions override when there is a conflict

## 8. Instruction Priority and Conflicts

When multiple instruction sources give conflicting guidance, VS Code uses this priority order:

```text
1. Personal / User-level    - HIGHEST - overrides all others
2. Workspace / Repository   - middle priority
3. Organization-level       - LOWEST - overridden by workspace and user
```

**Important:** This priority applies to conflicts. All non-conflicting instructions from all scopes are combined and sent together. More instructions is not a problem - Copilot handles them additively.

### How Instructions Are Combined

Say you have:

- Organization: "Use British English spellings"
- Workspace: "Use TypeScript strict mode"
- User: "Use British English spellings - but use Z spellings (organize, not organise) for technical terms"

Result: Copilot follows TypeScript strict mode (from workspace), British English (from org), AND the Z-spelling override (from user, which overrides the org instruction on that specific point).

### Priority Within the Same Scope

Within a single scope (e.g., workspace), all matching instructions files are combined with no inherent priority. If two workspace-level `.instructions.md` files contradict each other, the behavior is undefined - avoid conflicting workspace instructions.

## 9. All File Types Quick Reference

| Purpose | File Name Pattern | Location | How It Activates |
| ---------  | ------------------  | ----------  | -----------------  |
| Always-on instructions | `copilot-instructions.md` | `.github/` | Automatic - every request |
| Always-on (multi-tool) | `AGENTS.md` | Repo root or subfolders | Automatic - every request |
| Always-on (Claude compat) | `CLAUDE.md` | Repo root, `.claude/`, `~/.claude/` | Automatic - every request |
| Scoped instructions | `*.instructions.md` | `.github/instructions/`, profile folder | Auto (via `applyTo`) or on-demand |
| Claude scoped rules | `*.instructions.md` | `.claude/rules/`, `~/.claude/rules/` | Auto (via `paths:`) or on-demand |
| Custom agents | `*.agent.md` | `.github/agents/`, profile folder | `@agent-name` in Chat |
| Prompt / slash command | `*.prompt.md` | `.github/prompts/`, profile folder | `/command-name` in Chat |
| Agent skill | `SKILL.md` in named folder | `.github/skills/<name>/`, profile folder | `/skill-name` or auto on-demand |
| Lifecycle hook | `*.json` | `.github/hooks/`, `.claude/settings*.json` | Automatic at lifecycle events |
| Personal preferences | `preferences.md` | `.github/agents/` (gitignored) | Read by agents when mentioned |

### Create any new customization file

`Ctrl+Shift+P` → "Chat: New Instructions File" (or "New Prompt File", "New Agent File")

## 10. VS Code Settings Reference

All Copilot customization-related settings. Set in VS Code Settings (`Ctrl+,`) or `settings.json`.

### Core Instruction Settings

| Setting | Default | Description |
| ---------  | ---------  | -------------  |
| `chat.instructionsFilesLocations` | - | Array of additional folder paths to search for `*.instructions.md` files |
| `chat.useAgentsMdFile` | `true` | Enable/disable `AGENTS.md` recognition |
| `chat.useClaudeMdFile` | `true` | Enable/disable `CLAUDE.md`/`CLAUDE.local.md` recognition |
| `chat.useNestedAgentsMdFiles` | `false` | Enable subfolder `AGENTS.md` hierarchy for monorepos |
| `chat.includeApplyingInstructions` | `true` | Apply instructions files whose `applyTo` pattern matches current files |
| `chat.includeReferencedInstructions` | `true` | Apply instruction files referenced via Markdown links in chat |
| `chat.restoreLastPanelSession` | `true` | Restore the previous chat session when VS Code starts; set to `false` to always start with an empty Chat |
| `chat.useAgentSkills` | `false` | Enable Agent Skills (experimental) - allows `.github/skills/<name>/SKILL.md` bundles to be discovered and invoked |

### Organization Instructions

| Setting | Default | Description |
| ---------  | ---------  | -------------  |
| `github.copilot.chat.organizationInstructions.enabled` | `false` | Enable discovery of organization-level custom instructions |

### Deprecated Task-Specific Instructions

> Prefer file-based instructions over these settings for new work.

| Setting | What It Augments |
| ---------  | -----------------  |
| `github.copilot.chat.codeGeneration.instructions` | All code generation |
| `github.copilot.chat.testGeneration.instructions` | Test file generation |
| `github.copilot.chat.reviewSelection.instructions` | Code review via Chat |
| `github.copilot.chat.commitMessageGeneration.instructions` | Git commit messages |

Each accepts an array with items: `{ "text": "..." }` (inline) or `{ "file": "relative/path" }` (from file).

### Settings Sync

To sync your personal prompts, instructions, and agents across devices:

1. `Ctrl+Shift+P` → "Settings Sync: Turn On"
2. `Ctrl+Shift+P` → "Settings Sync: Configure"
3. Check **"Prompts and Instructions"**

Your personal `*.instructions.md`, `*.agent.md`, and `*.prompt.md` files will sync to all signed-in VS Code instances.

## 11. Diagnostics and Troubleshooting

### View All Loaded Customizations

To see which instruction files, agents, prompts, and skills are currently loaded - and check for errors:

1. **Configure Chat Gear:** Click the gear () icon in the Copilot Chat header → "Diagnostics"
2. **Right-click method:** Right-click in the Chat view → "Diagnostics"

The Diagnostics panel shows:

- All agents found and whether they loaded successfully
- All prompt/instruction files and their source (workspace vs user vs organization)
- All skills and their discovery status
- Any parse errors or invalid frontmatter

### Common Issues

#### `copilot-instructions.md` not being followed

1. Confirm the file is at exactly `.github/copilot-instructions.md` (relative to workspace root)
2. Check the file is plain Markdown with no frontmatter syntax errors
3. Open Diagnostics to confirm it appears in the loaded files list
4. Some instructions work better with specific phrasing; use imperative mood ("Always use...")

#### `.instructions.md` file not loading automatically

1. Verify `chat.includeApplyingInstructions` is not set to `false`
2. Check the `applyTo` glob - test with `"**"` temporarily to confirm the file loads at all
3. Confirm the file is in `.github/instructions/` or a folder listed in `chat.instructionsFilesLocations`
4. File extension must be `.instructions.md` exactly - not `.md`, not `.instruction.md`

#### Custom agent (`@agent-name`) not appearing

1. File must be named `<agent-name>.agent.md` and placed in `.github/agents/`
2. Check YAML frontmatter for syntax errors - use a YAML validator
3. Confirm `user-invocable` is not set to `false` (which hides it from the picker)
4. Run `Ctrl+Shift+P` → "Reload Window" after any changes to agent files

#### Slash command (`/command`) not appearing

1. File must be at `.github/prompts/<command-name>.prompt.md`
2. Extension must be `.prompt.md` exactly
3. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"

#### Instructions from different files conflicting

1. Open Diagnostics to see all loaded instruction files
2. Remove or edit conflicting instructions - they are not automatically de-duplicated
3. User-level instructions override workspace instructions for the same topic

#### `chat.instructionsFilesLocations` not working

- Path must be a folder path, not a file path
- Use forward slashes or escaped backslashes
- Relative paths are relative to the workspace root

## Quick Reference Card

### Opening Copilot

| What | Windows / Linux | macOS |
| ------  | ----------------  | -------  |
| Chat panel | `Ctrl+Alt+I` | Use **Chat: Open Chat** from the Command Palette if your keymap differs |
| Inline chat (in file) | `Ctrl+I` | `Cmd+I` |
| Quick Chat (floating) | `Ctrl+Shift+Alt+I` | `Cmd+Shift+Ctrl+I` |

### Reading Copilot Responses

| What | How |
| ------  | -----  |
| Complete response (streams live in Accessible View) | `Alt+F2` - open anytime, including while response is still generating |
| Close Accessible View | `Escape` |
| Read current inline suggestion | `Alt+F2` while ghost text is showing |

### Accepting/Rejecting Suggestions

| What | Windows / Linux | macOS |
| ------  | ----------------  | -------  |
| Accept | `Tab` | `Tab` |
| Reject | `Escape` | `Escape` |
| Accept word by word (recommended) | `Ctrl+Right Arrow` | `Cmd+Right Arrow` |
| Next suggestion | `Alt+]` | `Option+]` |
| Previous suggestion | `Alt+[` | `Option+[` |
| Open full suggestion list | `Ctrl+Enter` | `Cmd+Enter` |
| Open suggestion in Accessible View | `Alt+F2` | `Option+F2` |
| Insert from Accessible View at cursor | `Ctrl+/` | `Cmd+/` |

### Instructions Management

| What | How |
| ------  | -----  |
| Auto-generate instructions from workspace | Type `/init` in Chat |
| New instructions file | `Ctrl+Shift+P` → "Chat: New Instructions File" |
| New prompt/slash command file | `Ctrl+Shift+P` → "Chat: New Prompt File" |
| Configure instructions | `Ctrl+Shift+P` → "Chat: Configure Instructions" |
| View all loaded files and errors | Chat gear → Diagnostics |

## 12. Screen Reader Workflow - Official Guide

> Source: [accessibility.github.com/documentation/guide/github-copilot-vsc/](https://accessibility.github.com/documentation/guide/github-copilot-vsc/)
>
> **Contributors:** @mlama007, zersiax  |  **Community:** [GitHub Accessibility Discussions](https://github.com/orgs/community/discussions/categories/accessibility)

### Prerequisites

- Current VS Code with built-in AI features enabled, or an older managed VS Code build where Copilot has been enabled by your administrator
- A GitHub account with Copilot access (Free tier or paid)
- A screen reader (NVDA recommended for this guide)

### Step 1: Enable VS Code Screen Reader Mode

1. Press `Shift+Alt+F1` to toggle Screen Reader Accessibility Mode
2. Or use Command Palette: `Ctrl+Shift+P` → "Toggle Screen Reader Accessibility Mode"
3. VS Code announces: "Screen Reader Accessibility Mode enabled"

When Screen Reader Mode is on, VS Code changes how it announces suggestions (full text instead of streaming), adjusts live regions, and enables accessible navigation patterns throughout the editor.

### Step 2: Configure Accessibility Signals (Optional but Recommended)

1. Open Settings: `Ctrl+,`
2. Search "accessibility signals"
3. Enable the Copilot-specific signals:

| Signal Setting | What It Signals |
| -------------------  | -----------------  |
| `accessibility.signals.lineHasInlineSuggestion` | A suggestion is available on the current line |
| `accessibility.signals.chatRequestSent` | Your prompt has been sent |
| `accessibility.signals.chatResponsePending` | Copilot is generating a response |
| `accessibility.signals.chatResponseReceived` | Response is complete and ready to read |

Recommended JSON config for Copilot accessibility signals:

```json
{
  "accessibility.signals.lineHasInlineSuggestion": "on",
  "accessibility.signals.chatRequestSent": "on",
  "accessibility.signals.chatResponsePending": "auto",
  "accessibility.signals.chatResponseReceived": "on"
}
```

### Step 3: Official Shortcut Table (from accessibility.github.com)

This is the complete table of Copilot screen reader shortcuts as published by the GitHub Accessibility team:

| Action | Shortcut |
| --------  | ----------  |
| Accept Inline Suggestion | `Tab` |
| Dismiss Inline Suggestion | `Escape` |
| Show next suggestion in Suggestions Panel | `Alt+]` |
| Show previous suggestion in Suggestions Panel | `Alt+[` |
| Open GitHub Copilot Suggestions (loads ~10 suggestions side by side) | `Ctrl+Enter` |
| Opens suggestion in Accessible View panel | `Alt+F2` |
| Inserts suggestion from Accessible View at cursor | `Ctrl+/` |
| Opens Inline Chat (in-file, at cursor) | `Ctrl+I` |
| Opens dedicated Chat view | `Ctrl+Alt+I` or **Chat: Open Chat** from the Command Palette |

### Step 4: Recommended Workflow for Inline Suggestions

#### The screen reader-optimized workflow for every inline suggestion

```text
1. Type your code or documentation
2. Copilot generates a suggestion (audio cue sounds if enabled)
3. DO NOT press Tab immediately
4. Press Alt+F2 - Accessible View opens with the full suggestion text
5. Read the suggestion at your own pace with Arrow keys
6. Decision:
   a. Insert it: Press Ctrl+/ - suggestion is inserted at cursor position
   b. Skip it: Press Escape to close Accessible View, then Escape again to dismiss
   c. See alternatives: Close Accessible View, press Alt+] for next suggestion
```

This workflow avoids the streaming announcement problem (where suggestions are read out in fragments as tokens arrive) and gives you full, uninterrupted access to the suggestion text before committing.

### Step 5: Recommended Workflow for Chat Responses

```text
1. Open Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs
2. Type your prompt, press Ctrl+Enter to send
3. Press Alt+F2 - Accessible View opens immediately; the response streams live into it
4. Navigate with Arrow keys - no streaming noise, follow along in real-time
5. Headings, code blocks, and lists are fully structured
6. Press Escape to close - focus returns to Chat input
```

### Reading the Suggestions Panel (Ctrl+Enter)

Pressing `Ctrl+Enter` opens a **Suggestions Panel** - a separate editor tab that shows up to 10 alternative suggestions simultaneously. This is useful when the default suggestion isn't quite right and you want to compare options.

```text
1. Ctrl+Enter - opens "GitHub Copilot" editor tab
2. Screen Reader Mode is active: navigate with Browse Mode
3. H key to navigate headings (each suggestion may be under a heading)
4. Press Alt+F2 on a focused suggestion to read it in Accessible View
5. Tab to "Accept" button for a suggestion you want to use
6. Close the tab when done (Ctrl+W)
```

### Resources

| Resource | URL |
| ----------  | -----  |
| VS Code Copilot Cheat Sheet | [code.visualstudio.com/docs/copilot/reference/copilot-vscode-features](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features) |
| VS Code Accessibility Features | [code.visualstudio.com/docs/editor/accessibility](https://code.visualstudio.com/docs/editor/accessibility) |
| GitHub Accessibility Discussions | [github.com/orgs/community/discussions/categories/accessibility](https://github.com/orgs/community/discussions/categories/accessibility) |
| Official screen reader guide | [accessibility.github.com/documentation/guide/github-copilot-vsc/](https://accessibility.github.com/documentation/guide/github-copilot-vsc/) |
| Optimizing Copilot with custom instructions (accessibility) | [accessibility.github.com/documentation/guide/copilot-instructions/](https://accessibility.github.com/documentation/guide/copilot-instructions/) |
| Getting started with custom agents for accessibility | [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) |

### Learning Cards: Screen Reader Copilot Workflow

<details>
<summary>Screen reader users</summary>

- The golden rule: never accept a suggestion with `Tab` before reviewing it -- press `Alt+F2` first, read it, then `Ctrl+/` to insert
- Enable the four Copilot audio signals (inline suggestion, request sent, response pending, response received) for non-verbal status awareness
- `Ctrl+Enter` opens a Suggestions Panel with up to 10 alternatives -- navigate with `H` for headings, then `Tab` to the Accept button

</details>

<details>
<summary>Low vision users</summary>

- Inline ghost text is typically rendered in a muted color -- if hard to see, rely on the `lineHasInlineSuggestion` audio signal instead
- The Suggestions Panel (`Ctrl+Enter`) shows alternatives in a full editor tab at your current font size and theme
- Chat responses are easier to read in Accessible View than in the streaming panel, especially at high zoom

</details>

<details>
<summary>Sighted users</summary>

- Ghost text appears in gray after your cursor -- press `Tab` to accept, `Escape` to dismiss, or `Alt+]` / `Alt+[` for alternatives
- The Chat panel shows response progress with a typing indicator; the Accessible View shows the same content without animation
- Use the Resources table above to bookmark the official accessibility guides for Copilot configuration and agent setup

</details>

## 13. awesome-copilot - Plugin Ecosystem

**awesome-copilot** is a GitHub repository (`github/awesome-copilot`) - not a VS Code Marketplace extension. It is GitHub's curated ecosystem of Copilot plugins, prompts, instructions, agents, skills, and hooks that can be shared and discovered by anyone.

> **Stars:** 21.6k  |  **Forks:** 2.5k  |  **Contributors:** 247+  |  **Repository:** [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot)

### Repository Structure

| Directory | Contents |
| -----------  | ----------  |
| `prompts/` | Community-contributed `.prompt.md` slash command files |
| `instructions/` | Community-contributed `.instructions.md` guidance files |
| `agents/` | Community-contributed `.agent.md` agent definitions |
| `plugins/` | Community-contributed plugin packages (MCP and CLI) |
| `skills/` | Community-contributed `SKILL.md` bundles |
| `hooks/` | Community-contributed lifecycle hook `.json` configs |
| `cookbook/` | Worked examples and usage patterns |

**LLM discovery:** `https://github.github.io/awesome-copilot/llms.txt` - a machine-readable index of all available resources.

### The `/plugin` Command - Browse and Install from Chat

The easiest way to explore awesome-copilot from VS Code:

1. Open Copilot Chat (`Ctrl+Alt+I`) or run **Chat: Open Chat** from the Command Palette
2. Type `/plugin` and press `Enter`
3. Copilot Chat opens an interactive plugin marketplace browser
4. Browse plugins by category, read descriptions, and install with a single command

#### Key plugins available via `/plugin`

| Plugin | What It Does |
| --------  | -------------  |
| **Awesome Copilot** | The meta-plugin - browse and install any resource from the full ecosystem |
| **Copilot SDK** | Official SDK for C#, Go, Node.js, and Python development patterns |
| **Partners** | 20+ partner agents from Azure, JetBrains, MongoDB, and others |

### CLI Plugin Installation

From any terminal with GitHub CLI (`gh`) installed:

```bash
# Browse the marketplace
gh copilot plugin marketplace list

# Add the awesome-copilot collection
gh copilot plugin marketplace add github/awesome-copilot

# Install a specific plugin
gh copilot plugin install @awesome-copilot/accessibility-toolkit

# List what you have installed
gh copilot plugin list
```

### MCP Server Integration (Docker required)

awesome-copilot also ships as an **MCP (Model Context Protocol) Server** - a Docker-based tool server that extends Copilot with additional capabilities beyond file-based customizations.

Install in VS Code by clicking the button at `https://aka.ms/awesome-copilot/mcp/vscode`, or add manually to `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "awesome-copilot": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "ghcr.io/github/awesome-copilot-mcp:latest"
        ]
      }
    }
  }
}
```

**Also available for:** VS Code Insiders and Visual Studio.

> **Screen reader note:** The install buttons on the awesome-copilot page are standard links. Navigate with `K` in Browse Mode to find them. Each is labeled with the target IDE.

### awesome-copilot vs. Accessibility Agents

| Feature | Accessibility Agents (`.github/agents/`) | awesome-copilot |
| ---------  | --------------------------------  | ----------------  |
| **Scope** | Your repo and fork | Community-wide ecosystem |
| **Distribution** | Clone the repo; agents travel with it | Plugin marketplace - install on demand |
| **Customization** | Edit `.agent.md` files directly | Use as-is or fork and modify |
| **Storage** | Your version-controlled repository | GitHub-hosted public repository |
| **Best for** | Project-specific workflows | Reusable templates and cross-project tools |

## 14. GitHub Agentic Workflows and Third-Party Agents

> **Status: Technical Preview** - GitHub Agentic Workflows entered technical preview on **February 13, 2026**. As of May 2026 the feature remains in active development and preview; changes to the API and workflow format are ongoing. Use with careful human supervision. See the [official documentation](https://github.github.com/gh-aw/) and [source repository](https://github.com/github/gh-aw) (open source, MIT).
>
> **Workshop note:** Facilitators will confirm current availability and any breaking changes at the workshop.

**GitHub Agentic Workflows** run AI coding agents as part of GitHub Actions pipelines - no VS Code, no local setup required. The key differentiator: you write automation goals in **plain Markdown**, and the `gh aw` CLI compiles them into standard GitHub Actions workflows. The AI agent interprets your natural language description and executes the task.

### What This Enables

| Workflow Category | Trigger | Example |
| ------------------  | ---------  | ---------  |
| Issue & PR Management | `issues: opened` | Auto-triage, label, and assign new issues |
| Continuous Documentation | `push` to main | Keep README and docs in sync with code changes |
| Metrics & Analytics | `schedule: daily` | Daily status report posted as a new issue |
| Quality & Testing | `pull_request` | CI failure analysis posted as PR comment |
| Continuous Improvement | `schedule: weekly` | Automated refactoring and code simplification PRs |
| Multi-Repository | `workflow_dispatch` | Sync features and track changes across repos |

Browse 50+ community-built workflows at [Peli's Agent Factory](https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/).

### How It Works

The `gh aw` CLI (a `gh` extension) compiles `.md` workflow files into `.lock.yml` GitHub Actions workflows:

```text
.github/workflows/daily-report.md  ← you write this (Markdown + frontmatter)
        ↓  gh aw compile
.github/workflows/daily-report.lock.yml  ← generated, runs as standard GitHub Actions
```

### GitHub.com Cloud Agents and Third-Party Agent Assignment

On GitHub.com, you can assign tasks to different AI agents, including third-party agents from other providers:

| Agent | Provider | How to Use |
|-------|----------|----------|
| **Copilot Agent** | GitHub | Default agent; assign to GitHub issues/PRs by @-mentioning `@copilot` |
| **Claude by Anthropic** | Anthropic | Assign to issues/PRs; must be enabled by organization |
| **OpenAI Codex** | OpenAI | Assign to issues/PRs; BYOK (bring-your-own-key) required |

### Workflow: Assigning Tasks to Cloud Agents on GitHub

1. Open an issue or pull request on GitHub.com
2. Click **Assignees** in the right panel
3. Search for the agent name (`@copilot`, `@claude`, etc.)
4. Select the agent
5. Add a comment describing the task:
   ```
   @copilot please implement this feature and open a PR.
   ```
6. The agent reads the issue, makes a plan, creates a branch, implements, and opens a PR
7. Review the agent's PR changes before merging

### Example Scenarios

**Scenario 1: Copilot cloud agent for bug fix**
- Assign a GitHub issue to `@copilot`
- Add details about the bug
- Copilot creates a branch, reproduces the bug, fixes it, and opens a PR

**Scenario 2: Claude agent for documentation**
- Assign `@claude` to improve project docs
- Claude writes expanded documentation, tests examples, opens a PR

**Scenario 3: Codex agent for refactoring**
- If your organization has Codex access, assign `@codex` to refactor old code
- Codex modernizes the code and opens a PR

### Accessibility: Reviewing Agent PRs

<details>
<summary>Screen reader users</summary>

- Agent PRs appear as regular PRs on GitHub.com
- Press `H` to navigate PR headings (Files Changed, Conversation, Checks)
- Use `T` to open the file tree and review changes by file
- Read through the diff at your own pace; no streaming text
- Press `G I` to jump to the Issue discussion

</details>

<details>
<summary>Low vision users</summary>

- PR diffs are rendered as text; zoom in for readability
- Use high-contrast theme to distinguish additions (green) from deletions (red)
- Focus on the Files Changed tab for easier scanning

</details>

<details>
<summary>Keyboard-only users</summary>

- Tab through PR controls: Merge button, request changes, approve
- Use arrow keys to navigate Comments section
- `C` to open comment form; `Ctrl+Enter` to post

</details>

<details>
<summary>Sighted users</summary>

- Agent PRs show file changes with diff highlighting (green/red)
- Comments from the agent are marked with the agent's profile
- Use the Merge button once review is complete

</details>

### Workshop Guidance

- Cloud agents are powerful for real-world workflows, but the workshop focuses on **understanding** the underlying concepts first
- Teach learners to review agent PRs carefully - they're still AI-generated and need human judgment
- Show an example: "Here's a PR created by Copilot Cloud. Notice the changes and think about whether they match the original requirements."
- Emphasize: Agents are accelerators, not replacements for code review

The AI agent (GitHub Copilot, Claude, or OpenAI Codex) reads your repository context and the natural language instructions, then performs the task using the GitHub MCP Server and other available tools.

### Workflow Format - Markdown with Frontmatter

Unlike standard GitHub Actions (YAML), agentic workflows are Markdown files:

```markdown
on:
  schedule: daily
permissions:
  contents: read
  issues: read
  pull-requests: read
safe-outputs:
  create-issue:
    title-prefix: "[team-status] "
    labels: [report, daily-status]
    close-older-issues: true

## Daily Issues Report

Create an upbeat daily status report for the team as a GitHub issue.

## What to include

- Recent repository activity (issues, PRs, discussions, releases, code changes)
- Progress tracking, goal reminders and highlights
- Project status and recommendations
- Actionable next steps for maintainers
```

The body is natural language - describe what you want the AI agent to do. The frontmatter controls triggers, permissions, and what write operations are allowed.

### Key Frontmatter Properties

| Property | Purpose |
| ----------  | ---------  |
| `on: schedule: daily` | Runs once per day (also: `weekly`, `cron` expressions, `issues: opened`, `pull_request`) |
| `on: issue_comment: created` | Trigger from a comment command in an issue or PR |
| `on: workflow_dispatch` | Manual run via the Actions tab "Run workflow" button |
| `permissions:` | Read-only scopes by default - only request what you need |
| `safe-outputs:` | Pre-approved write operations (e.g., `create-issue`, `pr-comment`) - the security guardrail |

### Security Model - "Safe Outputs"

Workflows run **read-only by default** with sandboxed execution, network isolation, and SHA-pinned dependencies. Write operations require explicit declaration in `safe-outputs` - a set of pre-approved, sanitized GitHub operations. There is no arbitrary filesystem or API write access.

This means: the AI agent cannot push code, delete branches, or modify arbitrary files unless you explicitly declare those `safe-outputs` and they are on the approved list.

### Supported AI Engines

| Engine | Notes |
| --------  | -------  |
| GitHub Copilot CLI | Default engine |
| Claude (Anthropic) | Alternative engine |
| OpenAI Codex | Alternative engine |
| Custom agents | Bring your own coding agent |

### Getting Started with `gh aw`

```bash
# Install the CLI extension
gh extension install github/gh-aw

# Create a new workflow interactively (from github.com or VS Code also works)
gh aw create

# Compile your Markdown workflow to a GitHub Actions .lock.yml
gh aw compile .github/workflows/daily-report.md

# Commit both the .md and .lock.yml files - GitHub Actions runs the .lock.yml
```

### Monitoring Agentic Workflow Runs

1. Navigate to the **Actions** tab of your repository (`D` → Repository navigation → `K` to Actions)
2. Find the workflow by name (h3 headings, navigate with `3`)
3. Press `Enter` to open a specific run
4. Expand job steps to read the agent output log and any safe-outputs created

### Resources

| Resource | URL |
| ----------  | -----  |
| Official documentation | `github.github.com/gh-aw/` |
| Source repository (open source) | `github.com/github/gh-aw` |
| Peli's Agent Factory (50+ examples) | `github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/` |
| Community feedback & discussion | `github.com/orgs/community/discussions/186451` |
| Changelog announcement (Feb 13, 2026) | `github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview` |

> **Relationship to Accessibility Agents:** Accessibility Agents agents (`.agent.md` files) are designed for interactive use inside VS Code. GitHub Agentic Workflows are a separate, cloud-native system that uses its own Markdown workflow format and the `gh aw` CLI - they are complementary tools, not the same mechanism. See [Appendix L](appendix-l-agents-reference.md) for the full Accessibility Agents reference.

### Learning Cards: GitHub Agentic Workflows

**Screen reader users:**
- Agentic workflow runs appear in the Actions tab of your repository -- navigate to Actions with `T` (tab bar), then use heading navigation (`3`) to jump between workflow run entries
- Workflow files are Markdown (`.md`) not YAML -- the frontmatter at the top controls triggers and permissions; the body is natural language instructions the AI agent reads
- The `safe-outputs` frontmatter property lists every write operation the agent is allowed to perform -- review this section carefully since it is the security boundary

**Low-vision users:**
- The Actions tab lists workflow runs with status icons (green check, red X, yellow circle) -- at high zoom, also look for the text status label next to each run name
- Workflow `.md` files use the same Markdown rendering as any other file in the repo -- edit them in VS Code with your preferred font size and theme
- The `gh aw compile` command generates a `.lock.yml` file alongside your `.md` file -- both appear in the file explorer; the `.lock.yml` is auto-generated and should not be edited manually

**Sighted users:**
- Browse 50+ community workflows at Peli's Agent Factory to find templates matching your use case -- each example includes the full `.md` source you can copy
- The workflow format table at the top of this section maps trigger types to use cases -- scan the "Example" column for the pattern closest to your need
- Unlike VS Code agent files, agentic workflows run in the cloud via GitHub Actions -- no local VS Code session is required; results appear as issues, PR comments, or other GitHub artifacts

*Chapter: [GitHub Copilot](16-github-copilot.md)*
*Related: [Appendix L: Accessibility Agents Reference](appendix-l-agents-reference.md) | [Appendix G: VS Code Accessibility Reference](appendix-g-vscode-reference.md) | [Appendix K: AI Models Reference](appendix-k-copilot-reference.md)*

---

## Copilot Models

>
> **Listen to Episode 41:** [Copilot Billing and Models](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

<!-- TOC -->
- [Overview](#1-overview)
- [How to Choose a Model](#2-how-to-choose-a-model)
- [Current Model and Billing Sources](#3-current-model-and-billing-sources)
- [Model Availability by Plan](#4-model-availability-by-plan)
- [GitHub AI Credits and Usage](#5-github-ai-credits-and-usage)
- [Switching Models in VS Code](#6-switching-models-in-vscode)
- [Auto Model Selection](#7-auto-model-selection)
- [Models Retiring Soon](#8-models-retiring-soon)
<!-- /TOC -->

## 1. Overview

GitHub Copilot offers access to AI models from multiple providers including OpenAI, Anthropic, Google, and others. The model you choose affects response quality, speed, and usage cost. Different models excel at different tasks - understanding these trade-offs helps you get better results.

**Models are updated frequently.** This appendix no longer keeps a static model roster because the April-May 2026 changelog includes multiple additions, removals, and deprecations. For the latest additions and retirements, see the [GitHub Copilot changelog](https://github.blog/changelog/2026/?label=copilot) and [GitHub's official supported models documentation](https://docs.github.com/en/copilot/reference/ai-models/supported-models).

> **Workshop note, verified May 12, 2026:** GitHub Copilot is moving to usage-based billing on June 1, 2026. Check [GitHub Copilot settings](https://github.com/settings/copilot), the [GitHub Copilot plans page](https://github.com/features/copilot/plans), and the [usage-based billing documentation](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) before the workshop.

## 2. How to Choose a Model

GitHub Docs organizes models by task. Match your task to the right level of capability instead of memorizing a model name.

### Everyday coding and writing

Use the default or Auto selection for short explanations, Markdown drafting, commit messages, PR descriptions, and small refactors. For this workshop, this is the safest starting point.

### Fast help with simple or repetitive tasks

Use lighter models for quick answers, boilerplate, simple rewrites, and short command explanations. This helps preserve included usage when billing is usage-based.

### Deep reasoning and debugging

Use more capable models for architecture questions, unfamiliar codebases, multi-file reasoning, and difficult debugging. These interactions typically consume more usage because they process more context and generate longer responses.

### Agentic software development

Agent mode, Copilot CLI, Copilot cloud agent, and third-party coding agents can make multiple model calls within one task. Use them for scoped, valuable work rather than casual exploration, especially when working under a limited plan.

### Working with visuals

Some models support image input. Check the model picker and the official supported-models documentation before planning an exercise that depends on screenshots or image analysis.

## 3. Current Model and Billing Sources

The following table lists the official sources to use instead of static model tables in this curriculum.

| Need | Current source |
| --- | --- |
| Supported model list | [GitHub supported Copilot models documentation](https://docs.github.com/en/copilot/reference/ai-models/supported-models) |
| Model additions and retirements | [GitHub Copilot changelog](https://github.blog/changelog/2026/?label=copilot) |
| Current Copilot plans | [GitHub Copilot plans page](https://github.com/features/copilot/plans) |
| Usage-based billing details | [Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) |
| Billing transition announcement | [GitHub Copilot usage-based billing announcement](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) |

### Source-backed facts verified May 12, 2026

- GitHub Copilot moves to usage-based billing on June 1, 2026.
- Premium request units are being replaced by GitHub AI Credits.
- One GitHub AI Credit equals $0.01 USD in the usage-based billing documentation.
- Copilot Chat, Copilot CLI, Copilot cloud agent, Copilot Spaces, Spark, and third-party coding agents consume AI Credits.
- Code completions and next edit suggestions are not billed in AI Credits for paid plans.
- Copilot code review is expected to consume GitHub Actions minutes in addition to GitHub AI Credits starting June 1, 2026.
- Model availability changes frequently, and multiple models were deprecated or retired in the April-May 2026 changelog.

## 4. Model Availability by Plan

Plan names, included usage, and model access can change by date, account type, organization policy, region, and rollout. Do not copy plan limits from this appendix into learner instructions.

### Workshop-safe plan guidance

- **Copilot Free** can support short, focused workshop prompts, but it has monthly limits.
- **Verified students** may have access to GitHub Copilot Student plan benefits.
- **Organization and enterprise users** may have Copilot access managed by an administrator.
- **Paid plans** include more usage and broader feature access, but the billing unit changes to GitHub AI Credits on June 1, 2026.
- **Annual individual plans** may follow transition rules that differ from monthly plans.

Check [GitHub Copilot settings](https://github.com/settings/copilot) for your account and the [GitHub Copilot plans page](https://github.com/features/copilot/plans) for current public plan details.

## 5. GitHub AI Credits and Usage

Usage-based billing measures Copilot usage with GitHub AI Credits. The cost of an interaction depends on the selected model and the tokens used for input, output, and cached context.

### Tips for managing usage

- Use **Auto** model selection unless the facilitator gives a specific reason to choose a model.
- Keep workshop prompts focused and short.
- Ask one clear question at a time when using Copilot Free or any limited plan.
- Use agentic features for meaningful multi-step tasks, not casual exploration.
- Review model badges, model picker details, and usage dashboards when they are available in your account.
- Prefer code completions and next edit suggestions for simple local edits because paid-plan documentation says those are not billed in AI Credits.

## 6. Switching Models in VS Code

### In the Chat Panel

1. Open the **Chat** panel (`Ctrl+Alt+I`) or run **Chat: Open Chat** from the Command Palette
2. At the bottom of the chat input area, you'll see the current model name as a button, often **Auto** or a specific model name
3. Activate the model picker button - this opens a dropdown list of available models
4. Arrow through the list and press `Enter` to select a model
5. For screen reader users: the chat input will announce the newly selected model after switching

### In an Inline Chat Session

1. Open Inline Chat (`Ctrl+I` / `Cmd+I`)
2. The model picker appears in the inline chat toolbar
3. Same interaction: activate the model button to switch

### Keyboard Note for Screen Readers

In the Chat panel, the model picker button is near the **bottom** of the chat view. If you're having trouble locating it:

- Tab through the bottom toolbar of the chat panel
- Listen for the model name announced - it appears between the "Attach" button and the send button
- Press `Space` or `Enter` to open the picker

## 7. Auto Model Selection

**Auto mode** lets Copilot choose the best model based on the type of request.

### How Auto works

- For simple questions, Copilot routes to a faster, lighter model
- For complex code generation or debugging, Copilot upgrades to a more capable model automatically
- For agent tasks, Copilot selects an appropriate Codex model
- You may be able to see which model was used after each response. VS Code 1.119 and later can show model details and multipliers for some Copilot CLI and agent responses.

### When to override Auto

- You specifically need a model with certain capabilities, such as image input
- You're managing usage and want to control costs
- You've found a particular model gives better results for your specific workflow or domain
- You're doing agentic work and want to explicitly select an agent-optimized Codex model (check current availability in the model picker)

To switch back to Auto from a specific model, re-open the model picker and select **Auto** at the top of the list.

## 8. Models Retiring Soon

GitHub regularly updates the model roster. Older model versions are retired when newer equivalents are available. When a model is retired, Copilot stops sending requests to it and routes to available alternatives.

### Recent retirement signals

The April-May 2026 GitHub Copilot changelog included retirements and deprecations for several model families. Treat any named model in workshop materials as a temporary example, not a guarantee.

To stay current, watch the [GitHub Copilot changelog](https://github.blog/changelog/2026/?label=copilot) - model additions and retirements are announced there.

## 15. Copilot Pricing, Free Plan, and Usage Limits

> **IMPORTANT:** GitHub Copilot moved to **usage-based billing** on **June 1, 2026**. Premium request units were replaced by GitHub AI Credits. Verify current pricing and plan limits at [GitHub Copilot Plans](https://github.com/features/copilot/plans) before the workshop.

### Copilot Plans (May 2026 Snapshot)

| Plan | Monthly Cost | Included Usage | Features | Best For |
|------|--------------|----------------|----------|----------|
| **Free** | $0 | 50 completions, 2K chat tokens/month | Basic Copilot Chat, inline suggestions, limited chat | Getting started, light workshops |
| **Pro** | $10 / month | Unlimited completions, higher chat limits | Full Chat, Copilot CLI, custom instructions | Individual developers |
| **Pro+** | $39 / month | Unlimited all features | All Pro + agents, Copilot Cloud, Codex models | Complex workflows, agentic development |
| **Team** | $35 / seat / month (min 2 seats) | Org-managed limits | Team governance, Copilot Spaces, audit logging | Teams and organizations |
| **Enterprise** | Custom | Custom | Full customization, SSO, compliance | Large organizations |

**Source:** [GitHub Copilot Plans](https://github.com/features/copilot/plans) (updated May 2026)

### Free Plan Details and Workshop Considerations

**Copilot Free** is a zero-cost plan with limited monthly usage. It's suitable for learning, but facilitators should be aware of the constraints:

#### Free Plan Limits (May 2026)

| Feature | Limit |
|---------|-------|
| Completions (ghost text suggestions) | 50 per month |
| Chat messages (Copilot Chat) | 2,000 context tokens total per month |
| Inline Chat (`Ctrl+I`) | Counts against chat limit |
| Agent requests | Not included - Free plan cannot run agents |
| Custom instructions | Available, but limited context |
| Models | Auto selection only; cannot manually choose models |

#### Free Plan Restrictions

- **No agent support:** If your workshop uses agents (e.g., `@web-accessibility-wizard`), Free plan users cannot participate in those exercises
- **Chat limits can be reached quickly:** 2K tokens is roughly 3-5 multi-turn chat conversations depending on context size
- **No Copilot CLI:** Free plan users cannot use the Copilot CLI for command-line assistance
- **No Copilot Cloud:** Cannot run cloud-based agentic workflows
- **Resets monthly:** Limits reset at the start of each month

#### Workshop Guidance for Free Plan Users

If your workshop has Free plan participants:

1. **Pre-workshop communication:** Explain the limits and suggest they upgrade temporarily for paid plans' benefits
2. **Task design:** Use short, focused prompts that consume fewer tokens
3. **Alternative: Education benefits:** Verified students may be eligible for [GitHub Education](https://education.github.com) benefits including free Copilot Pro
4. **Time management:** Encourage learners to plan their chat questions before asking to avoid wasted tokens
5. **Completion workflow:** Teach local inline suggestions first (ghost text), then introduce Chat later to preserve the monthly limit

### Copilot Pro Comparison: When to Recommend an Upgrade

Recommend **Copilot Pro** ($10/month) for workshops if:
- Your exercises involve Copilot Chat extensively
- You want learners to experiment freely without token anxiety
- The workshop lasts multiple days (Free plan limits reset monthly, but daily resets don't exist)
- You use custom instructions or multiple models

Many learners find the $10/month cost is worthwhile to remove friction during intensive learning.

### Usage-Based Billing and GitHub AI Credits (Post June 1, 2026)

On June 1, 2026, GitHub Copilot switched from **Premium Request Units** (PRUs) to **GitHub AI Credits**.

#### Credit Pricing

- **1 GitHub AI Credit = $0.01 USD**
- Costs vary by model and input/output token consumption
- Cached context may receive discounts
- Code completions (ghost text) remain free for paid plans

#### What Consumes AI Credits

| Feature | Consumes Credits |
|---------|------------------|
| Copilot Chat | Yes |
| Inline Chat (`Ctrl+I`) | Yes |
| Copilot CLI | Yes |
| Agent requests (`@copilot`, etc.) | Yes |
| Copilot Cloud (GitHub.com) | Yes |
| Copilot Spaces | Yes |
| Code completions (Pro+) | No |
| Code completions (Free) | No |

#### Managing Usage

Users see their credit consumption in [GitHub Settings - Copilot](https://github.com/settings/copilot) under Usage & Billing.

**Tips for facilitators:**
- Advise learners to monitor their usage if they're on a limited plan
- Set expectations: "A typical multi-turn chat conversation costs 5-50 credits depending on the model"
- Recommend Auto model selection to balance quality and cost
- Mention monthly resets if learners are concerned about billing

### Keyboard & Accessibility Notes for Checking Plans

<details>
<summary>Screen reader users</summary>

- Visit [GitHub Copilot Plans](https://github.com/features/copilot/plans) and use `H` to navigate plan headings
- Plan names are announced as headings
- Feature lists are unordered lists; navigate with `L`
- Use `T` to navigate pricing tables; arrow keys move between cells
- Pricing is typically in the leftmost column of each table

</details>

<details>
<summary>Low vision users</summary>

- Plan pricing page uses clear, high-contrast pricing tables
- Zoom in (Ctrl+=) to increase font size for pricing details
- Use your browser's high-contrast extension if colors are hard to distinguish
- Pricing is color-coded by plan tier; use text labels to verify

</details>

<details>
<summary>Keyboard-only users</summary>

- Tab through plan cards to view each option
- Upgrade buttons are keyboard-activatable (Enter to click)
- Settings pages (Usage & Billing) are fully navigable with Tab and arrow keys
- Use arrow keys to select models in the model picker

</details>

<details>
<summary>Sighted users</summary>

- Plan cards show cost prominently at the top
- Feature lists are bulleted for easy scanning
- Color coding (green for included, gray for not included) distinguishes plan tiers
- Upgrade buttons are clearly visible

</details>

### Related Resources

- [GitHub Copilot Plans](https://github.com/features/copilot/plans)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Usage-based Billing for Individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)
- [GitHub Copilot Changelog](https://github.blog/changelog/2026/?label=copilot)

---

## Related Resources

---

*Next: [Appendix L: Agents Reference](appendix-l-agents-reference.md)*  
*Back: [Appendix J: Codespaces](appendix-j-cloud-editors.md)*  
*Teaching chapter: [Chapter 16: GitHub Copilot](16-github-copilot.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [About auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)
- [Copilot changelog feed](https://github.blog/changelog/label/copilot/)
- [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Copilot Reference Tables:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Keyboard Shortcuts, Chat, Screen Reader Workflow, Plugin Ecosystem, and GitHub Agentic Workflows:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. Keyboard Shortcuts:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Chat Participants:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Chat Slash Commands:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Chat Modes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4A. VS Code 1.120+ Agents Window and Accessibility: Complete Guide:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4B. MCP Servers - Accessibility Scanning Tools:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4C. Smart Actions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4D. Browser Agent (Experimental):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4E. Plan Agent:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4F. Copilot Spaces - Team Knowledge Base:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Custom Instructions - All Levels:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Accessibility Standards:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Documentation Style:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Commit Message Format:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
