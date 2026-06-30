# Código del Álbum de cartas — Zodiac Fighters

Así está hecho el álbum. Son 3 partes: **HTML** (estructura), **CSS** (estilos) y **JavaScript** (lógica). Todo sale del `index.html` del juego.

El álbum es una **vista dividida**: a la izquierda una grilla de cartas agrupadas por secciones de colores; a la derecha, la carta seleccionada en grande. Se navega con clic o con las flechas del teclado (salta a la carta vecina según su posición visual real).

---

## 1) HTML — la estructura

```html
<div id="albumView">
  <div class="album-split">
    <!-- izquierda: grilla con scroll -->
    <div class="album-grid-wrap"><div class="sp-grid" id="spGrid"></div></div>
    <!-- derecha: la carta grande seleccionada -->
    <div class="album-detail" id="albumDetail"></div>
  </div>
</div>
<!-- barra de progreso de la colección -->
<div class="sp-progress" id="spProg"></div>
```

---

## 2) CSS — los estilos

```css
/* ---- layout dividido: grilla izq + carta der ---- */
.album-split{ display:flex; gap:14px; align-items:flex-start; }
.album-grid-wrap{ flex:1; min-width:0; overflow-y:auto; max-height:60vh; padding-right:4px; }
.album-detail{ width:236px; flex-shrink:0; position:sticky; top:0; }
.sp-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(78px,1fr)); gap:8px; }
@media (max-width:700px){ .album-detail{ width:172px; } .album-grid-wrap{ max-height:56vh; } }
@media (max-width:480px){ .album-split{ gap:8px; } .album-detail{ width:140px; } }

/* ---- secciones con color propio ---- */
.alb-sec{ grid-column:1/-1; border-radius:14px; padding:8px 10px 12px; margin:6px 0; border:1px solid #2c2a55; }
.alb-sec-h{ font-weight:900; font-size:14px; margin:2px 2px 9px; text-shadow:0 1px 2px #000; letter-spacing:.3px; }
.alb-sec-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(78px,1fr)); gap:8px; }
@media (max-width:540px){ .alb-sec-grid{ grid-template-columns:repeat(auto-fill,minmax(64px,1fr)); } }

/* ---- celda (mini-carta) de la grilla ---- */
.sp-cell{ border-radius:12px; padding:8px 3px 6px; text-align:center; cursor:pointer; background:#1b1940; border:2px solid #2c2a55; position:relative; transition:transform .1s; }
.sp-cell:active{ transform:scale(.94); }
.sp-cell .sn{ font-size:10px; font-weight:700; color:#cfd6ff; display:block; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sp-cell.locked .se{ filter:brightness(0) saturate(0); opacity:.45; }   /* sin obtener = silueta gris */
.sp-cell.locked .sn{ color:#6b6a90; }
.sp-cell .rgem{ position:absolute; top:3px; right:4px; width:9px; height:9px; border-radius:50%; box-shadow:0 0 5px currentColor; color:var(--rc); background:var(--rc); }
.sp-cell.sel{ outline:3px solid #ffd86b; outline-offset:1px; box-shadow:0 0 16px -2px #ffd86b; }  /* seleccionada */
.sp-cell img.se{ width:34px; height:34px; image-rendering:pixelated; margin:0 auto; }
.sp-cell img.se.real{ width:100%; height:auto; aspect-ratio:1/1; object-fit:cover; border-radius:8px; image-rendering:pixelated; }

/* ---- color de cada rareza (variable --rc) ---- */
.r-comun{ --rc:#9aa0ad; } .r-uncommon{ --rc:#3fc46b; } .r-rare{ --rc:#3b82f6; }
.r-epic{ --rc:#b15cff; } .r-legendario{ --rc:#ffb01f; } .r-mistico{ --rc:#ff4d8d; }
.sp-cell.owned{ border-color:var(--rc); box-shadow:0 0 10px -2px var(--rc); }

/* ============ CARTA GRANDE (.tcg) ============ */
.tcg{ position:relative; width:100%; aspect-ratio:63/88; border-radius:14px; padding:7px; box-shadow:0 10px 26px rgba(0,0,0,.5); overflow:hidden; }
.tcg-inner{ position:relative; height:100%; border-radius:9px; background:#171430; display:flex; flex-direction:column; padding:8px; gap:6px; z-index:2; }
.tcg-top{ display:flex; justify-content:space-between; align-items:baseline; gap:6px; }
.tcg-name{ font-weight:900; font-size:15px; color:#fff; text-shadow:0 1px 3px #000; line-height:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.tcg-art{ position:relative; flex:1; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; border:2px solid rgba(255,255,255,.28); }
img.tcg-emoji{ width:64%; height:auto; image-rendering:pixelated; }
img.tcg-emoji.real{ width:100%; height:100%; object-fit:cover; image-rendering:pixelated; border-radius:6px; }
.tcg-type{ font-size:10px; font-weight:800; color:#dbe2ff; background:rgba(0,0,0,.35); border-radius:6px; padding:3px 7px; text-align:center; }
/* descripción = pergamino con tipografía manuscrita (lore) */
.tcg-desc{ font-family:'Caveat','Segoe Script','Bradley Hand',cursive; font-size:15px; line-height:1.22;
  color:#3a2a16; background:linear-gradient(165deg,#f4e8cc,#e6d2a4); border:1px solid rgba(120,86,40,.45);
  border-radius:6px; padding:6px 9px 7px; max-height:40%; overflow:hidden;
  box-shadow:inset 0 0 16px rgba(120,86,40,.28); text-shadow:0 1px 0 rgba(255,255,255,.4); }
.tcg-foot{ display:flex; justify-content:space-between; font-size:9px; font-weight:800; color:#aab2e0; letter-spacing:.5px; }

/* marco exterior por rareza */
.r-comun.tcg{ background:linear-gradient(135deg,#eef2f7,#aab4c2,#7d8896); }
.r-uncommon.tcg{ background:linear-gradient(135deg,#c6f5d2,#4fc46b,#2c8d4f); }
.r-rare.tcg{ background:linear-gradient(135deg,#c2dcff,#4f8ef0,#2b5fb0); }
.r-epic.tcg{ background:linear-gradient(135deg,#e9caff,#b15cff,#7a2bd0); }
.r-legendario.tcg{ background:linear-gradient(135deg,#ffeaa8,#f6c33f,#c79a24); }
.r-mistico.tcg{ background:linear-gradient(135deg,#ff9ad1,#b15cff,#5cc8ff,#ffd86b); background-size:300% 300%; animation:misticBorder 4s ease infinite; }
@keyframes misticBorder{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
/* fondo interior por rareza (degradado + textura diagonal) */
.r-rare.tcg .tcg-inner{ background:repeating-linear-gradient(45deg, rgba(120,180,255,.06) 0 2px, transparent 2px 7px), linear-gradient(160deg,#14294b,#0b1730); }
.r-epic.tcg .tcg-inner{ background:repeating-linear-gradient(45deg, rgba(200,140,255,.06) 0 2px, transparent 2px 7px), linear-gradient(160deg,#251243,#150c2c); }
.r-legendario.tcg .tcg-inner{ background:repeating-linear-gradient(45deg, rgba(255,210,110,.07) 0 2px, transparent 2px 7px), linear-gradient(160deg,#3b2b0b,#231905); }
/* brillo holográfico (épica+) */
.tcg.holo .tcg-art::before{ content:''; position:absolute; inset:-60%; z-index:2;
  background:linear-gradient(115deg,transparent 38%,rgba(255,255,255,.55) 50%,transparent 62%);
  animation:tcgSheen 3.6s ease-in-out infinite; mix-blend-mode:overlay; pointer-events:none; }
@keyframes tcgSheen{ 0%,100%{ transform:translateX(-55%) } 50%{ transform:translateX(55%) } }
/* sello de rareza metálico + destello */
.tcg-rarbadge{ position:relative; overflow:hidden; font-size:9.5px; font-weight:900; letter-spacing:1.3px;
  text-transform:uppercase; color:#fff; background:var(--rc,#666); border-radius:999px; padding:3px 11px;
  white-space:nowrap; border:1px solid rgba(255,255,255,.5); text-shadow:0 1px 2px rgba(0,0,0,.6);
  box-shadow:0 0 12px -1px var(--rc), inset 0 1px 1px rgba(255,255,255,.55), inset 0 -2px 3px rgba(0,0,0,.32); }
.tcg-rarbadge.r-legendario{ background:linear-gradient(135deg,#fff4c8,#ffd34d,#c79a24); color:#4a3500; }
.tcg-rarbadge.r-epic::after, .tcg-rarbadge.r-legendario::after, .tcg-rarbadge.r-mistico::after{
  content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:linear-gradient(115deg,transparent 36%,rgba(255,255,255,.75) 50%,transparent 64%);
  transform:translateX(-130%); animation:badgeSheen 2.8s ease-in-out infinite; }
@keyframes badgeSheen{ 0%,18%{ transform:translateX(-130%);} 60%,100%{ transform:translateX(130%);} }
/* carta bloqueada */
.tcg.locked .tcg-emoji{ filter:brightness(0) saturate(0); opacity:.32; }
.tcg.locked .tcg-name{ color:#8a90c0; }
```

---

## 3) JavaScript — la lógica

Necesita estos datos (en el juego vienen de `spirits-data.js`):
- `SPIRITS` = objeto `{ id: {nm, em, rar, th, cat, num, desc, how} }`
- `ORDER` = array con todos los ids
- `SECTIONS` = `[{ title, ids:[...] }]` (los grupos del álbum)
- `THEME` = paleta por tema `{ tema: {g:[c1,c2], glyph, label} }`
- `RARNAME` = nombre legible de cada rareza
- `owned(id)` = `true/false` si tienes esa carta (en el juego: `localStorage`)

```javascript
const $ = id => document.getElementById(id);

/* ---- ARTE: usa art/cartas/<id>.png si existe; si no, emoji "pixelado" ---- */
const _emojiPx = {};
function pixEmoji(em, px){
  px = px || 24; const key = em + '@' + px;
  if(_emojiPx[key]) return _emojiPx[key];
  try{
    const c = document.createElement('canvas'); c.width = px; c.height = px;
    const g = c.getContext('2d'); g.imageSmoothingEnabled = false;   // <- da el look pixel-art
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = Math.floor(px*0.84) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    g.fillText(em, px/2, px*0.54);
    const url = c.toDataURL('image/png'); _emojiPx[key] = url; return url;
  }catch(e){ return ''; }
}
function artImg(id, ok, px, cls){
  const sp = SPIRITS[id]; const fb = pixEmoji(ok ? sp.em : '❔', px);
  if(ok){
    // intenta la imagen real; si no carga (onerror) cae al emoji
    return `<img class="${cls} real" src="art/cartas/${id}.png" alt="" `
         + `onerror="this.onerror=null;this.classList.remove('real');this.src='${fb}';">`;
  }
  return `<img class="${cls}" src="${fb}" alt="">`;
}

/* ---- RENDER de la grilla, agrupada por SECTIONS, cada una su color ---- */
function renderAlbum(){
  const total = ORDER.length, got = ORDER.filter(owned).length;
  $('spProg').textContent = `Colección: ${got} / ${total} espíritus`;
  const grid = $('spGrid'); grid.innerHTML = '';
  const COLORS = ['#3b82f6','#b15cff','#ff5fb0','#3fc46b','#ffb01f','#5cc8ff','#e0653a','#9c6bff','#2bd4c0'];
  const hx = c => { c = c.slice(1); return parseInt(c.slice(0,2),16)+','+parseInt(c.slice(2,4),16)+','+parseInt(c.slice(4,6),16); };

  SECTIONS.forEach((sec, si) => {
    const col = COLORS[si % COLORS.length], rgb = hx(col);
    const g = sec.ids.filter(owned).length;
    const wrap = document.createElement('div'); wrap.className = 'alb-sec';
    wrap.style.background = `rgba(${rgb},.10)`; wrap.style.borderColor = `rgba(${rgb},.42)`;
    const h = document.createElement('div'); h.className = 'alb-sec-h'; h.style.color = col;
    h.textContent = `${sec.title}  (${g}/${sec.ids.length})`; wrap.appendChild(h);
    const inner = document.createElement('div'); inner.className = 'alb-sec-grid';
    sec.ids.forEach(id => {
      const sp = SPIRITS[id], ok = owned(id);
      const c = document.createElement('div');
      c.className = `sp-cell r-${sp.rar} ${ok ? 'owned' : 'locked'}`;
      c.dataset.id = id;
      c.innerHTML = `<span class="rgem"></span>${artImg(id, ok, 16, 'se')}<span class="sn">${ok ? sp.nm : '???'}</span>`;
      c.onclick = () => selectAlbumCard(id);
      inner.appendChild(c);
    });
    wrap.appendChild(inner); grid.appendChild(wrap);
  });
  selectAlbumCard(_albumSel && SPIRITS[_albumSel] ? _albumSel : ORDER[0]);
}

/* ---- Seleccionar carta -> pinta la grande a la derecha + marca celda ---- */
let _albumSel = null;
function selectAlbumCard(id){
  if(!id) return; _albumSel = id;
  document.querySelectorAll('#spGrid .sp-cell').forEach(c => c.classList.toggle('sel', c.dataset.id === id));
  const host = $('albumDetail'); if(host) host.innerHTML = tcgCard(id, owned(id));
  const cell = document.querySelector('#spGrid .sp-cell[data-id="'+id+'"]'); if(cell) cell.scrollIntoView({block:'nearest'});
}

/* ---- Flechas: salta a la carta vecina según su POSICIÓN VISUAL real ---- */
function albumMove(key){
  const cells = [...document.querySelectorAll('#spGrid .sp-cell')];
  if(!cells.length) return;
  const cur = cells.find(c => c.dataset.id === _albumSel) || cells[0];
  const cr = cur.getBoundingClientRect(), cx = cr.left+cr.width/2, cy = cr.top+cr.height/2;
  let best = null, bestScore = 1e9;
  for(const c of cells){
    if(c === cur) continue;
    const r = c.getBoundingClientRect();
    const dx = (r.left+r.width/2) - cx, dy = (r.top+r.height/2) - cy;
    let primary, cross;
    if(key === 'ArrowRight'){ if(dx <= 6) continue; primary = dx;  cross = Math.abs(dy); }
    else if(key === 'ArrowLeft'){ if(dx >= -6) continue; primary = -dx; cross = Math.abs(dy); }
    else if(key === 'ArrowDown'){ if(dy <= 6) continue; primary = dy;  cross = Math.abs(dx); }
    else { if(dy >= -6) continue; primary = -dy; cross = Math.abs(dx); }
    const score = primary + cross*2;   // avanza en esa dirección, priorizando alineación
    if(score < bestScore){ bestScore = score; best = c; }
  }
  if(best) selectAlbumCard(best.dataset.id);
}
addEventListener('keydown', e => {
  if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(e.key)){ albumMove(e.key); e.preventDefault(); }
});

/* ---- La CARTA GRANDE (componente .tcg) como string HTML ---- */
function tcgCard(id, ok){
  const sp = SPIRITS[id], th = THEME[sp.th] || THEME.leyenda;
  const holo = sp.rar === 'epic' || sp.rar === 'legendario' || sp.rar === 'mistico';  // brillo desde épica
  return `<div class="tcg r-${sp.rar}${holo ? ' holo' : ''}${ok ? '' : ' locked'}">
    <div class="tcg-inner">
      <div class="tcg-top"><span class="tcg-name">${ok ? sp.nm : '???'}</span><span class="tcg-rarbadge r-${sp.rar}">${RARNAME[sp.rar]}</span></div>
      <div class="tcg-art" style="background:linear-gradient(160deg,${th.g[0]},${th.g[1]})">${artImg(id, ok, 26, 'tcg-emoji')}</div>
      <div class="tcg-type">${th.glyph} ${th.label} · ${sp.cat}</div>
      <div class="tcg-desc">${ok ? sp.desc : '🔒 Cómo conseguirla: ' + sp.how}</div>
      <div class="tcg-foot"><span>Nº ${sp.num}/${ORDER.length}</span><span>${th.label}</span></div>
    </div>
  </div>`;
}

renderAlbum();  // arrancar
```

---

### Cómo encaja todo

1. `renderAlbum()` recorre `SECTIONS` y por cada una crea un bloque de color con sus celdas (`.sp-cell`).
2. Cada celda muestra una **gema de rareza**, el **arte** (imagen real o emoji pixelado) y el **nombre** (o `???` si no la tienes).
3. Al hacer **clic** (o mover con **flechas**) se llama a `selectAlbumCard(id)`, que dibuja la carta grande con `tcgCard(id)` en `#albumDetail`.
4. La rareza controla colores y efectos vía la clase `r-<rareza>` y la variable CSS `--rc`. De **épica** para arriba se añade el brillo holográfico y el destello del sello.
