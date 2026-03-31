#!/usr/bin/env bash
# KClaw OpenClaw Manager - Linux Build Script
# Prerequisites: Node.js 22+, Rust, system libraries
# Run: bash scripts/build-linux.sh
set -euo pipefail

echo ""
echo "=== KClaw OpenClaw Manager - Linux Build ==="
echo ""

echo "Checking prerequisites..."
command -v node &>/dev/null && echo "  Node.js: $(node --version)" || { echo "ERROR: Node.js not found"; exit 1; }
command -v rustc &>/dev/null && echo "  Rust: $(rustc --version)" || { echo "ERROR: Rust not found"; exit 1; }

# Install system dependencies for Tauri on Linux
echo ""
echo "Checking system libraries for Tauri..."
if command -v apt-get &>/dev/null; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq \
    libwebkit2gtk-4.1-dev \
    libappindicator3-dev \
    librsvg2-dev \
    patchelf \
    libssl-dev \
    libgtk-3-dev \
    libsoup-3.0-dev \
    javascriptcoregtk-4.1-dev \
    2>/dev/null || true
fi

cd "$(dirname "$0")/../manager-app"

echo ""
echo "Installing npm dependencies..."
npm install

echo ""
echo "Building Tauri application for Linux..."
npx tauri build

echo ""
echo "=== Build Complete ==="
echo "Output files are in: manager-app/src-tauri/target/release/bundle/"
echo "  - .deb package"
echo "  - .rpm package"
echo "  - .AppImage"
echo ""
