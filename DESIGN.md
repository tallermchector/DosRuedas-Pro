# DESIGN.md: Envíos DosRuedas (Design System & Clone Specifications)

## Source
- **URL Base:** `https://www.enviosdosruedas.com/`
- **Capture Date:** 2026-08-27
- **Evidence:** Scraped HTML, Next.js tokens, Tailwind CSS utility classes, SVG assets, and multi-page DOM structures.
- **Coverage:** Home, Contacto, Cotizador Express/LowCost, Servicios (Express, LowCost, Flex, Plan Emprendedores), Nosotros (Sobre Nosotros, FAQ, Redes), Legales (Términos, Privacidad).

---

## Design Summary
**Envíos DosRuedas** presenta una identidad visual energética, técnica y de alta confiabilidad orientada a la logística urbana y e-commerce de última milla en Mar del Plata.
Combina una paleta de **Azul Corporativo Profundo** (`#021440` a `#0636A5`) con **Amarillo Eléctrico / Neón** (`#FFEC01`), tipografías condensadas de impacto display (**Anton**, **Bebas Neue**), cuerpo moderno ultra-legible (**Outfit**) y datos técnicos monoespaciados (**Geist Mono**).

El lenguaje de componentes emplea **Double-Bezel Glass Cards**, botones tipo **Nested-Pill CTA con orbes de acción**, trazados de rutas vectoriales SVG con rejillas procedurales, y estados interactivos con resplandor (*glow effects*) y micro-animaciones cinéticas.

---

## Design Tokens

### Colors

| Token Name | Hex / Value | Rol / Uso |
| :--- | :--- | :--- |
| `--color-brand-blue-950` | `#021440` | Fondos oscuros extremos, gradientes hero deep |
| `--color-brand-blue-900` | `#04236B` | Fondo de cards oscuras, bordes y badges nocturnos |
| `--color-brand-blue-700` | `#0636A5` | Color primario de marca, headers, tarjetas principales |
| `--color-brand-blue-500` | `#0950F6` | Acentos de enlaces, estados activos, brillos radiales |
| `--color-brand-blue-200` | `#628FF9` | Trazados SVG secundarios, bordes sutiles |
| `--color-brand-blue-50` | `#F0F4FF` | Fondos de secciones claras, cajas de beneficios |
| `--color-brand-yellow-500` | `#FFEC01` | **Color de acento primario**, botones CTA, badges, glows |
| `--color-brand-yellow-400` | `#FFF033` | Estado hover de botones y elementos interactivos |
| `--color-brand-ink` | `#0F172A` | Color de texto principal en fondos claros |
| `--color-brand-white-50` | `#FAFAFC` | Fondo base general de páginas |
| `color-social-wa` | `#25D366` | WhatsApp directo y canales de cotización |
| `color-social-ig` | `#E1306C` / `#833AB4`| Instagram badge / comunidad |

#### Gradients
- **Hero Background:** `linear-gradient(135deg, #021440 0%, #04236B 35%, #0636A5 75%, #00277C 100%)`
- **Radial Orbs:** `radial-gradient(circle, rgba(255,236,1,0.22) 0%, rgba(255,236,1,0.06) 45%, transparent 70%)`
- **Double Bezel Inner:** `linear-gradient(to bottom, rgba(6,54,165,0.85), rgba(2,20,64,0.95))`

---

### Typography

| Rol | Familia | Pesos | Uso |
| :--- | :--- | :--- | :--- |
| **Display** | `'Anton', sans-serif` | 900 / Black | Títulos principales (H1, H2), mayúsculas, leading compacto (`leading-[0.9]`), kinetic stretch |
| **Subheading** | `'Bebas Neue', cursive` | 700 / Bold | Subtítulos, pills de categoría, textos de botones CTA, tabs de navegación |
| **Sans / Body** | `'Outfit', sans-serif` | 300, 400, 500, 600, 700 | Párrafos, descripciones, inputs de formularios, tablas de tarifas |
| **Mono** | `'Geist Mono', monospace` | 500, 700 | Números de métricas (`+50K`), teléfonos, precios (`$8.200`), horarios |

---

### Spacing & Elevation

#### Spacing Scale
- **Container Max-Width:** `max-w-7xl` (`1280px`) centrado con `px-4 sm:px-6 lg:px-8`.
- **Section Padding:** `py-16 sm:py-20 lg:py-24`.
- **Grid Gaps:** `gap-4 sm:gap-6 lg:gap-8`.
- **Border Radius:**
  - Botones & Badges: `rounded-full` (pills completos)
  - Tarjetas & Contenedores: `rounded-2xl` (`16px`) y `rounded-3xl` (`24px`)
  - Icon Containers: `rounded-xl` (`12px`)

#### Shadows & Elevation
- `shadow-cta-glow`: `0 0 24px rgba(255, 236, 1, 0.35)`
- `shadow-cta-glow-hover`: `0 0 50px rgba(255, 236, 1, 0.50)`
- `shadow-elevated`: `0 10px 30px rgba(0, 0, 0, 0.08)`
- `shadow-antigravity-deep`: `0 20px 50px rgba(0, 0, 0, 0.25)`

---

## Key Components

### 1. Nested-Pill CTA Button
Botón característico con píldora externa y burbuja interna para el icono que se anima en hover.
```html
<a href="/cotizar/express" class="group inline-flex items-center justify-between gap-3 rounded-full font-subheading uppercase tracking-[.05em] font-bold border px-8 py-3 min-h-[52px] bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-500 shadow-cta-glow hover:bg-brand-yellow-400 hover:shadow-[0_0_50px_rgba(255,236,1,0.5)] active:scale-[.98] transition-all duration-300">
  <span class="truncate">Cotizá Express</span>
  <span class="w-8 h-8 rounded-full flex items-center justify-center bg-brand-blue-700/10 text-brand-blue-900 group-hover:bg-brand-blue-700 group-hover:text-brand-yellow-500 group-hover:translate-x-1 transition-all duration-200">
    <svg class="w-4 h-4" ...></svg>
  </span>
</a>
```

### 2. Double-Bezel Card (Efecto Glassmorphism Operativo)
Estructura de dos capas con bisel exterior translúcido e interior con gradiente profundo.
```html
<div class="double-bezel-outer bg-brand-blue-900/60 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
  <div class="double-bezel-inner relative rounded-2xl overflow-hidden bg-gradient-to-b from-brand-blue-800/85 to-brand-blue-950/95 border border-white/10 p-4 sm:p-6 flex flex-col">
    <!-- Contenido de la tarjeta -->
  </div>
</div>
```

### 3. Procedural Background Grid & Route Curves
Patrón vectorial que evoca rutas y mapas de ruteo logístico.
```html
<svg class="absolute inset-0 w-full h-full opacity-[0.07]">
  <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" stroke-width="0.75" stroke-dasharray="2,6"/>
    <circle cx="0" cy="0" r="1.5" fill="#FFEC01"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#hero-grid)"/>
</svg>
```

### 4. Status Indicator Badge (Live Dispatch Indicator)
Píldora con pulso en vivo para indicar estado activo de mensajería.
```html
<div class="flex items-center gap-2 bg-brand-blue-900/70 border border-white/15 px-3.5 py-1.5 rounded-full">
  <span class="relative flex h-2.5 w-2.5">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-yellow-500"></span>
  </span>
  <span class="font-subheading text-xs uppercase tracking-widest text-brand-yellow-500 font-bold">Ruteo Activo · MDQ</span>
</div>
```

---

## Page Patterns & Information Architecture

### Global Section Hierarchy
1. **Sticky Header:** Logo isotipo + wordmark, menú desplegable (Servicios, Nosotros), CTA de llamada directa y botón `Cotizá tu envío`.
2. **Hero Section:** Gradiente radial oscuro, badge de confianza, titular `Anton` en 2 colores, CTAs gemelos (Primario amarillo + Secundario blanco glass) y tarjeta interactiva de cobertura con mapa 3D.
3. **Value Proposition / Proof Bar:** Estadísticas en `Geist Mono` (`+50K Envíos`, `0 Paquetes extraviados`, `+100 Comercios`).
4. **Service Carousel / Tab Grid:** Tarjetas de servicio (Express, LowCost, Flex, 3PL) con rotación automática o selección manual.
5. **Pricing Matrix:** Tablas por radio de distancia (0-3km, 3-5km, 5-7km, 7-10km, +km adicional).
6. **Social Proof & Testimonios:** Muro de reseñas reales con estrellas y nombres de comercios locales.
7. **Bottom Floating Sticky CTA / WhatsApp:** Enlace persistente de contacto rápido.
8. **Footer Operativo:** Mapa del sitio, horarios del Hub Friuli 1972, teléfonos y credenciales legales.

---

## Agent Build Instructions (Stack Recomendado)

Para recrear fielmente este sitio o generar nuevas páginas en este estilo:
1. **Framework:** Next.js (App Router) o Astro con Tailwind CSS v3/v4.
2. **Fuentes de Google Fonts:**
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
   ```
3. **Configuración Tailwind (`tailwind.config.js`):**
   ```javascript
   module.exports = {
     theme: {
       extend: {
         colors: {
           brand: {
             blue: {
               50: '#F0F4FF',
               100: '#D9E4FF',
               500: '#0950F6',
               700: '#0636A5',
               800: '#042A82',
               900: '#04236B',
               950: '#021440',
             },
             yellow: {
               400: '#FFF033',
               500: '#FFEC01',
             },
             ink: '#0F172A',
           }
         },
         fontFamily: {
           display: ['Anton', 'sans-serif'],
           subheading: ['Bebas Neue', 'cursive'],
           sans: ['Outfit', 'sans-serif'],
           mono: ['Geist Mono', 'monospace'],
         },
         boxShadow: {
           'cta-glow': '0 0 24px rgba(255,236,1,0.35)',
           'antigravity-deep': '0 20px 50px rgba(0,0,0,0.3)',
         }
       }
     }
   }
   ```

---

## Rerun Inputs
```yaml
workflow: firecrawl-website-design-clone
source_url: https://www.enviosdosruedas.com/
target_stack: TailwindCSS + Next.js / HTML5
output: D:/00proyectos/clonar_envios/DESIGN.md
```