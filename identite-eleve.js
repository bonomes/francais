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
     6. 🆕 CORRIGÉ cette session : ce jour est arrivé — voir la scène
        "Essaie !" (lancerEssaieDoubleTap, jouée juste après l'atterrissage
        du sac) qui enseigne et fait PRATIQUER le vrai double-tap/
        double-clic. AJOUT_AUTOMATIQUE_TEMPORAIRE bascule donc à `false`
        ci-dessous, exactement comme annoncé — le simple clic sur un mot
        (n'importe où dans la séquence, y compris les répliques déjà vues
        plus haut) n'ajoute plus rien au sac, seul le double-tap/
        double-clic le fait désormais (voir afficherBulle plus haut, qui
        n'a lui-même pas eu besoin de changer : il consultait déjà ce
        drapeau).
     7. 🆕 CORRIGÉ cette session, suite au retour de Raphaël : le badge
        "sourire" accroché au mot "Essaie" (.iden-badge-informel) ne
        correspondait pas à ce qui était demandé — retiré entièrement
        (JS et CSS). L'indication du registre informel vit désormais à
        deux endroits précis : (a) dans la bulle de traduction d'un mot
        (afficherTraductionMot), accolée à la traduction elle-même,
        seulement pour les langues qui en ont besoin (voir
        LANGUES_SANS_PRECISION_INFORMEL — l'espagnol confirmé exempté par
        Raphaël) ; (b) dans le sac lui-même, via un champ `informel`
        désormais transmis à window.ajouterAuSac (voir ajouterMotAuSac) —
        à sac-a-dos.js de l'afficher, ce module ne fait qu'émettre la
        donnée. Voir MOTS_INFORMELS pour la liste des mots concernés
        (un seul à ce jour : "essaie").
   ================================================================== */

const AJOUT_AUTOMATIQUE_TEMPORAIRE = false;

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
    // 🐛 CORRIGÉ cette session (incohérence relevée par Raphaël) :
    // "Et toi, tu t'appelles comment ?" rompait la structure "Moi,
    // c'est .../Et moi, c'est ..." que Keb et Bek viennent d'utiliser
    // pour se présenter — Bek posait sa question dans une forme
    // grammaticale complètement différente. Alignée sur le même patron
    // elliptique ("Et toi, c'est... ?"), repris ensuite par le préfixe du
    // champ de saisie du nom (voir labelPrefixeNom/PREFIXE_NOM_FR plus
    // bas) : l'élève complète littéralement la même phrase que Bek vient
    // d'entamer.
    dialogueQuestion: "Et toi, c'est\u2026\u00A0?",
    // 🆕 v3
    labelTraduirePhrase: 'Translate the sentence',
    labelMasquerTraduction: 'Hide translation',
    noteAjoutSac: "Tap a word to see its translation — it's added to your bag for now.",
    // 🐛 CORRIGÉ cette session : labelPrefixeNom (retiré d'ici) était
    // traduit dans la langue de l'élève, ce qui rompait la continuité
    // avec les répliques françaises de Keb/Bek qui précèdent — voir
    // PREFIXE_NOM_FR (toujours en français) plus haut dans le fichier,
    // qui le remplace. Les traductions existantes de cette clé dans
    // index.html restent inertes mais inoffensives.
    // labelChampNom valait "..." (jamais un vrai texte) — repli anglais
    // réel maintenant, comme le reste de ce dictionnaire.
    labelChampNom: 'your first name',
    labelValider: 'OK',
    erreurVide: 'Please type your name.',
    erreurTropCourt: 'That name seems too short.',
    erreurTropLong: 'That name seems too long.',
    erreurCaracteresEtrangers: 'Please use French letters only.',
    erreurInapproprie: "That doesn't look like a real name — try again.",
    titreChoixRepli: "Let's pick a name for you, then!",
    titreSilhouettes: 'Which one is you?',
    labelChangerNom: 'Change my name',
    // 🆕 alt (accessibilité) pour les 4 images de la nouvelle étape de
    // dialogue "Enchanté(e)" — chrome descriptif, donc traduisible
    // normalement (repli anglais ici), contrairement au texte parlé
    // lui-même (voir DIALOGUES_FIXES, toujours en français).
    altEnchantes: 'Keb and Bek say nice to meet you',
    altFille: 'Bek says: I am a girl',
    altGarcon: 'Keb says: I am a boy',
    altEtToi: 'Bek asks: and you, are you...',
    // 🆕 Carrousel de silhouettes (voir lancerSilhouettes) — indice sous
    // les cartes, chrome d'interface descriptif, traduisible normalement.
    indiceCarrousel: 'Slide, then tap again to choose',
    // 🆕 Bouton "Annuler" affiché brièvement après confirmation d'une
    // silhouette (voir confirmerChoix dans lancerSilhouettes) — filet de
    // sécurité en cas de double-tap accidentel. Comme les autres clés
    // ci-dessus, PLACEHOLDER anglais tant qu'aucune traduction n'est
    // fournie via options.textes pour la langue de l'élève.
    labelAnnulerChoix: 'Cancel',
    // 🆕 alt (accessibilité) pour les 4 images de réaction de Keb/Bek à la
    // silhouette choisie (voir lancerReactionSilhouette) — chrome
    // descriptif traduisible normalement, comme altEnchantes/altFille/
    // altGarcon/altEtToi ci-dessus (le texte PARLÉ lui-même reste toujours
    // en français, voir DIALOGUES_FIXES plus bas).
    altReactionGarcon: 'Keb reacts: you are a boy, fist bump!',
    altReactionHomme: 'Keb reacts: you are a man, respect!',
    altReactionFille: 'Bek reacts: you are a girl, yay!',
    altReactionFemme: 'Bek reacts: you are a woman, great!',
    // 🆕 Scène de remise du sac (voir lancerRemiseSac) — répliques 1 à 5
    // illustrées à ce jour (6 et 7 attendent encore leurs illustrations,
    // voir IMAGES_DON_SAC plus bas). Chrome d'accessibilité, traduisible
    // normalement (repli anglais ici).
    altDonSacQuestion: 'Keb asks if you are ready',
    altDonSacPresque: 'Bek remembers the bag',
    altDonSacRealise: 'Keb suddenly remembers something',
    altDonSacPart: 'Keb runs off to get the bag',
    altDonSacRevient: 'Keb comes back with the bag',
    // 🆕 Réplique 5 — Keb hands over the backpack ("Tiens ! C'est pour
    // toi !", voir DIALOGUES_FIXES/IMAGES_DON_SAC plus bas). Deux images
    // : Bek's anticipation, puis Keb actually handing it over.
    altDonSacPourToi: 'Keb hands you the backpack',
    altDonSacPourToi2: 'Keb gives you the backpack',
    // 🆕 Scène de déblocage du sac (voir lancerDeblocageSac) — jouée
    // juste après la réplique 5 ("Tiens !"), avant les répliques 6-7 (pas
    // encore illustrées). "debloqueTitre"/"debloqueNom" : chrome
    // d'interface façon "objet débloqué", traduisible normalement — pas
    // une réplique de personnage, donc PAS dans DIALOGUES_FIXES (qui
    // reste toujours en français).
    debloqueTitre: 'Item unlocked!',
    debloqueNom: 'The first bag',
    altDebloqueSac: 'The backpack, glowing and floating',
    altIconeSac: 'Your backpack',
    // 🆕 Fiche "objet" (façon jeu vidéo) affichée au survol/tap du sac une
    // fois posé en haut à droite — remplace l'ancien plan de répliques 6-7
    // (dialogue Keb/Bek expliquant le mécanisme) : chrome d'interface,
    // traduisible normalement dans la langue de l'apprenant (PAS du
    // français figé comme DIALOGUES_FIXES). Voir afficherCarteSacUneFois/
    // creerSacBoutonSiAbsent plus bas.
    sacCarteTitre: 'Your backpack',
    sacCarteLigneMots: 'Double-tap (or double-click) a word to store it here.',
    sacCarteLigneDejaSauvegardes: 'Good news: the words you already touched are already inside!',
    sacCarteLigneObjets: 'It will also hold objects, secret codes, and surprises to unlock.',
    // 🆕 Scène "Essaie !" (voir lancerEssaieDoubleTap) — chrome
    // d'interface, traduisible normalement (contrairement à essaieBek,
    // la réplique de Bek elle-même, toujours en français dans
    // DIALOGUES_FIXES).
    altEssaie: 'Keb and Bek invite you to try double-tapping the word',
    essaieInstruction: 'Double-tap the word',
    etiquetteInformel: '(informal)',
    // 🆕 Alt (accessibilité) de l'image "tadam" — voir tadam dans
    // IMAGES_PAR_DEFAUT et reussirEssaie() dans lancerEssaieDoubleTap.
    altTadam: 'Keb and Bek cheer: ta-dah!',
    // 🆕 Remplace introIndiceTap à l'étape "Tadam !" — taper la scène ne
    // fait plus rien à ce stade (voir reussirEssaie), seul un clic sur le
    // sac fait avancer.
    introIndiceTapSac: 'Tap the bag to continue',
    altPretBek: 'Bek turns to Keb, smiling',
    altPretKeb: 'Keb looks at you, asking a question',
    // 🆕 Écran de confirmation (voir lancerConfirmationIdentite) — chrome
    // d'interface, traduisible normalement. Les VALEURS affichées à côté
    // (prénom, mot de vocabulaire garçon/homme/fille/femme) ne passent
    // jamais par ces clés — seules les ÉTIQUETTES le font.
    confirmationLabelNom: 'Name',
    confirmationLabelGenreAge: 'You are',
    // 🆕 Écran d'édition (voir lancerEditionIdentite) — Raphaël a demandé
    // un menu BILINGUE (langue de l'apprenant + français), pour la
    // clarté : chaque étiquette existe donc en deux versions ici, la
    // version française (xxxFr) étant TOUJOURS en français peu importe
    // options.textes (même principe que labelPrefixeNom), affichée en
    // plus petit sous la version traduite.
    editionTitre: 'Change your details',
    editionLabelNomFr: 'Nom',
    editionLabelGenreAgeFr: 'Tu es',
    editionBtnModifier: 'Change',
    editionBtnConfirmer: 'Confirm',
    // 🆕 Création de compte (voir lancerCreationCompte) — même mécanisme
    // que l'ancien index.html fourni par Raphaël (courriel + code reçu
    // par courriel, sans mot de passe), UI reconstruite dans le style du
    // site plutôt que copiée telle quelle.
    creationCompteTitre: 'Create your account',
    creationCompteTexte: "Enter your email — we'll send you a code, no password needed.",
    creationCompteLabelEmail: 'Email',
    creationCompteBtnEnvoyer: 'Send code',
    creationCompteLabelCode: 'Code',
    creationCompteBtnVerifier: 'Confirm',
    creationCompteCodeEnvoye: 'Code sent! Check your email.',
    creationCompteErreurCourrielVide: 'Please enter your email.',
    creationCompteErreurCodeVide: 'Please enter the code.',
    creationCompteEnvoiEnCours: 'Sending…',
    creationCompteVerificationEnCours: 'Checking…',
    creationCompteErreurIndisponible: "Account creation isn't available right now.",
    // 🆕 Option "continuer en invité" (voir lancerCreationCompte) —
    // demande de Raphaël.
    creationCompteLienInvite: 'Continue without an account',
    creationCompteAvertissementInvite: 'Your progress could be lost if your browser data is cleared.'
  };

  function texte(options, cle) {
    const t = (options && options.textes) || {};
    return (t[cle] !== undefined) ? t[cle] : TEXTES_PAR_DEFAUT[cle];
  }

  // ✅ CHEMINS CONFIRMÉS — les 11 .webp vivent dans images/accueil/ à la
  // racine du dépôt (à côté d'index.html), déjà téléversés par Raphaël
  // sur GitHub sous ce dossier. Repli toujours écrasable via
  // options.images = { keb, bek, ... } si une future page héberge ces
  // fichiers ailleurs, même principe que options.textes ci-dessus. Noms
  // de fichiers inchangés depuis le zip fourni par Raphaël (l'un d'eux,
  // "enchant és", avait un accent mal encodé dans le zip — renommé ici
  // en "enchantes" sans accent, plus sûr pour un nom de fichier).
  const IMAGES_PAR_DEFAUT = {
    keb: "images/accueil/index_bonomes_keb_bek_je-m'appelle-Keb_01.webp",
    bek: "images/accueil/index_bonomes_keb_bek_je-m'appelle-Bek_01.webp",
    question: 'images/accueil/index_bonomes_keb_bek_tu-t-appelles_01.webp',
    // 🐛 CORRIGÉ : le fichier réellement présent dans images/accueil/ sur
    // GitHub garde l'accent ("enchantés"), contrairement à l'hypothèse
    // prise en début de session (le zip source avait un accent mal
    // encodé, d'où la supposition qu'il faudrait le renommer sans accent
    // — mais Raphaël l'a téléversé tel quel, avec l'accent). Corrigé pour
    // pointer vers le vrai nom de fichier plutôt que d'exiger un
    // renommage sur GitHub.
    enchantes: 'images/accueil/index_bonomes_keb_bek_enchantés_01.webp',
    fille: 'images/accueil/index_bonomes_keb_bek_fille_01.webp',
    garcon: 'images/accueil/index_bonomes_keb_bek_garcon_01.webp',
    etToi: 'images/accueil/index_bonomes_keb_bek_et-toi_01.webp',
    // 🆕 Carrousel de silhouettes (voir lancerSilhouettes) — noms
    // distincts de 'fille'/'garcon' ci-dessus (déjà pris par les images
    // de l'étape "Enchanté(e)") pour ne jamais les confondre : ce sont
    // deux jeux d'images totalement différents (dialogue vs silhouette
    // en pied à choisir).
    silhouette_garcon: 'images/accueil/index_garcon_01.webp',
    silhouette_homme: 'images/accueil/index_homme_01.webp',
    silhouette_fille: 'images/accueil/index_fille_01.webp',
    silhouette_femme: 'images/accueil/index_femme_01.webp',
    // 🆕 Réaction de Keb/Bek à la silhouette choisie (voir
    // lancerReactionSilhouette) — 4 fichiers fournis cette session par
    // Raphaël, noms inchangés depuis le dossier livré (garder "toi_gars"
    // tel quel, pas "toi_garcon" — c'est le vrai nom de fichier).
    reactionGarcon: 'images/accueil/index_bonomes_keb_bek_toi_gars_01.webp',
    reactionHomme: 'images/accueil/index_bonomes_keb_bek_toi_homme_01.webp',
    reactionFille: 'images/accueil/index_bonomes_keb_bek_toi_fille_01.webp',
    reactionFemme: 'images/accueil/index_bonomes_keb_bek_toi_femme_01.webp',
    // 🆕 Scène de remise du sac (voir lancerRemiseSac / IMAGES_DON_SAC) —
    // répliques 1 à 5 illustrées à ce jour ; répliques 6 et 7 ("Clique
    // deux fois ici !" + mécanisme du double-tap, "tu es prêt/prête !")
    // en attente de leurs illustrations — voir note détaillée sur
    // IMAGES_DON_SAC.
    donSacQuestion: 'images/accueil/index_bonomes_keb_bek_il-elle_est_pret-e_01.webp',
    donSacPresque: 'images/accueil/index_bonomes_keb_bek_presque_01.webp',
    // 🆕 Réplique 3 ("Oh ! Oui !") — 2 images fournies cette session
    // (Keb réalise, puis part chercher le sac), voir IMAGES_DON_SAC.
    donSacRealise: 'images/accueil/index_bonomes_keb_bek_cest-vrai_01.webp',
    donSacPart: 'images/accueil/index_bonomes_keb_bek_keb_part_01.webp',
    // 🆕 Réplique 4 — Keb revient avec le sac (pas de nouvelle réplique).
    donSacRevient: 'images/accueil/index_bonomes_keb_bek_keb_revient_sac_01.webp',
    // 🆕 Réplique 5 — Bek dit "C'est pour toi !", puis Keb ajoute
    // "Tiens !" sur la 2e image (illustrations fournies par Raphaël ;
    // ordre des répliques CORRIGÉ cette session — voir DIALOGUES_FIXES).
    donSacPourToi: 'images/accueil/index_bonomes_keb_bek_sac-pour-toi_01.webp',
    // 🆕 2e image de la réplique 5 — utilisée pour la transition
    // automatique qui ajoute la réplique de Keb sous celle de Bek (voir
    // dialogueClesParFrame dans IMAGES_DON_SAC).
    donSacPourToi2: 'images/accueil/index_bonomes_keb_bek_sac-pour-toi_02.webp',
    // 🆕 Scène de déblocage du sac (voir lancerDeblocageSac plus bas) —
    // image fournie par Raphaël, déjà lumineuse/scintillante par
    // elle-même : l'animation CSS n'a donc qu'à ajouter le flottement,
    // pas à recréer la lueur.
    debloqueSac: 'images/accueil/index_bonomes_keb_bek_sac-1-débloqué_01.webp',
    // 🆕 Icône du sac une fois posé en haut à droite (#sacBouton) —
    // DISTINCTE de debloqueSac ci-dessus : celle-ci sert UNIQUEMENT à
    // l'icône permanente du bouton (ligne simple, pas de lueur), jamais
    // à la scène de révélation/vol (qui garde debloqueSac, la version
    // lumineuse) — demande explicite de Raphaël.
    iconeSac: 'images/accueil/index_bonomes_icone_sac_01.webp',
    // 🆕 Scène "Essaie !" (voir lancerEssaieDoubleTap plus bas) — image
    // fournie par Raphaël cette session.
    essaie: 'images/accueil/index_bonomes_keb_bek_essaie_01.webp',
    // 🆕 Image affichée dès que le double-tap sur "Essaie" réussit (voir
    // reussirEssaie dans lancerEssaieDoubleTap) — remplace l'image
    // "essaie" à cet instant précis, en même temps que le mot vole vers
    // le sac et que tous les mots déjà touchés y sont ajoutés d'un coup.
    tadam: 'images/accueil/index_bonomes_keb_bek_tadam_01.webp',
    // 🆕 Séquence "Prêt(e) ?" (voir lancerPretBek/lancerConfirmationIdentite
    // plus bas) — deux images distinctes fournies par Raphaël : pretBek
    // (Bek affirme, sourire) pour "Bon, là, il/elle est prêt(e).", pretKeb
    // (expression neutre/interrogative) pour la vraie question "Prêt(e) ?".
    pretBek: 'images/accueil/index_bonomes_keb_bek_affirme_pret_01.webp',
    pretKeb: 'images/accueil/index_bonomes_keb_bek_pret_pas_pret_01.webp'
  };

  function image(options, cle) {
    const im = (options && options.images) || {};
    return (im[cle] !== undefined) ? im[cle] : IMAGES_PAR_DEFAUT[cle];
  }

  // ---------- Vocabulaire de genre — TOUJOURS en français, quelle que
  // soit la langue de l'interface (voir 🐛 CORRIGÉ dans lancerSilhouettes
  // plus bas) ----------
  const VOCABULAIRE_GENRE = {
    garcon: 'Un garçon',
    homme: 'Un homme',
    fille: 'Une fille',
    femme: 'Une femme'
  };

  // 🆕 Préfixe du champ de saisie du nom (voir lancerSaisieNom) —
  // TOUJOURS en français, même principe que VOCABULAIRE_GENRE ci-dessus :
  // l'élève complète littéralement la phrase que Bek vient d'entamer
  // ("Et toi, c'est... ?", voir dialogueQuestion), donc "Moi, c'est"
  // reste en français peu importe la langue de l'interface, contrairement
  // à l'ancien labelPrefixeNom (traduit, retiré — voir note dans
  // lancerSaisieNom).
  const PREFIXE_NOM_FR = "Moi, c'est";

  // ---------- Répliques fixes de la nouvelle étape "Enchanté(e)"
  // (dialogue fourni par Raphaël) — TOUJOURS en français, même principe
  // que VOCABULAIRE_GENRE et BANQUE_NOMS : ce sont des phrases de
  // personnages, pas du chrome d'interface à traduire. {prenom} est
  // remplacé au moment de l'affichage par remplacerPrenom(). ----------
  const DIALOGUES_FIXES = {
    enchanteeBek: 'Enchantée, {prenom}\u00A0!',
    enchanteKeb: 'Enchanté, {prenom}.',
    continuonsBek: 'Continuons. Je suis une fille.',
    garconKeb: 'Moi, je suis un garçon.',
    etToiBek: 'Et toi\u00A0? Tu es\u2026',
    // 🆕 Réaction de Keb/Bek à la silhouette choisie (voir
    // lancerReactionSilhouette) — dialogue fourni par Raphaël cette
    // session, TOUJOURS en français comme le reste de DIALOGUES_FIXES.
    // "Choc choc" : expression inventée par Keb pour "franciser" le
    // "fist bump" — volontairement laissée telle quelle, ce n'est pas
    // une coquille.
    reactionGarcon: 'Tu es un garçon\u00A0! Choc choc\u00A0!',
    reactionHomme: 'Tu es un homme. Respect\u00A0!',
    reactionFille: 'Tu es une fille\u00A0! Youpie\u00A0!',
    reactionFemme: 'Tu es une femme\u00A0! Chouette\u00A0!',
    // 🆕 Scène de remise du sac (voir lancerRemiseSac) — dialogue fourni
    // par Raphaël cette session, TOUJOURS en français comme le reste de
    // DIALOGUES_FIXES. La première réplique existe en 2 variantes
    // accordées (donSacQuestionM/F) — pas de {prenom} ici, l'accord se
    // fait plutôt sur le GENRE déjà collecté par la séquence identité
    // (voir dialogueCleDonSac() plus bas, qui choisit la bonne variante).
    // Répliques 3 à 7 (départ de Keb, retour avec le sac, remise du sac,
    // enseignement du double-tap, clôture accordée "tu es prêt/prête")
    // pas encore ajoutées — en attente des illustrations correspondantes.
    donSacQuestionM: 'Bon\u00A0! Il est prêt\u00A0?',
    donSacQuestionF: 'Bon\u00A0! Elle est prête\u00A0?',
    donSacPresque: 'Presque\u00A0! Le sac\u00A0!',
    // 🆕 Réplique 3 — même texte affiché sur les 2 images de ce groupe
    // (Keb réalise, puis part), voir IMAGES_DON_SAC/construireFramesDonSac.
    donSacOhOui: 'Oh\u00A0! Oui\u00A0!',
    // 🆕 Réplique 4 — Keb revient et annonce le sac ; Bek réagit 1 seconde
    // plus tard, SUR LA MÊME IMAGE (voir dialogueCleRetardee dans
    // IMAGES_DON_SAC — corrigé cette session, sur demande explicite de
    // Raphaël : « Génial ! » se disait à tort sur l'image SUIVANTE).
    // Clés se terminant par "Keb"/"Bek" : pas besoin d'entrée dans
    // LOCUTEURS_EXCEPTIONS, locuteurDeDialogue() les détecte déjà via son
    // repli par défaut (/Bek$/, /Keb$/).
    donSacRevientKeb: 'Voilà le sac\u00A0!',
    donSacRevientBek: 'Génial\u00A0!',
    // 🆕 Réplique 5 (CORRIGÉE cette session) — c'est Bek qui parle en
    // premier (« C'est pour toi ! »), Keb ajoute « Tiens ! » en même
    // temps que la 2e image apparaît (voir dialogueClesParFrame dans
    // IMAGES_DON_SAC). Avant cette correction, les deux phrases étaient
    // fusionnées sur la seule réplique de Keb ("Tiens ! C'est pour
    // toi !") — désormais chacun n'a que sa propre phrase. Clés se
    // terminant par "Keb"/"Bek" : même remarque que ci-dessus, pas
    // besoin d'exception.
    donSacPourToiBek: "C'est pour toi\u00A0!",
    donSacTiensKeb: 'Tiens\u00A0!',
    // 🆕 Scène "Essaie !" (voir lancerEssaieDoubleTap plus bas) — Bek
    // invite l'élève à pratiquer le double-tap pour de vrai. "Essaie"
    // est la forme tutoiement (informelle) de l'impératif d'"essayer" —
    // voir MOTS_INFORMELS, qui le signale dans la bulle de traduction et
    // le sac, plus bas dans le .js.
    essaieBek: 'Essaie\u00A0!',
    // 🆕 Réplique de RÉUSSITE (voir reussirEssaie plus bas) — remplace
    // "Essaie !" une fois le double-tap réussi, en même temps que l'image
    // bascule sur tadam (voir image(options, 'tadam')). Dite par KEB
    // (suffixe "Keb" → locuteurDeDialogue() l'attribue automatiquement),
    // pas Bek — précision explicite de Raphaël, qui avait déjà mentionné
    // ce texte lors d'une session antérieure.
    tadamKeb: 'Tadam\u00A0!',
    // 🆕 Séquence "Prêt(e) ?" — Bek se tourne vers Keb pour constater que
    // l'élève est prêt (accord de genre sur s.genre, voir lancerPretBek),
    // puis Keb pose la vraie question à l'élève (lancerConfirmationIdentite).
    pretCompteBekM: 'Bon, l\u00e0, il est pr\u00eat.',
    pretCompteBekF: 'Bon, l\u00e0, elle est pr\u00eate.',
    pretCompteKebM: 'Pr\u00eat\u00a0?',
    pretCompteKebF: 'Pr\u00eate\u00a0?'
  };

  function remplacerPrenom(texteBrut, prenom) {
    return texteBrut.replace('{prenom}', prenom);
  }

  // 🆕 Réponse à la question "deux bulles distinctes, gauche/droite ?" —
  // solution retenue : UNE seule bulle centrée (déjà en place, déjà
  // testée contre le fond réel), mais chaque ligne prend une teinte
  // légèrement différente selon qui parle. Une vraie bulle par
  // personnage (positionnée à gauche pour l'un, à droite pour l'autre)
  // demanderait de recalculer deux positions différentes à chaque
  // largeur d'écran, avec un risque réel de chevauchement sur mobile
  // dès que l'un des deux textes est un peu long (voir déjà le souci
  // documenté en v4 sur la largeur de .iden-bulle) — la couleur règle le
  // même besoin (distinguer qui parle) sans aucun de ces problèmes de
  // mise en page, et s'appuie sur des noms de clés qui encodent déjà le
  // locuteur (enchanteeBek, enchanteKeb, etc.), donc rien à dupliquer.
  // Retourne 'bek' | 'keb' | null (null = pas de couleur spécifique,
  // ex. répliques hors de cette liste).
  const LOCUTEURS_EXCEPTIONS = {
    // dialogueQuestion ne se termine pas par "Bek"/"Keb" comme les
    // autres clés (nom choisi avant l'ajout des couleurs), mais c'est
    // bien Bek qui pose la question ("Et toi, tu t'appelles comment ?"
    // — voir introAltQuestion : "Bek asks: what is your name?").
    dialogueQuestion: 'bek',
    // 🆕 Réaction de Keb/Bek à la silhouette choisie — mêmes raisons que
    // dialogueQuestion ci-dessus (clés nommées par silhouette, pas par
    // locuteur) : garçon/homme réagissent par la voix de Keb, fille/femme
    // par celle de Bek, comme précisé par Raphaël.
    reactionGarcon: 'keb',
    reactionHomme: 'keb',
    reactionFille: 'bek',
    reactionFemme: 'bek',
    // 🆕 Scène de remise du sac — Keb pose la question ("Bon\u00A0! Il/
    // Elle est prêt(e)\u00A0?"), Bek répond ("Presque\u00A0! Le sac\u00A0!").
    donSacQuestionM: 'keb',
    donSacQuestionF: 'keb',
    donSacPresque: 'bek',
    donSacOhOui: 'keb',
    // 🆕 Séquence "Prêt(e) ?" — mêmes raisons que ci-dessus (suffixe M/F
    // après Bek/Keb, donc hors de portée de la regex /Bek$|Keb$/).
    pretCompteBekM: 'bek',
    pretCompteBekF: 'bek',
    pretCompteKebM: 'keb',
    pretCompteKebF: 'keb'
  };
  function locuteurDeDialogue(dialogueCle) {
    if (LOCUTEURS_EXCEPTIONS[dialogueCle] !== undefined) return LOCUTEURS_EXCEPTIONS[dialogueCle];
    if (/Bek$/.test(dialogueCle)) return 'bek';
    if (/Keb$/.test(dialogueCle)) return 'keb';
    return null;
  }

  // Icônes de genre (traits simples, cohérents avec le style du site —
  // même famille que les icônes de sac-a-dos.js) — affichées sur chaque
  // case de choix de nom de repli pour indiquer si le prénom proposé est
  // masculin ou féminin, comme demandé par Raphaël.
  function iconeGenreMasculin() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="14" r="6"/><path d="M14.5 9.5 20 4"/><path d="M15 4h5v5"/></svg>';
  }
  function iconeGenreFeminin() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M8.5 19h7"/></svg>';
  }

  // vocabCle référence VOCABULAIRE_GENRE (toujours en français) — voir
  // note "🐛 CORRIGÉ" dans lancerSilhouettes plus bas ; ce n'est plus une
  // clé vers TEXTES_PAR_DEFAUT/options.textes (ancien labelCle, retiré).
  const SILHOUETTES = [
    { id: 'garcon', genre: 'm', adulte: false, vocabCle: 'garcon' },
    { id: 'homme',  genre: 'm', adulte: true,  vocabCle: 'homme' },
    { id: 'fille',  genre: 'f', adulte: false, vocabCle: 'fille' },
    { id: 'femme',  genre: 'f', adulte: true,  vocabCle: 'femme' }
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
    // 🆕 CORRIGÉ cette session : introTerminee (booléen) devient
    // etapeScene (3 états) — la scène des personnages devait pouvoir
    // redevenir active une seconde fois pour la nouvelle étape de
    // dialogue "Enchanté(e)" entre le choix du nom et les silhouettes
    // (voir lancerDialogueEnchantes plus bas), pas seulement pendant
    // l'intro. 'intro' : trio Keb/Bek/question (étape 0). 'inactive' :
    // saisie du nom / choix de repli / silhouettes — taper sur les
    // personnages n'avance plus rien. 'dialogue' : la nouvelle étape
    // "Enchanté(e)" ci-dessous, une fois le nom choisi.
    let etapeScene = 'intro';
    // Pointeurs réassignés selon etapeScene plutôt que d'empiler un
    // nouvel écouteur click/clavier/glissement à chaque étape — un seul
    // jeu d'écouteurs sur #idenPersonnages, attaché une fois pour
    // toutes, qui délègue simplement à la fonction du moment.
    let avancerActif = null;
    let reculerActif = null;

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
    // 🐛 CORRIGÉ cette session : cette variable + les deux fonctions
    // ci-dessous remplacent l'ancien câblage qui ne connaissait QUE
    // l'étape 0 (IMAGES_INTRO[indexActuel].dialogueCle, en dur). Résultat
    // concret du bug : à l'étape "Enchanté(e)" (afficherBulleEnchantes
    // plus bas), le bouton "Traduire la phrase" restait sur son dernier
    // état de l'étape 0 (souvent display:none, hérité de lancerSaisieNom)
    // et n'était JAMAIS remis à jour pour les répliques de cette
    // nouvelle scène — aucune traduction de phrase n'y était donc
    // jamais possible, quel que soit le contenu de
    // options.traductionsPhrases. dialogueClesActuelles est un TABLEAU
    // (pas une seule clé) pour couvrir le cas "Bek + Keb parlent en même
    // temps" de la première image de cette étape (2 répliques à la fois).
    let dialogueClesActuelles = [IMAGES_INTRO[0].dialogueCle];

    const btnTraduirePhrase = document.createElement('button');
    btnTraduirePhrase.type = 'button';
    btnTraduirePhrase.className = 'iden-btn-traduire-phrase';
    btnTraduirePhrase.textContent = texte(options, 'labelTraduirePhrase');
    conteneur.appendChild(btnTraduirePhrase);

    const tooltipPhrase = document.createElement('div');
    tooltipPhrase.className = 'iden-tooltip-phrase';
    conteneur.appendChild(tooltipPhrase);

    // Traduction de phrase, généralisée à un TABLEAU de clés (une seule
    // dans la plupart des cas, deux pour "Enchanté(e)") — les morceaux
    // trouvés sont joints par un espace. Les clés de DIALOGUES_FIXES
    // (scène "Enchanté(e)") contiennent {prenom} dans le texte français
    // ET dans sa traduction (voir options.traductionsPhrases) : sans
    // cette substitution, "{prenom}" apparaîtrait tel quel, non remplacé,
    // dans la traduction affichée — même transformation que
    // remplacerPrenom() applique déjà au texte français lui-même.
    function texteTraductionPhrase(cles) {
      const dico = (options && options.traductionsPhrases) || {};
      const morceaux = cles.map(function (cle) {
        const brut = dico[cle];
        if (!brut) return null;
        return DIALOGUES_FIXES[cle] ? remplacerPrenom(brut, prenomChoisi || '') : brut;
      }).filter(Boolean);
      return morceaux.length > 0 ? morceaux.join(' ') : null;
    }

    // À appeler à chaque changement de réplique (étape 0 ET "Enchanté(e)")
    // — remet le bouton/la bulle de traduction de phrase à zéro pour la
    // nouvelle réplique, et n'affiche le bouton que si une traduction
    // existe réellement pour elle (jamais un bouton qui ne ferait rien).
    function majBoutonTraduirePhrase(cles) {
      dialogueClesActuelles = cles;
      phraseTraductionVisible = false;
      tooltipPhrase.classList.remove('visible');
      tooltipPhrase.textContent = '';
      btnTraduirePhrase.textContent = texte(options, 'labelTraduirePhrase');
      btnTraduirePhrase.style.display = texteTraductionPhrase(cles) ? '' : 'none';
    }

    btnTraduirePhrase.addEventListener('click', function (e) {
      e.stopPropagation();
      phraseTraductionVisible = !phraseTraductionVisible;
      if (phraseTraductionVisible) {
        tooltipPhrase.textContent = texteTraductionPhrase(dialogueClesActuelles) || '';
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

    // 🆕 CORRIGÉ cette session — remplace l'ancien badge "sourire" accroché
    // au mot "Essaie" (retiré, voir plus bas dans lancerEssaieDoubleTap) :
    // Raphaël a précisé que l'indication du registre informel doit vivre à
    // DEUX endroits précis, ni plus ni moins :
    //   1. Dans le SAC lui-même, une fois le mot rangé dedans (voir
    //      ajouterMotAuSac plus bas, qui transmet désormais un champ
    //      `informel` à window.ajouterAuSac — à afficher par sac-a-dos.js
    //      le jour où cette page sera vraiment branchée dessus, voir note
    //      ⚠️ en tête de fichier : ce module ne fait qu'émettre la donnée,
    //      pas l'afficher lui-même).
    //   2. Dans la bulle de traduction d'un mot (afficherTraductionMot
    //      ci-dessous), directement accolée à la traduction — PAS un badge
    //      séparé à côté du mot dans le texte parlé.
    // MOTS_INFORMELS : liste, en français minuscule, des mots de
    // tutoiement/registre informel connus à ce jour — un seul pour
    // l'instant ("essaie", impératif tutoiement d'"essayer" dans
    // essaieBek), pensée pour grossir facilement à mesure que d'autres
    // répliques introduisent du tutoiement.
    const MOTS_INFORMELS = new Set(['essaie']);

    // LANGUES_SANS_PRECISION_INFORMEL : langues de l'interface où la
    // précision est jugée superflue — confirmé par Raphaël pour
    // l'espagnol seulement ("en espagnol, par exemple, pas besoin !"),
    // vraisemblablement parce que sa traduction du mot porte déjà elle-
    // même la marque du tutoiement (contrairement à l'anglais, où "try"
    // ne dit rien du registre). À compléter au cas par cas si Raphaël
    // confirme d'autres langues (allemand, italien, portugais...), plutôt
    // que de deviner ici.
    const LANGUES_SANS_PRECISION_INFORMEL = new Set(['es']);

    function motEstInformel(mot) {
      return MOTS_INFORMELS.has(mot.toLowerCase());
    }

    function precisionInformelleUtile() {
      const langue = (options && options.langue) || '';
      return !LANGUES_SANS_PRECISION_INFORMEL.has(langue);
    }

    function afficherTraductionMot(span, mot) {
      document.querySelectorAll('.iden-tooltip-mot').forEach(function (t) { t.remove(); });
      const trad = traductionDeMot(mot);
      if (!trad) return;
      // 🆕 Retient CE mot (traduit avec succès, simple clic ou pas) pour
      // le déversement en bloc dans le vrai sac une fois qu'il devient
      // pleinement actif — voir motsToucheSession/
      // synchroniserMotsToucheSacUneFois plus bas, et reussirEssaie()
      // dans lancerEssaieDoubleTap qui déclenche ce déversement.
      motsToucheSession.set(mot.toLowerCase(), { trad: trad, informel: motEstInformel(mot) });
      const tip = document.createElement('span');
      tip.className = 'iden-tooltip-mot';
      let contenu = trad;
      if (motEstInformel(mot) && precisionInformelleUtile()) {
        contenu += ' ' + texte(options, 'etiquetteInformel');
      }
      tip.textContent = contenu;
      span.appendChild(tip);
    }

    // 🆕 v3 — un seul ajout (et un seul flash) par mot par passage dans la
    // séquence, même si l'élève reclique dessus plusieurs fois pour revoir
    // la traduction (ajouterAuSac lui-même est déjà protégé contre les
    // doublons, mais sans ceci l'animation de flash rejouerait à chaque
    // clic, ce qui serait trompeur — elle ne doit signaler qu'un AJOUT).
    const motsDejaAjoutes = new Set();

    // 🆕 TOUS les mots dont la traduction a été affichée pendant la
    // séquence (voir afficherTraductionMot ci-dessus) — pas seulement
    // ceux ajoutés au sac. Sert à remplir le sac d'un coup au moment où
    // il devient pleinement actif (voir synchroniserMotsToucheSacUneFois
    // plus bas, appelée par reussirEssaie() dans lancerEssaieDoubleTap).
    const motsToucheSession = new Map();

    // 🆕 Anime un CLONE du mot qui s'envole depuis sa position réelle
    // jusqu'au bouton du sac (#sacBouton, réel ou de repli — voir
    // creerSacBoutonSiAbsent) puis disparaît — retour visuel concret pour
    // "ce mot vient d'être rangé", plutôt qu'un simple flash sur place
    // (.flash-ajout, conservé par ailleurs, voir ajouterMotAuSac). Repli
    // silencieux si #sacBouton est absent de la page (aucune animation),
    // même prudence que partout ailleurs dans ce fichier.
    const DUREE_VOL_MOT = 550;
    // Combien de temps le sac reste ouvert APRÈS l'atterrissage du mot
    // (voir animerMotVersSac ci-dessous) avant de se refermer tout seul —
    // assez pour que "le mot glisse à l'intérieur" se voie clairement,
    // sans laisser le sac ouvert indéfiniment après.
    const DELAI_FERMETURE_SAC_APRES_RECEPTION = 350;
    function animerMotVersSac(span) {
      const bouton = document.getElementById('sacBouton');
      // 🐛 CORRIGÉ (signalé par Raphaël — "j'ai cliqué sur essaie et il
      // n'y a eu aucun effet") : `bouton.offsetParent === null` est
      // TOUJOURS vrai pour un élément `position: fixed` (comme
      // #sacBouton, voir sac-a-dos.css), peu importe qu'il soit visible
      // ou non — ce n'est pas un hasard de bug d'affichage, c'est le
      // comportement standard des navigateurs pour ce type de
      // positionnement. Cette fonction sortait donc TOUJOURS ici,
      // silencieusement, et rien ne s'animait jamais. Remplacé par un
      // vrai test de visibilité via getComputedStyle (fonctionne quel
      // que soit le schéma de positionnement).
      if (!bouton || getComputedStyle(bouton).display === 'none') return; // pas de sac, ou sac pas encore révélé sur cette page
      const depart = span.getBoundingClientRect();
      const arrivee = bouton.getBoundingClientRect();
      const clone = document.createElement('span');
      clone.className = 'iden-mot-vole';
      clone.textContent = span.textContent;
      clone.style.left = depart.left + 'px';
      clone.style.top = depart.top + 'px';
      document.body.appendChild(clone);
      const dx = (arrivee.left + arrivee.width / 2) - (depart.left + depart.width / 2);
      const dy = (arrivee.top + arrivee.height / 2) - (depart.top + depart.height / 2);
      void clone.offsetWidth; // force le reflow avant de fixer la cible, voir même technique dans declencherVol
      clone.style.setProperty('--vol-dx', dx + 'px');
      clone.style.setProperty('--vol-dy', dy + 'px');
      clone.classList.add('en-vol');
      clone.addEventListener('transitionend', function () { clone.remove(); }, { once: true });
      // 🆕 Le sac s'OUVRE (icône, voir sac-icone-fermee/ouverte dans le
      // CSS) dès que le mot s'envole — le temps qu'il arrive, l'élève voit
      // le mot glisser dans un sac déjà ouvert plutôt que disparaître
      // dans un sac fermé. Classe DISTINCTE de `.ouvert` (réservée au vrai
      // panneau, pilotée par toggleSacADos) pour ne jamais désynchroniser
      // l'état réel du panneau — ce n'est qu'un geste visuel de réception,
      // pas une vraie ouverture du panneau.
      bouton.classList.add('sac-recoit');
      setTimeout(function () {
        bouton.classList.remove('iden-sac-eclat');
        void bouton.offsetWidth;
        bouton.classList.add('iden-sac-eclat');
      }, DUREE_VOL_MOT);
      setTimeout(function () {
        bouton.classList.remove('sac-recoit');
      }, DUREE_VOL_MOT + DELAI_FERMETURE_SAC_APRES_RECEPTION);
    }

    // 🆕 Déverse dans le VRAI sac (window.ajouterAuSac) tous les mots
    // accumulés dans motsToucheSession depuis le début de la séquence —
    // appelée UNE SEULE FOIS, par reussirEssaie() dans
    // lancerEssaieDoubleTap : c'est le moment choisi par Raphaël où le
    // sac cesse d'être une icône vide et devient pleinement actif. Le mot
    // "essaie" lui-même n'a pas besoin d'y être ajouté séparément ici —
    // ajouterMotAuSac() vient déjà de l'ajouter via le double-clic qui a
    // déclenché reussirEssaie() (voir plus bas), et window.ajouterAuSac
    // ignore de toute façon les doublons.
    function synchroniserMotsToucheSacUneFois() {
      if (typeof window.ajouterAuSac !== 'function') return;
      motsToucheSession.forEach(function (info, cle) {
        window.ajouterAuSac('mots', { mot: cle, trad: info.trad || '', informel: info.informel });
      });
    }

    function ajouterMotAuSac(span, mot) {
      if (typeof window.ajouterAuSac !== 'function') return; // sac-a-dos.js absent de la page : repli silencieux
      const cle = mot.toLowerCase(); // forme canonique : "Moi" (début de phrase) et "moi" (ailleurs) sont le même mot de vocabulaire
      // 🆕 `informel` transmis systématiquement (pas seulement si vrai) —
      // à sac-a-dos.js de décider comment l'afficher (étiquette, icône...)
      // le jour où il sera vraiment branché sur cette page.
      window.ajouterAuSac('mots', { mot: cle, trad: traductionDeMot(mot) || '', informel: motEstInformel(mot) });
      animerMotVersSac(span);
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
      // 🆕 Même logique de couleur par locuteur que la bulle "Enchanté(e)"
      // (voir locuteurDeDialogue) — ici une seule réplique à la fois,
      // donc la classe va directement sur la bulle plutôt que sur une
      // ligne interne. Réinitialisée à chaque appel pour ne pas garder
      // la couleur de la réplique précédente.
      bulle.classList.remove('iden-bulle-ligne-bek', 'iden-bulle-ligne-keb');
      const locuteur = locuteurDeDialogue(dialogueCle);
      if (locuteur) bulle.classList.add('iden-bulle-ligne-' + locuteur);
      const brut = texte(options, dialogueCle);
      if (!brut) return;
      // 🆕 v5 — la ponctuation française précédée d'un espace ("Salut !",
      // "comment ?") se retrouvait isolée comme mot à part entière après un
      // simple split sur les espaces — un span cliquable, lumineux, pour un
      // "!" tout seul, qui ne peut évidemment correspondre à aucune entrée
      // du dictionnaire. Repli ici : tout token composé uniquement de
      // ponctuation est rattaché au mot précédent plutôt que de former son
      // propre span.
      const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
      // 🐛 CORRIGÉ cette session : le points de suspension "…" (U+2026,
      // utilisé dans etToiBek : "Tu es…") n'était PAS dans cette classe
      // de caractères — un mot suivi de "…" sans espace ("es…") n'était
      // donc jamais nettoyé de son "…" final, et la clé nettoyée ("es…")
      // ne correspondait alors plus jamais à l'entrée "es" du
      // dictionnaire de traduction. "…" ajouté aux deux regex ci-dessous
      // (celle-ci et motNettoye plus bas), même principe que les autres
      // signes de ponctuation déjà gérés.
      const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
      const mots = [];
      motsBrutSepares.forEach(function (tok) {
        if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
          mots[mots.length - 1] += '\u00A0' + tok;
        } else {
          mots.push(tok);
        }
      });
      mots.forEach(function (motBrut, idx) {
        const span = document.createElement('span');
        span.className = 'iden-mot';
        span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
        // 🆕 v4 — corrigé : ne retire la ponctuation qu'EN DÉBUT/FIN de
        // mot (^...|...$), plus au milieu. L'ancienne regex globale
        // retirait aussi l'apostrophe INTERNE des contractions
        // françaises ("c'est" → "cest", "t'appelles" → "tappelles"),
        // ce qui cassait la recherche dans options.traductions : la
        // clé du dictionnaire ("c'est") ne correspondait plus jamais
        // au mot nettoyé, donc aucune traduction ne s'affichait pour
        // ces mots-là.
        const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
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
      majBoutonTraduirePhrase([dialogueCle]);
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

    avancerActif = avancerIntro;
    reculerActif = reculerIntro;

    // 🐛 CORRIGÉ (session navigation) : le chevron gauche n'avait JAMAIS
    // son propre écouteur — un clic dessus remontait (bubbling) jusqu'à
    // l'écouteur 'click' général ci-dessous, qui appelle toujours
    // avancerActif() sans distinction. Résultat concret : taper près de
    // la flèche gauche faisait AVANCER la scène au lieu de reculer —
    // d'où "revenir en arrière ne fonctionne plus du tout" pour qui
    // clique dessus en s'attendant à l'effet inverse. Écouteur dédié ici,
    // avec stopPropagation() pour empêcher l'écouteur général de
    // s'exécuter en plus (qui appellerait sinon avancerActif() juste
    // après).
    chevronGauche.addEventListener('click', function (e) {
      e.stopPropagation();
      if (etapeScene === 'inactive') return;
      reculerActif();
    });
    // Symétrique côté droit — inutile en pratique (l'écouteur général
    // ci-dessous couvre déjà ce cas), mais gardé explicite pour que les
    // deux chevrons soient traités de façon symétrique et non par
    // accident du bubbling.
    chevron.addEventListener('click', function (e) {
      e.stopPropagation();
      if (etapeScene === 'inactive') return;
      avancerActif();
    });

    personnages.addEventListener('click', function (e) {
      if (etapeScene === 'inactive') return;
      if (e.target.closest('.iden-mot')) return; // cliquer un mot ne doit pas avancer la scène
      avancerActif();
    });
    personnages.addEventListener('keydown', function (e) {
      if (etapeScene === 'inactive') return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avancerActif(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); avancerActif(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); reculerActif(); }
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
      if (etapeScene === 'inactive') return;
      toucheDebutX = e.changedTouches[0].clientX;
    }, { passive: true });
    personnages.addEventListener('touchend', function (e) {
      if (etapeScene === 'inactive' || toucheDebutX === null) return;
      if (e.target.closest('.iden-mot')) { toucheDebutX = null; return; } // laisser le clic du mot faire son travail
      const deltaX = e.changedTouches[0].clientX - toucheDebutX;
      toucheDebutX = null;
      if (Math.abs(deltaX) < SEUIL_GLISSEMENT_PX) return; // tap normal : le 'click' natif s'en charge déjà
      e.preventDefault(); // empêche le 'click' synthétique de déclencher un second avancement
      if (deltaX < 0) avancerActif(); // glissé vers la gauche : image suivante
      else reculerActif(); // glissé vers la droite : image précédente
    }, { passive: false });

    afficherBulle(IMAGES_INTRO[0].dialogueCle);

    // 🐛 CORRIGÉ (session navigation) : avoir tabIndex=0 sur #idenPersonnages
    // le rend focusable, mais ne lui donne PAS le focus automatiquement —
    // sans un .focus() explicite quelque part, l'élément ne reçoit jamais
    // le focus tant que l'élève ne clique/tabule pas dessus lui-même. Or
    // l'écouteur 'keydown' (flèches ← →, Entrée, Espace) est attaché à CET
    // élément précis : sans focus dessus, ces touches ne déclenchent
    // strictement rien, quel que soit ce que l'élève tape sur son clavier.
    // C'est la cause réelle de "les flèches du clavier ne fonctionnent
    // pas" — jamais assigné nulle part dans le fichier avant ce correctif.
    personnages.focus();

    // ---- Étape 1 : saisie libre du nom ----
    // 🆕 N'écrit plus que dans #idenAction — Keb/Bek (#idenPersonnages,
    // créé plus haut, une seule fois) restent affichés derrière, comme
    // demandé.
    function lancerSaisieNom() {
      etapeScene = 'inactive';
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

      // 🐛 CORRIGÉ cette session (demande de Raphaël, suite à la même
      // incohérence relevée sur dialogueQuestion ci-dessus) : le préfixe
      // était traduit dans la langue de l'élève ("My name is"/"Me
      // llamo"/etc. selon options.textes), ce qui rompait la continuité
      // avec "Moi, c'est Keb"/"Et moi, c'est Bek"/"Et toi, c'est... ?" —
      // trois répliques en français que l'élève vient de lire. Le champ
      // de saisie continue maintenant littéralement la même phrase que
      // Bek vient d'entamer, donc TOUJOURS en français, peu importe la
      // langue de l'interface — même principe que VOCABULAIRE_GENRE plus
      // haut dans le fichier (jamais passé par texte()/options.textes).
      // labelPrefixeNom (dans TEXTES_PAR_DEFAUT/options.textes) n'est
      // donc plus consulté ici ; les traductions existantes de cette clé
      // dans index.html restent inertes (aucun mal à les laisser, mais
      // elles ne servent plus à rien pour ce champ précis).
      const prefixe = document.createElement('span');
      prefixe.className = 'iden-prefixe-nom';
      prefixe.textContent = PREFIXE_NOM_FR;
      ligne.appendChild(prefixe);

      const champ = document.createElement('input');
      champ.type = 'text';
      champ.className = 'iden-champ-nom';
      // 🐛 CORRIGÉ cette session : labelChampNom valait "..." partout
      // (jamais un vrai texte traduit) — remplacé par une vraie invite
      // ("ton prénom"/"your first name"/etc.), CETTE FOIS bien traduite
      // dans la langue de l'élève (contrairement au préfixe ci-dessus,
      // qui reste toujours en français) : c'est un indice d'interface
      // adressé à l'élève, pas une réplique des personnages.
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
          // 🆕 CORRIGÉ cette session : ne saute plus directement aux
          // silhouettes — le dialogue "Enchanté(e)" s'intercale d'abord
          // (voir lancerDialogueEnchantes), peu importe le chemin (nom
          // direct ou repli), sur demande de Raphaël.
          lancerDialogueEnchantes(null); // aucun genre pré-rempli : 4 choix ouverts ensuite
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
          // 🐛 CORRIGÉ cette session : rien n'indiquait si un nom de repli
          // proposé était masculin ou féminin — juste le texte du nom, pas
          // de signal visuel. Ajout d'un pictogramme simple (silhouette
          // masculine/féminine, trait unique cohérent avec le style du
          // site) à côté de chaque nom, comme demandé par Raphaël.
          btn.innerHTML =
            '<span class="iden-icone-genre-nom" aria-hidden="true">' +
              (genre === 'm' ? iconeGenreMasculin() : iconeGenreFeminin()) +
            '</span>' +
            '<span class="iden-texte-nom">' + paire[genre] + '</span>';
          btn.addEventListener('click', function () {
            prenomChoisi = paire[genre];
            // 🆕 CORRIGÉ cette session : même dialogue "Enchanté(e)" que le
            // chemin de saisie directe, avant les silhouettes — voir note
            // équivalente dans lancerSaisieNom ci-dessus.
            lancerDialogueEnchantes(genre); // genre pré-rempli depuis ce choix
          });
          grille.appendChild(btn);
        });
      });

      action.appendChild(grille);
    }

    // ---- Étape 1ter (🆕 cette session) : dialogue "Enchanté(e)" ----
    // Jouée après CHAQUE chemin de choix du nom (saisie libre réussie OU
    // repli après 3 échecs), avant les silhouettes — demande explicite de
    // Raphaël cette session : "après le choix du nom, la séquence n'est
    // pas tout de suite 'which one is you ?'". 4 images (enchantes/fille/
    // garcon/etToi), tap/clic pour avancer, EXACTEMENT le même mécanisme
    // que l'étape 0 (scène #idenPersonnages réactivée via etapeScene, une
    // seule image .actif à la fois, bulle de texte mot-à-mot cliquable
    // avec traduction + ajout au sac). Bek et Keb parlent "en même temps"
    // sur la première image (Enchantée/Enchanté) — les deux répliques
    // sont affichées comme deux lignes distinctes dans la même bulle,
    // chacune découpée en mots cliquables séparément.
    function lancerDialogueEnchantes(genrePreRempli) {
      action.innerHTML = '';
      // Chevrons/indice de nouveau visibles : ils avaient été masqués par
      // lancerSaisieNom() (voir etapeScene = 'inactive' plus haut).
      chevron.style.display = '';
      chevronGauche.style.display = '';
      indice.style.display = '';

      const IMAGES_DIALOGUE_ENCHANTES = [
        { cle: 'enchantes', altCle: 'altEnchantes', dialogueCles: ['enchanteeBek', 'enchanteKeb'] },
        { cle: 'fille', altCle: 'altFille', dialogueCles: ['continuonsBek'] },
        { cle: 'garcon', altCle: 'altGarcon', dialogueCles: ['garconKeb'] },
        { cle: 'etToi', altCle: 'altEtToi', dialogueCles: ['etToiBek'] }
      ];

      // Repart d'une scène vide plutôt que de réutiliser les 3 <img> de
      // l'étape 0 (Keb/Bek/question, plus pertinentes ici) — bulle/
      // chevrons restent les MÊMES éléments DOM (jamais recréés), seules
      // les images changent.
      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      const imagesEnchantes = IMAGES_DIALOGUE_ENCHANTES.map(function (et, i) {
        const img = document.createElement('img');
        img.className = 'iden-img' + (i === 0 ? ' actif' : '');
        img.src = image(options, et.cle);
        img.alt = texte(options, et.altCle);
        personnages.insertBefore(img, bulle); // avant la bulle, comme à l'étape 0
        return img;
      });

      let indexEnchantes = 0;

      function majChevronGaucheEnchantes() {
        chevronGauche.classList.toggle('iden-chevron-desactive', indexEnchantes === 0);
      }

      // Même découpage mot-à-mot / mêmes écouteurs clic/clavier (traduction
      // + ajout au sac) que afficherBulle() ci-dessus — dupliqué ici plutôt
      // que généralisé, pour ne pas toucher à afficherBulle() (qui ne gère
      // qu'UNE SEULE réplique par bulle) alors que cette étape peut en
      // afficher deux à la fois (Bek + Keb "en même temps").
      function afficherBulleEnchantes(dialogueCles) {
        bulle.innerHTML = '';
        dialogueCles.forEach(function (dialogueCle) {
          const brut = remplacerPrenom(DIALOGUES_FIXES[dialogueCle], prenomChoisi || '');
          const ligne = document.createElement('div');
          const locuteur = locuteurDeDialogue(dialogueCle);
          ligne.className = 'iden-bulle-ligne' + (locuteur ? ' iden-bulle-ligne-' + locuteur : '');
          const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
          // 🐛 CORRIGÉ (même bug que dans afficherBulle ci-dessus, voir
          // note détaillée là-bas) : "…" ajouté à la classe de
          // ponctuation, ici aussi pertinent pour "Tu es…" (etToiBek).
          const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
          const mots = [];
          motsBrutSepares.forEach(function (tok) {
            if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
              mots[mots.length - 1] += '\u00A0' + tok;
            } else {
              mots.push(tok);
            }
          });
          mots.forEach(function (motBrut, idx) {
            const span = document.createElement('span');
            span.className = 'iden-mot';
            span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
            const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
            span.tabIndex = 0;
            span.addEventListener('click', function (e) {
              e.stopPropagation();
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
            ligne.appendChild(span);
          });
          bulle.appendChild(ligne);
        });
        // 🐛 CORRIGÉ cette session : c'est CET appel qui manquait
        // entièrement — le bouton "Traduire la phrase" n'était donc
        // jamais mis à jour pour les répliques de cette étape (voir note
        // détaillée à la déclaration de majBoutonTraduirePhrase plus
        // haut). dialogueCles peut contenir 1 ou 2 clés (Bek + Keb "en
        // même temps" sur la 1ʳᵉ image) — texteTraductionPhrase() gère
        // déjà les deux cas.
        majBoutonTraduirePhrase(dialogueCles);
      }

      function avancerEnchantes() {
        if (indexEnchantes >= imagesEnchantes.length - 1) {
          // Dernière image (Bek : "Et toi ? Tu es...") tapée : place aux
          // silhouettes — la scène des personnages redevient immobile.
          etapeScene = 'inactive';
          chevron.style.display = 'none';
          chevronGauche.style.display = 'none';
          indice.style.display = 'none';
          lancerSilhouettes(genrePreRempli);
          return;
        }
        imagesEnchantes[indexEnchantes].classList.remove('actif');
        indexEnchantes++;
        imagesEnchantes[indexEnchantes].classList.add('actif');
        afficherBulleEnchantes(IMAGES_DIALOGUE_ENCHANTES[indexEnchantes].dialogueCles);
        majChevronGaucheEnchantes();
      }

      function reculerEnchantes() {
        if (indexEnchantes === 0) return;
        imagesEnchantes[indexEnchantes].classList.remove('actif');
        indexEnchantes--;
        imagesEnchantes[indexEnchantes].classList.add('actif');
        afficherBulleEnchantes(IMAGES_DIALOGUE_ENCHANTES[indexEnchantes].dialogueCles);
        majChevronGaucheEnchantes();
      }

      etapeScene = 'dialogue';
      avancerActif = avancerEnchantes;
      reculerActif = reculerEnchantes;
      majChevronGaucheEnchantes();
      afficherBulleEnchantes(IMAGES_DIALOGUE_ENCHANTES[0].dialogueCles);
      // 🐛 CORRIGÉ (session navigation) : le champ de saisie du nom
      // (lancerSaisieNom, étape précédente) avait pris le focus via
      // champ.focus() et ne l'a jamais rendu — #idenPersonnages restait
      // donc focusable mais SANS le focus réel à partir d'ici, ce qui
      // désactivait le clavier pour toute cette étape même après le
      // correctif du .focus() initial plus haut. Repris explicitement au
      // moment où la scène redevient active.
      personnages.focus();
    }

    // ---- Étape 2 : silhouettes (genre + tranche d'âge) ----
    // genrePreRempli : null (chemin normal, 4 choix ouverts) ou 'm'/'f'
    // (chemin de repli, 2 silhouettes du genre opposé désactivées).
    // 🆕 Carrousel de cartes (remplace la grille de 4 boutons carrés) —
    // demande explicite de Raphaël après avoir vu les 4 silhouettes en
    // pied (format haut, ~300×700) : un bouton carré les aurait
    // écrasées. Une carte à la fois, grossie/mise en avant au centre
    // (IntersectionObserver sur une bande étroite du conteneur), défilée
    // au doigt (scroll-snap). Premier tap sur une carte pas encore
    // centrée = la centrer ; second tap sur la carte déjà centrée =
    // valider — évite de valider par accident en faisant glisser.
    // Même règle de vocabulaire non traduit que la version précédente
    // (VOCABULAIRE_GENRE, jamais texte()/options.textes pour le libellé
    // garçon/homme/fille/femme — voir note 🐛 CORRIGÉ conservée
    // ci-dessous par cohérence historique).
    function lancerSilhouettes(genrePreRempli) {
      action.innerHTML = '';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'titreSilhouettes');
      action.appendChild(titre);

      const piste = document.createElement('div');
      piste.className = 'iden-carrousel';

      // 🐛 CORRIGÉ cette session : carte.scrollIntoView() (utilisé plus
      // bas jusqu'ici) ne se contente pas de faire glisser LA PISTE
      // horizontalement — par défaut, il fait aussi défiler TOUT
      // ancêtre scrollable, y compris la PAGE elle-même verticalement,
      // pour s'assurer que l'élément entier reste visible. Sur un écran
      // où la page est déjà plus haute que la fenêtre, ce défilement
      // vertical additionnel et non désiré pouvait pousser le bas de la
      // carte (son libellé, "Un homme"/"Une fille"/etc.) littéralement
      // sous le bord inférieur de l'écran — exactement le symptôme
      // observé ("les mots apparaissent occultés par le bas de
      // l'écran"). Remplacé par un centrage manuel qui ne touche QUE
      // piste.scrollLeft, jamais le défilement de la page.
      function centrerCarteDansPiste(carte, comportement) {
        const cible = carte.offsetLeft + carte.offsetWidth / 2 - piste.clientWidth / 2;
        piste.scrollTo({ left: cible, behavior: comportement || 'smooth' });
      }

      const cartes = SILHOUETTES.map(function (s) {
        const carte = document.createElement('button');
        carte.type = 'button';
        carte.className = 'iden-carte iden-carte-' + s.id;

        const badgeAge = document.createElement('span');
        badgeAge.className = 'iden-badge-age';
        badgeAge.textContent = s.adulte ? '18+' : '0-17';
        carte.appendChild(badgeAge);

        const img = document.createElement('img');
        img.className = 'iden-carte-img';
        img.src = image(options, 'silhouette_' + s.id);
        // 🐛 CORRIGÉ (voir note historique ci-dessus) : le libellé
        // garçon/homme/fille/femme est un mot de vocabulaire, toujours
        // en français — jamais texte()/options.textes ici non plus.
        img.alt = VOCABULAIRE_GENRE[s.vocabCle];
        carte.appendChild(img);

        const label = document.createElement('span');
        label.className = 'iden-carte-label';
        label.textContent = VOCABULAIRE_GENRE[s.vocabCle];
        carte.appendChild(label);

        const desactivee = genrePreRempli && s.genre !== genrePreRempli;
        if (desactivee) {
          carte.disabled = true;
          carte.classList.add('iden-carte-desactivee');
        } else {
          carte.addEventListener('click', function () {
            // 🐛 CORRIGÉ cette session : vérifie la proximité au CENTRE
            // directement au moment du clic (calcul synchrone, voir
            // carteLaPlusProche() plus bas) plutôt que de lire une classe
            // CSS posée par un observateur asynchrone — voir note
            // détaillée ci-dessous sur la cause réelle du bug "cliquer
            // sur une silhouette ne fait rien".
            if (piste.classList.contains('iden-carrousel-verrouille')) return; // choix déjà confirmé, plus rien à faire
            if (carteLaPlusProche() === carte) {
              confirmerChoix(carte, s);
            } else {
              centrerCarteDansPiste(carte, 'smooth');
            }
          });
        }

        piste.appendChild(carte);
        return carte;
      });

      action.appendChild(piste);

      // 🆕 Confirmation visuelle discrète au double-tap — manquait
      // ENTIÈREMENT avant : l'enregistrement { prenom, genre, adulte }
      // se faisait bien (voir onComplet), mais rien à l'écran ne
      // signalait que le double-tap avait été pris en compte, ce qui
      // pouvait laisser croire à un clic sans effet. Petit badge ✓ qui
      // apparaît sur la carte choisie + légère pulsation (même famille
      // visuelle que .iden-mot.flash-ajout dans le sac à dos : vert,
      // discret, une seule fois). Le carrousel est ensuite VERROUILLÉ
      // (plus de glissement ni de second choix possible) le temps que
      // l'appelant (onComplet) prenne la relève — évite qu'un second tap
      // accidentel pendant l'animation ne rappelle onComplet deux fois,
      // ou que l'élève parte sur une autre carte alors que son choix est
      // déjà enregistré.
      // 🆕 Bouton "Annuler" — filet de sécurité demandé explicitement, au
      // cas où le double-tap aurait été accidentel (ex. un tap parasite
      // pendant le glissement, juste avant d'arriver sur la bonne carte).
      // Reste affiché toute la durée de la fenêtre de confirmation
      // ci-dessous ; cliqué à temps, il annule TOUT (retire la
      // confirmation, déverrouille le carrousel, empêche onComplet
      // d'être appelé) et rend la main à l'élève exactement comme avant
      // le double-tap. 🐛 CORRIGÉ cette session : 1.6s (posé initialement)
      // s'est avéré bien trop court en pratique pour remarquer le bouton
      // ET avoir le temps de décider de cliquer dessus — Raphaël a
      // explicitement demandé au moins 5 secondes. Passé ce délai, le
      // choix est considéré définitif (annuler après coup sortirait du
      // rôle de ce module : il faudrait revenir en arrière depuis la page
      // hôte/le menu suivant, hors de sa portée ici).
      const DUREE_CONFIRMATION_MS = 5000;
      let minuterieConfirmation = null;

      function confirmerChoix(carte, s) {
        piste.classList.add('iden-carrousel-verrouille');
        cartes.forEach(function (c) { c.disabled = true; });
        carte.classList.add('iden-carte-confirmee');

        const btnAnnuler = document.createElement('button');
        btnAnnuler.type = 'button';
        btnAnnuler.className = 'iden-btn-annuler-choix';
        btnAnnuler.textContent = texte(options, 'labelAnnulerChoix');
        btnAnnuler.addEventListener('click', function () {
          clearTimeout(minuterieConfirmation);
          btnAnnuler.remove();
          carte.classList.remove('iden-carte-confirmee');
          piste.classList.remove('iden-carrousel-verrouille');
          // Ne réactive que les cartes qui n'étaient PAS déjà désactivées
          // pour une autre raison (genre opposé du chemin de repli,
          // .iden-carte-desactivee) — celles-là doivent le rester.
          cartes.forEach(function (c) {
            if (!c.classList.contains('iden-carte-desactivee')) c.disabled = false;
          });
          majCarteActive();
        });
        action.insertBefore(btnAnnuler, piste.nextSibling);

        minuterieConfirmation = setTimeout(function () {
          btnAnnuler.remove();
          // 🐛 CORRIGÉ (signalé par Raphaël — "le nom n'apparaît pas") :
          // `s` ici est l'entrée BRUTE de SILHOUETTES (id/genre/adulte/
          // vocabCle) — le prénom n'y a jamais été rattaché, malgré le
          // commentaire ci-dessus qui l'affirmait à tort. Un nouvel objet
          // est construit ici (jamais une mutation directe de `s`, qui
          // pointe vers l'entrée PARTAGÉE et RÉUTILISÉE de la constante
          // SILHOUETTES — la muter aurait fait fuiter le prénom d'un
          // élève vers la prochaine exécution de la séquence sur la même
          // page). C'est CET objet qui voyage ensuite dans toutes les
          // étapes suivantes (remise du sac, Essaie, confirmation, etc.).
          lancerReactionSilhouette(Object.assign({}, s, { prenom: prenomChoisi }));
        }, DUREE_CONFIRMATION_MS);
      }

      // ---------- Détection de la carte centrée ----------
      // 🐛 CORRIGÉ cette session — cause réelle de "cliquer (une ou deux
      // fois) sur une silhouette ne génère aucune réaction" : l'ancienne
      // détection (IntersectionObserver avec rootMargin '0px -40% 0px
      // -40%' + threshold 0.6) ne pouvait MATHÉMATIQUEMENT jamais se
      // déclencher. rootMargin -40%/-40% réduit la zone d'intersection
      // effective à seulement ~20% de la largeur du carrousel — plus
      // étroite qu'une seule carte (180px fixes). Le ratio d'intersection
      // maximal possible pour une carte, même PARFAITEMENT centrée, ne
      // pouvait donc jamais atteindre le seuil de 0.6 exigé. Résultat
      // concret : l'observateur ne marquait JAMAIS aucune carte comme
      // .iden-carte-active — pire, son tout premier appel (déclenché dès
      // observer()) retirait même la classe posée manuellement sur la
      // carte 0 juste avant. Le clic ne pouvait donc jamais confirmer un
      // choix (carte.classList.contains('iden-carte-active') n'était
      // jamais vrai), qu'il s'agisse d'un tap, deux taps espacés, ou un
      // vrai double-clic.
      //
      // Remplacé par un calcul manuel, robuste et SYNCHRONE : la carte la
      // plus proche du centre de la piste (comparaison de positions, pas
      // d'aire d'intersection), recalculée au scroll pour l'effet visuel
      // ET interrogée directement au moment du clic (voir plus haut) —
      // plus jamais tributaire de la fiabilité/du délai d'un callback
      // asynchrone.
      function carteLaPlusProche() {
        const centreVise = piste.scrollLeft + piste.clientWidth / 2;
        let proche = null;
        let distanceMin = Infinity;
        cartes.forEach(function (c) {
          const centreCarte = c.offsetLeft + c.offsetWidth / 2;
          const distance = Math.abs(centreCarte - centreVise);
          if (distance < distanceMin) { distanceMin = distance; proche = c; }
        });
        return proche;
      }

      // 🆕 Effet de style pendant le glissement — remplace le bascule
      // strictement binaire (active à 100%/scale(1) vs inactive figée à
      // 55%/scale(0.85)) par une interpolation CONTINUE selon la distance
      // réelle au centre : les cartes qui s'approchent grandissent/
      // s'éclaircissent progressivement, celles qui s'éloignent
      // rapetissent/s'estompent, plutôt qu'un saut brusque d'un état à
      // l'autre au moment où le centre est franchi. Appliqué en style
      // inline (donc prioritaire sur les valeurs par défaut de .iden-carte
      // dans le CSS, qui restent le repli pour le tout premier paint avant
      // que ce calcul ne s'exécute). Les cartes désactivées (genre opposé,
      // chemin de repli) gardent leur apparence grisée fixe définie en
      // CSS — jamais recalculées ici, pour ne pas leur redonner
      // accidentellement de l'importance visuelle.
      const DISTANCE_EFFET_MAX = 220; // au-delà, l'échelle/l'opacité n'est plus réduite davantage
      function majCarteActive() {
        const centreVise = piste.scrollLeft + piste.clientWidth / 2;
        let proche = null;
        let distanceMin = Infinity;
        cartes.forEach(function (c) {
          const centreCarte = c.offsetLeft + c.offsetWidth / 2;
          const distance = Math.abs(centreCarte - centreVise);
          if (distance < distanceMin) { distanceMin = distance; proche = c; }
          if (c.disabled) return;
          const ratio = Math.min(distance / DISTANCE_EFFET_MAX, 1); // 0 = centrée, 1 = loin
          c.style.transform = 'scale(' + (1 - ratio * 0.18).toFixed(3) + ')';
          c.style.opacity = (1 - ratio * 0.45).toFixed(3);
        });
        cartes.forEach(function (c) {
          c.classList.toggle('iden-carte-active', c === proche && !c.disabled);
        });
      }

      // Recalcul au scroll (glissement/scroll-snap), throttlé par frame
      // plutôt qu'à chaque micro-événement de scroll. 🆕 Bascule aussi une
      // classe sur la piste le temps du glissement actif (voir CSS,
      // .iden-carrousel-glisse) qui désactive la transition des cartes —
      // sans ça, la transition de 0.35s déjà en place pour l'arrivée en
      // place (scroll-snap) ferait TOUJOURS un peu de retard sur le doigt
      // pendant un glissement continu, un temps de retard perceptible
      // qu'on ne veut que pour l'arrêt final, pas pendant le mouvement.
      let raccourciScrollActif = null;
      let minuterieFinGlissement = null;
      piste.addEventListener('scroll', function () {
        piste.classList.add('iden-carrousel-glisse');
        if (minuterieFinGlissement) clearTimeout(minuterieFinGlissement);
        minuterieFinGlissement = setTimeout(function () {
          piste.classList.remove('iden-carrousel-glisse');
        }, 120);
        if (raccourciScrollActif) return;
        raccourciScrollActif = requestAnimationFrame(function () {
          majCarteActive();
          raccourciScrollActif = null;
        });
      }, { passive: true });

      // État initial, calculé après mise en page réelle (offsetLeft n'est
      // fiable qu'une fois le DOM inséré et peint) plutôt que de deviner
      // que la première carte non désactivée est forcément centrée à
      // scrollLeft 0. Si la carte la plus proche par défaut se trouve
      // être désactivée (chemin de repli, genre opposé grisé), on centre
      // plutôt directement la première carte utilisable — pour que
      // l'élève commence avec un choix déjà actif, pas bloqué sur une
      // carte grisée qu'il ne peut pas valider.
      requestAnimationFrame(function () {
        const procheInitiale = carteLaPlusProche();
        if (procheInitiale && procheInitiale.disabled) {
          const premiereActive = cartes.find(function (c) { return !c.disabled; });
          if (premiereActive) centrerCarteDansPiste(premiereActive, 'auto');
        }
        majCarteActive();
      });

      const indiceCarrousel = document.createElement('div');
      indiceCarrousel.className = 'iden-indice-carrousel';
      indiceCarrousel.textContent = texte(options, 'indiceCarrousel');
      action.appendChild(indiceCarrousel);

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

    // ---- Étape 3 (🆕 cette session) : réaction de Keb/Bek à la
    // silhouette choisie ----
    // Jouée juste après la confirmation d'une silhouette (voir
    // confirmerChoix ci-dessus), AVANT que callbacks.onComplet() ne soit
    // finalement appelé — dialogue fourni par Raphaël : garçon → Keb dit
    // "Choc choc !" (fist bump francisé) ; homme → Keb dit "Respect !" ;
    // fille → Bek dit "Youpie !" ; femme → Bek dit "Chouette !". Une
    // seule image/réplique par choix (contrairement à "Enchanté(e)",
    // pas de séquence à faire défiler) : un seul tap/clic suffit à
    // continuer, ce qui termine la séquence identité. Réutilise
    // #idenPersonnages/#idenBulle comme les autres étapes de dialogue —
    // même mot-à-mot cliquable (traduction + ajout au sac) et bouton
    // "Traduire la phrase", pour que ce mécanisme reste disponible
    // partout où du texte parlé apparaît, y compris ici.
    const REACTIONS_SILHOUETTE = {
      garcon: { cle: 'reactionGarcon', altCle: 'altReactionGarcon' },
      homme:  { cle: 'reactionHomme',  altCle: 'altReactionHomme' },
      fille:  { cle: 'reactionFille',  altCle: 'altReactionFille' },
      femme:  { cle: 'reactionFemme',  altCle: 'altReactionFemme' }
    };

    function lancerReactionSilhouette(s) {
      action.innerHTML = '';
      // Une seule image : pas de "suivant"/"précédent" à proprement
      // parler (contrairement à l'intro ou à "Enchanté(e)") — les
      // chevrons resteraient trompeurs (ils suggèrent qu'il y a d'autres
      // images à faire défiler). L'indice de tap générique
      // (introIndiceTap, déjà traduit dans toutes les langues) suffit à
      // signaler qu'on peut continuer.
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      indice.style.display = '';
      indice.textContent = texte(options, 'introIndiceTap');

      const reaction = REACTIONS_SILHOUETTE[s.id];

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      const img = document.createElement('img');
      img.className = 'iden-img actif';
      img.src = image(options, reaction.cle);
      img.alt = texte(options, reaction.altCle);
      personnages.insertBefore(img, bulle);

      // Même découpage mot-à-mot / mêmes écouteurs clic/clavier
      // (traduction + ajout au sac) que afficherBulle()/
      // afficherBulleEnchantes() ci-dessus — dupliqué ici plutôt que
      // généralisé pour les mêmes raisons que afficherBulleEnchantes déjà
      // documentées plus haut (une seule ligne ici, jamais deux).
      function afficherBulleReaction() {
        bulle.innerHTML = '';
        const brut = remplacerPrenom(DIALOGUES_FIXES[reaction.cle], prenomChoisi || '');
        const ligne = document.createElement('div');
        const locuteur = locuteurDeDialogue(reaction.cle);
        ligne.className = 'iden-bulle-ligne' + (locuteur ? ' iden-bulle-ligne-' + locuteur : '');
        const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
        const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
        const mots = [];
        motsBrutSepares.forEach(function (tok) {
          if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
            mots[mots.length - 1] += '\u00A0' + tok;
          } else {
            mots.push(tok);
          }
        });
        mots.forEach(function (motBrut, idx) {
          const span = document.createElement('span');
          span.className = 'iden-mot';
          span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
          const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
          span.tabIndex = 0;
          span.addEventListener('click', function (e) {
            e.stopPropagation();
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
          ligne.appendChild(span);
        });
        bulle.appendChild(ligne);
        majBoutonTraduirePhrase([reaction.cle]);
      }

      function terminerReaction() {
        // 🆕 CORRIGÉ cette session : appelait directement onComplet ici —
        // remplacé par la nouvelle scène de remise du sac (voir
        // lancerRemiseSac ci-dessous), qui appellera elle-même onComplet
        // une fois complétée (pas encore le cas tant que les répliques 3+
        // n'ont pas leurs illustrations — voir notes dans
        // lancerRemiseSac).
        lancerRemiseSac(s);
      }

      etapeScene = 'dialogue';
      avancerActif = terminerReaction; // un seul tap/clic termine la séquence
      reculerActif = function () {};   // rien à reculer (une seule image)
      afficherBulleReaction();
      // Même correctif de focus que lancerDialogueEnchantes ci-dessus :
      // #idenPersonnages doit reprendre le focus explicitement à chaque
      // fois que la scène redevient active, sinon les flèches/Entrée du
      // clavier restent muettes pour cette étape.
      personnages.focus();
    }

    // ---- Étape 4 (🆕 cette session, EN COURS) : remise du sac ----
    // Jouée juste après la réaction à la silhouette (voir
    // terminerReaction ci-dessus). Dialogue complet convenu avec
    // Raphaël (7 répliques) :
    //   1. Keb : "Bon ! Il est prêt ?" / "Bon ! Elle est prête ?"
    //   2. Bek : "Presque ! Le sac !"
    //   3. Keb : "Oh ! Oui !" (réalise, puis part chercher le sac —
    //      2 images pour CETTE MÊME réplique, voir plus bas)
    //   4. Keb revient avec le sac et annonce : "Voilà le sac !" — puis,
    //      🆕 CORRIGÉ cette session (sur demande de Raphaël, qui avait
    //      repéré que "Génial !" se disait à tort sur l'image SUIVANTE) :
    //      1 seconde plus tard, Bek réagit ("Génial !") SUR CETTE MÊME
    //      IMAGE — la bulle grandit d'une ligne, aucun changement d'image
    //      (voir dialogueCleRetardee/delaiRetard dans IMAGES_DON_SAC, et
    //      programmerRetardDonSacSiBesoin() plus bas — mécanisme distinct
    //      de l'auto-avance entre images, qui elle change bien de frame).
    //   5. 🆕 CORRIGÉ cette session, sur la même paire d'images
    //      (illustrations fournies la session précédente) : c'est BEK qui
    //      parle en premier sur la 1ʳᵉ image ("C'est pour toi !",
    //      nouvelle clé donSacPourToiBek — avant cette correction, ce
    //      texte était fusionné avec celui de Keb) ; 2 secondes plus
    //      tard, transition automatique vers la 2e image où Keb tend le
    //      sac et ajoute "Tiens !" (donSacTiensKeb, raccourci — ne
    //      contient plus "C'est pour toi", maintenant dit par Bek seule)
    //      SOUS la réplique de Bek, qui reste affichée (voir
    //      dialogueClesParFrame dans IMAGES_DON_SAC plus bas).
    //   6. Bek (pointe un mot) : "Clique deux fois ici !" — enseigne le
    //      VRAI double-tap ; c'est à partir d'ici que le mécanisme change
    //      définitivement (voir AJOUT_AUTOMATIQUE_TEMPORAIRE en tête de
    //      fichier — à désactiver une fois cette étape construite).
    //   7. Bek : "Voilà ! Maintenant, tu es prêt/prête !"
    // 🚧 Répliques 1 à 5 câblées ci-dessous — 6 et 7 attendent encore
    // leurs illustrations.
    //
    // 🆕 IMAGES_DON_SAC accepte maintenant deux formes d'entrée :
    //   - { cle, altCle, dialogueCle(M/F) } — une seule image, comme
    //     avant (répliques 1 et 2). dialogueCle: null (explicitement,
    //     voir réplique 4) signale une image SANS texte parlé — la bulle
    //     reste vide (voir afficherBulleDonSac plus bas), plutôt que
    //     d'essayer d'afficher une clé qui n'existe pas.
    //   - { cles: [...], altCles: [...], dialogueCle } — PLUSIEURS
    //     images pour UNE SEULE réplique (voir réplique 3 : Keb réalise
    //     "Oh ! Oui !" puis part chercher le sac — deux images, mais un
    //     seul texte affiché sur les deux, MÊME une fois Keb hors cadre
    //     sur la 2e, comme demandé explicitement par Raphaël). La
    //     transition entre les images d'un même groupe avance TOUTE
    //     SEULE après DELAI_AUTO_DON_SAC (ou entree.delaiAuto, voir plus
    //     bas), mais reste aussi tapable/cliquable à tout moment comme
    //     le reste de la scène — l'un n'empêche pas l'autre, ça ne fait
    //     que gagner du temps à qui ne tape pas. construireFramesDonSac()
    //     ci-dessous aplatit les deux formes en une seule liste de
    //     "frames" pour que la navigation (avancer/reculer/chevrons)
    //     n'ait qu'un seul type d'objet à traiter, peu importe le nombre
    //     d'images par réplique.
    //   - 🆕 { cles: [...], dialogueClesParFrame: [[...], [...]] } — pour
    //     un groupe où le texte GRANDIT d'une image à l'autre plutôt que
    //     de rester identique (à la différence de la réplique 3
    //     "Oh ! Oui !" ci-dessus) : dialogueClesParFrame[i] est le jeu de
    //     clés CUMULATIF affiché sur l'image i. Voir réplique 5 plus bas
    //     — 1ʳᵉ image : seule la réplique de Bek (« C'est pour toi ! »)
    //     ; 2 secondes plus tard (transition automatique VERS UNE
    //     NOUVELLE IMAGE), la 2ᵉ image AJOUTE la réplique de Keb
    //     (« Tiens ! ») sous celle de Bek, qui reste affichée — jamais
    //     remplacée. Priorité sur dialogueCle simple si les deux sont
    //     fournis (ne devrait pas arriver en pratique, mais garde le
    //     comportement prévisible).
    //   - 🆕 dialogueCleRetardee / delaiRetard (cette session) — pour
    //     ajouter une réplique supplémentaire à la bulle SANS changer
    //     d'image (à la différence de dialogueClesParFrame ci-dessus, qui
    //     s'accompagne toujours d'une transition d'image). Voir réplique
    //     4 : Keb dit « Voilà le sac ! » (dialogueCle), puis, sur cette
    //     MÊME image, Bek ajoute « Génial ! » (dialogueCleRetardee) après
    //     delaiRetard ms (repli : DELAI_RETARD_DON_SAC). Géré par
    //     programmerRetardDonSacSiBesoin() plus bas — minuterie distincte
    //     de programmerAutoDonSacSiBesoin() (qui avance vers l'image
    //     suivante), annulée/reprogrammée à chaque changement de frame
    //     pour ne jamais laisser une réplique en retard s'ajouter après
    //     que l'élève a déjà navigué ailleurs.
    const DELAI_AUTO_DON_SAC = 3000;
    const DELAI_RETARD_DON_SAC = 1000; // « une seconde », demandé par Raphaël pour Bek qui réagit après Keb sur la même image (réplique 4)
    // 🆕 Scène de déblocage du sac (voir lancerDeblocageSac plus bas) —
    // DELAI_VOL_SAC doit correspondre à la durée de l'animation CSS
    // .iden-debloque-vol (transition transform/opacity) : un décalage entre
    // les deux ferait apparaître #sacBouton avant/après que l'image ait
    // fini de "voler" jusqu'au coin. (La fiche "objet" n'utilise plus de
    // minuterie fixe depuis le retour de Raphaël — voir ouvrirCarteSac/
    // fermerCarteSac plus bas, pilotées par le déroulé réel de la scène
    // "Essaie !" plutôt que par un délai arbitraire.)
    const DELAI_VOL_SAC = 850;
    const IMAGES_DON_SAC = [
      { cle: 'donSacQuestion', altCle: 'altDonSacQuestion', dialogueCleM: 'donSacQuestionM', dialogueCleF: 'donSacQuestionF' },
      { cle: 'donSacPresque', altCle: 'altDonSacPresque', dialogueCle: 'donSacPresque' },
      { cles: ['donSacRealise', 'donSacPart'], altCles: ['altDonSacRealise', 'altDonSacPart'], dialogueCle: 'donSacOhOui' },
      // 🆕 CORRIGÉ cette session (Raphaël : « Génial ! » se disait à tort
      // sur l'image SUIVANTE) — Keb dit « Voilà le sac ! » immédiatement,
      // Bek ajoute « Génial ! » 1 seconde plus tard, sur CETTE MÊME
      // image (dialogueCleRetardee, voir note plus haut) — aucune
      // transition d'image ici, juste la bulle qui grandit d'une ligne.
      // dialogueCle reste un TABLEAU à un seul élément (pas une simple
      // string) : afficherBulleDonSac() n'a donc rien de spécial à
      // prévoir pour ce cas.
      {
        cle: 'donSacRevient',
        altCle: 'altDonSacRevient',
        dialogueCle: ['donSacRevientKeb'],
        dialogueCleRetardee: 'donSacRevientBek',
        delaiRetard: DELAI_RETARD_DON_SAC
      },
      // 🆕 Réplique 5 (illustrations fournies la session précédente,
      // CORRIGÉE cette session : c'est Bek qui parle en premier, pas
      // Keb) — Bek dit « C'est pour toi ! » sur la 1ʳᵉ image ; 2 secondes
      // plus tard, transition automatique vers la 2e image où Keb tend
      // le sac et ajoute « Tiens ! » SOUS la réplique de Bek, qui reste
      // visible (voir dialogueClesParFrame, et afficherBulleDonSac plus
      // bas qui sait déjà afficher plusieurs répliques dans la même
      // bulle — même mécanisme que la 1ʳᵉ image de "Enchanté(e)",
      // simplement étalé dans le temps ici plutôt que montré d'un coup).
      {
        cles: ['donSacPourToi', 'donSacPourToi2'],
        altCles: ['altDonSacPourToi', 'altDonSacPourToi2'],
        dialogueClesParFrame: [
          ['donSacPourToiBek'],
          ['donSacPourToiBek', 'donSacTiensKeb']
        ],
        delaiAuto: 2000 // « deux secondes », explicitement demandé par Raphaël pour CETTE transition (distincte de DELAI_AUTO_DON_SAC/3000 ailleurs)
      }
      // 🚧 À AJOUTER ICI dès que les illustrations 6 et 7 sont fournies
      // (Bek enseigne le double-tap, puis clôture accordée "tu es
      // prêt/prête !").
    ];

    // 🐛 CORRIGÉ cette session : `if (entree.dialogueCle)` (test de
    // vérité) traitait dialogueCle: null comme "absent" et retombait sur
    // dialogueCleM/F (tous deux undefined pour la réplique 4, qui n'en a
    // pas) — DIALOGUES_FIXES[undefined] aurait fait planter
    // afficherBulleDonSac(). `!== undefined` distingue maintenant
    // correctement "clé absente, résoudre M/F" de "null explicite, pas
    // de bulle du tout".
    function dialogueCleDonSac(entree, s) {
      if (entree.dialogueCle !== undefined) return entree.dialogueCle;
      return (s.genre === 'f') ? entree.dialogueCleF : entree.dialogueCleM;
    }

    // Aplatit IMAGES_DON_SAC (entrées à 1 ou plusieurs images) en une
    // liste plate de frames { cle, altCle, dialogueCle(M/F), auto, delai,
    // dialogueCleRetardee, delaiRetard } — "auto" = true seulement pour
    // une frame qui doit enchaîner TOUTE SEULE vers la suivante après un
    // délai (toutes les frames d'un groupe SAUF la dernière). "delai"
    // reprend entree.delaiAuto si fourni, sinon retombe sur
    // DELAI_AUTO_DON_SAC (voir programmerAutoDonSacSiBesoin plus bas).
    // 🆕 dialogueCleRetardee/delaiRetard (cette session) : simplement
    // reportés tels quels sur CHAQUE frame de l'entrée — n'a de sens en
    // pratique que pour une entrée à une seule image (voir réplique 4),
    // mais rien n'empêche techniquement de les poser sur un groupe.
    function construireFramesDonSac() {
      const frames = [];
      IMAGES_DON_SAC.forEach(function (entree) {
        if (entree.cles) {
          entree.cles.forEach(function (cle, i) {
            frames.push({
              cle: cle,
              altCle: entree.altCles[i],
              // 🆕 dialogueClesParFrame (si présent) prime sur dialogueCle
              // simple — un jeu de clés CUMULATIF différent par image,
              // plutôt qu'un seul texte partagé identique sur tout le
              // groupe (voir réplique 5, comparé à la réplique 3
              // "Oh ! Oui !" qui n'utilise que dialogueCle).
              dialogueCle: entree.dialogueClesParFrame ? entree.dialogueClesParFrame[i] : entree.dialogueCle,
              dialogueCleM: entree.dialogueCleM,
              dialogueCleF: entree.dialogueCleF,
              auto: i < entree.cles.length - 1,
              delai: entree.delaiAuto,
              dialogueCleRetardee: entree.dialogueCleRetardee,
              delaiRetard: entree.delaiRetard
            });
          });
        } else {
          frames.push({
            cle: entree.cle,
            altCle: entree.altCle,
            dialogueCle: entree.dialogueCle,
            dialogueCleM: entree.dialogueCleM,
            dialogueCleF: entree.dialogueCleF,
            auto: false,
            delai: entree.delaiAuto,
            dialogueCleRetardee: entree.dialogueCleRetardee,
            delaiRetard: entree.delaiRetard
          });
        }
      });
      return frames;
    }

    function lancerRemiseSac(s) {
      action.innerHTML = '';
      chevron.style.display = '';
      chevronGauche.style.display = '';
      indice.style.display = '';
      indice.textContent = texte(options, 'introIndiceTap');

      const frames = construireFramesDonSac();

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      const imagesDonSac = frames.map(function (f, i) {
        const img = document.createElement('img');
        img.className = 'iden-img' + (i === 0 ? ' actif' : '');
        img.src = image(options, f.cle);
        img.alt = texte(options, f.altCle);
        personnages.insertBefore(img, bulle);
        return img;
      });

      let indexDonSac = 0;
      // Sentinelle volontairement `undefined` (pas `null`) : `null` est
      // maintenant une valeur RÉELLE et légitime de dialogueCle (voir
      // réplique 4, "pas de nouvelle réplique") — si la sentinelle valait
      // aussi `null`, la toute première frame d'une future séquence qui
      // commencerait par un silence serait jugée à tort "déjà affichée
      // telle quelle" et ne vidangerait jamais la bulle héritée de
      // l'étape précédente.
      let dialogueCleAffichee; // pour ne PAS rejouer/réinitialiser la bulle quand le texte ne change pas (voir plus bas)
      let minuterieAutoDonSac = null;
      let minuterieRetardDonSac = null; // 🆕 cette session — voir programmerRetardDonSacSiBesoin() plus bas

      function majChevronGaucheDonSac() {
        chevronGauche.classList.toggle('iden-chevron-desactive', indexDonSac === 0);
      }
      // 🆕 RETIRÉ le grisage sur la dernière image (voir ancien commentaire
      // "🚧 Tant que la suite n'est pas branchée...") — avancerDonSac()
      // enchaîne maintenant sur lancerDeblocageSac() une fois la dernière
      // image atteinte, ce n'est donc plus un point mort. Le chevron droit
      // reste actif jusqu'au bout de cette étape.
      function majChevronDroitDonSac() {
        chevron.classList.remove('iden-chevron-desactive');
      }


      // Même découpage mot-à-mot / mêmes écouteurs clic/clavier
      // (traduction + ajout au sac) que afficherBulle()/
      // afficherBulleReaction() ci-dessus — dupliqué ici pour les mêmes
      // raisons déjà documentées plus haut dans le fichier.
      function afficherBulleDonSac(dialogueCle) {
        bulle.innerHTML = '';
        bulle.classList.remove('iden-bulle-ligne-bek', 'iden-bulle-ligne-keb');
        // Frame sans réplique (dialogueCle: null explicite) : bulle
        // vide, pas de bouton "Traduire la phrase"
        // (majBoutonTraduirePhrase([]) le masque déjà correctement,
        // aucun texte à y proposer).
        if (!dialogueCle) {
          majBoutonTraduirePhrase([]);
          return;
        }
        // 🆕 dialogueCle accepte maintenant soit une seule clé (string,
        // comme avant), soit un TABLEAU de clés — voir réplique 4 : Keb
        // ET Bek parlent l'un après l'autre sur la même image, même
        // mécanisme que la première image de "Enchanté(e)"
        // (afficherBulleEnchantes plus haut).
        const cles = Array.isArray(dialogueCle) ? dialogueCle : [dialogueCle];

        // Découpe une réplique en mots cliquables (traduction + ajout au
        // sac), à l'intérieur du conteneur fourni — factorisé ici pour
        // servir aussi bien au cas 1 réplique (spans directement dans
        // #idenBulle) qu'au cas 2+ répliques (spans dans une
        // .iden-bulle-ligne par réplique, voir plus bas).
        function decouperEtAjouterMots(brut, conteneurCible) {
          const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
          const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
          const mots = [];
          motsBrutSepares.forEach(function (tok) {
            if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
              mots[mots.length - 1] += '\u00A0' + tok;
            } else {
              mots.push(tok);
            }
          });
          mots.forEach(function (motBrut, idx) {
            const span = document.createElement('span');
            span.className = 'iden-mot';
            span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
            const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
            span.tabIndex = 0;
            span.addEventListener('click', function (e) {
              e.stopPropagation();
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
            conteneurCible.appendChild(span);
          });
        }

        if (cles.length > 1) {
          // Plusieurs répliques dans la même bulle — une ligne par
          // réplique, colorée selon son locuteur (même patron que
          // afficherBulleEnchantes).
          cles.forEach(function (cle) {
            const brut = remplacerPrenom(DIALOGUES_FIXES[cle], prenomChoisi || '');
            const ligne = document.createElement('div');
            const locuteur = locuteurDeDialogue(cle);
            ligne.className = 'iden-bulle-ligne' + (locuteur ? ' iden-bulle-ligne-' + locuteur : '');
            decouperEtAjouterMots(brut, ligne);
            bulle.appendChild(ligne);
          });
        } else {
          // Une seule réplique — spans directement dans #idenBulle,
          // couleur du locuteur posée sur la bulle elle-même (comme
          // avant, inchangé pour les répliques 1/2/3).
          const seuleCle = cles[0];
          const locuteur = locuteurDeDialogue(seuleCle);
          if (locuteur) bulle.classList.add('iden-bulle-ligne-' + locuteur);
          const brut = remplacerPrenom(DIALOGUES_FIXES[seuleCle], prenomChoisi || '');
          decouperEtAjouterMots(brut, bulle);
        }

        majBoutonTraduirePhrase(cles);
      }

      // 🆕 N'affiche/ne réinitialise la bulle QUE si le texte change
      // réellement d'une frame à l'autre — indispensable pour la
      // réplique 3 (2 images, même dialogueCle) : sans ce garde-fou, la
      // bulle se viderait puis se redessinerait à l'identique à chaque
      // frame, provoquant un clignotement inutile (et perdant la
      // traduction déjà affichée le cas échéant) alors que le texte reste
      // MOT POUR MOT le même.
      function afficherBulleDonSacSiChangee(dialogueCle) {
        if (dialogueCle === dialogueCleAffichee) return;
        dialogueCleAffichee = dialogueCle;
        afficherBulleDonSac(dialogueCle);
      }

      function annulerMinuterieAutoDonSac() {
        if (minuterieAutoDonSac) {
          clearTimeout(minuterieAutoDonSac);
          minuterieAutoDonSac = null;
        }
      }

      // 🆕 Programme l'avance automatique si la frame CIBLE (celle qu'on
      // vient d'afficher) le demande (frames[i].auto === true) — annulée
      // et reprogrammée à chaque changement de frame, dans un sens comme
      // dans l'autre, pour ne jamais avoir deux minuteries actives en
      // même temps ni en laisser une survivre après un tap manuel.
      function programmerAutoDonSacSiBesoin() {
        annulerMinuterieAutoDonSac();
        if (!frames[indexDonSac].auto) return;
        minuterieAutoDonSac = setTimeout(function () {
          minuterieAutoDonSac = null;
          avancerDonSac();
        }, frames[indexDonSac].delai || DELAI_AUTO_DON_SAC);
      }

      function annulerMinuterieRetardDonSac() {
        if (minuterieRetardDonSac) {
          clearTimeout(minuterieRetardDonSac);
          minuterieRetardDonSac = null;
        }
      }

      // 🆕 cette session — ajoute, après un court délai, une réplique
      // SUPPLÉMENTAIRE à la bulle courante, SANS changer d'image (voir
      // réplique 4 : Keb dit « Voilà le sac ! », puis Bek ajoute
      // « Génial ! » 1 seconde plus tard sur cette même image).
      // Distincte de programmerAutoDonSacSiBesoin() ci-dessus, qui avance
      // vers l'IMAGE suivante — ici l'image ne bouge jamais, seule la
      // bulle grandit. Annulée puis reprogrammée à chaque changement de
      // frame (dans allerAFrameDonSac ci-dessous, comme pour la minuterie
      // d'auto-avance) pour ne jamais laisser une réplique en retard
      // s'ajouter une fois l'élève déjà reparti ailleurs (avant ou
      // après) dans la séquence.
      function programmerRetardDonSacSiBesoin() {
        annulerMinuterieRetardDonSac();
        const frame = frames[indexDonSac];
        if (!frame.dialogueCleRetardee) return;
        minuterieRetardDonSac = setTimeout(function () {
          minuterieRetardDonSac = null;
          const clesBase = Array.isArray(frame.dialogueCle) ? frame.dialogueCle : (frame.dialogueCle ? [frame.dialogueCle] : []);
          const clesCombinees = clesBase.concat([frame.dialogueCleRetardee]);
          dialogueCleAffichee = clesCombinees;
          afficherBulleDonSac(clesCombinees);
        }, frame.delaiRetard || DELAI_RETARD_DON_SAC);
      }

      function allerAFrameDonSac(nouvelIndex) {
        imagesDonSac[indexDonSac].classList.remove('actif');
        indexDonSac = nouvelIndex;
        imagesDonSac[indexDonSac].classList.add('actif');
        afficherBulleDonSacSiChangee(dialogueCleDonSac(frames[indexDonSac], s));
        majChevronGaucheDonSac();
        majChevronDroitDonSac();
        programmerAutoDonSacSiBesoin();
        programmerRetardDonSacSiBesoin();
      }

      function avancerDonSac() {
        if (indexDonSac >= imagesDonSac.length - 1) {
          // 🆕 Fin de la remise du sac ("Tiens !") → enchaîne directement
          // sur la scène de déblocage (révélation + vol vers le coin +
          // atterrissage sur #sacBouton), voir lancerDeblocageSac plus bas.
          // Remplace l'ancien plan de répliques 6-7 (dialogue expliquant le
          // mécanisme) — voir décision de Raphaël : ce sera désormais la
          // fiche "objet" au survol/tap du sac qui l'explique, pas Keb/Bek.
          annulerMinuterieAutoDonSac();
          annulerMinuterieRetardDonSac();
          lancerDeblocageSac(s);
          return;
        }
        allerAFrameDonSac(indexDonSac + 1);
      }

      function reculerDonSac() {
        if (indexDonSac === 0) return;
        allerAFrameDonSac(indexDonSac - 1);
      }

      etapeScene = 'dialogue';
      avancerActif = avancerDonSac;
      reculerActif = reculerDonSac;
      majChevronGaucheDonSac();
      majChevronDroitDonSac();
      afficherBulleDonSacSiChangee(dialogueCleDonSac(frames[0], s));
      programmerAutoDonSacSiBesoin();
      programmerRetardDonSacSiBesoin();
      personnages.focus();
    }

    // ================================================================
    // 🆕 Scène de déblocage du sac — jouée juste après la réplique 5
    // ("Tiens !"). Remplace l'ancien plan de répliques 6-7 (dialogue
    // Keb/Bek expliquant le double-tap) : décision de Raphaël, la
    // fonction du sac s'apprend maintenant par une fiche "objet" façon
    // jeu vidéo, au survol/tap du sac lui-même une fois posé en haut à
    // droite — plus de texte de personnage à écrire/traduire pour ça.
    //
    // Déroulé en 4 temps, dans #idenPersonnages (zone persistante,
    // comme le reste de la séquence) :
    //   1. Révélation : l'image debloqueSac (déjà lumineuse) plein cadre,
    //      halo qui pulse, léger flottement (voir .iden-img-debloque /
    //      .iden-debloque-halo dans le CSS).
    //   2. Titre épique superposé ("Objet débloqué !" / "Le premier
    //      sac"), chrome d'interface traduisible (debloqueTitre/
    //      debloqueNom), PAS une réplique de personnage.
    //   3. Tap → déclencherVol() : l'image + le halo + le titre
    //      s'animent vers le coin supérieur droit (.iden-debloque-vol),
    //      DELAI_VOL_SAC ms plus tard on atterrit.
    //   4. Atterrissage → creerSacBoutonSiAbsent() pose #sacBouton en
    //      haut à droite (repli seulement si sac-a-dos.js n'est pas
    //      chargé sur cette page — voir note ⚠️ plus bas ; sur index.html,
    //      c'est désormais le VRAI bouton de sac-a-dos.js, simplement
    //      révélé), petit éclat. callbacks.onComplet(s) n'est PLUS appelé
    //      ici — voir lancerEssaieDoubleTap juste après : la fiche
    //      "objet" n'apparaît qu'à CE moment-là (pas à l'atterrissage), le
    //      sac restant fermé jusqu'à ce que l'élève réussisse le vrai
    //      double-tap.
    //
    // ⚠️ #sacBouton créé ici est un repli AUTONOME (icône + fiche
    // maison, id="sacBouton" pour rester compatible) — à remplacer par
    // le vrai composant de sac-a-dos.js/.css le jour où ce fichier sera
    // réellement chargé dans index.html (voir "reste à faire" du
    // document de continuité) : creerSacBoutonSiAbsent() ne fait rien
    // si un #sacBouton existe déjà sur la page, pour ne jamais entrer en
    // conflit avec la vraie implémentation une fois branchée.
    function lancerDeblocageSac(s) {
      action.innerHTML = '';
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      // 🐛 CORRIGÉ : l'indice générique (#idenIndice, juste sous
      // #idenPersonnages) collait visuellement contre le titre épique
      // (lui-même positionné en léger débordement sous le cadre, voir
      // .iden-debloque-titre) — les deux textes se touchaient presque,
      // donnant une impression de superposition. Le "tap pour continuer"
      // est maintenant une 3e ligne DANS le titre épique lui-même (voir
      // .iden-debloque-tap plus bas), avec son propre espacement contrôlé
      // ; l'indice générique reste donc masqué pour cette scène.
      indice.style.display = 'none';
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      // Bulle volontairement vidée et laissée vide : ce n'est pas une
      // réplique de personnage, le titre épique (voir plus bas) tient
      // ce rôle visuellement à sa place.
      bulle.innerHTML = '';

      const imgSac = document.createElement('img');
      imgSac.className = 'iden-img actif iden-img-debloque';
      imgSac.id = 'idenImgDebloque';
      imgSac.src = image(options, 'debloqueSac');
      imgSac.alt = texte(options, 'altDebloqueSac');
      personnages.insertBefore(imgSac, bulle);

      const halo = document.createElement('div');
      halo.className = 'iden-debloque-halo';
      personnages.insertBefore(halo, imgSac);

      const titreEpique = document.createElement('div');
      titreEpique.className = 'iden-debloque-titre';
      titreEpique.innerHTML =
        '<span class="iden-debloque-sur">' + texte(options, 'debloqueTitre') + '</span>' +
        '<span class="iden-debloque-nom">' + texte(options, 'debloqueNom') + '</span>' +
        '<span class="iden-debloque-tap">' + texte(options, 'introIndiceTap') + '</span>';
      personnages.appendChild(titreEpique);

      function declencherVol() {
        avancerActif = function () {}; // un seul tap déclenche le vol, jamais deux

        // 🐛 CORRIGÉ : l'ancienne version animait top/left/largeur/hauteur
        // directement — des propriétés de mise en page (reflow), pas
        // accélérées matériellement, d'où l'impression de "saut" abrupt
        // signalée par Raphaël plutôt qu'un vol fluide. Reprise en
        // `transform` (translate + scale) uniquement : la position/taille
        // de DÉPART reste figée en style inline (top/left/largeur/hauteur
        // du rect réel), seul le `transform` bouge pendant la transition —
        // beaucoup plus fluide (accéléré matériellement) qu'animer la
        // boîte elle-même.
        const rect = imgSac.getBoundingClientRect();
        const TAILLE_CIBLE = 48; // taille de #sacBouton, voir .iden-sac-bouton
        const MARGE_CIBLE = 26;  // même marge que .iden-sac-bouton (top/right)
        const topCible = MARGE_CIBLE;
        const gaucheCible = window.innerWidth - MARGE_CIBLE - TAILLE_CIBLE;

        imgSac.style.animation = 'none'; // stoppe le flottement en boucle, la transition prend le relais
        imgSac.style.position = 'fixed';
        imgSac.style.top = rect.top + 'px';
        imgSac.style.left = rect.left + 'px';
        imgSac.style.width = rect.width + 'px';
        imgSac.style.height = rect.height + 'px';
        imgSac.style.margin = '0';
        imgSac.style.transformOrigin = 'top left';
        imgSac.classList.add('iden-debloque-vol-anim');
        halo.classList.add('iden-debloque-halo-vol');
        titreEpique.classList.add('iden-debloque-titre-sortie');

        // Force le navigateur à peindre la position/taille de DÉPART
        // ci-dessus AVANT de fixer le `transform` cible juste en dessous —
        // sans ce reflow forcé, les deux états pourraient être fusionnés
        // en un seul batch de rendu et la transition n'aurait rien à
        // animer.
        void imgSac.offsetWidth;

        const echelleX = TAILLE_CIBLE / rect.width;
        const echelleY = TAILLE_CIBLE / rect.height;
        const translationX = gaucheCible - rect.left;
        const translationY = topCible - rect.top;
        imgSac.style.transform = 'translate(' + translationX + 'px, ' + translationY + 'px) scale(' + echelleX + ', ' + echelleY + ')';
        imgSac.style.opacity = '0';

        setTimeout(atterrir, DELAI_VOL_SAC);
      }

      function atterrir() {
        imgSac.remove();
        halo.remove();
        titreEpique.remove();
        indice.style.display = 'none';

        creerSacBoutonSiAbsent(); // repli seulement si sac-a-dos.js n'est pas chargé sur cette page
        creerFicheSacSiAbsente(); // fiche explicative, branchée sur le bouton (repli ou vrai) qui existe
        const boutonSac = document.getElementById('sacBouton');
        if (boutonSac) {
          // 🆕 Révèle le VRAI #sacBouton — masqué par défaut (voir <style>
          // d'index.html) le temps que l'élève ne l'ait pas encore
          // "gagné" ; ce style inline prend le dessus une seule fois, ici,
          // au moment choisi de la révélation. Sans effet sur le bouton
          // de repli (jamais masqué en premier lieu).
          boutonSac.style.display = '';
          boutonSac.classList.add('iden-sac-eclat');
          setTimeout(function () { boutonSac.classList.remove('iden-sac-eclat'); }, 700);
        }
        // 🐛 CORRIGÉ (2e retour de Raphaël) : la fiche explicative
        // apparaissait ICI, à l'atterrissage — donc AVANT que Bek ne dise
        // "Essaie !", et se refermait toute seule après un délai fixe qui
        // pouvait s'écouler avant même que l'élève ait vu la scène
        // "Essaie !". Elle est déplacée dans lancerEssaieDoubleTap()
        // ci-dessous : elle apparaît pile quand Bek dit "Essaie !", à
        // CÔTÉ du sac (toujours fermé à ce stade), et reste ouverte tant
        // que l'élève n'a pas réussi le double-tap — plus de minuterie
        // arbitraire qui pourrait la refermer avant que l'élève ait eu le
        // temps de comprendre.

        // 🆕 CORRIGÉ cette session : callbacks.onComplet(s) était appelé
        // ICI, juste après l'atterrissage — mais la fiche "objet" ne fait
        // qu'EXPLIQUER le double-tap en mots (sacCarteLigneMots), rien ne
        // le fait pratiquer pour de vrai. Enchaîne maintenant sur
        // lancerEssaieDoubleTap(s) (voir plus bas), qui déplace
        // onComplet(s) à la toute fin — une fois le geste réellement
        // réussi une première fois par l'élève.
        lancerEssaieDoubleTap(s);
      }

      etapeScene = 'dialogue';
      avancerActif = declencherVol;
      reculerActif = function () {}; // rien à reculer, comme lancerReactionSilhouette
      personnages.focus();
    }

    // ================================================================
    // 🆕 Scène "Essaie !" — pratique guidée du VRAI double-tap/double-clic
    // (voir AJOUT_AUTOMATIQUE_TEMPORAIRE en tête de fichier : ce fichier
    // est livré avec ce drapeau désormais à `false`, précisément parce que
    // cette scène existe — c'est le point de raccordement demandé par
    // Raphaël). Jouée juste après l'atterrissage du sac (voir atterrir()
    // ci-dessus) : la fiche "objet" vient de DÉCRIRE le geste en mots,
    // cette scène le fait PRATIQUER pour de vrai, une fois, avant de
    // continuer.
    //
    // Déroulé :
    //   1. Bek dit "Essaie !" (nouvelle réplique fixe essaieBek, TOUJOURS
    //      en français — voir DIALOGUES_FIXES) — c'est le mot-cible du
    //      double-tap, pas un mot séparé ailleurs dans la bulle.
    //   2. Une instruction d'interface, traduite dans la langue de
    //      l'élève (essaieInstruction), s'affiche sous la scène — même
    //      emplacement que l'indice générique "tap pour continuer"
    //      ailleurs, mais avec un texte différent ici : PAS un simple
    //      tap n'importe où qui suffit cette fois, avancerActif reste
    //      délibérément un no-op jusqu'au vrai double-tap sur le mot.
    //   3. 🆕 CORRIGÉ suite au retour de Raphaël : PLUS de badge séparé
    //      accroché au mot. Un simple clic sur "Essaie" affiche sa
    //      traduction normalement (afficherTraductionMot, mécanisme
    //      générique) — celle-ci porte désormais elle-même la précision
    //      "(informel)" quand le mot en fait partie et que la langue de
    //      l'élève en a besoin (voir MOTS_INFORMELS/
    //      LANGUES_SANS_PRECISION_INFORMEL, définis avec
    //      afficherTraductionMot plus haut). Le mot ajouté au sac porte
    //      lui aussi cette marque (voir ajouterMotAuSac) — à sac-a-dos.js
    //      de l'afficher le jour venu.
    //   4. Double-tap/double-clic RÉUSSI sur "Essaie" → même confirmation
    //      visuelle que .iden-mot.flash-ajout (déjà déclenchée par
    //      ajouterMotAuSac, appelé par le double-clic natif — voir
    //      afficherBulle plus haut) + le mot est réellement ajouté au sac
    //      (comme n'importe quel autre mot désormais, AJOUT_AUTOMATIQUE_
    //      TEMPORAIRE valant `false`) ; l'indice bascule alors sur "tap
    //      pour continuer" (introIndiceTap, réutilisé) et avancerActif
    //      devient enfin actif — un tap normal termine la séquence
    //      identité (callbacks.onComplet(s)).
    function lancerEssaieDoubleTap(s) {
      action.innerHTML = '';
      // Même raison que lancerReactionSilhouette/lancerDeblocageSac : une
      // seule image, pas de carrousel — les chevrons resteraient trompeurs.
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      indice.style.display = '';
      indice.textContent = texte(options, 'essaieInstruction');
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');

      // 🆕 La fiche "objet" apparaît PILE ici — au moment où Bek dit
      // "Essaie !", à côté du sac (encore fermé, voir sac-icone-fermee/
      // ouverte dans le CSS) — et reste ouverte jusqu'à la réussite du
      // double-tap (voir fermerCarteSac() dans reussirEssaie ci-dessous),
      // plutôt que de se refermer sur une minuterie arbitraire.
      ouvrirCarteSac();

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      bulle.innerHTML = '';
      bulle.classList.remove('iden-bulle-ligne-bek', 'iden-bulle-ligne-keb');

      const img = document.createElement('img');
      img.className = 'iden-img actif';
      img.src = image(options, 'essaie');
      img.alt = texte(options, 'altEssaie');
      personnages.insertBefore(img, bulle);

      // Même découpage mot-à-mot que afficherBulleReaction — dupliqué
      // plutôt que généralisé, pour la même raison déjà documentée
      // ailleurs dans ce fichier : cette bulle a un besoin propre (une
      // seule réplique fixe, DIALOGUES_FIXES.essaieBek, plutôt qu'une clé
      // texte() variable) que le mécanisme générique afficherBulle()
      // n'a pas à connaître.
      const locuteur = locuteurDeDialogue('essaieBek');
      const ligne = document.createElement('div');
      ligne.className = 'iden-bulle-ligne' + (locuteur ? ' iden-bulle-ligne-' + locuteur : '');
      const brut = DIALOGUES_FIXES.essaieBek;
      const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
      const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
      const mots = [];
      motsBrutSepares.forEach(function (tok) {
        if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
          mots[mots.length - 1] += '\u00A0' + tok;
        } else {
          mots.push(tok);
        }
      });

      let reussi = false;

      mots.forEach(function (motBrut, idx) {
        const span = document.createElement('span');
        span.className = 'iden-mot';
        span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
        const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
        span.tabIndex = 0;
        // 🆕 Simple clic/Entrée : traduction seulement, JAMAIS d'ajout
        // automatique ici (contrairement à afficherBulle ailleurs) —
        // cette scène existe justement pour enseigner que l'ajout exige
        // désormais le double-tap/double-clic, plus le simple clic.
        span.addEventListener('click', function (e) {
          e.stopPropagation();
          afficherTraductionMot(span, motNettoye);
        });
        span.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); e.stopPropagation();
            afficherTraductionMot(span, motNettoye);
          }
        });
        span.addEventListener('dblclick', function (e) {
          e.stopPropagation();
          ajouterMotAuSac(span, motNettoye);
          reussirEssaie();
        });
        ligne.appendChild(span);
      });

      bulle.appendChild(ligne);

      // Réussite : feedback déjà donné par .flash-ajout + le mot qui
      // s'envole vers le sac (voir dblclick ci-dessus, via
      // ajouterMotAuSac/animerMotVersSac) — reste à (1) basculer l'image
      // des personnages sur la scène "tadam" (2) déverser tous les mots
      // déjà touchés dans le vrai sac, d'un coup : c'est CE moment précis
      // que Raphaël a choisi pour que le sac devienne pleinement actif,
      // pas seulement décoratif. Le tout une seule fois (un second
      // double-tap sur "Essaie" ne doit rien redéclencher de tout ceci).
      function reussirEssaie() {
        if (reussi) return;
        reussi = true;
        fermerCarteSac(); // le sac qui s'ouvre pour de vrai (voir animerMotVersSac) démontre le geste, la fiche n'a plus besoin de rester
        img.src = image(options, 'tadam');
        img.alt = texte(options, 'altTadam');
        // 🐛 CORRIGÉ (signalé par Raphaël) : l'image basculait déjà sur
        // "tadam" mais la bulle gardait le texte "Essaie !" affiché — Keb
        // ne disait jamais réellement "Tadam !" à l'écran. 🆕 CORRIGÉ à
        // nouveau cette session : la première correction construisait la
        // bulle "à la main" (simple <div>, texte brut) plutôt que par
        // afficherLigneBulleUnique() — "Tadam !" n'était donc PAS
        // cliquable comme le reste du dialogue, et n'affichait jamais sa
        // traduction même une fois ajoutée au dictionnaire (voir
        // index.html, TRADUCTIONS_MOTS_IDENTITE). Remplacé par le même
        // helper que lancerPretBek/lancerConfirmationIdentite : mot-à-mot
        // cliquable, traduction + ajout au sac comme partout ailleurs.
        afficherLigneBulleUnique('tadamKeb');
        synchroniserMotsToucheSacUneFois();

        // 🆕 CORRIGÉ (demande de Raphaël) : taper n'importe où sur la
        // scène ne fait PLUS avancer — pour "s'assurer qu'on utilise la
        // fonction" du sac, c'est désormais un clic sur #sacBouton
        // lui-même qui fait office de "continuer" (en plus d'ouvrir le
        // sac normalement, ce qui est justement le but). Une flèche
        // discrète apparaît à côté du sac pour inviter ce clic — voir
        // afficherFlecheVersSac/masquerFlecheVersSac plus bas.
        indice.textContent = texte(options, 'introIndiceTapSac');
        avancerActif = function () {}; // plus de tap générique sur la scène à cette étape
        reculerActif = function () {};

        const boutonSac = document.getElementById('sacBouton');
        if (boutonSac) {
          afficherFlecheVersSac();
          const continuerDepuisSac = function () {
            boutonSac.removeEventListener('click', continuerDepuisSac);
            masquerFlecheVersSac();
            lancerPretBek(s);
          };
          boutonSac.addEventListener('click', continuerDepuisSac);
        } else {
          // Filet de sécurité : si #sacBouton est introuvable pour une
          // raison quelconque, ne pas bloquer l'élève indéfiniment sans
          // aucune façon d'avancer.
          avancerActif = function () { lancerPretBek(s); };
          indice.textContent = texte(options, 'introIndiceTap');
        }
      }

      etapeScene = 'dialogue';
      avancerActif = function () {}; // no-op tant que le double-tap n'a pas réussi (voir reussirEssaie)
      reculerActif = function () {}; // rien à reculer, comme lancerReactionSilhouette
      personnages.focus();
    }

    // ================================================================
    // 🆕 Séquence "Prêt(e) ?" — jouée juste après "Tadam !" (voir
    // reussirEssaie ci-dessus). Convenue avec Raphaël :
    //   1. Bek se tourne vers Keb : "Bon, là, il/elle est prêt(e)."
    //      (lancerPretBek)
    //   2. Keb regarde l'élève et demande "Prêt(e) ?", avec en dessous
    //      une liste (nom, genre+âge) et un choix Oui/Non
    //      (lancerConfirmationIdentite)
    //   3. "Oui" → création de compte (lancerCreationCompte)
    //      "Non" → menu bilingue groupé pour changer nom/genre+âge
    //      (lancerEditionIdentite), puis retour à l'étape 2
    // ================================================================

    // Bulle à UNE seule ligne, mot-à-mot cliquable (traduction + ajout au
    // sac) — même mécanique que afficherBulleReaction plus haut,
    // généralisée ici pour être réutilisée par lancerPretBek ET la ligne
    // de Keb dans lancerConfirmationIdentite, plutôt que redupliquée une
    // troisième fois pour deux répliques aussi courtes.
    function afficherLigneBulleUnique(cle) {
      bulle.innerHTML = '';
      const brut = DIALOGUES_FIXES[cle];
      const locuteur = locuteurDeDialogue(cle);
      const ligne = document.createElement('div');
      ligne.className = 'iden-bulle-ligne' + (locuteur ? ' iden-bulle-ligne-' + locuteur : '');
      const motsBrutSepares = String(brut).split(/\s+/).filter(Boolean);
      const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;
      const mots = [];
      motsBrutSepares.forEach(function (tok) {
        if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
          mots[mots.length - 1] += '\u00A0' + tok;
        } else {
          mots.push(tok);
        }
      });
      mots.forEach(function (motBrut, idx) {
        const span = document.createElement('span');
        span.className = 'iden-mot';
        span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
        const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
        span.tabIndex = 0;
        span.addEventListener('click', function (e) {
          e.stopPropagation();
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
        ligne.appendChild(span);
      });
      bulle.appendChild(ligne);
      majBoutonTraduirePhrase([cle]);
    }

    // 'm'/adulte:false → 'garcon', 'm'/adulte:true → 'homme', etc. — même
    // table que SILHOUETTES, mais indexée par genre+adulte plutôt que par
    // id, pour retrouver le mot de vocabulaire à partir de s.genre/s.adulte
    // (déjà connus à ce stade) sans reparcourir tout le tableau à chaque
    // fois.
    function vocabCleDepuisGenreAge(genre, adulte) {
      if (genre === 'm') return adulte ? 'homme' : 'garcon';
      return adulte ? 'femme' : 'fille';
    }

    // 🆕 Affiche le mot de vocabulaire garçon/homme/fille/femme (TOUJOURS
    // en français, voir VOCABULAIRE_GENRE) suivi de sa traduction entre
    // parenthèses quand options.traductions la connaît — demande de
    // Raphaël : plus besoin de cliquer pour la voir sur les écrans de
    // confirmation/édition (contrairement au dialogue Keb/Bek, où la
    // traduction reste au clic — ici c'est un résumé à lire d'un coup
    // d'œil, pas une réplique à explorer mot à mot). Réutilise
    // traductionDeMot() telle quelle : le nom (dernier mot de "Un
    // garçon"/"Une femme"/etc.) est déjà exactement la clé utilisée dans
    // TRADUCTIONS_MOTS_IDENTITE.
    function libelleGenreAgeAvecTraduction(genre, adulte) {
      const brut = VOCABULAIRE_GENRE[vocabCleDepuisGenreAge(genre, adulte)];
      const mots = brut.trim().split(/\s+/);
      const trad = traductionDeMot(mots[mots.length - 1]);
      return trad ? brut + ' (' + trad + ')' : brut;
    }

    function lancerPretBek(s) {
      action.innerHTML = '';
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      indice.style.display = '';
      indice.textContent = texte(options, 'introIndiceTap');
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      const img = document.createElement('img');
      img.className = 'iden-img actif';
      img.src = image(options, 'pretBek');
      img.alt = texte(options, 'altPretBek');
      personnages.insertBefore(img, bulle);

      afficherLigneBulleUnique(s.genre === 'f' ? 'pretCompteBekF' : 'pretCompteBekM');

      etapeScene = 'dialogue';
      avancerActif = function () { lancerConfirmationIdentite(s); }; // un seul tap termine cette réplique
      reculerActif = function () {};
      personnages.focus();
    }

    function lancerConfirmationIdentite(s) {
      action.innerHTML = '';
      chevron.style.display = 'none';
      chevronGauche.style.display = 'none';
      // Pas de "tap pour continuer" ici — ce sont les boutons Oui/Non
      // ci-dessous qui pilotent la suite, pas un tap générique sur la
      // scène (qui resterait ambigu : oui ou non ?).
      indice.style.display = 'none';
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');

      Array.from(personnages.querySelectorAll('img.iden-img')).forEach(function (img) { img.remove(); });
      const img = document.createElement('img');
      img.className = 'iden-img actif';
      img.src = image(options, 'pretKeb');
      img.alt = texte(options, 'altPretKeb');
      personnages.insertBefore(img, bulle);

      afficherLigneBulleUnique(s.genre === 'f' ? 'pretCompteKebF' : 'pretCompteKebM');

      const liste = document.createElement('div');
      liste.className = 'iden-confirmation-liste';

      function ajouterLigne(etiquetteCle, valeur) {
        const ligne = document.createElement('div');
        ligne.className = 'iden-confirmation-ligne';
        const etiquette = document.createElement('span');
        etiquette.className = 'iden-confirmation-etiquette';
        etiquette.textContent = texte(options, etiquetteCle);
        const valeurSpan = document.createElement('span');
        valeurSpan.className = 'iden-confirmation-valeur';
        valeurSpan.textContent = valeur;
        ligne.appendChild(etiquette);
        ligne.appendChild(valeurSpan);
        liste.appendChild(ligne);
      }

      // Les VALEURS affichées ne passent jamais par texte()/options.textes
      // : le prénom est tel que saisi, et le mot garçon/homme/fille/femme
      // est un mot de vocabulaire TOUJOURS en français (VOCABULAIRE_GENRE),
      // même principe que dans lancerSilhouettes.
      ajouterLigne('confirmationLabelNom', s.prenom);
      ajouterLigne('confirmationLabelGenreAge', libelleGenreAgeAvecTraduction(s.genre, s.adulte));

      action.appendChild(liste);

      const boutons = document.createElement('div');
      boutons.className = 'iden-confirmation-boutons';

      // 🆕 "Oui"/"Non" volontairement en français, jamais traduits — même
      // principe que le bloc "First time?" d'index.html (pf-bouton) : ce
      // sont eux-mêmes des mots de vocabulaire exposés par immersion.
      const btnOui = document.createElement('button');
      btnOui.type = 'button';
      btnOui.className = 'iden-btn-confirmation iden-btn-oui';
      btnOui.textContent = 'Oui';
      btnOui.addEventListener('click', function () { lancerCreationCompte(s); });
      boutons.appendChild(btnOui);

      const btnNon = document.createElement('button');
      btnNon.type = 'button';
      btnNon.className = 'iden-btn-confirmation iden-btn-non';
      btnNon.textContent = 'Non';
      btnNon.addEventListener('click', function () { lancerEditionIdentite(s); });
      boutons.appendChild(btnNon);

      action.appendChild(boutons);

      etapeScene = 'inactive';
      avancerActif = function () {};
      reculerActif = function () {};
      personnages.focus();
    }

    // 🆕 Menu d'édition BILINGUE (langue de l'apprenant + français),
    // demandé par Raphaël plutôt qu'une réouverture séquentielle des
    // écrans de saisie du nom/silhouettes — un seul écran groupé, chaque
    // ligne modifiable indépendamment, retour ici après chaque
    // modification pour relire l'ensemble avant de confirmer. La version
    // française des étiquettes (xxxFr) est TOUJOURS en français, peu
    // importe options.textes — même principe que labelPrefixeNom.
    function lancerEditionIdentite(s) {
      indice.style.display = 'none';
      btnTraduirePhrase.style.display = 'none';
      tooltipPhrase.classList.remove('visible');

      function dessinerMenu() {
        action.innerHTML = '';

        const titre = document.createElement('div');
        titre.className = 'iden-titre';
        titre.textContent = texte(options, 'editionTitre');
        action.appendChild(titre);

        const bloc = document.createElement('div');
        bloc.className = 'iden-edition-bloc';

        function ajouterLigneEdition(etiquetteCle, etiquetteFrCle, valeur, onModifier) {
          const ligne = document.createElement('div');
          ligne.className = 'iden-edition-ligne';

          const etiquettes = document.createElement('div');
          etiquettes.className = 'iden-edition-etiquettes';
          const etiquette = document.createElement('span');
          etiquette.className = 'iden-edition-etiquette';
          etiquette.textContent = texte(options, etiquetteCle);
          const etiquetteFr = document.createElement('span');
          etiquetteFr.className = 'iden-edition-etiquette-fr';
          etiquetteFr.textContent = texte(options, etiquetteFrCle);
          etiquettes.appendChild(etiquette);
          etiquettes.appendChild(etiquetteFr);
          ligne.appendChild(etiquettes);

          const valeurSpan = document.createElement('span');
          valeurSpan.className = 'iden-edition-valeur';
          valeurSpan.textContent = valeur;
          ligne.appendChild(valeurSpan);

          const btnModifier = document.createElement('button');
          btnModifier.type = 'button';
          btnModifier.className = 'iden-edition-btn-modifier';
          btnModifier.textContent = texte(options, 'editionBtnModifier');
          btnModifier.addEventListener('click', onModifier);
          ligne.appendChild(btnModifier);

          bloc.appendChild(ligne);
        }

        ajouterLigneEdition('confirmationLabelNom', 'editionLabelNomFr', s.prenom, dessinerEditionNom);
        ajouterLigneEdition(
          'confirmationLabelGenreAge', 'editionLabelGenreAgeFr',
          libelleGenreAgeAvecTraduction(s.genre, s.adulte),
          dessinerEditionGenre
        );

        action.appendChild(bloc);

        const btnConfirmer = document.createElement('button');
        btnConfirmer.type = 'button';
        btnConfirmer.className = 'iden-btn-valider';
        btnConfirmer.textContent = texte(options, 'editionBtnConfirmer');
        btnConfirmer.addEventListener('click', function () { lancerConfirmationIdentite(s); });
        action.appendChild(btnConfirmer);
      }

      // Sous-vue : modifier le nom — réutilise validerNom/messageErreur
      // (mêmes règles qu'à la saisie initiale), mais revient à ce même
      // menu groupé au lieu d'enchaîner sur les silhouettes.
      function dessinerEditionNom() {
        action.innerHTML = '';

        const ligne = document.createElement('div');
        ligne.className = 'iden-ligne-nom';
        const prefixe = document.createElement('span');
        prefixe.className = 'iden-prefixe-nom';
        prefixe.textContent = texte(options, 'labelPrefixeNom');
        ligne.appendChild(prefixe);
        const champ = document.createElement('input');
        champ.type = 'text';
        champ.className = 'iden-champ-nom';
        champ.value = s.prenom;
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
          if (!resultat.valide) {
            erreurDiv.textContent = messageErreur(resultat.raison);
            erreurDiv.classList.add('in');
            return;
          }
          s.prenom = champ.value.trim();
          dessinerMenu();
        }
        btn.addEventListener('click', tenter);
        champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') tenter(); });
        champ.focus();
      }

      // Sous-vue : modifier le genre/tranche d'âge — réutilise
      // .iden-grille-silhouettes/.iden-btn-silhouette (conservées
      // inutilisées dans le CSS depuis le passage au carrousel, voir
      // identite-eleve.css) : parfaites pour ce menu simplifié, pas
      // besoin du carrousel complet (images/badges d'âge) pour un simple
      // changement rapide.
      function dessinerEditionGenre() {
        action.innerHTML = '';

        const titre = document.createElement('div');
        titre.className = 'iden-titre';
        titre.textContent = texte(options, 'titreSilhouettes');
        action.appendChild(titre);

        const grille = document.createElement('div');
        grille.className = 'iden-grille-silhouettes';
        SILHOUETTES.forEach(function (sil) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'iden-btn-silhouette';
          btn.textContent = VOCABULAIRE_GENRE[sil.vocabCle];
          btn.addEventListener('click', function () {
            s.genre = sil.genre;
            s.adulte = sil.adulte;
            dessinerMenu();
          });
          grille.appendChild(btn);
        });
        action.appendChild(grille);
      }

      etapeScene = 'inactive';
      avancerActif = function () {};
      reculerActif = function () {};
      dessinerMenu();
      personnages.focus();
    }

    // 🆕 Création de compte — même mécanisme que l'ancien index.html
    // fourni par Raphaël (courriel + code reçu par courriel, sans mot de
    // passe, via Supabase Auth signInWithOtp/verifyOtp), UI reconstruite
    // dans le style du site plutôt que copiée telle quelle. Utilise
    // KebBekProgression.client (progression.js doit être chargé, et le
    // CDN Supabase avant lui — voir index.html) plutôt que de créer son
    // propre client, pour ne jamais désynchroniser deux instances
    // différentes du SDK sur la même page.
    function lancerCreationCompte(s) {
      action.innerHTML = '';
      indice.style.display = 'none';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'creationCompteTitre');
      action.appendChild(titre);

      const intro = document.createElement('p');
      intro.className = 'iden-indice';
      intro.style.margin = '-6px 0 0';
      intro.textContent = texte(options, 'creationCompteTexte');
      action.appendChild(intro);

      const champEmail = document.createElement('input');
      champEmail.type = 'email';
      champEmail.className = 'iden-champ-nom';
      champEmail.placeholder = texte(options, 'creationCompteLabelEmail');
      champEmail.autocomplete = 'email';
      action.appendChild(champEmail);

      const btnEnvoyer = document.createElement('button');
      btnEnvoyer.type = 'button';
      btnEnvoyer.className = 'iden-btn-valider';
      btnEnvoyer.textContent = texte(options, 'creationCompteBtnEnvoyer');
      action.appendChild(btnEnvoyer);

      const msgDiv = document.createElement('div');
      msgDiv.className = 'iden-erreur';
      action.appendChild(msgDiv);

      function afficherMsg(txt, estErreur) {
        msgDiv.textContent = txt;
        msgDiv.classList.add('in');
        msgDiv.classList.toggle('iden-msg-succes', !estErreur);
      }

      // 🆕 Option "continuer en invité" (demande de Raphaël) — reste
      // volontairement en retrait sous le bouton principal (voir
      // .iden-lien-invite dans le CSS : simple lien texte, pas une
      // pilule pleine comme .iden-btn-valider) pour ne jamais concurrencer
      // visuellement la création de compte. N'écrit RIEN de plus que ce
      // que la séquence fait déjà pour un invité normalement — même appel
      // à enregistrerIdentite() que la branche compte plus bas
      // (dessinerEtapeCode), qui route automatiquement vers le stockage
      // local quand aucune session n'est active (voir sa propre
      // implémentation dans progression.js) — rien de spécifique à coder
      // ici pour le mode invité lui-même.
      const btnInvite = document.createElement('button');
      btnInvite.type = 'button';
      btnInvite.className = 'iden-lien-invite';
      btnInvite.textContent = texte(options, 'creationCompteLienInvite');
      action.appendChild(btnInvite);

      const avertissementInvite = document.createElement('p');
      avertissementInvite.className = 'iden-avertissement-invite';
      avertissementInvite.textContent = texte(options, 'creationCompteAvertissementInvite');
      action.appendChild(avertissementInvite);

      btnInvite.addEventListener('click', async function () {
        btnInvite.disabled = true;
        if (window.KebBekProgression) {
          try {
            await window.KebBekProgression.enregistrerIdentite(s.genre, undefined, undefined, s.adulte);
          } catch (e) {
            console.warn('lancerCreationCompte : enregistrerIdentite (invité) a échoué.', e);
          }
        }
        if (typeof callbacks.onComplet === 'function') callbacks.onComplet(s);
      });

      btnEnvoyer.addEventListener('click', async function () {
        const email = champEmail.value.trim();
        if (!email) { afficherMsg(texte(options, 'creationCompteErreurCourrielVide'), true); return; }
        if (!window.KebBekProgression) { afficherMsg(texte(options, 'creationCompteErreurIndisponible'), true); return; }

        btnEnvoyer.disabled = true;
        afficherMsg(texte(options, 'creationCompteEnvoiEnCours'), false);
        await window.KebBekProgression.initSession(); // s'assure qu'un client Supabase existe (le crée si besoin, voir progression.js)
        const client = window.KebBekProgression.client;
        if (!client) {
          afficherMsg(texte(options, 'creationCompteErreurIndisponible'), true);
          btnEnvoyer.disabled = false;
          return;
        }
        const { error } = await client.auth.signInWithOtp({ email: email, options: { shouldCreateUser: true } });
        btnEnvoyer.disabled = false;
        if (error) { afficherMsg(error.message, true); return; }
        afficherMsg(texte(options, 'creationCompteCodeEnvoye'), false);
        dessinerEtapeCode(email);
      });

      function dessinerEtapeCode(email) {
        action.innerHTML = '';

        const titreCode = document.createElement('div');
        titreCode.className = 'iden-titre';
        titreCode.textContent = texte(options, 'creationCompteTitre');
        action.appendChild(titreCode);

        const msgEnvoye = document.createElement('p');
        msgEnvoye.className = 'iden-indice';
        msgEnvoye.style.margin = '-6px 0 0';
        msgEnvoye.textContent = texte(options, 'creationCompteCodeEnvoye');
        action.appendChild(msgEnvoye);

        const champCode = document.createElement('input');
        champCode.type = 'text';
        champCode.className = 'iden-champ-nom';
        champCode.placeholder = texte(options, 'creationCompteLabelCode');
        champCode.autocomplete = 'one-time-code';
        champCode.inputMode = 'numeric';
        action.appendChild(champCode);

        const btnVerifier = document.createElement('button');
        btnVerifier.type = 'button';
        btnVerifier.className = 'iden-btn-valider';
        btnVerifier.textContent = texte(options, 'creationCompteBtnVerifier');
        action.appendChild(btnVerifier);

        const erreurDiv = document.createElement('div');
        erreurDiv.className = 'iden-erreur';
        action.appendChild(erreurDiv);

        btnVerifier.addEventListener('click', async function () {
          const token = champCode.value.trim();
          if (!token) {
            erreurDiv.textContent = texte(options, 'creationCompteErreurCodeVide');
            erreurDiv.classList.add('in');
            return;
          }
          btnVerifier.disabled = true;
          erreurDiv.textContent = texte(options, 'creationCompteVerificationEnCours');
          erreurDiv.classList.add('in');

          const client = window.KebBekProgression.client;
          const { data, error } = await client.auth.verifyOtp({ email: email, token: token, type: 'email' });
          btnVerifier.disabled = false;
          if (error) {
            erreurDiv.textContent = error.message;
            erreurDiv.classList.add('in');
            return;
          }

          window.KebBekProgression.definirSession(data.session);
          // ⚠️ Clé DUPLIQUÉE depuis CLE_INVITE_LOCALE dans progression.js
          // (non exposée par l'API du module) — à garder synchronisée si
          // jamais son nom change là-bas.
          try { localStorage.removeItem('kebbek_invite'); } catch (e) {}

          const resultat = await window.KebBekProgression.creerProfil(s.prenom);
          if (resultat && resultat.profil && resultat.profil.id) {
            window.KebBekProgression.definirProfilActif(resultat.profil.id);
            if (resultat.estNouveau) {
              await window.KebBekProgression.migrerProgressionInviteVersCompte(resultat.profil.id);
              await window.KebBekProgression.migrerIdentiteInviteVersCompte(resultat.profil.id);
            }
            // prenom/nationalite non touchés ici (undefined) : le prénom
            // est déjà écrit via creerProfil ci-dessus, la nationalité
            // n'est pas encore collectée à ce stade de la séquence.
            await window.KebBekProgression.enregistrerIdentite(s.genre, undefined, undefined, s.adulte);
          } else {
            console.warn('lancerCreationCompte : creerProfil n\'a pas retourné de profil exploitable.', resultat);
          }

          if (typeof callbacks.onComplet === 'function') callbacks.onComplet(s);
        });
        champCode.addEventListener('keydown', function (e) { if (e.key === 'Enter') btnVerifier.click(); });
        champCode.focus();
      }

      champEmail.addEventListener('keydown', function (e) { if (e.key === 'Enter') btnEnvoyer.click(); });
      champEmail.focus();

      etapeScene = 'inactive';
      avancerActif = function () {};
      reculerActif = function () {};
      personnages.focus();
    }    // Crée #sacBouton s'il n'existe pas déjà sur la page — repli
    // autonome, voir note ⚠️ au-dessus de lancerDeblocageSac. N'écrase
    // jamais un #sacBouton déjà présent (venant d'une vraie intégration
    // de sac-a-dos.js).
    // 🆕 Flèche discrète invitant à cliquer sur #sacBouton (voir
    // reussirEssaie) — créée une seule fois puis réutilisée (comme
    // #idenCarteSac). 🐛 CORRIGÉ cette session : les deux tentatives
    // précédentes (glyphe → tourné par un angle CSS deviné à l'œil,
    // rotate(-108deg)) restaient "croche" (retour direct de Raphaël) —
    // un angle fixe ne peut de toute façon jamais viser le VRAI centre
    // de #sacBouton, qui dépend de la taille d'écran. Remplacé par un
    // vrai SVG : une ligne dont les deux extrémités sont calculées à
    // partir de #sacBouton.getBoundingClientRect() à chaque affichage, et
    // une pointe de flèche posée dessus via un <marker orient="auto"> —
    // orient="auto" fait tourner la pointe SEULE, géométriquement, pour
    // suivre la direction réelle de la ligne : plus aucun angle à deviner
    // ni à ajuster à l'œil, quelle que soit la taille de fenêtre.
    const NS_SVG = 'http://www.w3.org/2000/svg';
    const DECALAGE_DEPART_FLECHE = 58; // distance (px) entre le départ de la flèche et le centre du sac — même intention que l'ancien top:85px/right:36px codé en dur, mais dérivée de la vraie position du bouton plutôt que devinée

    function creerFlecheVersSacSiAbsente() {
      const existante = document.getElementById('idenFlecheSac');
      if (existante) return existante;

      const svg = document.createElementNS(NS_SVG, 'svg');
      svg.id = 'idenFlecheSac';
      svg.setAttribute('class', 'iden-fleche-sac');
      svg.setAttribute('aria-hidden', 'true');

      const defs = document.createElementNS(NS_SVG, 'defs');
      const marker = document.createElementNS(NS_SVG, 'marker');
      marker.id = 'idenFlecheSacPointe';
      marker.setAttribute('markerWidth', '8');
      marker.setAttribute('markerHeight', '8');
      marker.setAttribute('refX', '6');
      marker.setAttribute('refY', '4');
      marker.setAttribute('orient', 'auto'); // 🆕 le cœur du correctif : orientation calculée par le SVG lui-même, le long de la ligne
      const pointe = document.createElementNS(NS_SVG, 'path');
      pointe.setAttribute('d', 'M0,0 L8,4 L0,8 Z');
      pointe.setAttribute('class', 'iden-fleche-sac-pointe');
      marker.appendChild(pointe);
      defs.appendChild(marker);
      svg.appendChild(defs);

      const ligne = document.createElementNS(NS_SVG, 'line');
      ligne.id = 'idenFlecheSacLigne';
      ligne.setAttribute('class', 'iden-fleche-sac-ligne');
      ligne.setAttribute('marker-end', 'url(#idenFlecheSacPointe)');
      svg.appendChild(ligne);

      document.body.appendChild(svg);
      return svg;
    }

    // Recalcule le tracé à partir de la position RÉELLE de #sacBouton —
    // appelée à l'affichage ET au redimensionnement (voir
    // flecheRepositionnerSiVisible), jamais figée une fois pour toutes.
    function positionnerFlecheVersSac(svg, bouton) {
      const rectBouton = bouton.getBoundingClientRect();
      const cibleX = rectBouton.left + rectBouton.width / 2;
      const cibleY = rectBouton.top + rectBouton.height / 2;
      const departX = cibleX - DECALAGE_DEPART_FLECHE;
      const departY = cibleY + DECALAGE_DEPART_FLECHE;
      const dx = cibleX - departX;
      const dy = cibleY - departY;
      const longueur = Math.hypot(dx, dy) || 1;
      // La ligne s'arrête un peu AVANT le centre réel (rayon du bouton +
      // petite marge) pour que la pointe touche le bord du cercle plutôt
      // que de s'enfoncer dedans.
      const marge = rectBouton.width / 2 + 4;
      const finX = cibleX - (dx / longueur) * marge;
      const finY = cibleY - (dy / longueur) * marge;

      svg.setAttribute('width', window.innerWidth);
      svg.setAttribute('height', window.innerHeight);
      svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);
      const ligne = document.getElementById('idenFlecheSacLigne');
      ligne.setAttribute('x1', departX);
      ligne.setAttribute('y1', departY);
      ligne.setAttribute('x2', finX);
      ligne.setAttribute('y2', finY);

      // Petit rebond animé le long de CE MÊME axe (voir .iden-fleche-sac
      // dans le CSS) — un vecteur unitaire × quelques px, plutôt qu'un
      // simple translate(4px,0) qui ne pointait, avant, que par hasard
      // dans une direction cohérente avec l'ancien rotate() codé en dur.
      svg.style.setProperty('--iden-fleche-dx', (dx / longueur * 5) + 'px');
      svg.style.setProperty('--iden-fleche-dy', (dy / longueur * 5) + 'px');
    }

    function flecheRepositionnerSiVisible() {
      const svg = document.getElementById('idenFlecheSac');
      const bouton = document.getElementById('sacBouton');
      if (svg && bouton && svg.classList.contains('visible')) positionnerFlecheVersSac(svg, bouton);
    }

    function afficherFlecheVersSac() {
      const bouton = document.getElementById('sacBouton');
      if (!bouton) return;
      const svg = creerFlecheVersSacSiAbsente();
      positionnerFlecheVersSac(svg, bouton);
      svg.classList.add('visible');
      window.addEventListener('resize', flecheRepositionnerSiVisible);
    }
    function masquerFlecheVersSac() {
      const svg = document.getElementById('idenFlecheSac');
      if (svg) svg.classList.remove('visible');
      window.removeEventListener('resize', flecheRepositionnerSiVisible);
    }

    function creerSacBoutonSiAbsent() {
      if (document.getElementById('sacBouton')) return;

      const bouton = document.createElement('button');
      bouton.type = 'button';
      bouton.id = 'sacBouton';
      bouton.className = 'iden-sac-bouton';
      bouton.setAttribute('aria-label', texte(options, 'debloqueNom'));
      const icone = document.createElement('img');
      icone.className = 'iden-sac-bouton-icone';
      icone.src = image(options, 'iconeSac');
      icone.alt = texte(options, 'altIconeSac');
      bouton.appendChild(icone);
      document.body.appendChild(bouton);
    }

    // 🐛 CORRIGÉ : cette fiche vivait auparavant DANS
    // creerSacBoutonSiAbsent(), qui s'arrête tout de suite dès que le
    // VRAI #sacBouton existe déjà (ligne juste au-dessus) — la fiche
    // explicative n'était donc plus JAMAIS créée une fois sac-a-dos.js
    // vraiment intégré, silencieusement (afficherCarteSacUneFois ne
    // trouvait rien et ne faisait rien). Extraite en fonction séparée,
    // appelée dans TOUS les cas (repli ou vrai bouton) : la fiche doit
    // brancher son survol/tap sur QUEL QUE SOIT le #sacBouton présent.
    function creerFicheSacSiAbsente() {
      if (document.getElementById('idenCarteSac')) return;
      const bouton = document.getElementById('sacBouton');
      if (!bouton) return;

      const carte = document.createElement('div');
      carte.id = 'idenCarteSac';
      carte.className = 'iden-sac-carte';
      const titre = document.createElement('div');
      titre.className = 'iden-sac-carte-titre';
      titre.textContent = texte(options, 'sacCarteTitre');
      carte.appendChild(titre);
      const liste = document.createElement('ul');
      liste.className = 'iden-sac-carte-liste';
      [texte(options, 'sacCarteLigneMots'), texte(options, 'sacCarteLigneDejaSauvegardes'), texte(options, 'sacCarteLigneObjets')].forEach(function (ligne) {
        const li = document.createElement('li');
        li.textContent = ligne;
        liste.appendChild(li);
      });
      carte.appendChild(liste);
      document.body.appendChild(carte);

      // Survol (souris) : ouvre/ferme directement. Tap (tactile, pas de
      // survol) : bascule au clic sur le bouton, fermeture au tap
      // ailleurs sur la page — même patron que le sélecteur de langue
      // d'index.html (ouvrir/fermer + clic extérieur).
      let carteOuverteManuel = false;
      function ouvrirCarte() { carte.classList.add('visible'); }
      function fermerCarte() { carte.classList.remove('visible'); carteOuverteManuel = false; }
      bouton.addEventListener('mouseenter', ouvrirCarte);
      bouton.addEventListener('mouseleave', function () { if (!carteOuverteManuel && !ficheSacForceeOuverte) fermerCarte(); });
      bouton.addEventListener('click', function (e) {
        // 🆕 Distingue repli (classe .iden-sac-bouton, aucun vrai panneau
        // à côté — le clic doit basculer la fiche lui-même) du VRAI
        // #sacBouton (sac-a-dos.js), qui porte déjà son propre
        // onclick="toggleSacADos()" dans le markup d'index.html : dans ce
        // cas le clic ouvre le vrai panneau tout seul, la fiche n'a plus
        // qu'à s'écarter pour ne pas rester superposée par-dessus.
        if (ficheSacForceeOuverte) return; // laisse lancerEssaieDoubleTap/reussirEssaie décider seuls, pendant cette scène
        if (bouton.classList.contains('iden-sac-bouton')) {
          e.stopPropagation();
          if (carte.classList.contains('visible')) { fermerCarte(); }
          else { ouvrirCarte(); carteOuverteManuel = true; }
        } else {
          fermerCarte();
        }
      });
      document.addEventListener('click', function (e) {
        if (ficheSacForceeOuverte) return; // idem : pas de fermeture au clic extérieur pendant la scène Essaie
        if (carte.classList.contains('visible') && !bouton.contains(e.target) && !carte.contains(e.target)) fermerCarte();
      });
    }

    // 🆕 Drapeau partagé avec creerFicheSacSiAbsente() plus bas : pendant
    // que la fiche est "forcée ouverte" par lancerEssaieDoubleTap
    // (ci-dessous), le survol/le clic-extérieur ne doivent PAS pouvoir la
    // refermer prématurément — cliquer sur le mot "Essaie" lui-même est
    // un clic "extérieur" à la fiche/au bouton, et la fermerait sinon
    // avant même que l'élève ait fini de lire.
    let ficheSacForceeOuverte = false;

    // Ouvre/ferme la fiche "objet" explicitement — remplace l'ancienne
    // afficherCarteSacUneFois() (minuterie fixe de DELAI_CARTE_AUTO_SAC,
    // retirée) : la fiche est maintenant pilotée par le déroulé réel de
    // la scène "Essaie !" (voir lancerEssaieDoubleTap/reussirEssaie plus
    // bas) plutôt que par un délai arbitraire déconnecté de ce que
    // l'élève fait réellement à l'écran.
    function ouvrirCarteSac() {
      const carte = document.getElementById('idenCarteSac');
      if (carte) carte.classList.add('visible');
      ficheSacForceeOuverte = true;
    }
    function fermerCarteSac() {
      const carte = document.getElementById('idenCarteSac');
      if (carte) carte.classList.remove('visible');
      ficheSacForceeOuverte = false;
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

