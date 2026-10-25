/* ==================================================================
   sequence-reveil-bek.js — séquence de Bek juste après le
   téléchargement de la langue. Même patron que les autres modules :
   window.KebBekReveilBek.demarrerReveilBek(idConteneur, options, callbacks).
   Les textes sont dans dico-reveil-bek.js (à charger AVANT ce fichier).

   DÉROULÉ
   Partie 1 (inchangée, validée)
     1. Bek, perplexe, regarde autour d'elle : six images en boucle,
        changements de pose NETS (les fondus faisaient « fantômer »).
     2. Après options.delaiBouton, le bouton-gant apparaît, « Salut ! »
        en dessous (langue de l'interface).
     3. Clic → Bek surprise (sursaut), puis soulagée.
        callbacks.onSalutFait()
   Partie 2 (🆕 05-10-2026) — le dialogue, enchaîné automatiquement
     (options.dialogue === false pour s'en tenir à la partie 1) :
       « Oh, salut ! … page vide… » ▸ (flèche : l'élève lit à son rythme)
       « Où sommes-nous ? »  → [Sur internet]
       « Sur internet ? Oh… » (dubitative, puis elle cherche)
       « On se connaît ? » → [Non. Pas encore !]
       « Je vois. Moi, je m'appelle Bek, et toi ? » → prénom
       elle répète le prénom (« comme pour voir si ça lui dit quelque chose »)
       GROS PLAN : « Tu es un garçon, une fille… ? Je te vois un peu mal. »
         → garçon / fille / homme / femme
         callbacks.onIdentite({ prenom, genre: 'm'|'f', adulte: bool })
       « Ah, d'accord ! Étrange… » → [Qu'est-ce qu'il y a d'étrange ?]
       « Quelle langue parlons-nous ? » → [langue choisie]
       « Hein ? Non, ça ne marche pas… je parle… je parle… »
       → la bulle-souvenir « .mem » apparaît ; au clic, plongée (iris),
         puis callbacks.onMemoire() — la scène de la mémoire (module à venir).

   EXPRESSIONS : table EXPRESSIONS plus bas. Une expression avec une paire
   de bouches (ferme/ouvert) « parle » — la bouche alterne de façon
   irrégulière pendant que le texte s'écrit. Sans paire : image fixe +
   très légère respiration. Une image absente du dossier est remplacée
   par son `repli` : on peut donc ajouter les dessins manquants un par un,
   sans toucher au code (mêmes noms de fichiers).

   @param {string} idConteneur
   @param {object} options
     - dossierImages : défaut 'images/reveil/'
     - extension     : défaut '.webp'
     - langue        : défaut localStorage 'kebbek_langue', sinon 'en'
     - nomLangue     : texte du bouton « langue choisie » (défaut : nom
                       natif de la langue, voir NOMS_LANGUES)
     - delaiBouton   : ms avant le bouton-gant ; défaut 4500
     - precharger    : défaut true (attend les images, 5 s maximum)
     - sources       : { nom: url } — remplace le chemin d'une image
     - dialogue      : false pour s'arrêter après onSalutFait
   @param {object} callbacks : onSalutFait, onIdentite, onMemoire
   @returns {{ arreter: function }}

   Aucune écriture dans localStorage ici : kebbek_langue ne doit être
   écrite que par la page hôte (voir lettre-initiale.js).
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];

  const SALUT = {
    fr: 'Salut !', en: 'Hi!', es: '¡Hola!', it: 'Ciao!', pt: 'Oi!', // pt : c'est l'élève qui salue → portugais du Brésil
    ca: 'Hola!', eo: 'Saluton!',
    zh: '你好！', ja: 'こんにちは！', ko: '안녕!', vi: 'Xin chào!', ht: 'Bonjou!',
    tl: 'Kumusta!', id: 'Halo!', nl: 'Hallo!', de: 'Hallo!', fa: 'سلام!',
    sv: 'Hej!', no: 'Hei!', ru: 'Привет!'
  };

  const NOMS_LANGUES = {
    fr: 'Français', en: 'English', es: 'Español', it: 'Italiano', pt: 'Português', ca: 'Català',
    eo: 'Esperanto', zh: '中文', ja: '日本語', ko: '한국어', vi: 'Tiếng Việt', ht: 'Kreyòl ayisyen',
    tl: 'Filipino', id: 'Bahasa Indonesia', nl: 'Nederlands', de: 'Deutsch', fa: 'فارسی',
    sv: 'Svenska', no: 'Norsk', ru: 'Русский'
  };

  // ---------- Images (noms de fichiers sans extension) ----------
  const POSES = [
    'bek-perplexe-01', 'bek-perplexe-02', 'bek-perplexe-03',
    'bek-perplexe-04', 'bek-perplexe-05', 'bek-perplexe-06',
    'bek-surprise', 'bek-soulagee',
    // dialogue — celles qui n'existent pas encore sont remplacées (voir EXPRESSIONS)
    'bek-espoir-ferme', 'bek-espoir-ouvert',
    'bek-comprehensive-ferme', 'bek-comprehensive-ouvert',
    'bek-examine-ferme', 'bek-examine-ouvert',
    'bek-conscience-ferme', 'bek-conscience-ouvert',
    'bek-concentree-ferme', 'bek-concentree-ouvert', 'bek-tres-concentree'
    // pour la scène de la mémoire (module à venir) : 'bek-heureuse-ferme', 'bek-heureuse-ouvert'
  ];
  // Image facultative de la bulle-souvenir : si 'memoire-bulle' existe dans le
  // dossier, elle remplace le nuage dessiné en SVG (voir afficherMemoire).
  const IMAGES_FACULTATIVES = ['memoire-bulle'];

  // Expressions : { ferme, ouvert } = paire de bouches (l'expression « parle »),
  // sinon { fixe } ; `repli` = image utilisée tant que le dessin n'existe pas.
  const EXPRESSIONS = {
    espoir:        { ferme: 'bek-espoir-ferme', ouvert: 'bek-espoir-ouvert', repli: 'bek-soulagee' },
    dubitative:    { fixe: 'bek-perplexe-05' },
    cherche:       { fixe: 'bek-perplexe-02' },
    etrange:       { fixe: 'bek-perplexe-01' },
    comprehensive: { ferme: 'bek-comprehensive-ferme', ouvert: 'bek-comprehensive-ouvert', repli: 'bek-soulagee' },
    examine:       { ferme: 'bek-examine-ferme',       ouvert: 'bek-examine-ouvert',       repli: 'bek-perplexe-05' },
    conscience:    { ferme: 'bek-conscience-ferme',    ouvert: 'bek-conscience-ouvert',    repli: 'bek-surprise' },
    effort:        { ferme: 'bek-concentree-ferme',    ouvert: 'bek-concentree-ouvert',    repli: 'bek-perplexe-06' },
    tresConcentree:{ fixe: 'bek-tres-concentree',       repli: 'bek-concentree-ferme' },
    heureuse:      { ferme: 'bek-heureuse-ferme',       ouvert: 'bek-heureuse-ouvert',       repli: 'bek-soulagee' }
  };

  // Partie 1 — boucle d'attente : [image, durée en ms]
  const BOUCLE = [
    ['bek-perplexe-06', 2300], ['bek-perplexe-01', 1700], ['bek-perplexe-02', 1700],
    ['bek-perplexe-05', 1900], ['bek-perplexe-03', 1100], ['bek-perplexe-04', 2300],
    ['bek-perplexe-03', 1000]
  ];

  // 🩹 Fondus de 350/600 ms retirés : poses de silhouettes différentes → fantômes.
  const DUREE_FONDU = 0;
  const DUREE_FONDU_SURPRISE = 0;
  const DUREE_SURPRISE = 1700;
  const DUREE_FONDU_SOULAGEE = 120;
  const PAUSE_APRES_SOULAGEE = 1100;

  const VITESSE_TEXTE = 32;   // ms par caractère
  const PAUSE_FORTE = 260;    // ms après . ? ! …
  const PAUSE_FAIBLE = 130;   // ms après , ; :
  // 🆕 (05-10-2026, demande de Raphaël) La 2e réplique suivait la 1re trop vite :
  // on ne pouvait pas la lire. Deux remèdes :
  //  - {suite:true} : une flèche apparaît dans la bulle et le dialogue attend
  //    le clic (chacun lit à son rythme, dans n'importe laquelle des 19 langues) ;
  //  - sinon, un délai de lecture proportionnel à la longueur du texte
  //    (remplacé par une pause courte, 250 ms, quand des boutons de réponse suivent).
  function pauseLecture(nbSignes) { return Math.min(2600, Math.max(700, 600 + 30 * nbSignes)); }
  const GENRES = {            // mêmes valeurs que l'ancienne séquence d'identité
    garcon: { genre: 'm', adulte: false }, fille: { genre: 'f', adulte: false },
    homme:  { genre: 'm', adulte: true  }, femme: { genre: 'f', adulte: true  }
  };
  const REGEX_PRENOM = /^[\p{L}\p{M}][\p{L}\p{M}'’ .\-]{0,19}$/u;

  function langueActuelle(options) {
    if (options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'en'; } catch (e) { return 'en'; }
  }

  // Résout avec { nom: true|false } : true = chargée, false = introuvable (absent = pas encore su).
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

  function demarrerReveilBek(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const dossier = (options.dossierImages || 'images/reveil/').replace(/\/?$/, '/');
    const ext = options.extension || '.webp';
    const delaiBouton = typeof options.delaiBouton === 'number' ? options.delaiBouton : 4500;
    const langue = langueActuelle(options);
    const texteSalut = SALUT[langue] || SALUT.en;
    const dico = window.KebBekReveilBekDico || {};
    function T(cle) {
      return ((dico[langue] && dico[langue][cle]) || (dico.en && dico.en[cle]) || (dico.fr && dico.fr[cle]) || '');
    }
    const nomLangue = options.nomLangue || NOMS_LANGUES[langue] || langue;

    function urlImage(nom) {
      return (options.sources && options.sources[nom]) || (dossier + nom + ext);
    }

    let arrete = false;
    let salue = false;
    let indexBoucle = 0;
    let niveau = 1;
    let courante = null;
    const minuteurs = [];
    const poses = {};
    let etatImages = {};

    function planifier(fn, ms) {
      const id = setTimeout(function () { if (!arrete) fn(); }, ms);
      minuteurs.push(id);
      return id;
    }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, ms); }); }

    // ---------- Gabarit ----------
    conteneur.innerHTML =
      '<div class="rbek-scene">' +
        '<div class="rbek-fond" role="img" aria-label="Bek">' +
          '<div class="rbek-zoom"><div class="rbek-bek"></div></div>' +
        '</div>' +
        '<div class="rbek-bulle rbek-bulle-cachee" aria-live="polite">' +
          '<p class="rbek-bulle-texte"><span class="rbek-tape"></span><span class="rbek-reste"></span></p>' +
          '<button type="button" class="rbek-fleche" tabindex="-1" aria-label="' + T('suite') + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="rbek-choix rbek-choix-cache"></div>' +
        '<div class="rbek-zone-salut rbek-cache">' +
          '<button type="button" class="rbek-bouton-salut" aria-label="' + texteSalut + '">' +
            '<img class="rbek-gant" alt="" draggable="false" src="' + urlImage('main-salue') + '">' +
          '</button>' +
          '<p class="rbek-legende' + (LANGUES_POLICE_SYSTEME.indexOf(langue) !== -1 ? ' rbek-police-systeme' : '') + '">' +
            texteSalut +
          '</p>' +
        '</div>' +
      '</div>';

    const scene = conteneur.querySelector('.rbek-scene');
    const fond = conteneur.querySelector('.rbek-fond');
    const zoom = conteneur.querySelector('.rbek-zoom');
    const bek = conteneur.querySelector('.rbek-bek');
    const zone = conteneur.querySelector('.rbek-zone-salut');
    const bouton = conteneur.querySelector('.rbek-bouton-salut');
    const bulle = conteneur.querySelector('.rbek-bulle');
    const bulleTape = conteneur.querySelector('.rbek-tape');
    const bulleReste = conteneur.querySelector('.rbek-reste');
    const fleche = conteneur.querySelector('.rbek-fleche');
    const panneauChoix = conteneur.querySelector('.rbek-choix');

    // ---------- Changement de pose (net : 0 ms par défaut) ----------
    function montrer(nom, duree) {
      const cible = poses[nom];
      if (!cible || cible === courante) return;
      const ms = typeof duree === 'number' ? duree : DUREE_FONDU;
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      const ancienne = courante;
      courante = cible;
      if (ancienne) {
        const retirer = function () {
          if (ancienne === courante) return;
          ancienne.style.transitionDuration = '0ms'; // sinon elle s'effacerait lentement par-dessous
          ancienne.classList.remove('rbek-pose-visible');
        };
        if (ms <= 0) retirer(); else planifier(retirer, ms + 20);
      }
    }

    // ---------- Expressions ----------
    function disponible(nom) { return !!(nom && poses[nom]); }
    function formes(exp) {
      const e = EXPRESSIONS[exp] || EXPRESSIONS.espoir;
      if (disponible(e.ferme) && disponible(e.ouvert)) return { ferme: e.ferme, ouvert: e.ouvert };
      return { fixe: [e.fixe, e.ferme, e.repli, 'bek-soulagee'].find(disponible) };
    }
    function exprimer(exp) {
      const f = formes(exp);
      montrer(f.ferme || f.fixe, 0);
    }

    // ================= PARTIE 1 : boucle d'attente + salut =================
    function boucle() {
      if (arrete || salue) return;
      const etape = BOUCLE[indexBoucle % BOUCLE.length];
      montrer(etape[0]);
      indexBoucle++;
      planifier(boucle, etape[1]);
    }
    function afficherBouton() { if (!salue) zone.classList.remove('rbek-cache'); }

    bouton.addEventListener('click', function () {
      if (salue) return;
      salue = true;
      zone.classList.add('rbek-cache');
      montrer('bek-surprise', DUREE_FONDU_SURPRISE);
      bek.classList.remove('rbek-sursaut');
      void bek.offsetWidth;
      bek.classList.add('rbek-sursaut');
      planifier(function () { montrer('bek-soulagee', DUREE_FONDU_SOULAGEE); }, DUREE_SURPRISE);
      planifier(function () {
        if (typeof callbacks.onSalutFait === 'function') {
          try { callbacks.onSalutFait(); } catch (e) { console.warn('onSalutFait a échoué.', e); }
        }
        if (options.dialogue !== false) {
          scenario().catch(function (e) { console.warn('Dialogue de Bek interrompu.', e); });
        }
      }, DUREE_SURPRISE + DUREE_FONDU_SOULAGEE + PAUSE_APRES_SOULAGEE);
    });

    // ================= PARTIE 2 : dialogue =================

    // ---- Bulle de Bek : le texte s'écrit lettre par lettre ----
    // Le texte complet occupe sa place dès le début (partie « reste »
    // invisible) : la bulle ne grandit pas en cours de route.
    function dire(texte, exp, opts) {
      opts = opts || {};
      return new Promise(function (resolve) {
        const f = formes(exp);
        montrer(f.ferme || f.fixe, 0);
        bek.classList.toggle('rbek-respire', !f.ferme);
        bulle.classList.remove('rbek-bulle-cachee');
        const signes = Array.from(texte);
        let i = 0;
        let fini = false;
        let ouverte = false;
        bulleTape.textContent = '';
        bulleReste.textContent = texte;

        function terminer() {
          if (fini) return;
          fini = true;
          bulle.removeEventListener('click', terminer);
          bulleTape.textContent = texte;
          bulleReste.textContent = '';
          if (f.ferme) montrer(f.ferme, 0);
          bek.classList.remove('rbek-respire');
          if (opts.suite) planifier(attendreSuite, 300);
          else planifier(resolve, typeof opts.pause === 'number' ? opts.pause : pauseLecture(signes.length));
        }
        // Flèche « suite » : on attend un clic (flèche ou bulle) avant de continuer.
        function attendreSuite() {
          let avance = false;
          function avancer() {
            if (avance) return;
            avance = true;
            bulle.removeEventListener('click', avancer);
            bulle.classList.remove('rbek-bulle-suite');
            planifier(resolve, 150);
          }
          bulle.classList.add('rbek-bulle-suite');
          bulle.addEventListener('click', avancer);
          fleche.addEventListener('click', avancer, { once: true });
        }
        function bougerBouche() {
          if (fini) return;
          ouverte = !ouverte;
          montrer(ouverte ? f.ouvert : f.ferme, 0);
          planifier(bougerBouche, 90 + Math.random() * 110); // irrégulier : pas de métronome
        }
        function taper() {
          if (fini) return;
          i++;
          bulleTape.textContent = signes.slice(0, i).join('');
          bulleReste.textContent = signes.slice(i).join('');
          if (i >= signes.length) { terminer(); return; }
          const c = signes[i - 1];
          const pause = '.?!…。！？'.indexOf(c) !== -1 ? PAUSE_FORTE : (',;:，、'.indexOf(c) !== -1 ? PAUSE_FAIBLE : 0);
          planifier(taper, VITESSE_TEXTE + pause);
        }
        bulle.addEventListener('click', terminer); // un clic sur la bulle passe l'animation
        if (f.ferme) bougerBouche();
        taper();
      });
    }

    // ---- Réponses de l'élève ----
    // Le panneau naît CACHÉ puis se dévoile 30 ms plus tard : sans cela, la
    // transition d'entrée ne se jouerait pas (et un clic très rapide
    // pourrait être suivi d'un réaffichage).
    function afficherChoix(classeSupp) {
      panneauChoix.className = 'rbek-choix rbek-choix-cache' + (classeSupp ? ' ' + classeSupp : '');
    }
    function masquerChoix() { panneauChoix.classList.add('rbek-choix-cache'); }

    function proposer(options2, grille) {
      return new Promise(function (resolve) {
        panneauChoix.innerHTML = '';
        options2.forEach(function (opt) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'rbek-btn-reponse' + (grille ? ' rbek-btn-clair' : '');
          b.textContent = opt.label;
          b.addEventListener('click', function () {
            if (b.disabled) return;
            Array.from(panneauChoix.querySelectorAll('button')).forEach(function (x) { x.disabled = true; });
            masquerChoix();
            planifier(function () { resolve(opt.id); }, 250);
          });
          panneauChoix.appendChild(b);
        });
        afficherChoix(grille ? 'rbek-choix-grille' : '');
        // laisse un tour de rendu pour que la transition d'entrée se joue
        planifier(function () { panneauChoix.classList.remove('rbek-choix-cache'); }, 30);
      });
    }

    function demanderNom() {
      return new Promise(function (resolve) {
        panneauChoix.innerHTML =
          '<input type="text" class="rbek-champ-nom" maxlength="20" autocomplete="off" autocapitalize="words" ' +
            'spellcheck="false" enterkeyhint="done" aria-label="' + T('nomPlaceholder') + '" placeholder="' + T('nomPlaceholder') + '">' +
          '<button type="button" class="rbek-btn-reponse" disabled>OK</button>';
        const champ = panneauChoix.querySelector('input');
        const ok = panneauChoix.querySelector('button');
        function valide() { return REGEX_PRENOM.test(champ.value.trim()); }
        function envoyer() {
          if (!valide()) return;
          const prenom = champ.value.trim();
          champ.disabled = true; ok.disabled = true;
          masquerChoix();
          planifier(function () { resolve(prenom); }, 250);
        }
        champ.addEventListener('input', function () { ok.disabled = !valide(); });
        champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') envoyer(); });
        ok.addEventListener('click', envoyer);
        afficherChoix('rbek-choix-nom');
        planifier(function () {
          panneauChoix.classList.remove('rbek-choix-cache');
          champ.focus({ preventScroll: true });
        }, 30);
      });
    }

    // ---- Gros plan (zoom sur le visage) ----
    function zoomer(avant) {
      zoom.classList.toggle('rbek-gros-plan', !!avant);
      return attendre(950);
    }

    // ---- Bulle-souvenir « .mem » + plongée ----
    // 🎨 (05-10-2026, demande de Raphaël) Retravaillée pour égaler les autres
    // boutons : nuage en relief (ombre brune décalée, comme les boutons), dégradé
    // crème → pêche, reflet, petites étincelles qui scintillent, halo doré qui
    // pulse et trois petites bulles qui descendent vers la tête de Bek. Le texte
    // « .mem » reste du vrai texte (police du site). Si l'image 'memoire-bulle'
    // existe dans le dossier, elle remplace le nuage SVG.
    const NUAGE = 'M38 82C14 82 8 52 32 46C28 22 62 12 76 30C90 8 128 20 122 50C146 56 140 82 116 82Z';
    function etoile(cx, cy, r, retard) {
      return '<path class="rbek-etincelle" style="animation-delay:' + retard + 's;transform-origin:' + cx + 'px ' + cy + 'px" ' +
        'd="M' + cx + ' ' + (cy - r) + 'Q' + cx + ' ' + cy + ' ' + (cx + r) + ' ' + cy + 'Q' + cx + ' ' + cy + ' ' + cx + ' ' + (cy + r) +
        'Q' + cx + ' ' + cy + ' ' + (cx - r) + ' ' + cy + 'Q' + cx + ' ' + cy + ' ' + cx + ' ' + (cy - r) + 'Z" ' +
        'fill="#FFD36B" stroke="#4A3B33" stroke-width="1.8" stroke-linejoin="round"/>';
    }
    function nuageSvg() {
      const formes = '<path d="' + NUAGE + '"/><circle cx="46" cy="100" r="8"/><circle cx="30" cy="114" r="5"/>';
      return '<svg class="rbek-nuage" viewBox="0 0 150 128" aria-hidden="true">' +
        '<defs><linearGradient id="rbekDegrade" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#FFFFFF"/><stop offset="0.55" stop-color="#FFF6EE"/><stop offset="1" stop-color="#FAD3BE"/>' +
        '</linearGradient></defs>' +
        '<g fill="#4A3B33" transform="translate(0 6)">' + formes + '</g>' +
        '<g fill="url(#rbekDegrade)" stroke="#4A3B33" stroke-width="3.5" stroke-linejoin="round">' + formes + '</g>' +
        '<path d="M36 54C39 43 49 36 61 35" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.95"/>' +
        etoile(132, 20, 12, 0) + etoile(12, 52, 8, 0.7) + etoile(124, 98, 9, 1.3) + etoile(66, 6, 6.5, 0.35) + etoile(104, 62, 5, 1.0) +
        '</svg>';
    }
    // « .mem » n'est plus un texte flottant : c'est l'étiquette d'une petite icône
    // de FICHIER (page à coin corné, bandeau pêche) posée au centre du nuage — le
    // souvenir est un fichier, et le nuage le fait surgir de l'esprit de Bek.
    function fichierSvg() {
      const doc = 'M6 5H60L78 23V45Q78 49 74 49H10Q6 49 6 45Z';
      return '<svg class="rbek-memoire-fichier" viewBox="0 0 84 56" aria-hidden="true">' +
        '<path d="' + doc + '" fill="#4A3B33" transform="translate(0 4)"/>' +
        '<path d="' + doc + '" fill="#E08867" stroke="#4A3B33" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M60 5V19Q60 23 64 23H78" fill="#FAD3BE" stroke="#4A3B33" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M12 12Q22 9 40 9" fill="none" stroke="#F4B79C" stroke-width="3" stroke-linecap="round"/>' +
        '<text x="40" y="40.5" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="21" font-weight="700" ' +
          'fill="#FFFFFF" stroke="#4A3B33" stroke-width="3.2" paint-order="stroke" stroke-linejoin="round">.mem</text>' +
        '</svg>';
    }
    function afficherMemoire() {
      const m = document.createElement('button');
      m.type = 'button';
      m.className = 'rbek-memoire';
      m.setAttribute('aria-label', T('memoire'));
      const image = etatImages['memoire-bulle'] === true;
      m.innerHTML =
        '<span class="rbek-memoire-halo"></span>' +
        '<span class="rbek-memoire-corps">' +
          (image ? '<img class="rbek-memoire-img" alt="" draggable="false" src="' + urlImage('memoire-bulle') + '">' : nuageSvg()) +
          fichierSvg() +
        '</span>';
      fond.appendChild(m);
      planifier(function () { m.classList.add('rbek-memoire-visible'); }, 30);

      // 🆕 (18-10-2026) Avant la plongée : l'élève s'interroge (« What's that ? »),
      // puis le fichier .mem se révèle illisible et il faut installer Le Lecteur
      // (sequence-lecteur.js). Sans ce module, on plonge directement comme avant.
      const lecteur = window.KebBekLecteur;
      if (lecteur) lecteur.afficherCommentaire(scene, { langue: langue, delai: 1100 });

      function plonger() {
        const r = m.getBoundingClientRect();
        const x = Math.round(r.left + r.width / 2);
        const y = Math.round(r.top + r.height / 2);
        const iris = document.createElement('div');
        iris.className = 'rbek-plongee';
        iris.style.clipPath = 'circle(0px at ' + x + 'px ' + y + 'px)';
        scene.appendChild(iris);
        void iris.offsetWidth;
        iris.style.clipPath = 'circle(150vmax at ' + x + 'px ' + y + 'px)';
        planifier(function () {
          if (typeof callbacks.onMemoire === 'function') {
            try { callbacks.onMemoire(); } catch (e) { console.warn('onMemoire a échoué.', e); }
          }
        }, 1250);
      }

      m.addEventListener('click', function () {
        if (m.disabled) return;
        m.disabled = true;
        bulle.classList.add('rbek-bulle-cachee');
        if (!lecteur) { plonger(); return; }
        lecteur.demarrer(scene, { langue: langue }, {
          // « Non » : on rend la main à l'élève (la bulle .mem reste cliquable)
          onAnnule: function () {
            m.disabled = false;
            bulle.classList.remove('rbek-bulle-cachee');
            lecteur.afficherCommentaire(scene, { langue: langue, delai: 200 });
          },
          onPret: plonger
        });
      });
    }

    // ---- Le scénario, réplique par réplique ----
    async function scenario() {
      await attendre(300);

      await dire(T('bek1'), 'espoir', { suite: true });
      await dire(T('bek2'), 'espoir', { pause: 250 });
      await proposer([{ id: 'internet', label: T('repInternet') }]);

      await dire(T('bek3'), 'dubitative');
      exprimer('cherche');                 // « elle creuse dans sa tête »
      await attendre(1500);
      await dire(T('bek4'), 'espoir', { pause: 250 });
      await proposer([{ id: 'pasEncore', label: T('repPasEncore') }]);

      await dire(T('bek5a'), 'comprehensive');
      await dire(T('bek5b'), 'espoir', { pause: 250 });
      const prenom = await demanderNom();

      await dire(prenom + ' ?…', 'cherche', { pause: 250 }); // elle répète le prénom
      await attendre(1200);

      await zoomer(true);                  // elle s'approche : « Je te vois un peu mal. »
      await dire(T('bek7').replace('{nom}', prenom), 'examine', { pause: 250 });
      const choix = await proposer([
        { id: 'garcon', label: T('garcon') }, { id: 'fille', label: T('fille') },
        { id: 'homme',  label: T('homme') },  { id: 'femme', label: T('femme') }
      ], true);
      const g = GENRES[choix] || GENRES.garcon;
      if (typeof callbacks.onIdentite === 'function') {
        try { callbacks.onIdentite({ prenom: prenom, genre: g.genre, adulte: g.adulte }); }
        catch (e) { console.warn('onIdentite a échoué.', e); }
      }

      await zoomer(false);
      await dire(T('bek8'), 'etrange', { pause: 250 });
      await proposer([{ id: 'etrange', label: T('repEtrange') }]);

      await dire(T('bek9'), 'conscience', { pause: 250 });
      await proposer([{ id: 'langue', label: nomLangue }]);

      await dire(T('bek10'), 'effort', { pause: 300 });
      exprimer('tresConcentree');          // elle se concentre de toutes ses forces…
      await attendre(700);
      afficherMemoire();                   // …et le souvenir surgit
    }

    // ================= Démarrage (après préchargement) =================
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return; // image absente : l'expression utilisera son repli
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        bek.appendChild(img);
        poses[nom] = img;
      });
    }
    function lancer(etat) {
      if (arrete) return;
      etatImages = etat || {};
      creerPoses(etatImages);
      scene.classList.add('rbek-prete');
      boucle();
      planifier(afficherBouton, delaiBouton);
    }

    if (options.precharger === false) {
      lancer({});
    } else {
      precharger(POSES.concat(['main-salue'], IMAGES_FACULTATIVES), urlImage).then(lancer);
    }

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
      }
    };
  }

  window.KebBekReveilBek = { demarrerReveilBek: demarrerReveilBek };
})();
