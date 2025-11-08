import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/request";
import { buildMetadata, getLocalizedPath } from "@/lib/seo";

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
  const content = messages.howItWorksPage;

  return buildMetadata({
    locale,
    title: content.title,
    description: content.intro,
    path: getLocalizedPath(locale, "how-it-works"),
  });
}

const HowItWorksPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const content = messages.howItWorksPage;

  return (
    <article className="prose mx-auto w-full max-w-3xl px-4 sm:px-0">
      <header className="mb-8 space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
          {content.title}
        </h1>
        <p className="text-base text-wuub-gray dark:text-wuub-white/70">
          {content.intro}
        </p>
      </header>
      <ol className="space-y-6">
        {content.stages.map((stage) => (
          <li
            key={stage.title}
            className="rounded-3xl border border-wuub-black/10 bg-white p-5 sm:p-6 dark:border-wuub-white/15 dark:bg-wuub-black/60"
          >
            <h2 className="text-2xl font-semibold text-wuub-black dark:text-wuub-white">
              {stage.title}
            </h2>
            <p className="mt-3 text-sm text-wuub-gray dark:text-wuub-white/70">
              {stage.description}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-wuub-gray dark:text-wuub-white/70">
        {content.outro}
      </p>
    </article>
  );
};

export default HowItWorksPage;

