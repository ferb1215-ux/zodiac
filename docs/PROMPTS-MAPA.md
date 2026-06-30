# Mapamundi de "Vuelta al Mundo" — prompt (Nano Banana)

Genera **1 imagen** y guárdala en **`art/world/world.png`**. El juego la usa de fondo del mapa; si no existe, dibuja un mapa por código (el que ves ahora). Los focos de las ciudades los pone el código **encima**, así que la imagen debe ser SOLO el mapa, **sin marcas ni texto**.

**MUY IMPORTANTE — para que los focos caigan en su lugar:**
- **Proyección plana / equirectangular** (mapamundi rectangular clásico, el mundo entero de un vistazo).
- **Relación 2:1 apaisada** (ej. 2048×1024).
- El mundo debe **llenar todo el cuadro** (orillas del mapa = bordes de la imagen), sin marco ni márgenes.
- **Norte arriba**, centrado en el meridiano 0 (América a la izquierda, Asia a la derecha, como un mapa normal).
- **Sin nombres, sin texto, sin pines, sin líneas de cuadrícula, sin rosa de los vientos.**

**Prompt:**
```
Pixel art world map, retro 16-bit SNES JRPG world-map style, crisp clean pixels with bold dark outlines, flat cel shading and a limited vibrant palette. Full equirectangular (flat) projection of the whole Earth, north up, centered on the prime meridian, the map filling the entire frame edge to edge. Green and tan continents with soft mountain and forest texture on a deep blue ocean with subtle lighter coastal shallows and tiny wave dashes. Cohesive, slightly nighttime adventurous mood. Landscape 2:1 aspect ratio. No country borders, no labels, no text, no letters, no numbers, no pins or markers, no grid lines, no compass, no UI, no watermark, no frame.
```

> Tip: si quieres que combine con el menú (azul noche), agrega al final: *"dark navy blue ocean, cool moonlit palette"*.

Cuando la tengas en `art/world/world.png`, recarga el juego (Cmd+Shift+R) y el mapa feo se reemplaza por el tuyo. Los 24 focos siguen cayendo en su ciudad porque están posicionados por coordenadas reales (lat/long).
