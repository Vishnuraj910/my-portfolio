export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  logo?: string;
};

export type Certification = {
  name: string;
  authority: string;
  url?: string;
  expires?: string;
  licenseNumber?: string;
  logo?: string;
  date?: string;
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  year: string;
  href?: string;
};

export type Language = {
  name: string;
  proficiency: string;
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  period: string;
  notes?: string;
};

export const profile = {
  name: "Vishnuraj Rajagopal",
  title: "Solutions Architect | Full Stack Lead | FinTech | AI | CSM®",
  location: "Dubai, UAE",
  email: "vishnuraj910@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishnuraj910",
  github: "https://github.com/Vishnuraj910",
  aboutMe: "https://about.me/vishnurajrajagopal",
  headline: "FinTech Cloud Solution Architect & MEAN Stack Engineering designing and delivering secure, scalable enterprise solutions that align with complex business needs. Expert in security-first architecture design, vendor management, and leading cross-functional teams. Adept at developing strategic technical roadmaps and executing phased deployments of mission-critical platforms.",
  summary:
    "Engineering leader with 13+ years of experience delivering secure, cloud-native, and AI-augmented platforms across fintech, aviation operations, and enterprise systems. Proven in scaling high-performing teams, building mission-critical products, and driving measurable business impact.",
  stats: {
    yearsExperience: "13+",
    certifications: 32,
    countries: 3,
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
  ] as Experience[],
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
      href: undefined
    },
    {
      title: "Visa Airport Companion",
      summary: "Mobile app helping Visa cardholders access airport lounges across CEMEA region with seamless authentication and benefits tracking.",
      stack: ["React Native", "FinTech", "Mobile", "API Integration"],
      year: "2024",
      href: undefined
    },
    {
      title: "Shared Access",
      summary: "Tokenized credential solution allowing family members to access funds with granular card controls and spending limits.",
      stack: ["Tokenization", "Mobile", "FinTech", "AWS"],
      year: "2024",
      href: undefined
    },
    {
      title: "Merchant On-boarding Messenger Bot",
      summary: "Enabled merchants to complete KYC with document upload and start accepting payments within seconds via Facebook Messenger.",
      stack: ["Messenger Bot", "KYC", "Payments", "API.ai"],
      year: "2018",
      href: undefined
    },
    {
      title: "SetPlays",
      summary: "Android application showcasing Visa Payment APIs in real-world scenarios with innovative payment experiences.",
      stack: ["Android", "Visa APIs", "Mobile Payments"],
      year: "2017-2018",
      href: undefined
    },
    {
      title: "Visa Wallet",
      summary: "Demo application built in React Native showcasing CTC (Consumer Transaction Controls) and VTS (Visa Tokenization Service).",
      stack: ["React Native", "Tokenization", "Mobile Wallet"],
      year: "2017",
      href: undefined
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
      href: undefined
    },
    {
      title: "Banking Chatbot",
      summary: "Facebook Messenger chatbot powered by API.ai for banking services and customer support automation.",
      stack: ["Messenger", "Chatbot", "API.ai", "Banking"],
      year: "2016",
      href: undefined
    },
    {
      title: "H2A Mobile App",
      summary: "HR mobile app solution with request management, leave applications, certificate requests, payslip access, and attendance tracking.",
      stack: ["Mobile", "HR Solutions", "iOS", "Android"],
      year: "2014-2015",
      href: undefined
    },
    {
      title: "Query Generator",
      summary: "JavaScript application helping IT support generate complex SQL queries without typing, improving productivity.",
      stack: ["JavaScript", "SQL", "Productivity Tool"],
      year: "2015-2016",
      href: undefined
    },
    {
      title: "Quick Search and Menu Navigation",
      summary: "Navigation improvement solution allowing access to any page in less than 10 seconds from anywhere in the application.",
      stack: ["UX", "Navigation", "Enterprise App"],
      year: "2015",
      href: undefined
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
      href: undefined
    },
    {
      title: "ChimeneBadi App",
      summary: "PhoneGap app for Android and iPhone that aggregates news about singer ChimeneBadi from Facebook, Twitter, and Bandsintown.",
      stack: ["PhoneGap", "Mobile", "Social Media API"],
      year: "2013",
      href: undefined
    }
  ] as Project[],
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
  ] as Certification[],
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
  ] as Education[],
  languages: [
    { name: "English", proficiency: "Full professional proficiency" },
    { name: "Malayalam", proficiency: "Native or bilingual proficiency" },
    { name: "Hindi", proficiency: "Elementary proficiency" },
    { name: "Tamil", proficiency: "Limited working proficiency" },
    { name: "Spanish", proficiency: "Elementary proficiency" }
  ] as Language[]
};
