import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vishnuraj.me";
  return [
    "/en",
    "/ar",
  ].map((path) => ({ 
    url: `${base}${path}`, 
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/en" ? 1.0 : 0.8,
  }));
}
