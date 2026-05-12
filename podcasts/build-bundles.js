#!/usr/bin/env node
/**
 * Podcast Bundle Generator for Git Going with GitHub
 *
 * Generates NotebookLM-ready source bundles for each episode by combining
 * episode-specific production prompts with chapter content from docs/.
 * Each bundle includes:
 *   - Episode-specific production prompt with tone/style direction
 *   - Concept coverage checklist (ensures depth)
 *   - Cross-referenced supplementary content from related chapters
 *   - Full primary source material
 *
 * Usage: node podcasts/build-bundles.js
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BUNDLES_DIR = path.join(__dirname, 'bundles');

// Historical episode scripts were created before the curriculum was renumbered.
// Keep those episode records usable by resolving old source names to the
// current files when building fresh source bundles.
const SOURCE_ALIASES = {
  '01-understanding-github-web-structure.md': '02-understanding-github.md',
  '02-navigating-repositories.md': '03-navigating-repositories.md',
  '03-the-learning-room.md': '04-the-learning-room.md',
  '04-working-with-issues.md': '05-working-with-issues.md',
  '05-working-with-pull-requests.md': '06-working-with-pull-requests.md',
  '06-merge-conflicts.md': '07-merge-conflicts.md',
  '07-culture-etiquette.md': '08-open-source-culture.md',
  '08-labels-milestones-projects.md': '09-labels-milestones-projects.md',
  '09-notifications.md': '10-notifications-and-day-1-close.md',
  '10-vscode-basics.md': '11-vscode-interface.md',
  '11-git-source-control.md': '14-git-in-practice.md',
  '12-github-pull-requests-extension.md': '15-code-review.md',
  '13-github-copilot.md': '16-github-copilot.md',
  '14-accessible-code-review.md': '15-code-review.md',
  '15-issue-templates.md': '17-issue-templates.md',
  '16-accessibility-agents.md': '19-accessibility-agents.md',
  'appendix-c-accessibility-standards.md': 'appendix-m-accessibility-standards.md',
  'appendix-e-github-flavored-markdown.md': 'appendix-c-markdown-reference.md',
  'appendix-f-github-gists.md': 'appendix-u-discussions-and-gists.md',
  'appendix-g-github-discussions.md': 'appendix-u-discussions-and-gists.md',
  'appendix-h-releases-tags-insights.md': 'appendix-s-releases-tags-insights.md',
  'appendix-i-github-projects.md': 'appendix-r-projects-deep-dive.md',
  'appendix-j-advanced-search.md': 'appendix-n-advanced-search.md',
  'appendix-k-branch-protection-rulesets.md': 'appendix-o-branch-protection.md',
  'appendix-l-github-security-features.md': 'appendix-p-security-features.md',
  'appendix-m-vscode-accessibility-reference.md': 'appendix-g-vscode-reference.md',
  'appendix-n-github-codespaces.md': 'appendix-j-cloud-editors.md',
  'appendix-o-github-mobile.md': 'appendix-v-github-mobile.md',
  'appendix-p-github-pages.md': 'appendix-w-github-pages.md',
  'appendix-q-github-actions-workflows.md': 'appendix-q-actions-workflows.md',
  'appendix-r-github-profile-sponsors-wikis.md': 'appendix-t-community-and-social.md',
  'appendix-s-github-organizations-templates.md': 'appendix-t-community-and-social.md',
  'appendix-t-contributing-to-open-source.md': '08-open-source-culture.md',
  'appendix-u-resources.md': 'appendix-x-resources.md',
  'appendix-v-accessibility-agents-reference.md': 'appendix-l-agents-reference.md',
  'appendix-w-github-copilot-reference.md': 'appendix-k-copilot-reference.md',
  'appendix-x-copilot-models.md': 'appendix-k-copilot-reference.md',
  'appendix-y-accessing-workshop-materials.md': 'appendix-y-workshop-materials.md',
  'appendix-z-github-skills-catalog.md': 'appendix-z-github-skills.md'
};

function resolveSourceName(sourceName) {
  return SOURCE_ALIASES[sourceName] || sourceName;
}

// ---------------------------------------------------------------------------
// Series-wide prompt template
// ---------------------------------------------------------------------------

function buildPrompt(ep, total) {
  // Build concept checklist section
  const conceptSection = ep.concepts && ep.concepts.length > 0
    ? `### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

${ep.concepts.map(c => `- [ ] **${c}**`).join('\n')}

`
    : '';

  // Build cross-reference note
  const xrefSection = ep.crossRefs && ep.crossRefs.length > 0
    ? `### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

${ep.crossRefs.map(x => `- ${x.label}`).join('\n')}

`
    : '';

  // Build prerequisite note
  const prereqSection = ep.prerequisites && ep.prerequisites.length > 0
    ? `### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

${ep.prerequisites.map(p => `- Episode ${p.ep}: ${p.concept}`).join('\n')}

`
    : '';

  return `# Git Going with GitHub - Audio Series

## Episode ${ep.number}: ${ep.title}

**Series:** Git Going with GitHub
**Episode:** ${ep.number} of ${total}
**Audience:** Blind and low-vision developers learning GitHub and open source
**Estimated length:** ${ep.duration || '10-15 min'}

---

### Audio Production Direction

Generate a conversational two-host podcast episode about this topic.
The audience is blind and low-vision developers attending a two-day workshop on GitHub.

**Tone and style:**

- Welcoming and encouraging - many listeners are encountering these concepts for the first time
- Preserve the Alex and Jamie banter style: Alex is the warm expert guide, Jamie is curious, funny, and willing to ask the questions learners may be afraid to ask
- Keep the humor kind and grounded in the learning moment; jokes should clarify the concept, not distract from it
- Use spatial and structural descriptions, not visual references
- Say "navigate to" or "move to the section called" instead of "look for" or "you will see"
- Define technical terms on first use - do not assume familiarity with programming jargon
- Focus on deep conceptual understanding - explain WHY, not just HOW
- Share practical tips, common mistakes, and real-world context
- When describing keyboard shortcuts, say the full key names: "Control plus Shift plus P" not "Ctrl+Shift+P"
- Keep the conversation natural - two hosts discussing the topic, not reading a script
- Include at least one real-world analogy per major concept
- End with a brief summary of key takeaways and what comes next
- When onboarding or classroom setup is relevant, explicitly explain the gentle path: GitHub Classroom link, private Learning Room repository, Challenge 1 issue, evidence prompt, bot feedback, and where to ask for help
- Emphasize tool choice without ranking learners: browser, github.dev, VS Code, GitHub Desktop, and command line are paths into the same workflow

**Required script format:**

- Use only these speaker markers on their own lines: [ALEX], [JAMIE], and [PAUSE]
- Do not include stage directions, music cues, markdown tables, bullet lists, citations, or headings in the final script
- Keep each speaker turn short enough for TTS, usually one to three spoken paragraphs
- Jamie should regularly restate the learner's mental model: "So what I am hearing is..."
- For challenge or exercise material, teach the skill first, then explain the evidence the learner must submit

**Episode focus:**

${ep.focus}

---

${conceptSection}${prereqSection}${xrefSection}### Primary Source Material

`;
}

// ---------------------------------------------------------------------------
// Episode catalog
// Each episode has:
//   sources:       Primary chapter markdown files
//   crossRefs:     Supplementary docs appended for context (label + file)
//   concepts:      Explicit concept checklist - every item MUST be covered
//   prerequisites: Brief recap of earlier episode concepts
//   duration:      Target episode length
//   description:   One-line description for RSS/player
// ---------------------------------------------------------------------------

const episodes = [

  // ---- Course overview ----
  {
    number: 0,
    slug: 'welcome',
    title: 'Welcome to Git Going with GitHub',
    description: 'A tour of the workshop structure, the two-day arc, and what you will accomplish.',
    duration: '10-12 min',
    sources: ['course-guide.md', 'get-going.md'],
    crossRefs: [
      { label: 'Glossary - key terms preview', file: 'appendix-a-glossary.md' }
    ],
    concepts: [
      'What open source means and why it matters',
      'The two-day workshop structure: Day 1 (browser) and Day 2 (VS Code + agents)',
      'The learning philosophy: manual skill first, then automation',
      'What a repository, issue, pull request, and merge are (high-level preview)',
      'The 55 accessibility agents across 3 teams and what they do on Day 2',
      'How the chapters, appendices, and exercises fit together',
      'The exercise pattern: Try It, You are done when, What success feels like',
      'Encouragement for learners who are new to the command line or Git'
    ],
    focus: `- What this workshop is and who it is for
- The two-day structure: Day 1 (browser) then Day 2 (VS Code + agents)
- The learning philosophy: manual skill first, then automation
- What students will accomplish by the end
- How the chapters, appendices, and exercises fit together
- Encouragement for learners who are new to the command line`
  },

  // ---- Day 1: GitHub Foundations ----
  {
    number: 1,
    slug: 'pre-workshop-setup',
    title: 'Pre-Workshop Setup',
    description: 'Creating your GitHub account, installing Git and VS Code, configuring your screen reader.',
    duration: '10-12 min',
    sources: ['00-pre-workshop-setup.md'],
    crossRefs: [
      { label: 'Git Authentication (tokens, SSH, credential storage)', file: 'appendix-d-git-authentication.md' }
    ],
    concepts: [
      'Creating a GitHub account and choosing a username',
      'Two-factor authentication: what it is and why it is required',
      'What Git is versus what GitHub is - the distinction',
      'Installing Git on Windows, macOS, and Linux',
      'Configuring git identity: user.name and user.email',
      'What VS Code is and why it is the recommended editor',
      'Installing VS Code and enabling screen reader mode',
      'The github.dev alternative for browser-based editing',
      'Verifying your setup works end to end'
    ],
    focus: `- Creating a GitHub account and enabling two-factor authentication
- Installing Git and configuring your identity
- Setting up VS Code with accessibility features
- Configuring your screen reader for GitHub navigation
- Verifying everything works before Day 1`
  },
  {
    number: 2,
    slug: 'github-web-structure',
    title: 'Understanding GitHub on the Web',
    description: 'How GitHub organizes its web pages, heading structure, landmarks, and keyboard shortcuts.',
    duration: '12-15 min',
    sources: ['01-understanding-github-web-structure.md'],
    crossRefs: [
      { label: 'Screen Reader Cheat Sheet - GitHub shortcuts', file: 'appendix-b-screen-reader-cheatsheet.md' }
    ],
    prerequisites: [
      { ep: 1, concept: 'You have a GitHub account and Git installed' }
    ],
    concepts: [
      'GitHub page types: dashboard, repository, issue, pull request, profile, settings',
      'The HTML heading hierarchy GitHub uses on each page type',
      'ARIA landmarks and regions on GitHub pages',
      'The global navigation bar and how to reach it by keyboard',
      'GitHub built-in keyboard shortcuts: pressing ? to see them',
      'The jump-to-content skip link on every GitHub page',
      'How to orient yourself on an unfamiliar page using headings',
      'The command palette: / or Control+K for quick navigation',
      'The difference between GitHub.com and github.dev'
    ],
    focus: `- How GitHub organizes its web pages: repository, issue, PR, profile
- The heading structure and landmarks screen readers can use
- Keyboard shortcuts built into GitHub
- How to orient yourself on any GitHub page using headings and regions
- The difference between the dashboard, repository, and settings pages`
  },
  {
    number: 3,
    slug: 'navigating-repositories',
    title: 'Navigating Repositories',
    description: 'Exploring a repository: tabs, files, README, branches, and commit history.',
    duration: '12-15 min',
    sources: ['02-navigating-repositories.md'],
    crossRefs: [
      { label: 'Glossary - repository, branch, commit, clone, fork', file: 'appendix-a-glossary.md' }
    ],
    prerequisites: [
      { ep: 2, concept: 'GitHub page structure, headings, keyboard shortcuts' }
    ],
    concepts: [
      'What a repository is: a project folder tracked by Git',
      'The repository tab bar: Code, Issues, Pull Requests, Actions, Settings',
      'The Code tab: file tree, README rendering, branch selector',
      'What a branch is and why repositories have them',
      'The default branch (usually main) and what it means',
      'Reading commit history: who changed what and when',
      'What cloning means: copying a remote repo to your computer',
      'The difference between cloning and forking',
      'Using gh repo clone versus git clone versus downloading a ZIP',
      'The About section, topics, and license on a repository page'
    ],
    focus: `- What a repository is and what it contains
- The tab bar: Code, Issues, Pull Requests, Actions, and more
- Reading the file tree, README, and commit history
- Navigating branches and understanding the default branch
- Cloning a repository to your computer`
  },
  {
    number: 4,
    slug: 'the-learning-room',
    title: 'The Learning Room',
    description: 'Your shared practice environment: challenges, PR workflow, bot feedback, peer review.',
    duration: '8-10 min',
    sources: ['03-the-learning-room.md'],
    prerequisites: [
      { ep: 3, concept: 'Repository structure and how to navigate one' }
    ],
    concepts: [
      'What the Learning Room repository is and its purpose',
      'How practice challenges are structured',
      'The fork-edit-PR workflow for submitting solutions',
      'How the automated bot provides feedback on your pull request',
      'Peer review: reading and commenting on classmate work',
      'Why low-stakes practice builds real confidence',
      'How to find your challenge and know when you are done'
    ],
    focus: `- What the Learning Room repository is and why it exists
- How challenges work: read, attempt, submit a pull request
- The bot feedback system and what to expect
- Peer review: how students review each other's work
- Building confidence through low-stakes practice`
  },
  {
    number: 5,
    slug: 'working-with-issues',
    title: 'Working with Issues',
    description: 'Filing, searching, filtering, commenting on, and managing GitHub issues.',
    duration: '15-18 min',
    sources: ['04-working-with-issues.md'],
    crossRefs: [
      { label: 'Labels, Milestones, Projects - issue organization', file: 'appendix-i-github-projects.md' }
    ],
    prerequisites: [
      { ep: 3, concept: 'Repository tabs and navigation' }
    ],
    concepts: [
      'What an issue is: a unit of work, bug report, or feature request',
      'The Issues tab: list view, filters, and search',
      'Issue anatomy: title, body (markdown), labels, assignees, milestone',
      'Filtering issues: by label, author, assignee, milestone, open/closed',
      'Using the search bar with qualifiers like is:open label:bug',
      'Reading an issue: the timeline of comments, events, and references',
      'Filing a new issue: writing a clear title and descriptive body',
      'Using markdown in issue bodies: code blocks, lists, task lists, links',
      'Commenting on issues: adding context, asking questions, reacting',
      'Reactions (emoji) as lightweight feedback',
      'Referencing issues from other issues or pull requests with #number',
      'Assigning an issue to yourself or someone else',
      'Applying and removing labels',
      'Closing an issue and what closed means',
      'Reopening a closed issue',
      'The connection between issues and pull requests',
      'Using gh issue commands from the terminal as an alternative'
    ],
    focus: `- What issues are and why they matter in open source projects
- How to find, read, filter, and search for issues
- Filing a new issue with a clear title and description
- Participating in issue discussions with comments and reactions
- Managing issues: assigning, labeling, closing, reopening
- How issues connect to pull requests and project planning`
  },
  {
    number: 6,
    slug: 'working-with-pull-requests',
    title: 'Working with Pull Requests',
    description: 'Creating, reviewing, commenting on, and merging pull requests.',
    duration: '15-18 min',
    sources: ['05-working-with-pull-requests.md'],
    crossRefs: [
      { label: 'Accessible Code Review - diff navigation and review habits', file: '14-accessible-code-review.md' }
    ],
    prerequisites: [
      { ep: 5, concept: 'Issues and how they connect to PRs' },
      { ep: 3, concept: 'Branches and what they are for' }
    ],
    concepts: [
      'What a pull request is: a proposal to merge changes from one branch into another',
      'The difference between an issue and a pull request',
      'PR anatomy: title, body, commits, files changed, reviewers, labels',
      'Creating a pull request from a fork (cross-repository)',
      'Creating a pull request from a branch (same repository)',
      'Writing a good PR description: what changed, why, and how to test',
      'The PR timeline: comments, reviews, status checks, merge',
      'Requesting a review from someone',
      'Reviewing a pull request: reading the diff',
      'What additions (green/+) and deletions (red/-) mean in a diff',
      'Leaving inline comments on specific lines',
      'Submitting a review: approve, request changes, or comment',
      'Status checks and what they mean for merging',
      'Merge options: merge commit, squash and merge, rebase and merge',
      'When to use each merge strategy',
      'Draft pull requests: signaling work in progress',
      'Converting a draft to ready for review',
      'Using gh pr commands from the terminal as an alternative'
    ],
    focus: `- What a pull request is and how it differs from an issue
- The lifecycle: draft, open, review, approve, merge
- Creating a pull request from a fork or branch
- Reviewing someone else's pull request
- Understanding merge options: merge commit, squash, rebase
- Draft pull requests and when to use them`
  },
  {
    number: 7,
    slug: 'merge-conflicts',
    title: 'Merge Conflicts Are Not Scary',
    description: 'Why conflicts happen, how to read conflict markers, and resolving them confidently.',
    duration: '12-15 min',
    sources: ['06-merge-conflicts.md'],
    prerequisites: [
      { ep: 6, concept: 'Pull requests and merging' },
      { ep: 3, concept: 'Branches and commits' }
    ],
    concepts: [
      'What a merge conflict is: two changes to the same lines',
      'Why conflicts are normal and not a sign of failure',
      'The analogy: two people editing the same paragraph of a shared document',
      'Conflict markers: <<<<<<< HEAD, =======, >>>>>>> branch-name',
      'Reading conflict markers: "your version" versus "their version"',
      'Resolving a conflict in the GitHub web editor',
      'Resolving a conflict using git on the command line',
      'The git merge, git status, git add, git commit workflow for conflicts',
      'How to prevent conflicts: communication, small PRs, frequent pulls',
      'What happens if you get stuck: asking for help is always OK',
      'Using gh pr checks and gh pr diff to inspect conflicts from the terminal',
      'Confidence building: your first conflict resolution is the hardest'
    ],
    focus: `- Why merge conflicts happen - two people editing the same lines
- Reading a conflict message: the markers and what they mean
- Resolving conflicts in the browser editor
- Resolving conflicts using the git command line
- Preventing conflicts through communication and small changes
- Building confidence: conflicts are normal, not errors`
  },
  {
    number: 8,
    slug: 'culture-and-etiquette',
    title: 'Open Source Culture and Etiquette',
    description: 'Communication norms, code review etiquette, inclusive language, and asking questions.',
    duration: '10-12 min',
    sources: ['07-culture-etiquette.md'],
    crossRefs: [
      { label: 'Contributing to Open Source - workflow and finding issues', file: 'appendix-t-contributing-to-open-source.md' }
    ],
    concepts: [
      'The unwritten rules of open source communication',
      'How tone comes across in text without vocal cues',
      'Writing a good issue description: context, steps, expected versus actual',
      'Writing a good PR description: what, why, how to test',
      'The Code of Conduct: what it is and why it exists',
      'Giving code review feedback: be specific, be kind, focus on the code',
      'Receiving code review feedback: do not take it personally',
      'Inclusive language: why it matters and examples of inclusive phrasing',
      'When to ask questions and how to frame them clearly',
      'Understanding that maintainers are often volunteers with limited time',
      'Patience with response times on open source projects',
      'How to disagree respectfully'
    ],
    focus: `- The unwritten rules of open source communication
- How to write a good issue or pull request description
- Giving and receiving code review feedback gracefully
- Inclusive language and why it matters
- When to ask questions and how to ask them well
- Understanding maintainer workload and response times`
  },
  {
    number: 9,
    slug: 'labels-milestones-projects',
    title: 'Labels, Milestones, and Projects',
    description: 'Organizing and tracking work with labels, milestones, and GitHub Projects.',
    duration: '12-15 min',
    sources: ['08-labels-milestones-projects.md'],
    crossRefs: [
      { label: 'GitHub Projects Deep Dive - boards, tables, custom fields', file: 'appendix-i-github-projects.md' }
    ],
    prerequisites: [
      { ep: 5, concept: 'Issues and how labels appear on them' }
    ],
    concepts: [
      'What labels are: color-coded tags for categorizing issues and PRs',
      'Default labels GitHub provides: bug, enhancement, documentation, etc.',
      'Viewing the labels page on a repository',
      'Applying a label to an issue or pull request',
      'Filtering issues by label',
      'Creating a new custom label with name, description, and color',
      'What milestones are: grouping issues toward a release or goal',
      'Creating a milestone with a due date',
      'Adding issues to a milestone and tracking progress',
      'Introduction to GitHub Projects: the new project boards',
      'Board view, table view, and roadmap view (overview)',
      'How labels, milestones, and projects work together for team coordination',
      'Using gh commands for label and milestone management'
    ],
    focus: `- How labels organize and categorize issues and pull requests
- Creating, applying, and filtering by labels
- Milestones: grouping work toward a shared goal
- GitHub Projects: boards, tables, and roadmap views
- How these tools help teams coordinate at scale`
  },
  {
    number: 10,
    slug: 'notifications',
    title: 'Notifications and Mentions',
    description: 'Managing your notification inbox, @mentions, and strategies for avoiding overload.',
    duration: '10-12 min',
    sources: ['09-notifications.md'],
    prerequisites: [
      { ep: 5, concept: 'Issues and commenting' },
      { ep: 6, concept: 'Pull requests and reviews' }
    ],
    concepts: [
      'How GitHub generates notifications: participating versus watching',
      'The notification inbox on github.com',
      'Notification types: mention, review request, assignment, CI status',
      'Marking notifications as read, done, or saved',
      'Unsubscribing from a noisy thread',
      'Watch settings: watching, not watching, ignoring, custom',
      'Using @mentions to get someone\'s attention in a comment',
      'Team mentions: @org/team-name',
      'Email notifications versus web notifications',
      'Configuring notification preferences in Settings',
      'Strategies for managing notification volume without missing important items',
      'Using gh CLI for notification-like workflows'
    ],
    focus: `- How GitHub's notification system works
- The difference between participating and watching
- Managing your notification inbox to avoid overload
- Using @mentions to get someone's attention
- Email notifications versus web notifications
- Strategies for staying informed without being overwhelmed`
  },

  // ---- Day 2: VS Code + Accessibility Agents ----
  {
    number: 11,
    slug: 'vscode-basics',
    title: 'VS Code Setup and Accessibility',
    description: 'Screen reader mode, Command Palette, sidebar navigation, and accessibility settings.',
    duration: '12-15 min',
    sources: ['10-vscode-basics.md'],
    crossRefs: [
      { label: 'VS Code Accessibility Reference - all settings', file: 'appendix-m-vscode-accessibility-reference.md' }
    ],
    prerequisites: [
      { ep: 1, concept: 'You installed VS Code and Git' }
    ],
    concepts: [
      'What VS Code is: a free, extensible code editor by Microsoft',
      'The github.dev experience: press . on any repo to open VS Code in the browser',
      'Screen reader mode: what it enables and how to turn it on',
      'The accessibility help dialog: Control+Shift+H (what it tells you)',
      'The Command Palette: Control+Shift+P - the most important shortcut',
      'The Activity Bar: Explorer, Search, Source Control, Extensions, etc.',
      'Navigating between the sidebar, editor, terminal, and panels',
      'The integrated terminal and how to open it',
      'Opening a folder versus opening a file',
      'Installing extensions from the Extensions view',
      'Key accessibility settings: editor.accessibilitySupport, screen reader announcements',
      'Audio cues and what they signal',
      'The accessible diff viewer (Accessible Diff Viewer in Command Palette)',
      'Keyboard shortcut customization'
    ],
    focus: `- What VS Code is and why it is used for this workshop
- The github.dev browser-based VS Code experience
- Screen reader mode and how to enable it
- The Command Palette: the most important keyboard shortcut
- Navigating the sidebar, editor, terminal, and panels
- Accessibility settings every screen reader user should configure`
  },
  {
    number: 12,
    slug: 'git-source-control',
    title: 'Git and Source Control in VS Code',
    description: 'Cloning, branching, staging, committing, pushing, and pulling from VS Code.',
    duration: '15-18 min',
    sources: ['11-git-source-control.md'],
    crossRefs: [
      { label: 'Git Authentication - tokens, SSH, credential helpers', file: 'appendix-d-git-authentication.md' }
    ],
    prerequisites: [
      { ep: 11, concept: 'VS Code interface, Command Palette, sidebar' },
      { ep: 3, concept: 'Repositories, branches, commits' }
    ],
    concepts: [
      'The Source Control view in the Activity Bar',
      'What the Source Control view shows: changed files, staged files, commit input',
      'Cloning a repository from VS Code using the Command Palette',
      'The difference between cloning via VS Code, git clone, and gh repo clone',
      'What the working tree, staging area, and repository are',
      'The three states of a file: untracked, modified, staged',
      'Creating a new branch from VS Code',
      'Switching between branches',
      'Staging files: what it means and why Git has a staging step',
      'Staging individual files versus staging all changes',
      'Writing a commit message: subject line conventions',
      'Committing staged changes',
      'What pushing means: sending local commits to GitHub',
      'What pulling means: downloading new commits from GitHub',
      'The relationship between local branch and remote tracking branch',
      'Handling pull conflicts and when to use git pull --rebase',
      'The web alternative: editing directly on github.com',
      'The git CLI alternative for each operation'
    ],
    focus: `- The Source Control panel and what it shows
- Cloning a repository into VS Code
- Creating and switching branches
- Staging changes: what it means and how to do it
- Writing commit messages and committing
- Pushing to and pulling from GitHub
- The relationship between local and remote repositories`
  },
  {
    number: 13,
    slug: 'github-prs-extension',
    title: 'The GitHub Pull Requests Extension',
    description: 'Viewing, creating, reviewing, and merging PRs from inside VS Code.',
    duration: '12-15 min',
    sources: ['12-github-pull-requests-extension.md'],
    crossRefs: [
      { label: 'Working with Pull Requests (web) - Ch 05', file: '05-working-with-pull-requests.md' }
    ],
    prerequisites: [
      { ep: 12, concept: 'Git operations in VS Code' },
      { ep: 6, concept: 'Pull request lifecycle from the web' }
    ],
    concepts: [
      'What the GitHub Pull Requests and Issues extension does',
      'Installing the extension and signing in to GitHub',
      'The Pull Requests section in the sidebar',
      'Viewing a list of pull requests assigned to you or created by you',
      'Opening a pull request in the editor to read the diff',
      'Creating a new pull request from VS Code',
      'Setting the base branch and compare branch',
      'Writing the PR title and description from VS Code',
      'Reviewing a pull request: navigating changed files',
      'Adding inline comments on specific lines',
      'Submitting a review: approve, request changes, or comment',
      'Merging a pull request from VS Code',
      'The web alternative for each operation',
      'The gh CLI alternative for each operation',
      'How the VS Code PR workflow maps to the Day 1 web workflow'
    ],
    focus: `- Installing and signing in to the GitHub Pull Requests extension
- Viewing pull requests without leaving VS Code
- Creating a new pull request from VS Code
- Reviewing and commenting on pull requests
- Merging and managing PRs from the editor
- How this connects to the web-based PR workflow from Day 1`
  },
  {
    number: 14,
    slug: 'github-copilot',
    title: 'GitHub Copilot',
    description: 'Inline suggestions, Copilot Chat, prompting strategies, and custom instructions.',
    duration: '15-18 min',
    sources: ['13-github-copilot.md'],
    crossRefs: [
      { label: 'Copilot Reference - features, participants, commands', file: 'appendix-w-github-copilot-reference.md' },
      { label: 'Copilot Billing and Models - usage, credits, and selection guidance', file: 'appendix-x-copilot-models.md' }
    ],
    prerequisites: [
      { ep: 11, concept: 'VS Code basics and the editor interface' }
    ],
    concepts: [
      'What GitHub Copilot is: an AI coding assistant',
      'How Copilot generates suggestions from context',
      'Inline code completions: how they appear and how to accept or dismiss',
      'Tab to accept, Escape to dismiss, Alt+] for next suggestion',
      'Copilot Chat: opening the chat panel',
      'Asking questions in natural language in the chat',
      'Chat participants: @workspace, @terminal, @vscode',
      'Slash commands in chat: /explain, /fix, /tests, /doc',
      'Effective prompting: being specific, providing context, iterating',
      'Custom instructions files: .github/copilot-instructions.md',
      'Prompt files: .github/prompts/*.prompt.md',
      'How Copilot interacts with screen readers: what works well',
      'Current Copilot limitations with accessibility',
      'The AI models available and how to switch between them',
      'Copilot for non-code tasks: writing docs, commit messages, PR descriptions'
    ],
    focus: `- What GitHub Copilot is and how it works
- Inline code suggestions and how to accept or dismiss them
- Copilot Chat: asking questions in natural language
- Effective prompting strategies for accessibility-focused work
- Custom instructions and how to tailor Copilot to your needs
- Copilot with screen readers: what works well and current limitations`
  },
  {
    number: 15,
    slug: 'accessible-code-review',
    title: 'Accessible Code Review',
    description: 'Navigating diffs with a screen reader, reviewing PRs in browser and VS Code.',
    duration: '15-18 min',
    sources: ['14-accessible-code-review.md'],
    crossRefs: [
      { label: 'Screen Reader Cheat Sheet - diff navigation keys', file: 'appendix-b-screen-reader-cheatsheet.md' }
    ],
    prerequisites: [
      { ep: 6, concept: 'Pull requests and the review process' },
      { ep: 11, concept: 'VS Code accessibility features' }
    ],
    concepts: [
      'Why code review is important for code quality and learning',
      'The two environments for review: web browser and VS Code',
      'Reading a diff: what unified diff format looks like',
      'Addition lines (+ prefix), deletion lines (- prefix), context lines',
      'Navigating the Files Changed tab on a pull request',
      'Using keyboard shortcuts to move between files in a diff',
      'The Accessible Diff Viewer in VS Code (Command Palette)',
      'How the accessible diff viewer announces additions and deletions',
      'Writing inline review comments on specific lines',
      'Writing a helpful review comment: be specific, suggest alternatives',
      'Submitting a review with approve, request changes, or comment',
      'The gh CLI as a third path for reviewing from the terminal',
      'Building a habit of reviewing others work regularly',
      'What to look for in a review: correctness, clarity, style, accessibility'
    ],
    focus: `- Why code review matters for quality and learning
- Navigating diffs with a screen reader
- The two environments: web browser and VS Code
- Reading additions, deletions, and context lines
- Writing review comments that are helpful and specific
- Building a habit of reviewing others' work`
  },
  {
    number: 16,
    slug: 'issue-templates',
    title: 'Issue Templates',
    description: 'Creating YAML-based issue templates for bug reports, features, and custom forms.',
    duration: '12-15 min',
    sources: ['15-issue-templates.md'],
    prerequisites: [
      { ep: 5, concept: 'Issues and how they are filed' }
    ],
    concepts: [
      'What issue templates are and why projects use them',
      'Where templates live: .github/ISSUE_TEMPLATE/ directory',
      'YAML front matter: name, description, title, labels, assignees',
      'Markdown body templates with placeholder sections',
      'Creating a bug report template with steps to reproduce',
      'Creating a feature request template',
      'Creating custom templates for any purpose',
      'The template chooser page: what users see when filing an issue',
      'config.yml: adding external links and configuring the chooser',
      'Form-based templates: input types (textarea, input, dropdown, checkboxes)',
      'Validation and required fields in form templates',
      'How templates improve issue quality and reduce back-and-forth',
      'Testing your templates by filing an issue'
    ],
    focus: `- What issue templates are and why projects use them
- YAML front matter and template configuration
- Creating bug report, feature request, and custom templates
- Template chooser pages and external links
- How templates improve issue quality and reduce maintainer burden`
  },
  {
    number: 17,
    slug: 'accessibility-agents',
    title: 'Accessibility Agents',
    description: '55 agents across 3 teams and 5 platforms, 54+ slash commands, custom agents, and agentic accessibility workflows.',
    duration: '15-18 min',
    sources: ['16-accessibility-agents.md'],
    crossRefs: [
      { label: 'Accessibility Agents Reference - all 54+ commands', file: 'appendix-v-accessibility-agents-reference.md' }
    ],
    prerequisites: [
      { ep: 14, concept: 'Copilot Chat and how to interact with it' },
      { ep: 11, concept: 'VS Code extensions and settings' }
    ],
    concepts: [
      'What accessibility agents are: specialized AI assistants for a11y tasks',
      'How agents extend GitHub Copilot with domain expertise',
      'The full ecosystem: 55 agents, 3 teams, 5 platforms',
      'Team 1 - Accessibility (26 agents): web, document, mobile auditing',
      'Team 2 - GitHub Workflow (12 agents): issues, PRs, analytics, templates',
      'Team 3 - Developer Tools (6 agents): Python, desktop, custom tools',
      'Slash commands: 54+ commands organized by workflow',
      'High-impact starting points: which agents and commands to try first',
      'Slash commands that save time: /my-issues, /review-pr, /triage, /daily-briefing, /a11y-update',
      'Orchestrator agents: @nexus, @accessibility-lead, @web-accessibility-wizard',
      'How the three teams connect in multi-agent workflows',
      'How to invoke an agent in Copilot Chat',
      'Installing and configuring agents from .github config files',
      'Agent instruction files and how they customize behavior',
      'Building your own custom agent with agent.md files',
      'Agentic workflows: chaining multiple agents together',
      'How agents amplify skills: the manual skill first, then the agent',
      'Real-world examples of agent-assisted contributions',
      'Limitations: agents suggest, humans decide and verify',
      'Go deeper: Appendix V has all 54+ commands, Episode 39 walks through every agent'
    ],
    focus: `- What accessibility agents are and how they extend Copilot
- The full ecosystem: 55 agents across 3 teams and 5 platforms
- The three teams: Accessibility (26), GitHub Workflow (12), Developer Tools (6)
- Slash commands: the 54+ commands and when to use them
- High-impact agents and slash commands to try first
- Orchestrator agents and how teams work together
- Installing and configuring the agents
- Building custom agents for your own projects
- How agents amplify every skill learned in this workshop
- Cross-reference: Appendix V and Episode 39 for the complete reference`
  },

  // ---- Appendices ----
  {
    number: 18,
    slug: 'glossary',
    title: 'Glossary of Terms',
    description: 'Comprehensive glossary: Git, GitHub, open source, and accessibility terminology.',
    duration: '12-15 min',
    sources: ['appendix-a-glossary.md'],
    concepts: [
      'Version control terms: repository, commit, branch, merge, push, pull, clone, fork',
      'GitHub terms: issue, pull request, review, draft, merge conflict, status check',
      'Collaboration terms: upstream, downstream, origin, remote, local',
      'Accessibility terms: screen reader, landmark, heading, ARIA, focus, tab order',
      'Agent terms: Copilot, agent, slash command, prompt, instruction file',
      'Pronunciation guidance for ambiguous terms'
    ],
    focus: `- Key GitHub, Git, and open source terminology
- Accessibility-specific terms used throughout the workshop
- Terms grouped by context: version control, collaboration, accessibility
- Pronunciation and usage notes for technical jargon`
  },
  {
    number: 19,
    slug: 'screen-reader-cheatsheet',
    title: 'Screen Reader Cheat Sheet',
    description: 'NVDA, JAWS, and VoiceOver commands for GitHub and VS Code.',
    duration: '12-15 min',
    sources: ['appendix-b-screen-reader-cheatsheet.md'],
    concepts: [
      'NVDA essential navigation: headings, landmarks, forms, tables, links',
      'NVDA browse mode versus focus mode',
      'JAWS essential navigation: matching patterns',
      'VoiceOver on macOS: rotor, VO keys, web navigation',
      'GitHub keyboard shortcuts: ?, g i, g p, /, t, y, l',
      'VS Code screen reader shortcuts: accessible help, accessible diff viewer',
      'Quick navigation patterns for common tasks'
    ],
    focus: `- Essential NVDA keyboard commands for GitHub and VS Code
- Essential JAWS keyboard commands for GitHub and VS Code
- VoiceOver commands for macOS users
- GitHub's built-in keyboard shortcuts
- Quick reference patterns: headings, landmarks, forms, tables`
  },
  {
    number: 20,
    slug: 'accessibility-standards',
    title: 'Accessibility Standards Reference',
    description: 'WCAG 2.2, ARIA roles, and the PR accessibility checklist.',
    duration: '12-15 min',
    sources: ['appendix-c-accessibility-standards.md'],
    concepts: [
      'What WCAG is: Web Content Accessibility Guidelines',
      'The four principles: Perceivable, Operable, Understandable, Robust',
      'Conformance levels: A, AA, AAA',
      'Key WCAG 2.2 success criteria relevant to development',
      'What ARIA is: Accessible Rich Internet Applications',
      'Common ARIA roles: button, dialog, navigation, landmark, live region',
      'The PR accessibility checklist: what to check before merging',
      'How to apply accessibility standards in code review'
    ],
    focus: `- WCAG 2.2 and what it means for developers
- ARIA roles and patterns used in GitHub's interface
- The pull request accessibility checklist
- How accessibility standards apply to code you write and review`
  },
  {
    number: 21,
    slug: 'git-authentication',
    title: 'Git Authentication',
    description: 'Personal access tokens, SSH keys, credential storage, and commit signing.',
    duration: '12-15 min',
    sources: ['appendix-d-git-authentication.md'],
    concepts: [
      'Why authentication is needed: proving you are who you say you are',
      'HTTPS versus SSH: two ways to authenticate with GitHub',
      'Personal Access Tokens (PATs): creating, scoping, and using them',
      'Classic tokens versus fine-grained tokens',
      'SSH keys: what they are (public key and private key pair)',
      'Generating an SSH key pair with ssh-keygen',
      'Adding the public key to your GitHub account',
      'Testing SSH authentication with ssh -T git@github.com',
      'Credential helpers: storing tokens so you do not retype them',
      'Git Credential Manager: the recommended cross-platform solution',
      'Commit signing: what it is and why verified commits matter',
      'Signing with GPG keys versus SSH keys',
      'Troubleshooting: permission denied, token expired, wrong remote URL'
    ],
    focus: `- Personal Access Tokens: creating and using them
- SSH keys: generating, adding to GitHub, and testing
- Credential storage so you do not retype passwords
- Commit signing with GPG or SSH keys
- Troubleshooting authentication failures`
  },
  {
    number: 22,
    slug: 'github-flavored-markdown',
    title: 'GitHub Flavored Markdown',
    description: 'Markdown syntax, GitHub extensions, and writing accessible documentation.',
    duration: '12-15 min',
    sources: ['appendix-e-github-flavored-markdown.md'],
    concepts: [
      'What Markdown is: lightweight text formatting',
      'Headings: # H1 through ###### H6 and heading hierarchy',
      'Paragraphs, line breaks, and emphasis (bold, italic)',
      'Links: inline links, reference links, autolinks',
      'Images: alt text syntax and writing descriptive alt text',
      'Lists: ordered, unordered, and nested',
      'Code: inline code with backticks and code blocks with triple backticks',
      'Tables: pipe syntax and alignment',
      'Task lists: checkbox syntax in issues and PRs',
      'GitHub-specific: alert blocks (note, tip, important, warning, caution)',
      'GitHub-specific: Mermaid diagrams (mention but note accessibility concerns)',
      'GitHub-specific: math equations with LaTeX syntax',
      'Footnotes and heading anchors',
      'Writing accessible markdown: descriptive links, alt text, heading structure'
    ],
    focus: `- Markdown basics: headings, lists, links, images, code blocks
- GitHub-specific features: alert blocks, task lists, tables
- Mermaid diagrams and math equations
- Footnotes and heading anchors
- Writing accessible markdown: alt text, descriptive links, heading hierarchy`
  },
  {
    number: 23,
    slug: 'github-gists',
    title: 'GitHub Gists',
    description: 'Lightweight code sharing: creating, editing, forking, and embedding Gists.',
    duration: '8-10 min',
    sources: ['appendix-f-github-gists.md'],
    concepts: [
      'What a Gist is: a lightweight way to share code snippets',
      'Public versus secret Gists (secret is not private)',
      'Creating a Gist from gist.github.com',
      'Creating a Gist from the command line with gh gist create',
      'Adding multiple files to a single Gist',
      'Editing and versioning: Gists are Git repositories',
      'Forking and starring Gists',
      'Embedding a Gist in a web page',
      'When to use a Gist versus a full repository'
    ],
    focus: `- What Gists are: lightweight code sharing
- Creating public and secret Gists
- Editing, forking, and starring Gists
- Embedding Gists in other pages
- When to use a Gist versus a full repository`
  },
  {
    number: 24,
    slug: 'github-discussions',
    title: 'GitHub Discussions',
    description: 'Forum-style conversations, Q&A, polls, and navigation with screen readers.',
    duration: '10-12 min',
    sources: ['appendix-g-github-discussions.md'],
    concepts: [
      'What Discussions are: threaded community conversations on a repo',
      'How Discussions differ from Issues: Q&A versus task tracking',
      'Discussion categories: General, Q&A, Ideas, Show and Tell, Announcements',
      'Creating a new discussion',
      'Replying and marking answers in Q&A discussions',
      'Polls: creating and voting',
      'Upvoting discussions and comments',
      'Navigating discussions with a screen reader: headings and landmarks',
      'Converting a discussion to an issue when action is needed',
      'When to use Discussions versus Issues versus PRs'
    ],
    focus: `- What Discussions are and how they differ from Issues
- Discussion categories: general, Q&A, ideas, show and tell
- Creating and participating in discussions
- Polls and announcements
- Navigating discussions with a screen reader`
  },
  {
    number: 25,
    slug: 'releases-tags-insights',
    title: 'Releases, Tags, and Insights',
    description: 'Semantic versioning, GitHub Releases, and repository analytics.',
    duration: '12-15 min',
    sources: ['appendix-h-releases-tags-insights.md'],
    concepts: [
      'What a Git tag is: a named pointer to a specific commit',
      'Lightweight tags versus annotated tags',
      'Semantic versioning: major.minor.patch and what each number means',
      'When to bump major, minor, or patch version',
      'What a GitHub Release is: a tag plus release notes and assets',
      'Creating a Release from the web interface',
      'Auto-generated release notes from merged PRs',
      'Downloading release assets (binaries, archives)',
      'Repository Insights: the Pulse page',
      'Contributors graph and activity',
      'Traffic: clones, views, referring sites',
      'Dependency graph and Dependabot',
      'Using Insights to assess project health and activity'
    ],
    focus: `- Git tags and semantic versioning
- Creating a GitHub Release with release notes
- Downloading release assets
- Repository Insights: pulse, contributors, traffic, dependency graph
- Using Insights to understand project health`
  },
  {
    number: 26,
    slug: 'github-projects',
    title: 'GitHub Projects Deep Dive',
    description: 'Project boards, table and roadmap views, custom fields, cross-repo management.',
    duration: '12-15 min',
    sources: ['appendix-i-github-projects.md'],
    concepts: [
      'GitHub Projects (new) versus Classic Project Boards',
      'Creating a new Project',
      'Board view: Kanban-style columns',
      'Table view: spreadsheet-style rows and columns',
      'Roadmap view: timeline-based planning',
      'Adding issues and pull requests to a Project',
      'Custom fields: text, number, date, single select, iteration',
      'Filtering and grouping items in a Project',
      'Cross-repository projects: tracking work across multiple repos',
      'Built-in automation: auto-add, auto-archive, status workflows',
      'Project workflows and actions integration'
    ],
    focus: `- GitHub Projects (the new version) versus classic project boards
- Board view, table view, and roadmap view
- Custom fields, grouping, and filtering
- Cross-repository project management
- Automating project workflows with built-in automation`
  },
  {
    number: 27,
    slug: 'advanced-search',
    title: 'Advanced Search',
    description: 'GitHub search query language, qualifiers, and filtering for issues, PRs, and code.',
    duration: '10-12 min',
    sources: ['appendix-j-advanced-search.md'],
    concepts: [
      'The search bar on GitHub: global search versus in-repository search',
      'Search scopes: repositories, code, issues, pull requests, users, topics',
      'Qualifier syntax: key:value pairs',
      'Issue qualifiers: is:open, is:closed, label:, author:, assignee:, milestone:',
      'PR qualifiers: is:pr, review:approved, draft:true, head:, base:',
      'Code qualifiers: language:, path:, extension:, org:, repo:',
      'Date range qualifiers: created:>2025-01-01, updated:<2026-01-01',
      'Combining qualifiers for precise searches',
      'Sorting results: sort:created-asc, sort:updated-desc',
      'Searching from the command line with gh search',
      'Saved searches and building a personal search library'
    ],
    focus: `- GitHub's search query language and syntax
- Searching issues, pull requests, code, and repositories
- Qualifier filters: author, label, language, date range
- Combining qualifiers for precise results
- Saved searches and search from the command line`
  },
  {
    number: 28,
    slug: 'branch-protection',
    title: 'Branch Protection and Rulesets',
    description: 'Required reviews, status checks, rulesets, and diagnosing blocked merges.',
    duration: '10-12 min',
    sources: ['appendix-k-branch-protection-rulesets.md'],
    concepts: [
      'Why branch protection exists: preventing accidental changes to main',
      'Branch protection rules: the classic approach',
      'Required pull request reviews before merging',
      'Required status checks: CI must pass before merge',
      'Requiring signed commits',
      'Restricting who can push to the branch',
      'Rulesets: the newer, more flexible approach',
      'Rulesets versus branch protection rules: key differences',
      'Creating a ruleset with tag and branch patterns',
      'Diagnosing why a push is rejected or a merge is blocked',
      'Bypass lists: allowing specific people or apps to bypass rules',
      'Common configurations: small team, open source project, enterprise'
    ],
    focus: `- Why branch protection exists
- Required reviews, status checks, and signed commits
- The newer Rulesets feature and how it differs
- Diagnosing why a push or merge is blocked
- Common branch protection configurations for teams`
  },
  {
    number: 29,
    slug: 'security-features',
    title: 'GitHub Security Features',
    description: 'Dependabot, secret scanning, code scanning, and private security advisories.',
    duration: '12-15 min',
    sources: ['appendix-l-github-security-features.md'],
    concepts: [
      'Why security matters in open source: supply chain risks',
      'Dependabot alerts: what they are and how they work',
      'Dependabot security updates: automatic PRs to fix vulnerabilities',
      'Dependabot version updates: keeping dependencies current',
      'Secret scanning: detecting leaked tokens, keys, and passwords in code',
      'What to do when a secret is detected: revoke and rotate',
      'Code scanning with CodeQL: static analysis for vulnerability detection',
      'Setting up code scanning with a GitHub Action',
      'Private security advisories: reporting vulnerabilities responsibly',
      'The Security tab on a repository',
      'Security policies: SECURITY.md file'
    ],
    focus: `- Dependabot: automated dependency updates and security alerts
- Secret scanning: detecting leaked tokens and keys
- Code scanning with CodeQL
- Private security advisories
- How to respond when a vulnerability is detected`
  },
  {
    number: 30,
    slug: 'vscode-accessibility-reference',
    title: 'VS Code Accessibility Reference',
    description: 'Complete accessibility settings, audio signals, diff viewer, and screen reader configs.',
    duration: '12-15 min',
    sources: ['appendix-m-vscode-accessibility-reference.md'],
    concepts: [
      'editor.accessibilitySupport setting and what it controls',
      'Screen reader mode indicators and behavior changes',
      'Audio cues: what each sound means and how to configure them',
      'Accessibility announcements: text-based status updates for screen readers',
      'The Accessible Diff Viewer: navigating code changes by keyboard',
      'Terminal accessibility: screen reader support in the integrated terminal',
      'NVDA-specific configuration for VS Code',
      'JAWS-specific configuration for VS Code',
      'VoiceOver-specific configuration for VS Code',
      'High contrast themes and zoom levels',
      'Keyboard-only navigation: all the shortcuts that matter',
      'Troubleshooting accessibility issues: common problems and fixes'
    ],
    focus: `- Every accessibility-related VS Code setting explained
- Audio signals and announcements configuration
- The accessible diff viewer
- Screen reader-specific configurations for NVDA, JAWS, VoiceOver
- Accessibility troubleshooting for common VS Code issues`
  },
  {
    number: 31,
    slug: 'github-codespaces',
    title: 'GitHub Codespaces',
    description: 'Cloud dev environments, accessibility setup, and screen reader usage.',
    duration: '10-12 min',
    sources: ['appendix-n-github-codespaces.md'],
    concepts: [
      'What a Codespace is: a cloud-hosted VS Code development environment',
      'When to use Codespaces versus local VS Code',
      'Creating a Codespace from a repository',
      'The Codespace startup experience: what happens when you click',
      'devcontainer.json: configuring the environment',
      'Accessibility in Codespaces: screen reader mode works the same',
      'Port forwarding: previewing web apps from a Codespace',
      'Free usage limits and billing',
      'Stopping, deleting, and managing Codespaces',
      'Codespaces on mobile and low-end devices'
    ],
    focus: `- What Codespaces are: cloud development environments
- Creating and connecting to a Codespace
- Accessibility setup in Codespaces
- Screen reader usage in the browser-based VS Code
- When to use Codespaces versus local VS Code`
  },
  {
    number: 32,
    slug: 'github-mobile',
    title: 'GitHub Mobile',
    description: 'VoiceOver and TalkBack guide for iOS and Android GitHub apps.',
    duration: '10-12 min',
    sources: ['appendix-o-github-mobile.md'],
    concepts: [
      'What GitHub Mobile offers: issues, PRs, notifications, code browsing',
      'Installing on iOS and Android',
      'VoiceOver navigation on iOS: swipe gestures, rotor usage',
      'TalkBack navigation on Android: swipe gestures, explore by touch',
      'Viewing and triaging notifications on mobile',
      'Reading and commenting on issues',
      'Reviewing pull request diffs on a small screen',
      'Code browsing and file navigation',
      'Current accessibility limitations of GitHub Mobile',
      'When mobile is useful versus when to use the desktop or web'
    ],
    focus: `- The GitHub Mobile app for iOS and Android
- VoiceOver navigation on iOS
- TalkBack navigation on Android
- Key features: notifications, issues, pull requests, code browsing
- Mobile-specific gestures and accessibility considerations`
  },
  {
    number: 33,
    slug: 'github-pages',
    title: 'Publishing with GitHub Pages',
    description: 'Free static site hosting, custom domains, HTTPS, and accessibility.',
    duration: '10-12 min',
    sources: ['appendix-p-github-pages.md'],
    concepts: [
      'What GitHub Pages is: free static site hosting from your repository',
      'Use cases: documentation, portfolios, project sites, blogs',
      'Setting up Pages: selecting a branch or the docs/ folder',
      'The default URL: username.github.io/repo-name',
      'Custom domains: configuring DNS and verifying',
      'HTTPS: enforced by default on GitHub Pages',
      'Jekyll: the default static site generator (brief overview)',
      'Using other generators: Hugo, Eleventy, Next.js static export',
      'GitHub Actions for custom build pipelines',
      'Building an accessible website: semantic HTML, skip links, contrast',
      'The 404 page and how to customize it'
    ],
    focus: `- What GitHub Pages is: free static site hosting from your repo
- Setting up Pages from a branch or the docs folder
- Custom domains and HTTPS
- Jekyll and static site generators
- Building an accessible website with GitHub Pages`
  },
  {
    number: 34,
    slug: 'github-actions',
    title: 'GitHub Actions and Workflows',
    description: 'Workflow YAML structure, CI/CD, automation, and the Actions marketplace.',
    duration: '15-18 min',
    sources: ['appendix-q-github-actions-workflows.md'],
    concepts: [
      'What GitHub Actions are: event-driven automation built into GitHub',
      'Workflows, events, jobs, steps, and actions: the hierarchy',
      'Where workflow files live: .github/workflows/*.yml',
      'YAML syntax basics for workflow files',
      'Trigger events: push, pull_request, schedule, workflow_dispatch',
      'Jobs and runners: ubuntu-latest, windows-latest, macos-latest',
      'Steps: running commands and using actions',
      'The marketplace: finding pre-built actions',
      'Common CI use case: run tests on every pull request',
      'Common CD use case: deploy to production on push to main',
      'Secrets and environment variables: storing API keys securely',
      'Matrix builds: testing across multiple versions',
      'Workflow artifacts: uploading test results and build output',
      'Status badges in README files',
      'Debugging failed workflows: reading run logs'
    ],
    focus: `- What GitHub Actions are: automated workflows triggered by events
- Workflow YAML file structure
- Common use cases: CI/CD, testing, deployment, automation
- Understanding runs, jobs, and steps
- Pre-built actions from the GitHub Marketplace`
  },
  {
    number: 35,
    slug: 'profile-sponsors-wikis',
    title: 'Profile, Sponsors, and Wikis',
    description: 'Profile README, GitHub Sponsors, and repository Wikis.',
    duration: '10-12 min',
    sources: ['appendix-r-github-profile-sponsors-wikis.md'],
    concepts: [
      'The profile page: what visitors see when they visit your GitHub',
      'Creating a profile README: the special username/username repository',
      'What to include in a profile README: introduction, skills, projects',
      'Making your profile README accessible: alt text, structure, links',
      'The contribution graph: what the green squares represent',
      'GitHub Sponsors: what it is and how it supports open source',
      'Setting up a sponsor profile as a maintainer',
      'GitHub Wikis: documentation alongside your repository',
      'Creating and editing wiki pages',
      'When to use a Wiki versus a docs/ folder versus a README'
    ],
    focus: `- Creating a profile README that represents you
- GitHub Sponsors: supporting open source maintainers
- GitHub Wikis: documentation alongside your repository
- Making your GitHub profile accessible and welcoming`
  },
  {
    number: 36,
    slug: 'organizations-templates',
    title: 'Organizations and Templates',
    description: 'GitHub Organizations, repository templates, visibility, and archiving.',
    duration: '10-12 min',
    sources: ['appendix-s-github-organizations-templates.md'],
    concepts: [
      'What a GitHub Organization is: a shared account for groups',
      'Creating an organization: free versus paid plans',
      'Teams within organizations: grouping members by role',
      'Organization roles: owner, member, billing manager',
      'Repository visibility in organizations: public, private, internal',
      'Repository templates: what they are and how to create one',
      'Using a template to create a new repository',
      'Template contents: files, branches, and what transfers',
      'Archiving a repository: what it does and when to do it',
      'Transferring repository ownership'
    ],
    focus: `- What GitHub Organizations are and when to create one
- Teams, roles, and permissions within an organization
- Repository templates: creating and using them
- Repository visibility: public, private, internal
- Archiving repositories`
  },
  {
    number: 37,
    slug: 'contributing-to-open-source',
    title: 'Contributing to Open Source',
    description: 'Finding issues, scoping contributions, the fork-to-PR workflow, and building habits.',
    duration: '12-15 min',
    sources: ['appendix-t-contributing-to-open-source.md'],
    crossRefs: [
      { label: 'GitHub Skills Catalog - continued learning', file: 'appendix-z-github-skills-catalog.md' }
    ],
    concepts: [
      'What counts as a contribution: code, docs, tests, reviews, issues',
      'Finding your first issue: good first issue and help wanted labels',
      'Evaluating a project: activity, responsiveness, Code of Conduct',
      'The contribution workflow: fork, clone, branch, commit, push, PR',
      'Reading CONTRIBUTING.md: every project has different expectations',
      'Scoping your contribution: start small, pick one thing',
      'Writing a PR description that maintainers will appreciate',
      'Responding to review feedback on your contribution',
      'Building a sustainable contribution habit after the workshop',
      'The GitHub Skills modules for continued structured learning',
      'Finding communities that welcome new contributors'
    ],
    focus: `- Finding your first issue: good first issue, help wanted labels
- Scoping a contribution: what counts as a contribution
- The fork, branch, commit, PR workflow end to end
- Writing pull request descriptions that maintainers appreciate
- Building a sustainable contribution habit after the workshop`
  },
  {
    number: 38,
    slug: 'resources',
    title: 'Resources and Links',
    description: 'Tools, references, communities, and continued learning paths.',
    duration: '8-10 min',
    sources: ['appendix-u-resources.md'],
    concepts: [
      'Official GitHub documentation and learning resources',
      'Git reference documentation and tutorials',
      'VS Code documentation and accessibility guides',
      'Screen reader-specific GitHub and VS Code guides',
      'Communities for blind and low-vision developers',
      'Accessibility-focused open source projects to contribute to',
      'Continued learning paths: GitHub Skills, freeCodeCamp, The Odin Project'
    ],
    focus: `- Every tool, link, and reference mentioned in this workshop
- Where to go for help after the workshop ends
- Communities for blind and low-vision developers
- Continued learning paths for Git, GitHub, and accessibility`
  },
  {
    number: 39,
    slug: 'accessibility-agents-reference',
    title: 'Accessibility Agents - Complete Reference',
    description: 'All 55 agents, all 54+ slash commands, customization, and troubleshooting.',
    duration: '15-18 min',
    sources: ['appendix-v-accessibility-agents-reference.md'],
    prerequisites: [
      { ep: 17, concept: 'Agent overview from Chapter 16' }
    ],
    concepts: [
      'Complete documentation for the 55 agents across 3 teams (Accessibility, GitHub Workflow, Developer Tools)',
      'All 54+ slash commands with detailed usage examples',
      'Agent input and output formats',
      'Customization: agent instruction files and settings',
      'Workspace configuration for agent behavior',
      'Troubleshooting: agent not responding, wrong output, context issues',
      'Building on the agent system for custom domain-specific agents',
      'Version compatibility and update patterns'
    ],
    focus: `- Detailed documentation for all 55 accessibility agents across 3 teams
- The complete list of 54+ slash commands with usage examples
- Customization options and workspace configuration
- Troubleshooting agent issues
- Building on the agent system for your own projects`
  },
  {
    number: 40,
    slug: 'copilot-reference',
    title: 'GitHub Copilot - Complete Reference',
    description: 'All Copilot features, chat participants, slash commands, and MCP servers.',
    duration: '12-15 min',
    sources: ['appendix-w-github-copilot-reference.md'],
    prerequisites: [
      { ep: 14, concept: 'Copilot basics from Chapter 13' }
    ],
    concepts: [
      'Complete Copilot feature inventory',
      'All chat participants: @workspace, @terminal, @vscode, and more',
      'All slash commands: /explain, /fix, /tests, /doc, /generate, etc.',
      'Copilot in the CLI: gh copilot suggest, gh copilot explain',
      'MCP servers: what they are and how Copilot uses them',
      'Custom instructions: .github/copilot-instructions.md patterns',
      'Prompt files: reusable prompt templates',
      'Model selection and its impact on Copilot behavior',
      'Copilot for pull requests: PR summaries and reviews'
    ],
    focus: `- All Copilot features in one reference
- Chat participants and what each one does
- Slash commands for Copilot Chat
- MCP servers and tool integration
- Custom instructions and prompt engineering tips`
  },
  {
    number: 41,
    slug: 'copilot-models',
    title: 'Copilot Billing and Models',
    description: 'Usage-based billing, GitHub AI Credits, model volatility, and durable model-selection guidance.',
    duration: '10-12 min',
    sources: ['appendix-x-copilot-models.md'],
    concepts: [
      'GitHub Copilot usage-based billing and GitHub AI Credits',
      'Which Copilot experiences consume credits and which do not',
      'Why model names, limits, and availability change over time',
      'How to check current access in GitHub Copilot settings',
      'How to choose a model by task rather than memorizing a fixed list',
      'How model selection affects chat, agents, and review workflows',
      'How organization policy can affect model access',
      'How to document model claims with dates and official sources'
    ],
    focus: `- Usage-based billing and GitHub AI Credits
- Which Copilot features consume credits
- Why model availability changes over time
- Choosing models by task and account policy
- Keeping model and billing claims source-backed`
  },
  {
    number: 42,
    slug: 'accessing-workshop-materials',
    title: 'Accessing Workshop Materials',
    description: 'Downloading the repository, reading offline, keeping updated, audio format.',
    duration: '8-10 min',
    sources: ['appendix-y-accessing-workshop-materials.md'],
    concepts: [
      'How to clone or download the workshop repository',
      'Reading materials in markdown versus HTML format',
      'Using the HTML site at community-access.org',
      'Reading offline: cloning and opening in VS Code or a text editor',
      'Keeping your copy updated: git pull',
      'The podcast audio series as an alternative format',
      'Printing or exporting materials for reference'
    ],
    focus: `- How to download the workshop repository
- Reading materials offline
- Keeping your copy updated with new content
- Alternative formats: HTML, markdown, audio`
  },
  {
    number: 43,
    slug: 'github-skills-catalog',
    title: 'GitHub Skills - Complete Course Catalog',
    description: 'All 36 GitHub Skills modules organized into six learning paths.',
    duration: '10-12 min',
    sources: ['appendix-z-github-skills-catalog.md'],
    concepts: [
      'What GitHub Skills is: free, interactive courses in your own repository',
      'How a GitHub Skills course works: template repo, actions bot, self-paced',
      'The six learning paths and who each is for',
      'Beginner path courses: Introduction to GitHub, etc.',
      'Collaborate path courses: reviewing PRs, managing merge conflicts',
      'Automate path courses: GitHub Actions, Pages, script automation',
      'Secure path courses: CodeQL, secret scanning, supply chain',
      'Manage path courses: Markdown, community management',
      'Advanced path courses: release workflows, admin features',
      'Prerequisites and recommended order within each path',
      'How to start a course and track your progress'
    ],
    focus: `- All 36 GitHub Skills training modules organized by learning path
- Prerequisites and difficulty levels for each module
- How to integrate GitHub Skills into your continued learning
- Recommended paths for different goals: contributor, maintainer, DevOps`
  },
  {
    number: 44,
    slug: 'choose-your-tools',
    title: 'Choose Your Tools',
    description: 'A guided tour of browser GitHub, github.dev, VS Code, GitHub Desktop, and the CLI.',
    duration: '10-12 min',
    sources: ['01-choose-your-tools.md'],
    concepts: [
      'Why the workshop teaches multiple tool paths instead of one right way',
      'Browser GitHub as the Day 1 foundation',
      'github.dev as the bridge from browser to editor',
      'VS Code as the full Day 2 workspace',
      'GitHub Desktop and CLI as optional alternate paths',
      'How screen reader users choose tools based on task, comfort, and access needs'
    ],
    focus: `- Comparing the five tool environments in plain language
- Choosing the right tool for the task and access need
- Reducing anxiety by making tool choice explicit`
  },
  {
    number: 45,
    slug: 'vscode-accessibility-deep-dive',
    title: 'VS Code Accessibility Deep Dive',
    description: 'Keyboard navigation, accessible views, terminal access, signals, speech, and Copilot accessibility in VS Code.',
    duration: '12-15 min',
    sources: ['12-vscode-accessibility.md'],
    crossRefs: [
      { label: 'VS Code accessibility reference', file: 'appendix-g-vscode-reference.md' }
    ],
    concepts: [
      'Accessible View and Accessible Help in VS Code',
      'Navigating panels, problems, terminal output, and diffs',
      'Accessibility signals and when audio cues help',
      'Speech and dictation features',
      'Reading Copilot responses accessibly',
      'Recovering focus when VS Code feels noisy or confusing'
    ],
    focus: `- Going beyond initial VS Code setup into daily accessible workflows
- Reading generated content and terminal output confidently
- Making VS Code calmer and more predictable for screen reader use`
  },
  {
    number: 46,
    slug: 'how-git-works',
    title: 'How Git Works: The Mental Model',
    description: 'Commits, branches, staging, local versus remote, push, pull, fetch, and why conflicts happen.',
    duration: '12-15 min',
    sources: ['13-how-git-works.md'],
    crossRefs: [
      { label: 'Git authentication reference', file: 'appendix-d-git-authentication.md' }
    ],
    concepts: [
      'The working tree, staging area, local repository, and remote repository',
      'What a commit stores and why commits are snapshots',
      'Branches as movable labels for lines of work',
      'Push, pull, fetch, and clone as directions of movement',
      'Why merge conflicts happen',
      'How the mental model makes VS Code source control less mysterious'
    ],
    focus: `- Building the mental model before asking learners to run Git commands
- Explaining local versus remote clearly
- Connecting Git concepts to Day 2 challenge work`
  },
  {
    number: 47,
    slug: 'fork-and-contribute',
    title: 'Fork and Contribute',
    description: 'The complete fork-based open source contribution workflow from fork to upstream pull request.',
    duration: '12-15 min',
    sources: ['18-fork-and-contribute.md'],
    crossRefs: [
      { label: 'Open source culture and etiquette', file: '08-open-source-culture.md' }
    ],
    concepts: [
      'Why forks exist and how they differ from branches and clones',
      'Origin versus upstream remotes',
      'Keeping a fork synchronized',
      'Opening a pull request from a fork to the original repository',
      'How maintainers review fork-based contributions',
      'Common permission and remote URL mistakes'
    ],
    focus: `- Turning classroom PR skills into real open source contribution
- Explaining fork, clone, branch, upstream, and origin without hand-waving
- Preparing learners for Accessibility Agents contribution work`
  },
  {
    number: 48,
    slug: 'build-your-agent-capstone',
    title: 'Build Your Agent: Capstone',
    description: 'Designing, writing, testing, and contributing a custom accessibility agent.',
    duration: '12-15 min',
    sources: ['20-build-your-agent.md'],
    crossRefs: [
      { label: 'Accessibility Agents overview', file: '19-accessibility-agents.md' },
      { label: 'Accessibility Agents reference', file: 'appendix-l-agents-reference.md' }
    ],
    concepts: [
      'Choosing an agent idea with a real user need',
      'Writing responsibilities, boundaries, and guardrails',
      'Designing accessible agent output',
      'Testing an agent prompt with realistic examples',
      'Preparing the capstone pull request',
      'How the capstone can continue asynchronously after the live event'
    ],
    focus: `- Coaching the capstone as design work, not just file creation
- Keeping human judgment central when building agents
- Helping learners finish asynchronously if needed`
  },
  {
    number: 49,
    slug: 'next-steps',
    title: 'What Comes Next',
    description: 'How to continue learning, contributing, and building confidence after the workshop.',
    duration: '8-10 min',
    sources: ['21-next-steps.md'],
    crossRefs: [
      { label: 'Resources and links', file: 'appendix-x-resources.md' },
      { label: 'GitHub Skills catalog', file: 'appendix-z-github-skills.md' }
    ],
    concepts: [
      'How to keep practicing without the live workshop structure',
      'Finding approachable issues and communities',
      'Turning workshop evidence into a portfolio story',
      'Continuing with GitHub Skills and Community Access resources',
      'Building a sustainable open source habit'
    ],
    focus: `- Helping learners leave with momentum
- Giving concrete next steps for continued contribution
- Normalizing slow, steady practice after the event`
  },
  {
    number: 50,
    slug: 'advanced-git-operations',
    title: 'Advanced Git Operations',
    description: 'Cherry-pick, rebase, revert, reset, tags, bisect, clean, and other Git recovery tools.',
    duration: '12-15 min',
    sources: ['appendix-e-advanced-git.md'],
    concepts: [
      'When advanced Git commands are useful and when to avoid them',
      'Revert versus reset as safer recovery language',
      'Cherry-pick for moving one commit',
      'Rebase and why history rewriting requires care',
      'Tags, bisect, reflog, and clean as reference tools',
      'Safety habits before running destructive commands'
    ],
    focus: `- Presenting advanced Git as a reference, not a Day 1 requirement
- Emphasizing safe recovery and coordination
- Helping screen reader users understand command output before acting`
  },
  {
    number: 51,
    slug: 'git-security-for-contributors',
    title: 'Git Security for Contributors',
    description: 'Secrets, .gitignore, environment variables, push protection, and safe contributor habits.',
    duration: '10-12 min',
    sources: ['appendix-f-git-security.md'],
    concepts: [
      'What counts as a secret and why secrets in Git are serious',
      'Using .gitignore to prevent accidental commits',
      'Environment variables and local configuration files',
      'GitHub secret scanning and push protection',
      'What to do if a secret is committed',
      'Security habits for new open source contributors'
    ],
    focus: `- Teaching security as contributor care
- Making secret prevention practical and non-scary
- Explaining recovery steps clearly if something leaks`
  },
  {
    number: 52,
    slug: 'github-desktop',
    title: 'GitHub Desktop',
    description: 'Using GitHub Desktop as an accessible alternative for cloning, branching, committing, and syncing.',
    duration: '10-12 min',
    sources: ['appendix-h-github-desktop.md'],
    concepts: [
      'Where GitHub Desktop fits among browser, VS Code, and CLI workflows',
      'Cloning repositories with GitHub Desktop',
      'Creating branches, reviewing changes, committing, and pushing',
      'Opening pull requests from GitHub Desktop',
      'Screen reader considerations and limitations',
      'When to switch to VS Code or the browser'
    ],
    focus: `- Giving learners an alternate local workflow
- Explaining GitHub Desktop without treating it as lesser
- Naming accessibility tradeoffs honestly`
  },
  {
    number: 53,
    slug: 'github-cli-reference',
    title: 'GitHub CLI Reference',
    description: 'Using the GitHub CLI for issues, pull requests, authentication, and automation-friendly workflows.',
    duration: '10-12 min',
    sources: ['appendix-i-github-cli.md'],
    concepts: [
      'What the GitHub CLI is and when it helps',
      'Authentication with gh auth login',
      'Listing and viewing issues and pull requests',
      'Creating pull requests from the terminal',
      'Screen reader-friendly command output practices',
      'When CLI workflows are faster than web navigation'
    ],
    focus: `- Introducing the CLI as an optional power tool
- Keeping command-line examples approachable
- Connecting CLI output to screen reader review habits`
  }
];

// ---------------------------------------------------------------------------
// Build logic
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildBundles() {
  ensureDir(BUNDLES_DIR);

  const total = episodes.length;
  let built = 0;
  let skipped = 0;

  for (const ep of episodes) {
    const pad = String(ep.number).padStart(2, '0');
    const outFile = path.join(BUNDLES_DIR, `ep${pad}-${ep.slug}.md`);

    // Read and concatenate source chapter(s)
    let sourceContent = '';
    let missingSource = false;

    for (const src of ep.sources) {
      const resolvedSrc = resolveSourceName(src);
      const srcPath = path.join(DOCS_DIR, resolvedSrc);
      if (!fs.existsSync(srcPath)) {
        console.error(`  Missing source: ${src} -> ${resolvedSrc} (Episode ${ep.number}: ${ep.title})`);
        missingSource = true;
        continue;
      }
      if (sourceContent) sourceContent += '\n\n---\n\n';
      if (resolvedSrc !== src) {
        sourceContent += `<!-- Source alias resolved from ${src} to ${resolvedSrc}. -->\n\n`;
      }
      sourceContent += fs.readFileSync(srcPath, 'utf-8');
    }

    if (missingSource && !sourceContent) {
      console.error(`  Skipped Episode ${ep.number}: all sources missing`);
      skipped++;
      continue;
    }

    // Read cross-referenced supplementary content
    let xrefContent = '';
    if (ep.crossRefs && ep.crossRefs.length > 0) {
      for (const xref of ep.crossRefs) {
        const resolvedXref = resolveSourceName(xref.file);
        const xrefPath = path.join(DOCS_DIR, resolvedXref);
        if (!fs.existsSync(xrefPath)) {
          console.warn(`  Warning: cross-ref missing: ${xref.file} -> ${resolvedXref} (Episode ${ep.number})`);
          continue;
        }
        xrefContent += `\n\n---\n\n### Supplementary: ${xref.label}\n\n`;
        if (resolvedXref !== xref.file) {
          xrefContent += `<!-- Cross-reference alias resolved from ${xref.file} to ${resolvedXref}. -->\n\n`;
        }
        xrefContent += fs.readFileSync(xrefPath, 'utf-8');
      }
    }

    // Build the bundle: prompt + primary source + cross-referenced content
    const prompt = buildPrompt(ep, total);
    const bundle = prompt + sourceContent + xrefContent;

    fs.writeFileSync(outFile, bundle, 'utf-8');
    built++;
    console.log(`  Episode ${pad}: ${ep.title}`);
  }

  console.log(`\nPodcast bundle build complete: ${built} episodes generated, ${skipped} skipped`);
  console.log(`Output directory: ${BUNDLES_DIR}`);

  // Write manifest JSON for use by generate-site.js
  const manifestPath = path.join(__dirname, 'manifest.json');
  const manifest = episodes.map(ep => {
    const pad = String(ep.number).padStart(2, '0');
    return {
      number: ep.number,
      slug: ep.slug,
      title: ep.title,
      description: ep.description || '',
      duration: ep.duration || '10-15 min',
      sources: ep.sources.map(resolveSourceName),
      bundle: `ep${pad}-${ep.slug}.md`,
      audio: `ep${pad}-${ep.slug}.mp3`,
      status: 'bundle-ready'
    };
  });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log(`Manifest written: ${manifestPath}`);
}

// Export episodes for other scripts
module.exports = { episodes, resolveSourceName, SOURCE_ALIASES };

// Run when called directly
if (require.main === module) {
  buildBundles();
}
