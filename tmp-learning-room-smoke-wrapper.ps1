$ErrorActionPreference = 'Stop'

$timestamp = Get-Date -Format 'yyyyMMddHHmmss'
$repoName = "learning-room-smoke-$timestamp"
$repo = "accesswatch/$repoName"
$dir = Join-Path 'C:\code' $repoName
$sourceDir = 'C:\code\learning-room-template'
$harness = 'C:\code\git-going-with-github\tmp-learning-room-smoke-test.ps1'

if (Test-Path $dir) {
  throw "Temp dir already exists: $dir"
}

New-Item -ItemType Directory -Path $dir | Out-Null
robocopy $sourceDir $dir /E /XD .git node_modules > $null

Push-Location $dir
try {
  git init -b main | Out-Null
  git config user.name 'accesswatch'
  git config user.email 'accesswatch@users.noreply.github.com'
  git add .
  git commit -m 'Smoke test seed' | Out-Null
  gh repo create $repo --private --source . --remote origin --push | Out-Null
}
finally {
  Pop-Location
}

Write-Output "SMOKE_REPO=$repo"
Write-Output "SMOKE_DIR=$dir"

& $harness -Repo $repo -Dir $dir
