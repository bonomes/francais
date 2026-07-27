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

   🆕 Étape 0 ajoutée cette session : etapeIntroPersonnages(), un trio
   d'images (Keb se présente → Bek se présente → Bek demande "et toi ?")
   qui précède désormais etapeSaisieNom(). Les 3 images (896×936, même
   canevas que la scène "Ça va ?" de essai_cava_reactions_v3) sont
   superposées dans un seul conteneur et défilent au tap/clic — jamais
   automatiquement — en réutilisant tel quel le patron .cava-img/
   .cava-img.actif de cet essai (une seule image .actif à la fois,
   transition d'opacité, aucun repositionnement : les personnages
   restent au même endroit d'une image à l'autre). Voir IMAGES_PAR_DEFAUT
   plus bas pour l'avertissement sur les chemins d'image (non confirmés).
   Le dialogue parlé qui accompagnera ces images (mots cliquables vers
   le sac, comme "Ça va ?" dans l'essai) n'est PAS encore construit ici
   — texte pas encore fourni par Raphaël (voir BONOMES_v63, "reste à
   faire") — seul le mécanisme de défilement est en place pour l'instant.

   Déroulé complet, tel que décidé :
   0. etapeIntroPersonnages() : 3 images superposées, tap/clic pour
      avancer (voir note ci-dessus). Au tap sur la 3e (la question),
      enchaîne directement sur etapeSaisieNom().
   1. etapeSaisieNom() : champ texte libre, bouton valider.
      - Un "échec" = champ vide, OU mot jugé inapproprié (liste non
        exhaustive, volontairement — voir MOTS_BANNIS), OU longueur
        hors 2–20 caractères, OU caractères hors alphabet français
        (accents français acceptés, autres scripts refusés).
      - 3 échecs consécutifs → etapeChoixNomRepli().
      - Un succès direct (dès le premier essai ou après un retour à 0)
        → etapeSilhouettes() SANS aucun genre pré-rempli : les 4
        choix (garçon/homme/fille/femme) restent pleinement ouverts.
   2. etapeChoixNomRepli() : 3 paires distinctes tirées au hasard parmi
      les 20 de BANQUE_NOMS (6 boutons : masculin/féminin de chacune).
      Cliquer fixe `prenom` ET `genre` en un seul geste, puis enchaîne
      DIRECTEMENT sur etapeSilhouettes() (pas de dialogue de transition
      — décidé volontairement pour limiter le texte à traduire).
   3. etapeSilhouettes(genrePreRempli) : 4 silhouettes (garçon / homme /
      fille / femme). Si un genre est déjà connu (venant du choix de
      repli), les 2 silhouettes du genre opposé sont visibles mais
      DÉSACTIVÉES (pas masquées) — pour signaler à l'élève qu'il s'est
      peut-être trompé de bonhomme si aucune des silhouettes actives ne
      lui correspond. Un bouton "Changer mon nom" permet de revenir
      complètement à l'étape 1, compteur d'échecs remis à 0.
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
   ================================================================== */

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

  // ---------- Vocabulaire de genre + répliques de Keb/Bek — TOUJOURS en
  // français, quelle que soit la langue de l'interface ----------
  //
  // 🐛 CORRIGÉ (signalé par Raphaël : "un autre Claude avait mal compris
  // ce qu'il devait faire pour le choix du genre") : garçon/homme/fille/
  // femme vivaient auparavant dans TEXTES_PAR_DEFAUT/options.textes,
  // traités comme du chrome d'interface traduisible (repli anglais
  // "Boy"/"Man"/"Girl"/"Woman") — erreur de compréhension d'une session
  // précédente. Ce sont en réalité des MOTS DE VOCABULAIRE que l'élève
  // apprend (même principe que "oui"/"non" dans l'écran "Ça va ?", ou
  // que BANQUE_NOMS ci-dessus, toujours en français peu importe la
  // langue de l'élève) — jamais traduits, jamais de repli anglais.
  // Même raisonnement pour les répliques parlées par Keb/Bek plus bas :
  // ce sont des phrases du personnage, pas du texte d'interface.
  const VOCABULAIRE_GENRE = {
    garcon: 'Un garçon',
    homme: 'Un homme',
    fille: 'Une fille',
    femme: 'Une femme'
  };

  // {prenom} remplacé au moment de l'affichage par remplacerPrenom().
  const DIALOGUES_FIXES = {
    enchanteeBek: 'Enchantée, {prenom}\u00A0!',
    enchanteKeb: 'Enchanté, {prenom}.',
    continuonsBek: 'Continuons. Je suis une fille.',
    garconKeb: 'Moi, je suis un garçon.',
    etToiBek: 'Et toi\u00A0? Tu es\u2026'
  };

  function remplacerPrenom(texteBrut, prenom) {
    return texteBrut.replace('{prenom}', prenom);
  }

  // Icônes de genre (traits simples, cohérentes avec le style du site —
  // même famille que les icônes de sac-a-dos.js) — affichées sur chaque
  // case de iden-btn-nom pour indiquer si le prénom proposé est masculin
  // ou féminin, comme demandé par Raphaël.
  function iconeGenreMasculin() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="14" r="6"/><path d="M14.5 9.5 20 4"/><path d="M15 4h5v5"/></svg>';
  }
  function iconeGenreFeminin() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M8.5 19h7"/></svg>';
  }

  // ---------- Machine à étapes ----------
  //
  // demarrerSequenceIdentite(idConteneur, options, callbacks)
  //   options   = { textes: {...} } — tous les textes affichés, dans la
  //               langue de l'élève (voir liste des clés dans
  //               TEXTES_PAR_DEFAUT ci-dessous ; repli en anglais si
  //               une clé manque, même convention que exercices.js).
  //   callbacks = { onComplet({ prenom, genre, adulte }) }

  const TEXTES_PAR_DEFAUT = {
    introAltKeb: 'Keb introduces himself',
    introAltBek: 'Bek introduces himself',
    introAltQuestion: 'Bek asks: what is your name?',
    introIndiceTap: 'Tap to continue',
    labelChampNom: 'Type your name...',
    labelValider: 'OK',
    erreurVide: 'Please type your name.',
    erreurTropCourt: 'That name seems too short.',
    erreurTropLong: 'That name seems too long.',
    erreurCaracteresEtrangers: 'Please use French letters only.',
    erreurInapproprie: "That doesn't look like a real name — try again.",
    titreChoixRepli: "Let's pick a name for you, then!",
    titreSilhouettes: 'Which one is you?',
    // altEnchantes/altFille/altGarcon/altEtToi : texte alternatif
    // (accessibilité) pour les 4 nouvelles images de la séquence
    // "Enchanté(e) → Continuons..." — chrome d'interface descriptif,
    // pas du vocabulaire, donc traduisible normalement (repli anglais
    // ici, comme le reste de ce dictionnaire).
    altEnchantes: 'Keb and Bek say nice to meet you',
    altFille: 'Bek says: I am a girl',
    altGarcon: 'Keb says: I am a boy',
    altEtToi: 'Bek asks: and you, are you...',
    labelChangerNom: 'Change my name'
  };

  function texte(options, cle) {
    const t = (options && options.textes) || {};
    return (t[cle] !== undefined) ? t[cle] : TEXTES_PAR_DEFAUT[cle];
  }

  // ⚠️ CHEMINS NON CONFIRMÉS — Raphaël n'a pas encore précisé le dossier
  // où ces .webp vivront dans le dépôt une fois remis en place (livrés
  // sous ces noms, à la racine du zip fourni, sessions successives).
  // Repli ici : les noms de fichier tels quels, supposant qu'ils sont
  // placés à côté de la page hôte — à écraser via options.images =
  // { keb, bek, question, enchantes, fille, garcon, etToi } si le vrai
  // dossier diffère, même principe que options.textes ci-dessus.
  const IMAGES_PAR_DEFAUT = {
    keb: "index_bonomes_keb_bek_je-m'appelle-Keb_01.webp",
    bek: "index_bonomes_keb_bek_je-m'appelle-Bek_01.webp",
    question: 'index_bonomes_keb_bek_tu-t-appelles_01.webp',
    enchantes: 'index_bonomes_keb_bek_enchantes_01.webp',
    fille: 'index_bonomes_keb_bek_fille_01.webp',
    garcon: 'index_bonomes_keb_bek_garcon_01.webp',
    etToi: 'index_bonomes_keb_bek_et-toi_01.webp'
  };

  function image(options, cle) {
    const im = (options && options.images) || {};
    return (im[cle] !== undefined) ? im[cle] : IMAGES_PAR_DEFAUT[cle];
  }

  // vocabCle référence VOCABULAIRE_GENRE (toujours en français) — voir
  // note "🐛 CORRIGÉ" plus haut ; ce ne sont plus des clés vers
  // TEXTES_PAR_DEFAUT/options.textes.
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

    let compteurEchecs = 0;
    let prenomChoisi = null;

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

    // ---- Étape 0 : trio d'images d'intro (Keb → Bek → question) ----
    // Défilement MANUEL uniquement (tap/clic n'importe où sur la scène,
    // jamais de minuterie automatique) — voir note de tête de fichier.
    // Les 3 <img> sont superposées dans un seul conteneur en position
    // absolute ; une seule porte la classe .actif à la fois (transition
    // d'opacité en CSS), donc les personnages ne bougent jamais d'une
    // image à l'autre — seule l'image visible change, exactement comme
    // .cava-img/.cava-img.actif dans essai_cava_reactions_v3.
    function etapeIntroPersonnages() {
      conteneur.innerHTML = '';

      const scene = document.createElement('div');
      scene.className = 'iden-intro-personnages';
      scene.tabIndex = 0; // focusable/activable au clavier (Entrée/Espace)
      scene.setAttribute('role', 'button');

      const IMAGES_INTRO = [
        { cle: 'keb', altCle: 'introAltKeb' },
        { cle: 'bek', altCle: 'introAltBek' },
        { cle: 'question', altCle: 'introAltQuestion' }
      ];

      const elementsImg = IMAGES_INTRO.map(function (im, i) {
        const img = document.createElement('img');
        img.className = 'iden-intro-img' + (i === 0 ? ' actif' : '');
        img.src = image(options, im.cle);
        img.alt = texte(options, im.altCle);
        scene.appendChild(img);
        return img;
      });

      const chevron = document.createElement('span');
      chevron.className = 'iden-intro-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = '\u203A'; // ›
      scene.appendChild(chevron);

      conteneur.appendChild(scene);

      // Indice sous la scène — même rôle que .cava-note-ajout-sac dans
      // l'essai : explique le geste attendu sans dépendre uniquement du
      // chevron visuel (utile aussi pour un lecteur d'écran).
      const indice = document.createElement('div');
      indice.className = 'iden-intro-indice';
      indice.textContent = texte(options, 'introIndiceTap');
      conteneur.appendChild(indice);

      let indexActuel = 0;
      function avancer() {
        if (indexActuel >= elementsImg.length - 1) {
          etapeSaisieNom(); // tap sur la 3e image (la question) : place à la saisie du nom
          return;
        }
        elementsImg[indexActuel].classList.remove('actif');
        indexActuel++;
        elementsImg[indexActuel].classList.add('actif');
      }

      scene.addEventListener('click', avancer);
      scene.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avancer(); }
      });
    }

    // ---- Étape 1 : saisie libre du nom ----
    function etapeSaisieNom() {
      conteneur.innerHTML = '';

      const champ = document.createElement('input');
      champ.type = 'text';
      champ.className = 'iden-champ-nom';
      champ.placeholder = texte(options, 'labelChampNom');
      champ.autocomplete = 'off';
      champ.spellcheck = false;
      conteneur.appendChild(champ);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'iden-btn-valider';
      btn.textContent = texte(options, 'labelValider');
      conteneur.appendChild(btn);

      const erreurDiv = document.createElement('div');
      erreurDiv.className = 'iden-erreur';
      conteneur.appendChild(erreurDiv);

      function tenter() {
        const resultat = validerNom(champ.value);
        if (resultat.valide) {
          prenomChoisi = champ.value.trim();
          etapeSilhouettes(null); // aucun genre pré-rempli : 4 choix ouverts
          return;
        }
        compteurEchecs++;
        erreurDiv.textContent = messageErreur(resultat.raison);
        erreurDiv.classList.add('in');
        if (compteurEchecs >= 3) {
          etapeChoixNomRepli();
        }
      }

      btn.addEventListener('click', tenter);
      champ.addEventListener('keydown', function (e) { if (e.key === 'Enter') tenter(); });
      champ.focus();
    }

    // ---- Étape 1bis (après 3 échecs) : choix parmi 3 paires tirées au hasard ----
    function etapeChoixNomRepli() {
      conteneur.innerHTML = '';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'titreChoixRepli');
      conteneur.appendChild(titre);

      const grille = document.createElement('div');
      grille.className = 'iden-grille-noms';

      tirerTroisPaires().forEach(paire => {
        ['m', 'f'].forEach(genre => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'iden-btn-nom iden-btn-nom-' + genre;
          btn.textContent = paire[genre];
          btn.addEventListener('click', function () {
            prenomChoisi = paire[genre];
            etapeSilhouettes(genre); // genre pré-rempli depuis ce choix
          });
          grille.appendChild(btn);
        });
      });

      conteneur.appendChild(grille);
    }

    // ---- Étape 2 : silhouettes (genre + tranche d'âge) ----
    // genrePreRempli : null (chemin normal, 4 choix ouverts) ou 'm'/'f'
    // (chemin de repli, 2 silhouettes du genre opposé désactivées).
    function etapeSilhouettes(genrePreRempli) {
      conteneur.innerHTML = '';

      const titre = document.createElement('div');
      titre.className = 'iden-titre';
      titre.textContent = texte(options, 'titreSilhouettes');
      conteneur.appendChild(titre);

      const grille = document.createElement('div');
      grille.className = 'iden-grille-silhouettes';

      SILHOUETTES.forEach(s => {
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

      conteneur.appendChild(grille);

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
          etapeSaisieNom();
        });
        conteneur.appendChild(btnChanger);
      }
    }

    etapeIntroPersonnages();
  }

  return {
    demarrerSequenceIdentite,
    validerNom,          // exposé pour tests/débogage isolé
    tirerTroisPaires,     // idem
    BANQUE_NOMS
  };
})();

window.KebBekIdentite = KebBekIdentite;
