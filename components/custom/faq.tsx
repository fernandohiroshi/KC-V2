import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useTranslations } from 'next-intl';

const FAQ = () => {
  const t = useTranslations('FAQSection');
  const faqs = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up mb-12 md:mb-24">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-start space-y-4">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {t('label')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            {t('title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl pl-2">
            {t('description')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-background rounded-2xl border shadow-sm md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b last:border-b-0 transition-all duration-300 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left hover:text-purple-500 data-[state=open]:text-purple-500 hover:no-underline p-4 text-base font-medium transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed p-4 text-base transition-colors duration-200">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-start pt-8">
          <p className="text-muted-foreground mb-2">
            {t('ctaTitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('ctaDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
