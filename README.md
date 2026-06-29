# Zodiac Fighters / Zodiac Road

Videojuego de navegador basado en los 12 animales del zodiaco chino. Estilo papel/origami,
todo client-side (HTML + Canvas 2D + WebAudio), instalable como app (PWA) y jugable en movil y PC.

Estudio: **WONEJO MALO Entertainment**.

## Como jugar

Abre `index.html` en el navegador. No requiere instalacion ni servidor.

- **`index.html`** — Juego de pelea completo: titulo, seleccion, combate con especiales,
  Torres (Bronce/Plata/Oro/Legendaria), Target Test, hub de Espiritus, tienda, misiones diarias,
  racha, musica chiptune, modo libre/entrenamiento, combos y cinematicas.
- **`aventura-prototipo.html`** — Prototipo del nuevo modo RPG por turnos (estilo Mario & Luigi):
  overworld cenital, batallas a tiempo, ojos elementales combinables, biblioteca de espiritus.
- **`cartas.html`** — Album imprimible de cartas coleccionables.

## Estructura

```
index.html              Juego de pelea (principal)
aventura-prototipo.html Prototipo RPG por turnos
cartas.html             Album de cartas imprimible
spirits-data.js         Catalogo de espiritus / cartas coleccionables
manifest.json, sw.js    PWA (app instalable + offline)
icon-192.png, icon-512.png  Iconos de la app
art/                    Sprites de los peleadores (idle/ready/hit/ko)
  cine/                 Cinematicas en video (.mp4)
historia/               Modo historia (novela visual): motor vn-engine + guiones por animal
docs-diseno/            PDFs de diseno (premortem, decisiones)
*.md                    Documentos de diseno, roadmap y guias de produccion
```

## Desplegar en GitHub Pages

1. Sube todo el contenido de esta carpeta al repositorio (`Add file -> Upload files` o `git push`).
2. En el repo: **Settings -> Pages -> Branch: main / root -> Save**.
3. En ~1 minuto el juego queda en vivo en `https://<usuario>.github.io/<repo>/`.

Repo actual: `github.com/ferb1215-ux/zodiac` -> https://ferb1215-ux.github.io/zodiac/

## Estado y pendientes

- Sprites pixel art listos para 8 animales; faltan buey, conejo, cabra y perro.
- Modo historia: Rata completa; resto pendiente.
- Pivote en curso hacia el modo RPG (`aventura-prototipo.html`).
- Cinematicas IA: se pre-generan y se colocan en `art/cine/` como `<id>-super.mp4` / `<id>-ex.mp4`.

Ver `ZODIAC-FIGHTERS-ROADMAP.md` y `HISTORIA-Y-MUNDO.md` para el detalle.
