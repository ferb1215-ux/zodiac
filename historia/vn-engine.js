/* ============================================================
   ZODIAC ROAD — Motor de Novela Visual (VN)
   ------------------------------------------------------------
   Uso:
     const vn = new ZodiacVN(containerEl, storyScript, {
       onEnd: (flags) => { ... }   // se llama al llegar a una
                                    // escena de tipo 'end'
     });
     vn.start();

   Formato de "storyScript" (ver story-rata.js para un ejemplo
   completo y comentado):

   {
     start: 'id_de_la_primera_escena',
     scenes: {
       id_escena: {
         type: 'narration' | 'dialogue' | 'puzzle' | 'battle' | 'end',
         bg: '#0d2137' | 'linear-gradient(...)',   // opcional
         speaker: 'Rata',                          // dialogue
         nameColor: 'red'|'water'|'green'|'gold'|'ink',
         portrait: { img:'ruta.png', side:'left'|'right' }
                 | { emoji:'🐢', color:'#2a6f97', side:'left' }
                 | null,
         text: 'texto...' | (flags)=>'texto...',
         next: 'siguiente_id' | (flags)=>'siguiente_id',
         choices: [
           { label:'Opción', tag:'fight|think|kind|bold',
             next:'id', setFlags:{ clave:true } }
         ],
         // type:'puzzle'
         options: [
           { label:'...', correct:true, next:'id' },
           { label:'...', correct:false, next:'id' }
         ],
         // type:'battle'
         battle: {
           enemyName:'Xuanwu', enemyEmoji:'🐢', enemyColor:'#2a6f97',
           enemyHP:3, playerName:'Rata',
           playerPortrait:{ img:'../art/rata-ready.png' },
           onWin:'id', onLose:'id'
         },
         // type:'end'
         title:'...', endText:'...'
       }
     }
   }

   Todas las escenas pueden usar `text`/`next` como función que
   recibe el objeto `flags` acumulado por las decisiones tomadas
   — así una misma escena puede variar su texto o su destino
   según el camino recorrido.
   ============================================================ */

(function (global) {
  'use strict';

  const TYPE_SPEED_MS = 18; // velocidad de escritura por carácter

  class ZodiacVN {
    constructor(container, script, opts) {
      this.container = container;
      this.script = script;
      this.opts = opts || {};
      this.flags = Object.assign({}, this.opts.initialFlags || {});
      this._typing = false;
      this._fullText = '';
      this._typeTimer = null;
      this._battleState = null;

      this._buildDOM();
      this._bindEvents();
    }

    /* ---------------- API pública ---------------- */

    start() {
      // Si volvemos de una pelea real (index.html), retomamos en la escena
      // indicada con las flags restauradas, en vez de empezar desde el inicio.
      const resumed = this._resumeFromURL();
      if (resumed) { this.goTo(resumed); return; }
      this.goTo(this.script.start);
    }

    _resumeFromURL() {
      const q = new URLSearchParams(location.search);
      const result = q.get('vnresult');
      const scene = q.get('scene');
      if (!result || !scene) return null;
      const fb64 = q.get('flags');
      if (fb64) {
        try { this.flags = Object.assign(this.flags, JSON.parse(decodeURIComponent(escape(atob(fb64))))); }
        catch (e) { /* flags corruptas: seguimos con las que haya */ }
      }
      this.flags.lastBattleResult = result; // 'win' | 'lose'
      // Limpiamos la URL para que un refresh no repita el salto.
      try { history.replaceState(null, '', location.pathname); } catch (e) {}
      return this.script.scenes[scene] ? scene : this.script.start;
    }

    goTo(id) {
      const scene = this.script.scenes[id];
      if (!scene) {
        console.error('[ZodiacVN] Escena no encontrada:', id);
        return;
      }
      this._clearOverlays();
      this._currentId = id;

      // Algunas escenas marcan flags simplemente al entrar (sin que el
      // jugador elija nada) — útil para registrar el resultado de un
      // acertijo o batalla previa.
      if (scene.setFlags) Object.assign(this.flags, scene.setFlags);

      const type = scene.type || (scene.speaker ? 'dialogue' : 'narration');

      switch (type) {
        case 'fight':
          this._launchFight(scene);
          break;
        case 'battle':
          this._renderBattle(scene);
          break;
        case 'end':
          this._renderEnd(scene);
          break;
        case 'puzzle':
          this._renderDialogue(scene, true);
          break;
        default:
          this._renderDialogue(scene, false);
          break;
      }
    }

    /* Escena type:'fight' — lanza una batalla REAL en el motor de pelea
       (index.html) y vuelve a la historia con el resultado.
       Campos de la escena:
         fight: {
           hero:'rata', foe:'serpiente',  // ids del roster de index.html
           win:'id_escena_si_gana', lose:'id_escena_si_pierde',
           enginePath:'../index.html'     // opcional (por defecto ../index.html)
         }
    */
    _launchFight(scene) {
      const f = scene.fight || {};
      const enginePath = f.enginePath || (this.opts.enginePath || '../index.html');
      const ret = location.href.split('?')[0]; // URL absoluta de esta página, sin query
      const flagsB64 = this._encodeFlags();
      const params = new URLSearchParams({
        vn: '1',
        hero: f.hero || 'rata',
        foe: f.foe || 'serpiente',
        ret: ret,
        win: f.win || '',
        lose: f.lose || '',
        flags: flagsB64,
      });
      // Pequeño fundido para que el salto no sea brusco.
      this.el.root.style.transition = 'opacity .25s ease';
      this.el.root.style.opacity = '0';
      setTimeout(() => { location.href = enginePath + '?' + params.toString(); }, 260);
    }

    _encodeFlags() {
      try { return btoa(unescape(encodeURIComponent(JSON.stringify(this.flags)))); }
      catch (e) { return ''; }
    }

    setFlag(key, value) {
      this.flags[key] = value;
    }

    /* ---------------- construcción DOM ---------------- */

    _buildDOM() {
      const root = document.createElement('div');
      root.className = 'vn-root';
      root.innerHTML = `
        <div class="vn-bg"></div>
        <div class="vn-scenery">
          <div class="vn-glow"></div>
          <div class="vn-hill h1"><svg viewBox="0 0 1200 220" preserveAspectRatio="none"><path d="M0,220 L0,120 Q200,60 400,110 T800,90 T1200,120 L1200,220 Z"/></svg></div>
          <div class="vn-hill h2"><svg viewBox="0 0 1200 200" preserveAspectRatio="none"><path d="M0,200 L0,140 Q300,80 600,130 T1200,120 L1200,200 Z"/></svg></div>
          <div class="vn-hill h3"><svg viewBox="0 0 1200 160" preserveAspectRatio="none"><path d="M0,160 L0,120 Q250,150 500,115 T1000,120 T1200,110 L1200,160 Z"/></svg></div>
        </div>
        <div class="vn-portrait side-left" hidden></div>
        <div class="vn-bubble side-left" hidden>
          <div class="vn-bubble-name"></div>
          <div class="vn-bubble-text"></div>
          <div class="vn-bubble-cont" hidden>▼</div>
        </div>
        <div class="vn-box">
          <div class="vn-name" hidden></div>
          <div class="vn-choices" hidden></div>
          <div class="vn-puzzle" hidden></div>
          <div class="vn-text"></div>
          <div class="vn-continue" hidden>▼</div>
        </div>
      `;
      this.container.innerHTML = '';
      this.container.appendChild(root);

      // Partículas flotantes (motas de papel) — generadas una vez.
      const scenery = root.querySelector('.vn-scenery');
      for (let i = 0; i < 7; i++) {
        const m = document.createElement('div');
        m.className = 'vn-mote';
        m.style.left = (8 + Math.random() * 84) + '%';
        m.style.bottom = (Math.random() * 30) + '%';
        m.style.animationDuration = (7 + Math.random() * 7) + 's';
        m.style.animationDelay = (-Math.random() * 10) + 's';
        const sz = 5 + Math.random() * 8;
        m.style.width = sz + 'px'; m.style.height = sz + 'px';
        scenery.appendChild(m);
      }

      this.el = {
        root,
        bg: root.querySelector('.vn-bg'),
        portrait: root.querySelector('.vn-portrait'),
        box: root.querySelector('.vn-box'),
        name: root.querySelector('.vn-name'),
        choices: root.querySelector('.vn-choices'),
        puzzle: root.querySelector('.vn-puzzle'),
        text: root.querySelector('.vn-text'),
        continue: root.querySelector('.vn-continue'),
        bubble: root.querySelector('.vn-bubble'),
        bubbleName: root.querySelector('.vn-bubble-name'),
        bubbleText: root.querySelector('.vn-bubble-text'),
        bubbleCont: root.querySelector('.vn-bubble-cont'),
      };
    }

    _bindEvents() {
      const tap = (e) => {
        if (e.target.closest('.vn-choice-btn, .vn-puzzle-opt')) return;
        this._onBoxTap();
      };
      this.el.box.addEventListener('click', tap);
      this.el.bubble.addEventListener('click', tap);
    }

    _onBoxTap() {
      if (this._typing) {
        this._finishTyping();
        return;
      }
      const scene = this.script.scenes[this._currentId];
      if (scene.choices && scene.choices.length) return; // espera elección
      if (scene.type === 'puzzle') return; // espera respuesta
      const next = this._resolve(scene.next);
      if (next) this.goTo(next);
    }

    /* ---------------- render: diálogo / narración / puzzle ---------------- */

    _renderDialogue(scene, isPuzzle) {
      this._setBackground(scene.bg);
      this._setPortrait(scene.portrait);

      const speaking = !!scene.speaker;
      const hasDecision = (isPuzzle && scene.options && scene.options.length) ||
                          (scene.choices && scene.choices.length);

      // reset
      this.el.choices.hidden = true; this.el.choices.innerHTML = '';
      this.el.puzzle.hidden = true; this.el.puzzle.innerHTML = '';
      this.el.continue.hidden = true;
      this.el.bubble.hidden = true;
      this.el.bubbleCont.hidden = true;

      const text = this._resolve(scene.text) || '';
      const afterType = () => {
        if (isPuzzle && scene.options && scene.options.length) this._showPuzzle(scene);
        else if (scene.choices && scene.choices.length) this._showChoices(scene.choices);
        else if (scene.next) { if (speaking) this.el.bubbleCont.hidden = false; else this.el.continue.hidden = false; }
      };

      if (speaking) {
        // ---- diálogo de PERSONAJE: burbuja de cómic junto al retrato ----
        const side = (scene.portrait && scene.portrait.side) || 'left';
        this.el.bubble.className = 'vn-bubble side-' + side + ' c-' + (scene.nameColor || 'red');
        this.el.bubbleName.textContent = scene.speaker;
        this.el.bubble.hidden = false;
        this.el.name.hidden = true;
        this.el.text.textContent = '';
        this.el.box.classList.remove('narration');
        this.el.box.classList.toggle('hidden-box', !hasDecision); // sin decisión: oculta la caja inferior
        this._typeText(text, afterType, this.el.bubbleText);
      } else {
        // ---- NARRADOR: caja inferior ----
        this.el.box.classList.remove('hidden-box');
        this.el.box.classList.add('narration');
        this.el.name.hidden = true;
        this._typeText(text, afterType);
      }
    }

    _showChoices(choices) {
      this.el.choices.hidden = false;
      this.el.choices.innerHTML = '';
      choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.className = 'vn-choice-btn';
        if (choice.tag) btn.classList.add('tag-' + choice.tag);
        const tagLabel = {
          fight: 'COMBATE',
          think: 'PENSAR',
          kind: 'GENTILEZA',
          bold: 'AUDACIA',
        }[choice.tag];
        btn.innerHTML = (tagLabel ? `<span class="vn-choice-tag">${tagLabel}</span>` : '') + choice.label;
        btn.addEventListener('click', () => {
          if (choice.setFlags) Object.assign(this.flags, choice.setFlags);
          const next = this._resolve(choice.next);
          if (next) this.goTo(next);
        });
        this.el.choices.appendChild(btn);
      });
    }

    _showPuzzle(scene) {
      this.el.puzzle.hidden = false;
      this.el.puzzle.innerHTML = '';
      let answered = false;
      scene.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'vn-puzzle-opt';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const allBtns = this.el.puzzle.querySelectorAll('.vn-puzzle-opt');
          allBtns.forEach((b) => (b.disabled = true));
          btn.classList.add(opt.correct ? 'correct' : 'wrong');
          if (opt.setFlags) Object.assign(this.flags, opt.setFlags);
          this.setFlag('lastPuzzleCorrect', !!opt.correct);
          setTimeout(() => {
            const next = this._resolve(opt.next);
            if (next) this.goTo(next);
          }, 650);
        });
        this.el.puzzle.appendChild(btn);
      });
    }

    /* ---------------- render: batalla ---------------- */

    _renderBattle(scene) {
      const b = scene.battle;
      this._setBackground(scene.bg);
      this.el.portrait.hidden = true;
      this.el.box.style.display = 'none';

      const overlay = document.createElement('div');
      overlay.className = 'vn-battle';
      overlay.innerHTML = `
        <div class="vn-battle-bars">
          <div class="vn-bar">
            <div class="vn-bar-label"><span>${b.playerName}</span><span class="hp-player">${'❤️'.repeat(b.playerHP || 3)}</span></div>
            <div class="vn-bar-track"><div class="vn-bar-fill player" style="width:100%"></div></div>
          </div>
          <div class="vn-bar">
            <div class="vn-bar-label"><span>${b.enemyEmoji || ''} ${b.enemyName}</span><span class="hp-enemy">${'❤️'.repeat(b.enemyHP || 3)}</span></div>
            <div class="vn-bar-track"><div class="vn-bar-fill enemy" style="width:100%"></div></div>
          </div>
        </div>
        <div class="vn-battle-log">${b.intro || `¡${b.enemyName} se prepara!`}</div>
        <div class="vn-battle-actions">
          <button class="vn-battle-btn" data-move="agua"><span class="em">💧</span>Agua</button>
          <button class="vn-battle-btn" data-move="madera"><span class="em">🌿</span>Madera</button>
          <button class="vn-battle-btn" data-move="fuego"><span class="em">🔥</span>Fuego</button>
        </div>
      `;
      this.el.root.appendChild(overlay);

      const playerMax = b.playerHP || 3;
      const enemyMax = b.enemyHP || 3;
      const state = { playerHP: playerMax, enemyHP: enemyMax, playerMax, enemyMax, busy: false };
      this._battleState = { overlay, state, scene };

      const log = overlay.querySelector('.vn-battle-log');
      const playerFill = overlay.querySelector('.vn-bar-fill.player');
      const enemyFill = overlay.querySelector('.vn-bar-fill.enemy');
      const hpPlayerEl = overlay.querySelector('.hp-player');
      const hpEnemyEl = overlay.querySelector('.hp-enemy');
      const buttons = overlay.querySelectorAll('.vn-battle-btn');

      // El ciclo elemental: agua > fuego > madera > agua
      const beats = { agua: 'fuego', fuego: 'madera', madera: 'agua' };

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (state.busy) return;
          state.busy = true;
          buttons.forEach((b2) => (b2.disabled = true));

          const playerMove = btn.dataset.move;
          const moves = Object.keys(beats);
          const enemyMove = moves[Math.floor(Math.random() * moves.length)];

          let result;
          if (playerMove === enemyMove) result = 'tie';
          else if (beats[playerMove] === enemyMove) result = 'win';
          else result = 'lose';

          if (result === 'win') {
            state.enemyHP = Math.max(0, state.enemyHP - 1);
            log.textContent = `¡${playerMove} vence a ${enemyMove}! ${b.enemyName} se tambalea.`;
          } else if (result === 'lose') {
            state.playerHP = Math.max(0, state.playerHP - 1);
            log.textContent = `${b.enemyName} responde con ${enemyMove}. ¡Recibes el golpe!`;
          } else {
            log.textContent = `Ambos eligen ${playerMove}. El golpe se anula.`;
          }

          playerFill.style.width = (100 * state.playerHP / state.playerMax) + '%';
          enemyFill.style.width = (100 * state.enemyHP / state.enemyMax) + '%';
          hpPlayerEl.textContent = '❤️'.repeat(state.playerHP) + '🖤'.repeat(state.playerMax - state.playerHP);
          hpEnemyEl.textContent = (b.enemyEmoji || '') + ' ' + '❤️'.repeat(state.enemyHP) + '🖤'.repeat(state.enemyMax - state.enemyHP);

          setTimeout(() => {
            if (state.enemyHP <= 0) {
              this.setFlag('lastBattleResult', 'win');
              const next = this._resolve(b.onWin);
              if (next) this.goTo(next);
              return;
            }
            if (state.playerHP <= 0) {
              this.setFlag('lastBattleResult', 'lose');
              const next = this._resolve(b.onLose);
              if (next) this.goTo(next);
              return;
            }
            state.busy = false;
            buttons.forEach((b2) => (b2.disabled = false));
          }, 700);
        });
      });
    }

    /* ---------------- render: pantalla final ---------------- */

    _renderEnd(scene) {
      this._setBackground(scene.bg);
      this.el.portrait.hidden = true;
      this.el.box.style.display = 'none';

      const overlay = document.createElement('div');
      overlay.className = 'vn-end';
      overlay.innerHTML = `
        <div class="vn-end-card">
          <h2>${this._resolve(scene.title) || ''}</h2>
          <p>${this._resolve(scene.endText) || ''}</p>
          <button class="vn-btn vn-btn-restart">${scene.restartLabel || 'Volver a empezar'}</button>
          <button class="vn-btn vn-btn-menu">🏠 Menú del juego</button>
        </div>
      `;
      overlay.querySelector('.vn-btn-restart').addEventListener('click', () => {
        if (this.opts.onRestart) this.opts.onRestart(this.flags);
      });
      overlay.querySelector('.vn-btn-menu').addEventListener('click', () => {
        location.href = this.opts.enginePath || '../index.html';
      });
      this.el.root.appendChild(overlay);

      if (this.opts.onEnd) this.opts.onEnd(this.flags);
    }

    /* ---------------- utilidades ---------------- */

    _clearOverlays() {
      this.el.root.querySelectorAll('.vn-battle, .vn-end').forEach((n) => n.remove());
      this.el.box.style.display = '';
      this.el.portrait.hidden = false;
      this._battleState = null;
    }

    _setBackground(bg) {
      this.el.bg.style.background = bg || 'var(--vn-night)';
    }

    _setPortrait(portrait) {
      if (!portrait) {
        this.el.portrait.hidden = true;
        return;
      }
      this.el.portrait.hidden = false;
      const side = portrait.side === 'right' ? 'side-right' : 'side-left';
      this.el.portrait.className = 'vn-portrait ' + side;

      if (portrait.img) {
        this.el.portrait.innerHTML = `<img src="${portrait.img}" alt="">`;
      } else if (portrait.emoji) {
        this.el.portrait.innerHTML = `<div class="vn-medallion" style="background:${portrait.color || '#999'}">${portrait.emoji}</div>`;
      } else {
        this.el.portrait.hidden = true;
      }
    }

    _typeText(text, onDone, target) {
      const tgt = target || this.el.text;
      this._typeTarget = tgt;
      this._fullText = text;
      this._typing = true;
      tgt.textContent = '';
      clearTimeout(this._typeTimer);

      let i = 0;
      const step = () => {
        if (!this._typing) return; // se completó manualmente
        i++;
        tgt.textContent = text.slice(0, i);
        if (i >= text.length) {
          this._typing = false;
          if (onDone) onDone();
          return;
        }
        this._typeTimer = setTimeout(step, TYPE_SPEED_MS);
      };
      step();

      this._pendingDone = onDone;
    }

    _finishTyping() {
      clearTimeout(this._typeTimer);
      this._typing = false;
      (this._typeTarget || this.el.text).textContent = this._fullText;
      if (this._pendingDone) {
        const done = this._pendingDone;
        this._pendingDone = null;
        done();
      }
    }

    _resolve(value) {
      if (typeof value === 'function') return value(this.flags);
      return value;
    }
  }

  global.ZodiacVN = ZodiacVN;
})(typeof window !== 'undefined' ? window : globalThis);
