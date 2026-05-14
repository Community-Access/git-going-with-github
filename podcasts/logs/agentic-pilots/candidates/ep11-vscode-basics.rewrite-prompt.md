You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep11-vscode-basics
Title: Episode 11: VS Code Setup and Accessibility
Description: Screen reader mode, Command Palette, sidebar navigation, and accessibility settings.

Concept checklist to preserve:
- What VS Code is: a free, extensible code editor by Microsoft
- The github.dev experience: press . on any repo to open VS Code in the browser
- Screen reader mode: what it enables and how to turn it on
- The accessibility help dialog: Control+Shift+H (what it tells you)
- The Command Palette: Control+Shift+P - the most important shortcut
- The Activity Bar: Explorer, Search, Source Control, Extensions, etc.
- Navigating between the sidebar, editor, terminal, and panels
- The integrated terminal and how to open it
- Opening a folder versus opening a file
- Installing extensions from the Extensions view
- Key accessibility settings: editor.accessibilitySupport, screen reader announcements
- Audio cues and what they signal
- The accessible diff viewer (Accessible Diff Viewer in Command Palette)
- Keyboard shortcut customization

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Your Accessible Development Environment - The Foundation
- ## Workshop Recommendation (Chapter 11)
- ### Chapter 11 Practice Set
- ### Practice 11.1 Step-by-Step: VS Code Accessibility Baseline
- ### Completing Chapter 11: Submit Your Evidence
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Learning Pattern Used in This Chapter
- ## Table of Contents
- ## 1. Why VS Code for Open Source Contribution
- ### Learning Cards: Why VS Code
- ## 2. The Bridge: github.dev - VS Code in Your Browser
- ### Before you install anything: try VS Code right now in your browser
- ### How to Access github.dev
- #### Method 1: The Period Key Shortcut (Fastest)
- #### Where it works
- #### Method 2: Direct URL
- #### Method 3: From the Repository Page
- ### What You Get in github.dev
- ### What github.dev Does NOT Have
- ### Why github.dev Matters for This Workshop
- #### Use github.dev when
- #### Use desktop VS Code when
- ### Screen Reader Experience in github.dev
- #### Activate screen reader mode immediately
- #### What changes
- #### Navigation
- #### NVDA/JAWS users
- #### VoiceOver users
- ### Learning Cards: github.dev
- ### Try It Right Now
- ## 3. Screen Reader Mode in VS Code
- ### Activating Screen Reader Mode
- #### Verify it is active
- ### What Changes in Screen Reader Mode
- ### NVDA-Specific Settings for VS Code
- ### JAWS-Specific Settings for VS Code
- ### VoiceOver-Specific Settings for VS Code (macOS)
- ### Learning Cards: Screen Reader Mode
- ## 4. The VS Code Interface Tour
- ### The Five Major Regions
- ### Navigating Between Regions
- ### Learning Cards: Finding Your Way Around VS Code
- ## 5. The Accounts Button and GitHub Sign-In
- ### Why Sign In Matters
- ### Signing In
- #### From the Accounts Button
- #### From the Command Palette
- ### Verifying You Are Signed In
- ### Learning Cards: GitHub Sign-In
- ## 6. Verifying GitHub Copilot Status
- ### Where to Check Copilot Status
- #### Status Bar Indicator
- #### Command Palette Check
- #### Quick Test
- ### Troubleshooting Copilot
- ### Learning Cards: Copilot Status
- ## 7. The Status Bar
- ### What the Status Bar Contains (Left to Right)

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
Welcome to episode 11 of Git Going with GitHub: VS Code Setup and Accessibility. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.

[JAMIE]
And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.

[PAUSE]

[ALEX]
The lesson focus is Screen reader mode, Command Palette, sidebar navigation, and accessibility settings. We will treat every step as a teachable decision, because that is what makes the skill portable and the workflow feel smooth.

[JAMIE]
So we should explain the why clearly enough that the steps make sense when the learner meets them later and still feel doable.

[ALEX]
That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Your Accessible Development Environment - The Foundation: Day 2, Block 1 Material This chapter covers the VS Code interface: launching VS Code, signing in to GitHub, verifying Copilot is active, configuring screen reader mode, and navigating the Activity Bar, Status Bar, menus, settings, and keyboard shortcuts. The next useful detail is concrete: For accessibility deep-dive topics (keyboard navigation, Problems panel, Terminal, Copilot Chat, Accessible Help/View/Diff, Accessibility Signals, and VS Code Speech), see Chapter 12: VS Code Accessibility Deep Dive.

[ALEX]
The next layer is this. Here is the learner-facing version. For this workshop, Chapter 11 is a guided setup chapter with a lightweight completion practice. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 1 guided walkthrough. Automation check: none - setup state is local/account-level and cannot be validated by the Learning Room PR bot. The evidence is structured completion comment on your assigned challenge issue. The pattern is open, configure, navigate, verify.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Chapter 11 Practice Set has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: VS Code accessibility baseline - open VS Code (github.dev or desktop), enable screen reader mode, sign in to GitHub, verify Copilot status, and navigate core surfaces. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Practice 11.1 Step-by-Step: VS Code Accessibility Baseline. Confirm you can access VS Code (github.dev or desktop), enable screen reader support, sign in to GitHub, check Copilot status, and perform core navigation. This is the part to say slowly: github.dev (VS Code in the browser) or desktop VS Code if you installed it in Block 0.

[ALEX]
For a learner, the useful signals are concrete. Windows (NVDA/JAWS): Press Shift+Alt+F1. You should hear an announcement confirming screen reader mode is on. Mac (VoiceOver): Screen reader mode is usually already optimized. If navigation feels wrong, open Command Palette (Cmd+Shift+P) and run Toggle Screen Reader Accessibility Mode.

[ALEX]
Think of this as 4 checks: Open your Learning Room repository on GitHub.com; Press. (the period key) on your keyboard. This launches github.dev - a full VS Code editor running in your browser. Wait a few seconds for it to load; Enable screen reader mode; and Open the Explorer panel with Ctrl+Shift+E (Mac: Cmd+Shift+E). Your screen reader should announce the file tree. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is navigate to and open README.md from the file tree. Use arrow keys to move through files and Enter to open. Step two is open the outline/symbols view with Ctrl+Shift+O (Mac: Cmd+Shift+O). This shows all headings and sections in the current file - a key navigation tool for screen reader users. Step three is open the Command Palette with Ctrl+Shift+P (Mac: Cmd+Shift+P). Type any command name (for example, Toggle Word Wrap) and press Enter to run it. Press Escape to close without running. Step four is check the Accounts button in the Activity Bar (bottom-left of the sidebar). If you are signed in, your screen reader announces your GitHub username. If not, activate it and sign in with GitHub. That is the rhythm: orient, act, verify, continue.

[JAMIE]
What should they understand before typing anything?

[ALEX]
The reason this matters is simple: return to GitHub.com, open the assigned setup or Day 2 readiness issue, and post a completion comment. The listener should be able to check this: If any step was "no," add a note explaining where you got stuck so the facilitator can help.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Chapter 11 completed:; - Opened github.dev: yes / no; - Screen reader mode enabled: yes / no; - Signed in to GitHub: yes / no; - Copilot status checked: yes / no; - Opened file in Explorer: yes / no; - Opened outline/symbols: yes / no; - Opened Command. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Student can launch and navigate github.dev or desktop VS Code. Student can enable screen reader mode and hear navigation announcements. Student has signed in to GitHub and can see their account status. Student has verified GitHub Copilot is active (or knows it requires desktop VS Code). Student can open core navigation surfaces (Explorer, Outline, Command Palette). Student is ready for VS Code-based contribution chapters (6-16).

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Nothing happens when you press.? Make sure you are on the repository's main page (not inside an issue or PR). The. shortcut only works on repository code pages. Then: Screen reader mode toggle did not announce anything? Open Command Palette (Ctrl+Shift+P) and type Screen Reader to find the toggle manually. Next: Explorer panel is empty? VS Code may still be loading the repository. Wait 5-10 seconds and press Ctrl+Shift+E again. Last: On Mac with VoiceOver, navigation feels wrong? Run Toggle Screen Reader Accessibility Mode from Command Palette. VoiceOver sometimes needs the explicit toggle. The sequence works because every action has a confirmation.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Walk it in order: Cannot find the Accounts button? Open Command Palette and type Accounts to manage sign-in from there; Copilot not showing in the status bar? github.dev does not support Copilot - you need desktop VS Code or a Codespace; Shortcut not working? Use Command Palette as a fallback for any action - type what you want to do and VS Code will find the command; and Ask facilitator for a side-by-side demo and repeat the same steps. Keep it that plain: know where you are, make the move, check the result.

[ALEX]
This is where the talk moves from concept to action. Put Learning Moment into plain language. Tool setup is part of contribution skill. The useful version is: A stable, accessible editor reduces stress and increases contribution quality.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Open the tool in the simplest way possible (. key for github.dev); Sign in and verify your identity and tools are ready (Accounts, Copilot); Configure accessibility before doing any work (screen reader mode first); and Verify each navigation surface works with your assistive technology. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Before we leave Learning Pattern Used in This Chapter, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is record what worked and what didn't (evidence comment). The point is not speed; the point is never losing your place.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because GitHub's browser interface is excellent for reviewing, discussing, and triaging. This is where the workflow starts to feel magical, because the result becomes visible and explainable: For Markdown contributions (which is most of what accessibility-agents needs), VS Code gives you Copilot assistance, live preview, and the same Git workflow - with less tab switching and with agents available on every file you open. That is the difference between following directions and owning the workflow.

[JAMIE]
What should someone listen for when a lesson offers more than one tool path?

[ALEX]
Learning Cards: Why VS Code has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. VS Code announces errors, warnings, and suggestions via ARIA live regions -- you hear problems as you type instead of after pushing to GitHub. Press Ctrl+Shift+P (Mac: Cmd+Shift+P) to open the Command Palette and access every VS Code feature without a mouse. The Explorer sidebar (Ctrl+Shift+E) gives you the same file tree as GitHub.com but with keyboard-driven editing one Enter away. VS Code supports zoom levels up to 500%: press Ctrl+= (Mac: Cmd+=) to increase and Ctrl+- (Mac: Cmd+-) to decrease. High Contrast themes are built in -- open Command Palette and type "Color Theme" to switch. Inline error squiggles use both color and underline style so they remain visible at any zoom level or contrast setting.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. GitHub provides a web-based version of VS Code called github.dev. The next useful detail is concrete: It runs entirely in your browser with zero installation.

[PAUSE]

[JAMIE]
Let's pause on Method 1: The Period Key Shortcut (Fastest). What should a learner take away from it?

[ALEX]
Method 1: The Period Key Shortcut (Fastest) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Press. (period key - just the period, no modifier keys); The page transforms into VS Code; You are now editing in github.dev; and The URL changes to github.dev/owner/repo. That is the rhythm: orient, act, verify, continue.

[JAMIE]
Before we leave Method 1: The Period Key Shortcut (Fastest), what is the practical point?

[ALEX]
Think of this as 1 checks: Screen reader mode works exactly as it does in desktop VS Code (toggle with Shift+Alt+F1). That small check between steps is what makes the workflow reliable.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Where it works. The period key shortcut is a single keypress - no modifier keys. That matters in practice: It is GitHub's universal "open this in VS Code" command. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. Repository home pages. File view pages. Pull request pages. Any branch or

[...middle omitted for length...]

no need to adjust multiple settings individually.

[ALEX]
Keep the teaching thread moving. Do not treat 10. The Settings Editor as decoration. The Settings Editor is where you customize VS Code. That gives the learner a foothold: there are two views: the graphical settings UI and the raw settings.json file. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
Let's pause on Navigating the Settings Editor. What should a learner take away from it?

[ALEX]
If the interface shifts, Navigating the Settings Editor is still useful because the graphical Settings UI has a search box at the top. The next useful detail is concrete: Type any keyword and the settings list filters instantly.

[ALEX]
Keep the teaching thread moving. Learning Cards: Settings Editor has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Press Ctrl+, to open Settings. Focus lands in the search box - start typing immediately. Type @tag:accessibility to see all accessibility settings grouped together. Each setting is a form control (checkbox, dropdown, or text input) - use standard form navigation. For direct JSON editing: Ctrl+Shift+P then "Open User Settings (JSON)" - this gives you a standard text editor. Search for editor.fontSize to set your preferred font size for the code editor. Search for window.zoomLevel to set the overall window zoom (affects all UI).

[JAMIE]
Let's pause on 11. The Keyboard Shortcuts Editor. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. The Keyboard Shortcuts Editor lets you view, search, and customize every keyboard shortcut in VS Code.

[PAUSE]

[ALEX]
Keep the teaching thread moving. This part earns its place because the editor has a search box that supports. That is the difference between following directions and owning the workflow.

[ALEX]
Here is the part to remember. Command name: Type toggle terminal to find the terminal toggle shortcut. Keystroke recording: Click the keyboard icon (or press the record keys button) to record a key combination and find what it does. When clause: Find shortcuts that only apply in specific contexts.

[JAMIE]
Let's pause on Customizing a Shortcut. What should a learner take away from it?

[ALEX]
Customizing a Shortcut has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, find the command in the list. Then, double-click the keybinding column (or press Enter on the row, then Enter again on the keybinding). After that, press your desired key combination. Finally, press Enter to confirm. The sequence works because every action has a confirmation.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. Next: Chapter 12: VS Code Accessibility Back: Chapter 10: Notifications and Day 1 Close Related appendices: Appendix G: VS Code Reference Appendix B: Screen Reader Cheat Sheet.

[ALEX]
Here is the part to remember. Press Ctrl+K Ctrl+S to open the Keyboard Shortcuts Editor. Focus lands in the search box. The results list is a table. Each row announces: Command name, Keybinding, When clause, and Source. Navigate rows with Up/Down Arrow. Press Enter to edit a keybinding. search for accessibility to find all accessibility-related shortcuts at once. The shortcut editor is a searchable, sortable table - zoom in as needed. The Source column shows whether a shortcut is from Default, User, or an Extension.

[PAUSE]

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
This is the move inside Section-Level Source Map: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Your Accessible Development Environment - The Foundation: GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions. Workshop Recommendation (Chapter 11): GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions. Why VS Code for Open Source Contribution: GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions. The Bridge: github.dev - VS Code in Your Browser: GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions. Screen Reader Mode in VS Code: GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions. The VS Code Interface Tour: GitHub Docs, home, GitHub Changelog, VS Code Copilot chat overview, VS Code agent overview, VS Code custom instructions.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 11. Next in the series is episode 12, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
