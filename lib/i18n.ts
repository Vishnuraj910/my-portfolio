// All supported languages
export const locales = ["en", "ar", "es", "fr", "hi", "ml"] as const;

// Languages available for user switching (all supported locales)
export const routingLanguages = ["en", "ar", "es", "fr", "hi", "ml"] as const;

export type Locale = (typeof locales)[number];
export type RoutingLocale = (typeof routingLanguages)[number];

export const defaultLocale: Locale = "en";

// Check if locale is supported
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

// Check if locale is a routing language (user can switch between them)
export function isRoutingLocale(value: string): value is RoutingLocale {
  return routingLanguages.includes(value as RoutingLocale);
}

// Map browser language codes to supported locales
export function getLocaleFromBrowser(localeString: string): Locale | null {
  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
  const locales = localeString
    .split(",")
    .map((lang) => lang.split(";")[0].trim().split("-")[0].toLowerCase());

  // Find first matching supported locale
  for (const lang of locales) {
    if (lang === "en") return "en";
    if (lang === "ar") return "ar";
    if (lang === "es") return "es";
    if (lang === "fr") return "fr";
    if (lang === "hi") return "hi";
    if (lang === "ml") return "ml";
  }

  return null;
}

// Get display name for a locale
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  ml: "മലയാളം",
};

// Get native name for a locale
export const localeNativeNames: Record<Locale, string> = {
  en: "English",
  ar: "Arabic",
  es: "Spanish",
  fr: "French",
  hi: "Hindi",
  ml: "Malayalam",
};
