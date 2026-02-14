# Cline Project Instructions

This file provides general coding guidelines, project-specific rules, and instructions for AI agents working on this Next.js portfolio project.

---

## General Guidelines

### Code Quality Standards

1. **TypeScript Strict Mode**
   - Never use `any` type unless absolutely necessary
   - Enable strict null checks
   - Prefer explicit types over type assertions
   - Use `unknown` when type is truly unknown

2. **Component Design**
   - Keep components small and focused (single responsibility)
   - Extract reusable logic into custom hooks
   - Use composition over inheritance
   - Prefer functional components with hooks

3. **Naming Conventions**
   - Components: PascalCase (`PortfolioPage.tsx`)
   - Functions: camelCase (`getProfileData()`)
   - Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
   - Files: kebab-case for configs, PascalCase for components

4. **Documentation**
   - Add JSDoc comments for exported functions
   - Document complex logic with inline comments
   - Keep README.md updated with setup instructions

---

## React & Next.js Guidelines

### Server vs Client Components

**Use Server Components (Default) when:**
- Fetching data
- Accessing backend resources directly
- Keeping sensitive information on the server
- Large dependencies that don't need interactivity
- Static content rendering

**Use Client Components (`"use client"`) when:**
- Using React hooks (`useState`, `useEffect`, `useRef`)
- Handling user events (onClick, onChange)
- Using browser-only APIs
- Custom hooks that depend on state/effects
- Third-party components that use React hooks

### Page Structure

```typescript
// app/[locale]/page.tsx - Server Component by default
import { getTranslations } from '@/lib/i18n';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return (
    // Render content
  );
}
```

### API Routes

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process form
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Internationalization Guidelines

### Translation Files

**Location:** `messages/en.json`, `messages/ar.json`

**Structure:**
```json
{
  "Navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "Hero": {
    "title": "Welcome",
    "subtitle": "Full Stack Developer"
  }
}
```

### Using Translations

```typescript
// In Server Components
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('Hero');
return <h1>{t('title')}</h1>;

// In Client Components
import { useTranslations } from 'next-intl';

const t = useTranslations('Hero');
return <h1>{t('title')}</h1>;
```

### RTL Support

1. **Direction Attribute**
   ```typescript
   // Set on root layout
   <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
   ```

2. **Tailwind Logical Properties**
   - Use `ms-4` (margin-start) instead of `ml-4`
   - Use `me-4` (margin-end) instead of `mr-4`
   - Use `ps-4` (padding-start) instead of `pl-4`
   - Use `text-start` instead of `text-left`

3. **Flexbox**
   - `flex-row` for LTR
   - `flex-row-reverse` when direction matters

---

## Styling Guidelines

### Tailwind CSS v4

**Configuration:**
- Uses PostCSS (`postcss.config.mjs`)
- No `tailwind.config.js` - uses CSS variables in `globals.css`

**Best Practices:**
```css
/* globals.css */
@theme {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded;
  }
}
```

**Responsive Design:**
```html
<!-- Mobile first -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Content -->
</div>
```

### Accessibility

1. **Semantic HTML**
   - Use `<header>`, `<nav>`, `<main>`, `<footer>`
   - Use `<button>` for actions, `<a>` for links
   - Proper heading hierarchy (`h1` → `h6`)

2. **Focus States**
   - Always have visible focus indicators
   - Use `focus-visible` for keyboard navigation

3. **ARIA Labels**
   ```typescript
   <button aria-label="Close dialog">
     <CloseIcon />
   </button>
   ```

---

## Form Handling

### Client-Side Validation

```typescript
interface FormData {
  name: string;
  email: string;
  message: string;
}

function validateForm(data: FormData): string | null {
  if (!data.name.trim()) return 'Name is required';
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'Invalid email address';
  }
  if (!data.message.trim()) return 'Message is required';
  if (data.message.length < 10) return 'Message too short';
  return null;
}
```

### Server-Side Validation

```typescript
async function validateContactRequest(request: NextRequest) {
  const body = await request.json();
  const errors: string[] = [];
  
  if (!body.name || body.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!body.email || !isValidEmail(body.email)) {
    errors.push('Valid email is required');
  }
  
  return errors;
}
```

---

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Loading States

```typescript
// app/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">Loading...</div>;
}
```

---

## Performance Guidelines

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile photo"
  width={200}
  height={200}
  priority={true} // For above-the-fold images
  className="rounded-full"
/>
```

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // Disable SSR if needed
  }
);
```

### Static Generation

```typescript
// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
```

---

## Git Workflow

### Commit Messages

```
feat: Add contact form validation
fix: Resolve RTL spacing issue in navigation
docs: Update README with setup instructions
refactor: Extract i18n logic to utility function
style: Improve button hover states
```

### Branch Naming

```
feature/add-new-section
bugfix/contact-form-validation
hotfix/security-patch
```

---

## Testing Guidelines

### ESLint Rules

Run linting before commits:
```bash
npm run lint
```

Address all warnings and errors. If a rule must be disabled, add a comment explaining why:
```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Reason: This will be used in future implementation
```

### TypeScript

Ensure no type errors:
```bash
npx tsc --noEmit
```

---

## Deployment

### Build for Production

```bash
npm run build
```

This generates:
- Optimized JavaScript bundles
- Static pages for all routes
- API route handlers

### Environment

- **Development**: `npm run dev` (localhost:3000)
- **Production**: `npm run build` && `npm run start`

---

## Common Patterns

### Fetching Data in Server Components

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.content}</div>;
}
```

### Handling Environment Variables

```typescript
// Accessing env vars in API routes
const apiKey = process.env.API_KEY;

// Note: Server-side only - never expose to client
```

---

## Security Checklist

- [ ] Validate all user inputs
- [ ] Sanitize output to prevent XSS
- [ ] Verify ALTCHA tokens for forms
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Review code for security vulnerabilities
- [ ] Never commit secrets to version control

---

## File Organization

```
project-root/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page
├── components/            # React components
├── content/               # Static content
├── lib/                   # Utility functions
│   ├── altcha.ts          # ALTCHA integration
│   ├── contact.ts        # Contact form utilities
│   ├── i18n.ts           # Internationalization
│   └── messages.ts       # Message handling
├── messages/              # Translation files
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
├── public/                # Static assets
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## Quick Reference

### Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Important Paths

| Path | Purpose |
|------|---------|
| `/[locale]/` | Internationalized routes |
| `/api/contact` | Contact form endpoint |
| `/api/altcha/challenge` | Spam protection |
| `/messages/*.json` | Translation files |
| `/lib/` | Utility functions |

### Environment

- **Node.js**: v18+
- **npm**: v9+
- **Next.js**: 16.x
- **React**: 19.x
- **TypeScript**: 5.x

---

*Last updated: 2026-02-14*
