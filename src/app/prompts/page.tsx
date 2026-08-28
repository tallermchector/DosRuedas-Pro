'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Zap,
  Store,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Copy,
  ArrowLeft,
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Tag,
  Hash,
  Truck,
  Award,
  Box,
  Radio,
  FileText,
  Bookmark
} from 'lucide-react';

const TYPE_ANCHOR = `Bold condensed all-caps sans-serif lettering inspired by Anton and Bebas Neue display typography, heavy visual weight, tight letter-spacing, strictly governed by the Envíos DosRuedas 3-color palette: Egyptian Royal Navy Blue (#0636A5 / #021440), Electric Kinetic Yellow (#FFEC01), and Pure White (#FFFFFF). Render the quoted text exactly on a single line, with zero spelling mistakes, no unwanted artifacts, and no third-party logos. Clean pure-white or deep-blue ground as specified, centered composition with generous negative space for UI cropping.`;

interface PromptItem {
  id: string;
  code: string;
  badge: string;
  category: 'Servicios' | 'Sellos' | 'Frases Hero' | 'Parches & Wordmarks' | 'Cifras 3D' | 'Embalaje' | 'Social & Status';
  titulo: string;
  textoRender: string;
  descripcion: string;
  icono: React.ComponentType<{ className?: string }>;
  targetFile: string;
  targetComponent: string;
  aspectRatio: string;
  resolution: string;
  engine: string;
  colorGlow: string;
  promptBody: string;
}

const promptsCatalog: PromptItem[] = [
  // --- SERVICIOS ---
  {
    id: 'T1',
    code: 'T1',
    badge: 'SERVICIOS · 3D EXTRUIDO',
    category: 'Servicios',
    titulo: 'ENVÍOS EXPRESS',
    textoRender: '"ENVÍOS EXPRESS"',
    descripcion: 'Texto 3D con frente en amarillo cinético y laterales en azul institucional.',
    icono: Zap,
    targetFile: 'type-envios-express.png',
    targetComponent: 'ExpressHero.tsx / ServiceCard.tsx',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "ENVÍOS EXPRESS" as chunky 3D extruded lettering in heavy Anton font style. Glossy polished electric kinetic yellow (#FFEC01) front faces with clean linear specular highlights. The lateral extrusion, extending one letter-height deep, is rendered in rich Egyptian royal navy blue (#0636A5) with smooth ambient occlusion shading. Framed at a dynamic three-quarter perspective angle from the left to showcase extrusion depth. Resting on a seamless pure white studio ground (#FFFFFF) with a soft ambient contact shadow and a faint yellow specular ground reflection. Upper-left directional key light casting crisp edge bevel highlights. High-end PBR materials, strict 3-color brand compliance, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T2',
    code: 'T2',
    badge: 'SERVICIOS · 3D EXTRUIDO',
    category: 'Servicios',
    titulo: 'ENVÍOS LOWCOST',
    textoRender: '"ENVÍOS LOWCOST"',
    descripcion: 'Texto 3D con frente blanco mate, perfil amarillo cinético y laterales en azul institucional.',
    icono: Truck,
    targetFile: 'type-envios-lowcost.png',
    targetComponent: 'LowCostHero.tsx / LowCostSheet.tsx',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `The text "ENVÍOS LOWCOST" as chunky 3D extruded lettering in heavy Anton display font style. Smooth matte pure-white front faces (#FFFFFF), outlined by a thin, sharp perimeter border in glossy electric kinetic yellow (#FFEC01). The lateral extrusion, extending one letter-height deep, is rendered in solid Egyptian royal navy blue (#0636A5). Framed at a dynamic three-quarter perspective angle from the left, resting on a pure white studio ground (#FFFFFF) with a soft contact shadow beneath. Soft directional key light from the upper-left casting clean edge highlights. Octane render style, strict 3-color brand compliance, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T3',
    code: 'T3',
    badge: 'SERVICIOS · 3D EXTRUIDO',
    category: 'Servicios',
    titulo: 'ENVÍOS FLEX',
    textoRender: '"ENVÍOS FLEX"',
    descripcion: 'Texto 3D en azul institucional con extrusión amarilla y rayo cinético MercadoLibre Flex.',
    icono: ShieldCheck,
    targetFile: 'type-envios-flex.png',
    targetComponent: 'FlexHero.tsx (MercadoLibre Flex)',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#22c55e]/25 to-transparent',
    promptBody: `The text "ENVÍOS FLEX" as chunky 3D extruded lettering in Anton font style. Glossy deep royal navy blue front faces (#0636A5) with a vibrant kinetic yellow lateral extrusion (#FFEC01). A stylized electric yellow lightning bolt mark (#FFEC01) sits dynamically immediately after the last letter 'X'. Framed at a three-quarter perspective angle on a seamless pure white ground (#FFFFFF) with a soft contact drop shadow. Upper-left soft studio lighting with crisp specular reflections. High-end 3D render, strict 3-color brand compliance, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T4',
    code: 'T4',
    badge: 'SERVICIOS · 3D TEXTURA',
    category: 'Servicios',
    titulo: 'PLAN EMPRENDEDORES',
    textoRender: '"PLAN EMPRENDEDORES"',
    descripcion: 'Texto 3D con textura de cartón kraft, cinta de embalaje amarilla y laterales en azul.',
    icono: Store,
    targetFile: 'type-plan-emprendedores.png',
    targetComponent: 'EmprendedoresHero.tsx',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "PLAN EMPRENDEDORES" as heavy 3D extruded lettering. The front faces feature a realistic matte kraft cardboard texture with fine corrugation fibers, crossed horizontally across the lower third by a strip of glossy kinetic yellow packaging tape (#FFEC01). The lateral block extrusion is rendered in deep Egyptian royal navy blue (#0636A5). Dynamic three-quarter view on a seamless pure white studio floor (#FFFFFF) with soft contact occlusion shadows. Warm diffused daylight mixed with soft upper-left studio fill. Photorealistic PBR render, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T5',
    code: 'T5',
    badge: 'SERVICIOS · 3D TECH',
    category: 'Servicios',
    titulo: 'E-COMMERCE & 3PL',
    textoRender: '"E-COMMERCE & 3PL"',
    descripcion: 'Texto 3D en amarillo con micro-cuadrícula de tracking y laterales azul marino.',
    icono: Package,
    targetFile: 'type-ecommerce-3pl.png',
    targetComponent: 'FulfillmentHero.tsx (Friuli 1972)',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `The text "E-COMMERCE & 3PL" as chunky 3D extruded lettering in Anton display font style. Vibrant kinetic yellow front faces (#FFEC01) featuring an embossed, subtle geometric micro-grid pattern reminiscent of digital tracking matrices. The lateral extrusion block is rendered in solid Egyptian royal navy blue (#0636A5). Three-quarter perspective angle from the left, resting on a pure white ground (#FFFFFF) with a soft contact drop shadow. Crisp directional studio lighting from the upper-left, sharp beveled edges, high-tech logistics aesthetic, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },

  // --- SELLOS ---
  {
    id: 'T6',
    code: 'T6',
    badge: 'SELLOS · BADGE CIRCULAR',
    category: 'Sellos',
    titulo: 'SAME DAY',
    textoRender: '"SAME DAY"',
    descripcion: 'Sello circular 3D azul y amarillo con cronómetro para entrega en el día.',
    icono: Award,
    targetFile: 'type-sello-same-day.png',
    targetComponent: 'Badges de entrega en el día / Cards',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A circular 3D embossed badge in glossy Egyptian royal navy blue (#0636A5) with a thick kinetic yellow outer ring (#FFEC01). The text "SAME DAY" is curved boldly along the upper arc in crisp yellow lettering, with a clean yellow minimalist delivery stopwatch icon embossed in the center. Slight metallic chamfered bevel on the perimeter. Front-facing view with a slight 5-degree perspective tilt, centered on a pure white background (#FFFFFF) with a soft ambient contact shadow. Diffused studio lighting, ultra-sharp vector-like 3D render, 4k. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T7',
    code: 'T7',
    badge: 'SELLOS · BADGE CIRCULAR',
    category: 'Sellos',
    titulo: 'NEXT DAY',
    textoRender: '"NEXT DAY"',
    descripcion: 'Sello circular 3D amarillo con texto NEXT DAY en azul y arco de amanecer.',
    icono: Award,
    targetFile: 'type-sello-next-day.png',
    targetComponent: 'Tarjetas LowCost diferidas',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A circular 3D glossy badge in electric kinetic yellow (#FFEC01) with a deep Egyptian royal navy blue outer border (#0636A5). The text "NEXT DAY" is set straight across the center in heavy navy blue sans-serif typography, with a thin stylized navy sunrise arc icon positioned directly above the text. Subtle geometric bevel, perfectly centered on a pure white ground (#FFFFFF) with a soft drop shadow. Upper-left soft studio lighting, clean specular highlights, 4k resolution. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T8',
    code: 'T8',
    badge: 'SELLOS · SLA BADGE',
    category: 'Sellos',
    titulo: '24 HS',
    textoRender: '"24 HS"',
    descripcion: 'Sello circular blanco con anillos azul y amarillo y el texto 24 HS.',
    icono: Award,
    targetFile: 'type-sello-24hs.png',
    targetComponent: 'SLA de ruteo agrupado',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `A circular 3D badge in pure white (#FFFFFF) framed by an outer Egyptian royal navy blue ring (#0636A5) and an inner kinetic yellow accent ring (#FFEC01). The text "24 HS" is rendered in massive, heavy navy blue numbers and letters filling the center, complemented by a tiny kinetic yellow clock hand mark beneath. Straight-on composition, centered on pure white with a soft contact shadow. Crisp lighting, pristine clean vector 3D look, 4k resolution. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T9',
    code: 'T9',
    badge: 'SELLOS · TAG COLGANTE',
    category: 'Sellos',
    titulo: 'SIN CARGO',
    textoRender: '"SIN CARGO"',
    descripcion: 'Tag rectangular 3D azul marino con cordón amarillo y texto SIN CARGO.',
    icono: Tag,
    targetFile: 'type-sello-sin-cargo.png',
    targetComponent: 'Pickup bonificado / Promociones',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A rounded rectangular 3D hanging tag in glossy Egyptian royal navy blue (#0636A5), suspended from a short looped cord in kinetic yellow (#FFEC01). The text "SIN CARGO" is embossed boldly across the tag in kinetic yellow lettering, with a clean circular reinforced punch hole at the top. Displayed at a dynamic slight diagonal tilt, centered on a pure white ground (#FFFFFF) with soft realistic drop shadows. Directional studio light from upper-left, 4k resolution. --ar 1:1 --style raw --v 6.0`
  },

  // --- FRASES HERO ---
  {
    id: 'T10',
    code: 'T10',
    badge: 'FRASES HERO · PANORÁMICO',
    category: 'Frases Hero',
    titulo: 'HOY MISMO',
    textoRender: '"HOY MISMO"',
    descripcion: 'Texto en amarillo cinético con estelas de velocidad sobre fondo azul profundo.',
    icono: Sparkles,
    targetFile: 'type-hoy-mismo.png',
    targetComponent: 'Hero Banner / Stories',
    aspectRatio: '16:9',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "HOY MISMO" in monumental uppercase lettering spanning the frame in vibrant electric kinetic yellow (#FFEC01) against a solid deep royal navy blue background (#0636A5, #021440). Subtle horizontal kinetic speed lines and faint vector motion trails trail to the left of the letters, while the lettering itself remains razor-sharp. Panoramic 16:9 composition, text centered slightly above the vertical midpoint leaving breathing room below. Clean flat graphic styling with a subtle ambient glow, high resolution. --ar 16:9 --style raw --v 6.0`
  },
  {
    id: 'T11',
    code: 'T11',
    badge: 'FRASES HERO · CONVERSIÓN',
    category: 'Frases Hero',
    titulo: 'COTIZÁ TU ENVÍO',
    textoRender: '"COTIZÁ TU ENVÍO"',
    descripcion: 'Texto en blanco con sombra proyectada en amarillo cinético y flecha chevron.',
    icono: Zap,
    targetFile: 'type-cotiza-tu-envio.png',
    targetComponent: 'CTAFinal.tsx / Conversion Header',
    aspectRatio: '16:9',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "COTIZÁ TU ENVÍO" in large, bold uppercase lettering styled in heavy Anton/Bebas Neue display font in crisp pure white (#FFFFFF). The lettering features a sharp, solid drop-shadow offset to the lower-right in vibrant electric kinetic yellow (#FFEC01). Immediately following the last letter 'O', a dynamic kinetic yellow arrow chevron mark (#FFEC01) points to the right. Set against a solid Egyptian royal navy blue ground (#0636A5) with a delicate procedural white vector grid. Centered wide 16:9 composition with generous margins. Ultra-clean graphic design, 8k resolution. --ar 16:9 --style raw --v 6.0`
  },
  {
    id: 'T12',
    code: 'T12',
    badge: 'FRASES HERO · NEÓN 3D',
    category: 'Frases Hero',
    titulo: 'ENTREGA EN EL DÍA',
    textoRender: '"ENTREGA EN EL DÍA"',
    descripcion: 'Letras tubulares estilo neón arquitectónico amarillo sobre panel acústico azul.',
    icono: Radio,
    targetFile: 'type-entrega-en-el-dia.png',
    targetComponent: 'Banners de confianza / Redes',
    aspectRatio: '16:9',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "ENTREGA EN EL DÍA" in bold uppercase letters rendered from smooth, glossy rounded tubes resembling a modern high-end architectural neon sign. The tubes glow in vibrant electric kinetic yellow (#FFEC01), mounted flush against a dark corporate navy blue acoustic panel (#021440). Wide 16:9 composition, text perfectly centered with balanced margins. Atmospheric self-illuminated lighting with soft yellow light spilling onto the deep blue backing, zero glare, ultra-realistic 3D render, 8k resolution. --ar 16:9 --style raw --v 6.0`
  },

  // --- PARCHES, STICKERS & WORDMARKS ---
  {
    id: 'T13',
    code: 'T13',
    badge: 'PARCHES · BORDADO TÁCTICO',
    category: 'Parches & Wordmarks',
    titulo: 'MDQ (Parche)',
    textoRender: '"MDQ"',
    descripcion: 'Parche bordado circular con base azul marino, borde amarillo y letras MDQ en relieve.',
    icono: Bookmark,
    targetFile: 'type-parche-mdq.png',
    targetComponent: 'Badges de identidad local / Footer',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A circular embroidered fabric tactical patch with a heavy deep royal navy blue twill fabric base (#0636A5), framed by a thick merrowed border in electric kinetic yellow thread (#FFEC01). The text "MDQ" is stitched prominently across the center in raised, heavy yellow embroidery thread, showing tactile realistic thread weaves and 3D puff texture. Front-facing view, centered on a pure white background (#FFFFFF) with a soft contact drop shadow. Soft macro studio lighting from the upper-left, 4k photorealistic render. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T14',
    code: 'T14',
    badge: 'STICKERS · TROQUELADO VINILO',
    category: 'Parches & Wordmarks',
    titulo: 'FRIULI 1972',
    textoRender: '"FRIULI 1972"',
    descripcion: 'Sticker troquelado de vinilo con la dirección central en Chauvín sobre pastilla amarilla.',
    icono: Tag,
    targetFile: 'type-sticker-friuli-1972.png',
    targetComponent: 'Base de operaciones / Contacto',
    aspectRatio: '3:2',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A die-cut glossy vinyl sticker featuring the text "FRIULI 1972" in heavy Egyptian royal navy blue sans-serif (#0636A5) set within a rounded horizontal pill shape in kinetic yellow (#FFEC01), encased by a crisp 2mm white die-cut border (#FFFFFF). The sticker has a subtle glossy sheen and a tiny curled corner on the bottom-right showing the white adhesive backing, resting at a gentle 5-degree angle on a seamless pure white surface with a soft contact shadow. Macro studio lighting, 4k. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T15',
    code: 'T15',
    badge: 'WORDMARK · IDENTIDAD OFICIAL',
    category: 'Parches & Wordmarks',
    titulo: 'DOSRUEDAS (Wordmark)',
    textoRender: '"DOSRUEDAS"',
    descripcion: 'Wordmark tipográfico en azul institucional con contraformas amarillas y subrayado cinético.',
    icono: Sparkles,
    targetFile: 'type-wordmark-dosruedas.png',
    targetComponent: 'Logomarca secundaria / Merchandising',
    aspectRatio: '3:2',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `The text "DOSRUEDAS" as an energetic single-line wordmark in heavy Egyptian royal navy blue (#0636A5), with the interior letter counters subtly accented in electric kinetic yellow (#FFEC01). The typography is slightly italicized to convey aerodynamic speed, underlined by a sharp kinetic yellow horizontal stroke that terminates in a clean minimalist motorcycle wheel circle. Wide 3:2 layout, wordmark centered on a pure white background with generous padding. Razor-sharp vector graphic execution, 8k resolution. --ar 3:2 --style raw --v 6.0`
  },

  // --- CIFRAS 3D ---
  {
    id: 'T16',
    code: 'T16',
    badge: 'CIFRAS 3D · CROMO PULIDO',
    category: 'Cifras 3D',
    titulo: '+50K (Envíos)',
    textoRender: '"+50K"',
    descripcion: 'Cifra 3D monumental con acabado espejo cromado y reflejos azul/amarillo.',
    icono: TrendingUp,
    targetFile: 'type-cifra-50k.png',
    targetComponent: 'TrustBar.tsx (Envíos completados)',
    aspectRatio: '1:1',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `The numerical text "+50K" as monumental 3D extruded numerals with a mirror-finish chrome surface that reflects a clean studio environment of deep royal navy blue (#0636A5) and electric kinetic yellow (#FFEC01). Thick block extrusion, standing upright on a pure white ground (#FFFFFF) with a crisp contact reflection and soft ambient occlusion shadow. Front-facing view with a slight low-angle tilt to convey authority and scale. High-end Octane render, razor-sharp specular edge highlights, 8k resolution. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T17',
    code: 'T17',
    badge: 'CIFRAS 3D · EFECTIVIDAD',
    category: 'Cifras 3D',
    titulo: '0 (Extraviados)',
    textoRender: '"0"',
    descripcion: 'Cifra 3D "0" en azul institucional con tilde de verificación amarillo en su interior.',
    icono: ShieldCheck,
    targetFile: 'type-cifra-cero.png',
    targetComponent: 'TrustBar.tsx (Paquetes extraviados)',
    aspectRatio: '1:1',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#22c55e]/25 to-transparent',
    promptBody: `The single numerical digit "0" as a massive, glossy 3D numeral in Egyptian royal navy blue (#0636A5) with a beveled inner rim in electric kinetic yellow (#FFEC01). Nestled securely inside the center counter of the zero is a clean 3D checkmark icon in kinetic yellow. Standing upright on a seamless pure white surface (#FFFFFF) with a soft ambient contact shadow. Front-facing centered composition, generous negative space. Soft studio key lighting with clean top highlights, 8k resolution. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T18',
    code: 'T18',
    badge: 'CIFRAS 3D · TRAYECTORIA',
    category: 'Cifras 3D',
    titulo: '+7 AÑOS',
    textoRender: '"+7 AÑOS"',
    descripcion: 'Cifra 3D en amarillo cinético con extrusión en azul institucional.',
    icono: TrendingUp,
    targetFile: 'type-cifra-7-anos.png',
    targetComponent: 'TrustBar.tsx / Sobre Nosotros',
    aspectRatio: '1:1',
    resolution: '2K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "+7 AÑOS" as bold 3D extruded lettering where the numeral "7" is noticeably taller and heavier than the word "AÑOS". The front faces are coated in vibrant glossy electric kinetic yellow (#FFEC01), backed by a deep Egyptian royal navy blue extrusion (#0636A5) with smooth ambient occlusion shading. Displayed at a slight three-quarter angle from the left, standing on a pure white ground (#FFFFFF) with a soft contact shadow. Upper-left studio light casting crisp bevel highlights, 8k resolution. --ar 1:1 --style raw --v 6.0`
  },

  // --- EMBALAJE & LOGÍSTICA ---
  {
    id: 'T19',
    code: 'T19',
    badge: 'EMBALAJE · SELLO DE GOMA',
    category: 'Embalaje',
    titulo: 'FRÁGIL',
    textoRender: '"FRÁGIL"',
    descripcion: 'Sello de tinta de goma azul marino estampado directamente sobre cartón kraft corrugado.',
    icono: Box,
    targetFile: 'type-sello-fragil.png',
    targetComponent: 'Packaging mockups / Fondos kraft',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The text "FRÁGIL" stamped in heavy Egyptian royal navy blue rubber-stamp ink (#0636A5) directly onto authentic fibrous kraft cardboard. The stamp shows authentic micro-imperfections, slightly distressed ink texture, and realistic porous ink absorption. Enclosed by a rectangular stamped border with rounded corners and a small kinetic yellow corner mark (#FFEC01). Top-down flat-lay perspective, centered, the textured brown kraft paper fills the entire frame. Soft diffused natural daylight, macro photography look, 4k. --ar 1:1 --style raw --v 6.0`
  },
  {
    id: 'T20',
    code: 'T20',
    badge: 'EMBALAJE · SEÑALÉTICA',
    category: 'Embalaje',
    titulo: 'ESTE LADO ARRIBA',
    textoRender: '"ESTE LADO ARRIBA"',
    descripcion: 'Sello de tinta azul con texto y dos flechas verticales sobre cartón kraft.',
    icono: Box,
    targetFile: 'type-sello-este-lado-arriba.png',
    targetComponent: 'Packaging mockups / Logística',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptBody: `The text "ESTE LADO ARRIBA" stamped in deep Egyptian royal navy blue ink (#0636A5) on textured kraft cardboard, positioned directly beneath two bold, clean upward-pointing stamped arrows. The print displays authentic rubber-stamp texture with subtle distress along the edges, framed by a delicate stamped border. Direct top-down macro shot, perfectly centered, with the natural fibers and corrugated ribs of the kraft paper filling the background. Even studio daylight, 4k resolution. --ar 1:1 --style raw --v 6.0`
  },

  // --- SOCIAL & STATUS ---
  {
    id: 'T21',
    code: 'T21',
    badge: 'SOCIAL · LIVE GPS PILL',
    category: 'Social & Status',
    titulo: 'RUTEO ACTIVO',
    textoRender: '"RUTEO ACTIVO"',
    descripcion: 'Badge 3D tipo pastilla azul marino con luz LED amarilla pulsante para tracking.',
    icono: Radio,
    targetFile: 'type-badge-ruteo-activo.png',
    targetComponent: 'Indicador GPS en vivo / Hero',
    aspectRatio: '3:2',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `A glossy 3D horizontal pill badge in deep Egyptian royal navy blue (#0636A5) with a refined 1px border in soft tech blue (#628FF9). The text "RUTEO ACTIVO" is rendered in crisp electric kinetic yellow (#FFEC01) in Bebas Neue font, preceded by a bright, glowing yellow circular LED status dot on the left. Floating weightlessly above a pure white background (#FFFFFF) with a soft contact drop shadow. Soft studio lighting with a delicate lens bloom on the active status dot, 4k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T22',
    code: 'T22',
    badge: 'SOCIAL · STATUS CHECK',
    category: 'Social & Status',
    titulo: 'ENTREGADO',
    textoRender: '"ENTREGADO"',
    descripcion: 'Badge 3D tipo pastilla blanca con borde azul marino y tilde de confirmación.',
    icono: CheckCircle2,
    targetFile: 'type-badge-entregado.png',
    targetComponent: 'Notificaciones de tracking / SLA',
    aspectRatio: '3:2',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#22c55e]/25 to-transparent',
    promptBody: `A glossy 3D horizontal pill badge in pure white (#FFFFFF) with an outer border in Egyptian royal navy blue (#0636A5). The text "ENTREGADO" is set in bold navy blue lettering, preceded by a solid kinetic yellow circular badge (#FFEC01) carrying an embossed navy blue checkmark icon. Floating slightly above a pure white ground with a soft ambient occlusion shadow beneath. Clean upper-left studio light, modern UI/UX design asset, 4k resolution. --ar 3:2 --style raw --v 6.0`
  },
  {
    id: 'T23',
    code: 'T23',
    badge: 'SOCIAL · COMUNIDAD IG',
    category: 'Social & Status',
    titulo: '#RUTASMDQ',
    textoRender: '"#RUTASMDQ"',
    descripcion: 'Hashtag en letras 3D de goma amarilla sobre fondo azul con línea de ruta punteada.',
    icono: Hash,
    targetFile: 'type-hashtag-rutasmdq.png',
    targetComponent: 'Campañas de comunidad en Instagram',
    aspectRatio: '1:1',
    resolution: '1K',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/25 to-transparent',
    promptBody: `The hashtag text "#RUTASMDQ" in large, soft-touch matte 3D rubbery letters in vibrant electric kinetic yellow (#FFEC01), set against a solid Egyptian royal navy blue background (#0636A5). A subtle white and yellow dotted GPS route line weaves playfully behind and between the letters. Square 1:1 composition, text centered on a single line with generous breathing space. Soft directional studio lighting from the upper-left casting gentle drop shadows onto the blue backing, 4k resolution. --ar 1:1 --style raw --v 6.0`
  }
];

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAnchor, setCopiedAnchor] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopyFullPrompt = (id: string, promptBody: string) => {
    const fullPrompt = `${TYPE_ANCHOR}\n\n${promptBody}`;
    navigator.clipboard.writeText(fullPrompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAnchor = () => {
    navigator.clipboard.writeText(TYPE_ANCHOR);
    setCopiedAnchor(true);
    setTimeout(() => setCopiedAnchor(false), 2000);
  };

  const categories = [
    'todos',
    'Servicios',
    'Sellos',
    'Frases Hero',
    'Parches & Wordmarks',
    'Cifras 3D',
    'Embalaje',
    'Social & Status'
  ];

  const filteredPrompts = promptsCatalog.filter((item) => {
    const matchCategory =
      activeCategory === 'todos' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      searchQuery === '' ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetComponent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden selection:bg-[#FFEC01] selection:text-[#021440]"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #021440 0%, #04236B 35%, #0636A5 75%, #00277C 100%)'
      }}
    >
      {/* 1. Procedural Background Grid & Route Curves (DESIGN.md Token #3) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="2,6" />
            <circle cx="0" cy="0" r="1.5" fill="#FFEC01" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Radial Orbs */}
        <div
          className="absolute -top-32 left-1/4 w-[750px] h-[550px] rounded-full blur-[140px] opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,236,1,0.22) 0%, rgba(255,236,1,0.06) 45%, transparent 70%)'
          }}
        />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#0950F6]/25 blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-[#021440] blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#04236B]/60 hover:bg-[#0636A5] border border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Command Center</span>
          </Link>

          {/* Status Indicator Badge (DESIGN.md Token #4) */}
          <div className="flex items-center gap-2 bg-[#04236B]/70 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFEC01] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFEC01]"></span>
            </span>
            <span
              className="text-xs uppercase tracking-widest text-[#FFEC01] font-bold"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              23 Assets Tipográficos · Catálogo Activo
            </span>
          </div>
        </div>

        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFEC01]/10 text-[#FFEC01] border border-[#FFEC01]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SISTEMA VISUAL & PROMPT ENGINEERING v6.0
            </span>
            <span
              className="text-xs text-slate-300 uppercase tracking-widest hidden sm:inline"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              T1 A T23 · MIDJOURNEY RAW
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            GENERADOR <span className="text-[#FFEC01]">DE ASSETS 3D & PROMPTS</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-4xl font-normal leading-relaxed mb-6">
            Colección completa de 23 directivas optimizadas para renderizado tipográfico 3D y piezas de identidad corporativa de <strong>Envíos DosRuedas</strong>. Cada botón copia el prompt completo con el ancla tipográfica de marca inyectada.
          </p>

          {/* Ancla Tipográfica Banner (Double-Bezel Glass Card) */}
          <div className="rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-8">
            <div className="rounded-2xl bg-gradient-to-b from-[#0636A5]/85 to-[#021440]/95 border border-white/10 p-5 sm:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2
                      className="text-lg font-black uppercase text-white tracking-tight"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      📐 ANCLA TIPOGRÁFICA DE MARCA (TYPE ANCHOR)
                    </h2>
                    <p className="text-xs text-slate-300">
                      Instrucción maestra de consistencia cromática (#0636A5, #FFEC01, #FFFFFF) y tipográfica (Anton / Bebas Neue).
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAnchor}
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                  className={`inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-wider font-bold border px-5 py-2 text-xs transition-all duration-200 cursor-pointer ${
                    copiedAnchor
                      ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      : 'bg-[#FFEC01] text-[#021440] border-[#FFEC01] hover:bg-[#FFF033] shadow-[0_0_20px_rgba(255,236,1,0.3)]'
                  }`}
                >
                  {copiedAnchor ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ¡ANCLA COPIADA!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      COPIAR SOLO EL ANCLA
                    </>
                  )}
                </button>
              </div>

              <pre
                className="bg-[#021440]/90 rounded-xl p-3.5 text-xs text-slate-300 border border-white/10 leading-relaxed overflow-x-auto whitespace-pre-wrap"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                <code>{TYPE_ANCHOR}</code>
              </pre>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                  className={`text-sm uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#FFEC01] text-[#021440] font-bold border-[#FFEC01] shadow-[0_0_20px_rgba(255,236,1,0.35)]'
                      : 'bg-[#04236B]/40 hover:bg-[#0636A5]/60 text-slate-200 border-white/10 hover:border-white/25'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Buscar por código (T1), texto o componente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#021440]/80 border border-white/15 rounded-full px-4 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FFEC01] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
            </div>
          </div>
        </header>

        {/* Counter Summary */}
        <div className="flex items-center justify-between text-xs text-slate-300 mb-6 px-1">
          <span style={{ fontFamily: "'Geist Mono', monospace" }}>
            MOSTRANDO {filteredPrompts.length} DE {promptsCatalog.length} ASSETS
          </span>
          <span className="text-[#FFEC01]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            CLIC EN "COPIAR PROMPT COMPLETO" INCLUYE ANCLA + DIRECTIVA
          </span>
        </div>

        {/* Cards Grid using Double-Bezel Card Pattern (DESIGN.md Token #2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrompts.map((prompt) => {
            const Icon = prompt.icono;
            const isCopied = copiedId === prompt.id;

            return (
              <div
                key={prompt.id}
                className="group relative rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#FFEC01]/40 transition-all duration-300 flex flex-col"
              >
                {/* Inner Bezel Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0636A5]/85 to-[#021440]/95 border border-white/10 p-5 sm:p-6 flex flex-col flex-1">
                  {/* Subtle Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${prompt.colorGlow} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                  />

                  {/* Header of Card */}
                  <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01] shadow-inner group-hover:scale-105 group-hover:border-[#FFEC01] transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded bg-[#FFEC01] text-[#021440] text-[10px] font-black tracking-wider"
                            style={{ fontFamily: "'Geist Mono', monospace" }}
                          >
                            {prompt.code}
                          </span>
                          <span
                            className="text-[11px] font-bold uppercase tracking-widest text-[#FFEC01]"
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                          >
                            {prompt.badge}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-black uppercase text-white tracking-tight leading-tight mt-0.5"
                          style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                          {prompt.titulo}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3 min-h-[34px] relative z-10">
                    {prompt.descripcion}
                  </p>

                  {/* UI Destination & Specs */}
                  <div className="space-y-1.5 mb-3 p-2.5 rounded-xl bg-[#021440]/60 border border-white/5 text-[11px] relative z-10">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Archivo:</span>
                      <span className="text-[#FFEC01]" style={{ fontFamily: "'Geist Mono', monospace" }}>
                        {prompt.targetFile}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Destino UI:</span>
                      <span className="truncate max-w-[170px] text-white" title={prompt.targetComponent}>
                        {prompt.targetComponent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-white/5">
                      <span className="text-slate-400">Ratio & Res:</span>
                      <span style={{ fontFamily: "'Geist Mono', monospace" }}>
                        {prompt.aspectRatio} · {prompt.resolution}
                      </span>
                    </div>
                  </div>

                  {/* Terminal Box for Prompt Text */}
                  <div className="relative flex-1 mb-5 rounded-xl bg-[#021440]/90 border border-white/10 p-3.5 flex flex-col group/terminal">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#FFEC01]" />
                        <span style={{ fontFamily: "'Geist Mono', monospace" }}>DIRECTIVA ESPECÍFICA</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-[#FFEC01]" style={{ fontFamily: "'Geist Mono', monospace" }}>
                        <Layers className="w-3 h-3" /> + Type Anchor
                      </span>
                    </div>

                    <pre
                      className="flex-1 text-slate-200 text-xs leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap pr-1 scrollbar-thin scrollbar-thumb-white/20"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      <code>{prompt.promptBody}</code>
                    </pre>
                  </div>

                  {/* Nested-Pill CTA Button (DESIGN.md Token #1) */}
                  <button
                    onClick={() => handleCopyFullPrompt(prompt.id, prompt.promptBody)}
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                    className={`group/btn w-full inline-flex items-center justify-between gap-3 rounded-full uppercase tracking-[.05em] font-bold border px-5 py-2.5 min-h-[46px] transition-all duration-300 active:scale-[.98] cursor-pointer ${
                      isCopied
                        ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.45)]'
                        : 'bg-[#FFEC01] text-[#021440] border-[#FFEC01] shadow-[0_0_24px_rgba(255,236,1,0.35)] hover:bg-[#FFF033] hover:shadow-[0_0_40px_rgba(255,236,1,0.55)]'
                    }`}
                  >
                    <span className="text-sm tracking-wider font-bold">
                      {isCopied ? '¡PROMPT + ANCLA COPIADOS!' : 'COPIAR PROMPT COMPLETO'}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCopied
                          ? 'bg-white/20 text-white'
                          : 'bg-[#021440]/15 text-[#021440] group-hover/btn:bg-[#0636A5] group-hover/btn:text-[#FFEC01] group-hover/btn:translate-x-0.5'
                      }`}
                    >
                      {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Operational Footer Card */}
        <div className="mt-12 rounded-2xl bg-[#04236B]/40 backdrop-blur-md border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p
                className="font-bold uppercase text-white tracking-wider"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ENVÍOS DOSRUEDAS · SISTEMA DE ASSETS TIPOGRÁFICOS T1-T23
              </p>
              <p className="text-slate-400">Catálogo estructurado y conectado a los componentes de la aplicación</p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>HUB FRIULI 1972 · CHAUVÍN · MDQ</span>
            <span className="text-[#FFEC01]">●</span>
            <span>MIDJOURNEY v6.0 RAW</span>
          </div>
        </div>
      </div>
    </div>
  );
}


