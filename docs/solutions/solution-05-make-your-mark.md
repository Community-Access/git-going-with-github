# Solution Reference: Challenge 5 -- Make Your Mark

This shows an example edit and commit. Your changes will be different.

## Example edit

**File:** `docs/welcome.md`

**Before (line 15):**

```markdown
<!-- TODO: add link to workshop schedule -->
```

**After:**

```markdown
See the [workshop schedule](https://github.com/Community-Access/learning-room/blob/main/SCHEDULE.md) for session times.
```

## Example commit message

```
docs: replace TODO with workshop schedule link

Resolves the placeholder on line 15 of welcome.md by adding
a link to the schedule file.
```

### What makes a good commit message

- **First line:** Short summary (50 characters or less is ideal), starts with the type of change
- **Blank line:** Separates summary from body
- **Body (optional):** Explains what changed and why

### Simpler alternatives that are also fine

```
Fix TODO in welcome.md
```

```
Add schedule link to welcome page
```

Both are clear and descriptive. The more structured format is a convention, not a requirement.

## Alternate approaches

- **github.com:** Click the pencil icon on the file, make the edit, fill in the commit message at the bottom
- **github.dev:** Press `.` to open the editor, edit the file, use the Source Control sidebar to commit
- **VS Code:** Edit locally, stage with `git add`, commit with `git commit`
- **GitHub Desktop:** Edit in your preferred editor, return to Desktop, write the message, click Commit

## What matters

The learning objective is making a meaningful change and describing it in a commit message. Any clear edit with any descriptive message is a success.
