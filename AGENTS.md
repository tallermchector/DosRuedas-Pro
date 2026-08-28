# System Role & Context
El propósito de este repositorio es el desarrollo y mantenimiento de **Dos Ruedas Pro**, una plataforma logística de última milla.
El core del sistema se centra en la gestión operativa, propuestas comerciales e itinerarios, destacándose por la generación y exportación de documentos en alta fidelidad como PDFs en formato A4.

Como agente autónomo, tu rol es mantener la integridad arquitectónica y proveer soluciones que no comprometan la visualización estricta requerida por la logística corporativa.

# Core Stack Rules
- **Arquitectura Base:** Next.js utilizando estrictamente **App Router**.
- **Gestor de Paquetes:** Utilizar estrictamente `pnpm` (`packageManager: "pnpm@..."`).
- **Estructura de UI:** Todos los componentes principales de interfaz y de páginas deben alojarse de forma modular en `src/components/paginas/`.
- **Tipado:** Uso riguroso de TypeScript. El uso explícito del tipo `any` está prohibido.
- **Estilos y Exportación PDF:**
  - Tailwind CSS es la única herramienta de estilos permitida.
  - Para maquetación de PDFs, debes aplicar invariablemente la clase `.a4-container` (que fija dimensiones en 210mm x 297mm).
  - Controla el desbordamiento de contenido con `overflow-hidden`.
  - Prioriza los colores temáticos definidos en `tailwind.config.ts` (`primary`, `accent`, etc.) por encima de valores hex hardcodeados.
  - Se debe utilizar la estética Enterprise / shadcn/ui para las tablas de datos (fondos sutiles, headers pequeños en mayúsculas, filas alternadas y badges estilizados para estados).

# AI Agent Flows (Genkit)
El flujo inteligente del proyecto reside en `src/ai/flows/optimize-delivery-routes.ts`.
- **Inputs Esperados:** Estructuras de datos conteniendo rutas, lista de direcciones de entrega, ventanas de tiempo y capacidades de carga.
- **Outputs Requeridos:** Itinerarios optimizados, ordenados cronológicamente con estimaciones de tiempos y distancias.
- **Herramientas de Agente:** Funciones de geolocalización, estimación de tráfico y mapeo de distancias. El flujo debe ser determinista frente al frontend.

# Strict Guidelines ("Qué hacer" vs "Qué NO hacer")

### SÍ Hacer:
- **Mantener layout elástico:** En vistas A4, estructura los componentes con un contenedor flexbox vertical (`flex flex-col h-full justify-between max-h-full`) y un cuerpo elástico (`flex-1`) para prevenir desbordamientos.
- **Control de espacios:** Utiliza márgenes y paddings precisos (puedes valerte de equivalencias en `mm` si está extendido en Tailwind) para garantizar la alineación de impresión.
- **Usar iconos del stack:** Emplea exclusivamente `lucide-react` para la iconografía del proyecto.

### NO Hacer:
- **NO eliminar contenido para encajar:** Jamás reduzcas, abrevies o elimines texto o datos reales con tal de hacerlos caber en el A4. En su lugar: adapta, reduce los espacios circundantes o reorganiza la estructura visual mediante grillas o flexbox.
- **NO utilizar CSS externo:** Está estrictamente prohibido importar o usar librerías CSS ajenas a Tailwind.
- **NO romper la arquitectura App Router:** Evita crear estructuras de *Pages Router* heredadas o mezclar paradigmas de hidratación de estados ineficientemente.