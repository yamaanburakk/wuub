import { FadeIn } from "@/components/animations/fade-in";
type ComparisonTableProps = {
  heading: string;
  featureLabel: string;
  columns: {
    standard: string;
    wuub: string;
  };
  rows: Array<{
    label: string;
    standard: string;
    wuub: string;
  }>;
};

export const ComparisonTable = ({
  heading,
  featureLabel,
  columns,
  rows,
}: ComparisonTableProps) => {
  return (
    <section className="flex flex-col gap-6">
      <FadeIn>
        <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
          {heading}
        </h2>
      </FadeIn>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((row, index) => (
          <FadeIn
            key={row.label}
            delay={index * 0.08}
            className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-wuub-black/10 bg-white/90 p-6 shadow-md transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#17171b]"
          >
            <div className="pointer-events-none absolute -right-12 top-12 h-32 w-32 rounded-full bg-wuub-orange/15 blur-2xl" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-wide text-wuub-gray dark:text-wuub-white/60">
                {featureLabel}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-wuub-black dark:text-wuub-white">
                {row.label}
              </h3>
            </div>
            <div className="relative grid gap-3 rounded-2xl border border-wuub-black/10 bg-white/80 p-4 dark:border-wuub-white/10 dark:bg-[#1a1a1f]">
              <div className="rounded-2xl border border-wuub-black/10 bg-white/90 p-3 text-sm text-wuub-gray dark:border-wuub-white/10 dark:bg-[#1d1d21] dark:text-wuub-white/70">
                <span className="text-xs font-semibold uppercase tracking-wide text-wuub-gray dark:text-wuub-white/50">
                  {columns.standard}
                </span>
                <p className="mt-2 leading-relaxed">{row.standard}</p>
              </div>
              <div className="rounded-2xl border border-wuub-orange/50 bg-wuub-orange/10 p-3 text-sm font-semibold text-wuub-black dark:border-wuub-orange/60 dark:text-wuub-white">
                <span className="text-xs font-semibold uppercase tracking-wide text-wuub-orange">
                  {columns.wuub}
                </span>
                <p className="mt-2 leading-relaxed text-wuub-black dark:text-wuub-white">
                  {row.wuub}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

