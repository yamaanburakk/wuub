import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

type FooterProps = {
  locale: Locale;
};

export const Footer = async ({ locale }: FooterProps) => {
  const footerT = await getTranslations({ locale, namespace: "footer" });
  const navT = await getTranslations({ locale, namespace: "navigation" });
  const addressLines = footerT.raw("addressLines") as string[];
  const currentYear = new Date().getFullYear();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLines.join(" ")
  )}`;

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-3xl border-t border-wuub-black/10 bg-[#101013] text-wuub-white dark:border-wuub-white/10">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-wuub-orange/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-wuub-orange/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wuub-orange">
                Wuub
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                (Buraya logo gelecek)
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                {footerT("tagline")}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-wuub-orange" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                    {footerT("addressTitle")}
                  </p>
                  <div className="mt-1 space-y-0.5 text-sm text-white/80">
                    {addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-wuub-orange transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {footerT("mapCta")}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-white">
                {navT("product")}
              </span>
              <Link
                href={`/${locale}/how-it-works`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {navT("howItWorks")}
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {navT("pricing")}
              </Link>
              <Link
                href={`/${locale}/product`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {navT("product")}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-white">
                {navT("legal")}
              </span>
              <Link
                href={`/${locale}/legal/privacy`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {footerT("links.privacy")}
              </Link>
              <Link
                href={`/${locale}/legal/terms`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {footerT("links.terms")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm text-white/70 transition hover:text-wuub-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
              >
                {footerT("links.contact")}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {currentYear} Wuub. {footerT("rights")}
          </span>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/legal/privacy`}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-wide text-white/80 transition hover:border-wuub-orange hover:bg-wuub-orange/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#101013]"
            >
              {footerT("links.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

