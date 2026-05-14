# Solution Reference: Challenge 16 -- Capstone Project

This shows one complete capstone path with annotations. Accessibility Agents is the default example because the autograder can validate agent file structure there. GLOW or another repository can also meet the challenge when the evidence shows a clear mission, responsibilities, guardrails, and review-ready work.

## Example agent file

**File:** `community-agents/workshop-buddy.agent.md`

```markdown
---
# YAML frontmatter -- metadata about the agent
name: Workshop Buddy
description: A friendly guide that helps students navigate the Git Going with GitHub workshop
tools: []
---

# Workshop Buddy

## Responsibilities

<!-- This section defines what the agent is designed to do -->

- Answer questions about workshop challenges and point students to the right chapter
- Explain Git and GitHub concepts in beginner-friendly language
- Suggest next steps when a student is stuck on a challenge
- Remind students about accessibility best practices in their contributions

## Guardrails

<!-- This section defines what the agent should NOT do -->

- Do not complete challenges for the student -- guide, do not solve
- Do not make changes to repository files directly
- Do not provide answers to challenge evidence prompts
- Do not access external services or APIs
- If asked about topics outside the workshop scope, say so honestly and suggest other resources

## Example interactions

**Student asks:** "I am stuck on Challenge 7. What are conflict markers?"

**Agent responds:** Conflict markers are lines Git adds when it cannot automatically
merge two changes. They look like `<<<<<<< HEAD`, `=======`, and `>>>>>>>`. You need
to decide which version to keep and delete the marker lines. See Chapter 7 for a
walkthrough.

**Student asks:** "Write my PR description for me."

**Agent responds:** I cannot write your PR description because that is the evidence
for Challenge 6. But I can help you think about what to include. What did you change,
and why? Start with those two sentences and you have a strong description.
```

## PR description for the Accessibility Agents path

```markdown
## New agent: Workshop Buddy

This agent helps students navigate the Git Going with GitHub workshop by answering
questions about challenges, explaining Git concepts, and suggesting next steps.

### Design decisions

- **Guide, do not solve:** The guardrails prevent the agent from completing challenges,
  because the learning happens in the doing
- **Scoped to the workshop:** The agent is honest about its boundaries rather than
  guessing at topics it was not designed for
- **Accessibility aware:** Reminders about inclusive contribution practices are part
  of the agent's responsibilities

### Checklist

- [x] YAML frontmatter with name and description
- [x] Responsibilities section
- [x] Guardrails section
- [x] Example interactions showing both helpfulness and boundaries
```

## Alternate valid capstone paths

Any focused, useful contribution can work. Other examples include:

- A GLOW agent that helps contributors choose between Audit, Fix, Template, Export, and Convert workflows
- A GLOW prompt that reviews release notes for user-facing accessibility impact
- Custom instructions that prevent inaccessible UI patterns in a project you maintain
- A documentation update that explains how to test a repository with keyboard, screen reader, and high contrast workflows
- A draft issue proposing a future agent, with mission, responsibilities, guardrails, and test plan

## What matters

The learning objective is understanding that agentic work is defined by purpose, responsibilities, and guardrails. If your evidence identifies a real repository, explains who the contribution helps, defines concrete responsibilities, names boundaries, and is ready for review, you completed this challenge. The creativity of the concept is a bonus, not a requirement.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Example agent file:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Guardrails:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Example interactions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **PR description for the Accessibility Agents path:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **New agent: Workshop Buddy:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Alternate valid capstone paths:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
