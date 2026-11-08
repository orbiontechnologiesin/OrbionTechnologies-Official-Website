"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticDock, type DockItemData } from "@/components/ui/magnetic-dock";

export function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isProductsPage =
    pathname === "/products" || (pathname ? pathname.startsWith("/products/") : false);
  const isSolutionsPage = pathname === "/solutions";
  const isIndustriesPage = pathname === "/industries";
  const isServicesPage = pathname === "/services";
  const isPricingPage = pathname === "/pricing";
  const isContactPage = pathname === "/contact";
  const isSubPage =
    isAboutPage || isProductsPage || isSolutionsPage || isIndustriesPage || isServicesPage || isPricingPage || isContactPage;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    isAboutPage
      ? "about"
      : isProductsPage
      ? "products"
      : isServicesPage
      ? "services"
      : isContactPage
      ? "contact"
      : "hero"
  );

  useEffect(() => {
    if (isSubPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section for subtle indicator
      const sections = ["hero", "what-we-do", "approach", "technology", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  // Keep scroll blur detection on subpages too
  useEffect(() => {
    if (!isSubPage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  const navDockItems: DockItemData[] = isSubPage
    ? [
        {
          id: "home",
          label: "Home",
          href: "/",
          isActive: false,
        },
        {
          id: "about",
          label: "About",
          href: "/about",
          isActive: isAboutPage,
        },
        {
          id: "products",
          label: "Products",
          href: "/products",
          isActive: isProductsPage,
        },
        {
          id: "services",
          label: "Services",
          href: "/services",
          isActive: isServicesPage,
        },
        {
          id: "technology",
          label: "Technology",
          href: "/#technology",
          isActive: false,
        },
        {
          id: "contact",
          label: "Contact",
          href: "/contact",
          isActive: isContactPage,
        },
      ]
    : [
        {
          id: "home",
          label: "Home",
          href: "#hero",
          isActive: activeSection === "hero",
        },
        {
          id: "about",
          label: "About",
          href: "/about",
          isActive: false,
        },
        {
          id: "products",
          label: "Products",
          href: "/products",
          isActive: false,
        },
        {
          id: "services",
          label: "Services",
          href: "/services",
          isActive: false,
        },
        {
          id: "technology",
          label: "Technology",
          href: "#technology",
          isActive: activeSection === "technology",
        },
        {
          id: "contact",
          label: "Contact",
          href: "/contact",
          isActive: false,
        },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-limestone-light/95 backdrop-blur-md shadow-[0_2px_12px_rgba(23,59,63,0.06)] border-b border-graphite/10 py-3"
          : "bg-limestone-light/80 backdrop-blur-sm border-b border-graphite/5 py-4 lg:py-4.5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href={isSubPage ? "/" : "#hero"}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-petrol rounded"
            aria-label="Orbion Technologies - Home"
          >
            <div className="relative h-7 w-52 sm:h-8 sm:w-64 md:w-72 flex items-center">
              <Image
                src="/brand/Head Banner/orbion-head-banner.png"
                alt="Orbion Technologies"
                fill
                sizes="(max-width: 640px) 208px, 288px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Desktop Text-Based Magnetic Dock Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <MagneticDock
              items={navDockItems}
              textMode={true}
              variant="text"
              maxScale={1.16}
              magneticDistance={110}
              className="py-1"
            />
          </div>

          {/* Desktop Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/contact"
              variant="petrol"
              size="sm"
              className="text-xs font-semibold tracking-wide"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile / Tablet Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/contact"
              variant="petrol"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              Contact
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-graphite hover:text-petrol hover:bg-graphite/5 rounded-md focus:outline-none focus:ring-2 focus:ring-petrol"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-pure-white/95 backdrop-blur-md rounded-2xl border border-graphite/10 mt-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navDockItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 text-base font-medium text-graphite hover:text-petrol hover:bg-limestone-light rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                  )}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-graphite/10">
                <Button
                  href={isSubPage ? "/#contact" : "#contact"}
                  variant="petrol"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get in Touch
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
