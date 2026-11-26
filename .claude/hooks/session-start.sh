#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
command -v pnpm >/dev/null || npm install -g pnpm
pnpm install
[ -f playwright.config.ts ] || exit 0
# Needs cdn.playwright.dev in the network allowlist
pnpm exec playwright install chromium >/dev/null 2>&1 ||
  echo "Playwright browser not installed: pnpm test will not run in this session" >&2
