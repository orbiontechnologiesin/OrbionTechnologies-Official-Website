export interface SolutionCategory {
  id: string;
  number: string;
  title: string;
  badge: string;
  isUpcomingProduct: boolean;
  problem: {
    summary: string;
    points: string[];
  };
  whyItMatters: string;
  ourApproach: {
    summary: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    subSolutions?: {
      name: string;
      slug: string;
      tagline: string;
      description: string;
    }[];
  };
  intendedOutcomes: string[];
  relatedOffering: {
    type: "service" | "product" | "multi-product";
    label: string;
    statusNote?: string;
    links?: {
      name: string;
      href: string;
    }[];
  };
}

export const SOLUTIONS: SolutionCategory[] = [
  {
    id: "digital-presence",
    number: "01",
    title: "Digital Presence and Business Websites",
    badge: "Website & Digital Product Engineering",
    isUpcomingProduct: false,
    problem: {
      summary:
        "Many businesses still operate with limited, outdated, or poorly structured digital presences that do not reflect their capabilities.",
      points: [
        "Lack of a cohesive, modern business website",
        "Poor presentation of products, services, and core value",
        "Difficult navigation and confusing user journeys",
        "Interfaces that perform poorly on mobile devices and tablets",
        "Limited, friction-heavy ways for visitors to make inquiries",
        "Weak search visibility and slow page load speeds",
        "Disconnected digital customer touchpoints",
      ],
    },
    whyItMatters:
      "A business website is often the primary lens through which prospective clients discover, evaluate, and choose to interact with an organization. A confusing, outdated, or sluggish digital experience erodes credibility and makes it harder for visitors to take the next step.",
    ourApproach: {
      summary:
        "Orbion approaches website development as disciplined software engineering rather than superficial decoration:",
      points: [
        "Developing a deep understanding of the business model and target audience",
        "Designing clear, accessible, and intuitive user experiences",
        "Building responsive, high-performance web interfaces",
        "Architecting clean, maintainable, and modular codebases",
        "Implementing structured inquiry channels and lead workflows",
        "Applying technical SEO fundamentals and performance-conscious engineering",
      ],
    },
    solution: {
      title: "Business Websites & Digital Experiences",
      description:
        "We engineer tailored business websites, high-conversion landing pages, and interactive web experiences crafted to present organizations with authority, clarity, and technical excellence.",
    },
    intendedOutcomes: [
      "A clear, credible, and distinguished online business presence",
      "Compelling and structured presentation of products and services",
      "Intuitive navigation and reduced user friction",
      "Seamless and accessible inquiry opportunities for visitors",
      "Flawless responsiveness across desktop, tablet, and mobile devices",
      "A solid, extensible foundation for ongoing digital growth",
    ],
    relatedOffering: {
      type: "service",
      label: "Website & E-Commerce Engineering Service",
      statusNote: "Active Engineering Offering",
      links: [
        {
          name: "Explore Capabilities",
          href: "/#what-we-do",
        },
      ],
    },
  },
  {
    id: "customer-management",
    number: "02",
    title: "Disorganized Customer and Lead Management",
    badge: "Upcoming Product Direction",
    isUpcomingProduct: true,
    problem: {
      summary:
        "Businesses frequently manage inbound leads and customer relationships across fragmented spreadsheets, email threads, chat apps, and disparate tools.",
      points: [
        "Customer records scattered across personal inboxes and spreadsheets",
        "Inconsistent follow-up discipline leading to lost opportunities",
        "Difficulty tracking lead origin and qualification status",
        "Unclear sales pipeline stages and lack of deal visibility",
        "Limited historical visibility into past customer touchpoints",
        "Repetitive, manual administrative overhead",
      ],
    },
    whyItMatters:
      "When customer records are unorganized, team members struggle to maintain consistent communication, follow-up deadlines get missed, and leadership lacks reliable visibility into commercial opportunity progression.",
    ourApproach: {
      summary:
        "Orbion is exploring a calm, structured approach to relationship management centered on operational order:",
      points: [
        "Centralized, searchable customer and contact directories",
        "Structured lead qualification workflows from intake to deal",
        "Visual sales pipeline progression and stage gates",
        "Prioritized follow-up tasks and automated reminder cadence",
        "Chronological customer interaction activity logs",
        "Executive business overviews and deterministic data export",
      ],
    },
    solution: {
      title: "Orbion CRM",
      description:
        "An upcoming customer relationship management platform envisioned to bring leads, contacts, opportunities, and follow-up activities into one organized workspace.",
    },
    intendedOutcomes: [
      "Centrally organized and accessible customer records",
      "Transparent visibility into active sales opportunities",
      "Disciplined, systematic follow-up workflows",
      "Clear tracking of deal velocity and pipeline progression",
      "Substantial reduction in manual, scattered record-keeping",
    ],
    relatedOffering: {
      type: "product",
      label: "Orbion CRM — COMING SOON",
      statusNote: "Upcoming Software Product &bull; Pre-Release Specification",
      links: [
        {
          name: "Explore Product Concept",
          href: "/products/orbion-crm",
        },
      ],
    },
  },
  {
    id: "conversational-enquiries",
    number: "03",
    title: "Repetitive Customer Enquiries",
    badge: "Upcoming Product Direction",
    isUpcomingProduct: true,
    problem: {
      summary:
        "Businesses spend countless hours manually replying to identical, recurring inquiries regarding services, pricing, business hours, and operational policies.",
      points: [
        "Repetitive questions consuming valuable team bandwidth daily",
        "Delayed responses during off-hours causing prospect drop-off",
        "Scattered documentation resulting in inconsistent answers",
        "Difficulty making policy and service details accessible around the clock",
        "Manual, hit-or-miss lead capture during casual website visits",
      ],
    },
    whyItMatters:
      "Modern visitors expect instant, accurate answers. When inquiries stall in queues, prospects move on. Businesses need ways to make approved knowledge accessible 24/7 while preserving a reliable escalation path to human team members.",
    ourApproach: {
      summary:
        "Orbion is exploring an AI conversational architecture built around grounded verification rather than speculative generation:",
      points: [
        "Ingesting approved business documents, FAQs, and service guidelines",
        "Retrieval-augmented semantic matching bound strictly to source facts",
        "Natural intent recognition with transparent confidence boundaries",
        "Intelligent customer lead and inquiry detail capture",
        "Honest acknowledgment when information falls outside approved bounds",
        "Seamless escalation and context handoff to human operators",
      ],
    },
    solution: {
      title: "Orbion AI Chatbot",
      description:
        "An upcoming AI-powered conversational solution envisioned to help businesses make information more accessible and automate common inquiries reliably.",
    },
    intendedOutcomes: [
      "Instant, 24/7 access to verified business information",
      "Significant reduction in repetitive manual customer responses",
      "Structured, reliable lead capture and qualification",
      "Strict grounding in verified company policies without hallucinations",
      "A clear, contextual handoff to human operators when needed",
    ],
    relatedOffering: {
      type: "product",
      label: "Orbion AI Chatbot — COMING SOON",
      statusNote: "Upcoming Software Product &bull; Pre-Release Specification",
      links: [
        {
          name: "Explore Product Concept",
          href: "/products/orbion-ai-chatbot",
        },
      ],
    },
  },
  {
    id: "fragmented-operations",
    number: "04",
    title: "Fragmented Business Operations",
    badge: "Upcoming Product Direction",
    isUpcomingProduct: true,
    problem: {
      summary:
        "Specialized service and physical businesses manage core daily operations across disconnected tools, paper logs, and manual spreadsheets.",
      points: [
        "Manual appointment scheduling creating double-bookings and conflicts",
        "Disorganized member attendance logs and expiring subscription tracking",
        "Printed restaurant menus that cannot be updated dynamically",
        "Friction in table ordering and disjointed kitchen prep queues",
        "Lack of real-time operational status for service staff",
      ],
    },
    whyItMatters:
      "Generic enterprise platforms are often too rigid and complex for focused service businesses. Teams need purposeful, intuitive workflows tailored to their specific operational reality.",
    ourApproach: {
      summary:
        "Orbion is exploring dedicated software concepts for specific operational verticals rather than imposing one generic system:",
      points: [
        "Structuring business records around industry-specific operational flows",
        "Real-time state machines for scheduling availability and booking locks",
        "Streamlined reception check-ins and member lifecycle tracking",
        "Contactless QR table ordering with live kitchen prep synchronization",
        "Visual administrative calendars and floor management layouts",
      ],
    },
    solution: {
      title: "Vertical Operational Software Concepts",
      description:
        "We are developing three specialized product architectures tailored to specific operational disciplines: scheduling, fitness, and hospitality.",
      subSolutions: [
        {
          name: "Orbion Bookings",
          slug: "orbion-bookings",
          tagline: "Time, better organized.",
          description:
            "Upcoming scheduling solution to help service providers manage availability, staff rosters, appointments, and client booking records.",
        },
        {
          name: "Orbion Fit",
          slug: "orbion-fit",
          tagline: "Built around better fitness management.",
          description:
            "Upcoming fitness platform envisioned to help gyms organize members, membership plans, daily check-ins, dues, and renewals.",
        },
        {
          name: "Orbion Dine",
          slug: "orbion-dine",
          tagline: "Restaurant experiences, reimagined.",
          description:
            "Upcoming restaurant solution envisioned to organize digital menus, QR-based table ordering, kitchen queues, and floor workflows.",
        },
      ],
    },
    intendedOutcomes: [
      "Organized, accessible operational records tailored to specific industries",
      "Elimination of scheduling conflicts and double-booked client slots",
      "Clear visibility into member attendance and upcoming renewals",
      "Connected digital menu browsing and orderly kitchen order fulfillment",
      "Less reliance on disconnected paper slips and manual spreadsheets",
    ],
    relatedOffering: {
      type: "multi-product",
      label: "Orbion Bookings, Fit & Dine — COMING SOON",
      statusNote: "Upcoming Software Products &bull; Pre-Release Specifications",
      links: [
        { name: "Orbion Bookings Concept", href: "/products/orbion-bookings" },
        { name: "Orbion Fit Concept", href: "/products/orbion-fit" },
        { name: "Orbion Dine Concept", href: "/products/orbion-dine" },
      ],
    },
  },
  {
    id: "document-processing",
    number: "05",
    title: "Manual Document Processing",
    badge: "Upcoming Product Direction",
    isUpcomingProduct: true,
    problem: {
      summary:
        "Administrative, accounting, and operations teams spend substantial time manually transcribing numbers, dates, and tables from static documents into business systems.",
      points: [
        "Repetitive, error-prone manual data entry from paper or PDF files",
        "Vital transaction records locked inside invoices, receipts, and scans",
        "Severe review backlogs during high-volume month-end reconciliations",
        "Inconsistent data extraction quality and transcription mistakes",
        "Tedious spreadsheet reformatting required before records can be used",
      ],
    },
    whyItMatters:
      "When business data is trapped in unstructured documents, valuable knowledge remains inaccessible, finance workflows slow to a crawl, and skilled team members waste hours on mechanical copy-pasting.",
    ourApproach: {
      summary:
        "Orbion is exploring an AI-assisted document intelligence pipeline pairing automated entity extraction with mandatory human review:",
      points: [
        "Multi-format ingestion of PDFs, scans, and high-resolution images",
        "Automated image de-skewing, contrast normalization, and layout analysis",
        "Semantic AI field extraction for vendors, line items, taxes, and totals",
        "Split-screen source preview with visual bounding-box verification",
        "Human-in-the-loop validation interface for ambiguous fields",
        "Deterministic export into clean CSV and typed JSON formats",
      ],
    },
    solution: {
      title: "Orbion Docs",
      description:
        "An upcoming document intelligence solution envisioned to help businesses convert information from documents into structured, usable data with verified accuracy.",
    },
    intendedOutcomes: [
      "Substantial reduction in mechanical data transcription time",
      "Neatly organized, structured records extracted from unstructured files",
      "Fast, confidence-highlighted human verification workflows",
      "Reliable export pipelines directly compatible with internal databases",
      "Higher data fidelity and elimination of transcription errors",
    ],
    relatedOffering: {
      type: "product",
      label: "Orbion Docs — COMING SOON",
      statusNote: "Upcoming Software Product &bull; Pre-Release Specification",
      links: [
        {
          name: "Explore Product Concept",
          href: "/products/orbion-docs",
        },
      ],
    },
  },
  {
    id: "business-data-visibility",
    number: "06",
    title: "Limited Visibility into Business Data",
    badge: "Upcoming Product Direction",
    isUpcomingProduct: true,
    problem: {
      summary:
        "Businesses accumulate vast quantities of operational data across spreadsheets, yet struggle to transform raw numbers into clear, actionable understanding.",
      points: [
        "Critical commercial data scattered across multiple workbook versions",
        "Difficulty interpreting key performance metrics and baseline ratios",
        "Hours lost manually creating weekly and monthly management reports",
        "Lack of clean, readable data visualizations to spot operational patterns",
        "Difficulty comparing performance trends and seasonal anomalies",
        "Information that is theoretically stored, but practically unusable",
      ],
    },
    whyItMatters:
      "Data only creates value when it produces clarity. Without accessible visualization and automated metric calculations, leadership must rely on intuition and guesswork rather than factual operational evidence.",
    ourApproach: {
      summary:
        "Orbion is exploring an analytics approach centered on radical clarity, simplicity, and rapid reporting:",
      points: [
        "Frictionless CSV and tabular data file ingestion",
        "Automated data hygiene, column typing, and schema verification",
        "High-level Key Performance Indicator (KPI) metric cards",
        "Minimal, high-legibility time-series and categorical charts",
        "Dynamic temporal and category dimension filtering",
        "One-click generation of exportable executive summary reports",
      ],
    },
    solution: {
      title: "Orbion Insights",
      description:
        "An upcoming business analytics solution envisioned to help organizations understand their data through metrics, visualizations, and reports.",
    },
    intendedOutcomes: [
      "Instant, clear visibility into operational performance indicators",
      "Intuitive interpretation of core business trends and growth ratios",
      "Automated, publication-ready executive reporting",
      "Clear comparative overviews across weeks, months, and quarters",
      "Confident, evidence-based business discussions and strategic decisions",
    ],
    relatedOffering: {
      type: "product",
      label: "Orbion Insights — COMING SOON",
      statusNote: "Upcoming Software Product &bull; Pre-Release Specification",
      links: [
        {
          name: "Explore Product Concept",
          href: "/products/orbion-insights",
        },
      ],
    },
  },
];

export const PROBLEM_SOLUTION_MAPPING = [
  {
    problem: "Limited or outdated digital presence",
    solution: "Website & E-Commerce Engineering",
    type: "Engineering Service",
    href: "/#what-we-do",
    tag: "Active Offering",
  },
  {
    problem: "Disorganized customer records & lost leads",
    solution: "Orbion CRM",
    type: "Software Product",
    href: "/products/orbion-crm",
    tag: "Coming Soon",
  },
  {
    problem: "Repetitive customer inquiries & delay",
    solution: "Orbion AI Chatbot",
    type: "Software Product",
    href: "/products/orbion-ai-chatbot",
    tag: "Coming Soon",
  },
  {
    problem: "Appointment scheduling conflicts",
    solution: "Orbion Bookings",
    type: "Software Product",
    href: "/products/orbion-bookings",
    tag: "Coming Soon",
  },
  {
    problem: "Fitness business & membership administration",
    solution: "Orbion Fit",
    type: "Software Product",
    href: "/products/orbion-fit",
    tag: "Coming Soon",
  },
  {
    problem: "Restaurant ordering & menu workflows",
    solution: "Orbion Dine",
    type: "Software Product",
    href: "/products/orbion-dine",
    tag: "Coming Soon",
  },
  {
    problem: "Manual document data entry & processing",
    solution: "Orbion Docs",
    type: "Software Product",
    href: "/products/orbion-docs",
    tag: "Coming Soon",
  },
  {
    problem: "Limited visibility into business data",
    solution: "Orbion Insights",
    type: "Software Product",
    href: "/products/orbion-insights",
    tag: "Coming Soon",
  },
];

export const OUTCOME_PRINCIPLES = [
  {
    number: "01",
    title: "Greater Clarity",
    description:
      "Help businesses organize fragmented information and understand their operations with quiet confidence.",
  },
  {
    number: "02",
    title: "Simpler Workflows",
    description:
      "Reduce unnecessary friction, eliminate repetitive steps, and create calm, dependable daily routines.",
  },
  {
    number: "03",
    title: "Better Accessibility",
    description:
      "Ensure business information, client booking portals, and digital services are effortless to reach across any device.",
  },
  {
    number: "04",
    title: "More Structured Operations",
    description:
      "Unite related records, activities, and communication streams into cohesive, purposeful operational systems.",
  },
  {
    number: "05",
    title: "Room to Grow",
    description:
      "Engineer systems with maintainability, modularity, and future evolution at their architectural core.",
  },
];

export const TECHNOLOGY_PRINCIPLES = [
  {
    number: "01",
    title: "Purpose Before Technology",
    description:
      "We begin by deeply understanding what needs to change. Frameworks, models, and tools are chosen to serve the challenge, never the other way around.",
  },
  {
    number: "02",
    title: "Simplicity Before Complexity",
    description:
      "We value understandable architecture and maintainable code over elaborate abstractions. The most elegant solution is often the simplest one that works reliably.",
  },
  {
    number: "03",
    title: "Intelligence With Responsibility",
    description:
      "We apply AI where it provides genuine utility, insisting on factual grounding, data privacy, deterministic boundaries, and essential human oversight.",
  },
  {
    number: "04",
    title: "Engineering for Evolution",
    description:
      "Business needs shift and technologies advance. We build software systems designed to adapt gracefully rather than requiring total rewrites as needs expand.",
  },
];

