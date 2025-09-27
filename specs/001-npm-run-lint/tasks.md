# Tasks: 001-npm-run-lint

**Input**: Design documents from `/specs/001-npm-run-lint/`
**Prerequisites**: plan.md (required), spec.md

## Execution Flow (main)

1. Setup: Install and configure linting & formatting tools
2. Tests (TDD): Add failing tests that assert lint behavior
3. Core Implementation: Add configs and scripts to make lint pass
4. Integration: CI job to run lint and fail on violations
5. Polish: Documentation, auto-commit behavior, reporting

---

## Phase: Setup

- T001 Configure linting and formatting tooling (sequential)
  - Files: `package.json`, `.eslintrc.cjs`, `.eslintignore`, `.prettierrc`
  - Description: Add `eslint` + recommended plugins, add `prettier` integration, and add npm scripts:
    - `lint`: run eslint across repo with JSON formatter option for CI
    - `lint:fix`: run eslint --fix
  - Notes: Ensure `lint` exits non-zero on violations and outputs machine-parseable JSON when `--format json` is passed.
  - [x] T001 Configure linting and formatting tooling (sequential)

- T002 Add autofix-and-commit helper script (sequential)
  - Files: `scripts/lint-autofix-and-commit.sh`, `package.json`
  - Description: Script runs `npm run lint -- --fix`, checks for git diff, commits autofixes with message `chore(lint): auto-fix` and a machine-readable summary file at `tmp/lint-autofix-summary.json`.
  - Notes: Only auto-commit whitespace/formatting and safe fixes; do not auto-commit behavior-affecting fixes.
  - [x] T002 Add autofix-and-commit helper script (sequential)

## Phase: Tests (TDD) [P]

- T003 [P] Add integration test: `tests/integration/test_lint_exit_code.ts`
  - Files: `tests/integration/test_lint_exit_code.ts`
  - Description: Test that runs `npm run lint` in a controlled env; when lint violations exist, process exits non-zero and prints JSON when `--format json` used.
  - [x] T003 [P] Add integration test: `tests/integration/test_lint_exit_code.ts`

- T004 [P] Add integration test: `tests/integration/test_lint_fix_applies.ts`
  - Files: `tests/integration/test_lint_fix_applies.ts`
  - Description: Create a temp file with a known autofixable lint error, run `npm run lint -- --fix`, assert the file was changed and that `npm run lint` now exits zero.
  - [x] T004 [P] Add integration test: `tests/integration/test_lint_fix_applies.ts`

## Phase: Core Implementation

- T005 Implement lint config and package.json scripts (ONLY after T003/T004 fail)
  - Files: `.eslintrc.cjs`, `.eslintignore`, `.prettierrc`, `package.json`
  - Description: Add configs and scripts per T001 so that re-running linter after T003/T004 makes tests pass.
  - [x] T005 Implement lint config and package.json scripts (ONLY after T003/T004 fail)

- T006 Implement autofix helper script (ONLY after T002)
  - Files: `scripts/lint-autofix-and-commit.sh`
  - Description: Implement the script and make sure it respects the policy for safe autofixes. Provide unit/integration test that commits when safe.
  - [x] T006 Implement autofix helper script (ONLY after T002)

## Phase: Integration

- T007 CI: Add lint job to CI workflow (sequential)
  - Files: `.github/workflows/ci.yml`
  - Description: Ensure CI runs `npm ci && npm run lint -- --format json` and fails on non-zero exit code. Add annotations or machine-readable report upload step.
  - [x] T007 CI: Add lint job to CI workflow (sequential)

## Phase: Polish [P]

- T008 [P] Update README and contributing docs
  - Files: `README.md`, `CONTRIBUTING.md`
  - Description: Document `npm run lint`, `npm run lint -- --fix`, autofix auto-commit policy, and CI behavior.
  - [x] T008 [P] Update README and contributing docs

- T009 [P] Add a small utility to generate machine-readable lint report for PRs
  - Files: `scripts/lint-report-json.sh`, `.github/workflows/ci.yml` (small addition)
  - Description: Produce `artifacts/lint-report.json` with structure: `[{file,line,column,ruleId,message,fixable}]`.
  - [x] T009 [P] Add a small utility to generate machine-readable lint report for PRs

---

## Validation Checklist

- [x] `npm run lint` documented in README
- [x] `npm run lint -- --fix` applies autofixes for safe rules
- [ ] Autofix commits created with message prefix `chore(lint): auto-fix`
- [x] CI fails on lint violations and publishes `lint-report.json` as artifact
