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
  const pricing = messages.pricing;

  return buildMetadata({
    locale,
    title: pricing.title,
    description: pricing.subtitle,
    path: getLocalizedPath(locale, "pricing"),
  });
}

const PricingPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const pricing = messages.pricing;

  return (
    <div className="flex flex-col gap-12 px-4 sm:px-0 lg:min-h-[calc(100vh-220px)] lg:justify-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
            {pricing.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-wuub-gray dark:text-wuub-white/70">
            {pricing.subtitle}
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className="flex h-full flex-col rounded-3xl border border-wuub-black/10 bg-white p-5 sm:p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-wuub-white/15 dark:bg-wuub-black/60"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-wuub-orange">
                  {plan.name}
                </span>
                <span className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
                  {plan.price}
                </span>
                <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
                  {plan.description}
                </p>
              </div>
              <ul className="mt-4 flex flex-1 flex-col space-y-2 text-sm text-wuub-black/80 dark:text-wuub-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-wuub-orange/10 px-3 py-2 text-left text-sm text-wuub-black dark:bg-wuub-white/10 dark:text-wuub-white">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="lg"
                className="mt-6"
                aria-label={pricing.cta}
              >
                {pricing.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

