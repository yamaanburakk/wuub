import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

type CtaBannerProps = {
  locale: Locale;
  data: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export const CTABanner = ({ locale, data }: CtaBannerProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-wuub-orange/40 bg-gradient-to-br from-wuub-orange via-[#f05916] to-wuub-orange/90 px-6 py-12 text-center text-wuub-white shadow-2xl shadow-wuub-orange/30 sm:px-10 md:px-16 md:py-16">
      <div className="pointer-events-none absolute -left-24 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#ff8b42]/20 blur-3xl" />
      <FadeIn>
        <h2 className="relative text-3xl font-semibold sm:text-4xl">
          {data.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-base text-wuub-white/80">
          {data.subtitle}
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="bg-wuub-white text-wuub-black hover:bg-wuub-white/90"
            aria-label={data.primaryCta}
          >
            <Link href={`/${locale}/pricing`}>
              {data.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-wuub-white hover:bg-wuub-white/20"
            aria-label={data.secondaryCta}
          >
            <Link href={`/${locale}/b2b`}>{data.secondaryCta}</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
};

