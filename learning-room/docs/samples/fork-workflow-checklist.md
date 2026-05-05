# Fork Workflow Checklist

Use this checklist to complete the fork-clone-branch-push-PR workflow for Challenge 16 (Capstone). Check off each step as you complete it.

## Phase 1: Fork the repository

- [ ] Go to the original repository on GitHub.com
- [ ] Select the **Fork** button (top-right of the page)
- [ ] Confirm the fork is created under your account (the URL should show `github.com/YOUR-USERNAME/repository-name`)

## Phase 2: Clone your fork

Choose your tool:

### VS Code

- [ ] Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
- [ ] Type "Git: Clone" and paste your fork's URL
- [ ] Select a local folder when prompted
- [ ] Open the cloned repository when VS Code offers

### GitHub Desktop

- [ ] File > Clone Repository
- [ ] Paste your fork's URL or find it in the list
- [ ] Select a local path and clone

### CLI

- [ ] Run: `git clone https://github.com/YOUR-USERNAME/repository-name.git`
- [ ] Run: `cd repository-name`

## Phase 3: Create a branch

- [ ] Create a branch named `agent/YOUR-USERNAME`
- [ ] VS Code: Command Palette > "Git: Create Branch"
- [ ] GitHub Desktop: Branch > New Branch
- [ ] CLI: `git checkout -b agent/YOUR-USERNAME`

## Phase 4: Make your changes

- [ ] Create your agent file in the correct location
- [ ] Verify the YAML frontmatter is valid (check for `---` delimiters)
- [ ] Verify you have both Responsibilities and Guardrails sections

## Phase 5: Commit and push

- [ ] Stage your changes
- [ ] Write a meaningful commit message
- [ ] Commit
- [ ] Push to your fork
- [ ] VS Code: Command Palette > "Git: Push"
- [ ] GitHub Desktop: "Publish branch" or "Push origin"
- [ ] CLI: `git push -u origin agent/YOUR-USERNAME`

## Phase 6: Open a cross-fork pull request

- [ ] Go to the **original** repository on GitHub.com (not your fork)
- [ ] You should see a banner offering to create a PR from your recently pushed branch
- [ ] If no banner: Pull requests > New pull request > "compare across forks"
- [ ] Set base repository to the original, base branch to `main`
- [ ] Set head repository to your fork, compare branch to `agent/YOUR-USERNAME`
- [ ] Write a clear PR title and description
- [ ] Submit the pull request

## Phase 7: Peer review

- [ ] Find a classmate's capstone PR
- [ ] Review their agent file
- [ ] Leave at least one constructive comment
- [ ] Submit your review

## Verification

After completing all phases, verify:

- [ ] Your fork exists at `github.com/YOUR-USERNAME/repository-name`
- [ ] Your PR appears in the original repository's Pull requests tab
- [ ] The autograder has run on your PR (look for status checks)
