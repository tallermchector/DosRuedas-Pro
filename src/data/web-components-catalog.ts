import { reviewCatalog, CatalogItem } from "@/lib/reviewCatalog";

export type ComponentCategory = 
  | 'hero' 
  | 'cards' 
  | 'bento' 
  | 'form' 
  | 'cta' 
  | 'table' 
  | 'stats' 
  | 'faq' 
  | 'stepper' 
  | 'slider' 
  | 'uikit'
  | 'legal';

export interface WebComponentItem {
  id: string;
  page: string;
  category: ComponentCategory;
  componentName: string;
  componentPath: string;
  sectionTitle: string;
  currentText: string;
  elementsToReview: string[];
  recommendedTokens?: {
    typography?: string;
    colors?: string;
    surfaces?: string;
    interactions?: string;
  };
}

// Map CatalogItem to category dynamically with fine overrides
function inferCategory(item: CatalogItem): ComponentCategory {
  const name = (item.componentName + ' ' + item.sectionTitle + ' ' + item.id).toLowerCase();
  if (name.includes('hero') || name.includes('presentación') || name.includes('header')) return 'hero';
  if (name.includes('bento') || name.includes('vision') || name.includes('warehouse')) return 'bento';
  if (name.includes('form') || name.includes('formulario') || name.includes('cotizador') || name.includes('asesoramiento')) return 'form';
  if (name.includes('cta') || name.includes('llamada a la acción') || name.includes('help') || name.includes('contacto')) {
    if (name.includes('form')) return 'form';
    return 'cta';
  }
  if (name.includes('table') || name.includes('tabla') || name.includes('tarifas') || name.includes('pricing') || name.includes('rates')) return 'table';
  if (name.includes('stat') || name.includes('metric') || name.includes('métrica') || name.includes('números')) return 'stats';
  if (name.includes('faq') || name.includes('preguntas') || name.includes('accordion')) return 'faq';
  if (name.includes('stepper') || name.includes('timeline') || name.includes('process') || name.includes('proceso') || name.includes('historia')) return 'stepper';
  if (name.includes('slider') || name.includes('carousel') || name.includes('slideshow')) return 'slider';
  if (name.includes('legal') || name.includes('privacidad') || name.includes('terminos')) return 'legal';
  if (name.includes('card') || name.includes('servicio') || name.includes('benefit') || name.includes('feature') || name.includes('grid')) return 'cards';
  return 'cards';
}

// Atomic UI Kit components documented in docs/contenido/ui-components.md
const UI_KIT_ITEMS: WebComponentItem[] = [
  {
    id: "uikit-double-bezel",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "DoubleBezelCard",
    componentPath: "src/components/ui/DoubleBezelCard.tsx",
    sectionTitle: "Card con Bisel Doble & Elevación",
    currentText: "Contenedor de tarjeta insigne de DosRuedas con borde doble concéntrico, fondo Navy Midnight (#052C87) y resplandor sutil.",
    elementsToReview: [
      "Doble borde concéntrico (exterior border-brand-white/10, interior border-brand-white/20)",
      "Curvatura rounded-3xl (28px de radio)",
      "Backdrop blur y sombreado profundo para elevación B2B",
      "Soporte para hover con traslación suave (-translate-y-1)"
    ],
    recommendedTokens: {
      typography: "Bebas Neue en títulos, Outfit en descripciones",
      colors: "Borde #FFF12E con opacidad 20%, Fondo #052C87",
      surfaces: "rounded-3xl, shadow-2xl, backdrop-blur-md",
      interactions: "hover:border-[#FFF12E]/50 transition-all duration-300"
    }
  },
  {
    id: "uikit-cta-nested-pill",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "CTANestedPill",
    componentPath: "src/components/ui/CTANestedPill.tsx",
    sectionTitle: "Botón Píldora Anidada con Glow Neón",
    currentText: "Botón de acción principal con píldora anidada y resplandor amarillo eléctrico (#FFF12E / #FFEC01).",
    elementsToReview: [
      "Estructura anidada con cápsula exterior de micro-glow y botón interno",
      "Fondo High-Voltage Yellow (#FFF12E) con texto Speed Blue (#0636A5)",
      "Tipografía Bebas Neue en mayúsculas con espaciado tracking-wider",
      "Microinteracción hover con scale-105 y shadow-glow-yellow"
    ],
    recommendedTokens: {
      typography: "Bebas Neue uppercase tracking-wider",
      colors: "Fondo #FFF12E, Texto #0636A5, Glow rgba(255,241,46,0.4)",
      surfaces: "rounded-full, shadow-[0_0_20px_rgba(255,241,46,0.35)]",
      interactions: "active:scale-95 transition-transform duration-150"
    }
  },
  {
    id: "uikit-bento-grid",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "BentoGrid",
    componentPath: "src/components/ui/BentoGrid.tsx",
    sectionTitle: "Bento Grid Asimétrico Responsive",
    currentText: "Sistema de grilla modular asimétrica para presentar métricas, flota y tecnología de última milla.",
    elementsToReview: [
      "Distribución en grilla de 12 columnas (ej. 7:5 o 4:4:4)",
      "Tarjetas modulares con diferentes densidades de contenido",
      "Marcas de agua gigantes con opacidad al 10%",
      "Cifras tabulares con Geist Mono"
    ],
    recommendedTokens: {
      typography: "Anton en encabezados principales, Geist Mono en métricas",
      colors: "Midnight Navy #052C87 y Deep Contrast #031E5C",
      surfaces: "rounded-3xl border border-white/10 p-6 md:p-8",
      interactions: "hover:border-[#2563eb]/40"
    }
  },
  {
    id: "uikit-input-field",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "InputField",
    componentPath: "src/components/ui/InputField.tsx",
    sectionTitle: "Input Transparente con Foco Neón",
    currentText: "Campo de entrada estilizado para cotizadores y formularios comerciales con borde luminoso.",
    elementsToReview: [
      "Fondo oscuro semitransparente bg-white/5",
      "Borde fino border-white/20 con transición a border-[#FFF12E] en focus",
      "Etiqueta flotante o superior en Outfit / Bebas Neue",
      "Integración nativa para iconos de Lucide (Search, MapPin, Phone)"
    ],
    recommendedTokens: {
      typography: "Outfit regular 15px, placeholder en slate-400",
      colors: "Focus border #FFF12E, anillado focus:ring-1 focus:ring-[#FFF12E]",
      surfaces: "rounded-xl bg-white/5 px-4 py-3 text-white",
      interactions: "transition-all duration-200 outline-none"
    }
  },
  {
    id: "uikit-stepper-horiz",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "StepperHorizontal",
    componentPath: "src/components/ui/StepperHorizontal.tsx",
    sectionTitle: "Paso a Paso Horizontal con Línea Progresiva",
    currentText: "Visualizador de etapas operativas (1. Cotizá -> 2. Retiramos -> 3. Entregamos) para servicios express y flex.",
    elementsToReview: [
      "Nodos circulares numerados con borde activo en amarillo",
      "Línea de conexión animada o con gradiente progresivo",
      "Títulos de paso en Bebas Neue y descripciones en Outfit",
      "Adaptabilidad a scroll horizontal o apilado vertical en pantallas móviles"
    ],
    recommendedTokens: {
      typography: "Bebas Neue en números y títulos de paso",
      colors: "Nodo activo #FFF12E con texto #0636A5, línea inactiva white/20",
      surfaces: "Nodos w-10 h-10 rounded-full flex items-center justify-center font-bold",
      interactions: "Animación de entrada escalonada"
    }
  }
];

// Convert reviewCatalog items to WebComponentItem
const MAPPED_CATALOG_ITEMS: WebComponentItem[] = reviewCatalog.map((item) => {
  const category = inferCategory(item);
  return {
    id: item.id,
    page: item.page,
    category,
    componentName: item.componentName,
    componentPath: item.componentPath,
    sectionTitle: item.sectionTitle,
    currentText: item.currentText,
    elementsToReview: item.elementsToReview,
    recommendedTokens: {
      typography: category === 'hero' ? 'Anton (títulos) + Bebas Neue (badges) + Outfit (copete)' : 'Bebas Neue + Outfit + Geist Mono (datos)',
      colors: 'Primary #0636A5, Accent #FFF12E / #FFEC01, Dark Card #052C87',
      surfaces: 'rounded-3xl (cards), rounded-full (CTAs & badges)',
      interactions: 'hover:-translate-y-0.5 hover:shadow-glow-yellow transition-all duration-200'
    }
  };
});

// Complete catalog
export const WEB_COMPONENTS_CATALOG: WebComponentItem[] = [
  ...UI_KIT_ITEMS,
  ...MAPPED_CATALOG_ITEMS
];

// Categories definition with Spanish labels and Lucide icon keys
export const CATEGORY_DEFINITIONS: { key: ComponentCategory; label: string; iconKey: string }[] = [
  { key: 'hero', label: 'Heros & Cabeceras', iconKey: 'Sparkles' },
  { key: 'cards', label: 'Cards & Soluciones', iconKey: 'Layers' },
  { key: 'bento', label: 'Bento Grids & Visión', iconKey: 'LayoutGrid' },
  { key: 'form', label: 'Formularios & Cotizadores', iconKey: 'FileText' },
  { key: 'cta', label: 'CTAs & Cierres', iconKey: 'Send' },
  { key: 'table', label: 'Tablas & Tarifarios', iconKey: 'Table' },
  { key: 'stats', label: 'Métricas & Estadísticas', iconKey: 'Activity' },
  { key: 'stepper', label: 'Procesos & Steppers', iconKey: 'GitCommit' },
  { key: 'faq', label: 'Preguntas Frecuentes', iconKey: 'HelpCircle' },
  { key: 'slider', label: 'Sliders & Carruseles', iconKey: 'Sliders' },
  { key: 'uikit', label: 'UI Kit Base', iconKey: 'Box' },
  { key: 'legal', label: 'Secciones Legales', iconKey: 'Shield' },
];

// Query Helpers
export function getAllPages(): string[] {
  const pagesSet = new Set<string>();
  WEB_COMPONENTS_CATALOG.forEach(item => pagesSet.add(item.page));
  return Array.from(pagesSet);
}

export function getWebComponentById(id: string): WebComponentItem | undefined {
  return WEB_COMPONENTS_CATALOG.find(item => item.id === id);
}

export function filterWebComponents(params: {
  page?: string;
  category?: ComponentCategory | 'all';
  searchQuery?: string;
}): WebComponentItem[] {
  return WEB_COMPONENTS_CATALOG.filter(item => {
    if (params.page && params.page !== 'all' && item.page !== params.page) {
      return false;
    }
    if (params.category && params.category !== 'all' && item.category !== params.category) {
      return false;
    }
    if (params.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase();
      const matchText = (
        item.componentName + ' ' +
        item.sectionTitle + ' ' +
        item.page + ' ' +
        item.currentText + ' ' +
        item.elementsToReview.join(' ')
      ).toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });
}
