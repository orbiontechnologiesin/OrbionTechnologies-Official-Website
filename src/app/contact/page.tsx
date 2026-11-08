import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCategories } from "@/components/contact/ContactCategories";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactFounders } from "@/components/contact/ContactFounders";
import { ContactClosingCTA } from "@/components/contact/ContactClosingCTA";

export const metadata: Metadata = {
  title: "Contact Us | Orbion Technologies",
  description:
    "Contact Orbion Technologies for software engineering, custom applications, AI integrations, business automation, and technology partnerships.",
  openGraph: {
    title: "Contact Us | Orbion Technologies",
    description:
      "Contact Orbion Technologies for software engineering, custom applications, AI integrations, business automation, and technology partnerships.",
    url: "https://orbiontechnologies.in/contact",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        <ContactHero />
        <ContactCategories />
        <ContactForm />
        <ContactInfo />
        <ContactFounders />
        <ContactClosingCTA />
      </main>
      <Footer />
    </>
  );
}

