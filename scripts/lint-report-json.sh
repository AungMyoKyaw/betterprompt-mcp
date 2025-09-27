#!/usr/bin/env bash
set -e

# Ensure artifacts directory exists
mkdir -p artifacts

# If eslint output exists at artifacts/lint-report.json already, verify it
if [[ -f "artifacts/lint-report.json" ]]; then
  echo "lint report found at artifacts/lint-report.json"
  exit 0
fi

# Otherwise try to run eslint and write JSON output
if command -v npx >/dev/null 2>&1; then
  echo "Generating lint report via npx eslint..."
  npx eslint -c .eslintrc.cjs "src/**/*.ts" --format json -o artifacts/lint-report.json || true
  if [[ -f "artifacts/lint-report.json" ]]; then
    echo "Generated artifacts/lint-report.json"
    exit 0
  fi
fi

echo "Unable to generate artifacts/lint-report.json; ensure eslint is installed and run npm run lint:ci" >&2
exit 1
