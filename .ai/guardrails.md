# Agent Guardrails

Mandatory safeguards for AI-assisted changes in this repository.

## Hard Safety Rules

1. **No secret exposure**
   - Never commit API keys, tokens, credentials, or private data.
   - Redact sensitive values from logs and examples.

2. **No unverified claims**
   - Do not state checks passed unless actually run.
   - Mark uncertainty and assumptions explicitly.

3. **No destructive edits without need**
   - Avoid deleting/refactoring unrelated code.
   - Keep scope aligned to user request.

4. **No unsafe dependency changes**
   - Avoid adding dependencies unless justified by clear need.
   - Prefer maintained, reputable packages if additions are required.

## Engineering Guardrails

- Validate external input in API routes.
- Preserve backwards compatibility unless change is explicitly breaking.
- Favor idempotent operations and predictable behavior.
- Keep error handling user-safe (no stack traces or internals leaked to clients).

## Agentic Best Practices

- **Plan-Execute-Verify loop**: plan small steps, execute, validate outcomes.
- **Tool-grounded reasoning**: inspect files and command outputs before decisions.
- **Incremental delivery**: make minimal diffs; avoid broad speculative rewrites.
- **Post-change reflection**: check for regressions in performance, accessibility, security, and i18n.

## Quality Checks (Minimum)

- Lint for static quality.
- Build for integration-level sanity.
- Additional targeted checks for touched behavior.

If checks fail, report root cause and remediation path.
