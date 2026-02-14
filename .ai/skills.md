# Cline Skills Configuration

This file defines the technical skills, tools, and capabilities available to AI agents working on this Next.js portfolio project.

---

## Core Framework Skills

### Next.js (App Router)
- **Version**: 16.x (latest)
- **Server Components**: Default components are server-rendered; use `"use client"` directive sparingly
- **Dynamic Routes**: `[locale]/` pattern for internationalization
- **API Routes**: Route handlers in `app/api/` directory using Web Standard Request/Response
- **Streaming**: Implement Suspense boundaries for optimal loading states
- **Metadata API**: Use `generateMetadata` for SEO optimization
- **Static Generation**: Use `generateStaticParams` for locale paths

### React 19
- **Server Components**: Prefer server-side rendering for performance
- **Hooks**: Use client-side hooks (`useState`, `useEffect`, `useCallback`) only in client components
- **Actions**: Leverage Server Actions for form submissions and data mutations
- **Ref**: Use `useRef` for DOM access and persistent values

### TypeScript
- **Strict Mode**: Enabled - avoid `any` type
- **Generics**: Use for reusable utility types and components
- **Type Inference**: Let TypeScript infer types when obvious
- **Explicit Types**: Add explicit return types for exported functions
- **Utility Types**: Utilize `Partial`, `Required`, `Pick`, `Omit`, `Record`

---

## Styling & UI

### Tailwind CSS v4
- **Configuration**: PostCSS-based configuration in `postcss.config.mjs`
- **Responsive Design**: Use breakpoints (sm, md, lg, xl, 2xl)
- **RTL Support**: Use logical properties (start/end vs left/right) for Arabic support
- **Custom Utilities**: Extend via CSS variables in `globals.css`
- **Arbitrary Values**: Use bracket notation for dynamic values when needed

### Design Principles
- **Mobile-First**: Write styles for mobile first, then add desktop overrides
- **Accessibility**: Ensure color contrast ratios meet WCAG AA standards
- **Performance**: Minimize unused CSS; use Tailwind's JIT compiler

---

## Internationalization (i18n)

### Locale Management
- **Supported Locales**: English (`en`), Arabic (`ar`)
- **Routing**: `/[locale]/` dynamic route pattern
- **Direction**: `dir` attribute based on locale (`ltr` for en, `rtl` for ar)
- **Translation Files**: JSON files in `messages/` directory (`en.json`, `ar.json`)

### RTL Implementation
- **Layout Mirroring**: Test all components in RTL mode
- **Flexbox**: Use `flex-row` and `flex-row-reverse` appropriately
- **Spacing**: Use logical margin/padding (ms/me vs ms/ml)
- **Icons**: Flip icons that have directionality

### Best Practices
- **No Hardcoded Text**: Always use translation keys
- **Pluralization**: Handle Arabic plural forms correctly
- **Date/Number Formatting**: Use locale-aware formatting

---

## API Development

### Route Handlers
- **Location**: `app/api/[route]/route.ts`
- **Methods**: Support GET, POST as needed
- **Validation**: Validate request bodies and query parameters
- **Error Handling**: Return appropriate HTTP status codes
- **Type Safety**: Define request/response types

### Spam Protection
- **ALTCHA Integration**: Implemented in `lib/altcha.ts`
- **Challenge Validation**: Verify ALTCHA tokens on form submission
- **Rate Limiting**: Consider implementation for production

### Contact Form
- **Endpoint**: `/api/contact`
- **Validation**: Validate email, message, and required fields
- **Response**: Return JSON with success/error status

---

## Project Structure

### Directory Organization
```
app/
├── [locale]/              # Locale-aware routes
│   ├── layout.tsx         # Locale layout with metadata
│   └── page.tsx           # Locale page
├── api/                   # API routes
│   ├── altcha/            # ALTCHA verification
│   └── contact/           # Contact form handler
components/                # React components
content/                   # Static content/data
lib/                       # Utility functions
messages/                  # Translation files
public/                    # Static assets
```

### Naming Conventions
- **Components**: PascalCase (e.g., `PortfolioPage.tsx`)
- **Utilities**: camelCase (e.g., `i18n.ts`)
- **Types**: PascalCase with `.types.ts` suffix when separate
- **Constants**: UPPER_SNAKE_CASE for enums
- **Files**: kebab-case for config files

---

## Performance Optimization

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Optimize hero images with priority loading
- **FID (First Input Delay)**: Minimize JavaScript on main thread
- **CLS (Cumulative Layout Shift)**: Reserve space for dynamic content

### Strategies
- **Image Optimization**: Use `next/image` for automatic optimization
- **Code Splitting**: Leverage dynamic imports for heavy components
- **Caching**: Use appropriate cache headers for static assets
- **Bundle Analysis**: Monitor bundle size with Next.js analytics

---

## Testing & Quality

### Code Quality Tools
- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled in `tsconfig.json`
- **Prettier**: Code formatting (if configured)

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Available Tools & Libraries

### Runtime
- **Node.js**: Current LTS version
- **npm**: Package manager

### Dependencies
- **next**: 16.1.6 - React framework
- **react**: 19.2.4 - UI library
- **react-dom**: 19.2.4 - React DOM rendering
- **tailwindcss**: v4 - Utility-first CSS
- **typescript**: v5 - Type safety

### Development Dependencies
- **@types/node**: TypeScript types for Node.js
- **@types/react**: TypeScript types for React
- **@types/react-dom**: TypeScript types for React DOM
- **eslint**: Code linting
- **eslint-config-next**: Next.js ESLint configuration

---

## Environment Variables

### Required Variables
- None currently required (static portfolio)

### Optional Variables
- Add environment-specific variables as needed for API integrations

---

## API Reference

### Contact Form API
```typescript
// POST /api/contact
interface ContactRequest {
  name: string;
  email: string;
  message: string;
  altchaToken: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}
```

### ALTCHA API
```typescript
// GET /api/altcha/challenge
interface ALTCHChallengeResponse {
  algorithm: string;
  challenge: string;
  maxTimeout: number;
  nonce: number;
  signature: string;
}
```

---

## Security Considerations

### Input Validation
- Validate all user inputs on both client and server
- Sanitize HTML to prevent XSS attacks
- Use parameterized queries if database is added

### API Security
- Verify ALTCHA tokens for form submissions
- Implement rate limiting for production
- Use HTTPS in production

### Best Practices
- Never expose sensitive data in client-side code
- Use environment variables for secrets
- Follow OWASP security guidelines
