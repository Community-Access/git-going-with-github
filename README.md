# GIT Going with GitHub

License: CC BY 4.0 | [Site](https://community-access.org/git-going-with-github/) | [Discussions](https://github.com/community-access/git-going-with-github/discussions)

## A Workshop by [Community Access](https://community-access.org)

> **Welcome.** This repository is your complete guide and companion for the two-day GIT Going with GitHub workshop. Every document here is written to be read with or without a screen reader. All steps are keyboard-accessible. You belong here.
>
> **About Community Access:** [Community Access](https://community-access.org) is a community of blind and low vision technology professionals. Visit [community-access.org](https://community-access.org) to learn more.

| Detail | Information |
|---|---|
| **Workshop site** | [community-access.org/git-going-with-github](https://community-access.org/git-going-with-github/) |
| **Registration** | [Student opt-in and waitlist workflow](https://community-access.org/git-going-with-github/REGISTER.html) |
| **Discussions** | [Join the conversation](https://github.com/community-access/git-going-with-github/discussions) |
| **Support** | [File an issue](https://github.com/community-access/git-going-with-github/issues) |
| **Dates** | May 21, 2026 & May 22, 2026 |
| **Facilitators** | Jeff Bishop and Michael Babcock |


> **The Central Project: Accessibility Agents**
>
> This workshop is built around a real, live open source project: **[Accessibility Agents](https://github.com/community-access/accessibility-agents)** - 55 AI agents across 3 teams and 5 platforms for accessible, agentic repository management. It was built by your facilitator Jeff Bishop and is MIT-licensed.
>
> You will fork it, understand it, contribute to it, and personalize it. The live workshop prepares you to make a real contribution, and the async continuation path gives you time to polish and submit it well.
>
> **Accessibility Agents does not replace what you learn on Day 1. It amplifies it.** The agents only make sense when you already understand the skills they automate. That is why Day 1 comes first - and why every guide in this repository shows you the manual path before it shows you the agent path.


## What Is This Event?

During this two-day workshop, you will learn how to confidently navigate and contribute to open source projects on GitHub using:

- A **screen reader** (NVDA on Windows, JAWS on Windows, or VoiceOver on macOS)
- **Keyboard-only navigation** - no mouse required
- **GitHub Copilot** (Day 2) - AI-assisted writing and coding in the browser and in VS Code

By the end of this event, you will have practiced **real contribution workflows** in a real repository. Some participants will ship during the live event; others will leave with a branch, a pull request path, and clear next steps to finish asynchronously.


## Who Is This For?

This event is designed for:

- People new to GitHub who use assistive technology
- Developers who use screen readers and want to contribute to open source
- Anyone who is curious about accessible development workflows
- Sighted participants are welcome - all content is keyboard-navigable for everyone

You do **not** need to know how to code to participate and contribute meaningfully. Documentation improvements, issue filing, accessibility bug reports, and code reviews are all valuable contributions.


## Two-Day Overview

| Day | Focus | What You Will Do |
|-----|-------|-----------------|
| **Day 1** | GitHub Foundations | Set up your environment, learn GitHub navigation with your screen reader, file your first issue, open your first pull request |
| **Day 2** | VS Code + Accessibility Agents | Bridge from the browser to **github.dev** (VS Code in your browser - no install needed), then step into **Visual Studio Code** on the desktop, learn VS Code basics, use GitHub Copilot, activate the Accessibility Agents ecosystem (55 agents, 3 teams, 5 platforms), see agentic workflows in the cloud, and prepare a real upstream contribution path |

### The Journey Arc

This is not a two-day course with two separate syllabi. It is one arc.

```
Day 1 - Learn the skill in the browser
  Navigate → Issue → Pull Request → Review → Merge

     ↓  (bridge: press . on any GitHub repo - VS Code opens right in your browser)

github.dev - VS Code on the web, no install needed
  Same keyboard shortcuts · Same screen reader mode · Edit files · Open PRs
  What it cannot do: no terminal, no Copilot agents, no local extensions

     ↓  (you've earned the desktop - now it makes sense)

Day 2 - Deepen with VS Code + Accessibility Agents
  Learn VS Code basics → Copilot inline → Copilot Chat
  @daily-briefing → @issue-tracker → @pr-review → @analytics → prepare upstream
```

Every skill you build on Day 1 maps directly to an Accessibility Agents command on Day 2. The agent is not a shortcut - it is a multiplier. You have to understand what it is doing to know when it is wrong.

**By the end of the Day 2 core path, you will have:**
- A fork of `accessibility-agents` with your personalized preferences
- A branch or pull request path for a real open source contribution
- Clear next steps to get your contribution reviewed and merged
- A working set of 55 AI agents across 3 teams that travel with your fork to any repository you apply them to


## How to Read These Docs

All documentation lives in the `docs/` folder. If you are new, start with [Get Going with GitHub](docs/get-going.md). It explains the GitHub Classroom assignment link, your private Learning Room repository, the first challenge issue, how evidence works, and how to choose the tool path that fits you.

Facilitators preparing a cohort should use the [Go-Live QA Guide](GO-LIVE-QA-GUIDE.md) as the release gate before sharing Classroom invite links.


## Your Challenges

**16 challenges guide you through the workshop, plus 5 bonus challenges for those who finish early.**

Open the **Issues** tab of the Learning Room repository and look for challenge issue templates matching each chapter. The [Challenge Hub](docs/CHALLENGES.md) has the full list with instructions, evidence requirements, and links.

**The workflow:**
1. Open the challenge issue template for the current chapter
2. Follow the instructions in the issue and the corresponding chapter
3. Complete the challenge and post your evidence
4. Open a PR that references your issue with `Closes #N`
5. The validation bot checks your work
6. When it passes, merge and move to the next challenge

Every chapter has an "If You Get Stuck" section. Every challenge has a [reference solution](docs/solutions/). You do not need to memorize anything.


> **HTML Version Available:** All markdown documentation is automatically converted to HTML format. After cloning the repository, you can browse the `html/` directory for web-formatted versions of every document. See [BUILD.md](BUILD.md) for details.

> **Audio Series Available:** Every chapter and appendix has a companion podcast episode - a conversational two-host overview perfect for previewing concepts or reducing screen reader fatigue. The refreshed catalog now covers 54 companion episodes, with Challenge Coach episodes planned as a separate teaching layer. [Browse the podcast episodes](admin/PODCASTS.md) or [subscribe via RSS](https://community-access.org/git-going-with-github/podcasts/feed.xml).

### Quick Navigation

> **Looking for a student-friendly table of contents?** See the [Course Guide](docs/course-guide.md) - a single page with day-by-day chapter tables, grouped appendices, all 24 exercises at a glance, and where to get help.

**Chapters**

| # | Document | What It Covers |
|---|----------|----------------|
| [Start](docs/get-going.md) | **Get Going with GitHub** | GitHub Classroom onboarding, Learning Room first steps, support, and tool choice |
| [00](docs/00-pre-workshop-setup.md) | **Pre-Workshop Setup** | Everything to install and configure before Day 1 |
| [01](docs/01-choose-your-tools.md) | **Choose Your Tools** | Screen reader options, tooling decisions, and workflow setup |
| [02](docs/02-understanding-github.md) | **Understanding GitHub** | How GitHub is organized, page types, landmark structure, and screen reader orientation |
| [03](docs/03-navigating-repositories.md) | **Navigating Repositories** | Step-by-step repository navigation with your screen reader |
| [04](docs/04-the-learning-room.md) | **The Learning Room** | Your private practice repository, branching, committing, and PR workflow |
| [05](docs/05-working-with-issues.md) | **Working with Issues** | Filing, managing, and participating in issues |
| [06](docs/06-working-with-pull-requests.md) | **Working with Pull Requests** | Creating, reviewing, and merging pull requests |
| [07](docs/07-merge-conflicts.md) | **Merge Conflicts** | Understanding, preventing, and resolving merge conflicts |
| [08](docs/08-open-source-culture.md) | **Open Source Culture** | Community norms, contributing, giving feedback |
| [09](docs/09-labels-milestones-projects.md) | **Labels, Milestones, and Projects** | Organizing and cross-referencing work |
| [10](docs/10-notifications-and-day-1-close.md) | **Notifications and Day 1 Close** | Managing your inbox, merging your work, Day 1 recap |
| [11](docs/11-vscode-interface.md) | **VS Code Interface** | VS Code accessibility, screen reader mode, keyboard navigation |
| [12](docs/12-vscode-accessibility.md) | **VS Code Accessibility** | Accessibility signals, Accessible View, Accessible Diff Viewer |
| [13](docs/13-how-git-works.md) | **How Git Works** | Commits, branches, merges, and the mental model |
| [14](docs/14-git-in-practice.md) | **Git in Practice** | Clone, branch, edit, commit, push using VS Code and terminal |
| [15](docs/15-code-review.md) | **Code Review** | PR extension, diffs, inline comments, review verdicts |
| [16](docs/16-github-copilot.md) | **GitHub Copilot** | Inline suggestions, Copilot Chat, prompting, Accessible View |
| [17](docs/17-issue-templates.md) | **Issue Templates** | Creating and using GitHub issue templates |
| [18](docs/18-fork-and-contribute.md) | **Fork and Contribute** | Fork workflow, upstream sync, cross-repo contributions |
| [19](docs/19-accessibility-agents.md) | **Accessibility Agents** | 55 agents across 3 teams, contributing to the ecosystem |
| [20](docs/20-build-your-agent.md) | **Build Your Own Agent** | Design an agent with responsibilities and guardrails (capstone) |
| [21](docs/21-next-steps.md) | **Next Steps** | Where to go after the workshop |

**Workshop Agendas** - For facilitators only (not part of learner sequence)

| Document | What It Covers |
|----------|----------------|
| [DAY1_AGENDA.md](admin/DAY1_AGENDA.md) | Full Day 1 schedule, objectives, and activities |
| [DAY2_AGENDA.md](admin/DAY2_AGENDA.md) | Full Day 2 schedule, objectives, and activities |

**Appendices** - Reference material; open any time during the workshop

| Appendix | Document | What It Covers |
|---|---|---|
| [A](docs/appendix-a-glossary.md) | **GitHub Concepts Glossary** | Every term, concept, and piece of jargon explained |
| [B](docs/appendix-b-screen-reader-cheatsheet.md) | **Screen Reader Cheat Sheet** | Complete NVDA, JAWS, and VoiceOver navigation commands - task-based and per-screen-reader - plus the full GitHub built-in keyboard shortcut system |
| [C](docs/appendix-m-accessibility-standards.md) | **Accessibility Standards Reference** | WCAG 2.2 success criteria, ARIA roles and patterns, and a quick-reference PR checklist |
| [D](docs/appendix-d-git-authentication.md) | **Git Authentication** | SSH keys, Personal Access Tokens, credential storage, and commit signing |
| [E](docs/appendix-c-markdown-reference.md) | **GitHub Flavored Markdown** | Alert blocks, collapsible sections, Mermaid diagrams, math, footnotes, heading anchors, and screen reader guidance |
| [F](docs/appendix-u-discussions-and-gists.md) | **GitHub Gists** | Code snippets, sharing, embedding, and cloning |
| [G](docs/appendix-u-discussions-and-gists.md) | **GitHub Discussions** | Forum-style conversations, Q&A, polls, and accessibility navigation for discussion threads |
| [H](docs/appendix-s-releases-tags-insights.md) | **Releases, Tags, and Repository Insights** | Versioned releases, semver, reading release notes, pulse, contributors, traffic, and Insights metrics |
| [I](docs/appendix-r-projects-deep-dive.md) | **GitHub Projects Deep Dive** | Boards, tables, roadmaps, custom fields, automations, iterations, cross-repo projects, and accessible navigation |
| [J](docs/appendix-n-advanced-search.md) | **GitHub Advanced Search** | Complete query language reference for searching issues, PRs, code, commits, and repositories |
| [K](docs/appendix-o-branch-protection.md) | **Branch Protection and Rulesets** | Required reviews, status checks, repository rulesets, and diagnosing why your PR cannot be merged |
| [L](docs/appendix-p-security-features.md) | **GitHub Security Features** | Dependabot alerts and updates, secret scanning, code scanning/CodeQL, private vulnerability reporting, and SBOM |
| [M](docs/appendix-g-vscode-reference.md) | **VS Code Accessibility Reference** | Complete technical reference for all accessibility settings, audio cues, diff viewer, screen reader configurations, keyboard shortcuts |
| [N](docs/appendix-j-cloud-editors.md) | **GitHub Codespaces** | Cloud development environments - setup, accessibility configuration, and screen reader usage |
| [O](docs/appendix-v-github-mobile.md) | **GitHub Mobile** | Accessibility guide for iOS and Android - VoiceOver, TalkBack, notifications, and PR reviews |
| [P](docs/appendix-w-github-pages.md) | **Publishing with GitHub Pages** | Deploy a static site from your repository - branch setup, custom domains, CI workflows, and accessibility checks |
| [Q](docs/appendix-q-actions-workflows.md) | **GitHub Actions and Workflows** | Deep-dive reference - automation, status checks, CI/CD workflows, and the path to agentic cloud |
| [R](docs/appendix-t-community-and-social.md) | **GitHub Profile, Sponsors, and Wikis** | Profile README, GitHub Sponsors, and GitHub Wikis |
| [S](docs/appendix-t-community-and-social.md) | **Organizations, Templates, and Repository Settings** | Organizations, repository templates, visibility, archiving, and contributor-relevant settings |
| [T](docs/08-open-source-culture.md) | **Contributing to Open Source** | A first-timer's guide: finding issues, scoping contributions, writing PRs, and building a contribution habit |
| [U](docs/appendix-x-resources.md) | **Resources** | Every link, tool, and reference from this event |
| [V](docs/appendix-l-agents-reference.md) | **Accessibility Agents Reference** | 55 agents, 3 teams, 5 platforms, slash commands, and workspace configuration |
| [W](docs/appendix-k-copilot-reference.md) | **GitHub Copilot Reference** | Copilot features, chat participants, slash commands, MCP servers, and agentic ecosystem |
| [X](docs/appendix-k-copilot-reference.md) | **GitHub Copilot AI Models** | Model comparison, strengths, plan availability, and selection guidance |
| [Y](docs/appendix-y-workshop-materials.md) | **Accessing and Downloading Workshop Materials** | GitHub Pages, GitHub.com, cloning, ZIP download, offline reading, folder guide |
| [Z](docs/appendix-z-github-skills.md) | **GitHub Skills - Complete Course Catalog** | All 36 GitHub Skills modules organized into six learning paths, with links, prerequisites, and integration guidance |
> **Each guide from Lesson 03 onward includes a "Day 2 Amplifier" callout** that shows how Accessibility Agents extends that skill across three scopes: your VS Code editor → your repository (travels with every fork) → the cloud (GitHub Agentic Workflows running without VS Code). **Learn the manual skill first (Chapter 14), then see how it's automated (Chapter 16).**


## This Repository's Structure

> **One repository, everything included.** Clone or fork this repo and you have the complete workshop - all curriculum guides, Accessibility Agents agents and slash commands, YAML issue forms, PR template, and a practice contribution target in `learning-room/`. GitHub Skills modules cannot be bundled here (each participant activates their own copy on their own account), but links are in `.github/ISSUE_TEMPLATE/config.yml`.

```
[repo root]/
├── README.md                            -- You are here
├── CONTRIBUTING.md                      -- How to contribute to this repo
├── CODE_OF_CONDUCT.md                   -- Community standards
├── admin/FACILITATOR_GUIDE.md           -- For workshop organizers only
├── admin/DAY1_AGENDA.md                 -- Day 1 workshop schedule
├── admin/DAY2_AGENDA.md                 -- Day 2 workshop schedule
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── config.yml                   -- Links to GitHub Skills; disables blank issues
│   │   ├── challenge-*.yml              -- 16 core challenge templates
│   │   ├── bonus-*.yml                  -- 5 bonus challenge templates
│   │   ├── accessibility-bug.yml        -- Structured accessibility bug form
│   │   └── feature-request.yml          -- Feature/improvement request form
│   ├── PULL_REQUEST_TEMPLATE.md         -- PR checklist with accessibility section
│   ├── workflows/                       -- CI/CD and autograding workflows
│   ├── agents/                          -- 55 Accessibility Agents for Copilot Chat
│   └── prompts/                         -- 54+ slash commands for Copilot Chat
├── classroom/                           -- GitHub Classroom setup artifacts
│   ├── README.md                        -- Workshop Deployment Guide (unified setup for new cohorts)
│   ├── assignment-day1-you-belong-here.md
│   ├── assignment-day2-you-can-build-this.md
│   ├── autograding-day1.json
│   ├── autograding-day2.json
│   ├── roster-template.csv
│   ├── grading-guide.md
│   └── teardown-checklist.md
├── learning-room/                       -- GitHub Classroom template copied into each student's private repo
│   ├── README.md
│   └── docs/
│       ├── welcome.md                   -- Has TODO sections for you to complete
│       ├── keyboard-shortcuts.md        -- Has intentional accessibility issues to fix
│       └── setup-guide.md              -- Has a broken link to find and fix
├── docs/                                -- Full workshop curriculum (22 chapters + appendices)
│   ├── course-guide.md                  -- Student landing page
│   ├── CHALLENGES.md                    -- Challenge Hub: all 21 challenges
│   ├── 00-pre-workshop-setup.md through 21-next-steps.md
│   ├── appendix-a-glossary.md through appendix-z-github-skills.md
│   └── solutions/                       -- Reference solutions for every challenge
├── podcasts/                            -- Audio companion episodes
└── PODCASTS.md                          -- Audio player page
```

> *Note: Appendices were renumbered during a February 2026 review. If you encounter external references to "Appendix D" or later letters, subtract one letter (e.g., the former Appendix D is now [Appendix C](docs/appendix-m-accessibility-standards.md)).*


## Quick Reference

These standalone documents provide additional guidance and resources:

| Document | Description |
|----------|-------------|
| [FAQ](admin/FAQ.md) | Frequently asked questions about the workshop |
| [Quick Reference](admin/QUICK_REFERENCE.md) | Condensed cheat sheet for common tasks |
| [Troubleshooting](admin/TROUBLESHOOTING.md) | Solutions for common setup and workflow issues |
| [Progress Tracker](admin/PROGRESS_TRACKER.md) | Track your learning progress through the workshop |
| [Accessibility Testing](ACCESSIBILITY_TESTING.md) | Accessibility testing procedures and standards |
| [Security](SECURITY.md) | Security policy and vulnerability reporting |
| [GitHub Proposal](GITHUB_PROPOSAL.md) | Original event proposal and curriculum overview (internal reference) |


## Screen Reader Users: Start Here

Before doing anything else, please read [**00 - Pre-Workshop Setup**](docs/00-pre-workshop-setup.md). It will walk you through:

- Configuring your screen reader for GitHub
- Verifying GitHub's modern interface is working (may already be active - instructions include how to check and enable if needed)
- Turning off settings that make screen reader navigation harder
- Verifying everything works before Day 1 begins


## The Goal of This Event

Open source software is built by people. Accessibility bugs in open source affect millions of people who use assistive technology every day. By learning to contribute - even something as small as filing a clear, detailed accessibility issue - you become part of fixing that. That matters.

**You don't have to write a single line of code to make open source more accessible.**

And by the end of Day 2, you will not just be a learner. You will be a product maker - someone who has shipped something real to a project that other people use.


## Questions Before the Event?

- **Discussion Forum:** [Join the conversation](https://github.com/community-access/git-going-with-github/discussions) - ask questions, connect with fellow participants, share ideas
- **File an issue** in this repository if something in these docs is unclear
- **Community:** [GitHub Accessibility Discussions](https://github.com/orgs/community/discussions/categories/accessibility)


## License

All workshop documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) - you are free to share and adapt with attribution.


*Last reviewed: May 2026*
*A [Community Access](https://community-access.org) initiative.*
