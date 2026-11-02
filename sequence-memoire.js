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

   🆕 (31-10-2026) SAISIE AU CLAVIER : on peut aussi TAPER les mots (ordinateur,
   Chromebook…), comme sur Duolingo. Les lettres tapées s'affichent dans la
   prochaine case de la bulle et surlignent le début des mots possibles ; dès
   qu'UN SEUL mot du plateau commence par ces lettres, il vole dans la case
   (« f » suffit pour « français »). Si deux mots restent possibles (« parle »
   et « parles »), on continue de taper ; Espace ou Entrée valide le mot tapé en
   entier. Retour arrière et Échap effacent. Accents et majuscules sont
   ignorés. Un mauvais mot se comporte exactement comme au toucher
   (la tuile se secoue, le son d'erreur, l'indice après deux erreurs).

   🆕 (01-11-2026) OUVERTURE RETRAVAILLÉE — cinq temps d'émotion au lieu de trois
   poses enchaînées (voir OUVERTURE, tous les délais s'y règlent) :
     1. concentrée (elle cherche) ;
     2. penchée : elle CHERCHE, balancement lent, doute ;
     3. elle RETIENT SON SOUFFLE (silence ; la pose facultative « déclic » —
        yeux qui s'écarquillent — s'y glisse si l'image existe) ;
     4. ÉCLAT : une lumière jaillit derrière sa tête (halo, rayons, anneau,
        étincelles, petit carillon), elle se redresse, CONFIANTE : le déclic ;
     5. elle savoure, puis pose la main sur le cœur, SOLENNELLE (fondu lent).
   L'éclat tombe pile quand l'image « confiante » apparaît (coupe quasi nette,
   masquée par la lumière) : c'est l'instant de la prise de conscience.

   Aucune « corruption » du texte : c'est une seule bonne mémoire, et c'est
   l'élève qui la reconstruit.

   🆕 (01-11-2026) Dictionnaire (DICO) ET explications de l'aide (AIDE) pour
   fr + les 19 langues du site (repli : en, puis fr). Les 4 mots affichés sont
   les mêmes pour tous ; seul leur SENS est traduit (clés sens_*). Chaque aide
   est écrite pour sa langue (pronom omis ou obligatoire, genre, majuscules…).
   ℹ️ pt = deux voix : Bek parle portugais du PORTUGAL (rencBekQuoi, rencRecap*, bekFin), le Lecteur et le système (fen*, compte*, aide) portugais du BRÉSIL — compromis voulu ; zh = chinois simplifié ; fa s'affiche de droite
   à gauche (mots français et phrase restent de gauche à droite). Textes à faire
   relire par des locuteurs avant la mise en ligne.

   🎨 Réutilise le gabarit de Bek de sequence-reveil-bek.css (.rbek-fond,
   .rbek-pose, .rbek-bulle…) pour garder exactement la même taille, la même
   position et le même style ; et l'icône du Lecteur de sequence-lecteur.js.

   @param {string} idConteneur
   @param {object} options : langue, sources (surcharge des noms d'images),
                             dossierImages, extension,
                             🆕 identite { prenom, genre: 'm'|'f', adulte: bool } —
                             celle recueillie par sequence-reveil-bek (onIdentite) ;
                             si elle est fournie, la scène « rencontre du Lecteur »
                             se joue après la mémoire (rencontre: false l'en empêche),
                             🧪 sauterA: 'rencontre' — aperçu : saute le jeu et
                             démarre à la fin de la mémoire (pour régler la scène)
   @param {object} callbacks : onTermine(),
                               🆕 onIdentiteConfirmee(identite) — appelé quand l'élève a
                               confirmé (ou corrigé) ses informations dans la fenêtre du
                               Lecteur ; reçoit { prenom, genre, adulte } : c'est là qu'il
                               faut ENREGISTRER l'identité corrigée. Sans onCompte, il prend
                               la suite (onTermine n'est alors pas appelé) ;
                               🆕 onCompte(identite) — étape C : s'il est fourni, le Lecteur
                               dit « Si tu ne veux pas perdre tes progrès… » puis une fenêtre
                               propose « Créer un compte » / « Plus tard ». « Créer un
                               compte » appelle onCompte(identite) (la page hôte lance alors
                               la création du compte : ce module n'en crée aucun) ;
                               « Plus tard » appelle onTermine(). options.compte: false
                               supprime la fenêtre même si onCompte est fourni
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];
  const LANGUES_DROITE_A_GAUCHE = ['fa'];

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
  // Les temps de l'ouverture, en millisecondes. Tout se règle ici.
  const OUVERTURE = {
    depart: 1500,            // Bek apparaît, concentrée
    fonduPenchee: 650,       // concentrée → penchée (fondu doux)
    cherche: 2000,           // penchée : elle cherche, le balancement lent
    silence: 500,            // elle retient son souffle (ou pose « déclic », si l'image existe)
    declic: 650,             // durée de la pose « déclic » (facultative) avant l'éclat
    fonduEclat: 120,         // penchée/déclic → confiante : presque une coupe, masquée par la lumière
    confiante: 1900,         // elle savoure sa trouvaille
    fonduSolennelle: 800,    // confiante → solennelle (fondu lent)
    solennelle: 1500         // main sur le cœur, avant l'arrivée de la bulle
  };
  // Nombre de syllabes de chaque mot : la bouche de Bek s'ouvre autant de fois.
  const SYLLABES = { je: 1, parle: 1, francais: 2, parles: 1 };
  const SON_PAR_DEFAUT = true;            // ← mettre false pour démarrer en silence
  const CLE_SON = 'kebbek_son';
  // Notes (do ré mi sol la do) : un mot posé = une note qui monte dans la phrase.
  const GAMME = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  const NOTE_DU_MOT = [0, 2, 3];          // je = do, parle = mi, français = sol
  // 🆕 Rencontre : bout du doigt de Bek dans l'image « pointe » (fraction de la boîte
  // de Bek : 0 = bord gauche / haut). Le Lecteur vient s'y poser.
  const DOIGT = { x: 0.178, y: 0.547 };
  // 🆕 (02-11-2026) Une fois le bras baissé (pose « observe »), le Lecteur monte à hauteur des
  // YEUX de Bek, à gauche de sa tête (mêmes fractions de la boîte de Bek) : yeux à 38 % de la
  // hauteur, bord gauche des cheveux à 26 % de la largeur, menton à 50 % de la hauteur.
  const YEUX = { x: 0.263, y: 0.384, menton: 0.5 };
  // Même règle que sequence-reveil-bek.js : 1 à 20 caractères, lettres de toute écriture
  const REGEX_PRENOM = /^[\p{L}\p{M}][\p{L}\p{M}'\u2019 .\-]{0,19}$/u;
  const PROFILS = [           // mêmes valeurs que le réveil ; l'âge s'affiche à côté du mot
    { id: 'Garcon', genre: 'm', adulte: false, age: '0\u201317' },
    { id: 'Fille',  genre: 'f', adulte: false, age: '0\u201317' },
    { id: 'Homme',  genre: 'm', adulte: true,  age: '18+' },
    { id: 'Femme',  genre: 'f', adulte: true,  age: '18+' }
  ];
  const RENCONTRE = { approche: 1500, penseeMin: 2800, penseeMax: 5200, penseeParSigne: 90 };

  const DICO = {
    fr: {
      sens_je: 'moi', sens_parle: '(moi) parler', sens_francais: 'la langue fran\u00e7aise', sens_parles: '(toi) parler',
      bekFin: '\u2026mais c\u2019est tout ce dont je me souviens.',
      lecteurFin: 'Il doit y en avoir d\u2019autres\u2026 Je peux t\u2019aider \u00e0 les retrouver.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'C\u2019est quoi, \u00e7a\u00a0?',
      rencPensee: 'Une IA, je suppose\u00a0?',
      rencLect1: 'Salut Bek, je me pr\u00e9sente\u00a0: je suis le Lecteur.',
      rencLect2: 'Je peux t\u2019aider \u00e0 retrouver et \u00e0 reconstruire tes m\u00e9moires.',
      rencLect3: 'J\u2019ai besoin d\u2019un humain pour r\u00e9aliser certaines de ces t\u00e2ches.',
      rencLect4: 'Humain, veux-tu nous aider\u00a0?',
      rencReponse: 'J\u2019imagine que je n\u2019ai pas le choix\u00a0!',
      rencRecapGarcon: 'Il s\u2019appelle {nom}, c\u2019est un gar\u00e7on.',
      rencRecapFille: 'Elle s\u2019appelle {nom}, c\u2019est une fille.',
      rencRecapHomme: 'Il s\u2019appelle {nom}, c\u2019est un homme.',
      rencRecapFemme: 'Elle s\u2019appelle {nom}, c\u2019est une femme.',
      rencLect5: 'C\u2019est vrai\u00a0? Tu confirmes\u00a0?',
      fenTitre: 'V\u00e9rification des informations',
      fenPrenom: 'Pr\u00e9nom',
      fenConfirmer: 'Confirmer',
      fenErreur: 'De 1 \u00e0 20 lettres.',
      fenGarcon: 'Gar\u00e7on',
      fenFille: 'Fille',
      fenHomme: 'Homme',
      fenFemme: 'Femme',
      compteLect: 'Si tu ne veux pas perdre tes progr\u00e8s, tu devrais penser \u00e0 faire un compte.',
      compteTitre: 'Garder ta progression',
      compteTexte: 'Un courriel suffit : on t\u2019envoie un code, sans mot de passe.',
      compteCreer: 'Cr\u00e9er un compte',
      comptePlusTard: 'Plus tard',
      suite: 'Suite',
      sonBouton: 'Son',
      astuceClavier: 'Astuce\u00a0: tu peux aussi taper les mots au clavier.',
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
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'What\u2019s that?!',
      rencPensee: 'An AI, I guess?',
      rencLect1: 'Hi Bek, let me introduce myself: I\u2019m the Reader.',
      rencLect2: 'I can help you find and rebuild your memories.',
      rencLect3: 'I need a human to do some of these tasks.',
      rencLect4: 'Human, will you help us?',
      rencReponse: 'I guess I don\u2019t have a choice!',
      rencRecapGarcon: 'His name is {nom}, and he\u2019s a boy.',
      rencRecapFille: 'Her name is {nom}, and she\u2019s a girl.',
      rencRecapHomme: 'His name is {nom}, and he\u2019s a man.',
      rencRecapFemme: 'Her name is {nom}, and she\u2019s a woman.',
      rencLect5: 'Is that true? Can you confirm?',
      fenTitre: 'Check your details',
      fenPrenom: 'First name',
      fenConfirmer: 'Confirm',
      fenErreur: 'Use 1 to 20 letters.',
      fenGarcon: 'Boy',
      fenFille: 'Girl',
      fenHomme: 'Man',
      fenFemme: 'Woman',
      compteLect: 'If you don\u2019t want to lose your progress, you should think about making an account.',
      compteTitre: 'Keep your progress',
      compteTexte: 'Just an email: we\u2019ll send you a code, no password needed.',
      compteCreer: 'Create an account',
      comptePlusTard: 'Later',
      suite: 'Next',
      sonBouton: 'Sound',
      astuceClavier: 'Tip: you can also type the words on your keyboard.',
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
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\u00bfY eso qu\u00e9 es?',
      rencPensee: '\u00bfUna IA, supongo?',
      rencLect1: '\u00a1Hola, Bek! Me presento: soy el Lector.',
      rencLect2: 'Puedo ayudarte a encontrar y reconstruir tus recuerdos.',
      rencLect3: 'Necesito a un humano para hacer algunas de estas tareas.',
      rencLect4: 'Humano, \u00bfquieres ayudarnos?',
      rencReponse: 'Parece que no me queda otra\u2026',
      rencRecapGarcon: 'Se llama {nom}, es un chico.',
      rencRecapFille: 'Se llama {nom}, es una chica.',
      rencRecapHomme: 'Se llama {nom}, es un hombre.',
      rencRecapFemme: 'Se llama {nom}, es una mujer.',
      rencLect5: '\u00bfEs verdad? \u00bfLo confirmas?',
      fenTitre: 'Comprueba tus datos',
      fenPrenom: 'Nombre',
      fenConfirmer: 'Confirmar',
      fenErreur: 'Usa de 1 a 20 letras.',
      fenGarcon: 'Chico',
      fenFille: 'Chica',
      fenHomme: 'Hombre',
      fenFemme: 'Mujer',
      compteLect: 'Si no quieres perder tu progreso, deber\u00edas pensar en crear una cuenta.',
      compteTitre: 'Guarda tu progreso',
      compteTexte: 'Solo hace falta un correo: te enviamos un c\u00f3digo, sin contrase\u00f1a.',
      compteCreer: 'Crear una cuenta',
      comptePlusTard: 'M\u00e1s tarde',
      suite: 'Siguiente',
      sonBouton: 'Sonido',
      astuceClavier: 'Truco: tambi\u00e9n puedes escribir las palabras con el teclado.',
      aideBouton: 'El Lector: ayuda',
      aideInviteTactile: '\u00a1Toca sobre m\u00ed si no entiendes algo!',
      aideInviteSouris: '\u00a1Haz clic en m\u00ed si no entiendes algo!',
      aideTitre: 'El Lector te explica',
      aideMots: 'Palabras de este recuerdo',
      aideEquiv: 'En tu idioma',
      aideFermer: 'Cerrar'
    },
    it: {
      sens_je: 'io', sens_parle: '(io) parlo', sens_francais: 'francese', sens_parles: '(tu) parli',
      bekFin: '\u2026ma \u00e8 tutto quello che ricordo.',
      lecteurFin: 'Ce ne devono essere altri\u2026 Posso aiutarti a ritrovarli.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Che cos\u2019\u00e8 quello?',
      rencPensee: 'Un\u2019IA, immagino?',
      rencLect1: 'Ciao Bek, mi presento: sono il Lettore.',
      rencLect2: 'Posso aiutarti a ritrovare e ricostruire i tuoi ricordi.',
      rencLect3: 'Mi serve un umano per svolgere alcune di queste attivit\u00e0.',
      rencLect4: 'Umano, ci vuoi aiutare?',
      rencReponse: 'A quanto pare non ho molta scelta\u2026',
      rencRecapGarcon: 'Si chiama {nom}, \u00e8 un ragazzo.',
      rencRecapFille: 'Si chiama {nom}, \u00e8 una ragazza.',
      rencRecapHomme: 'Si chiama {nom}, \u00e8 un uomo.',
      rencRecapFemme: 'Si chiama {nom}, \u00e8 una donna.',
      rencLect5: '\u00c8 vero? Confermi?',
      fenTitre: 'Controlla i tuoi dati',
      fenPrenom: 'Nome',
      fenConfirmer: 'Conferma',
      fenErreur: 'Da 1 a 20 lettere.',
      fenGarcon: 'Ragazzo',
      fenFille: 'Ragazza',
      fenHomme: 'Uomo',
      fenFemme: 'Donna',
      compteLect: 'Se non vuoi perdere i tuoi progressi, dovresti pensare di creare un account.',
      compteTitre: 'Salva i tuoi progressi',
      compteTexte: 'Basta un\u2019e-mail: ti mandiamo un codice, senza password.',
      compteCreer: 'Crea un account',
      comptePlusTard: 'Pi\u00f9 tardi',
      suite: 'Avanti',
      sonBouton: 'Audio',
      astuceClavier: 'Suggerimento: puoi anche digitare le parole con la tastiera.',
      aideBouton: 'Il Lettore: aiuto',
      aideInviteTactile: 'Toccami se non capisci qualcosa!',
      aideInviteSouris: 'Cliccami se non capisci qualcosa!',
      aideTitre: 'Il Lettore ti spiega',
      aideMots: 'Le parole di questo ricordo',
      aideEquiv: 'Nella tua lingua',
      aideFermer: 'Chiudi'
    },
    pt: {
      sens_je: 'eu', sens_parle: '(eu) falo', sens_francais: 'franc\u00eas', sens_parles: '(tu) falas',
      bekFin: '\u2026mas \u00e9 s\u00f3 disso que me lembro.',
      lecteurFin: 'Deve haver mais\u2026 Posso ajudar voc\u00ea a encontr\u00e1-las.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'O que \u00e9 isto?!',
      rencPensee: 'Uma IA, eu acho?',
      rencLect1: 'Oi, Bek! Deixa eu me apresentar: sou o Leitor.',
      rencLect2: 'Posso ajudar voc\u00ea a reencontrar e reconstruir suas mem\u00f3rias.',
      rencLect3: 'Preciso de um humano para fazer algumas dessas tarefas.',
      rencLect4: 'Humano, voc\u00ea quer nos ajudar?',
      rencReponse: 'Pelo visto, n\u00e3o tenho muita escolha\u2026',
      rencRecapGarcon: 'Chama-se {nom}, \u00e9 um rapaz.',
      rencRecapFille: 'Chama-se {nom}, \u00e9 uma rapariga.',
      rencRecapHomme: 'Chama-se {nom}, \u00e9 um homem.',
      rencRecapFemme: 'Chama-se {nom}, \u00e9 uma mulher.',
      rencLect5: '\u00c9 verdade? Voc\u00ea confirma?',
      fenTitre: 'Confira seus dados',
      fenPrenom: 'Nome',
      fenConfirmer: 'Confirmar',
      fenErreur: 'Use de 1 a 20 letras.',
      fenGarcon: 'Menino',
      fenFille: 'Menina',
      fenHomme: 'Homem',
      fenFemme: 'Mulher',
      compteLect: 'Se voc\u00ea n\u00e3o quer perder seu progresso, deveria pensar em criar uma conta.',
      compteTitre: 'Guarde seu progresso',
      compteTexte: 'Basta um e-mail: enviamos um c\u00f3digo, sem senha.',
      compteCreer: 'Criar uma conta',
      comptePlusTard: 'Mais tarde',
      suite: 'Pr\u00f3ximo',
      sonBouton: 'Som',
      astuceClavier: 'Dica: voc\u00ea tamb\u00e9m pode digitar as palavras no teclado.',
      aideBouton: 'O Leitor: ajuda',
      aideInviteTactile: 'Toque em mim se voc\u00ea n\u00e3o entender alguma coisa!',
      aideInviteSouris: 'Clique em mim se voc\u00ea n\u00e3o entender alguma coisa!',
      aideTitre: 'O Leitor explica',
      aideMots: 'As palavras desta lembran\u00e7a',
      aideEquiv: 'Na sua l\u00edngua',
      aideFermer: 'Fechar'
    },
    ca: {
      sens_je: 'jo', sens_parle: '(jo) parlo', sens_francais: 'franc\u00e8s', sens_parles: '(tu) parles',
      bekFin: '\u2026per\u00f2 aix\u00f2 \u00e9s tot el que recordo.',
      lecteurFin: 'N\u2019hi ha d\u2019haver m\u00e9s\u2026 Et puc ajudar a trobar-los.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Qu\u00e8 \u00e9s all\u00f2?',
      rencPensee: 'Una IA, suposo?',
      rencLect1: 'Hola, Bek! Em presento: s\u00f3c el Lector.',
      rencLect2: 'Et puc ajudar a retrobar i reconstruir els teus records.',
      rencLect3: 'Necessito un hum\u00e0 per fer algunes d\u2019aquestes tasques.',
      rencLect4: 'Hum\u00e0, ens vols ajudar?',
      rencReponse: 'Pel que es veu, no tinc gaire opci\u00f3\u2026',
      rencRecapGarcon: 'Es diu {nom}, \u00e9s un noi.',
      rencRecapFille: 'Es diu {nom}, \u00e9s una noia.',
      rencRecapHomme: 'Es diu {nom}, \u00e9s un home.',
      rencRecapFemme: 'Es diu {nom}, \u00e9s una dona.',
      rencLect5: '\u00c9s veritat? Ho confirmes?',
      fenTitre: 'Comprova les teves dades',
      fenPrenom: 'Nom',
      fenConfirmer: 'Confirma',
      fenErreur: 'Fes servir d\u20191 a 20 lletres.',
      fenGarcon: 'Noi',
      fenFille: 'Noia',
      fenHomme: 'Home',
      fenFemme: 'Dona',
      compteLect: 'Si no vols perdre els teus progressos, hauries de pensar a fer-te un compte.',
      compteTitre: 'Guarda els teus progressos',
      compteTexte: 'Nom\u00e9s cal un correu: t\u2019enviem un codi, sense contrasenya.',
      compteCreer: 'Crea un compte',
      comptePlusTard: 'M\u00e9s tard',
      suite: 'Seg\u00fcent',
      sonBouton: 'So',
      astuceClavier: 'Truc: tamb\u00e9 pots escriure les paraules amb el teclat.',
      aideBouton: 'El Lector: ajuda',
      aideInviteTactile: 'Toca\u2019m si no entens alguna cosa!',
      aideInviteSouris: 'Fes-me clic si no entens alguna cosa!',
      aideTitre: 'El Lector t\u2019explica',
      aideMots: 'Les paraules d\u2019aquest record',
      aideEquiv: 'En la teva llengua',
      aideFermer: 'Tanca'
    },
    eo: {
      sens_je: 'mi', sens_parle: '(mi) parolas', sens_francais: 'la franca lingvo', sens_parles: '(vi) parolas',
      bekFin: '\u2026sed tion nur mi memoras.',
      lecteurFin: 'Certe ekzistas pliaj\u2026 Mi povas helpi vin retrovi ilin.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Kio estas tio?',
      rencPensee: 'Artefarita inteligento, mi supozas?',
      rencLect1: 'Saluton, Bek! Mi prezentas min: mi estas la Legilo.',
      rencLect2: 'Mi povas helpi vin retrovi kaj rekonstrui viajn memorojn.',
      rencLect3: 'Mi bezonas homon por plenumi kelkajn el \u0109i tiuj taskoj.',
      rencLect4: 'Homo, \u0109u vi volas helpi nin?',
      rencReponse: '\u015cajne mi ne havas multan elekton\u2026',
      rencRecapGarcon: 'Li nomi\u011das {nom}, li estas knabo.',
      rencRecapFille: '\u015ci nomi\u011das {nom}, \u015di estas knabino.',
      rencRecapHomme: 'Li nomi\u011das {nom}, li estas viro.',
      rencRecapFemme: '\u015ci nomi\u011das {nom}, \u015di estas virino.',
      rencLect5: '\u0108u vere? \u0108u vi konfirmas?',
      fenTitre: 'Kontrolu viajn informojn',
      fenPrenom: 'Anta\u016dnomo',
      fenConfirmer: 'Konfirmi',
      fenErreur: 'Uzu 1 \u011dis 20 literojn.',
      fenGarcon: 'Knabo',
      fenFille: 'Knabino',
      fenHomme: 'Viro',
      fenFemme: 'Virino',
      compteLect: 'Se vi ne volas perdi vian progreson, vi pripensu krei konton.',
      compteTitre: 'Konservu vian progreson',
      compteTexte: 'Sufi\u0109as retpo\u015dto: ni sendas kodon al vi, sen pasvorto.',
      compteCreer: 'Krei konton',
      comptePlusTard: 'Poste',
      suite: 'Sekva',
      sonBouton: 'Sono',
      astuceClavier: 'Konsileto: vi anka\u016d povas tajpi la vortojn per la klavaro.',
      aideBouton: 'La Legilo: helpo',
      aideInviteTactile: 'Tu\u015du min, se vi ion ne komprenas!',
      aideInviteSouris: 'Alklaku min, se vi ion ne komprenas!',
      aideTitre: 'La Legilo klarigas',
      aideMots: 'La vortoj de \u0109i tiu memora\u0135o',
      aideEquiv: 'En via lingvo',
      aideFermer: 'Fermi'
    },
    zh: {
      sens_je: '\u6211', sens_parle: '\uff08\u6211\uff09\u8bf4', sens_francais: '\u6cd5\u8bed', sens_parles: '\uff08\u4f60\uff09\u8bf4',
      bekFin: '\u2026\u2026\u53ef\u8fd9\u5c31\u662f\u6211\u8bb0\u5f97\u7684\u5168\u90e8\u4e86\u3002',
      lecteurFin: '\u4e00\u5b9a\u8fd8\u6709\u522b\u7684\u2026\u2026\u6211\u53ef\u4ee5\u5e2e\u4f60\u627e\u5230\u5b83\u4eec\u3002',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\u90a3\u662f\u4ec0\u4e48\u5440\uff1f',
      rencPensee: '\u662f\u4eba\u5de5\u667a\u80fd\u5427\uff1f',
      rencLect1: '\u4f60\u597d\uff0cBek\uff01\u6211\u6765\u81ea\u6211\u4ecb\u7ecd\u4e00\u4e0b\uff1a\u6211\u662f\u201c\u9605\u8bfb\u5668\u201d\u3002',
      rencLect2: '\u6211\u53ef\u4ee5\u5e2e\u4f60\u627e\u56de\u5e76\u91cd\u5efa\u4f60\u7684\u8bb0\u5fc6\u3002',
      rencLect3: '\u5176\u4e2d\u6709\u4e9b\u4efb\u52a1\uff0c\u9700\u8981\u4e00\u4e2a\u4eba\u7c7b\u6765\u5b8c\u6210\u3002',
      rencLect4: '\u4eba\u7c7b\uff0c\u4f60\u613f\u610f\u5e2e\u5e2e\u6211\u4eec\u5417\uff1f',
      rencReponse: '\u770b\u6765\u6211\u4e5f\u6ca1\u5f97\u9009\u5427\u2026\u2026',
      rencRecapGarcon: '\u4ed6\u53eb{nom}\uff0c\u662f\u4e2a\u7537\u5b69\u3002',
      rencRecapFille: '\u5979\u53eb{nom}\uff0c\u662f\u4e2a\u5973\u5b69\u3002',
      rencRecapHomme: '\u4ed6\u53eb{nom}\uff0c\u662f\u4e2a\u7537\u4eba\u3002',
      rencRecapFemme: '\u5979\u53eb{nom}\uff0c\u662f\u4e2a\u5973\u4eba\u3002',
      rencLect5: '\u662f\u771f\u7684\u5417\uff1f\u4f60\u786e\u8ba4\u4e00\u4e0b\uff1f',
      fenTitre: '\u8bf7\u6838\u5bf9\u4f60\u7684\u4fe1\u606f',
      fenPrenom: '\u540d\u5b57',
      fenConfirmer: '\u786e\u8ba4',
      fenErreur: '\u8bf7\u8f93\u5165 1 \u5230 20 \u4e2a\u5b57\u6bcd\u3002',
      fenGarcon: '\u7537\u5b69',
      fenFille: '\u5973\u5b69',
      fenHomme: '\u7537\u4eba',
      fenFemme: '\u5973\u4eba',
      compteLect: '\u5982\u679c\u4f60\u4e0d\u60f3\u4e22\u5931\u5b66\u4e60\u8fdb\u5ea6\uff0c\u6700\u597d\u8003\u8651\u6ce8\u518c\u4e00\u4e2a\u8d26\u53f7\u3002',
      compteTitre: '\u4fdd\u5b58\u4f60\u7684\u8fdb\u5ea6',
      compteTexte: '\u53ea\u9700\u4e00\u4e2a\u90ae\u7bb1\uff1a\u6211\u4eec\u4f1a\u53d1\u7ed9\u4f60\u9a8c\u8bc1\u7801\uff0c\u65e0\u9700\u5bc6\u7801\u3002',
      compteCreer: '\u521b\u5efa\u8d26\u53f7',
      comptePlusTard: '\u4ee5\u540e\u518d\u8bf4',
      suite: '\u7ee7\u7eed',
      sonBouton: '\u58f0\u97f3',
      astuceClavier: '\u5c0f\u63d0\u793a\uff1a\u4f60\u4e5f\u53ef\u4ee5\u7528\u952e\u76d8\u8f93\u5165\u8fd9\u4e9b\u8bcd\u3002',
      aideBouton: '\u9605\u8bfb\u5668\uff1a\u5e2e\u52a9',
      aideInviteTactile: '\u5982\u679c\u6709\u4e0d\u660e\u767d\u7684\u5730\u65b9\uff0c\u5c31\u70b9\u70b9\u6211\uff01',
      aideInviteSouris: '\u5982\u679c\u6709\u4e0d\u660e\u767d\u7684\u5730\u65b9\uff0c\u5c31\u70b9\u6211\uff01',
      aideTitre: '\u9605\u8bfb\u5668\u6765\u89e3\u91ca',
      aideMots: '\u8fd9\u6bb5\u8bb0\u5fc6\u91cc\u7684\u8bcd',
      aideEquiv: '\u7528\u4f60\u7684\u8bed\u8a00\u8bf4',
      aideFermer: '\u5173\u95ed'
    },
    ja: {
      sens_je: '\u79c1', sens_parle: '\uff08\u79c1\u304c\uff09\u8a71\u3059', sens_francais: '\u30d5\u30e9\u30f3\u30b9\u8a9e', sens_parles: '\uff08\u304d\u307f\u304c\uff09\u8a71\u3059',
      bekFin: '\u2026\u2026\u3067\u3082\u3001\u899a\u3048\u3066\u3044\u308b\u306e\u306f\u3053\u308c\u3060\u3051\u3002',
      lecteurFin: '\u304d\u3063\u3068\u307b\u304b\u306b\u3082\u3042\u308b\u306f\u305a\u2026\u2026\u898b\u3064\u3051\u308b\u304a\u624b\u4f1d\u3044\u3092\u3059\u308b\u3088\u3002',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\u3042\u308c\u3001\u306a\u306b\uff1f',
      rencPensee: 'AI\u304b\u306a\uff1f',
      rencLect1: '\u3053\u3093\u306b\u3061\u306f\u3001Bek\u3002\u81ea\u5df1\u7d39\u4ecb\u3059\u308b\u306d\u3002\u308f\u305f\u3057\u306f\u300c\u30ea\u30fc\u30c0\u30fc\u300d\u3060\u3088\u3002',
      rencLect2: '\u304d\u307f\u306e\u8a18\u61b6\u3092\u898b\u3064\u3051\u3066\u3001\u7d44\u307f\u7acb\u3066\u76f4\u3059\u304a\u624b\u4f1d\u3044\u304c\u3067\u304d\u308b\u3088\u3002',
      rencLect3: '\u3053\u306e\u3046\u3061\u306e\u3044\u304f\u3064\u304b\u306f\u3001\u4eba\u9593\u306e\u624b\u304c\u306a\u3044\u3068\u3067\u304d\u306a\u3044\u3093\u3060\u3002',
      rencLect4: '\u4eba\u9593\u3055\u3093\u3001\u624b\u4f1d\u3063\u3066\u304f\u308c\u308b\uff1f',
      rencReponse: '\u9078\u629e\u80a2\u3001\u306a\u3055\u305d\u3046\u3060\u306d\u2026',
      rencRecapGarcon: '{nom}\u304f\u3093\u3063\u3066\u3044\u3046\u306e\u3002\u7537\u306e\u5b50\u3060\u3088\u3002',
      rencRecapFille: '{nom}\u3061\u3083\u3093\u3063\u3066\u3044\u3046\u306e\u3002\u5973\u306e\u5b50\u3060\u3088\u3002',
      rencRecapHomme: '{nom}\u3055\u3093\u3063\u3066\u3044\u3046\u306e\u3002\u7537\u306e\u4eba\u3060\u3088\u3002',
      rencRecapFemme: '{nom}\u3055\u3093\u3063\u3066\u3044\u3046\u306e\u3002\u5973\u306e\u4eba\u3060\u3088\u3002',
      rencLect5: '\u672c\u5f53\uff1f \u78ba\u8a8d\u3057\u3066\u304f\u308c\u308b\uff1f',
      fenTitre: '\u60c5\u5831\u306e\u78ba\u8a8d',
      fenPrenom: '\u540d\u524d',
      fenConfirmer: '\u78ba\u8a8d\u3059\u308b',
      fenErreur: '1\u301c20\u6587\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
      fenGarcon: '\u7537\u306e\u5b50',
      fenFille: '\u5973\u306e\u5b50',
      fenHomme: '\u7537\u306e\u4eba',
      fenFemme: '\u5973\u306e\u4eba',
      compteLect: '\u9032\u307f\u5177\u5408\u3092\u306a\u304f\u3057\u305f\u304f\u306a\u304b\u3063\u305f\u3089\u3001\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u3063\u305f\u307b\u3046\u304c\u3044\u3044\u3088\u3002',
      compteTitre: '\u9032\u307f\u5177\u5408\u3092\u4fdd\u5b58\u3059\u308b',
      compteTexte: '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3060\u3051\u3067\u5927\u4e08\u592b\u3067\u3059\u3002\u30b3\u30fc\u30c9\u3092\u304a\u9001\u308a\u3057\u307e\u3059\u306e\u3067\u3001\u30d1\u30b9\u30ef\u30fc\u30c9\u306f\u4e0d\u8981\u3067\u3059\u3002',
      compteCreer: '\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u308b',
      comptePlusTard: '\u3042\u3068\u3067',
      suite: '\u6b21\u3078',
      sonBouton: '\u30b5\u30a6\u30f3\u30c9',
      astuceClavier: '\u30d2\u30f3\u30c8\uff1a\u30ad\u30fc\u30dc\u30fc\u30c9\u3067\u8a00\u8449\u3092\u5165\u529b\u3059\u308b\u3053\u3068\u3082\u3067\u304d\u308b\u3088\u3002',
      aideBouton: '\u30ea\u30fc\u30c0\u30fc\uff1a\u30d8\u30eb\u30d7',
      aideInviteTactile: '\u308f\u304b\u3089\u306a\u3044\u3053\u3068\u304c\u3042\u3063\u305f\u3089\u3001\u3055\u308f\u3063\u3066\u306d\uff01',
      aideInviteSouris: '\u308f\u304b\u3089\u306a\u3044\u3053\u3068\u304c\u3042\u3063\u305f\u3089\u3001\u30af\u30ea\u30c3\u30af\u3057\u3066\u306d\uff01',
      aideTitre: '\u30ea\u30fc\u30c0\u30fc\u304c\u8aac\u660e\u3059\u308b\u3088',
      aideMots: '\u3053\u306e\u8a18\u61b6\u306e\u8a00\u8449',
      aideEquiv: '\u3042\u306a\u305f\u306e\u8a00\u8449\u3067',
      aideFermer: '\u9589\u3058\u308b'
    },
    ko: {
      sens_je: '\ub098', sens_parle: '(\ub0b4\uac00) \ub9d0\ud574\uc694', sens_francais: '\ud504\ub791\uc2a4\uc5b4', sens_parles: '(\ub124\uac00) \ub9d0\ud574\uc694',
      bekFin: '\u2026\ud558\uc9c0\ub9cc \uc81c\uac00 \uae30\uc5b5\ud558\ub294 \uac74 \uc774\uac8c \uc804\ubd80\uc608\uc694.',
      lecteurFin: '\ub354 \uc788\uc744 \uac70\uc608\uc694\u2026 \ucc3e\ub294 \uac78 \ub3c4\uc640\uc904\uac8c\uc694.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\uc800\uac8c \ubb50\uc57c?',
      rencPensee: 'AI\uc778\uac00?',
      rencLect1: '\uc548\ub155, Bek! \ub0b4 \uc18c\uac1c\ub97c \ud560\uac8c. \ub098\ub294 \u2018\ub9ac\ub354\u2019\uc57c.',
      rencLect2: '\ub124 \uae30\uc5b5\uc744 \ucc3e\uace0 \ub2e4\uc2dc \uc9dc \ub9de\ucd94\ub294 \uac78 \ub3c4\uc640\uc904 \uc218 \uc788\uc5b4.',
      rencLect3: '\uc774 \uc911 \uba87 \uac00\uc9c0\ub294 \uc0ac\ub78c\uc758 \uc190\uc774 \ud544\uc694\ud574.',
      rencLect4: '\uc778\uac04, \uc6b0\ub9ac\ub97c \ub3c4\uc640\uc904\ub798\uc694?',
      rencReponse: '\uc120\ud0dd\uad8c\uc774 \uc5c6\ub294 \uac83 \uac19\ub124\u2026',
      rencRecapGarcon: '\uc774\ub984\uc740 {nom}. \ub0a8\uc790\uc544\uc774\uc57c.',
      rencRecapFille: '\uc774\ub984\uc740 {nom}. \uc5ec\uc790\uc544\uc774\uc57c.',
      rencRecapHomme: '\uc774\ub984\uc740 {nom}. \ub0a8\uc790 \uc5b4\ub978\uc774\uc57c.',
      rencRecapFemme: '\uc774\ub984\uc740 {nom}. \uc5ec\uc790 \uc5b4\ub978\uc774\uc57c.',
      rencLect5: '\uc815\ub9d0\uc774\uc5d0\uc694? \ud655\uc778\ud574 \uc904\ub798\uc694?',
      fenTitre: '\uc815\ubcf4 \ud655\uc778',
      fenPrenom: '\uc774\ub984',
      fenConfirmer: '\ud655\uc778',
      fenErreur: '1~20\uc790\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
      fenGarcon: '\ub0a8\uc790\uc544\uc774',
      fenFille: '\uc5ec\uc790\uc544\uc774',
      fenHomme: '\ub0a8\uc790 \uc5b4\ub978',
      fenFemme: '\uc5ec\uc790 \uc5b4\ub978',
      compteLect: '\uc9c4\ud589 \uc0c1\ud669\uc744 \uc783\uace0 \uc2f6\uc9c0 \uc54a\ub2e4\uba74 \uacc4\uc815\uc744 \ub9cc\ub4dc\ub294 \uac8c \uc88b\uc544\uc694.',
      compteTitre: '\uc9c4\ud589 \uc0c1\ud669 \uc800\uc7a5',
      compteTexte: '\uc774\uba54\uc77c\ub9cc \uc788\uc73c\uba74 \ub3fc\uc694. \ucf54\ub4dc\ub97c \ubcf4\ub0b4 \ub4dc\ub9ac\ub2c8 \ube44\ubc00\ubc88\ud638\ub294 \ud544\uc694 \uc5c6\uc5b4\uc694.',
      compteCreer: '\uacc4\uc815 \ub9cc\ub4e4\uae30',
      comptePlusTard: '\ub098\uc911\uc5d0',
      suite: '\ub2e4\uc74c',
      sonBouton: '\uc18c\ub9ac',
      astuceClavier: '\ud301: \ud0a4\ubcf4\ub4dc\ub85c \ub2e8\uc5b4\ub97c \uc9c1\uc811 \uc785\ub825\ud560 \uc218\ub3c4 \uc788\uc5b4\uc694.',
      aideBouton: '\ub9ac\ub354: \ub3c4\uc6c0\ub9d0',
      aideInviteTactile: '\ubaa8\ub974\ub294 \uac8c \uc788\uc73c\uba74 \uc800\ub97c \ub20c\ub7ec \ubcf4\uc138\uc694!',
      aideInviteSouris: '\ubaa8\ub974\ub294 \uac8c \uc788\uc73c\uba74 \uc800\ub97c \ud074\ub9ad\ud574 \ubcf4\uc138\uc694!',
      aideTitre: '\ub9ac\ub354\uac00 \uc124\uba85\ud574\uc694',
      aideMots: '\uc774 \uae30\uc5b5 \uc18d\uc758 \ub2e8\uc5b4',
      aideEquiv: '\ub0b4 \uc5b8\uc5b4\ub85c',
      aideFermer: '\ub2eb\uae30'
    },
    vi: {
      sens_je: 't\u00f4i', sens_parle: '(t\u00f4i) n\u00f3i', sens_francais: 'ti\u1ebfng Ph\u00e1p', sens_parles: '(b\u1ea1n) n\u00f3i',
      bekFin: '\u2026nh\u01b0ng m\u00ecnh ch\u1ec9 nh\u1edb \u0111\u01b0\u1ee3c c\u00f3 v\u1eady th\u00f4i.',
      lecteurFin: 'Ch\u1eafc ch\u1eafn c\u00f2n nhi\u1ec1u n\u1eefa\u2026 M\u00ecnh c\u00f3 th\u1ec3 gi\u00fap b\u1ea1n t\u00ecm l\u1ea1i ch\u00fang.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'C\u00e1i g\u00ec kia v\u1eady?',
      rencPensee: 'Ch\u1eafc l\u00e0 AI nh\u1ec9?',
      rencLect1: 'Ch\u00e0o Bek, \u0111\u1ec3 m\u00ecnh t\u1ef1 gi\u1edbi thi\u1ec7u nh\u00e9: m\u00ecnh l\u00e0 Tr\u00ecnh \u0111\u1ecdc.',
      rencLect2: 'M\u00ecnh c\u00f3 th\u1ec3 gi\u00fap b\u1ea1n t\u00ecm l\u1ea1i v\u00e0 d\u1ef1ng l\u1ea1i nh\u1eefng k\u00fd \u1ee9c c\u1ee7a b\u1ea1n.',
      rencLect3: 'M\u1ed9t s\u1ed1 vi\u1ec7c trong \u0111\u00f3 m\u00ecnh c\u1ea7n c\u00f3 m\u1ed9t con ng\u01b0\u1eddi m\u1edbi l\u00e0m \u0111\u01b0\u1ee3c.',
      rencLect4: 'Con ng\u01b0\u1eddi \u01a1i, b\u1ea1n gi\u00fap ch\u00fang m\u00ecnh nh\u00e9?',
      rencReponse: 'C\u00f3 v\u1ebb m\u00ecnh \u0111\u00e2u c\u00f3 quy\u1ec1n ch\u1ecdn nh\u1ec9\u2026',
      rencRecapGarcon: 'C\u1eadu \u1ea5y t\u00ean l\u00e0 {nom}, l\u00e0 m\u1ed9t c\u1eadu b\u00e9.',
      rencRecapFille: 'B\u1ea1n \u1ea5y t\u00ean l\u00e0 {nom}, l\u00e0 m\u1ed9t c\u00f4 b\u00e9.',
      rencRecapHomme: 'Anh \u1ea5y t\u00ean l\u00e0 {nom}, l\u00e0 m\u1ed9t ng\u01b0\u1eddi \u0111\u00e0n \u00f4ng.',
      rencRecapFemme: 'Ch\u1ecb \u1ea5y t\u00ean l\u00e0 {nom}, l\u00e0 m\u1ed9t ng\u01b0\u1eddi ph\u1ee5 n\u1eef.',
      rencLect5: '\u0110\u00fang kh\u00f4ng? B\u1ea1n x\u00e1c nh\u1eadn nh\u00e9?',
      fenTitre: 'Ki\u1ec3m tra th\u00f4ng tin c\u1ee7a b\u1ea1n',
      fenPrenom: 'T\u00ean',
      fenConfirmer: 'X\u00e1c nh\u1eadn',
      fenErreur: 'Nh\u1eadp t\u1eeb 1 \u0111\u1ebfn 20 ch\u1eef c\u00e1i.',
      fenGarcon: 'C\u1eadu b\u00e9',
      fenFille: 'C\u00f4 b\u00e9',
      fenHomme: '\u0110\u00e0n \u00f4ng',
      fenFemme: 'Ph\u1ee5 n\u1eef',
      compteLect: 'N\u1ebfu kh\u00f4ng mu\u1ed1n m\u1ea5t ti\u1ebfn tr\u00ecnh h\u1ecdc, b\u1ea1n n\u00ean ngh\u0129 \u0111\u1ebfn vi\u1ec7c t\u1ea1o m\u1ed9t t\u00e0i kho\u1ea3n.',
      compteTitre: 'Gi\u1eef ti\u1ebfn tr\u00ecnh c\u1ee7a b\u1ea1n',
      compteTexte: 'Ch\u1ec9 c\u1ea7n m\u1ed9t email: ch\u00fang m\u00ecnh g\u1eedi m\u00e3 cho b\u1ea1n, kh\u00f4ng c\u1ea7n m\u1eadt kh\u1ea9u.',
      compteCreer: 'T\u1ea1o t\u00e0i kho\u1ea3n',
      comptePlusTard: '\u0110\u1ec3 sau',
      suite: 'Ti\u1ebfp',
      sonBouton: '\u00c2m thanh',
      astuceClavier: 'M\u1eb9o: b\u1ea1n c\u0169ng c\u00f3 th\u1ec3 g\u00f5 c\u00e1c t\u1eeb b\u1eb1ng b\u00e0n ph\u00edm.',
      aideBouton: 'Tr\u00ecnh \u0111\u1ecdc: tr\u1ee3 gi\u00fap',
      aideInviteTactile: 'Ch\u1ea1m v\u00e0o m\u00ecnh n\u1ebfu b\u1ea1n kh\u00f4ng hi\u1ec3u \u0111i\u1ec1u g\u00ec nh\u00e9!',
      aideInviteSouris: 'Nh\u1ea5p v\u00e0o m\u00ecnh n\u1ebfu b\u1ea1n kh\u00f4ng hi\u1ec3u \u0111i\u1ec1u g\u00ec nh\u00e9!',
      aideTitre: 'Tr\u00ecnh \u0111\u1ecdc gi\u1ea3i th\u00edch',
      aideMots: 'C\u00e1c t\u1eeb trong k\u00fd \u1ee9c n\u00e0y',
      aideEquiv: 'Trong ng\u00f4n ng\u1eef c\u1ee7a b\u1ea1n',
      aideFermer: '\u0110\u00f3ng'
    },
    ht: {
      sens_je: 'mwen', sens_parle: '(mwen) pale', sens_francais: 'frans\u00e8', sens_parles: '(ou) pale',
      bekFin: '\u2026men se s\u00e8lman sa mwen sonje.',
      lecteurFin: 'Dwe gen plis ank\u00f2\u2026 Mwen ka ede w jwenn yo.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Kisa sa a ye?',
      rencPensee: 'Yon IA, mwen sipoze?',
      rencLect1: 'Bonjou Bek, kite m prezante t\u00e8t mwen: mwen se Lekt\u00e8 a.',
      rencLect2: 'Mwen ka ede w jwenn ak rebati souvni w yo.',
      rencLect3: 'Mwen bezwen yon moun pou f\u00e8 k\u00e8k nan travay sa yo.',
      rencLect4: 'Moun, \u00e8ske w vle ede nou?',
      rencReponse: 'Mwen pa gen tw\u00f2p chwa, mwen kw\u00e8\u2026',
      rencRecapGarcon: 'Li rele {nom}, se yon ti gason.',
      rencRecapFille: 'Li rele {nom}, se yon ti fi.',
      rencRecapHomme: 'Li rele {nom}, se yon nonm.',
      rencRecapFemme: 'Li rele {nom}, se yon fanm.',
      rencLect5: 'Se vre? Ou konfime?',
      fenTitre: 'Verifye enf\u00f2masyon ou yo',
      fenPrenom: 'Non',
      fenConfirmer: 'Konfime',
      fenErreur: 'Itilize 1 a 20 l\u00e8t.',
      fenGarcon: 'Ti gason',
      fenFille: 'Ti fi',
      fenHomme: 'Nonm',
      fenFemme: 'Fanm',
      compteLect: 'Si w pa vle p\u00e8di pwogr\u00e8 w, ou ta dwe panse f\u00e8 yon kont.',
      compteTitre: 'Kenbe pwogr\u00e8 w',
      compteTexte: 'Se s\u00e8lman yon im\u00e8l ou bezwen : n ap voye yon k\u00f2d ba ou, san modpas.',
      compteCreer: 'Kreye yon kont',
      comptePlusTard: 'Pita',
      suite: 'Swivan',
      sonBouton: 'Son',
      astuceClavier: 'Kons\u00e8y: ou ka tape mo yo ak klavye a tou.',
      aideBouton: 'Lekt\u00e8 a: \u00e8d',
      aideInviteTactile: 'Touche m si ou pa konprann yon bagay!',
      aideInviteSouris: 'Klike sou mwen si ou pa konprann yon bagay!',
      aideTitre: 'Lekt\u00e8 a eksplike',
      aideMots: 'Mo yo nan souvni sa a',
      aideEquiv: 'Nan lang ou',
      aideFermer: 'F\u00e8men'
    },
    tl: {
      sens_je: 'ako', sens_parle: '(ako) nagsasalita', sens_francais: 'Pranses', sens_parles: '(ikaw) nagsasalita',
      bekFin: '\u2026pero iyan lang ang natatandaan ko.',
      lecteurFin: 'Siguradong may iba pa\u2026 Matutulungan kitang hanapin ang mga ito.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Ano \u2019yan?!',
      rencPensee: 'AI, siguro?',
      rencLect1: 'Kumusta, Bek! Magpapakilala ako: ako ang Tagabasa.',
      rencLect2: 'Matutulungan kitang hanapin at buuin muli ang mga alaala mo.',
      rencLect3: 'Kailangan ko ng isang tao para gawin ang ilan sa mga gawaing ito.',
      rencLect4: 'Tao, tutulungan mo ba kami?',
      rencReponse: 'Mukhang wala naman akong choice\u2026',
      rencRecapGarcon: 'Siya si {nom}, isang batang lalaki.',
      rencRecapFille: 'Siya si {nom}, isang batang babae.',
      rencRecapHomme: 'Siya si {nom}, isang lalaki.',
      rencRecapFemme: 'Siya si {nom}, isang babae.',
      rencLect5: 'Totoo ba? Kinukumpirma mo ba?',
      fenTitre: 'Suriin ang iyong impormasyon',
      fenPrenom: 'Pangalan',
      fenConfirmer: 'Kumpirmahin',
      fenErreur: 'Gumamit ng 1 hanggang 20 titik.',
      fenGarcon: 'Batang lalaki',
      fenFille: 'Batang babae',
      fenHomme: 'Lalaki',
      fenFemme: 'Babae',
      compteLect: 'Kung ayaw mong mawala ang progress mo, mag-isip kang gumawa ng account.',
      compteTitre: 'Itago ang progress mo',
      compteTexte: 'Email lang ang kailangan: padadalhan ka namin ng code, walang password.',
      compteCreer: 'Gumawa ng account',
      comptePlusTard: 'Mamaya na',
      suite: 'Susunod',
      sonBouton: 'Tunog',
      astuceClavier: 'Tip: puwede mo ring i-type ang mga salita gamit ang keyboard.',
      aideBouton: 'Ang Tagabasa: tulong',
      aideInviteTactile: 'I-tap mo ako kung may hindi ka naiintindihan!',
      aideInviteSouris: 'I-click mo ako kung may hindi ka naiintindihan!',
      aideTitre: 'Ipinapaliwanag ng Tagabasa',
      aideMots: 'Mga salita sa alaalang ito',
      aideEquiv: 'Sa wika mo',
      aideFermer: 'Isara'
    },
    id: {
      sens_je: 'saya', sens_parle: '(saya) berbicara', sens_francais: 'bahasa Prancis', sens_parles: '(kamu) berbicara',
      bekFin: '\u2026tapi hanya itu yang kuingat.',
      lecteurFin: 'Pasti masih ada yang lain\u2026 Aku bisa membantumu menemukannya.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Itu apa?!',
      rencPensee: 'AI, mungkin?',
      rencLect1: 'Halo, Bek! Perkenalkan, aku Si Pembaca.',
      rencLect2: 'Aku bisa membantumu menemukan dan menyusun kembali ingatanmu.',
      rencLect3: 'Aku butuh seorang manusia untuk mengerjakan beberapa tugas ini.',
      rencLect4: 'Manusia, maukah kamu membantu kami?',
      rencReponse: 'Kayaknya aku nggak punya pilihan, ya\u2026',
      rencRecapGarcon: 'Namanya {nom}, dia seorang anak laki-laki.',
      rencRecapFille: 'Namanya {nom}, dia seorang anak perempuan.',
      rencRecapHomme: 'Namanya {nom}, dia seorang pria.',
      rencRecapFemme: 'Namanya {nom}, dia seorang wanita.',
      rencLect5: 'Benar begitu? Bisa kamu konfirmasi?',
      fenTitre: 'Periksa datamu',
      fenPrenom: 'Nama',
      fenConfirmer: 'Konfirmasi',
      fenErreur: 'Gunakan 1 sampai 20 huruf.',
      fenGarcon: 'Anak laki-laki',
      fenFille: 'Anak perempuan',
      fenHomme: 'Pria',
      fenFemme: 'Wanita',
      compteLect: 'Kalau kamu tidak mau kehilangan kemajuanmu, sebaiknya kamu membuat akun.',
      compteTitre: 'Simpan kemajuanmu',
      compteTexte: 'Cukup email: kami kirim kode, tanpa kata sandi.',
      compteCreer: 'Buat akun',
      comptePlusTard: 'Nanti saja',
      suite: 'Lanjut',
      sonBouton: 'Suara',
      astuceClavier: 'Tips: kamu juga bisa mengetik kata-katanya dengan keyboard.',
      aideBouton: 'Si Pembaca: bantuan',
      aideInviteTactile: 'Sentuh aku kalau ada yang tidak kamu pahami!',
      aideInviteSouris: 'Klik aku kalau ada yang tidak kamu pahami!',
      aideTitre: 'Si Pembaca menjelaskan',
      aideMots: 'Kata-kata dalam kenangan ini',
      aideEquiv: 'Dalam bahasamu',
      aideFermer: 'Tutup'
    },
    nl: {
      sens_je: 'ik', sens_parle: '(ik) spreek', sens_francais: 'Frans', sens_parles: '(jij) spreekt',
      bekFin: '\u2026maar dat is alles wat ik me herinner.',
      lecteurFin: 'Er moeten er nog meer zijn\u2026 Ik kan je helpen ze te vinden.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Wat is dat nou?!',
      rencPensee: 'Een AI, denk ik?',
      rencLect1: 'Hoi Bek, ik stel me even voor: ik ben de Lezer.',
      rencLect2: 'Ik kan je helpen je herinneringen terug te vinden en weer op te bouwen.',
      rencLect3: 'Voor sommige van die taken heb ik een mens nodig.',
      rencLect4: 'Mens, wil je ons helpen?',
      rencReponse: 'Veel keus heb ik blijkbaar niet\u2026',
      rencRecapGarcon: 'Hij heet {nom}, en het is een jongen.',
      rencRecapFille: 'Ze heet {nom}, en het is een meisje.',
      rencRecapHomme: 'Hij heet {nom}, en het is een man.',
      rencRecapFemme: 'Ze heet {nom}, en het is een vrouw.',
      rencLect5: 'Klopt dat? Bevestig je dat?',
      fenTitre: 'Controleer je gegevens',
      fenPrenom: 'Voornaam',
      fenConfirmer: 'Bevestigen',
      fenErreur: 'Gebruik 1 tot 20 letters.',
      fenGarcon: 'Jongen',
      fenFille: 'Meisje',
      fenHomme: 'Man',
      fenFemme: 'Vrouw',
      compteLect: 'Als je je voortgang niet wilt kwijtraken, moet je eens overwegen een account aan te maken.',
      compteTitre: 'Bewaar je voortgang',
      compteTexte: 'Een e-mailadres is genoeg: we sturen je een code, geen wachtwoord nodig.',
      compteCreer: 'Account aanmaken',
      comptePlusTard: 'Later',
      suite: 'Volgende',
      sonBouton: 'Geluid',
      astuceClavier: 'Tip: je kunt de woorden ook met het toetsenbord typen.',
      aideBouton: 'De Lezer: hulp',
      aideInviteTactile: 'Tik op mij als je iets niet begrijpt!',
      aideInviteSouris: 'Klik op mij als je iets niet begrijpt!',
      aideTitre: 'De Lezer legt uit',
      aideMots: 'De woorden van deze herinnering',
      aideEquiv: 'In jouw taal',
      aideFermer: 'Sluiten'
    },
    de: {
      sens_je: 'ich', sens_parle: '(ich) spreche', sens_francais: 'Franz\u00f6sisch', sens_parles: '(du) sprichst',
      bekFin: '\u2026aber das ist alles, woran ich mich erinnere.',
      lecteurFin: 'Es muss noch mehr geben\u2026 Ich kann dir helfen, sie zu finden.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Was ist das denn?!',
      rencPensee: 'Eine KI, nehme ich an?',
      rencLect1: 'Hallo Bek, ich stelle mich kurz vor: Ich bin der Leser.',
      rencLect2: 'Ich kann dir helfen, deine Erinnerungen wiederzufinden und neu aufzubauen.',
      rencLect3: 'F\u00fcr einige dieser Aufgaben brauche ich einen Menschen.',
      rencLect4: 'Mensch, hilfst du uns?',
      rencReponse: 'Wie es aussieht, habe ich keine Wahl\u2026',
      rencRecapGarcon: 'Er hei\u00dft {nom}, und er ist ein Junge.',
      rencRecapFille: 'Sie hei\u00dft {nom}, und sie ist ein M\u00e4dchen.',
      rencRecapHomme: 'Er hei\u00dft {nom}, und er ist ein Mann.',
      rencRecapFemme: 'Sie hei\u00dft {nom}, und sie ist eine Frau.',
      rencLect5: 'Stimmt das? Best\u00e4tigst du das?',
      fenTitre: 'Pr\u00fcfe deine Angaben',
      fenPrenom: 'Vorname',
      fenConfirmer: 'Best\u00e4tigen',
      fenErreur: 'Verwende 1 bis 20 Buchstaben.',
      fenGarcon: 'Junge',
      fenFille: 'M\u00e4dchen',
      fenHomme: 'Mann',
      fenFemme: 'Frau',
      compteLect: 'Wenn du deinen Fortschritt nicht verlieren willst, solltest du dir \u00fcberlegen, ein Konto anzulegen.',
      compteTitre: 'Fortschritt sichern',
      compteTexte: 'Eine E-Mail gen\u00fcgt: Wir schicken dir einen Code, ein Passwort brauchst du nicht.',
      compteCreer: 'Konto erstellen',
      comptePlusTard: 'Sp\u00e4ter',
      suite: 'Weiter',
      sonBouton: 'Ton',
      astuceClavier: 'Tipp: Du kannst die W\u00f6rter auch mit der Tastatur eingeben.',
      aideBouton: 'Der Leser: Hilfe',
      aideInviteTactile: 'Tipp mich an, wenn du etwas nicht verstehst!',
      aideInviteSouris: 'Klick mich an, wenn du etwas nicht verstehst!',
      aideTitre: 'Der Leser erkl\u00e4rt',
      aideMots: 'Die W\u00f6rter dieser Erinnerung',
      aideEquiv: 'In deiner Sprache',
      aideFermer: 'Schlie\u00dfen'
    },
    fa: {
      sens_je: '\u0645\u0646', sens_parle: '(\u0645\u0646) \u0635\u062d\u0628\u062a \u0645\u06cc\u200c\u06a9\u0646\u0645', sens_francais: '\u0641\u0631\u0627\u0646\u0633\u0648\u06cc', sens_parles: '(\u062a\u0648) \u0635\u062d\u0628\u062a \u0645\u06cc\u200c\u06a9\u0646\u06cc',
      bekFin: '\u2026\u0627\u0645\u0627 \u0641\u0642\u0637 \u0647\u0645\u06cc\u0646 \u0631\u0627 \u0628\u0647 \u06cc\u0627\u062f \u062f\u0627\u0631\u0645.',
      lecteurFin: '\u062d\u062a\u0645\u0627\u064b \u0628\u06cc\u0634\u062a\u0631 \u0627\u0632 \u0627\u06cc\u0646 \u0647\u0645 \u0647\u0633\u062a\u2026 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u0645 \u06a9\u0645\u06a9\u062a \u06a9\u0646\u0645 \u067e\u06cc\u062f\u0627\u06cc\u0634\u0627\u0646 \u06a9\u0646\u06cc.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\u0627\u0648\u0646 \u062f\u06cc\u06af\u0647 \u0686\u06cc\u0647\u061f!',
      rencPensee: '\u06cc\u0647 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc\u060c \u0627\u062d\u062a\u0645\u0627\u0644\u0627\u064b\u061f',
      rencLect1: '\u0633\u0644\u0627\u0645 Bek\u060c \u0628\u0630\u0627\u0631 \u062e\u0648\u062f\u0645\u0648 \u0645\u0639\u0631\u0641\u06cc \u06a9\u0646\u0645: \u0645\u0646 \u00ab\u062e\u0648\u0627\u0646\u0646\u062f\u0647\u00bb \u0647\u0633\u062a\u0645.',
      rencLect2: '\u0645\u06cc\u200c\u062a\u0648\u0646\u0645 \u06a9\u0645\u06a9\u062a \u06a9\u0646\u0645 \u062e\u0627\u0637\u0631\u0647\u200c\u0647\u0627\u062a \u0631\u0648 \u067e\u06cc\u062f\u0627 \u06a9\u0646\u06cc \u0648 \u062f\u0648\u0628\u0627\u0631\u0647 \u0628\u0633\u0627\u0632\u06cc\u0634\u0648\u0646.',
      rencLect3: '\u0628\u0631\u0627\u06cc \u0628\u0639\u0636\u06cc \u0627\u0632 \u0627\u06cc\u0646 \u06a9\u0627\u0631\u0647\u0627 \u0628\u0647 \u06cc\u0647 \u0627\u0646\u0633\u0627\u0646 \u0646\u06cc\u0627\u0632 \u062f\u0627\u0631\u0645.',
      rencLect4: '\u0627\u0646\u0633\u0627\u0646\u060c \u06a9\u0645\u06a9\u0645\u0648\u0646 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u061f',
      rencReponse: '\u0627\u0646\u06af\u0627\u0631 \u0686\u0627\u0631\u0647\u200c\u0627\u06cc \u0646\u062f\u0627\u0631\u0645\u2026',
      rencRecapGarcon: '\u0627\u0633\u0645\u0634 {nom} \u0627\u0633\u062a. \u06cc\u06a9 \u067e\u0633\u0631 \u0627\u0633\u062a.',
      rencRecapFille: '\u0627\u0633\u0645\u0634 {nom} \u0627\u0633\u062a. \u06cc\u06a9 \u062f\u062e\u062a\u0631 \u0627\u0633\u062a.',
      rencRecapHomme: '\u0627\u0633\u0645\u0634 {nom} \u0627\u0633\u062a. \u06cc\u06a9 \u0645\u0631\u062f \u0627\u0633\u062a.',
      rencRecapFemme: '\u0627\u0633\u0645\u0634 {nom} \u0627\u0633\u062a. \u06cc\u06a9 \u0632\u0646 \u0627\u0633\u062a.',
      rencLect5: '\u062f\u0631\u0633\u062a\u0647\u061f \u062a\u0623\u06cc\u06cc\u062f\u0634 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u061f',
      fenTitre: '\u0627\u0637\u0644\u0627\u0639\u0627\u062a\u062a \u0631\u0627 \u0628\u0631\u0631\u0633\u06cc \u06a9\u0646',
      fenPrenom: '\u0646\u0627\u0645',
      fenConfirmer: '\u062a\u0623\u06cc\u06cc\u062f',
      fenErreur: '\u0627\u0632 \u06f1 \u062a\u0627 \u06f2\u06f0 \u062d\u0631\u0641 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646.',
      fenGarcon: '\u067e\u0633\u0631',
      fenFille: '\u062f\u062e\u062a\u0631',
      fenHomme: '\u0645\u0631\u062f',
      fenFemme: '\u0632\u0646',
      compteLect: '\u0627\u06af\u0631 \u0646\u0645\u06cc\u200c\u062e\u0648\u0627\u0647\u06cc \u067e\u06cc\u0634\u0631\u0641\u062a\u062a \u0631\u0627 \u0627\u0632 \u062f\u0633\u062a \u0628\u062f\u0647\u06cc\u060c \u0628\u0647\u062a\u0631 \u0627\u0633\u062a \u0628\u0647 \u0633\u0627\u062e\u062a\u0646 \u06cc\u06a9 \u062d\u0633\u0627\u0628 \u0641\u06a9\u0631 \u06a9\u0646\u06cc.',
      compteTitre: '\u067e\u06cc\u0634\u0631\u0641\u062a\u062a \u0631\u0627 \u0646\u06af\u0647 \u062f\u0627\u0631',
      compteTexte: '\u0641\u0642\u0637 \u06cc\u06a9 \u0627\u06cc\u0645\u06cc\u0644 \u06a9\u0627\u0641\u06cc \u0627\u0633\u062a: \u06cc\u06a9 \u06a9\u062f \u0628\u0631\u0627\u06cc\u062a \u0645\u06cc\u200c\u0641\u0631\u0633\u062a\u06cc\u0645\u060c \u0628\u062f\u0648\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631.',
      compteCreer: '\u0633\u0627\u062e\u062a \u062d\u0633\u0627\u0628',
      comptePlusTard: '\u0628\u0639\u062f\u0627\u064b',
      suite: '\u0628\u0639\u062f\u06cc',
      sonBouton: '\u0635\u062f\u0627',
      astuceClavier: '\u0646\u06a9\u062a\u0647: \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc \u06a9\u0644\u0645\u0647\u200c\u0647\u0627 \u0631\u0627 \u0628\u0627 \u0635\u0641\u062d\u0647\u200c\u06a9\u0644\u06cc\u062f \u0647\u0645 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc.',
      aideBouton: '\u062e\u0648\u0627\u0646\u0646\u062f\u0647: \u0631\u0627\u0647\u0646\u0645\u0627',
      aideInviteTactile: '\u0627\u06af\u0631 \u0686\u06cc\u0632\u06cc \u0631\u0627 \u0646\u0641\u0647\u0645\u06cc\u062f\u06cc\u060c \u0631\u0648\u06cc \u0645\u0646 \u0628\u0632\u0646!',
      aideInviteSouris: '\u0627\u06af\u0631 \u0686\u06cc\u0632\u06cc \u0631\u0627 \u0646\u0641\u0647\u0645\u06cc\u062f\u06cc\u060c \u0631\u0648\u06cc \u0645\u0646 \u06a9\u0644\u06cc\u06a9 \u06a9\u0646!',
      aideTitre: '\u062e\u0648\u0627\u0646\u0646\u062f\u0647 \u062a\u0648\u0636\u06cc\u062d \u0645\u06cc\u200c\u062f\u0647\u062f',
      aideMots: '\u06a9\u0644\u0645\u0647\u200c\u0647\u0627\u06cc \u0627\u06cc\u0646 \u062e\u0627\u0637\u0631\u0647',
      aideEquiv: '\u0628\u0647 \u0632\u0628\u0627\u0646 \u062a\u0648',
      aideFermer: '\u0628\u0633\u062a\u0646'
    },
    sv: {
      sens_je: 'jag', sens_parle: '(jag) talar', sens_francais: 'franska', sens_parles: '(du) talar',
      bekFin: '\u2026men det \u00e4r allt jag minns.',
      lecteurFin: 'Det m\u00e5ste finnas fler\u2026 Jag kan hj\u00e4lpa dig att hitta dem.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Vad \u00e4r det d\u00e4r?!',
      rencPensee: 'En AI, antar jag?',
      rencLect1: 'Hej Bek, jag presenterar mig: jag \u00e4r L\u00e4saren.',
      rencLect2: 'Jag kan hj\u00e4lpa dig att hitta och bygga upp dina minnen igen.',
      rencLect3: 'F\u00f6r n\u00e5gra av de h\u00e4r uppgifterna beh\u00f6ver jag en m\u00e4nniska.',
      rencLect4: 'M\u00e4nniska, vill du hj\u00e4lpa oss?',
      rencReponse: 'Jag har v\u00e4l inget val\u2026',
      rencRecapGarcon: 'Han heter {nom}, och han \u00e4r en pojke.',
      rencRecapFille: 'Hon heter {nom}, och hon \u00e4r en flicka.',
      rencRecapHomme: 'Han heter {nom}, och han \u00e4r en man.',
      rencRecapFemme: 'Hon heter {nom}, och hon \u00e4r en kvinna.',
      rencLect5: 'St\u00e4mmer det? Bekr\u00e4ftar du?',
      fenTitre: 'Kontrollera dina uppgifter',
      fenPrenom: 'F\u00f6rnamn',
      fenConfirmer: 'Bekr\u00e4fta',
      fenErreur: 'Anv\u00e4nd 1 till 20 bokst\u00e4ver.',
      fenGarcon: 'Pojke',
      fenFille: 'Flicka',
      fenHomme: 'Man',
      fenFemme: 'Kvinna',
      compteLect: 'Om du inte vill f\u00f6rlora dina framsteg b\u00f6r du fundera p\u00e5 att skapa ett konto.',
      compteTitre: 'Spara dina framsteg',
      compteTexte: 'Bara en e-postadress: vi skickar en kod, inget l\u00f6senord beh\u00f6vs.',
      compteCreer: 'Skapa konto',
      comptePlusTard: 'Senare',
      suite: 'N\u00e4sta',
      sonBouton: 'Ljud',
      astuceClavier: 'Tips: du kan ocks\u00e5 skriva orden med tangentbordet.',
      aideBouton: 'L\u00e4saren: hj\u00e4lp',
      aideInviteTactile: 'Tryck p\u00e5 mig om du inte f\u00f6rst\u00e5r n\u00e5got!',
      aideInviteSouris: 'Klicka p\u00e5 mig om du inte f\u00f6rst\u00e5r n\u00e5got!',
      aideTitre: 'L\u00e4saren f\u00f6rklarar',
      aideMots: 'Orden i det h\u00e4r minnet',
      aideEquiv: 'P\u00e5 ditt spr\u00e5k',
      aideFermer: 'St\u00e4ng'
    },
    no: {
      sens_je: 'jeg', sens_parle: '(jeg) snakker', sens_francais: 'fransk', sens_parles: '(du) snakker',
      bekFin: '\u2026men det er alt jeg husker.',
      lecteurFin: 'Det m\u00e5 finnes flere\u2026 Jeg kan hjelpe deg med \u00e5 finne dem.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: 'Hva er det der?!',
      rencPensee: 'En KI, antar jeg?',
      rencLect1: 'Hei Bek, la meg presentere meg: jeg er Leseren.',
      rencLect2: 'Jeg kan hjelpe deg med \u00e5 finne og bygge opp minnene dine igjen.',
      rencLect3: 'For noen av disse oppgavene trenger jeg et menneske.',
      rencLect4: 'Menneske, vil du hjelpe oss?',
      rencReponse: 'Jeg har vel ikke noe valg\u2026',
      rencRecapGarcon: 'Han heter {nom}, og han er en gutt.',
      rencRecapFille: 'Hun heter {nom}, og hun er en jente.',
      rencRecapHomme: 'Han heter {nom}, og han er en mann.',
      rencRecapFemme: 'Hun heter {nom}, og hun er en kvinne.',
      rencLect5: 'Stemmer det? Bekrefter du?',
      fenTitre: 'Sjekk opplysningene dine',
      fenPrenom: 'Fornavn',
      fenConfirmer: 'Bekreft',
      fenErreur: 'Bruk 1 til 20 bokstaver.',
      fenGarcon: 'Gutt',
      fenFille: 'Jente',
      fenHomme: 'Mann',
      fenFemme: 'Kvinne',
      compteLect: 'Hvis du ikke vil miste fremgangen din, b\u00f8r du tenke p\u00e5 \u00e5 lage en konto.',
      compteTitre: 'Behold fremgangen din',
      compteTexte: 'Bare en e-postadresse: vi sender deg en kode, uten passord.',
      compteCreer: 'Opprett konto',
      comptePlusTard: 'Senere',
      suite: 'Neste',
      sonBouton: 'Lyd',
      astuceClavier: 'Tips: du kan ogs\u00e5 skrive ordene med tastaturet.',
      aideBouton: 'Leseren: hjelp',
      aideInviteTactile: 'Trykk p\u00e5 meg hvis du ikke forst\u00e5r noe!',
      aideInviteSouris: 'Klikk p\u00e5 meg hvis du ikke forst\u00e5r noe!',
      aideTitre: 'Leseren forklarer',
      aideMots: 'Ordene i dette minnet',
      aideEquiv: 'P\u00e5 ditt spr\u00e5k',
      aideFermer: 'Lukk'
    },
    ru: {
      sens_je: '\u044f', sens_parle: '(\u044f) \u0433\u043e\u0432\u043e\u0440\u044e', sens_francais: '\u0444\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a', sens_parles: '(\u0442\u044b) \u0433\u043e\u0432\u043e\u0440\u0438\u0448\u044c',
      bekFin: '\u2026\u043d\u043e \u044d\u0442\u043e \u0432\u0441\u0451, \u0447\u0442\u043e \u044f \u043f\u043e\u043c\u043d\u044e.',
      lecteurFin: '\u0414\u043e\u043b\u0436\u043d\u044b \u0431\u044b\u0442\u044c \u0438 \u0434\u0440\u0443\u0433\u0438\u0435\u2026 \u042f \u043c\u043e\u0433\u0443 \u043f\u043e\u043c\u043e\u0447\u044c \u0442\u0435\u0431\u0435 \u0438\u0445 \u043d\u0430\u0439\u0442\u0438.',
      // 🆕 Rencontre avec le Lecteur — rendu vivant par langue (pas de traduction littérale)
      rencBekQuoi: '\u042d\u0442\u043e \u0435\u0449\u0451 \u0447\u0442\u043e \u0442\u0430\u043a\u043e\u0435?!',
      rencPensee: '\u0418\u0418, \u043d\u0430\u0432\u0435\u0440\u043d\u043e\u0435?',
      rencLect1: '\u041f\u0440\u0438\u0432\u0435\u0442, Bek! \u041f\u043e\u0437\u0432\u043e\u043b\u044c \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u044c\u0441\u044f: \u044f \u2014 \u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044c.',
      rencLect2: '\u042f \u043c\u043e\u0433\u0443 \u043f\u043e\u043c\u043e\u0447\u044c \u0442\u0435\u0431\u0435 \u043d\u0430\u0439\u0442\u0438 \u0438 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0432\u043e\u0438 \u0432\u043e\u0441\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u044f.',
      rencLect3: '\u0414\u043b\u044f \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0438\u0437 \u044d\u0442\u0438\u0445 \u0437\u0430\u0434\u0430\u0447 \u043c\u043d\u0435 \u043d\u0443\u0436\u0435\u043d \u0447\u0435\u043b\u043e\u0432\u0435\u043a.',
      rencLect4: '\u0427\u0435\u043b\u043e\u0432\u0435\u043a, \u043f\u043e\u043c\u043e\u0436\u0435\u0448\u044c \u043d\u0430\u043c?',
      rencReponse: '\u041f\u043e\u0445\u043e\u0436\u0435, \u0432\u044b\u0431\u043e\u0440\u0430 \u0443 \u043c\u0435\u043d\u044f \u043d\u0435\u0442\u2026',
      rencRecapGarcon: '\u0415\u0433\u043e \u0437\u043e\u0432\u0443\u0442 {nom}, \u043e\u043d \u043c\u0430\u043b\u044c\u0447\u0438\u043a.',
      rencRecapFille: '\u0415\u0451 \u0437\u043e\u0432\u0443\u0442 {nom}, \u043e\u043d\u0430 \u0434\u0435\u0432\u043e\u0447\u043a\u0430.',
      rencRecapHomme: '\u0415\u0433\u043e \u0437\u043e\u0432\u0443\u0442 {nom}, \u043e\u043d \u043c\u0443\u0436\u0447\u0438\u043d\u0430.',
      rencRecapFemme: '\u0415\u0451 \u0437\u043e\u0432\u0443\u0442 {nom}, \u043e\u043d\u0430 \u0436\u0435\u043d\u0449\u0438\u043d\u0430.',
      rencLect5: '\u042d\u0442\u043e \u043f\u0440\u0430\u0432\u0434\u0430? \u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0448\u044c?',
      fenTitre: '\u041f\u0440\u043e\u0432\u0435\u0440\u044c \u0441\u0432\u043e\u0438 \u0434\u0430\u043d\u043d\u044b\u0435',
      fenPrenom: '\u0418\u043c\u044f',
      fenConfirmer: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c',
      fenErreur: '\u041e\u0442 1 \u0434\u043e 20 \u0431\u0443\u043a\u0432.',
      fenGarcon: '\u041c\u0430\u043b\u044c\u0447\u0438\u043a',
      fenFille: '\u0414\u0435\u0432\u043e\u0447\u043a\u0430',
      fenHomme: '\u041c\u0443\u0436\u0447\u0438\u043d\u0430',
      fenFemme: '\u0416\u0435\u043d\u0449\u0438\u043d\u0430',
      compteLect: '\u0415\u0441\u043b\u0438 \u043d\u0435 \u0445\u043e\u0447\u0435\u0448\u044c \u043f\u043e\u0442\u0435\u0440\u044f\u0442\u044c \u0441\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441, \u043f\u043e\u0434\u0443\u043c\u0430\u0439 \u043e \u0442\u043e\u043c, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442.',
      compteTitre: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438 \u0441\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441',
      compteTexte: '\u0414\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b: \u043c\u044b \u043f\u0440\u0438\u0448\u043b\u0451\u043c \u043a\u043e\u0434, \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043d\u0443\u0436\u0435\u043d.',
      compteCreer: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442',
      comptePlusTard: '\u041f\u043e\u0437\u0436\u0435',
      suite: '\u0414\u0430\u043b\u044c\u0448\u0435',
      sonBouton: '\u0417\u0432\u0443\u043a',
      astuceClavier: '\u041f\u043e\u0434\u0441\u043a\u0430\u0437\u043a\u0430: \u0441\u043b\u043e\u0432\u0430 \u043c\u043e\u0436\u043d\u043e \u0432\u0432\u043e\u0434\u0438\u0442\u044c \u0438 \u0441 \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044b.',
      aideBouton: '\u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044c: \u043f\u043e\u043c\u043e\u0449\u044c',
      aideInviteTactile: '\u041a\u043e\u0441\u043d\u0438\u0441\u044c \u043c\u0435\u043d\u044f, \u0435\u0441\u043b\u0438 \u0447\u0442\u043e-\u0442\u043e \u043d\u0435\u043f\u043e\u043d\u044f\u0442\u043d\u043e!',
      aideInviteSouris: '\u041d\u0430\u0436\u043c\u0438 \u043d\u0430 \u043c\u0435\u043d\u044f, \u0435\u0441\u043b\u0438 \u0447\u0442\u043e-\u0442\u043e \u043d\u0435\u043f\u043e\u043d\u044f\u0442\u043d\u043e!',
      aideTitre: '\u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044c \u043e\u0431\u044a\u044f\u0441\u043d\u044f\u0435\u0442',
      aideMots: '\u0421\u043b\u043e\u0432\u0430 \u0438\u0437 \u044d\u0442\u043e\u0433\u043e \u0432\u043e\u0441\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u044f',
      aideEquiv: '\u041d\u0430 \u0442\u0432\u043e\u0451\u043c \u044f\u0437\u044b\u043a\u0435',
      aideFermer: '\u0417\u0430\u043a\u0440\u044b\u0442\u044c'
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
    },
    it: {
      je: {
        nature: 'Pronome personale \u00b7 1\u00aa persona singolare',
        equiv: 'io',
        texte: ['Indica la persona che parla.', 'In italiano si dice quasi sempre \u00abparlo\u00bb, senza \u00abio\u00bb, perch\u00e9 il verbo lo indica gi\u00e0. In francese il pronome \u00e8 obbligatorio: je parle. Davanti a una vocale diventa j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verbo \u00b7 presente',
        texte: ['Il verbo parler (parlare), al presente con \u00abje\u00bb.'],
        formes: [['parler', 'infinito: il verbo non coniugato'], ['je parle', '\u00abio parlo\u00bb. La -e finale non si pronuncia']]
      },
      francais: {
        nature: 'Nome \u00b7 maschile',
        equiv: 'francese',
        texte: ['Qui indica una lingua.', 'Come in italiano, i nomi delle lingue sono maschili (le fran\u00e7ais, il francese) e si scrivono con l\u2019iniziale minuscola.']
      },
      parles: {
        nature: 'Verbo \u00b7 presente',
        texte: ['Il verbo parler con \u00abtu\u00bb: tu parles.', 'Con \u00abje\u00bb si dice je parle, senza -s.']
      }
    },
    pt: {
      je: {
        nature: 'Pronome pessoal \u00b7 1\u00aa pessoa do singular',
        equiv: 'eu',
        texte: ['Representa a pessoa que fala.', 'Em portugu\u00eas, o \u00abeu\u00bb pode ser omitido, porque o verbo j\u00e1 indica a pessoa (falo). Em franc\u00eas o pronome \u00e9 obrigat\u00f3rio: je parle. Diante de vogal, torna-se j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verbo \u00b7 presente',
        texte: ['O verbo parler (falar), no presente com \u00abje\u00bb.'],
        formes: [['parler', 'infinitivo: o verbo sem conjugar'], ['je parle', '\u00abeu falo\u00bb. O -e final n\u00e3o se pronuncia']]
      },
      francais: {
        nature: 'Substantivo \u00b7 masculino',
        equiv: 'franc\u00eas',
        texte: ['Aqui, nomeia uma l\u00edngua.', 'Como em portugu\u00eas, os nomes de l\u00ednguas s\u00e3o masculinos (le fran\u00e7ais, o franc\u00eas) e se escrevem com inicial min\u00fascula.']
      },
      parles: {
        nature: 'Verbo \u00b7 presente',
        texte: ['O verbo parler com \u00abtu\u00bb: tu parles.', 'Com \u00abje\u00bb, diz-se je parle, sem -s.']
      }
    },
    ca: {
      je: {
        nature: 'Pronom personal \u00b7 1a persona del singular',
        equiv: 'jo',
        texte: ['Representa la persona que parla.', 'En catal\u00e0 gaireb\u00e9 mai no es diu \u00abjo\u00bb, perqu\u00e8 el verb ja ho indica (parlo). En franc\u00e8s el pronom \u00e9s obligatori: je parle. Davant d\u2019una vocal esdev\u00e9 j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verb \u00b7 present',
        texte: ['El verb parler (parlar), en present amb \u00abje\u00bb.'],
        formes: [['parler', 'infinitiu: el verb sense conjugar'], ['je parle', '\u00abjo parlo\u00bb. La -e final no es pronuncia']]
      },
      francais: {
        nature: 'Nom \u00b7 mascul\u00ed',
        equiv: 'franc\u00e8s',
        texte: ['Aqu\u00ed anomena una llengua.', 'Com en catal\u00e0, els noms de lleng\u00fces s\u00f3n masculins (le fran\u00e7ais, el franc\u00e8s) i s\u2019escriuen amb min\u00fascula.']
      },
      parles: {
        nature: 'Verb \u00b7 present',
        texte: ['El verb parler amb \u00abtu\u00bb: tu parles.', 'Igual que en catal\u00e0: tu parles. Amb \u00abje\u00bb, per\u00f2, es diu je parle, sense -s.']
      }
    },
    eo: {
      je: {
        nature: 'Persona pronomo \u00b7 unua persono, singulara',
        equiv: 'mi',
        texte: ['\u011ci signifas la parolantan personon.', 'En Esperanto la verbo ne \u015dan\u011di\u011das la\u016d la persono (mi parolas, vi parolas). En la franca \u011di \u015dan\u011di\u011das, kaj la pronomo estas deviga: je parle. Anta\u016d vokalo \u011di fari\u011das j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verbo \u00b7 prezenco',
        texte: ['La verbo parler (paroli), en la prezenco kun \u00abje\u00bb.'],
        formes: [['parler', 'infinitivo: la neflekcita verbo'], ['je parle', '\u00abmi parolas\u00bb. La fina -e ne prononci\u011das']]
      },
      francais: {
        nature: 'Substantivo \u00b7 maskla',
        equiv: 'la franca',
        texte: ['\u0108i tie \u011di nomas lingvon.', 'En la franca \u0109iu substantivo estas vira a\u016d virina; Esperanto ne konas gramatikan genron. Lingvonomoj estas viraj: le fran\u00e7ais.', 'Kiel en Esperanto, ili skribi\u011das per malgranda litero.']
      },
      parles: {
        nature: 'Verbo \u00b7 prezenco',
        texte: ['La verbo parler kun \u00abtu\u00bb: tu parles.', 'Kun \u00abje\u00bb oni diras je parle, sen -s.']
      }
    },
    zh: {
      je: {
        nature: '\u4eba\u79f0\u4ee3\u8bcd \u00b7 \u7b2c\u4e00\u4eba\u79f0\u5355\u6570',
        equiv: '\u6211',
        texte: ['\u6307\u8bf4\u8bdd\u7684\u4eba\u3002', '\u6c49\u8bed\u91cc\u5e38\u5e38\u7701\u7565\u4e3b\u8bed\uff0c\u4f46\u6cd5\u8bed\u7684\u52a8\u8bcd\u4f1a\u968f\u4eba\u79f0\u53d8\u5316\uff0c\u4e3b\u8bed\u4ee3\u8bcd\u4e0d\u80fd\u7701\uff1aje parle\u3002\u5728\u5143\u97f3\u524d\uff0cje \u8981\u7f29\u5199\u6210 j\u2019\uff1aj\u2019aime\u3002']
      },
      parle: {
        nature: '\u52a8\u8bcd \u00b7 \u73b0\u5728\u65f6',
        texte: ['\u52a8\u8bcd parler\uff08\u8bf4\uff0c\u8bb2\uff09\uff0c\u4e0e\u201cje\u201d\u642d\u914d\u7684\u73b0\u5728\u65f6\u3002'],
        formes: [['parler', '\u4e0d\u5b9a\u5f0f\uff1a\u672a\u53d8\u4f4d\u7684\u52a8\u8bcd\u539f\u5f62'], ['je parle', '\u201c\u6211\u8bf4\u201d\u3002\u7ed3\u5c3e\u7684 -e \u4e0d\u53d1\u97f3']]
      },
      francais: {
        nature: '\u540d\u8bcd \u00b7 \u9633\u6027',
        equiv: '\u6cd5\u8bed',
        texte: ['\u8fd9\u91cc\u6307\u4e00\u79cd\u8bed\u8a00\u3002', '\u6cd5\u8bed\u7684\u540d\u8bcd\u5206\u9634\u6027\u548c\u9633\u6027\uff0c\u6c49\u8bed\u6ca1\u6709\u8fd9\u79cd\u533a\u522b\u3002\u8bed\u8a00\u7684\u540d\u79f0\u90fd\u662f\u9633\u6027\uff1ale fran\u00e7ais\u3002', '\u6cd5\u8bed\u4e2d\u8bed\u8a00\u540d\u79f0\u4e0d\u5927\u5199\u3002']
      },
      parles: {
        nature: '\u52a8\u8bcd \u00b7 \u73b0\u5728\u65f6',
        texte: ['\u52a8\u8bcd parler \u4e0e\u201ctu\u201d\uff08\u4f60\uff09\u642d\u914d\uff1atu parles\u3002', '\u4e0e\u201cje\u201d\u642d\u914d\u65f6\u662f je parle\uff0c\u6ca1\u6709 -s\u3002']
      }
    },
    ja: {
      je: {
        nature: '\u4eba\u79f0\u4ee3\u540d\u8a5e \u00b7 1\u4eba\u79f0\u5358\u6570',
        equiv: '\u79c1',
        texte: ['\u8a71\u3057\u3066\u3044\u308b\u4eba\u3092\u6307\u3057\u307e\u3059\u3002', '\u65e5\u672c\u8a9e\u3067\u306f\u300c\u79c1\u300d\u3092\u3088\u304f\u7701\u7565\u3057\u307e\u3059\u304c\u3001\u30d5\u30e9\u30f3\u30b9\u8a9e\u3067\u306f\u4e3b\u8a9e\u304c\u5fc5\u8981\u3067\u3059\uff1aje parle\u3002\u6bcd\u97f3\u306e\u524d\u3067\u306f j\u2019 \u306b\u306a\u308a\u307e\u3059\uff1aj\u2019aime\u3002']
      },
      parle: {
        nature: '\u52d5\u8a5e \u00b7 \u73fe\u5728\u5f62',
        texte: ['\u52d5\u8a5e parler\uff08\u8a71\u3059\uff09\u306e\u3001\u300cje\u300d\u306b\u5408\u308f\u305b\u305f\u73fe\u5728\u5f62\u3067\u3059\u3002'],
        formes: [['parler', '\u4e0d\u5b9a\u8a5e\uff1a\u6d3b\u7528\u3057\u3066\u3044\u306a\u3044\u52d5\u8a5e\u306e\u5f62'], ['je parle', '\u300c\u79c1\u306f\u8a71\u3059\u300d\u3002\u8a9e\u672b\u306e -e \u306f\u767a\u97f3\u3057\u307e\u305b\u3093']]
      },
      francais: {
        nature: '\u540d\u8a5e \u00b7 \u7537\u6027',
        equiv: '\u30d5\u30e9\u30f3\u30b9\u8a9e',
        texte: ['\u3053\u3053\u3067\u306f\u8a00\u8a9e\u306e\u540d\u524d\u3067\u3059\u3002', '\u30d5\u30e9\u30f3\u30b9\u8a9e\u306e\u540d\u8a5e\u306b\u306f\u7537\u6027\u30fb\u5973\u6027\u304c\u3042\u308a\u307e\u3059\u3002\u65e5\u672c\u8a9e\u306b\u306f\u306a\u3044\u533a\u5225\u3067\u3059\u3002\u8a00\u8a9e\u306e\u540d\u524d\u306f\u3059\u3079\u3066\u7537\u6027\uff1ale fran\u00e7ais\u3002', '\u307e\u305f\u3001\u30d5\u30e9\u30f3\u30b9\u8a9e\u3067\u306f\u8a00\u8a9e\u306e\u540d\u524d\u3092\u5c0f\u6587\u5b57\u3067\u66f8\u304d\u307e\u3059\u3002']
      },
      parles: {
        nature: '\u52d5\u8a5e \u00b7 \u73fe\u5728\u5f62',
        texte: ['\u52d5\u8a5e parler \u3092\u300ctu\u300d\uff08\u304d\u307f\uff09\u306b\u5408\u308f\u305b\u305f\u5f62\uff1atu parles\u3002', '\u300cje\u300d\u306e\u3068\u304d\u306f je parle \u3067\u3001-s \u306f\u3064\u304d\u307e\u305b\u3093\u3002']
      }
    },
    ko: {
      je: {
        nature: '\uc778\uce6d\ub300\uba85\uc0ac \u00b7 1\uc778\uce6d \ub2e8\uc218',
        equiv: '\ub098',
        texte: ['\ub9d0\ud558\ub294 \uc0ac\ub78c\uc744 \uac00\ub9ac\ucf1c\uc694.', '\ud55c\uad6d\uc5b4\uc5d0\uc11c\ub294 \u201c\ub098\u201d\ub97c \uc790\uc8fc \uc0dd\ub7b5\ud558\uc9c0\ub9cc, \ud504\ub791\uc2a4\uc5b4\uc5d0\uc11c\ub294 \uc8fc\uc5b4\uac00 \uaf2d \ud544\uc694\ud574\uc694: je parle. \ubaa8\uc74c \uc55e\uc5d0\uc11c\ub294 j\u2019\ub85c \uc904\uc5b4\uc694: j\u2019aime.']
      },
      parle: {
        nature: '\ub3d9\uc0ac \u00b7 \ud604\uc7ac\ud615',
        texte: ['\ub3d9\uc0ac parler(\ub9d0\ud558\ub2e4)\ub97c \u201cje\u201d\uc5d0 \ub9de\ucdb0 \ud604\uc7ac\ud615\uc73c\ub85c \uc4f4 \uac70\uc608\uc694.'],
        formes: [['parler', '\ubd80\uc815\uc0ac: \ud65c\uc6a9\ud558\uc9c0 \uc54a\uc740 \ub3d9\uc0ac \uc6d0\ud615'], ['je parle', '\u201c\ub098\ub294 \ub9d0\ud574\uc694\u201d. \ub05d\uc758 -e\ub294 \ubc1c\uc74c\ud558\uc9c0 \uc54a\uc544\uc694']]
      },
      francais: {
        nature: '\uba85\uc0ac \u00b7 \ub0a8\uc131',
        equiv: '\ud504\ub791\uc2a4\uc5b4',
        texte: ['\uc5ec\uae30\uc11c\ub294 \uc5b8\uc5b4\uc758 \uc774\ub984\uc774\uc5d0\uc694.', '\ud504\ub791\uc2a4\uc5b4 \uba85\uc0ac\uc5d0\ub294 \ub0a8\uc131\uacfc \uc5ec\uc131\uc774 \uc788\uc5b4\uc694. \ud55c\uad6d\uc5b4\uc5d0\ub294 \uc5c6\ub294 \uad6c\ubd84\uc774\uc8e0. \uc5b8\uc5b4 \uc774\ub984\uc740 \ubaa8\ub450 \ub0a8\uc131\uc774\uc5d0\uc694: le fran\u00e7ais.', '\uadf8\ub9ac\uace0 \ud504\ub791\uc2a4\uc5b4\uc5d0\uc11c\ub294 \uc5b8\uc5b4 \uc774\ub984\uc744 \uc18c\ubb38\uc790\ub85c \uc368\uc694.']
      },
      parles: {
        nature: '\ub3d9\uc0ac \u00b7 \ud604\uc7ac\ud615',
        texte: ['\ub3d9\uc0ac parler\ub97c \u201ctu\u201d(\ub108)\uc5d0 \ub9de\ucd98 \ud615\ud0dc: tu parles.', '\u201cje\u201d\uc77c \ub54c\ub294 je parle\ub85c, -s\uac00 \ubd99\uc9c0 \uc54a\uc544\uc694.']
      }
    },
    vi: {
      je: {
        nature: '\u0110\u1ea1i t\u1eeb nh\u00e2n x\u01b0ng \u00b7 ng\u00f4i th\u1ee9 nh\u1ea5t s\u1ed1 \u00edt',
        equiv: 't\u00f4i',
        texte: ['Ch\u1ec9 ng\u01b0\u1eddi \u0111ang n\u00f3i.', 'Ti\u1ebfng Vi\u1ec7t c\u00f3 th\u1ec3 b\u1ecf ch\u1ee7 ng\u1eef khi \u0111\u00e3 r\u00f5, nh\u01b0ng ti\u1ebfng Ph\u00e1p th\u00ec b\u1eaft bu\u1ed9c ph\u1ea3i c\u00f3: je parle. Tr\u01b0\u1edbc nguy\u00ean \u00e2m, je th\u00e0nh j\u2019: j\u2019aime.']
      },
      parle: {
        nature: '\u0110\u1ed9ng t\u1eeb \u00b7 hi\u1ec7n t\u1ea1i',
        texte: ['\u0110\u1ed9ng t\u1eeb parler (n\u00f3i), chia \u1edf th\u00ec hi\u1ec7n t\u1ea1i v\u1edbi \u201cje\u201d.'],
        formes: [['parler', 'nguy\u00ean m\u1eabu: \u0111\u1ed9ng t\u1eeb ch\u01b0a chia'], ['je parle', '\u201ct\u00f4i n\u00f3i\u201d. Ch\u1eef -e \u1edf cu\u1ed1i kh\u00f4ng \u0111\u1ecdc']]
      },
      francais: {
        nature: 'Danh t\u1eeb \u00b7 gi\u1ed1ng \u0111\u1ef1c',
        equiv: 'ti\u1ebfng Ph\u00e1p',
        texte: ['\u1ede \u0111\u00e2y n\u00f3 ch\u1ec9 m\u1ed9t ng\u00f4n ng\u1eef.', 'Danh t\u1eeb ti\u1ebfng Ph\u00e1p c\u00f3 gi\u1ed1ng \u0111\u1ef1c v\u00e0 gi\u1ed1ng c\u00e1i, c\u00f2n ti\u1ebfng Vi\u1ec7t th\u00ec kh\u00f4ng. T\u00ean c\u00e1c ng\u00f4n ng\u1eef \u0111\u1ec1u l\u00e0 gi\u1ed1ng \u0111\u1ef1c: le fran\u00e7ais.', 'V\u00e0 trong ti\u1ebfng Ph\u00e1p, t\u00ean ng\u00f4n ng\u1eef kh\u00f4ng vi\u1ebft hoa.']
      },
      parles: {
        nature: '\u0110\u1ed9ng t\u1eeb \u00b7 hi\u1ec7n t\u1ea1i',
        texte: ['\u0110\u1ed9ng t\u1eeb parler chia v\u1edbi \u201ctu\u201d (b\u1ea1n): tu parles.', 'V\u1edbi \u201cje\u201d th\u00ec n\u00f3i je parle, kh\u00f4ng c\u00f3 -s.']
      }
    },
    ht: {
      je: {
        nature: 'Pwonon p\u00e8son\u00e8l \u00b7 1ye p\u00e8s\u00f2n sengilye',
        equiv: 'mwen',
        texte: ['Li reprezante moun k ap pale a.', 'An frans\u00e8, pwonon an obligatwa: je parle. Devan yon vway\u00e8l, je vin j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'V\u00e8b \u00b7 prezan',
        texte: ['V\u00e8b parler (pale), nan tan prezan ak \u00ab je \u00bb.'],
        formes: [['parler', 'enfinitif: v\u00e8b la san konjigezon'], ['je parle', '\u00ab mwen pale \u00bb. L\u00e8t -e a nan fen an pa pwononse']]
      },
      francais: {
        nature: 'Non \u00b7 maskilen',
        equiv: 'frans\u00e8',
        texte: ['Isit la, li bay non yon lang.', 'An frans\u00e8, chak non se maskilen oswa fenmen; krey\u00f2l pa f\u00e8 diferans sa a. Tout non lang yo maskilen: le fran\u00e7ais.', 'An frans\u00e8, non lang yo pa k\u00f2manse ak yon l\u00e8t majiskil.']
      },
      parles: {
        nature: 'V\u00e8b \u00b7 prezan',
        texte: ['V\u00e8b parler ak \u00ab tu \u00bb: tu parles.', 'An krey\u00f2l v\u00e8b la rete menm (mwen pale, ou pale), men an frans\u00e8 li chanje: je parle, tu parles.']
      }
    },
    tl: {
      je: {
        nature: 'Panghalip na panao \u00b7 unang panauhan, isahan',
        equiv: 'ako',
        texte: ['Tumutukoy ito sa taong nagsasalita.', 'Sa Pranses, kailangang laging may panghalip na paksa: je parle. Bago ang patinig, nagiging j\u2019 ito: j\u2019aime.']
      },
      parle: {
        nature: 'Pandiwa \u00b7 kasalukuyan',
        texte: ['Ang pandiwang parler (magsalita), sa kasalukuyang panahunan kasama ang \u00abje\u00bb.'],
        formes: [['parler', 'pawatas: ang pandiwang hindi pa binabanghay'], ['je parle', '\u00abnagsasalita ako\u00bb. Hindi binibigkas ang -e sa dulo']]
      },
      francais: {
        nature: 'Pangngalan \u00b7 panlalaki',
        equiv: 'Pranses',
        texte: ['Dito, pangalan ito ng isang wika.', 'May panlalaki at pambabae ang mga pangngalang Pranses; walang ganito sa Tagalog. Panlalaki ang lahat ng pangalan ng wika: le fran\u00e7ais.', 'Sa Pranses, hindi nagsisimula sa malaking titik ang pangalan ng wika, hindi tulad ng \u201cPranses\u201d sa Tagalog.']
      },
      parles: {
        nature: 'Pandiwa \u00b7 kasalukuyan',
        texte: ['Ang pandiwang parler kasama ang \u00abtu\u00bb (ikaw): tu parles.', 'Kapag \u00abje\u00bb, je parle ang sinasabi, walang -s.']
      }
    },
    id: {
      je: {
        nature: 'Kata ganti orang \u00b7 orang pertama tunggal',
        equiv: 'saya',
        texte: ['Merujuk pada orang yang berbicara.', 'Dalam bahasa Indonesia, subjek sering dihilangkan, tetapi dalam bahasa Prancis subjek wajib ada: je parle. Sebelum huruf vokal, je menjadi j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Kata kerja \u00b7 kala kini',
        texte: ['Kata kerja parler (berbicara), dalam kala kini bersama \u00abje\u00bb.'],
        formes: [['parler', 'infinitif: kata kerja yang belum dikonjugasi'], ['je parle', '\u00absaya berbicara\u00bb. Huruf -e di akhir tidak dibaca']]
      },
      francais: {
        nature: 'Kata benda \u00b7 maskulin',
        equiv: 'bahasa Prancis',
        texte: ['Di sini, kata ini menyebut sebuah bahasa.', 'Kata benda bahasa Prancis bersifat maskulin atau feminin, sedangkan bahasa Indonesia tidak mengenal gender. Nama bahasa selalu maskulin: le fran\u00e7ais.', 'Dan dalam bahasa Prancis, nama bahasa ditulis dengan huruf kecil.']
      },
      parles: {
        nature: 'Kata kerja \u00b7 kala kini',
        texte: ['Kata kerja parler bersama \u00abtu\u00bb (kamu): tu parles.', 'Dengan \u00abje\u00bb, bentuknya je parle, tanpa -s.']
      }
    },
    nl: {
      je: {
        nature: 'Persoonlijk voornaamwoord \u00b7 eerste persoon enkelvoud',
        equiv: 'ik',
        texte: ['Het verwijst naar de persoon die spreekt.', 'Net als in het Nederlands moet het voornaamwoord er staan: je parle. V\u00f3\u00f3r een klinker wordt je j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Werkwoord \u00b7 tegenwoordige tijd',
        texte: ['Het werkwoord parler (spreken), in de tegenwoordige tijd bij \u00abje\u00bb.'],
        formes: [['parler', 'infinitief: het werkwoord zonder vervoeging'], ['je parle', '\u00abik spreek\u00bb. De -e aan het eind wordt niet uitgesproken']]
      },
      francais: {
        nature: 'Zelfstandig naamwoord \u00b7 mannelijk',
        equiv: 'Frans',
        texte: ['Hier is het de naam van een taal.', 'Franse zelfstandige naamwoorden zijn mannelijk of vrouwelijk; in het Nederlands heb je de- en het-woorden. Talen zijn mannelijk: le fran\u00e7ais.', 'En anders dan in het Nederlands krijgen namen van talen in het Frans geen hoofdletter.']
      },
      parles: {
        nature: 'Werkwoord \u00b7 tegenwoordige tijd',
        texte: ['Het werkwoord parler bij \u00abtu\u00bb (jij): tu parles.', 'Bij \u00abje\u00bb zeg je je parle, zonder -s.']
      }
    },
    de: {
      je: {
        nature: 'Personalpronomen \u00b7 1. Person Singular',
        equiv: 'ich',
        texte: ['Es steht f\u00fcr die Person, die spricht.', 'Wie im Deutschen muss das Pronomen stehen: je parle. Vor einem Vokal wird je zu j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verb \u00b7 Pr\u00e4sens',
        texte: ['Das Verb parler (sprechen), im Pr\u00e4sens mit \u201eje\u201c.'],
        formes: [['parler', 'Infinitiv: das Verb ohne Beugung'], ['je parle', '\u201eich spreche\u201c. Das -e am Ende spricht man nicht mit']]
      },
      francais: {
        nature: 'Substantiv \u00b7 maskulin',
        equiv: 'Franz\u00f6sisch',
        texte: ['Hier bezeichnet es eine Sprache.', 'Franz\u00f6sische Substantive sind m\u00e4nnlich oder weiblich (im Deutschen gibt es au\u00dferdem s\u00e4chlich). Sprachen sind m\u00e4nnlich: le fran\u00e7ais.', 'Und anders als im Deutschen schreibt man Sprachnamen im Franz\u00f6sischen klein.']
      },
      parles: {
        nature: 'Verb \u00b7 Pr\u00e4sens',
        texte: ['Das Verb parler mit \u201etu\u201c (du): tu parles.', 'Mit \u201eje\u201c hei\u00dft es je parle, ohne -s.']
      }
    },
    fa: {
      je: {
        nature: '\u0636\u0645\u06cc\u0631 \u0634\u062e\u0635\u06cc \u00b7 \u0627\u0648\u0644 \u0634\u062e\u0635 \u0645\u0641\u0631\u062f',
        equiv: '\u0645\u0646',
        texte: ['\u0628\u0647 \u06a9\u0633\u06cc \u0627\u0634\u0627\u0631\u0647 \u062f\u0627\u0631\u062f \u06a9\u0647 \u0635\u062d\u0628\u062a \u0645\u06cc\u200c\u06a9\u0646\u062f.', '\u062f\u0631 \u0641\u0627\u0631\u0633\u06cc \u0636\u0645\u06cc\u0631 \u0641\u0627\u0639\u0644\u06cc \u0631\u0627 \u0627\u063a\u0644\u0628 \u062d\u0630\u0641 \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f\u060c \u0686\u0648\u0646 \u067e\u0627\u06cc\u0627\u0646 \u0641\u0639\u0644 \u0634\u062e\u0635 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06cc\u200c\u062f\u0647\u062f. \u062f\u0631 \u0641\u0631\u0627\u0646\u0633\u0648\u06cc \u0636\u0645\u06cc\u0631 \u0628\u0627\u06cc\u062f \u0628\u06cc\u0627\u06cc\u062f: je parle. \u067e\u06cc\u0634 \u0627\u0632 \u062d\u0631\u0641 \u0635\u062f\u0627\u062f\u0627\u0631\u060c je \u0628\u0647 j\u2019 \u062a\u0628\u062f\u06cc\u0644 \u0645\u06cc\u200c\u0634\u0648\u062f: j\u2019aime.']
      },
      parle: {
        nature: '\u0641\u0639\u0644 \u00b7 \u0632\u0645\u0627\u0646 \u062d\u0627\u0644',
        texte: ['\u0641\u0639\u0644 parler (\u0635\u062d\u0628\u062a \u06a9\u0631\u062f\u0646) \u062f\u0631 \u0632\u0645\u0627\u0646 \u062d\u0627\u0644 \u0628\u0627 \u00abje\u00bb.'],
        formes: [['parler', '\u0645\u0635\u062f\u0631: \u0641\u0639\u0644 \u0628\u062f\u0648\u0646 \u0635\u0631\u0641'], ['je parle', '\u00ab\u0645\u0646 \u0635\u062d\u0628\u062a \u0645\u06cc\u200c\u06a9\u0646\u0645\u00bb. \u062d\u0631\u0641 -e \u067e\u0627\u06cc\u0627\u0646\u06cc \u062a\u0644\u0641\u0638 \u0646\u0645\u06cc\u200c\u0634\u0648\u062f']]
      },
      francais: {
        nature: '\u0627\u0633\u0645 \u00b7 \u0645\u0630\u06a9\u0631',
        equiv: '\u0641\u0631\u0627\u0646\u0633\u0648\u06cc',
        texte: ['\u062f\u0631 \u0627\u06cc\u0646\u062c\u0627 \u0646\u0627\u0645 \u06cc\u06a9 \u0632\u0628\u0627\u0646 \u0627\u0633\u062a.', '\u0627\u0633\u0645\u200c\u0647\u0627 \u062f\u0631 \u0641\u0631\u0627\u0646\u0633\u0648\u06cc \u0645\u0630\u06a9\u0631 \u06cc\u0627 \u0645\u0624\u0646\u062b\u200c\u0627\u0646\u062f\u061b \u0641\u0627\u0631\u0633\u06cc \u062c\u0646\u0633 \u062f\u0633\u062a\u0648\u0631\u06cc \u0646\u062f\u0627\u0631\u062f. \u0646\u0627\u0645 \u0647\u0645\u0647\u0654 \u0632\u0628\u0627\u0646\u200c\u0647\u0627 \u0645\u0630\u06a9\u0631 \u0627\u0633\u062a: le fran\u00e7ais.', '\u0648 \u0646\u0627\u0645 \u0632\u0628\u0627\u0646\u200c\u0647\u0627 \u062f\u0631 \u0641\u0631\u0627\u0646\u0633\u0648\u06cc \u0628\u0627 \u062d\u0631\u0641 \u06a9\u0648\u0686\u06a9 \u0646\u0648\u0634\u062a\u0647 \u0645\u06cc\u200c\u0634\u0648\u062f.']
      },
      parles: {
        nature: '\u0641\u0639\u0644 \u00b7 \u0632\u0645\u0627\u0646 \u062d\u0627\u0644',
        texte: ['\u0641\u0639\u0644 parler \u0628\u0627 \u00abtu\u00bb (\u062a\u0648): tu parles.', '\u0628\u0627 \u00abje\u00bb \u0645\u06cc\u200c\u06af\u0648\u06cc\u06cc\u0645 je parle\u060c \u0628\u062f\u0648\u0646 -s.']
      }
    },
    sv: {
      je: {
        nature: 'Personligt pronomen \u00b7 f\u00f6rsta person singular',
        equiv: 'jag',
        texte: ['Det st\u00e5r f\u00f6r personen som talar.', 'Precis som p\u00e5 svenska m\u00e5ste pronomenet finnas med: je parle. Framf\u00f6r en vokal blir je till j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verb \u00b7 presens',
        texte: ['Verbet parler (tala), i presens med \u00abje\u00bb.'],
        formes: [['parler', 'infinitiv: verbet utan b\u00f6jning'], ['je parle', '\u00abjag talar\u00bb. Slut-e uttalas inte']]
      },
      francais: {
        nature: 'Substantiv \u00b7 maskulinum',
        equiv: 'franska',
        texte: ['H\u00e4r \u00e4r det namnet p\u00e5 ett spr\u00e5k.', 'Franska substantiv \u00e4r maskulina eller feminina, medan svenskan har utrum och neutrum. Spr\u00e5k \u00e4r maskulina: le fran\u00e7ais.', 'Och som p\u00e5 svenska skrivs spr\u00e5knamn med liten bokstav.']
      },
      parles: {
        nature: 'Verb \u00b7 presens',
        texte: ['Verbet parler med \u00abtu\u00bb (du): tu parles.', 'Till skillnad fr\u00e5n svenskan, d\u00e4r verbet \u00e4r detsamma (jag talar, du talar), \u00e4ndras det p\u00e5 franska: je parle, tu parles.']
      }
    },
    no: {
      je: {
        nature: 'Personlig pronomen \u00b7 1. person entall',
        equiv: 'jeg',
        texte: ['Det st\u00e5r for personen som snakker.', 'Akkurat som p\u00e5 norsk m\u00e5 pronomenet v\u00e6re med: je parle. Foran en vokal blir je til j\u2019: j\u2019aime.']
      },
      parle: {
        nature: 'Verb \u00b7 presens',
        texte: ['Verbet parler (snakke), i presens med \u00abje\u00bb.'],
        formes: [['parler', 'infinitiv: verbet uten b\u00f8yning'], ['je parle', '\u00abjeg snakker\u00bb. Slutt-e uttales ikke']]
      },
      francais: {
        nature: 'Substantiv \u00b7 maskulinum',
        equiv: 'fransk',
        texte: ['Her er det navnet p\u00e5 et spr\u00e5k.', 'Franske substantiv er maskuline eller feminine; norsk har ogs\u00e5 intetkj\u00f8nn. Spr\u00e5k er maskuline: le fran\u00e7ais.', 'Og som p\u00e5 norsk skrives spr\u00e5knavn med liten bokstav.']
      },
      parles: {
        nature: 'Verb \u00b7 presens',
        texte: ['Verbet parler med \u00abtu\u00bb (du): tu parles.', 'P\u00e5 norsk er verbet likt (jeg snakker, du snakker), men p\u00e5 fransk endrer det seg: je parle, tu parles.']
      }
    },
    ru: {
      je: {
        nature: '\u041b\u0438\u0447\u043d\u043e\u0435 \u043c\u0435\u0441\u0442\u043e\u0438\u043c\u0435\u043d\u0438\u0435 \u00b7 1-\u0435 \u043b\u0438\u0446\u043e, \u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435 \u0447\u0438\u0441\u043b\u043e',
        equiv: '\u044f',
        texte: ['\u041e\u043d\u043e \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0430\u0435\u0442 \u0433\u043e\u0432\u043e\u0440\u044f\u0449\u0435\u0433\u043e.', '\u041a\u0430\u043a \u0438 \u0440\u0443\u0441\u0441\u043a\u043e\u0435 \u00ab\u044f\u00bb, je \u043d\u0435 \u043f\u0438\u0448\u0435\u0442\u0441\u044f \u0441 \u0431\u043e\u043b\u044c\u0448\u043e\u0439 \u0431\u0443\u043a\u0432\u044b \u0432 \u0441\u0435\u0440\u0435\u0434\u0438\u043d\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f. \u041f\u0435\u0440\u0435\u0434 \u0433\u043b\u0430\u0441\u043d\u043e\u0439 \u043e\u043d\u043e \u043f\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044f \u0432 j\u2019: j\u2019aime.']
      },
      parle: {
        nature: '\u0413\u043b\u0430\u0433\u043e\u043b \u00b7 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f',
        texte: ['\u0413\u043b\u0430\u0433\u043e\u043b parler (\u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c) \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441 \u00abje\u00bb.'],
        formes: [['parler', '\u0438\u043d\u0444\u0438\u043d\u0438\u0442\u0438\u0432: \u043d\u0435\u0441\u043f\u0440\u044f\u0433\u0430\u0435\u043c\u0430\u044f \u0444\u043e\u0440\u043c\u0430 \u0433\u043b\u0430\u0433\u043e\u043b\u0430'], ['je parle', '\u00ab\u044f \u0433\u043e\u0432\u043e\u0440\u044e\u00bb. \u041a\u043e\u043d\u0435\u0447\u043d\u0430\u044f -e \u043d\u0435 \u043f\u0440\u043e\u0438\u0437\u043d\u043e\u0441\u0438\u0442\u0441\u044f']]
      },
      francais: {
        nature: '\u0421\u0443\u0449\u0435\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u00b7 \u043c\u0443\u0436\u0441\u043a\u043e\u0439 \u0440\u043e\u0434',
        equiv: '\u0444\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0439',
        texte: ['\u0417\u0434\u0435\u0441\u044c \u044d\u0442\u043e \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u044f\u0437\u044b\u043a\u0430.', '\u041a\u0430\u043a \u0438 \u0432 \u0440\u0443\u0441\u0441\u043a\u043e\u043c, \u0444\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0431\u044b\u0432\u0430\u044e\u0442 \u043c\u0443\u0436\u0441\u043a\u043e\u0433\u043e \u0438 \u0436\u0435\u043d\u0441\u043a\u043e\u0433\u043e \u0440\u043e\u0434\u0430. \u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u044f\u0437\u044b\u043a\u043e\u0432 \u2014 \u043c\u0443\u0436\u0441\u043a\u043e\u0433\u043e \u0440\u043e\u0434\u0430: le fran\u00e7ais.', '\u0418, \u043a\u0430\u043a \u0432 \u0440\u0443\u0441\u0441\u043a\u043e\u043c, \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u044f\u0437\u044b\u043a\u043e\u0432 \u043f\u0438\u0448\u0443\u0442\u0441\u044f \u0441 \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u043e\u0439 \u0431\u0443\u043a\u0432\u044b.']
      },
      parles: {
        nature: '\u0413\u043b\u0430\u0433\u043e\u043b \u00b7 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f',
        texte: ['\u0413\u043b\u0430\u0433\u043e\u043b parler \u0441 \u00abtu\u00bb (\u0442\u044b): tu parles.', '\u0421 \u00abje\u00bb \u0433\u043e\u0432\u043e\u0440\u044f\u0442 je parle, \u0431\u0435\u0437 -s.']
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
    // 🎨 Optionnelle : paire « déçue » (bouche fermée / ouverte) pour « …mais
    // c'est tout ce dont je me souviens ». Fermée seule : Bek ne parle pas mais
    // reste déçue ; aucune des deux : on retombe sur bek-perplexe-05.
    'bek-decue-ferme':      'images/reveil/bek_decue_bouche-fermee_01-01.webp',
    'bek-decue-ouvert':     'images/reveil/bek_decue_bouche-ouverte_01-01.webp',
    // 🎨 Paire « pointe » (bouche fermée / ouverte) : Bek montre le Lecteur du doigt
    // (vers la GAUCHE de l'image) dans la scène de rencontre. Absente : pose perplexe.
    'bek-pointe-ferme':     'images/reveil/bek_pointe_bouche-fermee_01-01.webp',
    'bek-pointe-ouvert':    'images/reveil/bek_pointe_bouche-ouverte_01-01.webp',
    // 🎨 Optionnelle : « observe » — Bek a baissé le bras mais regarde toujours vers la
    // GAUCHE (le Lecteur). Elle ne parle pas. Absente : pose perplexe.
    'bek-observe':          'images/reveil/bek_observe_01-01.webp',
    // 🎨 Optionnelles : l'ouverture et les postures des trois tours. Absentes,
    // on retombe sur les poses existantes (voir EXPRESSIONS).
    'bek-penchee':          'images/reveil/bek_penchee_01-01.webp',
    // 🎨 Facultative : le « déclic » (yeux écarquillés, bouche en petit « o ») qui
    // s'intercale entre la penchée et la confiante. Absente, l'étape est simulée.
    'bek-declic':           'images/reveil/bek_declic_01-01.webp',
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
    'bek-perplexe-05', 'bek-perplexe-06', 'bek-soulagee', 'bek-decue-ferme', 'bek-decue-ouvert',
    'bek-pointe-ferme', 'bek-pointe-ouvert', 'bek-observe',
    'bek-penchee', 'bek-declic', 'bek-confiante',
    'bek-solennelle-ferme', 'bek-solennelle-ouvert', 'bek-tendue-ferme', 'bek-tendue-ouvert',
    'bek-emue-ferme', 'bek-emue-ouvert'
  ];
  const EXPRESSIONS = {
    heureuse: { ferme: 'bek-heureuse-ferme',   ouvert: 'bek-heureuse-ouvert',   repli: 'bek-soulagee' },
    effort:   { ferme: 'bek-concentree-ferme', ouvert: 'bek-concentree-ouvert', repli: 'bek-perplexe-06' },
    triste:   { ferme: 'bek-decue-ferme',    ouvert: 'bek-decue-ouvert',    repli: 'bek-perplexe-05' },
    // rencontre du Lecteur
    pointe:   { ferme: 'bek-pointe-ferme',   ouvert: 'bek-pointe-ouvert',   repli: 'bek-perplexe-05' },
    perplexe: { fixe: 'bek-perplexe-05', repli: 'bek-perplexe-06' },
    observe:  { fixe: 'bek-observe',     repli: 'bek-perplexe-05' },
    // ouverture de la mémoire (images uniques : elle ne parle pas encore)
    penchee:   { fixe: 'bek-penchee',   repli: 'bek-concentree-ferme' },
    declic:    { fixe: 'bek-declic',    repli: 'bek-penchee' },
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
    // 🆕 identité recueillie au réveil (sinon pas de scène de rencontre)
    let IDENTITE = (options.identite && typeof options.identite === 'object' && options.identite.prenom)
      ? { prenom: String(options.identite.prenom), genre: options.identite.genre === 'f' ? 'f' : 'm', adulte: !!options.identite.adulte }
      : null;
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
        '<div class="mem-flash" aria-hidden="true"></div>' +
        '<div class="rbek-fond mem-bek-fond" role="img" aria-label="Bek">' +
          '<div class="mem-eclat" aria-hidden="true"><i class="mem-eclat-halo"></i><i class="mem-eclat-rayons"></i><i class="mem-eclat-anneau"></i></div>' +
          '<span class="mem-tete" aria-hidden="true"></span>' +
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
        '<div class="mem-astuce mem-astuce-cachee" aria-hidden="true"></div>' +
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
    const astuce = conteneur.querySelector('.mem-astuce');
    const eclatEl = conteneur.querySelector('.mem-eclat');
    const flashEl = conteneur.querySelector('.mem-flash');
    const teteEl = conteneur.querySelector('.mem-tete');
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
    // Persan : les textes de l'interface se lisent de droite à gauche ; la phrase
    // française et ses tuiles (mem-phrase, mem-plateau) restent de gauche à droite.
    if (LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1) {
      ['.rbek-bulle-texte', '.mem-astuce', '.mem-sens', '.mem-invite-texte', '.mem-lb-texte', '.mem-aide-feuille'].forEach(function (sel) {
        const el = conteneur.querySelector(sel);
        if (el) el.setAttribute('dir', 'rtl');
      });
    }

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
    // Le « déclic » : trois notes vives qui montent, puis une paillette aiguë
    function sonDeclic() {
      [2, 3, 5].forEach(function (k, i) { note(GAMME[k], i * 0.075, 0.5, 'sine', 0.12); });
      note(GAMME[5] * 1.5, 0.24, 0.9, 'triangle', 0.05);
      note(GAMME[0] / 2, 0, 0.35, 'sine', 0.08);       // petit « boum » grave sous l'éclat
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
      effacerFrappe();
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

    // ---------- Saisie au clavier ----------
    let frappe = '';
    let minuteurFrappe = null;
    let astuceVue = false;
    function cle(t) { return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
    function tuilesDispo() {
      return Array.prototype.slice.call(plateau.querySelectorAll('.mem-tuile:not(.mem-tuile-partie):not(.mem-tuile-efface):not(.mem-entree-cachee)'));
    }
    function candidates(tampon) {
      return tuilesDispo().filter(function (t) { return cle(MOTS[t.dataset.id]).indexOf(tampon) === 0; });
    }
    function effacerFrappe() {
      frappe = '';
      clearTimeout(minuteurFrappe);
      if (!plateau) return;
      Array.prototype.forEach.call(plateau.querySelectorAll('.mem-tuile'), function (t) {
        t.classList.remove('mem-tuile-attenuee', 'mem-tuile-prefixe');
        if (t.querySelector && t.querySelector('.mem-tuile-frappe')) t.textContent = MOTS[t.dataset.id];
      });
      Array.prototype.forEach.call(phrase.querySelectorAll('.mem-frappe'), function (g) { g.parentNode.removeChild(g); });
    }
    function majFrappe() {
      const cand = candidates(frappe);
      tuilesDispo().forEach(function (t) {
        const ok = cand.indexOf(t) !== -1;
        t.classList.toggle('mem-tuile-attenuee', !ok);
        t.classList.toggle('mem-tuile-prefixe', ok);
        const mot = MOTS[t.dataset.id];
        if (ok) t.innerHTML = '<span class="mem-tuile-frappe">' + echapper(mot.slice(0, frappe.length)) + '</span>' + echapper(mot.slice(frappe.length));
        else t.textContent = mot;
      });
      // les lettres tapées apparaissent dans la prochaine case de la bulle
      Array.prototype.forEach.call(phrase.querySelectorAll('.mem-frappe'), function (g) { g.parentNode.removeChild(g); });
      const case_ = prochainVide();
      if (case_ && cand.length) {
        const g = document.createElement('span');
        g.className = 'mem-frappe';
        g.textContent = MOTS[cand[0].dataset.id].slice(0, frappe.length);
        case_.appendChild(g);
      }
      clearTimeout(minuteurFrappe);
      minuteurFrappe = setTimeout(effacerFrappe, 3200);   // saisie abandonnée : on repart de zéro
    }
    function aucunMot() {
      // aucune tuile ne commence ainsi : la case secoue les lettres, puis on repart de zéro (sans pénalité)
      const case_ = prochainVide();
      const lettres = frappe;
      effacerFrappe();
      if (!case_) return;
      const g = document.createElement('span');
      g.className = 'mem-frappe mem-frappe-non';
      g.textContent = lettres;
      case_.appendChild(g);
      planifier(function () { if (g.parentNode) g.parentNode.removeChild(g); }, 520);
    }
    function loger(t) {
      effacerFrappe();        // la tuile retrouve son texte entier avant de s'envoler
      placer(t);
    }
    function masquerAstuce() {
      astuceVue = true;
      if (astuce) astuce.classList.add('mem-astuce-cachee');
    }
    function surFrappe(e) {
      if (arrete || verrou || aideOuverte || aideBloquee || e.defaultPrevented) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
      const cible = e.target;
      if (cible && /^(input|textarea|select)$/i.test(cible.tagName || '')) return;
      const k = e.key;
      if (k === 'Escape') { if (frappe) { effacerFrappe(); e.preventDefault(); } return; }
      if (k === 'Backspace') {
        if (frappe) { e.preventDefault(); frappe = frappe.slice(0, -1); if (frappe) majFrappe(); else effacerFrappe(); }
        return;
      }
      if (k === 'Enter' || k === ' ') {
        if (!frappe) return;
        e.preventDefault();
        // Espace / Entrée : on valide le mot tapé en entier (utile pour « parle » / « parles »)
        const exact = tuilesDispo().filter(function (t) { return cle(MOTS[t.dataset.id]) === frappe; })[0];
        if (exact) loger(exact); else aucunMot();
        return;
      }
      if (!k || k.length !== 1 || !/\p{L}/u.test(k)) return;
      e.preventDefault();
      const actif = document.activeElement;
      if (actif && actif !== document.body && actif.blur) actif.blur();   // pas de clic fantôme sur une tuile restée « active »
      deselectionner();
      masquerAstuce();
      frappe += cle(k);
      const cand = candidates(frappe);
      if (!cand.length) { aucunMot(); return; }
      if (cand.length === 1) { loger(cand[0]); return; }   // un seul mot possible : il se loge tout de suite
      majFrappe();
    }
    document.addEventListener('keydown', surFrappe);

    // Astuce, une seule fois, seulement s'il y a un clavier (pas sur un téléphone)
    function montrerAstuce() {
      if (!astuce || astuceVue || aideOuverte || aideBloquee) return;
      const tactile = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      let dejaVue = false;
      try { dejaVue = localStorage.getItem('kebbek_astuce_clavier') === '1'; } catch (e) {}
      if (tactile || dejaVue) return;
      try { localStorage.setItem('kebbek_astuce_clavier', '1'); } catch (e) {}
      astuce.textContent = T('astuceClavier');
      astuce.classList.remove('mem-astuce-cachee');
      planifier(masquerAstuce, 6500);
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

    // ---------- 🆕 Rencontre : le Lecteur se présente à Bek ----------
    // Le Lecteur vient se poser au bout du doigt de Bek ; elle le voit et le montre
    // (« C'est quoi, ça ? ») ; l'élève se dit « Une IA, je suppose ? » ; le Lecteur se
    // présente et demande de l'aide à « l'humain » (un seul bouton, comique) ; Bek présente
    // l'élève (prénom, garçon/fille/homme/femme) ; le Lecteur demande de confirmer.
    function placerLecteurPresDeBek() {
      if (!lecteurEl) return;
      const s = scene.getBoundingClientRect();
      const r = bek.getBoundingClientRect();
      const taille = lecteurEl.offsetWidth || 70;
      const bx = (r.left - s.left) + DOIGT.x * r.width;
      const by = (r.top - s.top) + DOIGT.y * r.height;
      lecteurEl.classList.add('mem-lecteur-voyage');
      lecteurEl.style.left = Math.max(6, Math.round(bx - taille - 10)) + 'px';
      lecteurEl.style.bottom = Math.round(s.height - (by + taille / 2)) + 'px';
    }
    // 🆕 Le Lecteur monte à hauteur des yeux de Bek, juste à gauche de sa tête (même trajet
    // animé que placerLecteurPresDeBek : .mem-lecteur-voyage). Après l'appel, attendre la fin
    // du trajet (≈ 1,2 s) avant de caler la bulle (placerBulleLecteur lit sa position).
    let lecteurAuxYeux = false;
    function placerLecteurAuxYeux() {
      if (!lecteurEl) return;
      const s = scene.getBoundingClientRect();
      const r = bek.getBoundingClientRect();
      const taille = lecteurEl.offsetWidth || 70;
      const bx = (r.left - s.left) + YEUX.x * r.width;
      const by = (r.top - s.top) + YEUX.y * r.height;
      lecteurAuxYeux = true;
      lecteurEl.classList.add('mem-lecteur-voyage');
      lecteurEl.style.left = Math.max(6, Math.round(bx - taille - 14)) + 'px';
      lecteurEl.style.bottom = Math.round(s.height - (by + taille / 2)) + 'px';
    }
    // La bulle du Lecteur se place SOUS lui (le visage de Bek reste dégagé), queue vers le haut.
    function placerBulleLecteur() {
      const s = scene.getBoundingClientRect();
      const l = lecteurEl.getBoundingClientRect();
      const w = lb.offsetWidth || 300;
      const centre = (l.left - s.left) + l.width / 2;
      const gauche = Math.min(Math.max(8, centre - 40), Math.max(8, s.width - w - 8));
      lb.classList.add('mem-lb-sous');
      lb.style.left = Math.round(gauche) + 'px';
      let haut = (l.bottom - s.top) + 18;
      if (lecteurAuxYeux) {                    // Lecteur au niveau des yeux : la bulle passe sous le menton
        const r = bek.getBoundingClientRect();
        haut = Math.min(Math.max(haut, (r.top - s.top) + YEUX.menton * r.height), haut + 24);
      }
      lb.style.top = Math.round(haut) + 'px';
      lb.style.bottom = 'auto';
      lb.style.setProperty('--queue', Math.round(Math.min(Math.max(16, centre - gauche - 9), w - 40)) + 'px');
    }
    function lecteurDit(texte) {
      placerBulleLecteur();
      lb.classList.remove('mem-lb-question');
      return direLecteur(texte);
    }
    // Réponse de l'élève : un bouton unique, en bas de l'écran
    function creerReponse(libelle) {
      const boite = document.createElement('div');
      boite.className = 'rbek-choix mem-reponse rbek-choix-cache';
      const bouton = document.createElement('button');
      bouton.type = 'button';
      bouton.className = 'rbek-btn-reponse';
      bouton.textContent = libelle;
      if (LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1) boite.setAttribute('dir', 'rtl');
      boite.appendChild(bouton);
      scene.appendChild(boite);
      planifier(function () { boite.classList.remove('rbek-choix-cache'); }, 700);
      return {
        bouton: bouton,
        cacher: function () { boite.classList.add('rbek-choix-cache'); planifier(function () { boite.remove(); }, 400); }
      };
    }
    function lecteurQuestion(texte, libelle) {
      return new Promise(function (resolve) {
        placerBulleLecteur();
        lb.classList.add('mem-lb-question');           // pas de flèche : c'est le bouton qui répond
        lb.querySelector('.mem-lb-texte').textContent = texte;
        lb.classList.remove('mem-lb-cachee');
        const rep = creerReponse(libelle);
        planifier(function () { rep.bouton.focus({ preventScroll: true }); }, 800);
        rep.bouton.addEventListener('click', function () {
          rep.cacher();
          lb.classList.add('mem-lb-cachee');
          planifier(function () { lb.classList.remove('mem-lb-question'); resolve(); }, 350);
        }, { once: true });
      });
    }
    // Pensée de l'élève : une pastille pâle en bas, qui s'efface seule (ou au toucher)
    function pensee(texte) {
      return new Promise(function (resolve) {
        const p = document.createElement('p');
        p.className = 'mem-pensee';
        p.textContent = texte;
        if (LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1) p.setAttribute('dir', 'rtl');
        scene.appendChild(p);
        planifier(function () { p.classList.add('mem-pensee-visible'); }, 40);
        let fini = false;
        function fin() {
          if (fini) return;
          fini = true;
          p.classList.remove('mem-pensee-visible');
          planifier(function () { p.remove(); resolve(); }, 450);
        }
        p.addEventListener('click', fin);
        planifier(fin, Math.min(RENCONTRE.penseeMax, Math.max(RENCONTRE.penseeMin, Array.from(texte).length * RENCONTRE.penseeParSigne)));
      });
    }
    async function rencontre() {
      // 1. le Lecteur s'approche de Bek, jusqu'au bout de son doigt
      placerLecteurPresDeBek();
      await attendre(reduit ? 300 : RENCONTRE.approche);
      // 2. Bek le voit et le montre du doigt
      bek.classList.remove('rbek-sursaut');
      void bek.offsetWidth;
      bek.classList.add('rbek-sursaut');
      await dire(T('rencBekQuoi'), 'pointe');
      bulle.classList.add('rbek-bulle-cachee');
      await attendre(350);
      // 3. l'élève se le dit à voix basse ; Bek, muette, garde le doigt pointé
      await pensee(T('rencPensee'));
      await attendre(600);
      // 4. Bek baisse le bras mais continue de regarder le Lecteur (pose « observe », fondu doux) ;
      //    le Lecteur monte alors à hauteur de ses yeux, puis se présente et demande de l'aide.
      //    Bek (muette) réagit à CHAQUE réplique : elle l'observe, a un déclic, devient
      //    perplexe (« un humain ? »), puis se tourne vers l'élève.
      lecteurReagit('mem-lecteur-saut', 650);
      exprimer('observe', 350);
      await attendre(reduit ? 150 : 450);
      placerLecteurAuxYeux();
      await attendre(reduit ? 300 : 1300);       // le temps du trajet : la bulle se cale sur sa position finale
      await lecteurDit(T('rencLect1'));          // « Salut Bek, je me présente… »  → elle l'observe
      exprimer('declic', 300);
      await lecteurDit(T('rencLect2'));          // « Je peux t'aider à retrouver tes mémoires »  → déclic
      exprimer('perplexe', 300);
      await lecteurDit(T('rencLect3'));          // « J'ai besoin d'un humain… »  → perplexe, doigt au menton
      exprimer('confiante', 300);
      await lecteurQuestion(T('rencLect4'), T('rencReponse'));   // « Humain, veux-tu nous aider ? »  → elle regarde l'élève
      if (!IDENTITE) return;
      // 5. Bek présente l'élève, le Lecteur demande confirmation
      const mot = IDENTITE.adulte ? (IDENTITE.genre === 'f' ? 'Femme' : 'Homme') : (IDENTITE.genre === 'f' ? 'Fille' : 'Garcon');
      await dire(T('rencRecap' + mot).replace('{nom}', function () { return IDENTITE.prenom; }), 'heureuse');
      bulle.classList.add('rbek-bulle-cachee');
      await attendre(350);
      lecteurReagit('mem-lecteur-saut', 650);
      await lecteurDit(T('rencLect5'));
    }

    // ---------- 🆕 Fenêtre « vérification des informations » (voix du système) ----------
    // Pré-remplie avec ce que l'élève a donné au réveil ; il peut corriger son prénom et
    // choisir un autre profil (garçon/fille 0–17, homme/femme 18+). Style plat des fenêtres
    // du Lecteur (sequence-lecteur.css). Résout avec { prenom, genre, adulte }.
    function fenetreIdentite() {
      return new Promise(function (resolve) {
        let profil = PROFILS.filter(function (p) { return p.genre === IDENTITE.genre && p.adulte === IDENTITE.adulte; })[0] || PROFILS[0];
        let touche = false;
        const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
        const voile = document.createElement('div');
        voile.className = 'lect-voile mem-fen-voile';
        voile.innerHTML =
          '<div class="lect-carte mem-fen" role="dialog" aria-modal="true" aria-labelledby="memFenTitre"' + (rtl ? ' dir="rtl"' : '') + '>' +
            '<div class="lect-entete">' +
              '<span class="mem-fen-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></span>' +
              '<h2 class="lect-titre" id="memFenTitre">' + echapper(T('fenTitre')) + '</h2>' +
            '</div>' +
            '<label class="mem-fen-etiquette" for="memFenPrenom">' + echapper(T('fenPrenom')) + '</label>' +
            '<input class="mem-fen-champ" id="memFenPrenom" type="text" maxlength="20" autocomplete="off" autocapitalize="words" spellcheck="false" dir="auto">' +
            '<p class="mem-fen-erreur" role="alert"></p>' +
            '<div class="mem-fen-profils" role="radiogroup" aria-labelledby="memFenTitre">' +
              PROFILS.map(function (p) {
                return '<button type="button" class="mem-fen-profil" role="radio" data-id="' + p.id + '">' +
                  '<span class="mem-fen-mot">' + echapper(T('fen' + p.id)) + '</span>' +
                  '<span class="mem-fen-age" dir="ltr">' + p.age + '</span></button>';
              }).join('') +
            '</div>' +
            '<div class="lect-boutons"><button type="button" class="lect-btn mem-fen-ok">' + echapper(T('fenConfirmer')) + '</button></div>' +
          '</div>';
        scene.appendChild(voile);
        const carte = voile.querySelector('.mem-fen');
        const champ = voile.querySelector('.mem-fen-champ');
        const erreur = voile.querySelector('.mem-fen-erreur');
        const ok = voile.querySelector('.mem-fen-ok');
        const boutons = Array.prototype.slice.call(voile.querySelectorAll('.mem-fen-profil'));
        champ.value = IDENTITE.prenom;

        function valide() { return REGEX_PRENOM.test(champ.value.trim()); }
        function maj() {
          const v = valide();
          ok.disabled = !v;
          champ.classList.toggle('mem-fen-champ-faux', !v && touche);
          erreur.textContent = (!v && touche) ? T('fenErreur') : '';
          boutons.forEach(function (b) {
            const sel = b.dataset.id === profil.id;
            b.classList.toggle('mem-fen-profil-choisi', sel);
            b.setAttribute('aria-checked', sel ? 'true' : 'false');
          });
        }
        function fermer(identite) {
          carte.classList.remove('lect-carte-visible');
          voile.classList.remove('lect-voile-visible');
          planifier(function () { voile.remove(); resolve(identite); }, 320);
        }
        function confirmer() {
          touche = true;
          maj();
          if (!valide()) { champ.focus(); return; }
          ok.disabled = true;
          fermer({ prenom: champ.value.trim(), genre: profil.genre, adulte: profil.adulte });
        }
        champ.addEventListener('input', function () { touche = true; maj(); });
        champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); confirmer(); } });
        boutons.forEach(function (b) {
          b.addEventListener('click', function () {
            profil = PROFILS.filter(function (p) { return p.id === b.dataset.id; })[0];
            maj();
          });
        });
        ok.addEventListener('click', confirmer);
        maj();
        planifier(function () {
          voile.classList.add('lect-voile-visible');
          carte.classList.add('lect-carte-visible');
        }, 40);
        planifier(function () { ok.focus({ preventScroll: true }); }, 450);
      });
    }

    // ---------- 🆕 Fenêtre « compte » (voix du système) ----------
    // Après la confirmation d'identité : « Si tu ne veux pas perdre tes progrès… » (dit par le
    // Lecteur), puis une fenêtre à deux boutons. Elle ne crée AUCUN compte elle-même : elle
    // résout 'creer' ou 'plus-tard', et finMemoire passe la main à la page hôte (onCompte).
    function fenetreCompte() {
      return new Promise(function (resolve) {
        const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
        const voile = document.createElement('div');
        voile.className = 'lect-voile mem-fen-voile';
        voile.innerHTML =
          '<div class="lect-carte mem-fen mem-cpt" role="dialog" aria-modal="true" aria-labelledby="memCptTitre"' + (rtl ? ' dir="rtl"' : '') + '>' +
            '<div class="lect-entete">' +
              '<span class="mem-fen-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4"/><path d="M8 20v-6h8v6"/></svg></span>' +
              '<h2 class="lect-titre" id="memCptTitre">' + echapper(T('compteTitre')) + '</h2>' +
            '</div>' +
            '<p class="lect-texte">' + echapper(T('compteTexte')) + '</p>' +
            '<div class="lect-boutons mem-cpt-boutons">' +
              '<button type="button" class="lect-btn lect-btn-clair mem-cpt-plus-tard">' + echapper(T('comptePlusTard')) + '</button>' +
              '<button type="button" class="lect-btn mem-cpt-creer">' + echapper(T('compteCreer')) + '</button>' +
            '</div>' +
          '</div>';
        scene.appendChild(voile);
        const carte = voile.querySelector('.mem-cpt');
        const creer = voile.querySelector('.mem-cpt-creer');
        const plusTard = voile.querySelector('.mem-cpt-plus-tard');
        let fait = false;
        function choisir(choix) {
          if (fait) return;
          fait = true;
          creer.disabled = true;
          plusTard.disabled = true;
          carte.classList.remove('lect-carte-visible');
          voile.classList.remove('lect-voile-visible');
          planifier(function () { voile.remove(); resolve(choix); }, 320);
        }
        creer.addEventListener('click', function () { choisir('creer'); });
        plusTard.addEventListener('click', function () { choisir('plus-tard'); });
        planifier(function () {
          voile.classList.add('lect-voile-visible');
          carte.classList.add('lect-carte-visible');
        }, 40);
        planifier(function () { creer.focus({ preventScroll: true }); }, 450);
      });
    }

    // Dernière réplique du Lecteur, puis la rencontre (si l'identité est connue)
    async function finMemoire() {
      if (lecteurEl) await direLecteur(T('lecteurFin'));
      if (arrete) return;
      if (IDENTITE && options.rencontre !== false && lecteurEl && lb) {
        await rencontre();
        if (arrete) return;
        IDENTITE = await fenetreIdentite();       // l'élève confirme ou corrige ; IDENTITE est mise à jour
        if (arrete) return;
        lecteurReagit('mem-lecteur-saut', 650);
        // 🆕 Étape C : la fenêtre du compte n'apparaît que si la page hôte fournit onCompte
        const avecCompte = typeof callbacks.onCompte === 'function' && options.compte !== false;
        if (typeof callbacks.onIdentiteConfirmee === 'function') {
          try { callbacks.onIdentiteConfirmee(Object.assign({}, IDENTITE)); } catch (e) { console.warn('onIdentiteConfirmee a échoué.', e); }
          if (!avecCompte) return;                // sans onCompte : onIdentiteConfirmee prend la suite, comme avant
        }
        if (avecCompte) {
          await attendre(500);
          if (arrete) return;
          await lecteurDit(T('compteLect'));
          if (arrete) return;
          const choix = await fenetreCompte();
          if (arrete) return;
          if (choix === 'creer') {
            try { callbacks.onCompte(Object.assign({}, IDENTITE)); } catch (e) { console.warn('onCompte a échoué.', e); }
            return;                               // la page hôte lance la création du compte
          }
          // « Plus tard » : on retombe sur onTermine ci-dessous
        }
      }
      if (typeof callbacks.onTermine === 'function') {
        try { callbacks.onTermine(); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    // ---------- L'éclat du déclic ----------
    // Lumière derrière la tête (halo + rayons + anneau), voile lumineux sur la scène,
    // étincelles qui jaillissent, carillon. Rejouable : on relance les animations.
    function eclat() {
      [eclatEl, flashEl].forEach(function (e) { if (!e) return; e.classList.remove('mem-eclat-actif'); void e.offsetWidth; e.classList.add('mem-eclat-actif'); });
      sonDeclic();
      if (teteEl) etincelles(teteEl, 30, true);
      planifier(function () { if (eclatEl) eclatEl.classList.remove('mem-eclat-actif'); if (flashEl) flashEl.classList.remove('mem-eclat-actif'); }, 2200);
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

      await finMemoire();
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
      if (options.sauterA === 'rencontre') {      // 🧪 aperçu : on saute le jeu, on démarre à la fin de la mémoire
        aideBloquee = true;
        scene.classList.remove('mem-souvenir');
        scene.classList.add('mem-restauree');
        if (lecteurEl) { lecteurEl.classList.remove('mem-lecteur-cache'); lecteurEl.classList.add('mem-lecteur-inactif'); }
        exprimer('triste');
        await attendre(800);
        await finMemoire();
        return;
      }
      scene.addEventListener('pointerdown', sauterOuverture);

      // --- Ouverture : elle cherche, retient son souffle, DÉCLIC, savoure, devient solennelle ---
      const O = OUVERTURE;
      await pause(O.depart);
      if (!sauter) {                                // 1-2. tête penchée : elle cherche
        if (disponible('bek-penchee')) exprimer('penchee', O.fonduPenchee);
        else bek.classList.add('mem-penche-css');   // sans l'image : inclinaison simulée
        bek.classList.add('mem-cherche');           // balancement lent, hésitant
        await pause(O.cherche);
      }
      if (!sauter) {                                // 3. elle retient son souffle (… et le déclic approche)
        bek.classList.add('mem-retient');
        if (disponible('bek-declic')) {             // pose facultative : les yeux s'écarquillent
          exprimer('declic', 220);
          await pause(O.silence + O.declic);
        } else {
          await pause(O.silence);
        }
      }
      if (!sauter) {                                // 4. ÉCLAT : elle se redresse, confiante
        bek.classList.remove('mem-cherche', 'mem-penche-css', 'mem-retient');
        eclat();
        exprimer('confiante', O.fonduEclat);
        bek.classList.remove('rbek-sursaut');
        void bek.offsetWidth;
        bek.classList.add('rbek-sursaut');
        await pause(O.confiante);                   // 5. elle savoure
      }
      bek.classList.remove('mem-cherche', 'mem-penche-css', 'mem-retient');
      exprimer('solennelle', sauter ? 0 : O.fonduSolennelle);   // main sur le cœur, l'air solennel
      if (!sauter) await pause(O.solennelle);
      scene.removeEventListener('pointerdown', sauterOuverture);

      bulle.classList.remove('rbek-bulle-cachee');
      construirePhrase(TOURS[0]);
      if (lecteurEl) planifier(function () { lecteurEl.classList.remove('mem-lecteur-cache'); }, 300);
      await attendre(700);
      construirePlateau(TOURS[0]);
      await attendre(500);
      verrou = false;
      planifier(montrerInvite, 1600);
      planifier(montrerAstuce, 9500);                 // après l'invitation du Lecteur
    }

    if (options.precharger === false) lancer({});
    else precharger(POSES, urlImage).then(lancer);

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        document.removeEventListener('keydown', surToucheAide);
        document.removeEventListener('keydown', surFrappe);
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      }
    };
  }

  window.KebBekMemoire = { demarrerMemoire: demarrerMemoire, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
