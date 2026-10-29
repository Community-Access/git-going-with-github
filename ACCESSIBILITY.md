# Accessibility

GIT Going with GitHub exists so that blind and low vision people, and anyone who works from the keyboard or with assistive technology, can learn to contribute to open source on GitHub. Accessibility is not a feature of this workshop; it is the reason the workshop exists. Everyone, including people who use a screen reader, magnification, a braille display, voice control or the keyboard alone, should be able to read the curriculum in any of its formats, listen to the podcast, complete the challenges, and contribute to this repository.

This document describes our accessibility priorities, what we ask of contributors, how to report a barrier, how we respond, who owns this work, what the workshop supports and what we know is not yet good enough. It follows the [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/), an improvement framework from GitHub. Taking part in the framework is a commitment to steady, visible improvement. It is not a certification, and it is not a claim that the workshop is fully accessible.

## Priorities

- **Target:** we work toward [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA for everything a learner reads or operates: the published website, the Markdown on GitHub, the ePub, Word and braille downloads, the issue forms and the messages our bots post. This is a goal that guides our work, not a claim of verified conformance.
- **Screen reader first.** Every instruction is written for NVDA, JAWS and VoiceOver users first, with the keys for each where they differ. Instructions name the heading, landmark, control or key to use, never only a position or a color ("the Save button in the dialog footer", not "the blue button on the right").
- **Keyboard only.** No step in the workshop needs a mouse. Every instruction gives a keyboard route.
- **Text before pictures.** We avoid screenshots of user interfaces and write the steps instead. A diagram is always accompanied by the same information in text.
- **Structure a reader can navigate:** one H1 per page, no skipped heading levels, descriptive link text, a sentence before every table saying what it holds, real lists, and code in fenced blocks with a language.
- **More than one format.** The same curriculum is published as HTML, Markdown, ePub, Word and braille (UEB and EBAE), with companion podcast episodes and transcripts, so people can choose the format that works for them.
- **Plain language.** We spell out abbreviations the first time, explain jargon in the [glossary](docs/appendix-a-glossary.md), and never assume knowledge a chapter has not taught.

## Contributor expectations

These apply to every pull request. [CONTRIBUTING.md](CONTRIBUTING.md#6-accessibility-requirements) gives the detail and the commands, and the [pull request template](https://github.com/Community-Access/git-going-with-github/blob/main/.github/PULL_REQUEST_TEMPLATE.md) turns them into a checklist.

- **Documentation and content** (chapters, appendices, challenges, solutions, admin guides, README files):
  - Exactly one H1, the page title; headings in sequence, never skipping a level.
  - Unique, descriptive link text; no "click here", "read more" or bare URLs in running text.
  - Meaningful alternative text for every image, and a text alternative next to every diagram, including ASCII and Mermaid diagrams.
  - A header row on every table, a sentence before it that says what its rows are, and no merged or empty header cells.
  - Commands and file contents in fenced code blocks with a language (`bash`, `text`, `markdown`); expected output shown separately and labeled.
  - Keyboard instructions for every step, with NVDA, JAWS and VoiceOver commands where they differ.
  - No meaning carried by color, position or styling alone, and no emoji anywhere: a screen reader reads each one by name.
  - Keep the "Authoritative Sources" and "Section-Level Source Map" sections at the end of each document.
- **The website template, search, player and other interfaces** (`scripts/build-html.js`, the podcast pages, the registration page, issue forms and bot messages): see [Interface requirements](#interface-requirements) below, and say in the pull request what you tested and with which browser and assistive technology.
- **Audio:** every podcast episode needs a transcript published with it.
- **Braille and ePub:** a change to `scripts/build-epub.js`, `scripts/build-brf.py` or the release workflow describes in the pull request how the output was checked.
- **Automated checks:** run `npm run check:accessibility` (the [documentation accessibility check](#automated-checks)), `npm run validate:authoritative-sources` and `npm run build:html` before you push. A pull request that adds a new accessibility finding fails the check. Fix it, or explain in the pull request why it cannot be fixed.
- **New dependencies:** a new library, tool or service that shapes what learners meet (site styling or scripts, document converters, the text-to-speech engine, an audio host) gets a short accessibility review in the pull request before it is adopted: its known accessibility issues, and how we would work around them. See [Dependencies and upstream blockers](#dependencies-and-upstream-blockers).
- **Accessibility claims are sourced.** A statement about a standard, a screen reader or GitHub's interface links its authoritative source, as every chapter's source map does.

### Interface requirements

The workshop's own interfaces are the published website (built by `scripts/build-html.js`), its search page, the companion audio player, the registration page, the issue forms in `.github/ISSUE_TEMPLATE/`, and the comments our automation posts. New and changed interfaces must meet these requirements, and reviewers check them against the pull request checklist:

- Every page has a descriptive `<title>`, `lang="en"`, a skip link to the main content, and `header`, `nav`, `main` and `footer` landmarks with distinct names.
- Everything interactive is reachable and operable from the keyboard, in a logical order, with no keyboard trap.
- Focus is always visible: never remove the focus outline without a replacement that is at least as visible.
- Every control has a visible label, and its accessible name contains the visible words; native HTML elements before ARIA.
- Text and focus indicators have sufficient contrast in the light, dark and high contrast themes the site supports.
- Content reflows at 320 CSS pixels wide and works at 200% zoom without loss of content or function.
- Changes that happen without a page load (search results, a live count) are announced or easy to find.
- Motion respects `prefers-reduced-motion`.
- Bot comments and issue forms use headings and lists, plain language, and no emoji.

Barriers found in the current interfaces are tracked as issues labeled `accessibility` (see [Known limitations](#known-limitations)).

### Automated checks

`scripts/check-docs-accessibility.js` checks the Markdown that becomes the website, the ePub and the braille files: one H1 per page, no skipped heading levels, alternative text on images, descriptive link text, table headers, a language on every code block, and no emoji. It runs on every pull request that changes Markdown ([workflow](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/docs-accessibility.yml)) and in the automation test suite. Findings that predate the check are counted in `scripts/docs-accessibility-baseline.json` and tracked in [issue #267](https://github.com/Community-Access/git-going-with-github/issues/267); the check fails only when a change adds one. It does not check the rendered HTML, `learning-room/` (which contains deliberate defects for learners to fix), or anything a person must judge, which is what the [manual checks](admin/ACCESSIBILITY_CORE_FLOWS.md) are for. No automated check finds every barrier.

## Reporting accessibility issues

If something in this workshop is hard or impossible for you to use, please tell us. Accessibility reports are expertise, not complaints, and this includes barriers you meet on GitHub.com or in VS Code while following the workshop.

- **On GitHub:** open an issue with the [accessibility bug report form](https://github.com/Community-Access/git-going-with-github/issues/new?template=accessibility-bug.yml). Only two fields are required; partial reports are welcome.
- **By email, if GitHub is a barrier for you, or you would rather not post publicly:** write to [support@community-access.org](mailto:support@community-access.org) or to Jeff Bishop at [jeff@jeffbishop.com](mailto:jeff@jeffbishop.com). We will file the issue for you if you want one, and keep your details private if you ask.
- **During a live workshop:** tell a facilitator in the room or in the workshop chat, and we will file it with you.

Helpful details, all optional:

- What you were trying to do, and what happened instead.
- Where: the page URL, the chapter or challenge, the download (ePub, Word, BRF), or the podcast episode.
- Your operating system, browser and assistive technology, with versions if you know them.
- How much it gets in your way (see [Severity](#severity)).
- Whether you would be willing to try a fix and tell us if it works.

You never need to tell us about a disability or diagnosis.

### Severity

We use four levels, based on how much the barrier stops a person completing a task. Reporters do not need to choose one; maintainers assign or confirm it during triage.

- **Critical:** you cannot complete a core task, such as reading a chapter, registering, or finishing a challenge, and there is no workaround.
- **Serious:** you can complete the task only with real difficulty or a workaround.
- **Moderate:** the task works but is confusing, slow or inconsistent.
- **Minor:** a small problem with little effect on getting things done.

### How we respond

- We acknowledge every accessibility report promptly and respectfully, thank the reporter, and say what happens next. We treat the report as expertise about the workshop, not a complaint.
- We do not ask you to justify your experience or to disclose personal information. If we need more detail, we ask specific questions about the steps and your setup, never whether the barrier is real.
- At triage the report gets the `accessibility` label, a severity, an owner and, where we can give one, a target date, all stated on the issue.
- Where we can, we give a workaround while a fix is in progress, and we add it to the relevant chapter so the next learner does not meet the same barrier.
- If the cause is on GitHub.com, in VS Code, in a screen reader or in another tool we do not control, we say so, document the workaround, report it upstream where we can, and link the upstream report on the issue.
- We post an update on the issue whenever its status or expected timing changes, and link the pull request that fixes it.
- Before we close a report, we write down the outcome on the issue, and we ask the reporter, or another person affected, to confirm the fix works for them when they are willing.
- We credit reporters and testers only in the way they choose (see [Recognizing contributions](#recognizing-contributions)).

Two workflows hold us to this for reports opened from 29 October 2026 on. Their logic and its tests are in [.github/scripts/a11y-community.mjs](https://github.com/Community-Access/git-going-with-github/blob/main/.github/scripts/a11y-community.mjs).

- **When you report a barrier,** a bot replies once: it thanks you, says a maintainer will reply with a status and a next step within 5 business days, points you to [Known limitations](#known-limitations), and invites, but never requires, details of your setup. The issue is labeled `a11y: awaiting response` until a maintainer comments.
- **If no maintainer has replied after 5 business days** (Monday to Friday), the issue is labeled `a11y: response overdue` and the accessibility owner is reminded on the issue.
- **A report cannot close without an outcome.** Maintainers close it from the pull request or commit that fixes it, or write a comment with a line that starts `Outcome:`, after the reporter's last comment, saying what changed or why it cannot. A report closed without either is reopened automatically, with a note saying how to add one. When a report closes as fixed, you are invited to confirm that the fix works for you, and the issue is labeled `a11y: validation requested`.

If we cannot meet a date we gave, we say why on the issue, share any workaround, and give a new date.

## Taking part

There are several ways to take part, and no single channel is required:

- **Asynchronous, at any time:** read and listen on the [workshop website](https://community-access.github.io/git-going-with-github/); ask questions in [Discussions](https://github.com/Community-Access/git-going-with-github/discussions) or the [Community Access support hub](https://github.com/Community-Access/support); open issues and pull requests here; or email the addresses above. The whole curriculum, every challenge and every solution can be done self-paced.
- **Live cohorts:** the two-day workshop runs in person and remotely. Facilitation plans ([Day 1 agenda](admin/DAY1_AGENDA.md), [Day 2 agenda](admin/DAY2_AGENDA.md)) give remote participants the same links, chat channel and written checkpoints, with CART captioning or ASL interpretation where available. Every live block has a written "you are done when" checkpoint and can be finished afterwards, so missing part of a session does not mean missing the content.
- **Non-code contributions are as welcome as code:** reporting and reproducing barriers, testing with your screen reader or braille display, correcting a keyboard command, reviewing a chapter, improving a transcript, or reviewing other people's pull requests.

**Accommodations.** If you need an accommodation to take part in a live session or to contribute, or a tool we use is a barrier for you, email [support@community-access.org](mailto:support@community-access.org) or [jeff@jeffbishop.com](mailto:jeff@jeffbishop.com) privately. You do not need to explain why, and we will not share what you tell us.

**Collaboration tools we have reviewed.** The tools the workshop asks people to use, and where their accessibility is documented:

- **GitHub.com** (issues, pull requests, Discussions, the Learning Room): chapters 02 to 10 and the [screen reader cheat sheet](docs/appendix-b-screen-reader-cheatsheet.md) teach each one with NVDA, JAWS and VoiceOver, including the known rough edges and workarounds. Known blockers are listed in [Dependencies and upstream blockers](#dependencies-and-upstream-blockers).
- **VS Code, github.dev and GitHub Copilot:** chapters 11, 12 and 16, the [VS Code accessibility reference](docs/appendix-g-vscode-reference.md) and the [GitHub Copilot reference](docs/appendix-k-copilot-reference.md) cover screen reader mode, Accessible View, accessibility signals and the Accessible Diff Viewer.
- **The workshop chat channel used in live cohorts** has not been reviewed by us; everything said there that matters is also posted in the repository or Discussions, which are the alternative.
- **The podcast** is an optional companion: each episode has a transcript, and every episode covers a chapter that is available as text.

Everyone who takes part follows the [Code of Conduct](CODE_OF_CONDUCT.md). It names disability-related harassment, dismissing accessibility feedback, personal attacks and publishing private information as unacceptable, and gives a private contact for reports. The maintainers enforce it.

**How to help.** Open accessibility work is labeled [`accessibility`](https://github.com/Community-Access/git-going-with-github/issues?q=is%3Aopen+label%3Aaccessibility). Issues that suit a first contribution are labeled [`accessibility` and `good first issue`](https://github.com/Community-Access/git-going-with-github/issues?q=is%3Aopen+label%3Aaccessibility+label%3A%22good+first+issue%22), and ones where we need specialist experience, such as daily use of a particular screen reader, are labeled [`accessibility` and `help wanted`](https://github.com/Community-Access/git-going-with-github/issues?q=is%3Aopen+label%3Aaccessibility+label%3A%22help+wanted%22). Each has the context, the steps and acceptance criteria to start from. Ask questions on the issue or in Discussions, and a maintainer will answer.

**Feedback from learners.** After each cohort we ask participants to fill in the [workshop feedback form](https://github.com/Community-Access/git-going-with-github/issues/new?template=feedback-workshop.yml), which has a section on accessibility and inclusion. The accessibility owner reads every response, files the barriers it describes as `accessibility` issues, and summarizes what changed in the next progress update.

## Ownership and maintenance

Accessibility is owned by **Jeff Bishop**, workshop facilitator and maintainer ([@accesswatch](https://github.com/accesswatch) on GitHub, [jeff@jeffbishop.com](mailto:jeff@jeffbishop.com)), with the workshop facilitators.

The accessibility owner:

- triages accessibility reports, assigns severity and an owner, and makes sure each gets an acknowledgement, a status and a next step;
- keeps accessibility work visible with the `accessibility` label, and keeps a few well-described `good first issue` and `help wanted` accessibility issues open;
- reviews pull requests against the contributor expectations and interface requirements above (pull requests are routed for review by [CODEOWNERS](https://github.com/Community-Access/git-going-with-github/blob/main/.github/CODEOWNERS));
- reviews the accessibility of new dependencies before they are adopted, and tracks upstream blockers;
- keeps this document, the supported environments, the known limitations, the [test records](admin/ACCESSIBILITY_CORE_FLOWS.md) and the framework progress current;
- publishes the quarterly progress update and escalates unresolved accessibility risks to the other maintainers, for example before a cohort starts.

This document is reviewed every quarter, when the [review reminder](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/accessibility-review-reminder.yml) opens its issue, and before each cohort. If ownership changes, this section is updated in the same pull request that changes `.github/CODEOWNERS`.

## Dependencies and upstream blockers

Much of what a learner meets is not ours: the workshop teaches GitHub, VS Code and Copilot as they are. These are the dependencies that shape accessibility, what we know about each, and what we do about it. A new one is reviewed before it is adopted (see [Contributor expectations](#contributor-expectations)).

- **GitHub.com.** The platform the whole workshop teaches. Its interface changes often, so a documented label or key can move. GitHub documents its accessibility work on [GitHub accessibility](https://accessibility.github.com/) and takes feedback in the [GitHub Community accessibility discussions](https://github.com/orgs/community/discussions/categories/accessibility). Mitigation: every chapter links its authoritative source, and the README asks learners to report a changed path as a curriculum issue.
  - Known blocker: on the "Authorize Visual Studio Code" page that opens when signing in from VS Code, NVDA can announce the Authorize button as unavailable while it is active ([#70](https://github.com/Community-Access/git-going-with-github/issues/70)). Workarounds, from the issue: wait for the page to load fully and press Enter on the button anyway; reload the page; open the same link in another browser; or sign in with `gh auth login` instead. The reporter got through by signing in again and opening the link in Microsoft Edge. Not yet reported upstream with a public link.
- **VS Code, github.dev and GitHub Copilot** (Day 2). Accessibility is maintained upstream in [microsoft/vscode](https://github.com/microsoft/vscode). Mitigation: chapters 11, 12 and 16 give the settings that matter, and a minimum VS Code version in Chapter 00.
  - Open: VoiceOver on macOS can say "selection replaced" when the first character is typed in the editor, though nothing is replaced ([#175](https://github.com/Community-Access/git-going-with-github/issues/175)). The cause, VoiceOver or VS Code, is not yet known, so there is no upstream report yet; Chapter 11 explains it to learners.
- **Screen readers** (NVDA, JAWS, VoiceOver). Commands differ between them and between versions; Appendix B is the single place we keep them, and corrections from daily users are always welcome.
- **The website build:** [marked](https://github.com/markedjs/marked) turns Markdown into HTML, [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) and a [highlight.js](https://github.com/highlightjs/highlight.js) theme supply the colors, and [lunr](https://github.com/olivernn/lunr.js) the search index. The page template, landmarks, skip link, focus styles and search page are ours, in `scripts/build-html.js`; barriers there are tracked as our own issues.
- **Downloads:** [Pandoc](https://pandoc.org/) builds the ePub and Word files, and [liblouis](https://liblouis.io/) translates the braille files from a plain-text conversion of the ePub. Braille layout and tables depend on both (see [Known limitations](#known-limitations)).
- **Podcast audio:** episodes are generated with the Kokoro text-to-speech engine (Piper as a fallback) and served from an external host, `lp.csedesigns.com`, whose player page is outside this repository. Mitigation: every episode has a transcript, and the site links the audio file directly so any player can be used.
- **GitHub Pages and the repository wiki** host the published site and its wiki copy.

## Supported environments

What the workshop is written for and supported on, taken from [Chapter 00: Pre-Workshop Setup](docs/00-pre-workshop-setup.md):

- **Operating systems:** Windows and macOS. Linux works for Git and VS Code, but the screen reader instructions do not cover Orca.
- **Screen readers:** NVDA and JAWS on Windows, VoiceOver on macOS. Every exercise gives commands for all three. VoiceOver on iOS and TalkBack on Android are covered only for the GitHub Mobile app, in the [GitHub Mobile appendix](docs/appendix-v-github-mobile.md).
- **Browsers:** Chrome or Firefox (recommended on Windows), Edge (acceptable), Safari (recommended with VoiceOver on macOS).
- **Input:** keyboard only is the primary method, and every step has a keyboard route. Pointer and touch also work. Voice control and switch access have not been tested.
- **Tools:** VS Code 1.113 or later, Git 2.20 or later, and a GitHub account with GitHub Copilot Free or a paid plan.
- **Formats:** the website (HTML), Markdown on GitHub, ePub, Word, and braille in UEB grade 2 and EBAE grade 2 (from the [releases page](https://github.com/Community-Access/git-going-with-github/releases)), and companion podcast audio with transcripts.

What has been checked:

- The documentation accessibility check runs on every pull request that changes Markdown (see [Automated checks](#automated-checks)).
- Learners using screen readers have taken the workshop in live cohorts, and their reports (for example [#70](https://github.com/Community-Access/git-going-with-github/issues/70), [#174](https://github.com/Community-Access/git-going-with-github/issues/174) and [#175](https://github.com/Community-Access/git-going-with-github/issues/175)) have changed the curriculum.
- Keyboard, screen reader and visual checks of the published website's core tasks are written down in [Accessibility Checks for Core Flows](admin/ACCESSIBILITY_CORE_FLOWS.md), but not yet run and recorded. Until they are, treat any combination above as supported but not formally tested.

## Known limitations

These are the barriers we know about, what they mean for you, and what to do instead. Please [report any we have missed](#reporting-accessibility-issues).

- **No recorded test of the website yet.** We have not yet run and recorded keyboard, screen reader and zoom checks of the published site for each release. The [test plan](admin/ACCESSIBILITY_CORE_FLOWS.md) is written; results will be added there.
- **The Quick Jumps links hide their focus outline.** On every chapter page, keyboard focus on the Quick Jumps links shows only an underline and a faint background, which is hard to see with low vision ([#265](https://github.com/Community-Access/git-going-with-github/issues/265)). Workaround: the same links are in the "On this page" list and the page headings, which show the normal outline.
- **The site search box is named "Search documentation" but shows "Search docs".** Voice control users may need to say "Search documentation", or move to the field with Tab ([#266](https://github.com/Community-Access/git-going-with-github/issues/266)).
- **Some facilitator guides start headings with emoji**, which screen readers read aloud by name, and some code blocks do not say what they contain ([#264](https://github.com/Community-Access/git-going-with-github/issues/264), [#267](https://github.com/Community-Access/git-going-with-github/issues/267), [#268](https://github.com/Community-Access/git-going-with-github/issues/268)). Learner chapters are not affected by the emoji.
- **The braille files are machine translated.** They are produced automatically by liblouis from a plain-text version of the ePub, so tables are flattened into lines of text and print formatting is not converted to braille formatting. We have no record of review by a certified braille transcriber. Workaround: the ePub, Word or HTML version read with a refreshable braille display keeps the tables and headings.
- **Podcast episodes are companions, not readings.** Episodes use synthetic voices and summarize a chapter rather than reading it word for word. Every episode has a transcript, and the chapter itself is the complete source.
- **Linked videos are not ours.** Chapter 16 links four YouTube videos about Copilot with a screen reader; we have not checked their captions. The same steps are written in the chapter.
- **GitHub and VS Code change faster than the curriculum.** A button, label or announcement may differ from what a chapter says. Use the exploration skills the README describes, and file a curriculum issue so we can update the chapter.
- **The Learning Room has deliberate defects.** Files in `learning-room/` (for example `docs/keyboard-shortcuts.md`) contain accessibility problems on purpose, for learners to find and fix. They are exercises, not barriers to report, unless the exercise itself is hard to use.
- **Upstream barriers we can only work around:** see [Dependencies and upstream blockers](#dependencies-and-upstream-blockers).

## Progress updates

We publish accessibility progress here, every quarter and after each cohort, and in our public Open Source Accessibility Framework tracking issue. Each update lists completed work, remaining work, known barriers and links. The [review reminder workflow](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/accessibility-review-reminder.yml) opens an issue labeled `accessibility review` on the first day of each quarter with the numbers since the last update and a checklist; the update is added below in a pull request that closes it.

### October 2026: adopting the framework

- **Completed:** this document; a reworked [accessibility bug report form](https://github.com/Community-Access/git-going-with-github/issues/new?template=accessibility-bug.yml) with only two required fields and an email alternative; a full accessibility checklist in the pull request template; the documentation accessibility check in CI, with its first findings tracked in [#267](https://github.com/Community-Access/git-going-with-github/issues/267); fixes to a skipped heading level (Appendix Z), a second H1 (Appendix L), empty table headers on the registration pages, and a stray line above the title of CONTRIBUTING.md. Earlier in 2026: an EBAE braille file beside the UEB one ([#174](https://github.com/Community-Access/git-going-with-github/issues/174)), and Chapter 11's explanation of the VoiceOver "selection replaced" announcement ([#175](https://github.com/Community-Access/git-going-with-github/issues/175)).
- **Remaining:** run and record the [core flow checks](admin/ACCESSIBILITY_CORE_FLOWS.md); fix the site template findings ([#265](https://github.com/Community-Access/git-going-with-github/issues/265), [#266](https://github.com/Community-Access/git-going-with-github/issues/266)); work through the recorded documentation findings ([#264](https://github.com/Community-Access/git-going-with-github/issues/264), [#268](https://github.com/Community-Access/git-going-with-github/issues/268)); find the cause of [#175](https://github.com/Community-Access/git-going-with-github/issues/175).
- **Known barriers:** see [Known limitations](#known-limitations).
- **How to help:** issues labeled [`accessibility`](https://github.com/Community-Access/git-going-with-github/issues?q=is%3Aopen+label%3Aaccessibility).

## Recognizing contributions

Accessibility work, including reports, testing, reviews and documentation, is project work, and we say so publicly. Before we name anyone in a progress update, release notes or a community post, we ask how they would like to be credited: by GitHub handle, by name, or not at all, and we record the answer on the issue or pull request. We describe the work, never the person's disability, diagnosis or assistive technology, even if they mentioned it in a report, and we never present one person as speaking for a disability community.

A workflow does the asking. When an accessibility pull request from outside the maintainers is merged, or your report closes as fixed, a bot asks you once how you would like to be credited, and you reply with one line: `credit: @handle`, `credit: name <Name>`, `credit: anonymous` or `credit: no`. Only your own reply counts, you can change it later, and nothing about you beyond the credit you choose is published. The answer is recorded as a `credit:` label. Before each progress update, the accessibility owner runs `node .github/scripts/a11y-credits.mjs --since <date of the last update>` and pastes the block it prints; it lists items labeled `credit: yes` or `credit: anonymous` closed since then, as code and other contributions, and warns about `credit: asked` items with no answer after 14 days, whose contributors are left out or asked again.

## Reusing our accessibility materials

Other projects are welcome to reuse what we built for this workshop, under the repository's [CC BY 4.0 license](https://github.com/Community-Access/git-going-with-github/blob/main/LICENSE), with attribution. Each item below says what problem it solves and where it falls short.

- **[Accessibility bug report form](https://github.com/Community-Access/git-going-with-github/blob/main/.github/ISSUE_TEMPLATE/accessibility-bug.yml):** a GitHub issue form that asks for the details triage needs while requiring only two fields, never asks about disability, and offers an email alternative. Replace the "Where" options and the contact addresses with your own. It cannot help people who cannot use GitHub at all; keep an email or other route beside it.
- **[Pull request accessibility checklist](https://github.com/Community-Access/git-going-with-github/blob/main/.github/PULL_REQUEST_TEMPLATE.md):** content and interface checks written for a documentation project. Drop the groups that do not apply; it prompts a contributor, it does not test anything.
- **[Documentation accessibility check](https://github.com/Community-Access/git-going-with-github/blob/main/scripts/check-docs-accessibility.js)** with its [baseline](https://github.com/Community-Access/git-going-with-github/blob/main/scripts/docs-accessibility-baseline.json) and [workflow](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/docs-accessibility.yml): a dependency-free Node.js script that checks Markdown for heading structure, alternative text, link text, table headers, code block languages and emoji, and blocks only new findings so an existing project can adopt it on day one. Needs Node.js 18 or later. It reads Markdown source, not rendered pages, so pair it with a check of your built site.
- **[Template testing checklist](admin/ACCESSIBILITY_TESTING.md)** and **[core flow checks](admin/ACCESSIBILITY_CORE_FLOWS.md):** step-by-step NVDA, JAWS and VoiceOver procedures for issue forms and web pages, and test records for key tasks. Adapt the tasks to your project's own.
- **This document:** a worked `ACCESSIBILITY.md` for a documentation and training project, following the framework's sections.
- **[Quarterly review reminder](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/accessibility-review-reminder.yml):** a scheduled workflow that opens a progress-update issue with the quarter's accessibility issue counts. It needs an `accessibility` label and issue write permission.
- **The curriculum itself:** a screen-reader-first course in contributing on GitHub, with the [screen reader cheat sheet](docs/appendix-b-screen-reader-cheatsheet.md) and the [accessibility standards reference](docs/appendix-m-accessibility-standards.md) as standalone references.

The accessibility owner keeps these current. Report a problem with any of them the same way as any other barrier.

## Open Source Accessibility Framework

We follow the [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/) in its four phases and record our progress, action by action, in our public tracking issue, [GIT Going with GitHub, issue 55](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/issues/55), in the framework's repository. Progress is self-reported, and an action is checked there only when its definition of done is fully met: 20 of 24 as of 28 October 2026. The keyboard-only smoke test is checked: tasks 1 to 4 passed with real key presses in a browser, a run the accessibility owner accepted (see admin/ACCESSIBILITY_CORE_FLOWS.md). Docs accessible by default is checked: the documentation check's 264 findings were fixed in pull request 271, and the 3 left are deliberate bad examples in Appendix C. Accessible interfaces is checked: the site's fixes from issues 265 and 266 were confirmed on the live site in a browser, with a visible focus outline in light and dark mode (5.19:1 and 3.49:1) and a search box named by its visible label. One workflow action described below is in place but stays unchecked for now: dependencies (the two known blockers have no upstream report yet). As of October 2026:

- **Foundational:** this document; the `accessibility` label, applied to accessibility reports and work.
- **Workflow:** priorities, contributor expectations and interface requirements above, linked from [CONTRIBUTING.md](CONTRIBUTING.md); the accessibility bug report form with an email alternative; severity and response; the pull request checklist; `good first issue` and `help wanted` accessibility issues with acceptance criteria; an owner; documentation checked by the automated check; dependencies and upstream blockers recorded.
- **Testing:** the documentation accessibility check in CI, with its findings tracked; documentation reviewed; supported environments and known limitations above. A keyboard-only run of the core tasks on the website passed and is recorded; screen reader and manual checks are written down but not yet run by a person.
- **Community:** a feedback form after each cohort and labeled issues to invite help; documented responses to reports; asynchronous and live ways to take part, a private route for accommodations and a Code of Conduct; quarterly progress updates; reusable materials. Crediting accessibility contributors with their consent is the practice above, and has not yet happened.

## Feedback

To suggest an improvement to this document or to how we work, open an issue or a pull request, or write to [support@community-access.org](mailto:support@community-access.org). Thank you for helping make GIT Going with GitHub work for everyone.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this document.

- [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/)
- [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- [Accessibility Toolkit, reference ACCESSIBILITY.md](https://github.com/open-source-accessibility/accessibility-toolkit/blob/main/ACCESSIBILITY.md)
- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [GitHub accessibility](https://accessibility.github.com/)
- [GitHub Docs, adding a code of conduct to your project](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-code-of-conduct-to-your-project)
- [GitHub Docs, syntax for issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Priorities:** [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/)
- **Contributor expectations:** [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [Accessibility Toolkit, reference ACCESSIBILITY.md](https://github.com/open-source-accessibility/accessibility-toolkit/blob/main/ACCESSIBILITY.md)
- **Reporting accessibility issues:** [GitHub Docs, syntax for issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms), [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Taking part:** [GitHub Docs, adding a code of conduct to your project](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-code-of-conduct-to-your-project), [GitHub accessibility](https://accessibility.github.com/)
- **Ownership and maintenance:** [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Dependencies and upstream blockers:** [GitHub accessibility](https://accessibility.github.com/), [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Supported environments:** [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Known limitations:** [Accessibility Toolkit, reference ACCESSIBILITY.md](https://github.com/open-source-accessibility/accessibility-toolkit/blob/main/ACCESSIBILITY.md)
- **Progress updates:** [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/)
- **Recognizing contributions:** [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Reusing our accessibility materials:** [Open Source Accessibility Framework source and phase documents](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework)
- **Open Source Accessibility Framework:** [Open Source Accessibility Framework](https://open-source-accessibility.github.io/Open-Source-Accessibility-Framework/)
