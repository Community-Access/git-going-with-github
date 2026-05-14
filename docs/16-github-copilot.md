# GitHub Copilot
>
> **Listen to Episode 14:** [GitHub Copilot](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix K: Copilot Reference](appendix-k-copilot-reference.md) | [Appendix G: VS Code Reference](appendix-g-vscode-reference.md)
> **Authoritative sources:** [GitHub Docs: About GitHub Copilot](https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot) | [GitHub Accessibility: Copilot in VS Code](https://accessibility.github.com/documentation/guide/github-copilot-vsc/) | [VS Code Docs: GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) | [GitHub Copilot plans](https://github.com/features/copilot/plans) | [Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)

## AI-Powered Code Assistance in VS Code

> **Day 2, Block 2-3 Material**
>
> This guide covers GitHub Copilot: inline code suggestions, Copilot Chat (conversational assistance), Agent mode, the VS Code 1.120 Agents window, custom instructions vs custom agents, effective prompting for non-code contributions, and using Accessible View to read AI-generated responses.
>
> **Official GitHub Accessibility Guides:** GitHub publishes two developer guides and an NVDA-focused screen reader guide for Copilot:
>
> - [Using GitHub Copilot in Visual Studio Code with a Screen Reader](https://accessibility.github.com/documentation/guide/github-copilot-vsc/) - NVDA-specific setup, audio cues, inline suggestions, inline chat, chat view, and built-in actions
> - [Optimizing GitHub Copilot for Accessibility with Custom Instructions](https://accessibility.github.com/documentation/guide/copilot-instructions/) - writing effective custom instructions at org, repo, and personal levels
> - [Getting Started with GitHub Copilot Custom Agents for Accessibility](https://accessibility.github.com/documentation/guide/getting-started-with-agents/) - creating and invoking custom agents in VS Code and on GitHub.com
>
> This chapter covers the same material with additional perspectives and workshop context. Use the official guides as companion references.
>
> **Prerequisites:** [VS Code Setup & Accessibility Basics](11-vscode-interface.md), [Git & Source Control in VS Code](14-git-in-practice.md)
>
> **Keyboard shortcuts:** Current VS Code docs list `Ctrl+Alt+I` as the default shortcut for the Chat view and `Ctrl+I` for inline chat. Keymaps can vary by OS, browser, profile, and assistive technology setup, so every shortcut in this chapter has a command-palette fallback. If a shortcut does not work, open the Command Palette and run **Chat: Open Chat**, **Inline Chat: Start in Editor**, or **Chat: Open Agents Window**.

## Workshop Recommendation (Chapter 16 / Challenge 13)

> **Access note, verified May 12, 2026:** GitHub Copilot Free is available to individual developers with monthly limits, and verified students may have access to the GitHub Copilot Student plan. Organization or enterprise access depends on your administrator's policy. This workshop is designed to work within limited Copilot access when learners keep prompts short and use Copilot for focused documentation tasks.
>
> **Billing guidance for this workshop:** GitHub Copilot is moving to usage-based billing on June 1, 2026. Chat, CLI, cloud agent, Spaces, Spark, and third-party coding agents consume GitHub AI Credits. Code completions and next edit suggestions are not billed in AI Credits for paid plans. If you are unsure whether your account has Copilot access, check [GitHub Copilot settings](https://github.com/settings/copilot), review the [GitHub Copilot plans page](https://github.com/features/copilot/plans), or ask a facilitator before the workshop begins.

Chapter 16 introduces **GitHub Copilot** for AI-assisted documentation and writing. It supports Challenge 13: AI as Your Copilot.

- **Challenge count:** 3 guided challenges
- **Automation check:** none (tool configuration is account-local and account-specific)
- **Evidence:** issue comment with checklist of completed actions
- **Pattern:** sign in, prompt, apply, reflect

### Challenge 13 Set

1. **Sign in to GitHub Copilot** - authenticate with GitHub and confirm your account has Copilot access.
2. **Ask Copilot to explain a codebase** - clone the sci-fi themes repo and use Copilot Chat to understand it.
3. **Ask Copilot to create something new** - prompt Copilot to generate a custom theme and apply it.

### Challenge 13.1 Step-by-Step: Sign In to Copilot

**Goal:** Sign in to GitHub Copilot and verify it responds to prompts.

**Where you are working:** VS Code desktop with your Learning Room repository open.

**Estimated time:** 3-5 minutes.

> **Current VS Code guidance, verified May 12, 2026:** Recent VS Code builds include built-in AI features and surface Copilot and Chat directly. You normally do not install a separate GitHub Copilot Chat extension on a current VS Code build. Your account still needs Copilot access, and your organization may disable or manage AI features. If Copilot is missing, update VS Code first, then use the Copilot status item or Command Palette to enable AI features and sign in.

1. Update VS Code to the current stable release if possible.
2. In the Status Bar, open the Copilot status item and choose **Use AI Features** or **Set up Copilot** if prompted.
3. Choose your sign-in method and complete the GitHub OAuth flow in your browser.
4. If your Copilot subscription is tied to GitHub Enterprise, choose the GitHub Enterprise sign-in path and provide the enterprise URL when prompted.
5. Verify Copilot is active: open the Chat view with `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette. Type `Hello, are you working?` and press `Enter`. Copilot should respond.

**Screen reader tip:** The Copilot Chat panel opens as a sidebar. Your screen reader announces responses as they stream in. Press `Alt+F2` (Accessible View) to read the full response in a plain text buffer if streaming is hard to follow.

**You are done when:** Copilot Chat responds to a test prompt.

### Challenge 13.2 Step-by-Step: Explain a Codebase

**Goal:** Use Copilot Chat to understand an unfamiliar repository by asking targeted questions.

**Where you are working:** VS Code with the sci-fi themes repository cloned.

**Estimated time:** 10-15 minutes.

1. Open the Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. Run `Git: Clone` and paste: `https://github.com/community-access/vscode-sci-fi-themes.git`
3. Open the cloned repository when VS Code prompts.
4. Open Copilot Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs.
5. Ask Copilot: "What does the `chat.agent.thinking.phrases` setting do in VS Code?"
6. Read the response. Use `Alt+F2` (Accessible View) if needed to read the full text.
7. Ask a follow-up: "How do I apply one of these themes to my settings.json?"
8. Follow Copilot's instructions to apply one theme to your `settings.json` file.

**You are done when:** You have asked Copilot at least two questions and applied one setting change.

### Challenge 13.3 Step-by-Step: Create Something New

**Goal:** Use Copilot as a creative collaborator to generate a custom config and apply it.

**Where you are working:** VS Code with Copilot Chat open.

**Estimated time:** 10-15 minutes.

1. Open Copilot Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs.
2. Type a creative prompt: "Create a custom GitHub Copilot thinking phrases theme for [your favorite universe - Dune, Marvel, Studio Ghibli, Star Trek, etc.]"
3. Read Copilot's generated theme. It should include an array of themed phrases.
4. Copy the generated content: select all text in the Copilot response, then `Ctrl+C` (Mac: `Cmd+C`).
5. Open your `settings.json`: Command Palette, then `Preferences: Open User Settings (JSON)`.
6. Paste the theme configuration into your settings.
7. Save with `Ctrl+S` and reload VS Code: Command Palette, then `Developer: Reload Window`.
8. Test your new theme by asking Copilot a question and watching the thinking phrases.

**Screen reader tip:** Copilot Chat responses can be long. Use `Alt+F2` (Accessible View) to read them in a plain text buffer where you can copy text more easily.

**You are done when:** Your personalized thinking phrases appear when Copilot is processing a response.

### Completing Challenge 13: Submit Your Evidence

Open your **assigned Challenge 13 issue** and post a completion comment:

```text
Chapter 13 completed:
- Copilot enabled and signed in: yes / no
- Asked Copilot to explain a setting: yes / no
- Applied a setting from Copilot's suggestion: yes / no
- Created a custom theme: yes / no
- My theme universe: [your choice]
```

Close your Challenge 13 issue when done.

### Expected Outcomes

- Student can enable built-in Copilot features in current VS Code and authenticate with GitHub.
- Student can ask Copilot effective questions about code and settings.
- Student can use Copilot's output to customize their development environment.
- Student understands Copilot as a tool to explain and create, not just autocomplete.

### If You Get Stuck

1. Copilot controls are missing? Update VS Code first, then reload VS Code: `Ctrl+Shift+P`, then `Developer: Reload Window`.
2. OAuth sign-in fails? Verify your GitHub account is active in the browser first, close VS Code and retry.
3. Chat panel does not open? Try `Ctrl+Alt+I`, then use the Command Palette to run **Chat: Open Chat**. If still nothing, confirm AI features are enabled and you are signed in.
4. Copilot seems unresponsive? Click the model selector at the bottom of Chat panel and confirm you are signed in.
5. Cannot copy from Copilot response? Use `Alt+F2` (Accessible View) to get the text in a copyable buffer.
6. Ask facilitator to verify Copilot is activated and show you one example prompt.
7. Finished but not sure you did it right? Compare your work against the [Challenge 13 reference solution](solutions/solution-13-copilot.md).

> **Continue learning:** The GitHub Skills courses [Getting Started with GitHub Copilot](https://github.com/skills/getting-started-with-github-copilot) and [Customize Your GitHub Copilot Experience](https://github.com/skills/customize-copilot) cover Copilot setup, prompting, and personalization. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Moment

AI assistance amplifies clarity. Using Copilot as a brainstorming partner helps you write documentation that others can actually understand. The prompting skill you practiced here - asking specific questions, iterating on responses, applying results - transfers to every AI tool you will use in your career.

### Learning Pattern Used in This Chapter

1. Enable the built-in tool and verify it works before starting the task.
2. Use the tool to explore and understand (ask questions, read responses).
3. Use the tool to create something new (generate, customize, apply).
4. Reflect on when the tool helped and when your own judgment was better.

### About Learning Cards in This Chapter

Throughout this chapter, look for expandable "learning cards" that show how to accomplish each task from different perspectives. Not every section has every card - only the cards that add meaningful guidance for that topic are included.

| Card | Who it helps |
| ---- | ------------ |
| Visual / mouse | Sighted users who primarily use a mouse or trackpad |
| Low vision | Users who zoom to 200%+, use high contrast, or increase font sizes |
| NVDA / JAWS (Windows) | Screen reader users on Windows |
| VoiceOver (macOS) | Screen reader users on Mac |
| CLI | Users who prefer the terminal with `gh copilot` commands |

## Table of Contents

1. [What is GitHub Copilot](#1-what-is-github-copilot)
2. [Setting Up GitHub Copilot](#2-setting-up-github-copilot)
3. [Inline Suggestions - Ghost Text Completions](#3-inline-suggestions---ghost-text-completions)
4. [GitHub Copilot Chat - Conversational Assistance](#4-github-copilot-chat---conversational-assistance)
5. [Copilot Edits — Making Multi-File Changes](#5-copilot-edits--making-multi-file-changes)
6. [Agent Mode — Let Copilot Drive](#6-agent-mode--let-copilot-drive)
6A. [VS Code 1.120 Agents Window](#6a-vs-code-1120-agents-window)
7. [Next Edit Suggestions](#7-next-edit-suggestions)
8. [Copilot on GitHub.com](#8-copilot-on-githubcom)
9. [Effective Prompting for Documentation Work](#9-effective-prompting-for-documentation-work)
10. [Custom Instructions vs Custom Agents](#10-custom-instructions-vs-custom-agents)
11. [Using Accessible View with Copilot Responses](#11-using-accessible-view-with-copilot-responses)
12. [Keyboard Shortcuts Reference](#12-keyboard-shortcuts-reference)

## 1. What is GitHub Copilot

GitHub Copilot is an AI pair programmer that suggests code and text completions as you type. It can:

- Complete lines of code or documentation
- Generate entire functions or sections of text from comments
- Answer questions about code in your workspace
- Explain complex code in plain language
- Draft documentation, issue responses, and commit messages
- Search for files and symbols across your workspace

**For this workshop:** Copilot helps with Markdown documentation, issue triage, PR descriptions, and commit messages - not just code.

**Copilot as a git co-author:** Starting with VS Code 1.118, GitHub Copilot is automatically added as a co-author in your Git commit messages when Copilot assists with your work. You will see a `Co-authored-by: GitHub Copilot <copilot@github.com>` trailer appended to commits. This is on by default and can be disabled via Settings: search `github.copilot.git.generateCommitMessage` and set `coAuthoredBy` to `off` if you prefer not to include it.

**Copilot Free:** Available to individual developers with monthly limits. It can be enough for this workshop if you use short, focused prompts and avoid long agentic sessions. Organization policies, regional restrictions, or account settings can still affect access.

> **Note on billing changes:** GitHub Copilot usage-based billing starts June 1, 2026. GitHub AI Credits are consumed by model token usage for chat and agentic features. Verify your current access and usage on the [GitHub Copilot settings page](https://github.com/settings/copilot) before the event.

**Screen reader support:** Copilot is fully accessible with screen readers. Suggestions are announced via ARIA live regions, and Accessible View provides complete access to Chat responses.

> **Screen reader optimized mode:** Press `Shift+Alt+F1` (Mac: `Shift+Option+F1`) to toggle VS Code's screen reader optimized mode. This adjusts how Copilot suggestions are announced, disables ghost text that cannot be read by screen readers, and routes all suggestion content through Accessible View. If your screen reader is detected at startup, VS Code enables this mode automatically. You can also set it manually in Settings: `editor.accessibilitySupport: "on"`.

## 2. Setting Up GitHub Copilot

### Current VS Code Setup Steps

Current VS Code builds include built-in AI features. Start with setup and sign-in, not extension installation.

1. Open VS Code desktop and update to the current stable release if prompted.
2. In the Status Bar, activate the Copilot status item.
3. Choose **Use AI Features**, **Set up Copilot**, or **Sign in to use Copilot** when prompted.
4. Complete the GitHub sign-in flow in your browser.
5. Return to VS Code and verify that the Chat view opens.

**Older or managed environments:** If you are on an older pinned VS Code build, or an enterprise-managed image, Copilot may still appear as an extension-managed feature. Ask a facilitator before installing anything manually. Organization policy can also hide or disable AI features.

### Signing In

During setup:

1. VS Code prompts: "Sign in to use GitHub Copilot"
2. Navigate to the notification or click the Copilot icon in the status bar
3. Select "Sign in to GitHub"
4. Your browser opens for GitHub authentication
5. Authorize Copilot access
6. Return to VS Code

#### Verify activation

- Bottom-right status bar shows Copilot icon (looks like `><`)
- Icon should be active (not grayed out)
- If grayed out, click it to sign in

### Checking Subscription Status

#### Command Palette

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "Copilot: Check Status"
3. Select it to see your subscription tier (Free, Pro, Enterprise)

#### Current access notes

- Copilot Free includes limited monthly chat or agent-mode requests and limited completions.
- Paid plans include more usage and broader feature access, but billing is changing to GitHub AI Credits on June 1, 2026.
- Organization and enterprise administrators can manage whether Copilot features are available.

> **Billing note:** GitHub Copilot plan details, model availability, and usage allowances change frequently. Facilitators will provide current guidance at the workshop. To check your access status now, visit [GitHub Copilot settings](https://github.com/settings/copilot).

## 3. Inline Suggestions - Ghost Text Completions

Copilot suggests completions as you type, displayed as gray "ghost text" after your cursor. In screen reader mode, VS Code announces suggestions rather than showing them visually.

### How Inline Suggestions Work

#### While typing

1. Copilot analyzes your context (file content, cursor position, nearby files)
2. Generates a suggestion
3. Presents the suggestion

<details>
<summary>Visual / mouse users</summary>

The suggestion appears as **gray "ghost text"** after your cursor - a preview of what Copilot thinks you want to type next. It's there but not inserted; press `Tab` to accept it or `Escape` to dismiss.

</details>

<details>
<summary>Low vision users (zoom, high contrast, enlarged fonts)</summary>

Ghost text is intentionally low-contrast (gray on white). At high zoom levels this can be nearly invisible.

- **Increase ghost text contrast:** Open Settings (`Ctrl+,`), search `editorGhostText`, then customize `editor.ghostText.foreground` in your color theme to a darker shade such as `#555555`.
- **Use Accessible View instead:** Press `Alt+F2` when a suggestion appears. The suggestion text renders at your configured font size in a separate pane, making it far easier to read at 200%+ zoom.
- **Word-by-word acceptance** (`Ctrl+Right Arrow`) lets you watch each word appear at full contrast before deciding whether to continue.
- **High Contrast themes** do not automatically restyle ghost text. The color customization above is the most reliable fix.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

Suggestions are **announced via ARIA live regions** - ghost text is not visually meaningful to you so VS Code reads it instead:

- **NVDA/JAWS:** "Suggestion available" (or reads the suggestion text, depending on verbosity settings)
- **VoiceOver:** Announces suggestions in accessible form

Press `Alt+F2` (Mac: `Option+F2`) to open the suggestion in **Accessible View** - this gives you the complete suggestion text in a static, fully readable panel without streaming.

</details>

### Accepting Suggestions

| Action | Windows/Linux | Mac |
| --------  | ---------------  | -----  |
| Accept entire suggestion | `Tab` | `Tab` |
| Reject suggestion | `Escape` | `Escape` |
| Accept one word at a time | `Ctrl+Right Arrow` | `Cmd+Right Arrow` |
| Show next alternative suggestion | `Alt+]` | `Option+]` |
| Show previous alternative suggestion | `Alt+[` | `Option+[` |
| Open full suggestion list | `Ctrl+Enter` | `Cmd+Enter` |
| Open suggestion in Accessible View | `Alt+F2` | `Option+F2` |
| Insert suggestion from Accessible View at cursor | `Ctrl+/` | `Cmd+/` |

#### Navigating the full Suggestions Panel (`Ctrl+Enter`)

Pressing `Ctrl+Enter` opens a separate side-by-side tab showing up to 10 alternative suggestions. For screen reader users:

- Switch to your screen reader's **browse/virtual mode** when the panel opens (NVDA: `Insert+Space` to toggle off Application mode; JAWS: this may happen automatically)
- Use **heading keys** (`H` in NVDA/JAWS browse mode) to navigate between each suggestion -- each suggestion is announced as a heading
- Each suggestion is followed by an **Accept** button -- navigate to it with `Tab` or `B` (button key) and press `Enter` to insert it at your cursor position
- Press `Escape` or close the tab to dismiss without accepting

> **Tip:** `Alt+F2` on a single suggestion is usually faster. Use `Ctrl+Enter` when you want to compare multiple alternatives before committing.

#### Accepting word-by-word (`Ctrl+Right Arrow` / Mac: `Cmd+Right Arrow`) is particularly useful when

- The suggestion starts correctly but you want to finish differently
- You want to review the suggestion incrementally
- You're learning and want to see how Copilot structures responses

### Reading Suggestions with Screen Readers

> **Visual users:** If Copilot's ghost text is getting in the way, skip to "Disabling Inline Suggestions" below.

<details>
<summary>Screen reader users - tuning announcement verbosity</summary>

#### If suggestions are announced too frequently or are intrusive

#### NVDA

1. NVDA Menu → Preferences → Settings → Presentation
2. Find "Report dynamic content changes"
3. Reduce verbosity level or set specific delays

#### JAWS

1. Settings Center → HTML/PDF/Accessibility
2. Adjust "Auto Forms Mode" and "ARIA Live Region" settings

#### VoiceOver

1. VoiceOver Utility → Verbosity
2. Reduce "Announcements" level

#### Alternative: Use Accessible View

Press `Alt+F2` (Mac: `Option+F2`) when a suggestion appears to read it in the Accessible View (full text, no streaming).

</details>

### Prompting Through Comments

Copilot reads inline comments as instructions. For Markdown files:

```markdown
<!-- Write a step-by-step guide for screen reader users on how to create a GitHub issue -->
```

Type this comment, press `Enter`, and Copilot drafts content based on your instruction. You review, edit, and refine.

#### Example prompts for this workshop

```markdown
<!-- Explain how to navigate the GitHub Issues list with NVDA -->

<!-- Create a checklist for accessible Markdown documentation -->

<!-- Write alt text for a screenshot showing the GitHub PR review interface -->

<!-- Draft a commit message for fixing heading hierarchy in GUIDE.md -->
```

### Disabling Inline Suggestions

If suggestions are distracting:

<details>
<summary>Visual / mouse users</summary>

#### Temporarily disable for current language

- Click the Copilot icon in the status bar (bottom-right `><` icon)
- Select "Disable Completions for [language]"

#### Permanently disable completions

- Open Settings: `Ctrl+,` (Mac: `Cmd+,`) → search "Copilot enable" → uncheck "Enable Inline Suggestions"

</details>

<details>
<summary>Low vision users</summary>

The Copilot status bar icon (`><`) can be tiny at standard DPI. Use the Command Palette approach instead:

- `Ctrl+Shift+P` → type "Copilot: Toggle Completions" → press `Enter`
- This toggles inline suggestions on/off without needing to find a small icon.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

#### Temporarily disable via Command Palette

- `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → type "Copilot: Disable Completions" → press `Enter`
- Or navigate to the Copilot status bar item and activate it (depends on screen reader and focus)

#### Permanently disable via Settings

- `Ctrl+,` (Mac: `Cmd+,`) → search "inline suggestions" → toggle off "GitHub Copilot: Enable Inline Completions"

</details>

### Learning Cards: Inline Suggestions

<details>
<summary>Screen reader users</summary>

- Press `Alt+]` to trigger an inline suggestion manually; your screen reader announces "Suggestion:" followed by the proposed text
- Press `Tab` to accept the suggestion or `Escape` to dismiss it -- Copilot does not insert anything until you explicitly accept
- Press `Alt+F2` to open Accessible View and read the full suggestion in a clean, navigable pane before deciding

</details>

<details>
<summary>Low vision users</summary>

- Suggestions appear as dimmed gray "ghost text" after your cursor -- increase editor font size with `Ctrl+=` if the gray text is hard to distinguish from your real code
- Switch to a High Contrast theme (`Ctrl+Shift+P` then "Color Theme") to improve the contrast between ghost text and your actual content
- The Status Bar Copilot icon spins while generating a suggestion and stops when one is ready

</details>

<details>
<summary>Sighted users</summary>

- Look for gray text appearing after your cursor as you type -- this is the ghost text suggestion
- Press `Tab` to accept or keep typing to ignore; press `Alt+]` / `Alt+[` to cycle through alternative suggestions
- The Copilot icon in the Status Bar shows a spinning animation while generating and stays still when idle

</details>

## 4. GitHub Copilot Chat - Conversational Assistance

> **See also:** [Appendix K: Copilot Reference](appendix-k-copilot-reference.md) has the complete slash command and chat variable reference.

Copilot Chat is a full conversation interface where you ask questions, request explanations, and have content drafted.

### Opening Copilot Chat

**Primary panel:** `Ctrl+Alt+I` in current VS Code docs. If that shortcut conflicts with your keymap, run **Chat: Open Chat** from the Command Palette.

Opens the Chat panel on the right side of VS Code.

**Inline chat (in-file):** `Ctrl+I` (Mac: `Cmd+I`)

Opens a chat prompt directly in the editor, anchored to your cursor. Results appear inline. Best for file-specific edits.

**Quick Chat (floating):** `Ctrl+Shift+Alt+I` (Windows) / `Cmd+Shift+Ctrl+I` (macOS)

Opens a floating chat dialog that doesn't take up sidebar space.

<details>
<summary>Low vision users (zoom, high contrast, enlarged fonts)</summary>

At 200%+ zoom the Chat sidebar can squeeze the editor to a narrow column.

- **Use Quick Chat** (`Ctrl+Shift+Alt+I`) instead of the panel - it floats over the editor and closes when you press `Escape`, so you keep your full editor width.
- **Resize the Chat panel** by dragging its left edge or pressing `Ctrl+Shift+P` and running `View: Reset Panel Size`.
- **Increase Chat font size:** Settings (`Ctrl+,`), search `chat.editor.fontSize`, and set it to match your editor font size.
- **Mode and model selectors:** At high zoom the bottom toolbar may wrap to two lines. Tab through the controls - the mode dropdown and model picker are always present even if visually cut off.

</details>

<details>
<summary>CLI users (gh copilot)</summary>

If you prefer the terminal, `gh copilot` lets you ask Copilot questions without opening VS Code Chat at all.

**Install the extension (one time):**

```bash
gh extension install github/gh-copilot
```

**Ask a general question:**

```bash
gh copilot suggest "How do I squash the last 3 commits?"
```

Copilot responds with a suggested command you can copy and run.

**Explain a command you don't recognize:**

```bash
gh copilot explain "git rebase -i HEAD~3"
```

Copilot returns a plain-language explanation.

**When to use CLI vs Chat:** Use `gh copilot` when you are already in a terminal session and want a quick answer without switching windows. Use VS Code Chat when you need workspace context (`@workspace`), file references, or multi-turn conversations.

</details>

### Chat Modes

Copilot Chat has multiple modes, selected from a dropdown at the bottom of the Chat input area. Mode availability can change by VS Code version and rollout. Each mode changes how Copilot interprets your request and what it can do.

| Mode | How It Works | Best For |
| ------  | -------------  | ----------  |
| **Ask** (default) | Conversational Q&A - Copilot explains, suggests, and answers but does not edit files directly | Questions, explanations, understanding unfamiliar code, reviewing content |
| **Edit** | You define a "working set" of files; Copilot proposes edits and shows a diff you approve or reject. Edit mode is being deprecated into Agent mode, so use Agent mode if Edit is not shown | Targeted, multi-file changes where you want full control |
| **Agent** | Copilot works autonomously - it decides which files to open, reads and writes code, and runs terminal commands to complete the task | Larger tasks where you want Copilot to drive end-to-end |
| **Plan** | Copilot produces a step-by-step implementation plan before writing any code; you review and approve the plan first | Complex features where you want to validate the approach before any changes are made |

#### Switching modes

- The mode selector is a dropdown at the **bottom of the Chat input area**, just above the text field
- Tab through the toolbar at the bottom of Chat to find it, or click on the current mode name
- Screen reader users: the mode name is announced when you focus that control; press `Space` or `Enter` to open the dropdown, then `Arrow` keys to choose

**Recommended mode for beginners:** Start with **Ask** to learn how Copilot responds to your questions, then explore **Edit** mode for making changes with full visibility into what Copilot touches. **Agent** mode is powerful but works best once you're comfortable reviewing its output.

> **Note:** **Plan** mode was introduced in October 2025 (VS Code 1.106) and is available as a public preview. Plan mode lets you get an AI-generated implementation plan before any code is written - useful for understanding what a complex change will involve.

### Choosing a Model

Copilot gives you access to AI models from OpenAI, Anthropic, Google, and others. The **model picker** is a button at the bottom of the Chat input area, next to the mode selector, showing the current model selection, such as **Auto** or a model name available to your account.

**When "Auto" is selected** (the default), Copilot automatically chooses the best model for each request - lighter models for quick questions, more capable models for complex reasoning. Auto mode has been generally available since December 2025. You can override it whenever you want a specific model.

#### Quick guidance

- Start with **Auto** model selection unless the workshop facilitator asks you to choose a specific model.
- Use lightweight or default models for short explanations, documentation drafts, and quick questions.
- Use more capable models only when the task genuinely needs deeper reasoning, long context, or agentic work.
- Watch the model badge or picker when available. VS Code 1.119 and later can show model details and usage multipliers for some agent responses.
- Do not rely on a saved model name from this guide. Model availability changes by plan, organization policy, geography, and rollout.

> **Model availability changes frequently.** Facilitators will provide current guidance at the workshop. For current sources and model-selection principles, see [Appendix K: GitHub Copilot Reference](appendix-k-copilot-reference.md).

<details>
<summary>Low vision users - finding the mode and model controls</summary>

Both the **mode selector** and **model picker** sit in the toolbar at the bottom of the Chat input area. At 200%+ zoom they may be cropped or wrapped.

- **Keyboard access:** From the Chat input field, press `Tab` repeatedly to move through the toolbar controls. Each control announces its current value (for example, "Ask" for the mode or "Auto" for the model).
- **Opening the dropdown:** Press `Space` or `Enter` on the control, then use `Arrow` keys to browse options. Press `Enter` to select.
- **If the controls are visually hidden at high zoom:** They are still in the Tab order. Keep pressing `Tab` past the Send button and you will reach them.
- **Alternative:** Open the Command Palette (`Ctrl+Shift+P`) and type "Copilot: Select Model" or "Copilot: Change Chat Mode" to access these controls without finding them visually.

</details>

### Chat Interface Structure

#### Panel layout (top to bottom)

1. **Chat input field** (multi-line text area)
   - Type your prompt here
   - Press `Ctrl+Enter` (Mac: `Cmd+Enter`) or `Enter` to send

2. **Model selector dropdown**
   - Choose which AI model to use (GPT-4, Claude, etc.)
   - Some models better for code, others for prose

3. **Conversation history**
   - Shows your previous prompts and Copilot's responses
   - Navigate with `Up/Down Arrow`
   - Each message is a separate element

4. **Action buttons**
   - "Clear Chat" - start a new conversation
   - "View in Editor" - open response in a new file

### Screen Reader Navigation in Chat

#### NVDA/JAWS

- Chat input is a web-based text field
- Switch to Forms Mode (`Enter` or automatic when focused)
- Type your prompt
- Press `Ctrl+Enter` to send
- Response appears in a live region (announced as it streams in)
- For complete reading: press `Alt+F2` for Accessible View

#### VoiceOver

- `VO+Tab` to navigate to chat input
- `VO+Shift+Down` to interact
- Type prompt, `Return` to send
- `VO+Escape` to stop interacting
- Navigate down to response area
- For complete reading: `Alt+F2` for Accessible View

### What to Ask Copilot Chat

#### For this workshop (non-coding examples)

| Goal | Example Prompt |
| ------  | ----------------  |
| Understand a file | `Explain what @11-vscode-interface.md covers in plain language` |
| Improve documentation | `This section is unclear. Rewrite it for a first-time contributor using a screen reader: [paste text]` |
| Check tone | `Review this PR description for tone. Is it clear, respectful, and helpful? Suggest improvements.` |
| Draft content | `Write a section on keyboard navigation in VS Code for screen reader users` |
| Explain an error | `I got this error when trying to commit: [paste error]. What does it mean and how do I fix it?` |
| Generate alt text | `Write alt text for this image: [describe what's in the image]` |
| Create checklist | `Create an accessibility review checklist for Markdown documentation` |
| Review for accessibility | `Check this Markdown for accessibility issues: [paste content]` |

### Using @ Mentions in Chat

#### @ symbols let you provide context to Copilot

| Mention | What It Does |
| ---------  | -------------  |
| `@workspace` | Searches your entire workspace for context |
| `@filename.md` | References a specific file |
| `#file` | Lists files to select from |
| `#selection` | References your currently selected text |
| `#terminalLastCommand` | References the last terminal command and output |

#### Example prompts with context

```text
Explain what @README.md covers for a new contributor

Review #selection for accessibility issues

Search @workspace for all references to "screen reader mode"

What does this error mean? #terminalLastCommand
```

### Using Slash Commands

Type `/` in Copilot Chat to see available commands:

| Command | What It Does |
| ---------  | -------------  |
| `/explain` | Explains selected code or text |
| `/fix` | Suggests fixes for problems in selected code |
| `/tests` | Generates tests (for code files) |
| `/help` | Shows all available commands |
| `/clear` | Clears chat history |
| `/savePrompt` | Saves the current chat conversation as a reusable `.prompt.md` file |

#### Example

1. Select a block of complex Markdown
2. Open Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs
3. Type `/explain`
4. Copilot explains the structure and purpose

### Built-in Actions via Command Palette

Copilot registers actions directly in the Command Palette. This provides a discoverable way to use Copilot without remembering slash commands or keyboard shortcuts.

1. Open Command Palette: `F1` or `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type `copilot`
3. Browse the list of available actions

Useful built-in actions include:

| Action | What It Does |
| ------ | ------------ |
| Copilot: Explain This | Explains the selected code or text |
| Copilot: Generate Docs | Generates documentation for the selected code |
| Copilot: Generate Tests | Creates test cases for the selected code |
| Copilot: Fix This | Suggests a fix for the selected code |
| Copilot: Review and Comment | Reviews selected code and adds comments |

> **Screen reader tip:** After pressing `F1` and typing `copilot`, use `Down Arrow` to browse the filtered list. Your screen reader announces each action name. Press `Enter` to run the selected action on your current selection.

### Learning Cards: Copilot Chat

<details>
<summary>Screen reader users</summary>

- Open Copilot Chat with `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs; focus lands in the chat input box, ready for your question
- After the response finishes streaming, press `Alt+F2` to open Accessible View and read the complete response with arrow keys, one paragraph at a time
- Use `@workspace` before your question to give Copilot context about your entire project (e.g., "@workspace what files reference heading levels?")

</details>

<details>
<summary>Low vision users</summary>

- The Chat panel opens on the right side of VS Code; drag its border to make it wider for easier reading at high zoom
- Code blocks in Chat responses have a "Copy" button and an "Insert at Cursor" button at the top-right corner of each block
- Use Accessible View (`Alt+F2`) to read responses at your configured editor font size instead of the Chat panel's smaller default

</details>

<details>
<summary>Sighted users</summary>

- Click the Copilot icon in the Activity Bar sidebar, use `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette to open the Chat panel
- The mode picker dropdown at the top of Chat lets you switch between Ask, Edit, and Agent modes
- Code blocks in responses have hover-revealed buttons: Copy, Insert at Cursor, and Run in Terminal

</details>

## 5. Copilot Edits — Making Multi-File Changes

> **Edit mode is being deprecated.** As of VS Code 1.118 (April 2026), the separate **Edit** chat mode is being merged into **Agent mode**. Agent mode now supports the same working-set diff workflow that Edit mode provided. If you do not see an "Edit" mode option in your Chat panel, use Agent mode instead - the workflow is nearly identical. The deprecation is rolling out gradually; facilitators will confirm current behavior at the workshop.

Copilot Edits is the **Edit** chat mode. Instead of just answering questions, Copilot proposes actual file changes — shown as a diff — across multiple files at once. You review every change before anything is saved.

**When to use it:**
- Renaming something used across many files
- Updating documentation to match a code change
- Adding the same pattern (e.g., error handling, a header comment) to multiple files
- Refactoring a section while keeping full control of what changes

### How to use Copilot Edits

1. Open Copilot Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs
2. At the bottom of the Chat panel, click the **mode dropdown** and select **Edit**
3. Add files to your **working set** — these are the files Copilot is allowed to edit:
   - Click **"Add Files..."** above the chat input, or
   - Type `#` in the chat input and select a file from the picker, or
   - Right-click a file in the Explorer and choose **"Add File to Copilot Edits"**
4. Type your request: *"Update all headings in these files to use sentence case"* or *"Add a screen reader tip callout to each section that has keyboard shortcuts"*
5. Press `Enter` — Copilot shows a diff of proposed changes in each file
6. Review the changes: use **Accept** or **Reject** on individual files, or **Accept All** / **Reject All**

> **Nothing changes until you accept.** Copilot Edits shows you the full diff first. You are always in control.

### Navigating the diff with a screen reader

- Each changed file appears in the Chat panel as a collapsible section — Tab to it, press `Space` to expand
- Press **Accept** or **Reject** buttons (announced with the file name) to decide per file
- To review the changes line by line before deciding: the diff opens in the editor with `+` and `-` lines — navigate with `Arrow` keys in the terminal or diff view

### Working set tips

- Start with a **small working set** (2–3 files) to see how Copilot interprets your request before expanding to the full project
- You can add or remove files from the working set mid-conversation
- Copilot will tell you if it needs a file that isn't in the working set — add it and ask again

### Learning Cards: Copilot Edits

<details>
<summary>Screen reader users</summary>

- Copilot Edits shows proposed changes as diffs -- use `F7` in the diff view to step through hunks with announced change types (added, removed, unchanged)
- Press `Ctrl+Shift+P` then "Accept" or "Discard" to confirm or reject each proposed edit; nothing is saved until you explicitly accept
- Review each file's diff individually with arrow keys before accepting to ensure Copilot did not introduce errors

</details>

<details>
<summary>Low vision users</summary>

- Proposed changes appear as standard diff views with green/red highlighting for added/removed lines
- Start with a small working set (2-3 files) so the diff review is manageable at high zoom
- The accept/discard buttons appear at the top of the diff view pane and remain visible as you scroll through changes

</details>

<details>
<summary>Sighted users</summary>

- Look for a multi-file list in the Chat panel showing every file Copilot wants to change -- click each to see the proposed diff
- Green highlighted lines = additions, red highlighted lines = deletions, just like a normal Git diff
- Use the "Accept" and "Discard" buttons at the top of the diff to control changes file by file

</details>

---

## 6. Agent Mode — Let Copilot Drive

> **See also:** [Chapter 19: Accessibility Agents](19-accessibility-agents.md) and [Chapter 20: Build Your Agent](20-build-your-agent.md) for creating your own Copilot agent. For the dedicated VS Code 1.120 surface for managing agent sessions across projects, see [Appendix K: VS Code 1.120 Agents Window and Impactful Updates](appendix-k-copilot-reference.md#4a-vs-code-1120-agents-window-and-impactful-updates).

Agent mode is the most autonomous way to use Copilot. You describe a goal and Copilot figures out what files to open, what changes to make, and what commands to run - asking for your approval when it needs to run something that has side effects.

**When to use it:**
- Scaffolding a new feature from scratch
- Running a complex multi-step task that involves several files and commands
- Tasks where you're not sure which files need to change

> **Agent mode is powerful, and that is worth being thoughtful about.** It can open, read, and edit files across your whole workspace and run terminal commands. Review its actions as it works, especially before approving terminal commands. Start with well-scoped tasks until you're comfortable with how it behaves.

### How to use Agent mode

1. Open Copilot Chat: `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs
2. Select **Agent** from the mode dropdown at the bottom of the Chat panel
3. Type your goal: *"Add a Table of Contents to every Markdown file in the docs/ folder"* or *"Find all TODO comments in this project and create a GitHub issue for each one"*
4. Copilot begins working - it shows each step it's taking and asks for approval before running terminal commands
5. Watch the progress in the Chat panel; review any proposed changes in the editor

> **Integrated browser sharing:** An agent does not automatically have access to VS Code's integrated browser. In VS Code 1.119 and later, you can explicitly attach browser tabs as context, and an agent may ask you to approve sharing an existing tab. Share only the page needed for the task, and use the browser sharing control to stop sharing when you are done.

### Approving terminal commands

When Agent mode wants to run a shell command (like `npm run build` or `git commit`), it pauses and shows you the command before running it.

- **Allow** - run this command once
- **Allow Always** - always allow this command type without asking again (use carefully)
- **Cancel** - stop and don't run it

> **Trust and security note:** Some approval prompts depend on organization-managed settings. VS Code 1.119 added an `allowNetwork` sandbox mode and reduces repeated approvals for temp-folder writes after you allow all commands in a session. If your prompts differ from this guide, follow your organization's policy and ask a facilitator before approving broad permissions.

> **Screen reader tip:** When Copilot pauses for approval, focus moves to the approval dialog in the Chat panel. Your screen reader announces the command Copilot wants to run and the approval options. Tab to your choice and press `Enter`.

### Agent vs Edit vs Ask — choosing the right mode

| You want to... | Use |
|----------------|-----|
| Ask a question or get an explanation | **Ask** |
| Make targeted changes to specific files you control | **Edit** |
| Complete a multi-step task and let Copilot navigate the workspace | **Agent** |
| Review and approve a plan before anything changes | **Plan** |

---

### Learning Cards: Agent Mode

**Screen reader users:**
- Agent mode's terminal command approval dialogs are announced differently by NVDA ("dialog") vs JAWS ("message box") vs VoiceOver ("alert") -- learn your screen reader's announcement so you recognize approval prompts instantly
- Listen for the confirmation prompt before any terminal command executes -- pressing Enter without reading the command is the single highest-risk action in Agent mode
- Use Accessible View (`Alt+F2`) to review the multi-step plan Agent mode proposes before approving; the plan is often too long for live region announcements to capture fully

**Low-vision users:**
- Agent mode's progress appears in the Chat panel -- if your zoom level pushes the panel narrow, widen it or pop it out so multi-step status lines do not truncate
- Terminal command approval buttons use the same accent color as other VS Code buttons; consider a high-contrast theme so approval prompts stand out from surrounding chat text
- Watch the file tabs along the top -- Agent mode opens and edits files automatically, and new tabs appearing is your visual cue that changes are happening

**Sighted users:**
- Agent mode is the highest-autonomy Copilot feature -- it can create files, run terminal commands, and install packages, so always read the approval dialog before clicking Continue
- The diff view after each Agent action shows exactly what changed; review diffs before moving to the next step rather than approving the entire sequence blindly
- Use the Plan step (type "plan" in Agent mode) to preview the full sequence before execution, especially for unfamiliar codebases

---

## 6A. VS Code 1.120 Agents Window

VS Code 1.120 adds the **Agents window** to Stable as a Preview feature. Agent mode is a way for Copilot to behave inside a session. The Agents window is a separate VS Code window for managing those sessions across projects.

Use the normal Chat view when you are learning, editing one workspace, or using file selections from the editor. Use the Agents window when you want an agent-first dashboard: sessions on the left, chat in the center, customizations nearby, and changed files on the right.

### Open the Agents Window

1. Open the Command Palette with `Ctrl+Shift+P`.
2. Run **Chat: Open Agents Window**.
3. Sign in to GitHub if prompted.
4. Select **New** or press `Ctrl+N`.
5. Choose a workspace folder or GitHub repository.
6. Choose the agent type, isolation mode, custom agent, and model if those controls are available to your account.
7. Write a focused task and review the Changes panel before applying, committing, merging, or checking out the result.

The following table shows when to stay in the editor and when to use the Agents window.

| You Want To | Best Surface |
| ----------- | ------------ |
| Ask a question about the file you are reading | Chat view in the editor |
| Use Accessible View to read one response carefully | Chat view in the editor |
| Make a focused edit in the current workspace | Chat view with Agent mode |
| Track several background or cloud sessions | Agents window |
| Review a set of agent changes before merging | Agents window Changes panel |
| Manage agents, skills, instructions, hooks, MCP servers, and plugins together | Agents window Customizations panel |

### Safety Notes for Workshop Learners

- Treat the Agents window as an advanced workflow surface. It helps you coordinate work, but it does not remove your responsibility to review changes.
- Prefer worktree isolation for Copilot CLI sessions while learning. It keeps agent edits separate from your active workspace.
- Use the Files panel sync button before starting a session when your branch may be behind upstream.
- Read terminal command risk badges if enabled, but still inspect the full command before approving.
- Run project validation tasks from the Agents window before accepting a completed session.
- If a session changes more files than expected, stop and review before continuing.

### Accessibility Notes

**Screen reader users:** Open the Agents window through the Command Palette. Use `Alt+F1` for context-specific Accessibility Help, `F6` and `Shift+F6` to move between workbench parts, and `Alt+F2` for Accessible View when chat responses, terminal output, or diffs are too dense to follow live.

**Low-vision users:** Increase zoom before opening dense multi-panel sessions. Use high-contrast themes, modal diff view, and wider panels when reviewing changes. If the Agents window needs different display settings than your editor, use Agents-window-specific settings overrides.

**Sighted users:** Use the Sessions list as a dashboard and the Changes panel as your review gate. Changed-file counts, status badges, and diff views are the visual signals that tell you whether the agent stayed inside the requested scope.

For the full 1.120 addendum, including terminal risk assessment, terminal output compression, Markdown preview diffs, BYOK model controls, and extension support in the Agents window, see [Appendix K: VS Code 1.120 Agents Window and Impactful Updates](appendix-k-copilot-reference.md#4a-vs-code-1120-agents-window-and-impactful-updates).

---

## 7. Next Edit Suggestions

Next Edit Suggestions (NES) is a feature where Copilot watches what you're editing and predicts **where you'll need to make your next change** — then offers to make it for you. Unlike regular inline suggestions that complete what you're currently typing, NES looks ahead to related edits elsewhere in the file.

**Example:** You rename a variable on line 12. NES notices it's also used on lines 34 and 67 and offers to update those too — without you navigating there first.

### Turning on Next Edit Suggestions

1. Open Settings: `Ctrl+,` (Mac: `Cmd+,`)
2. Search for `nextEditSuggestions`
3. Enable **"GitHub Copilot: Next Edit Suggestions"**

Or add to your `settings.json`:

```json
"github.copilot.nextEditSuggestions.enabled": true
```

### How it works in practice

- After making an edit, a **tab stop indicator** (an arrow `→` symbol) appears at the location of the predicted next edit
- Press `Tab` to jump there and accept the suggestion
- Press `Escape` to dismiss it and continue editing normally
- The indicator is subtle — if you don't see it, your next keystroke will proceed as normal

> **Screen reader tip:** NES is announced as an inline suggestion at the predicted location. With screen reader optimized mode on (`Shift+Alt+F1`), VS Code announces when a next edit suggestion is available. Navigate to it with `Tab` and accept or dismiss as with any inline suggestion.

---

## 8. Copilot on GitHub.com

You don't need VS Code to use Copilot. GitHub.com has Copilot built directly into the website — useful for quick questions, reviewing code in the browser, drafting PR descriptions, and more.

### Opening Copilot Chat on GitHub.com

1. Go to [github.com](https://github.com) — you must be signed in
2. Look for the **Copilot icon** (a circle with dot pattern) in the top navigation bar
3. Click it (or press `?` then select Copilot from the command palette) to open the chat panel
4. Type your question and press `Enter`

Copilot on GitHub.com has context about your repositories, issues, PRs, and code - you can reference them directly.

### What you can ask Copilot on GitHub.com

```
# Ask about a specific repository
"Summarize the recent changes to the accessibility-agents repo"

# Ask about an issue
"What are the open accessibility issues in this repo?"

# Ask about code
"What does the auth module in this project do?"

# General coding questions
"What's the difference between git rebase and git merge?"
```

### Copilot for Pull Request Summaries

When you open a pull request on GitHub.com, Copilot can generate a description for you automatically.

1. Start creating a new pull request: go to your branch and select **"Compare & pull request"**
2. In the PR form, look for the **Copilot icon** next to the description field
3. Click it — Copilot reads your commits and diff and writes a draft description
4. Review and edit the draft — it typically includes what changed and why
5. Submit the PR

> **This is a huge time-saver.** Copilot-generated PR descriptions are usually a solid first draft. Always review them to add context a maintainer would need (like *why* you made the choice, not just *what* you changed).

**Screen reader tip:** The Copilot sparkle button is next to the description textarea. It's announced as a button labelled "Copilot" or "Generate with Copilot." After clicking, the description field is populated — read through it with your screen reader before submitting.

### Copilot for Code Review on GitHub.com

Maintainers can use Copilot to review pull requests on GitHub.com. As a contributor, you may see **Copilot-authored review comments** on your PR - they look like regular review comments but are labelled "Copilot".

> **Cost note, verified May 12, 2026:** Starting June 1, 2026, Copilot code review is expected to consume GitHub Actions minutes in addition to GitHub AI Credits. Facilitators and maintainers should check current billing settings before enabling Copilot review broadly for a cohort.

- Copilot review comments work just like human review comments — respond, resolve, or address them
- They flag things like potential bugs, style inconsistencies, or missing edge cases
- You don't need to accept every suggestion — use your judgment

### Copilot on GitHub.com vs VS Code

| Feature | GitHub.com | VS Code |
|---------|-----------|---------|
| Chat (general questions) | Yes | Yes |
| Repository / issue / PR context | Yes, built in | Yes, via `@github` |
| Inline code suggestions | No | Yes |
| Copilot Edits (multi-file) | No | Yes |
| Agent mode | Cloud agent sessions may be available for eligible accounts and repositories | Yes, local Agent mode in VS Code |
| PR description generation | Yes | No |
| Code review comments | Yes, for maintainers | No |
| No install required | Yes | Requires extension |

---

### Learning Cards: Copilot on GitHub.com

**Screen reader users:**
- The Copilot chat icon on GitHub.com is in the site header -- navigate by landmark (`d` in NVDA/JAWS browse mode) to reach the banner, then find the button labeled "Open GitHub Copilot Chat"
- PR description generation uses a sparkle button ("Copilot actions") next to the description field -- Tab through the PR form controls to find it; it is not inside the markdown toolbar
- Browser-based Copilot Chat responses are standard page content, not a VS Code panel -- your normal web reading commands (arrows, headings, links) work without any special mode

**Low-vision users:**
- The Copilot icon in the GitHub.com header is small (16px) -- zoom to at least 200% or use browser find (`Ctrl+F` and type "Copilot") to locate the chat entry point faster
- PR description suggestions appear inline in the description textarea; the sparkle button sits to the right of the formatting toolbar and may scroll off-screen at high zoom levels
- GitHub.com Copilot Chat opens as a side panel that overlaps page content on narrow viewports -- resize the panel or collapse the file tree to reclaim space

**Sighted users:**
- Look for the Copilot sparkle icon in the top-right header area of any GitHub.com page to open chat; on PR pages, a second sparkle button appears next to the description field
- GitHub.com Copilot and VS Code Copilot are separate surfaces. Some account state and agent sessions may connect across surfaces, but prompts, local workspace context, and extensions do not automatically carry over
- Use the Copilot chat on GitHub.com for quick questions about repos, issues, and PRs without needing to clone anything locally

---

## 9. Effective Prompting for Documentation Work

Copilot works best with clear, specific prompts. The more context you provide, the better the response.

### Anatomy of a Good Prompt

#### Bad prompt

```text
Write about accessibility
```

#### Good prompt

```text
Write a 3-paragraph section explaining how screen reader users can navigate the VS Code Explorer sidebar. Include keyboard shortcuts for NVDA and JAWS. Assume the reader has never used VS Code before. Use clear headings and bullet points.
```

#### What makes it good

1. **Specific scope:** "3-paragraph section"
2. **Clear topic:** "navigate the VS Code Explorer sidebar"
3. **Target audience:** "screen reader users" who "never used VS Code"
4. **Required details:** "keyboard shortcuts for NVDA and JAWS"
5. **Format guidance:** "headings and bullet points"

### Prompting Patterns for This Workshop

#### Pattern 1: Contextual Rewrite

```text
This section is too technical for beginners. Rewrite it in plain language:

[paste existing text]

Target audience: Screen reader users trying VS Code for the first time
```

#### Pattern 2: Generate with Constraints

```text
Write a step-by-step guide for creating a GitHub issue using only keyboard navigation. Include:
- NVDA screen reader announcements
- Exact keyboard shortcuts
- What to do if the form field is not announced correctly
Format as a numbered list
```

#### Pattern 3: Review and Improve

```text
Review this PR description for:
1. Clarity for maintainers
2. Respect and positive tone
3. Whether it links to the related issue
4. If it explains WHY the change matters

Here's the description:
[paste your PR description]
```

#### Pattern 4: Accessibility Audit

```text
Check this Markdown for accessibility problems:
- Heading hierarchy (H1 → H2 → H3, no skips)
- Link text (no "click here" or bare URLs)
- Alt text for images
- List structure

[paste Markdown content]
```

#### Pattern 5: Draft from Outline

```text
Write a section based on this outline:

## Timeline View - File History
- What Timeline shows
- How to open it (keyboard)
- How screen readers announce each commit
- How to view a specific commit's changes

Write for screen reader users. Use H3 subheadings. Include a table for keyboard shortcuts.
```

### Iterating on Responses

Copilot's first response is a draft. Refine it:

#### Follow-up prompts

```text
Make it shorter - reduce to 5 bullet points

Add more detail about what NVDA announces at each step

Rewrite this in a more friendly tone

Add a "Common Mistakes" section at the end

Format this as a table instead of a bulleted list
```

Copilot remembers the conversation context - just say what to change.

### Learning Cards: Effective Prompting

<details>
<summary>Screen reader users</summary>

- Include "assume the reader uses a screen reader" in your prompts to get responses with keyboard shortcuts and non-visual descriptions by default
- Ask Copilot to "use headings and bullet points" so the response is structured and easy to navigate with `Alt+F2` (Accessible View)
- Iterate by saying "make it shorter" or "add more detail about NVDA" -- Copilot retains conversation context so you do not need to repeat the original request

</details>

<details>
<summary>Low vision users</summary>

- Ask Copilot to "include a table" when requesting reference information -- tables are often easier to scan than dense paragraphs at high zoom
- Use the "Draft from Outline" pattern: give Copilot your section headings and let it fill in the content, then review the structure before the details
- If a response is too long to review comfortably, ask "summarize in 5 bullet points" for a manageable overview

</details>

<details>
<summary>Sighted users</summary>

- Start with a specific prompt that includes audience, format, and length requirements for better first-draft quality
- The Chat panel shows your conversation history on the left so you can return to previous prompts and refine them
- Use the "Rewrite" prompt pattern -- paste content and ask Copilot to restructure it rather than writing from scratch

</details>

## 10. Custom Instructions vs Custom Agents

Two distinct tools shape how Copilot behaves. Understanding the difference is critical for working with Accessibility Agents (see [Chapter 16: Accessibility Agents](19-accessibility-agents.md)).

### Custom Instructions

**File:** `.github/copilot-instructions.md`

**Purpose:** Always-on background guidance for every Copilot interaction.

#### What they do

- Apply to all code suggestions automatically
- Set project-wide standards
- Influence tone and style
- Provide context about your project's conventions

#### Example `.github/copilot-instructions.md`

```markdown
# Copilot Instructions for accessibility-agents

## Accessibility Standards
- Include semantic HTML elements in generated markup
- Add ARIA labels to interactive components when no visible text is present
- Ensure keyboard navigation patterns are implemented for custom widgets

## Documentation Style
- Write for screen reader users first
- Include keyboard shortcuts for NVDA, JAWS, and VoiceOver
- Use active voice and imperative mood ("Press Ctrl+G" not "You can press Ctrl+G")
- Structure content with clear headings (H2 for sections, H3 for subsections)

## Commit Message Format
- Follow conventional commits: `type: description`
- Types: feat, fix, docs, style, refactor, test, chore
- Reference issues: "Fixes #123"

## Tone
- Friendly but professional
- Direct and actionable
- Assume readers are competent but may be new to this specific tool
```

**When active:** Every time Copilot generates a suggestion (inline or in Chat)

### You never have to ask for these - Copilot simply follows them

### Custom Agents

**Files:** `.github/agents/[name].agent.md`

**Purpose:** On-demand, focused workflows that you deliberately invoke.

#### What they do

- Perform specific, repeatable tasks
- Can access specific tools (GitHub API, file system, terminal)
- Generate structured output (reports, reviews, analysis)
- Execute multi-step workflows

#### Example agent names

- `@daily-briefing` - Summarize repository activity
- `@issue-tracker` - Find and prioritize issues
- `@pr-review` - Generate PR review documentation
- `@analytics` - Team contribution metrics
- `@insiders-a11y-tracker` - Monitor accessibility changes

**When active:** Only when you type `@agent-name` in Copilot Chat

See [Chapter 16: Accessibility Agents](19-accessibility-agents.md) for complete agent documentation.

### Comparison Table

| Feature | Custom Instructions | Custom Agent |
| ---  | ---  | ---  |
| **When active** | Background - every interaction | On-demand - you type `@agent-name` |
| **Defined in** | `.github/copilot-instructions.md` | `.github/agents/[name].agent.md` |
| **Tool access** | Standard Copilot tools | Can restrict or grant specific permissions |
| **Best for** | Broad coding standards and preferences | Focused, repeatable, specialized tasks |
| **Requires invocation** | No - always on | Yes - explicit trigger |

### Using Both Together

**Custom instructions** ensure Copilot follows your accessibility standards on every suggestion.

**Custom agents** handle specific workflows like auditing, issue tracking, or automated remediation.

#### Example workflow

1. Your `.github/copilot-instructions.md` says: "Always check heading hierarchy in Markdown"
2. You invoke `@insiders-a11y-tracker` to scan recent changes
3. The agent finds a heading skip (H1 → H3)
4. You ask Copilot Chat to fix it: "Fix the heading hierarchy in this file"
5. Copilot's fix follows your custom instructions (uses semantic HTML, adds ARIA where needed)

#### Both work together - instructions guide every response, agents automate specific workflows

### Writing Accessibility-Focused Custom Instructions

> Source: [accessibility.github.com/documentation/guide/copilot-instructions/](https://accessibility.github.com/documentation/guide/copilot-instructions/)

Custom instructions can be set at three levels. Each level cascades to narrower scopes:

| Level | Where | Effect |
| -------  | -------  | --------  |
| **Organization** | Copilot organization settings | Applies to all repositories in the org |
| **Repository** | `.github/copilot-instructions.md` | Overrides org instructions; applies to one repo |
| **Personal** | GitHub.com → Settings → Copilot → Instructions | Your own preferences; highest priority |

#### Do's - What Makes Instructions Effective

##### Use normative language: MUST, MUST NOT, SHOULD, SHOULD NOT

Most language models respond well to normative language. These terms reduce ambiguity and make rules clearly mandatory versus optional - the same approach WCAG itself uses:

```text
## Keyboard Navigation
- Keyboard shortcuts SHOULD NOT override high-priority browser or OS shortcuts.
- A keyboard shortcut MUST use at most 4 simultaneous keys.
- All interactive components MUST be reachable by Tab key.
```

### Focus on team-specific standards, not generic principles

Copilot already knows WCAG. Tell it what *your team* does specifically:

```text
This application MUST conform to WCAG 2.2 Level AA.
DeprecatedButton SHOULD NOT be used; use NewAccessibleButton instead.
```

### Use lists and checklists to structure instructions

Lists provide clear guardrails - Copilot follows them step by step:

```text
## Checklist for evaluating 1.3.1 Info and Relationships
- [ ] role="presentation" MUST NOT be applied to semantic elements.
- [ ] Error messages MUST be programmatically associated with inputs.
- [ ] Name-value pairs MUST NOT use headings; use <p>.
```

### Reference and enforce your design system

Document which components to use and which are deprecated. Design systems evolve - keep instructions current:

```text
Use AccessibleModal from @company/ui-kit@3.x.
LegacyDialog MUST NOT be used in any new code.
```

#### Don'ts - Common Instruction Mistakes

##### Don't paste entire WCAG guidelines

Copilot is already trained on WCAG. Pasting the full text wastes context space and dilutes your specific instructions. Instead, write concise, actionable rules that give *net-new* information: your team's specific practices, exceptions, and priorities.

##### Don't reference external links

By default, Copilot does not access external links in custom instructions - this is a deliberate security feature. A URL like `https://www.w3.org/WAI/WCAG21/` will not be fetched. Write the relevant rule directly.

##### Don't reference private repositories

Copilot cannot access private repository content from within custom instructions unless the content is already present in the active repo.

#### Additional Guidance

**Role-based prompting** - You can give Copilot a persona to shape how it responds:

```text
As the lead accessibility expert on your team, your primary focus is ensuring
all UI is accessible by default, relying on semantic HTML before ARIA attributes.
```

Be specific about skills and responsibilities; avoid broad personas that may introduce unintended assumptions.

**Keep instructions concise.** There is no hard character limit, but overly long instructions reduce precision. Summarize the most important, actionable rules rather than listing every possible guideline.

**Contribute effective instructions** to [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot) so others benefit from your organization's work.

#### Accessibility Resources for Custom Instructions

These resources can help you write better accessibility-focused custom instructions and evaluate Copilot's output:

- **A11y LLM Evaluation Report** - GitHub's own evaluation of how well LLMs handle accessibility tasks, with practical benchmarks: [Accessibility LLM Evaluation](https://githubnext.com/projects/a11y-llm-eval)
- **Beast Mode Accessibility Prompt** - A community-maintained, comprehensive accessibility prompt that you can adapt for your own instructions: referenced in [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot)
- **Markdown Accessibility Review Guidelines** - A practical guide for reviewing Markdown output for accessibility, useful as a reference when writing documentation-focused instructions: [Markdown Accessibility](https://github.com/github/accessibility/blob/main/docs/markdown-accessibility.md)

## 11. Using Accessible View with Copilot Responses

Copilot Chat responses stream in token by token. This is visually nice but can fragment screen reader announcements. **Accessible View** provides complete, structured access to generated content.

> **Not just for screen readers:** Accessible View is also valuable for low vision users. It renders text at your configured editor font size in a clean pane without the Chat panel's smaller default font, cramped layout, or streaming animation.

### Why Use Accessible View for Copilot

#### Without Accessible View

- Responses announced in fragments as tokens arrive
- Live region updates may interrupt or overlap
- Difficult to re-read specific parts
- Context can be lost in streaming

#### With Accessible View (`Alt+F2` / Mac: `Option+F2`)

- Full complete response in a readable pane
- Navigate with `Up/Down Arrow` at your own pace
- Code blocks properly formatted
- Headings and lists structured
- No interruptions or live region noise

### Recommended Workflow

#### Every time you ask Copilot something

1. Type your prompt in Chat input
2. Press `Ctrl+Enter` (Mac: `Cmd+Enter`) to send
3. Press `Alt+F2` (Mac: `Option+F2`) to open Accessible View - you can open it immediately after sending, before the response finishes
4. Follow along as the response streams in the Accessible View in real-time
5. Read or re-read any section with `Arrow` keys
6. Press `Escape` to close Accessible View and return to Chat

> **VS Code December 2025 update:** The Accessible View now updates dynamically as responses stream in. You no longer need to wait for a response to finish before opening it - open `Alt+F2` right after sending and follow the response as it arrives.

#### Benefits

- Follow responses live without waiting
- Navigate and re-read at your own pace
- Code blocks and lists are properly structured
- Headings are announced correctly

### Accessible View for Inline Suggestions

#### When a suggestion appears

1. Don't accept it immediately
2. Press `Alt+F2` (Mac: `Option+F2`)
3. Accessible View shows: "Suggestion: [full text of the suggestion]"
4. Read it completely
5. To insert the suggestion at your cursor: press `Ctrl+/` (Mac: `Cmd+/`)
6. To close without inserting: press `Escape`, then `Tab` to accept or `Escape` to reject

**`Ctrl+/` (Mac: `Cmd+/`) inserts the suggestion directly from Accessible View** - you don’t need to close the view first and then press `Tab`. This is the recommended workflow for screen reader users.

#### This is especially useful for multi-line suggestions where the ghost text is hard to review

### Code Blocks in Accessible View

When Copilot suggests code or Markdown:

#### In Accessible View

- Code blocks are in `<pre>` elements
- Screen readers announce "code block" or "pre-formatted text"
- Each line is on its own line (not run together)
- Indentation is preserved

**NVDA/JAWS:** Use `Arrow` keys to read line by line. Use `Ctrl+Home` to jump to the start.

**VoiceOver:** Interact with the code block (`VO+Shift+Down`) to read each line with proper structure.

### Learning Cards: Using Accessible View with Copilot Responses

**Screen reader users:**
- Build the `Alt+F2` --> read --> `Ctrl+/` muscle memory: press `Alt+F2` to open Accessible View, read the response at your own pace with arrow keys, then press `Ctrl+/` to insert the code suggestion into your file
- Accessible View converts Copilot's streaming markdown into a plain text buffer -- headings, lists, and code blocks are all there, but read as flat text without formatting announcements, which is often easier to parse
- If a Copilot response contains multiple code blocks, each block starts on its own line in Accessible View -- use your search command (`Ctrl+F` in the view) to jump between code blocks quickly

**Low-vision users:**
- Accessible View opens as a separate editor pane that inherits your font size and theme -- if Copilot Chat text is too small in the sidebar, `Alt+F2` gives you the same content at your preferred zoom
- The Accessible View pane can be resized like any editor pane; drag the border or use the keyboard layout commands to give it more horizontal space for long code lines
- Use `Ctrl+/` from Accessible View to insert code at your cursor position without needing to copy-paste manually, reducing the chance of losing your place in the file

**Sighted users:**
- Even with full vision, `Alt+F2` is useful when Copilot Chat responses are long -- it opens the response as a full editor buffer where you can scroll, search, and select text more easily than in the Chat sidebar
- The `Ctrl+/` shortcut (insert at cursor) works from Accessible View regardless of whether accessibility mode is on -- it is a productivity shortcut, not just an accessibility feature
- If you ever lose track of what Copilot suggested, `Alt+F2` always shows the most recent response without scrolling through chat history

## 12. Keyboard Shortcuts Reference

### Copilot Inline Suggestions

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Accept suggestion | `Tab` | `Tab` |
| Reject suggestion | `Escape` | `Escape` |
| Accept word-by-word | `Ctrl+Right Arrow` | `Cmd+Right Arrow` |
| Next suggestion | `Alt+]` | `Option+]` |
| Previous suggestion | `Alt+[` | `Option+[` |
| Open suggestions list | `Ctrl+Enter` | `Cmd+Enter` |
| Open suggestion in Accessible View | `Alt+F2` | `Option+F2` |
| Insert suggestion from Accessible View | `Ctrl+/` | `Cmd+/` |

### Copilot Chat

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Open Chat panel | `Ctrl+Alt+I` | Use **Chat: Open Chat** from the Command Palette if your keymap differs |
| Inline chat (in-file) | `Ctrl+I` | `Cmd+I` |
| Quick chat (floating) | `Ctrl+Shift+Alt+I` | `Cmd+Shift+Ctrl+I` |
| Send message | `Ctrl+Enter` | `Cmd+Enter` |
| Clear chat | `Ctrl+L` | `Cmd+L` |

### Accessibility

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Toggle screen reader optimized mode | `Shift+Alt+F1` | `Shift+Option+F1` |
| Open Accessible View | `Alt+F2` | `Option+F2` |
| Open Accessible Help | `Alt+H` | `Option+H` |
| Close Accessible View | `Escape` | `Escape` |

### VS Code General (Quick Reference)

| Action | Windows/Linux | macOS |
| --------  | ---------------  | -------  |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Go to file | `Ctrl+P` | `Cmd+P` |
| Find in file | `Ctrl+F` | `Cmd+F` |
| Settings | `Ctrl+,` | `Cmd+,` |
| Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Explorer | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| Terminal | `Ctrl+Backtick` | `Ctrl+Backtick` |

### GitHub.com Shortcuts (Not VS Code)

These shortcuts work on GitHub.com in your browser, not inside VS Code. Students sometimes confuse them with Copilot shortcuts because they involve similar key combinations.

| Action | Shortcut | What it opens |
| ------ | -------- | ------------- |
| Open github.dev web editor | `.` (period key) | A lightweight VS Code editor in your browser tab. Read-only for most operations. Copilot is **not** available here. |
| Open in a Codespace | `,` (comma key) | A full cloud development environment with a terminal. Copilot **is** available if your account has access. |

> **Ctrl+. versus the period key:** On a GitHub repository page, pressing the `.` (period) key alone opens github.dev. This is different from `Ctrl+.` inside VS Code, which opens the Quick Fix menu. If you press `Ctrl+.` on GitHub.com, it opens the GitHub Command Palette, not github.dev. These three actions share similar keys but do completely different things depending on where you press them.

> **Screen reader note:** When github.dev opens, your browser tab reloads into a VS Code-like interface. Your screen reader may announce "Visual Studio Code" or "GitHub Dev Editor." This is a web page, not the desktop application. Press `Ctrl+Shift+P` to confirm you are in github.dev by reading the title bar.

**Complete keyboard reference:** See [Appendix M: VS Code Accessibility Reference](appendix-g-vscode-reference.md)

### Video Tutorials (Screen Reader Demonstrations)

GitHub's accessibility team has published screen reader walkthroughs for each major Copilot feature. These are sourced from the official [GitHub Accessibility guide for Copilot in VS Code](https://accessibility.github.com/documentation/guide/github-copilot-vsc/):

- [Inline suggestions with a screen reader](https://www.youtube.com/watch?v=nRsshE54bjk) - accepting, rejecting, and reviewing ghost text suggestions with NVDA
- [Inline chat with a screen reader](https://www.youtube.com/watch?v=jgON0bve74w) - using `Ctrl+I` to edit code in place with screen reader feedback
- [Chat view with a screen reader](https://www.youtube.com/watch?v=uVGLQeZWXao) - navigating the Chat panel, reading responses, and using Accessible View
- [Built-in actions with a screen reader](https://www.youtube.com/watch?v=J0DGD2IWypg) - running Copilot commands from the Command Palette

> **Tip:** These videos show NVDA with VS Code on Windows. The workflows apply to JAWS and VoiceOver with minor shortcut differences noted in each section above.

## 13. Critically Evaluating AI Output

Copilot is fast, fluent, and frequently wrong. The suggestions it produces look like they were written by someone who knows what they are doing -- and that is exactly what makes them dangerous if you accept them without thinking. This section gives you a framework for deciding what to keep, what to verify, and what to throw away.

### When to Trust Copilot

Copilot is at its best when it is generating code that thousands of developers have written before. You can generally trust suggestions that fall into these categories:

- **Boilerplate and scaffolding** -- file headers, import statements, class constructors, standard function signatures
- **Well-known patterns** -- iterating over arrays, reading files, formatting strings, writing basic tests
- **Standard library usage** -- calling built-in methods with correct argument order
- **Common syntax** -- closing brackets, finishing a loop body, completing a switch/case block

In these situations Copilot is essentially autocomplete with broader context. The risk of error is low because the patterns are so widely repeated in its training data.

### When to Verify

Some suggestions look correct at first glance but carry hidden risks. Always read these carefully before accepting:

- **Domain-specific logic** -- business rules, financial calculations, date/time math
- **Security-sensitive code** -- authentication, authorization, input sanitization, cryptographic operations
- **Accessibility attributes** -- ARIA roles, `alt` text, keyboard event handlers, focus management
- **Numerical calculations** -- off-by-one errors, floating-point precision, unit conversions
- **API usage** -- endpoint URLs, request headers, query parameters, response shapes
- **Regular expressions** -- Copilot loves to generate regex patterns that almost work

> **Screen reader tip:** When reviewing a suggestion in Accessible View (`Alt+F2`), read it line by line with `Down Arrow` rather than skimming. Copilot's mistakes are usually on individual lines, not in the overall structure.

### When to Reject

Delete the suggestion and write the code yourself when you see any of these:

- **Fabricated APIs** -- function or method names that do not exist in the library you are using
- **Outdated syntax** -- deprecated methods, old package versions, removed browser APIs
- **Insecure patterns** -- SQL string concatenation, `eval()`, hardcoded secrets, disabled HTTPS verification
- **Convention violations** -- naming styles, file organization, or patterns that contradict your project's standards
- **Accessibility violations** -- interactive elements without keyboard handlers, missing label associations, incorrect heading hierarchy

If you are not sure whether a suggestion falls into this category, verify it. When in doubt, reject.

### Common Failure Modes

The table below shows the kinds of mistakes Copilot makes most often. Recognizing these patterns helps you catch problems before they reach a reviewer.

| Failure mode | What it looks like | Why it happens |
| --- | --- | --- |
| Fabricated function names | `response.getData()` on an object that has no `getData` method | Copilot blends APIs from multiple libraries into one suggestion |
| Incorrect ARIA attributes | `role="textbox"` on a `<div>` that acts as a button | Training data includes many inaccessible websites |
| Outdated dependency versions | `"react": "^16.8"` in a new project | Training data includes older tutorials and starter templates |
| Plausible-but-wrong logic | A sort function that works for most inputs but fails on edge cases | The pattern matches what Copilot has seen, but the details are wrong |
| Confidently incorrect explanations | Chat says "this function is O(n)" when it is actually O(n squared) | Copilot generates fluent text, not verified analysis |
| Hallucinated URLs | Links to documentation pages or API endpoints that do not exist | Copilot predicts likely URLs from patterns, not from a live index |

### The Verification Checklist

Before you accept any non-trivial Copilot suggestion, run through these steps:

1. **Does it compile or run?** -- Accept the suggestion, save the file, and check for errors in the Problems panel (`Ctrl+Shift+M`).
2. **Does it do what I asked?** -- Read the code and confirm it matches your intent, not just your prompt.
3. **Could I explain this to a reviewer?** -- If you cannot explain what every line does, you do not understand it well enough to keep it.
4. **Does it match the project's conventions?** -- Check naming, formatting, file organization, and error handling against the existing codebase.
5. **Did I check any URLs or references it generated?** -- Open every link, verify every package name, confirm every API endpoint.
6. **Would this pass an accessibility review?** -- Run it through the checks described below.

> **Screen reader tip:** Keep the Problems panel open (`Ctrl+Shift+M`) while you work with Copilot. After accepting a suggestion, press `F8` to jump to the next diagnostic. This catches syntax errors immediately.

### Accessibility-Specific Concerns

Copilot generates HTML and UI code based on what it has seen -- and much of the web is inaccessible. Watch for these problems in any suggestion that touches the user interface:

- **Missing `alt` text** -- Copilot frequently generates `<img>` tags with empty or missing `alt` attributes
- **Improper heading levels** -- jumping from `<h2>` to `<h4>`, breaking the document outline
- **No keyboard handlers** -- `onClick` without `onKeyDown`, making elements unreachable for keyboard users
- **Decorative ARIA** -- adding `role` or `aria-label` attributes that contradict the element's native semantics
- **Generic link text** -- "click here" or "read more" instead of descriptive link text

Always verify ARIA roles and patterns against the [APG (ARIA Authoring Practices)](https://www.w3.org/WAI/ARIA/apg/). If Copilot suggests an ARIA pattern, open the APG page for that widget and confirm the roles, states, and keyboard interactions match. See also [Chapter 12](12-vscode-accessibility.md) for accessibility verification workflows in VS Code.

### The Right Mental Model

Think of Copilot as a fast typist who has read a lot of code. It can reproduce patterns it has seen before, and it can combine those patterns in new ways. What it cannot do is:

- **Understand your project** -- it does not know your business rules, your users, or your constraints
- **Verify its own output** -- it cannot run the code it generates or check whether it works
- **Stay current** -- its training data has a cutoff date, so newer APIs and libraries may be missing or wrong
- **Reason about correctness** -- it predicts the most likely next token, not the most correct one

The right relationship with Copilot is the one you have with a first draft. You would never submit a first draft without reading it, testing it, and revising it. Treat every Copilot suggestion the same way.

For more on working with AI tools responsibly, see [Chapter 20](20-build-your-agent.md) on building and evaluating your own agent, and [Chapter 21](21-next-steps.md) for continued learning resources.

### Learning Cards: Critically Evaluating AI Output

<details>
<summary>Screen reader users</summary>

- After accepting a Copilot suggestion, run `Ctrl+Shift+M` to open the Problems panel -- if new errors appear, Copilot may have introduced invalid syntax or broken links
- Use `F8` to jump to the next error in the file and hear it announced; compare it against what Copilot changed to decide if the suggestion caused it
- When Copilot generates Markdown, check heading levels with `Ctrl+Shift+O` (symbol outline) to verify the hierarchy was not broken

</details>

<details>
<summary>Low vision users</summary>

- After accepting a suggestion, look for red squiggles (errors) or yellow squiggles (warnings) in the editor -- these appear near lines Copilot modified
- Use Markdown Preview (`Ctrl+Shift+V`) to visually verify that Copilot-generated content renders correctly, especially tables and links
- Zoom in on the Problems panel (`Ctrl+Shift+M`) to read error details that reference specific line numbers

</details>

<details>
<summary>Sighted users</summary>

- Check the Problems panel (`Ctrl+Shift+M`) after accepting any suggestion -- new entries indicate Copilot may have introduced issues
- Red underlines in the editor appear instantly on syntax errors; yellow underlines appear on warnings -- scan the changed area for these
- Use the Source Control diff view to compare exactly what Copilot changed versus the previous version before committing

</details>

## Troubleshooting

### Copilot Not Suggesting Anything

**Issue:** No suggestions appear as you type.

#### Solutions

1. Check Copilot is active: status bar icon should not be grayed out
2. Click the Copilot icon → verify "Completions enabled"
3. Check subscription status: `Ctrl+Shift+P` → "Copilot: Check Status"
4. Restart VS Code
5. Sign out and sign back in: `Ctrl+Shift+P` → "Copilot: Sign Out"

### Suggestions Are Too Frequent/Distracting

**Issue:** Constant interruptions from suggestions.

#### Solutions

1. Use word-by-word acceptance: `Ctrl+Right Arrow`
2. Reduce screen reader verbosity (see Section 3)
3. Use Accessible View (`Alt+F2`) to review suggestions without live announcements
4. Disable inline suggestions temporarily: Copilot icon → "Disable Completions"

### Chat Responses Not Announced

**Issue:** Screen reader silent when Copilot responds.

#### Solutions

1. Wait for response to complete, then press `Alt+F2` for Accessible View
2. Check ARIA live region settings in your screen reader
3. Navigate manually to the response area with `Tab` or `Arrow` keys
4. Use Quick Chat (`Ctrl+Shift+Alt+I`) instead of panel chat

### "Copilot Subscription Required"

**Issue:** Extension installed but asks for subscription.

#### Solutions

1. Sign in to GitHub: Copilot icon → "Sign in"
2. Verify GitHub account has Copilot access (free tier or paid)
3. Check [github.com/settings/copilot](https://github.com/settings/copilot) for subscription status
4. Free tier users: ensure you haven't exceeded monthly limits

## Try It: Your First Copilot Conversation

**Time:** 3 minutes | **What you need:** Current VS Code with built-in AI features enabled and a GitHub account with Copilot access

1. **Open Copilot Chat** - Press `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs. Your screen reader announces the chat panel.
2. **Ask a question** - Type: `What does the CONTRIBUTING.md file in this repository say about how to submit a pull request?` Press `Enter`.
3. **Read the response** - Press `Ctrl+Shift+A` to open the Accessible View if your screen reader doesn't read the response automatically. The response appears as plain text you can arrow through.
4. **Try a follow-up** - Type: `Summarize that in 3 bullet points` and press `Enter`. Copilot remembers the context from your first question.

**You're done.** You just had a conversation with an AI about your codebase.

> **What success feels like:** Copilot answered a real question about real files in your repository. You can use this same pattern to ask about code, documentation, or anything else in the project - and the Accessible View ensures you can always read the response.

---

## 11. Smart Actions and Advanced Copilot Features (VS Code 1.120+)

VS Code 1.120 (May 2026) introduced several new Copilot features that accelerate common coding tasks without requiring explicit chat prompts.

### Smart Actions

**Smart Actions** are AI-powered suggestions for common tasks like generating commit messages, renaming symbols, fixing errors, and searching for related code semantically. They appear when you click the lightbulb icon (`Ctrl+.`) or interact with errors.

Common Smart Actions:
- **Generate Commit Message** - Turn staged changes into a descriptive commit message
- **Rename Symbol** - Rename a variable or function and all references at once
- **Fix Error** - Get suggestions to fix compilation, lint, or test errors
- **Semantic Search** - Find conceptually related code (not just text matches)

See [Appendix K: Smart Actions](appendix-k-copilot-reference.md#4c-smart-actions) for full keyboard shortcuts, workflows for all accessibility profiles, and workshop guidance.

### Browser Agent (Experimental)

The **Browser Agent** (experimental) lets your Copilot agent test and validate web applications directly. It can open your app in the integrated browser, verify features, check layouts, and take screenshots.

This is useful for testing accessibility, validating responsive designs, and documenting features visually.

See [Appendix K: Browser Agent (Experimental)](appendix-k-copilot-reference.md#4d-browser-agent-experimental) for examples, accessibility workflows, and testing best practices.

### Plan Agent and Copilot Spaces

The **Plan Agent** breaks complex tasks into step-by-step plans you can review and refine before implementation. **Copilot Spaces** let teams create shared knowledge bases that Copilot uses for more accurate, context-aware answers.

These are advanced features for team workflows and complex refactoring. See [Appendix K: Plan Agent](appendix-k-copilot-reference.md#4e-plan-agent) and [Appendix K: Copilot Spaces](appendix-k-copilot-reference.md#4f-copilot-spaces---team-knowledge-base).

### Copilot Pricing and Free Plan

As of June 1, 2026, GitHub Copilot uses usage-based billing with GitHub AI Credits ($0.01 per credit). Copilot Free is available with monthly usage limits suitable for learning and light use.

- **Free plan:** 50 completions and 2K chat tokens per month
- **Pro plan:** $10/month, unlimited completions and higher chat limits
- **Pro+ plan:** $39/month, agents and cloud features included

See [Appendix K: Copilot Pricing, Free Plan, and Usage Limits](appendix-k-copilot-reference.md#15-copilot-pricing-free-plan-and-usage-limits) for detailed plan comparison, workshop guidance, and usage management tips.

For complete reference material on all Copilot features, keyboard shortcuts, screen reader workflows, and customization, see [Appendix K: Copilot Reference](appendix-k-copilot-reference.md).

---

*Next: [Chapter 17: Issue Templates](17-issue-templates.md)*  
*Back: [Chapter 15: Code Review](15-code-review.md)*  
*Related appendices: [Appendix K: Copilot Reference](appendix-k-copilot-reference.md)*

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
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **AI-Powered Code Assistance in VS Code:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Workshop Recommendation (Chapter 16 / Challenge 13):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **1. What is GitHub Copilot:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **2. Setting Up GitHub Copilot:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **3. Inline Suggestions - Ghost Text Completions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **4. GitHub Copilot Chat - Conversational Assistance:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **5. Copilot Edits — Making Multi-File Changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6. Agent Mode — Let Copilot Drive:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **6A. VS Code 1.120 Agents Window:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **7. Next Edit Suggestions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **8. Copilot on GitHub.com:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **9. Effective Prompting for Documentation Work:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Timeline View - File History:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **10. Custom Instructions vs Custom Agents:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Accessibility Standards:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **Documentation Style:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
