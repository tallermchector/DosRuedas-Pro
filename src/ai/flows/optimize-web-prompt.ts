'use server';
/**
 * @fileOverview Genkit Flow for optimizing web component prompts for Envíos DosRuedas.
 * 
 * Generates natural language, production-grade frontend engineering prompts ready to be
 * passed to an AI coding agent (Cursor, Antigravity, Claude, etc.) to build visual components.
 * 
 * Complies with GEMINI.md (Structured outputs, Zod validation, Gemini 2.5 Flash with fallback)
 * and AGENTS.md (Tailwind CSS, Lucide icons, Design tokens, Rioplatense voice).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ==========================================
// INPUT & OUTPUT SCHEMAS
// ==========================================
export const WebPromptInputSchema = z.object({
  componentName: z.string().describe('Name of the component to create/refactor (e.g. Hero, ServicesOverview, DoubleBezelCard).'),
  pageName: z.string().describe('Target page or section context (e.g. Home (Inicio), Cotizador Express).'),
  category: z.string().describe('Component category: hero, cards, bento, form, cta, table, stats, stepper, faq, slider, uikit, legal.'),
  componentPath: z.string().describe('Expected repository file path (e.g. src/components/Hero.tsx).'),
  baselineContent: z.string().describe('Text copy, data, and functional requirements from docs/contenido.'),
  elementsToReview: z.array(z.string()).default([]).describe('Mandatory visual specs or review criteria.'),
  visualPresets: z.object({
    glowNeon: z.boolean().default(true).describe('Include High-Voltage Yellow neon glow effects.'),
    doubleBezel: z.boolean().default(false).describe('Use DoubleBezelCard concentric borders.'),
    glassmorphism: z.boolean().default(true).describe('Use backdrop-blur-md and semi-transparent dark navy surfaces.'),
    navySurface: z.boolean().default(true).describe('Use Midnight Navy (#052C87) surfaces instead of generic gray.'),
    animationType: z.enum(['framer-motion', 'tailwind-css', 'none']).default('framer-motion').describe('Animation engine to specify.'),
    targetDevice: z.enum(['responsive-hybrid', 'mobile-first', 'desktop-enterprise']).default('responsive-hybrid').describe('Target viewport priority.'),
  }).optional(),
  customDirectives: z.string().optional().describe('Additional free-form instructions provided by the user.'),
});

export type WebPromptInput = z.infer<typeof WebPromptInputSchema>;

export const WebPromptOutputSchema = z.object({
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

export type WebPromptOutput = z.infer<typeof WebPromptOutputSchema>;

// ==========================================
// DETERMINISTIC PROMPT BUILDER (Resilient Fallback)
// ==========================================
export function buildDeterministicWebPrompt(input: WebPromptInput): WebPromptOutput {
  const presets = input.visualPresets || {
    glowNeon: true,
    doubleBezel: false,
    glassmorphism: true,
    navySurface: true,
    animationType: 'framer-motion',
    targetDevice: 'responsive-hybrid',
  };

  const elementsList = (input.elementsToReview && input.elementsToReview.length > 0)
    ? input.elementsToReview.map(e => `  - ${e}`).join('\n')
    : '  - Mantener fidelidad visual estricta con el sistema de diseño 2026 de Envíos DosRuedas.';

  const suggestedIcons = ['ArrowRight', 'CheckCircle2', 'Clock', 'MapPin', 'ShieldCheck', 'Sparkles', 'Package'];

  const promptText = `# Rol: Senior Frontend & Next.js 16 UI Architect
# Proyecto: Envíos DosRuedas (Mar del Plata, Argentina) - Plataforma Logística 2026
# Componente Objetivo: ${input.componentName} (${input.componentPath})
# Contexto de Página: ${input.pageName} · Categoría: ${input.category.toUpperCase()}

## 1. Misión y Alcance
Construí el componente visual \`${input.componentName}\` para la plataforma logística de última milla "Envíos DosRuedas" en Mar del Plata.
El componente debe ser autónomo, modular, tipado estrictamente en TypeScript (sin uso de \`any\`), responsive (${presets.targetDevice}), accesible (WCAG 2.2 AA) y listo para producción.

## 2. Contenido Base y Requerimientos de Negocio (docs/contenido)
${input.baselineContent}

## 3. Especificaciones Visuales y Criterios Mandatorios
${elementsList}
${input.customDirectives ? `\n## 4. Instrucciones Especiales del Usuario\n${input.customDirectives}` : ''}

## ${input.customDirectives ? '5' : '4'}. Tokens de Diseño Inmutables de Envíos DosRuedas
- Paleta Corporativa:
  - Brand Primary (Azul Rey / Speed Blue): #0636A5
  - Brand Accent (Amarillo Cinético / Neón): #FFF12E o #FFEC01
  - Superficies Oscuras: Midnight Navy (#052C87) y Deep Contrast (#031E5C) (prohibido usar grises neutros genéricos de Tailwind)
  - Superficie Texto / Íconos: Blanco puro (#FFFFFF) y Slate Claro (#F8FAFC)
  - Bordes Luminosos: border-white/10 o border-[#FFF12E]/30
- Tipografía y Jerarquía:
  - Títulos Principales y Display: 'Anton', sans-serif (UPPERCASE, opcional sutil inclinación -1deg)
  - Badges, Subtítulos y CTAs: 'Bebas Neue', sans-serif (tracking-wider uppercase)
  - Texto de Lectura y Párrafos: 'Outfit', sans-serif (interlineado holgado)
  - Cifras, Precios, Direcciones y Horarios: 'Geist Mono', monospace (tabular-nums)
- Elevación y Superficies:
  ${presets.doubleBezel ? '- Estructura de Bisel Doble (DoubleBezelCard): contenedor con borde exterior fino y contorno interior con resplandor sutil.' : '- Tarjetas redondeadas: rounded-3xl (28px de radio) con padding holgado.'}
  ${presets.glassmorphism ? '- Efecto Glassmorphism: backdrop-blur-md con fondo Midnight Navy semitransparente (bg-[#052C87]/80 o bg-white/5).' : ''}
  ${presets.glowNeon ? '- Resplandor Neón en CTAs: shadow-[0_0_20px_rgba(255,241,46,0.35)] en botones activos y píldoras amarillas.' : ''}
  - Hover & Microinteracciones: ${presets.animationType === 'framer-motion' ? 'Integrar Framer Motion con transiciones fluidas de entrada (initial/animate) y microinteracciones de escala en hover/tap.' : 'Usar clases de Tailwind CSS como transition-all duration-200 hover:-translate-y-1 active:scale-95.'}

## ${input.customDirectives ? '6' : '5'}. Tono de Marca y Localización
- Español rioplatense auténtico con voseo profesional ("Cotizá", "Calculá", "Elegí", "Sumate", "Hablemos").
- Referencias operativas reales: Depósito central en Friuli 1972 (Chauvín, Mar del Plata), cobertura en todo General Pueyrredón y Batán.

## ${input.customDirectives ? '7' : '6'}. Entregable Requerido
Escribí el código completo del componente en TSX, con todas sus importaciones (únicamente iconos de \`lucide-react\`), tipos de TypeScript documentados y comentarios concisos de arquitectura. Evitá placeholders o lógica truncada.`;

  return {
    title: `Prompt Optimizado: ${input.componentName} (${input.pageName})`,
    optimizedPrompt: promptText,
    promptBreakdown: {
      roleDefinition: 'Senior Frontend & Next.js 16 UI Architect para Envíos DosRuedas',
      dosRuedasContext: `Plataforma logística en Mar del Plata, sede Friuli 1972, contexto ${input.pageName}`,
      designTokensApplied: [
        'Primary Blue #0636A5',
        'Kinetic Yellow #FFF12E / #FFEC01',
        'Midnight Navy #052C87',
        'Font Display: Anton',
        'Font Subheading: Bebas Neue',
        'Font Body: Outfit',
        'Font Monospace: Geist Mono',
        'Border Radius: rounded-3xl / rounded-full',
      ],
      technicalStructure: `Next.js App Router, Tailwind CSS, ${presets.animationType === 'framer-motion' ? 'Framer Motion' : 'Tailwind Transitions'}, Lucide React`,
      accessibilityWcag: 'Contraste alto sobre Midnight Navy, focus-visible con anillo amarillo, etiquetas semánticas y aria labels para lectores de pantalla.',
      suggestedIcons,
    },
    previewSummary: `Prompt de ingeniería frontend completo para generar el componente ${input.componentName} de la página ${input.pageName}, con tokens corporativos y especificaciones de docs/contenido.`,
  };
}

// ==========================================
// AI PROMPT DEFINITION (Genkit + Gemini 2.5 Flash)
// ==========================================
const promptDefinition = ai.definePrompt({
  name: 'optimizeWebComponentPromptTemplate',
  input: { schema: WebPromptInputSchema },
  output: { schema: WebPromptOutputSchema },
  prompt: `You are the Principal Frontend Architect and Lead Design System Guardian for "Envíos DosRuedas", a high-performance last-mile logistics tech platform based in Mar del Plata, Argentina (2026 Edition).

YOUR MISSION:
Synthesize the provided component specifications from the official documentation (docs/contenido), design tokens, and user preferences into an EXHAUSTIVE, FLAWLESS, PRODUCTION-GRADE prompt written in NATURAL LANGUAGE.
This prompt will be handed directly to an AI coding agent (Cursor, Antigravity, Claude Code) so it can implement the exact visual React component without ambiguities.

═══════════════════════════════════════════════
DESIGN SYSTEM & TOKENS CONTRACT (IMMUTABLE)
═══════════════════════════════════════════════
1. BRAND COLORS:
   - Primary Brand (Speed Blue / Royal Egyptian Navy): #0636A5
   - Brand Accent (High-Voltage Kinetic Yellow): #FFF12E or #FFEC01 (used for badges, hero highlights, glow effects)
   - Dark Surfaces: Midnight Navy (#052C87) and Deep Contrast (#031E5C) — NEVER use generic Tailwind grays (bg-gray-800, bg-zinc-900 are STRICTLY FORBIDDEN)
   - Surface White: #FFFFFF, Subtle text: #F8FAFC / #94A3B8
   - Borders: border-white/10 to border-white/20, active borders border-[#FFF12E]/40

2. TYPOGRAPHY HIERARCHY:
   - Display & Hero Titles: 'Anton', sans-serif (UPPERCASE, tight leading, optional slight rotation -1deg)
   - Badges, Metric Labels & Button CTAs: 'Bebas Neue', sans-serif (UPPERCASE, tracking-wider)
   - Body & Explanatory Copy: 'Outfit', sans-serif (lineHeight relaxed)
   - Numbers, Rates, Timers, Addresses & Geolocation: 'Geist Mono', monospace (tabular-nums)

3. VISUAL SHAPES & ELEVATION:
   - Cards & Bento containers: rounded-3xl (28px radius) with subtle borders and backdrop blur
   - Badges & Action CTAs: rounded-full with shadow-glow-yellow (shadow-[0_0_20px_rgba(255,241,46,0.35)])
   - Icons: STRICTLY use 'lucide-react' only

4. BRAND VOICE & LOCALIZATION:
   - Authentic Rioplatense Spanish with voseo ("Cotizá", "Calculá", "Elegí", "Sumate", "Hablemos")
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
  * Midnight Navy Surface: {{visualPresets.navySurface}}
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
Tokens: #0636A5 (Speed Blue), #FFF12E (Neon Yellow), #052C87 (Midnight Navy), Anton, Bebas Neue, Outfit, Geist Mono.
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
