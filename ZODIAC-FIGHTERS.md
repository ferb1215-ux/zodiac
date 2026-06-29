# Zodiac Fighters 🐉

**Juego de peleas 1v1** con los 12 animales del Zodiaco Chino. Jugabilidad estilo Smash Bros (ataques suaves, smashes, aéreos, agarre, doble salto + recovery) con barra de vida tradicional y escenarios planos sin caídas — más cercano a Mortal Kombat en estructura.

---

## Cómo jugar

Abre `zodiac-fighters-v0.1.html` en tu navegador. No requiere instalación ni servidor.

### Controles — PC (teclado)

| Acción | Tecla |
|---|---|
| Moverse | ← → (flechas) |
| Saltar | ↑ o Espacio |
| Agacharse / dirección | ↓ |
| **Bloquear** | Sostener ← (hacia atrás) |
| **Golpe / Smash** | A (mantener para cargar smash) |
| **Especial** | S |
| **Recovery** | S + ↑ |
| **Agarre** | X |

### Controles — Móvil (táctil)

Stick virtual en la mitad izquierda de la pantalla. Botones A / B / salto / agarre en la derecha. Sostener atrás en el stick activa el bloqueo.

---

## Mecánicas core

- **Barra de vida**: alta resistencia — partidas de hasta 10 minutos. Gana quien haga K.O. o tenga más vida al expirar el tiempo.
- **Sin caídas / ring-out**: el knockback empuja al personaje dentro del escenario. Al llegar al borde, rebota (no cae).
- **Hitstun proporcional**: el personaje golpeado pierde control durante un tiempo proporcional al daño recibido — habilita combos.
- **Hitstop / freeze frame**: 2-4 frames de congelamiento al conectar, para dar sensación de peso.
- **Knockdown**: smashes y especiales potentes derriban al rival, que queda vulnerable al levantarse.
- **Combo counter**: contador en pantalla mientras el rival no recupera control.
- **Escudo**: sin botón dedicado — sostener la dirección hacia atrás lo activa.
- **Proyectiles**: solo Rata, Dragón y Mono los tienen (identidad de "zoneo").
- **Efecto arruga**: al recibir un golpe fuerte, el personaje se deforma momentáneamente (refuerzo del estilo papel).

---

## Roster — Los 12 Zodiacales

| # | Animal | Elemento | Arquetipo | Proyectil |
|---|---|---|---|---|
| 1 | 🐀 Rata | Agua | Técnica · ágil | ✅ |
| 2 | 🐂 Buey | Tierra | Tanque lento | ❌ |
| 3 | 🐅 Tigre | Fuego | Agresivo equilibrado | ❌ |
| 4 | 🐇 Conejo | Viento | Ágil · combos | ❌ |
| 5 | 🐉 Dragón | Fuego/Aire | Control aéreo | ✅ |
| 6 | 🐍 Serpiente | Tierra/Veneno | Control · DOT | ❌ |
| 7 | 🐎 Caballo | Viento | Velocidad pura | ❌ |
| 8 | 🐐 Cabra | Tierra/Roca | Tanque resistente | ❌ |
| 9 | 🐒 Mono | Madera | Versátil | ✅ |
| 10 | 🐓 Gallo | Metal/Luz | Aéreo vertical | ❌ |
| 11 | 🐕 Perro | Metal | Equilibrado defensivo | ❌ |
| 12 | 🐖 Cerdo | Tierra/Agua | Tanque contragolpe | ❌ |

### Especiales por personaje (B / S)

| Animal | B neutral | B → | B ↑ (recovery) | B ↓ |
|---|---|---|---|---|
| Rata | Trampa/Señuelo | Encogerse y Avanzar | Trepada | Contraataque Astuto (parry) |
| Buey | Carga de Embestida | Embestida (rompe guardia) | Salto con cuernos | Postura de Carga (+defensa) |
| Tigre | Rugido (aturde) | Embestida de Impulso (armadura) | Salto de Garras | Postura de Caza (+daño siguiente) |
| Conejo | Patada de Viento | Sprint + patada | Salto silencioso | Esquive + contragolpe |
| Dragón | Aliento de Fuego | Empuje de viento | Planeo (largo) | Onda de choque |
| Serpiente | Mordida Venenosa | Deslizar | Salto en resorte | Camuflaje (evade) |
| Caballo | Relincho (aturde) | Galope (dash+golpe) | Salto a distancia | Patada trasera |
| Cabra | Cabezazo (rebota) | Escalada (esquiva bajo) | Salto montañés | Postura rocosa (absorbe 1 golpe) |
| Mono | Lanzar objeto | Agarre de liana | Doble salto extra + golpe | Trampa de plátano |
| Gallo | Canto (aturde área) | Aleteo avance | Vuelo corto | Picotazo descendente |
| Perro | Mordida leal | Embestida protectora | Salto guardián | Olfato (revela carga enemiga) |
| Cerdo | Resistencia (-daño) | Embestida con peso | Salto pesado | Excavar (esquiva) |

---

## Dirección visual — "Papel con profundidad"

Referencia: *Paper Mario: The Origami King / Tearaway*. Mundo plano/cartón con personajes con volumen y sombras propias, pliegues visibles tipo origami armado en 3D.

- **Escenarios**: fondo en capas de papel con parallax (2-3 capas), recortes con sombras entre capas. Suelo = tira de papel/cartón horizontal con pliegues visibles en los bordes.
- **Paleta por elemento**: Agua = azules, Fuego = rojos, Tierra = ocres, Viento = verdes, Metal = grises, Madera = verdes oscuros.
- **Personajes**: modelos low-poly con shader que simula textura de papel. Efecto de "arruga" reutilizable para todo el roster al recibir golpes fuertes.

---

## Spirits / Figuritas coleccionables

Sin efecto en el combate — puramente coleccionables. Mantiene la estructura del documento original *Zodiac Road*: figuritas por hitos, sistema lunar, edición comunidad, mesa/álbum.

---

## Estado del proyecto

| Versión | Contenido |
|---|---|
| v0.1 | Prototipo jugable completo: pantalla de título, selección de peleador (12 personajes) + rival CPU (elegido o "CPU al azar"), combate 1v1 con barra de vida y los 4 especiales (B / B→ / B↑ / B↓) de cada animal, 6 escenarios de papel con parallax (uno por elemento), pausa, revancha y cambio de peleador, controles táctil + teclado |

### Pendiente (próximos pasos)

- Modo 2 jugadores local (mismo dispositivo / mando)
- Modo entrenamiento (practicar combos y especiales sin presión)
- Escenarios específicos por personaje (hoy son 6 paletas compartidas por elemento, no por personaje)
- Figuritas/spirits coleccionables (diseñadas en el GDD original, aún sin implementar)
- Nuevos peleadores (signos zodiacales de otras culturas) — roster de expansión
- Modo online

---

## Estructura de archivos

```
videojuego/
├── zodiac-fighters-v0.1.html   # Prototipo jugable (todo en un solo archivo)
├── ZODIAC-FIGHTERS.md          # Este documento
└── [PDFs de diseño originales]
```
