You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep19-screen-reader-cheatsheet
Title: Episode 19: Screen Reader Cheat Sheet
Description: NVDA, JAWS, and VoiceOver commands for GitHub and VS Code.

Concept checklist to preserve:
- NVDA essential navigation: headings, landmarks, forms, tables, links
- NVDA browse mode versus focus mode
- JAWS essential navigation: matching patterns
- VoiceOver on macOS: rotor, VO keys, web navigation
- GitHub keyboard shortcuts: ?, g i, g p, /, t, y, l
- VS Code screen reader shortcuts: accessible help, accessible diff viewer
- Quick navigation patterns for common tasks

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## GitHub Navigation with NVDA, JAWS, and VoiceOver
- ### Learning Cards: Using This Cheat Sheet
- ## Screen Reader Mode Basics
- ### Browse Mode (also called Virtual Cursor / Reading Mode)
- ### Focus Mode (also called Forms or Application Mode)
- ## Quick Navigation Keys (Browse Mode)
- ### Heading Navigation - Your Most-Used Tool
- ### Landmark Navigation - Jump Between Page Regions
- #### GitHub landmarks you will encounter
- ### Link, Button, and Form Navigation
- ### List and Table Navigation
- ## The Elements List - Your Navigation Superpower
- ### How to use it
- ## Per-Screen-Reader Command Reference
- ### NVDA (Windows)
- #### Single-key navigation (Browse Mode)
- #### Mode switching and reading
- ### JAWS (Windows)
- #### Single-key navigation (Virtual Cursor)
- #### Mode switching and reading
- ### VoiceOver (macOS)
- ### Learning Cards: Task-Based Navigation
- ## Navigating Specific GitHub Pages
- ### Repository Main Page
- ### Issues List Page
- ### Issue Detail Page
- ### Pull Requests List Page
- ### Pull Request Detail - Conversation Tab
- ### Pull Request Detail - Commits Tab
- ### Pull Request Detail - Files Changed Tab
- ### Checking and Enabling Feature Previews
- #### NVDA / JAWS (Browse Mode)
- #### VoiceOver (macOS)
- ## Typing and Submitting Content
- ### Entering text in GitHub (Focus Mode required)
- ### Markdown formatting shortcuts in GitHub text areas
- ## Dropdown Menus and Flyouts
- ### VoiceOver users
- ## GitHub Built-In Keyboard Shortcuts
- ### Using GitHub shortcuts alongside a screen reader
- #### Practical sequence for `G` shortcuts
- ### Discover shortcuts on any page - The `?` Key
- #### Reading the shortcut dialog with a screen reader
- ### Site-wide - work on every GitHub page
- ### Repository navigation - on any repository page
- ### Source code browsing - viewing a file
- ### Issue and pull request lists
- ### Issue and pull request detail pages
- ### Comments - inside any text area (Focus Mode required)
- ### Files Changed tab in pull requests
- ### Notifications page
- ### GitHub Actions
- ### Projects (board and table view)
- ## Common Navigation Patterns - Quick Reference
- ## Troubleshooting Common Issues
- ### "The page doesn't match the instructions"
- ### "I'm hearing too much or navigating too slowly"
- ### "I pressed H but it's typing the letter H"
- ### "I can't find the comment box"
- ### "The diff/code area is hard to navigate"

Anti-repetition constraints:
- do not start with "Welcome to..." in most episodes
- do not use "And I am Jamie." as a fixed boilerplate line
- avoid repeating "orient, act, verify"
- avoid repeating "Carry the map"
- vary opening style across episodes; avoid repetitive intros
- avoid repeating long lines verbatim inside this script
- preserve the same overall script flow and marker order as the current transcript

Current transcript to rewrite:
<<<TRANSCRIPT>>>
[ALEX]
Welcome to episode 19 of Git Going with GitHub: Screen Reader Cheat Sheet. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.

[JAMIE]
And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.

[PAUSE]

[ALEX]
The lesson focus is NVDA, JAWS, and VoiceOver commands for GitHub and VS Code. We will treat every step as a teachable decision, because that is what makes the skill portable and the workflow feel smooth.

[JAMIE]
So we should explain the why clearly enough that the steps make sense when the learner meets them later and still feel doable.

[ALEX]
That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
GitHub Navigation with NVDA, JAWS, and VoiceOver: How to use this sheet: Keep it open in a second window or print it. The next useful detail is concrete: Commands are organized by task so you can find what you need quickly while you work.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
The next layer is this. Learning Cards: Using This Cheat Sheet has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. Use heading navigation (H key) to jump between task categories -- each section is an h2 heading. Open the Elements List (NVDA+F7 or Insert+F6) and switch to the Headings tab to see all sections at once. Tables list commands in the left column and actions in the right -- use Ctrl+Alt+Arrow keys to navigate. Keep this open in a second browser tab or print it for side-by-side reference while working. Command tables are compact -- increase zoom to 150-200% and the two-column layout stays readable. Key names are in backtick code formatting which gives them a distinct visual border.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Screen Reader Mode Basics: before navigating GitHub, understand the two fundamental modes that all screen readers use on the web.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Browse Mode (also called Virtual Cursor / Reading Mode). This is your primary mode for reading and navigating pages. This is the part to say slowly: The screen reader intercepts keystrokes and uses them as navigation commands - for example, pressing H jumps to the next heading rather than typing the letter H.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: this mode is for typing and interacting with form fields, text areas, buttons, and interactive widgets. The listener should be able to check this: Your keystrokes go directly to the web page instead of being captured by the screen reader.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat Quick Navigation Keys (Browse Mode) as decoration. These single-key shortcuts work in Browse Mode (NVDA and JAWS). That is not trivia. VoiceOver users with Quick Nav enabled use the same keys. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
There are a lot of tools in play. How do we keep that from feeling like a contest?

[ALEX]
If the interface shifts, Heading Navigation - Your Most-Used Tool is still useful because GitHub structures pages with headings. For someone navigating by keyboard or screen reader, this detail matters: Jumping between headings is the fastest way to navigate.

[ALEX]
This is where the talk moves from concept to action. Put Landmark Navigation - Jump Between Page Regions into plain language. Landmarks are named regions of a page (navigation, main content, sidebar, etc.).

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. This is one of the most powerful tools for navigating complex pages. That is the difference between guessing and knowing: It opens a dialog listing all headings, links, buttons, form fields, or landmarks on the page.

[PAUSE]

[JAMIE]
What is the ordered workflow?

[ALEX]
How to use it has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is press the keyboard shortcut above. Step two is navigate between the tabs (Headings, Links, etc.) with Tab or arrow keys. Step three is type to filter the list (e.g., type "new issue" to find the New Issue button). Step four is press Enter to jump to the item on the page. The point is not speed; the point is never losing your place.

[JAMIE]
What should someone listen for when a lesson offers more than one tool path?

[ALEX]
Per-Screen-Reader Command Reference: A compact reference organized by screen reader. That gives the learner a foothold: for task-based navigation guides (navigating a PR, leaving a comment, etc.), see the sections below.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. The VO modifier key is Control+Option (abbreviated VO). The next useful detail is concrete: Rotor navigation: Open with VO+U, use ←/→ to switch between element types (Headings, Links, Form Controls, Tables, Landmarks), and ↑/↓ to navigate within a type.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
Learning Cards: Task-Based Navigation has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the pieces that turn the idea into a usable move. The sections below are organized by GitHub page type -- jump to the page you are currently on. Each table shows Goal in the left column and Key Sequence in the right -- read left-to-right per row. Practice one page's commands at a time rather than memorizing everything at once. Each page section has a compact table -- at high zoom, the two-column layout reads naturally. Key sequences are shown in backtick formatting for clear visual distinction from descriptions. Open the matching GitHub page side by side and try each key sequence as you read.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Checking and Enabling Feature Previews. GitHub Feature Previews are opt-in UI improvements. That matters in practice: For screen reader users, two are especially important: New Issues Experience and New Files Changed Experience. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
The reason this matters is simple: see Pre-Workshop Setup, Step 4 for full details on what each feature enables and why it matters for screen reader users.

[PAUSE]

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Entering text in GitHub (Focus Mode required) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. NVDA: Insert+Space. JAWS: Insert+Z (or it switches automatically). VoiceOver: VO+Shift+Down to interact with the text area. JAWS: Insert+Z. VoiceOver: VO+Shift+Up to stop interacting.

[ALEX]
First, navigate to the text field using Browse Mode: F or E for edit fields, Tab for any interactive element. Then, switch to Focus Mode. After that, type your content. Finally, return to Browse Mode when done typing. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Let's pause on Markdown formatting shortcuts in GitHub text areas. What should a learner take away from it?

[ALEX]
If the interface shifts, Markdown formatting shortcuts in GitHub text areas is still useful because these work while in Focus Mode inside a GitHub text area.

[ALEX]
Hold that next to this. Put Dropdown Menus and Flyouts into plain language. GitHub uses popup flyout menus for labels, assignees, reviewers, and branch selection. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
What is the safe way to learn from that example?

[ALEX]
VoiceOver users has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Step 1: Navigate to the button with Tab or VO+Right; Step 2: Activate with VO+Space; Step 3: VO+Down to enter the flyout; Step 4: VO+Right/Left to navigate items; Step 5: VO+Space to select, Esc to close. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
That connects to another useful point. This part earns its place because GitHub has a dedicated keyboard shortcut system built into every page. That is the difference between guessing and knowing: These are completely separate from your screen reader's navigation keys - they are JavaScript-powered shortcuts that trigger GitHub actions directly without using the mouse.

[JAMIE]
Let's pause on Using GitHub shortcuts alongside a screen reader. What should a learner take away from it?

[ALEX]
Using GitHub shortcuts alongside a screen reader: The key issue: when your screen reader is in Browse Mode, it intercepts keystrokes before they reach the page. This is where the workflow starts to feel magical, because the result becomes visible and explainable: GitHub's shortcut system relies on the page receiving the keystroke directly.

[PAUSE]

[JAMIE]
How do you keep commands from becoming magic words?

[ALEX]
Practical sequence for G shortcuts has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Step 1: Press NVDA+Space (or Insert+Z in JAWS) - enter Focus Mode; Step 2: Press G, pause half a second; Step 3: Press the second key (I, P, A, etc.); Step 4: Press NVDA+Space to return to Browse Mode on the new page. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on Discover shortcuts on any page - The? Key. What should a learner take away from it?

[ALEX]
This is the move inside Discover shortcuts on any page - The? Key: start here every time you're on an unfamiliar GitHub page. The next useful detail is concrete: key opens GitHub's built-in keyboard shortcut help dialog.

[JAMIE]
That is a useful checkpoint before anyone starts pressing keys.

[ALEX]
Exactly. Checkpoints turn uncertainty into information.

[ALEX]
Keep the thread going. Anchor this part on Reading the shortcut dialog with a screen reader. The dialog is a standard ARIA modal (role="dialog"). Put another way, when it opens, browser focus moves inside it automatically.

[ALEX]
The room should hear these as checkpoints. It is context-aware - the shortcuts shown change based on your current page. It is always current - GitHub automatically updates it when they add new shortcuts. The dialog is divided into sections: Site-wide, Source code browsing, Issues, Pull requests, Notifications, etc. - only sections relevant to the current page appear. Yo

[...middle omitted for length...]

hey take the next action.

[PAUSE]

[ALEX]
This is where confidence starts to build. "I pressed H but it's typing the letter H" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
For a learner, the useful signals are concrete. You are in Focus Mode - press NVDA+Space (or JAWS+Z) to return to Browse Mode. In Browse Mode, H is a navigation key, not a typing key.

[JAMIE]
Let's pause on "I can't find the comment box". What should a learner take away from it?

[ALEX]
"I can't find the comment box" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. Use D to navigate to the "Add a comment" landmark. Then E or F to jump to the edit field. Switch to Focus Mode before typing.

[ALEX]
Here is the practical turn. "The diff/code area is hard to navigate" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. The Files Changed tab requires Focus Mode to navigate the diff table. Use NVDA+Space to enter Focus Mode, then use arrow keys. Use Ctrl+Alt+Arrow keys to move between table cells.

[PAUSE]

[JAMIE]
Let's pause on Official Screen Reader Resources. What should a learner take away from it?

[ALEX]
Official Screen Reader Resources has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. GitHub Repos Screen Reader Guide. GitHub Issues Screen Reader Guide. GitHub Pull Requests Screen Reader Guide. GitHub Copilot in VS Code Screen Reader Guide. GitHub Accessibility Settings Docs. GitHub Keyboard Shortcuts Reference.

[ALEX]
Before the learner moves on. Put Keyboard Shortcuts in Other Appendices into plain language. This cheat sheet covers GitHub web navigation and screen reader commands. The listener should be able to check this: Additional keyboard shortcuts for specific tools are documented in. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So this is less about memorizing and more about noticing.

[ALEX]
Right. Once the learner can name the move, the interface becomes much less intimidating.

[JAMIE]
Let's pause on Screen Reader Compatibility Notes. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. The commands in this cheat sheet have been written for and tested with the following screen readers.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
This part earns its place because next: Appendix C: Markdown Reference Back: Appendix A: Glossary Teaching chapter: Chapter 02: Understanding GitHub.

[ALEX]
The path is straightforward once it is named. Step one is check that you are in the correct mode (Browse Mode vs. Focus Mode). Step two is verify your screen reader version - older versions may use different key assignments. Step three is check GitHub's own shortcut dialog (? key) for the current page's shortcuts. Step four is see Troubleshooting above for common fixes. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
Section-Level Source Map: Use this map to verify facts for each major section in this file.

[ALEX]
These are the details that keep the idea from floating away. GitHub Navigation with NVDA, JAWS, and VoiceOver: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Screen Reader Mode Basics: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Quick Navigation Keys (Browse Mode): GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. The Elements List - Your Navigation Superpower: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Per-Screen-Reader Command Reference: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Navigating Specific GitHub Pages: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 19. Next in the series is episode 20, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
