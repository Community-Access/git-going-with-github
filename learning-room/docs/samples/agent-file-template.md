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
