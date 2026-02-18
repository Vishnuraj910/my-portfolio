# AI Skills Matrix

Reusable skill modules for this repository. Select the minimal set required for each task.

---

## Skill Catalogue

### 1. Codebase Analysis

**Trigger:** Scoping new tasks, tracing bugs, understanding architecture, assessing impact.

**Approach:**
1. Start with high-signal entry points: `app/[locale]/page.tsx`, `content/profile.ts`, `components/portfolio-page.tsx`.
2. Trace the dependency chain before editing any file.
3. Identify all files that will be affected by the change.
4. Capture assumptions explicitly; verify them with file reads or commands.

**Output:** A dependency map and a clear statement of scope and risk.

---

### 2. Implementation & Refactoring

**Trigger:** Adding features, fixing bugs, improving code structure.

**Approach:**
1. Produce a minimal, targeted diff — avoid touching unrelated code.
2. Preserve all public behaviour unless the task explicitly changes it.
3. Prefer composition over inheritance; typed interfaces over implicit shapes.
4. Keep Server Components as the default; promote to Client only when required.
5. Update `content/profile.ts` for data changes; `messages/*.json` for copy changes.

**Output:** Changed files with a clear diff rationale and affected locale list.

---

### 3. Validation & QA

**Trigger:** Before handoff on any change.

**Proportional checks:**

| Change Scope | Minimum Validation |
|---|---|
| Copy / translation | `npm run lint` |
| UI component | `npm run lint && npm run build` |
| API route | `npm run lint && npm run build` |
| Config / env | `npm run build` + verify env var docs |
| Docker / infra | `docker build` + `docker-compose up` smoke test |

**Approach:**
- Report exact command output, not a summary.
- For UI changes, verify both LTR (`/en`) and RTL (`/ar`) visually.
- Validate edge cases: empty inputs, long strings, missing env vars.

**Output:** Command outputs and explicit pass/fail statement per check.

---

### 4. Security Review

**Trigger:** Any change touching API routes (`app/api/`), form logic (`lib/contact.ts`), authentication, or user input.

**Checklist:**
- [ ] Input is validated for type, length, and format before use.
- [ ] External data is treated as `unknown` until explicitly narrowed.
- [ ] Error responses are generic; internal details are server-logged only.
- [ ] No credentials or PII appear in code, comments, or logs.
- [ ] Rate limiting is preserved on `POST /api/contact`.
- [ ] ALTCHA verification is not bypassed or weakened.
- [ ] Security headers in `next.config.ts` are intact.

**Output:** Explicit confirmation of each checklist item, or a flagged risk with remediation.

---

### 5. Accessibility & i18n Review

**Trigger:** Any change to UI components, layout, or copy.

**Accessibility checklist:**
- [ ] Interactive elements have accessible labels (`aria-label`, `aria-labelledby`, or visible text).
- [ ] Keyboard navigation is preserved (focus order, visible focus rings).
- [ ] Colour contrast meets WCAG AA (4.5:1 for text).
- [ ] Images have meaningful `alt` text; decorative images have `alt=""`.
- [ ] `prefers-reduced-motion` is respected in animations.

**i18n checklist:**
- [ ] All new UI strings use `useTranslations()` — no hardcoded copy.
- [ ] New translation keys are added to **all 6** locale files: `en`, `ar`, `es`, `fr`, `hi`, `ml`.
- [ ] RTL layout is verified in `/ar` after any spacing or directional change.
- [ ] Logical CSS properties (`start`/`end`, `margin-inline-start`) used for directional spacing.

**Output:** Checklist completion status and any flagged issues.

---

### 6. Documentation Update

**Trigger:** Any change to public API behaviour, environment variables, configuration, or deployment steps.

**Scope:**
- `README.md` — update if API, env vars, scripts, or architecture changes.
- `.ai/instructions.md` — update if coding conventions or workflow changes.
- `public/openapi.yaml` — update if API endpoints or request/response shapes change.
- `public/llm.txt` / `public/llm.json` — update if significant project context changes.

**Output:** List of documentation files updated and a brief summary of what changed.

---

## Skill Selection Heuristic

```
For each task:

1. ALWAYS start with Codebase Analysis (skill 1).
2. Use Implementation (skill 2) for all code changes.
3. ALWAYS end with Validation (skill 3).
4. ADD Security Review (skill 4) if touching APIs, forms, or auth.
5. ADD Accessibility & i18n Review (skill 5) if touching UI or copy.
6. ADD Documentation Update (skill 6) if public behaviour changed.
```

---

## Output Contract

Every task response must include:

| Section | Content |
|---|---|
| **What changed** | Files modified and a brief description of each change |
| **Why this approach** | Rationale for the chosen solution over alternatives |
| **Validation evidence** | Command outputs or explicit justification for skipped checks |
| **Risks & follow-ups** | Any known limitations, deferred work, or recommended next steps |
