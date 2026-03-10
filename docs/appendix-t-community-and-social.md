# Appendix T: Community and Social

> This appendix consolidates three related reference topics: GitHub profiles, sponsors, and wikis (formerly Appendix R), GitHub organizations and templates (formerly Appendix S), and GitHub social features (formerly Appendix AE).
>
> **Teaching chapter:** [Chapter 08: Open Source Culture and Contributing](08-open-source-culture.md)

---

## GitHub Profiles, Sponsors, and Wikis


>
> **Listen to Episode 35:** [Profile, Sponsors, and Wikis](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Building Your Community Presence on GitHub

> This appendix covers three community-facing GitHub features: your profile README (how the world sees you), GitHub Sponsors (financially supporting the people whose work you depend on), and GitHub Wikis (community-editable documentation inside a repository).


## Profile Customization

### The Special Profile README

GitHub has a hidden feature: if you create a repository named exactly **your-username/your-username** (e.g., `janesmith/janesmith`), the README in that repo appears on your GitHub profile page.

**This is your profile README.** It's a custom introduction visible to anyone who visits your profile.

### Creating Your Profile README

1. Create a **new repository**
2. Name it exactly `your-username` (match your GitHub username exactly, case-sensitive)
3. Make it **public**
4. Initialize with a README
5. Edit the README with whatever you want to show on your profile

#### What to include

- **Introduction:** Who you are, what you work on
- **Current focus:** What projects or technologies you're learning
- **Skills:** Languages, frameworks, tools (optional)
- **How to reach you:** Email, LinkedIn, personal site
- **Fun facts:** Hobbies, interests (optional-keeps it human)

#### Example profile README

```markdown
# Hi, I'm Jane Smith

I'm an accessibility advocate and open source contributor focused on making the web more inclusive.

## Current focus
- Contributing to NVDA documentation
- Building accessible React components
- Learning TypeScript

## Skills
- JavaScript, Python, HTML/CSS
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Git, GitHub, GitHub Actions

## Get in touch
- Email: jane@example.com
- LinkedIn: [linkedin.com/in/janesmith](https://linkedin.com/in/janesmith)

## Fun fact
I've been using screen readers for 8 years and believe accessible design is better design for everyone.
```

### Profile README Best Practices

**Keep it concise** - visitors skim, not read  
**Update occasionally** - a README from 2019 looks stale  
**Be authentic** - people connect with real humans, not buzzwords  
**Include links** - make it easy to learn more or get in touch  

**Avoid excessive badges** - 50 skill badges is visual clutter and screen reader noise  
**Skip auto-generated stats** - "commits per day" widgets are often inaccessible  
**Don't overthink it** - a simple paragraph is better than nothing  

### Screen Reader Considerations

- **Use headings** (`##`) for structure
- **Provide alt text** for any images: `![Description of image](url)`
- **Avoid ASCII art** - screen readers read it character by character (annoying)
- **Test your README** with a screen reader before publishing

### Other Profile Customizations

#### Pinned repositories (up to 6)

- Highlight your best work on your profile
- Navigate to your profile → Select "Customize your pins"
- Choose which repos appear first

#### Contribution graph

- Shows your GitHub activity over the past year
- Green squares indicate days with commits, PRs, issues, etc.
- Cannot be customized but reflects consistent contribution

#### Status

- Set a temporary status message (e.g., "On vacation until March 15")
- Navigate to your profile → Select the smile icon → Set status


## GitHub Sponsors (Supporting Open Source)

### What Is GitHub Sponsors?

GitHub Sponsors lets you financially support developers and projects you depend on. It's like Patreon for open source.

#### How it works

- Developers/projects create a Sponsors profile
- You choose a monthly sponsorship tier ($5, $10, $25/month, etc.)
- Your payment goes directly to the developer (GitHub takes no fees)

### Why Sponsor?

- **Sustainability:** Many open source maintainers volunteer their time. Sponsorships help them keep projects alive.
- **Gratitude:** If a project saved you hours of work, sponsorship is a way to say thanks.
- **Priority support:** Some maintainers offer sponsor-only Discord access, early releases, or prioritized bug fixes.

### How to Sponsor

1. Navigate to a user or repository's GitHub page
2. Look for the **"Sponsor"** button (heart icon)
3. Choose a tier or custom amount
4. Select payment method (credit card or PayPal)
5. GitHub sends a receipt; your sponsorship appears on your profile (optionally publicly)

#### Screen reader navigation

- The Sponsor button appears near the profile photo or repo name
- Press `B` to cycle through buttons on the page until you hear "Sponsor"

### Can I Receive Sponsorships?

Yes! If you maintain an open source project or contribute regularly:

1. Navigate to [github.com/sponsors](https://github.com/sponsors)
2. Select "Join the waitlist" or "Set up sponsors"
3. Connect a payment method (Stripe or bank account)
4. Create sponsor tiers with descriptions
5. Promote your Sponsors page to your audience

Many accessibility advocates successfully use Sponsors to fund their work improving assistive technology and inclusive design.


## GitHub Wikis

### What Is a GitHub Wiki?

Every repository can have a wiki - a space for documentation separate from the code. It's lightweight and Markdown-based.

#### When to use a wiki

- Multi-page documentation (tutorials, guides, FAQs)
- Community-editable docs (wikis can be editable by anyone)
- Knowledge that doesn't belong in README (too long, too specific)

#### When NOT to use a wiki

- Your project already uses GitHub Pages or external docs
- Documentation needs to be version-controlled with code (wikis are separate Git repos)
- You want full control (wikis are less customizable than Pages)

### Accessing a Repo's Wiki

1. Navigate to the repository
2. Select the **"Wiki"** tab
3. If no wiki exists, you'll see "Create the first page"

### Creating Wiki Pages

1. Go to the Wiki tab
2. Select **"New page"**
3. Add a **title** and **content** (Markdown)
4. Select **"Save"**

Wiki pages automatically appear in a sidebar for navigation.

### Wiki Accessibility

- GitHub's wiki editor is the same as the issue/PR comment editor
- All Markdown features work (headings, lists, links, code blocks)
- Use proper heading hierarchy (`##`, `###`) for screen reader navigation
- Link between wiki pages: `[[Page Title]]`
- **Screen reader caveat:** Wiki pages are a separate Git repository. Any changes pushed directly to the wiki's git remote are not tracked by the main repository's branch protection - meaning no PR review process applies. Treat wikis as community-editable supplementary docs, not your primary critical documentation source.


*Return to: [Resources](appendix-x-resources.md) | [Appendix S - Organizations and Templates](appendix-t-community-and-social.md) | [Appendix G - GitHub Discussions](appendix-u-discussions-and-gists.md) | [Appendix T - Contributing to Open Source](08-open-source-culture.md) | [Appendix A - Glossary](appendix-a-glossary.md)*

---

## GitHub Organizations and Templates

>
> **Listen to Episode 36:** [Organizations and Templates](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## A Contributor's Guide to GitHub's Structural Features

> This appendix covers three features that shape how repositories and communities are organized on GitHub: repository templates (how new projects are bootstrapped), GitHub organizations (the account type behind most open source projects and companies), and repository settings (the configuration that governs visibility, archiving, and other behavior contributors encounter in the wild).


## Repository Templates

### Template vs. Fork - Which One?

These are two very different actions that both appear near the "Code" button:

| Action | Use when... | What you get |
| --------  | -------------  | -------------  |
| **Fork** | Contributing back to the original project | Full git history; your changes can be PRed upstream |
| **Use this template** | Starting a *new* project based on the structure | Clean git history; no connection to the original repo |

GitHub Skills courses use **"Use this template"** - you start fresh with the course scaffold but your copy has no upstream connection.

accessibility-agents could serve as a template if you want to build your own agent suite starting from its structure without forking.

### Creating a Template Repository

Maintainers can mark any repository as a template:

1. Navigate to the repository's **Settings** tab
2. Scroll to the **"General"** section → find the **"Template repository"** checkbox
3. Check it and save
4. The repository now shows a **"Use this template"** button instead of (or alongside) "Fork"

### Using a Template Repository

1. Navigate to the template repository
2. Select **"Use this template"** button (near the top, next to "Code")
3. Select **"Create a new repository"**
4. Name your new repository, choose visibility, and confirm
5. GitHub creates a new repository with the template's files but **no commit history**

#### Screen reader path

```text
B → navigate buttons → find "Use this template" → Enter
↓ → "Create a new repository" from the dropdown → Enter
```


## GitHub Organizations - A Contributor's View

### What Is an Organization?

A GitHub organization is an account that multiple people share. Instead of `github.com/username/repo`, organization repos live at `github.com/org-name/repo`. The workshop's central project lives at `github.com/community-access/accessibility-agents` - `community-access` is an organization.

| Personal Account | Organization Account |
| -----------------  | ---------------------  |
| Owned by one person | Shared by a team or community |
| Single-person repos | Repos are shared assets |
| Your profile at `github.com/username` | Org profile at `github.com/org-name` |
| You are the only admin | Has owners, members, and optional teams |

### Joining an Organization

Maintainers can invite you to join. When invited:

1. You receive an email + GitHub notification
2. Navigate to [github.com/settings/organizations](https://github.com/settings/organizations) to accept
3. Or click the link in the invitation email

You can also be a **public contributor** to an org repo without being a member - you fork the repo and submit PRs without needing an invitation.

### Organization Membership Visibility

- By default, your org membership is **private** (only you and org owners can see it)
- You can set it to **public** in your organization membership settings
- Public membership appears on your GitHub profile under "Organizations"
- For `community-access`: if you become a member, set your membership public to show your contribution publicly on your profile

### Teams Inside Organizations

Organizations can create **teams** (e.g., `@community-access/accessibility-reviewers`). When you see a team mentioned in a PR or issue, that `@mention` notifies everyone on that team. As a contributor, you don't need to create teams - just understand why you see them.

### Navigating an Organization Profile Page

At `github.com/community-access`:

```text
H → headings: org name, People, Repositories, Projects sections
1 → jumps to the org name heading
Links → navigate to individual repositories, members, and projects
```

Organization-level Projects (like the `community-access` project board) appear in the org's Projects tab, not inside any single repository.


## Repository Settings - What Contributors Need to Know

You may not have Settings access to most repositories (that requires maintainer role). But knowing what's there helps you understand why a repository behaves the way it does.

### Repository Visibility

| Setting | What it means for contributors |
| ---------  | -------------------------------  |
| **Public** | Anyone can view and fork; you don't need an account to read it |
| **Private** | Only invited users can see or contribute |
| **Internal** (org only) | Visible to all org members; cannot be forked outside the org |

The repository's visibility label appears on its page. Screen readers: the visibility badge is usually near the repo name heading (`H1`).

### Archived Repositories

When a maintainer archives a repository, it becomes **read-only**:

- No new issues, PRs, or comments can be created
- Existing content is fully preserved and viewable
- The UI shows a yellow banner: "This repository has been archived by the owner."
- Screen readers: NVDA/JAWS will read this banner when you navigate to the top of the page with `Ctrl+Home`

If you find a repo you planned to contribute to is archived, look for a fork or successor project.

### Repository Topics

Topics are keyword tags on a repository (e.g., `accessibility`, `screen-reader`, `open-source`). They appear as colored chips on the repository home page and improve discoverability in GitHub search.

- **As a contributor:** Topics tell you what the project is about at a glance
- **As a maintainer:** Add topics in Settings → General → Topics section to improve search ranking
- **Screen reader:** Topics are links in the "About" sidebar section; use `B` (next button) or Links list to reach them

### Default Branch Name

The default branch is the one all PRs target by default. Modern projects use `main`; older projects may use `master` or another name. When you clone and create a branch, you always branch from the repository's default branch.

The default branch name appears in the branch selector at the top of the Code tab.


*Return to: [Resources](appendix-x-resources.md) | [Appendix R - GitHub Profile, Sponsors, and Wikis](appendix-t-community-and-social.md) | [Appendix A - Glossary](appendix-a-glossary.md)*

---

## GitHub Social Features

>
> **Episode coming soon:** GitHub Social - a conversational audio overview of this appendix. Listen before reading to preview the concepts, or after to reinforce what you learned.

## GitHub Is More Than a Code Host — It's a Community

> **Who this is for:** You have learned the basics of GitHub and want to know how to use it as a social platform — discovering interesting projects, following developers whose work you admire, and building a presence in the open source community. This appendix covers the social layer of GitHub that most tutorials skip entirely.

GitHub has over 100 million developers on it. The social features — stars, follows, Explore, Topics, trending repos — are how you find the interesting ones, stay connected to projects you care about, and make yourself visible to the community.

---

## Table of Contents

1. [Stars — Bookmarking and Signaling Projects You Love](#1-stars--bookmarking-and-signaling-projects-you-love)
2. [Watching Repositories — Staying in the Loop](#2-watching-repositories--staying-in-the-loop)
3. [Following People — Building Your Developer Network](#3-following-people--building-your-developer-network)
4. [Your Home Feed — What You See When You Log In](#4-your-home-feed--what-you-see-when-you-log-in)
5. [GitHub Explore — Discovering New Projects](#5-github-explore--discovering-new-projects)
6. [Trending — What's Popular Right Now](#6-trending--whats-popular-right-now)
7. [Topics — Finding Projects by Category](#7-topics--finding-projects-by-category)
8. [GitHub Lists — Organizing Your Stars](#8-github-lists--organizing-your-stars)
9. [Finding Accessible and Inclusive Projects](#9-finding-accessible-and-inclusive-projects)
10. [Building Your Own Presence](#10-building-your-own-presence)
11. [The GitHub CLI for Social Features](#11-the-github-cli-for-social-features)
12. [Screen Reader Navigation Guide](#12-screen-reader-navigation-guide)

---

## 1. Stars — Bookmarking and Signaling Projects You Love

### What a star is

A star is GitHub's version of a bookmark combined with a "like." When you star a repository:

- It saves to your starred list at `github.com/username?tab=stars` — easy to find later
- It signals to the maintainer that their work is valued
- It contributes to the project's star count, which helps others discover it
- It may appear in your followers' feeds

### Why star count matters to projects

Star counts are a social proof signal — developers browsing for tools often sort by stars to find well-regarded projects. A project going from 10 stars to 1,000 stars can dramatically change how many contributors it attracts. Your star genuinely matters.

### How to star a repository

#### GitHub.com

On any repository page, the **Star** button is in the top-right area of the repository header, next to Fork.

- Click **Star** to star the repository — the button changes to **Starred** with a filled star icon
- Click the **dropdown arrow** next to Star to choose a List to organize it into (see [Section 8](#8-github-lists--organizing-your-stars))
- Click **Starred** to unstar

#### Keyboard shortcut

On a repository page, press `g` then `s` to toggle the star.

#### Screen reader navigation

- NVDA/JAWS: The Star button is in the page region after the repository title heading. Navigate by button (`B`) or Tab to find it. It's announced as "Star this repository" or "Unstar this repository."
- VoiceOver: `VO+Command+J` to jump to buttons, or `Tab` through the header area. The button label changes between "Star" and "Starred."

#### GitHub CLI

```bash
# Star a repository
gh api user/starred/owner/repo --method PUT

# Unstar a repository
gh api user/starred/owner/repo --method DELETE

# List your starred repositories
gh api user/starred --jq '.[].full_name'

# Check if you've starred a repo
gh api user/starred/owner/repo --silent && echo "Starred" || echo "Not starred"
```

### Viewing your stars

Go to `github.com/username?tab=stars` — or click your avatar → **Your stars**.

You'll see all your starred repositories sorted by most recently starred. Use the search box to filter by name, and the language filter to narrow by programming language.

---

## 2. Watching Repositories — Staying in the Loop

### What watching does

When you watch a repository, GitHub sends you notifications about activity in it — new issues, pull requests, releases, and more. Unlike stars (which are passive bookmarks), watching is active — you're opting into the conversation.

### Watch levels

GitHub gives you granular control over how much you hear from a repo:

| Level | What you receive |
|-------|-----------------|
| **Not watching** | Only notified if you're mentioned or have participated |
| **Participating and @mentions** | Notified for threads you're in or @mentioned in (default for repos you contribute to) |
| **All Activity** | Every issue, PR, comment, and release — for very active repos this can be noisy |
| **Releases only** | Only new releases — great for tools you use and want to know when they update |
| **Ignore** | Never notified, even if mentioned (useful for very noisy forks) |

### How to watch a repository

On any repository page, the **Watch** button is next to the Star button in the header.

1. Click **Watch** to open the dropdown
2. Choose your notification level
3. The button updates to show your current setting

> **Tip:** For most repositories you contribute to, **"Participating and @mentions"** is the right level — you hear about threads you're in without inbox overload. Use **"Releases only"** for dependencies and tools you use but don't contribute to.

#### GitHub CLI

```bash
# Watch a repository (all activity)
gh api repos/owner/repo/subscription --method PUT --field subscribed=true

# Watch releases only (requires GitHub.com — not available via API alone)
# Use the web UI for granular watch levels

# Ignore a repository
gh api repos/owner/repo/subscription --method PUT --field ignored=true

# List repositories you're watching
gh api user/subscriptions --jq '.[].full_name'

# Stop watching a repository
gh api repos/owner/repo/subscription --method DELETE
```

---

## 3. Following People — Building Your Developer Network

### What following does

When you follow a developer on GitHub:

- Their public activity appears in your home feed
- You see when they star a repository, create a new repo, or get a new follower
- They receive a notification that you followed them
- You appear in their followers list

Following is one-way (like Twitter/X) — they don't need to follow you back.

### Who to follow

**Start with people whose work you already use:**
- Maintainers of tools and libraries you use daily
- Authors of blog posts or talks that helped you learn
- Developers in accessibility, open source, or your tech stack

**Find them by:**
- Visiting the **Contributors** tab of a repository you love: `github.com/owner/repo/graphs/contributors`
- Checking who opened issues or PRs you found valuable
- Looking at who your existing follows follow

### How to follow someone

On any user profile page (`github.com/username`), click the **Follow** button below their avatar. The button changes to **Following**.

To unfollow: click **Following** → it changes back to **Follow**.

#### Screen reader navigation

- Navigate to the profile page
- The Follow/Following button is near the top of the page, below the avatar and bio
- NVDA/JAWS: press `B` to jump to buttons; the button is labelled "Follow [username]"
- VoiceOver: Tab to the button or use `VO+Command+J`

#### GitHub CLI

```bash
# Follow a user
gh api user/following/username --method PUT

# Unfollow a user
gh api user/following/username --method DELETE

# List who you're following
gh api user/following --jq '.[].login'

# List your followers
gh api user/followers --jq '.[].login'

# Check if you follow a specific person
gh api user/following/username --silent && echo "Following" || echo "Not following"

# See who a user follows (useful for discovering new people)
gh api users/username/following --jq '.[].login'
```

### Viewing someone's profile

A GitHub profile shows:
- **Pinned repositories** — the 6 repos they've chosen to highlight
- **Contribution graph** — a visual grid of their activity over the past year (green squares = more activity)
- **Recent activity** — PRs opened, issues commented on, repos starred
- **Repositories** — all their public repos
- **Stars** — repos they've starred (great for discovery)
- **Followers / Following** counts

> **Screen reader tip:** The contribution graph is a visual calendar that screen readers may announce as a table or grid. Navigate with arrow keys to read individual day entries — each cell describes the date and number of contributions.

---

## 4. Your Home Feed — What You See When You Log In

When you go to `github.com` while logged in, your **home feed** shows activity from people and repositories you follow or watch.

### What appears in your feed

- Repositories starred by people you follow — "Jane starred awesome-accessibility"
- New repositories created by people you follow
- Releases from repositories you watch
- Public activity from people you follow (PRs opened, issues commented on)
- **"For you" recommendations** — GitHub suggests repos and people based on your activity

### Your feed is a discovery tool

One of the best ways to find new interesting projects is to follow a few active developers in your area of interest and watch what they star. If 5 people you respect all starred the same new tool this week, it's probably worth a look.

### Customising your feed

There's no fine-grained feed filter — you control the feed by controlling who you follow and what you watch. Unfollow noisy accounts, follow more focused ones.

---

## 5. GitHub Explore — Discovering New Projects

**GitHub Explore** at [github.com/explore](https://github.com/explore) is the discovery hub — curated collections, trending repos, and personalised recommendations.

### What Explore shows

- **Trending** — most-starred repos this week (see [Section 6](#6-trending--whats-popular-right-now))
- **Topics** — browse by subject area (see [Section 7](#7-topics--finding-projects-by-category))
- **Collections** — curated lists of thematically related repos (e.g., "Tools for Open Source", "Accessibility Projects")
- **"For you" personalised recommendations** — based on your stars, follows, and language preferences

### Navigating Explore with a screen reader

1. Go to [github.com/explore](https://github.com/explore)
2. The page uses landmark regions — jump to `main` to skip navigation
3. Collections and trending repos are listed as article/heading groups
4. Use heading navigation (`H`) to jump between sections
5. Each repo entry has a heading (repo name as a link), language badge, star count, and description

---

## 6. Trending — What's Popular Right Now

**GitHub Trending** at [github.com/trending](https://github.com/trending) shows repositories gaining the most stars over a time period. It's one of the best places to discover new tools before everyone else knows about them.

### Filtering trending

Use the dropdowns at the top of the page to filter by:

| Filter | Options |
|--------|---------|
| **Language** | Any programming language, or "All languages" |
| **Time period** | Today, This week, This month |

### Trending developers

Switch to [github.com/trending/developers](https://github.com/trending/developers) to see which developers are gaining the most followers — another great way to find people to follow.

### GitHub CLI

```bash
# Trending repos aren't in the official API, but you can get recently starred popular repos:
gh search repos --sort stars --order desc --limit 20 --language markdown

# Trending in a specific language
gh search repos --sort stars --order desc --limit 20 --language python
```

---

## 7. Topics — Finding Projects by Category

Every repository can be tagged with **topics** — keywords like `accessibility`, `screen-reader`, `wcag`, `python`, `machine-learning`. Topics are how maintainers categorise their work so others can discover it.

### Browsing topics

Click any topic tag on a repository page to see all repos tagged with that topic. Or go directly:

```
https://github.com/topics/accessibility
https://github.com/topics/screen-reader
https://github.com/topics/good-first-issue
```

### Useful topics for this community

| Topic | What you'll find |
|-------|-----------------|
| `accessibility` | Tools, frameworks, and guides focused on a11y |
| `screen-reader` | Projects specifically for screen reader users |
| `wcag` | WCAG compliance tools and resources |
| `a11y` | Short form of accessibility — many projects use this |
| `good-first-issue` | Projects that welcome newcomers |
| `help-wanted` | Projects actively looking for contributors |
| `open-source` | General open source projects |
| `assistive-technology` | AT tools and resources |

### GitHub CLI

```bash
# Search for repos with a specific topic
gh search repos --topic accessibility --limit 20
gh search repos --topic screen-reader --stars ">50"

# Add a topic to your own repository
gh api repos/owner/repo/topics --method PUT --field names[]="accessibility" --field names[]="screen-reader"
```

---

## 8. GitHub Lists — Organizing Your Stars

Lists let you group your starred repositories into named collections — like playlists for code. Instead of one big pile of stars, you can have "Accessibility Tools," "Learning Resources," "Projects I Contribute To," etc.

### Creating a list

1. Go to your stars: `github.com/username?tab=stars`
2. Select **"Create list"** (top right of the stars page)
3. Give it a name and optional description
4. Select **"Create"**

Or create a list while starring:

1. On a repo page, click the **dropdown arrow** next to the Star button
2. Select **"Create a list"** or add to an existing list

### Adding repos to lists

- From any repo page: Star dropdown → check the list name
- From your stars page: click the list icon on any starred repo row

### Viewing and sharing lists

Your lists are public at `github.com/username?tab=stars` — anyone can browse them. This is useful for sharing curated resources with your community.

### GitHub CLI

```bash
# Lists are managed through the GitHub web interface only
# You can view stars via CLI:
gh api user/starred --jq '.[] | {name: .full_name, description: .description}' | head -20
```

---

## 9. Finding Accessible and Inclusive Projects

If you're specifically looking for projects that welcome contributors with disabilities, or that focus on accessibility work, here are the best ways to find them.

### Search strategies

```bash
# Search for accessibility-focused repos
gh search repos "accessibility" --topic a11y --stars ">100"

# Find repos with good first issues in accessibility
gh search issues "accessibility" --label "good first issue" --state open

# Find issues tagged both "accessibility" and "help wanted"
gh search issues --label "accessibility" --label "help wanted" --state open
```

On GitHub.com:
- [github.com/topics/accessibility](https://github.com/topics/accessibility)
- [github.com/topics/wcag](https://github.com/topics/wcag)
- [github.com/topics/screen-reader](https://github.com/topics/screen-reader)

### Organisations to follow

GitHub organisations are collections of repos grouped by a team or company. You can follow an org to get notified of their public activity.

Notable accessibility-focused organisations on GitHub:
- [github.com/Community-Access](https://github.com/Community-Access) — the organisation behind this workshop
- Search for `org:github accessibility` to find GitHub's own accessibility work
- Many assistive technology companies have open source components on GitHub — search for your AT provider

### Looking at who your community follows

If you follow someone doing accessibility work, browse **their stars** and **their following list** — this is one of the fastest ways to discover the accessibility community on GitHub.

---

## 10. Building Your Own Presence

Being visible on GitHub matters when you want to collaborate with others, get hired, or establish yourself as a contributor.

### Your contribution graph

The green grid on your profile shows your public contribution activity over the past year. Contributions count when you:

- Push commits to a public repo
- Open, comment on, or close issues or PRs in a public repo
- Review a PR in a public repo

> **Note:** Contributions to private repos only appear as grey squares unless the repo is made public later. Commits only count if they're made with the email address associated with your GitHub account.

### Pinning repositories

Pin up to 6 repositories (your own or repos you've contributed to) on your profile:

1. Go to your profile (`github.com/username`)
2. Select **"Customize your pins"** above the pinned repos section
3. Check up to 6 repos to pin — prioritise your best work and most active contributions

### Your profile README

Create a special repository named exactly the same as your username (`github.com/username/username`) and its `README.md` will appear at the top of your profile page. This is your chance to introduce yourself, list your skills, and share what you're working on.

See [Appendix R: Profile, Sponsors, and Wikis](appendix-t-community-and-social.md) for a full guide on building a great profile README.

### Activity tips

- **Comment thoughtfully on issues** — even "I can reproduce this on Windows 11 with NVDA" is a valued contribution that shows on your profile
- **Star generously** — it signals your interests and others see it in their feeds
- **Follow people in your area** — they often follow back, growing your network organically

---

## 11. The GitHub CLI for Social Features

```bash
# --- Following ---
gh api user/following/username --method PUT        # Follow someone
gh api user/following/username --method DELETE     # Unfollow
gh api user/following --jq '.[].login'             # List who you follow
gh api user/followers --jq '.[].login'             # List your followers

# --- Stars ---
gh api user/starred/owner/repo --method PUT        # Star a repo
gh api user/starred/owner/repo --method DELETE     # Unstar a repo
gh api user/starred --jq '.[].full_name'           # List your stars

# --- Discovery ---
gh search repos --topic accessibility --limit 20   # Browse by topic
gh search repos --sort stars --order desc --limit 20   # Popular repos
gh search users "accessibility developer" --limit 10   # Find people

# --- Watching ---
gh api repos/owner/repo/subscription \
  --method PUT --field subscribed=true             # Watch a repo
gh api user/subscriptions --jq '.[].full_name'     # List watched repos
```

---

## 12. Screen Reader Navigation Guide

### Following a user

1. Navigate to `github.com/username`
2. Press `H` to jump through headings to find the user's name at the top
3. Tab forward — the Follow/Following button is within the first few interactive elements after the avatar/bio area
4. Press `Enter` or `Space` to follow; the button label updates to "Following [username]"

### Starring a repository

1. Navigate to any repository page
2. The Star button is in the repository header, near the Fork button
3. Press `B` (NVDA/JAWS) to navigate by button, or Tab through the header
4. The button is announced as "Star this repository" or "Unstar this repository"
5. After starring, the button label changes and a count updates

### Browsing your stars

1. Go to `github.com/username?tab=stars`
2. Jump to `main` landmark to skip navigation
3. Each starred repo is a heading (H3) with a link — navigate with `H` or `3`
4. Below each heading: description text, language, star count, and list controls

### Exploring topics

1. Go to `github.com/topics/accessibility` (or any topic)
2. Jump to `main` landmark
3. Repos are listed as article regions with H3 headings
4. Each entry has: repo name (link), owner, description, language, star count, and a Star button

### GitHub Explore and Trending

1. Go to `github.com/explore` or `github.com/trending`
2. Use `H` to navigate between sections and repo entries
3. Trending page has language and time period filter dropdowns near the top — Tab to find them
4. Each trending repo row has: rank position, repo name (link), description, star count, and "Stars today" count

---

*Related appendices: [Appendix R: Profile, Sponsors, and Wikis](appendix-t-community-and-social.md) · [Appendix J: Advanced Search](appendix-n-advanced-search.md) · [Appendix T: Contributing to Open Source](08-open-source-culture.md) · [Appendix AC: GitHub CLI Reference](appendix-i-github-cli.md)*
