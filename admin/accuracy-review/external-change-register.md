# External Change Register

Last reviewed: May 12, 2026

This register records official external changes that may affect the workshop. Each item needs mapping to local scenarios and content before remediation.

## Change Register

The following table lists source-backed external changes and their documentation impact.

| ID | Date | Source | Change | Documentation impact | Initial severity |
| --- | --- | --- | --- | --- | --- |
| EXT-001 | 2026-04-27 | [GitHub Copilot usage-based billing announcement](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) | Copilot plans transition to usage-based billing on June 1, 2026 using GitHub AI Credits instead of premium request units | Update pricing, plan, limit, and usage-cost explanations. Add current-source links and last-verified language wherever Copilot cost is discussed | P0 |
| EXT-002 | 2026-04-27 | [GitHub Copilot usage-based billing announcement](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) | Copilot code review will consume GitHub Actions minutes in addition to GitHub AI Credits | Update code-review and admin guidance that presents Copilot review as cost-free or only request-based | P0 |
| EXT-003 | 2026-05-12 | [Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) | AI Credits are consumed by model token usage. Chat, CLI, cloud agent, Spaces, Spark, and third-party coding agents consume credits. Code completions and next edit suggestions are not billed in AI credits for paid plans | Split guidance between completion-style features and agentic/chat features. Avoid blanket claims that Copilot usage is unlimited | P0 |
| EXT-004 | 2026-05-12 | [GitHub Copilot plans](https://github.com/features/copilot/plans) | Copilot Free includes limited chat or agent-mode requests and completions. Pro and Pro+ plan pages show temporary upgrade pause messaging during billing rollout | Update setup and prerequisite docs that discuss Copilot availability, plan choice, student access, or expected enrollment path | P0 |
| EXT-005 | 2026-05-07 to 2026-05-08 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Multiple Copilot models are deprecated or scheduled for deprecation, including Claude Sonnet 4, GPT-4.1, Grok Code Fast 1, and GPT-5.2 variants | Replace static model recommendations and model-availability tables with source-linked, last-verified language | P1 |
| EXT-006 | 2026-04-24 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | GPT-5.5 became generally available for GitHub Copilot | Review current model guidance for outdated examples and add a volatility note | P1 |
| EXT-007 | 2026-04-22 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Bring your own language model key in VS Code became available | Update advanced Copilot and VS Code setup guidance if it assumes only GitHub-provided models | P1 |
| EXT-008 | 2026-04-01 to 2026-05-08 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Copilot cloud agent expanded across GitHub.com, mobile, custom properties, runner controls, firewall settings, secrets, variables, sessions, and issue/project management | Review agentic workflow descriptions, cloud-agent activation steps, admin policies, and GitHub Mobile guidance | P1 |
| EXT-009 | 2026-04-17 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Copilot CLI supports auto model selection | Update CLI examples that assume fixed model selection or do not mention resolved model behavior | P1 |
| EXT-010 | 2026-04-16 | [GitHub Changelog for Copilot](https://github.blog/changelog/2026/?label=copilot) | Agent skills can be managed with GitHub CLI | Review agent and skills appendix language for current management paths | P2 |
| EXT-011 | 2026-05-06 | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) | Integrated browser tabs can be explicitly shared with agents, and agents can request access to unshared tabs | Update VS Code web and agent walkthroughs to include explicit browser sharing and privacy prompts | P0 |
| EXT-012 | 2026-05-06 | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) | Copilot CLI and Claude agent responses now show model details and multipliers in Chat | Update model-cost and model-picker explanations. Add expectation that model badges may appear in current UI | P1 |
| EXT-013 | 2026-05-06 | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) | VS Code 1.119 prepared chat status dashboard, input notifications, and model picker for billing and credit information | Add watchlist item for post-June UI validation. Avoid screenshots or steps that assume pre-credit UI | P1 |
| EXT-014 | 2026-05-06 | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) | Agent sandbox setting supports `allowNetwork`; temp-folder writes are less interruptive after Allow All Commands in Session | Update trust, security, and terminal-approval walkthroughs that describe expected prompts | P1 |
| EXT-015 | 2026-05-06 | [VS Code 1.119 release notes](https://code.visualstudio.com/updates/v1_119) | Markdown source and preview views now have more discoverable switch commands and buttons | Review Markdown editing walkthroughs and accessibility instructions that mention preview access | P2 |
| EXT-016 | 2026-04-29 | [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | VS Code Agents preview in Insiders added shared state, web client, background browsers, and layout controls | Mark any VS Code Agents guidance as Insiders-only preview and validate exact entry points | P1 |
| EXT-017 | 2026-04-29 | [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | Copilot CLI remote control can monitor and steer sessions from GitHub.com or GitHub Mobile when enabled | Update advanced CLI guidance and mobile references if remote-control scenarios are included | P2 |
| EXT-018 | 2026-04-29 | [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | VS Code adds Copilot as a Git co-author by default for chat and agent workflows when Copilot changes files | Update Git commit, authorship, privacy, and review guidance for AI-assisted commits | P1 |
| EXT-019 | 2026-04-29 | [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | Semantic indexing expanded to all workspaces, GitHub text search across repos/orgs was added, and workspace `.mcp.json` server declarations are supported | Review Copilot context and MCP documentation for current capabilities and default behavior | P2 |
| EXT-020 | 2026-04-29 | [VS Code 1.118 release notes](https://code.visualstudio.com/updates/v1_118) | Terminal question carousel now exposes Alt+T to return focus to terminal and includes the keybinding in the aria label | Update screen-reader and terminal-interaction guidance for Copilot question prompts | P1 |
| EXT-021 | 2026-05-07 | [GitHub Changelog](https://github.blog/changelog/) | Repository rulesets added user bypass and branch renaming improvements | Review branch protection and rulesets appendix for current bypass and rename behavior | P1 |
| EXT-022 | 2026-05-08 | [GitHub Changelog](https://github.blog/changelog/) | Users can disable commit comments on the user level | Review commenting etiquette and commit-comment walkthroughs if they assume comments are always enabled | P2 |
| EXT-023 | 2026-05-11 | [GitHub Changelog](https://github.blog/changelog/) | GitHub Mobile can create repositories on the go | Review mobile appendix for current create-repository support | P2 |
| EXT-024 | 2026-05-12 | [GitHub Changelog](https://github.blog/changelog/) | Synchronous SBOM API is deprecated | Review security appendix or API references if SBOM API usage appears in future scans | P2 |
| EXT-025 | 2026-05-12 | [Visual Studio Code FAQ](https://code.visualstudio.com/docs/supporting/faq) | Copilot Chat extension has been open sourced, but Copilot subscriptions and backend services remain required and closed source | Update any statements that imply Copilot became fully free or fully open source | P1 |

## Research Gaps To Close During Validation

The following table lists product areas that require live walkthrough checks because release notes alone do not verify exact UI labels for every account.

| Gap ID | Area | Why live validation is required |
| --- | --- | --- |
| GAP-001 | GitHub Issues and Pull Requests | Button labels, tabs, feature rollouts, and review affordances vary by repository state and account rollout |
| GAP-002 | GitHub Classroom | Admin pages, roster flows, assignment creation, and autograding setup are account-contextual |
| GAP-003 | VS Code GitHub Pull Requests and Issues extension | View labels and plus-button behavior may differ by extension version and account permissions |
| GAP-004 | Copilot plan screens | Billing migration banners and upgrade pauses are time-sensitive and may change before June 1, 2026 |
| GAP-005 | VS Code agent browser sharing | Integrated browser sharing prompts require a live VS Code 1.119 or later environment |

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub Discussions docs](https://docs.github.com/en/discussions)
- [GitHub Gists docs](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Change Register:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Discussions docs](https://docs.github.com/en/discussions), [GitHub Gists docs](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists)
- **Research Gaps To Close During Validation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Discussions docs](https://docs.github.com/en/discussions), [GitHub Gists docs](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists), [GitHub code search syntax](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax)
