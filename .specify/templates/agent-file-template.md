# [PROJECT NAME] Development Guidelines

Auto-generated from all feature plans. Last updated: [DATE]

## Active Technologies

- Context7-compatible documentation fetcher (e.g., `mcp_context7_get-library-docs`) — REQUIRED for features that derive prompts from library documentation.
- AI service integrations (configurable): OpenAI, Anthropic, other provider adapters
- Versioned artifact store for prompt IR and metadata (S3, Git LFS, or equivalent)

## Project Structure

```
[ACTUAL STRUCTURE FROM PLANS]
```

## Commands

- `./bin/mcp-build-prompt --spec <spec-path>`: Build a prompt from a spec and store the prompt artifact (IR, final prompt, metadata). This command MUST record doc source IDs and transform/template versions.
- `./bin/mcp-fetch-docs --library <lib> --version <v>`: Wrapper around the Context7 fetcher to persist the fetched docs into the artifact store with provenance metadata.

## Code Style

[LANGUAGE-SPECIFIC, ONLY FOR LANGUAGES IN USE]

## Recent Changes

[LAST 3 FEATURES AND WHAT THEY ADDED]

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
