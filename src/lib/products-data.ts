export interface Product {
  id: string;
  number: string;
  name: string;
  category: string;
  categoryGroup: "Business Operations" | "Artificial Intelligence" | "Data Intelligence";
  tagline: string;
  shortDescription: string;
  plannedCapabilities: string[];
  status: "COMING SOON";
}

export const PRODUCTS: Product[] = [
  {
    id: "orbion-crm",
    number: "01",
    name: "Orbion CRM",
    category: "Business Management / CRM",
    categoryGroup: "Business Operations",
    tagline: "Relationships, organized.",
    shortDescription:
      "Bring your customer relationships, leads, and business workflows together in one organized workspace.",
    plannedCapabilities: [
      "Lead management and qualification",
      "Unified contact and account directory",
      "Visual sales pipeline tracking",
      "Follow-up tasks and automated reminders",
      "Customer interaction history and activity records",
      "Executive business overview and operational reporting",
      "Deterministic CSV data export",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-ai-chatbot",
    number: "02",
    name: "Orbion AI Chatbot",
    category: "Artificial Intelligence / Customer Support Automation",
    categoryGroup: "Artificial Intelligence",
    tagline: "Conversations, made intelligent.",
    shortDescription:
      "An intelligent conversational experience designed to help businesses respond, assist, and engage more effectively.",
    plannedCapabilities: [
      "AI-powered website conversations with latency control",
      "Answers strictly grounded in approved FAQs and documents",
      "Knowledge base ingestion and continuous indexing",
      "Structured customer enquiry and lead capture",
      "Seamless human operator handoff mechanism",
      "Conversation telemetry and resolution analytics",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-bookings",
    number: "03",
    name: "Orbion Bookings",
    category: "Scheduling / Appointment Management",
    categoryGroup: "Business Operations",
    tagline: "Time, better organized.",
    shortDescription:
      "Make scheduling simpler with an organized approach to appointments, availability, and reservations.",
    plannedCapabilities: [
      "Customizable business profiles and service catalogues",
      "Multi-staff scheduling and roster allocation",
      "Real-time availability and buffer management",
      "Direct client-facing online booking portals",
      "Centralized administrative calendar dashboard",
      "Automated booking confirmations and cancellation notices",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-fit",
    number: "04",
    name: "Orbion Fit",
    category: "Fitness / Gym Management",
    categoryGroup: "Business Operations",
    tagline: "Built around better fitness management.",
    shortDescription:
      "A simpler way for fitness businesses to organize memberships, attendance, and everyday operations.",
    plannedCapabilities: [
      "Comprehensive member profiles and contact records",
      "Flexible membership plans and subscription tiers",
      "Payment status tracking and dues ledger",
      "Daily check-in and attendance log records",
      "Automated membership renewal alerts",
      "Facility capacity overview and management summaries",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-dine",
    number: "05",
    name: "Orbion Dine",
    category: "Restaurant Management / Digital Ordering",
    categoryGroup: "Business Operations",
    tagline: "Restaurant experiences, reimagined.",
    shortDescription:
      "Bringing menus, digital ordering, and restaurant workflows into a more organized experience.",
    plannedCapabilities: [
      "Interactive digital menus with instant item updates",
      "Contactless QR-based table ordering",
      "Live order status and prep queue coordination",
      "Visual floor plan and table workflow tracking",
      "Centralized menu administration and price control",
      "Comprehensive restaurant order log and daily receipts",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-docs",
    number: "06",
    name: "Orbion Docs",
    category: "Document Intelligence / AI Automation",
    categoryGroup: "Artificial Intelligence",
    tagline: "Documents into intelligence.",
    shortDescription:
      "Turn unstructured documents into organized, usable information through intelligent document processing.",
    plannedCapabilities: [
      "Multi-format PDF, scans, and image ingestion",
      "Automated document classification and pre-processing",
      "AI-assisted semantic information extraction",
      "Structured key-value field extraction into typed schemas",
      "Split-screen source document preview and verification",
      "Manual human correction and review workflow",
      "Verified CSV / JSON data export",
      "Real-time processing queue status tracking",
    ],
    status: "COMING SOON",
  },
  {
    id: "orbion-insights",
    number: "07",
    name: "Orbion Insights",
    category: "Business Analytics / Data Intelligence",
    categoryGroup: "Data Intelligence",
    tagline: "Clarity through data.",
    shortDescription:
      "Make business data easier to understand through meaningful metrics, visualizations, and reports.",
    plannedCapabilities: [
      "Seamless CSV and tabular data ingestion",
      "Automated data cleaning and schema inference",
      "Key performance indicator (KPI) metric generation",
      "Clean, interactive charts and distribution visualizers",
      "Dynamic date-range and dimension filtering",
      "One-click exportable business summary reports",
      "Operational performance summaries and anomaly flags",
    ],
    status: "COMING SOON",
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Business Operations",
  "Artificial Intelligence",
  "Data Intelligence",
] as const;

