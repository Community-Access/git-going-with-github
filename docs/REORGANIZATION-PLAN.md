# The Definitive Guide: Curriculum Master Plan

## Git Going with GitHub -- From Student to Contributor in Two Days

**Status:** Proposal (not yet implemented)
**Branch:** `docs/curriculum-reorganization`
**Date:** March 9, 2026
**Prepared by:** Copilot, reviewed by Jeff

> This is both a course and a definitive resource. Students leave with a merged pull request on a real open source project. Everything in this plan -- every chapter, every appendix, every challenge, every learning card -- serves that destination.

---

## Table of Contents

1. [The Vision](#the-vision)
2. [Current State Analysis](#current-state-analysis)
3. [Design Principles](#design-principles)
4. [The New Chapter Sequence](#the-new-chapter-sequence)
5. [Challenge-to-Chapter Mapping](#challenge-to-chapter-mapping)
6. [The New Appendix Structure](#the-new-appendix-structure)
7. [The Classroom Engine](#the-classroom-engine)
8. [Failsafe Design System](#failsafe-design-system)
9. [Learning Cards System](#learning-cards-system)
10. [Multi-Tool-Path System](#multi-tool-path-system)
11. [Cross-Linking Strategy](#cross-linking-strategy)
12. [Authoritative Source Registry](#authoritative-source-registry)
13. [Consolidation Ledger](#consolidation-ledger)
14. [File Rename Map](#file-rename-map)
15. [Implementation Roadmap](#implementation-roadmap)

---

## The Vision

Most workshops end with "congratulations, you completed the exercises." This one ends differently.

The final challenge is a real contribution to a real project -- the [accessibility-agents](https://github.com/Community-Access/accessibility-agents) ecosystem. Students design a custom Copilot agent, write its instructions, and open a pull request. If the agent is good, it gets merged. If it gets merged, it becomes part of the toolset that the next cohort uses.

**That is the loop:** today's students build the tools that tomorrow's students learn from.

The curriculum serves two audiences simultaneously:

| Audience | What they need | How the curriculum delivers |
|---|---|---|
| **Workshop students** | Instructor-led, hand-held, two-day arc from zero to contributor | 22 chapters in teaching order, 16 challenges with evidence templates, buddy system, failsafe design |
| **Self-study readers** | Definitive reference they return to for years | 26 appendices organized by domain, authoritative source links, dense cross-referencing, complete coverage of every GitHub and Git concept |

Both audiences use the same files. The difference is pacing, not content.

### The Student Journey

```text
Day 1 Morning     "I have never used GitHub"
       |
Day 1 Midday      "I just filed an issue and started a pull request"
       |
Day 1 Afternoon   "I resolved a merge conflict and got my PR merged"
       |
Day 2 Morning     "I understand how Git actually works under the hood"
       |
Day 2 Midday      "I just used AI to improve documentation and reviewed
                    a classmate's code"
       |
Day 2 Afternoon   "I built an accessibility agent and opened a PR
                    to a real open source project"
       |
Walking Out       "My name is in the commit history. That is my
                    origin story."
```

---

## Current State Analysis

### What Exists Today

17 chapters (00-16), 31 appendices (A-Z, AA-AE), approximately 200,000 words across 49 Markdown files. The content is excellent but grew organically. The problems are structural, not substantive.

### Problem 1: Redundancy Between Teaching and Reference

| Teaching Chapter | Reference Appendix | Overlap |
|---|---|---|
| Ch5: VS Code Accessibility (2,057 lines) | App M: VS Code Reference (771 lines) | Settings, shortcuts, screen reader config, audio cues, diff viewer |
| Ch13: GitHub Copilot (1,310 lines) | App W: Copilot Reference (1,039 lines) | Shortcuts, chat participants, commands, instructions, modes |
| Ch13: GitHub Copilot | App X: Copilot Models (212 lines) | Model selection -- X is a subset of W |
| Ch16: Accessibility Agents (2,241 lines) | App V: Agents Reference (1,181 lines) | Agent lists, slash commands, configuration levels |

**Rule:** Chapters teach workflows. Appendices hold lookup tables. No duplication.

### Problem 2: Chapter 5 Is Three Chapters in a Trenchcoat

At 2,057 lines, Chapter 5 does three jobs: VS Code orientation (Sections 1-11), accessibility features deep dive (Sections 12-18), and a Git operations preview (Section 19) that repeats the next chapter. Split it.

### Problem 3: File Order Does Not Match Teaching Order

Chapter 5 (file 05) is a Day 2 topic taught between Day 1 chapters. The course-guide remaps everything. Students see "Chapter 5" in the file but "Day 2, Item 1" in the schedule. Confusing.

### Problem 4: Thin Stub Appendices

Seven appendices are under 300 lines -- too thin to justify standalone files:

| Appendix | Lines | Topic |
|---|---|---|
| App R: Profile, Sponsors, Wikis | 183 | GitHub social features |
| App S: Organizations, Templates | 137 | GitHub org management |
| App T: Contributing to Open Source | 155 | Contribution workflow |
| App X: Copilot Models | 212 | Model selection |
| App O: GitHub Mobile | 224 | Mobile app |
| App F: Gists | 241 | Code snippets |
| App C: Accessibility Standards | 263 | WCAG overview |

### Problem 5: No Git Mental Model

Students click "Stage" without understanding what staging is. No chapter teaches the conceptual model: snapshots, three states, branches as pointers, HEAD, the commit graph. Chapter 11 teaches buttons. Appendix AA teaches advanced operations. Neither builds the foundation.

### Problem 6: Fork Workflow Never Taught End-to-End

The capstone (Challenge 16) requires students to fork the accessibility-agents repository and open a cross-fork PR. But the fork-clone-branch-push-PR cycle is never taught as a continuous, hands-on exercise. Appendix T describes it in a paragraph. Chapter 16 assumes it. This is the workflow students will use for every real contribution after the workshop.

### Problem 7: Missing Fundamentals

| Gap | Impact | Where students hit it |
|---|---|---|
| Writing effective issues/PRs | Students can file an issue but not write a clear bug report | Challenge 2, Challenge 6 |
| README and community health files | Students read them but never write one | Post-workshop, when creating their own repos |
| Code review judgment | Ch14 teaches the mechanics but not what to look for | Challenge 12 |
| Accessibility testing methodology | Students are AT users with the tools -- they need the method | Post-capstone, as contributors |
| Day 1/Day 2 transition | No recap, no preview, no emotional checkpoint | Between days, when confidence dips |
| Markdown authoring in VS Code | Students write Markdown all day but are never shown VS Code's tools | Every writing exercise |

### Problem 8: Missing Learning Cards and Failsafe Sections

The tri-audience learning card pattern (screen reader / low vision / sighted) exists in only 3 chapters. The remaining 14 chapters and all 31 appendices lack them. No chapter has a standardized failsafe section following the classroom plan's fallback hierarchy.

---

## Design Principles

These nine principles govern every structural decision:

1. **File order matches teaching order.** Chapter 01 is taught first. Chapter 21 is taught last. No remapping.

2. **Chapters teach, appendices reference.** Chapters contain narrative, exercises, learning cards, and failsafe sections. Appendices contain lookup tables, cheat sheets, and complete reference lists. No duplication between them.

3. **Every section gets learning cards.** Screen reader users, low vision users, and sighted users each get targeted guidance in every major section.

4. **Every chapter gets a failsafe section.** Following the classroom plan's fallback hierarchy: self-recovery, alternate path, peer rescue, facilitator help, comment escape (universal safety net).

5. **Every feature links to its authoritative source.** GitHub Docs, VS Code Docs, Pro Git Book, W3C standards.

6. **Tool-agnostic concepts, tool-specific practice.** Every exercise provides paths for github.com, github.dev, VS Code Desktop, GitHub Desktop, and Git CLI. Students choose their tool. The concept is the destination.

7. **Dense cross-linking.** Forward refs ("you will practice this in Chapter 14"), back refs ("as you learned in Chapter 6"), and appendix refs ("see Appendix C for the complete list") weave the curriculum into a single interconnected resource.

8. **No stub documents.** Every appendix has at least 300 lines of substantive content. Thin stubs are consolidated into logical groups.

9. **The classroom plan and the curriculum plan are one plan.** Challenges map to chapters. Evidence templates live in the classroom delivery document. Teaching content lives in the chapters. Neither duplicates the other.

---

## The New Chapter Sequence

22 chapters: 00-21. File numbers match teaching order exactly.

### Day 1: You Belong Here (Chapters 00-10)

Day 1 goal: Every student files an issue, opens a PR, resolves a merge conflict, and understands the social layer of GitHub. All Day 1 work happens on a single branch -- `learn/[username]`. One branch, one PR, one workspace.

| # | Filename | Title | Source | What Is New |
|---|---|---|---|---|
| 00 | `00-pre-workshop-setup.md` | Pre-Workshop Setup | Current Ch00 | Expand tool installation: Git, VS Code, GitHub Desktop all installed during setup so every tool is ready from Day 1. Remove the "reference only" framing. Add learning cards. |
| 01 | `01-choose-your-tools.md` | Choose Your Adventure: The Tool Tour | **NEW** | Replaces the sidebar in Ch00. Introduces all five interfaces (github.com, github.dev, VS Code Desktop, GitHub Desktop, Git CLI). Students try each one in a 2-minute confidence exercise and choose their primary tool. See [Multi-Tool-Path System](#multi-tool-path-system). |
| 02 | `02-understanding-github.md` | Understanding GitHub: The Web Platform | Current Ch01 | Renumbered from 01 to 02. Retitled for clarity. Add learning cards. Add tool cards showing the same navigation in VS Code and GitHub Desktop. |
| 03 | `03-navigating-repositories.md` | Navigating Repositories | Current Ch02 | Renumbered from 02 to 03. Add learning cards. Add tool cards for browsing repos in each tool. |
| 04 | `04-the-learning-room.md` | The Learning Room | Current Ch03 | Renumbered from 03 to 04. Add tool cards for cloning the learning room in each tool. Integrate with the buddy system introduction. |
| 05 | `05-working-with-issues.md` | Working with Issues | Current Ch04 | Renumbered from 04 to 05. Add learning cards everywhere. Expand with a **"Writing Effective Issues"** section: bug report structure (Steps to Reproduce / Expected / Actual / Environment), feature request structure, accessibility issue tips. This fills the writing fundamentals gap. |
| 06 | `06-working-with-pull-requests.md` | Working with Pull Requests | Current Ch06 | Add learning cards. Expand with **"Writing PR Descriptions That Get Reviewed"**: what reviewers look for in a description, the `Closes #XX` pattern, before/after structure. Add tool cards for all platforms. |
| 07 | `07-merge-conflicts.md` | Merge Conflicts: When Two Edits Collide | Current Ch07 | Add learning cards. Standardize tool paths (already partially there). Add failsafe section. |
| 08 | `08-open-source-culture.md` | Open Source Culture and Contributing | Current Ch08 + Appendix T | **Absorb Appendix T** (Contributing to Open Source) into this chapter. Expand with **"Writing Your First README"** and **"Community Health Files"** (CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md) sections. Students learn to both read AND write these files. Retitled from "Culture and Etiquette" to "Open Source Culture and Contributing." |
| 09 | `09-labels-milestones-projects.md` | Labels, Milestones, and Projects | Current Ch09 | Add learning cards. Add tool cards for project management in each tool. |
| 10 | `10-notifications-and-day-1-close.md` | Notifications, Settings, and Day 1 Celebration | Current Ch10 + **NEW transition content** | **Dual purpose:** teaches notification management AND serves as the Day 1 emotional close. Adds a **"What You Accomplished Today"** recap section and a **"What Day 2 Adds"** preview. This fills the Day 1/Day 2 transition gap. Retitled to signal the closing arc. |

### Day 2: You Can Build This (Chapters 11-21)

Day 2 goal: Students work locally, understand Git's mental model, use AI tools, practice code review, fork a real project, and build their own agent. Feature branches are now deliberate.

| # | Filename | Title | Source | What Is New |
|---|---|---|---|---|
| 11 | `11-vscode-interface.md` | VS Code: Interface and Setup | Current Ch05, Sections 1-11 | **Split from Ch05.** VS Code orientation: github.dev bridge, screen reader mode, interface tour (5 regions), accounts, sign-in, Copilot status, status bar, menu bar, Settings Sync, Profiles, settings/keyboard editors. Approximately 900 lines. Reference tables move to Appendix G. Retitled for clarity. |
| 12 | `12-vscode-accessibility.md` | VS Code: Accessibility Deep Dive | Current Ch05, Sections 12-18 | **Split from Ch05.** Keyboard navigation, find/filter, Problems panel, Terminal, Copilot Chat window, Accessible Help/View/Diff, Accessibility Signals (teaching narrative only -- table moves to Appendix G), VS Code Speech. Approximately 900 lines. **Section 19 (Git preview) deleted** -- it repeated the next chapter. Adds a **"Markdown Authoring in VS Code"** section covering preview, markdownlint, outline view, and Copilot Markdown assistance. |
| 13 | `13-how-git-works.md` | How Git Works: The Mental Model | **NEW** | The conceptual foundation that makes everything click. Draws from [Pro Git Book](https://git-scm.com/book/en/v2) Chapters 1-3. Teaches: what version control is, snapshots not diffs, the three states (working directory, staging area, repository), branches as lightweight pointers, HEAD, how merging works, remotes (origin, upstream, fork), the commit graph. Approximately 600-800 lines. Every subsequent Git chapter references this one. |
| 14 | `14-git-in-practice.md` | Git in Practice: Source Control Operations | Current Ch11 | Renumbered from 11 to 14. Retitled to complement Ch13. Now explicitly references Ch13 for the "why" behind every operation. Clone, stage, commit, push, pull, branch, discard, stash, timeline, reflog. Add tool cards for VS Code, GitHub Desktop, and CLI in every section. |
| 15 | `15-code-review.md` | Code Review: PRs, Diffs, and Constructive Feedback | Current Ch12 + Ch14 | **Merge Ch12 (GitHub PRs Extension) and Ch14 (Accessible Code Review)** into one chapter. Part 1: the extension (viewing, creating, managing PRs in VS Code). Part 2: accessible code review (diffs, inline comments, approval). **NEW Part 3: "The Reviewer's Craft"** -- what to look for (clarity, accuracy, scope, regressions), the approve/request-changes/comment decision framework, and a reviewer's checklist. This fills the code review judgment gap. |
| 16 | `16-github-copilot.md` | GitHub Copilot: AI-Assisted Development | Current Ch13 | Renumbered from 13 to 16. Remove reference tables (move to Appendix K). Keep teaching focus. Add learning cards where missing. Add a **"Critically Evaluating AI Output"** section -- when to trust, when to verify, when to reject. |
| 17 | `17-issue-templates.md` | Issue and PR Templates: Designing Better Forms | Current Ch15 | Renumbered from 15 to 17. Add more learning cards. Retitled to include PR templates (which are already partially covered). |
| 18 | `18-fork-and-contribute.md` | Your First Real Contribution: The Fork Workflow | **NEW** | The end-to-end fork-clone-branch-push-PR walkthrough that the curriculum is missing. Teaches the complete open source contribution cycle as one continuous story: find an issue in someone else's repo, fork it, clone to local, create a branch, make the fix, commit with a good message, push to your fork, open a cross-fork PR, handle review feedback. Full screen reader guidance at every step. This chapter is the bridge to the capstone -- students practice the exact workflow they will use in Chapter 20. |
| 19 | `19-accessibility-agents.md` | The Accessibility Agents Ecosystem | Current Ch16 | Renumbered from 16 to 19. Remove agent/command reference tables (already in Appendix L). Keep teaching narrative and the "Skill First, Agent Second" philosophy. Exercises: discover agents, run an agent, read an agent's instructions. |
| 20 | `20-build-your-agent.md` | Build Your Agent: The Capstone | **NEW** (from classroom plan Challenge 16) | The capstone gets its own chapter. Phase 1: Find your idea (discovery prompts + pre-made options). Phase 2: Write the `.agent.md` file (YAML frontmatter + natural language instructions + guardrails). Phase 3: Test it locally. Phase 4: Open the PR to Community-Access/accessibility-agents. Phase 5: Review a classmate's agent. This was previously buried inside Ch16 -- it deserves center stage. |
| 21 | `21-next-steps.md` | What Comes Next: Your Contributor Journey | **NEW** | The graduation chapter. Recaps the full journey. Links to every appendix for continued learning. Provides a **"What to Explore Next"** roadmap organized by interest (documentation contributor, accessibility tester, agent developer, open source maintainer). Includes a **"Your GitHub Profile as a Portfolio"** section -- how to find your contributions, pin repos, write a bio. Celebrates completion. |

### Chapter Count Summary

| Category | Count | Details |
|---|---|---|
| Current chapters (renumbered/retitled) | 15 | Ch00-10 (Day 1), Ch14, Ch16-17, Ch19 |
| Current chapters merged | 2 became 1 | Ch12 + Ch14 merged into new Ch15 |
| Current chapter split | 1 became 2 | Ch05 split into new Ch11 + Ch12 |
| New chapters | 5 | Ch01 (Tool Tour), Ch13 (Git Mental Model), Ch18 (Fork Workflow), Ch20 (Capstone), Ch21 (Next Steps) |
| **Total** | **22 chapters** (00-21) | Up from 17 (00-16) |

---

## Challenge-to-Chapter Mapping

The GitHub Classroom plan defines 16 core challenges + 5 bonus challenges. Students see "Challenge 1" through "Challenge 16" -- clean, sequential, no nesting. The chapter mapping is for facilitator reference only.

### Day 1: You Belong Here (Challenges 1-9)

| Challenge | Title | Chapters | What Students Do | Evidence |
|---|---|---|---|---|
| 1 | Find Your Way Around | 02-04 | Scavenger hunt: navigate tabs, find files, read the README | Comment |
| 2 | File Your First Issue | 05 | Find a TODO in `welcome.md`, file an issue with a clear title and description | Comment |
| 3 | Join the Conversation | 05 | Comment on a buddy's issue, @mention, add a reaction | Comment |
| 4 | Branch Out | 06 | Create `learn/[username]` branch (Day 1 workspace) | Comment |
| 5 | Make Your Mark | 06 | Edit `welcome.md` to fix the TODO, commit with a meaningful message | Comment |
| 6 | Open Your First Pull Request | 06 | Open PR from `learn/[username]` to `main`, link to issue with `Closes #XX` | Comment |
| 7 | Survive a Merge Conflict | 07 | Resolve facilitator-triggered conflict, remove markers, keep content | Autograded + Comment |
| 8 | The Culture Layer | 08 | Reflection on etiquette + triage an issue with labels | Comment |
| 9 | Merge Day | 10 | Get Day 1 PR merged, verify changes on main, Day 1 celebration | Comment |

### Day 2: You Can Build This (Challenges 10-16)

| Challenge | Title | Chapters | What Students Do | Evidence |
|---|---|---|---|---|
| 10 | Go Local | 11-14 | Clone repo, create feature branch, edit, commit, push from local tool | Autograded + Comment |
| 11 | Open a Day 2 PR | 14-15 | Open PR from locally-pushed branch, recognize the pattern is the same | Comment |
| 12 | Review Like a Pro | 15 | Full code review of buddy's PR: inline comments, verdict, checklist | Comment |
| 13 | AI as Your Copilot | 16 | Use Copilot to improve documentation, critically evaluate output | Comment |
| 14 | Template Remix | 17 | Create a custom issue template by remixing the registration template | Autograded + Comment |
| 15 | Meet the Agents | 19 | Discover 3 agents, run one, read one agent's instructions | Comment |
| 16 | Build Your Agent (Capstone) | 18-20 | Fork accessibility-agents, write `.agent.md`, open cross-fork PR, review a classmate | Autograded + Comment |

### Bonus Challenges

| Bonus | Title | For Students Who... |
|---|---|---|
| A | Improve an Existing Agent | Finish early and want to contribute more |
| B | Document Your Journey | Enjoy writing and reflection |
| C | Create a Group Challenge | Want to design exercises for future cohorts |
| D | Notification Mastery (Ch10) | Want to practice inbox management |
| E | Explore Git History Visually | Want to see branching as a timeline (GitHub Desktop) |

### Where New Chapters Fit the Challenge Map

The five new chapters do not add new challenges. They fill gaps that existing challenges depend on:

| New Chapter | Supports Which Challenges | How |
|---|---|---|
| Ch01: Tool Tour | All challenges | Students choose their tool before they need it |
| Ch13: Git Mental Model | Challenges 10-16 | Students understand clone/branch/commit before doing them locally |
| Ch18: Fork Workflow | Challenge 16 (Capstone) | Students practice the fork-PR cycle before the high-stakes capstone |
| Ch20: Capstone (standalone) | Challenge 16 | The capstone stops competing for space inside the agents chapter |
| Ch21: Next Steps | Post-workshop | Graduation resource, not a challenge |

---

## The New Appendix Structure

26 appendices: A-Z. Clean alphabet. No AA-AE overflow. Organized into 6 domains that mirror how students look things up.

### Domain 1: Always-Open Reference (A-C)

These three documents stay open the entire workshop.

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| A | `appendix-a-glossary.md` | Glossary | Current App A (637 lines) | 637+ |
| B | `appendix-b-screen-reader-cheatsheet.md` | Screen Reader Navigation Cheat Sheet | Current App B (674 lines) | 674 |
| C | `appendix-c-markdown-reference.md` | Markdown and GitHub Flavored Markdown | Current App E (2,232 lines) | 2,232 |

**Why C instead of E:** Markdown is the third most-consulted reference after the glossary and screen reader cheatsheet. Moving it to Appendix C puts it where students reach for it.

### Domain 2: Git and Authentication (D-F)

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| D | `appendix-d-git-authentication.md` | Git Authentication and Credential Management | Current App D (359 lines) | 359 |
| E | `appendix-e-advanced-git.md` | Advanced Git Operations | Current App AA (874 lines) | 874 |
| F | `appendix-f-git-security.md` | Git Security for Contributors | Current App AD (554 lines) | 554 |

### Domain 3: VS Code and Development Tools (G-J)

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| G | `appendix-g-vscode-reference.md` | VS Code Accessibility Reference | Current App M (771 lines) -- **expanded** with reference tables from Ch05 split | 900+ |
| H | `appendix-h-github-desktop.md` | GitHub Desktop Reference | Current App AB (478 lines) | 478 |
| I | `appendix-i-github-cli.md` | GitHub CLI Reference | Current App AC (715 lines) | 715 |
| J | `appendix-j-cloud-editors.md` | Codespaces and Cloud Editors | Current App N (272 lines) -- expanded with github.dev reference | 400+ |

### Domain 4: GitHub Copilot and AI (K-L)

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| K | `appendix-k-copilot-reference.md` | GitHub Copilot Reference | Current App W + App X **merged** (1,039 + 212 = 1,251 lines) | 1,100+ |
| L | `appendix-l-agents-reference.md` | Accessibility Agents Reference | Current App V (1,181 lines) | 1,181 |

### Domain 5: GitHub Platform Features (M-S)

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| M | `appendix-m-accessibility-standards.md` | Accessibility Standards and WCAG | Current App C (263 lines) -- **significantly expanded** | 500+ |
| N | `appendix-n-advanced-search.md` | Advanced Search | Current App J (310 lines) | 310 |
| O | `appendix-o-branch-protection.md` | Branch Protection and Rulesets | Current App K (319 lines) | 319 |
| P | `appendix-p-security-features.md` | GitHub Security Features | Current App L (358 lines) | 358 |
| Q | `appendix-q-actions-workflows.md` | GitHub Actions and Workflows | Current App Q (496 lines) | 496 |
| R | `appendix-r-projects-deep-dive.md` | GitHub Projects Deep Dive | Current App I (510 lines) | 510 |
| S | `appendix-s-releases-tags-insights.md` | Releases, Tags, and Insights | Current App H (534 lines) | 534 |

### Domain 6: Community, Ecosystem, and Continuing (T-Z)

| Letter | Filename | Title | Source | Lines |
|---|---|---|---|---|
| T | `appendix-t-community-and-social.md` | GitHub Community and Social | **Merge:** App AE (498) + App R (183) + App S (137) | 700+ |
| U | `appendix-u-discussions-and-gists.md` | GitHub Discussions and Gists | **Merge:** App G (257) + App F (241) | 450+ |
| V | `appendix-v-github-mobile.md` | GitHub Mobile | Current App O (224 lines) -- expanded | 350+ |
| W | `appendix-w-github-pages.md` | GitHub Pages | Current App P (357 lines) | 357 |
| X | `appendix-x-resources.md` | Resources, Links, and Further Reading | Current App U (846 lines) | 846 |
| Y | `appendix-y-workshop-materials.md` | Accessing and Downloading Workshop Materials | Current App Y (189 lines) -- update counts | 200+ |
| Z | `appendix-z-github-skills.md` | GitHub Skills Course Catalog | Current App Z (288 lines) | 288+ |

### Appendix Summary

| Action | Old | New | Net |
|---|---|---|---|
| Renumber/retitle | 22 appendices | 22 appendices at new letters | 0 |
| Merge thin stubs | App R + S + AE (3 files) | Appendix T (1 file) | -2 |
| Merge thin stubs | App G + F (2 files) | Appendix U (1 file) | -1 |
| Merge Copilot refs | App W + X (2 files) | Appendix K (1 file) | -1 |
| Absorb into chapter | App T (Contributing) | Into Chapter 08 | -1 |
| **Total** | **31 appendices (A-Z, AA-AE)** | **26 appendices (A-Z)** | **-5 files** |

---

## The Classroom Engine

GitHub Classroom provides the delivery infrastructure. The curriculum provides the content. They are complementary, never duplicative.

### Architecture: Three Repositories, Three Purposes

| Repository | Purpose | Who Writes | Classroom Role |
|---|---|---|---|
| `learning-room` | Scaffolded practice environment with intentional TODOs, challenge issues, and autograding | Facilitators (template), students (their clones) | Assignment repo -- cloned per student with autograding workflows |
| `accessibility-agents` | Production agent ecosystem (55+ agents, 3 teams, 5 platforms) | Maintainers, facilitators, students (via PR) | Contribution target -- students fork and PR against real `main` |
| `git-going-with-github` | This curriculum, course guide, podcast scripts, classroom plan | Facilitators, curriculum maintainers | Reference for facilitators (not cloned by students) |

### The Single-Branch Model

| Day | Branch Pattern | Why |
|---|---|---|
| Day 1 | `learn/[username]` | One branch all day. One PR all day. Students focus on the workflow, not the plumbing. |
| Day 2 Morning | `fix/[username]-[task]` | Feature branches make sense now because students understand what a branch IS from spending all of Day 1 on one. |
| Day 2 Afternoon | `agents/[username]-[agent-name]` | Real contribution branch on a real fork. The fork workflow (Ch18) taught this. |

### The Two Assignments

| Assignment | Challenges | Day | Grading |
|---|---|---|---|
| **You Belong Here** | 1-9 (Chapters 02-10) | Day 1 | Evidence-comment based. One autograded check (conflict markers). |
| **You Can Build This** | 10-16 (Chapters 11-20) | Day 2 | Mix: 3 autograded (local commit, template, capstone agent) + comment evidence. |

### The Buddy System

Every student is paired with a buddy. Every challenge has a Buddy Check step. The buddy system:

- Provides immediate peer support (faster than raising a hand)
- Practices code review skills before Chapter 15 makes them explicit
- Creates social connection in a workshop that could otherwise feel isolating
- Reduces facilitator load by 40-60%

### The Evidence System

Students post evidence on their pre-created challenge issue. Each challenge has an evidence template. Comments are the primary evidence; autograding is a bonus, not a gate.

**Autograded challenges (4 of 16):**

| Challenge | What Is Tested | Points |
|---|---|---|
| 7 (Merge Conflict) | No conflict markers remaining + file has content | 10 |
| 10 (Go Local) | At least one commit on a non-default branch | 10 |
| 14 (Template Remix) | Custom YAML template exists with name field | 15 |
| 16 (Capstone) | Agent file exists, frontmatter valid, responsibilities, guardrails | 60 |

### The Universal Safety Net

If everything else fails, a student can post:

```text
I attempted Challenge [number] and here is what happened:

What I tried: [specific actions]
What I expected: [what should have happened]
What actually happened: [error or unexpected result]
What I learned: [even from failure, what do I understand now?]
```

This is always accepted. A student who explains a failure thoughtfully has learned more than one who followed the happy path without thinking.

---

## Failsafe Design System

Adopted from the classroom plan and integrated into every chapter.

### The Three Laws

1. **Every challenge has a primary path and a fallback path.** The fallback is never "ask the facilitator." It is an alternate action the student takes independently.

2. **Tests verify intent, not formatting.** A test that fails because the student named their branch `Fix/maria-issue42` instead of `fix/maria-issue42` is teaching case sensitivity trivia, not Git. Tests normalize input.

3. **No student is ever blocked with no next step.** Every "If You Get Stuck" section covers actual failure modes, not generic advice.

### The Fallback Hierarchy

```text
Level 0: Self-recovery .... "If You Get Stuck" section in the chapter
Level 1: Alternate path ... Different tool or method for the same outcome
Level 2: Peer rescue ...... Buddy helps (this is itself a learning outcome)
Level 3: Facilitator ...... Specific fix, not a takeover
Level 4: Comment escape ... Post what you tried (always accepted)
```

### Standard Chapter Section: "If You Get Stuck"

Every chapter includes a troubleshooting section formatted as a table:

```markdown
## If You Get Stuck

| What Went Wrong | What to Do |
|---|---|
| [Specific failure mode] | [Specific recovery action] |
| [Specific failure mode] | [Specific recovery action] |
| Everything else | Post a comment describing what you tried. That always counts. |
```

### Anti-Patterns This Plan Avoids

1. **Silent failure** -- tests that fail without telling the student why
2. **Formatting trap** -- tests that fail for trivial case/whitespace reasons
3. **Permissions cliff** -- challenges that need permissions the student lacks
4. **Timing dependency** -- challenges that need another student to finish first
5. **One-shot test** -- tests that run once with no retry
6. **Infrastructure hostage** -- challenges that fail when Actions/Copilot/network is slow

---

## Learning Cards System

### The Pattern

Every major section (h2 or significant h3) gets a tri-audience card:

```markdown
### Learning Cards: [Section Name]

<details>
<summary>Screen reader users</summary>

- What to listen for, keyboard sequence, screen reader announcement
- Common gotcha or tip specific to screen reader workflow
- Cross-reference to appendix for complete reference

</details>

<details>
<summary>Low vision users</summary>

- What visual cue to expect, where to look
- Zoom, contrast, or theme tip relevant to this section
- Cross-reference to appendix for related settings

</details>

<details>
<summary>Sighted users</summary>

- What visual indicator to look for
- UI navigation tip (where to click, what icon)
- Cross-reference to appendix for visual guides

</details>
```

### Coverage Target

| Category | Current | Target |
|---|---|---|
| Chapters with extensive cards | 3 (Ch05, Ch11, Ch13) | All 22 |
| Chapters with some cards | 5 | Complete coverage |
| Chapters with no cards | 9 | Add cards throughout |
| Appendices with cards | 0 | All 26 |
| **Estimated new card sets** | | **250-300** |

---

## Multi-Tool-Path System

### The Tool Card Pattern

Every exercise that involves interacting with GitHub or Git provides instructions for every supported tool. Students choose; the concept is the destination.

```markdown
### Tool Cards: [Operation Name]

<details>
<summary>github.com (browser)</summary>

Step-by-step for the web interface.

</details>

<details>
<summary>github.dev (web editor)</summary>

Step-by-step for the browser-based VS Code.

</details>

<details>
<summary>VS Code Desktop</summary>

Step-by-step for the desktop editor.

</details>

<details>
<summary>GitHub Desktop</summary>

Step-by-step for the visual Git client.

</details>

<details>
<summary>Git CLI (terminal)</summary>

Step-by-step for the command line.

</details>
```

### Tool Availability by Chapter

| Tool | Available From | Notes |
|---|---|---|
| github.com | All chapters | Always works, no install needed |
| github.dev | Ch02 onward | Press `.` on any repo |
| VS Code Desktop | Ch01 onward (if installed in Ch00) | Full local development |
| GitHub Desktop | Ch01 onward (if installed in Ch00) | Visual Git operations |
| Git CLI | Ch01 onward (if installed in Ch00) | Keyboard-first workflows |

**The key insight from the classroom plan:** "If someone completes every challenge using only github.com, they have learned GitHub. If someone uses VS Code for everything, they have learned GitHub. The tool is the vehicle, not the destination."

---

## Cross-Linking Strategy

### Every Chapter Gets

1. **Header block:** "Related appendices: A, G" -- the 2-3 most relevant
2. **Authoritative sources block:** 2-5 official docs at chapter top
3. **Inline forward refs:** "You will practice this in Chapter 15"
4. **Inline back refs:** "As you learned in Chapter 06"
5. **Section-level appendix refs:** "See Appendix G, Section 5 for the complete keyboard shortcuts table"
6. **Challenge reference:** "This chapter supports Challenge 7. See the classroom guide for evidence templates."
7. **Footer navigation:** Previous Chapter / Next Chapter / Related Appendices

### Every Appendix Gets

1. **Header block:** "This is the reference companion to Chapter 12"
2. **Authoritative sources block:** Official docs this appendix summarizes
3. **Section-level chapter refs:** "This table supports Chapter 12, Section 3"
4. **Footer navigation:** Previous Appendix / Next Appendix / Teaching Chapter

---

## Authoritative Source Registry

Every GitHub feature, VS Code feature, Git concept, and accessibility standard links to its canonical documentation.

### GitHub Platform

| Topic | Authoritative Source |
|---|---|
| Account setup | [GitHub Docs: Getting started with your account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account) |
| Keyboard shortcuts | [GitHub Docs: Keyboard shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts) |
| Command palette | [GitHub Docs: Command palette](https://docs.github.com/en/get-started/accessibility/github-command-palette) |
| Accessibility settings | [GitHub Docs: Accessibility settings](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-user-account-settings/managing-accessibility-settings) |
| Repositories | [GitHub Docs: Repositories](https://docs.github.com/en/repositories) |
| Issues | [GitHub Docs: Issues](https://docs.github.com/en/issues) |
| Pull requests | [GitHub Docs: Pull requests](https://docs.github.com/en/pull-requests) |
| Code review | [GitHub Docs: Reviewing changes in PRs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) |
| Contributing to projects | [GitHub Docs: Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) |
| Fork a repo | [GitHub Docs: Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) |
| Notifications | [GitHub Docs: About notifications](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/about-notifications) |
| Issue templates | [GitHub Docs: Configuring issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) |
| Labels and milestones | [GitHub Docs: Managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) |
| Projects | [GitHub Docs: About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) |
| Discussions | [GitHub Docs: About discussions](https://docs.github.com/en/discussions) |
| GitHub Actions | [GitHub Docs: Understanding Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) |
| GitHub Pages | [GitHub Docs: About Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) |
| GitHub Mobile | [GitHub Docs: GitHub Mobile](https://docs.github.com/en/get-started/using-github/github-mobile) |
| Codespaces | [GitHub Docs: Codespaces](https://docs.github.com/en/codespaces) |
| Branch protection | [GitHub Docs: Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) |
| Rulesets | [GitHub Docs: About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) |
| Security features | [GitHub Docs: Code security](https://docs.github.com/en/code-security) |
| GitHub CLI | [GitHub CLI Manual](https://cli.github.com/manual/) |
| GitHub Desktop | [GitHub Desktop Docs](https://docs.github.com/en/desktop) |
| GitHub Sponsors | [GitHub Docs: Sponsors](https://docs.github.com/en/sponsors) |
| Organizations | [GitHub Docs: About organizations](https://docs.github.com/en/organizations) |
| GitHub Skills | [GitHub Skills](https://skills.github.com/) |
| GitHub Glossary | [GitHub Docs: Glossary](https://docs.github.com/en/get-started/learning-about-github/github-glossary) |

### GitHub Copilot

| Topic | Authoritative Source |
|---|---|
| Overview | [GitHub Docs: Copilot](https://docs.github.com/en/copilot) |
| Copilot in VS Code | [GitHub Docs: Copilot in your environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment) |
| Chat in IDE | [GitHub Docs: Asking Copilot questions](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide) |
| Custom instructions | [GitHub Docs: Custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) |
| Custom agents | [GitHub Docs: Building Copilot extensions](https://docs.github.com/en/copilot/customizing-copilot/building-copilot-extensions) |
| MCP servers | [GitHub Docs: Extending Copilot](https://docs.github.com/en/copilot/customizing-copilot/extending-the-functionality-of-github-copilot-in-your-ide) |

### VS Code

| Topic | Authoritative Source |
|---|---|
| Accessibility | [VS Code Docs: Accessibility](https://code.visualstudio.com/docs/editor/accessibility) |
| Keyboard shortcuts | [VS Code Docs: Key bindings](https://code.visualstudio.com/docs/getstarted/keybindings) |
| Profiles | [VS Code Docs: Profiles](https://code.visualstudio.com/docs/editor/profiles) |
| Settings Sync | [VS Code Docs: Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync) |
| Source control | [VS Code Docs: Source control](https://code.visualstudio.com/docs/sourcecontrol/overview) |
| GitHub integration | [VS Code Docs: GitHub](https://code.visualstudio.com/docs/sourcecontrol/github) |
| Terminal | [VS Code Docs: Terminal basics](https://code.visualstudio.com/docs/terminal/basics) |
| vscode.dev | [VS Code Docs: VS Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web) |

### Git

| Topic | Authoritative Source |
|---|---|
| Git reference | [git-scm.com/docs](https://git-scm.com/docs) |
| Pro Git book | [git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) |
| Git glossary | [git-scm.com/docs/gitglossary](https://git-scm.com/docs/gitglossary) |
| Git credentials | [git-scm.com/docs/gitcredentials](https://git-scm.com/docs/gitcredentials) |

### Accessibility Standards

| Topic | Authoritative Source |
|---|---|
| WCAG 2.2 | [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| ARIA Authoring Practices | [W3C: ARIA APG](https://www.w3.org/WAI/ARIA/apd/) |
| WAI overview | [W3C: WAI](https://www.w3.org/WAI/) |

### Screen Readers

| Topic | Authoritative Source |
|---|---|
| NVDA | [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html) |
| JAWS | [JAWS Documentation](https://support.freedomscientific.com/Products/Blindness/JAWSDocumentation) |
| VoiceOver (Mac) | [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac) |
| VoiceOver (iOS) | [VoiceOver on iPhone](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) |
| TalkBack | [TalkBack documentation](https://support.google.com/accessibility/android/answer/6283677) |
| Narrator | [Complete guide to Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) |

---

## Consolidation Ledger

Every merge, split, absorption, and deletion tracked for implementation.

### Files Merged

| Old Files | New File | Lines Saved | Reason |
|---|---|---|---|
| App R (183) + App S (137) + App AE (498) | Appendix T: Community and Social | ~118 | Three thin stubs covering related social/org topics |
| App G (257) + App F (241) | Appendix U: Discussions and Gists | ~48 | Two thin stubs covering community content features |
| App W (1,039) + App X (212) | Appendix K: Copilot Reference | ~151 | X was a subset of W; merge eliminates duplication |
| Ch12 (883) + Ch14 (1,703) | Ch15: Code Review | ~386 | Three PR-related chapters unified into one PR lifecycle chapter |

### Files Split

| Old File | New Files | Lines Changed | Reason |
|---|---|---|---|
| Ch05 (2,057) | Ch11: VS Code Interface (~900) + Ch12: VS Code Accessibility (~900) | Section 19 deleted (~120 lines) | Ch05 was doing three jobs; Section 19 previewed the next chapter |

### Files Absorbed Into Chapters

| Old File | Absorbed Into | Reason |
|---|---|---|
| App T: Contributing to Open Source (155 lines) | Ch08: Open Source Culture and Contributing | Thin appendix covering a topic that belongs in the teaching narrative |

### New Files Created

| File | Estimated Lines | Reason |
|---|---|---|
| Ch01: Choose Your Adventure | 400-500 | Multi-tool-path foundation; students need this before Day 1 exercises |
| Ch13: How Git Works | 600-800 | Git mental model; students need this before Day 2 Git operations |
| Ch18: Fork and Contribute | 500-700 | End-to-end fork workflow; students need this before the capstone |
| Ch20: Build Your Agent (Capstone) | 600-800 | Capstone deserves standalone chapter; extracted from Ch16/classroom plan |
| Ch21: What Comes Next | 300-400 | Graduation, portfolio, continued learning roadmap |

### Reference Tables Moved (Not Duplicated)

| From | To | What Moved |
|---|---|---|
| Ch05 (becoming Ch11/Ch12) | Appendix G: VS Code Reference | Settings tables, keyboard shortcut tables, signal reference table |
| Ch13 (becoming Ch16) | Appendix K: Copilot Reference | Chat participants table, slash commands table, model comparison table |
| Ch16 (becoming Ch19) | Appendix L: Agents Reference | Agent roster table, command reference table |

---

## File Rename Map

Complete mapping from old filenames to new filenames. Every cross-reference, the course-guide, the podcast feed, and any HTML build must be updated atomically.

### Chapter Renames

| Old Filename | New Filename | Action |
|---|---|---|
| _(new)_ | `01-choose-your-tools.md` | Create |
| `01-understanding-github-web-structure.md` | `02-understanding-github.md` | Rename + retitle |
| `02-navigating-repositories.md` | `03-navigating-repositories.md` | Rename |
| `03-the-learning-room.md` | `04-the-learning-room.md` | Rename |
| `04-working-with-issues.md` | `05-working-with-issues.md` | Rename + expand |
| `05-vscode-accessibility.md` (Sections 1-11) | `11-vscode-interface.md` | Split + rename |
| `05-vscode-accessibility.md` (Sections 12-18) | `12-vscode-accessibility.md` | Split + rename |
| `06-working-with-pull-requests.md` | `06-working-with-pull-requests.md` | Stays (add content) |
| `07-merge-conflicts.md` | `07-merge-conflicts.md` | Stays (add content) |
| `08-culture-etiquette.md` | `08-open-source-culture.md` | Rename + absorb App T |
| `09-labels-milestones-projects.md` | `09-labels-milestones-projects.md` | Stays (add content) |
| `10-notifications.md` | `10-notifications-and-day-1-close.md` | Rename + expand |
| `11-git-source-control.md` | `14-git-in-practice.md` | Rename + renumber |
| `12-github-pull-requests-extension.md` | _(merged into 15)_ | Delete (content in Ch15) |
| _(new)_ | `13-how-git-works.md` | Create |
| `13-github-copilot.md` | `16-github-copilot.md` | Rename + renumber |
| `14-accessible-code-review.md` | _(merged into 15)_ | Delete (content in Ch15) |
| _(new)_ | `15-code-review.md` | Create (from Ch12 + Ch14) |
| `15-issue-templates.md` | `17-issue-templates.md` | Rename + renumber |
| `16-accessibility-agents.md` | `19-accessibility-agents.md` | Rename + renumber |
| _(new)_ | `18-fork-and-contribute.md` | Create |
| _(new)_ | `20-build-your-agent.md` | Create |
| _(new)_ | `21-next-steps.md` | Create |

### Appendix Renames

| Old Filename | New Filename | Action |
|---|---|---|
| `appendix-a-glossary.md` | `appendix-a-glossary.md` | Stays |
| `appendix-b-screen-reader-cheatsheet.md` | `appendix-b-screen-reader-cheatsheet.md` | Stays |
| `appendix-e-github-flavored-markdown.md` | `appendix-c-markdown-reference.md` | Rename to C |
| `appendix-d-git-authentication.md` | `appendix-d-git-authentication.md` | Stays |
| `appendix-aa-advanced-git.md` | `appendix-e-advanced-git.md` | Rename from AA to E |
| `appendix-ad-git-security.md` | `appendix-f-git-security.md` | Rename from AD to F |
| `appendix-m-vscode-accessibility-reference.md` | `appendix-g-vscode-reference.md` | Rename from M to G |
| `appendix-ab-github-desktop.md` | `appendix-h-github-desktop.md` | Rename from AB to H |
| `appendix-ac-github-cli.md` | `appendix-i-github-cli.md` | Rename from AC to I |
| `appendix-n-github-codespaces.md` | `appendix-j-cloud-editors.md` | Rename from N to J + retitle |
| `appendix-w-github-copilot-reference.md` + `appendix-x-copilot-models.md` | `appendix-k-copilot-reference.md` | Merge W+X into K |
| `appendix-v-accessibility-agents-reference.md` | `appendix-l-agents-reference.md` | Rename from V to L |
| `appendix-c-accessibility-standards.md` | `appendix-m-accessibility-standards.md` | Rename from C to M |
| `appendix-j-advanced-search.md` | `appendix-n-advanced-search.md` | Rename from J to N |
| `appendix-k-branch-protection-rulesets.md` | `appendix-o-branch-protection.md` | Rename from K to O |
| `appendix-l-github-security-features.md` | `appendix-p-security-features.md` | Rename from L to P |
| `appendix-q-github-actions-workflows.md` | `appendix-q-actions-workflows.md` | Retitle |
| `appendix-i-github-projects.md` | `appendix-r-projects-deep-dive.md` | Rename from I to R |
| `appendix-h-releases-tags-insights.md` | `appendix-s-releases-tags-insights.md` | Rename from H to S |
| `appendix-ae-github-social.md` + `appendix-r-...` + `appendix-s-...` | `appendix-t-community-and-social.md` | Merge AE+R+S into T |
| `appendix-g-github-discussions.md` + `appendix-f-github-gists.md` | `appendix-u-discussions-and-gists.md` | Merge G+F into U |
| `appendix-o-github-mobile.md` | `appendix-v-github-mobile.md` | Rename from O to V |
| `appendix-p-github-pages.md` | `appendix-w-github-pages.md` | Rename from P to W |
| `appendix-u-resources.md` | `appendix-x-resources.md` | Rename from U to X |
| `appendix-y-accessing-workshop-materials.md` | `appendix-y-workshop-materials.md` | Retitle |
| `appendix-z-github-skills-catalog.md` | `appendix-z-github-skills.md` | Retitle |

### Files Deleted After Merge

| Filename | Content Goes To |
|---|---|
| `appendix-t-contributing-to-open-source.md` | Chapter 08 |
| `appendix-x-copilot-models.md` | Appendix K |
| `appendix-r-github-profile-sponsors-wikis.md` | Appendix T |
| `appendix-s-github-organizations-templates.md` | Appendix T |
| `appendix-f-github-gists.md` | Appendix U |
| `12-github-pull-requests-extension.md` | Chapter 15 |
| `14-accessible-code-review.md` | Chapter 15 |

---

## Implementation Roadmap

Seven phases. Each phase produces a working, consistent state. No phase depends on uncommitted work from another phase.

### Phase 1: Scaffold (Week 1)

Create the new files with placeholder content. Rename existing files. Update all internal links. The curriculum is structurally complete but content-thin in new chapters.

- [ ] Create Ch01, Ch13, Ch18, Ch20, Ch21 as stubs with headers and TOCs
- [ ] Split Ch05 into Ch11 + Ch12
- [ ] Merge Ch12 + Ch14 into Ch15
- [ ] Rename all chapter files to new numbers
- [ ] Rename all appendix files to new letters
- [ ] Merge stub appendices (R+S+AE into T, G+F into U, W+X into K)
- [ ] Absorb App T into Ch08
- [ ] Update course-guide.md with new chapter/appendix numbers
- [ ] Update all internal cross-references (grep for old filenames)
- [ ] Verify no broken links

### Phase 2: New Chapter Content (Weeks 2-3)

Write the five new chapters with full content, learning cards, tool cards, and failsafe sections.

- [ ] Ch01: Choose Your Adventure -- tool tour with confidence exercises
- [ ] Ch13: How Git Works -- mental model from Pro Git book
- [ ] Ch18: Fork and Contribute -- end-to-end fork workflow walkthrough
- [ ] Ch20: Build Your Agent -- capstone phases (from classroom plan)
- [ ] Ch21: What Comes Next -- graduation, portfolio, roadmap

### Phase 3: Expand Existing Chapters (Weeks 3-4)

Fill content gaps in existing chapters.

- [ ] Ch05: Add "Writing Effective Issues" section (bug report structure, feature request structure)
- [ ] Ch06: Add "Writing PR Descriptions That Get Reviewed" section
- [ ] Ch08: Absorb App T content + add "Writing Your First README" + "Community Health Files"
- [ ] Ch10: Add "What You Accomplished Today" recap + "What Day 2 Adds" preview
- [ ] Ch12: Add "Markdown Authoring in VS Code" section
- [ ] Ch15: Add "The Reviewer's Craft" section (what to look for, decision framework)
- [ ] Ch16: Add "Critically Evaluating AI Output" section

### Phase 4: Learning Cards (Weeks 4-6)

Add tri-audience learning cards to every major section in every chapter and appendix. Estimated 250-300 card sets.

- [ ] Chapters 00-10 (Day 1)
- [ ] Chapters 11-21 (Day 2)
- [ ] Appendices A-F (Core + Git)
- [ ] Appendices G-L (VS Code + Copilot)
- [ ] Appendices M-S (GitHub Platform)
- [ ] Appendices T-Z (Community + Continuing)

### Phase 5: Tool Cards and Failsafe Sections (Weeks 5-7)

Add multi-tool-path cards to every exercise and failsafe sections to every chapter.

- [ ] Tool cards in all Day 1 chapters (browser is primary, others are options)
- [ ] Tool cards in all Day 2 chapters (VS Code is primary, others are options)
- [ ] Failsafe "If You Get Stuck" tables in all 22 chapters
- [ ] Verify all tool cards cover: github.com, github.dev, VS Code, GitHub Desktop, CLI

### Phase 6: Cross-Linking and Attribution (Weeks 7-8)

Wire everything together.

- [ ] Add header blocks (related appendices, authoritative sources) to all chapters
- [ ] Add header blocks (teaching chapter, authoritative sources) to all appendices
- [ ] Add footer navigation (prev/next + related) to all files
- [ ] Add inline forward/back refs throughout all chapters
- [ ] Add challenge references to relevant chapters
- [ ] Verify all authoritative source URLs are live

### Phase 7: Classroom Integration (Weeks 8-9)

Update the classroom delivery document to match the restructured curriculum.

- [ ] Update challenge-to-chapter mapping in classroom.md
- [ ] Verify all evidence templates reference correct chapter numbers
- [ ] Update autograding test specs for any changed file paths
- [ ] Update facilitator deployment checklist
- [ ] Update learning-room template repo to match new structure
- [ ] Test full student flow end-to-end with dummy account
- [ ] Update podcast episode references

---

## Resolved Decisions

These questions were raised during planning and have been resolved. Documenting the decisions and rationale here for future facilitators.

### 1. Should capstone PRs target real main or a workshop branch?

**Decision: Real main.**

The entire workshop narrative builds to "your name is in the commit history of a real project." A workshop branch dilutes that. The quality gate is the review process, not the branch target. Facilitators review all capstone PRs before merge. Any agent that needs more work stays as an open PR with specific improvement steps -- this is how real open source works.

### 2. Should peer review be required before facilitator review?

**Decision: Encouraged but not required.**

Peer review is built into Challenge 16 Phase 5 as a natural activity. Students who finish early review classmates who are still working. This creates organic peer review without blocking anyone. If a student finishes with no peer reviews (because they were the last to finish), the facilitator review alone is sufficient.

### 3. What happens to agents that are not merge-ready by end of Day 2?

**Decision: Patient iteration with a human touch.**

The PR stays open. The facilitator leaves a review with specific, actionable improvement steps (not vague "make it better" feedback). The student has one week to iterate. After one week without activity, the facilitator leaves a friendly comment offering to pair on the improvements. No PR is closed by the facilitator unilaterally -- the student always has the option to continue.

If a student explicitly says "I cannot continue," the facilitator offers to merge as-is (if it meets minimum standards) or close with a celebratory comment acknowledging the learning achieved.

### 4. Should the capstone be strictly individual or allow pairs?

**Decision: Individual submissions, collaborative brainstorming.**

Every student creates their own agent file and their own PR. This ensures every participant has commits in their profile and a PR with their name. However, students are encouraged to brainstorm ideas together, review each other's drafts, and suggest improvements. The buddy system naturally facilitates this.

For accessibility reasons: if a student has a disability that makes independent typing difficult, the facilitator can pair-program with them. The student's account makes the commits so the credit is correctly attributed.

### 5. How do students handle the two-repository model?

**Decision: Day 1 is entirely on learning-room. Day 2 introduces the fork gradually.**

Students do not need to know about accessibility-agents until Challenge 15. The facilitator introduces it at that point: "There is a second repository. It is the real agent project. You are about to explore it." The fork is either pre-created by the facilitator (recommended) or created by the student as part of Challenge 16 setup.

This avoids the cognitive overload of multi-repo work on Day 1 when students are still learning what a repository IS.

---

## Celebration Moments

From the classroom plan -- the emotional peaks where facilitators pause the room:

| Moment | When | What the Facilitator Says |
|---|---|---|
| First issue filed | Ch05, Day 1 morning | "Your name is now in a GitHub issue thread. That is real." |
| First PR opened | Ch06, Day 1 midday | "You just proposed a change to a project. That is how every open source improvement starts." |
| First conflict resolved | Ch07, Day 1 afternoon | "Merge conflicts scare people. You just handled one. That is what experienced developers do." |
| First PR merged | Ch10, Day 1 close | "Your changes are on main. Your name is in the commit history. That is permanent." |
| Git mental model | Ch13, Day 2 morning | "Now you do not just know which buttons to press. You know WHY." |
| First code review given | Ch15, Day 2 midday | "You just reviewed someone else's work and made it better. That is leadership." |
| First agent invoked | Ch19, Day 2 afternoon | "That AI agent did in 5 seconds what took you 20 minutes yesterday. But you could tell if it was right because you did it by hand first." |
| Agent created | Ch20, Day 2 afternoon | "You did not just use an AI agent. You built one. It has your name on it." |
| PR opened upstream | Ch20, Day 2 afternoon | "Your contribution is now visible to the world. Anyone who clones this repo will see your work." |
| Graduation | Ch21, Day 2 close | "Your name is in the commit history of a real open source project. That is not a certificate. That is an origin story." |

---

## Summary: The Numbers

| Metric | Before | After |
|---|---|---|
| Chapters | 17 (00-16) | 22 (00-21) |
| Appendices | 31 (A-Z, AA-AE) | 26 (A-Z) |
| Total files | 49 | 49 (net zero: 5 new chapters, 5 eliminated appendix stubs, 1 split offsets 1 merge) |
| Challenges | 16 core + 5 bonus | 16 core + 5 bonus (unchanged) |
| Autograded challenges | 4 | 4 (unchanged) |
| Learning card sets | ~50 | ~300 |
| Failsafe sections | 0 standardized | 22 (every chapter) |
| Tool card sets | ~12 scattered | ~80+ standardized |
| Fundamentals gaps filled | -- | Writing effective issues, writing PRs, Git mental model, fork workflow, code review judgment, README authoring, Markdown in VS Code, Day 1/Day 2 transition |
| Stub appendices (under 300 lines) | 7 | 0 |
| Authoritative source links | ~20 scattered | 60+ systematically placed |

The file count stays at 49. The quality per file goes up dramatically. Every chapter teaches with learning cards, tool cards, failsafe sections, and authoritative citations. Every appendix serves as a focused reference document with cross-links back to the teaching chapters. The whole thing fits into GitHub Classroom like it was built for it -- because now, it was.
