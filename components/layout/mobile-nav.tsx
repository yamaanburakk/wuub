"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";

type MobileNavProps = {
  locale: Locale;
  links: Array<{ href: string; label: string }>;
  ctaLabel: string;
};

export const MobileNav = ({ locale, links, ctaLabel }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-none bg-wuub-black/95 text-wuub-white">
        <SheetHeader className="pb-4 text-left">
          <SheetTitle className="text-lg font-semibold">Wuub</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {links.map((link) => (
            <MobileLink key={link.href} href={link.href} onClick={handleClose}>
              {link.label}
            </MobileLink>
          ))}
          <Button
            asChild
            variant="primary"
            size="lg"
            className="mt-4"
            onClick={handleClose}
          >
            <Link href={`/${locale}/pricing`}>{ctaLabel}</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MobileLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="rounded-2xl px-4 py-3 text-base font-medium text-wuub-black transition hover:bg-wuub-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:text-wuub-white dark:hover:bg-wuub-white/10"
  >
    {children}
  </Link>
);

