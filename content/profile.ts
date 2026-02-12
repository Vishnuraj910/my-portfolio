export type Experience = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
};

export const profile = {
  name: "Vishnuraj Rajagopal",
  title: "Full Stack + AI Engineering Lead",
  location: "Dubai, UAE",
  email: "vishnuraj910@gmail.com",
  phone: "+971 567 319 316",
  linkedin: "https://www.linkedin.com/in/vishnuraj910",
  github: "https://github.com/Vishnuraj910",
  summary:
    "Engineering leader with 13+ years of experience delivering secure, cloud-native, and AI-augmented platforms across fintech, aviation operations, and enterprise systems. Proven in scaling high-performing teams, building mission-critical products, and driving measurable business impact.",
  highlights: [
    "Leadership",
    "Full Stack Architecture",
    "AWS",
    "GenAI + RAG",
    "Security + PCI",
    "Platform Engineering"
  ],
  experiences: [
    {
      company: "zeqi",
      role: "Consultant",
      period: "Jan 2026 – Present",
      achievements: [
        "Advising on enterprise-grade architecture for AI-enabled business workflows.",
        "Driving modernization roadmap, observability, and delivery standards."
      ]
    },
    {
      company: "Sokin",
      role: "Staff Engineer",
      period: "Jul 2025 – Nov 2025",
      achievements: [
        "Shipped fintech super-app capabilities with resilient APIs and robust front-end architecture.",
        "Implemented secure transaction workflows aligned with compliance and audit requirements."
      ]
    },
    {
      company: "Etihad Airways",
      role: "Technical Lead (Contract)",
      period: "Apr 2025 – Jul 2025",
      achievements: [
        "Led aviation operations platform enhancements focused on reliability and operational visibility.",
        "Improved release quality and time-to-production through better CI/CD guardrails."
      ]
    },
    {
      company: "VISA Inc",
      role: "Staff Software Engineer",
      period: "Jul 2016 – Jan 2025",
      achievements: [
        "Led delivery of secure merchant lifecycle and payment-adjacent platform features at scale.",
        "Built AI-assisted internal workflows improving decision speed and reducing manual effort.",
        "Partnered across teams to enforce PCI-aware architecture and production hardening."
      ]
    },
    {
      company: "OASYS InfoTech",
      role: "Senior Frontend Developer",
      period: "May 2014 – Jun 2016",
      achievements: [
        "Delivered rich client applications with maintainable component-driven architecture.",
        "Improved UX consistency and performance across multiple enterprise products."
      ]
    },
    {
      company: "Reubro International",
      role: "Programmer / Game Developer",
      period: "Oct 2012 – Sep 2014",
      achievements: [
        "Developed interactive digital experiences and gameplay systems with strong performance focus.",
        "Collaborated with design teams to ship polished user-facing features quickly."
      ]
    }
  ] as Experience[],
  skills: {
    Leadership: ["Engineering Management", "Cross-functional Leadership", "Delivery Strategy"],
    "Full Stack": ["TypeScript", "React", "Next.js", "Node.js", "MERN", "REST APIs"],
    Cloud: ["AWS", "Serverless", "CI/CD", "Observability", "Docker", "Kubernetes"],
    Security: ["PCI", "Secure SDLC", "Threat Modeling", "Identity & Access"],
    "AI/ML": ["GenAI", "RAG", "Prompt Engineering", "AI Assistants"],
    Other: ["Scrum", "System Design", "Fintech", "Aviation Ops"]
  },
  projects: [
    {
      title: "AI-Assisted Hiring Platform",
      summary:
        "Built an AI-driven recruiting workflow with resume intelligence, interview signal extraction, and recruiter copilots.",
      stack: ["Next.js", "Node.js", "LLM", "RAG", "PostgreSQL"],
      href: "#"
    },
    {
      title: "AI Merchant Lifecycle Orchestrator",
      summary:
        "Designed a secure platform for merchant onboarding, risk workflows, and lifecycle automation at enterprise scale.",
      stack: ["React", "TypeScript", "AWS", "Event-Driven", "Security"],
      href: "#"
    },
    {
      title: "Voice Banking Experience",
      summary:
        "Prototyped conversational voice journeys for banking tasks with intent recognition and guard-railed responses.",
      stack: ["Speech APIs", "NLP", "Node.js", "Security"],
      href: "#"
    },
    {
      title: "Fintech Super App Modules",
      summary: "Shipped modular wallet, transfer, and account experience components optimized for scale.",
      stack: ["Next.js", "GraphQL", "Design System"],
      href: "#"
    },
    {
      title: "Cloud Native Ops Dashboard (Placeholder)",
      summary: "Editable placeholder project for cloud observability and incident response workflows.",
      stack: ["AWS", "Telemetry", "React"],
      href: "#"
    }
  ],
  certifications: [
    "AWS Solutions Architect Associate (SAA-C03) · 2025–2028",
    "AWS Cloud Practitioner (CLF-C02) · 2025–2028",
    "Certified Scrum Master · 2025–2027",
    "Kong Microservices Foundations · 2024"
  ],
  education: [
    "MSc, Middlesex University Dubai · 2018–2020",
    "BTech, MG University / SAINTGITS College · 2008–2012"
  ]
};
