<!-- Classroom Setup Metadata
Assignment title: You Can Build This
Template repository: Community-Access/learning-room-template
Visibility: Private (student repos are private)
Grant admin access: No
Deadline: [Set per cohort - one week after Day 2]
Group assignment: No (individual)
Enable feedback pull requests: Yes
Autograding: None to configure in the Classroom UI. Automated checks run as GitHub Actions workflows inside the template repo. See admin/classroom/autograding-setup.md.
Supported editor: VS Code (required for Day 2), GitHub Desktop, CLI
-->

# Assignment 2: You Can Build This

Welcome back -- or welcome for the first time! Day 2 moves from the browser to your local machine and introduces real-world development workflows.

## Joining Day 2 Without Day 1?

You do not need to have attended Day 1 to succeed today. If you already have GitHub fundamentals (navigating repos, filing issues, opening PRs, reviewing code), you have the same foundation as Day 1 participants.

Before starting the challenges below, verify your readiness with the [Day 2 Quick Start](https://github.com/Community-Access/git-going-with-github/blob/main/admin/DAY2_QUICK_START.md) guide. It takes about 30 minutes and confirms you have the accounts, tools, and skills needed.

## What You Will Do Today

During the live Day 2 core path, you will move from browser-based GitHub to local contribution work in VS Code. Some advanced challenges are intentionally available as stretch or async follow-up so participants and remote cohorts can continue at a sustainable pace.

- Clone a repository and work with Git locally
- Push a branch and open a PR from your local machine
- Review a classmate's code and give constructive feedback
- Use GitHub Copilot as a collaborative tool
- Create or review a custom issue template, if time allows
- Fork a real repository and prepare a cross-repo contribution path
- Explore accessibility agents and how they work
- Start your own capstone idea for Accessibility Agents, GLOW, or another repository, with a path to finish asynchronously

## Challenges

Complete these challenges in order. Each one builds on the previous. The live agenda prioritizes Challenges 10-13 and agent discovery; Challenges 14-16 can be completed during lab time or after the event.

| Challenge | What You Do | Chapter |
|---|---|---|
| 10. Go Local | Clone, branch, edit, commit, and push using local Git | [Chapter 14](https://github.com/Community-Access/git-going-with-github/blob/main/docs/14-git-in-practice.md) |
| 11. Open a Day 2 PR | Open a PR from your locally-pushed branch | [Chapter 15](https://github.com/Community-Access/git-going-with-github/blob/main/docs/15-code-review.md) |
| 12. Review Like a Pro | Review a classmate's PR with specific, constructive feedback | [Chapter 15](https://github.com/Community-Access/git-going-with-github/blob/main/docs/15-code-review.md) |
| 13. AI as Your Copilot | Use Copilot to improve documentation and evaluate its output | [Chapter 16](https://github.com/Community-Access/git-going-with-github/blob/main/docs/16-github-copilot.md) |
| 14. Template Remix | Create a custom YAML issue template | [Chapter 17](https://github.com/Community-Access/git-going-with-github/blob/main/docs/17-issue-templates.md) |
| 15. Meet the Agents | Explore and run agents from the accessibility-agents repo | [Chapter 19](https://github.com/Community-Access/git-going-with-github/blob/main/docs/19-accessibility-agents.md) |
| 16. Capstone Project | Prepare an impactful agentic contribution with responsibilities, guardrails, and review evidence | [Chapter 20](https://github.com/Community-Access/git-going-with-github/blob/main/docs/20-build-your-agent.md) |

## Automated Checks

Challenges 10, 14, and 16 have automated checks that run as GitHub Actions inside your repo:

- **Challenge 10:** Verifies at least one commit exists on a non-default branch
- **Challenge 14:** Verifies your YAML template has required `name` and `description` fields
- **Challenge 16:** Verifies an Accessibility Agents agent file when you use that path; facilitators review GLOW or other-project evidence using the same mission, responsibilities, and guardrails criteria

Each check posts a single comment on the relevant pull request and updates it whenever you push a new change. If a check fails, read the comment and push an update.

## Evidence

Each challenge has an issue template in the Learning Room. Open the matching issue, complete the challenge, and post your evidence as described in the issue. Challenges 10, 14, and 16 also have automated checks that post PR feedback when you push or open a pull request; use those bot comments as guidance, then keep your human evidence in the challenge issue.

## If You Get Stuck

Every chapter has an "If You Get Stuck" section with specific troubleshooting steps. Start there.

The [solutions directory](https://github.com/Community-Access/git-going-with-github/tree/main/docs/solutions) has reference solutions for every challenge. These show annotated examples of what a completed challenge looks like.

## Fork Workflow (Challenges 15-16)

For the capstone challenge, Accessibility Agents is the default repository, but GLOW or another meaningful project is also valid when your contribution would help that repository. For any fork-based path:

1. Fork the repository to your account
2. Clone your fork locally
3. Create a branch for your work
4. Open a PR from your fork back to the original

See [Chapter 18](https://github.com/Community-Access/git-going-with-github/blob/main/docs/18-fork-and-contribute.md) for the full fork workflow. If forking is new to you, [Chapter 6: Working with Pull Requests](https://github.com/Community-Access/git-going-with-github/blob/main/docs/06-working-with-pull-requests.md) covers the fundamentals.

## Bonus Challenges

If you finish early, check the [Challenges page](https://github.com/Community-Access/git-going-with-github/blob/main/docs/CHALLENGES.md) for bonus challenges.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Joining Day 2 Without Day 1?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What You Will Do Today:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Challenges:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Automated Checks:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Evidence:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **If You Get Stuck:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Fork Workflow (Challenges 15-16):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Bonus Challenges:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
