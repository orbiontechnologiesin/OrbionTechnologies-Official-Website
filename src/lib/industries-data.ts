export interface IndustryItem {
  id: string;
  number: string;
  name: string;
  badge?: string;
  introduction: string;
  challenges: string[];
  approach: {
    summary: string;
    points: string[];
  };
  relevantOfferings: {
    name: string;
    type: "service" | "product";
    href: string;
    statusTag?: string;
  }[];
  intendedOutcomes: string[];
  transparencyNote?: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "sme",
    number: "01",
    name: "Small and Medium Businesses",
    badge: "CORE BUSINESS FOCUS",
    introduction:
      "Small and medium businesses are managing increasingly complex operations while striving to maintain a clear digital presence and build stronger customer relationships. Thoughtful engineering can help these businesses organize information, improve customer experiences, and simplify everyday processes.",
    challenges: [
      "Limited or outdated digital presence",
      "Disorganized customer and lead information",
      "Manual and paper-based business workflows",
      "Repetitive, time-consuming administrative tasks",
      "Difficulty organizing and interpreting business data",
      "Disconnected software tools and fragmented records",
    ],
    approach: {
      summary:
        "Orbion focuses on practical digital solutions and software engineering that help growing businesses improve how they operate:",
      points: [
        "Professional business websites engineered for speed and authority",
        "Responsive digital customer experiences tailored to target audiences",
        "Structured customer relationship management (CRM) concepts",
        "Business process automation to eliminate repetitive administration",
        "AI-assisted information access grounded in approved business facts",
        "Tabular data organization and executive summary reporting",
      ],
    },
    relevantOfferings: [
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "E-Commerce Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion CRM", type: "product", href: "/products/orbion-crm", statusTag: "COMING SOON" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
      { name: "Orbion Insights", type: "product", href: "/products/orbion-insights", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "A more professional, credible digital presence",
      "Centrally organized and accessible business information",
      "Structured lead tracking and consistent follow-ups",
      "Simpler, calmer daily operating workflows",
      "Clearer visibility into operational and commercial activity",
    ],
  },
  {
    id: "retail",
    number: "02",
    name: "Retail and E-Commerce",
    badge: "DIGITAL COMMERCE SECTOR",
    introduction:
      "Retail businesses operate through a dynamic combination of products, customers, transactions, inventory information, and digital experiences. A clear and accessible online presence is essential for businesses that want customers to discover, evaluate, and understand their offerings with ease.",
    challenges: [
      "Limited online visibility and weak digital discoverability",
      "Outdated, sluggish, or confusing storefront websites",
      "Difficult product presentation and unintuitive navigation",
      "Disconnected customer inquiries across scattered channels",
      "Manual order handling and repetitive inquiry coordination",
      "Limited access to organized business and sales metrics",
    ],
    approach: {
      summary:
        "We explore digital commerce experiences and software engineering designed to present products with clarity and streamline customer communication:",
      points: [
        "High-performance business websites and digital storefronts",
        "Responsive, categorized digital product catalogues",
        "Structured customer inquiry and pre-order workflows",
        "Performance-conscious web engineering with sub-second page loads",
        "Automated conversational inquiry handling for common store questions",
        "Data intelligence to help visualize sales trends and seasonal demand",
      ],
    },
    relevantOfferings: [
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "E-Commerce Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion CRM", type: "product", href: "/products/orbion-crm", statusTag: "COMING SOON" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
      { name: "Orbion Insights", type: "product", href: "/products/orbion-insights", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "Compelling, professional online product presentation",
      "A highly accessible digital storefront across all screen sizes",
      "Better-organized customer inquiries and lead capture",
      "Structured, repeatable digital shopping interactions",
      "A solid architectural foundation for future digital expansion",
    ],
    transparencyNote:
      "Orbion does not currently provide a complete retail ERP, warehouse inventory tracking, or direct credit card payment processing platform.",
  },
  {
    id: "healthcare",
    number: "03",
    name: "Healthcare and Appointment-Based Services",
    badge: "CLINICAL & WELLNESS SERVICES",
    introduction:
      "Healthcare providers, private practices, and appointment-based clinical services coordinate schedules, practitioner availability, service descriptions, and customer inquiries. Organizing these workflows creates a calmer, more dependable experience for both staff and visitors.",
    challenges: [
      "Manual appointment coordination via phone calls and messaging",
      "Scheduling conflicts, double bookings, and unclear buffer times",
      "Repetitive patient inquiries regarding hours, services, and policies",
      "Disorganized service listings and unclear practitioner availability",
      "Difficulty maintaining structured, auditable booking records",
      "Heavy front-desk administrative workload detracting from care",
    ],
    approach: {
      summary:
        "We explore digital experiences and scheduling systems focused on removing administrative friction without compromising privacy:",
      points: [
        "Clean, reassuring professional websites with clear practice details",
        "Organized service catalogues with explicit durations and prep notes",
        "Automated appointment scheduling workflows with double-booking prevention",
        "Real-time practitioner availability windows and buffer interval rules",
        "Grounded conversational assistance for routine hours and address inquiries",
        "Structured administrative calendar overviews for clinic staff",
      ],
    },
    relevantOfferings: [
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion Bookings", type: "product", href: "/products/orbion-bookings", statusTag: "COMING SOON" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "A clearer, trustworthy digital presence for the practice",
      "More organized appointment booking and cancellation workflows",
      "Frictionless client access to verified service information",
      "Substantially reduced administrative coordination at the reception desk",
    ],
    transparencyNote:
      "Orbion does not provide Electronic Health Records (EHR), medical diagnostic algorithms, clinical decision support, or certified healthcare software. Our AI tools do not provide medical advice.",
  },
  {
    id: "fitness",
    number: "04",
    name: "Fitness and Wellness",
    badge: "FACILITY & MEMBERSHIP SECTOR",
    introduction:
      "Gyms, fitness studios, and wellness centers manage recurring memberships, training tiers, attendance check-ins, subscription renewals, and ongoing client relationships. These operations require disciplined record-keeping to maintain facility capacity and business health.",
    challenges: [
      "Manual, paper-based membership registers and waiver files",
      "Difficulty tracking expiring memberships and initiating timely renewals",
      "Congested front-desk reception check-ins and unrecorded visits",
      "Ambiguous payment status and overdue subscription tracking",
      "Repetitive administrative bookkeeping taking time away from trainers",
      "Limited visibility into peak facility hours and retention metrics",
    ],
    approach: {
      summary:
        "We are exploring specialized software concepts designed to unite essential fitness operations into an intuitive digital experience:",
      points: [
        "Digital member profiles with emergency contacts and waiver histories",
        "Configurable membership tiers with clear renewal schedules",
        "Reception check-in logging to record daily facility entries",
        "Automated alerts for upcoming subscription expirations",
        "Executive overviews showing active member counts and facility traffic",
        "Integrated class booking and trainer appointment scheduling",
      ],
    },
    relevantOfferings: [
      { name: "Orbion Fit", type: "product", href: "/products/orbion-fit", statusTag: "COMING SOON" },
      { name: "Orbion Bookings", type: "product", href: "/products/orbion-bookings", statusTag: "COMING SOON" },
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
    ],
    intendedOutcomes: [
      "Centrally organized member profiles and plan records",
      "Structured, digital check-in records and visit histories",
      "Proactive renewal tracking that protects facility revenue",
      "Clear visibility into daily operational capacity and retention",
    ],
    transparencyNote:
      "Orbion Fit is currently an upcoming product concept under active architectural specification; it is not yet available for commercial gym deployment.",
  },
  {
    id: "restaurants",
    number: "05",
    name: "Restaurants and Food Services",
    badge: "HOSPITALITY SECTOR",
    introduction:
      "Restaurants, cafes, and food businesses coordinate fast-moving components: menus, dynamic ingredient availability, table seating, incoming customer orders, and kitchen preparation lines. Purposeful digital tools help eliminate ordering confusion and streamline service delivery.",
    challenges: [
      "Manual order taking prone to handwriting errors and miscommunication",
      "Outdated, difficult-to-update printed menus with static pricing",
      "Disconnected ordering processes between dining floor and kitchen line",
      "Unclear order status creating verbal check-in bottlenecks",
      "Difficult table turnover coordination during peak service hours",
      "Limited digital customer ordering experiences",
    ],
    approach: {
      summary:
        "We explore restaurant-focused digital interfaces and kitchen queue synchronization concepts:",
      points: [
        "Categorized digital menus with rich item descriptions and dietary tags",
        "Instant back-office menu administration to update prices or 86 sold-out items",
        "Contactless QR-based table ordering without mandatory mobile app downloads",
        "Real-time ticket dispatching directly to kitchen prep queues",
        "Visual order status tracking from received to ready to serve",
        "Floor plan table turnover status assisting waitstaff and hosts",
      ],
    },
    relevantOfferings: [
      { name: "Orbion Dine", type: "product", href: "/products/orbion-dine", statusTag: "COMING SOON" },
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "Organized, dynamically updated digital menu information",
      "An accessible, frictionless ordering experience for dining guests",
      "Structured, legible order routing that reduces kitchen mistakes",
      "Complete operational visibility into ticket prep status and table turns",
    ],
    transparencyNote:
      "Orbion Dine is an upcoming software concept. Orbion does not currently provide a legacy restaurant POS hardware suite, fiscal cash registers, or payment gateway acquiring.",
  },
  {
    id: "professional-services",
    number: "06",
    name: "Professional and Business Services",
    badge: "CONSULTING & ADVISORY SECTOR",
    introduction:
      "Consultancies, agencies, legal advisors, and corporate service firms depend on high-touch client relationships, scheduled consultations, structured inquiries, and organized administrative documentation. These organizations require systems that reflect their high professional standards.",
    challenges: [
      "Limited or generic online visibility that fails to articulate expertise",
      "Repetitive prospect inquiries regarding practice areas and pricing",
      "Manual appointment scheduling with frustrating email ping-pong",
      "Scattered client notes and account history across individual inboxes",
      "Difficult follow-up management and unmonitored proposal velocity",
      "Administrative complexity taking time away from billable client work",
    ],
    approach: {
      summary:
        "We explore authoritative web engineering and structured workflow systems tailored for professional client engagements:",
      points: [
        "Distinguished business websites that convey competence and technical depth",
        "Centralized lead and relationship management tracking deals from discovery to close",
        "Automated booking portals respecting consultation fees and prep buffers",
        "Grounded conversational agents handling routine intake and capability FAQs",
        "Chronological account activity logging and scheduled reminder tasks",
        "Tabular data intelligence to track practice growth and client engagement",
      ],
    },
    relevantOfferings: [
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion CRM", type: "product", href: "/products/orbion-crm", statusTag: "COMING SOON" },
      { name: "Orbion Bookings", type: "product", href: "/products/orbion-bookings", statusTag: "COMING SOON" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
      { name: "Orbion Insights", type: "product", href: "/products/orbion-insights", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "A distinguished, authoritative digital presence for the firm",
      "Structured, accessible customer relationship and proposal history",
      "Frictionless, conflict-free appointment scheduling for client consultations",
      "Instant access to verified service guidelines for prospective clients",
      "Clear, orderly administrative workflows that free up billable hours",
    ],
  },
  {
    id: "education",
    number: "07",
    name: "Education and Training",
    badge: "LEARNING & ACADEMIC SECTOR",
    introduction:
      "Educational institutions, coaching academies, and training organizations coordinate course syllabi, student admissions inquiries, intake schedules, and administrative records. A well-designed digital presence makes institutional knowledge accessible to applicants and students.",
    challenges: [
      "Limited, outdated digital presence failing to communicate program value",
      "Repetitive course syllabus, prerequisite, and admission fee inquiries",
      "Disorganized inquiry records resulting in lost enrollment opportunities",
      "Manual coordination for campus tours, counseling calls, and interviews",
      "Difficult access to course schedules and program requirements",
      "Fragmented administrative processes across disconnected spreadsheets",
    ],
    approach: {
      summary:
        "We explore accessible digital solutions and conversational automation designed to support educational organizations:",
      points: [
        "Modern educational websites presenting curriculum with clarity",
        "AI conversational assistants answering prospective applicant queries 24/7",
        "Strict grounding in approved course handbooks, fees, and admission terms",
        "Structured prospective student inquiry capture and qualification",
        "Automated scheduling for admissions counseling and faculty consultations",
        "Data intelligence to analyze inquiry volumes and enrollment trends",
      ],
    },
    relevantOfferings: [
      { name: "Educational Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
      { name: "Orbion AI Chatbot", type: "product", href: "/products/orbion-ai-chatbot", statusTag: "COMING SOON" },
      { name: "Orbion CRM", type: "product", href: "/products/orbion-crm", statusTag: "COMING SOON" },
      { name: "Orbion Bookings", type: "product", href: "/products/orbion-bookings", statusTag: "COMING SOON" },
      { name: "Orbion Insights", type: "product", href: "/products/orbion-insights", statusTag: "COMING SOON" },
    ],
    intendedOutcomes: [
      "Better, more engaging presentation of educational programs",
      "Instant access to verified admission details and course syllabi",
      "Structured inquiry management and organized prospective student logs",
      "Clear, orderly administrative coordination for counseling sessions",
    ],
    transparencyNote:
      "Orbion does not provide a complete Learning Management System (LMS), proctored examination platform, or university-scale Student Information System (SIS).",
  },
  {
    id: "document-operations",
    number: "08",
    name: "Document-Heavy Business Operations",
    badge: "OPERATIONAL & ADMINISTRATIVE SECTOR",
    introduction:
      "Many corporate departments, finance teams, logistics providers, and administrative offices work with large volumes of invoices, purchase orders, scanned records, forms, and PDFs. Manual transcription introduces severe backlogs, fatigue, and transcription errors.",
    challenges: [
      "Repetitive, mechanical data entry from static paper and PDF records",
      "Critical transaction information trapped inside scanned documents",
      "Costly manual document review backlogs during peak month-end cycles",
      "Inconsistent data extraction quality and transcription mistakes",
      "Difficulty mapping unstructured invoice fields into structured database schemas",
      "Hours lost compiling and formatting spreadsheet reports",
    ],
    approach: {
      summary:
        "We explore document intelligence and tabular data architectures pairing AI extraction with essential human validation:",
      points: [
        "Multi-format ingestion of single and multi-page PDFs, scans, and photos",
        "Automated layout parsing, orientation correction, and de-skewing",
        "Semantic AI entity extraction for invoice numbers, totals, line items, and dates",
        "Split-screen source document preview with visual bounding-box highlights",
        "Human-in-the-loop review interface to verify ambiguous fields",
        "Deterministic export into clean CSV and typed JSON database schemas",
      ],
    },
    relevantOfferings: [
      { name: "Orbion Docs", type: "product", href: "/products/orbion-docs", statusTag: "COMING SOON" },
      { name: "Orbion Insights", type: "product", href: "/products/orbion-insights", statusTag: "COMING SOON" },
      { name: "Business Website Development", type: "service", href: "/#what-we-do", statusTag: "Active Service" },
    ],
    intendedOutcomes: [
      "Structured, queryable digital records extracted from unstructured files",
      "Significant reduction in mechanical manual data transcription hours",
      "Confidence-weighted human verification workflows that ensure accuracy",
      "Clean, verified data exports ready for downstream business databases",
      "More accessible, automated operational reporting and metrics",
    ],
    transparencyNote:
      "Orbion does not provide certified accounting software, statutory tax filing, audit compliance, or financial advisory services.",
  },
];

export const CROSS_INDUSTRY_MAPPING = [
  {
    technology: "Website and e-commerce engineering",
    type: "Engineering Service",
    status: "Active Offering",
    relevantIndustries: [
      "Retail and E-Commerce",
      "Small and Medium Businesses",
      "Professional and Business Services",
      "Education and Training",
      "Restaurants and Food Services",
    ],
  },
  {
    technology: "Customer relationship management (CRM)",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: [
      "Small and Medium Businesses",
      "Retail and E-Commerce",
      "Education and Training",
      "Professional and Business Services",
    ],
  },
  {
    technology: "AI-assisted conversations",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: [
      "Small and Medium Businesses",
      "Education and Training",
      "Retail and E-Commerce",
      "Professional and Business Services",
    ],
  },
  {
    technology: "Appointment scheduling",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: [
      "Healthcare and Appointment-Based Services",
      "Fitness and Wellness",
      "Professional and Business Services",
    ],
  },
  {
    technology: "Membership management",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: ["Fitness and Wellness"],
  },
  {
    technology: "Digital ordering",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: ["Restaurants and Food Services"],
  },
  {
    technology: "Document intelligence",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: ["Document-Heavy Business Operations"],
  },
  {
    technology: "Data analytics",
    type: "Software Product",
    status: "COMING SOON",
    relevantIndustries: [
      "Small and Medium Businesses",
      "Retail and E-Commerce",
      "Operations and Business Services",
    ],
  },
];

export const INDUSTRY_ENGINEERING_PRINCIPLES = [
  {
    number: "01",
    title: "Understand the Industry",
    description:
      "Learn deeply about its specific workflows, regulatory requirements, practical constraints, and end users before writing architecture.",
  },
  {
    number: "02",
    title: "Identify the Real Problem",
    description:
      "Differentiate symptoms from causes. Understand precisely where information, processes, and customer touchpoints break down.",
  },
  {
    number: "03",
    title: "Select the Right Technology",
    description:
      "Apply software engineering, artificial intelligence, automation, or simpler digital tools strictly based on the real problem.",
  },
  {
    number: "04",
    title: "Build with Purpose",
    description:
      "Prioritize everyday usability, operational maintainability, verified reliability, and clean, transparent functionality.",
  },
  {
    number: "05",
    title: "Evolve with Changing Needs",
    description:
      "Continuously listen, measure, and refine as industry requirements shift and engineering capabilities advance.",
  },
];

export const INDUSTRY_ENABLEMENT_GOALS = [
  {
    title: "Better Digital Experiences",
    description:
      "Help businesses present their identity, capabilities, and offerings with clarity, distinction, and technical precision.",
  },
  {
    title: "More Organized Operations",
    description:
      "Bring scattered records, appointment rosters, and customer interactions into calm, structured operational systems.",
  },
  {
    title: "Accessible Intelligence",
    description:
      "Explore how artificial intelligence can make verified business information instantly accessible without hallucination.",
  },
  {
    title: "Connected Workflows",
    description:
      "Reduce unnecessary separation between related operational activities: from table QR ordering to kitchen prep, or inquiry to deal.",
  },
  {
    title: "Clearer Business Information",
    description:
      "Transform dense spreadsheets and unstructured documents into understandable metrics, actionable reports, and visible trends.",
  },
  {
    title: "Adaptable Technology",
    description:
      "Engineer software systems with modularity and extensibility at their core, capable of evolving gracefully as organizations expand.",
  },
];

