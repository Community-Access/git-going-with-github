#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked, Renderer } = require('marked');
const hljs = require('highlight.js');
const chokidar = require('chokidar');

// Accumulates page data for search index
const searchPages = [];

// Configure marked with syntax highlighting via custom renderer (marked v11+)
const renderer = new Renderer();
renderer.code = function (code, infostring, escaped) {
  const lang = (infostring || '').match(/^\S*/)?.[0] || null;
  const language = lang && hljs.getLanguage(lang) ? lang : null;
  let highlighted;
  try {
    highlighted = language
      ? hljs.highlight(code, { language }).value
      : hljs.highlightAuto(code).value;
  } catch (err) {
    highlighted = code;
  }
  const cls = language ? ` class="hljs language-${language}"` : ' class="hljs"';
  return `<pre><code${cls}>${highlighted}</code></pre>\n`;
};

// Generate heading IDs matching GitHub's anchor algorithm so TOC links work
function headingAnchor(text) {
  // Strip inline HTML tags (e.g. <code>, <strong>)
  const plain = text.replace(/<[^>]+>/g, '');
  return plain
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // remove punctuation except hyphens
    .replace(/ /g, '-');        // spaces → hyphens (preserve consecutive hyphens)
}

renderer.heading = function (text, level) {
  const id = headingAnchor(text);
  return `<h${level} id="${id}">${text}</h${level}>\n`;
};

// Unwrap single <p> from list items so screen readers don't announce a
// separate paragraph element before reading the bullet text (loose list fix)
renderer.listitem = function (text, task, checked) {
  const unwrapped = text.replace(/^<p>([\s\S]*?)<\/p>\n?$/, '$1');
  if (task) {
    if (/<input\b[^>]*type="checkbox"/.test(unwrapped)) {
      return `<li>${unwrapped}</li>\n`;
    }
    const checkbox = `<input type="checkbox"${checked ? ' checked' : ''} disabled> `;
    return `<li>${checkbox}${unwrapped}</li>\n`;
  }
  return `<li>${unwrapped}</li>\n`;
};

// Add scope="col" to all <th> elements for WCAG 1.3.1
renderer.tablecell = function (content, flags) {
  const tag = flags.header ? 'th' : 'td';
  const align = flags.align ? ` style="text-align:${flags.align}"` : '';
  const scope = flags.header ? ' scope="col"' : '';
  return `<${tag}${align}${scope}>${content}</${tag}>\n`;
};

marked.setOptions({
  breaks: false,
  gfm: true,
  renderer
});

function normalizeGeneratedText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^(={7,})(.*)$/gm, '<span aria-hidden="true"></span>$1$2')
    .replace(/[ \t]+$/gm, '')
    .trimEnd() + '\n';
}

function writeGeneratedFile(filePath, content) {
  fs.writeFileSync(filePath, normalizeGeneratedText(content), 'utf-8');
}

// HTML template with accessibility features
const htmlTemplate = (content, title, relativePath) => {
  const depth = relativePath.split('/').length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  const isHome = relativePath === 'index.html';
  const isRegister = relativePath === 'REGISTER.html';
  const siteName = 'GIT Going with GitHub';
  const titleContainsSiteName = title === siteName || title.includes(siteName);
  const pageTitle = isHome || titleContainsSiteName ? title : `${title} - ${siteName}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="GIT Going with GitHub - A two-day accessible open source workshop by Community Access">
  <title>${pageTitle}</title>
  <link rel="stylesheet" href="${prefix}styles/github-markdown.css">
  <link rel="stylesheet" href="${prefix}styles/highlight.css">
  <link rel="stylesheet" href="${prefix}styles/custom.css">
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
    @media (max-width: 767px) {
      .markdown-body {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header" role="banner">
    <div class="site-header-inner">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        ${isHome
      ? '<span aria-current="page">Home</span>'
      : `<a href="${prefix}index.html">Home</a> <span aria-hidden="true">›</span> <span aria-current="page">${title}</span>`
    }
      </nav>
      <div class="header-actions">
        <a href="https://github.com/Community-Access/git-going-with-github/wiki" class="wiki-link" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.06l-2.573 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.457 1.457 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 1 1 1.06-1.06l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h.25a.25.25 0 0 0 .25-.25v-5.5Z"/>
          </svg>
          Wiki
        </a>
        <form role="search" class="search-form" action="${prefix}search.html" method="get">
        <label for="site-search" class="search-label">Search docs</label>
        <input
          type="search"
          id="site-search"
          class="search-input"
          name="q"
          placeholder="Search docs…"
          autocomplete="off"
          aria-label="Search documentation"
        >
        <button type="submit" class="search-button" aria-label="Submit search">
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
          </svg>
        </button>
      </form>
      </div>
    </div>
  </header>
  <main id="main-content" class="markdown-body">
    ${content}
  </main>
  <footer role="contentinfo" class="site-footer">
    <p><strong>GIT Going with GitHub</strong> - A workshop by <a href="https://community-access.org">Community Access</a></p>
    <p><a href="https://github.com/community-access/git-going-with-github">View on GitHub</a> · <a href="https://community-access.org">community-access.org</a></p>
  </footer>
  ${isRegister ? `<script>
(function() {
  // Lightweight gate for temporary cohort control on the public opt-in page.
  var accessKey = 'gggStudentOptInAccess';
  var failCountKey = 'gggStudentOptInFailCount';
  var lockUntilKey = 'gggStudentOptInLockUntil';
  var maxAttempts = 3;
  var lockMinutes = 15;
  var expected = atob('R0dHMjAyNiE=');

  function renderRestricted(message) {
    document.body.innerHTML = [
      '<main class="markdown-body" id="main-content">',
      '<h1>Access restricted</h1>',
      '<p>This student opt-in page is temporarily password protected.</p>',
      '<p>' + message + '</p>',
      '<p>If you need access, contact the workshop facilitators in the discussion forum.</p>',
      '<p><a href="https://github.com/community-access/git-going-with-github/discussions">Open Discussion Forum</a></p>',
      '</main>'
    ].join('');
  }

  if (sessionStorage.getItem(accessKey) === 'granted') {
    return;
  }

  var now = Date.now();
  var lockUntil = parseInt(localStorage.getItem(lockUntilKey) || '0', 10);
  if (lockUntil > now) {
    var minutesRemaining = Math.ceil((lockUntil - now) / 60000);
    renderRestricted('For security, this page is temporarily locked due to multiple incorrect password attempts. Please try again in about ' + minutesRemaining + ' minute(s).');
    return;
  }

  if (lockUntil > 0 && lockUntil <= now) {
    localStorage.removeItem(lockUntilKey);
    localStorage.setItem(failCountKey, '0');
  }

  var failCount = parseInt(localStorage.getItem(failCountKey) || '0', 10);
  if (isNaN(failCount) || failCount < 0) {
    failCount = 0;
  }

  var allowed = false;
  while (failCount < maxAttempts) {
    var attemptsRemaining = maxAttempts - failCount;
    var entered = window.prompt('Welcome. This page is protected for current students.\n\nEnter the student opt-in password (' + attemptsRemaining + ' attempt(s) remaining):');
    if (entered === null) {
      break;
    }
    if (entered === expected) {
      sessionStorage.setItem(accessKey, 'granted');
      localStorage.setItem(failCountKey, '0');
      localStorage.removeItem(lockUntilKey);
      allowed = true;
      break;
    }
    failCount += 1;
    localStorage.setItem(failCountKey, String(failCount));
    if (failCount < maxAttempts) {
      var remaining = maxAttempts - failCount;
      window.alert('That password was not correct. Please try again. Remaining attempts: ' + remaining + '.');
    }
  }

  if (!allowed) {
    if (failCount >= maxAttempts) {
      var lockUntilTs = Date.now() + (lockMinutes * 60000);
      localStorage.setItem(lockUntilKey, String(lockUntilTs));
      renderRestricted('For security, this page is now locked for ' + lockMinutes + ' minutes because too many incorrect passwords were entered.');
    } else {
      renderRestricted('No password was entered, so access could not be granted.');
    }
  }
})();
</script>` : ''}
  ${(isHome || isRegister) ? `<script>
(function() {
  var url = 'https://api.github.com/search/issues?q=repo:community-access/git-going-with-github+label:registration+is:issue+is:open';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Accept', 'application/vnd.github+json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var count = JSON.parse(xhr.responseText).total_count;
        var els = document.querySelectorAll('[id^="registration-count"]');
        for (var i = 0; i < els.length; i++) {
          els[i].textContent = count;
        }
      } catch (e) {}
    }
  };
  xhr.onerror = function() {};
  xhr.send();
})();
</script>` : ''}</body>
</html>`;
};

// Create output directory structure
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Convert markdown file to HTML
function convertMarkdownFile(mdPath, outputDir) {
  try {
    const content = fs.readFileSync(mdPath, 'utf-8');
    let htmlContent = marked.parse(content);

    // Rewrite internal .md links to .html (href="...md" and href="...md#anchor")
    htmlContent = htmlContent.replace(
      /href="(?!https?:\/\/|mailto:)([^"]*?)\.md(#[^"]*)?"/g,
      (match, filePart, anchor) => {
        // ANNOUNCEMENT.md at root level becomes index.html
        const rewritten = filePart.replace(/(?:^|\/)ANNOUNCEMENT$/, (m) =>
          m.startsWith('/') ? '/index' : 'index'
        );
        return `href="${rewritten}.html${anchor || ''}"`;
      }
    );

    // Add aria-label to GFM task list checkboxes (WCAG 1.3.1 / 4.1.2)
    htmlContent = htmlContent.replace(
      /<input disabled="" type="checkbox"(?: checked="")?>\s*([^<]+)/g,
      (match, label) => {
        const trimmed = label.trim();
        return match.replace('<input ', `<input aria-label="${trimmed.replace(/"/g, '&quot;')}" `);
      }
    );

    // Determine output path
    const relativePath = path.relative(process.cwd(), mdPath);
    let outputPath = path.join(outputDir, relativePath.replace(/\.md$/, '.html'));

    // ANNOUNCEMENT.md becomes the site front page (index.html)
    // README.md at the root becomes README.html (repo documentation)
    if (path.basename(mdPath) === 'ANNOUNCEMENT.md' && path.dirname(relativePath) === '.') {
      outputPath = path.join(outputDir, 'index.html');
    } else if (path.basename(mdPath) === 'README.md' && path.dirname(relativePath) !== '.') {
      // Sub-folder READMEs still become index.html in their directory
      const dir = path.dirname(outputPath);
      outputPath = path.join(dir, 'index.html');
    }

    // Extract title from first heading or filename
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : path.basename(mdPath, '.md');

    // Get relative path for template
    const relativeFromOutput = path.relative(outputDir, outputPath);

    // Collect page data for search index (strip HTML tags for plain text)
    const plainText = htmlContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    searchPages.push({
      id: relativeFromOutput.replace(/\\/g, '/'),
      title,
      url: relativeFromOutput.replace(/\\/g, '/'),
      body: plainText.slice(0, 5000)
    });

    // Create full HTML
    const html = htmlTemplate(htmlContent, title, relativeFromOutput);

    // Ensure output directory exists
    ensureDir(path.dirname(outputPath));

    // Write HTML file
    writeGeneratedFile(outputPath, html);
    console.log(`✓ Converted: ${relativePath} → ${path.relative(process.cwd(), outputPath)}`);

    return outputPath;
  } catch (error) {
    console.error(`✗ Error converting ${mdPath}:`, error.message);
    return null;
  }
}

// Find all markdown files
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip generated, private, and editor-history directories.
      const relativeDir = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
      const generatedPodcastDir = relativeDir === 'podcasts/bundles' || relativeDir === 'podcasts/challenge-bundles';
      if (!generatedPodcastDir && !['node_modules', '.git', '.github', '.history', 'html'].includes(file)) {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Copy CSS files
function setupStyles(outputDir) {
  const stylesDir = path.join(outputDir, 'styles');
  ensureDir(stylesDir);

  // Copy github-markdown-css
  const githubCss = require.resolve('github-markdown-css');
  fs.copyFileSync(githubCss, path.join(stylesDir, 'github-markdown.css'));

  // Copy highlight.js CSS (GitHub theme)
  const highlightCss = path.join(require.resolve('highlight.js'), '../../styles/github.css');
  fs.copyFileSync(highlightCss, path.join(stylesDir, 'highlight.css'));

  // Create custom CSS for additional accessibility and styling
  const customCss = `
/* Site header with search */
.site-header {
  border-bottom: 1px solid var(--borderColor-default, #d0d7de);
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 50;
}

.site-header-inner {
  max-width: 980px;
  margin: 0 auto;
  padding: 0.6rem 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #57606a;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb a {
  color: #0969da;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* Header actions: wiki link + search form */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.wiki-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #24292f;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}

.wiki-link:hover {
  background: #eaeef2;
  border-color: #bec5cc;
  text-decoration: none;
}

@media (max-width: 767px) {
  .wiki-link span { display: none; }
}

@media (prefers-color-scheme: dark) {
  .wiki-link { color: #e6edf3; background: #161b22; border-color: #30363d; }
  .wiki-link:hover { background: #1c2128; border-color: #3d444d; }
}

@media (prefers-contrast: high) {
  .wiki-link { color: #ffffff; background: #000000; border-color: #ffffff; }
}


.search-form {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.search-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}

.search-input {
  padding: 0.35rem 0.65rem;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 200px;
  background: #f6f8fa;
  color: #24292f;
  line-height: 1.4;
  transition: border-color 0.15s, box-shadow 0.15s, width 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9,105,218,0.3);
  width: 260px;
  background: #ffffff;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.6rem;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  color: #57606a;
  transition: background 0.15s, border-color 0.15s;
}

.search-button:hover {
  background: #eaeef2;
  border-color: #bec5cc;
}

@media (max-width: 767px) {
  .site-header-inner { padding: 0.5rem 15px; }
  .search-input { width: 130px; }
  .search-input:focus { width: 160px; }
}

@media (prefers-color-scheme: dark) {
  .site-header { background: #0d1117; border-bottom-color: #30363d; }
  .search-input { background: #161b22; border-color: #30363d; color: #e6edf3; }
  .search-input:focus { border-color: #58a6ff; box-shadow: 0 0 0 3px rgba(88,166,255,0.3); background: #0d1117; }
  .search-button { background: #161b22; border-color: #30363d; color: #9ca3af; }
  .search-button:hover { background: #1c2128; border-color: #3d444d; }
}

@media (prefers-contrast: high) {
  .search-input { border-color: #ffffff; background: #000000; color: #ffffff; }
  .search-input:focus { box-shadow: 0 0 0 3px #ffffff; }
  .search-button { border-color: #ffffff; background: #000000; color: #ffffff; }
}



body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
  line-height: 1.6;
  background-color: #ffffff;
  color: #24292f;
}

/* Improve focus visibility for keyboard navigation */
a:focus-visible,
button:focus-visible,
summary:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid #0969da;
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0969da;
  color: #ffffff;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  body {
    background-color: #000000;
    color: #ffffff;
  }
  .markdown-body {
    color: #ffffff;
  }
  .markdown-body a {
    color: #6db3f2;
    text-decoration: underline;
  }
  .markdown-body blockquote {
    border-left-color: #ffffff;
    color: #ffffff;
  }
  .markdown-body table,
  .markdown-body table th,
  .markdown-body table td {
    border-color: #ffffff;
  }
  .markdown-body table th {
    background-color: #1a1a1a;
  }
  .markdown-body code,
  .markdown-body pre {
    background-color: #1a1a1a;
    border-color: #ffffff;
  }
  .markdown-body hr {
    background-color: #ffffff;
  }
  .site-footer {
    border-color: #ffffff;
    color: #ffffff;
  }
  .site-footer a {
    color: #6db3f2;
  }
  .skip-link {
    background: #ffffff;
    color: #000000;
  }
  a:focus-visible,
  button:focus-visible,
  summary:focus-visible {
    outline-color: #ffffff;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0d1117;
    color: #e6edf3;
  }
  .markdown-body {
    color: #e6edf3;
  }
  .site-footer {
    border-color: #30363d;
    color: #9ca3af;
  }
  .site-footer a {
    color: #58a6ff;
  }
  a:focus-visible,
  button:focus-visible,
  summary:focus-visible {
    outline-color: #58a6ff;
  }
  .skip-link {
    background: #58a6ff;
    color: #0d1117;
  }
  .skip-link:focus {
    outline-color: #e6edf3;
  }
}

/* Ensure tables are responsive */
.markdown-body table {
  display: block;
  overflow-x: auto;
  max-width: 100%;
  white-space: normal;
}

/* details/summary styling for collapsible blocks */
.markdown-body details {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin: 0.75rem 0;
}

.markdown-body details[open] {
  padding-bottom: 0.75rem;
}

.markdown-body summary {
  cursor: pointer;
  font-weight: 600;
  padding: 0.25rem 0;
  user-select: none;
  list-style: none;
}

.markdown-body summary::-webkit-details-marker {
  display: none;
}

.markdown-body summary::before {
  content: '▶ ';
  font-size: 0.75em;
  vertical-align: middle;
}

.markdown-body details[open] > summary::before {
  content: '▼ ';
}

/* Site footer */
.site-footer {
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  border-top: 1px solid var(--borderColor-default, #d0d7de);
  color: #57606a;
  font-size: 0.875rem;
}

.site-footer a {
  color: #0969da;
  text-decoration: none;
}

.site-footer a:hover {
  text-decoration: underline;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print styles */
@media print {
  .breadcrumb,
  footer,
  .skip-link {
    display: none;
  }
  .markdown-body details {
    border: none;
    padding: 0;
  }
  .markdown-body details > * {
    display: block;
  }
  .markdown-body summary::before {
    display: none;
  }
}
`;

  writeGeneratedFile(path.join(stylesDir, 'custom.css'), customCss);
  console.log('✓ CSS files copied');
}

// Write search-index.json to the output directory
function buildSearchIndex(outputDir) {
  const indexPath = path.join(outputDir, 'search-index.json');
  writeGeneratedFile(indexPath, JSON.stringify(searchPages, null, 2));
  console.log(`✓ Search index written: ${searchPages.length} pages`);
}

// Copy lunr.min.js into html/scripts/
function copyLunr(outputDir) {
  const scriptsDir = path.join(outputDir, 'scripts');
  ensureDir(scriptsDir);
  const lunrSrc = require.resolve('lunr');
  const lunrDest = path.join(scriptsDir, 'lunr.min.js');
  fs.copyFileSync(lunrSrc, lunrDest);
  console.log('✓ lunr.min.js copied');
}

// Generate the search results page
function buildSearchPage(outputDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search - GIT Going with GitHub</title>
  <link rel="stylesheet" href="./styles/github-markdown.css">
  <link rel="stylesheet" href="./styles/highlight.css">
  <link rel="stylesheet" href="./styles/custom.css">
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
    @media (max-width: 767px) { .markdown-body { padding: 15px; } }
    .search-results-list { list-style: none; padding: 0; margin: 0; }
    .search-result-item { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--borderColor-default, #d0d7de); }
    .search-result-item:last-child { border-bottom: none; }
    .search-result-title { font-size: 1.2rem; font-weight: 600; margin: 0 0 0.25rem 0; padding: 0; border: none; }
    .search-result-title a { color: #0969da; text-decoration: none; }
    .search-result-title a:hover { text-decoration: underline; }
    .search-result-url { font-size: 0.8rem; color: #57606a; margin-bottom: 0.4rem; }
    .search-result-snippet { font-size: 0.9rem; color: #24292f; line-height: 1.5; }
    .search-result-snippet mark { background: #fff8c5; color: inherit; padding: 0 2px; border-radius: 2px; }
    #search-status { margin-bottom: 1.5rem; color: #57606a; }
    @media (prefers-color-scheme: dark) {
      .search-result-title a { color: #58a6ff; }
      .search-result-url { color: #9ca3af; }
      .search-result-snippet { color: #e6edf3; }
      .search-result-snippet mark { background: #3d2b00; color: #e6edf3; }
      #search-status { color: #9ca3af; }
      .search-result-item { border-bottom-color: #30363d; }
    }
    @media (prefers-contrast: high) {
      .search-result-title a { color: #6db3f2; }
      .search-result-snippet mark { background: #ffff00; color: #000000; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header" role="banner">
    <div class="site-header-inner">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <a href="./index.html">Home</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Search</span>
      </nav>
      <div class="header-actions">
        <a href="https://github.com/Community-Access/git-going-with-github/wiki" class="wiki-link" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.06l-2.573 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.457 1.457 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 1 1 1.06-1.06l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h.25a.25.25 0 0 0 .25-.25v-5.5Z"/>
          </svg>
          Wiki
        </a>
        <form role="search" class="search-form" id="search-form" action="./search.html" method="get">
        <label for="site-search" class="search-label">Search docs</label>
        <input
          type="search"
          id="site-search"
          class="search-input"
          name="q"
          placeholder="Search docs…"
          autocomplete="off"
          aria-label="Search documentation"
        >
        <button type="submit" class="search-button" aria-label="Submit search">
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
          </svg>
        </button>
      </form>
      </div>
    </div>
  </header>
  <main id="main-content" class="markdown-body">
    <h1>Search</h1>
    <p id="search-status" aria-live="polite" aria-atomic="true"></p>
    <ul class="search-results-list" id="search-results" role="list" aria-label="Search results"></ul>
  </main>
  <footer role="contentinfo" class="site-footer">
    <p><strong>GIT Going with GitHub</strong> - A workshop by <a href="https://community-access.org">Community Access</a></p>
    <p><a href="https://github.com/community-access/git-going-with-github">View on GitHub</a> · <a href="https://community-access.org">community-access.org</a></p>
  </footer>
  <script src="./scripts/lunr.min.js"></script>
  <script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var query = (params.get('q') || '').trim();
      var statusEl = document.getElementById('search-status');
      var resultsEl = document.getElementById('search-results');
      var searchInput = document.getElementById('site-search');

      if (query) searchInput.value = query;
      if (!query) { statusEl.textContent = 'Enter a search term above.'; return; }

      statusEl.textContent = 'Loading…';

      fetch('./search-index.json')
        .then(function (r) { return r.json(); })
        .then(function (pages) {
          var idx = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('body');
            pages.forEach(function (p) { this.add(p); }, this);
          });

          var results = idx.search(query);

          if (results.length === 0) {
            statusEl.textContent = 'No results found for "' + query + '".';
            return;
          }

          statusEl.textContent = results.length + ' result' + (results.length === 1 ? '' : 's') + ' found for "' + query + '"';

          var pageMap = {};
          pages.forEach(function (p) { pageMap[p.id] = p; });

          results.forEach(function (r) {
            var page = pageMap[r.ref];
            if (!page) return;

            // Build snippet: find sentence containing a query word
            var words = query.toLowerCase().split(/\\s+/);
            var bodyLower = page.body.toLowerCase();
            var snippetStart = 0;
            for (var i = 0; i < words.length; i++) {
              var pos = bodyLower.indexOf(words[i]);
              if (pos > -1) { snippetStart = Math.max(0, pos - 80); break; }
            }
            var snippet = page.body.slice(snippetStart, snippetStart + 200);
            if (snippetStart > 0) snippet = '…' + snippet;
            if (snippetStart + 200 < page.body.length) snippet += '…';

            // Highlight matching words in snippet
            words.forEach(function (w) {
              if (!w) return;
              var escaped = w.replace(/[^a-zA-Z0-9]/g, '');
              if (!escaped) return;
              var re = new RegExp('(' + escaped + ')', 'gi');
              snippet = snippet.replace(re, '<mark>$1</mark>');
            });

            var li = document.createElement('li');
            li.className = 'search-result-item';
            li.innerHTML =
              '<h2 class="search-result-title"><a href="./' + page.url + '">' + page.title + '</a></h2>' +
              '<div class="search-result-url">' + page.url + '</div>' +
              '<div class="search-result-snippet">' + snippet + '</div>';
            resultsEl.appendChild(li);
          });
        })
        .catch(function () {
          statusEl.textContent = 'Search is unavailable. Please try again later.';
        });
    })();
  </script>
</body>
</html>`;

  const outPath = path.join(outputDir, 'search.html');
  writeGeneratedFile(outPath, html);
  console.log('✓ search.html generated');
}

// Build all HTML files
function buildAll() {
  console.log('Starting HTML build...\n');

  const outputDir = path.join(process.cwd(), 'html');

  // Setup styles
  setupStyles(outputDir);

  // Find and convert all markdown files
  const markdownFiles = findMarkdownFiles(process.cwd());
  console.log(`\nFound ${markdownFiles.length} markdown files\n`);

  let convertedCount = 0;
  markdownFiles.forEach(mdPath => {
    if (convertMarkdownFile(mdPath, outputDir)) {
      convertedCount++;
    }
  });

  // Write search index JSON
  buildSearchIndex(outputDir);

  // Generate search page
  buildSearchPage(outputDir);

  // Copy lunr.min.js
  copyLunr(outputDir);

  console.log(`\n✓ Build complete! Converted ${convertedCount}/${markdownFiles.length} files`);
  console.log(`Output directory: ${outputDir}`);
}

// Watch mode
function watchMode() {
  const outputDir = path.join(process.cwd(), 'html');

  console.log('Starting watch mode... (Press Ctrl+C to stop)\n');

  // Initial build
  buildAll();

  // Watch for changes
  const watcher = chokidar.watch('**/*.md', {
    ignored: /(^|[\/\\])\..|(node_modules|html)/,
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('add', mdPath => {
      console.log(`\nFile added: ${mdPath}`);
      convertMarkdownFile(mdPath, outputDir);
    })
    .on('change', mdPath => {
      console.log(`\nFile changed: ${mdPath}`);
      convertMarkdownFile(mdPath, outputDir);
    })
    .on('unlink', mdPath => {
      console.log(`\nFile removed: ${mdPath}`);
      const htmlPath = path.join(outputDir, mdPath.replace(/\.md$/, '.html'));
      if (fs.existsSync(htmlPath)) {
        fs.unlinkSync(htmlPath);
        console.log(`✓ Removed: ${htmlPath}`);
      }
    });
}

// Main execution
const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  watchMode();
} else {
  buildAll();
}
