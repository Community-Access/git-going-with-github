# create_all_challenges.ps1
# Creates ALL challenge issues for org members who don't have them yet.
# Covers chapters 4-16 (26 total challenges per student).
# Only assigns to org members. Rerun as new members join.
#
# Usage:
#   .\create_all_challenges.ps1 -DryRun          # preview
#   .\create_all_challenges.ps1                   # create issues
#   .\create_all_challenges.ps1 -ChaptersOnly "07,08,09,10,12,13,14,15,16"  # just new chapters

param(
    [switch]$DryRun,
    [int]$DelayMs = 800,
    [string]$ChaptersOnly = "",  # comma-separated, e.g. "07,08" to only create specific chapters
    [string]$TargetRepo = "Community-Access/learning-room" # Make target repo configurable for future cohorts
)

$ErrorActionPreference = "Stop"
$repo = $TargetRepo

# ============================================================
# CHALLENGE DEFINITIONS - all 26 challenges
# ============================================================
# Format: key = "XX.Y", value = hashtable with title, labels, body template
# Body uses {USERNAME} as placeholder

$challengeDefs = [ordered]@{}

# Helper to build issue body from CHALLENGES.md content
function New-ChallengeBody {
    param(
        [string]$ChapterNum,
        [string]$ChapterName,
        [string]$ChallengeTitle,
        [string]$ChallengeDesc,
        [string]$Steps,
        [string]$Outcomes,
        [string]$Stuck,
        [string]$LearningMoment,
        [string]$TimeEstimate,
        [string]$Difficulty,
        [string]$AnchorText,
        [string]$SubmissionType = "comment"  # "comment" or "pr"
    )

    $submitSection = if ($SubmissionType -eq "pr") {
@"

## How to Submit

### Step 1: Claim This Issue
Reply with a comment: ``I'm working on this!``

### Step 2: Create Your Branch
``````bash
git checkout -b chapter-$ChapterNum-challenge-{USERNAME}
``````

### Step 3: Complete the Challenge
Follow the detailed steps in the [Challenge Hub](https://github.com/Community-Access/learning-room/blob/main/docs/CHALLENGES.md#chapter-$ChapterNum-$AnchorText).

$Steps

### Step 4: Open a Pull Request
When ready:
``````bash
git push origin chapter-$ChapterNum-challenge-{USERNAME}
``````

Then open a PR with:
- **Title:** ``Chapter $ChapterNum`: $ChallengeTitle``
- **Description:** Include ``Closes #XX`` where XX is this issue number
- **Evidence:** Screenshots, links, or proof of completion per the Challenge Hub
"@
    } else {
@"

## How to Submit

### Step 1: Claim This Issue
Reply with a comment: ``I'm working on this!``

### Step 2: Complete the Challenge
Follow the detailed steps in the [Challenge Hub](https://github.com/Community-Access/learning-room/blob/main/docs/CHALLENGES.md#chapter-$ChapterNum-$AnchorText).

$Steps

### Step 3: Post Your Evidence
When complete, post a comment on this issue with your evidence (see format below).

### Step 4: Close This Issue
After facilitator confirms, close this issue.
"@
    }

    return @"
> [!WARNING]
> This issue is part of the **GIT Going with GitHub** course.
> Do not start this challenge until the course officially begins.

# Chapter $ChapterNum`: $ChapterName Challenge

**Student:** @{USERNAME}
**Estimated Time:** $TimeEstimate
**Skill Level:** $Difficulty

---

## Challenge Overview

$ChallengeDesc

All challenges in this chapter are linked to the [Challenge Hub](https://github.com/Community-Access/learning-room/blob/main/docs/CHALLENGES.md#chapter-$ChapterNum-$AnchorText) for full context and instructions.

---

## Your Challenge: $ChallengeTitle

$ChallengeDesc

---
$submitSection

---

## Expected Outcomes

$Outcomes

---

## If You Get Stuck

$Stuck

---

## Learning Moment

$LearningMoment

**Next Step:** Check out [Challenge Hub](https://github.com/Community-Access/learning-room/blob/main/docs/CHALLENGES.md) for the next challenge or chapter!
"@
}

# ============================================================
# CHAPTER 07: Culture and Etiquette (1 challenge, optional but tracked)
# ============================================================
$challengeDefs["07.1"] = @{
    title = "Chapter 07.1: Reflect on Collaboration Culture ({USERNAME})"
    labels = @("challenge","challenge: beginner","skill: collaboration","day: 1")
    body = (New-ChallengeBody `
        -ChapterNum "07" -ChapterName "Culture and Etiquette" `
        -ChallengeTitle "Reflect on Collaboration Culture" `
        -ChallengeDesc "Post a short reflection on respectful collaboration habits. This is a guided reflection, not a pass/fail test." `
        -Steps @"
Post one comment on this issue using this format:

``````text
Chapter 7 reflection:
- One respectful review habit I will use:
- One way I will ask for help clearly:
- One way I will respond to feedback constructively:
``````

One sentence per prompt is enough.
"@ `
        -Outcomes @"
- You can name respectful collaboration behaviors
- You can prepare a constructive feedback style before review work
- You feel safer asking for help in public threads
"@ `
        -Stuck @"
1. Use one simple sentence per prompt
2. Focus on one real behavior you can do today
3. If writing feels hard, draft bullet points first, then post
4. Ask facilitator for one example response and adapt it
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "Technical quality and communication quality work together. Respectful, clear communication helps good code get merged faster." `
        -TimeEstimate "5-10 minutes" -Difficulty "beginner" `
        -AnchorText "culture-and-etiquette" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 08: Labels, Milestones, and Projects (1 challenge)
# ============================================================
$challengeDefs["08.1"] = @{
    title = "Chapter 08.1: Post a Triage Recommendation ({USERNAME})"
    labels = @("challenge","challenge: beginner","skill: triage","day: 1")
    body = (New-ChallengeBody `
        -ChapterNum "08" -ChapterName "Labels, Milestones, and Projects" `
        -ChallengeTitle "Post a Triage Recommendation" `
        -ChallengeDesc "Review an issue and post a triage recommendation comment with suggested labels, milestone, and project board column." `
        -Steps @"
1. Open your assigned challenge issue (this one)
2. Review the issue title, description, and target file
3. Post a triage recommendation comment using this format:

``````text
Chapter 8 triage recommendation:
- Suggested labels:
- Suggested milestone:
- Suggested project board column:
- One-sentence reason:
``````

4. If you have write access, apply the recommended labels/milestone directly.
"@ `
        -Outcomes @"
- You can recommend labels, milestone, and project placement using issue context
- You understand triage even without maintainer permissions
- You leave a clear, reusable triage note for maintainers
"@ `
        -Stuck @"
1. Start with one label only (documentation, bug, or accessibility)
2. If milestone is unclear, write 'none' and explain why
3. If project board is unknown, write 'needs triage' and continue
4. Ask facilitator to review your one-sentence reason before posting
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "Triage is about clarity, not authority. Good recommendations reduce maintainer effort and speed up collaboration." `
        -TimeEstimate "5-10 minutes" -Difficulty "beginner" `
        -AnchorText "labels-milestones-and-projects" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 09: Notifications (1 challenge)
# ============================================================
$challengeDefs["09.1"] = @{
    title = "Chapter 09.1: Set Up Your Notification Workflow ({USERNAME})"
    labels = @("challenge","challenge: beginner","skill: notifications","day: 1")
    body = (New-ChallengeBody `
        -ChapterNum "09" -ChapterName "Notifications" `
        -ChallengeTitle "Set Up Your Notification Workflow" `
        -ChallengeDesc "Set up a useful notification workflow so you can keep up with reviews, mentions, and assignments without inbox overload." `
        -Steps @"
1. Open the workshop repository and set **Watch** to **Participating and @mentions**
2. Open the notifications inbox at github.com/notifications
3. Activate the **Review requested** filter
4. Activate the **Assigned** filter
5. Open one notification and return to inbox
6. Perform one inbox action on a non-critical thread: M to mute, or E to mark done
7. Post a completion comment on this issue:

``````text
Chapter 9 complete:
- Set Watch to Participating: yes/no
- Found Review requested filter: yes/no
- Found Assigned filter: yes/no
- Opened one notification: yes/no
- Used one inbox action (mute or done): yes/no
``````
"@ `
        -Outcomes @"
- You can find review requests quickly
- You can find assigned work quickly
- You can reduce noise with one inbox action
"@ `
        -Stuck @"
1. Reload the notifications page and reapply one filter at a time
2. If inbox is empty, switch to Done and practice action flow there
3. If shortcuts conflict with screen reader mode, focus the notification row and retry
4. Ask facilitator to model one inbox action live, then repeat
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "Notification management protects focus. You can stay responsive without drowning in updates." `
        -TimeEstimate "8-12 minutes" -Difficulty "beginner" `
        -AnchorText "notifications" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 10: VS Code Basics (1 challenge)
# ============================================================
$challengeDefs["10.1"] = @{
    title = "Chapter 10.1: VS Code Accessibility Baseline ({USERNAME})"
    labels = @("challenge","challenge: beginner","skill: vs-code","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "10" -ChapterName "VS Code Basics" `
        -ChallengeTitle "VS Code Accessibility Baseline" `
        -ChallengeDesc "Confirm you can access VS Code (github.dev or desktop), enable screen reader support, and perform core file navigation." `
        -Steps @"
1. Open any repository and launch github.dev with . (period key)
2. Screen reader mode setup:
   - Windows (NVDA/JAWS): enable with Shift+Alt+F1
   - Mac (VoiceOver): run Command Palette and search 'Toggle Screen Reader Accessibility Mode'
3. Open Explorer with Ctrl+Shift+E (Mac: Cmd+Shift+E)
4. Open README.md from the file tree
5. Open outline/symbols with Ctrl+Shift+O (Mac: Cmd+Shift+O)
6. Open Command Palette with Ctrl+Shift+P (Mac: Cmd+Shift+P) and run any command
7. Post a completion comment on this issue:

``````text
Chapter 10 complete:
- Opened github.dev: yes/no
- Screen reader mode enabled: yes/no
- Opened file in Explorer: yes/no
- Opened outline/symbols: yes/no
- Opened Command Palette: yes/no
``````
"@ `
        -Outcomes @"
- You can launch and navigate github.dev or desktop VS Code
- You can enable screen reader mode and open core navigation surfaces
- You are ready for VS Code-based contribution chapters
"@ `
        -Stuck @"
1. Confirm you are in a repository page before pressing .
2. Retry screen reader mode toggle once, then verify in settings
3. On Mac with VoiceOver, use Command Palette and run 'Toggle Screen Reader Accessibility Mode'
4. Use Command Palette to run commands when shortcut memory is hard
5. Ask facilitator for a side-by-side demo and repeat the same 5 steps
"@ `
        -LearningMoment "Tool setup is part of contribution skill. A stable, accessible editor reduces stress and increases contribution quality." `
        -TimeEstimate "10-15 minutes" -Difficulty "beginner" `
        -AnchorText "vs-code-basics" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 12: GitHub Pull Requests Extension (2 challenges)
# ============================================================
$challengeDefs["12.1"] = @{
    title = "Chapter 12.1: Install the GitHub PR Extension ({USERNAME})"
    labels = @("challenge","challenge: intermediate","skill: pr-extension","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "12" -ChapterName "GitHub Pull Requests Extension" `
        -ChallengeTitle "Install the GitHub PR Extension" `
        -ChallengeDesc "Add the GitHub Pull Requests extension to VS Code and sign in with your GitHub account." `
        -Steps @"
1. Open VS Code Extensions sidebar (Ctrl+Shift+X)
2. Search for 'GitHub Pull Requests'
3. Install the extension
4. Sign in with your GitHub account when prompted
5. Post a completion comment on this issue:

``````text
Chapter 12.1 complete:
- Extension installed: yes/no
- Signed in with GitHub: yes/no
- Can see PR list in sidebar: yes/no
``````
"@ `
        -Outcomes @"
- You can install and authenticate the GitHub PR extension
- You can see the Pull Requests view in VS Code Explorer
"@ `
        -Stuck @"
1. If extension does not install, reload VS Code with Ctrl+Shift+P then 'Developer: Reload Window'
2. If OAuth sign-in fails, verify your GitHub account is active in the browser first, then retry
3. If PR list is empty, switch to 'All Open' view in the GitHub section of Explorer
4. Use Command Palette: 'GitHub Pull Requests: Focus on Pull Requests View'
5. Ask facilitator to verify the GitHub PR view in Explorer
"@ `
        -LearningMoment "PR tooling multiplies your impact. Reviewing others' work refines your own standards and builds community trust." `
        -TimeEstimate "10-15 minutes" -Difficulty "intermediate" `
        -AnchorText "github-pull-requests-extension" -SubmissionType "comment")
}

$challengeDefs["12.2"] = @{
    title = "Chapter 12.2: Check Out a PR and Post a Review ({USERNAME})"
    labels = @("challenge","challenge: intermediate","skill: pr-extension","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "12" -ChapterName "GitHub Pull Requests Extension" `
        -ChallengeTitle "Check Out a PR and Post a Review" `
        -ChallengeDesc "Download a PR branch locally and write one constructive review comment." `
        -Steps @"
1. Open the Pull Requests view in VS Code
2. Find an open PR (yours or a peer's)
3. Check out the PR branch locally
4. Read through the changed files
5. Write one constructive review comment
6. If checkout is blocked by permissions, complete by reviewing in read-only mode and posting one specific comment
7. Post a completion comment on this issue:

``````text
Chapter 12.2 complete:
- Found a PR to review: yes/no
- Checked out PR branch (or viewed read-only): yes/no
- Posted one review comment: yes/no
- Link to my review comment: [paste URL]
``````
"@ `
        -Outcomes @"
- You can check out a PR branch in VS Code
- You can interactively review changes and post feedback
"@ `
        -Stuck @"
1. If PR list is empty, switch to 'All Open' view
2. If checkout fails, confirm you have write access or ask facilitator
3. Use Command Palette: 'GitHub Pull Requests: Focus on Pull Requests View'
4. If Activity Bar focus is hard with a screen reader, use Command Palette
5. Ask facilitator to help with one checkout
"@ `
        -LearningMoment "PR tooling multiplies your impact. Reviewing others' work refines your own standards and builds community trust." `
        -TimeEstimate "15-20 minutes" -Difficulty "intermediate" `
        -AnchorText "github-pull-requests-extension" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 13: GitHub Copilot (3 challenges)
# ============================================================
$challengeDefs["13.1"] = @{
    title = "Chapter 13.1: Install GitHub Copilot and Sign In ({USERNAME})"
    labels = @("challenge","challenge: intermediate","skill: copilot","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "13" -ChapterName "GitHub Copilot" `
        -ChallengeTitle "Install GitHub Copilot and Sign In" `
        -ChallengeDesc "Install the GitHub Copilot Chat extension from Extensions sidebar and authenticate." `
        -Steps @"
1. Open VS Code Extensions sidebar (Ctrl+Shift+X)
2. Search for 'GitHub Copilot Chat'
3. Install the extension
4. Sign in with your GitHub account when prompted
5. Open Copilot Chat with Ctrl+Shift+I (Mac: Cmd+Shift+I)
6. Post a completion comment on this issue:

``````text
Chapter 13.1 complete:
- Copilot Chat extension installed: yes/no
- Signed in: yes/no
- Chat panel opens: yes/no
``````
"@ `
        -Outcomes @"
- You can install and authenticate GitHub Copilot Chat
- You can open the Chat panel
"@ `
        -Stuck @"
1. If extension installation fails, reload VS Code with Ctrl+Shift+P then 'Developer: Reload Window'
2. If OAuth sign-in fails, verify your GitHub account is active in the browser first
3. If Chat panel does not open, try Ctrl+Shift+I (Windows) or Cmd+Shift+I (Mac)
4. If Chat seems unresponsive, click the model selector at bottom of Chat and confirm sign-in
5. Ask facilitator to help verify Copilot is activated
"@ `
        -LearningMoment "AI assistance amplifies clarity. Copilot is not just for code - it can support clear writing and practical customization." `
        -TimeEstimate "10 minutes" -Difficulty "intermediate" `
        -AnchorText "github-copilot" -SubmissionType "comment")
}

$challengeDefs["13.2"] = @{
    title = "Chapter 13.2: Ask Copilot to Explain a Repo ({USERNAME})"
    labels = @("challenge","challenge: intermediate","skill: copilot","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "13" -ChapterName "GitHub Copilot" `
        -ChallengeTitle "Ask Copilot to Explain a Repo" `
        -ChallengeDesc "Clone the sci-fi themes repo, ask Copilot to explain it, and apply one theme." `
        -Steps @"
1. Clone https://github.com/community-access/vscode-sci-fi-themes.git
2. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
3. Ask: 'What does the chat.agent.thinking.phrases setting do in VS Code?'
4. Read Copilot's explanation and apply one theme to your settings.json
5. Reload VS Code and see custom sci-fi phrases in Copilot Chat
6. Post a completion comment on this issue:

``````text
Chapter 13.2 complete:
- Cloned sci-fi themes repo: yes/no
- Asked Copilot a question: yes/no
- Applied a theme: yes/no
- Which theme I chose:
``````
"@ `
        -Outcomes @"
- You can ask Copilot effective questions about code and settings
- You can use Copilot output to customize your development environment
"@ `
        -Stuck @"
1. If clone fails, verify your GitHub authentication is working
2. If Copilot does not answer, check you are signed in (model selector at bottom of Chat)
3. If theme does not apply, open settings.json and paste the setting manually
4. Ask facilitator to show you one prompt
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "AI assistance amplifies clarity. Copilot is not just for code - it can support clear writing and practical customization." `
        -TimeEstimate "15-20 minutes" -Difficulty "intermediate" `
        -AnchorText "github-copilot" -SubmissionType "comment")
}

$challengeDefs["13.3"] = @{
    title = "Chapter 13.3: Create a Custom Theme with Copilot ({USERNAME})"
    labels = @("challenge","challenge: intermediate","skill: copilot","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "13" -ChapterName "GitHub Copilot" `
        -ChallengeTitle "Create a Custom Theme with Copilot" `
        -ChallengeDesc "Ask Copilot to generate custom thinking phrases for your favorite universe, then apply them." `
        -Steps @"
1. In Copilot Chat, ask: 'Create custom GitHub Copilot thinking phrases for [your favorite universe - Dune, Marvel, Studio Ghibli, etc.]'
2. Copilot generates a theme
3. Copy it into your settings.json and reload VS Code
4. Post a completion comment on this issue:

``````text
Chapter 13.3 complete:
- Asked Copilot to create custom phrases: yes/no
- Universe I chose:
- Applied to settings.json: yes/no
- Reloaded and saw custom phrases: yes/no
``````
"@ `
        -Outcomes @"
- You can use Copilot creatively to customize tooling
- You can modify VS Code settings based on AI-generated output
"@ `
        -Stuck @"
1. If Copilot does not generate phrases, try rephrasing: 'Generate 10 loading phrases themed around [universe]'
2. If settings.json edit fails, use Ctrl+Shift+P then 'Preferences: Open User Settings (JSON)'
3. Copy Copilot output and paste it carefully
4. Ask facilitator for help with settings.json editing
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "AI assistance amplifies clarity. Copilot is not just for code - it can support clear writing and practical customization." `
        -TimeEstimate "10-15 minutes" -Difficulty "intermediate" `
        -AnchorText "github-copilot" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 14: Accessible Code Review (2 challenges)
# ============================================================
$challengeDefs["14.1"] = @{
    title = "Chapter 14.1: Review a PR with Inline Comments ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: code-review","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "14" -ChapterName "Accessible Code Review" `
        -ChallengeTitle "Review a PR with Inline Comments" `
        -ChallengeDesc "Check out or view an assigned practice PR, read the diff, and post constructive feedback on 2-3 specific lines." `
        -Steps @"
1. Find an open PR to review (check the PR list or ask facilitator for assignment)
2. Open the Files Changed tab
3. Read through the diff
4. Post 2-3 inline comments on specific lines with constructive feedback
5. Focus on: heading structure, link text, missing steps, or typos
6. Post a completion comment on this issue:

``````text
Chapter 14.1 complete:
- Found a PR to review: yes/no
- Read the diff: yes/no
- Posted inline comments (count):
- Link to my review: [paste URL]
``````
"@ `
        -Outcomes @"
- You can navigate PR diffs with a screen reader
- You can post inline comments on specific lines
- You can write constructive feedback that helps the author improve
"@ `
        -Stuck @"
1. If Files Changed tab will not open, reload the PR page and retry
2. If inline comment button is hard to find, use the file tree to jump between files
3. If unsure what to comment on, focus on clarity: heading structure, link text, missing steps, or typos
4. If submitting the review fails, check that you are not in draft mode and have write access
5. Ask facilitator to help navigate one diff and model one constructive comment
"@ `
        -LearningMoment "Constructive review is a gift. Specific, kind feedback helps authors improve and builds trust in the community." `
        -TimeEstimate "20-30 minutes" -Difficulty "advanced" `
        -AnchorText "accessible-code-review" -SubmissionType "comment")
}

$challengeDefs["14.2"] = @{
    title = "Chapter 14.2: Submit a Formal Review Verdict ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: code-review","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "14" -ChapterName "Accessible Code Review" `
        -ChallengeTitle "Submit a Formal Review Verdict" `
        -ChallengeDesc "Complete your review by submitting an approval, request-changes, or comment-only verdict on a PR." `
        -Steps @"
1. Open the same PR you reviewed in Challenge 14.1 (or a new one)
2. Click 'Review changes' button
3. Write a brief summary of your review
4. Choose one verdict: Approve, Request changes, or Comment
5. Submit the review
6. Post a completion comment on this issue:

``````text
Chapter 14.2 complete:
- Submitted a formal review: yes/no
- Verdict chosen (approve/request-changes/comment):
- Link to my review: [paste URL]
``````
"@ `
        -Outcomes @"
- You can submit a formal review verdict on a PR
- You understand the difference between approve, request changes, and comment
"@ `
        -Stuck @"
1. The 'Review changes' button is at the top of the Files Changed tab
2. If unsure which verdict, use 'Comment' - it is the safest choice
3. Write at least one sentence summarizing what you reviewed
4. If button is not accessible, try the keyboard shortcut or Command Palette
5. Ask facilitator to walk through one review submission
"@ `
        -LearningMoment "Constructive review is a gift. Specific, kind feedback helps authors improve and builds trust in the community." `
        -TimeEstimate "10-15 minutes" -Difficulty "advanced" `
        -AnchorText "accessible-code-review" -SubmissionType "comment")
}

# ============================================================
# CHAPTER 15: Issue Templates (2 challenges)
# ============================================================
$challengeDefs["15.1"] = @{
    title = "Chapter 15.1: Analyze the Registration Template ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: issue-templates","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "15" -ChapterName "Issue Templates" `
        -ChallengeTitle "Analyze the Registration Template" `
        -ChallengeDesc "Open the workshop registration template, read the YAML structure, and post one observation about how the template improved contributions." `
        -Steps @"
1. Open: .github/ISSUE_TEMPLATE/workshop-registration.yml
2. Read the YAML structure: frontmatter (name, description, title, labels) and field types
3. Notice field types: input, dropdown, textarea, markdown
4. Observe: each field has a label, description, and validation rule
5. Compare: How is this better than a blank issue form?
6. Post a completion comment on this issue:

``````text
Chapter 15.1 complete:
- Opened the registration template: yes/no
- Field types I noticed:
- One way the template improved contributions:
``````
"@ `
        -Outcomes @"
- You can read and understand YAML form template structure
- You recognize accessibility-first design in form templates
"@ `
        -Stuck @"
1. Look in .github/ISSUE_TEMPLATE/workshop-registration.yml - that is the form you filled out to join
2. If YAML structure is confusing, focus on the field 'type' values: input, dropdown, textarea
3. Compare your registration issue with how a blank issue would look
4. Ask facilitator to show you a template they created
5. Comment on this issue describing what is blocking you
"@ `
        -LearningMoment "The best template is one you have already used. Template design is about pattern recognition and context adaptation, not starting from scratch." `
        -TimeEstimate "15-20 minutes" -Difficulty "advanced" `
        -AnchorText "issue-templates" -SubmissionType "comment")
}

$challengeDefs["15.2"] = @{
    title = "Chapter 15.2: Remix the Registration Template ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: issue-templates","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "15" -ChapterName "Issue Templates" `
        -ChallengeTitle "Remix the Registration Template" `
        -ChallengeDesc "Take the registration template structure and adapt it for a different use case (bug report, feedback, accessibility audit, etc.)." `
        -Steps @"
1. Copy the registration template structure
2. Change the context: bug report, workshop feedback, accessibility audit, or event signup
3. Update: field names, labels, descriptions, and dropdown options
4. Validate YAML syntax (e.g. yamllint.com)
5. Commit and push to your branch
6. Post a completion comment on this issue:

``````text
Chapter 15.2 complete:
- Context I chose for remix:
- Fields I changed:
- YAML validates: yes/no
- Link to my remixed template: [paste URL or describe location]
``````
"@ `
        -Outcomes @"
- You can adapt a professional template to a new context
- You understand why templates improve contribution quality and consistency
"@ `
        -Stuck @"
1. Start by copying the registration template and modifying only descriptions and labels first
2. If YAML is not parsing, compare against the original and validate indentation (two spaces per level)
3. Not sure what context to remix for? Try: bug report, feature request, workshop feedback
4. If template does not appear in chooser, verify filename ends in .yml and is in .github/ISSUE_TEMPLATE/
5. Ask facilitator for write access to a shared test repository if needed
"@ `
        -LearningMoment "The best template is one you have already used. Template design is about pattern recognition and context adaptation, not starting from scratch." `
        -TimeEstimate "30-45 minutes" -Difficulty "advanced" `
        -AnchorText "issue-templates" -SubmissionType "pr")
}

# ============================================================
# CHAPTER 16: Accessibility Agents (3 challenges + capstone is separate)
# ============================================================
$challengeDefs["16.1"] = @{
    title = "Chapter 16.1: Agent Discovery Mapping ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: agents","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "16" -ChapterName "Accessibility Agents" `
        -ChallengeTitle "Agent Discovery Mapping" `
        -ChallengeDesc "Read Section 3 of the Accessibility Agents chapter (The Ecosystem: 55 agents across 3 teams) and map 3-5 agents to Day 1 skills you already have." `
        -Steps @"
1. Read Section 3: The Ecosystem (55 agents across 3 teams)
2. Use the discovery framework: Skill you already have -> matching agent -> one safe first prompt
3. Match 3-5 agents to Day 1 skills you already have
4. For each match, answer: 'I am ready for this agent because I have already [skill]'
5. Post a completion comment on this issue:

``````text
Chapter 16.1: Agent Discovery Mapping
Agent 1: [agent name] - I am ready because I have already [skill]
Agent 2: [agent name] - I am ready because I have already [skill]
Agent 3: [agent name] - I am ready because I have already [skill]
``````
"@ `
        -Outcomes @"
- You can map Day 1 manual skills to specific agents in the ecosystem
- You understand the 'Skill First, Agent Second' principle
"@ `
        -Stuck @"
1. Start with @daily-briefing or @issue-tracker - those build directly on Chapters 2-5
2. If the agent list feels too broad, start with the Starter Set: @daily-briefing, @issue-tracker, @pr-review
3. Focus on agents that match skills you already demonstrated on Day 1
4. If unsure, just pick 3 agents and explain why they interest you
5. Ask facilitator for help navigating the agent ecosystem
"@ `
        -LearningMoment "The 55 agents exist because someone did the manual work first, then automated the repetitive parts. Skill First, Agent Second protects you from treating AI as magic." `
        -TimeEstimate "20 minutes" -Difficulty "advanced" `
        -AnchorText "accessibility-agents" -SubmissionType "comment")
}

$challengeDefs["16.2"] = @{
    title = "Chapter 16.2: Agent Skill Validation ({USERNAME})"
    labels = @("challenge","challenge: advanced","skill: agents","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "16" -ChapterName "Accessibility Agents" `
        -ChallengeTitle "Agent Skill Validation" `
        -ChallengeDesc "Run one agent from your discovery list in Copilot Chat and evaluate whether the output matched your expectations from manual experience." `
        -Steps @"
1. Clone your fork of the accessibility-agents repo
2. Open Copilot Chat and run one agent from your discovery list
3. Evaluate: Did the output match what you expected from manual experience?
4. Answer three evaluation questions in a comment on this issue:

``````text
Chapter 16.2: Agent Skill Validation
Agent I ran: [agent name]
Prompt I used: [what I typed]
1. Did the output match my manual experience? [yes/no/partially]
2. What did the agent get right?
3. What did the agent miss or get wrong?
``````
"@ `
        -Outcomes @"
- You have used at least one agent in Copilot Chat
- You can critically evaluate agent output against manual experience
"@ `
        -Stuck @"
1. Cannot see agents in Copilot Chat? Check: Is Copilot Chat extension installed? Are you signed in? Does .github/agents/ folder exist?
2. Agent output does not make sense? That is valuable feedback - paste it in your comment with your question
3. Clone failed? Use terminal: git clone https://github.com/[your-username]/accessibility-agents.git
4. If nothing works, describe what you tried and what happened
5. Ask facilitator to verify your setup and show one agent invocation
"@ `
        -LearningMoment "You already know the limits of automation because you have done the work by hand. That expertise lets you evaluate agents critically, catch their mistakes, and improve them." `
        -TimeEstimate "30 minutes" -Difficulty "advanced" `
        -AnchorText "accessibility-agents" -SubmissionType "comment")
}

$challengeDefs["16.3"] = @{
    title = "Chapter 16.3: Agent Instructions Deep Dive ({USERNAME})"
    labels = @("challenge","challenge: expert","skill: agents","day: 2")
    body = (New-ChallengeBody `
        -ChapterNum "16" -ChapterName "Accessibility Agents" `
        -ChallengeTitle "Agent Instructions Deep Dive" `
        -ChallengeDesc "Read one .agent.md or .prompt.md file from the accessibility-agents repo and analyze what the agent is trying to do, what tools it uses, and where it could make mistakes." `
        -Steps @"
1. Open the accessibility-agents repo
2. Find and read one .agent.md or .prompt.md file
3. Answer three analysis questions in a comment on this issue:

``````text
Chapter 16.3: Agent Instructions Deep Dive
File I read: [filename]
1. What is this agent trying to do?
2. What tools does it have access to?
3. Could this agent make a mistake? What kind?
``````
"@ `
        -Outcomes @"
- You can read and evaluate agent instructions
- You understand how agent behavior is defined by instruction files
"@ `
        -Stuck @"
1. Start with a short file - .prompt.md files are usually simpler than .agent.md files
2. Focus on the 'Description' and 'Tools' sections
3. For mistakes, think: what happens if the agent misunderstands the prompt?
4. If the file is too long, read just the first 50 lines and focus on the purpose
5. Show facilitator the file you chose and they can help interpret it
"@ `
        -LearningMoment "The agents that will exist in the future will be built by people who saw a gap and filled it. Understanding agent instructions is the first step toward building your own." `
        -TimeEstimate "15 minutes" -Difficulty "expert" `
        -AnchorText "accessibility-agents" -SubmissionType "comment")
}

# ============================================================
# MAIN EXECUTION
# ============================================================

# Determine which challenges to create
$chaptersToCreate = $challengeDefs.Keys
if ($ChaptersOnly) {
    $chapterFilter = $ChaptersOnly -split "," | ForEach-Object { $_.Trim() }
    $chaptersToCreate = $challengeDefs.Keys | Where-Object {
        $chPrefix = $_.Split(".")[0]
        $chPrefix -in $chapterFilter
    }
    Write-Host "Filtered to chapters: $ChaptersOnly"
    Write-Host "Challenges to create per student: $($chaptersToCreate.Count)"
}

$challengeOrder = @($chaptersToCreate | Sort-Object)
Write-Host "Challenge set: $($challengeOrder.Count) challenges per student"
Write-Host ($challengeOrder -join ", ")
Write-Host ""

# Load org members
Write-Host "Loading org members..."
$orgMembers = (gh api "orgs/Community-Access/members?per_page=100" --jq ".[].login") -split "`n" | Where-Object { $_.Trim() } | ForEach-Object { $_.Trim() }
Write-Host "Org members: $($orgMembers.Count)"

# Find students who already have this set of challenges
Write-Host "Checking existing challenge issues..."
$existingIssues = @{}
$page = 1
do {
    $batch = gh api "repos/$repo/issues?state=open&labels=challenge&per_page=100&page=$page" --jq '.[] | "\(.assignee.login // "none")||||\(.title)"' 2>&1
    $lines = ($batch -split "`n") | Where-Object { $_.Trim() }
    if ($lines.Count -eq 0) { break }
    foreach ($line in $lines) {
        $parts = $line -split '\|\|\|\|', 2
        if ($parts.Count -eq 2) {
            $user = $parts[0].Trim()
            $title = $parts[1].Trim()
            if (-not $existingIssues.ContainsKey($user)) { $existingIssues[$user] = @() }
            $existingIssues[$user] += $title
        }
    }
    $page++
} while ($lines.Count -ge 100)

# For each org member, determine which challenges they're missing
$creationPlan = @()
foreach ($student in ($orgMembers | Sort-Object)) {
    $studentTitles = if ($existingIssues.ContainsKey($student)) { $existingIssues[$student] } else { @() }
    foreach ($key in $challengeOrder) {
        $def = $challengeDefs[$key]
        $expectedTitle = $def.title -replace '\{USERNAME\}', $student
        # Check if this title already exists (fuzzy: ignore @() wrapper differences)
        $titleBase = $expectedTitle -replace '\s*\(@[^)]+\)$', '' -replace '\s*\([^)]+\)$', ''
        $alreadyExists = $studentTitles | Where-Object {
            ($_ -replace '\s*\(@[^)]+\)$', '' -replace '\s*\([^)]+\)$', '') -eq $titleBase
        }
        if (-not $alreadyExists) {
            $creationPlan += @{ student = $student; key = $key; def = $def }
        }
    }
}

Write-Host "Issues to create: $($creationPlan.Count)"
Write-Host ""

if ($DryRun) {
    Write-Host "[DRY RUN] Would create $($creationPlan.Count) issues"
    $byStudent = $creationPlan | Group-Object { $_.student }
    foreach ($g in ($byStudent | Sort-Object Name)) {
        $challenges = ($g.Group | ForEach-Object { $_.key }) -join ", "
        Write-Host "  $($g.Name): $challenges"
    }
    exit 0
}

if ($creationPlan.Count -eq 0) {
    Write-Host "Nothing to create. All org members have all challenges."
    exit 0
}

# Create issues
$created = 0
$failed = 0
$errors = @()
$total = $creationPlan.Count

foreach ($item in $creationPlan) {
    $student = $item.student
    $key = $item.key
    $def = $item.def

    $newTitle = $def.title -replace '\{USERNAME\}', $student
    $newBody = $def.body -replace '\{USERNAME\}', $student
    $labels = $def.labels

    $created++
    Write-Host "[$created/$total] $student - $key ... " -NoNewline

    $maxRetries = 5
    $retryCount = 0
    $success = $false

    while (-not $success -and $retryCount -le $maxRetries) {
        try {
            $payload = @{
                title = $newTitle
                body = $newBody
                assignees = @($student)
                labels = $labels
            } | ConvertTo-Json -Depth 3 -Compress

            $result = $payload | gh api "repos/$repo/issues" --input - --jq ".number" 2>&1

            if ($LASTEXITCODE -eq 0) {
                Write-Host "OK #$result"
                $success = $true
            } elseif ($result -match "secondary rate limit" -and $retryCount -lt $maxRetries) {
                $retryCount++
                $backoff = [Math]::Pow(2, $retryCount) * 15
                Write-Host "RATE LIMITED - waiting ${backoff}s (retry $retryCount/$maxRetries) ... " -NoNewline
                Start-Sleep -Seconds $backoff
            } else {
                $failed++
                $errors += "$student $key : $result"
                Write-Host "FAILED: $result"
                $success = $true  # exit loop, don't retry non-rate-limit errors
            }
        }
        catch {
            $failed++
            $errors += "$student $key : $_"
            Write-Host "ERROR: $_"
            $success = $true  # exit loop
        }
    }

    if (-not $success) {
        $failed++
        $errors += "$student $key : Exhausted retries after rate limiting"
        Write-Host "FAILED: Exhausted retries"
    }

    Start-Sleep -Milliseconds $DelayMs
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Created: $($created - $failed)"
Write-Host "Failed: $failed"
if ($errors.Count -gt 0) {
    Write-Host "`nErrors:"
    $errors | ForEach-Object { Write-Host "  $_" }
}
