# Appendix K: Copilot Reference

> **Reference companion to:** [Chapter 16: GitHub Copilot](16-github-copilot.md)
>
> **Authoritative source:** [GitHub Docs: Copilot](https://docs.github.com/en/copilot)

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
5. [Custom Instructions - All Levels](#5-custom-instructions---all-levels)
6. [Accessible View Workflow](#6-accessible-view-workflow)
7. [Configuration Scope Reference](#7-configuration-scope-reference)
8. [Instruction Priority and Conflicts](#8-instruction-priority-and-conflicts)
9. [All File Types Quick Reference](#9-all-file-types-quick-reference)
10. [VS Code Settings Reference](#10-vs-code-settings-reference)
11. [Diagnostics and Troubleshooting](#11-diagnostics-and-troubleshooting)
12. [Screen Reader Workflow - Official Guide](#12-screen-reader-workflow---official-guide)
13. [awesome-copilot - Plugin Ecosystem](#13-awesome-copilot---plugin-ecosystem)
14. [GitHub Agentic Workflows - Agents in the Cloud](#14-github-agentic-workflows---agents-in-the-cloud)


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


## 14. GitHub Agentic Workflows - Agents in the Cloud

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


## Related Resources

---

*Next: [Appendix L: Agents Reference](appendix-l-agents-reference.md)*  
*Back: [Appendix J: Codespaces](appendix-j-cloud-editors.md)*  
*Teaching chapter: [Chapter 16: GitHub Copilot](16-github-copilot.md)*

