/* ==================================================================
   sequence-telechargement-langue.js — module autonome, même patron
   que les autres écrans : window.KebBekTelechargementLangue.
   demarrerSequenceTelechargementLangue(idConteneur, options, callbacks).

   🆕 (20-09-2026) Réécriture complète — l'ancienne version (un simple
   bouton "Télécharger" puis une barre, sur une page à part) ne
   correspondait pas à l'intention de Raphaël. Nouvelle mise en scène,
   en un seul écran continu :

     1. Bek (celle qui vient de flotter et d'atterrir à la fin de
        sequence-televersement.js) réapparaît en fond, À LA MÊME
        TAILLE — ce module rejoue l'image plutôt que de tenter de
        garder vivant le DOM interne de l'autre séquence (fragile,
        dépendrait de ses détails internes).
     2. Pause de 2 s, immobile — DELAI_AVANT_PANNEAU ci-dessous.
     3. Un panneau apparaît par-dessus : une LISTE DE FICHIERS de
        langues (les langues d'interface du site, transmises via
        options.langues — voir LANGUES dans index.html), français
        inclus, VISUELLEMENT IDENTIQUE aux autres (pas de bordure
        pointillée, pas d'opacité réduite — un fichier ne "a l'air"
        pas cassé tant qu'on n'a pas essayé de l'ouvrir).
     4. Clic sur une vraie langue → sélection visuelle + bouton
        "Téléversement" (traduit) apparaît au bas du MÊME panneau.
        Clic sur "français" → message bref "Fichier fragmenté ou
        introuvable" en surimpression sur le fichier, rien d'autre —
        jamais de sélection, jamais de navigation.
     5. Clic sur "Téléversement" → le panneau se retire, l'image de
        fond passe (fondu) de la pose "atterrie" à la pose "réception"
        (particules de lumière) — MÊME BOÎTE, donc même taille — avec
        la barre de progression (barre-progression.js) en dessous.
     6. À 100 % : le mot "Réinitialisation" (traduit), une pause, puis
        callbacks.onFin(codeLangueChoisie).

   Dépend de barre-progression.js (window.KebBekBarreProgression),
   chargé avant celui-ci.

   🚧 Dictionnaire réduit à fr/en pour l'instant, même remarque que les
   autres modules du jour — à étendre aux 19 langues du site avant
   mise en ligne. Sans traduction disponible, repli sur l'anglais.
   ================================================================== */

const DICO_TELECHARGEMENT_LANGUE = {
  fr: { bouton: 'Téléversement', reinitialisation: 'Réinitialisation', erreurFrancais: 'Fichier fragmenté ou introuvable' },
  en: { bouton: 'Upload', reinitialisation: 'Reset', erreurFrancais: 'File fragmented or not found' }
};

function tTelechargementLangue(codeLangue, cle) {
  const dico = DICO_TELECHARGEMENT_LANGUE[codeLangue] || DICO_TELECHARGEMENT_LANGUE.en;
  return dico[cle] || DICO_TELECHARGEMENT_LANGUE.en[cle];
}

/**
 * @param {string} idConteneur
 * @param {object} options
 *   - langues (requis) — tableau [{code, natif, fr}, ...] des langues
 *     d'interface du site (même forme que LANGUES dans index.html) ;
 *     ce module ajoute lui-même l'entrée "français" à la suite, elle
 *     ne doit PAS être incluse dans ce tableau.
 *   - imageAtterrissage (défaut 'images/telechargement/televersement_bek_06.webp')
 *     — Bek juste après avoir atterri (même image que la fin de
 *     sequence-televersement.js).
 *   - imageReception (défaut 'images/telechargement/televersement_bek_langue_01.webp')
 *     — Bek recevant la langue (particules de lumière), affichée à la
 *     MÊME taille que l'image d'atterrissage.
 *   - delaiAvantPanneau (ms, défaut 2000) — pause immobile avant que
 *     le panneau de fichiers apparaisse.
 *   - duree (ms, défaut 2600) — durée de la barre de progression.
 *   - pauseFin (ms, défaut 1400) — temps d'affichage de
 *     "Réinitialisation" avant onFin.
 * @param {object} callbacks
 *   - onFin(codeLangueChoisie) — appelé une fois la pause finale écoulée
 */
function demarrerSequenceTelechargementLangue(idConteneur, options, callbacks) {
  options = options || {};
  callbacks = callbacks || {};

  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return;
  if (!window.KebBekBarreProgression) {
    console.warn('sequence-telechargement-langue : barre-progression.js doit être chargé avant.');
  }

  const langues = Array.isArray(options.langues) ? options.langues : [];
  const imageAtterrissage = typeof options.imageAtterrissage === 'string'
    ? options.imageAtterrissage : 'images/telechargement/televersement_bek_06.webp';
  const imageReception = typeof options.imageReception === 'string'
    ? options.imageReception : 'images/telechargement/televersement_bek_langue_01.webp';
  const delaiAvantPanneau = typeof options.delaiAvantPanneau === 'number' ? options.delaiAvantPanneau : 2000;
  const duree = typeof options.duree === 'number' ? options.duree : 2600;
  const pauseFin = typeof options.pauseFin === 'number' ? options.pauseFin : 1400;

  conteneur.innerHTML =
    '<div class="stlg-scene" id="stlgScene">' +
      '<div class="stlg-fond-bek">' +
        '<img class="stlg-image-bek stlg-image-atterrissage" id="stlgImgAtterrissage" src="' + imageAtterrissage + '" alt="Bek">' +
        '<img class="stlg-image-bek stlg-image-reception" id="stlgImgReception" src="' + imageReception + '" alt="Bek">' +
      '</div>' +
      '<div class="stlg-panneau stlg-panneau-cachee" id="stlgPanneau">' +
        '<div class="stlg-grille" id="stlgGrille"></div>' +
        '<div class="stlg-zone-bouton" id="stlgZoneBouton"></div>' +
      '</div>' +
      '<div class="stlg-zone-barre" id="stlgZoneBarre" hidden></div>' +
    '</div>';

  const scene = document.getElementById('stlgScene');
  const panneau = document.getElementById('stlgPanneau');
  const grille = document.getElementById('stlgGrille');
  const zoneBouton = document.getElementById('stlgZoneBouton');
  const zoneBarre = document.getElementById('stlgZoneBarre');
  const imgReception = document.getElementById('stlgImgReception');

  // ---------- 1-2. Bek atterrie, seule, pendant delaiAvantPanneau ----------
  let codeLangueChoisie = null;

  function creerFichierLangue(langue) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'stlg-fichier';
    el.dataset.code = langue.code;
    el.innerHTML =
      '<span class="stlg-fichier-badge" aria-hidden="true">' + langue.code.toUpperCase() + '</span>' +
      '<span class="stlg-fichier-natif">' + langue.natif + '</span>';
    el.addEventListener('click', function () { choisirFichier(langue.code, el); });
    return el;
  }

  function creerFichierFrancais() {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'stlg-fichier';
    el.dataset.code = 'fr';
    el.innerHTML =
      '<span class="stlg-fichier-badge" aria-hidden="true">FR</span>' +
      '<span class="stlg-fichier-natif">Français</span>' +
      '<span class="stlg-fichier-erreur" aria-live="polite">' + tTelechargementLangue('fr', 'erreurFrancais') + '</span>';
    el.addEventListener('click', function () {
      if (el.classList.contains('stlg-fichier-erreur-active')) return;
      el.classList.add('stlg-fichier-erreur-active');
      setTimeout(function () { el.classList.remove('stlg-fichier-erreur-active'); }, 2200);
    });
    return el;
  }

  langues.forEach(function (l) { grille.appendChild(creerFichierLangue(l)); });
  grille.appendChild(creerFichierFrancais());

  function choisirFichier(codeLangue, elFichier) {
    codeLangueChoisie = codeLangue;
    grille.querySelectorAll('.stlg-fichier').forEach(function (el) {
      el.classList.toggle('stlg-fichier-selectionne', el === elFichier);
    });
    afficherBoutonTeleversement(codeLangue);
  }

  function afficherBoutonTeleversement(codeLangue) {
    zoneBouton.innerHTML =
      '<button type="button" class="stlg-bloc stlg-entree-cachee stlg-bouton-televerser" id="stlgBtnTeleverser">' +
        tTelechargementLangue(codeLangue, 'bouton') +
      '</button>';
    requestAnimationFrame(function () {
      const btn = document.getElementById('stlgBtnTeleverser');
      if (btn) {
        setTimeout(function () { btn.classList.remove('stlg-entree-cachee'); }, 30);
        btn.addEventListener('click', function () { lancerTeleversement(codeLangue); });
      }
    });
  }

  // ---------- 5-6. Panneau retiré, image de réception + barre + Réinitialisation ----------
  function lancerTeleversement(codeLangue) {
    panneau.classList.add('stlg-panneau-cachee');
    setTimeout(function () {
      panneau.hidden = true;
      scene.classList.add('stlg-reception');
      zoneBarre.hidden = false;

      if (!window.KebBekBarreProgression) {
        setTimeout(terminerAvecReinitialisation, duree);
        return;
      }
      window.KebBekBarreProgression.demarrerBarreProgression('stlgZoneBarre', { cible: 100, duree: duree }, {
        onFin: terminerAvecReinitialisation
      });

      function terminerAvecReinitialisation() {
        zoneBarre.innerHTML = '<span class="stlg-bloc" style="font-weight:700; color:#FFF5E8;">' +
          tTelechargementLangue(codeLangue, 'reinitialisation') +
        '</span>';
        setTimeout(function () {
          if (typeof callbacks.onFin === 'function') callbacks.onFin(codeLangue);
        }, pauseFin);
      }
    }, 360); // doit correspondre à la transition CSS de .stlg-panneau
  }

  // ---------- Démarrage : préchargement des deux images, puis pause, puis panneau ----------
  function precharger(src) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = resolve;
      img.onerror = function () { console.warn('sequence-telechargement-langue : image introuvable →', src); resolve(); };
      img.src = src;
    });
  }
  Promise.all([precharger(imageAtterrissage), precharger(imageReception)]).then(function () {
    scene.classList.add('stlg-prete');
    setTimeout(function () {
      panneau.hidden = false;
      requestAnimationFrame(function () { panneau.classList.remove('stlg-panneau-cachee'); });
    }, delaiAvantPanneau);
  });
}

window.KebBekTelechargementLangue = { demarrerSequenceTelechargementLangue };
