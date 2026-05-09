[CmdletBinding()]
param(
    [string]$SourcePath = '',
    [switch]$Quiet
)

$ErrorActionPreference = 'Stop'

function Write-Status {
    param([string]$Message)
    if (-not $Quiet) { Write-Host $Message }
}

function Fail {
    param([string]$Message)
    Write-Error $Message
    exit 1
}

if (-not $SourcePath) {
    $scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
    $SourcePath = Join-Path $scriptDir '..\..\learning-room'
}

$source = Resolve-Path $SourcePath -ErrorAction Stop
Write-Status "Validating Learning Room template source at $source"

$requiredFiles = @(
    '.github/workflows/student-progression.yml',
    '.github/workflows/pr-validation-bot.yml',
    '.github/scripts/challenge-progression.js',
    '.github/ISSUE_TEMPLATE/challenge-01-find-your-way.yml',
    'docs/welcome.md',
    'package.json'
)

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $source $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        Fail "Required file is missing from learning-room source: $relativePath"
    }
}

$coreTemplates = Get-ChildItem -LiteralPath (Join-Path $source '.github/ISSUE_TEMPLATE') -Filter 'challenge-*.yml' -ErrorAction Stop
$bonusTemplates = Get-ChildItem -LiteralPath (Join-Path $source '.github/ISSUE_TEMPLATE') -Filter 'bonus-*.yml' -ErrorAction Stop
if ($coreTemplates.Count -ne 16) {
    Fail "Expected 16 core challenge templates, found $($coreTemplates.Count)."
}
if ($bonusTemplates.Count -ne 5) {
    Fail "Expected 5 bonus templates, found $($bonusTemplates.Count)."
}

$forbiddenFilePatterns = @('*.log', '*.tmp', '*.bak', '*.orig')
$forbiddenFiles = @()
foreach ($pattern in $forbiddenFilePatterns) {
    $forbiddenFiles += Get-ChildItem -LiteralPath $source -Recurse -File -Filter $pattern -ErrorAction SilentlyContinue
}
$forbiddenFiles += Get-ChildItem -LiteralPath $source -Recurse -File -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -in @('.DS_Store', 'Thumbs.db') }

if ($forbiddenFiles.Count -gt 0) {
    $examples = ($forbiddenFiles | Select-Object -First 10 | ForEach-Object {
        $_.FullName.Substring($source.Path.Length).TrimStart('\\', '/')
    }) -join ', '
    Fail "Forbidden generated artifacts found in learning-room source: $examples"
}

$scanFiles = Get-ChildItem -LiteralPath $source -Recurse -File -ErrorAction Stop |
    Where-Object {
        $_.Extension -in @('.md', '.yml', '.yaml', '.json', '.js', '.ts', '.txt', '.html')
    }

$forbiddenContentChecks = @(
    @{ Name = 'Fine-grained/classic PAT token'; Pattern = 'ghp_[A-Za-z0-9]{20,}' },
    @{ Name = 'GitHub OAuth token'; Pattern = 'gho_[A-Za-z0-9]{20,}' },
    @{ Name = 'E2E disposable repository slug'; Pattern = 'learning-room-e2e-[0-9]{14}' },
    @{ Name = 'Smoke repository slug'; Pattern = 'learning-room-smoke-test-[0-9]{14}' }
)

$violations = [System.Collections.Generic.List[string]]::new()
foreach ($file in $scanFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }

    foreach ($check in $forbiddenContentChecks) {
        if ($content -match $check.Pattern) {
            $relative = $file.FullName.Substring($source.Path.Length).TrimStart('\\', '/')
            $violations.Add("$relative => $($check.Name)")
        }
    }
}

if ($violations.Count -gt 0) {
    $examples = ($violations | Select-Object -First 10) -join '; '
    Fail "Forbidden content markers found in learning-room source: $examples"
}

Write-Status 'Learning Room template source validation passed.'
