export interface CatalogItem {
    id: string;
    page: string;
    componentName: string;
    componentPath: string;
    sectionTitle: string;
    currentText: string;
    elementsToReview: string[];
}

export const reviewCatalog: CatalogItem[] = [
    // ==========================================
    // HOME PAGE (INICIO)
    // ==========================================
    {
        id: "home-hero",
        page: "Home (Inicio)",
        componentName: "Hero",
        componentPath: "src/components/Hero.tsx",
        sectionTitle: "1. Presentación Principal (Hero)",
        currentText: "Título: Mensajería y Logística E-Commerce en Mar del Plata (Display Anton uppercase con bloque rotado -1deg).\nCopete: Soluciones ágiles, seguras y competitivas para comercios y tiendas online.\nBadge: 'MÁS DE 50.000 ENVÍOS REALIZADOS' en Bebas Neue + High-Voltage Yellow (#FFF12E).\nCTAs: 'Cotizá Express' (pill rounded-full amarillo con glow) y 'Calculá LowCost'.\nMétricas de pie: 30-90 min entrega express, Cobertura total MDQ, Friuli 1972 depósito en Chauvín.",
        elementsToReview: [
            "Tipografía Display Anton en título",
            "Badge superior en Bebas Neue y Amarillo Neón (#FFF12E)",
            "Píldora inclinada -1deg para highlight de marca",
            "Botones CTA con rounded-full y efecto shadow-glow-yellow",
            "Métricas y datos en Geist Mono"
        ]
    },
    {
        id: "home-vision",
        page: "Home (Inicio)",
        componentName: "VisionSection",
        componentPath: "src/app/page.tsx",
        sectionTitle: "2. Visión y Estadísticas de Flota",
        currentText: "Título: Conectamos Mar del Plata de Punta a Punta\nDescripción: Distribución de última milla para e-commerce locales y comercios, con tecnología de seguimiento y tarifas transparentes.\nMétricas: +50k Envíos Realizados, 99.8% Eficiencia de Entrega, <25 min Tiempo Promedio Express, +150 Emprendedores Confían.",
        elementsToReview: [
            "Bento Grid asimétrico (distribución 7:5 en desktop)",
            "Números y porcentajes estilizados con Geist Mono (tabular-nums)",
            "Subtítulos y etiquetas métricas en Bebas Neue uppercase",
            "Bordes sutiles border-brand-white/20 y tarjetas en Midnight Navy (#052C87)"
        ]
    },
    {
        id: "home-services",
        page: "Home (Inicio)",
        componentName: "ServicesOverview",
        componentPath: "src/app/page.tsx",
        sectionTitle: "3. Resumen General de Soluciones",
        currentText: "Título: Soluciones Logísticas a tu Medida\nServicios:\n- Envíos Express: 30-90 min, $3.700 Base, motos y furgones para traslados prioritarios.\n- Envíos LowCost: En el día, $3.000 Base, ruteo agrupado optimizado para comercios.\n- Mercado Libre Flex Oficial: Same-Day con corte 15:00 hs para mantener medalla verde.\n- Logística 3PL & Fulfillment: Almacén central Friuli 1972, picking, packing y despacho.",
        elementsToReview: [
            "Tarjetas Midnight Navy (#052C87) con curvatura rounded-3xl (28px)",
            "Marcas de agua gigantes con iconos traslúcidos en esquina inferior derecha",
            "Badges de estado en Bebas Neue y precios/tiempos en Geist Mono",
            "Transición hover con microinteracción y scale-95 en click"
        ]
    },
    {
        id: "home-slider",
        page: "Home (Inicio)",
        componentName: "SliderServicios",
        componentPath: "src/app/page.tsx",
        sectionTitle: "4. Slideshow de Soluciones por Industria",
        currentText: "Título: Soluciones Especiales para Industrias\nSlides:\n- Gastronomía & Delivery Express: Envíos inmediatos con control térmico.\n- Repuestos de Automotor: Envíos urgentes a talleres mecánicos de Mar del Plata.\n- Indumentaria & Calzado: Logística inversa y cambios de talle en el día.",
        elementsToReview: [
            "Contenedores rounded-3xl con fondo Midnight Navy y backdrop-blur-md",
            "Píldoras descriptivas en Bebas Neue",
            "Botones de navegación circulares en rounded-full",
            "Contraste óptico estricto con Brand White y Amarillo Neón"
        ]
    },
    {
        id: "home-emprendedores",
        page: "Home (Inicio)",
        componentName: "EmprendedoresHome",
        componentPath: "src/app/page.tsx",
        sectionTitle: "5. Beneficios para Comercios y Emprendedores",
        currentText: "Título: Potenciamos tu Negocio Local\nDescripción: Planes escalables para tiendas online con retiros programados a domicilio y soporte directo por WhatsApp.\nBeneficios: Integración de checkout, soporte comercial humano, tarifas con descuento por volumen (+10 envíos/mes).",
        elementsToReview: [
            "Iconos de soporte y checklist en High-Voltage Yellow (#FFF12E)",
            "Cifras de volumen y porcentajes en Geist Mono",
            "Textos de lectura en Outfit con interlineado relajado (lineHeight 1.6)"
        ]
    },
    {
        id: "home-cta",
        page: "Home (Inicio)",
        componentName: "CtaSection",
        componentPath: "src/app/page.tsx",
        sectionTitle: "6. Llamada a la Acción Final",
        currentText: "Título: ¿Listo para dar el salto logístico?\nSubtítulo: Optimizá tus entregas en Mar del Plata con Envíos DosRuedas.\nCTAs: 'Cotizar Envío' (Amarillo Neón) y 'Hablar por WhatsApp' (#25D366).",
        elementsToReview: [
            "Título masivo en Anton uppercase",
            "Botón principal con flecha que se desplaza en hover",
            "Canal social WhatsApp oficial (#25D366) con pill rounded-full"
        ]
    },

    // ==========================================
    // COTIZADOR EXPRESS
    // ==========================================
    {
        id: "cotizar-express-hero",
        page: "Cotizador Express",
        componentName: "ExpressHeroHeader",
        componentPath: "src/app/cotizar/express/page.tsx",
        sectionTitle: "1. Presentación (Hero Header)",
        currentText: "Título: Cotizador de Envíos Express\nCopete: Calculá la tarifa exacta de tu envío prioritario punto a punto en Mar del Plata al instante.\nBadge: 'URGENTE · 30-90 MIN' en Bebas Neue.",
        elementsToReview: [
            "Badge reflectivo en Bebas Neue con High-Voltage Yellow",
            "Título Anton uppercase con contraste sobre fondo Speed Blue (#0950F6)",
            "Texto explicativo en Outfit"
        ]
    },
    {
        id: "cotizar-express-form",
        page: "Cotizador Express",
        componentName: "CotizadorExpressForm",
        componentPath: "src/app/cotizar/express/page.tsx",
        sectionTitle: "2. Formulario Interactivo Express",
        currentText: "Campos: Dirección de Retiro (Origen), Dirección de Entrega (Destino), Teléfono, Tipo de paquete.\nTarifador dinámico: Cálculo de kilometraje y precio en pesos en tiempo real.",
        elementsToReview: [
            "Inputs oscuros semitransparentes (border-brand-white/20, focus:border-brand-yellow)",
            "Precios y distancias formateados en Geist Mono",
            "Botones de confirmación y selección con rounded-full"
        ]
    },
    {
        id: "cotizar-express-details",
        page: "Cotizador Express",
        componentName: "CotizadorExpressDetails",
        componentPath: "src/app/cotizar/express/page.tsx",
        sectionTitle: "3. Condiciones del Servicio Express",
        currentText: "Límites: Hasta 10 kg en moto. Medidas máximas 40x40x40 cm. Entrega puerta a puerta con confirmación por WhatsApp.",
        elementsToReview: [
            "Dimensiones y capacidades en Geist Mono",
            "Tarjetas Midnight Navy con bordes redondeados rounded-3xl"
        ]
    },
    {
        id: "cotizar-express-help",
        page: "Cotizador Express",
        componentName: "CotizadorExpressHelp",
        componentPath: "src/app/cotizar/express/page.tsx",
        sectionTitle: "4. Soporte y Cadetería Fija",
        currentText: "Título: ¿Necesitás cadete recurrente?\nDescripción: Contratá cadetería fija de marca o planes prepagos con tarifas mensuales preferenciales.",
        elementsToReview: [
            "Enlace a WhatsApp oficial (#25D366) con número +54 223 660-2699",
            "Botones con microinteracción hover y resplandor glow"
        ]
    },

    // ==========================================
    // COTIZADOR LOWCOST
    // ==========================================
    {
        id: "cotizar-lowcost-hero",
        page: "Cotizador LowCost",
        componentName: "LowCostHeroHeader",
        componentPath: "src/app/cotizar/lowcost/page.tsx",
        sectionTitle: "1. Presentación (Hero Header)",
        currentText: "Título: Cotizador de Envíos LowCost\nCopete: Maximizá la rentabilidad de tus ventas locales con ruteo programado en el día en todo General Pueyrredón.\nBadge: 'ECONÓMICO · 24-48 HS'.",
        elementsToReview: [
            "Badge superior en Bebas Neue y fondo amarillo",
            "Tipografía de título en Anton",
            "Copete en Outfit"
        ]
    },
    {
        id: "cotizar-lowcost-form",
        page: "Cotizador LowCost",
        componentName: "CotizadorLowCostForm",
        componentPath: "src/app/cotizar/lowcost/page.tsx",
        sectionTitle: "2. Formulario Interactivo LowCost",
        currentText: "Campos: Dirección de local de retiro, Cantidad de paquetes diarios, Zonas de entrega (Centro, Güemes, Norte, Puerto, Batán).\nEscala de descuentos por volumen.",
        elementsToReview: [
            "Selectores y checkboxes estilizados con foco en #FFF12E",
            "Tabla de descuentos por escala en Geist Mono",
            "Tarjetas elevadas en Midnight Navy (#052C87)"
        ]
    },
    {
        id: "cotizar-lowcost-details",
        page: "Cotizador LowCost",
        componentName: "CotizadorLowCostDetails",
        componentPath: "src/app/cotizar/lowcost/page.tsx",
        sectionTitle: "3. Condiciones del Servicio LowCost",
        currentText: "Condiciones: Retiros por la mañana (09:00 a 12:00) y entregas coordinadas durante la tarde. Peso máximo 15 kg por bulto.",
        elementsToReview: [
            "Horarios y pesos renderizados en Geist Mono",
            "Párrafos informativos con tipografía Outfit"
        ]
    },
    {
        id: "cotizar-lowcost-help",
        page: "Cotizador LowCost",
        componentName: "CotizadorLowCostHelp",
        componentPath: "src/app/cotizar/lowcost/page.tsx",
        sectionTitle: "4. Cuentas Corporativas y Facturación A",
        currentText: "Título: ¿Tenés una cuenta corporativa?\nDescripción: Facturación mensual tipo A, carga masiva de planillas Excel y panel multi-rastreo.",
        elementsToReview: [
            "Iconos de soporte y badges de cuenta comercial",
            "Botón de contacto a ventas"
        ]
    },

    // ==========================================
    // SOBRE NOSOTROS
    // ==========================================
    {
        id: "about-hero",
        page: "Sobre Nosotros",
        componentName: "AboutHero",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "1. Quiénes Somos (Hero)",
        currentText: "Título: Líderes en Última Milla en Mar del Plata\nCopete: Transformamos la logística urbana de la costa con agilidad, tecnología de ruteo y compromiso ecológico.",
        elementsToReview: [
            "Título en Anton con tracking-tight",
            "Subtítulo en Outfit y badge superior en Bebas Neue"
        ]
    },
    {
        id: "about-advantages",
        page: "Sobre Nosotros",
        componentName: "AboutAdvantages",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "2. Ventajas del Servicio",
        currentText: "Ventajas: Flota propia capacitada, algoritmos de ruteo inteligente, depósito central en Chauvín y soporte 100% humano local.",
        elementsToReview: [
            "Grid de ventajas con tarjetas Midnight Navy y bordes semitransparentes",
            "Iconos en Amarillo Neón (#FFF12E)"
        ]
    },
    {
        id: "about-values",
        page: "Sobre Nosotros",
        componentName: "AboutValues",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "3. Valores Corporativos",
        currentText: "Valores: Transparencia total de tarifas, Cuidado riguroso del paquete, Sustentabilidad vial e Innovación operativa 2026.",
        elementsToReview: [
            "Títulos de valores en Bebas Neue uppercase",
            "Descripciones fluidas en Outfit"
        ]
    },
    {
        id: "about-timeline",
        page: "Sobre Nosotros",
        componentName: "AboutTimeline",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "4. Hitos Históricos de la Empresa",
        currentText: "Cronología:\n- 2020: Inicio de operaciones con 5 motos en el centro.\n- 2023: Apertura de base operativa y depósito en Friuli 1972.\n- 2026: Cobertura integral Flex Oficial y soluciones 3PL avanzadas.",
        elementsToReview: [
            "Años destacados en Geist Mono con glow neón",
            "Línea de tiempo con nodos y tarjetas redondeadas"
        ]
    },
    {
        id: "about-team",
        page: "Sobre Nosotros",
        componentName: "AboutTeam",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "5. Estructura de Flota y Cadetes",
        currentText: "Descripción: Cadetes equipados con indumentaria reflectiva de alta visibilidad, seguros vigentes y app móvil de trazabilidad.",
        elementsToReview: [
            "Píldoras informativas de equipamiento",
            "Contraste de texto y credibilidad operativa"
        ]
    },
    {
        id: "about-mission",
        page: "Sobre Nosotros",
        componentName: "AboutMissionVision",
        componentPath: "src/app/sobre-nosotros/page.tsx",
        sectionTitle: "6. Misión, Visión e Innovación",
        currentText: "Misión: Simplificar la logística de comercios marplatenses. Visión: Consolidar la mayor red de distribución ecológica y rápida de la región.",
        elementsToReview: [
            "Bloques comparativos en Bento Layout",
            "Tipografías institucionales consistentes"
        ]
    },

    // ==========================================
    // PREGUNTAS FRECUENTES
    // ==========================================
    {
        id: "faq-hero-comp",
        page: "Preguntas Frecuentes",
        componentName: "FaqHero",
        componentPath: "src/app/preguntas-frecuentes/page.tsx",
        sectionTitle: "1. FAQ Hero Header",
        currentText: "Título: Centro de Respuestas DosRuedas\nDescripción: Todo lo que necesitás saber sobre zonas de cobertura, tarifas, franjas horarias e integración Flex.",
        elementsToReview: [
            "Display Anton en título",
            "Subtítulo en Outfit",
            "Badge informativo en Bebas Neue"
        ]
    },
    {
        id: "faq-accordion-comp",
        page: "Preguntas Frecuentes",
        componentName: "FaqAccordion",
        componentPath: "src/app/preguntas-frecuentes/page.tsx",
        sectionTitle: "2. Acordeón de Consultas",
        currentText: "Categorías: Envíos Express, Ruteo LowCost, Mercado Libre Flex, Facturación y Depósito Friuli 1972.",
        elementsToReview: [
            "Acordeones con contenedor Midnight Navy (#052C87)",
            "Iconos de despliegue con transición suave",
            "Respuestas con legibilidad óptima en Outfit"
        ]
    },
    {
        id: "faq-cta-comp",
        page: "Preguntas Frecuentes",
        componentName: "FaqCta",
        componentPath: "src/app/preguntas-frecuentes/page.tsx",
        sectionTitle: "3. Bloque de Asistencia Directa",
        currentText: "Título: ¿Tenés una consulta especial?\nDescripción: Escribinos directo por WhatsApp a nuestro centro de operaciones.",
        elementsToReview: [
            "Botón verde WhatsApp (#25D366) en rounded-full",
            "Número visible en Geist Mono (+54 223 660-2699)"
        ]
    },

    // ==========================================
    // COMUNIDAD Y REDES
    // ==========================================
    {
        id: "networks-hero-comp",
        page: "Comunidad y Redes",
        componentName: "NetworksHero",
        componentPath: "src/app/nuestras-redes/page.tsx",
        sectionTitle: "1. Redes Hero Header",
        currentText: "Título: Nuestra Comunidad en Línea\nDescripción: Enterate del estado del tránsito en Mar del Plata, clima operativo, novedades de flota y promociones comerciales.",
        elementsToReview: [
            "Título Anton uppercase",
            "Badge de comunidad en Bebas Neue"
        ]
    },
    {
        id: "networks-channels",
        page: "Comunidad y Redes",
        componentName: "NetworksChannels",
        componentPath: "src/app/nuestras-redes/page.tsx",
        sectionTitle: "2. Canales Oficiales",
        currentText: "Canales: Instagram oficial, Canal de Alertas WhatsApp (#25D366) y Facebook institucional (#1877F2).",
        elementsToReview: [
            "Tarjetas de redes con colores institucionales oficiales",
            "Botones de seguimiento en pill rounded-full"
        ]
    },
    {
        id: "recent-posts",
        page: "Comunidad y Redes",
        componentName: "RecentPosts",
        componentPath: "src/app/nuestras-redes/page.tsx",
        sectionTitle: "3. Feed de Novedades y Consejos",
        currentText: "Temas: Tips de embalaje para e-commerce, alertas climáticas de lluvia en Mar del Plata y operativa de cadetería.",
        elementsToReview: [
            "Mockup cards en rounded-3xl",
            "Bordes border-brand-white/20 y badges temáticos"
        ]
    },
    {
        id: "networks-benefits",
        page: "Comunidad y Redes",
        componentName: "NetworksBenefits",
        componentPath: "src/app/nuestras-redes/page.tsx",
        sectionTitle: "4. Beneficios para la Comunidad",
        currentText: "Beneficios: Descuentos mensuales, prioridad en ruteo y sorteos para emprendedores de la costa.",
        elementsToReview: [
            "Lista de beneficios con checks en Amarillo Neón (#FFF12E)"
        ]
    },
    {
        id: "newsletter-subscribe",
        page: "Comunidad y Redes",
        componentName: "NewsletterSubscribe",
        componentPath: "src/app/nuestras-redes/page.tsx",
        sectionTitle: "5. Suscripción a Reportes Logísticos",
        currentText: "Formulario de suscripción por correo para recibir el informe mensual de tarifas y operaciones 2026.",
        elementsToReview: [
            "Input de correo con foco amarillo",
            "Botón de suscripción en Bebas Neue"
        ]
    },

    // ==========================================
    // SERVICIOS DETALLADOS - EXPRESS
    // ==========================================
    {
        id: "service-express-hero",
        page: "Servicio Express",
        componentName: "ExpressHero",
        componentPath: "src/app/servicios/envios-express/page.tsx",
        sectionTitle: "1. Envíos Express Hero",
        currentText: "Título: Envíos Express al Instante\nCopete: Entrega prioritaria en 30-90 minutos en Mar del Plata con seguimiento satelital y cadete asignado.",
        elementsToReview: [
            "Display Anton y Badge 'URGENTE · 30-90 MIN'",
            "Botón CTA a Cotizador Express con glow neón"
        ]
    },
    {
        id: "service-express-features",
        page: "Servicio Express",
        componentName: "ExpressFeatures",
        componentPath: "src/app/servicios/envios-express/page.tsx",
        sectionTitle: "2. Características Express",
        currentText: "Puntos clave: Asignación inmediata, tracking digital, seguro de paquete y confirmación de entrega con firma o foto.",
        elementsToReview: [
            "Bento cards con iconos translúcidos gigantes",
            "Bordes redondeados rounded-3xl"
        ]
    },
    {
        id: "service-express-pricing",
        page: "Servicio Express",
        componentName: "ExpressPricing",
        componentPath: "src/app/servicios/envios-express/page.tsx",
        sectionTitle: "3. Tarifas y Zonas Express",
        currentText: "Zonificación 2026: Centro/Güemes, Constitución/Norte, Puerto/Faro, Batán con tarifas transparentes.",
        elementsToReview: [
            "Precios zonales en Geist Mono",
            "Mapa/Zonas con etiquetas en Bebas Neue"
        ]
    },
    {
        id: "service-express-usecases",
        page: "Servicio Express",
        componentName: "ExpressUseCases",
        componentPath: "src/app/servicios/envios-express/page.tsx",
        sectionTitle: "4. Casos de Uso Express",
        currentText: "Casos: Documentación confidencial, repuestos críticos para talleres, envíos de farmacia y delivery e-commerce urgente.",
        elementsToReview: [
            "Tarjetas de casos de uso con contraste de alta legibilidad"
        ]
    },

    // ==========================================
    // SERVICIOS DETALLADOS - LOWCOST
    // ==========================================
    {
        id: "service-lowcost-hero",
        page: "Servicio LowCost",
        componentName: "LowCostHero",
        componentPath: "src/app/servicios/envios-lowcost/page.tsx",
        sectionTitle: "1. Envíos LowCost Hero",
        currentText: "Título: Envíos LowCost Programados\nCopete: La mejor tarifa por bulto de Mar del Plata para comercios que consolidan envíos diarios.",
        elementsToReview: [
            "Título Anton y badge 'ECONÓMICO · EN EL DÍA'",
            "CTA directo a Cotizador LowCost"
        ]
    },
    {
        id: "service-lowcost-features",
        page: "Servicio LowCost",
        componentName: "LowCostFeatures",
        componentPath: "src/app/servicios/envios-lowcost/page.tsx",
        sectionTitle: "2. Características LowCost",
        currentText: "Características: Retiro a domicilio en local, franjas horarias consolidadas y ruteo inteligente de entrega.",
        elementsToReview: [
            "Tarjetas de características en Midnight Navy",
            "Descripciones técnicas en Outfit"
        ]
    },
    {
        id: "service-lowcost-pricing",
        page: "Servicio LowCost",
        componentName: "LowCostPricing",
        componentPath: "src/app/servicios/envios-lowcost/page.tsx",
        sectionTitle: "3. Esquema Tarifario LowCost",
        currentText: "Tarifas desde $3.000 Base con escala progresiva de ahorro a partir de 10, 25 y 50 bultos diarios.",
        elementsToReview: [
            "Cifras y escalas en Geist Mono",
            "Badges de ahorro en Bebas Neue"
        ]
    },
    {
        id: "service-lowcost-benefits",
        page: "Servicio LowCost",
        componentName: "LowCostBenefits",
        componentPath: "src/app/servicios/envios-lowcost/page.tsx",
        sectionTitle: "4. Beneficios para Negocios",
        currentText: "Ahorro operativo, gestión de cambios y logística inversa sin costos ocultos.",
        elementsToReview: [
            "Iconos amarillos (#FFF12E) sobre fondos navy"
        ]
    },
    {
        id: "service-lowcost-howitworks",
        page: "Servicio LowCost",
        componentName: "LowCostHowItWorks",
        componentPath: "src/app/servicios/envios-lowcost/page.tsx",
        sectionTitle: "5. Pasos del Flujo LowCost",
        currentText: "Flujo: 1. Cargás el pedido -> 2. Retiramos por la mañana -> 3. Entregamos en franja tarde coordinada.",
        elementsToReview: [
            "Pasos numerados con badges circulares",
            "Horarios en Geist Mono"
        ]
    },

    // ==========================================
    // SERVICIOS DETALLADOS - FLEX
    // ==========================================
    {
        id: "service-flex-hero",
        page: "Servicio Flex",
        componentName: "FlexHero",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "1. Mercado Libre Flex Hero",
        currentText: "Título: Mercado Envíos Flex Oficial\nCopete: Socio logístico habilitado para vendedores de Mercado Libre en Mar del Plata y Batán. Entregas Same-Day para cuidar tu reputación verde.",
        elementsToReview: [
            "Badge 'OFICIAL MELI · CORTE 15HS' en Bebas Neue",
            "Título Anton uppercase",
            "Botón de integración rápida"
        ]
    },
    {
        id: "service-flex-features",
        page: "Servicio Flex",
        componentName: "FlexFeatures",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "2. Características Flex",
        currentText: "Recolección diaria gratis en tu local, escaneo oficial de etiquetas QR y entregas antes de las 20:00 hs.",
        elementsToReview: [
            "Horarios de corte y SLA en Geist Mono",
            "Tarjetas Midnight Navy con bordes redondeados"
        ]
    },
    {
        id: "service-flex-benefits",
        page: "Servicio Flex",
        componentName: "FlexBenefits",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "3. Beneficios de Venta Flex",
        currentText: "Beneficios: Distintivo de entrega 'Llega Hoy', incremento de conversión en Mercado Libre y rendición garantizada.",
        elementsToReview: [
            "Métricas de conversión en Geist Mono",
            "Checks en Amarillo Neón"
        ]
    },
    {
        id: "service-flex-pricing",
        page: "Servicio Flex",
        componentName: "FlexPricing",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "4. Tarifas Flex Oficiales",
        currentText: "Tarifas homologadas por Mercado Libre para Mar del Plata. Reintegro automático de envíos.",
        elementsToReview: [
            "Zonificación tarifaria oficial",
            "Tipografía monoespaciada para valores monetarios"
        ]
    },
    {
        id: "service-flex-howitworks",
        page: "Servicio Flex",
        componentName: "FlexHowItWorks",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "5. Cronograma Diario Flex",
        currentText: "Horarios: Ventas hasta 15:00 hs -> Retiro 15:30 hs -> Reparto de tarde -> Cierre de entregas 20:00 hs.",
        elementsToReview: [
            "Línea de tiempo horaria en Geist Mono",
            "Etiquetas de estado en Bebas Neue"
        ]
    },
    {
        id: "service-flex-requirements",
        page: "Servicio Flex",
        componentName: "FlexRequirements",
        componentPath: "src/app/servicios/enviosflex/page.tsx",
        sectionTitle: "6. Requisitos para Vendedores",
        currentText: "Requisitos: Cuenta habilitada para Flex, etiqueta reglamentaria impresa y embalaje seguro apto para moto o utilitario.",
        elementsToReview: [
            "Checklist de requisitos con iconografía de seguridad"
        ]
    },

    // ==========================================
    // SERVICIOS DETALLADOS - EMPRENDEDORES (3PL)
    // ==========================================
    {
        id: "service-emp-hero",
        page: "Plan Emprendedores (3PL)",
        componentName: "EmprendedoresHero",
        componentPath: "src/app/servicios/plan-emprendedores/page.tsx",
        sectionTitle: "1. Logística 3PL & Fulfillment Hero",
        currentText: "Título: Logística 3PL & Centro de Distribución\nCopete: Almacenamiento, preparación de pedidos (picking & packing) y despacho inmediato desde nuestra base central en Friuli 1972.",
        elementsToReview: [
            "Badge 'LOGÍSTICA INTEGRAL · FRIULI 1972'",
            "Título Anton uppercase",
            "CTAs de cotización de depósito"
        ]
    },
    {
        id: "service-emp-features",
        page: "Plan Emprendedores (3PL)",
        componentName: "EmprendedoresFeatures",
        componentPath: "src/app/servicios/plan-emprendedores/page.tsx",
        sectionTitle: "2. Características de Almacén y Fulfillment",
        currentText: "Servicios: Depósito seguro en Chauvín, control de inventario por código de barras, empaque profesional y despacho Same-Day.",
        elementsToReview: [
            "Bento Grid de infraestructura",
            "Dirección física Friuli 1972 en Geist Mono"
        ]
    },
    {
        id: "service-emp-benefits",
        page: "Plan Emprendedores (3PL)",
        componentName: "EmprendedoresBenefits",
        componentPath: "src/app/servicios/plan-emprendedores/page.tsx",
        sectionTitle: "3. Ventajas para Escalar",
        currentText: "Eliminá costos fijos de alquiler, ahorrá horas de preparación de pedidos y despachá de manera automática.",
        elementsToReview: [
            "Tarjetas de ventajas con iluminación amarilla sutil"
        ]
    },
    {
        id: "service-emp-pricing",
        page: "Plan Emprendedores (3PL)",
        componentName: "EmprendedoresPricing",
        componentPath: "src/app/servicios/plan-emprendedores/page.tsx",
        sectionTitle: "4. Esquema de Tarifas 3PL",
        currentText: "Planes por metro cúbico / estantería ocupada + tarifa plana de empaque y despacho por bulto.",
        elementsToReview: [
            "Valores y unidades de volumen en Geist Mono"
        ]
    },

    // ==========================================
    // CONTACTO COMERCIAL
    // ==========================================
    {
        id: "contact-hero-comp",
        page: "Contacto Comercial",
        componentName: "ContactHero",
        componentPath: "src/app/contacto/page.tsx",
        sectionTitle: "1. Contacto Hero Header",
        currentText: "Título: Hablemos de Logística Comercial\nSubtítulo: ¿Querés optimizar las entregas de tu comercio o e-commerce? Armamos una propuesta a la medida de tu volumen en Mar del Plata.",
        elementsToReview: [
            "Título Anton masivo",
            "Subtítulo en Outfit",
            "Badge en Bebas Neue"
        ]
    },
    {
        id: "contact-form-comp",
        page: "Contacto Comercial",
        componentName: "ContactForm",
        componentPath: "src/app/contacto/page.tsx",
        sectionTitle: "2. Formulario de Asesoramiento",
        currentText: "Campos: Nombre y Apellido, Nombre del Comercio, Teléfono de contacto, Volumen estimado mensual, Consulta comercial.",
        elementsToReview: [
            "Inputs semitransparentes con bordes de 1px en blanco/20",
            "Foco iluminado en Amarillo Neón (#FFF12E)",
            "Botón de envío en Bebas Neue con rounded-full"
        ]
    },
    {
        id: "contact-info-comp",
        page: "Contacto Comercial",
        componentName: "ContactInfo",
        componentPath: "src/app/contacto/page.tsx",
        sectionTitle: "3. Ubicación y Horarios de Atención",
        currentText: "Dirección: Friuli 1972, Chauvín, Mar del Plata\nHorarios 2026: Lunes a Viernes 08:00 a 18:00 hs | Sábados 09:00 a 13:00 hs\nTeléfono: +54 223 660-2699\nCanal directo: WhatsApp Oficial.",
        elementsToReview: [
            "Dirección física Friuli 1972 en Geist Mono",
            "Horarios y teléfono (+54 223 660-2699) en Geist Mono",
            "Botón a WhatsApp (#25D366) con pill rounded-full"
        ]
    },

    // ==========================================
    // LEGALES
    // ==========================================
    {
        id: "privacidad-page-comp",
        page: "Legales (Privacidad)",
        componentName: "PoliticaPrivacidad",
        componentPath: "src/app/politica-de-privacidad/page.tsx",
        sectionTitle: "1. Políticas de Privacidad",
        currentText: "Título: Políticas de Privacidad y Tratamiento de Datos\nContenido: Cláusulas de confidencialidad y resguardo de datos para remitentes y destinatarios en la plataforma Envíos DosRuedas.",
        elementsToReview: [
            "Estructura tipográfica jerárquica (Anton / Outfit)",
            "Superficie clara Surface (#F8FAFC) con texto on-surface (#052C87) para alta legibilidad",
            "Bordes y contenedores rounded-2xl"
        ]
    },
    {
        id: "terminos-page-comp",
        page: "Legales (Términos)",
        componentName: "TerminosCondiciones",
        componentPath: "src/app/terminos-y-condiciones/page.tsx",
        sectionTitle: "1. Términos y Condiciones",
        currentText: "Título: Términos y Condiciones de Contratación Logística\nContenido: Regulaciones de pesos máximos, responsabilidades de cobertura, franjas horarias de corte y políticas de reintegro.",
        elementsToReview: [
            "Encabezados en Bebas Neue y cuerpo en Outfit",
            "Superficie de lectura en Surface (#F8FAFC) con on-surface (#052C87)",
            "Valores numéricos de límites y plazos en Geist Mono"
        ]
    }
];