---
name: https://www.enviosdosruedas.com/
version: "2.0.0"
tokens:
  color_mode: "HYBRID"
  primary_brand: "#0636A5"      # Egyptian Royal Navy Blue (brand anchor)
  primary_accent: "#FFEC01"     # Electric Kinetic Yellow (single accent, sat < 80%)
  surface_white: "#FFFFFF"      # Pure White
  surface_dark: "#021440"       # Deep Navy / Off-Black (replaces #000000)
  brand_ink: "#052C87"          # Brand Ink (containers)
  brand_blue: "#0950F6"         # Brand Blue (light variant for fleet/3D)
  brand_yellow: "#FFEC01"       # Brand Yellow (CTAs, badges)
  brand_canvas: "#F8FAFC"       # Light surface alternative
  neutral_zinc_950: "#09090B"   # Zinc-950 (replaces pure black)
  neutral_zinc_900: "#18181B"   # Zinc-900 (card backgrounds)
  neutral_zinc_800: "#27272A"   # Zinc-800 (elevated surfaces)
  neutral_zinc_700: "#3F3F46"   # Zinc-700 (borders, muted)
  neutral_zinc_500: "#71717A"   # Zinc-500 (secondary text)
  neutral_zinc_300: "#D4D4D8"   # Zinc-300 (dividers)
  neutral_zinc_100: "#F4F4F5"   # Zinc-100 (light backgrounds)
  whisper_border: "rgba(226,232,240,0.15)"  # Subtle structural lines
  glow_yellow: "rgba(255,236,1,0.15)"       # Restrained glow (max 15% opacity)
  error: "#EF4444"              # Error state
  font_display: "Anton"
  font_subheading: "Bebas Neue"
  font_body: "Outfit"
  font_mono: "Geist Mono"
---

# Design System: Envíos DosRuedas

> **Premium logistics interface for Mar del Plata last-mile operations.**  
> Atmosphere: **Cockpit Dense (8/10)** — High information density, operational clarity.  
> Variance: **Offset Asymmetric (7/10)** — Structured asymmetry, no centered heroes.  
> Motion: **Fluid CSS (5/10)** — Spring physics, perpetual micro-interactions on data.

---

## 1. Visual Theme & Atmosphere

A high-density, operational cockpit interface for logistics professionals. The aesthetic is **industrial-precision** — think air traffic control meets modern fintech dashboard. Dark Zinc-950 canvas with Electric Kinetic Yellow (#FFEC01) as the **singular accent** for actions, focus rings, and live data indicators. Egyptian Royal Navy Blue (#0636A5) structures the interface as the primary brand surface.

**No neon glows, no purple gradients, no outer-glow shadows.** Depth is communicated through Zinc elevation layers (950 → 900 → 800) and subtle `whisper_border` lines. Typography drives hierarchy: Anton for massive headlines, Bebas Neue for badges/navigation, Outfit for readable body, Geist Mono for every number, price, tracking code, and coordinate.

**Motion philosophy:** Spring physics (`stiffness: 100, damping: 20`) on all interactive elements. Perpetual micro-loops (pulse on live status, shimmer on skeletal loaders, typewriter on metrics). Staggered cascade reveals on lists/tables — never instant mount.

---

## 2. Color Palette & Roles

| Name | Hex | Role | Usage |
|------|-----|------|-------|
| **Deep Navy Canvas** | `#021440` | Primary background | Page root, full-bleed sections |
| **Zinc-950 Off-Black** | `#09090B` | Pure dark surface | Card bases, modal overlays |
| **Zinc-900 Elevated** | `#18181B` | Card/container fill | Data tables, form cards, panels |
| **Zinc-800 Raised** | `#27272A` | Interactive hover | Button hover, row highlight |
| **Egyptian Royal Navy** | `#0636A5` | Brand structure | Primary buttons, header bars, sidebar |
| **Brand Ink** | `#052C87` | Container depth | Elevated cards on dark canvas |
| **Electric Kinetic Yellow** | `#FFEC01` | **SINGLE ACCENT** | Primary CTAs, focus rings, active states, live badges, sparklines |
| **Pure White** | `#FFFFFF` | High-contrast text | Primary headlines on dark surfaces |
| **Zinc-300 Muted** | `#D4D4D8` | Secondary text | Descriptions, metadata, placeholders |
| **Zinc-500 Subtle** | `#71717A` | Tertiary text | Timestamps, helper text, disabled |
| **Whisper Border** | `rgba(226,232,240,0.15)` | Structural lines | Card borders, table dividers, input borders |
| **Restrained Glow** | `rgba(255,236,1,0.15)` | Focus/active only | Focus rings, active tab indicators (max 15%) |
| **Error Red** | `#EF4444` | Destructive states | Form errors, failed status, delete actions |
| **Success Green** | `#22C55E` | Success states | Delivered badges, confirmed actions |

**Constraints:**
- **Maximum 1 accent color** — Electric Kinetic Yellow only. Saturation ~75% (below 80% threshold).
- **No purple, no neon blue, no gradient accents.** The "AI Purple/Blue Neon" aesthetic is BANNED.
- **No pure black (`#000000`)** — Use Zinc-950 (`#09090B`) or Deep Navy (`#021440`).
- **Single neutral base** — Zinc scale only. No warm/cool gray fluctuation.
- **Glow restraint** — `glow_yellow` opacity max 15%. Never on resting state. Only on `:focus-visible` or live indicators.

---

## 3. Typography Rules

### Font Stack
- **Display/Headlines:** `Anton` — Track-tight (`-0.04em`), controlled scale, weight-driven hierarchy. Uppercase for primary headlines.
- **Subheadings/Badges/Navigation:** `Bebas Neue` — Letter-spacing `0.1em`, uppercase, compact.
- **Body/UI Text:** `Outfit` — Relaxed leading `1.6`, max `65ch` line width, neutral secondary color (Zinc-300).
- **Mono/Data:** `Geist Mono` — **Mandatory for all numbers**: prices, phone numbers, addresses (Friuli 1972), tracking codes, metrics, coordinates, timestamps. Tabular numerals (`font-variant-numeric: tabular-nums`).

### Scale (clamp-based, mobile-first)
| Token | Desktop | Mobile | Usage |
|-------|---------|--------|-------|
| `display-hero` | `clamp(48px, 8vw, 72px)` | `clamp(36px, 10vw, 48px)` | Page heroes, cover titles |
| `headline-section` | `clamp(32px, 5vw, 48px)` | `clamp(28px, 7vw, 36px)` | Section headers |
| `subheading-badge` | `18px` | `16px` | Badges, tabs, nav items |
| `body-main` | `16px` / `1.6` | `16px` / `1.6` | Paragraphs, descriptions |
| `body-small` | `14px` / `1.5` | `14px` / `1.5` | Dense tables, footnotes |
| `data-mono` | `14px` / `1.2` | `13px` / `1.2` | Prices, codes, metrics |
| `data-mono-lg` | `18px` / `1.1` | `16px` / `1.1` | Large metrics, KPIs |

### Application Rules
- Headlines & buttons: **Always uppercase** (`text-uppercase`).
- Body text: **Sentence case**, never uppercase.
- **No `Inter` font** — BANNED for premium contexts.
- **No generic serifs** (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`) — BANNED entirely. If editorial serif needed: `Fraunces`, `Gambarino`, `Editorial New`, `Instrument Serif` only.
- **Dashboard/Software UI:** Sans-serif pairings exclusively (`Anton` + `Outfit` + `Geist Mono`).
- **High-density override (density > 7):** All numbers → `Geist Mono` tabular.

---

## 4. Component Stylings

### Buttons
```css
/* Primary CTA — Single accent fill */
.btn-primary {
  @apply bg-brand-yellow text-brand-navy font-subheading uppercase tracking-widest
         rounded-full px-8 py-3.5 text-base
         transition-[transform,box-shadow] duration-150
         hover:bg-brand-yellow-hover hover:shadow-[0_0_20px_rgba(255,236,1,0.15)]
         active:scale-[0.98] active:shadow-none
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
         focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950;
}

/* Secondary — Ghost outline */
.btn-secondary {
  @apply bg-transparent border-2 border-whisper-border text-white font-subheading
         uppercase tracking-widest rounded-full px-8 py-3.5 text-base
         hover:bg-zinc-800 hover:border-zinc-700
         active:scale-[0.98]
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
         focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950;
}

/* Tertiary — Text only */
.btn-tertiary {
  @apply text-brand-yellow font-subheading uppercase tracking-wider text-sm
         hover:text-brand-yellow-hover
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
         focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950;
}
```
- **Tactile feedback:** `active:scale-[0.98]` (1px translate equivalent). No outer glows on rest state.
- **No custom mouse cursors.** Use browser defaults.
- **Icon placement:** Right-aligned chevron/arrow, `translate-x-1` on hover (CSS transition).

### Cards
```css
/* Data Card — elevation serves hierarchy */
.card-data {
  @apply bg-zinc-900 border border-whisper-border rounded-2xl p-6
         shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-shadow duration-200
         hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)];
}

/* High-density: replace with border-top dividers */
.card-dense {
  @apply bg-transparent border-t border-whisper-border pt-4 pb-2;
}

/* Service Card — brand surface */
.card-service {
  @apply bg-brand-ink border border-brand-blue/30 rounded-2xl p-6
         relative overflow-hidden;
}
```
- **Border radius:** `rounded-2xl` (24px) for data cards, `rounded-full` for pills/badges.
- **Shadows:** Diffused, tinted to background hue. No colored drop shadows.
- **High-density layouts (density > 7):** Replace cards with `border-t whisper_border` dividers + negative space.

### Inputs / Forms
```css
.input-field {
  @apply w-full bg-zinc-900/50 border border-whisper-border
         rounded-xl px-4 py-3 text-white placeholder-zinc-500
         focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20
         focus:outline-none transition-colors duration-150
         invalid:border-error invalid:focus:ring-error/20;
}

.input-label {
  @apply block text-sm font-medium text-zinc-300 mb-1.5;
}

.input-error {
  @apply text-sm text-error mt-1.5;
}
```
- **Label above input**, helper text optional, error text below.
- **No floating labels.** Standard gap spacing (`mb-1.5` label→input, `mt-1.5` input→error).
- **Focus ring:** Accent color (`brand-yellow`), 2px offset.

### Tables (Enterprise shadcn/ui aesthetic)
```css
.table-root {
  @apply w-full border-collapse text-sm text-zinc-300;
}
.table-header {
  @apply bg-zinc-900/50 border-b border-whisper-border
         text-[11px] font-bold tracking-wider text-brand-blue uppercase font-subheading;
}
.table-header th { @apply px-6 py-3.5; }
.table-body td { @apply px-6 py-3; }
.table-row {
  @apply transition-colors hover:bg-white/5 odd:bg-transparent even:bg-white/[0.02];
}
.table-row-price { @apply text-right font-black text-white text-base tracking-tight font-headline; }
```
- Subtle alternating rows (`even:bg-white/[0.02]`).
- Small-caps headers in `Bebas Neue`, brand blue.
- Prices/metrics in `Geist Mono` tabular, right-aligned.

### Badges / Status Pills
```css
.badge-live {
  @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px]
         font-bold uppercase tracking-wider bg-brand-yellow text-brand-navy;
}
.badge-live::before {
  content: ""; @apply w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse;
}
.badge-delivered { @apply bg-green-500/10 text-green-400 border border-green-500/30; }
.badge-pending { @apply bg-yellow-500/10 text-yellow-400 border border-yellow-500/30; }
.badge-failed { @apply bg-error/10 text-error border border-error/30; }
```

### Loaders (Skeletal)
```css
.skeleton {
  @apply bg-zinc-800 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-xl;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```
- **Skeletal shimmer matching exact layout dimensions.** No circular spinners.
- Shimmer direction: left-to-right, duration 1.5s, ease-in-out.

### Empty States
Composed, illustrated compositions — not just "No data" text.
- Icon (lucide-react, 48px, Zinc-600) + headline (Anton, 24px) + description (Outfit, 16px, Zinc-400) + primary CTA.
- Centered, generous vertical padding (`py-16`).

### Error States
Clear, inline error reporting.
- Input: `border-error`, `focus:ring-error/20`, error text below in `text-error`.
- Toast/alert: `bg-error/10 border border-error/30 text-error` with `lucide:AlertCircle`.

---

## 5. Layout Principles

### Grid System
- **CSS Grid first** — never `calc()` percentage hacks or flexbox math for primary layouts.
- **12-column fluid grid** with asymmetric Bento-style distributions (e.g., 7/5, 8/4 splits).
- **Max-width containment:** `max-w-[1400px]` centered (`mx-auto`).
- **Container padding:** `px-6` (mobile), `px-10` (desktop).

### Hero Sections
- **Centered heroes BANNED** (variance > 4). Use **Split Screen** (70/30), **Left-Aligned**, or **Asymmetric Whitespace**.
- **Inline Image Typography:** Small contextual photos/visuals embedded inline at type-height between words/letters in headlines. Images sit at cap-height, rounded, as visual punctuation.
- **No overlapping elements** — every element owns its clean spatial zone. No absolute-positioned stacking.
- **No filler text:** "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons — **BANNED**.
- **Maximum one primary CTA.** No secondary "Learn more" links.

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | `0.5rem` (8px) | Icon gaps, tight groups |
| `space-sm` | `1rem` (16px) | Component internal padding |
| `space-md` | `1.5rem` (24px) | Default gutter, card gaps |
| `space-lg` | `2rem` (32px) | Section internal gaps |
| `space-xl` | `3rem` (48px) | Major section separation |
| `space-2xl` | `clamp(3rem, 8vw, 6rem)` | Page-level vertical rhythm |
| `container-max` | `1400px` | Content width constraint |

### Responsive Rules
| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 768px)** | All multi-column → single column. No exceptions. Horizontal overflow = critical failure. |
| **Tablet (768–1024px)** | 2-col grids where appropriate. Sidebar collapses to drawer. |
| **Desktop (1024px+)** | Full asymmetric grids, Bento layouts, multi-panel. |
| **Typography** | Headlines: `clamp()`. Body: minimum `1rem` (16px). |
| **Touch targets** | All interactive ≥ `44px` (use `min-h-[44px] min-w-[44px]`). |
| **Inline typography images** | Stack below headline on mobile, inline on desktop. |
| **Navigation** | Horizontal → clean mobile menu (sheet/drawer). |
| **Section gaps** | Reduce proportionally: `clamp(3rem, 8vw, 6rem)`. |

### Full-Height Sections
- Use `min-h-[100dvh]` — **never `h-screen`** (iOS Safari catastrophic jump).

---

## 6. Motion & Interaction

### Spring Physics (Default)
```ts
const spring = { stiffness: 100, damping: 20 }; // Premium, weighty feel
```
- **All interactive elements:** hover, active, focus transitions use spring.
- **No linear easing.** No `ease-in-out` for interactions.

### Perpetual Micro-Interactions (Active Components)
| Component | Loop |
|-----------|------|
| Live status badge | Pulse (opacity 1 → 0.5, 1.5s infinite) |
| Skeletal loader | Shimmer (left→right, 1.5s infinite) |
| Metric/KPI counter | Typewriter count-up on mount (staggered) |
| Active tab indicator | Float (translateY -2px ↔ 2px, 3s ease-in-out) |
| Map pin / GPS | Subtle bounce (scale 1 → 1.05, 2s infinite) |

### Staggered Orchestration
- Lists/tables/grids: **Cascade delays** (50ms increment) for waterfall reveal.
- `staggerChildren: 0.05` in Framer Motion / equivalent CSS `animation-delay` calc.

### Performance Rules
- Animate **exclusively via `transform` and `opacity`**.
- **Never animate:** `top`, `left`, `width`, `height`, `margin`, `padding`, `border-radius`.
- Grain/noise filters: **Fixed pseudo-elements only** (`::before` with `position: fixed`, `pointer-events: none`).
- CPU-heavy animations → **Isolated Client Components** (`'use client'` boundary).

### Reduced Motion
- Respect `prefers-reduced-motion: reduce` — disable all non-essential animation, keep only functional transitions (focus, active states).

---

## 7. Anti-Patterns (Banned — AI Tells)

### Visual
- ❌ **Emojis anywhere** — Use `lucide-react` icons only.
- ❌ **`Inter` font** — BANNED for premium/creative contexts.
- ❌ **Generic serif fonts** (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`) — BANNED.
- ❌ **Pure black (`#000000`)** — Use Zinc-950 (`#09090B`) or Deep Navy (`#021440`).
- ❌ **Neon/outer glow shadows** — No `shadow-[0_0_25px_rgba(...)]` on rest state.
- ❌ **Oversaturated accents** — Accent saturation < 80%.
- ❌ **Excessive gradient text on large headers** — Solid color only.
- ❌ **Custom mouse cursors** — Browser defaults only.
- ❌ **Overlapping elements** — Clean spatial separation always. No absolute-positioned content stacking.
- ❌ **3-column equal card layouts** — Use 2-col Zig-Zag, asymmetric grid, or horizontal scroll.

### Copy & Content
- ❌ **Generic placeholder names** ("John Doe", "Acme", "Nexus", "Test User").
- ❌ **Fake round numbers** (`99.99%`, `50%`, `100%`).
- ❌ **Fabricated data/statistics** — Never generate metrics, uptime percentages, response times, deploy cycles, or any data not explicitly provided by user.
  - `"99.98% UPTIME SLA"` ❌
  - `"124ms AVG. RESPONSE"` ❌
  - `"18.5k DEPLOY CYCLES"` ❌
  - **Use clear placeholders:** `[metric]`, `[uptime]`, `[response_time]` instead.
- ❌ **Fake system/metric sections** — "SYSTEM PERFORMANCE METRICS", "KEY STATISTICS", "BY THE NUMBERS" cards filled with invented data — BANNED.
- ❌ **`LABEL // YEAR` formatting** — "SYSTEM // 2024", "METRICS // 2025" — lazy AI convention.
- ❌ **AI copywriting clichés** — "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Transform", "Empower".
- ❌ **Filler UI text** — "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons.

### Assets
- ❌ **Broken Unsplash links** — Use `picsum.photos` or SVG avatars (`lucide:User`).
- ❌ **Stock photography** — Prioritize contextual logistics imagery from brand references.

### Layout
- ❌ **Centered Hero sections** (when variance > 4) — Force Split Screen, Left-Aligned, Asymmetric Whitespace.
- ❌ **Flexbox percentage math** — Use CSS Grid.
- ❌ **`h-screen` for full-height** — Use `min-h-[100dvh]`.

---

## 8. Page-Specific Adaptations (Current 11 Pages)

### Página 1 — Cover / Hero
- **Layout:** Split 70/30 asymmetric. Left: headline + value props. Right: 2 stat cards (rotated hover).
- **Typography:** `display-hero` (Anton, 56px→clamp), `body-main` (Outfit).
- **Inline image:** None (cover page).
- **CTA:** None (proposal document).

### Página 2 — Express SLA
- **Layout:** Header → Info card → Pricing table → Conditions grid (2×2).
- **Table:** Enterprise style, `Geist Mono` prices, `Bebas Neue` headers.
- **Conditions:** Icon + label + value cards, `rounded-xl`.

### Página 3 — LowCost
- **Layout:** Mirror of Página 2 with green accent (`#22C55E`) for LowCost branding.
- **Table:** Same enterprise style.
- **Conditions:** 4-column grid.

### Página 4 — MercadoLibre Flex
- **Layout:** Header → Info banner → SLA note → 3-level pricing cards (progressive enhancement).
- **Level 3 (Premium):** Distinct `brand-blue` border, `brand-yellow` price highlight.
- **Weather policy:** Bottom banner.

### Página 5 — 3PL Fulfillment
- **Layout:** Centered headline (allowed — section intro) → 3-column feature grid.
- **Cards:** `rounded-2xl`, `bg-white/5`, watermark icons (opacity-5).
- **Icons:** `Warehouse`, `PackageCheck`, `Truck` in brand colors.

### Página 6 — Drop-Off
- **Layout:** Centered headline → Split 50/50. Left: benefits list. Right: "Ticket" card with perforated edges.
- **Ticket:** Gradient border, dashed perforation line, `20%` badge prominent.

### Página 7 — Cuentas Corrientes (B2B)
- **Layout:** Centered intro → 2×2 benefit grid → Requirements box (left border accent).
- **Benefits:** Icon + checkmark + description.

### Páginas 8–11 — (Review similarly)
- Apply same component patterns, color roles, typography scale.

---

## 9. Implementation Checklist (globals.css Sync)

Update `src/app/globals.css` to match this DESIGN.md:

```css
@layer base {
  :root {
    /* Zinc-based neutral system */
    --background: 240 10% 3.9%;        /* Zinc-950 #09090B */
    --foreground: 0 0% 98%;            /* Near white */
    --card: 240 10% 9.4%;              /* Zinc-900 #18181B */
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 9.4%;
    --popover-foreground: 0 0% 98%;
    
    /* Brand structure */
    --primary: 228 83% 34%;            /* #0636A5 Egyptian Royal Navy */
    --primary-foreground: 0 0% 98%;
    --secondary: 228 50% 18%;          /* #052C87 Brand Ink */
    --secondary-foreground: 0 0% 98%;
    
    /* Single accent */
    --accent: 54 100% 50%;             /* #FFEC01 Electric Kinetic Yellow */
    --accent-foreground: 228 83% 10%;  /* Dark navy for text on yellow */
    
    /* Muted/Subtle */
    --muted: 240 10% 15.7%;            /* Zinc-800 #27272A */
    --muted-foreground: 240 5% 44.3%;  /* Zinc-500 #71717A */
    
    /* Borders/Rings */
    --border: 240 10% 15.7%;           /* Zinc-800 */
    --input: 240 10% 15.7%;
    --ring: 54 100% 50%;               /* Accent yellow for focus */
    
    --radius: 0.75rem;                 /* 12px base, components scale up */
  }
}

/* Font imports — NO Inter, NO Space Grotesk */
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Geist+Mono:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap');

body {
  font-family: 'Outfit', sans-serif;   /* NOT Inter */
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Anton', sans-serif;    /* NOT Space Grotesk */
}

.font-subheading { font-family: 'Bebas Neue', sans-serif; }
.font-mono { font-family: 'Geist Mono', monospace; }
.font-display { font-family: 'Anton', sans-serif; }

/* Utility: whisper border */
.border-whisper { border-color: rgba(226,232,240,0.15); }

/* Utility: restrained glow (focus only) */
.focus-glow:focus-visible {
  box-shadow: 0 0 0 2px #09090B, 0 0 0 4px rgba(255,236,1,0.15);
}

/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #27272A 25%, #3F3F46 50%, #27272A 75%);
  background-size: 200% 100%;
}
```

---

## 10. Stitch Generation Prompts (Reference)

When prompting Stitch for new screens, use this structure:

```
Create a [page type] for Envíos DosRuedas logistics platform.
Atmosphere: Cockpit Dense (8/10), Offset Asymmetric (7/10), Fluid CSS (5/10).
Colors: Zinc-950 canvas, Zinc-900/800 elevation, #0636A5 brand structure, #FFEC01 single accent (sat < 80%).
Fonts: Anton (display), Bebas Neue (badges), Outfit (body), Geist Mono (ALL numbers).
Components: Enterprise tables, tactile buttons (scale-95 active), skeletal loaders, composed empty states.
Layout: CSS Grid, 1400px max-width, asymmetric splits, no centered heroes, min-h-[100dvh].
Motion: Spring (100/20), staggered cascade (50ms), perpetual micro-loops on live data.
Bans: No Inter, no pure black, no neon glows, no 3-col equal cards, no fake metrics, no emojis.
```

---

*Generated via taste-design skill — Semantic Design System for Google Stitch.*  
*Enforces premium, non-generic aesthetic through opinionated constraints and anti-pattern bans.*