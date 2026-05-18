# Appendix AA: Agent Installation & Setup Across All Platforms

> **Reference companion to:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) | [Appendix L: Agents Reference](appendix-l-agents-reference.md)
>
> **Authoritative source:** [Accessibility Agents Repository](https://github.com/Community-Access/accessibility-agents) | [System Requirements](https://github.com/Community-Access/accessibility-agents#system-requirements)

## Installation, Configuration, and Troubleshooting for All Five Platforms

> This appendix covers the step-by-step installation process for Accessibility Agents on GitHub Copilot (VS Code), Claude Code, Gemini CLI, Claude Desktop, and Codex CLI, plus system requirements, version checking, and troubleshooting for each platform.

## Table of Contents

1. [System Requirements](#1-system-requirements)
2. [Version Checking Commands](#2-version-checking-commands)
3. [Platform-Specific Installation](#3-platform-specific-installation)
4. [Post-Installation Verification](#4-post-installation-verification)
5. [Troubleshooting Compatibility Issues](#5-troubleshooting-compatibility-issues)
6. [Keeping Tools Updated](#6-keeping-tools-updated)

## 1. System Requirements

### Critical: Tool Currency

Accessibility Agents requires the **latest versions** of all tools. Older versions miss accessibility features, API capabilities, and bug fixes that agents depend on.

**Version baseline (May 2026):**

- VS Code: 1.113 or later (stable or Insiders)
- GitHub Copilot: Latest from VS Code Marketplace
- Node.js: v18.0.0 or higher
- Python: 3.8+
- Operating Systems: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)

### Operating System Requirements

| OS | Minimum Version | Supported Architectures | Notes |
|----|-----------------|------------------------|-------|
| **Windows** | Windows 10 Build 1909+ | x64, Arm64 (preview) | PowerShell 5.1+ required for command-line tools |
| **macOS** | 10.15 (Catalina) | Intel, Apple Silicon (M1/M2+) | Requires command-line tools (run `xcode-select --install`) |
| **Linux** | Ubuntu 20.04 LTS+ | x64 (primary), ARM64 | Debian, Fedora, RHEL derivatives supported |

### Per-Platform System Requirements

| Platform | Min RAM | Disk Space | Network | Notes |
|----------|---------|------------|---------|-------|
| **GitHub Copilot (VS Code)** | 4 GB | 2 GB available | Required | Inline suggestions, chat, Accessible View |
| **Claude Code** | 4 GB | 1 GB available | Required | Direct code generation and editing |
| **Gemini CLI** | 2 GB | 500 MB available | Required | Fast iteration, Google Search integration |
| **Claude Desktop** | 4 GB | 1 GB available | Required | Extended context windows, longer sessions |
| **Codex CLI** | 2 GB | 500 MB available | Optional for local mode | Experimental roles and TOML configuration |

### Required Tools by Platform

#### GitHub Copilot (VS Code)

```plaintext
VS Code 1.113+
  - GitHub Copilot extension (latest)
  - GitHub Copilot Chat extension (latest)
Node.js 18.0.0+ (for Playwright, axe-core, other tools)
Git 2.20+ (for repository operations)
```

#### Claude Code

```plaintext
Claude Code CLI (latest)
  - Installation: https://docs.anthropic.com/en/docs/claude-code
Claude subscription (Pro, Max, or Team)
```

#### Gemini CLI

```plaintext
Gemini CLI (latest)
  - Installation: https://github.com/google-gemini/gemini-cli
Google AI Studio API Key (free: https://ai.google.dev/)
```

#### Claude Desktop

```plaintext
Claude Desktop (latest)
  - Download: https://claude.ai/download
Claude subscription (Pro, Max, or Team)
MCP server configuration (`.mcp.json`)
```

#### Codex CLI

```plaintext
Codex CLI (latest)
  - Installation: npm install -g @codex-cli/core
Node.js 18.0.0+ required for npm
```

## 2. Version Checking Commands

Use these commands to verify your installed versions before starting.

### GitHub Copilot (VS Code)

```bash
# Check VS Code version
code --version

# Verify GitHub Copilot extension is installed
code --list-extensions | grep -i copilot

# Check Node.js (used by Copilot and accessibility tools)
node --version
npm --version

# Verify Git
git --version
```

Expected output:

```
1.113.0 or higher (VS Code)
github.copilot
v18.0.0 or higher (Node.js)
v2.20.0 or higher (Git)
```

### Claude Code

```bash
# Check Claude Code CLI version
claude code --version

# Verify you have an active subscription
claude code whoami

# Check Node.js
node --version
```

### Gemini CLI

```bash
# Check Gemini CLI version
gemini --version

# Verify API key is configured
gemini config show

# Check Node.js
node --version
```

### Claude Desktop

Check inside the application: **Settings → About** to see the current version.

### Codex CLI

```bash
# Check Codex CLI version
codex --version

# Check Node.js
node --version
npm --version
```

## 3. Platform-Specific Installation

### GitHub Copilot (VS Code) - Recommended for Most Workshops

**Step 1: Install VS Code**

1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Run installer
3. Open VS Code and verify it starts

**Step 2: Install GitHub Copilot Extensions**

1. Open Extensions panel: `Ctrl+Shift+X` (or **View → Extensions**)
2. Search for "GitHub Copilot"
3. Install both:
   - GitHub Copilot (by GitHub)
   - GitHub Copilot Chat (by GitHub)
4. Sign in with your GitHub account when prompted

**Step 3: Install Node.js (for accessibility tools)**

1. Download from [nodejs.org](https://nodejs.org) (v18 LTS or later)
2. Run installer
3. Verify: `node --version` and `npm --version`

**Step 4: Clone Accessibility Agents Repository**

```bash
cd /path/to/projects
git clone https://github.com/Community-Access/accessibility-agents.git
cd accessibility-agents
```

**Step 5: Open in VS Code**

```bash
code .
```

**Step 6: Verify Agents Load**

1. Open Copilot Chat: `Ctrl+Alt+I`
2. Type `@` and look for agent autocomplete suggestions
3. Verify `.github/agents/` folder exists in the repository

**Step 7: (Optional) Install Global Tools**

```bash
# For accessibility scanning
npm install -g @axe-core/cli pa11y

# For Playwright testing
npm install -g playwright
```

### Claude Code

**Step 1: Install Claude Code CLI**

```bash
npm install -g @anthropic-ai/claude-code
```

**Step 2: Authenticate**

```bash
claude code auth
# Follow the browser login flow
```

**Step 3: Clone Repository**

```bash
cd /path/to/projects
git clone https://github.com/Community-Access/accessibility-agents.git
cd accessibility-agents
```

**Step 4: Run an Agent**

```bash
claude code @daily-briefing morning briefing
```

### Gemini CLI

**Step 1: Install Gemini CLI**

```bash
npm install -g @google/gemini-cli
```

**Step 2: Set Up API Key**

1. Get API key from [ai.google.dev](https://ai.google.dev/)
2. Set environment variable:

   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

**Step 3: Test Connection**

```bash
gemini --version
gemini whoami
```

**Step 4: Use with Accessibility Agents**

```bash
gemini skill search accessibility-agents
gemini skill use community-access/accessibility-agents
```

### Claude Desktop

**Step 1: Download and Install**

1. Download from [claude.ai](https://claude.ai/download)
2. Install application
3. Open Claude Desktop

**Step 2: Configure MCP Server**

1. Create or edit `.mcp.json` in your home folder (macOS/Linux: `~/.mcp.json`, Windows: `%USERPROFILE%\.mcp.json`)
2. Add the Accessibility Agents MCP server:

   ```json
   {
     "mcpServers": {
       "accessibility-agents": {
         "command": "node",
         "args": ["/path/to/accessibility-agents/mcp-server/index.js"],
         "env": {
           "PORT": "3000"
         }
       }
     }
   }
   ```

**Step 3: Restart Claude Desktop**

1. Quit Claude Desktop completely
2. Reopen Claude Desktop
3. Verify MCP server connects (check logs)

### Codex CLI

**Step 1: Install Codex CLI**

```bash
npm install -g @codex-cli/core
```

**Step 2: Initialize Configuration**

```bash
codex init
# Answer interactive setup questions
```

**Step 3: Test Installation**

```bash
codex --version
codex role list
```

**Step 4: Use Accessibility Agents**

```bash
codex role search accessibility
codex run @accessibility-lead
```

## 4. Post-Installation Verification

### Verification Checklist

After installation, verify each platform is ready:

| Check | Command/Action | Expected Result |
|-------|----------------|-----------------|
| **Tools installed** | `node --version`, `git --version` | v18+, v2.20+ |
| **Repository cloned** | `ls -la accessibility-agents` | `.github/agents/` folder exists |
| **Agents discoverable** | Type `@` in chat/CLI | Autocomplete shows agent names |
| **Network access** | Ping GitHub | No firewall blocks |
| **API keys valid** (Claude/Gemini) | `claude code whoami` / `gemini whoami` | Authenticated successfully |

### Quick Test: Run One Agent

**On GitHub Copilot (VS Code):**

```
Open Chat (Ctrl+Alt+I) → Type: @daily-briefing morning briefing
```

**On Claude Code:**

```bash
claude code @daily-briefing morning briefing
```

**On Gemini CLI:**

```bash
gemini @daily-briefing morning briefing
```

**On Claude Desktop:**
In chat input, type: `@daily-briefing morning briefing`

**On Codex CLI:**

```bash
codex run @daily-briefing morning briefing
```

If the agent responds with information, installation is successful.

## 5. Troubleshooting Compatibility Issues

### GitHub Copilot (VS Code)

| Issue | Cause | Solution |
|-------|-------|----------|
| Agents not appearing after `@` | Extensions not installed or outdated | Reinstall GitHub Copilot and GitHub Copilot Chat from VS Code Marketplace |
| "Cannot find agents" error | `.github/agents/` folder missing | Clone the full `accessibility-agents` repository; do not copy files manually |
| Chat not working | Copilot not signed in | Click Copilot Chat panel → "Sign in with GitHub" |
| VS Code 1.113+ required notice | Running older VS Code | Update: Help → Check for Updates (or auto-install in settings) |
| Slow responses | Network latency or token limit | Check internet connection; restart VS Code; check OpenAI quota |

**Reset Copilot (if stuck):**

```bash
# Delete VS Code cache
rm -rf ~/.config/Code/Cache  # macOS/Linux
rmdir /s %APPDATA%\Code\Cache  # Windows PowerShell

# Restart VS Code
```

### Claude Code

| Issue | Cause | Solution |
|-------|-------|----------|
| "Not authenticated" error | API key expired or invalid | Run `claude code auth` and re-login |
| Agent not found | CLI version mismatch | Update: `npm update -g @anthropic-ai/claude-code` |
| Slow generation | Large context or complex task | Break task into smaller steps; try simpler prompt |

### Gemini CLI

| Issue | Cause | Solution |
|-------|-------|----------|
| API key error | `GEMINI_API_KEY` not set | `export GEMINI_API_KEY="your-key"` (on Linux/macOS) or set in Windows env vars |
| "Rate limit exceeded" | Too many requests | Wait 60 seconds; Gemini CLI has a 15 requests/minute limit |
| Model not found | Old CLI version | Update: `npm update -g @google/gemini-cli` |

### Claude Desktop

| Issue | Cause | Solution |
|-------|-------|----------|
| MCP server not connecting | `.mcp.json` syntax error or wrong path | Validate JSON syntax; verify file path; check server logs |
| "Port already in use" | Another process on port 3000 | Change port in `.mcp.json` to 3001 or find/kill process on 3000 |
| Subscription required | Free Claude account | Upgrade to Claude Pro or Team subscription |

### Codex CLI

| Issue | Cause | Solution |
|-------|-------|----------|
| Role not found | Accessibility Agents not installed as role | Run `codex init` and add the agents GitHub URL during setup |
| TOML config syntax error | Invalid TOML file | Validate with online TOML validator; check indentation |

### Universal Troubleshooting

1. **Verify internet connection:**

   ```bash
   ping github.com
   ```

2. **Check firewall/proxy:**
   - Ensure ports 443 (HTTPS), 3000 (MCP) are not blocked
   - If behind proxy, configure Git: `git config --global http.proxy [proxy-url]`

3. **Clear caches and restart:**
   - VS Code: Reload Window (`Ctrl+Shift+P` → "Reload Window")
   - CLI tools: Reinstall latest version

4. **Check subscription/quota:**
   - GitHub Copilot: Requires active subscription (Free, Pro, or Team)
   - Claude Code: Requires Claude Pro/Team/Enterprise
   - Gemini: Free tier available but with rate limits

5. **Review logs:**
   - VS Code: Help → Toggle Developer Tools → Console tab
   - Claude Desktop: Application menu → View Logs
   - CLI: Add `--debug` flag to commands

## 6. Keeping Tools Updated

### Why Updates Matter

- **New accessibility features** in platforms enable better agent behavior
- **Bug fixes** prevent silent failures and context loss
- **API improvements** improve performance and reliability
- **Security patches** protect your data and credentials

### Update Schedules by Platform

| Platform | Release Cycle | Check Method |
|----------|---------------|--------------|
| **VS Code** | Monthly (stable), weekly (Insiders) | Help → Check for Updates |
| **GitHub Copilot** | Monthly | VS Code Extensions view → GitHub Copilot → Update |
| **Node.js** | Quarterly (LTS) | `npm outdated -g` |
| **Claude Code** | As needed | `npm outdated -g @anthropic-ai/claude-code` |
| **Gemini CLI** | As needed | `npm outdated -g @google/gemini-cli` |
| **Claude Desktop** | Monthly | Application menu → Check for Updates |

### Update Commands

**GitHub Copilot (VS Code):**

```bash
# Update VS Code
code --update

# Update extensions
# Use VS Code UI: Extensions → click update on GitHub Copilot extensions
```

**All npm-based tools (one command):**

```bash
npm update -g
```

**Individual tool updates:**

```bash
npm update -g @anthropic-ai/claude-code
npm update -g @google/gemini-cli
npm update -g @codex-cli/core
```

**Verify current versions after update:**

```bash
code --version
node --version
claude code --version
gemini --version
```

### Update Best Practices

1. **Update before starting a new project:** Ensure latest fixes and features are available
2. **Keep Node.js current:** Many CLI tools depend on Node.js features
3. **Check compatibility notes:** Major version updates may introduce breaking changes
4. **Test in a branch:** After updating, test one agent before relying on it
5. **Subscribe to release notes:** Watch [Accessibility Agents releases](https://github.com/Community-Access/accessibility-agents/releases) for new features and requirements

## Learning Cards: Installation & Setup

<details>
<summary>Screen reader users</summary>

- Installation steps are presented in sequence; follow them in order and do not skip any step
- After installation, the quick verification test (running `@daily-briefing`) confirms setup is working -- if it produces a response, you are ready to proceed
- Each platform has its own section; use headings (`H` key in browse mode) to jump to the section for your chosen platform
- Troubleshooting tables are organized by platform; navigate to your platform's row for solutions

</details>

<details>
<summary>Low vision users</summary>

- The system requirements table can be magnified independently; zoom in on the "Minimum Version" and "Notes" columns if you need specific details
- Installation commands are in code blocks with clear context; copy the command that matches your platform
- After each installation step, there is a verification check (run `node --version`, etc.) -- write down the output so you can confirm success
- The troubleshooting section is organized as a decision tree by platform; skip to your platform's section

</details>

<details>
<summary>Sighted users</summary>

- Skim the System Requirements section to choose your target platform
- Follow the numbered steps in the Platform-Specific Installation section for your platform
- Run the verification commands after each step to confirm success before moving to the next step
- If something does not work, jump to Troubleshooting and find your issue in the table for your platform

</details>

### References

- [Accessibility Agents Repository](https://github.com/Community-Access/accessibility-agents)
- [VS Code Installation Guide](https://code.visualstudio.com/docs/setup/setup-overview)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli)
- [Node.js Installation](https://nodejs.org/)

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [About auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)
- [Copilot changelog feed](https://github.blog/changelog/label/copilot/)
- [VS Code Copilot chat overview](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [VS Code agent overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Installation, Configuration, and Troubleshooting for All Five Platforms:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. System Requirements:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Version Checking Commands:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Platform-Specific Installation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. Post-Installation Verification:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Troubleshooting Compatibility Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Keeping Tools Updated:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Learning Cards: Installation & Setup:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
