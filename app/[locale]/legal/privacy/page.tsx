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
  const content = messages.legal.privacy;

  return buildMetadata({
    locale,
    title: content.title,
    description: content.intro,
    path: getLocalizedPath(locale, "legal/privacy"),
  });
}

const PrivacyPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const content = messages.legal.privacy;

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
            ? "Wuub, iletişim formu ve sipariş işlemleri sırasında paylaştığınız verileri GDPR ve KVKK uyumlu olarak işler. Veriler; destek talepleri, ürün teslimatı ve kampanya duyuruları amacıyla sınırlı süre saklanır."
            : "Wuub processes information shared through contact forms and orders under GDPR-compliant procedures. Data is stored for support, fulfillment, and carefully curated product updates only."}
        </p>
        <p>
          {locale === "tr"
            ? "Veri silme talebiniz için her zaman contact@wuub.com adresine ulaşabilirsiniz. Talepler 72 saat içinde yanıtlanır."
            : "To request removal, message contact@wuub.com and we will confirm within 72 hours."}
        </p>
      </section>
    </article>
  );
};

export default PrivacyPage;

