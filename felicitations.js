/* felicitations.js — 🆕 (retour Raphaël, 23-08-2026)
   Autocollans de félicitation plein écran, affichés quand l'élève réussit
   un exercice (QCM, déduction, prénom…) du premier ou du deuxième coup.
   Pensé pour être appelé depuis N'IMPORTE QUELLE leçon/dialogue — pas
   spécifique à lecon-01-rencontre.html — d'où son emplacement à la racine
   du site, aux côtés de progression.js / mot-tooltip.js.

   Utilisation depuis une leçon :
     window.KebBekFelicitations.feter({
       personnage: 'Bek' | 'Keb',   // le Bonome incarné par l'élève
       coup: 1 | 2,                 // 1 = du premier coup, 2 = du 2e coup
       genre: 'm' | 'f' | null      // genre de L'ÉLÈVE, si déjà connu
     });

   Ne fait RIEN (silencieusement) si personnage/coup sont absents ou
   invalides — best-effort, comme le reste des modules partagés du site.

   Convention de fichiers (voir images/felicitations/ dans le dépôt) :
     images/felicitations/premier/bravo_premier-coup_<Perso>_NN.webp
     images/felicitations/deuxieme/bravo_deuxième-coup_<Perso>_NN.webp
     images/felicitations/premier/bravo_premier-coup_<Perso>_exclusif-<g>_NN.webp
   NN toujours sur 2 chiffres (01, 02…). Les variantes "exclusif-m"/
   "exclusif-f" (félicitation adressée au genre de L'ÉLÈVE, pas du
   personnage) n'existent QUE pour le premier coup — confirmé par
   Raphaël : rien d'équivalent pour le deuxième coup. */
window.KebBekFelicitations = (function () {
  'use strict';

  const DOSSIER_BASE = '../images/felicitations/';

  // Combien d'images numérotées "standard" (non genrées) existent
  // actuellement pour chaque catégorie — à mettre à jour si de nouvelles
  // images sont ajoutées au dépôt (juste bumper le nombre ici, rien
  // d'autre à toucher).
  const PLAGE_STANDARD = { 1: 9, 2: 8 };

  // ⚠️ Faute de frappe RÉELLE et volontaire à préserver : les fichiers
  // "exclusif" de Keb sont nommés "Kek" dans le dépôt (pas "Keb"). Ne
  // JAMAIS "corriger" ceci, ça casserait le lien vers les vrais fichiers.
  const NOM_FICHIER_EXCLUSIF = { Bek: 'Bek', Keb: 'Kek' };

  // Numéros exacts des variantes genrées actuellement dans le dépôt
  // (irrégulier — pas de 01 à 09 propre comme le pool standard, d'où une
  // liste explicite plutôt qu'une simple plage). À compléter au fur et à
  // mesure que de nouvelles variantes sont ajoutées.
  const EXCLUSIF_PREMIER = {
    Bek: { f: [1, 2, 3], m: [] },
    Keb: { f: [1], m: [2, 3] }
  };

  function pad2(n) { return String(n).padStart(2, '0'); }

  function construirePool(personnage, coup, genre) {
    if ((personnage !== 'Bek' && personnage !== 'Keb') || (coup !== 1 && coup !== 2)) return [];
    const dossier = coup === 1 ? 'premier' : 'deuxieme';
    const motCoup = coup === 1 ? 'premier-coup' : 'deuxi\u00e8me-coup';
    const n = PLAGE_STANDARD[coup] || 0;
    const fichiers = [];
    for (let i = 1; i <= n; i++) {
      fichiers.push(dossier + '/bravo_' + motCoup + '_' + personnage + '_' + pad2(i) + '.webp');
    }
    if (coup === 1 && (genre === 'm' || genre === 'f')) {
      const nomExclusif = NOM_FICHIER_EXCLUSIF[personnage];
      const numeros = (EXCLUSIF_PREMIER[personnage] && EXCLUSIF_PREMIER[personnage][genre]) || [];
      numeros.forEach(function (i) {
        fichiers.push(dossier + '/bravo_' + motCoup + '_' + nomExclusif + '_exclusif-' + genre + '_' + pad2(i) + '.webp');
      });
    }
    return fichiers;
  }

  // Évite de montrer deux fois de suite exactement le même autocollant
  // pour un même (personnage, coup) — un seul nouveau tirage si ça
  // arrive, pas de mélange complexe nécessaire pour un pool de cette
  // taille.
  const dernierChoix = {};
  function tirer(pool, cle) {
    if (!pool.length) return null;
    let choix = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && choix === dernierChoix[cle]) {
      choix = pool[Math.floor(Math.random() * pool.length)];
    }
    dernierChoix[cle] = choix;
    return choix;
  }

  // ---- Affichage plein écran -------------------------------------------
  const DUREE_AFFICHAGE = 1900; // ms avant fermeture automatique
  let elOverlay = null;
  let minuteurFermeture = null;

  function assurerOverlay() {
    if (elOverlay) return elOverlay;
    elOverlay = document.createElement('div');
    elOverlay.className = 'felicitations-overlay';
    elOverlay.setAttribute('aria-hidden', 'true');
    elOverlay.innerHTML =
      '<div class="felicitations-rayons"></div>' +
      '<div class="felicitations-particules">' +
        Array.from({ length: 8 }).map(function () { return '<span></span>'; }).join('') +
      '</div>' +
      '<img class="felicitations-image" alt="">';
    document.body.appendChild(elOverlay);
    elOverlay.addEventListener('click', fermer);
    return elOverlay;
  }

  function fermer() {
    if (!elOverlay) return;
    clearTimeout(minuteurFermeture);
    elOverlay.classList.remove('felicitations-visible');
    elOverlay.classList.add('felicitations-fermeture');
  }

  function feter(opts) {
    opts = opts || {};
    const pool = construirePool(opts.personnage, opts.coup, opts.genre);
    const cle = opts.personnage + '-' + opts.coup;
    const chemin = tirer(pool, cle);
    if (!chemin) return; // best-effort : rien à montrer, on n'interrompt rien

    const overlay = assurerOverlay();
    const img = overlay.querySelector('.felicitations-image');
    img.src = DOSSIER_BASE + chemin;

    clearTimeout(minuteurFermeture);
    overlay.classList.remove('felicitations-fermeture');
    // force un reflow pour pouvoir rejouer l'animation même si l'overlay
    // est déjà visible (deux réussites très rapprochées)
    void overlay.offsetWidth;
    overlay.classList.add('felicitations-visible');
    minuteurFermeture = setTimeout(fermer, DUREE_AFFICHAGE);
  }

  return { feter: feter };
})();
