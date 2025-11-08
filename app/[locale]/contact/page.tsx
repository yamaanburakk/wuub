import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { MapPin, Navigation } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/request";
import { buildMetadata, getLocalizedPath } from "@/lib/seo";
import { ContactForm } from "@/components/forms/contact-form";

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
  const contact = messages.contact;

  return buildMetadata({
    locale,
    title: contact.title,
    description: contact.subtitle,
    path: getLocalizedPath(locale, "contact"),
  });
}

const ContactPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const contact = messages.contact;
  const addressLines = contact.info.addressLines;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLines.join(" ")
  )}`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-white/95 px-6 py-12 shadow-lg shadow-wuub-orange/10 dark:border-wuub-white/15 dark:bg-[#161619] sm:px-10 md:px-12 md:py-16">
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-wuub-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-64 w-64 rounded-full bg-white/8 blur-2xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn className="space-y-8">
          <header className="space-y-3 text-center sm:text-left">
            <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
              {contact.title}
            </h1>
            <p className="text-base text-wuub-gray dark:text-wuub-white/70">
              {contact.subtitle}
            </p>
          </header>
          <ContactForm locale={locale} copy={contact.form} />
        </FadeIn>
        <FadeIn
          delay={0.15}
          className="flex flex-col justify-between gap-6 rounded-3xl border border-wuub-black/10 bg-white/90 p-6 shadow-md dark:border-wuub-white/10 dark:bg-[#17171b]"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-wuub-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wuub-orange">
              {contact.info.title}
            </span>
            <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
              {contact.info.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-wuub-black/10 bg-white/90 p-4 dark:border-wuub-white/10 dark:bg-[#1c1c20]">
              <MapPin className="mt-1 h-5 w-5 text-wuub-orange" aria-hidden="true" />
              <div className="text-sm text-wuub-black dark:text-wuub-white">
                <p className="font-semibold uppercase tracking-wide text-xs text-wuub-gray dark:text-wuub-white/60">
                  {contact.info.addressTitle}
                </p>
                <div className="mt-1 space-y-0.5">
                  {contact.info.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-wuub-orange/40 bg-wuub-orange/10 px-4 py-3 text-sm font-semibold text-wuub-orange transition hover:bg-wuub-orange hover:text-wuub-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {contact.info.mapCta}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactPage;

