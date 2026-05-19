$ErrorActionPreference = 'Stop'
$log = 'tmp-tts-queue-rest.log'
function Tts($g, $s, $e) {
    "=== $(Get-Date -Format o) :: --group $g --start $s --end $e ===" | Tee-Object -FilePath $log -Append
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 --group $g --start $s --end $e --force 2>&1 | Tee-Object -FilePath $log -Append
}
# Queue 2 set (ep08, ep09, ep26, cc-07, cc-08)
Tts 'chapters' 8 9
Tts 'appendices' 26 26
Tts 'challenges' 7 8
# Queue 3 set (ep10-12, ep21, ep27, ep45-46, cc-09)
Tts 'chapters' 10 12
Tts 'chapters' 45 46
Tts 'appendices' 21 21
Tts 'appendices' 27 27
Tts 'challenges' 9 9
"ALL TTS REST DONE :: $(Get-Date -Format o)" | Tee-Object -FilePath $log -Append
