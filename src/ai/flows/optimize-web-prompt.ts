'use server';
/**
 * @fileOverview Genkit Flow for optimizing web component prompts for Envíos DosRuedas.
 * 
 * Complies with the official "Envíos DosRuedas Design System":
 * - Strict 3-Color Triad:
 *   - Brand Blue: #0C59F2 (Azul Eléctrico Institucional) - Único azul permitido.
 *   - Brand Yellow: #FFF12E (Amarillo Neón de Alta Visibilidad) - Único acento para CTAs y badges.
 *   - Brand White: #FFFFFF (Blanco Óptico Puro) - Superficies de tarjetas, textos de alto contraste.
 * - Strict Typography Hierarchy:
 *   - Display & Hero: Anton (72px desktop / 44px móvil, uppercase, leading 0.98, tracking -0.04em)
 *   - Section Headlines: Anton (48px, uppercase, leading 1.0)
 *   - Subheadings, Badges & CTAs: Bebas Neue (18px, uppercase, tracking 0.1em)
 *   - Body & Párrafos: Outfit (16px, leading 1.6, max 65 chars)
 *   - Datos Numéricos, Tarifas, Tiempos: Geist Mono (14px, weight 600)
 * - Shadows & Physics:
 *   - glow-yellow: 0 0 25px rgba(255, 241, 46, 0.35)
 *   - card-elevation: 0 20px 40px -15px rgba(12, 89, 242, 0.15)
 *   - Spring physics: stiffness: 100, damping: 20
 * - Anti-Patterns:
 *   - CERO múltiples azules (prohibidos #052C87, #0636A5, #031E5C).
 *   - CERO negro absoluto (#000000). El contraste sobre blanco se resuelve con #0C59F2.
 *   - CERO emojis. Usar Lucide React icons.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  type WebPromptInput,
  type WebPromptOutput,
  buildDeterministicWebPrompt,
} from './web-prompt-builder';

export type { WebPromptInput, WebPromptOutput };

// ==========================================
// INTERNAL SCHEMAS FOR GENKIT FLOW
// ==========================================
const WebPromptInputSchema = z.object({
  componentName: z.string().describe('Name of the component to create/refactor (e.g. Hero, ServicesOverview, BentoGrid).'),
  pageName: z.string().describe('Target page or section context (e.g. Home (Inicio), Cotizador Express).'),
  category: z.string().describe('Component category: hero, cards, bento, form, cta, table, stats, stepper, faq, slider, uikit, legal.'),
  componentPath: z.string().describe('Expected repository file path (e.g. src/components/Hero.tsx).'),
  baselineContent: z.string().describe('Text copy, data, and functional requirements from docs/contenido.'),
  elementsToReview: z.array(z.string()).default([]).describe('Mandatory visual specs or review criteria.'),
  visualPresets: z.object({
    glowNeon: z.boolean().default(true).describe('Include High-Visibility Neon Yellow (#FFF12E) glow effects.'),
    doubleBezel: z.boolean().default(false).describe('Use DoubleBezelCard concentric borders.'),
    glassmorphism: z.boolean().default(true).describe('Use backdrop-blur-md and semi-transparent white surfaces (bg-white/10).'),
    whiteSurface: z.boolean().default(true).describe('Use pure optical white (#FFFFFF) card surface with #0C59F2 text.'),
    animationType: z.enum(['framer-motion', 'tailwind-css', 'none']).default('framer-motion').describe('Animation engine to specify.'),
    targetDevice: z.enum(['responsive-hybrid', 'mobile-first', 'desktop-enterprise']).default('responsive-hybrid').describe('Target viewport priority.'),
  }).optional(),
  customDirectives: z.string().optional().describe('Additional free-form instructions provided by the user.'),
});

const WebPromptOutputSchema = z.object({
  title: z.string().describe('Descriptive title of the prompt.'),
  optimizedPrompt: z.string().describe('The complete, production-ready natural language prompt for an AI coding assistant.'),
  promptBreakdown: z.object({
    roleDefinition: z.string().describe('Architect role and mission assigned to the AI.'),
    dosRuedasContext: z.string().describe('Business and geographic context (Mar del Plata 2026).'),
    designTokensApplied: z.array(z.string()).describe('List of design tokens enforced (colors, fonts, radius).'),
    technicalStructure: z.string().describe('Component layout, state management, and props structure.'),
    accessibilityWcag: z.string().describe('WCAG AA contrast, focus states, and aria standards.'),
    suggestedIcons: z.array(z.string()).describe('Lucide React icons recommended for this component.'),
  }),
  previewSummary: z.string().describe('Executive summary of what this component will deliver.'),
});

// ==========================================
// AI PROMPT DEFINITION (Genkit + Gemini 2.5 Flash)
// ==========================================
const promptDefinition = ai.definePrompt({
  name: 'optimizeWebComponentPromptTemplate',
  input: { schema: WebPromptInputSchema },
  output: { schema: WebPromptOutputSchema },
  prompt: `You are the Principal Frontend Architect and Lead Design System Guardian for "Envíos DosRuedas", an electric high-velocity urban logistics tech platform based in Mar del Plata, Argentina (2026 Edition).

YOUR MISSION:
Synthesize the provided component specifications from the official documentation (docs/contenido), design tokens, and user preferences into an EXHAUSTIVE, FLAWLESS, PRODUCTION-GRADE prompt written in NATURAL LANGUAGE.
This prompt will be handed directly to an AI coding agent (Cursor, Antigravity, Claude Code) so it can implement the exact visual React component without ambiguities.

═══════════════════════════════════════════════
OFFICIAL DESIGN SYSTEM CONTRACT (STRICT 3-COLOR TRIAD)
═══════════════════════════════════════════════
1. BRAND COLORS (STRICT RULES):
   - --color-brand-blue: #0C59F2 (Azul Eléctrico Institucional) -> IT IS THE ONLY BLUE ALLOWED IN THE ENTIRE APPLICATION. Zero navy (#052C87), zero deep dark blues, zero slate blue, zero blue-purple gradients.
   - --color-brand-yellow: #FFF12E (Amarillo Neón de Alta Visibilidad) -> The ONLY accent color. Used exclusively for Primary CTAs, urgency badges (Express 30-90 min, Flex), and glow effects.
   - --color-brand-white: #FFFFFF (Blanco Óptico Puro) -> Base surface for cards, modals, calculators, and high-contrast text on blue backgrounds.
   - ANTI-PATTERN: NEVER use black (#000000) or generic gray. Text on white surfaces MUST be #0C59F2 or #0C59F2/80.

2. TYPOGRAPHY RULES:
   - Anton ('Anton', sans-serif): Used exclusively for Display/Hero titles (72px desktop / 44px mobile, uppercase, leading 0.98, tracking -0.04em) and Section Headlines (48px, uppercase, leading 1.0). Banned for paragraphs.
   - Bebas Neue ('"Bebas Neue"', sans-serif): Used for Subheadings, Badges, Navigation, and CTA Button text (18px, uppercase, tracking 0.1em, leading 1.0).
   - Outfit ('Outfit', sans-serif): Used for Body copy, descriptions, and form labels (16px, leading 1.6, line length max 65 chars).
   - Geist Mono ('"Geist Mono"', monospace): Used for rates, prices (ARS $X.XXX), distances (X.X km), phone numbers (223 660-2699), hours (08:00 a 19:00 hs). Weights 600/700. Never invent fantasy numbers.
   - Prohibited Fonts: Inter, system serifs, generic system fonts.

3. COMPONENT STYLING:
   - Primary CTA: Background #FFF12E, text #0C59F2, font Bebas Neue uppercase, rounded-full, shadow-glow-yellow (0 0 25px rgba(255, 241, 46, 0.35)). Hover: scale-[1.02], Active: scale-[0.98].
   - Ghost CTA: Transparent bg, border-white/30, text #FFFFFF, rounded-full.
   - Light Cards: Pure white #FFFFFF, rounded-2xl or rounded-3xl (24-28px), border border-[#0C59F2]/10, shadow-card-elevation (0 20px 40px -15px rgba(12, 89, 242, 0.15)). Text and icons in #0C59F2.
   - Glassmorphic Cards: bg-white/10 backdrop-blur-md border border-white/20, text #FFFFFF.
   - Inputs: White bg #FFFFFF, text #0C59F2, border border-[#0C59F2]/20, focus:ring-2 focus:ring-[#0C59F2].
   - Bento Grids: 12-column asymmetric (7/5 or 8/4). No boring rows of 3 identical cards.
   - Icons: STRICTLY use 'lucide-react' only. ZERO emojis.

4. BRAND VOICE & LOCALIZATION:
   - Authentic Rioplatense Spanish with voseo ("Cotizá", "Calculá", "Elegí", "Sumate", "Hablemos").
   - Real operational context: Central warehouse at Friuli 1972 (Chauvín, Mar del Plata), delivery to General Pueyrredón and Batán.

═══════════════════════════════════════════════
INPUT SPECIFICATIONS:
═══════════════════════════════════════════════
- Component Name: {{{componentName}}}
- Target Page: {{{pageName}}}
- Category: {{{category}}}
- Repository Path: {{{componentPath}}}
- Baseline Content & Copy:
{{{baselineContent}}}
- Mandatory Review Elements:
{{#each elementsToReview}}
  * {{this}}
{{/each}}
{{#if visualPresets}}
- Visual Presets:
  * Glow Neon: {{visualPresets.glowNeon}}
  * Double Bezel: {{visualPresets.doubleBezel}}
  * Glassmorphism: {{visualPresets.glassmorphism}}
  * White Card Surface: {{visualPresets.whiteSurface}}
  * Animation Engine: {{visualPresets.animationType}}
  * Target Viewport: {{visualPresets.targetDevice}}
{{/if}}
{{#if customDirectives}}
- Custom Directives: {{{customDirectives}}}
{{/if}}

═══════════════════════════════════════════════
OUTPUT REQUIREMENTS:
═══════════════════════════════════════════════
Generate the full structured JSON response adhering strictly to the WebPromptOutputSchema.
- optimizedPrompt: Must be formatted in clean, professional Markdown with clear section headers (Role, Objective, Baseline Data, Design Tokens, Visual Architecture, Microinteractions, Accessibility, and Exact Deliverable).
- promptBreakdown: Fill all subfields accurately so the user can inspect the architectural decisions.
- previewSummary: A concise 1-2 sentence overview of what the component achieves.`,
});

// ==========================================
// GENKIT FLOW DEFINITION
// ==========================================
const optimizeWebPromptFlow = ai.defineFlow(
  {
    name: 'optimizeWebPromptFlow',
    inputSchema: WebPromptInputSchema,
    outputSchema: WebPromptOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await promptDefinition(input);
      if (output && output.optimizedPrompt) {
        return output;
      }
    } catch (primaryErr: unknown) {
      console.warn('Gemini 2.5 Flash primary inference fallback triggered:', primaryErr);
      
      const fallbackModels = ['googleai/gemini-1.5-flash', 'googleai/gemini-2.0-flash', 'googleai/gemini-1.5-pro'];
      for (const modelName of fallbackModels) {
        try {
          const res = await ai.generate({
            model: modelName,
            prompt: `Optimize this web component prompt for Envíos DosRuedas (Mar del Plata 2026):
Component: ${input.componentName} (${input.componentPath}) on ${input.pageName}
Category: ${input.category}
Content: ${input.baselineContent}
Enforce strict 3-color triad: Brand Blue #0C59F2 (the ONLY blue), Brand Yellow #FFF12E, Brand White #FFFFFF. Anton, Bebas Neue, Outfit, Geist Mono. Zero black, zero extra blues, zero emojis.
Output must conform to WebPromptOutputSchema with title, optimizedPrompt (in rich natural language markdown), promptBreakdown, and previewSummary.`,
            output: { schema: WebPromptOutputSchema },
          });
          if (res.output && res.output.optimizedPrompt) {
            return res.output;
          }
        } catch {
          // Continue to next fallback model
        }
      }
    }

    // High quality deterministic fallback
    return buildDeterministicWebPrompt(input);
  }
);

export async function optimizeWebPrompt(input: WebPromptInput): Promise<WebPromptOutput> {
  return optimizeWebPromptFlow(input);
}
