# Curriculum Reorganization Plan

## GIT Going with GitHub -- Chapters and Appendices Restructure

**Status:** Proposal (not yet implemented)
**Branch:** `docs/curriculum-reorganization`
**Date:** March 9, 2026
**Prepared by:** Copilot, reviewed by Jeff


## Executive Summary

The current curriculum has 17 chapters (00-16) and 31 appendices (A-Z, AA-AE) totaling approximately 200,000 words across 49 Markdown files. It grew organically -- chapters were added as topics arose, appendices were bolted on as reference material multiplied. The result:

- **Redundancy** between teaching chapters and reference appendices (Ch5 vs. Appendix M, Ch13 vs. Appendix W, Ch16 vs. Appendix V)
- **Inconsistent depth** -- some appendices are 137 lines (stubs), others are 2,232 lines (full courses)
- **Chapter numbering vs. teaching order mismatch** -- Chapter 5 (VS Code) is file 05 but taught as Day 2 Item 10 in the course-guide
- **Thin appendices** that should be consolidated (R, S, T are each under 200 lines and cover related community/contributor topics)
- **Cross-linking gaps** -- many chapters don't link to their natural reference appendix, and appendices rarely link back to the teaching chapter
- **Missing learning cards** in appendices -- the tri-audience pattern (screen reader, low vision, sighted) exists in chapters but not in most appendices
- **No authoritative source attribution** -- chapters reference GitHub features but rarely link to the official GitHub Docs or VS Code documentation

This plan proposes a reorganization that:
1. Aligns file order with teaching order (no more "Chapter 5 is taught as Day 2 Item 10")
2. Eliminates redundancy by defining clear roles: chapters TEACH, appendices REFERENCE
3. Consolidates thin appendices into logical groups
4. Adds learning cards and cross-links throughout
5. Attributes every claim to authoritative sources


## Problem Analysis

### 1. Redundancy Map

The following pairs contain significant overlapping content:

| Teaching Chapter | Reference Appendix | Overlap |
| --- | --- | --- |
| Ch5: VS Code Accessibility (2,057 lines) | App M: VS Code Accessibility Reference (771 lines) | Settings tables, keyboard shortcuts, screen reader config, audio cues, diff viewer -- both cover the same features with slightly different framing |
| Ch13: GitHub Copilot (1,310 lines) | App W: Copilot Reference (1,039 lines) | Keyboard shortcuts, chat participants, slash commands, custom instructions, modes -- W is essentially Ch13's cheat sheet |
| Ch13: GitHub Copilot (1,310 lines) | App X: Copilot Models (212 lines) | Both discuss model selection; X is a subset that should fold into W |
| Ch16: Accessibility Agents (2,241 lines) | App V: Agents Reference (1,181 lines) | Agent lists, slash commands, configuration levels -- V is a condensed repeat of Ch16 |
| Ch4: Working with Issues (1,071 lines) | Ch15: Issue Templates (2,297 lines) | Ch15 teaches you to create templates for issues already taught in Ch4 -- could be a natural Part 2 |
| Ch6: Working with PRs (1,251 lines) | Ch12: GH PRs Extension (883 lines) + Ch14: Accessible Code Review (1,703 lines) | Three chapters that together form the "PR lifecycle" but are scattered (6 is Day 1, 12 and 14 are Day 2) |

**Decision principle:** Chapters should teach workflows with "just enough" reference. Appendices should be pure reference -- lookup tables, complete settings lists, command cheat sheets. No narrative in appendices. No reference tables duplicated in chapters.


### 2. Thin Appendices That Should Be Consolidated

These appendices are stubs (under 300 lines) that cover related topics:

| Current | Lines | Proposed Merge Target |
| --- | --- | --- |
| App R: Profile, Sponsors, Wikis | 183 | Merge into "GitHub Community and Social" |
| App S: Organizations, Templates | 137 | Merge into "GitHub Community and Social" |
| App T: Contributing to Open Source | 155 | Merge into "Culture, Etiquette, and Contributing" (absorb into expanded Ch8) |
| App AE: GitHub Social | 498 | Becomes the base of "GitHub Community and Social" |
| App F: Gists | 241 | Merge into "GitHub Ecosystem Quick Reference" |
| App O: GitHub Mobile | 224 | Merge into "GitHub Ecosystem Quick Reference" |
| App N: Codespaces | 272 | Merge into either "VS Code and Cloud Editors" or "GitHub Ecosystem Quick Reference" |
| App X: Copilot Models | 212 | Fold into Appendix W (Copilot Reference) |
| App C: Accessibility Standards | 263 | Expand significantly or merge into a "Foundations" chapter |


### 3. Teaching Order vs. File Order Mismatch

The course-guide maps chapters to a different order than their filenames:

| Teaching Slot | Current File | Topic |
| --- | --- | --- |
| Day 1, Item 1 | 00-pre-workshop-setup.md | Setup |
| Day 1, Item 2 | 01-understanding-github... | Web structure |
| Day 1, Item 3 | 02-navigating-repositories | Repos |
| Day 1, Item 4 | 03-the-learning-room | Learning room |
| Day 1, Item 5 | 04-working-with-issues | Issues |
| Day 1, Item 6 | **06**-working-with-pull-requests | PRs (file 06, taught as item 5) |
| Day 1, Item 7 | **07**-merge-conflicts | Conflicts |
| Day 1, Item 8 | **08**-culture-etiquette | Culture |
| Day 1, Item 9 | **09**-labels-milestones-projects | Labels |
| Day 1, Item 10 | **10**-notifications | Notifications |
| Day 2, Item 1 | **05**-vscode-accessibility | VS Code (file 05, taught as Day 2 lead!) |
| Day 2, Item 2 | **11**-git-source-control | Git in VS Code |
| Day 2, Item 3 | **12**-github-pull-requests-ext | PRs in VS Code |
| Day 2, Item 4 | **13**-github-copilot | Copilot |
| Day 2, Item 5 | **14**-accessible-code-review | Code review |
| Day 2, Item 6 | **15**-issue-templates | Issue templates |
| Day 2, Item 7 | **16**-accessibility-agents | Agents |

**The problem:** Chapter 5 (VS Code) is a Day 2 topic stored as file 05 between Day 1 chapters 04 and 06. The course-guide remaps everything with different numbering. Students see "Chapter 5" in the file but "Item 10" in the schedule. Confusing.


### 4. Missing Learning Cards

The tri-audience learning card pattern (screen reader users / low vision users / sighted users) exists in:
- Chapter 5 (extensive -- every section has cards)
- Chapter 11 (several sections)
- Chapter 13 (several sections)

It is **missing** from:
- All 31 appendices
- Chapters 1, 2, 3, 8, 9, 10
- Most of chapters 4, 6, 7, 12, 14, 15, 16


### 5. Missing Authoritative Attribution

Currently, chapters describe GitHub features without linking to the official documentation. For credibility and maintainability, every feature description should cite its source.


## Proposed New Structure

### Design Principles

1. **File order matches teaching order** -- Chapter 01 is the first thing taught, Chapter 17 is the last
2. **Chapters teach, appendices reference** -- no duplication of reference tables in chapters
3. **Every section gets learning cards** -- screen reader, low vision, sighted
4. **Every feature links to its authoritative source** -- GitHub Docs, VS Code Docs
5. **Dense cross-linking** -- forward refs ("you'll learn more in Chapter X"), back refs ("as you learned in Chapter Y"), and appendix refs ("see Appendix N for the complete list")
6. **Appendices are grouped by domain** -- not scattered alphabetically
7. **Thin appendices are consolidated** -- no stub documents under 300 lines


### New Chapter Sequence

File numbers now match the teaching order. No more "Chapter 5 is Day 2."

#### Day 1: GitHub Foundations (Browser)

| New # | New Filename | Content (source) | Key Changes |
| --- | --- | --- | --- |
| 00 | 00-pre-workshop-setup.md | Setup (current 00) | Add learning cards. Link to authoritative GitHub account setup docs. |
| 01 | 01-github-web-structure.md | Web structure (current 01) | Add learning cards. Add authoritative source: [GitHub Docs: Keyboard shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts), [GitHub Docs: Command Palette](https://docs.github.com/en/get-started/accessibility/github-command-palette). |
| 02 | 02-navigating-repositories.md | Repos (current 02) | Add learning cards. Source: [GitHub Docs: About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories). |
| 03 | 03-the-learning-room.md | Learning room (current 03) | Largely unchanged. This is project-specific. |
| 04 | 04-working-with-issues.md | Issues (current 04) | Add learning cards to all sections. Source: [GitHub Docs: About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues). Move reference tables to Appendix. |
| 05 | 05-working-with-pull-requests.md | PRs (current 06) | **Renumbered from 06 to 05.** Add learning cards. Source: [GitHub Docs: About PRs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). |
| 06 | 06-merge-conflicts.md | Conflicts (current 07) | **Renumbered from 07 to 06.** Add learning cards. |
| 07 | 07-culture-etiquette-contributing.md | Culture + Contributing (current 08 + App T) | **Absorb Appendix T** (Contributing to Open Source) into this chapter. Expand significantly. Add learning cards. Source: [GitHub Docs: Contributing to projects](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project). |
| 08 | 08-labels-milestones-projects.md | Labels/Projects (current 09) | **Renumbered from 09 to 08.** Add learning cards. Source: [GitHub Docs: About labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels), [GitHub Docs: About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects). |
| 09 | 09-notifications.md | Notifications (current 10) | **Renumbered from 10 to 09.** Add learning cards. Source: [GitHub Docs: About notifications](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/about-notifications). |

#### Bridge: github.dev

The bridge from Day 1 to Day 2 stays as a section within the VS Code chapter (now Chapter 10), not a separate chapter.

#### Day 2: VS Code + Agents (Desktop)

| New # | New Filename | Content (source) | Key Changes |
| --- | --- | --- | --- |
| 10 | 10-vscode-accessibility.md | VS Code basics (current 05) | **Renumbered from 05 to 10.** Remove all reference tables (move to Appendix M). Keep ONLY teaching narrative, workflow walkthroughs, and learning cards. Reference Appendix M for complete settings/shortcuts lists. |
| 11 | 11-git-source-control.md | Git in VS Code (current 11) | No renumber needed. Add learning cards to remaining sections. |
| 12 | 12-pull-requests-in-vscode.md | PRs Extension + Code Review (current 12 + 14) | **Merge Ch12 and Ch14** into one "Pull Requests in VS Code" chapter. Part 1: the extension (viewing, creating, managing PRs). Part 2: accessible code review (diffs, comments, approval). Eliminates the scattered PR story. Source: [VS Code Docs: GitHub Pull Requests](https://code.visualstudio.com/docs/sourcecontrol/github). |
| 13 | 13-github-copilot.md | Copilot (current 13) | Remove reference tables (move to Appendix). Keep teaching focus. Add learning cards where missing. Source: [GitHub Docs: GitHub Copilot](https://docs.github.com/en/copilot). |
| 14 | 14-issue-templates.md | Issue templates (current 15) | **Renumbered from 15 to 14.** Add more learning cards. Source: [GitHub Docs: Configuring issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository). |
| 15 | 15-accessibility-agents.md | Agents (current 16) | **Renumbered from 16 to 15.** Remove agent/command reference tables (already in Appendix V). Keep teaching narrative, exercises. |
| 16 | 16-capstone-and-next-steps.md | **NEW** | New capstone chapter. Pulls together the "Share Your Feedback" exercise from Ch16, links to all appendices for continued learning, provides a "What's Next" roadmap, celebrates completion. |


### New Appendix Structure

Appendices are reorganized into **6 domains** with consistent lettering. Thin stubs are consolidated. Every appendix gets:
- A standard header with "What this appendix covers" and "Related chapters"
- Learning cards (screen reader / low vision / sighted) for each major section
- Authoritative source links
- Cross-links back to the teaching chapter(s)

#### Domain 1: Core Reference (Always-Open)

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| A | Glossary | Current A (637 lines) | [GitHub Glossary](https://docs.github.com/en/get-started/learning-about-github/github-glossary), [Git Glossary](https://git-scm.com/docs/gitglossary) |
| B | Screen Reader Navigation Cheat Sheet | Current B (674 lines) | [GitHub Docs: Keyboard shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts), [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html), [JAWS Quick Start](https://support.freedomscientific.com/Products/Blindness/JAWSDocumentation), [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac) |
| C | Markdown and GitHub Flavored Markdown | Current E (2,232 lines) | [GitHub Docs: Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) |

**Why:** A, B, and C are the three documents students will have open the entire workshop. Glossary, screen reader commands, and Markdown. By making Markdown "Appendix C" instead of "Appendix E," it moves to the front where it belongs.

#### Domain 2: Git and Authentication

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| D | Git Authentication | Current D (359 lines) | [GitHub Docs: Authenticating to GitHub](https://docs.github.com/en/authentication), [Git credential storage](https://git-scm.com/docs/gitcredentials) |
| E | Advanced Git Operations | Current AA (874 lines) | [Pro Git Book](https://git-scm.com/book/en/v2), [GitHub Docs: Using Git](https://docs.github.com/en/get-started/using-git) |
| F | Git Security for Contributors | Current AD (554 lines) | [GitHub Docs: Secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning), [GitHub Docs: Push protection](https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/push-protection-for-users) |

#### Domain 3: VS Code and Development Tools

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| G | VS Code Accessibility Reference | Current M (771 lines) -- **expanded** | [VS Code Docs: Accessibility](https://code.visualstudio.com/docs/editor/accessibility), [VS Code Docs: Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings), [VS Code Docs: Profiles](https://code.visualstudio.com/docs/editor/profiles), [VS Code Docs: Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync) |
| H | GitHub Desktop | Current AB (478 lines) | [GitHub Desktop Docs](https://docs.github.com/en/desktop) |
| I | GitHub CLI Reference | Current AC (715 lines) | [GitHub CLI Manual](https://cli.github.com/manual/), [GitHub Docs: GitHub CLI](https://docs.github.com/en/github-cli) |
| J | GitHub Codespaces and Cloud Editors | Current N (272 lines) -- **expanded** to include github.dev reference | [GitHub Docs: Codespaces](https://docs.github.com/en/codespaces), [VS Code Docs: vscode.dev](https://code.visualstudio.com/docs/editor/vscode-web) |

**Key change:** Appendix G (VS Code Reference) becomes the single source of truth for all VS Code settings, shortcuts, and configuration. Chapter 10 (VS Code) teaches workflows and links to Appendix G for lookup tables. No more duplication.

#### Domain 4: GitHub Copilot and AI

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| K | GitHub Copilot Reference | Current W + X merged (1,039 + 212 = 1,251 lines) | [GitHub Docs: GitHub Copilot](https://docs.github.com/en/copilot), [GitHub Docs: Copilot in VS Code](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment), [GitHub Docs: Custom agents](https://docs.github.com/en/copilot/customizing-copilot/building-copilot-extensions/building-a-copilot-agent) |
| L | Accessibility Agents Reference | Current V (1,181 lines) | Project-specific; link to [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) |

**Key change:** Copilot models (current X) fold into the Copilot Reference (current W). One document instead of two. Chapter 13 teaches Copilot workflows; Appendix K holds the lookup tables.

#### Domain 5: GitHub Platform Features

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| M | Accessibility Standards and WCAG | Current C (263 lines) -- **significantly expanded** | [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apd/), [GitHub Docs: Accessibility](https://docs.github.com/en/get-started/accessibility) |
| N | Advanced Search | Current J (310 lines) | [GitHub Docs: Searching on GitHub](https://docs.github.com/en/search-github/searching-on-github) |
| O | Branch Protection and Rulesets | Current K (319 lines) | [GitHub Docs: About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [GitHub Docs: About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) |
| P | GitHub Security Features | Current L (358 lines) | [GitHub Docs: Code security](https://docs.github.com/en/code-security) |
| Q | GitHub Actions and Workflows | Current Q (496 lines) | [GitHub Docs: Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) |
| R | GitHub Projects Deep Dive | Current I (510 lines) | [GitHub Docs: About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) |
| S | Releases, Tags, and Insights | Current H (534 lines) | [GitHub Docs: About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases), [GitHub Docs: Repository activity view](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository) |

#### Domain 6: GitHub Community, Ecosystem, and Continuing

| New Letter | Title | Source | Authoritative Links |
| --- | --- | --- | --- |
| T | GitHub Community and Social | **Merge of:** current AE (498) + R (183) + S (137) = ~818 lines | [GitHub Docs: Setting up your profile](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile), [GitHub Docs: GitHub Sponsors](https://docs.github.com/en/sponsors), [GitHub Docs: About wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis), [GitHub Docs: About organizations](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) |
| U | GitHub Discussions and Gists | **Merge of:** current G (257) + F (241) = ~498 lines | [GitHub Docs: About discussions](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/about-discussions), [GitHub Docs: Creating gists](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists) |
| V | GitHub Mobile | Current O (224 lines) -- **expanded** with more TalkBack/VoiceOver depth | [GitHub Docs: GitHub Mobile](https://docs.github.com/en/get-started/using-github/github-mobile) |
| W | GitHub Pages | Current P (357 lines) | [GitHub Docs: About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) |
| X | Resources, Links, and Further Reading | Current U (846 lines) | All external links verified and categorized |
| Y | Accessing and Downloading Workshop Materials | Current Y (189 lines) | Updated with new appendix counts. Source: project-specific |
| Z | GitHub Skills Course Catalog | Current Z (288 lines) | [GitHub Skills](https://skills.github.com/) |

**Net result:** From 31 appendices (A-Z, AA-AE) to **26 appendices (A-Z)**. Clean A-Z. No AA-AE overflow. Every appendix is at least 300 lines (no stubs).


### Consolidation Summary

| Action | Old | New | Lines Saved |
| --- | --- | --- | --- |
| Merge App R + S + AE into T | 3 files (818 lines) | 1 file (~700 lines, deduplicated) | ~118 |
| Merge App G + F into U | 2 files (498 lines) | 1 file (~450 lines) | ~48 |
| Merge App W + X into K | 2 files (1,251 lines) | 1 file (~1,100 lines) | ~151 |
| Merge Ch12 + Ch14 into Ch12 | 2 files (2,586 lines) | 1 file (~2,200 lines) | ~386 |
| Absorb App T into Ch7 | 1 appendix (155 lines) absorbed | 0 extra files | 1 file eliminated |
| Move reference tables from Ch5 to App G | Redundant content | Single source of truth | ~200 lines of duplication eliminated |
| Move reference tables from Ch13 to App K | Redundant content | Single source of truth | ~150 lines of duplication eliminated |


## Cross-Linking Strategy

### Every Chapter Gets These Links

1. **Header block:** "Related appendices: [A](link), [G](link)" -- the 2-3 most relevant appendices
2. **Authoritative sources block:** 2-5 official docs links at the chapter top
3. **Inline forward refs:** "You'll practice this in [Chapter 12](link)" when introducing a concept used later
4. **Inline back refs:** "As you learned in [Chapter 4](link)" when building on prior knowledge
5. **Section-level appendix refs:** Within each section, link to the specific appendix section (e.g., "See [Appendix G, Section 5](link) for the complete keyboard shortcuts table")
6. **Footer navigation:** Previous / Next / Related chapters AND Related appendices

### Every Appendix Gets These Links

1. **Header block:** "This is the reference companion to [Chapter X](link)" -- the primary teaching chapter
2. **Authoritative sources block:** Official docs that this appendix summarizes
3. **Section-level chapter refs:** "This table supports [Chapter X, Section Y](link)" for each major reference table
4. **Footer navigation:** Previous / Next appendix + Teaching chapter link


## Learning Cards Strategy

### Pattern

Every major section (h2 or significant h3) in every chapter and appendix gets a tri-audience learning card:

```markdown
### Learning Cards: [Section Name]

<details>
<summary>Screen reader users</summary>

- Bullet: what to listen for, keyboard sequence, what the screen reader announces
- Bullet: common gotcha or tip specific to screen reader workflow
- Bullet: cross-reference to appendix for complete reference

</details>

<details>
<summary>Low vision users</summary>

- Bullet: what visual change to expect, where to look
- Bullet: zoom, contrast, or theme tip relevant to this section
- Bullet: cross-reference to appendix for related settings

</details>

<details>
<summary>Sighted users</summary>

- Bullet: what visual indicator to look for
- Bullet: UI navigation tip (where to click, what icon)
- Bullet: cross-reference to appendix for screenshots or visual guides

</details>
```

### Coverage Target

| Document Type | Current Coverage | Target |
| --- | --- | --- |
| Chapters with extensive cards | Ch5, Ch11, Ch13 | All 17 chapters |
| Chapters with some cards | Ch4, Ch6, Ch14, Ch15, Ch16 | Complete coverage in every section |
| Chapters with no cards | Ch1, Ch2, Ch3, Ch7, Ch8, Ch9, Ch10, Ch12 | Add to every major section |
| Appendices with cards | None | Add to every major section in all 26 appendices |

**Estimated new learning cards:** ~200-250 card sets across the entire curriculum.


## Authoritative Source Attribution

### Source Registry

Every GitHub feature, VS Code feature, and Git concept links to its canonical documentation. Here is the master registry:

#### GitHub Platform

| Topic | Authoritative Source |
| --- | --- |
| Account setup | [docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account) |
| Keyboard shortcuts | [docs.github.com/en/get-started/accessibility/keyboard-shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts) |
| Command palette | [docs.github.com/en/get-started/accessibility/github-command-palette](https://docs.github.com/en/get-started/accessibility/github-command-palette) |
| Accessibility settings | [docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-user-account-settings/managing-accessibility-settings](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-user-account-settings/managing-accessibility-settings) |
| Repositories | [docs.github.com/en/repositories](https://docs.github.com/en/repositories) |
| Issues | [docs.github.com/en/issues](https://docs.github.com/en/issues) |
| Pull requests | [docs.github.com/en/pull-requests](https://docs.github.com/en/pull-requests) |
| Code review | [docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) |
| Notifications | [docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github) |
| Issue templates | [docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests) |
| Labels and milestones | [docs.github.com/en/issues/using-labels-and-milestones-to-track-work](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work) |
| Projects | [docs.github.com/en/issues/planning-and-tracking-with-projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects) |
| Discussions | [docs.github.com/en/discussions](https://docs.github.com/en/discussions) |
| GitHub Actions | [docs.github.com/en/actions](https://docs.github.com/en/actions) |
| GitHub Pages | [docs.github.com/en/pages](https://docs.github.com/en/pages) |
| GitHub Mobile | [docs.github.com/en/get-started/using-github/github-mobile](https://docs.github.com/en/get-started/using-github/github-mobile) |
| Codespaces | [docs.github.com/en/codespaces](https://docs.github.com/en/codespaces) |
| Branch protection | [docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) |
| Rulesets | [docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets) |
| Security features | [docs.github.com/en/code-security](https://docs.github.com/en/code-security) |
| GitHub CLI | [cli.github.com/manual](https://cli.github.com/manual/) |
| GitHub Desktop | [docs.github.com/en/desktop](https://docs.github.com/en/desktop) |
| GitHub Sponsors | [docs.github.com/en/sponsors](https://docs.github.com/en/sponsors) |
| Organizations | [docs.github.com/en/organizations](https://docs.github.com/en/organizations) |
| GitHub Skills | [skills.github.com](https://skills.github.com/) |
| GitHub Glossary | [docs.github.com/en/get-started/learning-about-github/github-glossary](https://docs.github.com/en/get-started/learning-about-github/github-glossary) |

#### GitHub Copilot

| Topic | Authoritative Source |
| --- | --- |
| Copilot overview | [docs.github.com/en/copilot](https://docs.github.com/en/copilot) |
| Copilot in VS Code | [docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment) |
| Chat in IDE | [docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide) |
| Custom instructions | [docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) |
| Custom agents | [docs.github.com/en/copilot/customizing-copilot/building-copilot-extensions](https://docs.github.com/en/copilot/customizing-copilot/building-copilot-extensions) |
| MCP servers | [docs.github.com/en/copilot/customizing-copilot/extending-the-functionality-of-github-copilot-in-your-ide](https://docs.github.com/en/copilot/customizing-copilot/extending-the-functionality-of-github-copilot-in-your-ide) |

#### VS Code

| Topic | Authoritative Source |
| --- | --- |
| Accessibility | [code.visualstudio.com/docs/editor/accessibility](https://code.visualstudio.com/docs/editor/accessibility) |
| Keyboard shortcuts | [code.visualstudio.com/docs/getstarted/keybindings](https://code.visualstudio.com/docs/getstarted/keybindings) |
| Profiles | [code.visualstudio.com/docs/editor/profiles](https://code.visualstudio.com/docs/editor/profiles) |
| Settings Sync | [code.visualstudio.com/docs/editor/settings-sync](https://code.visualstudio.com/docs/editor/settings-sync) |
| Source control | [code.visualstudio.com/docs/sourcecontrol/overview](https://code.visualstudio.com/docs/sourcecontrol/overview) |
| GitHub integration | [code.visualstudio.com/docs/sourcecontrol/github](https://code.visualstudio.com/docs/sourcecontrol/github) |
| Terminal | [code.visualstudio.com/docs/terminal/basics](https://code.visualstudio.com/docs/terminal/basics) |
| vscode.dev | [code.visualstudio.com/docs/editor/vscode-web](https://code.visualstudio.com/docs/editor/vscode-web) |

#### Git

| Topic | Authoritative Source |
| --- | --- |
| Git reference | [git-scm.com/docs](https://git-scm.com/docs) |
| Pro Git book | [git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) |
| Git glossary | [git-scm.com/docs/gitglossary](https://git-scm.com/docs/gitglossary) |
| Git credentials | [git-scm.com/docs/gitcredentials](https://git-scm.com/docs/gitcredentials) |

#### Accessibility Standards

| Topic | Authoritative Source |
| --- | --- |
| WCAG 2.2 | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) |
| ARIA Authoring Practices | [w3.org/WAI/ARIA/apd](https://www.w3.org/WAI/ARIA/apd/) |
| WAI overview | [w3.org/WAI](https://www.w3.org/WAI/) |

#### Screen Readers

| Topic | Authoritative Source |
| --- | --- |
| NVDA | [nvaccess.org/files/nvda/documentation/userGuide.html](https://www.nvaccess.org/files/nvda/documentation/userGuide.html) |
| JAWS | [support.freedomscientific.com/Products/Blindness/JAWSDocumentation](https://support.freedomscientific.com/Products/Blindness/JAWSDocumentation) |
| VoiceOver (Mac) | [support.apple.com/guide/voiceover/welcome/mac](https://support.apple.com/guide/voiceover/welcome/mac) |
| VoiceOver (iOS) | [support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) |
| TalkBack | [support.google.com/accessibility/android/answer/6283677](https://support.google.com/accessibility/android/answer/6283677) |
| Narrator | [support.microsoft.com/en-us/windows/complete-guide-to-narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) |


## File Rename Map

For implementation, every file rename is tracked here so that cross-references, the podcast feed, HTML builds, and the course-guide all get updated atomically. 

### Chapter Renames

| Old Filename | New Filename | Reason |
| --- | --- | --- |
| 05-vscode-accessibility.md | 10-vscode-accessibility.md | Align with Day 2 slot 1 |
| 06-working-with-pull-requests.md | 05-working-with-pull-requests.md | Align with Day 1 slot 6 |
| 07-merge-conflicts.md | 06-merge-conflicts.md | Sequential |
| 08-culture-etiquette.md | 07-culture-etiquette-contributing.md | Absorb App T, rename |
| 09-labels-milestones-projects.md | 08-labels-milestones-projects.md | Sequential |
| 10-notifications.md | 09-notifications.md | Sequential |
| 12-github-pull-requests-extension.md | (merged into 12-pull-requests-in-vscode.md) | Merge with Ch14 |
| 14-accessible-code-review.md | (merged into 12-pull-requests-in-vscode.md) | Merge with Ch12 |
| 15-issue-templates.md | 14-issue-templates.md | Sequential |
| 16-accessibility-agents.md | 15-accessibility-agents.md | Sequential |
| (new) | 16-capstone-and-next-steps.md | New capstone chapter |

### Appendix Renames

| Old Filename | New Filename | Reason |
| --- | --- | --- |
| appendix-e-github-flavored-markdown.md | appendix-c-markdown-and-gfm.md | Promote to Domain 1 |
| appendix-c-accessibility-standards.md | appendix-m-accessibility-standards.md | Move to Domain 5 |
| appendix-aa-advanced-git.md | appendix-e-advanced-git.md | Move to Domain 2 |
| appendix-ad-git-security.md | appendix-f-git-security.md | Move to Domain 2 |
| appendix-m-vscode-accessibility-reference.md | appendix-g-vscode-accessibility-reference.md | Move to Domain 3 |
| appendix-ab-github-desktop.md | appendix-h-github-desktop.md | Move to Domain 3 |
| appendix-ac-github-cli.md | appendix-i-github-cli.md | Move to Domain 3 |
| appendix-n-github-codespaces.md | appendix-j-codespaces-and-cloud-editors.md | Move to Domain 3, expand |
| appendix-w + appendix-x | appendix-k-github-copilot-reference.md | Merge, move to Domain 4 |
| appendix-v-accessibility-agents-reference.md | appendix-l-accessibility-agents-reference.md | Move to Domain 4 |
| appendix-j-advanced-search.md | appendix-n-advanced-search.md | Move to Domain 5 |
| appendix-k-branch-protection-rulesets.md | appendix-o-branch-protection-rulesets.md | Move to Domain 5 |
| appendix-l-github-security-features.md | appendix-p-github-security-features.md | Move to Domain 5 |
| appendix-q-github-actions-workflows.md | appendix-q-github-actions.md | Same letter, stays |
| appendix-i-github-projects.md | appendix-r-github-projects.md | Move to Domain 5 |
| appendix-h-releases-tags-insights.md | appendix-s-releases-tags-insights.md | Move to Domain 5 |
| appendix-ae + appendix-r + appendix-s | appendix-t-github-community-and-social.md | Merge 3 into Domain 6 |
| appendix-g + appendix-f | appendix-u-discussions-and-gists.md | Merge 2 into Domain 6 |
| appendix-o-github-mobile.md | appendix-v-github-mobile.md | Move to Domain 6 |
| appendix-p-github-pages.md | appendix-w-github-pages.md | Move to Domain 6 |
| appendix-u-resources.md | appendix-x-resources.md | Move to Domain 6 |
| appendix-y (stays) | appendix-y-accessing-workshop-materials.md | Same |
| appendix-z (stays) | appendix-z-github-skills-catalog.md | Same |
| appendix-t-contributing-to-open-source.md | (absorbed into chapter 07) | Eliminated |


## Implementation Phases

This reorganization is large. It should be done in phases, each independently shippable.

### Phase 1: Chapter Renumber and Reorder (Estimated: 1 session)

1. Rename chapter files to new numbers
2. Update all cross-references between chapters
3. Update course-guide.md chapter table
4. Update README.md file tree
5. Update GITHUB_PROPOSAL.md counts
6. Verify all internal links work

### Phase 2: Appendix Consolidation (Estimated: 2-3 sessions)

1. Merge thin appendices (R+S+AE into T, G+F into U, W+X into K)
2. Absorb App T into Ch7
3. Rename remaining appendices to new letters
4. Update all appendix cross-references
5. Update course-guide.md appendix tables
6. Add Domain headers to each appendix group

### Phase 3: Redundancy Elimination (Estimated: 2-3 sessions)

1. Extract reference tables from Ch5 into Appendix G (VS Code Reference)
2. Extract reference tables from Ch13 into Appendix K (Copilot Reference)
3. Merge Ch12 + Ch14 into new Ch12 (Pull Requests in VS Code)
4. Create new Ch16 (Capstone and Next Steps)
5. Replace extracted tables with cross-links to appendices
6. Verify no content is lost

### Phase 4: Learning Cards (Estimated: 3-4 sessions)

1. Add learning cards to Chapters 1, 2, 3, 7, 8, 9, 10, 12
2. Complete partial learning cards in Chapters 4, 6, 14, 15, 16
3. Add learning cards to all 26 appendices
4. Estimated ~200-250 new learning card sets

### Phase 5: Authoritative Sources + Cross-Links (Estimated: 2-3 sessions)

1. Add authoritative source blocks to every chapter header
2. Add authoritative source blocks to every appendix header
3. Add inline cross-links (forward refs, back refs, appendix refs)
4. Add "Related chapters" and "Related appendices" to all footers
5. Verify all external links are live and correct

### Phase 6: Expand Thin Content (Estimated: 2-3 sessions)

1. Expand Appendix M (Accessibility Standards) from 263 to 600+ lines
2. Expand Appendix J (Codespaces) from 272 to 500+ lines
3. Expand Appendix V (GitHub Mobile) from 224 to 400+ lines
4. Expand Chapter 7 (now includes Contributing to Open Source)
5. Write Chapter 16 (Capstone and Next Steps)

### Phase 7: Verification and Polish (Estimated: 1-2 sessions)

1. Run full internal link check across all 43+ documents
2. Update podcast feed episode mappings
3. Rebuild HTML output
4. Update all file counts in README, GITHUB_PROPOSAL, course-guide
5. Final read-through for consistency


## What Changes for Students

| Before | After |
| --- | --- |
| "Open Chapter 5" but it's taught on Day 2 | Chapter 10 is Day 2 -- numbers match |
| Look up a shortcut in Ch5 or maybe Appendix M? | Shortcuts are in Appendix G always (Ch10 links to it) |
| 31 appendices (A-Z, AA-AE) | 26 appendices (A-Z) with logical domain grouping |
| No learning cards in most chapters | Every section has screen reader / low vision / sighted cards |
| No source attribution | Every feature links to its official documentation |
| Scattered PR chapters (6, 12, 14) | Day 1 PR (Ch5) + Day 2 PR (Ch12 with integrated code review) |
| Stub appendices (R, S, T each under 200 lines) | Consolidated into substantial documents |
| No cross-links between chapters and appendices | Dense bidirectional linking |


## What Does NOT Change

- The two-day structure (Day 1 browser, Day 2 desktop)
- The "learn the skill first, then see it automated" principle
- The Learning Room practice repository
- The podcast episode per chapter/appendix
- The exercise structure ("Try It" pattern)
- The classroom.md challenges document (separate branch)
- The Accessibility Agents ecosystem (Ch15 + App L)


## Open Questions

1. **Should the course-guide teaching numbers match file numbers exactly?** This plan makes them match, but it requires renaming 10+ files and updating 100+ cross-references. The alternative: keep file numbers as-is and accept the indirection (current approach, with better documentation in course-guide).

2. **Should we create a "master cross-reference index" document?** A single document listing every chapter-to-appendix relationship, every exercise, every learning card. Useful for facilitators; possibly overwhelming for students.

3. **How to handle podcast episode numbering?** If chapters renumber, do podcast episodes renumber too? Or keep original episode numbers with a mapping?


## Next Steps

1. Review this plan
2. Decide on open questions
3. Begin Phase 1 implementation
4. Each phase gets its own PR for review before merge


*This document lives on the `docs/curriculum-reorganization` branch and will be updated as decisions are made.*
