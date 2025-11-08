import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/request";
import { buildMetadata, getLocalizedPath } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  const messages = (await getMessages()) as unknown as Messages;
  const reviews = messages.reviews;

  return buildMetadata({
    locale,
    title: reviews.title,
    description: reviews.subtitle,
    path: getLocalizedPath(locale, "reviews"),
  });
}

const ReviewsPage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  const reviews = messages.reviews;
  type Testimonial = {
    quote: string;
    name: string;
    role: string;
    highlight?: string;
  };

  const primaryTestimonials = (messages.testimonials?.items ?? []) as Testimonial[];
  const reviewTestimonials = (reviews.testimonials ?? []) as Testimonial[];
  const combined: Testimonial[] = [
    ...primaryTestimonials,
    ...reviewTestimonials.filter(
      (item) =>
        !primaryTestimonials.some(
          (p) => p.name === item.name && p.quote === item.quote && p.role === item.role
        )
    ),
  ];

  return (
    <section className="space-y-12 rounded-3xl border border-wuub-black/10 bg-white/95 px-6 py-12 text-left shadow-lg shadow-wuub-orange/10 dark:border-wuub-white/15 dark:bg-[#141417] sm:px-10 md:px-12 md:py-16">
      <FadeIn className="space-y-4 text-center sm:text-left">
        <h1 className="text-4xl font-semibold text-wuub-black dark:text-wuub-white">
          {reviews.title}
        </h1>
        <p className="text-base text-wuub-gray dark:text-wuub-white/70">
          {reviews.subtitle}
        </p>
      </FadeIn>
      <FadeIn delay={0.1} className="grid gap-4 sm:grid-cols-3">
        {reviews.stats?.map((stat: { value: string; label: string }) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-wuub-black/10 bg-white/90 px-5 py-4 text-left shadow-sm dark:border-wuub-white/10 dark:bg-[#18181d]"
          >
            <span className="text-3xl font-semibold text-wuub-orange">
              {stat.value}
            </span>
            <p className="mt-1 text-xs uppercase tracking-wide text-wuub-gray dark:text-wuub-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2">
        {combined.map((testimonial, index) => (
            <FadeIn
              key={`${testimonial.name}-${testimonial.role}-${index}`}
              delay={0.1 + index * 0.08}
              className="flex h-full flex-col gap-5 rounded-3xl border border-wuub-black/10 bg-white/90 p-6 shadow-md transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#18181d]"
            >
              <p className="text-sm text-wuub-black/80 italic leading-relaxed dark:text-wuub-white">
                “{testimonial.quote}”
              </p>
              {testimonial.highlight ? (
                <p className="rounded-2xl border border-wuub-orange/30 bg-wuub-orange/10 px-3 py-2 text-xs font-medium text-wuub-orange dark:border-wuub-orange/40 dark:text-wuub-orange/80">
                  {testimonial.highlight}
                </p>
              ) : null}
              <div>
                <p className="text-sm font-semibold text-wuub-black dark:text-wuub-white">
                  {testimonial.name}
                </p>
                <p className="text-xs uppercase tracking-wide text-wuub-gray dark:text-wuub-white/60">
                  {testimonial.role}
                </p>
              </div>
            </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.2} className="rounded-3xl border border-dashed border-wuub-orange/40 bg-wuub-orange/10 p-6 text-center dark:border-wuub-orange/60 dark:bg-wuub-orange/20">
        <h2 className="text-2xl font-semibold text-wuub-black dark:text-wuub-white">
          {reviews.cta.title}
        </h2>
        <p className="mt-2 text-sm text-wuub-gray dark:text-wuub-white/70">
          {reviews.cta.description}
        </p>
        <Button
          asChild
          size="lg"
          variant="primary"
          className="mt-4 inline-flex items-center gap-2"
        >
          <a href={`mailto:hello@wuub.com?subject=Wuub%20Deneyimim`}>
            {reviews.cta.button}
          </a>
        </Button>
      </FadeIn>
    </section>
  );
};

export default ReviewsPage;

