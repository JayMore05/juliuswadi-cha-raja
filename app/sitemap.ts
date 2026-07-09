import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://juliuswadi-cha-raja.vercel.app";

  return [
    {
      url: baseUrl,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/updates`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/committee`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aarti`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/donation`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
  ];
}