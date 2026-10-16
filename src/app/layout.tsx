import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { COMPANY, BRAND_ASSETS } from '@/lib/constants';
import { Navbar, Footer } from '@/layouts';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.domain),
  title: {
    default: `${COMPANY.name} — AI Operating System for Modern Businesses`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.visionSummary,
  keywords: [
    'Orbion Technologies',
    'Orbion',
    'AI Operating System',
    'Enterprise AI',
    'Agentic Systems',
    'Autonomous Workflows',
    'Model Context Protocol',
    'Business Automation',
    'Bhavin Shankur',
    'Apurv Nimbarge',
  ],
  authors: [
    { name: 'Bhavin Shankur', url: COMPANY.domain },
    { name: 'Apurv Nimbarge', url: COMPANY.domain },
  ],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: BRAND_ASSETS.faviconSvg, type: 'image/svg+xml' },
      { url: BRAND_ASSETS.faviconPng, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: BRAND_ASSETS.appIconPng, sizes: '1024x1024', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: COMPANY.domain,
    title: `${COMPANY.name} — AI Operating System for Modern Businesses`,
    description: COMPANY.visionSummary,
    siteName: COMPANY.name,
    images: [
      {
        url: '/brand/png/orbion-logo-white.png',
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — AI Operating System for Modern Businesses`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — AI Operating System for Modern Businesses`,
    description: COMPANY.visionSummary,
    creator: '@BhavinShankur',
    images: ['/brand/png/orbion-logo-white.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://orbion.in/#organization',
      name: 'Orbion Technologies',
      legalName: 'Orbion Technologies',
      url: 'https://orbion.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://orbion.in/brand/png/orbion-logo-white.png',
      },
      founder: {
        '@type': 'Person',
        name: 'Bhavin Shankur',
        jobTitle: 'Founder & CEO',
        sameAs: [
          'https://www.linkedin.com/in/bhavin-shankur-8421a0371',
          'https://github.com/exobhavinss-sketch',
          'https://x.com/BhavinShankur',
          'https://www.instagram.com/bhavinnh/',
        ],
      },
      member: [
        {
          '@type': 'Person',
          name: 'Bhavin Shankur',
          jobTitle: 'Founder & CEO',
          sameAs: [
            'https://www.linkedin.com/in/bhavin-shankur-8421a0371',
            'https://github.com/exobhavinss-sketch',
            'https://x.com/BhavinShankur',
          ],
        },
        {
          '@type': 'Person',
          name: 'Apurv Nimbarge',
          jobTitle: 'Chief Technology Officer (CTO)',
          sameAs: [
            'https://www.linkedin.com/in/apurva-nimbarge-a40310353',
            'https://github.com/Apurva200631',
            'https://x.com/apurv2116',
          ],
        },
      ],
      description:
        'Orbion Technologies is building an AI Operating System for modern businesses, enabling organizations to operate with intelligent, autonomous AI systems capable of executing workflows across business functions.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://orbion.in/#website',
      url: 'https://orbion.in',
      name: 'Orbion Technologies',
      publisher: {
        '@id': 'https://orbion.in/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-canvas text-text-primary antialiased min-h-screen flex flex-col justify-between selection:bg-brand-accent selection:text-white`}
      >
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-accent focus:text-white focus:rounded-xs focus:font-mono focus:text-xs focus:shadow-subtle"
        >
          Skip to main content
        </a>

        <Providers>
          {/* Global Persistent Header */}
          <Navbar />

          {/* Primary Content Target */}
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>

          {/* Global Persistent Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
