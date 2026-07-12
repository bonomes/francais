/* ==================================================================
   exercices.js — moteur de questions PARTAGÉ (comme sac-a-dos.js/.css
   ou nationalites.js) : un seul endroit à corriger pour toutes les
   leçons futures sous lecons/, au lieu de recoder la logique de chaque
   type de question dans chaque fichier de leçon.

   Étape 2/4 de l'ordre de construction convenu en v47/v49 (voir
   BONOMES.md) : nationalites.js → exercices.js (ici) → progression.js
   /SQL → HTML de la Leçon 1.

   ⚠️ HYPOTHÈSES POSÉES CETTE SESSION, À CONFIRMER — aucune leçon réelle
   n'existe encore pour valider ces choix contre un vrai gabarit HTML :
   - Palette/typo réutilisées telles quelles depuis le reste du site
     (--fond/--brun/--peche/--peche-fonce, Baloo 2 / Fuzzy Bubbles),
     comme sac-a-dos.css. Pas encore vu contre un vrai fond de leçon.
   - `texte_a_trous` compare la réponse texte/lowercase/espaces
     normalisés, mais PAS accent-insensible par défaut (site très
     strict sur l'orthographe française réelle — voir principe
     anti-anglicisme/rigueur déjà en place). Réglable via
     `toleranceAccents: true` sur la définition si un mot précis en a
     besoin, mais rien ne l'active par défaut.
   - `qcm` ne gère qu'UNE bonne réponse (`correct: index`). Pas de
     support multi-réponses pour l'instant — à étendre si un jour un
     type de question en a besoin.
   - Pas de limite de tentatives : "réessayer" est toujours proposé
     après une mauvaise réponse, sans compteur ni pénalité. À
     confirmer si Raphaël veut un système de vies/tentatives limitées
     plus tard (pas mentionné à ce jour).
   - `choix_identite` suppose que `nationalites.js` est chargé AVANT ce
     fichier (dépendance sur `window.KebBekNationalites`) — comme
     `sac-a-dos.js` suppose la présence du HTML #sacBouton etc.

   API exposée (`window.KebBekExercices`) :
   - `rendreExercice(idConteneur, def, callbacks)` — point d'entrée
     unique, envoie vers le bon type. `callbacks` = { onReussite,
     onEchec } (onEchec optionnel), tous deux appelés avec la réponse
     donnée par l'élève (forme variable selon le type, voir chaque
     fonction ci-dessous).
   ================================================================== */

const KebBekExercices = (function () {

  // ---------- Utilitaires communs à tous les types ----------

  function normaliserTexte(txt) {
    return String(txt).trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function retirerAccents(txt) {
    return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function comparerReponseTexte(reponseElve, reponseAttendue, toleranceAccents) {
    let a = normaliserTexte(reponseElve);
    let b = normaliserTexte(reponseAttendue);
    if (toleranceAccents) { a = retirerAccents(a); b = retirerAccents(b); }
    return a === b;
  }

  // Bloc de feedback commun (✓/✗ + bouton "réessayer" si incorrect).
  // `onReessayer` reçoit la fonction à appeler pour effacer le feedback
  // et remettre l'exercice dans un état où l'élève peut retenter —
  // chaque type gère lui-même comment il se remet à zéro (déselectionner
  // un bouton QCM, vider un champ texte, etc.), ce fichier ne connaît
  // pas ce détail.
  // Tous les textes de repli codés en dur ici sont volontairement en
  // ANGLAIS (pas en français) — même convention que sac-a-dos.js
  // (nomParDefaut, valeur `defaut` de tSacOuDefaut) : l'anglais est le
  // repli de dernier recours au niveau code, jamais ce que l'élève voit
  // en pratique. Chaque futur appel réel de rendreExercice() doit fournir
  // ses propres textes (texteCorrect/texteIncorrect/texteReessayer/
  // texteValider/etc.) dans la langue de l'apprenant — exactement comme
  // parcours.html construit ses propres chaînes via t() avant de les
  // passer à un composant partagé.
  function afficherFeedback(conteneur, correct, options) {
    options = options || {};
    let ancien = conteneur.querySelector('.ex-feedback');
    if (ancien) ancien.remove();

    const div = document.createElement('div');
    div.className = 'ex-feedback ' + (correct ? 'ex-correct' : 'ex-incorrect');
    div.innerHTML =
      '<span class="ex-feedback-icone">' + (correct ? '✓' : '✗') + '</span>' +
      '<span class="ex-feedback-texte">' +
        (correct
          ? (options.texteCorrect || 'Correct!')
          : (options.texteIncorrect || 'Not quite — try again!')) +
      '</span>';

    if (!correct) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ex-btn-reessayer';
      btn.textContent = options.texteReessayer || 'Try again';
      btn.addEventListener('click', function () {
        div.remove();
        if (typeof options.onReessayer === 'function') options.onReessayer();
      });
      div.appendChild(btn);
    }

    conteneur.appendChild(div);
    requestAnimationFrame(() => requestAnimationFrame(() => div.classList.add('in')));
    return div;
  }

  // ---------- Type 1 : qcm (choix multiple, une seule bonne réponse) ----------
  // def = { type:'qcm', question, choix: [texte, ...], correct: index }
  function rendreQCM(conteneur, def, callbacks) {
    function dessiner() {
      conteneur.innerHTML = '';
      const q = document.createElement('div');
      q.className = 'ex-question';
      q.textContent = def.question;
      conteneur.appendChild(q);

      const liste = document.createElement('div');
      liste.className = 'ex-qcm-choix';
      def.choix.forEach((texteChoix, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ex-qcm-bouton';
        btn.textContent = texteChoix;
        btn.addEventListener('click', function () {
          liste.querySelectorAll('.ex-qcm-bouton').forEach(b => b.disabled = true);
          const correct = (i === def.correct);
          btn.classList.add(correct ? 'ex-choix-correct' : 'ex-choix-incorrect');
          if (!correct) {
            liste.children[def.correct].classList.add('ex-choix-correct');
          }
          afficherFeedback(conteneur, correct, {
            texteCorrect: def.texteCorrect,
            texteIncorrect: def.texteIncorrect,
            onReessayer: dessiner
          });
          if (correct && typeof callbacks.onReussite === 'function') callbacks.onReussite(i);
          if (!correct && typeof callbacks.onEchec === 'function') callbacks.onEchec(i);
        });
        liste.appendChild(btn);
      });
      conteneur.appendChild(liste);
    }
    dessiner();
  }

  // ---------- Type 2 : texte_a_trous (réponse tapée au clavier) ----------
  // def = { type:'texte_a_trous', avant, apres, reponse, toleranceAccents }
  // "avant"/"apres" encadrent le champ texte (ex. avant:"Je ___", apres:"le français.")
  function rendreTexteATrous(conteneur, def, callbacks) {
    function dessiner() {
      conteneur.innerHTML = '';
      const ligne = document.createElement('div');
      ligne.className = 'ex-texte-a-trous';

      if (def.avant) {
        const spanAvant = document.createElement('span');
        spanAvant.textContent = def.avant;
        ligne.appendChild(spanAvant);
      }

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'ex-trou-champ';
      input.autocomplete = 'off';
      input.autocapitalize = 'off';
      input.spellcheck = false;
      ligne.appendChild(input);

      if (def.apres) {
        const spanApres = document.createElement('span');
        spanApres.textContent = def.apres;
        ligne.appendChild(spanApres);
      }

      conteneur.appendChild(ligne);

      const btnValider = document.createElement('button');
      btnValider.type = 'button';
      btnValider.className = 'ex-btn-valider';
      btnValider.textContent = def.texteValider || 'Check';
      conteneur.appendChild(btnValider);

      function valider() {
        const correct = comparerReponseTexte(input.value, def.reponse, !!def.toleranceAccents);
        input.disabled = true;
        btnValider.disabled = true;
        input.classList.add(correct ? 'ex-choix-correct' : 'ex-choix-incorrect');
        afficherFeedback(conteneur, correct, {
          texteCorrect: def.texteCorrect,
          texteIncorrect: def.texteIncorrect || (def.reponse ? 'The correct answer was “' + def.reponse + '”.' : undefined),
          onReessayer: dessiner
        });
        if (correct && typeof callbacks.onReussite === 'function') callbacks.onReussite(input.value);
        if (!correct && typeof callbacks.onEchec === 'function') callbacks.onEchec(input.value);
      }

      btnValider.addEventListener('click', valider);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') valider(); });
      input.focus();
    }
    dessiner();
  }

  // ---------- Type 3 : ordre_mots (remettre des mots dans l'ordre) ----------
  // def = { type:'ordre_mots', mots: [...ordre correct...] }
  // Les mots sont mélangés à l'affichage ; l'élève clique dans l'ordre
  // pour reconstruire la phrase ; un mot cliqué dans la zone réponse est
  // cliquable pour revenir dans la banque de mots.
  function rendreOrdreMots(conteneur, def, callbacks) {
    function melanger(tableau) {
      const copie = tableau.slice();
      for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
      }
      return copie;
    }

    function dessiner() {
      conteneur.innerHTML = '';
      const reponse = [];
      const banqueOrdre = melanger(def.mots.map((mot, i) => ({ mot, id: i })));

      const zoneReponse = document.createElement('div');
      zoneReponse.className = 'ex-ordre-reponse';
      const zoneBanque = document.createElement('div');
      zoneBanque.className = 'ex-ordre-banque';

      function rendreMotBanque(item) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ex-mot-chip';
        chip.textContent = item.mot;
        chip.addEventListener('click', function () {
          chip.remove();
          reponse.push(item);
          rendreMotReponse(item);
        });
        zoneBanque.appendChild(chip);
      }

      function rendreMotReponse(item) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ex-mot-chip ex-mot-chip-place';
        chip.textContent = item.mot;
        chip.addEventListener('click', function () {
          chip.remove();
          const idx = reponse.indexOf(item);
          if (idx !== -1) reponse.splice(idx, 1);
          rendreMotBanque(item);
        });
        zoneReponse.appendChild(chip);
      }

      banqueOrdre.forEach(rendreMotBanque);
      conteneur.appendChild(zoneReponse);
      conteneur.appendChild(zoneBanque);

      const btnValider = document.createElement('button');
      btnValider.type = 'button';
      btnValider.className = 'ex-btn-valider';
      btnValider.textContent = def.texteValider || 'Check';
      btnValider.addEventListener('click', function () {
        const ordreDonne = reponse.map(item => item.mot);
        const correct = ordreDonne.length === def.mots.length &&
          ordreDonne.every((mot, i) => mot === def.mots[i]);
        conteneur.querySelectorAll('.ex-mot-chip').forEach(c => c.disabled = true);
        btnValider.disabled = true;
        afficherFeedback(conteneur, correct, {
          texteCorrect: def.texteCorrect,
          texteIncorrect: def.texteIncorrect,
          onReessayer: dessiner
        });
        if (correct && typeof callbacks.onReussite === 'function') callbacks.onReussite(ordreDonne);
        if (!correct && typeof callbacks.onEchec === 'function') callbacks.onEchec(ordreDonne);
      });
      conteneur.appendChild(btnValider);
    }
    dessiner();
  }

  // ---------- Type 4 : choix_identite (genre puis nationalité) ----------
  // def = { type:'choix_identite', langueInterface }
  // Consomme window.KebBekNationalites (nationalites.js doit être chargé
  // avant ce fichier). Deux étapes séquentielles dans le même conteneur :
  // 1. bouton Keb ou bouton Bek → détermine le genre grammatical ('m'/'f')
  // 2. liste de pays priorisée selon langueInterface + bouton "Autre"
  //    (recherche texte parmi tous les pays connus d'Intl.DisplayNames,
  //    filtrage sur le nom localisé)
  // callbacks.onReussite reçoit { genre, nationalite } au final — pas de
  // notion d'échec pour ce type (il n'y a pas de "mauvaise réponse" à
  // choisir son propre genre/nationalité).
  function rendreChoixIdentite(conteneur, def, callbacks) {
    if (!window.KebBekNationalites) {
      console.warn('choix_identite : nationalites.js doit être chargé avant exercices.js.');
      conteneur.textContent = '⚠️ nationalites.js manquant.';
      return;
    }
    const API = window.KebBekNationalites;
    let genreChoisi = null;

    function etapeGenre() {
      conteneur.innerHTML = '';
      const q = document.createElement('div');
      q.className = 'ex-question';
      q.textContent = def.texteQuestionGenre || 'Je suis...';
      conteneur.appendChild(q);

      const zone = document.createElement('div');
      zone.className = 'ex-identite-genre';
      ['bek', 'keb'].forEach(perso => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ex-identite-bouton ex-identite-' + perso;
        btn.textContent = perso === 'bek' ? 'Bek' : 'Keb';
        btn.addEventListener('click', function () {
          genreChoisi = (perso === 'bek') ? 'f' : 'm';
          etapeNationalite();
        });
        zone.appendChild(btn);
      });
      conteneur.appendChild(zone);
    }

    function etapeNationalite() {
      conteneur.innerHTML = '';
      const q = document.createElement('div');
      q.className = 'ex-question';
      q.textContent = def.texteQuestionNationalite || 'Je suis...';
      conteneur.appendChild(q);

      const liste = document.createElement('div');
      liste.className = 'ex-identite-pays';
      const pays = API.paysPrioritaires(def.langueInterface);

      function choisir(code) {
        conteneur.innerHTML = '';
        if (typeof callbacks.onReussite === 'function') {
          callbacks.onReussite({ genre: genreChoisi, nationalite: code });
        }
      }

      pays.forEach(p => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ex-identite-pays-bouton';
        btn.textContent = p.nom;
        btn.addEventListener('click', function () { choisir(p.code); });
        liste.appendChild(btn);
      });

      const btnAutre = document.createElement('button');
      btnAutre.type = 'button';
      btnAutre.className = 'ex-identite-pays-bouton ex-identite-autre';
      btnAutre.textContent = def.texteAutre || 'Other...';
      btnAutre.addEventListener('click', function () {
        rechercheAutre();
      });
      liste.appendChild(btnAutre);

      conteneur.appendChild(liste);

      // Recherche "Autre" : filtre tous les codes région connus d'Intl
      // par nom localisé — pas limité aux pays déjà dans NATIONALITES,
      // conformément à la conception de nationalites.js (formuleIdentiteFR
      // retombe sur "Je viens de [pays]" pour un code hors table).
      function rechercheAutre() {
        conteneur.innerHTML = '';
        const champ = document.createElement('input');
        champ.type = 'text';
        champ.className = 'ex-trou-champ';
        champ.placeholder = def.placeholderRecherche || 'Type a country name...';
        conteneur.appendChild(champ);

        const resultats = document.createElement('div');
        resultats.className = 'ex-identite-pays';
        conteneur.appendChild(resultats);

        // Région ISO 3166-1 alpha-2 connues (liste figée, pas dépendante
        // du réseau) — Intl.supportedValuesOf existe depuis peu, avec
        // repli si absent dans l'environnement d'exécution.
        let tousCodes = [];
        try {
          tousCodes = Intl.supportedValuesOf('region').filter(c => /^[A-Z]{2}$/.test(c));
        } catch (e) {
          tousCodes = Object.keys(API.NATIONALITES); // repli minimal
        }

        champ.addEventListener('input', function () {
          const requete = normaliserTexte(champ.value);
          resultats.innerHTML = '';
          if (requete.length < 2) return;
          tousCodes
            .map(code => ({ code, nom: API.nomPays(code, def.langueInterface) }))
            .filter(p => normaliserTexte(p.nom).includes(requete))
            .slice(0, 8)
            .forEach(p => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'ex-identite-pays-bouton';
              btn.textContent = p.nom;
              btn.addEventListener('click', function () { choisir(p.code); });
              resultats.appendChild(btn);
            });
        });
        champ.focus();
      }
    }

    etapeGenre();
  }

  // ---------- Point d'entrée unique ----------
  function rendreExercice(idConteneur, def, callbacks) {
    const conteneur = document.getElementById(idConteneur);
    callbacks = callbacks || {};
    if (!conteneur) {
      console.warn('rendreExercice : conteneur #' + idConteneur + ' introuvable.');
      return;
    }
    conteneur.classList.add('ex-conteneur');
    switch (def.type) {
      case 'qcm': rendreQCM(conteneur, def, callbacks); break;
      case 'texte_a_trous': rendreTexteATrous(conteneur, def, callbacks); break;
      case 'ordre_mots': rendreOrdreMots(conteneur, def, callbacks); break;
      case 'choix_identite': rendreChoixIdentite(conteneur, def, callbacks); break;
      default:
        console.warn('rendreExercice : type d\'exercice inconnu :', def.type);
        conteneur.textContent = '⚠️ Type d\'exercice inconnu : ' + def.type;
    }
  }

  return { rendreExercice };
})();

window.KebBekExercices = KebBekExercices;
