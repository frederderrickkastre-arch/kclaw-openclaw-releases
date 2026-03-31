# KClaw OpenClaw Manager - Windows Build Script
# Prerequisites: Node.js 22+, Rust, Visual Studio Build Tools
# Run: .\scripts\build-windows.ps1

$ErrorActionPreference = "Stop"

Write-Host "`n=== KClaw OpenClaw Manager - Windows Build ===" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green

$rustVersion = rustc --version 2>$null
if (-not $rustVersion) {
    Write-Host "ERROR: Rust not found. Install from https://rustup.rs/" -ForegroundColor Red
    exit 1
}
Write-Host "  Rust: $rustVersion" -ForegroundColor Green

$cargoTauri = npx tauri --version 2>$null
Write-Host "  Tauri CLI: checking..." -ForegroundColor Green

# Navigate to manager-app
Set-Location "$PSScriptRoot\..\manager-app"

# Install dependencies
Write-Host "`nInstalling npm dependencies..." -ForegroundColor Yellow
npm install

# Build
Write-Host "`nBuilding Tauri application for Windows..." -ForegroundColor Yellow
npx tauri build

Write-Host "`n=== Build Complete ===" -ForegroundColor Green
Write-Host "Output files are in: manager-app\src-tauri\target\release\bundle\" -ForegroundColor Cyan
Write-Host "  - .exe installer"
Write-Host "  - .msi installer"
Write-Host ""
