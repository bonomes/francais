// ==================================================================
// lecon-intro.js — carte titre plein écran au début d'une leçon.
// Demande de Raphaël (session du 20-08-2026) : image en gros format,
// entrée animée, puis une "belle" sortie qui laisse place au dialogue.
//
// Aucune dépendance — module autonome (contrairement à mot-tooltip.js,
// qui a besoin de progression.js) : construit son propre recouvrement,
// n'a besoin d'aucune balise déjà présente dans la page hôte.
//
// API PUBLIQUE (window.KebBekLeconIntro) :
//   - afficher(src, options) → Promise résolue une fois la carte
//     entièrement disparue (la page hôte peut alors révéler son
//     dialogue). options : { alt, dureeAffichage } — dureeAffichage en
//     ms, 1600 par défaut (même durée que l'écran-titre de l'accueil).
//     Un tap/clic sur la carte pendant l'affichage passe directement à
//     la sortie, sans attendre la fin de dureeAffichage.
// ==================================================================

(function () {

  const DUREE_AFFICHAGE_DEFAUT = 1600;
  const reduireMouvement = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function attendre(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // Attend soit l'évènement de fin de transition CSS sur l'image, soit un
  // filet de sécurité temporel — au cas où l'onglet est en arrière-plan
  // (les transitions peuvent alors ne jamais se déclencher) ou si
  // prefers-reduced-motion réduit la transition CSS mais pas la logique
  // JS elle-même.
  function attendreFinTransition(el, delaiSecours) {
    return new Promise(function (resolve) {
      let fini = false;
      function terminer() {
        if (fini) return;
        fini = true;
        el.removeEventListener('transitionend', surTransitionFin);
        resolve();
      }
      function surTransitionFin(e) {
        if (e.target === el) terminer();
      }
      el.addEventListener('transitionend', surTransitionFin);
      setTimeout(terminer, delaiSecours);
    });
  }

  function afficher(src, options) {
    options = options || {};
    const dureeAffichage = reduireMouvement ? 150 : (typeof options.dureeAffichage === 'number' ? options.dureeAffichage : DUREE_AFFICHAGE_DEFAUT);

    const recouvrement = document.createElement('div');
    recouvrement.className = 'li-recouvrement';

    const img = document.createElement('img');
    img.className = 'li-image';
    img.src = src;
    img.alt = options.alt || '';

    recouvrement.appendChild(img);
    document.body.appendChild(recouvrement);

    let dejaPasse = false;
    function passerMaintenant() {
      if (dejaPasse) return;
      dejaPasse = true;
      demarrerSortie();
    }
    recouvrement.addEventListener('click', passerMaintenant);

    let resoudre;
    const promesse = new Promise(function (res) { resoudre = res; });

    function demarrerSortie() {
      recouvrement.removeEventListener('click', passerMaintenant);
      recouvrement.classList.add('li-sortie');
      attendreFinTransition(img, reduireMouvement ? 200 : 700).then(function () {
        recouvrement.remove();
        resoudre();
      });
    }

    // decode() attend que l'image soit prête à peindre avant de démarrer
    // l'entrée — évite un "pop" depuis un cadre vide si l'image n'est pas
    // encore en cache. Repli sur l'évènement load (Safari plus ancien /
    // image déjà en erreur) plutôt que de bloquer indéfiniment.
    const pret = (typeof img.decode === 'function')
      ? img.decode().catch(function () {})
      : new Promise(function (res) { img.addEventListener('load', res, { once: true }); img.addEventListener('error', res, { once: true }); });

    pret.then(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { recouvrement.classList.add('li-visible'); });
      });
      return attendre(dureeAffichage);
    }).then(function () {
      if (!dejaPasse) { dejaPasse = true; demarrerSortie(); }
    });

    return promesse;
  }

  window.KebBekLeconIntro = { afficher: afficher };

})();
