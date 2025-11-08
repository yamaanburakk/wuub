"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const NavLink = ({ href, children, className }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium text-wuub-black transition hover:bg-wuub-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:text-wuub-white dark:hover:bg-wuub-white/10 whitespace-nowrap",
        isActive &&
          "bg-wuub-black text-wuub-white dark:bg-wuub-white dark:text-wuub-black",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

