# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure prompt artifact storage and provenance (create storage path, access controls)
- [ ] T004 [P] Configure linting and formatting tools

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T005 [P] Prompt validation tests for each prompt template in tests/prompt/test\_\*.py (assert semantic properties or golden outputs)
- [ ] T006 [P] Contract test POST /api/users in tests/contract/test_users_post.py
- [ ] T007 [P] Contract test GET /api/users/{id} in tests/contract/test_users_get.py
- [ ] T008 [P] Integration test user registration in tests/integration/test_registration.py
- [ ] T009 [P] Integration test auth flow in tests/integration/test_auth.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] T010 [P] Implement prompt transformation functions and templates
- [ ] T011 [P] Implement artifact persistence for prompt IR and metadata
- [ ] T012 [P] User model in src/models/user.py
- [ ] T013 [P] UserService CRUD in src/services/user_service.py
- [ ] T014 [P] CLI --create-user in src/cli/user_commands.py
- [ ] T015 POST /api/users endpoint
- [ ] T016 GET /api/users/{id} endpoint
- [ ] T017 Input validation
- [ ] T018 Error handling and logging

## Phase 3.4: Integration

- [ ] T019 Connect UserService to DB
- [ ] T020 Auth middleware
- [ ] T021 Request/response logging
- [ ] T022 CORS and security headers

## Phase 3.5: Polish

- [ ] T023 [P] Unit tests for validation in tests/unit/test_validation.py
- [ ] T024 Performance tests (<200ms)
- [ ] T025 [P] Update docs/api.md
- [ ] T026 Remove duplication
- [ ] T027 Run manual-testing.md

## Dependencies

- Tests (T005-T009) before implementation (T010-T018)
- T012 blocks T013, T019
- T020 blocks T022
- Implementation before polish (T023-T027)

## Parallel Example

```
# Launch T005-T009 together:
Task: "Prompt validation tests for each prompt template in tests/prompt/test_*.py"
Task: "Contract test POST /api/users in tests/contract/test_users_post.py"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.py"
Task: "Integration test registration in tests/integration/test_registration.py"
Task: "Integration test auth in tests/integration/test_auth.py"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules

_Applied during main() execution_

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   - If a feature relies on external docs to generate prompts, create a Prompt Validation task and a Document Fetch/Provenance task.

2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks

3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist

_GATE: Checked by main() before returning_

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Prompt validation tasks exist for prompt-driven features
- [ ] Prompt artifacts are stored and versioned
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
