# Project Instructions for AI Agents

Authoritative execution guide for AI-assisted development in this repository. Read this first before any task.

---

## 1. Codebase Overview

| Aspect | Detail |
|---|---|
| **Framework** | Next.js 16, App Router (server-first) |
| **Language** | TypeScript 5, strict mode |
| **Styling** | Tailwind CSS 4 + CSS custom properties |
| **Animations** | Framer Motion 12 |
| **i18n** | `next-intl` — 6 locales: `en`, `ar` (RTL), `es`, `fr`, `hi`, `ml` |
| **Email** | Resend API |
| **Spam protection** | ALTCHA proof-of-work |
| **Analytics** | Microsoft Clarity + Vercel Analytics |
| **Containerisation** | Docker + Docker Compose |

### Key Files

| File | Purpose |
|---|---|
| `content/profile.ts` | **Single source of truth** for all personal/portfolio data |
| `components/portfolio-page.tsx` | Main client component rendering all sections |
| `app/[locale]/layout.tsx` | Per-locale layout (RTL, font, lang attr) |
| `lib/i18n.ts` | next-intl routing + supported locales |
| `messages/*.json` | Translation strings (one file per locale) |
| `app/api/contact/route.ts` | Contact form — rate-limited, ALTCHA-verified |
| `lib/altcha.ts` | ALTCHA challenge creation and verification |
| `next.config.ts` | Security headers, standalone output, Turbopack |
| `.ai/guardrails.md` | Hard safety rules — always respected |

---

## 2. Workflow

Follow this sequence for every task:

```
1. UNDERSTAND  — Read the request and constraints fully before acting.
2. ORIENT      — Inspect relevant files; map dependencies before editing.
3. PLAN        — Write a short, explicit implementation plan (≤ 5 steps).
4. EXECUTE     — Apply minimal, targeted edits scoped to requirements.
5. VALIDATE    — Run lint/build/tests proportional to change impact.
6. SUMMARISE   — Report what changed, why, and what was validated.
```

> Never skip ORIENT. Never edit files without PLAN. Never claim success without VALIDATE.

---

## 3. Coding Standards

### TypeScript
- Strict mode is enabled — honour it. Never suppress errors with `any` unless unavoidable and explicitly documented with a comment.
- Use `unknown` over `any` for external/untrusted data.
- Define typed interfaces for all data structures in `content/profile.ts` and API routes.
- Export explicit return types from utility functions and API handlers.

### React & Next.js
- **Server Components by default.** Add `"use client"` only when hooks, event handlers, or browser APIs are required.
- Co-locate related logic; keep components focused and composable.
- Use `next/image` for all user-facing images (enables optimisation).
- Prefer `next/link` over `<a>` for internal navigation.
- API routes must always return typed JSON with explicit HTTP status codes.

### Styling
- Use CSS custom properties (defined in `app/globals.css`) for colours, not hardcoded hex values.
- Utility-first with Tailwind; extract shared patterns to CSS classes, not component wrappers, when reused 3+ times.
- Never break RTL layout. Test visually in Arabic (`/ar`) when changing layout or spacing.

### Internationalisation
- All user-facing strings must use `useTranslations()` — never hardcode UI copy.
- Locale detection is automatic via `next-intl` middleware; do not bypass it.
- When adding new translatable strings, add the key to **all** `messages/*.json` files simultaneously.
- RTL (`dir="rtl"`) is applied at the `[locale]/layout.tsx` level; use logical CSS properties (`start`/`end`) for directional layout.

### Maintainability
- Prefer clear naming and small, single-purpose functions.
- Remove dead code and stale `// TODO` comments in files you touch.
- Add inline comments only where intent is non-obvious.
- Profile data editing is purely in `content/profile.ts` — avoid hardcoding data elsewhere.

---

## 4. Security Rules

Treat as non-negotiable (see `.ai/guardrails.md` for full rules):

- Never hardcode secrets, API keys, or credentials — use environment variables.
- Validate and sanitise all untrusted input at API boundaries (use the patterns in `lib/contact.ts` as reference).
- Return generic error messages to clients; log details server-side only.
- Do not log PII (names, emails, IP addresses in plaintext) to persistent logs.
- Preserve all existing security headers in `next.config.ts`.

---

## 5. Environment Variables

Required for contact form functionality:

```
RESEND_API_KEY          — Resend email API key
CONTACT_TO_EMAIL        — Destination email for contact submissions
ALTCHA_HMAC_KEY         — HMAC secret for ALTCHA challenge signing
ALTCHA_ALGORITHM        — SHA-256 | SHA-384 | SHA-512 (default: SHA-256)
ALTCHA_MAX_NUMBER       — PoW difficulty (default: 1000000)
ALTCHA_SALT_LENGTH      — Challenge salt bytes (default: 16)
ALTCHA_EXPIRES_IN_SECONDS — Challenge TTL (default: 300)
NEXT_PUBLIC_SITE_URL    — Canonical site URL for metadata and sitemap
```

When modifying API behaviour that depends on these, document the change here and in `README.md`.

---

## 6. Validation Expectations

Choose the smallest set that proves correctness:

| Change Type | Required Checks |
|---|---|
| Cosmetic / copy | `npm run lint` |
| Component / UI | `npm run lint` + `npm run build` |
| API route / lib | `npm run lint` + `npm run build` |
| i18n / messages | `npm run lint` + `npm run build` + verify `/ar` RTL visually |
| Config / infra | `npm run build` + docker build if Dockerfile touched |

If a check cannot run due to environment constraints, report this explicitly with the reason.

---

## 7. Agent Selection Guide

Select the agent best matched to the primary task type:

| Agent | Best For |
|---|---|
| **Senior NextJS Developer** | React/Next.js features, API routes, TypeScript, performance, bug fixes, refactoring |
| **Personal Branding Expert** | Portfolio copy, personal narrative, content strategy, bio, project descriptions |
| **Product Engineer** | Feature specifications, UX improvements, system design, requirements analysis |

For tasks spanning multiple agents, use the primary agent and consult others for targeted input. See individual agent files in `.ai/agents/` for full personas and decision frameworks.

---

## 8. Definition of Done

A task is complete only when **all** of the following are true:

- [ ] Requirements are implemented as specified.
- [ ] Validation evidence is provided (command output or explicit rationale for skipping).
- [ ] Changed files are coherent, typed, and formatted.
- [ ] No new lint errors or TypeScript errors introduced.
- [ ] i18n keys are present in all locale files if UI copy was added.
- [ ] Environment variable requirements are documented if changed.
- [ ] Risks and follow-up recommendations are noted when applicable.
