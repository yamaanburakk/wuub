import { FadeIn } from "@/components/animations/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqProps = {
  heading: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export const FAQ = ({ heading, items }: FaqProps) => {
  return (
    <section className="rounded-3xl border border-wuub-black/10 bg-white px-6 py-12 dark:border-wuub-white/15 dark:bg-wuub-black sm:px-10">
      <div className="flex flex-col gap-3">
        <FadeIn>
          <h2 className="text-3xl font-semibold text-wuub-black dark:text-wuub-white">
            {heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="mt-4">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
};

