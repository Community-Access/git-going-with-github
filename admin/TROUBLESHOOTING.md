# Troubleshooting Guide
## Common Issues and Solutions

> **How to use this guide:** Find your problem in the Table of Contents, or use `Ctrl+F` (browser) to search by keyword or error message. Every problem follows the same format: **Symptoms** → **Cause** → **Solution** → **Prevention** (where applicable).

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Git Configuration and Operations](#git-configuration-and-operations)
- [GitHub Authentication](#github-authentication)
- [GitHub Web Interface](#github-web-interface)
- [Repository Navigation and Cloning](#repository-navigation-and-cloning)
- [Branches, Merging, and Conflicts](#branches-merging-and-conflicts)
- [Issues and Pull Requests](#issues-and-pull-requests)
- [Templates and YAML](#templates-and-yaml)
- [VS Code Setup and Configuration](#vs-code-setup-and-configuration)
- [VS Code Extensions](#vs-code-extensions)
- [VS Code Source Control](#vs-code-source-control)
- [Screen Readers - General](#screen-readers--general)
- [NVDA-Specific Issues](#nvda-specific-issues)
- [JAWS-Specific Issues](#jaws-specific-issues)
- [VoiceOver-Specific Issues](#voiceover-specific-issues)
- [GitHub Copilot](#github-copilot)
- [Copilot Chat](#copilot-chat)
- [Accessibility Agents](#accessibility-agents)
- [Exercises and the Learning Room](#exercises-and-the-learning-room)
- [HTML Build System](#html-build-system)
- [GitHub Pages and Online Access](#github-pages-and-online-access)
- [Performance and Network](#performance-and-network)
- [Getting More Help](#getting-more-help)

## Setup and Installation

### Problem: Git is not installed
**Symptoms:** Terminal shows `git: command not found`, `'git' is not recognized`, or similar error.

**Solution:**
1. **Windows:** Download and install Git for Windows from the [Git for Windows download page](https://git-scm.com/download/win). During installation, accept the defaults. Restart your terminal after installation.
2. **macOS:** Run `xcode-select --install` (installs Git as part of Command Line Tools), or download from the [Git for macOS download page](https://git-scm.com/download/mac), or run `brew install git` if Homebrew is installed.
3. **Linux (Debian/Ubuntu):** `sudo apt update && sudo apt install git`
4. **Linux (Fedora):** `sudo dnf install git`
5. Verify: Close and reopen your terminal, then type `git --version`

**If it still does not work after installation:**
- **Windows:** Git may not be in your PATH. Search for "Git Bash" in the Start menu and use that terminal instead. Or add Git to PATH: Settings → System → Advanced → Environment Variables → edit PATH → add `C:\Program Files\Git\cmd`
- **macOS:** If `xcode-select` hangs, try `sudo xcode-select --reset` first

**Prevention:** Complete [Pre-Workshop Setup](docs/00-pre-workshop-setup.md) before starting.

### Problem: Node.js or npm is not installed
**Symptoms:** `npm: command not found` or `node: command not found` when trying to build HTML files.

**Solution:**
1. Download Node.js LTS from the [Node.js download page](https://nodejs.org/)
2. Install with default settings
3. Close and reopen your terminal
4. Verify: `node --version` and `npm --version`

**Note:** Node.js is only needed if you want to build the HTML versions of the workshop documents. It is not required for the workshop itself.

### Problem: GitHub CLI (`gh` command) not found
**Symptoms:** `gh issue list` or other `gh` commands show "command not found."

**Solution:**
1. Install GitHub CLI from https://cli.github.com/
2. **Windows:** Download the `.msi` installer or use `winget install --id GitHub.cli`
3. **macOS:** `brew install gh`
4. **Linux:** See the [GitHub CLI Linux installation guide](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
5. Authenticate: `gh auth login` → follow prompts → choose HTTPS or SSH → authenticate via browser
6. Verify: `gh --version`

**Note:** GitHub CLI is optional but helpful for faster issue and PR workflows from the terminal.

### Problem: No GitHub account
**Symptoms:** Cannot clone, push, fork, or make pull requests.

**Solution:**
1. Create a free account at https://github.com/signup
2. Verify your email address (check inbox for confirmation)
3. Optionally enable two-factor authentication (recommended): https://github.com/settings/security

Security: We strongly recommend enabling Two-Factor Authentication (2FA) on your GitHub account. If you cannot enable 2FA, add an SSH key or create a Personal Access Token (PAT) with `repo` scope before contributing. If you need help, contact the workshop organizers.

### Problem: Cannot fork the repository
**Symptoms:** Click "Fork" but nothing happens, or you see an error message.

**Solution:**
1. Verify you are signed in to GitHub
2. Check if you already have a fork: Go to your profile → Repositories → search for the repo name
3. If you already forked it, navigate to your existing fork instead
4. If the Fork button is not visible, the repository may be restricted - contact the facilitator

### Problem: VS Code cannot be installed
**Symptoms:** Installation fails, or you are on a restricted device.

**Solution:**
- **Corporate/restricted device:** Ask your IT department to allow VS Code, or use the portable ZIP version: https://code.visualstudio.com/docs/editor/portable
- **Chromebook:** Use github.dev (press `.` on any repo) for Day 1. For Day 2, consider GitHub Codespaces: see [Appendix N](docs/appendix-j-cloud-editors.md)
- **Older OS:** VS Code requires Windows 10+, macOS 10.15+, or a modern Linux distribution

## Git Configuration and Operations

### Problem: Git asks for your name and email before committing
**Symptoms:** `Please tell me who you are` error when running `git commit`.

**Solution:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```
Use the same email address as your GitHub account so commits are attributed to your profile.

### Problem: "Fatal: not a git repository"
**Symptoms:** Any git command returns `fatal: not a git repository (or any of the parent directories): .git`

**Solution:**
1. You are not inside a Git repository. Check your current folder:
   - **Windows PowerShell:** `Get-Location`
   - **macOS/Linux:** `pwd`
2. Navigate to your cloned repository: `cd path/to/your-repo`
3. Verify it is a Git repo: `git status`
4. If the folder does not contain a `.git` directory, you need to clone the repository again:
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
   cd REPO-NAME
   ```

### Problem: `git pull` says "Already up to date" but files seem outdated
**Symptoms:** You know changes were made upstream, but `git pull` reports no changes.

**Solution:**
1. Check which remote you are pulling from: `git remote -v`
2. If you forked the repo, you need to pull from upstream, not your fork:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/REPO.git
   git fetch upstream
   git merge upstream/main
   ```
3. Verify you are on the correct branch: `git branch` (the current branch has a `*`)

### Problem: "Detached HEAD" message
**Symptoms:** Git says `You are in 'detached HEAD' state` and your commits may be lost.

**Solution:**
1. This means you are not on a branch. Create one to save your work:
   ```bash
   git checkout -b my-new-branch
   ```
2. If you want to return to main: `git checkout main`
3. If you already made commits in detached HEAD, create a branch first (step 1), then those commits are safe.

### Problem: Accidentally committed to the wrong branch
**Symptoms:** Your changes are on `main` instead of a feature branch.

**Solution (if you have not pushed yet):**
1. Create a new branch from your current position: `git branch my-feature`
2. Reset main back: `git reset --hard HEAD~1` (undoes the last commit on main)
3. Switch to your feature branch: `git checkout my-feature`
4. Your commit is now on `my-feature` and `main` is clean

**If you already pushed:** Do not force-push. Instead, create a new branch from main, cherry-pick your commit, and open a PR from that branch.

### Problem: "Permission denied" running git commands
**Symptoms:** `error: insufficient permission` or `Permission denied` on local git operations.

**Solution:**
- **Windows:** Run your terminal as Administrator, or check that the repository folder is not read-only (right-click folder → Properties → uncheck Read-only)
- **macOS/Linux:** Check folder ownership: `ls -la .git/`. If owned by root, fix with: `sudo chown -R $(whoami) .`
- **Antivirus:** Some antivirus software blocks Git operations on `.git` directories. Add your repository folder to the antivirus exclusion list.

### Problem: Line ending warnings ("LF will be replaced by CRLF")
**Symptoms:** Git shows warnings about line endings when staging files.

**Solution:**
1. This is informational, not an error. Git is converting line endings for your platform.
2. To suppress the warning: `git config --global core.autocrlf true` (Windows) or `git config --global core.autocrlf input` (macOS/Linux)
3. In VS Code, the bottom-right shows "LF" or "CRLF" - click to change per file if needed

## GitHub Authentication

### Problem: Authentication fails when pushing
**Symptoms:** "Permission denied," "Authentication failed," or "Could not read from remote repository" when running `git push`.

**Cause A: No SSH key set up (if using SSH URLs)**
1. Generate key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Press Enter three times to accept defaults
3. Copy your public key:
   - **Windows:** `type %USERPROFILE%\.ssh\id_ed25519.pub` (then select and copy)
   - **macOS:** `cat ~/.ssh/id_ed25519.pub | pbcopy`
   - **Linux:** `cat ~/.ssh/id_ed25519.pub` (then copy the output)
4. Add to GitHub: https://github.com/settings/ssh/new → paste key
5. Test: `ssh -T git@github.com` → should say "Hi [USERNAME]!"

**Cause B: Using HTTPS with a password instead of a token**
1. GitHub no longer accepts account passwords for HTTPS Git operations
2. Generate a Personal Access Token: https://github.com/settings/tokens → "Generate new token (classic)" → select `repo` scope → generate
3. Use the token as your password when Git prompts
4. Store credentials securely:
   - **Windows:** `git config --global credential.helper manager`
   - **macOS:** `git config --global credential.helper osxkeychain`
   - **Linux:** `git config --global credential.helper cache` (temporary) or use a keyring helper

**Cause C: Wrong remote URL**
1. Check: `git remote -v`
2. If URLs point to the wrong repository, fix: `git remote set-url origin YOUR-CORRECT-URL`

**Cause D: Expired token or revoked SSH key**
1. Check SSH keys: https://github.com/settings/keys - is your key listed and not expired?
2. Check tokens: https://github.com/settings/tokens - is your token still active?
3. Regenerate if expired

See [Appendix D (Git Authentication)](docs/appendix-d-git-authentication.md) for complete setup instructions.

### Problem: SSH key passphrase prompts every time
**Symptoms:** Git asks for your SSH passphrase on every push/pull operation.

**Solution:** Add your key to the SSH agent so it is remembered:
- **Windows (Git Bash):**
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```
- **macOS:**
  ```bash
  ssh-add --apple-use-keychain ~/.ssh/id_ed25519
  ```
  Then add to `~/.ssh/config`:
  ```
  Host github.com
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
  ```
- **Linux:**
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```

### Problem: "Support for password authentication was removed"
**Symptoms:** Git prompts for a password and rejects it with a message about deprecation.

**Solution:** You need a Personal Access Token instead of your password. See "Authentication fails when pushing" → Cause B above.

## GitHub Web Interface

### Problem: GitHub page layout looks different from the guide
**Symptoms:** Buttons, menus, or sections are in different positions than described.

**Solution:** GitHub updates its interface regularly. The core structure (tabs, headings, landmarks) remains consistent. Navigate by role instead of position:
- Use `B` for buttons, `H` for headings, `D` for landmarks
- Use `?` on any GitHub page to see current keyboard shortcuts
- Use the Elements List (`NVDA+F7` / `Insert+F3` / `VO+U`) to find specific elements

### Problem: Hovercards interfere with screen reader navigation
**Symptoms:** When arrowing through links, a popup overlay appears and disrupts reading flow.

**Solution:**
1. Go to https://github.com/settings/accessibility
2. Uncheck "Hovercards" (or the equivalent setting for reducing motion/overlays)
3. Save changes
4. This is covered in [Pre-Workshop Setup](docs/00-pre-workshop-setup.md), Step 4

### Problem: GitHub shows "Loading..." or blank content
**Symptoms:** Parts of a GitHub page do not render, or show a loading spinner indefinitely.

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache: `Ctrl+Shift+Delete` → clear cached files
3. Try a different browser (Chrome, Firefox, Edge, Safari)
4. Check https://www.githubstatus.com/ for outages
5. Disable browser extensions that might interfere (ad blockers, privacy extensions)

### Problem: "File finder" or "Go to file" does not work
**Symptoms:** Pressing `T` on a repository page does not open the file search.

**Solution:**
1. Make sure you are in Browse Mode (screen reader), not Focus Mode
2. Click somewhere on the page first to ensure GitHub has keyboard focus
3. Try `Shift+T` if `T` alone does not trigger it
4. As an alternative, use the search bar (`/`) and type `filename:` followed by the name

### Problem: Cannot find the "Fork" button
**Symptoms:** You are on a repository page but cannot locate the Fork button.

**Solution:**
1. The Fork button is near the top of the repository page, after the Star and Watch buttons
2. Screen reader: Press `B` repeatedly to find buttons - look for "Fork"
3. If the button says "Forked from..." instead, you already have a fork. Navigate to your fork at `github.com/YOUR-USERNAME/REPO-NAME`

## Repository Navigation and Cloning

### Problem: Clone fails with "Repository not found"
**Symptoms:** `git clone` returns `ERROR: Repository not found` or `fatal: remote error: Repository not found`.

**Solution:**
1. **Check the URL:** Copy it directly from the GitHub page (Code button → HTTPS or SSH tab)
2. **Private repository:** You need read access. Ask the owner to add you as a collaborator.
3. **Typo in username or repo name:** URLs are case-sensitive for SSH
4. **Authentication:** If using HTTPS, verify your credentials are correct (see GitHub Authentication section)

### Problem: Clone is extremely slow
**Symptoms:** `git clone` starts but takes a very long time or hangs.

**Solution:**
1. The repository may be very large. Try a shallow clone: `git clone --depth 1 URL`
2. Check your internet connection - try cloning a small test repo first
3. If behind a corporate proxy, configure Git: `git config --global http.proxy http://proxy-address:port`
4. Try switching between HTTPS and SSH - one may be faster on your network

### Problem: Cannot find a file that the chapter references
**Symptoms:** A chapter says "open file X" but the file does not exist in the repository.

**Solution:**
1. Verify you are on the correct branch: `git branch` → `git checkout main`
2. Pull the latest changes: `git pull origin main`
3. Check spelling and case - filenames are case-sensitive on macOS and Linux
4. The file may be in a subfolder - use `git ls-files | grep -i filename` to search
5. In VS Code, use `Ctrl+P` and type part of the filename

## Branches, Merging, and Conflicts

### Problem: Large merge conflict - do not know how to resolve
**Symptoms:** File shows `<<<<<<< HEAD ... ======= ... >>>>>>> branch-name` markers. Multiple files may be affected.

**Solution - Quick approach (choose one version):**
- Keep YOUR changes: `git checkout --ours [filename]` → `git add [filename]`
- Keep THEIR changes: `git checkout --theirs [filename]` → `git add [filename]`
- Abort the merge entirely: `git merge --abort` (returns to pre-merge state, nothing lost)

**Solution - Manual merge (combine both):**
1. Open the file in VS Code
2. Screen reader users: search for `<<<<<<<` to find each conflict
3. Each conflict has three parts:
   - Between `<<<<<<<` and `=======` → your changes
   - Between `=======` and `>>>>>>>` → their changes
4. Edit the file to keep what you want
5. Delete all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
6. Save, then: `git add [filename]` → `git commit -m "Resolved merge conflict"`

**In VS Code:** VS Code detects conflicts and shows "Accept Current Change," "Accept Incoming Change," and "Accept Both Changes" buttons above each conflict. Screen reader users: these are announced as CodeLens actions above the conflict markers.

**Prevention:**
- Pull from upstream regularly: `git pull upstream main`
- Keep PRs small and focused
- Communicate with teammates about which files you are editing

### Problem: "Your branch is behind" or "Cannot fast-forward"
**Symptoms:** `git push` is rejected because your branch is behind the remote.

**Solution:**
1. Pull first: `git pull origin your-branch`
2. Resolve any conflicts if prompted
3. Then push: `git push origin your-branch`

**Do not force-push** (`git push --force`) unless you understand the consequences - it overwrites the remote branch and can destroy other people's work.

### Problem: Accidentally deleted a branch with unmerged work
**Symptoms:** You ran `git branch -D branch-name` and lost commits.

**Solution:** Git keeps deleted branch commits for ~30 days. Recover with:
```bash
git reflog                    # Find the commit hash of your work
git checkout -b recovered-branch COMMIT-HASH
```

### Problem: Cannot switch branches - "Please commit or stash your changes"
**Symptoms:** `git checkout other-branch` fails because you have uncommitted changes.

**Solution (choose one):**
1. **Commit your work:** `git add .` → `git commit -m "WIP: saving progress"`
2. **Stash your work:** `git stash` → switch branches → `git stash pop` when you return
3. **Discard changes (irreversible):** `git checkout -- .` (discards all uncommitted changes)

## Issues and Pull Requests

### Problem: Cannot create an issue - "Issues are disabled"
**Symptoms:** The Issues tab is missing or says issues are disabled.

**Solution:** The repository owner has disabled issues. You can:
1. Check if the project uses Discussions instead (look for a Discussions tab)
2. Open an issue on the parent repository (if this is a fork)
3. Contact the maintainer through other channels listed in the repository's README

### Problem: PR says "Unable to merge" or "Merge blocked"
**Symptoms:** The merge button is grayed out or shows a warning.

**Cause A: Merge conflicts**
- Resolve conflicts first (see "Branches, Merging, and Conflicts" section)

**Cause B: Required status checks failing**
- Scroll to the "Checks" section of the PR
- Click the failing check to see the error
- Fix the issue and push a new commit

**Cause C: Required reviews**
- The repository requires one or more approving reviews before merging
- Request a review from a teammate or the maintainer

**Cause D: Branch protection rules**
- The main branch may have protection rules. See [Appendix K (Branch Protection)](docs/appendix-o-branch-protection.md)

### Problem: PR shows wrong base branch
**Symptoms:** Your PR targets the wrong branch (e.g., targeting your fork's main instead of the upstream main).

**Solution:**
1. On the PR page, click "Edit" next to the base branch
2. Change the base repository and branch to the correct target
3. If you cannot edit it, close the PR and create a new one with the correct base

### Problem: PR "Files Changed" tab shows too many changes
**Symptoms:** Your PR shows changes you did not make - dozens or hundreds of files.

**Solution:**
1. Your branch likely diverged from main. Update it:
   ```bash
   git checkout your-branch
   git fetch upstream
   git rebase upstream/main
   git push --force-with-lease origin your-branch
   ```
2. The PR should now show only your changes
3. If you are unsure, close the PR, create a fresh branch from main, re-apply your changes, and open a new PR

## Templates and YAML

### Problem: Template not showing in GitHub issue creation
**Symptoms:** Click "New Issue" but your custom template does not appear - only "Blank" shows.

**Cause A: File in wrong location**
- Must be: `.github/ISSUE_TEMPLATE/your-template.yml`
- Not: `.github/ISSUE_TEMPLATE/your-template.md` (wrong extension for form templates)
- Not: `.github/your-template.yml` (wrong folder)
- Not: `.github/issue_template/` (case-sensitive on some systems)

**Cause B: YAML syntax errors**
- Check for:
  - Missing colons: `name:` not `name`
  - Tabs instead of spaces (YAML requires spaces)
  - Mismatched or unclosed quotes
  - Wrong indentation level
- Validate at: https://www.yamllint.com/

**Cause C: Not on the default branch**
- Templates must be on the `main` (or `master`) branch
- Verify: `git branch` → push to main: `git push origin main`
- Check on GitHub.com: browse to `.github/ISSUE_TEMPLATE/` folder

**Cause D: Browser cache**
- Hard refresh: `Ctrl+Shift+R`
- Or try incognito/private browsing mode

**Cause E: `config.yml` blocks blank issues but no templates exist**
- Check `.github/ISSUE_TEMPLATE/config.yml` - if `blank_issues_enabled: false` and no valid templates exist, the "New Issue" page will be empty

### Problem: "Required field" validation not working in template
**Symptoms:** A field marked `required: true` allows submission without being filled.

**Solution:** The `validations` key must be at the same level as `attributes`, not inside it:

**Correct:**
```yaml
- type: input
  id: version
  attributes:
    label: Version
  validations:
    required: true
```

**Wrong (too nested):**
```yaml
- type: input
  attributes:
    label: Version
    validations:          # Wrong: inside attributes
      required: true
```

After fixing, commit and push to main, then hard-refresh the browser.

### Problem: Markdown inside template not rendering
**Symptoms:** Raw `*asterisks*` and `#hashes` appear instead of formatted text.

**Solution:**
1. Use `type: markdown` for instructional text (not `type: input` or `type: textarea`)
2. Use the pipe `|` for multi-line content:
   ```yaml
   - type: markdown
     attributes:
       value: |
         ## Instructions
         **Bold text** and *italic text*
   ```
3. The `|` after `value:` tells YAML the content is multi-line and should preserve formatting

### Problem: YAML indentation error
**Symptoms:** Template fails to load or GitHub shows a YAML parse error.

**Solution:**
1. YAML uses spaces only - never tabs. Configure your editor to insert spaces for tabs.
2. In VS Code: look at the bottom-right status bar - click "Spaces: 2" or "Tab Size" to set to spaces
3. Each nesting level should be 2 spaces
4. Validate your YAML at https://www.yamllint.com/ before committing

## VS Code Setup and Configuration

### Problem: VS Code does not detect screen reader
**Symptoms:** VS Code opens but screen reader mode is not active - announcements are minimal or missing.

**Solution:**
1. Press `Shift+Alt+F1` to manually enable screen reader mode
2. Verify: `Ctrl+Shift+P` → type "accessibility" → "Toggle Screen Reader Accessibility Mode" should have a checkmark
3. Check setting: `Ctrl+,` → search `editor.accessibilitySupport` → set to `on`
4. If NVDA or JAWS was started after VS Code, restart VS Code

### Problem: VS Code is too verbose or too quiet with screen reader
**Symptoms:** Too many announcements, or important things are not announced.

**Solution:**
- **Too verbose:** Open Settings (`Ctrl+,`) → search `accessibility.verbosity` → reduce verbosity for specific features
- **Too quiet:** Check that `editor.accessibilitySupport` is set to `on` (not `auto` or `off`)
- **Audio signals:** Search `accessibility.signals` in Settings → enable or disable specific sounds (error, warning, breakpoint, diff changes, etc.)

See [Appendix M (VS Code Accessibility Reference)](docs/appendix-g-vscode-reference.md) for all settings.

### Problem: Cannot find a VS Code command
**Symptoms:** You know a command exists but cannot find it.

**Solution:**
1. Open Command Palette: `Ctrl+Shift+P`
2. Start typing any part of the command name
3. Arrow through results - your screen reader announces each one
4. Press Enter to execute
5. If still not found, the command may require an extension to be installed

### Problem: VS Code terminal does not open
**Symptoms:** `` Ctrl+` `` (backtick) does not open the terminal, or the terminal panel is not accessible.

**Solution:**
1. Try the command palette: `Ctrl+Shift+P` → "Terminal: Create New Terminal"
2. If the terminal opens but screen reader does not read it: the terminal uses a specialized accessibility mode. Press `Alt+F2` to open the Accessible View of the terminal output.
3. Check that your default shell is configured: `Ctrl+,` → search "terminal.integrated.defaultProfile"

### Problem: VS Code settings changed unexpectedly
**Symptoms:** Colors, font size, or behavior changed without you doing anything.

**Solution:**
1. A workspace settings file (`.vscode/settings.json`) may have been loaded when you opened the repository
2. Check: `Ctrl+Shift+P` → "Preferences: Open Workspace Settings"
3. Workspace settings override user settings. Remove entries you do not want.
4. To open your user settings instead: `Ctrl+Shift+P` → "Preferences: Open User Settings"

## VS Code Extensions

### Problem: VS Code extensions not loading
**Symptoms:** Copilot or other extensions crash, do not appear, or show errors.

**Solution:**
1. Reload the window: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Check extension status: `Ctrl+Shift+X` → search for the extension → verify it shows as installed and enabled
3. Check for errors: View → Output → select the extension name from the dropdown
4. If an extension keeps crashing:
   - Disable it: `Ctrl+Shift+X` → find extension → click Disable
   - Re-enable it and reload
   - If still broken, uninstall and reinstall the extension
5. Check VS Code version: `Ctrl+Shift+P` → "About" - some extensions require recent VS Code versions

### Problem: GitHub Pull Requests extension not showing PRs
**Symptoms:** The extension is installed but no PRs appear in the sidebar.

**Solution:**
1. Verify you are signed in: Click the GitHub icon in the lower-left → sign in if prompted
2. Make sure you opened a Git repository (not just a folder): `Ctrl+Shift+G` should show Source Control
3. Check that the repository has open PRs on GitHub
4. Reload: `Ctrl+Shift+P` → "Developer: Reload Window"

### Problem: Extension conflicts
**Symptoms:** Two extensions interfere with each other - duplicate features, broken shortcuts, or errors.

**Solution:**
1. Open Extensions: `Ctrl+Shift+X`
2. Disable extensions one at a time to identify the conflict
3. Check the extension's marketplace page for known conflicts
4. If two extensions bind the same shortcut: `Ctrl+Shift+P` → "Preferences: Open Keyboard Shortcuts" → search for the shortcut → reassign one

## VS Code Source Control

### Problem: Source Control panel is empty
**Symptoms:** `Ctrl+Shift+G` opens Source Control but no files or changes appear.

**Solution:**
1. Verify you opened a Git repository: is there a `.git` folder in the root?
2. Make sure you made changes: edit a file, save it, then check Source Control again
3. If VS Code says "No source control providers registered": install the Git extension (usually built-in) or reload the window

### Problem: File saved but git status still shows as modified
**Symptoms:** You saved your work but `git status` says the file is changed.

**Solution:**
1. Check for unsaved files: Look for a white dot on the editor tab (indicates unsaved)
2. Check line endings: The bottom-right of VS Code shows "LF" or "CRLF." If you changed the line ending, Git sees it as a modification.
3. Check for invisible whitespace changes: Open the diff in Source Control to see exactly what changed
4. If the diff shows no visible changes, it is likely a line ending or trailing whitespace issue

### Problem: Cannot stage or commit - "No changes to commit"
**Symptoms:** You made changes but Git does not see them.

**Solution:**
1. Verify the file was saved: `Ctrl+S`
2. Check you are in the correct repository folder
3. Check if the file is in `.gitignore`: `git status --ignored`
4. If the file is new, it needs to be staged with `git add [filename]` before it appears

## Screen Readers - General

### Problem: Screen reader does not read GitHub page content
**Symptoms:** Screen reader launches but GitHub content is silent or skips sections.

**Solution:**
1. Verify you are in Browse Mode (document/virtual mode), not Focus Mode
2. Wait for the page to fully load - GitHub uses JavaScript rendering that may take a few seconds
3. Try refreshing: `Ctrl+R` or `F5`
4. Use heading navigation (`H`) to find the main content - skip past the navigation menus
5. Use landmark navigation (`D`) to jump to the `main` landmark
6. If a specific section is empty, it may be in a dynamically loaded area - press `Tab` to see if interactive elements appear

### Problem: Screen reader reads too much navigation before content
**Symptoms:** Every page starts with a long list of links and menus before reaching the actual content.

**Solution:**
1. Press `D` (landmark navigation) to jump directly to the `main` content area
2. Or press `1` to jump to the first H1 heading (usually the page title)
3. GitHub pages have a "Skip to content" link - it is the first focusable element. Press `Enter` on it.

### Problem: Screen reader announces "[number] results" but does not read them
**Symptoms:** After filtering issues or searching, the screen reader says how many results but does not navigate to them.

**Solution:**
1. The search results are usually in a list below the search bar
2. Press `L` to jump to the next list, then use arrow keys to navigate items
3. Or use `K` to jump through links - each result is a link
4. On the Issues/PRs page, press `J` and `Shift+J` to navigate between items (GitHub shortcut)

### Problem: Dropdown menus or popups disappear before you can read them
**Symptoms:** A menu opens but closes immediately when you try to navigate it.

**Solution:**
1. For dropdown menus: activate the button, then use `Arrow Down` to navigate options
2. For dialog popups: press `Tab` to move between elements inside the dialog
3. If the popup closes on focus loss, try `Escape` to close it, then `Enter` to reopen, and immediately arrow into it
4. Some GitHub menus require Focus Mode - press `NVDA+Space` (NVDA) or `Insert+Z` (JAWS) to switch

### Problem: Interactive elements are announced as "clickable" without a specific role
**Symptoms:** Screen reader says "clickable" instead of "button," "link," or "checkbox."

**Solution:**
1. Try pressing `Enter` or `Space` to activate the element
2. This indicates a potential accessibility issue with the page - the element is missing proper ARIA roles
3. If this happens consistently on a specific page, file an accessibility issue on the project with the page URL and element description

## NVDA-Specific Issues

### Problem: NVDA not reading GitHub page at all
**Symptoms:** NVDA is running but produces no speech on GitHub pages.

**Solution:**
1. Press `NVDA+Space` to verify you are in Browse Mode
2. Press `NVDA+F7` to open the Elements List - if it shows headings and links, NVDA can see the page
3. Press `Ctrl+Home` to go to the top of the page, then `Down Arrow` through content
4. Try a different browser (Firefox often works best with NVDA)
5. Check NVDA preferences → Browse Mode → verify "Use browse mode on page load" is checked

### Problem: NVDA reads every character when typing in a form field
**Symptoms:** When typing in a GitHub comment box, NVDA reads each character but you cannot review what you wrote.

**Solution:**
1. You are in Focus Mode (correct for typing). To review your text without leaving, press `NVDA+Up Arrow` to read the current line
2. Press `NVDA+Space` to switch to Browse Mode temporarily to review, then `NVDA+Space` again to return to Focus Mode for typing
3. In VS Code, use `Alt+F2` (Accessible View) to review Copilot responses or other content

### Problem: NVDA add-ons conflict with VS Code
**Symptoms:** VS Code behaves strangely with certain NVDA add-ons enabled.

**Solution:**
1. Temporarily disable add-ons: NVDA Menu → Tools → Manage Add-ons → disable suspected add-ons → restart NVDA
2. Common culprits: BrowserNav, Enhanced Touch Gestures, or older add-ons not updated for the current NVDA version
3. Update all add-ons to the latest versions compatible with NVDA 2025.3.3

## JAWS-Specific Issues

### Problem: JAWS not announcing form fields correctly
**Symptoms:** JAWS skips form inputs, does not say "required," or reads field labels incorrectly.

**Solution:**
1. Toggle Forms Mode: `Insert+Z`
2. List all form controls on the page: `Insert+F6`
3. Navigate form fields with `F` (next form field) or `Tab`
4. If labels are not announced, the HTML may be missing proper `<label>` elements - this is a page accessibility issue
5. Check JAWS version: ensure you are running JAWS 2026 or later for best GitHub compatibility

### Problem: JAWS virtual cursor conflicts with GitHub keyboard shortcuts
**Symptoms:** Pressing `G` in JAWS reads it as a virtual cursor command instead of triggering GitHub's keyboard shortcuts.

**Solution:**
1. Toggle virtual cursor off: `Insert+Z` (enters Forms Mode / Application mode)
2. With virtual cursor off, `G` then `I` will trigger GitHub's "Go to Issues" shortcut
3. Toggle back to virtual cursor when done

### Problem: JAWS announces too much on GitHub pages
**Symptoms:** JAWS reads every ARIA attribute, region name, and role, making navigation slow.

**Solution:**
1. Adjust verbosity: `Insert+V` → cycle through verbosity levels
2. Or go to JAWS Settings Center → Web/HTML/PDF → adjust "Navigation" and "Reading" verbosity
3. Use Skim Reading: `Insert+Shift+Down Arrow` to get a summary of the page

## VoiceOver-Specific Issues

### Problem: VoiceOver on macOS not reading GitHub elements
**Symptoms:** VoiceOver skips buttons, links, or form fields on GitHub.

**Solution:**
1. Open Rotor: `VO+U` (VO key is usually `Caps Lock` or `Control+Option`)
2. Use Left/Right arrows to switch rotor categories (Headings, Links, Form Controls)
3. Use Up/Down arrows to navigate within a category
4. If the rotor shows fewer elements than expected, the page may need to finish loading - wait and try again
5. Test in Safari first - it has the best VoiceOver compatibility among browsers

### Problem: VoiceOver Quick Nav conflicts with GitHub shortcuts
**Symptoms:** Single-letter navigation (H, B, K) is consumed by VoiceOver Quick Nav instead of GitHub.

**Solution:**
1. **Quick Nav on (default for web):** Single letters are VoiceOver navigation commands (H for headings, etc.) - this is usually what you want for web browsing
2. **Quick Nav off:** Toggle with `Left Arrow + Right Arrow` simultaneously. With Quick Nav off, single letters type into the page - needed for some GitHub shortcuts
3. For GitHub shortcuts like `G` then `I`: turn Quick Nav off first

### Problem: VoiceOver cursor gets trapped in the VS Code editor
**Symptoms:** VoiceOver cannot leave the editor area to reach the sidebar or other panels.

**Solution:**
1. Press `VO+Shift+F5` to exit the current interaction context
2. Use `VO+F6` to cycle between VS Code panels (sidebar, editor, terminal, etc.)
3. Use VS Code keyboard shortcuts directly: `Ctrl+Shift+E` (Explorer), `Ctrl+Shift+G` (Source Control), etc.

## GitHub Copilot

### Problem: Copilot Chat panel will not open
**Symptoms:** `Ctrl+Shift+I` does nothing, or the Copilot Chat icon is grayed out.

**Solution:**
1. Verify extension installed: `Ctrl+Shift+X` → search "GitHub Copilot Chat" → should show installed
2. If not installed, install both "GitHub Copilot" and "GitHub Copilot Chat"
3. If installed but grayed out: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Verify you are signed in to GitHub: look for the GitHub icon in the status bar (bottom-left). Click to sign in if needed.
5. Check subscription: Copilot requires a paid plan, organization access, or the free tier. See https://github.com/features/copilot

### Problem: "You don't have access to Copilot"
**Symptoms:** Chat says you do not have Copilot access, even though the extension is installed.

**Solution:**
1. Check your subscription at https://github.com/settings/copilot
2. GitHub Copilot offers a free tier with limited usage - verify you have not exceeded limits
3. For full access: Copilot Individual (~$10/month), Copilot Business (via organization), or Copilot Enterprise
4. **Students/educators:** Free access at https://education.github.com/
5. If your organization provides Copilot, ask your admin to enable it for your account

### Problem: Copilot inline suggestions not appearing
**Symptoms:** Copilot is installed and signed in, but no code suggestions appear while typing.

**Solution:**
1. Verify Copilot is enabled for the current file type: check the Copilot icon in the status bar - it should show a checkmark
2. Click the Copilot icon to see if suggestions are enabled or disabled for this language
3. Check Settings: `Ctrl+,` → search `github.copilot.enable` → verify your language is not disabled
4. Open a new file and type a comment like `// function to add two numbers` - suggestions should appear below
5. Copilot needs an active internet connection

### Problem: Copilot suggestions are wrong or unhelpful
**Symptoms:** Copilot generates irrelevant or incorrect code/text.

**Solution:**
1. This is normal - Copilot is a suggestion tool, not a decision-maker. Always review its output.
2. Press `Alt+]` or `Alt+[` to cycle through alternative suggestions
3. Provide more context: add comments explaining what you want, open related files, or use Copilot Chat for more detailed instructions
4. Reject suggestions with `Escape`

## Copilot Chat

### Problem: Copilot Chat freezes or stops responding
**Symptoms:** Chat input becomes unresponsive, or it shows a loading spinner indefinitely.

**Solution:**
1. Wait 10-15 seconds - the API may be processing a complex request
2. Close and reopen Chat: click the X on the Chat panel → reopen with `Ctrl+Shift+I`
3. Check your internet connection
4. Check for errors: View → Output → select "GitHub Copilot" from the dropdown → look for error messages
5. If the problem persists, restart VS Code: save all work → close completely → reopen

### Problem: Chat responses are cut off or incomplete
**Symptoms:** Copilot starts answering but stops mid-sentence.

**Solution:**
1. Type "continue" in the chat to ask Copilot to continue its response
2. If the response is consistently too long, break your question into smaller parts
3. Try a different model (click the model selector in Chat) - some models handle longer outputs better

### Problem: Chat does not know about my files or project
**Symptoms:** Copilot Chat gives generic answers that do not reference your repository.

**Solution:**
1. Use `@workspace` before your question: `@workspace how is authentication handled?`
2. Open relevant files in the editor before asking - Copilot uses open files as context
3. Select specific code, then ask about it - Copilot uses the selection as context
4. Make sure you opened the correct folder in VS Code (not a parent folder)

### Problem: Chat response is hard to read with screen reader
**Symptoms:** Copilot Chat outputs formatted content that the screen reader does not navigate well.

**Solution:**
1. Press `Alt+F2` (Accessible View) - this renders the response as plain, navigable text
2. In the Accessible View, use standard screen reader commands (arrows, H for headings) to read the response
3. This is the recommended workflow for all screen reader users using Copilot Chat

## Accessibility Agents

### Problem: Cannot find an agent (e.g., @template-builder)
**Symptoms:** Typing `@template-builder` in Copilot Chat does not autocomplete or does not trigger the agent.

**Solution:**
1. Verify the `.agent.md` file exists: check `.github/agents/template-builder.agent.md` in your repository
2. Verify you have GitHub Copilot with agent support (requires a qualifying plan)
3. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Open Copilot Chat: `Ctrl+Shift+I` → type `@` → scroll through available agents
5. If the file exists but the agent does not appear:
   - Verify the file is on your current branch
   - Wait 2-3 minutes for the agent index to refresh
   - Check that the YAML frontmatter in the `.agent.md` file is valid

### Problem: Agent gives generic advice instead of using its persona
**Symptoms:** You ask `@template-builder` a question but it responds like a general-purpose assistant.

**Solution:**
1. Close and reopen Copilot Chat: `Ctrl+Shift+I`
2. Verify you typed the agent name exactly: `@template-builder` (with the hyphen)
3. Type `/` to see available slash commands for that agent
4. Check the `.agent.md` file: the YAML frontmatter must include the agent's name and description
5. Try a simpler query to test if the agent responds correctly

### Problem: Agent cannot access repositories or data
**Symptoms:** Agent says it cannot find your repositories or data.

**Solution:**
1. Verify you are signed in to GitHub in VS Code
2. Check `.github/agents/preferences.md` - is it configured with your repositories?
3. If `preferences.md` does not exist, copy from `preferences.example.md` and customize it
4. The agent needs read access to the repositories listed in preferences

### Problem: Slash commands do not appear
**Symptoms:** Typing `/` in Chat does not show the expected custom commands.

**Solution:**
1. Custom slash commands come from `.github/prompts/` in your repository
2. Verify the prompt files exist and are on your current branch
3. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Type `/` in Chat and wait - the list may take a moment to populate

## Exercises and the Learning Room

### Problem: Exercise tells me to look for a file but I cannot find it
**Symptoms:** An exercise says "open the template file" but the file is not in the expected location.

**Solution:**
1. Check the exercise prerequisites - some files are created in earlier exercises
2. For templates: check `.github/ISSUE_TEMPLATE/` folder
3. For agents: check `.github/agents/` folder
4. List all files: `git ls-files` or in VS Code use `Ctrl+P` and type part of the filename
5. You may be on the wrong branch: `git checkout main`
6. The Learning Room files are in `learning-room/docs/` (not in the root `docs/` folder)

### Problem: Cannot understand what the exercise is asking
**Symptoms:** Exercise steps are confusing or the goal is unclear.

**Solution:**
1. Read the prerequisites section at the start of each exercise
2. Each exercise follows a pattern: **Try It** → **You're done when** → **What success feels like**
3. Look for the "What you should see" checkpoint after each step
4. If your results do not match, re-read the step - the issue is usually a small detail
5. Check if there is an "If you're stuck" section within the exercise
6. Ask for help: open an issue describing the step you are on and what you see

### Problem: Bot does not respond to my PR in the Learning Room
**Symptoms:** You opened a PR but the automated bot did not post a review comment.

**Solution:**
1. Wait 30-60 seconds - the bot runs via GitHub Actions and may take a moment
2. Check the Actions tab on the repository - is there a workflow run for your PR?
3. If the workflow failed, click it to see the error
4. Verify your PR targets the correct branch (usually `main`)
5. If the bot still does not respond, ask the facilitator - the automation may need to be configured

### Problem: Learning Room challenges are too easy or too hard
**Symptoms:** Individual challenges do not match your skill level.

**Solution:**
1. Challenges are progressive - start with #01 and work up
2. **Too easy:** Jump ahead to the bonus challenges (A through E) in `docs/CHALLENGES.md`
3. **Too hard:** Go back to the relevant chapter and review the concepts
4. The 21 challenges span six skill levels - find the range that stretches you without frustrating you

## HTML Build System

### Problem: `npm run build:html` fails
**Symptoms:** Running the build command produces errors or no output.

**Solution:**
1. Verify Node.js is installed: `node --version` (must be v14+)
2. Install dependencies first: `npm install`
3. Check the error message:
   - `marked is not defined` → run `npm install` to install dependencies
   - `ENOENT: no such file or directory` → verify you are in the repository root
   - `SyntaxError` → a markdown file may have unusual characters. Check the error output for the filename.
4. Try removing `node_modules` and reinstalling: delete the `node_modules` folder → `npm install` → `npm run build:html`

### Problem: HTML build produces files but they look wrong
**Symptoms:** HTML files are generated but formatting is broken, styles are missing, or navigation is wrong.

**Solution:**
1. Verify `github-markdown-css` is installed: check `node_modules/github-markdown-css/`
2. Open an HTML file in your browser - if styles are missing, the CSS link may be broken
3. Check `scripts/build-html.js` for any custom configuration that may have been changed
4. Try a clean rebuild: delete the `html/` folder contents → `npm run build:html`

### Problem: HTML files are outdated after editing markdown
**Symptoms:** You edited a `.md` file but the corresponding `.html` file still shows old content.

**Solution:**
1. Rebuild: `npm run build:html`
2. The HTML build is manual - it does not auto-update when you edit markdown
3. After rebuilding, commit both the `.md` and `html/` changes together
4. For live preview during editing, use `npm run watch` if available, or use VS Code's built-in Markdown preview (`Ctrl+Shift+V`)

## GitHub Pages and Online Access

### Problem: GitHub Pages site is not updating
**Symptoms:** You pushed changes but the live site still shows old content.

**Solution:**
1. GitHub Pages can take 2-10 minutes to rebuild after a push
2. Check build status: repository Settings → Pages → look for build status
3. Hard refresh in your browser: `Ctrl+Shift+R`
4. Check that GitHub Pages is configured to serve from the correct branch and folder

### Problem: Cannot access workshop materials
**Symptoms:** You want to read the materials but cannot find where they are hosted or how to download them.

**Solution:** See [Appendix Y (Accessing Workshop Materials)](docs/appendix-y-workshop-materials.md) for complete instructions covering:
- Reading on GitHub Pages (if hosted)
- Reading directly on GitHub.com
- Cloning the repository with Git
- Downloading as a ZIP file
- Downloading individual files

## Performance and Network

### Problem: GitHub is slow or unresponsive
**Symptoms:** Pages take a long time to load, or actions time out.

**Solution:**
1. Check GitHub's status page: https://www.githubstatus.com/
2. Try a different browser
3. Check your internet connection by visiting other sites
4. If behind a corporate network, some GitHub features may be blocked - check with your IT department
5. Disable browser extensions that may interfere (ad blockers, privacy tools)

### Problem: VS Code is slow or laggy
**Symptoms:** VS Code takes a long time to open files, respond to keyboard input, or load extensions.

**Solution:**
1. Close unused editor tabs and panels
2. Disable extensions you are not using: `Ctrl+Shift+X` → disable non-essential extensions
3. Check for large files: VS Code may struggle with very large files or repositories
4. Increase memory: VS Code Settings → search `files.maxMemoryForLargeFilesMB`
5. Restart VS Code

### Problem: Operations fail behind a corporate proxy or firewall
**Symptoms:** `git clone`, `npm install`, or Copilot fail with network errors.

**Solution:**
1. Configure Git proxy: `git config --global http.proxy http://proxy:port`
2. Configure npm proxy: `npm config set proxy http://proxy:port`
3. If SSH is blocked, use HTTPS for Git operations: `git remote set-url origin https://github.com/...`
4. Some firewalls block VS Code's telemetry or extension marketplace - ask IT to whitelist `*.visualstudio.com`, `*.github.com`, and `*.githubusercontent.com`

## Getting More Help

If your issue is not listed here:

1. **[FAQ](FAQ.md)** - Answers to common questions about the workshop
2. **[Quick Reference](QUICK_REFERENCE.md)** - Condensed keyboard shortcuts and commands
3. **[Glossary](docs/appendix-a-glossary.md)** - Term definitions
4. **[Screen Reader Cheat Sheet](docs/appendix-b-screen-reader-cheatsheet.md)** - NVDA, JAWS, VoiceOver commands
5. **[Resources](docs/appendix-x-resources.md)** - External documentation and links
6. **Open an issue** on this repository with:
   - What you tried
   - What happened (exact error messages)
   - What you expected
   - Your operating system, browser, screen reader, and versions
   - The chapter or exercise you were working on

*Last updated: February 2026 | Maintained by GitHub Learning Community*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Common Issues and Solutions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Setup and Installation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Git Configuration and Operations:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **GitHub Authentication:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **GitHub Web Interface:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Repository Navigation and Cloning:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Branches, Merging, and Conflicts:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Issues and Pull Requests:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Templates and YAML:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **VS Code Setup and Configuration:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **VS Code Extensions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **VS Code Source Control:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Screen Readers - General:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **NVDA-Specific Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **JAWS-Specific Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **VoiceOver-Specific Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
