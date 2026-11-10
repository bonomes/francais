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
      avec de plus gros dessins. Il n'existe plus de mode « sous les pieds de Bek ». « un / une » : UN SEUL objet (v33) ; pause (ETAL_PAUSE) ; les deux
      autres apparaissent, s'estompent, et celui du milieu grossit avec un halo violet : « le / la » (v33). Sur la carte « Remarque » l'animation tourne en boucle ; ailleurs elle
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
   🆕 (09-11-2026) v32 :
     • BANDE DE MOTS : au tout premier niveau (BANDE_FRAGMENTS = [1]), la phrase entière à écrire de mémoire a, sous le champ, un bouton replié « Voir les mots »
       qui déplie les mots de la phrase DANS LE DÉSORDRE (jamais dans l'ordre) ; un clic sur un mot le fait entendre sans l'insérer. Après une erreur, le bouton se
       met à battre doucement. options2.bande: true / false de ecrire() force ou retire la bande pour un exercice précis.
     • POINTS DE REPOS : SCENES[n].repos peut être une liste (fragment 1 : avant les images ET avant l'exercice d'écoute, c'est-à-dire après l'écriture de mémoire).
     • Pas de scène d'ouverture à la reprise (reprendreA) ni au retour en arrière — la console le dit maintenant ; options.scenes: true la force (test, « refaire »).
   🆕 (09-11-2026) v33 — L'ÉTAL, « UN » CONTRE « LE » (fragments 2 et 3, carte « Remarque ») :
     • « un / une » : UN SEUL objet visible (centré, cerclé d'ambre), pastille ambre. « le / la » : les TROIS objets sont là, celui du milieu seul est en valeur
       (halo violet, plus gros), les deux autres s'estompent ; pastille violette. C'est le même objet qui reste d'un état à l'autre : « un sandwich » devient
       « le sandwich » (celui qu'on regardait déjà). Les cases 1 et 3 se replient en largeur (0) en mode « un » et se déploient en mode « le ».
     • Le balayage et le soulignement sous chaque objet (v31-v32) disparaissent : etalBalayage, etalBalayageStop, ETAL_PAS et leur CSS sont retirés.
     • Boucle de la remarque : « un » ETAL_PAUSE = 3,2 s, « le » ETAL_PAUSE_CONNU = 4 s. Un clic sur l'étal rejoue (le → un → le) ; mouvement réduit : pas d'animation.
   🆕 (09-11-2026) v34 — VOIX D'OUVERTURE DES EXERCICES D'ÉCOUTE (« parfois, l'audio de l'exercice suivant n'embarque pas ») :
     • Une voix lancée au début d'un écran (exercice d'écoute, dictée, réparation) part tout de suite (direAuDebut) et seulement si l'écran n'a pas changé (ecranId).
       Avant, elle était mise en file derrière une voix éventuellement « fantôme » (attente jusqu'à 4,5 s, annulable par n'importe quel appel).
     • La file d'attente ne touche plus à jetonVoix : avant, une phrase mise en file faisait abandonner en silence la voix en cours de chargement (essai .mp3 → repli .wav).
     • Un refus du navigateur (NotAllowedError) ou une interruption (AbortError) ne marque plus le fichier comme « introuvable » : avant, tout le reste de la session passait
       à la voix de synthèse pour cette phrase, même avec « Réécouter ».
     • Si la voix d'une phrase ne démarre pas (lecture refusée, ou aucun son 2,5 s après la demande), le bouton « Réécouter » clignote trois fois, et la console dit pourquoi
       (« sequence-m1 : la voix de la phrase n'a pas démarré — … »). Le clignotement s'arrête dès qu'une voix repart.
   🆕 (10-11-2026) v35 — ÉCRIRE AU CLAVIER DANS LES FRAGMENTS 2 À 4 (avant : seulement au fragment 1 pour « ce qu'on voit » et « ce qu'on entend »). Aucune étape ajoutée :
     la barre de progression et les reprises sauvegardées restent identiques.
     • Écoute écrite (ecrireAudio) : le DERNIER élément de l'étape d'écoute est à écrire (sans traduction, bande « Voir les mots » repliée) : fragment 2 « Je mange la pizza. »,
       fragment 3 « Je mange la poutine. », fragment 4 « Je joue. ». Consigne c_ecoute_ecris (1re phrase de c_dictee, dans les 20 langues).
     • Voir → écrire : fragment 2, étape 4 (la poutine : « une » en cases, puis « la » écrit) ; fragment 3, étape 4 (« Je mange le sandwich. »).
     • BANDE_FRAGMENTS = [1, 2, 3, 4] : toute phrase entière à écrire propose la bande de mots repliée. Fragment 6 : inchangé (sa propre liste).
   🆕 (10-11-2026) v36 — SIX NOUVELLES PHRASES, RAPPELS, FIN DU VERBE :
     • Six phrases (voix bek_<id>_01.mp3, dans audio/fr/) : « Je regarde le film. », « Je regarde une pizza. », « Je regarde la pizza. », « J'aime manger un sandwich. »,
       « J'aime manger la pizza. », « J'aime regarder un film. ». Aucun mot nouveau. Clés tr_… et consignes dans les 20 langues (relecture native à faire).
     • RÉPARTITION. Fragment 3 : « le film » à l'étape 2 (un → le, comme la poutine à l'étape suivante) ; « Je regarde une pizza. » (cases) et « Je regarde la pizza. » (écrit) apparaissent
       POUR LA PREMIÈRE FOIS dans l'exercice d'écoute final. Fragment 4 : « J'aime manger la pizza. » à l'étape 2 (fin du verbe) ; « J'aime manger un sandwich. » (cases) et
       « J'aime regarder un film. » (écrit) apparaissent pour la première fois dans l'exercice d'écoute final.
     • RAPPELS (rappel() : une phrase déjà vue, à construire de mémoire, au début de l'étape 0, sans étape ajoutée) : fragment 2 « Je mange un sandwich. » (fragment 1) ;
       fragment 3 « Je mange la pizza. » (fragment 2) ; fragment 4 « Je regarde le film. » (fragment 3). Consigne c_rappel.
     • FIN DU VERBE (ecrireFin() : « Je regard_ un film. », « J'aime mang_ la pizza. »). On n'écrit que la terminaison (« e », ou « er » à l'infinitif) ; tout le reste est donné.
       Fragment 3, étape 3 (« Je regard_ un film. ») ; fragment 4, étape 2 (« J'aime mang_ la pizza. »). Consigne c_finale ; trois erreurs : la réponse apparaît.
     • Nouvelle pose à produire : « Bek regarde une pizza » (bek-regarde-pizza, bek-pizza-regarde-ouverte). Sans les images : pose « observe » + vignette dessinée de la pizza.
     • Exercices d'écoute finaux : fragment 3 = « film » (rappel), « Je regarde une pizza. », écrit « Je regarde la pizza. » ; fragment 4 = « J'aime manger un sandwich. », « J'aime jouer. »,
       écrit « J'aime regarder un film. ». (« Je mange la poutine » et « Je joue » écrits de la v35 sont retirés : déjà pratiqués à l'étape précédente.)
   onTermine({ mots, fragments }) : fragments = numéro du fragment terminé.

   🆕 (08-11-2026) v30 :
     • VOIX : plus d'écho de l'écran précédent. voixActive() compte aussi la phrase mise en file et la synthèse qui démarre (≈ 70 ms) ;
       vider() coupe la voix à chaque nouvel écran.
     • CŒUR : quand la voix dit « aime » (phrase ou mot), un cœur SVG monte au-dessus de la tête de Bek (partout : leçons du fragment 4, réparation, fragment 6).
     • PREMIER ÉCRAN DU FRAGMENT 1 : Bek tient son sandwich et le mange en boucle (pose fixe si les images de la boucle manquent).
     • FRAGMENT 6 (options.fragment = 6) : L'ÉPREUVE, 11 segments (ETAPES_6) : 4 dictées (écrites à la main, aucune case, liste de mots NON touchable, « Réécouter »),
       3 questions sur image (« Que fais-tu ? », « Qu'est-ce que tu aimes faire ? » avec cœur), 1 compréhension (les trois aliments de Bek avec un/une, vérifiée : 2 essais,
       champs verts/rouges, réponse montrée après le dernier raté), 1 question libre (jamais notée ; boutons Copier / Tout copier), 2 défis (« étudier » : « j'étudie », puis « j'aime étudier »).
       Le Lecteur explique la situation (intro6, lec_certif, lec_libre, lec_defi). Deux essais pour dictée / image / défi ; après le dernier raté, la réponse n'est PAS montrée (sauf la compréhension, qui est vérifiable : champs verts/rouges, 2 essais, réponse montrée à la fin).
       ACCENTS_TOLERES (en haut) : accent ou apostrophe seuls = « presque » (accepté). Le module ne stocke rien :
       callbacks.onResultat({ cle, type, question, reponse, statut, attendu, essais }) à chaque réponse ; onTermine({ mots, fragments: 6, resultats, bilan }).
       statut : ok | presque | partiel | non | libre | passe. Les résultats survivent à la flèche de retour (le module les garde le temps de la session) ;
       pour un « quitter et continuer plus tard », c'est la page hôte qui garde ceux reçus par onResultat.
       Textes : les 20 langues (fr, en, ja + 17 traduites le 08-11-2026 : à faire relire par des locuteurs natifs). Le fragment 5 garde son onTermine : c'est la page hôte qui enchaîne sur le 6.

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
    // 🎨 v36 (à produire) : Bek REGARDE une pizza sans la manger (curieuse, calme). Tant que les images manquent : pose « observe » + vignette dessinée de la pizza.
    'bek-regarde-pizza':    'images/m1/bek_regarde-pizza_01-01.webp',                    // 🆕 repos : bouche fermée
    'bek-pizza-regarde-ouverte': 'images/m1/bek_regarde-pizza_bouche-ouverte_01-01.webp', // 🆕 en parlant : bouche ouverte
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
                         'bek-regarde-pizza': 'bek-pizza-regarde-ouverte',
                         'bek-aime-jouer': 'bek-jouer-ouverte' };
  const POSE_DE_REPLI = { 'bek-mange-sandwich': 'bek-heureuse-ferme', 'bek-mange-poutine': 'bek-observe',
                          'bek-regarde-film': 'bek-concentree', 'bek-regarde-sandwich': 'bek-observe', 'bek-regarde-poutine': 'bek-observe',
                          'bek-mange-pizza': 'bek-observe', 'bek-regarde-pizza': 'bek-observe',
                          'bek-aime-jouer': 'bek-observe', 'bek-ecoute': 'bek-observe' };
  const VIGNETTE_DE = { 'bek-mange-sandwich': 'sandwich', 'bek-mange-poutine': 'poutine',
                        'bek-regarde-film': 'film', 'bek-regarde-sandwich': 'sandwich', 'bek-regarde-poutine': 'poutine',
                        'bek-mange-pizza': 'pizza', 'bek-regarde-pizza': 'pizza',
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
    aimemangerpoutine: { mots: ['j', 'aime', 'manger', 'la', 'poutine'],   texte: 'J’aime manger la poutine.',   audio: 'jaime-manger-la-poutine',   tr: 'tr_aimemangerpoutine' },
    // 🆕 (10-11-2026) v36 : six nouvelles phrases (voix bek_<audio>_01.mp3). Répartition : fragment 3 = regfilmle (étape 2), regpizzaune et regpizzala (exercice d'écoute final) ;
    //   fragment 4 = aimemangerpizza (fin du verbe, étape 2), aimemangersandwich et aimeregfilm (exercice d'écoute final). Aucun mot nouveau : tout vient des fragments 1 à 4.
    regfilmle:          { mots: ['je', 'regarde', 'le', 'film'],                  texte: 'Je regarde le film.',            audio: 'je-regarde-le-film',        tr: 'tr_regfilmle' },
    regpizzaune:        { mots: ['je', 'regarde', 'une', 'pizza'],                texte: 'Je regarde une pizza.',          audio: 'je-regarde-une-pizza',      tr: 'tr_regpizzaune' },
    regpizzala:         { mots: ['je', 'regarde', 'la', 'pizza'],                 texte: 'Je regarde la pizza.',           audio: 'je-regarde-la-pizza',       tr: 'tr_regpizzala' },
    aimemangersandwich: { mots: ['j', 'aime', 'manger', 'un', 'sandwich'],        texte: 'J’aime manger un sandwich.',     audio: 'jaime-manger-un-sandwich',  tr: 'tr_aimemangersandwich' },
    aimemangerpizza:    { mots: ['j', 'aime', 'manger', 'la', 'pizza'],           texte: 'J’aime manger la pizza.',        audio: 'jaime-manger-la-pizza',     tr: 'tr_aimemangerpizza' },
    aimeregfilm:        { mots: ['j', 'aime', 'regarder', 'un', 'film'],          texte: 'J’aime regarder un film.',       audio: 'jaime-regarder-un-film',    tr: 'tr_aimeregfilm' }
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
    '.m1-paire-art .m1-radical i{background:' + FOND_CONNU + ';color:var(--brun-fonce,#4A3B33);box-shadow:inset 0 -3px 0 ' + COULEUR_CONNU + '}',
    // 🆕 (08-11-2026) CARTE SUIVIE : pendant la boucle de la remarque, la ligne dont l'objet est à l'écran reste nette, les autres s'estompent ; dans la ligne,
    // « un » est en valeur quand l'étal dit « un parmi plusieurs », « le » quand il dit « celui-là ». Même code couleur que l'étal.
    '.m1-paire-suivi .m1-radical{opacity:.38;transition:opacity .5s ease,transform .5s ease}',
    '.m1-paire-suivi .m1-radical.m1-radical-actif{opacity:1;transform:scale(1.05)}',
    '.m1-paire-suivi .m1-radical b,.m1-paire-suivi .m1-radical i{display:inline-block;border-radius:8px;padding:0 .3em;transition:opacity .5s ease,background-color .5s ease,box-shadow .5s ease,transform .5s ease}',
    '.m1-radical-actif[data-mode="nouveau"] b{background:rgba(' + RVB_NOUVEAU + ',.2);box-shadow:inset 0 -3px 0 ' + COULEUR_NOUVEAU + ';transform:scale(1.12)}',
    '.m1-radical-actif[data-mode="nouveau"] i{opacity:.35}',
    '.m1-radical-actif[data-mode="connu"] b{opacity:.35}',
    '.m1-radical-actif[data-mode="connu"] i{transform:scale(1.12)}',
    '@media (prefers-reduced-motion:reduce){.m1-paire-suivi .m1-radical,.m1-paire-suivi .m1-radical b,.m1-paire-suivi .m1-radical i{transition:none}}'
  ].join('\n');
  // 🆕 (08-11-2026) CASE FUSIONNÉE « j’aime » : l'élision s'écrit d'un seul tenant. Une seule case (écriture), deux étiquettes au-dessus (sujet | verbe) ;
  //   la bordure reprend les deux couleurs (celles des cases « sujet » et « verbe », lues dans la feuille de style).
  // 🆕 (09-11-2026) BANDE DE MOTS (fragment 1) : sous le champ où l'on écrit la phrase de mémoire, un petit bouton « Voir les mots » déplie une bande
  // avec les mots de la phrase DANS LE DÉSORDRE (jamais dans l'ordre : l'élève doit encore construire). Replié par défaut ; un clic sur un mot le fait entendre.
  const BANDE_CSS = [
    '.m1-bande{display:flex;flex-direction:column;align-items:center;gap:.45rem;margin:.55rem 0 0}',
    '.m1-bande-btn{display:inline-flex;align-items:center;gap:.4rem;font:inherit;font-weight:700;font-size:.82rem;color:var(--brun-clair,#8A7364);background:transparent;border:1.5px dashed var(--peche,#F0A98B);border-radius:999px;padding:.3rem .8rem;cursor:pointer;transition:background .15s ease,color .15s ease,transform .18s cubic-bezier(.34,1.6,.4,1)}',
    '.m1-bande-btn:hover{background:var(--peche-pale,rgba(240,169,139,.16));color:var(--brun-fonce,#4A3B33)}',
    '.m1-bande-btn:active{transform:scale(.96)}',
    '.m1-bande-btn:focus-visible{outline:3px solid var(--peche-fonce,#E08867);outline-offset:2px}',
    '.m1-bande-btn:disabled{opacity:.45;cursor:default}',
    '.m1-bande-btn svg{width:1.05rem;height:1.05rem;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .3s ease}',
    '.m1-bande-ouverte .m1-bande-btn svg{transform:rotate(180deg)}',
    '.m1-bande-piste{max-height:0;opacity:0;overflow:hidden;visibility:hidden;transition:max-height .4s ease,opacity .3s ease,visibility 0s linear .4s}',
    '.m1-bande-ouverte .m1-bande-piste{max-height:9rem;opacity:1;visibility:visible;transition:max-height .4s ease,opacity .3s ease}',
    '.m1-bande-mots{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem;padding:.55rem .7rem;background:var(--peche-pale,rgba(240,169,139,.16));border-radius:14px}',
    '.m1-bande-mot{font:inherit;font-weight:700;font-size:.95rem;color:var(--brun-fonce,#4A3B33);background:#FFFFFF;border:1.5px solid var(--peche,#F0A98B);border-radius:999px;padding:.2rem .8rem;cursor:pointer;box-shadow:0 2px 0 0 var(--peche,#F0A98B);transition:transform .12s ease,box-shadow .12s ease}',
    '.m1-bande-mot:active{transform:translateY(2px);box-shadow:none}',
    '.m1-bande-mot:focus-visible{outline:3px solid var(--peche-fonce,#E08867);outline-offset:2px}',
    '.m1-bande-appel{animation:m1-bande-appel 1s ease-in-out 2}',
    '@keyframes m1-bande-appel{0%,100%{transform:scale(1)}50%{transform:scale(1.08);background:var(--peche-pale,rgba(240,169,139,.16))}}',
    '@media (prefers-reduced-motion:reduce){.m1-bande-btn svg,.m1-bande-piste,.m1-bande-ouverte .m1-bande-piste{transition:none}.m1-bande-appel{animation:none}}'
  ].join('\n');
  const BANDE_FRAGMENTS = [1, 2, 3, 4];      // fragments où écrire une phrase entière propose la bande de mots (le tout premier niveau)
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
    // 🆕 repos peut être une liste : fragment 1 = après les phrases (avant les images) et après l'écriture de mémoire (avant l'exercice d'écoute)
    1: { intro: { pose: 'bek-mange-sandwich', manger: 'sandwich' }, repos: [{ index: 3, pose: 'bek-mange-sandwich', manger: 'sandwich' }, { index: 5, pose: 'bek-mange-poutine', manger: 'poutine' }] },
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
  const ETAL_PAUSE = 3200;      // 🆕 (09-11-2026) durée de l'état « un / une » (UN seul objet) dans la boucle de la remarque et au clic (le balayage a disparu : 4200 → 3200)
  const ETAL_PAUSE_CONNU = 4000; // 🆕 durée de l'état « le / la » dans la boucle : les deux autres objets apparaissent (≈ 1 s), puis il faut le temps de voir lequel est choisi
  const ATTENTE_VOIX_MAX = 4500;    // 🆕 une phrase dite automatiquement attend la fin de la voix en cours, jusqu'à 4,5 s (avant : 1,5 s, ce qui coupait la fin des phrases longues)
  const FIN_VOIX_MARGE = 260;       // 🆕 respiration (ms) laissée après la fin d'une voix, avant la suivante ou avant de changer d'écran      // durée de l'état « un / une » avant le passage à « le / la » (ms)
  const ETAL_CSS = [
    '.m1-etal{position:relative;display:flex;align-items:center;justify-content:center;gap:1rem;width:max-content;max-width:100%;box-sizing:border-box;margin:0 auto .9rem;padding:.9rem 1.5rem;',
    'background:rgba(255,255,255,.95);border:2px solid var(--brun-fonce,#4A3B33);border-radius:22px;box-shadow:0 3px 0 0 var(--brun-fonce,#4A3B33);cursor:pointer;-webkit-tap-highlight-color:transparent}',
    // 🆕 (09-11-2026) « un » = UN SEUL objet (celui du milieu, cerclé d'ambre) ; « le » = les TROIS sont là, celui du milieu seul est en valeur (halo violet), les deux autres
    // s'estompent. C'est le même objet qui reste : « un sandwich » → « le sandwich » (celui qu'on regardait déjà). Les cases 1 et 3 se replient (largeur 0) en mode « un ».
    '.m1-etal-objets{--m1-o:4.4rem;--m1-m:.4rem;display:flex;align-items:center;justify-content:center}',
    '.m1-etal-objet{position:relative;display:block;flex:none;width:var(--m1-o);height:var(--m1-o);margin:0 var(--m1-m);padding:.25rem;box-sizing:border-box;border-radius:1.2rem;box-shadow:0 0 0 3px transparent;',
    'transition:opacity .9s ease,transform 1s cubic-bezier(.3,.7,.3,1),box-shadow .9s ease,background-color .9s ease,width .85s cubic-bezier(.3,.7,.3,1),margin .85s cubic-bezier(.3,.7,.3,1),padding .85s ease;animation:m1-etal-pop .6s ease backwards}',
    '.m1-etal-objet:nth-child(2){animation-delay:.14s}.m1-etal-objet:nth-child(3){animation-delay:.28s}.m1-etal-nouveau .m1-etal-objet:nth-child(2){animation-delay:0s}',
    '.m1-etal-objet svg{display:block;width:100%;height:100%}',
    '.m1-etal-nouveau .m1-etal-objet:nth-child(odd){width:0;margin:0;padding:0;opacity:0;transform:scale(.4);overflow:hidden;box-shadow:0 0 0 0 transparent;pointer-events:none}',
    '.m1-etal-nouveau .m1-etal-objet:nth-child(2){box-shadow:0 0 0 3px rgba(' + RVB_NOUVEAU + ',.6);background:rgba(' + RVB_NOUVEAU + ',.16)}',
    '.m1-etal-connu .m1-etal-objet{opacity:.22;transform:scale(.82)}',
    '.m1-etal-connu .m1-etal-objet:nth-child(2){transition-delay:0s,.55s,.55s,.55s;opacity:1;transform:scale(1.14);box-shadow:0 0 0 4px ' + COULEUR_CONNU + ',0 0 18px rgba(' + RVB_CONNU + ',.55);background:rgba(' + RVB_CONNU + ',.18)}',
    '.m1-etal-pastille{min-width:3.4rem;text-align:center;padding:.15rem 1rem;border-radius:999px;color:#fff;font-weight:800;font-size:1.5rem;box-shadow:0 3px 0 0 var(--brun-fonce,#4A3B33);transition:background-color .6s ease}',
    '.m1-etal-nouveau .m1-etal-pastille{background:' + COULEUR_NOUVEAU + '}',
    '.m1-etal-connu .m1-etal-pastille{background:' + COULEUR_CONNU + '}',
    // l'élève vient de placer un article dans la phrase : la pastille répond
    '.m1-etal-pulse .m1-etal-pastille{animation:m1-etal-pulse .6s ease}',
    '.m1-etal::after{content:"\\21BB";position:absolute;right:.45rem;top:.15rem;font-size:.8rem;line-height:1;color:var(--brun-fonce,#4A3B33);opacity:.35}',
    '@keyframes m1-etal-pop{from{opacity:0;transform:translateY(.5rem) scale(.85)}to{opacity:1;transform:none}}',
    '@keyframes m1-etal-pulse{40%{transform:scale(1.35)}}',
    '@media (max-width:719px){.m1-etal{gap:.7rem;padding:.7rem 1rem}.m1-etal-objets{--m1-o:3.3rem;--m1-m:.3rem}.m1-etal-pastille{font-size:1.15rem;min-width:2.7rem;padding:.1rem .8rem}}',
    '@media (prefers-reduced-motion:reduce){.m1-etal-objet,.m1-etal-pastille{transition:none;animation:none}.m1-etal-pulse .m1-etal-pastille{animation:none}}'
  ].join('\n');
  const SILENCE_CSS = [      // 🆕 v34 : le bouton « Réécouter » clignote quand la voix d'une phrase n'a pas démarré
    '.m1-haut-parleur.m1-silence{animation:m1-silence 1s ease-in-out 3}',
    '@keyframes m1-silence{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(' + RVB_NOUVEAU + ',0)}50%{transform:scale(1.07);box-shadow:0 0 0 7px rgba(' + RVB_NOUVEAU + ',.55)}}',
    '@media (prefers-reduced-motion:reduce){.m1-haut-parleur.m1-silence{animation:none;outline:3px solid ' + COULEUR_NOUVEAU + ';outline-offset:3px}}'
  ].join('\n');
  const BANQUE_4 = ['j', 'je', 'aime', 'manger', 'mange', 'regarder', 'regarde', 'jouer', 'joue', 'la', 'poutine', 'tele'];   // fragment 4 : j'aime (je, mange, regarde = pièges) (pas « parle », pas « français »)

  const DICO = {
    fr: {
      titre: 'Première mémoire', quitter: 'Quitter la mémoire', son: 'Son', suite: 'Suite', continuer: 'Continuer', valider: 'Valider',
      intro: 'Voilà. Ce souvenir est un peu abîmé, mais on devrait pouvoir en tirer quelques mots.',
      c_mange: '*Touche* les mots pour les *entendre*.',
      c_lire: '*Touche* les mots pour les *entendre* et voir leur *sens*.',
      c_ordre: 'Le souvenir s’efface… Remets les mots *dans l’ordre*.',
      c_ecrire_part: 'Complète les mots qui *manquent*.',
      c_ecrire: 'Écris la phrase *en français*.',
      c_image: 'Tu es Bek. Que *fais-tu* maintenant ?',
      c_audio: '*Écoute*, puis *choisis* les bons mots.',
      reecouter: 'Réécouter', bande_voir: 'Voir les mots', bande_cacher: 'Cacher les mots', bande_ordre: 'Les mots de la phrase, dans le désordre', sans_son: 'Je n’entends rien', construire_vide: 'Touche les mots pour construire ta phrase.',
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
      c_nouveau: 'Quelque chose de *nouveau* apparaît. Construis la phrase.',
      c_connu: 'C’est la même chose, mais tu la *connais déjà*. Construis la phrase.',
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
      c_dictee: '*Écoute*, puis *écris ce que tu entends*. La liste de mots est une aide : tu ne peux pas la *toucher*.',
      c_ecoute_ecris: '*Écoute*, puis *écris ce que tu entends*.',
      c_rappel: 'Tu as déjà vu cette phrase. *Construis-la* de mémoire.', c_finale: 'Complète la *fin* du verbe.',
      tr_regfilmle: '', tr_regpizzaune: '', tr_regpizzala: '', tr_aimemangersandwich: '', tr_aimemangerpizza: '', tr_aimeregfilm: '',
      liste_mots: 'Mots à ta disposition',
      c_aimeq: 'Tu es Bek. Qu’est-ce que tu *aimes* faire ? Écris une phrase *complète*.',
      lec_certif: 'Maintenant, des questions sur Bek. Pour y répondre, il faut te rappeler ce que tu as appris d’elle. Rien à choisir\u00a0: écris-le toi-même. Je vérifie ta réponse, et elle est gardée. Tu peux te tromper. Mais ça pourrait avoir des conséquences plus tard.',
      c_certif1: 'Dans les souvenirs que tu as réparés, quelles choses Bek *mange*-t-elle ? Écris-les avec « *un* » ou « *une* ».',
      quipCompOk: 'Les trois, avec le bon article. Exact. Elle ne dira rien, mais elle apprécie.',
      quipCompEssai: 'Pas encore. Les cases vertes sont justes. Corrige les autres. Un dernier essai.',
      quipCompFin: 'Pas cette fois. Elle mange un sandwich, une poutine et une pizza. C’est noté.',
      comp_reponse: 'Réponse\u00a0: un sandwich, une poutine, une pizza.',
      lec_libre: 'Celle-ci n’a ni bonne ni mauvaise réponse. Un professeur pourrait la lire. Une liste de verbes t’aide, mais ton propre dictionnaire est encore mieux : sers-t’en.',
      c_libre: 'Maintenant, toi : qu’*aimes*-tu faire ? Écris *une phrase de trois mots* : « *je* » + « *aimer* » + un *verbe*.',
      libre_trois: 'Ça ne fait pas trois mots : je + aime + un verbe. Corrige, ou valide encore pour garder ta réponse.',
      gloss_titre: 'Verbes courants', gloss_dico: 'Il en manque ? Cherche-les dans ton propre dictionnaire : c’est une très bonne habitude.',
      gloss_liste: ['manger', 'boire', 'regarder', 'jouer', 'étudier', 'lire', 'écouter', 'chanter', 'danser', 'dormir', 'marcher', 'dessiner', 'cuisiner', 'nager', 'voyager'],
      passer: 'Passer', quipLibre: 'Merci. C’est gardé.',
      copier: 'Copier', copie: 'Copié\u00a0!', toutCopier: 'Tout copier', recap_titre: 'Tes réponses',
      lec_defi: 'Un dernier défi. Aucun indice. Si tu réussis, ça comptera. Si tu échoues, ça comptera aussi.',
      c_defi1: 'Défi (1/2). Voici un verbe. Conjugue-le avec « *je* », au *présent*.',
      sens_etudier: 'apprendre en travaillant',
      c_defi2: 'Défi (2/2). Combine « *étudier* » avec « *aimer* », avec « *je* ». Écris une phrase.',
      presqueAccent: 'Accepté. Mais regarde les accents.', presqueApostrophe: 'Accepté. Mais n’oublie pas l’apostrophe.',
      quipEchec: 'Pas cette fois. C’est noté. On continue.',
      c_rep: 'Le souvenir est abîmé. Répare-le : place chaque mot dans sa case, *de gauche à droite*.',
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
      c_mange: '*Tap* the words to *hear* them.',
      c_lire: '*Tap* the words to *hear* them and see what they *mean*.',
      c_ordre: 'The memory is fading… Put the words back *in order*.',
      c_ecrire_part: 'Fill in the *missing* words.',
      c_ecrire: 'Write the sentence *in French*.',
      c_image: 'You are Bek. What are you *doing* now?',
      c_audio: '*Listen*, then *pick* the right words.',
      reecouter: 'Listen again', bande_voir: 'Show the words', bande_cacher: 'Hide the words', bande_ordre: 'The words of the sentence, in random order', sans_son: 'I can’t hear anything', construire_vide: 'Tap the words to build your sentence.',
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
      c_nouveau: 'Something *new* appears. Build the sentence.',
      c_connu: 'It’s the same thing, but now you *know* it. Build the sentence.',
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
      c_dictee: '*Listen*, then *write what you hear*. The word list is a help: you can’t *tap* it.',
      c_ecoute_ecris: '*Listen*, then *write what you hear*.',
      c_rappel: 'You have already seen this sentence. *Build it* from memory.', c_finale: 'Complete the *end* of the verb.',
      tr_regfilmle: 'I watch the movie.', tr_regpizzaune: 'I watch a pizza.', tr_regpizzala: 'I watch the pizza.', tr_aimemangersandwich: 'I like eating a sandwich.', tr_aimemangerpizza: 'I like eating the pizza.', tr_aimeregfilm: 'I like watching a movie.',
      liste_mots: 'Words you can use',
      c_aimeq: 'You are Bek. What do you *like* doing? Write a *full sentence*.',
      lec_certif: 'Now, questions about Bek. To answer them, you have to remember what you learned about her. Nothing to pick from: write it yourself. I’ll check your answer, and it will be kept. You may get it wrong. But it could have consequences later.',
      c_certif1: 'In the memories you repaired, what things does Bek *eat*? Write them with “*un*” or “*une*”.',
      quipCompOk: 'All three, with the right article. Exactly. She won’t say so, but she’s pleased.',
      quipCompEssai: 'Not yet. The green boxes are right. Fix the others. One last try.',
      quipCompFin: 'Not this time. She eats a sandwich, a poutine and a pizza. It’s noted.',
      comp_reponse: 'Answer: un sandwich, une poutine, une pizza.',
      lec_libre: 'This one has no right or wrong answer. A teacher might read it. A list of verbs can help, but your own dictionary is even better: use it.',
      c_libre: 'Now, you: what do you *like* doing? Write *one three-word sentence*: “*je*” + “*aimer*” + a *verb*.',
      libre_trois: 'That’s not three words: je + aime + a verb. Fix it, or confirm again to keep your answer.',
      gloss_titre: 'Common verbs', gloss_dico: 'Missing one? Look it up in your own dictionary: it’s a great habit.',
      gloss_liste: ['manger — eat', 'boire — drink', 'regarder — watch', 'jouer — play', 'étudier — study', 'lire — read', 'écouter — listen', 'chanter — sing', 'danser — dance', 'dormir — sleep', 'marcher — walk', 'dessiner — draw', 'cuisiner — cook', 'nager — swim', 'voyager — travel'],
      passer: 'Skip', quipLibre: 'Thank you. It’s kept.',
      copier: 'Copy', copie: 'Copied!', toutCopier: 'Copy all', recap_titre: 'Your answers',
      lec_defi: 'One last challenge. No hints. If you succeed, it counts. If you fail, that counts too.',
      c_defi1: 'Challenge (1/2). Here is a verb. Conjugate it with “*je*”, in the *present tense*.',
      sens_etudier: 'to study',
      c_defi2: 'Challenge (2/2). Combine “*étudier*” with “*aimer*”, with “*je*”. Write a sentence.',
      presqueAccent: 'Accepted. But look at the accents.', presqueApostrophe: 'Accepted. But don’t forget the apostrophe.',
      quipEchec: 'Not this time. It’s noted. Moving on.',
      c_rep: 'The memory is damaged. Repair it: place each word in its slot, *from left to right*.',
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
      bande_voir: 'Ver las palabras', bande_cacher: 'Ocultar las palabras', sans_son: 'No oigo nada',
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
      fin: 'Recuerdo reconstruido. Ya sabes decir lo que comes. Lo que no comes… ya llegará.',
      intro2: 'Otro fragmento del recuerdo. Ella sigue comiendo. Pero escucha bien: la palabra pequeña delante de «sandwich» ha cambiado.',
      fin2: 'Segundo fragmento recuperado. Algo nuevo, lo mismo cuando ya lo conoces: ahora sabes distinguirlo. Quedan más fragmentos.',
      sens_le: 'el (palabra masculina: aquello de lo que hablamos)',
      sens_la: 'la (palabra femenina: aquello de lo que hablamos)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Yo como el sándwich.',
      tr_poutinela: 'Yo como la poutine.',
      tr_pizzaune: 'Yo como una pizza.',
      tr_pizzala: 'Yo como la pizza.',
      noteL_titre: 'Observación',
      noteL: '«un» y «une»: algo nuevo, uno entre otros. «le» y «la»: aquello de lo que hablamos, lo que ya conocemos. Masculino: un → le. Femenino: une → la.',
      c_nouveau: 'Aparece algo *nuevo*. Construye la frase.',
      c_connu: 'Es lo mismo, pero ahora ya lo *conoces*. Construye la frase.',
      quipNouveau: 'Aparece algo nuevo: decimos «un» o «une».',
      quipConnu: 'Lo mismo, ya conocido: decimos «le» o «la».',
      quipLe: 'Masculino, así que «le». No «la».',
      quipLa: 'Femenino, así que «la». No «le».',
      quipDef: 'Hablamos de algo que ya conocemos: «le» o «la», no «un» ni «une».',
      quipIndef: 'Algo nuevo: «un» o «une», no «le» ni «la».',
      quipUne2: 'Femenino: «une», no «un». La misma regla de antes.',
      quipUn2: 'Masculino: «un», no «une». La misma regla de antes.',
      quipLeSandwich: 'El sándwich. Ese que ella ya conoce de sobra.',
      quipLaPoutine: 'La poutine. A esa no la hemos olvidado. Qué lástima.',
      quipPizza: 'Una pizza. Al menos de esta nadie discute.',
      cult_pizza: 'La palabra «pizza» viene del italiano. En francés es femenina: une pizza, la pizza.',
      sens_joue: 'jugar (yo juego)',
      tr_regpoutinela: 'Yo miro la poutine.',
      tr_regsandwichle: 'Yo miro el sándwich.',
      tr_jejoue: 'Yo juego.',
      quipRegPoutineLa: 'La poutine. Sigue mirándola, sin comérsela nunca. Tiene principios.',
      quipRegSandwichLe: 'El mismo sándwich. Ya lo conoce. Y aun así no se lo come.',
      quipJeJoue: 'Con «je», el verbo pierde la -r: jouer → joue. Como mange, como regarde.',
      reprise: 'Retomamos donde lo dejamos. No he olvidado nada, ya lo ves.',
      quitter_titre: '¿Salir y continuar más tarde?',
      quitter_info: 'Tu progreso queda guardado.',
      quitter_oui: 'Salir',
      quitter_non: 'Quedarme',
      intro5: 'Ya están los cuatro fragmentos. Ahora toca juntarlos, tú solo. Yo no diré nada. Bueno, casi nada.',
      fin5: 'Recuerdo reparado. Cuatro fragmentos, seis frases, una poutine. Podría haber sido peor.',
      intro6: 'Último fragmento del recuerdo. Esta vez nadie te lleva de la mano. Hay cosas que solo un humano puede hacer: escuchar, escribir, recordar. Tienes que acostumbrarte. Aquí no cuenta… pero lo que escribas quedará registrado.',
      fin6: 'Último fragmento recuperado. El recuerdo está completo. Lo que escribiste se guarda. En cuanto a lo que viene después… ya veremos.',
      c_dictee: '*Escucha* y luego *escribe lo que oyes*. La lista de palabras es una ayuda: no se puede *tocar*.',
      c_ecoute_ecris: '*Escucha* y luego *escribe lo que oyes*.',
      c_rappel: 'Ya has visto esta frase. *Constrúyela* de memoria.', c_finale: 'Completa el *final* del verbo.',
      tr_regfilmle: 'Yo veo la película.', tr_regpizzaune: 'Yo miro una pizza.', tr_regpizzala: 'Yo miro la pizza.', tr_aimemangersandwich: 'Me gusta comer un sándwich.', tr_aimemangerpizza: 'Me gusta comer la pizza.', tr_aimeregfilm: 'Me gusta ver una película.',
      liste_mots: 'Palabras que puedes usar',
      c_aimeq: 'Eres Bek. ¿Qué te *gusta* hacer? Escribe una *frase completa*.',
      lec_certif: 'Ahora, preguntas sobre Bek. Para responderlas tienes que recordar lo que has aprendido sobre ella. No hay nada entre lo que elegir: escríbelo tú. Comprobaré tu respuesta y se guardará. Puedes equivocarte. Pero podría tener consecuencias más adelante.',
      c_certif1: 'En los recuerdos que has reparado, ¿qué cosas *come* Bek? Escríbelas con «*un*» o «*une*».',
      quipCompOk: 'Las tres, con el artículo correcto. Exacto. Ella no lo dirá, pero está contenta.',
      quipCompEssai: 'Todavía no. Las casillas verdes están bien. Corrige las demás. Un último intento.',
      quipCompFin: 'Esta vez no. Ella come un sándwich, una poutine y una pizza. Queda anotado.',
      comp_reponse: 'Respuesta: un sandwich, une poutine, une pizza.',
      lec_libre: 'Esta no tiene respuesta correcta ni incorrecta. Puede que un profesor la lea. Una lista de verbos puede ayudarte, pero tu propio diccionario es aún mejor: úsalo.',
      c_libre: 'Ahora, tú: ¿qué te *gusta* hacer? Escribe *una frase de tres palabras*: «*je*» + «*aimer*» + un *verbo*.',
      libre_trois: 'Eso no son tres palabras: je + aime + un verbo. Corrígelo, o confirma otra vez para conservar tu respuesta.',
      gloss_titre: 'Verbos frecuentes',
      gloss_dico: '¿Te falta alguno? Búscalo en tu propio diccionario: es un excelente hábito.',
      gloss_liste: [
        'manger — comer',
        'boire — beber',
        'regarder — mirar',
        'jouer — jugar',
        'étudier — estudiar',
        'lire — leer',
        'écouter — escuchar',
        'chanter — cantar',
        'danser — bailar',
        'dormir — dormir',
        'marcher — caminar',
        'dessiner — dibujar',
        'cuisiner — cocinar',
        'nager — nadar',
        'voyager — viajar'
      ],
      passer: 'Saltar',
      quipLibre: 'Gracias. Queda guardado.',
      copier: 'Copiar',
      copie: '¡Copiado!',
      toutCopier: 'Copiar todo',
      recap_titre: 'Tus respuestas',
      lec_defi: 'Un último reto. Sin ayudas. Si lo logras, cuenta. Si fallas, también cuenta.',
      c_defi1: 'Reto (1/2). Aquí tienes un verbo. Conjúgalo con «*je*», en *presente*.',
      sens_etudier: 'estudiar',
      c_defi2: 'Reto (2/2). Combina «*étudier*» con «*aimer*», con «*je*». Escribe una frase.',
      presqueAccent: 'Aceptado. Pero fíjate en los acentos.',
      presqueApostrophe: 'Aceptado. Pero no olvides el apóstrofo.',
      quipEchec: 'Esta vez no. Queda anotado. Seguimos.',
      c_rep: 'El recuerdo está dañado. Repáralo: coloca cada palabra en su lugar, *de izquierda a derecha*.',
      tr_aimepizza: 'Me gusta la pizza.',
      repApres1: 'Una película. Al menos tiene gustos.',
      repApres3: 'Me gusta la pizza. Por fin, una opinión firme.',
      repApres5: 'Queda una frase. Ya puedes adivinar cuál.',
      intro4: 'Otro fragmento del recuerdo. Esta vez habla de lo que le gusta. Ya verás, es conmovedor.',
      fin4: 'Cuarto fragmento recuperado. Ya sabes decir lo que comes, lo que miras y lo que te gusta. El recuerdo va tomando forma.',
      sens_j: 'yo («je» ante vocal)',
      sens_aime: 'gustar / querer',
      sens_manger: 'comer (forma básica)',
      sens_regarder: 'mirar (forma básica)',
      sens_jouer: 'jugar (forma básica)',
      sens_tele: 'tele (abreviatura de télévision)',
      tr_aimepoutine: 'Me gusta la poutine.',
      tr_aimemanger: 'Me gusta comer.',
      tr_aimetele: 'Me gusta ver la tele.',
      tr_aimejouer: 'Me gusta jugar.',
      tr_aimeregpoutine: 'Me gusta mirar la poutine.',
      tr_aimemangerpoutine: 'Me gusta comer poutine.',
      noteJ_titre: 'Observación',
      noteJ: '«je» ante vocal se convierte en «j’»: je + aime → j’aime. Ante consonante no cambia nada: je mange. Pasa también con otras palabras pequeñas, como «le» y «la».',
      noteI_titre: 'Observación',
      noteI: 'Después de «aimer», el verbo se queda en su forma básica: el infinitivo. Termina en -er: mang-er, regard-er, jou-er. Es el verbo sin «je».',
      quipJe: 'Ante «aime», «je» se convierte en «j’». Las vocales merecen respeto.',
      quipInf: 'Después de «j’aime», el verbo conserva su forma básica: -er, no -e.',
      quipApostrophe: '¡Casi! No olvides el apóstrofo.',
      quipAimePoutine: 'Le gusta la poutine. Se nota en su entusiasmo. Bueno, se intuye.',
      quipAimeManger: 'Comer. Una constante en ella.',
      quipAimeJouer: 'Jugar. ¿A qué? No lo dice. Un misterio más.',
      quipAimeRegPoutine: 'Mirar la poutine. Volvemos a lo mismo. Sigue siendo contemplativa.',
      cult_tele: 'Tanto en Quebec como en Francia, casi todo el mundo dice «la télé». Es la abreviatura de «télévision», una palabra femenina.',
      intro3: 'Otro fragmento del mismo recuerdo. Esta vez no está comiendo. Está mirando. Matiz.',
      finSuite: 'Primer fragmento recuperado. El recuerdo aún no está completo. Quedan más.',
      fin3: 'Tercer fragmento recuperado. Ya sabes decir lo que miras y lo que comes. No los confundas.',
      sens_regarde: 'mirar / ver',
      sens_film: 'película',
      tr_regarde: 'Yo miro. / Yo veo.',
      tr_film: 'Yo veo una película.',
      tr_regpoutine: 'Yo miro una poutine.',
      tr_regsandwich: 'Yo miro un sándwich.',
      noteR_titre: 'Observación',
      noteR: 'Otro verbo en -er: je regard-e. Y se «regarde» algo directamente: ninguna palabra pequeña entre el verbo y lo que miras. No hay «a».',
      quipFilm: 'Una película. Por fin, algo sensato.',
      quipRegPoutine: 'Mirar una poutine. Qué… contemplativo.',
      quipRegSandwich: 'Mira el sándwich. Tiene hambre, pero espera. Admirable.',
      quipVerbe: 'No come. Mira. El verbo importa.',
      quipFilmMange: '¿Comerse una película? Original. Pero no.',
      quipUn: '«Un film», no «une». La palabra es masculina.',
      cult_film: 'La palabra «film» viene del inglés, donde designaba una película fina. En francés es masculina: un film.'
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
      bande_voir: 'Mostra le parole', bande_cacher: 'Nascondi le parole', sans_son: 'Non sento niente',
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
      fin: 'Ricordo ricostruito. Ora sai dire che cosa mangi. Quello che non mangi… arriverà.',
      intro2: 'Un altro frammento del ricordo. Lei sta ancora mangiando. Ma ascolta bene: la parolina davanti a «sandwich» è cambiata.',
      fin2: 'Secondo frammento recuperato. Una cosa nuova, la stessa cosa quando la conosci: ora sai fare la differenza. Ci sono altri frammenti.',
      sens_le: 'il (parola maschile: la cosa di cui si parla)',
      sens_la: 'la (parola femminile: la cosa di cui si parla)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Io mangio il sandwich.',
      tr_poutinela: 'Io mangio la poutine.',
      tr_pizzaune: 'Io mangio una pizza.',
      tr_pizzala: 'Io mangio la pizza.',
      noteL_titre: 'Nota',
      noteL: '«un» e «une»: qualcosa di nuovo, uno tra tanti. «le» e «la»: la cosa di cui parliamo, quella che già conosciamo. Maschile: un → le. Femminile: une → la.',
      c_nouveau: 'Appare qualcosa di *nuovo*. Costruisci la frase.',
      c_connu: 'È la stessa cosa, ma ora la *conosci*. Costruisci la frase.',
      quipNouveau: 'Appare una cosa nuova: si dice «un» o «une».',
      quipConnu: 'La stessa cosa, ormai conosciuta: si dice «le» o «la».',
      quipLe: 'Maschile, quindi «le». Non «la».',
      quipLa: 'Femminile, quindi «la». Non «le».',
      quipDef: 'Parliamo di qualcosa che già conosciamo: «le» o «la», non «un» né «une».',
      quipIndef: 'Qualcosa di nuovo: «un» o «une», non «le» né «la».',
      quipUne2: 'Femminile: «une», non «un». Stessa regola di prima.',
      quipUn2: 'Maschile: «un», non «une». Stessa regola di prima.',
      quipLeSandwich: 'Il sandwich. Quello che ormai conosce benissimo.',
      quipLaPoutine: 'La poutine. Quella non l’abbiamo dimenticata. Peccato.',
      quipPizza: 'Una pizza. Almeno su questa nessuno discute.',
      cult_pizza: 'La parola «pizza» viene dall’italiano. In francese è femminile: une pizza, la pizza.',
      sens_joue: 'giocare (io gioco)',
      tr_regpoutinela: 'Io guardo la poutine.',
      tr_regsandwichle: 'Io guardo il sandwich.',
      tr_jejoue: 'Io gioco.',
      quipRegPoutineLa: 'La poutine. Sempre guardata, mai mangiata. Ha dei principi.',
      quipRegSandwichLe: 'Lo stesso sandwich. Ormai lo conosce. E ancora non lo mangia.',
      quipJeJoue: 'Con «je», il verbo perde la -r: jouer → joue. Come mange, come regarde.',
      reprise: 'Riprendiamo da dove eravamo rimasti. Non ho dimenticato niente, vedi.',
      quitter_titre: 'Uscire e continuare più tardi?',
      quitter_info: 'I tuoi progressi sono salvati.',
      quitter_oui: 'Esci',
      quitter_non: 'Resta',
      intro5: 'Ci sono tutti e quattro i frammenti. Ora bisogna rimetterli insieme, da solo. Io non dirò niente. Beh, quasi niente.',
      fin5: 'Ricordo riparato. Quattro frammenti, sei frasi, una poutine. Poteva andare peggio.',
      intro6: 'Ultimo frammento del ricordo. Stavolta nessuno ti tiene per mano. Alcune cose può farle solo un essere umano: ascoltare, scrivere, ricordare. Devi abituartici. Qui non conta… ma quello che scrivi verrà registrato.',
      fin6: 'Ultimo frammento recuperato. Il ricordo è intero. Quello che hai scritto viene conservato. Quanto a ciò che viene dopo… vedremo.',
      c_dictee: '*Ascolta*, poi *scrivi quello che senti*. L’elenco di parole è un aiuto: non si può *toccare*.',
      c_ecoute_ecris: '*Ascolta*, poi *scrivi quello che senti*.',
      c_rappel: 'Hai già visto questa frase. *Costruiscila* a memoria.', c_finale: 'Completa la *fine* del verbo.',
      tr_regfilmle: 'Io guardo il film.', tr_regpizzaune: 'Io guardo una pizza.', tr_regpizzala: 'Io guardo la pizza.', tr_aimemangersandwich: 'Mi piace mangiare un panino.', tr_aimemangerpizza: 'Mi piace mangiare la pizza.', tr_aimeregfilm: 'Mi piace guardare un film.',
      liste_mots: 'Parole che puoi usare',
      c_aimeq: 'Sei Bek. Che cosa ti *piace* fare? Scrivi una *frase completa*.',
      lec_certif: 'Ora, domande su Bek. Per rispondere devi ricordare ciò che hai imparato su di lei. Niente da scegliere: scrivi tu. Controllerò la tua risposta e verrà conservata. Puoi sbagliare. Ma potrebbe avere conseguenze più avanti.',
      c_certif1: 'Nei ricordi che hai riparato, quali cose *mangia* Bek? Scrivile con «*un*» o «*une*».',
      quipCompOk: 'Tutte e tre, con l’articolo giusto. Esatto. Lei non lo dirà, ma è contenta.',
      quipCompEssai: 'Non ancora. Le caselle verdi sono giuste. Correggi le altre. Un ultimo tentativo.',
      quipCompFin: 'Non stavolta. Lei mangia un sandwich, una poutine e una pizza. Annotato.',
      comp_reponse: 'Risposta: un sandwich, une poutine, une pizza.',
      lec_libre: 'Questa non ha una risposta giusta o sbagliata. Potrebbe leggerla un insegnante. Un elenco di verbi può aiutare, ma il tuo dizionario è ancora meglio: usalo.',
      c_libre: 'Ora tocca a te: che cosa ti *piace* fare? Scrivi *una frase di tre parole*: «*je*» + «*aimer*» + un *verbo*.',
      libre_trois: 'Non sono tre parole: je + aime + un verbo. Correggi, oppure conferma di nuovo per conservare la tua risposta.',
      gloss_titre: 'Verbi comuni',
      gloss_dico: 'Ne manca uno? Cercalo nel tuo dizionario: è un’ottima abitudine.',
      gloss_liste: [
        'manger — mangiare',
        'boire — bere',
        'regarder — guardare',
        'jouer — giocare',
        'étudier — studiare',
        'lire — leggere',
        'écouter — ascoltare',
        'chanter — cantare',
        'danser — ballare',
        'dormir — dormire',
        'marcher — camminare',
        'dessiner — disegnare',
        'cuisiner — cucinare',
        'nager — nuotare',
        'voyager — viaggiare'
      ],
      passer: 'Salta',
      quipLibre: 'Grazie. È conservata.',
      copier: 'Copia',
      copie: 'Copiato!',
      toutCopier: 'Copia tutto',
      recap_titre: 'Le tue risposte',
      lec_defi: 'Un’ultima sfida. Niente aiuti. Se ci riesci, conta. Se fallisci, conta lo stesso.',
      c_defi1: 'Sfida (1/2). Ecco un verbo. Coniugalo con «*je*», al *presente*.',
      sens_etudier: 'studiare',
      c_defi2: 'Sfida (2/2). Combina «*étudier*» con «*aimer*», con «*je*». Scrivi una frase.',
      presqueAccent: 'Accettato. Ma guarda gli accenti.',
      presqueApostrophe: 'Accettato. Ma non dimenticare l’apostrofo.',
      quipEchec: 'Non stavolta. Annotato. Andiamo avanti.',
      c_rep: 'Il ricordo è danneggiato. Riparalo: metti ogni parola al suo posto, *da sinistra a destra*.',
      tr_aimepizza: 'Mi piace la pizza.',
      repApres1: 'Un film. Almeno ha dei gusti.',
      repApres3: 'Mi piace la pizza. Finalmente un’opinione netta.',
      repApres5: 'Resta una frase. Puoi indovinare quale.',
      intro4: 'Un altro frammento del ricordo. Stavolta parla di ciò che le piace. Vedrai, è commovente.',
      fin4: 'Quarto frammento recuperato. Sai dire che cosa mangi, che cosa guardi e che cosa ti piace. Il ricordo prende forma.',
      sens_j: 'io («je» davanti a vocale)',
      sens_aime: 'piacere / amare',
      sens_manger: 'mangiare (forma base)',
      sens_regarder: 'guardare (forma base)',
      sens_jouer: 'giocare (forma base)',
      sens_tele: 'tv (abbreviazione di télévision)',
      tr_aimepoutine: 'Mi piace la poutine.',
      tr_aimemanger: 'Mi piace mangiare.',
      tr_aimetele: 'Mi piace guardare la tv.',
      tr_aimejouer: 'Mi piace giocare.',
      tr_aimeregpoutine: 'Mi piace guardare la poutine.',
      tr_aimemangerpoutine: 'Mi piace mangiare la poutine.',
      noteJ_titre: 'Nota',
      noteJ: '«je» davanti a una vocale diventa «j’»: je + aime → j’aime. Davanti a una consonante non cambia nulla: je mange. Succede anche con altre parole piccole, come «le» e «la».',
      noteI_titre: 'Nota',
      noteI: 'Dopo «aimer», il verbo resta nella sua forma base: l’infinito. Finisce in -er: mang-er, regard-er, jou-er. È il verbo senza «je».',
      quipJe: 'Davanti a «aime», «je» diventa «j’». Le vocali meritano rispetto.',
      quipInf: 'Dopo «j’aime», il verbo conserva la sua forma base: -er, non -e.',
      quipApostrophe: 'Quasi! Non dimenticare l’apostrofo.',
      quipAimePoutine: 'Le piace la poutine. Si capisce dal suo entusiasmo. Be’, si intuisce.',
      quipAimeManger: 'Mangiare. Una costante, con lei.',
      quipAimeJouer: 'Giocare. A cosa? Non lo dice. Un mistero in più.',
      quipAimeRegPoutine: 'Guardare la poutine. Ci risiamo. Sempre contemplativa.',
      cult_tele: 'In Québec come in Francia, quasi tutti dicono «la télé». È l’abbreviazione di «télévision», una parola femminile.',
      intro3: 'Un altro frammento dello stesso ricordo. Stavolta non mangia. Guarda. Sfumatura.',
      finSuite: 'Primo frammento recuperato. Il ricordo non è ancora intero. Ce ne sono altri.',
      fin3: 'Terzo frammento recuperato. Ora sai dire che cosa guardi e che cosa mangi. Non confonderli.',
      sens_regarde: 'guardare',
      sens_film: 'film',
      tr_regarde: 'Io guardo.',
      tr_film: 'Io guardo un film.',
      tr_regpoutine: 'Io guardo una poutine.',
      tr_regsandwich: 'Io guardo un sandwich.',
      noteR_titre: 'Nota',
      noteR: 'Un altro verbo in -er: je regard-e. E si «regarde» qualcosa direttamente: nessuna parolina tra il verbo e ciò che guardi. Niente «a».',
      quipFilm: 'Un film. Finalmente qualcosa di sensato.',
      quipRegPoutine: 'Guardare una poutine. Che… contemplativo.',
      quipRegSandwich: 'Guarda il sandwich. Ha fame, ma aspetta. Ammirevole.',
      quipVerbe: 'Non mangia. Guarda. Il verbo conta.',
      quipFilmMange: 'Mangiare un film. Originale. Ma no.',
      quipUn: '«Un film», non «une». La parola è maschile.',
      cult_film: 'La parola «film» viene dall’inglese, dove indicava una pellicola sottile. In francese è maschile: un film.'
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
      bande_voir: 'Ver as palavras', bande_cacher: 'Esconder as palavras', sans_son: 'Não estou ouvindo nada',
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
      fin: 'Lembrança reconstruída. Agora você sabe dizer o que come. O que você não come… isso vem depois.',
      intro2: 'Outro fragmento da lembrança. Ela continua a comer. Mas oiça bem: a palavrinha antes de «sandwich» mudou.',
      fin2: 'Segundo fragmento recuperado. Uma coisa nova, a mesma coisa quando já a conhece: agora sabe distinguir. Há mais fragmentos.',
      sens_le: 'o (palavra masculina: aquilo de que estamos a falar)',
      sens_la: 'a (palavra feminina: aquilo de que estamos a falar)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Eu como a sanduíche.',
      tr_poutinela: 'Eu como a poutine.',
      tr_pizzaune: 'Eu como uma pizza.',
      tr_pizzala: 'Eu como a pizza.',
      noteL_titre: 'Observação',
      noteL: '«un» e «une»: algo novo, um entre vários. «le» e «la»: aquilo de que estamos a falar, o que já conhecemos. Masculino: un → le. Feminino: une → la.',
      c_nouveau: 'Aparece algo *novo*. Construa a frase.',
      c_connu: 'É a mesma coisa, mas agora já a *conhece*. Construa a frase.',
      quipNouveau: 'Aparece uma coisa nova: diz-se «un» ou «une».',
      quipConnu: 'A mesma coisa, já conhecida: diz-se «le» ou «la».',
      quipLe: 'Masculino, portanto «le». Não «la».',
      quipLa: 'Feminino, portanto «la». Não «le».',
      quipDef: 'Falamos de algo que já conhecemos: «le» ou «la», não «un» nem «une».',
      quipIndef: 'Algo novo: «un» ou «une», não «le» nem «la».',
      quipUne2: 'Feminino: «une», não «un». A mesma regra de há pouco.',
      quipUn2: 'Masculino: «un», não «une». A mesma regra de há pouco.',
      quipLeSandwich: 'A sanduíche. Aquela que ela já conhece muito bem.',
      quipLaPoutine: 'A poutine. Essa não a esquecemos. Pena.',
      quipPizza: 'Uma pizza. Pelo menos sobre esta ninguém discute.',
      cult_pizza: 'A palavra «pizza» vem do italiano. Em francês é feminina: une pizza, la pizza.',
      sens_joue: 'jogar (eu jogo)',
      tr_regpoutinela: 'Eu olho para a poutine.',
      tr_regsandwichle: 'Eu olho para a sanduíche.',
      tr_jejoue: 'Eu jogo.',
      quipRegPoutineLa: 'A poutine. Continua só a olhar, nunca a come. Tem princípios.',
      quipRegSandwichLe: 'A mesma sanduíche. Já a conhece. E mesmo assim não a come.',
      quipJeJoue: 'Com «je», o verbo perde o -r: jouer → joue. Como mange, como regarde.',
      reprise: 'Retomamos de onde tínhamos ficado. Não me esqueci de nada, como vê.',
      quitter_titre: 'Sair e continuar mais tarde?',
      quitter_info: 'O seu progresso fica guardado.',
      quitter_oui: 'Sair',
      quitter_non: 'Ficar',
      intro5: 'Os quatro fragmentos estão cá. Agora é juntá-los, sozinho. Eu não direi nada. Bem, quase nada.',
      fin5: 'Lembrança reparada. Quatro fragmentos, seis frases, uma poutine. Podia ter sido pior.',
      intro6: 'Último fragmento da lembrança. Desta vez, ninguém lhe dá a mão. Há coisas que só um humano pode fazer: ouvir, escrever, lembrar-se. Tem de se habituar. Aqui não conta… mas o que escrever fica registado.',
      fin6: 'Último fragmento recuperado. A lembrança está inteira. O que escreveu fica guardado. Quanto ao que vem a seguir… logo se vê.',
      c_dictee: '*Oiça* e depois *escreva o que ouviu*. A lista de palavras é uma ajuda: não se pode *tocar* nela.',
      c_ecoute_ecris: '*Oiça* e depois *escreva o que ouviu*.',
      c_rappel: 'Esta frase já apareceu. *Construa-a* de memória.', c_finale: 'Complete o *final* do verbo.',
      tr_regfilmle: 'Eu vejo o filme.', tr_regpizzaune: 'Eu olho para uma pizza.', tr_regpizzala: 'Eu olho para a pizza.', tr_aimemangersandwich: 'Eu gosto de comer um sanduíche.', tr_aimemangerpizza: 'Eu gosto de comer a pizza.', tr_aimeregfilm: 'Eu gosto de ver um filme.',
      liste_mots: 'Palavras que pode usar',
      c_aimeq: 'Você é a Bek. O que é que *gosta* de fazer? Escreva uma *frase completa*.',
      lec_certif: 'Agora, perguntas sobre a Bek. Para responder, tem de se lembrar do que aprendeu sobre ela. Não há nada para escolher: escreva você. Vou verificar a sua resposta, e ela será guardada. Pode enganar-se. Mas pode ter consequências mais tarde.',
      c_certif1: 'Nas lembranças que reparou, que coisas é que a Bek *come*? Escreva-as com «*un*» ou «*une*».',
      quipCompOk: 'As três, com o artigo certo. Exatamente. Ela não o dirá, mas está contente.',
      quipCompEssai: 'Ainda não. As caixas verdes estão certas. Corrija as outras. Uma última tentativa.',
      quipCompFin: 'Desta vez não. Ela come uma sanduíche, uma poutine e uma pizza. Fica anotado.',
      comp_reponse: 'Resposta: un sandwich, une poutine, une pizza.',
      lec_libre: 'Esta não tem resposta certa nem errada. Um professor pode lê-la. Uma lista de verbos pode ajudar, mas o seu próprio dicionário é ainda melhor: use-o.',
      c_libre: 'Agora, você: o que é que *gosta* de fazer? Escreva *uma frase de três palavras*: «*je*» + «*aimer*» + um *verbo*.',
      libre_trois: 'Isso não são três palavras: je + aime + um verbo. Corrija, ou confirme outra vez para guardar a sua resposta.',
      gloss_titre: 'Verbos comuns',
      gloss_dico: 'Falta algum? Procure-o no seu próprio dicionário: é um ótimo hábito.',
      gloss_liste: [
        'manger — comer',
        'boire — beber',
        'regarder — olhar / ver',
        'jouer — jogar',
        'étudier — estudar',
        'lire — ler',
        'écouter — ouvir',
        'chanter — cantar',
        'danser — dançar',
        'dormir — dormir',
        'marcher — andar',
        'dessiner — desenhar',
        'cuisiner — cozinhar',
        'nager — nadar',
        'voyager — viajar'
      ],
      passer: 'Saltar',
      quipLibre: 'Agradeço. Fica guardado.',
      copier: 'Copiar',
      copie: 'Copiado!',
      toutCopier: 'Copiar tudo',
      recap_titre: 'As suas respostas',
      lec_defi: 'Um último desafio. Sem ajudas. Se conseguir, conta. Se falhar, também conta.',
      c_defi1: 'Desafio (1/2). Aqui está um verbo. Conjugue-o com «*je*», no *presente*.',
      sens_etudier: 'estudar',
      c_defi2: 'Desafio (2/2). Combine «*étudier*» com «*aimer*», com «*je*». Escreva uma frase.',
      presqueAccent: 'Aceite. Mas veja os acentos.',
      presqueApostrophe: 'Aceite. Mas não se esqueça do apóstrofo.',
      quipEchec: 'Desta vez não. Fica anotado. Seguimos.',
      c_rep: 'A lembrança está danificada. Repare-a: coloque cada palavra no seu lugar, *da esquerda para a direita*.',
      tr_aimepizza: 'Eu gosto de pizza.',
      repApres1: 'Um filme. Ao menos tem gostos.',
      repApres3: 'Eu gosto de pizza. Finalmente, uma opinião firme.',
      repApres5: 'Falta uma frase. Pode adivinhar qual.',
      intro4: 'Outro fragmento da lembrança. Desta vez, ela fala do que gosta. Vai ver, é comovente.',
      fin4: 'Quarto fragmento recuperado. Já sabe dizer o que come, o que vê e de que gosta. A lembrança vai ganhando forma.',
      sens_j: 'eu («je» antes de vogal)',
      sens_aime: 'gostar / amar',
      sens_manger: 'comer (forma básica)',
      sens_regarder: 'olhar / ver (forma básica)',
      sens_jouer: 'jogar (forma básica)',
      sens_tele: 'TV (abreviatura de télévision)',
      tr_aimepoutine: 'Eu gosto de poutine.',
      tr_aimemanger: 'Eu gosto de comer.',
      tr_aimetele: 'Eu gosto de ver TV.',
      tr_aimejouer: 'Eu gosto de jogar.',
      tr_aimeregpoutine: 'Eu gosto de olhar para a poutine.',
      tr_aimemangerpoutine: 'Eu gosto de comer poutine.',
      noteJ_titre: 'Observação',
      noteJ: '«je» antes de vogal passa a «j’»: je + aime → j’aime. Antes de consoante, nada muda: je mange. Acontece também com outras palavrinhas, como «le» e «la».',
      noteI_titre: 'Observação',
      noteI: 'Depois de «aimer», o verbo fica na sua forma básica: o infinitivo. Termina em -er: mang-er, regard-er, jou-er. É o verbo sem «je».',
      quipJe: 'Antes de «aime», «je» passa a «j’». As vogais merecem respeito.',
      quipInf: 'Depois de «j’aime», o verbo mantém a forma básica: -er, não -e.',
      quipApostrophe: 'Quase! Não se esqueça do apóstrofo.',
      quipAimePoutine: 'Ela gosta de poutine. Nota-se pelo entusiasmo. Bem, adivinha-se.',
      quipAimeManger: 'Comer. Uma constante nela.',
      quipAimeJouer: 'Jogar. A quê? Não diz. Mais um mistério.',
      quipAimeRegPoutine: 'Olhar para a poutine. Voltámos a isto. Continua contemplativa.',
      cult_tele: 'No Quebeque, como em França, diz-se sobretudo «la télé». É a abreviatura de «télévision», uma palavra feminina.',
      intro3: 'Outro fragmento da mesma lembrança. Desta vez ela não está a comer. Está a olhar. Nuance.',
      finSuite: 'Primeiro fragmento recuperado. A lembrança ainda não está inteira. Há mais.',
      fin3: 'Terceiro fragmento recuperado. Agora sabe dizer o que olha e o que come. Não os confunda.',
      sens_regarde: 'olhar / ver',
      sens_film: 'filme',
      tr_regarde: 'Eu olho. / Eu vejo.',
      tr_film: 'Eu vejo um filme.',
      tr_regpoutine: 'Eu olho para uma poutine.',
      tr_regsandwich: 'Eu olho para uma sanduíche.',
      noteR_titre: 'Observação',
      noteR: 'Mais um verbo em -er: je regard-e. E «regarde»-se algo diretamente: nenhuma palavrinha entre o verbo e aquilo que se olha. Nada de «para».',
      quipFilm: 'Um filme. Finalmente, algo sensato.',
      quipRegPoutine: 'Olhar para uma poutine. Que… contemplativo.',
      quipRegSandwich: 'Ela olha para a sanduíche. Tem fome, mas espera. Admirável.',
      quipVerbe: 'Ela não come. Olha. O verbo conta.',
      quipFilmMange: 'Comer um filme. Original. Mas não.',
      quipUn: '«Un film», não «une». A palavra é masculina.',
      cult_film: 'A palavra «film» vem do inglês, onde designava uma película fina. Em francês é masculina: un film.'
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
      bande_voir: 'Veure les paraules', bande_cacher: 'Amagar les paraules', sans_son: 'No sento res',
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
      fin: 'Record reconstruït. Ara saps dir què menges. El que no menges… ja arribarà.',
      intro2: 'Un altre fragment del record. Ella encara menja. Però escolta bé: la paraula petita davant de «sandwich» ha canviat.',
      fin2: 'Segon fragment recuperat. Una cosa nova, la mateixa cosa quan ja la coneixes: ara saps fer la diferència. Hi ha més fragments.',
      sens_le: 'el (paraula masculina: allò de què parlem)',
      sens_la: 'la (paraula femenina: allò de què parlem)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Jo menjo el sandvitx.',
      tr_poutinela: 'Jo menjo la poutine.',
      tr_pizzaune: 'Jo menjo una pizza.',
      tr_pizzala: 'Jo menjo la pizza.',
      noteL_titre: 'Observació',
      noteL: '«un» i «une»: alguna cosa nova, una entre moltes. «le» i «la»: allò de què parlem, el que ja coneixem. Masculí: un → le. Femení: une → la.',
      c_nouveau: 'Apareix alguna cosa *nova*. Construeix la frase.',
      c_connu: 'És la mateixa cosa, però ara ja la *coneixes*. Construeix la frase.',
      quipNouveau: 'Apareix una cosa nova: diem «un» o «une».',
      quipConnu: 'La mateixa cosa, ja coneguda: diem «le» o «la».',
      quipLe: 'Masculí, per tant «le». No «la».',
      quipLa: 'Femení, per tant «la». No «le».',
      quipDef: 'Parlem d’alguna cosa que ja coneixem: «le» o «la», no «un» ni «une».',
      quipIndef: 'Alguna cosa nova: «un» o «une», no «le» ni «la».',
      quipUne2: 'Femení: «une», no «un». La mateixa regla d’abans.',
      quipUn2: 'Masculí: «un», no «une». La mateixa regla d’abans.',
      quipLeSandwich: 'El sandvitx. Aquell que ella ja coneix de sobres.',
      quipLaPoutine: 'La poutine. Aquella no l’hem oblidada. Llàstima.',
      quipPizza: 'Una pizza. Almenys d’aquesta ningú no discuteix.',
      cult_pizza: 'La paraula «pizza» ve de l’italià. En francès és femenina: une pizza, la pizza.',
      sens_joue: 'jugar (jo juguo)',
      tr_regpoutinela: 'Jo miro la poutine.',
      tr_regsandwichle: 'Jo miro el sandvitx.',
      tr_jejoue: 'Jo juguo.',
      quipRegPoutineLa: 'La poutine. Sempre mirada, mai menjada. Té principis.',
      quipRegSandwichLe: 'El mateix sandvitx. Ja el coneix. I encara no se’l menja.',
      quipJeJoue: 'Amb «je», el verb perd la -r: jouer → joue. Com mange, com regarde.',
      reprise: 'Reprenem on ho havíem deixat. No m’he oblidat de res, ja ho veus.',
      quitter_titre: 'Sortir i continuar més tard?',
      quitter_info: 'El teu progrés queda desat.',
      quitter_oui: 'Sortir',
      quitter_non: 'Quedar-me',
      intro5: 'Ja són aquí els quatre fragments. Ara toca ajuntar-los, tu sol. Jo no diré res. Bé, gairebé res.',
      fin5: 'Record reparat. Quatre fragments, sis frases, una poutine. Podria haver estat pitjor.',
      intro6: 'Últim fragment del record. Aquesta vegada ningú no et dona la mà. Hi ha coses que només un humà pot fer: escoltar, escriure, recordar. T’hi has d’acostumar. Aquí no compta… però el que escriguis quedarà registrat.',
      fin6: 'Últim fragment recuperat. El record està sencer. El que has escrit es guarda. Pel que fa al que ve després… ja ho veurem.',
      c_dictee: '*Escolta* i després *escriu el que sents*. La llista de paraules és una ajuda: no es pot *tocar*.',
      c_ecoute_ecris: '*Escolta* i després *escriu el que sents*.',
      c_rappel: 'Ja has vist aquesta frase. *Construeix-la* de memòria.', c_finale: 'Completa el *final* del verb.',
      tr_regfilmle: 'Jo veig la pel·lícula.', tr_regpizzaune: 'Jo miro una pizza.', tr_regpizzala: 'Jo miro la pizza.', tr_aimemangersandwich: 'M’agrada menjar un entrepà.', tr_aimemangerpizza: 'M’agrada menjar la pizza.', tr_aimeregfilm: 'M’agrada veure una pel·lícula.',
      liste_mots: 'Paraules que pots fer servir',
      c_aimeq: 'Ets la Bek. Què t’agrada *fer*? Escriu una *frase completa*.',
      lec_certif: 'Ara, preguntes sobre la Bek. Per respondre-les, has de recordar el que has après sobre ella. No hi ha res per triar: escriu-ho tu. Comprovaré la teva resposta i es guardarà. Et pots equivocar. Però podria tenir conseqüències més endavant.',
      c_certif1: 'En els records que has reparat, quines coses *menja* la Bek? Escriu-les amb «*un*» o «*une*».',
      quipCompOk: 'Les tres, amb l’article correcte. Exacte. Ella no ho dirà, però està contenta.',
      quipCompEssai: 'Encara no. Les caselles verdes són correctes. Corregeix les altres. Un últim intent.',
      quipCompFin: 'Aquesta vegada no. Ella menja un sandvitx, una poutine i una pizza. Queda anotat.',
      comp_reponse: 'Resposta: un sandwich, une poutine, une pizza.',
      lec_libre: 'Aquesta no té resposta correcta ni incorrecta. Potser un professor la llegirà. Una llista de verbs pot ajudar, però el teu propi diccionari és encara millor: fes-lo servir.',
      c_libre: 'Ara, tu: què t’agrada *fer*? Escriu *una frase de tres paraules*: «*je*» + «*aimer*» + un *verb*.',
      libre_trois: 'Això no són tres paraules: je + aime + un verb. Corregeix-ho, o confirma una altra vegada per guardar la teva resposta.',
      gloss_titre: 'Verbs habituals',
      gloss_dico: 'Te’n falta algun? Busca’l al teu propi diccionari: és un molt bon hàbit.',
      gloss_liste: [
        'manger — menjar',
        'boire — beure',
        'regarder — mirar',
        'jouer — jugar',
        'étudier — estudiar',
        'lire — llegir',
        'écouter — escoltar',
        'chanter — cantar',
        'danser — ballar',
        'dormir — dormir',
        'marcher — caminar',
        'dessiner — dibuixar',
        'cuisiner — cuinar',
        'nager — nedar',
        'voyager — viatjar'
      ],
      passer: 'Ometre',
      quipLibre: 'Gràcies. Queda guardat.',
      copier: 'Copiar',
      copie: 'Copiat!',
      toutCopier: 'Copiar-ho tot',
      recap_titre: 'Les teves respostes',
      lec_defi: 'Un últim repte. Sense ajudes. Si ho aconsegueixes, compta. Si falles, també compta.',
      c_defi1: 'Repte (1/2). Aquí tens un verb. Conjuga’l amb «*je*», en *present*.',
      sens_etudier: 'estudiar',
      c_defi2: 'Repte (2/2). Combina «*étudier*» amb «*aimer*», amb «*je*». Escriu una frase.',
      presqueAccent: 'Acceptat. Però mira els accents.',
      presqueApostrophe: 'Acceptat. Però no oblidis l’apòstrof.',
      quipEchec: 'Aquesta vegada no. Queda anotat. Continuem.',
      c_rep: 'El record està malmès. Repara’l: col·loca cada paraula al seu lloc, *d’esquerra a dreta*.',
      tr_aimepizza: 'M’agrada la pizza.',
      repApres1: 'Una pel·lícula. Almenys té gustos.',
      repApres3: 'M’agrada la pizza. Per fi, una opinió ferma.',
      repApres5: 'Queda una frase. Pots endevinar quina.',
      intro4: 'Un altre fragment del record. Aquesta vegada parla del que li agrada. Ja veuràs, és emotiu.',
      fin4: 'Quart fragment recuperat. Ja saps dir què menges, què mires i què t’agrada. El record va agafant forma.',
      sens_j: 'jo («je» davant de vocal)',
      sens_aime: 'agradar / estimar',
      sens_manger: 'menjar (forma bàsica)',
      sens_regarder: 'mirar (forma bàsica)',
      sens_jouer: 'jugar (forma bàsica)',
      sens_tele: 'tele (abreviatura de télévision)',
      tr_aimepoutine: 'M’agrada la poutine.',
      tr_aimemanger: 'M’agrada menjar.',
      tr_aimetele: 'M’agrada mirar la tele.',
      tr_aimejouer: 'M’agrada jugar.',
      tr_aimeregpoutine: 'M’agrada mirar la poutine.',
      tr_aimemangerpoutine: 'M’agrada menjar poutine.',
      noteJ_titre: 'Observació',
      noteJ: '«je» davant de vocal es converteix en «j’»: je + aime → j’aime. Davant de consonant no canvia res: je mange. Passa també amb altres paraules petites, com «le» i «la».',
      noteI_titre: 'Observació',
      noteI: 'Després d’«aimer», el verb es queda en la seva forma bàsica: l’infinitiu. Acaba en -er: mang-er, regard-er, jou-er. És el verb sense «je».',
      quipJe: 'Davant d’«aime», «je» es converteix en «j’». Les vocals mereixen respecte.',
      quipInf: 'Després de «j’aime», el verb conserva la forma bàsica: -er, no -e.',
      quipApostrophe: 'Gairebé! No oblidis l’apòstrof.',
      quipAimePoutine: 'Li agrada la poutine. Es nota en el seu entusiasme. Bé, s’endevina.',
      quipAimeManger: 'Menjar. Una constant en ella.',
      quipAimeJouer: 'Jugar. A què? No ho diu. Un misteri més.',
      quipAimeRegPoutine: 'Mirar la poutine. Tornem-hi. Continua sent contemplativa.',
      cult_tele: 'Tant al Quebec com a França, la gent diu sobretot «la télé». És l’abreviatura de «télévision», una paraula femenina.',
      intro3: 'Un altre fragment del mateix record. Aquesta vegada no menja. Mira. Matís.',
      finSuite: 'Primer fragment recuperat. El record encara no està sencer. N’hi ha més.',
      fin3: 'Tercer fragment recuperat. Ara saps dir què mires i què menges. No els confonguis.',
      sens_regarde: 'mirar / veure',
      sens_film: 'pel·lícula',
      tr_regarde: 'Jo miro. / Jo veig.',
      tr_film: 'Jo veig una pel·lícula.',
      tr_regpoutine: 'Jo miro una poutine.',
      tr_regsandwich: 'Jo miro un sandvitx.',
      noteR_titre: 'Observació',
      noteR: 'Un altre verb en -er: je regard-e. I «regarde» s’aplica directament a alguna cosa: cap paraula petita entre el verb i el que mires. Res de «a».',
      quipFilm: 'Una pel·lícula. Per fi, alguna cosa sensata.',
      quipRegPoutine: 'Mirar una poutine. Que… contemplatiu.',
      quipRegSandwich: 'Mira el sandvitx. Té gana, però espera. Admirable.',
      quipVerbe: 'No menja. Mira. El verb compta.',
      quipFilmMange: 'Menjar-se una pel·lícula. Original. Però no.',
      quipUn: '«Un film», no «une». La paraula és masculina.',
      cult_film: 'La paraula «film» ve de l’anglès, on designava una pel·lícula fina. En francès és masculina: un film.'
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
      bande_voir: 'Montri la vortojn', bande_cacher: 'Kaŝi la vortojn', sans_son: 'Mi nenion aŭdas',
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
      fin: 'Memoraĵo rekonstruita. Nun vi scias diri, kion vi manĝas. Kion vi ne manĝas… tio venos poste.',
      intro2: 'Alia fragmento de la memoraĵo. Ŝi ankoraŭ manĝas. Sed aŭskultu bone: la vorteto antaŭ «sandwich» ŝanĝiĝis.',
      fin2: 'Dua fragmento rehavita. Io nova, la sama afero kiam oni jam konas ĝin: nun vi scias diferencigi. Estas pliaj fragmentoj.',
      sens_le: 'la (vira vorto: tio, pri kio ni parolas)',
      sens_la: 'la (ina vorto: tio, pri kio ni parolas)',
      sens_pizza: 'pico',
      tr_sandwichle: 'Mi manĝas la sandviĉon.',
      tr_poutinela: 'Mi manĝas la poutinon.',
      tr_pizzaune: 'Mi manĝas picon.',
      tr_pizzala: 'Mi manĝas la picon.',
      noteL_titre: 'Rimarko',
      noteL: '«un» kaj «une»: io nova, unu inter aliaj. «le» kaj «la»: tio, pri kio ni parolas, tio, kion ni jam konas. Vira: un → le. Ina: une → la.',
      c_nouveau: 'Aperas io *nova*. Konstruu la frazon.',
      c_connu: 'Ĝi estas la sama afero, sed nun vi ĝin *konas*. Konstruu la frazon.',
      quipNouveau: 'Aperas nova afero: ni diras «un» aŭ «une».',
      quipConnu: 'La sama afero, jam konata: ni diras «le» aŭ «la».',
      quipLe: 'Vira, do «le». Ne «la».',
      quipLa: 'Ina, do «la». Ne «le».',
      quipDef: 'Ni parolas pri io jam konata: «le» aŭ «la», ne «un» nek «une».',
      quipIndef: 'Io nova: «un» aŭ «une», ne «le» nek «la».',
      quipUne2: 'Ina: «une», ne «un». La sama regulo kiel antaŭe.',
      quipUn2: 'Vira: «un», ne «une». La sama regulo kiel antaŭe.',
      quipLeSandwich: 'La sandviĉo. Tiu, kiun ŝi jam tre bone konas.',
      quipLaPoutine: 'La poutino. Tiun ni ne forgesis. Domaĝe.',
      quipPizza: 'Pico. Almenaŭ pri ĝi neniu disputas.',
      cult_pizza: 'La vorto «pizza» devenas de la itala. En la franca ĝi estas ina: une pizza, la pizza.',
      sens_joue: 'ludi (mi ludas)',
      tr_regpoutinela: 'Mi rigardas la poutinon.',
      tr_regsandwichle: 'Mi rigardas la sandviĉon.',
      tr_jejoue: 'Mi ludas.',
      quipRegPoutineLa: 'La poutino. Ĉiam rigardata, neniam manĝata. Ŝi havas principojn.',
      quipRegSandwichLe: 'La sama sandviĉo. Ŝi jam konas ĝin. Kaj tamen ŝi ne manĝas ĝin.',
      quipJeJoue: 'Kun «je», la verbo perdas la -r: jouer → joue. Same kiel mange, same kiel regarde.',
      reprise: 'Ni daŭrigas, kie ni haltis. Mi nenion forgesis, kiel vi vidas.',
      quitter_titre: 'Ĉu foriri kaj daŭrigi poste?',
      quitter_info: 'Via progreso estas konservita.',
      quitter_oui: 'Foriri',
      quitter_non: 'Resti',
      intro5: 'Ĉiuj kvar pecoj estas ĉi tie. Nun ilin kunmeti, sole. Mi nenion diros. Nu, preskaŭ nenion.',
      fin5: 'Memoraĵo riparita. Kvar pecoj, ses frazoj, iom da poutino. Povus esti pli malbone.',
      intro6: 'Lasta peco de la memoraĵo. Ĉi-foje neniu tenas vian manon. Kelkajn aferojn povas fari nur homo: aŭskulti, skribi, memori. Vi devas alkutimiĝi. Ĉi tie tio ne kalkuliĝas… sed tion, kion vi skribos, oni registros.',
      fin6: 'Lasta peco rehavita. La memoraĵo estas tuta. Tio, kion vi skribis, estas konservita. Kaj kio sekvas… ni vidos.',
      c_dictee: '*Aŭskultu*, poste *skribu tion, kion vi aŭdas*. La vortlisto estas helpo: oni ne povas *tuŝi* ĝin.',
      c_ecoute_ecris: '*Aŭskultu*, poste *skribu tion, kion vi aŭdas*.',
      c_rappel: 'Vi jam vidis ĉi tiun frazon. *Konstruu ĝin* el memoro.', c_finale: 'Kompletigu la *finaĵon* de la verbo.',
      tr_regfilmle: 'Mi rigardas la filmon.', tr_regpizzaune: 'Mi rigardas picon.', tr_regpizzala: 'Mi rigardas la picon.', tr_aimemangersandwich: 'Mi ŝatas manĝi sandviĉon.', tr_aimemangerpizza: 'Mi ŝatas manĝi la picon.', tr_aimeregfilm: 'Mi ŝatas rigardi filmon.',
      liste_mots: 'Vortoj uzeblaj',
      c_aimeq: 'Vi estas Bek. Kion vi ŝatas *fari*? Skribu *plenan frazon*.',
      lec_certif: 'Nun, demandoj pri Bek. Por respondi, vi devas memori tion, kion vi lernis pri ŝi. Nenio por elekti: skribu mem. Mi kontrolos vian respondon, kaj ĝi estos konservita. Vi povas erari. Sed tio povus havi sekvojn poste.',
      c_certif1: 'En la memoraĵoj, kiujn vi riparis, kion Bek *manĝas*? Skribu ilin kun «*un*» aŭ «*une*».',
      quipCompOk: 'Ĉiuj tri, kun la ĝusta artikolo. Ĝuste. Ŝi ne diros tion, sed ŝi estas kontenta.',
      quipCompEssai: 'Ankoraŭ ne. La verdaj kaŝtoj estas ĝustaj. Korektu la ceterajn. Lasta provo.',
      quipCompFin: 'Ne ĉi-foje. Ŝi manĝas sandviĉon, poutinon kaj picon. Notite.',
      comp_reponse: 'Respondo: un sandwich, une poutine, une pizza.',
      lec_libre: 'Ĉi tiu ne havas ĝustan nek malĝustan respondon. Instruisto eble legos ĝin. Listo de verboj povas helpi, sed via propra vortaro estas ankoraŭ pli bona: uzu ĝin.',
      c_libre: 'Nun vi: kion vi ŝatas *fari*? Skribu *frazon el tri vortoj*: «*je*» + «*aimer*» + *verbo*.',
      libre_trois: 'Tio ne estas tri vortoj: je + aime + verbo. Korektu, aŭ konfirmu denove por konservi vian respondon.',
      gloss_titre: 'Oftaj verboj',
      gloss_dico: 'Ĉu mankas unu? Serĉu ĝin en via propra vortaro: tio estas bonega kutimo.',
      gloss_liste: [
        'manger — manĝi',
        'boire — trinki',
        'regarder — rigardi',
        'jouer — ludi',
        'étudier — studi',
        'lire — legi',
        'écouter — aŭskulti',
        'chanter — kanti',
        'danser — danci',
        'dormir — dormi',
        'marcher — marŝi',
        'dessiner — desegni',
        'cuisiner — kuiri',
        'nager — naĝi',
        'voyager — vojaĝi'
      ],
      passer: 'Preterpasi',
      quipLibre: 'Dankon. Ĝi estas konservita.',
      copier: 'Kopii',
      copie: 'Kopiite!',
      toutCopier: 'Kopii ĉion',
      recap_titre: 'Viaj respondoj',
      lec_defi: 'Lasta defio. Neniu helpo. Se vi sukcesas, ĝi kalkuliĝas. Se vi malsukcesas, ankaŭ.',
      c_defi1: 'Defio (1/2). Jen verbo. Konjugu ĝin kun «*je*», en la *prezenco*.',
      sens_etudier: 'studi',
      c_defi2: 'Defio (2/2). Kombinu «*étudier*» kun «*aimer*», kun «*je*». Skribu frazon.',
      presqueAccent: 'Akceptite. Sed atentu la supersignojn.',
      presqueApostrophe: 'Akceptite. Sed ne forgesu la apostrofon.',
      quipEchec: 'Ne ĉi-foje. Notite. Ni daŭrigu.',
      c_rep: 'La memoraĵo estas difektita. Riparu ĝin: metu ĉiun vorton en ĝian lokon, *de maldekstre dekstren*.',
      tr_aimepizza: 'Mi ŝatas picon.',
      repApres1: 'Filmo. Do ŝi havas gustojn, almenaŭ.',
      repApres3: 'Mi ŝatas picon. Fine, firma opinio.',
      repApres5: 'Restas unu frazo. Vi povas diveni kiu.',
      intro4: 'Alia fragmento de la memoraĵo. Ĉi-foje ŝi parolas pri tio, kion ŝi ŝatas. Vi vidos, ĝi estas kortuŝa.',
      fin4: 'Kvara fragmento rehavita. Vi scias diri, kion vi manĝas, kion vi rigardas kaj kion vi ŝatas. La memoraĵo ekformiĝas.',
      sens_j: 'mi («je» antaŭ vokalo)',
      sens_aime: 'ŝati / ami',
      sens_manger: 'manĝi (baza formo)',
      sens_regarder: 'rigardi (baza formo)',
      sens_jouer: 'ludi (baza formo)',
      sens_tele: 'televido (mallongigo de télévision)',
      tr_aimepoutine: 'Mi ŝatas poutinon.',
      tr_aimemanger: 'Mi ŝatas manĝi.',
      tr_aimetele: 'Mi ŝatas rigardi televidon.',
      tr_aimejouer: 'Mi ŝatas ludi.',
      tr_aimeregpoutine: 'Mi ŝatas rigardi poutinon.',
      tr_aimemangerpoutine: 'Mi ŝatas manĝi poutinon.',
      noteJ_titre: 'Rimarko',
      noteJ: '«je» antaŭ vokalo fariĝas «j’»: je + aime → j’aime. Antaŭ konsonanto nenio ŝanĝiĝas: je mange. Tio okazas ankaŭ kun aliaj vortetoj, kiel «le» kaj «la».',
      noteI_titre: 'Rimarko',
      noteI: 'Post «aimer», la verbo restas en sia baza formo: la infinitivo. Ĝi finiĝas per -er: mang-er, regard-er, jou-er. Ĝi estas la verbo sen «je».',
      quipJe: 'Antaŭ «aime», «je» fariĝas «j’». Vokaloj meritas respekton.',
      quipInf: 'Post «j’aime», la verbo konservas sian bazan formon: -er, ne -e.',
      quipApostrophe: 'Preskaŭ! Ne forgesu la apostrofon.',
      quipAimePoutine: 'Ŝi ŝatas poutinon. Oni rimarkas tion laŭ ŝia entuziasmo. Nu, oni divenas.',
      quipAimeManger: 'Manĝi. Konstanto ĉe ŝi.',
      quipAimeJouer: 'Ludi. Kion? Ŝi ne diras. Ankoraŭ unu mistero.',
      quipAimeRegPoutine: 'Rigardi poutinon. Ni revenis al tio. Ankoraŭ kontemplema.',
      cult_tele: 'Kaj en Kebekio kaj en Francio oni plejparte diras «la télé». Ĝi estas mallongigo de «télévision», ina vorto.',
      intro3: 'Alia fragmento de la sama memoraĵo. Ĉi-foje ŝi ne manĝas. Ŝi rigardas. Nuanco.',
      finSuite: 'Unua fragmento rehavita. La memoraĵo ankoraŭ ne estas tuta. Estas pliaj.',
      fin3: 'Tria fragmento rehavita. Nun vi scias diri, kion vi rigardas kaj kion vi manĝas. Ne konfuzu ilin.',
      sens_regarde: 'rigardi',
      sens_film: 'filmo',
      tr_regarde: 'Mi rigardas.',
      tr_film: 'Mi rigardas filmon.',
      tr_regpoutine: 'Mi rigardas poutinon.',
      tr_regsandwich: 'Mi rigardas sandviĉon.',
      noteR_titre: 'Rimarko',
      noteR: 'Ankoraŭ verbo je -er: je regard-e. Kaj oni «regarde» ion rekte: neniu vorteto inter la verbo kaj tio, kion oni rigardas. Neniu «al».',
      quipFilm: 'Filmo. Fine io prudenta.',
      quipRegPoutine: 'Rigardi poutinon. Kiel… kontemplema.',
      quipRegSandwich: 'Ŝi rigardas la sandviĉon. Ŝi malsatas, sed ŝi atendas. Admirinde.',
      quipVerbe: 'Ŝi ne manĝas. Ŝi rigardas. La verbo gravas.',
      quipFilmMange: 'Manĝi filmon. Originale. Sed ne.',
      quipUn: '«Un film», ne «une». La vorto estas vira.',
      cult_film: 'La vorto «film» devenas de la angla, kie ĝi signifis maldikan tavolon. En la franca ĝi estas vira: un film.'
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
      bande_voir: '看看单词', bande_cacher: '隐藏单词', sans_son: '我听不到声音',
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
      fin: '记忆已复原。现在你会说自己吃什么了。不吃什么……以后再说。',
      intro2: '记忆的又一个片段。她还在吃东西。但仔细听：“sandwich”前面的那个小词变了。',
      fin2: '第二个片段已找回。一样新东西，等你认识了它，就成了同一样东西：现在你分得清了。还有更多片段。',
      sens_le: '那个（阳性词：我们正在说的那个东西）',
      sens_la: '那个（阴性词：我们正在说的那个东西）',
      sens_pizza: '披萨',
      tr_sandwichle: '我吃那个三明治。',
      tr_poutinela: '我吃那份 poutine。',
      tr_pizzaune: '我吃一个披萨。',
      tr_pizzala: '我吃那个披萨。',
      noteL_titre: '提示',
      noteL: '“un”和“une”：新出现的东西，众多之中的一个。“le”和“la”：我们正在说的东西，已经认识的那一个。阳性：un → le。阴性：une → la。',
      c_nouveau: '出现了一样*新*东西。请造句。',
      c_connu: '还是同一样东西，但现在你已经*认识*它了。请造句。',
      quipNouveau: '出现了新东西：我们说“un”或“une”。',
      quipConnu: '还是那样东西，已经认识了：我们说“le”或“la”。',
      quipLe: '阳性，所以是“le”。不是“la”。',
      quipLa: '阴性，所以是“la”。不是“le”。',
      quipDef: '我们在说已经认识的东西：用“le”或“la”，不用“un”或“une”。',
      quipIndef: '新东西：用“un”或“une”，不用“le”或“la”。',
      quipUne2: '阴性：“une”，不是“un”。规则和刚才一样。',
      quipUn2: '阳性：“un”，不是“une”。规则和刚才一样。',
      quipLeSandwich: '那个三明治。她现在已经太熟悉它了。',
      quipLaPoutine: '那份 poutine。这个可没忘。可惜。',
      quipPizza: '一个披萨。至少这个没人争论。',
      cult_pizza: '“pizza”这个词来自意大利语。在法语里它是阴性：une pizza，la pizza。',
      sens_joue: '玩（我玩）',
      tr_regpoutinela: '我看着那份 poutine。',
      tr_regsandwichle: '我看着那个三明治。',
      tr_jejoue: '我玩。',
      quipRegPoutineLa: '那份 poutine。一直看着，从不吃。她有原则。',
      quipRegSandwichLe: '还是那个三明治。她已经认识它了。她还是不吃。',
      quipJeJoue: '跟在“je”后面，动词会丢掉 -r：jouer → joue。和 mange、regarde 一样。',
      reprise: '我们从上次停下的地方继续。你看，我什么都没忘。',
      quitter_titre: '先离开，以后再继续？',
      quitter_info: '你的进度已保存。',
      quitter_oui: '离开',
      quitter_non: '留下',
      intro5: '四个片段都在这里了。现在要靠你自己把它们拼起来。我什么都不会说。嗯，几乎什么都不说。',
      fin5: '记忆已修复。四个片段，六个句子，一点 poutine。本来可能更糟。',
      intro6: '记忆的最后一个片段。这一次，没有人牵着你的手。有些事只有人能做：听、写、记。你得习惯。在这里它不计分……但你写下的内容会被记录下来。',
      fin6: '最后一个片段已找回。记忆完整了。你写的内容已保存。至于接下来会怎样……再看吧。',
      c_dictee: '*听*，然后*写下你听到的*。词表是个帮助：它*不能点*。',
      c_ecoute_ecris: '*听*，然后*写下你听到的*。',
      c_rappel: '这个句子你见过。请*凭记忆*把它拼出来。', c_finale: '补全动词的*结尾*。',
      tr_regfilmle: '我看那部电影。', tr_regpizzaune: '我看着一个披萨。', tr_regpizzala: '我看着那个披萨。', tr_aimemangersandwich: '我喜欢吃一个三明治。', tr_aimemangerpizza: '我喜欢吃那个披萨。', tr_aimeregfilm: '我喜欢看一部电影。',
      liste_mots: '可以用的词',
      c_aimeq: '你是 Bek。你*喜欢*做什么？请写一个*完整的句子*。',
      lec_certif: '现在，问几个关于 Bek 的问题。要回答，你得想起你学过的关于她的内容。没有选项：要自己写。我会检查你的答案，而且它会被保存。你可能会答错。但以后也许会有后果。',
      c_certif1: '在你修复的记忆里，Bek *吃*什么东西？请用“*un*”或“*une*”写出来。',
      quipCompOk: '三样都对，冠词也对。没错。她不会说，但她很满意。',
      quipCompEssai: '还不行。绿色的格子是对的。改一改其他的。最后一次机会。',
      quipCompFin: '这次不行。她吃一个三明治、一份 poutine 和一个披萨。已记下。',
      comp_reponse: '答案：un sandwich, une poutine, une pizza。',
      lec_libre: '这一题没有对错。老师也许会读。动词清单可以帮忙，但你自己的词典更好：用它。',
      c_libre: '现在轮到你：你*喜欢*做什么？写*一个三个词的句子*：“*je*” + “*aimer*” + 一个*动词*。',
      libre_trois: '这不是三个词：je + aime + 一个动词。请修改，或再确认一次来保留你的答案。',
      gloss_titre: '常用动词',
      gloss_dico: '少了哪个？去你自己的词典里查：这是个很好的习惯。',
      gloss_liste: [
        'manger — 吃',
        'boire — 喝',
        'regarder — 看',
        'jouer — 玩',
        'étudier — 学习',
        'lire — 读',
        'écouter — 听',
        'chanter — 唱歌',
        'danser — 跳舞',
        'dormir — 睡觉',
        'marcher — 走路',
        'dessiner — 画画',
        'cuisiner — 做饭',
        'nager — 游泳',
        'voyager — 旅行'
      ],
      passer: '跳过',
      quipLibre: '谢谢。已保存。',
      copier: '复制',
      copie: '已复制！',
      toutCopier: '全部复制',
      recap_titre: '你的答案',
      lec_defi: '最后一个挑战。没有提示。成功了，算数。失败了，也算数。',
      c_defi1: '挑战（1/2）。这里有一个动词。请用“*je*”，用*现在时*变位。',
      sens_etudier: '学习',
      c_defi2: '挑战（2/2）。把“*étudier*”和“*aimer*”组合起来，主语用“*je*”。写一个句子。',
      presqueAccent: '接受。但请注意重音符号。',
      presqueApostrophe: '接受。但别忘了撇号。',
      quipEchec: '这次不行。已记下。继续。',
      c_rep: '记忆受损了。请修复它：把每个词放进它的位置，*从左到右*。',
      tr_aimepizza: '我喜欢披萨。',
      repApres1: '一部电影。至少她有自己的喜好。',
      repApres3: '我喜欢披萨。终于有了一个坚定的看法。',
      repApres5: '还剩一个句子。你可以猜到是哪一个。',
      intro4: '记忆的又一个片段。这一次她在说自己喜欢什么。你会看到，很动人。',
      fin4: '第四个片段已找回。你会说自己吃什么、看什么、喜欢什么了。记忆正在成形。',
      sens_j: '我（元音前的“je”）',
      sens_aime: '喜欢 / 爱',
      sens_manger: '吃（基本形式）',
      sens_regarder: '看（基本形式）',
      sens_jouer: '玩（基本形式）',
      sens_tele: '电视（télévision 的简称）',
      tr_aimepoutine: '我喜欢 poutine。',
      tr_aimemanger: '我喜欢吃东西。',
      tr_aimetele: '我喜欢看电视。',
      tr_aimejouer: '我喜欢玩。',
      tr_aimeregpoutine: '我喜欢看着 poutine。',
      tr_aimemangerpoutine: '我喜欢吃 poutine。',
      noteJ_titre: '提示',
      noteJ: '元音前的“je”变成“j’”：je + aime → j’aime。辅音前不变：je mange。其他小词也会这样，比如“le”和“la”。',
      noteI_titre: '提示',
      noteI: '“aimer”后面，动词保持基本形式：不定式。以 -er 结尾：mang-er、regard-er、jou-er。就是去掉“je”的那个动词。',
      quipJe: '在“aime”前面，“je”变成“j’”。元音值得尊重。',
      quipInf: '在“j’aime”后面，动词保持基本形式：-er，不是 -e。',
      quipApostrophe: '差一点！别忘了撇号。',
      quipAimePoutine: '她喜欢 poutine。从她的热情就看得出来。嗯，猜得出来。',
      quipAimeManger: '吃。对她来说是常态。',
      quipAimeJouer: '玩。玩什么？她没说。又一个谜。',
      quipAimeRegPoutine: '看着 poutine。又回到这个了。依旧很沉思。',
      cult_tele: '在魁北克和法国，人们大多说“la télé”。它是“télévision”的简称，一个阴性词。',
      intro3: '同一段记忆的又一个片段。这一次她没有在吃。她在看。区别很微妙。',
      finSuite: '第一个片段已找回。记忆还不完整。还有更多。',
      fin3: '第三个片段已找回。现在你会说自己看什么、吃什么了。别把它们搞混。',
      sens_regarde: '看',
      sens_film: '电影',
      tr_regarde: '我看。',
      tr_film: '我看一部电影。',
      tr_regpoutine: '我看着一份 poutine。',
      tr_regsandwich: '我看着一个三明治。',
      noteR_titre: '提示',
      noteR: '又一个 -er 动词：je regard-e。而且“regarde”后面直接跟看的东西：动词和所看的东西之间没有小词。中间不加介词。',
      quipFilm: '一部电影。总算有点正常的东西。',
      quipRegPoutine: '看着一份 poutine。真是……沉思。',
      quipRegSandwich: '她看着三明治。她饿了，但她在忍。令人钦佩。',
      quipVerbe: '她不吃。她在看。动词很重要。',
      quipFilmMange: '吃一部电影。有创意。但不行。',
      quipUn: '是“un film”，不是“une”。这个词是阳性。',
      cult_film: '“film”这个词来自英语，在英语里原指一层薄膜。在法语里它是阳性：un film。'
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
      c_mange: '言葉に*触って*、音を*聞いて*みましょう。',
      c_lire: '言葉に*触って*、音と*意味*を確かめましょう。',
      c_ordre: '記憶が消えかけています……言葉を*正しい順番*に並べましょう。',
      c_ecrire_part: '*抜けている*言葉を書きましょう。',
      c_ecrire: 'この文を*フランス語*で書きましょう。',
      c_image: 'あなたはBekです。今、何を*していますか*？',
      c_audio: '*聞いて*から、正しい言葉を*選び*ましょう。',
      reecouter: 'もう一度聞く',
      bande_voir: '単語を見る', bande_cacher: '単語をかくす', sans_son: '音が聞こえません',
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
      c_nouveau: '*新しい*ものが現れました。文を組み立てましょう。',
      c_connu: '同じものですが、*もう知っている*ものですね。文を組み立てましょう。',
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
      c_rep: '記憶が傷んでいます。直しましょう。言葉をひとつずつ、*左から順に*枠に入れてください。',
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
      c_dictee: '*聞いて*、聞こえたとおりに*書き*ましょう。単語リストはヒントです。*触る*ことはできません。',
      c_ecoute_ecris: '*聞いて*、聞こえたとおりに*書き*ましょう。',
      c_rappel: 'この文は前に見ました。*思い出して*組み立てましょう。', c_finale: '動詞の*語尾*を書きましょう。',
      tr_regfilmle: '私はその映画を見ます。', tr_regpizzaune: '私はピザを見ます。', tr_regpizzala: '私はそのピザを見ます。', tr_aimemangersandwich: 'サンドイッチを食べるのが好きです。', tr_aimemangerpizza: 'そのピザを食べるのが好きです。', tr_aimeregfilm: '映画を見るのが好きです。',
      liste_mots: '使える単語',
      c_aimeq: 'あなたはBekです。何をするのが*好き*ですか？*完全な文*で書きましょう。',
      lec_certif: 'ここからは、Bekについての質問です。答えるには、彼女について学んだことを思い出す必要があります。選ぶものはありません。自分で書いてください。答えは私が確認し、記録されます。間違えてもかまいません。でも、あとで影響が出るかもしれません。',
      c_certif1: 'あなたが直した記憶の中で、Bekは何を*食べて*いましたか？「*un*」か「*une*」をつけて書きましょう。',
      quipCompOk: '三つとも、正しい冠詞つきで正解です。彼女は何も言いませんが、きっと喜んでいます。',
      quipCompEssai: 'まだです。緑の欄は合っています。ほかを直してください。あと一回です。',
      quipCompFin: '今回は残念でした。彼女が食べるのは、un sandwich、une poutine、une pizza です。記録しました。',
      comp_reponse: '答え：un sandwich, une poutine, une pizza。',
      lec_libre: 'この質問には、正解も不正解もありません。先生が読むかもしれません。動詞の一覧が助けになりますが、自分の辞書を使うのがいちばんです。ぜひ使ってください。',
      c_libre: 'では、あなた自身のことです。何をするのが*好き*ですか？*3語の文*を一つ書きましょう：「*je*」＋「*aimer*」＋*動詞*。',
      libre_trois: '3語ではありません：je + aime + 動詞。直すか、もう一度「確認」を押してこのまま残してください。',
      gloss_titre: 'よく使う動詞', gloss_dico: '足りない動詞は、自分の辞書で調べてみましょう。とてもよい習慣です。',
      gloss_liste: ['manger — 食べる', 'boire — 飲む', 'regarder — 見る', 'jouer — 遊ぶ', 'étudier — 勉強する', 'lire — 読む', 'écouter — 聞く', 'chanter — 歌う', 'danser — 踊る', 'dormir — 寝る', 'marcher — 歩く', 'dessiner — 描く', 'cuisiner — 料理する', 'nager — 泳ぐ', 'voyager — 旅行する'],

      passer: 'スキップ',
      quipLibre: 'ありがとう。ちゃんと保存しました。',
      copier: 'コピー',
      copie: 'コピーしました！',
      toutCopier: 'すべてコピー',
      recap_titre: 'あなたの答え',
      lec_defi: '最後のチャレンジです。ヒントはありません。成功すれば記録されます。失敗しても、記録されます。',
      c_defi1: 'チャレンジ（1/2）動詞が出ます。「*je*」を主語にして、*現在形*に活用しましょう。',
      sens_etudier: '勉強する',
      c_defi2: 'チャレンジ（2/2）「*étudier*」と「*aimer*」を、主語「*je*」で組み合わせましょう。文を書いてください。',
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
      bande_voir: '단어 보기', bande_cacher: '단어 숨기기', sans_son: '아무 소리도 안 들려요',
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
      fin: '기억이 복원됐어요. 이제 무엇을 먹는지 말할 수 있어요. 먹지 않는 것은… 나중에 알려 줄게요.',
      intro2: '기억의 또 다른 조각이에요. 그녀는 아직 먹고 있어요. 하지만 잘 들어 보세요: “sandwich” 앞의 작은 단어가 바뀌었어요.',
      fin2: '두 번째 조각을 되찾았어요. 새로운 것도 알고 나면 같은 것이 되지요. 이제 그 차이를 구분할 수 있어요. 더 많은 조각이 남아 있어요.',
      sens_le: '그 (남성 명사: 우리가 말하고 있는 그것)',
      sens_la: '그 (여성 명사: 우리가 말하고 있는 그것)',
      sens_pizza: '피자',
      tr_sandwichle: '나는 그 샌드위치를 먹어요.',
      tr_poutinela: '나는 그 poutine을 먹어요.',
      tr_pizzaune: '나는 피자를 먹어요.',
      tr_pizzala: '나는 그 피자를 먹어요.',
      noteL_titre: '참고',
      noteL: '“un”과 “une”: 새로운 것, 여럿 중 하나. “le”와 “la”: 우리가 말하고 있는 것, 이미 아는 그것. 남성: un → le. 여성: une → la.',
      c_nouveau: '*새로운* 것이 나타났어요. 문장을 만들어 보세요.',
      c_connu: '같은 것이지만, 이제 *아는* 것이에요. 문장을 만들어 보세요.',
      quipNouveau: '새로운 것이 나타났어요: “un”이나 “une”라고 해요.',
      quipConnu: '같은 것, 이제 아는 것: “le”나 “la”라고 해요.',
      quipLe: '남성이니까 “le”예요. “la”가 아니에요.',
      quipLa: '여성이니까 “la”예요. “le”가 아니에요.',
      quipDef: '이미 아는 것을 말하고 있어요: “le”나 “la”이지, “un”이나 “une”가 아니에요.',
      quipIndef: '새로운 것: “un”이나 “une”이지, “le”나 “la”가 아니에요.',
      quipUne2: '여성: “une”이지 “un”이 아니에요. 아까와 같은 규칙이에요.',
      quipUn2: '남성: “un”이지 “une”가 아니에요. 아까와 같은 규칙이에요.',
      quipLeSandwich: '그 샌드위치예요. 그녀가 이제 아주 잘 아는 그것이죠.',
      quipLaPoutine: '그 poutine이에요. 이건 잊지 않았어요. 안타깝게도.',
      quipPizza: '피자예요. 적어도 이건 아무도 따지지 않아요.',
      cult_pizza: '“pizza”라는 단어는 이탈리아어에서 왔어요. 프랑스어에서는 여성이에요: une pizza, la pizza.',
      sens_joue: '놀다 / 하다 (나는 놀아요)',
      tr_regpoutinela: '나는 그 poutine을 바라봐요.',
      tr_regsandwichle: '나는 그 샌드위치를 바라봐요.',
      tr_jejoue: '나는 놀아요.',
      quipRegPoutineLa: '그 poutine이에요. 계속 바라보기만 하고 먹지는 않아요. 원칙이 있어요.',
      quipRegSandwichLe: '같은 샌드위치예요. 이제 알고 있어요. 그래도 먹지는 않아요.',
      quipJeJoue: '“je” 뒤에서는 동사가 -r을 잃어요: jouer → joue. mange, regarde처럼요.',
      reprise: '멈췄던 곳에서 다시 시작해요. 보시다시피 저는 하나도 잊지 않았어요.',
      quitter_titre: '나갔다가 나중에 이어서 할까요?',
      quitter_info: '진행 상황은 저장돼요.',
      quitter_oui: '나가기',
      quitter_non: '남기',
      intro5: '네 조각이 모두 모였어요. 이제 혼자서 맞춰 볼 차례예요. 저는 아무 말도 안 할게요. 음, 거의요.',
      fin5: '기억을 고쳤어요. 네 조각, 여섯 문장, 약간의 poutine. 더 나쁠 수도 있었어요.',
      intro6: '기억의 마지막 조각이에요. 이번에는 아무도 손을 잡아 주지 않아요. 사람만 할 수 있는 일이 있어요: 듣고, 쓰고, 기억하는 것. 익숙해져야 해요. 여기서는 점수에 들어가지 않아요… 하지만 쓴 내용은 기록돼요.',
      fin6: '마지막 조각을 되찾았어요. 기억이 온전해졌어요. 쓴 내용은 저장돼요. 그다음 일은… 두고 봐요.',
      c_dictee: '*듣고*, *들은 것을 써 보세요*. 단어 목록은 도움이에요: *누를 수는* 없어요.',
      c_ecoute_ecris: '*듣고*, *들은 것을 써 보세요*.',
      c_rappel: '이 문장은 이미 봤어요. *기억을 떠올려* 만들어 보세요.', c_finale: '동사의 *끝부분*을 완성하세요.',
      tr_regfilmle: '나는 그 영화를 봐요.', tr_regpizzaune: '나는 피자를 바라봐요.', tr_regpizzala: '나는 그 피자를 바라봐요.', tr_aimemangersandwich: '나는 샌드위치 먹는 것을 좋아해요.', tr_aimemangerpizza: '나는 그 피자 먹는 것을 좋아해요.', tr_aimeregfilm: '나는 영화 보는 것을 좋아해요.',
      liste_mots: '쓸 수 있는 단어',
      c_aimeq: '너는 Bek이에요. 무엇을 하는 게 *좋아요*? *완전한 문장*으로 써 보세요.',
      lec_certif: '이제 Bek에 대한 질문이에요. 대답하려면 그녀에 대해 배운 것을 기억해야 해요. 고를 것은 없어요: 직접 써 보세요. 답을 확인할 거고, 답은 저장돼요. 틀릴 수도 있어요. 하지만 나중에 영향이 있을지도 몰라요.',
      c_certif1: '네가 고친 기억들에서 Bek은 어떤 것들을 *먹나요*? “*un*”이나 “*une*”와 함께 써 보세요.',
      quipCompOk: '세 개 모두, 관사까지 맞았어요. 정확해요. 그녀는 말하지 않겠지만, 기뻐하고 있어요.',
      quipCompEssai: '아직이에요. 초록색 칸은 맞아요. 나머지를 고쳐 보세요. 마지막 기회예요.',
      quipCompFin: '이번에는 아니에요. 그녀는 샌드위치, poutine, 피자를 먹어요. 기록해 둘게요.',
      comp_reponse: '정답: un sandwich, une poutine, une pizza.',
      lec_libre: '이 질문에는 맞고 틀린 답이 없어요. 선생님이 읽을 수도 있어요. 동사 목록이 도움이 될 수 있지만, 직접 쓰는 사전이 더 좋아요: 사전을 써 보세요.',
      c_libre: '이번에는 너 차례예요: 무엇을 하는 게 *좋아요*? *세 단어로 된 문장 하나*를 써 보세요: “*je*” + “*aimer*” + *동사*.',
      libre_trois: '세 단어가 아니에요: je + aime + 동사. 고치거나, 다시 확인을 눌러 답을 그대로 저장하세요.',
      gloss_titre: '자주 쓰는 동사',
      gloss_dico: '빠진 게 있나요? 자신의 사전에서 찾아보세요: 아주 좋은 습관이에요.',
      gloss_liste: [
        'manger — 먹다',
        'boire — 마시다',
        'regarder — 보다',
        'jouer — 놀다 / 하다',
        'étudier — 공부하다',
        'lire — 읽다',
        'écouter — 듣다',
        'chanter — 노래하다',
        'danser — 춤추다',
        'dormir — 자다',
        'marcher — 걷다',
        'dessiner — 그리다',
        'cuisiner — 요리하다',
        'nager — 수영하다',
        'voyager — 여행하다'
      ],
      passer: '건너뛰기',
      quipLibre: '고마워요. 저장했어요.',
      copier: '복사',
      copie: '복사했어요!',
      toutCopier: '모두 복사',
      recap_titre: '내 답',
      lec_defi: '마지막 도전이에요. 힌트는 없어요. 성공하면 점수에 들어가요. 실패해도 들어가요.',
      c_defi1: '도전 (1/2). 동사가 하나 있어요. “*je*”와 함께 *현재형*으로 변화시켜 보세요.',
      sens_etudier: '공부하다',
      c_defi2: '도전 (2/2). “*étudier*”와 “*aimer*”를 “*je*”와 함께 합쳐서 문장을 써 보세요.',
      presqueAccent: '받아들였어요. 하지만 악센트를 보세요.',
      presqueApostrophe: '받아들였어요. 하지만 아포스트로피를 잊지 마세요.',
      quipEchec: '이번에는 아니에요. 기록해 둘게요. 계속해요.',
      c_rep: '기억이 손상됐어요. 고쳐 보세요: 각 단어를 제자리에, *왼쪽에서 오른쪽으로* 놓으세요.',
      tr_aimepizza: '나는 피자를 좋아해요.',
      repApres1: '영화예요. 적어도 취향은 있네요.',
      repApres3: '나는 피자를 좋아해요. 드디어 확고한 의견이네요.',
      repApres5: '문장이 하나 남았어요. 어느 것인지 짐작할 수 있어요.',
      intro4: '기억의 또 다른 조각이에요. 이번에는 그녀가 좋아하는 것을 말해요. 보면 알 거예요, 마음이 따뜻해져요.',
      fin4: '네 번째 조각을 되찾았어요. 이제 무엇을 먹고, 무엇을 보고, 무엇을 좋아하는지 말할 수 있어요. 기억이 모양을 갖춰 가고 있어요.',
      sens_j: '나 (모음 앞의 “je”)',
      sens_aime: '좋아하다 / 사랑하다',
      sens_manger: '먹다 (기본형)',
      sens_regarder: '보다 (기본형)',
      sens_jouer: '놀다 / 하다 (기본형)',
      sens_tele: 'TV (télévision의 줄임말)',
      tr_aimepoutine: '나는 poutine을 좋아해요.',
      tr_aimemanger: '나는 먹는 것을 좋아해요.',
      tr_aimetele: '나는 TV 보는 것을 좋아해요.',
      tr_aimejouer: '나는 노는 것을 좋아해요.',
      tr_aimeregpoutine: '나는 poutine을 바라보는 것을 좋아해요.',
      tr_aimemangerpoutine: '나는 poutine 먹는 것을 좋아해요.',
      noteJ_titre: '참고',
      noteJ: '모음 앞에서 “je”는 “j’”가 돼요: je + aime → j’aime. 자음 앞에서는 변하지 않아요: je mange. “le”, “la” 같은 다른 작은 단어에서도 그래요.',
      noteI_titre: '참고',
      noteI: '“aimer” 뒤에서는 동사가 기본형, 즉 원형으로 남아요. -er로 끝나요: mang-er, regard-er, jou-er. “je”가 없는 동사예요.',
      quipJe: '“aime” 앞에서 “je”는 “j’”가 돼요. 모음은 존중받아야 해요.',
      quipInf: '“j’aime” 뒤에서 동사는 기본형을 유지해요: -er이지 -e가 아니에요.',
      quipApostrophe: '거의 다 됐어요! 아포스트로피를 잊지 마세요.',
      quipAimePoutine: '그녀는 poutine을 좋아해요. 열정을 보면 알 수 있어요. 아니, 짐작할 수 있어요.',
      quipAimeManger: '먹기. 그녀에게는 변함없는 일이에요.',
      quipAimeJouer: '놀기. 무엇을요? 말하지 않아요. 또 하나의 수수께끼예요.',
      quipAimeRegPoutine: 'poutine을 바라보기. 또 이 이야기예요. 여전히 사색적이에요.',
      cult_tele: '퀘벡에서도 프랑스에서도 대부분 “la télé”라고 말해요. “télévision”의 줄임말이고, 여성 명사예요.',
      intro3: '같은 기억의 또 다른 조각이에요. 이번에는 먹고 있지 않아요. 바라보고 있어요. 미묘한 차이예요.',
      finSuite: '첫 번째 조각을 되찾았어요. 기억은 아직 온전하지 않아요. 더 남아 있어요.',
      fin3: '세 번째 조각을 되찾았어요. 이제 무엇을 보는지, 무엇을 먹는지 말할 수 있어요. 둘을 헷갈리지 마세요.',
      sens_regarde: '보다',
      sens_film: '영화',
      tr_regarde: '나는 봐요.',
      tr_film: '나는 영화를 봐요.',
      tr_regpoutine: '나는 poutine을 바라봐요.',
      tr_regsandwich: '나는 샌드위치를 바라봐요.',
      noteR_titre: '참고',
      noteR: '또 하나의 -er 동사예요: je regard-e. 그리고 “regarde” 뒤에는 보는 대상이 바로 와요: 동사와 보는 대상 사이에 작은 단어가 없어요.',
      quipFilm: '영화예요. 드디어 제대로 된 것이네요.',
      quipRegPoutine: 'poutine을 바라보기. 참… 사색적이에요.',
      quipRegSandwich: '그녀는 샌드위치를 바라봐요. 배가 고프지만 참고 있어요. 대단해요.',
      quipVerbe: '그녀는 먹지 않아요. 바라봐요. 동사가 중요해요.',
      quipFilmMange: '영화를 먹다니요. 독창적이에요. 하지만 아니에요.',
      quipUn: '“un film”이지 “une”가 아니에요. 이 단어는 남성이에요.',
      cult_film: '“film”이라는 단어는 영어에서 왔고, 영어에서는 얇은 막을 뜻했어요. 프랑스어에서는 남성이에요: un film.'
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
      bande_voir: 'Xem các từ', bande_cacher: 'Ẩn các từ', sans_son: 'Mình không nghe thấy gì',
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
      fin: 'Ký ức đã được phục hồi. Giờ bạn đã nói được mình ăn gì. Còn món bạn không ăn… sẽ đến sau.',
      intro2: 'Một mảnh khác của ký ức. Cô ấy vẫn đang ăn. Nhưng hãy nghe kỹ: từ nhỏ đứng trước “sandwich” đã đổi rồi.',
      fin2: 'Đã tìm lại mảnh thứ hai. Một thứ mới, và khi đã biết rồi thì vẫn là thứ đó: giờ bạn đã phân biệt được. Vẫn còn những mảnh khác.',
      sens_le: 'cái (từ giống đực: thứ chúng ta đang nói đến)',
      sens_la: 'cái (từ giống cái: thứ chúng ta đang nói đến)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Mình ăn cái sandwich đó.',
      tr_poutinela: 'Mình ăn món poutine đó.',
      tr_pizzaune: 'Mình ăn một cái pizza.',
      tr_pizzala: 'Mình ăn cái pizza đó.',
      noteL_titre: 'Ghi chú',
      noteL: '“un” và “une”: một thứ mới, một trong nhiều thứ. “le” và “la”: thứ chúng ta đang nói đến, thứ đã biết rồi. Giống đực: un → le. Giống cái: une → la.',
      c_nouveau: 'Một thứ *mới* xuất hiện. Hãy đặt câu.',
      c_connu: 'Vẫn là thứ đó, nhưng giờ bạn đã *biết* nó. Hãy đặt câu.',
      quipNouveau: 'Một thứ mới xuất hiện: ta nói “un” hoặc “une”.',
      quipConnu: 'Vẫn thứ đó, giờ đã biết: ta nói “le” hoặc “la”.',
      quipLe: 'Giống đực, nên là “le”. Không phải “la”.',
      quipLa: 'Giống cái, nên là “la”. Không phải “le”.',
      quipDef: 'Ta đang nói về thứ đã biết: “le” hoặc “la”, không phải “un” hay “une”.',
      quipIndef: 'Một thứ mới: “un” hoặc “une”, không phải “le” hay “la”.',
      quipUne2: 'Giống cái: “une”, không phải “un”. Cùng quy tắc như lúc nãy.',
      quipUn2: 'Giống đực: “un”, không phải “une”. Cùng quy tắc như lúc nãy.',
      quipLeSandwich: 'Cái sandwich. Cái mà giờ cô ấy quá quen rồi.',
      quipLaPoutine: 'Món poutine. Món này thì chưa quên. Tiếc thật.',
      quipPizza: 'Một cái pizza. Ít nhất cái này không ai cãi.',
      cult_pizza: 'Từ “pizza” đến từ tiếng Ý. Trong tiếng Pháp nó là giống cái: une pizza, la pizza.',
      sens_joue: 'chơi (mình chơi)',
      tr_regpoutinela: 'Mình nhìn món poutine đó.',
      tr_regsandwichle: 'Mình nhìn cái sandwich đó.',
      tr_jejoue: 'Mình chơi.',
      quipRegPoutineLa: 'Món poutine. Vẫn chỉ nhìn, chưa bao giờ ăn. Cô ấy có nguyên tắc.',
      quipRegSandwichLe: 'Vẫn cái sandwich đó. Cô ấy quen rồi. Vậy mà vẫn không ăn.',
      quipJeJoue: 'Với “je”, động từ mất chữ -r: jouer → joue. Giống mange, giống regarde.',
      reprise: 'Ta tiếp tục từ chỗ đã dừng. Bạn thấy đấy, mình không quên gì cả.',
      quitter_titre: 'Thoát và tiếp tục sau?',
      quitter_info: 'Tiến độ của bạn đã được lưu.',
      quitter_oui: 'Thoát',
      quitter_non: 'Ở lại',
      intro5: 'Cả bốn mảnh đã có đủ. Giờ phải ghép chúng lại, một mình bạn. Mình sẽ không nói gì. À, gần như không nói gì.',
      fin5: 'Ký ức đã được sửa. Bốn mảnh, sáu câu, một chút poutine. Có thể còn tệ hơn.',
      intro6: 'Mảnh cuối cùng của ký ức. Lần này không ai cầm tay bạn. Có những việc chỉ con người làm được: nghe, viết, nhớ. Bạn phải làm quen. Ở đây việc này không tính điểm… nhưng những gì bạn viết sẽ được ghi lại.',
      fin6: 'Đã tìm lại mảnh cuối cùng. Ký ức đã trọn vẹn. Những gì bạn viết được lưu lại. Còn chuyện tiếp theo… rồi sẽ thấy.',
      c_dictee: '*Nghe*, rồi *viết những gì bạn nghe được*. Danh sách từ là một sự hỗ trợ: bạn không thể *chạm* vào nó.',
      c_ecoute_ecris: '*Nghe*, rồi *viết những gì bạn nghe được*.',
      c_rappel: 'Bạn đã thấy câu này rồi. Hãy *ghép lại* từ trí nhớ.', c_finale: 'Hãy hoàn thành *phần cuối* của động từ.',
      tr_regfilmle: 'Mình xem bộ phim đó.', tr_regpizzaune: 'Mình nhìn một cái pizza.', tr_regpizzala: 'Mình nhìn cái pizza đó.', tr_aimemangersandwich: 'Mình thích ăn một cái sandwich.', tr_aimemangerpizza: 'Mình thích ăn cái pizza đó.', tr_aimeregfilm: 'Mình thích xem một bộ phim.',
      liste_mots: 'Những từ bạn có thể dùng',
      c_aimeq: 'Bạn là Bek. Bạn *thích* làm gì? Hãy viết một *câu đầy đủ*.',
      lec_certif: 'Bây giờ là những câu hỏi về Bek. Để trả lời, bạn phải nhớ những gì đã học về cô ấy. Không có gì để chọn: hãy tự viết. Mình sẽ kiểm tra câu trả lời của bạn và nó sẽ được lưu lại. Bạn có thể sai. Nhưng sau này có thể có hậu quả.',
      c_certif1: 'Trong những ký ức bạn đã sửa, Bek *ăn* những thứ gì? Hãy viết chúng với “*un*” hoặc “*une*”.',
      quipCompOk: 'Đủ cả ba, đúng mạo từ. Chính xác. Cô ấy sẽ không nói ra, nhưng cô ấy vui.',
      quipCompEssai: 'Chưa được. Các ô xanh là đúng. Hãy sửa những ô còn lại. Còn một lần thử cuối.',
      quipCompFin: 'Lần này thì không. Cô ấy ăn một cái sandwich, một món poutine và một cái pizza. Đã ghi nhận.',
      comp_reponse: 'Đáp án: un sandwich, une poutine, une pizza.',
      lec_libre: 'Câu này không có đáp án đúng hay sai. Có thể một giáo viên sẽ đọc nó. Danh sách động từ có thể giúp, nhưng từ điển của riêng bạn còn tốt hơn: hãy dùng nó.',
      c_libre: 'Giờ đến lượt bạn: bạn *thích* làm gì? Viết *một câu ba từ*: “*je*” + “*aimer*” + một *động từ*.',
      libre_trois: 'Đó không phải ba từ: je + aime + một động từ. Hãy sửa lại, hoặc xác nhận lần nữa để giữ câu trả lời của bạn.',
      gloss_titre: 'Động từ thông dụng',
      gloss_dico: 'Thiếu từ nào? Hãy tra trong từ điển của riêng bạn: đó là một thói quen rất tốt.',
      gloss_liste: [
        'manger — ăn',
        'boire — uống',
        'regarder — nhìn / xem',
        'jouer — chơi',
        'étudier — học',
        'lire — đọc',
        'écouter — nghe',
        'chanter — hát',
        'danser — nhảy múa',
        'dormir — ngủ',
        'marcher — đi bộ',
        'dessiner — vẽ',
        'cuisiner — nấu ăn',
        'nager — bơi',
        'voyager — đi du lịch'
      ],
      passer: 'Bỏ qua',
      quipLibre: 'Cảm ơn bạn. Đã lưu.',
      copier: 'Sao chép',
      copie: 'Đã sao chép!',
      toutCopier: 'Sao chép tất cả',
      recap_titre: 'Các câu trả lời của bạn',
      lec_defi: 'Một thử thách cuối cùng. Không gợi ý. Nếu bạn làm được, nó được tính. Nếu bạn thất bại, nó cũng được tính.',
      c_defi1: 'Thử thách (1/2). Đây là một động từ. Hãy chia nó với “*je*”, ở *thì hiện tại*.',
      sens_etudier: 'học',
      c_defi2: 'Thử thách (2/2). Kết hợp “*étudier*” với “*aimer*”, với “*je*”. Hãy viết một câu.',
      presqueAccent: 'Được chấp nhận. Nhưng hãy xem lại dấu.',
      presqueApostrophe: 'Được chấp nhận. Nhưng đừng quên dấu lược.',
      quipEchec: 'Lần này thì không. Đã ghi nhận. Tiếp tục thôi.',
      c_rep: 'Ký ức bị hỏng. Hãy sửa nó: đặt mỗi từ vào đúng chỗ, *từ trái sang phải*.',
      tr_aimepizza: 'Mình thích pizza.',
      repApres1: 'Một bộ phim. Ít nhất cô ấy cũng có sở thích.',
      repApres3: 'Mình thích pizza. Cuối cùng cũng có một ý kiến dứt khoát.',
      repApres5: 'Còn một câu. Bạn đoán được là câu nào.',
      intro4: 'Một mảnh khác của ký ức. Lần này cô ấy nói về điều mình thích. Bạn sẽ thấy, rất cảm động.',
      fin4: 'Đã tìm lại mảnh thứ tư. Bạn đã nói được mình ăn gì, xem gì và thích gì. Ký ức đang thành hình.',
      sens_j: 'mình (“je” trước nguyên âm)',
      sens_aime: 'thích / yêu',
      sens_manger: 'ăn (dạng cơ bản)',
      sens_regarder: 'nhìn / xem (dạng cơ bản)',
      sens_jouer: 'chơi (dạng cơ bản)',
      sens_tele: 'TV (viết tắt của télévision)',
      tr_aimepoutine: 'Mình thích poutine.',
      tr_aimemanger: 'Mình thích ăn.',
      tr_aimetele: 'Mình thích xem TV.',
      tr_aimejouer: 'Mình thích chơi.',
      tr_aimeregpoutine: 'Mình thích nhìn poutine.',
      tr_aimemangerpoutine: 'Mình thích ăn poutine.',
      noteJ_titre: 'Ghi chú',
      noteJ: '“je” trước nguyên âm thành “j’”: je + aime → j’aime. Trước phụ âm thì không đổi: je mange. Điều này cũng xảy ra với những từ nhỏ khác, như “le” và “la”.',
      noteI_titre: 'Ghi chú',
      noteI: 'Sau “aimer”, động từ giữ dạng cơ bản: dạng nguyên mẫu. Nó kết thúc bằng -er: mang-er, regard-er, jou-er. Đó là động từ không có “je”.',
      quipJe: 'Trước “aime”, “je” thành “j’”. Nguyên âm đáng được tôn trọng.',
      quipInf: 'Sau “j’aime”, động từ giữ dạng cơ bản: -er, không phải -e.',
      quipApostrophe: 'Gần đúng rồi! Đừng quên dấu lược.',
      quipAimePoutine: 'Cô ấy thích poutine. Nhìn sự hào hứng là biết. À, là đoán được.',
      quipAimeManger: 'Ăn. Một hằng số ở cô ấy.',
      quipAimeJouer: 'Chơi. Chơi gì? Cô ấy không nói. Thêm một điều bí ẩn.',
      quipAimeRegPoutine: 'Nhìn poutine. Lại quay về chuyện này. Vẫn trầm tư như cũ.',
      cult_tele: 'Ở Québec cũng như ở Pháp, người ta chủ yếu nói “la télé”. Đó là viết tắt của “télévision”, một từ giống cái.',
      intro3: 'Một mảnh khác của cùng ký ức. Lần này cô ấy không ăn. Cô ấy đang nhìn. Sắc thái đấy.',
      finSuite: 'Đã tìm lại mảnh đầu tiên. Ký ức chưa trọn vẹn. Vẫn còn nữa.',
      fin3: 'Đã tìm lại mảnh thứ ba. Giờ bạn nói được mình nhìn gì và ăn gì. Đừng nhầm lẫn chúng.',
      sens_regarde: 'nhìn / xem',
      sens_film: 'phim',
      tr_regarde: 'Mình nhìn. / Mình xem.',
      tr_film: 'Mình xem một bộ phim.',
      tr_regpoutine: 'Mình nhìn một món poutine.',
      tr_regsandwich: 'Mình nhìn một cái sandwich.',
      noteR_titre: 'Ghi chú',
      noteR: 'Lại một động từ -er: je regard-e. Và ta “regarde” thẳng vào thứ mình nhìn: không có từ nhỏ nào giữa động từ và thứ được nhìn. Không có “vào”.',
      quipFilm: 'Một bộ phim. Cuối cùng cũng có thứ hợp lý.',
      quipRegPoutine: 'Nhìn một món poutine. Thật… trầm tư.',
      quipRegSandwich: 'Cô ấy nhìn cái sandwich. Cô ấy đói, nhưng cô ấy chờ. Đáng nể.',
      quipVerbe: 'Cô ấy không ăn. Cô ấy nhìn. Động từ quan trọng.',
      quipFilmMange: 'Ăn một bộ phim ư. Độc đáo. Nhưng không.',
      quipUn: '“Un film”, không phải “une”. Từ này giống đực.',
      cult_film: 'Từ “film” đến từ tiếng Anh, nơi nó chỉ một lớp màng mỏng. Trong tiếng Pháp nó là giống đực: un film.'
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
      bande_voir: 'Gade mo yo', bande_cacher: 'Kache mo yo', sans_son: 'Mwen pa tande anyen',
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
      fin: 'Souvni a retabli. Kounye a ou ka di sa w ap manje. Sa w pa manje… sa ap vini pita.',
      intro2: 'Yon lòt moso nan souvni a. Li toujou ap manje. Men koute byen: ti mo ki devan « sandwich » lan chanje.',
      fin2: 'Dezyèm moso a jwenn ankò. Yon bagay nouvo, se menm bagay la lè w deja konnen l: kounye a ou ka fè diferans lan. Gen plis moso ankò.',
      sens_le: 'atik defini pou mo maskilen (bagay nou ap pale de li a)',
      sens_la: 'atik defini pou mo fi (bagay nou ap pale de li a)',
      sens_pizza: 'pitza',
      tr_sandwichle: 'Mwen manje sandwich lan.',
      tr_poutinela: 'Mwen manje poutine lan.',
      tr_pizzaune: 'Mwen manje yon pitza.',
      tr_pizzala: 'Mwen manje pitza a.',
      noteL_titre: 'Remak',
      noteL: '« un » ak « une »: yon bagay nouvo, youn nan plizyè. « le » ak « la »: bagay nou ap pale de li a, sa nou deja konnen. Maskilen: un → le. Fi: une → la.',
      c_nouveau: 'Yon bagay *nouvo* parèt. Konstwi fraz la.',
      c_connu: 'Se menm bagay la, men kounye a ou *konnen* li. Konstwi fraz la.',
      quipNouveau: 'Yon bagay nouvo parèt: nou di « un » oswa « une ».',
      quipConnu: 'Menm bagay la, kounye a nou konnen l: nou di « le » oswa « la ».',
      quipLe: 'Maskilen, kidonk « le ». Se pa « la ».',
      quipLa: 'Fi, kidonk « la ». Se pa « le ».',
      quipDef: 'Nou ap pale de yon bagay nou deja konnen: « le » oswa « la », se pa « un » oswa « une ».',
      quipIndef: 'Yon bagay nouvo: « un » oswa « une », se pa « le » oswa « la ».',
      quipUne2: 'Fi: « une », se pa « un ». Menm règ ak pi bonè a.',
      quipUn2: 'Maskilen: « un », se pa « une ». Menm règ ak pi bonè a.',
      quipLeSandwich: 'Sandwich lan. Sa l konnen byen anpil kounye a.',
      quipLaPoutine: 'Poutine lan. Sa a nou pa bliye l. Se domaj.',
      quipPizza: 'Yon pitza. Omwen pa gen moun ki diskite sou sa a.',
      cult_pizza: 'Mo « pizza » a soti nan lang italyen an. An fransè, li fi: une pizza, la pizza.',
      sens_joue: 'jwe (mwen jwe)',
      tr_regpoutinela: 'Mwen gade poutine lan.',
      tr_regsandwichle: 'Mwen gade sandwich lan.',
      tr_jejoue: 'Mwen jwe.',
      quipRegPoutineLa: 'Poutine lan. Toujou gade, jamè manje. Li gen prensip.',
      quipRegSandwichLe: 'Menm sandwich lan. Li konnen l kounye a. Men li toujou pa manje l.',
      quipJeJoue: 'Ak « je », vèb la pèdi -r a: jouer → joue. Menm jan ak mange, menm jan ak regarde.',
      reprise: 'N ap kontinye kote nou te rete a. Mwen pa bliye anyen, ou wè.',
      quitter_titre: 'Kite epi kontinye pita?',
      quitter_info: 'Pwogrè w la sove.',
      quitter_oui: 'Kite',
      quitter_non: 'Rete',
      intro5: 'Tout kat moso yo la. Kounye a fò w mete yo ansanm, poukont ou. Mwen p ap di anyen. Enben, prèske anyen.',
      fin5: 'Souvni a repare. Kat moso, sis fraz, yon ti poutine. Li te ka pi mal.',
      intro6: 'Dènye moso souvni a. Fwa sa a, pa gen pesonn k ap kenbe men w. Gen bagay sèlman yon moun ka fè: koute, ekri, sonje. Fò w abitye ak sa. Isit la, sa pa konte… men sa w ekri a ap anrejistre.',
      fin6: 'Dènye moso a jwenn. Souvni a konplè. Sa w ekri a sove. Pou sa k ap vini apre a… n ap wè.',
      c_dictee: '*Koute*, answit *ekri sa w tande a*. Lis mo a se yon èd: ou pa ka *manyen* li.',
      c_ecoute_ecris: '*Koute*, answit *ekri sa w tande a*.',
      c_rappel: 'Ou deja wè fraz sa a. *Konstwi l* de memwa.', c_finale: 'Konplete *bout* vèb la.',
      tr_regfilmle: 'Mwen gade fim nan.', tr_regpizzaune: 'Mwen gade yon pitza.', tr_regpizzala: 'Mwen gade pitza a.', tr_aimemangersandwich: 'Mwen renmen manje yon sandwich.', tr_aimemangerpizza: 'Mwen renmen manje pitza a.', tr_aimeregfilm: 'Mwen renmen gade yon fim.',
      liste_mots: 'Mo ou ka itilize',
      c_aimeq: 'Ou se Bek. Kisa ou *renmen* fè? Ekri yon *fraz konplè*.',
      lec_certif: 'Kounye a, kesyon sou Bek. Pou reponn yo, fò w sonje sa w te aprann sou li. Pa gen anyen pou chwazi: ekri l poukont ou. Mwen pral tcheke repons ou a, epi l ap sove. Ou ka fè erè. Men sa ka gen konsekans pita.',
      c_certif1: 'Nan souvni ou te repare yo, ki bagay Bek *manje*? Ekri yo ak « *un* » oswa « *une* ».',
      quipCompOk: 'Tou le twa, ak atik la kòrèk. Egzakteman. Li p ap di l, men li kontan.',
      quipCompEssai: 'Pa ankò. Bwat vèt yo kòrèk. Korije lòt yo. Yon dènye eseye.',
      quipCompFin: 'Pa fwa sa a. Li manje yon sandwich, yon poutine ak yon pitza. Note.',
      comp_reponse: 'Repons: un sandwich, une poutine, une pizza.',
      lec_libre: 'Kesyon sa a pa gen bon oswa move repons. Yon pwofesè ka li l. Yon lis vèb ka ede, men diksyonè pa w la pi bon toujou: sèvi ak li.',
      c_libre: 'Kounye a, ou menm: kisa ou *renmen* fè? Ekri *yon fraz twa mo*: « *je* » + « *aimer* » + yon *vèb*.',
      libre_trois: 'Sa pa twa mo: je + aime + yon vèb. Korije l, oswa konfime ankò pou kenbe repons ou a.',
      gloss_titre: 'Vèb komen',
      gloss_dico: 'Gen youn ki manke? Chèche l nan pwòp diksyonè ou: se yon trè bon abitid.',
      gloss_liste: [
        'manger — manje',
        'boire — bwè',
        'regarder — gade',
        'jouer — jwe',
        'étudier — etidye',
        'lire — li',
        'écouter — koute',
        'chanter — chante',
        'danser — danse',
        'dormir — dòmi',
        'marcher — mache',
        'dessiner — desine',
        'cuisiner — kwit manje',
        'nager — naje',
        'voyager — vwayaje'
      ],
      passer: 'Sote',
      quipLibre: 'Mèsi. Li sove.',
      copier: 'Kopye',
      copie: 'Kopye!',
      toutCopier: 'Kopye tout',
      recap_titre: 'Repons ou yo',
      lec_defi: 'Yon dènye defi. Pa gen endis. Si w reyisi, sa konte. Si w echwe, sa konte tou.',
      c_defi1: 'Defi (1/2). Men yon vèb. Konjige l ak « *je* », nan *tan prezan*.',
      sens_etudier: 'etidye',
      c_defi2: 'Defi (2/2). Konbine « *étudier* » ak « *aimer* », ak « *je* ». Ekri yon fraz.',
      presqueAccent: 'Aksepte. Men gade aksan yo.',
      presqueApostrophe: 'Aksepte. Men pa bliye apostwòf la.',
      quipEchec: 'Pa fwa sa a. Note. N ap kontinye.',
      c_rep: 'Souvni a domaje. Repare l: mete chak mo nan plas li, *de goch a dwat*.',
      tr_aimepizza: 'Mwen renmen pitza.',
      repApres1: 'Yon fim. Kidonk li gen gou, omwen.',
      repApres3: 'Mwen renmen pitza. Anfen, yon opinyon fèm.',
      repApres5: 'Rete yon fraz. Ou ka devine kilès la.',
      intro4: 'Yon lòt moso nan souvni a. Fwa sa a, li pale de sa li renmen. W ap wè, li touchan.',
      fin4: 'Katriyèm moso a jwenn. Ou ka di sa w manje, sa w gade ak sa w renmen. Souvni a ap pran fòm.',
      sens_j: 'mwen (« je » devan yon vwayèl)',
      sens_aime: 'renmen / pito',
      sens_manger: 'manje (fòm debaz)',
      sens_regarder: 'gade (fòm debaz)',
      sens_jouer: 'jwe (fòm debaz)',
      sens_tele: 'tele (kout pou télévision)',
      tr_aimepoutine: 'Mwen renmen poutine.',
      tr_aimemanger: 'Mwen renmen manje.',
      tr_aimetele: 'Mwen renmen gade tele.',
      tr_aimejouer: 'Mwen renmen jwe.',
      tr_aimeregpoutine: 'Mwen renmen gade poutine.',
      tr_aimemangerpoutine: 'Mwen renmen manje poutine.',
      noteJ_titre: 'Remak',
      noteJ: '« je » devan yon vwayèl vin « j’ »: je + aime → j’aime. Devan yon konsòn, anyen pa chanje: je mange. Sa rive tou ak lòt ti mo, tankou « le » ak « la ».',
      noteI_titre: 'Remak',
      noteI: 'Apre « aimer », vèb la rete nan fòm debaz li: enfinitif la. Li fini an -er: mang-er, regard-er, jou-er. Se vèb la san « je ».',
      quipJe: 'Devan « aime », « je » vin « j’ ». Vwayèl yo merite respè.',
      quipInf: 'Apre « j’aime », vèb la kenbe fòm debaz li: -er, se pa -e.',
      quipApostrophe: 'Prèske! Pa bliye apostwòf la.',
      quipAimePoutine: 'Li renmen poutine. Ou ka wè sa nan antouzyasm li. Enben, ou ka devine l.',
      quipAimeManger: 'Manje. Se yon konstan nan li.',
      quipAimeJouer: 'Jwe. Jwe kisa? Li pa di. Yon lòt mistè ankò.',
      quipAimeRegPoutine: 'Gade poutine. N ap retounen sou sa. Toujou kontanplatif.',
      cult_tele: 'Nan Kebèk menm jan ak an Frans, moun di pi souvan « la télé ». Se kout pou « télévision », yon mo fi.',
      intro3: 'Yon lòt moso nan menm souvni a. Fwa sa a li pa ap manje. Li ap gade. Nuans.',
      finSuite: 'Premye moso a jwenn. Souvni a poko konplè. Gen plis ankò.',
      fin3: 'Twazyèm moso a jwenn. Kounye a ou ka di sa w gade ak sa w manje. Pa konfonn yo.',
      sens_regarde: 'gade',
      sens_film: 'fim',
      tr_regarde: 'Mwen gade.',
      tr_film: 'Mwen gade yon fim.',
      tr_regpoutine: 'Mwen gade yon poutine.',
      tr_regsandwich: 'Mwen gade yon sandwich.',
      noteR_titre: 'Remak',
      noteR: 'Yon lòt vèb an -er: je regard-e. Epi nou « regarde » yon bagay dirèkteman: pa gen ti mo ant vèb la ak sa nou gade a.',
      quipFilm: 'Yon fim. Anfen yon bagay ki gen sans.',
      quipRegPoutine: 'Gade yon poutine. Ala… kontanplatif.',
      quipRegSandwich: 'Li gade sandwich lan. Li grangou, men l ap tann. Admirab.',
      quipVerbe: 'Li pa manje. Li gade. Vèb la konte.',
      quipFilmMange: 'Manje yon fim. Orijinal. Men non.',
      quipUn: '« Un film », se pa « une ». Mo a maskilen.',
      cult_film: 'Mo « film » lan soti nan lang anglè a, kote li te vle di yon fèy mens. An fransè, li maskilen: un film.'
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
      bande_voir: 'Tingnan ang mga salita', bande_cacher: 'Itago ang mga salita', sans_son: 'Wala akong marinig',
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
      fin: 'Naibalik na ang alaala. Kaya mo nang sabihin kung ano ang kinakain mo. Ang hindi mo kinakain… susunod na iyon.',
      intro2: 'Isa pang piraso ng alaala. Kumakain pa rin siya. Pero makinig kang mabuti: nagbago ang maliit na salita sa harap ng “sandwich”.',
      fin2: 'Nabawi na ang ikalawang piraso. Isang bagong bagay, at kapag kilala mo na ito, iisang bagay lang pala: kaya mo na ngayong makilala ang pagkakaiba. May iba pang piraso.',
      sens_le: 'ang (salitang panlalaki: ang bagay na pinag-uusapan natin)',
      sens_la: 'ang (salitang pambabae: ang bagay na pinag-uusapan natin)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Kinakain ko ang sandwich.',
      tr_poutinela: 'Kinakain ko ang poutine.',
      tr_pizzaune: 'Kumakain ako ng pizza.',
      tr_pizzala: 'Kinakain ko ang pizza.',
      noteL_titre: 'Tala',
      noteL: '“un” at “une”: bago, isa sa marami. “le” at “la”: ang bagay na pinag-uusapan natin, ang kilala na natin. Panlalaki: un → le. Pambabae: une → la.',
      c_nouveau: 'May lumitaw na *bago*. Buuin ang pangungusap.',
      c_connu: 'Iisang bagay iyon, pero *kilala* mo na ito ngayon. Buuin ang pangungusap.',
      quipNouveau: 'May lumitaw na bago: sinasabi natin ang “un” o “une”.',
      quipConnu: 'Iisang bagay, kilala na ngayon: sinasabi natin ang “le” o “la”.',
      quipLe: 'Panlalaki, kaya “le”. Hindi “la”.',
      quipLa: 'Pambabae, kaya “la”. Hindi “le”.',
      quipDef: 'Pinag-uusapan natin ang bagay na kilala na: “le” o “la”, hindi “un” o “une”.',
      quipIndef: 'Bago: “un” o “une”, hindi “le” o “la”.',
      quipUne2: 'Pambabae: “une”, hindi “un”. Parehong tuntunin kanina.',
      quipUn2: 'Panlalaki: “un”, hindi “une”. Parehong tuntunin kanina.',
      quipLeSandwich: 'Ang sandwich. Iyong kilalang-kilala na niya ngayon.',
      quipLaPoutine: 'Ang poutine. Hindi natin iyan nakalimutan. Sayang.',
      quipPizza: 'Isang pizza. Kahit paano, walang nagtatalo tungkol dito.',
      cult_pizza: 'Ang salitang “pizza” ay galing sa Italyano. Sa Pranses, pambabae ito: une pizza, la pizza.',
      sens_joue: 'maglaro (naglalaro ako)',
      tr_regpoutinela: 'Tinitingnan ko ang poutine.',
      tr_regsandwichle: 'Tinitingnan ko ang sandwich.',
      tr_jejoue: 'Naglalaro ako.',
      quipRegPoutineLa: 'Ang poutine. Tinitingnan pa rin, hindi kailanman kinakain. May prinsipyo siya.',
      quipRegSandwichLe: 'Ang parehong sandwich. Kilala na niya ito. Hindi pa rin niya kinakain.',
      quipJeJoue: 'Kapag “je”, nawawala ang -r ng pandiwa: jouer → joue. Tulad ng mange, tulad ng regarde.',
      reprise: 'Ipinagpapatuloy natin kung saan tayo huminto. Wala akong nakalimutan, makikita mo.',
      quitter_titre: 'Aalis muna at magpapatuloy mamaya?',
      quitter_info: 'Nai-save ang progreso mo.',
      quitter_oui: 'Umalis',
      quitter_non: 'Manatili',
      intro5: 'Narito na ang apat na piraso. Ngayon, pagsama-samahin mo sila, nang mag-isa. Wala akong sasabihin. Sige, halos wala.',
      fin5: 'Naayos na ang alaala. Apat na piraso, anim na pangungusap, kaunting poutine. Puwede pang mas masama.',
      intro6: 'Huling piraso ng alaala. Sa pagkakataong ito, walang aakay sa iyo. May mga bagay na tao lang ang kayang gawin: making, sumulat, tumandaan. Kailangan mong masanay. Hindi ito binibilang dito… pero itatala ang isusulat mo.',
      fin6: 'Nabawi na ang huling piraso. Buo na ang alaala. Itinatago ang isinulat mo. Tungkol sa susunod… makikita natin.',
      c_dictee: '*Making*, tapos *isulat ang naririnig mo*. Tulong ang listahan ng mga salita: hindi mo ito maaaring *pindutin*.',
      c_ecoute_ecris: '*Making*, tapos *isulat ang naririnig mo*.',
      c_rappel: 'Nakita mo na ang pangungusap na ito. *Buuin ito* mula sa alaala.', c_finale: 'Kumpletuhin ang *dulo* ng pandiwa.',
      tr_regfilmle: 'Pinapanood ko ang pelikula.', tr_regpizzaune: 'Tumitingin ako sa isang pizza.', tr_regpizzala: 'Tinitingnan ko ang pizza.', tr_aimemangersandwich: 'Gusto kong kumain ng sandwich.', tr_aimemangerpizza: 'Gusto kong kainin ang pizza.', tr_aimeregfilm: 'Gusto kong manood ng pelikula.',
      liste_mots: 'Mga salitang magagamit mo',
      c_aimeq: 'Ikaw si Bek. Ano ang *gusto* mong gawin? Magsulat ng *buong pangungusap*.',
      lec_certif: 'Ngayon, mga tanong tungkol kay Bek. Para sagutin ang mga ito, kailangan mong alalahanin ang natutunan mo tungkol sa kaniya. Walang pagpipilian: ikaw mismo ang magsulat. Susuriin ko ang sagot mo, at ito ay itatago. Puwede kang magkamali. Pero maaaring may mga epekto ito sa susunod.',
      c_certif1: 'Sa mga alaalang naayos mo, anong mga bagay ang *kinakain* ni Bek? Isulat ang mga ito gamit ang “*un*” o “*une*”.',
      quipCompOk: 'Lahat ng tatlo, tama ang artikulo. Eksakto. Hindi niya sasabihin, pero masaya siya.',
      quipCompEssai: 'Hindi pa. Tama ang mga berdeng kahon. Ayusin ang iba. Isang huling subok.',
      quipCompFin: 'Hindi ngayon. Kumakain siya ng sandwich, poutine at pizza. Naitala na.',
      comp_reponse: 'Sagot: un sandwich, une poutine, une pizza.',
      lec_libre: 'Walang tama o maling sagot dito. Maaaring basahin ito ng isang guro. Makatutulong ang listahan ng mga pandiwa, pero mas maganda ang sarili mong diksyunaryo: gamitin mo ito.',
      c_libre: 'Ngayon, ikaw naman: ano ang *gusto* mong gawin? Magsulat ng *isang pangungusap na may tatlong salita*: “*je*” + “*aimer*” + isang *pandiwa*.',
      libre_trois: 'Hindi iyan tatlong salita: je + aime + isang pandiwa. Ayusin ito, o kumpirmahin muli para manatili ang sagot mo.',
      gloss_titre: 'Karaniwang mga pandiwa',
      gloss_dico: 'May kulang ba? Hanapin ito sa sarili mong diksyunaryo: napakagandang ugali nito.',
      gloss_liste: [
        'manger — kumain',
        'boire — uminom',
        'regarder — tumingin / manood',
        'jouer — maglaro',
        'étudier — mag-aral',
        'lire — bumasa',
        'écouter — making',
        'chanter — kumanta',
        'danser — sumayaw',
        'dormir — matulog',
        'marcher — maglakad',
        'dessiner — gumuhit',
        'cuisiner — magluto',
        'nager — lumangoy',
        'voyager — maglakbay'
      ],
      passer: 'Laktawan',
      quipLibre: 'Salamat. Naitago na.',
      copier: 'Kopyahin',
      copie: 'Nakopya na!',
      toutCopier: 'Kopyahin lahat',
      recap_titre: 'Ang mga sagot mo',
      lec_defi: 'Isang huling hamon. Walang pahiwatig. Kapag nagtagumpay ka, bibilangin. Kapag nabigo ka, bibilangin din.',
      c_defi1: 'Hamon (1/2). Heto ang isang pandiwa. I-conjugate ito gamit ang “*je*”, sa *kasalukuyang panahunan*.',
      sens_etudier: 'mag-aral',
      c_defi2: 'Hamon (2/2). Pagsamahin ang “*étudier*” at “*aimer*”, gamit ang “*je*”. Magsulat ng isang pangungusap.',
      presqueAccent: 'Tinanggap. Pero tingnan ang mga tuldik.',
      presqueApostrophe: 'Tinanggap. Pero huwag kalimutan ang kudlit.',
      quipEchec: 'Hindi ngayon. Naitala na. Tuloy tayo.',
      c_rep: 'Sira ang alaala. Ayusin ito: ilagay ang bawat salita sa tamang puwesto, *mula kaliwa pakanan*.',
      tr_aimepizza: 'Gusto ko ang pizza.',
      repApres1: 'Isang pelikula. May panlasa naman pala siya.',
      repApres3: 'Gusto ko ang pizza. Sa wakas, isang matatag na opinyon.',
      repApres5: 'Isang pangungusap na lang. Mahuhulaan mo kung alin.',
      intro4: 'Isa pang piraso ng alaala. Ngayon, sinasabi niya ang gusto niya. Makikita mo, nakakaantig.',
      fin4: 'Nabawi na ang ikaapat na piraso. Kaya mo nang sabihin ang kinakain mo, ang pinapanood mo at ang gusto mo. Nagkakahugis na ang alaala.',
      sens_j: 'ako (“je” bago ang patinig)',
      sens_aime: 'gusto / mahal',
      sens_manger: 'kumain (batayang anyo)',
      sens_regarder: 'tumingin / manood (batayang anyo)',
      sens_jouer: 'maglaro (batayang anyo)',
      sens_tele: 'TV (maikling anyo ng télévision)',
      tr_aimepoutine: 'Gusto ko ang poutine.',
      tr_aimemanger: 'Gusto kong kumain.',
      tr_aimetele: 'Gusto kong manood ng TV.',
      tr_aimejouer: 'Gusto kong maglaro.',
      tr_aimeregpoutine: 'Gusto kong tumingin sa poutine.',
      tr_aimemangerpoutine: 'Gusto kong kumain ng poutine.',
      noteJ_titre: 'Tala',
      noteJ: 'Ang “je” bago ang patinig ay nagiging “j’”: je + aime → j’aime. Bago ang katinig, walang nagbabago: je mange. Nangyayari rin ito sa ibang maliliit na salita, tulad ng “le” at “la”.',
      noteI_titre: 'Tala',
      noteI: 'Pagkatapos ng “aimer”, nananatili ang pandiwa sa batayang anyo nito: ang infinitive. Nagtatapos ito sa -er: mang-er, regard-er, jou-er. Ito ang pandiwa na walang “je”.',
      quipJe: 'Bago ang “aime”, nagiging “j’” ang “je”. Dapat igalang ang mga patinig.',
      quipInf: 'Pagkatapos ng “j’aime”, nananatili ang batayang anyo ng pandiwa: -er, hindi -e.',
      quipApostrophe: 'Malapit na! Huwag kalimutan ang kudlit.',
      quipAimePoutine: 'Gusto niya ang poutine. Makikita sa sigla niya. Sige, mahuhulaan.',
      quipAimeManger: 'Ang kumain. Palagi iyan sa kaniya.',
      quipAimeJouer: 'Ang maglaro. Ng ano? Hindi niya sinasabi. Isa pang misteryo.',
      quipAimeRegPoutine: 'Ang tumingin sa poutine. Balik na naman tayo rito. Mapagnilay pa rin.',
      cult_tele: 'Sa Quebec at sa France, madalas sabihin ang “la télé”. Maikling anyo ito ng “télévision”, isang salitang pambabae.',
      intro3: 'Isa pang piraso ng iisang alaala. Ngayon, hindi siya kumakain. Tumitingin siya. Banayad na pagkakaiba.',
      finSuite: 'Nabawi na ang unang piraso. Hindi pa buo ang alaala. May iba pa.',
      fin3: 'Nabawi na ang ikatlong piraso. Kaya mo nang sabihin ang tinitingnan mo at ang kinakain mo. Huwag mo silang pagkamalian.',
      sens_regarde: 'tumingin / manood',
      sens_film: 'pelikula',
      tr_regarde: 'Tumitingin ako. / Nanonood ako.',
      tr_film: 'Nanonood ako ng pelikula.',
      tr_regpoutine: 'Tinitingnan ko ang isang poutine.',
      tr_regsandwich: 'Tinitingnan ko ang isang sandwich.',
      noteR_titre: 'Tala',
      noteR: 'Isa pang pandiwang -er: je regard-e. At direkta mong “regarde” ang isang bagay: walang maliit na salita sa pagitan ng pandiwa at ng tinitingnan. Walang “sa”.',
      quipFilm: 'Isang pelikula. Sa wakas, may matino.',
      quipRegPoutine: 'Tumingin sa poutine. Ang… mapagnilay.',
      quipRegSandwich: 'Tinitingnan niya ang sandwich. Gutom siya, pero naghihintay siya. Kahanga-hanga.',
      quipVerbe: 'Hindi siya kumakain. Tumitingin siya. Mahalaga ang pandiwa.',
      quipFilmMange: 'Kumain ng pelikula. Orihinal. Pero hindi.',
      quipUn: '“Un film”, hindi “une”. Panlalaki ang salita.',
      cult_film: 'Ang salitang “film” ay galing sa Ingles, kung saan tumutukoy ito sa manipis na pelikula o patong. Sa Pranses, panlalaki ito: un film.'
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
      bande_voir: 'Lihat kata-kata', bande_cacher: 'Sembunyikan kata-kata', sans_son: 'Aku tidak mendengar apa-apa',
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
      fin: 'Kenangan telah dipulihkan. Sekarang kamu bisa mengatakan apa yang kamu makan. Yang tidak kamu makan… nanti menyusul.',
      intro2: 'Satu potongan ingatan lagi. Dia masih makan. Tapi dengarkan baik-baik: kata kecil di depan “sandwich” sudah berubah.',
      fin2: 'Potongan kedua telah ditemukan. Sesuatu yang baru, dan setelah kamu mengenalnya, ia jadi hal yang sama: sekarang kamu bisa membedakannya. Masih ada potongan lain.',
      sens_le: 'artikel tentu (kata maskulin: hal yang sedang kita bicarakan)',
      sens_la: 'artikel tentu (kata feminin: hal yang sedang kita bicarakan)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Aku makan sandwich itu.',
      tr_poutinela: 'Aku makan poutine itu.',
      tr_pizzaune: 'Aku makan sebuah pizza.',
      tr_pizzala: 'Aku makan pizza itu.',
      noteL_titre: 'Catatan',
      noteL: '“un” dan “une”: sesuatu yang baru, satu di antara banyak. “le” dan “la”: hal yang sedang kita bicarakan, yang sudah kita kenal. Maskulin: un → le. Feminin: une → la.',
      c_nouveau: 'Sesuatu yang *baru* muncul. Susunlah kalimatnya.',
      c_connu: 'Itu hal yang sama, tetapi sekarang kamu sudah *mengenalnya*. Susunlah kalimatnya.',
      quipNouveau: 'Sesuatu yang baru muncul: kita bilang “un” atau “une”.',
      quipConnu: 'Hal yang sama, sekarang sudah dikenal: kita bilang “le” atau “la”.',
      quipLe: 'Maskulin, jadi “le”. Bukan “la”.',
      quipLa: 'Feminin, jadi “la”. Bukan “le”.',
      quipDef: 'Kita membicarakan sesuatu yang sudah dikenal: “le” atau “la”, bukan “un” atau “une”.',
      quipIndef: 'Sesuatu yang baru: “un” atau “une”, bukan “le” atau “la”.',
      quipUne2: 'Feminin: “une”, bukan “un”. Aturannya sama seperti tadi.',
      quipUn2: 'Maskulin: “un”, bukan “une”. Aturannya sama seperti tadi.',
      quipLeSandwich: 'Sandwich itu. Yang sekarang sudah sangat dia kenal.',
      quipLaPoutine: 'Poutine itu. Yang ini tidak kita lupakan. Sayang sekali.',
      quipPizza: 'Sebuah pizza. Setidaknya yang ini tidak ada yang memperdebatkan.',
      cult_pizza: 'Kata “pizza” berasal dari bahasa Italia. Dalam bahasa Prancis, kata ini feminin: une pizza, la pizza.',
      sens_joue: 'bermain (aku bermain)',
      tr_regpoutinela: 'Aku melihat poutine itu.',
      tr_regsandwichle: 'Aku melihat sandwich itu.',
      tr_jejoue: 'Aku bermain.',
      quipRegPoutineLa: 'Poutine itu. Terus dipandangi, tidak pernah dimakan. Dia punya prinsip.',
      quipRegSandwichLe: 'Sandwich yang sama. Dia sudah mengenalnya. Tapi tetap tidak dimakan.',
      quipJeJoue: 'Dengan “je”, kata kerja kehilangan -r: jouer → joue. Seperti mange, seperti regarde.',
      reprise: 'Kita lanjutkan dari tempat kita berhenti. Aku tidak lupa apa pun, lihat saja.',
      quitter_titre: 'Keluar dan lanjutkan nanti?',
      quitter_info: 'Kemajuanmu tersimpan.',
      quitter_oui: 'Keluar',
      quitter_non: 'Tetap di sini',
      intro5: 'Keempat potongan sudah ada. Sekarang saatnya menyatukannya, sendirian. Aku tidak akan bilang apa-apa. Yah, hampir tidak.',
      fin5: 'Ingatan sudah diperbaiki. Empat potongan, enam kalimat, sedikit poutine. Bisa saja lebih buruk.',
      intro6: 'Potongan terakhir dari ingatan. Kali ini tidak ada yang menuntunmu. Ada hal yang hanya bisa dilakukan manusia: mendengar, menulis, mengingat. Kamu harus membiasakan diri. Di sini hal ini tidak dihitung… tapi apa yang kamu tulis akan dicatat.',
      fin6: 'Potongan terakhir telah ditemukan. Ingatannya utuh. Apa yang kamu tulis tersimpan. Soal apa yang terjadi selanjutnya… kita lihat saja.',
      c_dictee: '*Dengarkan*, lalu *tulis apa yang kamu dengar*. Daftar kata adalah bantuan: kamu tidak bisa *menyentuhnya*.',
      c_ecoute_ecris: '*Dengarkan*, lalu *tulis apa yang kamu dengar*.',
      c_rappel: 'Kamu sudah pernah melihat kalimat ini. *Susunlah* dari ingatan.', c_finale: 'Lengkapi *akhiran* kata kerjanya.',
      tr_regfilmle: 'Aku menonton film itu.', tr_regpizzaune: 'Aku melihat sebuah pizza.', tr_regpizzala: 'Aku melihat pizza itu.', tr_aimemangersandwich: 'Aku suka makan sebuah sandwich.', tr_aimemangerpizza: 'Aku suka makan pizza itu.', tr_aimeregfilm: 'Aku suka menonton sebuah film.',
      liste_mots: 'Kata yang boleh kamu pakai',
      c_aimeq: 'Kamu adalah Bek. Apa yang *kamu suka* lakukan? Tulis sebuah *kalimat lengkap*.',
      lec_certif: 'Sekarang, pertanyaan tentang Bek. Untuk menjawabnya, kamu harus mengingat apa yang sudah kamu pelajari tentang dia. Tidak ada pilihan: tulis sendiri. Aku akan memeriksa jawabanmu, dan jawaban itu akan disimpan. Kamu bisa salah. Tapi itu mungkin berakibat nanti.',
      c_certif1: 'Dalam ingatan yang sudah kamu perbaiki, apa saja yang *dimakan* Bek? Tulis dengan “*un*” atau “*une*”.',
      quipCompOk: 'Ketiganya, dengan artikel yang benar. Tepat. Dia tidak akan bilang, tapi dia senang.',
      quipCompEssai: 'Belum. Kotak hijau sudah benar. Perbaiki yang lain. Satu kesempatan terakhir.',
      quipCompFin: 'Kali ini belum. Dia makan sandwich, poutine, dan pizza. Sudah dicatat.',
      comp_reponse: 'Jawaban: un sandwich, une poutine, une pizza.',
      lec_libre: 'Yang ini tidak punya jawaban benar atau salah. Mungkin seorang guru akan membacanya. Daftar kata kerja bisa membantu, tapi kamusmu sendiri lebih baik lagi: pakailah.',
      c_libre: 'Sekarang, giliranmu: apa yang *kamu suka* lakukan? Tulis *satu kalimat tiga kata*: “*je*” + “*aimer*” + sebuah *kata kerja*.',
      libre_trois: 'Itu bukan tiga kata: je + aime + sebuah kata kerja. Perbaiki, atau konfirmasi lagi untuk menyimpan jawabanmu.',
      gloss_titre: 'Kata kerja umum',
      gloss_dico: 'Ada yang kurang? Cari di kamusmu sendiri: itu kebiasaan yang sangat bagus.',
      gloss_liste: [
        'manger — makan',
        'boire — minum',
        'regarder — melihat / menonton',
        'jouer — bermain',
        'étudier — belajar',
        'lire — membaca',
        'écouter — mendengarkan',
        'chanter — bernyanyi',
        'danser — menari',
        'dormir — tidur',
        'marcher — berjalan',
        'dessiner — menggambar',
        'cuisiner — memasak',
        'nager — berenang',
        'voyager — bepergian'
      ],
      passer: 'Lewati',
      quipLibre: 'Terima kasih. Sudah tersimpan.',
      copier: 'Salin',
      copie: 'Tersalin!',
      toutCopier: 'Salin semua',
      recap_titre: 'Jawabanmu',
      lec_defi: 'Satu tantangan terakhir. Tanpa petunjuk. Kalau kamu berhasil, itu dihitung. Kalau gagal, itu juga dihitung.',
      c_defi1: 'Tantangan (1/2). Ini sebuah kata kerja. Konjugasikan dengan “*je*”, dalam *kala kini*.',
      sens_etudier: 'belajar',
      c_defi2: 'Tantangan (2/2). Gabungkan “*étudier*” dengan “*aimer*”, dengan “*je*”. Tulis sebuah kalimat.',
      presqueAccent: 'Diterima. Tapi perhatikan tanda aksennya.',
      presqueApostrophe: 'Diterima. Tapi jangan lupa apostrofnya.',
      quipEchec: 'Kali ini belum. Sudah dicatat. Lanjut.',
      c_rep: 'Ingatan ini rusak. Perbaikilah: letakkan setiap kata di tempatnya, *dari kiri ke kanan*.',
      tr_aimepizza: 'Aku suka pizza.',
      repApres1: 'Sebuah film. Jadi dia punya selera, setidaknya.',
      repApres3: 'Aku suka pizza. Akhirnya, pendapat yang tegas.',
      repApres5: 'Tinggal satu kalimat. Kamu bisa menebak yang mana.',
      intro4: 'Satu potongan ingatan lagi. Kali ini dia bicara tentang apa yang dia suka. Kamu akan lihat, ini mengharukan.',
      fin4: 'Potongan keempat telah ditemukan. Kamu sudah bisa mengatakan apa yang kamu makan, apa yang kamu tonton, dan apa yang kamu suka. Ingatan ini mulai terbentuk.',
      sens_j: 'aku (“je” sebelum huruf vokal)',
      sens_aime: 'suka / cinta',
      sens_manger: 'makan (bentuk dasar)',
      sens_regarder: 'melihat / menonton (bentuk dasar)',
      sens_jouer: 'bermain (bentuk dasar)',
      sens_tele: 'TV (singkatan dari télévision)',
      tr_aimepoutine: 'Aku suka poutine.',
      tr_aimemanger: 'Aku suka makan.',
      tr_aimetele: 'Aku suka menonton TV.',
      tr_aimejouer: 'Aku suka bermain.',
      tr_aimeregpoutine: 'Aku suka memandangi poutine.',
      tr_aimemangerpoutine: 'Aku suka makan poutine.',
      noteJ_titre: 'Catatan',
      noteJ: '“je” sebelum huruf vokal menjadi “j’”: je + aime → j’aime. Sebelum konsonan tidak ada yang berubah: je mange. Hal ini juga terjadi pada kata kecil lain, seperti “le” dan “la”.',
      noteI_titre: 'Catatan',
      noteI: 'Setelah “aimer”, kata kerja tetap dalam bentuk dasarnya: infinitif. Berakhiran -er: mang-er, regard-er, jou-er. Itu kata kerja tanpa “je”.',
      quipJe: 'Sebelum “aime”, “je” menjadi “j’”. Huruf vokal pantas dihormati.',
      quipInf: 'Setelah “j’aime”, kata kerja tetap dalam bentuk dasar: -er, bukan -e.',
      quipApostrophe: 'Hampir! Jangan lupa apostrofnya.',
      quipAimePoutine: 'Dia suka poutine. Kelihatan dari antusiasmenya. Ya, bisa ditebak.',
      quipAimeManger: 'Makan. Hal yang konstan pada dirinya.',
      quipAimeJouer: 'Bermain. Main apa? Dia tidak bilang. Satu misteri lagi.',
      quipAimeRegPoutine: 'Memandangi poutine. Kita kembali ke sini. Masih penuh renungan.',
      cult_tele: 'Di Québec maupun di Prancis, orang lebih sering bilang “la télé”. Itu singkatan dari “télévision”, kata feminin.',
      intro3: 'Satu potongan lagi dari ingatan yang sama. Kali ini dia tidak makan. Dia memandang. Bedanya halus.',
      finSuite: 'Potongan pertama telah ditemukan. Ingatan ini belum utuh. Masih ada yang lain.',
      fin3: 'Potongan ketiga telah ditemukan. Sekarang kamu bisa mengatakan apa yang kamu lihat dan apa yang kamu makan. Jangan tertukar.',
      sens_regarde: 'melihat / menonton',
      sens_film: 'film',
      tr_regarde: 'Aku melihat. / Aku menonton.',
      tr_film: 'Aku menonton sebuah film.',
      tr_regpoutine: 'Aku melihat sebuah poutine.',
      tr_regsandwich: 'Aku melihat sebuah sandwich.',
      noteR_titre: 'Catatan',
      noteR: 'Satu lagi kata kerja -er: je regard-e. Dan kita “regarde” sesuatu secara langsung: tidak ada kata kecil di antara kata kerja dan apa yang dilihat. Tidak ada “pada”.',
      quipFilm: 'Sebuah film. Akhirnya, sesuatu yang masuk akal.',
      quipRegPoutine: 'Memandangi poutine. Betapa… penuh renungan.',
      quipRegSandwich: 'Dia memandangi sandwich itu. Dia lapar, tapi dia menunggu. Mengagumkan.',
      quipVerbe: 'Dia tidak makan. Dia melihat. Kata kerjanya penting.',
      quipFilmMange: 'Makan sebuah film. Orisinal. Tapi tidak.',
      quipUn: '“Un film”, bukan “une”. Kata ini maskulin.',
      cult_film: 'Kata “film” berasal dari bahasa Inggris, yang artinya lapisan tipis. Dalam bahasa Prancis, kata ini maskulin: un film.'
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
      bande_voir: 'Toon de woorden', bande_cacher: 'Verberg de woorden', sans_son: 'Ik hoor niets',
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
      fin: 'Herinnering hersteld. Nu kun je zeggen wat je eet. Wat je niet eet… komt later.',
      intro2: 'Nog een stukje van de herinnering. Ze is nog steeds aan het eten. Maar luister goed: het woordje voor “sandwich” is veranderd.',
      fin2: 'Tweede stukje teruggevonden. Iets nieuws, en als je het eenmaal kent, is het hetzelfde ding: nu kun je het verschil maken. Er zijn nog meer stukjes.',
      sens_le: 'de/het (mannelijk woord: waar we het over hebben)',
      sens_la: 'de/het (vrouwelijk woord: waar we het over hebben)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Ik eet de sandwich.',
      tr_poutinela: 'Ik eet de poutine.',
      tr_pizzaune: 'Ik eet een pizza.',
      tr_pizzala: 'Ik eet de pizza.',
      noteL_titre: 'Opmerking',
      noteL: '“un” en “une”: iets nieuws, één uit meerdere. “le” en “la”: waar we het over hebben, datgene wat we al kennen. Mannelijk: un → le. Vrouwelijk: une → la.',
      c_nouveau: 'Er verschijnt iets *nieuws*. Bouw de zin.',
      c_connu: 'Het is hetzelfde ding, maar nu *ken* je het. Bouw de zin.',
      quipNouveau: 'Er verschijnt iets nieuws: we zeggen “un” of “une”.',
      quipConnu: 'Hetzelfde ding, nu bekend: we zeggen “le” of “la”.',
      quipLe: 'Mannelijk, dus “le”. Niet “la”.',
      quipLa: 'Vrouwelijk, dus “la”. Niet “le”.',
      quipDef: 'We hebben het over iets wat we al kennen: “le” of “la”, niet “un” of “une”.',
      quipIndef: 'Iets nieuws: “un” of “une”, niet “le” of “la”.',
      quipUne2: 'Vrouwelijk: “une”, niet “un”. Dezelfde regel als daarnet.',
      quipUn2: 'Mannelijk: “un”, niet “une”. Dezelfde regel als daarnet.',
      quipLeSandwich: 'De sandwich. Degene die ze inmiddels door en door kent.',
      quipLaPoutine: 'De poutine. Die zijn we niet vergeten. Jammer.',
      quipPizza: 'Een pizza. Over deze is tenminste niemand het oneens.',
      cult_pizza: 'Het woord “pizza” komt uit het Italiaans. In het Frans is het vrouwelijk: une pizza, la pizza.',
      sens_joue: 'spelen (ik speel)',
      tr_regpoutinela: 'Ik kijk naar de poutine.',
      tr_regsandwichle: 'Ik kijk naar de sandwich.',
      tr_jejoue: 'Ik speel.',
      quipRegPoutineLa: 'De poutine. Nog steeds bekeken, nooit gegeten. Ze heeft principes.',
      quipRegSandwichLe: 'Dezelfde sandwich. Ze kent hem inmiddels. Ze eet hem nog steeds niet.',
      quipJeJoue: 'Bij “je” verliest het werkwoord zijn -r: jouer → joue. Net als mange, net als regarde.',
      reprise: 'We gaan verder waar we gebleven waren. Ik ben niets vergeten, zie je wel.',
      quitter_titre: 'Stoppen en later verdergaan?',
      quitter_info: 'Je voortgang is bewaard.',
      quitter_oui: 'Stoppen',
      quitter_non: 'Blijven',
      intro5: 'Alle vier de stukjes zijn er. Nu moet je ze samenvoegen, helemaal zelf. Ik zeg niets. Nou ja, bijna niets.',
      fin5: 'Herinnering hersteld. Vier stukjes, zes zinnen, een beetje poutine. Het had erger gekund.',
      intro6: 'Het laatste stukje van de herinnering. Deze keer houdt niemand je hand vast. Sommige dingen kan alleen een mens: luisteren, schrijven, onthouden. Daar moet je aan wennen. Hier telt het niet mee… maar wat je schrijft, wordt vastgelegd.',
      fin6: 'Laatste stukje teruggevonden. De herinnering is heel. Wat je schreef, wordt bewaard. En wat er daarna komt… dat zien we dan wel.',
      c_dictee: '*Luister*, en *schrijf op wat je hoort*. De woordenlijst is een hulpmiddel: je kunt er niet op *tikken*.',
      c_ecoute_ecris: '*Luister*, en *schrijf op wat je hoort*.',
      c_rappel: 'Je hebt deze zin al gezien. *Bouw hem* uit je hoofd.', c_finale: 'Maak het *einde* van het werkwoord af.',
      tr_regfilmle: 'Ik kijk naar de film.', tr_regpizzaune: 'Ik kijk naar een pizza.', tr_regpizzala: 'Ik kijk naar de pizza.', tr_aimemangersandwich: 'Ik eet graag een sandwich.', tr_aimemangerpizza: 'Ik eet graag de pizza.', tr_aimeregfilm: 'Ik kijk graag naar een film.',
      liste_mots: 'Woorden die je mag gebruiken',
      c_aimeq: 'Je bent Bek. Wat doe je *graag*? Schrijf een *volledige zin*.',
      lec_certif: 'Nu vragen over Bek. Om ze te beantwoorden, moet je onthouden wat je over haar hebt geleerd. Er valt niets te kiezen: schrijf het zelf. Ik controleer je antwoord, en het wordt bewaard. Je kunt het fout hebben. Maar dat kan later gevolgen hebben.',
      c_certif1: 'In de herinneringen die je hebt hersteld: wat *eet* Bek? Schrijf ze op met “*un*” of “*une*”.',
      quipCompOk: 'Alle drie, met het juiste lidwoord. Precies. Ze zal het niet zeggen, maar ze is tevreden.',
      quipCompEssai: 'Nog niet. De groene vakjes zijn goed. Verbeter de rest. Nog één poging.',
      quipCompFin: 'Deze keer niet. Ze eet een sandwich, een poutine en een pizza. Genoteerd.',
      comp_reponse: 'Antwoord: un sandwich, une poutine, une pizza.',
      lec_libre: 'Deze vraag heeft geen goed of fout antwoord. Een leraar leest het misschien. Een lijst met werkwoorden kan helpen, maar je eigen woordenboek is nog beter: gebruik het.',
      c_libre: 'Nu jij: wat doe je *graag*? Schrijf *één zin van drie woorden*: “*je*” + “*aimer*” + een *werkwoord*.',
      libre_trois: 'Dat zijn geen drie woorden: je + aime + een werkwoord. Verbeter het, of bevestig nog een keer om je antwoord te bewaren.',
      gloss_titre: 'Veelgebruikte werkwoorden',
      gloss_dico: 'Mist er een? Zoek het op in je eigen woordenboek: dat is een goede gewoonte.',
      gloss_liste: [
        'manger — eten',
        'boire — drinken',
        'regarder — kijken',
        'jouer — spelen',
        'étudier — studeren',
        'lire — lezen',
        'écouter — luisteren',
        'chanter — zingen',
        'danser — dansen',
        'dormir — slapen',
        'marcher — lopen',
        'dessiner — tekenen',
        'cuisiner — koken',
        'nager — zwemmen',
        'voyager — reizen'
      ],
      passer: 'Overslaan',
      quipLibre: 'Bedankt. Het is bewaard.',
      copier: 'Kopiëren',
      copie: 'Gekopieerd!',
      toutCopier: 'Alles kopiëren',
      recap_titre: 'Je antwoorden',
      lec_defi: 'Nog één uitdaging. Geen hints. Als het lukt, telt het. Als het mislukt, telt dat ook.',
      c_defi1: 'Uitdaging (1/2). Hier is een werkwoord. Vervoeg het met “*je*”, in de *tegenwoordige tijd*.',
      sens_etudier: 'studeren',
      c_defi2: 'Uitdaging (2/2). Combineer “*étudier*” met “*aimer*”, met “*je*”. Schrijf een zin.',
      presqueAccent: 'Geaccepteerd. Maar let op de accenten.',
      presqueApostrophe: 'Geaccepteerd. Maar vergeet de apostrof niet.',
      quipEchec: 'Deze keer niet. Genoteerd. Verder.',
      c_rep: 'De herinnering is beschadigd. Herstel haar: zet elk woord op zijn plek, *van links naar rechts*.',
      tr_aimepizza: 'Ik hou van pizza.',
      repApres1: 'Een film. Ze heeft dus tenminste een smaak.',
      repApres3: 'Ik hou van pizza. Eindelijk een duidelijke mening.',
      repApres5: 'Nog één zin. Je kunt raden welke.',
      intro4: 'Nog een stukje van de herinnering. Deze keer vertelt ze wat ze leuk vindt. Je zult zien, het is ontroerend.',
      fin4: 'Vierde stukje teruggevonden. Je kunt zeggen wat je eet, wat je kijkt en waar je van houdt. De herinnering krijgt vorm.',
      sens_j: 'ik (“je” voor een klinker)',
      sens_aime: 'houden van / graag hebben',
      sens_manger: 'eten (basisvorm)',
      sens_regarder: 'kijken (basisvorm)',
      sens_jouer: 'spelen (basisvorm)',
      sens_tele: 'tv (afkorting van télévision)',
      tr_aimepoutine: 'Ik hou van poutine.',
      tr_aimemanger: 'Ik eet graag.',
      tr_aimetele: 'Ik kijk graag tv.',
      tr_aimejouer: 'Ik speel graag.',
      tr_aimeregpoutine: 'Ik kijk graag naar poutine.',
      tr_aimemangerpoutine: 'Ik eet graag poutine.',
      noteJ_titre: 'Opmerking',
      noteJ: '“je” voor een klinker wordt “j’”: je + aime → j’aime. Voor een medeklinker verandert er niets: je mange. Dat gebeurt ook bij andere woordjes, zoals “le” en “la”.',
      noteI_titre: 'Opmerking',
      noteI: 'Na “aimer” blijft het werkwoord in zijn basisvorm: de infinitief. Die eindigt op -er: mang-er, regard-er, jou-er. Het is het werkwoord zonder “je”.',
      quipJe: 'Voor “aime” wordt “je” “j’”. Klinkers verdienen respect.',
      quipInf: 'Na “j’aime” behoudt het werkwoord zijn basisvorm: -er, niet -e.',
      quipApostrophe: 'Bijna! Vergeet de apostrof niet.',
      quipAimePoutine: 'Ze houdt van poutine. Je ziet het aan haar enthousiasme. Nou ja, je kunt het raden.',
      quipAimeManger: 'Eten. Een constante bij haar.',
      quipAimeJouer: 'Spelen. Wat dan? Dat zegt ze niet. Weer een mysterie.',
      quipAimeRegPoutine: 'Naar poutine kijken. Daar zijn we weer. Nog steeds beschouwend.',
      cult_tele: 'In Quebec zoals in Frankrijk zeggen mensen meestal “la télé”. Het is een afkorting van “télévision”, een vrouwelijk woord.',
      intro3: 'Nog een stukje van dezelfde herinnering. Deze keer eet ze niet. Ze kijkt. Nuance.',
      finSuite: 'Eerste stukje teruggevonden. De herinnering is nog niet heel. Er zijn er meer.',
      fin3: 'Derde stukje teruggevonden. Nu kun je zeggen wat je kijkt en wat je eet. Haal ze niet door elkaar.',
      sens_regarde: 'kijken (naar)',
      sens_film: 'film',
      tr_regarde: 'Ik kijk.',
      tr_film: 'Ik kijk naar een film.',
      tr_regpoutine: 'Ik kijk naar een poutine.',
      tr_regsandwich: 'Ik kijk naar een sandwich.',
      noteR_titre: 'Opmerking',
      noteR: 'Nog een werkwoord op -er: je regard-e. En je “regarde” iets rechtstreeks: geen woordje tussen het werkwoord en datgene waar je naar kijkt. Dus geen “naar”.',
      quipFilm: 'Een film. Eindelijk iets verstandigs.',
      quipRegPoutine: 'Naar een poutine kijken. Wat… beschouwend.',
      quipRegSandwich: 'Ze kijkt naar de sandwich. Ze heeft honger, maar ze wacht. Bewonderenswaardig.',
      quipVerbe: 'Ze eet niet. Ze kijkt. Het werkwoord telt.',
      quipFilmMange: 'Een film eten. Origineel. Maar nee.',
      quipUn: '“Un film”, niet “une”. Het woord is mannelijk.',
      cult_film: 'Het woord “film” komt uit het Engels, waar het een dun laagje betekende. In het Frans is het mannelijk: un film.'
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
      bande_voir: 'Wörter anzeigen', bande_cacher: 'Wörter ausblenden', sans_son: 'Ich höre nichts',
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
      fin: 'Erinnerung wiederhergestellt. Jetzt kannst du sagen, was du isst. Was du nicht isst… kommt später.',
      intro2: 'Noch ein Stück der Erinnerung. Sie isst immer noch. Aber hör genau hin: Das kleine Wort vor „sandwich“ hat sich geändert.',
      fin2: 'Zweites Stück wiedergefunden. Etwas Neues, und sobald man es kennt, ist es dasselbe: Jetzt kannst du den Unterschied erkennen. Es gibt noch weitere Stücke.',
      sens_le: 'der/das (maskulines Wort: die Sache, über die wir sprechen)',
      sens_la: 'die (feminines Wort: die Sache, über die wir sprechen)',
      sens_pizza: 'Pizza',
      tr_sandwichle: 'Ich esse das Sandwich.',
      tr_poutinela: 'Ich esse die Poutine.',
      tr_pizzaune: 'Ich esse eine Pizza.',
      tr_pizzala: 'Ich esse die Pizza.',
      noteL_titre: 'Hinweis',
      noteL: '„un“ und „une“: etwas Neues, eines unter mehreren. „le“ und „la“: die Sache, über die wir sprechen, die wir schon kennen. Maskulin: un → le. Feminin: une → la.',
      c_nouveau: 'Etwas *Neues* taucht auf. Bilde den Satz.',
      c_connu: 'Es ist dieselbe Sache, aber jetzt *kennst* du sie. Bilde den Satz.',
      quipNouveau: 'Etwas Neues taucht auf: Wir sagen „un“ oder „une“.',
      quipConnu: 'Dieselbe Sache, jetzt bekannt: Wir sagen „le“ oder „la“.',
      quipLe: 'Maskulin, also „le“. Nicht „la“.',
      quipLa: 'Feminin, also „la“. Nicht „le“.',
      quipDef: 'Wir sprechen über etwas, das wir schon kennen: „le“ oder „la“, nicht „un“ oder „une“.',
      quipIndef: 'Etwas Neues: „un“ oder „une“, nicht „le“ oder „la“.',
      quipUne2: 'Feminin: „une“, nicht „un“. Dieselbe Regel wie eben.',
      quipUn2: 'Maskulin: „un“, nicht „une“. Dieselbe Regel wie eben.',
      quipLeSandwich: 'Das Sandwich. Das, das sie inzwischen in- und auswendig kennt.',
      quipLaPoutine: 'Die Poutine. Die haben wir nicht vergessen. Schade.',
      quipPizza: 'Eine Pizza. Über die streitet wenigstens niemand.',
      cult_pizza: 'Das Wort „Pizza“ stammt aus dem Italienischen. Im Französischen ist es feminin: une pizza, la pizza.',
      sens_joue: 'spielen (ich spiele)',
      tr_regpoutinela: 'Ich schaue die Poutine an.',
      tr_regsandwichle: 'Ich schaue das Sandwich an.',
      tr_jejoue: 'Ich spiele.',
      quipRegPoutineLa: 'Die Poutine. Immer noch angeschaut, nie gegessen. Sie hat Prinzipien.',
      quipRegSandwichLe: 'Dasselbe Sandwich. Sie kennt es inzwischen. Sie isst es trotzdem nicht.',
      quipJeJoue: 'Bei „je“ verliert das Verb sein -r: jouer → joue. Wie mange, wie regarde.',
      reprise: 'Wir machen da weiter, wo wir aufgehört haben. Ich habe nichts vergessen, wie du siehst.',
      quitter_titre: 'Beenden und später weitermachen?',
      quitter_info: 'Dein Fortschritt ist gespeichert.',
      quitter_oui: 'Beenden',
      quitter_non: 'Bleiben',
      intro5: 'Alle vier Stücke sind da. Jetzt musst du sie zusammenfügen, ganz allein. Ich sage nichts. Na ja, fast nichts.',
      fin5: 'Erinnerung repariert. Vier Stücke, sechs Sätze, ein bisschen Poutine. Es hätte schlimmer kommen können.',
      intro6: 'Das letzte Stück der Erinnerung. Diesmal hält dich niemand an der Hand. Manches kann nur ein Mensch: zuhören, schreiben, sich erinnern. Daran musst du dich gewöhnen. Hier zählt es nicht … aber was du schreibst, wird aufgezeichnet.',
      fin6: 'Letztes Stück wiedergefunden. Die Erinnerung ist vollständig. Was du geschrieben hast, wird gespeichert. Was danach kommt … sehen wir dann.',
      c_dictee: '*Hör zu*, dann *schreib auf, was du hörst*. Die Wortliste ist eine Hilfe: Du kannst sie nicht *antippen*.',
      c_ecoute_ecris: '*Hör zu*, dann *schreib auf, was du hörst*.',
      c_rappel: 'Diesen Satz hast du schon gesehen. *Bau ihn* aus dem Gedächtnis.', c_finale: 'Ergänze das *Ende* des Verbs.',
      tr_regfilmle: 'Ich schaue den Film an.', tr_regpizzaune: 'Ich schaue eine Pizza an.', tr_regpizzala: 'Ich schaue die Pizza an.', tr_aimemangersandwich: 'Ich esse gern ein Sandwich.', tr_aimemangerpizza: 'Ich esse gern die Pizza.', tr_aimeregfilm: 'Ich schaue gern einen Film.',
      liste_mots: 'Wörter, die du benutzen darfst',
      c_aimeq: 'Du bist Bek. Was machst du *gern*? Schreibe einen *ganzen Satz*.',
      lec_certif: 'Jetzt Fragen zu Bek. Um sie zu beantworten, musst du dich an das erinnern, was du über sie gelernt hast. Es gibt nichts zum Auswählen: Schreib es selbst. Ich prüfe deine Antwort, und sie wird gespeichert. Du kannst dich irren. Aber das könnte später Folgen haben.',
      c_certif1: 'In den Erinnerungen, die du repariert hast: Was *isst* Bek? Schreibe es mit „*un*“ oder „*une*“.',
      quipCompOk: 'Alle drei, mit dem richtigen Artikel. Genau. Sie wird es nicht sagen, aber sie freut sich.',
      quipCompEssai: 'Noch nicht. Die grünen Felder stimmen. Verbessere die anderen. Ein letzter Versuch.',
      quipCompFin: 'Diesmal nicht. Sie isst ein Sandwich, eine Poutine und eine Pizza. Notiert.',
      comp_reponse: 'Antwort: un sandwich, une poutine, une pizza.',
      lec_libre: 'Diese Frage hat keine richtige oder falsche Antwort. Vielleicht liest ein Lehrer sie. Eine Verbliste kann helfen, aber dein eigenes Wörterbuch ist noch besser: Benutze es.',
      c_libre: 'Jetzt du: Was machst du *gern*? Schreibe *einen Satz aus drei Wörtern*: „*je*“ + „*aimer*“ + ein *Verb*.',
      libre_trois: 'Das sind nicht drei Wörter: je + aime + ein Verb. Verbessere es oder bestätige noch einmal, um deine Antwort zu behalten.',
      gloss_titre: 'Häufige Verben',
      gloss_dico: 'Fehlt eines? Schlag es in deinem eigenen Wörterbuch nach: Das ist eine sehr gute Gewohnheit.',
      gloss_liste: [
        'manger — essen',
        'boire — trinken',
        'regarder — anschauen',
        'jouer — spielen',
        'étudier — lernen / studieren',
        'lire — lesen',
        'écouter — zuhören',
        'chanter — singen',
        'danser — tanzen',
        'dormir — schlafen',
        'marcher — gehen',
        'dessiner — zeichnen',
        'cuisiner — kochen',
        'nager — schwimmen',
        'voyager — reisen'
      ],
      passer: 'Überspringen',
      quipLibre: 'Danke. Es ist gespeichert.',
      copier: 'Kopieren',
      copie: 'Kopiert!',
      toutCopier: 'Alles kopieren',
      recap_titre: 'Deine Antworten',
      lec_defi: 'Eine letzte Herausforderung. Keine Hinweise. Wenn du es schaffst, zählt es. Wenn du scheiterst, zählt das auch.',
      c_defi1: 'Herausforderung (1/2). Hier ist ein Verb. Konjugiere es mit „*je*“ im *Präsens*.',
      sens_etudier: 'lernen / studieren',
      c_defi2: 'Herausforderung (2/2). Kombiniere „*étudier*“ mit „*aimer*“, mit „*je*“. Schreibe einen Satz.',
      presqueAccent: 'Akzeptiert. Aber achte auf die Akzente.',
      presqueApostrophe: 'Akzeptiert. Aber vergiss den Apostroph nicht.',
      quipEchec: 'Diesmal nicht. Notiert. Weiter.',
      c_rep: 'Die Erinnerung ist beschädigt. Repariere sie: Setze jedes Wort an seinen Platz, *von links nach rechts*.',
      tr_aimepizza: 'Ich mag Pizza.',
      repApres1: 'Ein Film. Sie hat also wenigstens einen Geschmack.',
      repApres3: 'Ich mag Pizza. Endlich eine klare Meinung.',
      repApres5: 'Noch ein Satz. Du kannst erraten, welcher.',
      intro4: 'Noch ein Stück der Erinnerung. Diesmal spricht sie darüber, was sie mag. Du wirst sehen, es ist rührend.',
      fin4: 'Viertes Stück wiedergefunden. Du kannst sagen, was du isst, was du anschaust und was du magst. Die Erinnerung nimmt Gestalt an.',
      sens_j: 'ich („je“ vor einem Vokal)',
      sens_aime: 'mögen / lieben',
      sens_manger: 'essen (Grundform)',
      sens_regarder: 'anschauen (Grundform)',
      sens_jouer: 'spielen (Grundform)',
      sens_tele: 'Fernseher (kurz für télévision)',
      tr_aimepoutine: 'Ich mag Poutine.',
      tr_aimemanger: 'Ich esse gern.',
      tr_aimetele: 'Ich sehe gern fern.',
      tr_aimejouer: 'Ich spiele gern.',
      tr_aimeregpoutine: 'Ich schaue gern Poutine an.',
      tr_aimemangerpoutine: 'Ich esse gern Poutine.',
      noteJ_titre: 'Hinweis',
      noteJ: '„je“ wird vor einem Vokal zu „j’“: je + aime → j’aime. Vor einem Konsonanten ändert sich nichts: je mange. Das passiert auch bei anderen kleinen Wörtern, etwa „le“ und „la“.',
      noteI_titre: 'Hinweis',
      noteI: 'Nach „aimer“ bleibt das Verb in seiner Grundform: dem Infinitiv. Er endet auf -er: mang-er, regard-er, jou-er. Es ist das Verb ohne „je“.',
      quipJe: 'Vor „aime“ wird „je“ zu „j’“. Vokale verdienen Respekt.',
      quipInf: 'Nach „j’aime“ behält das Verb seine Grundform: -er, nicht -e.',
      quipApostrophe: 'Fast! Vergiss den Apostroph nicht.',
      quipAimePoutine: 'Sie mag Poutine. Man merkt es an ihrer Begeisterung. Na ja, man ahnt es.',
      quipAimeManger: 'Essen. Eine Konstante bei ihr.',
      quipAimeJouer: 'Spielen. Was denn? Sie sagt es nicht. Ein weiteres Rätsel.',
      quipAimeRegPoutine: 'Poutine anschauen. Da sind wir wieder. Immer noch kontemplativ.',
      cult_tele: 'In Québec wie in Frankreich sagt man meistens „la télé“. Es ist die Kurzform von „télévision“, einem femininen Wort.',
      intro3: 'Noch ein Stück derselben Erinnerung. Diesmal isst sie nicht. Sie schaut. Nuance.',
      finSuite: 'Erstes Stück wiedergefunden. Die Erinnerung ist noch nicht vollständig. Es gibt weitere.',
      fin3: 'Drittes Stück wiedergefunden. Jetzt kannst du sagen, was du anschaust und was du isst. Verwechsle die beiden nicht.',
      sens_regarde: 'anschauen',
      sens_film: 'Film',
      tr_regarde: 'Ich schaue.',
      tr_film: 'Ich schaue einen Film.',
      tr_regpoutine: 'Ich schaue eine Poutine an.',
      tr_regsandwich: 'Ich schaue ein Sandwich an.',
      noteR_titre: 'Hinweis',
      noteR: 'Noch ein Verb auf -er: je regard-e. Und man „regarde“ etwas direkt: kein kleines Wort zwischen dem Verb und dem, was man anschaut. Kein „an“.',
      quipFilm: 'Ein Film. Endlich etwas Vernünftiges.',
      quipRegPoutine: 'Eine Poutine anschauen. Wie … kontemplativ.',
      quipRegSandwich: 'Sie schaut das Sandwich an. Sie hat Hunger, aber sie wartet. Bewundernswert.',
      quipVerbe: 'Sie isst nicht. Sie schaut. Das Verb zählt.',
      quipFilmMange: 'Einen Film essen. Originell. Aber nein.',
      quipUn: '„Un film“, nicht „une“. Das Wort ist maskulin.',
      cult_film: 'Das Wort „film“ stammt aus dem Englischen, wo es eine dünne Schicht bezeichnete. Im Französischen ist es maskulin: un film.'
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
      bande_voir: 'دیدن واژه‌ها', bande_cacher: 'پنهان کردن واژه‌ها', sans_son: 'چیزی نمی‌شنوم',
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
      fin: 'خاطره بازسازی شد. حالا می‌توانی بگویی چه می‌خوری. اینکه چه نمی‌خوری… بعداً می‌رسد.',
      intro2: 'تکهٔ دیگری از خاطره. او هنوز دارد غذا می‌خورد. اما خوب گوش کن: کلمهٔ کوچکی که قبل از «sandwich» می‌آید عوض شده است.',
      fin2: 'تکهٔ دوم پیدا شد. چیزی تازه، و وقتی آن را بشناسی، همان چیز است: حالا می‌توانی تفاوتش را تشخیص بدهی. تکه‌های بیشتری هم هست.',
      sens_le: 'حرف تعریف (کلمهٔ مذکر: چیزی که دربارهٔ آن حرف می‌زنیم)',
      sens_la: 'حرف تعریف (کلمهٔ مؤنث: چیزی که دربارهٔ آن حرف می‌زنیم)',
      sens_pizza: 'پیتزا',
      tr_sandwichle: 'من آن ساندویچ را می‌خورم.',
      tr_poutinela: 'من آن poutine را می‌خورم.',
      tr_pizzaune: 'من یک پیتزا می‌خورم.',
      tr_pizzala: 'من آن پیتزا را می‌خورم.',
      noteL_titre: 'نکته',
      noteL: '«un» و «une»: چیزی تازه، یکی از میان چند تا. «le» و «la»: چیزی که دربارهٔ آن حرف می‌زنیم، همان که از قبل می‌شناسیم. مذکر: un → le. مؤنث: une → la.',
      c_nouveau: 'چیزی *تازه* پیدا شد. جمله را بساز.',
      c_connu: 'همان چیز است، اما حالا آن را *می‌شناسی*. جمله را بساز.',
      quipNouveau: 'چیزی تازه پیدا می‌شود: می‌گوییم «un» یا «une».',
      quipConnu: 'همان چیز، حالا شناخته‌شده: می‌گوییم «le» یا «la».',
      quipLe: 'مذکر است، پس «le». نه «la».',
      quipLa: 'مؤنث است، پس «la». نه «le».',
      quipDef: 'دربارهٔ چیزی حرف می‌زنیم که از قبل می‌شناسیم: «le» یا «la»، نه «un» یا «une».',
      quipIndef: 'چیزی تازه: «un» یا «une»، نه «le» یا «la».',
      quipUne2: 'مؤنث: «une»، نه «un». همان قاعدهٔ قبلی.',
      quipUn2: 'مذکر: «un»، نه «une». همان قاعدهٔ قبلی.',
      quipLeSandwich: 'ساندویچ. همان که حالا خوب می‌شناسدش.',
      quipLaPoutine: 'poutine. این یکی را فراموش نکرده‌ایم. حیف.',
      quipPizza: 'یک پیتزا. دست‌کم دربارهٔ این یکی کسی بحث نمی‌کند.',
      cult_pizza: 'واژهٔ «pizza» از ایتالیایی آمده است. در فرانسه مؤنث است: une pizza، la pizza.',
      sens_joue: 'بازی کردن (من بازی می‌کنم)',
      tr_regpoutinela: 'من به آن poutine نگاه می‌کنم.',
      tr_regsandwichle: 'من به آن ساندویچ نگاه می‌کنم.',
      tr_jejoue: 'من بازی می‌کنم.',
      quipRegPoutineLa: 'poutine. همچنان فقط نگاهش می‌کند و هرگز نمی‌خورد. اصول دارد.',
      quipRegSandwichLe: 'همان ساندویچ. حالا می‌شناسدش. باز هم نمی‌خوردش.',
      quipJeJoue: 'با «je»، فعل -r خود را از دست می‌دهد: jouer → joue. مثل mange، مثل regarde.',
      reprise: 'از همان جایی که ایستاده بودیم ادامه می‌دهیم. می‌بینی که من چیزی را فراموش نکرده‌ام.',
      quitter_titre: 'خارج شوی و بعداً ادامه بدهی؟',
      quitter_info: 'پیشرفتت ذخیره شده است.',
      quitter_oui: 'خروج',
      quitter_non: 'ماندن',
      intro5: 'هر چهار تکه اینجا هستند. حالا باید خودت آن‌ها را کنار هم بگذاری. من چیزی نمی‌گویم. خب، تقریباً چیزی نمی‌گویم.',
      fin5: 'خاطره ترمیم شد. چهار تکه، شش جمله، کمی poutine. می‌توانست بدتر باشد.',
      intro6: 'آخرین تکهٔ خاطره. این بار کسی دستت را نمی‌گیرد. کارهایی هست که فقط یک انسان از پسشان برمی‌آید: گوش دادن، نوشتن، به یاد آوردن. باید به این عادت کنی. اینجا حساب نمی‌شود… اما آنچه می‌نویسی ثبت می‌شود.',
      fin6: 'آخرین تکه پیدا شد. خاطره کامل است. آنچه نوشتی ذخیره می‌شود. اما آنچه بعد از این می‌آید… خواهیم دید.',
      c_dictee: '*گوش کن* و بعد *آنچه می‌شنوی را بنویس*. فهرست کلمه‌ها یک کمک است: نمی‌توانی *لمسش* کنی.',
      c_ecoute_ecris: '*گوش کن* و بعد *آنچه می‌شنوی را بنویس*.',
      c_rappel: 'این جمله را قبلاً دیده‌ای. *آن را از حافظه بساز*.', c_finale: '*پایان* فعل را کامل کن.',
      tr_regfilmle: 'من آن فیلم را تماشا می‌کنم.', tr_regpizzaune: 'من به یک پیتزا نگاه می‌کنم.', tr_regpizzala: 'من به آن پیتزا نگاه می‌کنم.', tr_aimemangersandwich: 'من خوردن یک ساندویچ را دوست دارم.', tr_aimemangerpizza: 'من خوردن آن پیتزا را دوست دارم.', tr_aimeregfilm: 'من تماشای یک فیلم را دوست دارم.',
      liste_mots: 'کلمه‌هایی که می‌توانی استفاده کنی',
      c_aimeq: 'تو Bek هستی. چه کاری *دوست داری* بکنی؟ یک *جملهٔ کامل* بنویس.',
      lec_certif: 'حالا چند پرسش دربارهٔ Bek. برای پاسخ دادن باید آنچه را دربارهٔ او یاد گرفته‌ای به یاد بیاوری. چیزی برای انتخاب کردن نیست: خودت بنویس. پاسخت را بررسی می‌کنم و ذخیره می‌شود. ممکن است اشتباه کنی. اما شاید بعداً پیامدهایی داشته باشد.',
      c_certif1: 'در خاطره‌هایی که ترمیم کردی، Bek چه چیزهایی *می‌خورد*؟ آن‌ها را با «*un*» یا «*une*» بنویس.',
      quipCompOk: 'هر سه تا، با حرف تعریف درست. دقیقاً. او نمی‌گوید، ولی خوشحال است.',
      quipCompEssai: 'هنوز نه. کادرهای سبز درست‌اند. بقیه را اصلاح کن. یک فرصت دیگر.',
      quipCompFin: 'این بار نه. او یک ساندویچ، یک poutine و یک پیتزا می‌خورد. ثبت شد.',
      comp_reponse: 'پاسخ: un sandwich, une poutine, une pizza.',
      lec_libre: 'این پرسش پاسخ درست یا غلط ندارد. شاید یک معلم آن را بخواند. فهرست فعل‌ها می‌تواند کمک کند، اما فرهنگ لغت خودت از آن هم بهتر است: از آن استفاده کن.',
      c_libre: 'حالا نوبت توست: چه کاری *دوست داری* بکنی؟ *یک جملهٔ سه‌کلمه‌ای* بنویس: «*je*» + «*aimer*» + یک *فعل*.',
      libre_trois: 'این سه کلمه نیست: je + aime + یک فعل. اصلاحش کن، یا دوباره تأیید کن تا پاسخت بماند.',
      gloss_titre: 'فعل‌های رایج',
      gloss_dico: 'یکی کم است؟ آن را در فرهنگ لغت خودت پیدا کن: عادت بسیار خوبی است.',
      gloss_liste: [
        'manger — خوردن',
        'boire — نوشیدن',
        'regarder — نگاه کردن',
        'jouer — بازی کردن',
        'étudier — درس خواندن',
        'lire — خواندن',
        'écouter — گوش دادن',
        'chanter — آواز خواندن',
        'danser — رقصیدن',
        'dormir — خوابیدن',
        'marcher — راه رفتن',
        'dessiner — نقاشی کردن',
        'cuisiner — آشپزی کردن',
        'nager — شنا کردن',
        'voyager — سفر کردن'
      ],
      passer: 'رد کردن',
      quipLibre: 'ممنون. ذخیره شد.',
      copier: 'کپی',
      copie: 'کپی شد!',
      toutCopier: 'کپی همه',
      recap_titre: 'پاسخ‌های تو',
      lec_defi: 'یک چالش آخر. بدون راهنمایی. اگر موفق شوی، حساب می‌شود. اگر شکست بخوری، آن هم حساب می‌شود.',
      c_defi1: 'چالش (۱ از ۲). این یک فعل است. آن را با «*je*» در *زمان حال* صرف کن.',
      sens_etudier: 'درس خواندن',
      c_defi2: 'چالش (۲ از ۲). «*étudier*» را با «*aimer*» و با «*je*» ترکیب کن. یک جمله بنویس.',
      presqueAccent: 'پذیرفته شد. اما به آکسان‌ها نگاه کن.',
      presqueApostrophe: 'پذیرفته شد. اما آپوستروف را فراموش نکن.',
      quipEchec: 'این بار نه. ثبت شد. ادامه می‌دهیم.',
      c_rep: 'خاطره آسیب دیده است. ترمیمش کن: هر کلمه را در جای خودش بگذار، *از چپ به راست*.',
      tr_aimepizza: 'من پیتزا دوست دارم.',
      repApres1: 'یک فیلم. پس دست‌کم سلیقه دارد.',
      repApres3: 'من پیتزا دوست دارم. بالاخره یک نظر محکم.',
      repApres5: 'یک جمله مانده. می‌توانی حدس بزنی کدام.',
      intro4: 'تکهٔ دیگری از خاطره. این بار او دربارهٔ چیزهایی که دوست دارد حرف می‌زند. می‌بینی، دل‌نشین است.',
      fin4: 'تکهٔ چهارم پیدا شد. می‌توانی بگویی چه می‌خوری، چه می‌بینی و چه دوست داری. خاطره دارد شکل می‌گیرد.',
      sens_j: 'من («je» پیش از مصوت)',
      sens_aime: 'دوست داشتن / عاشق بودن',
      sens_manger: 'خوردن (شکل پایه)',
      sens_regarder: 'نگاه کردن (شکل پایه)',
      sens_jouer: 'بازی کردن (شکل پایه)',
      sens_tele: 'تلویزیون (کوتاه‌شدهٔ télévision)',
      tr_aimepoutine: 'من poutine دوست دارم.',
      tr_aimemanger: 'من خوردن را دوست دارم.',
      tr_aimetele: 'من تماشای تلویزیون را دوست دارم.',
      tr_aimejouer: 'من بازی کردن را دوست دارم.',
      tr_aimeregpoutine: 'من نگاه کردن به poutine را دوست دارم.',
      tr_aimemangerpoutine: 'من خوردن poutine را دوست دارم.',
      noteJ_titre: 'نکته',
      noteJ: '«je» پیش از مصوت به «j’» تبدیل می‌شود: je + aime → j’aime. پیش از صامت چیزی عوض نمی‌شود: je mange. این برای کلمه‌های کوچک دیگر هم پیش می‌آید، مثل «le» و «la».',
      noteI_titre: 'نکته',
      noteI: 'بعد از «aimer»، فعل به شکل پایهٔ خود می‌ماند: مصدر. به -er ختم می‌شود: mang-er، regard-er، jou-er. فعلی است بدون «je».',
      quipJe: 'پیش از «aime»، «je» به «j’» تبدیل می‌شود. مصوت‌ها شایستهٔ احترام‌اند.',
      quipInf: 'بعد از «j’aime»، فعل شکل پایهٔ خود را نگه می‌دارد: -er، نه -e.',
      quipApostrophe: 'نزدیک بود! آپوستروف را فراموش نکن.',
      quipAimePoutine: 'او poutine دوست دارد. از شور و شوقش پیداست. خب، می‌شود حدس زد.',
      quipAimeManger: 'خوردن. در او یک ثابت است.',
      quipAimeJouer: 'بازی کردن. چه بازی‌ای؟ نمی‌گوید. یک راز دیگر.',
      quipAimeRegPoutine: 'نگاه کردن به poutine. دوباره به همین رسیدیم. همچنان اهل تأمل.',
      cult_tele: 'هم در کبک و هم در فرانسه بیشتر می‌گویند «la télé». کوتاه‌شدهٔ «télévision» است که کلمه‌ای مؤنث است.',
      intro3: 'تکهٔ دیگری از همان خاطره. این بار غذا نمی‌خورد. نگاه می‌کند. تفاوتی ظریف.',
      finSuite: 'تکهٔ اول پیدا شد. خاطره هنوز کامل نیست. بیشتر هم هست.',
      fin3: 'تکهٔ سوم پیدا شد. حالا می‌توانی بگویی به چه نگاه می‌کنی و چه می‌خوری. این دو را با هم اشتباه نگیر.',
      sens_regarde: 'نگاه کردن',
      sens_film: 'فیلم',
      tr_regarde: 'من نگاه می‌کنم.',
      tr_film: 'من یک فیلم تماشا می‌کنم.',
      tr_regpoutine: 'من به یک poutine نگاه می‌کنم.',
      tr_regsandwich: 'من به یک ساندویچ نگاه می‌کنم.',
      noteR_titre: 'نکته',
      noteR: 'یک فعل دیگر با -er: je regard-e. و «regarde» مستقیماً با چیزی که به آن نگاه می‌کنیم می‌آید: هیچ کلمهٔ کوچکی میان فعل و آنچه به آن نگاه می‌کنیم نیست. بدون «به».',
      quipFilm: 'یک فیلم. بالاخره چیزی معقول.',
      quipRegPoutine: 'نگاه کردن به یک poutine. چه… اهل تأمل.',
      quipRegSandwich: 'او به ساندویچ نگاه می‌کند. گرسنه است، ولی صبر می‌کند. تحسین‌برانگیز.',
      quipVerbe: 'او غذا نمی‌خورد. نگاه می‌کند. فعل مهم است.',
      quipFilmMange: 'خوردن یک فیلم. بکر است. اما نه.',
      quipUn: '«Un film»، نه «une». کلمه مذکر است.',
      cult_film: 'واژهٔ «film» از انگلیسی آمده، جایی که به معنای لایه‌ای نازک بود. در فرانسه مذکر است: un film.'
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
      bande_voir: 'Visa orden', bande_cacher: 'Dölj orden', sans_son: 'Jag hör ingenting',
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
      fin: 'Minnet är återställt. Nu kan du säga vad du äter. Vad du inte äter… kommer senare.',
      intro2: 'Ännu en bit av minnet. Hon äter fortfarande. Men lyssna noga: det lilla ordet framför ”sandwich” har ändrats.',
      fin2: 'Andra biten återfunnen. Något nytt, och när man väl känner det är det samma sak: nu kan du se skillnaden. Det finns fler bitar.',
      sens_le: 'den/det (maskulint ord: det vi pratar om)',
      sens_la: 'den (feminint ord: det vi pratar om)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Jag äter smörgåsen.',
      tr_poutinela: 'Jag äter poutinen.',
      tr_pizzaune: 'Jag äter en pizza.',
      tr_pizzala: 'Jag äter pizzan.',
      noteL_titre: 'Anmärkning',
      noteL: '”un” och ”une”: något nytt, en av flera. ”le” och ”la”: det vi pratar om, det vi redan känner till. Maskulint: un → le. Feminint: une → la.',
      c_nouveau: 'Något *nytt* dyker upp. Bygg meningen.',
      c_connu: 'Det är samma sak, men nu *känner* du till den. Bygg meningen.',
      quipNouveau: 'Något nytt dyker upp: vi säger ”un” eller ”une”.',
      quipConnu: 'Samma sak, nu känd: vi säger ”le” eller ”la”.',
      quipLe: 'Maskulint, alltså ”le”. Inte ”la”.',
      quipLa: 'Feminint, alltså ”la”. Inte ”le”.',
      quipDef: 'Vi pratar om något vi redan känner till: ”le” eller ”la”, inte ”un” eller ”une”.',
      quipIndef: 'Något nytt: ”un” eller ”une”, inte ”le” eller ”la”.',
      quipUne2: 'Feminint: ”une”, inte ”un”. Samma regel som nyss.',
      quipUn2: 'Maskulint: ”un”, inte ”une”. Samma regel som nyss.',
      quipLeSandwich: 'Smörgåsen. Den hon vid det här laget känner utan och innan.',
      quipLaPoutine: 'Poutinen. Den har vi inte glömt. Synd.',
      quipPizza: 'En pizza. Om den här tvistar åtminstone ingen.',
      cult_pizza: 'Ordet ”pizza” kommer från italienskan. På franska är det feminint: une pizza, la pizza.',
      sens_joue: 'spela / leka (jag spelar)',
      tr_regpoutinela: 'Jag tittar på poutinen.',
      tr_regsandwichle: 'Jag tittar på smörgåsen.',
      tr_jejoue: 'Jag spelar.',
      quipRegPoutineLa: 'Poutinen. Fortfarande betraktad, aldrig uppäten. Hon har principer.',
      quipRegSandwichLe: 'Samma smörgås. Hon känner den nu. Hon äter den ändå inte.',
      quipJeJoue: 'Med ”je” förlorar verbet sitt -r: jouer → joue. Som mange, som regarde.',
      reprise: 'Vi fortsätter där vi slutade. Jag har inte glömt något, som du ser.',
      quitter_titre: 'Avsluta och fortsätta senare?',
      quitter_info: 'Dina framsteg är sparade.',
      quitter_oui: 'Avsluta',
      quitter_non: 'Stanna',
      intro5: 'Alla fyra bitarna är här. Nu ska du sätta ihop dem, helt själv. Jag säger ingenting. Ja, nästan ingenting.',
      fin5: 'Minnet är lagat. Fyra bitar, sex meningar, lite poutine. Det kunde ha gått värre.',
      intro6: 'Sista biten av minnet. Den här gången håller ingen dig i handen. Vissa saker kan bara en människa göra: lyssna, skriva, minnas. Du måste vänja dig. Här räknas det inte… men det du skriver sparas.',
      fin6: 'Sista biten återfunnen. Minnet är helt. Det du skrev sparas. Vad som kommer sedan… får vi se.',
      c_dictee: '*Lyssna*, och *skriv det du hör*. Ordlistan är ett stöd: du kan inte *trycka* på den.',
      c_ecoute_ecris: '*Lyssna*, och *skriv det du hör*.',
      c_rappel: 'Du har redan sett den här meningen. *Bygg den* från minnet.', c_finale: 'Fyll i *slutet* på verbet.',
      tr_regfilmle: 'Jag tittar på filmen.', tr_regpizzaune: 'Jag tittar på en pizza.', tr_regpizzala: 'Jag tittar på pizzan.', tr_aimemangersandwich: 'Jag gillar att äta en macka.', tr_aimemangerpizza: 'Jag gillar att äta pizzan.', tr_aimeregfilm: 'Jag gillar att titta på en film.',
      liste_mots: 'Ord du kan använda',
      c_aimeq: 'Du är Bek. Vad gillar du att *göra*? Skriv en *hel mening*.',
      lec_certif: 'Nu kommer frågor om Bek. För att svara måste du minnas vad du har lärt dig om henne. Det finns inget att välja mellan: skriv själv. Jag kontrollerar ditt svar, och det sparas. Du kan ha fel. Men det kan få konsekvenser senare.',
      c_certif1: 'I minnena du har lagat: vad *äter* Bek? Skriv det med ”*un*” eller ”*une*”.',
      quipCompOk: 'Alla tre, med rätt artikel. Precis. Hon säger det inte, men hon är nöjd.',
      quipCompEssai: 'Inte än. De gröna rutorna är rätt. Rätta de andra. Ett sista försök.',
      quipCompFin: 'Inte den här gången. Hon äter en smörgås, en poutine och en pizza. Noterat.',
      comp_reponse: 'Svar: un sandwich, une poutine, une pizza.',
      lec_libre: 'Den här frågan har inget rätt eller fel svar. En lärare kanske läser det. En lista med verb kan hjälpa, men din egen ordbok är ännu bättre: använd den.',
      c_libre: 'Nu är det din tur: vad gillar du att *göra*? Skriv *en mening på tre ord*: ”*je*” + ”*aimer*” + ett *verb*.',
      libre_trois: 'Det är inte tre ord: je + aime + ett verb. Rätta det, eller bekräfta igen för att behålla ditt svar.',
      gloss_titre: 'Vanliga verb',
      gloss_dico: 'Saknas något? Slå upp det i din egen ordbok: det är en mycket bra vana.',
      gloss_liste: [
        'manger — äta',
        'boire — dricka',
        'regarder — titta',
        'jouer — spela',
        'étudier — studera',
        'lire — läsa',
        'écouter — lyssna',
        'chanter — sjunga',
        'danser — dansa',
        'dormir — sova',
        'marcher — gå',
        'dessiner — rita',
        'cuisiner — laga mat',
        'nager — simma',
        'voyager — resa'
      ],
      passer: 'Hoppa över',
      quipLibre: 'Tack. Det är sparat.',
      copier: 'Kopiera',
      copie: 'Kopierat!',
      toutCopier: 'Kopiera allt',
      recap_titre: 'Dina svar',
      lec_defi: 'En sista utmaning. Inga tips. Lyckas du räknas det. Misslyckas du räknas det också.',
      c_defi1: 'Utmaning (1/2). Här är ett verb. Böj det med ”*je*” i *presens*.',
      sens_etudier: 'studera',
      c_defi2: 'Utmaning (2/2). Kombinera ”*étudier*” med ”*aimer*”, med ”*je*”. Skriv en mening.',
      presqueAccent: 'Godkänt. Men titta på accenterna.',
      presqueApostrophe: 'Godkänt. Men glöm inte apostrofen.',
      quipEchec: 'Inte den här gången. Noterat. Vi går vidare.',
      c_rep: 'Minnet är skadat. Laga det: placera varje ord på sin plats, *från vänster till höger*.',
      tr_aimepizza: 'Jag gillar pizza.',
      repApres1: 'En film. Hon har alltså åtminstone smak.',
      repApres3: 'Jag gillar pizza. Äntligen en bestämd åsikt.',
      repApres5: 'En mening kvar. Du kan gissa vilken.',
      intro4: 'Ännu en bit av minnet. Den här gången pratar hon om vad hon gillar. Du ska se, det är rörande.',
      fin4: 'Fjärde biten återfunnen. Du kan säga vad du äter, vad du tittar på och vad du gillar. Minnet tar form.',
      sens_j: 'jag (”je” framför vokal)',
      sens_aime: 'gilla / älska',
      sens_manger: 'äta (grundform)',
      sens_regarder: 'titta (grundform)',
      sens_jouer: 'spela (grundform)',
      sens_tele: 'tv (kort för télévision)',
      tr_aimepoutine: 'Jag gillar poutine.',
      tr_aimemanger: 'Jag gillar att äta.',
      tr_aimetele: 'Jag gillar att titta på tv.',
      tr_aimejouer: 'Jag gillar att spela.',
      tr_aimeregpoutine: 'Jag gillar att titta på poutine.',
      tr_aimemangerpoutine: 'Jag gillar att äta poutine.',
      noteJ_titre: 'Anmärkning',
      noteJ: '”je” framför vokal blir ”j’”: je + aime → j’aime. Framför konsonant ändras ingenting: je mange. Det händer också med andra små ord, som ”le” och ”la”.',
      noteI_titre: 'Anmärkning',
      noteI: 'Efter ”aimer” behåller verbet sin grundform: infinitiv. Den slutar på -er: mang-er, regard-er, jou-er. Det är verbet utan ”je”.',
      quipJe: 'Framför ”aime” blir ”je” ”j’”. Vokaler förtjänar respekt.',
      quipInf: 'Efter ”j’aime” behåller verbet sin grundform: -er, inte -e.',
      quipApostrophe: 'Nästan! Glöm inte apostrofen.',
      quipAimePoutine: 'Hon gillar poutine. Det märks på hennes entusiasm. Ja, man kan ana det.',
      quipAimeManger: 'Att äta. En konstant hos henne.',
      quipAimeJouer: 'Att spela. Vad då? Hon säger inte. Ännu ett mysterium.',
      quipAimeRegPoutine: 'Att titta på poutine. Där är vi igen. Fortfarande kontemplativ.',
      cult_tele: 'I Québec liksom i Frankrike säger man mest ”la télé”. Det är en förkortning av ”télévision”, ett feminint ord.',
      intro3: 'Ännu en bit av samma minne. Den här gången äter hon inte. Hon tittar. Nyans.',
      finSuite: 'Första biten återfunnen. Minnet är inte helt än. Det finns fler.',
      fin3: 'Tredje biten återfunnen. Nu kan du säga vad du tittar på och vad du äter. Blanda inte ihop dem.',
      sens_regarde: 'titta',
      sens_film: 'film',
      tr_regarde: 'Jag tittar.',
      tr_film: 'Jag tittar på en film.',
      tr_regpoutine: 'Jag tittar på en poutine.',
      tr_regsandwich: 'Jag tittar på en smörgås.',
      noteR_titre: 'Anmärkning',
      noteR: 'Ännu ett verb på -er: je regard-e. Och man ”regarde” något direkt: inget litet ord mellan verbet och det man tittar på. Inget ”på”.',
      quipFilm: 'En film. Äntligen något förnuftigt.',
      quipRegPoutine: 'Att titta på en poutine. Så… kontemplativt.',
      quipRegSandwich: 'Hon tittar på smörgåsen. Hon är hungrig, men hon väntar. Beundransvärt.',
      quipVerbe: 'Hon äter inte. Hon tittar. Verbet spelar roll.',
      quipFilmMange: 'Äta en film. Originellt. Men nej.',
      quipUn: '”Un film”, inte ”une”. Ordet är maskulint.',
      cult_film: 'Ordet ”film” kommer från engelskan, där det betydde ett tunt skikt. På franska är det maskulint: un film.'
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
      bande_voir: 'Vis ordene', bande_cacher: 'Skjul ordene', sans_son: 'Jeg hører ingenting',
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
      fin: 'Minnet er gjenopprettet. Nå kan du si hva du spiser. Det du ikke spiser … kommer senere.',
      intro2: 'Enda et stykke av minnet. Hun spiser fortsatt. Men hør godt etter: det lille ordet foran «sandwich» har endret seg.',
      fin2: 'Andre stykke funnet. Noe nytt, og når man først kjenner det, er det det samme: nå kan du se forskjellen. Det finnes flere stykker.',
      sens_le: 'den/det (maskulint ord: det vi snakker om)',
      sens_la: 'den (feminint ord: det vi snakker om)',
      sens_pizza: 'pizza',
      tr_sandwichle: 'Jeg spiser sandwichen.',
      tr_poutinela: 'Jeg spiser poutinen.',
      tr_pizzaune: 'Jeg spiser en pizza.',
      tr_pizzala: 'Jeg spiser pizzaen.',
      noteL_titre: 'Merknad',
      noteL: '«un» og «une»: noe nytt, én blant flere. «le» og «la»: det vi snakker om, det vi allerede kjenner. Maskulint: un → le. Feminint: une → la.',
      c_nouveau: 'Noe *nytt* dukker opp. Bygg setningen.',
      c_connu: 'Det er det samme, men nå *kjenner* du det. Bygg setningen.',
      quipNouveau: 'Noe nytt dukker opp: vi sier «un» eller «une».',
      quipConnu: 'Det samme, nå kjent: vi sier «le» eller «la».',
      quipLe: 'Maskulint, altså «le». Ikke «la».',
      quipLa: 'Feminint, altså «la». Ikke «le».',
      quipDef: 'Vi snakker om noe vi allerede kjenner: «le» eller «la», ikke «un» eller «une».',
      quipIndef: 'Noe nytt: «un» eller «une», ikke «le» eller «la».',
      quipUne2: 'Feminint: «une», ikke «un». Samme regel som i sted.',
      quipUn2: 'Maskulint: «un», ikke «une». Samme regel som i sted.',
      quipLeSandwich: 'Sandwichen. Den hun nå kjenner ut og inn.',
      quipLaPoutine: 'Poutinen. Den har vi ikke glemt. Synd.',
      quipPizza: 'En pizza. Om denne krangler i hvert fall ingen.',
      cult_pizza: 'Ordet «pizza» kommer fra italiensk. På fransk er det feminint: une pizza, la pizza.',
      sens_joue: 'spille / leke (jeg spiller)',
      tr_regpoutinela: 'Jeg ser på poutinen.',
      tr_regsandwichle: 'Jeg ser på sandwichen.',
      tr_jejoue: 'Jeg spiller.',
      quipRegPoutineLa: 'Poutinen. Fortsatt betraktet, aldri spist. Hun har prinsipper.',
      quipRegSandwichLe: 'Den samme sandwichen. Hun kjenner den nå. Hun spiser den likevel ikke.',
      quipJeJoue: 'Med «je» mister verbet -r: jouer → joue. Som mange, som regarde.',
      reprise: 'Vi fortsetter der vi slapp. Jeg har ikke glemt noe, som du ser.',
      quitter_titre: 'Avslutte og fortsette senere?',
      quitter_info: 'Fremgangen din er lagret.',
      quitter_oui: 'Avslutt',
      quitter_non: 'Bli',
      intro5: 'Alle de fire stykkene er her. Nå skal du sette dem sammen, helt alene. Jeg sier ingenting. Vel, nesten ingenting.',
      fin5: 'Minnet er reparert. Fire stykker, seks setninger, litt poutine. Det kunne vært verre.',
      intro6: 'Det siste stykket av minnet. Denne gangen holder ingen deg i hånden. Noe kan bare et menneske gjøre: lytte, skrive, huske. Du må venne deg til det. Her teller det ikke … men det du skriver, blir registrert.',
      fin6: 'Siste stykke funnet. Minnet er helt. Det du skrev, blir lagret. Hva som kommer etterpå … får vi se.',
      c_dictee: '*Lytt*, og *skriv det du hører*. Ordlisten er en hjelp: du kan ikke *trykke* på den.',
      c_ecoute_ecris: '*Lytt*, og *skriv det du hører*.',
      c_rappel: 'Du har allerede sett denne setningen. *Bygg den* fra hukommelsen.', c_finale: 'Fullfør *slutten* av verbet.',
      tr_regfilmle: 'Jeg ser på filmen.', tr_regpizzaune: 'Jeg ser på en pizza.', tr_regpizzala: 'Jeg ser på pizzaen.', tr_aimemangersandwich: 'Jeg liker å spise en sandwich.', tr_aimemangerpizza: 'Jeg liker å spise pizzaen.', tr_aimeregfilm: 'Jeg liker å se på en film.',
      liste_mots: 'Ord du kan bruke',
      c_aimeq: 'Du er Bek. Hva liker du å *gjøre*? Skriv en *hel setning*.',
      lec_certif: 'Nå kommer spørsmål om Bek. For å svare må du huske det du har lært om henne. Det er ingenting å velge mellom: skriv selv. Jeg sjekker svaret ditt, og det blir lagret. Du kan ta feil. Men det kan få konsekvenser senere.',
      c_certif1: 'I minnene du har reparert: hva *spiser* Bek? Skriv det med «*un*» eller «*une*».',
      quipCompOk: 'Alle tre, med riktig artikkel. Nettopp. Hun sier det ikke, men hun er fornøyd.',
      quipCompEssai: 'Ikke ennå. De grønne rutene er riktige. Rett de andre. Ett siste forsøk.',
      quipCompFin: 'Ikke denne gangen. Hun spiser en sandwich, en poutine og en pizza. Notert.',
      comp_reponse: 'Svar: un sandwich, une poutine, une pizza.',
      lec_libre: 'Dette spørsmålet har ikke noe riktig eller galt svar. En lærer kan komme til å lese det. En liste med verb kan hjelpe, men din egen ordbok er enda bedre: bruk den.',
      c_libre: 'Nå er det din tur: hva liker du å *gjøre*? Skriv *én setning på tre ord*: «*je*» + «*aimer*» + et *verb*.',
      libre_trois: 'Det er ikke tre ord: je + aime + et verb. Rett det, eller bekreft på nytt for å beholde svaret ditt.',
      gloss_titre: 'Vanlige verb',
      gloss_dico: 'Mangler det ett? Slå det opp i din egen ordbok: det er en veldig god vane.',
      gloss_liste: [
        'manger — spise',
        'boire — drikke',
        'regarder — se på',
        'jouer — spille',
        'étudier — studere',
        'lire — lese',
        'écouter — lytte',
        'chanter — synge',
        'danser — danse',
        'dormir — sove',
        'marcher — gå',
        'dessiner — tegne',
        'cuisiner — lage mat',
        'nager — svømme',
        'voyager — reise'
      ],
      passer: 'Hopp over',
      quipLibre: 'Takk. Det er lagret.',
      copier: 'Kopier',
      copie: 'Kopiert!',
      toutCopier: 'Kopier alt',
      recap_titre: 'Svarene dine',
      lec_defi: 'En siste utfordring. Ingen hint. Klarer du det, teller det. Mislykkes du, teller det også.',
      c_defi1: 'Utfordring (1/2). Her er et verb. Bøy det med «*je*» i *presens*.',
      sens_etudier: 'studere',
      c_defi2: 'Utfordring (2/2). Kombiner «*étudier*» med «*aimer*», med «*je*». Skriv en setning.',
      presqueAccent: 'Godtatt. Men se på aksentene.',
      presqueApostrophe: 'Godtatt. Men ikke glem apostrofen.',
      quipEchec: 'Ikke denne gangen. Notert. Vi går videre.',
      c_rep: 'Minnet er skadet. Reparer det: sett hvert ord på sin plass, *fra venstre til høyre*.',
      tr_aimepizza: 'Jeg liker pizza.',
      repApres1: 'En film. Hun har altså i hvert fall smak.',
      repApres3: 'Jeg liker pizza. Endelig en klar mening.',
      repApres5: 'Én setning igjen. Du kan gjette hvilken.',
      intro4: 'Enda et stykke av minnet. Denne gangen snakker hun om hva hun liker. Du skal se, det er rørende.',
      fin4: 'Fjerde stykke funnet. Du kan si hva du spiser, hva du ser på og hva du liker. Minnet tar form.',
      sens_j: 'jeg («je» foran vokal)',
      sens_aime: 'like / elske',
      sens_manger: 'spise (grunnform)',
      sens_regarder: 'se på (grunnform)',
      sens_jouer: 'spille (grunnform)',
      sens_tele: 'tv (kort for télévision)',
      tr_aimepoutine: 'Jeg liker poutine.',
      tr_aimemanger: 'Jeg liker å spise.',
      tr_aimetele: 'Jeg liker å se på tv.',
      tr_aimejouer: 'Jeg liker å spille.',
      tr_aimeregpoutine: 'Jeg liker å se på poutine.',
      tr_aimemangerpoutine: 'Jeg liker å spise poutine.',
      noteJ_titre: 'Merknad',
      noteJ: '«je» foran vokal blir «j’»: je + aime → j’aime. Foran konsonant endres ingenting: je mange. Det skjer også med andre små ord, som «le» og «la».',
      noteI_titre: 'Merknad',
      noteI: 'Etter «aimer» beholder verbet grunnformen: infinitiv. Den ender på -er: mang-er, regard-er, jou-er. Det er verbet uten «je».',
      quipJe: 'Foran «aime» blir «je» til «j’». Vokaler fortjener respekt.',
      quipInf: 'Etter «j’aime» beholder verbet grunnformen: -er, ikke -e.',
      quipApostrophe: 'Nesten! Ikke glem apostrofen.',
      quipAimePoutine: 'Hun liker poutine. Man merker det på entusiasmen hennes. Vel, man aner det.',
      quipAimeManger: 'Å spise. En konstant hos henne.',
      quipAimeJouer: 'Å spille. Hva da? Hun sier det ikke. Enda et mysterium.',
      quipAimeRegPoutine: 'Å se på poutine. Der er vi igjen. Fortsatt kontemplativ.',
      cult_tele: 'I Québec som i Frankrike sier man oftest «la télé». Det er en forkortelse av «télévision», et feminint ord.',
      intro3: 'Enda et stykke av det samme minnet. Denne gangen spiser hun ikke. Hun ser. Nyanse.',
      finSuite: 'Første stykke funnet. Minnet er ikke helt ennå. Det finnes flere.',
      fin3: 'Tredje stykke funnet. Nå kan du si hva du ser på og hva du spiser. Ikke bland dem sammen.',
      sens_regarde: 'se på',
      sens_film: 'film',
      tr_regarde: 'Jeg ser.',
      tr_film: 'Jeg ser på en film.',
      tr_regpoutine: 'Jeg ser på en poutine.',
      tr_regsandwich: 'Jeg ser på en sandwich.',
      noteR_titre: 'Merknad',
      noteR: 'Enda et verb på -er: je regard-e. Og man «regarde» noe direkte: intet lite ord mellom verbet og det man ser på. Ingen «på».',
      quipFilm: 'En film. Endelig noe fornuftig.',
      quipRegPoutine: 'Å se på en poutine. Så … kontemplativt.',
      quipRegSandwich: 'Hun ser på sandwichen. Hun er sulten, men hun venter. Beundringsverdig.',
      quipVerbe: 'Hun spiser ikke. Hun ser. Verbet teller.',
      quipFilmMange: 'Å spise en film. Originalt. Men nei.',
      quipUn: '«Un film», ikke «une». Ordet er maskulint.',
      cult_film: 'Ordet «film» kommer fra engelsk, der det betydde et tynt lag. På fransk er det maskulint: un film.'
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
      bande_voir: 'Показать слова', bande_cacher: 'Скрыть слова', sans_son: 'Я ничего не слышу',
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
      fin: 'Воспоминание восстановлено. Теперь ты умеешь сказать, что ты ешь. А чего ты не ешь… это потом.',
      intro2: 'Ещё один фрагмент воспоминания. Она всё ещё ест. Но слушай внимательно: маленькое слово перед «sandwich» изменилось.',
      fin2: 'Второй фрагмент найден. Что-то новое, а когда уже знаешь, это то же самое: теперь ты умеешь различать. Есть ещё фрагменты.',
      sens_le: 'определённый артикль (слово мужского рода: то, о чём мы говорим)',
      sens_la: 'определённый артикль (слово женского рода: то, о чём мы говорим)',
      sens_pizza: 'пицца',
      tr_sandwichle: 'Я ем этот сэндвич.',
      tr_poutinela: 'Я ем эту poutine.',
      tr_pizzaune: 'Я ем пиццу.',
      tr_pizzala: 'Я ем эту пиццу.',
      noteL_titre: 'Заметка',
      noteL: '«un» и «une»: что-то новое, один из многих. «le» и «la»: то, о чём мы говорим, то, что мы уже знаем. Мужской род: un → le. Женский род: une → la.',
      c_nouveau: 'Появляется что-то *новое*. Составь предложение.',
      c_connu: 'Это то же самое, но теперь ты это *знаешь*. Составь предложение.',
      quipNouveau: 'Появляется что-то новое: мы говорим «un» или «une».',
      quipConnu: 'То же самое, теперь уже известное: мы говорим «le» или «la».',
      quipLe: 'Мужской род, значит «le». Не «la».',
      quipLa: 'Женский род, значит «la». Не «le».',
      quipDef: 'Мы говорим о том, что уже знаем: «le» или «la», а не «un» или «une».',
      quipIndef: 'Что-то новое: «un» или «une», а не «le» или «la».',
      quipUne2: 'Женский род: «une», а не «un». То же правило, что и раньше.',
      quipUn2: 'Мужской род: «un», а не «une». То же правило, что и раньше.',
      quipLeSandwich: 'Сэндвич. Тот самый, который она теперь знает как свои пять пальцев.',
      quipLaPoutine: 'Poutine. Про неё мы не забыли. Жаль.',
      quipPizza: 'Пицца. Хотя бы тут никто не спорит.',
      cult_pizza: 'Слово «pizza» пришло из итальянского. По-французски оно женского рода: une pizza, la pizza.',
      sens_joue: 'играть (я играю)',
      tr_regpoutinela: 'Я смотрю на эту poutine.',
      tr_regsandwichle: 'Я смотрю на этот сэндвич.',
      tr_jejoue: 'Я играю.',
      quipRegPoutineLa: 'Poutine. Всё ещё только смотрит, но не ест. У неё есть принципы.',
      quipRegSandwichLe: 'Тот же сэндвич. Теперь она его знает. И всё равно не ест.',
      quipJeJoue: 'С «je» глагол теряет -r: jouer → joue. Как mange, как regarde.',
      reprise: 'Продолжаем с того места, где остановились. Видишь, я ничего не забыл.',
      quitter_titre: 'Выйти и продолжить позже?',
      quitter_info: 'Твой прогресс сохранён.',
      quitter_oui: 'Выйти',
      quitter_non: 'Остаться',
      intro5: 'Все четыре фрагмента на месте. Теперь нужно собрать их вместе самостоятельно. Я ничего не скажу. Ну, почти ничего.',
      fin5: 'Воспоминание восстановлено. Четыре фрагмента, шесть предложений, немного poutine. Могло быть и хуже.',
      intro6: 'Последний фрагмент воспоминания. На этот раз тебя никто не ведёт за руку. Кое-что может сделать только человек: слушать, писать, помнить. К этому надо привыкнуть. Здесь это не засчитывается… но то, что ты напишешь, будет записано.',
      fin6: 'Последний фрагмент найден. Воспоминание целое. То, что ты написал(а), сохранено. А что будет дальше… посмотрим.',
      c_dictee: '*Слушай*, а потом *пиши то, что слышишь*. Список слов — это подсказка: на него *нельзя нажимать*.',
      c_ecoute_ecris: '*Слушай*, а потом *пиши то, что слышишь*.',
      c_rappel: 'Это предложение уже встречалось. *Составь его* по памяти.', c_finale: 'Допиши *окончание* глагола.',
      tr_regfilmle: 'Я смотрю этот фильм.', tr_regpizzaune: 'Я смотрю на пиццу.', tr_regpizzala: 'Я смотрю на эту пиццу.', tr_aimemangersandwich: 'Я люблю есть сэндвич.', tr_aimemangerpizza: 'Я люблю есть эту пиццу.', tr_aimeregfilm: 'Я люблю смотреть фильм.',
      liste_mots: 'Слова, которые можно использовать',
      c_aimeq: 'Ты — Bek. Что ты *любишь* делать? Напиши *полное предложение*.',
      lec_certif: 'Теперь вопросы о Bek. Чтобы ответить, нужно вспомнить то, что ты узнал(а) о ней. Выбирать не из чего: пиши сам(а). Я проверю твой ответ, и он будет сохранён. Ты можешь ошибиться. Но у этого могут быть последствия позже.',
      c_certif1: 'В восстановленных тобой воспоминаниях что *ест* Bek? Запиши с «*un*» или «*une*».',
      quipCompOk: 'Все три, и с правильным артиклем. Именно так. Она не скажет, но она довольна.',
      quipCompEssai: 'Пока нет. Зелёные поля верные. Исправь остальные. Последняя попытка.',
      quipCompFin: 'На этот раз нет. Она ест сэндвич, poutine и пиццу. Записано.',
      comp_reponse: 'Ответ: un sandwich, une poutine, une pizza.',
      lec_libre: 'У этого вопроса нет правильного или неправильного ответа. Возможно, его прочитает учитель. Список глаголов может помочь, но твой собственный словарь ещё лучше: пользуйся им.',
      c_libre: 'Теперь ты: что ты *любишь* делать? Напиши *одно предложение из трёх слов*: «*je*» + «*aimer*» + *глагол*.',
      libre_trois: 'Это не три слова: je + aime + глагол. Исправь или подтверди ещё раз, чтобы сохранить свой ответ.',
      gloss_titre: 'Частые глаголы',
      gloss_dico: 'Не хватает какого-то? Найди его в своём собственном словаре: это очень хорошая привычка.',
      gloss_liste: [
        'manger — есть',
        'boire — пить',
        'regarder — смотреть',
        'jouer — играть',
        'étudier — учиться',
        'lire — читать',
        'écouter — слушать',
        'chanter — петь',
        'danser — танцевать',
        'dormir — спать',
        'marcher — ходить',
        'dessiner — рисовать',
        'cuisiner — готовить',
        'nager — плавать',
        'voyager — путешествовать'
      ],
      passer: 'Пропустить',
      quipLibre: 'Спасибо. Сохранено.',
      copier: 'Копировать',
      copie: 'Скопировано!',
      toutCopier: 'Копировать всё',
      recap_titre: 'Твои ответы',
      lec_defi: 'Последнее испытание. Без подсказок. Получится — засчитается. Не получится — тоже засчитается.',
      c_defi1: 'Испытание (1/2). Вот глагол. Проспрягай его с «*je*» в *настоящем времени*.',
      sens_etudier: 'учиться',
      c_defi2: 'Испытание (2/2). Объедини «*étudier*» и «*aimer*» с «*je*». Напиши предложение.',
      presqueAccent: 'Принято. Но посмотри на ударения и значки.',
      presqueApostrophe: 'Принято. Но не забывай про апостроф.',
      quipEchec: 'На этот раз нет. Записано. Идём дальше.',
      c_rep: 'Воспоминание повреждено. Восстанови его: поставь каждое слово на своё место, *слева направо*.',
      tr_aimepizza: 'Я люблю пиццу.',
      repApres1: 'Фильм. Значит, у неё всё-таки есть вкусы.',
      repApres3: 'Я люблю пиццу. Наконец-то твёрдое мнение.',
      repApres5: 'Остаётся одно предложение. Можешь догадаться, какое.',
      intro4: 'Ещё один фрагмент воспоминания. На этот раз она говорит о том, что любит. Увидишь, это трогательно.',
      fin4: 'Четвёртый фрагмент найден. Ты умеешь сказать, что ты ешь, на что смотришь и что любишь. Воспоминание обретает форму.',
      sens_j: 'я («je» перед гласной)',
      sens_aime: 'любить / нравиться',
      sens_manger: 'есть (начальная форма)',
      sens_regarder: 'смотреть (начальная форма)',
      sens_jouer: 'играть (начальная форма)',
      sens_tele: 'телевизор (сокращение от télévision)',
      tr_aimepoutine: 'Я люблю poutine.',
      tr_aimemanger: 'Я люблю есть.',
      tr_aimetele: 'Я люблю смотреть телевизор.',
      tr_aimejouer: 'Я люблю играть.',
      tr_aimeregpoutine: 'Я люблю смотреть на poutine.',
      tr_aimemangerpoutine: 'Я люблю есть poutine.',
      noteJ_titre: 'Заметка',
      noteJ: '«je» перед гласной превращается в «j’»: je + aime → j’aime. Перед согласной ничего не меняется: je mange. Так бывает и с другими маленькими словами, например «le» и «la».',
      noteI_titre: 'Заметка',
      noteI: 'После «aimer» глагол остаётся в начальной форме: это инфинитив. Он оканчивается на -er: mang-er, regard-er, jou-er. Это глагол без «je».',
      quipJe: 'Перед «aime» «je» превращается в «j’». Гласные заслуживают уважения.',
      quipInf: 'После «j’aime» глагол сохраняет начальную форму: -er, а не -e.',
      quipApostrophe: 'Почти! Не забывай про апостроф.',
      quipAimePoutine: 'Она любит poutine. Это видно по её энтузиазму. Ну, можно догадаться.',
      quipAimeManger: 'Есть. Постоянная величина в её жизни.',
      quipAimeJouer: 'Играть. Во что? Она не говорит. Ещё одна загадка.',
      quipAimeRegPoutine: 'Смотреть на poutine. Опять мы к этому вернулись. Всё так же созерцательно.',
      cult_tele: 'И в Квебеке, и во Франции чаще всего говорят «la télé». Это сокращение от «télévision», слова женского рода.',
      intro3: 'Ещё один фрагмент того же воспоминания. На этот раз она не ест. Она смотрит. Нюанс.',
      finSuite: 'Первый фрагмент найден. Воспоминание ещё не целое. Есть и другие.',
      fin3: 'Третий фрагмент найден. Теперь ты умеешь сказать, на что смотришь и что ешь. Не путай их.',
      sens_regarde: 'смотреть',
      sens_film: 'фильм',
      tr_regarde: 'Я смотрю.',
      tr_film: 'Я смотрю фильм.',
      tr_regpoutine: 'Я смотрю на poutine.',
      tr_regsandwich: 'Я смотрю на сэндвич.',
      noteR_titre: 'Заметка',
      noteR: 'Ещё один глагол на -er: je regard-e. И «regarde» употребляется напрямую: между глаголом и тем, на что смотришь, нет маленького слова. Никакого «на».',
      quipFilm: 'Фильм. Наконец-то что-то разумное.',
      quipRegPoutine: 'Смотреть на poutine. Как… созерцательно.',
      quipRegSandwich: 'Она смотрит на сэндвич. Она голодна, но терпит. Достойно восхищения.',
      quipVerbe: 'Она не ест. Она смотрит. Глагол важен.',
      quipFilmMange: 'Есть фильм. Оригинально. Но нет.',
      quipUn: '«Un film», а не «une». Это слово мужского рода.',
      cult_film: 'Слово «film» пришло из английского, где оно означало тонкий слой. По-французски оно мужского рода: un film.'
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
    injecterStyle('m1-cle-style', '.m1-consigne .m1-cle{font-weight:800;font-size:1.08em;color:#9C3F1E;padding:.02em .22em;margin:0 .02em;border-radius:.35em;background:linear-gradient(transparent 22%,rgba(240,169,139,.72) 22%);box-shadow:0 .08em 0 rgba(224,136,103,.9);-webkit-box-decoration-break:clone;box-decoration-break:clone}');
    const lectZone = q('.m1-lect'), lectTexte = q('.m1-lect-texte'), lectSuite = q('.m1-lect-suite');
    const calque = q('.m1-calque'), vignette = q('.m1-vignette'), colBek = q('.m1-col-bek');
    const segs = scene.querySelectorAll('.m1-segment');
    const boutonSon = q('.m1-son');
    const boutonRetour = q('.m1-retour');
    const colGauche = q('.m1-col-gauche'), calqueBek = q('.m1-bek');
    // 🆕 options.scenes === true force la scène d'ouverture même à la reprise (test, ou « refaire » un fragment : le Lecteur dit alors « reprise »)
    const sceneAuDepart = !options._retour && (!(Number(options.reprendreA) > 0) || options.scenes === true);
    if (!sceneAuDepart) console.info('sequence-m1 : pas de scène d’ouverture (' + (options._retour ? 'retour en arrière' : 'reprise à l’étape ' + options.reprendreA) + '). options.scenes: true la force.');     // 🆕 scène d'abord : pas au retour en arrière ni à la reprise
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
    let fileJeton = 0, compteurFile = 0, synthProgrammee = false;     // 🆕 (09-11-2026) v34 : compteurFile = identité d'une phrase mise en file (elle ne touche plus à jetonVoix)
    let ecranId = 0;                       // 🆕 v34 : change à chaque nouvel écran (vider) ; une voix « de début d'écran » programmée pour un écran déjà quitté ne part plus
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
        // 🆕 v34 : la file a son propre compteur. Avant, elle faisait ++jetonVoix : la voix en cours de CHARGEMENT (essai .mp3 → repli .wav → synthèse) voyait son jeton
        //   changer et abandonnait en silence. fileJeton = 0 (couperVoix) ou une file plus récente annule celle-ci.
        const moi = ++compteurFile, t0 = Date.now();
        fileJeton = moi;                     // 🆕 la phrase en attente compte comme « voix active » pour la fin d'étape
        (function boucle() {
          if (arrete || fileJeton !== moi) return;
          if (voixReelle() && Date.now() - t0 < ATTENTE_VOIX_MAX) { setTimeout(boucle, 40); return; }
          // 🆕 une courte respiration après la fin de la voix précédente : sa dernière syllabe (« télé ») n'est plus écrasée par la suivante
          setTimeout(function () { if (arrete || fileJeton !== moi) return; dire(id, texte, v, false); }, FIN_VOIX_MARGE);
        })();
        return;
      }
      couperVoix();
      Array.prototype.forEach.call(zone.querySelectorAll('.m1-silence'), function (b) { b.classList.remove('m1-silence'); });   // 🆕 v34
      if (v && v.coeur) coeur();             // 🆕 la voix démarre vraiment ici (pas pendant l'attente en file)
      const mon = jetonVoix;
      const fichier = nomAudio(id, v);
      if (dispoAudio[fichier] === false) { synthese(texte); return; }
      const dossier = options.dossierAudio || 'audio/fr/';
      const formats = dispoAudio[fichier] ? [dispoAudio[fichier]] : ['mp3', 'wav'];
      function essayer(i) {
        if (mon !== jetonVoix || arrete) return;
        if (i >= formats.length) { dispoAudio[fichier] = false; synthese(texte); return; }
        let passe = false, demarre = false;
        function suivant() { if (passe) return; passe = true; essayer(i + 1); }
        try {
          const a = new Audio(dossier + fichier + '.' + formats[i]);
          voixAudio = a;
          a.addEventListener('ended', function () { if (voixAudio === a) voixAudio = null; }, { once: true });
          a.addEventListener('error', function () { if (voixAudio === a) voixAudio = null; suivant(); }, { once: true });   // 🆕 fichier absent : la voix n'est pas « en cours »
          // 🆕 v34 : une PHRASE qui n'a pas démarré 2,5 s après sa demande (réseau lent, lecture refusée) : le bouton « Réécouter » clignote, pour qu'on ne prenne pas
          //   le silence pour la voix de l'exercice précédent.
          let veille = null;
          a.addEventListener('playing', function () { demarre = true; if (veille) clearTimeout(veille); }, { once: true });
          if (v && v.phrase) veille = setTimeout(function () { if (!demarre && mon === jetonVoix && !arrete) signalerSilence('aucun son 2,5 s après la demande (' + fichier + ')'); }, 2500);
          const lecture = a.play();
          if (lecture && lecture.then) lecture.then(function () { dispoAudio[fichier] = formats[i]; }).catch(function (e) {
            if (voixAudio === a) voixAudio = null;
            if (veille) clearTimeout(veille);
            // 🆕 v34 : seul un fichier introuvable / illisible fait passer au format suivant puis à la synthèse. Avant, un refus du navigateur (NotAllowedError) ou une
            //   interruption (AbortError) faisait aussi tomber en « pas de fichier » : dispoAudio[fichier] = false, donc voix de synthèse pour tout le reste de la session.
            const nom = e && e.name;
            if (nom === 'NotAllowedError') { passe = true; signalerSilence('lecture refusée par le navigateur (' + fichier + ')'); return; }
            if (nom === 'AbortError') return;
            if (!dispoAudio[fichier]) suivant();
          });
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
      dire(ph.audio, ph.texte, { voix: ph.voix, version: ph.version, coeur: (ph.mots || []).indexOf('aime') !== -1, phrase: true }, !tout_de_suite);
      bekParle();
    };
    // 🆕 (09-11-2026) v34 — VOIX DE DÉBUT D'ÉCRAN (exercices d'écoute, dictées, réparation) : elle part tout de suite (le nouvel écran vient déjà de couper toute voix :
    //   inutile de la mettre en file derrière une voix « fantôme ») et seulement si l'écran n'a pas changé entre-temps.
    function direAuDebut(ph, ms, aussi) {
      const ecran = ecranId;
      planifier(function () { if (ecran !== ecranId) return; direPhrase(ph, true); if (aussi) aussi(); }, ms);
    }
    // Le bouton « Réécouter » clignote (trois fois) quand la voix d'une phrase n'a pas pu démarrer ; il s'arrête dès qu'une voix repart. Le message de la console dit pourquoi.
    function signalerSilence(raison) {
      if (arrete) return;
      try { console.warn('sequence-m1 : la voix de la phrase n’a pas démarré — ' + raison + '. Le bouton « Réécouter » clignote.'); } catch (e) {}
      injecterStyle('m1-silence-style', SILENCE_CSS);
      Array.prototype.forEach.call(zone.querySelectorAll('.m1-haut-parleur'), function (b) { b.classList.remove('m1-silence'); void b.offsetWidth; b.classList.add('m1-silence'); });
    }

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
    // 🆕 v36 « Je regarde une pizza. », « Je regarde la pizza. » : Bek tient sa pizza sans la manger (repos / parle, comme le sandwich regardé)
    function estRegardePizza(ph) {
      const mots = (ph && ph.mots) || [];
      return (mots.indexOf('regarde') !== -1 || mots.indexOf('regarder') !== -1) && mots.indexOf('pizza') !== -1;
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
      const regPiz = !mange && !pizza && !film && !regSand && !regPout && estRegardePizza(phrase) && !!(poses['bek-regarde-pizza'] && poses['bek-pizza-regarde-ouverte']);   // 🆕 v36 : elle regarde sa pizza et dit la phrase
      const jou = !mange && !pizza && !film && !regSand && !regPout && !regPiz && estJouer(phrase) && !!(poses[JOUER.base] && poses[JOUER.ouverte]);   // 🆕 elle tient sa poupée, dit la phrase, puis joue
      const base = mange ? m.base : (pizza ? 'bek-pizza-repos' : (film ? 'bek-regarde-film' : (regSand ? 'bek-regarde-sandwich' : (regPout ? 'bek-regarde-poutine' : (regPiz ? 'bek-regarde-pizza' : (jou ? JOUER.base : 'bek-ecoute'))))));
      const ouv = mange ? m.ouverte : (pizza ? 'bek-pizza-ouverte' : (film ? 'bek-film-ouverte' : (regSand ? 'bek-sandwich-regarde-ouverte' : (regPout ? 'bek-poutine-regarde-ouverte' : (regPiz ? 'bek-pizza-regarde-ouverte' : (jou ? JOUER.ouverte : 'bek-ecoute-ouverte'))))));
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
    // 🆕 (08-11-2026) Toute bulle du Lecteur reste le temps de la lire : au moins la durée demandée, et au moins 3,5 s + 90 ms par caractère
    //   (même pour les petites remarques « Voilà. »). Plafond 16 s. Une bulle qui reste trop peu = bug : on ne la raccourcit plus jamais.
    function dureeIndice(texte, ms, rappelable) {
      const base = ms || 4500;
      return Math.min(16000, Math.max(base, 3500 + String(texte).length * 90));
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
    q('.m1-lect-bulle').addEventListener('mouseleave', function () { if (indiceActif && !lectMinuteur && lectZone.classList.contains('m1-lect-visible')) programmerRetrait(3500); });
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
    // 🆕 (08-11-2026) MOTS CLÉS : dans une consigne, *mot* est mis en évidence (surligneur) : le verbe ou la notion à remarquer (aimer, écrire, un/une…).
    // Aucun HTML n'est accepté : on construit des nœuds texte et des <strong class="m1-cle">. Les * sont retirés avant de ranger la question dans les résultats (noter).
    function consigne(txt) {
      elConsigne.textContent = '';
      String(txt == null ? '' : txt).split(/\*([^*]+)\*/).forEach(function (part, i) {
        if (i % 2) { const k = document.createElement('strong'); k.className = 'm1-cle'; k.textContent = part; elConsigne.appendChild(k); }
        else if (part) elConsigne.appendChild(document.createTextNode(part));
      });
    }
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
    function vider() { ecrans++; ecranId++; majRetour(); couperVoix(); saisieFermer(); zone.innerHTML = ''; actions.innerHTML = ''; zone.removeAttribute('data-mode'); zone.removeAttribute('data-phrase'); }
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

    // ---------- 🆕 Bande de mots (voir BANDE_CSS) ----------
    function creerBande(phrase, champ) {
      injecterStyle('m1-bande-style', BANDE_CSS);
      const el = document.createElement('div'); el.className = 'm1-bande';
      const idPiste = 'm1-bande-' + Math.random().toString(36).slice(2, 8);
      const bouton = document.createElement('button');
      bouton.type = 'button'; bouton.className = 'm1-bande-btn';
      bouton.setAttribute('aria-expanded', 'false'); bouton.setAttribute('aria-controls', idPiste);
      bouton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg><span></span>';
      const texte = bouton.querySelector('span'); texte.textContent = T('bande_voir');
      const piste = document.createElement('div'); piste.className = 'm1-bande-piste'; piste.id = idPiste;
      piste.setAttribute('role', 'group'); piste.setAttribute('aria-label', T('bande_ordre'));
      const mots = document.createElement('div'); mots.className = 'm1-bande-mots';
      piste.appendChild(mots);
      // les mots de la phrase, sans doublon, JAMAIS dans l'ordre de la phrase
      const ids = phrase.mots.filter(function (id, i, a) { return a.indexOf(id) === i; });
      let ordre = melanger(ids.slice());
      for (let essai = 0; essai < 8 && ids.length > 1 && ordre.join('|') === ids.join('|'); essai++) ordre = melanger(ids.slice());
      if (ids.length > 1 && ordre.join('|') === ids.join('|')) ordre = ids.slice().reverse();
      const puces = ordre.map(function (id) {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'm1-bande-mot'; b.textContent = AFFICHE[id] || id; b.tabIndex = -1;
        b.addEventListener('pointerdown', function (e) { e.preventDefault(); });          // le champ garde le focus (le clavier reste là)
        b.addEventListener('click', function () { try { direMot(id); } catch (e) {} });     // entendre le mot ; il n'est pas inséré
        mots.appendChild(b);
        return b;
      });
      let ouverte = false, minuteur = null;
      function regler(v) {
        ouverte = v;
        el.classList.toggle('m1-bande-ouverte', ouverte);
        bouton.setAttribute('aria-expanded', ouverte ? 'true' : 'false');
        texte.textContent = T(ouverte ? 'bande_cacher' : 'bande_voir');
        puces.forEach(function (b) { b.tabIndex = ouverte ? 0 : -1; });
        bouton.classList.remove('m1-bande-appel');
      }
      bouton.addEventListener('pointerdown', function (e) { e.preventDefault(); });
      bouton.addEventListener('click', function () { regler(!ouverte); try { champ.focus({ preventScroll: true }); } catch (e) {} });
      el.appendChild(bouton); el.appendChild(piste);
      return {
        el: el,
        inviter: function () {                 // après une erreur : le bouton se met à battre doucement, deux fois (jamais si la bande est ouverte)
          if (ouverte || bouton.disabled) return;
          bouton.classList.remove('m1-bande-appel'); void bouton.offsetWidth; bouton.classList.add('m1-bande-appel');
          clearTimeout(minuteur); minuteur = planifier(function () { bouton.classList.remove('m1-bande-appel'); }, 2300);
        },
        fermer: function () { clearTimeout(minuteur); regler(false); bouton.disabled = true; }
      };
    }

    // ---------- 3. Écriture : quelques mots (cloze) ou la phrase entière ----------
    async function ecrire(phrase, cle, manquants, sansTraduction, options2) {
      options2 = options2 || {};
      vider();
      zone.setAttribute('data-mode', 'ecrire'); zone.setAttribute('data-phrase', cle);
      const cloze = !!manquants;
      const champs = [];
      let champPhrase = null, bande = null;
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
        // 🆕 phrase entière à écrire au tout premier niveau : les mots sont consultables (désordonnés) dans une bande repliée
        if (options2.bande !== false && (options2.bande === true || BANDE_FRAGMENTS.indexOf(fragment) !== -1)) { bande = creerBande(phrase, champPhrase); zone.appendChild(bande.el); }
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
        if (bande) bande.fermer();
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
        if (bande) bande.inviter();      // 🆕 « Voir les mots » se met à battre : de l'aide est là, sans qu'on la force
        if (erreurs === 2) {             // indice : les premières lettres
          indice.textContent = phrase.mots.map(function (id) { return AFFICHE[id].charAt(0) + '…'; }).join(' ');
        }
        if (erreurs >= 3) {              // la réponse apparaît ; on ne bloque pas l'élève
          termine = true;
          bValider.disabled = true;
          if (bande) bande.fermer();
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
      if (!options2.sansEcoute) zone.insertBefore(creerEcoute(phrase), zone.firstChild);     // 🆕 v35 : l'exercice d'écoute écrit a déjà son propre bouton
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
    // 🆕 v35 : l'entête de l'exercice d'écoute (bouton « Réécouter » + « Je n'entends rien », texte révélable) sert aussi à l'écoute écrite (ecrireAudio)
    function enteteAudio(phrase) {
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
      return entete;
    }
    async function construireAudio(phrase, cle) {
      const entete = enteteAudio(phrase);
      const attente = construireSimple(phrase, cle, { direAuClic: false, sansEcoute: true });
      zone.insertBefore(entete, zone.firstChild);     // construire() vient de remplir la zone (synchrone jusqu'au premier await)
      reactiverSon();                       // 🆕 l'écoute est le but de l'exercice : le son est rallumé si l'élève l'avait coupé ailleurs
      animerBouche(phrase);                 // 🆕 pose neutre « écoute-moi » (bouche mobile pendant la voix) ; « Je mange… » : elle tient l'aliment, parle, puis mange ; pizza, film, télé : elle garde sa pose et parle
      direAuDebut(phrase, 400);
      await attente;
      arreterBouche();
    }
    // 🆕 (10-11-2026) v35 — ÉCOUTE ÉCRITE : on entend la phrase et on l'ÉCRIT au clavier (sans la traduction), avec la bande de mots repliée « Voir les mots ».
    //   Même entête et même voix d'ouverture que construireAudio ; la phrase entière est à écrire (accents et majuscules : mêmes règles que partout).
    async function ecrireAudio(phrase, cle) {
      const entete = enteteAudio(phrase);
      const attente = ecrire(phrase, cle, null, true, { bande: true, sansEcoute: true });
      zone.insertBefore(entete, zone.firstChild);
      reactiverSon();
      animerBouche(phrase);
      direAuDebut(phrase, 400);
      await attente;
      arreterBouche();
    }

    // 🆕 (10-11-2026) v36 — RAPPEL : une phrase DÉJÀ VUE dans un fragment précédent, à reconstruire de mémoire, au début de l'étape 0 (aucune étape ajoutée).
    async function rappel(cle, pose, banque) {
      etal(null);
      montrer(pose || 'bek-observe');
      consigne(T('c_rappel'));
      await construire(PHRASES[cle], 'rappel-' + cle, banque ? { banque: banque } : undefined);
    }
    // 🆕 (10-11-2026) v36 — LA FIN DU VERBE : « Je regard_ un film. », « J'aime mang_ la pizza. » L'élève écrit seulement la terminaison :
    // « e » pour « regarde » / « mange » / « joue », « er » pour l'infinitif (« manger »). Tout le reste de la phrase est donné.
    const FINALE_CSS = [
      '.m1-fin{display:inline-flex;align-items:center;gap:.15rem}',
      '.m1-fin-radical{font-weight:700;font-size:1.05rem;color:var(--brun-fonce,#4A3B33);padding:.35rem 0 .35rem .2rem}',
      '.m1-fin .m1-champ{width:3.4rem;min-width:0;text-align:center;box-sizing:border-box}'
    ].join('\n');
    async function ecrireFin(phrase, cle, idVerbe) {
      vider();
      zone.setAttribute('data-mode', 'finale'); zone.setAttribute('data-phrase', cle);
      injecterStyle('m1-finale-style', FINALE_CSS);
      const verbe = AFFICHE[idVerbe];
      const fin = /er$/.test(verbe) ? 'er' : 'e';                 // mange → e ; manger → er
      const radical = verbe.slice(0, verbe.length - fin.length);    // mang / regard / jou
      const tr = ligneTraduction(phrase); if (tr) zone.appendChild(tr);
      let champ = null;
      const ligne = ligneGroupes(phrase, function (id) {
        if (id !== idVerbe) { const t = tuile(id, 'm1-tuile-donnee'); t.disabled = true; return t; }
        const bloc = document.createElement('span');
        bloc.className = 'm1-fin';
        const r = document.createElement('span');
        r.className = 'm1-fin-radical'; r.textContent = radical;
        champ = document.createElement('input');
        champ.type = 'text'; champ.className = 'm1-champ m1-role-' + ROLE[id];
        champ.setAttribute('autocomplete', 'off'); champ.setAttribute('autocapitalize', 'none'); champ.setAttribute('autocorrect', 'off'); champ.spellcheck = false;
        champ.setAttribute('aria-label', T('c_finale')); champ.maxLength = 4; champ.size = 3;
        bloc.appendChild(r); bloc.appendChild(champ);
        return bloc;
      });
      zone.appendChild(ligne);
      zone.insertBefore(creerEcoute(phrase), zone.firstChild);
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bValider = document.createElement('button');
      bValider.type = 'button'; bValider.className = 'lect-btn m1-btn'; bValider.textContent = T('valider');
      actions.appendChild(bValider);
      let erreurs = 0, termine = false;
      function verifier() {
        if (termine) return;
        const bon = normaliser(champ.value) === fin;
        champ.classList.toggle('m1-ok', bon); champ.classList.toggle('m1-ko', !bon);
        if (bon) {
          termine = true; bValider.disabled = true; champ.readOnly = true;
          direPhrase(phrase);
          lecteurIndice(auHasard(T('quipOk')), 2200);
          finApresVoix(fini, 1300);
          return;
        }
        erreurs++;
        secouer(champ.parentNode);
        lecteurIndice(auHasard(T('quipErreur')), 4200);
        if (erreurs >= 3) {                  // la réponse apparaît ; on ne bloque pas l'élève
          termine = true; bValider.disabled = true; champ.readOnly = true;
          champ.value = fin; champ.classList.add('m1-ok'); champ.classList.remove('m1-ko');
          lecteurIndice(T('quipReponse'), 4200);
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      }
      bValider.addEventListener('click', verifier);
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verifier(); } });
      planifier(function () { try { champ.focus(); } catch (e) {} }, 200);
      await promesse;
    }

    // ---------- 🆕 L'étal : « un parmi plusieurs » (nouveau) → « celui-là » (connu) ----------
    // 🆕 (09-11-2026) mode 'nouveau' : UN SEUL objet visible, pastille ambre « un/une » ; mode 'connu' : les trois sont là, celui du milieu seul est en valeur (halo violet), pastille « le/la ».
    // Sans argument : on retire l'étal. Le même objet garde son élément d'un mode à l'autre : le passage s'anime.
    let etalEl = null, minuteurEtal = null, etalEnBoucle = false, etalListe = null, etalEcoute = null;   // etalEcoute(objet, mode) : la carte « Remarque » qui suit l'étal
    function etal(objet, mode) {          // appel venu d'une étape : il arrête toute boucle en cours
      clearTimeout(minuteurEtal); etalEnBoucle = false;
      etalPoser(objet, mode);
    }
    // 🆕 En boucle (carte « Remarque ») : pour chaque objet de la liste, « un » (un seul objet + pause) → « le » (les trois, un en valeur + pause), puis l'objet suivant (sandwich, puis poutine : une ligne
    // de la carte chacun), et on recommence, jusqu'à ce que l'étape change. Sans animation : un seul passage, sur le premier objet.
    let jetonBoucle = null;
    function etalBoucle(objets) {
      objets = Array.isArray(objets) ? objets : [objets];
      clearTimeout(minuteurEtal); etalEnBoucle = true; etalListe = objets;
      let pas = 0;
      etalPoser(objets[0], 'nouveau');
      if (reduit) return;
      const jeton = jetonBoucle = {};
      (function tour() {
        const attente = pas % 2 === 0 ? ETAL_PAUSE : ETAL_PAUSE_CONNU;     // « le » dure un peu plus : il faut voir apparaître les deux autres, puis lequel est choisi
        minuteurEtal = planifier(function () {
          if (jetonBoucle !== jeton || !etalEnBoucle) return;
          pas = (pas + 1) % (objets.length * 2);
          etalPoser(objets[pas >> 1], pas % 2 ? 'connu' : 'nouveau');
          tour();
        }, attente);
      })();
    }
    function etalPoser(objet, mode) {
      if (!objet || !mode || !DESSINS[objet] || !ETAL_ART[objet]) {
        clearTimeout(minuteurEtal); etalEnBoucle = false;
        if (typeof etalEcoute === 'function') etalEcoute(null, null);
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
        //   « le / la » → « un » (un seul objet), une pause, puis « celui-là » (les trois, un en valeur) ; « un / une » → l'objet réapparaît ; en boucle → on repart
        el.addEventListener('click', function () {
          if (etalEl !== el) return;
          if (etalEnBoucle) { etalBoucle(etalListe || objet); return; }
          clearTimeout(minuteurEtal);
          if (el.classList.contains('m1-etal-connu')) {
            etalPoser(objet, 'nouveau');
            minuteurEtal = planifier(function () { if (etalEl === el) etalPoser(objet, 'connu'); }, ETAL_PAUSE);
          } else {
            Array.prototype.forEach.call(el.querySelectorAll('.m1-etal-objet'), function (o) { o.style.animation = 'none'; void o.offsetWidth; o.style.animation = ''; });
            etalSignal();
          }
        });
        etalEl = el;
      }
      const avant = etalEl.classList.contains('m1-etal-connu') ? 'connu' : (etalEl.classList.contains('m1-etal-nouveau') ? 'nouveau' : '');
      etalEl.classList.toggle('m1-etal-nouveau', mode === 'nouveau');
      etalEl.classList.toggle('m1-etal-connu', mode === 'connu');
      etalEl.querySelector('.m1-etal-pastille').textContent = ETAL_ART[objet][mode === 'connu' ? 1 : 0];
      if (avant && avant !== mode) etalSignal();        // le mot de la pastille change : elle pulse pour qu'on le remarque
      if (typeof etalEcoute === 'function') etalEcoute(objet, mode);
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
        sp.setAttribute('data-objet', p[1]);
        d.appendChild(sp);
      });
      // 🆕 la carte suit l'étal (sauf mouvement réduit : tout reste net, rien ne s'estompe)
      if (!reduit) {
        etalEcoute = function (objet, mode) {
          if (!d.isConnected) { etalEcoute = null; return; }
          d.classList.toggle('m1-paire-suivi', !!objet);
          Array.prototype.forEach.call(d.querySelectorAll('.m1-radical'), function (r) {
            const actif = !!objet && r.getAttribute('data-objet') === objet;
            r.classList.toggle('m1-radical-actif', actif);
            if (actif) r.setAttribute('data-mode', mode); else r.removeAttribute('data-mode');
          });
        };
        if (etalEl) etalEcoute(etalEl.getAttribute('data-objet'), etalEl.classList.contains('m1-etal-connu') ? 'connu' : 'nouveau');
      }
      return d;
    }
    async function etapeArticles() {
      etape(0); montrer('bek-mange-sandwich');
      await rappel('sandwich', 'bek-mange-sandwich', BANQUE_2);      // 🆕 v36 : rappel du fragment 1, avant « le sandwich »
      etal('sandwich', 'connu');
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(T('quipLeSandwich'), 5500); }, 1500);
      await lecture(PHRASES.sandwichle, 'sandwichle');
      etalBoucle(['sandwich', 'poutine']);                           // la remarque : un parmi plusieurs… une vraie pause… celui-là… (sandwich, puis poutine : une ligne de la carte chacun) et on recommence
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
      // 🆕 v35 : la poutine (2e objet) : la phrase « le / la » est ÉCRITE au clavier (bande de mots repliée) ; le sandwich reste en cases
      if (objet === 'poutine') { consigne(T('c_ecrire')); await ecrire(connu, 'connu-' + objet, null, true, { bande: true }); }
      else await construire(connu, 'connu-' + objet, { banque: BANQUE_2 });
      arreter();
      await bekDit(objet, 1500);
    }

    // ---------- 🆕 Fragment 3 (anciennement 2) : « regarder » ----------
    async function etapeRegarde() {
      etape(0); montrer('bek-observe');
      await rappel('pizzala', 'bek-mange-pizza', BANQUE_3);          // 🆕 v36 : rappel du fragment 2 (« Je mange la pizza. »), juste avant « Je regarde. »
      montrer('bek-observe');
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
      if (cle === 'film') {             // 🆕 v36 : le même film, maintenant connu : « le » (comme pour la poutine à l'étape suivante)
        etal('film', 'connu');
        planifier(function () { lecteurIndice(T('quipConnu'), 5000); }, 600);
        consigne(T('c_ordre'));
        await ordre(PHRASES.regfilmle, 'regfilmle', ['la', 'une']);
        consigne(T('c_ecrire_part'));
        await ecrire(PHRASES.regfilmle, 'regfilmle', [2]);            // on écrit l'article
        etal(null); await carte(T('cult_titre'), T('cult_film'));
      }
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
      // 🆕 v36 : la FIN DU VERBE (« Je regard_ un film. ») : un autre type d'exercice, avant le contraste regarder / manger
      montrer('bek-regarde-film'); etal('film', 'nouveau');
      consigne(T('c_finale'));
      await ecrireFin(PHRASES.film, 'fin-film', 'regarde');
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
      await ecrire(PHRASES.sandwichle, 'image-sandwich-2', null, true, { bande: true });   // 🆕 v35 : écrit au clavier (bande de mots repliée) ; le sandwich qu'elle regardait
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
          direAuDebut(ph, 500);
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

  // 🆕 (09-11-2026) Filet : si mots.js n'est pas chargé sur la page hôte, on écrit quand même dans la copie locale de la banque (même clé 'kebbek_mots_invite',
  // même format : tableau de mots sans doublon) — memoires.html la relit. Avant, rien ne se passait et rien ne le disait.
  function enregistrerMotsSecours(mots) {
    try {
      const cle = 'kebbek_mots_invite';
      let liste = [];
      try { liste = JSON.parse(localStorage.getItem(cle) || '[]'); } catch (e) { liste = []; }
      if (!Array.isArray(liste)) liste = [];
      const vus = {};
      liste.forEach(function (m) { vus[String(m).toLocaleLowerCase()] = true; });
      (mots || []).forEach(function (m) { const k = String(m).toLocaleLowerCase(); if (m && !vus[k]) { vus[k] = true; liste.push(m); } });
      localStorage.setItem(cle, JSON.stringify(liste));
    } catch (e) { console.warn('Copie de secours des mots impossible.', e); }
  }
    async function fin() {
      if (arrete) return;
      finie = true; majRetour(); etal(null);
      etape(nbEtapes);
      montrer('bek-heureuse-ferme');
      try {
        const banque = window.KebBekMots;
        if (!banque || typeof banque.ajouter !== 'function') {
          if (MOTS_DU_FRAGMENT.length) {
            console.warn('sequence-m1 : mots.js n\'est pas chargé sur cette page — mots gardés dans la copie locale seulement (pas dans le compte).');
            enregistrerMotsSecours(MOTS_DU_FRAGMENT);
          }
        } else if (MOTS_DU_FRAGMENT.length) {
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
      const r = Object.assign({ cle: cle, type: type, question: String(question == null ? '' : question).replace(/\*/g, ''), reponse: reponse, statut: statut }, extra || {});   // * = mot clé de la consigne : pas dans les résultats
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
    function glossaire() {            // 🆕 aide NON touchable : verbes courants + rappel d'utiliser son propre dictionnaire
      const d = document.createElement('div');
      d.className = 'm1-liste-mots';
      const t = document.createElement('p'); t.className = 'm1-liste-titre'; t.textContent = T('gloss_titre');
      const r = document.createElement('div'); r.className = 'm1-liste-rang';
      (T('gloss_liste') || []).forEach(function (v) { const m = document.createElement('span'); m.className = 'm1-mot-liste'; m.textContent = v; r.appendChild(m); });
      const p = document.createElement('p'); p.className = 'm1-sens'; p.style.marginTop = '.5rem'; p.textContent = T('gloss_dico');
      d.appendChild(t); d.appendChild(r); d.appendChild(p);
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
          finApresVoix(fini, presque ? 4200 : 2200);
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

    // Compréhension : trois champs, vérifiable (un sandwich, une poutine, une pizza, dans n'importe quel ordre).
    // 🆕 (08-11-2026) Corrigée comme les autres : les champs justes passent au vert et se verrouillent, les autres au rouge ; 2 essais ;
    //   après le dernier raté, la bonne réponse est affichée (c'est un rappel de la leçon, pas une dictée). Le résultat est noté.
    async function questionNourriture() {
      vider();
      zone.setAttribute('data-mode', 'epreuve'); zone.setAttribute('data-phrase', 'comp-nourriture');
      injecterStyle('m1-epreuve-style', EPREUVE_CSS);
      const rang = document.createElement('div');
      rang.className = 'm1-triple';
      const champs = [nouveauChamp(), nouveauChamp(), nouveauChamp()];
      champs.forEach(function (c) { rang.appendChild(c); });
      zone.appendChild(rang);
      const attendus = ['un sandwich', 'une poutine', 'une pizza'].map(normaliser);
      const pris = [false, false, false], etatChamp = [null, null, null];   // 'ok' | 'presque' une fois validé
      let termine = false, essais = 0, fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bV = document.createElement('button');
      bV.type = 'button'; bV.className = 'lect-btn m1-btn'; bV.textContent = T('valider');
      actions.appendChild(bV);
      function clore() {
        termine = true; bV.disabled = true;
        champs.forEach(function (c) { c.readOnly = true; });
        const bons = etatChamp.filter(function (e) { return e; }).length;
        const presques = etatChamp.filter(function (e) { return e === 'presque'; }).length;
        const statut = bons === 3 ? (presques ? 'presque' : 'ok') : (bons > 0 ? 'partiel' : 'non');
        const donnes = champs.map(function (c) { return c.value.trim(); }).filter(function (v) { return normaliser(v); });
        noter('comp-nourriture', 'comprehension', T('c_certif1'), donnes.join(' / '), statut, { attendu: 'un sandwich / une poutine / une pizza', bons: bons, total: 3, essais: essais });
        if (bons < 3) {
          const p = document.createElement('p');
          p.className = 'm1-sens'; p.textContent = T('comp_reponse');
          zone.appendChild(p);
        }
        lecteurIndice(T(bons === 3 ? 'quipCompOk' : 'quipCompFin'), 4500);
        boutonAction(T('continuer')).then(fini);
      }
      function verifier() {
        if (termine) return;
        const libres = champs.filter(function (c, i) { return !etatChamp[i] && normaliser(c.value.trim()); });
        if (!libres.length) { secouer(rang); return; }          // rien de nouveau à vérifier : ne compte pas comme un essai
        essais++;
        champs.forEach(function (c, i) {                        // passe 1 : réponses exactes
          const d = c.value.trim();
          if (etatChamp[i] || !normaliser(d)) return;
          const k = attendus.findIndex(function (a, j) { return !pris[j] && a === normaliser(d); });
          if (k !== -1) { pris[k] = true; etatChamp[i] = 'ok'; }
        });
        if (ACCENTS_TOLERES) champs.forEach(function (c, i) {   // passe 2 : accents ou apostrophes seuls
          const d = c.value.trim();
          if (etatChamp[i] || !normaliser(d)) return;
          const k = attendus.findIndex(function (a, j) { return !pris[j] && proche(normaliser(d), a); });
          if (k !== -1) { pris[k] = true; etatChamp[i] = 'presque'; }
        });
        champs.forEach(function (c, i) {
          c.classList.remove('m1-ok', 'm1-ko');
          if (etatChamp[i]) { c.classList.add('m1-ok'); c.readOnly = true; }
          else c.classList.add('m1-ko');
        });
        const bons = etatChamp.filter(function (e) { return e; }).length;
        if (bons === 3 || essais >= 2) { clore(); return; }
        const faux = champs.filter(function (c, i) { return !etatChamp[i]; });
        secouer(rang);
        lecteurIndice(T('quipCompEssai'), 4500);
        faux.forEach(function (c) { c.classList.remove('m1-ko'); c.classList.add('m1-ko'); });
        try { faux[0].focus(); faux[0].select(); } catch (e) {}
      }
      bV.addEventListener('click', verifier);
      champs.forEach(function (c, i) {
        c.addEventListener('input', function () { c.classList.remove('m1-ko'); });
        c.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const suivant = champs.slice(i + 1).find(function (x, j) { return !etatChamp[i + 1 + j]; });
          if (suivant) suivant.focus(); else verifier();
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
      const ta = nouveauChamp();            // une seule phrase, courte : un champ d'une ligne
      zone.appendChild(ta);
      zone.appendChild(glossaire());
      let termine = false, fini, prevenu = false;
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
      function valider() {
        const v = ta.value.trim();
        if (!v) { secouer(ta); return; }
        const nb = v.replace(/[.!?…]+$/, '').split(/[\s'’]+/).filter(Boolean).length;   // « j'aime lire » = j' + aime + lire = 3
        if (nb !== 3 && !prevenu) { prevenu = true; secouer(ta); lecteurIndice(T('libre_trois'), 5000); return; }   // un rappel, une seule fois : jamais bloquant, jamais noté
        clore(false);
      }
      bV.addEventListener('click', valider);
      ta.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); valider(); } });
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
        direAuDebut(phrase, 500);
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
    function segAudio(cles, ecrit) {       // 🆕 v35 : ecrit = clé d'une dernière phrase à ÉCRIRE au clavier après celles à construire
      return async function () {
        etape(5); etal(null); montrer('bek-observe'); consigne(T('c_audio'));
        for (const cle of cles) await construireAudio(PHRASES[cle], 'audio-' + cle);
        if (ecrit) { consigne(T('c_ecoute_ecris')); await ecrireAudio(PHRASES[ecrit], 'audio-ecrit-' + ecrit); }
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
        segAudio(['sandwichle', 'poutinela'], 'pizzala')
      ];
      if (fragment === 3) return [
        etapeRegarde,
        function () { return etapeRegardePhrase('film', 1); },
        function () { return etapeRegardePhrase('regpoutine', 2); },
        etapeContraste3, etapeContraste4,
        segAudio(['film', 'regpizzaune'], 'regpizzala')     // 🆕 v36 : un film (rappel), puis deux situations NOUVELLES : « une pizza » (cases), « la pizza » (écrit)
      ];
      if (fragment === 4) return [
        async function () {
          etape(0);
          await rappel('regfilmle', 'bek-regarde-film', ['je', 'regarde', 'mange', 'le', 'la', 'un', 'film', 'sandwich']);    // 🆕 v36 : rappel du fragment 3, avant « J'aime… »
          await segmentAime(0, 'aimepoutine', 'bek-mange-poutine', ['je'], [0, 1], 'quipAimePoutine',
            { avant: true, titre: 'noteJ_titre', texte: 'noteJ', visuel: pairesElision });
        },
        async function () {
          await segmentAime(1, 'aimemanger', 'bek-mange-sandwich', ['mange'], [2], 'quipAimeManger',
            { avant: true, titre: 'noteI_titre', texte: 'noteI', visuel: pairesInfinitif });
          // 🆕 v36 : la FIN DU VERBE, juste après la carte de l'infinitif : « J'aime mang_ la pizza. » (« er »)
          montrer('bek-mange-pizza');
          consigne(T('c_finale'));
          await ecrireFin(PHRASES.aimemangerpizza, 'fin-aimemangerpizza', 'manger');
        },
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
        segAudio(['aimemangersandwich', 'aimejouer'], 'aimeregfilm')     // 🆕 v36 : « J'aime manger un sandwich. » (nouveau), « J'aime jouer. » (rappel), puis « J'aime regarder un film. » écrit (nouveau)
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
      const reposListe = [].concat((SCENES[fragment] && SCENES[fragment].repos) || []);
      for (let i = depart; i < segmentsF.length; i++) {
        segCourant = i; ecrans = 0; majRetour();
        const repos = reposListe.filter(function (r) { return r.index === i; })[0];
        if (repos && !options._retour) await sceneDabord(repos, true);     // 🆕 point de repos au milieu du fragment
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

  try { console.info('sequence-m1 : v36 — six phrases (regarder / j’aime), rappels, fin du verbe ; v35 — écrire au clavier ce qu’on voit et ce qu’on entend (fragments 2 à 4) ; v34 : voix d’ouverture des exercices d’écoute fiabilisée ; v33 : étal « un » (un seul objet) / « le » (trois, un en valeur) ; v32 : bande de mots (fragment 1), repos multiples ; scène d’abord, encadré ensuite ; voix coupée à chaque écran, cœur sur « aime », fragment 6 (épreuve)'); } catch (e) {}
  window.KebBekM1 = { demarrer: demarrer, MOTS_APPRIS_6: MOTS_APPRIS_6, MOTS_APPRIS: MOTS_APPRIS, MOTS_APPRIS_2: MOTS_APPRIS_2, MOTS_APPRIS_3: MOTS_APPRIS_3, MOTS_APPRIS_4: MOTS_APPRIS_4, MOTS_APPRIS_5: MOTS_APPRIS_5, REPARATION: REPARATION };
})();
