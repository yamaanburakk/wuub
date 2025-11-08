import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type TestimonialsProps = {
  heading: string;
  description: string;
  items?: Testimonial[];
  reviewsPath?: string;
};

export const Testimonials = ({
  heading,
  description,
  items = [],
  reviewsPath,
}: TestimonialsProps) => {
  const hasItems = items.length > 0;

  return (
    <section className="rounded-3xl border border-wuub-black/10 bg-gradient-to-br from-wuub-white via-wuub-white to-wuub-orange/10 px-6 py-12 text-center shadow-lg dark:border-wuub-white/15 dark:bg-[#161619] dark:from-[#161619] dark:via-[#131316] dark:to-wuub-orange/20 sm:px-10 md:px-12 md:py-16">
      <FadeIn>
        <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-wuub-gray dark:text-wuub-white/70">
          {description}
        </p>
      </FadeIn>
      {reviewsPath ? (
        <FadeIn delay={0.05} className="mt-4 flex justify-center">
          <Link
            href={reviewsPath}
            className="inline-flex items-center gap-2 rounded-full border border-wuub-orange/30 bg-wuub-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-wuub-orange transition hover:bg-wuub-orange hover:text-wuub-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2"
          >
            {heading}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </FadeIn>
      ) : null}
      {hasItems ? (
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {items.map((testimonial, index) => (
            <FadeIn
              key={`${testimonial.name}-${testimonial.role}`}
              delay={index * 0.08}
              className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-wuub-black/10 bg-white/90 p-6 shadow-md transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#17171b]"
            >
              <p className="text-sm text-wuub-black/80 italic leading-relaxed dark:text-wuub-white">
                “{testimonial.quote}”
              </p>
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
      ) : null}
    </section>
  );
};

