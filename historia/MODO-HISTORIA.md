# Zodiac Road — Modo Historia 🐉

Capa de **novela visual** (estilo Persona 5: retrato + diálogo + decisiones) montada sobre el proyecto *Zodiac Fighters / Zodiac Road*. Cada uno de los 12 animales del zodiaco tiene su propio "camino" hasta el trono del Emperador de Jade, con su guardián, su acertijo o pelea, y su dilema.

---

## 1. Estructura de archivos

```
videojuego/
├── index.html              ← Zodiac Fighters (motor de pelea) + "modo batalla-desde-historia"
├── spirits-data.js         ← catálogo de espíritus (guardianes salen de aquí)
├── art/                     ← sprites de cuerpo completo: <animal>-{idle,ready,hit,ko}.png
└── historia/
    ├── vn-engine.js         ← MOTOR de novela visual (reutilizable, no se toca por animal)
    ├── vn-engine.css        ← estilos del motor (paleta papel/origami)
    ├── story-rata.js        ← guion del Camino de la Rata
    ├── story-buey.js        ← guion del Camino del Buey
    ├── historia-rata.html   ← página jugable de la Rata
    └── historia-buey.html   ← página jugable del Buey
```

**Regla de oro:** para un animal nuevo solo se escribe un `story-<animal>.js` + un `historia-<animal>.html`. El motor (`vn-engine.js/css`) **no se modifica**.

---

## 2. Cómo añadir un animal nuevo

1. Copiar `historia-rata.html` → `historia-<animal>.html` y cambiar: título, `story-<animal>.js`, el nombre de la constante (`StoryRata` → `StoryXxx`), elemento y habilidades.
2. Crear `story-<animal>.js` con el formato de escenas (abajo). Historia **original** (no copiar la trama de otro animal).
3. Usar sprites reales (`../art/<animal>-idle.png`) si existen; si no, medallón con emoji.

---

## 3. Formato de una escena

```js
const StoryXxx = {
  start: 'id_primera_escena',
  scenes: {
    id_escena: {
      type: 'narration' | 'dialogue' | 'puzzle' | 'fight' | 'end',
      bg: 'linear-gradient(180deg,#...,#...)',     // fondo (cielo)
      speaker: 'Nombre',                            // si hay quien habla
      nameColor: 'red'|'water'|'green'|'gold'|'ink',
      portrait: { img:'../art/rata-idle.png', side:'left'|'right' }
              | { emoji:'🐢', color:'#2a6f97', side:'left' }
              | null,
      text: 'texto...'  |  (flags) => 'texto según decisiones',
      next: 'id_siguiente'  |  (flags) => 'id_siguiente',
      // decisiones:
      choices: [
        { label:'Opción', tag:'fight'|'think'|'kind'|'bold',
          next:'id', setFlags:{ clave:true } }
      ],
    }
  }
};
```

### Tipos de escena
- **narration** — texto sin retrato (voz del narrador).
- **dialogue** — un personaje habla (lleva `speaker` + `portrait`).
- **puzzle** — acertijo; usa `options:[{label,correct,next,setFlags}]`.
- **fight** — **pelea real** en el motor de combate (ver §4).
- **end** — pantalla final (`title`, `endText`, `restartLabel`).

### Ramificación
- `text` y `next` pueden ser **funciones** que reciben `flags` y devuelven distinto contenido/destino según las decisiones tomadas.
- `setFlags` (en escena, choice u option) guarda decisiones. Ej: `xuanwu_favor`, `gato_despierto`.
- Las etiquetas de decisión (`tag`) se muestran como insignia de color: `fight`=COMBATE, `think`=PENSAR, `kind`=GENTILEZA, `bold`=AUDACIA.

---

## 4. Integración con el motor de pelea (lo nuevo)

Una escena `type:'fight'` lanza una batalla **real** en `index.html` y vuelve a la historia con el resultado:

```js
xuanwu_fight: {
  type: 'fight',
  fight: {
    hero: 'rata',         // id del roster (tú)
    foe:  'serpiente',    // id del roster (el guardián encarnado)
    win:  'fight_win',    // escena si ganas
    lose: 'fight_lose',   // escena si pierdes
  }
},
```

**Cómo funciona por dentro:**
1. La historia navega a `index.html?vn=1&hero=...&foe=...&ret=<vuelta>&win=...&lose=...&flags=<base64>`.
2. `index.html` (solo si detecta `?vn=1`) salta los menús y arranca la pelea con `beginFight()`.
3. Al terminar, `endMatch` detecta `gameMode==='vn'` y vuelve a la historia con `?vnresult=win|lose&scene=...&flags=...`.
4. El motor de historia retoma en la escena indicada y restaura las flags (no se pierden al saltar al juego).

> El guardián se encarna en un **luchador del roster** temático. Ej.: Xuanwu (玄武 = tortuga + serpiente) pelea como la **Serpiente**.

Las modificaciones a `index.html` son mínimas y **no afectan** al juego normal (solo se activan con `?vn=1`). Respaldo del original en `index.html.bak-antes-historia`.

---

## 5. Roadmap de los 12 caminos

Orden de la leyenda. Cada uno: historia original, guardián de `spirits-data.js` según elemento, y dilema atado a la leyenda real.

| # | Animal | Elem. | Guardián (encarnación de pelea) | Dilema central | Estado |
|---|--------|-------|----------------------------------|----------------|--------|
| 1 | 🐀 Rata | Agua | Xuanwu 🐢 → pelea como Serpiente | El Gato dormido (despertarlo o no) | ✅ v2 |
| 2 | 🐂 Buey | Tierra | Qilin 🦄 | La Rata en el lomo y la traición final | ⚠️ v1 (pelea vieja) |
| 3 | 🐅 Tigre | Fuego | Zhuque 🐦‍🔥 (Fénix) | Fuerza sin control: pelear con todo o contenerse | ⬜ |
| 4 | 🐇 Conejo | Viento | Conejo de Jade 🐇 | Confiar en la suerte o en el esfuerzo | ⬜ |
| 5 | 🐉 Dragón | Fuego/Aire | Qinglong 🐲 (Dragón Azur) | Ayudar a otros a costa de tu puesto | ⬜ |
| 6 | 🐍 Serpiente | Tierra | Nüwa 🐍 (diosa serpiente) | El engaño y el miedo | ⬜ |
| 7 | 🐎 Caballo | Viento | Sleipnir 🐎 (corcel de Odín) | No dejar que el miedo ajeno te defina | ⬜ |
| 8 | 🐐 Cabra | Tierra | Pan 🐐 (espíritu del monte) | Cooperación vs gloria individual | ⬜ |
| 9 | 🐒 Mono | Madera | Sun Wukong 🐵 (Rey Mono) | El ingenio: para ti o para el grupo | ⬜ |
| 10 | 🐓 Gallo | Metal | Baihu 🐯 (Tigre Blanco) | Prestar algo valioso que no recuperas | ⬜ |
| 11 | 🐕 Perro | Metal | Cerbero 🐕 (guardián) | Disciplina vs disfrutar el momento | ⬜ |
| 12 | 🐖 Cerdo | Tierra/Agua | Daikokuten 🔨 (abundancia) | Los apetitos vs la meta | ⬜ |

---

## 6. Estructura narrativa (loop de 6 fases del GDD)

1. **Apertura** — la Gran Carrera; voz del protagonista.
2. **Tutorial** — puente narrativo de las 2 habilidades del animal.
3. **Guardián** — espíritu que bloquea el paso → elegir PENSAR (acertijo) o COMBATE (pelea real).
4. **Sección elemental** — cruce/obstáculo temático del elemento.
5. **Dilema central** — decisión con peso moral, distinta para cada animal, atada a la leyenda.
6. **Meta + reflexión** — final ramificado según las decisiones (varias variantes).

---

## 7. Convenciones visuales

- Paleta compartida con Zodiac Fighters (papel/origami): papel `#f7f1e3`, tinta `#1a1a2e`, rojo `#9d2235`, agua `#2a6f97`, verde `#2e6e5e`, oro `#c9a227`, noche `#0d2137`.
- Retratos: sprites de **cuerpo completo** anclados abajo (no recortados). Emoji en medallón cuando no hay sprite.
- Fondos: degradado de cielo + capas de colinas + resplandor + partículas de papel (profundidad).
- Se juega en **horizontal** (landscape); hay overlay que pide girar el dispositivo.

---

## 8. Estado actual (jun 2026)

- ✅ **Motor VN** completo y reutilizable, con pelea real integrada.
- ✅ **Rata v2** — voz nueva (humor + serio), rival Tigre, pelea real vs Serpiente, dilema del Gato, visual mejorado.
- ⚠️ **Buey v1** — jugable, pero con la pelea vieja de botones y retratos de emoji; pendiente actualizar al estándar de la Rata v2.
- ⬜ **Tigre → Cerdo** — pendientes (seguir el roadmap §5).

**Próximo paso:** validar la Rata v2 con pruebas de usuario y luego replicar el estándar al Buey y al Tigre.
