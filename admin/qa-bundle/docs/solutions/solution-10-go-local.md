# Solution Reference: Challenge 10 -- Go Local

This shows the local Git workflow from clone through push.

## Terminal/CLI approach

```bash
# Clone the repository
git clone https://github.com/<workshop-org>/learning-room-<your-username>.git
cd learning-room

# Create a branch
git checkout -b fix/local-edit

# Make an edit (any text editor works)
# For example, fix a typo or add content to docs/welcome.md

# Stage the change
git add docs/welcome.md

# Commit with a descriptive message
git commit -m "docs: fix typo in welcome page"

# Push the branch to GitHub
git push -u origin fix/local-edit
```

## VS Code approach

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Run "Git: Clone" and paste the repository URL
3. Open the cloned folder
4. Click the branch name in the bottom-left status bar, create a new branch
5. Edit a file
6. Open the Source Control sidebar (Ctrl+Shift+G)
7. Stage changes with the + icon, type a commit message, click the checkmark
8. Click "Publish Branch" or use the sync button

## GitHub Desktop approach

1. File, Clone Repository, paste the URL
2. Current Branch dropdown, New Branch
3. Open the file in your editor and make a change
4. Return to GitHub Desktop -- it shows the diff
5. Write a commit message at the bottom-left, click "Commit"
6. Click "Publish branch" to push

## Verifying success

After pushing, go to github.com and you should see:

- A banner saying "fix/local-edit had recent pushes" with a "Compare & pull request" button
- Your branch in the branch dropdown
- Your commit in the branch's commit history

## What matters

The learning objective is executing the full local workflow: clone, branch, edit, commit, push. The specific change you made does not matter. If your branch appeared on GitHub with your commit, you succeeded.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Terminal/CLI approach:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **VS Code approach:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **GitHub Desktop approach:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Verifying success:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
