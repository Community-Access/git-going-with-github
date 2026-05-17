# Appendix L: Accessibility Agents Reference
>
> **Listen to Episode 39:** [Accessibility Agents - Complete Reference](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) | Also relevant: [Chapter 20](20-build-your-agent.md)
>
> **Authoritative source:** [GitHub Docs: Building Copilot extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions)

## Complete Reference - Agents, Slash Commands, Instructions, Configuration Levels, and All File Formats

> This is your comprehensive reference for Accessibility Agents and the full VS Code Copilot customization system. The ecosystem includes **55 agents** across **3 teams** and **5 platforms**, plus 54+ slash commands, 17 skills, and 6 instruction files. For the lesson, see [Chapter 19: Accessibility Agents](19-accessibility-agents.md). For Copilot keyboard shortcuts and Chat features, see [Appendix K: GitHub Copilot Reference](appendix-k-copilot-reference.md).

## Table of Contents

1. [The Full Agent Ecosystem](#1-the-full-agent-ecosystem)
2. [GitHub Workflow Agents - Quick Reference](#2-github-workflow-agents---quick-reference)
3. [Slash Commands and Prompts](#3-slash-commands-and-prompts)
4. [Customization Primitives - Decision Guide](#4-customization-primitives---decision-guide)
5. [Scope and Priority - All Levels](#5-scope-and-priority---all-levels)
6. [Always-On Instructions - All File Types](#6-always-on-instructions---all-file-types)
7. [File-Based Instructions (.instructions.md)](#7-file-based-instructions-instructionsmd)
8. [.agent.md - Complete Format Reference](#8-agentmd---complete-format-reference)
9. [.prompt.md - Complete Format Reference](#9-promptmd---complete-format-reference)
10. [Agent Skills (SKILL.md) - Complete Format Reference](#10-agent-skills-skillmd---complete-format-reference)
11. [Hooks (.json) - Lifecycle Automation](#11-hooks-json---lifecycle-automation)
12. [preferences.md - Accessibility Agents Personal Settings](#12-preferencesmd---accessibility-agents-personal-settings)
13. [Diagnostics and Troubleshooting](#13-diagnostics-and-troubleshooting)
14. [Further Reading](#14-further-reading)

## 1. The Full Agent Ecosystem

Accessibility Agents includes 55 agents organized into three specialized teams, available on five platforms.

### Platforms

| Platform | Agent Format | Installation |
| ----------  | -------------  | -------------  |
| **GitHub Copilot** (VS Code) | `.github/agents/*.agent.md` | Fork repo or run installer |
| **Claude Code** | Per-agent CLAUDE.md + hook enforcement | One-liner installer auto-detects |
| **Gemini CLI** | Gemini skill files | One-liner installer auto-detects |
| **Claude Desktop** | MCP server integration | One-liner installer auto-detects |
| **Codex CLI** | Codex agent files | One-liner installer auto-detects |

### Team 1: Accessibility (26 agents)

| Agent | Type | What It Does |
| -------  | ------  | -------------  |
| `@accessibility-lead` | Orchestrator | Delegates multi-agent accessibility audits to specialist agents |
| `@aria-specialist` | Task | ARIA roles, states, properties, widget patterns (modals, tabs, comboboxes) |
| `@modal-specialist` | Task | Dialog focus trapping, escape behavior, screen reader overlay announcements |
| `@contrast-master` | Task | Color contrast ratios, focus indicators, dark mode, visual presentation |
| `@keyboard-navigator` | Task | Tab order, focus management, keyboard shortcuts, skip links, focus traps |
| `@live-region-controller` | Task | Live region announcements, dynamic content, toasts, loading states |
| `@forms-specialist` | Task | Form labels, error handling, validation, autocomplete, field grouping |
| `@alt-text-headings` | Task | Alt text quality, heading hierarchy, document outline, landmark structure |
| `@tables-specialist` | Task | Table markup, scope, caption, headers, sortable columns, ARIA grid |
| `@link-checker` | Informational | Link text quality, ambiguous links, WCAG 2.4.4 and 2.4.9 compliance |
| `@web-accessibility-wizard` | Orchestrator | Full guided WCAG audit - severity scoring, remediation tracking, action plan |
| `@testing-coach` | Informational | NVDA/JAWS/VoiceOver testing guidance, automated test setup (axe-core, Playwright) |
| `@wcag-guide` | Informational | WCAG 2.2 AA reference, success criteria explanations, conformance levels |
| `@word-accessibility` | Task | Microsoft Word document accessibility auditing and remediation |
| `@excel-accessibility` | Task | Microsoft Excel spreadsheet accessibility auditing and remediation |
| `@powerpoint-accessibility` | Task | Microsoft PowerPoint presentation accessibility auditing |
| `@office-scan-config` | Informational | Office document scan configuration and rule management |
| `@pdf-accessibility` | Task | PDF accessibility auditing (PDF/UA, tagged PDF structure) |
| `@pdf-scan-config` | Informational | PDF scan configuration and rule management |
| `@document-accessibility-wizard` | Orchestrator | Guided document audit wizard for Word, Excel, PowerPoint, and PDF |
| `@cognitive-accessibility` | Informational | Cognitive accessibility, plain language, reading level, content clarity |
| `@mobile-accessibility` | Task | iOS VoiceOver and Android TalkBack native app accessibility |
| `@design-system-auditor` | Task | Design system component accessibility review and pattern library audit |
| `@markdown-a11y-assistant` | Task | Markdown headings, links, alt text, tables, emoji, structure enforcement |
| `@epub-accessibility` | Task | ePub and digital publication accessibility auditing |
| `@epub-scan-config` | Informational | ePub scan configuration and rule management |

### Team 2: GitHub Workflow (12 agents)

| Agent | Type | What It Does |
| -------  | ------  | -------------  |
| `@daily-briefing` | Informational | Morning situation report - issues, PRs, CI, security, community activity |
| `@issue-tracker` | Both | Find, prioritize, triage, draft replies to issues across repositories |
| `@pr-review` | Both | Structured PR reviews with risk assessment, change maps, inline suggestions |
| `@analytics` | Informational | Contribution velocity, review turnaround, code hotspots, workload distribution |
| `@insiders-a11y-tracker` | Both | Monitor accessibility-sensitive changes - WCAG/ARIA, headings, links, keyboard |
| `@template-builder` | Guided | Interactive issue template wizard via VS Code Ask Questions |
| `@github-hub` | Both | Central hub for all GitHub operations and repository management |
| `@repo-admin` | Task | Repository settings, branch protection rules, and rulesets |
| `@team-manager` | Task | Team membership, permissions, organization management |
| `@contributions-hub` | Informational | Contribution tracking, contributor recognition, community metrics |
| `@repo-manager` | Task | Multi-repository operations and cross-repo workflow coordination |
| `@nexus` | Orchestrator | Cross-agent orchestration - coordinates multiple agents for complex workflows |

### Team 3: Developer Tools (6 agents)

| Agent | Type | What It Does |
| -------  | ------  | -------------  |
| `@developer-hub` | Both | Central hub for developer tool operations and project scaffolding |
| `@python-specialist` | Task | Python accessibility patterns, Django/Flask a11y, best practices |
| `@wxpython-specialist` | Task | wxPython GUI accessibility - keyboard, focus, screen reader support |
| `@desktop-a11y-specialist` | Task | Desktop application accessibility across Windows, macOS, and Linux |
| `@desktop-a11y-testing-coach` | Informational | Desktop accessibility testing guidance and automation setup |
| `@a11y-tool-builder` | Task | Build custom accessibility testing tools, linters, and CI checks |

### Supporting Resources

| Resource | Count | Location |
| ----------  | -------  | ---------  |
| Copilot prompts | 54+ | `.github/prompts/*.prompt.md` |
| Copilot skills | 17 | `.github/skills/*/SKILL.md` |
| Copilot instructions | 6 | `.github/instructions/*.instructions.md` |
| Claude Code hooks | 3 | `.claude/hooks/` |
| Example violations | 20+ | `example/` directory |

### Learning Cards: Agent Ecosystem Overview

<details>
<summary>Screen reader users</summary>

- Invoke any agent by typing `@agent-name` in Copilot Chat (`Ctrl+Alt+I` or **Chat: Open Chat**) -- the autocomplete list is keyboard-navigable with arrow keys
- The 55 agents are organized into 3 teams (Accessibility, GitHub Workflow, Developer Tools) -- use `H` in the team tables to jump between headings
- Agent responses appear in the Chat panel; press `Alt+F2` (Accessible View) for a structured, non-streaming version

</details>

<details>
<summary>Low vision users</summary>

- The agent team tables use consistent columns (Agent, Type, What It Does) -- increase font size so the narrow "Type" column remains readable
- Agents work in the Chat panel with your current theme and font settings -- no separate UI to configure
- The five supported platforms (VS Code, Claude Code, Gemini CLI, Claude Desktop, Codex CLI) share the same agent logic with platform-specific formatting

</details>

<details>
<summary>Sighted users</summary>

- Skim the three team tables to find the agent closest to your task -- orchestrators coordinate specialists, task agents do focused work
- The Supporting Resources table at the bottom shows file counts and locations for prompts, skills, instructions, and hooks
- Bookmark this section as your directory of all 55 agents; the later sections document the file formats behind them

</details>

## 2. GitHub Workflow Agents - Quick Reference

The GitHub Workflow team includes 12 agents that automate common repository operations. These are good starting points if you have completed the Day 1 skills - but explore any agent in the ecosystem that matches your workflow.\n\nInvoke any agent by typing `@agent-name` in Copilot Chat (`Ctrl+Alt+I` or **Chat: Open Chat**).

### `@daily-briefing` - Morning Briefing

**Agent file:** `.github/agents/daily-briefing.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@daily-briefing morning briefing` | Full prioritized situation report |
| `@daily-briefing what needs my attention today in accessibility-agents?` | Repo-scoped briefing |
| `@daily-briefing summarize activity from the last week` | Weekly digest |

#### Output sections (H2 headings - navigate with `H`)

- Needs Your Action
  - Pull Requests Waiting for Your Review
  - @Mentions Requiring Response
  - CI Failures on Your Branches
- For Your Awareness
  - Issues Opened Since Yesterday
  - Your PRs With New Activity
  - Security and Dependabot Alerts
- All Clear (confirms checked but empty categories)

### `@issue-tracker` - Issue Management

**Agent file:** `.github/agents/issue-tracker.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@issue-tracker find open issues labeled good-first-issue` | Filtered issue search |
| `@issue-tracker find accessibility issues across all my repos` | Cross-repo search |
| `@issue-tracker is there a duplicate of issue #42?` | Duplicate check |
| `@issue-tracker draft a reply to issue #15` | Draft a response (you review before posting) |

**Important:** The agent drafts replies. You post. Always review tone against the [Culture & Etiquette guide](08-open-source-culture.md).

### `@pr-review` - Pull Request Review

**Agent file:** `.github/agents/pr-review.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@pr-review review PR #14` | Full review document |
| `@pr-review what is the risk level of PR #8?` | Risk assessment only |
| `@pr-review generate inline comments for PR #14` | Line-level suggestions only |
| `@pr-review summarize PR #14 in two sentences` | Quick summary |

#### Output sections (H2/H3 headings)

- Summary
- Risk Assessment (High / Medium / Low)
- Files Changed (per-file descriptions)
- Suggested Inline Comments (prefixed: `nit:`, `question:`, `suggestion:`, `important:`, `blocking:`, `praise:`)
- Questions for the Author
- What Looks Good
- Review Verdict Recommendation

**Critical rule:** The agent produces a starting point. Read it, edit it, post it under your own name.

### `@analytics` - Team Analytics

**Agent file:** `.github/agents/analytics.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@analytics team velocity in accessibility-agents this month` | Contribution pace |
| `@analytics who are the most active contributors?` | Top contributors by commits and reviews |
| `@analytics which files are changed most often?` | Code hotspot detection |
| `@analytics how long does PR review take on average?` | Review turnaround time |

### `@insiders-a11y-tracker` - Accessibility Change Monitor

**Agent file:** `.github/agents/insiders-a11y-tracker.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@insiders-a11y-tracker check recent changes` | Scan last commits for a11y impact |
| `@insiders-a11y-tracker review my PR #14 for accessibility impact` | PR-scoped accessibility review |
| `@insiders-a11y-tracker are there any accessibility regressions in the last 5 commits?` | Regression scan |

#### What it monitors

| Area | What It Checks |
| ------  | ---------------  |
| Markdown / docs | Heading hierarchy skips, non-descriptive link text, missing image alt text, table structure |
| HTML / JSX | ARIA attribute changes, `tabIndex`, `outline: none`, `display: none` on focused elements |
| JavaScript | `onMouseDown` without keyboard equivalent, `onMouseEnter`/`onMouseLeave` without keyboard parallel |
| Semantic HTML | `<div>`/`<span>` used for interactive elements instead of `<button>`, `<a>`, `<input>` |

**Risk levels:** High (regression), Medium (degraded), Low (improvement opportunity)

### `@template-builder` - Issue Template Wizard

**Agent file:** `.github/agents/template-builder.agent.md`

| Example Command | What It Does |
| ----------------  | -------------  |
| `@template-builder create accessibility template` | Guided a11y bug report template |
| `@template-builder create security template` | Guided security vulnerability template |
| `@template-builder build a feature request form` | General feature request template |
| `@template-builder reorder the fields` | Modify existing generated YAML |

#### Guided workflow phases

1. **Metadata:** name, description, title prefix, auto-labels
2. **Fields (one at a time):** type → label → description → required → type-specific options
3. **Review and output:** complete YAML ready to save to `.github/ISSUE_TEMPLATE/`

**Supported field types:** `markdown`, `input`, `textarea`, `dropdown`, `checkboxes`

## 3. Slash Commands and Prompts

The repository includes 54+ slash commands. Type `/` in Copilot Chat to open the command menu. Each command corresponds to a `.prompt.md` file in `.github/prompts/`.

### Workshop Quick Reference

| Command | What It Does |
| ---------  | -------------  |
| `/address-comments` | Address all open review comments on your PR |
| `/a11y-update` | Latest accessibility improvements with WCAG cross-references |
| `/ci-status` | CI/CD health dashboard across your repos |
| `/create-issue` | Create a well-formed issue from a description |
| `/daily-briefing` | Morning activity snapshot across all your repos |
| `/draft-release` | Generate release notes from merged PRs |
| `/explain-code` | Explain selected code in plain language |
| `/issue-reply` | Draft a reply to an issue thread |
| `/manage-branches` | List, compare, and clean up branches |
| `/manage-issue` | Update labels, assignees, or status on an issue |
| `/merge-pr` | Check merge readiness and merge a PR |
| `/my-issues` | Your open issues with priority signals |
| `/my-prs` | Your open PRs with CI and review status |
| `/my-stats` | Your contribution stats across repos |
| `/notifications` | Manage GitHub notifications without opening a browser |
| `/onboard-repo` | First-time scan of a repo - health, quick wins, recommended actions |
| `/pr-author-checklist` | Pre-merge checklist for PR authors |
| `/pr-comment` | Draft a response to a PR comment |
| `/pr-report` | Detailed PR analysis report |
| `/project-status` | GitHub Projects board overview - columns, blocked, stale |
| `/react` | Suggest or add a reaction to an issue or comment |
| `/refine-issue` | Improve issue title, description, and labels |
| `/release-prep` | Complete release preparation workflow |
| `/review-pr` | AI-generated review with inline suggestions |
| `/security-dashboard` | Dependabot alerts and vulnerability status |
| `/sprint-review` | End-of-sprint summary with velocity and retrospective |
| `/team-dashboard` | Team activity and contribution overview |
| `/triage` | Triage a new issue with label and priority suggestions |

### Most Useful During the Workshop

| Command | Example Usage |
| ---------  | -------------  |
| `/my-issues` | `/my-issues` - see all your open issues with priority signals |
| `/review-pr` | `/review-pr #14` - AI-generated review with inline suggestions |
| `/triage` | `/triage #22` - get label and priority suggestions for a new issue |
| `/issue-reply` | `/issue-reply #15` - draft a reply to an issue thread |
| `/a11y-update` | `/a11y-update insiders` - latest a11y improvements with WCAG refs |
| `/daily-briefing` | `/daily-briefing` - same output as `@daily-briefing` |
| `/draft-release` | `/draft-release v2.0` - generate release notes from merged PRs |

## 4. Customization Primitives - Decision Guide

Before creating any file, choose the right primitive for the job. Each primitive is a different file type with a different purpose, scope, and trigger.

| Primitive | File Type | When to Use |
| -----------  | -----------  | -------------  |
| **Always-on instructions** | `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md` | Standards that apply to every request - coding conventions, project context, tone |
| **File-based instructions** | `*.instructions.md` | Rules that only apply to specific file types or folders - Python style, test conventions, docs standards |
| **Prompts / Slash Commands** | `*.prompt.md` | Single repeatable task invoked with `/command` - scaffolding, triage, PR prep |
| **Agent Skills** | `SKILL.md` in a named folder | Multi-step workflow with bundled scripts and reference files - testing, deployment, auditing |
| **Custom Agents** | `*.agent.md` | Specialized persona with tool restrictions - orchestrates tasks, can invoke subagents |
| **Hooks** | `*.json` | Deterministic lifecycle automation - block dangerous commands, run formatters, enforce policy |
| **Personal Preferences** | `preferences.md` | Accessibility Agents fork-local personal settings - repos, output format, timezone |

### Choosing Between Primitives

#### Instructions vs Agent?

- Instructions guide behavior passively (always-on or file-scoped). Agents perform tasks actively (on-demand, tool-using).

#### Prompt vs Agent?

- Use a prompt for a single focused task you invoke explicitly. Use an agent when the task spans multiple steps, needs different tools, or should work as a subagent for other agents.

#### Prompt vs Skill?

- Both appear as `/` slash commands. Use a prompt for one well-defined task. Use a skill when the workflow bundles scripts, templates, or reference docs alongside the instructions.

#### Instructions vs Hooks?

- Instructions *guide* the agent (non-deterministic). Hooks *enforce* behavior via shell commands at lifecycle events - they run regardless of what the agent was prompted to do.

### Learning Cards: Customization Primitives

<details>
<summary>Screen reader users</summary>

- The decision table maps each file type to its purpose -- navigate with `T` (next table) in browse mode, then arrow through rows
- Key distinction: instructions are passive (always-on guidance), agents are active (on-demand task performers), hooks are deterministic (shell commands at lifecycle events)
- Use the "Choosing Between Primitives" Q&A pairs below the table to decide which file type fits your need

</details>

<details>
<summary>Low vision users</summary>

- The 7-row decision table is the single most important reference here -- zoom in on the "When to Use" column for the clearest guidance
- Each Q&A pair under "Choosing Between Primitives" is a short paragraph -- easy to scan at high magnification
- Color-coded syntax in YAML frontmatter examples benefits from a high-contrast theme with distinct keyword colors

</details>

<details>
<summary>Sighted users</summary>

- Scan the decision table visually to match your use case to the right primitive -- the "When to Use" column gives one-sentence guidance
- The Q&A comparisons (Instructions vs Agent, Prompt vs Skill, etc.) appear as bold subheadings -- skim them to resolve common ambiguities
- If in doubt, start with a `.prompt.md` file for a focused task; graduate to `.agent.md` only when you need multi-step tool orchestration

</details>

## 5. Scope and Priority - All Levels

Every customization file exists at one of three scopes. VS Code combines all matching files from all scopes and sends them to the model.

### The Three Scopes

| Scope | Where Files Live | Who Shares It |
| -------  | -----------------  | ---------------  |
| **User / Personal** | VS Code profile folder | You only - follows Settings Sync across devices |
| **Workspace** | `.github/` and related folders in the repo | Everyone who clones the repo |
| **Organization** | GitHub organization settings (Enterprise/Team) | Everyone in the org |

### Priority Order (highest wins in conflicts)

1. **Personal / User-level** - your profile instructions override everything
2. **Workspace / Repository-level** - `.github/copilot-instructions.md`, `AGENTS.md`, `.github/agents/*.agent.md`
3. **Organization-level** - organization-defined custom instructions (lowest priority)

### User-Level File Locations (Personal, Cross-Workspace)

All of these files roam with your VS Code Settings Sync.

| File Type | Location on Windows | Location on macOS/Linux |
| -----------  | ---------------------  | ------------------------  |
| Instructions | `%APPDATA%\Code - Insiders\User\prompts\*.instructions.md` | `~/Library/Application Support/Code - Insiders/User/prompts/` |
| Prompts | Same folder - `*.prompt.md` | Same folder |
| Agents | Same folder - `*.agent.md` | Same folder |

> On this machine: `C:\Users\jeffb\AppData\Roaming\Code - Insiders\User\prompts\`

To sync user instructions/prompts/agents across devices:

1. Enable Settings Sync (`Ctrl+Shift+P` → "Settings Sync: Turn On")
2. `Ctrl+Shift+P` → "Settings Sync: Configure"
3. Check "Prompts and Instructions"

### Workspace-Level File Locations (Repo-Shared)

| File Type | Default Location | Override Setting |
| -----------  | -----------------  | -----------------  |
| Always-on instructions | `.github/copilot-instructions.md` | - (fixed path) |
| Always-on (multi-tool) | `AGENTS.md` (root) or nested per subfolder | `chat.useAgentsMdFile` to enable/disable |
| Always-on (Claude compat) | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md` (local only) | `chat.useClaudeMdFile` to enable/disable |
| File-based instructions | `.github/instructions/*.instructions.md` | `chat.instructionsFilesLocations` |
| Claude-format instructions | `.claude/rules/*.instructions.md` | - |
| Agents | `.github/agents/*.agent.md` | - |
| Prompts | `.github/prompts/*.prompt.md` | - |
| Skills | `.github/skills/<name>/SKILL.md` | - |
| Hooks | `.github/hooks/*.json` | - |
| Personal preferences | `.github/agents/preferences.md` (gitignored) | - |

### How Multiple Files Are Combined

VS Code collects **all** matching instruction files from all scopes and includes them all in the chat context. There is no single winner - all are combined. Priority only resolves conflicts between contradictory instructions.

## 6. Always-On Instructions - All File Types

Always-on instructions are automatically included in every chat request. You never invoke them - Copilot simply follows them.

### Option A: `.github/copilot-instructions.md` (Recommended)

**Best for:** Most projects. Cross-editor compatible. Version-controlled and team-shared.

```text
.github/
  copilot-instructions.md   ← lives here
```

**File structure:** Plain Markdown. No frontmatter required.

```markdown
# Copilot Instructions for accessibility-agents

## Accessibility Standards
- Include semantic HTML elements in generated markup
- Add ARIA labels to interactive components when no visible text is present
- Never use color as the only indicator of meaning

## Documentation Style
- Write for screen reader users first
- Use active voice: "Press Ctrl+G" not "You can press Ctrl+G"
- Never skip heading levels (H1 → H2 → H3, never H1 → H3)

## Commit Message Format
- Conventional commits: `type: description`
- Types: feat, fix, docs, style, refactor, test, chore
- Reference issues at end: "Fixes #123"

## Tone
- Direct, friendly, professional
- Assume readers are competent but new to this specific tool
```

**Auto-generate with:** Type `/init` in Copilot Chat - VS Code analyzes your workspace and generates a tailored `copilot-instructions.md`.

### Option B: `AGENTS.md` (Multi-Tool / Monorepo)

**Best for:** Projects that use multiple AI tools (Copilot, Claude Code, Gemini CLI, etc.) where a single instruction file should work across all of them. Also best for monorepos where different folders need different rules.

#### Root-level (applies everywhere)

```text
AGENTS.md           ← root of workspace
```

#### Nested (per subfolder - experimental)

```text
AGENTS.md                  ← root defaults
frontend/AGENTS.md         ← frontend-specific rules (overrides root for frontend/)
backend/AGENTS.md          ← backend-specific rules (overrides root for backend/)
```

Enable nested file support: `chat.useNestedAgentsMdFiles: true` in VS Code settings.

**File structure:** Same as `copilot-instructions.md` - plain Markdown, no frontmatter.

**Cross-tool compatibility:** AGENTS.md is an open standard. GitHub Copilot, Claude Code, Gemini CLI, and other AI tools all recognize it. Use it instead of `copilot-instructions.md` when you work with multiple AI tools.

**Rule:** Use either `AGENTS.md` or `copilot-instructions.md` - not both.

### Option C: `CLAUDE.md` (Claude Code Compatibility)

**Best for:** Teams that use Claude Code alongside VS Code. One file, recognized by both.

| Location | Scope |
| ----------  | -------  |
| `CLAUDE.md` (workspace root) | Workspace - shared via git |
| `.claude/CLAUDE.md` | Workspace - shared via git |
| `CLAUDE.local.md` (workspace root) | Workspace - local only, not committed |
| `~/.claude/CLAUDE.md` | User-level - personal, all workspaces |

VS Code recognizes all four locations when `chat.useClaudeMdFile` is enabled (default: on).

For `.claude/rules/*.instructions.md` files using the Claude Rules format, use **`paths`** instead of `applyTo` for glob matching:

```markdown
description: "Python coding standards"
paths: ["**/*.py", "src/**"]
Follow PEP 8. Use type hints. Write docstrings for public functions.
```

### Option D: Settings-Based Instructions (Deprecated)

> **Note:** Settings-based instructions may be removed in a future VS Code version. Use file-based instructions instead for new work.

For specialized scenarios, VS Code settings accept inline instructions or file references:

```json
// .vscode/settings.json or user settings.json
{
  "github.copilot.chat.codeGeneration.instructions": [
    { "text": "Always add error handling for async functions." },
    { "file": ".github/instructions/code-style.instructions.md" }
  ],
  "github.copilot.chat.testGeneration.instructions": [
    { "text": "Always use describe/it test structure." },
    { "text": "Include at least one edge case per function." }
  ],
  "github.copilot.chat.reviewSelection.instructions": [
    { "text": "Check for WCAG 2.2 Level AA compliance in all markup." }
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [
    { "text": "Use conventional commits format: type(scope): description" }
  ]
}
```

Each entry is an array of objects with either `text` (inline instruction) or `file` (path to an instructions file relative to workspace root).

### Organization-Level Instructions (GitHub Enterprise)

Organization administrators can define custom instructions that apply to all repositories in the organization. Every team member gets these instructions automatically.

#### To enable discovery in VS Code

```json
// User settings.json
{
  "github.copilot.chat.organizationInstructions.enabled": true
}
```

Organization instructions are the lowest priority - workspace and user instructions override them when they conflict.

## 7. File-Based Instructions (`.instructions.md`)

File-based instructions load conditionally - either when the files you are editing match a glob pattern, or when the agent determines the instruction is relevant to the current task.

**Use for:** Language-specific rules, framework conventions, module-specific standards that only apply to part of the codebase.

### File Locations

| Scope | Location |
| -------  | ----------  |
| Workspace | `.github/instructions/*.instructions.md` |
| Additional workspace folders | Configure with `chat.instructionsFilesLocations` setting |
| User / Personal | VS Code profile prompts folder (`*.instructions.md`) |

### Frontmatter Fields

```yaml
name: "Display Name"           # Optional - defaults to filename; shown in UI
description: "Use when..."     # Optional - enables on-demand discovery; be keyword-rich
applyTo: "**/*.py"             # Optional - glob pattern(s) for automatic application
```

### The `applyTo` Glob Pattern

`applyTo` specifies which files trigger automatic inclusion of these instructions. When a file matching the pattern is part of the chat context, the instructions are included automatically.

```yaml
applyTo: "**"                          # ALWAYS included (use carefully - applies everywhere)
applyTo: "**/*.py"                     # All Python files
applyTo: "**/*.{ts,tsx}"               # TypeScript and TSX files
applyTo: "docs/**"                     # Everything under docs/
applyTo: ["src/**", "lib/**"]          # Multiple patterns (OR - either match triggers inclusion)
applyTo: src/**, lib/**                # Same without array syntax
applyTo: "**/*.test.{js,ts}"          # Only test files
applyTo: ".github/ISSUE_TEMPLATE/**"  # Only issue template files
```

**If `applyTo` is omitted:** The instruction is NOT applied automatically. It can still be added manually via the Chat context menu, or picked up by the agent if the `description` semantically matches the current task.

### Discovery Modes

| Mode | Trigger | When to Use |
| ------  | ---------  | -------------  |
| **Automatic** (`applyTo` set) | When matching files are in the chat context | Language rules, framework patterns, folder-specific standards |
| **On-demand** (`description` set, no `applyTo`) | Agent detects task relevance from description keywords | Migration guides, refactoring rules, API design patterns |
| **Manual** | User selects "Add Context → Instructions" in Chat | Ad-hoc attachment for one-off situations |

### Example: Accessibility-Specific Instructions

```markdown
name: "Accessible Markdown Standards"
description: "Use when writing, editing, or reviewing Markdown documentation. Covers heading hierarchy, link text, alt text, and table structure."
applyTo: "**/*.md"

# Markdown Accessibility Standards

- Never skip heading levels (H1 → H2 → H3; H1 → H3 is a WCAG 1.3.1 violation)
- Use descriptive link text: never "click here", "read more", or bare URLs
- Every informational image must have alt text describing what it conveys
- Every decorative image must use empty alt: `![](image.png)` or `alt=""`
- Tables must have header rows using `|---|` Markdown syntax
- Ordered lists (`1.`) only for genuinely sequential steps; use unordered (`-`) otherwise
```

### Example: YAML Issue Template Instructions

```markdown
name: "Issue Template YAML"
description: "Use when writing or reviewing GitHub issue templates in YAML format"
applyTo: ".github/ISSUE_TEMPLATE/**/*.{yml,yaml}"

# Issue Template YAML Standards

- Every field must have a non-empty `label`
- Dropdowns must list at least 2 options
- Use `required: true` only for fields that truly block triage without them
- Prefer `textarea` for free-form text; use `input` only for short identifiers
- Every template must have a `name`, `description`, and `title` prefix
```

### Creating an Instructions File

#### Command Palette method
### Writing Effective Instructions

Guidance from GitHub's accessibility team on writing instructions that Copilot actually follows:

**Do:**

- **Use normative language.** Write `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` for rules. LLMs respond well to these terms because they reduce ambiguity -- the same words used in WCAG. Example: `Keyboard shortcuts MUST NOT override browser or OS shortcuts.`
- **Use lists and checklists.** Structured lists provide guardrails that keep Copilot on track. Format accessibility requirements as a checklist so no criterion is overlooked.
- **Specify your versions and standards.** `This application MUST conform to WCAG 2.2 Level AA` is more useful than a general reference to accessibility. Include your design system's component names and flag deprecated components explicitly: `DeprecatedButton MUST NOT be used; use NewAccessibleButton instead.`
- **Focus on what Copilot doesn't already know.** Instructions should add net-new information -- your team's conventions, exceptions, and priorities -- not restate what Copilot was trained on.
- **Keep instructions concise.** Overly long instructions reduce model performance. Summarize the most important rules rather than listing every possible case.

**Don't:**

- **Don't paste full guidelines.** Copilot is already trained on WCAG, ARIA, and HTML standards. Copying large sections of a spec into instructions wastes context and rarely improves output. Focus on your team's specific deviations and priorities instead.
- **Don't reference external links.** By design, Copilot does not fetch URLs in custom instructions (a deliberate privacy and security protection). A link is useful as a human reference but has no effect on Copilot's behavior. Write the relevant rules directly into the instructions text.
- **Don't reference private repositories.** Copilot cannot access private repo content from within another repository's instructions. Write the guidance inline.
- **Use role-based prompting carefully.** Assigning a persona (`You are the lead accessibility expert...`) can be effective, but any persona can carry assumptions from training data. If you use role prompting, be specific about skills and responsibilities, stay neutral, and use professional functional language.

**Share your instructions:** The [github/awesome-copilot](https://github.com/github/awesome-copilot) repository collects community-contributed instructions files. Before submitting, review your file to confirm it contains no sensitive or confidential information.

### Creating an Instructions File

#### Command Palette method

1. `Ctrl+Shift+P` → "Chat: New Instructions File"
2. Choose Workspace or User Profile scope
3. Enter filename
4. Add `applyTo` and/or `description` frontmatter
5. Write instructions

#### Quick creation method

Type `/instructions` in the Chat input to open the Configure Instructions menu.

## 8. `.agent.md` - Complete Format Reference

### File Locations

| Scope | Location |
| -------  | ----------  |
| Workspace | `.github/agents/*.agent.md` |
| User / Personal | VS Code profile folder `*.agent.md` |

### Complete Frontmatter Reference

```yaml
name: "agent-name"                        # Required - what you type after @ in Chat
description: "Use when..."               # Required - triggers subagent delegation; keyword-rich
tools: ["read", "search", "githubRepo"]  # Optional - tools this agent can use; omit = defaults; [] = none
model: "Claude Sonnet 4.5 (copilot)"     # Optional - specific model to use
agent: "ask"                              # Optional - agent mode: ask | agent | plan | or custom name
argument-hint: "Repo or PR ref..."       # Optional - hint shown in chat input when agent is selected
agents: ["SubagentA", "SubagentB"]       # Optional - restrict which subagents this agent can invoke (omit = all allowed)
user-invocable: true                      # Optional - show in agent picker (default: true); false = subagent only
disable-model-invocation: false          # Optional - prevent other agents from invoking this as subagent (default: false)
handoffs: ["AgentB", "AgentC"]           # Optional - agents this agent can hand off to
```

### Model Fallback Array

```yaml
model: ["Claude Sonnet 4.5 (copilot)", "GPT-5 (copilot)"]
```

The first available model in the array is used. Useful for environments where not all models are licensed.

### Invocation Control

| Setting | Default | Effect |
| ---------  | ---------  | --------  |
| `user-invocable: true` | Default | Agent appears in `@` picker; users can invoke it directly |
| `user-invocable: false` | - | Hidden from picker; only callable as a subagent from another agent |
| `disable-model-invocation: false` | Default | Other agents can delegate to this agent based on description matching |
| `disable-model-invocation: true` | - | This agent cannot be invoked as a subagent; user-invoked only |

### All Tool Names

#### Built-in aliases

| Alias | What It Provides |
| -------  | -----------------  |
| `read` | Read files in the local workspace |
| `edit` | Edit files in the local workspace |
| `search` | Search files and text in the workspace |
| `execute` | Run shell commands in the terminal |
| `agent` | Invoke custom agents as subagents |
| `web` | Fetch URLs and search the web |
| `todo` | Manage task lists |

#### Specific tools (reference by exact name)

| Tool | What It Provides |
| ------  | -----------------  |
| `githubRepo` | GitHub API - search issues, PRs, code |
| `fetch` | HTTP fetch - read external URLs |
| `createFile` | Create new files in the workspace |
| `createDirectory` | Create new directories |
| `editFiles` | Edit multiple files |
| `readFile` | Read specific file contents |
| `codebase` | Search and read the codebase semantically |
| `ask_questions` | VS Code Ask Questions UI (interactive wizard prompts) |
| `github/*` | All GitHub MCP tools (wildcard) |
| `<server>/*` | All tools from a named MCP server |

#### Tool combinations by use case

```yaml
# Read-only research (safest)
tools: ["read", "search", "githubRepo"]

# Documentation / file generation
tools: ["read", "edit", "createFile", "createDirectory"]

# Full GitHub workflow
tools: ["github/*", "read", "edit", "createFile"]

# Terminal access (use carefully)
tools: ["execute", "read", "edit"]

# Conversational only (no file access)
tools: []

# Interactive wizard
tools: ["ask_questions", "createFile"]
```

### Body Structure Template

```markdown
name: my-agent
description: "Use when [specific task/trigger]. Handles [clear purpose]."
tools: ["read", "search"]
user-invocable: true

You are a specialist at [specific role]. Your job is to [clear purpose].

## Constraints
- DO NOT [thing this agent should never do]
- DO NOT post anything without human review
- ONLY [the one thing this agent does]

## Behavior

### [Task Name]
When asked to [task]:
1. [Step one]
2. [Step two]
3. [Step three]

## Output Format

```

## [Section Header]

[Describe the exact output structure here with placeholders]

```text

## Accessibility Requirements
- Use heading level 2 for the document title, level 3 for sections
- Never use tables for lists - ordered or unordered lists are more predictable for screen reader navigation
- Always include "empty state" messages - never omit a section silently

## Scope Boundaries
- You [do X]. You do NOT [do Y].
- The human reviews all output before acting on it.
```

### Creating Your Own Agent

1. Copy an existing `.agent.md` from `.github/agents/`
2. Edit the frontmatter (`name`, `description`, `tools`)
3. Write clear step-by-step instructions in the body
4. Add an Output Format section showing the expected structure
5. Add Constraints and Scope Boundaries sections
6. Save to `.github/agents/your-agent-name.agent.md`
7. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
8. Type `@your-agent-name` in Copilot Chat

**Tip:** Write keyword-rich descriptions. The description is how other agents decide whether to delegate to yours. "A helpful agent" will never get delegated to. "Use when auditing Markdown files for accessibility violations (missing alt text, heading skips, bare URLs)" will.

### Learning Cards: .agent.md - Complete Format Reference

**Screen reader users:**
- YAML frontmatter is the first block in the file between `---` delimiters -- arrow through it line by line to verify `name`, `description`, and `tools` fields; indentation matters
- The `name` field in frontmatter is what you type after `@` in Copilot Chat -- if the agent does not appear, check this field matches your invocation and reload VS Code (`Ctrl+Shift+P` then "Reload Window")
- Use Chat Diagnostics (gear icon in Chat header then Diagnostics) to verify your agent loaded successfully -- it lists every agent found, with error details if frontmatter parsing failed

**Low-vision users:**
- Agent files are small Markdown documents typically under 100 lines -- increase editor font size and use a theme with distinct YAML keyword colors so frontmatter fields stand out
- The tools list in frontmatter uses array syntax (`["read", "search"]`) -- at high zoom, verify commas and quotes are correct since YAML is sensitive to formatting
- The body template structure (Constraints, Behavior, Output Format, Scope Boundaries) uses `##` headings -- use VS Code's Outline view (`Ctrl+Shift+O`) to navigate between sections

**Sighted users:**
- Copy an existing `.agent.md` from `.github/agents/` as a starting template -- the frontmatter structure is identical across all agents; just change the name, description, and tool list
- The tool combinations table in this section shows common patterns by use case -- scan the comments (e.g., "Read-only research", "Full GitHub workflow") to find the right tool set
- The invocation control table explains `user-invocable` and `disable-model-invocation` flags -- set `user-invocable: false` to create helper agents that only other agents can call

## 9. `.prompt.md` - Complete Format Reference

### File Locations

| Scope | Location |
| -------  | ----------  |
| Workspace | `.github/prompts/*.prompt.md` |
| User / Personal | VS Code profile folder `*.prompt.md` |

### Complete Frontmatter Reference

```yaml
name: "command-name"                    # Optional - defaults to filename; the /command name
description: "One-sentence description" # Optional - shown in slash command picker
argument-hint: "PR ref or repo name"   # Optional - hint in chat input when command is selected
agent: "agent"                          # Optional - agent mode: ask | agent | plan | or custom @agent-name
model: "GPT-5 (copilot)"               # Optional - override model for this command
tools: ["github/*", "createFile"]       # Optional - tools this command can use
```

### Model Fallback

```yaml
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
```

### Tool Priority When Agent Is Also Specified

When both the prompt and the referenced agent define tools, VS Code uses this priority:

1. Tools listed in the prompt file's frontmatter (highest priority)
2. Tools from the referenced custom agent
3. Default tools for the selected agent mode

### Input Parameters

```text
${input:parameterName:Prompt text shown to the user}
```

- `parameterName` - internal identifier (no spaces)
- The text after the second `:` is shown to the user as a placeholder or tooltip
- Multiple parameters are supported in one prompt file

```text
${input:repo:Target repository - e.g. owner/repo or leave blank for current workspace}
${input:scope:Optional filter: label name, date range, or org:orgname}
```

### Body - Referencing Tools and Files

```markdown
Use #tool:<tool-name> to explicitly invoke a tool:

Fetch issue #42 with #tool:mcp_github_github_issue_read.

Reference workspace files with Markdown links:
See the configuration in [preferences.md](.github/agents/preferences.md).
```

### Example - Accessibility Update Command

```markdown
name: a11y-update
description: "Get latest accessibility improvements with WCAG cross-references"
agent: insiders-a11y-tracker
tools: ["github/*", "createFile", "ask_questions"]

Show the latest accessibility improvements across tracked repositories.

${input:scope:Optional: 'insiders', 'stable', a repo name, a month, or a WCAG criterion}

## Behavior
Load repo list from `.github/agents/preferences.md`. Group results by: Screen Reader,
Keyboard Navigation, Visual/Contrast, Audio/Motion, Cognitive.

For each finding include:
- WCAG success criterion (e.g., "WCAG 2.4.3 Focus Order (Level A)")
- ARIA design pattern if applicable
- Impact level: Critical / Major / Minor
- Assistive technologies affected
```

### Creating Your Own Slash Command

1. Copy an existing `.prompt.md` from `.github/prompts/`
2. Edit frontmatter (`name`, `description`, `tools`)
3. Write the task instructions in plain English
4. Add `${input:...}` placeholders where the user must provide values
5. Save to `.github/prompts/your-command.prompt.md`
6. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
7. Type `/your-command` to invoke it

**Both prompts and agent skills appear as `/` slash commands.** The difference: prompts are single-task Markdown files; skills are folders with bundled scripts and references.

### Learning Cards: Prompts and Slash Commands

<details>
<summary>Screen reader users</summary>

- Type `/` in Copilot Chat to see all available slash commands -- the autocomplete list reads each command name and description aloud
- `.prompt.md` files use YAML frontmatter for metadata (name, description, tools) followed by plain Markdown instructions
- Use `${input:variableName}` placeholders in prompts to create interactive fill-in-the-blank commands that prompt the user at invocation

</details>

<details>
<summary>Low vision users</summary>

- The slash command picker popup is themed to match your current VS Code theme -- ensure your theme has sufficient contrast for dropdown items
- `.prompt.md` files are small Markdown files that are easy to read and edit at high zoom -- typically under 50 lines
- The YAML frontmatter block at the top is indentation-sensitive -- use VS Code's indentation guides or a linter to verify structure

</details>

<details>
<summary>Sighted users</summary>

- The `/` picker shows a scrollable list of commands grouped by source -- built-in commands appear first, then workspace prompts
- Look at the `.github/prompts/` folder in the Explorer to see all custom slash commands defined in the project
- Copy an existing `.prompt.md` file as a template when creating new commands -- the frontmatter structure is the same for all prompts

</details>

## 10. Agent Skills (`SKILL.md`) - Complete Format Reference

A Skill is a folder - not a single file. The folder contains `SKILL.md` plus any scripts, templates, and reference documents the skill needs.

### Folder Structure

```text
.github/skills/
  my-skill/
    SKILL.md              ← Required; name must match folder name
    scripts/
      run-audit.sh        ← Referenced from SKILL.md
    references/
      wcag-criteria.md    ← Reference doc loaded when needed
    assets/
      template.yml        ← Boilerplate files
```

### File Locations

| Scope | Location |
| -------  | ----------  |
| Workspace | `.github/skills/<name>/SKILL.md` |
| Workspace (alternate) | `.agents/skills/<name>/SKILL.md` |
| Workspace (Claude compat) | `.claude/skills/<name>/SKILL.md` |
| User / Personal | `~/.copilot/skills/<name>/SKILL.md` |
| User (alternate) | `~/.agents/skills/<name>/SKILL.md` |
| User (Claude compat) | `~/.claude/skills/<name>/SKILL.md` |

### Complete Frontmatter Reference

```yaml
name: skill-name                      # Required - 1-64 chars; lowercase alphanumeric + hyphens; must match folder name
description: "Use when..."           # Required - keyword-rich trigger phrases for on-demand discovery
argument-hint: "Optional input..."   # Optional - hint shown when skill is selected as slash command
user-invocable: true                  # Optional - appear as slash command (default: true)
disable-model-invocation: false       # Optional - prevent automatic loading by agents (default: false)
```

### Slash Command Behavior

| `user-invocable` | `disable-model-invocation` | Result |
| ------------------  | --------------------------  | --------  |
| true (default) | false (default) | Appears as `/command` AND auto-loads |
| false | false | Does NOT appear as `/command`; auto-loads only |
| true | true | Appears as `/command`; does NOT auto-load |
| false | true | Neither `/command` nor auto-load |

### Progressive Loading - How VS Code Loads Skills

1. **Discovery (~100 tokens):** Reads `name` and `description` to decide if the skill is relevant
2. **Instructions (<5000 tokens):** Loads the full `SKILL.md` body when the skill is relevant
3. **Resources:** Additional files (`scripts/`, `references/`) only load when explicitly referenced from `SKILL.md`

**Keep `SKILL.md` under 500 lines.** Move reference material to `references/` folder files.

### SKILL.md Body Template

```markdown
name: a11y-audit
description: "Audit Markdown files for accessibility violations. Use for heading hierarchy, link text quality, alt text, and WCAG compliance checks."

# Accessibility Audit Skill

## When to Use
- Before opening a PR that modifies Markdown documentation
- When asked to check accessibility compliance of docs
- After generating new documentation content
- During content review for WCAG 1.3.1, 2.4.4, 1.1.1

## Procedure

1. Run the audit script: [audit.sh](./scripts/audit.sh)
2. Review output for heading hierarchy violations (H1→H3 skips)
3. Check all links - flag bare URLs and non-descriptive text
4. Verify alt text on all images
5. Review the [WCAG reference](./references/wcag-quick-ref.md) for remediation guidance
6. Report findings by risk level: High | Medium | Low

## Output Format
- High risk: potential regressions (inaccessible content where it was accessible before)
- Medium risk: degraded accessibility
- Low risk: improvement opportunities
- Include WCAG criterion for each finding
```

## 11. Hooks (`.json`) - Lifecycle Automation

Hooks execute shell commands at specific points in an agent's lifecycle. They are deterministic - they run regardless of what the agent was prompted to do.

**Use hooks for enforcement, not guidance.** For behavior you want to enforce - blocking commands, auto-running formatters, requiring approval - use hooks. For behavior you want to encourage - coding standards, tone, output format - use instructions.

### File Locations

| Scope | Location | Committed? |
| -------  | ----------  | -----------  |
| Workspace (team-shared) | `.github/hooks/*.json` | Yes |
| Workspace (local) | `.claude/settings.local.json` | No (gitignored) |
| Workspace | `.claude/settings.json` | Yes |
| User / Personal | `~/.claude/settings.json` | Personal only |

Hooks from all locations are combined - workspace and user hooks do not override each other.

### Hook Events

| Event | When It Fires |
| -------  | --------------  |
| `SessionStart` | First prompt of a new agent session |
| `UserPromptSubmit` | User submits any prompt |
| `PreToolUse` | Immediately before any tool is invoked |
| `PostToolUse` | After successful tool invocation |
| `PreCompact` | Before context compaction |
| `SubagentStart` | When a subagent begins |
| `SubagentStop` | When a subagent ends |
| `Stop` | When the agent session ends |

### Configuration Format

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": ".github/hooks/validate-before-edit.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write",
        "windows": "npx.cmd prettier --write",
        "timeout": 30
      }
    ]
  }
}
```

### Hook Command Fields

| Field | Required | Description |
| -------  | ----------  | -------------  |
| `type` | Yes | Must be `"command"` |
| `command` | Yes | Shell command to run (default for all platforms) |
| `windows` | No | Windows-specific override |
| `linux` | No | Linux-specific override |
| `osx` | No | macOS-specific override |
| `cwd` | No | Working directory for the command |
| `env` | No | Environment variable overrides |
| `timeout` | No | Max seconds before killing the process |

### Input/Output Contract

Hooks receive JSON on `stdin`. They can return JSON on `stdout`:

```json
{
  "continue": true,
  "stopReason": "optional message if blocking",
  "systemMessage": "optional context injected into the agent session"
}
```

#### `PreToolUse` permission decisions

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "Safe read-only operation"
  }
}
```

Permission decisions: `"allow"` | `"ask"` (prompt user) | `"deny"` (block the tool call)

#### Exit codes

- `0` - success; agent continues
- `2` - blocking error; agent stops
- Other - non-blocking warning

### Learning Cards: Hooks

**Screen reader users:**
- Hooks are JSON files, not Markdown -- navigate them in the editor with arrow keys; each hook event (e.g., `PreToolUse`, `PostToolUse`) is a key in the `"hooks"` object
- Hook output is returned as JSON on `stdout` -- the `"continue"` field (true/false) determines whether the agent proceeds; listen for the `"stopReason"` message if the hook blocks an action
- The `"permissionDecision"` values (`allow`, `ask`, `deny`) control tool access -- `ask` triggers a confirmation dialog that your screen reader will announce as a standard VS Code dialog

**Low-vision users:**
- JSON syntax requires careful attention to braces, brackets, and commas -- use VS Code's bracket pair colorization (`editor.bracketPairColorization.enabled`) and increase font size to verify structure
- The hook events table maps each event name to when it fires -- zoom in on the "When It Fires" column to understand the lifecycle timing
- Hook errors appear in the agent session output -- look for non-zero exit codes or `"continue": false` in the output pane

**Sighted users:**
- The hook events table lists 8 lifecycle events -- `PreToolUse` and `PostToolUse` are the most commonly used for validation and formatting enforcement
- The configuration format example shows the JSON structure with `command`, `timeout`, and platform-specific overrides -- copy this template and modify the command paths for your project
- Hooks from workspace (`.github/hooks/`) and user (`~/.claude/settings.json`) locations are combined, not overridden -- check both locations if a hook is firing unexpectedly

## 12. `preferences.md` - Accessibility Agents Personal Settings

Copy `.github/agents/preferences.example.md` to `.github/agents/preferences.md`. The file is in `.gitignore` - your private settings stay only in your local fork.

### Full File Template

```markdown
# My Accessibility Agents Preferences

## My GitHub Username
your-github-username

## Repositories I Work On Most
- community-access/accessibility-agents
- your-org/your-repo

## Preferred Output Format
screen-reader-optimized

## Notification Priority
Accessibility issues first, then review requests assigned to me, then CI failures,
then security alerts, then general activity.

## Review Comment Tone
Direct but constructive. Always explain the "why". Assume good intent from authors.
Warm and encouraging for first-time contributors.

## Time Zone
America/New_York

## Accessibility Context
I use NVDA with Chrome on Windows 11.
```

### `Preferred Output Format` Options

| Value | What It Does |
| -------  | -------------  |
| `"concise"` | Bullet points and short summaries, minimal prose |
| `"detailed"` | Full context and more explanation in every response |
| `"screen-reader-optimized"` | Heading-heavy structure, no tables, explicit empty-state messages |

### `Notification Priority` Options

The `@daily-briefing` agent reads this to sort its output sections. Examples:

```text
Accessibility issues first, then review requests assigned to me, then CI failures, then general activity.
```

```text
Review requests first. CI failures second. Security alerts third. Everything else as a digest at the end.
```

### `Review Comment Tone` Options

The `@pr-review` and `@issue-tracker` agents read this when drafting comments:

```text
Direct but constructive. Always explain the "why" behind a suggestion. Assume good intent from authors.
```

```text
Friendly and encouraging for first-time contributors.
More direct and concise for established contributors.
```

### `Accessibility Context` Options

Tells agents which screen reader and browser you use so they can tailor output and recommendations:

```text
I use NVDA with Chrome on Windows 11.
I use VoiceOver with Safari on macOS Sonoma.
I use JAWS with Firefox on Windows 10.
I use Narrator with Edge on Windows 11.
I use TalkBack on Android.
```

## 13. Diagnostics and Troubleshooting

### View All Loaded Customizations

To see every instruction file, agent, prompt, and skill currently loaded and any errors:

1. In Copilot Chat, select the gear icon (Configure Chat) → **Diagnostics**
2. Or right-click in the Chat view → **Diagnostics**

This shows: which files were found, which were loaded, which have errors, and from which scope (user vs workspace vs organization).

### Common Issues

#### Agent not found when typing `@agent-name`

1. Verify `.github/agents/[name].agent.md` exists in your open workspace folder
2. Check that the YAML frontmatter has no syntax errors (missing quotes, wrong indentation)
3. `Ctrl+Shift+P` → "Reload Window"
4. Check that the `name` field in the frontmatter matches what you are typing

#### Instructions not being applied

1. For `.github/copilot-instructions.md`: file must be at workspace root in the `.github/` folder
2. For `*.instructions.md`: check that `applyTo` glob matches the file you are editing, and that `chat.includeApplyingInstructions` is `true` in VS Code settings
3. For `AGENTS.md`: check that `chat.useAgentsMdFile` is `true`
4. Use Diagnostics view (above) to verify the file was found and loaded

#### Instructions file in wrong place

- Add custom locations: `chat.instructionsFilesLocations` setting accepts an array of additional folder paths

#### Slash command not appearing

1. Verify `.github/prompts/[name].prompt.md` exists
2. `Ctrl+Shift+P` → "Reload Window"
3. File must use `.prompt.md` extension (not just `.md`)

## Accessibility Agents Keyboard Shortcuts

| Action | Shortcut |
| --------  | ----------  |
| Open Copilot Chat | `Ctrl+Alt+I` or **Chat: Open Chat** from the Command Palette |
| Invoke an agent | Type `@agent-name` in Chat |
| Use a slash command | Type `/command-name` in Chat |
| Open Accessible View (Chat response or inline suggestion) | `Alt+F2` |
| Insert inline suggestion from Accessible View at cursor | `Ctrl+/` |
| Clear chat history | `Ctrl+L` |
| Reload VS Code window | `Ctrl+Shift+P` → "Reload Window" |
| New instructions file | `Ctrl+Shift+P` → "Chat: New Instructions File" |
| Configure instructions | `Ctrl+Shift+P` → "Chat: Configure Instructions" |
| View diagnostics | Configure Chat gear → Diagnostics |

## 14. Further Reading

For the broader ecosystem - the community plugin marketplace, MCP server integrations, and running agents in the cloud via GitHub Actions - see [Appendix K: GitHub Copilot and Agentic Reference](appendix-k-copilot-reference.md).

### Official accessibility.github.com Guides

| Guide | URL |
| -------  | -----  |
| Getting started with custom agents for accessibility | [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) |
| Optimizing Copilot with custom instructions (accessibility) | [accessibility.github.com/documentation/guide/copilot-instructions/](https://accessibility.github.com/documentation/guide/copilot-instructions/) |
| GitHub Copilot for VS Code screen reader guide | [accessibility.github.com/documentation/guide/github-copilot-vsc/](https://accessibility.github.com/documentation/guide/github-copilot-vsc/) |

---

*Next: [Appendix M: Accessibility Standards](appendix-m-accessibility-standards.md)*  
*Back: [Appendix K: Copilot Reference](appendix-k-copilot-reference.md)*  
*Teaching chapter: [Chapter 19: Accessibility Agents](19-accessibility-agents.md)*

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

- **Complete Reference - Agents, Slash Commands, Instructions, Configuration Levels, and All File Formats:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. The Full Agent Ecosystem:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. GitHub Workflow Agents - Quick Reference:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Slash Commands and Prompts:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Customization Primitives - Decision Guide:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Scope and Priority - All Levels:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Always-On Instructions - All File Types:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Accessibility Standards:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Documentation Style:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Commit Message Format:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **7. File-Based Instructions (`.instructions.md`):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **8. `.agent.md` - Complete Format Reference:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Output Format:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **[Section Header]:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Accessibility Requirements:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Scope Boundaries:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
