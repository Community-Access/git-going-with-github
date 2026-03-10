# Appendix J: GitHub Advanced Search
>
> **Listen to Episode 27:** [Advanced Search](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Finding Anything Across All of GitHub

> GitHub's search engine is powerful and underused. For screen reader users in particular, using the search bar with precise query syntax is often *faster and more accessible* than navigating filter dropdowns and checkbox menus. This reference covers the query language so you can filter anything from the keyboard.


## Table of Contents

1. [The Search Interface](#1-the-search-interface)
2. [Search Scopes](#2-search-scopes)
3. [The Core Query Language](#3-the-core-query-language)
4. [Searching Issues and Pull Requests](#4-searching-issues-and-pull-requests)
5. [Searching Code](#5-searching-code)
6. [Searching Commits](#6-searching-commits)
7. [Searching Repositories](#7-searching-repositories)
8. [Searching Users and Organizations](#8-searching-users-and-organizations)
9. [Practical Queries for This Workshop](#9-practical-queries-for-this-workshop)
10. [Saving and Reusing Searches](#10-saving-and-reusing-searches)


## 1. The Search Interface

GitHub's search is accessible from nearly any page:

- **Global search bar:** At the top of every GitHub page - keyboard shortcut `/` to focus it from anywhere (press `/`, then type)
- **Issues/PRs list:** Each tab has its own search bar pre-scoped to that repository
- **Advanced Search UI:** `github.com/search/advanced` - a form with individual fields for each filter. Accessible but verbose; query syntax below is faster.

### Keyboard to global search

```text
/ → Focus the global search bar (works on most GitHub pages)
Type your query → Enter
→ Results page opens, grouped by type (Code, Issues, PRs, Repositories, etc.)
```


## 2. Search Scopes

By default, GitHub searches across all of GitHub. Scope modifiers restrict results:

| Modifier | Scope |
| ---  | ---  |
| `repo:owner/name` | One specific repository |
| `org:orgname` | All repos in an organization |
| `user:username` | All repos owned by a user |
| `in:title` | Only matches in the title field |
| `in:body` | Only matches in the body field |
| `in:comments` | Only matches in comments |

**Example:** `repo:community-access/accessibility-agents in:title keyboard` finds issues/PRs whose titles mention "keyboard" in the accessibility-agents repo.


## 3. The Core Query Language

### Boolean Logic

| Syntax | Meaning |
| ---  | ---  |
| `word1 word2` | Both words (implicit AND) |
| `word1 OR word2` | Either word |
| `"exact phrase"` | Exact phrase match |
| `-word` | Exclude this word |
| `-label:bug` | Exclude items with this label |

### Common Qualifiers

| Qualifier | Meaning |
| ---  | ---  |
| `is:open` | Open items only |
| `is:closed` | Closed items only |
| `is:merged` | Merged PRs only |
| `is:unmerged` | Open or closed but not merged PRs |
| `is:issue` | Issues only |
| `is:pr` | Pull requests only |
| `is:draft` | Draft pull requests only |
| `label:name` | Items with this label |
| `no:label` | Items with no labels |
| `assignee:@me` | Assigned to you |
| `assignee:username` | Assigned to a specific user |
| `author:@me` | Created by you |
| `author:username` | Created by a specific user |
| `mentions:username` | Mentions a specific user |
| `involves:@me` | You are author, assignee, mentioned, or commented |
| `milestone:"Milestone Name"` | In a specific milestone |
| `no:milestone` | Not in any milestone |
| `no:assignee` | Not assigned to anyone |
| `comments:>5` | More than 5 comments |
| `reactions:>10` | More than 10 reactions |

### Date Qualifiers

| Qualifier | Meaning |
| ---  | ---  |
| `created:>2025-01-01` | Created after a date |
| `created:<2025-01-01` | Created before a date |
| `created:2025-01-01..2025-03-31` | Created in a date range |
| `updated:>2025-06-01` | Updated after a date |
| `closed:>2025-06-01` | Closed after a date |


## 4. Searching Issues and Pull Requests

### Going to the Issues search directly

GitHub's issue/PR search is at `github.com/issues` (your issues) or `github.com/pulls` (your PRs). The search bar there is pre-scoped to "repos you have access to involving you."

### Practical queries

#### Find all unassigned, open accessibility issues across an org

```text
org:community-access is:issue is:open label:accessibility no:assignee
```

#### Find good first issues in any language

```text
is:issue is:open label:"good first issue" no:assignee
```

#### Find good first issues in a specific language

```text
is:issue is:open label:"good first issue" language:python no:assignee
```

#### Find all PRs you need to review

```text
is:pr is:open review-requested:@me
```

#### Find all open PRs where you were mentioned

```text
is:pr is:open mentions:@me
```

#### Find your open issues across all repos

```text
is:issue is:open author:@me
```

#### Find issues that are stale (open, not updated in 6+ months)

```text
is:issue is:open repo:owner/name updated:<2024-08-01
```


## 5. Searching Code

Code search operates differently from issue search. As of 2024, GitHub uses an improved code search engine (sometimes called "code search v2") with better indexing.

### Basic code search

```text
repo:owner/name language:javascript aria-label
```

### Find uses of a function across a repo

```text
repo:owner/name symbol:handleKeyDown
```

### Find a pattern across all repos in an org

```text
org:community-access aria-hidden="true"
```

### Code search qualifiers

| Qualifier | Meaning |
| ---  | ---  |
| `language:python` | Filter by programming language |
| `path:src/` | Only files under this path |
| `filename:config.yml` | Only files with this name |
| `extension:md` | Only files with this extension |
| `symbol:functionName` | Search for a specific symbol/function name |
| `content:"exact string"` | Exact string match in file content |


## 6. Searching Commits

### Find commits with a keyword in the message

```text
repo:owner/name fix keyboard navigation
```

### Find commits by a specific author

```text
repo:owner/name author:username
```

### Find commits in a date range

```text
repo:owner/name committer-date:2025-01-01..2025-03-31
```

### Find commits that touched a specific file

```text
repo:owner/name path:docs/README.md
```


## 7. Searching Repositories

### Find accessible repos by topic

```text
topic:accessibility stars:>50 is:public
```

### Find repos with a specific language, sorted by stars

```text
language:typescript topic:screen-reader sort:stars-desc
```

### Repository qualifiers

| Qualifier | Meaning |
| ---  | ---  |
| `stars:>100` | More than 100 stars |
| `forks:>10` | More than 10 forks |
| `is:public` | Public repos only |
| `is:private` | Private repos only (requires access) |
| `topic:topicname` | Repos tagged with this topic |
| `license:mit` | Repos with an MIT license |
| `size:<1000` | Repos smaller than 1000 KB |
| `pushed:>2025-01-01` | Repos with recent activity |


## 8. Searching Users and Organizations

### Find users

```text
type:user location:Seattle followers:>100
```

### Find organizations

```text
type:org topic:accessibility
```


## 9. Practical Queries for This Workshop

Bookmark these for use during the hackathon:

### Find open contributions you can make right now in accessibility-agents

```text
repo:community-access/accessibility-agents is:issue is:open label:"good first issue" no:assignee
```

### Check whether your issue is already filed

```text
repo:community-access/accessibility-agents is:issue keyboard navigation
```

### Find all accessibility-related issues in a project

```text
repo:community-access/accessibility-agents is:issue label:accessibility is:open
```

### See all your merged PRs (proof of contribution)

```text
is:pr is:merged author:@me
```

### Find recent discussions about a topic

```text
repo:community-access/accessibility-agents in:discussions screen reader
```


## 10. Saving and Reusing Searches

GitHub does not have a built-in saved-search feature, but you can:

1. **Bookmark the URL** - every search result page has the query in the URL. Bookmark it in your browser for instant re-run.
2. **Pin in notifications** - if you're watching a repo, set up notification filters
3. **Accessibility Agents** - use `/my-issues` and `/my-prs` for your personal saved-search equivalents without leaving VS Code

### Example bookmarkable URL

```text
https://github.com/issues?q=is%3Aissue+is%3Aopen+assignee%3A%40me
```


*Return to: [Resources](appendix-x-resources.md) | [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
