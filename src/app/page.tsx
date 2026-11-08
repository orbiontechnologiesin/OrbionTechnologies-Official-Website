import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Capabilities } from "@/components/home/Capabilities";
import { Approach } from "@/components/home/Approach";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      {/* SECTION 1 — NAVIGATION */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 2 — HERO */}
        <Hero />

        {/* SECTION 3 — INTRODUCTION TO ORBION */}
        <Introduction />

        {/* SECTION 4 — WHAT WE DO */}
        <Capabilities />

        {/* SECTION 5 — OUR APPROACH */}
        <Approach />

        {/* SECTION 6 — ABOUT ORBION */}
        <AboutPreview />

        {/* SECTION 7 — CONTACT CTA */}
        <ContactCTA />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
