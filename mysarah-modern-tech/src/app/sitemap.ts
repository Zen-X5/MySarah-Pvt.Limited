import type { MetadataRoute } from "next";
import { sectors } from "@/lib/sectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const sectorUrls = sectors.map((sector) => ({
    url: `${baseUrl}/sectors/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: sector.active ? 0.8 : 0.5,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sectors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...sectorUrls,
  ];
}
