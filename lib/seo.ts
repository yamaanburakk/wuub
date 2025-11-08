import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import { defaultLocale } from "./i18n/config";

const DEFAULT_SITE_URL = "https://www.wuub.com";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? DEFAULT_SITE_URL;

type MetadataOptions = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export const buildMetadata = ({
  locale,
  title,
  description,
  path = "",
  image = "/images/og.svg",
}: MetadataOptions): Metadata => {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${normalizedPath}`;

  const alternateLocale = locale === "tr" ? "en" : "tr";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [alternateLocale]: `${siteUrl}/${alternateLocale}${normalizedPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      siteName: "Wuub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
};

export const getLocalizedPath = (locale: Locale, path = "") => {
  const sanitizedPath = path.replace(/^\/|\/$/g, "");
  if (!sanitizedPath) {
    return `/${locale}`;
  }
  return `/${locale}/${sanitizedPath}`;
};

export const getDefaultLocalePath = (path = "") =>
  getLocalizedPath(defaultLocale, path);

