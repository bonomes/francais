/* ==================================================================
   barre-progression.js — module autonome, même patron que les autres
   écrans : window.KebBekProgression.demarrerBarreProgression
   (idConteneur, options, callbacks).

   Anime une barre de téléversement de 0 à un pourcentage cible, avec
   un rythme légèrement irrégulier (accélère, ralentit, petites pauses)
   plutôt qu'une progression parfaitement linéaire — un vrai
   téléversement n'avance jamais à vitesse constante, et cette
   irrégularité vend mieux l'illusion. À la narration correspondante
   (échec, éclair) revient de décider QUAND interrompre la barre —
   ce module se contente d'animer et d'avertir via callbacks.onFin
   quand la cible est atteinte, ou peut être arrêté net de l'extérieur
   via l'objet retourné (voir .arreter()) pour simuler l'interruption.
   ================================================================== */

/**
 * @param {string} idConteneur
 * @param {object} options
 *   - cible (0-100, défaut 100) — pourcentage à atteindre
 *   - duree (ms, défaut 3200) — durée totale approximative
 *   - etiquette (texte affiché au-dessus du pourcentage, optionnel)
 * @param {object} callbacks
 *   - onProgres(pourcentageArrondi) — appelé à chaque frame
 *   - onFin() — appelé une fois la cible atteinte (jamais si .arreter()
 *     est utilisé avant la fin)
 * @returns {{arreter: function}} — permet à la page hôte de couper
 *   l'animation en plein vol (ex. pour déclencher l'échec/l'éclair au
 *   milieu du téléversement plutôt que d'attendre 100%).
 */
function demarrerBarreProgression(idConteneur, options, callbacks) {
  options = options || {};
  callbacks = callbacks || {};
  const cible = typeof options.cible === 'number' ? options.cible : 100;
  const duree = typeof options.duree === 'number' ? options.duree : 3200;

  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return { arreter: function () {} };

  conteneur.innerHTML =
    '<div class="brtv-conteneur">' +
      (options.etiquette ? '<span class="brtv-etiquette">' + options.etiquette + '</span>' : '') +
      '<div class="brtv-piste"><div class="brtv-remplissage" id="brtvRemplissage"></div></div>' +
      '<span class="brtv-etiquette"><span class="brtv-pourcent" id="brtvPourcent">0</span>%</span>' +
    '</div>';

  const elRemplissage = document.getElementById('brtvRemplissage');
  const elPourcent = document.getElementById('brtvPourcent');

  let arrete = false;
  let idAnimation = null;
  const depart = performance.now();

  // Easing "irrégulier" : rapide au début, ralentit, petit à-coup,
  // puis termine — construit à partir d'un ease-out standard légèrement
  // bruité, plutôt qu'un vrai bruit aléatoire (reproductible, jamais
  // deux fois identique visuellement grâce au sin, mais sans risque
  // de reculer ou de sauter).
  function easeIrregulier(t) {
    const easeOut = 1 - Math.pow(1 - t, 3);
    const ondulation = Math.sin(t * Math.PI * 4.5) * 0.015 * (1 - t);
    return Math.max(0, Math.min(1, easeOut + ondulation));
  }

  function frame(maintenant) {
    if (arrete) return;
    const t = Math.min(1, (maintenant - depart) / duree);
    const pourcentage = Math.round(easeIrregulier(t) * cible);

    elRemplissage.style.width = pourcentage + '%';
    elPourcent.textContent = pourcentage;
    if (typeof callbacks.onProgres === 'function') callbacks.onProgres(pourcentage);

    if (t < 1) {
      idAnimation = requestAnimationFrame(frame);
    } else {
      if (typeof callbacks.onFin === 'function') callbacks.onFin();
    }
  }
  idAnimation = requestAnimationFrame(frame);

  return {
    arreter: function () {
      arrete = true;
      if (idAnimation) cancelAnimationFrame(idAnimation);
    }
  };
}

window.KebBekProgression = { demarrerBarreProgression };
