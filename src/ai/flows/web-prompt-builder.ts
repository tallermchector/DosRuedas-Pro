// ==========================================
// INPUT & OUTPUT INTERFACES (Pure TypeScript)
// ==========================================
export interface WebPromptVisualPresets {
  glowNeon?: boolean;
  doubleBezel?: boolean;
  glassmorphism?: boolean;
  whiteSurface?: boolean;
  animationType?: 'framer-motion' | 'tailwind-css' | 'none';
  targetDevice?: 'responsive-hybrid' | 'mobile-first' | 'desktop-enterprise';
}

export interface WebPromptInput {
  componentName: string;
  pageName: string;
  category: string;
  componentPath: string;
  baselineContent: string;
  elementsToReview?: string[];
  visualPresets?: WebPromptVisualPresets;
  customDirectives?: string;
}

export interface WebPromptOutputBreakdown {
  roleDefinition: string;
  dosRuedasContext: string;
  designTokensApplied: string[];
  technicalStructure: string;
  accessibilityWcag: string;
  suggestedIcons: string[];
}

export interface WebPromptOutput {
  title: string;
  optimizedPrompt: string;
  promptBreakdown: WebPromptOutputBreakdown;
  previewSummary: string;
}

// ==========================================
// DETERMINISTIC PROMPT BUILDER (Resilient Fallback & Client Utility)
// ==========================================
export function buildDeterministicWebPrompt(input: WebPromptInput): WebPromptOutput {
  const presets = input.visualPresets || {
    glowNeon: true,
    doubleBezel: false,
    glassmorphism: true,
    whiteSurface: true,
    animationType: 'framer-motion',
    targetDevice: 'responsive-hybrid',
  };

  const elementsList = (input.elementsToReview && input.elementsToReview.length > 0)
    ? input.elementsToReview.map(e => `  - ${e}`).join('\n')
    : '  - Mantener fidelidad visual estricta con la tríada pura (#0C59F2, #FFF12E, #FFFFFF).';

  const suggestedIcons = ['ArrowRight', 'CheckCircle2', 'Clock', 'MapPin', 'ShieldCheck', 'Sparkles', 'Package'];

  const promptText = `# Rol: Senior Frontend & Next.js 16 UI Architect
# Proyecto: Envíos DosRuedas (Mar del Plata, Argentina) - Plataforma Logística 2026
# Componente Objetivo: ${input.componentName} (${input.componentPath})
# Contexto de Página: ${input.pageName} · Categoría: ${input.category.toUpperCase()}

## 1. Misión y Alcance
Construí el componente visual \`${input.componentName}\` para la plataforma logística de última milla "Envíos DosRuedas" en Mar del Plata.
El componente debe ser modular, autónomo, tipado estrictamente en TypeScript (sin \`any\`), responsive (${presets.targetDevice}), accesible (WCAG 2.2 AA) y respetar sin excepciones el sistema de diseño oficial de la marca.

## 2. Contenido Base y Requerimientos de Negocio (docs/contenido)
${input.baselineContent}

## 3. Especificaciones Visuales y Criterios Mandatorios
${elementsList}
${input.customDirectives ? `\n## 4. Instrucciones Especiales del Usuario\n${input.customDirectives}` : ''}

## ${input.customDirectives ? '5' : '4'}. Tokens de Diseño Inmutables (Tríada Estricta de 3 Colores)
- Paleta Cromática Obligatoria:
  - Brand Blue (Azul Eléctrico Institucional): #0C59F2 (Es el ÚNICO azul permitido. Prohibidos azul marino, slate o celestes).
  - Brand Yellow (Amarillo Neón de Alta Visibilidad): #FFF12E (Único acento de conversión para CTAs primarios, badges de urgencia 30-90 min y glow).
  - Brand White (Blanco Óptico Puro): #FFFFFF (Superficie base para tarjetas de cotización, modales y textos principales sobre azul).
  - Anti-patrón de Contraste: NUNCA usar negro (#000000). El contraste sobre fondos blancos se resuelve con texto #0C59F2 o #0C59F2/80.
- Jerarquía Tipográfica de Precisión:
  - Titulares Display (Hero): 'Anton', sans-serif (72px desktop / 44px móvil, UPPERCASE, leading [0.98], tracking [-0.04em]).
  - Encabezados de Sección: 'Anton', sans-serif (48px, UPPERCASE, leading [1.0]).
  - Subtítulos, Badges de Estado y CTAs: 'Bebas Neue', sans-serif (18px, UPPERCASE, tracking [0.1em], leading [1.0]).
  - Texto de Lectura y Párrafos: 'Outfit', sans-serif (16px, leading [1.6], pesos 300/400/600, máx 65 caracteres de ancho).
  - Datos Numéricos, Tarifas y Tiempos: 'Geist Mono', monospace (14px, weight 600, tabular-nums). Prohibido inventar métricas irreales.
- Estructura y Superficies:
  ${presets.whiteSurface ? '- Tarjetas Claras: Fondo blanco óptico #FFFFFF con bordes sutiles border-[#0C59F2]/10 y sombra shadow-[0_20px_40px_-15px_rgba(12,89,242,0.15)]. Textos e iconos en #0C59F2.' : ''}
  ${presets.glassmorphism ? '- Tarjetas Glassmorphic: Fondo translúcido bg-white/10 con backdrop-blur-md, bordes border-white/20 y esquinas rounded-3xl. Textos en #FFFFFF.' : ''}
  ${presets.doubleBezel ? '- Doble Bisel (DoubleBezelCard): Contenedor con borde concéntrico exterior e interior para elevación técnica.' : '- Curvatura: rounded-2xl a rounded-3xl (24px a 28px de radio).'}
  ${presets.glowNeon ? '- Botón Principal (CTA): Fondo amarillo neón #FFF12E, texto azul #0C59F2 en Bebas Neue mayúsculas, forma rounded-full, sombra reflectiva shadow-[0_0_25px_rgba(255,241,46,0.35)]. Al pulsar: escala reactiva scale-[0.98].' : ''}
  - Micro-interacciones: ${presets.animationType === 'framer-motion' ? 'Física de resortes (stiffness: 100, damping: 20). Prohibido animar top/left/width/height, usar solo transform y opacity en GPU.' : 'Transiciones ágiles con Tailwind CSS (transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]).'}

## ${input.customDirectives ? '6' : '5'}. Tono de Marca y Localización
- Español rioplatense auténtico con voseo ("Cotizá", "Calculá", "Elegí", "Sumate", "Hablemos").
- Operación real en Mar del Plata: Depósito central Friuli 1972 (Chauvín), cobertura total en General Pueyrredón y Batán. Envíos Express 30-90 min.

## ${input.customDirectives ? '7' : '6'}. Entregable Requerido
Escribí el código completo del componente en TSX, con todas sus importaciones (únicamente iconos de \`lucide-react\`, sin emojis), tipos de TypeScript documentados y comentarios concisos de arquitectura.`;

  return {
    title: `Prompt Oficial: ${input.componentName} (${input.pageName})`,
    optimizedPrompt: promptText,
    promptBreakdown: {
      roleDefinition: 'Senior Frontend & Next.js 16 UI Architect para Envíos DosRuedas',
      dosRuedasContext: `Logística urbana en Mar del Plata (Friuli 1972), contexto ${input.pageName}`,
      designTokensApplied: [
        'Brand Blue #0C59F2 (Único azul permitido)',
        'Brand Yellow #FFF12E (Alta Visibilidad Neón)',
        'Brand White #FFFFFF (Blanco Óptico Puro)',
        'Font Display: Anton (72px / 48px uppercase)',
        'Font Subheading: Bebas Neue (18px uppercase tracking 0.1em)',
        'Font Body: Outfit (16px leading 1.6)',
        'Font Data: Geist Mono (14px weight 600)',
        'Sombra CTA: shadow-glow-yellow (rgba(255, 241, 46, 0.35))',
        'Sombra Cards: shadow-card-elevation (rgba(12, 89, 242, 0.15))',
      ],
      technicalStructure: `Next.js App Router, Tailwind CSS, ${presets.animationType === 'framer-motion' ? 'Framer Motion (stiffness: 100, damping: 20)' : 'Tailwind Transitions'}, Lucide React`,
      accessibilityWcag: 'Contraste estricto: texto blanco sobre fondo azul #0C59F2, texto azul #0C59F2 sobre fondo blanco. Focus con ring #0C59F2. Cero grises o negros.',
      suggestedIcons,
    },
    previewSummary: `Prompt de ingeniería frontend completo para ${input.componentName} basado en el Design System oficial (#0C59F2, #FFF12E, #FFFFFF).`,
  };
}
