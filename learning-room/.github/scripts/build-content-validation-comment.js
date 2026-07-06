/**
 * Build the "Content Validation Report" PR comment from checker feedback.
 */

function groupByFile(items) {
  const byFile = new Map();
  for (const item of items) {
    if (!byFile.has(item.file)) byFile.set(item.file, []);
    byFile.get(item.file).push(item);
  }
  return byFile;
}

function buildContentValidationComment(feedback) {
  const safeFeedback = feedback || { errors: [], warnings: [], accessibility: [] };
  const errors = safeFeedback.errors || [];
  const warnings = safeFeedback.warnings || [];
  const accessibility = safeFeedback.accessibility || [];

  let comment = '## Content Validation Report\n\n';

  if (!errors.length && !warnings.length && !accessibility.length) {
    comment += '**All checks passed.** Your content looks ready for review.\n\n';
  } else {
    if (errors.length) {
      comment += '### Required Fixes\n\n';
      errors.forEach(err => {
        comment += `- **${err.file}** (Line ${err.line || '?'}):\n`;
        comment += `  ${err.message}\n`;
        if (err.fix) {
          comment += `  **Fix:** ${err.fix}\n`;
        }
        comment += '\n';
      });
    }

    if (warnings.length) {
      comment += '### Suggestions\n\n';
      warnings.forEach(warn => {
        comment += `- **${warn.file}**:\n`;
        comment += `  ${warn.message}\n`;
      });
      comment += '\n';
    }

    if (accessibility.length) {
      const byFile = groupByFile(accessibility);
      const fileCount = byFile.size;
      const itemCount = accessibility.length;
      comment += '### Accessibility\n\n';
      comment += `**${itemCount} suggestion${itemCount === 1 ? '' : 's'} across ${fileCount} file${fileCount === 1 ? '' : 's'}.**\n\n`;
      for (const [file, items] of byFile) {
        comment += `#### ${file}\n\n`;
        items.forEach(item => {
          comment += `- **${item.title}** (Line ${item.line || '?'})\n`;
          comment += `  ${item.message}\n`;
          if (item.fix) {
            comment += `  **Fix:** ${item.fix}\n`;
          }
          comment += '\n';
        });
      }
    }
  }

  comment += '### Learning Resources\n\n';
  comment += '- [Markdown Reference](https://github.com/Community-Access/git-going-with-github/blob/main/docs/appendix-c-markdown-reference.md)\n';
  comment += '- [Accessibility Standards](https://github.com/Community-Access/git-going-with-github/blob/main/docs/appendix-m-accessibility-standards.md)\n';
  comment += '- [Working with Pull Requests](https://github.com/Community-Access/git-going-with-github/blob/main/docs/06-working-with-pull-requests.md)\n\n';
  comment += '---\n';
  comment += '*Automated validation by Learning Room. Questions? Check the guides or mention @facilitator.*';
  return comment;
}

module.exports = { buildContentValidationComment };
