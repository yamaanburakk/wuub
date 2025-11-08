import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LangSwitcher } from "@/components/layout/lang-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

type NavbarProps = {
  locale: Locale;
};

export const Navbar = async ({ locale }: NavbarProps) => {
  const t = await getTranslations({ locale, namespace: "navigation" });

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/product`, label: t("product") },
    { href: `/${locale}/how-it-works`, label: t("howItWorks") },
    { href: `/${locale}/pricing`, label: t("pricing") },
    { href: `/${locale}/reviews`, label: t("reviews") },
    { href: `/${locale}/b2b`, label: t("b2b") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-wuub-black/5 bg-wuub-white/80 backdrop-blur-md transition-shadow duration-300 dark:border-wuub-white/10 dark:bg-wuub-black/70">
      <div className="flex w-full items-center gap-4 px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-1 items-center gap-3 lg:flex-[0_0_auto]">
          <Link
            href={`/${locale}`}
            className="hidden items-center gap-2 text-base font-semibold text-wuub-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:text-wuub-white lg:flex"
            aria-label="Wuub logo"
          >
            <span className="rounded-full bg-wuub-orange px-2 py-1 text-xs font-bold uppercase text-wuub-white">
              Wuub
            </span>
          </Link>
          <div className="lg:hidden">
            <MobileNav locale={locale} links={links} ctaLabel={t("pricing")} />
          </div>
        </div>
        <Link
          href={`/${locale}`}
          className="flex flex-1 items-center justify-center gap-2 text-base font-semibold text-wuub-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:text-wuub-white lg:hidden"
          aria-label="Wuub logo"
        >
          <span className="rounded-full bg-wuub-orange px-2 py-1 text-xs font-bold uppercase text-wuub-white">
            Wuub
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-4 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 lg:flex-[0_0_auto]">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href={`/${locale}/pricing`}>{t("pricing")}</Link>
          </Button>
          <Suspense fallback={null}>
            <LangSwitcher locale={locale} />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

