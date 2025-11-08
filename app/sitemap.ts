import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.wuub.com";

const routes = [
  "",
  "product",
  "how-it-works",
  "pricing",
  "reviews",
  "b2b",
  "contact",
  "legal/privacy",
  "legal/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      return {
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.6,
      };
    })
  );
}

