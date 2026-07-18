import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { id: site.url, en: `${site.url}/en` },
      },
    },
    {
      url: `${site.url}/en`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { id: site.url, en: `${site.url}/en` },
      },
    },
    {
      url: `${site.url}/akomodasi`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          id: `${site.url}/akomodasi`,
          en: `${site.url}/en/accommodation`,
        },
      },
    },
    {
      url: `${site.url}/en/accommodation`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          id: `${site.url}/akomodasi`,
          en: `${site.url}/en/accommodation`,
        },
      },
    },
  ];
}
