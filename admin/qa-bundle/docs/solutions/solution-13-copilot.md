# Solution Reference: Challenge 13 -- Copilot as Collaborator

This shows an example Copilot interaction and critical evaluation.

## Example interaction transcript

**Prompt to Copilot:**

> Review the alt text in docs/welcome.md and suggest improvements for screen reader users.

**Copilot response (example):**

> The image on line 42 has `alt="screenshot"` which is not descriptive. A better alternative would be: `alt="Learning Room repository page showing the Code tab with a list of files including README.md, docs folder, and .github folder"`.

## Before and after

**Before:**

```markdown
![screenshot](images/repo-overview.png)
```

**After (improved with Copilot's help):**

```markdown
![Learning Room repository Code tab showing file list with README.md, docs folder, and .github folder](images/repo-overview.png)
```

## Critical evaluation notes

Not everything Copilot suggests is correct. Here is how to evaluate:

> **What Copilot got right:** The suggestion to be more descriptive than "screenshot" is correct. Screen reader users need to understand what the image communicates, not just that it exists.
>
> **What I adjusted:** Copilot's suggested alt text was 30 words. I shortened it to 18 words while keeping the key information. Alt text should be concise.
>
> **What Copilot missed:** It did not flag that the image might be decorative (meaning `alt=""` would be appropriate). I checked -- it is informational, so descriptive alt text is correct.

## Alternate approaches

- Ask Copilot to improve documentation clarity, then evaluate whether the suggestions make sense
- Ask Copilot to check Markdown formatting, then verify its corrections
- Ask Copilot to suggest commit messages, then refine them

## What matters

The learning objective is using AI as a collaborator while maintaining your own judgment. If you used Copilot, evaluated its output critically, and made an improvement based on that evaluation, you completed this challenge.

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

- **Example interaction transcript:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Before and after:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Critical evaluation notes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Alternate approaches:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
