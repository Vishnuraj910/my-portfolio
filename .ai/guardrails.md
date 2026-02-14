# AI Agent Guardrails

This file defines mandatory guardrails and safety constraints for AI agents working on this Next.js portfolio project. These guardrails are inspired by enterprise-level safety practices used at Meta and other leading tech companies.

---

## 1. Security Guardrails

### Input Validation & Sanitization

**Rule 1.1: Validate All User Inputs**
- Never trust client-provided data; always validate on the server
- Use Zod, Yup, or custom validators for schema validation
- Reject requests with malformed data early

```typescript
// ✅ CORRECT: Validate on server
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // Process validated data
}
```

**Rule 1.2: Sanitize Output**
- Escape user-generated content before rendering
- Use React's built-in XSS protection (default)
- Be cautious with `dangerouslySetInnerHTML`

```typescript
// ❌ AVOID: Direct HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ PREFERRED: Use React's default escaping
<div>{userInput}</div>
```

**Rule 1.3: Protect Against CSRF**
- Use SameSite cookies for authentication tokens
- Implement origin validation for API routes
- Use anti-CSRF tokens for state-changing operations

### API Route Security

**Rule 1.4: Rate Limiting**
- Implement rate limiting to prevent abuse
- Consider using Upstash Redis or in-memory rate limiting

```typescript
// Example rate limiting implementation
const RATE_LIMIT = 10; // requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}
```

**Rule 1.5: Secure Headers**
- Use Next.js built-in security headers
- Configure CSP, X-Frame-Options, X-Content-Type-Options

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

---

## 2. Privacy Guardrails

### Data Handling

**Rule 2.1: Minimize Data Collection**
- Only collect data that is strictly necessary
- Don't log sensitive user information
- Implement data retention policies

**Rule 2.2: Protect PII (Personally Identifiable Information)**
- Never log email addresses, names, or other PII in plain text
- Hash sensitive data before logging for debugging
- Use environment variables for secrets, never hardcode

```typescript
// ❌ AVOID: Logging sensitive data
console.log('User email:', user.email);

// ✅ PREFERRED: Log anonymized data
console.log('User action:', user.id);
```

**Rule 2.3: Environment Variables**
- Store all secrets in `.env.local` (not committed)
- Use `process.env` for accessing secrets
- Validate required env vars at startup

```typescript
// Validate required environment variables
const requiredEnvVars = ['NEXT_PUBLIC_SITE_URL'];
const missing = requiredEnvVars.filter(key => !process.env[key]);

if (missing.length > 0) {
  throw new Error(`Missing required env vars: ${missing.join(', ')}`);
}
```

---

## 3. Code Quality Guardrails

### TypeScript Strictness

**Rule 3.1: Avoid `any` Type**
- Never use `any` unless absolutely necessary
- Use `unknown` when type is truly unknown
- Create proper types for all data structures

```typescript
// ❌ AVOID
const data: any = response.json();

// ✅ PREFERRED
interface UserData {
  id: string;
  name: string;
  email: string;
}
const data: UserData = response.json();
```

**Rule 3.2: Enable Strict Null Checks**
- Always handle null/undefined cases
- Use optional chaining and nullish coalescing appropriately

```typescript
// ❌ AVOID
const name = user.name;
const upperName = name.toUpperCase(); // May crash!

// ✅ PREFERRED
const name = user?.name ?? 'Anonymous';
const upperName = name.toUpperCase();
```

### Error Handling

**Rule 3.3: Never Expose Stack Traces to Users**
- Catch errors and return user-friendly messages
- Log full errors server-side for debugging

```typescript
// ❌ AVOID: Exposes internal details
return NextResponse.json({ error: error.stack }, { status: 500 });

// ✅ PREFERRED: User-friendly error
console.error('Contact form error:', error); // Server-side logging
return NextResponse.json(
  { error: 'An error occurred. Please try again later.' },
  { status: 500 }
);
```

**Rule 3.4: Implement Error Boundaries**
- Add error.tsx in every route segment
- Provide graceful degradation

```typescript
// app/[locale]/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

---

## 4. Safety Guardrails

### Content Safety

**Rule 4.1: Validate Content Length**
- Set reasonable limits on user input
- Prevent DoS via large payloads

```typescript
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;

function validateInput(data: ContactFormData) {
  if (data.message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH}`);
  }
  if (data.name.length > MAX_NAME_LENGTH) {
    throw new Error(`Name exceeds maximum length of ${MAX_NAME_LENGTH}`);
  }
}
```

**Rule 4.2: Implement Spam Protection**
- Use ALTCHA or similar challenge-response mechanisms
- Add honeypot fields to detect bots
- Implement rate limiting per IP

**Rule 4.3: Validate File Uploads**
- If file uploads are added, validate:
  - File type (allowlist only)
  - File size
  - File content (magic numbers)

### Accessibility & Inclusion

**Rule 4.4: Ensure Accessibility**
- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure color contrast meets WCAG AA

```typescript
// ❌ AVOID: Missing accessibility
<div onClick={handleClick}>Click me</div>

// ✅ PREFERRED: Accessible button
<button onClick={handleClick} aria-label="Submit contact form">
  Submit
</button>
```

---

## 5. Operational Guardrails

### Performance

**Rule 5.1: Optimize Images**
- Use next/image for all images
- Specify dimensions to prevent layout shift
- Use appropriate formats (WebP, AVIF)

```typescript
// ✅ CORRECT
<Image
  src="/profile.jpg"
  alt="Profile photo"
  width={200}
  height={200}
  priority={true}
/>
```

**Rule 5.2: Implement Proper Loading States**
- Add loading.tsx for route segments
- Use Suspense for streaming
- Show meaningful loading indicators

**Rule 5.3: Lazy Load Heavy Components**
- Use dynamic imports for components below the fold

```typescript
const HeavyChart = dynamic(
  () => import('./HeavyChart'),
  { loading: () => <ChartSkeleton /> }
);
```

### Monitoring

**Rule 5.4: Add Telemetry Points**
- Log important events (form submissions, errors)
- Use structured logging
- Track Core Web Vitals

```typescript
// Structured logging
console.log(JSON.stringify({
  level: 'info',
  message: 'Contact form submitted',
  timestamp: new Date().toISOString(),
  userId: userId,
}));
```

---

## 6. Compliance Guardrails

### Internationalization

**Rule 6.1: Never Hardcode Visible Text**
- All user-facing text must use translation keys
- Support both English and Arabic
- Test RTL layouts

**Rule 6.2: Handle Missing Translations**
- Provide fallback language
- Log missing translation keys for debugging

```typescript
// In translation loading
function getTranslation(locale: string, key: string): string {
  const translations = loadedTranslations[locale] || loadedTranslations['en'];
  return translations[key] || key;
}
```

---

## 7. Git & Version Control Guardrails

### Commit Safety

**Rule 7.1: Never Commit Secrets**
- Add `.env*` to `.gitignore`
- Use git-secrets or similar tools
- Review diffs before committing

**Rule 7.2: Use Meaningful Commit Messages**
```
feat: Add contact form with spam protection
fix: Resolve RTL spacing issue in navigation
security: Add rate limiting to API routes
docs: Update README with setup instructions
```

---

## 8. Review Checklist

Before any code is considered complete, verify:

- [ ] **Security**
  - [ ] All user inputs validated on server
  - [ ] No sensitive data logged
  - [ ] Rate limiting implemented
  - [ ] Security headers configured
  - [ ] ALTCHA verification working

- [ ] **Privacy**
  - [ ] No PII in logs
  - [ ] Environment variables used for secrets
  - [ ] Data minimized

- [ ] **Quality**
  - [ ] No `any` types
  - [ ] Null checks handled
  - [ ] Error boundaries in place
  - [ ] TypeScript strict mode passes

- [ ] **Safety**
  - [ ] Input length limits enforced
  - [ ] Accessibility tested
  - [ ] Keyboard navigation works

- [ ] **Performance**
  - [ ] Images optimized
  - [ ] Loading states present
  - [ ] No unnecessary re-renders

---

## Enforcement

These guardrails are **mandatory** and must be followed for all code changes. Violations should be caught during code review and must be fixed before merging.

**Tools that help enforce these guardrails:**
- ESLint with strict rules
- TypeScript strict mode
- Pre-commit hooks for secrets scanning
- Automated security scanning

---

*Last updated: 2026-02-14*
*Version: 1.0*
