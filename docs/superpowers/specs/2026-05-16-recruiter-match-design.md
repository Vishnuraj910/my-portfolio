# Recruiter Role-Fit Match — Design

**Date:** 2026-05-16
**Status:** Approved
**Author:** Vishnuraj Rajagopal (with brainstorming assist)

## Summary

Add a recruiter-facing feature to the portfolio: a button that opens a modal
wizard. A recruiter answers 10 questions about a role they are hiring for. The
app computes a match against Vishnuraj's stated preferences and shows an honest
verdict (Strong / Good / Partial / Not a fit) with reasons. The recruiter can
optionally send the role + match result to Vishnuraj via the existing contact
email pipeline, generating a qualified lead.

## Goals

- Let recruiters self-qualify a role against fixed preferences in under a minute.
- Give an honest, consultant-style result — not a vanity score.
- Capture qualified leads through the existing `/api/contact` pipeline.
- Showcase "AI-first engineering" polish via a guided, live-scoring wizard.

## Non-goals

- No backend persistence / database.
- No AI/LLM call — scoring is deterministic and rule-based.
- No i18n for this feature in v1 (English only; site has 6 locales).

## Decisions (from brainstorming)

| # | Decision |
|---|----------|
| Q1 | Behavior: instant match result **+** optional email submission to Vishnuraj. |
| Q2 | All 10 criteria fields kept. |
| Q3 | Layout: step-by-step **wizard**, one question per screen, live score. |
| Q4 | Scoring model: **hard deal-breakers + weighted score**. |
| Q5 | Button placement: **hero CTA row**. |
| Q6 | i18n: **English only** for v1. |
| Testing | **Unit tests for `lib/match.ts`** (vitest) + manual UI verification. |

## The 10 criteria

Each is something the recruiter selects about their role:

1. Role level — IC / Eng Manager / Either
2. Domain — Fintech / Aviation / Other
3. Location — Dubai / Sharjah / Abu Dhabi / Other UAE / Outside UAE
4. Work mode — Remote / Hybrid / On-site
5. Monthly salary — <35k / 35-40k / 40-50k / 50-60k / 60k+ AED
6. Employment type — Permanent / Contract
7. Visa sponsorship — Family / Self only / None
8. Health insurance — Premium (family) / Basic / None
9. Org type — Enterprise / Startup / Either (+ AI-friendly, learning-support flags)
10. Tech stack — multi-select of core stack (AI tooling, TS/Node/Next/React,
    Angular, Python/FastAPI/Fastify, Prisma/SQLAlchemy, AWS/Azure/GCP)

## Architecture

### New files

- **`content/recruiter-criteria.ts`** — single source of truth. The 10 question
  definitions, their options, per-option scoring weights, deal-breaker flags,
  and Vishnuraj's preference baseline. Plain data, no logic.
- **`lib/match.ts`** — pure function `computeMatch(answers)` returning
  `{ verdict, score, reasons[], dealBreaker }`. No React. Unit-testable.
- **`components/recruiter-match/RecruiterMatchModal.tsx`** — modal shell:
  open/close state, focus trap, ESC/overlay close, owns wizard step state.
- **`components/recruiter-match/WizardStep.tsx`** — renders one question
  (single-select, or multi-select for tech stack).
- **`components/recruiter-match/MatchResult.tsx`** — verdict screen: score,
  matched strengths, gaps, CTAs.
- **`components/recruiter-match/RecruiterLeadForm.tsx`** — optional
  "send to Vishnuraj" form (name, email, company, message) + ALTCHA widget.

### Modified files

- **`components/portfolio-page.tsx`** — add "Hiring? Check role fit" button to
  the hero CTA row; render `RecruiterMatchModal`.
- **`app/globals.css`** — modal + wizard styles, reusing existing `.btn`,
  `.chip`, `.card` design tokens.
- **`package.json`** — add `vitest` dev dependency + `test` script.

### Unit boundaries

Data (`recruiter-criteria.ts`) / scoring (`match.ts`) / modal shell / wizard
step / result / lead form — each has one job. The modal never knows scoring
internals; it calls `computeMatch`.

## Wizard flow

1. Hero button → modal opens.
2. 10 steps, one question per screen, progress bar ("Step N / 10") + live
   running score chip.
3. Back/Next navigation; answers held in modal state; Back preserves answers.
4. Next disabled until current question answered. Tech-stack step is skippable.
5. Final step → `MatchResult` (verdict, score, strengths, gaps).
6. Optional → `RecruiterLeadForm` → submit to `/api/contact`.

## Match logic (`computeMatch`)

### Hard deal-breakers

Any one ⇒ verdict `nofit`, score capped, honest reason shown:

- Location **outside UAE**
- **Contract** / non-permanent employment
- Salary **below 35k AED/month**

### Weighted contributions (when no deal-breaker)

- **Location:** Dubai/Sharjah = full; Abu Dhabi = partial (caps verdict at
  "good", flagged); other UAE = reduced.
- **Work mode:** Remote/Hybrid = full; On-site = reduced (not a reject).
- **Domain:** Fintech/Aviation = bonus; Other = neutral.
- **Org type:** Enterprise/Startup both fine; AI-friendly + learning-support
  flags = bonus.
- **Salary band:** higher band = higher score.
- **Visa sponsorship:** family = bonus; self-only = reduced; none = reduced.
- **Insurance:** premium/family = bonus; basic = reduced.
- **Role level:** IC or EM both full (Vishnuraj does both).
- **Tech stack:** score scales with overlap against the core stack.

### Verdict bands

- `strong` — score ≥ 85
- `good` — 65-84
- `partial` — 40-64
- `nofit` — < 40, or any deal-breaker triggered

### Result presentation

The result screen lists *why*: matched strengths and gaps, phrased as
recruitment-consultant feedback, not a cold number. Verdict badge is
color-coded.

## Email submission

Reuses **`/api/contact`** — no new endpoint. `RecruiterLeadForm` builds a
`ContactPayload`:

- `name` — recruiter name
- `email` — recruiter email (becomes `replyTo`)
- `subject` — `Role Fit Check — {company}`
- `message` — formatted plain-text block: all 10 selections + match
  verdict/score + recruiter's free-text note
- `altchaPayload` — ALTCHA widget, same as the contact form
- `browserData` — same capture as the contact form

### Constraints handled

- `message` max 2000 chars — 10 lines + result + note fits comfortably.
- `sanitize()` strips `<` `>` — selections packed as plain text
  (`Domain: Fintech`), no HTML injected.
- Inherits rate limiting (6 / 10 min per IP) + ALTCHA verification — no new
  attack surface.
- Validation (name 2-100, valid email, subject 2-140, message ≥ 5) satisfied
  by construction.

Lead form is optional — recruiter can view the result and close without
submitting.

## UX & accessibility

- **Button:** hero CTA row, label "Hiring? Check role fit", styled `.btn`
  (keeps "View Projects" as the visual primary).
- **Modal:** overlay + centered card, reuses `.card` tokens, theme-aware
  (dark/light). Focus trap; ESC closes; overlay click closes; focus returns to
  the trigger button on close. Body scroll locked while open.
  `role="dialog"`, `aria-modal`, `aria-labelledby`.
- **Mobile:** full-screen sheet below 640px.
- **Wizard:** progress bar + "Step N / 10"; Next disabled until answered
  (tech-stack step skippable); Back preserves answers; live score chip.
- **Result:** color-coded verdict badge, score, matched-strengths list, gaps
  list, two CTAs ("Send to Vishnuraj", "Close").

### Edge cases

- Deal-breaker hit mid-wizard → recruiter still finishes the wizard; result
  honestly shows `nofit` with the reason (no early dead-end — guards against
  mis-clicks).
- Lead-form submit failure → inline error, answers retained.
- Reopening the modal → fresh start (state resets).

### Analytics

Site already has Vercel Analytics + Microsoft Clarity. Fire a custom event on
modal open and on result shown. Low effort, optional.

## Testing

- **Unit (`lib/match.ts`):** add `vitest`. Cover deal-breakers, verdict bands,
  Abu Dhabi cap, tech-stack overlap scaling.
- **Manual (UI):** verify each verdict band, deal-breakers, lead-form submit
  success + failure, accessibility (keyboard / ESC / focus return), mobile
  sheet, both themes.
