#!/usr/bin/env bash
set -e

# Run eslint autofix
npm run lint -- --fix

# Check for git changes
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if [[ -n "$(git status --porcelain)" ]]; then
    # Compute total changed lines (additions + deletions)
    total_changed=$(git diff --numstat | awk '{added += $1; removed += $2} END {print added+removed+0}')

    # Create a basic machine-readable summary
    mkdir -p tmp
    git diff --name-only > tmp/lint-autofix-files.txt || true
    # Attempt to generate an eslint JSON summary; tolerate failures
    npm run lint -- --format json -o tmp/lint-autofix-summary.json || true

    # Safety heuristic: only auto-commit if changes are small (e.g., <= 20 lines)
    if [[ "$total_changed" -le 20 ]]; then
      git add -A
      git commit -m "chore(lint): auto-fix"
      echo "Autofixes committed (total_changed=${total_changed})"
    else
      echo "Autofix produced ${total_changed} changed lines — aborting auto-commit for human review." >&2
      echo "Files changed: "
      cat tmp/lint-autofix-files.txt || true
      exit 2
    fi
  else
    echo "No autofix changes to commit"
  fi
else
  echo "Not a git repository; skipping commit step"
fi
