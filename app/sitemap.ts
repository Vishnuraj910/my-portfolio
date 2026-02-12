import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://portfolio.example.com";
  return ["/en", "/ar"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
