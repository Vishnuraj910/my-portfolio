import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { l as localeNames, R as Route } from "./router-C8fkbzT_.js";
import { useState, useMemo, useEffect, useRef } from "react";
import "@tanstack/react-router";
const profile = {
  name: "Vishnuraj Rajagopal",
  title: "Solutions Architect | Full Stack Lead | FinTech | AI | CSM®",
  location: "Dubai, UAE",
  email: "vishnuraj910@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishnuraj910",
  github: "https://github.com/Vishnuraj910",
  aboutMe: "https://about.me/vishnurajrajagopal",
  stats: {
    yearsExperience: "13+",
    certifications: 32,
    companies: 5
  },
  highlights: [
    "Leadership",
    "Full Stack Architecture",
    "AWS Solutions Architect",
    "GenAI + RAG",
    "Security + PCI-DSS",
    "Platform Engineering",
    "FinTech",
    "Cloud-Native"
  ],
  experiences: [
    {
      company: "zeqi",
      role: "Consultant",
      period: "Jan 2026 – Present",
      location: "Dubai, UAE",
      achievements: [
        "Building the next generation of e-commerce solutions with Gen AI.",
        "Connecting merchants' Shopify or WooCommerce stores to Zeqi for holistic analysis and recommendations."
      ],
      logo: "/logos/zeqi.png"
    },
    {
      company: "Sokin",
      role: "Staff Engineer",
      period: "Aug 2025 – Dec 2025",
      location: "Dubai, UAE",
      achievements: [
        "Building solutions to help businesses move money cross-border seamlessly.",
        "Developing fintech super-app capabilities with resilient APIs and robust frontend architecture."
      ],
      logo: "/logos/Sokin-FinTech-Finance.png"
    },
    {
      company: "Etihad Airways",
      role: "Technical Leader",
      period: "Apr 2025 – Jul 2025",
      location: "Abu Dhabi, UAE",
      achievements: [
        "Designed and delivered Phase 1 of Flight Operations Platform.",
        "Built real-time event streaming from 80+ telemetry data sources for airport operations.",
        "Helped airport operations team handle disruptions effectively."
      ],
      logo: "/logos/Etihad-airways-logo.svg.png"
    },
    {
      company: "VISA Inc",
      role: "Staff Software Engineer",
      period: "Aug 2023 – Jan 2025",
      location: "Dubai, UAE",
      achievements: [
        "Designing and developing custom low-level fintech cloud and mobile solutions.",
        "Providing end-to-end planning, implementation, and support to VPs and Senior Directors."
      ],
      logo: "/logos/visa.jpg"
    },
    {
      company: "VISA Inc",
      role: "Senior Software Engineer",
      period: "Apr 2019 – Aug 2023",
      location: "Dubai, UAE",
      achievements: [
        "Collaborating with internal and external client teams to design software solutions.",
        "Ensuring security best practices, code quality, and test coverage.",
        "Ensuring application availability and disaster recovery."
      ],
      logo: "/logos/visa.jpg"
    },
    {
      company: "VISA Inc",
      role: "Software Engineer",
      period: "Jul 2016 – Mar 2019",
      location: "Dubai, UAE",
      achievements: [
        "Built innovative solutions with Visa products and partner solutions.",
        "Solved complex business needs to improve operational efficiency and consumer retention.",
        "Worked with cross-region teams to bring innovations to Dubai innovation center."
      ],
      logo: "/logos/visa.jpg"
    },
    {
      company: "OASYS Information Technology L.L.C",
      role: "Mobile Application Developer",
      period: "May 2014 – Jun 2016",
      location: "Dubai, UAE",
      achievements: [
        "Led frontend development team of 4-6 engineers.",
        "Architectured solutions with focus on maintainability and coding best practices.",
        "Presented proof of concepts to CTO for iOS and Android applications.",
        "Incorporated latest UI/UX into OASYS HR Software Suite."
      ],
      logo: "/logos/oasys.jpg"
    },
    {
      company: "Reubro International",
      role: "Software Programmer",
      period: "Oct 2012 – Apr 2014",
      location: "Cochin, Kerala",
      achievements: [
        "Built online multiplayer gaming platform with ~100k active monthly users.",
        "Designed load testing plans for multiple backend solutions.",
        "Generated application and system metrics with actionable insights.",
        "Developed hybrid mobile applications and released on Google Play and App Store."
      ],
      logo: "/logos/reubro.avif"
    }
  ],
  skills: {
    "Cloud & DevOps": [
      "Amazon Web Services (AWS)",
      "Cloud Computing",
      "Cloud Security",
      "Cloud-Native Architecture",
      "Serverless",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Jenkins",
      "Observability"
    ],
    "Frontend": [
      "React.js",
      "Next.js",
      "TypeScript",
      "Angular",
      "AngularJS",
      "React Native",
      "Flutter",
      "Ionic Framework",
      "HTML5",
      "CSS3",
      "SASS",
      "Bootstrap",
      "jQuery"
    ],
    "Backend": [
      "Node.js",
      "Java",
      "Python",
      "PHP",
      "C++",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "MongoDB",
      "MySQL",
      "NoSQL"
    ],
    "AI & Machine Learning": [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "GenAI",
      "RAG",
      "LangChain",
      "LangGraph",
      "TensorFlow",
      "Prompt Engineering",
      "Chatbot Development",
      "Dialogflow"
    ],
    "Security": [
      "Cybersecurity",
      "ISO 27001",
      "PCI DSS",
      "Secure SDLC",
      "Cloud Security",
      "Penetration Testing",
      "Identity & Access Management",
      "Threat Modeling"
    ],
    "FinTech": [
      "FinTech",
      "Payment Solutions",
      "Blockchain",
      "Digital Banking",
      "Mobile Payments",
      "Tokenization",
      "Payment APIs"
    ],
    "Professional": [
      "Solution Architecture",
      "System Architecture",
      "Technical Architecture",
      "Scrum",
      "Agile Methodologies",
      "Project Management",
      "Team Leadership",
      "Stakeholder Management",
      "Vendor Management"
    ],
    "Tools & Others": [
      "Git",
      "Linux",
      "JSON",
      "XML",
      "JMeter",
      "Adobe Photoshop",
      "Microsoft Office",
      "ActionScript"
    ]
  },
  projects: [
    {
      title: "ConnectedOps: Operations and Disruption Portal",
      summary: "End-to-end event stream-based airport disruption management console with role-based access, delivering valuable insights and actionable notifications to airport staff.",
      stack: ["Event Streaming", "Real-time Data", "AWS", "React", "Role-based Access"],
      year: "2025",
      href: void 0
    },
    {
      title: "Visa Airport Companion",
      summary: "Mobile app helping Visa cardholders access airport lounges across CEMEA region with seamless authentication and benefits tracking.",
      stack: ["React Native", "FinTech", "Mobile", "API Integration"],
      year: "2024",
      href: void 0
    },
    {
      title: "Shared Access",
      summary: "Tokenized credential solution allowing family members to access funds with granular card controls and spending limits.",
      stack: ["Tokenization", "Mobile", "FinTech", "AWS"],
      year: "2024",
      href: void 0
    },
    {
      title: "Merchant On-boarding Messenger Bot",
      summary: "Enabled merchants to complete KYC with document upload and start accepting payments within seconds via Facebook Messenger.",
      stack: ["Messenger Bot", "KYC", "Payments", "API.ai"],
      year: "2018",
      href: void 0
    },
    {
      title: "SetPlays",
      summary: "Android application showcasing Visa Payment APIs in real-world scenarios with innovative payment experiences.",
      stack: ["Android", "Visa APIs", "Mobile Payments"],
      year: "2017-2018",
      href: void 0
    },
    {
      title: "Visa Wallet",
      summary: "Demo application built in React Native showcasing CTC (Consumer Transaction Controls) and VTS (Visa Tokenization Service).",
      stack: ["React Native", "Tokenization", "Mobile Wallet"],
      year: "2017",
      href: void 0
    },
    {
      title: "Visa Venue",
      summary: "Chat-based interactive environment for reservation, booking, scorekeeping, fan activities, and seamless payment experience for stadium events.",
      stack: ["Chat Platform", "Payments", "Real-time", "Stadium Solutions"],
      year: "2016-2017",
      href: "https://usa.visa.com/visa-everywhere/innovation/future-stadium.html"
    },
    {
      title: "Alfa Bank Chatbot",
      summary: "Messenger banking chatbot for flight and hotel booking with nearby offers for travelers with Alfa Bank Russia Visa Credit Cards.",
      stack: ["Chatbot", "Banking", "Travel", "NLP"],
      year: "2017",
      href: void 0
    },
    {
      title: "Banking Chatbot",
      summary: "Facebook Messenger chatbot powered by API.ai for banking services and customer support automation.",
      stack: ["Messenger", "Chatbot", "API.ai", "Banking"],
      year: "2016",
      href: void 0
    },
    {
      title: "H2A Mobile App",
      summary: "HR mobile app solution with request management, leave applications, certificate requests, payslip access, and attendance tracking.",
      stack: ["Mobile", "HR Solutions", "iOS", "Android"],
      year: "2014-2015",
      href: void 0
    },
    {
      title: "Query Generator",
      summary: "JavaScript application helping IT support generate complex SQL queries without typing, improving productivity.",
      stack: ["JavaScript", "SQL", "Productivity Tool"],
      year: "2015-2016",
      href: void 0
    },
    {
      title: "Quick Search and Menu Navigation",
      summary: "Navigation improvement solution allowing access to any page in less than 10 seconds from anywhere in the application.",
      stack: ["UX", "Navigation", "Enterprise App"],
      year: "2015",
      href: void 0
    },
    {
      title: "Jiwok",
      summary: "Multi-platform Android and iOS workout app with 200+ programs, 500+ workouts, and 1000 voice instructions from professional coaches.",
      stack: ["iOS", "Android", "Mobile", "Audio Processing"],
      year: "2013-2014",
      href: "https://play.google.com/store/apps/details?id=com.jiwok.jiwok"
    },
    {
      title: "Xplorepangaea.com",
      summary: "MMO game developed using Flash + ActionScript 3 with Smartfox server and Apache web server.",
      stack: ["Flash", "ActionScript", "Game Development", "Multiplayer"],
      year: "2012-2014",
      href: "http://www.xplorepangaea.com"
    },
    {
      title: "Load Testing iCarts",
      summary: "Load testing in Linux server using Apache JMeter with 100 users and 10-second ramp-up time, monitored with NMon.",
      stack: ["JMeter", "Load Testing", "Linux", "Performance"],
      year: "2013",
      href: void 0
    },
    {
      title: "ChimeneBadi App",
      summary: "PhoneGap app for Android and iPhone that aggregates news about singer ChimeneBadi from Facebook, Twitter, and Bandsintown.",
      stack: ["PhoneGap", "Mobile", "Social Media API"],
      year: "2013",
      href: void 0
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect Associate",
      authority: "Amazon Web Services (AWS)",
      url: "https://www.credly.com/badges/7b9d1959-3632-4c42-9b61-4c0252c1f850/public_url",
      expires: "Mar 2028",
      date: "2025-03",
      licenseNumber: "7b9d1959-3632-4c42-9b61-4c0252c1f850",
      logo: "/logos/Amazon_Web_Services_Logo.svg.png"
    },
    {
      name: "AWS Certified Cloud Practitioner CLF-C02",
      authority: "Amazon Web Services (AWS)",
      url: "https://www.credly.com/badges/1df50bd0-78fd-4c1c-a3d6-55f7de6506a7/linked_in_profile",
      expires: "Jan 2028",
      date: "2025-01",
      licenseNumber: "1df50bd0-78fd-4c1c-a3d6-55f7de6506a7",
      logo: "/logos/Amazon_Web_Services_Logo.svg.png"
    },
    {
      name: "Certified Scrum Master",
      authority: "Scrum Alliance",
      url: "https://bcert.me/sukqiwzpd",
      expires: "Mar 2027",
      date: "2025-03",
      licenseNumber: "001741994",
      logo: "/logos/scrum alliance.png"
    },
    {
      name: "Building AI Agents with MongoDB",
      authority: "MongoDB",
      url: "https://www.credly.com/badges/a2f99844-b30c-4d11-8072-493aaa0093e8/public_url",
      expires: "Feb 2026",
      date: "2025-02",
      licenseNumber: "a2f99844-b30c-4d11-8072-493aaa0093e8",
      logo: "/logos/mongodb-logo-png_seeklogo-481256.png"
    },
    {
      name: "Data Resilience in MongoDB Self-Managed Deployments",
      authority: "MongoDB",
      url: "https://www.credly.com/badges/b64d0736-f64e-4528-8622-aecf3ec86b40/linked_in_profile",
      expires: "Feb 2026",
      date: "2025-02",
      licenseNumber: "b64d0736-f64e-4528-8622-aecf3ec86b40",
      logo: "/logos/mongodb-logo-png_seeklogo-481256.png"
    },
    {
      name: "From Relational Model (SQL) to MongoDB's Document Model",
      authority: "MongoDB",
      url: "https://www.credly.com/badges/5dc649e5-514b-4214-8898-a9ba35d4702b/linked_in_profile",
      expires: "Feb 2026",
      date: "2025-02",
      licenseNumber: "5dc649e5-514b-4214-8898-a9ba35d4702b",
      logo: "/logos/mongodb-logo-png_seeklogo-481256.png"
    },
    {
      name: "ISO 27001:2022-Compliant Cybersecurity",
      authority: "Project Management Institute",
      url: "https://www.linkedin.com/learning/certificates/cfe895ec4b4e94bb1231ca6cf8e14eb0c7afa92654b7d29a36a42da9292afba6",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/png-transparent-pmi-hd-logo.png"
    },
    {
      name: "ISO 27001:2022-Compliant Cybersecurity: The Annex A Controls",
      authority: "Project Management Institute",
      url: "https://www.linkedin.com/learning/certificates/5bb5251d01de0df3753c5d42f71b9eb93c8b4482790251c62ee05d88434e4f37",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/png-transparent-pmi-hd-logo.png"
    },
    {
      name: "Microservices Foundations Professional Certificate by Kong",
      authority: "Kong Inc.",
      url: "https://www.linkedin.com/learning/certificates/092ec1c08e66ea7281f2fb8a9c613277be2570fc815d26cb8c4d2a583e3be0f9",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/Kong_inc.png"
    },
    {
      name: "Docker Foundations Professional Certificate",
      authority: "Docker, Inc",
      url: "https://www.linkedin.com/learning/certificates/53222a8cf49d2ef3407480f00f4a67496fa9dfb7d4c0665ffc4e12c1715f2933",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/docker.jpg"
    },
    {
      name: "Learning Terraform",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/0d09ad8ddbd8b05bd0d73fb4852b2cefc4ba72ccaece1319d58c599c785352a5",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "JavaScript Foundations Professional Certificate by Mozilla",
      authority: "Mozilla",
      url: "https://www.linkedin.com/learning/certificates/dd705c405fa8cb59241f08258419fd05961ea38c30738c226e62b98afd55a1bd",
      expires: "Apr 2025",
      date: "2024-04",
      logo: "/logos/Firefox_logo,_2019.svg.png"
    },
    {
      name: "Software Architecture Foundations",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/565cd8371e6373c04f328259d2e57bc74169e193c61d90aeefffc2569739a330",
      expires: "Apr 2025",
      date: "2024-04",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Model Context Protocol (MCP): Hands-On with Agentic AI",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/586be03dc08890edeb708ae43fe118bb4a9eb4d4dc178734f73920ad65066512",
      expires: "Apr 2025",
      date: "2024-04",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Security Awareness Foundations (SAF)",
      authority: "KnowBe4",
      expires: "Jul 2025",
      date: "2024-07",
      logo: "/logos/KnowBe4-Logo-Alternate.webp"
    },
    {
      name: "KodeKloud - Kubernetes Crash Course",
      authority: "KodeKloud",
      url: "https://learn.kodekloud.com/certificate/b2d0b979-ce50-41b8-8ebb-49a0d5ac23f1",
      expires: "Mar 2025",
      date: "2024-03",
      logo: "/logos/kodecloud.webp"
    },
    {
      name: "The Complete Guide to Becoming a Software Architect",
      authority: "Udemy",
      url: "https://ude.my/UC-a40d795c-22f2-4343-88ba-1d02e86036c8",
      expires: "Nov 2024",
      date: "2023-11",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Software Architecture Security - The Complete Guide",
      authority: "Udemy",
      url: "https://ude.my/UC-7c493232-176a-498a-b4a7-1c9f355f5010/",
      expires: "Nov 2024",
      date: "2023-11",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Ultimate AWS Certified AI Practitioner AIF-C01",
      authority: "Udemy",
      url: "http://ude.my/UC-0e299ace-f1d6-4cbf-bd19-724ac6edb6c6",
      expires: "Nov 2024",
      date: "2023-11",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "AI-Driven Cybersecurity",
      authority: "Udemy",
      url: "https://ude.my/UC-4325d176-b856-4ff6-a7f9-e356ea97df6d",
      expires: "Nov 2024",
      date: "2023-11",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "The Project Management Course: Beginner to PROject Manager",
      authority: "Udemy",
      url: "https://ude.my/UC-79d1390e-772c-45e9-819f-b4ebac6d9d45",
      expires: "Nov 2022",
      date: "2021-11",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "LangChain- Develop LLM powered applications with LangChain",
      authority: "Udemy",
      url: "https://ude.my/UC-c25deaa0-1154-46bb-869e-b94a48ef0360/",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Generative AI for NodeJs: OpenAI, LangChain - TypeScript",
      authority: "Udemy",
      url: "https://ude.my/UC-50637385-07d7-4843-bf45-1e8ac8b7b4f7/",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Database AI Agents: Complete Guide",
      authority: "Udemy",
      url: "https://ude.my/UC-4dfcde0f-879b-4e41-af73-e73e2e6e3a48/",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Software Architecture: Patterns for Developers",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/393233b938501205f787984fe708ae7257cc82ed840197d3fa5e77fe4c2ed00e",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Cloud Architecture: Core Concepts",
      authority: "National Association of State Boards of Accountancy (NASBA)",
      url: "https://www.linkedin.com/learning/certificates/c1530c62275ac8ea36aad6e249d21e9e18f528eeab4028ab2a012aad4ddede4e",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/nasbalogo_nyif.png"
    },
    {
      name: "Solution Architecture choosing a Database: PostgreSQL, MySQL, Mongo, and Cloud",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/9724f6d822d07f24e4d38e7c341ff78cc68ec8dd2434a55f6ba1c93c09732bce",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Software Architecture: Domain-Driven Design",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/361248cbde1a45c598aa5ba7bb5b21bb5f7ee4ee64d081e21c9169a91dac34d2",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Redis Essential Training",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/df21fca6ed53a2ae1ddb465f5849964067c3f72dfa6a19a27abbb5a7058b8721",
      expires: "Dec 2024",
      date: "2023-12",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Microservices: Design Patterns",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/edf5b329b850409cd20ee8420a71368e7b69ebbaa0d6442f09f46d9cd478bed5",
      expires: "Mar 2024",
      date: "2023-03",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "Apache Kafka Essentials",
      authority: "LinkedIn",
      url: "https://www.linkedin.com/learning/certificates/724635530dba663e9ccb0a72ff6f73c7142ec26178d8a05cce06e97d27b42cf6",
      expires: "Mar 2024",
      date: "2023-03",
      logo: "/logos/LinkedIn_icon.svg.webp"
    },
    {
      name: "ChatBots: Messenger ChatBot - DialogFlow and nodejs",
      authority: "Udemy",
      url: "https://ude.my/UC-515afc5b-3710-4868-8495-eda5b2aeab28/",
      expires: "Aug 2023",
      date: "2022-08",
      logo: "/logos/Udemy_logo.svg.png"
    },
    {
      name: "Vim Masterclass",
      authority: "Udemy",
      url: "http://ude.my/UC-8ace14de-a490-41c3-8cbb-e6b23115bc95",
      expires: "Jan 2023",
      date: "2022-01",
      logo: "/logos/Udemy_logo.svg.png"
    }
  ],
  education: [
    {
      school: "Middlesex University Dubai",
      degree: "Master of Science (MSc)",
      field: "Computer Science",
      period: "2018 – 2020"
    },
    {
      school: "Mahatma Gandhi University",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      period: "2008 – 2012",
      notes: "National Service Scheme"
    },
    {
      school: "V.V.H.S.S",
      degree: "Higher Secondary School",
      field: "Science",
      period: "2006 – 2008",
      notes: "Leader of National Service Scheme"
    },
    {
      school: "M.S.S High School, Kerala State Board",
      degree: "Secondary School Leaving Certificate (SSLC)",
      period: "2000 – 2006"
    }
  ],
  languages: [
    { name: "English", proficiency: "Full professional proficiency" },
    { name: "Malayalam", proficiency: "Native or bilingual proficiency" },
    { name: "Hindi", proficiency: "Elementary proficiency" },
    { name: "Tamil", proficiency: "Limited working proficiency" },
    { name: "Spanish", proficiency: "Elementary proficiency" }
  ]
};
const navKeys = ["home", "experience", "skills", "projects", "certifications", "languages", "contact"];
function CurrentYear() {
  return /* @__PURE__ */ jsx(Fragment, { children: (/* @__PURE__ */ new Date()).getFullYear() });
}
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };
  return /* @__PURE__ */ jsx("button", { className: "btn", onClick: toggle, "aria-label": "Toggle theme", type: "button", suppressHydrationWarning: true, children: theme === "dark" ? "☀" : "☾" });
}
function LanguageToggle({ locale }) {
  const [previousLocale, setPreviousLocale] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("previousLocale");
    if (saved && saved !== locale) {
      setPreviousLocale(saved);
    }
  }, [locale]);
  const allLocales = ["en", "ar", "es", "fr", "hi", "ml"];
  const localeLabels = {
    en: "EN",
    ar: "AR",
    es: "ES",
    fr: "FR",
    hi: "HI",
    ml: "ML"
  };
  const currentLabel = localeLabels[locale];
  const handleLanguageClick = (targetLocale) => {
    if (locale !== "en") {
      localStorage.setItem("previousLocale", locale);
    } else {
      localStorage.setItem("previousLocale", targetLocale);
    }
    const targetPath = targetLocale === "en" ? "/" : `/${targetLocale}`;
    window.location.href = targetPath;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "language-dropdown",
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn language-btn",
            "aria-label": "Select language",
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            onMouseEnter: () => setIsOpen(true),
            children: [
              currentLabel,
              /* @__PURE__ */ jsx("span", { className: "dropdown-arrow", children: "▾" })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx(
          "ul",
          {
            className: "language-list",
            onMouseLeave: () => setIsOpen(false),
            children: allLocales.map((loc) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: `language-option ${locale === loc ? "active" : ""}`,
                onClick: () => {
                  handleLanguageClick(loc);
                  setIsOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "language-code", children: localeLabels[loc] }),
                  /* @__PURE__ */ jsx("span", { className: "language-name", children: localeNames[loc] })
                ]
              }
            ) }, loc))
          }
        )
      ]
    }
  );
}
function ContactForm({ locale, labels }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    let timer = null;
    const checkReady = () => {
      const widget2 = formRef.current?.querySelector("altcha-widget");
      if (!widget2) return;
      setCaptchaReady(customElements.get("altcha-widget") !== void 0);
      if (customElements.get("altcha-widget") !== void 0 && timer) {
        clearInterval(timer);
      }
    };
    checkReady();
    timer = setInterval(checkReady, 250);
    const form = formRef.current;
    const widget = form?.querySelector("altcha-widget");
    const onStateChange = (event) => {
      const detail = event.detail;
      setCaptchaVerified(detail?.state === "verified");
    };
    widget?.addEventListener("statechange", onStateChange);
    return () => {
      if (timer) clearInterval(timer);
      widget?.removeEventListener("statechange", onStateChange);
    };
  }, []);
  async function onSubmit(formData2) {
    setStatus("loading");
    setError("");
    try {
      const altchaPayload = String(formData2.get("altcha") || "");
      if (!captchaReady) {
        throw new Error(labels.captcha);
      }
      if (!altchaPayload) {
        throw new Error(labels.captcha);
      }
      const browserData = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}×${screen.height}`,
        browserLanguage: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        platform: navigator.platform,
        connectionType: navigator.connection?.effectiveType || "unknown"
      };
      const response = await fetch(`/${locale}/api/contact/server`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData2.get("name"),
          email: formData2.get("email"),
          subject: formData2.get("subject"),
          message: formData2.get("message"),
          altchaPayload,
          locale,
          browserData
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || labels.error);
      setStatus("success");
      setCaptchaVerified(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : labels.error);
      setFormData({
        name: String(formData2.get("name") || ""),
        email: String(formData2.get("email") || ""),
        subject: String(formData2.get("subject") || ""),
        message: String(formData2.get("message") || "")
      });
    }
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      ref: formRef,
      className: "card form-grid",
      action: (formData2) => {
        void onSubmit(formData2);
      },
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            required: true,
            name: "name",
            placeholder: labels.name,
            className: "input",
            maxLength: 100,
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            required: true,
            type: "email",
            name: "email",
            placeholder: labels.email,
            className: "input",
            maxLength: 120,
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            required: true,
            name: "subject",
            placeholder: labels.subject,
            className: "input",
            maxLength: 140,
            value: formData.subject,
            onChange: (e) => setFormData({ ...formData, subject: e.target.value })
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            required: true,
            name: "message",
            placeholder: labels.message,
            className: "input min-h-32",
            maxLength: 2e3,
            value: formData.message,
            onChange: (e) => setFormData({ ...formData, message: e.target.value })
          }
        ),
        isClient && /* @__PURE__ */ jsx("altcha-widget", { challengeurl: `/${locale}/api/altcha/challenge/server`, hidelogo: true, hidefooter: true }),
        /* @__PURE__ */ jsx("button", { className: "btn btn-primary", type: "submit", disabled: status === "loading", children: status === "loading" ? "..." : labels.submit }),
        status === "success" ? /* @__PURE__ */ jsx("p", { className: "success", children: labels.success }) : null,
        status === "error" ? /* @__PURE__ */ jsx("p", { className: "error", children: error || labels.error }) : null
      ]
    }
  );
}
function PortfolioPage({ locale, messages }) {
  const [skillFilter, setSkillFilter] = useState(messages.skills.all);
  const [activeExperience, setActiveExperience] = useState(0);
  const [certFilter, setCertFilter] = useState(messages.certifications.all);
  const [certSort, setCertSort] = useState("desc");
  const filteredSkills = useMemo(() => {
    if (skillFilter === messages.skills.all) return profile.skills;
    return { [skillFilter]: profile.skills[skillFilter] };
  }, [skillFilter, messages.skills.all]);
  const filteredCerts = useMemo(() => {
    let certs = profile.certifications;
    if (certFilter === "All") {
      certs = profile.certifications;
    } else if (certFilter === "AWS") {
      certs = profile.certifications.filter((c) => c.name.includes("AWS"));
    } else if (certFilter === "Security") {
      certs = profile.certifications.filter((c) => c.name.includes("Security") || c.name.includes("ISO") || c.name.includes("PCI"));
    } else if (certFilter === "AI/ML") {
      certs = profile.certifications.filter((c) => c.name.includes("AI") || c.name.includes("ML") || c.name.includes("LangChain") || c.name.includes("MongoDB"));
    } else if (certFilter === "Architecture") {
      certs = profile.certifications.filter((c) => c.name.includes("Architecture") || c.name.includes("Software"));
    }
    return [...certs].sort((a, b) => {
      const dateA = a.date || "";
      const dateB = b.date || "";
      if (certSort === "desc") {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });
  }, [certFilter, certSort]);
  const certFilters = ["All", "AWS", "Security", "AI/ML", "Architecture"];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("script", { src: "https://cdn.jsdelivr.net/npm/altcha/dist/altcha.min.js", type: "module", async: true, defer: true }),
    /* @__PURE__ */ jsx("header", { className: "header", children: /* @__PURE__ */ jsxs("div", { className: "container nav-wrap", children: [
      /* @__PURE__ */ jsx("a", { href: "#home", className: "logo", children: /* @__PURE__ */ jsx("img", { src: "/icon.png", alt: "Vishnuraj", width: 40, height: 40 }) }),
      /* @__PURE__ */ jsx("nav", { className: "nav-desktop", children: /* @__PURE__ */ jsx("ul", { className: "nav-list", children: navKeys.map((key) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `#${key}`, className: "nav-link", children: messages.nav[key] }) }, key)) }) }),
      /* @__PURE__ */ jsx("div", { className: "nav-mobile", children: /* @__PURE__ */ jsxs("button", { className: "mobile-menu-btn", "aria-label": "Menu", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ jsx(LanguageToggle, { locale }),
        /* @__PURE__ */ jsx(ThemeToggle, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "container stack", children: [
      /* @__PURE__ */ jsxs("section", { id: "home", className: "hero section", children: [
        /* @__PURE__ */ jsx("div", { className: "hero-left", children: /* @__PURE__ */ jsx("div", { className: "hero-image" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hero-right", children: [
          /* @__PURE__ */ jsx("p", { className: "muted uppercase", children: profile.location }),
          /* @__PURE__ */ jsx("h1", { children: profile.name }),
          /* @__PURE__ */ jsx("h2", { children: profile.title }),
          /* @__PURE__ */ jsx("p", { className: "hero-copy", children: messages.hero.headline }),
          /* @__PURE__ */ jsxs("div", { className: "cta-row", children: [
            /* @__PURE__ */ jsx("a", { href: "#projects", className: "btn btn-primary", children: messages.hero.viewProjects }),
            /* @__PURE__ */ jsx("a", { href: "/resume-vishnuraj.pdf", className: "btn", download: true, children: messages.hero.downloadResume }),
            /* @__PURE__ */ jsx("a", { href: "#contact", className: "btn", children: messages.hero.contact })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "quick-links-section", children: /* @__PURE__ */ jsxs("div", { className: "quick-links", children: [
        /* @__PURE__ */ jsx("a", { href: profile.linkedin, target: "_blank", rel: "noreferrer", children: messages.quickLinks.linkedIn }),
        /* @__PURE__ */ jsx("a", { href: profile.github, target: "_blank", rel: "noreferrer", children: messages.quickLinks.gitHub }),
        /* @__PURE__ */ jsx("a", { href: profile.aboutMe, target: "_blank", rel: "noreferrer", children: messages.quickLinks.aboutMe }),
        /* @__PURE__ */ jsx("a", { href: `mailto:${profile.email}`, children: profile.email }),
        /* @__PURE__ */ jsx("span", { className: "social-badge", children: messages.quickLinks.awsCertified }),
        /* @__PURE__ */ jsx("span", { className: "social-badge", children: messages.quickLinks.csm })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "about", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.about }),
        /* @__PURE__ */ jsx("p", { className: "about-summary", children: messages.hero.summary }),
        /* @__PURE__ */ jsx("div", { className: "chips", children: profile.highlights.map((item) => /* @__PURE__ */ jsx("span", { className: "chip chip-highlight", children: item }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "stats", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.stats }),
        /* @__PURE__ */ jsxs("div", { className: "stats-grid", children: [
          /* @__PURE__ */ jsxs("div", { className: "stat-card card", children: [
            /* @__PURE__ */ jsx("span", { className: "stat-number", children: profile.stats.yearsExperience }),
            /* @__PURE__ */ jsx("span", { className: "stat-label", children: messages.stats.yearsExperience })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-card card", children: [
            /* @__PURE__ */ jsx("span", { className: "stat-number", children: profile.stats.certifications }),
            /* @__PURE__ */ jsx("span", { className: "stat-label", children: messages.stats.certifications })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-card card", children: [
            /* @__PURE__ */ jsx("span", { className: "stat-number", children: profile.stats.companies }),
            /* @__PURE__ */ jsx("span", { className: "stat-label", children: messages.stats.companies })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-card card", children: [
            /* @__PURE__ */ jsx("span", { className: "stat-number", children: profile.projects.length }),
            /* @__PURE__ */ jsx("span", { className: "stat-label", children: messages.stats.projectsDelivered })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "experience", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.experience }),
        /* @__PURE__ */ jsx("div", { className: "timeline", children: profile.experiences.map((item, index) => /* @__PURE__ */ jsxs("article", { className: "card timeline-card reveal", children: [
          /* @__PURE__ */ jsxs("button", { className: "timeline-head", type: "button", onClick: () => setActiveExperience(activeExperience === index ? null : index), children: [
            item.logo && /* @__PURE__ */ jsx(
              "img",
              {
                src: item.logo,
                alt: `${item.company} logo`,
                className: "company-logo",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "timeline-header-content", children: [
              /* @__PURE__ */ jsx("div", { className: "timeline-company", children: item.company }),
              /* @__PURE__ */ jsx("h4", { children: item.role }),
              /* @__PURE__ */ jsxs("p", { className: "muted timeline-period", children: [
                item.period,
                " · ",
                item.location
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "timeline-icon", children: activeExperience === index ? "−" : "+" })
          ] }),
          activeExperience === index && /* @__PURE__ */ jsx("div", { className: "timeline-content", children: /* @__PURE__ */ jsx("ul", { children: item.achievements.map((achievement, i) => /* @__PURE__ */ jsx("li", { children: achievement }, i)) }) })
        ] }, `${item.company}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "skills", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.skills }),
        /* @__PURE__ */ jsx("div", { className: "chips skill-filters", children: [messages.skills.all, ...Object.keys(profile.skills)].map((category) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSkillFilter(category), className: `chip ${skillFilter === category ? "chip-active" : ""}`, children: category }, category)) }),
        /* @__PURE__ */ jsx("div", { className: "grid skills-grid", children: Object.entries(filteredSkills).map(([category, values]) => /* @__PURE__ */ jsxs("article", { className: "card skill-card", children: [
          /* @__PURE__ */ jsx("h4", { className: "skill-category", children: category }),
          /* @__PURE__ */ jsx("div", { className: "chips", children: values.map((skill) => /* @__PURE__ */ jsx("span", { className: "chip", children: skill }, skill)) })
        ] }, category)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "projects", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.projects }),
        /* @__PURE__ */ jsx("div", { className: "grid projects-grid", children: profile.projects.map((project, index) => /* @__PURE__ */ jsxs("article", { className: "card project-card reveal", children: [
          /* @__PURE__ */ jsxs("div", { className: "project-header", children: [
            /* @__PURE__ */ jsx("h4", { children: project.title }),
            /* @__PURE__ */ jsx("span", { className: "project-year", children: project.year })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "project-summary", children: project.summary }),
          /* @__PURE__ */ jsx("div", { className: "chips project-stack", children: project.stack.map((tech) => /* @__PURE__ */ jsx("span", { className: "chip chip-small", children: tech }, tech)) }),
          project.href && /* @__PURE__ */ jsx("a", { href: project.href, target: "_blank", rel: "noreferrer", className: "project-link", children: messages.projects.viewProject })
        ] }, `${project.title}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "certifications", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.certifications }),
        /* @__PURE__ */ jsxs("div", { className: "cert-filters-wrap", children: [
          /* @__PURE__ */ jsx("div", { className: "cert-filters", children: certFilters.map((filter) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCertFilter(filter), className: `chip ${certFilter === filter ? "chip-active" : ""}`, children: messages.certifications[filter.toLowerCase()] || filter }, filter)) }),
          /* @__PURE__ */ jsx("div", { className: "cert-sort", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: certSort,
              onChange: (e) => setCertSort(e.target.value),
              className: "chip sort-select",
              children: [
                /* @__PURE__ */ jsx("option", { value: "desc", children: messages.certifications.newestFirst }),
                /* @__PURE__ */ jsx("option", { value: "asc", children: messages.certifications.oldestFirst })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cert-grid", children: filteredCerts.map((cert, index) => /* @__PURE__ */ jsxs("div", { className: "card cert-card", children: [
          cert.logo ? /* @__PURE__ */ jsx(
            "img",
            {
              src: cert.logo,
              alt: `${cert.authority} logo`,
              className: "cert-logo",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ jsx("span", { className: "cert-icon", children: "🏆" }),
          /* @__PURE__ */ jsxs("div", { className: "cert-text-content", children: [
            cert.url ? /* @__PURE__ */ jsx("a", { href: cert.url, target: "_blank", rel: "noreferrer", className: "cert-authority-link", children: cert.authority }) : /* @__PURE__ */ jsx("p", { className: "cert-authority-text", children: cert.authority }),
            /* @__PURE__ */ jsx("h4", { className: "cert-name", children: cert.name }),
            cert.expires && /* @__PURE__ */ jsxs("p", { className: "cert-expires", children: [
              messages.certifications.expires,
              " ",
              cert.expires
            ] })
          ] })
        ] }, `${cert.name}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "languages", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.languages }),
        /* @__PURE__ */ jsx("div", { className: "languages-grid", children: profile.languages.map((lang, index) => /* @__PURE__ */ jsxs("div", { className: "card language-card", children: [
          /* @__PURE__ */ jsx("div", { className: "language-icon", children: lang.name === "English" ? "🇬🇧" : lang.name === "Malayalam" ? "🇮🇳" : lang.name === "Tamil" ? "🇮🇳" : lang.name === "Hindi" ? "🇮🇳" : "🇪🇸" }),
          /* @__PURE__ */ jsxs("div", { className: "language-content", children: [
            /* @__PURE__ */ jsx("div", { className: "language-name", children: lang.name }),
            /* @__PURE__ */ jsx("div", { className: "language-proficiency", children: lang.proficiency })
          ] })
        ] }, `${lang.name}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "education", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.education }),
        /* @__PURE__ */ jsx("div", { className: "education-grid", children: profile.education.map((edu, index) => /* @__PURE__ */ jsxs("div", { className: "card education-card", children: [
          /* @__PURE__ */ jsx("div", { className: "education-icon", children: "🎓" }),
          /* @__PURE__ */ jsxs("div", { className: "education-content", children: [
            /* @__PURE__ */ jsx("h4", { children: edu.school }),
            /* @__PURE__ */ jsxs("p", { className: "education-degree", children: [
              edu.degree,
              " ",
              messages.education.in,
              " ",
              edu.field
            ] }),
            /* @__PURE__ */ jsx("p", { className: "muted", children: edu.period }),
            edu.notes && /* @__PURE__ */ jsx("p", { className: "education-notes", children: edu.notes })
          ] })
        ] }, `${edu.school}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "contact", className: "section", children: [
        /* @__PURE__ */ jsx("h3", { children: messages.sections.contact }),
        /* @__PURE__ */ jsxs("div", { className: "contact-grid", children: [
          /* @__PURE__ */ jsx("div", { className: "contact-bg-image" }),
          /* @__PURE__ */ jsx(ContactForm, { locale, labels: messages.contact })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsxs("div", { className: "container footer-wrap", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        /* @__PURE__ */ jsx(CurrentYear, {}),
        " ",
        profile.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "chips", children: [
        /* @__PURE__ */ jsx("a", { className: "chip", href: profile.linkedin, target: "_blank", rel: "noreferrer", children: messages.quickLinks.linkedIn.replace(" ↗", "") }),
        /* @__PURE__ */ jsx("a", { className: "chip", href: profile.github, target: "_blank", rel: "noreferrer", children: messages.quickLinks.gitHub.replace(" ↗", "") }),
        /* @__PURE__ */ jsx("a", { className: "chip", href: `mailto:${profile.email}`, children: messages.contact.email }),
        /* @__PURE__ */ jsx("a", { className: "chip", href: "/llm.txt", target: "_blank", rel: "noreferrer", children: "LLM.txt" }),
        /* @__PURE__ */ jsx("span", { className: "chip", children: profile.location })
      ] })
    ] }) })
  ] });
}
function LocalePage() {
  const {
    locale,
    messages
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx(PortfolioPage, { locale, messages });
}
export {
  LocalePage as component
};
