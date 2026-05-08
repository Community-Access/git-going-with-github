const fs = require('fs');
const { marked } = require('marked');

const mdPath = 'admin/qa-bundle/admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md';
const outPath = 'admin/qa-bundle/admin/LEARNING-ROOM-E2E-QA-RUNBOOK.html';

const md = fs.readFileSync(mdPath, 'utf8');
const body = marked.parse(md);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Learning Room E2E QA Runbook</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; max-width: 1000px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: .5rem; vertical-align: top; }
    code, pre { background: #f5f5f5; }
    pre { padding: .75rem; overflow: auto; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(outPath, html, 'utf8');
console.log(`Generated ${outPath}`);
