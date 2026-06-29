# 🎮 Zodiac Fighters — WONEJO MALO Entertainment

Documento de estado y hoja de ruta del videojuego.

**Enlace en vivo:** https://ferb1215-ux.github.io/zodiac/
**Repositorio:** github.com/ferb1215-ux/zodiac
**Archivos principales:** `index.html` (juego completo) · `spirits-data.js` (catálogo de espíritus) · `cartas.html` (álbum imprimible) · carpeta `art/` (sprites)

> ⚠️ Importante: ahora el juego usa **3 archivos**. Hay que subir `index.html`, `spirits-data.js` y `cartas.html` juntos al repositorio.

---

## 1. Qué es

Juego de pelea 2D estilo "papel" con los 12 animales del zodiaco chino. Corre en el navegador (móvil y PC), sin instalar nada. Combina peleas estilo Smash/Mortal Kombat con un enorme sistema de colección de figuritas/espíritus estilo Pokémon + recompensas diarias estilo Duolingo.

---

## 2. Modos de juego

- **Pelea vs CPU** con selección de dificultad: **Fácil / Normal / Difícil** (cambia reacción, bloqueo y agresividad de la CPU).
- **Torres** (escalera estilo Mortal Kombat): 4 torres por rango con dificultad ascendente.
  - 🥉 Bronce (4 rivales) · 🥈 Plata (6) · 🥇 Oro (8) · 🏆 Legendaria (12).
  - La CPU empieza fácil y sube en cada combate hasta el jefe final (el Dragón). Completar una torre da su espíritu + 2 🪙.
- **Target Test** (Rompe Blancos): 12 escenarios únicos con cronómetro y mejor tiempo local por personaje.
- **Espíritus**: hub de colección con Álbum, Máquina, Misiones y Tienda.

---

## 3. Selección de personajes (estilo Mortal Kombat)

Los 12 luchadores se eligen en una rejilla con **retratos** (usa `art/<id>-ready.png`) sobre un panel con el color de su elemento y bordes neón. Los personajes sin sprite (buey, conejo, cabra, perro) usan un retrato estilizado con su emoji hasta que se agreguen sus imágenes.

---

## 4. Sistema de espíritus / figuritas (614 cartas)

Cada espíritu es una **carta coleccionable estilo TCG**: marco por rareza, brillo holográfico (en épico+), nombre, rareza, elemento/categoría, descripción y número de colección. Rarezas: **común · uncommon · rare · épico · legendario · místico**.

### Cómo se consiguen
- **Luchadores (12):** ganando una pelea con cada personaje.
- **Oscuros (12):** perdiendo una pelea con cada personaje (versión de tono oscurecido).
- **Elementales (72):** completando el Target Test de cada personaje según el tiempo (cada banda da un elemento distinto: <1:00 Viento, 1–2 Fuego, 2–3 Agua, 3–4 Madera, 4–5 Tierra, 5+ Metal).
- **Maestros de Torre (4):** completando cada torre.
- **Espíritus del Mes (12 dorados):** acumulando puntos de misiones diarias.
- **Guardianes de la Racha (12):** alcanzando hitos de racha de fuego.
- **Pool de la Máquina/Tienda (~490):** colecciones temáticas — Leyendas del Zodiaco, Horóscopo Occidental, Maya/Azteca, Egipto, Mitología Griega, Nórdica, Japonesa, Dioses Hindúes, Folclore Asiático, Planetas y Cosmos, las 88 Constelaciones, Gemas y Minerales, Reino Natural, Celta/Eslava y Africanos.

### Álbum
Rejilla por secciones con contador de progreso. Lo que tienes sale a color con su rareza; lo que falta aparece como **silueta "???"** que al tocarla indica **cómo conseguirlo**. Tocar cualquier figurita muestra su **carta completa**.

---

## 5. Economía y recompensas (todas activas)

- **Recompensa diaria:** al abrir el juego, +1 🪙 el primer día, +2 el segundo… hasta +7.
- **Racha de fuego 🔥:** sube 1 cada día que juegas (pelea, Target Test o Máquina). Bonus de monedas en cada múltiplo de 5 (día 5 → +1, 10 → +2, 15 → +3…). Acumula sin tope; se pierde si faltas un día.
  - **Hitos de racha:** en los días 7, 10, 14, 17, 20, 25 y 35 te dan un espíritu del set de racha. El ciclo se repite cada 35 días y se permiten duplicados.
- **Misiones diarias:** 3 cada día (ganar peleas, Target Test, subir pisos de torre, girar la máquina). Cada una da +5 puntos y +1 🪙. Al llegar a **35 puntos en el mes** ganas el **espíritu dorado del mes**; luego se reinicia el mes siguiente (estilo Duolingo). Hay un banner "Misión del día" en el menú principal.

---

## 6. Máquina de Lotería y Tienda

- **🎰 Máquina:** apuestas de 1 a 20 monedas; a más monedas, mayor probabilidad de rarezas altas. Solo entrega espíritus que aún no tienes.
- **🛒 Tienda:** 5 figuritas aleatorias cada día con precio según rareza (común 3 → místico 120 🪙). Se permiten repetidas. Botón **🔄 Renovar (5 🪙)** para barajar 5 nuevas.

---

## 7. Otros detalles

- **Menú principal estilo galaxia** (inspirado en Smash Bros Melee): campo de estrellas animado, título con brillo y banner de misión del día.
- **Tiempo jugado:** contador visible en el menú y en el hub de espíritus.
- Cámara con zoom en golpes fuertes y K.O., estelas, chispas, hitstop, combos visibles.
- Funciona como app instalable (Android/PC); en iPhone, agregar a pantalla de inicio.

---

## 8. Lo que falta / ideas

### Pendiente de decidir
- **Escudo de racha** (congelar racha estilo Duolingo): comprar con monedas un escudo que evita perder la racha si faltas un día. *(Se eligió la Tienda en su lugar; el escudo queda como opción futura.)*

### Mejoras sugeridas
- Completar sprites ilustrados de **buey, conejo, cabra y perro** (hojas de 4 poses).
- Movimiento natural de personajes (más cuadros de animación o rig de marioneta).
- Rivales **temáticos por torre** (en vez de aleatorios).
- Ranking mundial del Target Test (backend, p. ej. Supabase).
- Música chiptune que pegue con el look retro.
- Arte IA pintado para las cartas (hoy usan emoji dentro del marco TCG); si se conecta un generador de imágenes, se puede reemplazar sin tocar el resto.

---

## 9. Cómo actualizar el juego

1. Editar `index.html` y/o `spirits-data.js` (para más espíritus) y reemplazar/añadir sprites en `art/`.
2. En github.com/ferb1215-ux/zodiac → **Add file → Upload files** → subir los archivos cambiados → **Commit changes**.
3. Esperar ~1 minuto; el enlace se actualiza solo.

> Para añadir más espíritus: edita las colecciones de `spirits-data.js` y vuelve a generar `cartas.html` si quieres el álbum impreso al día.

*Documento generado para el proyecto Zodiac Fighters · WONEJO MALO Entertainment.*
