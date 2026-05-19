$ErrorActionPreference = 'Stop'
$log = 'tmp-tts-queue2.log'
$sentinelLog = 'tmp-tts-queue.log'
Write-Host "Waiting for first TTS queue to finish..."
while ($true) {
    if ((Test-Path $sentinelLog) -and (Select-String -Path $sentinelLog -Pattern 'ALL TTS DONE' -Quiet)) { break }
    Start-Sleep -Seconds 30
}
Write-Host "First queue done. Starting follow-up queue."
function Tts($g, $s, $e) {
    "=== $(Get-Date -Format o) :: --group $g --start $s --end $e ===" | Tee-Object -FilePath $log -Append
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 --group $g --start $s --end $e --force 2>&1 | Tee-Object -FilePath $log -Append
}
Tts 'chapters' 8 9
Tts 'appendices' 26 26
Tts 'challenges' 7 8
Write-Host 'ALL TTS2 DONE'
