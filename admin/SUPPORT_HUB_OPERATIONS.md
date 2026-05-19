# Support Hub Operations

This guide defines how we run the open, post-workshop support repository for GIT Going with GitHub.

## Canonical Support Repository

- Repository name: `Community-Access/support`
- Repository URL: <https://github.com/Community-Access/support>
- Repository visibility: Public
- Primary purpose: post-workshop support, async Q&A, troubleshooting, and alumni collaboration

This repository does not replace curriculum source repositories. It routes support traffic away from curriculum maintenance and keeps student support visible and searchable.

## Student Onboarding Model (Rich Path)

Use this onboarding flow for every new cohort:

1. Share Support Hub URL in registration confirmation and Day 2 close-out.
2. Ask students to read pinned Start Here content in Discussions.
3. Ask students to post one introduction in Discussions and one support request using templates if blocked.
4. Point students to labels and categories so they can self-route requests.

Onboarding success criteria:

- Students can explain the difference between support issues and discussions.
- Students can open a support issue with reproducible steps.
- Students can find and follow a resolved discussion thread.

## What Belongs In Support Hub

Use Support Hub for:

- Student setup and access questions
- Post-workshop troubleshooting questions
- Accessibility workflow questions
- Alumni sharing and follow-up help
- Requests for clarification in workshop docs

Do not use Support Hub for:

- Direct edits to workshop curriculum content
- Template workflow code changes
- Security disclosures

Routing:

- Curriculum and content changes: <https://github.com/Community-Access/git-going-with-github>
- Learning Room template changes: <https://github.com/Community-Access/learning-room-template>
- Security reports: follow [../SECURITY.md](../SECURITY.md)

## Recommended Support Taxonomy

### Discussions categories

- `Q&A`
- `Troubleshooting`
- `Success Stories`
- `Announcements`
- `Office Hours`

### Labels

- `needs-triage`
- `setup`
- `classroom`
- `accessibility`
- `copilot`
- `resolved`
- `escalated`

## Response Standards

- First response target: 24 to 48 hours
- Triage cadence during active cohorts: daily
- Triage cadence off-cycle: 3 times per week

## Moderator Playbook

1. Acknowledge the question and restate the goal.
2. Provide one clear next action.
3. Link to the exact workshop doc section when relevant.
4. Ask for diagnostics only if needed.
5. Mark `resolved` when the user confirms or the path is complete.

## Privacy And Safety Rules

- Do not request personal data in public issues/discussions.
- Never ask users to post tokens, secrets, or private repository URLs publicly.
- For sensitive account problems, move to private facilitator contact.

## Integration Checklist

- [ ] `REGISTER.md` and registration workflow comments point to Support Hub.
- [ ] Facilitator guides reference Support Hub as the alumni channel.
- [ ] `docs/22-what-comes-next.md` points learners to Support Hub.
- [ ] Go-live checklist includes Support Hub readiness.
- [ ] Podcast scripts/transcripts reference Support Hub as the default help path.

## Reset And Rebuild (From Scratch)

If the support environment drifts or needs a hard reset, run:

```powershell
scripts/classroom/Reset-SupportHubEnvironment.ps1
```

This script re-applies repository baseline setup:

- Repository existence and visibility
- Issues and Discussions enabled
- Support label taxonomy
- Baseline support files and bot workflows

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Canonical Support Repository:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Student Onboarding Model (Rich Path):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Copilot docs](https://docs.github.com/en/copilot), [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support), [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- **What Belongs In Support Hub:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Recommended Support Taxonomy:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Response Standards:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Moderator Playbook:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Privacy And Safety Rules:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Integration Checklist:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Reset And Rebuild (From Scratch):** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
