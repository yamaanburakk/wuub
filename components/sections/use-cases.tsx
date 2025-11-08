import { FadeIn } from "@/components/animations/fade-in";
type UseCasesProps = {
  heading: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

export const UseCases = ({ heading, description, items }: UseCasesProps) => {
  return (
    <section className="rounded-3xl border border-wuub-black/10 bg-gradient-to-br from-wuub-white via-wuub-white/95 to-wuub-orange/10 px-6 py-12 shadow-lg dark:border-wuub-white/15 dark:from-[#151518] dark:via-[#121214] dark:to-wuub-orange/25 sm:px-10 md:px-12">
      <FadeIn className="flex flex-col gap-4 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
          {heading}
        </h2>
        <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
          {description}
        </p>
      </FadeIn>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <FadeIn
            key={item.title}
            delay={index * 0.08}
            className="group flex h-full flex-col gap-4 rounded-3xl border border-wuub-black/10 bg-white/90 p-6 text-left shadow-md transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#17171b]"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-wuub-black dark:text-wuub-white">
                {item.title}
              </h3>
              <span className="rounded-full border border-wuub-orange/40 bg-wuub-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-wuub-orange">
                Wuub
              </span>
            </div>
            <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
              {item.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

