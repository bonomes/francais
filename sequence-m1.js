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

   VOIX : audio/fr/<voix>_<id>_<version>.mp3 (ou .wav), ex. bek_je_01.mp3  s'il existe (enregistrements de Raphaël, à venir),
   sinon la synthèse vocale du navigateur. Ids : les mots (je, mange, un, une,
   sandwich, poutine, parle, francais) et les phrases (m1-je-mange,
   m1-je-mange-un-sandwich, m1-je-mange-une-poutine, m1-je-parle-francais).

   IMAGES manquantes (à produire) : images/m1/bek_mange-sandwich_01-01.webp et
   images/m1/bek_mange-poutine_01-01.webp. Tant qu'elles n'existent pas, Bek
   garde une pose existante et une vignette dessinée (SVG) montre l'aliment.

   Dépend de : sequence-reveil-bek.css (.rbek-scene, .rbek-bek, .rbek-pose),
   sequence-lecteur.css/.js (bulle et icône du Lecteur), sequence-m1.css.
   Facultatif : window.KebBekMots (mots.js) — les mots appris y sont ajoutés.

   🆕 (07-11-2026) EXERCICES D'ÉCOUTE : Bek prend la pose « écoute-moi » (elle nous regarde, la main à plat sur la poitrine) au lieu d'une pose liée
   à la phrase, qui donnait la réponse. Sa bouche s'ouvre et se ferme pendant que la voix parle (ou que la synthèse lit), puis reste fermée.
   Images : images/m1/bek_ecoute-moi_01-01.webp et bek_ecoute-moi_bouche-ouverte_01-01.webp (repli : pose « observe », sans animation).
   Exception : une phrase « Je mange… » (sandwich, poutine, ou « Je mange. » seul, en alternance) montre Bek avec l'aliment : elle dit la phrase,
   puis mange une fois quand la voix s'arrête (images mange-sandwich / mange-poutine : toutes celles de la boucle sont requises).
   🆕 Pizza : trois images — bek_mange-pizza_01-01 (grand sourire : la pose des leçons), bek_mange-pizza_bouche-fermee_01-01 (repos) et
   bek_mange-pizza_bouche-ouverte_01-01 (en parlant). Dans l'exercice d'écoute d'une phrase avec « pizza », elle tient sa part et sa bouche
   alterne repos / parle pendant la voix (pas de mastication). Sans les deux dernières : pose « écoute-moi ».
   🆕 Film : deux images — bek_regarde-film_01-01 (la pose des leçons, et le repos : bouche fermée) et bek_regarde-film_bouche-ouverte_01-01
   (en parlant). Dans l'exercice d'écoute d'une phrase avec « film » ou « télé » (« Je regarde un film. », « J'aime regarder la télé. »), Bek garde
   sa télécommande, face à l'écran, et sa bouche alterne repos / parle pendant la voix. Sans la version bouche ouverte : pose « écoute-moi ».
   Les deux images ont le même cadre ; la lueur de l'écran (à gauche) fait partie de l'image.
   🆕 Sandwich regardé : deux images — bek_regarde-sandwich_01-01 (la pose des leçons, et le repos : bouche fermée) et
   bek_regarde-sandwich_bouche-ouverte_01-01 (en parlant). Dans l'exercice d'écoute d'une phrase avec « regarde » + « sandwich »
   (« Je regarde le sandwich. »), Bek garde son sandwich, sans le manger, et sa bouche alterne repos / parle pendant la voix.
   Sans la version bouche ouverte : pose « écoute-moi ».
   🆕 Poutine regardée : deux images — bek_regarde-poutine_01-01 (la pose des leçons, et le repos : bouche fermée) et
   bek_regarde-poutine_bouche-ouverte_01-01 (en parlant). Dans l'exercice d'écoute d'une phrase avec « regarder » + « poutine »
   (« J'aime regarder la poutine. »), Bek garde sa poutine, sans la manger, et sa bouche alterne repos / parle pendant la voix.

   🆕 (03-11-2026) FRAGMENT 3 (anciennement 2) — options.fragment = 3 : « REGARDER ».
   La mémoire est faite de fragments ; celui-ci enseigne le verbe « regarde » (en -er, comme « mange »).
   Mots introduits : regarde, film (masculin : un film). « mange » revient en rappel.
   Déroulé (mêmes 6 segments) :
     1. « Je regarde. » + remarque : verbe en -er, et l'objet vient directement (pas de petit mot) ;
     2. « Je regarde un film. » — lecture, ordre (pièges : une, mange), écriture (regarde, film) + carte « film » ;
     3. « Je regarde une poutine. » — lecture, ordre (piège : un), écriture de la phrase entière ;
     4. contraste : Bek REGARDE un sandwich (image), puis le MANGE (image existante) — le verbe change tout ;
     5. exercice audio : « Je regarde. », « Je regarde un film. », puis le rappel « Je mange une poutine. »
   Voix : ids m1-je-regarde, m1-je-regarde-un-film, m1-je-regarde-une-poutine, m1-je-regarde-un-sandwich, regarde, film.
   Images à produire (repli : pose existante + vignette dessinée) :
     images/m1/bek_regarde-film_01-01.webp, bek_regarde-sandwich_01-01.webp, bek_regarde-poutine_01-01.webp.
   options.suite = true (fragments 1 et 2, et 3 tant que le 4 n'existe pas) : le Lecteur dit que le souvenir n'est pas encore entier (au lieu de « reconstitué »).
   Textes nouveaux : fr + en + ja (japonais traduit le 08-11-2026) ; les 17 autres langues retombent sur l'anglais (à traduire).
   onTermine({ mots, fragments }) : fragments = numéro du fragment terminé.

   🆕 (03-11-2026) RENUMÉROTATION — la mémoire compte maintenant 3 fragments (un 4e, « j'aime », est prévu) :
     1. « Je mange »  (options.fragment = 1, par défaut) ;
     2. « un/une, le/la » (options.fragment = 2) : NOUVEAU. Mots introduits : le, la, pizza. Rappel : mange, un, une, sandwich, poutine.
        Notion : « un/une » = une chose nouvelle ; « le/la » = la chose dont on parle, déjà connue. Masculin : un → le ; féminin : une → la.
        Déroulé (6 segments) :
          0. « Je mange le sandwich. » (lecture) + carte de remarque un→le, une→la ;
          1. « Je mange la poutine. » : lecture, ordre (pièges : le, une), écriture de l'article ;
          2. « Je mange une pizza. » puis « Je mange la pizza. » : ordre, ordre, écriture + carte « pizza » ;
          3. sandwich : une chose NOUVELLE (« un ») puis la MÊME chose, connue (« le ») — construction de phrases ;
          4. poutine : même contraste (« une » puis « la ») ;
          5. exercice audio : « Je mange le sandwich. », « Je mange la poutine. », « Je mange la pizza. »
        Voix (ids) : m1-je-mange-le-sandwich, m1-je-mange-la-poutine, m1-je-mange-une-pizza, m1-je-mange-la-pizza, le, la, pizza.
        Images (livrées) : images/m1/bek_mange-pizza_01-01.webp (leçons), _bouche-fermee_ (repos) et _bouche-ouverte_ (en parlant). Repli : pose « observe » + vignette dessinée.
        Textes nouveaux : fr + en + ja (les 17 autres langues retombent sur l'anglais).
     3. « Je regarde » (options.fragment = 3) : l'ancien fragment 2, inchangé (textes : intro3, fin3).
     4. « J'aime » (options.fragment = 4) : NOUVEAU. Mots introduits : j', aime, manger, regarder, jouer, télé.
        Notions : « je » devant une voyelle devient « j' » (élision ; vaut aussi pour le, la…) ; après « aimer », le verbe reste à
        l'infinitif (la forme de base : mang-er, regard-er, jou-er). L'élision est montrée par DEUX tuiles (« j' » = sujet, « aime » = verbe).
        Déroulé (6 segments) :
          0. « J'aime la poutine. » : lecture, carte sur l'élision (je + aime → j'aime ; je mange ne change pas), ordre (piège : je),
             écriture de « j'aime » ;
          1. « J'aime manger. » : lecture, carte sur l'infinitif, ordre (piège : mange), écriture de « manger » ;
          2. « J'aime regarder la télé. » : lecture, ordre (piège : regarde), écriture de la phrase, carte « télé » ;
          3. « J'aime jouer. » : lecture, ordre, écriture ;
          4. dictée de deux phrases NOUVELLES : « J'aime regarder la poutine. » (clin d'œil au fragment 3), « J'aime manger la poutine. » ;
          5. exercice audio : « J'aime manger. », « J'aime regarder la télé. », « J'aime jouer. »
        Voix (ids) : j, aime, manger, regarder, jouer, tele, m1-jaime-la-poutine, m1-jaime-manger, m1-jaime-regarder-la-tele,
        m1-jaime-jouer, m1-jaime-regarder-la-poutine, m1-jaime-manger-la-poutine. (Le mot « j' » se dit « j » [ʒ] : à enregistrer.)
        Images (repli : pose « observe » + vignette) : images/m1/bek_aime-jouer_01-01.webp (repos), _bouche-ouverte_01-01 (en parlant),
        puis _poupee-haut_01-01 à _01-05 (cinq mouvements avec la poupée, une fois la voix finie). Les autres segments réutilisent
        les images existantes (Bek à la poutine, au sandwich, devant le film).
     5. LA RÉPARATION (options.fragment = 5) : NOUVEAU — le CADRE (squelette) de la réparation, à ajuster. Format « séquence-mémoire » :
        l'élève fait seul ce qui était guidé avant. Le souvenir abîmé est un petit récit de 6 phrases qui réemploie TOUT (fragments 1 à 4) ;
        l'image de Bek s'éclaircit à mesure que les phrases sont réparées. Pour chaque phrase : certains mots sont déjà en place
        (de plus en plus rares : 2, 2, 1, 1, 0, 0), les mots manquants sont dans une banque avec des pièges, le mot juste va dans la
        prochaine case libre (un mauvais mot : la tuile se secoue, pique du Lecteur, indice après 2 erreurs, mot placé après 3 — jamais bloquant).
        Le clavier marche comme dans la séquence-mémoire : on tape, et dès qu'UN SEUL mot de la banque commence par ces lettres il se place
        (« j » + apostrophe valide « j’ » ; Espace/Entrée valide le mot tapé en entier ; Retour arrière/Échap effacent). Le bouton « Réécouter »
        redit la phrase. Pas de carte de remarque, pas de lecture : le Lecteur ne parle qu'entre deux phrases.
        TOUT SE RÈGLE DANS LE TABLEAU REPARATION (phrases, mots déjà placés, pièges, image, pique d'après). Le CSS propre à ce mode est
        injecté par le script (REPARATION_CSS) : à déplacer dans sequence-m1.css si tu préfères. C'est la FIN de la mémoire (onTermine).
     🆕 (07-11-2026) « LE / LA » DANS LE FRAGMENT 3 ET « JE JOUE » DANS LE FRAGMENT 4 :
        • Fragment 3 : « Je regarde la poutine. » s'ajoute au segment 2 (ordre + écriture de l'article) ; au segment 3, « Je regarde un sandwich. »
          est suivi de « Je regarde le sandwich. » (le MÊME sandwich, maintenant connu) ; au segment 4, Bek MANGE ce sandwich : « Je mange le sandwich. »
          (avant : « un sandwich »). L'exercice audio devient : « Je regarde un film. », « Je regarde le sandwich. », « Je mange la poutine. »
        • Fragment 4 : après « J'aime jouer. », une construction « Je joue. » (image de Bek qui joue) oppose la forme conjuguée (jou-e) à l'infinitif
          (jou-er). Nouveau mot : « joue » (voix : bek_joue_01). L'exercice audio du fragment 4 : « J'aime manger. », « J'aime jouer. », « Je joue. »
        Nouvelles voix (phrases) : bek_je-regarde-la-poutine_01, bek_je-regarde-le-sandwich_01, bek_je-joue_01 ; (mot) bek_joue_01.
     🆕 (04-11-2026) QUITTER ET CONTINUER PLUS TARD : options.reprendreA = n (1 à 5) reprend le fragment au segment n (n segments déjà faits ;
        l'introduction est remplacée par « On reprend là où on s'était arrêtés »). callbacks.onPosition({ fragment, segment }) est appelé au début
        de chaque segment (jamais à 0 ni à la fin) : la page hôte y garde la position (voir memoire-1.html). Le bouton « ‹ » ouvre une
        confirmation « Quitter et continuer plus tard ? » (Quitter / Rester) ; onQuitter n'est appelé que si l'élève confirme.
     🆕 (07-11-2026) FLÈCHE DE RETOUR (fragments 1 à 4) : un bouton rond « ← » à gauche de la barre de progression. Premier appui : on rejoue l'étape
        en cours depuis son début (si l'élève a déjà passé son premier écran) ; sinon, on revient à l'étape précédente. Grisée sur le tout premier écran.
        Pas d'introduction au retour (option interne _retour). demarrer() reconstruit la scène à l'étape voulue (reprendreA) : la poignée rendue
        à la page hôte reste valable. Textes : retour_etape. Style : RETOUR_CSS (injecté). Pas de flèche au fragment 5 (réparation).
   🆕 (08-11-2026) ÉTAL REVU (fragment 2) : il quitte les pieds de Bek et s'affiche dans la carte de leçon, juste au-dessus de la zone d'exercice,
      avec de plus gros dessins. Il n'existe plus de mode « sous les pieds de Bek ». « un / une » : les trois objets ; pause (ETAL_PAUSE) ; les deux
      autres s'estompent, le restant grossit avec un halo violet : « le / la ». Sur la carte « Remarque » l'animation tourne en boucle ; ailleurs elle
      joue au changement d'état. Un clic rejoue (↻) ; la pastille pulse quand son mot change ou quand l'élève pose un article dans la phrase.
      Sandwich redessiné (pain de mie et garniture en couches : plus de ressemblance avec un hamburger). Version : 29 (voir console). Exercices d'écoute : « J'aime manger la poutine » reprend les images où elle mange la poutine, « J'aime manger » un aliment en alternance ; « joue » ajouté au choix de « Je joue. » (et la banque contient toujours tous les mots de la phrase). Astuces du Lecteur : plus longues (selon le texte), pause au survol, et l'icône reste cliquable pour les revoir. Voix : plus de fin de phrase coupée (attente 4,5 s + respiration). Lecture : seuls les mots nouveaux sont à toucher (✦), les mots touchés sont marqués (✓). Écriture « j’aime » : une seule case, deux étiquettes (sujet | verbe). L'étal est aussi dans le fragment 3 (un film ; une → la poutine ; un → le sandwich).
   🆕 (08-11-2026) SAISIE AU CLAVIER dans « ordre » et « construire » (reprise de sequence-memoire) : taper la lettre d'un mot le pose dès qu'il est
      seul à commencer ainsi ; si deux mots restent possibles (un/une, mange/manger, le/la), on continue de taper ; Entrée ou Espace pose le mot
      tapé en entier (« mange » → mange) ; « ’ » pose « j’ » ; Retour arrière / Échap effacent ; la fin d'un mot posé est avalée (« poutine » tapé
      d'une traite). Construction : Entrée (rien de tapé) valide la phrase, Retour arrière retire le dernier mot. Astuce affichée une seule fois
      (clé kebbek_astuce_clavier, partagée avec sequence-memoire ; jamais sur un écran tactile). La réparation (fragment 5) garde sa saisie.
   🆕 (08-11-2026) SCÈNE D'ABORD, ENCADRÉ ENSUITE : au début de chaque fragment (1 à 6) et à un point de repos au milieu (fragments 1, 2, 3, 4 et 6 ;
      table SCENES), Bek apparaît grande et centrée avec son animation (elle mange, le cœur monte pour « aime », sinon elle respire doucement) pendant
      que l'encadré est caché ; il se dévoile ensuite en fondu et Bek glisse à sa place. La position de Bek est mesurée à l'exécution (aucune dépendance
      à sequence-m1.css). Un clic, Entrée ou Espace passent la scène ; durées SCENE_DUREE / SCENE_DUREE_MANGER ; mouvement réduit : fondu seulement ;
      aucune scène au retour en arrière (flèche) ni à la reprise au milieu d'un fragment.
     Un « ' » ou un « ’ » tapé sont équivalents ; « jaime » ou « j aime » donnent « Presque ! N'oublie pas l'apostrophe. »
   onTermine({ mots, fragments }) : fragments = numéro du fragment terminé.

   🆕 (08-11-2026) v30 :
     • VOIX : plus d'écho de l'écran précédent. voixActive() compte aussi la phrase mise en file et la synthèse qui démarre (≈ 70 ms) ;
       vider() coupe la voix à chaque nouvel écran.
     • CŒUR : quand la voix dit « aime » (phrase ou mot), un cœur SVG monte au-dessus de la tête de Bek (partout : leçons du fragment 4, réparation, fragment 6).
     • PREMIER ÉCRAN DU FRAGMENT 1 : Bek tient son sandwich et le mange en boucle (pose fixe si les images de la boucle manquent).
     • FRAGMENT 6 (options.fragment = 6) : L'ÉPREUVE, 11 segments (ETAPES_6) : 4 dictées (écrites à la main, aucune case, liste de mots NON touchable, « Réécouter »),
       3 questions sur image (« Que fais-tu ? », « Qu'est-ce que tu aimes faire ? » avec cœur), 1 compréhension (les trois aliments de Bek avec un/une, une seule
       tentative, aucune correction affichée), 1 question libre (jamais notée ; boutons Copier / Tout copier), 2 défis (« étudier » : « j'étudie », puis « j'aime étudier »).
       Le Lecteur explique la situation (intro6, lec_certif, lec_libre, lec_defi). Deux essais pour dictée / image / défi ; après le dernier raté, la réponse n'est PAS montrée.
       ACCENTS_TOLERES (en haut) : accent ou apostrophe seuls = « presque » (accepté). Le module ne stocke rien :
       callbacks.onResultat({ cle, type, question, reponse, statut, attendu, essais }) à chaque réponse ; onTermine({ mots, fragments: 6, resultats, bilan }).
       statut : ok | presque | partiel | non | libre | passe. Les résultats survivent à la flèche de retour (le module les garde le temps de la session) ;
       pour un « quitter et continuer plus tard », c'est la page hôte qui garde ceux reçus par onResultat.
       Textes : fr + en + ja. Le fragment 5 garde son onTermine : c'est la page hôte qui enchaîne sur le 6.

   @param {string} idConteneur
   @param {object} options   : langue ; dossierAudio ('audio/fr/') ; voix ('bek') ; versionVoix ('01') ; voixLangue ('fr-CA') ;
                               imageLecteur ; sources { pose: url }
   @param {object} callbacks : onTermine({ mots, fragments }) ; onQuitter() ; onPosition({ fragment, segment })
   Principe du projet : le module ne navigue jamais lui-même.
   🆕 Textes : les 20 langues du projet (fr, en, es, it, pt, ca, eo, zh, ja, ko, vi, ht, tl, id,
   nl, de, fa, sv, no, ru). Tutoiement ; « poutine » reste en lettres latines en ko, ru et fa
   (sa transcription locale se lit comme le nom du président russe). À faire relire par des
   locuteurs natifs, surtout les piques du Lecteur (quip*).
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const MOTS_APPRIS = ['mange', 'un', 'une', 'sandwich', 'poutine'];
  // 🆕 (03-11-2026) Fragment 2 : « regarder ». Mots introduits (le rappel de « mange » ne compte pas).
  const MOTS_APPRIS_2 = ['le', 'la', 'pizza'];       // fragment 2 : un/une, le/la
  const MOTS_APPRIS_3 = ['regarde', 'film'];       // fragment 3 : regarder (ancien fragment 2)
  const MOTS_APPRIS_4 = ['j', 'aime', 'manger', 'regarder', 'jouer', 'joue', 'tele'];   // fragment 4 : j'aime + infinitif
  const MOTS_APPRIS_5 = [];                       // fragment 5 : la réparation n'apprend aucun mot nouveau
  const MOTS_APPRIS_6 = [];                       // fragment 6 : l'épreuve n'apprend aucun mot nouveau
  const ETAPES_TOTAL = 6;
  // 🆕 (08-11-2026) Fragment 6 (l'épreuve) : longueur VARIABLE. 11 segments = 4 dictées + 3 images + 1 compréhension + 1 question libre + 2 défis.
  //   Les autres fragments gardent 6 segments. Pour ajouter/retirer une question : modifier segmentsDuFragment() ET ce nombre.
  const ETAPES_6 = 11;
  // 🆕 Fragment 6, sans indice : une faute d'accent ou d'apostrophe seule est-elle acceptée (notée « presque ») ou comptée comme une erreur ?
  //   ⚠️ CHOIX À CONFIRMER : true = acceptée et notée « presque » ; false = erreur. (Dans les leçons, rien ne change : l'indice reste donné.)
  const ACCENTS_TOLERES = true;

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
    'bek-mange-poutine':  'images/m1/bek_mange-poutine_01-01.webp',
    // 🎨 fragment 3 : Bek qui REGARDE. Film (livrée, deux poses) : concentrée, yeux sur l'écran, télécommande en main ; sandwich (à produire) :
    // elle a faim mais patiente ; poutine (à produire) : enthousiasme très bas, poli mais éteint.
    'bek-regarde-film':     'images/m1/bek_regarde-film_01-01.webp',                    // 🆕 la pose des leçons, et le repos : bouche fermée
    'bek-film-ouverte':     'images/m1/bek_regarde-film_bouche-ouverte_01-01.webp',     // 🆕 en parlant : bouche ouverte (exercices d'écoute)
    'bek-regarde-sandwich': 'images/m1/bek_regarde-sandwich_01-01.webp',                          // 🆕 la pose des leçons, et le repos : bouche fermée
    'bek-sandwich-regarde-ouverte': 'images/m1/bek_regarde-sandwich_bouche-ouverte_01-01.webp',   // 🆕 en parlant : bouche ouverte (exercices d'écoute)
    'bek-regarde-poutine':  'images/m1/bek_regarde-poutine_01-01.webp',                           // 🆕 la pose des leçons, et le repos : bouche fermée
    'bek-poutine-regarde-ouverte': 'images/m1/bek_regarde-poutine_bouche-ouverte_01-01.webp',     // 🆕 en parlant : bouche ouverte (exercices d'écoute)
    // 🎨 fragment 2 (livrées, trois poses) : Bek qui mange une pizza (même enthousiasme que pour le sandwich, un peu plus gourmande)
    'bek-mange-pizza':      'images/m1/bek_mange-pizza_01-01.webp',                    // 🆕 la pose principale : grand sourire
    'bek-pizza-repos':      'images/m1/bek_mange-pizza_bouche-fermee_01-01.webp',      // 🆕 au repos : sourire bouche fermée
    'bek-pizza-ouverte':    'images/m1/bek_mange-pizza_bouche-ouverte_01-01.webp',     // 🆕 en parlant : bouche ouverte
    // 🎨 fragment 4 (livrées) : Bek tient une poupée (une fille ailée, salopette : on n'en dit pas plus). Repos = bouche fermée ; bouche ouverte
    // pendant la voix ; puis cinq mouvements avec la poupée (le nom dit « haut » pour tous : c'est seulement la suite, de 01-01 à 01-05).
    'bek-aime-jouer':       'images/m1/bek_aime-jouer_01-01.webp',                              // 🆕 repos : bouche fermée
    'bek-jouer-ouverte':    'images/m1/bek_aime-jouer_bouche-ouverte_01-01.webp',               // 🆕 en parlant : bouche ouverte
    'bek-jouer-1':          'images/m1/bek_aime-jouer_poupee-haut_01-01.webp',                  // 🆕 mouvements avec la poupée, dans l'ordre
    'bek-jouer-2':          'images/m1/bek_aime-jouer_poupee-haut_01-02.webp',
    'bek-jouer-3':          'images/m1/bek_aime-jouer_poupee-haut_01-03.webp',
    'bek-jouer-4':          'images/m1/bek_aime-jouer_poupee-haut_01-04.webp',
    'bek-jouer-5':          'images/m1/bek_aime-jouer_poupee-haut_01-05.webp',
    // 🆕 (07-11-2026) exercices d'écoute : Bek nous regarde, la main à plat sur la poitrine (« moi ») ; la bouche s'ouvre et se ferme pendant la voix
    'bek-ecoute':           'images/m1/bek_ecoute-moi_01-01.webp',
    'bek-ecoute-ouverte':   'images/m1/bek_ecoute-moi_bouche-ouverte_01-01.webp',
    // 🎨 facultatives : variante « bouche ouverte » (elle dit la phrase) et images de l'animation « elle mange »
    'bek-sandwich-ouverte':   'images/m1/bek_mange-sandwich_bouche-ouverte_01-01.webp',
    'bek-sandwich-bouchee':   'images/m1/bek_mange-sandwich_bouchee_01-01.webp',
    'bek-sandwich-mastique-a':'images/m1/bek_mange-sandwich_mastique-a_01-01.webp',
    'bek-sandwich-mastique-b':'images/m1/bek_mange-sandwich_mastique-b_01-01.webp',
    'bek-poutine-ouverte':    'images/m1/bek_mange-poutine_bouche-ouverte_01-01.webp',
    'bek-poutine-bouchee':    'images/m1/bek_mange-poutine_bouchee_01-01.webp',
    'bek-poutine-mastique-a': 'images/m1/bek_mange-poutine_mastique-a_01-01.webp',
    'bek-poutine-mastique-b': 'images/m1/bek_mange-poutine_mastique-b_01-01.webp'
  };
  // Boucle « elle mange » : base → bouchée → mastication A/B (× tours) → base, pause, on recommence.
  // Elle ne se joue que si TOUTES les images de la boucle existent (sinon : la pose fixe, comme avant).
  const MANGER = {
    sandwich: { base: 'bek-mange-sandwich', ouverte: 'bek-sandwich-ouverte', bouchee: 'bek-sandwich-bouchee',
                mastique: ['bek-sandwich-mastique-a', 'bek-sandwich-mastique-b'], msBouchee: 450, msMastique: 260, tours: 4, pause: 1600 },
    poutine:  { base: 'bek-mange-poutine',  ouverte: 'bek-poutine-ouverte',  bouchee: 'bek-poutine-bouchee',
                mastique: ['bek-poutine-mastique-a', 'bek-poutine-mastique-b'],   msBouchee: 650, msMastique: 480, tours: 2, pause: 2400 }
  };
  // 🆕 Pendant la voix d'une phrase (leçon, remplacement, écriture, « Réécouter »), Bek ouvre et ferme la bouche sur la pose qu'elle a déjà,
  // si cette pose a sa version « bouche ouverte ». (La pizza n'y est pas : sa pose des leçons n'est pas celle de son repos.)
  const POSE_OUVERTE = { 'bek-mange-sandwich': 'bek-sandwich-ouverte', 'bek-mange-poutine': 'bek-poutine-ouverte',
                         'bek-regarde-film': 'bek-film-ouverte', 'bek-regarde-sandwich': 'bek-sandwich-regarde-ouverte',
                         'bek-regarde-poutine': 'bek-poutine-regarde-ouverte',
                         'bek-aime-jouer': 'bek-jouer-ouverte' };
  const POSE_DE_REPLI = { 'bek-mange-sandwich': 'bek-heureuse-ferme', 'bek-mange-poutine': 'bek-observe',
                          'bek-regarde-film': 'bek-concentree', 'bek-regarde-sandwich': 'bek-observe', 'bek-regarde-poutine': 'bek-observe',
                          'bek-mange-pizza': 'bek-observe',
                          'bek-aime-jouer': 'bek-observe', 'bek-ecoute': 'bek-observe' };
  const VIGNETTE_DE = { 'bek-mange-sandwich': 'sandwich', 'bek-mange-poutine': 'poutine',
                        'bek-regarde-film': 'film', 'bek-regarde-sandwich': 'sandwich', 'bek-regarde-poutine': 'poutine',
                        'bek-mange-pizza': 'pizza',
                        'bek-aime-jouer': 'jeu' };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);

  const AFFICHE = { je: 'je', mange: 'mange', regarde: 'regarde', film: 'film', parle: 'parle', un: 'un', une: 'une', le: 'le', la: 'la', sandwich: 'sandwich', poutine: 'poutine', pizza: 'pizza', francais: 'français',
                    j: 'j’', aime: 'aime', manger: 'manger', regarder: 'regarder', jouer: 'jouer', joue: 'joue', tele: 'télé' };
  const ROLE = { je: 's', mange: 'v', regarde: 'v', film: 'o', parle: 'v', un: 'o', une: 'o', le: 'o', la: 'o', sandwich: 'o', poutine: 'o', pizza: 'o', francais: 'o',
                  j: 's', aime: 'v', manger: 'o', regarder: 'o', jouer: 'o', joue: 'v', tele: 'o' };   // un infinitif après « aimer » est l'objet de « aime »
  const GENRE = { sandwich: 'genre_m', poutine: 'genre_f', film: 'genre_m', pizza: 'genre_f', tele: 'genre_f' };

  const PHRASES = {
    mange:    { mots: ['je', 'mange'],                  texte: 'Je mange.',               audio: 'je-mange',             tr: 'tr_mange' },
    sandwich: { mots: ['je', 'mange', 'un', 'sandwich'], texte: 'Je mange un sandwich.',   audio: 'je-mange-un-sandwich', tr: 'tr_sandwich' },
    poutine:  { mots: ['je', 'mange', 'une', 'poutine'], texte: 'Je mange une poutine.',   audio: 'je-mange-une-poutine', tr: 'tr_poutine' },
    parle:    { mots: ['je', 'parle', 'francais'],      texte: 'Je parle français.',      audio: 'je-parle-francais',    tr: 'tr_parle' },
    // fragment 2
    regarde:     { mots: ['je', 'regarde'],                  texte: 'Je regarde.',               audio: 'je-regarde',             tr: 'tr_regarde' },
    film:        { mots: ['je', 'regarde', 'un', 'film'],    texte: 'Je regarde un film.',       audio: 'je-regarde-un-film',     tr: 'tr_film' },
    regpoutine:  { mots: ['je', 'regarde', 'une', 'poutine'], texte: 'Je regarde une poutine.',  audio: 'je-regarde-une-poutine', tr: 'tr_regpoutine' },
    regsandwich: { mots: ['je', 'regarde', 'un', 'sandwich'], texte: 'Je regarde un sandwich.',  audio: 'je-regarde-un-sandwich', tr: 'tr_regsandwich' },
    // fragment 3 (suite) : regarder + le/la
    regpoutinela:  { mots: ['je', 'regarde', 'la', 'poutine'],   texte: 'Je regarde la poutine.',  audio: 'je-regarde-la-poutine',  tr: 'tr_regpoutinela' },
    regsandwichle: { mots: ['je', 'regarde', 'le', 'sandwich'],  texte: 'Je regarde le sandwich.', audio: 'je-regarde-le-sandwich', tr: 'tr_regsandwichle' },
    // fragment 4 (suite) : la forme conjuguée de « jouer »
    jejoue:        { mots: ['je', 'joue'],                       texte: 'Je joue.',                audio: 'je-joue',                tr: 'tr_jejoue' },
    // fragment 2 : un/une, le/la
    sandwichle: { mots: ['je', 'mange', 'le', 'sandwich'], texte: 'Je mange le sandwich.', audio: 'je-mange-le-sandwich', tr: 'tr_sandwichle' },
    poutinela:  { mots: ['je', 'mange', 'la', 'poutine'],  texte: 'Je mange la poutine.',   audio: 'je-mange-la-poutine',   tr: 'tr_poutinela' },
    pizzaune:   { mots: ['je', 'mange', 'une', 'pizza'],   texte: 'Je mange une pizza.',    audio: 'je-mange-une-pizza',    tr: 'tr_pizzaune' },
    pizzala:    { mots: ['je', 'mange', 'la', 'pizza'],    texte: 'Je mange la pizza.',     audio: 'je-mange-la-pizza',     tr: 'tr_pizzala' },
    // fragment 4 : j'aime
    aimepoutine: { mots: ['j', 'aime', 'la', 'poutine'],              texte: 'J’aime la poutine.',             audio: 'jaime-la-poutine',            tr: 'tr_aimepoutine' },
    aimemanger:  { mots: ['j', 'aime', 'manger'],                     texte: 'J’aime manger.',                 audio: 'jaime-manger',                tr: 'tr_aimemanger' },
    aimetele:    { mots: ['j', 'aime', 'regarder', 'la', 'tele'],     texte: 'J’aime regarder la télé.',       audio: 'jaime-regarder-la-tele',      tr: 'tr_aimetele' },
    aimejouer:   { mots: ['j', 'aime', 'jouer'],                      texte: 'J’aime jouer.',                  audio: 'jaime-jouer',                 tr: 'tr_aimejouer' },
    aimeregpoutine:    { mots: ['j', 'aime', 'regarder', 'la', 'poutine'], texte: 'J’aime regarder la poutine.', audio: 'jaime-regarder-la-poutine', tr: 'tr_aimeregpoutine' },
    aimepizza:   { mots: ['j', 'aime', 'la', 'pizza'],                texte: 'J’aime la pizza.',             audio: 'jaime-la-pizza',            tr: 'tr_aimepizza' },
    aimemangerpoutine: { mots: ['j', 'aime', 'manger', 'la', 'poutine'],   texte: 'J’aime manger la poutine.',   audio: 'jaime-manger-la-poutine',   tr: 'tr_aimemangerpoutine' }
  };
  const BANQUE_LIBRE = ['je', 'mange', 'parle', 'un', 'une', 'sandwich', 'poutine', 'francais'];
  const BANQUE_2 = ['je', 'mange', 'un', 'une', 'le', 'la', 'sandwich', 'poutine', 'pizza'];   // fragment 2 : un/une, le/la
  const BANQUE_3 = ['je', 'mange', 'regarde', 'un', 'une', 'le', 'la', 'sandwich', 'poutine', 'film'];   // fragment 3 : regarder
  // 🆕 LA RÉPARATION — le souvenir abîmé : 6 phrases, de plus en plus seul (fixes = indices des mots déjà en place)
  const REPARATION = [
    { cle: 'film',       fixes: [0, 1], pieges: ['une', 'mange'],  pose: 'bek-regarde-film',    apres: 'repApres1' },
    { cle: 'pizzaune',   fixes: [0, 1], pieges: ['un', 'la'],     pose: 'bek-mange-pizza',     apres: null },
    { cle: 'aimepizza',  fixes: [1],    pieges: ['je', 'le'],     pose: 'bek-mange-pizza',     apres: 'repApres3' },
    { cle: 'aimetele',   fixes: [3],    pieges: ['regarde'],      pose: 'bek-regarde-film',    apres: null },
    { cle: 'sandwichle', fixes: [],     pieges: ['un', 'la'],     pose: 'bek-mange-sandwich',  apres: 'repApres5' },
    { cle: 'parle',      fixes: [],     pieges: ['mange', 'regarde'], pose: 'bek-observe',     apres: null }
  ];
  const REPARATION_CSS = [
    '.m1-rep{display:flex;flex-direction:column;gap:.45rem;margin:.2rem 0 .6rem}',
    '.m1-rep-ligne{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem;padding:.35rem .55rem;border-radius:.9rem;opacity:.5;transition:opacity .4s,background .4s}',
    '.m1-rep-ligne.m1-rep-active{opacity:1;background:var(--peche-pale,rgba(240,169,139,.16))}',
    '.m1-rep-ligne.m1-rep-faite{opacity:1}',
    '.m1-slot{display:inline-flex;align-items:center;justify-content:center;min-width:3.4rem;height:2.2rem;padding:0 .5rem;border:2px dashed var(--brun-clair,#8A7364);border-radius:.7rem;color:var(--brun-fonce,#4A3B33);font-weight:700;box-sizing:border-box}',
    '.m1-slot-courant{border-color:var(--peche-fonce,#E08867);background:rgba(255,255,255,.55)}',
    '.m1-slot-frappe{opacity:.75}',
    '.m1-abime{display:inline-block;height:1.5rem;border-radius:.45rem;background:repeating-linear-gradient(135deg,rgba(138,115,100,.35) 0 6px,rgba(138,115,100,.12) 6px 12px)}',
    '.m1-tuile-fixe{opacity:.85;cursor:default}',
    '.m1-corrompu .m1-col-bek{filter:grayscale(calc(var(--m1-abime,1)*.85)) blur(calc(var(--m1-abime,1)*1.8px)) contrast(calc(1 + var(--m1-abime,1)*.15));transition:filter .9s ease}',
    '@media (prefers-reduced-motion:reduce){.m1-corrompu .m1-col-bek,.m1-rep-ligne{transition:none}}'
  ].join('\n');
  const QUITTER_CSS = [
    '.m1-quitter-voile{position:absolute;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(74,59,51,.45);padding:1rem;box-sizing:border-box}',
    '.m1-quitter-boite{max-width:22rem;width:100%;background:#FCF5EA;border-radius:1.2rem;padding:1.2rem 1.3rem;box-shadow:0 10px 30px rgba(74,59,51,.35);text-align:center;color:var(--brun-fonce,#4A3B33)}',
    '.m1-quitter-titre{margin:0 0 .3rem;font-weight:800;font-size:1.15rem}',
    '.m1-quitter-info{margin:0 0 1rem;opacity:.85}',
    '.m1-quitter-boutons{display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}'
  ].join('\n');
  const RETOUR_CSS = [
    '.m1-entete-carte{display:flex;align-items:center;gap:.6rem;margin-bottom:var(--m1-retour-marge,.7rem)}',
    '.m1-entete-carte .m1-progres{flex:1 1 auto;min-width:0;margin:0}',
    '.m1-retour{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:2.3rem;height:2.3rem;margin:-.55rem 0;padding:0;border:2px solid var(--brun-fonce,#4A3B33);border-radius:50%;background:#FFFFFF;color:var(--brun-fonce,#4A3B33);cursor:pointer;box-shadow:0 2px 0 var(--brun-fonce,#4A3B33);transition:background .15s,transform .1s,opacity .2s}',
    '.m1-retour svg{width:1.15rem;height:1.15rem;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}',
    '.m1-retour:hover{background:var(--peche-pale,rgba(240,169,139,.16))}',
    '.m1-retour:active{transform:translateY(1px);box-shadow:0 1px 0 var(--brun-fonce,#4A3B33)}',
    '.m1-retour:focus-visible{outline:3px solid var(--brun-fonce,#4A3B33);outline-offset:2px}',
    '.m1-retour:disabled{opacity:.3;cursor:default;box-shadow:none}',
    '.m1-retour:disabled:hover{background:#FFFFFF}',
    '@media (prefers-reduced-motion:reduce){.m1-retour{transition:none}}'
  ].join('\n');
  // 🆕 (07-11-2026) INDICE « NOUVEAU / CONNU » (fragment 2) : un code couleur unique, repris sur les tuiles, la remarque et l'étal.
  //   ⚠️ Les mots sont déjà colorés par RÔLE dans sequence-m1.css (sujet pêche, verbe bleu, objet vert) : l'indice prend deux teintes
  //   qui n'y sont pas. ambre = un / une (une chose nouvelle, parmi d'autres) ; violet doux = le / la (celle dont on parle, déjà connue).
  const COULEUR_NOUVEAU = '#D9A21B', COULEUR_CONNU = '#8E7CC3';
  const RVB_NOUVEAU = '217,162,27', RVB_CONNU = '142,124,195';
  const FOND_CONNU = '#E4DDF3';
  const ART_CSS = [
    '.m1-tuile.m1-art-i,.m1-tuile.m1-art-d,.m1-case.m1-art-i,.m1-case.m1-art-d{position:relative}',
    '.m1-tuile.m1-art-i::after,.m1-tuile.m1-art-d::after,.m1-case.m1-art-i::after,.m1-case.m1-art-d::after{content:"";position:absolute;left:20%;right:20%;bottom:.28rem;height:.2rem;border-radius:.2rem;pointer-events:none}',
    '.m1-art-i::after{background:' + COULEUR_NOUVEAU + '}',
    '.m1-art-d::after{background:' + COULEUR_CONNU + '}',
    // la carte « Remarque » : un → le, une → la (une paire par ligne : elles ne tiennent pas côte à côte)
    '.m1-paire.m1-paire-art{flex-direction:column;align-items:center;gap:6px}',
    '.m1-paire-art .m1-radical b{color:' + COULEUR_NOUVEAU + '}',
    '.m1-paire-art .m1-radical i{background:' + FOND_CONNU + ';color:var(--brun-fonce,#4A3B33);box-shadow:inset 0 -3px 0 ' + COULEUR_CONNU + '}'
  ].join('\n');
  // 🆕 (08-11-2026) CASE FUSIONNÉE « j’aime » : l'élision s'écrit d'un seul tenant. Une seule case (écriture), deux étiquettes au-dessus (sujet | verbe) ;
  //   la bordure reprend les deux couleurs (celles des cases « sujet » et « verbe », lues dans la feuille de style).
  const FUSION_CSS = [
    '.m1-groupe.m1-groupe-fusion{align-items:stretch}',
    '.m1-groupe-fusion .m1-fusion-etiq{display:flex;width:100%}',
    '.m1-groupe-fusion .m1-fusion-etiq .m1-role{box-sizing:border-box;text-align:center;white-space:nowrap}',
    '.m1-groupe-fusion .m1-fusion-etiq .m1-role:first-child{flex:1 1 0}',
    '.m1-groupe-fusion .m1-fusion-etiq .m1-role:last-child{flex:2 1 0;border-left:2px dotted rgba(74,59,51,.3)}',
    '.m1-groupe-fusion .m1-rang{justify-content:center}',
    '.m1-champ.m1-champ-fusion:not(.m1-ok):not(.m1-ko){border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,var(--m1-cs) 0 34%,var(--m1-cv) 34% 100%) border-box}'
  ].join('\n');
  // 🆕 (08-11-2026) LECTURE : seuls les mots NOUVEAUX du fragment sont à toucher pour continuer. Les autres restent touchables (révision) mais ne bloquent plus.
  //   Pastille « ✦ » sur un mot nouveau pas encore touché ; « ✓ » sur tout mot déjà touché (aussi dans les phrases suivantes du même fragment).
  const LECTURE_CSS = [
    '.m1-tuile-lue{position:relative}',
    '.m1-tuile-lue .m1-etat{position:absolute;top:-.55rem;right:-.4rem;min-width:1.25rem;height:1.25rem;padding:0 .15rem;box-sizing:border-box;display:none;align-items:center;justify-content:center;',
    'border-radius:999px;border:2px solid var(--brun-fonce,#4A3B33);font-size:.72rem;line-height:1;font-weight:800;color:#fff;pointer-events:none;z-index:2}',
    '.m1-tuile-lue.m1-tuile-nouveau:not(.m1-tuile-vue) .m1-etat{display:inline-flex;background:' + COULEUR_NOUVEAU + ';animation:m1-etat-pulse 1.6s ease-in-out infinite}',
    '.m1-tuile-lue.m1-tuile-vue .m1-etat{display:inline-flex;background:#7FB069;animation:none}',
    '.m1-tuile-lue.m1-tuile-vue:not(.m1-tuile-choisie){opacity:.82}',
    '@keyframes m1-etat-pulse{50%{transform:scale(1.22)}}',
    '@media (prefers-reduced-motion:reduce){.m1-tuile-lue .m1-etat{animation:none!important}}'
  ].join('\n');
  // 🆕 (08-11-2026) ASTUCES DU LECTEUR : elles restent plus longtemps (selon la longueur du texte) ; une fois la bulle partie, l'icône du Lecteur reste à sa place,
  //   un peu plus discrète, avec une petite pastille « … » : un clic (ou Entrée) refait apparaître l'astuce. La bulle garde sa place (visibility) : rien ne bouge.
  const LECTEUR_REPOS_CSS = [
    '.m1-scene .m1-lect.m1-lect-repos{opacity:1!important;pointer-events:none!important;transform:none!important}',
    '.m1-scene .m1-lect.m1-lect-repos .m1-lect-bulle{visibility:hidden}',
    '.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone{position:relative;pointer-events:auto!important;cursor:pointer;opacity:.82;transform:scale(.92);transform-origin:left bottom;',
    'transition:opacity .25s ease,transform .25s ease;-webkit-tap-highlight-color:transparent}',
    '.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone:hover,.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone:focus-visible{opacity:1;transform:scale(1)}',
    '.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone:focus-visible{outline:3px solid var(--peche-fonce,#E08867);outline-offset:3px;border-radius:50%}',
    '.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone::after{content:"\\2026";position:absolute;top:-.3rem;right:-.5rem;min-width:1.3rem;height:1.3rem;box-sizing:border-box;border-radius:999px;',
    'background:#fff;border:2px solid var(--brun-fonce,#4A3B33);color:var(--brun-fonce,#4A3B33);font-size:.8rem;font-weight:800;line-height:.9rem;text-align:center;animation:m1-lect-appel 1.4s ease 2}',
    '@keyframes m1-lect-appel{40%{transform:scale(1.28)}}',
    '@media (prefers-reduced-motion:reduce){.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone,.m1-scene .m1-lect.m1-lect-repos .m1-lect-icone::after{transition:none;animation:none}}'
  ].join('\n');
  // L'étal : trois objets identiques (« un parmi plusieurs »), puis un seul mis en valeur (« celui-là »). Décoratif (aria-hidden).
  const ETAL_ART = { sandwich: ['un', 'le'], poutine: ['une', 'la'], pizza: ['une', 'la'], film: ['un', 'le'] };
  // 🆕 (08-11-2026) SAISIE AU CLAVIER (reprise de sequence-memoire) : lettres tapées dans la prochaine case, début des mots surligné, mots écartés atténués.
  const SAISIE_CSS = [
    '.m1-case{position:relative}',
    '.m1-case .m1-frappe{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--peche-fonce,#E08867);font-weight:700;letter-spacing:.04em;pointer-events:none}',
    '.m1-construction .m1-frappe{display:inline-flex;align-items:center;color:var(--peche-fonce,#E08867);font-weight:700;font-size:1.05rem;letter-spacing:.04em;padding:0 .3rem}',
    '.m1-frappe::after{content:"";width:2px;height:1.05em;margin-left:3px;background:currentColor;border-radius:1px;animation:m1-curseur 1s steps(1) infinite}',
    '@keyframes m1-curseur{50%{opacity:0}}',
    '.m1-frappe.m1-frappe-non{color:var(--rouge,#B8503A)}.m1-frappe.m1-frappe-non::after{display:none}',
    '.m1-construction.m1-saisie .m1-construction-vide{display:none}',
    '.m1-tuile.m1-tuile-prefixe{border-color:var(--peche-fonce,#E08867)!important;transform:translateY(-3px);box-shadow:0 4px 0 0 var(--peche-fonce,#E08867),2px 6px 12px rgba(102,80,69,.18)}',
    '.m1-tuile .m1-tuile-frappe{color:var(--peche-fonce,#E08867)}',
    '.m1-tuile.m1-tuile-attenuee{opacity:.38}',
    '@media (prefers-reduced-motion:reduce){.m1-frappe::after{animation:none}}'
  ].join('\n');
  // 🆕 (08-11-2026) L'étal quitte les pieds de Bek : il est dans la carte de leçon, juste au-dessus de la phrase (là où l'œil de l'élève travaille),
  //   avec de gros dessins.
  // 🆕 (08-11-2026) LE CŒUR : quand la voix dit « aime », un petit cœur (SVG, aucune image à produire) monte au-dessus de la tête de Bek, avec une lueur douce.
  // 🆕 (08-11-2026) SCÈNE D'ABORD, ENCADRÉ ENSUITE : au début de chaque fragment, et à un point de repos au milieu, Bek apparaît grande et centrée
  // avec son animation ; l'encadré (la carte et le Lecteur) est caché. Puis il se dévoile en fondu pendant que Bek glisse à sa place.
  // La place de Bek est MESURÉE à l'exécution (aucune dépendance à la disposition de sequence-m1.css). Un clic, Entrée ou Espace passent la scène.
  // Mouvement réduit : pas de glissement, seulement un fondu. Retour en arrière (flèche) et reprise en cours de fragment : pas de scène.
  const SCENE_CSS = [
    '.m1-col-gauche.m1-cache{opacity:0;visibility:hidden;transform:translateX(-18px);pointer-events:none}',
    '.m1-col-gauche.m1-glisse{transition:opacity .9s ease .25s,transform .9s cubic-bezier(.2,.8,.3,1) .25s}',
    '.m1-bek.m1-bek-souffle{animation:m1-souffle 2.4s ease-in-out infinite alternate}',
    '@keyframes m1-souffle{from{transform:translateY(0) scale(1)}to{transform:translateY(-6px) scale(1.012)}}',
    '@media (max-width:719px){.m1-col-gauche.m1-cache{transform:translateY(-12px)}}',
    '@media (prefers-reduced-motion:reduce){.m1-col-gauche.m1-cache{transform:none}.m1-col-gauche.m1-glisse{transition:opacity .3s ease}.m1-bek.m1-bek-souffle{animation:none}}'
  ].join('\n');
  const SCENE_DUREE = 3000, SCENE_DUREE_MANGER = 4300;     // ms : de quoi voir une bouchée et quelques mastications
  const SCENES = {                                         // intro : au début du fragment ; repos : avant le segment « index » (milieu du fragment)
    1: { intro: { pose: 'bek-mange-sandwich', manger: 'sandwich' }, repos: { index: 3, pose: 'bek-mange-sandwich', manger: 'sandwich' } },
    2: { intro: { pose: 'bek-mange-poutine', manger: 'poutine' },  repos: { index: 3, pose: 'bek-mange-sandwich', manger: 'sandwich' } },
    3: { intro: { pose: 'bek-regarde-film' },                     repos: { index: 3, pose: 'bek-regarde-poutine' } },
    4: { intro: { pose: 'bek-mange-poutine', manger: 'poutine', coeur: true }, repos: { index: 3, pose: 'bek-aime-jouer', coeur: true } },
    5: { intro: { pose: 'bek-observe' } },
    6: { intro: { pose: 'bek-observe' },                          repos: { index: 4, pose: 'bek-mange-poutine', manger: 'poutine' } }
  };
  //   Le style est injecté ici ; à déplacer dans sequence-m1.css si tu préfères. Mouvement réduit : le cœur apparaît sans monter, puis s'efface.
  const COEUR_CSS = [
    '.m1-coeur{position:absolute;left:50%;top:1%;width:3.4rem;height:3.4rem;margin-left:-1.7rem;pointer-events:none;z-index:5;opacity:0;',
    'filter:drop-shadow(0 0 .55rem rgba(232,92,120,.65));animation:m1-coeur-monte 2.6s ease-out forwards}',
    '.m1-coeur svg{display:block;width:100%;height:100%}',
    '.m1-coeur path{fill:#E85C78;stroke:#4A3B33;stroke-width:2.4;stroke-linejoin:round}',
    '@keyframes m1-coeur-monte{0%{opacity:0;transform:translateY(1.4rem) scale(.4)}18%{opacity:1;transform:translateY(0) scale(1.18)}32%{transform:translateY(-.2rem) scale(1)}',
    '75%{opacity:1;transform:translateY(-.9rem) scale(1.05)}100%{opacity:0;transform:translateY(-1.8rem) scale(1)}}',
    '@media (prefers-reduced-motion:reduce){.m1-coeur{animation:m1-coeur-fondu 2.2s ease-out forwards}@keyframes m1-coeur-fondu{0%{opacity:0}15%{opacity:1}70%{opacity:1}100%{opacity:0}}}'
  ].join('\n');
  // 🆕 (08-11-2026) FRAGMENT 6 : style de l'épreuve (liste de mots non touchable, zone libre, verbe du défi, récapitulatif). À déplacer dans sequence-m1.css si tu préfères.
  const EPREUVE_CSS = [
    '.m1-liste-mots{margin-top:.9rem;padding:.55rem .7rem;border:2px dashed rgba(74,59,51,.3);border-radius:.9rem;text-align:center}',
    '.m1-liste-titre{margin:0 0 .35rem;font-size:.8rem;font-weight:700;opacity:.65}',
    '.m1-liste-rang{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center}',
    '.m1-mot-liste{padding:.15rem .55rem;border-radius:.6rem;background:rgba(74,59,51,.07);font-weight:700;color:var(--brun-fonce,#4A3B33);pointer-events:none;user-select:none;cursor:default}',
    '.m1-champ-libre{display:block;width:100%;box-sizing:border-box;min-height:5.5rem;resize:vertical;font:inherit;padding:.6rem .8rem;border:2px solid var(--brun-fonce,#4A3B33);border-radius:.9rem;background:#fff;color:var(--brun-fonce,#4A3B33)}',
    '.m1-triple{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center}',
    '.m1-triple .m1-champ{flex:1 1 9rem;min-width:8rem;width:auto}',
    '.m1-defi-verbe{display:flex;flex-direction:column;align-items:center;margin:.2rem 0 .7rem}',
    '.m1-defi-verbe strong{font-size:1.9rem;color:var(--brun-fonce,#4A3B33)}',
    '.m1-defi-verbe span{opacity:.7;font-style:italic}',
    '.m1-recap{display:flex;flex-direction:column;gap:.5rem;max-height:16rem;overflow:auto;margin:.2rem 0 .6rem;text-align:left}',
    '.m1-recap-q{margin:0;font-size:.82rem;opacity:.7}.m1-recap-r{margin:0 0 .3rem;font-weight:700}'
  ].join('\n');
  const ETAL_PAUSE = 3400;
  const ATTENTE_VOIX_MAX = 4500;    // 🆕 une phrase dite automatiquement attend la fin de la voix en cours, jusqu'à 4,5 s (avant : 1,5 s, ce qui coupait la fin des phrases longues)
  const FIN_VOIX_MARGE = 260;       // 🆕 respiration (ms) laissée après la fin d'une voix, avant la suivante ou avant de changer d'écran      // durée de l'état « un / une » avant le passage à « le / la » (ms)
  const ETAL_CSS = [
    '.m1-etal{position:relative;display:flex;align-items:center;justify-content:center;gap:1rem;width:max-content;max-width:100%;box-sizing:border-box;margin:0 auto .9rem;padding:.9rem 1.5rem;',
    'background:rgba(255,255,255,.95);border:2px solid var(--brun-fonce,#4A3B33);border-radius:22px;box-shadow:0 3px 0 0 var(--brun-fonce,#4A3B33);cursor:pointer;-webkit-tap-highlight-color:transparent}',
    '.m1-etal-objets{display:flex;align-items:center;gap:.8rem}',
    '.m1-etal-objet{display:block;width:4.4rem;height:4.4rem;padding:.25rem;box-sizing:border-box;border-radius:1.2rem;box-shadow:0 0 0 3px transparent;',
    'transition:opacity 1.1s ease,transform 1.3s cubic-bezier(.3,.7,.3,1),box-shadow 1.1s ease,background-color 1.1s ease;animation:m1-etal-pop .6s ease backwards}',
    '.m1-etal-objet:nth-child(2){animation-delay:.14s}.m1-etal-objet:nth-child(3){animation-delay:.28s}',
    '.m1-etal-objet svg{display:block;width:100%;height:100%}',
    '.m1-etal-nouveau .m1-etal-objet{box-shadow:0 0 0 3px rgba(' + RVB_NOUVEAU + ',.45);background:rgba(' + RVB_NOUVEAU + ',.14)}',
    '.m1-etal-connu .m1-etal-objet{opacity:.18;transform:scale(.78)}',
    '.m1-etal-connu .m1-etal-objet:first-child{transition-delay:.45s;opacity:1;transform:scale(1.18);box-shadow:0 0 0 4px ' + COULEUR_CONNU + ',0 0 18px rgba(' + RVB_CONNU + ',.55);background:rgba(' + RVB_CONNU + ',.18)}',
    '.m1-etal-pastille{min-width:3.4rem;text-align:center;padding:.15rem 1rem;border-radius:999px;color:#fff;font-weight:800;font-size:1.5rem;box-shadow:0 3px 0 0 var(--brun-fonce,#4A3B33);transition:background-color .6s ease}',
    '.m1-etal-nouveau .m1-etal-pastille{background:' + COULEUR_NOUVEAU + '}',
    '.m1-etal-connu .m1-etal-pastille{background:' + COULEUR_CONNU + '}',
    // l'élève vient de placer un article dans la phrase : la pastille répond
    '.m1-etal-pulse .m1-etal-pastille{animation:m1-etal-pulse .6s ease}',
    '.m1-etal::after{content:"\\21BB";position:absolute;right:.45rem;top:.15rem;font-size:.8rem;line-height:1;color:var(--brun-fonce,#4A3B33);opacity:.35}',
    '@keyframes m1-etal-pop{from{opacity:0;transform:translateY(.5rem) scale(.85)}to{opacity:1;transform:none}}',
    '@keyframes m1-etal-pulse{40%{transform:scale(1.35)}}',
    '@media (max-width:719px){.m1-etal{gap:.7rem;padding:.7rem 1rem}.m1-etal-objets{gap:.55rem}.m1-etal-objet{width:3.3rem;height:3.3rem}.m1-etal-pastille{font-size:1.15rem;min-width:2.7rem;padding:.1rem .8rem}}',
    '@media (prefers-reduced-motion:reduce){.m1-etal-objet,.m1-etal-pastille{transition:none;animation:none}.m1-etal-pulse .m1-etal-pastille{animation:none}}'
  ].join('\n');
  const BANQUE_4 = ['j', 'je', 'aime', 'manger', 'mange', 'regarder', 'regarde', 'jouer', 'joue', 'la', 'poutine', 'tele'];   // fragment 4 : j'aime (je, mange, regarde = pièges) (pas « parle », pas « français »)

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
      astuceClavier: 'Astuce\u00a0: tu peux aussi taper les mots au clavier.',
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
      fin: 'Souvenir reconstitué. Tu sais maintenant dire ce que tu manges. Ce que tu ne manges pas… ça viendra.',
      // ---- 🆕 fragment 2 : un/une, le/la ----
      intro2: 'Un autre morceau du souvenir. Elle mange toujours. Mais écoute bien\u00a0: le petit mot devant «\u00a0sandwich\u00a0» a changé.',
      fin2: 'Deuxième morceau récupéré. Une chose qu’on découvre, la même chose qu’on connaît\u00a0: tu fais maintenant la différence. Il y a d’autres morceaux.',
      sens_le: 'le (mot masculin\u00a0: la chose dont on parle)', sens_la: 'la (mot féminin\u00a0: la chose dont on parle)', sens_pizza: 'pizza (comme en anglais)',
      tr_sandwichle: '', tr_poutinela: '', tr_pizzaune: '', tr_pizzala: '',
      noteL_titre: 'Remarque',
      noteL: '«\u00a0un\u00a0» et «\u00a0une\u00a0»\u00a0: une chose nouvelle, parmi d’autres. «\u00a0le\u00a0» et «\u00a0la\u00a0»\u00a0: la chose dont on parle, celle qu’on connaît déjà. Masculin\u00a0: un → le. Féminin\u00a0: une → la.',
      c_nouveau: 'Quelque chose de nouveau apparaît. Construis la phrase.',
      c_connu: 'C’est la même chose, mais tu la connais déjà. Construis la phrase.',
      quipNouveau: 'Une chose nouvelle apparaît\u00a0: on dit «\u00a0un\u00a0» ou «\u00a0une\u00a0».',
      quipConnu: 'La même chose, maintenant connue\u00a0: on dit «\u00a0le\u00a0» ou «\u00a0la\u00a0».',
      quipLe: 'Masculin, donc «\u00a0le\u00a0». Pas «\u00a0la\u00a0».',
      quipLa: 'Féminin, donc «\u00a0la\u00a0». Pas «\u00a0le\u00a0».',
      quipDef: 'On parle d’une chose qu’on connaît déjà\u00a0: «\u00a0le\u00a0» ou «\u00a0la\u00a0», pas «\u00a0un\u00a0» ni «\u00a0une\u00a0».',
      quipIndef: 'Une chose nouvelle\u00a0: «\u00a0un\u00a0» ou «\u00a0une\u00a0», pas «\u00a0le\u00a0» ni «\u00a0la\u00a0».',
      quipUne2: 'Féminin\u00a0: «\u00a0une\u00a0», pas «\u00a0un\u00a0». Même règle que tout à l’heure.',
      quipUn2: 'Masculin\u00a0: «\u00a0un\u00a0», pas «\u00a0une\u00a0». Même règle que tout à l’heure.',
      quipLeSandwich: 'Le sandwich. Celui qu’elle connaît très bien, maintenant.',
      quipLaPoutine: 'La poutine. On ne l’a pas oubliée, celle-là. Dommage.',
      quipPizza: 'Une pizza. Là, au moins, personne ne se dispute.',
      cult_pizza: 'Le mot «\u00a0pizza\u00a0» vient de l’italien. En français, il est féminin\u00a0: une pizza, la pizza.',
      // ---- 🆕 (07-11-2026) fragment 3 : le/la ; fragment 4 : je joue ----
      sens_joue: 'jouer (moi)',
      tr_regpoutinela: '', tr_regsandwichle: '', tr_jejoue: '',
      quipRegPoutineLa: 'La poutine. Toujours regardée, jamais mangée. Elle a des principes.',
      quipRegSandwichLe: 'Le même sandwich. Elle le connaît, maintenant. Elle ne le mange toujours pas.',
      quipJeJoue: 'Avec «\u00a0je\u00a0», le verbe perd son -r\u00a0: jouer → joue. Comme mange, comme regarde.',
      // ---- 🆕 quitter / reprendre ----
      reprise: 'On reprend là où on s’était arrêtés. Moi, je n’ai rien oublié.',
      quitter_titre: 'Quitter et continuer plus tard\u00a0?', quitter_info: 'Ta progression est gardée.', quitter_oui: 'Quitter', quitter_non: 'Rester',
      retour_etape: 'Revenir en arrière',
      // ---- 🆕 fragment 5 : la réparation ----
      intro5: 'Les quatre morceaux sont là. Il reste à les assembler, seul. Je ne dirai rien. Enfin, presque rien.',
      fin5: 'Souvenir réparé. Quatre morceaux, six phrases, un peu de poutine. Ça aurait pu être pire.',
      // ---- 🆕 (08-11-2026) fragment 6 : l'épreuve (textes fr + en + ja ; les autres langues retombent sur l'anglais) ----
      intro6: 'Dernier morceau du souvenir. Cette fois, personne ne te tient la main. Il y a des choses que seul un humain peut faire\u00a0: écouter, écrire, se rappeler. Il faut s’y habituer. Ce n’est pas ici que ça compte… mais ce que tu écris sera noté.',
      fin6: 'Dernier morceau récupéré. Le souvenir est entier. Ce que tu as écrit est gardé. Pour la suite… on verra.',
      c_dictee: 'Écoute, puis écris ce que tu entends. La liste de mots est une aide\u00a0: tu ne peux pas la toucher.',
      liste_mots: 'Mots à ta disposition',
      c_aimeq: 'Tu es Bek. Qu’est-ce que tu aimes faire\u00a0? Écris une phrase complète.',
      lec_certif: 'Maintenant, des questions sur Bek. Pour y répondre, il faut te rappeler ce que tu as appris d’elle. Rien à choisir\u00a0: on a besoin de toi pour le certifier. Tu peux te tromper. Mais ça pourrait avoir des conséquences plus tard.',
      c_certif1: 'Dans les souvenirs que tu as réparés, quelles choses Bek mange-t-elle\u00a0? Écris-les avec «\u00a0un\u00a0» ou «\u00a0une\u00a0».',
      quipNote: 'Noté. Je ne te dis pas si c’est juste. Un humain doit s’habituer à ça.',
      lec_libre: 'Celle-ci n’a ni bonne ni mauvaise réponse. Un professeur pourrait la lire. Tu peux copier ta réponse.',
      c_libre: 'Maintenant, toi\u00a0: qu’aimes-tu faire\u00a0? Réponds avec deux phrases complètes.',
      passer: 'Passer', quipLibre: 'Merci. C’est gardé.',
      copier: 'Copier', copie: 'Copié\u00a0!', toutCopier: 'Tout copier', recap_titre: 'Tes réponses',
      lec_defi: 'Un dernier défi. Aucun indice. Si tu réussis, ça comptera. Si tu échoues, ça comptera aussi.',
      c_defi1: 'Défi (1/2). Voici un verbe. Conjugue-le avec «\u00a0je\u00a0», au présent.',
      sens_etudier: 'apprendre en travaillant',
      c_defi2: 'Défi (2/2). Combine «\u00a0étudier\u00a0» avec «\u00a0aimer\u00a0», avec «\u00a0je\u00a0». Écris une phrase.',
      presqueAccent: 'Accepté. Mais regarde les accents.', presqueApostrophe: 'Accepté. Mais n’oublie pas l’apostrophe.',
      quipEchec: 'Pas cette fois. C’est noté. On continue.',
      c_rep: 'Le souvenir est abîmé. Répare-le\u00a0: place chaque mot dans sa case, de gauche à droite.',
      tr_aimepizza: '',
      repApres1: 'Un film. Elle a donc des goûts, au moins.',
      repApres3: 'J’aime la pizza. Un avis tranché, enfin.',
      repApres5: 'Plus qu’une phrase. Tu devines laquelle.',
      // ---- 🆕 fragment 4 : j'aime ----
      intro4: 'Un autre morceau du souvenir. Cette fois, elle parle de ce qu’elle aime. Tu vas voir, c’est touchant.',
      fin4: 'Quatrième morceau récupéré. Tu sais dire ce que tu manges, ce que tu regardes et ce que tu aimes. Le souvenir prend forme.',
      sens_j: 'moi («\u00a0je\u00a0» devant une voyelle)', sens_aime: 'aimer (moi)', sens_manger: 'manger (la forme de base)', sens_regarder: 'regarder (la forme de base)', sens_jouer: 'jouer (la forme de base)', sens_tele: 'télé (télévision)',
      tr_aimepoutine: '', tr_aimemanger: '', tr_aimetele: '', tr_aimejouer: '', tr_aimeregpoutine: '', tr_aimemangerpoutine: '',
      noteJ_titre: 'Remarque',
      noteJ: '«\u00a0je\u00a0» devant une voyelle devient «\u00a0j’\u00a0»\u00a0: je + aime → j’aime. Devant une consonne, rien ne change\u00a0: je mange. Ça arrive aussi avec d’autres petits mots, comme «\u00a0le\u00a0» et «\u00a0la\u00a0».',
      noteI_titre: 'Remarque',
      noteI: 'Après «\u00a0aimer\u00a0», le verbe reste à sa forme de base\u00a0: l’infinitif. Il se termine par -er\u00a0: mang-er, regard-er, jou-er. C’est le verbe sans «\u00a0je\u00a0».',
      quipJe: 'Devant «\u00a0aime\u00a0», «\u00a0je\u00a0» devient «\u00a0j’\u00a0». Une voyelle, ça se respecte.',
      quipInf: 'Après «\u00a0j’aime\u00a0», le verbe garde sa forme de base\u00a0: -er, pas -e.',
      quipApostrophe: 'Presque\u00a0! N’oublie pas l’apostrophe.',
      quipAimePoutine: 'Elle aime la poutine. Cela se voit à son enthousiasme. Enfin, cela se devine.',
      quipAimeManger: 'Manger. Voilà une constante chez elle.',
      quipAimeJouer: 'Jouer. À quoi\u00a0? Elle ne le dit pas. Un mystère de plus.',
      quipAimeRegPoutine: 'Regarder la poutine. On y revient. Toujours aussi contemplatif.',
      cult_tele: 'Au Québec comme en France, on dit surtout «\u00a0la télé\u00a0». C’est l’abréviation de «\u00a0télévision\u00a0», un mot féminin.',
      // ---- 🆕 fragment 3 (anciennement 2) : « regarder » ----
      intro3: 'Un autre morceau du même souvenir. Cette fois, elle ne mange pas. Elle regarde. Nuance.',
      finSuite: 'Premier morceau récupéré. Le souvenir n’est pas encore entier. Il y en a d’autres.',
      fin3: 'Troisième morceau récupéré. Tu sais maintenant dire ce que tu regardes et ce que tu manges. Ne confonds pas les deux.',
      sens_regarde: 'regarder (moi)', sens_film: 'film',
      tr_regarde: '', tr_film: '', tr_regpoutine: '', tr_regsandwich: '',
      noteR_titre: 'Remarque',
      noteR: 'Encore un verbe en -er\u00a0: je regard-e. Et on regarde quelque chose directement\u00a0: pas de petit mot entre le verbe et ce qu’on regarde.',
      quipFilm: 'Un film. Enfin quelque chose de sensé.',
      quipRegPoutine: 'Regarder une poutine. Voilà qui est… contemplatif.',
      quipRegSandwich: 'Elle regarde le sandwich. Elle a faim, mais elle patiente. Admirable.',
      quipVerbe: 'Elle ne mange pas. Elle regarde. Le verbe compte.',
      quipFilmMange: 'Manger un film. Original. Mais non.',
      quipUn: 'Un film, pas «\u00a0une\u00a0». Le mot est masculin.',
      cult_film: 'Le mot «\u00a0film\u00a0» vient de l’anglais, où il désignait une mince pellicule. En français, il est masculin\u00a0: un film.'
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
      astuceClavier: 'Tip: you can also type the words on your keyboard.',
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
      fin: 'Memory restored. You can now say what you eat. What you don’t eat… that will come.',
      // ---- 🆕 fragment 2: a/an and the ----
      intro2: 'Another piece of the memory. She’s still eating. But listen closely: the little word in front of “sandwich” has changed.',
      fin2: 'Second piece recovered. A new thing, the same thing once you know it: you can now tell the difference. There are more pieces.',
      sens_le: 'the (masculine word: the thing we’re talking about)', sens_la: 'the (feminine word: the thing we’re talking about)', sens_pizza: 'pizza',
      tr_sandwichle: 'I eat the sandwich.', tr_poutinela: 'I eat the poutine.', tr_pizzaune: 'I eat a pizza.', tr_pizzala: 'I eat the pizza.',
      noteL_titre: 'Note',
      noteL: '“un” and “une”: something new, one among others. “le” and “la”: the thing we’re talking about, the one we already know. Masculine: un → le. Feminine: une → la.',
      c_nouveau: 'Something new appears. Build the sentence.',
      c_connu: 'It’s the same thing, but now you know it. Build the sentence.',
      quipNouveau: 'A new thing appears: we say “un” or “une”.',
      quipConnu: 'The same thing, now known: we say “le” or “la”.',
      quipLe: 'Masculine, so “le”. Not “la”.',
      quipLa: 'Feminine, so “la”. Not “le”.',
      quipDef: 'We’re talking about something we already know: “le” or “la”, not “un” or “une”.',
      quipIndef: 'Something new: “un” or “une”, not “le” or “la”.',
      quipUne2: 'Feminine: “une”, not “un”. Same rule as before.',
      quipUn2: 'Masculine: “un”, not “une”. Same rule as before.',
      quipLeSandwich: 'The sandwich. The one she knows very well by now.',
      quipLaPoutine: 'The poutine. We haven’t forgotten that one. Pity.',
      quipPizza: 'A pizza. At least nobody argues about that one.',
      cult_pizza: 'The word “pizza” comes from Italian. In French it is feminine: une pizza, la pizza.',
      // ---- 🆕 (07-11-2026) fragment 3: le/la; fragment 4: je joue ----
      sens_joue: 'play (I play)',
      tr_regpoutinela: 'I watch the poutine.', tr_regsandwichle: 'I watch the sandwich.', tr_jejoue: 'I play.',
      quipRegPoutineLa: 'The poutine. Still watched, never eaten. She has principles.',
      quipRegSandwichLe: 'The same sandwich. She knows it by now. She still isn’t eating it.',
      quipJeJoue: 'With “je”, the verb loses its -r: jouer → joue. Like mange, like regarde.',
      // ---- 🆕 leave / resume ----
      reprise: 'Picking up where we left off. I haven’t forgotten anything, you’ll notice.',
      quitter_titre: 'Leave and continue later?', quitter_info: 'Your progress is saved.', quitter_oui: 'Leave', quitter_non: 'Stay',
      retour_etape: 'Go back',
      // ---- 🆕 fragment 5: the repair ----
      intro5: 'All four pieces are here. Now to put them together, on your own. I won’t say anything. Well, almost nothing.',
      fin5: 'Memory repaired. Four pieces, six sentences, a little poutine. It could have been worse.',
      // ---- 🆕 (08-11-2026) fragment 6: the test ----
      intro6: 'Last piece of the memory. This time, nobody is holding your hand. Some things only a human can do: listen, write, remember. You need to get used to that. It doesn’t count here… but what you write will be recorded.',
      fin6: 'Last piece recovered. The memory is whole. What you wrote is kept. As for what comes next… we’ll see.',
      c_dictee: 'Listen, then write what you hear. The word list is a help: you can’t tap it.',
      liste_mots: 'Words you can use',
      c_aimeq: 'You are Bek. What do you like doing? Write a full sentence.',
      lec_certif: 'Now, questions about Bek. To answer them, you have to remember what you learned about her. Nothing to pick from: we need you to certify it. You may get it wrong. But it could have consequences later.',
      c_certif1: 'In the memories you repaired, what things does Bek eat? Write them with “un” or “une”.',
      quipNote: 'Noted. I won’t tell you if it’s right. A human has to get used to that.',
      lec_libre: 'This one has no right or wrong answer. A teacher might read it. You can copy your answer.',
      c_libre: 'Now, you: what do you like doing? Answer with two full sentences.',
      passer: 'Skip', quipLibre: 'Thank you. It’s kept.',
      copier: 'Copy', copie: 'Copied!', toutCopier: 'Copy all', recap_titre: 'Your answers',
      lec_defi: 'One last challenge. No hints. If you succeed, it counts. If you fail, that counts too.',
      c_defi1: 'Challenge (1/2). Here is a verb. Conjugate it with “je”, in the present tense.',
      sens_etudier: 'to study',
      c_defi2: 'Challenge (2/2). Combine “étudier” with “aimer”, with “je”. Write a sentence.',
      presqueAccent: 'Accepted. But look at the accents.', presqueApostrophe: 'Accepted. But don’t forget the apostrophe.',
      quipEchec: 'Not this time. It’s noted. Moving on.',
      c_rep: 'The memory is damaged. Repair it: place each word in its slot, from left to right.',
      tr_aimepizza: 'I like pizza.',
      repApres1: 'A film. So she has tastes, at least.',
      repApres3: 'I like pizza. A firm opinion, at last.',
      repApres5: 'One sentence left. You can guess which one.',
      // ---- 🆕 fragment 4: j'aime ----
      intro4: 'Another piece of the memory. This time she’s talking about what she likes. You’ll see, it’s touching.',
      fin4: 'Fourth piece recovered. You can say what you eat, what you watch and what you like. The memory is taking shape.',
      sens_j: 'I (“je” before a vowel)', sens_aime: 'like / love', sens_manger: 'to eat (basic form)', sens_regarder: 'to watch (basic form)', sens_jouer: 'to play (basic form)', sens_tele: 'TV (short for télévision)',
      tr_aimepoutine: 'I like poutine.', tr_aimemanger: 'I like to eat.', tr_aimetele: 'I like watching TV.', tr_aimejouer: 'I like to play.', tr_aimeregpoutine: 'I like watching poutine.', tr_aimemangerpoutine: 'I like eating poutine.',
      noteJ_titre: 'Note',
      noteJ: '“je” before a vowel becomes “j’”: je + aime → j’aime. Before a consonant nothing changes: je mange. It happens with other little words too, like “le” and “la”.',
      noteI_titre: 'Note',
      noteI: 'After “aimer”, the verb stays in its basic form: the infinitive. It ends in -er: mang-er, regard-er, jou-er. It’s the verb without “je”.',
      quipJe: 'Before “aime”, “je” becomes “j’”. Vowels deserve respect.',
      quipInf: 'After “j’aime”, the verb keeps its basic form: -er, not -e.',
      quipApostrophe: 'Almost! Don’t forget the apostrophe.',
      quipAimePoutine: 'She likes poutine. You can tell from her enthusiasm. Well, you can guess.',
      quipAimeManger: 'Eating. A constant with her.',
      quipAimeJouer: 'Playing. At what? She doesn’t say. One more mystery.',
      quipAimeRegPoutine: 'Looking at poutine. We’re back to this. Still contemplative.',
      cult_tele: 'In Quebec as in France, people mostly say “la télé”. It’s short for “télévision”, a feminine word.',
      // ---- 🆕 fragment 3 (formerly 2): “regarder” ----
      intro3: 'Another piece of the same memory. This time she isn’t eating. She’s looking. Nuance.',
      finSuite: 'First piece recovered. The memory isn’t whole yet. There are more.',
      fin3: 'Third piece recovered. You can now say what you watch and what you eat. Don’t mix them up.',
      sens_regarde: 'look at / watch', sens_film: 'film, movie',
      tr_regarde: 'I look. / I watch.', tr_film: 'I watch a movie.', tr_regpoutine: 'I look at a poutine.', tr_regsandwich: 'I look at a sandwich.',
      noteR_titre: 'Note',
      noteR: 'Another -er verb: je regard-e. And you “regarde” something directly: no little word between the verb and what you look at. Not “at”.',
      quipFilm: 'A movie. Finally, something sensible.',
      quipRegPoutine: 'Looking at a poutine. How… contemplative.',
      quipRegSandwich: 'She’s looking at the sandwich. She’s hungry, but she’s waiting. Admirable.',
      quipVerbe: 'She isn’t eating. She’s looking. The verb matters.',
      quipFilmMange: 'Eating a movie. Original. But no.',
      quipUn: '“Un film”, not “une”. The word is masculine.',
      cult_film: 'The word “film” comes from English, where it meant a thin layer. In French it is masculine: un film.'
    },  // ---- 🆕 (03-11-2026) autres langues : mêmes 20 langues que le menu ----
    es: {
      titre: 'Primer recuerdo',
      retour_etape: 'Volver atrás',
      quitter: 'Salir del recuerdo',
      son: 'Sonido',
      suite: 'Siguiente',
      continuer: 'Continuar',
      valider: 'Comprobar',
      intro: 'Listo. Este recuerdo está un poco dañado, pero deberíamos poder sacarle algunas palabras.',
      c_mange: 'Toca las palabras para oírlas.',
      c_lire: 'Toca las palabras para oírlas y ver qué significan.',
      c_ordre: 'El recuerdo se desvanece… Pon las palabras en orden.',
      c_ecrire_part: 'Completa las palabras que faltan.',
      c_ecrire: 'Escribe la frase en francés.',
      c_image: 'Eres Bek. ¿Qué haces ahora?',
      c_audio: 'Escucha y elige las palabras correctas.',
      reecouter: 'Volver a escuchar',
      sans_son: 'No oigo nada',
      construire_vide: 'Toca las palabras para construir tu frase.',
      role_s: 'sujeto',
      role_v: 'verbo',
      role_o: 'objeto',
      genre_m: 'masculino',
      genre_f: 'femenino',
      noteE_titre: 'Observación',
      noteE: 'Después de «je», los verbos en -er terminan en -e. Esa -e no se oye.',
      tr_mange: 'Yo como.',
      tr_sandwich: 'Yo como un sándwich.',
      tr_poutine: 'Yo como una poutine.',
      tr_parle: 'Yo hablo francés.',
      sens_je: 'yo',
      sens_mange: 'comer',
      sens_parle: 'hablar',
      sens_un: 'un (palabra masculina)',
      sens_une: 'una (palabra femenina)',
      sens_sandwich: 'sándwich',
      sens_poutine: 'poutine (patatas fritas, queso en grano y salsa)',
      sens_francais: 'el idioma francés',
      quipErreur: ['Casi. Que, en francés como en cualquier idioma, significa «no».', 'Tómate tu tiempo. Yo tengo todo el mío.', 'Interesante. Pero no.'],
      astuceClavier: 'Truco: tambi\u00e9n puedes escribir las palabras con el teclado.',
      quipOk: ['Eso es.', 'Exacto.', 'Nada mal.', 'Vamos avanzando.'],
      quipUne: 'Una poutine, no «un». La gramática decide, no tú.',
      quipPoutine: 'Fíjate en su entusiasmo. Lo digo y no lo digo.',
      quipSandwich: 'Parece que disfruta de su sándwich. Recuérdalo.',
      quipReponse: 'Aquí está la respuesta. No se lo cuentes a nadie.',
      quipAccent: '¡Casi! Mira los acentos.',
      quipSansSon: '¿Sin sonido? Aquí tienes el texto. No diré nada.',
      cult_titre: '¿Sabías que…?',
      cult_sandwich: 'Según la leyenda, la palabra «sandwich» viene de un conde inglés que comía la carne entre dos rebanadas de pan para no dejar su partida de cartas.',
      cult_poutine: 'La poutine son patatas fritas, queso en grano (que «chirría» entre los dientes) y salsa oscura. Nació en Quebec a finales de los años 1950, y varios pueblos se disputan el honor.',
      fin: 'Recuerdo reconstruido. Ya sabes decir lo que comes. Lo que no comes… ya llegará.'
    },
    it: {
      titre: 'Primo ricordo',
      retour_etape: 'Torna indietro',
      quitter: 'Esci dal ricordo',
      son: 'Audio',
      suite: 'Avanti',
      continuer: 'Continua',
      valider: 'Verifica',
      intro: 'Ecco. Questo ricordo è un po’ rovinato, ma dovremmo riuscire a ricavarne qualche parola.',
      c_mange: 'Tocca le parole per ascoltarle.',
      c_lire: 'Tocca le parole per ascoltarle e vederne il significato.',
      c_ordre: 'Il ricordo sbiadisce… Rimetti le parole in ordine.',
      c_ecrire_part: 'Completa le parole mancanti.',
      c_ecrire: 'Scrivi la frase in francese.',
      c_image: 'Sei Bek. Che cosa fai adesso?',
      c_audio: 'Ascolta, poi scegli le parole giuste.',
      reecouter: 'Riascolta',
      sans_son: 'Non sento niente',
      construire_vide: 'Tocca le parole per costruire la tua frase.',
      role_s: 'soggetto',
      role_v: 'verbo',
      role_o: 'oggetto',
      genre_m: 'maschile',
      genre_f: 'femminile',
      noteE_titre: 'Nota',
      noteE: 'Dopo «je», i verbi in -er finiscono in -e. Questa -e non si sente.',
      tr_mange: 'Io mangio.',
      tr_sandwich: 'Io mangio un panino.',
      tr_poutine: 'Io mangio una poutine.',
      tr_parle: 'Io parlo francese.',
      sens_je: 'io',
      sens_mange: 'mangiare',
      sens_parle: 'parlare',
      sens_un: 'un (parola maschile)',
      sens_une: 'una (parola femminile)',
      sens_sandwich: 'panino',
      sens_poutine: 'poutine (patatine, formaggio in grani e salsa)',
      sens_francais: 'la lingua francese',
      quipErreur: ['Quasi. Che, in francese come altrove, vuol dire «no».', 'Prenditi il tuo tempo. Io ho tutto il mio.', 'Interessante. Ma no.'],
      astuceClavier: 'Suggerimento: puoi anche digitare le parole con la tastiera.',
      quipOk: ['Ecco.', 'Esatto.', 'Niente male.', 'Stiamo facendo progressi.'],
      quipUne: 'Una poutine, non «un». Decide la grammatica, non tu.',
      quipPoutine: 'Nota il suo entusiasmo. Io lo dico, ma non dico niente.',
      quipSandwich: 'Sembra apprezzare molto il suo panino. Ricordalo.',
      quipReponse: 'Ecco la risposta. Non dirlo a nessuno.',
      quipAccent: 'Quasi! Guarda gli accenti.',
      quipSansSon: 'Niente audio? Ecco il testo. Non dirò nulla.',
      cult_titre: 'Lo sapevi?',
      cult_sandwich: 'Secondo la leggenda, la parola «sandwich» viene da un conte inglese che mangiava la carne tra due fette di pane per non lasciare la sua partita a carte.',
      cult_poutine: 'La poutine è fatta di patatine fritte, formaggio in grani (che «cigola» sotto i denti) e salsa scura. È nata in Québec alla fine degli anni ’50, e più paesi se ne contendono il merito.',
      fin: 'Ricordo ricostruito. Ora sai dire che cosa mangi. Quello che non mangi… arriverà.'
    },
    pt: {
      titre: 'Primeira lembrança',
      retour_etape: 'Voltar',
      quitter: 'Sair da lembrança',
      son: 'Som',
      suite: 'Próximo',
      continuer: 'Continuar',
      valider: 'Verificar',
      intro: 'Pronto. Esta lembrança está meio danificada, mas devemos conseguir tirar algumas palavras dela.',
      c_mange: 'Toque nas palavras para ouvi-las.',
      c_lire: 'Toque nas palavras para ouvi-las e ver o que significam.',
      c_ordre: 'A lembrança está se apagando… Coloque as palavras em ordem.',
      c_ecrire_part: 'Complete as palavras que faltam.',
      c_ecrire: 'Escreva a frase em francês.',
      c_image: 'Você é a Bek. O que você está fazendo agora?',
      c_audio: 'Escute e escolha as palavras certas.',
      reecouter: 'Ouvir de novo',
      sans_son: 'Não estou ouvindo nada',
      construire_vide: 'Toque nas palavras para montar a sua frase.',
      role_s: 'sujeito',
      role_v: 'verbo',
      role_o: 'objeto',
      genre_m: 'masculino',
      genre_f: 'feminino',
      noteE_titre: 'Observação',
      noteE: 'Depois de “je”, os verbos em -er terminam em -e. Esse -e não se ouve.',
      tr_mange: 'Eu como.',
      tr_sandwich: 'Eu como um sanduíche.',
      tr_poutine: 'Eu como uma poutine.',
      tr_parle: 'Eu falo francês.',
      sens_je: 'eu',
      sens_mange: 'comer',
      sens_parle: 'falar',
      sens_un: 'um (palavra masculina)',
      sens_une: 'uma (palavra feminina)',
      sens_sandwich: 'sanduíche',
      sens_poutine: 'poutine (batata frita, queijo em grãos e molho)',
      sens_francais: 'a língua francesa',
      quipErreur: ['Quase. O que, em francês como em qualquer língua, quer dizer “não”.', 'Fique à vontade. Eu tenho todo o meu tempo.', 'Interessante. Mas não.'],
      astuceClavier: 'Dica: voc\u00ea tamb\u00e9m pode digitar as palavras no teclado.',
      quipOk: ['Isso.', 'Exato.', 'Nada mal.', 'Estamos progredindo.'],
      quipUne: 'Uma poutine, não “un”. Quem decide é a gramática, não você.',
      quipPoutine: 'Repare no entusiasmo dela. Eu só comentei.',
      quipSandwich: 'Ela parece gostar muito do sanduíche. Guarde isso.',
      quipReponse: 'Aqui está a resposta. Não conte para ninguém.',
      quipAccent: 'Quase! Olhe os acentos.',
      quipSansSon: 'Sem som? Aqui está o texto. Não vou dizer nada.',
      cult_titre: 'Você sabia?',
      cult_sandwich: 'Segundo a lenda, a palavra “sandwich” vem de um conde inglês que comia carne entre duas fatias de pão para não largar o jogo de cartas.',
      cult_poutine: 'A poutine é feita de batata frita, queijo em grãos (que “range” nos dentes) e molho escuro. Nasceu no Quebec no fim dos anos 1950, e várias cidades disputam essa honra.',
      fin: 'Lembrança reconstruída. Agora você sabe dizer o que come. O que você não come… isso vem depois.'
    },
    ca: {
      titre: 'Primer record',
      retour_etape: 'Torna enrere',
      quitter: 'Surt del record',
      son: 'So',
      suite: 'Següent',
      continuer: 'Continua',
      valider: 'Comprova',
      intro: 'Ja està. Aquest record està una mica malmès, però hauríem de poder-ne treure algunes paraules.',
      c_mange: 'Toca les paraules per sentir-les.',
      c_lire: 'Toca les paraules per sentir-les i veure què signifiquen.',
      c_ordre: 'El record s’esvaeix… Posa les paraules en ordre.',
      c_ecrire_part: 'Completa les paraules que falten.',
      c_ecrire: 'Escriu la frase en francès.',
      c_image: 'Ets la Bek. Què fas ara?',
      c_audio: 'Escolta i tria les paraules correctes.',
      reecouter: 'Torna a escoltar',
      sans_son: 'No sento res',
      construire_vide: 'Toca les paraules per construir la teva frase.',
      role_s: 'subjecte',
      role_v: 'verb',
      role_o: 'objecte',
      genre_m: 'masculí',
      genre_f: 'femení',
      noteE_titre: 'Observació',
      noteE: 'Després de «je», els verbs en -er acaben en -e. Aquesta -e no se sent.',
      tr_mange: 'Jo menjo.',
      tr_sandwich: 'Jo menjo un entrepà.',
      tr_poutine: 'Jo menjo una poutine.',
      tr_parle: 'Jo parlo francès.',
      sens_je: 'jo',
      sens_mange: 'menjar',
      sens_parle: 'parlar',
      sens_un: 'un (paraula masculina)',
      sens_une: 'una (paraula femenina)',
      sens_sandwich: 'entrepà',
      sens_poutine: 'poutine (patates fregides, formatge en grans i salsa)',
      sens_francais: 'la llengua francesa',
      quipErreur: ['Gairebé. Que, en francès com a tot arreu, vol dir «no».', 'Pren-te el teu temps. Jo tinc tot el meu.', 'Interessant. Però no.'],
      astuceClavier: 'Truc: tamb\u00e9 pots escriure les paraules amb el teclat.',
      quipOk: ['Això.', 'Exacte.', 'Gens malament.', 'Anem avançant.'],
      quipUne: 'Una poutine, no «un». Decideix la gramàtica, no tu.',
      quipPoutine: 'Fixa’t en el seu entusiasme. Ho dic i no ho dic.',
      quipSandwich: 'Sembla que gaudeix de l’entrepà. Recorda-ho.',
      quipReponse: 'Aquí tens la resposta. No ho expliquis a ningú.',
      quipAccent: 'Gairebé! Mira els accents.',
      quipSansSon: 'Sense so? Aquí tens el text. No diré res.',
      cult_titre: 'Ho sabies?',
      cult_sandwich: 'Segons la llegenda, la paraula «sandwich» ve d’un comte anglès que menjava la carn entre dues llesques de pa per no deixar la seva partida de cartes.',
      cult_poutine: 'La poutine és feta de patates fregides, formatge en grans (que «grinyola» entre les dents) i salsa fosca. Va néixer al Quebec a finals dels anys cinquanta, i diversos pobles se’n disputen l’honor.',
      fin: 'Record reconstruït. Ara saps dir què menges. El que no menges… ja arribarà.'
    },
    eo: {
      titre: 'Unua memoraĵo',
      retour_etape: 'Reen',
      quitter: 'Forlasi la memoraĵon',
      son: 'Sono',
      suite: 'Sekva',
      continuer: 'Daŭrigi',
      valider: 'Kontroli',
      intro: 'Jen. Ĉi tiu memoraĵo estas iom difektita, sed ni devus povi eltiri el ĝi kelkajn vortojn.',
      c_mange: 'Tuŝu la vortojn por aŭdi ilin.',
      c_lire: 'Tuŝu la vortojn por aŭdi ilin kaj vidi ilian signifon.',
      c_ordre: 'La memoraĵo paliĝas… Metu la vortojn en la ĝustan ordon.',
      c_ecrire_part: 'Plenigu la mankantajn vortojn.',
      c_ecrire: 'Skribu la frazon france.',
      c_image: 'Vi estas Bek. Kion vi faras nun?',
      c_audio: 'Aŭskultu, poste elektu la ĝustajn vortojn.',
      reecouter: 'Aŭskulti denove',
      sans_son: 'Mi nenion aŭdas',
      construire_vide: 'Tuŝu la vortojn por konstrui vian frazon.',
      role_s: 'subjekto',
      role_v: 'verbo',
      role_o: 'objekto',
      genre_m: 'vira',
      genre_f: 'ina',
      noteE_titre: 'Rimarko',
      noteE: 'Post «je», la verboj je -er finiĝas per -e. Tiun -e oni ne aŭdas.',
      tr_mange: 'Mi manĝas.',
      tr_sandwich: 'Mi manĝas sandviĉon.',
      tr_poutine: 'Mi manĝas poutinon.',
      tr_parle: 'Mi parolas la francan.',
      sens_je: 'mi',
      sens_mange: 'manĝi',
      sens_parle: 'paroli',
      sens_un: 'unu (vira vorto)',
      sens_une: 'unu (ina vorto)',
      sens_sandwich: 'sandviĉo',
      sens_poutine: 'poutino (fritoj, fromaĝeroj kaj saŭco)',
      sens_francais: 'la franca lingvo',
      quipErreur: ['Preskaŭ. Kio, france kiel aliloke, signifas «ne».', 'Prenu vian tempon. Mi havas la tutan mian.', 'Interese. Sed ne.'],
      astuceClavier: 'Konsileto: vi anka\u016d povas tajpi la vortojn per la klavaro.',
      quipOk: ['Jen.', 'Ĝuste.', 'Tute ne malbone.', 'Ni progresas.'],
      quipUne: '«une» poutino, ne «un». La gramatiko decidas, ne vi.',
      quipPoutine: 'Rimarku ŝian entuziasmon. Mi nur diras.',
      quipSandwich: 'Ŝi ŝajnas multe ŝati sian sandviĉon. Memoru tion.',
      quipReponse: 'Jen la respondo. Ne diru tion al neniu.',
      quipAccent: 'Preskaŭ! Rigardu la supersignojn.',
      quipSansSon: 'Neniu sono? Jen la teksto. Mi diros nenion.',
      cult_titre: 'Ĉu vi sciis?',
      cult_sandwich: 'Laŭ la legendo, la vorto «sandwich» devenas de angla grafo, kiu manĝis sian viandon inter du pantranĉaĵoj por ne forlasi sian kartludon.',
      cult_poutine: 'Poutine konsistas el fritoj, fromaĝeroj (kiuj «knaras» sub la dentoj) kaj bruna saŭco. Ĝi naskiĝis en Kebekio fine de la 1950-aj jaroj, kaj pluraj vilaĝoj disputas pri la honoro.',
      fin: 'Memoraĵo rekonstruita. Nun vi scias diri, kion vi manĝas. Kion vi ne manĝas… tio venos poste.'
    },
    zh: {
      titre: '第一段记忆',
      retour_etape: '返回上一步',
      quitter: '离开这段记忆',
      son: '声音',
      suite: '下一步',
      continuer: '继续',
      valider: '检查',
      intro: '好了。这段记忆有点受损，但我们应该能从中找出几个词。',
      c_mange: '点一点这些词，听听它们的发音。',
      c_lire: '点一点这些词，听发音，看意思。',
      c_ordre: '记忆正在消退……请把词按顺序放回去。',
      c_ecrire_part: '把缺少的词补上。',
      c_ecrire: '请用法语写出这句话。',
      c_image: '你是 Bek。你现在在做什么？',
      c_audio: '先听，再选出正确的词。',
      reecouter: '再听一遍',
      sans_son: '我听不到声音',
      construire_vide: '点一点下面的词，组成你的句子。',
      role_s: '主语',
      role_v: '动词',
      role_o: '宾语',
      genre_m: '阳性',
      genre_f: '阴性',
      noteE_titre: '小提示',
      noteE: '跟在 “je” 后面，以 -er 结尾的动词要以 -e 结尾。这个 -e 不发音。',
      tr_mange: '我吃。',
      tr_sandwich: '我吃一个三明治。',
      tr_poutine: '我吃一份肉汁奶酪薯条。',
      tr_parle: '我说法语。',
      sens_je: '我',
      sens_mange: '吃',
      sens_parle: '说',
      sens_un: '一个（阳性词）',
      sens_une: '一个（阴性词）',
      sens_sandwich: '三明治',
      sens_poutine: '肉汁奶酪薯条（薯条、奶酪粒和肉汁）',
      sens_francais: '法语',
      quipErreur: ['差一点。而“差一点”，在法语里和别处一样，意思是“不对”。', '慢慢来。我的时间多得很。', '有意思。但不对。'],
      astuceClavier: '\u5c0f\u63d0\u793a\uff1a\u4f60\u4e5f\u53ef\u4ee5\u7528\u952e\u76d8\u8f93\u5165\u8fd9\u4e9b\u8bcd\u3002',
      quipOk: ['对了。', '没错。', '相当不错。', '有进步。'],
      quipUne: '是 “une” poutine，不是 “un”。由语法决定，不由你决定。',
      quipPoutine: '注意看她的热情。我可什么都没说。',
      quipSandwich: '她好像很喜欢她的三明治。记住这一点。',
      quipReponse: '答案在这儿。别告诉别人。',
      quipAccent: '差一点！看看重音符号。',
      quipSansSon: '没有声音？文字在这儿。我什么都不说。',
      cult_titre: '你知道吗？',
      cult_sandwich: '据说，“sandwich”这个词来自一位英国伯爵：他为了不离开牌桌，把肉夹在两片面包之间吃。',
      cult_poutine: '肉汁奶酪薯条由薯条、奶酪粒（咬下去会“吱吱”响）和棕色肉汁组成。它诞生于二十世纪五十年代末的魁北克，好几个小镇都争着说是自己的发明。',
      fin: '记忆已复原。现在你会说自己吃什么了。不吃什么……以后再说。'
    },
    ja: {
      titre: '最初の記憶',
      retour_etape: '前に戻る',
      quitter: '記憶を閉じる',
      son: 'サウンド',
      suite: '次へ',
      continuer: '続ける',
      valider: '確認',
      intro: 'さて。この記憶は少し傷んでいますが、いくつか言葉を取り出せるはずです。',
      c_mange: '言葉に触って、音を聞いてみましょう。',
      c_lire: '言葉に触って、音と意味を確かめましょう。',
      c_ordre: '記憶が消えかけています……言葉を正しい順番に並べましょう。',
      c_ecrire_part: '抜けている言葉を書きましょう。',
      c_ecrire: 'この文をフランス語で書きましょう。',
      c_image: 'あなたはBekです。今、何をしていますか？',
      c_audio: '聞いてから、正しい言葉を選びましょう。',
      reecouter: 'もう一度聞く',
      sans_son: '音が聞こえません',
      construire_vide: '言葉に触って、文を組み立てましょう。',
      role_s: '主語',
      role_v: '動詞',
      role_o: '目的語',
      genre_m: '男性',
      genre_f: '女性',
      noteE_titre: 'ポイント',
      noteE: '主語が「je」のとき、-er動詞の語尾は -e になります。この -e は発音しません。',
      tr_mange: '私は食べます。',
      tr_sandwich: '私はサンドイッチを食べます。',
      tr_poutine: '私はプーティンを食べます。',
      tr_parle: '私はフランス語を話します。',
      sens_je: '私',
      sens_mange: '食べる',
      sens_parle: '話す',
      sens_un: '一つの（男性名詞）',
      sens_une: '一つの（女性名詞）',
      sens_sandwich: 'サンドイッチ',
      sens_poutine: 'プーティン（フライドポテトに、かむと「キュッ」と鳴るチーズの粒と、茶色いソースをかけた料理）',
      sens_francais: 'フランス語',
      quipErreur: ['惜しい。フランス語でも、どの言葉でも、「惜しい」は「違う」という意味です。', 'ゆっくりどうぞ。私には時間がたっぷりあります。', '面白い答えです。でも、違います。'],
      astuceClavier: 'ヒント：キーボードで言葉を入力することもできますよ。',
      quipOk: ['はい、それです。', 'そのとおり。', 'なかなかいいですね。', '進んでいますね。'],
      quipUne: 'プーティンは「un」ではなく「une」です。決めるのは文法で、あなたではありません。',
      quipPoutine: 'あの熱意を見てください。私は何も言っていませんが。',
      quipSandwich: 'サンドイッチ、とても気に入っているみたいですね。覚えておいてください。',
      quipReponse: '答えはこちらです。誰にも言わないでください。',
      quipAccent: '惜しい！アクセント記号を見てください。',
      quipSansSon: '音が出ませんか？では、文字をどうぞ。何も言いません。',
      cult_titre: '豆知識',
      cult_sandwich: '言い伝えによると、「sandwich」という言葉は、トランプのゲームをやめずに肉をパンに挟んで食べたイギリスの伯爵に由来します。',
      cult_poutine: 'プーティンは、フライドポテト、かむと「キュッ」と鳴るチーズの粒、そして茶色いソースでできています。1950年代の終わり頃ケベックで生まれ、いくつもの町が発祥の地を名乗っています。',
      fin: '記憶がよみがえりました。これで、食べているものを言えるようになりましたね。食べないものは……それはまた今度。',
      // ---- 🆕 (08-11-2026) fragments 2 à 5, répétition et sortie : japonais ----
      // Vocabulaire : souvenir = 記憶 (comme intro/fin ci-dessus), morceau = かけら (comme memoires-textes.js), notes = ポイント.
      intro2: 'もうひとつの記憶のかけらです。まだ食べていますね。でも、よく聞いてください。「sandwich」の前の小さな言葉が変わっています。',
      fin2: '二つ目のかけらを取り戻しました。初めて出会うものと、もう知っている同じもの。その違いが分かるようになりましたね。かけらは、まだあります。',
      sens_le: 'その（男性名詞：話題になっているもの）',
      sens_la: 'その（女性名詞：話題になっているもの）',
      sens_pizza: 'ピザ（日本語とほとんど同じです）',
      tr_sandwichle: '私はそのサンドイッチを食べます。',
      tr_poutinela: '私はそのプーティンを食べます。',
      tr_pizzaune: '私はピザを食べます。',
      tr_pizzala: '私はそのピザを食べます。',
      noteL_titre: 'ポイント',
      noteL: '「un」と「une」：たくさんある中の、新しいひとつ。「le」と「la」：話題になっている、もう知っているもの。男性：un → le。女性：une → la。',
      c_nouveau: '新しいものが現れました。文を組み立てましょう。',
      c_connu: '同じものですが、もう知っていますね。文を組み立てましょう。',
      quipNouveau: '新しいものが現れたときは、「un」か「une」を使います。',
      quipConnu: '同じものでも、もう知っているときは「le」か「la」を使います。',
      quipLe: '男性名詞なので「le」です。「la」ではありません。',
      quipLa: '女性名詞なので「la」です。「le」ではありません。',
      quipDef: 'もう知っているものの話をしています。「le」か「la」で、「un」や「une」ではありません。',
      quipIndef: '新しいものなので、「un」か「une」です。「le」や「la」ではありません。',
      quipUne2: '女性名詞なので「une」です。「un」ではありません。さっきと同じ決まりです。',
      quipUn2: '男性名詞なので「un」です。「une」ではありません。さっきと同じ決まりです。',
      quipLeSandwich: 'そのサンドイッチ。今ではすっかりおなじみです。',
      quipLaPoutine: 'そのプーティン。忘れられてはいませんでしたね。残念です。',
      quipPizza: 'ピザ。これなら、誰も文句を言いません。',
      cult_pizza: '「pizza」という言葉はイタリア語から来ています。フランス語では女性名詞で、une pizza、la pizza と言います。',
      sens_joue: '遊ぶ',
      tr_regpoutinela: '私はそのプーティンを見ます。',
      tr_regsandwichle: '私はそのサンドイッチを見ます。',
      tr_jejoue: '私は遊びます。',
      quipRegPoutineLa: 'そのプーティン。見るだけで、食べません。彼女なりのこだわりです。',
      quipRegSandwichLe: '同じサンドイッチです。もう知っているのに、やっぱり食べません。',
      quipJeJoue: '「je」のときは、動詞の最後の -r がなくなります。jouer → joue。mange や regarde と同じです。',
      reprise: '中断したところから続けましょう。私は何も忘れていませんよ。',
      quitter_titre: 'やめて、あとで続けますか？',
      quitter_info: '進み具合は保存されます。',
      quitter_oui: 'やめる',
      quitter_non: '続ける',
      intro5: '四つのかけらがそろいました。あとは、ひとりで組み立てるだけです。私は何も言いません。……ほとんど、ですが。',
      fin5: '記憶が直りました。かけら四つ、文六つ、そして少しのプーティン。これでも、まだましなほうです。',
      c_rep: '記憶が傷んでいます。直しましょう。言葉をひとつずつ、左から順に枠に入れてください。',
      tr_aimepizza: 'ピザが好きです。',
      repApres1: '映画ですか。少なくとも、好みはあるようです。',
      repApres3: 'ピザが好き。ようやく、はっきりした意見が聞けました。',
      repApres5: 'あと一文です。どれか、もう分かりますね。',
      intro4: 'もうひとつの記憶のかけらです。今回は、好きなものの話をしています。きっと、ちょっとじんときますよ。',
      fin4: '四つ目のかけらを取り戻しました。食べるもの、見るもの、好きなものが言えますね。記憶が形になってきました。',
      sens_j: '私（母音の前の「je」）',
      sens_aime: '好き',
      sens_manger: '食べる（基本の形）',
      sens_regarder: '見る（基本の形）',
      sens_jouer: '遊ぶ（基本の形）',
      sens_tele: 'テレビ（télévision を短くした言い方）',
      tr_aimepoutine: 'プーティンが好きです。',
      tr_aimemanger: '食べるのが好きです。',
      tr_aimetele: 'テレビを見るのが好きです。',
      tr_aimejouer: '遊ぶのが好きです。',
      tr_aimeregpoutine: 'プーティンを見るのが好きです。',
      tr_aimemangerpoutine: 'プーティンを食べるのが好きです。',
      noteJ_titre: 'ポイント',
      noteJ: '「je」は母音の前で「j’」になります：je + aime → j’aime。子音の前では変わりません：je mange。「le」や「la」など、ほかの小さな言葉でも同じことが起こります。',
      noteI_titre: 'ポイント',
      noteI: '「aimer」のあとの動詞は、基本の形（原形）のままです。語尾は -er：mang-er、regard-er、jou-er。「je」がつかない形の動詞です。',
      quipJe: '「aime」の前では、「je」は「j’」になります。母音は大事にしてあげましょう。',
      quipInf: '「j’aime」のあとの動詞は、基本の形のままです。-e ではなく -er です。',
      quipApostrophe: '惜しい！アポストロフィを忘れずに。',
      quipAimePoutine: 'プーティンが好きなのですね。あの熱意を見れば分かります。……いえ、察しがつく程度ですが。',
      quipAimeManger: '食べること。彼女のいつものことです。',
      quipAimeJouer: '遊ぶこと。何をして？ 彼女は言いません。謎がまたひとつ増えました。',
      quipAimeRegPoutine: 'プーティンを見ること。またこの話です。相変わらず、静かに眺めています。',
      cult_tele: 'ケベックでもフランスでも、たいてい「la télé」と言います。「télévision」を短くした言葉で、女性名詞です。',
      intro3: '同じ記憶のもうひとつのかけらです。今回は食べません。見ています。微妙な違いです。',
      finSuite: '最初のかけらを取り戻しました。記憶はまだ完全ではありません。ほかにもあります。',
      fin3: '三つ目のかけらを取り戻しました。これで、見るものと食べるものが言えますね。混同しないように。',
      sens_regarde: '見る',
      sens_film: '映画',
      tr_regarde: '私は見ます。',
      tr_film: '私は映画を見ます。',
      tr_regpoutine: '私はプーティンを見ます。',
      tr_regsandwich: '私はサンドイッチを見ます。',
      noteR_titre: 'ポイント',
      noteR: 'また -er 動詞です：je regard-e。そして、見るものは動詞のすぐあとに置きます。動詞と見るものの間に、小さな言葉は入りません。',
      quipFilm: '映画。やっと、まともなものが出ました。',
      quipRegPoutine: 'プーティンを見る。なんとも……静かな時間です。',
      quipRegSandwich: 'サンドイッチを見ています。おなかはすいていますが、じっと待っています。感心です。',
      quipVerbe: '食べていません。見ています。動詞は大事です。',
      quipFilmMange: '映画を食べる。独創的ですね。でも、違います。',
      quipUn: '「un film」であって、「une」ではありません。男性名詞です。',
      cult_film: '「film」はもともと英語で、薄い膜のことでした。フランス語では男性名詞で、un film と言います。',
      // ---- 🆕 (08-11-2026) fragment 6 : l'épreuve (japonais) ----
      intro6: '記憶の最後のかけらです。今回は、だれも手を引いてくれません。人間にしかできないことがあります。聞くこと、書くこと、思い出すこと。それに慣れる必要があります。ここで成績が決まるわけではありません……が、あなたが書いたものは記録されます。',
      fin6: '最後のかけらを取り戻しました。記憶はひとつにそろいました。あなたが書いたものは保存されています。この先のことは……そのうち、わかるでしょう。',
      c_dictee: '聞いて、聞こえたとおりに書きましょう。単語リストはヒントです。触ることはできません。',
      liste_mots: '使える単語',
      c_aimeq: 'あなたはBekです。何をするのが好きですか？完全な文で書きましょう。',
      lec_certif: 'ここからは、Bekについての質問です。答えるには、彼女について学んだことを思い出す必要があります。選ぶものはありません。それを確かめられるのは、あなただけです。間違えてもかまいません。でも、あとで影響が出るかもしれません。',
      c_certif1: 'あなたが直した記憶の中で、Bekは何を食べていましたか？「un」か「une」をつけて書きましょう。',
      quipNote: '記録しました。合っているかどうかは言いません。人間は、そういうことにも慣れなければなりません。',
      lec_libre: 'この質問には、正解も不正解もありません。先生が読むかもしれません。答えはコピーできます。',
      c_libre: 'では、あなた自身のことです。何をするのが好きですか？完全な文を二つ書きましょう。',
      passer: 'スキップ',
      quipLibre: 'ありがとう。ちゃんと保存しました。',
      copier: 'コピー',
      copie: 'コピーしました！',
      toutCopier: 'すべてコピー',
      recap_titre: 'あなたの答え',
      lec_defi: '最後のチャレンジです。ヒントはありません。成功すれば記録されます。失敗しても、記録されます。',
      c_defi1: 'チャレンジ（1/2）動詞が出ます。「je」を主語にして、現在形に活用しましょう。',
      sens_etudier: '勉強する',
      c_defi2: 'チャレンジ（2/2）「étudier」と「aimer」を、主語「je」で組み合わせましょう。文を書いてください。',
      presqueAccent: 'OKです。でも、アクセント記号をよく見てください。',
      presqueApostrophe: 'OKです。でも、アポストロフィを忘れずに。',
      quipEchec: '今回は残念でした。記録しました。先へ進みましょう。'
    },
    ko: {
      titre: '첫 번째 기억',
      retour_etape: '이전으로',
      quitter: '기억에서 나가기',
      son: '소리',
      suite: '다음',
      continuer: '계속',
      valider: '확인',
      intro: '자, 됐어요. 이 기억은 조금 상했지만, 거기서 단어 몇 개는 건질 수 있을 거예요.',
      c_mange: '단어를 눌러서 들어 보세요.',
      c_lire: '단어를 눌러서 소리와 뜻을 확인해 보세요.',
      c_ordre: '기억이 흐려지고 있어요… 단어를 순서대로 다시 놓아 보세요.',
      c_ecrire_part: '빠진 단어를 채워 보세요.',
      c_ecrire: '이 문장을 프랑스어로 써 보세요.',
      c_image: '너는 Bek이에요. 지금 뭘 하고 있나요?',
      c_audio: '듣고 나서 알맞은 단어를 골라 보세요.',
      reecouter: '다시 듣기',
      sans_son: '아무 소리도 안 들려요',
      construire_vide: '단어를 눌러서 문장을 만들어 보세요.',
      role_s: '주어',
      role_v: '동사',
      role_o: '목적어',
      genre_m: '남성',
      genre_f: '여성',
      noteE_titre: '참고',
      noteE: '“je” 뒤에서는 -er로 끝나는 동사가 -e로 끝나요. 이 -e는 소리 나지 않아요.',
      tr_mange: '나는 먹어요.',
      tr_sandwich: '나는 샌드위치를 먹어요.',
      tr_poutine: '나는 poutine을 먹어요.',
      tr_parle: '나는 프랑스어를 말해요.',
      sens_je: '나',
      sens_mange: '먹다',
      sens_parle: '말하다',
      sens_un: '하나의 (남성 명사)',
      sens_une: '하나의 (여성 명사)',
      sens_sandwich: '샌드위치',
      sens_poutine: 'poutine (감자튀김에 치즈 커드와 그레이비 소스)',
      sens_francais: '프랑스어',
      quipErreur: ['아깝네요. 프랑스어에서도, 다른 말에서도 “아깝다”는 “틀렸다”는 뜻이에요.', '천천히 하세요. 저는 시간이 아주 많아요.', '흥미로운 답이에요. 그래도 아니에요.'],
      astuceClavier: '\ud301: \ud0a4\ubcf4\ub4dc\ub85c \ub2e8\uc5b4\ub97c \uc9c1\uc811 \uc785\ub825\ud560 \uc218\ub3c4 \uc788\uc5b4\uc694.',
      quipOk: ['그거예요.', '맞아요.', '꽤 괜찮은데요.', '점점 나아지고 있어요.'],
      quipUne: 'poutine은 “un”이 아니라 “une”예요. 정하는 건 문법이지, 네가 아니에요.',
      quipPoutine: '그녀의 열정을 잘 보세요. 저는 아무 말도 안 했어요.',
      quipSandwich: '그녀는 샌드위치가 꽤 마음에 드는 모양이에요. 기억해 두세요.',
      quipReponse: '정답은 여기 있어요. 아무한테도 말하지 마세요.',
      quipAccent: '아깝네요! 악센트를 보세요.',
      quipSansSon: '소리가 안 나요? 여기 글자가 있어요. 아무 말 안 할게요.',
      cult_titre: '알고 있었나요?',
      cult_sandwich: '전해지는 이야기로는 “sandwich”라는 말은 카드 게임을 멈추지 않으려고 고기를 빵 두 쪽 사이에 끼워 먹은 영국 백작에게서 왔어요.',
      cult_poutine: 'poutine은 감자튀김, 씹으면 “뽀드득” 소리가 나는 치즈 커드, 갈색 그레이비 소스로 만들어요. 1950년대 말 퀘벡에서 태어났고, 여러 마을이 자기네가 원조라고 주장해요.',
      fin: '기억이 복원됐어요. 이제 무엇을 먹는지 말할 수 있어요. 먹지 않는 것은… 나중에 알려 줄게요.'
    },
    vi: {
      titre: 'Ký ức đầu tiên',
      retour_etape: 'Quay lại',
      quitter: 'Rời khỏi ký ức',
      son: 'Âm thanh',
      suite: 'Tiếp',
      continuer: 'Tiếp tục',
      valider: 'Kiểm tra',
      intro: 'Xong rồi. Ký ức này hơi bị hỏng, nhưng chắc mình lấy được vài từ ra.',
      c_mange: 'Chạm vào các từ để nghe.',
      c_lire: 'Chạm vào các từ để nghe và xem nghĩa.',
      c_ordre: 'Ký ức đang mờ dần… Hãy xếp các từ lại cho đúng thứ tự.',
      c_ecrire_part: 'Điền các từ còn thiếu.',
      c_ecrire: 'Viết câu này bằng tiếng Pháp.',
      c_image: 'Bạn là Bek. Bây giờ bạn đang làm gì?',
      c_audio: 'Nghe rồi chọn đúng các từ.',
      reecouter: 'Nghe lại',
      sans_son: 'Mình không nghe thấy gì',
      construire_vide: 'Chạm vào các từ để ghép thành câu của bạn.',
      role_s: 'chủ ngữ',
      role_v: 'động từ',
      role_o: 'tân ngữ',
      genre_m: 'giống đực',
      genre_f: 'giống cái',
      noteE_titre: 'Lưu ý',
      noteE: 'Sau “je”, các động từ kết thúc bằng -er sẽ tận cùng bằng -e. Chữ -e này không đọc.',
      tr_mange: 'Tôi ăn.',
      tr_sandwich: 'Tôi ăn một cái bánh mì kẹp.',
      tr_poutine: 'Tôi ăn một phần poutine.',
      tr_parle: 'Tôi nói tiếng Pháp.',
      sens_je: 'tôi',
      sens_mange: 'ăn',
      sens_parle: 'nói',
      sens_un: 'một (từ giống đực)',
      sens_une: 'một (từ giống cái)',
      sens_sandwich: 'bánh mì kẹp',
      sens_poutine: 'poutine (khoai tây chiên, phô mai vụn và nước sốt)',
      sens_francais: 'tiếng Pháp',
      quipErreur: ['Gần đúng rồi. Mà trong tiếng Pháp cũng như ở đâu, “gần đúng” nghĩa là “sai”.', 'Cứ từ từ. Mình có cả đống thời gian.', 'Thú vị đấy. Nhưng không phải.'],
      astuceClavier: 'M\u1eb9o: b\u1ea1n c\u0169ng c\u00f3 th\u1ec3 g\u00f5 c\u00e1c t\u1eeb b\u1eb1ng b\u00e0n ph\u00edm.',
      quipOk: ['Đúng rồi.', 'Chính xác.', 'Không tệ chút nào.', 'Đang tiến bộ đấy.'],
      quipUne: 'Là “une” poutine, không phải “un”. Ngữ pháp quyết định, không phải bạn.',
      quipPoutine: 'Để ý độ hào hứng của cô ấy nhé. Mình chỉ nói vậy thôi.',
      quipSandwich: 'Cô ấy có vẻ rất thích bánh mì của mình. Nhớ điều đó nhé.',
      quipReponse: 'Đáp án đây. Đừng nói với ai nhé.',
      quipAccent: 'Gần đúng rồi! Xem lại dấu nhé.',
      quipSansSon: 'Không có tiếng à? Đây là chữ. Mình sẽ không nói gì.',
      cult_titre: 'Bạn có biết không?',
      cult_sandwich: 'Theo truyền thuyết, từ “sandwich” bắt nguồn từ một bá tước người Anh, ông kẹp thịt giữa hai lát bánh mì để khỏi phải rời ván bài.',
      cult_poutine: 'Poutine gồm khoai tây chiên, phô mai vụn (cắn vào nghe “kít kít”) và nước sốt nâu. Món này ra đời ở Québec vào cuối thập niên 1950, và nhiều thị trấn tranh nhau là quê hương của nó.',
      fin: 'Ký ức đã được phục hồi. Giờ bạn đã nói được mình ăn gì. Còn món bạn không ăn… sẽ đến sau.'
    },
    ht: {
      titre: 'Premye souvni',
      retour_etape: 'Retounen',
      quitter: 'Soti nan souvni a',
      son: 'Son',
      suite: 'Swivan',
      continuer: 'Kontinye',
      valider: 'Verifye',
      intro: 'Men li. Souvni sa a yon ti jan domaje, men nou ta dwe kapab rale kèk mo ladan l.',
      c_mange: 'Manyen mo yo pou tande yo.',
      c_lire: 'Manyen mo yo pou tande yo epi wè sa yo vle di.',
      c_ordre: 'Souvni a ap disparèt… Remete mo yo nan lòd.',
      c_ecrire_part: 'Ranpli mo ki manke yo.',
      c_ecrire: 'Ekri fraz la an fransè.',
      c_image: 'Ou se Bek. Kisa w ap fè kounye a?',
      c_audio: 'Koute, apre sa chwazi bon mo yo.',
      reecouter: 'Koute ankò',
      sans_son: 'Mwen pa tande anyen',
      construire_vide: 'Manyen mo yo pou konstwi fraz ou.',
      role_s: 'sijè',
      role_v: 'vèb',
      role_o: 'konpleman',
      genre_m: 'maskilen',
      genre_f: 'fenmen',
      noteE_titre: 'Remak',
      noteE: 'Apre « je », vèb ki fini an -er yo fini an -e. Yo pa tande -e sa a.',
      tr_mange: 'Mwen manje.',
      tr_sandwich: 'Mwen manje yon sandwich.',
      tr_poutine: 'Mwen manje yon poutine.',
      tr_parle: 'Mwen pale fransè.',
      sens_je: 'mwen',
      sens_mange: 'manje',
      sens_parle: 'pale',
      sens_un: 'yon (mo maskilen)',
      sens_une: 'yon (mo fenmen)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (fri, fwomaj an grenn ak sòs)',
      sens_francais: 'lang fransè a',
      quipErreur: ['Prèske. Sa ki, an fransè kou nenpòt ki kote, vle di « non ».', 'Pran tan w. Mwen gen tout pa m.', 'Enteresan. Men non.'],
      astuceClavier: 'Kons\u00e8y: ou ka tape mo yo ak klavye a tou.',
      quipOk: ['Men li.', 'Egzakteman.', 'Pa mal ditou.', 'N ap avanse.'],
      quipUne: 'Yon poutine, se pa « un ». Se gramè ki deside, se pa ou.',
      quipPoutine: 'Gade ak ki antouzyasm li ye. Mwen sèlman di sa.',
      quipSandwich: 'Li sanble li renmen sandwich li a anpil. Sonje sa.',
      quipReponse: 'Men repons lan. Pa di pèsonn.',
      quipAccent: 'Prèske! Gade aksan yo.',
      quipSansSon: 'Pa gen son? Men tèks la. Mwen p ap di anyen.',
      cult_titre: 'Èske w te konnen?',
      cult_sandwich: 'Daprè lejand lan, mo « sandwich » soti nan yon konte anglè ki te manje vyann li ant de moso pen pou l pa kite pati kat li a.',
      cult_poutine: 'Poutine fèt ak fri, fwomaj an grenn (ki « kriye » anba dan yo) ak sòs mawon. Li fèt nan Kebèk nan fen ane 1950 yo, e plizyè vil ap diskite sou onè sa a.',
      fin: 'Souvni a retabli. Kounye a ou ka di sa w ap manje. Sa w pa manje… sa ap vini pita.'
    },
    tl: {
      titre: 'Unang alaala',
      retour_etape: 'Bumalik',
      quitter: 'Lumabas sa alaala',
      son: 'Tunog',
      suite: 'Susunod',
      continuer: 'Magpatuloy',
      valider: 'Suriin',
      intro: 'Ayan. Medyo sira ang alaalang ito, pero dapat makakuha tayo ng ilang salita mula rito.',
      c_mange: 'Pindutin ang mga salita para marinig ang mga ito.',
      c_lire: 'Pindutin ang mga salita para marinig at makita ang kahulugan.',
      c_ordre: 'Naglalaho ang alaala… Ibalik ang mga salita sa tamang ayos.',
      c_ecrire_part: 'Kumpletuhin ang mga nawawalang salita.',
      c_ecrire: 'Isulat ang pangungusap sa Pranses.',
      c_image: 'Ikaw si Bek. Ano ang ginagawa mo ngayon?',
      c_audio: 'Making ka, tapos piliin ang tamang mga salita.',
      reecouter: 'Pakinggan ulit',
      sans_son: 'Wala akong marinig',
      construire_vide: 'Pindutin ang mga salita para buuin ang pangungusap mo.',
      role_s: 'simuno',
      role_v: 'pandiwa',
      role_o: 'layon',
      genre_m: 'panlalaki',
      genre_f: 'pambabae',
      noteE_titre: 'Paalala',
      noteE: 'Pagkatapos ng “je”, ang mga pandiwang nagtatapos sa -er ay nagtatapos sa -e. Hindi naririnig ang -e na ito.',
      tr_mange: 'Kumakain ako.',
      tr_sandwich: 'Kumakain ako ng sandwich.',
      tr_poutine: 'Kumakain ako ng poutine.',
      tr_parle: 'Nagsasalita ako ng Pranses.',
      sens_je: 'ako',
      sens_mange: 'kumain',
      sens_parle: 'magsalita',
      sens_un: 'isang (salitang panlalaki)',
      sens_une: 'isang (salitang pambabae)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (french fries, cheese curds at gravy)',
      sens_francais: 'ang wikang Pranses',
      quipErreur: ['Malapit na. Na, sa Pranses at saanman, ay nangangahulugang “hindi”.', 'Dahan-dahan lang. Marami akong oras.', 'Kawili-wili. Pero hindi.'],
      astuceClavier: 'Tip: puwede mo ring i-type ang mga salita gamit ang keyboard.',
      quipOk: ['Ayan.', 'Eksakto.', 'Hindi masama.', 'Umuusad na tayo.'],
      quipUne: 'Isang “une” poutine, hindi “un”. Ang gramatika ang nagpapasya, hindi ikaw.',
      quipPoutine: 'Tingnan mo ang sigla niya. Sinasabi ko lang.',
      quipSandwich: 'Mukhang nasisiyahan siya sa sandwich niya. Tandaan mo iyon.',
      quipReponse: 'Narito ang sagot. Huwag mong sabihin kanino man.',
      quipAccent: 'Malapit na! Tingnan ang mga tuldik.',
      quipSansSon: 'Walang tunog? Narito ang teksto. Wala akong sasabihin.',
      cult_titre: 'Alam mo ba?',
      cult_sandwich: 'Ayon sa alamat, ang salitang “sandwich” ay galing sa isang Ingles na konde na kumain ng karne sa pagitan ng dalawang hiwa ng tinapay para hindi iwan ang laro niya ng baraha.',
      cult_poutine: 'Ang poutine ay gawa sa french fries, cheese curds (na “tumitili” sa ngipin) at kayumangging gravy. Isinilang ito sa Quebec noong huling bahagi ng dekada 1950, at maraming bayan ang nag-aagawan sa karangalan.',
      fin: 'Naibalik na ang alaala. Kaya mo nang sabihin kung ano ang kinakain mo. Ang hindi mo kinakain… susunod na iyon.'
    },
    id: {
      titre: 'Kenangan pertama',
      retour_etape: 'Kembali',
      quitter: 'Keluar dari kenangan',
      son: 'Suara',
      suite: 'Lanjut',
      continuer: 'Lanjut',
      valider: 'Periksa',
      intro: 'Nah. Kenangan ini agak rusak, tapi kita seharusnya bisa mengambil beberapa kata darinya.',
      c_mange: 'Sentuh kata-katanya untuk mendengarnya.',
      c_lire: 'Sentuh kata-katanya untuk mendengar dan melihat artinya.',
      c_ordre: 'Kenangannya memudar… Susun kembali kata-katanya dengan urutan yang benar.',
      c_ecrire_part: 'Lengkapi kata yang hilang.',
      c_ecrire: 'Tulis kalimatnya dalam bahasa Prancis.',
      c_image: 'Kamu adalah Bek. Apa yang kamu lakukan sekarang?',
      c_audio: 'Dengarkan, lalu pilih kata yang tepat.',
      reecouter: 'Dengarkan lagi',
      sans_son: 'Aku tidak mendengar apa-apa',
      construire_vide: 'Sentuh kata-katanya untuk menyusun kalimatmu.',
      role_s: 'subjek',
      role_v: 'verba',
      role_o: 'objek',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Catatan',
      noteE: 'Setelah “je”, kata kerja berakhiran -er berakhir dengan -e. Bunyi -e ini tidak terdengar.',
      tr_mange: 'Aku makan.',
      tr_sandwich: 'Aku makan sandwich.',
      tr_poutine: 'Aku makan poutine.',
      tr_parle: 'Aku berbicara bahasa Prancis.',
      sens_je: 'aku',
      sens_mange: 'makan',
      sens_parle: 'berbicara',
      sens_un: 'sebuah (kata maskulin)',
      sens_une: 'sebuah (kata feminin)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (kentang goreng, keju butiran, dan saus)',
      sens_francais: 'bahasa Prancis',
      quipErreur: ['Hampir. Yang, dalam bahasa Prancis maupun bahasa lain, artinya “bukan”.', 'Santai saja. Aku punya banyak waktu.', 'Menarik. Tapi bukan.'],
      astuceClavier: 'Tips: kamu juga bisa mengetik kata-katanya dengan keyboard.',
      quipOk: ['Nah itu dia.', 'Tepat.', 'Lumayan juga.', 'Kita maju.'],
      quipUne: 'Sebuah “une” poutine, bukan “un”. Tata bahasa yang menentukan, bukan kamu.',
      quipPoutine: 'Perhatikan semangatnya. Aku cuma bilang.',
      quipSandwich: 'Dia kelihatan sangat menikmati sandwich-nya. Ingat itu.',
      quipReponse: 'Ini jawabannya. Jangan bilang siapa-siapa.',
      quipAccent: 'Hampir! Lihat tanda aksennya.',
      quipSansSon: 'Tidak ada suara? Ini tulisannya. Aku tidak akan bilang apa-apa.',
      cult_titre: 'Tahukah kamu?',
      cult_sandwich: 'Menurut legenda, kata “sandwich” berasal dari seorang earl Inggris yang makan daging di antara dua potong roti agar tidak meninggalkan permainan kartunya.',
      cult_poutine: 'Poutine terdiri dari kentang goreng, keju butiran (yang “berdecit” di gigi), dan saus cokelat. Makanan ini lahir di Quebec pada akhir 1950-an, dan beberapa kota berebut kehormatan itu.',
      fin: 'Kenangan telah dipulihkan. Sekarang kamu bisa mengatakan apa yang kamu makan. Yang tidak kamu makan… nanti menyusul.'
    },
    nl: {
      titre: 'Eerste herinnering',
      retour_etape: 'Terug',
      quitter: 'De herinnering verlaten',
      son: 'Geluid',
      suite: 'Volgende',
      continuer: 'Verder',
      valider: 'Controleren',
      intro: 'Zo. Deze herinnering is een beetje beschadigd, maar we zouden er een paar woorden uit moeten kunnen halen.',
      c_mange: 'Tik op de woorden om ze te horen.',
      c_lire: 'Tik op de woorden om ze te horen en hun betekenis te zien.',
      c_ordre: 'De herinnering vervaagt… Zet de woorden terug in de goede volgorde.',
      c_ecrire_part: 'Vul de ontbrekende woorden in.',
      c_ecrire: 'Schrijf de zin in het Frans.',
      c_image: 'Jij bent Bek. Wat doe je nu?',
      c_audio: 'Luister en kies de juiste woorden.',
      reecouter: 'Opnieuw luisteren',
      sans_son: 'Ik hoor niets',
      construire_vide: 'Tik op de woorden om je zin te maken.',
      role_s: 'onderwerp',
      role_v: 'werkwoord',
      role_o: 'object',
      genre_m: 'mannelijk',
      genre_f: 'vrouwelijk',
      noteE_titre: 'Opmerking',
      noteE: 'Na “je” eindigen werkwoorden op -er op -e. Die -e hoor je niet.',
      tr_mange: 'Ik eet.',
      tr_sandwich: 'Ik eet een sandwich.',
      tr_poutine: 'Ik eet een poutine.',
      tr_parle: 'Ik spreek Frans.',
      sens_je: 'ik',
      sens_mange: 'eten',
      sens_parle: 'spreken',
      sens_un: 'een (mannelijk woord)',
      sens_une: 'een (vrouwelijk woord)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (friet, kaaskruim en jus)',
      sens_francais: 'de Franse taal',
      quipErreur: ['Bijna. Wat in het Frans, net als overal, “nee” betekent.', 'Neem je tijd. Ik heb al de mijne.', 'Interessant. Maar nee.'],
      astuceClavier: 'Tip: je kunt de woorden ook met het toetsenbord typen.',
      quipOk: ['Zo.', 'Precies.', 'Niet slecht.', 'We schieten op.'],
      quipUne: 'Een “une” poutine, geen “un”. De grammatica beslist, niet jij.',
      quipPoutine: 'Let op haar enthousiasme. Ik zeg het maar.',
      quipSandwich: 'Ze lijkt echt van haar sandwich te genieten. Onthoud dat.',
      quipReponse: 'Hier is het antwoord. Vertel het aan niemand.',
      quipAccent: 'Bijna! Kijk naar de accenten.',
      quipSansSon: 'Geen geluid? Hier is de tekst. Ik zeg niets.',
      cult_titre: 'Wist je dat?',
      cult_sandwich: 'Volgens de legende komt het woord “sandwich” van een Engelse graaf die zijn vlees tussen twee sneetjes brood at om zijn kaartspel niet te hoeven verlaten.',
      cult_poutine: 'Poutine bestaat uit friet, kaaskruim (dat “piept” tussen je tanden) en bruine jus. Het ontstond eind jaren 1950 in Quebec, en meerdere dorpen betwisten die eer.',
      fin: 'Herinnering hersteld. Nu kun je zeggen wat je eet. Wat je niet eet… komt later.'
    },
    de: {
      titre: 'Erste Erinnerung',
      retour_etape: 'Zurück',
      quitter: 'Erinnerung verlassen',
      son: 'Ton',
      suite: 'Weiter',
      continuer: 'Weiter',
      valider: 'Prüfen',
      intro: 'So. Diese Erinnerung ist ein bisschen beschädigt, aber wir sollten ein paar Wörter daraus holen können.',
      c_mange: 'Tippe auf die Wörter, um sie zu hören.',
      c_lire: 'Tippe auf die Wörter, um sie zu hören und ihre Bedeutung zu sehen.',
      c_ordre: 'Die Erinnerung verblasst… Bring die Wörter wieder in die richtige Reihenfolge.',
      c_ecrire_part: 'Ergänze die fehlenden Wörter.',
      c_ecrire: 'Schreibe den Satz auf Französisch.',
      c_image: 'Du bist Bek. Was machst du gerade?',
      c_audio: 'Hör zu und wähle dann die richtigen Wörter.',
      reecouter: 'Nochmal anhören',
      sans_son: 'Ich höre nichts',
      construire_vide: 'Tippe auf die Wörter, um deinen Satz zu bauen.',
      role_s: 'Subjekt',
      role_v: 'Verb',
      role_o: 'Objekt',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Hinweis',
      noteE: 'Nach „je“ enden Verben auf -er mit -e. Dieses -e hört man nicht.',
      tr_mange: 'Ich esse.',
      tr_sandwich: 'Ich esse ein Sandwich.',
      tr_poutine: 'Ich esse eine Poutine.',
      tr_parle: 'Ich spreche Französisch.',
      sens_je: 'ich',
      sens_mange: 'essen',
      sens_parle: 'sprechen',
      sens_un: 'ein (maskulines Wort)',
      sens_une: 'eine (feminines Wort)',
      sens_sandwich: 'Sandwich',
      sens_poutine: 'Poutine (Pommes, Käsebruch und Bratensoße)',
      sens_francais: 'die französische Sprache',
      quipErreur: ['Fast. Was auf Französisch wie überall „nein“ bedeutet.', 'Lass dir Zeit. Ich habe meine ganze.', 'Interessant. Aber nein.'],
      astuceClavier: 'Tipp: Du kannst die W\u00f6rter auch mit der Tastatur eingeben.',
      quipOk: ['So.', 'Genau.', 'Gar nicht schlecht.', 'Wir kommen voran.'],
      quipUne: 'Eine „une“ Poutine, nicht „un“. Die Grammatik entscheidet, nicht du.',
      quipPoutine: 'Achte auf ihre Begeisterung. Ich sage ja nur.',
      quipSandwich: 'Sie scheint ihr Sandwich wirklich zu genießen. Merk dir das.',
      quipReponse: 'Hier ist die Antwort. Sag es niemandem.',
      quipAccent: 'Fast! Achte auf die Akzente.',
      quipSansSon: 'Kein Ton? Hier ist der Text. Ich sage nichts.',
      cult_titre: 'Wusstest du schon?',
      cult_sandwich: 'Der Legende nach stammt das Wort „Sandwich“ von einem englischen Grafen, der sein Fleisch zwischen zwei Brotscheiben aß, um sein Kartenspiel nicht zu verlassen.',
      cult_poutine: 'Poutine besteht aus Pommes, Käsebruch (der zwischen den Zähnen „quietscht“) und brauner Soße. Sie entstand Ende der 1950er-Jahre in Québec, und mehrere Dörfer streiten sich um die Ehre.',
      fin: 'Erinnerung wiederhergestellt. Jetzt kannst du sagen, was du isst. Was du nicht isst… kommt später.'
    },
    fa: {
      titre: 'اولین خاطره',
      retour_etape: 'بازگشت',
      quitter: 'خروج از خاطره',
      son: 'صدا',
      suite: 'بعدی',
      continuer: 'ادامه',
      valider: 'بررسی',
      intro: 'خب. این خاطره کمی آسیب دیده، ولی باید بتوانیم چند کلمه از آن بیرون بکشیم.',
      c_mange: 'روی کلمه‌ها بزن تا صدایشان را بشنوی.',
      c_lire: 'روی کلمه‌ها بزن تا صدا و معنایشان را ببینی.',
      c_ordre: 'خاطره دارد محو می‌شود… کلمه‌ها را به ترتیب درست برگردان.',
      c_ecrire_part: 'کلمه‌های جاافتاده را کامل کن.',
      c_ecrire: 'جمله را به فرانسوی بنویس.',
      c_image: 'تو Bek هستی. الان چه‌کار می‌کنی؟',
      c_audio: 'گوش بده، بعد کلمه‌های درست را انتخاب کن.',
      reecouter: 'دوباره گوش بده',
      sans_son: 'چیزی نمی‌شنوم',
      construire_vide: 'روی کلمه‌ها بزن تا جمله‌ات را بسازی.',
      role_s: 'نهاد',
      role_v: 'فعل',
      role_o: 'مفعول',
      genre_m: 'مذکر',
      genre_f: 'مؤنث',
      noteE_titre: 'نکته',
      noteE: 'بعد از «je»، فعل‌هایی که به -er ختم می‌شوند به -e تمام می‌شوند. این -e تلفظ نمی‌شود.',
      tr_mange: 'من می‌خورم.',
      tr_sandwich: 'من یک ساندویچ می‌خورم.',
      tr_poutine: 'من یک poutine می‌خورم.',
      tr_parle: 'من فرانسوی صحبت می‌کنم.',
      sens_je: 'من',
      sens_mange: 'خوردن',
      sens_parle: 'صحبت کردن',
      sens_un: 'یک (کلمهٔ مذکر)',
      sens_une: 'یک (کلمهٔ مؤنث)',
      sens_sandwich: 'ساندویچ',
      sens_poutine: 'poutine (سیب‌زمینی سرخ‌کرده، پنیر دانه‌ای و سس)',
      sens_francais: 'زبان فرانسوی',
      quipErreur: ['نزدیک بود. که در فرانسوی هم مثل هر جای دیگر یعنی «نه».', 'عجله نکن. من همهٔ وقت دنیا را دارم.', 'جالب بود. ولی نه.'],
      astuceClavier: '\u0646\u06a9\u062a\u0647: \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc \u06a9\u0644\u0645\u0647\u200c\u0647\u0627 \u0631\u0627 \u0628\u0627 \u0635\u0641\u062d\u0647\u200c\u06a9\u0644\u06cc\u062f \u0647\u0645 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc.',
      quipOk: ['همین.', 'دقیقاً.', 'بد نبود.', 'داریم پیش می‌رویم.'],
      quipUne: 'یک poutine «une» است، نه «un». دستور زبان تصمیم می‌گیرد، نه تو.',
      quipPoutine: 'به شور و شوقش دقت کن. من فقط می‌گویم.',
      quipSandwich: 'انگار از ساندویچش خیلی لذت می‌برد. این را یادت نگه دار.',
      quipReponse: 'جواب این است. به کسی نگو.',
      quipAccent: 'نزدیک بود! به آکسان‌ها نگاه کن.',
      quipSansSon: 'صدا نیست؟ این هم متن. من چیزی نمی‌گویم.',
      cult_titre: 'می‌دانستی؟',
      cult_sandwich: 'طبق افسانه، واژهٔ «sandwich» از یک کنت انگلیسی آمده که گوشتش را بین دو تکه نان می‌خورد تا بازی ورقش را رها نکند.',
      cult_poutine: 'poutine از سیب‌زمینی سرخ‌کرده، پنیر دانه‌ای (که زیر دندان «جیرجیر» می‌کند) و سس قهوه‌ای درست می‌شود. اواخر دههٔ ۱۹۵۰ در کبک به وجود آمد و چند شهر بر سر این افتخار با هم اختلاف دارند.',
      fin: 'خاطره بازسازی شد. حالا می‌توانی بگویی چه می‌خوری. اینکه چه نمی‌خوری… بعداً می‌رسد.'
    },
    sv: {
      titre: 'Första minnet',
      retour_etape: 'Tillbaka',
      quitter: 'Lämna minnet',
      son: 'Ljud',
      suite: 'Nästa',
      continuer: 'Fortsätt',
      valider: 'Kontrollera',
      intro: 'Så där. Det här minnet är lite skadat, men vi borde kunna få ut några ord ur det.',
      c_mange: 'Tryck på orden för att höra dem.',
      c_lire: 'Tryck på orden för att höra dem och se vad de betyder.',
      c_ordre: 'Minnet bleknar… Lägg orden i rätt ordning igen.',
      c_ecrire_part: 'Fyll i orden som saknas.',
      c_ecrire: 'Skriv meningen på franska.',
      c_image: 'Du är Bek. Vad gör du nu?',
      c_audio: 'Lyssna och välj sedan rätt ord.',
      reecouter: 'Lyssna igen',
      sans_son: 'Jag hör ingenting',
      construire_vide: 'Tryck på orden för att bygga din mening.',
      role_s: 'subjekt',
      role_v: 'verb',
      role_o: 'objekt',
      genre_m: 'maskulinum',
      genre_f: 'femininum',
      noteE_titre: 'Anmärkning',
      noteE: 'Efter ”je” slutar verb på -er med -e. Det -e:et hörs inte.',
      tr_mange: 'Jag äter.',
      tr_sandwich: 'Jag äter en macka.',
      tr_poutine: 'Jag äter en poutine.',
      tr_parle: 'Jag talar franska.',
      sens_je: 'jag',
      sens_mange: 'äta',
      sens_parle: 'tala',
      sens_un: 'en (maskulint ord)',
      sens_une: 'en (feminint ord)',
      sens_sandwich: 'macka',
      sens_poutine: 'poutine (pommes frites, ostbitar och sås)',
      sens_francais: 'det franska språket',
      quipErreur: ['Nästan. Vilket på franska, precis som överallt, betyder ”nej”.', 'Ta den tid du behöver. Jag har all min.', 'Intressant. Men nej.'],
      astuceClavier: 'Tips: du kan ocks\u00e5 skriva orden med tangentbordet.',
      quipOk: ['Så där.', 'Precis.', 'Inte illa alls.', 'Vi kommer framåt.'],
      quipUne: 'En ”une” poutine, inte ”un”. Grammatiken bestämmer, inte du.',
      quipPoutine: 'Lägg märke till hennes entusiasm. Jag säger bara det.',
      quipSandwich: 'Hon verkar verkligen gilla sin macka. Kom ihåg det.',
      quipReponse: 'Här är svaret. Berätta det inte för någon.',
      quipAccent: 'Nästan! Titta på accenterna.',
      quipSansSon: 'Inget ljud? Här är texten. Jag säger ingenting.',
      cult_titre: 'Visste du det?',
      cult_sandwich: 'Enligt legenden kommer ordet ”sandwich” från en engelsk earl som åt sitt kött mellan två brödskivor för att inte lämna sitt kortspel.',
      cult_poutine: 'Poutine består av pommes frites, ostbitar (som ”gnisslar” mot tänderna) och brun sås. Den föddes i Québec i slutet av 1950-talet, och flera byar tvistar om äran.',
      fin: 'Minnet är återställt. Nu kan du säga vad du äter. Vad du inte äter… kommer senare.'
    },
    no: {
      titre: 'Første minne',
      retour_etape: 'Tilbake',
      quitter: 'Forlat minnet',
      son: 'Lyd',
      suite: 'Neste',
      continuer: 'Fortsett',
      valider: 'Sjekk',
      intro: 'Sånn. Dette minnet er litt skadet, men vi burde kunne få ut noen ord av det.',
      c_mange: 'Trykk på ordene for å høre dem.',
      c_lire: 'Trykk på ordene for å høre dem og se hva de betyr.',
      c_ordre: 'Minnet blekner… Sett ordene tilbake i riktig rekkefølge.',
      c_ecrire_part: 'Fyll inn ordene som mangler.',
      c_ecrire: 'Skriv setningen på fransk.',
      c_image: 'Du er Bek. Hva gjør du nå?',
      c_audio: 'Lytt, og velg så de riktige ordene.',
      reecouter: 'Lytt igjen',
      sans_son: 'Jeg hører ingenting',
      construire_vide: 'Trykk på ordene for å bygge setningen din.',
      role_s: 'subjekt',
      role_v: 'verb',
      role_o: 'objekt',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Merk',
      noteE: 'Etter «je» ender verb på -er med -e. Den -e-en høres ikke.',
      tr_mange: 'Jeg spiser.',
      tr_sandwich: 'Jeg spiser en sandwich.',
      tr_poutine: 'Jeg spiser en poutine.',
      tr_parle: 'Jeg snakker fransk.',
      sens_je: 'jeg',
      sens_mange: 'spise',
      sens_parle: 'snakke',
      sens_un: 'en (maskulint ord)',
      sens_une: 'en (feminint ord)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (pommes frites, osteklumper og saus)',
      sens_francais: 'det franske språket',
      quipErreur: ['Nesten. Som på fransk, som overalt ellers, betyr «nei».', 'Ta deg tid. Jeg har all min.', 'Interessant. Men nei.'],
      astuceClavier: 'Tips: du kan ogs\u00e5 skrive ordene med tastaturet.',
      quipOk: ['Sånn.', 'Nettopp.', 'Ikke verst.', 'Vi kommer fremover.'],
      quipUne: 'En «une» poutine, ikke «un». Grammatikken bestemmer, ikke du.',
      quipPoutine: 'Legg merke til entusiasmen hennes. Jeg sier bare det.',
      quipSandwich: 'Hun ser ut til å like sandwichen sin skikkelig godt. Husk det.',
      quipReponse: 'Her er svaret. Ikke si det til noen.',
      quipAccent: 'Nesten! Se på aksentene.',
      quipSansSon: 'Ingen lyd? Her er teksten. Jeg sier ingenting.',
      cult_titre: 'Visste du at …?',
      cult_sandwich: 'Ifølge legenden kommer ordet «sandwich» fra en engelsk jarl som spiste kjøttet sitt mellom to brødskiver for ikke å forlate kortspillet.',
      cult_poutine: 'Poutine består av pommes frites, osteklumper (som «knirker» mellom tennene) og brun saus. Den oppstod i Québec på slutten av 1950-tallet, og flere landsbyer krangler om æren.',
      fin: 'Minnet er gjenopprettet. Nå kan du si hva du spiser. Det du ikke spiser … kommer senere.'
    },
    ru: {
      titre: 'Первое воспоминание',
      retour_etape: 'Назад',
      quitter: 'Выйти из воспоминания',
      son: 'Звук',
      suite: 'Далее',
      continuer: 'Продолжить',
      valider: 'Проверить',
      intro: 'Вот. Это воспоминание немного повреждено, но несколько слов из него мы вытащить сможем.',
      c_mange: 'Нажимай на слова, чтобы их услышать.',
      c_lire: 'Нажимай на слова, чтобы услышать их и увидеть значение.',
      c_ordre: 'Воспоминание стирается… Верни слова в правильный порядок.',
      c_ecrire_part: 'Впиши недостающие слова.',
      c_ecrire: 'Напиши предложение по-французски.',
      c_image: 'Ты — Bek. Что ты делаешь сейчас?',
      c_audio: 'Послушай и выбери правильные слова.',
      reecouter: 'Послушать ещё раз',
      sans_son: 'Я ничего не слышу',
      construire_vide: 'Нажимай на слова, чтобы составить своё предложение.',
      role_s: 'подлежащее',
      role_v: 'глагол',
      role_o: 'дополнение',
      genre_m: 'мужской род',
      genre_f: 'женский род',
      noteE_titre: 'Заметка',
      noteE: 'После «je» глаголы на -er оканчиваются на -e. Это -e не произносится.',
      tr_mange: 'Я ем.',
      tr_sandwich: 'Я ем бутерброд.',
      tr_poutine: 'Я ем poutine.',
      tr_parle: 'Я говорю по-французски.',
      sens_je: 'я',
      sens_mange: 'есть (кушать)',
      sens_parle: 'говорить',
      sens_un: 'один (слово мужского рода)',
      sens_une: 'одна (слово женского рода)',
      sens_sandwich: 'бутерброд',
      sens_poutine: 'poutine (картофель фри, сырные гранулы и соус)',
      sens_francais: 'французский язык',
      quipErreur: ['Почти. Что по-французски, как и везде, означает «нет».', 'Не торопись. У меня времени сколько угодно.', 'Интересно. Но нет.'],
      astuceClavier: '\u041f\u043e\u0434\u0441\u043a\u0430\u0437\u043a\u0430: \u0441\u043b\u043e\u0432\u0430 \u043c\u043e\u0436\u043d\u043e \u0432\u0432\u043e\u0434\u0438\u0442\u044c \u0438 \u0441 \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044b.',
      quipOk: ['Вот так.', 'Именно.', 'Совсем неплохо.', 'Мы продвигаемся.'],
      quipUne: 'Poutine — «une», а не «un». Решает грамматика, а не ты.',
      quipPoutine: 'Обрати внимание на её энтузиазм. Я просто говорю.',
      quipSandwich: 'Кажется, ей очень нравится её бутерброд. Запомни это.',
      quipReponse: 'Вот ответ. Никому не рассказывай.',
      quipAccent: 'Почти! Посмотри на ударения и значки.',
      quipSansSon: 'Нет звука? Вот текст. Я ничего не скажу.',
      cult_titre: 'Знаешь ли ты?',
      cult_sandwich: 'Согласно легенде, слово «sandwich» пришло от английского графа, который ел мясо между двумя ломтями хлеба, чтобы не отрываться от карточной игры.',
      cult_poutine: 'Poutine состоит из картофеля фри, сырных гранул (которые «скрипят» на зубах) и коричневого соуса. Блюдо появилось в Квебеке в конце 1950-х, и несколько городков спорят за честь его изобретения.',
      fin: 'Воспоминание восстановлено. Теперь ты умеешь сказать, что ты ешь. А чего ты не ешь… это потом.'
    }
  };

  const DESSINS = {   // vignettes provisoires (traits à la main, sans emoji)
    sandwich: '<rect x="10" y="53" width="60" height="13" rx="5" fill="#F7DDA8" stroke="#4A3B33" stroke-width="2.4"/><rect x="14" y="56" width="52" height="7" rx="3" fill="none" stroke="#E8BE78" stroke-width="1.6"/><path d="M8 48c4 3 8-3 12 0s8-3 12 0 8-3 12 0 8-3 12 0 8-3 12 0v6H8Z" fill="#F6D56A" stroke="#4A3B33" stroke-width="2.2" stroke-linejoin="round"/><path d="M10 42h60v6H10Z" fill="#F2A9A0" stroke="#4A3B33" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 36h56v6H12Z" fill="#E0674F" stroke="#4A3B33" stroke-width="2.2" stroke-linejoin="round"/><path d="M7 31c4 4 8-3 12 0s8-3 12 0 8-3 12 0 8-3 12 0 8-3 12 0v7H7Z" fill="#8DBF6A" stroke="#4A3B33" stroke-width="2.2" stroke-linejoin="round"/><rect x="10" y="15" width="60" height="17" rx="5" fill="#F7DDA8" stroke="#4A3B33" stroke-width="2.4"/><rect x="14" y="18" width="52" height="11" rx="3" fill="none" stroke="#E8BE78" stroke-width="1.6"/>',
    poutine: '<path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="#F7F1E8"/><path d="M14 42l6-18 5 17 7-20 5 19 7-17 4 17 6-14 3 16Z" fill="#F0C75E"/><path d="M12 42c6 4 10-2 16 1s10-3 16 0 10-2 16 0 8-1 10 0c-2 6-8 8-20 8s-30 0-38-9Z" fill="#8A5A3C"/><circle cx="26" cy="38" r="4" fill="#FFF6D8"/><circle cx="42" cy="36" r="4.5" fill="#FFF6D8"/><circle cx="56" cy="39" r="3.5" fill="#FFF6D8"/><path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="none" stroke="#4A3B33" stroke-width="3" stroke-linejoin="round"/>',
    jeu: '<rect x="14" y="14" width="52" height="52" rx="10" fill="#F7F1E8" stroke="#4A3B33" stroke-width="3"/><circle cx="28" cy="28" r="4.5" fill="#4A3B33"/><circle cx="52" cy="28" r="4.5" fill="#4A3B33"/><circle cx="40" cy="40" r="4.5" fill="#4A3B33"/><circle cx="28" cy="52" r="4.5" fill="#4A3B33"/><circle cx="52" cy="52" r="4.5" fill="#4A3B33"/>',
    pizza: '<circle cx="40" cy="42" r="30" fill="#E8B96A"/><circle cx="40" cy="42" r="25" fill="#E0674F"/><path d="M40 42V17a25 25 0 0 1 22 13Z" fill="#F7E3A1"/><circle cx="30" cy="38" r="4" fill="#B5382B"/><circle cx="48" cy="52" r="4" fill="#B5382B"/><circle cx="34" cy="55" r="3" fill="#B5382B"/>',
    film: '<rect x="8" y="14" width="64" height="42" rx="6" fill="#4A3B33"/><rect x="13" y="19" width="54" height="32" rx="3" fill="#D4E6F7"/><path d="M34 27l16 8-16 8Z" fill="#E08867"/><rect x="28" y="60" width="24" height="5" rx="2.5" fill="#4A3B33"/>'
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
  function normaliser(s) { return String(s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.!?¡¿,;:«»"]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function sansApostrophe(s) { return s.replace(/['\s]/g, ''); }
  // « accent » : seuls les accents diffèrent ; « apostrophe » : seuls l'apostrophe, les espaces (et les accents) diffèrent ; sinon null
  function proche(donne, attendu) {
    if (sansAccents(donne) === sansAccents(attendu)) return 'accent';
    if (sansApostrophe(sansAccents(donne)) === sansApostrophe(sansAccents(attendu))) return 'apostrophe';
    return null;
  }
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

  function demarrerScene(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) { console.warn('sequence-m1 : conteneur introuvable (' + idConteneur + ').'); return { arreter: function () {} }; }

    const fragment = options.fragment >= 2 && options.fragment <= 6 ? options.fragment : 1;   // 🆕 1 = « manger » (défaut), 2 = « un/une, le/la », 3 = « regarder »
    const banqueDefaut = [null, BANQUE_LIBRE, BANQUE_2, BANQUE_3, BANQUE_4, BANQUE_4, BANQUE_4][fragment];
    const nbEtapes = fragment === 6 ? ETAPES_6 : ETAPES_TOTAL;     // 🆕 longueur de la barre de progression
    const MOTS_DU_FRAGMENT = [null, MOTS_APPRIS, MOTS_APPRIS_2, MOTS_APPRIS_3, MOTS_APPRIS_4, MOTS_APPRIS_5, MOTS_APPRIS_6][fragment];
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
    const motsVus = {};               // 🆕 mots déjà touchés à la lecture, dans cette scène
    const minuteurs = [];
    const nettoyages = [];            // 🆕 écouteurs du document à retirer si on quitte en cours de route
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    const scene = document.createElement('div');
    scene.className = 'rbek-scene m1-scene';
    let segments = '';
    for (let i = 0; i < nbEtapes; i++) segments += '<span class="m1-segment"></span>';
    // 🆕 flèche de retour : fragments 1 à 4, quand la page (demarrer) sait reconstruire la scène à une autre étape
    const avecRetour = fragment !== 5 && typeof options._reculer === 'function';
    const barre = '<div class="m1-progres" aria-hidden="true">' + segments + '</div>';
    if (avecRetour) injecterStyle('m1-retour-style', RETOUR_CSS);
    injecterStyle('m1-art-style', ART_CSS);
    injecterStyle('m1-lecteur-repos-style', LECTEUR_REPOS_CSS);
    scene.innerHTML =
      '<button type="button" class="m1-quitter" aria-label="' + echapper(T('quitter')) + '">&#8249;</button>' +
      '<button type="button" class="m1-son" aria-label="' + echapper(T('son')) + '" aria-pressed="true">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path class="m1-son-ondes" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg></button>' +
      '<div class="m1-disposition">' +
        '<div class="m1-col-gauche">' +
          '<div class="m1-carte">' +
            (avecRetour
              ? '<div class="m1-entete-carte"><button type="button" class="m1-retour" disabled aria-label="' + echapper(T('retour_etape')) + '" title="' + echapper(T('retour_etape')) + '">' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg></button>' + barre + '</div>'
              : barre) +
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
    const calque = q('.m1-calque'), vignette = q('.m1-vignette'), colBek = q('.m1-col-bek');
    const segs = scene.querySelectorAll('.m1-segment');
    const boutonSon = q('.m1-son');
    const boutonRetour = q('.m1-retour');
    const colGauche = q('.m1-col-gauche'), calqueBek = q('.m1-bek');
    const sceneAuDepart = !options._retour && !(Number(options.reprendreA) > 0);     // 🆕 scène d'abord : pas au retour en arrière ni à la reprise
    if (sceneAuDepart) { injecterStyle('m1-scene-seule-style', SCENE_CSS); colGauche.classList.add('m1-cache'); }

    // ---------- Voix : audio/fr/<id>.mp3 ou .wav, sinon la synthèse du navigateur ----------
    const son = { actif: lireSon() };
    const dispoAudio = {};
    function reglerBoutonSon() { boutonSon.setAttribute('aria-pressed', son.actif ? 'true' : 'false'); boutonSon.classList.toggle('m1-son-coupe', !son.actif); }
    reglerBoutonSon();
    // 🆕 (07-11-2026) Un exercice d'écoute n'a aucun sens sans le son : le réglage « son coupé » (clé partagée par tout le site) ne doit pas
    // rendre « Réécouter » muet. On rallume le son pour l'exercice (sans toucher au réglage mémorisé : l'élève le retrouve tel quel ailleurs).
    function reactiverSon() {
      if (son.actif) return;
      son.actif = true;
      reglerBoutonSon();
    }
    boutonSon.addEventListener('click', function () {
      son.actif = !son.actif;
      try { localStorage.setItem(CLE_SON, son.actif ? '1' : '0'); } catch (e) {}
      if (!son.actif) { couperVoix(); }
      reglerBoutonSon();
    });
    let synthEnCours = null;
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
        const mon = jetonVoix;
        synthEnCours = u;                      // 🆕 garde une référence : sinon le navigateur peut ramasser l'énoncé et couper la voix
        ss.cancel();
        synthProgrammee = true;                // 🆕 pendant ces ~70 ms, rien ne parle encore mais une voix va partir
        // 🆕 un speak() dans le même tick que cancel() est parfois ignoré (Chrome, Android) : on laisse respirer ~70 ms, ce qui rend « Réécouter » fiable
        setTimeout(function () {
          if (mon === jetonVoix) synthProgrammee = false;
          if (arrete || mon !== jetonVoix || synthEnCours !== u) return;
          try { ss.speak(u); } catch (e) {}
        }, 70);
      } catch (e) {}
    }
    // 🆕 (05-11-2026) audio/fr/<id>.mp3, sinon audio/fr/<id>.wav (la console Google télécharge du .wav), sinon la synthèse du navigateur
    // NOMMAGE : <voix>_<id>_<version> (ex. bek_je_01.mp3, bek_jaime-la-poutine_01.mp3). Un seul dossier à plat pour tout le site.
    // options.voix ('bek' par défaut) et options.versionVoix ('01') règlent la voix ; une phrase peut en imposer une autre (champs voix / version dans PHRASES).
    function nomAudio(id, v) {
      v = v || {};
      return (v.voix || options.voix || 'bek') + '_' + id + '_' + (v.version || options.versionVoix || '01');
    }
    // UNE SEULE VOIX À LA FOIS : une nouvelle voix coupe la précédente (fondu ~40 ms). Une PHRASE dite automatiquement
    // attend d'abord la fin du mot en cours (au plus 1,5 s) ; un clic explicite sur « écouter » coupe et relance tout de suite.
    let voixAudio = null, jetonVoix = 0;
    // 🆕 (08-11-2026) Deux trous faisaient croire à « silence » alors qu'une voix allait partir : une phrase mise en file (elle attend la fin de la voix
    //   en cours) et la synthèse, qui démarre ~70 ms après l'appel. La fin d'étape changeait alors d'écran, et la voix tombait sur le suivant.
    //   voixReelle() = ce qu'on entend ; voixActive() = ce qu'on entend OU ce qui va partir.
    let fileJeton = 0, synthProgrammee = false;
    function voixReelle() {
      if (voixAudio && !voixAudio.ended) return true;
      try { return !!(window.speechSynthesis && window.speechSynthesis.speaking); } catch (e) { return false; }
    }
    function voixActive() { return voixReelle() || fileJeton !== 0 || synthProgrammee; }
    function couperVoix() {
      jetonVoix++;
      fileJeton = 0; synthProgrammee = false;
      const a = voixAudio; voixAudio = null;
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      if (!a) return;
      let vol = a.volume;
      (function fondre() {
        vol -= 0.34;
        if (vol <= 0.02) { try { a.pause(); } catch (e) {} return; }
        try { a.volume = vol; } catch (e) {}
        setTimeout(fondre, 12);
      })();
    }
    // 🆕 Fin d'étape : on attend au moins « base » ms, puis que la voix soit finie (au plus ATTENTE_VOIX_MAX), puis une respiration : l'écran suivant
    //   n'arrive plus par-dessus la fin de la phrase.
    function finApresVoix(fini, base) {
      const t0 = Date.now();
      planifier(function attendreVoix() {
        if (voixActive() && Date.now() - t0 < ATTENTE_VOIX_MAX) { planifier(attendreVoix, 60); return; }
        planifier(fini, FIN_VOIX_MARGE);
      }, base);
    }
    function dire(id, texte, v, apres) {
      if (!son.actif || arrete) return;
      if (apres && voixActive()) {
        // on prend la place dans la file : un appel plus récent annule celui-ci
        const mon = ++jetonVoix, t0 = Date.now();
        fileJeton = mon;                     // 🆕 la phrase en attente compte comme « voix active » pour la fin d'étape
        (function boucle() {
          if (arrete || mon !== jetonVoix) return;
          if (voixReelle() && Date.now() - t0 < ATTENTE_VOIX_MAX) { setTimeout(boucle, 40); return; }
          // 🆕 une courte respiration après la fin de la voix précédente : sa dernière syllabe (« télé ») n'est plus écrasée par la suivante
          setTimeout(function () { if (arrete || mon !== jetonVoix) return; dire(id, texte, v, false); }, FIN_VOIX_MARGE);
        })();
        return;
      }
      couperVoix();
      if (v && v.coeur) coeur();             // 🆕 la voix démarre vraiment ici (pas pendant l'attente en file)
      const mon = jetonVoix;
      const fichier = nomAudio(id, v);
      if (dispoAudio[fichier] === false) { synthese(texte); return; }
      const dossier = options.dossierAudio || 'audio/fr/';
      const formats = dispoAudio[fichier] ? [dispoAudio[fichier]] : ['mp3', 'wav'];
      function essayer(i) {
        if (mon !== jetonVoix || arrete) return;
        if (i >= formats.length) { dispoAudio[fichier] = false; synthese(texte); return; }
        let passe = false;
        function suivant() { if (passe) return; passe = true; essayer(i + 1); }
        try {
          const a = new Audio(dossier + fichier + '.' + formats[i]);
          voixAudio = a;
          a.addEventListener('ended', function () { if (voixAudio === a) voixAudio = null; }, { once: true });
          a.addEventListener('error', function () { if (voixAudio === a) voixAudio = null; suivant(); }, { once: true });   // 🆕 fichier absent : la voix n'est pas « en cours »
          const lecture = a.play();
          if (lecture && lecture.then) lecture.then(function () { dispoAudio[fichier] = formats[i]; }).catch(function () { if (voixAudio === a) voixAudio = null; if (!dispoAudio[fichier]) suivant(); });
        } catch (e) { suivant(); }
      }
      essayer(0);
    }
    // 🆕 Le cœur : un petit cœur monte au-dessus de la tête de Bek, au moment où la voix commence une phrase (ou un mot) qui contient « aime ».
    function coeur() {
      if (arrete || !colBek) return;
      injecterStyle('m1-coeur-style', COEUR_CSS);
      try { if (getComputedStyle(colBek).position === 'static') colBek.style.position = 'relative'; } catch (e) {}
      const c = document.createElement('span');
      c.className = 'm1-coeur';
      c.setAttribute('aria-hidden', 'true');
      c.innerHTML = '<svg viewBox="0 0 32 30"><path d="M16 27C6 20 3 14.5 3 10.2 3 6.2 6 3.5 9.6 3.5c2.5 0 4.7 1.3 6.4 3.9 1.7-2.6 3.9-3.9 6.4-3.9C26 3.5 29 6.2 29 10.2 29 14.5 26 20 16 27Z"/></svg>';
      colBek.appendChild(c);
      planifier(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 2800);
    }
    const direMot = function (id) { dire(id, AFFICHE[id], id === 'aime' ? { coeur: true } : undefined); };
    const direPhrase = function (ph, tout_de_suite) {
      dire(ph.audio, ph.texte, { voix: ph.voix, version: ph.version, coeur: (ph.mots || []).indexOf('aime') !== -1 }, !tout_de_suite);
      bekParle();
    };

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
    function montrer(nom, instantane) {      // instantane : pas de fondu (alternance de la bouche)
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
      const ms = (reduit || !ancienne || instantane) ? 0 : 180;
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

    // ---------- Bek mange (boucle d'images) et Bek parle (bouche ouverte) ----------
    function mouvementReduit() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    function bouclePrete(cle) {
      const m = MANGER[cle];
      return !!(m && poses[m.bouchee] && m.mastique.every(function (n) { return poses[n]; }));
    }
    let jetonManger = 0;
    function pause(ms) { return new Promise(function (resolve) { planifier(resolve, ms); }); }   // durée réelle (pas raccourcie)
    // cycles : nombre de passages (absent = en boucle jusqu'à l'arrêt). Renvoie la fonction d'arrêt.
    function animerManger(cle, cycles) {
      const m = MANGER[cle];
      if (!m || mouvementReduit() || !bouclePrete(cle)) return function () {};
      const jeton = ++jetonManger;
      (async function boucle() {
        let n = 0;
        while (jeton === jetonManger && !arrete && (cycles === undefined || n < cycles)) {
          await pause(m.pause); if (jeton !== jetonManger) return;
          montrer(m.bouchee); await pause(m.msBouchee);
          for (let t = 0; t < m.tours * 2 && jeton === jetonManger; t++) { montrer(m.mastique[t % 2]); await pause(m.msMastique); }
          if (jeton !== jetonManger) return;
          montrer(m.base); n++;
        }
      })();
      return function () { if (jeton === jetonManger) jetonManger++; montrer(m.base); };
    }
    // 🆕 Bonne réponse : la voix dit la phrase. Si Bek était en train de manger en boucle (bouchée, mastication), on arrête la boucle et on la ramène
    // à la pose de repos, pour que sa bouche s'ouvre et se ferme avec la voix (bekParle) au lieu de continuer à mâcher.
    function coupeManger() {
      const n = nomPoseCourante();
      for (const k in MANGER) {
        const m = MANGER[k];
        if (!m || !m.base || !m.mastique) continue;
        if (n === m.base || n === m.bouchee || n === m.mastique[0] || n === m.mastique[1]) { jetonManger++; montrer(m.base, true); return; }
      }
    }
    async function bekDit(cle, ms) {      // bouche ouverte le temps de dire la phrase (si l'image existe)
      const m = MANGER[cle];
      if (!m || !poses[m.ouverte]) return;
      if (son.actif) { await attendre(ms || 1500); return; }     // 🆕 la voix a déjà fait bouger sa bouche (bekParle) : on laisse seulement le temps
      montrer(m.ouverte); await attendre(ms || 1500); montrer(m.base);
    }

    // 🆕 Exercice d'écoute. Par défaut : Bek nous regarde, la main sur la poitrine ; la bouche alterne ouverte/fermée tant qu'une voix est active
    // (fichier audio ou synthèse), puis reste fermée. Sans l'image « bouche ouverte » ou en mouvement réduit : la pose fixe.
    // Phrase avec « mange » + sandwich ou poutine (ou « Je mange. » seul : on alterne) : Bek tient l'aliment, dit la phrase (bouche ouverte/fermée),
    // puis MANGE une fois (bouchée, mastication) dès que la voix s'arrête. « Réécouter » recommence. Il faut toutes les images de la boucle (sinon : pose neutre).
    let jetonBouche = 0, derniereNourriture = null;
    let boucheActive = false, jetonParle = 0;     // boucheActive : l'exercice d'écoute pilote déjà la bouche (animerBouche)
    function arreterBouche() { jetonBouche++; boucheActive = false; }
    // 🆕 La banque de mots contient toujours tous les mots de la phrase demandée (sinon l'exercice serait impossible : « joue » manquait pour « Je joue. »)
    function banqueComplete(ph, liste) {
      const l = liste.slice();
      (ph.mots || []).forEach(function (id) { if (l.indexOf(id) === -1) l.push(id); });
      return l;
    }
    // 🆕 Les images « elle mange » existent-elles pour cet aliment ? (sandwich, poutine : boucle complète ; pizza : repos + bouche ouverte)
    function nourritureDispo(cle) {
      if (cle === 'pizza') return !!(poses['bek-pizza-repos'] && poses['bek-pizza-ouverte']);
      const m = MANGER[cle];
      return !!(m && bouclePrete(cle) && poses[m.base] && poses[m.ouverte]);
    }
    let dernierAime = null;
    function nourritureDe(ph) {
      const mots = ph.mots || [];
      const mange = mots.indexOf('mange') !== -1, manger = mots.indexOf('manger') !== -1;      // 🆕 « manger » (infinitif, « J'aime manger la poutine. ») aussi
      if (!mange && !manger) return null;
      if (mots.indexOf('sandwich') !== -1) return 'sandwich';
      if (mots.indexOf('poutine') !== -1) return 'poutine';
      if (mots.indexOf('pizza') !== -1) return 'pizza';    // 🆕 pizza : pas de mastication, mais la bouche bouge (repos / parle)
      if (manger) {                                        // 🆕 « J'aime manger. » : un aliment pour l'image, en alternance (sandwich, poutine, pizza), selon les images disponibles
        if (mots.length > 3) return null;
        const dispo = ['sandwich', 'poutine', 'pizza'].filter(nourritureDispo);
        if (!dispo.length) return null;
        const i = dispo.indexOf(dernierAime);
        dernierAime = i === -1 ? dispo[Math.floor(Math.random() * dispo.length)] : dispo[(i + 1) % dispo.length];
        return dernierAime;
      }
      if (mots.length > 2) return null;                    // un autre objet : pas d'animation, pose neutre
      derniereNourriture = derniereNourriture === 'sandwich' ? 'poutine'
        : (derniereNourriture === 'poutine' ? 'sandwich' : (Math.random() < 0.5 ? 'sandwich' : 'poutine'));
      return derniereNourriture;                           // « Je mange. » : sandwich puis poutine, en alternance
    }
    // 🆕 « Je regarde un film. », « J'aime regarder la télé. » : Bek regarde l'écran, télécommande en main (repos / parle, comme la pizza)
    function estFilm(ph) {
      const mots = (ph && ph.mots) || [];
      return mots.indexOf('film') !== -1 || mots.indexOf('tele') !== -1;
    }
    // 🆕 « Je regarde le sandwich. » : Bek tient son sandwich sans le manger (repos / parle, comme le film)
    function estRegardeSandwich(ph) {
      const mots = (ph && ph.mots) || [];
      return mots.indexOf('regarde') !== -1 && mots.indexOf('sandwich') !== -1;
    }
    // 🆕 « J'aime regarder la poutine. » : Bek tient sa poutine sans la manger (repos / parle, comme le sandwich regardé)
    function estRegardePoutine(ph) {
      const mots = (ph && ph.mots) || [];
      return (mots.indexOf('regarde') !== -1 || mots.indexOf('regarder') !== -1) && mots.indexOf('poutine') !== -1;
    }
    // une bouchée puis la mastication ; s'arrête si une voix repart (Réécouter) ; renvoie true si elle est allée au bout
    async function mangerUneFois(m, jeton) {
      montrer(m.bouchee, true); await pause(m.msBouchee);
      for (let t = 0; t < m.tours * 2; t++) {
        if (jeton !== jetonBouche || arrete || voixActive()) return false;
        montrer(m.mastique[t % 2], true); await pause(m.msMastique);
      }
      if (jeton !== jetonBouche || arrete) return false;
      montrer(m.base, true);
      return true;
    }
    function nomPoseCourante() { for (const n in poses) { if (poses[n] === courante) return n; } return null; }
    // 🆕 « Elle joue » : quand la voix s'arrête, Bek fait bouger sa poupée (cinq images, dans l'ordre, changement net), puis revient à la pose de repos.
    // Il faut les cinq images (sinon : rien, la bouche seule bouge). Elle s'arrête dès qu'une voix repart, qu'on change d'étape ou que l'exercice finit.
    const JOUER = { base: 'bek-aime-jouer', ouverte: 'bek-jouer-ouverte', images: ['bek-jouer-1', 'bek-jouer-2', 'bek-jouer-3', 'bek-jouer-4', 'bek-jouer-5'],
                    ms: 700, avant: 350 };
    function jeuPret() { return JOUER.images.every(function (n) { return poses[n]; }); }
    function dansJeu() { const n = nomPoseCourante(); return n === JOUER.base || n === JOUER.ouverte || JOUER.images.indexOf(n) !== -1; }
    function estJouer(ph) {
      const mots = (ph && ph.mots) || [];
      return mots.indexOf('jouer') !== -1 || mots.indexOf('joue') !== -1;
    }
    async function jouerPoupee(ok) {      // ok() : renvoie false dès qu'il faut s'arrêter
      if (mouvementReduit() || !jeuPret()) return;
      await pause(JOUER.avant);
      for (let i = 0; i < JOUER.images.length; i++) {
        if (!ok() || !dansJeu()) return;
        montrer(JOUER.images[i], true); await pause(JOUER.ms);
      }
      if (ok() && dansJeu()) montrer(JOUER.base, true);
    }
    // Pendant la voix : bouche ouverte / repos sur la pose en cours (si elle a une version ouverte), puis repos. Rien si une autre pose prend la main
    // (elle mange, autre étape) ou si l'exercice d'écoute pilote déjà la bouche.
    async function bekParle() {
      if (mouvementReduit() || boucheActive || !son.actif) return;
      if (JOUER.images.indexOf(nomPoseCourante()) !== -1) montrer(JOUER.base, true);     // 🆕 « Réécouter » en plein mouvement : retour au repos, puis la bouche
      const base = nomPoseCourante(), ouv = base && POSE_OUVERTE[base];
      if (!ouv || !poses[ouv]) return;
      const jeton = ++jetonParle, t0 = Date.now();
      let aParle = false, ouverte = false;
      while (jeton === jetonParle && !arrete && !boucheActive) {
        const actuelle = nomPoseCourante();
        if (actuelle !== base && actuelle !== ouv) return;
        const parle = voixActive();
        if (parle) aParle = true;
        if (aParle && !parle) {
          if (ouverte) montrer(base, true);
          if (base === JOUER.base) jouerPoupee(function () { return jeton === jetonParle && !arrete && !boucheActive && !voixActive(); });   // 🆕 puis elle joue avec sa poupée
          return;
        }
        if (!aParle && Date.now() - t0 > 2500) return;           // la voix n'est jamais venue
        const veut = parle && !ouverte;
        if (veut !== ouverte) { ouverte = veut; montrer(ouverte ? ouv : base, true); }
        await pause(170);
      }
    }
    async function animerBouche(phrase) {
      const cle = phrase ? nourritureDe(phrase) : null;
      const m = cle ? MANGER[cle] : null;
      const mange = !!(m && bouclePrete(cle) && poses[m.base] && poses[m.ouverte] && !mouvementReduit());
      const pizza = cle === 'pizza' && !!(poses['bek-pizza-repos'] && poses['bek-pizza-ouverte']);     // 🆕 elle tient sa pizza et la dit
      const film = !mange && !pizza && estFilm(phrase) && !!(poses['bek-regarde-film'] && poses['bek-film-ouverte']);   // 🆕 elle regarde l'écran et dit la phrase
      const regSand = !mange && !pizza && !film && estRegardeSandwich(phrase) && !!(poses['bek-regarde-sandwich'] && poses['bek-sandwich-regarde-ouverte']);   // 🆕 elle regarde son sandwich et dit la phrase
      const regPout = !mange && !pizza && !film && !regSand && estRegardePoutine(phrase) && !!(poses['bek-regarde-poutine'] && poses['bek-poutine-regarde-ouverte']);   // 🆕 elle regarde sa poutine et dit la phrase
      const jou = !mange && !pizza && !film && !regSand && !regPout && estJouer(phrase) && !!(poses[JOUER.base] && poses[JOUER.ouverte]);   // 🆕 elle tient sa poupée, dit la phrase, puis joue
      const base = mange ? m.base : (pizza ? 'bek-pizza-repos' : (film ? 'bek-regarde-film' : (regSand ? 'bek-regarde-sandwich' : (regPout ? 'bek-regarde-poutine' : (jou ? JOUER.base : 'bek-ecoute')))));
      const ouv = mange ? m.ouverte : (pizza ? 'bek-pizza-ouverte' : (film ? 'bek-film-ouverte' : (regSand ? 'bek-sandwich-regarde-ouverte' : (regPout ? 'bek-poutine-regarde-ouverte' : (jou ? JOUER.ouverte : 'bek-ecoute-ouverte')))));
      if (!poses[base]) return;
      const jeton = ++jetonBouche;
      boucheActive = true;
      let ouverte = false, premiere = true, aParle = false;
      while (jeton === jetonBouche && !arrete) {
        const parle = voixActive();
        if (parle) aParle = true;
        if (mange && aParle && !parle) {                   // la voix vient de s'arrêter : elle mange
          aParle = false; ouverte = false;
          await pause(300); if (jeton !== jetonBouche) return;
          await mangerUneFois(m, jeton);
          continue;
        }
        if (jou && aParle && !parle) {                     // 🆕 la voix vient de s'arrêter : elle joue avec sa poupée
          aParle = false; ouverte = false;
          montrer(base, true);
          await jouerPoupee(function () { return jeton === jetonBouche && !arrete && !voixActive(); });
          continue;
        }
        const veut = !!(poses[ouv] && !mouvementReduit() && parle) && !ouverte;
        if (premiere || veut !== ouverte) {
          ouverte = veut;
          montrer(ouverte ? ouv : base, !premiere);
          premiere = false;
        }
        await pause(170);
      }
    }

    // ---------- Le Lecteur : indices, piques ----------
    let lectMinuteur = null;
    // ---------- Mots français cliquables dans les textes du Lecteur ----------
    // Un mot français placé entre guillemets (« je », “sandwich”, «\u00a0poutine\u00a0»…) devient cliquable/touchable
    // (et accessible au clavier : Tab puis Entrée ou Espace) : la voix de Bek le prononce. Marche dans toutes les langues,
    // puisque seul le mot entre guillemets doit être l'un des mots de AFFICHE.
    const MOT_CLIC_CSS = '.m1-mot-clic{cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px;border-radius:4px;padding:0 .08em}' +
      '.m1-mot-clic:hover{background:rgba(240,169,139,.28)}.m1-mot-clic:focus-visible{outline:2px solid #E08867;outline-offset:1px}';
    function idDuMot(txt) {
      const cle = String(txt).trim().toLowerCase().replace(/\u2019/g, "'");
      for (const id in AFFICHE) { if (AFFICHE[id].toLowerCase().replace(/\u2019/g, "'") === cle) return id; }
      return null;
    }
    function rendreCliquable(el, id) {
      injecterStyle('m1-motclic-style', MOT_CLIC_CSS);
      el.classList.add('m1-mot-clic');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('title', '\u266A');
      el.addEventListener('click', function (e) { e.stopPropagation(); direMot(id); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); direMot(id); }
      });
    }
    function remplirCliquable(el, texte) {
      el.textContent = '';
      const re = /([\u00ab\u201c\u201e\u300c\u300e"])(\s*)([^\u00ab\u00bb\u201c\u201d\u201e\u300c\u300d\u300e\u300f"\n]{1,24}?)(\s*)([\u00bb\u201d\u201c\u300d\u300f"])/g;
      let dernier = 0, m;
      while ((m = re.exec(texte)) !== null) {
        const id = idDuMot(m[3]);
        if (!id) continue;
        el.appendChild(document.createTextNode(texte.slice(dernier, m.index) + m[1] + m[2]));
        const mot = document.createElement('span');
        mot.textContent = m[3];
        rendreCliquable(mot, id);
        el.appendChild(mot);
        el.appendChild(document.createTextNode(m[4] + m[5]));
        dernier = m.index + m[0].length;
      }
      el.appendChild(document.createTextNode(texte.slice(dernier)));
    }

    // 🆕 Astuce rappelable : la dernière astuce de l'étape en cours (durée >= 5 s : les « piques » de réaction, plus courtes, ne le sont pas).
    //   Une fois la bulle retirée, l'icône du Lecteur reste cliquable (« repos ») ; un nouvel écran d'étape (etape()) l'oublie.
    let astuceRappel = null, indiceActif = false;
    const lectIcone = q('.m1-lect-icone');
    function lecteurAfficher(texte, avecSuite) {
      if (lectMinuteur) { clearTimeout(lectMinuteur); lectMinuteur = null; }
      remplirCliquable(lectTexte, texte);
      lectSuite.classList.toggle('m1-off', !avecSuite);
      q('.m1-lect-bulle').classList.toggle('m1-sans-suite', !avecSuite);
      lectZone.classList.remove('m1-lect-repos');
      iconeRappel(false);
      lectZone.classList.remove('m1-off');
      planifier(function () { lectZone.classList.add('m1-lect-visible'); }, 30);
    }
    function iconeRappel(oui) {          // l'icône du Lecteur devient un bouton (clavier compris) tant qu'une astuce peut être revue
      if (!lectIcone) return;
      if (oui && astuceRappel) { lectIcone.setAttribute('role', 'button'); lectIcone.setAttribute('tabindex', '0'); lectIcone.setAttribute('aria-label', astuceRappel.texte); }
      else { lectIcone.removeAttribute('role'); lectIcone.removeAttribute('tabindex'); lectIcone.removeAttribute('aria-label'); }
    }
    function lecteurMasquer() {
      lectZone.classList.remove('m1-lect-visible');
      indiceActif = false;
      if (astuceRappel) {                // la bulle part, l'icône reste : un clic revoit l'astuce
        lectZone.classList.remove('m1-off'); lectZone.classList.add('m1-lect-repos'); iconeRappel(true);
        return;
      }
      lectMinuteur = setTimeout(function () { if (!arrete) lectZone.classList.add('m1-off'); }, 450);
      minuteurs.push(lectMinuteur);
    }
    function oublierAstuce() {           // nouvelle étape : l'astuce de la précédente n'a plus lieu d'être rappelée
      astuceRappel = null; iconeRappel(false);
      if (lectZone.classList.contains('m1-lect-repos')) { lectZone.classList.remove('m1-lect-repos'); lectZone.classList.add('m1-off'); }
    }
    function lecteurDit(texte) {          // avec « Suite » : l'élève lit à son rythme
      return new Promise(function (resolve) {
        indiceActif = false;
        lecteurAfficher(texte, true);
        lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); };
      });
    }
    function dureeIndice(texte, ms, rappelable) {   // une astuce reste le temps de la lire (≈ 75 ms par caractère) ; plafond 14 s
      const base = ms || 4500;
      return rappelable ? Math.min(14000, Math.max(base, 2800 + String(texte).length * 75)) : base;
    }
    function programmerRetrait(duree) {
      if (lectMinuteur) clearTimeout(lectMinuteur);
      lectMinuteur = setTimeout(function () { if (!arrete) lecteurMasquer(); }, duree);
      minuteurs.push(lectMinuteur);
    }
    function lecteurIndice(texte, ms, rappel) {   // sans « Suite » : se retire tout seul ; rappel (défaut : durée >= 5 s) : l'icône permet de la revoir
      const rappelable = rappel !== undefined ? !!rappel : (ms || 0) >= 5000;
      if (rappelable) astuceRappel = { texte: texte, ms: ms };
      indiceActif = true;
      lecteurAfficher(texte, false);
      programmerRetrait(dureeIndice(texte, ms, rappelable));
    }
    // la bulle reste tant qu'on la survole (souris) ; elle repart 2,5 s après qu'on la quitte
    q('.m1-lect-bulle').addEventListener('mouseenter', function () { if (indiceActif && lectMinuteur) { clearTimeout(lectMinuteur); lectMinuteur = null; } });
    q('.m1-lect-bulle').addEventListener('mouseleave', function () { if (indiceActif && !lectMinuteur && lectZone.classList.contains('m1-lect-visible')) programmerRetrait(2500); });
    // clic (ou Entrée / Espace) sur l'icône : on revoit l'astuce ; si la bulle est déjà là, on la range
    function rappelerAstuce() {
      if (!astuceRappel || arrete) return;
      if (lectZone.classList.contains('m1-lect-visible') && indiceActif) { if (lectMinuteur) clearTimeout(lectMinuteur); lecteurMasquer(); return; }
      lecteurIndice(astuceRappel.texte, astuceRappel.ms, true);
    }
    if (lectIcone) {
      lectIcone.addEventListener('click', function () { if (lectZone.classList.contains('m1-lect-repos')) rappelerAstuce(); });
      lectIcone.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && lectZone.classList.contains('m1-lect-repos')) { e.preventDefault(); rappelerAstuce(); } });
    }
    function auHasard(liste) { return liste[Math.floor(Math.random() * liste.length)]; }

    // ---------- Aides d'affichage ----------
    function consigne(txt) { elConsigne.textContent = txt; }
    // 🆕 retour en arrière : segCourant = étape en cours, ecrans = nombre d'écrans déjà affichés dans cette étape (un vider() par écran)
    let segCourant = 0, ecrans = 0, finie = false;
    function majRetour() {
      if (!boutonRetour) return;
      boutonRetour.disabled = finie || (segCourant === 0 && ecrans <= 1);
    }
    function reculer() {
      if (arrete || finie || !boutonRetour || boutonRetour.disabled) return;
      if (scene.querySelector('.m1-quitter-voile')) return;
      // déjà plus loin que le premier écran de l'étape : on la rejoue ; sinon on revient à la précédente
      const cible = (ecrans > 1 || segCourant === 0) ? segCourant : segCourant - 1;
      if (typeof options._reculer === 'function') options._reculer(cible);
    }
    function vider() { ecrans++; majRetour(); couperVoix(); saisieFermer(); zone.innerHTML = ''; actions.innerHTML = ''; zone.removeAttribute('data-mode'); zone.removeAttribute('data-phrase'); }
    function etape(n) {
      if (arrete) return;   // 🆕 une ancienne scène (après un retour en arrière) ne doit plus rien signaler
      oublierAstuce();       // 🆕 l'astuce de l'étape précédente n'est plus rappelable
      Array.prototype.forEach.call(segs, function (s, i) { s.classList.toggle('m1-segment-fait', i < n); });
      // 🆕 n segments sont faits : c'est un point de reprise (jamais 0, jamais la fin)
      if (n > 0 && n < nbEtapes && typeof callbacks.onPosition === 'function') {
        try { callbacks.onPosition({ fragment: fragment, segment: n }); } catch (e) { console.warn('onPosition a échoué.', e); }
      }
    }
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
      b.className = 'm1-tuile m1-role-' + ROLE[id] + (ART[id] ? ' m1-art-' + ART[id] : '') + (classe ? ' ' + classe : '');
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
    // 🆕 (07-11-2026) Bouton « Réécouter » (la phrase entière) sur tous les écrans d'exercice : lecture, ordre, écriture, construction.
    // Même bouton que dans l'exercice audio (.m1-ecoute / .m1-haut-parleur) ; un clic rallume le son s'il avait été coupé.
    function creerEcoute(phrase) {
      const bloc = document.createElement('div');
      bloc.className = 'm1-ecoute';
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'm1-haut-parleur'; b.setAttribute('aria-label', T('reecouter'));
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg><span>' + echapper(T('reecouter')) + '</span>';
      b.addEventListener('click', function () { reactiverSon(); direPhrase(phrase, true); });
      bloc.appendChild(b);
      return bloc;
    }
    async function lecture(phrase, cle) {
      vider();
      zone.setAttribute('data-mode', 'lecture'); zone.setAttribute('data-phrase', cle);
      injecterStyle('m1-lecture-style', LECTURE_CSS);
      // 🆕 À toucher pour continuer : les mots nouveaux de ce fragment, pas encore touchés. Les autres : facultatif (révision).
      const aToucher = phrase.mots.filter(function (m) { return MOTS_DU_FRAGMENT.indexOf(m) !== -1 && !motsVus[m]; });
      const sens = document.createElement('p');
      sens.className = 'm1-sens';
      sens.innerHTML = '&nbsp;';
      const ligne = ligneGroupes(phrase, function (id) {
        const b = tuile(id, 'm1-tuile-lue' + (MOTS_DU_FRAGMENT.indexOf(id) !== -1 ? ' m1-tuile-nouveau' : '') + (motsVus[id] ? ' m1-tuile-vue' : ''));
        const etat = document.createElement('span');
        etat.className = 'm1-etat'; etat.setAttribute('aria-hidden', 'true');
        etat.textContent = motsVus[id] ? '\u2713' : '\u2726';
        b.appendChild(etat);
        b.addEventListener('click', function () {
          direMot(id);
          motsVus[id] = true;
          // toutes les tuiles de ce mot (une phrase peut le répéter) passent à « touché »
          Array.prototype.forEach.call(ligne.querySelectorAll('.m1-tuile'), function (t) {
            t.classList.toggle('m1-tuile-choisie', t === b);
            if (t.getAttribute('data-id') === id) { t.classList.add('m1-tuile-vue'); const e = t.querySelector('.m1-etat'); if (e) e.textContent = '\u2713'; }
          });
          sens.textContent = AFFICHE[id] + ' = ' + T('sens_' + id);
          if (aToucher.every(function (m) { return motsVus[m]; })) ouvrirSuite();
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
      zone.insertBefore(creerEcoute(phrase), zone.firstChild);
      await attendre(300);
      direPhrase(phrase);
      if (!aToucher.length) ouvrirSuite();            // aucun mot nouveau dans cette phrase : on peut continuer tout de suite (les mots restent touchables)
      await promesse;
    }

    // 🆕 Piques du Lecteur quand on choisit le mauvais mot (articles, verbes). Renvoie null si rien de précis.
    const ART = { un: 'i', une: 'i', le: 'd', la: 'd' };    // i = indéfini, d = défini
    function quipChoix(id, attendu) {
      if (fragment === 4 || fragment === 5) {
        if (id === 'je' && attendu === 'j') return T('quipJe');
        if ((id === 'mange' && attendu === 'manger') || (id === 'regarde' && attendu === 'regarder')) return T('quipInf');
        if (fragment === 4) return null;
      }
      if (ART[id] && ART[attendu]) {
        // fragment 3 : les piques propres à un/une (« Un film, pas une ») restent ; le/la utilisent les piques génériques
        if (fragment === 2 || fragment === 5 || (fragment === 3 && (ART[id] === 'd' || ART[attendu] === 'd'))) {
          if (ART[id] !== ART[attendu]) return T(ART[attendu] === 'd' ? 'quipDef' : 'quipIndef');
          return T(attendu === 'le' ? 'quipLe' : attendu === 'la' ? 'quipLa' : attendu === 'une' ? 'quipUne2' : 'quipUn2');
        }
        if (id === 'un' && attendu === 'une') return T('quipUne');
        if (id === 'une' && attendu === 'un') return T('quipUn');
      }
      if (id === 'mange' && attendu === 'regarde') return T('quipVerbe');
      return null;
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
            c.className = 'm1-case m1-case-pleine m1-role-' + ROLE[id] + (ART[id] ? ' m1-art-' + ART[id] : '');
            c.textContent = AFFICHE[id];
            direMot(id);
            if (ART[id]) etalSignal();
            suivant++;
            erreurs = 0;
            if (suivant === phrase.mots.length) {
              verrou = true;
              planifier(function () { direPhrase(phrase); lecteurIndice(auHasard(T('quipOk')), 2200); }, 400);
              finApresVoix(fini, 1300);
            }
          } else {
            erreurs++;
            secouer(t);
            lecteurIndice(quipChoix(id, attendu) || auHasard(T('quipErreur')), 4200);
            if (erreurs >= 2) {      // la bonne tuile se met à briller
              const bonne = plateau.querySelector('.m1-tuile[data-id="' + attendu + '"]:not(.m1-tuile-partie)');
              if (bonne) bonne.classList.add('m1-indice');
            }
          }
        });
        plateau.appendChild(t);
      });
      zone.insertBefore(creerEcoute(phrase), zone.firstChild);
      saisieOuvrir({
        tuiles: function () { return Array.prototype.slice.call(plateau.querySelectorAll('.m1-tuile:not(.m1-tuile-partie)')); },
        cible: function () { return cases[suivant]; },
        actif: function () { return !verrou; }
      });
      await promesse;
      saisieFermer();
    }

    // ---------- 3. Écriture : quelques mots (cloze) ou la phrase entière ----------
    async function ecrire(phrase, cle, manquants, sansTraduction) {
      vider();
      zone.setAttribute('data-mode', 'ecrire'); zone.setAttribute('data-phrase', cle);
      const cloze = !!manquants;
      const champs = [];
      let champPhrase = null;
      if (!sansTraduction) { const tr = ligneTraduction(phrase); if (tr) zone.appendChild(tr); }
      // 🆕 « j’ » + verbe, tous deux à écrire : UNE seule case (« j’aime »), avec les deux étiquettes sujet | verbe
      const kF = cloze ? phrase.mots.findIndex(function (id, i) { return id === 'j' && manquants.indexOf(i) !== -1 && manquants.indexOf(i + 1) !== -1; }) : -1;
      function texteAttendu(c) {
        const i = Number(c.getAttribute('data-idx')), f = c.getAttribute('data-fin');
        return AFFICHE[phrase.mots[i]] + (f ? AFFICHE[phrase.mots[Number(f)]] : '');
      }
      function couleurRole(r) {
        try {
          const t = document.createElement('input'); t.className = 'm1-champ m1-role-' + r; t.style.cssText = 'position:absolute;visibility:hidden';
          zone.appendChild(t); const c = getComputedStyle(t).borderTopColor; zone.removeChild(t); return c;
        } catch (e) { return '#4A3B33'; }
      }
      if (cloze) {
        let rang = 0;
        const ligne = ligneGroupes(phrase, function (id) {
          const idx = rang++;
          if (manquants.indexOf(idx) === -1) { const s = tuile(id, 'm1-tuile-donnee'); s.disabled = true; return s; }
          if (kF !== -1 && idx === kF + 1) { const vide = document.createElement('span'); vide.className = 'm1-fusion-vide'; return vide; }   // sa case est celle de « j’ »
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.className = 'm1-champ m1-role-' + ROLE[id] + (idx === kF ? ' m1-champ-fusion' : '');
          if (idx === kF) {
            inp.setAttribute('data-fin', String(kF + 1));
            inp.style.setProperty('--m1-cs', couleurRole('s')); inp.style.setProperty('--m1-cv', couleurRole('v'));
          }
          inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false;
          inp.setAttribute('data-idx', String(idx));
          inp.size = idx === kF ? Math.max(AFFICHE[id].length + AFFICHE[phrase.mots[kF + 1]].length + 2, 8) : Math.max(AFFICHE[id].length, 4);
          champs.push(inp);
          return inp;
        });
        if (kF !== -1) {                      // les deux groupes (sujet, verbe) deviennent un seul bloc : étiquettes côte à côte, une case dessous
          injecterStyle('m1-fusion-style', FUSION_CSS);
          const cF = champs.filter(function (c) { return c.getAttribute('data-fin'); })[0];
          const bloc0 = cF && cF.closest('.m1-groupe'), bloc1 = bloc0 && bloc0.nextElementSibling;
          if (bloc0 && bloc1 && bloc1.querySelector('.m1-fusion-vide')) {
            const etiq = document.createElement('div'); etiq.className = 'm1-fusion-etiq';
            etiq.appendChild(bloc0.querySelector('.m1-role')); etiq.appendChild(bloc1.querySelector('.m1-role'));
            bloc0.classList.add('m1-groupe-fusion'); bloc0.insertBefore(etiq, bloc0.firstChild);
            bloc1.parentNode.removeChild(bloc1);
          }
        }
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
        coupeManger();
        direPhrase(phrase);
        lecteurIndice(auHasard(T('quipOk')), 2200);
        finApresVoix(fini, 1300);
      }
      function verifier() {
        if (termine) return;
        let toutBon = true, pires = 'accent';
        if (cloze) {
          champs.forEach(function (c) {
            const donne = normaliser(c.value);
            const attenduN = normaliser(texteAttendu(c));
            const bon = donne === attenduN;
            c.classList.toggle('m1-ok', bon); c.classList.toggle('m1-ko', !bon);
            if (!bon) {
              toutBon = false;
              const pr = proche(donne, attenduN);
              if (!pr) pires = null; else if (pr === 'apostrophe' && pires) pires = 'apostrophe';
            }
          });
        } else {
          const donne = normaliser(champPhrase.value);
          const attendu = normaliser(phrase.texte);
          toutBon = donne === attendu;
          if (!toutBon) pires = proche(donne, attendu);
          champPhrase.classList.toggle('m1-ok', toutBon); champPhrase.classList.toggle('m1-ko', !toutBon);
        }
        if (toutBon) { termineBien(); return; }
        if (pires) { lecteurIndice(T(pires === 'accent' ? 'quipAccent' : 'quipApostrophe'), 4200); return; }   // pas une vraie erreur
        erreurs++;
        secouer(cloze ? champs[0].parentNode : champPhrase);
        lecteurIndice(auHasard(T('quipErreur')), 4200);
        if (erreurs === 2) {             // indice : les premières lettres
          indice.textContent = phrase.mots.map(function (id) { return AFFICHE[id].charAt(0) + '…'; }).join(' ');
        }
        if (erreurs >= 3) {              // la réponse apparaît ; on ne bloque pas l'élève
          termine = true;
          bValider.disabled = true;
          if (cloze) champs.forEach(function (c) { c.value = texteAttendu(c); c.classList.add('m1-ok'); c.classList.remove('m1-ko'); });
          else { champPhrase.value = phrase.texte; champPhrase.classList.add('m1-ok'); champPhrase.classList.remove('m1-ko'); }
          lecteurIndice(T('quipReponse'), 4200);
          coupeManger();
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      }
      bValider.addEventListener('click', verifier);
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verifier(); } });
      zone.insertBefore(creerEcoute(phrase), zone.firstChild);
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
      melanger(banqueComplete(phrase, options2.banque || banqueDefaut)).forEach(function (id) {
        const t = tuile(id);
        t.addEventListener('click', function () {
          if (termine || t.classList.contains('m1-tuile-partie')) return;
          t.classList.add('m1-tuile-partie');
          t.classList.remove('m1-indice');
          choisis.push(id);
          if (options2.direAuClic !== false) direMot(id);
          if (ART[id]) etalSignal();
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
          coupeManger();
          direPhrase(phrase);
          lecteurIndice(auHasard(T('quipOk')), 2200);
          finApresVoix(fini, 1400);
          return;
        }
        erreurs++;
        secouer(plateauPhrase);
        const uneMalPlacee = phrase.mots.indexOf('une') !== -1 && choisis.indexOf('un') !== -1;
        const filmMange = choisis.indexOf('film') !== -1 && choisis.indexOf('mange') !== -1;
        const unMalPlace = phrase.mots.indexOf('film') !== -1 && choisis.indexOf('une') !== -1;
        let quipArt = null;
        if (fragment === 2 || fragment === 3 || fragment === 4) {      // l'article / l'élision / l'infinitif qui ne va pas : une pique précise (indéfini/défini, masculin/féminin)
          for (let i = 0; i < phrase.mots.length && i < choisis.length; i++) {
            if (choisis[i] !== phrase.mots[i]) {
              if (fragment !== 3 || ART[choisis[i]] === 'd' || ART[phrase.mots[i]] === 'd') quipArt = quipChoix(choisis[i], phrase.mots[i]);
              break;
            }
          }
        }
        lecteurIndice(quipArt || (fragment === 2 || fragment === 4 ? auHasard(T('quipErreur'))
          : filmMange ? T('quipFilmMange') : uneMalPlacee ? T('quipUne') : unMalPlace ? T('quipUn') : auHasard(T('quipErreur'))), 4200);
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
          coupeManger();
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      });
      rafraichir();
      if (!options2.sansEcoute) zone.insertBefore(creerEcoute(phrase), zone.firstChild);   // l'exercice audio a déjà son propre bouton
      saisieOuvrir({
        tuiles: function () { return Array.prototype.slice.call(banque.querySelectorAll('.m1-tuile:not(.m1-tuile-partie)')); },
        cible: function () { return plateauPhrase; },
        cadre: plateauPhrase,
        actif: function () { return !termine; },
        entree: function () { if (!bValider.disabled) bValider.click(); },
        retour: function () {
          if (termine || !choisis.length) return;
          const id = choisis.pop();
          const orig = banque.querySelector('.m1-tuile[data-id="' + id + '"].m1-tuile-partie');
          if (orig) orig.classList.remove('m1-tuile-partie');
          rafraichir();
        }
      });
      await promesse;
      saisieFermer();
    }

    // ---------- Carte « Savais-tu ? » / remarque ----------
    async function carte(titre, texte, visuel) {
      vider();
      zone.setAttribute('data-mode', 'carte');
      const c = document.createElement('div');
      c.className = 'm1-note';
      if (visuel) c.appendChild(visuel);
      const h = document.createElement('p'); h.className = 'm1-note-titre'; h.textContent = titre;
      const p = document.createElement('p'); p.className = 'm1-note-texte'; remplirCliquable(p, texte);
      c.appendChild(h); c.appendChild(p);
      zone.appendChild(c);
      await boutonAction(T('continuer'));
    }
    function pairesE(liste) {          // parl|e  mang|e : le -e est surligné
      const d = document.createElement('div');
      d.className = 'm1-paire';
      (liste || [['parl', 'e'], ['mang', 'e']]).forEach(function (p) {
        const s = document.createElement('span');
        s.className = 'm1-radical';
        s.innerHTML = '<b>je</b> ' + echapper(p[0]) + '<i>' + echapper(p[1]) + '</i>';
        const idVerbe = idDuMot(p[0] + p[1]);               // parl|e → « parle » : touche pour l'entendre
        if (idVerbe) rendreCliquable(s, idVerbe);
        d.appendChild(s);
      });
      return d;
    }

    // ---------- Les étapes ----------
    async function etapeMange() {
      etape(0); montrer('bek-mange-sandwich');     // 🆕 premier écran : Bek tient son sandwich et le mange (en boucle) au lieu de rester immobile
      animerManger('sandwich');                     // (sans les images de la boucle : pose fixe, comme avant ; l'étape suivante coupe la boucle)
      consigne(T('c_mange'));
      await lecture(PHRASES.mange, 'mange');
      await carte(T('noteE_titre'), T('noteE'), pairesE());
    }
    async function etapePhrase(cle, n) {
      etape(n);
      const ph = PHRASES[cle];
      montrer(cle === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      animerManger(cle, 1);                 // un seul cycle : elle mange pendant qu'on lit, puis pose fixe
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
      const arreter = animerManger(cle);    // elle mange en boucle tant que l'élève cherche
      if (cle === 'sandwich') await construire(PHRASES.sandwich, 'image-sandwich');
      else await ecrire(PHRASES.poutine, 'image-poutine', null, true);
      arreter();
      await bekDit(cle, 1500);              // bonne réponse : elle dit la phrase (bouche ouverte)
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
      bEcoute.addEventListener('click', function () { reactiverSon(); direPhrase(phrase, true); });
      const lienTexte = document.createElement('button');
      lienTexte.type = 'button'; lienTexte.className = 'm1-lien'; lienTexte.textContent = T('sans_son');
      const texteRevele = document.createElement('p');
      texteRevele.className = 'm1-texte-revele m1-off';
      texteRevele.textContent = phrase.texte;
      lienTexte.addEventListener('click', function () { texteRevele.classList.remove('m1-off'); lecteurIndice(T('quipSansSon'), 3500); });
      entete.appendChild(bEcoute); entete.appendChild(lienTexte); entete.appendChild(texteRevele);
      const attente = construireSimple(phrase, cle, { direAuClic: false, sansEcoute: true });
      zone.insertBefore(entete, zone.firstChild);     // construire() vient de remplir la zone (synchrone jusqu'au premier await)
      reactiverSon();                       // 🆕 l'écoute est le but de l'exercice : le son est rallumé si l'élève l'avait coupé ailleurs
      animerBouche(phrase);                 // 🆕 pose neutre « écoute-moi » (bouche mobile pendant la voix) ; « Je mange… » : elle tient l'aliment, parle, puis mange ; pizza, film, télé : elle garde sa pose et parle
      planifier(function () { direPhrase(phrase); }, 400);
      await attente;
      arreterBouche();
    }

    // ---------- 🆕 L'étal : « un parmi plusieurs » (nouveau) → « celui-là » (connu) ----------
    // mode 'nouveau' : trois objets pareils, pastille pêche « un/une » ; mode 'connu' : un seul reste en valeur (halo bleu), pastille « le/la ».
    // Sans argument : on retire l'étal. Le même objet garde son élément d'un mode à l'autre : le passage s'anime.
    let etalEl = null, minuteurEtal = null, etalEnBoucle = false;
    function etal(objet, mode) {          // appel venu d'une étape : il arrête toute boucle en cours
      clearTimeout(minuteurEtal); etalEnBoucle = false;
      etalPoser(objet, mode);
    }
    // 🆕 En boucle (carte « Remarque ») : « un » (pause) → « le » (pause) → « un »… jusqu'à ce que l'étape change. Sans animation : un seul passage.
    function etalBoucle(objet) {
      clearTimeout(minuteurEtal); etalEnBoucle = true;
      etalPoser(objet, 'nouveau');
      if (reduit) return;
      const el = etalEl;
      (function tour() {
        minuteurEtal = planifier(function () {
          if (etalEl !== el || !etalEnBoucle) return;
          etalPoser(objet, el.classList.contains('m1-etal-connu') ? 'nouveau' : 'connu');
          tour();
        }, ETAL_PAUSE);
      })();
    }
    function etalPoser(objet, mode) {
      if (!objet || !mode || !DESSINS[objet] || !ETAL_ART[objet]) {
        clearTimeout(minuteurEtal); etalEnBoucle = false;
        if (etalEl && etalEl.parentNode) etalEl.parentNode.removeChild(etalEl);
        etalEl = null;
        return;
      }
      injecterStyle('m1-etal-style', ETAL_CSS);
      if (!etalEl || etalEl.getAttribute('data-objet') !== objet || !etalEl.parentNode) {
        if (etalEl && etalEl.parentNode) etalEl.parentNode.removeChild(etalEl);
        const el = document.createElement('div');
        el.className = 'm1-etal';
        el.setAttribute('aria-hidden', 'true');
        el.setAttribute('data-objet', objet);
        let h = '<div class="m1-etal-objets">';
        for (let i = 0; i < 3; i++) h += '<span class="m1-etal-objet"><svg viewBox="0 0 80 80">' + DESSINS[objet] + '</svg></span>';
        el.innerHTML = h + '</div><span class="m1-etal-pastille"></span>';
        zone.parentNode.insertBefore(el, zone);        // toujours dans la carte, au-dessus de la phrase (jamais sous les pieds de Bek)
        // un clic rejoue, puis l'étal revient à l'état où il était (il doit toujours dire la même chose que la phrase) :
        //   « le / la » → « un parmi plusieurs », une pause, puis « celui-là » ; « un / une » → les trois objets réapparaissent ; en boucle → on repart
        el.addEventListener('click', function () {
          if (etalEl !== el) return;
          if (etalEnBoucle) { etalBoucle(objet); return; }
          clearTimeout(minuteurEtal);
          if (el.classList.contains('m1-etal-connu')) {
            etalPoser(objet, 'nouveau');
            minuteurEtal = planifier(function () { if (etalEl === el) etalPoser(objet, 'connu'); }, ETAL_PAUSE);
          } else {
            Array.prototype.forEach.call(el.querySelectorAll('.m1-etal-objet'), function (o) { o.style.animation = 'none'; void o.offsetWidth; o.style.animation = ''; });
          }
        });
        etalEl = el;
      }
      const avant = etalEl.classList.contains('m1-etal-connu') ? 'connu' : (etalEl.classList.contains('m1-etal-nouveau') ? 'nouveau' : '');
      etalEl.classList.toggle('m1-etal-nouveau', mode === 'nouveau');
      etalEl.classList.toggle('m1-etal-connu', mode === 'connu');
      etalEl.querySelector('.m1-etal-pastille').textContent = ETAL_ART[objet][mode === 'connu' ? 1 : 0];
      if (avant && avant !== mode) etalSignal();        // le mot de la pastille change : elle pulse pour qu'on le remarque
    }
    function etalSignal() {              // un article vient d'être posé dans la phrase : la pastille pulse
      if (!etalEl || reduit) return;
      etalEl.classList.remove('m1-etal-pulse'); void etalEl.offsetWidth; etalEl.classList.add('m1-etal-pulse');
    }

    // ---------- 🆕 Fragment 2 : un/une, le/la ----------
    function pairesArticles(liste) {     // un sandwich → le sandwich : l'article est surligné
      const d = document.createElement('div');
      d.className = 'm1-paire m1-paire-art';
      liste.forEach(function (p) {
        const sp = document.createElement('span');
        sp.className = 'm1-radical';
        sp.innerHTML = '<b>' + echapper(p[0]) + '</b> ' + echapper(p[1]) + ' &rarr; <i>' + echapper(p[2]) + '</i> ' + echapper(p[1]);
        d.appendChild(sp);
      });
      return d;
    }
    async function etapeArticles() {
      etape(0); montrer('bek-mange-sandwich');
      etal('sandwich', 'connu');
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(T('quipLeSandwich'), 5500); }, 1500);
      await lecture(PHRASES.sandwichle, 'sandwichle');
      etalBoucle('sandwich');                                        // la remarque : un parmi plusieurs… une vraie pause… celui-là… et on recommence
      await carte(T('noteL_titre'), T('noteL'), pairesArticles([['un', 'sandwich', 'le'], ['une', 'poutine', 'la']]));
    }
    async function etapePoutineLa() {
      etape(1); montrer('bek-mange-poutine');
      etal('poutine', 'connu');
      animerManger('poutine', 1);
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(T('quipLaPoutine'), 5500); }, 1500);
      await lecture(PHRASES.poutinela, 'poutinela');
      consigne(T('c_ordre'));
      await ordre(PHRASES.poutinela, 'poutinela', ['le', 'une']);
      consigne(T('c_ecrire_part'));
      await ecrire(PHRASES.poutinela, 'poutinela', [2]);          // on écrit l'article
    }
    async function etapePizza() {
      etape(2); montrer('bek-mange-pizza');
      etal('pizza', 'nouveau');
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(T('quipPizza'), 5500); }, 1500);
      await lecture(PHRASES.pizzaune, 'pizzaune');
      consigne(T('c_ordre'));
      await ordre(PHRASES.pizzaune, 'pizzaune', ['un']);
      etal('pizza', 'connu');                                        // même pizza, maintenant connue
      await ordre(PHRASES.pizzala, 'pizzala', ['le', 'une']);     // même pizza, maintenant connue
      consigne(T('c_ecrire'));
      await ecrire(PHRASES.pizzala, 'pizzala', null);
      etal(null);                                                    // la carte culture n'a pas besoin de l'étal
      await carte(T('cult_titre'), T('cult_pizza'));
    }
    // Une chose NOUVELLE (un/une), puis la MÊME chose, maintenant connue (le/la).
    async function etapeNouveauConnu(n, objet) {
      const nouveau = PHRASES[objet], connu = PHRASES[objet === 'sandwich' ? 'sandwichle' : 'poutinela'];
      etape(n); montrer(objet === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      etal(objet, 'nouveau');
      consigne(T('c_nouveau'));
      planifier(function () { lecteurIndice(T('quipNouveau'), 5000); }, 800);
      await construire(nouveau, 'nouveau-' + objet, { banque: BANQUE_2 });
      etal(objet, 'connu');
      consigne(T('c_connu'));
      planifier(function () { lecteurIndice(T('quipConnu'), 5000); }, 800);
      const arreter = animerManger(objet);
      await construire(connu, 'connu-' + objet, { banque: BANQUE_2 });
      arreter();
      await bekDit(objet, 1500);
    }

    // ---------- 🆕 Fragment 3 (anciennement 2) : « regarder » ----------
    async function etapeRegarde() {
      etape(0); montrer('bek-observe');
      consigne(T('c_mange'));
      await lecture(PHRASES.regarde, 'regarde');
      await carte(T('noteR_titre'), T('noteR'), pairesE([['regard', 'e'], ['mang', 'e']]));
    }
    async function etapeRegardePhrase(cle, n) {
      etape(n);
      const ph = PHRASES[cle];
      montrer(cle === 'film' ? 'bek-regarde-film' : 'bek-regarde-poutine');
      etal(cle === 'film' ? 'film' : 'poutine', 'nouveau');            // 🆕 un film / une poutine : une chose nouvelle, parmi d'autres
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(cle === 'film' ? T('quipFilm') : T('quipRegPoutine'), 6000); }, 1500);
      await lecture(ph, cle);
      consigne(T('c_ordre'));
      await ordre(ph, cle, cle === 'film' ? ['une', 'mange'] : ['un']);
      consigne(cle === 'film' ? T('c_ecrire_part') : T('c_ecrire'));
      await ecrire(ph, cle, cle === 'film' ? [1, 3] : null);
      if (cle === 'film') { etal(null); await carte(T('cult_titre'), T('cult_film')); }
      if (cle === 'regpoutine') {       // 🆕 la même poutine, maintenant connue : « la »
        etal('poutine', 'connu');       // 🆕 l'étal : « une parmi plusieurs » → « celle-là »
        planifier(function () { lecteurIndice(T('quipRegPoutineLa'), 5500); }, 600);
        consigne(T('c_ordre'));
        await ordre(PHRASES.regpoutinela, 'regpoutinela', ['le', 'une']);
        consigne(T('c_ecrire_part'));
        await ecrire(PHRASES.regpoutinela, 'regpoutinela', [2]);       // on écrit l'article
      }
    }
    // Même objet, deux verbes : Bek REGARDE le sandwich, puis elle le MANGE. Le verbe change tout.
    async function etapeContraste3() {
      etape(3);
      montrer('bek-regarde-sandwich');
      etal('sandwich', 'nouveau');                                      // 🆕 un sandwich : nouveau
      consigne(T('c_image'));
      planifier(function () { lecteurIndice(T('quipRegSandwich'), 5500); }, 1200);
      await construire(PHRASES.regsandwich, 'image-regsandwich', { banque: BANQUE_3 });
      // 🆕 le MÊME sandwich, maintenant connu : « le »
      etal('sandwich', 'connu');                                        // 🆕 « un parmi plusieurs » → « celui-là »
      consigne(T('c_connu'));
      planifier(function () { lecteurIndice(T('quipRegSandwichLe'), 5500); }, 800);
      await construire(PHRASES.regsandwichle, 'image-regsandwichle', { banque: BANQUE_3 });
    }
    async function etapeContraste4() {
      etape(4);
      montrer('bek-mange-sandwich');
      etal('sandwich', 'connu');                                        // 🆕 le sandwich qu'elle regardait : connu
      consigne(T('c_image'));
      const arreter = animerManger('sandwich');
      await construire(PHRASES.sandwichle, 'image-sandwich-2', { banque: BANQUE_3 });   // 🆕 le sandwich qu'elle regardait
      arreter();
      await bekDit('sandwich', 1500);
    }

    // ---------- 🆕 Fragment 4 : j'aime ----------
    function pairesElision() {          // je + aime → j'aime ; je mange ne change pas
      const d = document.createElement('div');
      d.className = 'm1-paire';
      [['je', 'aime', 'j’', 'aime'], ['je', 'mange', 'je', ' mange']].forEach(function (p) {
        const sp = document.createElement('span');
        sp.className = 'm1-radical';
        sp.innerHTML = '<b>' + echapper(p[0]) + '</b> ' + echapper(p[1]) + ' &rarr; <i>' + echapper(p[2]) + '</i>' + echapper(p[3]);
        d.appendChild(sp);
      });
      return d;
    }
    function pairesInfinitif() {        // je mange → manger : la forme de base
      const d = document.createElement('div');
      d.className = 'm1-paire';
      [['mang', 'e'], ['regard', 'e'], ['jou', 'e']].forEach(function (p) {
        const sp = document.createElement('span');
        sp.className = 'm1-radical';
        sp.innerHTML = '<b>je</b> ' + echapper(p[0]) + '<i>' + echapper(p[1]) + '</i> &rarr; ' + echapper(p[0]) + '<i>er</i>';
        d.appendChild(sp);
      });
      return d;
    }
    // un segment « lecture, (carte), ordre, écriture » ; pose = image de Bek ; piege = mots pièges de l'ordre
    async function segmentAime(n, cle, pose, piege, manquants, quip, carteApres) {
      const phrase = PHRASES[cle];
      etape(n); montrer(pose);
      consigne(T('c_lire'));
      if (quip) planifier(function () { lecteurIndice(T(quip), 5500); }, 1500);
      await lecture(phrase, cle);
      if (carteApres && carteApres.avant) await carte(T(carteApres.titre), T(carteApres.texte), carteApres.visuel());
      consigne(T('c_ordre'));
      await ordre(phrase, cle, piege);
      consigne(manquants ? T('c_ecrire_part') : T('c_ecrire'));
      await ecrire(phrase, cle, manquants);
      if (carteApres && !carteApres.avant) await carte(T(carteApres.titre), T(carteApres.texte));
    }

    // ---------- 🆕 Fragment 5 : LA RÉPARATION (le cadre) ----------
    function injecterStyle(id, css) {
      if (document.getElementById(id)) return;
      const st = document.createElement('style');
      st.id = id;
      st.textContent = css;
      document.head.appendChild(st);
    }
    function injecterStyleReparation() { injecterStyle('m1-reparation-style', REPARATION_CSS); }
    const cleSaisie = function (t) { return sansAccents(String(t).toLowerCase()).replace(/['’‘`´\s]/g, ''); };

    // ---------- 🆕 (08-11-2026) Saisie au clavier : « f » suffit pour « français » ----------
    // Reprise du mécanisme de sequence-memoire, pour « ordre » et « construire » (la réparation garde sa propre saisie).
    //   • une lettre tapée surligne le début des mots possibles et s'affiche dans la prochaine case ;
    //   • dès qu'UN SEUL mot du plateau commence par ces lettres, il se pose (comme un clic) ;
    //   • si deux mots restent possibles (un / une, mange / manger), on continue ; Entrée ou Espace pose le mot tapé en entier (« mange » → mange) ;
    //   • « ’ » pose « j’ » ; Retour arrière et Échap effacent les lettres ; accents et majuscules sont ignorés ;
    //   • un mot introuvable : les lettres rougissent et on repart de zéro, sans pénalité ; un mauvais mot posé = comme un clic.
    //   • construction : Entrée (rien de tapé) valide la phrase ; Retour arrière (rien de tapé) retire le dernier mot.
    let saisie = null;                 // exercice en cours : { tuiles(), cible(), actif(), cadre, entree(), retour() }
    let tampon = '', minuteurSaisie = null, saisieEcoute = false, saisieUtilisee = false, astuceSaisieVue = false;
    let suiteMot = '', suiteMotTemps = 0;      // la fin du mot qu'on vient de poser (« po » a posé « poutine » : « utine » est avalé)
    function idTuile(t) { return t.getAttribute('data-id'); }
    function saisieTuiles() { return saisie ? saisie.tuiles() : []; }
    function saisieCandidates() {
      return saisieTuiles().filter(function (t) { return cleSaisie(AFFICHE[idTuile(t)]).indexOf(tampon) === 0; });
    }
    function saisieRetirerFantomes() {
      Array.prototype.forEach.call(zone.querySelectorAll('.m1-frappe'), function (g) { if (g.parentNode) g.parentNode.removeChild(g); });
    }
    function saisieEffacer() {
      tampon = '';
      clearTimeout(minuteurSaisie);
      if (!saisie) return;
      saisieTuiles().forEach(function (t) {
        t.classList.remove('m1-tuile-attenuee', 'm1-tuile-prefixe');
        if (t.querySelector('.m1-tuile-frappe')) t.textContent = AFFICHE[idTuile(t)];
      });
      saisieRetirerFantomes();
      if (saisie.cadre) saisie.cadre.classList.remove('m1-saisie');
    }
    function saisieMaj() {
      const cand = saisieCandidates();
      saisieTuiles().forEach(function (t) {
        const ok = cand.indexOf(t) !== -1, mot = AFFICHE[idTuile(t)];
        t.classList.toggle('m1-tuile-attenuee', !ok);
        t.classList.toggle('m1-tuile-prefixe', ok);
        if (ok) t.innerHTML = '<span class="m1-tuile-frappe">' + echapper(mot.slice(0, tampon.length)) + '</span>' + echapper(mot.slice(tampon.length));
        else t.textContent = mot;
      });
      saisieRetirerFantomes();
      const c = saisie.cible();
      if (c && cand.length) {
        const g = document.createElement('span');
        g.className = 'm1-frappe';
        g.textContent = AFFICHE[idTuile(cand[0])].slice(0, tampon.length);
        c.appendChild(g);
        if (saisie.cadre) saisie.cadre.classList.add('m1-saisie');
      }
      clearTimeout(minuteurSaisie);
      minuteurSaisie = setTimeout(saisieEffacer, 3200);      // saisie abandonnée : on repart de zéro
    }
    function saisieNon() {
      const c = saisie && saisie.cible(), lettres = tampon;
      saisieEffacer();
      if (!c) return;
      const g = document.createElement('span');
      g.className = 'm1-frappe m1-frappe-non';
      g.textContent = lettres;
      c.appendChild(g);
      if (saisie.cadre) saisie.cadre.classList.add('m1-saisie');
      secouer(g);
      planifier(function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        if (saisie && saisie.cadre && !tampon) saisie.cadre.classList.remove('m1-saisie');
      }, 520);
    }
    function saisiePoser(t) { saisieEffacer(); t.click(); }        // exactement comme un clic : bonne tuile, erreur, voix, indice…
    function surSaisie(e) {
      if (!saisie || arrete || e.defaultPrevented || !saisie.actif()) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (scene.querySelector('.m1-quitter-voile')) return;
      const k = e.key;
      const actif = document.activeElement;
      const libre = !actif || actif === document.body || (actif.classList && actif.classList.contains('m1-tuile-partie'));
      if (k === 'Escape') { suiteMot = ''; if (tampon) { e.preventDefault(); saisieEffacer(); } return; }
      if (k === 'Backspace') {
        suiteMot = '';
        if (tampon) { e.preventDefault(); tampon = tampon.slice(0, -1); if (tampon) saisieMaj(); else saisieEffacer(); }
        else if (saisie.retour && libre) { e.preventDefault(); saisie.retour(); }
        return;
      }
      if (k === 'Enter' || k === ' ') {
        suiteMot = '';
        if (!tampon) { if (k === 'Enter' && saisie.entree && libre) { e.preventDefault(); saisie.entree(); } return; }
        e.preventDefault();
        const exact = saisieTuiles().filter(function (t) { return cleSaisie(AFFICHE[idTuile(t)]) === tampon; })[0];
        if (exact) saisiePoser(exact); else saisieNon();
        return;
      }
      if (k === '\'' || k === '’') {                            // l'apostrophe pose « j’ »
        if (!tampon) return;
        e.preventDefault();
        const ap = saisieTuiles().filter(function (t) { return cleSaisie(AFFICHE[idTuile(t)]) === tampon && /['’]/.test(AFFICHE[idTuile(t)]); })[0];
        if (ap) saisiePoser(ap);
        return;
      }
      if (!k || k.length !== 1 || !/\p{L}/u.test(k)) return;
      e.preventDefault();
      if (actif && actif !== document.body && actif.blur) actif.blur();      // pas de clic fantôme sur une tuile restée « active »
      saisieUtilisee = true;
      const lettre = cleSaisie(k);
      if (!tampon && suiteMot && Date.now() - suiteMotTemps < 2000 && suiteMot.charAt(0) === lettre) {   // on tape le mot en entier : la suite du mot posé est avalée
        suiteMot = suiteMot.slice(1); suiteMotTemps = Date.now(); return;
      }
      suiteMot = '';
      tampon += lettre;
      const cand = saisieCandidates();
      if (!cand.length) { saisieNon(); return; }
      if (cand.length === 1) {                                   // un seul mot possible : il se pose tout de suite
        const reste = cleSaisie(AFFICHE[idTuile(cand[0])]).slice(tampon.length);
        saisiePoser(cand[0]);
        suiteMot = reste; suiteMotTemps = Date.now();
        return;
      }
      saisieMaj();
    }
    function saisieAstuce() {            // une seule fois, seulement s'il y a un clavier (pas sur un téléphone)
      if (astuceSaisieVue) return;
      astuceSaisieVue = true;
      const tactile = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      let dejaVue = false;
      try { dejaVue = localStorage.getItem('kebbek_astuce_clavier') === '1'; } catch (e) {}
      if (tactile || dejaVue) return;
      try { localStorage.setItem('kebbek_astuce_clavier', '1'); } catch (e) {}
      planifier(function () { if (saisie && !saisieUtilisee && saisie.actif()) lecteurIndice(T('astuceClavier'), 6500, false); }, 2400);
    }
    function saisieOuvrir(config) {
      injecterStyle('m1-saisie-style', SAISIE_CSS);
      saisie = config; tampon = '';
      if (!saisieEcoute) {
        saisieEcoute = true;
        document.addEventListener('keydown', surSaisie);
        nettoyages.push(function () { clearTimeout(minuteurSaisie); document.removeEventListener('keydown', surSaisie); });
      }
      saisieAstuce();
    }
    function saisieFermer() { saisieEffacer(); saisie = null; suiteMot = ''; }

    async function reparation(depart) {
      depart = depart || 0;
      injecterStyleReparation();
      scene.classList.add('m1-corrompu');
      scene.style.setProperty('--m1-abime', String(1 - depart / REPARATION.length));
      vider();
      zone.setAttribute('data-mode', 'reparation');
      consigne(T('c_rep'));
      const liste = document.createElement('div');
      liste.className = 'm1-rep';
      zone.appendChild(liste);
      const banque = document.createElement('div');
      banque.className = 'm1-plateau';
      zone.appendChild(banque);
      let lignePhrase = null;                           // phrase en cours (pour « Réécouter »)
      const bSon = document.createElement('button');
      bSon.type = 'button'; bSon.className = 'm1-haut-parleur'; bSon.setAttribute('aria-label', T('reecouter'));
      bSon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg><span>' + echapper(T('reecouter')) + '</span>';
      bSon.addEventListener('click', function () { reactiverSon(); if (lignePhrase) direPhrase(lignePhrase, true); });
      actions.appendChild(bSon);

      // le souvenir : toutes les phrases, abîmées tant qu'elles ne sont pas réparées
      const lignes = REPARATION.map(function (r, idx) {
        const ph = PHRASES[r.cle];
        const el = document.createElement('div');
        el.className = 'm1-rep-ligne';
        el.setAttribute('data-cle', r.cle);
        if (idx < depart) {            // reprise : les phrases déjà réparées sont rétablies
          el.classList.add('m1-rep-faite');
          ph.mots.forEach(function (id) { el.appendChild(tuile(id, 'm1-tuile-posee')); });
          const pt = document.createElement('span'); pt.className = 'm1-point'; pt.textContent = '.'; el.appendChild(pt);
          liste.appendChild(el);
          return el;
        }
        ph.mots.forEach(function (id) {
          const b = document.createElement('span');
          b.className = 'm1-abime';
          b.style.width = 'calc(' + (AFFICHE[id].length + 1) + 'ch + .8rem)';
          el.appendChild(b);
        });
        liste.appendChild(el);
        return el;
      });

      function reparerLigne(i) {
        return new Promise(function (resolve) {
          const r = REPARATION[i], ph = PHRASES[r.cle], el = lignes[i];
          const rempli = ph.mots.map(function (id, k) { return r.fixes.indexOf(k) !== -1 ? id : null; });
          let erreursCase = 0, frappe = '', termine = false;
          lignePhrase = ph;
          lignes.forEach(function (l, j) { l.classList.toggle('m1-rep-active', j === i); });
          zone.setAttribute('data-phrase', r.cle);
          montrer(r.pose);
          banque.innerHTML = '';
          const tuiles = {};
          melanger(ph.mots.filter(function (id, k) { return rempli[k] === null; }).concat(r.pieges)).forEach(function (id) {
            const t = tuile(id);
            t.addEventListener('click', function () { essayer(id); });
            tuiles[id] = t;
            banque.appendChild(t);
          });
          function suivant() { return rempli.indexOf(null); }
          function dispo() { return Object.keys(tuiles).filter(function (id) { return !tuiles[id].classList.contains('m1-tuile-partie'); }); }
          function candidats() { return dispo().filter(function (id) { return cleSaisie(AFFICHE[id]).indexOf(frappe) === 0; }); }
          function dessiner() {
            const k0 = suivant();
            el.innerHTML = '';
            ph.mots.forEach(function (id, k) {
              if (rempli[k] !== null) {
                const t = tuile(rempli[k], r.fixes.indexOf(k) !== -1 ? 'm1-tuile-fixe' : 'm1-tuile-posee');
                t.tabIndex = -1; t.style.pointerEvents = 'none';
                el.appendChild(t);
              } else {
                const c = document.createElement('span');
                c.className = 'm1-slot' + (k === k0 ? ' m1-slot-courant' : '');
                if (k === k0 && frappe) { c.classList.add('m1-slot-frappe'); c.textContent = frappe; } else c.innerHTML = '&nbsp;';
                el.appendChild(c);
              }
            });
            const point = document.createElement('span');
            point.className = 'm1-point'; point.textContent = '.';
            el.appendChild(point);
          }
          function ligneFinie() {
            termine = true;
            document.removeEventListener('keydown', surFrappe);
            el.classList.remove('m1-rep-active'); el.classList.add('m1-rep-faite');
            direPhrase(ph);
            planifier(resolve, 1500);
          }
          function essayer(id) {
            if (termine) return;
            const k = suivant();
            const t = tuiles[id];
            if (k === -1 || !t || t.classList.contains('m1-tuile-partie')) return;
            if (id === ph.mots[k]) {
              rempli[k] = id; erreursCase = 0; frappe = '';
              t.classList.add('m1-tuile-partie'); t.classList.remove('m1-indice');
              direMot(id);
              dessiner();
              if (suivant() === -1) ligneFinie();
            } else {
              erreursCase++; frappe = '';
              secouer(t); dessiner();
              lecteurIndice(quipChoix(id, ph.mots[k]) || auHasard(T('quipErreur')), 4200);
              if (erreursCase === 2 && tuiles[ph.mots[k]]) tuiles[ph.mots[k]].classList.add('m1-indice');
              else if (erreursCase >= 3) essayer(ph.mots[k]);      // jamais bloquant : on place le bon mot
            }
          }
          function surFrappe(e) {
            if (termine || e.ctrlKey || e.metaKey || e.altKey || scene.querySelector('.m1-quitter-voile')) return;
            if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
            const touche = e.key;
            if (touche === 'Escape' || touche === 'Backspace') {
              if (frappe) { e.preventDefault(); frappe = touche === 'Escape' ? '' : frappe.slice(0, -1); dessiner(); }
              return;
            }
            if (touche === 'Enter' || touche === ' ') {            // valide le mot tapé en entier
              if (!frappe) return;
              e.preventDefault();
              const exact = dispo().filter(function (id) { return cleSaisie(AFFICHE[id]) === frappe; })[0];
              const cand = candidats();
              const choix = exact || (cand.length === 1 ? cand[0] : null);
              frappe = '';
              if (choix) essayer(choix); else dessiner();
              return;
            }
            if (touche === '\'' || touche === '’') {               // l'apostrophe valide « j’ »
              if (!frappe) return;
              e.preventDefault();
              const ap = dispo().filter(function (id) { return cleSaisie(AFFICHE[id]) === frappe && /['’]/.test(AFFICHE[id]); })[0];
              if (ap) { frappe = ''; essayer(ap); }
              return;
            }
            if (touche.length !== 1 || !/[A-Za-zÀ-ÿ]/.test(touche)) return;
            e.preventDefault();
            frappe += cleSaisie(touche);
            const cand = candidats();
            if (!cand.length) { frappe = ''; dessiner(); }
            else if (cand.length === 1) { const id = cand[0]; frappe = ''; essayer(id); }
            else dessiner();
          }
          document.addEventListener('keydown', surFrappe);
          nettoyages.push(function () { document.removeEventListener('keydown', surFrappe); });
          dessiner();
          planifier(function () { direPhrase(ph); }, 500);
        });
      }

      for (let i = depart; i < REPARATION.length; i++) {
        await reparerLigne(i);
        etape(i + 1);
        scene.style.setProperty('--m1-abime', String(1 - (i + 1) / REPARATION.length));
        if (REPARATION[i].apres) lecteurIndice(T(REPARATION[i].apres), 4200);
      }
      scene.classList.remove('m1-corrompu');
      await fin();
    }

    async function fin() {
      if (arrete) return;
      finie = true; majRetour(); etal(null);
      etape(nbEtapes);
      montrer('bek-heureuse-ferme');
      try {
        const banque = window.KebBekMots;
        if (banque && typeof banque.ajouter === 'function' && MOTS_DU_FRAGMENT.length) {
          const p = banque.ajouter(MOTS_DU_FRAGMENT);       // pas de await : la sortie ne dépend pas du réseau
          if (p && typeof p.catch === 'function') p.catch(function (e) { console.warn('sequence-m1 : mots non enregistrés.', e); });
        }
      } catch (e) { console.warn('sequence-m1 : mots non enregistrés.', e); }
      vider();
      consigne('');
      if (fragment === 6) recapEpreuve();       // 🆕 les réponses écrites, avec « Tout copier »
      await lecteurDit(T(fragment === 1 ? (options.suite ? 'finSuite' : 'fin') : 'fin' + fragment));
      await attendre(300);
      if (typeof callbacks.onTermine === 'function') {
        const info = { mots: MOTS_DU_FRAGMENT.slice(), fragments: fragment };
        if (fragment === 6) { info.resultats = JSON.parse(JSON.stringify(resultats)); info.bilan = bilan(); }     // 🆕
        try { callbacks.onTermine(info); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    // ---------- 🆕 (08-11-2026) FRAGMENT 6 : L'ÉPREUVE (dictée, images, compréhension, question libre, défi) ----------
    // Tout s'écrit à la main : pas de tuile, pas de case préremplie, pas d'indice. Chaque réponse notée passe par noter() ;
    // le module ne stocke rien : la page hôte reçoit callbacks.onResultat(r) à chaque réponse, puis onTermine({ …, resultats, bilan }).
    // statut : 'ok' | 'presque' (accent ou apostrophe seuls) | 'partiel' | 'non' | 'libre' (jamais notée) | 'passe'.
    const resultats = options._partage || {};      // partagé avec la scène reconstruite après un retour en arrière
    function noter(cle, type, question, reponse, statut, extra) {
      const r = Object.assign({ cle: cle, type: type, question: question, reponse: reponse, statut: statut }, extra || {});
      resultats[cle] = r;
      if (typeof callbacks.onResultat === 'function') {
        try { callbacks.onResultat(JSON.parse(JSON.stringify(r))); } catch (e) { console.warn('onResultat a échoué.', e); }
      }
    }
    function bilan() {
      const b = { ok: 0, presque: 0, partiel: 0, non: 0, libre: 0, passe: 0 };
      Object.keys(resultats).forEach(function (k) { const st = resultats[k].statut; if (b[st] !== undefined) b[st]++; });
      return b;
    }
    // compare une réponse à une liste de formes acceptées
    function jugerReponse(donne, attendus) {
      const d = normaliser(donne);
      let nature = null;
      for (let i = 0; i < attendus.length; i++) {
        const a = normaliser(attendus[i]);
        if (d === a) return { statut: 'ok', nature: null };
        const pr = proche(d, a);
        if (pr && (nature === null || pr === 'accent')) nature = pr;
      }
      if (nature && ACCENTS_TOLERES) return { statut: 'presque', nature: nature };
      return { statut: 'non', nature: null };
    }
    function nouveauChamp() {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'm1-champ m1-champ-phrase';
      inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false;
      return inp;
    }
    function listeMots(ids) {          // aide visuelle : on ne peut PAS toucher ces mots (pas des boutons)
      const d = document.createElement('div');
      d.className = 'm1-liste-mots';
      const t = document.createElement('p'); t.className = 'm1-liste-titre'; t.textContent = T('liste_mots');
      const r = document.createElement('div'); r.className = 'm1-liste-rang';
      ids.forEach(function (id) { const m = document.createElement('span'); m.className = 'm1-mot-liste'; m.textContent = AFFICHE[id]; r.appendChild(m); });
      d.appendChild(t); d.appendChild(r);
      return d;
    }
    function copierTexte(texte) {
      return new Promise(function (resolve) {
        function repli() {
          try {
            const ta = document.createElement('textarea');
            ta.value = texte; ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            resolve(true);
          } catch (e) { resolve(false); }
        }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texte).then(function () { resolve(true); }, repli);
          else repli();
        } catch (e) { repli(); }
      });
    }
    function boutonCopier(label, getTexte) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'lect-btn lect-btn-clair m1-btn'; b.textContent = label;
      b.addEventListener('click', function () {
        copierTexte(getTexte()).then(function (ok) {
          b.textContent = ok ? T('copie') : label;
          planifier(function () { b.textContent = label; }, 1800);
        });
      });
      return b;
    }
    // Le Lecteur parle d'abord, avec « Suite » : l'écran est vidé pour qu'aucun exercice fini ne reste affiché pendant ce temps
    async function lecteurAvant(texte) { vider(); consigne(''); await lecteurDit(texte); }

    // Question à réponse écrite (dictée, image, défi). cfg : cle, type, question, attendus[], essais (2), phrase (dite si réussi),
    // avant(zone) / apres(zone) : contenu avant / après le champ, coeur (cœur répété pendant la question), coeurFin (cœur à la réussite).
    // Sans indice : après le dernier essai raté, la bonne réponse n'est PAS montrée ; la réponse est notée et on continue.
    async function questionEcrite(cfg) {
      vider();
      zone.setAttribute('data-mode', 'epreuve'); zone.setAttribute('data-phrase', cfg.cle);
      injecterStyle('m1-epreuve-style', EPREUVE_CSS);
      if (cfg.avant) cfg.avant(zone);
      const champ = nouveauChamp();
      zone.appendChild(champ);
      if (cfg.apres) cfg.apres(zone);
      const essaisMax = cfg.essais || 2;
      let essais = 0, termine = false, fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bV = document.createElement('button');
      bV.type = 'button'; bV.className = 'lect-btn m1-btn'; bV.textContent = T('valider');
      actions.appendChild(bV);
      if (cfg.coeur) {
        (function tic() { if (termine || arrete) return; coeur(); planifier(tic, 4500); })();
      }
      function clore(statut, donne) {
        termine = true; bV.disabled = true; champ.readOnly = true;
        noter(cfg.cle, cfg.type, cfg.question, donne, statut, { attendu: cfg.attendus[0], essais: essais });
      }
      function verifier() {
        if (termine) return;
        const donne = champ.value.trim();
        if (!normaliser(donne)) { secouer(champ); return; }      // champ vide : ne compte pas comme un essai
        essais++;
        const j = jugerReponse(donne, cfg.attendus);
        if (j.statut !== 'non') {
          clore(j.statut, donne);
          champ.classList.remove('m1-ko'); champ.classList.add('m1-ok');
          coupeManger();
          if (cfg.phrase) direPhrase(cfg.phrase);
          if (cfg.coeurFin) coeur();
          const presque = j.statut === 'presque';
          lecteurIndice(presque ? T(j.nature === 'accent' ? 'presqueAccent' : 'presqueApostrophe') : auHasard(T('quipOk')), presque ? 3600 : 2200);
          finApresVoix(fini, presque ? 2600 : 1300);
          return;
        }
        champ.classList.add('m1-ko');
        if (essais >= essaisMax) {
          clore('non', donne);
          lecteurIndice(T('quipEchec'), 4500);
          boutonAction(T('continuer')).then(fini);
          return;
        }
        secouer(champ);
        lecteurIndice(auHasard(T('quipErreur')), 3800);
        try { champ.focus(); champ.select(); } catch (e) {}
      }
      bV.addEventListener('click', verifier);
      champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verifier(); } });
      champ.addEventListener('input', function () { champ.classList.remove('m1-ko'); });
      planifier(function () { try { champ.focus(); } catch (e) {} }, 250);
      await promesse;
    }

    // Compréhension : trois champs, une seule tentative, aucune correction affichée (c'est noté, pas corrigé).
    async function questionNourriture() {
      vider();
      zone.setAttribute('data-mode', 'epreuve'); zone.setAttribute('data-phrase', 'comp-nourriture');
      injecterStyle('m1-epreuve-style', EPREUVE_CSS);
      const rang = document.createElement('div');
      rang.className = 'm1-triple';
      const champs = [nouveauChamp(), nouveauChamp(), nouveauChamp()];
      champs.forEach(function (c) { rang.appendChild(c); });
      zone.appendChild(rang);
      let termine = false, fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bV = document.createElement('button');
      bV.type = 'button'; bV.className = 'lect-btn m1-btn'; bV.textContent = T('valider');
      actions.appendChild(bV);
      function verifier() {
        if (termine) return;
        const donnes = champs.map(function (c) { return c.value.trim(); }).filter(function (v) { return normaliser(v); });
        if (!donnes.length) { secouer(rang); return; }
        termine = true; bV.disabled = true;
        champs.forEach(function (c) { c.readOnly = true; });
        const attendus = ['un sandwich', 'une poutine', 'une pizza'].map(normaliser);
        const pris = [false, false, false], etat = donnes.map(function () { return null; });
        donnes.forEach(function (d, i) {            // passe 1 : réponses exactes
          const k = attendus.findIndex(function (a, j) { return !pris[j] && a === normaliser(d); });
          if (k !== -1) { pris[k] = true; etat[i] = 'ok'; }
        });
        if (ACCENTS_TOLERES) donnes.forEach(function (d, i) {   // passe 2 : accents ou apostrophes seuls
          if (etat[i]) return;
          const k = attendus.findIndex(function (a, j) { return !pris[j] && proche(normaliser(d), a); });
          if (k !== -1) { pris[k] = true; etat[i] = 'presque'; }
        });
        const bons = etat.filter(function (e) { return e; }).length, presques = etat.filter(function (e) { return e === 'presque'; }).length;
        const statut = bons === 3 ? (presques ? 'presque' : 'ok') : (bons > 0 ? 'partiel' : 'non');
        noter('comp-nourriture', 'comprehension', T('c_certif1'), donnes.join(' / '), statut, { attendu: 'un sandwich / une poutine / une pizza', bons: bons, total: 3 });
        lecteurIndice(T('quipNote'), 4500);
        boutonAction(T('continuer')).then(fini);
      }
      bV.addEventListener('click', verifier);
      champs.forEach(function (c, i) {
        c.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          if (i < champs.length - 1) champs[i + 1].focus(); else verifier();
        });
      });
      planifier(function () { try { champs[0].focus(); } catch (e) {} }, 250);
      await promesse;
    }

    // Question personnelle : jamais notée automatiquement (un professeur peut la lire) ; bouton « Copier » (question + réponse).
    async function questionLibre(cle, question) {
      vider();
      zone.setAttribute('data-mode', 'epreuve'); zone.setAttribute('data-phrase', cle);
      injecterStyle('m1-epreuve-style', EPREUVE_CSS);
      const ta = document.createElement('textarea');
      ta.className = 'm1-champ-libre'; ta.rows = 3;
      ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocapitalize', 'none'); ta.setAttribute('autocorrect', 'off'); ta.spellcheck = false;
      zone.appendChild(ta);
      let termine = false, fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bV = document.createElement('button');
      bV.type = 'button'; bV.className = 'lect-btn m1-btn'; bV.textContent = T('valider');
      const bPasser = document.createElement('button');
      bPasser.type = 'button'; bPasser.className = 'm1-lien'; bPasser.textContent = T('passer');
      actions.appendChild(bV); actions.appendChild(bPasser);
      function clore(passe) {
        if (termine) return;
        termine = true; ta.readOnly = true;
        const rep = passe ? '' : ta.value.trim();
        noter(cle, 'libre', question, rep, passe ? 'passe' : 'libre');
        actions.innerHTML = '';
        if (!passe) { lecteurIndice(T('quipLibre'), 3500); actions.appendChild(boutonCopier(T('copier'), function () { return question + '\n' + rep; })); }
        boutonAction(T('continuer')).then(fini);
      }
      bV.addEventListener('click', function () { if (!ta.value.trim()) { secouer(ta); return; } clore(false); });
      bPasser.addEventListener('click', function () { clore(true); });
      planifier(function () { try { ta.focus(); } catch (e) {} }, 250);
      await promesse;
    }

    // Récapitulatif final : les réponses écrites à la main (sans les notes), avec « Tout copier » pour un professeur.
    function recapEpreuve() {
      injecterStyle('m1-epreuve-style', EPREUVE_CSS);
      zone.setAttribute('data-mode', 'epreuve');
      const lignes = Object.keys(resultats).map(function (k) { return resultats[k]; })
        .filter(function (r) { return r.type !== 'dictee' && r.type !== 'image' && r.reponse; });
      if (!lignes.length) return;
      const titre = document.createElement('p'); titre.className = 'm1-note-titre'; titre.textContent = T('recap_titre');
      const liste = document.createElement('div'); liste.className = 'm1-recap';
      lignes.forEach(function (r) {
        const q = document.createElement('p'); q.className = 'm1-recap-q'; q.textContent = r.question;
        const a = document.createElement('p'); a.className = 'm1-recap-r'; a.textContent = r.reponse;
        liste.appendChild(q); liste.appendChild(a);
      });
      zone.appendChild(titre); zone.appendChild(liste);
      actions.appendChild(boutonCopier(T('toutCopier'), function () {
        return lignes.map(function (r) { return r.question + '\n' + r.reponse; }).join('\n\n');
      }));
    }

    // Les segments du fragment 6
    const LISTE_DICTEE = ['aime', 'j', 'je', 'film', 'jouer', 'joue', 'la', 'le', 'manger', 'mange', 'pizza', 'poutine', 'regarde', 'regarder', 'sandwich', 'tele', 'un', 'une'];
    function segDictee(n, cle) {
      return async function () {
        etape(n); etal(null); montrer('bek-observe');
        consigne(T('c_dictee'));
        const phrase = PHRASES[cle];
        reactiverSon();
        const attente = questionEcrite({
          cle: 'dictee-' + (n + 1), type: 'dictee', question: T('c_dictee'), attendus: [phrase.texte], phrase: phrase,
          avant: function (z) { z.appendChild(creerEcoute(phrase)); },
          apres: function (z) { z.appendChild(listeMots(LISTE_DICTEE)); }
        });
        animerBouche(phrase);                       // pose « écoute-moi » (ou celle de la phrase) : la bouche suit la voix
        planifier(function () { direPhrase(phrase); }, 500);
        await attente;
        arreterBouche();
      };
    }
    function segImage(n, cle, pose, phrase, attendus, cleConsigne, opts) {
      opts = opts || {};
      return async function () {
        etape(n); etal(null); montrer(pose);
        consigne(T(cleConsigne));
        const arreter = opts.manger ? animerManger(opts.manger) : function () {};
        await questionEcrite({ cle: 'image-' + cle, type: 'image', question: T(cleConsigne), attendus: attendus, phrase: phrase, coeur: !!opts.coeur });
        arreter();
      };
    }
    function segComprehension(n) {
      return async function () {
        etape(n); etal(null); montrer('bek-observe');
        await lecteurAvant(T('lec_certif'));
        consigne(T('c_certif1'));
        await questionNourriture();
      };
    }
    function segLibre(n) {
      return async function () {
        etape(n); etal(null); montrer('bek-observe');
        lecteurIndice(T('lec_libre'), 7000);
        consigne(T('c_libre'));
        await questionLibre('libre-aimes', T('c_libre'));
      };
    }
    function segDefi(n, num) {
      return async function () {
        etape(n); etal(null); montrer('bek-observe');
        if (num === 1) await lecteurAvant(T('lec_defi'));
        consigne(T(num === 1 ? 'c_defi1' : 'c_defi2'));
        await questionEcrite({
          cle: 'defi-' + num, type: 'defi', question: T(num === 1 ? 'c_defi1' : 'c_defi2'),
          attendus: [num === 1 ? 'j’étudie' : 'j’aime étudier'], coeurFin: num === 2,
          avant: num === 1 ? function (z) {
            const v = document.createElement('div'); v.className = 'm1-defi-verbe';
            v.innerHTML = '<strong>étudier</strong><span>' + echapper(T('sens_etudier')) + '</span>';
            z.appendChild(v);
          } : null
        });
      };
    }

    // Un segment « exercice audio » (le dernier de chaque fragment)
    function segAudio(cles) {
      return async function () {
        etape(5); etal(null); montrer('bek-observe'); consigne(T('c_audio'));
        for (const cle of cles) await construireAudio(PHRASES[cle], 'audio-' + cle);
      };
    }
    // Les 6 segments de chaque fragment (la réparation a son propre déroulé). Reprendre = commencer au segment n.
    function segmentsDuFragment() {
      if (fragment === 6) return [
        segDictee(0, 'pizzaune'), segDictee(1, 'regsandwichle'), segDictee(2, 'aimetele'), segDictee(3, 'aimemangerpoutine'),
        segImage(4, 'poutine', 'bek-mange-poutine', PHRASES.poutine, ['Je mange une poutine.', 'Je mange la poutine.', 'Je mange de la poutine.'], 'c_image', { manger: 'poutine' }),
        segImage(5, 'tele', 'bek-regarde-film', PHRASES.aimetele, ['J’aime regarder la télé.', 'J’aime regarder un film.', 'J’aime regarder le film.'], 'c_aimeq', { coeur: true }),
        segImage(6, 'jouer', 'bek-aime-jouer', PHRASES.aimejouer, ['J’aime jouer.'], 'c_aimeq', { coeur: true }),
        segComprehension(7), segLibre(8), segDefi(9, 1), segDefi(10, 2)
      ];
      if (fragment === 2) return [
        etapeArticles, etapePoutineLa, etapePizza,
        function () { return etapeNouveauConnu(3, 'sandwich'); },
        function () { return etapeNouveauConnu(4, 'poutine'); },
        segAudio(['sandwichle', 'poutinela', 'pizzala'])
      ];
      if (fragment === 3) return [
        etapeRegarde,
        function () { return etapeRegardePhrase('film', 1); },
        function () { return etapeRegardePhrase('regpoutine', 2); },
        etapeContraste3, etapeContraste4,
        segAudio(['film', 'regsandwichle', 'poutinela'])    // un film, le sandwich (regarder), la poutine (rappel de « manger »)
      ];
      if (fragment === 4) return [
        function () { return segmentAime(0, 'aimepoutine', 'bek-mange-poutine', ['je'], [0, 1], 'quipAimePoutine',
          { avant: true, titre: 'noteJ_titre', texte: 'noteJ', visuel: pairesElision }); },
        function () { return segmentAime(1, 'aimemanger', 'bek-mange-sandwich', ['mange'], [2], 'quipAimeManger',
          { avant: true, titre: 'noteI_titre', texte: 'noteI', visuel: pairesInfinitif }); },
        function () { return segmentAime(2, 'aimetele', 'bek-regarde-film', ['regarde'], null, null,
          { avant: false, titre: 'cult_titre', texte: 'cult_tele' }); },
        async function () {
          await segmentAime(3, 'aimejouer', 'bek-aime-jouer', ['manger'], null, 'quipAimeJouer');
          // 🆕 la forme conjuguée : « Je joue. » (jou-er → jou-e)
          montrer('bek-aime-jouer');
          consigne(T('c_image'));
          planifier(function () { lecteurIndice(T('quipJeJoue'), 6000); }, 1000);
          await construire(PHRASES.jejoue, 'image-jejoue', { banque: ['je', 'joue', 'jouer', 'j', 'aime'] });
        },
        async function () {
          etape(4); montrer('bek-regarde-poutine');
          consigne(T('c_audio'));
          planifier(function () { lecteurIndice(T('quipAimeRegPoutine'), 5000); }, 4000);
          await construireAudio(PHRASES.aimeregpoutine, 'audio-aimeregpoutine');
          montrer('bek-mange-poutine');
          await construireAudio(PHRASES.aimemangerpoutine, 'audio-aimemangerpoutine');
        },
        segAudio(['aimemanger', 'aimejouer', 'jejoue'])
      ];
      return [                                              // fragment 1
        etapeMange,
        function () { return etapePhrase('sandwich', 1); },
        function () { return etapePhrase('poutine', 2); },
        function () { return etapeImage('sandwich', 3); },
        function () { return etapeImage('poutine', 4); },
        segAudio(['parle', 'mange', 'poutine'])
      ];
    }

    // ---------- 🆕 Scène d'abord, encadré ensuite ----------
    function attenteOuClic(ms) {             // la scène dure ms, ou jusqu'à un clic / Entrée / Espace (hors boutons)
      return new Promise(function (resolve) {
        let fini = false;
        function fin() { if (fini) return; fini = true; scene.removeEventListener('pointerdown', surClic); document.removeEventListener('keydown', surTouche); resolve(); }
        function surClic(e) { if (e.target && e.target.closest && e.target.closest('button')) return; fin(); }
        function surTouche(e) {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
          e.preventDefault(); fin();
        }
        scene.addEventListener('pointerdown', surClic);
        document.addEventListener('keydown', surTouche);
        nettoyages.push(function () { document.removeEventListener('keydown', surTouche); });
        planifier(fin, ms);
      });
    }
    function reveler(arreterManger) {         // l'encadré se dévoile, Bek glisse à sa place
      calqueBek.classList.remove('m1-bek-souffle');
      arreterManger();
      colGauche.classList.add('m1-glisse');
      if (!reduit) { colBek.style.transition = 'transform 1.1s cubic-bezier(.3,.7,.2,1)'; colBek.style.transform = ''; }
      colGauche.classList.remove('m1-cache');
      planifier(function () {
        colGauche.classList.remove('m1-glisse');
        colBek.style.transition = ''; colBek.style.transform = ''; colBek.style.zIndex = '';
      }, reduit ? 500 : 1500);
    }
    // cfg : { pose, manger (clé de la boucle « elle mange »), coeur } ; repos : on efface d'abord l'écran précédent (pendant qu'il est caché)
    async function sceneDabord(cfg, repos) {
      cfg = cfg || {};
      let arreterManger = function () {};
      try {
        injecterStyle('m1-scene-seule-style', SCENE_CSS);
        if (repos) { vider(); consigne(''); lecteurMasquer(); }
        colGauche.classList.add('m1-cache');
        if (!reduit) {
          colBek.style.transition = 'none'; colBek.style.transform = '';
          const rs = scene.getBoundingClientRect(), rb = colBek.getBoundingClientRect();
          const dx = (rs.left + rs.width / 2) - (rb.left + rb.width / 2);
          const dy = (rs.top + rs.height / 2) - (rb.top + rb.height / 2);
          const echelle = rb.height > 0 ? Math.max(1, Math.min(1.12, (rs.height * 0.92) / rb.height)) : 1;
          colBek.style.transform = 'translate(' + (isFinite(dx) ? dx.toFixed(1) : 0) + 'px,' + (isFinite(dy) ? dy.toFixed(1) : 0) + 'px) scale(' + echelle.toFixed(3) + ')';
          colBek.style.zIndex = '4';
          void colBek.offsetWidth;
          calqueBek.classList.add('m1-bek-souffle');
        }
        montrer(cfg.pose || 'bek-observe');
        const mange = !!(cfg.manger && bouclePrete(cfg.manger));
        if (cfg.manger) arreterManger = animerManger(cfg.manger);
        if (cfg.coeur) { planifier(coeur, 700); planifier(coeur, 2700); }
        await attenteOuClic(reduit ? 1500 : (mange ? SCENE_DUREE_MANGER : SCENE_DUREE));
      } catch (e) { console.warn('sequence-m1 : scène d’abord interrompue.', e); }
      reveler(arreterManger);
    }

    async function deroule() {
      const depart = Math.max(0, Math.min(nbEtapes - 1, Math.floor(Number(options.reprendreA) || 0)));
      await attendre(options._retour ? 0 : 500);
      if (sceneAuDepart) await sceneDabord(SCENES[fragment] && SCENES[fragment].intro);     // 🆕 Bek d'abord, l'encadré ensuite
      montrer('bek-observe');
      if (options._retour) {                 // 🆕 retour en arrière : pas d'introduction, on rejoue directement l'étape
        if (depart > 0) etape(depart);
      } else {
        lecteurAfficher(T(depart > 0 ? 'reprise' : (fragment === 1 ? 'intro' : 'intro' + fragment)), true);
        if (depart > 0) etape(depart);
        await new Promise(function (resolve) { lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); }; });
      }
      if (fragment === 5) { await reparation(depart); return; }
      const segmentsF = segmentsDuFragment();
      const repos = SCENES[fragment] && SCENES[fragment].repos;
      for (let i = depart; i < segmentsF.length; i++) {
        segCourant = i; ecrans = 0; majRetour();
        if (repos && repos.index === i && !options._retour) await sceneDabord(repos, true);     // 🆕 point de repos au milieu du fragment
        await segmentsF[i]();
      }
      await fin();
    }

    // 🆕 « ‹ » : on demande confirmation (la progression est déjà gardée par onPosition) avant de quitter
    function demanderQuitter() {
      if (scene.querySelector('.m1-quitter-voile')) return;
      injecterStyle('m1-quitter-style', QUITTER_CSS);
      const voile = document.createElement('div');
      voile.className = 'm1-quitter-voile';
      voile.setAttribute('role', 'dialog'); voile.setAttribute('aria-modal', 'true');
      voile.innerHTML = '<div class="m1-quitter-boite">' +
        '<p class="m1-quitter-titre">' + echapper(T('quitter_titre')) + '</p>' +
        '<p class="m1-quitter-info">' + echapper(T('quitter_info')) + '</p>' +
        '<div class="m1-quitter-boutons">' +
          '<button type="button" class="lect-btn m1-btn m1-quitter-oui">' + echapper(T('quitter_oui')) + '</button>' +
          '<button type="button" class="lect-btn m1-btn m1-quitter-non">' + echapper(T('quitter_non')) + '</button>' +
        '</div></div>';
      scene.appendChild(voile);
      function fermer() { document.removeEventListener('keydown', surEchap); if (voile.parentNode) voile.parentNode.removeChild(voile); }
      function surEchap(e) { if (e.key === 'Escape') { e.preventDefault(); fermer(); } }
      document.addEventListener('keydown', surEchap);
      nettoyages.push(function () { document.removeEventListener('keydown', surEchap); });
      voile.querySelector('.m1-quitter-non').addEventListener('click', fermer);
      voile.querySelector('.m1-quitter-oui').addEventListener('click', function () {
        fermer();
        if (typeof callbacks.onQuitter === 'function') callbacks.onQuitter();
      });
      voile.querySelector('.m1-quitter-non').focus();
    }

    q('.m1-quitter').addEventListener('click', demanderQuitter);
    if (boutonRetour) boutonRetour.addEventListener('click', reculer);

    // ---------- Lancement ----------
    precharger(POSES, function (nom) { return sources[nom]; }).then(function (etat) {
      if (arrete) return;
      creerPoses(etat);
      deroule().catch(function (e) { colGauche.classList.remove('m1-cache'); console.warn('sequence-m1 interrompue.', e); });
    });

    return {
      arreter: function () {
        arrete = true;
        jetonManger++;
        minuteurs.forEach(clearTimeout);
        nettoyages.forEach(function (f) { try { f(); } catch (e) {} });
        couperVoix();
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  // 🆕 Retour en arrière : on referme la scène et on la reconstruit à l'étape voulue (reprendreA), sans introduction.
  // La poignée rendue à la page hôte reste valable : son arreter() ferme toujours la scène en cours.
  function demarrer(idConteneur, options, callbacks) {
    options = options || {};
    let courante = null, ferme = false;
    const partage = {};      // 🆕 fragment 6 : les résultats survivent au retour en arrière (la scène est reconstruite)
    function lancer(opts) { courante = demarrerScene(idConteneur, Object.assign({}, opts, { _partage: partage }), callbacks); }
    function reculerVers(n) {
      if (ferme) return;
      if (courante) courante.arreter();
      lancer(Object.assign({}, options, { reprendreA: n, _retour: true, _reculer: reculerVers }));
    }
    lancer(Object.assign({}, options, { _reculer: reculerVers }));
    return { arreter: function () { ferme = true; if (courante) courante.arreter(); } };
  }

  try { console.info('sequence-m1 : v31 — scène d’abord, encadré ensuite ; voix coupée à chaque écran, cœur sur « aime », fragment 6 (épreuve)'); } catch (e) {}
  window.KebBekM1 = { demarrer: demarrer, MOTS_APPRIS_6: MOTS_APPRIS_6, MOTS_APPRIS: MOTS_APPRIS, MOTS_APPRIS_2: MOTS_APPRIS_2, MOTS_APPRIS_3: MOTS_APPRIS_3, MOTS_APPRIS_4: MOTS_APPRIS_4, MOTS_APPRIS_5: MOTS_APPRIS_5, REPARATION: REPARATION };
})();
