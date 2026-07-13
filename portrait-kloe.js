/* ==================================================================
   portrait-kloe.js — mécanisme PARTAGÉ du portrait tournant de Kloé
   dans les infobulles de traduction (.pile-tooltip-portrait).

   Extrait cette session (BONOMES_v55) depuis intro-bonomes.html, qui en
   était l'unique consommateur jusqu'ici (voir BONOMES_v51/v54, "reste à
   faire" : extraction reportée tant qu'un seul fichier en avait besoin).
   La Leçon 1 (lecons/dialogues/niveau-1/d1.html) en devient le deuxième
   consommateur — même déclencheur qui avait justifié sac-a-dos.js,
   exercices.js et nationalites.js : DRY dès qu'un deuxième fichier a
   besoin de la même logique, pas avant.

   Usage : charger CE fichier, puis appeler
   window.KebBekKloePortrait.prochaineImage() pour obtenir le chemin de
   la prochaine image à afficher dans une infobulle — l'appelant reste
   responsable de placer cette valeur dans son <img src="...">.

   Comportement (inchangé depuis l'original) :
   - Images dans images/recurrentes/kloe_explique_01.png, 02, 03...
     (usage générique hors contexte narratif — voir BONOMES_v38/v42).
   - Détection automatique du nombre d'images disponibles, en sondant
     01, 02, 03... jusqu'à échec (le site n'a pas de serveur capable de
     lister un dossier — pages statiques GitHub Pages).
   - Rotation cyclique (PAS aléatoire) via une clé localStorage PARTAGÉE
     entre TOUTES les pages qui consomment ce fichier (kebbek_kloe_
     explique_index) — l'index avance d'une infobulle à l'autre "peu
     importe la leçon, l'histoire, etc." (mots de Raphaël), donc doit
     survivre au changement de page.
   - N'avance qu'une fois PAR NOUVEAU MOT ajouté à la pile — c'est à
     l'appelant de n'invoquer prochaineImage() qu'une seule fois par mot
     (au moment de sa création dans la pile), jamais à chaque survol du
     même mot déjà affiché.
   ================================================================== */

(function () {
  const CLE_ROTATION_KLOE = 'kebbek_kloe_explique_index';

  // 🐛 CORRIGÉ (revue avant livraison) : les chemins d'image étaient
  // écrits en dur en relatif ("images/recurrentes/...") — correct tant
  // que seul intro-bonomes.html (à la racine) consommait ce fichier,
  // mais faux dès qu'une page nichée (lecons/dialogues/niveau-1/d1.html)
  // le charge : "images/recurrentes/..." se serait alors résolu par
  // rapport au DOSSIER DE LA PAGE, pas de la racine du site, et aurait
  // cherché lecons/dialogues/niveau-1/images/recurrentes/... (inexistant).
  // Solution : déduire la racine du site depuis l'attribut src de CE
  // script lui-même (document.currentScript), peu importe la profondeur
  // depuis laquelle la page hôte le charge — robuste par construction
  // pour toute future page, à n'importe quel niveau de dossier.
  const RACINE_SITE = (function () {
    try {
      const src = document.currentScript && document.currentScript.src;
      if (!src) return ''; // repli : suppose que la page hôte est à la racine
      return src.slice(0, src.lastIndexOf('/') + 1);
    } catch (e) {
      return '';
    }
  })();

  // totalKloeExplique commence à 1 (kloe_explique_01.png existe
  // forcément) et grimpe au fur et à mesure que la sonde confirme chaque
  // image suivante — jamais besoin d'y toucher manuellement, ici ou sur
  // une future page qui consommerait ce fichier.
  let totalKloeExplique = 1;
  (function detecterTotalKloeExplique(n) {
    const img = new Image();
    img.onload = function () {
      totalKloeExplique = n;
      detecterTotalKloeExplique(n + 1); // essaie la suivante
    };
    img.onerror = function () {
      // n a échoué : la série s'arrête à n - 1, déjà enregistré ci-dessus
      // par l'appel précédent (ou reste à 1 si même la 01 est introuvable,
      // ce qui ne devrait jamais arriver en pratique).
    };
    img.src = RACINE_SITE + 'images/recurrentes/kloe_explique_' + String(n).padStart(2, '0') + '.png';
  })(1);

  function prochaineImage() {
    let index = 0;
    try {
      const brut = parseInt(localStorage.getItem(CLE_ROTATION_KLOE), 10);
      if (Number.isFinite(brut) && brut >= 0) index = brut;
    } catch (e) {
      index = 0; // localStorage indisponible : on repart de 01 sans planter
    }
    const numero = (index % totalKloeExplique) + 1; // cycle 1..N, jamais 0
    try {
      localStorage.setItem(CLE_ROTATION_KLOE, String(index + 1));
    } catch (e) {
      // Rotation non persistée d'une page à l'autre, mais l'affichage
      // courant fonctionne quand même (repli silencieux, même esprit que
      // sauvegarderSac dans sac-a-dos.js).
    }
    const numeroFormatte = String(numero).padStart(2, '0');
    return RACINE_SITE + 'images/recurrentes/kloe_explique_' + numeroFormatte + '.png';
  }

  window.KebBekKloePortrait = { prochaineImage };
})();
