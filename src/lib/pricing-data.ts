export interface PricingProduct {
  id: string;
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  plannedAreas: string[];
  status: "COMING SOON";
  pricingStatus: "PRICING COMING SOON";
}

export const PRICING_PRODUCTS: PricingProduct[] = [
  {
    id: "orbion-crm",
    slug: "orbion-crm",
    number: "01",
    name: "Orbion CRM",
    category: "Customer Relationship Management",
    description:
      "An upcoming customer relationship management platform envisioned to help businesses organize leads, contacts, sales opportunities, and customer follow-ups.",
    plannedAreas: [
      "Lead management.",
      "Contact management.",
      "Sales pipeline.",
      "Follow-up tasks.",
      "Customer activity.",
      "Business overview.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-ai-chatbot",
    slug: "orbion-ai-chatbot",
    number: "02",
    name: "Orbion AI Chatbot",
    category: "Artificial Intelligence / Conversational Automation",
    description:
      "An upcoming AI-powered conversational solution designed to help businesses make information accessible and automate common customer enquiries.",
    plannedAreas: [
      "AI-powered conversations.",
      "Knowledge-based responses.",
      "Document and FAQ ingestion.",
      "Enquiry capture.",
      "Human handoff.",
      "Conversation analytics.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-bookings",
    slug: "orbion-bookings",
    number: "03",
    name: "Orbion Bookings",
    category: "Appointment Scheduling",
    description:
      "An upcoming booking and scheduling platform envisioned to help businesses organize services, staff availability, appointments, and reservations.",
    plannedAreas: [
      "Business profiles.",
      "Service management.",
      "Staff management.",
      "Availability.",
      "Online booking.",
      "Administrative calendar.",
      "Notifications.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-fit",
    slug: "orbion-fit",
    number: "04",
    name: "Orbion Fit",
    category: "Fitness and Gym Management",
    description:
      "An upcoming fitness management solution envisioned to help gyms organize memberships, plans, attendance, and renewals.",
    plannedAreas: [
      "Member management.",
      "Membership plans.",
      "Payment status tracking.",
      "Attendance records.",
      "Membership renewals.",
      "Business overview.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-dine",
    slug: "orbion-dine",
    number: "05",
    name: "Orbion Dine",
    category: "Restaurant Management",
    description:
      "An upcoming restaurant technology solution envisioned to help restaurants organize digital menus, ordering workflows, order status, and basic table operations.",
    plannedAreas: [
      "Digital menus.",
      "QR-based ordering.",
      "Order management.",
      "Order status.",
      "Table workflows.",
      "Menu administration.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-docs",
    slug: "orbion-docs",
    number: "06",
    name: "Orbion Docs",
    category: "Document Intelligence",
    description:
      "An upcoming document intelligence solution envisioned to help businesses process documents, extract selected information, and organize it into structured data.",
    plannedAreas: [
      "PDF and image uploads.",
      "Document processing.",
      "AI-assisted extraction.",
      "Source previews.",
      "Manual corrections.",
      "CSV export.",
      "Processing status.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
  {
    id: "orbion-insights",
    slug: "orbion-insights",
    number: "07",
    name: "Orbion Insights",
    category: "Business Analytics and Data Intelligence",
    description:
      "An upcoming analytics solution envisioned to help businesses organize data, understand important metrics, and generate useful reports.",
    plannedAreas: [
      "CSV imports.",
      "Data preparation.",
      "Key performance indicators.",
      "Interactive charts.",
      "Date filters.",
      "Exportable reports.",
      "Business summaries.",
    ],
    status: "COMING SOON",
    pricingStatus: "PRICING COMING SOON",
  },
];

export const PRICING_COPY = {
  unauthenticated: {
    eyebrow: "ORBION TECHNOLOGIES / PRICING",
    headline: "The right plan starts with the right possibilities.",
    description:
      "Explore the upcoming pricing structure for the Orbion product ecosystem. Sign in to access the members-only pricing area.",
    cardTitle: "Pricing is reserved for registered users.",
    cardDescription:
      "Log in to explore the upcoming pricing information for Orbion's software products.",
    primaryCta: "Log In to View Pricing",
    secondaryCta: "Explore Our Products",
  },
  authenticated: {
    eyebrow: "ORBION TECHNOLOGIES / PRICING PREVIEW",
    statusBadge: "ACCESS GRANTED — PRICING INFORMATION COMING SOON",
    headline: "Clarity today. Pricing when we're ready.",
    description:
      "Explore the upcoming Orbion product ecosystem. We're working towards building software that addresses meaningful business needs, with pricing to be announced as each product takes shape.",
    statusTitle: "PRICING COMING SOON",
    statusMessage:
      "We're currently developing the Orbion product ecosystem. Our pricing structure will be announced once the products are ready and their features and plans have been finalized.",
  },
  announcement: {
    headline: "We're building before we price.",
    description:
      "We believe pricing should reflect the real capabilities and value of a product. We're focusing on building and refining the Orbion product ecosystem before announcing its plans.",
  },
};

