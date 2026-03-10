# Solution Reference: Bonus A -- Improve an Agent

This shows an example improvement PR for an existing accessibility agent.

## Example improvement

**Target agent:** `aria-specialist.agent.md`

**What I changed:** Added a new responsibility for checking `aria-live` regions in dynamic content. The existing agent covered static ARIA roles but did not mention live regions, which are critical for screen reader users interacting with content that updates without a page reload.

**Before (responsibilities excerpt):**

```markdown
- Check that interactive elements have correct ARIA roles
- Verify that ARIA states match the visual state of components
```

**After (with addition):**

```markdown
- Check that interactive elements have correct ARIA roles
- Verify that ARIA states match the visual state of components
- Review aria-live regions for appropriate politeness levels (polite vs assertive) on dynamic content updates
```

**PR description:**

> Adds live region checking to the ARIA specialist agent's responsibilities.
>
> Dynamic content updates (search results, notifications, form validation messages) need `aria-live` attributes so screen readers announce changes. The agent currently checks static ARIA attributes but not live regions. This addition closes that gap.

## What matters

The learning objective is contributing to an existing project by understanding its conventions and making a targeted improvement. If you identified a real gap and proposed a specific, well-reasoned change, you completed this bonus.
