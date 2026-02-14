# Project Instructions for AI Agents

Repository-specific execution guide for consistent, high-quality output.

## 1) Workflow

1. Understand request and constraints.
2. Inspect only relevant files.
3. Create a short implementation plan.
4. Apply minimal, targeted edits.
5. Validate with lint/tests/build as applicable.
6. Summarize what changed, why, and how it was validated.

## 2) Coding Rules

### TypeScript / React / Next.js
- Keep strict typing; avoid `any` unless unavoidable and documented.
- Prefer server-first patterns in App Router.
- Add `"use client"` only when needed for hooks/events/browser APIs.
- Keep components focused and composable.

### Maintainability
- Prefer clear naming and small functions.
- Remove dead code and stale comments during touched-file edits.
- Add brief comments only where intent is non-obvious.

### Internationalization
- Keep all user-facing text translatable.
- Preserve locale routing and RTL support.
- Verify layout and semantics in both `en` and `ar` paths when UI changes.

## 3) Security & Privacy

- Never hardcode secrets, tokens, or credentials.
- Validate and sanitize all untrusted input at boundaries.
- Use safe defaults in APIs (input validation, explicit status codes, generic error messages).
- Do not log sensitive user data.

## 4) Validation Expectations

Choose the smallest set that proves correctness:
- `npm run lint`
- `npm run build` for structural/runtime safety
- Targeted tests if present
- Manual verification for user-facing behavior

If a check cannot run due to environment constraints, report it explicitly.

## 5) Definition of Done

A task is complete only when:
- Requirements are implemented.
- Validation evidence is provided.
- Changed files are coherent and formatted.
- Risks/follow-ups are documented when applicable.
