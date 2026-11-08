import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutMotto } from "@/components/about/AboutMotto";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutVision } from "@/components/about/AboutVision";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutClosingCTA } from "@/components/about/AboutClosingCTA";

export const metadata: Metadata = {
  title: "About Us | Orbion Technologies",
  description:
    "Discover Orbion Technologies, our story, mission, vision, values, and the people engineering what's next.",
  openGraph: {
    title: "About Us | Orbion Technologies",
    description:
      "Discover Orbion Technologies, our story, mission, vision, values, and the people engineering what's next.",
    url: "https://orbiontechnologies.in/about",
    siteName: "Orbion Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/Mockups/orbion-navbar-preview.png",
        width: 2400,
        height: 760,
        alt: "About Orbion Technologies — Engineering What's Next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Orbion Technologies",
    description:
      "Discover Orbion Technologies, our story, mission, vision, values, and the people engineering what's next.",
    images: ["/brand/Mockups/orbion-navbar-preview.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      {/* SHARED NAVIGATION */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 01 — ABOUT US HERO */}
        <AboutHero />

        {/* SECTION 02 — OUR STORY */}
        <AboutStory />

        {/* SECTION 03 — OUR MOTTO */}
        <AboutMotto />

        {/* SECTION 04 — OUR MISSION */}
        <AboutMission />

        {/* SECTION 05 — OUR VISION */}
        <AboutVision />

        {/* SECTION 06 — OUR PHILOSOPHY AND VALUES */}
        <AboutValues />

        {/* SECTION 07 — LEADERSHIP */}
        <AboutLeadership />

        {/* SECTION 08 — CLOSING STATEMENT */}
        <AboutClosingCTA />
      </main>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
}

