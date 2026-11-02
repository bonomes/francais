/* ==================================================================
   sequence-menu.js — le menu « simple » : le Lecteur mène la première visite.

   🆕 (02-11-2026) Ordre de la PREMIÈRE visite : 1. le Lecteur demande la permission
   d'ouvrir les fichiers .mem (lire et organiser les mémoires) ; 2. écran d'ASSEMBLAGE
   (assembler()) : il « réfléchit » et « organise », étape par étape, comme une IA ;
   3. le menu apparaît (une ligne + aperçu du chemin), le Lecteur explique le chemin ;
   4. SECONDE demande, « quelques choses de plus » (gérer et créer tes contacts = il
   cherche un professeur ; te corriger poliment ; travailler en arrière-plan), puis
   la fenêtre de confirmation. Le gag du refus vaut pour les deux demandes.

   🆕 (02-11-2026) Le menu complet n'arrive plus qu'APRÈS la première mémoire.
   Trois états, mémorisés dans kebbek_menu_etape :
     ''          première visite : tutoriel ci-dessous (étapes 1 à 4), qui se
                 termine sur un menu à UNE ligne (Mémoires, qui pulse) → 'autorise' ;
     'autorise'  menu à une ligne. Dès que la première mémoire (ID_PREMIERE_MEMOIRE,
                 lue via KebBekProgression.lireProgression()) est terminée, le Lecteur
                 ANNONCE ce qu'il a ajouté « pendant que nous faisions la première
                 leçon » (dont un professeur : la ligne Cours privés), les autres
                 lignes apparaissent, puis → 'complet' ;
     'complet'   menu complet directement.
   Pour tester sans refaire la mémoire : ?menu=annonce (rejoue l'annonce),
   ?menu=reduit (menu à une ligne), ?menu=complet — rien n'est enregistré.
   Sans window.KebBekProgression, on ne peut pas savoir : menu complet.

   🆕 (01-11-2026, refonte) Plus de visite guidée par Bek. Dans un seul
   conteneur (scène .rbek-scene), le déroulé de la PREMIÈRE visite est :

     1. Le menu ne compte qu'UNE ligne : « Mémoires ».
     2. Sous cette ligne, un aperçu du chemin des mémoires : une case
        ouverte, quelques cases verrouillées (APERCU_CASES).
     3. (ordre réel : voir plus haut) Le Lecteur demande des « autorisations »
        (fenêtre système). Gag : refuser ne mène nulle part — la seconde
        fenêtre n'offre que « Autoriser » et « Autoriser aussi ». Elle
        promet que l'autorisation pourra être retirée dans les paramètres.
     4. L'aperçu se replie ; Mémoires reste SEULE (elle pulse : « vas-y »).
        Les autres lignes viendront après la première mémoire (annonce()),
        dans l'ordre de ENTREES : Cours privés, Connexion / Créer un compte
        (ou Mon compte), [Mode professeur], Paramètres (toujours la dernière).
     5. Dans Paramètres, « Retirer » l'autorisation échoue toujours.

   Bek reste muette (bouche fermée) mais RÉAGIT, à droite : son expression change
   à chaque réplique du Lecteur et à chaque fenêtre (voir tutoriel()). Les poses
   sont dans SOURCES_PAR_DEFAUT ; en changer une = changer le nom passé à montrer().

   options.visite : true = toujours rejouer le tutoriel, false = jamais (menu complet).
   Sans window.KebBekLecteur, tout est sauté (menu complet).

   Entrées : la liste ENTREES (dans demarrerMenuSimple). Ajouter une entrée =
   une ligne + son libellé (menu…) + une icône + son callback.
     · Mémoires → callbacks.onMemoires (onHistoires accepté)
       ⚠️ titre PROVISOIRE : un terme plus large est à trouver (mémoires,
       histoires, exercices…)
     · Cours privés → callbacks.onPrives
     · Connexion / Créer un compte (invité) → callbacks.onCreerCompte
       « Mon compte » (connecté) → fenêtre avec « Se déconnecter »
     · Mode professeur (seulement si callbacks.onModeProfesseur est fourni)
     · Paramètres → fenêtre : Son (vrai), Langue (si callbacks.onChangerLangue),
       Autorisation du Lecteur (FAUX : le retrait échoue toujours)

   Dépend de sequence-reveil-bek.css (.rbek-scene, .rbek-pose), de
   sequence-lecteur.css/.js (fenêtres, icône du Lecteur) et de
   menu-principal.css (.kbm-bouton, .kbm-icone-chip), à charger avant
   sequence-menu.css.

   ⚠️ fr et en complets ; les autres langues retombent sur l'anglais (tu/vous
   à décider langue par langue au moment de traduire).

   @param {string} idConteneur
   @param {object} options : langue ; identite { prenom } ; visite (true/false/absent) ;
                             dossierImages, extension, sources
   @param {object} callbacks : onMemoires(), onPrives(), onModeProfesseur() (optionnel),
                               onCreerCompte(), onChangerLangue() (optionnel),
                               onPermission(accordee: bool)
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const CLE_AUTORISATION = 'kebbek_autorisation_lecteur';   // 'oui' | 'non' — décor seulement
  const CLE_VISITE = 'kebbek_menu_visite_v2';               // ANCIEN drapeau (tutoriel terminé, menu complet d'office) : lu seulement pour migrer
  const CLE_ETAPE = 'kebbek_menu_etape';                    // 'autorise' (menu à une ligne) | 'complet'
  const ID_PREMIERE_MEMOIRE = 'm1';                         // même id que MEMOIRES dans memoires.html
  const LANGUES_DROITE_A_GAUCHE = ['fa'];
  const DUREE_ENCOURS = 1200;     // « Retirer » semble réfléchir avant d'échouer
  const DUREE_FONDU = 180;        // fondu enchaîné entre deux expressions de Bek
  const APERCU_CASES = 5;         // aperçu du chemin : la 1re ouverte, les autres verrouillées

  // Toutes bouche fermée : Bek ne parle pas, elle réagit.
  const SOURCES_PAR_DEFAUT = {
    'bek-observe':        'images/reveil/bek_observe_01-01.webp',                          // regard de côté, curieuse
    'bek-examine':        'images/reveil/bek-examine_bouche-fermee_01-01.webp',            // main au front, scrute
    'bek-tendue':         'images/reveil/bek_tendue_bouche-fermee_01-01.webp',             // bras tendu : « voilà le chemin »
    'bek-concentree':     'images/reveil/bek_concentree_bouche-fermee_01-01.webp',         // main au menton : elle réfléchit
    'bek-conscience':     'images/reveil/bek-prise-de-conscience_bouche-fermee_01-01.webp',// mains levées, yeux ronds
    'bek-decue':          'images/reveil/bek_decue_01-01.webp',                            // déçue, soupire
    'bek-tres-concentree':'images/reveil/bek_tres-concentree_01-01.webp',                  // grimace de réflexion intense
    'bek-solennelle':     'images/reveil/bek_solennelle_bouche-fermee_01-01.webp',         // main sur le cœur, très sérieuse
    'bek-heureuse-ferme': 'images/reveil/bek_heureuse_bouche-fermee_01-01.webp'            // grand sourire, bras ouverts
  };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);

  const DICO = {
    fr: {
      lecteurChemin: 'Voici le chemin des mémoires de Bek. Une case est ouverte ; les autres s’ouvriront à mesure que tu avances.',
      lecteurDemande: 'Avant de commencer… j’aurais besoin de ton autorisation pour ouvrir quelques fichiers. Rien de grave.',
      suite: 'Suite',
      autoTitre: 'Demande d’autorisation',
      autoFichier: '*.mem',
      autoTexte: 'Le Lecteur demande l’autorisation d’ouvrir ces fichiers pour :',
      autoListe: ['Lire tes souvenirs', 'Les organiser'],
      lecteurPlus: 'Tant que j’y suis… peux-tu m’autoriser quelques petites choses de plus\u00a0? Rien de grave non plus.',
      autoTexte2: 'Le Lecteur demande l’autorisation de\u00a0:',
      autoListe2: ['Gérer et créer tes contacts', 'Te corriger poliment', 'Travailler en arrière-plan'],
      autoRefuser: 'Refuser',
      autoAutoriser: 'Autoriser',
      autoAutoriserAussi: 'Autoriser aussi',
      refus2: 'Encore\u00a0? Oui, encore. Toujours le règlement.',
      refus1: 'Je comprends. Mais je dois te redemander : c’est le règlement.',
      confTitre: 'Autorisation accordée',
      confTexte: 'Tu pourras retirer cette autorisation à tout moment dans les paramètres.',
      lecteurFin: 'Parfait ! Ouvre ta première mémoire. Pendant ce temps, je m’occupe du reste en arrière-plan.',
      annonce1: 'Te revoilà ! Pendant que nous faisions la première leçon, j’ai travaillé en arrière-plan, comme tu me l’as autorisé.',
      annonce2: 'J’ai ajouté quelques parties au menu. J’ai même trouvé un professeur qui pourra nous aider avec le français… vu qu’on aura visiblement besoin d’aide.',
      annonceFin: 'Le menu est à toi. De rien.',
      ok: 'OK',
      salutation: 'Salut, {prenom} !',
      salutationInvite: 'Bienvenue !',
      menuMemoires: 'Mémoires',   // titre PROVISOIRE
      apercuNom: 'Aperçu du chemin : une case ouverte, les autres verrouillées',
      menuPrives: 'Cours privés',
      menuCompteInvite: 'Connexion / Créer un compte',
      menuCompteConnecte: 'Mon compte',
      menuProfesseur: 'Mode professeur',
      menuParametres: 'Paramètres',
      paramTitre: 'Paramètres',
      paramSon: 'Son',
      sonOui: 'Activé',
      sonNon: 'Désactivé',
      sonCouper: 'Couper',
      sonActiver: 'Activer',
      paramLangue: 'Langue',
      paramChanger: 'Changer',
      compteTitre: 'Mon compte',
      compteTexte: 'Ta progression est enregistrée sur ton compte.',
      deconnexion: 'Se déconnecter',
      paramAutorisation: 'Autorisations du Lecteur',
      assembleTitre: 'Le Lecteur assemble les mémoires',
      assembleFini: 'Les mémoires sont prêtes',
      assembleEtapes: ['Ouverture des fichiers .mem', 'Réflexion', 'Organisation des souvenirs', 'Assemblage du chemin des mémoires'],
      autoAccordee: 'Accordée',
      autoRefusee: 'Refusée',
      retirer: 'Retirer',
      accorder: 'Accorder',
      fermer: 'Fermer',
      enCours: '…',
      erreurTitre: 'Erreur',
      excuses: [
        'Impossible de retirer l’autorisation : Le Lecteur a déjà tout lu.',
        'Le Lecteur a demandé de ne pas être dérangé pour le moment.',
        'Opération refusée par Le Lecteur.'
      ]
    },
    en: {
      lecteurChemin: 'This is the path of Bek’s memories. One square is open; the others will open as you go.',
      lecteurDemande: 'Before we start… I’ll need your permission to open a few files. Nothing serious.',
      suite: 'Next',
      autoTitre: 'Permission request',
      autoFichier: '*.mem',
      autoTexte: 'The Reader is requesting permission to open these files in order to:',
      autoListe: ['Read your memories', 'Organize them'],
      lecteurPlus: 'While I’m at it… could you allow me a few MORE things? Nothing serious either.',
      autoTexte2: 'The Reader is requesting permission to:',
      autoListe2: ['Manage and create your contacts', 'Politely correct you', 'Work in the background'],
      autoRefuser: 'Deny',
      autoAutoriser: 'Allow',
      autoAutoriserAussi: 'Also allow',
      refus2: 'Again? Yes, again. Still the rules.',
      refus1: 'I understand. But I have to ask again: it’s the rules.',
      confTitre: 'Permission granted',
      confTexte: 'You can withdraw this permission at any time in the settings.',
      lecteurFin: 'Perfect! Go ahead and open your first memory. Meanwhile, I’ll take care of the rest in the background.',
      annonce1: 'You’re back! While we were doing the first lesson, I worked in the background, as you allowed me to.',
      annonce2: 'I added a few parts to the menu. I even found a teacher who can help us with French… since we’ll obviously need the help.',
      annonceFin: 'The menu is yours. You’re welcome.',
      ok: 'OK',
      salutation: 'Hi, {prenom}!',
      salutationInvite: 'Welcome!',
      menuMemoires: 'Memories',   // PROVISIONAL title
      apercuNom: 'Path preview: one open square, the others locked',
      menuPrives: 'Private lessons',
      menuCompteInvite: 'Sign in / Create an account',
      menuCompteConnecte: 'My account',
      menuProfesseur: 'Teacher mode',
      menuParametres: 'Settings',
      paramTitre: 'Settings',
      paramSon: 'Sound',
      sonOui: 'On',
      sonNon: 'Off',
      sonCouper: 'Turn off',
      sonActiver: 'Turn on',
      paramLangue: 'Language',
      paramChanger: 'Change',
      compteTitre: 'My account',
      compteTexte: 'Your progress is saved to your account.',
      deconnexion: 'Sign out',
      paramAutorisation: 'Reader permissions',
      assembleTitre: 'The Reader is assembling the memories',
      assembleFini: 'The memories are ready',
      assembleEtapes: ['Opening .mem files', 'Thinking', 'Organizing the memories', 'Assembling the memory path'],
      autoAccordee: 'Granted',
      autoRefusee: 'Denied',
      retirer: 'Withdraw',
      accorder: 'Grant',
      fermer: 'Close',
      enCours: '…',
      erreurTitre: 'Error',
      excuses: [
        'Can’t withdraw the permission: The Reader has already read everything.',
        'The Reader asked not to be disturbed right now.',
        'Operation refused by The Reader.'
      ]
    }
  };

  const ICONES = {
    memoires: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/>',
    parametres: '<path d="M4 6h8M19 6h1"/><circle cx="15.5" cy="6" r="2.2"/><path d="M4 12h2M13 12h7"/><circle cx="9.5" cy="12" r="2.2"/><path d="M4 18h9M20 18h0"/><circle cx="16.5" cy="18" r="2.2"/>',
    prives: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    compte: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
    professeur: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/><path d="M9 21h6"/>',
    cadenas: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };
  function svg(id, classe) { return '<svg class="' + classe + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONES[id] + '</svg>'; }

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
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
  function lireSon() {
    try { return localStorage.getItem(CLE_SON) !== '0'; } catch (e) { return true; }
  }
  function ecrireSon(actif) {
    try { localStorage.setItem(CLE_SON, actif ? '1' : '0'); } catch (e) {}
  }
  function lireEtape() {
    try {
      const e = localStorage.getItem(CLE_ETAPE);
      if (e === 'autorise' || e === 'complet') return e;
      return localStorage.getItem(CLE_VISITE) === '1' ? 'complet' : '';   // ancienne version : menu déjà vu en entier
    } catch (e) { return ''; }
  }
  function ecrireEtape(etape) {
    try { localStorage.setItem(CLE_ETAPE, etape); } catch (e) {}
  }
  function lireAutorisation() {
    try { return localStorage.getItem(CLE_AUTORISATION) === 'oui'; } catch (e) { return false; }
  }
  function ecrireAutorisation(accordee) {
    try { localStorage.setItem(CLE_AUTORISATION, accordee ? 'oui' : 'non'); } catch (e) {}
  }

  function demarrerMenuSimple(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const langue = langueActuelle(options);
    const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
    function T(cle) {
      return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
    }
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});
    const dossier = options.dossierImages ? options.dossierImages.replace(/\/?$/, '/') : null;
    function urlImage(nom) {
      if (options.sources && options.sources[nom]) return options.sources[nom];
      if (dossier) return dossier + sources[nom].replace(/^.*\//, '');
      return sources[nom];
    }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';
    const prenom = options.identite && options.identite.prenom ? String(options.identite.prenom) : '';

    const prog = window.KebBekProgression || null;
    function estConnecte() {
      return !!(prog && typeof prog.estInvite === 'function' && !prog.estInvite() && prog.session);
    }
    const connecte = estConnecte();
    // forcer : ?menu=annonce | reduit | complet — pour tester ; n'enregistre rien
    let forcer = '';
    try { forcer = new URLSearchParams(window.location.search).get('menu') || ''; } catch (e) {}
    if (['annonce', 'reduit', 'complet'].indexOf(forcer) === -1) forcer = '';
    const persister = !forcer;
    let etape = forcer === 'complet' ? 'complet' : forcer ? 'autorise' : lireEtape();
    const jouerTutoriel = !!iconeLecteur && !forcer && (options.visite === true || (options.visite !== false && etape === ''));
    // porte : menu à une ligne, en attendant la première mémoire (puis annonce du Lecteur)
    const porte = !jouerTutoriel && !!iconeLecteur && options.visite !== false && etape === 'autorise';
    const lecteurPresent = jouerTutoriel || porte;

    // ENTREES : l'ordre d'ici est l'ordre du menu. Paramètres reste la dernière.
    // La première entrée (Mémoires) est la seule visible au début du tutoriel.
    const ENTREES = [
      { id: 'memoires', icone: 'memoires', libelle: 'menuMemoires',
        action: callbacks.onMemoires || callbacks.onHistoires },
      { id: 'prives', icone: 'prives', libelle: 'menuPrives',
        action: callbacks.onPrives },
      { id: 'compte', icone: 'compte',
        libelle: connecte ? 'menuCompteConnecte' : 'menuCompteInvite',
        action: connecte ? function () { ouvrirCompte(); } : callbacks.onCreerCompte,
        afficher: connecte || typeof callbacks.onCreerCompte === 'function' },
      { id: 'professeur', icone: 'professeur', libelle: 'menuProfesseur',
        action: callbacks.onModeProfesseur, afficher: typeof callbacks.onModeProfesseur === 'function' },
      { id: 'parametres', icone: 'parametres', libelle: 'menuParametres',
        action: function () { ouvrirParametres(); } }
    ].filter(function (e) { return e.afficher !== false; });

    let arrete = false;
    let numeroExcuse = 0;
    let niveau = 1;
    let courante = null;
    const poses = {};
    const minuteurs = [];
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    function boutonMenu(e, index) {
      // pendant le tutoriel, seule la première entrée est visible
      const cache = lecteurPresent && index > 0;
      return '<button type="button" class="kbm-bouton kbm-entree-cachee mns-inactif' + (cache ? ' mns-off' : '') + '" data-menu="' + e.id + '" tabindex="-1">' +
        '<span class="kbm-icone-chip">' + svg(e.icone, 'kbm-icone') + '</span>' +
        '<span>' + echapper(T(e.libelle)) + '</span></button>';
    }
    function apercuHtml() {
      let cases = '';
      for (let i = 0; i < APERCU_CASES; i++) {
        cases += i === 0
          ? '<span class="mns-case mns-case-ouverte">1</span>'
          : '<span class="mns-case mns-case-fermee">' + svg('cadenas', 'mns-case-svg') + '</span>';
      }
      return '<div class="mns-apercu mns-off" role="img" aria-label="' + echapper(T('apercuNom')) + '">' + cases + '</div>';
    }
    const lignesHtml = ENTREES.map(function (e, i) {
      return boutonMenu(e, i) + (i === 0 && jouerTutoriel ? apercuHtml() : '');
    }).join('');

    const scene = document.createElement('div');
    scene.className = 'rbek-scene mns-scene';
    scene.innerHTML =
      '<div class="mns-disposition">' +
        '<div class="mns-col-gauche">' +
          '<div class="mns-menu' + (jouerTutoriel ? ' mns-off' : ' mns-menu-visible') + '">' +
            '<div class="kbm-carte mns-carte-menu">' +
              '<div class="kbm-salutation"' + (rtl ? ' dir="rtl"' : '') + '>' +
                echapper(prenom ? T('salutation').replace('{prenom}', prenom) : T('salutationInvite')) +
              '</div>' +
              '<div class="kbm-liste">' + lignesHtml + '</div>' +
            '</div>' +
          '</div>' +
          (lecteurPresent ?
            '<div class="mns-lect mns-off">' +
              '<div class="lect-lecteur-bulle mns-lect-bulle" role="status"' + (rtl ? ' dir="rtl"' : '') + '>' +
                '<p class="lect-lecteur-texte mns-lect-texte"></p>' +
                '<button type="button" class="lect-btn mns-lect-suite lect-cache">' + echapper(T('suite')) + '</button>' +
              '</div>' +
              '<div class="lect-lecteur mns-lect-icone">' + iconeLecteur + '</div>' +
            '</div>' : '') +
        '</div>' +
        '<div class="mns-col-bek">' +
          '<div class="mns-bek"><div class="rbek-bek mns-bek-calque"></div></div>' +
        '</div>' +
      '</div>';
    conteneur.innerHTML = '';
    conteneur.appendChild(scene);
    planifier(function () { scene.classList.add('rbek-prete'); }, 30);

    const menuEl = scene.querySelector('.mns-menu');
    const lectZone = scene.querySelector('.mns-lect');
    const lectTexte = scene.querySelector('.mns-lect-texte');
    const lectSuite = scene.querySelector('.mns-lect-suite');
    const lectBulle = scene.querySelector('.mns-lect-bulle');
    const apercu = scene.querySelector('.mns-apercu');
    const bouton = {};
    Array.prototype.forEach.call(scene.querySelectorAll('.kbm-bouton'), function (b) { bouton[b.getAttribute('data-menu')] = b; });
    const calque = scene.querySelector('.mns-bek-calque');

    // ---------- Bek (muette : elle observe) ----------
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return;
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        calque.appendChild(img);
        poses[nom] = img;
      });
    }
    function montrer(nom) {
      const cible = poses[nom] || poses['bek-heureuse-ferme'] || poses['bek-observe'];
      if (!cible || cible === courante) return;
      const ancienne = courante;
      // la nouvelle pose apparaît PAR-DESSUS l'ancienne (fondu), puis l'ancienne est retirée
      const ms = (reduit || !ancienne) ? 0 : DUREE_FONDU;
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms === 0) { ancienne.classList.remove('rbek-pose-visible'); return; }
      planifier(function () {
        if (ancienne === courante) return;       // revenue entre-temps : on la garde
        ancienne.style.transitionDuration = '0ms';
        ancienne.classList.remove('rbek-pose-visible');
      }, ms + 30);
    }

    // ---------- Fenêtres « système » (même habillage que le Lecteur) ----------
    function creerFenetre(contenuHtml, classeCarte) {
      const voile = document.createElement('div');
      voile.className = 'lect-voile mns-voile';
      voile.innerHTML =
        '<div class="lect-carte ' + (classeCarte || '') + '" role="alertdialog" aria-modal="true"' + (rtl ? ' dir="rtl"' : '') + '>' +
          contenuHtml +
        '</div>';
      scene.appendChild(voile);
      const carte = voile.querySelector('.lect-carte');
      planifier(function () { voile.classList.add('lect-voile-visible'); carte.classList.add('lect-carte-visible'); }, 30);
      function fermer() {
        voile.classList.remove('lect-voile-visible');
        carte.classList.remove('lect-carte-visible');
        planifier(function () { if (voile.parentNode) voile.parentNode.removeChild(voile); }, 320);
      }
      return { voile: voile, carte: carte, fermer: fermer };
    }
    function entete(icone, titre, idTitre) {
      return '<div class="lect-entete">' + icone + '<h2 class="lect-titre" id="' + idTitre + '">' + echapper(titre) + '</h2></div>';
    }
    const ICONE_ALERTE = '<span class="lect-alerte" aria-hidden="true">!</span>';
    const ICONE_COMPTE = '<span class="mns-icone" aria-hidden="true">' + svg('compte', 'mns-icone-svg') + '</span>';
    const ICONE_CADENAS = '<span class="mns-icone" aria-hidden="true">' + svg('cadenas', 'mns-icone-svg') + '</span>';

    // fenêtre simple : titre + texte (+ liste) + boutons ; résout la valeur du bouton cliqué
    function fenetre(def) {
      if (def.pose) montrer(def.pose);               // Bek réagit à la fenêtre
      return new Promise(function (resolve) {
        const f = creerFenetre(
          entete(def.icone || ICONE_ALERTE, def.titre, 'mnsFenTitre') +
          (def.fichier ? '<span class="lect-fichier">' + echapper(def.fichier) + '</span>' : '') +
          '<p class="lect-texte"' + (def.liste ? ' style="margin-bottom:8px"' : '') + '>' + echapper(def.texte) + '</p>' +
          (def.liste ? '<ul class="mns-perms">' + def.liste.map(function (l) { return '<li>' + echapper(l) + '</li>'; }).join('') + '</ul>' : '') +
          '<div class="lect-boutons">' +
            def.boutons.map(function (b, i) {
              return '<button type="button" class="lect-btn' + (b.clair ? ' lect-btn-clair' : '') + '" data-i="' + i + '">' + echapper(b.label) + '</button>';
            }).join('') +
          '</div>');
        f.carte.setAttribute('aria-labelledby', 'mnsFenTitre');
        const btns = Array.prototype.slice.call(f.carte.querySelectorAll('.lect-btn'));
        btns.forEach(function (b) {
          b.addEventListener('click', function () {
            btns.forEach(function (x) { x.disabled = true; });
            f.fermer();
            planifier(function () { resolve(def.boutons[Number(b.getAttribute('data-i'))].valeur); }, 280);
          });
        });
        planifier(function () { const d = btns[btns.length - 1]; if (d) d.focus({ preventScroll: true }); }, 350);
      });
    }

    // ---------- Le Lecteur parle ----------
    function lecteurAffiche(texte) {
      if (texte) lectTexte.textContent = texte;     // le texte est posé AVANT l'apparition : pas de flash de l'ancien
      lectZone.classList.remove('mns-off');
      planifier(function () { lectZone.classList.add('mns-lect-visible'); }, 30);
    }
    async function lecteurMasque() { lectZone.classList.remove('mns-lect-visible'); await attendre(450); lectZone.classList.add('mns-off'); }
    function lecteurDit(texte, avecSuite) {
      return new Promise(function (resolve) {
        lectTexte.textContent = texte;
        // sans « Suite », la bulle se resserre sur le texte (plus de grande boîte à moitié vide)
        lectBulle.classList.toggle('mns-sans-suite', !avecSuite);
        lectSuite.classList.toggle('lect-cache', !avecSuite);
        if (!avecSuite) { resolve(); return; }
        function clic() { lectSuite.removeEventListener('click', clic); lectSuite.classList.add('lect-cache'); resolve(); }
        lectSuite.addEventListener('click', clic);
        planifier(function () { lectSuite.focus({ preventScroll: true }); }, 450);
      });
    }

    // ---------- Le tutoriel (première visite) ----------
    function revelerLigne(id) {
      const b = bouton[id];
      b.classList.remove('mns-off');
      void b.offsetWidth;
      b.classList.remove('kbm-entree-cachee');
    }
    // Écran d'assemblage : le Lecteur « réfléchit » puis « organise », étape par étape (comme une IA).
    async function assembler() {
      const etapes = T('assembleEtapes');
      const DUREES = [1100, 1600, 1400, 1200];
      montrer('bek-concentree');
      const f = creerFenetre(
        '<div class="lect-lecteur mns-assemble-lecteur">' + iconeLecteur + '</div>' +
        '<h2 class="lect-titre mns-assemble-titre" id="mnsAssTitre">' + echapper(T('assembleTitre')) + '</h2>' +
        '<ul class="mns-etapes">' + etapes.map(function (e) {
          return '<li class="mns-etape"><span class="mns-etape-puce" aria-hidden="true"></span><span>' + echapper(e) + '</span></li>';
        }).join('') + '</ul>' +
        '<div class="lect-barre"><span class="lect-barre-remplie mns-assemble-barre"></span></div>',
        'mns-carte-assemblage');
      f.carte.setAttribute('role', 'status');
      f.carte.removeAttribute('aria-modal');
      f.carte.setAttribute('aria-labelledby', 'mnsAssTitre');
      const lis = Array.prototype.slice.call(f.carte.querySelectorAll('.mns-etape'));
      const barre = f.carte.querySelector('.mns-assemble-barre');
      const titre = f.carte.querySelector('.mns-assemble-titre');
      await attendre(700);
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('mns-etape-visible', 'mns-etape-encours');
        if (i === 2) montrer('bek-tres-concentree');            // « Organisation » : elle plisse le front
        await attendre(DUREES[i % DUREES.length]);
        lis[i].classList.remove('mns-etape-encours');
        lis[i].classList.add('mns-etape-faite');
        barre.style.transform = 'scaleX(' + ((i + 1) / lis.length) + ')';
      }
      await attendre(450);
      titre.textContent = T('assembleFini');
      f.carte.classList.add('lect-carte-termine');
      montrer('bek-heureuse-ferme');
      await attendre(1100);
      f.fermer();
      await attendre(350);
    }
    // Demande d'autorisation : refuser ne mène nulle part (la seconde fenêtre n'offre que deux « Autoriser »).
    // poses : [fenêtre, Lecteur qui insiste, seconde fenêtre]
    async function demanderPermission(demande, cleRefus, poses) {
      const premiere = await fenetre(Object.assign({ pose: poses[0], boutons: [
        { label: T('autoRefuser'), clair: true, valeur: 'non' }, { label: T('autoAutoriser'), valeur: 'oui' }] }, demande));
      if (premiere === 'oui') return;
      montrer(poses[1]);                              // le Lecteur insiste : elle soupire
      await lecteurDit(T(cleRefus), true);
      await fenetre(Object.assign({ pose: poses[2], boutons: [
        { label: T('autoAutoriser'), clair: true, valeur: 'oui' }, { label: T('autoAutoriserAussi'), valeur: 'oui' }] }, demande));
    }
    async function tutoriel() {
      montrer('bek-observe');
      await attendre(700);
      // 1. première demande : les fichiers .mem (lire et organiser les mémoires)
      lecteurAffiche(T('lecteurDemande'));
      await attendre(350);
      montrer('bek-concentree');                     // « quelques fichiers ? » : elle se méfie
      await lecteurDit(T('lecteurDemande'), true);   // l'élève lit à son rythme : la fenêtre s'ouvre après « Suite »
      await demanderPermission({ icone: ICONE_CADENAS, titre: T('autoTitre'), fichier: T('autoFichier'),
        texte: T('autoTexte'), liste: T('autoListe') }, 'refus1', ['bek-conscience', 'bek-decue', 'bek-tres-concentree']);
      await lecteurMasque();

      // 2. l'assemblage des mémoires (le menu n'existe pas encore à l'écran)
      await assembler();

      // 3. le menu apparaît (une ligne + l'aperçu du chemin) ; Bek le scrute, puis le désigne quand le Lecteur l'explique
      montrer('bek-observe');
      menuEl.classList.remove('mns-off');
      void menuEl.offsetWidth;
      menuEl.classList.add('mns-menu-visible');
      revelerLigne(ENTREES[0].id);
      await attendre(600);
      montrer('bek-examine');
      apercu.classList.remove('mns-off');
      void apercu.offsetWidth;
      apercu.classList.add('mns-apercu-visible');
      bouton[ENTREES[0].id].classList.add('mns-actif');
      await attendre(700);
      lecteurAffiche(T('lecteurChemin'));
      await attendre(350);
      montrer('bek-tendue');
      await lecteurDit(T('lecteurChemin'), true);
      bouton[ENTREES[0].id].classList.remove('mns-actif');

      // 4. seconde demande : « quelques choses de plus » (dont les contacts : il cherche un professeur)
      montrer('bek-concentree');
      await lecteurDit(T('lecteurPlus'), true);
      await demanderPermission({ icone: ICONE_CADENAS, titre: T('autoTitre'),
        texte: T('autoTexte2'), liste: T('autoListe2') }, 'refus2', ['bek-tres-concentree', 'bek-decue', 'bek-concentree']);
      await fenetre({ pose: 'bek-solennelle', icone: ICONE_CADENAS, titre: T('confTitre'), texte: T('confTexte'), boutons: [{ label: T('ok'), valeur: 'ok' }] });
      ecrireAutorisation(true);
      if (typeof callbacks.onPermission === 'function') {
        try { callbacks.onPermission(true); } catch (e) { console.warn('onPermission a échoué.', e); }
      }

      // 5. l'aperçu se replie ; Mémoires reste seule : le reste viendra après la première mémoire
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('lecteurFin'), true);
      await lecteurMasque();
      apercu.classList.remove('mns-apercu-visible');
      await attendre(450);
      apercu.classList.add('mns-off');
      if (persister) ecrireEtape('autorise');
      attendreMemoire();
    }
    // Menu à une ligne : Mémoires pulse, elle seule est active.
    function attendreMemoire() {
      bouton[ENTREES[0].id].classList.add('mns-actif');
      activerMenu([ENTREES[0]]);
    }
    // Retour après la première mémoire : le Lecteur annonce ses ajouts, le reste du menu apparaît.
    async function annonce() {
      montrer('bek-observe');
      await attendre(500);
      lecteurAffiche(T('annonce1'));
      await attendre(350);
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('annonce1'), true);
      await lecteurMasque();
      // les nouvelles lignes arrivent, Bek est surprise
      montrer('bek-conscience');
      for (let k = 1; k < ENTREES.length; k++) {
        revelerLigne(ENTREES[k].id);
        await attendre(220);
      }
      await attendre(500);
      // le professeur, c'est la ligne « Cours privés » ; Bek relève le sarcasme
      const ligneProf = bouton.prives;
      if (ligneProf) ligneProf.classList.add('mns-actif');
      montrer('bek-decue');
      lecteurAffiche(T('annonce2'));
      await attendre(350);
      await lecteurDit(T('annonce2'), true);
      if (ligneProf) ligneProf.classList.remove('mns-actif');
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('annonceFin'), false);
      await attendre(1800);
      await lecteurMasque();
      if (persister) ecrireEtape('complet');
      activerMenu(ENTREES);
    }
    // Première mémoire terminée ? null = impossible à savoir (pas de module de progression).
    async function premiereMemoireFaite() {
      if (forcer) return forcer === 'annonce';
      if (!prog || typeof prog.lireProgression !== 'function') return null;
      try {
        const faites = (await prog.lireProgression()) || {};
        return !!faites[ID_PREMIERE_MEMOIRE];
      } catch (e) {
        console.warn('menu : progression illisible, le menu reste à une ligne.', e);
        return false;
      }
    }
    async function menuPorte() {
      montrer('bek-heureuse-ferme');
      revelerLigne(ENTREES[0].id);
      const faite = await premiereMemoireFaite();
      if (arrete) return;
      if (faite === null) { menuDirect(); return; }
      if (faite) await annonce(); else attendreMemoire();
    }
    // Visites suivantes : le menu complet est là, actif.
    function menuDirect() {
      ENTREES.forEach(function (e) { revelerLigne(e.id); });
      montrer('bek-heureuse-ferme');
      if (persister && etape !== 'complet' && !jouerTutoriel) ecrireEtape('complet');
      activerMenu();
    }
    const actives = {};
    function activerMenu(liste) {
      (liste || ENTREES).forEach(function (e) {
        if (actives[e.id]) return;
        actives[e.id] = true;
        const b = bouton[e.id];
        b.classList.remove('mns-inactif');
        b.removeAttribute('tabindex');
        b.addEventListener('click', function () { if (typeof e.action === 'function') e.action(); });
      });
      planifier(function () { bouton[ENTREES[0].id].focus({ preventScroll: true }); }, 300);
    }

    // ---------- Mon compte (connecté) ----------
    // Invité : la ligne appelle directement callbacks.onCreerCompte.
    async function ouvrirCompte() {
      const choix = await fenetre({
        icone: ICONE_COMPTE, titre: T('compteTitre'), texte: T('compteTexte'),
        boutons: [{ label: T('deconnexion'), clair: true, valeur: 'sortir' }, { label: T('fermer'), valeur: 'fermer' }]
      });
      if (choix === 'sortir') {
        try { if (prog && prog.deconnecter) await prog.deconnecter(); } catch (e) { console.warn('Déconnexion échouée.', e); }
        window.location.reload();
        return;
      }
      if (bouton.compte) bouton.compte.focus({ preventScroll: true });
    }

    // ---------- Les paramètres (vrais et faux) ----------
    function ouvrirParametres() {
      const lignes = [];
      lignes.push({ id: 'son', nom: T('paramSon') });
      if (typeof callbacks.onChangerLangue === 'function') lignes.push({ id: 'langue', nom: T('paramLangue') });
      lignes.push({ id: 'autorisation', nom: T('paramAutorisation') });

      const f = creerFenetre(
        entete('<span class="mns-icone" aria-hidden="true">' + svg('parametres', 'mns-icone-svg') + '</span>', T('paramTitre'), 'mnsParamTitre') +
        '<div class="mns-reglages">' +
          lignes.map(function (l) {
            return '<div class="mns-reglage" data-id="' + l.id + '">' +
              '<div class="mns-reglage-info"><span class="mns-reglage-nom">' + echapper(l.nom) + '</span><span class="mns-reglage-etat"></span></div>' +
              '<button type="button" class="lect-btn lect-btn-clair mns-reglage-btn"></button>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="lect-boutons"><button type="button" class="lect-btn mns-param-fermer">' + echapper(T('fermer')) + '</button></div>',
        'mns-carte-param');
      f.carte.setAttribute('aria-labelledby', 'mnsParamTitre');
      function ligne(id) {
        const el = f.carte.querySelector('.mns-reglage[data-id="' + id + '"]');
        return el ? { etat: el.querySelector('.mns-reglage-etat'), btn: el.querySelector('.mns-reglage-btn') } : null;
      }
      function fermerParametres() { document.removeEventListener('keydown', surTouche); f.fermer(); bouton.parametres.focus({ preventScroll: true }); }
      function surTouche(e) { if (e.key === 'Escape') fermerParametres(); }
      document.addEventListener('keydown', surTouche);
      f.carte.querySelector('.mns-param-fermer').addEventListener('click', fermerParametres);
      f.voile.addEventListener('click', function (e) { if (e.target === f.voile) fermerParametres(); });

      // — Son (vrai) —
      const son = ligne('son');
      function rafraichirSon() {
        const actif = lireSon();
        son.etat.textContent = actif ? T('sonOui') : T('sonNon');
        son.btn.textContent = actif ? T('sonCouper') : T('sonActiver');
      }
      rafraichirSon();
      son.btn.addEventListener('click', function () { ecrireSon(!lireSon()); rafraichirSon(); });

      // — Langue (vrai, seulement si la page hôte sait changer de langue) —
      const lg = ligne('langue');
      if (lg) {
        lg.etat.textContent = langue.toUpperCase();
        lg.btn.textContent = T('paramChanger');
        lg.btn.addEventListener('click', function () { fermerParametres(); callbacks.onChangerLangue(); });
      }

      // — Autorisation du Lecteur (FAUX : le retrait échoue toujours) —
      const au = ligne('autorisation');
      function rafraichirAutorisation() {
        const accordee = lireAutorisation();
        au.etat.textContent = accordee ? T('autoAccordee') : T('autoRefusee');
        au.btn.textContent = accordee ? T('retirer') : T('accorder');
      }
      rafraichirAutorisation();
      au.btn.addEventListener('click', function () {
        au.btn.disabled = true;
        au.btn.textContent = T('enCours');
        planifier(async function () {
          const excuses = T('excuses');
          const texte = Array.isArray(excuses) ? excuses[numeroExcuse++ % excuses.length] : '';
          await fenetre({ titre: T('erreurTitre'), texte: texte, boutons: [{ label: T('ok'), valeur: 'ok' }] });
          rafraichirAutorisation();     // rien n'a changé
          au.btn.disabled = false;
          au.btn.focus({ preventScroll: true });
        }, reduit ? 0 : DUREE_ENCOURS);
      });
      planifier(function () { son.btn.focus({ preventScroll: true }); }, 350);
    }

    // ---------- Lancement ----------
    precharger(POSES, urlImage).then(function (etat) {
      if (arrete) return;
      creerPoses(etat || {});
      if (jouerTutoriel) tutoriel().catch(function (e) { console.warn('Tutoriel du menu interrompu.', e); });
      else if (porte) menuPorte().catch(function (e) { console.warn('Menu interrompu.', e); menuDirect(); });
      else menuDirect();
    });

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  window.KebBekMenuSimple = { demarrerMenuSimple: demarrerMenuSimple, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
