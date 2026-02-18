import DeepSpaceBackground from "@/components/background/DeepSpaceBackground";
import NeonGlow from "@/components/neon-glow";
import { isLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = "https://vishnuraj.me";

// Per-locale SEO metadata
const localeMetadata: Record<
  string,
  { title: string; description: string; ogLocale: string; dir: "ltr" | "rtl" }
> = {
  en: {
    title: "Vishnuraj Rajagopal | Full Stack + AI Engineering Lead",
    description:
      "Portfolio of Vishnuraj Rajagopal — Solutions Architect, Full Stack Lead & AI Engineer with 13+ years in FinTech, Cloud, and enterprise systems. Based in Dubai, UAE.",
    ogLocale: "en_US",
    dir: "ltr"
  },
  ar: {
    title: "فيشنوراج راجاغوبال | قائد هندسة الذكاء الاصطناعي والتطوير الشامل",
    description:
      "ملف تعريف فيشنوراج راجاغوبال — مهندس معماري للحلول وقائد تطوير متكامل وخبير ذكاء اصطناعي بخبرة تزيد على 13 عامًا في مجال التكنولوجيا المالية والحوسبة السحابية. مقيم في دبي، الإمارات.",
    ogLocale: "ar_AE",
    dir: "rtl"
  },
  es: {
    title: "Vishnuraj Rajagopal | Líder de Ingeniería Full Stack + IA",
    description:
      "Portafolio de Vishnuraj Rajagopal — Arquitecto de Soluciones, Líder Full Stack e Ingeniero de IA con más de 13 años en FinTech, Cloud y sistemas empresariales. Basado en Dubái, EAU.",
    ogLocale: "es_ES",
    dir: "ltr"
  },
  fr: {
    title: "Vishnuraj Rajagopal | Responsable Ingénierie Full Stack + IA",
    description:
      "Portfolio de Vishnuraj Rajagopal — Architecte Solutions, Lead Full Stack et Ingénieur IA avec plus de 13 ans d'expérience en FinTech, Cloud et systèmes d'entreprise. Basé à Dubaï, EAU.",
    ogLocale: "fr_FR",
    dir: "ltr"
  },
  hi: {
    title: "विष्णुराज राजगोपाल | फुल स्टैक + AI इंजीनियरिंग लीड",
    description:
      "विष्णुराज राजगोपाल का पोर्टफोलियो — सॉल्यूशन आर्किटेक्ट, फुल स्टैक लीड और AI इंजीनियर जिनके पास FinTech, Cloud और एंटरप्राइज़ सिस्टम में 13+ वर्षों का अनुभव है। दुबई, UAE में स्थित।",
    ogLocale: "hi_IN",
    dir: "ltr"
  },
  ml: {
    title: "വിഷ്ണുരാജ് രാജഗോപാൽ | ഫുൾ സ്റ്റാക്ക് + AI എഞ്ചിനീയറിംഗ് ലീഡ്",
    description:
      "വിഷ്ണുരാജ് രാജഗോപാലിന്റെ പോർട്ട്ഫോളിയോ — FinTech, Cloud, എന്റർപ്രൈസ് സിസ്റ്റങ്ങളിൽ 13+ വർഷത്തെ അനുഭവമുള്ള Solutions Architect, Full Stack Lead & AI Engineer. ദുബായ്, UAE ആസ്ഥാനം.",
    ogLocale: "ml_IN",
    dir: "ltr"
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] ?? localeMetadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
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
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "Vishnuraj Rajagopal Portfolio",
      locale: meta.ogLocale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/background-removed-background-removed.png`,
          width: 1200,
          height: 630,
          alt: "Vishnuraj Rajagopal — Full Stack + AI Engineering Lead"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/background-removed-background-removed.png`]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dir = localeMetadata[locale]?.dir ?? "ltr";

  return (
    <div lang={locale} dir={dir} data-locale={locale}>
      <DeepSpaceBackground />
      <NeonGlow />
      {children}
    </div>
  );
}

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },
    { locale: "es" },
    { locale: "fr" },
    { locale: "hi" },
    { locale: "ml" }
  ];
}
