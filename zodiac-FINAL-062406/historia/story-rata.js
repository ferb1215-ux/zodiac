/* ============================================================
   ZODIAC ROAD — Modo Historia
   "El Camino de la Rata 鼠"  ·  v2 (tono mezcla: humor + serio)
   ------------------------------------------------------------
   Cambios respecto a v1:
   - Voz con actitud y humor; menos "narrador", más diálogo.
   - Rival recurrente: el Tigre (usa su sprite real del juego).
   - El guardián Xuanwu (玄武 = tortuga + serpiente) puede pelearse
     DE VERDAD: type:'fight' lanza el motor de pelea (index.html)
     contra la Serpiente, que es la forma de combate del espíritu.
   - Dilema del Gato con peso emocional (es tu amigo).

   Flags:
     - tigre_burla     ('chulo' | 'frio')  cómo respondiste al Tigre
     - xuanwu_favor    (bool)  si te ganaste el respeto del guardián
     - riddle_correct  (bool)  si acertaste el acertijo
     - lastBattleResult('win'|'lose')  lo pone el motor al volver de pelear
     - gato_despierto  (bool)  decisión del dilema central
   ============================================================ */

const StoryRata = {
  start: 'myth_1',
  scenes: {

    /* ============ PRÓLOGO — EL MITO DEL ZODIACO ============ */

    myth_1: {
      type: 'narration',
      bg: 'radial-gradient(120% 90% at 50% 18%, #ffd86b 0%, #b8860b 30%, #3a2a05 70%, #140d02 100%)',
      text: 'Hace mil años, cuando el tiempo aún no tenía nombre, el Emperador de Jade —señor del cielo— miró el mundo y vio puro caos. Decidió ponerle orden.',
      next: 'myth_2',
    },
    myth_2: {
      speaker: 'Emperador de Jade',
      nameColor: 'gold',
      portrait: { emoji: '👑', color: '#c9a227', side: 'right' },
      bg: 'radial-gradient(120% 90% at 50% 18%, #ffe9a8 0%, #c9a227 32%, #3a2a05 72%, #140d02 100%)',
      text: '"Doce bestias guardarán los años, y el cielo llevará sus nombres por toda la eternidad. ¿Quiénes serán dignas? *(alza la mano)* Que lo decida una carrera."',
      next: 'myth_3',
    },
    myth_3: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#2a1a3a,#5a2a4a,#27496d)',
      text: 'Así nació la Gran Carrera. Una sola regla: cruzar el río salvaje del fin del mundo. Los primeros DOCE en llegar tendrían un año eterno con su nombre. Los demás... serían olvidados.',
      next: 'myth_4',
    },
    myth_4: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#1b3a5c,#27496d)',
      text: 'Desde cada rincón del reino llegaron las bestias: el Tigre con su furia, el Dragón con sus alas, el Buey con su paciencia de montaña. Cien corazones. Doce lugares. Y, escondida en la hierba, la más pequeña de todas afilaba la única arma que tenía: la astucia.',
      next: 'intro_run',
    },

    /* ============ ACTO 1 — LA SALIDA ============ */

    intro_run: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#0d2137,#1b3a5c)',
      text: 'Amanece. Cien animales se empujan en la línea de salida, todos con los ojos puestos en el mismo premio. El cañón del Emperador truena sobre el valle. Y empieza el caos.',
      next: 'rata_intro',
    },

    rata_intro: {
      speaker: 'Rata',
      nameColor: 'red',
      portrait: { img: '../art/rata-idle.png', side: 'left' },
      bg: 'linear-gradient(180deg,#0d2137,#1b3a5c)',
      text: 'Cien animales. Doce lugares. Y yo soy el más chico de todos. *(sonríe)* Perfecto. Nadie vigila al más chico.',
      next: 'tigre_taunt',
    },

    tigre_taunt: {
      speaker: 'Tigre',
      nameColor: 'gold',
      portrait: { img: '../art/tigre-idle.png', side: 'right' },
      bg: 'linear-gradient(180deg,#1b3a5c,#27496d)',
      text: '*(pasa rugiendo y te tira al lodo)* ¡Quítate del camino, bocadillo! El zodiaco es para los DEPREDADORES, no para la cena.',
      choices: [
        { label: '"Corre, corre. Ya nos veremos en la meta."', tag: 'bold', next: 'tigre_after', setFlags: { tigre_burla: 'chulo' } },
        { label: '"...Tú primero. Los grandes se cansan primero."', tag: 'think', next: 'tigre_after', setFlags: { tigre_burla: 'frio' } },
      ],
    },

    tigre_after: {
      speaker: 'Rata',
      nameColor: 'red',
      portrait: { img: '../art/rata-idle.png', side: 'left' },
      bg: 'linear-gradient(180deg,#1b3a5c,#27496d)',
      text: (f) => f.tigre_burla === 'chulo'
        ? 'Se va dando zarpazos al aire, creyéndose ya ganador. Que disfrute la delantera. Yo no corro para ir primero — corro para llegar primero. No es lo mismo.'
        : 'Ni se molesta en responder. Mejor. Mientras él gasta músculo, yo guardo el mío. Esta carrera no la gana el más rápido. La gana el que piensa.',
      next: 'river_arrival',
    },

    /* ============ ACTO 2 — EL RÍO Y EL GUARDIÁN ============ */

    river_arrival: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#1b3a5c,#2a6f97)',
      text: 'El camino muere de golpe en la orilla de un río negro y ancho. Al otro lado, ya se oyen los rugidos del Tigre y el chapoteo de los que se atrevieron a cruzar. No hay puente. Y el agua huele a peligro.',
      next: 'xuanwu_appear',
    },

    xuanwu_appear: {
      speaker: 'Xuanwu',
      nameColor: 'water',
      portrait: { emoji: '🐢', color: '#2a6f97', side: 'left' },
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      text: 'El agua se arremolina y algo ENORME emerge: una tortuga negra, vieja como las montañas, con una serpiente enroscada en el caparazón. "Nadie cruza mi río gratis, pequeña. Conmigo se paga con la cabeza... o con las garras."',
      choices: [
        { label: 'Pagar con la cabeza: resolver su acertijo', tag: 'think', next: 'xuanwu_riddle' },
        { label: 'Pagar con las garras: pelear contra su espíritu', tag: 'fight', next: 'xuanwu_fight' },
      ],
    },

    /* --- Camino A: acertijo --- */

    xuanwu_riddle: {
      type: 'puzzle',
      speaker: 'Xuanwu',
      nameColor: 'water',
      portrait: { emoji: '🐢', color: '#2a6f97', side: 'left' },
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      text: '"Bien. Escucha: No tengo voz, pero muevo montañas. No tengo prisa, pero llego a todas partes. Quien me ignora, tarde o temprano, me necesita. ¿Qué soy?"',
      options: [
        { label: 'El fuego', correct: false, next: 'riddle_wrong' },
        { label: 'El agua', correct: true, next: 'riddle_correct', setFlags: { riddle_correct: true, xuanwu_favor: true } },
        { label: 'El viento', correct: false, next: 'riddle_wrong' },
        { label: 'El tiempo', correct: false, next: 'riddle_wrong' },
      ],
    },

    riddle_correct: {
      speaker: 'Xuanwu',
      nameColor: 'water',
      portrait: { emoji: '🐢', color: '#2a6f97', side: 'left' },
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      text: '"...El agua. Tu propio elemento, que te sirve hasta cuando no estás dentro de él." Sus ojos antiguos casi sonríen. "Lista. Cruza — y que el río recuerde que lo respetaste."',
      next: 'ox_crossing',
    },

    riddle_wrong: {
      speaker: 'Xuanwu',
      nameColor: 'water',
      portrait: { emoji: '🐢', color: '#2a6f97', side: 'left' },
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      text: '"Mmm. No. Cabeza equivocada." La serpiente de su caparazón se desenrosca, siseando. "Entonces será con las garras. Veamos de qué estás hecha, pequeña."',
      next: 'xuanwu_fight',
    },

    /* --- Camino B: PELEA REAL (motor de pelea) --- */
    /* La Serpiente es la forma de combate del espíritu de Xuanwu (玄武). */

    xuanwu_fight: {
      type: 'fight',
      fight: {
        hero: 'rata',
        foe: 'serpiente',
        win: 'fight_win',
        lose: 'fight_lose',
      },
    },

    fight_win: {
      speaker: 'Xuanwu',
      nameColor: 'water',
      portrait: { emoji: '🐢', color: '#2a6f97', side: 'left' },
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      setFlags: { xuanwu_favor: true },
      text: 'La serpiente cae derrotada y se enrosca de nuevo, vencida. "Pequeña... pero con dientes." La tortuga se aparta. "Cruza. Te lo has ganado."',
      next: 'ox_crossing',
    },

    fight_lose: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#123048,#2a6f97)',
      setFlags: { xuanwu_favor: false },
      text: 'La serpiente te lanza al agua de un coletazo. Tragas medio río antes de arrastrarte, tosiendo, a la otra orilla. Xuanwu no te remata. "Pasa," dice apenas. "Hoy el río fue más fuerte que tú. Recuérdalo."',
      next: 'ox_crossing',
    },

    /* ============ ACTO 3 — EL CRUCE Y EL GATO ============ */

    ox_crossing: {
      speaker: 'Buey',
      nameColor: 'ink',
      portrait: { emoji: '🐂', color: '#8b6f47', side: 'right' },
      bg: 'linear-gradient(180deg,#2a6f97,#3a5f7a)',
      text: 'En mitad del cruce, el Buey avanza lento y firme contra la corriente. Te ve luchando. Sin decir casi nada, baja el lomo. "...Sube. El río no perdona a los chicos." Te subes. No vas a olvidar este favor.',
      next: 'cat_found',
    },

    cat_found: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a5f7a,#9d6b3a)',
      text: 'Ya cerca de la meta, algo conocido te corta el aliento: enroscado entre la hierba, dormido como un tronco, está el Gato. Tu amigo de toda la vida. El que te enseñó a trepar. El que no oyó el cañón de salida.',
      next: 'cat_dilemma',
    },

    cat_dilemma: {
      speaker: 'Gato',
      nameColor: 'green',
      portrait: { emoji: '🐱', color: '#7a7a8a', side: 'left' },
      bg: 'linear-gradient(180deg,#3a2c4d,#9d4b3a)',
      text: 'Ronronea, ajeno a todo. Solo los primeros doce entran al zodiaco — y la meta está a un suspiro. Si lo despiertas, es rápido: te gana. Si sigues, llegas tú... y él se queda fuera para siempre. Y nunca lo sabrá.',
      choices: [
        { label: 'Despertarlo. Es tu amigo.', tag: 'kind', next: 'cat_woken', setFlags: { gato_despierto: true } },
        { label: 'Seguir en silencio. Es tu carrera.', tag: 'bold', next: 'cat_left', setFlags: { gato_despierto: false } },
      ],
    },

    cat_woken: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a2c4d,#9d4b3a)',
      text: '"¡GATO! ¡DESPIERTA!" Abre los ojos de golpe: "¡¿QUÉ?! ¡¿YA EMPEZÓ?!" — y sale disparado como una flecha, más rápido que tú, más despierto que nunca. Sonríes corriendo detrás. Que gane el mejor. Hoy, al menos, nadie corre solo.',
      next: 'tigre_final',
    },

    cat_left: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#3a2c4d,#7a2b2b)',
      text: 'Pasas de largo, sin hacer ruido. El Gato sigue soñando, ajeno a que la historia entera está dejándolo atrás. No miras hacia atrás. Pero cada paso hacia la meta pesa un poco más que el anterior.',
      next: 'tigre_final',
    },

    /* --- Reaparece el rival, justo antes de la meta --- */

    tigre_final: {
      speaker: 'Tigre',
      nameColor: 'gold',
      portrait: { img: '../art/tigre-idle.png', side: 'right' },
      bg: 'linear-gradient(180deg,#9d6b3a,#c9a227)',
      text: (f) => f.tigre_burla === 'chulo'
        ? '*(jadeando, agotado, a tu lado)* "¿Tú?! ¿Cómo demonios...?" Te mira incrédulo mientras tú trotas fresco. Se lo dijiste: los grandes se cansan primero.'
        : '*(reventado, arrastrando las patas)* "Esto... no... se ha... acabado..." Apenas puede hablar. Tú ni sudas. Pensar cansa menos que rugir, gatito.',
      next: 'emperor_arrival',
    },

    /* ============ ACTO 4 — META + REFLEXIÓN ============ */

    emperor_arrival: {
      speaker: 'Emperador de Jade',
      nameColor: 'gold',
      portrait: { emoji: '👑', color: '#c9a227', side: 'left' },
      bg: 'linear-gradient(180deg,#3a2c00,#c9a227)',
      text: (f) => {
        if (f.gato_despierto && f.xuanwu_favor) {
          return 'Cruzas la meta — y un segundo después llega el Gato, despeinado y feliz. "Primer lugar para la Rata," declara el Emperador. Luego entorna los ojos: "¿Por qué traes a otro corredor pegado a los talones, habiendo podido dejarlo atrás?" Te encoges de hombros. "Porque ganar solo no se siente igual."';
        }
        if (f.gato_despierto && !f.xuanwu_favor) {
          return 'Llegas primera, todavía goteando el río que casi te traga, con el Gato pisándote los talones. "Primer lugar para la Rata," dice el Emperador. "Cruzaste a duras penas... y aun así despertaste a quien podía ganarte. Curioso corazón el tuyo."';
        }
        if (!f.gato_despierto && f.xuanwu_favor) {
          return 'Cruzas la meta seca y serena: el río mismo pareció abrirte paso. "Primer lugar para la Rata," anuncia el Emperador. Pero su mirada se demora en el lugar vacío a tu lado, ese hueco donde debería ir alguien. No dice nada. No hace falta.';
        }
        return 'Cruzas primera, empapada y sin aliento, pero primera. "Primer lugar para la Rata," sentencia el Emperador. La corona pesa más de lo que imaginabas. Y hay un silencio a tu lado que ninguna corona llena.';
      },
      next: 'reflection',
    },

    reflection: {
      type: 'narration',
      bg: 'linear-gradient(180deg,#1b3a5c,#0d2137)',
      text: (f) => {
        if (f.gato_despierto) {
          return 'La vieja leyenda dice que la Rata llegó primera con pura astucia, y que por su culpa el Gato se quedó fuera del zodiaco para siempre — por eso lo persigue hasta hoy. Pero tu historia se torció: ganaste sin traicionar a nadie. Quizá la leyenda estaba incompleta. Quizá ser el más listo también significa saber a quién no dejar atrás.';
        }
        return 'La vieja leyenda dice que la Rata llegó primera, y que el Gato nunca la perdonó por dejarlo dormir. Hoy reviviste esa historia, golpe por golpe. El primer lugar del zodiaco es tuyo para siempre. Pero cada año, cuando llegue tu turno en el calendario, recordarás a quién dejaste roncando junto al río.';
      },
      next: 'end',
    },

    end: {
      type: 'end',
      bg: 'linear-gradient(180deg,#1b3a5c,#0d2137)',
      title: '🐀 Primer lugar del zodiaco',
      endText: 'Completaste El Camino de la Rata. Cómo trataste al guardián, al rival y al amigo dormido decidió qué clase de ganadora eres. Cada animal del zodiaco tiene su propio camino, su propio guardián... y su propio precio.',
      restartLabel: 'Recorrer el camino otra vez',
    },
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = StoryRata;
