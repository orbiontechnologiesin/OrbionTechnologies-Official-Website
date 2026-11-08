import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesTechStack } from "@/components/services/ServicesTechStack";
import { ServicesWhyUs } from "@/components/services/ServicesWhyUs";
import { ServicesProjectTypes } from "@/components/services/ServicesProjectTypes";
import { ServicesClosingCTA } from "@/components/services/ServicesClosingCTA";

export const metadata: Metadata = {
  title: "Services | Orbion Technologies",
  description:
    "Explore Orbion Technologies' software engineering, website development, AI integration, automation, UI/UX design, and system integration services.",
  openGraph: {
    title: "Services | Orbion Technologies",
    description:
      "Explore Orbion Technologies' software engineering, website development, AI integration, automation, UI/UX design, and system integration services.",
    url: "https://orbiontechnologies.in/services",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        <ServicesHero />
        <ServicesList />
        <ServicesProcess />
        <ServicesTechStack />
        <ServicesWhyUs />
        <ServicesProjectTypes />
        <ServicesClosingCTA />
      </main>
      <Footer />
    </>
  );
}

