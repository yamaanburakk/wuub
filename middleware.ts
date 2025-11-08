import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/lib/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(tr|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};

