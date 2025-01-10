import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqData = [
    {
      question: "What are the requirements to be listed on the rankings?",
      answer: "To be featured on our rankings, you need to have at least 1000 contributions to open source projects. This includes code commits, pull requests, issues, and documentation improvements. Quality of contributions is also considered in the ranking algorithm.",
    },
    {
      question: "How is the contribution score calculated?",
      answer: "Your contribution score is calculated based on several factors: number of merged pull requests (40%), code quality and impact (30%), documentation and community support (20%), and issue resolution (10%). Bonus points are awarded for maintaining popular repositories.",
    },
    {
      question: "How often are the rankings updated?",
      answer: "Rankings are updated in real-time as contributions are made and verified. However, the featured contributors on the main page are updated weekly to showcase consistent performers. Historical rankings are also maintained for transparency.",
    },
    {
      question: "Can I improve my ranking position?",
      answer: "Yes! You can improve your ranking by increasing quality contributions, maintaining active projects, helping other developers, and participating in community discussions. Focus on meaningful contributions rather than quantity alone.",
    },
    {
      question: "What types of contributions are counted?",
      answer: "We count various types of contributions including code commits, pull requests, documentation updates, issue reporting and resolution, code reviews, and community support. Each type has different weightage in the ranking algorithm.",
    },
    {
      question: "Is there a verification process for contributions?",
      answer: "Yes, we have an automated verification system that checks the authenticity and quality of contributions. This includes checking commit signatures, reviewing pull request quality, and validating contribution timestamps.",
    },
    {
      question: "What happens if I become inactive?",
      answer: "If you become inactive for more than 3 months, your ranking might be affected. However, your historical contributions are always preserved. You can always resume contributing to improve your ranking.",
    },
  ];

  return (
    <section id="faq" className="container py-24 sm:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Common questions about our ranking system and contribution requirements
        </p>
      </div>

      <div className="mx-auto max-w-3xl mt-8 space-y-4">
        <Accordion type="single" collapsible>
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
