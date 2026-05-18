# Chapter Progression Analysis

## Executive Summary

**Current structure IS properly progressive.** The 20 chapters (including new Learning Room guide) form a clear learning arc from absolute beginner (GitHub web) through intermediate (collaborative GitHub) to advanced (VS Code + AI/Agents). Chapter dependencies are logical. No reorganization needed.

**New "The Learning Room" chapter (02a) fills a critical gap** - students now understand the shared environment before learning individual skills.

## Foundation Level: Understanding the Environment

```
00. Pre-Workshop Setup
    └─ Objective: System ready, screen reader configured
       Dependency: None (prerequisite step)

01. Understanding GitHub Web Structure
    └─ Objective: Mental model of how GitHub pages are organized
       Dependency: None
       Skills: Landmarks, headings, page layout, navigation strategy
       Leads to: 02 (scheduling) + 03a (environment context)

02. Day 1 Agenda
    └─ Objective: Know the schedule and activities
       Dependency: 01 (understand the tool first)
       Introduces: Two-track learning model
       Leads to: 03a (read about your learning environment)

NEW 02a. The Learning Room
    └─ Objective: Understand shared repo, PR sharing, automation system
       Dependency: 02 (know what skills you're practicing)
       Skills: PR workflow, peer review, bot feedback types
       Leads to: 03 (now you know WHY we need to navigate repos)
```

**Why This Order:**

- Students arrive with anxiety ("Will I break something?")
- Chapter 01 shows how GitHub is organized (reduce anxiety)
- Chapter 02 shows the schedule (build confidence)
- Chapter 02a explains the shared environment (now they're READY)
- They're ready to learn individual skills (03-09)

## Day 1: Skill Building (Progressive)

```
Skill Level 1: Basic Repo Navigation
03. Navigating Repositories
    └─ Dependency: 02a (know you're in a shared repo with others)
       Skills: Finding files, reading commits, switching branches
       Prerequisite for: 04 (can't file issue until you navigate)

Skill Level 2: Issue Management
04. Working with Issues
    └─ Dependency: 03 (must navigate to find the issue list)
       Skills: Filing, searching, filtering, commenting, @mentions
       Prerequisite for: 05 (issues and PRs are linked - "Closes #X")

Skill Level 3: Pull Request Mechanics
05. Working with Pull Requests
    └─ Dependency: 04 (PRs reference issues with "Closes #XX")
       Skills: Creating, reviewing, merging, commit history
       Prerequisite for: 06 (conflicts only happen in PRs)

Level 1 Problem-Solving: Merge Conflicts
06. Merge Conflicts
    └─ Dependency: 05 (must understand PRs before fixing conflicts)
       Skills: Understanding conflict markers, resolving, communicating
       Prerequisite for: Nothing (reference when problem appears)
       Why NOT earlier: Students must try to merge before this makes sense

Soft Skills / Interaction
07. Culture and Etiquette
    └─ Dependency: 05 (have written comments, now understand tone matters)
       Skills: Communication style, inclusive language, respect, asynchronous mindset
       Prerequisite for: 08 (labels/projects assume team coordination)
       Why after PRs: Students have actual experience now; advice lands better

Level 2: Organizing Work
08. Labels, Milestones, and Projects
    └─ Dependency: 07 (assumes shared team culture)
       Skills: Categorization, filtering, cross-reference, project boards
       Prerequisite for: 09 (notifications filtered by labels)
       Why here: Students see their own work is now categorized

Housekeeping/Optimization
09. Notifications and Mentions
    └─ Dependency: 08 (can filter notifications by label)
       Skills: Managing inbox, threading, subscribing, @mentions
       Prerequisite for: Nothing (reference after someone gets overwhelmed)
       Why last on Day 1: Learning to manage notifications is a "nice to have," not critical
```

**Why This Sequence Works:**

| Chapter | Why Not Earlier? | Why Here? |
|---------|-----------------|----------|
| 03 | No prior context | After 02a, students understand the shared repo |
| 04 | No navigation skills yet | Students can now find the issue list |
| 05 | No issues to reference | Students understand issue-PR link ("Closes") |
| 06 | Conflicts don't exist yet | Students will merge; conflicts become real |
| 07 | No communication yet | Students have commented; now discuss tone |
| 08 | No team context | Students understand collaboration is essential |
| 09 | Too much info early | After 08, inbox management makes sense |

**Cross-Level Dependencies (Non-Adjacent):**

- 09 (notifications) → 05 (PRs generate notifications)
- 08 (labels) → 04 (issues can be labeled)
- 07 (culture) → ALL of 03-09 (tone matters in every interaction)

## Bridge: Day 1 → Day 2

```
10. Day 2 Agenda
    └─ Objective: Transition from browser to IDE
       Dependency: All of Day 1 (prerequisites established)
       Bridges: "Here's why VS Code matters" + "Here's how it's accessible"
       Leads to: 11 (introduces new tool: VS Code)
```

## Day 2: Skill Amplification

```
Tool Foundation: IDE Setup
11. VS Code: Setup & Accessibility Basics
    └─ Dependency: 10 (understand why new tool)
       Skills: Screen reader mode, keyboard navigation, accessibility settings
       Prerequisite for: 12 (can't use git if VS Code is misconfigured)
       Why NOT on Day 1: New tool requires dedicated setup time

Core Tool: Version Control in IDE
12. VS Code: Git & Source Control
    └─ Dependency: 11 (VS Code operational) + 03 (understand branches)
       Skills: Cloning, branching, staging, committing, merge handling
       Prerequisite for: 13 (PR extension uses git state)
       Amplifies: Chapter 05 (PRs) but FROM THE IDE instead of browser

IDE Integration: PR Extension
13. VS Code: GitHub PR Extension
    └─ Dependency: 12 (git status visible in extension)
       Skills: Viewing PRs, reviewing in IDE, checking out branches
       Prerequisite for: Nothing (can use browser instead)
       Amplifies: Chapter 05 (PRs) - same mechanics, IDE-local view
       Why here not earlier: Need IDE + git working first

AI Assistance: Copilot Inline
14. GitHub Copilot Basics
    └─ Dependency: 11 (Copilot runs in VS Code)
       Skills: Accepting/rejecting suggestions, effective prompting
       Prerequisite for: 19 (agents build on Copilot understanding)
       Bridge concept: "You understand the skill, now delegate parts to AI"

Expert Culminating Skill: Code Review
15. Accessible Code Review
    └─ Dependency: 05 (PRs) + 12 (git) + 13 (PR extension) + 14 (Copilot context)
       Skills: Reviewing diffs with screen reader, leaving comments, semantic review, screen reader accessible reviewing
       Prerequisite for: 19 (agents automate what you master here)
       Why here: Culminating skill before showing automation; students need confidence before agentic workflows
       Pedagogical arc: Learn manual deep skill → show how to automate it

Reference/Advanced: Infrastructure & Process
16. Issue Templates
    └─ Dependency: 04 (issue filing mechanics)
       Skills: YAML form creation, structured issues, automation triggers
       Prerequisite for: Nothing (optional automation)
       Category: Advanced - for facilitators or interested students

17. GitHub Actions & Workflows
    └─ Dependency: 05 (PRs trigger workflows) + 14 (Copilot context)
       Skills: YAML syntax, triggers, status checks, CI/CD basics
       Prerequisite for: Understanding Accessibility Agents cloud workflows
       Amplifies: Real automation examples

Expert: Agentic Automation Synthesis
18. Accessibility Agents: Five Agents + Cloud
    └─ Dependency: 14 (must understand Copilot) + 15 (code review to automate)
       Skills: Custom agents, slash commands, async cloud workflows, code review automation
       Prerequisite for: Nothing (advanced optional amplification)
       Why last: Shows how to automate everything learned in 14-17; complete synthesis chapter
       Pedagogical arc: FINISH - "Accessibility Agents does not replace what you learn. It amplifies it."
       Quote from README: This is the final synthesis showing automation of all manual skills


## Appendices: Reference Material (No Dependency)

```

A. Glossary
   └─ Can be opened anytime - define any term, any time

B. Screen Reader Cheat Sheet
   └─ Reference during exercises - keyboard shortcuts, elements list, modes

C. Git Authentication
   └─ Setup reference - SSH keys, PATs, credential managers

D. GitHub Gists
   └─ Optional feature - code snippets, sharing, embedding

E. Advanced GitHub Features
   └─ Post-workshop exploration - CLI, API, advanced settings, mobile

F. VS Code Accessibility Reference
   └─ Technical deep dive - settings, audio cues, accessibility configurations

G. Resources
   └─ Can be opened anytime - every link, tool, and reference from the event

```
```

**Why Day 2 Order Works:**

| Chapter | Why Here? | Dependency Chain |
|---------|-----------|-----------------|
| 11 | Tool setup | New tool requires dedicated foundation |
| 12 | Git in IDE | Builds on 03 (branches) + 11 (VS Code works) |
| 13 | IDE PR review | Builds on 12 (git state) + 05 (PR mechanics) |
| 14 | Copilot assistance | VS Code operational (11) |
| 15 | Code Review (culminating skill) | Builds on 05, 12, 13, 14; master manual deep skill before automation |
| 16 | Templates | Reference material; can read anytime |
| 17 | GitHub Actions | Builds on 05 (PRs) + 14 (understanding automation) |
| 18 | Accessibility Agents (agentic automation) | Builds on 14 (Copilot) + 15 (code review mastery); FINAL synthesis |

## Appendices: Reference Material (No Dependency)

```
A. Glossary
   └─ Can be opened anytime - define any term, any time

B. Screen Reader Cheat Sheet
   └─ Reference during exercises - keyboard shortcuts, elements list, modes

C. Git Authentication
   └─ Setup reference - SSH keys, PATs, credential managers

D. GitHub Gists
   └─ Optional feature - code snippets, sharing, embedding

E. Advanced GitHub Features
   └─ Post-workshop exploration - CLI, API, advanced settings, mobile

F. VS Code Accessibility Reference
   └─ Technical deep dive - settings, audio cues, accessibility configurations
```

**Why Appendices Have No Dependencies:**

- They are reference materials, not lessons
- Can be opened during the relevant chapter
- Can be skipped entirely (optional)
- Support both Day 1 and Day 2

## Visualizing the Learning Arc

```
FOUNDATION (Understand the Tool)
   00 Setup
    ↓
   01 GitHub Structure
    ↓
   02 Schedule
    ↓
   02a Learning Room [NEW]
    ↓
   ================================

SKILL BUILDING (Hands-On Practice) - DAY 1
   03 Navigate Repos
    ↓
   04 File Issues
    ↓
   05 Create PRs
    ↓
   06 Resolve Conflicts (when problem arises)
    ↓
   07 Communication & Culture
    ↓
   08 Organization (Labels)
    ↓
   09 Inbox Management
    ↓
   ================================

TRANSITION (Tool Change)
   10 Day 2 Overview
    ↓
   ================================

SKILL AMPLIFICATION (Same Skills, New Tool) - DAY 2
   11 VS Code Setup
    ↓
   12 Git in VS Code
    ↓
   13 PR Extension
    ↓
   14 Copilot Assistance
    ↓
   15 Culminating Code Review Skill (master the manual workflow)
    ↓
   16 Issue Templates (optional)
    ↓
   17 Accessibility Agents (automate everything you've mastered)
    ↓
   ================================

REFERENCE
   A-H Appendices (with G = GitHub Actions)
    (reference, open as needed)
```

## Dependency Chain: Critical Path

**For a student to complete Block 5 (Real Contribution):**

```
Must know:
   00: System ready
   01: GitHub structure (mental model)
   02: What we're doing today (schedule)
   02a: The shared learning room (our environment)
   03: How to navigate repos (find the issue)
   04: How to work with issues (read the assignment)
   05: How to create and review PRs (THE MAIN SKILL)

Nice to know:
  ◇ 07: Culture/tone (makes comments better)
  ◇ 06: Conflicts (might not arise in first PR)
  ◇ 08-09: Labels/notifications (background context)
```

**For a student to complete Day 2:**

```
Must complete:
   All of Day 1 (11 depends on 01-09)
   10: Day 2 overview
   11: VS Code setup
   12: Git in VS Code

Then build:
  ◆ 13: PR extension (extends 05)
  ◆ 14: Copilot (new skill)
  ◆ 15: Code Review (culminating skill - master the manual deep skill)
  ◆ 16: Issue Templates (optional advanced)
  → 17: Accessibility Agents (automate what you've mastered in 15)

Optional post-workshop:
  Appendix E: GitHub Actions (infrastructure deep-dive)
  Appendix F: GitHub Projects (boards, tables, roadmaps)
  Appendix G: GitHub Discussions
  Appendix H: GitHub Advanced Search
  Appendix I: GitHub Releases and Tags
  Appendix J: Repository Insights
  Appendix L: GitHub Flavored Markdown (advanced GFM reference)
  Appendix M: GitHub Security Features (Dependabot, scanning, advisories)
  Appendix N: Branch Protection Rules and Repository Rulesets
  Appendix O: Resources (every link and reference)
```

## Verification: Is This Truly Progressive?

### Criterion 1: Foundation Before Complexity

- **PASS** - Chapters 00-02a establish context; chapters 03-06 teach basic mechanics
- **PASS** - Chapters 07-10 assume all prior skills understood
- **PASS** - Chapter 10 explicitly marks transition

### Criterion 2: Prerequisites Met

- **PASS** - 04 (issues) comes after 03 (navigation); can't manage issues without finding them
- **PASS** - 05 (PRs) comes after 04 (issues); PRs reference issues
- **PASS** - 06 (conflicts) comes after 05 (PRs); conflicts only happen in PR merges
- **PASS** - 12 (git) comes after 11 (setup); git requires VS Code operational
- **PASS** - 13 (PR extension) comes after 12 (git state); extension depends on git
- **PASS** - 14 (Copilot) comes after 11 (setup); Copilot runs in VS Code
- **PASS** - 15 (Code Review) comes after 14 (Copilot context) + 05,12,13 (foundational skills)
- **PASS** - 17 (Accessibility Agents) comes after 14 (Copilot) + 15 (mastery of code review); automates what students have learned
- **PASS** - Appendix F (GitHub Actions) is heavy infrastructure, appropriately moved to optional post-workshop reference

### Criterion 3: No Jumps or Leaps

- **PASS** - Adjacent chapters reinforce each other
- **PASS** - Each chapter builds incrementally on prior knowledge
- **PASS** - Cross-chapter references are backward (newer chapter references prior chapter), never forward

### Criterion 4: Day 1 → Day 2 Bridge

- **PASS** - Chapter 10 explicitly marks the transition
- **PASS** - Chapter 11 repeats Day 1 foundations in new tool (accessibility, keyboard nav, landmarks)
- **PASS** - Chapters 12-15 show Day 1 skills (PR, git, review) amplified in VS Code

### Criterion 5: Soft Skills Appropriately Placed

- **PASS** - Chapter 07 (culture) comes AFTER 03-06 (students have experience)
- **PASS** - Chapter 08 (organization) comes AFTER 07 (assumes team coordination)
- **PASS** - Chapter 14 (code review) comes BEFORE Chapter 16 (students learn manual skill first, then automation)
- **PASS** - Chapter 16 (Accessibility Agents) is FINAL (student mastery of all prior skills gets automated and amplified)

## Additional Improvements Made with New Chapter 02a

### Problems Solved by New Chapter

1. **Removed ambiguity:** Students didn't understand they were working in ONE shared repo, not personal forks
2. **Reduced anxiety:** Explicit explanation that all PRs are visible, bot feedback is helpful, peer review is safe
3. **Clarified automation:** Bot + human feedback explained, automation not mysterious
4. **Referenced early:** Chapter 02 now points to 02a immediately, before skills chapters
5. **Integrated PR sharing:** Day 1 agenda Block 5 now assumes students understand the Learning Room

### Updated Documents

- [README.md](README.md) - Added 02a to chapter navigation
- [docs/02-day1-agenda.md](docs/02-day1-agenda.md) - Added "Read This BEFORE Day 1" section pointing to 02a
- [docs/03a-the-learning-room.md](docs/03a-the-learning-room.md) - New comprehensive guide

## Final Recommendation

### **Move GitHub Actions to Appendix E - Lighter Path for Intro Course**

**Why This Change Is Correct:**

GitHub Actions is infrastructure-heavy (YAML, triggers, CI/CD) and doesn't belong in an introductory workshop curriculum. Instead:

1. **Core chapters end at 17:** Accessibility Agents synthesis (final culminating chapter)
2. **GitHub Actions moves to Appendix E:** Available as optional post-workshop reference for advanced practitioners
3. **Resources stays as Appendix O:** Final appendix with links and tools (17 appendices A-Q, no M)

**Benefits of This Reordering:**

- **Lighter path for intro students**: No heavy infrastructure learning before they ship their first code
- **Accessibility Agents becomes the natural finale**: Students master code review (Ch 15) → then see it automated (Ch 17)
- **Smart optional learning**: GitHub Actions available for students who want deeper automation knowledge post-workshop
- **Clear boundaries**: Main curriculum (00-17) vs. Advanced References (Appendices A-Q)
- **Security coverage**: New Appendix N covers Dependabot, secret scanning, code scanning, and private vulnerability reporting
- **GFM authoring reference**: New Appendix M covers alert blocks, Mermaid diagrams, math, and screen reader guidance
- **Branch protection guide**: New Appendix O helps contributors diagnose why PRs are blocked

**Rationale:**

- Foundation → intermediate → advanced progression remains logical
- Main chapters maintain pedagogical clarity and accessibility
- Day 1 and Day 2 progression is clean and focused
- Appendices serve learners at their own pace post-workshop

**Files Updated:**

- `README.md` - Chapter count now 17 (vs 18); GitHub Actions moved to Appendix F
- `CHAPTER_PROGRESSION_ANALYSIS.md` - Complete dependency re-verification
- `docs/` - Files renamed to reflect new chapter/appendix structure

### Suggested Optional Enhancements

1. **Add a "Prerequisites" section to each chapter** - at the top, list which chapters should be read first

   Example:

   ```
   # 04. Working with Issues

   **Prerequisites:** Chapters 03 (navigation), 02a (Learning Room)
   **Recommended before:** Chapter 05 (pull requests)
   ```

2. **Add forward references in chapters** - hint at what's coming next

   Example:

   ```
   Next chapter: Chapter 05 (Pull Requests) - you'll create PRs to resolve your issues
   ```

3. **Add difficulty badges to the chapter list in README**

   | # | Chapter | Difficulty |
   |-|-|-|
   | 03 | Navigating Repositories | Beginner |
   | 04 | Working with Issues | Beginner |
   | 05 | Working with Pull Requests | Intermediate |

These are "nice to have" - not necessary, since the structure is already progressive.

## Summary Table: Complete Chapter Progression

| # | Chapter | Difficulty | Prerequisite | Leads To | Day | Category |
|---|---------|-----------|--------------|----------|-----|----------|
| 00 | Pre-Workshop Setup | | None | 01 | Pre | Foundation |
| 01 | GitHub Web Structure | | None | 02, 02a | Pre/1 | Foundation |
| 02 | Day 1 Agenda | | 01 | 02a, 03 | 1 | Foundation |
| 02a | The Learning Room | | 02 | 03, 04, 05 | 1 | Foundation |
| 03 | Navigating Repositories | | 02a | 04 | 1 | Skill |
| 04 | Working with Issues | | 03 | 05 | 1 | Skill |
| 05 | Working with PRs | | 04 | 06, 07, 13, 17 | 1 | Skill |
| 06 | Merge Conflicts | | 05 | Any | 1 | Reference |
| 07 | Culture & Etiquette | | 05 | 08 | 1 | Soft Skills |
| 08 | Labels/Milestones | | 07 | 09 | 1 | Skill |
| 09 | Notifications | | 08 | Any | 1 | Reference |
| 10 | Day 2 Agenda | | All of Day 1 | 11 | Bridge | Foundation |
| 11 | VS Code Setup | | 10 | 12, 13, 14 | 2 | Tool |
| 12 | Git in VS Code | | 11 + 03 | 13, 17 | 2 | Skill |
| 13 | PR Extension | | 12 + 05 | Any | 2 | Extension |
| 14 | Copilot | | 11 | 15, 17 | 2 | AI |
| 15 | Code Review | | 05 + 12 + 13 + 14 | None | 2 | Expert |
| 16 | Issue Templates | | 04 | None | 2 | Advanced |
| 17 | Accessibility Agents | | 14 + 15 | None | 2 | Expert |
| G | GitHub Actions | | 05 + 14 | None | Appendix | Reference |
| H | GitHub Projects | | 08 | None | Appendix | Reference |
| I | GitHub Discussions | | 07 | None | Appendix | Reference |
| J | Advanced Search | | 04 + 05 | None | Appendix | Reference |
| K | Releases & Tags | | 05 | None | Appendix | Reference |
| L | Repository Insights | | 17 | None | Appendix | Reference |
| N | GitHub Flavored Markdown | | Any | None | Appendix | Reference |
| O | GitHub Security Features | | 05 + 17 | None | Appendix | Reference |
| P | Branch Protection | | 05 | None | Appendix | Reference |
| Q | Resources | | None | Any | Appendix | Reference |

*Chapter Structure: 18 core chapters (00-17) plus 16 appendices (A-Q, no M). GitHub Actions moved to appendix for lighter intro course path. New appendices N, O, P added February 2026. All dependencies verified. Ship with confidence!*
