import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsApproach } from "@/components/solutions/SolutionsApproach";
import { SolutionsProblems } from "@/components/solutions/SolutionsProblems";
import { SolutionsMapping } from "@/components/solutions/SolutionsMapping";
import { SolutionsOutcomes } from "@/components/solutions/SolutionsOutcomes";
import { SolutionsPhilosophy } from "@/components/solutions/SolutionsPhilosophy";
import { SolutionsClosingCTA } from "@/components/solutions/SolutionsClosingCTA";

export const metadata: Metadata = {
  title: "Solutions | Orbion Technologies",
  description:
    "Explore how Orbion Technologies approaches business challenges through software engineering, intelligent systems, automation, and upcoming digital products.",
  openGraph: {
    title: "Solutions | Orbion Technologies",
    description:
      "Explore how Orbion Technologies approaches business challenges through software engineering, intelligent systems, automation, and upcoming digital products.",
    url: "https://orbiontechnologies.in/solutions",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        <SolutionsHero />
        <SolutionsApproach />
        <SolutionsProblems />
        <SolutionsMapping />
        <SolutionsOutcomes />
        <SolutionsPhilosophy />
        <SolutionsClosingCTA />
      </main>
      <Footer />
    </>
  );
}

