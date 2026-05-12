# Day 2 Quick Start - For Participants Joining on Day 2

> **If you attended Day 1**, you do not need this guide. Head straight to the [Day 2 Agenda](DAY2_AGENDA.md).
>
> **If you are joining the workshop on Day 2** -- whether you already know GitHub fundamentals or are picking up from a different learning path -- this guide will get you ready in 30 minutes.


## Self-Assessment: Are You Ready for Day 2?

Day 2 assumes you can do these five things on GitHub **right now, without help**. If any of them feel unfamiliar, read the linked chapter before the session starts.

| Skill | Can you do this? | If not, read this |
|---|---|---|
| Navigate a GitHub repository using your screen reader (find files, read commits, switch branches) | Yes / No | [Chapter 3: Navigating Repositories](../docs/03-navigating-repositories.md) |
| File an issue with a clear title, description, and labels | Yes / No | [Chapter 5: Working with Issues](../docs/05-working-with-issues.md) |
| Open a pull request that references an issue with `Closes #N` | Yes / No | [Chapter 6: Working with Pull Requests](../docs/06-working-with-pull-requests.md) |
| Review someone else's pull request and leave constructive feedback | Yes / No | [Chapter 6: Working with Pull Requests](../docs/06-working-with-pull-requests.md) |
| Understand what a merge conflict is and how to resolve one | Yes / No | [Chapter 7: Merge Conflicts](../docs/07-merge-conflicts.md) |

If you answered **Yes** to all five, you are ready. Proceed to the setup checklist below.

If you answered **No** to one or two, spend 15-20 minutes reading the linked chapters. They are self-contained and designed for screen reader users.

If you answered **No** to three or more, consider starting with the [Day 1 curriculum](DAY1_AGENDA.md) at your own pace before joining Day 2.


## Setup Checklist

Complete every item before Day 2 starts. If you attended Day 1, these are already done.

### Required Accounts and Tools

- [ ] **GitHub account** with a verified email address ([create one](https://github.com/signup) or verify yours at [github.com/settings/emails](https://github.com/settings/emails))
- [ ] **GitHub Accessibility Settings** configured: hovercards disabled, keyboard shortcuts enabled ([github.com/settings/accessibility](https://github.com/settings/accessibility))
- [ ] **Git** installed on your machine ([download](https://git-scm.com/downloads))
- [ ] **Visual Studio Code** installed ([download](https://code.visualstudio.com/))
- [ ] **GitHub Copilot** available in VS Code (Copilot Free has monthly limits, and organization policies can affect access)
- [ ] **Screen reader** running and tested with your browser

### Git Identity

If you have not used Git on this machine before, configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

### VS Code Extensions

Install these before the session:

- **GitHub Pull Requests and Issues** (required)
- **GitHub Copilot Chat** or current built-in Copilot entry points in VS Code (required for Copilot exercises; sign in and verify your account has access)

### Accept the Day 2 Classroom Assignment

Your facilitator will share the Day 2 assignment link. Click it to create your own private repository. The acceptance flow on Day 2 is identical to Day 1; if this is your first time accepting a GitHub Classroom assignment, follow the [Step-by-Step: Accept Your Classroom Assignment and Open Your Repo](../docs/04-the-learning-room.md#step-by-step-accept-your-classroom-assignment-and-open-your-repo) walkthrough in Chapter 4.

Once your Day 2 repo is created, clone it locally:

```bash
cd ~/Documents
git clone https://github.com/YOUR-ORG/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

Verify the files are present: `ls` should show `README.md`, `docs/`, and other project files.

### Full Setup Reference

For detailed instructions on any of the above steps, see [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md).


## What You Missed on Day 1 (and Do Not Need to Repeat)

Day 1 participants worked through Challenges 1-9 in their own Classroom repositories, covering repository navigation, issues, branching, commits, pull requests, merge conflicts, and open source culture. These activities taught the same skills listed in the self-assessment above.

You do not need to complete those modules or practice files. If you already have GitHub fundamentals, you have the same foundation.


## What Happens When You Arrive

Day 2 Block 0 (9:00-9:30 AM Pacific) includes time for Day-2-only participants to:

1. Introduce yourself to the group
2. Verify your setup with a facilitator
3. Get paired with a Day 1 veteran who can answer context questions during the session

After Block 0, everyone works on the same material regardless of which day they joined.


## Key Resources

| Resource | What it covers |
|---|---|
| [Day 2 Agenda](DAY2_AGENDA.md) | Full schedule and block-by-block instructions |
| [Pre-Workshop Setup](../docs/00-pre-workshop-setup.md) | Detailed setup instructions for all tools |
| [Screen Reader Cheat Sheet](../docs/appendix-b-screen-reader-cheatsheet.md) | NVDA, JAWS, and VoiceOver shortcuts for GitHub and VS Code |
| [VS Code Interface Guide](../docs/11-vscode-interface.md) | Screen reader mode, navigation, accessibility features |
| [Glossary](../docs/appendix-a-glossary.md) | Every term used in the workshop, explained |
    