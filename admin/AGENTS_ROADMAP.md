# Agents Roadmap & Version History

> **Overview document for facilitators and contributors.**
>
> **Last updated:** May 2026
> **Accessibility Agents version:** 5.0.0+

## Overview

Git Going with GitHub curriculum integrates Accessibility Agents - an ecosystem of 80+ AI-powered agents across 5 platforms (GitHub Copilot, Claude Code, Gemini CLI, Claude Desktop, Codex CLI) for accessibility auditing, remediation, and developer tool integration.

This document tracks the curriculum's alignment with Accessibility Agents versions, capability evolution, and contribution pathways for facilitators and maintainers.

## Version Alignment

### Curriculum Version 2.0 (May 2026) - Accessibility Agents 5.0.0+

**Curriculum changes:**
- Chapter 19: Expanded from 55 to 80 agents; added 5-platform support; added document and developer tools teams
- Appendix K: Added MCP Server section; comprehensive Copilot reference with cross-platform guidance
- Appendix L: Enhanced from 26 to 40 accessibility agents; added 20 GitHub Workflow agents; added 18 developer tool agents
- **NEW** Appendix AA: Agent Installation & Setup (comprehensive platform guide)
- **NEW** Appendix AB: Advanced Agent Patterns & Skills (subagent delegation, hooks, skills authoring)
- **NEW** Appendix AC: Document & Developer Tool Agents (Office, PDF, EPUB, Python, wxPython, CI/CD)

**Agents 5.0.0 capabilities:**

| Capability | Version | Status | Details |
|-----------|---------|--------|---------|
| **Detection → Remediation** | 5.0.0+ | Stable | Agents can now automatically apply fixes (not just report issues) |
| **Compliance Exports (VPAT)** | 5.0.0+ | Stable | Generate Voluntary Product Accessibility Template reports |
| **Continuous Evaluation** | 5.0.0+ | Stable | Track accessibility improvement over time with automated scoring |
| **Multi-Platform Support** | 5.0.0+ | Stable | Same agents run on Copilot, Claude, Gemini, Claude Desktop, Codex |
| **Skills-First Architecture** | 5.0.0+ | Stable | Reusable 25+ skills bundled with agents; agents delegate to skills |
| **Hooks (Lifecycle Automation)** | 5.0.0+ | Stable | JSON-based event triggers (on-edit, on-save, on-commit, on-schedule) |
| **Document Team Expansion** | 5.0.0+ | Stable | Word, Excel, PowerPoint, PDF, EPUB agents added; remediators available |
| **Developer Tools Integration** | 5.0.0+ | Stable | Python, wxPython, CI/CD, desktop accessibility agents integrated |

### Previous Versions

**Curriculum Version 1.0 (September 2025) - Accessibility Agents 4.x**
- Chapter 16: GitHub Copilot introduction (basic agents, no cross-platform)
- Appendices K-L: Copilot and 55 web/GitHub agents (web accessibility team only)
- No document or developer tools support
- No hooks or advanced skills

---

## Key Transitions: What Changed Between 4.x → 5.0.0

### 1. Detection → Remediation Paradigm Shift

**Before (4.x):** Agents reported issues; users fixed manually.
**Now (5.0.0+):** Agents can auto-apply many fixes; users review and confirm.

**Example:**
```
Version 4.x:
User: @aria-specialist audit this component
Agent: [Reports 3 ARIA errors]
User: [Manually fixes issues in code]

Version 5.0.0+:
User: @web-issue-fixer audit-and-fix this component
Agent: [Reports 3 ARIA errors]
Agent: [Applies auto-fix for 2 errors; flags 1 for manual review]
Agent: [Returns remediated code for approval]
```

### 2. Compliance Exports & VPAT Generation

**Before (4.x):** No automated compliance reporting.
**Now (5.0.0+):** Generate VPAT and compliance reports automatically.

```
User: @document-csv-reporter generate-vpat audit-findings.json
Agent: [Exports findings mapped to WCAG 2.2 AA and Section 508]
Agent: [Generates VPAT template with compliance assertions]
Output: compliance-report.xlsx
```

### 3. Continuous Evaluation & Trending

**Before (4.x):** One-off audits; no trend tracking.
**Now (5.0.0+):** Track accessibility scores over time; identify improvement or regression.

**Capability:**
```
Hook configuration:
{
  "name": "continuous-eval",
  "event": "on-schedule",
  "schedule": "0 2 * * 0",  // Weekly
  "track": {
    "metrics": ["page-score", "error-count"],
    "baseline": "2026-01-01",
    "frequency": "weekly"
  }
}

Output: Trend report showing score changes week-over-week
```

### 4. Multi-Platform Parity

**Before (4.x):** VS Code Copilot only.
**Now (5.0.0+):** Same agents run on:
- GitHub Copilot (VS Code)
- Claude Code (CLI)
- Gemini CLI
- Claude Desktop
- Codex CLI

---

## Curriculum Learning Pathways

### Path 1: Web Accessibility (Foundational)

**Prerequisite chapters:** 1-10 (GitHub fundamentals)

**Learning sequence:**
1. Chapter 11: VS Code interface
2. Chapter 16: GitHub Copilot introduction
3. Chapter 19: Accessibility Agents (Web team) - Chapters/Appendices L, K
4. Appendix M: Accessibility standards (WCAG 2.2 AA reference)
5. Challenges 19.1-19.3: Web accessibility audits with `@web-accessibility-wizard`

**Agents used:** 40 web/accessibility specialists; 5 GitHub workflow agents

**Time commitment:** 4-6 hours self-paced

### Path 2: Document Accessibility (Intermediate)

**Prerequisite:** Path 1 (web accessibility) or Chapter 19 overview

**Learning sequence:**
1. Appendix AC: Document & Developer Tool Agents (Document section)
2. Challenge 19.4: Audit Word/Excel/PowerPoint with `@office-accessibility` agents
3. Challenge 19.5: Remediate documents with `@office-remediator`
4. Appendix AA: Installation & Setup (Platform-specific guide)

**Agents used:** 15 document agents; compliance export agents

**Time commitment:** 2-3 hours self-paced

### Path 3: Developer Tools & Automation (Advanced)

**Prerequisite:** Path 1 or strong Python/testing background

**Learning sequence:**
1. Appendix AC: Document & Developer Tool Agents (Developer section)
2. Appendix AB: Advanced Agent Patterns & Skills (Hooks, Skills authoring)
3. Challenge 19.6: Set up CI/CD accessibility checks with `@ci-accessibility`
4. Challenge 19.7: Build desktop app with `@python-specialist` and `@wxpython-specialist`
5. Appendix AA: Installation (Troubleshooting section for CI/CD)

**Agents used:** 8 developer tool agents; 25+ skills library

**Time commitment:** 6-8 hours self-paced

### Path 4: Multi-Platform Agents (Optional)

**Prerequisite:** Chapter 19 (basic Copilot knowledge)

**Learning sequence:**
1. Appendix K: Copilot Reference (5-platform comparison table)
2. Appendix AA: Installation & Setup (Platform-specific sections)
3. Appendix AB: Advanced Patterns (Skill-first workflows across platforms)
4. Challenge 19.8: Run same agent on different platforms; compare outputs

**Agents used:** Any agent; compare behavior across platforms

**Time commitment:** 2-3 hours self-paced (mostly experimentation)

---

## Contribution Pathways for Facilitators

### Adding a New Agent to Curriculum

**When to propose a new agent:**
- New accessibility domain not yet covered (e.g., internationalization, performance)
- Platform-specific agent (macOS/Linux/mobile-specific)
- New Agents 5.0+ feature (compliance export, hooks, etc.)

**Proposal process:**

1. **File an issue** in [git-going-with-github](https://github.com/Community-Access/git-going-with-github/issues) with:
   - Agent name and purpose
   - Which team it belongs to (Accessibility, GitHub Workflow, Developer Tools)
   - Which chapter/appendix should reference it
   - Example use case for learners

2. **Create a challenge** if the agent is significant enough:
   - Challenge 19.X: "[Agent Name] - [Task description]"
   - Include success criteria (e.g., "Run agent, interpret findings, propose 3 fixes")
   - Link to relevant agent documentation

3. **Update appendices:**
   - Appendix L: Add row to appropriate team table
   - Appendix AB or AC: Add detailed section if advanced/specialized

4. **Generate podcast episode** if content is substantial (> 20 min material)

### Creating Custom Hooks for Classroom Use

**Use case:** Enforce accessibility standards across a GitHub Classroom cohort.

**Hook template:**

```json
{
  "name": "classroom-accessibility-gate",
  "event": "on-commit",
  "pattern": "src/**/*.{jsx,tsx,html}",
  "agent": "@web-accessibility-wizard",
  "condition": "severity >= 'error'",
  "action": "create-issue",
  "labels": ["accessibility", "cohort-1", "blocking"],
  "message": "Accessibility violations found. Use @web-issue-fixer to resolve before merge."
}
```

**To add to curriculum:**
1. Document the hook in admin guides (FACILITATOR_GUIDE.md, CLASSROOM_INTEGRATION_GUIDE.md)
2. Create step-by-step setup instructions for facilitators
3. Add troubleshooting section (e.g., "hook not triggering")

### Updating Podcast Episodes

**Files requiring regeneration with each curriculum version:**

| Episode | File | Trigger | Regenerate When |
|---------|------|---------|-----------------|
| 17 | Chapter 19 | Agents expanded from 55→80, platforms added | Ch 19 expanded |
| 39 | Appendix L | Agents/platforms/skills added | App L expanded |
| 40 | Appendix K | MCP, 5-platform coverage, Copilot features | App K expanded |
| NEW | Appendix AA | Agent installation guide | When App AA added |
| NEW | Appendix AB | Advanced patterns, hooks, skills | When App AB added |
| NEW | Appendix AC | Document and developer agents | When App AC added |

**Podcast generation process:**
1. Review chapter/appendix changes in git diff
2. Extract key learning points (3-5 min main content)
3. Record Alex + Jamie conversation (see https://lp.csedesigns.com/ggg/PODCASTS.html for style guide)
4. Add full transcript below audio player
5. Update RSS feed and release notes

---

## Infrastructure: Agents Ecosystem Reference

### Three Teams, 80 Agents, 5 Platforms

```
Accessibility Agents 5.0.0
├── Team 1: Accessibility (40 agents)
│   ├── Web (26): Specialists, wizards, coaches
│   ├── Document (14): Word, Excel, PowerPoint, PDF, EPUB
│   └── Skills (25+): Reusable workflows
├── Team 2: GitHub Workflow (20 agents)
│   ├── Repository ops (12)
│   ├── Project management (5)
│   └── Analytics & monitoring (3)
├── Team 3: Developer Tools (18 agents)
│   ├── Python & GUI (2)
│   ├── Testing & CI/CD (4)
│   ├── Desktop accessibility (3)
│   └── NVDA & screen readers (3)
└── Multi-Platform Support (5)
    ├── GitHub Copilot (VS Code)
    ├── Claude Code (CLI)
    ├── Gemini CLI
    ├── Claude Desktop (MCP)
    └── Codex CLI (TOML)
```

### Core Skills (25+)

**Categories:**
- Web scanning & severity scoring (2)
- Document scanning & compliance (2)
- Markdown accessibility (3)
- CI/CD integration (2)
- Framework-specific patterns (3)
- Python & testing (3)
- Troubleshooting & reference (7+)

**Skills are bundled with agents**, meaning:
- Agents use skills internally (not visible to learners by default)
- Advanced users can invoke skills directly via slash commands
- Facilitators can create custom skills for classroom use

### MCP Server (30+ Tools)

MCP (Model Context Protocol) provides standardized tool access across platforms.

**Tool categories:**
- Web scanning (8): page, pages, DOM, Lighthouse, Playwright, etc.
- Document (10): Word, Excel, PowerPoint, PDF, EPUB scanning
- Markdown (4): scanning, linting, validation
- Compliance (5): severity scoring, WCAG mapping, VPAT generation
- CI/CD (3+): GitHub Actions integration, artifact parsing

---

## Roadmap: Agents 5.x → 6.0 (Future)

### Planned Features

| Feature | Target Version | Status | Impact on Curriculum |
|---------|----------------|--------|----------------------|
| **Mobile Accessibility Agents** | 5.5 | In development | New appendix section (iOS/Android) |
| **International/i18n Agents** | 5.5 | Planned | New challenge: multi-language document audit |
| **AI Training Data Accessibility** | 6.0 | Research | New chapter or appendix on responsible AI |
| **Custom Agent Builder UI** | 6.0 | Planned | Tool for non-technical users to create agents |
| **Real-time Collaboration** | 6.0 | Research | Multi-user document audit with comments |

---

## Maintenance Tasks (By Semester)

### Spring 2026
- [x] Expand agents from 55 to 80 (document + dev tools teams)
- [x] Create appendices AA, AB, AC with comprehensive guides
- [x] Add multi-platform support to curriculum (5 platforms)
- [ ] Regenerate podcasts for Episodes 17, 39, 40 and new Episodes 41-43

### Summer 2026
- [ ] Create mobile accessibility challenge (iOS VoiceOver, Android TalkBack)
- [ ] Update facilitator guides with classroom CI/CD hook examples
- [ ] Propose new agent for internationalization testing

### Fall 2026
- [ ] Align curriculum with Agents 5.5 (if released)
- [ ] Create certification pathway for facilitators (Agent Trainer Badge)
- [ ] Document custom skill examples from community contributions

---

## References

- [Accessibility Agents Repository](https://github.com/Community-Access/accessibility-agents)
- [Accessibility Agents Releases](https://github.com/Community-Access/accessibility-agents/releases)
- [Git Going with GitHub Curriculum](s:/code/git-going-with-github)
- [Curriculum Issues & PRs](https://github.com/Community-Access/git-going-with-github/issues)

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

- **Overview:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Version Alignment:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Key Transitions: What Changed Between 4.x → 5.0.0:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Curriculum Learning Pathways:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Contribution Pathways for Facilitators:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Infrastructure: Agents Ecosystem Reference:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Roadmap: Agents 5.x → 6.0 (Future):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Maintenance Tasks (By Semester):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **References:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
