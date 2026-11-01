'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, User as UserIcon } from 'lucide-react';
import { PRIMARY_NAV } from '@/data/navigation';
import { Button, Badge, Logo } from '@/components/ui';
import { useSession } from '@/lib/auth/client';

export function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu if viewport is resized to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  const isDashboardActive = pathname === '/dashboard';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          mobileMenuOpen
            ? 'dark:bg-canvas bg-[#FAFAFC] border-b dark:border-border-hairline border-[#E7E8ED]'
            : scrolled
            ? 'dark:bg-canvas/90 bg-[#FAFAFC]/90 backdrop-blur-md border-b dark:border-border-hairline border-[#E7E8ED] shadow-subtle'
            : 'dark:bg-canvas/60 bg-[#FAFAFC]/75 backdrop-blur-sm border-b dark:border-border-hairline/50 border-[#E7E8ED]/75'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-6 xl:px-8 h-16 sm:h-18 flex items-center justify-between relative">
          {/* Brand Logo Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded-xs z-10"
            aria-label="Orbion Technologies Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo priority size="sm" className="h-[18px] min-[360px]:h-[20px] min-[390px]:h-[22px] md:h-[22px] lg:h-7" />
          </Link>

          {/* Desktop Navigation Links — Centered in the central area */}
          <nav
            className="hidden md:flex items-center justify-center flex-1 mx-2 lg:mx-6 gap-3.5 lg:gap-6 xl:gap-7 text-sm font-medium pointer-events-auto"
            aria-label="Main Navigation"
          >
            {PRIMARY_NAV.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-150 py-1 font-sans text-[13px] tracking-normal whitespace-nowrap ${
                    isActive
                      ? 'dark:text-text-pure text-[#17181C] font-semibold'
                      : 'dark:text-text-secondary text-[#666A73] dark:hover:text-text-pure hover:text-[#17181C]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Status — Grouped at far right */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0 z-10">
            <Badge variant="status" indicatorColor="brand" className="hidden xl:inline-flex text-[10px]">
              ARCH_V1.0
            </Badge>

            {session?.user ? (
              <Link href="/dashboard">
                <Button
                  variant={isDashboardActive ? 'accent' : 'secondary'}
                  size="sm"
                  className={`gap-1.5 font-mono text-xs ${
                    isDashboardActive ? 'shadow-accent-glow ring-1 ring-brand-accent/50' : ''
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-in">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Header Actions (Sign In + Menu Toggle) */}
          <div className="flex md:hidden items-center gap-2.5 shrink-0 z-10">
            {session?.user ? (
              <Link href="/dashboard">
                <Button
                  variant={isDashboardActive ? 'accent' : 'secondary'}
                  size="sm"
                  className="h-8 px-2.5 text-xs font-mono gap-1"
                >
                  <UserIcon className="w-3 h-3 text-brand-cyan" />
                  <span>OS</span>
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-in">
                <Button variant="secondary" size="sm" className="h-8 px-2.5 text-xs">
                  Sign In
                </Button>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xs border dark:border-border-hairline border-[#E7E8ED] dark:text-text-secondary text-[#17181C] dark:hover:text-white hover:bg-surface-card transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 dark:text-text-pure text-[#17181C]" /> : <Menu className="w-5 h-5 dark:text-text-pure text-[#17181C]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden fixed inset-x-0 top-16 sm:top-18 bottom-0 z-40 dark:bg-canvas bg-[#FAFAFC] overflow-y-auto animate-fade-in"
        >
          <div className="min-h-full flex flex-col justify-between p-6 max-w-lg mx-auto">
            <nav className="flex flex-col space-y-1 pt-2" aria-label="Mobile Navigation">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest px-3 py-1 mb-2">
                NAVIGATION DIRECTORY
              </span>

              {PRIMARY_NAV.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`flex items-center justify-between px-3 py-3.5 rounded-xs text-base font-medium transition-colors border-b dark:border-border-hairline/40 border-[#E7E8ED] min-h-[48px] ${
                      isActive
                        ? 'dark:text-white text-[#17181C] dark:bg-surface-card bg-white border-l-2 border-brand-accent'
                        : 'dark:text-text-primary text-[#52525B] dark:hover:text-white hover:text-[#17181C] dark:hover:bg-surface-card hover:bg-[#F3F4F7]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-base font-sans font-medium tracking-tight">{link.label}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-text-muted'}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 mt-6 border-t dark:border-border-hairline border-[#E7E8ED] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted px-1">
                <span>ORBION TECHNOLOGIES OS</span>
                <span className="text-brand-accent">ONLINE</span>
              </div>

              {session?.user ? (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isDashboardActive ? 'accent' : 'secondary'}
                    size="lg"
                    className="w-full justify-center gap-2 font-mono text-xs h-11"
                  >
                    <UserIcon className="w-4 h-4 text-brand-cyan" />
                    <span>Enter Enterprise Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/auth/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" size="md" className="w-full justify-center h-10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" size="md" className="w-full justify-center h-10">
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" className="w-full h-11">
                  Initiate Dialogue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
