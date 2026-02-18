# ✦ Vishnuraj Rajagopal — Personal Portfolio

> A production-ready personal portfolio built with Next.js 16 App Router, TypeScript, and Tailwind CSS 4. Features multilingual support (6 languages), a deep space animated background, secure contact form with proof-of-work spam protection, and full Docker support.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?logo=framer)](https://www.framer.com/motion/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live Site](https://vishnuraj.me)** · **[OpenAPI Spec](https://vishnuraj.me/openapi.yaml)** · **[LLM Context](https://vishnuraj.me/llm.txt)**

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Customization Guide](#customization-guide)
- [Docker](#docker)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [AI Agent Support](#ai-agent-support)
- [License](#license)

---

## Features

### ✦ Portfolio Sections
| Section | Description |
|---|---|
| **Hero** | Animated intro with CTA buttons (resume download, contact) |
| **About** | Personal narrative with highlight chips |
| **Stats** | Years of experience, certifications, companies, projects |
| **Experience** | Interactive expandable work history timeline |
| **Skills** | Categorized skills matrix with filter tabs |
| **Projects** | Project showcase with tech stack tags |
| **Certifications** | Filterable and sortable certification grid |
| **Languages** | Spoken language proficiency indicators |
| **Education** | Academic history timeline |
| **Contact** | Secure form with ALTCHA proof-of-work protection |

### ✦ Core
- **Multilingual** — 6 locales: English, Arabic (RTL), Spanish, French, Hindi, Malayalam
- **Dark / Light Theme** — System preference detection with `localStorage` persistence
- **Deep Space Background** — Animated canvas background with stars and nebula effects
- **Smooth Animations** — Page transitions and scroll reveals via Framer Motion
- **Fully Responsive** — Mobile-first layout across all breakpoints
- **SEO Optimised** — Structured metadata, OpenGraph, `robots.txt`, `sitemap.xml`

### ✦ Security
- **ALTCHA Proof-of-Work** — Captcha-free bot protection via client-side PoW challenge
- **Rate Limiting** — 6 requests / 10 minutes / IP on the contact endpoint
- **Input Validation** — Server-side sanitisation on all API routes
- **Security Headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`
- **No `X-Powered-By`** — Framework fingerprint removed

### ✦ Observability
- **Microsoft Clarity** — Session recording and heatmaps
- **Vercel Analytics** — Page views and performance insights
- **Health Endpoint** — `/api/health` for uptime monitoring

### ✦ Developer Experience
- Docker Compose for local and production containers
- Turbopack dev server
- Standalone output for optimised Docker image size
- Full TypeScript strict mode
- ESLint 9 flat config

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12 |
| **i18n** | `next-intl` |
| **Email** | Resend API |
| **Spam Protection** | ALTCHA (Proof-of-Work) |
| **Analytics** | Microsoft Clarity · Vercel Analytics |
| **Containerisation** | Docker · Docker Compose |
| **Deployment** | Vercel (recommended) |

---

## Quick Start

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

```bash
# 1. Clone the repository
git clone https://github.com/Vishnuraj910/my-portfolio.git
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# → Edit .env.local with your values (see Environment Variables)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` automatically.

---

## Project Structure

```
my-portfolio/
├── app/                            # Next.js App Router root
│   ├── [locale]/                   # Locale-prefixed routes (/en, /ar, /es …)
│   │   ├── layout.tsx              # Per-locale layout (dir, lang, fonts)
│   │   ├── page.tsx                # Portfolio page entry point
│   │   ├── loading.tsx             # Suspense loading state
│   │   └── error.tsx               # Error boundary
│   ├── api/
│   │   ├── altcha/challenge/       # ALTCHA PoW challenge endpoint
│   │   ├── contact/                # Contact form handler (rate-limited)
│   │   └── health/                 # Health check endpoint
│   ├── layout.tsx                  # Root layout (metadata, analytics)
│   ├── page.tsx                    # Root redirect → /en
│   ├── globals.css                 # Tailwind directives + CSS variables
│   ├── robots.ts                   # robots.txt generation
│   └── sitemap.ts                  # sitemap.xml generation
│
├── components/
│   ├── portfolio-page.tsx          # Main portfolio client component
│   ├── clarity-provider.tsx        # Microsoft Clarity analytics wrapper
│   ├── neon-glow.tsx               # Decorative glow UI element
│   └── background/
│       └── DeepSpaceBackground.tsx # Animated canvas starfield
│
├── content/
│   └── profile.ts                  # ★ All personal data lives here
│
├── lib/
│   ├── altcha.ts                   # ALTCHA challenge creation & verification
│   ├── contact.ts                  # Contact form validation logic
│   ├── i18n.ts                     # next-intl routing config
│   └── messages.ts                 # Dynamic message loader
│
├── messages/                       # Translation files
│   ├── en.json                     # English
│   ├── ar.json                     # Arabic (RTL)
│   ├── es.json                     # Spanish
│   ├── fr.json                     # French
│   ├── hi.json                     # Hindi
│   └── ml.json                     # Malayalam
│
├── public/
│   ├── logos/                      # Company / organisation logos
│   ├── resume-vishnuraj.pdf        # Downloadable résumé
│   ├── icon.png                    # Favicon source
│   ├── open-graph-banner.jpg       # OG image for social sharing
│   ├── openapi.yaml                # OpenAPI 3.x spec for public APIs
│   ├── llm.txt                     # Plain-text context for LLMs
│   ├── llm.json                    # Structured LLM context
│   └── agents.json                 # AI agent discovery manifest
│
├── .ai/                            # AI agent instructions & context
│   ├── instructions.md             # Workflow & coding rules for agents
│   ├── guardrails.md               # Hard safety rules for AI assistance
│   ├── agents/                     # Agent persona definitions
│   │   ├── senior-nextjs-developer.md
│   │   ├── personal-branding-expert.md
│   │   └── product-engineer.md
│   └── skills/
│       └── skills.md               # Reusable AI skill matrix
│
├── Dockerfile                      # Production Docker image
├── Dockerfile.dev                  # Development Docker image
├── docker-compose.yml              # Compose for local + production
├── proxy.ts                        # Dev proxy helper
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# ── Site ─────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://vishnuraj.me     # Canonical site URL

# ── Contact Form ─────────────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx        # https://resend.com
CONTACT_TO_EMAIL=your@email.com              # Inbox for received messages

# ── ALTCHA Spam Protection ────────────────────────────────────────────
ALTCHA_HMAC_KEY=your-secret-key              # Generate: see below
ALTCHA_ALGORITHM=SHA-256                     # SHA-256 | SHA-384 | SHA-512
ALTCHA_MAX_NUMBER=1000000                    # PoW difficulty ceiling
ALTCHA_SALT_LENGTH=16                        # Challenge salt length (bytes)
ALTCHA_EXPIRES_IN_SECONDS=300               # Challenge TTL (5 min default)
```

### Generate `ALTCHA_HMAC_KEY`

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Note:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `ALTCHA_HMAC_KEY` are required for the contact form to function. The site renders without them, but the contact endpoint will return errors.

---

## Customization Guide

### 1. Personal Data

All portfolio content lives in a single file — `content/profile.ts`. Edit it to update your information:

```typescript
export const profile = {
  name: "Your Name",
  title: "Your Role",
  location: "City, Country",
  email: "you@email.com",
  linkedin: "https://linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  website: "https://yoursite.com",

  headline: "One-liner that appears in the hero section",
  summary: "Longer bio paragraph...",

  stats: {
    yearsExperience: 7,
    certifications: 12,
    companies: 5,
    projects: 30,
  },

  highlights: ["API Design", "Cloud Architecture", "Team Leadership"],

  experiences: [ /* Work history */ ],
  skills: { /* Skills by category */ },
  projects: [ /* Portfolio projects */ ],
  certifications: [ /* Certifications */ ],
  education: [ /* Education history */ ],
  languages: [ /* Spoken languages */ ],
};
```

### 2. Translations

All UI strings are in `messages/`. To update text or add a language:

1. Edit the relevant `messages/<locale>.json`
2. To add a new locale, create `messages/<code>.json` and add `<code>` to `lib/i18n.ts`

### 3. Résumé

Replace `public/resume-vishnuraj.pdf` with your own PDF. Update the download `href` in `components/portfolio-page.tsx` to match the filename.

### 4. Company / Brand Logos

Place logos in `public/logos/` and reference them in `content/profile.ts`:

```typescript
logo: "/logos/company-name.png"
```

Supported formats: `.png`, `.jpg`, `.webp`, `.svg`, `.avif`

### 5. Theme Colors

Customise the CSS design tokens in `app/globals.css`:

```css
:root {
  --bg: #f4f6fb;
  --surface: #ffffff;
  --text: #111827;
  --muted: #64748b;
  --accent: #2563eb;
  --accent-soft: #dbeafe;
  --border: #dbe4f0;
}

:root[data-theme="dark"] {
  --bg: #050812;
  --surface: #0d1324;
  --text: #e2e8f0;
  --muted: #93a3bc;
  --accent: #5ba2ff;
  --accent-soft: #14315d;
  --border: #1f2b43;
}
```

### 6. Adding a New Section

1. **Add translations** — add keys to `messages/en.json` (and other locales)
2. **Define data shape** — add a type and field to `content/profile.ts`
3. **Add content** — populate the new field with your data
4. **Build the component** — add the section inside `components/portfolio-page.tsx`
5. **Add navigation** — include the section key in the `navKeys` array

---

## Docker

Full Docker support is included for both development and production.

```bash
# Development (hot-reload)
npm run docker:dev

# Production build and run
npm run docker:build
npm run docker:up

# Stop containers
npm run docker:down

# View logs
npm run docker:logs

# Full cleanup (containers + images + volumes)
npm run docker:clean
```

### Ports

| Service | Port |
|---|---|
| Next.js app | `3000` |
| Nginx proxy (docker-compose) | `80` / `443` |

---

## API Reference

The full API is documented as an OpenAPI 3.x spec at [`/openapi.yaml`](https://vishnuraj.me/openapi.yaml).

### Endpoints

#### `GET /api/health`
Health check for uptime monitoring.

```json
{ "status": "ok", "timestamp": "2026-02-18T19:00:00.000Z" }
```

#### `GET /api/altcha/challenge`
Generates an ALTCHA proof-of-work challenge.

```json
{
  "algorithm": "SHA-256",
  "challenge": "...",
  "salt": "...",
  "signature": "...",
  "expires": "..."
}
```

#### `POST /api/contact`
Submits a contact form message. Requires a valid ALTCHA payload.

**Rate limit:** 6 requests / 10 minutes / IP

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "altcha": "string (base64 ALTCHA payload)"
}
```

### Contact Form Flow

```
Client                       Server
  │                             │
  │── GET /api/altcha/challenge ──▶│  Generate PoW challenge
  │◀── { challenge, salt, sig } ──│
  │                             │
  │  [Client solves PoW]        │
  │                             │
  │── POST /api/contact ─────────▶│  1. Validate input
  │   { name, email, message,   │  2. Check rate limit
  │     subject, altcha }       │  3. Verify ALTCHA signature
  │                             │  4. Send email via Resend
  │◀── { success: true } ────────│
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Add all [environment variables](#environment-variables) in **Project Settings → Environment Variables**
4. Deploy — zero config required

### Self-Hosted (Docker)

```bash
# Build production image
docker build -t my-portfolio .

# Run with environment variables
docker run -p 3000:3000 \
  -e RESEND_API_KEY=re_xxx \
  -e CONTACT_TO_EMAIL=you@email.com \
  -e ALTCHA_HMAC_KEY=your-secret \
  my-portfolio
```

### Other Node Hosts

```bash
npm run build
npm run start   # Starts on port 3000
```

Set environment variables in your hosting provider's dashboard.

---

## AI Agent Support

This project is AI-agent-ready with structured context files:

| File | Purpose |
|---|---|
| `public/llm.txt` | Plain-text context for LLM ingestion |
| `public/llm.json` | Structured JSON context for AI tools |
| `public/agents.json` | Agent discovery manifest |
| `public/openapi.yaml` | Machine-readable API specification |
| `.ai/instructions.md` | Coding workflow and rules for agents |
| `.ai/guardrails.md` | Hard safety rules for AI-assisted changes |
| `.ai/agents/` | Agent persona definitions |
| `.ai/skills/skills.md` | Reusable AI skill matrix |

---

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

npm run docker:build # Build Docker image
npm run docker:up    # Start Docker containers
npm run docker:down  # Stop Docker containers
npm run docker:dev   # Start Docker dev environment
npm run docker:logs  # Follow container logs
npm run docker:clean # Remove containers, images, and volumes
```

---

## License

MIT — feel free to fork and adapt this as a template for your own portfolio.

---

## Credits & Acknowledgements

| Project | Usage |
|---|---|
| [Next.js](https://nextjs.org/) | Framework |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [ALTCHA](https://altcha.org/) | Spam protection |
| [Resend](https://resend.com/) | Email delivery |
| [Microsoft Clarity](https://clarity.microsoft.com/) | Analytics |
| [Vercel Analytics](https://vercel.com/analytics) | Web analytics |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalisation |
