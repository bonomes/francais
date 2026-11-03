/* ==================================================================
   sequence-m1.js — la PREMIÈRE MÉMOIRE du parcours (02-11-2026).

   Ce que Bek « se rappelle » : elle mange un sandwich, puis une poutine.
   Ce que l'élève apprend (dans cet ordre de priorité) :
     1. l'ordre de la phrase : sujet – verbe – objet ;
     2. les noms ont un genre : un sandwich / une poutine ;
     3. un 2e verbe en -er (« je parle » → « je mange » : -e après « je »).

   Déroulé (une mémoire = 6 étapes, voir plan dans la fiche kebbek-memoire-1) :
     1. « Je mange. » — on touche les mots (voix + sens) ; remarque sur le -e.
     2. « Je mange un sandwich » en 3 passages :
          lecture (mots cliquables) → ordre (le souvenir « s'efface » : on
          replace les mots) → écriture (quelques mots à compléter).
     3. « Je mange une poutine » : mêmes 3 passages, mais on écrit TOUTE la phrase.
     4. Image : Bek mange un sandwich — « Tu es Bek. Que fais-tu maintenant ? »
     5. Image : Bek mange une poutine — même question (réponse écrite, sans aide).
     6. Exercice audio : on entend la phrase, on choisit les bonnes cases.
   Après chaque notion, une petite carte « Savais-tu ? » (culture).

   Le Lecteur commente : indices, remarques sarcastiques, piques.
   Bek réagit avec subtilité : à la poutine, son enthousiasme est très bas
   (un indice pour plus tard — le système Bravo ; rien n'est expliqué ici).

   VOIX : audio/fr/<id>.mp3 s'il existe (enregistrements de Raphaël, à venir),
   sinon la synthèse vocale du navigateur. Ids : les mots (je, mange, un, une,
   sandwich, poutine, parle, francais) et les phrases (m1-je-mange,
   m1-je-mange-un-sandwich, m1-je-mange-une-poutine, m1-je-parle-francais).

   IMAGES manquantes (à produire) : images/m1/bek_mange-sandwich_01-01.webp et
   images/m1/bek_mange-poutine_01-01.webp. Tant qu'elles n'existent pas, Bek
   garde une pose existante et une vignette dessinée (SVG) montre l'aliment.

   Dépend de : sequence-reveil-bek.css (.rbek-scene, .rbek-bek, .rbek-pose),
   sequence-lecteur.css/.js (bulle et icône du Lecteur), sequence-m1.css.
   Facultatif : window.KebBekMots (mots.js) — les mots appris y sont ajoutés.

   @param {string} idConteneur
   @param {object} options   : langue ; dossierAudio ('audio/fr/') ; voixLangue ('fr-CA') ;
                               imageLecteur ; sources { pose: url }
   @param {object} callbacks : onTermine({ mots, fragments }) ; onQuitter()
   Principe du projet : le module ne navigue jamais lui-même.
   ⚠️ Textes : fr et en complets ; les autres langues retombent sur l'anglais.
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const MOTS_APPRIS = ['mange', 'un', 'une', 'sandwich', 'poutine'];
  const ETAPES_TOTAL = 6;

  // Poses : toutes bouche fermée (Bek réagit, elle ne parle pas).
  const SOURCES_PAR_DEFAUT = {
    'bek-observe':        'images/reveil/bek_observe_01-01.webp',
    'bek-examine':        'images/reveil/bek-examine_bouche-fermee_01-01.webp',
    'bek-concentree':     'images/reveil/bek_concentree_bouche-fermee_01-01.webp',
    'bek-conscience':     'images/reveil/bek-prise-de-conscience_bouche-fermee_01-01.webp',
    'bek-heureuse-ferme': 'images/reveil/bek_heureuse_bouche-fermee_01-01.webp',
    // 🎨 à produire : Bek qui mange (le sourire est franc) ; Bek qui mange sa poutine
    // (enthousiasme très bas : poli, un peu éteint — pas une grimace)
    'bek-mange-sandwich': 'images/m1/bek_mange-sandwich_01-01.webp',
    'bek-mange-poutine':  'images/m1/bek_mange-poutine_01-01.webp'
  };
  const POSE_DE_REPLI = { 'bek-mange-sandwich': 'bek-heureuse-ferme', 'bek-mange-poutine': 'bek-observe' };
  const VIGNETTE_DE = { 'bek-mange-sandwich': 'sandwich', 'bek-mange-poutine': 'poutine' };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);

  const AFFICHE = { je: 'je', mange: 'mange', parle: 'parle', un: 'un', une: 'une', sandwich: 'sandwich', poutine: 'poutine', francais: 'français' };
  const ROLE = { je: 's', mange: 'v', parle: 'v', un: 'o', une: 'o', sandwich: 'o', poutine: 'o', francais: 'o' };
  const GENRE = { sandwich: 'genre_m', poutine: 'genre_f' };

  const PHRASES = {
    mange:    { mots: ['je', 'mange'],                  texte: 'Je mange.',               audio: 'm1-je-mange',             tr: 'tr_mange' },
    sandwich: { mots: ['je', 'mange', 'un', 'sandwich'], texte: 'Je mange un sandwich.',   audio: 'm1-je-mange-un-sandwich', tr: 'tr_sandwich' },
    poutine:  { mots: ['je', 'mange', 'une', 'poutine'], texte: 'Je mange une poutine.',   audio: 'm1-je-mange-une-poutine', tr: 'tr_poutine' },
    parle:    { mots: ['je', 'parle', 'francais'],      texte: 'Je parle français.',      audio: 'm1-je-parle-francais',    tr: 'tr_parle' }
  };
  const BANQUE_LIBRE = ['je', 'mange', 'parle', 'un', 'une', 'sandwich', 'poutine', 'francais'];

  const DICO = {
    fr: {
      titre: 'Première mémoire', quitter: 'Quitter la mémoire', son: 'Son', suite: 'Suite', continuer: 'Continuer', valider: 'Valider',
      intro: 'Voilà. Ce souvenir est un peu abîmé, mais on devrait pouvoir en tirer quelques mots.',
      c_mange: 'Touche les mots pour les entendre.',
      c_lire: 'Touche les mots pour les entendre et voir leur sens.',
      c_ordre: 'Le souvenir s’efface… Remets les mots dans l’ordre.',
      c_ecrire_part: 'Complète les mots qui manquent.',
      c_ecrire: 'Écris la phrase en français.',
      c_image: 'Tu es Bek. Que fais-tu maintenant\u00a0?',
      c_audio: 'Écoute, puis choisis les bons mots.',
      reecouter: 'Réécouter', sans_son: 'Je n’entends rien', construire_vide: 'Touche les mots pour construire ta phrase.',
      role_s: 'sujet', role_v: 'verbe', role_o: 'objet', genre_m: 'masculin', genre_f: 'féminin',
      noteE_titre: 'Remarque', noteE: 'Avec « je », les verbes en -er se terminent par -e. On n’entend pas ce -e.',
      tr_mange: '', tr_sandwich: '', tr_poutine: '', tr_parle: '',
      sens_je: 'moi', sens_mange: 'manger (moi)', sens_parle: 'parler (moi)', sens_un: 'un (mot masculin)', sens_une: 'une (mot féminin)',
      sens_sandwich: 'sandwich', sens_poutine: 'poutine', sens_francais: 'la langue française',
      quipErreur: ['Presque. Ce qui, en français comme ailleurs, veut dire «\u00a0non\u00a0».', 'Prends ton temps. J’ai tout le mien.', 'Intéressant. Mais non.'],
      quipOk: ['Voilà.', 'Exact.', 'Pas mal du tout.', 'On progresse.'],
      quipUne: 'Une poutine, pas «\u00a0un\u00a0». La grammaire décide, pas toi.',
      quipPoutine: 'Remarque son enthousiasme. Je dis ça, je dis rien.',
      quipSandwich: 'Elle a l’air de bien apprécier son sandwich. Retiens ça.',
      quipReponse: 'Voici la réponse. Ne le répète à personne.',
      quipAccent: 'Presque\u00a0! Regarde les accents.',
      quipSansSon: 'Pas de son\u00a0? Voici le texte. Je ne dirai rien.',
      cult_titre: 'Savais-tu\u00a0?',
      cult_sandwich: 'Selon la légende, le mot «\u00a0sandwich\u00a0» vient d’un comte anglais qui mangeait sa viande entre deux tranches de pain pour ne pas quitter sa partie de cartes.',
      cult_poutine: 'La poutine, ce sont des frites, du fromage en grains (qui fait «\u00a0squick\u00a0» sous la dent) et de la sauce brune. Elle est née au Québec vers la fin des années 1950, et plusieurs villages s’en disputent l’honneur.',
      fin: 'Souvenir reconstitué. Tu sais maintenant dire ce que tu manges. Ce que tu ne manges pas… ça viendra.'
    },
    en: {
      titre: 'First memory', quitter: 'Leave the memory', son: 'Sound', suite: 'Next', continuer: 'Continue', valider: 'Check',
      intro: 'There. This memory is a bit damaged, but we should be able to pull a few words out of it.',
      c_mange: 'Tap the words to hear them.',
      c_lire: 'Tap the words to hear them and see what they mean.',
      c_ordre: 'The memory is fading… Put the words back in order.',
      c_ecrire_part: 'Fill in the missing words.',
      c_ecrire: 'Write the sentence in French.',
      c_image: 'You are Bek. What are you doing now?',
      c_audio: 'Listen, then pick the right words.',
      reecouter: 'Listen again', sans_son: 'I can’t hear anything', construire_vide: 'Tap the words to build your sentence.',
      role_s: 'subject', role_v: 'verb', role_o: 'object', genre_m: 'masculine', genre_f: 'feminine',
      noteE_titre: 'Note', noteE: 'After “je”, verbs ending in -er end in -e. You don’t hear that -e.',
      tr_mange: 'I eat.', tr_sandwich: 'I eat a sandwich.', tr_poutine: 'I eat a poutine.', tr_parle: 'I speak French.',
      sens_je: 'I', sens_mange: 'eat', sens_parle: 'speak', sens_un: 'a (masculine word)', sens_une: 'a (feminine word)',
      sens_sandwich: 'sandwich', sens_poutine: 'poutine (fries, cheese curds and gravy)', sens_francais: 'French (the language)',
      quipErreur: ['Almost. Which, in French as elsewhere, means “no”.', 'Take your time. I have all of mine.', 'Interesting. But no.'],
      quipOk: ['There.', 'Exactly.', 'Not bad at all.', 'We’re getting somewhere.'],
      quipUne: 'A poutine, not “un”. Grammar decides, not you.',
      quipPoutine: 'Notice her enthusiasm. I’m just saying.',
      quipSandwich: 'She seems to really enjoy her sandwich. Remember that.',
      quipReponse: 'Here’s the answer. Don’t tell anyone.',
      quipAccent: 'Almost! Check the accents.',
      quipSansSon: 'No sound? Here’s the text. I won’t say a word.',
      cult_titre: 'Did you know?',
      cult_sandwich: 'According to legend, the word “sandwich” comes from an English earl who ate his meat between two slices of bread so he wouldn’t have to leave his card game.',
      cult_poutine: 'Poutine is fries, cheese curds (which squeak against your teeth) and brown gravy. It was born in Quebec in the late 1950s, and several villages claim the honour.',
      fin: 'Memory restored. You can now say what you eat. What you don’t eat… that will come.'
    }
  };

  const DESSINS = {   // vignettes provisoires (traits à la main, sans emoji)
    sandwich: '<path d="M10 38c0-12 12-20 30-20s30 8 30 20c0 3-2 4-4 4H14c-2 0-4-1-4-4Z" fill="#F2C98B"/><path d="M12 46c10 3 14-3 22 0s12-3 22 0 10-2 12 0v4H12Z" fill="#8DBF6A"/><path d="M12 53c8 3 16 0 26 2s18 0 28-2v6c0 3-2 5-5 5H17c-3 0-5-2-5-5Z" fill="#F2C98B"/><path d="M10 38c0-12 12-20 30-20s30 8 30 20M12 46c10 3 14-3 22 0s12-3 22 0 10-2 12 0M12 53v6c0 3 2 5 5 5h46c3 0 5-2 5-5v-6" fill="none" stroke="#4A3B33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    poutine: '<path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="#F7F1E8"/><path d="M14 42l6-18 5 17 7-20 5 19 7-17 4 17 6-14 3 16Z" fill="#F0C75E"/><path d="M12 42c6 4 10-2 16 1s10-3 16 0 10-2 16 0 8-1 10 0c-2 6-8 8-20 8s-30 0-38-9Z" fill="#8A5A3C"/><circle cx="26" cy="38" r="4" fill="#FFF6D8"/><circle cx="42" cy="36" r="4.5" fill="#FFF6D8"/><circle cx="56" cy="39" r="3.5" fill="#FFF6D8"/><path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="none" stroke="#4A3B33" stroke-width="3" stroke-linejoin="round"/>'
  };

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function melanger(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function normaliser(s) { return String(s || '').toLowerCase().replace(/[.!?¡¿,;:«»"]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function sansAccents(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function lireSon() { try { return localStorage.getItem(CLE_SON) !== '0'; } catch (e) { return true; } }
  function precharger(noms, urlDe) {
    const etat = {};
    const toutes = Promise.all(noms.map(function (nom) {
      return new Promise(function (resolve) {
        const img = new Image();
        img.onload = function () { etat[nom] = true; resolve(); };
        img.onerror = function () { etat[nom] = false; resolve(); };
        img.src = urlDe(nom);
      });
    }));
    const delaiMax = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    return Promise.race([toutes, delaiMax]).then(function () { return etat; });
  }

  function demarrer(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) { console.warn('sequence-m1 : conteneur introuvable (' + idConteneur + ').'); return { arreter: function () {} }; }

    const langue = langueActuelle(options);
    function T(cle) {
      const v = (DICO[langue] && DICO[langue][cle]);
      if (v !== undefined && v !== null) return v;
      return (DICO.en && DICO.en[cle] !== undefined ? DICO.en[cle] : (DICO.fr && DICO.fr[cle])) || '';
    }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});

    let arrete = false;
    const minuteurs = [];
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    const scene = document.createElement('div');
    scene.className = 'rbek-scene m1-scene';
    let segments = '';
    for (let i = 0; i < ETAPES_TOTAL; i++) segments += '<span class="m1-segment"></span>';
    scene.innerHTML =
      '<button type="button" class="m1-quitter" aria-label="' + echapper(T('quitter')) + '">&#8249;</button>' +
      '<button type="button" class="m1-son" aria-label="' + echapper(T('son')) + '" aria-pressed="true">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path class="m1-son-ondes" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg></button>' +
      '<div class="m1-disposition">' +
        '<div class="m1-col-gauche">' +
          '<div class="m1-carte">' +
            '<div class="m1-progres" aria-hidden="true">' + segments + '</div>' +
            '<p class="m1-consigne" role="status"></p>' +
            '<div class="m1-zone"></div>' +
            '<div class="m1-actions"></div>' +
          '</div>' +
          '<div class="m1-lect m1-off">' +
            '<div class="lect-lecteur-bulle m1-lect-bulle" role="status">' +
              '<p class="lect-lecteur-texte m1-lect-texte"></p>' +
              '<button type="button" class="lect-btn m1-lect-suite">' + echapper(T('suite')) + '</button>' +
            '</div>' +
            '<div class="lect-lecteur m1-lect-icone">' + iconeLecteur + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="m1-col-bek">' +
          '<div class="m1-bek"><div class="rbek-bek m1-calque"></div></div>' +
          '<div class="m1-vignette m1-off" aria-hidden="true"></div>' +
        '</div>' +
      '</div>';
    conteneur.innerHTML = '';
    conteneur.appendChild(scene);
    planifier(function () { scene.classList.add('rbek-prete'); }, 30);

    const q = function (s) { return scene.querySelector(s); };
    const elConsigne = q('.m1-consigne'), zone = q('.m1-zone'), actions = q('.m1-actions');
    const lectZone = q('.m1-lect'), lectTexte = q('.m1-lect-texte'), lectSuite = q('.m1-lect-suite');
    const calque = q('.m1-calque'), vignette = q('.m1-vignette');
    const segs = scene.querySelectorAll('.m1-segment');
    const boutonSon = q('.m1-son');

    // ---------- Voix : audio/fr/<id>.mp3, sinon la synthèse du navigateur ----------
    const son = { actif: lireSon() };
    const dispoAudio = {};
    function reglerBoutonSon() { boutonSon.setAttribute('aria-pressed', son.actif ? 'true' : 'false'); boutonSon.classList.toggle('m1-son-coupe', !son.actif); }
    reglerBoutonSon();
    boutonSon.addEventListener('click', function () {
      son.actif = !son.actif;
      try { localStorage.setItem(CLE_SON, son.actif ? '1' : '0'); } catch (e) {}
      if (!son.actif) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
      reglerBoutonSon();
    });
    function synthese(texte) {
      try {
        const ss = window.speechSynthesis;
        if (!ss || !window.SpeechSynthesisUtterance) return;
        const u = new window.SpeechSynthesisUtterance(texte);
        u.lang = options.voixLangue || 'fr-CA';
        u.rate = 0.85;
        u.pitch = 1.1;
        const voix = ss.getVoices ? ss.getVoices() : [];
        const fr = voix.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf('fr') === 0; });
        const choisie = fr.filter(function (v) { return v.lang.toLowerCase().replace('_', '-') === 'fr-ca'; })[0] || fr[0];
        if (choisie) u.voice = choisie;
        ss.cancel();
        ss.speak(u);
      } catch (e) {}
    }
    function dire(id, texte) {
      if (!son.actif) return;
      if (dispoAudio[id] === false) { synthese(texte); return; }
      let repli = false;
      function secours() { if (repli) return; repli = true; dispoAudio[id] = false; synthese(texte); }
      try {
        const a = new Audio((options.dossierAudio || 'audio/fr/') + id + '.mp3');
        a.addEventListener('error', secours, { once: true });
        const p = a.play();
        if (p && p.then) p.then(function () { dispoAudio[id] = true; }).catch(function () { if (dispoAudio[id] !== true) secours(); });
      } catch (e) { secours(); }
    }
    const direMot = function (id) { dire(id, AFFICHE[id]); };
    const direPhrase = function (ph) { dire(ph.audio, ph.texte); };

    // ---------- Bek : poses, avec repli tant qu'une image manque ----------
    const poses = {}, manquantes = {};
    let courante = null, niveau = 1;
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) { manquantes[nom] = true; return; }
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = sources[nom];
        calque.appendChild(img);
        poses[nom] = img;
      });
    }
    function montrer(nom) {
      const reelle = poses[nom] ? nom : (POSE_DE_REPLI[nom] || 'bek-observe');
      const cible = poses[reelle] || poses['bek-observe'];
      // vignette dessinée : seulement tant que la vraie image de Bek qui mange est absente
      const dessin = VIGNETTE_DE[nom];
      if (dessin && !poses[nom]) {
        vignette.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true">' + DESSINS[dessin] + '</svg>';
        vignette.classList.remove('m1-off');
      } else vignette.classList.add('m1-off');
      if (!cible || cible === courante) return;
      const ancienne = courante;
      const ms = (reduit || !ancienne) ? 0 : 180;
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms === 0) { ancienne.classList.remove('rbek-pose-visible'); return; }
      planifier(function () {
        if (ancienne === courante) return;
        ancienne.style.transitionDuration = '0ms';
        ancienne.classList.remove('rbek-pose-visible');
      }, ms + 30);
    }

    // ---------- Le Lecteur : indices, piques ----------
    let lectMinuteur = null;
    function lecteurAfficher(texte, avecSuite) {
      if (lectMinuteur) { clearTimeout(lectMinuteur); lectMinuteur = null; }
      lectTexte.textContent = texte;
      lectSuite.classList.toggle('m1-off', !avecSuite);
      q('.m1-lect-bulle').classList.toggle('m1-sans-suite', !avecSuite);
      lectZone.classList.remove('m1-off');
      planifier(function () { lectZone.classList.add('m1-lect-visible'); }, 30);
    }
    function lecteurMasquer() {
      lectZone.classList.remove('m1-lect-visible');
      lectMinuteur = setTimeout(function () { if (!arrete) lectZone.classList.add('m1-off'); }, 450);
      minuteurs.push(lectMinuteur);
    }
    function lecteurDit(texte) {          // avec « Suite » : l'élève lit à son rythme
      return new Promise(function (resolve) {
        lecteurAfficher(texte, true);
        lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); };
      });
    }
    function lecteurIndice(texte, ms) {   // sans « Suite » : se retire tout seul
      lecteurAfficher(texte, false);
      lectMinuteur = setTimeout(function () { if (!arrete) lecteurMasquer(); }, ms || 4500);
      minuteurs.push(lectMinuteur);
    }
    function auHasard(liste) { return liste[Math.floor(Math.random() * liste.length)]; }

    // ---------- Aides d'affichage ----------
    function consigne(txt) { elConsigne.textContent = txt; }
    function vider() { zone.innerHTML = ''; actions.innerHTML = ''; zone.removeAttribute('data-mode'); zone.removeAttribute('data-phrase'); }
    function etape(n) { Array.prototype.forEach.call(segs, function (s, i) { s.classList.toggle('m1-segment-fait', i < n); }); }
    function boutonAction(label, clair) {
      return new Promise(function (resolve) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'lect-btn m1-btn' + (clair ? ' lect-btn-clair' : '');
        b.textContent = label;
        b.addEventListener('click', function () { b.disabled = true; resolve(); });
        actions.appendChild(b);
      });
    }
    function groupes(phrase) {   // [{role, mots:[id…]}] : sujet / verbe / objet (article + nom = un seul objet)
      const g = [];
      phrase.mots.forEach(function (id) {
        const r = ROLE[id];
        if (g.length && g[g.length - 1].role === r) g[g.length - 1].mots.push(id);
        else g.push({ role: r, mots: [id] });
      });
      return g;
    }
    function tuile(id, classe) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'm1-tuile m1-role-' + ROLE[id] + (classe ? ' ' + classe : '');
      b.setAttribute('data-id', id);
      b.textContent = AFFICHE[id];
      return b;
    }
    function ligneGroupes(phrase, remplisseur) {
      const ligne = document.createElement('div');
      ligne.className = 'm1-phrase';
      groupes(phrase).forEach(function (g) {
        const bloc = document.createElement('div');
        bloc.className = 'm1-groupe';
        const lib = document.createElement('span');
        lib.className = 'm1-role m1-role-' + g.role;
        lib.textContent = T('role_' + g.role);
        const rang = document.createElement('div');
        rang.className = 'm1-rang';
        g.mots.forEach(function (id) { rang.appendChild(remplisseur(id)); });
        bloc.appendChild(lib);
        bloc.appendChild(rang);
        ligne.appendChild(bloc);
      });
      const point = document.createElement('span');
      point.className = 'm1-point';
      point.textContent = '.';
      ligne.appendChild(point);
      return ligne;
    }
    function ligneTraduction(phrase) {
      const t = T(phrase.tr);
      if (!t) return null;
      const p = document.createElement('p');
      p.className = 'm1-trad';
      p.textContent = t;
      return p;
    }
    function secouer(el) {
      if (!el || reduit) return;
      el.classList.remove('m1-secoue'); void el.offsetWidth; el.classList.add('m1-secoue');
    }

    // ---------- 1. Lecture : on touche les mots (voix + sens) ----------
    async function lecture(phrase, cle) {
      vider();
      zone.setAttribute('data-mode', 'lecture'); zone.setAttribute('data-phrase', cle);
      const touches = {};
      const sens = document.createElement('p');
      sens.className = 'm1-sens';
      sens.innerHTML = '&nbsp;';
      const ligne = ligneGroupes(phrase, function (id) {
        const b = tuile(id, 'm1-tuile-lue');
        b.addEventListener('click', function () {
          direMot(id);
          touches[id] = true;
          Array.prototype.forEach.call(ligne.querySelectorAll('.m1-tuile'), function (t) { t.classList.toggle('m1-tuile-choisie', t === b); });
          sens.textContent = AFFICHE[id] + ' = ' + T('sens_' + id);
          if (phrase.mots.every(function (m) { return touches[m]; })) ouvrirSuite();
        });
        return b;
      });
      zone.appendChild(ligne);
      const nom = phrase.mots[phrase.mots.length - 1];
      if (GENRE[nom]) {
        const badge = document.createElement('p');
        badge.className = 'm1-genre';
        badge.textContent = AFFICHE[nom] + ' : ' + T(GENRE[nom]);
        zone.appendChild(badge);
      }
      const tr = ligneTraduction(phrase);
      if (tr) zone.appendChild(tr);
      zone.appendChild(sens);
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      function ouvrirSuite() {
        if (actions.firstChild) return;
        boutonAction(T('continuer')).then(fini);
      }
      await attendre(300);
      direPhrase(phrase);
      await promesse;
    }

    // ---------- 2. Ordre : le souvenir s'efface, on replace les mots ----------
    async function ordre(phrase, cle, distracteurs) {
      vider();
      zone.setAttribute('data-mode', 'ordre'); zone.setAttribute('data-phrase', cle);
      const cases = [];
      const ligne = ligneGroupes(phrase, function () {
        const c = document.createElement('span');
        c.className = 'm1-case';
        cases.push(c);
        return c;
      });
      zone.appendChild(ligne);
      const plateau = document.createElement('div');
      plateau.className = 'm1-plateau';
      zone.appendChild(plateau);
      let suivant = 0, erreurs = 0, verrou = false;
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      melanger(phrase.mots.concat(distracteurs || [])).forEach(function (id) {
        const t = tuile(id);
        t.addEventListener('click', function () {
          if (verrou || t.classList.contains('m1-tuile-partie')) return;
          const attendu = phrase.mots[suivant];
          if (id === attendu) {
            t.classList.add('m1-tuile-partie');
            Array.prototype.forEach.call(plateau.querySelectorAll('.m1-indice'), function (x) { x.classList.remove('m1-indice'); });
            const c = cases[suivant];
            c.className = 'm1-case m1-case-pleine m1-role-' + ROLE[id];
            c.textContent = AFFICHE[id];
            direMot(id);
            suivant++;
            erreurs = 0;
            if (suivant === phrase.mots.length) {
              verrou = true;
              planifier(function () { direPhrase(phrase); lecteurIndice(auHasard(T('quipOk')), 2200); }, 400);
              planifier(fini, 1300);
            }
          } else {
            erreurs++;
            secouer(t);
            lecteurIndice(id === 'un' && attendu === 'une' ? T('quipUne') : auHasard(T('quipErreur')), 4200);
            if (erreurs >= 2) {      // la bonne tuile se met à briller
              const bonne = plateau.querySelector('.m1-tuile[data-id="' + attendu + '"]:not(.m1-tuile-partie)');
              if (bonne) bonne.classList.add('m1-indice');
            }
          }
        });
        plateau.appendChild(t);
      });
      await promesse;
    }

    // ---------- 3. Écriture : quelques mots (cloze) ou la phrase entière ----------
    async function ecrire(phrase, cle, manquants, sansTraduction) {
      vider();
      zone.setAttribute('data-mode', 'ecrire'); zone.setAttribute('data-phrase', cle);
      const cloze = !!manquants;
      const champs = [];
      let champPhrase = null;
      if (!sansTraduction) { const tr = ligneTraduction(phrase); if (tr) zone.appendChild(tr); }
      if (cloze) {
        let rang = 0;
        const ligne = ligneGroupes(phrase, function (id) {
          const idx = rang++;
          if (manquants.indexOf(idx) === -1) { const s = tuile(id, 'm1-tuile-donnee'); s.disabled = true; return s; }
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.className = 'm1-champ m1-role-' + ROLE[id];
          inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false;
          inp.setAttribute('data-idx', String(idx));
          inp.size = Math.max(AFFICHE[id].length, 4);
          champs.push(inp);
          return inp;
        });
        zone.appendChild(ligne);
      } else {
        champPhrase = document.createElement('input');
        champPhrase.type = 'text';
        champPhrase.className = 'm1-champ m1-champ-phrase';
        champPhrase.setAttribute('autocomplete', 'off'); champPhrase.setAttribute('autocapitalize', 'sentences'); champPhrase.setAttribute('autocorrect', 'off'); champPhrase.spellcheck = false;
        zone.appendChild(champPhrase);
      }
      const indice = document.createElement('p');
      indice.className = 'm1-sens';
      indice.innerHTML = '&nbsp;';
      zone.appendChild(indice);
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bValider = document.createElement('button');
      bValider.type = 'button'; bValider.className = 'lect-btn m1-btn'; bValider.textContent = T('valider');
      actions.appendChild(bValider);
      let erreurs = 0, termine = false;

      function termineBien() {
        termine = true;
        bValider.disabled = true;
        direPhrase(phrase);
        lecteurIndice(auHasard(T('quipOk')), 2200);
        planifier(fini, 1300);
      }
      function verifier() {
        if (termine) return;
        let toutBon = true, seulementAccents = true;
        if (cloze) {
          champs.forEach(function (c) {
            const attendu = phrase.mots[Number(c.getAttribute('data-idx'))];
            const donne = normaliser(c.value);
            const bon = donne === AFFICHE[attendu];
            c.classList.toggle('m1-ok', bon); c.classList.toggle('m1-ko', !bon);
            if (!bon) { toutBon = false; if (sansAccents(donne) !== sansAccents(AFFICHE[attendu])) seulementAccents = false; }
          });
        } else {
          const donne = normaliser(champPhrase.value);
          const attendu = normaliser(phrase.texte);
          toutBon = donne === attendu;
          if (!toutBon) seulementAccents = sansAccents(donne) === sansAccents(attendu);
          champPhrase.classList.toggle('m1-ok', toutBon); champPhrase.classList.toggle('m1-ko', !toutBon);
        }
        if (toutBon) { termineBien(); return; }
        if (seulementAccents) { lecteurIndice(T('quipAccent'), 4200); return; }   // pas une vraie erreur
        erreurs++;
        secouer(cloze ? champs[0].parentNode : champPhrase);
        lecteurIndice(auHasard(T('quipErreur')), 4200);
        if (erreurs === 2) {             // indice : les premières lettres
          indice.textContent = phrase.mots.map(function (id) { return AFFICHE[id].charAt(0) + '…'; }).join(' ');
        }
        if (erreurs >= 3) {              // la réponse apparaît ; on ne bloque pas l'élève
          termine = true;
          bValider.disabled = true;
          if (cloze) champs.forEach(function (c) { c.value = AFFICHE[phrase.mots[Number(c.getAttribute('data-idx'))]]; c.classList.add('m1-ok'); c.classList.remove('m1-ko'); });
          else { champPhrase.value = phrase.texte; champPhrase.classList.add('m1-ok'); champPhrase.classList.remove('m1-ko'); }
          lecteurIndice(T('quipReponse'), 4200);
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      }
      bValider.addEventListener('click', verifier);
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verifier(); } });
      const premier = cloze ? champs[0] : champPhrase;
      planifier(function () { try { premier.focus(); } catch (e) {} }, 200);
      await promesse;
    }

    // ---------- 4-6. Construire une phrase libre à partir d'une banque de mots ----------
    async function construire(phrase, cle, options2) {
      options2 = options2 || {};
      vider();
      zone.setAttribute('data-mode', 'construire'); zone.setAttribute('data-phrase', cle);
      const plateauPhrase = document.createElement('div');
      plateauPhrase.className = 'm1-construction';
      const vide = document.createElement('span');
      vide.className = 'm1-construction-vide';
      vide.textContent = T('construire_vide');
      plateauPhrase.appendChild(vide);
      zone.appendChild(plateauPhrase);
      const banque = document.createElement('div');
      banque.className = 'm1-plateau';
      zone.appendChild(banque);
      const choisis = [];          // ids dans l'ordre
      let erreurs = 0, termine = false;
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bValider = document.createElement('button');
      bValider.type = 'button'; bValider.className = 'lect-btn m1-btn'; bValider.textContent = T('valider');
      bValider.disabled = true;
      actions.appendChild(bValider);

      function rafraichir() {
        plateauPhrase.innerHTML = '';
        if (!choisis.length) plateauPhrase.appendChild(vide);
        choisis.forEach(function (id, i) {
          const t = tuile(id, 'm1-tuile-posee');
          t.addEventListener('click', function () {
            if (termine) return;
            choisis.splice(i, 1);
            const orig = banque.querySelector('.m1-tuile[data-id="' + id + '"].m1-tuile-partie');
            if (orig) orig.classList.remove('m1-tuile-partie');
            rafraichir();
          });
          plateauPhrase.appendChild(t);
        });
        bValider.disabled = termine || !choisis.length;
      }
      melanger(options2.banque || BANQUE_LIBRE).forEach(function (id) {
        const t = tuile(id);
        t.addEventListener('click', function () {
          if (termine || t.classList.contains('m1-tuile-partie')) return;
          t.classList.add('m1-tuile-partie');
          t.classList.remove('m1-indice');
          choisis.push(id);
          if (options2.direAuClic !== false) direMot(id);
          rafraichir();
        });
        banque.appendChild(t);
      });
      bValider.addEventListener('click', function () {
        if (termine) return;
        const bon = choisis.length === phrase.mots.length && choisis.every(function (id, i) { return id === phrase.mots[i]; });
        if (bon) {
          termine = true; bValider.disabled = true;
          plateauPhrase.classList.add('m1-ok');
          direPhrase(phrase);
          lecteurIndice(auHasard(T('quipOk')), 2200);
          planifier(fini, 1400);
          return;
        }
        erreurs++;
        secouer(plateauPhrase);
        const uneMalPlacee = phrase.mots.indexOf('une') !== -1 && choisis.indexOf('un') !== -1;
        lecteurIndice(uneMalPlacee ? T('quipUne') : auHasard(T('quipErreur')), 4200);
        if (erreurs >= 3) {          // on montre la bonne phrase, sans bloquer
          termine = true; bValider.disabled = true;
          choisis.length = 0;
          Array.prototype.forEach.call(banque.querySelectorAll('.m1-tuile'), function (t) { t.classList.remove('m1-tuile-partie'); });
          phrase.mots.forEach(function (id) {
            choisis.push(id);
            const orig = banque.querySelector('.m1-tuile[data-id="' + id + '"]:not(.m1-tuile-partie)');
            if (orig) orig.classList.add('m1-tuile-partie');
          });
          rafraichir();
          bValider.disabled = true;
          lecteurIndice(T('quipReponse'), 4200);
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      });
      rafraichir();
      await promesse;
    }

    // ---------- Carte « Savais-tu ? » / remarque ----------
    async function carte(titre, texte, visuel) {
      vider();
      zone.setAttribute('data-mode', 'carte');
      const c = document.createElement('div');
      c.className = 'm1-note';
      if (visuel) c.appendChild(visuel);
      const h = document.createElement('p'); h.className = 'm1-note-titre'; h.textContent = titre;
      const p = document.createElement('p'); p.className = 'm1-note-texte'; p.textContent = texte;
      c.appendChild(h); c.appendChild(p);
      zone.appendChild(c);
      await boutonAction(T('continuer'));
    }
    function pairesE() {          // parl|e  mang|e : le -e est surligné
      const d = document.createElement('div');
      d.className = 'm1-paire';
      [['parl', 'e'], ['mang', 'e']].forEach(function (p) {
        const s = document.createElement('span');
        s.className = 'm1-radical';
        s.innerHTML = '<b>je</b> ' + echapper(p[0]) + '<i>' + echapper(p[1]) + '</i>';
        d.appendChild(s);
      });
      return d;
    }

    // ---------- Les étapes ----------
    async function etapeMange() {
      etape(0); montrer('bek-observe');
      consigne(T('c_mange'));
      await lecture(PHRASES.mange, 'mange');
      await carte(T('noteE_titre'), T('noteE'), pairesE());
    }
    async function etapePhrase(cle, n) {
      etape(n);
      const ph = PHRASES[cle];
      montrer(cle === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(cle === 'sandwich' ? T('quipSandwich') : T('quipPoutine'), 6000); }, 1500);
      await lecture(ph, cle);
      consigne(T('c_ordre'));
      await ordre(ph, cle, cle === 'poutine' ? ['un'] : []);
      consigne(cle === 'sandwich' ? T('c_ecrire_part') : T('c_ecrire'));
      await ecrire(ph, cle, cle === 'sandwich' ? [1, 3] : null);
      await carte(T('cult_titre'), T('cult_' + cle));
    }
    async function etapeImage(cle, n) {
      etape(n);
      montrer(cle === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      consigne(T('c_image'));
      if (cle === 'sandwich') await construire(PHRASES.sandwich, 'image-sandwich');
      else await ecrire(PHRASES.poutine, 'image-poutine', null, true);
    }
    // ---------- Exercice audio : écoute avant de construire ----------
    // (surcharge de construire pour l'étape 6 : bouton « écouter » + texte révélable)
    const construireSimple = construire;
    async function construireAudio(phrase, cle) {
      const entete = document.createElement('div');
      entete.className = 'm1-ecoute';
      const bEcoute = document.createElement('button');
      bEcoute.type = 'button'; bEcoute.className = 'm1-haut-parleur'; bEcoute.setAttribute('aria-label', T('reecouter'));
      bEcoute.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg><span>' + echapper(T('reecouter')) + '</span>';
      bEcoute.addEventListener('click', function () { direPhrase(phrase); });
      const lienTexte = document.createElement('button');
      lienTexte.type = 'button'; lienTexte.className = 'm1-lien'; lienTexte.textContent = T('sans_son');
      const texteRevele = document.createElement('p');
      texteRevele.className = 'm1-texte-revele m1-off';
      texteRevele.textContent = phrase.texte;
      lienTexte.addEventListener('click', function () { texteRevele.classList.remove('m1-off'); lecteurIndice(T('quipSansSon'), 3500); });
      entete.appendChild(bEcoute); entete.appendChild(lienTexte); entete.appendChild(texteRevele);
      const attente = construireSimple(phrase, cle, { direAuClic: false });
      zone.insertBefore(entete, zone.firstChild);     // construire() vient de remplir la zone (synchrone jusqu'au premier await)
      planifier(function () { direPhrase(phrase); }, 400);
      await attente;
    }

    async function fin() {
      etape(ETAPES_TOTAL);
      montrer('bek-heureuse-ferme');
      try {
        const banque = window.KebBekMots;
        if (banque && typeof banque.ajouter === 'function') {
          const p = banque.ajouter(MOTS_APPRIS);       // pas de await : la sortie ne dépend pas du réseau
          if (p && typeof p.catch === 'function') p.catch(function (e) { console.warn('sequence-m1 : mots non enregistrés.', e); });
        }
      } catch (e) { console.warn('sequence-m1 : mots non enregistrés.', e); }
      vider();
      consigne('');
      await lecteurDit(T('fin'));
      await attendre(300);
      if (typeof callbacks.onTermine === 'function') {
        try { callbacks.onTermine({ mots: MOTS_APPRIS.slice(), fragments: 1 }); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    async function deroule() {
      await attendre(500);
      lecteurAfficher(T('intro'), true);
      montrer('bek-observe');
      await new Promise(function (resolve) { lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); }; });
      await etapeMange();
      await etapePhrase('sandwich', 1);
      await etapePhrase('poutine', 2);
      await etapeImage('sandwich', 3);
      await etapeImage('poutine', 4);
      // étape 6 : écoute puis cases (la phrase d'abord, « Je mange. » ensuite, puis la poutine)
      etape(5); montrer('bek-observe'); consigne(T('c_audio'));
      for (const cle of ['parle', 'mange', 'poutine']) await construireAudio(PHRASES[cle], 'audio-' + cle);
      await fin();
    }

    q('.m1-quitter').addEventListener('click', function () {
      if (typeof callbacks.onQuitter === 'function') callbacks.onQuitter();
    });

    // ---------- Lancement ----------
    precharger(POSES, function (nom) { return sources[nom]; }).then(function (etat) {
      if (arrete) return;
      creerPoses(etat);
      deroule().catch(function (e) { console.warn('sequence-m1 interrompue.', e); });
    });

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  window.KebBekM1 = { demarrer: demarrer, MOTS_APPRIS: MOTS_APPRIS };
})();
