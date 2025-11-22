import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { VideoPlayer } from "@/components/video-player";

type PageProps = {
  params: { locale: string };
};

const HomePage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  return <VideoPlayer locale={locale} />;
};

export default HomePage;
