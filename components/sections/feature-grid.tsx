import {
  Brain,
  CircleDot,
  Droplet,
  MousePointer2,
  ShieldCheck,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FeatureGridProps = {
  heading: string;
  subheading: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

export const FeatureGrid = ({ heading, subheading, items }: FeatureGridProps) => {
  const icons = [Brain, Droplet, MousePointer2, CircleDot, ShieldCheck];

  return (
    <section className="flex flex-col gap-8">
      <FadeIn className="flex flex-col gap-3 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
          {heading}
        </h2>
        <p className="text-sm text-wuub-gray dark:text-wuub-white/70">
          {subheading}
        </p>
      </FadeIn>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <FadeIn
              key={item.title}
              delay={index * 0.1}
              className="h-full"
            >
              <Card className="group h-full border border-wuub-black/10 bg-white/90 p-6 shadow-md backdrop-blur transition hover:-translate-y-1 hover:border-wuub-orange hover:shadow-xl dark:border-wuub-white/10 dark:bg-[#17171b]">
                <CardHeader className="mb-6 flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-wuub-orange/30 bg-wuub-orange/15 text-wuub-orange transition group-hover:bg-wuub-orange group-hover:text-wuub-white dark:border-wuub-orange/40">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

