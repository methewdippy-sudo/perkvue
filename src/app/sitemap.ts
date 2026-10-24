import { MetadataRoute } from "next";
import { SAFE_PERK_STORES } from "../lib/storesData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://perkvue.com";
  const staticDate = new Date("2026-10-01T00:00:00Z");

  const staticPages = [
    { url: baseUrl, lastModified: staticDate, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/privacy`, lastModified: staticDate, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: staticDate, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  // Only public safe perk stores in sitemap.xml
  const storePages = SAFE_PERK_STORES.map((s) => ({
    url: `${baseUrl}/deals/${s.slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...storePages];
}
