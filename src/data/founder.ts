import { FounderInfo } from '@/types';
import { COMPANY } from './company';

export const FOUNDER: FounderInfo = {
  name: 'Bhavin Shankur',
  role: 'Founder & CEO, Orbion Technologies',
  degree: 'B.Tech CSE',
  field: 'Artificial Intelligence & Machine Learning',
  institution: 'MIT Vishwaprayag University, Solapur',
  vision:
    'My vision is to build technology that makes intelligent software accessible to every business. I believe the next generation of businesses will not rely only on traditional software. They will work alongside intelligent AI systems capable of understanding tasks, making decisions, using tools, and executing workflows.',
  bio: [
    'Bhavin Shankur is a technologist and engineering student specializing in Artificial Intelligence and Machine Learning at MIT Vishwaprayag University, Solapur.',
    'Passionate about AI agents, systems engineering, automation, and real-world utility, he chose to start building the foundational layer of autonomous enterprise operations today rather than waiting.',
    'Orbion Technologies is the beginning of that journey — bridging state-of-the-art machine intelligence with practical, reliable business infrastructure.',
  ],
  links: [
    {
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bhavin-shankur-8421a0371',
      username: 'bhavin-shankur',
    },
    {
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/exobhavinss-sketch',
      username: 'exobhavinss-sketch',
    },
    {
      platform: 'X',
      label: 'X (Twitter)',
      url: 'https://x.com/BhavinShankur',
      username: '@BhavinShankur',
    },
    {
      platform: 'Instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/bhavinnh/',
      username: '@bhavinnh',
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
      subtitle: 'Technical work, projects & engineering',
      description: "Explore Bhavin's technical work, projects, and development experience.",
      url: 'https://developerportfolio-theta.vercel.app/',
      actionText: 'View Developer Portfolio',
    },
    {
      id: 'personal',
      title: 'Personal Portfolio',
      category: 'FOUNDER & PERSONAL JOURNEY',
      subtitle: 'Personal background, journey & interests',
      description: "Learn more about Bhavin's background, journey, interests, and personal work.",
      url: 'https://personal-portfolio-wvio.vercel.app/',
      actionText: 'View Personal Portfolio',
    },
  ],
};
