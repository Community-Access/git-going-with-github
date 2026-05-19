$audit = 'C:\code\git-going-with-github\tmp-rename-audit.log'
$pairs = @{}
foreach ($line in Get-Content $audit) {
    if ($line -match '^RENAME\s+(\S+)\s+(\S+)') {
        $o = $Matches[1]; $n = $Matches[2]
        if ($o -ne $n) { $pairs[$o] = $n }
    }
}
"pairs loaded: $($pairs.Count)"

$htmlRoot = 'C:\code\git-going-with-github\html'
$files = Get-ChildItem $htmlRoot -Recurse -Include *.html,*.xml,*.json -File
"scanning $($files.Count) files in html/"

$changed = 0; $reps = 0
foreach ($f in $files) {
    $orig = [System.IO.File]::ReadAllText($f.FullName)
    $text = $orig
    foreach ($k in $pairs.Keys) {
        $newF = $pairs[$k]
        $oldSlug = $k -replace '\.mp3$',''
        $newSlug = $newF -replace '\.mp3$',''
        $patternF = "\b" + [regex]::Escape($k) + "\b"
        $newText = [regex]::Replace($text, $patternF, $newF)
        if ($newText -ne $text) { $reps += ([regex]::Matches($text, $patternF)).Count; $text = $newText }
        $patternS = "(?<=[/=`"'])" + [regex]::Escape($oldSlug) + "(?=[/.\s`"')\]])"
        $newText = [regex]::Replace($text, $patternS, $newSlug)
        if ($newText -ne $text) { $reps += ([regex]::Matches($text, $patternS)).Count; $text = $newText }
    }
    if ($text -ne $orig) {
        $changed++
        $utf8 = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($f.FullName, $text, $utf8)
    }
}
"changed files: $changed | replacements: $reps"
"--- verify zero stale refs ---"
(Get-ChildItem $htmlRoot -Recurse -Include *.html,*.xml -File | Select-String -Pattern '/media/ep\d{2}|/media/appendix-' -List | Measure-Object).Count
