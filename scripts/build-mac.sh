#!/usr/bin/env bash
# KClaw OpenClaw Manager - macOS Build Script
# Prerequisites: Node.js 22+, Rust, Xcode Command Line Tools
# Run: bash scripts/build-mac.sh
set -euo pipefail

echo ""
echo "=== KClaw OpenClaw Manager - macOS Build ==="
echo ""

echo "Checking prerequisites..."
command -v node &>/dev/null && echo "  Node.js: $(node --version)" || { echo "ERROR: Node.js not found"; exit 1; }
command -v rustc &>/dev/null && echo "  Rust: $(rustc --version)" || { echo "ERROR: Rust not found"; exit 1; }
command -v xcode-select &>/dev/null && echo "  Xcode CLI: installed" || { echo "ERROR: Xcode CLI tools not found"; exit 1; }

# Universal binary support (Intel + Apple Silicon)
echo ""
echo "Adding Rust targets for universal binary..."
rustup target add aarch64-apple-darwin 2>/dev/null || true
rustup target add x86_64-apple-darwin 2>/dev/null || true

cd "$(dirname "$0")/../manager-app"

echo ""
echo "Installing npm dependencies..."
npm install

echo ""
echo "Building Tauri application for macOS (universal)..."
npx tauri build --target universal-apple-darwin

echo ""
echo "=== Build Complete ==="
echo "Output files are in: manager-app/src-tauri/target/universal-apple-darwin/release/bundle/"
echo "  - .dmg installer"
echo "  - .app bundle"
echo ""
