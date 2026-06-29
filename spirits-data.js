/* ============================================================
   ZODIAC FIGHTERS — Catálogo de espíritus coleccionables
   Compartido por index.html (juego) y cartas.html (álbum).
   Define globalThis.ZF_COLLECT (pool de la Máquina) y ZF_STREAK (set de racha).
   Cada item: [id, nombre, emoji, rareza, descripcion, tema?]
   ============================================================ */
(function(G){
  const C=[];
  function add(title,th,items){ C.push({title,th,items}); }
  // expande lista corta -> tuplas. arr item: [nm, em, rar?, desc?, th?]
  function ex(prefix,th,defRar,defDesc,arr){
    return arr.map((x,i)=>[prefix+'_'+i, x[0], x[1]||'✨', x[2]||defRar, x[3]||defDesc, x[4]||th]);
  }

  /* ---------- 1) Leyendas del Zodiaco chino + WONEJO ---------- */
  add('Leyendas del Zodiaco','leyenda',[
   ['l_gato','El Gato Engañado','🐈','rare','La Rata lo engañó para que llegara tarde a la Gran Carrera; por eso no es del zodiaco.','leyenda'],
   ['l_jade','Emperador de Jade','👑','legendario','Soberano del cielo que convocó la Gran Carrera para ordenar los 12 signos.','leyenda'],
   ['l_qinglong','Dragón Azur','🐲','epic','Guardián del Este y la primavera; domina el viento y la lluvia.','viento'],
   ['l_zhuque','Fénix Bermellón','🐦‍🔥','epic','Ave de fuego del Sur, símbolo del verano y el renacer.','fuego'],
   ['l_baihu','Tigre Blanco','🐯','epic','Bestia del Oeste y del otoño; protector contra los demonios.','metal'],
   ['l_xuanwu','Tortuga Negra','🐢','epic','Guardián del Norte y del invierno: tortuga y serpiente unidas.','agua'],
   ['l_qilin','Qilin','🦄','legendario','Bestia sagrada que aparece junto a los sabios y trae fortuna.','leyenda'],
   ['l_nian','Nian','👹','rare','Monstruo que atacaba en Año Nuevo; teme al rojo y a los petardos.','leyenda'],
   ['l_yinyang','Yin-Yang','☯️','rare','El equilibrio de fuerzas opuestas que mueve el universo.','leyenda'],
   ['l_sol','Sol de Papel','☀️','comun','El astro que ilumina cada escenario de papel.','fuego'],
   ['l_luna','Luna de Papel','🌙','comun','Vela por las peleas nocturnas del Lago Lunar.','leyenda'],
   ['l_wonejo','WONEJO MALO','😈','mistico','La mascota maldita del estudio. Solo aparece para los coleccionistas más obsesivos.','leyenda']
  ]);

  /* ---------- 2) Horóscopo occidental ---------- */
  add('Horóscopo Occidental','leyenda',[
   ['z_aries','Aries','♈','comun','21 mar–19 abr. Fuego. Impulsivo y valiente.','fuego'],
   ['z_tauro','Tauro','♉','comun','20 abr–20 may. Tierra. Terco e inamovible.','tierra'],
   ['z_geminis','Géminis','♊','uncommon','21 may–20 jun. Aire. Dos mentes en un cuerpo.','viento'],
   ['z_cancer','Cáncer','♋','uncommon','21 jun–22 jul. Agua. Coraza dura, corazón blando.','agua'],
   ['z_leo','Leo','♌','rare','23 jul–22 ago. Fuego. Nació para reinar.','fuego'],
   ['z_virgo','Virgo','♍','comun','23 ago–22 sep. Tierra. Perfeccionista letal.','tierra'],
   ['z_libra','Libra','♎','uncommon','23 sep–22 oct. Aire. Busca el golpe balanceado.','viento'],
   ['z_escorpio','Escorpio','♏','rare','23 oct–21 nov. Agua. Aguijón venenoso.','agua'],
   ['z_sagitario','Sagitario','♐','uncommon','22 nov–21 dic. Fuego. Arquero que no falla.','fuego'],
   ['z_capricornio','Capricornio','♑','comun','22 dic–19 ene. Tierra. Escala cualquier muro.','tierra'],
   ['z_acuario','Acuario','♒','uncommon','20 ene–18 feb. Aire. Rebelde imprevisible.','viento'],
   ['z_piscis','Piscis','♓','comun','19 feb–20 mar. Agua. Fluye entre dos mundos.','agua']
  ]);

  /* ---------- 3) Mitología Maya y Azteca ---------- */
  add('Mitología Maya y Azteca','maya',[
   ['m_quetzal','Quetzalcóatl','🪶','legendario','La Serpiente Emplumada. Dios del viento y la sabiduría.'],
   ['m_tezca','Tezcatlipoca','🐆','epic','El Espejo Humeante. Dios de la noche y el destino.'],
   ['m_kukulkan','Kukulkán','🐍','epic','Serpiente emplumada maya; baja por Chichén Itzá en los equinoccios.'],
   ['m_itzamna','Itzamná','🦎','rare','Dios maya creador, señor del cielo y la escritura.'],
   ['m_ahpuch','Ah Puch','💀','rare','Señor maya de la muerte y del inframundo, Xibalbá.'],
   ['m_balam','Balam Jaguar','🐾','uncommon','Guardián jaguar de los pueblos y los campos.'],
   ['m_huitzilo','Huitzilopochtli','🦅','epic','Dios azteca del sol y la guerra.'],
   ['m_tlaloc','Tláloc','🌧️','rare','Dios azteca de la lluvia y la fertilidad.'],
   ['m_coatlicue','Coatlicue','🐍','rare','Madre de los dioses, la de la falda de serpientes.'],
   ['m_xolotl','Xólotl','🐕','uncommon','Perro divino que guía a las almas al inframundo.'],
   ['m_mictlan','Mictlantecuhtli','💀','epic','Señor azteca del Mictlán, la tierra de los muertos.'],
   ['m_chac','Chaac','🌩️','uncommon','Dios maya de la lluvia y el trueno.']
  ]);

  /* ---------- 4) Dioses de Egipto ---------- */
  add('Dioses de Egipto','egipto',[
   ['e_ra','Ra','🌞','legendario','Dios del sol; cada noche cruza el inframundo y renace.'],
   ['e_anubis','Anubis','🐺','epic','Guía de las almas y guardián del juicio.'],
   ['e_horus','Horus','🦅','epic','Dios halcón del cielo y la realeza; su ojo todo lo ve.'],
   ['e_osiris','Osiris','⚰️','epic','Señor del más allá; murió y resucitó para reinar.'],
   ['e_bastet','Bastet','🐈‍⬛','rare','Diosa gata de la protección y la alegría.'],
   ['e_thoth','Thoth','📜','rare','Dios de la sabiduría, la escritura y la luna.'],
   ['e_set','Set','🌩️','uncommon','Dios del caos, las tormentas y el desierto.'],
   ['e_anj','Anj','☥','comun','La llave de la vida eterna del antiguo Egipto.'],
   ['e_isis','Isis','🪽','epic','Diosa de la magia y la maternidad.'],
   ['e_sobek','Sobek','🐊','rare','Dios cocodrilo del Nilo y la fuerza.'],
   ['e_sekhmet','Sekhmet','🦁','epic','Diosa leona de la guerra y la curación.'],
   ['e_amon','Amón-Ra','☀️','legendario','Rey de los dioses, oculto y todopoderoso.'],
   ['e_hathor','Hathor','🐄','rare','Diosa del amor, la música y la alegría.'],
   ['e_geb','Geb','🌍','uncommon','Dios de la tierra, padre de los cultivos.'],
   ['e_nut','Nut','🌌','rare','Diosa del cielo que cubre el mundo con su cuerpo.'],
   ['e_maat','Maat','🪶','uncommon','Diosa de la verdad, el orden y la justicia.']
  ]);

  /* ---------- 5) Mitología Griega ---------- */
  add('Mitología Griega','griego', ex('gk','griego','rare','Figura de la mitología griega.',[
   ['Zeus','⚡','legendario','Rey del Olimpo, dios del cielo y el rayo.'],
   ['Hera','👑','epic','Reina de los dioses, del matrimonio y la familia.'],
   ['Poseidón','🔱','legendario','Dios del mar, los terremotos y los caballos.'],
   ['Hades','💀','epic','Señor del inframundo y la riqueza oculta.'],
   ['Atenea','🦉','epic','Diosa de la sabiduría y la estrategia.'],
   ['Apolo','🌞','epic','Dios del sol, la música y la profecía.'],
   ['Artemisa','🏹','epic','Diosa de la caza y la luna.'],
   ['Ares','⚔️','rare','Dios brutal de la guerra.'],
   ['Afrodita','💗','epic','Diosa del amor y la belleza.'],
   ['Hefesto','🔨','rare','Dios herrero del fuego y la forja.'],
   ['Hermes','🪽','rare','Mensajero veloz de los dioses.'],
   ['Dioniso','🍇','rare','Dios del vino y la fiesta.'],
   ['Deméter','🌾','rare','Diosa de la cosecha y las estaciones.'],
   ['Hestia','🔥','uncommon','Diosa del hogar y el fuego sagrado.'],
   ['Perséfone','🌷','rare','Reina del inframundo y la primavera.'],
   ['Gaia','🌍','legendario','La Tierra primordial, madre de todo.'],
   ['Urano','🌌','epic','El cielo primordial.'],
   ['Cronos','⏳','epic','Titán del tiempo que devoró a sus hijos.'],
   ['Rea','🌙','rare','Titánide madre de los olímpicos.'],
   ['Helios','☀️','rare','Titán que conduce el carro del sol.'],
   ['Selene','🌕','uncommon','Titánide de la luna.'],
   ['Eos','🌅','uncommon','Diosa del amanecer.'],
   ['Nix','🌑','epic','Diosa primordial de la noche.'],
   ['Prometeo','🔥','epic','Titán que robó el fuego para los humanos.'],
   ['Atlas','🪨','rare','Titán que sostiene el cielo.'],
   ['Pan','🐐','uncommon','Dios de los pastores y la naturaleza salvaje.'],
   ['Eros','🏹','uncommon','Dios del deseo y el amor.'],
   ['Niké','🪽','rare','Diosa alada de la victoria.'],
   ['Iris','🌈','uncommon','Mensajera del arcoíris.'],
   ['Hécate','🕯️','epic','Diosa de la magia y los cruces de caminos.'],
   ['Némesis','⚖️','rare','Diosa de la venganza justa.'],
   ['Tique','🍀','uncommon','Diosa de la fortuna.'],
   ['Hipnos','😴','uncommon','Dios del sueño.'],
   ['Tánatos','🦴','rare','Dios de la muerte apacible.'],
   ['Medusa','🐍','epic','Gorgona cuya mirada petrifica.'],
   ['Pegaso','🐴','epic','Caballo alado nacido de Medusa.'],
   ['Minotauro','🐂','rare','Bestia del laberinto de Creta.'],
   ['Hidra','🐉','epic','Serpiente de muchas cabezas que se regeneran.'],
   ['Cerbero','🐕','epic','Perro de tres cabezas que guarda el inframundo.'],
   ['Quimera','🦁','epic','Monstruo de león, cabra y serpiente.'],
   ['Esfinge','🦁','rare','Guardiana de enigmas mortales.'],
   ['Grifo','🦅','rare','Mitad águila, mitad león.'],
   ['Centauro','🐎','uncommon','Mitad hombre, mitad caballo.'],
   ['Sátiro','🐐','comun','Espíritu juguetón del bosque.'],
   ['Sirena','🧜','rare','Su canto hechiza a los marineros.'],
   ['Harpía','🪶','uncommon','Criatura alada que roba y atormenta.'],
   ['Tifón','🌪️','legendario','El monstruo más temible, padre de bestias.'],
   ['Equidna','🐍','rare','Madre de los monstruos.'],
   ['Hércules','💪','epic','Héroe de los doce trabajos.'],
   ['Aquiles','🛡️','rare','Héroe invulnerable salvo en su talón.'],
   ['Perseo','🗡️','rare','Héroe que decapitó a Medusa.'],
   ['Teseo','🧵','uncommon','Vencedor del Minotauro.'],
   ['Odiseo','🚢','rare','Astuto rey de Ítaca.'],
   ['Cíclope','👁️','uncommon','Gigante de un solo ojo.'],
   ['Caronte','⛵','uncommon','Barquero de las almas en el río Estigia.']
  ]));

  /* ---------- 6) Mitología Nórdica ---------- */
  add('Mitología Nórdica','nordico', ex('no','nordico','rare','Figura de la mitología nórdica.',[
   ['Odín','👁️','legendario','El Padre de Todo, dios de la sabiduría y la guerra.'],
   ['Thor','🔨','legendario','Dios del trueno; empuña el martillo Mjölnir.'],
   ['Loki','🦊','epic','Dios embaucador del engaño y el fuego.'],
   ['Freya','💛','epic','Diosa del amor, la guerra y la magia seidr.'],
   ['Frigg','🕊️','rare','Reina de Asgard, diosa del destino.'],
   ['Baldr','🌟','epic','Dios de la luz y la pureza.'],
   ['Heimdall','📯','epic','Centinela del puente Bifröst.'],
   ['Tyr','🤚','rare','Dios del valor que perdió su mano con Fenrir.'],
   ['Njord','🌊','rare','Dios del mar y los vientos favorables.'],
   ['Freyr','🌾','rare','Dios de la fertilidad y la cosecha.'],
   ['Idun','🍎','uncommon','Guardiana de las manzanas de la juventud.'],
   ['Bragi','🎶','uncommon','Dios de la poesía.'],
   ['Hel','💀','epic','Reina del reino de los muertos.'],
   ['Fenrir','🐺','epic','El lobo monstruoso destinado a devorar a Odín.'],
   ['Jörmungandr','🐍','epic','La serpiente que rodea el mundo.'],
   ['Sleipnir','🐎','rare','El caballo de ocho patas de Odín.'],
   ['Huginn','🐦‍⬛','uncommon','Cuervo del pensamiento de Odín.'],
   ['Muninn','🐦‍⬛','uncommon','Cuervo de la memoria de Odín.'],
   ['Yggdrasil','🌳','legendario','El fresno cósmico que une los nueve mundos.'],
   ['Valquiria','🪽','rare','Guerrera que lleva a los caídos al Valhalla.'],
   ['Jötun','🏔️','uncommon','Gigante elemental de Jötunheim.'],
   ['Ymir','🧊','epic','Gigante primordial de cuyo cuerpo nació el mundo.'],
   ['Surt','🔥','epic','Gigante de fuego que incendiará el mundo.'],
   ['Ratatoskr','🐿️','comun','Ardilla mensajera del Yggdrasil.'],
   ['Nidhogg','🐉','rare','Dragón que roe las raíces del árbol del mundo.'],
   ['Mjölnir','🔨','rare','El martillo que siempre vuelve a la mano de Thor.'],
   ['Gungnir','🔱','uncommon','La lanza infalible de Odín.'],
   ['Bifröst','🌈','rare','El puente arcoíris hacia Asgard.'],
   ['Valhalla','🏛️','epic','El gran salón de los guerreros caídos.'],
   ['Ragnarök','☄️','legendario','El crepúsculo de los dioses.'],
   ['Skadi','🎿','uncommon','Diosa del invierno y la caza.'],
   ['Vidar','🥾','rare','Dios del silencio y la venganza.'],
   ['Ull','🏹','uncommon','Dios del tiro con arco y el esquí.'],
   ['Sif','🌾','uncommon','Diosa de cabellos de oro, esposa de Thor.'],
   ['Angrboda','🐺','rare','Giganta madre de los monstruos de Loki.'],
   ['Garm','🐕','rare','El perro que guarda Helheim.']
  ]));

  /* ---------- 7) Mitología Japonesa (kami y yōkai) ---------- */
  add('Mitología Japonesa','japon', ex('jp','japon','rare','Kami o yōkai del folclore japonés.',[
   ['Amaterasu','🌅','legendario','Diosa del sol, ancestro de los emperadores.'],
   ['Susanoo','🌊','epic','Dios de las tormentas y el mar.'],
   ['Tsukuyomi','🌙','epic','Dios de la luna.'],
   ['Raijin','🥁','epic','Dios del trueno con sus tambores.'],
   ['Fujin','🌬️','epic','Dios del viento con su saco de vientos.'],
   ['Inari','🦊','epic','Deidad del arroz y la prosperidad.'],
   ['Izanagi','🗡️','legendario','Dios creador de las islas de Japón.'],
   ['Izanami','🌑','epic','Diosa creadora y señora del Yomi.'],
   ['Hachiman','🏹','rare','Dios de la guerra y los arqueros.'],
   ['Benzaiten','🎼','rare','Diosa de la música y el agua.'],
   ['Ebisu','🎣','uncommon','Dios de la pesca y la fortuna.'],
   ['Daikokuten','🔨','uncommon','Dios de la riqueza y la cosecha.'],
   ['Bishamon','🛡️','rare','Dios guerrero protector.'],
   ['Tengu','👺','rare','Espíritu de montaña con nariz larga y alas.'],
   ['Kappa','🐢','uncommon','Duende acuático con un plato de agua en la cabeza.'],
   ['Oni','👹','rare','Ogro demoníaco de gran fuerza.'],
   ['Kitsune','🦊','epic','Zorro mágico de múltiples colas.'],
   ['Tanuki','🦝','uncommon','Perro-mapache cambiaformas y travieso.'],
   ['Yuki-onna','❄️','rare','Mujer de las nieves que congela a los viajeros.'],
   ['Rokurokubi','👤','uncommon','Yōkai de cuello extensible.'],
   ['Ryujin','🐉','legendario','Dios dragón del mar y las mareas.'],
   ['Bakeneko','🐈','uncommon','Gato sobrenatural transformista.'],
   ['Nekomata','🐈‍⬛','rare','Gato de dos colas con poderes oscuros.'],
   ['Jorogumo','🕷️','rare','Araña que adopta forma de mujer.'],
   ['Namazu','🐟','rare','Pez gigante que provoca terremotos.'],
   ['Shisa','🦁','uncommon','León-perro guardián de Okinawa.'],
   ['Komainu','🐕','uncommon','Perros-león que custodian los templos.'],
   ['Baku','🦤','uncommon','Devorador de pesadillas.'],
   ['Gashadokuro','💀','epic','Esqueleto gigante de los muertos sin sepultura.'],
   ['Nurarihyon','👴','rare','El supremo comandante de los yōkai.'],
   ['Amabie','🧜','rare','Espíritu marino que predice y aleja plagas.'],
   ['Kodama','🌳','comun','Espíritu de los árboles antiguos.'],
   ['Zashiki-warashi','🧒','uncommon','Espíritu infantil que trae fortuna al hogar.'],
   ['Karasu-tengu','🐦‍⬛','rare','Tengu cuervo, maestro de las artes marciales.'],
   ['Daruma','🎎','comun','Muñeco de la perseverancia y los deseos.'],
   ['Maneki-neko','🐱','uncommon','Gato de la suerte que invita la fortuna.'],
   ['Kirin','🦒','legendario','Bestia sagrada de buen augurio.'],
   ['Tsuchigumo','🕸️','rare','Araña-tierra monstruosa.'],
   ['Umibozu','🌊','epic','Espíritu colosal que hunde barcos.'],
   ['Kasa-obake','☂️','comun','Paraguas viejo convertido en yōkai.'],
   ['Funayurei','⛩️','uncommon','Fantasmas de ahogados que piden un cucharón.'],
   ['Tengoku','🕊️','rare','Guardián celestial del cielo budista.'],
   ['Shinigami','⚰️','epic','Espíritu de la muerte japonés.'],
   ['Hannya','🎭','rare','Máscara del espíritu de los celos.'],
   ['Yamata','🐉','legendario','Yamata no Orochi, serpiente de ocho cabezas.']
  ]));

  /* ---------- 8) Dioses Hindúes ---------- */
  add('Dioses Hindúes','hindu', ex('hi','hindu','rare','Deidad del panteón hindú.',[
   ['Brahma','🪷','legendario','El creador del universo.'],
   ['Vishnú','🟦','legendario','El preservador del cosmos.'],
   ['Shiva','🔱','legendario','El destructor y transformador.'],
   ['Lakshmi','🪷','epic','Diosa de la riqueza y la fortuna.'],
   ['Parvati','⛰️','epic','Diosa del amor y la devoción.'],
   ['Saraswati','🎵','epic','Diosa del conocimiento y las artes.'],
   ['Ganesha','🐘','epic','El que remueve los obstáculos.'],
   ['Hanuman','🐒','epic','Dios mono de la fuerza y la lealtad.'],
   ['Krishna','🪈','epic','Avatar de Vishnú, dios de la compasión.'],
   ['Rama','🏹','rare','Príncipe ideal, héroe del Ramayana.'],
   ['Durga','🗡️','epic','Diosa guerrera que cabalga un tigre.'],
   ['Kali','🌑','epic','Diosa del tiempo y la destrucción.'],
   ['Indra','⚡','rare','Rey de los dioses y del trueno.'],
   ['Agni','🔥','rare','Dios del fuego sagrado.'],
   ['Vayu','🌬️','uncommon','Dios del viento.'],
   ['Varuna','🌊','rare','Dios de las aguas y el orden cósmico.'],
   ['Surya','☀️','rare','Dios del sol en su carro.'],
   ['Chandra','🌙','uncommon','Dios de la luna.'],
   ['Yama','💀','rare','Señor de la muerte y la justicia.'],
   ['Kubera','💰','uncommon','Dios de la riqueza y tesorero divino.'],
   ['Garuda','🦅','epic','Ave divina, montura de Vishnú.'],
   ['Naga','🐍','rare','Seres serpiente guardianes de tesoros.'],
   ['Nandi','🐂','uncommon','El toro sagrado, montura de Shiva.'],
   ['Ganga','🌊','rare','Diosa del río sagrado.'],
   ['Kamadeva','🏹','uncommon','Dios del amor y el deseo.'],
   ['Shesha','🐉','epic','La serpiente cósmica sobre la que reposa Vishnú.']
  ]));

  /* ---------- 9) Folclore Asiático ---------- */
  add('Folclore Asiático','asia', ex('as','asia','rare','Ser del folclore asiático.',[
   ['Sun Wukong','🐵','legendario','El Rey Mono, héroe de Viaje al Oeste.'],
   ['Chang E','🌕','epic','La diosa china que habita la luna.'],
   ['Hou Yi','🏹','rare','El arquero que derribó nueve soles.'],
   ['Conejo de Jade','🐇','rare','Compañero de Chang E que muele el elixir.'],
   ['Nezha','🔥','epic','Niño deidad de las ruedas de fuego.'],
   ['Pangu','🪓','legendario','El gigante que separó el cielo de la tierra.'],
   ['Nuwa','🐍','epic','Diosa creadora que reparó el cielo.'],
   ['Guan Yu','⚔️','rare','General divinizado como dios de la guerra.'],
   ['Bai Suzhen','🐍','rare','La Serpiente Blanca enamorada.'],
   ['Jiangshi','🧟','uncommon','Vampiro chino que salta rígido.'],
   ['Dokkaebi','👹','rare','Duende coreano travieso y poderoso.'],
   ['Gumiho','🦊','epic','Zorra coreana de nueve colas.'],
   ['Haetae','🦁','rare','Bestia coreana de la justicia y el fuego.'],
   ['Bulgasari','🐻','uncommon','Criatura coreana que devora metal.'],
   ['Garuda Bali','🦅','rare','Ave divina balinesa, vehículo de Vishnú.'],
   ['Barong','🦁','epic','Espíritu protector balinés del bien.'],
   ['Rangda','👹','epic','Reina demonio balinesa, eterna rival de Barong.'],
   ['Aswang','🦇','rare','Cambiaformas temido del folclore filipino.'],
   ['Tikbalang','🐴','uncommon','Espíritu filipino con cabeza de caballo.'],
   ['Yeti','❄️','rare','El hombre de las nieves del Himalaya.'],
   ['León de las Nieves','🦁','rare','Criatura celeste del Tíbet.'],
   ['Naga Real','🐉','epic','Serpiente sagrada de los ríos del sudeste asiático.'],
   ['Phoenix Bermellón','🔥','epic','El Fenghuang, ave de la virtud.'],
   ['Baku Chino','🐘','uncommon','Quimera devoradora de sueños.']
  ]));

  /* ---------- 10) Planetas y Cosmos ---------- */
  add('Planetas y Cosmos','cosmos', ex('cos','cosmos','uncommon','Cuerpo o fenómeno del cosmos.',[
   ['Sol','☀️','legendario','La estrella que da vida al sistema solar.'],
   ['Mercurio','☿️','uncommon','El planeta más cercano al Sol.'],
   ['Venus','♀️','uncommon','El lucero del alba, abrasador.'],
   ['Tierra','🌍','rare','Nuestro hogar azul.'],
   ['Marte','♂️','rare','El planeta rojo.'],
   ['Júpiter','🪐','epic','El gigante gaseoso y su gran mancha.'],
   ['Saturno','🪐','epic','El señor de los anillos.'],
   ['Urano','🔵','rare','El gigante de hielo inclinado.'],
   ['Neptuno','🔵','rare','El planeta de los vientos más veloces.'],
   ['Plutón','🟤','uncommon','El planeta enano del cinturón de Kuiper.'],
   ['Luna','🌕','rare','El satélite que rige las mareas.'],
   ['Ceres','⚪','comun','El mayor cuerpo del cinturón de asteroides.'],
   ['Eris','⚪','uncommon','Planeta enano lejano y helado.'],
   ['Cometa','☄️','rare','Bola de hielo con cola luminosa.'],
   ['Asteroide','🪨','comun','Roca errante del espacio.'],
   ['Agujero Negro','🕳️','legendario','Ni la luz escapa de su atracción.'],
   ['Supernova','💥','epic','La muerte explosiva de una estrella.'],
   ['Nebulosa','🌫️','rare','Cuna de nuevas estrellas.'],
   ['Quásar','🔦','epic','Faro brillante de galaxias lejanas.'],
   ['Vía Láctea','🌌','epic','Nuestra galaxia espiral.'],
   ['Estrella Fugaz','🌠','uncommon','Meteoro que cruza el cielo.'],
   ['Galaxia','🌀','rare','Isla de miles de millones de estrellas.'],
   ['Púlsar','📡','rare','Estrella de neutrones que late.'],
   ['Aurora','🌈','uncommon','Luces del cielo polar.'],
   ['Eclipse','🌑','rare','Cuando un astro oculta a otro.'],
   ['Titán','🟠','rare','La luna de metano de Saturno.'],
   ['Europa','🧊','rare','Luna helada de Júpiter con océano oculto.'],
   ['Ío','🌋','uncommon','La luna volcánica de Júpiter.'],
   ['Fobos','🪨','comun','Luna marciana con forma de papa.'],
   ['Materia Oscura','🌑','epic','La masa invisible del universo.']
  ]));

  /* ---------- 11) Constelaciones (las 88 oficiales) ---------- */
  const CON=['Andrómeda','Antlia','Apus','Acuario','Águila','Ara','Aries','Auriga','Boyero','Caelum','Camelopardalis','Cáncer','Canes Venatici','Can Mayor','Can Menor','Capricornio','Carina','Casiopea','Centauro','Cefeo','Cetus','Camaleón','Circinus','Columba','Coma Berenices','Corona Austral','Corona Boreal','Cuervo','Crátera','Cruz del Sur','Cisne','Delphinus','Dorado','Dragón','Equuleus','Erídano','Fornax','Géminis','Grus','Hércules','Horologium','Hidra','Hydrus','Indus','Lacerta','Leo','Leo Menor','Lepus','Libra','Lupus','Lince','Lira','Mensa','Microscopium','Monoceros','Musca','Norma','Octans','Ofiuco','Orión','Pavo','Pegaso','Perseo','Fénix','Pictor','Piscis','Piscis Austrinus','Puppis','Pyxis','Reticulum','Sagitta','Sagitario','Escorpio','Sculptor','Scutum','Serpens','Sextans','Tauro','Telescopium','Triángulo','Triángulo Austral','Tucana','Osa Mayor','Osa Menor','Vela','Virgo','Volans','Vulpecula'];
  const CON_RARE={'Orión':'epic','Osa Mayor':'epic','Osa Menor':'rare','Cruz del Sur':'rare','Cisne':'rare','Dragón':'rare','Pegaso':'rare','Lira':'rare','Casiopea':'rare','Hércules':'rare','Hidra':'uncommon','Centauro':'rare','Andrómeda':'rare','Perseo':'rare','Sagitario':'uncommon','Escorpio':'uncommon','Leo':'uncommon','Tauro':'uncommon'};
  add('Constelaciones','cosmos', CON.map((nm,i)=>['con_'+i,nm,(i%5===0?'🌟':'✨'),CON_RARE[nm]||'comun','Una de las 88 constelaciones oficiales del cielo nocturno.','cosmos']));

  /* ---------- 12) Gemas y Minerales ---------- */
  add('Gemas y Minerales','gema', ex('gem','gema','comun','Gema preciosa de poder coleccionable.',[
   ['Diamante','💎','legendario','La gema más dura y brillante.'],['Rubí','🔴','epic','Roja como el fuego, símbolo de pasión.'],
   ['Zafiro','🔵','epic','Azul profundo de la sabiduría.'],['Esmeralda','🟢','epic','Verde intenso de la prosperidad.'],
   ['Amatista','🟣','rare','Cuarzo violeta que calma la mente.'],['Topacio','🟡','rare','Cálido como un atardecer.'],
   ['Ópalo','🌈','rare','Juego de colores irisados.'],['Perla','⚪','rare','Tesoro nacido en el mar.'],
   ['Jade','🟩','rare','Piedra sagrada de Oriente.'],['Turquesa','🟦','uncommon','Azul celeste protector.'],
   ['Granate','🟥','uncommon','Rojo oscuro de la vitalidad.'],['Aguamarina','🩵','uncommon','Azul mar de los navegantes.'],
   ['Peridoto','🟢','uncommon','Verde oliva del sol.'],['Citrino','🟡','uncommon','Amarillo de la abundancia.'],
   ['Cuarzo','⚪','comun','Cristal versátil y abundante.'],['Obsidiana','⚫','rare','Vidrio volcánico cortante.'],
   ['Lapislázuli','🔵','rare','Azul ultramar de los faraones.'],['Malaquita','🟢','uncommon','Verde con bandas hipnóticas.'],
   ['Ámbar','🟠','uncommon','Resina fósil que atrapa el tiempo.'],['Ónix','⚫','uncommon','Negro de la firmeza.'],
   ['Coral','🪸','uncommon','Joya viva del océano.'],['Tanzanita','🟦','rare','Azul violáceo muy escaso.'],
   ['Alejandrita','🟣','epic','Cambia de color con la luz.'],['Espinela','🔴','rare','Confundida por siglos con el rubí.'],
   ['Morganita','🩷','uncommon','Rosa suave de la ternura.'],['Heliotropo','🟢','uncommon','Verde con motas rojas.'],
   ['Cornalina','🟠','comun','Naranja de la energía.'],['Fluorita','🟣','comun','Multicolor y luminiscente.'],
   ['Pirita','🟡','comun','El oro de los tontos.'],['Hematita','⚫','comun','Metálica y protectora.'],
   ['Selenita','⚪','uncommon','Blanca lunar y serena.'],['Labradorita','🌈','rare','Destellos azules ocultos.'],
   ['Rodocrosita','🩷','uncommon','Rosa con bandas del corazón.'],['Sodalita','🔵','comun','Azul de la lógica.'],
   ['Aventurina','🟢','comun','Verde de la suerte.'],['Calcita','⚪','comun','Cristal de muchas formas.'],
   ['Berilo','🟢','uncommon','Familia de esmeralda y aguamarina.'],['Circón','🔆','uncommon','Brillo que rivaliza el diamante.'],
   ['Kunzita','🩷','rare','Rosa lila de la calma.'],['Larimar','🩵','rare','Azul caribeño único.'],
   ['Apatita','🔵','comun','Mineral de tonos vivos.'],['Crisocola','🟦','uncommon','Azul verdoso del cobre.'],
   ['Cuarzo Rosa','🩷','uncommon','Piedra del amor.'],['Amazonita','🟩','uncommon','Verde río de la esperanza.']
  ]));

  /* ---------- 13) Reino Natural ---------- */
  add('Reino Natural','natura', ex('nat','natura','comun','Espíritu del mundo natural.',[
   ['Roble Ancestral','🌳','rare','Árbol milenario de raíces profundas.'],['Sakura','🌸','rare','Cerezo en flor efímero.'],
   ['Loto','🪷','rare','Flor de pureza sobre el lodo.'],['Bambú','🎋','uncommon','Flexible e indomable.'],
   ['Secuoya','🌲','epic','El ser vivo más alto del mundo.'],['Cactus','🌵','comun','Sobrevive en el desierto.'],
   ['Girasol','🌻','comun','Sigue al sol todo el día.'],['Orquídea','🪻','uncommon','Flor exótica y delicada.'],
   ['Rosa','🌹','comun','Belleza con espinas.'],['Helecho','🌿','comun','Verdor de los bosques húmedos.'],
   ['Seta','🍄','uncommon','Hongo del sotobosque.'],['Cardo','🌾','comun','Espinoso y resistente.'],
   ['Medusa','🪼','rare','Deriva luminosa del océano.'],['Mariposa','🦋','uncommon','Metamorfosis de color.'],
   ['Luciérnaga','✨','uncommon','Lleva su propia luz.'],['Lobo','🐺','rare','Cazador de la manada.'],
   ['Águila','🦅','rare','Reina de los cielos.'],['Oso','🐻','uncommon','Fuerza del bosque.'],
   ['Zorro','🦊','uncommon','Astuto y ágil.'],['Búho','🦉','uncommon','Sabio de la noche.'],
   ['Ciervo','🦌','uncommon','Guardián del claro.'],['Salmón','🐟','comun','Remonta los ríos.'],
   ['Pulpo','🐙','rare','Inteligencia de las profundidades.'],['Ballena','🐋','epic','Gigante gentil del mar.'],
   ['Colibrí','🐦','uncommon','Joya voladora incansable.'],['Escarabajo','🪲','comun','Coraza brillante.'],
   ['Libélula','🪰','comun','Veloz cazadora del aire.'],['Abeja','🐝','uncommon','Obrera de la colmena.'],
   ['Mantis','🦗','uncommon','Depredadora paciente.'],['Camaleón','🦎','rare','Maestro del camuflaje.'],
   ['Pavo Real','🦚','rare','Abanico de mil ojos.'],['Cisne','🦢','uncommon','Gracia sobre el agua.'],
   ['Tortuga Marina','🐢','rare','Viajera ancestral de los mares.'],['Tiburón','🦈','rare','Cazador perfecto del océano.'],
   ['Delfín','🐬','uncommon','Inteligencia juguetona.'],['Pingüino','🐧','comun','Frac del hielo.'],
   ['Zorro Ártico','🦊','rare','Blanco como la nieve.'],['Lince','🐈','uncommon','Sigilo del bosque nevado.'],
   ['Pantera','🐆','rare','Sombra de la selva.'],['Cocodrilo','🐊','uncommon','Reliquia viviente.'],
   ['Caballito de Mar','🌊','uncommon','Jinete de las corrientes.'],['Erizo','🦔','comun','Defensa de púas.'],
   ['Mapache','🦝','comun','Bandido curioso.'],['Murciélago','🦇','uncommon','Navega con eco.'],
   ['Escorpión','🦂','uncommon','Aguijón del desierto.'],['Araña','🕷️','comun','Tejedora paciente.'],
   ['Rana Dorada','🐸','rare','Joya venenosa de la selva.'],['Cuervo','🐦‍⬛','uncommon','Astucia alada.']
  ]));

  /* ---------- 14) Mitología Celta y Eslava ---------- */
  add('Mitología Celta y Eslava','celta', ex('ce','celta','rare','Ser de la mitología celta o eslava.',[
   ['Lugh','☀️','epic','Dios celta de la luz y las artes.'],['Morrigan','🐦‍⬛','epic','Diosa celta de la guerra y el destino.'],
   ['Dagda','🪓','rare','El buen dios celta de la abundancia.'],['Brigid','🔥','rare','Diosa celta del fuego y la poesía.'],
   ['Cernunnos','🦌','epic','Dios astado de la naturaleza salvaje.'],['Danu','🌊','rare','Madre de los dioses celtas.'],
   ['Nuada','🗡️','uncommon','Rey de brazo de plata.'],['Cú Chulainn','🛡️','epic','Héroe guerrero de Irlanda.'],
   ['Banshee','👻','rare','Su lamento anuncia la muerte.'],['Leprechaun','🍀','uncommon','Duende guardián de oro.'],
   ['Selkie','🦭','uncommon','Foca que se vuelve humana en tierra.'],['Pooka','🐎','uncommon','Espíritu cambiante y travieso.'],
   ['Dullahan','💀','rare','Jinete sin cabeza del folclore irlandés.'],['Hada','🧚','uncommon','Criatura feérica del Otro Mundo.'],
   ['Perún','⚡','legendario','Dios eslavo del trueno.'],['Veles','🐍','epic','Dios eslavo del inframundo y el ganado.'],
   ['Mokosh','🧵','rare','Diosa eslava de la tierra y el destino.'],['Dazhbog','🌞','rare','Dios eslavo del sol.'],
   ['Svarog','🔨','epic','Dios eslavo del fuego y la forja.'],['Baba Yaga','🏚️','epic','Bruja que vive en una choza con patas de gallina.'],
   ['Domovoi','🏠','uncommon','Espíritu protector del hogar.'],['Leshy','🌲','rare','Guardián del bosque eslavo.'],
   ['Rusalka','🌊','rare','Espíritu femenino de las aguas.'],['Vodyanoy','🐸','uncommon','Espíritu masculino de los ríos.'],
   ['Pájaro de Fuego','🔥','epic','La Zhar-ptitsa, ave luminosa de los cuentos.'],['Koschei','💀','legendario','El inmortal que oculta su muerte.']
  ]));

  /* ---------- 15) Dioses y Espíritus Africanos ---------- */
  add('Dioses y Espíritus Africanos','africa', ex('af','africa','rare','Deidad o espíritu del folclore africano.',[
   ['Anansi','🕷️','epic','La araña embaucadora, dueña de los cuentos.'],['Mami Wata','🧜','epic','Espíritu de las aguas y la riqueza.'],
   ['Eshu','🚪','rare','Mensajero yoruba de los cruces de caminos.'],['Ogún','⚔️','epic','Orisha del hierro y la guerra.'],
   ['Shangó','⚡','epic','Orisha del trueno y el fuego.'],['Oshún','💛','rare','Orisha del amor y los ríos.'],
   ['Yemayá','🌊','epic','Madre orisha del mar.'],['Obatalá','🕊️','epic','Orisha de la pureza y la creación.'],
   ['Nyami Nyami','🐍','rare','Dios serpiente del río Zambeze.'],['Adze','🦟','uncommon','Vampiro que toma forma de luciérnaga.'],
   ['Impundulu','🦅','rare','El ave del relámpago.'],['Tokoloshe','👹','uncommon','Duende travieso del folclore zulú.'],
   ['Asase Yaa','🌍','rare','Diosa de la tierra y la fertilidad.'],['Aido Hwedo','🌈','epic','La serpiente arcoíris que sostiene el mundo.'],
   ['Heitsi-Eibib','🏹','uncommon','Héroe cazador que renace.'],['Mbaba Mwana','🌧️','rare','Diosa de la lluvia y el arcoíris.']
  ]));

  /* ---------- SET ESPECIAL DE RACHA ---------- */
  G.ZF_STREAK=[
   ['st_chispa','Chispa','✨','comun','Pequeña llama que premia tu constancia diaria.','racha'],
   ['st_brasa','Brasa','🔥','comun','El calor que mantiene viva tu racha.','racha'],
   ['st_antorcha','Antorcha','🔦','uncommon','Guía a quien no falta ni un día.','racha'],
   ['st_fogata','Fogata','🏕️','uncommon','Reúne a los jugadores constantes.','racha'],
   ['st_meteoro','Meteoro','☄️','rare','Premio ardiente de las rachas largas.','racha'],
   ['st_fenix','Fénix de Racha','🐦‍🔥','epic','Renace cada día que vuelves a jugar.','racha'],
   ['st_solar','Llamarada Solar','🌞','rare','Estallido de energía por tu dedicación.','racha'],
   ['st_volcan','Espíritu del Volcán','🌋','epic','Furia acumulada de muchas jornadas.','racha'],
   ['st_cometa','Cometa de Fuego','💫','rare','Surca el cielo de los más fieles.','racha'],
   ['st_dragonfuego','Dragón de Llama','🐉','legendario','Solo las rachas más épicas lo despiertan.','racha'],
   ['st_corazon','Corazón Ardiente','❤️‍🔥','rare','Late con la pasión de no rendirse.','racha'],
   ['st_infinito','Llama Infinita','♾️','mistico','Para quienes alcanzan rachas legendarias.','racha']
  ];

  /* ---------- PASE: emoji representativo para cartas con emoji genérico ----------
     Los personajes con nombre ya traen su emoji (Ra 🌞, Anubis 🐺, Zeus ⚡...).
     Aquí solo se mejoran las que usan ✨/🌟/💫/⭐ genéricos (sobre todo las 88
     constelaciones), asignando un emoji que represente su nombre. */
  const GENERIC=new Set(['✨','🌟','💫','⭐','🌠']);
  const NAME2EMOJI=[
    ['leo menor','🦁'],['leon','🦁'],['leo','🦁'],['osa','🐻'],
    ['can mayor','🐕'],['can menor','🐕'],['canes','🐕'],
    ['aguila','🦅'],['dragon','🐉'],['cisne','🦢'],['escorpi','🦂'],['lira','🎵'],
    ['pegaso','🐎'],['orion','🏹'],['hercules','💪'],['delphinus','🐬'],['delfin','🐬'],
    ['lepus','🐇'],['cuervo','🐦‍⬛'],['hidra','🐍'],['hydrus','🐍'],['hydra','🐍'],
    ['tucana','🦜'],['pavo','🦚'],['tauro','🐂'],['boyero','🐂'],['aries','🐏'],
    ['cancer','🦀'],['capricornio','🐐'],['piscis','🐟'],['dorado','🐟'],['volans','🐟'],
    ['sagitar','🏹'],['sagitta','🏹'],['centauro','🐴'],['equuleus','🐴'],['lupus','🐺'],
    ['lince','🐆'],['camaleon','🦎'],['lacerta','🦎'],['grus','🦩'],['columba','🕊️'],
    ['cetus','🐋'],['monoceros','🦄'],['vulpecula','🦊'],['musca','🪰'],['serpens','🐍'],
    ['ofiuco','🐍'],['corona','👑'],['triangul','📐'],['telescop','🔭'],['reticulum','🔭'],
    ['microscop','🔬'],['horolog','🕰️'],['pyxis','🧭'],['octans','🧭'],['cratera','🏺'],
    ['crater','🏺'],['acuario','🏺'],['scutum','🛡️'],['vela','⛵'],['puppis','⛵'],
    ['carina','⛵'],['pictor','🎨'],['sculptor','🗿'],['fornax','🔥'],['caelum','🔨'],
    ['norma','📐'],['circinus','📐'],['sextans','📐'],['mensa','⛰️'],['indus','🪶'],
    ['andromeda','👸'],['casiopea','👸'],['cefeo','🤴'],['perseo','🗡️'],['auriga','🏇'],
    ['camelopardalis','🦒'],['apus','🐦'],['coma berenices','💇'],['antlia','⚙️'],
    ['cruz','✝️'],['crux','✝️'],['geminis','👯'],['libra','⚖️'],['virgo','👰'],
    ['eridano','🌊'],['fenix','🐦‍🔥'],['baldr','☀️'],['lobo','🐺'],['zorro','🦊'],
    ['ballena','🐋'],['paloma','🕊️'],['serpiente','🐍'],['unicornio','🦄'],['caballo','🐎']
  ];
  NAME2EMOJI.sort((a,b)=>b[0].length-a[0].length);   // clave más larga primero (evita "camaleón"→leon, "centauro"→tauro)
  function norm(s){ return (s||'').toString().normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(); }
  function betterEmoji(id,name){
    const n=norm(name);
    for(const pair of NAME2EMOJI){ if(n.includes(pair[0])) return pair[1]; }
    if(/^con_/.test(id)) return '🌌';     // constelación sin match -> campo estelar
    return null;
  }
  C.forEach(sec=>{ (sec.items||[]).forEach(it=>{
    const em=it[2]||'✨';
    if(GENERIC.has(em)){ const b=betterEmoji(it[0],it[1]); if(b) it[2]=b; }
  }); });

  G.ZF_COLLECT=C;
})(typeof globalThis!=='undefined'?globalThis:this);
