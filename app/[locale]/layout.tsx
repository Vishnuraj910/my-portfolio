import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import NeonGlow from "@/components/neon-glow";
import DeepSpaceBackground from "@/components/background/DeepSpaceBackground";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "فيشنوراج راجاغوبال" : "Vishnuraj Rajagopal",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        es: "/es",
        fr: "/fr",
        hi: "/hi",
        ml: "/ml"
      }
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

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} data-locale={locale}>
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
