
**Table: Screen reader options for workshop setup**

**Table: Accessibility improvements for screen reader users**
# Pre-Workshop Setup - GIT Going with GitHub
>
> **Listen to Episode 1:** [Pre-Workshop Setup](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix D: Git Authentication](appendix-d-git-authentication.md) | [Appendix Y: Workshop Materials](appendix-y-workshop-materials.md) | [Appendix Z: GitHub Skills](appendix-z-github-skills.md)
> **Authoritative sources:** [GitHub Docs: Create an account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) | [GitHub Docs: Set up Git](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git)

## Everything You Need Before Day 1 Begins

> **A [Community Access](https://community-access.org) workshop.**
>
> **Please complete this guide at least one day before the workshop.** If you run into any issues, use the support hub at [Community-Access/support](https://github.com/Community-Access/support) so we can help - we want Day 1 to start with everyone ready to go, not troubleshooting.

If you want the most guided starting path, begin with [Get Going with GitHub](get-going.md). It explains how GitHub Classroom, your Learning Room repository, Challenge 1, evidence prompts, and tool choice all fit together before you start setup.

> **Expect change across tools.** GitHub.com, GitHub Classroom, VS Code, GitHub Copilot, github.dev, browsers, extensions, and agent tools change regularly. The setup steps below are maintained against official sources, but exact labels, order, prompts, and availability can vary by account, organization policy, browser, operating system, and rollout. If something differs, pause, use headings/landmarks/labels or the VS Code Command Palette to explore, and ask for help with the exact page or prompt where you got stuck.

## Table of Contents

1. [What You Will Need](#what-you-will-need)
2. [Step 1 - Create Your GitHub Account](#step-1---create-your-github-account)
3. [Step 2 - Configure GitHub Accessibility Settings](#step-2---configure-github-accessibility-settings)
4. [Step 3 - Configure Your Profile](#step-3---configure-your-profile)
5. [Step 4 - Check GitHub Feature Preview Settings](#step-4---check-github-feature-preview-settings)
6. [Step 5 - Set Up Your Screen Reader and Browser](#step-5---set-up-your-screen-reader--browser)
7. [Step 6 - Install Git and Visual Studio Code](#step-6---install-git-and-visual-studio-code)
8. [Step 7 - Configure Git Identity](#step-7---configure-git-identity)
9. [Step 8 - Install VS Code Extensions](#step-8---install-vs-code-extensions)
10. [Step 9 - Verification Checklist](#step-9---verification-checklist)
11. [Other GitHub Access Methods (Reference Only)](#other-github-access-methods-reference-only)
12. [Getting Help Before the Event](#getting-help-before-the-event)

## What You Will Need

### Hardware

- A computer running Windows or macOS
- A reliable internet connection
- Headphones (recommended - screen reader audio during group sessions)

### Software - Day 1

- A modern web browser: **Chrome** or **Firefox** recommended
  - Both have strong compatibility with GitHub's interface and screen readers
  - Edge is also acceptable on Windows
  - Safari is the recommended browser on macOS with VoiceOver
- A screen reader (see options below)
- A GitHub account (free tier is fine)

### Software - Required Before the Workshop

- **Git** - [Download Git](https://git-scm.com/downloads) (Windows/Linux) or Xcode Command Line Tools (macOS)
- **Visual Studio Code** (free) - [download here](https://code.visualstudio.com/) (GitHub Copilot is included automatically)
- A GitHub Copilot subscription or Free tier access (Copilot Free is available to all GitHub users)

### Screen Reader Options

You only need **one** of these. Use whichever you are most comfortable with.

| Screen Reader | Platform | Cost | Download |
| ---------------  | ----------  | ------  | ----------  |
| **NVDA** (NonVisual Desktop Access) | Windows | Free | [Download NVDA](https://www.nvaccess.org/download/) |
| **JAWS** (Job Access With Speech) | Windows | Paid (trial available) | [Download JAWS](https://www.freedomscientific.com/products/software/jaws/) |
| **VoiceOver** | macOS / iOS | Built-in (free) | Included with macOS - press `Cmd+F5` to activate |

> **Note:** All workshop exercises are designed to work with any of these screen readers. Where specific key commands differ, we will note all three. You are not disadvantaged by using any particular screen reader.

## Step 1 - Create Your GitHub Account

> **See also:** [Appendix D: Git Authentication](appendix-d-git-authentication.md) covers SSH keys and personal access tokens in detail.

If you already have a GitHub account, skip to [Step 2](#step-2---configure-github-accessibility-settings).

> **Before you begin:** Have your email address and a chosen password ready. The signup form is a single-page form with several fields - your screen reader will encounter a verification puzzle partway through (see note below).

### Create an account

1. Open your browser and navigate to the **[GitHub signup page](https://github.com/signup)**
2. The page loads with focus on the first field: **"Enter your email address"**
   - Type your email address and press `Tab` or activate **Continue**
3. The next field is **"Create a password"**
   - Choose a password of at least 8 characters (15+ recommended). Press `Tab` or **Continue**
4. The next field is **"Enter a username"**
   - Your username appears on every issue, PR, and comment you make. Guidelines:
     - Use lowercase letters, numbers, and hyphens only
     - Keep it professional - it represents you in the open source community
     - GitHub will tell you immediately if the name is taken
   - Press `Tab` or **Continue**
5. The next question asks whether you want to receive product updates by email
   - Press `Tab` to reach the **"y"** or **"n"** options and press `Enter`, or type `y` or `n` directly
6. **Human verification step**

   <details>
   <summary>Visual / mouse users</summary>

   GitHub presents a visual CAPTCHA puzzle to verify you are human. Follow the on-screen prompts - typically clicking images that match a category, or checking a box. If the puzzle does not load, try refreshing the page.

   </details>

   <details>
   <summary>Screen reader users</summary>

   GitHub's visual CAPTCHA is a known accessibility barrier. After the CAPTCHA appears:
   - Look for a button or link labeled **"Audio"** or **"Try an audio challenge"** - an audio CAPTCHA alternative may be available
   - If no audio option appears, or if neither challenge is accessible, contact the workshop organizer before the event - they can assist with account verification
   - If you complete an audio challenge, you will hear words or digits to type into a text field

   </details>

7. Activate the **Create account** button
8. GitHub sends a **launch code** (a short numeric code) to your email inbox
   - Check your email, copy the code, return to the browser, and type it into the verification field
   - If you don't receive it within a few minutes, check your spam folder
9. You will land on a "Welcome to GitHub" personalization page - you can skip it or answer the questions; it does not affect your account functionality

### Verify your email address

GitHub also sends a **separate** email verification link after account creation. Check your inbox for an email from GitHub with subject "Please verify your email address" and activate the link inside it. Some GitHub features (including creating repositories) require a verified email.

### Enable two-factor authentication (2FA): detailed guidance and workshop policy

Two-factor authentication (2FA) adds a second verification step each time you sign in, protecting your account if your password is compromised. GitHub now requires 2FA for all accounts, so you may already have it enabled. If not, set it up now. We recommend using the **GitHub Mobile app** for the smoothest experience - see the options below.

### Quick steps to enable 2FA

1. Open the [GitHub security settings page](https://github.com/settings/security) while signed in.
2. Under **Two-factor authentication**, choose **Enable** and follow the prompts.
3. Choose one of the second-factor methods (recommended order):
    - **GitHub Mobile app** (recommended for this workshop): Install the free [GitHub Mobile](https://github.com/mobile) app on your phone. Once linked to your account, GitHub sends a push notification to your phone each time you sign in. You simply tap **Approve** - no codes to type. The app is available for iOS and Android and supports VoiceOver and TalkBack.
    - **Authenticator app**: Microsoft Authenticator, Google Authenticator, Authy - generates time-based 6-digit codes.
    - **Security key / passkey** (most secure): hardware security keys (YubiKey, etc.) or platform passkeys (biometric device credentials).
    - **SMS / text message** (least preferred): can be used if other options are unavailable.

### Detailed setup notes

- Authenticator app (recommended):
  - Visual users: scan the QR code with your authenticator app and enter the 6-digit code shown.
  - Screen reader users: choose the link labeled **"enter this text code"** or **"can't scan the barcode?"** to reveal the secret (a 32-character key). Use the authenticator app's manual/key-entry option to add the account.

- Security key / passkey:
  - Follow the on-screen prompts to register a hardware key or platform passkey. These are highly recommended for long-term security and are supported by modern browsers and devices.

- SMS / text message:
  - Enter your phone number and verify the code sent via text. Use only if authenticator apps or keys are unavailable.

### Recovery and backup

- After enabling 2FA, GitHub will display **recovery (single-use) codes**. Immediately copy, download, or securely store these codes (password manager or physically secure location). They are the only fallback if you lose your second-factor device.
- Consider registering more than one second-factor method (e.g., authenticator app + a hardware key) to avoid account lockout.

### Authenticating Git with GitHub: browser-based sign-in (OAuth)

When you use Git inside VS Code or GitHub Desktop, you do not need to manage passwords, tokens, or SSH keys manually. These tools use **browser-based OAuth sign-in** - the same "Sign in with GitHub" flow you use on any website:

1. The first time you push or pull code, VS Code (or GitHub Desktop) opens your default web browser to a GitHub authorization page.
2. Sign in to GitHub in the browser (including your 2FA step - a push notification if you use GitHub Mobile, or a code from your authenticator app).
3. Approve the authorization request.
4. Switch back to VS Code. Your credentials are securely stored by your operating system's credential manager, so you will not be prompted again on this machine.

That is it. No tokens to generate, no keys to create, no strings to paste. If you are using GitHub Mobile for 2FA, the entire flow is: type your password, tap **Approve** on your phone, and you are authenticated.

> **Screen reader note:** The authorization page opens in your default browser. After approving, the browser shows a message saying you can return to VS Code. Use `Alt+Tab` (Windows) or `Cmd+Tab` (macOS) to switch back.

> **Default browser warning:** VS Code opens the GitHub authorization page in your operating system's **default browser**, not necessarily the browser you use day-to-day. If your default browser is set to something unexpected (for example, an older browser without your screen reader configured), the OAuth page may open in an unfamiliar environment.
>
> **Before the workshop:** Verify which browser is your OS default:
> - **Windows:** Settings, Apps, Default apps, look for "Web browser"
> - **macOS:** System Settings, Desktop and Dock, Default web browser
>
> Set it to the browser where your screen reader and GitHub login are already configured. This avoids a confusing moment during the first `git push` when the authorization page opens somewhere you did not expect.

> **Tip - GitHub Mobile for push notification 2FA:** If you have not already, install the free [GitHub Mobile](https://github.com/mobile) app (iOS and Android). Once linked to your account, every 2FA prompt becomes a single tap on a push notification instead of typing a 6-digit code. The app supports VoiceOver (iOS) and TalkBack (Android).

### Workshop policy

For this workshop, participants need a GitHub account with 2FA enabled. The browser-based sign-in described above handles all Git authentication automatically - no additional setup is required beyond having a working GitHub account.

If you run into any authentication issues before the workshop, open a support issue at [Community-Access/support/issues](https://github.com/Community-Access/support/issues) or contact the workshop organizers directly.

### Learning Cards: Create Your GitHub Account

<details>
<summary>Screen reader users</summary>

- During signup, press `Tab` to move between form fields; GitHub announces validation errors inline as you type
- The CAPTCHA step may not have an audio fallback -- look for a button labeled "Audio" or "Try an audio challenge" before requesting help
- After enabling 2FA, use `Ctrl+A` then `Ctrl+C` in the recovery codes text area to copy all codes at once into a password manager

</details>

<details>
<summary>Low vision users</summary>

- GitHub signup fields have high-contrast focus rings; if you cannot see them, switch to your browser's High Contrast mode (`Alt+Shift+H` in Edge) before starting
- Zoom to 200% on the verification puzzle -- the puzzle images scale but button text may overlap; resize the browser window wider if controls disappear
- Recovery codes are displayed in small monospace text; use `Ctrl+Plus` to enlarge before copying them

</details>

<details>
<summary>Sighted users</summary>

- Watch for the green checkmark next to the username field confirming your chosen name is available
- The verification email sometimes lands in spam -- check your Junk folder if nothing arrives within two minutes
- After enabling 2FA, the recovery codes appear in a grey box below the QR code; screenshot or download them immediately

</details>

## Step 2 - Configure GitHub Accessibility Settings

These settings make GitHub significantly more usable with a screen reader. **Do not skip this section** - one setting in particular (hovercards) adds significant noise to every page if left on.

### Navigate to Accessibility Settings

The fastest path for everyone: navigate directly to **[GitHub Accessibility Settings](https://github.com/settings/accessibility)** while signed in.

If you prefer to navigate through the interface:

<details>
<summary>Visual / mouse users</summary>

1. Click your **profile picture** (avatar) in the top-right corner of any GitHub page
2. A dropdown menu appears - click **Settings**
3. On the Settings page, scroll the **left sidebar** and click **Accessibility**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. On any GitHub page, switch to Browse Mode if you are not already in it (`NVDA+Space` / JAWS virtual cursor should be on by default in browsers)
2. Press `B` repeatedly until you hear **"Open user navigation menu, button"** (top-right of the page) and press `Enter`
3. Navigate the menu with `↓` or `K` until you hear **"Settings"** and press `Enter`
4. On the Settings page, press `D` to move through landmark regions until you reach the left sidebar navigation
5. Press `K` or `↓` to navigate through sidebar links until you hear **"Accessibility"** and press `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

1. Press `VO+U` to open the Rotor, arrow to Buttons, find **"Open user navigation menu"** and press `Enter`
2. Press `VO+Down Arrow` to find **"Settings"** and press `VO+Space`
3. On Settings, press `VO+U`, go to Links, find **"Accessibility"** and press `Enter`

</details>

### Settings to configure

Work through each setting below. All are on the [Accessibility settings page](https://github.com/settings/accessibility) unless noted.

#### 1. Disable Hovercards (highest priority)

> **Do this first.** Hovercards are the most disruptive default setting for screen reader users on GitHub. When enabled, every link announces its hover keyboard shortcut (`H`) as you navigate past it, dramatically slowing page reading.

<details>
<summary>Visual / mouse users</summary>

On the Accessibility settings page, look for a checkbox or toggle labeled **"Link previews"** or **"Hovercards"**. If it is turned on, click it to turn it off. The change saves automatically.

</details>

<details>
<summary>Screen reader users</summary>

1. On the Accessibility settings page, switch to Browse Mode if not already active
2. Press `F` or `X` to jump through form controls until you hear **"Link previews"** or **"Hovercards"**
3. If it is announced as **checked** or **on**, press `Space` to turn it off
4. The change saves automatically - no Submit button required

</details>

#### 2. Enable Link Underlines

<details>
<summary>Visual / mouse users</summary>

Find the **Link underlines** checkbox or toggle and turn it on. This adds underlines to all links on GitHub, making them distinguishable without relying on colour alone.

</details>

<details>
<summary>Screen reader users</summary>

1. Press `F` or `X` to navigate form controls until you hear **"Link underlines"**
2. If it is announced as **unchecked**, press `Space` to enable it
3. The change saves automatically

</details>

#### 3. Character Key Shortcuts

1. Find **"Character key shortcuts"**
2. Single-key shortcuts (`H` for next heading, `I` for next issue, etc.) speed up navigation but **can conflict with screen reader quick-navigation keys**
   - If your screen reader uses letters for navigation in Browse Mode (NVDA, JAWS), GitHub's single-key shortcuts are suppressed when Browse Mode is active, so conflicts are rare in practice
   - If you notice unexpected behavior, return here and turn them off
3. Leave at the default unless you have a reason to change it

#### 4. Set Your Theme (Appearance Settings)

Theme is on a separate page: [GitHub Appearance Settings](https://github.com/settings/appearance)

1. Navigate to that page
2. Find the **"Theme mode"** or **"Theme"** section
3. Options available:
   - **Light default** - standard white background
   - **Dark default** - dark background, easier on some eyes
   - **High contrast light** - maximum contrast, recommended for low vision
   - **High contrast dark** - maximum contrast on dark background
   - **Colorblind** variants - Protanopia, Deuteranopia, Tritanopia
4. Select your preferred theme and activate **Save** if prompted (some changes apply immediately)

### Learning Cards: Configure GitHub Accessibility Settings

<details>
<summary>Screen reader users</summary>

- Press `F` in Browse Mode to jump between checkboxes on the Accessibility settings page; each setting auto-saves when toggled
- After disabling hovercards, verify the change: navigate any repository page and confirm links no longer announce "Press H to preview"
- The Theme selector on the Appearance page is a set of radio buttons; press `Arrow Down` to cycle through themes and hear each name announced

</details>

<details>
<summary>Low vision users</summary>

- Choose "High contrast dark" or "High contrast light" under Appearance -- these themes increase border weight and icon contrast across all GitHub pages
- Enable "Link underlines" so links are visible without relying on color difference alone
- After changing themes, check the diff view on any pull request; some themes render additions/deletions with subtle shading that may need further zoom

</details>

<details>
<summary>Sighted users</summary>

- The Accessibility settings page is a single column of checkboxes near the bottom of the left sidebar in Settings
- Hovercards appear as floating cards when you hover on usernames or issues; turning them off removes that popup behavior
- After choosing a theme, scroll down on the Appearance page to preview how code blocks and diffs render in your chosen colors

</details>

## Step 3 - Configure Your Profile

Your GitHub profile is your public identity in the open source community. Setting it up properly helps maintainers know who you are.

### Who are maintainers?

Maintainers are the people who manage a repository -- they review contributions, respond to issues, merge pull requests, and keep the project running. When you open an issue or submit a pull request, a maintainer is the person who will see it and respond. Setting up your profile helps maintainers know who you are and builds trust in the community.

### Update your profile

1. Navigate to [Settings → Public profile](https://github.com/settings/profile)
2. Fill in:
   - **Name** - your real name or display name (not the same as your username)
   - **Bio** - a short description (e.g., "Accessibility advocate and open source contributor")
   - **Location** - optional but builds trust in the community
   - **Website or social links** - optional
   - **Pronouns** - GitHub supports adding pronouns to your profile

### Add a profile picture (strongly recommended)

A profile picture is strongly recommended because it humanizes your contributions and helps maintainers and collaborators recognize you across issues, pull requests, and comments. It can be a photo or any image that represents you. If you prefer not to use a photo, GitHub generates a default avatar based on your username.

### Set your notification email

1. Navigate to [Settings → Notifications](https://github.com/settings/notifications)
2. Add a **custom routing** email if you want GitHub notifications to go to a different address than your account email

## Step 4 - Check GitHub Feature Preview Settings

GitHub continuously rolls out improvements to its interface. Some enhancements start as opt-in Feature Previews before becoming the standard experience. Three areas matter most for screen reader users working through this workshop:

- **New Issues Experience** - improves heading hierarchy, ARIA landmark structure, and live-region announcements on the Issues pages
- **New Files Changed Experience** - adds proper landmark structure, an accessible file tree, and better keyboard navigation to the Files Changed tab in Pull Requests
- **GitHub Command Palette** - a keyboard-first command launcher (`Ctrl+K` on Windows, `Cmd+K` on macOS) that lets you navigate to any repository, issue, PR, file, or page by typing its name. Faster than clicking through menus and fully accessible with screen readers

The issue and pull request experiences have been broadly rolled out and may already be active on your account. Check before the workshop begins.

### How to Check and Enable Feature Previews

> Source: [accessibility.github.com/documentation/guide/issues/](https://accessibility.github.com/documentation/guide/issues/) and [accessibility.github.com/documentation/guide/pull-requests/](https://accessibility.github.com/documentation/guide/pull-requests/)

<details>
<summary>Visual / mouse users</summary>

1. Sign in to GitHub and go to any page
2. Click your **profile picture** (avatar) in the top-right corner
3. In the dropdown menu, click **Feature preview**
4. A panel opens on the right side of the screen listing available features
5. Click on **New Issues Experience** to expand its details
6. If an **Enable** button appears, click it. If you see **Disable**, the feature is already active - no action needed.
7. Return to the feature list and repeat for **New Files Changed Experience**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

#### NVDA or JAWS (Windows)

1. Sign into GitHub and open any page
2. Switch to Browse Mode if not already active (`NVDA+Space` / JAWS virtual cursor)
3. Press `H` or `Shift+H` to navigate to the **"Navigation Menu"** heading, or press `D` to navigate landmark regions to the navigation section
4. Press `B` to jump to buttons, navigating until you hear **"Open user navigation menu, button"** - this button is in the top-right corner of the page
5. Press `Enter` to activate it - a dropdown menu opens
6. Press `↓` or `K` to move through the menu items until you hear **"Feature preview"**
7. Press `Enter` to select it - the Feature Preview panel opens
8. Navigate through the list of features with `↓` or `I` (list item navigation)
9. When you reach **"New Issues Experience"**, press `Enter` or `Space` to select it - its detail panel expands
10. Press `Tab` to move to the end of the feature detail section, where you will find either:
    - An **"Enable"** button - press `Enter` to enable the feature
    - A **"Disable"** button - the feature is already enabled; no action needed
11. Go back and repeat steps 9-10 for **"New Files Changed Experience"**
12. Repeat again for **"GitHub Command Palette"** if it appears in the list

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

1. Sign into GitHub and open any page
2. Press `VO+U` to open the Rotor and navigate to the Buttons list
3. Find **"Open user navigation menu"** and press `Enter` to activate it
4. Use `VO+Down Arrow` to navigate the dropdown until you hear **"Feature preview"**
5. Press `VO+Space` to activate it - the Feature Preview panel opens
6. Use `VO+Down Arrow` or `VO+Right Arrow` to navigate through the feature list
7. When you reach **"New Issues Experience"**, press `VO+Space` to select it
8. Press `Tab` to move to the end of the feature detail section
9. If you hear **"Enable"**, press `VO+Space` to activate it. If you hear **"Disable"**, it is already on.
10. Repeat for **"New Files Changed Experience"**
11. Repeat for **"GitHub Command Palette"** if it appears in the list

</details>

### What "Not Listed" Means

If you open Feature Preview and neither **"New Issues Experience"** nor **"New Files Changed Experience"** appears in the list at all - that is good news. It means both features have **graduated to the standard GitHub interface** and are active automatically for every user. No action needed.

### What Each Feature Enables

| Feature | What it improves for screen reader users |
| ---------  | ------------------------------------------  |
| **New Issues Experience** | Issues list uses proper `<ul>` list structure. Issue titles are h3 headings. ARIA live regions announce filter result updates. Toolbar uses arrow key navigation. Comment fields can be submitted with `Ctrl+Enter` on Windows/Linux or `Cmd+Enter` on macOS. |
| **New Files Changed Experience** | Files Changed tab includes a navigable file tree region. Diffs are structured for keyboard navigation. The current GitHub shortcut table lists `T` for moving to the **Filter changed files** field. Inline comment controls are available from focused diff lines. |
| **GitHub Command Palette** | Press `Ctrl+K` (Windows) or `Cmd+K` (macOS) from any GitHub page to open a command palette. Type to search for repositories, issues, PRs, files, settings, or actions. Results appear in a list navigable with `Arrow` keys. Press `Enter` to go. Screen readers announce each result as you arrow through the list. Scope the search with prefixes: `#` for issues/PRs, `!` for projects, `>` for commands, `/` for files. |

> **Why this matters:** Without these features enabled, the keyboard and screen reader workflows described throughout this workshop will not match what you see on screen. Enabling them before you begin ensures everything works as documented.

## Step 5 - Set Up Your Screen Reader & Browser

### NVDA (Windows)

**Install NVDA** if you haven't already:

1. Download from [the NVDA download page](https://www.nvaccess.org/download/)
2. Run the installer - you can install to your computer or run portably
3. After launch, NVDA speaks "NVDA started" when running

#### Configure NVDA for web browsing

1. Open NVDA Menu (`NVDA+N`)
2. Go to **Preferences → Settings → Browse Mode**
3. Enable "Use screen layout" - this helps with GitHub's landmark navigation
4. Under **Document Formatting**, disable announcements you find too verbose

#### Recommended NVDA voice settings

- Rate: 60-75% (fast enough to be efficient, slow enough to be clear)
- Punctuation: "Most" (reads important symbols like `#` and `@` without reading every period)

**Your NVDA key:** By default it is `Insert`. It can also be set to `Caps Lock` in NVDA preferences if that is more comfortable.

### JAWS (Windows)

**If using a trial:** JAWS runs in 40-minute sessions without a license. Restart it if you need more time.

#### Configure JAWS for web browsing

1. Open JAWS Settings Center: `Insert+F2 → Settings Center`
2. Ensure "Virtual cursor" is active for web browsing
3. In Chrome or Firefox, JAWS should automatically activate Virtual/Browse mode

#### Recommended JAWS settings for GitHub

- Verbosity → Links: Read link text only (disable "opens in new window" if too verbose)
- Verbosity → Punctuation: "Most" for same reason as NVDA

**Your JAWS key:** `Insert` (or `Caps Lock` if using laptop layout)

### VoiceOver (macOS)

**Activate VoiceOver:** `Command+F5` toggles VoiceOver on and off.

#### Essential VoiceOver setup for web

1. Open VoiceOver Utility: `VO+F8`
2. Go to **Web** category → **Web Rotor**
3. Ensure these are checked: Headings, Landmarks, Links, Buttons, Form Controls, Tables
4. **Recommended browser:** Safari (best VoiceOver integration on macOS)
5. Firefox on macOS also has good VoiceOver support

**Your VoiceOver modifier key:** `VO` = `Control+Option` by default.

#### Turn on Quick Nav for fast navigation

- Press `Left Arrow + Right Arrow` simultaneously to toggle Quick Nav
- With Quick Nav on: `H` = next heading, `L` = next link, `B` = next button (same as NVDA/JAWS browse mode keys)

#### A note for Mac users about keyboard shortcuts

Throughout this documentation, Windows keyboard shortcuts for VS Code are frequently referenced. In general, these keyboard shortcuts work on the Mac, however, Mac users should substitute `Command` whenever `Ctrl` is referenced. For example, Windows users might use the keyboard shortcut `Ctrl+Shift+P` to open the Command Palette. On the Mac, this keyboard shortcut would be `Command+Shift+P`.

### Browser Recommendations Summary

| Browser | Windows | macOS | Notes |
| ---------  | ---------  | -------  | -------  |
| **Chrome** | Recommended | Good | Best with NVDA and JAWS |
| **Firefox** | Recommended | Good | Excellent accessibility support on all platforms |
| **Edge** | Acceptable | Acceptable | Chromium-based; works well |
| **Safari** | Not available | Recommended | Best for VoiceOver on macOS |

**Before the workshop:** Open GitHub.com in your chosen browser with your screen reader running and confirm you can navigate the page using heading keys.

### Learning Cards: Set Up Your Screen Reader and Browser

<details>
<summary>Screen reader users</summary>

- NVDA: press `NVDA+N` then `P` then `S` to reach Settings quickly; Browse Mode settings are under the "Browse Mode" category
- JAWS: press `Insert+F2` to open the Run JAWS Manager dialog, then type "Settings" to jump directly to Settings Center
- VoiceOver: press `VO+F8` to open VoiceOver Utility; add "Form Controls" to the Web Rotor list so you can jump to GitHub's search and filter fields

</details>

<details>
<summary>Low vision users</summary>

- In Chrome, press `Ctrl+Plus` to zoom; GitHub's layout reflows cleanly up to 200% but the top navigation bar may collapse items into a hamburger menu at higher zoom
- Firefox's Reader View (`F9`) does not work on GitHub pages, so rely on browser zoom and GitHub's high-contrast themes instead
- On macOS, enable "Hover Text" in System Settings, Accessibility, Zoom to see enlarged text under the pointer without zooming the full screen

</details>

<details>
<summary>Sighted users</summary>

- Chrome DevTools (`F12`) includes a "Rendering" panel where you can simulate vision deficiencies to preview how GitHub looks to other users
- Firefox and Chrome both support the `Tab` key for visible focus rings; if you do not see them, check that your OS "focus indicator" setting is not suppressed
- Safari on macOS has the tightest VoiceOver integration; if you use a Mac in the workshop, Safari is the safest default browser

</details>

## Step 6 - Install Git and Visual Studio Code

> **See also:** [Chapter 01: Choose Your Tools](01-choose-your-tools.md) walks through every tool option with screen reader and low-vision guidance.

### Install Git First

> **VS Code does not install Git.** It detects whether Git is already on your system. If Git is missing, the Source Control panel will display a warning, and all `git` commands in the terminal will fail. Install Git before installing VS Code.

> **Already have VS Code installed?** No problem -- you do not need to reinstall it. Just install Git using the instructions below, then restart VS Code. VS Code detects Git automatically on startup, so after a restart, the Source Control panel and all `git` commands in the terminal will work immediately. No extra configuration is needed.

#### Windows

1. Download the Git for Windows installer from [Git for Windows download page](https://git-scm.com/download/win)
2. Run the installer - default options are correct for most users
3. On the "Adjusting your PATH environment" screen, keep the default: **"Git from the command line and also from 3rd-party software"**
4. Complete the installer and restart any open terminals

#### Verify installation (Windows)

1. Open PowerShell or Command Prompt
2. Type `git --version` and press `Enter`
3. You should see a version number such as `git version 2.47.0.windows.2` - any version is fine

#### macOS

Git is often already present via Xcode Command Line Tools. To check:

1. Open Terminal (`Cmd+Space` → type "Terminal")
2. Type `git --version` and press `Enter`
3. If Git is not installed, macOS will automatically prompt you to install Xcode Command Line Tools - follow the prompt and wait for it to complete
4. Alternatively, install directly from [Git for macOS download page](https://git-scm.com/download/mac) or via Homebrew: `brew install git`

#### Screen reader note (Windows terminal verification)

- PowerShell is accessible with all screen readers via Browse Mode or Forms Mode
- Type `git --version`, press `Enter`, then press `↑` to re-read the output line

Once Git is installed, you will configure your Git identity in Step 7 after VS Code is set up.

### Install Visual Studio Code

Visual Studio Code (VS Code) is the development environment used throughout this workshop. It is free, open source, and has excellent built-in accessibility support.

### Download and install

1. Navigate to [code.visualstudio.com](https://code.visualstudio.com/)
2. Select the download link for your operating system
3. Run the installer with default options
4. Launch VS Code when the installer finishes

### Enable Screen Reader Mode in VS Code

> **Do this before anything else in VS Code.** Screen Reader Mode changes how the editor renders content - without it, your screen reader may receive incomplete or fragmented output from the editor, diff views, and Copilot Chat.

VS Code may detect your screen reader automatically when it first opens and ask if you want to enable this mode. If it does:

1. Listen for the dialog - it will say something like "A screen reader is detected. Would you like to enable Screen Reader Optimized mode?"
2. Press `Enter` to accept, or `Tab` to the **Enable** button and press `Space`

If VS Code did **not** prompt you automatically, enable it manually:

#### Option A - Keyboard shortcut

1. Press `Shift+Alt+F1`
2. VS Code toggles Screen Reader Optimized mode immediately

#### Option B - Command Palette

1. Press `Ctrl+Shift+P` to open the Command Palette
   - Your screen reader will announce "Type to filter" or the palette input field
2. Type: `screen reader` - the list filters as you type
3. Arrow down to **"Accessibility: Toggle Screen Reader Accessibility Mode"**
4. Press `Enter`

#### How to confirm it is on

1. Press `Ctrl+Shift+P` to open the Command Palette again
2. Type: `screen reader optimized`
3. If the status bar at the bottom of the window is accessible to you, it will read **"Screen Reader Optimized"**
4. Alternatively: go to **File → Preferences → Settings** (`Ctrl+,`), type `screenReaderOptimized` in the search box, and verify the checkbox is ticked

#### What Screen Reader Mode changes

- The editor renders as a plain text region your screen reader can navigate linearly with arrow keys
- Audio cues are enabled for inline suggestions, errors, warnings, and folder expand/collapse
- Diffs are presented as readable before/after text instead of a visual side-by-side view
- The Copilot Chat response panel reads as a structured document

> **Screen reader note:** Once Screen Reader Mode is on, you navigate the editor with `Up` and `Down Arrow` to move line by line. Press `Enter` to open a folded section. Press `Escape` to leave the editor and move focus back to the activity bar or panels.

### VS Code keyboard basics (we will cover these fully in the workshop)

| Action | Shortcut |
| --------  | ----------  |
| Open Command Palette | `Ctrl+Shift+P` |
| Open file | `Ctrl+P` |
| Open terminal | `` Ctrl+` `` (backtick) |
| Focus Explorer panel | `Ctrl+Shift+E` |
| Focus editor | `Ctrl+1` |

### Learning Cards: Install Git and Visual Studio Code

<details>
<summary>Screen reader users</summary>

- After installing VS Code, press `Shift+Alt+F1` immediately to enable Screen Reader Optimized mode; without it the editor area is not linearized for your screen reader
- Press `Ctrl+Shift+P` to open the Command Palette; it behaves like an autocomplete list -- type a few letters and press `Down Arrow` to browse matches
- The VS Code terminal (`` Ctrl+` ``) is a standard text area; press `Up Arrow` to review previous command output line by line

</details>

<details>
<summary>Low vision users</summary>

- In VS Code, press `Ctrl+Plus` or `Ctrl+Minus` to zoom the entire interface; the zoom level persists across restarts
- Open Settings (`Ctrl+,`), search "editor.fontSize" and increase it to 18-24 for comfortable code reading alongside your browser zoom
- Choose a high-contrast theme: press `Ctrl+K Ctrl+T`, then select "High Contrast" or "High Contrast Light" from the list

</details>

<details>
<summary>Sighted users</summary>

- The Activity Bar on the left edge of VS Code shows icons for Explorer, Search, Source Control, Run, and Extensions; hover each to see its name and shortcut
- A small Git icon with a number badge in the Activity Bar means VS Code detected Git successfully and is tracking changes
- The Status Bar at the bottom shows your current branch name on the left and encoding, language mode, and line/column on the right

</details>

## Step 7 - Configure Git Identity

Now that Git is installed, tell it who you are. Git embeds your name and email in every commit you make, and this affects how your contributions appear in project history.

### Configure in VS Code

1. Open **Visual Studio Code**
2. Open the integrated terminal:
   - Menu: **Terminal → New Terminal**
   - Keyboard: `` Ctrl+` `` (Windows) or `` Cmd+` `` (Mac)
3. Type the following commands, replacing with your information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

#### What to use

- **user.name:** Your real name or the name you want shown on commits (e.g., "Jane Smith")
- **user.email:** The email address associated with your GitHub account (must match exactly)

**Screen reader note:** The terminal in VS Code is accessible with all major screen readers. Press `` Ctrl+` `` to move focus to the terminal, type your commands, and press `Enter`.

### Why This Matters

If Git isn't configured, it will either:

- Use a default name like "Unknown" (looks unprofessional in project history)
- Refuse to create commits with an error message

### Verify Your Configuration

Run this command to see your current settings:

```bash
git config --global --list
```

You should see:

```text
user.name=Your Name
user.email=your-email@example.com
```

### Using the Correct Email

Use the same email you registered with GitHub. If you're concerned about privacy, GitHub offers a no-reply email you can use: `username@users.noreply.github.com` - find it in [Settings → Emails](https://github.com/settings/emails).

## Step 8 - Install VS Code Extensions

This workshop uses two VS Code extensions. GitHub Copilot is built into VS Code automatically. The GitHub Pull Requests extension needs to be installed manually. Both authenticate through your browser session - if you are signed into GitHub in your web browser, VS Code picks up the session automatically.

### GitHub Copilot (Built In)

GitHub Copilot is automatically included with Visual Studio Code. There is no extension to install separately. It provides both inline code completions and the conversational Agent mode panel used throughout the second half of the workshop.

#### Activate Copilot

1. Make sure Screen Reader Mode is enabled (see above)
2. Make sure you are signed into GitHub in your web browser
3. Press `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs, to open the Chat view
   - Your screen reader should announce the chat input field
4. Type: `Hello` and press `Enter`
5. VS Code will automatically sign you into GitHub Copilot using your browser session - no manual sign-in command is needed
6. A response will appear in the chat history above the input field
7. Navigate up with `Shift+Tab` or `Up Arrow` to read the response

> **That is it.** You do not need to use the Command Palette to sign in. If you are logged into GitHub in your browser, VS Code handles authentication automatically when you first interact with the agent.

### Extension 2 - GitHub Pull Requests

This extension lets you review and manage pull requests without leaving VS Code. It is used in the code review chapters.

#### Install

1. Press `Ctrl+Shift+X` to open the Extensions panel
2. Type: `GitHub Pull Requests`
3. Press `Tab` to move into the results list
4. Arrow down to find **"GitHub Pull Requests"** with publisher **"GitHub"**
   - This extension was formerly named "GitHub Pull Requests and Issues" - either name is correct

> **Extension imposter warning:** The VS Code Marketplace contains third-party extensions with similar names. Always verify the **publisher** before installing. The correct extensions for this workshop are:
>
> - **GitHub Pull Requests** - publisher must be **GitHub** (verified badge)
> - **GitHub Copilot** - publisher must be **GitHub** (built in, no manual install needed)
>
> If the publisher name says anything other than "GitHub" (for example, a personal username or an unfamiliar company), **do not install it**. A screen reader user can verify the publisher: after arrowing to a search result, `Tab` forward past the extension name to hear "Publisher: GitHub" or similar. If you accidentally install a wrong extension, press `Ctrl+Shift+X`, find it, and select **Uninstall**.
5. Press `Enter` to open the details page
6. Press `Tab` to the **Install** button and press `Enter` or `Space`
7. VS Code will announce when installation is complete

#### Verify it is working

1. Press `Ctrl+Shift+P` and type: `GitHub Pull Requests: Sign in`
   - If you are already signed in from the earlier step, this command may not appear - that means you are already authenticated
2. To confirm the extension loaded: press `Ctrl+Shift+P`, type `GitHub Pull Requests: Focus on Pull Requests View`
   - The Pull Requests panel should open in the sidebar
   - If your repository has open pull requests, they will appear here

> **Screen reader note:** The Pull Requests panel is a tree view. Navigate it with `Up` and `Down Arrow`. Press `Enter` or `Right Arrow` to expand a node.

### Copilot Free tier

Copilot Free is available to all GitHub users at no cost. It includes:

- Limited inline code completions per month
- Limited Copilot Chat messages per month

For this workshop, Free tier is sufficient. If you want unlimited access, paid plans are available at [GitHub Copilot pricing](https://github.com/features/copilot#pricing).

### Learning Cards: Install VS Code Extensions

<details>
<summary>Screen reader users</summary>

- In the Extensions panel (`Ctrl+Shift+X`), type your search, press `Tab` to enter the results list, then `Down Arrow` through results; each announces the extension name and publisher
- Verify the publisher is "GitHub" before installing; after arrowing to a result, press `Tab` once to hear the publisher name announced
- To confirm Copilot is active, press `Ctrl+Alt+I`, or run **Chat: Open Chat** from the Command Palette if your keymap differs; your screen reader should announce the chat input field within two seconds

</details>

<details>
<summary>Low vision users</summary>

- Extension search results show the publisher name in smaller grey text beneath the extension name; zoom to 150%+ to read it clearly
- The Install button is blue and appears on the right side of each extension card; after installation it changes to a gear icon for settings
- The Copilot icon in the Status Bar (bottom right, a small two-sparkle icon) turns solid when Copilot is authenticated and active

</details>

<details>
<summary>Sighted users</summary>

- Look for the blue verified badge (checkmark) next to "GitHub" in the publisher field to confirm you have the official extension
- After installing the Pull Requests extension, a new GitHub icon appears in the Activity Bar on the left; click it to see open PRs for the current repo
- The Copilot chat panel opens when you press `Ctrl+Alt+I` or run **Chat: Open Chat** from the Command Palette; the sparkle icon in the editor gutter means Copilot has an inline suggestion

</details>

## Step 9 - Verification Checklist

### Tool Cards: Verify Your Setup

**github.com (browser):**
Sign in at github.com and verify your profile, accessibility settings, and that you can navigate with keyboard shortcuts (`G I` for Issues, `G P` for Pull Requests).

**VS Code Desktop:**
Open VS Code and confirm: Screen Reader Mode is on (`Shift+Alt+F1`), Git is detected (run `git --version` in the terminal), and the GitHub Pull Requests extension is installed.

**GitHub Desktop:**
Open GitHub Desktop, sign in with your GitHub account, and verify it shows your repositories list.

**Git CLI (terminal):**
```bash
git --version
git config user.name
git config user.email
gh auth status  # if GitHub CLI is installed
```

Work through this checklist before Day 1. Check off each item:

```text
Pre-Workshop Checklist

GITHUB ACCOUNT
[ ] GitHub account created and email verified
[ ] Two-factor authentication enabled
[ ] Profile name, bio set

GITHUB SETTINGS
[ ] Accessibility settings page visited
[ ] Hovercards / link previews turned OFF
[ ] Theme set to your preferred option
[ ] Confirmed modern GitHub Issues and Pull Request experience is working (see Step 4 - may already be active or enabled via Feature preview)

BROWSER & SCREEN READER
[ ] Screen reader installed and working (NVDA / JAWS / VoiceOver)
[ ] Browser chosen: Chrome, Firefox, Edge (Windows) or Safari (macOS)
[ ] Navigated to github.com with screen reader - page announces headings and landmarks
[ ] Can navigate the GitHub homepage using heading keys (H) without a mouse

GIT & VS CODE (required before the workshop)
[ ] Git installed and verified (run git --version in a terminal)
[ ] Git identity configured (git config --global user.name and user.email)
[ ] Visual Studio Code installed
[ ] Screen Reader Mode enabled in VS Code (Shift+Alt+F1 or Command Palette)
[ ] Signed into GitHub in your web browser
[ ] GitHub Copilot responds in Chat view (`Ctrl+Alt+I` or **Chat: Open Chat**, type Hello, get a response)
[ ] GitHub Pull Requests extension installed (publisher: GitHub)
[ ] Pull Requests panel opens (Ctrl+Shift+P → "Focus on Pull Requests View")
```

### What Happens at the Start of Day 1

You do **not** need to claim a workshop repository before Day 1 -- that is the very first hands-on step we do together in Block 0. When the workshop opens, the facilitator will paste a **GitHub Classroom assignment link** in the chat. Accepting that link creates your own private Learning Room repository in the workshop organization and seeds it with Challenge 1.

The full guided walkthrough lives in [Chapter 4: Step-by-Step: Accept Your Classroom Assignment and Open Your Repo](04-the-learning-room.md#step-by-step-accept-your-classroom-assignment-and-open-your-repo). Skim it the night before if you want to know what to expect; we will walk through it live in Block 0.

## Other GitHub Access Methods (Reference Only)

This workshop focuses entirely on GitHub.com in the browser and VS Code. However, you should be aware that other ways to work with GitHub exist. We list them here for your reference - we will not be teaching these in depth.

### GitHub Desktop

A graphical desktop application for managing repositories, branches, and commits without using the command line.

- Download: [desktop.github.com](https://desktop.github.com/)
- Provides a visual interface for cloning, committing, pushing, and creating PRs
- Has some screen reader support, though the web interface is generally more accessible
- A good option for those who prefer a visual GUI over the command line

### GitHub CLI (`gh`)

A command-line tool that lets you perform nearly any GitHub action directly from your terminal.

```bash
# Examples (reference only - not covered in this workshop)
gh repo clone owner/repo
gh issue create
gh pr create
gh pr review
gh pr merge
```

- Download: [cli.github.com](https://cli.github.com/)
- Excellent for automation and scripting
- Very accessible - terminal/command-line interfaces work well with screen readers
- Full documentation: [cli.github.com/manual](https://cli.github.com/manual/)

### GitHub Copilot CLI (`gh copilot`)

An extension to the GitHub CLI that brings Copilot assistance to the terminal. You can ask it to explain or suggest shell commands in plain English.

```bash
# Reference examples only
gh copilot suggest "how do I undo my last commit"
gh copilot explain "git rebase -i HEAD~3"
```

- Install: `gh extension install github/gh-copilot`
- Documentation: [docs.github.com/en/copilot/github-copilot-in-the-cli](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli)
- Particularly useful for users who prefer a terminal workflow

### Git (the version control system itself)

GitHub is a platform built on top of **Git**, which is the underlying version control system. Git runs locally on your computer via a terminal.

We are not covering Git commands in this workshop. If you want to learn Git, these are excellent starting points:

- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Pro Git book (free)](https://git-scm.com/book/en/v2)
- [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github)

## If You Get Stuck

| Problem | What to do |
|---|---|
| GitHub signup verification puzzle fails | Refresh the page and try again. Some puzzles are audio-based: look for an audio button. If it fails three times, try a different browser. |
| Two-factor authentication codes not arriving | Check your spam folder. If using an authenticator app, verify the time on your phone is correct (auto-sync). |
| Git not found after installing | Close and reopen your terminal. On Windows, restart VS Code. Run `git --version` to confirm. |
| VS Code does not detect screen reader | Press `Shift+Alt+F1` (Windows) or run "Toggle Screen Reader Mode" from the Command Palette. |
| Copilot does not respond in Agent mode | Verify you are signed in to GitHub in VS Code. Check that Copilot is enabled in your GitHub account settings. |
| Cannot install VS Code extensions | Check your internet connection. Try installing from the terminal: `code --install-extension GitHub.vscode-pull-request-github`. |
| Everything else | File a support issue at [Community-Access/support/issues](https://github.com/Community-Access/support/issues) describing what step you are on and what happened. We will help. |

## Getting Help Before the Event

If you cannot complete any step in this guide before the workshop:

1. **File a setup support issue** - [Community-Access/support/issues](https://github.com/Community-Access/support/issues) - we will help you get set up
2. **Join Support Hub Discussions** - [Community-Access/support/discussions](https://github.com/Community-Access/support/discussions) - read pinned Start Here guidance and ask follow-up questions
3. **Join the GitHub Accessibility Discussions** - [GitHub Community Accessibility Discussions](https://github.com/orgs/community/discussions/categories/accessibility) - the community is helpful and welcoming

You will not be left behind. Every setup issue we can solve before Day 1 means more time for learning on the day.

> **Next Step:** You are all set up! Move on to [Chapter 01: Choose Your Tools](01-choose-your-tools.md).

---

*Next: [Chapter 01: Choose Your Tools](01-choose-your-tools.md)*  
*Back: [Course Guide](course-guide.md)*  
*Related appendices: [Appendix D: Git Authentication](appendix-d-git-authentication.md) | [Appendix Y: Workshop Materials](appendix-y-workshop-materials.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Everything You Need Before Day 1 Begins:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What You Will Need:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Other GitHub Access Methods (Reference Only):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **If You Get Stuck:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Getting Help Before the Event:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
