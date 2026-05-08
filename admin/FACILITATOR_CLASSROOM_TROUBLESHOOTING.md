# GitHub Classroom Troubleshooting Guide
## For Facilitators Managing Student Workflows

This document covers common issues that arise during GitHub Classroom workshops and how to resolve them quickly. Use this alongside [FACILITATOR_GUIDE.md](FACILITATOR_GUIDE.md) for general facilitation.

---

## 🚨 Emergency: What to Do When Everything Stops Working

### Bots Stopped Responding

**Symptom:** Students are creating PRs but Aria bot isn't commenting within 30 seconds.

**Diagnostics:**
1. Check [GitHub Status](https://www.githubstatus.com) — is GitHub Actions down?
2. Check your test repo — try creating a PR yourself. Does Aria respond?
3. Check the workflow logs in the template repository:
   - Go to your template repo → Actions tab
   - Look for recent Aria workflow runs
   - Do they show errors or successful completions?

**Solutions:**

| Issue | Fix |
|-------|---|
| **GitHub Actions is down** | Post in chat: "We're experiencing a brief delay with our automated feedback. You can still work on challenges — we'll review PRs manually." Then skip to "Manual PR Review" below. |
| **Aria workflow is disabled** | Go to template repo → Actions → Enable Aria workflow → Re-run failed runs |
| **Aria workflow has an error** | Check the error log. If it's a configuration issue, fix the workflow file and re-run. |
| **Aria is working but slow** | Wait a bit longer (sometimes takes 60 seconds). Refresh PR page. If still nothing, manually review. |

**Temporary Workaround — Manual PR Review:**

If the bot is down and you need to review PRs:

1. Go to student's PR
2. Comment with this template (copy Aria's format):
   ```markdown
   Checking your work...
   
   ✓ [thing that's good]
   ✓ [thing that's good]
   
   Consider: [suggestion]
   Consider: [suggestion]
   
   Nice work! [personalized comment]
   ```
3. Students continue as normal (they don't know the difference)
4. When bot comes back, future PRs will get automatic feedback

### Student Progression Bot Failed

**Symptom:** Student merged a PR, but the next challenge didn't appear. They're stuck waiting for Challenge 2.

**Diagnostics:**
1. Go to student's repo → Issues tab
2. Check if the old challenge is closed
3. Check if the new challenge exists (might be closed too)

**Solutions:**

| Symptom | Fix |
|---------|---|
| **Old challenge is open, new challenge doesn't exist** | Progression bot failed. Manually create the next challenge: Copy the old challenge issue, change the number, and assign to student. |
| **Both challenges exist but student can't see new one** | Refresh their browser or have them sign out/in. |
| **Old challenge never closed** | Manually close it (if student merged PR but it didn't auto-close). Then manually create the next challenge. |

### Video Call Is Down

**Symptom:** Zoom/Teams/Google Meet is disconnected. Students are isolated.

**What to Do:**
1. **Don't panic** — GitHub Classroom work doesn't stop without the call
2. **Create backup**: Send message to any chat channel (email, GitHub Discussions):
   > "Video call dropped temporarily. You can keep working on your challenges — we're working on reconnecting. Use [Discussions/email/Slack] if you need help in the meantime."
3. **Reconnect** — Get the call back up within 5 minutes if possible
4. **Continue async** — If can't reconnect, facilitate async through chat/email until next day

### Co-Facilitator Is Unavailable

**Symptom:** You're alone and need to:
- Monitor dashboard
- Answer chat questions
- Do a demo
- Review PRs
- Manage 20+ students

**Solutions:**

**Short-term (next 30 min):**
- Shift to async mode: "We're doing async today. Post questions in chat and I'll respond promptly."
- Use recorded demo if you have one
- Focus on responding to questions quickly rather than real-time facilitation

**Mid-term (next few hours):**
- Recruit a volunteer:
  - Advanced student
  - TA or peer
  - Anyone who can watch chat
  - Give them these 3 jobs: (1) watch chat for "stuck" messages, (2) ping facilitator with blocking questions, (3) celebrate wins
- Put facilitator on mute except for key moments

**Long-term:**
- Consider pausing until co-facilitator returns
- Or shift to fully asynchronous (post challenges, respond to questions async)

---

## 👤 Student-Level Issues

### "I Can't Find My Repo"

**Student is logged in, accepted the assignment, but can't find their repo.**

**First, clarify:** "Can you get to github.com? What do you see?"

**Solution Flowchart:**

```
Q: Are you logged in?
├─ No → Have them log in
└─ Yes → Q: Do you see an organization name in your top-left?
   ├─ No → They accepted but repo creation stalled
   │   └─ Solution: Go to classroom.github.com, refresh the assignment
   │      If still nothing, manually create repo in organization:
   │      - Go to org
   │      - Click "New repository"
   │      - Name it: learning-room-[username]
   │      - Use template
   │      - Done
   └─ Yes → Q: When you click your profile (top-right), 
              do you see "Your repositories"?
      ├─ No → Permissions issue
      │   └─ Solution: Go to github.com/settings/repositories
      │      Filter by organization
      │      Find your repo in the list
      └─ Yes → They have repos but can't navigate
          └─ Solution: Direct link: 
             github.com/community-access-classroom/learning-room-[username]
             Share this link directly
```

### "The Issue Isn't In My Repo"

**Student accepted assignment, but Challenge 1 issue doesn't exist.**

**Causes:**
- Template repo doesn't have Challenge 1 issue
- Issue exists but in wrong place
- Student accepted but issue creation failed

**Fix:**
1. Check template repo → Issues → Does Challenge 1 exist?
   - If no: Create it in template, then re-create in student repo
   - If yes: Go to step 2
2. Go to student repo → Issues → Is Challenge 1 there?
   - If no: Manually create it by copying from template
   - If yes: Problem solved (they might not be looking in the right place)

**Manual Creation:**
1. Student repo → Issues tab
2. Click "New issue"
3. Copy the Challenge 1 content from the template issue
4. Create it
5. Tell student: "Refresh your Issues page"

### "I Don't Know What the Challenge Is Asking"

**Student is confused about the task.**

**First:** Read the challenge text back to them aloud.

**Then:** Break it down:
- What is it asking me to change? [Tell them]
- Where is that in my repo? [Show them]
- How will I know when I'm done? [Tell them the success criterion]

**Next:** Give them the first tiny step:
> "Start by [one specific action]. Do that, then come back and tell me what you see."

**Don't:** 
- Do it for them
- Overwhelm with the whole solution
- Use jargon without explaining

### "The Bot's Feedback Doesn't Make Sense"

**Student is confused by Aria bot comment.**

**What the bot might say:**
```
Consider: PR title should follow the pattern "Challenge X: [description]"
```

**What you say:**
> "Aria is asking you to change your PR title. Right now it says '[current title]'. 
> Change it to 'Challenge 1: [something describing the change]'. 
> Go back to your PR, click 'Edit' on the title, make the change, save."

**Practice Translation:**
- Bot: "Markdown formatting issue" → You: "Your description has an extra space somewhere. Check for weird spacing."
- Bot: "File path incorrect" → You: "You edited the wrong file. Edit [correct filename] instead."
- Bot: "Branch naming convention" → You: "Your branch name should be [format], not [what they did]."

### "I Merged But Challenge 2 Didn't Appear"

**Student merged PR. Old issue closed. New issue missing.**

**Causes:**
1. Progression bot is running late (just wait)
2. Progression bot failed
3. Student is looking in wrong place

**Fix:**
1. Ask: "Refresh your Issues page. Do you see Challenge 2 now?"
   - If yes: Problem solved
   - If no: Go to step 2
2. Manually create Challenge 2:
   - Go to student repo → Issues
   - Click "New issue"
   - Copy Challenge 2 from template
   - Create it
   - Tell student: "Refresh and you should see it now"

### "I Keep Getting an Error on PR Submit"

**Student is trying to create PR but gets an error.**

**Common errors:**

| Error Message | Fix |
|---------------|---|
| "Nothing to commit" | They didn't make any changes. Have them edit the file first. |
| "Merge conflict" | This is actually a good learning moment. See "Merge Conflict" section below. |
| "Can't create branch" | Check branch naming. May need to delete failed branch and try again. |
| "Access denied" | Check repo permissions. Should be able to write to their own repo. |
| "File not found" | They're trying to edit wrong file. Help them find correct one. |

**General troubleshooting:**
1. Have them refresh the repo
2. Have them close/reopen the file they're editing
3. Have them try a simpler edit (just one word) first
4. If still broken, escalate to facilitator manual review

### "I'm Done — What's Next?"

**Student finished a challenge and wants to continue.**

**Options:**

1. **Start the next challenge automatically:**
   > "Close this challenge issue (click 'Close issue' at the bottom) and the bot will create the next challenge for you."

2. **Help a peer:**
   > "Great work! Could you review [peer's] PR? That's how real developers learn."

3. **Explore bonus challenges:**
   > "You can also try some bonus challenges if you want to go deeper."

4. **Take a break:**
   > "You've done great work. Take a break and come back when you're ready for the next one."

---

## 🔄 Specific Technical Scenarios

### Merge Conflict

**What it is:** Two people edited the same file in incompatible ways. Git doesn't know which version to use.

**When it happens:** Usually Challenge 7 or later in the workshop.

**Student sees:**
```
This branch has conflicts that must be resolved
```

**Your response:**
1. Don't panic — this is intentional (a learning challenge)
2. **Don't try to fix it over chat** — merge conflict resolution is hands-on
3. Do one of these:
   - **Pair the student with someone who's done merge conflicts** → They learn from peer
   - **Offer 1:1 help** → This is worth 20 minutes of your time (real skill)
   - **Have them post in Discussions** → Someone can walk them through async

**Teaching the fix:**
1. Go to the PR → click "Resolve conflicts"
2. GitHub shows the conflicting lines
3. The student picks which version is correct (or combines both)
4. Student marks conflict as resolved
5. Student completes merge
6. Done

**Key point:** This is not a failure — this is GitHub's hardest challenge because conflicts ARE hard in real code.

### Autograder Failed

**What it is:** Challenge X has an automated test. Student's submission failed the test.

**Student sees:**
```
Autograding failed (X failed)
```

**Your steps:**

1. Go to student repo → Actions tab
2. Find the failed autograding run
3. Click it → look at the test output
4. Understand what failed
5. Explain to student in plain language:
   > "The test was checking for [thing]. You have [what they did]. Try [fix]."

**Common test failures:**

| Test | Usual Reason for Failure |
|------|---|
| File exists | File named wrong or in wrong folder |
| Content contains X | Text wasn't added; student edited wrong file |
| Markdown formatting | Extra spaces or wrong heading level |
| Git history | Wrong number of commits or wrong branch |

**Next step:** Have student fix the issue and push a new commit. Autograder re-runs automatically.

### Accidental Merge

**What happened:** Two students somehow merged the same file / repo / change.

**Student panics:** "I messed up!"

**Your response:**
> "This happens in real GitHub all the time. We just undo it."

**How to undo:**
1. Go to the merged PR
2. Look for "Revert this pull request" button
3. Click it
4. GitHub creates a new PR that reverses the change
5. Merge that PR
6. Done

**Teaching moment:** Use this to explain why code review matters — this is why you have peers check your work.

### Student Lost Their Work

**Student says:** "I was working on something and it's gone now."

**Possible causes:**
1. They edited in GitHub web editor (not saved)
2. They refreshed before saving
3. They closed browser
4. They're looking in wrong repo/branch

**Your investigation:**
1. "What were you trying to change?" → You explain it
2. "Let's look at your repo" → You check it together
3. "Do you see a [branch/PR/draft]?" → Navigate together

**If truly lost:**
1. "It's okay, let's start fresh"
2. Help them re-do the work
3. This time, save properly by creating PR (not just editing)

**Prevention:** Teach students: "Always create a PR before you finish. That saves your work."

---

## 🌐 GitHub Platform Issues (Not Your Fault)

### GitHub.com Is Down

**How to know:** You get an error like "502 Bad Gateway" when accessing any GitHub page.

**What to do:**
1. Check [GitHub Status](https://www.githubstatus.com)
2. Post in chat: "GitHub.com is temporarily down. We're waiting for it to come back up. Keep your changes safe (don't refresh)."
3. Wait for GitHub to recover
4. Resume workshop

**In the meantime:** Students can:
- Read challenge instructions offline
- Plan their approach
- Discuss with peers

### GitHub Actions is Slow/Down

**Symptom:** PRs are created but Aria bot takes 5+ minutes to respond.

**What's happening:** GitHub's infrastructure is overloaded.

**What to do:**
- Let students know: "Feedback bot is running a bit slow today. Don't refresh — it'll show up in a few minutes."
- Continue working while waiting
- If it doesn't show up, manually review (as described earlier)

### Organization Is Having Permission Issues

**Symptom:** Students can't create repos or write to repos.

**Likely cause:** Organization settings changed accidentally.

**Fix:**
1. Go to Organization Settings
2. Check "Member privileges"
3. Make sure members can create public/private repos
4. Check "Repository creation" is enabled

---

## 📊 Dashboard & Monitoring Issues

### Dashboard Shows Wrong Data

**Symptom:** Classroom dashboard shows "0 PRs merged" but you know students merged things.

**Cause:** Dashboard is cached or lagging behind.

**Fix:**
1. Refresh the page
2. Wait a few minutes (GitHub's dashboard updates asynchronously)
3. Try incognito/private browser (clears cache)

### Can't Access Classroom Dashboard

**Causes:**
1. Not logged in
2. Organization didn't set up Classroom
3. Permissions issue

**Fix:**
1. Go to https://classroom.github.com
2. Click "Sign in"
3. Select your organization
4. If not listed, go to organization settings and link GitHub Classroom

### Missing Students in Dashboard

**Symptom:** You know 30 people accepted the assignment, but dashboard shows only 25.

**Cause:** Dashboard is lagging or those people haven't been processed yet.

**Fix:**
1. Refresh
2. Wait 5 minutes
3. Check directly: Go to org → Repositories → Look for new repos manually

---

## 🛠️ Facilitator Mistakes & Recovery

### You Accidentally Closed the Wrong Challenge

**You:** Closed Challenge 2 in a student's repo by mistake.

**Recovery:**
1. Go to the repo
2. Find the closed challenge in the Issues tab (closed filter)
3. Re-open it
4. Apologize to the student: "My mistake — I reopened it. You're good to go."

### You Created Duplicate Challenges

**Symptom:** Student sees Challenge 2 twice.

**Cause:** Manual creation while bot was also creating it.

**Fix:**
1. Go to student repo
2. Close/delete the duplicate
3. Tell student: "Cleaned that up. You should see one Challenge 2 now."

### You Merged Something You Shouldn't Have

**You:** Accepted and merged a PR meant for a student to merge.

**Recovery:**
1. Revert the PR (see "Accidental Merge" section)
2. Apologize: "I shouldn't have done that — I reverted it. Your merge is what counts."
3. Have student re-merge it (they'll get the learning)

---

## 🎯 Prevention Strategies

### Before Workshop Even Starts

- [ ] Test everything with your co-facilitator
- [ ] Try breaking things intentionally to know how to fix them
- [ ] Document the fixes in your notes
- [ ] Create a shared "if this then that" troubleshooting doc with your co-facilitator

### During Workshop

- [ ] Monitor dashboard constantly (not just when someone asks for help)
- [ ] Catch small issues before they become big ones
- [ ] Celebrate successful workflows ("You're doing this perfectly!")
- [ ] Keep a running log of issues that came up so you can add to this guide next time

### Post-Workshop

- [ ] What issues came up? Add them to this guide.
- [ ] What took longer than expected? Update timelines.
- [ ] What automation failed? Document the fix.
- [ ] What did facilitators do well? Keep doing it.

---

## 📞 When to Escalate

**Escalate to:** GitHub Support, your organization admins, or external help when:

- [ ] GitHub itself is broken (Actions down, authentication issues, data loss)
- [ ] Something is broken in the template repository (not a student issue)
- [ ] You don't know how to fix it and neither does your co-facilitator
- [ ] A student's entire repo is corrupted
- [ ] Security issue (someone got access they shouldn't have)

**Don't escalate for:** Issues described in this guide. You can handle them.

---

## 💪 You've Got This

Most issues in this guide have happened to facilitators before. You're not the first and won't be the last.

Key principles:
1. **Stay calm** — The students are watching. If you're calm, they're calm.
2. **Explain out loud** — "Here's what I think is happening... let's check..."
3. **Don't pretend to know** — "I'm not sure. Let's figure this out together."
4. **Celebrate the fix** — "And we solved it! That's what debugging is."
5. **Learn for next time** — Note it so you're faster next time

Every issue you solve is a story you'll tell at the next workshop.

---

**Last Updated:** May 2026 | **Version:** 1.0 | **Maintainer:** Jeff Bishop
