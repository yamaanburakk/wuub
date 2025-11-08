import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

const NotFound = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale as Locale;
  const isSupported = locales.includes(locale);
  const t = await getTranslations({
    locale: isSupported ? locale : "tr",
    namespace: "errors",
  });
  const targetLocale = isSupported ? locale : "tr";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-3xl border border-wuub-black/10 bg-white p-10 text-center dark:border-wuub-white/15 dark:bg-wuub-black/60">
      <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
        {t("notFoundTitle")}
      </h1>
      <p className="max-w-lg text-base text-wuub-gray dark:text-wuub-white/70">
        {t("notFoundDescription")}
      </p>
      <Button asChild variant="primary" size="lg">
        <Link href={`/${targetLocale}`}>{t("backHome")}</Link>
      </Button>
    </div>
  );
};

export default NotFound;

