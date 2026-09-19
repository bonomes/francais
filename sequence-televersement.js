/* ==================================================================
   sequence-televersement.js — module autonome, même patron que les
   autres écrans : window.KebBekTeleversement.demarrerSequenceTeleversement
   (idConteneur, options, callbacks).

   Dépend de barre-progression.js (window.KebBekProgression), chargé
   avant celui-ci.

   Déroulement :
     1. La barre monte ; à mesure qu'elle avance, Bek se précise
        (images 01 → 02 → 03 → 04, fondu enchaîné).
     2. À un seuil (91 % par défaut), la barre est coupée net : l'éclair
        (image 05) apparaît avec un éclat lumineux, une onde et une
        légère secousse.
     3. Assombrissement complet, puis une courte pause dans le noir.
     4. Une ouverture circulaire de lumière révèle la Bek aux cheveux
        bruns (image 06) qui descend en flottant, se balance, puis
        « atterrit » (petit écrasement + rebond + ombre au sol).

   Les durées sont regroupées dans DUREES ci-dessous et transmises au
   CSS par des variables : un seul endroit à modifier.
   ================================================================== */

/**
 * @param {string} idConteneur
 * @param {object} options
 *   - dossierImages (défaut 'images/') — dossier des six images
 *   - fichiers (défaut : les six noms televersement_bek_0X.*) — tableau
 *     de six chemins relatifs à dossierImages, dans l'ordre 01 → 06
 *   - seuils (défaut [32, 58, 78, 91]) — pourcentages de la barre où
 *     l'on passe aux étapes 2, 3, 4, puis où l'éclair se déclenche
 *   - duree (ms, défaut 11000) — durée de la barre si elle allait à 100 %
 *     (la barre est coupée avant, au dernier seuil)
 *   - etiquette (défaut 'Téléversement en cours…')
 *   - pleinEcran (défaut true) — si false, la scène remplit le
 *     conteneur (qui doit alors être en position: relative)
 * @param {object} callbacks
 *   - onProgres(pourcentage), onEclair(), onOuverture(), onFin()
 *     (onFin : Bek a fini d'atterrir)
 * @returns {{arreter: function}} — fige la séquence (timers coupés)
 */
function demarrerSequenceTeleversement(idConteneur, options, callbacks) {
  options = options || {};
  callbacks = callbacks || {};

  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return { arreter: function () {} };
  if (!window.KebBekProgression) {
    console.warn('sequence-televersement : barre-progression.js doit être chargé avant.');
    return { arreter: function () {} };
  }

  // À garder cohérent avec sequence-televersement.css (transmis via variables CSS)
  const DUREES = {
    eclat: 1300,      // éclat lumineux (flash)
    noirDelai: 1000,  // le noir commence à tomber 1 s après l'éclair
    noir: 700,        // durée de la chute dans le noir
    pauseNoir: 1100,  // temps passé dans le noir complet
    iris: 2600,       // ouverture de la lumière
    descente: 4300    // descente + balancement + atterrissage de Bek
  };
  const instantOuverture = DUREES.noirDelai + DUREES.noir + DUREES.pauseNoir;
  const instantFin = instantOuverture + DUREES.descente;

  const dossier = typeof options.dossierImages === 'string' ? options.dossierImages : 'images/';
  const noms = options.fichiers || [
    'televersement_bek_01.png',
    'televersement_bek_02.png',
    'televersement_bek_03.png',
    'televersement_bek_04.webp',
    'televersement_bek_05.png',
    'televersement_bek_06.webp'
  ];
  const chemins = noms.map(function (n) { return dossier + n; });
  const seuils = options.seuils || [32, 58, 78, 91];
  const duree = typeof options.duree === 'number' ? options.duree : 11000;
  const etiquette = typeof options.etiquette === 'string' ? options.etiquette : 'Téléversement en cours…';
  const pleinEcran = options.pleinEcran !== false;

  let arrete = false;
  let barre = null;
  const minuteries = [];
  function apres(ms, fn) {
    minuteries.push(setTimeout(function () { if (!arrete) fn(); }, ms));
  }

  // ---------- Structure ----------
  conteneur.innerHTML =
    '<div class="tvbk-scene' + (pleinEcran ? '' : ' tvbk-scene--dans-conteneur') + '" id="tvbkScene" aria-busy="true">' +
      '<div class="tvbk-monde">' +
        '<div class="tvbk-cadre">' +
          '<img class="tvbk-etape est-actif" data-etape="1" src="' + chemins[0] + '" alt="">' +
          '<img class="tvbk-etape" data-etape="2" src="' + chemins[1] + '" alt="">' +
          '<img class="tvbk-etape" data-etape="3" src="' + chemins[2] + '" alt="">' +
          '<img class="tvbk-etape" data-etape="4" src="' + chemins[3] + '" alt="">' +
          '<img class="tvbk-etape tvbk-etape--eclair" data-etape="5" src="' + chemins[4] + '" alt="">' +
        '</div>' +
        '<div class="tvbk-barre-zone" id="tvbkBarre"></div>' +
      '</div>' +
      '<div class="tvbk-eclat" aria-hidden="true">' +
        '<div class="tvbk-eclat-halo"></div>' +
        '<div class="tvbk-eclat-rayons"></div>' +
        '<div class="tvbk-eclat-onde"></div>' +
      '</div>' +
      '<div class="tvbk-noir" aria-hidden="true"></div>' +
      '<div class="tvbk-revelation">' +
        '<div class="tvbk-lueur" aria-hidden="true"></div>' +
        '<div class="tvbk-bek-boite">' +
          '<div class="tvbk-ombre" aria-hidden="true"></div>' +
          '<div class="tvbk-bek-descente"><div class="tvbk-bek-balancier"><div class="tvbk-bek-corps">' +
            '<img src="' + chemins[5] + '" alt="Bek">' +
          '</div></div></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  const scene = document.getElementById('tvbkScene');
  scene.style.setProperty('--tvbk-eclat', DUREES.eclat + 'ms');
  scene.style.setProperty('--tvbk-noir', DUREES.noir + 'ms');
  scene.style.setProperty('--tvbk-iris', DUREES.iris + 'ms');
  scene.style.setProperty('--tvbk-descente', DUREES.descente + 'ms');

  // Sans @property (vieux navigateurs), l'ouverture circulaire devient un simple fondu
  if (!(window.CSS && typeof CSS.registerProperty === 'function')) {
    scene.classList.add('tvbk-sans-iris');
  }

  const etapes = scene.querySelectorAll('.tvbk-etape:not(.tvbk-etape--eclair)');
  let etapeCourante = 1;
  function allerEtape(n) {
    if (n <= etapeCourante) return;
    etapeCourante = n;
    etapes.forEach(function (img) {
      img.classList.toggle('est-actif', Number(img.getAttribute('data-etape')) === n);
    });
  }

  // ---------- Éclair → noir → ouverture → atterrissage ----------
  let eclairFait = false;
  function declencherEclair() {
    if (eclairFait) return;
    eclairFait = true;
    if (barre) barre.arreter();
    scene.classList.add('tvbk-eclair');
    if (typeof callbacks.onEclair === 'function') callbacks.onEclair();

    apres(DUREES.noirDelai, function () { scene.classList.add('tvbk-noir-actif'); });
    apres(instantOuverture, function () {
      scene.classList.add('tvbk-ouverture');
      if (typeof callbacks.onOuverture === 'function') callbacks.onOuverture();
    });
    apres(instantFin, function () {
      scene.classList.add('tvbk-fini');
      scene.setAttribute('aria-busy', 'false');
      if (typeof callbacks.onFin === 'function') callbacks.onFin();
    });
  }

  function surProgres(p) {
    if (p >= seuils[0]) allerEtape(2);
    if (p >= seuils[1]) allerEtape(3);
    if (p >= seuils[2]) allerEtape(4);
    if (p >= seuils[3]) declencherEclair();
    if (typeof callbacks.onProgres === 'function') callbacks.onProgres(p);
  }

  // ---------- Démarrage : on précharge les six images pour éviter tout clignotement ----------
  function precharger(src) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = function () { resolve(); };
      img.onerror = function () { console.warn('sequence-televersement : image introuvable →', src); resolve(); };
      img.src = src;
    });
  }
  Promise.all(chemins.map(precharger)).then(function () {
    if (arrete) return;
    barre = window.KebBekProgression.demarrerBarreProgression(
      'tvbkBarre',
      { cible: 100, duree: duree, etiquette: etiquette },
      { onProgres: surProgres }
    );
  });

  return {
    arreter: function () {
      arrete = true;
      minuteries.forEach(clearTimeout);
      if (barre) barre.arreter();
    }
  };
}

window.KebBekTeleversement = { demarrerSequenceTeleversement };
