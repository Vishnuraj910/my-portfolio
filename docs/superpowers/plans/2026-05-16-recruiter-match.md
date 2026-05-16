# Recruiter Role-Fit Match Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hero-row button that opens a modal wizard where recruiters answer 10 questions about a role and get an honest match verdict, with optional lead submission to the existing contact email pipeline.

**Architecture:** Plain-data criteria definitions (`content/recruiter-criteria.ts`) feed a pure scoring function (`lib/match.ts`). A client-side modal (`components/recruiter-match/`) orchestrates a 10-step wizard, a result screen, and an optional lead form that reuses `/api/contact`. English only; no new API endpoint; no database.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 4, vitest (new), ALTCHA (existing), Resend via existing contact route.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `content/recruiter-criteria.ts` (new) | The 10 questions, options, scoring weights, deal-breaker flags, verdict type. Plain data. |
| `lib/match.ts` (new) | Pure `computeMatch(answers)` → verdict/score/strengths/gaps. |
| `lib/match.test.ts` (new) | Unit tests for `computeMatch`. |
| `components/recruiter-match/RecruiterMatch.tsx` (new) | Button + modal shell + phase orchestration (wizard/result/lead). |
| `components/recruiter-match/WizardStep.tsx` (new) | Renders one question (single/multi-select). |
| `components/recruiter-match/MatchResult.tsx` (new) | Verdict screen: score, strengths, gaps, CTAs. |
| `components/recruiter-match/RecruiterLeadForm.tsx` (new) | Optional lead form → `/api/contact`. |
| `components/portfolio-page.tsx` (modify) | Render `<RecruiterMatch />` in hero CTA row. |
| `app/globals.css` (modify) | Modal + wizard styles. |
| `package.json` (modify) | Add vitest dev dep + `test` script. |
| `vitest.config.ts` (new) | vitest config with `@/` path alias. |

---

## Task 1: vitest setup

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install vitest**

Run: `npm install -D vitest`
Expected: vitest added to devDependencies, no errors.

- [ ] **Step 2: Add test script to package.json**

In `package.json` `scripts`, add after `"lint": "eslint",`:

```json
    "test": "vitest run",
```

- [ ] **Step 3: Create vitest config**

Create `vitest.config.ts`:

```ts
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Verify test runner works**

Run: `npm test`
Expected: vitest runs, reports "No test files found" (no tests yet). Exit code 0 or "no tests" message — not a config error.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest test runner"
```

---

## Task 2: Criteria data

**Files:**
- Create: `content/recruiter-criteria.ts`

- [ ] **Step 1: Create the criteria file**

Create `content/recruiter-criteria.ts`:

```ts
export type Verdict = "strong" | "good" | "partial" | "nofit";

export type QuestionId =
  | "roleLevel"
  | "domain"
  | "location"
  | "workMode"
  | "salary"
  | "employment"
  | "visa"
  | "insurance"
  | "orgType"
  | "techStack";

export type CriteriaOption = {
  value: string;
  label: string;
  score: number;
  dealBreaker?: boolean;
  capVerdict?: Verdict;
  strengthReason?: string;
  gapReason?: string;
};

export type Question = {
  id: QuestionId;
  prompt: string;
  helper?: string;
  multiSelect?: boolean;
  maxScore: number;
  strengthLabel?: string;
  gapLabel?: string;
  options: CriteriaOption[];
};

export const questions: Question[] = [
  {
    id: "roleLevel",
    prompt: "What level is the role?",
    maxScore: 5,
    options: [
      { value: "ic", label: "Individual Contributor", score: 5 },
      { value: "em", label: "Engineering Manager", score: 5 },
      { value: "either", label: "Either / flexible", score: 5 },
    ],
  },
  {
    id: "domain",
    prompt: "What domain does the role sit in?",
    maxScore: 12,
    options: [
      { value: "fintech", label: "Fintech", score: 12, strengthReason: "Fintech — 9+ years across Visa and Sokin" },
      { value: "aviation", label: "Aviation", score: 12, strengthReason: "Aviation — delivered Etihad flight-ops platform" },
      { value: "other", label: "Other industry", score: 6, gapReason: "Outside core fintech/aviation domains — open to explore" },
    ],
  },
  {
    id: "location",
    prompt: "Where is the role based?",
    maxScore: 15,
    options: [
      { value: "dubai", label: "Dubai", score: 15, strengthReason: "Dubai — home base" },
      { value: "sharjah", label: "Sharjah", score: 15, strengthReason: "Sharjah — within preferred commute" },
      { value: "abudhabi", label: "Abu Dhabi", score: 10, capVerdict: "good", gapReason: "Abu Dhabi — workable if other terms align" },
      { value: "otheruae", label: "Other Emirate", score: 6, gapReason: "Further from preferred Dubai/Sharjah base" },
      { value: "outside", label: "Outside UAE", score: 0, dealBreaker: true, gapReason: "Outside UAE — not open to relocation" },
    ],
  },
  {
    id: "workMode",
    prompt: "What is the work arrangement?",
    maxScore: 12,
    options: [
      { value: "remote", label: "Fully remote", score: 12, strengthReason: "Remote — full home-office setup ready" },
      { value: "hybrid", label: "Hybrid", score: 12, strengthReason: "Hybrid — preferred arrangement" },
      { value: "onsite", label: "Fully on-site", score: 5, gapReason: "Fully on-site — hybrid/remote preferred" },
    ],
  },
  {
    id: "salary",
    prompt: "What is the monthly salary (AED)?",
    maxScore: 15,
    options: [
      { value: "below40", label: "Below 40,000", score: 0, dealBreaker: true, gapReason: "Below the 40k AED/month minimum" },
      { value: "40to50", label: "40,000 – 50,000", score: 9, strengthReason: "Meets salary expectation" },
      { value: "50to60", label: "50,000 – 60,000", score: 12, strengthReason: "Above salary expectation" },
      { value: "above60", label: "60,000+", score: 15, strengthReason: "Well above salary expectation" },
    ],
  },
  {
    id: "employment",
    prompt: "What is the employment type?",
    maxScore: 10,
    options: [
      { value: "permanent", label: "Permanent", score: 10, strengthReason: "Permanent role" },
      { value: "contract", label: "Contract / temporary", score: 0, dealBreaker: true, gapReason: "Not a permanent role" },
    ],
  },
  {
    id: "visa",
    prompt: "What visa sponsorship is offered?",
    maxScore: 10,
    options: [
      { value: "family", label: "Family visa sponsorship", score: 10, strengthReason: "Family visa sponsorship offered" },
      { value: "self", label: "Self only", score: 4, gapReason: "Self-only visa — family sponsorship preferred" },
      { value: "none", label: "No sponsorship", score: 2, gapReason: "No visa sponsorship" },
    ],
  },
  {
    id: "insurance",
    prompt: "What health insurance is provided?",
    maxScore: 8,
    options: [
      { value: "premium", label: "Premium, family covered", score: 8, strengthReason: "Premium family health insurance" },
      { value: "basic", label: "Basic plan", score: 4, gapReason: "Basic insurance — premium family cover preferred" },
      { value: "none", label: "None", score: 1, gapReason: "No health insurance" },
    ],
  },
  {
    id: "orgType",
    prompt: "How would you describe the organisation?",
    maxScore: 8,
    options: [
      { value: "enterprise-ai", label: "Enterprise, AI-forward", score: 8, strengthReason: "AI-forward enterprise — strong culture fit" },
      { value: "startup-ai", label: "Startup, AI-forward", score: 8, strengthReason: "AI-forward startup — strong culture fit" },
      { value: "enterprise-trad", label: "Enterprise, traditional", score: 4, gapReason: "Traditional enterprise — prefers an AI-forward, learning-focused culture" },
      { value: "startup-trad", label: "Startup, traditional", score: 4, gapReason: "Traditional startup — prefers an AI-forward, learning-focused culture" },
    ],
  },
  {
    id: "techStack",
    prompt: "Which of these does the role use?",
    helper: "Select all that apply.",
    multiSelect: true,
    maxScore: 5,
    strengthLabel: "Strong tech-stack overlap with the role",
    gapLabel: "Limited tech-stack overlap with the role",
    options: [
      { value: "ai", label: "AI tooling (Claude Code, Codex, Ollama, Cline, RAG)", score: 0 },
      { value: "tsnode", label: "TypeScript / Node.js", score: 0 },
      { value: "react", label: "React / Next.js / Angular", score: 0 },
      { value: "python", label: "Python / FastAPI / Fastify", score: 0 },
      { value: "orm", label: "Prisma / SQLAlchemy", score: 0 },
      { value: "cloud", label: "AWS / Azure / GCP", score: 0 },
    ],
  },
];
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/recruiter-criteria.ts
git commit -m "feat: add recruiter match criteria data"
```

---

## Task 3: Scoring function (TDD)

**Files:**
- Create: `lib/match.ts`
- Test: `lib/match.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/match.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { computeMatch, type Answers } from "@/lib/match";

const best: Answers = {
  roleLevel: "either",
  domain: "fintech",
  location: "dubai",
  workMode: "remote",
  salary: "above60",
  employment: "permanent",
  visa: "family",
  insurance: "premium",
  orgType: "enterprise-ai",
  techStack: ["ai", "tsnode", "react", "python", "orm", "cloud"],
};

describe("computeMatch", () => {
  it("returns a strong verdict for an ideal role", () => {
    const result = computeMatch(best);
    expect(result.verdict).toBe("strong");
    expect(result.score).toBe(100);
    expect(result.dealBreaker).toBe(false);
  });

  it("flags outside-UAE location as a deal-breaker", () => {
    const result = computeMatch({ ...best, location: "outside" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("flags contract employment as a deal-breaker", () => {
    const result = computeMatch({ ...best, employment: "contract" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("flags below-40k salary as a deal-breaker", () => {
    const result = computeMatch({ ...best, salary: "below40" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("caps an otherwise-strong Abu Dhabi role at good", () => {
    const result = computeMatch({ ...best, location: "abudhabi" });
    expect(result.verdict).toBe("good");
    expect(result.dealBreaker).toBe(false);
  });

  it("scales tech-stack score with overlap", () => {
    const full = computeMatch(best).score;
    const half = computeMatch({ ...best, techStack: ["ai", "tsnode", "react"] }).score;
    expect(half).toBeLessThan(full);
  });

  it("produces a partial verdict for a mediocre role", () => {
    const result = computeMatch({
      roleLevel: "ic",
      domain: "other",
      location: "otheruae",
      workMode: "onsite",
      salary: "40to50",
      employment: "permanent",
      visa: "self",
      insurance: "basic",
      orgType: "enterprise-trad",
      techStack: ["ai"],
    });
    expect(result.verdict).toBe("partial");
  });

  it("collects strengths and gaps", () => {
    const result = computeMatch(best);
    expect(result.strengths.length).toBeGreaterThan(0);
    const gaps = computeMatch({ ...best, workMode: "onsite" }).gaps;
    expect(gaps.some((g) => g.includes("on-site"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/match`.

- [ ] **Step 3: Write the implementation**

Create `lib/match.ts`:

```ts
import { questions, type QuestionId, type Verdict } from "@/content/recruiter-criteria";

export type { Verdict };

export type Answers = Partial<Record<QuestionId, string | string[]>>;

export type MatchResult = {
  verdict: Verdict;
  score: number;
  dealBreaker: boolean;
  strengths: string[];
  gaps: string[];
};

const VERDICT_ORDER: Verdict[] = ["nofit", "partial", "good", "strong"];

function verdictFromScore(score: number): Verdict {
  if (score >= 85) return "strong";
  if (score >= 65) return "good";
  if (score >= 40) return "partial";
  return "nofit";
}

function capVerdict(current: Verdict, cap: Verdict): Verdict {
  return VERDICT_ORDER.indexOf(current) > VERDICT_ORDER.indexOf(cap) ? cap : current;
}

export function computeMatch(answers: Answers): MatchResult {
  let score = 0;
  let dealBreaker = false;
  let cap: Verdict | null = null;
  const strengths: string[] = [];
  const gaps: string[] = [];

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.multiSelect) {
      const selected = Array.isArray(answer) ? answer : [answer];
      const ratio = question.options.length ? selected.length / question.options.length : 0;
      score += Math.round(question.maxScore * ratio);
      if (ratio >= 0.5) {
        if (question.strengthLabel) strengths.push(question.strengthLabel);
      } else if (question.gapLabel) {
        gaps.push(question.gapLabel);
      }
      continue;
    }

    const value = Array.isArray(answer) ? answer[0] : answer;
    const option = question.options.find((o) => o.value === value);
    if (!option) continue;

    if (option.dealBreaker) {
      dealBreaker = true;
      if (option.gapReason) gaps.push(option.gapReason);
      continue;
    }

    score += option.score;
    if (option.capVerdict) cap = option.capVerdict;
    if (option.strengthReason) strengths.push(option.strengthReason);
    if (option.gapReason) gaps.push(option.gapReason);
  }

  let verdict: Verdict = dealBreaker ? "nofit" : verdictFromScore(score);
  if (cap && !dealBreaker) verdict = capVerdict(verdict, cap);

  return { verdict, score: Math.min(score, 100), dealBreaker, strengths, gaps };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/match.ts lib/match.test.ts
git commit -m "feat: add recruiter match scoring with tests"
```

---

## Task 4: Wizard step component

**Files:**
- Create: `components/recruiter-match/WizardStep.tsx`

- [ ] **Step 1: Create the component**

Create `components/recruiter-match/WizardStep.tsx`:

```tsx
"use client";

import type { Question } from "@/content/recruiter-criteria";

type WizardStepProps = {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export function WizardStep({ question, value, onChange }: WizardStepProps) {
  const selected: string[] = Array.isArray(value) ? value : value ? [value] : [];

  const toggleMulti = (optionValue: string) => {
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    onChange(next);
  };

  return (
    <div className="rm-step">
      <h4 className="rm-question">{question.prompt}</h4>
      {question.helper && <p className="rm-helper">{question.helper}</p>}
      <div className="rm-options">
        {question.options.map((option) => {
          const isActive = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={`rm-option ${isActive ? "rm-option-active" : ""}`}
              aria-pressed={isActive}
              onClick={() =>
                question.multiSelect ? toggleMulti(option.value) : onChange(option.value)
              }
            >
              <span className="rm-option-label">{option.label}</span>
              {isActive && <span className="rm-option-check">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/recruiter-match/WizardStep.tsx
git commit -m "feat: add recruiter wizard step component"
```

---

## Task 5: Match result component

**Files:**
- Create: `components/recruiter-match/MatchResult.tsx`

- [ ] **Step 1: Create the component**

Create `components/recruiter-match/MatchResult.tsx`:

```tsx
"use client";

import type { MatchResult as MatchResultData } from "@/lib/match";

const VERDICT_COPY: Record<MatchResultData["verdict"], { title: string; blurb: string }> = {
  strong: {
    title: "Strong match",
    blurb: "This role lines up well with Vishnuraj's preferences. Worth a conversation.",
  },
  good: {
    title: "Good match",
    blurb: "A solid fit overall, with a few points worth discussing.",
  },
  partial: {
    title: "Partial match",
    blurb: "Some alignment, but several preferences are not met. Reach out to explore.",
  },
  nofit: {
    title: "Not a fit",
    blurb: "This role conflicts with one or more of Vishnuraj's non-negotiables.",
  },
};

type MatchResultProps = {
  result: MatchResultData;
  onSendLead: () => void;
  onClose: () => void;
};

export function MatchResult({ result, onSendLead, onClose }: MatchResultProps) {
  const copy = VERDICT_COPY[result.verdict];

  return (
    <div className="rm-result">
      <div className={`rm-verdict rm-verdict-${result.verdict}`}>
        <span className="rm-verdict-score">{result.score}</span>
        <span className="rm-verdict-title">{copy.title}</span>
      </div>
      <p className="rm-result-blurb">{copy.blurb}</p>

      {result.strengths.length > 0 && (
        <div className="rm-result-list">
          <h5 className="rm-result-list-title">What lines up</h5>
          <ul>
            {result.strengths.map((item, i) => (
              <li key={`s-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {result.gaps.length > 0 && (
        <div className="rm-result-list">
          <h5 className="rm-result-list-title">Worth discussing</h5>
          <ul>
            {result.gaps.map((item, i) => (
              <li key={`g-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rm-result-actions">
        <button type="button" className="btn btn-primary" onClick={onSendLead}>
          Send this role to Vishnuraj
        </button>
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/recruiter-match/MatchResult.tsx
git commit -m "feat: add recruiter match result component"
```

---

## Task 6: Recruiter lead form component

**Files:**
- Create: `components/recruiter-match/RecruiterLeadForm.tsx`

This reuses `/api/contact`. The wizard answers and verdict are packed into the `message` field as plain text. ALTCHA is already loaded globally by `portfolio-page.tsx` (the `altcha.min.js` script tag).

- [ ] **Step 1: Create the component**

Create `components/recruiter-match/RecruiterLeadForm.tsx`:

```tsx
"use client";

import { questions } from "@/content/recruiter-criteria";
import type { Answers, MatchResult } from "@/lib/match";
import { useEffect, useRef, useState } from "react";

type RecruiterLeadFormProps = {
  answers: Answers;
  result: MatchResult;
  onDone: () => void;
};

function labelFor(value: string | string[] | undefined, optionValues: { value: string; label: string }[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const labels = values
    .map((v) => optionValues.find((o) => o.value === v)?.label)
    .filter((l): l is string => Boolean(l));
  return labels.length ? labels.join(", ") : "Not answered";
}

function buildMessage(answers: Answers, result: MatchResult, company: string, note: string) {
  const lines = questions.map((q) => `${q.prompt} ${labelFor(answers[q.id], q.options)}`);
  return [
    `Company: ${company}`,
    "",
    "Role details:",
    ...lines,
    "",
    `Match verdict: ${result.verdict} (${result.score}/100)`,
    "",
    `Recruiter note: ${note || "(none)"}`,
  ].join("\n");
}

export function RecruiterLeadForm({ answers, result, onDone }: RecruiterLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", note: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const check = () => {
      if (customElements.get("altcha-widget") !== undefined) {
        setCaptchaReady(true);
        if (timer) clearInterval(timer);
      }
    };
    check();
    timer = setInterval(check, 250);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError("");
    try {
      const altchaPayload = String(formData.get("altcha") || "");
      if (!captchaReady || !altchaPayload) {
        throw new Error("Bot protection failed. Please refresh and retry.");
      }
      const browserData = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}×${screen.height}`,
        browserLanguage: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        platform: navigator.platform,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Role Fit Check — ${form.company || "Recruiter enquiry"}`,
          message: buildMessage(answers, result, form.company, form.note),
          altchaPayload,
          locale: "en",
          browserData,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to send right now.");
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to send right now.");
    }
  }

  if (status === "success") {
    return (
      <div className="rm-lead-success">
        <p className="success">Sent. Vishnuraj will get back to you soon.</p>
        <button type="button" className="btn" onClick={onDone}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="rm-lead form-grid"
      action={(formData) => {
        void onSubmit(formData);
      }}
    >
      <p className="rm-helper">Share this role with Vishnuraj. He&apos;ll see your answers and the match result.</p>
      <input
        required
        name="name"
        placeholder="Your name"
        className="input"
        maxLength={100}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Your email"
        className="input"
        maxLength={120}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        required
        name="company"
        placeholder="Company"
        className="input"
        maxLength={120}
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <textarea
        name="note"
        placeholder="Anything else about the role? (optional)"
        className="input min-h-32"
        maxLength={1000}
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      {/* @ts-expect-error Custom element provided by ALTCHA script */}
      {isClient && <altcha-widget challengeurl="/api/altcha/challenge" hidelogo hidefooter />}
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : "Send to Vishnuraj"}
      </button>
      {status === "error" && <p className="error">{error}</p>}
    </form>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/recruiter-match/RecruiterLeadForm.tsx
git commit -m "feat: add recruiter lead form component"
```

---

## Task 7: Modal shell + orchestration

**Files:**
- Create: `components/recruiter-match/RecruiterMatch.tsx`

This component renders the hero button and, when open, the modal. It owns the phase (`wizard` / `result` / `lead`), the step index, and the answers. It handles ESC-to-close, overlay-click-to-close, body scroll lock, and focus return to the trigger button.

- [ ] **Step 1: Create the component**

Create `components/recruiter-match/RecruiterMatch.tsx`:

```tsx
"use client";

import { questions } from "@/content/recruiter-criteria";
import { computeMatch, type Answers } from "@/lib/match";
import { useEffect, useMemo, useRef, useState } from "react";
import { MatchResult } from "./MatchResult";
import { RecruiterLeadForm } from "./RecruiterLeadForm";
import { WizardStep } from "./WizardStep";

type Phase = "wizard" | "result" | "lead";

export function RecruiterMatch() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("wizard");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => computeMatch(answers), [answers]);
  const liveScore = useMemo(() => computeMatch(answers).score, [answers]);

  const reset = () => {
    setPhase("wizard");
    setStepIndex(0);
    setAnswers({});
  };

  const close = () => {
    setOpen(false);
    reset();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const currentQuestion = questions[stepIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const isAnswered = currentQuestion?.multiSelect
    ? true
    : currentAnswer !== undefined;
  const isLastStep = stepIndex === questions.length - 1;

  const setAnswer = (value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const next = () => {
    if (isLastStep) {
      setPhase("result");
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="btn"
        onClick={() => setOpen(true)}
      >
        Hiring? Check role fit
      </button>

      {open && (
        <div className="rm-overlay" onClick={close}>
          <div
            ref={modalRef}
            className="rm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rm-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rm-modal-head">
              <h3 id="rm-title">Role fit check</h3>
              <button
                type="button"
                className="rm-close"
                aria-label="Close"
                onClick={close}
              >
                ✕
              </button>
            </div>

            {phase === "wizard" && currentQuestion && (
              <div className="rm-wizard">
                <div className="rm-progress">
                  <div className="rm-progress-bar">
                    <div
                      className="rm-progress-fill"
                      style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  <div className="rm-progress-meta">
                    <span>Step {stepIndex + 1} / {questions.length}</span>
                    <span className="rm-live-score">Match so far: {liveScore}</span>
                  </div>
                </div>

                <WizardStep
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={setAnswer}
                />

                <div className="rm-nav">
                  <button
                    type="button"
                    className="btn"
                    onClick={back}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={next}
                    disabled={!isAnswered}
                  >
                    {isLastStep ? "See result" : "Next"}
                  </button>
                </div>
              </div>
            )}

            {phase === "result" && (
              <MatchResult
                result={result}
                onSendLead={() => setPhase("lead")}
                onClose={close}
              />
            )}

            {phase === "lead" && (
              <RecruiterLeadForm answers={answers} result={result} onDone={close} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/recruiter-match/RecruiterMatch.tsx
git commit -m "feat: add recruiter match modal shell"
```

---

## Task 8: Wire button into the page

**Files:**
- Modify: `components/portfolio-page.tsx`

- [ ] **Step 1: Add the import**

In `components/portfolio-page.tsx`, after the existing import block (after line 6 `import { useEffect, useMemo, useRef, useState } from "react";`), add:

```tsx
import { RecruiterMatch } from "@/components/recruiter-match/RecruiterMatch";
```

- [ ] **Step 2: Render the button in the hero CTA row**

In `components/portfolio-page.tsx`, find the `cta-row` block:

```tsx
            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">{messages.hero.viewProjects}</a>
              <a href="/resume-vishnuraj.pdf" className="btn" download>{messages.hero.downloadResume}</a>
              <a href="#contact" className="btn">{messages.hero.contact}</a>
            </div>
```

Replace it with:

```tsx
            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">{messages.hero.viewProjects}</a>
              <a href="/resume-vishnuraj.pdf" className="btn" download>{messages.hero.downloadResume}</a>
              <a href="#contact" className="btn">{messages.hero.contact}</a>
              <RecruiterMatch />
            </div>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/portfolio-page.tsx
git commit -m "feat: wire recruiter match button into hero"
```

---

## Task 9: Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append modal styles**

Append to the end of `app/globals.css`:

```css
/* Recruiter Match */
.rm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.rm-modal {
  background: var(--card-bg, #11151c);
  color: inherit;
  border: 1px solid var(--border, #2a2f3a);
  border-radius: 14px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  outline: none;
}

.rm-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.rm-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.rm-progress {
  margin-bottom: 1rem;
}

.rm-progress-bar {
  height: 6px;
  background: var(--border, #2a2f3a);
  border-radius: 3px;
  overflow: hidden;
}

.rm-progress-fill {
  height: 100%;
  background: var(--accent, #4f9cf9);
  transition: width 0.25s ease;
}

.rm-progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.4rem;
}

.rm-live-score {
  font-weight: 600;
}

.rm-question {
  margin: 0.5rem 0;
}

.rm-helper {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 0.75rem;
}

.rm-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rm-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border, #2a2f3a);
  border-radius: 9px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 0.92rem;
}

.rm-option:hover {
  border-color: var(--accent, #4f9cf9);
}

.rm-option-active {
  border-color: var(--accent, #4f9cf9);
  background: color-mix(in srgb, var(--accent, #4f9cf9) 14%, transparent);
}

.rm-option-check {
  color: var(--accent, #4f9cf9);
  font-weight: 700;
}

.rm-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.rm-verdict {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1.1rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.rm-verdict-score {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
}

.rm-verdict-title {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
}

.rm-verdict-strong { background: rgba(34, 197, 94, 0.16); color: #22c55e; }
.rm-verdict-good { background: rgba(79, 156, 249, 0.16); color: #4f9cf9; }
.rm-verdict-partial { background: rgba(234, 179, 8, 0.16); color: #eab308; }
.rm-verdict-nofit { background: rgba(239, 68, 68, 0.16); color: #ef4444; }

.rm-result-blurb {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.rm-result-list {
  margin-bottom: 1rem;
}

.rm-result-list-title {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.rm-result-list ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.88rem;
}

.rm-result-list li {
  margin-bottom: 0.25rem;
}

.rm-result-actions,
.rm-lead-success {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rm-lead {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

@media (max-width: 640px) {
  .rm-overlay { padding: 0; }
  .rm-modal {
    max-width: 100%;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
}
```

Note: `--card-bg`, `--border`, `--accent` are referenced with fallbacks, so the styles work even if those custom properties are not defined. If `app/globals.css` already defines matching theme variables, the fallbacks are simply unused.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds, no CSS or type errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add recruiter match modal styles"
```

---

## Task 10: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Open `http://localhost:3000/en`.

- [ ] **Step 2: Verify the happy path**

- Click "Hiring? Check role fit" in the hero row → modal opens.
- Answer all 10 steps choosing best options (Dubai, remote, 60k+, permanent, family visa, premium insurance, AI-forward, all tech) → result screen shows **Strong match**, score 100.
- Progress bar advances; "Match so far" score updates each step.

- [ ] **Step 3: Verify deal-breakers**

- Restart wizard (close + reopen). Choose Location = Outside UAE, everything else best → result shows **Not a fit** with the outside-UAE reason.
- Repeat with Employment = Contract, and Salary = Below 40,000 → both show **Not a fit**.

- [ ] **Step 4: Verify Abu Dhabi cap**

- Choose Location = Abu Dhabi, everything else best → result shows **Good match** (not Strong).

- [ ] **Step 5: Verify lead form**

- On any result screen, click "Send this role to Vishnuraj" → lead form appears.
- Submit with empty fields → browser required-field validation blocks it.
- Fill name/email/company, wait for the ALTCHA widget to verify, submit → success message ("Sent...").

- [ ] **Step 6: Verify accessibility & responsiveness**

- Press ESC → modal closes, focus returns to the trigger button.
- Click the dark overlay → modal closes.
- Toggle the site theme (☀/☾) with the modal open → modal remains readable in both themes.
- Resize below 640px → modal becomes a full-screen sheet.

- [ ] **Step 7: Run the full test + build gate**

Run: `npm test && npm run build && npm run lint`
Expected: tests pass, build succeeds, lint clean.

- [ ] **Step 8: Commit any fixes**

If verification surfaced fixes, commit them:

```bash
git add -A
git commit -m "fix: recruiter match verification fixes"
```

---

## Self-Review Notes

- **Spec coverage:** all 10 criteria (Task 2), wizard layout (Tasks 4, 7), deal-breakers + weighted score + verdict bands + Abu Dhabi cap (Task 3), hero-row button (Task 8), `/api/contact` reuse (Task 6), modal a11y + mobile sheet + edge cases (Tasks 7, 9, 10), vitest unit tests (Tasks 1, 3). English-only — no message-file changes.
- **Type consistency:** `Verdict` defined once in `recruiter-criteria.ts`, re-exported from `match.ts`. `Answers`, `MatchResult`, `computeMatch`, `Question`, `CriteriaOption` used consistently across tasks.
- **No placeholders:** every code step is complete.
