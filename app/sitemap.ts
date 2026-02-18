import type { MetadataRoute } from "next";

const BASE_URL = "https://vishnuraj.me";

const LOCALES = ["en", "ar", "es", "fr", "hi", "ml"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Generate one sitemap entry per locale, with hreflang alternates on each
  const localeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}`])
      ) as Record<string, string>
    }
  }));

  return localeEntries;
}
