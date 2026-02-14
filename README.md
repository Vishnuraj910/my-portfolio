# Portfolio Template - Next.js 16 + TypeScript

A production-ready, bilingual (English/Arabic) portfolio website built with Next.js App Router. Features a modern premium UI, dark/light themes, smooth animations, and a secure contact form with ALTCHA spam protection.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### Core Features
- **Bilingual Support**: Full English (`/en`) and Arabic (`/ar`) with RTL layout
- **Dark/Light Theme**: System preference detection with localStorage persistence
- **Responsive Design**: Mobile-first, works on all screen sizes
- **SEO Optimized**: Metadata, OpenGraph, robots.txt, sitemap.xml
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy

### Portfolio Sections
- Hero with CTA buttons
- About with highlight chips
- Stats (experience years, certifications, companies, projects)
- Work experience timeline (expandable)
- Skills with category filters
- Projects with tech stack
- Certifications with filters and sorting
- Languages proficiency
- Education history
- Contact form

### Contact Form Security
- **ALTCHA Proof-of-Work**: GPU-intensive captcha alternative
- **Server-side Validation**: Input sanitization and validation
- **Rate Limiting**: 6 requests per 10 minutes per IP
- **Email Delivery**: Via Resend API

## Quick Start

```bash
# Clone and install
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── [locale]/              # Locale routes (/en, /ar)
│   │   ├── layout.tsx         # Locale-specific layout (RTL support)
│   │   └── page.tsx           # Main portfolio page
│   ├── api/                   # API routes
│   │   ├── altcha/            # ALTCHA challenge endpoint
│   │   └── contact/           # Contact form handler
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root redirect
│   ├── globals.css            # Tailwind + custom CSS
│   ├── robots.ts              # Robots.txt
│   └── sitemap.ts            # Sitemap.xml
├── components/
│   └── portfolio-page.tsx     # Main portfolio component
├── content/
│   └── profile.ts             # Profile data (experiences, projects, etc.)
├── lib/
│   ├── altcha.ts              # ALTCHA verification logic
│   ├── contact.ts             # Contact form validation
│   ├── i18n.ts               # i18n configuration
│   └── messages.ts           # Message loading
├── messages/
│   ├── en.json                # English translations
│   └── ar.json                # Arabic translations
├── public/                    # Static assets
│   ├── resume-*.pdf           # Your resume
│   ├── logos/                 # Company/brand logos
│   └── icon.png              # Site favicon
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

## Customization Guide

### 1. Update Profile Data

Edit `content/profile.ts` to change:

```typescript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  location: "City, Country",
  email: "your@email.com",
  linkedin: "https://linkedin.com/in/...",
  github: "https://github.com/...",
  // ... all other fields
};
```

**Available Fields:**
- `name`, `title`, `location`, `email`, `linkedin`, `github`, `aboutMe`
- `headline`, `summary` - Hero section text
- `stats` - Years experience, certifications count, etc.
- `highlights` - Array of highlight chips
- `experiences` - Work history array
- `skills` - Object with skill categories
- `projects` - Portfolio projects
- `certifications` - Certifications array
- `education` - Education history
- `languages` - Language proficiencies

### 2. Update Translations

Edit `messages/en.json` and `messages/ar.json` for:
- Navigation labels
- Section headings
- Button text
- Form labels and messages
- Any UI text

### 3. Add Your Resume

1. Place your PDF resume in `/public/` (e.g., `resume.pdf`)
2. Update the download link in `components/portfolio-page.tsx`:
```tsx
<a href="/resume.pdf" className="btn" download>Download Resume</a>
```

### 4. Add Company Logos

Place logos in `/public/logos/` and reference them in `content/profile.ts`:
```typescript
logo: "/logos/company-name.png"
```

### 5. Customize Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --bg: #f4f6fb;        /* Background */
  --surface: #ffffff;   /* Card background */
  --text: #111827;      /* Primary text */
  --muted: #64748b;    /* Secondary text */
  --accent: #2563eb;    /* Primary accent */
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

## Environment Variables

Create `.env.local` in the root:

```bash
# Required for contact form
RESEND_API_KEY=re_123456789          # Get from https://resend.com
CONTACT_TO_EMAIL=your@email.com       # Where to receive contact form emails

# Required for ALTCHA spam protection
ALTCHA_HMAC_KEY=your-secret-key      # Generate a secure random string
ALTCHA_ALGORITHM=SHA-256             # SHA-256, SHA-384, or SHA-512
ALTCHA_MAX_NUMBER=1000000            # Maximum number for proof-of-work
ALTCHA_SALT_LENGTH=16                # Salt length for challenges
ALTCHA_EXPIRES_IN_SECONDS=300       # Challenge expiration (5 minutes)
```

### Generating ALTCHA_HMAC_KEY

Generate a secure key using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Contact Form Flow

```
1. User loads page
   ↓
2. ALTCHA widget fetches challenge from /api/altcha/challenge
   ↓
3. User solves proof-of-work (client-side)
   ↓
4. User submits form with ALTCHA payload
   ↓
5. /api/contact validates:
   - Input sanitization
   - Rate limiting (6 requests/10min/IP)
   - ALTCHA verification (signature + challenge)
   ↓
6. Email sent via Resend API
   ↓
7. Success/error response to user
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Project Settings
4. Deploy

### Other Platforms

Build and start:

```bash
npm run build
npm run start
```

Set environment variables in your hosting provider's dashboard.

## Adding New Sections

To add a new section:

1. **Add translations** in `messages/en.json` and `messages/ar.json`
2. **Add data type** in `content/profile.ts`
3. **Add data** in the profile object
4. **Add component** in `components/portfolio-page.tsx`
5. **Add navigation** to `navKeys` array

## License

MIT - Feel free to use this as a template for your own portfolio!

## Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ALTCHA](https://altcha.org/)
- [Resend](https://resend.com/)
