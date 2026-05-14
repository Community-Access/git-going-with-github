# Appendix AB: Advanced Agent Patterns & Skills

> **Reference companion to:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) | [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix AA: Installation & Setup](appendix-aa-agent-installation-setup.md)
>
> **Authoritative source:** [Accessibility Agents Repository - Skills](https://github.com/Community-Access/accessibility-agents/tree/main/.github/skills) | [Skills Documentation](https://github.com/Community-Access/accessibility-agents/blob/main/SKILLS.md)

## Architecture, Skills, Hooks, and Advanced Patterns for AI Agents

> This appendix covers how to build sophisticated agent workflows using subagent delegation, lifecycle hooks, reusable skills, and browser automation tools. These patterns scale beyond single-agent use to orchestrate complex accessibility audits and remediation workflows.

## Table of Contents

1. [Architecture: Agents and Subagents](#1-architecture-agents-and-subagents)
2. [Skills: Reusable Multi-Step Workflows](#2-skills-reusable-multi-step-workflows)
3. [Hooks: Lifecycle Automation](#3-hooks-lifecycle-automation)
4. [Browser Tools for Behavioral Scanning](#4-browser-tools-for-behavioral-scanning)
5. [Orchestration: Delegation Patterns](#5-orchestration-delegation-patterns)
6. [Advanced Techniques](#6-advanced-techniques)

## 1. Architecture: Agents and Subagents

### What Are Subagents?

An **agent** is a standalone AI system (like `@aria-specialist`) that understands one domain (ARIA patterns). A **subagent** is an agent invoked by another agent to delegate work.

**Example workflow:**
```
User: @web-accessibility-wizard [audit this page]
  ↓ (orchestrates multiple specialists)
  ├─→ @aria-specialist (check ARIA roles)
  ├─→ @contrast-master (check colors)
  ├─→ @keyboard-navigator (check tab order)
  ├─→ @alt-text-headings (check images and headings)
  └─→ @tables-specialist (check table markup)
  ↓ (aggregates results)
Output: [consolidated audit report]
```

### How to Use Subagents

In your agent's instructions or a custom prompt, invoke subagents with the `runSubagent()` function:

```markdown
<!-- In your .agent.md or .prompt.md file -->

## Use Subagents for Deep Audits

When you need to audit multiple aspects of a page, use subagents:

```javascript
// Pseudo-code - how agents invoke subagents
const results = await runSubagent({
  agentName: '@aria-specialist',
  prompt: 'Check this component for ARIA compliance: <component HTML>',
  description: 'ARIA pattern review'
});

const contrastResults = await runSubagent({
  agentName: '@contrast-master',
  prompt: 'Audit these colors: <CSS rules>',
  description: 'Color contrast verification'
});
```

### When to Use Subagents

| Scenario | Primary Agent | Subagents | Benefit |
|----------|---------------|-----------|---------| 
| **Full page audit** | `@web-accessibility-wizard` | All specialists | Parallel scanning, consolidated report |
| **Code review** | `@web-issue-fixer` | `@aria-specialist`, `@contrast-master` | Verify fixes across multiple domains |
| **Document audit** | `@document-accessibility-wizard` | Platform-specific agents | Single entry point for Word/PDF/Excel |
| **Markdown audit** | `@markdown-a11y-assistant` | `@link-checker` | Cross-check link text and heading hierarchy |

### Subagent Architecture Principles

1. **Delegation over monoliths:** One agent calls specialists; specialists don't call other specialists (avoid infinite loops)
2. **Error recovery:** If a subagent fails, the parent agent logs it and continues with other subagents
3. **Context preservation:** Parent passes full context (HTML, CSS, document) to subagents
4. **Result aggregation:** Parent collects results and produces a single consolidated report

## 2. Skills: Reusable Multi-Step Workflows

### What Are Skills?

A **skill** is a reusable, multi-step workflow bundled with reference files, templates, and automation scripts. Skills are invoked by agents or directly by users via slash commands.

**Example:** The `web-scanning` skill contains:
- Step-by-step crawling logic
- URL inventory templates
- Browser automation code
- Reference documentation

**Example:** The `report-generation` skill contains:
- Severity scoring algorithms
- Scorecard templates
- CSV export logic
- WCAG mapping reference data

### The 25+ Core Skills

Accessibility Agents includes a library of reusable skills organized by capability:

| Skill Category | Skills | Purpose |
|----------------|--------|---------|
| **Web Scanning** | `web-scanning`, `web-severity-scoring` | Page inventory, audit scope, severity calculation |
| **Web Remediation** | `web-issue-fixer`, `web-csv-reporter` | Apply fixes, export findings to CSV |
| **Document Scanning** | `document-scanning`, `document-accessibility-rules` | Audit Word/Excel/PDF/EPUB; map to WCAG |
| **Document Remediation** | `document-remediation`, `document-csv-reporter` | Fix documents; generate compliance reports |
| **Markdown** | `markdown-accessibility`, `markdown-fixer`, `markdown-csv-reporter` | Audit .md files; fix links, headings, emoji |
| **CI/CD Integration** | `lighthouse-scanner`, `github-accessibility-scanner` | Parse CI reports; track regressions |
| **Framework Specifics** | `framework-accessibility`, `react-patterns`, `vue-patterns` | Framework-specific accessibility patterns |
| **Python Dev Tools** | `python-fact-grounded-coding`, `pylance-refactoring` | Python code analysis, accessibility linting |
| **Testing** | `testing-coach`, `accessibility-testing-setup` | Screen reader testing, test automation, CI/CD setup |
| **Compliance** | `wcag-guide`, `accessibility-rules-reference`, `help-url-reference` | WCAG 2.2 AA reference, remediation links |

### How to Use a Skill

**From Copilot Chat:**
```
/web-scanning [URL]
/report-generation [findings JSON]
/python-fact-grounded-coding my_script.py
```

**From a Custom Agent:**
```markdown
## Invoke Skills

When you need to audit a webpage, use the web-scanning skill:

"Scan the following URL for accessibility issues and generate a severity score."

- URL: https://example.com
- Severity model: WCAG 2.2 AA
- Output: JSON report
```

### Skill Authoring Pattern

If you are writing a custom skill, follow this structure:

**File: `.github/skills/my-skill-name/SKILL.md`**

```markdown
# My Skill Name

## Purpose
What problem does this skill solve?

## Inputs
- URL or file path
- Configuration (optional)

## Workflow
1. Parse input
2. Execute steps
3. Collect results
4. Format output

## Output
- Report format (JSON, Markdown, CSV)
- Example output

## References
- Links to related agents
- Links to external docs
```

**Supporting files:**
- `templates/` - Templates for input/output
- `scripts/` - Automation scripts (shell, Python)
- `reference/` - Reference data (lookup tables, compliance mappings)

### Skill Reuse Across Agents

Skills are designed to be called by multiple agents. For example:

- `@web-accessibility-wizard` uses `web-scanning` + `web-severity-scoring`
- `@web-issue-fixer` uses `web-scanning` + `web-issue-fixer`
- `@link-checker` uses `web-scanning` + a link-validation subset

This prevents code duplication and ensures consistent behavior across agents.

## 3. Hooks: Lifecycle Automation

### What Are Hooks?

A **hook** is a JSON configuration that triggers agent actions automatically at specific lifecycle events. Hooks enforce accessibility standards without requiring the user to remember to ask for an audit.

**Lifecycle events:**
- On file edit (before save)
- On file save (after save)
- On commit (before push)
- On PR creation (before merge)
- On scheduled interval (nightly, weekly)

### Hook Configuration Format

**File: `.github/hooks/accessibility.hooks.json`**

```json
{
  "hooks": [
    {
      "name": "proactive-detection",
      "event": "on-file-edit",
      "pattern": "**/*.{html,jsx,tsx,vue}",
      "agent": "@aria-specialist",
      "condition": "file.includes('aria')",
      "action": "highlight-violations",
      "severity": "warning"
    },
    {
      "name": "edit-gate",
      "event": "on-file-save",
      "pattern": "src/**/*.tsx",
      "agent": "@web-accessibility-wizard",
      "condition": "severity >= 'error'",
      "action": "block-save",
      "message": "Accessibility violations detected. Use @web-issue-fixer to resolve."
    },
    {
      "name": "commit-check",
      "event": "on-commit",
      "pattern": "**/*",
      "agent": "@accessibility-lead",
      "condition": "true",
      "action": "scan-and-report",
      "output": "commit-message-append"
    },
    {
      "name": "nightly-audit",
      "event": "on-schedule",
      "schedule": "0 2 * * *",
      "pattern": "docs/**/*.md",
      "agent": "@markdown-a11y-assistant",
      "action": "create-issue",
      "labels": ["accessibility", "auto-audit"]
    }
  ]
}
```

### Hook Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Unique hook identifier |
| `event` | enum | `on-file-edit`, `on-file-save`, `on-commit`, `on-pr-create`, `on-schedule` |
| `pattern` | glob | File path pattern (e.g., `**/*.tsx`) |
| `agent` | string | Agent name (e.g., `@aria-specialist`) |
| `condition` | string | When to trigger (e.g., `file.size > 5000`) |
| `action` | enum | `highlight`, `block-save`, `scan-and-report`, `create-issue` |
| `severity` | enum | `info`, `warning`, `error` |
| `message` | string | Custom message to show user |
| `labels` | array | Labels for auto-created issues |

### Hook Examples

**Example 1: Proactive ARIA Detection**

```json
{
  "name": "aria-proactive-check",
  "event": "on-file-edit",
  "pattern": "src/**/*.jsx",
  "agent": "@aria-specialist",
  "condition": "true",
  "action": "highlight-violations",
  "severity": "warning"
}
```

**Behavior:** As you type in a `.jsx` file, violations are highlighted in real time.

**Example 2: Block Non-Accessible Commits**

```json
{
  "name": "accessibility-commit-gate",
  "event": "on-commit",
  "pattern": "**/*",
  "agent": "@web-accessibility-wizard",
  "condition": "severity >= 'error'",
  "action": "block-save",
  "message": "Critical accessibility issues detected. Run @web-issue-fixer to resolve."
}
```

**Behavior:** Commits are blocked if critical accessibility violations are found.

**Example 3: Nightly Document Audits**

```json
{
  "name": "nightly-markdown-audit",
  "event": "on-schedule",
  "schedule": "0 2 * * *",
  "pattern": "docs/**/*.md",
  "agent": "@markdown-a11y-assistant",
  "action": "create-issue",
  "labels": ["a11y", "auto-audit", "documentation"]
}
```

**Behavior:** Every night at 2 AM, markdown files are audited and issues are created automatically.

### Enabling Hooks by Platform

**GitHub Copilot (VS Code):**
- Place `accessibility.hooks.json` in `.github/hooks/`
- Hooks are read on workspace open
- View hook status: Settings Gear → Accessibility Hooks

**Claude Code:**
- Configure in `.claude-code.toml`:
  ```toml
  [hooks]
  enabled = true
  config_file = ".github/hooks/accessibility.hooks.json"
  ```

**Claude Desktop (MCP):**
- Configure in `.mcp.json`:
  ```json
  {
    "accessibility-agents": {
      "hooks": {
        "enabled": true,
        "config": ".github/hooks/accessibility.hooks.json"
      }
    }
  }
  ```

## 4. Browser Tools for Behavioral Scanning

### Available Browser Tools

Accessibility Agents includes browser automation tools for interactive scanning:

| Tool | What It Does | When to Use |
|------|--------------|------------|
| `scan-page` | Single page audit (static + dynamic) | Quick single-page check |
| `scan-pages` | Crawl URL and audit all pages | Site audit, scope definition |
| `scan-dom` | Live DOM inspection | Debug dynamic content |
| `scan-with-lighthouse` | Lighthouse accessibility audit | Performance + a11y scoring |
| `scan-with-playwright` | Playwright automated testing | Interactive flows, form testing |
| `get-page-outline` | Extract page structure | Understand heading hierarchy |
| `detect-color-contrast` | CSS color analysis | Find contrast violations |
| `find-aria-roles` | ARIA role inventory | Understand ARIA implementation |

### Using Browser Tools in Agents

**Pattern 1: Direct Tool Invocation**

```markdown
## Audit Page Accessibility

When the user provides a URL, use the scan-page tool:

1. Call `scan-page(url)` to get accessibility findings
2. Filter findings by severity
3. Group by category (ARIA, contrast, keyboard, etc.)
4. Present results in a prioritized table

Example:
**User:** Audit https://example.com for accessibility issues
**Agent:** 
- Calls `scan-page("https://example.com")`
- Receives findings JSON
- Groups by category and severity
- Reports top 10 issues
```

**Pattern 2: Conditional Scanning**

```markdown
## Smart Audit Based on Page Content

1. Call `get-page-outline(url)` to understand structure
2. If heading hierarchy is broken:
   - Recommend structure fixes (use @alt-text-headings)
3. If many interactive components detected:
   - Recommend ARIA review (use @aria-specialist)
4. If dynamic content detected:
   - Recommend behavioral testing (use @testing-coach)
```

**Pattern 3: Playwright for Complex Workflows**

```javascript
// Pseudo-code: Test a multi-step form
const browser = await playwright.launch();
const page = await browser.newPage();

await page.goto('https://example.com/form');
await page.fill('#name', 'Jane Doe');
await page.fill('#email', 'jane@example.com');
await page.click('button:has-text("Submit")');

// Check for error messages (accessibility of feedback)
const errorMessage = await page.locator('[role="alert"]');
const text = await errorMessage.innerText();

console.log(`Error announced: ${text}`);

await browser.close();
```

### Browser Tool Limitations and Workarounds

| Limitation | Workaround |
|------------|-----------|
| Cannot test with actual screen readers | Use @testing-coach guidance instead; CLI offers NVDA integration |
| JavaScript-heavy pages may be incomplete | Increase wait time: `waitForNavigation()` |
| Some dynamic content misses ARIA updates | Use Playwright to trigger updates and re-scan |
| Cannot test keyboard without manual intervention | Use @keyboard-navigator for structural analysis |

## 5. Orchestration: Delegation Patterns

### Pattern 1: Parallel Scanning (Web Accessibility Wizard)

**Goal:** Audit multiple aspects of a page simultaneously for speed.

```
User request: Audit this page
  │
  ├─ @aria-specialist (scan ARIA)
  ├─ @contrast-master (scan colors)
  ├─ @keyboard-navigator (scan keyboard flow)
  ├─ @alt-text-headings (scan images/headings)
  └─ @tables-specialist (scan tables)
  │
  ↓ (all run in parallel, results aggregated)
  │
  Consolidated Report:
  - Severity: 12 errors, 8 warnings
  - Priority issues (blocking top 5)
  - Detailed findings per agent
```

**Agent code pattern:**

```markdown
## Parallel Audit

Invoke all specialist agents in parallel:

1. Gather all findings simultaneously (not sequentially)
2. Deduplicate issues across agents
3. Sort by severity
4. Present top 10 blocking issues first
5. Link to detailed fix guidance per agent
```

### Pattern 2: Cascading Fixes (Web Issue Fixer)

**Goal:** Fix issues in order of severity and dependency.

```
Findings identified:
  1. Missing alt text (3 images)
  2. Poor color contrast (5 elements)
  3. Missing form labels (2 inputs)
  4. ARIA misuse (1 element)

Remediation order:
  1. Fix ARIA misuse first (foundational)
  2. Add form labels (unblocks testing)
  3. Add alt text (content layer)
  4. Fix contrast (visual layer)

Output: Numbered PR suggestions, 1 fix per commit message
```

### Pattern 3: Skill-First Workflows (Testing Coach)

**Goal:** Guide users through testing workflows without assuming prior knowledge.

```
User: How do I test keyboard navigation?

Agent (@testing-coach) response:

1. Ask clarifying questions:
   - Have you used NVDA before?
   - What platform (Windows/Mac/Linux)?
   - What component type (form/menu/modal)?

2. Recommend testing path:
   - Step 1: Learn Tab order basics (video link)
   - Step 2: Test with keyboard-only (no mouse)
   - Step 3: Verify focus indicators visible
   - Step 4: Check against WCAG 2.5.4

3. Provide interactive test:
   - Code snippet to inject focus indicators
   - Keyboard test checklist
   - Screenshot comparison guide
```

### Pattern 4: Report Aggregation (Cross-Page Analyzer)

**Goal:** Consolidate findings across multiple pages into systemic issues.

```
Input: 50 pages audited

Output:
- Systemic issues (found on 10+ pages):
  - Color contrast: 45 instances across 18 pages
  - Missing alt text: 120 instances across 32 pages
  
- Page-specific issues (found on 1-2 pages):
  - Modal focus trap broken (page 15)
  - ARIA combobox pattern error (page 3)

- Severity scorecard:
  - Overall score: 62/100 (D grade)
  - Top 3 fixes: address these to reach 75/100
  - Estimated effort: 8-12 hours
```

## 6. Advanced Techniques

### Technique 1: Custom Skills for Your Organization

If your organization has repeated accessibility patterns, bundle them as a custom skill:

```markdown
# .github/skills/our-pattern-library/SKILL.md

## Our Accessibility Pattern Library

### Purpose
Codify internal accessibility standards and patterns used across all projects.

### Patterns Included
1. Form validation messaging
2. Accessible modal templates
3. Color palette compliance
4. Data table best practices

### Inputs
- HTML snippet or component name
- Pattern ID (e.g., "form-validation-v2")

### Output
- Remediation code
- Compliance checklist
- Testing steps

### Usage
@custom-agent check-pattern "form-validation-v2" [HTML]
```

### Technique 2: Continuous Evaluation Hooks

Set up automated evaluation to measure improvement over time:

```json
{
  "name": "continuous-accessibility-eval",
  "event": "on-schedule",
  "schedule": "0 0 * * 0",
  "pattern": "src/**/*",
  "agent": "@accessibility-lead",
  "action": "create-eval-report",
  "track": {
    "metrics": ["page-score", "error-count", "warning-count"],
    "baseline": "2026-01-01",
    "frequency": "weekly"
  }
}
```

### Technique 3: Platform-Specific Skill Variants

Create platform-specific implementations of the same skill:

```
.github/skills/form-accessibility/
  ├── SKILL.md (base description)
  ├── implementations/
  │   ├── react/form-pattern.tsx
  │   ├── vue/form-pattern.vue
  │   ├── svelte/form-pattern.svelte
  │   └── vanilla/form-pattern.js
```

**Agents select the implementation matching the detected framework.**

### Technique 4: Result Caching for Performance

For repeated audits (e.g., nightly checks), cache results to speed up analysis:

```json
{
  "name": "smart-audit-with-cache",
  "event": "on-schedule",
  "schedule": "0 2 * * *",
  "pattern": "docs/**/*.md",
  "cache": {
    "enabled": true,
    "ttl": 86400,
    "key": "filepath + git-commit-hash"
  },
  "action": "compare-to-previous"
}
```

**Behavior:** Only re-audited files that changed since the last run; unchanged files use cached results.

## Learning Cards: Advanced Patterns

<details>
<summary>Screen reader users</summary>

- Subagent delegation is explained through example workflows; use the tables to understand which agents delegate to which subagents
- Hooks are configured in JSON files; the JSON structure is explained line-by-line, so you can edit `.github/hooks/accessibility.hooks.json` with confidence
- Skills are organized by category in a table; navigate to the category that matches your need (Web Scanning, Document, etc.)
- Browser tools are listed with clear descriptions; copy the tool name and use it with your chosen agent

</details>

<details>
<summary>Low vision users</summary>

- Workflow diagrams are presented both visually and in text form (with indentation showing hierarchy); read the text version if visual ASCII doesn't render clearly
- Code examples are formatted in clearly marked code blocks with syntax highlighting
- Tables can be magnified independently; zoom in on the "Purpose" or "When to Use" columns for quick reference
- The JSON hook format includes comments explaining each property; copy the template and modify values for your use case

</details>

<details>
<summary>Sighted users</summary>

- Use the Table of Contents to jump to the pattern you need (Subagents, Skills, Hooks, etc.)
- Skim the workflow diagrams to understand orchestration; dive into code examples for implementation details
- The hook examples section shows 3 practical configurations you can copy and adapt
- Read the "When to Use" column in tables to find the right pattern for your task

</details>

### References

- [Accessibility Agents Skills Reference](https://github.com/Community-Access/accessibility-agents/blob/main/SKILLS.md)
- [Subagent Architecture](https://github.com/Community-Access/accessibility-agents/blob/main/SUBAGENT-DELEGATION.md)
- [Hooks Configuration Guide](https://github.com/Community-Access/accessibility-agents/blob/main/.github/hooks/README.md)
- [Browser Tools API Reference](https://github.com/Community-Access/accessibility-agents/blob/main/BROWSER-TOOLS.md)
- [Playwright Documentation](https://playwright.dev/)

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

- **Architecture, Skills, Hooks, and Advanced Patterns for AI Agents:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. Architecture: Agents and Subagents:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Use Subagents for Deep Audits:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Skills: Reusable Multi-Step Workflows:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Invoke Skills:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Inputs:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Workflow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Output:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **References:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Hooks: Lifecycle Automation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Browser Tools for Behavioral Scanning:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Audit Page Accessibility:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Smart Audit Based on Page Content:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Orchestration: Delegation Patterns:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Parallel Audit:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Advanced Techniques:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
