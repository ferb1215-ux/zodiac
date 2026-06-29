# 🎬 Cinemáticas con Pollo AI — Guía

Estás en el lugar correcto: **Creative Studio** (la caja "Enter your idea to generate").

## Ajustes para la PRUEBA (Rata)
En la barra de abajo de la caja de generación, deja/pon así:

| Control | Ponlo en | Por qué |
|---|---|---|
| Tipo | **Video** | queremos un clip |
| Modo | **Text/Image to Video** | permite subir el sprite (o solo texto) |
| Modelo | **Pollo 2.0** | barato para probar (≈10 créditos). Luego Kling para calidad |
| Duración | **5s** | así está el sistema |
| Resolución | **480p** (prueba) → 720p para la final | 480p gasta menos |
| Relación | **16:9** | el juego es horizontal — NO la cambies |

> Tienes 600 créditos: de sobra para varias pruebas.

## Opción A (recomendada para la prueba) — solo TEXTO
Más rápido y sin que se vea borroso. NO subas imagen. Pega este prompt:

**Prompt (inglés — estos modelos rinden mejor en inglés):**
```
Epic cinematic finishing move of a small cunning rat warrior wearing a blue hoodie,
papercraft origami art style like Paper Mario / Tearaway. He dashes forward and
unleashes a devastating final strike. A massive swirl of glowing blue water energy
erupts around him, splashes and ripples frozen in dramatic slow motion. Fast push-in
camera, low angle, rim lighting, dark stormy Asian-mythology temple background, visible
paper folds and textures. Intense and powerful. 5 seconds.
```
**Campo "Negative" (si aparece):** `blurry, low quality, distorted anatomy, extra limbs, text, watermark, photorealistic human`

## Opción B — con IMAGEN (más fiel al personaje)
Haz clic en el **"+"** de la caja y sube este archivo de tu Mac:
```
Documents/Claude/Projects/videojuego/art/rata-ready.png
```
Usa el mismo prompt de arriba. Nota: el sprite es chico, así que puede verse un poco tosco al ampliarse; por eso para la 1ª prueba conviene la Opción A.

## Cuando termine de generar
1. Descarga el video (botón de descargar del clip).
2. Renómbralo EXACTAMENTE: **`rata-super.mp4`**
3. Ponlo en esta carpeta (ya la creé):
   ```
   Documents/Claude/Projects/videojuego/art/cine/rata-super.mp4
   ```
4. Avísame y probamos que se reproduzca dentro de la pelea al hacer el súper de la Rata.

---

## Para los otros personajes — DESCRIPCIÓN EXACTA por color
Para que la cinemática coincida con el personaje del juego, usa esta **plantilla** y reemplaza `{APARIENCIA}` y `{ENERGÍA}` con la fila de cada animal. Archivo: `<animal>-super.mp4` (y opcional `<animal>-ex.mp4`).

**Plantilla (inglés):**
```
Epic cinematic finishing move of {APARIENCIA}, papercraft origami art style like Paper
Mario / Tearaway. It dashes forward and unleashes a devastating final strike. A massive
swirl of glowing {ENERGÍA} erupts around it, frozen in dramatic slow motion. Fast push-in
camera, low angle, rim lighting, dark stormy Asian-mythology temple background, visible
paper folds and textures. Intense and powerful. 5 seconds.
```

### Personajes CON arte (descripción tomada de su sprite)
| Animal | archivo | {APARIENCIA} | {ENERGÍA} |
|---|---|---|---|
| 🐀 Rata | rata-super.mp4 | a grey-and-white rat warrior wearing a blue hoodie and grey trousers, long pink tail | blue water energy |
| 🐅 Tigre | tigre-super.mp4 | a fierce orange tiger with black stripes and a white belly, wearing a red shirt | red and orange fire energy |
| 🐉 Dragón | dragon-super.mp4 | a green Chinese dragon with golden antlers and mane, wearing an orange robe | golden-red fire and wind energy |
| 🐍 Serpiente | serpiente-super.mp4 | a green coiled serpent with a red forked tongue, no clothes | purple venom and lightning energy |
| 🐎 Caballo | caballo-super.mp4 | a horse fighter with a white mane and tail, wearing a navy-blue hoodie and brown pants | pale green wind energy |
| 🐒 Mono | mono-super.mp4 | a tan monkey wearing a mustard-yellow shirt and brown pants, with a long tail | green wood and leaf energy |
| 🐓 Gallo | gallo-super.mp4 | a white rooster with a red comb and orange beak, wearing a red shirt | silver and gold metallic light energy |
| 🐖 Cerdo | cerdo-super.mp4 | a pink pig with small tusks wearing a green hoodie | brown earth and blue water energy |

### Personajes SIN arte todavía (buey, conejo, cabra, perro)
Estos 4 aún no tienen sprite (en el juego salen con emoji). Cuando hagamos su arte con IA, defino su apariencia exacta. Por ahora, si quieres adelantar la cinemática, usa una descripción genérica:

| Animal | archivo | {APARIENCIA} | {ENERGÍA} |
|---|---|---|---|
| 🐂 Buey | buey-super.mp4 | a powerful ox warrior with large curved horns | ochre earth energy |
| 🐇 Conejo | conejo-super.mp4 | a swift rabbit warrior with long ears | pale green wind energy |
| 🐐 Cabra | cabra-super.mp4 | a sturdy mountain goat with curved horns | grey rock and earth energy |
| 🐕 Perro | perro-super.mp4 | a loyal dog warrior, alert and brave | steel-grey metal energy |

---

# 🎬🎬 Cinemáticas de HISTORIA (para el RPG `aventura-prototipo.html`)

El prototipo RPG ya está conectado: **si existe el archivo de video lo reproduce; si no, usa una cinemática dibujada de respaldo.** Solo tienes que generar el video en Pollo y soltarlo con el nombre correcto en `art/cine/`.

| Momento | Archivo | Cuándo se ve |
|---|---|---|
| **Intro** (presenta la historia) | `art/cine/intro.mp4` | al empezar el juego |
| Entrada a la Aldea de Jade | `art/cine/zona-aldea.mp4` | (cuando montemos esa zona) |
| Revelación del Palacio (el giro) | `art/cine/giro-palacio.mp4` | clímax |

## Prompt para la INTRO (genera y guarda como `intro.mp4`)
Ajustes en Pollo: **Video · Text/Image to Video · 5s (o 10s) · 720p · 16:9.**

```
Cinematic storybook intro, ancient Chinese mythology. A glowing jade palace at night;
the Jade Emperor, a regal golden figure on a throne, raises his hand and announces a
great race. Twelve zodiac animals (rat, ox, tiger, rabbit, dragon, snake, horse, goat,
monkey, rooster, dog, pig) gather at the starting line, lanterns and mist around them.
The mood starts hopeful but turns subtly ominous, as if the Emperor hides a secret.
Papercraft / painted storybook style, warm jade and gold palette, slow cinematic camera. 5 seconds.
```
Negative (si aparece): `blurry, low quality, distorted anatomy, text, watermark, modern objects`

## Plantilla para cinemáticas de zona/giro
```
Cinematic {momento}, ancient Chinese mythology, papercraft/painted storybook style,
{descripción de la escena y personajes}, {emoción}, jade and gold palette, slow camera. 5 seconds.
```
Guárdalas con el nombre de la tabla (`zona-aldea.mp4`, `giro-palacio.mp4`, …).

> Mientras no exista el .mp4, el juego muestra la versión dibujada (texto + retratos). Puedes probar la intro dibujada ya mismo.

---

## Más adelante: automatizar con la API
Pollo tiene API (docs.pollo.ai, una clave). Con tu clave podríamos hacer un script que genere los 12 de una. Igual es pre-render (no en vivo). Cuando quieras, lo montamos.
