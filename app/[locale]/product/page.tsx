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
  const product = messages.product;

  return buildMetadata({
    locale,
    title: product.heroTitle,
    description: product.heroSubtitle,
    path: getLocalizedPath(locale, "product"),
  });
}

const ProductPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const product = messages.product;

  return (
    <article className="prose mx-auto w-full max-w-3xl px-4 sm:px-0">
      <header className="mb-10 space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
          {product.heroTitle}
        </h1>
        <p className="text-base text-wuub-gray dark:text-wuub-white/70">
          {product.heroSubtitle}
        </p>
      </header>
      <section className="mb-8 rounded-3xl border border-wuub-black/10 bg-white p-6 sm:p-8 dark:border-wuub-white/15 dark:bg-wuub-black/60">
        <h2 className="text-2xl font-semibold text-wuub-black dark:text-wuub-white">
          {product.specsTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-wuub-gray dark:text-wuub-white/70">
          {product.specs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-3xl border border-wuub-black/10 bg-white p-6 sm:p-8 dark:border-wuub-white/15 dark:bg-wuub-black/60">
        <h2 className="text-2xl font-semibold text-wuub-black dark:text-wuub-white">
          {product.careTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-wuub-gray dark:text-wuub-white/70">
          {product.careItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default ProductPage;

