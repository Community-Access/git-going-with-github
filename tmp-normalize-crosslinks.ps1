$ErrorActionPreference = 'Stop'
Set-Location 'c:\code\git-going-with-github'

$podOldPatterns = @(
    '../admin/PODCASTS.md',
    '../admin/PODCASTS.html',
    'admin/PODCASTS.md',
    'admin/PODCASTS.html',
    '/admin/PODCASTS.md',
    '/admin/PODCASTS.html'
)
$podNew = 'https://lp.csedesigns.com/ggg/PODCASTS.html'

$feedOldPatterns = @(
    'https://community-access.org/git-going-with-github/podcasts/feed.xml',
    '/podcasts/feed.xml',
    'podcasts/feed.xml'
)
$feedNew = 'https://lp.csedesigns.com/ggg/feed.xml'

$targets = @(
    (Get-ChildItem .\docs -Recurse -File -Filter *.md),
    (Get-ChildItem .\html\docs -Recurse -File -Filter *.html)
) | ForEach-Object { $_ }

$changed = 0
$changedFiles = @()

foreach ($f in $targets) {
    $content = Get-Content -LiteralPath $f.FullName -Raw
    $updated = $content

    foreach ($p in $podOldPatterns) { $updated = $updated.Replace($p, $podNew) }
    foreach ($p in $feedOldPatterns) { $updated = $updated.Replace($p, $feedNew) }

    if ($updated -ne $content) {
        Set-Content -LiteralPath $f.FullName -Value $updated -NoNewline
        $changed++
        $changedFiles += $f.FullName.Replace((Get-Location).Path + '\\', '')
    }
}

$remainingPod =
    (Get-ChildItem .\docs -Recurse -File -Filter *.md | Select-String -Pattern 'admin/PODCASTS\.(md|html)|\.\./admin/PODCASTS\.(md|html)' -AllMatches).Count +
    (Get-ChildItem .\html\docs -Recurse -File -Filter *.html | Select-String -Pattern 'admin/PODCASTS\.(md|html)|\.\./admin/PODCASTS\.(md|html)' -AllMatches).Count

$remainingOldFeed =
    (Get-ChildItem .\docs -Recurse -File -Filter *.md | Select-String -Pattern 'community-access\.org/git-going-with-github/podcasts/feed\.xml|/podcasts/feed\.xml|podcasts/feed\.xml' -AllMatches).Count +
    (Get-ChildItem .\html\docs -Recurse -File -Filter *.html | Select-String -Pattern 'community-access\.org/git-going-with-github/podcasts/feed\.xml|/podcasts/feed\.xml|podcasts/feed\.xml' -AllMatches).Count

Write-Output "files_changed=$changed"
Write-Output "remaining_old_podcast_refs=$remainingPod"
Write-Output "remaining_old_feed_refs=$remainingOldFeed"
Write-Output "changed_files_sample="
$changedFiles | Select-Object -First 30 | ForEach-Object { Write-Output $_ }
