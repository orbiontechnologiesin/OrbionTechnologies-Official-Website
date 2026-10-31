import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Inquiries — Connect with Leadership',
  description:
    'Get in touch with the Orbion Technologies team for enterprise inquiries, architecture evaluation, technical collaboration, and partnerships.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Inquiries — Connect with Leadership',
    description:
      'Get in touch with the Orbion Technologies team for enterprise inquiries, architecture evaluation, technical collaboration, and partnerships.',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

