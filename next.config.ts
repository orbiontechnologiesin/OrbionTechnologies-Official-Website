import type { NextConfig } from "next";

/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — PRODUCTION NEXT.JS CONFIGURATION
 * ==============================================================================
 * Optimized for Vercel (Edge & Serverless) and Render (Standalone Docker Container)
 * - Standalone output: minimal portable distribution for Render & Docker (~100MB)
 * - Module optimization: treeshake heavy packages (lucide-react, framer-motion)
 * - Advanced Image Optimization: AVIF + WebP with aggressive immutable caching
 * - Security Headers: OWASP-compliant headers (CSP-ready, frame-busting, nosniff)
 * - Compression: Gzip & Brotli via upstream edge or Node.js server
 * ==============================================================================
 */

const nextConfig: NextConfig = {
  // Generate a standalone bundle for containerized deployment (Render / Docker)
  // Copies only production-necessary node_modules into .next/standalone
  output: "standalone",

  // Harden server security by stripping identifying server banners
  poweredByHeader: false,

  // Enable gzip and Deflate compression for response bodies
  compress: true,

  // Strict mode for React 19 component lifecycle safety
  reactStrictMode: true,

  // Experimental module import optimization for bundle shrinking
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Strip console.log calls in production to reduce bundle payload and avoid leaks
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Production image optimization pipeline
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "orbiontechnologies.in",
      },
    ],
  },

  // Production security and caching headers
  async headers() {
    return [
      {
        // Global security headers applied to all application routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // Cache brand assets (logos, head banner, icons)
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
