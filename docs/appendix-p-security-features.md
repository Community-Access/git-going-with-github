# Appendix P: GitHub Security Features
>
> **Listen to Episode 29:** [GitHub Security Features](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 08: Open Source Culture](08-open-source-culture.md) | Also relevant: [Chapter 17](17-issue-templates.md)
>
> **Authoritative source:** [GitHub Docs: Code security](https://docs.github.com/en/code-security)

## Dependabot, Secret Scanning, Code Scanning, and Private Advisories

> **Who this is for:** Anyone contributing to open source repositories needs to understand how GitHub protects code and what security alerts mean. This appendix explains the GitHub Security tab, how to interpret and respond to alerts, and how to responsibly report vulnerabilities - including in `community-access/accessibility-agents`.


## Quick Navigation

1. [The Security Tab - What It Contains](#1-the-security-tab---what-it-contains)
2. [Dependabot - Automated Dependency Updates](#2-dependabot---automated-dependency-updates)
3. [Secret Scanning - Preventing Credential Leaks](#3-secret-scanning---preventing-credential-leaks)
4. [Code Scanning and CodeQL](#4-code-scanning-and-codeql)
5. [Private Vulnerability Reporting](#5-private-vulnerability-reporting)
6. [The SECURITY.md File](#6-the-securitymd-file)
7. [Software Bill of Materials (SBOM)](#7-software-bill-of-materials-sbom)
8. [Screen Reader Navigation of the Security Tab](#8-screen-reader-navigation-of-the-security-tab)
9. [Security and Accessibility Agents](#9-security-and-accessibility-agents)


## 1. The Security Tab - What It Contains

Every GitHub repository has a **Security tab** in its navigation bar. What you see there depends on whether you are a contributor with elevated access or a public viewer.

### Public viewers see

- Security policy (if the repo has a `SECURITY.md`)
- The private vulnerability reporting form (if enabled by the maintainer)

### Contributors with write or admin access see

- Dependabot alerts
- Secret scanning alerts
- Code scanning alerts
- Security advisories
- The ability to manage security settings

### Screen Reader Path to the Security Tab

```text
On any repository page:
Tab navigation → secondary nav region → "Security" link → Enter
Or: G then S (GitHub keyboard shortcut - enable Focus Mode first)
```

### Learning Cards: The Security Tab

<details>
<summary>Screen reader users</summary>

- Use G then S (GitHub keyboard shortcut) to jump directly to the Security tab from any repo page — much faster than Tab-navigating the full nav bar
- The Security tab content varies by your access level — public viewers see only the security policy and vulnerability reporting form; contributors with write access see alerts
- Dependabot alerts, secret scanning alerts, and code scanning alerts are each a separate link inside the Security tab — use K to navigate between them

</details>

<details>
<summary>Low vision users</summary>

- The Security tab link sits in the repository's top navigation bar alongside Code, Issues, PRs, and Actions — zoom in if the tab labels are small
- Alert severity badges (Critical, High, Medium, Low) use colored labels — each badge also includes the severity word, so color is not the only indicator
- If the Security tab shows "No alerts," that is good news — look for the green shield icon next to the tab name as confirmation

</details>

<details>
<summary>Sighted users</summary>

- Find the Security tab in the repository navigation bar — it shows a shield icon and may display a count badge if alerts exist
- Inside the Security tab, the left sidebar lists Dependabot, Secret scanning, and Code scanning as separate pages — click each to see its alert list
- A green shield on the repo home page (or no security count badge) means zero open security alerts

</details>


## 2. Dependabot - Automated Dependency Updates

Dependabot is GitHub's automated dependency monitoring and update system. It does two things:

### Dependabot Alerts

When a known security vulnerability (CVE - Common Vulnerability and Exposure) is discovered in a package your project depends on, GitHub creates a **Dependabot alert**.

#### Alert severity levels

| Level | CVSS Score Range | What it means |
| -------  | -----------------  | ---------------  |
| **Critical** | 9.0-10.0 | Exploit likely, wide impact - fix immediately |
| **High** | 7.0-8.9 | Significant risk - fix this sprint |
| **Medium** | 4.0-6.9 | Some risk with specific conditions - schedule fix |
| **Low** | 0.1-3.9 | Low likelihood of exploitation - fix when convenient |

#### What a dependency alert looks like

```text
Alert: Dependabot alert #5
Severity: High
Package: lodash (npm)
Vulnerable version: < 4.17.21
Fixed version: 4.17.21
Advisory: GHSA-35jh-r3h4-6jhm
Description: Prototype pollution vulnerability allows an attacker to
modify Object.prototype leading to denial of service or remote code execution.
```

#### What to do as a contributor when you see an alert

1. Read the advisory to understand the vulnerability scope
2. Check whether the project actually uses the vulnerable code path
3. The fix is almost always: update the dependency to the fixed version
4. Dependabot Security Updates may have already opened a PR - check the PRs tab

### Dependabot Security Updates

If enabled, Dependabot automatically opens a PR to update the vulnerable dependency. The PR will look like:

```text
Title: Bump lodash from 4.17.20 to 4.17.21
Author: dependabot[bot]
Description: Bumps lodash from 4.17.20 to 4.17.21.
  - Release notes
  - Changelog
  - Commits (linked)
```

As a contributor with access, reviewing and merging these Dependabot PRs is a high-value, low-risk way to contribute.

### Dependabot Version Updates

Beyond security fixes, Dependabot can be configured to open PRs keeping all dependencies at their latest versions (not just security fixes). This is configured in `.github/dependabot.yml`.

#### Example `dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```


## 3. Secret Scanning - Preventing Credential Leaks

Secret scanning detects if you accidentally commit tokens, API keys, passwords, or other credentials to a repository.

### Push Protection (Real-Time Prevention)

**Push Protection** intercepts a `git push` before it reaches GitHub and blocks it if it detects a known secret pattern.

If your push is blocked:

```text
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: Push cannot contain secrets
remote: 
remote: - commit: abc123 in file: config.js
remote:   secret: GitHub Personal Access Token
remote:   location: line 5
```

#### What to do

1. Remove the secret from the file immediately
2. Rotate the exposed credential (GitHub will automatically revoke detected GitHub tokens)
3. If it was a false positive, you can bypass with justification - but investigate first

**Best practice:** Use environment variables for secrets, never hardcode them. Example:

```javascript
// BAD - never do this
const token = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// GOOD
const token = process.env.GITHUB_TOKEN;
```

### Secret Scanning Alerts

For public repositories, GitHub scans all existing commits and creates alerts for any detected secrets. These appear in Security → Secret scanning.

**Priority action:** If you find a secret scanning alert in a project you contribute to - especially a token or API key - treat it as urgent. The credential may have been exposed for a long time.

### Learning Cards: Secret Scanning

<details>
<summary>Screen reader users</summary>

- If your `git push` is blocked with "GH013: Repository rule violations found," the terminal output lists the exact file, line number, and secret type — read the error lines carefully
- After removing the secret from your code, use environment variables instead (`process.env.GITHUB_TOKEN`) — your screen reader will confirm the variable name in the code
- Secret scanning alerts appear under Security tab, Secret scanning — navigate with T to reach the alert table, then arrow keys to read each row

</details>

<details>
<summary>Low vision users</summary>

- Push Protection error messages appear in your terminal with red text — increase terminal font size to read the file path, line number, and secret type clearly
- The secret scanning alert list in the Security tab uses a table layout — zoom in to read the Secret type and Location columns
- Environment variable names in code (like `process.env.GITHUB_TOKEN`) are easier to spot when syntax highlighting is enabled in your editor theme

</details>

<details>
<summary>Sighted users</summary>

- Push Protection errors show a red banner in your terminal with the exact commit, file, and line containing the secret — look for the "secret:" label
- In the Security tab, secret scanning alerts are listed with a yellow or red severity icon — click any alert to see the exposed credential's location and revocation status
- The code examples in this section show the BAD vs. GOOD pattern — never hardcode tokens; always use environment variables as shown

</details>


## 4. Code Scanning and CodeQL

Code scanning uses static analysis to find security vulnerabilities in the code itself (not dependencies). GitHub's built-in tool is **CodeQL**, which understands the code's logic and can detect:

- SQL injection risks
- Cross-site scripting (XSS) vulnerabilities
- Path traversal issues
- Insecure cryptography usage
- Authentication bypasses
- Command injection risks

### Reading a Code Scanning Alert

```text
Alert: Uncontrolled format string
Rule: py/tainted-format-string
Severity: High
File: src/utils/logger.py
Line: 47

Details:
  logging.info(user_input)  ← user_input flows unsanitized into format string

  Flow:
  1. User input enters at: request.args.get('message') [line 12]
  2. Passed to: logger.info(message) [line 47]
  3. Risk: format string injection if message contains %s, %d patterns
```

**As a contributor:** Code scanning alerts are excellent, well-scoped contribution opportunities. Each alert shows you the exact file, line, and the data flow causing the issue. Fixing it is often a one-line change.

### Where to Find Code Scanning Alerts

Security tab → Code scanning → filter by severity, rule, or file.


## 5. Private Vulnerability Reporting

When you discover a security vulnerability in a project, **never report it as a public issue**. A public issue immediately broadcasts the vulnerability to anyone who could exploit it.

GitHub provides **Private Vulnerability Reporting** - a disclosure form that sends your report only to the repository's security team, not to the public.

### How to Submit a Private Report

1. Navigate to the repository's **Security tab**
2. Select **"Report a vulnerability"** (this button only appears if the maintainer has enabled private reporting)
3. Fill in the form:
   - **Title:** Short description of the vulnerability
   - **Description:** Detailed explanation, how to reproduce it, and impact
   - **Severity:** Your assessment
   - **Affected versions:** Which versions are vulnerable
   - **CVSS score:** Optional - the Common Vulnerability Scoring System rating
4. Submit - only the maintainers see your report

### The Responsible Disclosure Process

After you submit:

1. Maintainers acknowledge your report (typically within 1-7 days for active projects)
2. They may ask follow-up questions in the private advisory thread
3. They develop and test a fix
4. They request a CVE (Common Vulnerability and Exposure) number from GitHub
5. They publish a new release with the fix
6. They publish a public security advisory - you may be credited as the reporter
7. The CVE is published publicly (usually 90 days after report or after the fix is released)

### What If the Maintainer Doesn't Respond?

If a maintainer doesn't respond within a reasonable time (30-90 days is the standard window):

1. Send a follow-up in the private advisory thread
2. Contact GitHub directly if the issue is critical (GitHub can assist with coordinated disclosure)
3. Follow the project's SECURITY.md for their stated disclosure policy


## 6. The SECURITY.md File

A `SECURITY.md` file at the repository root defines the project's security policy. It typically contains:

- **Supported versions:** Which versions receive security patches
- **Reporting instructions:** How to report a vulnerability (email, private advisory form, etc.)
- **Response timeline:** How quickly maintainers aim to respond
- **Disclosure policy:** When the project will publish a fix publicly

**accessibility-agents's security policy:** `community-access/accessibility-agents` has a `SECURITY.md` that points to GitHub's private advisory form. If you find a security issue in accessibility-agents - even a potential one - use the private advisory form rather than opening a public issue.

### Navigating to a Repository's SECURITY.md

From the repository:

1. Security tab → Policies section → "Security policy" link
2. Or directly: `https://github.com/owner/repo/security/policy`

Screen reader path:

```text
Security tab → H → "Policy" heading → Link: "Security policy" → Enter
```


## 7. Software Bill of Materials (SBOM)

An SBOM is a machine-readable inventory of every component (libraries, packages, dependencies) in a software project. It is increasingly required by enterprise and government organizations for supply chain security compliance.

### Exporting an SBOM from GitHub

1. Navigate to the repository's **Insights tab**
2. Select **"Dependency graph"**
3. Select **"Export SBOM"** button (top right of the Dependency graph page)
4. GitHub generates a SPDX-format JSON file listing all dependencies with their versions and licenses

This export is useful when:

- Your organization requires SBOM documentation before adopting an open source dependency
- You're auditing a project's complete dependency chain
- You want to identify license compatibility for a commercial product


## 8. Screen Reader Navigation of the Security Tab

### Reaching the Security Tab

```text
From any repo page:
Secondary navigation landmark → Tab through: Code, Issues, PRs, Actions, Projects, Wiki, Security
Or: Focus Mode → G then S (GitHub shortcut)
```

### Navigating Dependabot Alerts

```text
Security tab → select "Dependabot alerts" link
Alert list is a table: T (NVDA/JAWS Browse Mode) → navigate rows
Each row: Tab to expand → Enter to open full alert details
Inside an alert:
  H → navigate: Alert title, Package details, Description, References headings
  2 → jump between major sections
  Links → navigate to the GHSA advisory, the vulnerable package, the Dependabot PR
```

### Navigating Code Scanning Alerts

```text
Security tab → select "Code scanning" link
Alert list: T to find the table → ↑/↓ to navigate rows
Open an alert: Enter
Inside the alert:
  H → Alert title, Description, Code flow, Steps headings
  Links → navigate to the specific file and line
  The code flow section shows the path from source to sink:
  Navigate with ↓ through the flow steps
```

### The Private Vulnerability Reporting Form

```text
Security tab → "Report a vulnerability" button → Enter
Form fields: F or E → cycle through: Title, Description, Severity (select), Versions, CVSS
Describe field: NVDA+Space → Focus Mode → type → NVDA+Space to leave
Submit: Tab → "Submit report" button → Enter
```


## 9. Security and Accessibility Agents

Accessibility Agents' `/security-dashboard` slash command gives you a quick security overview without visiting the Security tab in the browser:

```text
/security-dashboard
```

### Sample output

```text
## Security Dashboard - community-access/accessibility-agents

### Dependabot Alerts
- 0 Critical
- 1 High: actions/cache < 3.3.2 (fixed: 3.3.3)
- 2 Medium: misc dependency updates available

### Secret Scanning
- No active alerts

### Code Scanning
- Last scan: 2 days ago - 0 new alerts

### Dependabot PRs Open
- #47: Bump actions/cache from 3.3.1 to 3.3.3
  "Review and merge to resolve the High severity alert"

### Recommendation
Action needed: Review PR #47 (5 minutes - single file change)
```

---

*Next: [Appendix Q: GitHub Actions](appendix-q-actions-workflows.md)*  
*Back: [Appendix O: Branch Protection](appendix-o-branch-protection.md)*  
*Teaching chapter: [Chapter 08: Open Source Culture](08-open-source-culture.md)*

