export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const COMPANY = {
  name: "Orbion Technologies",
  legalName: "Orbion Technologies",
  tagline: "Engineering What's Next.",
  heroHeadline: "Building technology for what's ahead.",
  heroSubheadline:
    "Intelligent software, AI systems and digital products designed to solve meaningful problems.",
  description:
    "Orbion Technologies is an early-stage technology and deep-tech startup focused on developing intelligent software solutions, artificial intelligence systems, workflow automation and digital products.",
  vision:
    "Developing an AI Operating System for modern businesses to streamline operations, automate workflows, and make intelligent systems practical.",
  domain: "https://orbiontechnologies.in",
  github: "https://github.com/orbiontechnologiesin",
  repo: "https://github.com/orbiontechnologiesin/OrbionTechnologies-Official-Website",
  emails: {
    general: "enquiry@orbiontechnologies.in",
    founder: "bhavin@orbiontechnologies.in",
    cofounder: "apurv@orbiontechnologies.in",
  },
  founders: [
    {
      name: "Bhavin Shankur",
      role: "Founder",
      designation: "Founder — Orbion Technologies",
      focus: "Cognitive runtime systems, autonomous agent loops, and systems architecture",
      github: "https://github.com/exobhavinss-sketch",
      linkedin: "https://www.linkedin.com/in/bhavin-shankur-8421a0371",
      email: "bhavin@orbiontechnologies.in",
    },
    {
      name: "Apurv Nimbarge",
      role: "Co-Founder",
      designation: "Co-Founder — Orbion Technologies",
      focus: "Technical planning, full-stack engineering, and digital product reliability",
      github: "https://github.com/Apurva200631",
      linkedin: "https://www.linkedin.com/in/apurva-nimbarge-a40310353",
      email: "apurv@orbiontechnologies.in",
    },
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Technology", href: "/#technology" },
  { label: "Contact", href: "/contact" },
];

export const CAPABILITIES = [
  {
    id: "intelligent-systems",
    eyebrow: "01 / SYSTEMS ARCHITECTURE",
    title: "Intelligent Systems",
    description:
      "AI-powered systems and intelligent workflows designed to make business operations more efficient, predictable, and verifiable.",
    details: [
      "Autonomous reasoning loops and task decomposition",
      "Model Context Protocol (MCP) integrations",
      "Deterministic schema validation and guardrails",
    ],
  },
  {
    id: "software-engineering",
    eyebrow: "02 / PRODUCT DEVELOPMENT",
    title: "Software Engineering",
    description:
      "Thoughtfully engineered software applications and digital platforms built with modern architectures, strict type safety, and minimal latency.",
    details: [
      "Instrument-grade web interfaces and distributed APIs",
      "High-reliability backend architectures",
      "Enduring code craft and maintainable foundations",
    ],
  },
  {
    id: "automation-ai",
    eyebrow: "03 / WORKFLOW ORCHESTRATION",
    title: "Automation & AI",
    description:
      "Intelligent automation and agentic workflows that help simplify repetitive processes and connect isolated tools across the enterprise.",
    details: [
      "Multi-agent task orchestration across tools",
      "Persistent state and context compaction",
      "Human-in-the-loop review and governance",
    ],
  },
];

export const APPROACH_STEPS = [
  {
    step: "01",
    title: "Understand the Problem",
    description:
      "We begin by deconstructing the actual operational bottleneck and identifying where manual coordination breaks down, refusing to build technology looking for a problem.",
  },
  {
    step: "02",
    title: "Design the Right Solution",
    description:
      "We architect systems with simplicity and restraint. Every interface, data model, and interaction is designed to eliminate friction and maximize human clarity.",
  },
  {
    step: "03",
    title: "Engineer with Purpose",
    description:
      "We implement with uncompromising standards: type safety, deterministic schemas, clear boundaries, and resilient error recovery rather than superficial demos.",
  },
  {
    step: "04",
    title: "Improve Continuously",
    description:
      "We iterate based on verified real-world telemetry, systematically refining performance, reliability, and usability for sustainable long-term value.",
  },
];

export const BRAND_VALUES = [
  {
    title: "Engineering Excellence",
    description:
      "We uphold high standards of code craft, architectural discipline, and performance across every layer.",
  },
  {
    title: "Innovation with Purpose",
    description:
      "We pursue advanced technology only when it serves a concrete purpose and delivers tangible real-world utility.",
  },
  {
    title: "Ownership & Accountability",
    description:
      "We take end-to-end responsibility for the reliability, security, and long-term consequences of what we create.",
  },
  {
    title: "Long-Term Thinking",
    description:
      "We invest in durable foundations, open standards, and sustainable architectures over short-lived shortcuts.",
  },
];

