# The Complete Facilitator Guide
## Running GitHub Classroom Workshops for Blind and Low-Vision Students

This is your comprehensive guide to facilitate a two-day GitHub workshop. It covers everything from initial GitHub Classroom setup through post-workshop follow-up, with special attention to accessibility and student success in an open-enrollment environment.

---

## 🎯 Quick Navigation

- **Just starting?** → Go to [GitHub Classroom Setup](#-github-classroom-setup-before-day-1)
- **Workshop is tomorrow?** → Go to [Pre-Workshop Checklist](#-pre-workshop-checklist-48-hours-before)
- **Workshop is happening now?** → Go to [Live Workshop Operations](#-day-1-live-operations)
- **Student got stuck?** → Go to [Troubleshooting Guide](FACILITATOR_CLASSROOM_TROUBLESHOOTING.md)
- **Need hands-on details?** → Go to [FACILITATOR_OPERATIONS.md](FACILITATOR_OPERATIONS.md)

---

## About This Workshop

**What:** A two-day hybrid workshop where blind and low-vision students learn GitHub through hands-on collaboration.

**Who:** You're facilitating for students with varying GitHub experience (zero to intermediate). You won't know ahead of time exactly who will join.

**Where:** Hybrid — video call + individual GitHub Classroom repositories.

**Why It Matters:** GitHub is a critical skill for modern tech careers. This workshop makes GitHub accessible through:
- Hybrid delivery (people can join sync or async)
- Individual private repos (safe practice space)
- Automated feedback (Aria bot)
- Progressive challenges (no overwhelming leaps)
- Peer community (students help each other)

**Main Goal:** Every student merges their first pull request and experiences successful collaboration.

---

## 👥 Your Facilitation Team

This workshop is designed for **2 co-facilitators** who can split roles:

- **Lead Facilitator** -- Owns messaging, demos, and orchestration
- **Co-Facilitator** -- Monitors chat, watches dashboard, helps individuals

If you're solo:
- Recruit a volunteer (TA, peer mentor, or co-instructor)
- Pre-record demos for asynchronous watching
- Use GitHub Discussions more heavily for async Q&A

---

## 🚀 GitHub Classroom Setup (Before Day 1)

This section is for someone (probably you!) setting up GitHub Classroom for the first time. If your Classroom is already configured, skip to [Pre-Workshop Checklist](#-pre-workshop-checklist-48-hours-before).

### What is GitHub Classroom?

GitHub Classroom is a free service that automatically creates private repositories for students. When a student clicks an invite link, GitHub Classroom:
1. Creates a repo from your template
2. Assigns it to that student
3. Sets permissions (student owns it, you can see it)
4. Returns them to their new repo

You get a dashboard showing all students' progress without manual intervention.

### Prerequisites

Before setting up Classroom, you need:

- A GitHub Organization (free plan works) — used to hold student repos
  - Create at https://github.com/organizations/new (or use existing one)
  - Add both facilitators as owners
- At least one template repository in that organization
  - Template includes: Challenge 1 issue, PR template, README
  - See [classroom/README.md](../classroom/README.md) for template structure
- GitHub Classroom is linked to your organization (automatic if you're an org owner)

### Step 1: Create Your First Assignment in GitHub Classroom

1. Go to https://classroom.github.com
2. Click "New Classroom"
3. Select your Organization
4. Give it a name: `learning-room-day1` (or similar)
5. Click "Create"

### Step 2: Add Your Co-Facilitator

1. In the new classroom, click "Settings"
2. Under "Organization admins," add your co-facilitator's GitHub username
3. Save

### Step 3: Create Your First Assignment

1. Click "New Assignment"
2. Enter title: `Day 1: GitHub Basics`
3. Select "Individual" (not group)
4. Under "Add your starter template repository," select your template repo
5. Under "Add auto-grading tests," skip this for Day 1 (optional for later challenges)
6. Click "Create assignment"
7. **Copy the invite link** and save it somewhere safe

This link is what you'll share with students. It never expires.

### Step 4: Create Your Second Assignment (for Day 2)

Repeat Step 3 but title it `Day 2: Advanced Skills`

Save both invite links in a safe place (notes, email yourself, password manager).

### Step 5: Test the Automation

1. Accept your own invite link (as if you were a student)
2. You should be asked to select your name from the roster
3. GitHub Classroom creates a repo for you
4. Verify:
   - Challenge 1 issue exists in your repo
   - Aria bot is configured (check Actions tab)
   - Student Progression bot can create new issues when you close one
5. Test creating and merging a PR to ensure:
   - Aria bot comments within 30 seconds
   - Merging closes the issue
   - Next challenge issue appears

If anything is missing, see [Troubleshooting GitHub Classroom Setup](#troubleshooting-github-classroom-setup) below.

### ⚠️ Known Gotchas

**"The invite link isn't working"**
- Make sure your Organization is created
- Make sure the assignment is published (green checkmark in Classroom)
- Make sure students have GitHub accounts (free account works)

**"No one in my organization can accept the invite"**
- Students don't need to be org members
- They just need a GitHub account
- If issue persists, check if Classroom link was copied correctly

**"Aria bot isn't commenting on PRs"**
- Verify Aria bot is installed in your Organization (Settings > GitHub Apps)
- Check if the Actions workflow is enabled in the template repo
- Manually test a PR in your test repo

**"I created a second assignment but can't see an invite link"**
- Assignments don't have individual invite links
- Use the **classroom-wide** invite link and let students select which assignment
- Or create separate Classrooms for Day 1 and Day 2

---

## 📋 Pre-Workshop Checklist (48 Hours Before)

You have two days until the workshop. Use this checklist:

### 72 Hours Before: Communication Sent

- [ ] Email sent to all registered students with:
  - Exact workshop date/time with time zone
  - Video call link + audio-only dial-in option
  - "Please test your setup 1 hour before start time"
  - FAQ link (see Appendix A)
  - Your emergency contact info
  - Screen reader accessibility note: "We've tested this with NVDA, JAWS, and VoiceOver"

### 48 Hours Before: Infrastructure Verified

- [ ] GitHub Classroom created with both Day 1 and Day 2 assignments
- [ ] Invite links copied and ready to share
- [ ] Template repo has Challenge 1 issue (will auto-create for each student)
- [ ] Your test student repo exists (you accepted invite to test)
- [ ] Aria bot installed and tested (posted to a PR, bot replied)
- [ ] Student Progression bot works (closed an issue, new challenge appeared)
- [ ] Both facilitators have admin access to the Classroom

### 24 Hours Before: Final Dry Run

- [ ] You've sent the invite link to someone as a test
- [ ] That person accepts and a repo is created successfully
- [ ] Check the Classroom dashboard: the test student shows up
- [ ] You can see their repo from the dashboard
- [ ] Video call link and audio dial-in tested
- [ ] Facilitator chat/question channel ready (Slack, Discord, GitHub Discussions, etc.)
- [ ] Any visual slides or demos have been tested for screen reader compatibility

### 6 Hours Before: Day-Of Setup

- [ ] GitHub Classroom dashboard open and logged in on facilitator computer
- [ ] Student roster visible on a second monitor (or open in a tab)
- [ ] First demo script ready (should be memorized, not read)
- [ ] Chat moderator assigned to their role
- [ ] Backup plan ready if:
  - Video call has tech issues (phone dial-in number active)
  - Bot stops working (you'll manually review PRs)
  - Key facilitator unavailable (co-facilitator can lead)
- [ ] Coffee/water ready 😄

---

## ✨ Day 1: Live Operations

This section covers what you and your co-facilitator do during Day 1.

### Hour 1: Welcome and GitHub Orientation (60 min)

**What's Happening:** Students are joining the call for the first time. They're nervous. Your job is to make them feel welcome and get them oriented to their GitHub repos.

#### Your Opening (First 5 Min)

Say something like:

> "Welcome everyone! I'm [name], and I'm so glad you're here. This is a completely accessible workshop — we've tested everything with screen readers, and if something breaks or doesn't work for you, please tell us immediately.
>
> Today we're learning GitHub, and in the next two days, every single one of you is going to merge your first pull request. That might not sound like a big deal, but it IS — it means you've collaborated with another person to improve code. That's a real developer skill.
>
> We're hybrid, so you can work at your own pace. Some of you will finish fast, some will take your time, and both are completely fine.
>
> Questions? Ask in chat anytime. That's what we're here for."

#### Your First Task: Get Everyone Into Their Repos

1. **Share the Day 1 invite link** in chat
2. Say: "I'm giving you a link to create your private GitHub repo. Click it and GitHub will ask you to pick your name from a list. Go ahead and do that now."
3. Give them 5 minutes
4. Check the GitHub Classroom dashboard for incoming acceptances
5. **Celebrate:** "Great! I see people joining. When you accept, GitHub creates your repo automatically. You should see a Challenge 1 issue waiting for you. Find it in your Issues tab."
6. In chat: "Raise your hand (type in chat) when you see Challenge 1"
7. When 70%+ have confirmed: "Perfect! Everyone has their Challenge 1. Let's look at what you're going to do."

#### Demo: Show a Challenge 1

1. **Open your test student repo** on screen
2. **Narrate out loud** what you're seeing:
   > "I'm going to click the Issues tab... I see Challenge 1 here. It has a description of what I need to do. At the bottom there's a 'If You Get Stuck' section. If anything is confusing, that's where to start."
3. Read the challenge text aloud (slowly)
4. Ask in chat: "Does everyone see something similar in your Challenge 1? Say yes in chat"
5. Help anyone who doesn't see it:
   - "Go to your repo page"
   - "Click the Issues tab"
   - "You should see a list; click the one that says Challenge 1"

**Success Metric:** Everyone has confirmed they can see Challenge 1.

### Hour 2: Demo — Your First Pull Request (30 min)

**What's Happening:** You're showing students the exact workflow they'll repeat for every challenge. Make it crystal clear.

#### Your Narrated Demo

Open a challenge in your test repo and **narrate every single step**:

> "Okay, I'm going to do Challenge 1 right now, and you're going to watch me do it. I'm going to talk through every click so you know exactly what to do when it's your turn.
>
> **Step 1: Read the challenge**
> I'm looking at the Challenge 1 issue. It says [read it]. Okay, so I need to [summarize task]. Got it.
>
> **Step 2: Start editing**
> I see there's a file I need to edit. I'm going to find it in the file list and click the pencil icon to edit it. [Click pencil]
> Now I'm in the editor. I can see the current text. I need to [describe what to change].
>
> **Step 3: Make my change**
> [Type the change while narrating]
> Okay, I've made my change. Now I need to create a pull request to propose this change.
>
> **Step 4: Create a pull request**
> I'm scrolling down to find the 'Propose changes' button. [Click it]
> GitHub is now asking me if I want to create a new branch. Yes, I do. [Click 'Create a new branch']
> Now I see the PR comparison page. It shows my old version and my new version.
>
> **Step 5: Fill out the PR form**
> I'm clicking the 'Create pull request' button [click]
> Now I see a form with fields like title and description. There's a PR template here that helps me know what to fill in.
> [Fill out form while narrating each field]
>
> **Step 6: Submit the PR**
> I'm clicking the green 'Create pull request' button [click]
> Done! The PR is created.
>
> **Step 7: Wait for Aria bot feedback**
> Watch what happens next... Aria bot checks my work automatically.
> [Wait 30 seconds]
> See? The bot commented with feedback. It's checking if my change follows the rules.
>
> **Step 8: Address feedback (if any)**
> If the bot found an issue, I would go back and fix it. But my change looks good, so I'm ready to request a review.
>
> **Step 9: Request a review**
> I'm typing @[another student] in a comment to ask them to review my PR.
> [Wait for their response in real life]
> My peer approved it, so now I can merge.
>
> **Step 10: Merge the PR**
> I'm clicking the 'Merge pull request' button [click]
> Done! The PR is merged. The issue closes automatically.
>
> **Step 11: See your next challenge**
> Watch — because the bot closes the Challenge 1 issue when I merged, the next challenge will appear automatically...
> [Refresh Issues tab]
> There it is! Challenge 2 just appeared. That's how progression works."

#### Key Teaching Points

- **Don't rush** — students are taking notes
- **Narrate actions before doing them:** "I'm going to click the edit pencil now..." [then click]
- **Normalize mistakes:** "Oops, that's not the right button. Let me click over here instead."
- **Stop and ask:** "Does everyone see what I'm seeing? Type yes in chat."
- **Celebrate:** "This workflow — read issue → edit → propose changes → request review → merge — you're going to do this same thing 15 times over two days. You're going to be amazingly good at it."

**Success Metric:** Students say things like "I see how this works" or "That was clear" in chat.

### Hours 3-6: Supervised Working Session (Approximately 4.5 Hours)

**What's Happening:** Students are working on their challenges while you monitor and help.

#### Your Role During This Time

**Primary:** Monitor the GitHub Classroom dashboard

- Refresh it every 5-10 minutes
- Look for:
  - New commits (student is active)
  - PRs being created (they're progressing)
  - Autograding failures (might need help)
  - Students with zero activity (might need a nudge)

**Secondary:** Be responsive in chat and comments

When you notice something:

1. **Student hasn't started after 20 min** → Chat message:
   > "Hey @student! How's it going? Found your Challenge 1? If you need a hint, just ask in chat."

2. **Student created a PR** → Check it
   - Did Aria bot comment?
   - Does the student understand the feedback?
   - Comment if needed: "Looking good! I see the bot asked you to [X]. Give that a try!"

3. **Student merged a PR** → Celebrate publicly:
   > "🎉 Awesome work @student! You just merged your first pull request! That's huge."

4. **Aria bot gave confusing feedback** → Translate it:
   > "I see Aria's feedback. Let me explain what it means: [plain language explanation]. Try [specific fix]."

5. **Student is stuck and says so** → Help them
   - Look at their repo
   - Read the "If You Get Stuck" section of their challenge
   - Comment: "I see where you're stuck. Try [specific step]. Let me know how it goes!"

#### Expected Rhythm

| Time | What to Expect |
|------|---|
| **Min 1-15** | Students opening PRs on their first challenge |
| **Min 15-30** | Aria bot feedback flowing; students starting fixes |
| **Min 30-60** | First reviews happening; students requesting merges |
| **Min 60-120** | Early merges happening; progression bot creating Challenge 2 |
| **Min 120-180** | Second wave of PRs; momentum building; some finishing Challenge 2 |
| **Min 180-270** | Mixed activity: some on Challenge 3+, others still on Challenge 1, all valid |

#### Facilitator Interventions

**If a student says "I don't understand this challenge":**
1. Read the challenge text back to them
2. Break it into smaller steps
3. Give one next step: "Try [this specific thing] first"
4. Offer to look at their repo: "Send me the link and I'll take a look"

**If a student says "I'm done, what do I do next?":**
- **Option A:** "Start Challenge 2 (it will appear automatically when the bot processes)"
- **Option B:** "Can you review someone else's PR? That helps them and teaches you code review"
- **Option C:** "Help a peer who's still working. Teaching others is real learning"

**If Aria bot stops responding:**
1. Check [GitHub Actions status page](https://www.githubstatus.com)
2. If it's down, post in chat: "We're experiencing a brief delay with our feedback bot. We're looking into it."
3. Manually review PRs and post feedback in Aria's format (see [Troubleshooting](FACILITATOR_CLASSROOM_TROUBLESHOOTING.md))

**If two students want to peer review:**
- Perfect! Encourage it. That's the whole point.
- Remind them: "Click the 'Files changed' tab to see the code. Leave thoughtful comments."

#### Managing Energy

- Every 60 minutes: "Quick break everyone. Stand up, stretch, grab water."
- Answer the same question multiple times without sighing
- Celebrate effort, not just finished work: "Nice debugging work!" (even if they haven't finished)
- If energy is low: "We're doing amazing. Look at how many PRs have been merged!"

### Hour 7: Q&A and Reflection (30 min)

**What's Happening:** You're wrapping up Day 1, celebrating progress, and setting up for Day 2.

#### Reflection Prompt

Ask in chat or video:

> "Tell us in chat: What was one thing you learned today about GitHub? Or what surprised you?"

Listen and affirm:

- "GitHub is [student answer]" ✓
- "Peer review helps [student answer]" ✓
- "I struggled with [thing] but I figured it out" ✓ **CELEBRATE THIS**

#### Share Day 1 Stats

Pull from the Classroom dashboard:

> "Today, X students joined, Y PRs were merged, Z students completed multiple challenges. That's real progress. You all should be proud."

#### Troubleshoot Remaining Issues

- Students still stuck: "We can help you after this call. Don't leave without asking."
- Questions about tomorrow: "Tomorrow we'll do deeper work. Same process, harder challenges."
- Access issues: "If you have anything that didn't work for your screen reader, email us. We fix it before tomorrow."

#### Send Them Off

> "Great work today! Rest well. Tomorrow we go deeper. See you at [time]!"

### Hour 8: Optional Office Hours (60 min)

- Stay available in chat or on call
- Help any student who wants to:
  - Finish their first PR
  - Start Challenge 2
  - Ask follow-up questions
  - Troubleshoot issues

---

## 🎉 Day 2: Deeper Skills and Celebration

### Hour 1: Recap and Momentum (30 min)

**What's Happening:** Students join fresh. You remind them of their progress and introduce Day 2 assignment.

#### Your Opening

> "Welcome back! Let me tell you what you did yesterday...
>
> X students completed Challenge 1 and merged their first PR. That's huge.
> Y students are already on Challenge 2 or beyond.
> Z students are working async and will finish today.
>
> That means you all know:
> - How to navigate GitHub
> - How to edit and create a PR
> - How to request a review
> - How to merge a PR
>
> You did that in one day. That's amazing.
>
> Today we go deeper. New challenges, more complex scenarios, and you're all ready for it."

#### Day 2 Assignment

1. **Share the Day 2 invite link** in chat
2. Say: "Click this link and accept Day 2 assignment. It's separate from Day 1."
3. Give them 5 minutes
4. Check the Classroom dashboard
5. When most have accepted: "Perfect! Challenge 10 is waiting for you. This one is a step up in difficulty. You've got this."

### Hour 2: Code Review Deep Dive (60 min)

**What's Happening:** You're teaching the skill of reviewing someone else's code professionally.

#### Demo: How to Review a PR

1. **Open a student's PR** from yesterday (ask permission or use your test repo)
2. **Narrate while reviewing:**
   > "Okay, someone asked me to review their PR. Here's what I do:
  >
   > **Step 1: Read the description** — What are they changing and why? [read it]
  >
   > **Step 2: Click 'Files changed'** — Now I see the code diff. Red means removed, green means added. [click and show]
   >
   > **Step 3: Read the code carefully** — Does it make sense? Is it following the guidelines? [read and comment]
   >
   > **Step 4: Leave feedback** — I click the comment button next to lines I have thoughts about. [click]
   >
   > **Step 5: Be specific and kind** — Instead of 'this is wrong,' I say 'I notice this could be [better]. Consider [suggestion].'
   >
   > **Step 6: Approve or request changes** — At the top, I click 'Approve' if I'm happy with it, or 'Request changes' if I want fixes."

#### Pair Review Activity

1. Assign pairs: "Student A, you review Student B's PR. Student B, you'll review Student C's. Etc."
2. Give them a template for feedback:
   ```
   - What I liked about this PR: [specific thing]
   - One question I have: [genuine question]
   - One suggestion: [improvement idea]
   ```
3. Give them 20 minutes to do reviews
4. Check back and celebrate: "I see great comments happening!"

### Hours 3-7: Progressive Challenges (Approximately 4.5 Hours)

**What's Happening:** Students are working through Challenges 10-16, which are harder and more realistic.

#### Challenge Progression Map

| Track | Challenges | Topics | Expected Time |
|-------|---|---|---|
| **Core** | 10-13 | VS Code, Git locally, branching, conflict resolution | 4-6 hrs |
| **Advanced** | 14-16 | Issue templates, fork-and-contribute workflow, capstone | 6-8 hrs |
| **Bonus** | bonus-a through bonus-e | CLI, search, branch protection, cloud editors | 2-4 hrs each |

Students don't see challenges that aren't unlocked yet. The progression bot unlocks them when challenges are closed.

#### Your Facilitation During Hour 3-7

**Dashboard monitoring:** Every 10 minutes, check:
- Who's on which challenge
- Any students still on Challenge 10 (might need help)
- Any autograding failures
- Recent merges (celebrate them)

**Proactive help:**
- Students on Challenge 14+ → Extra encouragement: "You're getting into real developer territory!"
- Students still on Challenge 10-12 → Gentle check-in: "How's it going? Stuck on anything?"
- Peer reviews → Encourage more: "I see reviewers doing great work!"

**Responsive help:**
- Student asks "What's Git?" → Explain clearly, add to a running glossary
- Student's PR has autograder failure → Check what test failed, help them debug
- Student at same place as another → Suggest they collaborate: "You two are both on Challenge 11 — want to pair?"

#### Managing Different Paces

**Faster students (on Challenge 14+):**
- Give them bonus challenges to explore
- Invite them to help peers
- Recognize their ambition: "You're flying through these!"

**Average pace students (on Challenge 11-13):**
- Keep them engaged with encouragement
- Help when they hit roadblocks
- Celebrate steady progress

**Slower pace students (still on Challenge 10-12):**
- NO pressure — this is fine
- Check if they need help or prefer async
- Offer 1:1 support after main session
- Include them in celebrations: "X students working on foundational skills"

#### Key Facilitator Moves

1. **Answer the same question multiple ways** — someone will finally get it
2. **Celebrate effort** — "I see you troubleshooting that error. That's exactly what real developers do."
3. **Normalize struggle** — "Everyone gets stuck. That's where learning happens."
4. **Bridge knowledge gaps** — If someone doesn't know Git, teach it briefly, add to resources
5. **Keep energy positive** — Day 2 is harder; your enthusiasm carries them

### Hour 7: Final Q&A and Celebration (60 min)

**What's Happening:** You're wrapping up the two-day journey, celebrating progress, and sending students off with confidence.

#### Pull the Dashboard Data

From GitHub Classroom, collect:

- Total students enrolled
- Total students who merged at least one PR
- Total PRs merged (all challenges combined)
- Fastest student (by PRs merged)
- Students who completed code review cycle
- Students who made it to advanced challenges
- Students still actively working (will continue async)

Say something like:

> "Over two days, we had X students join. Here's what we accomplished:
> - Y students merged their first PR
> - Z total PRs were merged — that's real code changes
> - N students made it to advanced challenges
> - Everyone who's here learned something new about GitHub
>
> That's incredible. You should all be proud."

#### Celebrate Specific Wins

Call out individuals by name (with permission):

> "@student1 — you merged 5 PRs! That's impressive velocity."
> "@student2 — you helped three peers debug their code. That's mentorship."
> "@student3 — you hit Challenge 15 on day 2. You went deep."

#### Next Steps Guidance

Give students concrete next steps:

> "Here's what we suggest next:
> 1. **Contribute to open source** — Find a repo you love and look for 'good first issue'
> 2. **Use what you learned** — GitHub is real infrastructure; keep using it
> 3. **Join our alumni community** — [Community-Access/support](https://github.com/Community-Access/support) — ask questions, share wins
> 4. **Build something** — Use GitHub as your project portfolio"

#### Share Resources

Point to:
- [CONTRIBUTING.md](../CONTRIBUTING.md) — How to contribute to open source
- [docs/](../docs/) — All the reference guides
- Support Hub: [Community-Access/support](https://github.com/Community-Access/support)
- Your contact info for questions

#### Thank You Note

> "Thank you for being here, for asking great questions, for helping each other, and for giving GitHub a real try. The fact that you're learning this skill — that you know GitHub — that matters. Use it well.
>
> We're so glad you were here."

### Hour 8: Informal Hangout / Office Hours (60 min)

- Keep call open for students who want to:
  - Continue working (keep dashboard accessible)
  - Chat with peers
  - Ask final questions
  - Exchange GitHub usernames / social
- Optional: Have facilitators available in chat for async follow-ups

---

## 📊 Post-Workshop Tasks (Week After)

### Day 3 (Next Day)

- [ ] Export GitHub Classroom dashboard data
  - Total students, PRs merged, challenges completed
  - Save as CSV or screenshot
- [ ] Identify students who are stuck/need follow-up
  - Email them: "You're doing great! Need any help finishing?"
- [ ] Document any automation failures
  - If Aria bot or progression bot had issues, log them for your next setup
- [ ] Thank your co-facilitator
  - Debrief on what went well and what to improve

### Days 4-7

- [ ] Send personalized email to each student
  - Reference something specific they accomplished
  - Point them to next resource (alumni channel, open source guide)
  - Leave door open for questions
- [ ] Update your facilitator notes
  - What questions came up most?
  - What accessibility issues appeared?
  - What challenges took longer than expected?
- [ ] Invite students to alumni community
  - Support Hub: https://github.com/Community-Access/support
  - Encourage them to stay in touch and help future students

### Weeks 2+

- [ ] Monitor alumni community
  - Watch new issues/discussions in Support Hub and respond within 24 to 48 hours
  - Answer questions
  - Celebrate project shares
  - Offer 1:1 mentorship if interested
- [ ] Prepare for next cohort
  - Update facilitator guide based on learnings
  - Update challenge content based on student feedback
  - Test GitHub Classroom automation again

---

## 🆘 Quick Troubleshooting Reference

### During Workshop

**"I can't see my GitHub repo"**
→ Have them go to github.com/settings/repositories and look for repo with their name
→ Or share the direct link: community-access-classroom/learning-room-[username]

**"The bot didn't comment on my PR"**
→ Refresh the page
→ Wait 30 seconds (bot takes a bit)
→ If still nothing, manually review and comment with feedback

**"I merged but Challenge 2 didn't appear"**
→ Refresh their issues page
→ If still nothing, manually create Challenge 2 issue (copy Challenge 1, change number)

**"Two students merged the same PR by accident"**
→ No problem! It happens in real GitHub too.
→ Revert the merge: "Revert this PR" button
→ Have them try again

**"My internet cut out / I lost the call"**
→ GitHub Classroom doesn't require the call — work continues
→ Post updates in Support Hub Discussions or email
→ Students can continue async

For more, see [FACILITATOR_CLASSROOM_TROUBLESHOOTING.md](FACILITATOR_CLASSROOM_TROUBLESHOOTING.md)

---

## 📚 Appendices

### Appendix A: Facilitator Communication Templates

**Pre-Workshop Email**

Subject: Your GitHub Workshop Starts Tomorrow!

> Hi [Name],
>
> We're excited to have you join us tomorrow at [TIME] for our two-day GitHub workshop!
>
> **Quick checklist:**
> - GitHub account created? (Go to github.com)
> - Can you join the video call? (Link: [URL]) or dial audio-only: [NUMBER]
> - Do you have a screen reader installed? (NVDA, JAWS, or VoiceOver work great with GitHub)
>
> **Tomorrow's plan:**
> - Hour 1: Welcome and GitHub orientation
> - Hour 2: Demo of your first PR
> - Hours 3-6: You work on challenges, we help
> - Hour 7: Q&A and celebration
>
> **If you have questions before we start:** Email us or chat us — we're here to help!
>
> See you tomorrow!

**"Student is Stuck" Response**

> Hi @[Name],
>
> I see you working on Challenge [X]. Let me help.
>
> The challenge is asking you to [rephrase in plain language].
>
> Here's the next step: [ONE specific thing to do]
>
> Try that and let me know how it goes!

**Post-Workshop Thank You**

> Hi [Name],
>
> Thank you so much for joining our GitHub workshop! I wanted to reach out and tell you what an awesome job you did.
>
> You merged [X] pull requests and worked through [Y] challenges. That shows real growth.
>
> I especially appreciated when you [specific moment they did well].
>
> **Keep learning:**
> - Check out [CONTRIBUTING.md](../CONTRIBUTING.md) for contributing to open source
> - Join our alumni community: https://github.com/Community-Access/support
> - Email if you have any GitHub questions — we're here
>
> Great work, and keep building!

### Appendix B: Screen Reader Quick Reference

**For NVDA Users:**
- `Insert + Down Arrow` — Read all
- `H` — Jump to next heading
- `Tab` — Jump to next button/link
- `F` — Jump to next form field
- `A` — Jump to next button or clickable element

**For JAWS Users:**
- `Insert + Down Arrow` — Read all
- `H` — Jump to next heading
- `Tab` — Jump to next button/link
- `R` — Jump to next form field
- `B` — Jump to next button

**For VoiceOver (Mac) Users:**
- `VO + Down Arrow` — Read continuously
- `H` — Jump to next heading
- `Tab` — Jump to next button/link
- `F` — Jump to next form field

**GitHub.com Keyboard Shortcuts (Most Important):**
- `T` — Open file finder
- `I` — Jump to Issues
- `P` — Jump to Pull requests
- `G` then `C` — Go to Code
- `?` — Show all keyboard shortcuts

### Appendix C: Common Challenge "If You Get Stuck" Phrases

*These are used in each challenge issue. Paste them into challenge issues to guide stuck students:*

**For editing challenges:**
> If you get stuck: Look for the pencil icon (✏️) to edit the file. Type your change, then scroll down and click "Propose changes."

**For PR challenges:**
> If you get stuck: Don't refresh the page yet! GitHub is still processing. Wait 30 seconds. If still nothing, paste this link in chat: [direct link to PR]

**For review challenges:**
> If you get stuck: Click the "Files changed" tab on the PR. Click the comment bubble next to lines you want to comment on. Type your feedback and click "Comment."

**For merge conflicts:**
> If you get stuck: This is the hardest challenge because merge conflicts are tricky in real life too. Post your question in chat — this is not something to figure out alone.

---

## 💡 Philosophy and Final Thoughts

This workshop succeeds because of **you** — the facilitator. Here's what you bring:

- **Patience** — Answer the same question 10 times without frustration
- **Clarity** — Explain complex things in simple language
- **Celebration** — Make everyone feel like their progress matters (it does)
- **Accessibility** — Test everything with screen readers, adapt for each student
- **Humanity** — You're not perfect, and that's okay. Normalize mistakes.
- **Community** — Build an environment where students help each other

You're not just teaching GitHub. You're teaching inclusion — showing students that tech spaces can and should be accessible to everyone, including blind and low-vision people.

Every student who merges their first PR is a student who now knows they belong in tech.

That's the real goal. Everything else follows from that.

---

## 📞 Need Help?

If something goes wrong:

1. **Automation failing?** → See [FACILITATOR_CLASSROOM_TROUBLESHOOTING.md](FACILITATOR_CLASSROOM_TROUBLESHOOTING.md)
2. **Student having issues?** → See [FACILITATOR_OPERATIONS.md](FACILITATOR_OPERATIONS.md)
3. **Setting up for first time?** → Scroll back to [GitHub Classroom Setup](#-github-classroom-setup-before-day-1)
4. **Can't find what you need?** → Email or ping us — we'll help and update this guide

---

**Last Updated:** May 2026 | **Version:** 2.0 | **Maintainer:** Jeff Bishop

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Running GitHub Classroom Workshops for Blind and Low-Vision Students:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **🎯 Quick Navigation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **About This Workshop:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **👥 Your Facilitation Team:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **🚀 GitHub Classroom Setup (Before Day 1):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **📋 Pre-Workshop Checklist (48 Hours Before):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **✨ Day 1: Live Operations:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **🎉 Day 2: Deeper Skills and Celebration:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Skills catalog](https://skills.github.com/), [GitHub Learning Pathways](https://resources.github.com/learn/pathways/)
- **📊 Post-Workshop Tasks (Week After):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **🆘 Quick Troubleshooting Reference:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **📚 Appendices:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **💡 Philosophy and Final Thoughts:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **📞 Need Help?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
