import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/request";
import { buildMetadata, getLocalizedPath } from "@/lib/seo";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const b2b = messages.b2b;

  return buildMetadata({
    locale,
    title: b2b.title,
    description: b2b.intro,
    path: getLocalizedPath(locale, "b2b"),
  });
}

const B2BPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const b2b = messages.b2b;

  return (
    <div className="flex px-4 py-12 sm:px-0 lg:py-16">
      <article className="mx-auto w-full max-w-3xl rounded-3xl border border-wuub-black/10 bg-white p-6 sm:p-10 dark:border-wuub-white/15 dark:bg-wuub-black/60">
        <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
          {b2b.title}
        </h1>
        <p className="mt-4 text-base text-wuub-gray dark:text-wuub-white/70">
          {b2b.intro}
        </p>
        <ul className="mt-6 space-y-3 text-sm text-wuub-black/90 dark:text-wuub-white/80">
          {b2b.benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-2xl bg-wuub-orange/10 px-4 py-3 text-left text-sm text-wuub-black dark:bg-wuub-white/10 dark:text-wuub-white"
            >
              {benefit}
            </li>
          ))}
        </ul>
        <Button
          asChild
          size="lg"
          className="mt-8"
          aria-label={b2b.contactCta}
        >
          <Link href={`/${locale}/contact`}>{b2b.contactCta}</Link>
        </Button>
      </article>
    </div>
  );
};

export default B2BPage;

