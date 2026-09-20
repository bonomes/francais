/* ==================================================================
   sequence-telechargement-langue.js — module autonome, même patron
   que les autres écrans : window.KebBekTelechargementLangue.
   demarrerSequenceTelechargementLangue(idConteneur, options, callbacks).

   Dépend de barre-progression.js (window.KebBekBarreProgression),
   chargé avant celui-ci.

   Déroulement :
     1. Un bouton "Download" apparaît, déjà traduit dans la langue que
        l'élève vient de choisir — la preuve elle-même que le choix a
        pris, sans avoir besoin de le dire.
     2. Au clic, le bouton disparaît et une barre de progression
        générique anime l'insertion (aucun mot visible pendant la
        montée — juste le mouvement, comme demandé).
     3. Une fois à 100 %, le mot "Réinitialisation" apparaît, traduit
        dans la même langue — le même mot que celui affiché lors de
        l'échec du téléversement de Bek/Keb (voir sequence-televersement.js,
        legendeErreur), jamais expliqué comme tel ici.
     4. callbacks.onFin() après une courte pause.

   🚧 Dictionnaire réduit à fr/en pour l'instant, même remarque que les
   autres modules du jour — à étendre aux 19 langues du site avant
   mise en ligne. Sans traduction disponible pour options.codeLangue,
   se replie sur l'anglais plutôt que d'afficher une clé manquante.
   ================================================================== */

const DICO_TELECHARGEMENT_LANGUE = {
  fr: { bouton: 'Télécharger', reinitialisation: 'Réinitialisation' },
  en: { bouton: 'Download', reinitialisation: 'Reset' }
};

function tTelechargementLangue(codeLangue, cle) {
  const dico = DICO_TELECHARGEMENT_LANGUE[codeLangue] || DICO_TELECHARGEMENT_LANGUE.en;
  return dico[cle] || DICO_TELECHARGEMENT_LANGUE.en[cle];
}

/**
 * @param {string} idConteneur
 * @param {object} options
 *   - codeLangue (requis) — code de la langue tout juste choisie par
 *     l'élève; détermine la traduction du bouton et du mot final
 *   - duree (ms, défaut 2600) — durée de la barre de progression
 *   - pauseFin (ms, défaut 1400) — temps laissé à l'affichage de
 *     "Réinitialisation" avant onFin
 * @param {object} callbacks
 *   - onDebut() — appelé au clic sur le bouton, avant que la barre démarre
 *   - onFin() — appelé une fois la pause finale écoulée
 */
function demarrerSequenceTelechargementLangue(idConteneur, options, callbacks) {
  options = options || {};
  callbacks = callbacks || {};

  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return;
  if (!window.KebBekBarreProgression) {
    console.warn('sequence-telechargement-langue : barre-progression.js doit être chargé avant.');
  }

  const codeLangue = options.codeLangue || 'en';
  const duree = typeof options.duree === 'number' ? options.duree : 2600;
  const pauseFin = typeof options.pauseFin === 'number' ? options.pauseFin : 1400;

  conteneur.innerHTML =
    '<div id="stlgScene">' +
      '<button type="button" class="stlg-bloc stlg-entree-cachee stlg-bouton-telecharger" id="stlgBtnTelecharger">' +
        tTelechargementLangue(codeLangue, 'bouton') +
      '</button>' +
      '<div id="stlgZoneBarre"></div>' +
    '</div>';

  const entrees = conteneur.querySelectorAll('.stlg-entree-cachee');
  entrees.forEach(function (el, i) {
    setTimeout(function () { el.classList.remove('stlg-entree-cachee'); }, 90 + i * 90);
  });

  const btn = document.getElementById('stlgBtnTelecharger');
  btn.addEventListener('click', function () {
    btn.classList.add('stlg-masque');
    if (typeof callbacks.onDebut === 'function') callbacks.onDebut();

    if (!window.KebBekBarreProgression) {
      // Repli sans la barre : on passe directement à la fin après la durée prévue.
      setTimeout(function () {
        if (typeof callbacks.onFin === 'function') callbacks.onFin();
      }, duree + pauseFin);
      return;
    }

    window.KebBekBarreProgression.demarrerBarreProgression('stlgZoneBarre', { cible: 100, duree: duree }, {
      onFin: function () {
        const zone = document.getElementById('stlgZoneBarre');
        if (zone) {
          zone.innerHTML = '<span class="stlg-bloc" style="font-weight:700; color:var(--brun-fonce, var(--brun));">' +
            tTelechargementLangue(codeLangue, 'reinitialisation') +
          '</span>';
        }
        setTimeout(function () {
          if (typeof callbacks.onFin === 'function') callbacks.onFin();
        }, pauseFin);
      }
    });
  });
}

window.KebBekTelechargementLangue = { demarrerSequenceTelechargementLangue };
