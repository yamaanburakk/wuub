"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition, type ChangeEvent } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export const LangSwitcher = ({ locale }: { locale: Locale }) => {
  const labelText = locale === "tr" ? "Dil seçin" : "Select language";
  const ariaLabel =
    locale === "tr" ? "Dili değiştir" : "Change language";
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      if (!pathname) {
        router.push(`/${nextLocale}`);
        return;
      }
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 0) {
        router.push(`/${nextLocale}`);
        return;
      }
      segments[0] = nextLocale;
      router.push(`/${segments.join("/")}`);
    });
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-wuub-black dark:text-wuub-white">
      <span className="sr-only">{labelText}</span>
      <select
        className={cn(
          "rounded-full border border-wuub-black/15 bg-white px-3 py-2 text-xs uppercase tracking-wide text-wuub-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:border-wuub-white/20 dark:bg-wuub-black dark:text-wuub-white",
          isPending && "opacity-70"
        )}
        aria-label={ariaLabel}
        value={locale}
        onChange={handleChange}
        disabled={isPending}
      >
        {locales.map((option) => (
          <option key={option} value={option} className="text-sm">
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

