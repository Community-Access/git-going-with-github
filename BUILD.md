# HTML Documentation Build System

This repository converts all Markdown files to accessible HTML. The HTML output is committed alongside the Markdown source so that both formats are always in sync.

## Quick Start

### View HTML Documentation

All HTML files live in the `html/` directory:

- Open `html/index.html` in your browser for the homepage
- Browse the `html/docs/` folder for chapter and appendix pages
- All internal links between documents are preserved

### Build Commands

```bash
# Install dependencies (first time only)
npm install

# Build HTML once
npm run build:html

# Watch mode - auto-rebuild on markdown changes
npm run watch:html

# Clean generated files
npm run clean
```

## How It Works

The build is run **locally** before committing. There is no CI pipeline - you build the HTML yourself and commit both the `.md` source and the `html/` output in the same commit.

**Typical workflow:**

1. Edit one or more `.md` files
2. Run `npm run build:html`
3. Stage and commit everything: `git add -A && git commit -m "docs: update chapter 6 and rebuild HTML"`
4. Push

### What Gets Converted

- `docs/*.md` → `html/docs/*.html`
- `learning-room/**/*.md` → `html/learning-room/**/*.html`
- `README.md` → `html/index.html`
- `CONTRIBUTING.md` → `html/CONTRIBUTING.html`
- All other root-level `.md` files

### HTML Features

**Style and Layout:**

- GitHub-flavored Markdown styling (familiar appearance)
- Responsive design (mobile and desktop)
- Syntax highlighting for code blocks
- Clean, readable typography

**Accessibility:**

- Semantic HTML5 markup
- Proper ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Skip-to-content links
- Screen reader friendly navigation

**Navigation:**

- Breadcrumb links on every page
- Footer with return link
- Preserves all internal links between documents

## Configuration Files

- **Build script:** `scripts/build-html.js` - Conversion logic
- **Dependencies:** `package.json` - Node.js packages (marked, highlight.js, etc.)

## Customization

### Modify Styling

Edit `scripts/build-html.js` and look for the `customCss` constant to add custom styles.

### Change HTML Template

Edit the `htmlTemplate` function in `scripts/build-html.js` to modify the page structure.

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Commit package.json changes
git add package.json
git commit -m "chore: update HTML build dependencies"
```

## Troubleshooting

### Local Build Errors

**"Cannot find module 'marked'"**
→ Run `npm install` first

**"Permission denied" errors**
→ Check write permissions on the `html/` directory

**HTML doesn't look right**
→ Clear browser cache and reload

**Watch mode not detecting changes**
→ Ensure you're saving files (Ctrl+S in VS Code)

### HTML Files Not Appearing in Git

Check `.gitignore` to ensure `html/` is NOT listed there. The `html/` directory must be tracked by Git so the built output is always available in the repository.

## For Contributors

When submitting pull requests:

- **Edit the Markdown files**, then run `npm run build:html`
- **Include both** the `.md` changes and the updated `html/` files in your commit
- If you forget to rebuild, a reviewer will ask you to run the build before merging

## Additional Resources

- [marked documentation](https://marked.js.org/) - Markdown parser
- [highlight.js documentation](https://highlightjs.org/) - Syntax highlighting
- [GitHub Markdown spec](https://github.github.com/gfm/) - GitHub Flavored Markdown

For complete contributor guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md#7-html-documentation-build-system).

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Quick Start:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **How It Works:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Configuration Files:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Customization:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Troubleshooting:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **For Contributors:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Additional Resources:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
