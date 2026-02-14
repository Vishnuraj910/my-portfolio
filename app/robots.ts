import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vishnurajrajagopal.vercel.app";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Descrease crawl delay for better indexing
        crawlDelay: 1,
      },
      // Specific rules for major search engines
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
      },
      {
        userAgent: "YandexBot",
        allow: "/",
      },
    ],
    // Sitemap location
    sitemap: `${baseUrl}/sitemap.xml`,
    // Host directive for search engines
    host: baseUrl,
  };
}
