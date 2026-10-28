/* ==================================================================
   sequence-memoire.js — la toute première mémoire : « Je parle français ».

   🆕 (18-10-2026) Suite directe de sequence-lecteur.js. Après la plongée
   (callbacks.onMemoire du réveil), on est DANS le souvenir :

     1. Bek parle, mais sa bulle est vide : seulement des cases pointillées.
     2. Les mots arrivent en bas, isolés, dans des cases (« tuiles »).
        Toucher une tuile en montre le sens (dans la langue de l'élève) ;
        la toucher une 2e fois l'envoie dans la prochaine case libre de la
        bulle. (Au survol à la souris, le sens s'affiche tout de suite et un
        seul clic suffit.) Mauvais mot : la tuile se secoue et revient ;
        après deux erreurs, la bonne tuile se met à briller.
     3. Trois tours, de moins en moins aidés :
          tour 1 — « Je parle » déjà en place, il manque « français » ;
          tour 2 — seul « Je » est en place ;
          tour 3 — rien n'est en place, plus une tuile en trop (« parles »).
     4. Souvenir reconstitué : on SORT de la page-mémoire (le fond chaud se
        retire) et on retrouve Bek, restée concentrée, qui s'exclame
        « Je parle français ! » (en français) puis « …mais c'est tout ce dont
        je me souviens. » (dans la langue de l'élève). Le Lecteur propose
        enfin d'en retrouver d'autres, puis callbacks.onTermine().

   🆕 (25-10-2026) L'AIDE DU LECTEUR : le Lecteur est un bouton. Un toucher
   sur lui (ou sur un mot déjà placé dans la bulle) ouvre une feuille qui
   explique chaque mot de la mémoire : nature grammaticale, équivalent dans
   la langue de l'élève, remarques propres à cette langue (genre, majuscule,
   pronom obligatoire…). Si une tuile est « sélectionnée », la feuille
   s'ouvre directement sur son mot. Une invitation discrète apparaît au
   début (« Touche-moi si tu ne comprends pas quelque chose ! »).
   Les explications vivent dans AIDE (une entrée par mot, par langue) : pour
   ajouter un mot ou un point de grammaire, on ajoute une entrée.

   🆕 (25-10-2026) MISE EN SCÈNE :
     - OUVERTURE (≈ 4 s, passable d'un toucher) : Bek concentrée, penche la
       tête, la relève avec confiance (petit sursaut), main sur la poitrine,
       solennelle — puis la bulle et les tuiles arrivent.
     - TROIS TOURS = trois postures et un rapprochement progressif (zoom
       1 → 1,12 → 1,25) ; à la fin, dézoom et retour à la position initiale.
     - BOUCHE SYNCHRONISÉE : au toucher qui place un mot, la bouche de Bek
       s'ouvre autant de fois que le mot a de syllabes et se referme à
       l'atterrissage de la tuile (paires fermée/ouverte par posture).
     - SONS : une note qui monte à chaque mot posé (gamme pentatonique,
       synthétisée, aucun fichier), un accord à la phrase complète, un « bonk »
       doux sur une erreur ; la VOIX dit le mot (fichier audio/fr/<mot>.mp3 s'il
       existe, sinon la synthèse vocale du navigateur). Bouton haut-parleur
       (mémorisé) pour couper le son — SON_PAR_DEFAUT règle l'état initial.
     Toutes les poses nouvelles sont facultatives : absentes, on retombe sur
     les poses existantes (heureuse / concentrée), la mise en scène marche
     quand même et s'enrichit à mesure que les images arrivent.

   Aucune « corruption » du texte : c'est une seule bonne mémoire, et c'est
   l'élève qui la reconstruit.

   🚧 Dictionnaire réduit à fr / en / es (repli : en, puis fr) — à étendre
   aux 19 langues avant mise en ligne. Les 4 mots affichés sont les mêmes
   pour tous ; seul leur SENS est traduit (clés sens_*).

   🎨 Réutilise le gabarit de Bek de sequence-reveil-bek.css (.rbek-fond,
   .rbek-pose, .rbek-bulle…) pour garder exactement la même taille, la même
   position et le même style ; et l'icône du Lecteur de sequence-lecteur.js.

   @param {string} idConteneur
   @param {object} options : langue, sources (surcharge des noms d'images),
                             dossierImages, extension
   @param {object} callbacks : onTermine()
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];

  // La phrase à reconstruire, et tous les mots possibles (y compris le piège).
  const PHRASE = ['je', 'parle', 'francais'];
  const MOTS = {
    je: 'Je', parle: 'parle', francais: 'fran\u00e7ais', parles: 'parles'
  };
  // `places` = indices des mots déjà en place au début du tour.
  // `pose` = posture de Bek pendant le tour ; `zoom` = rapprochement de la caméra.
  const TOURS = [
    { places: [0, 1], distracteurs: [],          pose: 'solennelle', zoom: 1 },
    { places: [0],    distracteurs: [],          pose: 'tendue',     zoom: 1.12 },
    { places: [],     distracteurs: ['parles'],  pose: 'emue',       zoom: 1.25 }
  ];
  // Nombre de syllabes de chaque mot : la bouche de Bek s'ouvre autant de fois.
  const SYLLABES = { je: 1, parle: 1, francais: 2, parles: 1 };
  const SON_PAR_DEFAUT = true;            // ← mettre false pour démarrer en silence
  const CLE_SON = 'kebbek_son';
  // Notes (do ré mi sol la do) : un mot posé = une note qui monte dans la phrase.
  const GAMME = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  const NOTE_DU_MOT = [0, 2, 3];          // je = do, parle = mi, français = sol

  const DICO = {
    fr: {
      sens_je: 'moi', sens_parle: '(moi) parler', sens_francais: 'la langue fran\u00e7aise', sens_parles: '(toi) parler',
      bekFin: '\u2026mais c\u2019est tout ce dont je me souviens.',
      lecteurFin: 'Il doit y en avoir d\u2019autres\u2026 Je peux t\u2019aider \u00e0 les retrouver.',
      suite: 'Suite',
      sonBouton: 'Son',
      aideBouton: 'Le Lecteur\u00a0: aide',
      aideInviteTactile: 'Touche-moi si tu ne comprends pas quelque chose\u00a0!',
      aideInviteSouris: 'Clique sur moi si tu ne comprends pas quelque chose\u00a0!',
      aideTitre: 'Le Lecteur t\u2019explique',
      aideMots: 'Les mots de cette m\u00e9moire',
      aideEquiv: '',
      aideFermer: 'Fermer'
    },
    en: {
      sens_je: 'I', sens_parle: '(I) speak', sens_francais: 'French', sens_parles: '(you) speak',
      bekFin: '\u2026but that\u2019s all I remember.',
      lecteurFin: 'There must be more\u2026 I can help you find them.',
      suite: 'Next',
      sonBouton: 'Sound',
      aideBouton: 'The Reader: help',
      aideInviteTactile: 'Tap me if you don\u2019t understand something!',
      aideInviteSouris: 'Click me if you don\u2019t understand something!',
      aideTitre: 'The Reader explains',
      aideMots: 'Words in this memory',
      aideEquiv: 'In your language',
      aideFermer: 'Close'
    },
    es: {
      sens_je: 'yo', sens_parle: '(yo) hablo', sens_francais: 'franc\u00e9s', sens_parles: '(t\u00fa) hablas',
      bekFin: '\u2026pero eso es todo lo que recuerdo.',
      lecteurFin: 'Debe de haber m\u00e1s\u2026 Puedo ayudarte a encontrarlos.',
      suite: 'Siguiente',
      sonBouton: 'Sonido',
      aideBouton: 'El Lector: ayuda',
      aideInviteTactile: '\u00a1Toca sobre m\u00ed si no entiendes algo!',
      aideInviteSouris: '\u00a1Haz clic en m\u00ed si no entiendes algo!',
      aideTitre: 'El Lector te explica',
      aideMots: 'Palabras de este recuerdo',
      aideEquiv: 'En tu idioma',
      aideFermer: 'Cerrar'
    }
  };

  // ---------- Les explications (une entrée par mot, par langue) ----------
  // nature  : catégorie grammaticale (étiquette)
  // equiv   : l'équivalent dans la langue de l'élève (facultatif)
  // texte   : paragraphes — c'est ICI qu'on ajuste à la langue (genre,
  //           majuscules, pronom obligatoire ou non…)
  // formes  : [[forme, explication], …] (facultatif)
  // Repli : en, puis fr. Pour un nouveau mot ou point de grammaire : une
  // entrée de plus (et son id dans MOTS).
  const AIDE = {
    fr: {
      je: {
        nature: 'Pronom personnel \u00b7 1re personne du singulier',
        texte: ['Il d\u00e9signe la personne qui parle\u00a0: moi.', 'Devant une voyelle, il devient j\u2019\u00a0: j\u2019aime, j\u2019habite.']
      },
      parle: {
        nature: 'Verbe \u00b7 pr\u00e9sent',
        texte: ['Le verbe parler, conjugu\u00e9 au pr\u00e9sent avec \u00ab\u00a0je\u00a0\u00bb.'],
        formes: [['parler', 'verbe \u00e0 l\u2019infinitif, c\u2019est-\u00e0-dire non conjugu\u00e9'], ['je parle', 'pr\u00e9sent de l\u2019indicatif']]
      },
      francais: {
        nature: 'Nom \u00b7 masculin',
        texte: ['Ici, il d\u00e9signe une langue.', 'Les noms de langues sont masculins (le fran\u00e7ais) et s\u2019\u00e9crivent sans majuscule.']
      },
      parles: {
        nature: 'Verbe \u00b7 pr\u00e9sent',
        texte: ['Le verbe parler, conjugu\u00e9 avec \u00ab\u00a0tu\u00a0\u00bb\u00a0: tu parles.', 'Avec \u00ab\u00a0je\u00a0\u00bb, on dit\u00a0: je parle, sans -s.']
      }
    },
    en: {
      je: {
        nature: 'Personal pronoun \u00b7 1st person singular',
        equiv: 'I',
        texte: ['It stands for the person who is speaking.', 'Unlike \u201cI\u201d, je has no capital letter in the middle of a sentence. Before a vowel it becomes j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verb \u00b7 present tense',
        texte: ['The verb parler (to speak), conjugated in the present tense with \u201cje\u201d.'],
        formes: [['parler', 'infinitive: the verb \u201cto speak\u201d, not conjugated'], ['je parle', '\u201cI speak\u201d or \u201cI am speaking\u201d: French uses one present tense for both']]
      },
      francais: {
        nature: 'Noun \u00b7 masculine',
        equiv: 'French',
        texte: ['Here it names a language.', 'Every French noun is masculine or feminine. English has no grammatical gender, so you learn the gender along with each noun. Languages are all masculine: le fran\u00e7ais.', 'And unlike English, the names of languages are not capitalized in French.']
      },
      parles: {
        nature: 'Verb \u00b7 present tense',
        texte: ['The verb parler with \u201ctu\u201d (you): tu parles.', 'With \u201cje\u201d, it\u2019s je parle, without the -s.']
      }
    },
    es: {
      je: {
        nature: 'Pronombre personal \u00b7 1.\u00aa persona del singular',
        equiv: 'yo',
        texte: ['Representa a la persona que habla.', 'En espa\u00f1ol casi nunca se dice \u00abyo\u00bb, porque el verbo ya lo indica (hablo). En franc\u00e9s el pronombre es obligatorio: je parle.']
      },
      parle: {
        nature: 'Verbo \u00b7 presente',
        texte: ['El verbo parler (hablar), en presente con \u00abje\u00bb.'],
        formes: [['parler', 'infinitivo: el verbo sin conjugar'], ['je parle', '\u00abyo hablo\u00bb. La -e final no se pronuncia']]
      },
      francais: {
        nature: 'Nombre \u00b7 masculino',
        equiv: 'franc\u00e9s',
        texte: ['Aqu\u00ed nombra una lengua.', 'Como en espa\u00f1ol, los sustantivos franceses son masculinos o femeninos, y los idiomas son masculinos: le fran\u00e7ais, el franc\u00e9s.', 'Y, como en espa\u00f1ol, se escriben con min\u00fascula.']
      },
      parles: {
        nature: 'Verbo \u00b7 presente',
        texte: ['El verbo parler con \u00abtu\u00bb: tu parles.', 'Con \u00abje\u00bb se dice je parle, sin -s.']
      }
    }
  };

  // Noms réels des fichiers (dossier images/reveil/) — mêmes entrées que la
  // table de index.html ; options.sources peut les surcharger.
  const SOURCES_PAR_DEFAUT = {
    'bek-heureuse-ferme':   'images/reveil/bek_heureuse_bouche-fermee_01-01.webp',
    'bek-heureuse-ouvert':  'images/reveil/bek_heureuse_bouche-ouverte_01-01.webp',
    'bek-concentree-ferme': 'images/reveil/bek_concentree_bouche-fermee_01-01.webp',
    'bek-concentree-ouvert':'images/reveil/bek_concentree_bouche-ouverte_01-01.webp',
    'bek-perplexe-05':      'images/reveil/bek-perplexe_05-01.webp',
    'bek-perplexe-06':      'images/reveil/bek-perplexe_06-01.webp',
    'bek-soulagee':         'images/reveil/bek-interpellee-soulagee_01-01.webp',
    // 🎨 Optionnelle : pose « déçue » pour « …mais c'est tout ce dont je me
    // souviens ». Absente, on retombe sur bek-perplexe-05.
    'bek-decue':            'images/reveil/bek_decue_01-01.webp',
    // 🎨 Optionnelles : l'ouverture et les postures des trois tours. Absentes,
    // on retombe sur les poses existantes (voir EXPRESSIONS).
    'bek-penchee':          'images/reveil/bek_penchee_01-01.webp',
    'bek-confiante':        'images/reveil/bek_confiante_01-01.webp',
    'bek-solennelle-ferme': 'images/reveil/bek_solennelle_bouche-fermee_01-01.webp',
    'bek-solennelle-ouvert':'images/reveil/bek_solennelle_bouche-ouverte_01-01.webp',
    'bek-tendue-ferme':     'images/reveil/bek_tendue_bouche-fermee_01-01.webp',
    'bek-tendue-ouvert':    'images/reveil/bek_tendue_bouche-ouverte_01-01.webp',
    'bek-emue-ferme':       'images/reveil/bek_emue_bouche-fermee_01-01.webp',
    'bek-emue-ouvert':      'images/reveil/bek_emue_bouche-ouverte_01-01.webp'
  };
  const POSES = [
    'bek-heureuse-ferme', 'bek-heureuse-ouvert', 'bek-concentree-ferme', 'bek-concentree-ouvert',
    'bek-perplexe-05', 'bek-perplexe-06', 'bek-soulagee', 'bek-decue',
    'bek-penchee', 'bek-confiante',
    'bek-solennelle-ferme', 'bek-solennelle-ouvert', 'bek-tendue-ferme', 'bek-tendue-ouvert',
    'bek-emue-ferme', 'bek-emue-ouvert'
  ];
  const EXPRESSIONS = {
    heureuse: { ferme: 'bek-heureuse-ferme',   ouvert: 'bek-heureuse-ouvert',   repli: 'bek-soulagee' },
    effort:   { ferme: 'bek-concentree-ferme', ouvert: 'bek-concentree-ouvert', repli: 'bek-perplexe-06' },
    triste:   { fixe: 'bek-decue', repli: 'bek-perplexe-05' },
    // ouverture de la mémoire (images uniques : elle ne parle pas encore)
    penchee:   { fixe: 'bek-penchee',   repli: 'bek-concentree-ferme' },
    confiante: { fixe: 'bek-confiante', repli: 'bek-heureuse-ferme' },
    // postures des trois tours (paires fermée/ouverte ; `alt` = expression de repli)
    solennelle: { ferme: 'bek-solennelle-ferme', ouvert: 'bek-solennelle-ouvert', alt: 'heureuse' },
    tendue:     { ferme: 'bek-tendue-ferme',     ouvert: 'bek-tendue-ouvert',     alt: 'heureuse' },
    emue:       { ferme: 'bek-emue-ferme',       ouvert: 'bek-emue-ouvert',       alt: 'heureuse' }
  };

  const VITESSE_TEXTE = 32;
  const PAUSE_FORTE = 260;
  const PAUSE_FAIBLE = 130;

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
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
  function melanger(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function demarrerMemoire(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const langue = langueActuelle(options);
    function T(cle) {
      return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
    }
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});
    const dossier = (options.dossierImages || 'images/reveil/').replace(/\/?$/, '/');
    const ext = options.extension || '.webp';
    function urlImage(nom) { return sources[nom] || (dossier + nom + ext); }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';

    let arrete = false;
    let niveau = 1;
    let numeroTour = 0;
    let sauter = false;         // vrai si l'élève a touché l'écran pendant l'ouverture
    let reveils = [];
    let jetonBouche = 0;
    let courante = null;
    let verrou = true;          // vrai tant que l'élève ne peut pas jouer
    let selection = null;       // tuile dont le sens est affiché
    let erreurs = 0;
    const minuteurs = [];
    const poses = {};

    function planifier(fn, ms) {
      const id = setTimeout(function () { if (!arrete) fn(); }, ms);
      minuteurs.push(id);
      return id;
    }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, ms); }); }

    // ---------- Gabarit ----------
    // Le fond « souvenir » reprend EXACTEMENT le dégradé de l'iris de la
    // plongée (.rbek-plongee) : aucun saut visuel au passage d'une scène à l'autre.
    conteneur.innerHTML =
      '<div class="rbek-scene mem-scene mem-souvenir" style="opacity:1;transition:none">' +
        '<div class="mem-fond-souvenir"></div>' +
        '<div class="mem-grain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="rbek-fond mem-bek-fond" role="img" aria-label="Bek">' +
          '<div class="rbek-zoom"><div class="rbek-bek"></div></div>' +
        '</div>' +
        '<div class="mem-cadre" aria-hidden="true"></div>' +
        '<div class="rbek-bulle rbek-bulle-cachee" aria-live="polite">' +
          '<div class="mem-phrase"></div>' +
          '<p class="rbek-bulle-texte mem-cache"><span class="rbek-tape"></span><span class="rbek-reste"></span></p>' +
          '<button type="button" class="rbek-fleche" tabindex="-1" aria-label="' + echapper(T('suite')) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="mem-plateau" role="group"></div>' +
        '<div class="mem-sens" aria-hidden="true"></div>' +
        '<button type="button" class="mem-son" aria-pressed="true" aria-label="' + echapper(T('sonBouton')) + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="mem-son-haut-parleur" d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/>' +
          '<path class="mem-son-ondes" d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/><path class="mem-son-barre" d="M4 4l16 16"/></svg></button>' +
        (iconeLecteur ? '<button type="button" class="mem-lecteur mem-lecteur-cache" aria-label="' + echapper(T('aideBouton')) + '">' + iconeLecteur + '</button>' : '') +
        (iconeLecteur ? '<div class="mem-invite mem-invite-cachee" aria-hidden="true"><p class="mem-invite-texte"></p></div>' : '') +
        (iconeLecteur ? '<div class="mem-lb mem-lb-cachee"><p class="mem-lb-texte"></p>' +
          '<button type="button" class="mem-lb-fleche" aria-label="' + echapper(T('suite')) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>' : '') +
        (iconeLecteur ?
          '<div class="mem-aide mem-aide-cachee" role="dialog" aria-modal="true" aria-labelledby="memAideTitre">' +
            '<div class="mem-aide-voile"></div>' +
            '<section class="mem-aide-feuille">' +
              '<header class="mem-aide-entete">' +
                '<span class="mem-aide-icone" aria-hidden="true">' + lect.htmlIcone(options, 'lect-lecteur-img') + '</span>' +
                '<h2 class="mem-aide-titre" id="memAideTitre">' + echapper(T('aideTitre')) + '</h2>' +
                '<button type="button" class="mem-aide-fermer" aria-label="' + echapper(T('aideFermer')) + '">' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
              '</header>' +
              '<p class="mem-aide-legende">' + echapper(T('aideMots')) + '</p>' +
              '<div class="mem-aide-mots" role="tablist"></div>' +
              '<article class="mem-aide-carte" aria-live="polite"></article>' +
            '</section>' +
          '</div>' : '') +
      '</div>';

    const scene = conteneur.querySelector('.mem-scene');
    const bek = conteneur.querySelector('.rbek-bek');
    const bulle = conteneur.querySelector('.rbek-bulle');
    const phrase = conteneur.querySelector('.mem-phrase');
    const bulleTexte = conteneur.querySelector('.rbek-bulle-texte');
    const bulleTape = conteneur.querySelector('.rbek-tape');
    const bulleReste = conteneur.querySelector('.rbek-reste');
    const fleche = conteneur.querySelector('.rbek-fleche');
    const plateau = conteneur.querySelector('.mem-plateau');
    const sens = conteneur.querySelector('.mem-sens');
    const lecteurEl = conteneur.querySelector('.mem-lecteur');
    const lb = conteneur.querySelector('.mem-lb');
    const invite = conteneur.querySelector('.mem-invite');
    const zoomEl = conteneur.querySelector('.rbek-zoom');
    const boutonSon = conteneur.querySelector('.mem-son');
    const aide = conteneur.querySelector('.mem-aide');
    const aideMotsEl = conteneur.querySelector('.mem-aide-mots');
    const aideCarte = conteneur.querySelector('.mem-aide-carte');
    const aideFermerBtn = conteneur.querySelector('.mem-aide-fermer');
    let aideOuverte = false;
    let aideUtilisee = false;
    let aideBloquee = false;
    let dernierFocus = null;
    if (LANGUES_POLICE_SYSTEME.indexOf(langue) !== -1) scene.classList.add('mem-police-systeme');

    // ---------- Poses de Bek (même logique que sequence-reveil-bek.js) ----------
    // `fondu` (ms) : fondu enchaîné doux entre deux postures ; sans lui, coupe nette
    // (c'est ce qu'il faut pour la bouche, qui bat vite).
    function montrer(nom, fondu) {
      const cible = poses[nom];
      if (!cible || cible === courante) return;
      const ancienne = courante;
      const ms = reduit ? 0 : (fondu || 0);
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms) {
        ancienne.style.transitionDuration = '0ms';
        planifier(function () { if (ancienne !== courante) ancienne.classList.remove('rbek-pose-visible'); }, ms + 40);
      } else {
        ancienne.classList.remove('rbek-pose-visible');
      }
    }
    function disponible(nom) { return !!(nom && poses[nom]); }
    function formes(exp) {
      const e = EXPRESSIONS[exp];
      if (disponible(e.ferme) && disponible(e.ouvert)) return { ferme: e.ferme, ouvert: e.ouvert };
      if (e.alt) return formes(e.alt);
      return { fixe: [e.fixe, e.ferme, e.repli, 'bek-soulagee'].find(disponible) };
    }
    function exprimer(exp, fondu) { const f = formes(exp); montrer(f.ferme || f.fixe, fondu); }
    function expTour() { return TOURS[numeroTour].pose; }

    // Caméra : rapprochement progressif (le visage reste entre la bulle et les tuiles)
    function zoomer(niveauZoom, ms) {
      zoomEl.style.transformOrigin = '50% 30%';
      zoomEl.style.transition = (reduit || !ms) ? 'none' : 'transform ' + ms + 'ms cubic-bezier(.4,0,.2,1)';
      zoomEl.style.transform = 'scale(' + niveauZoom + ')';
    }

    // La bouche s'ouvre `syllabes` fois, réparties sur `duree` ms, et se referme.
    function bouchePhrase(exp, syllabes, duree) {
      const f = formes(exp);
      if (!f.ferme) return;
      const mon = ++jetonBouche;
      const pas = duree / Math.max(1, syllabes);
      for (let i = 0; i < syllabes; i++) {
        planifier(function () { if (mon === jetonBouche) montrer(f.ouvert); }, i * pas);
        planifier(function () { if (mon === jetonBouche) montrer(f.ferme); }, i * pas + pas * 0.62);
      }
      planifier(function () { if (mon === jetonBouche) montrer(f.ferme); }, duree);
    }

    // ---------- Sons (synthétisés : aucun fichier requis) ----------
    const son = { actif: SON_PAR_DEFAUT, ctx: null };
    try {
      const v = localStorage.getItem(CLE_SON);
      if (v === '0') son.actif = false;
      else if (v === '1') son.actif = true;
    } catch (e) {}
    function ctxAudio() {
      if (!son.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { son.ctx = new AC(); } catch (e) { return null; }
      }
      if (son.ctx.state === 'suspended' && son.ctx.resume) son.ctx.resume().catch(function () {});
      return son.ctx;
    }
    function note(freq, debut, duree, type, gain) {
      if (!son.actif) return;
      const c = ctxAudio();
      if (!c) return;
      try {
        const t0 = c.currentTime + (debut || 0);
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = type || 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(gain || 0.12, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + duree);
        o.connect(g);
        g.connect(c.destination);
        o.start(t0);
        o.stop(t0 + duree + 0.05);
      } catch (e) {}
    }
    function sonMot(i) {
      const f = GAMME[NOTE_DU_MOT[i] != null ? NOTE_DU_MOT[i] : 0];
      note(f, 0, 0.42, 'sine', 0.13);
      note(f * 2, 0, 0.24, 'triangle', 0.035);
    }
    function sonErreur() { note(196, 0, 0.2, 'triangle', 0.1); note(174.6, 0.09, 0.22, 'triangle', 0.08); }
    function sonPhrase() {
      [0, 2, 3, 5].forEach(function (k, i) { note(GAMME[k], i * 0.1, 0.8, 'sine', 0.1); });
    }
    function sonRestauration() {
      [0, 1, 2, 3, 4, 5].forEach(function (k, i) { note(GAMME[k], i * 0.12, 1.1, 'sine', 0.08); });
    }

    // La voix : audio/fr/<id>.mp3 s'il existe, sinon la synthèse vocale du navigateur.
    const dispoAudio = {};
    function synthese(texte) {
      try {
        const ss = window.speechSynthesis;
        if (!ss || !window.SpeechSynthesisUtterance) return;
        const u = new window.SpeechSynthesisUtterance(texte);
        u.lang = options.voixLangue || 'fr-FR';
        u.rate = 0.85;
        u.pitch = 1.1;
        const voix = (ss.getVoices ? ss.getVoices() : []).filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf('fr') === 0; })[0];
        if (voix) u.voice = voix;
        ss.cancel();
        ss.speak(u);
      } catch (e) {}
    }
    function direMot(id, texte) {
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
    function reglerBoutonSon() {
      boutonSon.setAttribute('aria-pressed', son.actif ? 'true' : 'false');
      boutonSon.classList.toggle('mem-son-coupe', !son.actif);
    }
    reglerBoutonSon();
    boutonSon.addEventListener('click', function () {
      son.actif = !son.actif;
      try { localStorage.setItem(CLE_SON, son.actif ? '1' : '0'); } catch (e) {}
      if (!son.actif) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
      else { note(GAMME[2], 0, 0.3, 'sine', 0.1); }
      reglerBoutonSon();
    });
    scene.addEventListener('pointerdown', function () { if (son.actif) ctxAudio(); }, { once: true });

    // Bek « dit » un mot : la bouche bat un court instant (irrégulier).
    function parlerPendant(exp, ms) {
      const f = formes(exp);
      if (!f.ferme) return Promise.resolve();
      const fin = Date.now() + ms;
      return new Promise(function (resolve) {
        let ouverte = false;
        (function battre() {
          if (Date.now() >= fin) { montrer(f.ferme); resolve(); return; }
          ouverte = !ouverte;
          montrer(ouverte ? f.ouvert : f.ferme);
          planifier(battre, 90 + Math.random() * 110);
        })();
      });
    }

    // ---------- Étincelles ----------
    function etincelles(el, n, large) {
      const rs = scene.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const cx = r.left - rs.left + r.width / 2;
      const cy = r.top - rs.top + r.height / 2;
      for (let i = 0; i < n; i++) {
        const e = document.createElement('span');
        e.className = 'mem-etincelle';
        const angle = Math.random() * Math.PI * 2;
        const dist = (large ? 70 : 34) + Math.random() * (large ? 90 : 36);
        e.style.left = cx + 'px';
        e.style.top = cy + 'px';
        e.style.setProperty('--dx', Math.round(Math.cos(angle) * dist) + 'px');
        e.style.setProperty('--dy', Math.round(Math.sin(angle) * dist) + 'px');
        e.style.animationDelay = Math.round(Math.random() * 120) + 'ms';
        scene.appendChild(e);
        planifier(function () { if (e.parentNode) e.parentNode.removeChild(e); }, 1000);
      }
    }

    // ---------- La bulle : cases de la phrase ----------
    function construirePhrase(tour) {
      phrase.innerHTML = '';
      PHRASE.forEach(function (id, i) {
        const c = document.createElement('span');
        c.className = 'mem-case';
        c.dataset.id = id;
        c.innerHTML = '<span class="mem-mot">' + echapper(MOTS[id]) + '</span>';
        if (tour.places.indexOf(i) !== -1) c.classList.add('mem-case-pleine', 'mem-case-donnee');
        phrase.appendChild(c);
      });
      majSuivante();
    }
    function prochainVide() { return phrase.querySelector('.mem-case:not(.mem-case-pleine)'); }
    function majSuivante() {
      Array.prototype.forEach.call(phrase.querySelectorAll('.mem-case-suivante'), function (x) { x.classList.remove('mem-case-suivante'); });
      const s = prochainVide();
      if (s) s.classList.add('mem-case-suivante');
    }

    // ---------- Le plateau : tuiles de mots ----------
    function construirePlateau(tour) {
      plateau.innerHTML = '';
      plateau.classList.remove('mem-plateau-vide', 'mem-plateau-sorti');
      const manquants = PHRASE.filter(function (id, i) { return tour.places.indexOf(i) === -1; });
      const base = manquants.concat(tour.distracteurs || []);
      let ordre = melanger(base);
      for (let essai = 0; essai < 12 && ordre.length > 1 && ordre.join() === base.join(); essai++) ordre = melanger(base);
      ordre.forEach(function (id, i) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'mem-tuile mem-entree-cachee';
        b.dataset.id = id;
        b.textContent = MOTS[id];
        plateau.appendChild(b);
        planifier(function () { b.classList.remove('mem-entree-cachee'); }, 80 + i * 90);
      });
    }

    // ---------- Le sens d'un mot (étiquette qui glisse d'une tuile à l'autre) ----------
    function montrerSens(t) {
      t.dataset.vu = '1';
      sens.textContent = T('sens_' + t.dataset.id);
      const rs = scene.getBoundingClientRect();
      const r = t.getBoundingClientRect();
      const largeur = sens.offsetWidth;
      const centre = r.left - rs.left + r.width / 2;
      const x = Math.max(largeur / 2 + 10, Math.min(rs.width - largeur / 2 - 10, centre));
      sens.style.left = x + 'px';
      sens.style.top = (r.top - rs.top - 10) + 'px';
      sens.style.setProperty('--dx', Math.round(centre - x) + 'px');
      sens.classList.add('mem-sens-visible');
    }
    function cacherSens() { sens.classList.remove('mem-sens-visible'); }
    function selectionner(t) {
      if (selection && selection !== t) selection.classList.remove('mem-tuile-choisie');
      selection = t;
      t.classList.add('mem-tuile-choisie');
      montrerSens(t);
    }
    function deselectionner() {
      if (selection) selection.classList.remove('mem-tuile-choisie');
      selection = null;
      cacherSens();
    }

    plateau.addEventListener('click', function (e) {
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (!t || verrou || t.classList.contains('mem-tuile-partie')) return;
      // 1er toucher : on montre le sens ; 2e toucher (ou survol déjà fait) : on place
      if (t.dataset.vu !== '1') { selectionner(t); return; }
      placer(t);
    });
    plateau.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse' || verrou) return;
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (t && !t.classList.contains('mem-tuile-partie')) montrerSens(t);
    });
    plateau.addEventListener('pointerout', function (e) {
      if (e.pointerType !== 'mouse') return;
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (!t) return;
      if (selection) montrerSens(selection); else cacherSens();
    });

    // ---------- Placer un mot ----------
    function lecteurReagit(classe, duree) {
      if (!lecteurEl) return;
      lecteurEl.classList.remove('mem-lecteur-saut', 'mem-lecteur-oups');
      void lecteurEl.offsetWidth;
      lecteurEl.classList.add(classe);
      planifier(function () { lecteurEl.classList.remove(classe); }, duree);
    }

    function erreur(t) {
      sonErreur();
      t.classList.remove('mem-secoue');
      void t.offsetWidth;
      t.classList.add('mem-secoue');
      lecteurReagit('mem-lecteur-oups', 500);
      erreurs++;
      if (erreurs >= 2) {
        const cible = prochainVide();
        const bonne = cible && plateau.querySelector('.mem-tuile[data-id="' + cible.dataset.id + '"]:not(.mem-tuile-partie)');
        if (bonne) bonne.classList.add('mem-indice');
      }
    }

    function voler(t, cible) {
      return new Promise(function (resolve) {
        const rs = scene.getBoundingClientRect();
        const rt = t.getBoundingClientRect();
        const rc = cible.getBoundingClientRect();
        const clone = t.cloneNode(true);
        clone.classList.remove('mem-tuile-choisie', 'mem-indice', 'mem-entree-cachee');
        clone.classList.add('mem-vol');
        clone.style.left = (rt.left - rs.left) + 'px';
        clone.style.top = (rt.top - rs.top) + 'px';
        clone.style.width = rt.width + 'px';
        clone.style.height = rt.height + 'px';
        scene.appendChild(clone);
        t.classList.add('mem-tuile-partie');
        const dx = (rc.left + rc.width / 2) - (rt.left + rt.width / 2);
        const dy = (rc.top + rc.height / 2) - (rt.top + rt.height / 2);
        void clone.offsetWidth;
        const duree = reduit ? 0 : 520;
        clone.style.transition = 'transform ' + duree + 'ms cubic-bezier(.25,.9,.3,1.12)';
        clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        planifier(function () {
          if (clone.parentNode) clone.parentNode.removeChild(clone);
          resolve();
        }, duree + 30);
      });
    }

    function placer(t) {
      const cible = prochainVide();
      if (!cible) return;
      if (t.dataset.id !== cible.dataset.id) { erreur(t); return; }
      verrou = true;
      t.classList.remove('mem-indice');
      deselectionner();
      const id = t.dataset.id;
      // Bek « dit » le mot : sa bouche s'ouvre au toucher, se referme quand la tuile atterrit
      direMot(id, MOTS[id]);
      bouchePhrase(expTour(), SYLLABES[id] || 1, reduit ? 420 : 520);
      voler(t, cible).then(function () {
        cible.classList.add('mem-case-pleine', 'mem-case-pop');
        cible.classList.remove('mem-case-suivante');
        etincelles(cible, 7, false);
        sonMot(PHRASE.indexOf(id));
        erreurs = 0;
        majSuivante();
        if (!prochainVide()) { tourReussi(); return; }
        verrou = false;
      });
    }

    // ---------- Fin de tour / tours suivants ----------
    async function tourReussi() {
      // les tuiles restantes (le « piège ») s'effacent : la phrase est complète
      Array.prototype.forEach.call(plateau.querySelectorAll('.mem-tuile:not(.mem-tuile-partie)'), function (t) {
        t.classList.add('mem-tuile-efface');
      });
      bulle.classList.add('mem-reussi');
      lecteurReagit('mem-lecteur-saut', 650);
      sonPhrase();
      direMot('phrase', 'Je parle fran\u00e7ais');
      bouchePhrase(expTour(), 4, 1400);          // « Je-par-le-fran-çais » (4 syllabes sonores)
      await attendre(1750);
      bulle.classList.remove('mem-reussi');
      if (numeroTour + 1 < TOURS.length) {
        numeroTour++;
        zoomer(TOURS[numeroTour].zoom, 1300);       // Bek se rapproche
        exprimer(TOURS[numeroTour].pose, 450);      // nouvelle posture, en fondu
        phrase.classList.add('mem-phrase-sort');
        plateau.classList.add('mem-plateau-vide');
        await attendre(380);
        construirePhrase(TOURS[numeroTour]);
        phrase.classList.remove('mem-phrase-sort');
        construirePlateau(TOURS[numeroTour]);
        erreurs = 0;
        verrou = false;
      } else {
        await restauration();
      }
    }

    // ---------- Dialogue en texte (même mécanique que sequence-reveil-bek.js) ----------
    function dire(texte, exp, opts) {
      opts = opts || {};
      return new Promise(function (resolve) {
        const f = formes(exp);
        montrer(f.ferme || f.fixe);
        bek.classList.toggle('rbek-respire', !f.ferme);
        phrase.classList.add('mem-cache');
        bulleTexte.classList.remove('mem-cache');
        bulle.classList.remove('rbek-bulle-cachee');
        const signes = Array.from(texte);
        let i = 0, fini = false, ouverte = false;
        bulleTape.textContent = '';
        bulleReste.textContent = texte;

        function terminer() {
          if (fini) return;
          fini = true;
          bulle.removeEventListener('click', terminer);
          bulleTape.textContent = texte;
          bulleReste.textContent = '';
          if (f.ferme) montrer(f.ferme);
          bek.classList.remove('rbek-respire');
          planifier(attendreSuite, 300);
        }
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
          montrer(ouverte ? f.ouvert : f.ferme);
          planifier(bougerBouche, 90 + Math.random() * 110);
        }
        function taper() {
          if (fini) return;
          i++;
          bulleTape.textContent = signes.slice(0, i).join('');
          bulleReste.textContent = signes.slice(i).join('');
          if (i >= signes.length) { terminer(); return; }
          const c = signes[i - 1];
          const pause = '.?!\u2026\u3002\uff01\uff1f'.indexOf(c) !== -1 ? PAUSE_FORTE : (',;:\uff0c\u3001'.indexOf(c) !== -1 ? PAUSE_FAIBLE : 0);
          planifier(taper, VITESSE_TEXTE + pause);
        }
        bulle.addEventListener('click', terminer);
        if (f.ferme) bougerBouche();
        taper();
      });
    }

    // Réplique du Lecteur (bulle propre, en bas à gauche)
    function direLecteur(texte) {
      return new Promise(function (resolve) {
        if (!lb) { resolve(); return; }
        lb.querySelector('.mem-lb-texte').textContent = texte;
        lb.classList.remove('mem-lb-cachee');
        const btn = lb.querySelector('.mem-lb-fleche');
        planifier(function () { btn.focus({ preventScroll: true }); }, 500);
        btn.addEventListener('click', function () {
          lb.classList.add('mem-lb-cachee');
          planifier(resolve, 300);
        }, { once: true });
      });
    }

    // ---------- L'aide du Lecteur ----------
    function getAide(id) {
      return (AIDE[langue] && AIDE[langue][id]) || (AIDE.en && AIDE.en[id]) || (AIDE.fr && AIDE.fr[id]) || null;
    }
    // Les mots proposés dans la feuille : d'abord ceux déjà posés dans la bulle
    // (dans l'ordre), puis ceux qui restent sur le plateau (dans l'ordre où
    // ils sont affichés). L'ordre de la phrase n'est donc jamais « dévoilé ».
    function idsAide() {
      const ids = [];
      Array.prototype.forEach.call(phrase.querySelectorAll('.mem-case-pleine'), function (c) { ids.push(c.dataset.id); });
      Array.prototype.forEach.call(plateau.querySelectorAll('.mem-tuile:not(.mem-tuile-partie):not(.mem-tuile-efface)'), function (t) {
        if (ids.indexOf(t.dataset.id) === -1) ids.push(t.dataset.id);
      });
      return ids.length ? ids : PHRASE.slice();
    }
    function rendreAide(idVoulu) {
      const ids = idsAide();
      const actif = ids.indexOf(idVoulu) !== -1 ? idVoulu : ids[0];
      aideMotsEl.innerHTML = ids.map(function (id) {
        const sel = id === actif;
        return '<button type="button" role="tab" class="mem-aide-puce' + (sel ? ' mem-aide-puce-active' : '') +
          '" data-id="' + id + '" aria-selected="' + sel + '" dir="ltr">' + echapper(MOTS[id]) + '</button>';
      }).join('');
      const a = getAide(actif);
      let html = '<h3 class="mem-aide-mot" dir="ltr">' + echapper(MOTS[actif]) + '</h3>';
      if (a) {
        html += '<span class="mem-aide-nature">' + echapper(a.nature) + '</span>';
        if (a.equiv) {
          html += '<p class="mem-aide-equiv">' +
            (T('aideEquiv') ? '<span class="mem-aide-equiv-lib">' + echapper(T('aideEquiv')) + '</span> ' : '') +
            '<strong dir="ltr">' + echapper(a.equiv) + '</strong></p>';
        }
        (a.texte || []).forEach(function (para) { html += '<p class="mem-aide-para">' + echapper(para) + '</p>'; });
        if (a.formes && a.formes.length) {
          html += '<ul class="mem-aide-formes">' + a.formes.map(function (f) {
            return '<li><b dir="ltr">' + echapper(f[0]) + '</b><span>' + echapper(f[1]) + '</span></li>';
          }).join('') + '</ul>';
        }
      }
      aideCarte.innerHTML = html;
      aideCarte.scrollTop = 0;
      aideCarte.classList.remove('mem-aide-carte-change');
      void aideCarte.offsetWidth;
      aideCarte.classList.add('mem-aide-carte-change');
    }
    function surToucheAide(e) { if (e.key === 'Escape') fermerAide(); }
    function ouvrirAide(idVoulu) {
      if (!aide || aideOuverte || aideBloquee || arrete) return;
      aideOuverte = true;
      aideUtilisee = true;
      masquerInvite();
      cacherSens();
      rendreAide(idVoulu || (selection && selection.dataset.id) || null);
      dernierFocus = document.activeElement;
      aide.classList.remove('mem-aide-cachee');
      planifier(function () { if (aideOuverte) aideFermerBtn.focus({ preventScroll: true }); }, 380);
      document.addEventListener('keydown', surToucheAide);
    }
    function fermerAide() {
      if (!aideOuverte) return;
      aideOuverte = false;
      aide.classList.add('mem-aide-cachee');
      document.removeEventListener('keydown', surToucheAide);
      const retour = (dernierFocus && document.body.contains(dernierFocus)) ? dernierFocus : lecteurEl;
      if (retour && retour.focus) retour.focus({ preventScroll: true });
    }
    if (aide) {
      lecteurEl.addEventListener('click', function () { ouvrirAide(); });
      aideFermerBtn.addEventListener('click', fermerAide);
      aide.querySelector('.mem-aide-voile').addEventListener('click', fermerAide);
      aideMotsEl.addEventListener('click', function (e) {
        const b = e.target.closest ? e.target.closest('.mem-aide-puce') : null;
        if (b) rendreAide(b.dataset.id);
      });
      // un mot déjà posé dans la bulle s'explique aussi d'un toucher
      phrase.addEventListener('click', function (e) {
        const c = e.target.closest ? e.target.closest('.mem-case-pleine') : null;
        if (c) ouvrirAide(c.dataset.id);
      });
    }

    // Invitation discrète au début : une bulle près du Lecteur, qui s'efface seule
    function montrerInvite() {
      if (!invite || aideUtilisee || aideOuverte || aideBloquee) return;
      const tactile = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      invite.querySelector('.mem-invite-texte').textContent = T(tactile ? 'aideInviteTactile' : 'aideInviteSouris');
      invite.classList.remove('mem-invite-cachee');
      lecteurEl.classList.add('mem-lecteur-appel');
      lecteurReagit('mem-lecteur-saut', 650);
      planifier(masquerInvite, 7000);
    }
    function masquerInvite() {
      if (!invite) return;
      invite.classList.add('mem-invite-cachee');
      if (lecteurEl) lecteurEl.classList.remove('mem-lecteur-appel');
    }

    // ---------- Souvenir reconstitué : on sort de la mémoire ----------
    async function restauration() {
      aideBloquee = true;                       // plus d'aide pendant la sortie du souvenir
      if (aideOuverte) fermerAide();
      masquerInvite();
      if (lecteurEl) lecteurEl.classList.add('mem-lecteur-inactif');
      scene.classList.add('mem-restauree');
      etincelles(bulle, 22, true);
      sonRestauration();
      await attendre(1400);

      plateau.classList.add('mem-plateau-sorti');
      bulle.classList.add('rbek-bulle-cachee');
      cacherSens();
      await attendre(500);

      // le fond chaud se retire : on revient à Bek, concentrée
      scene.classList.remove('mem-souvenir');
      zoomer(1, 1300);                         // Bek reprend sa place
      exprimer('effort', 600);
      await attendre(1300);

      direMot('phrase', 'Je parle fran\u00e7ais');
      await dire('Je parle fran\u00e7ais\u00a0!', 'heureuse');
      await dire(T('bekFin'), 'triste');
      bulle.classList.add('rbek-bulle-cachee');
      await attendre(400);

      if (lecteurEl) await direLecteur(T('lecteurFin'));
      if (typeof callbacks.onTermine === 'function') {
        try { callbacks.onTermine(); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    // ================= Démarrage =================
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return;
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        bek.appendChild(img);
        poses[nom] = img;
      });
    }
    // Une pause que le toucher de l'élève peut écourter (ouverture passable)
    function pause(ms) {
      return new Promise(function (resolve) {
        if (sauter) { resolve(); return; }
        const rec = { resolve: resolve };
        rec.id = planifier(function () { reveils = reveils.filter(function (r) { return r !== rec; }); resolve(); }, ms);
        reveils.push(rec);
      });
    }
    function sauterOuverture() {
      if (sauter) return;
      sauter = true;
      reveils.forEach(function (r) { clearTimeout(r.id); r.resolve(); });
      reveils = [];
    }

    async function lancer(etat) {
      if (arrete) return;
      creerPoses(etat || {});
      zoomer(1, 0);
      exprimer('effort');                         // point de départ : concentrée
      scene.classList.add('mem-prete');
      scene.addEventListener('pointerdown', sauterOuverture);

      // --- Ouverture : elle cherche, se redresse, pose la main sur le cœur ---
      await pause(1500);
      if (!sauter) {                                // tête penchée
        if (disponible('bek-penchee')) exprimer('penchee', 380);
        else bek.classList.add('mem-penche-css');   // sans l'image : inclinaison simulée
        await pause(1150);
      }
      if (!sauter) {                                // elle la relève, avec confiance
        bek.classList.remove('mem-penche-css');
        exprimer('confiante', 260);
        bek.classList.remove('rbek-sursaut');
        void bek.offsetWidth;
        bek.classList.add('rbek-sursaut');
        await pause(850);
      }
      bek.classList.remove('mem-penche-css');
      exprimer('solennelle', sauter ? 0 : 380);     // main sur la poitrine, l'air solennel
      if (!sauter) await pause(950);
      scene.removeEventListener('pointerdown', sauterOuverture);

      bulle.classList.remove('rbek-bulle-cachee');
      construirePhrase(TOURS[0]);
      if (lecteurEl) planifier(function () { lecteurEl.classList.remove('mem-lecteur-cache'); }, 300);
      await attendre(700);
      construirePlateau(TOURS[0]);
      await attendre(500);
      verrou = false;
      planifier(montrerInvite, 1600);
    }

    if (options.precharger === false) lancer({});
    else precharger(POSES, urlImage).then(lancer);

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        document.removeEventListener('keydown', surToucheAide);
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      }
    };
  }

  window.KebBekMemoire = { demarrerMemoire: demarrerMemoire, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
