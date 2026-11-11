"use client";

import React, { useMemo } from "react";
import { CaseStudyFlipStack, type CaseStudyFlipItem } from "@/components/ui/case-study-flip-stack";
import { ProductVisual } from "./ProductVisuals";

export function ProductFlipStack() {
  const stackItems: CaseStudyFlipItem[] = useMemo(() => {
    return [
      {
        id: "orbion-crm",
        number: "01",
        eyebrow: "Customer Relationship Management",
        title: "Orbion CRM",
        tagline: "Relationships, organized.",
        description:
          "Bring your customer relationships, leads, and business workflows together in one organized workspace.",
        status: "COMING SOON",
        solve:
          "Eliminates scattered notes, missed follow-ups, and fragmented lead tracking across disconnected inboxes and loose spreadsheets through unified pipeline visibility.",
        plannedCapabilities: [
          "Lead management and qualification",
          "Unified contact and account directory",
          "Visual sales pipeline tracking",
          "Follow-up tasks and automated reminders",
          "Customer interaction history and activity records",
          "Deterministic CSV data export",
        ],
        intendedUsers:
          "Growing businesses, sales teams, client managers, and commercial operations.",
        href: "/products/orbion-crm",
        ctaLabel: "Explore CRM Specification",
        background: "#14342B",
        foreground: "#FAF8F5",
        accentColor: "#C36B3B",
        visual: <ProductVisual productId="orbion-crm" />,
      },
      {
        id: "orbion-ai-chatbot",
        number: "02",
        eyebrow: "Artificial Intelligence",
        title: "Orbion AI Chatbot",
        tagline: "Conversations, made intelligent.",
        description:
          "An intelligent conversational platform designed to help businesses respond, assist, and engage more effectively.",
        status: "COMING SOON",
        solve:
          "Resolves customer response bottlenecks and ungrounded hallucinations by delivering answers strictly bounded by approved business documentation and verified knowledge bases.",
        plannedCapabilities: [
          "AI-powered website conversations with latency control",
          "Answers strictly grounded in approved FAQs and documents",
          "Knowledge base ingestion and continuous indexing",
          "Structured customer enquiry and lead capture",
          "Seamless human operator handoff mechanism",
          "Conversation telemetry and resolution analytics",
        ],
        intendedUsers:
          "Support teams, customer success, sales desks, and digital service businesses.",
        href: "/products/orbion-ai-chatbot",
        ctaLabel: "Explore Chatbot Specification",
        background: "#173C32",
        foreground: "#FAF8F5",
        accentColor: "#8C887B",
        visual: <ProductVisual productId="orbion-ai-chatbot" />,
      },
      {
        id: "orbion-bookings",
        number: "03",
        eyebrow: "Business Operations",
        title: "Orbion Bookings",
        tagline: "Time, better organized.",
        description:
          "Make scheduling simpler with an organized approach to appointments, availability, and reservations.",
        status: "COMING SOON",
        solve:
          "Prevents double bookings, calendar mismatches, manual confirmation calls, and fragmented scheduling friction that frustrate clients and consume staff hours.",
        plannedCapabilities: [
          "Customizable business profiles and service catalogues",
          "Multi-staff scheduling and roster allocation",
          "Real-time availability and buffer management",
          "Direct client-facing online booking portals",
          "Centralized administrative calendar dashboard",
          "Automated booking confirmations and notices",
        ],
        intendedUsers:
          "Consultancies, clinics, wellness practitioners, agencies, and professional services.",
        href: "/products/orbion-bookings",
        ctaLabel: "Explore Bookings Specification",
        background: "#102A22",
        foreground: "#FAF8F5",
        accentColor: "#E59866",
        visual: <ProductVisual productId="orbion-bookings" />,
      },
      {
        id: "orbion-fit",
        number: "04",
        eyebrow: "Fitness Management",
        title: "Orbion Fit",
        tagline: "Built around better fitness management.",
        description:
          "A simpler way for fitness businesses to organize memberships, attendance, and everyday operations.",
        status: "COMING SOON",
        solve:
          "Replaces paper registers and awkward renewal follow-ups with automated member check-ins, membership renewal alerts, and unified member profiles.",
        plannedCapabilities: [
          "Comprehensive member profiles and contact records",
          "Flexible membership plans and subscription tiers",
          "Payment status tracking and dues ledger",
          "Daily check-in and attendance log records",
          "Automated membership renewal alerts",
          "Facility capacity overview and management summaries",
        ],
        intendedUsers:
          "Gyms, fitness clubs, yoga studios, personal trainers, and athletic centers.",
        href: "/products/orbion-fit",
        ctaLabel: "Explore Fit Specification",
        background: "#1B3E35",
        foreground: "#FAF8F5",
        accentColor: "#52B788",
        visual: <ProductVisual productId="orbion-fit" />,
      },
      {
        id: "orbion-dine",
        number: "05",
        eyebrow: "Restaurant Technology",
        title: "Orbion Dine",
        tagline: "Restaurant experiences, reimagined.",
        description:
          "Bringing menus, digital ordering, and restaurant workflows into a more organized experience.",
        status: "COMING SOON",
        solve:
          "Eliminates ordering bottlenecks during peak hours, outdated physical menus, and kitchen miscommunication via contactless QR digital ordering and table flow tracking.",
        plannedCapabilities: [
          "Interactive digital menus with instant item updates",
          "Contactless QR-based table ordering",
          "Live order status and prep queue coordination",
          "Visual floor plan and table workflow tracking",
          "Centralized menu administration and price control",
          "Comprehensive restaurant order log and daily receipts",
        ],
        intendedUsers:
          "Restaurants, cafes, bistros, rooftop lounges, and hospitality operators.",
        href: "/products/orbion-dine",
        ctaLabel: "Explore Dine Specification",
        background: "#15342C",
        foreground: "#FAF8F5",
        accentColor: "#E67E22",
        visual: <ProductVisual productId="orbion-dine" />,
      },
      {
        id: "orbion-docs",
        number: "06",
        eyebrow: "Intelligent Document Processing",
        title: "Orbion Docs",
        tagline: "Documents into intelligence.",
        description:
          "Turn unstructured documents into organized, usable information through intelligent document processing.",
        status: "COMING SOON",
        solve:
          "Automates slow, error-prone manual data entry from complex PDF invoices, agreements, and forms into verified structured schemas with source citation previews.",
        plannedCapabilities: [
          "Multi-format PDF, scans, and image ingestion",
          "Automated document classification and pre-processing",
          "AI-assisted semantic information extraction",
          "Structured key-value field extraction into typed schemas",
          "Split-screen source document preview and verification",
          "Verified CSV / JSON data export",
        ],
        intendedUsers:
          "Operations teams, legal analysts, accounting departments, and enterprise back-offices.",
        href: "/products/orbion-docs",
        ctaLabel: "Explore Docs Specification",
        background: "#183636",
        foreground: "#FAF8F5",
        accentColor: "#70C1B3",
        visual: <ProductVisual productId="orbion-docs" />,
      },
      {
        id: "orbion-insights",
        number: "07",
        eyebrow: "Data Intelligence",
        title: "Orbion Insights",
        tagline: "Clarity through data.",
        description:
          "Make business data easier to understand through meaningful metrics, visualizations, and reports.",
        status: "COMING SOON",
        solve:
          "Transforms static, chaotic spreadsheet exports into clear visual dashboards, operational KPI monitors, and scheduled summary reports.",
        plannedCapabilities: [
          "Seamless CSV and tabular data ingestion",
          "Automated data cleaning and schema inference",
          "Key performance indicator (KPI) metric generation",
          "Clean, interactive charts and distribution visualizers",
          "Dynamic date-range and dimension filtering",
          "One-click exportable business summary reports",
        ],
        intendedUsers:
          "Founders, financial analysts, operations leaders, and business managers.",
        href: "/products/orbion-insights",
        ctaLabel: "Explore Insights Specification",
        background: "#0E231D",
        foreground: "#FAF8F5",
        accentColor: "#C36B3B",
        visual: <ProductVisual productId="orbion-insights" />,
      },
    ];
  }, []);

  return (
    <section className="bg-limestone-light border-b border-graphite/10 py-8 sm:py-12">
      <CaseStudyFlipStack
        items={stackItems}
        as="div"
        heading="Product Portfolio Showcase"
        subheading="Seven specialized software products currently in architectural design and engineering planning."
        hint="Scroll to advance through the product stack"
        showIntro={true}
        showOutro={false}
      />
    </section>
  );
}
