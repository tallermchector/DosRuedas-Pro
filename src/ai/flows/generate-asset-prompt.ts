'use server';
/**
 * @fileOverview An AI agent and Genkit flow for generating Envíos DosRuedas image and typography asset prompts.
 * 
 * Optimized for Google Nano Banana 2 (Gemini 2.5 Flash Image) — flash-tier text-to-image model.
 * Implements the R2I (Reference-to-Image) Master Template using linked official brand references:
 * - Reference 1: Logo Oficial (#0636A5 / #FFEC01)
 * - Reference 2: Tríptico Personaje (Character sheet & facial consistency)
 * - Reference 3: Diseño Chaquetas (Softshell & technical outerwear)
 * - Reference 4: Kit de Uniforme (Polo & Cap)
 * 
 * Incorporates design tokens from design_envios_dosruedas.md and full prompt library from prompt-library.ts
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ==========================================
// DESIGN TOKENS (from design_envios_dosruedas.md)
// ==========================================
const DESIGN_TOKENS = {
  colors: {
    primaryBrand: '#0636A5',      // Brand-blue-700 / Egyptian Royal Navy Blue
    primaryAccent: '#FFEC01',     // Brand-yellow-500 / Electric Kinetic Yellow
    surfaceWhite: '#FFFFFF',      // Pure White
    surfaceDark: '#00277C',       // Brand-ink
    deepNavy: '#021440',          // Deep Navy variant
    lightBlue: '#0950F6',         // Light blue for fleet/3D
    paleBlue: '#E6EEFE',          // Pale blue for isometric
    midBlue: '#BACEFD',           // Mid blue for isometric
    techBlue: '#628FF9',          // Soft tech blue for UI
    kartYellow: '#FFEC01',        // Kinetic yellow
    white: '#FFFFFF',
    kraftBrown: '#C19A6B',        // Kraft cardboard approximation
    lightGreen: '#A8D5BA',        // WhatsApp bubble green
  },
  fonts: {
    display: 'Anton',
    subheading: 'Bebas Neue',
    body: 'Outfit',
    mono: 'Geist Mono',
  },
  brandVoice: 'Español rioplatense con voseo ("Elegí", "Conocé", "Sumate"), frases cortas, directas, profesionales y humanas, sin adjetivos huecos.',
} as const;

// ==========================================
// BRAND ANCHORS (from prompt-library.ts)
// ==========================================
const BRAND_ANCHORS = {
  photo: `Brand anchor: Envíos DosRuedas, a last-mile courier company in Mar del Plata, Argentina. Professional courier strictly matching reference images (Logo #0636A5/#FFEC01, Triptych character sheet, Softshell Jackets, Navy polo shirt with yellow trim and yellow cap); fleet is light-blue delivery scooters with a large square top box. Parcels are plain kraft cardboard boxes. Colour palette: deep blue (#0636A5) and electric yellow (#FFEC01) against the coastal light of Mar del Plata (Atlantic beaches, the Rambla and Casino, tree-lined streets of Chauvín and Güemes). Logo-free surfaces.`,
  
  threeD: `Style anchor: glossy 3D render in the Envíos DosRuedas brand look. Materials: light-blue (#0950F6 to #0636A5) glossy plastic and metal, electric-yellow (#FFEC01) accents, plain kraft cardboard, white plastic. Soft studio lighting from the upper left with a gentle rim light, subtle contact shadow, clean pure-white background for cut-out use. Rounded, friendly proportions, slightly toy-like, no text and no logos on surfaces.`,
  
  isometric: `Style anchor: isometric 3D illustration at a true 30-degree isometric angle, soft clay-like shading, city blocks in pale blue (#E6EEFE to #BACEFD), roads in white, water in mid blue (#0950F6), key objects in brand blue (#0636A5) and electric yellow (#FFEC01), pure-white background, no text, no logos.`,
  
  icons: `Style anchor: flat duotone line icon set for Envíos DosRuedas. 2.5px rounded strokes in deep blue (#0636A5) with a single electric-yellow (#FFEC01) filled accent shape per icon, drawn on a 24-unit grid with rounded corners and consistent optical weight, generous inner spacing, pure-white background, no text, no shadows, no gradients.`,
  
  typography: `Type anchor: Bold condensed all-caps sans-serif lettering inspired by Anton and Bebas Neue display typography, heavy visual weight, tight letter-spacing, strictly governed by the Envíos DosRuedas 3-color palette: Egyptian Royal Navy Blue (#0636A5 / #021440), Electric Kinetic Yellow (#FFEC01), and Pure White (#FFFFFF). Render the quoted text exactly on a single line, with zero spelling mistakes, no unwanted artifacts, and no third-party logos. Clean pure-white or deep-blue ground as specified, centered composition with generous negative space for UI cropping.`,
} as const;

// ==========================================
// REFERENCE DESCRIPTIONS FOR CONSISTENCY
// ==========================================
const REFERENCES = {
  ref1: 'Reference 1 (Logo Oficial): Primary source for Egyptian Royal Navy Blue (#0636A5 / #021440) and Electric Kinetic Yellow (#FFEC01).',
  ref2: 'Reference 2 (Tríptico Personaje): Character facial traits, athletic build, friendly confident expression, short dark beard, tanned skin, haircut, and skin tones for consistent human couriers.',
  ref3: 'Reference 3 (Diseño Chaquetas): High-tech softshell / windbreaker jackets in brand navy blue (#0636A5) with yellow zipper accents (#FFEC01) and reflective piping.',
  ref4: 'Reference 4 (Kit de Uniforme): Navy blue polo shirt (#0636A5) with electric yellow (#FFEC01) collar/trim and matching yellow courier cap.',
  fleet: 'Fleet: Light-blue delivery scooters with large square top boxes, yellow accents on mirrors and box edges, or compact 3PL vans with yellow stripe.',
  parcels: 'Parcels: Plain natural kraft cardboard boxes with clean packaging tape, white shipping labels.',
  setting: 'Setting: Authentic Mar del Plata, Argentina coastal and urban locations (Rambla Casino Central, Chauvín hub at Friuli 1972, Güemes commercial area, Colón, Port, Torreón del Monje, Atlantic coastal light).',
  negative: 'Negative Constraints: No unwanted third-party logos, no scrambled text on surfaces (logos added in post-production), no text unless explicitly quoted.',
} as const;

// ==========================================
// NANO BANANA 2 PARAMETERS SCHEMA
// ==========================================
const NanoBanana2ParametersSchema = z.object({
  numImages: z.number().int().min(1).max(4).default(1).describe('Number of images to generate (1-4). Use 4 for ideation batches.'),
  seed: z.number().int().min(0).max(2147483647).optional().describe('Seed for reproducible generations. Lock when iterating on a prompt.'),
  aspectRatio: z.enum(['auto', '21:9', '16:9', '3:2', '4:3', '5:4', '1:1', '4:5', '3:4', '2:3', '9:16']).default('16:9').describe('Target aspect ratio.'),
  resolution: z.enum(['0.5K', '1K', '2K', '4K']).default('1K').describe('Resolution tier. 0.5K for drafts, 1K default, 2K/4K for finals.'),
  outputFormat: z.enum(['png', 'jpeg', 'webp']).default('png').describe('Output format.'),
  safetyTolerance: z.number().int().min(1).max(6).default(4).describe('Safety tolerance 1 (strict) - 6 (permissive).'),
  limitGenerations: z.boolean().default(true).describe('Limit each prompt round to one generation.'),
  enableWebSearch: z.boolean().default(false).describe('Enable web grounding for current events/real entities. Adds latency + cost.'),
});

// ==========================================
// INPUT / OUTPUT SCHEMAS
// ==========================================
const AssetPromptInputSchema = z.object({
  assetType: z.enum([
    'rider-commercial-photo',
    'typography-3d',
    '3d-packaging-fleet',
    'isometric-map-hub',
    'duotone-icon-set',
    'custom'
  ]).describe('Type of asset to generate a prompt for.'),
  
  // Core content
  subjectAndAction: z.string().describe('Detailed subject and action description (e.g. Courier delivering package to a retail shop).'),
  locationContext: z.string().optional().describe('Specific setting or location (e.g. Chauvín, Rambla Casino Central, Güemes, Mar del Plata).'),
  cameraAndMedium: z.string().optional().describe('Camera specs or 3D engine style (e.g. Sony A7R IV 35mm, Octane 3D render).'),
  
  // Technical specs
  aspectRatio: z.enum(['16:9', '4:3', '1:1', '3:2', '4:5', '9:16']).default('16:9').describe('Target image aspect ratio.'),
  targetFile: z.string().optional().describe('Expected target file name (e.g. express-hero-rider-centro.webp).'),
  uiLocation: z.string().optional().describe('Target UI component or page where the image will be placed.'),
  additionalNotes: z.string().optional().describe('Extra instructions or constraints.'),
  
  // Nano Banana 2 specific
  nanoBananaParams: NanoBanana2ParametersSchema.optional().describe('Nano Banana 2 specific generation parameters.'),
  
  // Prompt library reference (optional - for pulling from library)
  promptLibraryId: z.string().optional().describe('ID from PROMPT_LIBRARY to use as base (e.g. IMG-1, BRD-A1, TYP-T1).'),
});
export type AssetPromptInput = z.infer<typeof AssetPromptInputSchema>;

const AssetPromptOutputSchema = z.object({
  title: z.string().describe('Descriptive title of the asset in Spanish.'),
  promptText: z.string().describe('The complete, production-ready English prompt string optimized for Nano Banana 2.'),
  coreStructure: z.object({
    subjectAndReferences: z.string().describe('Subject description tied strictly to References 1-4.'),
    settingContext: z.string().describe('Location and contextual atmosphere in Mar del Plata.'),
    styleMedium: z.string().describe('Lens, camera, lighting, and rendering style.'),
    colorAndBranding: z.string().describe('Brand color calibration and material specs.'),
    technicalConstraints: z.string().describe('Technical constraints like zero text, logo rules, and framing.'),
  }),
  parameters: z.object({
    aspectRatio: z.string().describe('Nano Banana 2 aspect_ratio parameter (e.g. 16:9).'),
    recommendedModel: z.string().describe('Recommended diffusion engine (Nano Banana 2).'),
    resolutionTarget: z.string().describe('Target resolution tier (e.g. 2K).'),
    suggestedFilename: z.string().describe('Suggested clean filename for public/ folder.'),
    nanoBananaParams: NanoBanana2ParametersSchema.describe('Full Nano Banana 2 parameter set for the runcomfy CLI.'),
  }),
  altTextEs: z.string().describe('Accurate and SEO-friendly Spanish alt text for the HTML <img> tag.'),
  brandComplianceNotes: z.string().describe('Checklist notes explaining why this prompt maintains strict character & brand consistency.'),
});
export type AssetPromptOutput = z.infer<typeof AssetPromptOutputSchema>;

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function mapAspectRatio(ar: string): 'auto' | '21:9' | '16:9' | '3:2' | '4:3' | '5:4' | '1:1' | '4:5' | '3:4' | '2:3' | '9:16' {
  const map: Record<string, 'auto' | '21:9' | '16:9' | '3:2' | '4:3' | '5:4' | '1:1' | '4:5' | '3:4' | '2:3' | '9:16'> = {
    '16:9': '16:9', '4:3': '4:3', '1:1': '1:1', '3:2': '3:2', '4:5': '4:5', '9:16': '9:16', '21:9': '21:9',
  };
  return map[ar] || '16:9';
}

function getBrandAnchor(assetType: string): string {
  switch (assetType) {
    case 'rider-commercial-photo': return BRAND_ANCHORS.photo;
    case '3d-packaging-fleet': return BRAND_ANCHORS.threeD;
    case 'isometric-map-hub': return BRAND_ANCHORS.isometric;
    case 'duotone-icon-set': return BRAND_ANCHORS.icons;
    case 'typography-3d': return BRAND_ANCHORS.typography;
    default: return BRAND_ANCHORS.photo;
  }
}

function getDefaultCamera(assetType: string): string {
  switch (assetType) {
    case 'rider-commercial-photo': return 'Sony A7R IV, 35mm f/2, high-end commercial photography';
    case 'typography-3d': return 'Octane 3D render, chunky 3D extruded lettering in Anton font style';
    case '3d-packaging-fleet': return 'Glossy 3D product render, Octane style, soft studio lighting';
    case 'isometric-map-hub': return 'Clean isometric 3D render, true 30-degree angle, orthographic camera';
    case 'duotone-icon-set': return 'Vector-style duotone line icons, 2.5px rounded stroke, flat design';
    default: return 'Sony A7R IV, 35mm f/2, high-end commercial photography';
  }
}

function getDefaultLocation(assetType: string): string {
  switch (assetType) {
    case 'rider-commercial-photo': return 'Mar del Plata, Argentina';
    case 'typography-3d': return 'Pure white studio ground (#FFFFFF) with soft contact shadow';
    case '3d-packaging-fleet': return 'Pure white studio background for cut-out use';
    case 'isometric-map-hub': return 'Mar del Plata isometric tile floating on white';
    case 'duotone-icon-set': return 'Pure white background, 24-unit grid';
    default: return 'Mar del Plata, Argentina';
  }
}

function getColorSpec(assetType: string): string {
  const c = DESIGN_TOKENS.colors;
  switch (assetType) {
    case 'typography-3d':
      return `Strict 3-color brand compliance: Egyptian Royal Navy Blue (${c.primaryBrand} / ${c.deepNavy}), Electric Kinetic Yellow (${c.primaryAccent}), Pure White (${c.surfaceWhite}).`;
    case '3d-packaging-fleet':
      return `Materials: light-blue (${c.lightBlue} to ${c.primaryBrand}) glossy plastic and metal, electric-yellow (${c.primaryAccent}) accents, plain kraft cardboard (${c.kraftBrown}), white plastic (${c.surfaceWhite}).`;
    case 'isometric-map-hub':
      return `Brand palette: Navy Blue (${c.primaryBrand}) for structures, Electric Yellow (${c.primaryAccent}) for highlights and routes, White (${c.surfaceWhite}) for roads and negative space, Pale blue (${c.paleBlue} to ${c.midBlue}) for city blocks, Mid blue (${c.midBlue}) for water.`;
    case 'duotone-icon-set':
      return `Duotone: Navy Blue (${c.primaryBrand}) primary stroke (2.5px rounded), Electric Yellow (${c.primaryAccent}) single filled accent per icon. Pure White (${c.surfaceWhite}) background.`;
    default:
      return `Use Reference 1 (Logo) as primary color calibration source. Navy Blue (${c.primaryBrand}) and Electric Yellow (${c.primaryAccent}). Textures must reflect softshell technical fabric and cotton polo from References 3-4. Fleet vehicles in light-blue (${c.lightBlue}) with square top boxes. Parcels in plain natural kraft cardboard (${c.kraftBrown}).`;
  }
}

function getStyleSpec(assetType: string, cameraAndMedium: string, additionalNotes?: string): string {
  const notes = additionalNotes ? ` ${additionalNotes}.` : '';
  switch (assetType) {
    case 'typography-3d':
      return `${cameraAndMedium}. Directional key light from upper-left, sharp bevel highlights, soft ambient occlusion contact shadow, pure white studio ground (${DESIGN_TOKENS.colors.surfaceWhite}). Clean studio lighting for product typography.${notes}`;
    case '3d-packaging-fleet':
      return `${cameraAndMedium}. Soft studio lighting from upper-left with gentle rim light, soft contact shadow, pure-white background for cut-out use. Rounded, friendly proportions, slightly toy-like.${notes}`;
    case 'isometric-map-hub':
      return `${cameraAndMedium}. Crisp vector-like edges, soft ambient occlusion. Technical map aesthetic, even daylight from upper-left.${notes}`;
    case 'duotone-icon-set':
      return `${cameraAndMedium}. Consistent visual weight across set, rounded caps, generous inner spacing. UI-ready iconography, no shadows, no gradients.${notes}`;
    default:
      return `${cameraAndMedium}. Sharp focus on the technical fabrics of the uniform shown in References 3-4. Atlantic coastal maritime light of Mar del Plata.${notes}`;
  }
}

function getSubjectPart(input: AssetPromptInput): string {
  const { assetType, subjectAndAction } = input;
  
  switch (assetType) {
    case 'typography-3d':
      return `The text "${subjectAndAction}" as chunky 3D extruded lettering in Anton display font style. Front faces in glossy electric kinetic yellow (#FFEC01), lateral block extrusion in solid Egyptian royal navy blue (#0636A5).`;
    
    case '3d-packaging-fleet':
      return `Glossy 3D product render: ${subjectAndAction}. Friendly slightly toy-like proportions, clean product-render composition.`;
    
    case 'isometric-map-hub':
      return `Isometric aerial view of ${subjectAndAction}. Clean technical illustration style with precise geometry at true 30-degree isometric angle.`;
    
    case 'duotone-icon-set':
      return `Duotone icon set: ${subjectAndAction}. Minimalist line-work icons with consistent 2.5px stroke weight, rounded corners, generous inner spacing.`;
    
    default: // rider-commercial-photo
      return `Professional courier from Envíos DosRuedas. Appearance, gear, and uniform must strictly match the character design and clothing shown in Reference 2 (Tríptico Personaje), Reference 3 (Diseño Chaquetas), and Reference 4 (Kit de Uniforme). ${subjectAndAction}.`;
  }
}

// ==========================================
// DETERMINISTIC PROMPT BUILDER (Nano Banana 2 optimized)
// ==========================================
function buildNanoBananaPrompt(input: AssetPromptInput): AssetPromptOutput {
  const loc = input.locationContext || getDefaultLocation(input.assetType);
  const cam = input.cameraAndMedium || getDefaultCamera(input.assetType);
  const nbParams = input.nanoBananaParams || {};
  const brandAnchor = getBrandAnchor(input.assetType);
  
  const aspectRatio = mapAspectRatio(input.aspectRatio);
  const resolution = nbParams.resolution || '1K';
  const numImages = nbParams.numImages || 1;
  const seed = nbParams.seed;
  const outputFormat = nbParams.outputFormat || 'png';
  const safetyTolerance = nbParams.safetyTolerance ?? 4;
  const limitGenerations = nbParams.limitGenerations ?? true;
  const enableWebSearch = nbParams.enableWebSearch ?? false;
  const filename = input.targetFile || 'asset-envios-dosruedas.webp';

  const subjectPart = getSubjectPart(input);
  const colorPart = getColorSpec(input.assetType);
  const stylePart = getStyleSpec(input.assetType, cam, input.additionalNotes);

  // Build Nano Banana 2 optimized prompt (subject-first declarative grammar, 50-100 words)
  const promptText = `${subjectPart} Setting: ${loc}. ${stylePart} ${colorPart} Maintain character consistency based on the provided reference sheets. No text or logos on surfaces unless explicitly quoted exactly — logos added in post-production. Ultra-high resolution, photorealistic, 8k detail.`;

  return {
    title: `Asset R2I-NB2: ${input.subjectAndAction.slice(0, 50)}...`,
    promptText,
    coreStructure: {
      subjectAndReferences: subjectPart,
      settingContext: `${loc} con luz atlántica de Mar del Plata`,
      styleMedium: stylePart,
      colorAndBranding: colorPart,
      technicalConstraints: `Consistencia de personaje y colores corporativos (Refs 1-4), sin tipografías en superficies salvo citas exactas, logos en post-producción`
    },
    parameters: {
      aspectRatio,
      recommendedModel: 'Google Nano Banana 2 (Gemini 2.5 Flash Image)',
      resolutionTarget: resolution,
      suggestedFilename: filename,
      nanoBananaParams: {
        numImages,
        seed,
        aspectRatio,
        resolution,
        outputFormat,
        safetyTolerance,
        limitGenerations,
        enableWebSearch,
      },
    },
    altTextEs: `Envíos DosRuedas: ${input.subjectAndAction.replace(/"/g, '')} en Mar del Plata.`,
    brandComplianceNotes: 'Generado con Plantilla Maestra R2I optimizada para Nano Banana 2 vinculando 4 referencias oficiales (Logo, Tríptico, Chaquetas Softshell, Polo/Gorra). Prompt usa gramática declarativa subject-first, citas exactas para tipografía, ancla de estilo única, 50-100 palabras.'
  };
}

// ==========================================
// AI PROMPT DEFINITION (with full context)
// ==========================================
const promptDefinition = ai.definePrompt({
  name: 'generateAssetPromptTemplate',
  input: { schema: AssetPromptInputSchema },
  output: { schema: AssetPromptOutputSchema },
  prompt: `You are the Lead Visual Prompt Engineer and Brand Guardian for "Envíos DosRuedas", a premium B2B and e-commerce last-mile logistics enterprise based in Mar del Plata, Argentina.

YOUR MISSION:
Generate an ultra-precise, photorealistic or 3D visual prompt strictly following the official Envíos DosRuedas R2I (Reference-to-Image) Master Template and Brand Guidelines, OPTIMIZED FOR GOOGLE NANO BANANA 2 (Gemini 2.5 Flash Image).

═══════════════════════════════════════════════
DESIGN TOKENS (design_envios_dosruedas.md)
═══════════════════════════════════════════════
- Primary Brand (Egyptian Royal Navy Blue): #0636A5 / #021440
- Primary Accent (Electric Kinetic Yellow): #FFEC01
- Surface White: #FFFFFF
- Surface Dark / Brand Ink: #00277C
- Light Blue (fleet/3D): #0950F6
- Pale Blue (isometric): #E6EEFE → #BACEFD
- Tech Blue (UI): #628FF9
- Kraft Cardboard: #C19A6B
- Fonts: Display=Anton, Subheading=Bebas Neue, Body=Outfit, Mono=Geist Mono
- Brand Voice: Español rioplatense con voseo ("Elegí", "Conocé", "Sumate"), frases cortas, directas, profesionales y humanas.

═══════════════════════════════════════════════
OFFICIAL BRAND REFERENCES (R2I Master Template)
═══════════════════════════════════════════════
${REFERENCES.ref1}
${REFERENCES.ref2}
${REFERENCES.ref3}
${REFERENCES.ref4}
${REFERENCES.fleet}
${REFERENCES.parcels}
${REFERENCES.setting}
${REFERENCES.negative}

═══════════════════════════════════════════════
BRAND ANCHORS (per asset type - from prompt-library.ts)
═══════════════════════════════════════════════
PHOTO (rider-commercial-photo):
${BRAND_ANCHORS.photo}

3D PACKAGING/FLEET (3d-packaging-fleet):
${BRAND_ANCHORS.threeD}

ISOMETRIC MAPS (isometric-map-hub):
${BRAND_ANCHORS.isometric}

DUOTONE ICONS (duotone-icon-set):
${BRAND_ANCHORS.icons}

TYPOGRAPHY 3D (typography-3d):
${BRAND_ANCHORS.typography}

═══════════════════════════════════════════════
NANO BANANA 2 PROMPTING RULES (CRITICAL)
═══════════════════════════════════════════════
1. **Subject-first declarative grammar** — Write complete sentences, not keyword lists. "A professional courier stands..." not "courier, professional, standing".
2. **Exact text quoting for in-image typography** — If text is requested, put exact characters in quotes: "The label reads 'AURA' in clean bold sans-serif".
3. **Single style anchor** — Pick 1-2 style descriptors max. Don't mix "minimalist + ornate + retro + cyberpunk".
4. **Specific technical details** — Include lens (35mm, 85mm), lighting (golden hour, three-point studio), camera settings (f/2.0 shallow DOF).
5. **Composition guidance** — Explicitly mention rule of thirds, centered, leading lines, foreground/mid-ground/background layers.
6. **Mood/atmosphere** — Always specify emotional tone: confident, approachable, serene, dynamic, contemplative, warm, optimistic.
7. **Length target** — 50-100 words for balanced control. Avoid overly long prompts (>200 words).
8. **Front-load subject** — Primary subject first, then action, environment, style, camera. Trail with directives.
9. **Consistent seeds** — Lock seed when iterating a single prompt across variants for composition stability.
10. **Web search sparingly** — Only enable for current events/real entities.

═══════════════════════════════════════════════
STRUCTURE REQUIREMENTS FOR NANO BANANA 2
═══════════════════════════════════════════════
1. [Subject + Action + References]: "Professional courier from Envíos DosRuedas matching Reference 2/3/4 character design. {detailed action in complete sentence}."
2. [Setting / Context]: "{Location} in Mar del Plata, Argentina. Coastal city architecture, asphalt textures, Atlantic maritime light. {specific atmospheric details}."
3. [Style / Medium]: "{Camera/lens specs}. {Lighting type and direction}. {Composition rule}. {Mood}."
4. [Color Palette & Branding]: "Brand colors from Reference 1: Navy Blue (#0636A5) and Electric Yellow (#FFEC01). Material textures from References 3-4: softshell technical fabric, cotton polo."
5. [Technical Constraints]: "Character consistency per reference sheet. No text on surfaces unless quoted exactly. Ultra-high resolution, photorealistic. {Nano Banana 2 params: aspect_ratio, resolution, seed if locked}."

═══════════════════════════════════════════════
USER INPUT
═══════════════════════════════════════════════
- Asset Type: {{{assetType}}}
- Subject & Action: {{{subjectAndAction}}}
{{#if locationContext}}- Location: {{{locationContext}}}{{/if}}
{{#if cameraAndMedium}}- Camera / Medium Preference: {{{cameraAndMedium}}}{{/if}}
- Aspect Ratio: {{{aspectRatio}}}
{{#if targetFile}}- Target Filename: {{{targetFile}}}{{/if}}
{{#if uiLocation}}- UI Location: {{{uiLocation}}}{{/if}}
{{#if additionalNotes}}- Additional Notes: {{{additionalNotes}}}{{/if}}
{{#if nanoBananaParams}}- Nano Banana 2 Params: {{{jsonStringify nanoBananaParams}}}{{/if}}
{{#if promptLibraryId}}- Prompt Library ID: {{{promptLibraryId}}} (use corresponding fullPromptText as strong base){{/if}}

═══════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════
Generate the full structured JSON response adhering strictly to the AssetPromptOutputSchema.

CRITICAL:
- Output promptText as a SINGLE COHERENT PARAGRAPH (50-100 words) with COMPLETE SENTENCES.
- Use Nano Banana 2 prompting rules above.
- Include the full nanoBananaParams object in parameters with ALL fields populated.
- For typography-3d: quote the exact text from subjectAndAction in the prompt.
- For rider-commercial-photo: reference all 4 references explicitly.
- Maintain brand voice awareness (rioplatense context for Mar del Plata authenticity).`,
});

// ==========================================
// FLOW DEFINITION
// ==========================================
const generateAssetPromptFlow = ai.defineFlow(
  {
    name: 'generateAssetPromptFlow',
    inputSchema: AssetPromptInputSchema,
    outputSchema: AssetPromptOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await promptDefinition(input);
      if (output) return output;
    } catch (primaryErr: unknown) {
      console.warn('Gemini 2.5 Flash busy (503/high demand), applying model fallback...', primaryErr);
      
      // Attempt with fallback models via generate
      const fallbackModels = ['googleai/gemini-1.5-flash', 'googleai/gemini-1.5-pro', 'googleai/gemini-2.0-flash'];
      for (const modelName of fallbackModels) {
        try {
          const res = await ai.generate({
            model: modelName,
            prompt: `Generate a visual prompt for Envíos DosRuedas following the R2I Master Template optimized for Nano Banana 2.
Input: ${JSON.stringify(input)}
Output must conform to JSON schema with title, promptText, coreStructure, parameters, altTextEs, brandComplianceNotes.
Use Nano Banana 2 prompting rules: subject-first declarative grammar, complete sentences, 50-100 words, exact text quoting, single style anchor.
Design tokens: #0636A5 (navy), #FFEC01 (yellow), #FFFFFF (white), #021440 (deep navy), #0950F6 (light blue).
References: Logo, Triptych character, Softshell jackets, Navy polo+yellow cap. Fleet: light-blue scooters with square top boxes.`,
            output: { schema: AssetPromptOutputSchema }
          });
          if (res.output) return res.output;
        } catch {
          // continue to next model
        }
      }
    }
    
    // Deterministic fallback guarantee
    return buildNanoBananaPrompt(input);
  }
);

export async function generateAssetPrompt(input: AssetPromptInput): Promise<AssetPromptOutput> {
  return generateAssetPromptFlow(input);
}