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

   Déroulé complet, tel que décidé :
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

  // ---------- Machine à étapes ----------
  //
  // demarrerSequenceIdentite(idConteneur, options, callbacks)
  //   options   = { textes: {...} } — tous les textes affichés, dans la
  //               langue de l'élève (voir liste des clés dans
  //               TEXTES_PAR_DEFAUT ci-dessous ; repli en anglais si
  //               une clé manque, même convention que exercices.js).
  //   callbacks = { onComplet({ prenom, genre, adulte }) }

  const TEXTES_PAR_DEFAUT = {
    labelChampNom: 'Type your name...',
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

    etapeSaisieNom();
  }

  return {
    demarrerSequenceIdentite,
    validerNom,          // exposé pour tests/débogage isolé
    tirerTroisPaires,     // idem
    BANQUE_NOMS
  };
})();

window.KebBekIdentite = KebBekIdentite;
