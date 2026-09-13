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
  searchIndex: string; // Precomputed for O(1) string search without re-allocating in loop
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
    currentText: "Contenedor insigne de DosRuedas con borde doble concéntrico, superficie blanca pura (#FFFFFF) con textos en Azul Eléctrico (#0C59F2) o versión translúcida bg-white/10.",
    elementsToReview: [
      "Doble borde concéntrico exterior e interior con border-white/20 o border-[#0C59F2]/15",
      "Curvatura rounded-3xl (24-28px de radio)",
      "Elevación con shadow-card-elevation (rgba(12, 89, 242, 0.15))",
      "Soporte para hover con traslación suave (scale-[1.01] o -translate-y-0.5)"
    ],
    searchIndex: "uikit-double-bezel doublebezelcard card bisel doble elevacion ui kit #0c59f2 #fff12e",
    recommendedTokens: {
      typography: "Anton en títulos, Bebas Neue en badges, Outfit en descripciones",
      colors: "Brand Blue #0C59F2, Brand Yellow #FFF12E, Brand White #FFFFFF",
      surfaces: "rounded-3xl, shadow-card-elevation, border border-[#0C59F2]/10",
      interactions: "hover:scale-[1.01] transition-transform duration-200"
    }
  },
  {
    id: "uikit-cta-nested-pill",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "CTANestedPill",
    componentPath: "src/components/ui/CTANestedPill.tsx",
    sectionTitle: "Botón Píldora Anidada con Glow Neón",
    currentText: "Botón de acción principal con cápsula redondeada, fondo Amarillo Neón (#FFF12E), texto Azul Eléctrico (#0C59F2) y resplandor activo.",
    elementsToReview: [
      "Fondo Amarillo Neón (#FFF12E) con texto Azul Eléctrico (#0C59F2)",
      "Tipografía Bebas Neue en mayúsculas con espaciado tracking-wider (0.1em)",
      "Esquinas en píldora completa rounded-full",
      "Sombra reflectiva shadow-glow-yellow (rgba(255, 241, 46, 0.35)) y micro-escala al pulsar"
    ],
    searchIndex: "uikit-cta-nested-pill ctanestedpill boton pildora anidada glow neon #fff12e #0c59f2 bebas neue",
    recommendedTokens: {
      typography: "Bebas Neue uppercase tracking-wider",
      colors: "Fondo #FFF12E, Texto #0C59F2, Glow rgba(255,241,46,0.35)",
      surfaces: "rounded-full, shadow-glow-yellow",
      interactions: "hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
    }
  },
  {
    id: "uikit-bento-grid",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "BentoGrid",
    componentPath: "src/components/ui/BentoGrid.tsx",
    sectionTitle: "Bento Grid Asimétrico 12 Columnas",
    currentText: "Distribución bento asimétrica (módulos 7/5 y 8/4) para presentar servicios, métricas y flota urbana de Mar del Plata.",
    elementsToReview: [
      "Grilla de 12 columnas (grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8)",
      "Tarjetas modulares en Blanco Óptico (#FFFFFF) con textos en Azul Eléctrico (#0C59F2)",
      "Datos de precisión formateados en Geist Mono",
      "Prohibida la fila monótona de 3 tarjetas idénticas"
    ],
    searchIndex: "uikit-bento-grid bentogrid bento grid asimetrico 12 columnas #0c59f2 #ffffff anton geist mono",
    recommendedTokens: {
      typography: "Anton (títulos 48px), Bebas Neue (badges), Geist Mono (datos)",
      colors: "Brand Blue #0C59F2, Brand White #FFFFFF, Brand Yellow #FFF12E",
      surfaces: "rounded-3xl bg-white shadow-card-elevation p-6 md:p-8",
      interactions: "hover:shadow-card-elevation transition-all"
    }
  },
  {
    id: "uikit-input-field",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "InputField",
    componentPath: "src/components/ui/InputField.tsx",
    sectionTitle: "Input Blanco con Foco en Azul Eléctrico",
    currentText: "Campo de formulario con label superior en Outfit semibold en #0C59F2, fondo blanco #FFFFFF y foco directo con anillo en #0C59F2.",
    elementsToReview: [
      "Fondo blanco óptico #FFFFFF con texto de alta legibilidad en #0C59F2",
      "Borde sutil con transición a focus:ring-2 focus:ring-[#0C59F2]",
      "Label superior en Outfit semibold en #0C59F2",
      "Integración nativa para iconos de Lucide (Search, MapPin, Phone)"
    ],
    searchIndex: "uikit-input-field inputfield input formulario cotizador #ffffff #0c59f2 outfit lucide",
    recommendedTokens: {
      typography: "Outfit regular 16px para texto, semibold para label",
      colors: "Background #FFFFFF, Text #0C59F2, Focus ring #0C59F2",
      surfaces: "rounded-xl border border-[#0C59F2]/20 px-4 py-3",
      interactions: "transition-all duration-200 outline-none focus:ring-2"
    }
  },
  {
    id: "uikit-stepper-horiz",
    page: "UI Kit (Componentes Base)",
    category: "uikit",
    componentName: "StepperHorizontal",
    componentPath: "src/components/ui/StepperHorizontal.tsx",
    sectionTitle: "Paso a Paso Horizontal con Nodos Activos",
    currentText: "Visualizador de etapas operativas (1. Cotizá -> 2. Retiramos -> 3. Entregamos en 30-90 min) para servicios express y flex.",
    elementsToReview: [
      "Nodos circulares numerados en Amarillo Neón (#FFF12E) con números en Azul Eléctrico (#0C59F2)",
      "Línea de conexión en blanco translúcido o azul institucional",
      "Títulos de paso en Bebas Neue y descripciones en Outfit",
      "Colapso limpio a columna vertical en pantallas menores a 768px"
    ],
    searchIndex: "uikit-stepper-horiz stepperhorizontal stepper proceso etapas #fff12e #0c59f2 bebas neue",
    recommendedTokens: {
      typography: "Bebas Neue en números y títulos de paso",
      colors: "Nodo activo #FFF12E con texto #0C59F2, línea inactiva white/30",
      surfaces: "Nodos w-10 h-10 rounded-full flex items-center justify-center font-bold",
      interactions: "Transición fluida con física de resorte (stiffness: 100, damping: 20)"
    }
  }
];

// Convert reviewCatalog items to WebComponentItem
const MAPPED_CATALOG_ITEMS: WebComponentItem[] = reviewCatalog.map((item) => {
  const category = inferCategory(item);
  const searchIndex = `${item.id} ${item.componentName} ${item.page} ${item.sectionTitle} ${item.currentText} ${item.elementsToReview.join(' ')}`.toLowerCase();
  
  return {
    id: item.id,
    page: item.page,
    category,
    componentName: item.componentName,
    componentPath: item.componentPath,
    sectionTitle: item.sectionTitle,
    currentText: item.currentText,
    elementsToReview: item.elementsToReview,
    searchIndex,
    recommendedTokens: {
      typography: category === 'hero' 
        ? 'Anton (72px/48px uppercase) + Bebas Neue (badges/CTAs) + Outfit (párrafos 16px)' 
        : 'Bebas Neue (subtítulos) + Outfit (lectura) + Geist Mono (datos/precios)',
      colors: 'Brand Blue #0C59F2, Brand Yellow #FFF12E, Brand White #FFFFFF',
      surfaces: 'Fondo institucional #0C59F2 con tarjetas #FFFFFF (shadow-card-elevation) o translúcidas bg-white/10 (rounded-3xl)',
      interactions: 'CTAs rounded-full en #FFF12E con shadow-glow-yellow y hover:scale-[1.02]'
    }
  };
});

// Complete catalog
export const WEB_COMPONENTS_CATALOG: WebComponentItem[] = [
  ...UI_KIT_ITEMS,
  ...MAPPED_CATALOG_ITEMS
];

// Hoisted static lists (Vercel Best Practice: js-combine-iterations, avoid re-evaluating in render)
export const ALL_PAGES: string[] = Array.from(
  new Set(WEB_COMPONENTS_CATALOG.map(item => item.page))
);

// Categories definition with Spanish labels and Lucide icon keys
export const CATEGORY_DEFINITIONS: { key: ComponentCategory; label: string; iconKey: string }[] = [
  { key: 'hero', label: 'Heros & Cabeceras', iconKey: 'Sparkles' },
  { key: 'cards', label: 'Cards & Soluciones', iconKey: 'Layers' },
  { key: 'bento', label: 'Bento Grids Asimétricos', iconKey: 'LayoutGrid' },
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
  return ALL_PAGES;
}

export function getWebComponentById(id: string): WebComponentItem | undefined {
  return WEB_COMPONENTS_CATALOG.find(item => item.id === id);
}

// Fast filter using pre-computed searchIndex (Vercel Best Practice: js-cache-property-access)
export function filterWebComponents(params: {
  page?: string;
  category?: ComponentCategory | 'all';
  searchQuery?: string;
}): WebComponentItem[] {
  const query = params.searchQuery ? params.searchQuery.trim().toLowerCase() : '';
  const pageFilter = params.page && params.page !== 'all' ? params.page : null;
  const categoryFilter = params.category && params.category !== 'all' ? params.category : null;

  return WEB_COMPONENTS_CATALOG.filter(item => {
    if (pageFilter !== null && item.page !== pageFilter) {
      return false;
    }
    if (categoryFilter !== null && item.category !== categoryFilter) {
      return false;
    }
    if (query !== '' && !item.searchIndex.includes(query)) {
      return false;
    }
    return true;
  });
}
