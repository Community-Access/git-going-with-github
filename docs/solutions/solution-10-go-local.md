# Solution Reference: Challenge 10 -- Go Local

This shows the local Git workflow from clone through push.

## Terminal/CLI approach

```bash
# Clone the repository
git clone https://github.com/Community-Access/learning-room.git
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
