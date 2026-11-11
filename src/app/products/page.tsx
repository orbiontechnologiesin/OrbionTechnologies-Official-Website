import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductFlipStack } from "@/components/products/ProductFlipStack";
import { ProductsCollection } from "@/components/products/ProductsCollection";
import { ProductsApproach } from "@/components/products/ProductsApproach";
import { ProductsClosingCTA } from "@/components/products/ProductsClosingCTA";

export const metadata: Metadata = {
  title: "Products | Orbion Technologies",
  description:
    "Explore the upcoming software products from Orbion Technologies, spanning business management, artificial intelligence, document intelligence, scheduling, and data analytics.",
  openGraph: {
    title: "Products | Orbion Technologies",
    description:
      "Explore the upcoming software products from Orbion Technologies, spanning business management, artificial intelligence, document intelligence, scheduling, and data analytics.",
    url: "https://orbiontechnologies.in/products",
    siteName: "Orbion Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/Mockups/orbion-navbar-preview.png",
        width: 2400,
        height: 760,
        alt: "Orbion Technologies Product Ecosystem — Coming Soon.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Orbion Technologies",
    description:
      "Explore the upcoming software products from Orbion Technologies, spanning business management, artificial intelligence, document intelligence, scheduling, and data analytics.",
    images: ["/brand/Mockups/orbion-navbar-preview.png"],
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      {/* SHARED NAVIGATION */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 01 — PRODUCTS HERO */}
        <ProductsHero />

        {/* SECTION 02 — CASE STUDY FLIP STACK PRODUCT SHOWCASE */}
        <ProductFlipStack />

        {/* SECTION 03 — COMPACT PRODUCT DIRECTORY & ROADMAP */}
        <ProductsCollection />

        {/* SECTION 04 — OUR ENGINEERING APPROACH */}
        <ProductsApproach />

        {/* SECTION 05 — CLOSING STATEMENT */}
        <ProductsClosingCTA />
      </main>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
}
