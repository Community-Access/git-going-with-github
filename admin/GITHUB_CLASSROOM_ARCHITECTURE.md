# GitHub Classroom Integration: Architecture & Magic

This document explains the complete automation architecture for GitHub Classroom integration and what makes it "magical" for students and facilitators.

## The Magic: What Happens Automatically

### When a Student Submits an Enrollment

1. **Instant Validation** — Form fields checked for completeness in < 1 second
2. **Duplicate Detection** — System checks if student already enrolled, prevents duplicates
3. **Private Storage** — Full enrollment data (email, goals, proficiency levels) stored in secure private repo automatically
4. **Public Redaction** — Student's PII removed from public issue, replaced with clean summary
5. **Proficiency Tagging** — Automatic labels added based on GitHub/VS Code experience for facilitator triage
6. **Org Invitation** — Automatic invite sent to classroom organization
7. **Assignment Links Posted** — Day 1 & Day 2 assignment URLs posted to student
8. **Enrollment Closed** — Issue marked complete, no clutter for students

**Total time**: ~5 seconds, fully automated, zero facilitator intervention needed

### What Students See

They get a friendly, actionable welcome comment with:
- ✓ Confirmation their enrollment was accepted
- ✓ Organization invitation status
- ✓ Direct links to Day 1 assignment
- ✓ Link to Day 2 assignment (after Day 1)
- ✓ Support link if they get stuck

And then the issue closes — no notifications, clean, professional.

### What Facilitators See

**Public view** (no PII): Issues with proficiency labels for triage
- Filter by `label:proficiency-beginner` to find students who need extra support
- Filter by `label:proficiency-advanced` to identify peer mentors

**Private admin repo**: Full student data when needed
- Names, emails, stated goals, and proficiency levels
- Private issue link connects to public record
- Filterable by `label:intake` or `label:classroom-enrollment`
- Easy CSV export if needed for external tools

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Student Enrollment Experience                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Student fills form (Public GitHub Issue)                │
│     └─→ .github/ISSUE_TEMPLATE/classroom-enrollment.yml    │
│                                                               │
│  2. Workflow triggers (on: issues → opened)                 │
│     └─→ .github/workflows/registration.yml                  │
│         [classroom-enrollment job]                           │
│                                                               │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 1: Duplicate Check                     │            │
│  │ Query: GitHub username in prior enrollments │            │
│  │ Result: Skip if duplicate, error message    │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 2: Guardrail Check                     │            │
│  │ Verify: PRIVATE_STUDENT_DATA_REPO exists   │            │
│  │ Verify: PRIVATE_STUDENT_DATA_TOKEN valid    │            │
│  │ If missing: Error + admin alert             │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 3: Parse & Validate                    │            │
│  │ Extract: Full Name, Email, GitHub Handle    │            │
│  │ Validate: Required fields present           │            │
│  │ If invalid: Request user fix + retry        │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 4: Private Storage [PARALLEL]          │            │
│  │ Store: Full intake in admin repo            │            │
│  │ Label: "intake", "classroom-enrollment"     │            │
│  │ Resilience: Handles missing labels          │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 5: Public Redaction [PARALLEL]         │            │
│  │ Replace: Issue body with clean summary     │            │
│  │ Remove: All PII (name, email, goals)        │            │
│  │ Keep: Status, submitted-by, timestamp       │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 6: Proficiency Labeling                │            │
│  │ Extract: GitHub experience level            │            │
│  │ Extract: VS Code experience level           │            │
│  │ Label: proficiency-{beginner,intermediate,  │            │
│  │         advanced,unassessed}                │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 7: Org Invitation (if configured)      │            │
│  │ Check: User already member? Skip            │            │
│  │ Check: Pending invite exists? Skip          │            │
│  │ Action: Send invite to CLASSROOM_ORG       │            │
│  │ Token: CLASSROOM_ORG_ADMIN_TOKEN (optional) │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 8: Post Success Comment                │            │
│  │ Display: Org invite status                  │            │
│  │ Link: Day 1 assignment (if configured)      │            │
│  │ Link: Day 2 assignment (if configured)      │            │
│  │ Link: Support hub                           │            │
│  └─────────────────────────────────────────────┘            │
│                 ↓                                             │
│  ┌─────────────────────────────────────────────┐            │
│  │ Step 9: Add Labels & Close                  │            │
│  │ Label: "enrolled"                           │            │
│  │ State: Closed with "completed" reason       │            │
│  │ Result: Clean, no follow-up needed         │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
│  3. Student receives:                                        │
│     • Org invitation in GitHub notifications                │
│     • Welcome comment with next steps                       │
│     • Direct link to Day 1 assignment                       │
│                                                               │
│  4. Facilitator sees:                                        │
│     • Public issue (no PII) with proficiency label          │
│     • Private intake record with full details               │
│     • Enrollment summary in dashboards (if enabled)         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow & Privacy

### Public Path (No PII)
```
Student Issue (redacted)
  └─→ Proficiency labels → Facilitator triage
  └─→ Closed, marked "enrolled"
  └─→ Used for: Counting, labeling, matching with private records
```

### Private Path (Full PII)
```
Enrollment Data (full)
  └─→ Private Admin Repo issue
  └─→ Secured by: GitHub org settings + private repo access list
  └─→ Used by: Facilitators for contact, accommodations, team assignments
```

### Cross-Link
```
Public issue ↔ Private issue (link in private issue body)
  └─→ Facilitators can click from admin repo to public record
  └─→ Students never see private repo
  └─→ Clean separation of concerns
```

## The "Magical" Features Explained

### 1. Automatic Proficiency Profiling

**What**: System reads "GitHub Experience" and "VS Code Experience" fields, converts them to proficiency labels.

**Magic**: Facilitators can instantly create teams by skill level.
- Filter: `label:proficiency-advanced`
- Select: Potential peer mentors
- Create: `mentors` team → assign to Day 2 pair programming

**Result**: No manual form reading, no spreadsheet copy-pasting, instant team assignment.

---

### 2. Zero-Intervention Org Invites

**What**: System automatically sends organization invitations using GitHub API.

**Magic**: Students accept invite from notification → immediately have classroom org access → can submit assignments without any facilitator interaction.

**Result**: Student friction reduced from "wait for facilitator email" to "accept GitHub notification" (~30 seconds).

---

### 3. Assignment Link Delivery

**What**: Day 1 and Day 2 assignment links posted directly to student's enrollment issue.

**Magic**: Student gets one place to find everything:
- Enrollment confirmation
- Org status
- Day 1 assignment link
- Support link

**Result**: No email, no Slack, no "where do I go?", just one clean comment with everything they need.

---

### 4. Private PII Storage with Public Redaction

**What**: Full enrollment data stored privately; public issue redacted automatically.

**Magic**: Facilitators can:
- See full names, emails, stated goals → useful for personalization
- Filter by stated goals → identify students with specific interests
- Track accessibility needs → accommodations noted in private record
- While public issue remains anonymous → student privacy protected

**Result**: GDPR-compliant, privacy-respecting, facilitator-friendly.

---

### 5. Proficiency-Driven Facilitator Triage

**What**: GitHub and VS Code experience levels converted to machine-readable labels.

**Magic**: Facilitators use GitHub's native label filtering:
```
Filter: label:proficiency-beginner
→ "Show me all students new to GitHub/VS Code"
→ Plan extra setup help, pair them with mentors, provide scaffolding
```

**Result**: Differentiated instruction without manual intake form reading.

---

### 6. Duplicate Prevention

**What**: System checks if GitHub username already has a prior enrollment.

**Magic**: Students can't accidentally submit twice:
- Prevents duplicate org invites
- Prevents duplicate data storage
- Prevents confusion about which enrollment is "real"

**Result**: Clean enrollment roster, no data cleanup needed.

---

## Configuration Overview

| Component | File | Purpose |
|-----------|------|---------|
| Form | `.github/ISSUE_TEMPLATE/classroom-enrollment.yml` | Beginner-friendly input (6 fields) |
| Workflow | `.github/workflows/registration.yml` | Orchestration (validation → storage → labeling → invites → welcome) |
| Private Repo | `Community-Access/git-going-with-github-administration` | Secure PII storage + facilitator dashboard |
| Variables | Repository settings | Classroom org, assignment links, export controls |
| Secrets | Repository settings | API tokens for org invites + private storage |
| Documentation | `admin/*.md` | Setup guides, checklists, troubleshooting |

## Optional Enhancements (Future)

These are "nice-to-haves" that could further increase magic:

1. **Assignment Submission Webhooks**
   - Monitor when students complete Day 1 assignment
   - Auto-tag in private intake: `completed:day-1`
   - Facilitators can filter: `label:completed:day-1 NOT label:completed:day-2` → identify Day 2 laggards

2. **Student Success Dashboard**
   - Real-time status: Enrolled → Accepted invite → Day 1 started → Day 1 submitted → Day 2 started → etc.
   - Color-coded risk: Red (lagging), Yellow (on-track), Green (completed)

3. **Auto-Generated Team Assignments**
   - Workflow creates a `TEAM_ASSIGNMENTS.md` in admin repo
   - Shows: Mentors → Assigned learners, experience mix notes

4. **Facilitator Bulk Actions**
   - "Award badges" to students who complete milestones
   - Automatically post to their enrollment issue: "🏆 Completed Day 1!"

5. **Integration with Learning Room**
   - Auto-create learning-room-specific issues for each cohort
   - Link cohort roster to learning room progress tracking

## Success Metrics

When GitHub Classroom integration is working well, you'll see:

✓ **100% enrollment processed** in < 5 seconds  
✓ **0% data exposure** (no PII in public)  
✓ **100% org invites delivered** (automated, no manual outreach)  
✓ **< 24 hour turnaround** from enrollment → classroom ready  
✓ **Facilitators report** proficiency labels useful for triage  
✓ **Students report** clear next steps, no confusion  

## Troubleshooting & Support

- **Setup issues?** → See [FINE_GRAINED_TOKEN_SETUP.md](./FINE_GRAINED_TOKEN_SETUP.md)
- **Configuration questions?** → See [ENROLLMENT_SETUP_CHECKLIST.md](./ENROLLMENT_SETUP_CHECKLIST.md)
- **Classroom integration?** → See [CLASSROOM_INTEGRATION_GUIDE.md](./CLASSROOM_INTEGRATION_GUIDE.md)
- **Facilitator how-tos?** → See [FACILITATOR_GUIDE.md](./FACILITATOR_GUIDE.md)

---

**Version**: 1.0  
**Last Updated**: 2026-05-12  
**Maintained by**: Community-Access facilitator team
