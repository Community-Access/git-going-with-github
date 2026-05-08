# Solution Reference: Challenge 14 -- Design an Issue Template

This shows a completed custom YAML issue template with annotations.

## Example template

**File:** `.github/ISSUE_TEMPLATE/accessibility-report.yml`

```yaml
# The name appears in the template chooser when someone clicks "New Issue"
name: Accessibility Report
# The description appears below the name in the chooser
description: Report an accessibility barrier in workshop materials
# Labels are automatically applied to issues created from this template
labels: ["accessibility", "bug"]
# The title field pre-fills the issue title with a pattern
title: "[A11y]: "
# The body defines the form fields
body:
  # A description field adds context that is not an input
  - type: markdown
    attributes:
      value: |
        Thank you for reporting an accessibility barrier.
        Your feedback helps us make the workshop inclusive for everyone.

  # A text input for a short answer
  - type: input
    id: location
    attributes:
      label: Where did you encounter the barrier?
      description: File name, URL, or description of where the problem is
      placeholder: "Example: docs/welcome.md line 15"
    validations:
      required: true

  # A textarea for a longer description
  - type: textarea
    id: description
    attributes:
      label: Describe the barrier
      description: What happened? What did you expect to happen?
    validations:
      required: true

  # A dropdown for assistive technology
  - type: dropdown
    id: assistive-tech
    attributes:
      label: Assistive technology (if applicable)
      options:
        - Screen reader (NVDA)
        - Screen reader (JAWS)
        - Screen reader (VoiceOver)
        - Screen magnifier
        - Voice control
        - Switch access
        - Keyboard only
        - Other
        - Not applicable
    validations:
      required: false

  # A dropdown for severity
  - type: dropdown
    id: severity
    attributes:
      label: How much does this affect your ability to participate?
      options:
        - Blocked (cannot continue)
        - Difficult (can work around it)
        - Minor (cosmetic or preference)
    validations:
      required: true
```

## What each field type does

| Type | Purpose | When to use |
|---|---|---|
| `markdown` | Displays text that is not an input field | Instructions, context, legal notices |
| `input` | Single-line text field | Short answers like file names, URLs, versions |
| `textarea` | Multi-line text field | Descriptions, steps to reproduce, long answers |
| `dropdown` | Selection from predefined options | Categories, severity levels, yes/no questions |
| `checkboxes` | Multiple selection checkboxes | Checklists, acknowledgments, multi-select categories |

## Alternate valid templates

Any topic works for this challenge. Other examples:

- A bug report template for the workshop
- A feature request template for new workshop topics
- A feedback template for session evaluations
- A question template for asking for help

## What matters

The learning objective is understanding structured issue templates as a way to guide contributors. If your YAML file has a `name`, `description`, and at least one `body` field, you completed this challenge.
