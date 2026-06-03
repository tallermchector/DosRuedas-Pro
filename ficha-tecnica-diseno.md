---
# Ficha Técnica de Identidad Visual y UI: Envíos DosRuedas

## 1. Mapeo de la Paleta de Colores Actual
- **Colores de Fondo (Backgrounds):**
  - **Fondos Estándar (Sistema Global):** Configurados en `globals.css` mediante variables CSS HSL, con un esquema oscuro por defecto (`--background: 215 47% 14%`, un tono azul/pizarra muy oscuro equivalente a `#121f32`). Las tarjetas usan `--card: 215 45% 18%`.
  - **Fondos "Dark Tech" (Pitch Deck / Páginas V2):** Predominan clases con valores arbitrarios HEX inyectados para forzar el modo oscuro profundo, como `bg-[#0a0a0a]` (negro casi puro) y fondos de tarjetas con transparencia para *Glassmorphism* (`bg-white/5`, `bg-black/40`, `bg-[#2563eb]/10`, `bg-white/10`, `bg-[#111111]`).
- **Colores de Texto (Typography Colors):**
  - **Textos de Cuerpo:** Principalmente blanco (`text-white`) y variaciones de grises para suavizar el contraste (`text-gray-300`, `text-gray-200`, `text-[#9ca3af]`, o variables como `text-muted-foreground`).
  - **Encabezados:** Blanco puro o degradados (ej. `bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400`).
- **Colores de Acento e Identidad:**
  - **Ámbar/Amarillo (Marca):** Definido globalmente en `tailwind.config.ts` como `accent: '#FDC322'`. En la nueva versión de páginas también se usa exhaustivamente el arbitrario `#fbc107` (Amber Yellow) para insignias, iconos y textos de resalte.
  - **Azul Eléctrico (Tech/Operativo):** Uso crítico del `#2563eb` (Electric Blue) para bullets, bordes de enfoque, resplandores (`shadow-[0_0_15px_#2563eb]`) y fondos de botones.
  - **Verde:** Ocasional, como `#22c55e` explícito para estados positivos.

## 2. Sistema Tipográfico y Jerarquías
- **Familias Tipográficas:**
  - **Cuerpo (Sans-Serif):** `Inter` (`font-body`), configurada para todo el texto descriptivo y viñetas para garantizar legibilidad.
  - **Títulos (Display/Headline):** `Space Grotesk` (`font-headline`), aplicada sistemáticamente con clases a `h1`, `h2`, `h3`, `h4`, `h5`, `h6` en `globals.css` y utilizada explícitamente en el Pitch Deck para transmitir un tono tecnológico ("Dark Tech").
  - **Código/Mono:** Familia `monospace` (`font-code`), utilizada de forma esporádica para datos técnicos o footers (`text-[9px] uppercase tracking-[0.2em]`).
- **Jerarquías, Tamaños y Pesos:**
  - **H1 (Hero):** Tamaños enormes (ej. `text-6xl`, `text-[56px]`), combinados con `font-black`, `tracking-tight`, `leading-none` y frecuentemente `uppercase`.
  - **H2/H3 (Secciones):** Tamaños como `text-2xl`, con `font-bold` o `font-semibold` y a veces `tracking-wide` / `uppercase`.
  - **Espaciados:** Los encabezados suelen estar separados con un `mb-4` a `mb-8`.

## 3. Componentes Visuales y Patrones de UI Existentes
- **Tarjetas (Cards):**
  - **Estándar shadcn/ui:** Implementadas con bordes opacos (`border`), fondo sólido (`bg-card`), y redondeo estándar (`rounded-lg`, `shadow-sm`).
  - **"Dark Tech" Cards:** Emplean un estilo *Glassmorphism* intensivo. Usan contenedores con `backdrop-blur-md` o `backdrop-blur-sm`, colores traslúcidos (`bg-[#0a0a0a]/80`, `bg-black/70`, `bg-white/5`), bordes sutiles y traslúcidos (`border-white/10`, `border-[#2563eb]/30`), y esquinas más curvas (`rounded-xl`, `rounded-2xl`). Generan profundidad con sombras pronunciadas (`shadow-xl`, `shadow-2xl`).
- **Botones (Buttons):**
  - **Variantes:** Sistema estándar que incluye `default` (fondo primario #121F32), `destructive`, `outline`, `secondary`, `ghost`, y `link`.
  - **Interacciones:** Hover con ligeras bajadas de opacidad (`hover:bg-primary/90`) o cambios a acento. En la versión "Dark Tech" de páginas, existen píldoras interactivas (ej. `rounded-full px-6 py-3`) que reaccionan con `hover:bg-[#2563eb]/20`.
- **Componentes de Navegación y Formularios:**
  - **Header de Página:** Efectos muy marcados de `backdrop-blur-sm`, bordes traslúcidos, logos en cursiva e itálica (`-skew-x-12`), y "badges" estéticos (`border-accent/30`, sombras resplandecientes).
  - **Formularios/Tablas:** Uso de componentes base limpios (`border-input`, enfoque con `focus-visible:ring-2 focus-visible:ring-ring`). Las tablas de datos alternan colores por fila (`odd:bg-transparent even:bg-white/[0.02]`).

## 4. Animaciones, Micro-interacciones y Efectos Visuales
- **Desglose de Movimiento y Hover:**
  - El ruteo o los acordeones emplean animaciones de Radix UI/Tailwind (`animate-in`, `animate-out`, `slide-in`, `accordion-down`).
  - Elementos interactivos como tarjetas tienen transiciones de elevación (`hover:-translate-y-1`, `hover:-translate-y-[2px]`), transformaciones de escala (`hover:scale-105`, `group-hover:scale-110`), y rotaciones (`-rotate-2 hover:rotate-0`).
  - Otras micro-interacciones incluyen `hover:bg-white/10` y transiciones lentas para escala de grises (`hover:grayscale-0`). Hay indicadores visuales parpadeantes (`animate-pulse`).
- **Degradados (Gradients) y Fondos "Code-generated":**
  - Uso extensivo de degradados radiales para los fondos de secciones ("Hero"), generando "resplandores" sin imágenes estáticas: `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2563eb]/40 via-[#0a0a0a] to-[#0a0a0a]`.
  - Aplicación de patrones de fondo generados por CSS (`bg-grid`, `repeating-linear-gradient`, `radial-gradient` simulando punteados).
  - Efectos de "Glow" (resplandor) creados con sombras, ej. `shadow-[0_0_15px_#2563eb]` o div en posición absoluta con `blur-[120px]`.

## 5. Áreas de Oportunidad Estética Detectadas
- **Fragmentación de la Paleta de Colores:** Existe un claro "split-brain" en la base de código. Por un lado, las variables globales `hsl` en `globals.css` y `tailwind.config.ts` definen un esquema basado en azules oscuros y amarillos. Por el otro, en `src/components/paginas_version_nueva`, los valores HEX se "hardcodean" (`#0a0a0a`, `#2563eb`, `#fbc107`). Para la modernización y mantenibilidad, estas variables arbitrarias deben abstraerse en el archivo de configuración global de Tailwind.
- **Duplicidad de Estilos de Tarjetas:** Los componentes oficiales (en `src/components/ui/card.tsx`) no reflejan la identidad real usada en las vistas de Pitch Deck (Glassmorphism, bordes de acento translúcidos). Esto significa que la UI "oficial" es genérica (tipo shadcn por defecto), mientras que las páginas personalizan la estética localmente, rompiendo el sistema de diseño central.
- **Consistencia en Transiciones:** Las animaciones interactivas (`hover`, transformaciones) se declaran en línea con múltiples clases dispersas. Esto dificulta que los elementos interactuen con la misma "física" en toda la aplicación.
- **Gestión de la Estética para Impresión (A4):** Si bien hay clases `print:hidden` y configuración especial para A4 en `globals.css`, la aplicación de colores oscuros profundos y resplandores CSS puede presentar desafíos o consumo excesivo de tinta al exportar a PDF, sugiriendo una oportunidad para un tema específico "Light/Print".
---