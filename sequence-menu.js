/* ==================================================================
   sequence-menu.js — le menu « simple » : première visite, pas à pas.

   🆕 (01-11-2026) Suite de sequence-compte.js. Trois temps, dans un seul
   conteneur (scène .rbek-scene, même habillage que le réveil et la mémoire) :

     1. LA DEMANDE DU LECTEUR (facultative, options.permission !== false) :
        Bek (pose « observe ») regarde le Lecteur, qui demande l'accès à « tous
        les fichiers téléversés » ; fenêtre système Refuser / Autoriser ; un refus
        est respecté (il redemande UNE fois, puis laisse tomber) ; une
        autorisation donne une confirmation qui promet un retrait « à tout moment
        dans les paramètres ». C'est du décor : rien n'est réellement autorisé.
     2. LA VISITE : à côté du menu (vide au départ), Bek (bras tendu vers lui)
        présente chaque entrée à son tour ; les boutons apparaissent un à un et
        ne sont cliquables qu'à la fin (ou après « Passer la visite »).
          · Mémoires et histoires  → callbacks.onHistoires
          · Paramètres             → fenêtre (vrais + faux réglages)
          · Cours privés           → callbacks.onPrives
     3. LES PARAMÈTRES :
          vrais : Son (kebbek_son, même clé que la mémoire), Langue (si
                  callbacks.onChangerLangue), Compte (créer / se déconnecter) ;
          faux  : « Autorisation du Lecteur » → « Retirer » échoue toujours
                  (serveurs occupés, réessaie plus tard…).

   Dépend de sequence-reveil-bek.css (.rbek-scene, .rbek-pose), de
   sequence-lecteur.css (.lect-voile / .lect-carte / .lect-btn, icône du Lecteur)
   et de menu-principal.css (.kbm-bouton, .kbm-icone-chip) — à charger avant
   sequence-menu.css. Sans window.KebBekLecteur, la demande du Lecteur est sautée.

   @param {string} idConteneur
   @param {object} options : langue ; identite { prenom } (salutation) ;
                             permission (défaut true) ; dossierImages, extension,
                             sources (comme sequence-memoire.js)
   @param {object} callbacks : onHistoires(), onPrives(),
                               onCreerCompte() (si invité), onChangerLangue()
                               (sinon la ligne Langue n'est pas affichée),
                               onPermission(accordee: bool)
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const CLE_AUTORISATION = 'kebbek_autorisation_lecteur';   // 'oui' | 'non' — décor seulement
  const LANGUES_DROITE_A_GAUCHE = ['fa'];
  const VITESSE_TEXTE = 28;
  const PAUSE_FORTE = 240;
  const PAUSE_FAIBLE = 110;
  const DUREE_ENCOURS = 1200;     // « Retirer » semble réfléchir avant d'échouer

  const SOURCES_PAR_DEFAUT = {
    'bek-heureuse-ferme':  'images/reveil/bek_heureuse_bouche-fermee_01-01.webp',
    'bek-heureuse-ouvert': 'images/reveil/bek_heureuse_bouche-ouverte_01-01.webp',
    'bek-tendue-ferme':    'images/reveil/bek_tendue_bouche-fermee_01-01.webp',
    'bek-tendue-ouvert':   'images/reveil/bek_tendue_bouche-ouverte_01-01.webp',
    'bek-observe':         'images/reveil/bek_observe_01-01.webp'
  };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);
  const EXPRESSIONS = {
    observe:  { fixe: 'bek-observe', repli: 'bek-heureuse-ferme' },
    heureuse: { ferme: 'bek-heureuse-ferme', ouvert: 'bek-heureuse-ouvert' },
    // le bras tendu de « tendue » est à GAUCHE de l'image : le menu est à gauche de Bek
    tendue:   { ferme: 'bek-tendue-ferme', ouvert: 'bek-tendue-ouvert', alt: 'heureuse' }
  };

  // ⚠️ fr et en complets ; les autres langues retombent sur l'anglais (à traduire une
  // fois les textes validés, comme pour sequence-compte.js).
  const DICO = {
    fr: {
      lecteurDemande: 'Peux-tu m\u2019autoriser \u00e0 acc\u00e9der \u00e0 tous les fichiers que tu as t\u00e9l\u00e9vers\u00e9s\u00a0? Je m\u2019occupe de les trier.',
      autoTitre: 'Demande d\u2019autorisation',
      autoTexte: 'Le Lecteur demande l\u2019acc\u00e8s \u00e0 tous les fichiers t\u00e9l\u00e9vers\u00e9s.',
      autoRefuser: 'Refuser',
      autoAutoriser: 'Autoriser',
      refus1: 'Oh\u2026 sans acc\u00e8s, je ne peux rien ranger. Je te redemande, d\u2019accord\u00a0?',
      refus2: 'Pas de souci. Tu pourras changer d\u2019avis dans les param\u00e8tres.',
      confTitre: 'Autorisation accord\u00e9e',
      confTexte: 'Tu pourras retirer cette autorisation \u00e0 tout moment dans les param\u00e8tres.',
      ok: 'OK',
      salutation: 'Salut, {prenom}\u00a0!',
      salutationInvite: 'Bienvenue\u00a0!',
      menuHistoires: 'M\u00e9moires et histoires',
      menuParametres: 'Param\u00e8tres',
      menuPrives: 'Cours priv\u00e9s',
      passer: 'Passer la visite',
      suite: 'Suite',
      bekIntro: 'Voici ton menu\u00a0! Je te fais visiter.',
      bekHistoires: 'Ici, on reconstruit mes m\u00e9moires\u2026 et tu peux lire les histoires de mon journal.',
      bekParametres: 'Ici, tu r\u00e8gles le son, ton compte\u2026 et ce que le Lecteur a le droit de faire.',
      bekPrives: 'Et ici, des cours avec un vrai professeur, pour aller plus loin.',
      bekFin: '\u00c0 toi de jouer\u00a0!',
      paramTitre: 'Param\u00e8tres',
      paramSon: 'Son',
      sonOui: 'Activ\u00e9',
      sonNon: 'D\u00e9sactiv\u00e9',
      sonCouper: 'Couper',
      sonActiver: 'Activer',
      paramLangue: 'Langue',
      paramChanger: 'Changer',
      paramCompte: 'Compte',
      compteInvite: 'Invit\u00e9',
      compteConnecte: 'Connect\u00e9',
      creerCompte: 'Cr\u00e9er un compte',
      deconnexion: 'Se d\u00e9connecter',
      paramAutorisation: 'Autorisation du Lecteur',
      autoAccordee: 'Accord\u00e9e',
      autoRefusee: 'Refus\u00e9e',
      retirer: 'Retirer',
      accorder: 'Accorder',
      fermer: 'Fermer',
      enCours: '\u2026',
      erreurTitre: 'Erreur',
      excuses: [
        'Les serveurs sont tr\u00e8s occup\u00e9s en ce moment. R\u00e9essaie plus tard.',
        'Une erreur est survenue. R\u00e9essaie dans quelques minutes.',
        'Cette op\u00e9ration est momentan\u00e9ment indisponible.'
      ]
    },
    en: {
      lecteurDemande: 'Can you grant me access to all the files you\u2019ve uploaded? I\u2019ll sort them out.',
      autoTitre: 'Permission request',
      autoTexte: 'The Reader is requesting access to all uploaded files.',
      autoRefuser: 'Deny',
      autoAutoriser: 'Allow',
      refus1: 'Oh\u2026 without access, I can\u2019t sort anything. Can I ask again?',
      refus2: 'No worries. You can change your mind in the settings.',
      confTitre: 'Permission granted',
      confTexte: 'You can withdraw this permission at any time in the settings.',
      ok: 'OK',
      salutation: 'Hi, {prenom}!',
      salutationInvite: 'Welcome!',
      menuHistoires: 'Memories & stories',
      menuParametres: 'Settings',
      menuPrives: 'Private lessons',
      passer: 'Skip the tour',
      suite: 'Next',
      bekIntro: 'Here\u2019s your menu! Let me show you around.',
      bekHistoires: 'Here, we rebuild my memories\u2026 and you can read the stories from my diary.',
      bekParametres: 'Here, you adjust the sound, your account\u2026 and what the Reader is allowed to do.',
      bekPrives: 'And here, lessons with a real teacher, to go further.',
      bekFin: 'Your turn!',
      paramTitre: 'Settings',
      paramSon: 'Sound',
      sonOui: 'On',
      sonNon: 'Off',
      sonCouper: 'Turn off',
      sonActiver: 'Turn on',
      paramLangue: 'Language',
      paramChanger: 'Change',
      paramCompte: 'Account',
      compteInvite: 'Guest',
      compteConnecte: 'Signed in',
      creerCompte: 'Create an account',
      deconnexion: 'Sign out',
      paramAutorisation: 'Reader permission',
      autoAccordee: 'Granted',
      autoRefusee: 'Denied',
      retirer: 'Withdraw',
      accorder: 'Grant',
      fermer: 'Close',
      enCours: '\u2026',
      erreurTitre: 'Error',
      excuses: [
        'The servers are very busy right now. Please try again later.',
        'Something went wrong. Please try again in a few minutes.',
        'This operation is temporarily unavailable.'
      ]
    }
  };

  const ICONES = {
    histoires: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/>',
    parametres: '<path d="M4 6h8M19 6h1"/><circle cx="15.5" cy="6" r="2.2"/><path d="M4 12h2M13 12h7"/><circle cx="9.5" cy="12" r="2.2"/><path d="M4 18h9M20 18h0"/><circle cx="16.5" cy="18" r="2.2"/>',
    prives: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    cadenas: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };
  function svg(id, classe) { return '<svg class="' + classe + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONES[id] + '</svg>'; }

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function precharger(noms, urlDe) {
    const etat = {};
    const toutes = Promise.all(noms.map(function (nom) {
      return new Promise(function (resolve) {
        const img = new Image();
        img.onload = function () { etat[nom] = true; resolve(); };
        img.onerror = function () { etat[nom] = false; resolve(); };
        img.src = urlDe(nom);
      });
    }));
    const delaiMax = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    return Promise.race([toutes, delaiMax]).then(function () { return etat; });
  }
  function lireSon() {
    try { return localStorage.getItem(CLE_SON) !== '0'; } catch (e) { return true; }
  }
  function ecrireSon(actif) {
    try { localStorage.setItem(CLE_SON, actif ? '1' : '0'); } catch (e) {}
  }
  function lireAutorisation() {
    try { return localStorage.getItem(CLE_AUTORISATION) === 'oui'; } catch (e) { return false; }
  }
  function ecrireAutorisation(accordee) {
    try { localStorage.setItem(CLE_AUTORISATION, accordee ? 'oui' : 'non'); } catch (e) {}
  }

  function demarrerMenuSimple(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const langue = langueActuelle(options);
    const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
    function T(cle) {
      return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
    }
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});
    const dossier = options.dossierImages ? options.dossierImages.replace(/\/?$/, '/') : null;
    function urlImage(nom) {
      if (options.sources && options.sources[nom]) return options.sources[nom];
      if (dossier) return dossier + sources[nom].replace(/^.*\//, '');
      return sources[nom];
    }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';
    const prenom = options.identite && options.identite.prenom ? String(options.identite.prenom) : '';
    const avecPermission = options.permission !== false && !!iconeLecteur;

    let arrete = false;
    let sauter = false;           // « Passer la visite »
    let avancerCourant = null;    // fait avancer la réplique de Bek en cours
    let numeroExcuse = 0;
    let niveau = 1;
    let courante = null;
    let jetonBouche = 0;
    const poses = {};
    const minuteurs = [];
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    const scene = document.createElement('div');
    scene.className = 'rbek-scene mns-scene';
    scene.innerHTML =
      '<div class="mns-disposition">' +
        '<div class="mns-col-gauche">' +
          (iconeLecteur ?
            '<div class="mns-lect mns-off">' +
              '<div class="lect-lecteur-bulle mns-lect-bulle" role="status"' + (rtl ? ' dir="rtl"' : '') + '>' +
                '<p class="lect-lecteur-texte mns-lect-texte"></p>' +
              '</div>' +
              '<div class="lect-lecteur mns-lect-icone">' + iconeLecteur + '</div>' +
            '</div>' : '') +
          '<div class="mns-menu mns-off">' +
            '<div class="kbm-carte mns-carte-menu">' +
              '<div class="kbm-salutation"' + (rtl ? ' dir="rtl"' : '') + '>' +
                echapper(prenom ? T('salutation').replace('{prenom}', prenom) : T('salutationInvite')) +
              '</div>' +
              '<div class="kbm-liste">' +
                boutonMenu('histoires', 'menuHistoires') +
                boutonMenu('parametres', 'menuParametres') +
                boutonMenu('prives', 'menuPrives') +
              '</div>' +
              '<button type="button" class="mns-passer">' + echapper(T('passer')) + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mns-col-bek">' +
          '<div class="mns-bulle mns-bulle-cachee" aria-live="polite"' + (rtl ? ' dir="rtl"' : '') + '>' +
            '<p class="mns-bulle-texte"><span class="mns-tape"></span><span class="mns-reste"></span></p>' +
            '<button type="button" class="mns-fleche" aria-label="' + echapper(T('suite')) + '">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="mns-bek"><div class="rbek-bek mns-bek-calque"></div></div>' +
        '</div>' +
      '</div>';
    function boutonMenu(id, cleTexte) {
      return '<button type="button" class="kbm-bouton kbm-entree-cachee mns-inactif" data-menu="' + id + '" tabindex="-1">' +
        '<span class="kbm-icone-chip">' + svg(id, 'kbm-icone') + '</span>' +
        '<span>' + echapper(T(cleTexte)) + '</span></button>';
    }
    conteneur.innerHTML = '';
    conteneur.appendChild(scene);
    planifier(function () { scene.classList.add('rbek-prete'); }, 30);

    const lectZone = scene.querySelector('.mns-lect');
    const lectTexte = scene.querySelector('.mns-lect-texte');
    const menu = scene.querySelector('.mns-menu');
    const bouton = {};
    Array.prototype.forEach.call(scene.querySelectorAll('.kbm-bouton'), function (b) { bouton[b.getAttribute('data-menu')] = b; });
    const passer = scene.querySelector('.mns-passer');
    const bulle = scene.querySelector('.mns-bulle');
    const tape = scene.querySelector('.mns-tape');
    const reste = scene.querySelector('.mns-reste');
    const fleche = scene.querySelector('.mns-fleche');
    const calque = scene.querySelector('.mns-bek-calque');

    // ---------- Poses de Bek ----------
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return;
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        calque.appendChild(img);
        poses[nom] = img;
      });
    }
    function disponible(nom) { return !!(nom && poses[nom]); }
    function montrer(nom, fondu) {
      const cible = poses[nom];
      if (!cible || cible === courante) return;
      const ancienne = courante;
      const ms = reduit ? 0 : (fondu || 0);
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms) {
        ancienne.style.transitionDuration = '0ms';
        planifier(function () { if (ancienne !== courante) ancienne.classList.remove('rbek-pose-visible'); }, ms + 40);
      } else {
        ancienne.classList.remove('rbek-pose-visible');
      }
    }
    function formes(exp) {
      const e = EXPRESSIONS[exp];
      if (disponible(e.ferme) && disponible(e.ouvert)) return { ferme: e.ferme, ouvert: e.ouvert };
      if (e.alt) return formes(e.alt);
      return { fixe: [e.fixe, e.ferme, e.repli, 'bek-heureuse-ferme'].find(disponible) };
    }
    function exprimer(exp, fondu) { const f = formes(exp); montrer(f.ferme || f.fixe, fondu); }

    // ---------- Fenêtres « système » (même habillage que le Lecteur) ----------
    function creerFenetre(contenuHtml, classeCarte) {
      const voile = document.createElement('div');
      voile.className = 'lect-voile mns-voile';
      voile.innerHTML =
        '<div class="lect-carte ' + (classeCarte || '') + '" role="alertdialog" aria-modal="true"' + (rtl ? ' dir="rtl"' : '') + '>' +
          contenuHtml +
        '</div>';
      scene.appendChild(voile);
      const carte = voile.querySelector('.lect-carte');
      planifier(function () { voile.classList.add('lect-voile-visible'); carte.classList.add('lect-carte-visible'); }, 30);
      function fermer() {
        voile.classList.remove('lect-voile-visible');
        carte.classList.remove('lect-carte-visible');
        planifier(function () { if (voile.parentNode) voile.parentNode.removeChild(voile); }, 320);
      }
      return { voile: voile, carte: carte, fermer: fermer };
    }
    function entete(icone, titre, idTitre) {
      return '<div class="lect-entete">' + icone + '<h2 class="lect-titre" id="' + idTitre + '">' + echapper(titre) + '</h2></div>';
    }
    const ICONE_ALERTE = '<span class="lect-alerte" aria-hidden="true">!</span>';
    const ICONE_CADENAS = '<span class="mns-icone" aria-hidden="true">' + svg('cadenas', 'mns-icone-svg') + '</span>';

    // fenêtre simple : titre + texte + boutons ; résout la valeur du bouton cliqué
    function fenetre(def) {
      return new Promise(function (resolve) {
        const f = creerFenetre(
          entete(def.icone || ICONE_ALERTE, def.titre, 'mnsFenTitre') +
          '<p class="lect-texte">' + echapper(def.texte) + '</p>' +
          '<div class="lect-boutons">' +
            def.boutons.map(function (b, i) {
              return '<button type="button" class="lect-btn' + (b.clair ? ' lect-btn-clair' : '') + '" data-i="' + i + '">' + echapper(b.label) + '</button>';
            }).join('') +
          '</div>');
        f.carte.setAttribute('aria-labelledby', 'mnsFenTitre');
        const btns = Array.prototype.slice.call(f.carte.querySelectorAll('.lect-btn'));
        btns.forEach(function (b) {
          b.addEventListener('click', function () {
            btns.forEach(function (x) { x.disabled = true; });
            f.fermer();
            planifier(function () { resolve(def.boutons[Number(b.getAttribute('data-i'))].valeur); }, 280);
          });
        });
        planifier(function () { (btns[btns.length - 1] || {}).focus && btns[btns.length - 1].focus({ preventScroll: true }); }, 350);
      });
    }

    // ---------- 1. La demande du Lecteur ----------
    function lecteurDit(texte) {
      lectTexte.textContent = texte;
      lectZone.classList.remove('mns-off');
      lectZone.classList.add('mns-lect-visible');
    }
    async function phasePermission() {
      exprimer('observe');                 // elle regarde vers le Lecteur (à sa gauche)
      await attendre(500);
      lecteurDit(T('lecteurDemande'));
      await attendre(Math.max(2200, Array.from(T('lecteurDemande')).length * 55));
      const demande = { icone: ICONE_CADENAS, titre: T('autoTitre'), texte: T('autoTexte'),
        boutons: [{ label: T('autoRefuser'), clair: true, valeur: 'non' }, { label: T('autoAutoriser'), valeur: 'oui' }] };
      let accordee = (await fenetre(demande)) === 'oui';
      if (!accordee) {
        lecteurDit(T('refus1'));
        await attendre(2800);
        accordee = (await fenetre(demande)) === 'oui';
      }
      if (accordee) {
        await fenetre({ icone: ICONE_CADENAS, titre: T('confTitre'), texte: T('confTexte'), boutons: [{ label: T('ok'), valeur: 'ok' }] });
      } else {
        lecteurDit(T('refus2'));
        await attendre(2800);
      }
      ecrireAutorisation(accordee);
      if (typeof callbacks.onPermission === 'function') {
        try { callbacks.onPermission(accordee); } catch (e) { console.warn('onPermission a échoué.', e); }
      }
      lectZone.classList.remove('mns-lect-visible');
      await attendre(450);
      lectZone.classList.add('mns-off');
    }

    // ---------- 2. La visite ----------
    // Réplique de Bek : texte tapé, bouche synchronisée, flèche « suite ».
    function dire(texte, exp, opts) {
      opts = opts || {};
      return new Promise(function (resolve) {
        const f = formes(exp);
        montrer(f.ferme || f.fixe, 250);
        bulle.classList.remove('mns-bulle-cachee', 'mns-bulle-suite');
        const signes = Array.from(texte);
        let i = 0, fini = false, ouverte = false, avance = false;
        tape.textContent = '';
        reste.textContent = texte;
        const mon = ++jetonBouche;

        function avancer() {
          if (avance) return;
          avance = true;
          avancerCourant = null;
          bulle.removeEventListener('click', clic);
          fleche.removeEventListener('click', avancer);
          bulle.classList.remove('mns-bulle-suite');
          planifier(resolve, 120);
        }
        function terminer() {
          if (fini) return;
          fini = true;
          tape.textContent = texte;
          reste.textContent = '';
          if (f.ferme) montrer(f.ferme);
          if (opts.sansSuite) { planifier(resolve, 200); return; }
          if (sauter) { avancer(); return; }
          planifier(function () {
            bulle.classList.add('mns-bulle-suite');
            avancerCourant = avancer;
            fleche.addEventListener('click', avancer);
            planifier(function () { if (!avance) fleche.focus({ preventScroll: true }); }, 150);
          }, 200);
        }
        function clic() { if (!fini) terminer(); else avancer(); }
        function bougerBouche() {
          if (fini || mon !== jetonBouche) return;
          ouverte = !ouverte;
          if (f.ferme) montrer(ouverte ? f.ouvert : f.ferme);
          planifier(bougerBouche, 90 + Math.random() * 110);
        }
        function taper() {
          if (fini) return;
          i++;
          tape.textContent = signes.slice(0, i).join('');
          reste.textContent = signes.slice(i).join('');
          if (i >= signes.length) { terminer(); return; }
          const c = signes[i - 1];
          const pause = '.?!\u2026\u3002\uff01\uff1f'.indexOf(c) !== -1 ? PAUSE_FORTE : (',;:\uff0c\u3001'.indexOf(c) !== -1 ? PAUSE_FAIBLE : 0);
          planifier(taper, VITESSE_TEXTE + pause);
        }
        bulle.addEventListener('click', clic);
        if (f.ferme) bougerBouche();
        if (sauter || reduit) { i = signes.length - 1; }
        taper();
      });
    }
    function reveler(id) { bouton[id].classList.remove('kbm-entree-cachee'); }
    async function visite() {
      menu.classList.remove('mns-off');
      menu.classList.add('mns-menu-visible');
      exprimer('heureuse', 400);
      await attendre(500);
      passer.addEventListener('click', function () {
        sauter = true;
        if (avancerCourant) avancerCourant();
      });
      passer.classList.add('mns-passer-visible');
      await dire(T('bekIntro'), 'heureuse');
      const etapes = [
        { id: 'histoires', texte: 'bekHistoires' },
        { id: 'parametres', texte: 'bekParametres' },
        { id: 'prives', texte: 'bekPrives' }
      ];
      for (let k = 0; k < etapes.length && !sauter; k++) {
        const b = bouton[etapes[k].id];
        reveler(etapes[k].id);
        b.classList.add('mns-actif');
        await dire(T(etapes[k].texte), 'tendue');
        b.classList.remove('mns-actif');
      }
      passer.classList.remove('mns-passer-visible');
      etapes.forEach(function (e) { reveler(e.id); bouton[e.id].classList.remove('mns-actif'); });
      await dire(T('bekFin'), 'heureuse', { sansSuite: true });
      activerMenu();
    }
    function activerMenu() {
      Object.keys(bouton).forEach(function (id) {
        const b = bouton[id];
        b.classList.remove('mns-inactif');
        b.removeAttribute('tabindex');
      });
      bouton.histoires.addEventListener('click', function () { if (typeof callbacks.onHistoires === 'function') callbacks.onHistoires(); });
      bouton.prives.addEventListener('click', function () { if (typeof callbacks.onPrives === 'function') callbacks.onPrives(); });
      bouton.parametres.addEventListener('click', ouvrirParametres);
      planifier(function () { bouton.histoires.focus({ preventScroll: true }); }, 300);
    }

    // ---------- 3. Les paramètres (vrais et faux) ----------
    function ouvrirParametres() {
      const prog = window.KebBekProgression || null;
      const connecte = !!(prog && typeof prog.estInvite === 'function' && !prog.estInvite() && prog.session);
      const lignes = [];
      lignes.push({ id: 'son', nom: T('paramSon') });
      if (typeof callbacks.onChangerLangue === 'function') lignes.push({ id: 'langue', nom: T('paramLangue') });
      if (connecte || typeof callbacks.onCreerCompte === 'function') lignes.push({ id: 'compte', nom: T('paramCompte') });
      lignes.push({ id: 'autorisation', nom: T('paramAutorisation') });

      const f = creerFenetre(
        entete('<span class="mns-icone" aria-hidden="true">' + svg('parametres', 'mns-icone-svg') + '</span>', T('paramTitre'), 'mnsParamTitre') +
        '<div class="mns-reglages">' +
          lignes.map(function (l) {
            return '<div class="mns-reglage" data-id="' + l.id + '">' +
              '<div class="mns-reglage-info"><span class="mns-reglage-nom">' + echapper(l.nom) + '</span><span class="mns-reglage-etat"></span></div>' +
              '<button type="button" class="lect-btn lect-btn-clair mns-reglage-btn"></button>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="lect-boutons"><button type="button" class="lect-btn mns-param-fermer">' + echapper(T('fermer')) + '</button></div>',
        'mns-carte-param');
      f.carte.setAttribute('aria-labelledby', 'mnsParamTitre');
      function ligne(id) {
        const el = f.carte.querySelector('.mns-reglage[data-id="' + id + '"]');
        return el ? { etat: el.querySelector('.mns-reglage-etat'), btn: el.querySelector('.mns-reglage-btn') } : null;
      }
      function fermerParametres() { document.removeEventListener('keydown', surTouche); f.fermer(); bouton.parametres.focus({ preventScroll: true }); }
      function surTouche(e) { if (e.key === 'Escape') fermerParametres(); }
      document.addEventListener('keydown', surTouche);
      f.carte.querySelector('.mns-param-fermer').addEventListener('click', fermerParametres);
      f.voile.addEventListener('click', function (e) { if (e.target === f.voile) fermerParametres(); });

      // — Son (vrai) —
      const son = ligne('son');
      function rafraichirSon() {
        const actif = lireSon();
        son.etat.textContent = actif ? T('sonOui') : T('sonNon');
        son.btn.textContent = actif ? T('sonCouper') : T('sonActiver');
      }
      rafraichirSon();
      son.btn.addEventListener('click', function () { ecrireSon(!lireSon()); rafraichirSon(); });

      // — Langue (vrai, seulement si la page hôte sait changer de langue) —
      const lg = ligne('langue');
      if (lg) {
        lg.etat.textContent = langue.toUpperCase();
        lg.btn.textContent = T('paramChanger');
        lg.btn.addEventListener('click', function () { fermerParametres(); callbacks.onChangerLangue(); });
      }

      // — Compte (vrai) —
      const cp = ligne('compte');
      if (cp) {
        cp.etat.textContent = connecte ? T('compteConnecte') : T('compteInvite');
        cp.btn.textContent = connecte ? T('deconnexion') : T('creerCompte');
        cp.btn.addEventListener('click', async function () {
          if (connecte) {
            cp.btn.disabled = true;
            cp.btn.textContent = T('enCours');
            try { if (prog && prog.deconnecter) await prog.deconnecter(); } catch (e) { console.warn('Déconnexion échouée.', e); }
            window.location.reload();
          } else {
            fermerParametres();
            callbacks.onCreerCompte();
          }
        });
      }

      // — Autorisation du Lecteur (FAUX : le retrait échoue toujours) —
      const au = ligne('autorisation');
      function rafraichirAutorisation() {
        const accordee = lireAutorisation();
        au.etat.textContent = accordee ? T('autoAccordee') : T('autoRefusee');
        au.btn.textContent = accordee ? T('retirer') : T('accorder');
      }
      rafraichirAutorisation();
      au.btn.addEventListener('click', function () {
        au.btn.disabled = true;
        au.btn.textContent = T('enCours');
        planifier(async function () {
          const excuses = T('excuses');
          const texte = Array.isArray(excuses) ? excuses[numeroExcuse++ % excuses.length] : '';
          await fenetre({ titre: T('erreurTitre'), texte: texte, boutons: [{ label: T('ok'), valeur: 'ok' }] });
          rafraichirAutorisation();     // rien n'a changé
          au.btn.disabled = false;
          au.btn.focus({ preventScroll: true });
        }, reduit ? 0 : DUREE_ENCOURS);
      });
      planifier(function () { son.btn.focus({ preventScroll: true }); }, 350);
    }

    // ---------- Lancement ----------
    async function lancer(etat) {
      creerPoses(etat || {});
      if (avecPermission) await phasePermission();
      if (arrete) return;
      await visite();
    }
    precharger(POSES, urlImage).then(function (etat) { if (!arrete) lancer(etat); });

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  window.KebBekMenuSimple = { demarrerMenuSimple: demarrerMenuSimple, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
