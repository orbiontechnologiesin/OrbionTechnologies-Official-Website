"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export interface ContactCategoryItem {
  id: string;
  number: string;
  title: string;
  description: string;
  subjectValue: string;
}

export const CONTACT_CATEGORIES: ContactCategoryItem[] = [
  {
    id: "software-development",
    number: "01",
    title: "Software Development",
    description: "Websites, web applications, and custom digital solutions engineered for reliability, speed, and business outcomes.",
    subjectValue: "Custom Software Development",
  },
  {
    id: "ai-intelligent-systems",
    number: "02",
    title: "AI & Intelligent Systems",
    description: "AI-powered applications, knowledge retrieval (RAG) pipelines, and intelligent workflows tailored to proprietary data.",
    subjectValue: "AI Development & Integration",
  },
  {
    id: "business-automation",
    number: "03",
    title: "Business Automation",
    description: "Streamlining repetitive processes, connecting multi-service APIs, and improving operational efficiency across your business.",
    subjectValue: "Business Automation",
  },
  {
    id: "partnerships-collaboration",
    number: "04",
    title: "Partnerships & Collaboration",
    description: "Exploring opportunities to co-engineer software, strategic technology partnerships, or research initiatives.",
    subjectValue: "Collaboration / Partnership",
  },
];

interface ContactCategoriesProps {
  onSelectCategory?: (subject: string) => void;
}

export function ContactCategories({ onSelectCategory }: ContactCategoriesProps) {
  const handleCategoryClick = (subjectValue: string) => {
    if (onSelectCategory) {
      onSelectCategory(subjectValue);
    }
    const formEl = document.getElementById("contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              AREAS OF ENGAGEMENT
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              What can we help you build?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              Whether you need end-to-end digital engineering or guidance on intelligent automation, here are the primary ways we collaborate.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.subjectValue)}
              className="p-6 sm:p-7 rounded-3xl bg-pure-white border border-graphite/10 hover:border-petrol hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-copper">
                    {cat.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-graphite/20 group-hover:bg-copper transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-graphite group-hover:text-petrol transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-graphite/10 flex items-center justify-between text-xs font-semibold text-petrol group-hover:translate-x-1 transition-transform">
                <span>Select this focus &darr;</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
