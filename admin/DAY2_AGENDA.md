# Day 2 Agenda
## From Contributor to Product Maker - Igniting the Forge

**Date:** [WORKSHOP_DATE_DAY2] | 9:00 AM - 5:00 PM

> **The premise of Day 2:** Whether you built your GitHub skills yesterday in Day 1 or you are joining today with existing GitHub experience, the foundation is the same: you know how to navigate repositories, file issues, open pull requests, and review someone else's work. Those skills are yours now.
>
> Day 2 is about what you can build with those skills. You will deepen your contributions using VS Code and GitHub Copilot. You will use Accessibility Agents - a live, public accessibility project built by your facilitator - not as a shortcut around the skills you learned, but as a **product you can understand, evaluate, critique, and improve** because you now know exactly what it is doing and why.
>
> You will leave with your name in the commit history of a real open source project and a set of tools you can use on any GitHub repository you ever work on.
>
> **Joining on Day 2 without attending Day 1?** See the [Day 2 Quick Start](DAY2_QUICK_START.md) guide to verify your setup and self-assess your readiness.


## Prerequisites for Day 2

Day 2 requires the following skills and setup. If you attended Day 1, you have all of these. If you are joining fresh, verify each item before the session.

| Requirement | What it means | Where to get it |
|---|---|---|
| Navigate a GitHub repository | Find files, read commits, switch branches using keyboard/screen reader | [Chapter 3](../docs/03-navigating-repositories.md) |
| File and manage issues | Create issues, add labels, use @mentions | [Chapter 5](../docs/05-working-with-issues.md) |
| Open and review pull requests | Create a PR, link it to an issue, review a diff, leave comments | [Chapter 6](../docs/06-working-with-pull-requests.md) |
| Understand merge conflicts | Recognize conflict markers, resolve manually | [Chapter 7](../docs/07-merge-conflicts.md) |
| Git installed and configured | `git config` with your name and email set | [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md) |
| VS Code installed with extensions | GitHub PR extension, Copilot, Copilot Chat | [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md) |
| Classroom repo accepted | Accept the Day 2 Classroom assignment link from your facilitator | [Day 2 Quick Start](DAY2_QUICK_START.md) |


## At a Glance

| Time | Block | Theme |
|------|-------|-------|
| 9:00-9:30 | Block 0 - Welcome and Orientation | Onboard all participants, verify setup, set goals |
| 9:30-10:30 | Block 1 - VS Code Setup | Screen reader mode, Accessibility Agents as workspace, navigation |
| 10:30-10:45 | Break | - |
| 10:45-12:00 | Block 2 - Deep Contribution | Copilot Chat, inline suggestions, richer PR work |
| 12:00-13:00 | Lunch | - |
| 13:00-14:00 | Block 3 - Activate the Agents | First live agent commands - after earning them |
| 14:00-15:00 | Block 4 - Agentic Workflows | Cloud agents, GitHub Actions, the full reach |
| 15:00-15:15 | Break | - |
| 15:15-16:15 | Block 5 - Ship Your Contribution | Real PR upstream to `community-access/accessibility-agents` |
| 16:15-17:00 | Block 6 - Spec Kit: Design the Future | Group speccing session - what comes next |
| 17:00-17:30 | Wrap-Up | Names in history, reflections, next steps |


## Block 0 - Welcome and Orientation
**9:00-9:30**

### Purpose
Bring everyone to the same starting line -- whether they attended Day 1 or are joining fresh today. Celebrate what was shipped yesterday, onboard new participants, and set the Day 2 mindset: you are not a learner today - you are a product maker.

### Track A: Returning from Day 1 (Facilitator-Led, 15 min)
- *"Show me your merged PR from yesterday."* (30-second screen reader tour - navigate to pull requests tab, filter by closed, confirm the merge)
- *"What did you file an issue about? Is it still open or was it triaged?"*
- *"What felt hard yesterday? What clicked?"*

### Track B: Joining on Day 2 (Parallel Setup, 15 min)
New participants work with a facilitator or designated Day 1 veteran to:
1. Introduce themselves (name, screen reader, OS, GitHub experience)
2. Verify setup: GitHub account, VS Code, Git identity, Day 2 Classroom assignment accepted (see [Day 2 Quick Start](DAY2_QUICK_START.md))
3. Get paired with a Day 1 participant who can answer context questions during the session
4. Quick orientation: open their Classroom repo in the browser, navigate to Issues, confirm screen reader announces headings

> **Facilitator note:** Run Track A and Track B simultaneously. Day 1 veterans share their experience while new participants verify setup. Both groups reconvene for goal-setting.

### Day 2 Goal-Setting (Everyone, 10 min)
Each participant states one contribution goal for the day. Examples:
- *"I want to add a new slash command to accessibility-agents for tracking accessibility issues."*
- *"I want to improve the screen reader output of the `@daily-briefing` report."*
- *"I want to write documentation for the `@insiders-a11y-tracker` agent."*

Write it down. You will check it against reality at 5pm.


## Block 1 - VS Code Setup
**9:30-10:30**

> This block builds on [VS Code: Setup & Accessibility Basics](docs/11-vscode-interface.md), [Git & Source Control in VS Code](docs/14-git-in-practice.md), and [GitHub Pull Requests Extension](docs/15-code-review.md) for full reference.

### Purpose
Move from browser-based GitHub to VS Code as your contribution environment. Set up screen reader mode. Open `accessibility-agents` as a workspace. Understand what you are looking at before any agent runs.

### Step 0 - Bridge: Try github.dev Before Installing Anything

Before touching the desktop install, spend five minutes in github.dev. This is VS Code - running in your browser - with no install required. The keyboard shortcuts and screen reader mode are identical to the desktop app.

1. Open [github.dev/community-access/accessibility-agents](https://github.dev/community-access/accessibility-agents) in your browser
2. Press `Shift+Alt+F1` to enable screen reader mode inside github.dev
3. Press `Ctrl+Shift+E` - the Explorer panel opens with the full file tree
4. Navigate to `.github/agents/daily-briefing.agent.md` and press `Enter` to open it
5. Press `Ctrl+Shift+P` and type `markdown preview` - select "Markdown: Open Preview"

You just used VS Code. The desktop is the same experience. The only differences: github.dev has no terminal, no Copilot, and no Accessibility Agents. Those are precisely what the desktop adds - and why the desktop is worth installing.

> All keyboard shortcuts you practice here (`Ctrl+Shift+E`, `Ctrl+P`, `Ctrl+Shift+P`, `Ctrl+G`, `F3`) will work identically on the desktop. There is no ramp-up - you are already there.

### Step 1 - Enable Screen Reader Mode
VS Code has a dedicated screen reader accessibility mode that adjusts verbosity, focus behavior, and announcement patterns.

| Screen Reader | How to Activate VS Code Screen Reader Mode |
|--------------|-------------------------------------------|
| NVDA | Open VS Code → VS Code detects NVDA automatically → or press `Shift+Alt+F1` |
| JAWS | Open VS Code → JAWS detection is automatic → or press `Shift+Alt+F1` |
| VoiceOver | Open VS Code → `Shift+Alt+F1` → confirm the dialog |

**Verify it is active:** Open the Command Palette (`Ctrl+Shift+P`) → type `accessibility` → you should see "Toggle Screen Reader Accessibility Mode" with a checkmark.

**Key setting to check:** Open Settings (`Ctrl+,`) → search `accessibility support` → confirm it shows `on`.

### Step 2 - Fork, Clone, and Open Accessibility Agents

Before you can work on Accessibility Agents locally, you need your own copy (a fork) and a local clone of that fork.

**Fork the repository (browser - see [Working with Pull Requests](../docs/06-working-with-pull-requests.md) if this is new):**
1. Navigate to [github.com/community-access/accessibility-agents](https://github.com/community-access/accessibility-agents)
2. Find and activate the **Fork** button (`B` to navigate buttons)
3. Keep the defaults and activate **Create fork**
4. GitHub redirects you to your fork: `github.com/[your-username]/accessibility-agents`

**Clone the fork (VS Code terminal - your first Git command):**
1. Open a terminal in VS Code (`Ctrl+Backtick`)
2. Navigate to where you want to store projects: `cd ~/Documents` (or your preferred folder)
3. Clone your fork:
   ```bash
   git clone https://github.com/[your-username]/accessibility-agents.git
   ```
4. Enter the project folder: `cd accessibility-agents`
5. Open VS Code in that folder: `code .`
6. VS Code opens with the `accessibility-agents` repository as your workspace

> **Screen reader note:** The `git clone` command prints progress messages. When you hear the terminal go quiet, it is done. The folder now exists on your machine.

**What to navigate first (with screen reader):**

| VS Code Area | Key | What You Hear |
|-------------|-----|---------------|
| Explorer sidebar | `Ctrl+Shift+E` | File and folder tree |
| `.github/agents/` folder | `Arrow keys` | 55 `.agent.md` files across three teams |
| `.github/prompts/` folder | `Arrow keys` | 54+ slash command template files |
| `Documentation/` folder | `Arrow keys` | `GETTING-STARTED.md`, `GUIDE.md` |
| `ai-instructions/` folder | `Arrow keys` | Copilot, Claude, OpenAI integration guides |

**Hands-on task:** Navigate to `.github/agents/daily-briefing.agent.md`. Open it. Read the first 20 lines using `Ctrl+Home` then `Down Arrow`. You are reading the instructions that tell Copilot how to think about your GitHub account. This is how agents work - plain language, no magic.

### Step 3 - Read One Agent File Before Anything Else
Before you issue a single agent command, read the `.agent.md` file for that agent.

- What repositories does it target by default?
- What output format does it produce?
- What permissions does it need?

This is the same quality check you would apply to any open source code: read it before you run it.

### Step 4 - Open Copilot Chat
Press `Ctrl+Shift+I` to open the Chat panel.

**NVDA users:** The chat input field is announced as "Chat input." Use `Tab` to move between the input and the response area. Use `Ctrl+Alt+Arrow` to navigate within the response.

**JAWS users:** The chat interface is a web-based panel. Switch to Forms Mode (`Enter` on the input field) to type. Tab out of the input to reach the conversation area in Virtual/Reading mode.

**VoiceOver users:** `VO+Tab` to the chat input. `VO+Shift+Down` to interact with it. `VO+Escape` to stop interacting and navigate the response.


## Block 2 - Deep Contribution with Copilot
**10:45-12:00**

### Copilot Orientation (15 min)

Before diving into contributions, get familiar with how Copilot works as a writing partner.

**Inline suggestions (`Ctrl+I`):**
1. Open any `.md` file in the workspace
2. Place your cursor at the end of a line and press `Ctrl+I`
3. Type a prompt: `Add a sentence explaining why this agent uses heading navigation`
4. Copilot suggests text inline. Press `Tab` to accept, `Escape` to dismiss
5. **Screen reader note:** NVDA announces "Inline suggestion" when one appears. Press `Alt+]` to read the suggestion before accepting

**Chat as a thinking partner:**
1. Open Chat (`Ctrl+Shift+I`) if not already open
2. Type: `Explain what the daily-briefing agent does in plain English`
3. Read the response. Use `H` (heading navigation) to jump between sections
4. Try: `What are three ways I could improve this agent for screen reader users?`

**Key principle:** Copilot drafts. You decide. Every suggestion should be read, evaluated, and edited before committing. Your name goes on the commit.

### Purpose
Make a richer contribution to your fork of `accessibility-agents` using Copilot as a writing partner - not a replacement for your judgment. Copilot helps you articulate ideas you already have. The idea - the product intention - is yours.

### What "Product Maker" Means Here
A product maker does not just report bugs or fix typos. A product maker looks at something that exists, understands what it is for, identifies a gap, and proposes a meaningful improvement.

In the context of `accessibility-agents`, that might be:
- A new slash command (a `.md` file in `.github/prompts/`)
- An improvement to an existing agent's output format for screen reader users
- A missing section in the `Documentation/GUIDE.md`
- An accessibility improvement to the HTML output format
- A new AI platform integration in `ai-instructions/`

**Your contribution does not require code.** Every agent, every prompt, every documentation improvement is a Markdown file.

### Using Copilot as a Writing Partner
Open the file you want to improve. Press `Ctrl+I` to open inline chat.

**Examples of effective Copilot prompts for this context:**

| What You Want | What to Type |
|--------------|-------------|
| Explain what an existing agent file does | `Explain what this agent does in plain English. What are its strengths and limitations?` |
| Draft a new slash command | `Help me write a new prompt template for [your idea]. It should follow the same structure as the existing files.` |
| Improve screen reader output | `This agent generates HTML output. How can I improve the heading hierarchy and ARIA landmark structure for screen reader users?` |
| Write documentation | `Write a documentation section explaining [concept] for someone who uses a screen reader and is new to GitHub.` |
| Check your own writing | `Review this Markdown file for clarity, tone, and completeness. Flag anything that might be unclear to a first-time contributor.` |

### Hands-On Activity: Draft Your Contribution
1. Identify one file in `accessibility-agents` you want to improve
2. Read the file completely using your screen reader before suggesting any changes
3. Use Copilot Chat to help you draft your improvement
4. Review Copilot's output critically - edit, improve, make it yours
5. Commit the change to your branch: `git add .` → `git commit -m "your message"`

**Branch naming:** Follow the `accessibility-agents` contributing conventions:
- Features: `feature/your-description`
- Fixes: `fix/what-you-fixed`
- Documentation: `docs/what-you-documented`

### Contribution Checkpoint (before lunch)

Before leaving for lunch, check your progress:

- **On pace:** You have at least one commit on a named branch. You are ready for Block 3.
- **Almost there:** You have identified a file and started drafting but have not committed yet. Use the first 10 minutes after lunch to finalize your commit before the agent demonstrations begin.
- **Still exploring:** You have not yet identified a file to improve. During lunch, read through the `.github/agents/` files and pick one. When Block 3 starts, the facilitator will demo agents on the repository - watching those demos will help you see where improvements are needed.


## Block 3 - Activate the Agents
**13:00-14:00**

> **This block is the payoff.** You earned it yesterday. You understand what GitHub is, how repositories work, what issues and pull requests are, and how notifications flow. Now you watch an agent do the work you know how to verify.
>
> **If you have any doubt about whether you have earned a particular agent: the prerequisite is simple.** Can you do the equivalent step manually, right now, from memory? If yes - the agent is ready to amplify you. If no - do the manual step first. The block is structured so this never happens, but the standard is worth knowing.

### Why the Order Matters

Agents are run in a specific sequence - from broadest to most specific, from observation to action. This is not arbitrary. Each agent in this block builds on the skill directly before it.

| Step | Agent | Skill It Amplifies | Reference |
|------|-------|-------------------|-------------|
| 1 | `@daily-briefing` | Reading your notification inbox and activity summary | [Navigating Repos](../docs/03-navigating-repositories.md) + [Notifications](../docs/10-notifications-and-day-1-close.md) |
| 2 | `@issue-tracker` | Triaging and prioritizing issues manually | [Working with Issues](../docs/05-working-with-issues.md) + [Labels & Milestones](../docs/09-labels-milestones-projects.md) |
| 3 | `@pr-review` | Manually reviewing a PR diff and writing inline comments | [Working with Pull Requests](../docs/06-working-with-pull-requests.md) |
| 4 | `@insiders-a11y-tracker` | Filing accessibility bugs and applying WCAG labels | [Working with Issues](../docs/05-working-with-issues.md) + [Labels & Milestones](../docs/09-labels-milestones-projects.md) |

`@analytics` is available as an extension if Block 3 runs ahead of schedule - it requires understanding contribution graphs and activity history.

### The Demonstration Sequence
The facilitator runs each command live. Participants follow along in their own VS Code + Copilot Chat.

**Before each command, the facilitator asks:**
*"If you ran this command manually - without an agent - what would you do? Where would you go? What would you look for?"*

Participants answer from their Day 1 knowledge. Then the command runs. Then the room compares the agent's output to the manual process.


### 1. `@daily-briefing morning briefing`

**What the agent does:** Sweeps every repository you have access to - issues opened in the last 24 hours, PR review requests awaiting you, CI failures on your branches, security alerts, community reactions to your comments - and delivers it as one prioritized document.

**What you already know:** You navigated each of these areas manually yesterday. The Issues tab. The Pull Requests tab. The Actions tab. The notification inbox. The agent is visiting all of those places - you know exactly what it found because you know where it went.

**Screen reader tip:** The briefing output is announced as a long document. Use `H` (heading navigation in virtual mode) to jump between sections: "Open Issues," "Review Requests," "CI Alerts," etc. Each section is a heading level 2.

**Verify one item:** The agent lists an issue. Navigate to that issue in your browser using the link in the output. Confirm the information matches. This is your quality check - you still know how to verify independently.


### 2. `@issue-tracker find open issues labeled good-first-issue`

**What the agent does:** Searches every repository you have access to for issues labeled `good-first-issue`, scores them by community engagement and release timing, and returns a prioritized list with discussion context.

**What you already know:** Yesterday you filtered the Issues tab by label. You read issue descriptions. You identified which ones had active discussion. The agent is applying a scoring algorithm to the same information.

**Hands-on:** From the agent's list, pick one issue in a repository you have not contributed to before. Read the full issue - navigate to it in your browser. Is the agent's priority score reasonable? What context does the agent's summary miss?


### 3. `@pr-review review PR #[your PR number]`

**What the agent does:** Generates a full review document for your pull request: line-numbered diff, change map, risk assessment, before-and-after snapshot, CI results, and suggested inline review comments.

**What you already know:** Yesterday you read diffs manually on the Files Changed tab. You wrote inline comments. You submitted a batched review. You know what a good review looks like.

**Critical exercise:** Compare the agent's suggested comments to what you wrote manually in your Day 1 review.
- Did the agent catch things you missed?
- Did the agent miss context you knew from the issue thread?
- Is the agent's tone aligned with the community standards from [Culture and Etiquette](docs/08-open-source-culture.md)?

Edit the agent's output before posting any of it. Your name goes on it.


### 4. `@insiders-a11y-tracker` - Accessibility Change Monitoring

**What the agent does:** Monitors accessibility-relevant changes across your configured repositories - WCAG/ARIA cross-referenced, tracking anything that touches keyboard navigation, ARIA attributes, focus management, color contrast, or screen reader labels.

**Hands-on:** Run `@insiders-a11y-tracker check recent changes in accessibility-agents`. Look at the HTML output files. Does your Day 2 contribution affect any accessibility-sensitive areas? If yes, the agent flags it. If no, confirm that is accurate.

This agent is quality assurance for the accessibility quality of your own contribution - before you submit it for review.

### Stand and Stretch (5 min)

The agents are running. Step away from the screen for five minutes. Screen reader listening for an hour after lunch is demanding. When you return, Block 4 shows you how these same agents run in the cloud - without you pressing a key.


## Block 4 - GitHub Agentic Workflows
**14:00-15:00**

> **Reference:** [GitHub Actions and Workflows](docs/appendix-q-actions-workflows.md) - read the "Day 2 Bridge" section at the bottom before this block.

### The Cloud Extension: What Agentic Workflows Are

Everything in Block 3 ran in VS Code - on your machine, on demand, when you asked for it. GitHub Agentic Workflows run in the cloud, inside GitHub Actions, on any trigger you define: when an issue is opened, on a schedule, when a PR is created.

The `.agent.md` pattern in Accessibility Agents and the GitHub Agentic Workflows `.md` pattern share the same philosophy: describe your intent in plain language, let a coding agent execute it. Both are plain text files in `.github/`. Both travel with every fork.

### Reading a Workflow File - Step by Step

Open `accessibility-agents/.github/` in VS Code Explorer. If a `.github/workflows/` directory exists, navigate to it. The facilitator will walk through an example agentic workflow file.

**Anatomy of a GitHub Agentic Workflow:**

```markdown
on:
  issues:
    types: [opened]
permissions:
  issues: write
safe-outputs:
  - add-comment
  - add-label
tools:
  - copilot

When a new issue is opened, read its title and body.
Determine which category it belongs to: bug report, feature request,
accessibility issue, documentation gap, or question.
Apply the matching label. Post a friendly first-response comment
acknowledging the issue and explaining what happens next.
Do not close the issue. Do not merge anything. Do not modify any files.
```

**What to notice:**
- `on: issues: types: [opened]` - this is the same trigger system from standard GitHub Actions YAML
- `permissions: issues: write` - explicit, minimal permissions; the agent cannot write to code or PRs
- `safe-outputs` - a whitelist of what the agent is allowed to do; anything not listed is blocked
- The instructions are plain English - readable, auditable, understandable by any contributor

### Live Demonstration: File an Issue, Watch the Agent Respond

1. The facilitator has a demo workflow configured in a test repository
2. A participant files a new issue (using the manual process they learned on Day 1)
3. The room watches the Actions tab - the agentic workflow triggers within 60 seconds
4. The workflow reads the issue, applies a label, and posts a first-response comment
5. The participant reads the agent's comment using their screen reader
6. Discussion: *"Is the label correct? Is the comment tone right? What would you change in the workflow instructions?"*

**Screen reader tip for Actions tab:** Navigate to the repository's Actions tab (`T` from the tab bar). The workflow run list is a series of list items. Each is announced with the workflow name, run status (queued/in progress/completed), and timestamp. Press `Enter` to open a run and read its steps.

### Key Principles of Safe Agentic Workflows

| Principle | What It Means |
|-----------|--------------|
| Read-only by default | Agents cannot write code, merge PRs, or push to branches |
| Safe-outputs model | Only explicitly listed actions are permitted |
| Defense-in-depth | Sandboxing, tool allowlisting, network isolation |
| No auto-merge | Every change goes through a human-reviewed pull request |
| Transparent | Every action the agent takes is logged in the Actions run |
| Auditable | The plain-language workflow file is the contract |

### The Reach of Agentic Thinking

| Scope | Tool | Where It Runs |
|-------|------|--------------|
| Your editor, on demand | Accessibility Agents in VS Code | Your machine |
| Your repo, travels with forks | Accessibility Agents `.github/agents/` | Any contributor's machine |
| Cloud, runs on any trigger | GitHub Agentic Workflows | GitHub Actions infrastructure |
| Cloud, scheduled | Agentic Workflow with `schedule:` trigger | GitHub Actions, no human required |


## Block 5 - Ship Your Contribution
**15:15-16:15**

### Purpose
Polish and submit your real pull request upstream to `community-access/accessibility-agents`. Not to your fork - to the original. This is the moment the product maker mindset becomes tangible.

### If Your Contribution Is Still in Progress

If you did not finish your commit during Block 2, use the first 15 minutes of this block to finalize:
1. Open the file you were working on in VS Code
2. Use Copilot (`Ctrl+I`) to help you finish any incomplete sections
3. Commit: `git add .` then `git commit -m "your message"`
4. Then proceed to the Pre-Submission Checklist below

### Pre-Submission Checklist
Before opening the PR, run through this with your screen reader:

```
□ My branch has a clear descriptive name (feature/, fix/, or docs/)
□ I committed with a clear, present-tense message
□ I read my changes back using VS Code's diff view (Ctrl+Shift+G → select file)
□ I ran @insiders-a11y-tracker to confirm no accessibility regressions
□ I filled in the accessibility-agents PR template completely:
    □ Description: what this adds or fixes and why
    □ Type of change: feature / fix / documentation
    □ Testing: how to verify the improvement
    □ Accessibility: any screen reader considerations
    □ Related issue: linked to the issue I filed (if applicable)
□ I reviewed my PR description tone against the Culture & Etiquette guide
□ I requested a review from the repo maintainer
```

### Opening the PR to `community-access/accessibility-agents`

**Option A - from your browser:**
1. Navigate to your fork on GitHub
2. GitHub will show a yellow banner: "Your branch is N commits ahead of `community-access:main`"
3. Activate "Contribute" → "Open a pull request"
4. Confirm the base repository is `community-access/accessibility-agents` and base branch is `main`
5. Fill in the PR template
6. Submit

**Option B - from VS Code GitHub Pull Requests extension:**
1. Open the Source Control panel (`Ctrl+Shift+G`)
2. Navigate to "Pull Requests" in the sidebar
3. Activate "Create Pull Request"
4. Select base: `community-access/accessibility-agents` → `main`
5. Fill in the title and description
6. Submit

**What happens next:** The maintainer (Jeff, your facilitator) reviews the PR. If it meets the contribution standards, it gets merged. Your name goes into the commit history of a live, public, accessibility-focused open source project - permanently.

### Forge Partner Review
While your PR is awaiting review, review a forge partner's PR:
1. Use `@pr-review review PR #[their PR number]` to generate a starting point
2. Edit the output for tone and accuracy
3. Post your review in the browser (or via GitHub PR extension)
4. For each comment, ask: *"Is this the kind of feedback I would want to receive?"*


## Block 6 - Spec Kit: Design the Future
**16:15-17:00**

> **What is Spec-Driven Development?** It is the practice of writing the *intent* of a feature before anyone builds it. The specification becomes the source of truth - AI uses it to plan tasks, contributors use it to stay aligned, and the community uses it to evaluate whether the feature actually delivered what was intended.

### The Exercise: Specify the Next Version of Accessibility Agents

The facilitator opens Copilot Chat and types `/specify` to initiate a spec session. The group collaborates to answer:

- *What is missing from the 55 agents that would make the ecosystem more useful for screen reader users?*
- *Which of the three teams (Accessibility, GitHub Workflow, Developer Tools) has the biggest gap?*
- *The roadmap lists mobile native agents and document remediation - what would you prioritize?*
- *What if Accessibility Agents had a searchable web interface - what accessibility requirements would it need on day one?*

**How to participate (no typing required):**
Speak your requirements aloud. The facilitator types them. Copilot helps convert them into a structured specification.

**Accessibility requirements you might suggest:**
- All output must have proper heading hierarchy (never skip H1→H3)
- All links must have descriptive text, never bare URLs
- All tables must have captions and scoped column headers
- The web interface must work with NVDA, JAWS, and VoiceOver tested
- Color must not be the only means of communicating status

**The output:** A `spec.md` file committed to `accessibility-agents`. A record of what the community intended. Anyone who wants to build it next week has a starting point.

**The Spec Kit toolkit** (for self-directed use after the workshop):
- Repo: [Spec Kit repository on GitHub](https://github.com/github/spec-kit)
- Init command: `uvx --from git+https://github.com/github/spec-kit.git specify init accessibility-agents-v2`
- Slash commands: `/specify` → `/plan` → `/tasks` → implement


## Wrap-Up
**17:00-17:30**

### The Moment: Find Your Name in History

1. Navigate to `https://github.com/community-access/accessibility-agents`
2. Go to the Insights tab → Contributors
3. Or: navigate to the commit history of the file you contributed to
4. Find your username in the list

This is real. This is permanent. This is yours.

### What You Are Taking Home

| Artifact | Where It Lives | What You Can Do With It |
|----------|---------------|------------------------|
| Your fork of `accessibility-agents` | `github.com/[your-username]/accessibility-agents` | 55 agents across 3 teams - use them on any GitHub repo, on 5 platforms |
| Your name in the upstream commit history | `github.com/community-access/accessibility-agents` | Share it - it is a real open source contribution to an accessibility project |
| VS Code + Copilot setup | Your machine | The development environment is configured; use it on your next contribution |
| The GitHub skill set from Day 1 | Your knowledge | Navigate any repo, file any issue, open any PR - without an agent doing it for you |
| Accessibility Agents as a model | Your thinking | Know that any project can have agents in `.github/agents/` - and you know how to write, improve, and contribute them |

### Personalizing Accessibility Agents After the Workshop

Accessibility Agents is designed to be personalized. In `.github/agents/preferences.example.md`:
1. Copy it to `.github/agents/preferences.md`
2. Add your GitHub username and the repositories you care about most
3. Set your preferred output format
4. Commit it to your fork - now your agents know who you are and what you work on

This is your own instance. The agents respond to your preferences. Start with the example and make it yours.

### The Skills That Stay

The most important thing you take home is not a tool. It is the ability to look at any GitHub repository - any open source project in the world - and know:

- How to find a good first issue
- How to understand what the project needs
- How to make a contribution that will be welcomed
- How to receive feedback without losing confidence
- How to give feedback that helps rather than discourages

Those skills are yours. No one can take them. Every project you ever encounter is now within reach.


## Facilitator Notes - Day 2

### Pre-Day Setup
- Clone `accessibility-agents` to a demo machine where the facilitator is signed into a GitHub account
- Configure `preferences.md` with the facilitator's account and the demo repository
- Pre-create one issue in the demo repo with an intentional gap for the agentic workflow to triage
- Test all 5 agent commands the day before - especially `@daily-briefing` and `@pr-review`
- Enable the agentic workflow on the demo repo (GitHub Agentic Workflows technical preview)
- Have a backup: if the agentic workflow doesn't trigger in time, show the run from a pre-recorded session

### Pacing Adjustments
- If Block 1 runs long (VS Code setup issues): compress Block 2 to 45 minutes, prioritize getting one commit per participant
- If Block 3 runs short: extend with `@analytics` - team velocity, contribution patterns, what the agents say about the group's collective Day 1 work
- If Block 5 produces a wave of PRs before Jeff can review: use the time to have participants review each other's PRs instead

### The Emotional Arc
Day 2 has two peaks:
1. **The first agent command** (Block 3) - participants recognize the output because they know the source material
2. **The name in history** (Wrap-Up) - this should have a moment of silence and genuine acknowledgment

Do not rush the wrap-up. The moment of seeing your name in a public commit history is one of the most meaningful things a first-time open source contributor experiences.


*Previous: [Notifications ←](docs/10-notifications-and-day-1-close.md)*
*Next: [VS Code: Setup & Accessibility Basics](docs/11-vscode-interface.md)*
*Related: [Day 1 Agenda](DAY1_AGENDA.md) | [GitHub Actions & Workflows](docs/appendix-q-actions-workflows.md) | [Resources](docs/appendix-x-resources.md)*
