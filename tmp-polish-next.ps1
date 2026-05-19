$ErrorActionPreference = 'Stop'
$slugs = @(
  'cc-10-go-local',
  'cc-bonus-e-git-history',
  'ep13-github-prs-extension',
  'ep15-accessible-code-review',
  'cc-11-day-2-pull-request',
  'cc-12-code-review',
  'ep14-github-copilot',
  'ep40-copilot-reference',
  'ep41-copilot-models',
  'cc-13-copilot-as-collaborator',
  'ep16-issue-templates',
  'cc-14-design-an-issue-template',
  'ep17-accessibility-agents',
  'ep39-accessibility-agents-reference',
  'cc-15-discover-accessibility-agents',
  'ep47-fork-and-contribute',
  'ep48-build-your-agent-capstone',
  'cc-16-build-your-own-agent',
  'cc-bonus-a-improve-agent',
  'cc-bonus-c-group-challenge',
  'ep49-github-accessibility-and-open-source'
)
foreach ($s in $slugs) {
  Write-Host "=== polish $s ==="
  python podcasts/tools/polish_chapter_plans.py --slug $s 2>&1 | Select-Object -Last 3
}
