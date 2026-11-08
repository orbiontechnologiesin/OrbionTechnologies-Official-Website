import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServerSession } from "@/lib/auth";
import { PricingLoggedOut } from "@/components/pricing/PricingLoggedOut";
import { PricingLoggedIn } from "@/components/pricing/PricingLoggedIn";

export const metadata: Metadata = {
  title: "Pricing | Orbion Technologies",
  description:
    "Explore the upcoming pricing information for Orbion Technologies' software products.",
  openGraph: {
    title: "Pricing | Orbion Technologies",
    description:
      "Explore the upcoming pricing information for Orbion Technologies' software products.",
    url: "https://orbiontechnologies.in/pricing",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default async function PricingPage() {
  const session = await getServerSession();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        {session ? (
          <PricingLoggedIn session={session} />
        ) : (
          <PricingLoggedOut />
        )}
      </main>
      <Footer />
    </>
  );
}

