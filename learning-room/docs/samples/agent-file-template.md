# Agent File Template

Use this template as a starting point for your capstone agent (Challenge 16). Copy this file, rename it to `your-agent-name.agent.md`, and fill in each section.

## Template

```markdown
---
name: "Your Agent Name"
description: "One clear sentence describing what your agent does and who it helps."
tools: ["codebase"]
---

# Your Agent Name

## Purpose

[One paragraph explaining why this agent exists. What problem does it solve? Who benefits?]

## Responsibilities

- [What the agent does -- be specific]
- [Another thing the agent does]
- [A third responsibility]
- [Optional: a fourth responsibility]

## Guardrails

- [Something the agent must NEVER do]
- [A boundary that keeps the agent focused]
- [Optional: another safety constraint]

## Example interactions

**User asks:** "[Example question or request]"

**Agent responds:** "[Summary of how the agent would help]"
```

## Tips for writing a strong agent file

- **Name:** Choose a name that tells people what the agent does without reading the description.
- **Description:** One sentence. If you need two sentences, your agent might be trying to do too much.
- **Tools:** List tools the agent needs. `codebase` lets it read files. Other options depend on your Copilot setup.
- **Responsibilities:** Write 3-5 bullet points. Each should start with a verb (Review, Check, Suggest, Generate).
- **Guardrails:** Write 2-3 constraints. These protect users from unintended behavior. Examples: "Never modify files without user confirmation", "Never generate content that has not been verified."

## Common mistakes to avoid

- Writing responsibilities that are too vague ("Helps with code")
- Forgetting guardrails entirely (every agent needs boundaries)
- Making the description a paragraph instead of one sentence
- Missing the YAML frontmatter delimiters (`---` on their own lines)

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

- **Template:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Guardrails:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Example interactions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Tips for writing a strong agent file:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Common mistakes to avoid:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
