# Capstone Project: Contribute an Impactful Agent

> **Related appendices:** [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix K: Copilot Reference](appendix-k-copilot-reference.md) | [Appendix C: Markdown Reference](appendix-c-markdown-reference.md)
> **Authoritative sources:** [VS Code Docs: Custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) | [VS Code Docs: Agents window](https://code.visualstudio.com/docs/copilot/agents/agents-window) | [GitHub Docs: About GitHub Copilot agents](https://docs.github.com/en/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat)

> **Day 2, Block 4 Material (Capstone)**
>
> Everything you have learned comes together here. You will choose a real repository, design or improve an agentic contribution, test it, and prepare a pull request or contribution plan that would help that project. Accessibility Agents is still a strong default path, but it is not the only valid path.

## Table of Contents

1. [The Capstone Project](#1-the-capstone-project)
2. [Choose Your Contribution Path](#2-choose-your-contribution-path)
3. [Project Option: Accessibility Agents](#3-project-option-accessibility-agents)
4. [Project Option: GLOW](#4-project-option-glow)
5. [Project Option: Another Repository](#5-project-option-another-repository)
6. [Define Your Mission](#6-define-your-mission)
7. [Write or Improve the Agentic Asset](#7-write-or-improve-the-agentic-asset)
8. [Test Locally](#8-test-locally)
9. [Open or Prepare Your Pull Request](#9-open-or-prepare-your-pull-request)
10. [Respond to Review](#10-respond-to-review)
11. [Capstone Rubric](#11-capstone-rubric)
12. [If You Get Stuck](#12-if-you-get-stuck)

---

> **Challenge 16: Capstone Project.** This is the culminating challenge of the workshop. Your evidence can be a pull request, an agent file, a documented contribution plan, or a review-ready draft that shows clear purpose, responsibilities, and guardrails.

## 1. The Capstone Project

The capstone is bigger than one challenge and bigger than one repository. Challenge 16 is the checkpoint where you show evidence. The chapter is the project guide.

You will:

1. Choose a repository where an agentic contribution would be useful.
2. Identify a real audience and a real workflow gap.
3. Create or improve an agent, prompt, custom instruction, skill, workflow, or documentation page that helps that repository.
4. Define clear responsibilities and guardrails.
5. Test the contribution locally or document how it should be tested.
6. Open a pull request, prepare a review-ready branch, or write a contribution plan when you do not have repository access.
7. Respond to review or describe what review feedback you would seek.

This is not a simulation. Your work should be useful to a real maintainer, even if it remains a draft during the workshop.

### What Counts as a Capstone Contribution

The following table lists valid capstone contribution types.

| Contribution Type | Example | Evidence |
| --- | --- | --- |
| New agent | A GLOW agent that audits uploaded-document error messages for plain language | Agent file plus testing notes |
| Improved agent | Better guardrails for an Accessibility Agents reviewer agent | Diff or PR link plus explanation |
| Prompt or slash command | A prompt that guides maintainers through release-note updates | Prompt file plus example run |
| Custom instructions | Repo-specific instructions that prevent inaccessible UI patterns | Instructions file plus scope explanation |
| Skill or rule reference | A reusable rule pack for large-print document checks | Skill draft plus source notes |
| Documentation update | A contribution guide that explains how to add agents safely | PR link or review-ready draft |
| Issue triage plan | A scoped proposal for an agent the project should build next | Issue draft with mission, impact, and guardrails |

### What You Need Before Starting

- [ ] You understand the fork, branch, commit, push, and PR workflow from [Chapter 18](18-fork-and-contribute.md).
- [ ] You have GitHub Copilot or Copilot Free active from [Chapter 16](16-github-copilot.md).
- [ ] You have explored Accessibility Agents in [Chapter 19](19-accessibility-agents.md), even if you choose a different capstone repository.
- [ ] You know which repository you want to help and why.
- [ ] You can explain the impact of your contribution in one or two sentences.

### Time Estimate

Most students complete a workshop-ready capstone in 60 to 90 minutes. A polished pull request can take longer, especially when the target project has tests, review requirements, or unfamiliar architecture. It is acceptable to finish the workshop with a clear draft and continue asynchronously.

---

## 2. Choose Your Contribution Path

Freedom is encouraged. Choose a repository where your work can be genuinely useful.

The following table compares the recommended paths.

| Path | Best For | Good Contribution Ideas |
| --- | --- | --- |
| Accessibility Agents | Learners who want the most direct agent-building path | Add a focused agent, improve guardrails, update docs, refine prompts, improve skills |
| GLOW | Learners interested in document accessibility, large print, Office files, web apps, desktop apps, or user workflows | Add a GLOW-focused agent, improve `.github` customizations, document contributor workflows, propose rule coverage |
| Another repository | Learners with a project they already care about | Add project-specific custom instructions, an agent for maintainer workflows, accessible contribution docs, or issue templates |

### Choosing Well

Ask these questions before you choose:

- **Impact:** Who would benefit if this contribution were merged?
- **Fit:** Does the repository already use agents, prompts, instructions, skills, or automation?
- **Scope:** Can you make a useful change in one small pull request?
- **Access:** Can you fork the repository or create a draft in your own fork?
- **Safety:** Can you define guardrails that prevent the agent from overreaching?

---

## 3. Project Option: Accessibility Agents

[Accessibility Agents](https://github.com/Community-Access/accessibility-agents) is the default capstone path because it is built around agents, prompts, instructions, skills, and accessibility workflows.

Current local inventory checked May 13, 2026:

| Asset Type | Count |
| --- | ---: |
| Agent files (`*.agent.md`) | 83 |
| Prompt files (`*.prompt.md`) | 132 |
| Instruction files (`*.instructions.md`) | 10 |
| Skill files (`SKILL.md`) | 207 |
| Top-level GitHub Copilot agents in `.github/agents/` | 80 |

### Why Choose Accessibility Agents

- You want to build or improve an actual agent.
- You want clear examples to copy and adapt.
- You want your contribution to help accessibility reviewers, developers, document remediators, GitHub maintainers, or assistive technology users.
- You want the Challenge 16 autograder path that validates agent frontmatter, responsibilities, and guardrails.

### Good Accessibility Agents Contributions

- Add a small specialist agent for an uncovered accessibility workflow.
- Improve an existing agent's guardrails or output format.
- Update stale counts, platform names, or release-note guidance in documentation.
- Add examples that show how screen reader, low vision, keyboard-only, and sighted users should use an agent.
- Improve prompt files so they produce more structured, reviewable output.
- Improve a skill reference with clearer severity scoring or remediation guidance.

---

## 4. Project Option: GLOW

[GLOW](https://github.com/Community-Access/glow) stands for **Guided Layout & Output Workflow**. It is a multi-surface accessibility toolkit for auditing, fixing, converting, and generating accessible documents. It includes a web app, desktop tooling, a CLI-oriented workflow, a VS Code agent toolkit, and a Word add-in path.

GLOW focuses on document accessibility and large-print production. It enforces the American Council of the Blind Large Print Guidelines, APH submission guidance, Microsoft Accessibility Checker-style checks, and WCAG 2.2 AA concepts across formats such as Word, Excel, PowerPoint, Markdown, PDF, EPUB, HTML, and CSS.

Current local inventory checked May 13, 2026:

| Asset Type | Count |
| --- | ---: |
| Agent files (`*.agent.md`) | 5 |
| Prompt files (`*.prompt.md`) | 5 |
| Instruction files (`*.instructions.md`) | 1 |
| Skill files (`SKILL.md`) | 1 |

### What GLOW Does

- Audits Word, Excel, PowerPoint, Markdown, PDF, EPUB, HTML, and CSS for accessibility issues.
- Auto-fixes Word document issues where the change is deterministic, such as fonts, spacing, emphasis, headings, and margins.
- Generates ACB-compliant Word templates.
- Converts documents to Markdown, accessible HTML, Word, EPUB 3, PDF, and DAISY-oriented outputs through MarkItDown, Pandoc, LibreOffice, and related tooling.
- Provides web, desktop, CLI, VS Code, and Word add-in surfaces.
- Supports standards profiles such as ACB 2025 Baseline, APH Submission, and Combined Strict.

### Why Choose GLOW

- You care about documents, large print, Office files, or accessible publishing.
- You want a smaller agent surface where one contribution can make a visible difference.
- You want to connect agents to a real product workflow: upload, audit, fix, convert, template, export, review.
- You want to help users who may not think of themselves as developers.

### Good GLOW Contributions

- Add a GLOW agent that helps users choose between Audit, Fix, Template, Export, and Convert workflows.
- Improve the existing large-print agent instructions with clearer responsibilities and guardrails.
- Add a prompt for reviewing release notes against current GLOW features.
- Add custom instructions for web UI accessibility, plain-language findings, or large-print documentation consistency.
- Write documentation that explains how contributors should test document accessibility changes.
- Draft an issue for a future agent, such as a plain-language findings reviewer, batch-audit triage assistant, or Word add-in accessibility reviewer.

### GLOW Safety Notes

- GLOW handles documents that may contain personal, educational, medical, or organizational information. Do not put private user documents into public prompts or issues.
- Auto-fix workflows must be conservative. An agent should explain proposed fixes and preserve author intent.
- Large-print rules can affect pagination and layout. Document tradeoffs instead of pretending every fix is neutral.
- When a rule comes from ACB, APH, Microsoft Accessibility Checker, or WCAG, cite the source or name the profile.

---

## 5. Project Option: Another Repository

You may choose another repository if the contribution is meaningful and reviewable. This can be your own project, a classmate's project, a community repository, or another open source project you care about.

### Requirements for Another Repository

- The work must help the repository, not just satisfy the workshop.
- The contribution must have a clear audience.
- The contribution must be small enough to review.
- The contribution must include responsibilities and guardrails when it involves an agent or automated workflow.
- If you cannot open a pull request, write a review-ready issue or contribution plan instead.

### Good Contributions in Any Repository

- Add `.github/copilot-instructions.md` that teaches Copilot the project's accessibility and contribution standards.
- Add a custom agent for triaging issues, reviewing docs, checking release notes, or auditing accessibility.
- Add a prompt file for a repeated maintainer task.
- Improve issue templates or PR templates so contributors provide better accessibility context.
- Write contributor documentation that explains how to test with keyboard, screen reader, and high contrast workflows.

---

## 6. Define Your Mission

A good capstone mission solves a specific, recurring problem. It does not try to do everything.

Write a one-sentence mission statement before editing files:

> "My contribution helps [who] by [doing what] when [in what situation]."

Examples:

- "My agent helps GLOW contributors by checking whether release notes describe user-facing document accessibility changes clearly."
- "My prompt helps Accessibility Agents maintainers by turning a release note into repo documentation updates with screen reader, low vision, and sighted guidance."
- "My custom instructions help my project avoid inaccessible React patterns when Copilot generates forms and dialogs."

Post this mission statement in your Challenge 16 issue comment so a buddy or facilitator can give early feedback.

---

## 7. Write or Improve the Agentic Asset

Your asset may be an agent file, prompt file, instruction file, skill, or documentation update. If you are writing an agent, use the structure below.

### Agent File Location and Naming

Follow the target repository's conventions. Common locations include:

```text
.github/agents/your-agent-name.agent.md
agents/your-agent-name.agent.md
community-agents/your-agent-name.agent.md
```

Use lowercase with hyphens. Example: `.github/agents/plain-language-findings.agent.md`.

### Minimal Agent File Template

```markdown
---
name: "Plain Language Findings Reviewer"
description: "Reviews accessibility audit findings for plain language, actionable remediation, and user impact."
---

# Plain Language Findings Reviewer

You are an accessibility documentation specialist focused on making audit findings clear, actionable, and respectful.

## Responsibilities

- Review finding text for plain language and specific remediation steps
- Identify vague phrases that do not explain user impact
- Check that findings name the affected workflow or assistive technology when known
- Suggest revised wording without changing the technical meaning

## Guardrails

- Never claim a finding is fixed unless the user provides verification evidence
- Do not remove severity or WCAG references
- If the technical meaning is unclear, ask for clarification instead of guessing
- Preserve project terminology unless it is inaccurate or inaccessible
```

### YAML Frontmatter Fields

The following table describes the common agent frontmatter fields.

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Display name for the agent |
| `description` | Yes | One-sentence description of what the agent does and when it should be used |
| `tools` | Project-specific | Tool list when the target platform requires explicit tools |

### Learning Cards: Writing the Asset

<details>
<summary>Screen reader users</summary>

- Use the Command Palette to create or open files, then save the asset in the target repository's expected folder.
- Use `Ctrl+Shift+O` to move by heading and confirm that Responsibilities and Guardrails are easy to find.
- Use `Alt+F2` for long Copilot responses while testing the agent.

</details>

<details>
<summary>Low vision users</summary>

- Keep frontmatter fields on separate lines and use a consistent heading hierarchy.
- Use Markdown Preview to verify that headings, lists, and examples are visually clear.
- Avoid long single-line bullets that require horizontal scrolling at high zoom.

</details>

<details>
<summary>Sighted users</summary>

- Use the Outline view to scan the structure before testing.
- Compare your file with two existing examples in the target repository.
- Check that the file name, `name`, and description all point to the same focused mission.

</details>

---

## 8. Test Locally

Before opening a pull request, test or review your work.

### Testing With GitHub Copilot Chat

1. Open VS Code with the target repository.
2. Save your agent, prompt, instruction, or documentation file.
3. Open GitHub Copilot Chat (`Ctrl+Alt+I`) or run **Chat: Open Chat** from the Command Palette.
4. Invoke the agent or prompt if supported. Example: `@plain-language-findings review this audit finding for clarity`.
5. Observe whether the output follows the responsibilities and guardrails.
6. Revise the asset and test again.

### Testing Checklist

- [ ] The contribution has a clear mission.
- [ ] Responsibilities are specific and action-oriented.
- [ ] Guardrails prevent overreach.
- [ ] Output is useful, specific, and accessible.
- [ ] The contribution follows the target repository's naming and folder conventions.
- [ ] You documented any limitations or future work.

---

## 9. Open or Prepare Your Pull Request

### Tool Cards: Open Your Capstone PR

**VS Code Desktop:**

1. Push your branch: `Ctrl+Shift+P` then **Git: Push**.
2. Run **GitHub Pull Requests: Create Pull Request** from the Command Palette.
3. Set the base repository to the project you chose.
4. Fill in the title and description.

**GitHub.com:**

1. Navigate to your fork on GitHub.
2. Activate **Contribute** then **Open pull request**.
3. Verify the base repository and compare branch.
4. Create the pull request.

**GitHub CLI:**

```bash
git push -u origin your-branch
gh pr create --repo OWNER/REPOSITORY
```

### PR Description Checklist

- [ ] Mission statement
- [ ] Repository path chosen: Accessibility Agents, GLOW, or another project
- [ ] What changed
- [ ] Why it matters
- [ ] How you tested it
- [ ] Known limitations or follow-up ideas
- [ ] Accessibility impact

### Challenge 16 Evidence

Post one of these in your Challenge 16 issue:

- A pull request link
- A branch link with the changed file
- A draft agent file pasted or linked
- A contribution plan with mission, responsibilities, guardrails, and target repository
- A review of a peer's capstone PR or a peer-simulation PR

If you use the Accessibility Agents autograder path, it checks agent file structure in `agents/` or `community-agents/`: frontmatter, responsibilities, and guardrails. If you choose GLOW or another project, your facilitator reviews the evidence against the same principles.

---

## 10. Respond to Review

After you submit or share your capstone, a buddy, facilitator, or maintainer may review it.

Reviewers look for:

- **Clarity:** Can someone understand the contribution in 10 seconds?
- **Specificity:** Are responsibilities concrete and actionable?
- **Safety:** Do guardrails prevent harmful or overconfident behavior?
- **Usefulness:** Would this help a real user or maintainer?
- **Fit:** Does it follow the target repository's conventions?

Respond to review one comment at a time. If a reviewer asks for a change, make the edit, commit, push, and reply with what changed.

---

## 11. Capstone Rubric

The capstone is assessed as a real contribution, not just as a file format exercise.

### Core Criteria

The following table lists the capstone evaluation criteria.

| Criterion | Meets Expectations |
| --- | --- |
| Repository choice | The learner can explain why the chosen repository benefits from the contribution |
| Mission clarity | The contribution has a focused mission statement |
| Responsibilities | The agentic asset names concrete actions it should perform |
| Guardrails | The contribution includes boundaries, limitations, or safety notes |
| Accessibility impact | The work accounts for screen reader, low vision, keyboard-only, cognitive, or document accessibility needs when relevant |
| Evidence | The learner provides a PR, draft, branch, issue, or contribution plan |
| Review readiness | The contribution is small enough for someone else to review |

### What Exceeds Expectations Looks Like

- The contribution includes examples of expected input and output.
- The PR description explains tradeoffs and limitations.
- The learner tests with Copilot Chat or the VS Code Agents window and documents the result.
- The learner responds thoughtfully to review feedback.
- The contribution improves existing documentation, counts, or setup instructions alongside the agentic asset.

---

## 12. If You Get Stuck

The following table lists common capstone blockers and recovery steps.

| Problem | What To Do |
| --- | --- |
| I cannot choose a repository | Choose Accessibility Agents if you want the clearest agent path, or GLOW if you want document accessibility and large-print impact |
| I cannot think of an idea | Find one repeated maintainer task and write an agent or prompt for that task |
| I do not have permission to open a PR | Create a draft in your fork or write a contribution issue with mission, responsibilities, and guardrails |
| The repository has no agents yet | Add repo-level custom instructions or propose the first agent in a draft issue |
| My agent does too much | Split the mission until it fits one sentence |
| Copilot ignores the guardrails | Make the guardrails more explicit and test with the same prompt again |
| The external project has different conventions | Follow that project's README and CONTRIBUTING file first, then explain any uncertainty in your PR |
| I finished but I am not sure I did it right | Compare your work against the [Challenge 16 reference solution](solutions/solution-16-capstone.md), then ask for review |

### The Universal Safety Net

If everything else fails, post this on your Challenge 16 issue:

> I attempted the capstone project and here is what happened:
>
> **Repository I chose:** [repository]
> **What I tried:** [specific actions]
> **What I expected:** [what should have happened]
> **What actually happened:** [error or unexpected result]
> **What I learned:** [even from failure, what do I understand now?]

This is always useful evidence. A learner who explains a failure thoughtfully has learned more than one who followed the happy path without thinking.

---

*Next: [Chapter 21: Next Steps](21-next-steps.md)*  
*Back: [Chapter 19: Accessibility Agents](19-accessibility-agents.md)*  
*Related appendices: [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix K: Copilot Reference](appendix-k-copilot-reference.md)*

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
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **1. The Capstone Project:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Choose Your Contribution Path:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Project Option: Accessibility Agents:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Project Option: GLOW:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Project Option: Another Repository:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Define Your Mission:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **7. Write or Improve the Agentic Asset:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Guardrails:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **8. Test Locally:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **9. Open or Prepare Your Pull Request:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **10. Respond to Review:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **11. Capstone Rubric:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **12. If You Get Stuck:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
