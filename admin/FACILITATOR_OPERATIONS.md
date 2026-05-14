# Facilitator Operations Guide
## Real-Time Workshop Management Procedures

This guide provides step-by-step procedures for facilitators during the workshop. Use this alongside [FACILITATOR_GUIDE.md](FACILITATOR_GUIDE.md) for the big picture and [FACILITATOR_CLASSROOM_TROUBLESHOOTING.md](FACILITATOR_CLASSROOM_TROUBLESHOOTING.md) for problem-solving.

---

## Pre-Workshop Setup (3 Hours Before)

### Facilitator Workstation Setup

**Physical Setup:**
- [ ] Primary monitor: GitHub Classroom dashboard
- [ ] Secondary monitor (or browser tab): Student repo template / demo repo
- [ ] Laptop: Video call software tested
- [ ] Phone: Audio dial-in number saved
- [ ] Notepad: For tracking student issues in real-time
- [ ] Water/coffee within reach
- [ ] Noise-canceling headphones (optional but helpful)

**Software Setup:**
- [ ] GitHub Classroom dashboard open and logged in
  - URL: https://classroom.github.com
  - Bookmark this for quick access
- [ ] Test student repo open in a tab (your repo you created during setup)
- [ ] GitHub Discussions / chat channel open
- [ ] Timer or stopwatch ready (for tracking session times)
- [ ] Email client visible (for student emails)

**Communication Setup:**
- [ ] Co-facilitator has your phone number
- [ ] You have their phone number
- [ ] Both have chat channel open
- [ ] Backup communication method agreed on (Slack, Discord, etc.)

### Dashboard Orientation

Open [classroom.github.com](https://classroom.github.com):

1. **Click your classroom** → You see:
   - Assignment name
   - Number of students who've accepted
   - List of all students + their repo status
   - Recent commit activity

2. **Key columns to watch:**
   - ✓ Accept status — Click to see if student repo was created
   - Last commit time — When they last pushed code
   - Autograding status — Pass/fail on any tests

3. **Filter by status:**
   - Accepted → Students who have repos
   - Pending → Students who haven't accepted yet (you might need to follow up)

4. **Favorite this page** — You'll visit it constantly

### Notification Setup

Ask GitHub or chat platform to notify you of:
- [ ] GitHub Discussions (if using for questions)
- [ ] Mentions in chat (@facilitator)
- [ ] Direct messages from students

**Test notifications:** Have your co-facilitator ping you to confirm alerts work.

---

## Starting Day 1 (15 Minutes Before Call Starts)

### Final Checklist (5 min before start)

- [ ] Yourself: Bathroom break done, water nearby, headphones on
- [ ] Software: All tabs open, no unexpected pop-ups
- [ ] Dashboard: Refreshed, showing latest data
- [ ] Co-facilitator: Online and confirmed in chat
- [ ] Students: Should be joining now — check incoming attendees
- [ ] Recording: If recording, make sure it's recording
- [ ] Slides: If using slides, they're visible and tested

### First 60 Seconds on Call

1. **Welcome message to chat:**
   ```
   Welcome to the GitHub Workshop! 👋 
   If you can see this message, you're connected.
   Video or audio-only? Both are fine.
   Screen reader users: All of GitHub.com is accessible.
   Questions? Ask in chat anytime!
   ```

2. **Monitor arrivals:**
   - Watch participant list
   - Greet people by name as they join
   - "Hi [name], welcome! Glad you made it!"

3. **Quick accessibility check:**
   - "If your screen reader is working and you can hear me, say so in chat"
   - Confirm at least 70% have confirmed
   - If issues: "Let's get those fixed. Chat or email me."

4. **Settle the room:**
   - "We'll start in about 5 minutes. Get comfortable, grab water, etc."

---

## During Hour 1: Welcome and Orientation

### 0:00-0:05: Your Opening

**Talking points (say these out loud):**

> "Welcome everyone. I'm [name], and this is [co-facilitator name]. We're going to spend the next two days learning GitHub together.
>
> [Pause for acknowledgment]
>
> This is a completely accessible workshop. We've tested it with NVDA, JAWS, and VoiceOver. If something doesn't work for your screen reader, tell us immediately and we'll fix it.
>
> [Pause]
>
> Over the next two days, every single one of you is going to merge your first pull request. That might not sound like a big deal, but it is. It means you've collaborated with another person to improve code. That's a real developer skill.
>
> [Pause]
>
> We're hybrid, so you can work at your own pace. Some will finish fast, some will take time, and both are completely valid. No pressure.
>
> [Pause]
>
> Questions? Ask in chat anytime. That's what we're here for. Let's get started."

### 0:05-0:15: Getting Into Repos

**Step 1: Share the invite link**

In chat, post:
```
Here's your Day 1 invite link:
[PASTE YOUR INVITE LINK]

Click it and GitHub will ask you to pick your name from a list.
Accept and GitHub creates your repo.
```

**Step 2: Monitor the Classroom dashboard**

- Refresh every 30 seconds
- Watch for new acceptances
- Count them out loud: "I see 3... 5... 10 people joining..."

**Step 3: Guide through the process**

In chat as things happen:
```
Great! I see people accepting the invite.
You should now be in your private repo.
Look for "Challenge 1" in your Issues tab.
When you see it, say so in chat!
```

**Step 4: Help people who are stuck**

After 5 minutes, if someone hasn't said they found Challenge 1:
- Message them directly: "Hey @[name], did you find your Challenge 1? Let me know if you need help."
- Check dashboard: Did their repo get created?
- If repo created but they can't find issue: Direct link: `github.com/community-access-classroom/learning-room-[username]/issues`

**Step 5: Confirm everyone is in**

Wait until 70%+ have said they see Challenge 1 before moving forward.

### 0:15-0:25: Demo Reading Challenge 1

**Your actions:**

1. **Open your test repo on screen**
2. **Narrate what you're doing:**
   ```
   "I'm going to show you what Challenge 1 looks like.
   I'm clicking the Issues tab...
   I see Challenge 1 here...
   Let me read it to you..."
   ```
3. **Read the challenge issue text out loud** (slowly, pausing between sentences)
4. **Point out key sections:**
   - "Here's what I need to do: [describe]"
   - "At the bottom, there's a 'If You Get Stuck' section — that's your safety net"
   - "This is a great challenge to learn the basics"

**Ask in chat:** "Does everyone see something similar in their Challenge 1?"

Wait for confirmations. Help anyone who sees something different.

---

## During Hour 2: Demo PR Workflow

### Demo Repo: Do Challenge 1 for Real

**Setup:** You're using your test repo (the one you created during setup).

**Narration Style:** Talk through EVERY action before doing it.

> "Okay, I'm going to complete Challenge 1 right now. Watch what I do, because you're going to do the same thing 15 times this week.
>
> **Step 1: Read the challenge**
> The challenge is asking me to [describe]. Okay, I understand what I need to do.
>
> **Step 2: Find the file**
> I need to edit a file called [filename]. Let me look in the file list... there it is.
>
> **Step 3: Click edit**
> I'm clicking the pencil icon (✏️) to edit the file.
>
> **Step 4: Make my change**
> [Type while narrating] I'm adding this text... done.
>
> **Step 5: Create PR**
> I'm scrolling down... I see 'Propose changes' button. I'm clicking it.
>
> **Step 6: Create new branch**
> GitHub is asking if I want a new branch. Yes, I do. Clicking 'Create branch'...
>
> **Step 7: Compare PR**
> Now I see the comparison. My change is in green. Looks good!
>
> **Step 8: Review PR template**
> I'm clicking 'Create pull request'...
> Now I see a form with a template. The template tells me what to fill in.
> [Fill form while narrating each field]
>
> **Step 9: Create PR**
> I'm clicking the green 'Create pull request' button... done!
>
> **Step 10: Wait for Aria**
> Now watch... Aria bot automatically checks my work...
> [Wait 30 seconds]
> There! The bot commented. It's checking if I followed the rules.
>
> **Step 11: If I need to fix it**
> If Aria said I need to change something, I would go back to the PR and push a new commit.
> Since my PR is good, I'm ready to ask for a review.
>
> **Step 12: Request review**
> I'm typing @[another-student] to ask them to review my PR.
>
> **Step 13: Get approval**
> They reviewed it and approved.
>
> **Step 14: Merge**
> I'm clicking 'Merge pull request'... done!
>
> **Step 15: See next challenge**
> Now watch the Issues tab...
> [Refresh]
> Challenge 2 just appeared! That's how progression works.
>
> **That's the workflow.** You'll repeat this for every challenge. By the end of Day 2, you'll be excellent at this."

### Post-Demo Q&A

In chat: "Questions about what you just watched?"

Answer a few questions, then:
> "Great. Any more questions? If not, let's move to working session. You've got this!"

---

## During Hours 3-6: Working Session Management

### Facilitator Dashboard Monitoring Routine

**Every 5-10 minutes:**

1. **Refresh Classroom dashboard**
2. **Scan for:**
   - New repos created (scroll Accepted column)
   - Recent commits (look at timestamps)
   - PRs appearing (check student repos)
   - Autograding failures (if applicable)
   - Zero activity students (might need nudge)

3. **Make notes:**
   - "Student A has PR open — review when bot done"
   - "Student B has zero commits — check in at 45-min mark"
   - "Student C merged — celebrate in chat!"

### Proactive Interventions (By Time)

**0-15 min:** 
- Monitor dashboard constantly
- Expect: First PRs being created
- If nothing: "Anyone need help with their first PR?"

**15-30 min:**
- Aria bot feedback should be flowing
- Look for confused students
- In chat: "Anyone see feedback from Aria? Let me know if it's confusing!"

**30-60 min:**
- First merges happening
- New challenges appearing
- Celebrate: "🎉 @student1 just merged their first PR! Nice work!"

**60-120 min:**
- Mixed activity
- Some on Challenge 2, others still on Challenge 1 — both OK
- Check on quiet students: "How's it going, @student2?"

**120-180 min:**
- Momentum building
- Multiple PRs happening simultaneously
- Watch for: Stuck students (same challenge 60+ min)

**180-270 min:**
- Peak activity
- Help focuses on blockers, not starters
- Celebrate milestones: "Wow, @student3 is on Challenge 3!"

### Responding to Common Chat Messages

| Student Says | Your Response |
|---|---|
| "I'm stuck" | "Tell me what challenge you're on and what's confusing." (Then see troubleshooting guide) |
| "Is this right?" | "What did you create? Show me a link." (Then validate) |
| "I merged!" | "🎉 Awesome! You just merged your first PR! That's huge!" |
| "What's next?" | "Your next challenge should appear soon. Refresh your Issues. If not, let me know!" |
| "Is [technology] important?" | "Great question! [Short answer]. Let's talk more after this challenge." |
| "My screen reader glitched" | "Which screen reader? What glitched? Let's fix it." (Then escalate if needed) |

### Peer Review Encouragement

**What to look for:**
- Student A finishes Challenge 1
- Student B also finished Challenge 1
- Opportunity: Have them review each other!

**What to say:**
> "@student1 and @student2 — you both finished Challenge 1! Want to review each other's PRs? That's how real developers work."

**Guide them:**
- "Go to their PR"
- "Click 'Files changed'"
- "Leave a comment on lines you have thoughts about"
- "Then approve or request changes"

---

## During Hour 7: Q&A and Wrap-Up

### 0:00-0:10: Celebration

**Pull Classroom dashboard data:**
- X students accepted
- Y PRs merged
- Z students on Challenge 2+

**Say:**
> "Okay everyone, look at what you did today:
> - [X] of you joined the workshop
> - [Y] pull requests were merged
> - [Z] of you are already on Challenge 2
>
> That is incredible. You learned GitHub in one day. Give yourselves a hand."

### 0:10-0:20: Reflection Prompt

In chat or on call:
> "Tell us in chat: What was one thing you learned about GitHub today? Or something that surprised you?"

Read responses out loud and affirm them:
- "GitHub is [response]" ✓
- "Peer review is [response]" ✓  
- "I struggled with [thing] but figured it out" ✓✓✓ **BIG CELEBRATION**

### 0:20-0:30: Troubleshoot Stragglers

> "Anyone still stuck on Challenge 1 and want help?"

Help them:
- Offer to review their PR if Aria bot isn't responding
- Give them a nudge in right direction
- Or schedule 1:1 after call

### 0:30-0:35: Preview Day 2

> "Tomorrow we go deeper. Same process, harder challenges. You've got the skills now.
>
> Here's what to expect:
> - Code review deep dive
> - Challenges 10-16 (progressively harder)
> - More peer collaboration
> - By the end, you'll have real skills
>
> See you tomorrow at [time]!"

### 0:35-0:45: Accessibility Check-In

> "Before you go: Did your screen reader work well the whole time? Any accessibility issues we should fix before tomorrow?"

Listen and note anything that broke. Fix it that night if possible.

### 0:45-1:00: Optional Office Hours

> "We're staying on the call for office hours. If you want to:
> - Finish your first PR
> - Start Challenge 2
> - Ask follow-up questions
>
> Stay online and we'll help!"

Monitor chat and help individuals.

---

## Managing the Working Session Like a Pro

### Energy Management

**Every 60 minutes:**
- Announce: "Quick break everyone. Stand up, stretch, grab water. We'll resume in 5."
- Facilitators: Actually take a break too
- Mental check: Are you OK? Hydrated? Focused?

**Every 120 minutes:**
- Celebrate progress: "Look at the dashboard! So many merges today!"
- Remind students: "This is normal pace. Everyone's doing great."
- Check co-facilitator: "How are you doing? Need to switch tasks?"

### Dashboard Fatigue Prevention

**Don't:**
- Stare at dashboard constantly (you'll miss chat questions)
- Check every 1 minute (data doesn't change that fast)
- Panic if someone is quiet (they might be concentrating)

**Do:**
- Refresh every 5-10 minutes
- Trust that bots are working
- Pay attention to chat too (it's often where real help requests go)

### When Students Help Students

**This is great.** When you notice:
- "I see @student1 helping @student2 with merge conflicts!"

**Publicly celebrate it:**
> "@student1 — thank you for helping. That's exactly what real developer teams do."

This reinforces the collaborative culture and takes pressure off you.

---

## Day 2 Operations (Similar Structure)

### Key Differences from Day 1

| Day 1 | Day 2 |
|-------|-------|
| Intro focus | Skill-building focus |
| 1 assignment | New (2nd) assignment |
| Challenges 1-9 | Challenges 10-16+ |
| Basic workflow | Complex scenarios (merge conflicts, CLI, etc.) |
| Lots of encouragement | Challenge + celebrate |

### Day 2 Hour 1: Recap Opening

Pull Classroom dashboard (Day 1 assignment):
> "Yesterday, X of you joined and Y PRs were merged. Z of you kept working async.
>
> You all know:
> - How to navigate GitHub
> - How to edit and create a PR
> - How to request a review and merge
>
> That's real skills. Today we go deeper."

Then: Share Day 2 assignment invite link

### Day 2 Code Review Demo

This is YOUR demo, not the bot's:

1. **Open a student's Day 1 PR** (with permission or use your test repo)
2. **Narrate the review process:**
   - "Here's what I do when reviewing someone's code..."
   - "I read the description first..."
   - "Then I click 'Files changed'..."
   - "I think about: Is this right? Does it follow the rules? Is it clear?"
   - "I leave kind, specific feedback..."
   - "I either approve or ask for changes..."
3. **Have students practice** in pairs reviewing each other's Day 1 PRs

### Day 2 Dashboard Monitoring

Same as Day 1, but looking for:
- Students on Challenge 10+ (new territory)
- Autograding failures (these get harder)
- Merge conflicts (look for red flags in PR comments)
- Students helping with complex problems

---

## Post-Workshop Operations

### Immediately After (Last 15 min of Day 2)

- [ ] Screenshot Classroom dashboard showing final stats
- [ ] Note any broken automations or issues
- [ ] Thank your co-facilitator
- [ ] Send students a closing message

### That Night (Day 3)

- [ ] Export Classroom data (total PRs, students, completion rates)
- [ ] Identify students still in progress (email: "Need any help finishing?")
- [ ] Document what worked and what broke
- [ ] Send thank you emails to co-facilitators and volunteers

### Following Week

- [ ] Send personalized email to each student
- [ ] Invite them to alumni community
- [ ] Offer 1:1 mentorship if interested
- [ ] Update this guide with lessons learned

---

## Emergency Procedures Reference

### If Aria Bot Stops

1. Check GitHub status
2. Manually review PRs (use Aria's format)
3. Post in chat: "Brief delay with feedback bot, manually reviewing"

### If Student Repo Won't Create

1. Check Classroom assignment published
2. Manually create repo in org using template
3. Share direct link with student

### If Your Voice Fails

1. Use chat for all instructions
2. Have co-facilitator do vocal work
3. Use pre-recorded video if available
4. Type in chat for important messages

### If You Lose the Call

1. Post in chat: "Video call dropped, reconnecting..."
2. Send email to all: "Continuing asynchronously"
3. Facilitate through chat/email until reconnected

---

## Facilitator Self-Care

**During the workshop:**
- Drink water
- Stretch every 60 minutes
- Answer questions but don't obsess
- If co-facilitator is struggling, offer to swap tasks
- Remember: You can't help everyone at once

**After the workshop:**
- Take a break (don't immediately plan next cohort)
- Celebrate what went well
- Document issues objectively (not as failures)
- Get feedback from co-facilitator

**Before next cohort:**
- Update this guide based on lessons learned
- Test automation fresh
- Add your own notes and strategies
- Build on what worked

---

**Last Updated:** May 2026 | **Version:** 1.0 | **Maintainer:** Jeff Bishop

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Real-Time Workshop Management Procedures:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Pre-Workshop Setup (3 Hours Before):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Starting Day 1 (15 Minutes Before Call Starts):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **During Hour 1: Welcome and Orientation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **During Hour 2: Demo PR Workflow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **During Hours 3-6: Working Session Management:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **During Hour 7: Q&A and Wrap-Up:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Managing the Working Session Like a Pro:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Day 2 Operations (Similar Structure):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Post-Workshop Operations:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Emergency Procedures Reference:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Facilitator Self-Care:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
