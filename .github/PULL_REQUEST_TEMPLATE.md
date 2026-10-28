## Summary

<!-- What does this PR change and why? One or two sentences. -->

## Changes

<!-- List the specific changes you made. Be concrete. -->

-
-

## Related Issue

<!-- Link to the issue this PR addresses. Use "Closes #N" to auto-close on merge. -->

Closes #

## How to Review

<!-- Tell the reviewer what to focus on. What should they read first? What is in scope and out of scope? -->

## Accessibility Checklist

Accessibility is the reason this workshop exists. Please read the [contributor expectations in ACCESSIBILITY.md](https://github.com/Community-Access/git-going-with-github/blob/main/ACCESSIBILITY.md#contributor-expectations) and check each item that applies to your change. Mark an item N/A when it does not apply (for example, a content-only change has no interface items).

### Content changes (chapters, appendices, challenges, solutions, README and other docs)

- [ ] The page still has exactly one H1, and heading levels are sequential (no skipped levels)
- [ ] Link text is descriptive (no "click here", "read more" or bare URLs in running text)
- [ ] Any image has meaningful alt text, and any diagram (including ASCII diagrams) has the same information in text nearby
- [ ] Each new table has a header row and a sentence before it saying what it holds
- [ ] Commands and file contents are in fenced code blocks with a language (`bash`, `text`, `markdown`)
- [ ] Steps give a keyboard route, with NVDA, JAWS and VoiceOver commands where they differ
- [ ] Meaning is not conveyed by color, position or styling alone, and there are no emoji
- [ ] Plain language is used; abbreviations are spelled out on first use
- [ ] Any new audio has a transcript, and any linked video has captions
- [ ] I ran `npm run check:accessibility` and `npm run validate:authoritative-sources`, and `npm run build:html` with the regenerated `html/` committed

### Interface changes (site template, search, audio player, registration page, issue forms, bot messages)

- [ ] Everything interactive is reachable and operable with the keyboard alone, in a logical order, with no trap
- [ ] Focus is visible on every control; no focus outline was removed without an equally visible replacement
- [ ] Every control has a label, and its accessible name contains its visible text
- [ ] Contrast is sufficient in the light, dark and high contrast themes, and color is not the only indicator
- [ ] Content reflows at 320 CSS pixels wide and works at 200% zoom
- [ ] I checked the change with a screen reader at least once (say which one and which browser under Testing)
- [ ] A new dependency that affects what learners meet has a short accessibility review in this pull request

### Accessibility notes

<!-- Optional: what you checked, known limitations, or accessibility items left for a follow-up issue. -->

## Testing

<!-- How did you verify your changes? -->

- Tested with:
- Screen reader used (if applicable):
- Browser (if applicable):

## Screenshots or Recordings

<!-- Optional. If you include images, please provide descriptive alt text. -->
