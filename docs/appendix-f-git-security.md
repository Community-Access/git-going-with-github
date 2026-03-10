# Appendix AD: Git Security for Contributors
>
> **Episode coming soon:** Git Security for Contributors - a conversational audio overview of this appendix. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Keeping Secrets Out of Your Repository

> **Who this is for:** Anyone committing code or documentation to a repository. You don't need to be a security expert — this appendix covers the practical habits that protect you and the projects you contribute to. Most security incidents in open source aren't caused by attacks; they're caused by accidents. A token committed by mistake, a password left in a config file, a `.env` file that slipped through.
>
> The good news: a few simple habits prevent almost all of them.

---

## Table of Contents

1. [Why This Matters — What Happens When Secrets Leak](#1-why-this-matters--what-happens-when-secrets-leak)
2. [The .gitignore File — Your First Line of Defense](#2-the-gitignore-file--your-first-line-of-defense)
3. [Environment Variables — The Right Way to Store Secrets](#3-environment-variables--the-right-way-to-store-secrets)
4. [Review Before You Commit](#4-review-before-you-commit)
5. [Pre-Commit Hooks — Automated Secret Detection](#5-pre-commit-hooks--automated-secret-detection)
6. [I Accidentally Committed a Secret — What Now?](#6-i-accidentally-committed-a-secret--what-now)
7. [GitHub's Built-In Push Protection](#7-githubs-built-in-push-protection)
8. [Secure Credential Storage](#8-secure-credential-storage)
9. [Security Checklist for Contributors](#9-security-checklist-for-contributors)

### Learning Cards: Using This Security Reference

<details>
<summary>Screen reader users</summary>

- Sections are ordered from understanding (section 1) to prevention (2-5) to recovery (6-7) to daily habits (8-9)
- Code blocks contain exact gitignore patterns and terminal commands -- switch to Focus Mode before copying
- The Security Checklist (section 9) is a task list you can use before every push

</details>

<details>
<summary>Low vision users</summary>

- Code examples for .gitignore patterns and terminal commands are in high-contrast code blocks
- Warning callouts use bold text -- scan for bold to find the most critical safety notes
- The Security Checklist at the bottom uses checkbox formatting for easy visual tracking

</details>

<details>
<summary>Sighted users</summary>

- Read section 1 for motivation, then jump to the section matching your current need
- The .gitignore templates in section 2 are copy-paste ready for most project types
- Skip to the Security Checklist (section 9) for a pre-push routine you can follow every time

</details>

---

## 1. Why This Matters — What Happens When Secrets Leak

When a secret (API key, token, password, private key) is committed to a public GitHub repository — even for a few seconds before you delete it — it's effectively compromised.

**Why "I'll just delete it right away" isn't enough:**

- Bots scan GitHub continuously and harvest secrets within seconds of a push
- The secret lives in your git history even after you delete the file
- GitHub forks capture history — once forked, you can't fully erase it
- Search engines may index the content before you remove it

**Real-world consequences:**
- An AWS key leaked to a public repo can result in thousands of dollars of compute charges within hours
- A GitHub PAT can be used to access private repositories, delete code, or impersonate you
- A Stripe API key can be used to make fraudulent charges against your account

**The good news:** GitHub automatically revokes its own tokens (PATs, GitHub App tokens) when it detects them in a commit. But third-party services (AWS, Stripe, Twilio, etc.) require you to rotate the secret manually — and fast.

---

## 2. The .gitignore File — Your First Line of Defense

A `.gitignore` file tells Git which files to never track. Files listed in `.gitignore` won't show up in `git status`, won't be staged by `git add`, and won't be committed.

### What belongs in .gitignore

#### Secrets and credentials
```gitignore
# Environment files (contain API keys, database passwords, etc.)
.env
.env.local
.env.*.local
.env.development
.env.production
*.env

# Key files
*.pem
*.key
*.p12
*.pfx
id_rsa
id_ed25519

# Credential files
credentials.json
secrets.json
config/secrets.yml
.aws/credentials
```

#### Editor and OS clutter
```gitignore
# macOS
.DS_Store
.AppleDouble

# Windows
Thumbs.db
desktop.ini

# VS Code (optional — some teams commit these)
.vscode/settings.json

# JetBrains IDEs
.idea/
```

#### Build output and dependencies
```gitignore
# Node
node_modules/
dist/
build/

# Python
__pycache__/
*.pyc
.venv/
venv/

# General
*.log
*.tmp
*.cache
```

### Checking if a file is already tracked

`.gitignore` only prevents **untracked** files from being added. If Git is already tracking a file, `.gitignore` won't stop it from being committed in the future.

```bash
# Check if a specific file is tracked
git ls-files .env

# If it returns the filename, it's being tracked — you need to untrack it
git rm --cached .env
# Then add it to .gitignore and commit
```

### Global .gitignore — apply to every repo on your machine

You can create a global `.gitignore` that applies to all repositories on your computer — useful for OS-specific and editor-specific files you never want to commit anywhere.

```bash
# Create a global gitignore file
touch ~/.gitignore_global

# Tell Git to use it
git config --global core.excludesfile ~/.gitignore_global
```

Add your editor and OS files to `~/.gitignore_global` so you never have to add them to individual repos.

### GitHub's .gitignore templates

When creating a new repository on GitHub, you can choose a `.gitignore` template for your language — GitHub pre-fills it with the most common patterns for that ecosystem. Find all templates at [github.com/github/gitignore](https://github.com/github/gitignore).

For an existing project:

```bash
# Download a template (e.g., for Node.js)
curl https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore >> .gitignore
```

---

## 3. Environment Variables — The Right Way to Store Secrets

Instead of hardcoding secrets in your files, store them in environment variables that live outside of your repository.

### The pattern

```bash
# ❌ Never do this (hardcoded secret in code)
API_KEY = "sk-abc123yoursecretkeyhere"

# ✅ Do this instead (read from environment)
API_KEY = os.environ.get("API_KEY")      # Python
const apiKey = process.env.API_KEY;      // JavaScript
```

### Using a .env file locally

A `.env` file stores your local environment variables. It's convenient and universally supported — and it must be in your `.gitignore`.

```bash
# .env (NEVER commit this file)
GITHUB_TOKEN=ghp_yourtokenhere
DATABASE_URL=postgres://user:password@localhost/mydb
STRIPE_SECRET_KEY=sk_test_yourkeyhere
```

Load it in your code with a library like `dotenv` (JavaScript) or `python-dotenv` (Python). The `.env` file stays on your machine; the code that reads it goes into the repository.

### Sharing secrets with your team safely

Never send secrets in Slack, email, or GitHub comments. Use:

- **GitHub Actions Secrets** — for CI/CD pipelines: Settings → Secrets and variables → Actions
- **A password manager with sharing** (1Password Teams, Bitwarden) — for team credentials
- **A secrets manager** (AWS Secrets Manager, HashiCorp Vault) — for production systems

### Example: Using GitHub Actions Secrets

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          API_KEY: ${{ secrets.API_KEY }}   # Pulled from GitHub Secrets, never in code
        run: ./deploy.sh
```

---

## 4. Review Before You Commit

The most effective habit is simply reviewing what you're about to commit before you commit it.

### git diff --staged — see exactly what's going in

```bash
# Review all staged changes before committing
git diff --staged

# Review a specific file
git diff --staged docs/config.md
```

Read through the diff looking for:
- Any hardcoded passwords, tokens, or API keys
- `.env` or credential files that snuck in
- Any TODO comments that reference sensitive information

### Avoid `git add .` blindly

`git add .` stages everything in your working directory — including files you didn't mean to add.

```bash
# ❌ Risky — stages everything without review
git add .

# ✅ Better — stage specific files you know are clean
git add src/auth.js docs/README.md

# ✅ Or stage interactively — review each file before adding
git add -p
```

`git add -p` (patch mode) walks you through each change chunk by chunk and asks whether to stage it. It's slower but gives you full control.

### Check what's staged before committing

```bash
# See which files are staged (and which aren't)
git status

# See the full diff of staged changes
git diff --staged
```

> **GitHub Copilot can help:** After staging your changes, open Copilot Chat and ask: *"Review my staged changes for any accidentally included secrets, API keys, or credentials."* Paste the output of `git diff --staged` into the chat.

---

## 5. Pre-Commit Hooks — Automated Secret Detection

A pre-commit hook is a script that runs automatically every time you try to commit. If the script detects a problem (like a potential secret), it blocks the commit and tells you what it found.

Think of it as a safety net that catches things you might have missed during review.

### Option A: detect-secrets (recommended, Python-based)

`detect-secrets` scans for over 20 types of secrets and integrates well with existing repos.

```bash
# Install
pip install detect-secrets

# Create a baseline (scan your existing code — mark known non-secrets as safe)
detect-secrets scan > .secrets.baseline

# Install the pre-commit hook
detect-secrets hook

# Test it manually
detect-secrets scan
```

After setup, any commit containing a potential secret is blocked with a clear message showing which file and line triggered the alert.

### Option B: gitleaks (Go-based, zero dependencies)

```bash
# Install on macOS
brew install gitleaks

# Install on Windows
winget install gitleaks

# Scan your entire repo history for secrets
gitleaks detect --source . --verbose

# Scan staged changes only (what you're about to commit)
gitleaks protect --staged

# Add as a pre-commit hook manually
# Add this to .git/hooks/pre-commit:
gitleaks protect --staged -v
```

### Option C: pre-commit framework (manages multiple hooks)

The `pre-commit` framework lets you install and manage hooks from a YAML config file, making it easy to share hook config across your team.

```bash
# Install
pip install pre-commit

# Create .pre-commit-config.yaml in your repo root:
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

```bash
# Install the hooks
pre-commit install

# Run manually against all files
pre-commit run --all-files
```

> **Note:** Pre-commit hooks live in `.git/hooks/` and are local to your machine — they're not committed to the repo automatically. To share hook config with your team, commit the `.pre-commit-config.yaml` file and ask everyone to run `pre-commit install`.

---

## 6. I Accidentally Committed a Secret — What Now?

Stay calm and act quickly. Follow these steps in order.

### Step 1: Rotate the secret immediately

Before anything else — go to wherever that secret is managed and revoke or rotate it. It may already be compromised, so neutralizing it is more important than removing it from git history.

| Secret type | Where to rotate |
|-------------|----------------|
| GitHub PAT | [github.com/settings/tokens](https://github.com/settings/tokens) → Delete and regenerate |
| SSH key | [github.com/settings/keys](https://github.com/settings/keys) → Delete and generate new |
| AWS key | AWS IAM Console → Deactivate and create new |
| Stripe key | Stripe Dashboard → Developers → API Keys → Roll key |
| Any other API key | Check the service's dashboard for key management |

**GitHub automatically revokes its own tokens** when secret scanning detects them. Other services do not.

### Step 2: Was it pushed to a public repo?

**If it was pushed (remote has the secret):**

The secret is potentially already compromised — assume it was harvested. Rotation is critical. Then remove it from history:

**If it was only committed locally (not pushed):**

You can fix it cleanly before anyone sees it:

```bash
# Undo the last commit, keep your changes staged (safest)
git reset --soft HEAD~1

# Now remove the secret from the file, re-add, and re-commit
# (Edit the file to remove the secret)
git add -p   # Review what you stage
git commit -m "Your original commit message without the secret"
```

### Step 3: Remove the secret from git history

> **This only matters if the commit was pushed.** If it was local-only and you used `git reset --soft` above, you're done.

#### Method A: git filter-repo (recommended — built-in, modern)

```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove a specific file from all history
git filter-repo --path secrets.json --invert-paths

# Replace a specific string (the secret value) throughout all history
git filter-repo --replace-text <(echo "ghp_actualtoken==>REMOVED")
```

#### Method B: BFG Repo-Cleaner (fast, Java-based)

```bash
# Download BFG
# From https://rtyley.github.io/bfg-repo-cleaner/

# Remove a file from all history
java -jar bfg.jar --delete-files secrets.json

# Replace secret strings
# Create a file called passwords.txt with the secret on each line
java -jar bfg.jar --replace-text passwords.txt
```

### Step 4: Force push the cleaned history

After rewriting history, you must force push:

```bash
git push --force-with-lease origin main
```

> **Coordinate with your team first.** Anyone who has cloned or pulled the repo will need to re-clone or rebase after a force push. Send a heads-up before doing this on a shared repo.

### Step 5: Tell GitHub to rescan

After removing the secret from history, go to **Security → Secret scanning** in your repository and mark any open alerts as resolved.

### Quick decision flowchart

```
Secret committed
      │
      ├─ Still local only (not pushed)?
      │     └─ git reset --soft HEAD~1 → remove secret → recommit ✅
      │
      └─ Already pushed?
            ├─ Rotate the secret FIRST (assume compromised)
            ├─ Remove from history with git filter-repo or BFG
            └─ Force push + notify team
```

---

## 7. GitHub's Built-In Push Protection

GitHub automatically scans pushes for known secret patterns before they reach the remote. If it detects a secret, the push is blocked.

```text
remote: Push cannot contain secrets.
remote:
remote:   Secret detected: GitHub Personal Access Token
remote:   File: config/settings.py, Line: 14
remote:
remote:   To bypass (if this is a false positive):
remote:   https://github.com/owner/repo/security/secret-scanning/unblock-secret/TOKEN
```

### What push protection covers

GitHub knows the patterns for hundreds of secret types including:
- GitHub tokens (PATs, GitHub App tokens, OAuth tokens)
- AWS access keys
- Azure credentials
- Google Cloud keys
- Stripe, Twilio, Slack, and dozens more API keys

### If push protection blocks you

1. **Confirm it's actually a secret** — check the file and line mentioned
2. **If it's a real secret:** Remove it from the file, amend your commit, and push again
3. **If it's a false positive:** Use the bypass URL GitHub provides to push with an explanation

### Checking your repo's push protection status

As a contributor you can see push protection in action when a push is blocked. Maintainers configure it in **Settings → Code security → Push protection**.

> **For full detail on GitHub's security scanning features:** See [Appendix L: GitHub Security Features](appendix-p-security-features.md).

---

## 8. Secure Credential Storage

### Never store credentials in plaintext

❌ Don't do these:
```bash
# Storing a token in a plain text file
echo "ghp_mytoken" > ~/token.txt

# Hardcoding in a script
export GITHUB_TOKEN="ghp_mytoken"  # in a .bashrc or .zshrc that's committed

# In a git config
git config --global url."https://myusername:ghp_mytoken@github.com".insteadOf "https://github.com"
```

✅ Do this instead — use the OS credential store:

```bash
# macOS — use Keychain
git config --global credential.helper osxkeychain

# Windows — use Credential Manager (set automatically by Git for Windows)
git config --global credential.helper wincred

# Linux — use the libsecret store (requires installation)
git config --global credential.helper /usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

With a credential helper set, Git asks for your credentials once and stores them securely in the OS keychain — not in any file.

### Using a password manager

Store your GitHub PAT, SSH key passphrase, and other credentials in a password manager (1Password, Bitwarden, KeePass). Most support browser extensions, CLI access, and automatic lock after inactivity.

### Checking what credential helper is set

```bash
git config --global credential.helper
```

If this returns nothing, your credentials may be stored in plaintext. Set a credential helper as above.

### Learning Cards: Security Checklist

<details>
<summary>Screen reader users</summary>

- The checklist below uses Markdown task list formatting -- each item is announced as "checkbox not checked"
- Items are grouped into three categories: Before Committing, Before Pushing, and Repository Setup
- Read through the list once to learn the habits, then use it as a pre-push routine

</details>

<details>
<summary>Low vision users</summary>

- Checkboxes create a clear visual pattern for scanning -- each line starts with a square box
- Three groups are separated by h3 headings: Before Committing, Before Pushing, Repository Setup
- Consider copying this checklist into a personal note and checking items off for each project

</details>

<details>
<summary>Sighted users</summary>

- This is a printable pre-push checklist -- bookmark it or copy it into your project's CONTRIBUTING.md
- Three sections cover the complete workflow: staging, pushing, and one-time repository setup
- The most critical items are the first two in "Before Committing" -- git diff review and selective git add

</details>

---

## 9. Security Checklist for Contributors

Use this before every push to a public repository.

### Before committing

- [ ] I reviewed `git diff --staged` and didn't see any tokens, passwords, or keys
- [ ] I used `git add <specific files>` or `git add -p` rather than `git add .`
- [ ] Any `.env` files or credential files are listed in `.gitignore`
- [ ] Config files with real values are in `.gitignore`; only example/template files are committed

### Before pushing

- [ ] `git log --oneline -5` — all commits look expected
- [ ] No commits with messages like "remove secret" or "oops" that suggest a secret was added and removed (the secret is still in history)

### Repository setup (one time)

- [ ] `.gitignore` includes `.env`, `*.key`, `*.pem`, and relevant patterns for your stack
- [ ] Global `.gitignore` (`~/.gitignore_global`) covers editor/OS files
- [ ] Git credential helper is configured to use the OS keychain
- [ ] (Optional) A pre-commit hook is installed to scan for secrets automatically

### If you're a maintainer

- [ ] Branch protection is enabled on `main` with required reviews and status checks
- [ ] Secret scanning is enabled (Settings → Code security → Secret scanning)
- [ ] Push protection is enabled for the repository
- [ ] A `SECURITY.md` file exists with instructions for reporting vulnerabilities

> **See also:** [Appendix L: GitHub Security Features](appendix-p-security-features.md) for the GitHub platform security tools (Dependabot, secret scanning alerts, code scanning). [Appendix D: Git Authentication](appendix-d-git-authentication.md) for SSH keys, PATs, and commit signing.

---

*Related appendices: [Appendix D: Git Authentication](appendix-d-git-authentication.md) · [Appendix K: Branch Protection and Rulesets](appendix-o-branch-protection.md) · [Appendix L: GitHub Security Features](appendix-p-security-features.md) · [Appendix AA: Advanced Git Operations](appendix-e-advanced-git.md)*
