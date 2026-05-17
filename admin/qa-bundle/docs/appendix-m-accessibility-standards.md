# Appendix M: Accessibility Standards Reference
>
> **Listen to Episode 20:** [Accessibility Standards Reference](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 08: Open Source Culture](08-open-source-culture.md) | Also relevant: [Chapter 12](12-vscode-accessibility.md)
>
> **Authoritative source:** [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)

## WCAG, ARIA, and What They Mean for Your Contributions

> This appendix gives you a working understanding of the accessibility standards that govern the web, GitHub's interface, and the projects you will contribute to. You do not need to memorize these - use this as a lookup when a PR review mentions a specific standard or success criterion.

## Table of Contents

1. [WCAG 2.2 - The Four Principles](#1-wcag-22---the-four-principles)
2. [Conformance Levels: A, AA, AAA](#2-conformance-levels-a-aa-aaa)
3. [Key Success Criteria for Web Contributions](#3-key-success-criteria-for-web-contributions)
4. [ARIA - Roles, States, and Properties](#4-aria---roles-states-and-properties)
5. [ARIA Landmark Roles](#5-aria-landmark-roles)
6. [Common ARIA Patterns](#6-common-aria-patterns)
7. [How Standards Apply to GitHub Contributions](#7-how-standards-apply-to-github-contributions)
8. [Testing Against Standards](#8-testing-against-standards)
9. [Quick Reference: What to Check in a PR](#9-quick-reference-what-to-check-in-a-pr)
10. [Official References](#10-official-references)

## 1. WCAG 2.2 - The Four Principles

WCAG (Web Content Accessibility Guidelines) is organized around four principles, often abbreviated **POUR**:

| Principle | Meaning | Example Failure |
| -----------  | ---------  | -----------------  |
| **Perceivable** | Information must be presentable to users in ways they can perceive | An image with no alt text - a screen reader user gets nothing |
| **Operable** | UI components and navigation must be operable | A button that only works on hover - keyboard users cannot activate it |
| **Understandable** | Information and operation must be understandable | An error message that says "Invalid input" with no explanation of what is wrong |
| **Robust** | Content must be robust enough to be interpreted by assistive technologies | Custom JavaScript widgets with no ARIA roles - screen readers cannot determine what they are |

Every WCAG success criterion belongs to one of these four principles.

### Learning Cards: WCAG Overview

<details>
<summary>Screen reader users</summary>

- WCAG is organized around four principles: Perceivable, Operable, Understandable, Robust (POUR) — use this mnemonic when reviewing any PR
- Most projects target WCAG 2.2 AA — when a reviewer cites a criterion number like 1.4.3, search the tables in Section 3 of this appendix
- The WCAG Quick Reference (Section 10) is a filterable web page — use your screen reader's find command to jump to any criterion number

</details>

<details>
<summary>Low vision users</summary>

- The tables in this appendix use pipe-delimited Markdown — increase your editor font size or use a Markdown preview for cleaner column alignment
- WCAG 1.4.3 (contrast) and 1.4.11 (non-text contrast) are the criteria most relevant to your daily experience — bookmark them
- When checking contrast ratios, use the WebAIM Contrast Checker link in Section 10 with your browser zoom set to your preferred level

</details>

<details>
<summary>Sighted users</summary>

- The POUR table in this section is your one-glance cheat sheet — scan the Example Failure column to see what each principle looks like when violated
- Conformance level badges (A, AA, AAA) appear in the Level column of the Section 3 tables — AA rows are your primary targets
- Bookmark the ARIA Authoring Practices Guide link in Section 10 for live interactive pattern demos

</details>

## 2. Conformance Levels: A, AA, AAA

| Level | Requirement | Who targets this |
| -------  | -------------  | -----------------  |
| **A** | Minimum accessibility - the baseline that removes the most severe barriers | Required by most accessibility laws |
| **AA** | Enhanced accessibility - removes significant barriers | Required by WCAG 2.2 compliance targets, most government and enterprise standards, GitHub's own accessibility commitment |
| **AAA** | Highest level - removes remaining barriers for the most niche cases | Not universally required; applied where feasible |

Most open source projects, and GitHub itself, target **WCAG 2.2 AA** compliance. When you file an accessibility bug or review a PR, AA is the standard to reference.

## 3. Key Success Criteria for Web Contributions

These are the criteria you will most commonly encounter when contributing to web projects or reviewing GitHub interface changes.

### Perceivable

| Criterion | Level | What It Requires |
| -----------  | -------  | -----------------  |
| **1.1.1 Non-text Content** | A | All images, icons, and non-text content have a text alternative (`alt` attribute, `aria-label`, etc.) |
| **1.3.1 Info and Relationships** | A | Structure conveyed visually (headings, lists, tables) is also conveyed programmatically |
| **1.3.2 Meaningful Sequence** | A | Reading order makes sense when CSS is removed |
| **1.3.3 Sensory Characteristics** | A | Instructions do not rely solely on shape, color, or position ("click the green button" fails this) |
| **1.4.1 Use of Color** | A | Color is not the only means of conveying information |
| **1.4.3 Contrast (Minimum)** | AA | Text has at least 4.5:1 contrast ratio against its background (3:1 for large text) |
| **1.4.4 Resize Text** | AA | Text can be resized up to 200% without loss of content or function |
| **1.4.10 Reflow** | AA | Content reflows at 400% zoom without horizontal scrolling |
| **1.4.11 Non-text Contrast** | AA | UI components and graphical objects have at least 3:1 contrast |

### Operable

| Criterion | Level | What It Requires |
| -----------  | -------  | -----------------  |
| **2.1.1 Keyboard** | A | All functionality is available via keyboard |
| **2.1.2 No Keyboard Trap** | A | Keyboard focus can always be moved away from any component |
| **2.4.1 Bypass Blocks** | A | A mechanism to skip repeated navigation (skip link) |
| **2.4.2 Page Titled** | A | Pages have descriptive titles |
| **2.4.3 Focus Order** | A | Focus follows a logical sequence |
| **2.4.4 Link Purpose** | A | Link text describes the destination ("Read more about issues" not just "Read more") |
| **2.4.6 Headings and Labels** | AA | Headings and labels describe their topic or purpose |
| **2.4.7 Focus Visible** | AA | Keyboard focus indicator is visible |
| **2.4.11 Focus Appearance** | AA *(2.2 new)* | Focus indicator meets minimum size and contrast |
| **2.5.3 Label in Name** | A | For controls with visible labels, the accessible name contains the visible text |

### Understandable

| Criterion | Level | What It Requires |
| -----------  | -------  | -----------------  |
| **3.1.1 Language of Page** | A | The default language is identified in the HTML (`lang` attribute) |
| **3.2.1 On Focus** | A | Receiving focus does not trigger unexpected context changes |
| **3.2.2 On Input** | A | Changing a setting does not cause unexpected changes unless the user is warned |
| **3.3.1 Error Identification** | A | Input errors are identified and described in text |
| **3.3.2 Labels or Instructions** | A | Labels or instructions are provided when user input is required |
| **3.3.3 Error Suggestion** | AA | When an error is detected, suggestions for correction are provided |

### Robust

| Criterion | Level | What It Requires |
| -----------  | -------  | -----------------  |
| **4.1.1 Parsing** | A | HTML/markup does not have errors that break AT interpretation |
| **4.1.2 Name, Role, Value** | A | All UI components have accessible names, roles, and states that can be programmatically determined |
| **4.1.3 Status Messages** | AA | Status messages (e.g. "item added to cart") are announced without receiving focus |

## 4. ARIA - Roles, States, and Properties

WAI-ARIA (Accessible Rich Internet Applications) fills the gap between what HTML natively expresses and what complex interactive widgets require.

### Three categories

| Category | Purpose | Examples |
| ----------  | ---------  | ---------  |
| **Roles** | What the element *is* | `role="button"`, `role="dialog"`, `role="tab"` |
| **States** | Current condition (can change) | `aria-expanded="false"`, `aria-checked="true"`, `aria-disabled="true"` |
| **Properties** | Stable characteristics | `aria-label="Close dialog"`, `aria-required="true"`, `aria-describedby="hint-text"` |

### Important rules

1. **Don't use ARIA if native HTML suffices.** A `<button>` is already a button - adding `role="button"` to a `<div>` is only needed when HTML semantics cannot be used.
2. **All interactive ARIA widgets must be keyboard operable.** Adding `role="button"` means you must also handle `Enter` and `Space` keypresses in JavaScript.
3. **ARIA only affects the accessibility tree.** It does not add visual styling or behavior - it only changes what assistive technologies announce.

## 5. ARIA Landmark Roles

Landmarks let screen reader users jump directly to major sections of a page. GitHub uses these extensively; screen reader users navigate between them with `D` (NVDA/JAWS) or the Rotor (VoiceOver).

| Role | HTML Equivalent | Purpose |
| ------  | ----------------  | ---------  |
| `banner` | `<header>` | Site-wide header |
| `navigation` | `<nav>` | Navigation links |
| `main` | `<main>` | Primary page content |
| `complementary` | `<aside>` | Supporting content |
| `contentinfo` | `<footer>` | Footer with copyright, links |
| `search` | `<search>` | Search functionality |
| `form` | `<form>` (with accessible name) | A significant form region |
| `region` | `<section>` (with accessible name) | A generic landmark with a label |

When multiple landmarks of the same type appear on a page, each should have a unique `aria-label` so screen readers can distinguish them. GitHub's Issues list page, for example, has multiple `navigation` regions each with distinct labels.

## 6. Common ARIA Patterns

### Accessible Button (when `<button>` cannot be used)

```html
<div role="button" tabindex="0" aria-pressed="false" onclick="toggle()" onkeydown="handleKey(event)">
  Toggle
</div>
```

### Accessible Form Field with Error

```html
<label for="username">Username</label>
<input id="username" type="text" aria-describedby="username-error" aria-invalid="true">
<span id="username-error" role="alert">Username cannot be empty</span>
```

### Live Region (status announcements)

```html
<div aria-live="polite" aria-atomic="true">
  <!-- Content inserted here is announced automatically -->
  3 results found
</div>
```

Use `aria-live="assertive"` only for urgent interruptions (errors). Use `"polite"` for non-urgent status updates.

### Expandable Section

```html
<button aria-expanded="false" aria-controls="details-panel">
  Show details
</button>
<div id="details-panel" hidden>
  ...content...
</div>
```

When expanded: set `aria-expanded="true"` and remove the `hidden` attribute.

## 7. How Standards Apply to GitHub Contributions

When you contribute to an open source project on GitHub, you will encounter accessibility in several contexts:

### Filing an Accessibility Bug

Reference the specific WCAG criterion. This makes the bug actionable:

> **Bad:** "The button isn't accessible."  
> **Good:** "The 'Subscribe' button has no visible focus indicator, failing WCAG 2.4.7 Focus Visible (Level AA). When navigating by keyboard, there is no visual indication of where focus is."

### Reviewing a PR for Accessibility

Checklist for any PR that touches HTML or UI:

- Do new images have `alt` attributes?
- Do new interactive elements work with keyboard only?
- Do new form fields have associated `<label>` elements?
- Are any new color-only indicators present?
- Does new dynamic content use `aria-live` if it updates without a page load?

### Writing Accessible Documentation

Documentation in Markdown is converted to HTML. Accessible Markdown:

- Use heading levels in order (don't skip from H1 to H3)
- Write descriptive link text (not "click here")
- Add alt text to images: `![Bar chart showing 40% improvement in task completion](chart.png)`
- Use actual lists (`-` or `1.`) rather than faking them with symbols

## 8. Testing Against Standards

### Automated Tools (catch ~30-40% of issues)

| Tool | Use |
| ------  | -----  |
| [axe DevTools](https://www.deque.com/axe/) | Browser extension - run on any page, get WCAG violations with criterion references |
| [WAVE](https://wave.webaim.org/) | Browser extension or web service - visual overlay showing issues |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | Built into Chrome DevTools - accessibility audit with scores |
| [IBM Equal Access Checker](https://www.ibm.com/able/toolkit/tools/) | Enterprise-grade browser extension |

### Manual Testing (catches the rest)

1. **Keyboard-only navigation** - unplug your mouse; can you do everything?
2. **Screen reader walkthrough** - navigate the feature with NVDA, JAWS, or VoiceOver
3. **200% zoom** - does content reflow without horizontal scrolling?
4. **High contrast mode** - Windows High Contrast or macOS Increase Contrast; are all elements still visible?
5. **Disable CSS** - does the content still make sense in reading order?

### Learning Cards: Testing Against Standards

<details>
<summary>Screen reader users</summary>

- You are the manual test — automated tools catch only 30-40% of issues; your screen reader walkthrough catches the rest
- Install the axe DevTools browser extension (Section 8 table) and run it on any page; results are announced as a list of violations with WCAG criterion references
- When doing a keyboard-only navigation test, press Tab repeatedly and listen — every interactive element should announce its name and role

</details>

<details>
<summary>Low vision users</summary>

- The 200% zoom test (item 3) mirrors your daily experience — if content breaks at 200%, file a bug citing WCAG 1.4.4 Resize Text
- Windows High Contrast mode test (item 4) is one click: Settings, Accessibility, Contrast themes — switch and check that all UI elements remain visible
- The WAVE browser extension overlays icons on the page showing errors and warnings — zoom in to read the small annotation labels

</details>

<details>
<summary>Sighted users</summary>

- The Lighthouse accessibility audit (Chrome DevTools, Ctrl+Shift+I, Lighthouse tab) gives a 0-100 score — aim for 90+ on any page you contribute to
- For the keyboard-only test, unplug your mouse and try completing every action — watch for the blue focus ring moving logically through the page
- The automated vs. manual split (30-40% / 60-70%) means green CI checks do not guarantee accessibility — always pair tool output with a quick manual review

</details>

## 9. Quick Reference: What to Check in a PR

| Check | WCAG Criterion |
| -------  | ---------------  |
| New images have alt text | 1.1.1 |
| Heading levels are in order | 1.3.1 |
| Links have descriptive text | 2.4.4 |
| Interactive elements are keyboard accessible | 2.1.1 |
| Focus is visible on all interactive elements | 2.4.7 |
| Form fields have labels | 1.3.1, 3.3.2 |
| Error messages are descriptive | 3.3.1, 3.3.3 |
| Color is not the only indicator | 1.4.1 |
| Dynamic content updates use aria-live | 4.1.3 |
| New UI components have name, role, value | 4.1.2 |

## 10. Official References

| Resource | URL |
| ----------  | -----  |
| WCAG 2.2 Full Specification | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) |
| WCAG 2.2 Quick Reference | [w3.org/WAI/WCAG22/quickref](https://www.w3.org/WAI/WCAG22/quickref/) |
| Understanding WCAG 2.2 | [w3.org/WAI/WCAG22/Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) |
| WAI-ARIA 1.2 Specification | [w3.org/TR/wai-aria-1.2](https://www.w3.org/TR/wai-aria-1.2/) |
| ARIA Authoring Practices Guide | [w3.org/WAI/ARIA/apg](https://www.w3.org/WAI/ARIA/apg/) |
| WebAIM Contrast Checker | [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) |
| MDN Accessibility | [developer.mozilla.org/en-US/docs/Web/Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) |
| GitHub Accessibility | [accessibility.github.com](https://accessibility.github.com) |

---

*Next: [Appendix N: Advanced Search](appendix-n-advanced-search.md)*  
*Back: [Appendix L: Agents Reference](appendix-l-agents-reference.md)*  
*Teaching chapter: [Chapter 08: Open Source Culture](08-open-source-culture.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [GitHub accessibility statement](https://docs.github.com/en/site-policy/other-site-policies/github-accessibility-statement)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **WCAG, ARIA, and What They Mean for Your Contributions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **1. WCAG 2.2 - The Four Principles:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **2. Conformance Levels: A, AA, AAA:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **3. Key Success Criteria for Web Contributions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **4. ARIA - Roles, States, and Properties:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **5. ARIA Landmark Roles:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **6. Common ARIA Patterns:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **7. How Standards Apply to GitHub Contributions:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **8. Testing Against Standards:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **9. Quick Reference: What to Check in a PR:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **10. Official References:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
