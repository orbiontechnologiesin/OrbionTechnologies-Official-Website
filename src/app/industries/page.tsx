import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { IndustriesList } from "@/components/industries/IndustriesList";
import { IndustriesConnected } from "@/components/industries/IndustriesConnected";
import { IndustriesApproach } from "@/components/industries/IndustriesApproach";
import { IndustriesEnablement } from "@/components/industries/IndustriesEnablement";
import { IndustriesClosingCTA } from "@/components/industries/IndustriesClosingCTA";

export const metadata: Metadata = {
  title: "Industries | Orbion Technologies",
  description:
    "Explore the industries Orbion Technologies focuses on, from business services and retail to healthcare, fitness, restaurants, education, and intelligent business operations.",
  openGraph: {
    title: "Industries | Orbion Technologies",
    description:
      "Explore the industries Orbion Technologies focuses on, from business services and retail to healthcare, fitness, restaurants, education, and intelligent business operations.",
    url: "https://orbiontechnologies.in/industries",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        <IndustriesHero />
        <IndustriesList />
        <IndustriesConnected />
        <IndustriesApproach />
        <IndustriesEnablement />
        <IndustriesClosingCTA />
      </main>
      <Footer />
    </>
  );
}

