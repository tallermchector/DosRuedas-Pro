import { CatalogItem } from "@/lib/reviewCatalog";

export function generatePromptFromCatalogItem(item: CatalogItem): string {
  const elementsFormatted = item.elementsToReview
    .map((el) => `  - ${el}`)
    .join("\n");

  return `# Role: Senior Frontend & Next.js 16 UI Architect
# Project: Envíos DosRuedas (Mar del Plata, Argentina) - 2026 Edition
# Target Component: ${item.componentName} (${item.componentPath})
# Page / Section: ${item.page} - ${item.sectionTitle}

## 1. Context & Objective
Build or refactor the component \`${item.componentName}\` located at \`${item.componentPath}\` for the fast urban courier platform "Envíos DosRuedas".
The component must be production-ready, fully typed in TypeScript, responsive, accessible (WCAG AA), and adhere strictly to the 2026 visual contract.

## 2. Baseline Content & Requirements
${item.currentText}

## 3. Mandatory Design Elements & Visual Review Specs
${elementsFormatted}

## 4. Immutable Design Tokens (Zero generic Tailwind grays)
- Colors:
  - Brand Primary: #0636A5 (Speed Blue)
  - Dark Surface / Cards: #052C87 (Midnight Navy) / #031E5C (Deep Contrast)
  - Brand Yellow: #FFF12E / #FFEC01 (High-Voltage Neon - CTAs & Highlights)
  - Surface Text: #FFFFFF (White) / #F8FAFC (Light surfaces)
  - Borders: border-white/20 or border-[#FFF12E]/30
- Typography:
  - Display / Titles: 'Anton', sans-serif (UPPERCASE, optional -1deg rotate)
  - Badges / Subheadings / CTAs: 'Bebas Neue', sans-serif
  - Body & Labels: 'Outfit' or 'IBM Plex Sans', sans-serif
  - Numbers, Rates, Clocks & Addresses: 'Geist Mono', monospace (tabular-nums)
- Shape & Elevation:
  - Cards: rounded-3xl (28px radius) with backdrop-blur-md
  - CTAs & Badges: rounded-full with shadow-glow-yellow (shadow-[0_0_20px_rgba(255,241,46,0.35)])
  - Hover states: transition-all duration-200 hover:-translate-y-0.5 active:scale-95

## 5. Local Context & Tone (Mar del Plata 2026)
- Maintain strict Rioplatense voseo: "Cotizá", "Calculá", "Enviá", "Hablemos".
- Real operational references: Friuli 1972 (Chauvín, MDQ), Batán, Gral. Pueyrredón.

## 6. Implementation Deliverable
Provide the complete, self-contained React component source code using Tailwind CSS and Lucide React icons. Avoid mock placeholders or truncated logic.`;
}
