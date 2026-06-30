/* ============================================================
   ZODIAC ROAD — Modo Historia
   "El Camino del Buey 牛" — segundo camino
   ------------------------------------------------------------
   Reutiliza vn-engine.js sin cambios. Historia ORIGINAL,
   distinta a la de la Rata: el Buey es fuerte, lento, paciente
   y noble (elemento Tierra · habilidades Embestida y Cargar).

   Estructura (loop de 6 fases del GDD, adaptado a VN):
     1. Apertura            -> intro_1, buey_wake
     2. Tutorial habilidad   -> tutorial_note (Embestida / Cargar)
     3. Guardián del camino  -> river_arrival, qilin_appear
                                 (espíritu de spirits-data.js:
                                 l_qilin, la bestia de la virtud,
                                 que solo aparece ante los dignos)
                                 -> PENSAR (acertijo de la humildad)
                                 o FUERZA (probar su determinación)
     4. Sección elemental    -> river_crossing + la Rata pide subir
                                 al lomo (decisión: GENTILEZA/AUDACIA)
     5. Dilema central       -> el desenlace de esa confianza:
                                 si la cargó, la Rata salta al final
                                 para ganar; ¿cómo reacciona el Buey?
     6. Reflexión + final    -> emperor_arrival, reflection, end

   Flags:
     - qilin_favor   (bool) si el Qilin lo consideró digno
     - rata_subio    (bool) si dejó que la Rata cruzara en su lomo
     - buey_acepta   (bool) si aceptó con nobleza haber sido superado
                            (solo relevante si rata_subio === true)
   ============================================================ */

const StoryBuey = {
  start: 'intro_1',
  scenes: {

    /* ============ 1. APERTURA ============ */

    intro_1: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#241a10,#3a2c1a)',
      text: 'El Emperador de Jade convocó a los doce signos a una carrera hasta su trono. Mientras los demás dormían soñando con la victoria, uno se levantó mucho antes del amanecer — porque sabía que era el más lento, y que solo la constancia podría compensarlo.',
      next: 'buey_wake',
    },

    buey_wake: {
      speaker: 'Buey',
      nameColor: 'gold',
      portrait: { emoji: '🐂', color: '#8b6f47', side: 'left' },
      bg: 'linear-gradient(180deg,#241a10,#3a2c1a)',
      text: 'No soy rápido. No soy astuto. Pero puedo cargar una montaña sobre el lomo y no detenerme jamás. Que los demás corran y se cansen. Yo solo tengo que seguir avanzando... un paso firme tras otro, hasta el final.',
      next: 'tutorial_note',
    },

    /* ============ 2. TUTORIAL (puente narrativo) ============ */

    tutorial_note: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a2c1a,#5a4326)',
      text: 'Con la Embestida apartas rocas que cerrarían el paso a cualquier otro. Cargando objetos pesados, conviertes los obstáculos en puentes. Mientras el sol asoma, ya has dejado atrás los primeros valles, sin prisa y sin pausa.',
      next: 'river_arrival',
    },

    /* ============ 3. GUARDIÁN DEL CAMINO — EL QILIN ============ */

    river_arrival: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#5a4326,#6b7a3a)',
      text: 'Antes del gran río, el camino se abre en un claro de luz dorada. Allí, donde la hierba ni siquiera se dobla bajo sus cascos, te espera una criatura que creías solo una leyenda: el Qilin, la bestia sagrada que únicamente aparece ante quienes son verdaderamente dignos.',
      next: 'qilin_appear',
    },

    qilin_appear: {
      speaker: 'Qilin',
      nameColor: 'gold',
      portrait: { emoji: '🦄', color: '#7a8a3a', side: 'left' },
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      text: 'Buey. Llevo siglos sin mostrarme a nadie — la mayoría que pasa por aquí solo piensa en ganar. Tú piensas en no rendirte. Eso me interesa. Antes de dejarte cruzar, dime: ¿qué clase de fuerza crees que te ha traído hasta aquí?',
      choices: [
        { label: 'Responder con sabiduría a su acertijo', tag: 'think', next: 'qilin_riddle' },
        { label: 'Demostrarle tu determinación de frente', tag: 'fight', next: 'qilin_battle' },
      ],
    },

    /* --- Camino A: acertijo de la virtud --- */

    qilin_riddle: {
      type: 'puzzle',
      speaker: 'Qilin',
      nameColor: 'gold',
      portrait: { emoji: '🦄', color: '#7a8a3a', side: 'left' },
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      text: '"Cuanto más la persigues, más lejos se aleja. Cuanto menos la reclamas para ti, más cerca está. Los verdaderamente grandes la tienen sin darse cuenta." ¿Qué es?',
      options: [
        { label: 'La fama', correct: false, next: 'qilin_riddle_wrong' },
        { label: 'La fuerza', correct: false, next: 'qilin_riddle_wrong' },
        { label: 'La humildad', correct: true, next: 'qilin_riddle_correct', setFlags: { qilin_favor: true } },
        { label: 'La riqueza', correct: false, next: 'qilin_riddle_wrong' },
      ],
    },

    qilin_riddle_correct: {
      speaker: 'Qilin',
      nameColor: 'gold',
      portrait: { emoji: '🦄', color: '#7a8a3a', side: 'left' },
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      text: 'La humildad. Exacto. El más fuerte de la carrera lo sabe, y aun así no presume. Cruza con mi bendición, Buey — y recuerda lo que dijiste hoy cuando el río te ponga a prueba de verdad.',
      next: 'river_crossing',
    },

    qilin_riddle_wrong: {
      speaker: 'Qilin',
      nameColor: 'gold',
      portrait: { emoji: '🦄', color: '#7a8a3a', side: 'left' },
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      text: 'No exactamente... pero veo que respondes con el corazón, no con cálculo. Eso ya dice mucho. Aun así, deja que ponga a prueba esa determinación tuya antes de abrirte el paso.',
      next: 'qilin_battle',
    },

    /* --- Camino B: probar la determinación (duelo elemental) --- */

    qilin_battle: {
      type: 'battle',
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      battle: {
        enemyName: 'Qilin',
        enemyEmoji: '🦄',
        enemyColor: '#7a8a3a',
        enemyHP: 3,
        playerName: 'Buey',
        playerHP: 3,
        intro: 'El Qilin no ataca: a tu alrededor giran agua, madera y fuego. "No mido tu golpe," dice. "Mido si sabes leer lo que tienes delante."',
        onWin: 'qilin_battle_win',
        onLose: 'qilin_battle_lose',
      },
    },

    qilin_battle_win: {
      speaker: 'Qilin',
      nameColor: 'gold',
      portrait: { emoji: '🦄', color: '#7a8a3a', side: 'left' },
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      setFlags: { qilin_favor: true },
      text: 'Fuerza con criterio: la combinación más rara de todas. La mayoría tiene una o la otra. Pasa, Buey — eres digno de cruzar este río.',
      next: 'river_crossing',
    },

    qilin_battle_lose: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#4a5a2a,#7a8a3a)',
      setFlags: { qilin_favor: false },
      text: 'Los elementos te derriban una y otra vez. Pero cada vez vuelves a levantarte, terco como la tierra misma. "No acertaste," dice el Qilin, casi sonriendo, "pero tampoco te rendiste. Para mí, eso también cuenta. Cruza."',
      next: 'river_crossing',
    },

    /* ============ 4. SECCIÓN ELEMENTAL + 5. DILEMA — EL RÍO Y LA RATA ============ */

    river_crossing: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a5f6a,#2a6f97)',
      text: 'El río es ancho y la corriente, fuerte — pero tú eres un nadador firme y paciente, de los pocos que pueden cruzarlo a pulso. Cuando entras al agua, una vocecita tiembla en la orilla: una Rata empapada, demasiado pequeña para cruzar sola. "Por favor... no llego sin ayuda. ¿Me dejas subir a tu lomo?"',
      choices: [
        { label: 'Dejarla subir a tu lomo', tag: 'kind', next: 'ride_yes', setFlags: { rata_subio: true } },
        { label: 'Cruzar solo; cada quien su carrera', tag: 'bold', next: 'ride_no', setFlags: { rata_subio: false } },
      ],
    },

    ride_yes: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#2a6f97,#3a5f7a)',
      text: 'Sientes el peso ligero de la Rata aferrada a tu lomo. No pesa casi nada — para ti, cargarla es como no cargar nada. Avanzas firme contra la corriente, y poco a poco la otra orilla se acerca. La Rata va callada, mirando hacia la meta.',
      next: 'near_goal_rode',
    },

    ride_no: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#2a6f97,#3a5f7a)',
      text: 'Sigues tu camino sin detenerte. Atrás, oyes a la Rata chapotear y luchar contra la corriente. No miras atrás — cada quien corre su propia carrera. Cruzas firme, y al salir del agua eres el primero en pisar la otra orilla.',
      next: 'solo_finish',
    },

    /* --- desenlace si la cargó: la traición clásica de la leyenda --- */

    near_goal_rode: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a5f7a,#6b5836)',
      text: 'La meta del Emperador aparece tras la última colina. Das el paso final hacia la victoria... y justo entonces, un peso salta de tu lomo y se adelanta como un rayo: la Rata corre hasta el trono y llega primera. Te quedas inmóvil, comprendiendo de golpe lo que acaba de pasar.',
      choices: [
        { label: 'Sonreír: al menos la ayudaste a llegar', tag: 'kind', next: 'emperor_arrival', setFlags: { buey_acepta: true } },
        { label: 'Sentir el peso amargo de haber sido usado', tag: 'bold', next: 'emperor_arrival', setFlags: { buey_acepta: false } },
      ],
    },

    solo_finish: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a5f7a,#6b5836)',
      text: 'Sin nadie sobre el lomo y sin nadie por delante, subes la última colina a tu paso de siempre. La meta del Emperador se abre ante ti, y no hay una sola sombra que se interponga entre tú y el trono.',
      next: 'emperor_arrival',
    },

    /* ============ 6. META + REFLEXIÓN ============ */

    emperor_arrival: {
      speaker: 'Emperador de Jade',
      nameColor: 'gold',
      portrait: { emoji: '👑', color: '#c9a227', side: 'left' },
      bg: 'linear-gradient(180deg,#3a2c00,#c9a227)',
      text: (flags) => {
        if (!flags.rata_subio) {
          // No cargó a la Rata: reescribe la leyenda, llega primero
          if (flags.qilin_favor) {
            return 'Eres el primero en llegar ante el trono, Buey — algo que la vieja leyenda nunca contó. "El primer lugar del zodiaco es tuyo," declara el Emperador. "Y el Qilin mismo te bendijo en el camino. Pocas veces vi tanta fuerza tan bien guiada."';
          }
          return 'Eres el primero en cruzar la meta, sin ayudar a nadie y sin que nadie te ayudara. "El primer lugar es tuyo," dice el Emperador. Lo lograste solo, exactamente como quisiste — aunque el claro del Qilin quedó en silencio cuando pasaste.';
        }
        // Cargó a la Rata y fue superado al final
        if (flags.buey_acepta) {
          return 'Llegas segundo, justo detrás de la Rata que cargaste. "Segundo lugar para el Buey," anuncia el Emperador. Luego te mira con curiosidad: "Sabías que podía pasarte... y aun así la cruzaste. ¿No te arrepientes?" Niegas con la cabeza, tranquilo.';
        }
        return 'Llegas segundo, detrás de la Rata, con la traición todavía ardiendo en el pecho. "Segundo lugar para el Buey," anuncia el Emperador, y nota tu mirada dura. "La cargaste a través del río... y mira cómo te lo pagó. ¿Volverías a hacerlo?"';
      },
      next: 'reflection',
    },

    reflection: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a2c1a,#241a10)',
      text: (flags) => {
        if (!flags.rata_subio) {
          if (flags.qilin_favor) {
            return 'La leyenda real cuenta que el Buey iba a llegar primero, hasta que la Rata, escondida en su lomo, saltó en el último instante para robarle el puesto. Hoy tu camino fue otro: nadie viajó en tu lomo, y la fuerza guiada por la humildad te llevó al primer lugar. Pero en el silencio del Qilin queda una pregunta: ¿de qué sirve llegar primero si nadie cruzó contigo?';
          }
          return 'Llegaste primero por tu cuenta, sin cargar a nadie y sin dejar que nadie te frenara. La fuerza, sola, bastó para ganar. Pero la fuerza sola también deja un claro vacío detrás: el Qilin no se mostró del todo, y la orilla que dejaste atrás aún tiene a alguien luchando contra la corriente.';
        }
        if (flags.buey_acepta) {
          return 'La leyenda real cuenta que la Rata cruzó el río en el lomo del Buey y saltó al final para ganar — y que el Buey, en lugar de guardar rencor, fue honrado por siempre como el segundo del zodiaco, símbolo de la fuerza paciente y noble. Hoy reviviste esa historia: te superaron, sí, pero ayudaste a cruzar a quien no podía sola. El segundo lugar nunca fue tan digno como en tus cascos.';
        }
        return 'La Rata cruzó en tu lomo y te robó el primer puesto en el último salto — tal como cuenta la vieja leyenda. Tienes todo el derecho a sentirte usado. Pero la historia recordará al Buey no por haber sido engañado, sino por haber sido lo bastante fuerte y generoso para cargar a otro a través del río. Quizá, con el tiempo, ese segundo lugar pese menos que el rencor.';
      },
      next: 'end',
    },

    end: {
      type: 'end',
      bg: 'linear-gradient(180deg,#3a2c1a,#241a10)',
      title: '🐂 El zodiaco del Buey',
      endText: 'Has completado El Camino del Buey. Tu encuentro con el Qilin y tu decisión frente a la Rata definieron si llegas primero en soledad o segundo en compañía — y qué clase de fuerza eres. Cada animal del zodiaco enfrenta su propio guardián... y su propio dilema.',
      restartLabel: 'Recorrer el camino otra vez',
    },
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = StoryBuey;
