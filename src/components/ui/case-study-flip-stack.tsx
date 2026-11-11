"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { RotateCw, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface CaseStudyFlipItem {
  id?: string;
  number?: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  background: string;
  foreground?: string;
  // Extended interactive fields for rich product showcase
  tagline?: string;
  status?: string;
  solve?: string;
  plannedCapabilities?: string[];
  intendedUsers?: string;
  href?: string;
  ctaLabel?: string;
  accentColor?: string;
  visual?: React.ReactNode;
}

interface CaseStudyFlipStackProps {
  items?: CaseStudyFlipItem[];
  className?: string;
  hint?: string;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  endLabel?: React.ReactNode;
  as?: "main" | "section" | "div";
  showIntro?: boolean;
  showOutro?: boolean;
  onActiveChange?: (index: number) => void;
}

const DEFAULT_ITEMS: CaseStudyFlipItem[] = [
  {
    eyebrow: "Fintech",
    title: "Boosted conversion by 42% with a product-led redesign",
    description:
      "We restructured the onboarding flow and clarified the value proposition, helping the platform turn more visitors into activated users.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Portrait framed by tropical greenery",
    background: "#a94808",
    foreground: "#fff7ed",
  },
  {
    eyebrow: "Hospitality",
    title: "A slower digital experience for a faster-growing retreat",
    description:
      "A cinematic booking journey brings the landscape forward, simplifies room selection, and gives every stay a stronger sense of place.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "A person overlooking a mountain landscape",
    background: "#067b8f",
    foreground: "#ecfeff",
  },
  {
    eyebrow: "Culture",
    title: "Turning a living archive into something you can wander through",
    description:
      "We paired bold editorial typography with an intuitive collection system, making decades of work feel immediate, playful, and alive.",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Colorful artwork in a contemporary gallery",
    background: "#ba075f",
    foreground: "#fff1f7",
  },
  {
    eyebrow: "Climate",
    title: "Making complex energy data feel clear enough to act on",
    description:
      "An approachable visual system turns live infrastructure data into useful decisions for operators, partners, and the communities they serve.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Wind turbines across a green landscape",
    background: "#3322a8",
    foreground: "#f3f1ff",
  },
];

function FlipCard({
  item,
  index,
  total,
  progress,
  reduceMotion,
}: {
  item: CaseStudyFlipItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd =
    index === 0 ? 0.0001 : Math.min(start, entryStart + segment * 0.7);
  const exitStart = start;
  const exitEnd = end;
  const stackedCardGap = Math.min(24, 72 / Math.max(total - 1, 1));
  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 12, 34);
  const restingScale = 1 - Math.min(index * 0.012, 0.035);

  const isLast = index === total - 1;

  const exitYPercent = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, -118]
  );
  const exitStackOffset = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, stackedOffset]
  );
  const exitY = useMotionTemplate`calc(${exitYPercent}% + ${exitStackOffset}px)`;
  const rotateX = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, 22]
  );
  const opacity = useTransform(
    progress,
    [exitStart, exitStart + segment * 0.5, exitEnd],
    reduceMotion && !isLast
      ? [1, 0.5, 0]
      : !isLast
      ? [1, 1, 0]
      : [1, 1, 1]
  );
  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1]
  );
  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0]
  );

  const hasFlippableContent = Boolean(
    item.solve || item.plannedCapabilities || item.href
  );

  return (
    <motion.article
      className="absolute inset-x-0 top-0 h-full w-full will-change-transform [perspective:1200px]"
      style={{
        y: exitY,
        rotateX,
        opacity,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative h-full w-full rounded-[clamp(18px,2vw,30px)] shadow-[0_20px_60px_rgba(10,25,20,0.32)]"
        style={{
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        {/* 3D Flip Wrapper */}
        <div
          className={cn(
            "relative h-full w-full rounded-[clamp(18px,2vw,30px)] transition-transform duration-500 [transform-style:preserve-3d]",
            reduceMotion ? "" : "transition-transform",
            isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
          )}
        >
          {/* ============================================================= */}
          {/* FRONT FACE                                                     */}
          {/* ============================================================= */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full rounded-[clamp(16px,2vw,28px)] overflow-hidden border border-white/10 [backface-visibility:hidden] [transform:rotateY(0deg)] flex flex-col p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_rgba(10,25,20,0.32)]",
              isFlipped && "pointer-events-none opacity-0"
            )}
            style={{
              backgroundColor: item.background,
              color: item.foreground ?? "#FAF8F5",
            }}
          >
            {/* Top Metadata Header: Number, Eyebrow & Status */}
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg sm:text-2xl font-mono font-bold tracking-tight text-[#C36B3B] shrink-0">
                  {item.number ?? String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 font-mono text-xs">/</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/70 font-medium truncate max-w-[150px] sm:max-w-none">
                  {item.eyebrow}
                </span>
              </div>

              {item.status && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#C36B3B]/15 border border-[#C36B3B]/35 text-[#C36B3B] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C36B3B] animate-pulse" />
                  <span>{item.status}</span>
                </span>
              )}
            </div>

            {/* Middle Grid: Information & Visual */}
            <div className="grid h-full sm:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-8 items-center py-3 sm:py-4 min-h-0 flex-1 overflow-hidden">
              {/* Left Column: Titles & Descriptions */}
              <div className="flex flex-col justify-center space-y-2.5 sm:space-y-4 min-w-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                    {item.title}
                  </h3>
                  {item.tagline && (
                    <p className="text-xs sm:text-base font-mono font-medium text-[#C36B3B]">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm lg:text-[15px] leading-relaxed text-white/80 line-clamp-3 sm:line-clamp-none">
                  {item.description}
                </p>

                {/* Mobile Subsystem Badge */}
                <div className="sm:hidden pt-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C36B3B]" />
                    <span>Architectural Specification Scope</span>
                  </div>
                </div>

                {/* Planned Highlights preview on desktop */}
                {item.plannedCapabilities && item.plannedCapabilities.length > 0 && (
                  <div className="pt-2 hidden sm:block">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-2">
                      Planned Capabilities Preview
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.plannedCapabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/90"
                        >
                          <span className="text-[#C36B3B]">&rsaquo;</span>
                          <span className="truncate max-w-[180px]">{cap}</span>
                        </span>
                      ))}
                      {item.plannedCapabilities.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-[11px] font-mono text-white/50">
                          +{item.plannedCapabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Conceptual Abstract Visual or Image (Desktop & Tablet) */}
              <div className="hidden sm:flex relative h-full min-h-[200px] rounded-2xl overflow-hidden items-center justify-center">
                {item.visual ? (
                  <div className="w-full h-full flex items-center justify-center [&>div]:w-full [&>div]:h-full [&>div]:shadow-none [&>div]:border-white/10">
                    {item.visual}
                  </div>
                ) : item.image ? (
                  <div className="relative w-full h-full min-h-[180px] overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="object-cover"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-6 text-center text-xs font-mono text-white/60">
                    Architectural Blueprint Visualization
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Interaction Cue & Flip Trigger */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono shrink-0">
              {hasFlippableContent ? (
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/10 hover:bg-[#C36B3B] text-white hover:text-white transition-colors font-semibold shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C36B3B] text-[11px] sm:text-xs"
                  aria-label={`Flip ${item.title} card for detailed capabilities`}
                >
                  <RotateCw className="w-3.5 h-3.5 shrink-0" />
                  <span>Flip for Details &amp; Scope &rarr;</span>
                </button>
              ) : (
                <span className="text-white/50 text-[11px]">Pre-Release Specification</span>
              )}

              <div className="flex items-center gap-1.5 text-white/50 text-[10px] sm:text-[11px]">
                <span className="hidden sm:inline">Scroll to advance</span>
                <span>&darr;</span>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* BACK / FLIP FACE                                               */}
          {/* ============================================================= */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full rounded-[clamp(18px,2vw,30px)] overflow-hidden border border-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(10,25,20,0.32)]",
              !isFlipped && "pointer-events-none opacity-0"
            )}
            style={{
              backgroundColor: item.background,
              color: item.foreground ?? "#FAF8F5",
            }}
          >
            {/* Top Back Header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[#C36B3B]">
                  {item.number ?? String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 font-mono text-sm">/</span>
                <span className="text-sm font-semibold tracking-tight text-white">
                  {item.title} &bull; Architecture Scope
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C36B3B]/15 border border-[#C36B3B]/35 text-[#C36B3B] text-[11px] font-mono font-bold tracking-wider shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C36B3B]" />
                <span>COMING SOON</span>
              </span>
            </div>

            {/* Back Content Scroll Container */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-3 sm:py-4 space-y-3 sm:space-y-4 pr-1 sm:pr-2 text-xs font-mono">
              {/* Designed to Solve */}
              {item.solve && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#C36B3B] font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>What This Product is Designed to Solve</span>
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                    {item.solve}
                  </p>
                </div>
              )}

              {/* Planned Capabilities */}
              {item.plannedCapabilities && item.plannedCapabilities.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold block">
                    Planned Capabilities &amp; Features
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.plannedCapabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C36B3B] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Intended Business Users */}
              {item.intendedUsers && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <span className="text-[#C36B3B] font-bold">&rsaquo;</span>
                  <div className="text-[11px]">
                    <span className="text-white/60 font-medium">Intended For: </span>
                    <span className="text-white/90 font-medium">{item.intendedUsers}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono shrink-0">
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40 text-[10px] sm:text-xs"
              >
                <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>&larr; Overview</span>
              </button>

              {item.href && (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#C36B3B] hover:bg-[#A94808] text-white font-bold tracking-wide transition-colors group/nav text-[10px] sm:text-xs shrink-0"
                >
                  <span>{item.ctaLabel ?? "Explore Specification"}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/nav:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function CaseStudyFlipStack({
  items = DEFAULT_ITEMS,
  className,
  hint = "Scroll to Explore",
  heading = "Orbion Product Ecosystem",
  subheading = "Seven planned software products engineered around real business workflows.",
  endLabel,
  as: Component = "section",
  showIntro = true,
  showOutro = false,
  onActiveChange,
}: CaseStudyFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const safeItems = items.length > 0 ? items : DEFAULT_ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const cardProgress = reduceMotion ? scrollYProgress : smoothProgress;

  useMotionValueEvent(cardProgress, "change", (latest) => {
    const idx = Math.min(
      Math.floor(latest * safeItems.length),
      safeItems.length - 1
    );
    if (idx !== activeIndex && idx >= 0) {
      setActiveIndex(idx);
      onActiveChange?.(idx);
    }
  });

  function jumpToCard(i: number) {
    if (!stackRef.current) return;
    const rect = stackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const stackTop = rect.top + scrollTop;
    const cardHeight = stackRef.current.offsetHeight / (safeItems.length + 0.5);
    window.scrollTo({
      top: stackTop + i * cardHeight + 20,
      behavior: "smooth",
    });
  }

  return (
    <Component
      id="product-showcase"
      className={cn("relative font-sans text-graphite", className)}
    >
      {/* Optional Editorial Intro Section */}
      {showIntro && (
        <div className="pt-8 pb-12 sm:pb-16 text-center max-w-3xl mx-auto px-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-xs font-mono font-semibold tracking-wider text-copper mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
            <span>INTERACTIVE FLIP STACK SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite leading-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-base sm:text-lg text-graphite-muted leading-relaxed">
              {subheading}
            </p>
          )}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-copper font-medium">
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              &darr;
            </motion.span>
            <span>{hint}</span>
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={{
                duration: 1.4,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              &darr;
            </motion.span>
          </div>
        </div>
      )}

      {/* Sticky Scroll Stack Container */}
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${(Math.max(safeItems.length, 1) + 0.6) * 100}vh` }}
      >
        <div className="sticky top-16 sm:top-20 flex h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-12 py-4">
          {/* Active Product Tracker & Quick Navigation Bar */}
          <div className="mx-auto w-full max-w-[960px] mb-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-pure-white/80 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-graphite/10 shadow-xs">
            <div className="flex items-center gap-2.5 text-graphite-muted min-w-0">
              <span className="font-bold text-[#C36B3B] shrink-0">
                PRODUCT {String(activeIndex + 1).padStart(2, "0")} / {String(safeItems.length).padStart(2, "0")}
              </span>
              <span className="text-graphite/20">&bull;</span>
              <span className="font-semibold text-graphite truncate">
                {safeItems[activeIndex]?.title}
              </span>
            </div>

            {/* Jump Indicators */}
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Product Showcase Navigation"
            >
              {safeItems.map((prod, i) => (
                <button
                  key={prod.id ?? prod.title ?? i}
                  type="button"
                  role="tab"
                  onClick={() => jumpToCard(i)}
                  className={cn(
                    "h-2 transition-all rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C36B3B]",
                    activeIndex === i
                      ? "w-7 bg-[#C36B3B]"
                      : "w-2 bg-graphite/20 hover:bg-graphite/40"
                  )}
                  aria-label={`Jump to ${prod.title}`}
                  aria-selected={activeIndex === i}
                />
              ))}
            </div>
          </div>

          {/* Cards 3D Perspective Viewport */}
          <div className="relative mx-auto h-[440px] sm:h-[500px] lg:h-[540px] w-full max-w-[960px] [perspective:1200px]">
            {[...safeItems].reverse().map((item, reverseIndex) => {
              const index = safeItems.length - reverseIndex - 1;
              return (
                <FlipCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  total={safeItems.length}
                  progress={cardProgress}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional Outro Section */}
      {showOutro && endLabel && (
        <section className="flex min-h-[40vh] items-center justify-center px-5 sm:px-10">
          <p className="text-center text-3xl sm:text-5xl font-semibold tracking-tight text-graphite">
            {endLabel}
          </p>
        </section>
      )}
    </Component>
  );
}
