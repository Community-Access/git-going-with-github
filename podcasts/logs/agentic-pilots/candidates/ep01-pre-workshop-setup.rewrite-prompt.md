You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep01-pre-workshop-setup
Title: Episode 1: Pre-Workshop Setup
Description: Creating your GitHub account, installing Git and VS Code, configuring your screen reader.

Concept checklist to preserve:
- Creating a GitHub account and choosing a username
- Two-factor authentication: what it is and why it is required
- What Git is versus what GitHub is - the distinction
- Installing Git on Windows, macOS, and Linux
- Configuring git identity: user.name and user.email
- What VS Code is and why it is the recommended editor
- Installing VS Code and enabling screen reader mode
- The github.dev alternative for browser-based editing
- Verifying your setup works end to end

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Everything You Need Before Day 1 Begins
- ## Table of Contents
- ## What You Will Need
- ### Hardware
- ### Software - Day 1
- ### Software - Required Before the Workshop
- ### Version Requirements (For Agents & Advanced Features)
- ### Screen Reader Options
- ## Step 1 - Create Your GitHub Account
- ### Create an account
- ### Verify your email address
- ### Enable two-factor authentication (2FA): detailed guidance and workshop policy
- ### Quick steps to enable 2FA
- ### Detailed setup notes
- ### Recovery and backup
- ### Authenticating Git with GitHub: browser-based sign-in (OAuth)
- ### Workshop policy
- ### Learning Cards: Create Your GitHub Account
- ## Step 2 - Configure GitHub Accessibility Settings
- ### Navigate to Accessibility Settings
- ### Settings to configure
- #### 1. Disable Hovercards (highest priority)
- #### 2. Enable Link Underlines
- #### 3. Character Key Shortcuts
- #### 4. Set Your Theme (Appearance Settings)
- ### Learning Cards: Configure GitHub Accessibility Settings
- ## Step 3 - Configure Your Profile
- ### Who are maintainers?
- ### Update your profile
- ### Add a profile picture (strongly recommended)
- ### Set your notification email
- ## Step 4 - Check GitHub Feature Preview Settings
- ### How to Check and Enable Feature Previews
- #### NVDA or JAWS (Windows)
- ### What "Not Listed" Means
- ### What Each Feature Enables
- ## Step 5 - Set Up Your Screen Reader & Browser
- ### NVDA (Windows)
- #### Configure NVDA for web browsing
- #### Recommended NVDA voice settings
- ### JAWS (Windows)
- #### Configure JAWS for web browsing
- #### Recommended JAWS settings for GitHub
- ### VoiceOver (macOS)
- #### Essential VoiceOver setup for web
- #### Turn on Quick Nav for fast navigation
- #### A note for Mac users about keyboard shortcuts
- ### Browser Recommendations Summary
- ### Learning Cards: Set Up Your Screen Reader and Browser
- ## Step 6 - Install Git and Visual Studio Code
- ### Install Git First
- #### Windows
- #### Verify installation (Windows)
- #### macOS
- #### Screen reader note (Windows terminal verification)
- ### Install Visual Studio Code
- ### Download and install
- ### Enable Screen Reader Mode in VS Code
- #### Option A - Keyboard shortcut
- #### Option B - Command Palette

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
Welcome back to Git Going with GitHub. This is episode 1: Pre-Workshop Setup. I am Alex, and today we are turning Pre-Workshop Setup from a list of instructions into a working mental model that actually feels alive.

[JAMIE]
And I am Jamie. I will stop us whenever the instructions sound simple on paper but feel less magical at the keyboard with a screen reader.

[PAUSE]

[ALEX]
Creating your GitHub account, installing Git and VS Code, configuring your screen reader. That is the surface description. Underneath it, we are building judgment: where to focus, what to ignore, and how to verify the result.

[JAMIE]
So we are not using the audio as a shortcut around learning. We are using it to make the learning easier to enter and easier to remember.

[ALEX]
Yes. A good audio lesson gives someone enough context to try the work with confidence, even before they open the written material.

[PAUSE]

[JAMIE]
What does someone need before they touch the keyboard?

[ALEX]
Everything You Need Before Day 1 Begins: Please complete this guide at least one day before the workshop. The next useful detail is concrete: If you run into any issues, use the support hub at Community-Access/support so we can help - we want Day 1 to start with everyone ready to go, not troubleshooting.

[ALEX]
The next layer is this. Hardware has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. A computer running Windows or macOS. A reliable internet connection. Headphones (recommended - screen reader audio during group sessions).

[JAMIE]
What should feel predictable before the first live session starts?

[ALEX]
Software - Day 1 has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. A modern web browser: Chrome or Firefox recommended. Both have strong compatibility with GitHub's interface and screen readers. Edge is also acceptable on Windows. Safari is the recommended browser on macOS with VoiceOver. A screen reader (see options below). A GitHub account (free tier is fine).

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Software - Required Before the Workshop has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
For a learner, the useful signals are concrete. Git - Download Git (Windows/Linux) or Xcode Command Line Tools (macOS). Visual Studio Code (free) - download here (GitHub Copilot is included automatically). VS Code version 1.113 or later (required for Accessibility Agents in Chapter 19). A GitHub Copilot subscription or Free tier access (Copilot Free is available to all GitHub users).

[JAMIE]
What should they understand before typing anything?

[ALEX]
The reason this matters is simple: if you plan to use Accessibility Agents (Chapter 19), advanced accessibility features, or the optional Day 2 extension exercises, ensure you have the following minimum versions. The listener should be able to check this: If you don't have Node.js installed, that's fine - it's only needed if you use command-line accessibility tools (optional for Day 2 extension exercises).

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like code --version VS Code version; node --version Node.js (if installed); git --version Git version. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
What decision is this helping them make?

[ALEX]
Do not treat Screen Reader Options as decoration. Use whichever you are most comfortable with. That is not trivia. All workshop exercises are designed to work with any of these screen readers. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
Use the comparison to make a decision, not to recite a table. The main contrasts are: Screen Reader means Platform means Download. NVDA (NonVisual Desktop Access) means Download NVDA. JAWS (Job Access With Speech) means Paid (trial available) means Download JAWS.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
If the interface shifts, Step 1 - Create Your GitHub Account is still useful because see also: Appendix D: Git Authentication covers SSH keys and personal access tokens in detail. For someone navigating by keyboard or screen reader, this detail matters: If you already have a GitHub account, skip to Step 2.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Put Create an account into plain language. GitHub presents a visual CAPTCHA puzzle to verify you are human. The useful version is: Follow the on-screen prompts - typically clicking images that match a category, or checking a box.

[ALEX]
The room should hear these as checkpoints. Type your email address and press Tab or activate Continue. Choose a password of at least 8 characters (15+ recommended). Press Tab or Continue. Your username appears on every issue, PR, and comment you make. Guidelines. Use lowercase letters, numbers, and hyphens only.

[ALEX]
Walk it in order: Open your browser and navigate to the GitHub signup page; The page loads with focus on the first field: "Enter your email address"; The next field is "Create a password"; and The next field is "Enter a username". Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Think of this as 4 checks: The next question asks whether you want to receive product updates by email; Human verification step; Activate the Create account button; and GitHub sends a launch code (a short numeric code) to your email inbox. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The teaching point here is not the label; it is the move. GitHub also sends a separate email verification link after account creation. That is the difference between guessing and knowing: Check your inbox for an email from GitHub with subject "Please verify your email address" and activate the link inside it.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because two-factor authentication (2FA) adds a second verification step each time you sign in, protecting your account if your password is compromised. This is where the workflow starts to feel magical, because the result becomes visible and explainable: GitHub now requires 2FA for all accounts, so you may already have it enabled. That is the difference between following directions and owning the workflow.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Quick steps to enable 2FA has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. GitHub Mobile app (recommended for this workshop): Install the free GitHub Mobile app on your phone. Once linked to your account, GitHub sends a push notification to your phone each time you sign in. You simply tap Approve - no codes to type. The app is. Authenticator app: Microsoft Authenticator, Google Authenticator, Authy - generates time-based 6-digit codes. Security key / passkey (most secure): hardware security keys (YubiKey, etc.) or platform passkeys (biometric device credentials). SMS / text message (least preferred): can be used if other options are unavailable.

[ALEX]
First, open the GitHub security settings page while signed in. Then, under Two-factor authentication, choose Enable and follow the prompts. After that, choose one of the second-factor methods (recommended order). Each step should leave a trace you can name.

[ALEX]
Now slow down for the part people usually miss. Detailed setup notes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part that makes the next action easier. Authenticator app (recommended). Visual users: scan the QR code with your authenticator app and enter the 6-digit code shown. Screen reader users: choose the link labeled "enter this text code" or "can't scan the barcode?" to reveal the secret (a 32-character key). Use the authenticator app's manual/key-entry option to add the account. Security key / passkey. Follow the on-screen prompts to register a hardware key or platform passkey. These are highly recommended for long-term security and are supported by modern browsers and devices. SMS / text message.

[PAUSE]

[JAMIE]
What do you want them to do when the plan breaks?

[ALEX]
Recovery and backup has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the pieces that turn the idea into a usable move. After enabling 2FA, GitHub will display recovery (single-use) codes. Immediately copy, download, or securely store these codes (password manager or physically secure location). They are the only fallback if you lose your second-factor device. Consider registering more than one second-factor method (e.g., authenticator app + a hardware key) to avoid account lockout.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
What is the ordered workflow?

[ALEX]
Anchor this part on Authenticating Git with GitHub: browser-based sign-in (OAuth). When you use Git inside VS Code or GitHub Desktop, you do not need to manage passwords, tokens, or SSH keys manually. That matters in practice: These tools use browser-based OAuth sign-in - the same "Sign in with GitHub" flow you use on any website. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Think of this as 4 checks: The first time you push or pull code, VS Code (or GitHub Desktop) opens your default web browser to a GitHub authorization page; Sign in to GitHub in the browser (including your 2FA step - a push notification if you use GitHub Mobile, or a code from your authenticator app); Approve the authorization request; and Switch back to VS Code. Your credentials are securely stored by your operating system's credential manager, so you will not be prompted again on this machine. That small check between steps is what makes the workflow reliable.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
Where is the promise of the workshop, underneath all the logistics?

[ALEX]
The reason this matters is simple: for this workshop, participants need a GitHub account with 2FA enabled. This is the part to say slowly: The browser-based sign-in described above handles all Git authentication automatically - no additional setup is required beyond having a working GitHub account.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Learning Cards: Create Your GitHub Account has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. During signup, press Tab to move between form fields; GitHub announces validation errors inline as you type. The CAPTCHA step may not have an audio fallback -- look for a button labeled "Audio" or "Try an audio challenge" before requesting help. After enabling 2FA, use Ctrl+A then Ctrl+C in the recovery codes text area to copy all codes at once into a password manager. GitHub signup fields have high-contrast focus rings; if you cannot see them, switch to your browser's High Contrast mode (Alt+Shift+H in Edge) before starting. Zoom to 200% on the verification puzzle -- the puzzle images scale but button text may overlap; resize the browser window wider if controls disappear. Recovery codes are displayed in small mono

[...middle omitted for length...]

[JAMIE]
Let's pause on Other GitHub Access Methods (Reference Only). What should a learner take away from it?

[ALEX]
If the interface shifts, Other GitHub Access Methods (Reference Only) is still useful because this workshop focuses entirely on GitHub.com in the browser and VS Code. That gives the learner a foothold: however, you should be aware that other ways to work with GitHub exist.

[ALEX]
Keep the teaching thread moving. Put GitHub Desktop into plain language. A graphical desktop application for managing repositories, branches, and commits without using the command line. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Here is the part to remember. Download: desktop.github.com. Provides a visual interface for cloning, committing, pushing, and creating PRs. Has some screen reader support, though the web interface is generally more accessible. A good option for those who prefer a visual GUI over the command line.

[PAUSE]

[JAMIE]
What should happen before anyone copies and runs it?

[ALEX]
The teaching point here is not the label; it is the move. A command-line tool that lets you perform nearly any GitHub action directly from your terminal.

[ALEX]
Here is the part to remember. Download: cli.github.com. Excellent for automation and scripting. Very accessible - terminal/command-line interfaces work well with screen readers. Full documentation: cli.github.com/manual.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Examples (reference only - not covered in this workshop); gh repo clone owner/repo; gh issue create; gh pr create; gh pr review; gh pr merge. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on GitHub Copilot CLI (gh copilot). What should a learner take away from it?

[ALEX]
This part earns its place because an extension to the GitHub CLI that brings Copilot assistance to the terminal. That matters in practice: You can ask it to explain or suggest shell commands in plain English.

[ALEX]
Here is the part to remember. Install: gh extension install github/gh-copilot. Documentation: docs.github.com/en/copilot/github-copilot-in-the-cli. Particularly useful for users who prefer a terminal workflow.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Reference examples only; gh copilot suggest "how do I undo my last commit"; gh copilot explain "git rebase -i HEAD 3". Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on Git (the version control system itself). What should a learner take away from it?

[ALEX]
Git (the version control system itself): GitHub is a platform built on top of Git, which is the underlying version control system. This is the part to say slowly: Git runs locally on your computer via a terminal.

[ALEX]
Here is the part to remember. Git Handbook. Pro Git book (free). GitHub Skills: Introduction to GitHub.

[PAUSE]

[JAMIE]
Let's pause on Getting Help Before the Event. What should a learner take away from it?

[ALEX]
Here is the learner-facing version. If you cannot complete any step in this guide before the workshop. The listener should be able to check this: Every setup issue we can solve before Day 1 means more time for learning on the day. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Start here: File a setup support issue - Community-Access/support/issues - we will help you get set up. Then: Join Support Hub Discussions - Community-Access/support/discussions - read pinned Start Here guidance and ask follow-up questions. Next: Join the GitHub Accessibility Discussions - GitHub Community Accessibility Discussions - the community is helpful and welcoming. The point is not speed; the point is never losing your place.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
This is the move inside Section-Level Source Map: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Everything You Need Before Day 1 Begins: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What You Will Need: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Other GitHub Access Methods (Reference Only): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. If You Get Stuck: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Getting Help Before the Event: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 1. Next in the series is episode 2, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
