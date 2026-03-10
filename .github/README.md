# Learning Room Automation System

Complete automation infrastructure for the Learning Room workshop repository. Provides instant feedback, skill progression tracking, and automated peer pairing while preserving the educational value of human code review.

## System Overview

This automation system transforms the Learning Room into a GitHub Skills-quality learning experience with three core components:

### 1. PR Validation Bot
**File:** `.github/workflows/learning-room-pr-bot.yml`

Automatically validates pull requests and provides educational feedback:
- Welcomes first-time contributors with orientation
- Checks PR requirements (issue reference, description)
- Validates file locations (learning-room only)
- Comprehensive accessibility checking:
  - Heading hierarchy (no H1→H3 skips)
  - Link text quality (no "click here")
  - Image alt text (required and descriptive)
  - Broken links detection
  - [TODO] markers (must be completed)
- Posts structured feedback comment with fixes
- Auto-applies labels (documentation, accessibility, needs-work)
- Responds to keywords (@bot help, "merge conflict", "request review")
- Creates commit status checks

**Validation Script:** `.github/scripts/validate-pr.js`  
**Triggers:** PR opened/edited/synchronized, comments created

### 2. Skills Progression Engine
**File:** `.github/workflows/skills-progression.yml`

Tracks student progress through leveled learning paths:
- Monitors merged PRs and counts completions
- Awards skill-specific badges:
  - Markdown Master
  - Accessibility Advocate
  - Code Reviewer
  - Team Player
  - Documentation Writer
  - Content Creator
- Unlocks new challenges by level:
  - Beginner (0+ PRs): Basic fixes
  - Intermediate (1+ PRs): Accessibility fundamentals
  - Advanced (3+ PRs): Reviews and mentorship
  - Expert (5+ PRs): Content creation
- Celebrates milestones (1, 5, 10, 25, 50, 100 merged PRs)
- Posts progress updates with stats

**Configuration:** `.github/data/challenge-progression.json`  
**Triggers:** PR merged (closed via merge)

### 3. Student Pairing & Grouping
**File:** `.github/workflows/student-grouping.yml`

Automates peer review assignment and study group formation:
- Assigns peer reviewers when PRs open
- Balances review load (least_reviews strategy)
- Provides review guidance to both parties
- Creates study groups (manual workflow dispatch):
  - Random shuffle
  - Skill-balanced (mix levels)
  - Timezone-matched
- Posts group coordination issues

**Configuration:** `.github/data/student-roster.json`  
**Triggers:** PR opened/ready_for_review, manual dispatch


## File Structure

```
.github/
├── workflows/
│   ├── learning-room-pr-bot.yml      ← Main PR validation (4 jobs)
│   ├── skills-progression.yml         ← Progress tracking (3 jobs)
│   └── student-grouping.yml           ← Pairing & grouping (2 jobs)
├── scripts/
│   └── validate-pr.js                 ← Node.js validation logic
├── data/
│   ├── challenge-progression.json     ← Levels, badges, milestones
│   └── student-roster.json            ← Student information (update per cohort)
└── docs/
    └── IMPLEMENTATION_GUIDE.md        ← Setup instructions for facilitators

learning-room/
├── .github/
│   ├── STUDENT_GUIDE.md               ← Student-facing bot guide
│   ├── IMPLEMENTATION_GUIDE.md        ← Full setup walkthrough
│   └── SETUP_AND_MAINTENANCE.md       ← Maintenance reference
└── docs/
    └── CHALLENGES.md                  ← Challenge hub (21 challenges)
```


## Quick Start

### For Facilitators (First Time Setup)

1. **Install files** (all workflows, scripts, data, docs)
2. **Update student roster** (`.github/data/student-roster.json`)
3. **Configure permissions** (Settings → Actions → Read/write + create PRs)
4. **Test with PR** (verify bot comments within 30 seconds)
5. **Create challenge issues** (pre-seed for workshop)

**See:** [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md) for detailed setup

### For Students

When you open a PR:
1. Wait ~30 seconds for bot feedback
2. Read feedback carefully (structured by type)
3. Fix any issues bot identifies
4. Request human peer review
5. Respond to both bot and human feedback
6. Merge when approved!

**See:** [Student Guide](../learning-room/.github/STUDENT_GUIDE.md) for how to use the bot


## Configuration

### Student Roster (`.github/data/student-roster.json`)

Update before each workshop cohort:

```json
{
  "cohort": "Workshop Name 2024",
  "facilitators": ["facilitator-username"],
  "students": [
    {
      "username": "github-username",
      "name": "Display Name",
      "timezone": "America/Los_Angeles",
      "interests": ["accessibility", "frontend"],
      "pronouns": "they/them",
      "screenReader": false,
      "mergedPRs": 0,
      "currentLevel": "Beginner",
      "badges": [],
      "joinedDate": "2024-01-15"
    }
  ]
}
```

### Skill Progression (`.github/data/challenge-progression.json`)

Defines levels, badges, and milestones. Default:
- **Beginner:** 0+ PRs (3 challenges)
- **Intermediate:** 1+ PRs (3 challenges)
- **Advanced:** 3+ PRs (3 challenges)
- **Expert:** 5+ PRs (3+ challenges)

Adjust PR thresholds and challenge lists as needed.

### Validation Rules (`.github/scripts/validate-pr.js`)

Customize checks:
- `checkIssueReference()` - Require issue link patterns
- `checkDescription()` - Minimum character count (default: 50)
- `checkFileLocation()` - Allowed directories (default: learning-room/)
- `validateMarkdownAccessibility()` - A11y rules (headings, links, alt text)

Add new validation functions to `required` or `suggestions` arrays.


## Workflow Jobs Reference

### PR Validation Bot Jobs

**1. `welcome-first-timer`**
- Detects first PR (counts previous)
- Posts welcome message
- Applies labels: first-time-contributor, needs-review

**2. `validate-pr`**
- Runs validation script
- Posts/updates feedback comment
- Creates commit status check
- Applies labels: documentation, needs-work, accessibility

**3. `celebrate-review`**
- Triggers on approved review
- Congratulates both reviewer and author

**4. `respond-to-questions`**
- Triggers on comment created
- Detects keywords (@bot help, merge conflict, request review)
- Posts contextual help

### Skills Progression Jobs

**1. `track-completion`**
- Triggers on PR merge
- Determines skill type from issue labels
- Awards appropriate badge
- Posts achievement comment

**2. `unlock-next-challenge`**
- Counts total merged PRs
- Determines current level
- Checks for level-up
- Posts progress update or level-up celebration

**3. `celebrate-milestone`**
- Checks for milestone PR counts (1, 5, 10, 25, 50, 100)
- Posts special celebration with badge link

### Student Grouping Jobs

**1. `assign-peer-reviewer`**
- Triggers on PR opened
- Selects reviewer by strategy:
  - least_reviews (default): Balances load
  - skill_match: Pairs by PR content
  - random: Shuffle
- Requests review via API
- Posts pairing comment with guidance

**2. `create-study-groups`**
- Manual trigger only (workflow_dispatch)
- Groups students by strategy:
  - random: Shuffle and divide
  - skill_match: Mix skill levels
  - timezone_match: Group by timezone
- Creates issue per group with collaboration guide


## Educational Philosophy

### Why Automation + Human Review?

**Automation provides:**
- Instant feedback (no waiting for humans)
- Educational resources (links to learning)
- Consistency (same standards for all)
- Unlimited patience (runs on every commit)

**Human review provides:**
- Creative suggestions (beyond rules)
- Contextual judgment (nuanced understanding)
- Social learning (building relationships)
- Encouragement and mentorship

**Together:** Students experience professional CI/CD workflows while building community connections.

### Accessibility-First Design

All automation components:
- Use semantic Markdown (proper headings, lists, links)
- Include descriptive link text (never "click here")
- Provide clear, actionable feedback
- Link to resources for learning
- Work fully with screen readers
- Mention screen reader considerations in guidance


## Monitoring & Troubleshooting

### Check Automation Health

**Actions Tab:**
- Verify workflows run on expected triggers
- Check for failed runs (red X)
- Review logs for errors

**PR Checks:**
- Bot comment appears within 30 seconds
- Labels applied automatically
- Status checks visible
- Keyword responses work

**Common Issues:**

| Problem | Solution |
|---------|----------|
| Bot not commenting | Check workflow permissions (read/write + create PRs) |
| Validation errors wrong | Test script locally, check file paths |
| Skills not unlocking | Verify PR was merged (not just closed) |
| Reviewer not assigned | Check student roster has enough students |

**See:** [Implementation Guide - Troubleshooting](docs/IMPLEMENTATION_GUIDE.md#step-7-troubleshooting)


## Success Metrics

Track these to evaluate automation impact:

**Engagement:**
- Number of PRs opened
- Merge rate (opened → merged)
- Time to first contribution
- Repeat contributions (students opening multiple PRs)

**Learning:**
- Bot feedback comprehension (ask students)
- Issues fixed after bot feedback
- Quality of peer reviews
- Accessibility improvements over time

**Efficiency:**
- Time to first feedback (bot vs human)
- Facilitator time spent on reviews
- Number of PRs requiring facilitator intervention
- Student satisfaction with automation


## Customization Examples

### Add New Badge

Edit `.github/data/challenge-progression.json`:

```json
{
  "badges": {
    "testing": {
      "emoji": "",
      "title": "Test Engineer",
      "description": "Wrote comprehensive tests"
    }
  }
}
```

Update `skills-progression.yml` to award it when relevant.

### Add Validation Check

Edit `.github/scripts/validate-pr.js`:

```javascript
function checkCodeBlocks() {
  const hasCodeBlocks = changedContent.includes('```');
  return {
    passed: hasCodeBlocks,
    message: "Consider adding code examples",
    help: "Code blocks improve documentation clarity"
  };
}

// Add to suggestions array
```

### Change Skill Level Thresholds

Edit `.github/data/challenge-progression.json`:

```json
{
  "levels": [
    { "name": "Beginner", "requiredPRs": 0 },
    { "name": "Intermediate", "requiredPRs": 2 },  // Changed from 1
    { "name": "Advanced", "requiredPRs": 5 },      // Changed from 3
    { "name": "Expert", "requiredPRs": 10 }        // Changed from 5
  ]
}
```


## Documentation Map

**For Students:**
- [Student Guide](../learning-room/.github/STUDENT_GUIDE.md) - How bot works, interpreting feedback
- [Challenge Hub](../learning-room/docs/CHALLENGES.md) - All 21 challenges
- [Course Guide](../docs/course-guide.md) - Full curriculum with chapter links

**For Facilitators:**
- [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md) - Setup instructions
- [Classroom Setup](../classroom/README.md) - GitHub Classroom guide
- [Facilitator Guide](../FACILITATOR.md) - Workshop facilitation (includes automation section)
- [Workflow Files](workflows/) - Automation source code
- [Data Files](data/) - Configuration (roster, progression)


## Contributing to Automation

Found a bug? Have a suggestion?

1. **Open an issue** with label `automation-feedback`
2. **Describe the problem** or proposed improvement
3. **Include examples** (screenshots, PR links)
4. **Tag facilitators** for review

**Common improvement areas:**
- Validation rules (too strict/lenient?)
- Bot message clarity
- New badge types
- Custom grouping strategies
- Additional validation checks


## Version History

**v1.0 (Current)**
- PR validation bot with accessibility checking
- Skills progression with 4 levels, 6 badges, 6 milestones
- Student pairing with 3 strategies
- Comprehensive documentation
- Initial challenge set (12 challenges)

**Future Enhancements:**
- Integration with GitHub Projects for progress dashboard
- Automated test running for code contributions
- Multi-language support for international cohorts
- Advanced analytics and visualizations
- Custom achievement builder UI


## Acknowledgments

This automation system was designed with these principles:

**Accessibility First** - Fully screen reader accessible  
**Educational Focus** - Teaches, doesn't just check  
**Human-Centered** - Augments, not replaces, human review  
**Professional Experience** - Mirrors real CI/CD workflows  
**Community Building** - Encourages collaboration and support  

Built for the Open Source Assistive Technology Hackathon workshop.


**Questions?** Open an issue or reach out to workshop facilitators!

**Ready to implement?** See [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)
