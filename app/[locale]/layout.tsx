import type { ReactNode } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { BackgroundGrid } from "@/components/layout/background-grid";
import { LangAttribute } from "@/components/layout/lang-attribute";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getProductSchema } from "@/lib/schema";
import { buildMetadata, getLocalizedPath } from "@/lib/seo";
import { type Locale, locales } from "@/lib/i18n/config";

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LayoutProps) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "meta" });
  const path = getLocalizedPath(locale);

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path,
  });
}

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const productSchema = getProductSchema({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <LangAttribute locale={locale} />
        <div className="relative min-h-screen overflow-x-hidden bg-[#0e0f11] text-wuub-white">
          <BackgroundGrid />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar locale={locale} />
            <main className="flex-1 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
                {children}
              </div>
            </main>
            <Footer locale={locale} />
          </div>
        </div>
        <Script
          id="product-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(productSchema)}
        </Script>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;

