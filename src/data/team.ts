import { TeamMember } from '@/types';
import { COMPANY } from './company';
import { FOUNDER } from './founder';

export const FOUNDER_MEMBER: TeamMember = {
  id: 'bhavin-shankur',
  name: 'Bhavin Shankur',
  role: 'Founder & Chief Executive Officer (CEO)',
  title: 'Founder & CEO',
  department: 'EXECUTIVE LEADERSHIP',
  degree: 'B.Tech in Computer Science & Engineering',
  field: 'Artificial Intelligence & Machine Learning',
  institution: 'MIT Vishwaprayag University',
  location: 'Solapur, Maharashtra, India',
  initials: 'BS',
  description:
    'Bhavin Shankur serves as Founder & Chief Executive Officer at Orbion Technologies while pursuing a B.Tech in Computer Science & Engineering specializing in Artificial Intelligence and Machine Learning at MIT Vishwaprayag University. His technical interests include cognitive runtime architecture, autonomous agent loops, Model Context Protocol (MCP) integrations, systems engineering, and deterministic verification. He directs the architectural vision, product strategy, and core systems development of Orbion Technologies.',
  portfolioUrl: 'https://developerportfolio-theta.vercel.app/',
  focusAreas: [
    'Cognitive Runtime Architecture',
    'Model Context Protocol (MCP)',
    'Autonomous Agent Loops',
    'Deterministic Verification',
    'Distributed Systems',
  ],
  links: [
    {
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/exobhavinss-sketch',
      username: 'exobhavinss-sketch',
    },
    {
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bhavin-shankur-8421a0371',
      username: 'bhavin-shankur',
    },
    {
      platform: 'X',
      label: 'X (Twitter)',
      url: 'https://x.com/BhavinShankur',
      username: '@BhavinShankur',
    },
    {
      platform: 'Email',
      label: 'Founder Direct',
      url: `mailto:${COMPANY.emails.founder}`,
      username: COMPANY.emails.founder,
    },
  ],
  portfolios: [
    {
      id: 'developer',
      title: 'Developer Portfolio',
      category: 'TECHNICAL & ENGINEERING',
      subtitle: 'Technical work, AI systems & engineering',
      description: "Explore Bhavin's technical projects, system architecture experiments, and development projects.",
      url: 'https://developerportfolio-theta.vercel.app/',
      actionText: 'View Developer Portfolio',
    },
  ],
};

export const CTO: TeamMember = {
  id: 'apurv-nimbarge',
  name: 'Apurv Nimbarge',
  role: 'Chief Technology Officer (CTO)',
  title: 'Chief Technology Officer',
  department: 'ENGINEERING & ARCHITECTURE',
  degree: 'B.Tech in Artificial Intelligence and Machine Learning',
  field: 'Artificial Intelligence & Machine Learning',
  institution: 'MIT Vishwaprayag University',
  location: 'Solapur, Maharashtra, India',
  initials: 'AN',
  description:
    'Apurv Nimbarge serves as Chief Technology Officer at Orbion Technologies while pursuing a B.Tech in Artificial Intelligence and Machine Learning at MIT Vishwaprayag University. His technical interests include AI-powered applications, computer vision, generative AI integrations, modern full-stack development, and software architecture. He contributes to technical planning, engineering practices, and the development of reliable digital products.',
  portfolioUrl: 'https://developer-portfolio-ruby-eight.vercel.app/',
  focusAreas: [
    'Computer Vision & Perception',
    'Generative AI Integrations',
    'Full-Stack Software Architecture',
    'API Reliability & Infrastructure',
    'Cloud Systems Engineering',
  ],
  links: [
    {
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/Apurva200631',
      username: 'Apurva200631',
    },
    {
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/apurva-nimbarge-a40310353',
      username: 'apurva-nimbarge',
    },
    {
      platform: 'X',
      label: 'X (Twitter)',
      url: 'https://x.com/apurv2116',
      username: '@apurv2116',
    },
    {
      platform: 'Email',
      label: 'CTO Direct',
      url: `mailto:${COMPANY.emails.team}`,
      username: COMPANY.emails.team,
    },
  ],
  portfolios: [
    {
      id: 'developer',
      title: 'Developer Portfolio',
      category: 'TECHNICAL & ENGINEERING',
      subtitle: 'Technical work, AI integrations & engineering',
      description: "Explore Apurv's technical projects, AI integrations, and modern full-stack development work.",
      url: 'https://developer-portfolio-ruby-eight.vercel.app/',
      actionText: 'View Developer Portfolio',
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [FOUNDER_MEMBER, CTO];

export { FOUNDER };
