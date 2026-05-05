# Quick Reference Guide
## Essential Commands, Shortcuts, and File Locations


## Screen Reader Commands for GitHub

### NVDA (Windows)

| Task | Command |
|------|---------|
| Jump to navigation | `D` |
| Jump to search/main content | `D` (cycle through landmarks) |
| Read next heading | `H` |
| Navigate by heading level | `1`-`6` (headings), `T` (table), `B` (button), `L` (list) |
| Open Focus Mode | `NVDA+Space` (then navigate) |
| Announce current line | `NVDA+Up` |
| Read all from cursor | `NVDA+Down` |
| Stop reading | `Control` |
| Go to link list | `NVDA+F7` |
| Switch to Browse Mode | `NVDA+Space` (in a page) |

### JAWS (Windows)

| Task | Command |
|------|---------|
| Virtual cursor browse | `Spacebar` |
| Navigate headings | `H` or `Numpad 5` |
| Navigate by level | `1`-`6` |
| Open navigation bar | `Insert+F5` |
| List links | `Insert+Ctrl+L` |
| List headings | `Insert+F6` |
| Toggle Focus Mode | `Enter` (on a page) |
| Announce all text | `Insert+Down` |
| Stop reading | `Control` |

### VoiceOver (macOS)

| Task | Command |
|------|---------|
| Navigate web rotor | `VO+U` |
| Next/previous heading | `VO+Down`, `VO+Up` |
| Next/previous link | `VO+Right`, `VO+Left` (with Quick Nav) |
| Activate element | `VO+Space` |
| Read from cursor | `VO+A` |
| Stop reading | `Control` |
| Headings rotor | `VO+U` → `H` (then navigate) |
| Form controls rotor | `VO+U` → `F` |


## GitHub Navigation Shortcuts (All Browsers)

| Action | Keyboard |
|--------|----------|
| Open command palette | `Cmd+.` (macOS) / `Ctrl+.` (Windows) |
| Jump to Issues | `G` then `I` |
| Jump to Pull Requests | `G` then `P` |
| Jump to Projects | `G` then `B` |
| Open issue/PR | `O` then `Enter` |
| Navigate PR tabs (Conversation/Commits/Files) | `←` / `→` Arrow keys |
| Focus on search | `S` or `/` |
| Go to code | `G` then `C` |


## VS Code Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Open Copilot Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| Open terminal | `Ctrl+` ` | `Ctrl+` ` |
| Open file search | `Ctrl+P` | `Cmd+P` |
| Find in file | `Ctrl+F` | `Cmd+F` |
| Replace in file | `Ctrl+H` | `Cmd+H` |
| Open command palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Extensions | `Ctrl+Shift+X` | `Cmd+Shift+X` |
| Reload window | (see command palette) | (see command palette) |
| Accessible Diff Viewer | `F7` | `F7` |
| Accessible View | `Alt+F2` | `Option+F2` |
| Format document | `Shift+Alt+F` | `Shift+Option+F` |


## Git Commands (Terminal)

### Repository Setup
```bash
git clone https://github.com/[USERNAME]/[REPO].git    # Clone your fork
cd [REPO]                                               # Enter folder
git remote -v                                           # View remotes
git remote add upstream https://github.com/[ORIGINAL]   # Add upstream
```

### Branch Workflow
```bash
git checkout -b [branch-name]           # Create and switch to branch
git branch -a                            # List all branches
git branch -d [branch-name]              # Delete local branch
git push origin [branch-name]            # Push branch to GitHub
```

### Staging and Committing
```bash
git status                               # See what changed
git add [file]                           # Stage specific file
git add .                                # Stage all changes
git commit -m "message"                  # Commit with message
git push origin [branch-name]            # Push commits
```

### Pulling Updates
```bash
git pull origin main                     # Pull latest from your fork
git pull upstream main                   # Pull latest from upstream
git fetch upstream                       # Fetch without merging
```


## File Locations Reference

### Template & Agent Files
```
.github/
├── ISSUE_TEMPLATE/
│   ├── accessibility-bug.yml            ← Accessibility issue template
│   ├── bug-report-template.yml
│   └── feature-request.yml
├── agents/
│   ├── daily-briefing.agent.md
│   ├── issue-tracker.agent.md
│   ├── pr-review.agent.md
│   ├── analytics.agent.md
│   ├── insiders-a11y-tracker.agent.md
│   └── template-builder.agent.md        ← The agent for building templates
├── pull_request_template.md             ← Default PR template
├── workflows/
│   ├── learning-room-pr-bot.yml
│   ├── skills-progression.yml
│   └── student-grouping.yml
└── data/
    ├── challenge-progression.json
    └── student-roster.json
```

### Documentation Files
```
docs/
├── 00-pre-workshop-setup.md             ← Start here
├── 02-understanding-github.md
├── 05-working-with-issues.md            ← File issues
├── 06-working-with-pull-requests.md     ← Review PRs
├── 15-code-review.md         ← Day 2 manual skill
├── 17-issue-templates.md                ← Design templates (manual)
├── 19-accessibility-agents.md                    ← Automate with agents
└── appendix-a-glossary.md               ← Term definitions
```


## YAML Template Structure (Quick Template)

```yaml
name: Your Template Name
description: One line description
title: "[TAG] "
labels: ["label1", "label2"]

body:
  - type: markdown
    attributes:
      value: |
        ## Before you begin
        Please search for existing issues.

  - type: input
    id: version
    attributes:
      label: Version Number
      placeholder: "e.g., v2.4.1"
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Explain what happened
      placeholder: "I was trying to... then..."
    validations:
      required: true

  - type: dropdown
    id: browser
    attributes:
      label: Browser
      options:
        - Chrome
        - Firefox
        - Safari
    validations:
      required: true

  - type: checkboxes
    id: checks
    attributes:
      label: Before Submitting
      options:
        - label: I searched for existing issues
          required: true
```


## Accessibility Testing Checklist (Quick)

- [ ] All form labels announced by screen reader
- [ ] Required fields marked and announced as required
- [ ] Dropdown options readable and selectable
- [ ] No labels skipped (heading hierarchy: 1→2→3, not 1→3)
- [ ] Link text is descriptive (not "click here")
- [ ] Color not the only way to convey information
- [ ] Tested on: NVDA JAWS VoiceOver


## Common YAML Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Red squiggles on colons | Missing colon after key | Add `:` after field name |
| Indentation errors | Mixed spaces/tabs | Use spaces only (2 or 4) |
| Unmatched quotes | Missing closing quote | Check all `"` have closing pair |
| Field not showing | Wrong `type:` or missing `id:` | Verify field has all required properties |
| Dropdown no options | Missing `options:` list | Add `options:` with indented list |


## Where to Find Help

| Topic | File |
|-------|------|
| Troubleshooting | `TROUBLESHOOTING.md` |
| Resources & setup | `docs/appendix-x-resources.md` |
| Glossary & terms | `docs/appendix-a-glossary.md` |
| Screen reader guide | `docs/appendix-b-screen-reader-cheatsheet.md` |


## Accessibility Hotkeys Summary

**NVDA + JAWS (same):** Browse web content with H (headings), T (tables), B (buttons), L (lists)  
**VoiceOver:** Use VO+U to open rotor, then navigate by category (Headings, Links, Form Controls)  
**VS Code:** F7 = Accessible Diff, Alt+F2 = Accessible View


*Last updated: February 2026 | For latest, see README.md*
