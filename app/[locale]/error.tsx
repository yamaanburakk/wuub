"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  void error;
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "tr";
  const t = useTranslations("errors");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-3xl border border-wuub-black/10 bg-white p-10 text-center dark:border-wuub-white/15 dark:bg-wuub-black/60">
      <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
        {t("errorTitle")}
      </h1>
      <p className="max-w-lg text-base text-wuub-gray dark:text-wuub-white/70">
        {t("errorDescription")}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          {t("tryAgain")}
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href={`/${locale}`}>{t("backHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

