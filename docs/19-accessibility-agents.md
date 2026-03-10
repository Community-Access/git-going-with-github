# Accessibility Agents
>
> **Listen to Episode 17:** [Accessibility Agents](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## 55 AI Agents Across 3 Teams and 5 Platforms

> **Day 2, Block 3 Material**
>
> **Before you read this guide:**
>
> [Accessibility Agents](https://github.com/community-access/accessibility-agents) is a growing open source ecosystem: **55 AI-powered agents** organized into **three teams** (Accessibility, GitHub Workflow, and Developer Tools), running on **five platforms** (GitHub Copilot, Claude Code, Gemini CLI, Claude Desktop, and Codex CLI). This chapter introduces the full landscape. Explore the agents that match your interests and workflows - there is no fixed subset you are required to use.
>
> **The agents are only useful if you have already done the work manually.** An agent that summarizes issues is useless to someone who has never read an issue. An agent that reviews a diff is useless to someone who has never read a diff. The agent does not teach you the skill - it multiplies a skill you already have.
>
> Day 1 built those skills. This chapter shows how to amplify them with automation - and how you can contribute new agents, improve existing ones, and shape the project's future.


## Prerequisites Checklist

### Before starting this chapter, verify you have completed

### Core Prerequisites (Required for All Agents)

- [ ] Chapter 0: [Pre-Workshop Setup](00-pre-workshop-setup.md) - Git, VS Code, and GitHub account
- [ ] Chapter 13: [GitHub Copilot](16-github-copilot.md) - GitHub Copilot Chat installed and working
- [ ] GitHub Copilot access (Copilot Free tier is enough for this workshop)
- [ ] `.github/agents/` folder exists in your repository (or will create custom agents)

### Agent Prerequisites (The "Skill First" Principle)

Every agent automates a skill you should already know by hand. Before using any agent, verify you have done the corresponding manual work. This table maps common agent categories to the skills they require:

| Agent Category | You Must Have Done First | Reference |
| ----------------  | --------------------------  | ----------  |
| GitHub Workflow agents (`@daily-briefing`, `@issue-tracker`, `@pr-review`, `@analytics`) | Navigated repositories, filed issues, reviewed PRs, explored Insights | [Ch 2](03-navigating-repositories.md), [Ch 4](05-working-with-issues.md), [Ch 6](06-working-with-pull-requests.md) |
| Accessibility monitoring (`@insiders-a11y-tracker`) | Filed an accessibility bug, applied WCAG labels, checked heading hierarchy | [Ch 4](05-working-with-issues.md), [Ch 15](17-issue-templates.md) |
| Template creation (`@template-builder`) | Designed a template manually, tested field types | [Ch 15](17-issue-templates.md#7-building-an-accessibility-bug-report-template) |
| Web accessibility auditing (`@web-accessibility-wizard`, `@contrast-master`, `@keyboard-navigator`, etc.) | Understand WCAG success criteria, tested pages with a screen reader | [Appendix C](appendix-m-accessibility-standards.md) |
| Document accessibility (`@word-accessibility`, `@pdf-accessibility`, etc.) | Reviewed a document for accessibility issues manually | [Appendix C](appendix-m-accessibility-standards.md) |

This is not an exhaustive list - it illustrates the principle. Before running any agent, ask yourself: *could I do this task manually right now?* If the answer is no, learn the manual skill first.

**Estimated time for this chapter:** 1.5 hours (including exercises)


## Workshop Recommendation (Chapter 16)

Chapter 16 is the **agent exploration and hands-on validation chapter** - where students match agents to skills they already have and learn how to trust, evaluate, and improve AI-powered workflow automation.

- **Challenge count:** 3 guided + 1-2 optional contribution challenges
- **Automation check:** none (agent output requires human judgment before use)
- **Evidence:** issue comment showing agent output and your evaluation of it
- **Pattern:** explore, validate, read internals, optionally contribute
- **Key principle:** Skill First, Agent Second - **every agent requires manual prerequisite skills**

### Chapter 16 Challenge Set

1. **Agent Discovery Mapping** - identify 3-5 agents that match skills you already have from Day 1.
2. **Agent Skill Validation** - run one agent and evaluate its output against your manual experience.
3. **Agent Instructions Deep Dive** - read one agent's source file and assess what it can and cannot do.
4. **Improve an Existing Agent** (optional hackathon) - find a gap in an agent's instructions and fix it via PR.
5. **Propose a New Agent** (optional hackathon) - file an issue proposing an agent for an uncovered workflow.

### Challenge 16.1 Step-by-Step: Agent Discovery Mapping

**Goal:** Map your Day 1 manual skills to specific agents in the ecosystem so you know which agents you are ready to use.

**Where you are working:** GitHub.com - the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository and your assigned Chapter 16 challenge issue.

**Estimated time:** 20 minutes.

If 55 agents feels too broad, start with this beginner sequence:
- `@daily-briefing` (maps to repository and issue awareness from Chapters 2-4)
- `@issue-tracker` (maps to Chapter 4 issue workflow)
- `@pr-review` (maps to Chapter 6 and Chapter 14 review workflow)

1. Fork the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository on GitHub.com.
2. Open the repository and navigate to Section 3 of the README (or this chapter's Section 3 below) to see the full list of 55 agents organized by team.
3. Read through the agent names and descriptions. For each one, ask yourself: "Have I done this task manually during the workshop?"
4. Identify 3-5 agents that match workflows you already practiced:
   - Example: You filed issues manually (Ch 4) - you can use `@issue-tracker`
   - Example: You reviewed a PR with diffs (Ch 6/14) - you can use `@pr-review`
   - Example: You checked colors for contrast - you can use `@contrast-master`
5. Open your **assigned Chapter 16.1 challenge issue**.
6. Post a discovery mapping comment using this format:

```text
Chapter 16.1 - Agent Discovery Mapping:

Agent 1: @[agent-name]
I am ready because I have already: [specific skill from Day 1]

Agent 2: @[agent-name]
I am ready because I have already: [specific skill from Day 1]

Agent 3: @[agent-name]
I am ready because I have already: [specific skill from Day 1]
```

**You are done when:** Your discovery mapping comment is posted with at least 3 agent-to-skill matches.

### Challenge 16.2 Step-by-Step: Agent Skill Validation

**Goal:** Run one agent, read its output, and evaluate whether it matches your manual experience.

**Where you are working:** VS Code with the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository cloned and Copilot Chat open.

**Estimated time:** 30 minutes.

1. Clone your fork of [accessibility-agents](https://github.com/Community-Access/accessibility-agents) to VS Code (or open it in github.dev).
2. Open Copilot Chat: `Ctrl+Shift+I` (Mac: `Cmd+Shift+I`).
3. Choose one agent from your discovery list. If unsure, start with `@daily-briefing` or `@issue-tracker`.
4. Run it with a simple prompt. Examples:
   - `@daily-briefing morning briefing`
   - `@issue-tracker find open issues labeled good-first-issue in accessibility-agents`
   - `@pr-review show open PRs in accessibility-agents`
5. Read the agent's output carefully. Take a moment to think about what you expected.
6. Open your **assigned Chapter 16.2 challenge issue** and post an evaluation comment:

```text
Chapter 16.2 - Agent Validation:

Agent used: @[agent-name]
Prompt: [exact prompt you used]

What did the agent output? (2-3 sentences)
[your answer]

Does this match what you expected from manual experience?
[your answer]

Did the agent miss anything important that you would catch?
[your answer]
```

**You are done when:** Your evaluation comment is posted with all three questions answered.

### Challenge 16.3 Step-by-Step: Agent Instructions Deep Dive

**Goal:** Read one agent's source file to understand what instructions it follows, what tools it can use, and what mistakes it could make.

**Where you are working:** VS Code or GitHub.com - reading files in the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository.

**Estimated time:** 15 minutes.

1. In the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository, navigate to the `.github/` folder (or wherever agent definition files are stored).
2. Open one `.agent.md` or `.prompt.md` file for an agent you used or are curious about.
3. Read the file and identify:
   - What is this agent trying to do? (its purpose)
   - What tools does it have access to? (tool permissions)
   - What constraints or guardrails are in the instructions?
4. Think critically: could this agent make a mistake? What kind?
5. Open your **assigned Chapter 16.3 challenge issue** and post your analysis:

```text
Chapter 16.3 - Agent Internals:

Agent file: [filename]
Purpose: [one sentence]
Tools available: [list]
Guardrails: [what constraints are in the instructions]
Could it make a mistake? [your answer and what kind]
```

**You are done when:** Your analysis comment is posted.

### Optional Challenges 16.4-16.5 (Hackathon)

**Challenge 16.4: Improve an Existing Agent** (45 min)
- Find an agent whose instructions have a gap (use Section 6 suggestions or file an issue).
- Fork the repo, edit the agent's `.agent.md` file.
- Get a facilitator review.
- Open a PR with your improvement.
- Evidence: your merged PR.

**Challenge 16.5: Propose a New Agent** (60 min)
- Identify a workflow not yet covered by any of the 55 agents.
- File an issue describing what the agent should do and why it matters.
- Include 3 example prompts people would use.
- Evidence: your issue with facilitator/maintainer discussion.

### Completing Chapter 16: Submit Your Evidence

Your evidence is the individual challenge issue comments (16.1, 16.2, 16.3). Close each challenge issue as you complete it. For optional challenges, your PR or proposal issue is the evidence.

### Expected Outcomes

- Student can map personal Day 1 skills to specific agents in the ecosystem.
- Student understands the **Skill First, Agent Second** principle and can articulate why agent output requires human judgment.
- Student can read agent instructions and evaluate what an agent can and cannot do.
- Student has used at least one agent and verified it against manual skills.
- (Optional) Student has contributed to the accessibility-agents ecosystem with a fix, improvement, or proposal.

### If You Get Stuck

1. Cannot find an agent that matches your skills? Start with `@daily-briefing` or `@issue-tracker` - those build directly on Chapter 2-5 material. If you have not done those manual steps yet, go back to those chapters first.
2. Agent output does not make sense? That is the right response. Paste the output in an issue comment along with your confusion. That is valuable feedback - the agent may need better instructions or guardrails.
3. Cannot access the agents in Copilot Chat? Verify: Is Copilot Chat extension installed (not just base Copilot)? Are you signed in to GitHub in VS Code? Does `.github/agents/` folder exist in your cloned repository?
4. Repository will not clone? Use the terminal: `git clone https://github.com/[your-username]/accessibility-agents.git` then open the folder in VS Code.
5. Ask facilitator to show them what agent you wanted to run, what output you got, and what you expected.

> **Continue learning:** The GitHub Skills courses [Build Applications with Copilot Agent Mode](https://github.com/skills/build-with-copilot-agent-mode) and [Expand Your Team with Copilot](https://github.com/skills/expand-your-team-with-copilot) explore agent-powered development workflows. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Moment

The 55 agents exist because someone did the manual work first, then automated the repetitive parts. As you explore agents, you are not just learning tools - you are learning what automation looks like when it is built on real expertise and real constraints. That is the foundation for contributing back: you already know the limits of automation because you have done the work by hand.

### Learning Pattern Used in This Chapter

1. Map your existing skills to available tools (discovery before action).
2. Run one tool and evaluate its output critically (trust but verify).
3. Read the source to understand capabilities and limits (internals matter).
4. Contribute improvements based on your evaluation (close the feedback loop).


## Capstone: Share Your Feedback (The Most Important Task!)

You have now explored the full agent ecosystem, completed the workshop, and have valuable perspective on what worked, what confused you, and what we should improve for the next cohort.

**Your feedback directly shapes the future of this project.** We read every response, discuss improvements, and act on suggestions.

### Submit Workshop Feedback

[**File a Feedback Issue** →](https://github.com/community-access/git-going-with-github/issues/new?template=feedback-workshop.yml)

Use the **Workshop Feedback** form to share:

- **Which agents stood out?** (Most useful or surprising)
- **Which agents confused you?** (What would make them better)
- **Was the chapter progression logical?** (Did earlier chapters prepare you for later ones)
- **Accessibility experience** (If applicable - did any assistive technology work/fail?)
- **Best takeaway** (What will you remember in 6 months)
- **What should we improve?** (Honest feedback, not graded)
- **Anything else?** (Facilitator appreciation, wild ideas, whatever matters to you)

**Answer as much or as little as you're comfortable sharing.** Even one thoughtful answer is valuable. This feedback becomes part of our workshop archive and roadmap for future cohorts.

**Your honest perspective is how this project improves. Thank you for being part of building a more accessible technical future.**


## Table of Contents

1. [The Principle: Skill First, Agent Second](#1-the-principle-skill-first-agent-second)
2. [Setup and Configuration](#2-setup-and-configuration)
3. [The Ecosystem: 55 Agents, 3 Teams, 5 Platforms](#3-the-ecosystem-55-agents-3-teams-5-platforms)
4. [Agents in Detail - Hands-On Reference](#4-agents-in-detail---hands-on-reference)
5. [Slash Commands and Prompts](#5-slash-commands-and-prompts)
6. [Contributing to the Ecosystem](#6-contributing-to-the-ecosystem)
7. [The Bigger Picture: Teams, Orchestration, and Beyond VS Code](#7-the-bigger-picture-teams-orchestration-and-beyond-vs-code)
8. [GitHub Desktop, GitHub CLI, and Copilot CLI](#8-github-desktop-github-cli-and-copilot-cli)


## 1. The Principle: Skill First, Agent Second

Accessibility Agents is not a way to skip learning GitHub. It is a way to amplify skills you have already built through deliberate practice.

The ecosystem includes 55 agents across three specialized teams, running on five different AI platforms. That scale makes this principle critical: every agent automates a sequence of steps you should already know how to do manually. If you do not know those steps by hand, you cannot:

- Verify that the agent's output is correct
- Catch when the agent misses context that only you have
- Edit the agent's drafts into something worth posting under your name
- Know when the agent is confidently wrong

### Every agent has a manual prerequisite. If you have not done the corresponding skill by hand, the agent is not ready for you yet - and you are not ready for it

This applies across all three teams and all 55 agents:

- **GitHub Workflow agents** automate repository navigation, issue triage, PR review, and contribution analytics - skills you practiced on Day 1
- **Accessibility agents** automate WCAG auditing, contrast checking, keyboard navigation review, and document scanning - knowledge from your accessibility training and the standards in [Appendix C](appendix-m-accessibility-standards.md)
- **Developer Tools agents** automate accessible coding patterns for Python, wxPython, and desktop applications - skills from your development experience

Before running any agent, the facilitator asks the same question:

> *"What would you do if you had to do this step manually right now?"*

That question is not rhetorical. Answer it before running the agent. If you cannot answer it, learn the manual skill first.

> **Exploration prompt:** As you browse the [full agent ecosystem](#3-the-ecosystem-55-agents-3-teams-5-platforms), identify which agents match workflows you already do by hand. Those are your starting points. On Day 2, you will also have the opportunity to contribute improvements, new patterns, or entirely new agents back to the project.


## 2. Setup and Configuration

### Quick Install (One Command)

Accessibility Agents now ships with a one-liner installer that sets up all 55 agents for your platform:

#### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/Community-Access/accessibility-agents/main/install.sh | bash
```

#### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/Community-Access/accessibility-agents/main/install.ps1 | iex
```

The installer detects which AI tools you have installed (VS Code with Copilot, Claude Code, Gemini CLI, Claude Desktop, Codex CLI) and configures the appropriate agent files for each platform. To uninstall, run the corresponding uninstall script from the repository.

### Workshop Setup (Fork and Clone)

For the workshop, you will also fork and clone the repository so you can make contributions:

1. **Fork** [accessibility-agents](https://github.com/community-access/accessibility-agents) to your GitHub account (you did this on Day 1 or Day 2 morning)
2. **Clone** your fork:

   ```bash
   git clone https://github.com/[your-username]/accessibility-agents.git
   ```

3. **Open in VS Code**: navigate to the folder and run `code .` (or File, then Open Folder)
4. **Open Copilot Chat**: `Ctrl+Shift+I`
5. **Test**: type `@daily-briefing morning briefing` and press `Enter`

**No API keys. No configuration files. The installer handles everything.** If Copilot Chat works, the agents work.

### Prerequisites

- GitHub Copilot Chat extension installed (see [GitHub Copilot: Installation](16-github-copilot.md#2-installing-github-copilot))
- Signed in to GitHub via VS Code
- A workspace open containing `.github/agents/` folder with `.agent.md` files

### How Agents Are Discovered

When you type `@` in Copilot Chat, VS Code scans:

1. `.github/agents/*.agent.md` in your current workspace
2. Any agents installed globally on your machine
3. Agents defined by extensions

The Accessibility Agents ecosystem installs agents appropriate to each platform:

| Platform | Agent Format | How Agents Load |
| ----------  | -------------  | -----------------  |
| **GitHub Copilot** (VS Code) | `.github/agents/*.agent.md` | Auto-discovered when workspace is open |
| **Claude Code** | Per-agent CLAUDE.md files + hook enforcement | Loaded via `.claude/` configuration |
| **Gemini CLI** | Gemini skill files | Loaded via gemini configuration |
| **Claude Desktop** | MCP server integration | Configured via Claude Desktop settings |
| **Codex CLI** | Codex agent files | Loaded via codex configuration |

For this workshop, we focus on GitHub Copilot in VS Code. The same 55 agent personalities are available on all five platforms.

### Optional: Personalize Your Instance

Copy the example preferences file:

```bash
cp .github/agents/preferences.example.md .github/agents/preferences.md
```

Open `preferences.md` in VS Code and edit:

```markdown
# My Accessibility Agents Preferences

## My GitHub Username
[your-username]

## Repositories I Work On Most
- [your-org]/[your-repo]
- community-access/accessibility-agents

## Preferred Output Format
Long-form with sections and headings (screen reader optimized)

## Notification Priority
Accessibility issues first, then review requests, then CI failures
```

Commit `preferences.md` to your fork. Now the agents know who you are and what you care about most.

**Note:** `preferences.md` is in `.gitignore` in the upstream repo - your personal preferences will not be included if you submit a PR. They stay in your fork only.

### How Agents Travel with Your Repo

When you fork [accessibility-agents](https://github.com/Community-Access/accessibility-agents), the `.github/agents/` folder comes with it. This means:

- Any collaborator who clones your fork gets all 55 agents automatically
- You can customize agents for your specific project by editing the `.agent.md` files in your fork
- Any project can have agents - create a `.github/agents/` folder in any repository and add `.agent.md` files using the same pattern
- The one-liner installer can also set up agents globally, so they are available in every workspace you open

### Invoking Agents on GitHub.com

Accessibility Agents agents run in VS Code. But the same `.agent.md` files can also be invoked directly on GitHub.com - no VS Code, no local clone required.

#### Option 1: Copilot Chat with Task mode

<details>
<summary>Visual / mouse users</summary>

1. Open Copilot Chat on GitHub.com (icon in the top-right navigation bar)
2. Click **Task** in the mode picker
3. Optionally click the agent picker to select a custom agent
4. Type your request and click Send
5. Copilot analyzes the task and can create a branch and open a PR automatically

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Open Copilot Chat on GitHub.com (navigate to icon in top-right navigation → `Enter`)
2. The mode picker (Task vs Chat) is a set of radio buttons - navigate with `Arrow` keys to select "Task"
3. The agent picker is a listbox - `Up/Down Arrow` to navigate, `Enter` to select
4. Type your request in the chat input and press `Enter`
5. Copilot response appears in the chat thread; press `H` to navigate to the response heading

</details>

#### Option 2: Assign an issue to Copilot

<details>
<summary>Visual / mouse users</summary>

1. Open any issue (or create a new one describing the task)
2. In the **Assignees** sidebar section, click the gear icon
3. In the dropdown, click **Copilot** as the assignee
4. A dialog opens - optionally provide additional instructions and select a custom agent
5. Click **Assign** to confirm

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Open any issue in the repository
2. Press `B` to navigate to the Assignees gear button → `Enter` to open the popup
3. Navigate the popup with `Arrow` keys → find "Copilot" → `Enter` to select
4. A dialog opens with instruction text area and agent picker - fill as needed
5. `Tab` to the **Assign** button → `Enter`

</details>

This is the bridge to Section 6 (The Cloud Extension). The same agent file, three execution contexts: your editor, GitHub.com interactively, and GitHub Actions on a schedule.


### Copilot on GitHub.com - Browser-Native Features

Beyond assigning Copilot to issues and using Task mode in Chat, GitHub.com now has several standalone Copilot features built directly into the web interface. These work **entirely in your browser** - no VS Code, no local clone needed.

#### Copilot PR Summary

On any open pull request, GitHub adds a **"Summarize" button** in the PR description area. Selecting it generates a plain-language summary of what the PR changes, why, and what reviewers should focus on.

**When to use it:** Before doing a full accessible diff review (Chapter 14), read the Copilot summary first to orient yourself. This is especially helpful with large PRs.

<details>
<summary>Visual / mouse users</summary>

On any open PR page, look for a **"Summarize"** or **"Copilot summary"** button near the PR description area. Click it. The summary renders within a few seconds as a new section in the PR description.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
On any PR page:
B → navigate buttons → find "Summarize" or "Copilot summary" button → Enter
Wait for the summary to render (usually 5-10 seconds)
Copilot summary appears as a new blockquote or section above/below the description
H or 2 → navigate to the summary heading to read it
```

</details>

#### Copilot PR Review

On open PRs you have write access to review, a **"Review"** button (or Copilot icon) appears in the Files changed tab. Copilot generates inline review comments across the diff.

**When to use it:** As a starting point for a code review. Always read the Copilot-generated comments critically before adopting them - Copilot can miss context that a human reviewer would catch.

#### Copilot in Issues

On any issue page, Copilot adds sidebar buttons that appear once the page loads:

- **"Explain this issue"** - generates a plain-language explanation of a complex technical issue
- **"Suggest fix"** - proposes an approach to resolving the issue (opens a task/PR workflow)

<details>
<summary>Visual / mouse users</summary>

Look in the right sidebar on any issue page for a **Copilot section** with "Explain" and "Suggest fix" buttons. Click the button you want; the response appears below it in the sidebar.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
On any issue page:
H or 2 → navigate to "Copilot" section heading in the sidebar
B → activate "Explain" or "Suggest fix" button
Copilot response appears below the button; use H to navigate to it
```

</details>

#### GitHub Models - Free AI Playground

[github.com/marketplace/models](https://github.com/marketplace/models) is a free playground where you can test AI models (OpenAI GPT-4o, Meta Llama 3, Mistral, Phi-4 Mini, and others) directly in your browser.

##### What you can do

- Send prompts to any listed model and compare responses side by side
- Adjust parameters (temperature, max tokens) without any setup
- Use the code sample generator to get API code for your chosen model
- All free with a GitHub account (rate-limited for free tier)

**Why it matters for Accessibility Agents:** When you build custom agents and prompts, you can test your system prompts and prompt templates in GitHub Models before adding them to your `.prompt.md` files - rapid iteration without burning API credits.

<details>
<summary>Visual / mouse users</summary>

Navigate to [github.com/marketplace/models](https://github.com/marketplace/models). Browse model cards and click one to open the chat playground. Type in the prompt field and press **Send**. Results appear in the response area.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Navigate to https://github.com/marketplace/models
H → "Models" h1, then model category headings
Links → navigate to individual model cards
Enter on a model card → opens the chat playground
In the playground: E or F → navigate to the prompt textarea → NVDA+Space (Focus Mode) → type prompt → Enter to submit
Response appears below the Send button; use H to find the response section heading
```

</details>

#### Copilot-Drafted Release Notes

When creating a release (Releases tab → Draft a new release), GitHub provides a **"Generate release notes"** button. It scans merged PRs since the last release and drafts categorized release notes automatically.

This directly connects to the `/draft-release` slash command in Accessibility Agents - use the browser button for one-click generation, or use the agent when you want to customize the structure and add narrative context.


## 3. The Ecosystem: 55 Agents, 3 Teams, 5 Platforms

Accessibility Agents is an ecosystem of 55 specialized agents organized into three teams, each addressing a different dimension of accessible software development. Browse all three teams below, then choose the agents that match your current skills and interests.

### Team 1: Accessibility (26 agents)

These agents audit, fix, and enforce accessibility across web, document, and mobile platforms.

| Agent | What It Does |
| -------  | -------------  |
| `@accessibility-lead` | Orchestrates multi-agent accessibility audits; delegates to specialists |
| `@aria-specialist` | ARIA roles, states, properties, and widget patterns |
| `@modal-specialist` | Dialog focus trapping, escape behavior, screen reader announcements |
| `@contrast-master` | Color contrast ratios, focus indicators, visual presentation |
| `@keyboard-navigator` | Tab order, focus management, keyboard shortcuts, skip links |
| `@live-region-controller` | Live region announcements, dynamic content updates, toast notifications |
| `@forms-specialist` | Form labels, error handling, validation, autocomplete, field grouping |
| `@alt-text-headings` | Alt text quality, heading hierarchy, document outline, landmarks |
| `@tables-specialist` | Table markup, scope, caption, headers, sortable columns, ARIA grid |
| `@link-checker` | Link text quality, ambiguous links, WCAG 2.4.4 and 2.4.9 compliance |
| `@web-accessibility-wizard` | Full guided WCAG audit with severity scoring and remediation tracking |
| `@testing-coach` | Screen reader testing guidance (NVDA, JAWS, VoiceOver), automated test setup |
| `@wcag-guide` | WCAG 2.2 AA reference, success criteria explanations, conformance guidance |
| `@word-accessibility` | Microsoft Word document accessibility auditing |
| `@excel-accessibility` | Microsoft Excel spreadsheet accessibility auditing |
| `@powerpoint-accessibility` | Microsoft PowerPoint presentation accessibility auditing |
| `@office-scan-config` | Office document scan configuration and rule management |
| `@pdf-accessibility` | PDF accessibility auditing (PDF/UA, tagged PDF structure) |
| `@pdf-scan-config` | PDF scan configuration and rule management |
| `@document-accessibility-wizard` | Guided document audit wizard (Word, Excel, PowerPoint, PDF) |
| `@cognitive-accessibility` | Cognitive accessibility patterns, plain language, reading level |
| `@mobile-accessibility` | Mobile accessibility (iOS VoiceOver, Android TalkBack) |
| `@design-system-auditor` | Design system component accessibility review |
| `@markdown-a11y-assistant` | Markdown accessibility (headings, links, alt text, tables, emoji) |
| `@epub-accessibility` | ePub/digital publication accessibility auditing |
| `@epub-scan-config` | ePub scan configuration and rule management |

### Team 2: GitHub Workflow (12 agents)

These agents automate GitHub operations - issue triage, PR review, contribution analytics, and repository management.

| Agent | What It Does |
| -------  | -------------  |
| `@daily-briefing` | Morning situation report across all repositories |
| `@issue-tracker` | Find, prioritize, triage, and draft replies to issues |
| `@pr-review` | Generate structured PR reviews with risk assessment |
| `@analytics` | Contribution velocity, review turnaround, code hotspots |
| `@insiders-a11y-tracker` | Monitor accessibility-sensitive changes in repositories |
| `@template-builder` | Interactive issue template wizard via Ask Questions |
| `@github-hub` | Central hub for all GitHub operations |
| `@repo-admin` | Repository settings, branch protection, rulesets |
| `@team-manager` | Team membership, permissions, and organization management |
| `@contributions-hub` | Contribution tracking and contributor recognition |
| `@repo-manager` | Multi-repository operations and cross-repo workflows |
| `@nexus` | Cross-agent orchestration and workflow coordination |

### Team 3: Developer Tools (6 agents)

These agents support accessible application development across desktop and cross-platform frameworks.

| Agent | What It Does |
| -------  | -------------  |
| `@developer-hub` | Central hub for developer tool operations |
| `@python-specialist` | Python accessibility patterns and best practices |
| `@wxpython-specialist` | wxPython GUI accessibility implementation |
| `@desktop-a11y-specialist` | Desktop application accessibility (Windows, macOS, Linux) |
| `@desktop-a11y-testing-coach` | Desktop accessibility testing guidance and automation |
| `@a11y-tool-builder` | Build custom accessibility testing tools and utilities |

### Beyond Agents: The Supporting Ecosystem

The 55 agents are backed by additional resources in the repository:

| Resource | Count | Purpose |
| ----------  | -------  | ---------  |
| Copilot prompts (`.prompt.md`) | 54+ | Single-task slash commands invoked with `/command` |
| Copilot skills (`SKILL.md`) | 17 | Multi-step workflows with bundled scripts and reference files |
| Copilot instructions (`.instructions.md`) | 6 | Always-on coding standards (accessibility, markdown, semantic HTML, ARIA) |
| Claude Code hooks | 3 | Proactive detection, edit gate, session marker - enforcement without prompting |
| Example violations | 20+ | Intentional accessibility issues in `example/` for practice |

### Hook-Based Enforcement (Claude Code)

On Claude Code, Accessibility Agents includes a hook system that enforces accessibility standards automatically:

1. **Proactive detection hook** - scans every file edit for accessibility regressions before they are committed
2. **Edit gate hook** - blocks commits that introduce WCAG violations until they are fixed
3. **Session marker hook** - tracks which accessibility checks have run during the current session

This means accessibility enforcement happens whether or not the developer remembers to ask for it. The hooks run as part of the Claude Code lifecycle, not as an afterthought.

### What Would You Build?

This is the question that matters most. The 55 agents that exist today were built by contributors who saw a gap and filled it. The ecosystem grows when someone asks:

- "Why is there no agent for [framework] accessibility patterns?"
- "I spend 30 minutes on [task] every week - could an agent do the repetitive part?"
- "This agent is good but it misses [specific edge case] - I could improve those instructions"
- "Mobile native accessibility testing has no agent coverage yet - I could start one"

#### The contribution paths are

1. **Report an agent gap** - file an issue describing what is missing and why it matters
2. **Improve existing agent instructions** - make an agent smarter about edge cases it misses
3. **Add framework-specific patterns** - teach agents about React, Vue, Angular, Svelte, or other framework accessibility patterns
4. **Fix installer issues** - improve the one-liner scripts for different OS configurations
5. **Write documentation** - help others understand how to use and contribute to agents

See the [Accessibility Agents CONTRIBUTING guide](https://github.com/community-access/accessibility-agents/blob/main/CONTRIBUTING.md) for detailed instructions on each path.

### Roadmap: What Is Coming Next

The project roadmap includes:

- **Mobile native agents** - agents specialized for iOS (VoiceOver) and Android (TalkBack) native app accessibility
- **Anthropic Connectors listing** - making agents discoverable through the Anthropic marketplace
- **veraPDF integration** - automated PDF/UA validation for the PDF accessibility agent
- **Document remediation agents** - agents that fix accessibility issues in documents, not just find them
- **WCAG AAA agent** - a specialized agent for AAA-level conformance (currently, agents target AA)
- **Multi-language support** - agent instructions in languages beyond English

**Your contribution could be the next item that ships.** Every agent started as one person's idea and one pull request.


## 4. Agents in Detail - Hands-On Reference

This section walks through several agents in depth so you can see how they work, what they produce, and how to evaluate their output. These examples use GitHub Workflow agents because they build directly on Day 1 skills - but the same patterns apply to every agent in the ecosystem. After working through these examples, explore agents from any team that match your interests.

Open any agent file in VS Code to read its full instructions: `.github/agents/[name].agent.md`

### Two Types of Agents

Before diving in, it helps to know that custom agents fall into two categories - this distinction affects what tool permissions they need and what they can do:

**Informational agents** search, analyze, and report. They respond in chat without modifying files. Examples: `@daily-briefing`, `@issue-tracker`, `@analytics`. These agents need only read and search tools (like `github/search_issues`, `github/issue_read`) - they are safer to trust with broad repository access and are simpler to build.

**Task-oriented agents** take action. They can read and edit files, run shell commands, create commits, and open pull requests. Examples: `@pr-review`, `@insiders-a11y-tracker`. These agents need a broader toolset (`read`, `edit`, `execute`, `github/*`) - and because they can make changes, their output always warrants human review before anything is posted or merged.

Many agents do both - they explain what they found (informational) and optionally make changes if you ask (task-oriented). The key question when you build your own is: *does this agent need to change files, or only to report?* Start informational. Expand to task-oriented only when the reporting alone is not enough.


### Agent 1: `@daily-briefing` - Morning Briefing

**Type:** Informational

**File:** `.github/agents/daily-briefing.agent.md`

**Before you run this agent:** You should have manually navigated a repository's Issues tab, read your GitHub Notifications page, understood what a pull request waiting for review looks like, and know the difference between subscribed and participating notifications. If those steps are not familiar yet, return to [Navigating Repositories](03-navigating-repositories.md) and [Notifications](10-notifications-and-day-1-close.md) first.
The briefing output only makes sense when you already know what each section of it is describing.

#### What it does

Sweeps every repository you have access to and builds a prioritized dashboard:

- Issues opened in the last 24 hours
- Pull requests waiting for your review
- CI failures on your branches
- Security and Dependabot alerts
- Community reactions to your recent comments

#### Example commands

```text
@daily-briefing morning briefing

@daily-briefing what needs my attention today in accessibility-agents?

@daily-briefing summarize activity in community-access/accessibility-agents from the last week
```

**Screen reader tip:** The briefing output uses heading level 2 for each section. Use `H` key (NVDA/JAWS virtual mode) or `VO+Command+H` (VoiceOver) to jump between: Open Issues, Review Requests, CI Status, Security Alerts, Community Activity.

#### Output format

```markdown
## Issues Opened (Last 24 Hours)
- #42 [accessibility-agents] Add Timeline View documentation (opened 3 hours ago)
- #41 [accessibility-agents] Fix heading hierarchy in GUIDE.md (opened 18 hours ago)

## Pull Requests Awaiting Your Review
- #14 [accessibility-agents] Improve screen reader navigation guide (jeffb, 2 days old)

## CI Failures on Your Branches
- feature/add-timeline-guide - Tests failing on line 42 of timeline-test.md

## Security Alerts
- No new security alerts

## Community Activity
- Your comment on #38 received 3 reactions (×2, ×1)
```


### Agent 2: `@issue-tracker` - Issue Management

**Type:** Both (Informational + Task-oriented)

**File:** `.github/agents/issue-tracker.agent.md`

**Before you run this agent:** You should have filed at least one issue using the full manual process - writing a title, description, and reproduction steps; applying labels and a milestone; and reading at least five existing issues to understand what a well-formed issue looks like. If you have not done this, the agent's priority scores and draft replies will mean nothing to you.
Return to [Working with Issues](05-working-with-issues.md) and [Labels, Milestones & Projects](09-labels-milestones-projects.md) first.

#### What it does

Finds, prioritizes, and helps you manage issues across all your repositories:

- Cross-repository priority scoring with community sentiment
- Batch-reply capability (draft replies to multiple issues at once)
- Saved search support
- Release-awareness (flags issues that affect upcoming releases)

#### Example commands

```text
@issue-tracker find open issues labeled good-first-issue

@issue-tracker find accessibility issues across all my repos

@issue-tracker is there a duplicate of issue #42 in accessibility-agents?

@issue-tracker draft a reply to issue #15 acknowledging it and asking for more context
```

**Important:** The agent can draft a reply. You review the tone against the [Culture & Etiquette guide](08-open-source-culture.md) before posting. Your name goes on it.

#### Output example

```markdown
## Open Issues Labeled "good-first-issue"

### High Priority
- #45 [accessibility-agents] Add NVDA-specific navigation tips (3 comments, opened 5 days ago)
  - Priority Score: 8/10 (high community interest, clear scope, no assignee)
  - Recommended for: First-time contributors familiar with screen readers

### Medium Priority
- #38 [accessibility-agents] Improve commit message examples (1 comment, opened 2 weeks ago)
  - Priority Score: 5/10 (useful addition, low urgency)

## Draft Reply for Issue #15

Hi @contributor-name,

Thanks for opening this issue. To help us reproduce the problem, could you provide:
1. Which screen reader you're using (NVDA, JAWS, VoiceOver)
2. The exact steps you took when the issue occurred
3. What you expected to happen vs what actually happened

This will help us diagnose the issue faster.

- Draft by @issue-tracker (review before posting)
```


### Agent 3: `@pr-review` - Pull Request Review

**Type:** Both (Informational + Task-oriented)

**File:** `.github/agents/pr-review.agent.md`

**Before you run this agent:** You should have manually reviewed at least one pull request diff in the GitHub browser interface - navigating the Files Changed tab with your screen reader, reading added and removed lines, leaving at least one inline comment, and submitting a review. The agent generates a review document; you need to know what a good review looks like in order to edit, improve, and take ownership of what it produces.
Return to [Working with Pull Requests](06-working-with-pull-requests.md) if this is not yet familiar.

#### What it does

Generates full review documents for pull requests:

- Line-numbered diffs with change maps
- Risk assessment (what could break, what is high-impact)
- Before-and-after snapshots
- CI results and test coverage information
- Suggested inline review comments with line number references

#### Example commands

```text
@pr-review review PR #14 in accessibility-agents

@pr-review what is the risk level of PR #8?

@pr-review generate inline comments for PR #14

@pr-review summarize what changed in PR #14 in two sentences
```

**Critical rule:** Read the agent's review. Edit it. Make it yours. Post your edited version. The agent produces a starting point - it does not know the project's history, the contributor's background, or the community's implicit standards the way you do.

#### Output example

```markdown
## PR Review: #14 - Improve screen reader navigation guide

### Summary
This PR adds 3 new sections to the screen reader navigation guide and updates 2 existing sections with NVDA-specific keyboard shortcuts.

**Files Changed:** 1  
**Lines Added:** 127  
**Lines Removed:** 18  

### Risk Assessment
**Risk Level:** Low

#### What Could Break
- None identified - documentation-only change

#### High-Impact Areas
- Section 3 (Keyboard Navigation) - heavily referenced by other guides

### Change Map

#### docs/navigation-guide.md

##### Lines 42-65: ADDED - NVDA Browse Mode shortcuts
+ New content explaining Browse Mode vs Focus Mode
+ Table of NVDA-specific shortcuts
+ Screen reader announcements examples

##### Lines 88-92: MODIFIED - Updated heading hierarchy example
- Old: Basic example with 2 levels
+ New: Comprehensive example with 3 levels and explanations

##### Lines 120-145: ADDED - Common navigation mistakes section
+ Lists 5 common mistakes with solutions

### Suggested Inline Comments

**Line 48:** Consider adding a note that Browse Mode is called "Virtual Cursor" in JAWS
**Line 127:** Typo - "anounced" should be "announced"
**Line 143:** This mistake applies to VoiceOver too - expand to include VO+Arrow navigation

### Recommendation
#### Approve with Minor Changes

This is a valuable addition to the guide. The three typos and one clarification request are minor. Once those are addressed, this is ready to merge.

- Review generated by @pr-review (edit before posting)
```


### Agent 4: `@analytics` - Team Analytics

**Type:** Informational

**File:** `.github/agents/analytics.agent.md`

**Before you run this agent:** You should have explored the Insights tab of at least one repository - looked at the contribution graph, understood what commit frequency means, and thought about what "high-churn files" implies for a project's stability. The analytics output describes patterns in data you should already be able to read manually. Return to [Navigating Repositories](03-navigating-repositories.md) if the Insights tab is unfamiliar.

#### What it does

Surfaces team contribution patterns, velocity metrics, and bottleneck detection:

- Contribution velocity over time
- Review turnaround time by reviewer
- Code hotspot detection (files with the most churn)
- Workload distribution across contributors

#### Example commands

```text
@analytics team velocity in accessibility-agents this month

@analytics who are the most active contributors to accessibility-agents?

@analytics which files are changed most often in accessibility-agents?

@analytics how long does PR review take on average in accessibility-agents?
```

**Accessibility use case:** After Day 2's contribution wave, run `@analytics team velocity in accessibility-agents today` to see the hackathon's collective output. A moment of real-time team celebration.

#### Output example

```markdown
## Team Velocity - accessibility-agents (January 2026)

### Contribution Summary
- **Total Commits:** 47
- **Total PRs:** 12 (10 merged, 2 open)
- **Contributors:** 8 (3 new this month)
- **Average Commits per Day:** 1.5

### Most Active Contributors
1. **jeffb** - 18 commits, 5 PRs merged
2. **alex-a11y** - 12 commits, 3 PRs merged
3. **sara-docs** - 8 commits, 2 PRs merged

### High-Churn Files (Most Frequently Changed)
1. **docs/GUIDE.md** - 14 changes (documentation updates)
2. **README.md** - 8 changes (feature additions, fixes)
3. **.github/agents/pr-review.agent.md** - 6 changes (agent refinement)

### PR Review Turnaround Time
- **Average:** 18 hours
- **Fastest:** 2 hours (PR #14)
- **Slowest:** 72 hours (PR #8 - awaiting maintainer review)

### Trends
- Commit velocity up 40% compared to December 2025
- New contributors joining at healthy rate (3 this month)
- Review times improving (down from 24-hour average last month)
```


### Agent 5: `@insiders-a11y-tracker` - Accessibility Change Monitoring

**Type:** Both (Informational + Task-oriented)

**File:** `.github/agents/insiders-a11y-tracker.agent.md`

**Before you run this agent:** You should have filed at least one accessibility bug report using the workshop's issue template, applied a WCAG label to an issue, and manually reviewed a Markdown file for heading hierarchy - knowing what H1 means, what H2 means, what H3 means, what a skip means, and why it matters to screen reader navigation. The tracker flags accessibility issues in your contributions; you need to understand the standard it is measuring against before you can act on its output.
Return to [Issue Templates](17-issue-templates.md) and [Working with Issues](05-working-with-issues.md) if these are not yet familiar.

#### What it does

Monitors accessibility-sensitive changes across configured repositories:

- WCAG/ARIA cross-referenced change tracking
- Flags changes to keyboard navigation, ARIA attributes, focus management, color usage
- Monitors for heading hierarchy violations in Markdown
- Tracks link text quality (flags bare URLs, non-descriptive labels)

#### Example commands

```text
@insiders-a11y-tracker check recent changes in accessibility-agents

@insiders-a11y-tracker review my PR #14 for accessibility impact

@insiders-a11y-tracker are there any accessibility regressions in the last 5 commits?
```

**Day 2 workflow:** Run this before submitting any PR. If the agent flags an issue, fix it before requesting review - not after.

#### Output example

```markdown
## Accessibility Changes - accessibility-agents (Last 5 Commits)

### Issues Found: 2

#### Issue 1: Heading Hierarchy Skip
**File:** docs/11-vscode-basics.md  
**Commit:** a3f2b9c  
**Line:** 142  

**Problem:** H1 → H3 skip (missing H2)

```markdown
# VS Code Setup

### Screen Reader Mode
```text

**WCAG Guideline:** 1.3.1 Info and Relationships (Level A)

**Impact:** Screen reader users navigating by heading level will not find this section when jumping to H2 headings.

**Suggested Fix:** Change `### Screen Reader Mode` to `## Screen Reader Mode`


#### Issue 2: Non-Descriptive Link Text

**File:** README.md  
**Commit:** b8e3c1d  
**Line:** 28  

**Problem:** Link text is "click here"

```markdown
For more information, [click here](https://example.com/guide).
```text

**WCAG Guideline:** 2.4.4 Link Purpose (Level A)

**Impact:** Screen reader users navigating by links will hear "click here" with no context about the destination.

**Suggested Fix:** Use descriptive link text: `Read the [complete setup guide](https://example.com/guide).`


### Positive Changes: 1

#### Improvement: ARIA Label Added

**File:** docs/navigation-guide.md  
**Commit:** c7d4e2f  
**Line:** 89  

**Change:** Added `aria-label` to icon-only button example

```markdown
<button aria-label="Close dialog"></button>
```text

**WCAG Guideline:** 4.1.2 Name, Role, Value (Level A)

**Impact:** Screen reader users can now understand the button's purpose without visible text.


## Recommendations

1. Fix heading hierarchy skip in docs/11-vscode-basics.md before merging PR #14
2. Update link text in README.md (low priority - not in active workflow path)
3. Continue using descriptive ARIA labels for icon-only controls (positive trend)

```


### Agent 6: `@template-builder` - Interactive Issue Template Wizard

**Type:** Informational with guided output

**File:** `.github/agents/template-builder.agent.md`

**Before you run this agent:** You should have read [Issue Templates](17-issue-templates.md) thoroughly - understanding YAML field types, creating a template manually (Exercise B), and designing your own template (Exercise D). The Template Builder does not teach template design - it automates the YAML writing. You need to know what you want to ask for before the agent can guide you through the form structure.

#### What it does

An interactive wizard that guides you through building GitHub issue templates step-by-step using VS Code's Ask Questions feature. Instead of writing YAML syntax, answer simple questions and the agent generates production-ready templates.

#### Example workflow

```text

You: @template-builder create accessibility bug template

Agent: [Ask Questions interface]
  Q: What's this template called?
  → "Accessibility Bug Report"

  Q: What's it for?
  → "Report screen reader, keyboard, and assistive tech issues"

  Q: Add a field (type, label, required?)
  → Field 1: dropdown, "Screen Reader", yes
     Options: NVDA, JAWS, VoiceOver, TalkBack, Other

  → Field 2: textarea, "How to reproduce", required

  → Field 3: textarea, "Expected vs actual", required

  Q: Ready to generate?
  → Yes

Agent: [Syntax-highlighted YAML output]
        Ready to copy and save to .github/ISSUE_TEMPLATE/

```

#### Example commands

```text

@template-builder create accessibility template

@template-builder design a security vulnerability template

@template-builder build a feature request form

```

**Why use it?** Manual YAML template creation takes 15-20 minutes and is error-prone. The Template Builder generates correct, tested templates in 2-3 minutes via guided questions.

**Advanced:** After generating a template, you can ask: `@template-builder reorder the fields` or `@template-builder add a checkbox field for version compatibility` - the agent regenerates your YAML with the changes applied.


## 5. Slash Commands and Prompts

The repository includes 54+ slash commands defined as `.prompt.md` files in `.github/prompts/`. Type `/` in Copilot Chat to see the full command menu.

### Most Useful for This Workshop

| Command | What It Does | Example Usage |
| ---------  | -------------  | ---------------  |
| `/my-issues` | Your open issues with priority signals | `/my-issues` |
| `/review-pr` | AI-generated review with inline suggestions | `/review-pr #14` |
| `/pr-comment` | Draft a response to a PR comment | `/pr-comment #14` |
| `/a11y-update` | Latest accessibility improvements with WCAG cross-references | `/a11y-update insiders` |
| `/triage` | Triage a new issue with label and priority suggestions | `/triage #22` |
| `/issue-reply` | Draft a reply to an issue thread | `/issue-reply #15` |
| `/daily-briefing` | Same as `@daily-briefing` - your morning activity snapshot | `/daily-briefing` |
| `/draft-release` | Generate release notes from merged PRs | `/draft-release v2.0` |
| `/my-prs` | Your open PRs with CI and review status | `/my-prs` |

### Workshop Slash Command Quick Reference

The commands listed below are the ones most relevant to this workshop. The full repository contains 54+ commands covering accessibility auditing, document scanning, framework-specific checks, and more. See [Appendix V](appendix-l-agents-reference.md) for the complete list.

```text

/address-comments     Address all open review comments on your PR
/a11y-update          Latest accessibility improvements with WCAG cross-references
/ci-status            CI/CD health dashboard across your repos
/create-issue         Create a well-formed issue from a description
/daily-briefing       Morning activity snapshot across all your repos
/draft-release        Generate release notes from merged PRs
/explain-code         Explain selected code in plain language
/issue-reply          Draft a reply to an issue thread
/manage-branches      List, compare, and clean up branches
/manage-issue         Update labels, assignees, or status on an issue
/merge-pr             Check merge readiness and merge a PR
/my-issues            Your open issues with priority signals
/my-prs               Your open PRs with CI and review status
/my-stats             Your contribution stats across repos
/notifications        Manage GitHub notifications without opening a browser
/onboard-repo         First-time scan of a repo - health, quick wins, recommended actions
/pr-author-checklist  Pre-merge checklist for PR authors
/pr-comment           Draft a response to a PR comment
/pr-report            Detailed PR analysis report
/project-status       GitHub Projects board overview - columns, blocked, stale
/react                Suggest or add a reaction to an issue or comment
/refine-issue         Improve issue title, description, and labels
/release-prep         Complete release preparation workflow
/review-pr            AI-generated review with inline suggestions
/security-dashboard   Dependabot alerts and vulnerability status
/sprint-review        End-of-sprint summary with velocity and retrospective
/team-dashboard       Team activity and contribution overview
/triage               Triage a new issue with label and priority suggestions

```

### Reading Slash Command Definitions

Each `/command` corresponds to a `.prompt.md` file in `.github/prompts/`. Open any of them in VS Code to read what instructions it gives Copilot.

#### Example: `/a11y-update`

File: `.github/prompts/a11y-update.prompt.md`

```markdown
name: a11y-update
description: "Get the latest accessibility improvements across all tracked repos -- with WCAG cross-references and ARIA pattern mapping"
agent: insiders-a11y-tracker
tools:
  - github/*
  - createFile
  - createDirectory
  - ask_questions

Show me the latest accessibility improvements across tracked repositories.

${input:scope:Optional: 'insiders', 'stable', 'both', a specific month, 'screen reader', search keywords, 'track owner/repo', or a specific repo name}

## Behavior

Load accessibility tracking configuration from `.github/agents/preferences.md`
(repos, labels, channels). If no preferences exist, use defaults
(microsoft/vscode with accessibility labels).
```

**This is how you learn to write your own.** Copy an existing file, edit the instructions, save it with a new name - you have just created a new slash command for your fork.


## 6. Contributing to the Ecosystem

The 55 Accessibility Agents and 54+ slash commands are starting points. The `.agent.md` format is open - you can create your own agents for any repeatable workflow, and contribute them back to the project.

> **Think strategically about impact.** Before you build, ask: "Who benefits from this agent, and how often?" An agent that saves 100 people five minutes each week has more impact than an agent that saves one person an hour once. The best contributions solve problems that many people share.
>
> Source: [accessibility.github.com/documentation/guide/getting-started-with-agents/](https://accessibility.github.com/documentation/guide/getting-started-with-agents/)

### Two Types of Custom Agents

**Informational agents** - conversational; search, analyze, and present results:

- Perform GitHub searches with predefined scopes and filters
- Present results in specific structured formats
- Query GitHub API tools to answer questions

**Task-oriented agents** - active; edit files, run commands, submit PRs:

- Execute external tools (linters, test suites, axe-core)
- Make direct file edits based on findings
- Create pull requests with proposed changes
- Combine both: explain issues (informational) and fix them (task-oriented)

### Agent File Structure

Every `.agent.md` file has two parts: **YAML frontmatter** (metadata) and a **system prompt** (markdown body).

```markdown
name: agent-name
description: One-sentence description of what the agent does
tools:
  - github/search_issues
  - github/issue_read

## Purpose
Brief explanation of when to use this agent

## Your Capabilities
- What the agent can find or do

## Domain Knowledge
Specific query patterns, filters, or product knowledge

## Responsibilities
Step-by-step behavioral rules

## Response Guidelines
How to format output
```

### Frontmatter fields

| Field | Required | Description |
| -------  | ----------  | -------------  |
| `name` | Recommended | How the agent appears in the agent picker |
| `description` | Recommended | Shown in agent lists |
| `tools` | Optional | Restricts tool access; omit to grant all tools |

**Restricting tool access** is a security best practice - only grant what the agent actually needs:

```yaml
# Informational agent - read-only GitHub tools only
tools: ["github/search_issues", "github/issue_read"]

# Task-oriented agent - file editing, shell execution, and GitHub API
tools:
  - read
  - edit
  - search
  - execute
  - github/*
```

### Example: Informational Agent - `@insiders-a11y-tracker`

This agent monitors VS Code Insiders releases for accessibility improvements. It searches the `microsoft/vscode` repository using predefined GitHub query syntax, so you never have to remember the exact filter parameters.

#### Use it

1. Select `@insiders-a11y-tracker` from the agent picker
2. Ask: `what shipped this month?` or `any keyboard navigation improvements in January?`
3. The agent searches with `repo:microsoft/vscode is:closed milestone:"[Month] [Year]" label:accessibility label:insiders-released` and returns formatted results

**Prerequisite:** GitHub MCP server installed ([github.com/github/github-mcp-server](https://github.com/github/github-mcp-server))

### Example: Task-Oriented Agent - The Markdown Accessibility Assistant

The GitHub Accessibility team published a complete walkthrough for building a **Markdown Accessibility Assistant** - a task-oriented agent that reviews Markdown files for accessibility issues and makes direct fixes. It:

- Runs `markdownlint-cli2` to catch structural problems (heading skips, bare URLs, missing blank lines)
- Reviews link text for descriptiveness
- Flags missing or inadequate alt text and **waits for your approval** before changing it (alt text requires human judgment)
- Fixes heading hierarchy, list structure, and bare URL formatting directly
- Works both locally in VS Code (editing files) and on GitHub.com (reviewing PRs and committing fixes)

This agent is the automated version of the accessibility review skills you built during Day 1. The five principles it enforces are directly from GitHub's accessibility documentation.

**To build it:** Follow the step-by-step guide at [accessibility.github.com/documentation/guide/getting-started-with-agents](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) - the YAML frontmatter, each section of the system prompt, and the complete agent file are all shown.

### Key Pattern: Tiered Decision-Making

From the guide:

```text
For objective issues (link text, heading hierarchy, list structure):
  → Agent makes the fix directly

For subjective issues (alt text, plain language):
  → Agent flags the issue, explains why it matters, suggests a fix,
    and waits for human approval before making changes
```

This tiered approach - automate what can be objectively evaluated, flag what needs human judgment - is the right model for any accessibility agent. It maximizes the agent's value while keeping humans in control of decisions that require context.

### Required Prerequisites for the Markdown Accessibility Assistant

- GitHub MCP server installed and configured ([github.com/github/github-mcp-server](https://github.com/github/github-mcp-server))
- Node.js installed (for `npx markdownlint-cli2`)

### Invoking Custom Agents

#### From VS Code

1. Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I` on macOS)
2. In the Chat input toolbar, select the **Set Agent** button
3. Select your custom agent from the agent picker
4. Type your request - the agent executes in your local workspace

#### From GitHub.com (Task mode)

1. Open Copilot Chat on GitHub.com
2. Select **Task** from the mode picker
3. Optionally select a custom agent from the agent picker
4. Submit your request - the agent can create a PR automatically

#### From an issue (Issue Assignment)

1. Open any issue → **Assignees** → assign **Copilot**
2. In the dialog, optionally select a custom agent
3. Select **Assign** - Copilot creates a branch, makes changes, and opens a PR

### Environment Setup for GitHub (Cloud Agents)

When agents run on GitHub (not locally), they may need additional tools. Create a workflow file at `.github/workflows/copilot-setup-steps.yml` with a single job named `copilot-setup-steps`. GitHub runs this before the agent starts:

```yaml
name: Copilot Setup Steps
on: workflow_dispatch
jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    steps:
      - name: Install accessibility tools
        run: npm install -g markdownlint-cli2 axe-cli
```

**Windows users:** If your project requires a Windows development environment for Copilot coding agent sessions, you can switch the runner from Ubuntu to Windows. See [Switching Copilot to a Windows development environment](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment#switching-copilot-to-a-windows-development-environment) for configuration details.

### To Create Your Own Agent

1. Create `.github/agents/your-agent-name.agent.md`
2. Write YAML frontmatter (`name`, `description`, `tools`)
3. Write the system prompt - identity, capabilities, domain knowledge, behavioral rules, output format
4. Save and reload VS Code (`Ctrl+Shift+P` → "Reload Window")
5. Type `@your-agent-name` in Copilot Chat

### Exercise: Extend the Template Builder Agent

You've built templates manually (Chapters 15-16) and seen them in action. Now see how to harness AI to generate templates interactively, and learn to customize agents for your own projects.

**What You'll Learn:** How agents work, how to interact with the `@template-builder` agent, and how to extend it for project-specific needs.

**Prerequisites:**

- Complete Chapters 15-16 (especially Exercise D - designing your own template)
- VS Code is installed and GitHub Copilot is active
- You have forked [accessibility-agents](https://github.com/Community-Access/accessibility-agents) to your GitHub account
- You have cloned your fork locally: `git clone https://github.com/[your-username]/accessibility-agents.git`


#### Exercise 1: Generate a Template with the Agent

**Your Mission:** Use the `@template-builder` agent to generate an accessibility bug report template interactively. You'll experience the agent as an end-user and see what production-ready agent output looks like.

**Time estimate:** 5-10 minutes


##### Step 1: Open Your Fork in VS Code

###### What to do

1. Open VS Code
2. **File** → **Open Folder** → select your locally cloned [accessibility-agents](https://github.com/Community-Access/accessibility-agents) folder
3. The folder tree appears on the left showing the repository structure
4. **Verify you're in the right place:** The folder name should be [accessibility-agents](https://github.com/Community-Access/accessibility-agents) at the top of the sidebar

###### What you should see

- Left sidebar showing: `.github/`, `docs/`, `learning-room/`, `README.md`, etc.
- The status bar at the bottom shows your current git branch (probably `main`)


##### Step 2: Open Copilot Chat

###### What to do

1. **Keyboard shortcut:** Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (macOS)
   - **Alternative:** Use menu: **View** → **Copilot Chat**
2. A chat panel opens on the right side of VS Code
3. At the top, you see "Copilot Chat" and probably a text input at the bottom saying "Ask Copilot..."

###### What happens

- Copilot is now ready to receive instructions
- You have access to all agents in `.github/agents/` (because you opened that folder)

###### If Copilot Chat doesn't open

- Make sure GitHub Copilot Chat extension is installed (Extensions sidebar → search "GitHub Copilot Chat")
- Make sure you're signed into GitHub (top right of VS Code)
- Restart VS Code if neither of the above is the problem


##### Step 3: Invoke the Template Builder Agent

###### What to do

1. Click in the chat input box (bottom of Copilot Chat panel)
2. Type: `@template-builder` (the `@` prefix invokes an agent)
3. You should see suggestions appearing: a dropdown showing available agents
4. If `@template-builder` appears, click it or press `Enter` to select it
5. The input now shows: `@template-builder`

###### What to do next

1. Type: `create accessibility template`
2. Your full message should read: `@template-builder create accessibility template`
3. Press `Enter` to send

###### What happens

- The agent processes your request
- It starts asking questions via VS Code's Ask Questions interface
- A series of prompts appear asking you to define your template


##### Step 4: Answer the Agent's Questions

###### What to expect

The `@template-builder` agent will ask (via Ask Questions UI):

1. "What's your template name?" (text input)
2. "What's this template for?" (text input)
3. "First field name?" (text input)
4. "Field type?" (dropdown: input, textarea, dropdown, checkboxes, markdown)
5. "Is this field required?" (yes/no toggle)
6. "More fields?" (yes/no)
7. [Repeat for each field you want]

###### How to interact

- **For text inputs:** Type your answer and press `Tab` or `Enter` to move to the next prompt
- **For dropdowns:** Use `↑↓ Arrow keys` to navigate options, `Enter` to select
- **For toggles:** Press `Space` to switch between yes/no

###### Example responses

```text
Q: Template name?
A: Accessibility Bug Report

Q: What's it for?
A: Report screen reader and keyboard navigation issues

Q: First field name?
A: Screen Reader

Q: Field type?
A: dropdown

Q: Dropdown options? (comma-separated)
A: NVDA, JAWS, VoiceOver, TalkBack, Other

Q: Required?
A: Yes

Q: Add another field?
A: Yes

Q: Second field name?
A: Browser

Q: Field type?
A: dropdown

Q: Options?
A: Chrome, Firefox, Safari, Edge, Other

Q: Required?
A: Yes

Q: Add another field?
A: No
```

###### As you answer

- Read each question carefully
- Provide clear, brief answers
- Don't worry about perfect wording - the agent will format it correctly

###### What success looks like

- You've answered at least 3-4 fields
- Each field has a name, type, and requirement status
- The agent confirms: "Ready to generate your template? Yes/No"


##### Step 5: Generate and Review the Output

###### What to do

1. When the agent asks "Ready to generate?", select **Yes**
2. The agent produces a **complete YAML template** in the chat
3. The template appears in a code block with syntax highlighting
4. The code block has buttons: **Copy** and **Insert into File** (or similar)

###### What to look for

- The template starts with `name:`, `description:`, `title:`, `labels:`
- Under `body:`, each field appears with `type:`, `id:`, `attributes:`, `validations:`
- Dropdown fields show `options:` with your specified choices
- Required fields show `required: true`

###### Example output (truncated)

```yaml
name: Accessibility Bug Report
description: Report screen reader and keyboard navigation issues
title: "[A11Y] "
labels: ["accessibility"]

body:
  - type: dropdown
    id: screen_reader
    attributes:
      label: Screen Reader
      options:
        - NVDA
        - JAWS
        - VoiceOver
        - TalkBack
        - Other
    validations:
      required: true

  - type: dropdown
    id: browser
    attributes:
      label: Browser
      options:
        - Chrome
        - Firefox
        - Safari
        - Edge
        - Other
    validations:
      required: true
```

###### Validate the output

- Does the YAML syntax look correct? (colons, indentation, no red squiggles if VS Code is open)
- Are all your fields present?
- Are dropdowns showing the options you specified?
- Are required fields marked as `required: true`?

###### If something looks wrong

- Don't edit the YAML yet - just note what's off
- You can ask the agent: "@template-builder fix the browser field, should be an input not a dropdown"
- The agent regenerates with corrections


##### Step 6: Copy the Template

###### What to do

1. In the code block, click the **Copy** button (usually top-right of the code block)
   - **Keyboard alternative:** Select all the code (`Ctrl+A` while in code block), then `Ctrl+C`
2. The template is copied to your clipboard

###### Verify

- A notification may appear: "Copied to clipboard"
- The text is ready to paste


##### Step 7: Save the Template to Your Fork

###### What to do

1. In VS Code, open the file explorer (left sidebar)
2. Navigate to: `.github/ISSUE_TEMPLATE/`
3. Right-click in the folder and select **New File**
4. Name it: `my-a11y-template.yml` (or `[project]-template.yml`)
5. A new file opens in the editor with an empty content area
6. **Click and paste** your copied YAML: `Ctrl+V`
7. Save the file: `Ctrl+S`

###### What you should see

- The YAML fills the file
- Syntax highlighting colors the code
- No red squiggles (if syntax is valid)
- File is marked as "modified" (white dot on the tab)

1. **Commit and push to GitHub:**

   ```bash
   git add .github/ISSUE_TEMPLATE/my-a11y-template.yml
   git commit -m "feat: add accessibility template (agent-generated)"
   git push origin main
   ```

###### If there's a merge conflict

- Ask your facilitator for help (unlikely at this point)


##### Step 8: Test the Template in Your Fork

###### What to do

1. Go to your fork on GitHub in your browser
2. Click **Issues** tab
3. Click **New issue** → the template chooser appears
4. Your new template should appear: "Accessibility Bug Report"
5. Click it to open the form
6. Fill in a test issue (just to see the form work)
7. **With screen reader:** Navigate through the form and confirm:
   - All labels are announced clearly
   - Dropdown options are readable
   - Required fields are marked

###### What success looks like

- The template appears when you click "New issue"
- All fields display and behave correctly
- Dropdowns work as expected
- Screen reader announces everything clearly


##### Checkpoint: Exercise 1 Complete

Verify you've accomplished:

- Used `@template-builder` to generate a template via Ask Questions
- Received a complete YAML template
- Copied the template and saved it to `.github/ISSUE_TEMPLATE/`
- Pushed it to GitHub
- Tested it in your fork's issue form
- Confirmed it's accessible with screen reader

###### What you learned

- How AI agents can automate the mechanical parts of GitHub workflows
- The interaction pattern: you describe, agent generates, you refine/deploy
- That the agent's output still needs human review and testing


#### Exercise 2: Extend the Agent for Your Project

**Your Mission:** Customize the Template Builder agent to recognize and guide a **Security Vulnerability Report** template. This teaches you how to tailor agents for project-specific needs.

**Time estimate:** 10-15 minutes


##### Step 1: Open the Agent File

###### What to do

1. In VS Code, navigate to `.github/agents/`
2. File: `template-builder.agent.md`
3. Double-click to open it in the editor
4. You see the agent's instructions in Markdown format

###### What to notice

- The file starts with YAML frontmatter (name, description, topics)
- Below that, sections like "## How to Use", "## Pre-Built Workflow"
- Search for the text "Pre-Built Workflow: Guided Accessibility Template"


##### Step 2: Find the Pre-Built Workflows Section

###### What to do

1. Use `Ctrl+F` to open Find
2. Search for: `Pre-Built Workflow`
3. Press `Enter` to jump to the first match
4. You should land on the "Pre-Built Workflow: Guided Accessibility Template" section
5. This section explains how to invoke the agent with a specific behavior

###### What to look for

```markdown
## Pre-Built Workflow: Guided Accessibility Template

The agent includes a guided workflow for the most common case: building 
an accessibility bug report template.

### Invoke with
- `@template-builder` + "create accessibility template"
- `/build-a11y-template`

### Workflow
The agent skips to Phase 2 but pre-populates it with ...
```


##### Step 3: Add a New Pre-Built Workflow

###### What to do

1. Position your cursor at the end of the "Accessibility Template" section (before the next `##` or `---`)
2. Press `Enter` twice to create space
3. Type a new section for Security Vulnerability templates:

```markdown
## Pre-Built Workflow: Guided Security Vulnerability Template

Query the agent with: `@template-builder` + "create security template"

### Workflow
The agent guides you through vulnerability-specific fields:

1. **Vulnerability Type** (dropdown)
   - SQL Injection
   - Cross-Site Scripting (XSS)
   - Authentication bypass
   - Privilege escalation
   - Denial of Service
   - Other

2. **Severity** (dropdown)
   - Critical (impacts availability/integrity/confidentiality)
   - High (moderate impact, likely exploitable)
   - Medium (limited impact or hard to exploit)
   - Low (minimal impact)

3. **Affected Versions** (input)
   - Which versions of your software are vulnerable?

4. **Impact Description** (textarea)
   - What can an attacker do if they exploit this?

5. **Proof of Concept** (textarea, optional)
   - Can you demonstrate the vulnerability?

6. **Requested Disclosure Timeline** (input, optional)
   - When should you publish the fix?

### Output
A security vulnerability report template ready for your project's use.
```

#### What you're adding

- A clear label for the new workflow
- Instructions on how to invoke it
- Pre-defined fields that make sense for security reports
- Specific options for severity and vulnerability type


##### Step 4: Save the Updated Agent

###### What to do

1. Save the file: `Ctrl+S`
2. You should see no error messages
3. The agent file now includes your new Pre-Built Workflow

###### What happens

- The agent recognizes your new workflow
- Next time you invoke `@template-builder` with "create security template", it will follow your new guidance


##### Step 5: Test the Extended Agent

###### What to do

1. Open Copilot Chat again: `Ctrl+Shift+I`
2. Type: `@template-builder create security template`
3. Press `Enter`
4. The agent should now ask vulnerability-specific questions:

   ```text
   Q: Template name?
   A: Security Vulnerability Report

   Q: What's it for?
   A: Report security vulnerabilities in a standardized format

   Q: First field?
   A: Vulnerability Type (dropdown)

   Q: Options?
   A: SQL Injection, XSS, Authentication Bypass, Privilege Escalation, DoS, Other
   ```

###### What success looks like

- The agent recognizes "create security template"
- It guides you through security-specific fields
- The output is a different template than the accessibility one

###### If the agent doesn't recognize your new workflow

- Make sure you saved the file
- Try reloading VS Code: `Ctrl+Shift+P` → "Reload Window"
- Try the agent invocation again


##### Step 6: Deploy Your Extended Agent

###### What to do

1. Commit your agent change:

   ```bash
   git add .github/agents/template-builder.agent.md
   git commit -m "feat: add security vulnerability template workflow to template-builder agent"
   git push origin main
   ```

2. The extended agent is now in your fork
3. Anyone who forks your fork gets the security workflow too

###### What success looks like

- Your commit appears on GitHub
- The agent file shows the new Pre-Built Workflow section
- You can prove the template-builder agent is now customized for your project


##### Checkpoint: Exercise 2 Complete

Verify you've accomplished:

- Located the agent file (template-builder.agent.md)
- Found the Pre-Built Workflows section
- Added a new Security Vulnerability workflow with specific fields
- Tested the agent to confirm it recognizes your new workflow
- Committed and pushed the changes

###### What you learned

- How agents are just structured Markdown instructions
- How to tailor agent behavior for specific domains (accessibility, security, etc.)
- That you can extend agents without rewriting them completely


#### Exercise 3: Iterative Refinement with Agents

**Your Mission:** Generate a template, then ask the agent to modify it incrementally. This teaches you the iterative pattern that scales to all agent-assisted workflows.

**Time estimate:** 5-10 minutes


##### Step 1: Start Fresh

###### What to do

1. In Copilot Chat, type: `@template-builder create a feature request template`
2. Answer the agent's questions to build a feature request form:

   ```text
   Name: Feature Request
   Purpose: Propose new functionality
   Fields:
   - Problem Statement (textarea, required)
   - Proposed Solution (textarea, required)
   - Version Interested (input, optional)
   ```

3. Let the agent generate the YAML
4. Copy it to a file: `.github/ISSUE_TEMPLATE/feature-request.yml`

###### What you're doing

- Running a complete template generation (same as Exercise 1)


##### Step 2: Ask for a Modification

###### What to do

1. Once the template is generated, **while still in the same chat conversation**, ask:

   ```text
   @template-builder add a checkbox field: "I have searched for existing feature requests"
   ```

2. The agent regenerates the YAML with your new checkbox added in the right place (usually as required field pre-validation)

###### What happens

- The agent **modifies** the YAML it generated
- The new checkbox appears in the YAML with proper formatting and indentation
- It doesn't regenerate from scratch - just adds your change


##### Step 3: Request Another Refinement

###### What to do

1. Follow up with:

   ```text
   @template-builder change "Proposed Solution" field to include markdown code block support
   ```

2. The agent modifies the textarea field's attributes to enable code highlighting

###### What changes

- The field now includes `render: "a11y friendly code rendering"` or similar
- The YAML structure is preserved; only the specific field is enhanced


##### Step 4: Observe the Iterative Pattern

###### What to reflect on

1. You gave the agent **one goal** (generate a feature request template)
2. The agent produced **complete output** (full YAML)
3. You **refined incrementally** (add checkbox, enhance code support)
4. At each step, the agent **understood context** (which field, how to modify it)
5. You **didn't start over** - just evolved the template

###### This is the pattern that scales

- **Template generation:** "Create a template with these fields"
- **Code review:** "Review this PR and flag accessibility issues"
- **Issue triage:** "Summarize these 5 issues and suggest priorities"
- **Documentation:** "Generate release notes from these commits"

Each one follows: describe → generate → refine → deploy.


##### Checkpoint: Exercise 3 Complete

Verify you've accomplished:

- Generated a feature request template with the agent
- Asked for a modification (add checkbox)
- Requested further refinement (enhance field)
- Observed how the agent maintains context across requests

###### What you learned

- Agents work best with **iterative dialogue**, not one-shot requests
- You can build complex outputs through successive refinements
- The agent remembers context and can modify instead of regenerate
- This pattern applies to any repeatable GitHub workflow


### What Comes Next

You've now:

1. **Generated a template** using an agent (Exercise 1)
2. **Customized an agent** for your domain (Exercise 2)
3. **Refined iteratively** with agent help (Exercise 3)

Your next step: explore the broader ecosystem.

- Browse the [full agent list](#3-the-ecosystem-55-agents-3-teams-5-platforms) - which agents solve problems you face regularly?
- Try an Accessibility team agent: `@contrast-master check this page` or `@alt-text-headings review this file`
- Try a Developer Tools agent: `@python-specialist review this module for accessibility` or `@desktop-a11y-specialist audit this dialog`
- Think about what is missing: what agent would you build if you could?
- Pick any agent that interests you and run it - the pattern is always the same: **manual skill first, agent second, you refine and decide**

That is Accessibility Agents' promise: not to replace your thinking, but to amplify your skills across all 55 agents - and to grow through the contributions of everyone who uses it.


## 7. The Bigger Picture: Teams, Orchestration, and Beyond VS Code

The 55 agents are not 55 independent tools. They are organized into three teams that work together, and several orchestrator agents exist specifically to coordinate multi-agent workflows.

### How the Three Teams Connect

In practice, a single task often spans multiple teams:

- You ask `@daily-briefing` (GitHub Workflow) for your morning report. It flags a PR that changes ARIA attributes.
- You ask `@pr-review` (GitHub Workflow) to generate a structured review of that PR. The review notes potential accessibility impact.
- You invoke `@aria-specialist` (Accessibility) to deep-check the ARIA changes. It identifies a missing `aria-expanded` state on a disclosure widget.
- You fix the issue using patterns from `@desktop-a11y-specialist` (Developer Tools) if it is a desktop application, or directly in the HTML if it is a web project.

No single agent covers the entire workflow. The teams complement each other: GitHub Workflow agents surface *what happened*, Accessibility agents evaluate *whether it is correct*, and Developer Tools agents help you *implement the fix*.

### Orchestrator Agents

Four agents are specifically designed to coordinate others:

| Agent | Team | What It Orchestrates |
| -------  | ------  | ---------------------  |
| `@nexus` | GitHub Workflow | Cross-agent coordination for complex, multi-step workflows |
| `@accessibility-lead` | Accessibility | Delegates multi-agent accessibility audits to specialist agents |
| `@web-accessibility-wizard` | Accessibility | Guided WCAG audit that invokes contrast, keyboard, forms, and other specialists |
| `@document-accessibility-wizard` | Accessibility | Guided document audit across Word, Excel, PowerPoint, and PDF |

You do not need to use orchestrators to get value from individual agents. But when a task is complex enough to span multiple agents, orchestrators save you the work of manually chaining requests.

### High-Impact Agents to Try First

Rather than exploring all 55 agents at once, start with the ones that deliver immediate value based on Day 1 skills you already have:

| If You Can Already | Try This Agent | And This Command |
| --------------------  | ----------------  | ------------------  |
| Read issues and write replies | `@issue-tracker` | `/triage`, `/issue-reply` |
| Review a PR diff | `@pr-review` | `/review-pr`, `/address-comments` |
| Check your contribution activity | `@analytics` | `/my-stats`, `/sprint-review` |
| Write issue templates | `@template-builder` | `/create-issue` |
| Track what changed overnight | `@daily-briefing` | `/daily-briefing` |
| Scan a page for accessibility issues | `@web-accessibility-wizard` | `/onboard-repo` |
| Check color contrast manually | `@contrast-master` | (invoke directly) |
| Test keyboard navigation | `@keyboard-navigator` | (invoke directly) |

### Slash Commands That Save the Most Time

These commands work without invoking a full agent - type them directly in Copilot Chat:

- **`/my-issues`** and **`/my-prs`** - Instant dashboard of your open work across all repos
- **`/review-pr #14`** - Full AI-generated review with inline suggestions, replacing manual line-by-line reading
- **`/triage #22`** - Label, priority, and assignment suggestions for any new issue
- **`/daily-briefing`** - Morning snapshot of repository activity, PRs needing review, and stale issues
- **`/a11y-update`** - Latest accessibility improvements with WCAG cross-references
- **`/draft-release v2.0`** - Generate release notes from merged PRs
- **`/onboard-repo`** - First-time scan of a repo with health assessment and recommended actions

The full list of 54+ commands is in [Appendix V](appendix-l-agents-reference.md), and [Episode 39](../PODCASTS.md) walks through all of them with examples.

### Running Agents Beyond VS Code

Accessibility Agents' agents run on your machine, in your editor, when you ask for them. That is one scope.

The same Markdown-authored pattern extends further:

### Scope 1: Your Editor (Accessibility Agents)

- **File lives in:** `.github/agents/[name].agent.md` in your workspace
- **Triggered by:** You, when you type `@[agent-name]` in Copilot Chat
- **Runs on:** Your machine, using your Copilot subscription
- **Reaches:** Every repository your GitHub account has access to
- **Scale:** All 55 agents available when the workspace is open

### Scope 2: Your Repository (Travels with Forks)

- **File lives in:** `.github/agents/[name].agent.md` in the repo
- **Triggered by:** Any contributor who has Copilot and opens the repo as a VS Code workspace
- **Runs on:** Their machine, using their Copilot subscription
- **Reaches:** Their GitHub account's repositories

When you fork [accessibility-agents](https://github.com/Community-Access/accessibility-agents), all 55 agents come with it. You can edit them for your project's context. You can add new ones. You can share them with every contributor who clones your fork.

### Scope 3: The Cloud (GitHub Agentic Workflows)

- **File lives in:** `.github/workflows/[name].md` (same folder as standard Actions YAML)
- **Triggered by:** Any GitHub event - `issues: opened`, `pull_request: created`, `schedule:`
- **Runs on:** GitHub Actions infrastructure, serverlessly
- **Reaches:** The repository where the workflow is defined

No VS Code required. No local machine required. The workflow runs whether or not anyone is watching - when an issue is opened at 3am, the agentic response fires.

**The link between Accessibility Agents and Agentic Workflows:** Both use Markdown-authored instructions. Both define intent in plain language. Both travel with the repository. The Accessibility Agents pattern *is* a conceptual precursor to GitHub Agentic Workflows - understanding one makes the other immediately readable.

### Go Deeper

For full documentation on every agent, all 54+ slash commands, customization formats, and troubleshooting, see [Appendix V: Accessibility Agents Reference](appendix-l-agents-reference.md). For the audio version, listen to [Episode 39: Accessibility Agents - Complete Reference](../PODCASTS.md).

#### Example: Auto-triage accessibility issues

File: `.github/workflows/auto-triage-a11y.md`

```markdown
name: Auto-Triage Accessibility Issues
on:
  issues:
    types: [opened]

When an issue is opened with "accessibility" or "a11y" or "screen reader" in the title:

1. Apply labels: `accessibility`, `needs-triage`
2. Assign to the accessibility team
3. Add a comment:

> Thanks for filing this accessibility issue. Our team has been notified and will review it within 24 hours.
>
> To help us address this faster, please include:
> - Which screen reader you're using (NVDA, JAWS, VoiceOver)
> - Steps to reproduce the issue
> - What you expected vs what actually happened
>
> - Auto-triage agent

4. If the issue body already includes those details, remove the `needs-triage` label
```

This runs automatically on every new issue. No human intervention required.


## 8. GitHub Desktop, GitHub CLI, and Copilot CLI

These tools are not required for this workshop, but are worth knowing as options for different workflows.

### GitHub Desktop

A graphical Git application with an accessible interface.

- **Download:** [desktop.github.com](https://desktop.github.com)
- **Useful for:** Visual diff review, simpler branch management
- **Screen reader support:** Partial - keyboard navigation works for core flows

**When to use:** If command-line Git feels overwhelming, GitHub Desktop provides a GUI alternative.

### GitHub CLI (`gh`)

A command-line interface for GitHub operations.

#### Install

```bash
winget install GitHub.cli       # Windows
brew install gh                 # macOS
```

#### Authenticate

```bash
gh auth login
```

#### Common commands

```bash
gh issue list                   # List issues in current repo
gh issue view 42                # Read issue #42
gh pr list                      # List pull requests
gh pr view 14                   # Read PR #14
gh pr create                    # Create a new PR interactively
gh pr merge 14                  # Merge PR #14
gh repo clone owner/repo        # Clone a repository
gh repo fork owner/repo         # Fork a repository
```

**Screen reader advantage:** `gh` output is plain text with no dynamic regions - more predictable than the browser for certain operations.

### GitHub Copilot CLI (`gh copilot`)

An extension that adds Copilot to the terminal.

#### Install

```bash
gh extension install github/gh-copilot
```

#### Commands

```bash
# Ask Copilot to explain a command
gh copilot explain "git rebase -i HEAD~3"

# Ask Copilot to suggest a command
gh copilot suggest "undo my last commit but keep the changes"

# Ask Copilot to write a shell script
gh copilot suggest "create a script that finds all Markdown files and checks for heading hierarchy"
```

**Use case:** When you know *what* you want to do but are unsure of the exact git command syntax.

## Example session

```bash
$ gh copilot suggest "show me all commits from last week"

Suggestion: git log --since="1 week ago" --oneline

Run this command? (Y/n)
```


## Keyboard Shortcuts - Accessibility Agents Quick Reference

| Action | Shortcut |
| --------  | ----------  |
| Open Copilot Chat | `Ctrl+Shift+I` |
| Invoke agent | Type `@agent-name` in Chat |
| Use slash command | Type `/command` in Chat |
| Accessible View | `Alt+F2` |
| Clear chat history | `Ctrl+L` |
| Command Palette | `Ctrl+Shift+P` |


## Troubleshooting

### "Agent not found"

**Issue:** Typing `@agent-name` shows "No agent found."

#### Solutions

1. Verify `.github/agents/[name].agent.md` exists in your workspace
2. Reload VS Code window: `Ctrl+Shift+P` → "Reload Window"
3. Check file naming: must end with `.agent.md`
4. Verify YAML frontmatter is valid (no syntax errors)

### Agent produces incorrect output

**Issue:** Agent's response is wrong or misses context.

#### Solutions

1. **Provide more context in your prompt:** Be specific about what you need
2. **Use @ mentions:** Reference specific files or selections (`@filename.md`, `#selection`)
3. **Check the agent's prerequisites:** Did you do the manual work first?
4. **Review the agent's instructions:** Open `.github/agents/[name].agent.md` and read what it's supposed to do

### Slash command doesn't work

**Issue:** `/command` shows "Command not found."

#### Solutions

1. Verify `.github/prompts/[name].md` exists
2. Reload window: `Ctrl+Shift+P` → "Reload Window"
3. Check file naming: must be a `.md` file in `.github/prompts/`
4. Try typing the full command name (autocomplete may be incomplete)


*Back: [Issue Templates](17-issue-templates.md)*  
*Reference: [Appendix V: Accessibility Agents Reference](appendix-l-agents-reference.md)*  
*Related: [Culture & Etiquette](08-open-source-culture.md) | [Working with Issues](05-working-with-issues.md) | [Appendix M: VS Code Accessibility Reference](appendix-g-vscode-reference.md)*
