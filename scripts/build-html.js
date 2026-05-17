#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked, Renderer } = require('marked');
const hljs = require('highlight.js');
const chokidar = require('chokidar');

const PODCAST_INDEX_URL = 'https://lp.csedesigns.com/ggg/PODCASTS.html';
const PODCAST_FEED_URL = 'https://lp.csedesigns.com/ggg/feed.xml';

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

function writeRedirectPage(filePath, targetHref) {
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=${targetHref}">
  <link rel="canonical" href="${targetHref}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${targetHref}">${targetHref}</a>...</p>
</body>
</html>`;
  ensureDir(path.dirname(filePath));
  writeGeneratedFile(filePath, redirectHtml);
}

function normalizePodcastEndpoints(text) {
  return text
    .replace(/href="(?:\.\.\/)?admin\/PODCASTS\.(?:md|html)(#[^"]*)?"/gi, `href="${PODCAST_INDEX_URL}$1"`)
    .replace(/href="(?:https?:\/\/community-access\.org\/git-going-with-github)?\/?podcasts\/feed\.xml"/gi, `href="${PODCAST_FEED_URL}"`);
}

let docsCatalogCache = null;

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readMarkdownTitle(filePath, fallbackTitle) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const heading = content.match(/^#\s+(.+)$/m);
    if (heading && heading[1]) {
      return heading[1].trim();
    }
  } catch (err) {
    // Ignore title extraction failures and use fallback.
  }
  return fallbackTitle;
}

function getDocsCatalog() {
  if (docsCatalogCache) {
    return docsCatalogCache;
  }

  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    docsCatalogCache = {
      essentials: [],
      chapters: [],
      day1: [],
      day2: [],
      appendices: []
    };
    return docsCatalogCache;
  }

  const files = fs.readdirSync(docsDir)
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const toItem = (name) => {
    const sourcePath = path.join(docsDir, name);
    const fallback = name
      .replace(/\.md$/i, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());
    return {
      href: `docs/${name.replace(/\.md$/i, '.html')}`,
      title: readMarkdownTitle(sourcePath, fallback),
      source: name
    };
  };

  const essentialsOrder = ['course-guide.md', 'get-going.md', 'CHALLENGES.md'];
  const essentials = essentialsOrder
    .filter((name) => files.includes(name))
    .map(toItem);

  const chapters = files
    .filter((name) => /^\d{2}-.*\.md$/i.test(name))
    .map(toItem);

  const day1 = chapters.filter((item) => {
    const num = Number(item.source.slice(0, 2));
    return !Number.isNaN(num) && num <= 10;
  });

  const day2 = chapters.filter((item) => {
    const num = Number(item.source.slice(0, 2));
    return !Number.isNaN(num) && num >= 11;
  });

  const appendices = files
    .filter((name) => /^appendix-[a-z0-9-]+\.md$/i.test(name))
    .map(toItem)
    .sort((a, b) => {
      const getAppendixKey = (source) => {
        const match = source.match(/^appendix-([a-z0-9]+)-?/i);
        const key = (match && match[1] ? match[1] : '').toLowerCase();
        const isExtended = ['aa', 'ab', 'ac'].includes(key);
        return { key, isExtended };
      };

      const aKey = getAppendixKey(a.source);
      const bKey = getAppendixKey(b.source);

      // Keep AA/AB/AC at the bottom of appendix navigation.
      if (aKey.isExtended && !bKey.isExtended) return 1;
      if (!aKey.isExtended && bKey.isExtended) return -1;

      return a.source.localeCompare(b.source, undefined, { numeric: true });
    });

  docsCatalogCache = { essentials, chapters, day1, day2, appendices };
  return docsCatalogCache;
}

function renderGuidedSidebar(normalizedRelativePath, prefix) {
  const catalog = getDocsCatalog();
  const sequenceState = getLearningSequenceState(normalizedRelativePath);

  const renderLinks = (items) => {
    if (!items.length) {
      return '<li><span class="guided-empty">No entries yet.</span></li>';
    }

    return items.map((item) => {
      const isCurrent = normalizedRelativePath === item.href;
      const href = item.href.startsWith('http') ? item.href : `${prefix}${item.href}`;
      const external = item.href.startsWith('http') ? ' <span class="guided-external">(external)</span>' : '';
      return `<li><a href="${href}"${isCurrent ? ' aria-current="page" class="guided-active"' : ''}>${escapeHtmlText(item.title)}${external}</a></li>`;
    }).join('\n');
  };

  const externalResources = [
    { href: PODCAST_INDEX_URL, title: 'Podcast Episodes' },
    { href: PODCAST_FEED_URL, title: 'RSS Feed' }
  ];

  const progressCard = sequenceState.index === -1
    ? ''
    : `<section class="guided-progress" aria-label="Learning progress">
        <h3>Learning Progress</h3>
        <p class="guided-progress-copy">${sequenceState.index + 1} of ${sequenceState.total} pages in the guided sequence</p>
        <div class="guided-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${sequenceState.percent}" aria-label="Guided sequence progress">
          <span class="guided-progress-fill" style="width:${sequenceState.percent}%;"></span>
        </div>
        <p class="guided-progress-percent">${sequenceState.percent}% complete</p>
      </section>`;

  return `<aside class="guided-sidebar" aria-label="Guided reference">
    <h2 class="guided-title">Guided Reference</h2>
    <p class="guided-intro">Follow the learning order, then branch into appendices and challenge support.</p>
    ${progressCard}

    <section class="guided-resume" aria-label="Resume learning">
      <a id="resume-link" class="guided-resume-link" href="${prefix}index.html" hidden>Resume where you left off</a>
    </section>

    <nav class="guided-nav" aria-label="Workshop navigation">
      <section class="guided-section">
        <h3>Start Here</h3>
        <ul>
          <li><a href="${prefix}index.html"${normalizedRelativePath === 'index.html' ? ' aria-current="page" class="guided-active"' : ''}>Workshop Home</a></li>
          ${renderLinks(catalog.essentials)}
        </ul>
      </section>

      <section class="guided-section">
        <h3>Learning Order</h3>
        <details${normalizedRelativePath.startsWith('docs/') ? ' open' : ''}>
          <summary>Day 1 chapters</summary>
          <ul>
            ${renderLinks(catalog.day1)}
          </ul>
        </details>
        <details${normalizedRelativePath.startsWith('docs/') ? ' open' : ''}>
          <summary>Day 2 chapters</summary>
          <ul>
            ${renderLinks(catalog.day2)}
          </ul>
        </details>
      </section>

      <section class="guided-section">
        <h3>Appendices</h3>
        <details${normalizedRelativePath.startsWith('docs/appendix-') ? ' open' : ''}>
          <summary>Reference library</summary>
          <ul>
            ${renderLinks(catalog.appendices)}
          </ul>
        </details>
      </section>

      <section class="guided-section">
        <h3>External Resources</h3>
        <ul>
          ${renderLinks(externalResources)}
        </ul>
      </section>
    </nav>
  </aside>`;
}

function getLearningSequence() {
  const catalog = getDocsCatalog();
  return [
    ...catalog.essentials,
    ...catalog.chapters,
    ...catalog.appendices
  ];
}

function getLearningSequenceState(normalizedRelativePath) {
  const ordered = getLearningSequence();
  const index = ordered.findIndex((item) => item.href === normalizedRelativePath);
  const total = ordered.length;
  const percent = index >= 0 && total > 0
    ? Math.round(((index + 1) / total) * 100)
    : 0;

  return { ordered, index, total, percent };
}

function renderOnPageToc(content) {
  const headings = [];
  const re = /<h([2-3]) id="([^"]+)">([\s\S]*?)<\/h\1>/gi;
  let match;

  while ((match = re.exec(content)) !== null) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
    if (id && text) {
      headings.push({ level, id, text });
    }
  }

  if (!headings.length) {
    return '';
  }

  const links = headings.map((h) => {
    const cls = h.level === 3 ? ' onpage-sub' : '';
    return `<li class="onpage-item${cls}"><a href="#${escapeHtmlText(h.id)}">${escapeHtmlText(h.text)}</a></li>`;
  }).join('\n');

  return `<nav class="onpage-nav" aria-label="On this page">
    <h2 class="onpage-title">On This Page</h2>
    <ul class="onpage-list">
      ${links}
    </ul>
  </nav>`;
}

function renderProgressionNav(normalizedRelativePath, prefix) {
  const state = getLearningSequenceState(normalizedRelativePath);
  if (state.index === -1) {
    return '';
  }

  const prev = state.index > 0 ? state.ordered[state.index - 1] : null;
  const next = state.index < state.ordered.length - 1 ? state.ordered[state.index + 1] : null;

  const prevHtml = prev
    ? `<a class="progression-link progression-prev" href="${prefix}${prev.href}" rel="prev"><span class="progression-label">Previous</span><span class="progression-title">${escapeHtmlText(prev.title)}</span></a>`
    : '<span class="progression-link progression-disabled" aria-disabled="true"><span class="progression-label">Previous</span><span class="progression-title">Start of sequence</span></span>';

  const nextHtml = next
    ? `<a class="progression-link progression-next" href="${prefix}${next.href}" rel="next"><span class="progression-label">Next</span><span class="progression-title">${escapeHtmlText(next.title)}</span></a>`
    : '<span class="progression-link progression-disabled" aria-disabled="true"><span class="progression-label">Next</span><span class="progression-title">End of sequence</span></span>';

  return `<nav class="progression-nav" aria-label="Page progression">
    ${prevHtml}
    ${nextHtml}
  </nav>`;
}

// HTML template with accessibility features
const htmlTemplate = (content, title, relativePath) => {
  const normalizedRelativePath = relativePath.replace(/\\/g, '/');
  const depth = normalizedRelativePath.split('/').length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  const guidedSidebar = renderGuidedSidebar(normalizedRelativePath, prefix);
  const onPageToc = renderOnPageToc(content);
  const progressionNav = renderProgressionNav(normalizedRelativePath, prefix);
  const isHome = normalizedRelativePath === 'index.html';
  const isRegister = normalizedRelativePath === 'REGISTER.html';
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
      min-width: 0;
      max-width: 980px;
      margin: 0;
      padding: 45px;
    }

    .page-layout {
      max-width: 1320px;
      margin: 0 auto;
      padding: 1rem 1rem 2rem;
      display: grid;
      grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
      gap: 1.25rem;
      align-items: start;
    }

    @media (max-width: 767px) {
      .page-layout {
        grid-template-columns: 1fr;
        padding: 0.5rem 0.5rem 1rem;
      }

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
  <div class="page-layout">
    ${guidedSidebar}
    <main id="main-content" class="markdown-body page-main">
      ${onPageToc}
      ${content}
      ${progressionNav}
    </main>
  </div>
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
  <script>
  (function() {
    var key = 'gggLastVisitedPath';
    var currentPath = window.location.pathname || '';
    try {
      if (currentPath) {
        localStorage.setItem(key, currentPath);
      }
    } catch (e) {}

    var resumeLink = document.getElementById('resume-link');
    if (!resumeLink) return;

    try {
      var savedPath = localStorage.getItem(key);
      if (savedPath && savedPath !== currentPath) {
        resumeLink.hidden = false;
        resumeLink.setAttribute('href', savedPath);
      }
    } catch (e) {}
  })();
  </script>
  ${(isHome || isRegister) ? `<script>
(function() {
  var url = 'https://api.github.com/search/issues?q=repo:community-access/git-going-with-github+label:enrolled+is:issue';
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

    // Always route podcast landing/feed links to the LP-hosted distribution endpoints.
    htmlContent = normalizePodcastEndpoints(htmlContent);

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
    const isRootRegisterPage = path.basename(mdPath) === 'REGISTER.md' && path.dirname(relativePath) === '.';

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

    // Keep lowercase registration URLs working on case-sensitive hosts.
    if (isRootRegisterPage) {
      const lowerFileAlias = path.join(outputDir, 'register.html');
      const lowerDirAlias = path.join(outputDir, 'register', 'index.html');
      writeRedirectPage(lowerFileAlias, './REGISTER.html');
      writeRedirectPage(lowerDirAlias, '../REGISTER.html');
      console.log('✓ Added aliases: register.html, register/index.html');
    }

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

.guided-sidebar {
  position: sticky;
  top: 5.25rem;
  border: 1px solid #d0d7de;
  border-radius: 10px;
  background: #f8fafc;
  padding: 0.9rem;
  max-height: calc(100vh - 6.5rem);
  overflow: auto;
}

.guided-title {
  margin: 0;
  font-size: 1rem;
}

.guided-intro {
  margin: 0.4rem 0 0.9rem;
  color: #57606a;
  font-size: 0.86rem;
  line-height: 1.45;
}

.guided-progress {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #ffffff;
  padding: 0.55rem 0.65rem;
  margin: 0 0 0.8rem;
}

.guided-progress h3 {
  margin: 0;
  font-size: 0.84rem;
}

.guided-progress-copy {
  margin: 0.35rem 0 0.5rem;
  color: #57606a;
  font-size: 0.78rem;
}

.guided-progress-track {
  width: 100%;
  height: 0.45rem;
  border-radius: 999px;
  background: #eaeef2;
  overflow: hidden;
}

.guided-progress-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #1f8f63, #2da44e);
}

.guided-progress-percent {
  margin: 0.35rem 0 0;
  font-size: 0.74rem;
  color: #57606a;
}

.guided-resume {
  margin: 0 0 0.9rem;
}

.guided-resume-link {
  display: inline-block;
  font-size: 0.82rem;
  text-decoration: none;
  color: #0550ae;
  padding: 0.2rem 0;
}

.guided-resume-link:hover {
  text-decoration: underline;
}

.guided-section {
  margin-bottom: 0.85rem;
}

.guided-section h3 {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
}

.guided-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.guided-nav li {
  margin: 0.1rem 0;
}

.guided-nav a {
  display: inline-block;
  text-decoration: none;
  color: #0b4fa2;
  font-size: 0.84rem;
  line-height: 1.35;
  padding: 0.12rem 0;
}

.guided-nav a:hover {
  text-decoration: underline;
}

.guided-active {
  font-weight: 700;
  color: #0550ae;
}

.guided-external {
  color: #57606a;
  font-size: 0.78rem;
}

.guided-empty {
  color: #57606a;
  font-size: 0.82rem;
}

.guided-sidebar details {
  border: none;
  margin: 0.1rem 0;
  padding: 0;
}

.guided-sidebar summary {
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  color: #3d4c63;
  list-style: none;
  padding: 0.1rem 0;
}

.guided-sidebar summary::-webkit-details-marker {
  display: none;
}

.guided-sidebar summary::before {
  content: '▶ ';
  font-size: 0.7em;
}

.guided-sidebar details[open] > summary::before {
  content: '▼ ';
}

.progression-nav {
  margin-top: 2.2rem;
  padding-top: 1rem;
  border-top: 1px solid #d0d7de;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.progression-link {
  display: block;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #ffffff;
  padding: 0.6rem 0.75rem;
  text-decoration: none;
  min-height: 3.6rem;
}

.progression-link:hover {
  border-color: #8c959f;
  background: #f6f8fa;
}

.progression-label {
  display: block;
  font-size: 0.74rem;
  color: #57606a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.2rem;
}

.progression-title {
  display: block;
  color: #0550ae;
  font-size: 0.9rem;
  line-height: 1.3;
  font-weight: 600;
}

.progression-disabled {
  opacity: 0.62;
  pointer-events: none;
}

.onpage-nav {
  margin: 0 0 1.3rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #f8fafc;
}

.onpage-title {
  margin: 0 0 0.45rem;
  font-size: 0.95rem;
  border: none;
  padding: 0;
}

.onpage-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.onpage-item {
  margin: 0.12rem 0;
}

.onpage-item a {
  text-decoration: none;
  font-size: 0.84rem;
  line-height: 1.35;
}

.onpage-item a:hover {
  text-decoration: underline;
}

.onpage-sub {
  margin-left: 0.9rem;
}

@media (max-width: 980px) {
  .guided-sidebar {
    position: static;
    max-height: none;
  }

  .progression-nav {
    grid-template-columns: 1fr;
  }
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

  .guided-sidebar {
    background: #111827;
    border-color: #2e3744;
  }

  .guided-progress,
  .onpage-nav {
    background: #111827;
    border-color: #2e3744;
  }

  .guided-intro,
  .guided-empty,
  .guided-external,
  .guided-sidebar summary,
  .guided-progress-copy,
  .guided-progress-percent {
    color: #9ca3af;
  }

  .guided-nav a {
    color: #8ec5ff;
  }

  .guided-active {
    color: #d2e7ff;
  }

  .guided-progress-track {
    background: #233146;
  }

  .guided-progress-fill {
    background: linear-gradient(90deg, #2ea66a, #4bc571);
  }

  .guided-resume-link,
  .onpage-item a,
  .onpage-title {
    color: #d2e7ff;
  }

  .progression-nav {
    border-top-color: #2e3744;
  }

  .progression-link {
    border-color: #2e3744;
    background: #111827;
  }

  .progression-link:hover {
    border-color: #465368;
    background: #172134;
  }

  .progression-label {
    color: #9ca3af;
  }

  .progression-title {
    color: #d2e7ff;
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
  .guided-sidebar,
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

  // If no dedicated homepage source exists, keep "Home" links functional.
  const rootIndexPath = path.join(outputDir, 'index.html');
  const rootReadmePath = path.join(outputDir, 'README.html');
  if (!fs.existsSync(rootIndexPath) && fs.existsSync(rootReadmePath)) {
    writeRedirectPage(rootIndexPath, './README.html');
    console.log('✓ Added alias: index.html -> README.html');
  }

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
