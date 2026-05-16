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
  sublabel?: string;
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
      { value: "below35", label: "Below 35,000", sublabel: "≈ under $9.5k / mo", score: 0, dealBreaker: true, gapReason: "Below the 35k AED/month minimum" },
      { value: "35to40", label: "35,000 – 40,000", sublabel: "≈ $9.5k – $10.9k / mo", score: 6, gapReason: "At the lower end — meets the 35k minimum" },
      { value: "40to50", label: "40,000 – 50,000", sublabel: "≈ $10.9k – $13.6k / mo", score: 9, strengthReason: "Meets salary expectation" },
      { value: "50to60", label: "50,000 – 60,000", sublabel: "≈ $13.6k – $16.3k / mo", score: 12, strengthReason: "Above salary expectation" },
      { value: "above60", label: "60,000+", sublabel: "≈ $16.3k+ / mo", score: 15, strengthReason: "Well above salary expectation" },
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
