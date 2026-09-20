/* ==================================================================
   ecran-televersement.js — écran suivant "Commencer" (ecran-demarrage.js).
   Même patron d'architecture : window.KebBekEcranTeleversement.
   demarrerEcranTeleversement(idConteneur, options, callbacks).

   🚧 Note : exposé sous KebBekEcranTeleversement (et non KebBekTeleversement)
   pour éviter une collision avec sequence-televersement.js, qui utilise
   déjà ce nom pour demarrerSequenceTeleversement.

   L'élève choisit par quel personnage téléverser sa réalité — Keb ou
   Bek. "Annuler" ramène simplement à l'écran précédent (callback,
   ce module ne navigue jamais lui-même).

   🚧 Dictionnaire réduit à fr/en, même remarque que ecran-demarrage.js
   — à étendre aux 19 langues de DICO_MENU avant mise en ligne.
   ================================================================== */

const CLE_LANGUE_TELEVERSEMENT = 'kebbek_langue'; // même clé partagée que les autres modules
// 🆕 (20-09-2026) Défaut fr, même raisonnement que ecran-demarrage.js : cet
// écran se joue avant le choix de langue.
function langueActuelleTeleversement() {
  try { return localStorage.getItem(CLE_LANGUE_TELEVERSEMENT) || 'fr'; }
  catch (e) { return 'fr'; }
}

const DICO_TELEVERSEMENT = {
  fr: {
    titre: 'Téléversement',
    keb: 'Keb',
    bek: 'Bek',
    annuler: 'Annuler'
  },
  en: {
    titre: 'Uploading',
    keb: 'Keb',
    bek: 'Bek',
    annuler: 'Cancel'
  }
};

function tTeleversementOuDefaut(cle, defaut) {
  const langue = langueActuelleTeleversement();
  const dico = DICO_TELEVERSEMENT[langue] || DICO_TELEVERSEMENT.en;
  return (dico && dico[cle]) || defaut;
}

// Illustrations fournies par Raphaël (remplacent les anciennes icônes SVG
// dessinées à la main) — voir images/symboles/ pour les fichiers sources.

/**
 * Rend l'écran de choix de personnage (téléversement) dans le conteneur donné.
 * @param {string} idConteneur
 * @param {object} options - réservé pour usage futur
 * @param {object} callbacks
 *   - onChoisirKeb()
 *   - onChoisirBek()
 *   - onAnnuler() — retour à l'écran précédent, géré par la page hôte
 */
function demarrerEcranTeleversement(idConteneur, options, callbacks) {
  callbacks = callbacks || {};
  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return;

  conteneur.innerHTML =
    '<div id="ecranTeleversement">' +
      '<div class="telv-carte">' +

        '<span class="telv-bloc telv-entree-cachee telv-titre">' +
          tTeleversementOuDefaut('titre', 'Uploading') +
        '</span>' +

        '<div class="telv-bloc telv-entree-cachee telv-choix">' +
          '<button type="button" class="telv-bouton-perso" id="telvBtnKeb">' +
            '<span class="telv-icone-chip-perso"><img src="images/accueil/symbole-garçon01.webp" alt=""></span>' +
            '<span>' + tTeleversementOuDefaut('keb', 'Keb') + '</span>' +
          '</button>' +
          '<button type="button" class="telv-bouton-perso" id="telvBtnBek">' +
            '<span class="telv-icone-chip-perso"><img src="images/accueil/symbole-fille01.webp" alt=""></span>' +
            '<span>' + tTeleversementOuDefaut('bek', 'Bek') + '</span>' +
          '</button>' +
        '</div>' +

        '<button type="button" class="telv-bloc telv-entree-cachee telv-annuler" id="telvBtnAnnuler">' +
          tTeleversementOuDefaut('annuler', 'Cancel') +
        '</button>' +

      '</div>' +
    '</div>';

  // ---------- Entrée en cascade (même patron que les autres écrans) ----------
  const entrees = conteneur.querySelectorAll('.telv-entree-cachee');
  entrees.forEach((el, i) => {
    setTimeout(() => el.classList.remove('telv-entree-cachee'), 90 + i * 90);
  });

  const btnKeb = document.getElementById('telvBtnKeb');
  const btnBek = document.getElementById('telvBtnBek');
  const btnAnnuler = document.getElementById('telvBtnAnnuler');

  if (btnKeb && typeof callbacks.onChoisirKeb === 'function') {
    btnKeb.addEventListener('click', callbacks.onChoisirKeb);
  }
  if (btnBek && typeof callbacks.onChoisirBek === 'function') {
    btnBek.addEventListener('click', callbacks.onChoisirBek);
  }
  if (btnAnnuler && typeof callbacks.onAnnuler === 'function') {
    btnAnnuler.addEventListener('click', callbacks.onAnnuler);
  }
}

window.KebBekEcranTeleversement = { demarrerEcranTeleversement };
