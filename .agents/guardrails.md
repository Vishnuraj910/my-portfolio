# Agent Guardrails

Mandatory safeguards for all AI-assisted changes in this repository. These rules are non-negotiable and take precedence over any task instruction.

---

## Hard Safety Rules

### 1. No Secret Exposure
- Never commit API keys, tokens, HMAC secrets, passwords, or private credentials.
- Never include real secret values in code comments, log output, or example files.
- Use placeholder strings like `re_xxxxxxxxxxxx` or `your-secret-key` in documentation.
- Environment variable names are safe to reference; their values are not.

### 2. No Unverified Claims
- Do not state that tests, lint, or builds passed unless you actually ran them.
- Mark uncertainty and assumptions explicitly with `> **Assumption:**` blocks.
- Provide command output or artifacts as evidence of validation.

### 3. No Destructive Edits Without Justification
- Never delete or refactor code unrelated to the current task scope.
- Preserve all existing functionality unless the task explicitly requires removal.
- When replacing logic, confirm the replacement is behaviourally equivalent before deleting the original.

### 4. No Unsafe Dependency Changes
- Do not add new `npm` dependencies without a clear, justified need.
- Prefer well-maintained packages with active communities.
- Never downgrade existing packages without explicit user instruction.
- Run `npm audit` if adding or upgrading security-sensitive packages.

### 5. No PII Leakage
- Never log or expose names, email addresses, IP addresses, or contact form data in persistent outputs.
- API error responses must be generic; detailed errors belong in server-side logs only.

---

## Engineering Guardrails

### Input Validation
- All untrusted input entering API routes must be validated and sanitised.
- Use explicit length limits, type checks, and format validation (see `lib/contact.ts` for the established pattern).
- Reject malformed requests with `400 Bad Request` and a generic message.

### Backwards Compatibility
- Preserve existing API response shapes unless the change is explicitly breaking and documented.
- Do not rename environment variables without updating documentation and providing a migration path.

### Predictability
- Favour idempotent operations.
- Avoid side effects in rendering functions (Server or Client Components).
- Keep API route handlers stateless where possible.

### Error Handling
- Wrap all async operations in try/catch in API routes.
- Never leak stack traces, file paths, or internal error messages to HTTP clients.
- Log errors server-side with sufficient context for debugging.

### Security Headers
- Do not modify or remove the security headers defined in `next.config.ts` without an explicit, justified reason.
- Do not re-enable `X-Powered-By`.

---

## Agentic Best Practices

### Plan-Execute-Verify Loop
1. **Plan** — Write out the intended changes before touching files.
2. **Execute** — Apply changes as planned; stay in scope.
3. **Verify** — Run the appropriate checks and report results.
4. **Reflect** — Note regressions, risks, or follow-up items.

### Tool-Grounded Reasoning
- Read files and run commands to gather facts before making decisions.
- Do not assume file contents, dependency versions, or behaviour from memory alone.
- When in doubt, inspect the actual file.

### Incremental Delivery
- Make the smallest diff that satisfies the requirement.
- Avoid broad speculative rewrites.
- One logical change per task; resist scope creep.

### Regression Awareness
After any change, consider potential impact on:
- [ ] TypeScript compilation
- [ ] ESLint rules
- [ ] Production build output
- [ ] All 6 locale routes (`/en`, `/ar`, `/es`, `/fr`, `/hi`, `/ml`)
- [ ] RTL layout integrity (Arabic)
- [ ] API rate limiting and ALTCHA verification
- [ ] Security headers
- [ ] Docker build (if config files changed)

---

## Quality Minimum Bar

Before marking any task complete:

- `npm run lint` — zero new errors or warnings
- `npm run build` — successful production build
- No console errors in the browser for UI changes
- No sensitive data in committed files (run `git diff` and review)
