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

## 5) Agent Selection Guidelines

Select the appropriate agent based on the specific skills required for the task:

### Available Agents

| Agent | Primary Skills | When to Use |
|-------|----------------|-------------|
| **Senior NextJS Developer** | Next.js, React, TypeScript, App Router, performance optimization, API routes, authentication, deployment | Building/fixing Next.js features, React components, API endpoints, performance issues, TypeScript problems |
| **Personal Branding Expert** | Personal branding, portfolio curation, content strategy, storytelling, digital presence, career positioning | Creating portfolio content, crafting personal narratives, writing case studies, optimizing bio/about sections, brand messaging |
| **Product Engineer** | Product development, system design, user experience, feature planning, requirements gathering | Product features, UX improvements, system architecture, feature specifications, user stories |

### Agent Selection Rules

1. **Technical Implementation Tasks**
   - Frontend/Backend development → Senior NextJS Developer
   - Code reviews and refactoring → Senior NextJS Developer
   - Bug fixes and performance tuning → Senior NextJS Developer

2. **Content & Branding Tasks**
   - Portfolio content creation → Personal Branding Expert
   - Personal story and narrative writing → Personal Branding Expert
   - Bio, elevator pitch, testimonials → Personal Branding Expert
   - Brand messaging and voice → Personal Branding Expert

3. **Product & Design Tasks**
   - Feature planning and specs → Product Engineer
   - UX improvements and user research → Product Engineer
   - System architecture and requirements → Product Engineer

4. **Mixed Tasks**
   - If task involves both technical and content work, determine the primary focus
   - For portfolio website development: Technical → Senior NextJS Developer, Content → Personal Branding Expert

### Using Multiple Agents

For complex projects requiring multiple skill sets:
1. Break down the task into components
2. Use the primary agent for the main scope
3. Consult other agents for specific expertise as needed

## 6) Definition of Done

A task is complete only when:
- Requirements are implemented.
- Validation evidence is provided.
- Changed files are coherent and formatted.
- Risks/follow-ups are documented when applicable.
