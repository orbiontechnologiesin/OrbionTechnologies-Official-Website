export interface FeatureItem {
  number: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface ProductDetail {
  slug: string;
  number: string;
  name: string;
  category: string;
  categoryGroup: "Business Operations" | "Artificial Intelligence" | "Data Intelligence";
  headline: string;
  supportingDescription: string;
  status: "COMING SOON" | "IN DEVELOPMENT" | "AVAILABLE";
  statusNotice: string;
  overview: {
    context: string[];
    envisagedSolution: string;
  };
  problems: {
    title: string;
    description: string;
  }[];
  audiences: {
    title: string;
    description: string;
  }[];
  audienceDisclaimer: string;
  features: FeatureItem[];
  workflow: {
    steps: WorkflowStep[];
    diagramType:
      | "crm-pipeline"
      | "chatbot-conversation"
      | "bookings-scheduling"
      | "fit-membership"
      | "dine-ordering"
      | "docs-extraction"
      | "insights-analytics";
    diagramCaption: string;
    workflowEmphasis?: string;
  };
  vision: {
    statement: string;
    narrative: string;
  };
  closing: {
    statement: string;
    subtext: string;
  };
  telemetry: {
    stage: string;
    architectureType: string;
    planningCycle: string;
  };
}

export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    slug: "orbion-crm",
    number: "01",
    name: "Orbion CRM",
    category: "Customer Relationship Management / Business Operations",
    categoryGroup: "Business Operations",
    headline: "Every relationship deserves a better system.",
    supportingDescription:
      "Orbion CRM is an upcoming customer relationship management platform designed to help businesses organize leads, manage customer relationships, track opportunities, and bring everyday sales activities into one structured workspace.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Many businesses manage customer information across disconnected spreadsheets, messaging apps, personal inboxes, and fragmented software tools.",
        "Without a cohesive system, critical operational questions become difficult to answer with confidence: Which leads require immediate attention? When was a key customer last contacted? Which opportunities are moving forward? What specific follow-up actions are needed today? And how are long-term customer relationships actually developing over time?",
      ],
      envisagedSolution:
        "Orbion CRM is being envisioned as a centralized, distraction-free workspace that brings these disparate activities into an orderly, structured operational system.",
    },
    problems: [
      {
        title: "Scattered Customer Information",
        description:
          "Vital contact history, notes, and account details remain trapped across personal inboxes, individual phones, and loose spreadsheets.",
      },
      {
        title: "Inconsistent Lead Follow-ups",
        description:
          "Opportunities slip through the cracks when there is no structured pipeline or clear accountability for next-step reminders.",
      },
      {
        title: "Difficulty Tracking Sales Opportunities",
        description:
          "Deal stages and commercial progress lack clear visibility, making revenue forecasting and pipeline planning unreliable.",
      },
      {
        title: "Lack of Visibility into Customer Activity",
        description:
          "Team members struggle to see past communication logs, previous touchpoints, and the overall trajectory of customer accounts.",
      },
      {
        title: "Repetitive Manual Business Administration",
        description:
          "Hours are lost manually copying information between disconnected tools instead of focusing on direct client relationships.",
      },
    ],
    audiences: [
      {
        title: "Small and Growing Businesses",
        description:
          "Organizations scaling beyond spreadsheets that require structured operational customer records without excessive enterprise complexity.",
      },
      {
        title: "Service-Based Businesses",
        description:
          "Agencies, consultancies, and independent service firms that depend on high-touch client relationships and diligent follow-ups.",
      },
      {
        title: "Sales and Business Development Teams",
        description:
          "Commercial representatives needing clear pipeline visibility, scheduled task reminders, and stage-by-stage opportunity progression.",
      },
      {
        title: "Coaching and Educational Businesses",
        description:
          "Advisors and learning institutions tracking prospect inquiries, student enrollments, and ongoing cohort communications.",
      },
      {
        title: "Businesses Needing Structured Lead Management",
        description:
          "Any team seeking to eliminate chaotic inboxes in favor of an organized, transparent system of record for inbound inquiries.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "Lead Management",
        description:
          "A structured place to record, categorize, qualify, and track potential customers from initial contact through evaluation.",
      },
      {
        number: "02",
        title: "Contact Management",
        description:
          "Maintain organized, searchable customer and contact directories with unified communication logs and account metadata.",
      },
      {
        number: "03",
        title: "Sales Pipeline",
        description:
          "Visualize commercial opportunities through clear, customizable deal stages to track deal velocity and progress.",
      },
      {
        number: "04",
        title: "Follow-up Management",
        description:
          "Organize time-sensitive tasks, scheduled reminders, and prioritized follow-up activities to maintain consistent engagement.",
      },
      {
        number: "05",
        title: "Customer Activity",
        description:
          "Keep track of relevant customer interactions, meeting notes, call summaries, and contextual status changes in chronological order.",
      },
      {
        number: "06",
        title: "Business Overview",
        description:
          "Provide leadership with a high-level operational view of new leads, pipeline health, and urgent business activities.",
      },
      {
        number: "07",
        title: "CSV Export",
        description:
          "Allow business records and customer datasets to be cleanly exported to standard CSV format for external analysis or compliance.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Add a New Lead",
          description:
            "Capture inbound interest with essential contact details and source attribution into the intake ledger.",
        },
        {
          step: "02",
          title: "Record Contact Information",
          description:
            "Enrich the lead record with organization name, direct communication channels, and initial contextual notes.",
        },
        {
          step: "03",
          title: "Assign a Pipeline Stage",
          description:
            "Place the deal within the visual sales pipeline based on qualification criteria and deal readiness.",
        },
        {
          step: "04",
          title: "Add Notes & Follow-up Tasks",
          description:
            "Set explicit follow-up deadlines, action items, and discussion summaries to ensure accountability.",
        },
        {
          step: "05",
          title: "Track Ongoing Progress",
          description:
            "Advance opportunities across qualification, proposal, and negotiation milestones as relationships mature.",
        },
        {
          step: "06",
          title: "Review Business Activity",
          description:
            "Inspect aggregate pipeline health, active accounts, and periodic commercial outcomes through the central overview.",
        },
      ],
      diagramType: "crm-pipeline",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "The proposed workflow prioritizes clarity and disciplined record-keeping over unnecessary administrative overhead.",
    },
    vision: {
      statement: "Make customer relationships easier to organize, understand, and manage.",
      narrative:
        "We believe business software should create order, not friction. Orbion CRM is being designed from first principles to provide teams with quiet confidence in their customer relationships — eliminating scattered notes, lost opportunities, and guesswork.",
    },
    closing: {
      statement: "Better relationships. More organized business.",
      subtext:
        "Orbion CRM is part of our upcoming suite of core business solutions, engineered to bring clarity to everyday operations.",
    },
    telemetry: {
      stage: "Active Specification & Prototype Research",
      architectureType: "Relational CRM Subsystem",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-ai-chatbot",
    number: "02",
    name: "Orbion AI Chatbot",
    category: "Artificial Intelligence / Conversational Automation",
    categoryGroup: "Artificial Intelligence",
    headline: "Make every conversation more intelligent.",
    supportingDescription:
      "Orbion AI Chatbot is an upcoming AI-powered conversational solution designed to help businesses respond to common questions, assist website visitors, and make business information more accessible.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Businesses regularly receive repetitive inquiries across their digital channels regarding service scopes, pricing parameters, standard operating hours, onboarding steps, and fundamental business information.",
        "Answering the same baseline questions manually over and over consumes hours of valuable team bandwidth, often causing response delays for prospective clients during critical decision windows.",
      ],
      envisagedSolution:
        "Orbion AI Chatbot is being envisioned to help organizations automate routine conversations with high fidelity, drawing strictly from their own curated and approved business documentation.",
    },
    problems: [
      {
        title: "Repetitive Customer Enquiries",
        description:
          "Staff members spend substantial time repeatedly typing identical answers to routine procedural and operational queries.",
      },
      {
        title: "Delayed Responses",
        description:
          "Visitors asking questions outside of standard office hours frequently experience lengthy response lag, leading to lost interest.",
      },
      {
        title: "Scattered Business Information",
        description:
          "Knowledge about services, policies, and pricing is often distributed across disorganized documents, resulting in inconsistent answers.",
      },
      {
        title: "Difficulty Making Info Available Consistently",
        description:
          "Ensuring every prospect receives identical, accurate, and approved corporate messaging is challenging across growing teams.",
      },
      {
        title: "Manual Lead Collection",
        description:
          "Gathering visitor contact details and qualification requirements during casual site visits is frequently overlooked or inconsistent.",
      },
    ],
    audiences: [
      {
        title: "Small and Medium-Sized Businesses",
        description:
          "Companies seeking around-the-clock conversational front-desk support without the overhead of 24/7 dedicated call centers.",
      },
      {
        title: "Professional Service Providers",
        description:
          "Firms that must clearly articulate consultation fees, scheduling prerequisites, and practice areas to prospective clients.",
      },
      {
        title: "Online and E-commerce Businesses",
        description:
          "Digital storefronts needing instant answers regarding shipping policies, return procedures, and product specifications.",
      },
      {
        title: "Educational & Training Organizations",
        description:
          "Institutions guiding applicants through course syllabi, admission deadlines, prerequisite requirements, and tuition structures.",
      },
      {
        title: "Businesses with Frequent Website Inquiries",
        description:
          "Any organization with high inbound inquiry volume that seeks to automate first-line customer assistance responsibly.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "AI-Powered Conversations",
        description:
          "A conversational interface engineered to parse natural inquiries, recognize intent, and synthesize coherent responses.",
      },
      {
        number: "02",
        title: "Knowledge-Based Responses",
        description:
          "Answers are strictly grounded in verified business FAQs, handbooks, and approved policy documents to prevent hallucination.",
      },
      {
        number: "03",
        title: "Document & Knowledge Ingestion",
        description:
          "Structured pipelines to upload PDFs, text guidelines, and website copy into an organized semantic retrieval index.",
      },
      {
        number: "04",
        title: "Lead Capture",
        description:
          "Intelligently captures contact details, intent summaries, and inquiry urgency when visitors express interest.",
      },
      {
        number: "05",
        title: "Human Handoff",
        description:
          "Seamless mechanism to escalate conversations to human operators when inquiries exceed automated confidence boundaries.",
      },
      {
        number: "06",
        title: "Conversation Analytics",
        description:
          "Provides management with visibility into top customer questions, unaddressed topics, and conversation resolution rates.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Supply Approved Information",
          description:
            "The business uploads approved service documentation, FAQs, pricing tables, and operational policies.",
        },
        {
          step: "02",
          title: "Prepare for Semantic Retrieval",
          description:
            "Content is processed, chunked, and indexed into a verifiable retrieval-augmented knowledge repository.",
        },
        {
          step: "03",
          title: "Visitor Asks a Question",
          description:
            "A prospective client or customer engages the conversational interface via natural language.",
        },
        {
          step: "04",
          title: "Grounded Answer Generation",
          description:
            "The system searches the approved corpus and constructs an accurate, context-bound answer with source attribution.",
        },
        {
          step: "05",
          title: "Acknowledge Limitations",
          description:
            "If an inquiry falls outside approved source knowledge, the system transparently declines rather than fabricating information.",
        },
        {
          step: "06",
          title: "Escalate to Human Operator",
          description:
            "Complex inquiries or qualified opportunities are packaged with conversation context and transferred to team members.",
        },
      ],
      diagramType: "chatbot-conversation",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "The intended approach prioritizes strictly grounded, verifiable answers rather than fabricated or speculative AI responses.",
    },
    vision: {
      statement: "Bring intelligent conversations closer to the businesses and people who need them.",
      narrative:
        "Conversational AI must be trustworthy before it can be truly useful. Orbion AI Chatbot is built around deterministic retrieval, transparent fallback handling, and seamless human partnership — delivering instant help without sacrificing truth.",
    },
    closing: {
      statement: "Less repetitive work. More meaningful conversations.",
      subtext:
        "Designed to elevate customer support from an administrative bottleneck into an always-on, intelligent asset.",
    },
    telemetry: {
      stage: "RAG Pipeline Benchmarking & Model Evaluation",
      architectureType: "Grounded Conversational Agent",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-bookings",
    number: "03",
    name: "Orbion Bookings",
    category: "Appointment Scheduling / Booking Management",
    categoryGroup: "Business Operations",
    headline: "Make time work better.",
    supportingDescription:
      "Orbion Bookings is an upcoming scheduling and appointment management solution designed to help service-based businesses organize availability, manage reservations, and simplify the booking experience.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "A large portion of service-based businesses continue to coordinate appointments through unstructured telephone calls, instant messaging exchanges, paper diaries, and disconnected personal calendars.",
        "This informal approach inevitably creates friction: double bookings, misunderstandings over service durations, ambiguous availability windows, missed appointment confirmations, and awkward cancellations.",
      ],
      envisagedSolution:
        "Orbion Bookings is being envisioned to transform this manual chaos into a structured, automated scheduling workflow that respects both the business's time and the client's convenience.",
    },
    problems: [
      {
        title: "Manual Appointment Coordination",
        description:
          "Constant back-and-forth messaging just to locate a mutually agreeable 30-minute opening wastes hours of productive time.",
      },
      {
        title: "Scheduling Conflicts & Double-Bookings",
        description:
          "Lack of real-time multi-staff calendar synchronization leads to overlapping appointments and client dissatisfaction.",
      },
      {
        title: "Unclear Service Availability",
        description:
          "Customers cannot easily inspect real-time open slots outside business hours, leading to abandoned reservations.",
      },
      {
        title: "Disorganized Booking Records",
        description:
          "Client histories, service notes, and cancellation histories are scattered across disparate paper or digital notes.",
      },
      {
        title: "Difficulty Managing Staff Rosters",
        description:
          "Coordinating variable shifts, buffer periods between sessions, and practitioner specialties manually is prone to errors.",
      },
    ],
    audiences: [
      {
        title: "Salons and Personal Care Studios",
        description:
          "Hair stylists, aesthetic clinics, and spa professionals who manage multiple service stations and specialized staff calendars.",
      },
      {
        title: "Clinics & Appointment-Based Providers",
        description:
          "Physiotherapists, wellness practitioners, and private consultants requiring precise time slot management and patient logs.",
      },
      {
        title: "Independent Consultants and Coaches",
        description:
          "Professional advisors needing automated scheduling links that enforce buffer intervals and prep times between client calls.",
      },
      {
        title: "Fitness & Wellness Studios",
        description:
          "Personal trainers and boutique studio instructors scheduling one-on-one sessions and equipment-specific reservations.",
      },
      {
        title: "Other Service-Based Businesses",
        description:
          "Any commercial venture whose primary revenue is generated through time-allocated professional services.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "Business Profiles",
        description:
          "Maintain clear business profiles, operating locations, branding details, and general operational policies.",
      },
      {
        number: "02",
        title: "Service Management",
        description:
          "Define specific services, individual durations, required buffer buffers, and pricing parameters in an orderly catalog.",
      },
      {
        number: "03",
        title: "Staff Management",
        description:
          "Assign staff members to specific services, manage individual working hours, and prevent provider cross-scheduling.",
      },
      {
        number: "04",
        title: "Availability Management",
        description:
          "Define recurring booking windows, holiday blackouts, and customized buffer times between consecutive appointments.",
      },
      {
        number: "05",
        title: "Online Booking Page",
        description:
          "A clean, responsive client-facing interface allowing clients to view real-time availability and select convenient slots.",
      },
      {
        number: "06",
        title: "Administrative Calendar",
        description:
          "A unified operational calendar view showing daily, weekly, and monthly reservations across all service staff.",
      },
      {
        number: "07",
        title: "Notifications",
        description:
          "Planned automated email and messaging notifications for confirmations, pre-appointment reminders, and cancellations.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Create Business Profile",
          description:
            "Set up company details, time zones, operating rules, and cancellation terms.",
        },
        {
          step: "02",
          title: "Configure Services & Staff",
          description:
            "Catalog available offerings, associate relevant team members, and set precise service durations.",
        },
        {
          step: "03",
          title: "Define Available Time Slots",
          description:
            "Establish recurring availability windows, buffer rules, and holiday overrides.",
        },
        {
          step: "04",
          title: "Customer Selects Service",
          description:
            "The client browses the clean online booking portal and selects the desired service and practitioner.",
        },
        {
          step: "05",
          title: "Choose an Available Slot",
          description:
            "The customer selects an open time window and supplies their contact information.",
        },
        {
          step: "06",
          title: "Booking Recorded & Confirmed",
          description:
            "The slot is locked in real-time on the administrative calendar, and confirmation alerts are dispatched.",
        },
        {
          step: "07",
          title: "Manage Upcoming Appointments",
          description:
            "Staff inspect their daily agenda, check client notes, and mark completed sessions.",
        },
      ],
      diagramType: "bookings-scheduling",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "Designed to eliminate scheduling friction for clients while preserving complete operational control for business owners.",
    },
    vision: {
      statement: "Make appointment management simpler for businesses and more convenient for customers.",
      narrative:
        "Time is the most finite resource for any service professional. Orbion Bookings is being crafted to make scheduling frictionless, ensuring that every appointment is organized, confirmed, and respected without constant administrative friction.",
    },
    closing: {
      statement: "Less scheduling friction. Better use of time.",
      subtext:
        "Envisioned as an elegant, dependable bridge between service providers and the clients they serve.",
    },
    telemetry: {
      stage: "Scheduling Engine & Availability State Machine Design",
      architectureType: "Temporal Scheduling System",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-fit",
    number: "04",
    name: "Orbion Fit",
    category: "Fitness / Gym Management",
    categoryGroup: "Business Operations",
    headline: "A better system for fitness businesses.",
    supportingDescription:
      "Orbion Fit is an upcoming fitness business management platform envisioned to help gyms organize members, memberships, attendance, and renewals through a more structured digital experience.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Running a fitness business requires keeping track of several tightly coupled operational threads: member demographic profiles, active membership tiers, payment dues, daily front-desk attendance logs, and expiring subscriptions.",
        "When these streams are maintained through disjointed paper registers or fragile local spreadsheets, gym operators face chronic administrative headaches: tracking who has paid, which memberships are expiring this week, and how many members are actually using the facility daily.",
      ],
      envisagedSolution:
        "Orbion Fit is being envisioned to unite these core operational activities into one structured, intuitive digital system designed specifically for fitness facilities.",
    },
    problems: [
      {
        title: "Disorganized Membership Records",
        description:
          "Member contact info, emergency contacts, plan histories, and waiver documentation are spread across separate physical or digital files.",
      },
      {
        title: "Difficulty Tracking Plan Renewals",
        description:
          "Lacking automated renewal tracking leads to lapsed memberships and uncollected revenue without prompt follow-up.",
      },
      {
        title: "Manual Attendance & Check-in",
        description:
          "Paper attendance logs create congestion at the front desk and yield zero actionable data regarding peak facility usage hours.",
      },
      {
        title: "Unclear Payment Status & Dues",
        description:
          "Managers struggle to quickly differentiate between active, pending, overdue, and grace-period accounts on demand.",
      },
      {
        title: "Repetitive Administrative Overhead",
        description:
          "Front desk staff spend valuable hours on manual bookkeeping rather than engaging with members and driving renewals.",
      },
    ],
    audiences: [
      {
        title: "Independent Gyms",
        description:
          "Single and multi-location gym facilities requiring organized membership tracking without cumbersome legacy enterprise systems.",
      },
      {
        title: "Fitness & Training Studios",
        description:
          "Specialized strength, pilates, yoga, or martial arts studios needing attendance tracking and tiered membership management.",
      },
      {
        title: "Boutique Fitness Businesses",
        description:
          "Community-driven fitness facilities looking for modern member management that reflects high professional standards.",
      },
      {
        title: "Membership-Based Athletic Centers",
        description:
          "Sports clubs, CrossFit boxes, and wellness facilities operating on recurring enrollment and access models.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "Member Management",
        description:
          "Organize complete member profiles, emergency contact details, health disclosures, and assigned membership histories.",
      },
      {
        number: "02",
        title: "Membership Plans",
        description:
          "Configure diverse membership tiers (monthly, quarterly, annual, class bundles) with clear duration and pricing parameters.",
      },
      {
        number: "03",
        title: "Payment Status Tracking",
        description:
          "Maintain transparency over paid, pending, and overdue dues with structured payment histories for each member.",
      },
      {
        number: "04",
        title: "Attendance Logs",
        description:
          "A streamlined digital check-in log to record daily facility visits and aggregate usage trends over time.",
      },
      {
        number: "05",
        title: "Renewals Tracking",
        description:
          "Automated flags and upcoming expiration lists to help staff proactively engage members prior to subscription lapse.",
      },
      {
        number: "06",
        title: "Business Overview",
        description:
          "Provide owners with a clear snapshot of active member counts, monthly renewals, daily check-ins, and facility metrics.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Register a Member",
          description:
            "Record member personal information, contact credentials, and emergency details in the digital registry.",
        },
        {
          step: "02",
          title: "Assign a Membership Plan",
          description:
            "Link the member to their selected plan, setting start dates, expiration terms, and renewal cycles.",
        },
        {
          step: "03",
          title: "Record Payment Status",
          description:
            "Mark the initial membership fee as paid and document the transaction reference in the member's account log.",
        },
        {
          step: "04",
          title: "Log Daily Attendance",
          description:
            "Check in members upon arrival, verifying active standing in real-time at the reception terminal.",
        },
        {
          step: "05",
          title: "Track Upcoming Renewals",
          description:
            "Monitor accounts approaching expiration to initiate timely, friendly renewal reminders.",
        },
        {
          step: "06",
          title: "Review Operational Overview",
          description:
            "Evaluate retention rates, facility capacity utilization, and membership health through central management reporting.",
        },
      ],
      diagramType: "fit-membership",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "The proposed architecture focuses on operational simplicity, giving gym staff clear answers in seconds.",
    },
    vision: {
      statement: "Give fitness businesses a more organized way to manage the operations behind every member's journey.",
      narrative:
        "Great fitness businesses thrive on energy, discipline, and human connection — not tedious paperwork. Orbion Fit is being built to handle the operational details behind the desk so instructors and gym owners can dedicate their focus to member results.",
    },
    closing: {
      statement: "Better organized operations. More time for fitness.",
      subtext:
        "A practical, purpose-built administrative backbone for modern gyms and fitness studios.",
    },
    telemetry: {
      stage: "Member Ledger & Access Lifecycle Specification",
      architectureType: "Membership Management Engine",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-dine",
    number: "05",
    name: "Orbion Dine",
    category: "Restaurant Technology / Digital Ordering",
    categoryGroup: "Business Operations",
    headline: "A more connected dining experience.",
    supportingDescription:
      "Orbion Dine is an upcoming restaurant technology solution envisioned to help restaurants organize their menus, digital ordering, and everyday order workflows.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Running a dining establishment involves coordinating fast-moving components: dynamic menus with fluctuating ingredient availability, patron seating arrangements, order taking at tables, kitchen prep queues, and bill settlements.",
        "Traditional reliance on physical printed menus and hurried verbal order relay often results in miscommunicated dietary requests, delayed service during peak rush hours, and friction in updating pricing or sold-out items.",
      ],
      envisagedSolution:
        "Orbion Dine is being envisioned to bring these critical restaurant operations into a synchronized, easy-to-use digital workflow connecting floor staff, kitchen teams, and guests.",
    },
    problems: [
      {
        title: "Manual Order Taking Friction",
        description:
          "Handwritten kitchen tickets are prone to handwriting misinterpretations, misplaced modifier requests, and lost slips during peak hours.",
      },
      {
        title: "Difficulty Updating Menus Instantly",
        description:
          "Re-printing physical menus to reflect seasonal changes, sold-out items, or adjusted prices is costly and inflexible.",
      },
      {
        title: "Disconnected Ordering Processes",
        description:
          "Lack of real-time communication between dining room floor staff and the kitchen prep line creates avoidable order lag.",
      },
      {
        title: "Unclear Order Status for Staff",
        description:
          "Waiters must constantly check in with the kitchen line verbally to see if a table's entrees have been completed.",
      },
      {
        title: "Disorganized Table Workflows",
        description:
          "Managing table turnaround times, occupied vs. available seating, and open checks becomes chaotic without visual status.",
      },
    ],
    audiences: [
      {
        title: "Casual Dining Restaurants",
        description:
          "Full-service restaurants looking to streamline table turns, improve ordering accuracy, and modernize guest experiences.",
      },
      {
        title: "Cafes and Quick-Service Outlets",
        description:
          "High-volume coffee houses and bistros seeking rapid digital menu browsing and frictionless counter or table ordering.",
      },
      {
        title: "Food Businesses & Pop-ups",
        description:
          "Culinary entrepreneurs requiring agile menu management that adapts quickly to daily specials and inventory limits.",
      },
      {
        title: "Hospitality & Dining Establishments",
        description:
          "Boutique hotels, lounges, and food halls managing seating areas with QR-based digital ordering workflows.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "Digital Menus",
        description:
          "Clean, categorized digital menus featuring rich descriptions, allergen badges, dietary tags, and high-fidelity item presentation.",
      },
      {
        number: "02",
        title: "QR-Based Ordering",
        description:
          "A proposed browser-based ordering experience accessed instantly by guests via table QR codes without app downloads.",
      },
      {
        number: "03",
        title: "Order Management",
        description:
          "Centralized incoming order ledger categorizing active orders by table number, time elapsed, and order priority.",
      },
      {
        number: "04",
        title: "Order Status Tracking",
        description:
          "Visual status progression tracking tickets through received, preparing, ready to serve, and fulfilled stages.",
      },
      {
        number: "05",
        title: "Table Workflow",
        description:
          "A visual table layout assisting staff with table occupancy, active checks, and dining turnaround management.",
      },
      {
        number: "06",
        title: "Menu Administration",
        description:
          "Intuitive back-office dashboard to instantly mark items 86'd (sold out), adjust prices, or introduce limited specials.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Restaurant Manages Menu",
          description:
            "Staff configure categories, pricing, descriptions, and dietary attributes in the digital menu editor.",
        },
        {
          step: "02",
          title: "Customer Accesses Digital Menu",
          description:
            "A guest scans the table QR code on their smartphone to immediately browse the current live offerings.",
        },
        {
          step: "03",
          title: "Places Proposed Order",
          description:
            "The customer selects items, adds dietary instructions, and submits their order directly from their phone.",
        },
        {
          step: "04",
          title: "Order Recorded in Central Queue",
          description:
            "The incoming ticket is routed instantly to the kitchen display and floor staff terminals with table tagging.",
        },
        {
          step: "05",
          title: "Staff Manage Preparation Status",
          description:
            "Kitchen teams update preparation status as dishes move from the prep line to the pass.",
        },
        {
          step: "06",
          title: "Fulfilled Table Service",
          description:
            "Floor staff deliver the prepared order, manage table turnover, and complete the settlement cycle seamlessly.",
        },
      ],
      diagramType: "dine-ordering",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "The system aims to augment personal hospitality, removing mechanical delays while letting staff focus on guest care.",
    },
    vision: {
      statement: "Bring menus, ordering, and restaurant workflows into a more connected digital experience.",
      narrative:
        "Hospitality is an art, but operational coordination behind the scenes is engineering. Orbion Dine is designed to eliminate kitchen confusion, paper waste, and ordering lag, helping culinary teams deliver exceptional dining experiences with calm efficiency.",
    },
    closing: {
      statement: "Technology that makes dining workflows simpler.",
      subtext:
        "Engineered to help restaurants run smoother from table to kitchen and back.",
    },
    telemetry: {
      stage: "Kitchen Queue & Table State Machine Specification",
      architectureType: "Restaurant Floor & Order System",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-docs",
    number: "06",
    name: "Orbion Docs",
    category: "Document Intelligence / AI-Assisted Processing",
    categoryGroup: "Artificial Intelligence",
    headline: "Turn documents into usable information.",
    supportingDescription:
      "Orbion Docs is an upcoming document intelligence solution envisioned to help businesses process documents, extract relevant information, and organize unstructured content into structured data.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Modern businesses handle massive volumes of critical documents daily: supplier invoices, purchase orders, shipping manifests, legal agreements, scanned receipts, and multi-page application forms.",
        "Today, extracting actionable information from these files requires administrative personnel to open each document, squint at scanned pages, and manually transcribe numbers and names into spreadsheets or enterprise software — an expensive, error-prone, and mind-numbing bottleneck.",
      ],
      envisagedSolution:
        "Orbion Docs is being envisioned to transform this manual paperwork through optical character recognition, intelligent layout parsing, and AI-assisted semantic field extraction coupled with human-in-the-loop verification.",
    },
    problems: [
      {
        title: "Repetitive Manual Data Entry",
        description:
          "Skilled finance and operations professionals spend hours mechanically copying invoice numbers and dates into systems.",
      },
      {
        title: "Information Scattered Across Formats",
        description:
          "Crucial business metrics remain trapped inside static PDFs, email attachments, and distorted camera snapshots.",
      },
      {
        title: "Difficulty Processing Large Batches",
        description:
          "When transaction volume surges at month-end, manual document review creates severe backlog delays.",
      },
      {
        title: "Inconsistent Data Extraction Quality",
        description:
          "Human fatigue causes transcription errors, misplaced decimals, and missed line items that skew financial reporting.",
      },
      {
        title: "Time Lost Formatting Records",
        description:
          "Formatting extracted data into compatible database rows requires tedious spreadsheet cleanup before it can be used.",
      },
    ],
    audiences: [
      {
        title: "Accounts Payable & Finance Teams",
        description:
          "Bookkeepers and finance managers who need to extract invoice line items, tax numbers, vendor details, and totals rapidly.",
      },
      {
        title: "Administrative & Operations Teams",
        description:
          "Offices processing recurring forms, vendor contracts, intake records, and compliance documentation.",
      },
      {
        title: "Logistics and Procurement Specialists",
        description:
          "Supply chain coordinators handling bills of lading, packing slips, customs clearances, and purchase orders.",
      },
      {
        title: "Organizations Working with Unstructured Data",
        description:
          "Any business looking to turn paper archives or high-volume PDF repositories into queryable digital assets.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "PDF & Image Ingestion",
        description:
          "Support for ingesting single and multi-page PDFs, scanned documents, and standard image formats (JPEG, PNG).",
      },
      {
        number: "02",
        title: "Document Pre-processing",
        description:
          "Automated orientation correction, contrast optimization, and structural layout detection for cleaner parsing.",
      },
      {
        number: "03",
        title: "AI-Assisted Information Extraction",
        description:
          "Deep learning models identify semantic entities, line-item tables, dates, monetary values, and vendor metadata.",
      },
      {
        number: "04",
        title: "Source Document Preview",
        description:
          "A side-by-side inspection view highlighting exact bounding boxes on the original document for extracted fields.",
      },
      {
        number: "05",
        title: "Manual Correction & Review",
        description:
          "An ergonomic human-in-the-loop interface allowing staff to verify low-confidence fields before finalizing.",
      },
      {
        number: "06",
        title: "CSV & JSON Export",
        description:
          "Deterministic export of validated, structured data into standard CSV or JSON formats ready for ERP or database import.",
      },
      {
        number: "07",
        title: "Processing Status Queue",
        description:
          "Real-time pipeline monitoring showing pending, parsing, reviewed, and finalized document states.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Upload Document",
          description:
            "Submit a PDF, scan, or photo of an invoice, receipt, or business record to the intake buffer.",
        },
        {
          step: "02",
          title: "Document Ingestion & OCR",
          description:
            "The document is normalized, cleaned, and parsed through layout analysis and text extraction pipelines.",
        },
        {
          step: "03",
          title: "AI-Assisted Entity Extraction",
          description:
            "Target fields (dates, amounts, vendor, table line items) are parsed and mapped to structured schemas.",
        },
        {
          step: "04",
          title: "Side-by-Side Review",
          description:
            "The user inspects extracted values alongside bounding-box highlights on the original document preview.",
        },
        {
          step: "05",
          title: "Human Correction & Validation",
          description:
            "Any ambiguous or borderline confidence field can be manually corrected or confirmed by the reviewer.",
        },
        {
          step: "06",
          title: "Structured Data Export",
          description:
            "Clean, verified data is exported to CSV or downstream databases without manual transcription.",
        },
      ],
      diagramType: "docs-extraction",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "Human review and validation remain paramount: the system is designed to accelerate human verification, not operate blindly.",
    },
    vision: {
      statement: "Reduce repetitive document work and make business information easier to use.",
      narrative:
        "Valuable institutional knowledge shouldn't remain imprisoned in static paper or dead PDFs. Orbion Docs is envisioned to bridge the gap between human documents and structured computational systems — freeing teams from transcription to focus on decision making.",
    },
    closing: {
      statement: "From documents to structured intelligence.",
      subtext:
        "A practical application of document AI designed for verifiable accuracy and everyday business utility.",
    },
    telemetry: {
      stage: "Document OCR & Entity Parsing Architecture",
      architectureType: "Document Intelligence Pipeline",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
  {
    slug: "orbion-insights",
    number: "07",
    name: "Orbion Insights",
    category: "Business Analytics / Data Intelligence",
    categoryGroup: "Data Intelligence",
    headline: "See the meaning behind your data.",
    supportingDescription:
      "Orbion Insights is an upcoming business analytics solution envisioned to help organizations organize business data, understand key metrics, and generate useful reports.",
    status: "COMING SOON",
    statusNotice:
      "This product is currently in development. The features and workflows described on this page represent our intended product direction and may evolve as development progresses.",
    overview: {
      context: [
        "Every modern business accumulates data daily across transactions, service interactions, customer accounts, and routine operations. However, this raw data is typically sequestered in dense, disconnected spreadsheets or unformatted logs.",
        "Without clean visualization, business leaders and operational managers struggle to discern what actually happened last month: Which services generated consistent yield? Where are operational drop-offs occurring? And what seasonal patterns require planning?",
      ],
      envisagedSolution:
        "Orbion Insights is being envisioned as a clean, focused analytical environment that converts tabular business data into clear, actionable metrics, visual trend lines, and structured executive reports.",
    },
    problems: [
      {
        title: "Data Scattered Across Spreadsheets",
        description:
          "Records exist in multiple workbook versions across different team members' hard drives, creating conflicting numbers.",
      },
      {
        title: "Difficulty Understanding Key Metrics",
        description:
          "Raw numbers without calculated growth percentages, ratios, or benchmarks obscure actual operational performance.",
      },
      {
        title: "Manual, Time-Consuming Report Building",
        description:
          "Creating weekly or monthly management updates requires hours of manual formula hacking, copy-pasting, and chart re-drawing.",
      },
      {
        title: "Lack of Clear, Readable Visualizations",
        description:
          "Overly complex, cluttered charts make it difficult for team members to quickly spot trends and anomalies.",
      },
      {
        title: "Difficulty Identifying Activity Patterns",
        description:
          "Subtle trends such as recurring weekly traffic dips or product demand shifts go unnoticed until problems become severe.",
      },
    ],
    audiences: [
      {
        title: "Small and Growing Businesses",
        description:
          "Founders and managers wanting clarity on top-line business indicators without maintaining complex data engineering stacks.",
      },
      {
        title: "Business Owners and Operators",
        description:
          "Decision-makers seeking quick, dependable answers to fundamental commercial questions without relying on technical analysts.",
      },
      {
        title: "Operations and Departmental Teams",
        description:
          "Leads tracking throughput, task completion velocity, and operational SLA performance across quarters.",
      },
      {
        title: "Analysts and Knowledge Workers",
        description:
          "Professionals who need a clean, reproducible tool to explore CSV datasets, test hypotheses, and export reports.",
      },
      {
        title: "Organizations Relying on Spreadsheets",
        description:
          "Any team seeking to upgrade from static spreadsheets to dynamic, interactive visualization workspaces.",
      },
    ],
    audienceDisclaimer:
      "These represent intended user groups and planned operational use cases, not confirmed active customers.",
    features: [
      {
        number: "01",
        title: "CSV & Tabular Data Import",
        description:
          "Seamless ingestion of standard CSV, TSV, and tabular business exports with automated column type detection.",
      },
      {
        number: "02",
        title: "Automated Data Preparation",
        description:
          "Assists with data hygiene: handles missing records, standardizes date formats, and cleans messy categorical strings.",
      },
      {
        number: "03",
        title: "Key Performance Indicators (KPIs)",
        description:
          "Auto-generate high-level indicator cards showing totals, averages, growth differentials, and baseline ratios.",
      },
      {
        number: "04",
        title: "Interactive Visualizations",
        description:
          "Clean time-series lines, distribution bars, and categorical composition charts designed for immediate legibility.",
      },
      {
        number: "05",
        title: "Date & Dimension Filtering",
        description:
          "Explore information across custom time horizons (last 7 days, monthly, quarterly) and slice data by category.",
      },
      {
        number: "06",
        title: "Exportable Executive Reports",
        description:
          "Generate concise, publication-ready summary reports and chart graphics ready for stakeholder presentations.",
      },
      {
        number: "07",
        title: "Performance Summaries",
        description:
          "Algorithmic summaries highlighting notable outliers, top-performing segments, and emerging trend trajectories.",
      },
    ],
    workflow: {
      steps: [
        {
          step: "01",
          title: "Import CSV Data Source",
          description:
            "Upload an exported business CSV or connect an intended tabular data stream into the analytics intake.",
        },
        {
          step: "02",
          title: "Automated Data Prep",
          description:
            "The system checks schemas, formats timestamps, detects numerical columns, and cleans common null values.",
        },
        {
          step: "03",
          title: "Identify & Calculate Key Metrics",
          description:
            "Select relevant metrics (revenue, volume, conversion, throughput) to populate core KPI summary cards.",
        },
        {
          step: "04",
          title: "Render Interactive Visualizations",
          description:
            "Explore auto-rendered time-series graphs, categorical breakdowns, and distribution histograms.",
        },
        {
          step: "05",
          title: "Filter by Date & Dimension",
          description:
            "Narrow the temporal window and drill down into specific regional, product, or team dimensions.",
        },
        {
          step: "06",
          title: "Export Comprehensive Reports",
          description:
            "Extract structured findings, clean chart figures, and summary takeaways for review and distribution.",
        },
      ],
      diagramType: "insights-analytics",
      diagramCaption:
        "Concept visualization — illustrative, not a live product interface.",
      workflowEmphasis:
        "Designed to produce clear understanding rapidly, avoiding unnecessary statistical jargon or visual clutter.",
    },
    vision: {
      statement: "Make business data easier to understand and more useful for everyday decisions.",
      narrative:
        "Data only has value when it produces clarity. Orbion Insights is being created to eliminate the frustration of spreadsheet wrestling — transforming raw numbers into straightforward visual truth that helps teams move forward with conviction.",
    },
    closing: {
      statement: "Better visibility. Clearer decisions.",
      subtext:
        "Analytical intelligence engineered for clarity, usability, and practical everyday decision-making.",
    },
    telemetry: {
      stage: "Tabular Aggregation Engine & Visual Specification",
      architectureType: "Data Intelligence Subsystem",
      planningCycle: "Targeted Milestone Q3 2026",
    },
  },
];

