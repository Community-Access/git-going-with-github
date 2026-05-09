# Security Policy

## Supported Versions

This repository contains **educational curriculum and documentation only** - no production software, application servers, or APIs. There are no versioned software releases to patch.


**Table: Supported content types and their source**

| Content | Supported |
|---------|-----------|
| Curriculum documentation (docs/) | Current main branch |
| GitHub Actions workflows (.github/workflows/) | Current main branch |
| Build scripts (scripts/) | Current main branch |
| AI agent prompts (.github/prompts/, .github/agents/) | Current main branch |

## Reporting a Vulnerability

**Please do not report security vulnerabilities as public GitHub Issues.** Public issues are visible to everyone, including people who might exploit the vulnerability before it is fixed.

### Preferred Method - Private Vulnerability Reporting

This repository has **Private Vulnerability Reporting** enabled. To submit a report:

1. Navigate to the **Security tab** of this repository
2. Select **"Report a vulnerability"**
3. Fill in the form with:
   - A clear title describing the issue
   - A detailed description of the vulnerability and its potential impact
   - Steps to reproduce (if applicable)
   - Your suggested fix (optional but appreciated)
4. Submit - only the maintainers will see your report

### What to Report

Even though this is an educational repository, the following are genuine security concerns:

- **Malicious content injected into curriculum files** - documentation that contains links to phishing sites, malware downloads, or misleading instructions
- **GitHub Actions workflow vulnerabilities** - script injection risks in `.github/workflows/`, insecure use of `GITHUB_TOKEN`, or pull-request-triggered workflows that execute untrusted code
- **Hardcoded credentials** - any real tokens, passwords, or API keys accidentally committed to any file
- **Supply chain risks** - compromised npm dependencies used by the build system
- **Prompt injection in agent files** - AI agent prompts (`.prompt.md`, `.agent.md`) that could manipulate an LLM to produce harmful output

### What Is Out of Scope

- Theoretical attacks with no realistic exploitation path
- Vulnerabilities in GitHub's own infrastructure (report those to GitHub directly at the [GitHub Security page](https://github.com/security))
- Broken links or outdated documentation (open a regular issue for those)

## Response Timeline

| Milestone | Target |
|-----------|--------|
| Acknowledge receipt | Within 3 business days |
| Initial assessment | Within 7 business days |
| Fix deployed (if confirmed) | Within 30 days for critical/high; 90 days for medium/low |
| Public disclosure | After fix is deployed, or coordinated with reporter |

## Scope and Impact

This curriculum is designed to teach GitHub to workshop participants. The primary security risks are:

1. **Documentation accuracy** - incorrect instructions that could cause participants to configure their systems insecurely
2. **Workflow integrity** - GitHub Actions that run on pull requests from forks require careful scoping to prevent privilege escalation
3. **Dependency security** - the build system uses Node.js packages that must be kept up to date

## Credit

Security researchers who responsibly disclose valid vulnerabilities will be credited in the repository's release notes (unless they prefer to remain anonymous).


*For general questions about the curriculum, open a regular issue. For security concerns, use private reporting above.*
