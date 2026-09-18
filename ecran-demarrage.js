/* ==================================================================
   ecran-demarrage.js — module autonome du tout premier écran du site,
   AVANT le tutoriel/l'identité, même patron d'architecture que
   menu-principal.js : window.KebBekDemarrage.demarrerEcranDemarrage
   (idConteneur, options, callbacks) rend l'écran dans le conteneur
   donné, communique avec la page hôte uniquement via callbacks — ce
   module ne navigue nulle part lui-même et ne connaît rien de la
   structure de la page.

   Deux choix seulement :
     - "Commencer" (callbacks.onCommencer) — l'action principale,
       mène vers la scène de téléversement/choix de personnage.
     - "Se connecter" (callbacks.onSeConnecter) — se déplie en ligne
       pour révéler un champ courriel, même patron que le panneau
       "Ma fiche" de menu-principal.js (pas un second écran séparé).

   🚧 Dictionnaire volontairement réduit à fr/en pour l'instant — à
   étendre aux mêmes 19 langues que DICO_MENU (menu-principal.js)
   avant mise en ligne, en réutilisant CLE_LANGUE_MENU pour rester
   cohérent avec le reste du site (un seul réglage de langue partagé).
   ================================================================== */

const CLE_LANGUE_DEMARRAGE = 'kebbek_langue'; // même clé que menu-principal.js / sac-a-dos.js
function langueActuelleDemarrage() {
  try { return localStorage.getItem(CLE_LANGUE_DEMARRAGE) || 'en'; }
  catch (e) { return 'en'; }
}

const DICO_DEMARRAGE = {
  fr: {
    boutonCommencerTitre: 'Commencer',
    boutonConnexion: 'Se connecter',
    courrielEtiquette: 'Ton courriel',
    courrielPlaceholder: 'toi@exemple.com',
    courrielEnvoyer: 'Envoyer le lien de connexion',
    courrielEnvoiEnCours: 'Envoi…',
    courrielErreurVide: 'Entre ton courriel pour continuer.',
    courrielErreurFormat: 'Ce courriel ne semble pas valide.'
  },
  en: {
    boutonCommencerTitre: 'Start',
    boutonConnexion: 'Log in',
    courrielEtiquette: 'Your email',
    courrielPlaceholder: 'you@example.com',
    courrielEnvoyer: 'Send login link',
    courrielEnvoiEnCours: 'Sending…',
    courrielErreurVide: 'Enter your email to continue.',
    courrielErreurFormat: 'This email doesn\u2019t look valid.'
  }
};

function tDemarrageOuDefaut(cle, defaut) {
  const langue = langueActuelleDemarrage();
  const dico = DICO_DEMARRAGE[langue] || DICO_DEMARRAGE.en;
  return (dico && dico[cle]) || defaut;
}

// ---------- Icônes (même famille que svgIconeMenuChip dans menu-principal.js) ----------
function svgIconeDemarrage(nom) {
  const icones = {
    // flèche/éclair de départ
    commencer: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
    // enveloppe
    connexion: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };
  return icones[nom] || '';
}

function regexCourrielValide(valeur) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur);
}

/**
 * Rend le tout premier écran dans le conteneur donné.
 * @param {string} idConteneur
 * @param {object} options - réservé pour usage futur (ex. thème)
 * @param {object} callbacks
 *   - onCommencer()
 *   - onSeConnecter(courriel) — appelé seulement après validation du
 *     format; le module gère l'état visuel (érreur, "Envoi…") mais
 *     laisse à la page hôte le soin d'envoyer le lien réel et de
 *     décider quoi afficher ensuite (succès, erreur serveur, etc. —
 *     via une promesse retournée, même patron que essayerModeProfesseur
 *     dans menu-principal.js : rejet = message d'erreur générique
 *     affiché ici, jamais de détail technique montré à l'élève).
 */
function demarrerEcranDemarrage(idConteneur, options, callbacks) {
  callbacks = callbacks || {};
  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return;

  conteneur.innerHTML =
    '<div id="ecranDemarrage">' +
      '<img class="edem-titre-img" src="images/accueil/page_titre_02.webp" width="1376" height="768" alt="Les Bonomes">' +
      '<div class="edem-carte">' +

        '<button type="button" class="edem-bloc edem-entree-cachee edem-bouton-principal" id="edemBtnCommencer">' +
          '<span class="edem-icone-chip-principal">' + svgIconeDemarrage('commencer') + '</span>' +
          '<span class="edem-bouton-titre">' + tDemarrageOuDefaut('boutonCommencerTitre', 'Start') + '</span>' +
        '</button>' +

        '<button type="button" class="edem-bloc edem-entree-cachee edem-bouton-secondaire" id="edemBtnConnexion" aria-expanded="false">' +
          '<span class="edem-icone-chip-secondaire">' + svgIconeDemarrage('connexion') + '</span>' +
          '<span>' + tDemarrageOuDefaut('boutonConnexion', 'Log in') + '</span>' +
          '<span class="edem-chevron-secondaire">&#9660;</span>' +
        '</button>' +
        '<div id="edemPanneauCourriel"></div>' +

      '</div>' +
    '</div>';

  // ---------- Entrée en cascade (même patron que menu-principal.js) ----------
  const entrees = conteneur.querySelectorAll('.edem-entree-cachee');
  entrees.forEach((el, i) => {
    setTimeout(() => el.classList.remove('edem-entree-cachee'), 90 + i * 90);
  });

  // ---------- "Commencer" ----------
  const btnCommencer = document.getElementById('edemBtnCommencer');
  if (btnCommencer && typeof callbacks.onCommencer === 'function') {
    btnCommencer.addEventListener('click', callbacks.onCommencer);
  }

  // ---------- "Se connecter" (déplie le champ courriel en ligne) ----------
  const btnConnexion = document.getElementById('edemBtnConnexion');
  const panneauCourriel = document.getElementById('edemPanneauCourriel');

  function rendrePanneauCourriel() {
    panneauCourriel.innerHTML =
      '<label class="edem-champ-etiquette" for="edemChampCourriel" style="display:none;">' +
        tDemarrageOuDefaut('courrielEtiquette', 'Your email') +
      '</label>' +
      '<input type="email" id="edemChampCourriel" class="edem-champ-courriel" ' +
        'placeholder="' + tDemarrageOuDefaut('courrielPlaceholder', 'you@example.com') + '" autocomplete="email">' +
      '<p class="edem-erreur-courriel" id="edemErreurCourriel" style="display:none;"></p>' +
      '<button type="button" class="edem-envoi-courriel" id="edemBtnEnvoyer">' +
        tDemarrageOuDefaut('courrielEnvoyer', 'Send login link') +
      '</button>';

    const champ = document.getElementById('edemChampCourriel');
    const erreur = document.getElementById('edemErreurCourriel');
    const btnEnvoyer = document.getElementById('edemBtnEnvoyer');

    function afficherErreur(texte) {
      erreur.textContent = texte;
      erreur.style.display = 'block';
    }
    function masquerErreur() {
      erreur.style.display = 'none';
    }

    champ.addEventListener('input', masquerErreur);

    btnEnvoyer.addEventListener('click', async function () {
      const valeur = (champ.value || '').trim();
      if (!valeur) {
        afficherErreur(tDemarrageOuDefaut('courrielErreurVide', 'Enter your email to continue.'));
        return;
      }
      if (!regexCourrielValide(valeur)) {
        afficherErreur(tDemarrageOuDefaut('courrielErreurFormat', 'This email doesn\u2019t look valid.'));
        return;
      }
      masquerErreur();
      if (typeof callbacks.onSeConnecter !== 'function') return;

      btnEnvoyer.disabled = true;
      const texteOriginal = btnEnvoyer.textContent;
      btnEnvoyer.textContent = tDemarrageOuDefaut('courrielEnvoiEnCours', 'Sending…');
      try {
        await callbacks.onSeConnecter(valeur);
        // 🚧 Pas d'état "succès" affiché ici volontairement — la page
        // hôte décide quoi montrer ensuite (écran "vérifie ta boîte
        // courriel", etc.), ce module ne fait que transmettre l'adresse
        // validée. À ajuster si on veut un feedback inline plus riche.
      } catch (e) {
        afficherErreur(tDemarrageOuDefaut('courrielErreurFormat', 'This email doesn\u2019t look valid.'));
      } finally {
        btnEnvoyer.disabled = false;
        btnEnvoyer.textContent = texteOriginal;
      }
    });
  }
  rendrePanneauCourriel();

  if (btnConnexion) {
    btnConnexion.addEventListener('click', function () {
      const ouvert = panneauCourriel.classList.toggle('edem-ouvert');
      btnConnexion.setAttribute('aria-expanded', String(ouvert));
      btnConnexion.classList.toggle('edem-ouvert', ouvert);
      if (ouvert) {
        const champ = document.getElementById('edemChampCourriel');
        if (champ) setTimeout(() => champ.focus(), 200);
      }
    });
  }
}

window.KebBekDemarrage = { demarrerEcranDemarrage };
