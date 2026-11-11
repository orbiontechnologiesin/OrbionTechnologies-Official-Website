import { Suspense } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://orbiontechnologies.in"),
  title: "Orbion Technologies | Engineering What's Next.",
  description:
    "Orbion Technologies is an early-stage technology and deep-tech startup building intelligent software solutions, workflow automation systems, and an AI Operating System for modern businesses.",
  keywords: [
    "Orbion Technologies",
    "AI Operating System",
    "Intelligent Software",
    "Workflow Automation",
    "Autonomous Agents",
    "Model Context Protocol",
    "Deep Tech Startup",
  ],
  authors: [{ name: "Orbion Technologies" }],
  creator: "Orbion Technologies",
  publisher: "Orbion Technologies",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/brand/PNG Images/orbion-favicon.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "Orbion Technologies | Engineering What's Next.",
    description:
      "Orbion Technologies is building intelligent software solutions, workflow automation, and an AI Operating System for modern enterprises.",
    url: "https://orbiontechnologies.in",
    siteName: "Orbion Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/Mockups/orbion-navbar-preview.png",
        width: 2400,
        height: 760,
        alt: "Orbion Technologies — Engineering What's Next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbion Technologies | Engineering What's Next.",
    description:
      "Building intelligent software solutions, workflow automation systems, and an AI Operating System for modern enterprises.",
    images: ["/brand/Mockups/orbion-navbar-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-limestone-light text-graphite">
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
