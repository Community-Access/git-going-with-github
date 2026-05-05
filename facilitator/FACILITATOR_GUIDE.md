# Facilitator Guide and Workshop Timeline

## Facilitator Team

- **Jeff Bishop** -- lead facilitator, maintainer of [Accessibility Agents](https://github.com/community-access/accessibility-agents)
- **Michael Babcock** -- co-facilitator

Both facilitators run all sessions together. "The facilitator" or "your facilitator" in this guide refers to whichever of the two is leading a given moment; either can step in for the other on any task in this guide.

## Overview

This is a **two-day workshop** designed for blind and low-vision students learning GitHub through hands-on collaboration. Each day runs approximately 8 hours with structured sessions and flexible working time.

**Format:** Hybrid (streaming + individual GitHub Classroom repos)
**Main Goal:** Get every student to merge their first pull request

> **Deployment note:** For setup instructions, see [classroom/README.md](../classroom/README.md).
> Each student receives their own private repository through GitHub Classroom.
> The Aria bot and student-progression workflow handle challenge delivery and feedback automatically.

## Before the Workshop (Day Before)

### Facilitator Checklist

- [ ] Verify GitHub Classroom roster is complete (all students accepted invite links)
- [ ] Confirm both assignments are published and invite links work
- [ ] Test Aria bot validation by submitting a practice PR in a test repo
- [ ] Verify student-progression workflow triggers correctly (close Challenge 1, see Challenge 2 appear)
- [ ] Share meeting link and reminder email with:
  - Video call link + audio-only option
  - Pre-workshop setup reminder (see [docs/00-pre-workshop-setup.md](../docs/00-pre-workshop-setup.md))
  - FAQ: "What if I get stuck?"
  - Office hours/emergency contact info

### Verify Infrastructure

Use the **GitHub Classroom dashboard** to confirm:

1. All students have accepted their assignment invite links
2. Each student's private repo was created successfully
3. Challenge 1 issue exists in each student repo (auto-created on acceptance)

Test the automation by opening a PR in one student repo and confirming:

- Aria bot comments with feedback within 30 seconds
- Closing Challenge 1 issue triggers Challenge 2 to appear

## Day 1: GitHub Orientation and First Pull Request

### Hour 1: Welcome and GitHub Orientation (60 min)

**Facilitator Role:**

- Create welcoming opening acknowledging everyone's accessibility needs
- Explain why GitHub matters for blind/low-vision inclusion
- Demonstrate: "I'm going to open the repo right now and you'll follow along"
- Q&A in chat -- answer every question

**What Students Do:**

- Join the video call with screen reader
- Open GitHub in their browser
- Navigate to their private repo (created by GitHub Classroom)
- Confirm they can see their first challenge issue

**Resources to Have Ready:**

- Screen reader cheatsheet (Appendix B)
- Common GitHub.com keyboard shortcuts
- Chat moderator who watches for questions

**Success Metric:** All students report "I found my issue"

### Hour 2: Demo -- Your First PR (30 min)

**You (facilitator) will:**

1. Show a completed example on screen with narration
2. Walk through EVERY step:
   - "First, I click the edit pencil"
   - "I see the markdown editor open"
   - "I make my change here"
   - "I scroll down and create a new branch"
   - "Now I click 'Propose changes' button"
   - "GitHub shows me the PR preview -- notice the Aria bot already right here checking my work"
   - "I fill in the PR template fields"
   - "I click 'Create Pull Request'"
   - "Aria comments within 30 seconds with feedback"
   - "I address the feedback and push an update commit"
   - "I request review by typing @peer_username"
   - "My peer reviews and I get approval"
   - "I click merge button"
   - "Done! My PR is merged!"

**This is the workflow EVERY student will repeat.** Make it crystal clear.

**Success Metric:** Students report "I see how this works" in chat

### Hours 2-6: Working Session (approx. 4.5 hours)

**Students work independently on challenges in their own repos.**

This is THE MAIN ENGAGEMENT. They're making their first real contribution. When a student closes a challenge issue, the student-progression workflow automatically opens the next one.

**Facilitator Role:**

- Monitor the GitHub Classroom dashboard for student progress
- Check individual student repos for PR comments and questions
- Respond quickly to blockers
- Celebrate each merged PR in chat

**Expected Cadence:**

- **First hour** -- Students opening issues, starting edits (expect early PRs from fast movers)
- **Second hour** -- Aria bot feedback flowing, students making fixes
- **Third hour** -- Reviews happening, merges happening, progression bot unlocking new challenges
- **Fourth hour** -- Stragglers finishing, peer reviews catching up

**Facilitator Interventions:**

If a student hasn't opened a PR after the first hour:

- Message them: "Hey @student! Need help getting started? Check your Issues tab for your current challenge."
- Keep it low-pressure -- some students will take longer

If Aria gives critical feedback:

- Explain what the bot meant in plain language
- Show the fix clearly
- Make sure the student isn't discouraged

If a peer review isn't happening:

- Offer to do a facilitator review instead
- Or ask another student: "Can you review this PR?"
- Priority is getting to merge, not strict peer review

**Celebrate Merges:**
Post in the chat or discussion when a student merges their first PR. Public recognition matters.

### Hour 7: Q&A and Reflection (30 min)

**Prompt for Discussion:**

> "Tell us in chat: What was one thing you learned today about GitHub?"

**Be ready to:**

- Answer "I got an error..." questions
- Help troubleshoot remaining issues
- Give credit to peer reviewers
- Mark students who didn't finish but are close as "follow-up needed"

**Send them home with:**

- Tomorrow's agenda
- Sneak peek at what's next (VS Code, local Git, advanced challenges)
- Encouragement!

### Hour 8: Office Hours (Optional)

- Available for 1:1 troubleshooting
- Help students finish PRs
- Answer "How do I...?" questions about GitHub
- Document common questions for tomorrow's content

## Day 2: Deeper Skills and Celebration

### Hour 1: Recap and Wins (30 min)

**Facilitator:**

- Show stats from the GitHub Classroom dashboard: "X students, Y PRs merged on Day 1"
- Acknowledge students who got stuck but persisted
- Introduce the Day 2 assignment (students accept the second invite link)

> Students accept the Day 2 assignment invite link now.
> The student-progression workflow begins delivering Challenge 10 onwards.

### Hour 2: Deep Dive -- Code Review (60 min)

**Teach:**

- How to review someone else's PR
- What good feedback looks like
- How to incorporate feedback gracefully
- Real-world code review practices

**Paired Activity:**

- Have students review each other's Day 1 PRs
- Start with example feedback you provide
- Let them practice the async review process

### Hours 3-7: Skill-Building Challenges (approx. 4.5 hours)

**Students work through progressively harder challenges delivered by the progression bot:**

| Track | Challenges | Topics |
|-------|-----------|--------|
| Core Day 2 | 10-13 | VS Code, Git basics, local commits, code review |
| Advanced | 14-16 | Issue templates, fork-and-contribute, capstone agent |
| Bonus | bonus-a through bonus-e | Advanced search, branch protection, GitHub CLI, cloud editors |

Challenges unlock automatically as students close issues. Faster students will reach bonus challenges; slower students may still be working through core content. Both paces are valid.

**Aria Bot Enhances:**

- Accessibility feedback becomes more detailed on later challenges
- Highlights larger patterns ("You capitalized but others use lowercase")
- Suggests improvements, not just fixes

**Facilitator Role:**

- Use the Classroom dashboard to track who's advancing through challenges
- Give encouragement to students on later challenges
- Help students with merge conflict resolution (Challenge 7 / autograder)
- Keep the energy positive

### Hour 7: Final Q&A and Celebration (60 min)

**Metrics to share (pull from Classroom dashboard):**

- Total students enrolled

- PRs merged (track real number)
- Students who completed multiple challenges
- Students who completed the code review cycle
- Accessibility wins -- screen readers worked throughout

**Next Steps:**

- Point them to CONTRIBUTING.md in their favorite open source projects
- Share list of "good first issue" finding techniques
- Give them the resources appendices
- Offer alumni community channel

### Hour 8: Informal Hangout (60 min)

- Students hang out on the call
- Chat with peers and facilitators
- Ask follow-up questions
- Exchange GitHub usernames

## Facilitator Role Critical Points

### Communication Style

**DO:**

- Use simple language: "Click the pencil icon to edit"
- Narrate exactly what you're doing: "I'm clicking... now I'm typing..."
- Normalize mistakes: "Oops I forgot something - let me fix it"
- Celebrate effort not just success: "Nice work thinking through that!"
- Answer the same question multiple times patiently

**DON'T:**

- Use "obviously" or assume prior knowledge
- Assume everyone is on the same screen area
- Rush through demos
- Make anyone feel bad about getting stuck
- Focus on speed - focus on understanding

### Responding to Common Issues

| Student Says | Your Response |
|-------------|--------------|
| "I can't see my assignment issue" | Have them go to Issues tab, filter by Assignee > Me, or give direct link |
| "The bot is confusing me" | Ask what part confused them, then explain in plain language |
| "I don't know what [jargon] means" | Explain, then add it to glossary so next student finds it |
| "I accidentally merged the wrong thing" | No big deal - revert commit, explain it, move on |
| "My screen reader stops at the file picker" | Have them use keyboard: Tab to button, Space to open, Type filename |
| "I'm done - what's next?" | Option 1: Do another challenge. Option 2: Review someone's PR. Option 3: Help a peer. |

### End of Workshop Facilitator Duties

1. **Export metrics** - Use progress tracker to generate final report
2. **Write thank you email** - Personal note to each student (use template)
3. **Create alumni channel** - Slack/Discord for ongoing support
4. **Document what worked** - Feedback for next workshop
5. **Tag students in commit credit** - Add to CONTRIBUTORS file

## Emergency Protocols

### Bot stops responding to PRs

- Check GitHub Actions status page
- Manually review PRs and comment with feedback format bot would use
- Post in Discussions: "Facing technical issue, we'll handle this manually"

### Student GitHub account locked

- Have them reset password via GitHub
- Or create temporary escalation issue for them to move forward

### Video call connectivity issues

- Have phone dial-in number as backup
- Offer to continue in Discussions if needed
- Record session for students who lose connection

### Workshop needs to end early

- Stop at natural break point
- Students can continue async after
- No one forced offline mid-PR
