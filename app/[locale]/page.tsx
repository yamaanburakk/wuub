import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/request";
import { CTABanner } from "@/components/sections/cta-banner";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { FAQ } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSteps } from "@/components/sections/how-it-works";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";

type PageProps = {
  params: { locale: string };
};

const HomePage = async ({ params }: PageProps) => {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await getMessages()) as unknown as Messages;
  if (!messages) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <Hero locale={locale} data={messages.hero} />
      <ProblemSolution
        label={messages.problemSolution.label}
        heading={messages.problemSolution.heading}
        body={messages.problemSolution.body}
        stats={messages.problemSolution.stats}
        card={messages.problemSolution.card}
      />
      <FeatureGrid
        heading={messages.featureGrid.heading}
        subheading={messages.featureGrid.subheading}
        items={messages.featureGrid.items}
      />
      <HowItWorksSteps
        heading={messages.howItWorks.heading}
        steps={messages.howItWorks.steps}
      />
      <ComparisonTable
        heading={messages.comparison.heading}
        featureLabel={messages.comparison.featureLabel}
        columns={messages.comparison.columns}
        rows={messages.comparison.rows}
      />
      <UseCases
        heading={messages.useCases.heading}
        description={messages.useCases.description}
        items={messages.useCases.items}
      />
      <Testimonials
        heading={messages.testimonials.heading}
        description={messages.testimonials.description}
        items={messages.testimonials.items}
        reviewsPath={`/${locale}/reviews`}
      />
      <FAQ heading={messages.faq.heading} items={messages.faq.items} />
      <CTABanner locale={locale} data={messages.ctaBanner} />
    </div>
  );
};

export default HomePage;

