import ClarityProvider from "@/components/clarity-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://vishnuraj.me";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    template: "%s | Vishnuraj Rajagopal"
  },
  description:
    "Portfolio of Vishnuraj Rajagopal — Solutions Architect, Full Stack Lead & AI Engineer with 13+ years of experience in FinTech, Cloud, and enterprise systems. Based in Dubai, UAE.",
  keywords: [
    "Vishnuraj Rajagopal",
    "Full Stack Engineer",
    "Solutions Architect",
    "AI Engineering Lead",
    "FinTech",
    "Cloud Architect",
    "AWS Solutions Architect",
    "Dubai UAE",
    "React",
    "Next.js",
    "Node.js",
    "GenAI",
    "RAG",
    "LangChain",
    "PCI DSS",
    "Microservices",
    "TypeScript",
    "portfolio"
  ],
  authors: [{ name: "Vishnuraj Rajagopal", url: BASE_URL }],
  creator: "Vishnuraj Rajagopal",
  publisher: "Vishnuraj Rajagopal",
  category: "Technology",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "x-default": `${BASE_URL}/en`,
      en: `${BASE_URL}/en`,
      ar: `${BASE_URL}/ar`,
      es: `${BASE_URL}/es`,
      fr: `${BASE_URL}/fr`,
      hi: `${BASE_URL}/hi`,
      ml: `${BASE_URL}/ml`
    }
  },
  openGraph: {
    title: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    description:
      "Solutions Architect & Full Stack Lead with 13+ years in FinTech, Cloud, and AI. Based in Dubai, UAE. AWS Certified, CSM®.",
    url: BASE_URL,
    siteName: "Vishnuraj Rajagopal Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/background-removed-background-removed.png",
        width: 1200,
        height: 630,
        alt: "Vishnuraj Rajagopal — Full Stack + AI Engineering Lead"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    description:
      "Solutions Architect & Full Stack Lead with 13+ years in FinTech, Cloud, and AI. Based in Dubai, UAE.",
    images: ["/background-removed-background-removed.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

// JSON-LD structured data for Person and WebSite schemas
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Vishnuraj Rajagopal",
      url: BASE_URL,
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/background-removed-background-removed.png`,
        width: 1200,
        height: 630
      },
      sameAs: [
        "https://www.linkedin.com/in/vishnuraj910",
        "https://github.com/Vishnuraj910",
        "https://about.me/vishnurajrajagopal"
      ],
      jobTitle: "Solutions Architect | Full Stack Lead | AI Engineering Lead",
      worksFor: {
        "@type": "Organization",
        name: "zeqi"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE"
      },
      email: "mailto:vishnuraj910@gmail.com",
      knowsAbout: [
        "Full Stack Development",
        "Solutions Architecture",
        "Artificial Intelligence",
        "FinTech",
        "Cloud Computing",
        "AWS",
        "React",
        "Next.js",
        "Node.js",
        "GenAI",
        "RAG",
        "PCI DSS",
        "Microservices",
        "Kubernetes",
        "Docker"
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Middlesex University Dubai"
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Mahatma Gandhi University"
        }
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "AWS Certified Solutions Architect Associate",
          credentialCategory: "Professional Certification",
          recognizedBy: { "@type": "Organization", name: "Amazon Web Services" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Certified Scrum Master (CSM®)",
          credentialCategory: "Professional Certification",
          recognizedBy: { "@type": "Organization", name: "Scrum Alliance" }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Vishnuraj Rajagopal Portfolio",
      description:
        "Portfolio of Vishnuraj Rajagopal — Solutions Architect, Full Stack Lead & AI Engineer based in Dubai, UAE.",
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: ["en", "ar", "es", "fr", "hi", "ml"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/en`
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (systemDark ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; } catch(e) {} })();`
          }}
        />
        <ClarityProvider>
          {children}
        </ClarityProvider>
        <Analytics />
      </body>
    </html>
  );
}
