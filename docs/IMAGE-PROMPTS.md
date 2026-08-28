# Prompts de imágenes para enviosdosruedas.com

Prompts listos para generar (Gemini / Nano Banana, Midjourney, Flux, etc.) las imágenes que faltan en cada página del sitio. Siguen el brief de 6 componentes (sujeto, acción, contexto, composición, luz, estilo) en prosa, sin listas de palabras clave y sin texto dentro de la imagen (el texto va en el HTML). Los prompts están en inglés porque los modelos rinden mejor así; el alt y el nombre de archivo van en español.

## Ancla de marca (pegar al inicio de cada prompt)

> Brand anchor: Envíos DosRuedas, a last-mile courier company in Mar del Plata, Argentina. Riders wear a navy blue polo (#0636A5) with yellow (#FFEC01) trim and a yellow cap; the fleet is light-blue delivery scooters with a large square top box. Parcels are plain kraft cardboard boxes. Colour palette: deep blue and electric yellow against the coastal light of Mar del Plata (Atlantic beaches, the Rambla and Casino, tree-lined streets of Chauvín and Güemes). Logo-free surfaces (the logo is added in post).

Reglas: no pedir el logo ni texto legible (se agregan después); "ultra-realistic, high resolution" al final; sin negativos, describir lo que sí hay. Pedidos de referencia real (Casino Central, Torreón, lobos marinos del puerto) funcionan bien en Gemini.

## Ya existente en `public/` (no volver a generar)

`card_heroe_nueva.jpeg` (entrega en mano), `hero_express.webp` (rider con paquete, 512 px), `card_moto01.webp` (scooter con baúl, fondo blanco), `box_card.jpeg` (caja con sticker), `card_mapa.webp` (mapa isométrico), `fondo_express/lowcost/flex/emprendedores.webp` (ondas abstractas), `logo-envios-simplified.webp`.

## Tabla resumen

| # | Página · ubicación | Ratio · res. | Archivo destino |
| :-- | :-- | :-- | :-- |
| 1 | Home · hero | 16:9 · 2K | `home-hero-rider-rambla-1920x1080.webp` |
| 2 | Home · "Conectamos MDQ" | 4:3 · 2K | `home-cobertura-mar-del-plata-1600x1200.webp` |
| 3 | Home · industrias e-commerce | 4:3 · 2K | `home-ecommerce-retiro-local-1600x1200.webp` |
| 4 | Home · emprendedores / corporativo | 1:1 · 1K | `home-emprendedor-paquetes-1080x1080.webp` |
| 5 | Servicios Express · hero | 16:9 · 2K | `express-hero-rider-centro-1920x1080.webp` |
| 6 | Servicios Express · casos de uso | 4:3 · 2K | `express-documentacion-escribania-1600x1200.webp` |
| 7 | Servicios LowCost · hero | 16:9 · 2K | `lowcost-hero-hub-lotes-1920x1080.webp` |
| 8 | Servicios LowCost · cómo funciona | 1:1 · 1K | `lowcost-carga-baul-scooter-1080x1080.webp` |
| 9 | Envíos Flex · hero | 16:9 · 2K | `flex-hero-vendedor-etiquetas-1920x1080.webp` |
| 10 | Envíos Flex · beneficios | 4:3 · 2K | `flex-entrega-cliente-puerta-1600x1200.webp` |
| 11 | Plan Emprendedores 3PL · hero | 16:9 · 2K | `3pl-hero-deposito-friuli-1920x1080.webp` |
| 12 | Plan Emprendedores · DropOFF | 4:3 · 2K | `3pl-dropoff-mostrador-1600x1200.webp` |
| 13 | Cotizadores · lateral | 4:3 · 2K | `cotizador-rider-navegacion-1600x1200.webp` |
| 14 | Contacto · hero | 16:9 · 2K | `contacto-hero-coordinador-1920x1080.webp` |
| 15 | Sobre nosotros · equipo | 16:9 · 2K | `nosotros-equipo-flota-1920x1080.webp` |
| 16 | Sobre nosotros · historia 2019 | 4:3 · 2K | `nosotros-historia-2019-1600x1200.webp` |
| 17 | Sobre nosotros · hub | 4:3 · 2K | `nosotros-hub-friuli-1972-1600x1200.webp` |
| 18 | FAQ · hero | 16:9 · 2K | `faq-hero-cliente-recibe-1920x1080.webp` |
| 19 | Nuestras redes · social | 1:1 · 1K | `redes-rider-selfie-1080x1080.webp` |
| 20 | Legales · cabecera | 16:9 · 2K | `legales-hero-escritorio-1920x1080.webp` |
| 21 | OG / vista previa social (todas) | 16:9 · 1K | `og-envios-dosruedas-1200x630.webp` |

## Prompts

### 1. Home · hero
**Uso:** columna derecha del hero (hoy `card_mapa.webp`) o fondo full-bleed alternativo. **Alt:** "Mensajero de Envíos DosRuedas en scooter recorriendo la Rambla de Mar del Plata al atardecer".

> [Ancla de marca] A courier in his late twenties with tanned skin and a short dark beard, wearing the navy polo and yellow cap, rides a light-blue delivery scooter with a square top box along the Rambla of Mar del Plata, the Casino Central's stone facade and the Atlantic horizon behind him. He glances ahead with an easy, confident half-smile, one hand steady on the handlebar, the scooter leaning slightly into a gentle curve. Wide cinematic three-quarter tracking shot from the sidewalk, subject on the left third, long sea-breeze depth toward the right. Golden hour sun low over the ocean camera-right, warm rim light on the helmet and box, cool blue shadows on the pavement. Captured on a Sony A7R IV, 35mm f/2, Kodak Portra 400 tones with lifted shadows, ultra-realistic, high resolution.

### 2. Home · "Conectamos Mar del Plata de punta a punta"
**Uso:** imagen de la sección de visión / métricas (tarjeta oscura). **Alt:** "Vista elevada de Mar del Plata al anochecer con la costa y el tejido urbano".

> [Ancla de marca] An elevated late-dusk view of Mar del Plata from above the Chauvín neighbourhood looking toward the coast: a dense grid of low rooftops and tree-lined avenues rolling down to the curve of the beach and the dark blue Atlantic, the lighthouse and the port silhouettes on the far right. Street lamps and headlights trace the avenues in warm yellow lines, the sky graded from deep navy to a thin orange band at the horizon. Wide establishing shot from a drone at about 120 metres, horizon in the upper third, slight tilt down to show the streets. Blue hour ambient light with the last sun glow, crisp city lights. Shot on a DJI Mavic 3 with a 24mm equivalent lens, long exposure feel with clean detail, ultra-realistic, high resolution.

### 3. Home · industrias (E-Commerce y tiendas online)
**Uso:** panel derecho del bloque "Soluciones especiales para industrias". **Alt:** "Dueña de una tienda online entregando paquetes a un mensajero de Envíos DosRuedas en su local".

> [Ancla de marca] A woman in her thirties with curly dark hair and a linen apron, owner of a small clothing shop, hands a stack of three kraft parcels with printed shipping labels to a uniformed courier at her shop doorway; the courier steadies the boxes with both hands and nods. Behind them, wooden shelves with folded garments and a laptop open on the counter; the scooter is parked at the kerb outside, out of focus. Medium shot at eye level, both subjects in the centre-right, doorway framing the exchange. Soft overcast daylight from the street plus warm interior fill, gentle shadows. Canon EOS R5, 50mm f/2, natural documentary colour, ultra-realistic, high resolution.

### 4. Home · emprendedores y soluciones corporativas
**Uso:** tarjeta cuadrada (hoy `box_card.jpeg`). **Alt:** "Emprendedor preparando pedidos de e-commerce en su taller con cajas listas para el retiro".

> [Ancla de marca] A young man in a grey hoodie seals a kraft box with tape at a workbench in a small home workshop, a neat row of labelled parcels lined up beside him and a printer spitting out another shipping label. Plants, a bulletin board with order notes and a window with soft daylight. Square composition, slightly high angle over the bench, hands and boxes in the lower half, face turned down in concentration. Bright natural window light from the left, clean white balance. Fujifilm X-T5, 35mm f/1.4, crisp everyday-commerce feel, ultra-realistic, high resolution.

### 5. Servicios Express · hero
**Uso:** tarjeta del hero de la ficha Express (hoy `fondo_express.webp`). **Alt:** "Mensajero Express de Envíos DosRuedas esperando en un semáforo del centro de Mar del Plata".

> [Ancla de marca] A uniformed courier waits on his light-blue scooter at a traffic light on a busy downtown street of Mar del Plata, helmet on, one boot on the ground, checking a phone mounted on the handlebar; the top box is closed and clean. Pedestrians, a bus and old apartment facades with balconies fill the background. Low three-quarter angle from the kerb, scooter and rider filling the left two thirds, motion of traffic softly blurred on the right. Late-morning sun with hard shadows and bright reflections on the paint, deep blue sky. Sony A7 IV, 24-70mm at 35mm f/4, fast shutter, punchy commercial colour, ultra-realistic, high resolution.

### 6. Servicios Express · casos de uso (documentación)
**Uso:** imagen del bento "Envíos de documentación" (hoy `box_card.jpeg`). **Alt:** "Entrega de un sobre con documentación en una escribanía de Mar del Plata".

> [Ancla de marca] Close-up of a courier's hand, navy sleeve and yellow cuff visible, handing a sealed white document envelope across a polished wooden reception desk to a receptionist in a blazer who signs a delivery slip on a clipboard. A brass desk lamp, a stack of folders and a framed certificate softly out of focus behind. Tight medium shot from slightly above the desk, the envelope at the centre, shallow depth of field. Warm office lighting from the lamp with cool window fill from the side. Nikon Z8, 85mm f/1.8, restrained corporate palette, ultra-realistic, high resolution.

### 7. Servicios LowCost · hero
**Uso:** tarjeta del hero de la ficha LowCost. **Alt:** "Paquetes ordenados por ruta en el centro de distribución de Envíos DosRuedas".

> [Ancla de marca] Inside a compact distribution hub, dozens of kraft parcels are sorted into labelled plastic crates on steel shelving, each crate tagged with a coloured zone card; a courier in the navy polo scans a box with a handheld scanner while another loads a crate onto a hand trolley. Concrete floor, roll-up door open to daylight, a scooter visible outside. Wide shot along the shelving aisle, strong one-point perspective, workers mid-action in the middle distance. Cool fluorescent ceiling light balanced with warm daylight from the door. Canon EOS R6 II, 24mm f/4, clean logistics documentary look, ultra-realistic, high resolution.

### 8. Servicios LowCost · cómo funciona
**Uso:** paso "Retiro" o tarjeta cuadrada. **Alt:** "Mensajero cargando varios paquetes en el baúl de su scooter".

> [Ancla de marca] Square close-up of a courier's hands placing the last of four stacked kraft parcels into the open square top box of a light-blue scooter, foam divider visible, yellow cap brim just entering the top of the frame. Parked on a quiet residential street with a hedge and a tiled sidewalk. Top-down three-quarter angle, box lid open toward the camera, parcels filling the lower half. Bright soft daylight, mild shadows. Sony A7C II, 40mm f/2.5, tidy and practical mood, ultra-realistic, high resolution.

### 9. Envíos Flex · hero
**Uso:** tarjeta del hero de la ficha Flex. **Alt:** "Vendedor online preparando etiquetas de envío en su casa mientras el mensajero llega a retirar".

> [Ancla de marca] A seller in his forties sits at a kitchen table turned packing station, peeling a freshly printed marketplace shipping label onto a kraft box, a laptop with an orders list and a label printer beside him; through the open front door behind him, a uniformed courier with a yellow cap is arriving on foot with an empty crate. Domestic afternoon setting with plants and a coffee mug. Medium-wide shot at table height, seller in the foreground left, courier framed by the doorway on the right. Warm afternoon window light with a cooler doorway backlight. Canon EOS R5, 35mm f/2, honest small-business realism, ultra-realistic, high resolution.

### 10. Envíos Flex · beneficios (entrega en el día)
**Uso:** tarjeta de beneficios o sección "logística sin fricciones". **Alt:** "Clienta recibiendo su compra online en la puerta de casa el mismo día".

> [Ancla de marca] A smiling woman in her twenties in a hoodie receives a kraft parcel at the door of a low white house with a small front garden, the courier in navy and yellow holding out the box with both hands and a phone in his other pocket; the scooter waits at the kerb behind a hedge. Eye-level medium shot from the garden path, the handover centred, warm light on the customer's face. Late afternoon sun behind the courier, gentle lens flare, soft shadows. Sony A7R IV, 50mm f/1.8, warm optimistic tones, ultra-realistic, high resolution.

### 11. Plan Emprendedores 3PL · hero
**Uso:** tarjeta del hero de la ficha 3PL. **Alt:** "Depósito de Envíos DosRuedas en Friuli 1972 con estanterías de stock y picking por QR".

> [Ancla de marca] A bright small warehouse interior: three rows of grey steel shelving stocked with labelled kraft boxes and plastic bins, each bin with a printed QR tag; a worker in the navy polo scans a bin with a smartphone and places an item into an open box on a packing bench, tape gun and bubble wrap at hand. Epoxy floor, a whiteboard with a route list, natural light from high windows. Wide shot from the end of the aisle at chest height, worker in the middle ground, shelves converging toward the back wall. Even daylight mixed with cool LED strips. Nikon Z8, 24mm f/4, orderly professional atmosphere, ultra-realistic, high resolution.

### 12. Plan Emprendedores · opción DropOFF
**Uso:** plan "DropOFF (-20%)" o sección de beneficios. **Alt:** "Emprendedora dejando sus paquetes en el mostrador del depósito de Envíos DosRuedas".

> [Ancla de marca] A young entrepreneur with a tote bag sets three kraft parcels on a blue-painted reception counter inside the hub, while a staff member in the navy polo types the intake on a tablet and smiles; a yellow-and-blue wall behind the counter, a rack of outgoing crates to the side. Medium shot across the counter at eye level, parcels in the foreground, both faces in soft focus toward the centre. Warm interior lighting with a cool daylight edge from the entrance. Fujifilm X-T5, 33mm f/1.4, friendly service mood, ultra-realistic, high resolution.

### 13. Cotizadores · lateral (Express y LowCost)
**Uso:** tarjeta con mapa a la derecha del formulario (hoy `card_mapa.webp`). **Alt:** "Mensajero consultando la ruta en el teléfono antes de salir por Mar del Plata".

> [Ancla de marca] Over-the-shoulder shot of a courier seated on his scooter, helmet under his arm, looking at a phone that shows a street map with a highlighted route through the city grid, the blue top box and a kraft parcel in the foreground; a leafy avenue of Mar del Plata with a corner café blurred behind. Composition tight on the phone and hands in the lower right, rider's shoulder and cap framing the left. Overcast bright daylight, clean screen reflection. Sony A7 IV, 35mm f/1.8, practical tech-meets-street feel, ultra-realistic, high resolution.

### 14. Contacto · hero
**Uso:** fondo o tarjeta del hero de Contacto. **Alt:** "Coordinador logístico de Envíos DosRuedas respondiendo consultas por WhatsApp desde la base".

> [Ancla de marca] A logistics coordinator in his thirties wearing the navy polo sits at a desk in the hub office, headset on, smiling as he types a reply on a phone, a large monitor beside him showing a city map with pins; a window behind reveals the loading bay with two scooters. Medium shot from across the desk, subject slightly right of centre, monitor glow on his face. Cool screen light plus warm desk lamp, daylight from the bay. Canon EOS R6 II, 50mm f/2, approachable customer-service tone, ultra-realistic, high resolution.

### 15. Sobre nosotros · equipo en calle
**Uso:** hero o sección "Nuestro equipo en calle". **Alt:** "Equipo de repartidores de Envíos DosRuedas con su flota de scooters frente a la base de Chauvín".

> [Ancla de marca] Seven couriers of mixed ages and genders in matching navy polos and yellow caps stand relaxed beside a row of six light-blue scooters with square top boxes, parked in front of a low industrial building with a roll-up door on a tree-lined street in Chauvín, Mar del Plata; two of them lean on their bikes, one holds a helmet. Wide group shot at eye level, the line of scooters leading diagonally from the lower left to the group on the right. Soft late-afternoon sun from camera-left, long gentle shadows on the pavement. Sony A7R IV, 35mm f/4, warm team-portrait feel, ultra-realistic, high resolution.

### 16. Sobre nosotros · historia (2019)
**Uso:** hito 2019 de la línea de tiempo. **Alt:** "Primera scooter de reparto de Envíos DosRuedas en el centro de Mar del Plata en 2019".

> [Ancla de marca] A single older light-blue scooter with a scuffed square top box parked at the kerb of a downtown street in Mar del Plata, a young courier in a plain navy polo standing beside it holding one kraft parcel and looking hopefully up the street; classic tiled facades and a corner kiosk behind. Medium-wide shot from the sidewalk, slight nostalgic tilt, subject and bike centred. Hazy morning light with muted saturation, slightly faded colour like a 2019 phone photo. iPhone 11 look at 26mm, gentle film grain, ultra-realistic, high resolution.

### 17. Sobre nosotros · hub Friuli 1972
**Uso:** hito 2025 o tarjeta "Base operativa en MDQ". **Alt:** "Fachada del centro de distribución de Envíos DosRuedas en Friuli 1972, Chauvín".

> [Ancla de marca] Exterior of a compact single-storey distribution hub in a residential street of Chauvín: a wide blue roll-up door half open showing crates inside, a yellow band painted along the facade, two scooters parked under a small awning and a plane tree casting shade on the sidewalk. Straight-on architectural shot from across the street, facade centred, sky in the upper quarter. Mid-morning sun from the right, clean shadows, deep blue sky. Canon EOS R5, 24mm tilt-corrected verticals, ultra-realistic, high resolution.

### 18. FAQ · hero
**Uso:** tarjeta derecha del hero de Preguntas frecuentes. **Alt:** "Vecina de Mar del Plata recibiendo un paquete y consultando por WhatsApp".

> [Ancla de marca] A woman in her fifties at her apartment doorway holds a kraft parcel in one arm and her phone in the other hand, reading a delivery confirmation message with a pleased expression; the courier's yellow cap and navy shoulder are visible at the edge of the frame as he turns to leave. Warm hallway with a wooden door and a plant. Medium close-up at eye level, phone and parcel in the lower centre, soft focus on the hallway. Warm indoor light with cool daylight from a stairwell window. Sony A7C II, 55mm f/1.8, reassuring domestic mood, ultra-realistic, high resolution.

### 19. Nuestras redes · publicaciones
**Uso:** tarjetas de publicaciones o hero de Redes (cuadrado). **Alt:** "Selfie de un repartidor de Envíos DosRuedas en la costa de Mar del Plata".

> [Ancla de marca] Square phone selfie of a cheerful courier in the navy polo and yellow cap, helmet pushed back, giving a thumbs-up in front of his scooter on the coastal road with the sea, the Torreón del Monje and a bright blue sky behind him; a kraft parcel peeks from the open top box. Arm's-length angle slightly above eye level, face on the left third, scenery filling the right. Bright midday sun, high-key exposure, natural skin. iPhone 15 Pro front camera look, vivid social-media colour, ultra-realistic, high resolution.

### 20. Legales · cabecera (Términos y Privacidad)
**Uso:** franja discreta bajo el hero de Términos / Privacidad. **Alt:** "Escritorio con documentos, sello y un paquete de Envíos DosRuedas".

> [Ancla de marca] A calm flat-lay on a deep blue desk surface: a printed contract with a signature line, a black pen, a small kraft parcel with a blank white label, a yellow sticky note and a rubber stamp arranged with generous negative space on the left third for text overlay. Straight top-down composition, objects clustered on the right, soft shadows. Even diffused daylight from the upper left, no glare. Canon EOS R5, 50mm macro f/5.6, minimal corporate still life, ultra-realistic, high resolution.

### 21. OG / vista previa social (plantilla para todas las páginas)
**Uso:** `og:image` 1200×630; el título de cada página se superpone después en el tercio izquierdo. **Alt:** "Envíos DosRuedas, mensajería y logística en Mar del Plata".

> [Ancla de marca] A uniformed courier on a light-blue scooter with a square top box rides toward the camera along a bright coastal avenue of Mar del Plata, palm trees and the sea on the right, the left half of the frame kept as clean deep-blue sky and road for a text overlay. Low wide-angle three-quarter shot, rider on the right third, strong diagonal of the road. Clear midday light, saturated blue and yellow accents, sharp detail on the rider. Sony A7R IV, 24mm f/5.6, bold advertising look, ultra-realistic, high resolution.

## Después de generar (checklist SEO)

1. Convertir a WebP y ajustar tamaño: `magick salida.png -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 82 nombre-1920x1080.webp` (héroes < 200 KB; tarjetas < 100 KB).
2. Nombrar con la tabla de arriba y guardar en `public/` (el build del design-sync las incorpora al DS automáticamente).
3. Usar el alt indicado; agregar `width`/`height` en el `<img>` para evitar CLS.
4. OG: `<meta property="og:image" content="https://www.enviosdosruedas.com/og-envios-dosruedas-1200x630.webp">`, `og:image:width` 1200, `og:image:height` 630, `og:image:alt`.
5. Schema `ImageObject` en el JSON-LD de LocalBusiness para el hero y el OG.
6. Sumar el logo y el texto en post (Figma, Canva o Claude Design), nunca en el prompt.
