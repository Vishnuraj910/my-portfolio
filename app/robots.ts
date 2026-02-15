import type { MetadataRoute } from "next";

/**
 * Production-level robots.txt configuration for optimal search engine indexing.
 * 
 * This file helps search engines like Google, Bing, Yandex, and Baidu
 * understand which pages to crawl and index on your portfolio website.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vishnuraj.me";
  
  return {
    rules: [
      // General rule for all web crawlers
      {
        userAgent: "*",
        allow: "/",
        // Disallow access to private API routes and admin areas (if any)
        disallow: [
          "/api/",
          "/admin/",
          "/_next/", // Next.js internal routes
        ],
        // Note: crawlDelay is respected by some crawlers (Yandex, Bing) but ignored by Google
        // Remove if not needed - keeping it minimal as Google ignores it
      },
      // Google-specific rules (most important for indexing)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      // Googlebot Image for image indexing
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      // Bingbot for Microsoft search
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      // Yandex for Russian search engine
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      // Baidu for Chinese search engine
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      // DuckDuckGo bot
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      // Apple bot (for Siri suggestions)
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Facebook crawler (for social sharing preview)
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      // Twitter bot (for social cards)
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
    ],
    // Sitemap location - critical for SEO
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    // Host directive - specifies the preferred domain
    host: baseUrl,
  };
}
