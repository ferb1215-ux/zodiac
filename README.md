# 🐉 Zodiac Fighters

Juego de pelea 2D con los 12 animales del zodiaco chino. Corre 100% en el navegador (PC y móvil), sin instalar nada, e instalable como app (PWA). Hecho por **WONEJO MALO Entertainment**.

👉 **Jugar:** abre `index.html` (o publícalo en GitHub Pages).

## Modos de juego
- 🌍 **Vuelta al Mundo** — viaja por un mapamundi, derrota al zodiaco en 24 ciudades reales (cada una con su escenario, bandera y dificultad) y conquista el mundo.
- ⚔️ **Pelea vs CPU** — duelo 1 vs 1.
- 🥊 **Modo Libre** — práctica con muñeco.
- 🏯 **Torres** — escala rivales hasta el jefe.
- 🎯 **Target Test** — rompe blancos a contrarreloj.
- 📖 **Modo Historia** — el camino de cada animal (Rata y Buey disponibles).
- ✨ **Espíritus** — álbum de cartas coleccionables, máquina y tienda.

## Controles
- Moverse: flechas / joystick.  Saltar: ⤒.  Golpe: **A**.  Poder: **B**.  Agarrar: ✊.  Especial: ✦.
- En Vuelta al Mundo se navega TODO con flechas (Enter elige, Esc vuelve).

## Estructura
- `index.html` — el juego completo (Canvas + WebAudio).
- `spirits-data.js`, `spirits-lore.js` — catálogo y textos de las cartas.
- `cartas.html` — álbum imprimible.
- `art/` — imágenes: `cartas/`, `menu/`, `stages/` (fondos de pelea), `world/` (mapamundi), `cine/`.
- `historia/` — motor de novela visual + guiones.
- `manifest.json`, `sw.js`, `icon-*.png` — soporte PWA (instalable).
- `docs/` — prompts para generar más arte (fondos, mapa, menú, cartas) y el código del álbum.

## Publicar en GitHub Pages
1. Sube TODO el contenido de esta carpeta al repositorio (la raíz debe tener `index.html`).
2. En el repo: **Settings → Pages → Branch: main / (root) → Save**.
3. En ~1 minuto queda en línea en `https://<usuario>.github.io/<repo>/`.

> Para agregar arte que falta (fondo `art/stages/fuji.png`, mapa, cartas) usa los prompts en `docs/`.
