# Contributing

Thanks for contributing! Please follow the project's development and linting conventions.

## Linting

- Run `npm run lint` to check for lint issues.
- To apply autofixes locally, run `npm run lint -- --fix` and review changes before committing.
- The repository includes `scripts/lint-autofix-and-commit.sh` which may be run to auto-apply and auto-commit safe fixes on feature branches; it uses a conservative heuristic to avoid committing large or behavior-affecting changes.

## PRs

- Ensure your branch passes `npm run format:check` and `npm run type-check` before opening a PR.
- CI will run lint checks and fail the pipeline on lint violations.
