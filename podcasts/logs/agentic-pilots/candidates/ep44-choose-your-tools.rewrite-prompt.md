You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep44-choose-your-tools
Title: Episode 44: Choose Your Tools
Description: A guided tour of browser GitHub, github.dev, VS Code, GitHub Desktop, and the CLI.

Concept checklist to preserve:
- Why the workshop teaches multiple tool paths instead of one right way
- Browser GitHub as the Day 1 foundation
- github.dev as the bridge from browser to editor
- VS Code as the full Day 2 workspace
- GitHub Desktop and CLI as optional alternate paths
- How screen reader users choose tools based on task, comfort, and access needs

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Table of Contents
- ## 1. Why This Matters
- ## 2. The Five Paths
- ## 3. Path 1: GitHub.com (Browser)
- ### What you can do here
- ### What you cannot do here
- ### Screen reader experience
- ### Low vision experience
- ### Learning Cards: GitHub.com (Browser)
- ## 4. Path 2: github.dev (Browser-Based Editor)
- ### What you can do here
- ### What you cannot do here
- ### How to open it
- ### Screen reader experience
- ### When to use github.dev over GitHub.com
- ## 5. Path 3: VS Code (Desktop)
- ### What you can do here
- ### What you cannot do here (without extensions)
- ### Screen reader experience
- ### Low vision experience
- ### Learning Cards: VS Code (Desktop)
- ## 6. Path 4: GitHub Desktop
- ### What you can do here
- ### What you cannot do here
- ### Screen reader experience
- ### When to choose GitHub Desktop
- ## 7. Path 5: GitHub CLI
- ### What you can do here
- ### What you cannot do here
- ### Screen reader experience
- ### When to choose GitHub CLI
- ### Learning Cards: GitHub CLI
- ## 8. Which Path Should I Start With?
- ### Day 1 recommendation
- ### Day 2 recommendation
- ### Switching paths is normal
- ### Learning Cards: Which Path Should I Start With?
- ## 9. Your First Confidence Exercise
- ### The task
- ### Path 1: GitHub.com
- ### Path 2: github.dev
- ### Path 3: VS Code (if set up)
- ### Path 4: GitHub Desktop
- ### Path 5: GitHub CLI
- ### What success looks like
- ## 10. If You Get Stuck
- ## Authoritative Sources
- ### Section-Level Source Map

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
Welcome to Git Going with GitHub, episode 44: Choose Your Tools. I am Alex. Today we are going to make Choose Your Tools feel magical in practice: clear, teachable, and recoverable when the interface surprises you.

[JAMIE]
And I am Jamie. I will be the voice of the learner who is willing to ask, what is this for, where am I, and how do I know I did it right?

[PAUSE]

[ALEX]
The big idea today: A guided tour of browser GitHub, github.dev, VS Code, GitHub Desktop, and the CLI. We will name the concept, explain why it matters, practice the move, and point out the checks that make the outcome feel almost magical because it is verifiable.

[JAMIE]
So the episode should work even if someone has not read the chapter yet.

[ALEX]
Exactly. The transcript has to stand on its own. It can point toward practice, but it should teach the concept right here in the conversation.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
1. Why This Matters: There is no single "right" way to use GitHub. The next useful detail is concrete: Some switch between all of them depending on the task.

[ALEX]
The next layer is this. Here is the learner-facing version. The following table summarizes all five environments at a glance. Put another way, read through the summaries first, then explore the sections that interest you. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
What stays the same when the tool changes?

[ALEX]
This is the move inside 3. Path 1: GitHub.com (Browser): what it is: The GitHub website at github.com. That matters in practice: Every repository, issue, pull request, and setting lives here.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. What you can do here has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
For a learner, the useful signals are concrete. Browse repositories, files, and folders. Create, comment on, and close issues. Open, review, and merge pull requests. Edit individual files using the built-in web editor (pencil icon). Manage labels, milestones, and project boards. Configure repository settings and branch protection.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
What you cannot do here has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. Run code or tests locally. Use a full-featured code editor with extensions. Make offline changes.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat Screen reader experience as decoration. GitHub.com has strong screen reader support. That is not trivia. Every page uses ARIA landmarks, headings follow a consistent hierarchy, and keyboard shortcuts are available for most actions. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If the interface shifts, Low vision experience is still useful because GitHub supports light and dark themes, high contrast themes, and responds to your operating system's contrast preferences. For someone navigating by keyboard or screen reader, this detail matters: GitHub's layout adapts to browser zoom up to 400% without horizontal scrolling on most pages.

[ALEX]
Start here: Go to github.com/settings/appearance. Then: Choose from Light, Dark, Light high contrast, or Dark high contrast. Next: Or select "Sync with system" to follow your OS setting. The sequence works because every action has a confirmation.

[ALEX]
This is where the talk moves from concept to action. Learning Cards: GitHub.com (Browser) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. Press S on any GitHub page to jump to the main search field; press / as an alternative. Press D in Browse Mode to jump between ARIA landmark regions; the repository tabs (Code, Issues, Pull Requests) are inside the "Repository navigation" landmark. Press G then I (two keystrokes in sequence) to jump directly to the Issues tab from anywhere in a repository. Switch to "High contrast dark" or "High contrast light" at github.com/settings/appearance for maximum border and text contrast. Browser zoom up to 200% keeps GitHub's layout intact; above 200% the repository sidebar collapses into a hamburger menu. Enable "Link underlines" in GitHub Accessibility settings so links are distinguishable without color.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the common workflow underneath the different interfaces?

[ALEX]
The teaching point here is not the label; it is the move. What it is: A VS Code editor that runs entirely in your browser. That is the difference between guessing and knowing: Open any repository by pressing the.

[PAUSE]

[ALEX]
Before the learner moves on. What you can do here has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That becomes easier when you listen for these cues. Edit multiple files in a VS Code-like interface with a file explorer, tabs, and an integrated terminal preview. View file diffs and stage changes. Commit directly to a branch. Use many VS Code extensions that run in the browser.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
If someone is taking notes, this is the short list. Run code, build projects, or execute terminal commands (the terminal is read-only for Git operations). Use extensions that require a local runtime (debuggers, compiled tools). Work offline.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. github.dev is VS Code running in the browser, so the same keyboard navigation and screen reader support applies. The next useful detail is concrete: The command palette (Ctrl+Shift+P or Cmd+Shift+P) is available, and all editor keybindings work.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside When to use github.dev over GitHub.com: use github.dev when you need to edit more than one file in a single commit, or when you want the code editor experience without installing anything. Put another way, for single-file edits, the pencil icon on GitHub.com is simpler.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on 5. Path 3: VS Code (Desktop). What it is: Visual Studio Code is a free desktop code editor from Microsoft. That matters in practice: It has built-in Git support, an integrated terminal, thousands of extensions, and GitHub Copilot included. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
What you can do here has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The useful version is not abstract; it sounds like this. Edit files with full IntelliSense, syntax highlighting, and extension support. Use the integrated terminal to run Git commands, scripts, and programs. Stage, commit, push, and pull using the Source Control panel or the terminal. Run and debug code. Use GitHub Copilot for code suggestions, chat, and code review. Work offline (Git operations sync when you reconnect).

[PAUSE]

[ALEX]
The next point gives the learner a handle. What you cannot do here (without extensions) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Manage GitHub issues and pull requests directly (install the GitHub Pull Requests extension for this). View repository insights or settings (use GitHub.com for that).

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
If the interface shifts, Screen reader experience is still useful because VS Code has a dedicated accessibility mode that activates automatically when a screen reader is detected. That is not trivia. Deep dive: Chapter 11 covers the VS Code interface in detail.

[ALEX]
A few details make that real. Screen reader optimized mode announces line content, cursor position, and editor state. The Accessibility Help dialog (Alt+F1 or Option+F1) is available in every view. All panels are reachable via keyboard shortcuts.

[ALEX]
Hold that next to this. Put Low vision experience into plain language. VS Code supports high contrast themes, custom zoom levels (Ctrl+= to zoom in, Ctrl+- to zoom out), and configurable font sizes. For someone navigating by keyboard or screen reader, this detail matters: The minimap (the small code preview on the right side of the editor) can be disabled if it is distracting: open the command palette, type "minimap," and toggle the setting. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
There are a lot of tools in play. How do we keep that from feeling like a contest?

[ALEX]
Learning Cards: VS Code (Desktop) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. Press Ctrl+Shift+E to focus the File Explorer tree; Up/Down Arrow navigates files, Enter opens a file, Right Arrow expands a folder. Press Ctrl+Shift+G to focus Source Control; the tree lists changed files and each item announces its Git status (modified, untracked, etc.). Press Alt+F1 inside any view to open the Accessibility Help dialog, which lists every keyboard shortcut for that specific panel. Press Ctrl+K Ctrl+T to open the theme picker; "High Contrast" and "High Contrast Light" offer the strongest visual differentiation. Press Ctrl+= repeatedly to zoom the entire interface; the zoom level persists after restart. Disable the minimap to reclaim screen width: Ctrl+Shift+P, type "minimap", toggle "Editor: Minimap Enabled" off.

[ALEX]
That connects to another useful point. This part earns its place because what it is: A desktop application that provides a graphical interface for Git operations. That is the difference between guessing and knowing: Instead of typing git commit in a terminal, you use buttons, lists, and visual diffs.

[JAMIE]
Let's pause on What you can do here. What should a learner take away from it?

[ALEX]
On the ground, that means a few things. Clone repositories with one click. Create, switch, and merge branches. View file diffs in a side-by-side or unified view. Stage individual files or specific lines within a file. Commit with a message and push to GitHub. Open pull requests (launches GitHub.com).

[PAUSE]

[ALEX]
Here is the practical turn. What you cannot do here has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. Edit code (GitHub Desktop is a Git client, not a code editor -- it opens your preferred editor). Review pull requests with inline comments. Manage issues, labels, or project boards.

[JAMIE]
Let's pause on Screen reader experience. What should a learner take away from it?

[ALEX]
This is the move inside Screen reader experience: GitHub Desktop uses Electron and provides basic screen reader support. The next useful detail is concrete: Branch switching, commit history, and file lists are navigable.

[JAMIE]
That is a useful checkpoint before anyone starts pressing keys.

[ALEX]
Exact

[...middle omitted for length...]

alk it in order: Go to github.dev/Community-Access/git-going-with-github; The file explorer opens on the left. Press Ctrl+Shift+E (or Cmd+Shift+E) to focus it; Navigate to README.md and press Enter to open it in a tab; and You are done when the file content appears in the editor. That small check between steps is what makes the workflow reliable.

[JAMIE]
So this is less about memorizing and more about noticing.

[ALEX]
Right. Once the learner can name the move, the interface becomes much less intimidating.

[JAMIE]
What is the ordered workflow?

[ALEX]
Path 3: VS Code (if set up) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Open VS Code; Open the command palette: Ctrl+Shift+P (or Cmd+Shift+P); Type "Git: Clone" and press Enter; and Paste the URL: https://github.com/Community-Access/git-going-with-github.git. The sequence works because every action has a confirmation.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
The path is straightforward once it is named. Step one is choose a folder to clone into and wait for the download. Step two is when it finishes, VS Code offers to open the repository. Accept. Step three is open the file explorer (Ctrl+Shift+E) and select README.md. Step four is you are done when the file content appears in the editor. Keep it that plain: know where you are, make the move, check the result.

[PAUSE]

[JAMIE]
Let's pause on Path 4: GitHub Desktop. What should a learner take away from it?

[ALEX]
Path 4: GitHub Desktop has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is open GitHub Desktop. Step two is go to File, then Clone repository (or press Ctrl+Shift+O). Step three is paste the URL: https://github.com/Community-Access/git-going-with-github.git. Step four is choose a local path and click Clone. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Before we leave Path 4: GitHub Desktop, what is the practical point?

[ALEX]
First, once cloned, the repository appears in GitHub Desktop. Click "Open in Visual Studio Code" (or your preferred editor) to read the README. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on Path 5: GitHub CLI. What should a learner take away from it?

[ALEX]
Path 5: GitHub CLI has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, open your terminal. Then, open the README in your preferred way. After that, you are done when you can read the first paragraph. Pause after each step and listen for the confirmation before moving on.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like gh repo clone Community-Access/git-going-with-github; cd learning-room. cat README.md print to terminal; code README.md open in VS Code. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. You opened a real repository and found a real file. That is the difference between guessing and knowing: That is the core action of this entire workshop -- everything else builds on it. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[PAUSE]

[JAMIE]
How should someone ask for help in a way that gets them unstuck faster?

[ALEX]
This is the move inside 10. If You Get Stuck: next Step: Start your learning journey with Chapter 02: Understanding GitHub. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Next: Chapter 02: Understanding GitHub Back: Chapter 00: Pre-Workshop Setup Related appendices: Appendix H: GitHub Desktop Appendix I: GitHub CLI Appendix J: Codespaces.

[ALEX]
Keep the teaching thread moving. Anchor this part on Section-Level Source Map. Use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Why This Matters: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. The Five Paths: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Path 1: GitHub.com (Browser): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Path 2: github.dev (Browser-Based Editor): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Path 3: VS Code (Desktop): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Path 4: GitHub Desktop: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 44. Next in the series is episode 45, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
