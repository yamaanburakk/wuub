import { FadeIn } from "@/components/animations/fade-in";
type HowItWorksProps = {
  heading: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export const HowItWorksSteps = ({ heading, steps }: HowItWorksProps) => {
  return (
    <section className="rounded-3xl border border-wuub-black/10 bg-white/95 px-6 py-12 shadow-lg shadow-wuub-orange/10 dark:border-wuub-white/15 dark:bg-[#141417] sm:px-10 md:px-12 md:py-16">
      <div className="flex flex-col gap-6">
        <FadeIn>
          <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white sm:text-4xl">
            {heading}
          </h2>
        </FadeIn>
        <ol className="relative grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn
              key={step.title}
              delay={index * 0.1}
              className="relative overflow-hidden rounded-3xl border border-wuub-black/10 bg-white/90 p-6 shadow-md transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#17171b]"
            >
              <div className="pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full bg-wuub-orange/10 blur-2xl" />
              <div className="relative flex flex-col gap-4">
                <span className="h-12 w-12 rounded-2xl bg-wuub-orange/15 text-center text-sm font-semibold leading-[3rem] text-wuub-orange shadow-inner shadow-wuub-orange/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-wuub-black dark:text-wuub-white">
                  {step.title}
                </h3>
                <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
};

