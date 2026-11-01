export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  username?: string;
}

export interface PortfolioLink {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  url: string;
  actionText: string;
}

export interface FounderInfo {
  name: string;
  role: string;
  degree: string;
  field: string;
  institution: string;
  vision: string;
  bio: string[];
  links: SocialLink[];
  portfolios: PortfolioLink[];
}

export interface CompanyEmails {
  founder: string;
  team: string;
  general: string;
}

export interface CompanyMeta {
  name: string;
  shortName?: string;
  legalName: string;
  tagline: string;
  domain: string;
  statusBadge: string;
  visionSummary: string;
  emails: CompanyEmails;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  department?: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  description: string;
  bio?: string[];
  portfolioUrl?: string;
  links: SocialLink[];
  portfolios?: PortfolioLink[];
  initials?: string;
  focusAreas?: string[];
}
