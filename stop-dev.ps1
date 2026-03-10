$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $root ".server.pid"

if (-not (Test-Path $pidFile)) {
  Write-Host "No stored server PID found."
  exit 0
}

$serverPid = Get-Content $pidFile -ErrorAction SilentlyContinue
if (-not $serverPid) {
  Remove-Item $pidFile -ErrorAction SilentlyContinue
  Write-Host "PID file was empty."
  exit 0
}

$process = Get-Process -Id $serverPid -ErrorAction SilentlyContinue
if ($process) {
  Stop-Process -Id $serverPid
  Write-Host "Stopped server PID $serverPid"
} else {
  Write-Host "Process $serverPid was not running."
}

Remove-Item $pidFile -ErrorAction SilentlyContinue
