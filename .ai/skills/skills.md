# AI Skills Matrix

Defines reusable capabilities and when to apply them.

## Core Skills

### 1) Codebase Analysis
**Use when:** scoping tasks, tracing bugs, understanding architecture.

**Practices:**
- Start with high-signal files (entrypoints, configs, affected modules).
- Map dependencies before editing.
- Capture assumptions and verify quickly.

### 2) Implementation & Refactoring
**Use when:** adding features, fixing bugs, improving structure.

**Practices:**
- Small, reversible commits.
- Preserve public behavior unless requirements specify changes.
- Prefer composition, typed interfaces, and clear boundaries.

### 3) Validation & QA
**Use when:** confirming correctness before handoff.

**Practices:**
- Run lint/build/tests proportional to impact.
- Validate edge cases around touched logic.
- Report failures with actionable remediation.

### 4) Security Review
**Use when:** touching API routes, forms, auth, or user input.

**Practices:**
- Input validation, sanitization, and safe defaults.
- Avoid sensitive logging.
- Ensure response handling does not leak internals.

### 5) Accessibility & i18n Review
**Use when:** changing UI or content.

**Practices:**
- Keyboard/focus/label semantics.
- Contrast and reduced-motion awareness.
- Validate `en`/`ar` behavior including RTL layout.

## Skill Selection Heuristic

For each task, choose the minimal skill set needed:
1. Analyze
2. Implement
3. Validate
4. Add Security/A11y/i18n reviews when relevant

## Output Expectations

Every task response should include:
- What changed.
- Why this approach was selected.
- What was validated (commands + outcomes).
- Remaining risks or follow-up recommendations.
