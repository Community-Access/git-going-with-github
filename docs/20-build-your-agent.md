# Build Your Agent: The Capstone Project

> **Related appendices:** [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix K: Copilot Reference](appendix-k-copilot-reference.md) | [Appendix C: Markdown Reference](appendix-c-markdown-reference.md)
> **Authoritative sources:** [VS Code Docs: Chat participants](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants) | [GitHub Docs: About GitHub Copilot agents](https://docs.github.com/en/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat)


> **Day 2, Block 4 Material (Capstone)**
>
> Everything you have learned comes together here. You will design, build, and contribute an accessibility agent to the [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository. This is a real contribution to a real project -- your agent will join the roster of 55+ agents serving 3 accessibility teams across 5 platforms.

## Table of Contents

1. [The Capstone Challenge](#1-the-capstone-challenge)
2. [Phase 1: Choose Your Agent's Mission](#2-phase-1-choose-your-agents-mission)
3. [Phase 2: Write the Agent File](#3-phase-2-write-the-agent-file)
4. [Phase 3: Define Responsibilities and Guardrails](#4-phase-3-define-responsibilities-and-guardrails)
5. [Phase 4: Test Your Agent Locally](#5-phase-4-test-your-agent-locally)
6. [Phase 5: Open Your Pull Request](#6-phase-5-open-your-pull-request)
7. [Phase 6: Respond to Review](#7-phase-6-respond-to-review)
8. [Capstone Rubric](#8-capstone-rubric)
9. [Example Agents for Inspiration](#9-example-agents-for-inspiration)
10. [If You Get Stuck](#10-if-you-get-stuck)

---

> **Challenge 16: Build Your Agent (Capstone).** This is the culminating challenge of the workshop. You will fork, write, test, and contribute an accessibility agent.

## 1. The Capstone Challenge

The capstone is Challenge 16 -- the final challenge of the workshop. You will:

1. Choose a mission for a new accessibility agent (or improve an existing one)
2. Write an agent file with valid YAML frontmatter
3. Define clear responsibilities and guardrails
4. Test the agent locally with GitHub Copilot
5. Open a pull request from your fork to the upstream repository
6. Respond to peer review feedback

This is not a simulation. Your pull request goes to a real repository. If your agent meets the quality bar, it will be merged and available to real users.

### What you need before starting

- [ ] You have forked and cloned the accessibility-agents repository ([Chapter 18](18-fork-and-contribute.md))
- [ ] You have a feature branch created: `agents/your-username-agent-name`
- [ ] You understand how to push to your fork and open a PR ([Chapter 18](18-fork-and-contribute.md))
- [ ] You have GitHub Copilot or Copilot Free active ([Chapter 16](16-github-copilot.md))
- [ ] You have explored the existing agents in [Chapter 19](19-accessibility-agents.md)

### Time estimate

Most students complete the capstone in 60 to 90 minutes. The phases are designed so you can get a working agent in 30 minutes and spend the remaining time improving it.

---

## 2. Phase 1: Choose Your Agent's Mission

> **See also:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) introduces the agent ecosystem and shows existing agents for inspiration.

### What makes a good agent mission

A good agent solves a specific, recurring problem. It does not try to do everything. Consider these questions:

- **What task do you repeat?** Think about workflow steps from Day 1 and Day 2 that felt repetitive.
- **What would a specialist know?** An agent works best when it has deep knowledge of a focused area.
- **What gap exists?** Look at the existing agents in [Chapter 19](19-accessibility-agents.md). Is there a workflow that no agent covers?

### Mission categories to consider

| Category | Example missions | Existing agents in this space |
|---|---|---|
| Accessibility auditing | Audit color contrast in CSS variables, check form labels, validate heading hierarchy | contrast-master, forms-specialist, alt-text-headings |
| Document accessibility | Check PDF reading order, audit Excel sheet names, validate Word heading structure | pdf-accessibility, excel-accessibility, word-accessibility |
| GitHub workflow | Summarize notifications, track stale issues, generate release notes | daily-briefing, issue-tracker, analytics |
| Developer tools | Validate agent files, lint markdown for accessibility, check keyboard navigation | testing-coach, link-checker, markdown-a11y-assistant |
| Education | Explain a WCAG criterion, generate quiz questions, summarize a chapter | wcag-guide |

### Write your mission statement

Before writing any code, write a one-sentence mission statement:

> "My agent helps [who] by [doing what] when [in what situation]."

Example: "My agent helps documentation authors by checking that all images in a markdown file have meaningful alt text when they open a file for review."

Write this statement in your challenge issue comment so your buddy and facilitator can give early feedback.

---

## 3. Phase 2: Write the Agent File

An agent file is a Markdown file with YAML frontmatter that defines the agent's identity, and a body that contains the agent's instructions. Agent files live in the `.github/agents/` directory (for GitHub Copilot agents) or in team-specific directories in the accessibility-agents repository.

### File location and naming

Create your agent file at:

```text
.github/agents/your-agent-name.md
```

Use lowercase with hyphens. Example: `.github/agents/alt-text-validator.md`

### The agent file structure

Every agent file has two parts:

1. **YAML frontmatter** -- metadata between `---` markers at the top of the file
2. **Instructions body** -- Markdown content that tells the agent how to behave

### Minimal agent file template

```markdown
---
name: "Alt Text Validator"
description: "Checks that all images in markdown files have meaningful, non-placeholder alt text."
---

# Alt Text Validator

You are an accessibility specialist focused on image alt text quality in markdown documentation.

## Responsibilities

- Scan markdown files for images missing alt text
- Identify placeholder alt text like "image", "screenshot", "photo", or empty strings
- Suggest specific, descriptive alt text based on the image context
- Flag decorative images that should use empty alt text (`alt=""`)

## Guardrails

- Never modify files without explicit user approval
- Always explain why alt text needs improvement before suggesting a replacement
- Do not generate alt text for images you cannot see -- ask the user to describe the image
- Limit scope to the files the user asks about -- do not scan the entire repository unprompted
```

### YAML frontmatter fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Display name for the agent (title case, spaces allowed) |
| `description` | Yes | One-sentence description of what the agent does -- also drives **automatic invocation**: Copilot matches this text against your request and delegates to the agent without you selecting it manually |

> **Write a strong description.** Vague descriptions result in missed automatic routing.
>
> - Weak: `Helps with accessibility`
> - Strong: `Checks markdown files for accessibility issues, fixes descriptive links and heading hierarchy, and flags alt text for human review`
>
> The more specific the description, the more reliably Copilot invokes the right agent for the right task.

### Writing the instructions body

The instructions body tells the agent how to behave. Write it as if you are briefing a new team member on their first day:

- **Start with identity.** "You are a [role] focused on [area]."
- **List responsibilities.** What specific tasks does this agent handle?
- **Set guardrails.** What should the agent never do? What are its limits?
- **Provide examples.** Show what good output looks like.

> **Screen reader note:** The agent file is plain Markdown. There are no special tools needed to write it. Use any text editor.

### Learning Cards: Writing the Agent File

<details>
<summary>Screen reader users</summary>

- Create your agent file with `Ctrl+N`, then `Ctrl+S` and save to `.github/agents/your-agent-name.md` -- the Explorer navigates to the folder automatically
- Use `Ctrl+Shift+O` to navigate between YAML frontmatter fields and Markdown headings (Responsibilities, Guardrails) in your agent file
- The YAML frontmatter is between `---` markers at the top -- your screen reader announces these as horizontal rules

</details>

<details>
<summary>Low vision users</summary>

- Agent files are standard Markdown -- open Markdown Preview (`Ctrl+Shift+V`) side by side to verify formatting as you write
- The YAML frontmatter at the top uses `name:` and `description:` fields -- keep these on separate lines for readability at high zoom
- Use a consistent heading hierarchy (# for title, ## for sections) so the Outline view (`Ctrl+Shift+O`) shows a clean structure

</details>

<details>
<summary>Sighted users</summary>

- Agent files follow a standard pattern: YAML frontmatter at the top, then identity statement, responsibilities, guardrails, and examples
- Use the Outline view (`Ctrl+Shift+O`) to see your agent file's structure at a glance and navigate between sections
- Copy the template from this chapter as a starting point -- replace the placeholder content with your agent's specific instructions

</details>

---

## 4. Phase 3: Define Responsibilities and Guardrails

Responsibilities and guardrails are the most important parts of your agent's instructions. The autograder checks that both sections exist.

### Writing responsibilities

Responsibilities define what the agent does. Be specific and actionable:

**Good responsibilities (specific):**

- Scan HTML files for `<img>` tags missing the `alt` attribute
- Check that all `<button>` elements have visible text or an `aria-label`
- Verify heading levels do not skip (e.g., `h1` to `h3` without `h2`)

**Weak responsibilities (vague):**

- Help with accessibility
- Check code
- Find problems

Each responsibility should describe one discrete action the agent can take.

### Writing guardrails

Guardrails define what the agent must not do. They prevent the agent from overstepping, giving harmful advice, or acting without permission:

**Good guardrails:**

- Never auto-fix code without asking the user first
- Do not provide medical, legal, or financial advice when discussing accessibility compliance
- Limit reviews to the files the user specifies -- do not scan the entire repository
- If a finding is uncertain, say so explicitly rather than presenting it as definitive
- Do not remove existing accessibility attributes unless they are demonstrably incorrect

**Why guardrails matter:** An agent without guardrails will confidently do things it should not. A contrast checker that silently changes your CSS colors is dangerous. A document reviewer that deletes "unnecessary" alt text is destructive. Guardrails are how you make an agent safe.

### Learning Cards: Responsibilities and Guardrails

<details>
<summary>Screen reader users</summary>

- Use `## Responsibilities` and `## Guardrails` as exact heading names -- the autograder searches for these strings
- Each responsibility should start with a verb (Scan, Check, Verify, Flag) -- this makes them concrete and testable
- Guardrails should start with "Never" or "Do not" to set clear boundaries your screen reader identifies as restrictions when reviewing the file

</details>

<details>
<summary>Low vision users</summary>

- Format responsibilities as a bulleted list (starting with `-`) for easy scanning at high zoom -- one responsibility per bullet
- Keep each guardrail to a single line so it remains visible without horizontal scrolling at your zoom level
- Use bold text for emphasis on critical guardrails (e.g., **Never modify files without approval**) to improve visual scanning

</details>

<details>
<summary>Sighted users</summary>

- The autograder checks for "Responsibilities" and "Guardrails" headings -- use exactly these words as `## ` headings
- Aim for 4-6 responsibilities and 3-5 guardrails -- too few makes the agent vague, too many makes it rigid
- Compare your responsibilities against the example agents in Section 9 to calibrate specificity

</details>

---

## 5. Phase 4: Test Your Agent Locally

> **See also:** [Chapter 18: Fork and Contribute](18-fork-and-contribute.md) covers the fork-and-PR workflow you will use to submit your agent.

Before opening a pull request, test your agent to verify it works.

### Testing with GitHub Copilot Chat

1. Open VS Code with the accessibility-agents repository.
2. Ensure your agent file is saved in `.github/agents/`.
3. Open GitHub Copilot Chat (`Ctrl+Alt+I`) or run **Chat: Open Chat** from the Command Palette.
4. Invoke your agent by name: `@your-agent-name check this file for accessibility issues`
5. Observe the response. Does the agent:
   - Understand its mission?
   - Follow its responsibilities?
   - Respect its guardrails?

### Testing checklist

- [ ] The agent responds when invoked by name
- [ ] The agent stays within its defined responsibilities
- [ ] The agent does not violate any guardrails
- [ ] The agent's output is useful and specific
- [ ] The agent handles edge cases gracefully (empty files, no issues found)

### Iterating on your agent

If the agent does not behave as expected:

1. Read its instructions carefully. Is anything ambiguous?
2. Add more specific instructions or examples.
3. Test again with the same prompt.
4. Repeat until the behavior matches your intent.

Most students iterate 2-3 times before they are satisfied.

### Learning Cards: Testing Your Agent

<details>
<summary>Screen reader users</summary>

- Open Copilot Chat (`Ctrl+Alt+I`) or run **Chat: Open Chat** from the Command Palette, then type `@your-agent-name` followed by a test prompt -- your screen reader announces the response as it streams
- Press `Alt+F2` after the response finishes to read the full output in Accessible View with arrow keys
- If the agent does not respond as expected, edit the `.agent.md` file and ask again -- Copilot picks up changes immediately

</details>

<details>
<summary>Low vision users</summary>

- Agent responses appear in the Copilot Chat panel -- widen the panel by dragging its left edge for better readability
- Test with a simple prompt first (e.g., "review this file") and read the full response before trying complex requests
- Use Accessible View (`Alt+F2`) to read responses at your preferred editor font size instead of the Chat panel's default

</details>

<details>
<summary>Sighted users</summary>

- Type `@agent-name` in Copilot Chat followed by your test prompt -- look for the agent name in the response header confirming it was invoked
- Check that the response follows your Responsibilities section and does not violate any Guardrails
- Iterate by editing the agent file and re-testing until the output matches your expectations

</details>

---

## 6. Phase 5: Open Your Pull Request

### Tool Cards: Open Your Capstone PR

**VS Code Desktop (primary for Day 2):**
1. Push your branch: `Ctrl+Shift+P` > **Git: Push**.
2. `Ctrl+Shift+P` > **GitHub Pull Requests: Create Pull Request**.
3. Set base repo to `Community-Access/accessibility-agents`, fill in the title and description.

**github.com (browser):**
1. Navigate to your fork on GitHub.
2. Click **Contribute > Open pull request**.
3. Verify the base is `Community-Access/accessibility-agents:main` and the compare is your branch.

**GitHub CLI:**
```bash
git push -u origin your-branch
gh pr create --repo Community-Access/accessibility-agents
```

You have a working agent file. Now contribute it.

### Pre-PR checklist

Before opening your PR, verify:

- [ ] Your agent file has valid YAML frontmatter (name and description fields)
- [ ] Your agent file has a Responsibilities section
- [ ] Your agent file has a Guardrails section
- [ ] The file is in the correct directory
- [ ] You have committed and pushed to your fork

### Open the PR

Follow the pull request steps from [Chapter 18, Step 7](18-fork-and-contribute.md#9-step-7-open-a-pull-request):

1. Push your branch: `git push -u origin agents/your-username-agent-name`
2. Go to the upstream repository on GitHub.com.
3. Click the banner or go to Pull Requests and click **New pull request**, then **compare across forks**.
4. Select your fork and branch.
5. Write a PR title: "Add [agent-name] accessibility agent"
6. In the PR body, include:
   - Your mission statement from Phase 1
   - What the agent does (summary of responsibilities)
   - Any design decisions you made
   - How you tested it
7. Create the pull request.

### The autograder

The repository has an autograding workflow that runs on every pull request. It checks:

| Check | What it verifies | Points |
|---|---|---|
| Agent file exists | A `.md` file exists in the agents directory | 10 |
| YAML frontmatter is valid | The file starts with `---`, contains `name` and `description`, and ends with `---` | 15 |
| Responsibilities section | The file contains a heading or section titled "Responsibilities" | 15 |
| Guardrails section | The file contains a heading or section titled "Guardrails" | 20 |
| **Total** | | **60** |

The autograder posts results as a comment on your PR. If any checks fail, read the comment, fix the issue, commit, and push. The autograder re-runs automatically.

### Learning Cards: Opening Your Pull Request

<details>
<summary>Screen reader users</summary>

- The autograder comment appears in the PR timeline -- navigate to Comments on GitHub.com with `h` (heading navigation) to find the results
- Each autograder check is listed with a pass/fail status and point value -- listen for "10/10" or "0/15" to identify which checks need attention
- If a check fails, read the failure message, fix the issue locally, commit, push, and the autograder re-runs automatically

</details>

<details>
<summary>Low vision users</summary>

- The autograder results appear as a comment with a table showing checks, points, and pass/fail status -- zoom with `Ctrl+=` to read the details
- Green checkmarks indicate passing checks; red X marks indicate failures -- pair with High Contrast theme for clearest visibility
- Your PR description should include your mission statement, responsibilities summary, and testing notes

</details>

<details>
<summary>Sighted users</summary>

- The autograder comment on your PR shows a table with four checks and a total score out of 60
- Green checkmarks = passing, red X = failing -- fix failures and push to trigger a re-run
- Include your mission statement, agent summary, and test results in the PR description for reviewers

</details>

---

## 7. Phase 6: Respond to Review

After the autograder passes, a peer reviewer (your buddy or another student) and a facilitator will review your agent.

### What reviewers look for

- **Clarity:** Are the instructions easy to understand?
- **Specificity:** Are responsibilities concrete and actionable?
- **Safety:** Are guardrails sufficient to prevent harmful behavior?
- **Usefulness:** Would this agent actually help someone?
- **Scope:** Does the agent try to do too much or too little?

### Responding to feedback

This is the same process from [Chapter 18, Step 8](18-fork-and-contribute.md#10-step-8-respond-to-review-feedback):

1. Read each review comment.
2. Make changes locally.
3. Commit and push. The PR updates automatically.
4. Reply to each comment explaining your changes.

### When your PR is merged

Congratulations. Your agent is now part of the accessibility-agents ecosystem. It is available to anyone who uses the repository. This is a real open source contribution, and it demonstrates:

- You can navigate the fork workflow end to end
- You can write clear, structured technical documentation
- You understand accessibility concepts well enough to teach an AI agent about them
- You can respond constructively to code review

---

## 8. Capstone Rubric

The capstone is worth 60 autograded points plus peer review. Here is the complete rubric:

### Autograded (60 points)

| Criterion | Points | What the autograder checks |
|---|---|---|
| Agent file exists | 10 | A Markdown file exists in the agents directory |
| Valid YAML frontmatter | 15 | File has `---` delimiters, `name` field, `description` field |
| Responsibilities defined | 15 | A section with the heading "Responsibilities" exists and contains content |
| Guardrails defined | 20 | A section with the heading "Guardrails" exists and contains content |

### Peer review (qualitative)

| Criterion | What reviewers assess |
|---|---|
| Mission clarity | Can a reader understand what the agent does in 10 seconds? |
| Instruction quality | Are instructions specific enough that the agent behaves consistently? |
| Guardrail coverage | Do the guardrails prevent the most obvious failure modes? |
| Contribution standards | Does the PR follow the project's conventions and include a good description? |

### What "meets expectations" looks like

A capstone that meets expectations has:

- A focused mission (not "help with accessibility" -- something specific)
- At least 3 concrete responsibilities
- At least 3 meaningful guardrails
- A PR description that explains the agent's purpose
- All autograder checks passing

### What "exceeds expectations" looks like

A capstone that exceeds expectations also has:

- Examples of expected input and output in the agent instructions
- A section describing the agent's limitations
- Evidence of testing (screenshots or transcripts in the PR description)
- Thoughtful responses to review feedback

---

## 9. Example Agents for Inspiration

These examples show the range of valid agent designs. Your agent does not need to be this long, but it should be this clear.

### Example 1: Heading Hierarchy Checker

**Mission:** Validates that HTML and Markdown documents follow a correct heading hierarchy (no skipped levels).

**Responsibilities:**

- Scan files for heading elements (`h1` through `h6` in HTML, `#` through `######` in Markdown)
- Report any instance where a heading level is skipped (e.g., `h2` followed by `h4`)
- Suggest the correct heading level for each violation
- Check that there is exactly one `h1` per page

**Guardrails:**

- Do not modify files -- only report findings
- Do not change heading text, only heading levels
- If a heading structure decision is ambiguous, present both options and let the user decide

### Example 2: PR Description Quality Gate

**Mission:** Reviews pull request descriptions to ensure they contain enough context for reviewers.

**Responsibilities:**

- Check that the PR description is at least 50 characters
- Verify the description references an issue with `Closes #XX` or `Fixes #XX`
- Check for a summary of changes made
- Verify the description explains why the change was made, not just what was changed

**Guardrails:**

- Never approve or block a PR based solely on description quality
- Do not rewrite the description for the author -- suggest improvements
- Respect that different projects have different template requirements

### Example 3: Keyboard Navigation Auditor

**Mission:** Checks web components for keyboard accessibility compliance.

**Responsibilities:**

- Verify all interactive elements are reachable via Tab key
- Check that custom components have appropriate `tabindex` values
- Validate that focus order follows visual layout
- Detect keyboard traps (elements that receive focus but cannot release it via keyboard)

**Guardrails:**

- Do not modify component code without user approval
- Flag potential issues with confidence levels (certain, likely, possible)
- Acknowledge that some keyboard patterns depend on runtime behavior that cannot be verified from source code alone

---

## 10. If You Get Stuck

| Problem | What to do |
|---|---|
| Cannot think of an agent idea | Look at the existing agents in [Chapter 19](19-accessibility-agents.md). What adjacent task is not covered? |
| YAML frontmatter is invalid | Check that you have `---` on its own line at the start and end. Verify `name` and `description` are quoted strings. |
| Autograder says "Responsibilities section not found" | Make sure you have a Markdown heading that says exactly `## Responsibilities`. |
| Autograder says "Guardrails section not found" | Make sure you have a Markdown heading that says exactly `## Guardrails`. |
| Agent does not respond in Copilot Chat | Verify the file is saved in `.github/agents/` and has a `.md` extension. Restart Copilot Chat. |
| Agent ignores its guardrails | Add more explicit instructions. Instead of "be careful," say "Never do X under any circumstances." |
| PR fails to open across forks | Verify you are comparing your fork's branch against the upstream's `main`. See [Chapter 18, Step 7](18-fork-and-contribute.md#9-step-7-open-a-pull-request). |
| Reviewer feedback feels overwhelming | Address one comment at a time. Start with the smallest change. Reply to each comment individually. |
| I finished but I am not sure I did it right | Compare your work against the [Challenge 16 reference solution](solutions/solution-16-capstone.md). If your agent file has valid frontmatter, responsibilities, and guardrails, you succeeded. |

### The universal safety net

If everything else fails, post this on your challenge issue:

> I attempted Challenge 16 and here is what happened:
>
> **What I tried:** [specific actions]
> **What I expected:** [what should have happened]
> **What actually happened:** [error or unexpected result]
> **What I learned:** [even from failure, what do I understand now?]

This is always accepted. A student who explains a failure thoughtfully has learned more than one who followed the happy path without thinking.

---

*Next: [Chapter 21: Next Steps](21-next-steps.md)*  
*Back: [Chapter 19: Accessibility Agents](19-accessibility-agents.md)*  
*Related appendices: [Appendix L: Agents Reference](appendix-l-agents-reference.md) | [Appendix K: Copilot Reference](appendix-k-copilot-reference.md)*

