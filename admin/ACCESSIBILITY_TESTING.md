# Accessibility Testing Checklist
## Verify GitHub Templates & Workflows Are Accessible

This checklist helps you test issue templates, PRs, and GitHub workflows to ensure they're usable by people with disabilities (especially screen reader users).

## Quick Checklist for Templates

Use before deploying any new issue template or form.

### Form Fields & Labels
- [ ] Every form field has a visible label
- [ ] Label text is clear and describes what's needed (not "Please enter")
- [ ] Required fields are marked and announced as required
- [ ] Help text is associated with each field (not just placeholder text)
- [ ] No fields rely on color alone to indicate required/error status

### Form Structure
- [ ] Form inputs are in logical order (top to bottom)
- [ ] Dropdown options are readable and include blank option or instruction
- [ ] Checkboxes and radio buttons are grouped and labeled
- [ ] No more than 6-8 required fields (reduces cognitive load)
- [ ] Preview or review step before submission (allows verification)

### Instructions & Guidance
- [ ] Markdown section explains what's needed and why
- [ ] Instructions use simple language (8th grade reading level)
- [ ] Headings are in order (H2, H3, H4 - not H2, H4)
- [ ] Links have descriptive text (not "click here")
- [ ] Code examples are formatted clearly (not in plain text)

### YAML & Technical
- [ ] YAML passes syntax validation (https://www.yamllint.com/)
- [ ] No trailing spaces or mixed indentation
- [ ] All required fields present: `name:`, `description:`, `body:`
- [ ] Field IDs are unique and lowercase with hyphens (e.g., `browser_type`)

## Screen Reader Testing Workflow

### Before Testing
1. **Prepare:** Have form open in browser with screen reader ready
2. **Choose:** Test with NVDA (Windows), JAWS (Windows), or VoiceOver (macOS)
3. **Record:** Note any issues for fixing

### NVDA Testing (Windows)
```
1. Press NVDA+Space to enable browse mode on page
2. Press H to navigate to first heading
3. Use H repeatedly to scan all headings (should be H1 → H2 → H3, not jumps)
4. Press B to find buttons, forms
5. Navigate to form field: Tab or arrow keys
6. Screen reader should announce:
   "[Label text] [field type] [required if applicable]"
   Example: "Email address edit text, required"
7. Tab through every field in order
8. Check Tab order makes sense (left-to-right, top-to-bottom)
9. Verify instructions between fields are heard
```

**What to listen for:**
- [ ] Every field label is announced
- [ ] "Required" is announced for required fields
- [ ] No fields are skipped
- [ ] Field types are clear (edit text, dropdown, checkbox, etc.)
- [ ] Help text is read before or near the field

### JAWS Testing (Windows)
```
1. Press Spacebar to enter browse mode
2. Press Insert+F6 to open headings list
   - Verify headings are in order (1 → 2 → 3, no jumps)
   - Close list (Escape)
3. Press Insert+F5 to open forms list
   - Should see every field
   - Close list
4. Tab through form field by field
5. JAWS should announce:
   "[Label] [field type] [required if applicable]"
6. Press Insert+Down to read entire form (simulates form-scanning)
```

**What to listen for:**
- [ ] Form start is announced
- [ ] All fields are listed in Forms List
- [ ] Required fields say "required"
- [ ] Field order matches logical reading order
- [ ] No unlabeled fields

### VoiceOver Testing (macOS)
```
1. Press VO+U to open Web Rotor
2. Navigate to Form Controls section
   - Should list all fields
   - Verify count matches expected fields
3. Navigate to Headings section
   - Check heading hierarchy (no jumps)
4. Press VO+Right arrow to move through page
   - Should hear each field label before field
5. Press VO+Space on field to interact
6. VoiceOver should announce:
   "[Label], [field type] [required if applicable]"
```

**What to listen for:**
- [ ] Rotor shows all form controls
- [ ] Heading levels are correct (no 1 → 3 jumps)
- [ ] Field labels are adjacent to fields
- [ ] Instructions are readable

## Accessibility Testing by Component

### Checkboxes & Radio Buttons
- [ ] Grouped label describes the entire group
- [ ] Individual labels describe each option
- [ ] Screen reader announces number of options
- [ ] Example: Screen reader says: "Browser, radio button group, 3 items. Chrome, radio button, not selected"

**Test:** Tab to group, use arrow keys to select. Screen reader should guide you clearly.

### Dropdowns
- [ ] Visible label above or adjacent to dropdown
- [ ] Dropdown shows currently selected value
- [ ] Opening dropdown announces all options (or "expandable menu")
- [ ] Options include instruction or blank option if optional
- [ ] Focus style is visible (not invisible on dark backgrounds)

**Test:** Tab to dropdown, press Down/Space to open, arrow through options.

### Links & Buttons
- [ ] Link text describes where it goes (not "click here", "link", "read more")
- [ ] Button text describes what happens (not "submit", "go", "continue")
- [ ] Focuses visible with keyboard (Tab key shows clear highlight)
- [ ] No links that are only images (images need alt text)

**Test:** Press Tab to navigate, read labels aloud.

### Text Fields (Input, Textarea)
- [ ] Label directly associated with field (via `label` tag or aria-label)
- [ ] Placeholder text is NOT a substitute for label
- [ ] Example: Bad: Empty field with gray "Enter email" (disappears when you type)
- [ ] Example: Good: Visible label "Email address:" + field

**Test:** Tab to field, screen reader announces label, then focus moves into field.

### Instructions & Help Text
- [ ] Help text appears visually near the field
- [ ] Help text is announced by screen reader (not hidden)
- [ ] Instructions use simple language
- [ ] No abbreviations without explanation

**Test:** Tab to field, screen reader should announce label, field type, help text, and required status.

## Color & Contrast Testing

- [ ] Text contrast is 4.5:1 or higher (WCAG AA for normal text)
- [ ] Color is not the only way to show information
  - Example: Bad: "Red fields are errors" (only color indicates error)
  - Example: Good: "Error" label + red color + error icon
- [ ] Required fields marked with  or "required" text (not just color)
- [ ] Disabled fields are visually distinct

**Test:** Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

## Keyboard Navigation Testing

Test WITHOUT using the mouse.

- [ ] Tab key navigates to all interactive elements
- [ ] Tab order follows logical reading order (left-to-right, top-to-bottom)
- [ ] Shift+Tab goes backwards
- [ ] Focus indicator is visible (not hidden or very faint)
- [ ] Can activate buttons with Enter or Space
- [ ] Can select radio buttons and checkboxes with arrow keys
- [ ] Can open dropdowns with Space or Down arrow
- [ ] Can submit form with Enter from submit button

**Test:** Close trackpad, use Tab/Shift+Tab/Enter/Space only.

## Mobile & Responsive Testing

- [ ] Form is readable on small screens (mobile, tablet)
- [ ] Form is usable with touch (buttons large enough: 44x44px minimum)
- [ ] Form labels don't disappear on narrow screens
- [ ] Touch targets don't overlap
- [ ] No horizontal scrolling required to use form

**Test:** Resize browser to mobile width (375px), or use phone/tablet to fill form.

## Multilingual & Plain Language Testing

- [ ] Instructions use simple, clear language (avoid jargon)
- [ ] No unexplained abbreviations (spell out first use, then abbreviate)
- [ ] Text can be enlarged to 200% without breaking layout
- [ ] If translated, consider cultural appropriateness of images/phrasings

**Test:** Select browser zoom 200% (Ctrl+Plus / Cmd+Plus), or use browser reader mode.

## Testing Checklist Summary

### Before Deploying (Must-Have)
- [ ] All form fields have labels
- [ ] Required fields marked and announced
- [ ] Tab order is logical
- [ ] Focus styles are visible
- [ ] Color contrast is adequate (4.5:1 minimum)
- [ ] Heading hierarchy is correct
- [ ] YAML syntax is valid

### Before Workshop/Training (Should-Have)
- [ ] Tested with at least 1 screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Keyboard-only workthrough (no mouse)
- [ ] Mobile/responsive check
- [ ] Plain language review

### Best Practice (Nice-to-Have)
- [ ] Tested with all 3 screen readers
- [ ] Tested with multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested with actual users with disabilities
- [ ] Performance tested (forms load quickly)

## Common Accessibility Failures & How to Test Them

| Failure | What to Check | How to Detect |
|---------|---------------|---------------|
| No field labels | Screen reader announces field but not what it's for | Tab to field; screen reader should say "[Label] [field type]" |
| Bad heading hierarchy | Heading jumps from H1 to H3 (confusing outline) | Use screen reader heading list (NVDA: not in list) |
| Color-only errors | Error only shown in red, not marked with text | Add error to optional field; look for text + color |
| Invisible focus | Can't see which element has keyboard focus | Tab through form; focus outline should be clear |
| Unlabeled fields | Dropdown or input has no visible/announced name | Tab to field; screen reader says "(blank)" |
| Links say "click here" | Not descriptive; screen reader only hears "click here" | Read link text aloud; should make sense out of context |
| No skip link | Can't skip repetitive navigation | Press Tab to first element; should offer "skip to content" |

## Testing Tools & Resources

### Automated Testing
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/ (color accessibility)
- **WAVE Browser Extension:** https://wave.webaim.org/extension/ (errors & warnings)
- **Axe DevTools:** https://www.deque.com/axe/devtools/ (comprehensive audit)
- **Lighthouse (built into Chrome):** F12 → Lighthouse → Accessibility (score & feedback)

### Manual Testing
- **NVDA (free):** https://www.nvaccess.org/ (Windows)
- **JAWS (trial available):** https://www.freedomscientific.com/ (Windows)
- **VoiceOver (built-in):** macOS/iOS
- **Keyboard Testing:** No tools needed - just don't use mouse!

### Feedback
- **Screen Reader Commands:** See `docs/appendix-b-screen-reader-cheatsheet.md`
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Get Help:** Open an issue with accessibility testing results

## After Testing: Recording Issues

When you find an accessibility problem, document it:

```
Title: [Accessibility] Form label missing on email field

Description:
When tabbing to the email input on the issue template, the screen reader 
announces "edit text, required" but does not announce what the field is for.

Steps to reproduce:
1. Open [template file/page]
2. Tab to email field
3. Listen to screen reader announcement

Expected:
Screen reader should announce: "Email address, edit text, required"

Actual:
Screen reader announces: "Edit text, required"

Screen reader tested: NVDA 2025.3.3
Browser: Chrome 130
OS: Windows 11
```

## Testing the Built HTML Output

This repository includes a build system that converts all Markdown files to HTML (see `BUILD.md`). If participants will use the HTML versions, test them separately:

### Heading Hierarchy
- [ ] Each HTML page has exactly one `<h1>` element
- [ ] Heading levels don't skip (no `<h1>` → `<h3>` jumps)
- [ ] Navigation footers don't break the heading outline

### Link Targets
- [ ] Internal links resolve correctly (`.md` links are converted to `.html`)
- [ ] Anchor links (`#section-name`) scroll to the correct position
- [ ] External links open and are not broken

### Landmark Structure
- [ ] The `<main>` element wraps the primary content
- [ ] Navigation elements are properly structured
- [ ] Screen reader can identify page regions using landmarks (`D` key in NVDA/JAWS)

### Validation
- [ ] Run pages through the [W3C HTML Validator](https://validator.w3.org/) - check for errors
- [ ] Run pages through [WAVE](https://wave.webaim.org/) - check for accessibility errors
- [ ] Verify syntax-highlighted code blocks are readable (not color-only)

**Quick test:** Open `html/index.html` in a browser, enable your screen reader, and navigate using `H` (headings) and `K` (links). Every heading and link should be announced clearly.

## Questions or Feedback?

- **Having trouble testing?** See `TROUBLESHOOTING.md`
- **Need screen reader help?** See `docs/appendix-b-screen-reader-cheatsheet.md`
- **Want resources?** See `docs/appendix-x-resources.md`

*Last updated: February 2026*  
*Accessibility is foundational to inclusive workflows.*

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

- **Verify GitHub Templates & Workflows Are Accessible:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Quick Checklist for Templates:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Screen Reader Testing Workflow:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Accessibility Testing by Component:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Color & Contrast Testing:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Keyboard Navigation Testing:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Mobile & Responsive Testing:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Multilingual & Plain Language Testing:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Testing Checklist Summary:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Common Accessibility Failures & How to Test Them:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Testing Tools & Resources:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **After Testing: Recording Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Testing the Built HTML Output:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Questions or Feedback?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
