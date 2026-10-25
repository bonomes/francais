/* ==================================================================
   sequence-lecteur.js — le fichier « .mem » est illisible : l'élève
   télécharge « Le Lecteur », qui l'ouvrira.

   🆕 (18-10-2026) Module autonome, même patron que sequence-reveil-bek.js :
   il se pose PAR-DESSUS la scène du réveil (l'élément .rbek-scene) et ne
   connaît rien du reste de la page.

   Déroulement :
     1. afficherCommentaire(scene, options) — au bas de l'écran, l'élève
        s'interroge dans sa langue : « What's that ? A file ? » (une
        « pensée » pâle, volontairement différente des bulles de Bek).
     2. demarrer(scene, options, callbacks) — au clic sur la bulle .mem :
        a. fenêtre « fichier illisible » (apparence SYSTÈME : police du
           système, à plat, sans relief — pour qu'on sente que c'est
           l'ordinateur qui parle, pas un personnage). Oui / Non ;
        b. installation : l'icône du Lecteur se remplit du bas vers le haut ;
        c. « Téléchargement terminé » + bouton Ouvrir ;
        d. le Lecteur apparaît, dit un mot, et on plonge (callbacks.onPret).

   🚧 L'« installation » est entièrement fictive : rien n'est téléchargé.
   La fenêtre garde le style du site et ne ressemble pas à une vraie boîte
   de dialogue de navigateur (les élèves ont 13-14 ans : on ne les habitue
   pas à cliquer « oui » sur une vraie fenêtre d'installation).

   🚧 Dictionnaire réduit à fr / en / es pour l'instant (repli : en, puis
   fr) — à étendre aux 19 langues avant mise en ligne.

   🎨 L'icône du Lecteur est PROVISOIRE (SVG dessiné ici, voir svgLecteur).
   Pour la remplacer par un vrai dessin : options.imageLecteur = 'url.webp'
   (ou window.KebBekLecteur.IMAGE_LECTEUR) — elle prend la place du SVG partout.

   @param {Element} scene
   @param {object} options : langue, imageLecteur, dureeInstallation (ms)
   @param {object} callbacks : onAnnule() (l'élève a dit « non »), onPret()
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_INSTALLE = 'kebbek_lecteur_installe';

  const DICO = {
    fr: {
      commentaire: 'C\u2019est quoi, \u00e7a\u00a0? Un fichier\u00a0?',
      erreurTitre: 'Fichier illisible',
      erreurTexte: 'Ce fichier ne peut pas \u00eatre ouvert sur cet appareil. Voulez-vous t\u00e9l\u00e9charger une extension capable de le lire et de le r\u00e9parer\u00a0?',
      oui: 'Oui', non: 'Non',
      nomLecteur: 'Le Lecteur',
      installation: 'T\u00e9l\u00e9chargement de \u00ab\u00a0Le Lecteur\u00a0\u00bb\u2026',
      termine: 'T\u00e9l\u00e9chargement termin\u00e9',
      ouvrir: 'Ouvrir',
      lecteur1: 'Salut\u00a0! Je suis Le Lecteur. Je peux ouvrir ce souvenir\u2026 et t\u2019aider \u00e0 le comprendre.',
      plonger: 'Plonger'
    },
    en: {
      commentaire: 'What\u2019s that? A file?',
      erreurTitre: 'Unreadable file',
      erreurTexte: 'This file can\u2019t be opened on this device. Would you like to download an extension that can read and repair it?',
      oui: 'Yes', non: 'No',
      nomLecteur: 'The Reader',
      installation: 'Downloading \u201cThe Reader\u201d\u2026',
      termine: 'Download complete',
      ouvrir: 'Open',
      lecteur1: 'Hi! I\u2019m The Reader. I can open this memory\u2026 and help you understand it.',
      plonger: 'Dive in'
    },
    es: {
      commentaire: '\u00bfQu\u00e9 es eso? \u00bfUn archivo?',
      erreurTitre: 'Archivo ilegible',
      erreurTexte: 'Este archivo no se puede abrir en este dispositivo. \u00bfQuieres descargar una extensi\u00f3n capaz de leerlo y repararlo?',
      oui: 'S\u00ed', non: 'No',
      nomLecteur: 'El Lector',
      installation: 'Descargando \u00abEl Lector\u00bb\u2026',
      termine: 'Descarga completada',
      ouvrir: 'Abrir',
      lecteur1: '\u00a1Hola! Soy El Lector. Puedo abrir este recuerdo\u2026 y ayudarte a entenderlo.',
      plonger: 'Sumergirse'
    }
  };

  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];
  const LANGUES_DROITE_A_GAUCHE = ['fa'];

  // Progression de l'installation : [temps relatif 0-1, avancement 0-1]. Un
  // petit palier vers 60 % rend la barre crédible (comme un vrai téléchargement).
  const COURBE = [[0, 0], [0.22, 0.30], [0.48, 0.44], [0.60, 0.47], [0.84, 0.92], [1, 1]];

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function traduire(langue, cle) {
    return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // ---------- Icône provisoire du Lecteur ----------
  // Petite créature-loupe : corps rond pêche, deux « pages » en guise d'ailes,
  // deux yeux, un sourire, un reflet. Même palette que le reste du site.
  function svgLecteur(classe) {
    return '<svg class="' + classe + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
      '<g stroke="#4A3B33" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' +
        '<g class="lect-aile lect-aile-g"><rect x="2" y="34" width="34" height="46" rx="10" fill="#FFFFFF" transform="rotate(-18 19 57)"/></g>' +
        '<g class="lect-aile lect-aile-d"><rect x="84" y="34" width="34" height="46" rx="10" fill="#FFFFFF" transform="rotate(18 101 57)"/></g>' +
        '<circle cx="60" cy="62" r="38" fill="#F0A98B"/>' +
        '<circle cx="60" cy="62" r="28" fill="#FFF0E4" stroke-width="3"/>' +
      '</g>' +
      '<circle cx="50" cy="58" r="4.2" fill="#4A3B33"/>' +
      '<circle cx="70" cy="58" r="4.2" fill="#4A3B33"/>' +
      '<path d="M51 70q9 8 18 0" fill="none" stroke="#4A3B33" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M40 48q6-10 18-11" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".9"/>' +
      '</svg>';
  }
  function htmlIcone(options, classe) {
    const url = (options && options.imageLecteur) || (window.KebBekLecteur && window.KebBekLecteur.IMAGE_LECTEUR);
    if (url) return '<img class="' + classe + '" src="' + echapper(url) + '" alt="" draggable="false">';
    return svgLecteur(classe);
  }

  function appliquerLangue(el, langue) {
    if (LANGUES_POLICE_SYSTEME.indexOf(langue) !== -1) el.classList.add('lect-police-systeme');
    if (LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1) el.setAttribute('dir', 'rtl');
  }

  // ================= 1. Le commentaire de l'élève =================
  let commentaireCourant = null;

  function afficherCommentaire(scene, options) {
    retirerCommentaire();
    const langue = langueActuelle(options);
    const p = document.createElement('p');
    p.className = 'lect-pensee';
    p.textContent = traduire(langue, 'commentaire');
    appliquerLangue(p, langue);
    scene.appendChild(p);
    const id = setTimeout(function () { p.classList.add('lect-pensee-visible'); }, (options && options.delai) || 900);
    commentaireCourant = { el: p, id: id };
    return { retirer: retirerCommentaire };
  }
  function retirerCommentaire() {
    if (!commentaireCourant) return;
    clearTimeout(commentaireCourant.id);
    const el = commentaireCourant.el;
    commentaireCourant = null;
    el.classList.remove('lect-pensee-visible');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  // ================= 2. La séquence =================
  function demarrer(scene, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const langue = langueActuelle(options);
    const T = function (cle) { return traduire(langue, cle); };
    const duree = typeof options.dureeInstallation === 'number' ? options.dureeInstallation : 3600;
    const minuteurs = [];
    let vivante = true;
    let image = null;

    function planifier(fn, ms) {
      const id = setTimeout(function () { if (vivante && document.body.contains(scene)) fn(); }, ms);
      minuteurs.push(id);
      return id;
    }
    function nettoyer() {
      vivante = false;
      minuteurs.forEach(clearTimeout);
    }

    retirerCommentaire();

    const voile = document.createElement('div');
    voile.className = 'lect-voile';
    appliquerLangue(voile, langue);
    scene.appendChild(voile);
    planifier(function () { voile.classList.add('lect-voile-visible'); }, 20);

    function retirerVoile() {
      voile.classList.remove('lect-voile-visible');
      setTimeout(function () { if (voile.parentNode) voile.parentNode.removeChild(voile); }, 350);
    }

    // ---------- a. Fenêtre « fichier illisible » ----------
    function fenetreErreur() {
      const carte = document.createElement('div');
      carte.className = 'lect-carte';
      carte.setAttribute('role', 'alertdialog');
      carte.setAttribute('aria-labelledby', 'lectTitre');
      carte.setAttribute('aria-describedby', 'lectTexte');
      carte.innerHTML =
        '<div class="lect-entete"><span class="lect-alerte" aria-hidden="true">!</span>' +
          '<h2 class="lect-titre" id="lectTitre">' + echapper(T('erreurTitre')) + '</h2></div>' +
        '<div class="lect-fichier" dir="ltr">souvenir.mem</div>' +
        '<p class="lect-texte" id="lectTexte">' + echapper(T('erreurTexte')) + '</p>' +
        '<div class="lect-boutons">' +
          '<button type="button" class="lect-btn lect-btn-clair" id="lectNon">' + echapper(T('non')) + '</button>' +
          '<button type="button" class="lect-btn" id="lectOui">' + echapper(T('oui')) + '</button>' +
        '</div>';
      voile.appendChild(carte);
      planifier(function () { carte.classList.add('lect-carte-visible'); }, 60);
      planifier(function () { const o = carte.querySelector('#lectOui'); if (o) o.focus(); }, 400);

      carte.querySelector('#lectNon').addEventListener('click', function () {
        // « Non » : la fenêtre se ferme, la bulle .mem reste cliquable
        carte.classList.remove('lect-carte-visible');
        retirerVoile();
        nettoyer();
        if (typeof callbacks.onAnnule === 'function') {
          try { callbacks.onAnnule(); } catch (e) { console.warn('onAnnule a échoué.', e); }
        }
      });
      carte.querySelector('#lectOui').addEventListener('click', function () {
        carte.classList.remove('lect-carte-visible');
        planifier(function () { carte.remove(); installation(); }, 260);
      });
    }

    // ---------- b + c. Installation puis « terminé » ----------
    function installation() {
      const carte = document.createElement('div');
      carte.className = 'lect-carte lect-carte-install';
      carte.setAttribute('role', 'dialog');
      carte.setAttribute('aria-live', 'polite');
      carte.innerHTML =
        '<div class="lect-icone-install" style="--p:0">' +
          '<span class="lect-icone-fond">' + htmlIcone(options, 'lect-icone-img') + '</span>' +
          '<span class="lect-icone-plein">' + htmlIcone(options, 'lect-icone-img') + '</span>' +
        '</div>' +
        '<h2 class="lect-titre lect-titre-install" id="lectTitreInstall">' + echapper(T('installation')) + '</h2>' +
        '<div class="lect-barre" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="lect-barre-remplie"></span></div>' +
        '<div class="lect-pourcent" dir="ltr">0 %</div>' +
        '<div class="lect-boutons lect-boutons-seul"><button type="button" class="lect-btn lect-cache" id="lectOuvrir">' + echapper(T('ouvrir')) + '</button></div>';
      voile.appendChild(carte);
      planifier(function () { carte.classList.add('lect-carte-visible'); }, 40);

      const icone = carte.querySelector('.lect-icone-install');
      const barre = carte.querySelector('.lect-barre');
      const remplie = carte.querySelector('.lect-barre-remplie');
      const pourcent = carte.querySelector('.lect-pourcent');
      const titre = carte.querySelector('.lect-titre-install');
      const bouton = carte.querySelector('#lectOuvrir');

      function avancement(t) {
        for (let i = 1; i < COURBE.length; i++) {
          if (t <= COURBE[i][0]) {
            const a = COURBE[i - 1], b = COURBE[i];
            return a[1] + (b[1] - a[1]) * ((t - a[0]) / (b[0] - a[0]));
          }
        }
        return 1;
      }

      const debut = performance.now() + 450; // petite attente avant de démarrer
      function image2() {
        if (!vivante) return;
        const t = Math.max(0, Math.min(1, (performance.now() - debut) / duree));
        const p = avancement(t);
        const pct = Math.round(p * 100);
        icone.style.setProperty('--p', String(p));
        remplie.style.transform = 'scaleX(' + p + ')';
        pourcent.textContent = pct + ' %';
        barre.setAttribute('aria-valuenow', String(pct));
        if (t < 1) { image = requestAnimationFrame(image2); return; }
        fini();
      }
      image = requestAnimationFrame(image2);

      function fini() {
        carte.classList.add('lect-carte-termine');
        titre.textContent = T('termine');
        planifier(function () {
          bouton.classList.remove('lect-cache');
          bouton.focus();
        }, 500);
      }

      bouton.addEventListener('click', function () {
        bouton.disabled = true;
        carte.classList.remove('lect-carte-visible');
        planifier(function () { carte.remove(); apparitionLecteur(); }, 280);
      });
    }

    // ---------- d. Le Lecteur apparaît ----------
    function apparitionLecteur() {
      voile.classList.add('lect-voile-leger'); // plus de fond assombri
      const zone = document.createElement('div');
      zone.className = 'lect-lecteur-zone';
      zone.innerHTML =
        '<div class="lect-lecteur-bulle" role="status">' +
          '<p class="lect-lecteur-texte">' + echapper(T('lecteur1')) + '</p>' +
          '<button type="button" class="lect-btn" id="lectPlonger">' + echapper(T('plonger')) + '</button>' +
        '</div>' +
        '<div class="lect-lecteur" aria-label="' + echapper(T('nomLecteur')) + '">' + htmlIcone(options, 'lect-lecteur-img') + '</div>';
      voile.appendChild(zone);
      planifier(function () { zone.classList.add('lect-lecteur-visible'); }, 40);
      planifier(function () { const b = zone.querySelector('#lectPlonger'); if (b) b.focus(); }, 700);

      zone.querySelector('#lectPlonger').addEventListener('click', function () {
        zone.querySelector('#lectPlonger').disabled = true;
        try { localStorage.setItem(CLE_INSTALLE, '1'); } catch (e) {}
        retirerVoile();
        nettoyer();
        if (typeof callbacks.onPret === 'function') {
          try { callbacks.onPret(); } catch (e) { console.warn('onPret a échoué.', e); }
        }
      });
    }

    fenetreErreur();

    return {
      arreter: function () {
        nettoyer();
        if (image) cancelAnimationFrame(image);
        if (voile.parentNode) voile.parentNode.removeChild(voile);
      }
    };
  }

  function estInstalle() {
    try { return localStorage.getItem(CLE_INSTALLE) === '1'; } catch (e) { return false; }
  }

  window.KebBekLecteur = {
    afficherCommentaire: afficherCommentaire,
    retirerCommentaire: retirerCommentaire,
    demarrer: demarrer,
    estInstalle: estInstalle,
    htmlIcone: htmlIcone,   // réutilisé par sequence-memoire.js (le Lecteur reste présent dans la leçon)
    IMAGE_LECTEUR: null
  };
})();
