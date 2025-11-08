import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wuub.com"),
  title: {
    default: "Wuub Ergonomic Wrist Rest",
    template: "%s | Wuub",
  },
  description:
    "Wuub wrist rest disperses pressure, reduces friction, and keeps your wrist comfortable all day.",
  keywords: [
    "Wuub",
    "ergonomic wrist rest",
    "mouse wrist support",
    "carpal tunnel relief",
  ],
  openGraph: {
    title: "Wuub Ergonomic Wrist Rest",
    description:
      "Smart comfort for your wrist. Wuub supports your wrist all day and helps reduce pain and fatigue.",
    type: "website",
    url: "https://www.wuub.com",
    siteName: "Wuub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wuub Ergonomic Wrist Rest",
    description:
      "Smart comfort for your wrist. Wuub supports your wrist all day and helps reduce pain and fatigue.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className="bg-wuub-white text-wuub-black font-sans antialiased dark:bg-wuub-black dark:text-wuub-white"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
