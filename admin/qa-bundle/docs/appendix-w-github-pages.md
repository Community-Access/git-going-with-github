# Appendix W: Publishing with GitHub Pages
>
> **Listen to Episode 33:** [Publishing with GitHub Pages](https://lp.csedesigns.com/ggg/PODCASTS.html) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 08: Open Source Culture](08-open-source-culture.md) | Also relevant: [Chapter 21](21-next-steps.md)
>
> **Authoritative source:** [GitHub Docs: About Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

## How to Deploy a Static Website Directly from Your Repository

> GitHub Pages lets you publish a static website straight from a GitHub repository - no server, no hosting bill, no deployment pipeline required for simple sites. This appendix explains how to enable it, what it can publish, and how to ensure the published site meets the same accessibility standards as your source code.

### Learning Cards: GitHub Pages Overview

<details>
<summary>Screen reader users</summary>

- The Pages settings are under Settings (gear icon in repository navigation) then "Pages" in the left sidebar under the "Code and automation" group heading
- Branch and folder selectors in the Pages settings are standard `select` elements -- navigate with arrow keys to choose your publishing source
- After deployment, the published URL appears as a link at the top of the Pages settings page

</details>

<details>
<summary>Low vision users</summary>

- GitHub Pages settings use the same layout as other repository settings -- look for the "Pages" link in the left sidebar after clicking Settings
- The deployment status indicator shows a green checkmark for successful deployments and a red X for failures
- Published sites inherit no special styling from GitHub -- ensure your site's CSS provides adequate contrast and font sizing

</details>

<details>
<summary>Sighted users</summary>

- Find Pages settings via the repository's Settings tab, then "Pages" in the left sidebar under "Code and automation"
- The publishing source selector lets you choose a branch and folder (`/` root or `/docs`) -- select your combination and click Save
- After a successful deployment, a green banner with your site URL appears at the top of the Pages settings

</details>

## Table of Contents

1. [What GitHub Pages Is](#1-what-github-pages-is)
2. [Enabling GitHub Pages for a Repository](#2-enabling-github-pages-for-a-repository)
3. [Publishing Sources](#3-publishing-sources)
4. [The html/ Folder in This Project](#4-the-html-folder-in-this-project)
5. [Custom Domains](#5-custom-domains)
6. [HTTPS and Security](#6-https-and-security)
7. [Accessibility Considerations for Published Sites](#7-accessibility-considerations-for-published-sites)
8. [GitHub Actions and Continuous Deployment](#8-github-actions-and-continuous-deployment)
9. [Limitations](#9-limitations)
10. [Troubleshooting](#10-troubleshooting)

## 1. What GitHub Pages Is

GitHub Pages is a static site hosting service built into GitHub. It serves files directly from a branch or folder in your repository at a URL of the form:

```text
https://<username>.github.io/<repository-name>/
```

For organization accounts and user profile repositories (`<username>/<username>.github.io`), the URL becomes:

```text
https://<username>.github.io/
```

**What "static" means:** GitHub Pages only serves files as-is - HTML, CSS, JavaScript, images, PDFs. It does not run server-side code (no PHP, no Python, no Node.js request handlers). If you need a database or dynamic server logic, you need a different host.

### What it is good for

- Documentation sites
- Workshop materials (like this project)
- Project landing pages
- Personal portfolios
- Simple blogs via Jekyll

## 2. Enabling GitHub Pages for a Repository

### Step-by-step (GitHub.com)

1. Go to the repository on GitHub.com
2. Click **Settings** (the gear icon in the top navigation)
3. In the left sidebar, scroll to **Code and automation** and click **Pages**
4. Under **Build and deployment**, choose your publishing source:
   - **Deploy from a branch** - serve files directly from a branch/folder
   - **GitHub Actions** - use a workflow to build and deploy
5. If using "Deploy from a branch":
   - Select the branch (e.g. `main` or `master`)
   - Select the folder: `/` (root) or `/docs`
6. Click **Save**

GitHub will build and deploy within a minute or two. The URL appears at the top of the Pages settings once the first deployment succeeds.

### Screen reader navigation for the Pages settings page

- The **Settings** tab is a link in the repository's top navigation bar. It has the accessible name "Settings"
- The **Pages** option in the left sidebar is a link under the "Code and automation" group heading
- The branch and folder dropdowns are standard `<select>` elements - navigate with arrow keys

## 3. Publishing Sources

### Deploy from a branch

The simplest option. GitHub reads files directly from a branch.

| Folder option | What it serves |
| ---------------  | ---------------  |
| `/` (root) | Serves the entire repository root |
| `/docs` | Serves only the `docs/` folder - useful when your repository also contains source code |

**Best practice:** Use `/docs` to isolate the published content from source files, especially for projects with build pipelines where the output lives in a specific folder.

### GitHub Actions

Use a workflow (YAML file in `.github/workflows/`) to build your site before publishing. This is required when:

- Your source is Markdown and you need a build step (e.g. this project's `scripts/build-html.js`)
- You are using a static site generator like Jekyll, Hugo, or Eleventy
- You want to run accessibility tests in CI before publishing

A basic workflow for this project would:

1. Check out the repository
2. Run `node scripts/build-html.js`
3. Upload the `html/` folder as the Pages artifact

## 4. The html/ Folder in This Project

This project has a pre-built HTML mirror of all Markdown content in the `html/` folder, generated by `scripts/build-html.js`. To publish this as a GitHub Pages site:

### Option A: Manual publishing from `html/` folder

Because GitHub Pages only supports `/` (root) or `/docs` as folder sources, and this project's output is in `html/`, you have two options:

#### Option A1 - Copy html/ contents to docs/

```bash
# Copy the html/ output into docs/ for GitHub Pages
cp -r html/* docs/
git add docs/
git commit -m "Publish HTML output to docs/ for GitHub Pages"
git push
```

Then set Pages source to branch `master`, folder `/docs`.

## Option A2 - Rename html/ to docs/

If the project does not already use `docs/` for Markdown sources, you could rename the output folder:

```bash
# Update the build script output path first, then
git mv html/ docs/
git commit -m "Rename html/ to docs/ for GitHub Pages compatibility"
git push
```

Note: This project uses `docs/` for Markdown source files, so this would conflict. Option A1 or the Actions approach below is safer.

### Option B: GitHub Actions workflow

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build HTML
        run: node scripts/build-html.js

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: html/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This workflow triggers on every push to `master`, rebuilds the HTML, and deploys the `html/` folder.

## 5. Custom Domains

GitHub Pages supports custom domains (e.g. `learning.community-access.org` instead of `community-access.github.io/Learning-Room`).

### Setting up a custom domain

1. In repository Settings → Pages, enter your domain in the **Custom domain** field and click Save
2. GitHub creates a `CNAME` file in the repository root containing your domain name
3. At your DNS provider, create the appropriate records:

| Domain type | DNS record type | Value |
| -------------  | ----------------  | -------  |
| Subdomain (e.g. `learning.community-access.org`) | CNAME | `community-access.github.io` |
| Apex domain (e.g. `community-access.org`) | A records (×4) | GitHub's IP addresses (see below) |

#### GitHub's current A record IPs for apex domains

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

DNS changes can take up to 48 hours to propagate. GitHub Pages checks and verifies the domain automatically once DNS is configured.

### Domain verification

To prevent domain takeover attacks, GitHub recommends verifying your custom domain in your account or organization settings (Settings → Pages → Add a domain). This prevents others from claiming your domain for their GitHub Pages if you temporarily remove it.

## 6. HTTPS and Security

GitHub Pages enforces HTTPS automatically for `github.io` subdomains. For custom domains:

1. After DNS propagates, check **Enforce HTTPS** in Pages settings
2. GitHub Pages uses Let's Encrypt to provision a certificate automatically
3. Enforcing HTTPS redirects all HTTP traffic to HTTPS

**Important:** Never store secrets, API keys, or private data in a GitHub Pages repository. The repository content is public (on public repositories) and is served as-is. Even deleted files remain in git history.

## 7. Accessibility Considerations for Published Sites

Publishing a site does not automatically make it accessible. Consider the following for the published HTML output:

### Learning Cards: Accessibility of Published Sites

<details>
<summary>Screen reader users</summary>

- Verify that published HTML pages include a skip-to-content link as the first focusable element -- press `Tab` once after the page loads to check
- Confirm the page has a descriptive `title` element and a single `H1` heading -- these are announced first when the page opens
- Test that all internal navigation links work and land on the correct heading or section

</details>

<details>
<summary>Low vision users</summary>

- Run an automated contrast checker (axe, WAVE) on published pages after any CSS changes to confirm text remains readable
- Test the published site at 200% browser zoom to verify layouts do not break or hide content
- If the site uses a custom theme, verify it works in both forced-colors mode (Windows High Contrast) and standard mode

</details>

<details>
<summary>Sighted users</summary>

- Check that the page has clear visual heading hierarchy -- headings should be visually distinct and match the HTML heading levels (H1, H2, H3)
- Verify all images have visible alt text or are clearly decorative -- missing alt attributes leave broken-image icons with no context
- Test keyboard navigation through the entire page by pressing Tab repeatedly to ensure focus is visible and flows logically

</details>

### Navigation and landmarks

The HTML generated by `scripts/build-html.js` converts Markdown headings and structure to HTML. Verify the output includes:

- A `<main>` landmark wrapping the primary content
- Logical heading hierarchy (H1 → H2 → H3)
- A page `<title>` that reflects the document topic

### Skip navigation

For sites with repeated navigation on every page, add a skip link as the first element in `<body>`:

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

With CSS to show it only on focus:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
}
.skip-link:focus {
  top: 0;
}
```

### Focus management for single-page navigation

If the site uses JavaScript to load content without full page reloads, manage focus explicitly when content changes. Move focus to the new `<h1>` or a wrapper with `tabindex="-1"` after navigation.

### Image alt text

All images in published pages should have appropriate `alt` attributes. Decorative images should use `alt=""` (empty, not missing) to be skipped by screen readers.

### Color contrast

Run the published pages through an automated checker ([axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/)) after changes to the stylesheet to verify contrast ratios remain compliant.

### Testing the published site

After deployment, test the live URL rather than only local files. Some issues (e.g. mixed content, broken relative links, missing files) only appear when served from a web server.

#### Recommended post-deployment checks

1. Navigate all pages keyboard-only
2. Run axe DevTools on the index page and at least one content page
3. Verify no broken links with a link checker (e.g. [W3C Link Checker](https://validator.w3.org/checklink))
4. Test with a screen reader announcement of the page title and `<h1>`

## 8. GitHub Actions and Continuous Deployment

Using the Actions workflow described in [Section 4](#4-the-html-folder-in-this-project) means every push to `master` automatically rebuilds and redeploys the site.

### Adding automated accessibility checks to the workflow

Extend the workflow to fail the build if accessibility violations are found:

```yaml
      - name: Install axe CLI
        run: npm install -g @axe-core/cli

      - name: Run accessibility check
        run: axe html/index.html --exit
```

This uses the [axe-core CLI](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli) to scan the built index page. The `--exit` flag causes the step to fail if violations are found, blocking the deployment.

For more comprehensive checking, scan multiple pages:

```yaml
      - name: Run accessibility checks
        run: |
          for file in html/docs/*.html; do
            axe "$file" --exit
          done
```

## 9. Limitations

| Limitation | Detail |
| ------------  | --------  |
| **Repository size** | GitHub Pages sites should be under 1 GB |
| **Bandwidth** | Soft limit of 100 GB per month |
| **Build time** | Jekyll builds must complete within 10 minutes |
| **No server-side code** | No PHP, Python, Ruby on Rails, Node.js handlers |
| **No .htaccess** | Apache-style redirects are not supported; use `_redirects` for some static hosts |
| **Public repositories** | For free accounts, GitHub Pages requires the repository to be public |
| **Private Pages** | Available on GitHub Enterprise plans only |

## 10. Troubleshooting

### Site not updating after a push

- Check the **Actions** tab for a failed deploy workflow
- Check Settings → Pages - the most recent deployment timestamp should match your push
- Hard-refresh the browser (`Ctrl+F5` / `Cmd+Shift+R`) to bypass the cache
- DNS TTL caching can delay custom domain updates up to the TTL value (often 1 hour)

### 404 on all pages except index

This usually indicates a **base URL mismatch**. If your site is at `https://user.github.io/my-repo/`, all relative asset and link paths must account for the `/my-repo/` path prefix. Check that the HTML output uses relative paths (`./styles/main.css`) rather than root-relative paths (`/styles/main.css`).

### HTTPS certificate not provisioning

- Verify DNS records are correctly set
- Ensure the domain is not proxied through a CDN (e.g. Cloudflare orange-cloud) - GitHub Pages needs to see the DNS record directly to provision the cert
- Allow up to 24 hours after correct DNS propagation

### Screen reader announces wrong page title

The published `<title>` element is set during the HTML build step. Update the template in `scripts/build-html.js` to ensure each page has a unique, descriptive title.

---

*Next: [Appendix X: Resources](appendix-x-resources.md)*  
*Back: [Appendix V: GitHub Mobile](appendix-v-github-mobile.md)*  
*Teaching chapter: [Chapter 08: Open Source Culture](08-open-source-culture.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub Pages docs](https://docs.github.com/en/pages)
- [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **How to Deploy a Static Website Directly from Your Repository:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **1. What GitHub Pages Is:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **2. Enabling GitHub Pages for a Repository:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **3. Publishing Sources:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- **4. The html/ Folder in This Project:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [GitHub Projects docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- **Option A2 - Rename html/ to docs/:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- **5. Custom Domains:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- **6. HTTPS and Security:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features)
- **7. Accessibility Considerations for Published Sites:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- **8. GitHub Actions and Continuous Deployment:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **9. Limitations:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- **10. Troubleshooting:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Pages docs](https://docs.github.com/en/pages), [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
