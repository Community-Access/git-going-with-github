$ErrorActionPreference = 'Stop'
$slugs = @(
  'cc-bonus-b-document-your-journey',
  'ep20-accessibility-standards',
  'ep25-releases-tags-insights',
  'ep28-branch-protection',
  'ep29-security-features',
  'ep30-vscode-accessibility-reference',
  'ep31-github-codespaces',
  'ep32-github-mobile',
  'ep33-github-pages',
  'ep34-github-actions',
  'ep35-profile-sponsors-wikis',
  'ep36-organizations-templates',
  'ep37-contributing-to-open-source',
  'ep38-resources',
  'ep42-accessing-workshop-materials',
  'ep43-github-skills-catalog',
  'ep50-advanced-git-operations',
  'ep51-git-security-for-contributors',
  'ep52-github-desktop',
  'ep53-github-cli-reference',
  'ep54-agent-installation-setup',
  'ep55-advanced-agent-patterns',
  'ep56-document-developer-tools',
  'ep79-what-comes-next'
)
foreach ($s in $slugs) {
  Write-Host "=== publish $s ==="
  node podcasts/llm-podcast-generator-review/src/publish-candidate.js --slug $s --candidate "podcasts/llm-podcast-generator-review/generated/execution/applied/$s.candidate.json" --write-live
}
Write-Host "=== normalize ==="
python podcasts/tools/normalize_ascii.py --all
Write-Host "=== polish ==="
foreach ($s in $slugs) {
  python podcasts/tools/polish_chapter_plans.py --slug $s 2>&1 | Select-Object -Last 1
}
