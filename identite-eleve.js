/* ==================================================================
   identite-eleve.js — logique PARTAGÉE de la séquence "nom + genre +
   tranche d'âge" (première rencontre avec Bek et Keb, chemin "Oui").
   Même esprit que sac-a-dos.js / exercices.js : un seul endroit à
   corriger, réutilisable par index.html et toute future page qui en
   aurait besoin.

   ⚠️ PREMIÈRE IMPLÉMENTATION — aucun gabarit HTML réel n'a encore été
   vu contre ce module (comme exercices.js/exercices.css au moment de
   leur écriture). Les classes CSS (préfixe "iden-") et la structure du
   DOM générée sont donc une proposition, pas une contrainte déjà en
   place à respecter.

   🆕 CORRIGÉ cette session, suite au retour de Raphaël sur la première
   version de l'étape 0 (etapeIntroPersonnages) :
     1. Le texte parlé n'apparaissait pas du tout à l'écran (seulement
        en attribut alt, invisible) — corrigé : une bulle de texte
        (#idenBulle) est désormais superposée au-dessus des personnages,
        avec exactement le même habillage que .cava-bulle-question /
        .pile-mot-vocab dans essai_cava_reactions_v3 : gros Chewy,
        contour de la couleur du fond (JAMAIS un encadré blanc), mots
        individuellement cliquables (traduction au clic si connue via
        options.traductions, ajout au sac au double-clic/double-tap —
        même mécanisme que "Ça va ?" dans l'essai, et qui correspond au
        point "reste à faire" de BONOMES_v63 : "double-tap/double-clic
        sur un mot pour l'ajouter au sac").
     2. Keb et Bek disparaissaient dès qu'on atteignait la saisie du nom
        (chaque étape faisait conteneur.innerHTML = '', qui effaçait
        aussi les personnages) — corrigé en séparant UNE FOIS POUR
        TOUTES deux zones dans le conteneur : #idenPersonnages (créé au
        tout début, JAMAIS vidé ni recréé ensuite) et #idenAction (seule
        zone que les étapes suivantes réécrivent). Les personnages
        restent donc visibles derrière le champ de saisie du nom, le
        choix de repli, et les silhouettes — exactement comme demandé
        ("la case 'inscrire le nom' serait exactement sur la même
        séquence où se trouve Keb et Bek. Ils ne disparaissent pas.").
   Reste non résolu, faute de contenu fourni : le VRAI texte du dialogue
   (dialogueKeb/dialogueBek/dialogueQuestion ci-dessous sont des
   PLACEHOLDERS en français, à remplacer dès que Raphaël fournit le
   texte définitif) et ses vraies traductions (options.traductions,
   vide par défaut — un mot cliqué sans traduction connue n'affiche
   simplement rien, plutôt qu'une erreur). L'ordre Keb-puis-Bek est
   inchangé (conforme aux noms de fichiers livrés), Raphaël n'ayant pas
   demandé de l'inverser malgré la mention d'un ordre Bek-puis-Keb dans
   une session antérieure.

   Déroulé complet, tel que décidé :
   0. Trio d'images superposées (Keb se présente → Bek se présente →
      Bek demande "et toi ?"), tap/clic n'importe où sur la scène pour
      avancer (jamais automatique). Au tap sur la 3e image (la
      question), enchaîne sur la saisie du nom — SANS faire disparaître
      les personnages (voir correctif ci-dessus).
   1. Saisie libre du nom : champ texte libre, bouton valider.
      - Un "échec" = champ vide, OU mot jugé inapproprié (liste non
        exhaustive, volontairement — voir MOTS_BANNIS), OU longueur
        hors 2–20 caractères, OU caractères hors alphabet français
        (accents français acceptés, autres scripts refusés).
      - 3 échecs consécutifs → choix de repli.
      - Un succès direct (dès le premier essai ou après un retour à 0)
        → silhouettes SANS aucun genre pré-rempli : les 4 choix
        (garçon/homme/fille/femme) restent pleinement ouverts.
   2. Choix de repli (après 3 échecs) : 3 paires distinctes tirées au
      hasard parmi les 20 de BANQUE_NOMS (6 boutons : masculin/féminin
      de chacune). Cliquer fixe `prenom` ET `genre` en un seul geste,
      puis enchaîne DIRECTEMENT sur les silhouettes (pas de dialogue de
      transition — décidé volontairement pour limiter le texte à
      traduire).
   3. Silhouettes (genre + tranche d'âge) : 4 silhouettes (garçon /
      homme / fille / femme). Si un genre est déjà connu (venant du
      choix de repli), les 2 silhouettes du genre opposé sont visibles
      mais DÉSACTIVÉES (pas masquées) — pour signaler à l'élève qu'il
      s'est peut-être trompé de bonhomme si aucune des silhouettes
      actives ne lui correspond. Un bouton "Changer mon nom" permet de
      revenir complètement à l'étape 1, compteur d'échecs remis à 0.
      Cliquer une silhouette active donne à la fois le genre (déjà
      connu ou confirmé) et la tranche d'âge (`adulte`), puis appelle
      callbacks.onComplet({ prenom, genre, adulte }).

   Le prénom lui-même n'est PAS écrit ici dans Supabase/localStorage —
   ce module ne fait que collecter { prenom, genre, adulte } et les
   remet à l'appelant via onComplet(). C'est à la page hôte de les
   transmettre à KebBekProgression.creerProfil(prenom) /
   .enregistrerIdentite(genre, nationalite, adulte) au bon moment
   (cohérent avec la séparation déjà en place : ce module est une UI de
   collecte, pas une couche de persistance — même principe que
   exercices.js qui ne connaît rien de progression.js).

   Ajout au sac : réutilise window.ajouterAuSac('mots', {mot, trad}) de
   sac-a-dos.js s'il est présent sur la page hôte (vérifié avant appel —
   repli silencieux si sac-a-dos.js n'est pas chargé, même prudence que
   partout ailleurs dans ce fichier).
   🆕 v3 — CORRIGÉ suite au deuxième retour de Raphaël sur l'étape 0 :
     1. Fidélité au modèle "Ça va ?" : le tooltip de traduction d'un mot
        (.iden-tooltip-mot) a maintenant la même silhouette de bulle que
        .pile-tooltip dans essai_cava_reactions_v3 (petite flèche ::after/
        ::before qui pointe vers le mot) — avant, c'était un simple
        rectangle bordé, une imitation partielle du modèle avec raison.
     2. Traduction de la PHRASE entière, en plus du mot-à-mot : un bouton
        sous la scène (labelTraduirePhrase/labelMasquerTraduction) affiche/
        masque options.traductionsPhrases[dialogueCle] — utile tant que
        l'élève n'a pas encore assez de mots pour reconstituer le sens
        global lui-même.
     3. Navigation devenue BIDIRECTIONNELLE : en plus du tap/clic qui
        avance, on peut désormais glisser le doigt (swipe gauche/droite,
        détection manuelle par delta de position — même prudence que le
        double-tap manuel de essai_cava_reactions_v3, les gestes natifs
        n'étant pas fiables) ou utiliser les flèches ← → du clavier. Un
        second chevron (.iden-chevron-gauche) signale qu'on peut reculer ;
        désactivé (pas masqué) sur la toute première image, Keb, avant
        laquelle il n'y a rien.
     4. "Je m'appelle ___" : le champ de saisie du nom est maintenant
        précédé d'un préfixe (labelPrefixeNom) plutôt que d'être une boîte
        de saisie nue — voir lancerSaisieNom().
     5. Ajout au sac : mesure TEMPORAIRE demandée par Raphaël — tant que
        le double-tap/double-clic n'a pas été enseigné ailleurs dans le
        parcours, consulter la traduction d'un mot (simple clic) l'ajoute
        directement au sac, une seule fois par mot (voir MOTS_DEJA_AJOUTES
        plus bas). Le sac lui-même reste invisible à cet écran (pas
        d'icône #sacBouton prévue ici) — il tourne en arrière-plan, comme
        confirmé par Raphaël ("le sac à dos fonctionne à l'arrière-plan,
        mais n'est pas encore visible"). À REVENIR au double-tap seul une
        fois ce mécanisme enseigné ailleurs — voir le drapeau
        AJOUT_AUTOMATIQUE_TEMPORAIRE ci-dessous, pensé pour être basculé à
        false ce jour-là sans autre chirurgie du fichier.
   ================================================================== */

const AJOUT_AUTOMATIQUE_TEMPORAIRE = true;

const KebBekIdentite = (function () {

  // ---------- Banque de noms de repli (toujours en français, peu
  // importe la langue de l'interface — c'est le principe du gag :
  // vieux prénoms français, quelle que soit la langue de l'élève) ----------

  const BANQUE_NOMS = [
    { m: 'Rogassien', f: 'Rogassienne' },
    { m: 'Théodule',  f: 'Théoduleine' },
    { m: 'Firmin',    f: 'Firmine' },
    { m: 'Aldéric',   f: 'Aldérique' },
    { m: 'Anaclet',   f: 'Anaclette' },
    { m: 'Zénon',     f: 'Zénonie' },
    { m: 'Gontran',   f: 'Gontrane' },
    { m: 'Hilarion',  f: 'Hilarione' },
    { m: 'Isidore',   f: 'Isidorine' },
    { m: 'Ambroise',  f: 'Ambroisine' },
    { m: 'Céleste',   f: 'Célestine' },
    { m: 'Prudent',   f: 'Prudence' },
    { m: 'Onésime',   f: 'Onésimine' },
    { m: 'Sylvestre', f: 'Sylvestrine' },
    { m: 'Léandre',   f: 'Léandrine' },
    { m: 'Hippolyte', f: 'Hippolytine' },
    { m: 'Casimir',   f: 'Casimire' },
    { m: 'Grégoire',  f: 'Grégoirine' },
    { m: 'Norbert',   f: 'Norberte' },
    { m: 'Athanase',  f: 'Athanasie' },
    { m: 'Cléophas',  f: 'Cléophasie' }
  ];

  // ---------- Validation du nom tapé ----------

  const LONGUEUR_MIN_NOM = 2;
  const LONGUEUR_MAX_NOM = 20;

  // Alphabet français accepté : lettres latines (avec accents français
  // courants), espace, trait d'union, apostrophe (noms composés : "Jean-
  // Paul", "Anne-Sophie" ; élisions : "D'Arcy"). Tout script différent
  // (cyrillique, CJK, arabe, etc.) ou tout symbole/chiffre est rejeté.
  const REGEX_CARACTERES_AUTORISES = /^[A-Za-zÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸÑŒÆàâäçéèêëîïôöùûüÿñœæ' -]+$/;

  // Liste NON EXHAUSTIVE, volontairement minimale — les cas les plus
  // évidents seulement, comme convenu ("on ne peut pas espérer tout
  // bloquer"). Comparaison faite sur une version normalisée (minuscule,
  // accents retirés) pour attraper les variantes accentuées. À
  // compléter langue par langue au besoin — structure prévue pour ça
  // (un tableau par langue, tous fusionnés à la vérification).
  const MOTS_BANNIS = {
    fr: ['merde', 'putain', 'connard', 'salope', 'encule'],
    en: ['fuck', 'shit', 'bitch', 'asshole', 'cunt'],
    es: ['mierda', 'puta', 'cabron', 'pendejo'],
    de: ['scheisse', 'scheiße', 'arschloch', 'hurensohn']
  };
  const TOUS_MOTS_BANNIS = Object.values(MOTS_BANNIS).flat();

  function retirerAccents(txt) {
    return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function normaliserPourFiltre(txt) {
    return retirerAccents(String(txt).trim().toLowerCase());
  }

  // Retourne { valide: true } ou { valide: false, raison: '...' }.
  // raisons possibles : 'vide' | 'trop_court' | 'trop_long' |
  // 'caracteres_etrangers' | 'inapproprie'
  function validerNom(nomBrut) {
    const nom = String(nomBrut || '').trim();
    if (nom.length === 0) return { valide: false, raison: 'vide' };
    if (nom.length < LONGUEUR_MIN_NOM) return { valide: false, raison: 'trop_court' };
    if (nom.length > LONGUEUR_MAX_NOM) return { valide: false, raison: 'trop_long' };
    if (!REGEX_CARACTERES_AUTORISES.test(nom)) return { valide: false, raison: 'caracteres_etrangers' };
    const norm = normaliserPourFiltre(nom);
    const contientMotBanni = TOUS_MOTS_BANNIS.some(mot => norm.includes(mot));
    if (contientMotBanni) return { valide: false, raison: 'inapproprie' };
    return { valide: true };
  }

  // ---------- Tirage aléatoire de 3 paires distinctes ----------

  function tirerTroisPaires() {
    const copie = BANQUE_NOMS.slice();
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie.slice(0, 3);
  }

  // ---------- Machine à étapes ----------
  //
  // demarrerSequenceIdentite(idConteneur, options, callbacks)
  //   options   = { textes: {...}, images: {...}, traductions: {...} } —
  //               textes/images : voir texte()/image() plus bas, même
  //               convention de repli que le reste du fichier.
  //               traductions : dictionnaire { motMinuscule: 'traduction' }
  //               pour les mots du dialogue de l'étape 0 (voir
  //               afficherBulle) — un mot absent du dictionnaire reste
  //               cliquable pour l'ajout au sac, mais n'affiche aucune
  //               traduction au survol (pas d'erreur bloquante).
  //   callbacks = { onComplet({ prenom, genre, adulte }) }

  const TEXTES_PAR_DEFAUT = {
    introAltKeb: 'Keb introduces himself',
    introAltBek: 'Bek introduces himself',
    introAltQuestion: 'Bek asks: what is your name?',
    introIndiceTap: 'Tap to continue',
    // 🆕 Texte affiché dans la bulle au-dessus des personnages (voir
    // afficherBulle) — PLACEHOLDER en français, à remplacer dès que
    // Raphaël fournit le vrai dialogue (voir note de tête de fichier).
    dialogueKeb: "Salut ! Moi, c'est Keb.",
    dialogueBek: "Et moi, c'est Bek !",
    dialogueQuestion: "Et toi, tu t'appelles comment ?",
    // 🆕 v3
    labelTraduirePhrase: 'Translate the sentence',
    labelMasquerTraduction: 'Hide translation',
    noteAjoutSac: "Tap a word to see its translation — it's added to your bag for now.",
    labelPrefixeNom: 'My name is',
    labelChampNom: '...',
    labelValider: 'OK',
    erreurVide: 'Please type your name.',
    erreurTropCourt: 'That name seems too short.',
    erreurTropLong: 'That name seems too long.',
    erreurCaracteresEtrangers: 'Please use French letters only.',
    erreurInapproprie: "That doesn't look like a real name — try again.",
    titreChoixRepli: "Let's pick a name for you, then!",
    titreSilhouettes: 'Which one is you?',
    labelBoy: 'Boy',
    labelMan: 'Man',
    labelGirl: 'Girl',
    labelWoman: 'Woman',
    labelChangerNom: 'Change my name'
  };

  function texte(options, cle) {
    const t = (options && options.textes) || {};
    return (t[cle] !== undefined) ? t[cle] : TEXTES_PAR_DEFAUT[cle];
  }

  // ⚠️ CHEMINS NON CONFIRMÉS — Raphaël n'a pas encore précisé le dossier
  // où ces 3 .webp vivront dans le dépôt une fois remises en place (livrées
  // cette session sous ces noms, à la racine du zip fourni). Repli ici :
  // les noms de fichier tels quels, supposant qu'ils sont placés à côté de
  // la page hôte — à écraser via options.images = { keb, bek, question }
  // si le vrai dossier diffère, même principe que options.textes ci-dessus.
  const IMAGES_PAR_DEFAUT = {
    keb: "index_bonomes_keb_bek_je-m'appelle-Keb_01.webp",
    bek: "index_bonomes_keb_bek_je-m'appelle-Bek_01.webp",
    question: 'index_bonomes_keb_bek_tu-t-appelles_01.webp'
  };

  function image(options, cle) {
    const im = (options && options.images) || {};
    return (im[cle] !== undefined) ? im[cle] : IMAGES_PAR_DEFAUT[cle];
  }

  const SILHOUETTES = [
    { id: 'garcon', genre: 'm', adulte: false, labelCle: 'labelBoy' },
    { id: 'homme',  genre: 'm', adulte: true,  labelCle: 'labelMan' },
    { id: 'fille',  genre: 'f', adulte: false, labelCle: 'labelGirl' },
    { id: 'femme',  genre: 'f', adulte: true,  labelCle: 'labelWoman' }
  ];

  function demarrerSequenceIdentite(idConteneur, options, callbacks) {
    const conteneur = document.getElementById(idConteneur);
    callbacks = callbacks || {};
    options = options || {};
    if (!conteneur) {
      console.warn('demarrerSequenceIdentite : conteneur #' + idConteneur + ' introuvable.');
      return;
    }
    conteneur.classList.add('iden-conteneur');
    conteneur.innerHTML = '';

    let compteurEchecs = 0;
    let prenomChoisi = null;
    // Une fois vrai (dès qu'on quitte l'étape 0), taper sur la scène des
    // personnages n'avance plus rien — ils restent affichés en fond,
    // simplement immobiles, pendant la saisie du nom et les silhouettes.
    let introTerminee = false;

    function messageErreur(raison) {
      switch (raison) {
        case 'vide': return texte(options, 'erreurVide');
        case 'trop_court': return texte(options, 'erreurTropCourt');
        case 'trop_long': return texte(options, 'erreurTropLong');
        case 'caracteres_etrangers': return texte(options, 'erreurCaracteresEtrangers');
        case 'inapproprie': return texte(options, 'erreurInapproprie');
        default: return texte(options, 'erreurInapproprie');
      }
    }

    // ==================================================================
    // 🆕 SCÈNE PERSISTANTE (corrige "Keb et Bek disparaissent") —
    // #idenPersonnages est créé UNE SEULE FOIS ici et n'est plus JAMAIS
    // vidé/recréé par les étapes suivantes ; seule #idenAction (plus bas)
    // est réécrite à chaque étape. Reprend le patron .cava-img/.cava-
    // img.actif de essai_cava_reactions_v3 (une seule image .actif à la
    // fois, transition d'opacité, aucun repositionnement).
    // ==================================================================

    const personnages = document.createElement('div');
    personnages.className = 'iden-personnages';
    personnages.id = 'idenPersonnages';
    personnages.tabIndex = 0; // focusable/activable au clavier (Entrée/Espace)
    personnages.setAttribute('role', 'button');

    const IMAGES_INTRO = [
      { cle: 'keb', altCle: 'introAltKeb', dialogueCle: 'dialogueKeb' },
      { cle: 'bek', altCle: 'introAltBek', dialogueCle: 'dialogueBek' },
      { cle: 'question', altCle: 'introAltQuestion', dialogueCle: 'dialogueQuestion' }
    ];

    const elementsImg = IMAGES_INTRO.map(function (im, i) {
      const img = document.createElement('img');
      img.className = 'iden-img' + (i === 0 ? ' actif' : '');
      img.src = image(options, im.cle);
      img.alt = texte(options, im.altCle);
      personnages.appendChild(img);
      return img;
    });

    // 🆕 Bulle de texte superposée — c'est ce bloc qui manquait
    // entièrement dans la version précédente. Même habillage que
    // .cava-bulle-question/.pile-mot-vocab : gros Chewy, contour de la
    // couleur du fond, PAS un encadré blanc — voir identite-eleve.css.
    const bulle = document.createElement('div');
    bulle.className = 'iden-bulle';
    bulle.id = 'idenBulle';
    personnages.appendChild(bulle);

    const chevron = document.createElement('span');
    chevron.className = 'iden-chevron iden-chevron-droite';
    chevron.id = 'idenChevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '\u203A'; // ›
    personnages.appendChild(chevron);

    // 🆕 v3 — chevron symétrique signalant qu'on peut aussi reculer.
    // Désactivé (visible mais grisé, jamais masqué — même philosophie que
    // .iden-silhouette-desactivee) sur la toute première image (Keb),
    // avant laquelle il n'y a rien à montrer.
    const chevronGauche = document.createElement('span');
    chevronGauche.className = 'iden-chevron iden-chevron-gauche iden-chevron-desactive';
    chevronGauche.setAttribute('aria-hidden', 'true');
    chevronGauche.textContent = '\u2039'; // ‹
    personnages.appendChild(chevronGauche);

    conteneur.appendChild(personnages);

    const indice = document.createElement('div');
    indice.className = 'iden-indice';
    indice.id = 'idenIndice';
    indice.textContent = texte(options, 'introIndiceTap');
    conteneur.appendChild(indice);

    // 🆕 v3 — bouton de traduction de la PHRASE entière (en plus du
    // mot-à-mot déjà en place) + la traduction elle-même, affichée/
    // masquée en dessous au clic. btnTraduirePhrase.style.display est
    // recalculé à chaque afficherBulle() : masqué d'office si
    // options.traductionsPhrases ne connaît pas la réplique en cours,
    // plutôt que d'afficher un bouton qui ne ferait rien.
    let phraseTraductionVisible = false;
    const btnTraduirePhrase = document.createElement('button');
    btnTraduirePhrase.type = 'button';
    btnTraduirePhrase.className = 'iden-btn-traduire-phrase';
    btnTraduirePhrase.textContent = texte(options, 'labelTraduirePhrase');
    conteneur.appendChild(btnTraduirePhrase);

    const tooltipPhrase = document.createElement('div');
    tooltipPhrase.className = 'iden-tooltip-phrase';
    conteneur.appendChild(tooltipPhrase);

    btnTraduirePhrase.addEventListener('click', function (e) {
      e.stopPropagation();
      phraseTraductionVisible = !phraseTraductionVisible;
      if (phraseTraductionVisible) {
        tooltipPhrase.textContent = traductionDePhrase(IMAGES_INTRO[indexActuel].dialogueCle) || '';
        tooltipPhrase.classList.add('visible');
        btnTraduirePhrase.textContent = texte(options, 'labelMasquerTraduction');
      } else {
        tooltipPhrase.classList.remove('visible');
        btnTraduirePhrase.textContent = texte(options, 'labelTraduirePhrase');
      }
    });

    // Seule zone que lancerSaisieNom/lancerChoixNomRepli/lancerSilhouettes
    // réécrivent — #idenPersonnages ci-dessus n'est plus jamais touché
    // après sa création.
    const action = document.createElement('div');
    action.className = 'iden-action';
    action.id = 'idenAction';
    conteneur.appendChild(action);

    // ---------- Mots cliquables (traduction + ajout au sac) ----------
    //
    // Simple clic : affiche la traduction si options.traductions la
    // connaît (repli silencieux sinon — pas de bulle vide) ET ajoute le
    // mot au sac si AJOUT_AUTOMATIQUE_TEMPORAIRE est vrai (voir en tête de
    // fichier — mesure temporaire tant que le double-tap n'a pas encore
    // été enseigné ailleurs dans le parcours). Si ce drapeau repasse à
    // false, l'ajout retombe sur le double-clic/double-tap dédié plus bas
    // (même mécanisme que "Ça va ?" dans essai_cava_reactions_v3).

    function traductionDeMot(mot) {
      const dico = (options && options.traductions) || {};
      return dico[mot.toLowerCase()];
    }

    // 🆕 v3 — pendant de traductionDeMot() pour la phrase entière plutôt
    // qu'un mot : options.traductionsPhrases = { dialogueKeb: '...', ... },
    // même clé que celle déjà utilisée pour le texte français lui-même
    // (dialogueCle), donc rien de nouveau à faire circuler en plus.
    function traductionDePhrase(dialogueCle) {
      const dico = (options && options.traductionsPhrases) || {};
      return dico[dialogueCle];
    }

    function afficherTraductionMot(span, mot) {
      document.querySelectorAll('.iden-tooltip-mot').forEach(function (t) { t.remove(); });
      const trad = traductionDeMot(mot);
      if (!trad) return;
      const tip = document.createElement('span');
      tip.className = 'iden-tooltip-mot';
      tip.textContent = trad;
      span.appendChild(tip);
    }

    // 🆕 v3 — un seul ajout (et un seul flash) par mot par passage dans la
    // séquence, même si l'élève reclique dessus plusieurs fois pour revoir
    // la traduction (ajouterAuSac lui-même est déjà protégé contre les
    // doublons, mais sans ceci l'animation de flash rejouerait à chaque
    // clic, ce qui serait trompeur — elle ne doit signaler qu'un AJOUT).
    const motsDejaAjoutes = new Set();

    function ajouterMotAuSac(span, mot) {
      if (typeof window.ajouterAuSac !== 'function') return; // sac-a-dos.js absent de la page : repli silencieux
      const cle = mot.toLowerCase(); // forme canonique : "Moi" (début de phrase) et "moi" (ailleurs) sont le même mot de vocabulaire
      window.ajouterAuSac('mots', { mot: cle, trad: traductionDeMot(mot) || '' });
      if (motsDejaAjoutes.has(cle)) return; // déjà ajouté/flashé une fois : rien de plus à signaler
      motsDejaAjoutes.add(cle);
      span.classList.remove('flash-ajout');
      void span.offsetWidth; // force le reflow pour pouvoir rejouer l'animation
      span.classList.add('flash-ajout');
    }

    // Découpe une phrase en <span class="iden-mot"> cliquables — la
    // ponctuation reste affichée telle quelle mais n'entre pas dans le
    // mot retenu pour la traduction/le sac (retirée seulement pour cette
    // comparaison, jamais dans le texte visible).
    function afficherBulle(dialogueCle) {
      bulle.innerHTML = '';
      const brut = texte(options, dialogueCle);
      if (!brut) return;
      const mots = String(brut).split(/\s+/).filter(Boolean);
      mots.forEach(function (motBrut, idx) {
        const span = document.createElement('span');
        span.className = 'iden-mot';
        span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
        const motNettoye = motBrut.replace(/[.,!?;:'"«»]/g, '');
        span.tabIndex = 0;
        // 🆕 v3 — clic simple = à la fois consulter la traduction ET
        // ajouter au sac (voir AJOUT_AUTOMATIQUE_TEMPORAIRE en tête de
        // fichier) : mesure temporaire tant que le double-tap n'a pas été
        // enseigné ailleurs. Repli sur l'ancien comportement (ajout
        // seulement au double-clic) si ce drapeau repasse à false un jour.
        span.addEventListener('click', function (e) {
          e.stopPropagation(); // ne doit pas aussi faire avancer/reculer la scène
          afficherTraductionMot(span, motNettoye);
          if (AJOUT_AUTOMATIQUE_TEMPORAIRE) ajouterMotAuSac(span, motNettoye);
        });
        span.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); e.stopPropagation();
            afficherTraductionMot(span, motNettoye);
            if (AJOUT_AUTOMATIQUE_TEMPORAIRE) ajouterMotAuSac(span, motNettoye);
          }
        });
        if (!AJOUT_AUTOMATIQUE_TEMPORAIRE) {
          span.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            ajouterMotAuSac(span, motNettoye);
          });
        }
        bulle.appendChild(span);
      });

      // 🆕 v3 — la traduction de phrase affichée (le cas échéant) et le
      // libellé du bouton sont propres à CHAQUE réplique : on ferme/
      // réinitialise à chaque changement de bulle plutôt que de laisser
      // la traduction d'une réplique précédente s'afficher sur la
      // suivante.
      phraseTraductionVisible = false;
      tooltipPhrase.classList.remove('visible');
      tooltipPhrase.textContent = '';
      btnTraduirePhrase.textContent = texte(options, 'labelTraduirePhrase');
      btnTraduirePhrase.style.display = traductionDePhrase(dialogueCle) ? '' : 'none';
    }

    // ---- Étape 0 : trio d'images d'intro (Keb → Bek → question) ----
    // Défilement MANUEL uniquement (tap/clic, glissement du doigt, ou
    // flèches ← → — jamais de minuterie automatique).
    let indexActuel = 0;

    // 🆕 v3 — active/désactive visuellement le chevron gauche selon la
    // position ; le chevron droit, lui, reste toujours actif pendant
    // l'étape 0 (sa dernière pression termine l'intro plutôt que de
    // rester bloquée sur place).
    function mettreAJourChevronGauche() {
      chevronGauche.classList.toggle('iden-chevron-desactive', indexActuel === 0);
    }

    function avancerIntro() {
      if (indexActuel >= elementsImg.length - 1) {
        lancerSaisieNom();
        return;
      }
      elementsImg[indexActuel].classList.remove('actif');
      indexActuel++;
      elementsImg[indexActuel].classList.add('actif');
      afficherBulle(IMAGES_INTRO[indexActuel].dialogueCle);
      mettreAJourChevronGauche();
    }

    // 🆕 v3 — symétrique d'avancerIntro() : ne fait rien sur la toute
    // première image (rien avant Keb), sinon recule d'une image et
    // rejoue la bulle correspondante.
    function reculerIntro() {
      if (indexActuel === 0) return;
      elementsImg[indexActuel].classList.remove('actif');
      indexActuel--;
      elementsImg[indexActuel].classList.add('actif');
      afficherBulle(IMAGES_INTRO[indexActuel].dialogueCle);
      mettreAJourChevronGauche();
    }

    personnages.addEventListener('click', function (e) {
      if (introTerminee) return;
      if (e.target.closest('.iden-mot')) return; // cliquer un mot ne doit pas avancer la scène
      avancerIntro();
    });
    personnages.addEventListener('keydown', function (e) {
      if (introTerminee) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avancerIntro(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); avancerIntro(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); reculerIntro(); }
    });

    // 🆕 v3 — glissement tactile, détection MANUELLE par delta de
    // position (même prudence que le double-tap manuel de
    // essai_cava_reactions_v3 : les gestes natifs ne sont pas fiables sur
    // tous les appareils). En-dessous du seuil, c'est un tap normal (déjà
    // géré par l'écouteur 'click' ci-dessus, laissé passer) plutôt qu'un
    // glissement.
    const SEUIL_GLISSEMENT_PX = 40;
    let toucheDebutX = null;
    personnages.addEventListener('touchstart', function (e) {
      if (introTerminee) return;
      toucheDebutX = e.changedTouches[0].clientX;
    }, { passive: true });
    personnages.addEventListener('touchend', function (e) {
      if (introTerminee || toucheDebutX === null) return;
      if (e.target.closest('.iden-mot')) { toucheDebutX = null; return; } // laisser le clic du mot faire son travail
      const deltaX = e.changedTouches[0].clientX - toucheDebutX;
      toucheDebutX = null;
      if (Math.abs(deltaX) < SEUIL_GLISSEMENT_PX) return; // tap normal : le 'click' natif s'en charge déjà
      e.preventDefault(); // empêche le 'click' synthétique de déclencher un second avancement
      if (deltaX < 0) avancerIntro(); // glissé vers la gauche : image suivante
      else reculerIntro(); // glissé vers la droite : image précédente
    }, { passive: false });

    afficherBulle(IMAGES_INTRO[0].dialogueCle);

    // ---- Étape 1 : saisie libre du nom ----
    // 🆕 N'écrit plus que dans #idenAction — Keb/Bek (#idenPersonnages,
    // créé plus haut, une seule fois) restent affichés derrière, comme
    // demandé.
    function lancerSaisieNom() {
      introTerminee = true;
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      indice.style.display = 'none';
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');
      action.innerHTML = '';

      // 🆕 v3 — "Je m'appelle ___" plutôt qu'une boîte de saisie nue :
      // le préfixe et le champ partagent une même ligne (voir
      // .iden-ligne-nom dans le CSS).
      const ligne = document.createElement('div');
      ligne.className = 'iden-ligne-nom';

      const prefixe = document.createElement('span');
      prefixe.className = 'iden-prefixe-nom';
      prefixe.textContent = texte(options, 'labelPrefixeNom');
      ligne.appendChild(prefixe);

      const champ = document.createElement('input');
      champ.type = 'text';
      champ.className = 'iden-champ-nom';
      champ.placeholder = texte(options, 'labelChampNom');
      champ.autocomplete = 'off';
      champ.spellcheck = false;
      ligne.appendChild(champ);

      action.appendChild(ligne);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'iden-btn-valider';
      btn.textContent = texte(options, 'labelValider');
      action.appendChild(btn);

      const erreurDiv = document.createElement('div');
      erreurDiv.className = 'iden-erreur';
      action.appendChild(erreurDiv);

      function tenter() {
        const resultat = validerNom(champ.value);
        if (resultat.valide) {
          prenomChoisi = champ.value.trim();
          lancerSilhouettes(null); // aucun genre pré-rempli : 4 choix ouverts
          return;
        }
        compteurEchecs++;
        erreurDiv.textContent = messageErreur(resultat.raison);
        erreurDiv.classList.add('in');
        if (compteurEchecs >= 3) {
          lancerChoixNomRepli();
        }
      }

      btn.addEventListener('click', tenter);
      champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') tenter(); });
      champ.focus();
    }

    // ---- Étape 1bis (après 3 échecs) : choix parmi 3 paires tirées au hasard ----
    function lancerChoixNomRepli() {
      action.innerHTML = '';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'titreChoixRepli');
      action.appendChild(titre);

      const grille = document.createElement('div');
      grille.className = 'iden-grille-noms';

      tirerTroisPaires().forEach(function (paire) {
        ['m', 'f'].forEach(function (genre) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'iden-btn-nom iden-btn-nom-' + genre;
          btn.textContent = paire[genre];
          btn.addEventListener('click', function () {
            prenomChoisi = paire[genre];
            lancerSilhouettes(genre); // genre pré-rempli depuis ce choix
          });
          grille.appendChild(btn);
        });
      });

      action.appendChild(grille);
    }

    // ---- Étape 2 : silhouettes (genre + tranche d'âge) ----
    // genrePreRempli : null (chemin normal, 4 choix ouverts) ou 'm'/'f'
    // (chemin de repli, 2 silhouettes du genre opposé désactivées).
    function lancerSilhouettes(genrePreRempli) {
      action.innerHTML = '';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'titreSilhouettes');
      action.appendChild(titre);

      const grille = document.createElement('div');
      grille.className = 'iden-grille-silhouettes';

      SILHOUETTES.forEach(function (s) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'iden-btn-silhouette iden-silhouette-' + s.id;
        btn.textContent = texte(options, s.labelCle);

        const desactivee = genrePreRempli && s.genre !== genrePreRempli;
        if (desactivee) {
          btn.disabled = true;
          btn.classList.add('iden-silhouette-desactivee');
        } else {
          btn.addEventListener('click', function () {
            if (typeof callbacks.onComplet === 'function') {
              callbacks.onComplet({ prenom: prenomChoisi, genre: s.genre, adulte: s.adulte });
            }
          });
        }
        grille.appendChild(btn);
      });

      action.appendChild(grille);

      // Porte de sortie : uniquement utile/affichée quand un genre est
      // déjà pré-rempli (chemin de repli) — dans le chemin normal, les
      // 4 choix sont déjà tous ouverts, "changer mon nom" n'a pas de
      // raison d'être proposé à ce moment-là.
      if (genrePreRempli) {
        const btnChanger = document.createElement('button');
        btnChanger.type = 'button';
        btnChanger.className = 'iden-btn-changer-nom';
        btnChanger.textContent = texte(options, 'labelChangerNom');
        btnChanger.addEventListener('click', function () {
          compteurEchecs = 0; // retour à 0, comme convenu
          prenomChoisi = null;
          lancerSaisieNom();
        });
        action.appendChild(btnChanger);
      }
    }
  }

  return {
    demarrerSequenceIdentite,
    validerNom,          // exposé pour tests/débogage isolé
    tirerTroisPaires,     // idem
    BANQUE_NOMS
  };
})();

window.KebBekIdentite = KebBekIdentite;
