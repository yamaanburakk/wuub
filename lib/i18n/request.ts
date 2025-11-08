import { dictionaries } from "./messages";
import type { Locale } from "./config";
import { defaultLocale, locales } from "./config";
export type { Messages } from "./messages";

export default async function getRequestConfig({ locale }: { locale: string }) {
  const normalizedLocale = (locales.includes(locale as Locale)
    ? locale
    : defaultLocale) as Locale;

  return {
    messages: dictionaries[normalizedLocale],
  };
}

