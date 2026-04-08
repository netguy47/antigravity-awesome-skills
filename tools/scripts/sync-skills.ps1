# sync-skills.ps1
# Nightly pull of antigravity-awesome-skills from upstream
# Scheduled via Task Scheduler — runs at 2:00 AM daily

$repoPath = "D:\antigravity-awesome-skills"
$logFile = "C:\Users\Donal\logs\skills-sync.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Ensure log directory exists
New-Item -ItemType Directory -Force -Path (Split-Path $logFile) | Out-Null

function Log($msg) {
    $line = "[$timestamp] $msg"
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

Log "=== Skills Sync Started ==="
Set-Location $repoPath

# Fetch upstream if remote exists
$upstreamExists = git remote | Select-String "upstream"
if ($upstreamExists) {
    Log "Fetching upstream (sickn33)..."
    git fetch upstream 2>&1 | ForEach-Object { Log $_ }
    git merge upstream/main --no-edit 2>&1 | ForEach-Object { Log $_ }
} else {
    Log "No upstream remote found — pulling origin only"
}

git pull origin main 2>&1 | ForEach-Object { Log $_ }
Log "=== Skills Sync Complete ==="
