import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { LangAttribute } from "@/components/layout/lang-attribute";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { type Locale, locales } from "@/lib/i18n/config";

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <LangAttribute locale={locale} />
        <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0e0f11]">
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;

