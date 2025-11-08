import { FadeIn } from "@/components/animations/fade-in";
type ProblemSolutionProps = {
  label: string;
  heading: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  card: {
    title: string;
    description: string;
    tags: string[];
  };
};

export const ProblemSolution = ({
  label,
  heading,
  body,
  stats,
  card,
}: ProblemSolutionProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-white/95 px-6 py-12 shadow-lg shadow-wuub-orange/10 dark:border-wuub-white/15 dark:bg-[#141417] sm:px-10 md:px-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(246,77,6,0.18), transparent 55%)",
        }}
      />
      <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <FadeIn className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-wuub-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wuub-orange">
            {label}
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-wuub-black dark:text-wuub-white sm:text-4xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-base text-wuub-gray dark:text-wuub-white/70">
            {body}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <FadeIn
                key={stat.label}
                delay={0.2 + index * 0.08}
                className="rounded-3xl border border-wuub-black/10 bg-white/90 p-4 text-left shadow-sm transition hover:border-wuub-orange dark:border-wuub-white/10 dark:bg-[#16161a]"
              >
                <span className="text-2xl font-semibold text-wuub-orange">
                  {stat.value}
                </span>
                <p className="mt-1 text-xs uppercase tracking-wide text-wuub-gray dark:text-wuub-white/60">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn
          delay={0.2}
          className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-gradient-to-br from-wuub-black via-[#1d1d20] to-wuub-orange/40 p-8 text-left text-wuub-white shadow-2xl dark:border-wuub-white/5"
        >
          <div className="absolute inset-0 opacity-40">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 55%)",
              }}
            />
          </div>
          <div className="relative flex flex-col gap-4">
            <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-wuub-white/80">
              {card.title}
            </span>
            <p className="text-base leading-relaxed text-wuub-white/90">
              {card.description}
            </p>
            {card.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-wide text-wuub-white/60">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

