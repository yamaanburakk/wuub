import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

type HeroProps = {
  locale: Locale;
  data: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    highlight: string;
    highlights?: string[];
    metrics?: Array<{ value: string; label: string }>;
  };
};

export const Hero = ({ locale, data }: HeroProps) => {
  const highlightList = data.highlights ?? [];
  const metrics = data.metrics ?? [];
  const corporateLabel =
    locale === "tr" ? "Kurumsal teklif planlayın" : "Plan a corporate rollout";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-gradient-to-br from-wuub-white via-wuub-white/90 to-wuub-orange/15 px-5 py-16 shadow-xl shadow-wuub-orange/10 dark:border-wuub-white/10 dark:from-[#161619] dark:via-[#131316] dark:to-wuub-orange/25 sm:px-12 md:py-20">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-wuub-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center">
        <FadeIn className="flex flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-wuub-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wuub-orange">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {locale === "tr" ? "Wuub — Ergonomi & Tasarım" : "Wuub — Ergonomics & Design"}
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-wuub-black dark:text-wuub-white sm:text-5xl">
              {data.title}
            </h1>
            <p className="max-w-xl text-lg text-wuub-gray dark:text-wuub-white/70">
              {data.subtitle}
            </p>
          </div>
          {highlightList.length > 0 ? (
            <ul className="grid gap-3 text-sm text-wuub-black/80 dark:text-wuub-white/80 sm:grid-cols-2">
              {highlightList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-2xl border border-wuub-black/10 bg-white/80 p-3 backdrop-blur dark:border-wuub-white/10 dark:bg-[#17171b]"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-wuub-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              aria-label={data.primaryCta}
            >
              <Link href={`/${locale}/pricing`}>
                {data.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              aria-label={data.secondaryCta}
            >
              <Link href={`/${locale}/how-it-works`}>{data.secondaryCta}</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-wuub-black/70 dark:text-wuub-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-wuub-orange" />
            <Link
              href={`/${locale}/b2b`}
              className="inline-flex items-center gap-1 font-medium text-wuub-orange transition hover:text-wuub-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2"
            >
              {corporateLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          {metrics.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric, index) => (
                <FadeIn
                  key={metric.label}
                  delay={0.4 + index * 0.08}
                  className="rounded-2xl border border-wuub-black/10 bg-white/80 px-4 py-3 text-left shadow-sm transition hover:border-wuub-orange dark:border-wuub-white/10 dark:bg-[#17171b]"
                >
                  <span className="text-2xl font-semibold text-wuub-orange">
                    {metric.value}
                  </span>
                  <p className="text-xs uppercase tracking-wide text-wuub-gray dark:text-wuub-white/60">
                    {metric.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          ) : null}
        </FadeIn>
        <FadeIn
          delay={0.2}
          className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-gradient-to-br from-wuub-black via-[#1d1d20] to-wuub-orange/50 p-8 text-wuub-white shadow-2xl dark:border-wuub-white/5"
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 55%)",
              }}
            />
          </div>
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {locale === "tr" ? "Wuub bilek desteği" : "Wuub wrist rest"}
              </p>
              <p className="text-2xl font-semibold leading-tight">
                {locale === "tr"
                  ? "Reaktif yüzey, kaygan taban, yıkanabilir ped."
                  : "Reactive surface, gliding base, washable cushion."}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-white/80">{data.highlight}</p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-white/60">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {locale === "tr" ? "Tasarım araştırması" : "Design research"}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {locale === "tr"
                    ? "TPE + PTFE kompozit"
                    : "TPE + PTFE composite"}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {locale === "tr" ? "Modüler ped" : "Modular cushion"}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

