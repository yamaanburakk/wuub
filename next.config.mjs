import createNextIntlPlugin from "next-intl/plugin";

if (typeof process !== "undefined") {
  process.env.NEXT_FONT_IGNORE_FETCH_ERRORS = "1";
}

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl(nextConfig);

