# Solution Reference: Bonus C -- Create a Group Challenge

This shows an example group challenge design.

## Example: Accessibility Audit Relay

**Designed for:** 3-5 students

### Challenge description

Students audit a sample web page for accessibility issues, relay-style. Each person has a different focus area:

- **Student 1:** Checks all images for meaningful alt text
- **Student 2:** Reviews heading hierarchy (H1, H2, H3 order)
- **Student 3:** Tests every link for descriptive text (no "click here")
- **Student 4:** Checks color contrast on text elements
- **Student 5 (if present):** Reviews keyboard navigation order

### How it works

1. The group forks a sample repository containing a deliberately imperfect HTML page
2. Each student creates a branch for their focus area
3. Each student files issues for the problems they find
4. The group discusses which fixes to prioritize
5. Each student submits a PR fixing at least one issue
6. The group reviews and merges each other's PRs

### Evidence

Each student posts: their issues filed, their PR, and one review they gave.

### Why this works for a group

- Every student has a defined role so no one is left out
- The relay structure means students depend on each other (Student 3 cannot fix link text if Student 1 has not pushed their alt text fixes yet)
- The final product is a genuinely more accessible page

## What matters

The learning objective is designing collaborative work that gives every participant a meaningful role. If your challenge design includes clear roles, concrete deliverables, and a reason for people to work together (not just alongside each other), you completed this bonus.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Example: Accessibility Audit Relay:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
