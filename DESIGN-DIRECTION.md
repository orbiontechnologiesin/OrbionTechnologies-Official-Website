# Orbion Technologies Design Direction & Visual System Specification

> **Aesthetic Archetype**: Architectural Minimalism • Instrument-Grade Technical Discipline • High-Contrast Restraint  
> **Reference Peers**: Apple, Tesla, Stripe, Linear, Vercel, Palantir, Anthropic  
> **Brand**: Orbion Technologies (`https://orbiontechnologies.in`)  

---

## 1. Color System

The visual language is anchored in an uncompromising **Black + White** hierarchy with a singular, sovereign brand accent.

### Base Surface Architecture
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `void` | `#000000` | Absolute pitch black; used for header backdrops, footer ground, and grand CTA bounds. |
| `canvas` | `#050505` | Primary operating canvas; creates depth behind layered cards and panels. |
| `surface.DEFAULT` | `#0A0A0A` | Elevated baseline plane; subtle background differentiation. |
| `surface.subtle` | `#0E0E0E` | Secondary container fill; standard card background. |
| `surface.card` | `#111111` | Primary component envelope (nodes, dossier cards, technical matrices). |
| `surface.elevated` | `#161616` | Hover states and interactive elevated elements. |
| `surface.highest` | `#242424` | Active states and elevated contextual overlays. |

### Hairline Boundary & Border Architecture
| Token | Hex / RGBA | Semantic Usage |
| :--- | :--- | :--- |
| `border.hairline` | `rgba(255, 255, 255, 0.08)` / `#1C1C1E` | Primary structural line separating panels, cards, and headers. |
| `border.subtle` | `#262626` | Secondary dividing edges across modular rows. |
| `border.DEFAULT` | `#2E2E32` | Standard interactive input and button resting borders. |
| `border.strong` | `#3F3F46` | Active input borders, focused boundaries, and hovered states. |

### Monochromatic Contrast Typography
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `text.pure` | `#FFFFFF` | Primary display headlines, high-priority titles, key telemetry figures. |
| `text.primary` | `#EDEDED` | Standard editorial narrative, section lead paragraphs, table readouts. |
| `text.secondary` | `#A1A1AA` | Supporting card narrative, descriptive text, secondary navigation. |
| `text.muted` | `#71717A` | System metadata, micro-captions, timestamps, inactive icons. |
| `text.dim` | `#52525B` | Structural brackets, inactive dividers, placeholders. |

### Sovereign Brand Accent (Budgeted to < 7% Area)
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `brand.accent` | `#5B4FFF` | Authentic Orbion Electric Indigo; reserved for primary focal points, active state chips, and key action triggers. |
| `brand.accent-hover` | `#4B3FF0` | Interactive hover shift for accent triggers. |
| `brand.accent-tint` | `rgba(91, 79, 255, 0.08)` | Ambient subtle radial highlights behind primary hero structures. |
| `brand.cyan` | `#00E0D6` | Satellite dot accent; restricted strictly to live status pings (e.g. system operational dots). |

---

## 2. Typography

The typographic hierarchy establishes computational authority and editorial cadence.

### Font Families
* **Display, Headline & Body**: `Geist Sans` (`var(--font-geist-sans)`), `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
* **Telemetry, Badges & Code**: `Geist Mono` (`var(--font-geist-mono)`), `JetBrains Mono`, `ui-monospace`, `monospace`

### Scale & Tracking Hierarchy
| Level | Font Size | Line Height | Tracking | Font Weight | Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `72px` (`4.5rem`) | `76px` | `-0.04em` | 600 (Semibold) | Geist Sans |
| **Display LG** | `56px` (`3.5rem`) | `60px` | `-0.035em` | 600 (Semibold) | Geist Sans |
| **Headline XL** | `40px` (`2.5rem`) | `48px` | `-0.03em` | 500 (Medium) | Geist Sans |
| **Headline LG** | `32px` (`2rem`) | `40px` | `-0.025em` | 500 (Medium) | Geist Sans |
| **Headline SM** | `20px` (`1.25rem`) | `28px` | `-0.015em` | 500 (Medium) | Geist Sans |
| **Body LG** | `16px` (`1rem`) | `26px` | `-0.01em` | 400 (Regular) | Geist Sans |
| **Body SM** | `13px` (`0.8125rem`) | `20px` | `0em` | 400 (Regular) | Geist Sans |
| **Label MD** | `12px` (`0.75rem`) | `16px` | `+0.04em` | 500 (Medium) | Geist Mono |
| **Label SM** | `10px` (`0.625rem`) | `14px` | `+0.06em` | 500 (Medium) | Geist Mono |

---

## 3. Spacing & Mechanical 8px Grid

All layout dimensions, paddings, and margins align strictly to an 8-pixel mechanical grid:

* **Micro-Spacing**:
  * `space-xs`: `4px` (`0.25rem`)
  * `space-sm`: `8px` (`0.5rem`)
  * `space-md`: `16px` (`1rem`)
  * `space-lg`: `24px` (`1.5rem`)
  * `space-xl`: `32px` (`2rem`)
* **Macro-Spacing**:
  * Section Vertical Padding (Desktop): `96px` to `128px` (`py-24` to `py-32`)
  * Section Vertical Padding (Mobile): `64px` (`py-16`)
  * Maximum Content Container: `1280px` (`max-w-7xl`)

---

## 4. Layout Architecture

* **Outer Canvas**: Centered container with responsive gutters:
  * Mobile: `16px` (`px-4`)
  * Tablet: `24px` (`px-6`)
  * Desktop: `32px` (`px-8` / `px-gutter-desktop`)
* **Columns**:
  * Desktop (>1024px): 12-column architectural grid
  * Tablet (768px-1023px): 8-column layout
  * Mobile (<768px): 4-column or single stacked linear column

---

## 5. Motion & Interaction Design

* **Philosophy**: Restrained, silent, functional, and non-distracting.
* **Transitions**:
  * Durations: `150ms` (instant response) to `250ms` (ease-out).
  * Hover Shifts: Interactive borders transition from `#1C1C1E` to `#3F3F46` or `rgba(91, 79, 255, 0.4)`.
* **Telemetry Indicators**:
  * Live status dots use a soft `pulse` with a `3s` period (`animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`).
  * Orbital coordinate rings use slow mathematical rotation (`spin 90s linear infinite`).
* **Accessibility**: Respects `prefers-reduced-motion` across all viewports.

---

## 6. Component Principles

1. **Buttons**:
   * **Primary Action**: Solid pure white background (`#FFFFFF`), pure black typography (`#000000`), `4px` to `6px` radius, font weight 500. Hover: `#E4E4E7`.
   * **Strategic Accent**: Sovereign Electric Indigo (`#5B4FFF`), pure white typography (`#FFFFFF`). Reserved for decisive early access / deployment conversion. Hover: `#4B3FF0`.
   * **Secondary / Ghost**: Off-black surface (`#111111`), 1px hairline border (`#262626`), white typography. Hover: `#18181B`, border `#3F3F46`.
2. **Cards**:
   * Structured fill (`#0E0E0E` / `#111111`) encased in a 1px hairline perimeter (`border-hairline`).
   * No heavy blurry drop shadows; depth is conveyed via tonal elevation and border contrast.
3. **Badges & System Tags**:
   * Set exclusively in `Geist Mono` (`10px` or `11px`), uppercase, tracking `+0.06em`.
   * Bordered container (`#161616` background with `#27272A` hairline border).

---

## 7. Explicitly Prohibited Patterns (Anti-AI Tropes)

❌ **Forbidden Visuals**:
* Robotic hands touching human fingertips
* 3D glowing "AI brains" or neural fiber tangles
* Floating rainbow / chromatic holographic meshes
* Random floating glowing particles / starfields
* Excessive neon purple/cyan glowing cards
* Cheesy 3D isometric isometric cartoon illustrations
* Exaggerated pill-shaped bubble buttons everywhere

❌ **Forbidden Copy & Content Claims**:
* "Revolutionize your workflow with AI magic"
* "10x your productivity overnight"
* Fabricated enterprise logos (e.g. fake "Fortune 500" badges)
* Fabricated testimonials, reviews, or fake user headshots
* Fabricated revenue, customer counts, or valuation metrics
* Overblown sci-fi jargon disconnected from actual software architecture
