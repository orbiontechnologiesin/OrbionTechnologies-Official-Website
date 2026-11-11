"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getOrCreateId(storageKey: string, prefix: string, storage: Storage): string {
  try {
    let id = storage.getItem(storageKey);
    if (!id || !id.startsWith(prefix)) {
      id = `${prefix}${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
      storage.setItem(storageKey, id);
    }
    return id;
  } catch {
    return `${prefix}ephemeral_${Date.now()}`;
  }
}

function detectDevice(): "desktop" | "mobile" | "tablet" | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function detectBrowser(): string {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";
  return "Other";
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Respect user privacy signals: Do Not Track
    if (typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1")) {
      return;
    }

    // Do not track internal administrative areas or API endpoints
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Avoid duplicate firing on identical path within the same render cycle
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (lastTrackedPath.current === fullPath) {
      return;
    }
    lastTrackedPath.current = fullPath;

    try {
      const visitorId = getOrCreateId("orbion_vis", "vis_", window.localStorage);
      const sessionId = getOrCreateId("orbion_ses", "ses_", window.sessionStorage);
      const deviceCategory = detectDevice();
      const browserCategory = detectBrowser();

      let referrerDomain: string | null = null;
      if (document.referrer) {
        try {
          const refUrl = new URL(document.referrer);
          if (refUrl.hostname !== window.location.hostname) {
            referrerDomain = refUrl.hostname;
          }
        } catch {
          // ignore invalid referrer
        }
      }

      const utmSource = searchParams?.get("utm_source") || null;
      const utmMedium = searchParams?.get("utm_medium") || null;
      const utmCampaign = searchParams?.get("utm_campaign") || null;

      // Event classification
      let eventName = "page_view";
      if (pathname.startsWith("/products/")) eventName = "product_view";
      else if (pathname.startsWith("/blog/")) eventName = "blog_view";
      else if (pathname === "/contact") eventName = "contact_visit";

      const payload = {
        eventName,
        pagePath: pathname,
        referrerDomain,
        visitorId,
        sessionId,
        deviceCategory,
        browserCategory,
        utmSource,
        utmMedium,
        utmCampaign,
      };

      const payloadStr = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([payloadStr], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/event", blob);
      } else {
        fetch("/api/analytics/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payloadStr,
          keepalive: true,
        }).catch(() => {
          // Silent catch for non-blocking analytics
        });
      }
    } catch {
      // Never throw on client analytics
    }
  }, [pathname, searchParams]);

  return null;
}

