<!--
Sync Impact Report
- Version change: template (no prior version) → 1.0.0
- Modified principles:
  - Placeholder PRINCIPLE_1_NAME → Library-Docs-First
  - Placeholder PRINCIPLE_2_NAME → Prompt Transformation & Validation
  - Placeholder PRINCIPLE_3_NAME → Test-First: Prompt & Contract Tests
  - Placeholder PRINCIPLE_4_NAME → Security, Privacy & Data Minimization
  - Placeholder PRINCIPLE_5_NAME → Observability, Reproducibility & Versioning
- Added sections:
  - Additional Constraints (Tooling & Runtime Requirements)
  - Development Workflow (Prompt review & gates)
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/agent-file-template.md ✅ updated
- Follow-up TODOs: none
-->

# BetterPrompt MCP Constitution

## Core Principles

### Library-Docs-First

Every feature and prompt MUST be grounded in authoritative, versioned library documentation or other primary sources. For any transformation that synthesizes a "better prompt" the system MUST:

- Use the `mcp_context7_get-library-docs` tool (or equivalent Context7-compatible fetch) to retrieve the canonical library documentation before constructing prompts.
- Record the source URL/ID, retrieval timestamp, and doc version in the prompt artifact metadata so the origin of information is auditable and reproducible.
  Rationale: Using the authoritative source reduces hallucination risk, makes prompt intent traceable, and enables reproducible prompt regeneration and audits.

### Prompt Transformation & Validation

Prompt engineering in this project is a deterministic, testable transformation pipeline. Implementations MUST:

- Express prompt transformations as versioned, parameterized templates or transform functions (no ad-hoc opaque strings in code).
- Produce an explicit intermediate representation (IR) or structured prompt descriptor that is stored alongside the delivered prompt.
- Include automated validation checks that assert the transformed prompt preserves required intents and constraints (see Testing principle).
  Rationale: Treating prompts as first-class, versioned artifacts enables safe evolution, reviewability, and automated validation.

### Test-First: Prompt & Contract Tests (NON-NEGOTIABLE)

All changes that affect prompt generation, transformation, or the data used to build prompts MUST be accompanied by failing tests before implementation. Requirements:

- Write prompt validation tests that assert expected properties of outputs for a set of canonical inputs (e.g., doc excerpts → expected instruction fragments, presence/absence of sensitive fields).
- Write contract tests for any API that exposes prompt-building behavior (inputs, parameters, expected semantics). These tests MUST fail until the implementation satisfies them.
- Include regression tests (golden outputs) for prompt artifacts where exact phrasing is important; where exact phrasing is intentionally flexible, tests MUST assert semantic equivalence or key token presence.
  Rationale: Tests-first ensures prompt behavior is explicit, reviewable, and guarded against regressions or unintended drift.

### Security, Privacy & Data Minimization

When interacting with external documentation sources and AI services, the project MUST follow strict privacy and security controls:

- No secrets, credentials, or personal data MUST be embedded into prompts sent to AI services unless explicitly authorized and approved through a documented exception and review process.
- License and copyright provenance of fetched docs MUST be recorded; the system MUST refuse to use sources with incompatible licensing for redistribution or model input.
- Minimize the data sent to AI endpoints: extract and include only the subset of documentation necessary to achieve the transformation objective.
- All prompt artifacts and fetched docs stored locally for reproducibility MUST be secured and access-controlled.
  Rationale: Prompt content and external data can contain sensitive information; explicit controls reduce risk and ensure legal compliance.

### Observability, Reproducibility & Versioning

All prompt generation and transformation activity MUST be observable and reproducible:

- Emit structured logs and traces for each prompt generation event including: inputs (with sensitive fields redacted), doc source identifiers, transform version, prompt template version, output hash, and downstream request/response status.
- Store prompt artifacts (IR, final prompt, metadata) in a versioned artifact store so past prompts can be reconstituted exactly.
- Apply semantic versioning to prompt templates and to the project constitution per the rules in Governance. Breaking changes to prompt semantics or source mappings MUST cause a MAJOR version bump.
  Rationale: Observability and reproducibility enable debugging, audits, and safe rollbacks when AI outputs change unexpectedly.

## Additional Constraints (Tooling & Runtime Requirements)

- The project MUST integrate the Context7-compatible documentation fetcher as the canonical source for library docs; the runtime MUST provide a pluggable fetch layer to swap implementations where necessary.
- Runtime components that call AI services MUST support configurable timeouts, retry policies, and circuit-breaker behavior.
- Prompt-generation code MUST be language-agnostic where possible and provide a stable CLI for reproducible prompt builds (text in → prompt out).

## Development Workflow (Prompt Review, Quality Gates, and Releases)

- Prompt changes MUST follow the repository's PR flow. Each PR that modifies prompt templates or transformation logic MUST include:
  - Failing/Updated tests demonstrating intended behavior.
  - A description of the transformed prompt artifacts and a link to the authoritative doc sources used for derivation.
  - A security & licensing assessment for any new doc sources.
- Reviewers MUST evaluate both functional tests and the prompt artifacts (IR and final prompt). Approvals should explicitly state acceptance of prompt semantics.
- Release & Versioning: Constitution and prompt-template changes follow semantic versioning:
  - MAJOR: Backward-incompatible changes to prompt semantics, removal of principles, or changes that break existing contract tests.
  - MINOR: New principles, new prompt templates, or material expansions of guidance that are backward-compatible.
  - PATCH: Wording clarifications, non-semantic fixes, documentation edits, and test improvements.
- Amendments: Amendments to this Constitution MUST be proposed as a PR that includes a migration plan, affected artifacts, and targeted tests. A two-thirds (2/3) approval from active maintainers or designated governance members is REQUIRED for MAJOR or MINOR changes; PATCH changes MAY be merged with a single maintainer approval if tests and CI pass.

## Governance

The Constitution supersedes ad-hoc practice in the repository. Governance rules:

- All PRs that change prompt-generation behavior, the fetcher configuration, or prompt templates MUST reference the Constitution and include a "Constitution Check" section summarizing compliance with each principle.
- Complexity claims that justify breaking a principle MUST be documented in the PR and included in Complexity Tracking so alternatives can be assessed.
- Compliance Review Expectations: The repository will run automated Constitution Checks during CI; any failure blocks merging until resolved or explicitly deferred with a documented reason.

**Version**: 1.0.0 | **Ratified**: 2025-09-27 | **Last Amended**: 2025-09-27
