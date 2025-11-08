import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const content = messages.legal.terms;

  return buildMetadata({
    locale,
    title: content.title,
    description: content.intro,
    path: getLocalizedPath(locale, "legal/terms"),
  });
}

const TermsPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const content = messages.legal.terms;

  return (
    <article className="prose mx-auto w-full max-w-3xl">
      <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
        {content.title}
      </h1>
      <p className="mt-4 text-base text-wuub-gray dark:text-wuub-white/70">
        {content.intro}
      </p>
      <section className="mt-6 space-y-3 text-sm text-wuub-gray dark:text-wuub-white/70">
        <p>
          {locale === "tr"
            ? "Wuub ürünlerini kullandığınızda ergonomik destek ürünlerinin öneri niteliğinde olduğunu kabul etmiş olursunuz. Sağlık sorunlarınız için doktora danışmanız önerilir."
            : "By using Wuub products you acknowledge they provide ergonomic support only and are not a medical treatment. Consult healthcare professionals for medical conditions."}
        </p>
        <p>
          {locale === "tr"
            ? "Sitedeki fiyatlandırma ve kampanyalar önceden habersiz değiştirilebilir. Güncel bilgiler için resmi kanallarımızı takip edin."
            : "Pricing and promotions may change without prior notice. Please follow our official channels for the latest updates."}
        </p>
      </section>
    </article>
  );
};

export default TermsPage;

