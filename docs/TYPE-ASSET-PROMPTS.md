# Prompts de recursos tipográficos · Envíos DosRuedas

Tercer banco (ver `IMAGE-PROMPTS.md` y `BRAND-ASSET-PROMPTS.md`). Imágenes que son **sólo texto**: nombres de servicios, sellos, cifras, frases de marca, parches y etiquetas, con efecto (3D, extruido, sticker, neón, chrome, tinta).

## Antes de generar: cuándo conviene el prompt y cuándo la fuente real

- Los modelos (Gemini / Nano Banana, Flux, Midjourney) rinden texto de forma poco fiable: **una frase por imagen, ≤ 25 caracteres**, pedirla entre comillas al principio del prompt, esperar una interpretación de la fuente (no Anton exacto) y revisar las tildes (ENVÍOS, COTIZÁ, DÍA suelen perderlas).
- Si el texto debe verse **exactamente como en el sitio** (mismo Anton/Bebas, mismo tracking), no lo generes: componelo con las fuentes reales en HTML/CSS, Figma o Canva y exportá PNG/SVG. Es nítido, editable y sin errores ortográficos.
- Usá los prompts de abajo para lo que la fuente sola no da: volumen 3D, extrusión, materiales (chrome, neón, goma, bordado), stickers troquelados, sellos de tinta.
- Si una generación cambia letras o tildes, regenerá con el mismo ancla o corregí el texto en post sobre el mismo material.

## Ancla tipográfica (pegar al inicio de cada prompt)

> Type anchor: bold condensed uppercase sans-serif lettering, heavy weight, tight letter-spacing, in the Envíos DosRuedas brand palette: deep blue (#0636A5), electric yellow (#FFEC01), ink (#00277C) and white. Render the quoted text exactly, on a single line, with no other words, letters or logos anywhere in the image. Clean pure-white or deep-blue ground as specified, centred composition with generous margins for cropping.

## Tabla resumen

| # | Familia · texto | Ratio · res. | Archivo |
| :-- | :-- | :-- | :-- |
| T1 | Nombres de servicio · "ENVÍOS EXPRESS" | 3:2 · 2K | `type-envios-express-1536x1024.png` |
| T2 | Nombres de servicio · "ENVÍOS LOWCOST" | 3:2 · 2K | `type-envios-lowcost-1536x1024.png` |
| T3 | Nombres de servicio · "ENVÍOS FLEX" | 3:2 · 2K | `type-envios-flex-1536x1024.png` |
| T4 | Nombres de servicio · "PLAN EMPRENDEDORES" | 3:2 · 2K | `type-plan-emprendedores-1536x1024.png` |
| T5 | Nombres de servicio · "E-COMMERCE & 3PL" | 3:2 · 2K | `type-ecommerce-3pl-1536x1024.png` |
| T6 | Sellos · "SAME DAY" | 1:1 · 1K | `type-sello-same-day-1024.png` |
| T7 | Sellos · "NEXT DAY" | 1:1 · 1K | `type-sello-next-day-1024.png` |
| T8 | Sellos · "24 HS" | 1:1 · 1K | `type-sello-24hs-1024.png` |
| T9 | Sellos · "SIN CARGO" | 1:1 · 1K | `type-sello-sin-cargo-1024.png` |
| T10 | Frases hero · "HOY MISMO" | 16:9 · 2K | `type-hoy-mismo-1920x1080.png` |
| T11 | Frases hero · "COTIZÁ TU ENVÍO" | 16:9 · 2K | `type-cotiza-tu-envio-1920x1080.png` |
| T12 | Frases hero · "ENTREGA EN EL DÍA" | 16:9 · 2K | `type-entrega-en-el-dia-1920x1080.png` |
| T13 | Parches y stickers · "MDQ" | 1:1 · 1K | `type-parche-mdq-1024.png` |
| T14 | Parches y stickers · "FRIULI 1972" | 3:2 · 1K | `type-sticker-friuli-1972-1536x1024.png` |
| T15 | Parches y stickers · "DOSRUEDAS" | 3:2 · 2K | `type-wordmark-dosruedas-1536x1024.png` |
| T16 | Cifras · "+50K" | 1:1 · 2K | `type-cifra-50k-1024.png` |
| T17 | Cifras · "0" | 1:1 · 2K | `type-cifra-cero-1024.png` |
| T18 | Cifras · "+7 AÑOS" | 1:1 · 2K | `type-cifra-7-anos-1024.png` |
| T19 | Embalaje · "FRÁGIL" | 1:1 · 1K | `type-sello-fragil-1024.png` |
| T20 | Embalaje · "ESTE LADO ARRIBA" | 1:1 · 1K | `type-sello-este-lado-arriba-1024.png` |
| T21 | Social · "RUTEO ACTIVO" | 3:2 · 1K | `type-badge-ruteo-activo-1536x1024.png` |
| T22 | Social · "ENTREGADO" | 3:2 · 1K | `type-badge-entregado-1536x1024.png` |
| T23 | Social · "#RUTASMDQ" | 1:1 · 1K | `type-hashtag-rutasmdq-1024.png` |

## T1-T5. Nombres de servicio (lettering 3D extruido, para heros y tarjetas)

Misma construcción para los cinco; cambia el texto y el color de cara. **Alt:** "Nombre del servicio [X] en letras 3D de la marca".

### T1. "ENVÍOS EXPRESS"
> [Ancla tipográfica] The text "ENVÍOS EXPRESS" as chunky 3D extruded lettering, yellow glossy front faces with a deep-blue extrusion about one letter-height deep, viewed from a slight three-quarter angle from the left so the extrusion shows, resting on a white ground with a soft contact shadow and a faint yellow reflection. Upper-left studio light with a crisp highlight on the top edges. Glossy 3D render, high resolution.

### T2. "ENVÍOS LOWCOST"
> [Ancla tipográfica] The text "ENVÍOS LOWCOST" as chunky 3D extruded lettering, white matte front faces with a deep-blue extrusion, a thin yellow outline around each letter face, slight three-quarter angle from the left, on a white ground with a soft contact shadow. Upper-left studio light. Glossy 3D render, high resolution.

### T3. "ENVÍOS FLEX"
> [Ancla tipográfica] The text "ENVÍOS FLEX" as chunky 3D extruded lettering, deep-blue glossy front faces with a yellow extrusion, a small yellow lightning bolt replacing the dot of no letter and sitting after the last letter, slight three-quarter angle, on a white ground with a soft contact shadow. Upper-left studio light. Glossy 3D render, high resolution.

### T4. "PLAN EMPRENDEDORES"
> [Ancla tipográfica] The text "PLAN EMPRENDEDORES" as chunky 3D extruded lettering, kraft-cardboard textured front faces with a deep-blue extrusion and a yellow tape stripe crossing the lower third of the letters, slight three-quarter angle, on a white ground with a soft contact shadow. Upper-left studio light. Glossy 3D render, high resolution.

### T5. "E-COMMERCE & 3PL"
> [Ancla tipográfica] The text "E-COMMERCE & 3PL" as chunky 3D extruded lettering, yellow front faces with a deep-blue extrusion and a subtle grid of tiny QR-like squares embossed on the letter faces, slight three-quarter angle, on a white ground with a soft contact shadow. Upper-left studio light. Glossy 3D render, high resolution.

## T6-T9. Sellos (badges circulares para tarjetas y redes)

**Alt:** "Sello circular de la marca con la leyenda [X]".

### T6. "SAME DAY"
> [Ancla tipográfica] A circular glossy badge in deep blue with a yellow outer ring, the text "SAME DAY" curved along the top arc in yellow and a bold yellow stopwatch silhouette at the centre, a subtle bevel and a faint metallic edge. Straight-on view, badge centred on white, soft shadow. Upper-left studio light. Glossy 3D render, high resolution.

### T7. "NEXT DAY"
> [Ancla tipográfica] A circular glossy badge in electric yellow with a deep-blue outer ring, the text "NEXT DAY" straight across the centre in deep blue, a thin blue sunrise arc above the text, subtle bevel. Straight-on view, centred on white, soft shadow. Upper-left studio light. Glossy 3D render, high resolution.

### T8. "24 HS"
> [Ancla tipográfica] A circular badge in white with a thick deep-blue ring and a yellow inner ring, the text "24 HS" very large in deep blue filling the centre, a small yellow clock hand mark below the text. Straight-on view, centred on white, soft shadow. Clean 3D render, high resolution.

### T9. "SIN CARGO"
> [Ancla tipográfica] A rounded rectangular tag in deep blue hanging from a short yellow string, the text "SIN CARGO" in yellow across the tag, a small punched hole at the top, slight tilt. Centred on white, soft shadow. Upper-left studio light. Glossy 3D render, high resolution.

## T10-T12. Frases hero (lettering grande sobre azul, para heros y stories)

**Alt:** "Frase [X] en letras amarillas grandes sobre fondo azul".

### T10. "HOY MISMO"
> [Ancla tipográfica] The text "HOY MISMO" in huge electric-yellow letters spanning the frame on a deep-blue ground (#00277C), with a horizontal motion blur trailing to the left of each letter and two thin yellow speed lines, the letters themselves sharp. Wide 16:9 composition, text centred slightly above the middle, empty space below for a subtitle. Flat graphic style with a subtle glow, high resolution.

### T11. "COTIZÁ TU ENVÍO"
> [Ancla tipográfica] The text "COTIZÁ TU ENVÍO" in large white letters with a yellow drop-shadow offset to the lower right, on a deep-blue ground with a faint fine white grid, a small yellow arrow mark after the last letter. Wide 16:9 composition, text centred, generous margins. Flat graphic style, high resolution.

### T12. "ENTREGA EN EL DÍA"
> [Ancla tipográfica] The text "ENTREGA EN EL DÍA" in large electric-yellow letters on a deep-blue ground, the letters built from glossy rounded tubes like a neon sign, gently glowing, mounted on a subtle darker blue panel. Wide 16:9 composition, text centred. Soft glow lighting from the letters themselves, high resolution.

## T13-T15. Parches y stickers (redes, merchandising, footer)

### T13. "MDQ" (parche bordado)
**Alt:** "Parche bordado circular con las letras MDQ".
> [Ancla tipográfica] A round embroidered fabric patch with a deep-blue twill base, a thick yellow merrowed border and the text "MDQ" stitched in bold yellow thread across the centre, visible thread texture and slight puff. Straight-on view, patch centred on white, soft shadow. Soft studio light from the upper left. Photorealistic macro render, high resolution.

### T14. "FRIULI 1972" (sticker troquelado)
**Alt:** "Sticker troquelado con el texto FRIULI 1972".
> [Ancla tipográfica] A die-cut vinyl sticker with a thick white border around the text "FRIULI 1972" set in deep blue on a yellow rounded pill, slight glossy sheen and a tiny curled corner, resting on white at a small angle. Centred, soft shadow. Upper-left studio light. Photorealistic render, high resolution.

### T15. "DOSRUEDAS" (wordmark)
**Alt:** "Wordmark DOSRUEDAS en letras condensadas azules con relleno amarillo".
> [Ancla tipográfica] The text "DOSRUEDAS" as a single-line wordmark in deep blue with the interior counters filled in electric yellow, letters slightly italic to suggest speed, a thin yellow underline that ends in a small circle like a wheel. Wide 3:2 composition, wordmark centred on white with generous margins. Flat vector-like graphic, crisp edges, high resolution.

## T16-T18. Cifras (métricas del sitio)

**Alt:** "Cifra [X] en números 3D de la marca".

### T16. "+50K"
> [Ancla tipográfica] The text "+50K" as giant chrome-like 3D numerals with a mirror finish reflecting a yellow and blue gradient environment, thick extrusion, standing on a white ground with a soft reflection. Straight-on with a slight low angle, centred. Studio lighting with a bright top highlight. Glossy 3D render, high resolution.

### T17. "0"
> [Ancla tipográfica] The text "0" as a single huge glossy deep-blue numeral with a yellow inner edge, a small yellow checkmark tucked inside its counter, standing on a white ground with a soft contact shadow. Straight-on, centred, generous margins. Upper-left studio light. Glossy 3D render, high resolution.

### T18. "+7 AÑOS"
> [Ancla tipográfica] The text "+7 AÑOS" as bold 3D lettering in electric yellow with a deep-blue extrusion, the numeral 7 noticeably larger than the word, on a white ground with a soft shadow. Slight three-quarter angle, centred. Upper-left studio light. Glossy 3D render, high resolution.

## T19-T20. Embalaje (sellos de tinta para cajas y fondos kraft)

### T19. "FRÁGIL"
**Alt:** "Sello de tinta azul con la palabra FRÁGIL sobre cartón kraft".
> [Ancla tipográfica] The text "FRÁGIL" stamped in deep-blue rubber-stamp ink on kraft cardboard, slightly uneven ink coverage with tiny gaps, framed by a rectangular stamped border with rounded corners and a small yellow-printed corner mark. Straight top-down view, stamp centred, kraft texture filling the frame. Flat even daylight. Photorealistic macro, high resolution.

### T20. "ESTE LADO ARRIBA"
**Alt:** "Sello de tinta con el texto ESTE LADO ARRIBA y dos flechas sobre cartón".
> [Ancla tipográfica] The text "ESTE LADO ARRIBA" stamped in deep-blue ink on kraft cardboard beneath two bold upward arrows, slightly distressed ink texture, a thin stamped border. Straight top-down view, centred, kraft texture filling the frame. Flat even daylight. Photorealistic macro, high resolution.

## T21-T23. Social (badges de estado y hashtag)

### T21. "RUTEO ACTIVO"
**Alt:** "Badge tipo pill con la leyenda RUTEO ACTIVO y un punto amarillo".
> [Ancla tipográfica] A glossy 3D pill-shaped badge in ink blue with a thin lighter-blue border, the text "RUTEO ACTIVO" in electric yellow and a small glowing yellow dot before the text, slight bevel, floating above white with a soft shadow. Straight-on, centred. Upper-left studio light with a glow on the dot. Glossy 3D render, high resolution.

### T22. "ENTREGADO"
**Alt:** "Badge tipo pill verde y blanco con la leyenda ENTREGADO y un tilde".
> [Ancla tipográfica] A glossy 3D pill-shaped badge in white with a deep-blue border, the text "ENTREGADO" in deep blue and a bold yellow circle with a blue checkmark before the text, slight bevel, floating above white with a soft shadow. Straight-on, centred. Upper-left studio light. Glossy 3D render, high resolution.

### T23. "#RUTASMDQ"
**Alt:** "Hashtag #RUTASMDQ en letras amarillas con relieve sobre azul".
> [Ancla tipográfica] The text "#RUTASMDQ" in large electric-yellow letters with a soft rubbery 3D relief on a deep-blue ground, a faint dotted route line weaving behind the letters. Square composition, text centred on one line, generous margins. Soft studio light from the upper left. Glossy 3D render, high resolution.

## Después de generar

1. Revisar letra por letra (tildes en ENVÍOS, COTIZÁ, DÍA, FRÁGIL, AÑOS): si el modelo las omitió, regenerar con el mismo ancla o corregir en post.
2. Recortar el fondo blanco a PNG transparente: `magick asset.png -fuzz 4% -transparent white asset-transparente.png`.
3. Para versiones exactas en Anton/Bebas (títulos del sitio, botones), componer en HTML/CSS o Figma con las fuentes del sistema y exportar SVG/PNG; guardar en `public/` con el nombre de la tabla y correr `/design-sync`.
