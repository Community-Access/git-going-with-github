# Accessibility Checks for Core Flows

This document holds the keyboard-only, screen reader and manual accessibility checks for the tasks every learner must be able to complete with the workshop's own materials, and the record of each time they are run. It is the test plan behind the "Supported environments" and "Known limitations" sections of [ACCESSIBILITY.md](../ACCESSIBILITY.md). For checking a new issue template or form, use the [template testing checklist](ACCESSIBILITY_TESTING.md) instead.

A check counts as run only when a person has done it with the stated browser and assistive technology, and written down the date, the environment and the result. A simulation, a code review or an automated scan is useful preparation and is recorded separately as such; it is never a result here. The one exception is a keyboard-only run made with real key presses in a real browser: the accessibility owner may accept it as a result, and says so in its record. Screen reader and manual visual checks always need a person.

## Status

The table below shows, for each core task, which records exist and whether they have been run.

| Core task | Keyboard only | Screen reader | Manual visual checks |
|---|---|---|---|
| 1. Read a chapter on the website | Pass, 28 October 2026 (agent run, accepted) | Not yet run | Not yet run |
| 2. Search the website | Pass, 28 October 2026 (agent run, accepted) | Not yet run | Not yet run |
| 3. Listen to a companion episode and open its transcript | Pass, 28 October 2026 (agent run, accepted) | Not yet run | Not yet run |
| 4. Opt in on the registration page | Pass, 28 October 2026 (agent run, accepted) | Not yet run | Not yet run |
| 5. Report a barrier with the accessibility bug report form | Not yet run | Not yet run | Not yet run |
| 6. Read the ePub and braille downloads | Not applicable | Not yet run | Not applicable |

Last reviewed: 28 October 2026. The quarterly [accessibility review issue](https://github.com/Community-Access/git-going-with-github/blob/main/.github/workflows/accessibility-review-reminder.yml) asks for this table to be brought up to date.

## The core tasks

These are the tasks a new learner must be able to complete with materials this repository publishes. Tasks on GitHub.com itself (filing an issue, opening a pull request) are taught by the curriculum and depend on GitHub's interface; barriers there are recorded in ACCESSIBILITY.md under "Dependencies and upstream blockers".

1. **Read a chapter on the website.** Start at the [workshop home page](https://community-access.github.io/git-going-with-github/), reach [Chapter 05: Working with Issues](https://community-access.github.io/git-going-with-github/docs/05-working-with-issues.html), read it by headings, use "On this page" and Quick Jumps, and move to the next chapter with the page progression links.
2. **Search the website.** From any page, search for "merge conflict", reach the results page and open a result.
3. **Listen to a companion episode and open its transcript.** On a chapter page, use "Jump to companion audio", play and pause the episode, and open the full transcript.
4. **Opt in on the registration page.** Open the student opt-in page, read the status table, and follow the link to the enrollment form on GitHub.
5. **Report a barrier.** Open the [accessibility bug report form](https://github.com/Community-Access/git-going-with-github/issues/new?template=accessibility-bug.yml), fill in the two required fields and one optional field, and reach the Submit button (do not submit a test report).
6. **Read the downloads.** Open the ePub from the latest release in an e-reader with a screen reader, and the UEB BRF file on a braille display or in a braille viewer, and find Chapter 05.

## Keyboard-only checks

Use this list for each task. Do not use a mouse, trackpad or touch screen. Copy the block into "Records" below with the task name, and fill it in.

```markdown
### Keyboard: <task name>

Environment: <operating system and version>, <browser and version>. Run by <person> on <date>.

- [ ] Every link and control in the task can be reached with Tab and Shift+Tab.
- [ ] Every control works from the keyboard (Enter, Space, arrow keys where expected).
- [ ] A visible focus indicator is always present and has sufficient contrast.
- [ ] Focus order is logical: no jumps, follows the reading order.
- [ ] No keyboard trap: focus can move into and out of the audio player, the search box and any menu.
- [ ] The skip link is the first stop and moves focus to the main content.
- [ ] The task can be completed end to end.

Result: <pass, or the failures with issue numbers>.
```

## Screen reader checks

Use at least one of NVDA with Chrome or Firefox on Windows, JAWS with Chrome on Windows, or VoiceOver with Safari on macOS: the combinations the curriculum supports. Record the versions.

```markdown
### Screen reader: <task name>

Environment: <screen reader and version>, <browser and version>, <operating system and version>. Tested by <person> on <date>.

- [ ] The page title is announced and says which page this is.
- [ ] I can move by headings (H) and by landmarks (D, or the VoiceOver rotor), and the outline makes sense.
- [ ] Links and controls have names that say where they go or what they do.
- [ ] Lists, tables and code blocks are announced as such, and tables can be read cell by cell.
- [ ] Changes without a page load (search results, the registration count, the audio player state) are announced or easy to find.
- [ ] Reading order is logical.
- [ ] The task can be completed end to end.

Result: <pass, or the barriers found with issue numbers>.
```

## Manual visual checks

```markdown
### Manual checks: <task name>

Environment: <operating system>, <browser and version>, <display size>. Run by <person> on <date>.

- [ ] Keyboard: the task can be completed by keyboard alone (see the keyboard record).
- [ ] Any image or diagram has a text alternative that serves its purpose.
- [ ] Page title, headings, labels and messages are descriptive.
- [ ] Plain language is used, and abbreviations are spelled out on first use.
- [ ] At 200% browser zoom, nothing is lost or overlaps.
- [ ] At a 320 CSS pixel wide window (400% zoom), content reflows without horizontal scrolling or loss of information.
- [ ] Text and focus indicators have sufficient contrast in the light, dark and high contrast themes, and color is never the only way meaning is shown.

Result: <pass, or the barriers found with issue numbers>.
```

## Documentation checks

Documentation is checked in two ways. The automated check (`npm run check:accessibility`, described in ACCESSIBILITY.md under "Automated checks") covers heading structure, image alternatives, link text, table headers, code block languages and emoji in every Markdown file outside `learning-room/`. A person reviews what it cannot judge:

- **Structure:** headings describe their sections; lists are real lists; steps that must be done in order are numbered.
- **Alternatives:** each diagram, including ASCII diagrams in code blocks, has the same information in text nearby; alternative text describes the purpose of an image, not only its subject.
- **Links:** link text makes sense in a screen reader's links list; links to other chapters resolve.
- **Captions and transcripts:** every embedded or linked video has captions, and every podcast episode has a transcript.
- **Tables:** each table has a sentence before it saying what it holds, and is a data table, not a layout.
- **Code blocks:** commands are text, not images; long commands are explained in prose; expected output is shown separately and labeled.

### Review record, 28 October 2026

Reviewed by Claude (an AI coding agent) while adopting the Open Source Accessibility Framework, for review by the accessibility owner. This is a documentation review, not a test with assistive technology.

- **Automated, all 152 Markdown files** at the root and in `docs/`, `admin/` and `classroom/`: 268 findings before fixes. Four were fixed in the same change (a skipped heading level in Appendix Z, a second H1 in Appendix L, and empty header cells in the status tables of both registration pages), along with a stray line above the H1 of CONTRIBUTING.md that the check cannot detect. The remaining 264 are recorded in the baseline and tracked in [issue #267](https://github.com/Community-Access/git-going-with-github/issues/267): 172 emoji, all in four facilitator guides in `admin/`; 88 code blocks without a language in 34 files; three intentional "bad example" links in the link text table of Appendix C; and one untitled admin file.
- **Read in full or in part:** README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, Chapter 00 (requirements and screen reader setup), the link text and image sections of Appendix C, the opening of Appendix Z, Appendix L around its second title, the template testing checklist, the issue forms and the pull request template.
- **Captions and transcripts:** no video is embedded in the documentation. Chapter 16 links four YouTube videos; their captions were not checked. All 58 podcast episodes in `podcasts/manifest.json` have a transcript script under `podcasts/scripts/`.
- **Code blocks:** CONTRIBUTING.md shows expected output separately and labeled; its three unlabeled fences hold expected output, the commit message format and pull request title examples, and are among the tracked findings. Commands across the curriculum are text in fenced blocks; no screenshot of code or of a terminal was found.
- **Images:** the documentation contains no images outside code examples, in line with the text-first priority.

## Records

Add each run below, newest first, using the blocks above. Link any issue you file, labeled `accessibility`.

No checks by a person have been run yet.

## Agent runs

These runs were made by Claude (an AI agent) on the live site, with real key presses in a real browser. The keyboard run was accepted as a result by the accessibility owner, Jeff Bishop, on 28 October 2026, under the exception at the top of this document, and the status table shows it. The manual visual run stays preparation only: it caught one real defect, which is fixed, and a person's run still has to be recorded under "Records".

### Agent run: keyboard, tasks 1 to 4, 28 October 2026

Environment: Chromium in the Claude desktop app's browser pane, Windows, 1280 by 900 and 320 by 720 windows. Pages: the home page, Chapter 05, Chapter 07, the search results page for "merge conflict", and REGISTER.html.

- Every link and control was reached with Tab, and focus went right round each page and back to the browser: 65 stops on the home page, 222 on Chapter 05, 88 on the search results page, 80 on REGISTER.html. No keyboard trap, including through the audio player and the code blocks, which take focus so they can be scrolled.
- Every stop matched `:focus-visible` and drew an outline. On the Quick Jumps links it is 1.6 pixels solid, 5.19:1 in light mode and 3.49:1 in dark mode.
- Focus order follows the page: skip link, header, sidebar, then the main content from the top.
- The skip link is the first stop; Enter on it moves to `#main-content`, and the next Tab lands in the main content.
- Task 1: the page has Previous and Next links to Chapters 04 and 06.
- Task 2: typing "merge conflict" in the search box and pressing Enter opened the results page, which announces "80 results found" in a live region; the first result, "Merge Conflicts", is the sixth Tab stop, and Enter on it opened Chapter 07.
- Task 3: on the focused audio player, Space played and Space paused the Chapter 05 episode; the full transcript link is present.
- Task 4: the enrollment link, "Begin the Adventure (opens in new tab)", is reached by Tab.
- Task 5 was not run: the form is on GitHub and needs a signed-in account.

Result: pass for tasks 1 to 4, no keyboard failures found. Accepted as a result by the accessibility owner on 28 October 2026. Task 5 is GitHub's own issue form and is still to be run while signed in.

### Agent run: manual visual checks, tasks 1 to 4, 28 October 2026

Same environment. Contrast was measured for every text element against its actual background colour, in light and dark mode.

- At a 320 CSS pixel wide window, all five pages reflow with no horizontal scrolling (only code blocks scroll inside themselves, which is allowed).
- Contrast found text under 4.5:1: in dark mode the breadcrumb, the footer and every code block (as low as 1.18:1, because the light highlight theme was used on a dark background), and in light mode three highlight colours on the code background (3.28:1 to 4.3:1). Fixed in pull request 274; a re-scan of all 223 site pages in both modes finds nothing under 4.5:1.
- Not checked: Windows High Contrast (forced colors), real browser zoom at 200%, and plain language, which need a person's judgement.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this document.

- [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [W3C Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [W3C Understanding Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [WAI: Easy Checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- [Open Source Accessibility Framework, Testing phase](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/blob/main/framework/phases/testing-phase.md)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Status:** [Open Source Accessibility Framework, Testing phase](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/blob/main/framework/phases/testing-phase.md)
- **The core tasks:** [Open Source Accessibility Framework, Testing phase](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/blob/main/framework/phases/testing-phase.md)
- **Keyboard-only checks:** [W3C Understanding Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [WAI: Easy Checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- **Screen reader checks:** [WAI: Easy Checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
- **Manual visual checks:** [W3C Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- **Documentation checks:** [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- **Records:** [Open Source Accessibility Framework, Testing phase](https://github.com/open-source-accessibility/Open-Source-Accessibility-Framework/blob/main/framework/phases/testing-phase.md)
