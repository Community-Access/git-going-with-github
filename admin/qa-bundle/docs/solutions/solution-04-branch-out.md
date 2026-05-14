# Solution Reference: Challenge 4 -- Branch Out

This shows how to create a branch from each tool. You only needed to use one.

## On github.com

1. Go to the repository's Code tab
2. Click the branch dropdown (it says "main")
3. Type a new branch name like `fix/welcome-todo`
4. Click "Create branch: fix/welcome-todo from main"

The branch now exists on GitHub. You can switch to it using the same dropdown.

## In VS Code (with Git)

```
git checkout -b fix/welcome-todo
```

Or use the Source Control sidebar: click the branch name in the bottom-left status bar, then select "Create new branch."

## In GitHub Desktop

1. Click the Current Branch dropdown
2. Click "New Branch"
3. Enter the name `fix/welcome-todo`
4. Confirm it is based on `main`

## With GitHub CLI

```
gh repo clone <workshop-org>/learning-room-<your-username>
cd learning-room
git checkout -b fix/welcome-todo
```

## Branch naming

Good branch names are short and descriptive:

- `fix/welcome-todo` -- fixing a TODO in welcome.md
- `feature/add-schedule-link` -- adding a new link
- `docs/update-readme` -- documentation change

All of these are valid. The convention `type/description` is common but not required.

## What matters

The learning objective is understanding that branches let you work in isolation without affecting main. If you created any branch with any name, you completed this challenge.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **On github.com:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **In VS Code (with Git):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **In GitHub Desktop:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **With GitHub CLI:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Branch naming:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
