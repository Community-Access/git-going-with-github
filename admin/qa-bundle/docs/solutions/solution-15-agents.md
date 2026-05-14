# Solution Reference: Challenge 15 -- Discover Accessibility Agents

This shows example agent discovery notes.

## Example: Three agents examined

### Agent 1: accessibility-lead

**Location:** `.github/agents/accessibility-lead.agent.md`

**Purpose:** Coordinates accessibility reviews across the team. Acts as an orchestrator that delegates to specialist agents.

**Key observation:** This agent does not do the accessibility checking itself -- it routes requests to the right specialist (ARIA, keyboard, contrast, etc.). This is a design pattern called orchestration.

### Agent 2: aria-specialist

**Location:** `.github/agents/aria-specialist.agent.md`

**Purpose:** Reviews ARIA (Accessible Rich Internet Applications) attributes in HTML and web components. Checks that interactive elements have correct roles, states, and properties.

**Key observation:** The agent instructions reference specific ARIA patterns from the W3C specification. Custom agents can encode domain expertise.

### Agent 3: keyboard-navigator

**Location:** `.github/agents/keyboard-navigator.agent.md`

**Purpose:** Ensures that all interactive elements are operable by keyboard. Checks tab order, focus management, and keyboard shortcuts.

**Key observation:** The guardrails section says it cannot test actual keyboard behavior -- it can only review code. Testing still requires a human with a keyboard.

## Example: Running an agent

**What I asked:** "@accessibility-lead review the heading structure of this file"

**What it did:** The lead agent delegated to the alt-text-headings specialist, which analyzed the heading levels and reported that the file skipped from H2 to H4.

**What I learned:** Agents can chain together. The lead interpreted my request and chose the right specialist. I did not need to know which agent handles headings.

## Example: Reading agent instructions

Looking at the `.agent.md` file structure:

- **YAML frontmatter:** Contains the agent name, description, and tool restrictions
- **Responsibilities section:** Lists what the agent is designed to do
- **Guardrails section:** Lists what the agent should NOT do or cannot do reliably

## What matters

The learning objective is understanding that AI agents are configurable tools with defined boundaries. If you examined at least one agent's instructions and can explain what it does and what it will not do, you completed this challenge.

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

- **Example: Three agents examined:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Example: Running an agent:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Example: Reading agent instructions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
