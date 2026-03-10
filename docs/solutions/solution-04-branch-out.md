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
gh repo clone Community-Access/learning-room
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
