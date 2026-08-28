'use server';
/**
 * @fileOverview An AI agent and Genkit flow for generating Envíos DosRuedas image and typography asset prompts.
 * 
 * Implements the R2I (Reference-to-Image) Master Template using linked official brand references:
 * - Reference 1: Logo Oficial (#0636A5 / #FFEC01)
 * - Reference 2: Tríptico Personaje (Character sheet & facial consistency)
 * - Reference 3: Diseño Chaquetas (Softshell & technical outerwear)
 * - Reference 4: Kit de Uniforme (Polo & Cap)
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssetPromptInputSchema = z.object({
  assetType: z.enum([
    'rider-commercial-photo',
    'typography-3d',
    '3d-packaging-fleet',
    'isometric-map-hub',
    'duotone-icon-set',
    'custom'
  ]).describe('Type of asset to generate a prompt for.'),
  subjectAndAction: z.string().describe('Detailed subject and action description (e.g. Courier delivering package to a retail shop).'),
  locationContext: z.string().optional().describe('Specific setting or location (e.g. Chauvín, Rambla Casino Central, Güemes, Mar del Plata).'),
  cameraAndMedium: z.string().optional().describe('Camera specs or 3D engine style (e.g. Sony A7R IV 35mm, Octane 3D render).'),
  aspectRatio: z.enum(['16:9', '4:3', '1:1', '3:2', '4:5', '9:16']).default('16:9').describe('Target image aspect ratio.'),
  targetFile: z.string().optional().describe('Expected target file name (e.g. express-hero-rider-centro.webp).'),
  uiLocation: z.string().optional().describe('Target UI component or page where the image will be placed.'),
  additionalNotes: z.string().optional().describe('Extra instructions or constraints.'),
});
export type AssetPromptInput = z.infer<typeof AssetPromptInputSchema>;

const AssetPromptOutputSchema = z.object({
  title: z.string().describe('Descriptive title of the asset in Spanish.'),
  promptText: z.string().describe('The complete, production-ready English prompt string ready to copy/paste into Midjourney v6 / Gemini / Flux.'),
  coreStructure: z.object({
    subjectAndReferences: z.string().describe('Subject description tied strictly to Image 1-4 references.'),
    settingContext: z.string().describe('Location and contextual atmosphere in Mar del Plata.'),
    styleMedium: z.string().describe('Lens, camera, lighting, and rendering style.'),
    colorAndBranding: z.string().describe('Brand color calibration (#0636A5, #FFEC01, #FFFFFF) and material specs.'),
    technicalConstraints: z.string().describe('Technical constraints like zero text, logo rules, and framing.'),
  }),
  parameters: z.object({
    aspectRatio: z.string().describe('Aspect ratio parameter (e.g. --ar 16:9).'),
    recommendedModel: z.string().describe('Recommended diffusion engine (e.g. Midjourney v6.0 raw / Imagen 3 / Flux.1).'),
    resolutionTarget: z.string().describe('Target resolution (e.g. 2K 1920x1080).'),
    suggestedFilename: z.string().describe('Suggested clean filename for public/ folder.'),
  }),
  altTextEs: z.string().describe('Accurate and SEO-friendly Spanish alt text for the HTML <img> tag.'),
  brandComplianceNotes: z.string().describe('Checklist notes explaining why this prompt maintains strict character & brand consistency.'),
});
export type AssetPromptOutput = z.infer<typeof AssetPromptOutputSchema>;

function buildDeterministicPrompt(input: AssetPromptInput): AssetPromptOutput {
  const loc = input.locationContext || 'Mar del Plata, Argentina';
  const cam = input.cameraAndMedium || 'Sony A7R IV, 35mm f/2, high-end commercial photography';
  const notes = input.additionalNotes ? ` ${input.additionalNotes}.` : '';

  let subjectPart = '';
  let colorPart = '';
  let stylePart = '';
  let filename = input.targetFile || 'asset-envios-dosruedas.webp';

  if (input.assetType === 'typography-3d') {
    subjectPart = `The text ${input.subjectAndAction} as chunky 3D extruded lettering in Anton display font style. Front faces in glossy electric kinetic yellow (#FFEC01), lateral block extrusion in solid Egyptian royal navy blue (#0636A5).`;
    colorPart = `Strict 3-color brand compliance: Egyptian Royal Navy Blue (#0636A5 / #021440), Electric Kinetic Yellow (#FFEC01), Pure White (#FFFFFF).`;
    stylePart = `Octane 3D render style, directional key light from upper-left, sharp bevel highlights, soft ambient occlusion contact shadow, pure white studio ground (#FFFFFF).`;
    if (!input.targetFile) filename = 'type-asset-3d.png';
  } else if (input.assetType === '3d-packaging-fleet') {
    subjectPart = `Glossy 3D product render: ${input.subjectAndAction}. Friendly slightly toy-like proportions, clean product-render composition.`;
    colorPart = `Materials: light-blue (#0950F6 to #0636A5) glossy plastic and metal, electric-yellow (#FFEC01) accents, plain kraft cardboard.`;
    stylePart = `Soft studio lighting from upper-left with gentle rim light, soft contact shadow, pure-white background for cut-out use.`;
    if (!input.targetFile) filename = 'asset-3d-packaging.png';
  } else {
    subjectPart = `Professional courier from Envíos DosRuedas. Appearance, gear, and uniform must strictly match the character design and clothing shown in Image 2 (Triptych), Image 3 (Jackets), and Image 4 (Polo/Cap). ${input.subjectAndAction}.`;
    colorPart = `Use Image 1 (Logo) as the primary source for color calibration. Navy Blue (#0636A5) and Electric Yellow (#FFEC01). Textures must reflect the softshell and cotton materials from the reference images.`;
    stylePart = `${cam}. Sharp focus on the technical fabrics of the uniform shown in references.${notes}`;
  }

  const promptText = `${subjectPart} Location: ${loc}. Coastal city architecture, asphalt textures, and Atlantic maritime light. ${stylePart} ${colorPart} Maintain character consistency based on the provided character sheet. No text unless specifically requested via the logo reference. 8k resolution, ultra-realistic, high resolution. --ar ${input.aspectRatio} --style raw --v 6.0`;

  return {
    title: `Asset R2I: ${input.subjectAndAction.slice(0, 45)}...`,
    promptText,
    coreStructure: {
      subjectAndReferences: subjectPart,
      settingContext: `${loc} con luz atlántica de Mar del Plata`,
      styleMedium: stylePart,
      colorAndBranding: colorPart,
      technicalConstraints: `Consistencia de uniforme y colores corporativos, sin tipografías no solicitadas, --ar ${input.aspectRatio}`
    },
    parameters: {
      aspectRatio: `--ar ${input.aspectRatio}`,
      recommendedModel: 'Midjourney v6.0 / Imagen 3 / Flux.1',
      resolutionTarget: '2K / 4K Photorealistic',
      suggestedFilename: filename
    },
    altTextEs: `Envíos DosRuedas: ${input.subjectAndAction.replace(/"/g, '')} en Mar del Plata.`,
    brandComplianceNotes: 'Generado con la Plantilla Maestra R2I vinculando las 4 referencias oficiales (Logo, Tríptico, Chaquetas Softshell y Polo/Gorra).'
  };
}

const promptDefinition = ai.definePrompt({
  name: 'generateAssetPromptTemplate',
  input: { schema: AssetPromptInputSchema },
  output: { schema: AssetPromptOutputSchema },
  prompt: `You are the Lead Visual Prompt Engineer and Brand Guardian for "Envíos DosRuedas", a premium B2B and e-commerce last-mile logistics enterprise based in Mar del Plata, Argentina.

YOUR MISSION:
Generate an ultra-precise, photorealistic or 3D visual prompt strictly following the official Envíos DosRuedas R2I (Reference-to-Image) Master Template and Brand Guidelines.

OFFICIAL BRAND RULES & LINKED REFERENCES:
- Reference 1 (Logo Oficial): Primary source for Egyptian Royal Navy Blue (#0636A5 / #021440) and Electric Kinetic Yellow (#FFEC01).
- Reference 2 (Tríptico Personaje): Character facial traits, athletic build, friendly confident expression, haircut, and skin tones for consistent human couriers.
- Reference 3 (Diseño Chaquetas): High-tech softshell / windbreaker jackets in brand navy blue with yellow zipper accents and reflective piping.
- Reference 4 (Kit de Uniforme): Navy blue polo shirt (#0636A5) with electric yellow (#FFEC01) collar/trim and matching yellow courier cap.
- Fleet: Light-blue delivery scooters with large square top boxes, or compact 3PL vans.
- Parcels: Plain natural kraft cardboard boxes with clean packaging tape.
- Setting: Authentic Mar del Plata, Argentina coastal and urban locations (e.g. Rambla Casino Central, Chauvín hub at Friuli 1972, Güemes commercial area, Colón, Port, Atlantic coastal light).
- Negative Constraints: No unwanted third-party logos, no scrambled text on surfaces (logos are added in post-production).

STRUCTURE REQUIREMENTS:
1. [Subject + Action] + References:
"Professional courier from Envíos DosRuedas. Appearance, gear, and uniform must strictly match the character design and clothing shown in Image 2 (Triptych), Image 3 (Jackets), and Image 4 (Polo/Cap). {detailed action}."
2. [Setting / Context]:
"{Location} in Mar del Plata, Argentina. Coastal city architecture, asphalt textures, and Atlantic maritime light."
3. [Style / Medium]:
"High-end commercial photography, Sony A7R IV, 35mm. Sharp focus on the technical fabrics of the uniform shown in references." (or appropriate 3D/isometric/macro specs if 3D packaging).
4. [Color Palette & Branding]:
"Use Image 1 (Logo) as the primary source for color calibration. Navy Blue (#0636A5) and Electric Yellow (#FFEC01). Textures must reflect the softshell and cotton materials from the reference images."
5. [Technical Constraints]:
"Maintain character consistency based on the provided character sheet. No text unless specifically requested via the logo reference. 8k resolution, ultra-realistic, high resolution. --ar {{{aspectRatio}}} --style raw --v 6.0"

USER INPUT:
- Asset Type: {{{assetType}}}
- Subject & Action: {{{subjectAndAction}}}
{{#if locationContext}}- Location: {{{locationContext}}}{{/if}}
{{#if cameraAndMedium}}- Camera / Medium Preference: {{{cameraAndMedium}}}{{/if}}
- Aspect Ratio: {{{aspectRatio}}}
{{#if targetFile}}- Target Filename: {{{targetFile}}}{{/if}}
{{#if uiLocation}}- UI Location: {{{uiLocation}}}{{/if}}
{{#if additionalNotes}}- Additional Notes: {{{additionalNotes}}}{{/if}}

Generate the full structured JSON response adhering strictly to the AssetPromptOutputSchema.`,
});

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
            prompt: `Generate a visual prompt for Envíos DosRuedas following the R2I Master Template.
Input: ${JSON.stringify(input)}
Output must conform to JSON schema with title, promptText, coreStructure, parameters, altTextEs, brandComplianceNotes.`,
            output: { schema: AssetPromptOutputSchema }
          });
          if (res.output) return res.output;
        } catch {
          // continue to next model
        }
      }
    }
    
    // Deterministic fallback guarantee
    return buildDeterministicPrompt(input);
  }
);

export async function generateAssetPrompt(input: AssetPromptInput): Promise<AssetPromptOutput> {
  return generateAssetPromptFlow(input);
}

