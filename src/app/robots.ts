import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/constants';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api/', '/auth/', '/login', '/register'],
    },
    sitemap: `${COMPANY.domain}/sitemap.xml`,
  };
}
