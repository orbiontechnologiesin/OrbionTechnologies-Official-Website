export interface ServiceApproachStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  credibilityNote?: string;
  problems: string[];
  deliverables: string[];
  approach: ServiceApproachStep[];
  technologies: string[];
  outcomes: string[];
  ctaText: string;
  ctaHref: string;
}

export interface DeliveryStage {
  number: string;
  name: string;
  duration: string;
  summary: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

export interface TechCategory {
  name: string;
  badge: string;
  description: string;
  items: {
    name: string;
    description: string;
  }[];
}

export interface WhyUsPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyAspects: string[];
}

export interface ProjectInquiryType {
  id: string;
  title: string;
  subtitle: string;
  typicalScope: string;
  deliverablesSummary: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "website-ecommerce",
    number: "01",
    name: "Website & E-Commerce Development",
    badge: "WEB DEVELOPMENT",
    headline: "Digital experiences that move businesses forward.",
    description:
      "Fast, responsive, modern websites and e-commerce platforms engineered for performance, clarity, and business outcomes. Built with modern component architectures and strict technical standards.",
    problems: [
      "Outdated, slow web properties that harm credibility and customer trust",
      "Poor mobile performance, layout shifting, and broken responsive viewports",
      "Cluttered navigation hierarchies that obscure core offerings",
      "Low conversion rates due to complex checkout or inquiry funnels",
      "Rigid legacy platforms that are painful to update and maintain",
    ],
    deliverables: [
      "Responsive corporate and product showcase websites",
      "High-performance e-commerce storefronts and catalog systems",
      "Modern headless CMS integration with intuitive editorial tooling",
      "Strict Core Web Vitals optimization (sub-second load times)",
      "Technical SEO architecture, structured metadata, and semantic markup",
      "WCAG 2.1 accessibility compliance across mobile and desktop",
    ],
    approach: [
      {
        step: "01",
        title: "Audience & Domain Discovery",
        description: "Analyze business positioning, conversion goals, audience personas, and technical requirements.",
      },
      {
        step: "02",
        title: "Information Architecture",
        description: "Structure navigation hierarchies, content paths, and user conversion funnels for intuitive flow.",
      },
      {
        step: "03",
        title: "Design & Prototyping",
        description: "Craft responsive wireframes and high-fidelity prototypes aligned with brand design systems.",
      },
      {
        step: "04",
        title: "Frontend Engineering",
        description: "Implement modern component architectures in Next.js and Tailwind CSS with sub-second rendering.",
      },
      {
        step: "05",
        title: "CMS & Systems Integration",
        description: "Connect headless content management, analytics, customer forms, and transactional endpoints.",
      },
      {
        step: "06",
        title: "Cross-Device Validation",
        description: "Audit responsive layout behavior, Core Web Vitals, accessibility, and multi-browser rendering.",
      },
      {
        step: "07",
        title: "Deployment & Knowledge Transfer",
        description: "Deploy to edge infrastructure (Vercel) with automated CI/CD and comprehensive editor documentation.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel Edge",
      "Headless CMS",
      "Framer Motion",
    ],
    outcomes: [
      "Sub-second load times that keep visitors engaged",
      "Elevated digital brand prestige and professional credibility",
      "Measurable improvement in search engine discoverability",
      "Streamlined content publishing workflows for your team",
    ],
    ctaText: "Discuss a Website Project",
    ctaHref: "/#contact",
  },
  {
    id: "custom-software",
    number: "02",
    name: "Custom Software & Web Application Development",
    badge: "CUSTOM SOFTWARE",
    headline: "Software engineered around your requirements.",
    description:
      "Tailored web applications, internal tools, and software solutions designed to fit unique operational models and solve specialized business challenges.",
    problems: [
      "Off-the-shelf software requiring costly workarounds and unnatural compromises",
      "Critical operational data scattered across spreadsheets and disparate tools",
      "Operational bottlenecks and manual handoffs slowing growth",
      "Lack of role-based security and granular data permissions",
      "Legacy desktop software that cannot be accessed securely across distributed teams",
    ],
    deliverables: [
      "Custom web applications and customer-facing portals",
      "Internal operations dashboards and administrative consoles",
      "Multi-tenant architectures with role-based access control (RBAC)",
      "Database-driven transactional systems with relational integrity",
      "Secure authentication, session management, and audit trails",
      "Document generation, reporting, and structured data exports",
    ],
    approach: [
      {
        step: "01",
        title: "Domain & Requirements Modeling",
        description: "Deconstruct operational workflows, data entities, edge cases, and compliance boundaries.",
      },
      {
        step: "02",
        title: "System Architecture & Schema Design",
        description: "Design relational database schemas, query boundaries, security rules, and API interfaces.",
      },
      {
        step: "03",
        title: "Security & Permissions Blueprint",
        description: "Define multi-level role hierarchies, session lifecycles, encryption standards, and auth flows.",
      },
      {
        step: "04",
        title: "Iterative Full-Stack Development",
        description: "Build frontend client modules and backend services with modular, reusable TypeScript code.",
      },
      {
        step: "05",
        title: "Automated & Contract Testing",
        description: "Verify business rules, transactional rollbacks, data constraints, and integration contracts.",
      },
      {
        step: "06",
        title: "Staging & User Acceptance Testing",
        description: "Validate real operational scenarios with team stakeholders in an isolated staging environment.",
      },
      {
        step: "07",
        title: "Production Release & Evolution",
        description: "Deploy to production with automated backups, monitoring, and an iterative feature roadmap.",
      },
    ],
    technologies: [
      "Node.js",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Supabase",
      "Next.js App Router",
      "REST & RPC APIs",
    ],
    outcomes: [
      "Centralized operational truth across your entire organization",
      "Dramatic reduction in manual data entry errors and delays",
      "Enterprise-grade security and role-based data isolation",
      "Software that scales flexibly as your operations grow",
    ],
    ctaText: "Discuss a Software Project",
    ctaHref: "/#contact",
  },
  {
    id: "ai-engineering",
    number: "03",
    name: "Artificial Intelligence Development & Integration",
    badge: "AI ENGINEERING",
    headline: "Bring useful intelligence into your applications.",
    description:
      "Pragmatic artificial intelligence solutions, LLM API integrations, Retrieval-Augmented Generation (RAG) systems, and smart assistants embedded into existing products.",
    credibilityNote:
      "Responsible AI engineering: We emphasize verified retrieval, deterministic guardrails, structured output validation, and human-in-the-loop oversight rather than unconstrained autonomy or unrealistic claims of perfection.",
    problems: [
      "Staff spending excessive hours searching across extensive internal documentation",
      "Customer support teams overloaded by repetitive, factual queries",
      "Unstructured business documents containing critical unextracted data",
      "Fear of LLM hallucinations, data leakage, or unpredictable AI outputs",
      "Difficulty connecting foundational AI models to proprietary business context",
    ],
    deliverables: [
      "Retrieval-Augmented Generation (RAG) knowledge retrieval pipelines",
      "Context-aware enterprise conversational interfaces and assistants",
      "Vector embeddings and hybrid semantic search architectures",
      "Automated document processing and structured information extraction",
      "Deterministic schema validation, guardrails, and fallback routines",
      "Model evaluation harnesses and observability telemetry",
    ],
    approach: [
      {
        step: "01",
        title: "Feasibility & Boundary Assessment",
        description: "Assess domain specificity, data availability, precision requirements, and cost boundaries.",
      },
      {
        step: "02",
        title: "Data Ingestion & Indexing Pipeline",
        description: "Clean, chunk, and embed proprietary documents into vector stores with hybrid search metadata.",
      },
      {
        step: "03",
        title: "Model Selection & Architecture",
        description: "Select appropriate foundation models (OpenAI, Anthropic, Gemini) for quality, latency, and cost.",
      },
      {
        step: "04",
        title: "Prompt Engineering & Guardrails",
        description: "Build structured prompt templates with JSON-schema enforcement and hallucination guardrails.",
      },
      {
        step: "05",
        title: "Application Interface Integration",
        description: "Embed streaming conversational or predictive components natively into web application workflows.",
      },
      {
        step: "06",
        title: "Verification & Latency Tuning",
        description: "Benchmark retrieval precision, response latency, token consumption, and edge-case handling.",
      },
      {
        step: "07",
        title: "Telemetry & Continuous Oversight",
        description: "Implement continuous logging, human feedback loops, and token cost monitoring dashboards.",
      },
    ],
    technologies: [
      "OpenAI & Gemini APIs",
      "Claude & Mistral APIs",
      "pgvector & Vector DBs",
      "RAG Architectures",
      "Python & FastAPI",
      "TypeScript",
      "Structured Outputs (JSON Schema)",
    ],
    outcomes: [
      "Instant, source-grounded answers to internal and customer inquiries",
      "Automated synthesis of unstructured business documents into structured data",
      "Significantly reduced operational burden on support and knowledge teams",
      "Guarded, predictable AI behavior with full provenance tracking",
    ],
    ctaText: "Explore an AI Project",
    ctaHref: "/#contact",
  },
  {
    id: "process-automation",
    number: "04",
    name: "Business Process & Workflow Automation",
    badge: "AUTOMATION",
    headline: "Make repetitive work more organized.",
    description:
      "End-to-end automation of manual data handoffs, notification pipelines, cross-system synchronization, and multi-step operational routines.",
    problems: [
      "Hours lost to manual copy-pasting between disparate software platforms",
      "Delays and communication breakdowns when transitioning tasks between teams",
      "Human error during recurring data transformation and invoice generation",
      "Lack of centralized logs and alerts when background processes stall",
      "Difficulty scaling operational throughput without linear headcount growth",
    ],
    deliverables: [
      "Multi-system workflow automation pipelines and webhook listeners",
      "Scheduled background jobs and batch processing routines",
      "Automated notification and alerting engines (Email, SMS, Slack, Webhooks)",
      "Automated document creation, PDF generation, and archiving",
      "Data transformation and ETL (Extract, Transform, Load) pipelines",
      "Comprehensive execution logs, error retry queues, and audit dashboards",
    ],
    approach: [
      {
        step: "01",
        title: "Workflow & Bottleneck Mapping",
        description: "Document existing operational steps, manual handoffs, data inputs, and failure modes.",
      },
      {
        step: "02",
        title: "Trigger & Payload Specification",
        description: "Define trigger events, data payloads, validation schemas, and state transition rules.",
      },
      {
        step: "03",
        title: "Security & Credential Vaulting",
        description: "Configure secure API keys, OAuth tokens, role permissions, and encrypted environment storage.",
      },
      {
        step: "04",
        title: "Automated Pipeline Engineering",
        description: "Develop reliable automation scripts, webhook receivers, and transformation logic.",
      },
      {
        step: "05",
        title: "Error Handling & Idempotency",
        description: "Implement retry policies, dead-letter queues, duplicate prevention, and fallback strategies.",
      },
      {
        step: "06",
        title: "Dry-Run & Scenario Simulation",
        description: "Simulate edge cases, rate limits, and network dropouts in controlled testing environments.",
      },
      {
        step: "07",
        title: "Production Deployment & Monitoring",
        description: "Activate automated flows with real-time alerting for exceptions and operational uptime.",
      },
    ],
    technologies: [
      "Node.js & Python",
      "Serverless Functions",
      "Webhooks & Message Queues",
      "Redis & BullMQ",
      "Cron & Cloud Schedulers",
      "REST & GraphQL Endpoints",
    ],
    outcomes: [
      "Elimination of repetitive manual data entry across departments",
      "Near-instant execution of multi-step business handoffs",
      "Consistent, error-free operational compliance and audit records",
      "Capacity for teams to focus on high-leverage strategic initiatives",
    ],
    ctaText: "Automate a Workflow",
    ctaHref: "/#contact",
  },
  {
    id: "ui-ux-design",
    number: "05",
    name: "UI/UX Design & Digital Product Design",
    badge: "DIGITAL EXPERIENCE DESIGN",
    headline: "Make complex experiences feel simple.",
    description:
      "User-centered interface and experience design that translates intricate technical workflows into clear, intuitive, and visually refined digital products.",
    problems: [
      "Complex user interfaces that cause user frustration and abandonments",
      "Inconsistent visual styles and disjointed patterns across product modules",
      "High training and onboarding costs for new software users",
      "Designs created without understanding technical frontend constraints",
      "Neglected accessibility creating usability barriers for diverse audiences",
    ],
    deliverables: [
      "User journey maps, information architecture, and task flows",
      "Interactive Figma wireframes and high-fidelity clickable prototypes",
      "Comprehensive design systems with reusable components and tokens",
      "Responsive layout specifications for mobile, tablet, and desktop",
      "Micro-interaction and state specifications (hover, focus, disabled, loading)",
      "Developer-ready asset documentation and design token exports",
    ],
    approach: [
      {
        step: "01",
        title: "User & Task Flow Research",
        description: "Analyze primary user roles, task objectives, cognitive friction points, and user journeys.",
      },
      {
        step: "02",
        title: "Information Hierarchy & Wireframing",
        description: "Establish clear screen hierarchies and structural layouts through rapid low-fidelity sketches.",
      },
      {
        step: "03",
        title: "Design System & Token Architecture",
        description: "Build an organized foundation of typography, colors, spacing units, and atomic components.",
      },
      {
        step: "04",
        title: "High-Fidelity Interface Design",
        description: "Create polished visual screens with purposeful typography, whitespace, and brand coherence.",
      },
      {
        step: "05",
        title: "Interactive Prototyping",
        description: "Assemble interactive prototypes to test real transitions, modal states, and edge cases.",
      },
      {
        step: "06",
        title: "Accessibility & Usability Review",
        description: "Ensure contrast ratios, keyboard navigation paths, and screen-reader semantics meet WCAG standards.",
      },
      {
        step: "07",
        title: "Engineering Handoff & QA Support",
        description: "Provide structured design specs to developers and conduct design QA during frontend builds.",
      },
    ],
    technologies: [
      "Figma",
      "Design Systems",
      "Tailwind CSS Tokens",
      "Interactive Prototyping",
      "WCAG 2.1 Guidelines",
      "Component Libraries",
    ],
    outcomes: [
      "Significantly reduced user confusion and lower support tickets",
      "Faster development velocity via structured reusable design tokens",
      "A coherent, sophisticated visual brand identity across all touchpoints",
      "Intuitive digital products that users genuinely enjoy using",
    ],
    ctaText: "Discuss a Design Project",
    ctaHref: "/#contact",
  },
  {
    id: "system-integration",
    number: "06",
    name: "API Integration & System Connectivity",
    badge: "SYSTEM INTEGRATION",
    headline: "Connect the systems your business depends on.",
    description:
      "Secure, reliable integrations between third-party SaaS services, internal databases, payment gateways, messaging services, and custom applications.",
    problems: [
      "Disconnected applications forcing redundant data re-entry across teams",
      "Brittle, legacy sync scripts that break silently without alerting",
      "Complex payment and billing workflows that fail to sync with accounting",
      "Security risks from improper handling of API keys and webhook secrets",
      "Data latency causing operational delays between order, fulfillment, and CRM",
    ],
    deliverables: [
      "Third-party REST & GraphQL API integrations",
      "Payment gateway & billing integrations (Stripe, Razorpay, etc.)",
      "CRM, ERP, and communication platform synchronization",
      "Secure webhook listener endpoints with cryptographic signature verification",
      "Data serialization, schema transformation, and normalization layers",
      "API monitoring, uptime checks, and automated alerting channels",
    ],
    approach: [
      {
        step: "01",
        title: "API Specification & Auth Audit",
        description: "Review third-party API documentation, authentication methods (OAuth, API keys), and rate limits.",
      },
      {
        step: "02",
        title: "Data Schema Transformation Design",
        description: "Map source fields to target schema structures, handling type conversions and optional fields.",
      },
      {
        step: "03",
        title: "Security & Credential Infrastructure",
        description: "Establish secret rotation, encrypted environment variables, and webhook signature verification.",
      },
      {
        step: "04",
        title: "Integration Middleware Engineering",
        description: "Build robust integration services in TypeScript with strict request and response typing.",
      },
      {
        step: "05",
        title: "Resilient Error & Retry Architecture",
        description: "Implement exponential backoff, rate limit handling, and dead-letter queues for failed events.",
      },
      {
        step: "06",
        title: "Sandbox Verification & Load Testing",
        description: "Execute end-to-end transaction tests in API sandbox environments under simulated load.",
      },
      {
        step: "07",
        title: "Production Cutover & Observability",
        description: "Go live with continuous error alerting, transaction logging, and status dashboard monitors.",
      },
    ],
    technologies: [
      "RESTful APIs",
      "GraphQL",
      "Webhooks",
      "TypeScript",
      "Node.js",
      "HMAC Verification",
      "Payment Gateways",
      "Cloud Schedulers",
    ],
    outcomes: [
      "Unified operational data moving seamlessly between all platforms",
      "Elimination of manual synchronization and cross-tool data conflicts",
      "Real-time transactional speed for billing, notifications, and updates",
      "Resilient system architecture that weathers third-party outages cleanly",
    ],
    ctaText: "Discuss an Integration Project",
    ctaHref: "/#contact",
  },
];

export const DELIVERY_STAGES: DeliveryStage[] = [
  {
    number: "01",
    name: "Discovery",
    duration: "Phase 01",
    summary: "Understanding the problem, context, and operational requirements.",
    description:
      "We begin every engagement by listening. We dive deep into your business objectives, target audience needs, current software ecosystem, and specific technical constraints to ensure our technical direction is rooted in reality.",
    activities: [
      "Stakeholder interviews and operational workflow review",
      "Technical feasibility and requirement scoping",
      "Audience persona and user journey definition",
      "Identification of constraints, dependencies, and risks",
    ],
    deliverables: [
      "Project Discovery Summary",
      "Technical Requirements Specification",
      "Feasibility and Scope Assessment",
    ],
  },
  {
    number: "02",
    name: "Planning",
    duration: "Phase 02",
    summary: "Architecting the technical foundation and project roadmap.",
    description:
      "Clear technical planning prevents expensive mistakes. We design the system architecture, select the optimal tech stack, model data schemas, and define milestones with transparent timelines and deliverables.",
    activities: [
      "System architecture and database schema design",
      "Technology stack evaluation and selection",
      "API specification and third-party dependency mapping",
      "Milestone breakdown and delivery sprint schedule",
    ],
    deliverables: [
      "Architecture Blueprint",
      "Data Model & Entity Diagrams",
      "Milestone Roadmap & Sprints",
    ],
  },
  {
    number: "03",
    name: "Design",
    duration: "Phase 03",
    summary: "Crafting intuitive interfaces, user flows, and prototypes.",
    description:
      "We design interfaces that make complex interactions intuitive. Through wireframes, interactive prototypes, and design systems, we validate the visual and functional experience before writing code.",
    activities: [
      "Low-fidelity wireframing and user task flow mapping",
      "Design system tokens (colors, typography, spacing)",
      "High-fidelity responsive UI component design",
      "Interactive clickable prototypes for stakeholder review",
    ],
    deliverables: [
      "Figma Prototype & Design Files",
      "Design System Specifications",
      "Responsive Layout Blueprints",
    ],
  },
  {
    number: "04",
    name: "Development",
    duration: "Phase 04",
    summary: "Engineering clean, tested, and maintainable software.",
    description:
      "Our engineers write modular, well-documented code using modern frameworks and best practices. We build features iteratively, maintaining transparent version control and continuous integration.",
    activities: [
      "Frontend component engineering with Next.js and Tailwind CSS",
      "Backend API, database schemas, and business logic implementation",
      "Integration of third-party APIs, webhooks, and AI endpoints",
      "Regular progress updates and accessible staging environments",
    ],
    deliverables: [
      "Production-Ready Source Code",
      "Modular Component Library",
      "Private Staging Environment Access",
    ],
  },
  {
    number: "05",
    name: "Testing",
    duration: "Phase 05",
    summary: "Rigorous quality assurance, security, and performance tuning.",
    description:
      "We subject every build to comprehensive testing. From functional correctness and edge-case handling to performance optimization, responsive layouts, and security verification, we verify before we ship.",
    activities: [
      "Cross-browser and multi-viewport responsive testing",
      "Core Web Vitals and load performance optimization",
      "Security review, authentication checks, and input sanitization",
      "User acceptance testing with stakeholder walk-throughs",
    ],
    deliverables: [
      "Quality Assurance & Verification Report",
      "Core Web Vitals Audit Scorecard",
      "Security & Sanity Checklist",
    ],
  },
  {
    number: "06",
    name: "Delivery",
    duration: "Phase 06",
    summary: "Smooth deployment, documentation, and ongoing support.",
    description:
      "We manage the production release with zero-downtime deployment pipelines, provide clear administrative documentation, conduct orientation sessions, and establish straightforward maintenance pathways.",
    activities: [
      "Production deployment to edge infrastructure (e.g., Vercel, Supabase)",
      "DNS routing, SSL certificates, and environment configuration",
      "Codebase documentation and administrative user guides",
      "Post-launch monitoring and transition support",
    ],
    deliverables: [
      "Live Production Deployment",
      "Technical Documentation & Runbook",
      "Recorded Orientation & Handoff Walkthrough",
    ],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    name: "Frontend Development",
    badge: "CLIENT-SIDE",
    description: "Modern, reactive, and accessible user interfaces built for speed and engagement.",
    items: [
      { name: "TypeScript", description: "Type-safe code that prevents runtime errors" },
      { name: "React 19 / 18", description: "Declarative component-based UI engineering" },
      { name: "Next.js App Router", description: "Server components, streaming SSR, and edge routes" },
      { name: "Tailwind CSS", description: "Utility-first design tokens and responsive styling" },
      { name: "HTML5 & Semantic Web", description: "Accessible markup and search engine structured data" },
      { name: "CSS3 & Modern Animations", description: "GPU-accelerated transitions and subtle motion" },
    ],
  },
  {
    name: "Backend & Application Engineering",
    badge: "SERVER-SIDE",
    description: "Robust business logic, transactional stability, and performant API architectures.",
    items: [
      { name: "Node.js Runtime", description: "High-throughput asynchronous server environments" },
      { name: "Python", description: "Scripting, data transformation, and AI service pipelines" },
      { name: "RESTful & RPC APIs", description: "Clean, documented, and contract-tested endpoints" },
      { name: "Server-Side Development", description: "Secure session management, auth, and business rules" },
      { name: "Database-Driven Apps", description: "Transactional integrity and ACID compliance" },
    ],
  },
  {
    name: "Databases & Data Systems",
    badge: "STORAGE & PERSISTENCE",
    description: "Structured storage, relational schemas, and fast querying for business data.",
    items: [
      { name: "PostgreSQL", description: "Enterprise-grade relational database reliability" },
      { name: "Supabase", description: "Postgres infrastructure with real-time events and auth" },
      { name: "Prisma ORM", description: "Type-safe database queries and automated migrations" },
      { name: "pgvector", description: "High-performance vector similarity search in Postgres" },
      { name: "Structured Data Systems", description: "Normalized relational design and indexing strategies" },
    ],
  },
  {
    name: "Artificial Intelligence & RAG",
    badge: "INTELLIGENT SYSTEMS",
    description: "Pragmatic AI integrations focused on verifiable accuracy and bounded business utility.",
    items: [
      { name: "LLM API Integrations", description: "OpenAI, Anthropic Claude, and Google Gemini" },
      { name: "Prompt Engineering", description: "Structured prompts, few-shot conditioning, and JSON schema" },
      { name: "Vector Embeddings", description: "High-dimensional text representation for semantic retrieval" },
      { name: "RAG Architectures", description: "Retrieval-Augmented Generation grounded in custom data" },
      { name: "AI Guardrails", description: "Validation layers preventing hallucinations and leaks" },
    ],
  },
  {
    name: "Development, DevOps & Delivery",
    badge: "INFRASTRUCTURE",
    description: "Predictable, automated deployment workflows and reliable cloud infrastructure.",
    items: [
      { name: "Git & GitHub", description: "Structured branching, code reviews, and version history" },
      { name: "Vercel Edge Platform", description: "Global edge CDN deployment with sub-100ms routing" },
      { name: "CI/CD Pipelines", description: "Automated linting, building, and regression verification" },
      { name: "Testing & Debugging", description: "End-to-end test suites, logging, and error tracking" },
      { name: "Secret Management", description: "Encrypted environment variables and key rotation" },
    ],
  },
];

export const WHY_US_PRINCIPLES: WhyUsPrinciple[] = [
  {
    number: "01",
    title: "Purpose Before Complexity",
    tagline: "We build what solves the problem, avoiding unnecessary layers.",
    description:
      "Technology exists to serve a business need, not to show off engineering vanity. We select straightforward, robust approaches that deliver the required result with the least amount of moving parts.",
    keyAspects: [
      "No needless microservices or bloated frameworks",
      "Direct alignment between business goal and code structure",
      "Clarity over cleverness in architecture",
    ],
  },
  {
    number: "02",
    title: "Practical Engineering",
    tagline: "Prioritizing stability, speed, security, and maintainability.",
    description:
      "We prioritize production stability over ephemeral trends. Every system we build is designed to be easily read, tested, modified, and maintained by any skilled engineer long after the initial delivery.",
    keyAspects: [
      "Strict type safety and compile-time verification",
      "Comprehensive error handling and recovery strategies",
      "Performance as an engineering requirement, not an afterthought",
    ],
  },
  {
    number: "03",
    title: "Thoughtful Design",
    tagline: "User experience as an engineering discipline, not just an aesthetic layer.",
    description:
      "A product is only as good as its usability. We treat interface design, information hierarchy, and user feedback as core engineering challenges, ensuring software that users find natural and satisfying.",
    keyAspects: [
      "Consistent visual tokens and interaction rhythms",
      "Accessibility-first layout and contrast standards",
      "Zero-latency feeling with instantaneous visual feedback",
    ],
  },
  {
    number: "04",
    title: "Technology That Fits",
    tagline: "Adapting our stack to your context rather than forcing one template.",
    description:
      "We don't force proprietary vendor lock-in or dogmatic templates. We assess your operational constraints, team capabilities, existing software, and long-term goals to pick the right technology for your journey.",
    keyAspects: [
      "Honest feasibility assessments upfront",
      "Seamless coexistence with your current tools and databases",
      "No proprietary lock-in or obfuscated code",
    ],
  },
  {
    number: "05",
    title: "Built to Evolve",
    tagline: "Architected for modular clarity so it can grow with you.",
    description:
      "Your business will not look the same in two years. We structure applications with modular boundaries, clean database schemas, and documented APIs so new capabilities can be introduced without rewrites.",
    keyAspects: [
      "Modular components and clear separation of concerns",
      "Extensible relational schemas and database migrations",
      "Thorough documentation and clear handoff roadmaps",
    ],
  },
];

export const PROJECT_INQUIRY_TYPES: ProjectInquiryType[] = [
  {
    id: "new-website",
    title: "New Website or Digital Platform",
    subtitle: "Modern, high-performance web experience for your company or product.",
    typicalScope: "Brand presence, multi-page architectures, responsive design, fast load times, and CMS integration.",
    deliverablesSummary: "Custom Next.js website, headless CMS, SEO setup, responsive layouts, Vercel deployment.",
  },
  {
    id: "custom-webapp",
    title: "Custom Web Application or Portal",
    subtitle: "Tailored transactional application engineered around your unique workflows.",
    typicalScope: "Client portals, multi-tenant SaaS, authenticated user dashboards, and database applications.",
    deliverablesSummary: "Full-stack web application, PostgreSQL database, authentication, RBAC, API endpoints.",
  },
  {
    id: "internal-tools",
    title: "Internal Tooling & Admin Dashboards",
    subtitle: "Custom operational software to replace spreadsheets and manual work.",
    typicalScope: "Operational management consoles, inventory tracking, order processing, and administrative views.",
    deliverablesSummary: "Centralized internal dashboard, automated reports, role-based controls, data exports.",
  },
  {
    id: "ai-integration",
    title: "AI & LLM Feature Integration",
    subtitle: "Bring practical intelligence and RAG pipelines into your product.",
    typicalScope: "Document search, knowledge retrieval, customer support bots, and structured data extraction.",
    deliverablesSummary: "RAG pipeline, vector search, prompt templates, output guardrails, chat interface.",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation & Data Pipelines",
    subtitle: "Connect systems and automate multi-step operational routines.",
    typicalScope: "Data syncing between platforms, automated invoice handling, alert systems, and webhook listeners.",
    deliverablesSummary: "Automated scripts, webhook endpoints, error alerting, retry queues, task schedulers.",
  },
  {
    id: "uiux-redesign",
    title: "Design System & UI/UX Refresh",
    subtitle: "Modernize outdated interfaces and build a reusable component system.",
    typicalScope: "Interface audit, Figma prototyping, responsive redesign, and accessible component library.",
    deliverablesSummary: "Figma design system, token library, clickable prototype, developer handoff specs.",
  },
  {
    id: "api-integration",
    title: "API Integration & System Connectivity",
    subtitle: "Bridge your apps with third-party APIs, payment gateways, and databases.",
    typicalScope: "Payment gateways (Stripe/Razorpay), CRM integrations, communication APIs, and webhook processing.",
    deliverablesSummary: "Secure API middleware, data normalization, signature verification, automated sync.",
  },
  {
    id: "technical-advisory",
    title: "Technical Advisory & Architecture Review",
    subtitle: "Independent engineering guidance on tech stack, feasibility, and architecture.",
    typicalScope: "Codebase review, architecture audit, technology selection, and roadmap planning.",
    deliverablesSummary: "Architecture assessment report, feasibility analysis, optimization recommendations.",
  },
];

