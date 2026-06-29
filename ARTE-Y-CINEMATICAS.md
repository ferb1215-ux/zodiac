# 🎬 Zodiac Road — Estilo unificado, tráiler e intro

Objetivo: que **todas** las animaciones (tráiler + intro + cinemáticas de zona) se vean del **mismo mundo**. Lo más importante es fijar **un estilo** y repetirlo en cada prompt.

---

## 1. EL ESTILO (lo que mantiene todo igual)

**Estilo elegido (recomendado):** *libro ilustrado chino pintado a mano* — animales del zodiaco **chibi** (cabezas grandes, ojos expresivos), paleta **jade + oro**, contornos de tinta, texturas de **papel de arroz / pergamino**, luz cinematográfica suave. Es tierno (encaja con el tono Mario & Luigi) y a la vez épico para los momentos de palacio.

### ⭐ PREFIJO DE ESTILO (pégalo al INICIO de CADA prompt de Pollo)
```
2D hand-painted Chinese storybook animation, cute chibi zodiac animals with big heads and
expressive eyes, warm jade-green and gold color palette, soft ink outlines, rice-paper and
scroll textures, painterly cinematic lighting, gentle camera motion, consistent character design,
```
> Si algún día cambiamos de estilo, **solo se cambia este prefijo** y todo se mantiene coherente.

### 🔑 Truco de CONSISTENCIA en Pollo (clave para que no cambien los personajes)
1. **Primero** genera UNA imagen de referencia (texto→imagen, 4 créditos): los 12 animales en este estilo, o al menos **Rata 🐀 y Buey 🐂**. Guárdala.
2. Para cada cinemática usa **Imagen→Video** subiendo esa referencia + el prefijo de estilo. Así los personajes se ven iguales en todos los clips.
3. Mantén siempre las mismas palabras de paleta/luz (las del prefijo). No mezcles estilos (nada de "realista", "3D", "foto").

---

## 2. TRÁILER "COMING SOON" (lo primero)

**Idea (la mejor para enganchar):** un teaser misterioso y épico que presenta el mundo, insinúa que hay un secreto y termina con el logo. ~10–15 s (3 tomas de 5 s que unes).

**Guion por tomas (cada una = un clip de Pollo, todas con el PREFIJO):**

**Toma 1 — El pergamino**
```
[PREFIJO] a closed golden scroll floating in darkness slowly unrolls, glowing ink blooms
outward revealing a misty zodiac world, lanterns igniting, sense of an ancient legend awakening. 5 seconds.
```
**Toma 2 — El palacio y las trompetas**
```
[PREFIJO] a majestic jade-and-gold imperial palace at night lighting up with lanterns,
royal heralds blowing long trumpets, golden sound-waves rippling across the sky, epic and grand. 5 seconds.
```
**Toma 3 — Los doce + el secreto + logo**
```
[PREFIJO] quick montage of twelve zodiac animals' eyes lighting up one by one in the dark
(rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, pig), then a flicker
of ominous purple energy behind a golden emperor silhouette; end on elegant gold calligraphy
title "ZODIAC ROAD" with the words "COMING SOON". 5 seconds.
```
Archivo sugerido: `trailer.mp4` (o las 3 tomas unidas en un editor). Música épica + trompetas.

---

## 3. INTRO DEL JUEGO (tu secuencia)

Orden narrativo que pediste: **convocatoria → castillo/trompetas → plaza → el encargo.** Son 4 tomas (clips), todas con el PREFIJO. Se guardan como `intro.mp4` (unidas) o por partes `intro-1.mp4`…`intro-4.mp4`.

**Toma 1 — La Convocatoria** (llaman a los 12)
```
[PREFIJO] a golden horn-call and shimmering light sweep across the land; in different homes,
twelve cute zodiac animals look up, summoned — the rat in a hole, the ox in a field, the tiger on a
cliff, etc.; they rise and begin to travel toward a distant glowing palace. 5 seconds.
```
**Toma 2 — El Castillo y las trompetas**
```
[PREFIJO] grand reveal of the Jade Emperor's palace on a mountain; royal heralds blow trumpets
from the towers; banners of the zodiac unfurl; a royal proclamation is about to begin, solemn and grand. 5 seconds.
```
**Toma 3 — La Plaza** (los animales escuchan)
```
[PREFIJO] twelve zodiac animals gather in a great plaza with the jade palace behind them,
surrounded by a crowd of smaller creatures, all looking up expectantly toward a balcony,
waiting for the emperor to speak. 5 seconds.
```
**Toma 4 — El Encargo** (la misión)
```
[PREFIJO] a frail but radiant golden Jade Emperor on a high balcony addresses the twelve animals;
he hands each of them a glowing sacred token and points them toward different lands, sending them on
quests to save him; the animals bow and set off on their journeys; a subtle ominous undertone hints he
hides a secret. 5 seconds.
```

---

## 4. MECÁNICA NUEVA: el Encargo del Emperador (eje del juego)

El Emperador (que dice estar muriendo) **encarga a cada uno de los 12 una aventura**: recorrer el reino y **conseguir ciertas reliquias/ofrendas sagradas** que, supuestamente, lo salvarán. Esto **desencadena toda la historia y la jugabilidad**:

- Cada zodiaco tiene **su propia ruta y reliquias** que reunir (esto abre la puerta a que, a futuro, cada personaje sea jugable con su campaña).
- **Tú juegas la aventura de la Rata** (con el Buey): cruzas las zonas (Pradera → Aldea → Vado → Cumbres → Templo), derrotas guardianes, resuelves puzzles y **reúnes las reliquias**.
- **Conexión con el GIRO:** las reliquias no eran para "salvar" al Emperador. El que llega primero quiere usarlas (y la **energía vital** del Emperador) para volverse todopoderoso. Reunirlas sin querer alimenta ese plan → corres a impedirlo en el Palacio (jefe final).
- Encaja con la **colección de espíritus**: reliquias y espíritus son recompensas de tu viaje (botín, biblioteca).

> Resultado: la "Carrera" se vuelve una red de **misiones** (cada animal con su encargo), con un objetivo común manipulado y un final que se revela.

---

## 5.bis 🎥 Videos LARGOS y con MOVIMIENTO (no de 5 en 5, no estáticos)

Dos problemas del primer intento: clips cortos sueltos, y personajes quietos. Soluciones reales:

### A) Que se MUEVAN más → cambiar de modelo
Usaste **Pollo 2.0** (tiende a quedarse quieto). En Pollo, elige modelos con más movimiento:
- **Kling 2.5 Turbo** o **Veo 3** (movimiento fluido, hasta audio nativo). Cuesta más créditos, pero la diferencia es enorme.
- Genera a **10 segundos** (no 5) y agrega al prompt palabras de **acción y cámara**:
  `dynamic motion, characters running and leaping, flowing camera push-in, lively animation,`

### B) Que sea LARGO y continuo → "Extend Video" (Kling)
En Pollo: **Kling → Extend Video.** Generas un clip base de 10s y lo **extiendes +5s cada vez** (con un prompt en cada paso). Es **un solo video continuo**, no clips pegados.
> La calidad aguanta bien hasta ~**20–30 s**; más allá los personajes empiezan a deformarse. Así que apunta a un continuo de 20–30 s por cinemática.

### Intro como UN solo video continuo (recomendado) — guion para Extend
**Base (10s):**
```
[PREFIJO de estilo] + dynamic motion, flowing camera, the camera glides through a misty zodiac
valley toward a glowing jade palace at dawn; twelve cute chibi zodiac animals run and leap together
toward it, lanterns flickering, banners waving, lively and cinematic. 10 seconds.
```
**Extend +5s (prompt):**
```
the animals arrive and gather in a grand plaza before the jade palace; the camera rises to reveal
the Jade Emperor appearing on a high balcony; the crowd looks up; royal trumpets sound.
```
**Extend +5s (prompt):**
```
the Jade Emperor raises his hand and warm golden light spreads; he hands each animal a glowing sacred
token, pointing them toward different lands; the animals bow and dash off on their quests; subtle ominous shimmer.
```
Resultado: ~20s **continuos** que cuentan toda la intro (convocatoria → plaza → encargo) con movimiento. Guárdalo como `art/cine/intro.mp4` (el juego ya lo reproduce).

### ⭐ INTRO con KLING 3.0 — "Multi-shot" (toda la intro en UN video)

> OJO: el número "125 sec / 345 sec" del listado de modelos es el **tiempo de generación**, NO la duración. La **duración del clip** se elige en el selector **"5s"** de la barra (súbelo al máximo, ~10s).

**Ajustes en Pollo:**
- Tipo: **Video** · Modo: **Text to Video** (o Image to Video con la referencia).
- Modelo: **Kling 3.0** ("Multi-shot cinematic storytelling" · **Unlimited Free** para ti · con audio).
- Duración: el selector **"5s" → ponlo al máximo** (10s).
- Resolución: **1080p** (o 720p) · Relación: **16:9**.
- Pega el **Negative prompt**.

**Prompt (1 toma continua, 12 en conjunto, con audio — pégalo tal cual):**
```
2D hand-painted Chinese storybook animation, cute chibi zodiac animals with big heads and expressive
eyes, warm jade-green and gold palette, soft ink outlines, rice-paper textures, painterly cinematic
lighting, consistent character design. One continuous epic cinematic shot, flowing camera, no cuts:
at dawn the camera glides smoothly over a misty zodiac valley toward a glowing jade-and-gold imperial
palace; twelve cute chibi zodiac animals (rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey,
rooster, dog, pig) run and leap together along a stone path, lanterns flickering and banners waving;
the camera rises to reveal the Jade Emperor standing on a high palace balcony bathed in golden light;
as he raises his hand, a brief faint ominous purple shimmer flickers behind the throne. Lively, smooth,
grand and cinematic. Epic orchestral music with royal trumpets and a soft choir.
```
**Negative prompt:**
```
static, still, frozen, motionless, stiff, blurry, low quality, distorted faces, extra limbs, text, watermark, photorealistic human
```
Guárdalo como `art/cine/intro.mp4` (el juego ya lo reproduce). Si quieres más largo, usa **Extend +5s** describiendo la siguiente escena.

### Para el TRÁILER con movimiento
Regenera las 3 tomas con **Kling 2.5 / Veo 3** a 10s + las palabras de acción. Me las dejas en `art/cine/` (`trailer-1/2/3.mp4`) y **yo las uno** con el título igual que antes.

---

## 5. Orden para producir
1. Generar la **imagen de referencia** de personajes (Rata+Buey, idealmente los 12) en el estilo.
2. **Tráiler** (3 tomas) → publicar como "Coming Soon".
3. **Intro** (4 tomas) → guardar como `intro.mp4` en `art/cine/` (el juego ya la reproduce).
4. Luego, cinemáticas de zona y del giro con el mismo prefijo.

*Todo ajustable: si cambias el estilo, cambiamos solo el PREFIJO y todo sigue coherente.*
