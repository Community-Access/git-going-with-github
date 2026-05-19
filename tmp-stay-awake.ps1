Add-Type -Namespace PInvoke -Name Power -MemberDefinition @"
[DllImport("kernel32.dll", SetLastError=true)]
public static extern uint SetThreadExecutionState(uint esFlags);
"@
$ES_CONTINUOUS       = [uint32]"0x80000000"
$ES_SYSTEM_REQUIRED  = [uint32]"0x00000001"
$ES_AWAYMODE_REQUIRED = [uint32]"0x00000040"
# Keep system awake; allow display to sleep. Add display flag if you want monitor on too.
$flags = $ES_CONTINUOUS -bor $ES_SYSTEM_REQUIRED -bor $ES_AWAYMODE_REQUIRED
$prev = [PInvoke.Power]::SetThreadExecutionState($flags)
Write-Host "Stay-awake active. Previous state: 0x$($prev.ToString('X8'))"
Write-Host "PID: $PID  -  Press Ctrl+C or close this terminal to release."
try {
  while ($true) {
    # Re-assert every minute as a belt-and-suspenders measure.
    [void][PInvoke.Power]::SetThreadExecutionState($flags)
    Start-Sleep -Seconds 60
  }
} finally {
  [void][PInvoke.Power]::SetThreadExecutionState($ES_CONTINUOUS)
  Write-Host "Stay-awake released."
}
