#!/usr/bin/env bash
#
# Deploy script for RenovationCalc (Next.js + Vercel)
#
# Usage:
#   bash scripts/deploy.sh          # preview deploy
#   bash scripts/deploy.sh --prod   # production deploy
#
# Requirements:
#   - Vercel CLI installed (npm i -g vercel) OR npx vercel
#   - Logged in to Vercel (npx vercel login)
#
set -euo pipefail

PROD=false
if [[ "${1:-}" == "--prod" ]]; then
  PROD=true
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "============================================================"
echo "  RenovationCalc — Web Deploy"
echo "============================================================"
echo ""

# 1. Typecheck
echo "[1/5] Running TypeScript typecheck..."
npm run typecheck

# 2. Unit tests
echo "[2/5] Running unit tests..."
npm test

# 3. E2E tests (optional, skipped if playwright not installed)
if [[ -f playwright.config.ts ]] && command -v npx >/dev/null 2>&1; then
  echo "[3/5] Running Playwright E2E smoke tests..."
  npx playwright test || {
    echo "WARNING: E2E tests failed. Continuing with build anyway."
  }
else
  echo "[3/5] Skipping E2E tests (playwright.config.ts not found)..."
fi

# 4. Production build (web:build)
echo "[4/5] Building for production (npm run web:build)..."
npm run web:build

# 5. Deploy to Vercel
echo "[5/5] Deploying to Vercel..."
if [[ "$PROD" == true ]]; then
  echo "  Mode: PRODUCTION"
  npx vercel --prod --yes
else
  echo "  Mode: PREVIEW"
  npx vercel --yes
fi

echo ""
echo "============================================================"
echo "  Deploy complete!"
echo "============================================================"
