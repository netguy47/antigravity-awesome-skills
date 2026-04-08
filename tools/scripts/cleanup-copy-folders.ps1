# cleanup-copy-folders.ps1
# Deletes all "- Copy" duplicate skill folders from the skills directory
# Run from: D:\antigravity-awesome-skills\
# Usage: powershell -ExecutionPolicy Bypass -File tools\scripts\cleanup-copy-folders.ps1

$skillsPath = "D:\antigravity-awesome-skills\skills"
$dryRun = $false  # Set to $true to preview without deleting

Write-Host "=== Cleanup Copy Folders ===" -ForegroundColor Cyan
Write-Host "Path: $skillsPath"
Write-Host "Dry run: $dryRun"
Write-Host ""

$copyFolders = Get-ChildItem -Path $skillsPath -Directory | Where-Object { $_.Name -like "* - Copy*" }

if ($copyFolders.Count -eq 0) {
    Write-Host "No '- Copy' folders found. Nothing to clean up." -ForegroundColor Green
    exit 0
}

Write-Host "Found $($copyFolders.Count) folders to remove:" -ForegroundColor Yellow
$copyFolders | ForEach-Object { Write-Host "  - $($_.Name)" }
Write-Host ""

if ($dryRun) {
    Write-Host "DRY RUN - no files deleted." -ForegroundColor Yellow
} else {
    $copyFolders | ForEach-Object {
        Remove-Item -Path $_.FullName -Recurse -Force
        Write-Host "Deleted: $($_.Name)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Done. $($copyFolders.Count) folders removed." -ForegroundColor Green

    # Commit the cleanup
    Set-Location "D:\antigravity-awesome-skills"
    git add -A
    git commit -m "chore: remove duplicate - Copy skill folders"
    git push origin main
    Write-Host "Committed and pushed cleanup." -ForegroundColor Green
}
