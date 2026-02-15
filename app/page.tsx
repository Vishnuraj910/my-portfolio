import { redirect } from "next/navigation";
import { getLocaleFromBrowser } from "@/lib/i18n";

// Force dynamic rendering to detect browser language at runtime
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },
    { locale: "es" },
    { locale: "fr" },
    { locale: "hi" },
    { locale: "ml" }
  ];
}

export default async function RootPage({
  headers,
}: {
  headers: Headers | undefined;
}) {
  // For static generation, default to English
  if (!headers) {
    redirect("/en");
  }

  // Get Accept-Language header from request
  const acceptLanguage = headers.get("accept-language") || "";

  // Detect locale from browser settings
  const detectedLocale = getLocaleFromBrowser(acceptLanguage);

  // If browser language is English or not detected (or Arabic), go to English page
  // The user will see the EN/AR toggle to switch between them
  if (!detectedLocale || detectedLocale === "en" || detectedLocale === "ar") {
    redirect("/en");
  }

  // For other languages (es, fr, hi, ml), redirect to that locale
  // User will see an option to switch to English
  redirect(`/${detectedLocale}`);
}
