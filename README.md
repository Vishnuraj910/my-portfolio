# Vishnuraj Rajagopal Portfolio (Next.js + TypeScript)

A modern bilingual (English/Arabic) portfolio built with Next.js App Router, responsive design, premium minimal UI, smooth motion, dark/light themes, and a secure contact API with ALTCHA + email delivery.

## Features

- EN + AR locale routes: `/en` and `/ar`
- RTL Arabic support and locale-aware typography
- Light/Dark theme toggle with persistence
- Animated, responsive one-page portfolio sections
- Contact form with:
  - server-side validation + sanitization
  - ALTCHA proof-of-work captcha verification
  - in-memory rate limiting by IP
  - email delivery via Resend
- SEO metadata, OpenGraph, robots, sitemap
- Security headers in Next config
- Content-first editing model via `content/profile.ts` and `messages/*.json`

## Tech

- Next.js App Router + TypeScript
- Tailwind CSS (utility + custom CSS variables)

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local`:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=vishnuraj910@gmail.com
ALTCHA_HMAC_KEY=XXXX
ALTCHA_ALGORITHM=SHA-256
ALTCHA_MAX_NUMBER=1000000
ALTCHA_SALT_LENGTH=16
ALTCHA_EXPIRES_IN_SECONDS=300
```

## Contact form flow

1. Client loads ALTCHA widget and solves the challenge.
2. `/api/altcha/challenge` issues signed proof-of-work challenges.
3. `/api/contact` validates/sanitizes payload and verifies ALTCHA payload/signature.
4. API applies rate limiting and sends an email via Resend.

## Edit content

- Core profile/timeline/projects/skills: `content/profile.ts`
- Localized labels: `messages/en.json` and `messages/ar.json`

## Deployment (Vercel recommended)

1. Push to GitHub.
2. Import repo in Vercel.
3. Add all env vars in Vercel Project Settings.
4. Deploy.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
