# Appendix D: Git Authentication
>
> **Listen to Episode 21:** [Git Authentication](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## SSH Keys & Personal Access Tokens

> **Audience:** This appendix is for contributors who need to configure Git authentication for push access. If you're working entirely through the GitHub web interface or GitHub Desktop, you can skip this. If you're using VS Code with Git command line, this becomes relevant when you want to push commits to your fork.

### Learning Cards: Using This Authentication Reference

<details>
<summary>Screen reader users</summary>

- This appendix has two main paths: Personal Access Token (recommended) and SSH Keys -- jump to your chosen method via heading navigation
- Step-by-step instructions are numbered lists -- your screen reader announces "1 of 8," etc. to track progress
- The Troubleshooting section near the bottom covers the error messages you are most likely to encounter

</details>

<details>
<summary>Low vision users</summary>

- Command-line examples are in code blocks with high contrast -- increase zoom to read them comfortably
- Each method (PAT vs SSH) is a separate section with its own step-by-step flow
- The "Do not" lists use bold text to highlight security warnings

</details>

<details>
<summary>Sighted users</summary>

- Start at "Two Authentication Methods" for a pros/cons comparison, then follow the section for your choice
- Code blocks show the exact commands to copy -- use the copy button in the top-right corner on GitHub
- The Troubleshooting section at the bottom is organized by error message

</details>


## When You Need Authentication

GitHub requires authentication when you:

- **Push** commits to a repository
- **Clone** a private repository
- **Access** organization repositories with specific permissions

You do **not** need authentication to:

- Clone public repositories
- View public repositories on GitHub.com
- Read issues and pull requests


## Two Authentication Methods

### Personal Access Token (PAT)

A Personal Access Token is a password-like string you generate on GitHub and use instead of your account password when Git asks for credentials.

#### Pros

- Works on all operating systems
- Easy to set up for screen reader users (no command line required)
- Can be scoped to specific permissions
- Easy to revoke if compromised

#### Cons

- You have to store it securely
- Expires after a set time (you must regenerate)

### SSH Keys

SSH uses public-key cryptography. You generate a key pair on your computer (public + private), upload the public key to GitHub, and Git uses the private key to prove your identity.

#### Pros

- Once set up, works automatically (no password prompts)
- More secure than tokens
- Never expires

#### Cons

- Requires command-line setup (less accessible for some screen reader users)
- Slightly more complex initial configuration


## Creating a Personal Access Token (Recommended for This Workshop)

**Why this method:** It's screen reader accessible through the GitHub web interface, and you can complete it without command-line Git configuration.

### Step 1: Generate the Token

1. Navigate to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Select **"Tokens (classic)"** from the left sidebar
3. Activate **"Generate new token"** → Select **"Generate new token (classic)"**
4. Give it a descriptive name in the **Note** field: "Workshop Laptop Token"
5. Set expiration: **30 days** or **60 days** (recommended for temporary workshop use)
6. Select scopes:
   - **`repo`** - Full control of private repositories (includes public repo access)
   - **`workflow`** - Update GitHub Actions workflows (if you'll work with Actions)
7. Scroll down and activate **"Generate token"**
8. **CRITICAL:** Copy the token immediately - you cannot see it again

**Screen reader note:** The token appears as a long string in a text field. Select all (`Ctrl+A`), copy (`Ctrl+C`), and paste it into a secure note or password manager.

### Step 2: Store It Securely

#### Options

- **Password manager** (1Password, Bitwarden, LastPass) - best option
- **Encrypted note** in your operating system's secure notes
- **Plain text file** in an encrypted folder (temporary only)

#### Do not

- Paste it into a document you sync to cloud storage unencrypted
- Email it to yourself
- Save it in a public GitHub file

### Step 3: Use It

The next time Git asks for your password (when you push, pull from a private repo, or clone a private repo):

```text
Username: [your-github-username]
Password: [paste-your-PAT-here]
```

**Windows Git Credential Manager:** Windows will remember this token automatically after your first use. You only paste it once.

**macOS Keychain:** macOS will offer to save it to Keychain. Select "Always Allow."

**Linux:** You can configure Git to cache credentials:

```bash
git config --global credential.helper cache
```


## Setting Up SSH Keys (Alternative Method)

If you prefer SSH and are comfortable with terminal commands:

### Step 1: Check If You Already Have a Key

```bash
ls -al ~/.ssh
```

Look for files named `id_rsa.pub`, `id_ed25519.pub`, or similar. If you see these, you already have a key.

### Step 2: Generate a New SSH Key

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

When prompted:

- Press `Enter` to accept the default file location
- Enter a passphrase (optional but recommended)

**Screen reader note:** Git will print output showing where the key was saved. It generates two files: `id_ed25519` (private) and `id_ed25519.pub` (public).

### Step 3: Copy Your Public Key

#### Windows (PowerShell)

```powershell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

#### macOS

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

#### Linux

```bash
cat ~/.ssh/id_ed25519.pub
# Manually select and copy the output
```

### Step 4: Add to GitHub

1. Navigate to [github.com/settings/keys](https://github.com/settings/keys)
2. Select **"New SSH key"**
3. **Title:** "Workshop Laptop SSH Key"
4. **Key type:** Authentication Key
5. **Key:** Paste your public key (should start with `ssh-ed25519` or `ssh-rsa`)
6. Select **"Add SSH key"**
7. Confirm with your password or 2FA code

### Step 5: Test the Connection

```bash
ssh -T git@github.com
```

You should see: `Hi username! You've successfully authenticated...`

### Step 6: Use SSH URLs

When cloning or adding remotes, use SSH URLs instead of HTTPS:

```text
# SSH format
git@github.com:owner/repo.git

# Instead of HTTPS
https://github.com/owner/repo.git
```


## Switching Between HTTPS and SSH

If you cloned with HTTPS but want to use SSH (or vice versa), update the remote:

### Check your current remote

```bash
git remote -v
```

### Switch to SSH

```bash
git remote set-url origin git@github.com:your-username/repo.git
```

### Switch to HTTPS

```bash
git remote set-url origin https://github.com/your-username/repo.git
```


### Learning Cards: Troubleshooting Authentication

<details>
<summary>Screen reader users</summary>

- Each troubleshooting entry starts with the error message in quotes as an h3 heading -- press 3 to jump between errors
- Solutions include terminal commands in code blocks -- switch to Focus Mode before copying them
- If your error is not listed here, search the GitHub Docs authentication troubleshooting page

</details>

<details>
<summary>Low vision users</summary>

- Error messages are displayed as bold h3 headings for easy visual scanning
- Solution steps are numbered and include code blocks you can copy directly
- If terminal output is hard to read, paste commands into VS Code's integrated terminal which respects your theme settings

</details>

<details>
<summary>Sighted users</summary>

- Scan the h3 headings to find your exact error message
- Each solution starts with the most common fix first -- try that before the alternatives
- The "Security Best Practices" section below is worth skimming after you resolve your issue

</details>


## Troubleshooting

### "Authentication failed" when pushing

**Problem:** Your token expired or is incorrect.

#### Solution

- Generate a new PAT
- Clear your credential cache (Windows: Credential Manager; macOS: Keychain; Linux: `git credential-cache exit`)
- Try pushing again - Git will ask for credentials

### "Permission denied (publickey)"

**Problem:** SSH key not properly set up.

#### Solution

- Verify your key is added to GitHub: [github.com/settings/keys](https://github.com/settings/keys)
- Check SSH agent is running: `ssh-add -l`
- Add your key to the agent: `ssh-add ~/.ssh/id_ed25519`

### "Host key verification failed"

**Problem:** SSH doesn't recognize GitHub's host key.

#### Solution

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
```


## Security Best Practices

1. **Never share your private key or PAT** - treat them like passwords
2. **Use scoped PATs** - only grant the minimum permissions needed
3. **Set expiration dates** on PATs - regenerate periodically
4. **Use a passphrase** on SSH keys - adds another layer of security
5. **Revoke old tokens** when you're done with a project or device
6. **Don't commit tokens or keys to Git** - use `.gitignore` for config files


## Commit Signing - Verified Badges and Vigilant Mode

When you push commits to GitHub, each commit shows a small badge: **Verified** or **Unverified**. This badge tells anyone viewing the commit history whether the commit was cryptographically signed - proving it came from you and was not tampered with.

### Why It Matters

Open source maintainers increasingly require signed commits before merging. Some repositories enforce this with branch protection rules. If you contribute to [accessibility-agents](https://github.com/Community-Access/accessibility-agents) and your commits show "Unverified," a maintainer may ask you to sign them before the PR can be merged.

### Two Methods for Signing Commits

#### SSH Signing (simpler - reuses your existing SSH key)

If you already have an SSH key set up for authentication, you can use it for signing too.

##### Step 1: Configure Git to use SSH for signing

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

##### Step 2: Add your SSH key as a signing key on GitHub

1. Navigate to [github.com/settings/ssh](https://github.com/settings/ssh)
2. Select **"New SSH key"**
3. Change **"Key type"** to **"Signing Key"** (not Authentication Key)
4. Paste your public key and save

Your commits now show the **Verified** badge in GitHub's commit history.

#### GPG Signing (traditional method)

##### Step 1: Generate a GPG key

```bash
gpg --full-generate-key
# Choose: RSA and RSA, 4096 bits, never expires
# Enter your GitHub email address when prompted
```

## Step 2: Find your key ID

```bash
gpg --list-secret-keys --keyid-format=long
# Output includes: sec   rsa4096/XXXXXXXXXXXXXXXX
# The X's are your key ID
```

## Step 3: Export the public key

```bash
gpg --armor --export YOUR_KEY_ID
# Copies the block starting with -----BEGIN PGP PUBLIC KEY BLOCK-----
```

## Step 4: Add to GitHub

1. Navigate to [github.com/settings/gpg-keys](https://github.com/settings/gpg-keys)
2. Select **"New GPG key"** → paste the exported public key

## Step 5: Configure Git to sign all commits

```bash
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

### Vigilant Mode

GitHub has an optional setting called **Vigilant Mode** (in Settings → SSH and GPG Keys → Vigilant mode). When enabled, GitHub marks **all** commits from your account as "Unverified" unless they are signed - even commits that were previously shown without a badge.

#### Why some maintainers enable Vigilant Mode

- It makes tampered or spoofed commits immediately obvious
- It signals that the repository cares about commit provenance

#### What you see as a contributor

- Every unsigned commit you push will show a yellow "Unverified" badge
- This is a visual signal - commits can still be pushed, but maintainers may block the merge

#### To read verification badges with a screen reader

- Navigate to the repository's commit history (Code tab → Commits link)
- Each commit row contains either "Verified" or "Unverified" as a badge element
- NVDA/JAWS: the badge is inside the commit row; use `↓` to read through each row and the badge text is read inline
- VoiceOver: use `VO+Right` through the commit row; the badge is read as a button with the text "Verified" (clicking it shows the certificate)

**Workshop recommendation:** SSH signing is simpler to set up than GPG and reuses your existing key. If you have 10 minutes, configure it before Day 2 - every commit you push to accessibility-agents will show as Verified.


## For This Workshop

### Recommended approach

1. Generate a Personal Access Token with 30-day expiration
2. Scope: `repo` and `workflow`
3. Store it in your password manager
4. Use it when VS Code or Git asks for a password

SSH keys are great for long-term use, but PATs are faster to set up and more accessible for screen reader users during a time-constrained workshop.


*Return to: [Pre-Workshop Setup](00-pre-workshop-setup.md) | [Resources](appendix-x-resources.md)*
