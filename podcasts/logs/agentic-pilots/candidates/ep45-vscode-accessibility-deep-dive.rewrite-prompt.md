You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep45-vscode-accessibility-deep-dive
Title: Episode 45: VS Code Accessibility Deep Dive
Description: Keyboard navigation, accessible views, terminal access, signals, speech, and Copilot accessibility in VS Code.

Concept checklist to preserve:
- Accessible View and Accessible Help in VS Code
- Navigating panels, problems, terminal output, and diffs
- Accessibility signals and when audio cues help
- Speech and dictation features
- Reading Copilot responses accessibly
- Recovering focus when VS Code feels noisy or confusing

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Accessibility Features for Power Users
- ## Table of Contents
- ## 12. Essential Keyboard Navigation and Find/Filter
- ### Panels and Areas
- ### Within the Editor
- ### Find in Current File (`Ctrl+F`)
- #### Screen reader interactions inside the Find widget
- ### Global Search Across the Workspace (`Ctrl+Shift+F`)
- #### Glob pattern examples for this workshop
- ### Type-to-Filter in Tree Views
- ### Go to Symbol with Inline Filtering (`Ctrl+Shift+O`)
- ### Explorer (File Tree) Navigation
- ### Learning Cards: Keyboard Navigation and Find
- ## 13. The Problems Panel
- ### Opening the Problems Panel
- ### Navigating Problems
- ### Understanding Problem Entries
- ### Learning Cards: Problems Panel
- ## 14. The Terminal
- ### Opening and Managing Terminals
- ### Terminal Shell Integration
- ### Terminal Accessibility
- ### Learning Cards: Terminal
- ## 15. Copilot Chat Window
- ### Opening Copilot Chat
- ### Chat Modes
- ### Using Chat Participants
- ### Learning Cards: Copilot Chat
- ### Agent Mode: Question Carousel and Terminal Focus
- ## 16. Accessible Help, Accessible View, and Accessible Diff
- ### 16.1 Accessible Help - Context-Aware Keyboard Guide
- #### How to open Accessible Help
- #### Example output when pressing `Alt+H` in the editor
- ### 16.2 Accessible View - Reading Dynamic and Streamed Content
- #### How to open Accessible View
- #### What Accessible View provides
- #### Recommended workflow for Copilot Chat
- #### Recommended workflow for hover documentation
- ### 16.3 Accessible Diff Viewer - Reading Changes Without Visual Scanning
- #### How to open the Accessible Diff Viewer
- #### What the Accessible Diff Viewer announces
- #### Practical uses during this workshop
- #### Audio cues for diffs
- ### Learning Cards: Accessible Help, View, and Diff
- ## 17. Accessibility Signals
- ### How Signals Work: The Dual-Channel Architecture
- ### Discovering Signals: The Two Essential Commands
- ### Volume Control
- ### Complete Signal Reference
- #### Editor Signals
- #### Diff Signals
- #### Terminal Signals
- #### Chat and Copilot Signals
- #### Debug Signals
- #### Editor Action Signals
- #### Voice Signals
- #### Code Action Signals
- ### Debounce Settings for Position Signals
- ### Recommended Workshop Profile
- ### Migrating from Legacy Audio Cues

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
Welcome back to Git Going with GitHub. This is episode 45: VS Code Accessibility Deep Dive. I am Alex, and today we are turning VS Code Accessibility Deep Dive from a list of instructions into a working mental model that actually feels alive.

[JAMIE]
And I am Jamie. I will stop us whenever the instructions sound simple on paper but feel less magical at the keyboard with a screen reader.

[PAUSE]

[ALEX]
Keyboard navigation, accessible views, terminal access, signals, speech, and Copilot accessibility in VS Code. That is the surface description. Underneath it, we are building judgment: where to focus, what to ignore, and how to verify the result.

[JAMIE]
So we are not using the audio as a shortcut around learning. We are using it to make the learning easier to enter and easier to remember.

[ALEX]
Yes. A good audio lesson gives someone enough context to try the work with confidence, even before they open the written material.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Accessibility Features for Power Users: Challenge 10: Go Local depends on the accessibility features covered in this chapter. The next useful detail is concrete: Configure these settings before your first local commit.

[ALEX]
The next layer is this. Here is the learner-facing version. Mac users: Substitute Cmd for Ctrl and Option for Alt in all shortcuts below. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Find in Current File (Ctrl+F): when the Find widget opens, three toggle buttons refine what matches.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Screen reader interactions inside the Find widget. Replace (Ctrl+H): Opens the Find widget with a second input for the replacement text.

[ALEX]
For a learner, the useful signals are concrete. Toggles are announced as checkboxes - press Space to toggle each one. Match count is announced as you type (example: 3 of 12 matches). F3 / Shift+F3 move through matches while the widget stays open. Escape closes the widget and returns focus to your last cursor position. Ctrl+Shift+1 - replace the current match. Ctrl+Alt+Enter - replace all matches at once.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: the global Search panel has a rich filtering system - all keyboard-accessible.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Do not treat Type-to-Filter in Tree Views as decoration. In the Explorer file tree and the Source Control changes list, type characters to narrow visible items. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
First, focus the Explorer (Ctrl+Shift+E). Then, start typing a filename - a filter input appears at the bottom of the tree. After that, the tree instantly narrows to matching files. Finally, press Escape to clear the filter and restore full view. That small check between steps is what makes the workflow reliable.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, Go to Symbol with Inline Filtering (Ctrl+Shift+O) is still useful because in any Markdown file, Ctrl+Shift+O opens a symbol picker populated by every heading. For someone navigating by keyboard or screen reader, this detail matters: Type to narrow the list, then press Enter to jump.

[ALEX]
This is where the talk moves from concept to action. Learning Cards: Keyboard Navigation and Find has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. Press Ctrl+M to toggle Tab focus mode -- when on, Tab moves focus between UI elements instead of inserting a tab character. Use Ctrl+G then type a line number to jump directly to any line; type 10:5 to land at line 10, column 5. In the Find widget (Ctrl+F), match count is announced as you type (e.g., "3 of 12 matches"); press F3 / Shift+F3 to step through results. Keyboard Shortcuts editor (Ctrl+K Ctrl+S): After typing a search query, your screen reader announces "Use Ctrl+Down Arrow to access the searched shortcut details" -- press Ctrl+Down to jump from the search input directly to the matching results table. Disable. Press Alt+Z to toggle word wrap so long lines stay visible without horizontal scrolling at high zoom. Increase font size with Ctrl+= (Mac: Cmd+=) independently of your OS magnification for sharper text rendering.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. The Problems panel (Ctrl+Shift+M) shows all errors, warnings, and informational messages from linters, compilers, and extensions for every open file in your workspace.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[PAUSE]

[ALEX]
Before the learner moves on. Opening the Problems Panel has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That becomes easier when you listen for these cues. Keyboard: Ctrl+Shift+M. Status Bar: Click the errors/warnings count (bottom-left of window). Menu Bar: View then Problems. From the editor: Press F8 to jump to the next problem (cycles through errors in the current file).

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Understanding Problem Entries has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. Severity icon: Error (red circle with X), Warning (yellow triangle), Info (blue circle with i). Message: Description of the problem. Source: Which tool reported it (e.g., "markdownlint", "eslint", "Pylance"). File and line: Where the problem is located.

[ALEX]
Now slow down for the part people usually miss. Learning Cards: Problems Panel has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part that makes the next action easier. Press Ctrl+Shift+M to focus the Problems panel. Your screen reader announces the total count. Each problem is read as: severity, message, source, file name, and line number. Press Enter on any problem to jump directly to that line in the editor. Use F8 / Shift+F8 from inside the editor to cycle through problems without opening the panel. The status bar errors/warnings count updates in real time and is announced when you Tab to it. Problems are color-coded: red for errors, yellow for warnings, blue for info.

[PAUSE]

[JAMIE]
Let's pause on 14. The Terminal. What should a learner take away from it?

[ALEX]
This is the move inside 14. The Terminal: VS Code includes a fully featured integrated terminal. Put another way, you can run shell commands, Git operations, and scripts without leaving the editor.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Terminal Shell Integration. VS Code's shell integration enhances the terminal. That matters in practice: Enable Terminal IntelliSense: Settings (Ctrl+,) then search terminal.integrated.suggest.enabled then set to on. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. Command decoration marks - visual indicators showing where each command started and whether it succeeded or failed. Run recent command (Ctrl+R in terminal) - VS Code's quick pick of your recent commands, searchable by name. Terminal IntelliSense (Ctrl+Space) - completion suggestions for shell commands, file paths, and arguments.

[JAMIE]
Let's pause on Learning Cards: Terminal. What should a learner take away from it?

[ALEX]
Learning Cards: Terminal has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The useful version is not abstract; it sounds like this. Press Ctrl+ ` to toggle the terminal. Your screen reader announces "Terminal" and the shell prompt. The terminal acts like a standard text input - type commands and press Enter. Press Alt+H while in the terminal for a full list of terminal-specific keyboard shortcuts. Use Ctrl+R to open the "Run Recent Command" picker - a searchable list of your recent commands. Terminal Navigation Mode: Commands for moving between lines help when reviewing output with a screen reader. VS Code enforces a minimum contrast ratio (4.5:1 by default) for terminal text.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Do not treat 15. Copilot Chat Window as decoration. The Copilot Chat window (Ctrl+Alt+I, or Chat: Open Chat from the Command Palette if your keymap differs) is your conversational AI assistant within VS Code. The listener should be able to check this: It can answer questions, generate code, explain code, fix problems, and help with documentation.

[JAMIE]
Let's pause on Chat Modes. What should a learner take away from it?

[ALEX]
If the interface shifts, Chat Modes is still useful because switch modes using the mode picker at the top of the Chat view, or use keyboard shortcuts.

[ALEX]
A few details make that real. workbench.action.chat.openAsk - Ask mode. workbench.action.chat.openEdit - Edit mode. workbench.action.chat.openAgent - Agent mode.

[ALEX]
Hold that next to this. Put Using Chat Participants into plain language. Type @ in the chat input to see available participants. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Here are the anchors worth keeping. @workspace - Ask questions about your entire codebase. @vscode - Ask about VS Code settings and features. @terminal - Run commands or explain terminal output.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on Learning Cards: Copilot Chat. What should a learner take away from it?

[ALEX]
Learning Cards: Copilot Chat has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. Press Ctrl+Alt+I, or run Chat: Open Chat from the Command Palette, to open Chat. Focus lands in the text input - start typing your question. After submitting, wait for the response to complete (audio cue plays if accessibility.signals.chatResponseReceived is on). Press Alt+F2 (Accessible View) to read the complete response in a clean, navigable text view. Navigate response content with Up/Down Arrow in the Accessible View. Press Escape to return to the chat input for follow-up questions. The Chat view appears in the sidebar and respects your zoom level and font settings.

[ALEX]
That connects to another useful point. This part earns its place because when Copilot's Agent mode is running a terminal command and needs your input -- such as a password prompt, confirmation, or interactive installer question -- VS Code displays a question carousel in the Chat panel. That is the difference between guessing and knowing: The carousel shows what the terminal is asking and lets you respond without switching focus to the terminal manually.

[JAMIE]
What do you want them to do when the plan breaks?

[ALEX]
16. Accessible Help, Accessible View, and Accessible Diff: See also: Appendix G: VS Code Reference has a complete keyboard

[...middle omitted for length...]

. Heading levels that skip (jumping from to ). Missing blank lines before and after headings, lists, and code blocks. Inconsistent list markers (mixing - and ). Trailing spaces and hard tabs.

[ALEX]
The path is straightforward once it is named. Step one is open Extensions: Ctrl+Shift+X (Mac: Cmd+Shift+X). Step two is search for markdownlint. Step three is install the one by David Anson. If one step does not match what you hear, stop there and re-orient.

[PAUSE]

[JAMIE]
Let's pause on Outline View for Headings. What should a learner take away from it?

[ALEX]
Outline View for Headings: The Outline view shows the heading structure of your Markdown file as a navigable tree -- think of it as a table of contents you can jump through. That is not trivia. The Go to Symbol list (Ctrl+Shift+O) announces each heading with its level -- for example, "H2 Installation" or "H3 Configuring rules." This is the fastest way to verify your document structure without scrolling through the entire file.

[ALEX]
Here is the part to remember. Open Outline: Press Ctrl+Shift+O (Mac: Cmd+Shift+O) to open the Go to Symbol quick-pick, which lists every heading in the file. Type to filter, then press Enter to jump. Outline panel: The Outline view also appears in the Explorer sidebar. Press Ctrl+Shift+E to open Explorer, then Tab until you reach the Outline section. Breadcrumbs: The breadcrumb bar at the top of the editor shows your current heading context. Press Ctrl+Shift+. to focus breadcrumbs and navigate between headings.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. If you have GitHub Copilot enabled (see Chapter 16), it can help with Markdown authoring directly in the editor. For someone navigating by keyboard or screen reader, this detail matters: These features save time when you are writing issue descriptions or pull request bodies during the workshop challenges. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here is the part to remember. Generate tables: Type a comment like and Copilot suggests a formatted Markdown table. Press Tab to accept. Fix formatting: Select a block of text, open inline chat (Ctrl+I), and type "fix the Markdown formatting." Copilot restructures headings, adds missing blank lines, and corrects list indentation. Suggest alt text: Select an image link like, open inline chat, and ask "suggest alt text for this image." Copilot proposes a description based on the filename and surrounding context. Complete link syntax: Start typing [link text]( and Copilot often autocompletes the URL from your recent files or repository structure.

[JAMIE]
What should feel predictable before the first live session starts?

[ALEX]
This is the move inside Why This Matters for the Workshop: students write Markdown in every single challenge -- from the very first issue you file in Chapter 5 to the agent file you create in Chapter 20. The useful version is: Markdown is also how you write pull request descriptions (Chapter 6) and README files.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Anchor this part on If You Get Stuck. Next: Chapter 13: How Git Works Back: Chapter 11: VS Code Interface Related appendices: Appendix G: VS Code Reference.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
The reason this matters is simple: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Accessibility Features for Power Users: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Essential Keyboard Navigation and Find/Filter: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. The Problems Panel: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. The Terminal: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Copilot Chat Window: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide. Accessible Help, Accessible View, and Accessible Diff: GitHub Docs, home, GitHub Changelog, W3C Web Content Accessibility Guidelines (WCAG) 2 overview, WAI tutorials for accessible design patterns, WAI-ARIA Authoring Practices Guide.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 45. Next in the series is episode 46, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
