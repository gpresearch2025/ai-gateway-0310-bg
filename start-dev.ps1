$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $root ".server.pid"

if (Test-Path $pidFile) {
  $existingPid = Get-Content $pidFile -ErrorAction SilentlyContinue
  if ($existingPid) {
    $existingProcess = Get-Process -Id $existingPid -ErrorAction SilentlyContinue
    if ($existingProcess) {
      Write-Host "Server already running at http://localhost:3000 (PID $existingPid)"
      exit 0
    }
  }
  Remove-Item $pidFile -ErrorAction SilentlyContinue
}

$process = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $root -PassThru
$process.Id | Set-Content $pidFile

Start-Sleep -Milliseconds 800

try {
  $response = Invoke-WebRequest -Uri "http://127.0.0.1:3000" -UseBasicParsing -TimeoutSec 5
  if ($response.StatusCode -eq 200) {
    Write-Host "Server running at http://localhost:3000 (PID $($process.Id))"
    exit 0
  }
  throw "Unexpected status code: $($response.StatusCode)"
} catch {
  Write-Host "Server process started but localhost check failed."
  Write-Host $_.Exception.Message
  exit 1
}
