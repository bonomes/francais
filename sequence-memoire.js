/* ==================================================================
   sequence-memoire.js — la toute première mémoire : « Je parle français ».

   🆕 (18-10-2026) Suite directe de sequence-lecteur.js. Après la plongée
   (callbacks.onMemoire du réveil), on est DANS le souvenir :

     1. Bek parle, mais sa bulle est vide : seulement des cases pointillées.
     2. Les mots arrivent en bas, isolés, dans des cases (« tuiles »).
        Toucher une tuile en montre le sens (dans la langue de l'élève) ;
        la toucher une 2e fois l'envoie dans la prochaine case libre de la
        bulle. (Au survol à la souris, le sens s'affiche tout de suite et un
        seul clic suffit.) Mauvais mot : la tuile se secoue et revient ;
        après deux erreurs, la bonne tuile se met à briller.
     3. Trois tours, de moins en moins aidés :
          tour 1 — « Je parle » déjà en place, il manque « français » ;
          tour 2 — seul « Je » est en place ;
          tour 3 — rien n'est en place, plus une tuile en trop (« parles »).
     4. Souvenir reconstitué : on SORT de la page-mémoire (le fond chaud se
        retire) et on retrouve Bek, restée concentrée, qui s'exclame
        « Je parle français ! » (en français) puis « …mais c'est tout ce dont
        je me souviens. » (dans la langue de l'élève). Le Lecteur propose
        enfin d'en retrouver d'autres, puis callbacks.onTermine().

   Aucune « corruption » du texte : c'est une seule bonne mémoire, et c'est
   l'élève qui la reconstruit.

   🚧 Dictionnaire réduit à fr / en / es (repli : en, puis fr) — à étendre
   aux 19 langues avant mise en ligne. Les 4 mots affichés sont les mêmes
   pour tous ; seul leur SENS est traduit (clés sens_*).

   🎨 Réutilise le gabarit de Bek de sequence-reveil-bek.css (.rbek-fond,
   .rbek-pose, .rbek-bulle…) pour garder exactement la même taille, la même
   position et le même style ; et l'icône du Lecteur de sequence-lecteur.js.

   @param {string} idConteneur
   @param {object} options : langue, sources (surcharge des noms d'images),
                             dossierImages, extension
   @param {object} callbacks : onTermine()
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];

  // La phrase à reconstruire, et tous les mots possibles (y compris le piège).
  const PHRASE = ['je', 'parle', 'francais'];
  const MOTS = {
    je: 'Je', parle: 'parle', francais: 'fran\u00e7ais', parles: 'parles'
  };
  // `places` = indices des mots déjà en place au début du tour.
  const TOURS = [
    { places: [0, 1], distracteurs: [] },
    { places: [0],    distracteurs: [] },
    { places: [],     distracteurs: ['parles'] }
  ];

  const DICO = {
    fr: {
      sens_je: 'moi', sens_parle: '(moi) parler', sens_francais: 'la langue fran\u00e7aise', sens_parles: '(toi) parler',
      bekFin: '\u2026mais c\u2019est tout ce dont je me souviens.',
      lecteurFin: 'Il doit y en avoir d\u2019autres\u2026 Je peux t\u2019aider \u00e0 les retrouver.',
      suite: 'Suite'
    },
    en: {
      sens_je: 'I', sens_parle: '(I) speak', sens_francais: 'French', sens_parles: '(you) speak',
      bekFin: '\u2026but that\u2019s all I remember.',
      lecteurFin: 'There must be more\u2026 I can help you find them.',
      suite: 'Next'
    },
    es: {
      sens_je: 'yo', sens_parle: '(yo) hablo', sens_francais: 'franc\u00e9s', sens_parles: '(t\u00fa) hablas',
      bekFin: '\u2026pero eso es todo lo que recuerdo.',
      lecteurFin: 'Debe de haber m\u00e1s\u2026 Puedo ayudarte a encontrarlos.',
      suite: 'Siguiente'
    }
  };

  // Noms réels des fichiers (dossier images/reveil/) — mêmes entrées que la
  // table de index.html ; options.sources peut les surcharger.
  const SOURCES_PAR_DEFAUT = {
    'bek-heureuse-ferme':   'images/reveil/bek_heureuse_bouche-fermee_01-01.webp',
    'bek-heureuse-ouvert':  'images/reveil/bek_heureuse_bouche-ouverte_01-01.webp',
    'bek-concentree-ferme': 'images/reveil/bek_concentree_bouche-fermee_01-01.webp',
    'bek-concentree-ouvert':'images/reveil/bek_concentree_bouche-ouverte_01-01.webp',
    'bek-perplexe-05':      'images/reveil/bek-perplexe_05-01.webp',
    'bek-perplexe-06':      'images/reveil/bek-perplexe_06-01.webp',
    'bek-soulagee':         'images/reveil/bek-interpellee-soulagee_01-01.webp'
  };
  const POSES = [
    'bek-heureuse-ferme', 'bek-heureuse-ouvert', 'bek-concentree-ferme', 'bek-concentree-ouvert',
    'bek-perplexe-05', 'bek-perplexe-06', 'bek-soulagee'
  ];
  const EXPRESSIONS = {
    heureuse: { ferme: 'bek-heureuse-ferme',   ouvert: 'bek-heureuse-ouvert',   repli: 'bek-soulagee' },
    effort:   { ferme: 'bek-concentree-ferme', ouvert: 'bek-concentree-ouvert', repli: 'bek-perplexe-06' },
    triste:   { fixe: 'bek-perplexe-05' }
  };

  const VITESSE_TEXTE = 32;
  const PAUSE_FORTE = 260;
  const PAUSE_FAIBLE = 130;

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
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
  function melanger(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function demarrerMemoire(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const langue = langueActuelle(options);
    function T(cle) {
      return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
    }
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});
    const dossier = (options.dossierImages || 'images/reveil/').replace(/\/?$/, '/');
    const ext = options.extension || '.webp';
    function urlImage(nom) { return sources[nom] || (dossier + nom + ext); }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';

    let arrete = false;
    let niveau = 1;
    let courante = null;
    let verrou = true;          // vrai tant que l'élève ne peut pas jouer
    let selection = null;       // tuile dont le sens est affiché
    let erreurs = 0;
    const minuteurs = [];
    const poses = {};

    function planifier(fn, ms) {
      const id = setTimeout(function () { if (!arrete) fn(); }, ms);
      minuteurs.push(id);
      return id;
    }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, ms); }); }

    // ---------- Gabarit ----------
    // Le fond « souvenir » reprend EXACTEMENT le dégradé de l'iris de la
    // plongée (.rbek-plongee) : aucun saut visuel au passage d'une scène à l'autre.
    conteneur.innerHTML =
      '<div class="rbek-scene mem-scene mem-souvenir" style="opacity:1;transition:none">' +
        '<div class="mem-fond-souvenir"></div>' +
        '<div class="mem-grain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="rbek-fond mem-bek-fond" role="img" aria-label="Bek">' +
          '<div class="rbek-zoom"><div class="rbek-bek"></div></div>' +
        '</div>' +
        '<div class="mem-cadre" aria-hidden="true"></div>' +
        '<div class="rbek-bulle rbek-bulle-cachee" aria-live="polite">' +
          '<div class="mem-phrase"></div>' +
          '<p class="rbek-bulle-texte mem-cache"><span class="rbek-tape"></span><span class="rbek-reste"></span></p>' +
          '<button type="button" class="rbek-fleche" tabindex="-1" aria-label="' + echapper(T('suite')) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="mem-plateau" role="group"></div>' +
        '<div class="mem-sens" aria-hidden="true"></div>' +
        (iconeLecteur ? '<div class="mem-lecteur mem-lecteur-cache" aria-hidden="true">' + iconeLecteur + '</div>' : '') +
        (iconeLecteur ? '<div class="mem-lb mem-lb-cachee"><p class="mem-lb-texte"></p>' +
          '<button type="button" class="mem-lb-fleche" aria-label="' + echapper(T('suite')) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>' : '') +
      '</div>';

    const scene = conteneur.querySelector('.mem-scene');
    const bek = conteneur.querySelector('.rbek-bek');
    const bulle = conteneur.querySelector('.rbek-bulle');
    const phrase = conteneur.querySelector('.mem-phrase');
    const bulleTexte = conteneur.querySelector('.rbek-bulle-texte');
    const bulleTape = conteneur.querySelector('.rbek-tape');
    const bulleReste = conteneur.querySelector('.rbek-reste');
    const fleche = conteneur.querySelector('.rbek-fleche');
    const plateau = conteneur.querySelector('.mem-plateau');
    const sens = conteneur.querySelector('.mem-sens');
    const lecteurEl = conteneur.querySelector('.mem-lecteur');
    const lb = conteneur.querySelector('.mem-lb');
    if (LANGUES_POLICE_SYSTEME.indexOf(langue) !== -1) scene.classList.add('mem-police-systeme');

    // ---------- Poses de Bek (même logique que sequence-reveil-bek.js) ----------
    function montrer(nom) {
      const cible = poses[nom];
      if (!cible || cible === courante) return;
      cible.style.transitionDuration = '0ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      const ancienne = courante;
      courante = cible;
      if (ancienne) ancienne.classList.remove('rbek-pose-visible');
    }
    function disponible(nom) { return !!(nom && poses[nom]); }
    function formes(exp) {
      const e = EXPRESSIONS[exp];
      if (disponible(e.ferme) && disponible(e.ouvert)) return { ferme: e.ferme, ouvert: e.ouvert };
      return { fixe: [e.fixe, e.ferme, e.repli, 'bek-soulagee'].find(disponible) };
    }
    function exprimer(exp) { const f = formes(exp); montrer(f.ferme || f.fixe); }

    // Bek « dit » un mot : la bouche bat un court instant (irrégulier).
    function parlerPendant(exp, ms) {
      const f = formes(exp);
      if (!f.ferme) return Promise.resolve();
      const fin = Date.now() + ms;
      return new Promise(function (resolve) {
        let ouverte = false;
        (function battre() {
          if (Date.now() >= fin) { montrer(f.ferme); resolve(); return; }
          ouverte = !ouverte;
          montrer(ouverte ? f.ouvert : f.ferme);
          planifier(battre, 90 + Math.random() * 110);
        })();
      });
    }

    // ---------- Étincelles ----------
    function etincelles(el, n, large) {
      const rs = scene.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const cx = r.left - rs.left + r.width / 2;
      const cy = r.top - rs.top + r.height / 2;
      for (let i = 0; i < n; i++) {
        const e = document.createElement('span');
        e.className = 'mem-etincelle';
        const angle = Math.random() * Math.PI * 2;
        const dist = (large ? 70 : 34) + Math.random() * (large ? 90 : 36);
        e.style.left = cx + 'px';
        e.style.top = cy + 'px';
        e.style.setProperty('--dx', Math.round(Math.cos(angle) * dist) + 'px');
        e.style.setProperty('--dy', Math.round(Math.sin(angle) * dist) + 'px');
        e.style.animationDelay = Math.round(Math.random() * 120) + 'ms';
        scene.appendChild(e);
        planifier(function () { if (e.parentNode) e.parentNode.removeChild(e); }, 1000);
      }
    }

    // ---------- La bulle : cases de la phrase ----------
    function construirePhrase(tour) {
      phrase.innerHTML = '';
      PHRASE.forEach(function (id, i) {
        const c = document.createElement('span');
        c.className = 'mem-case';
        c.dataset.id = id;
        c.innerHTML = '<span class="mem-mot">' + echapper(MOTS[id]) + '</span>';
        if (tour.places.indexOf(i) !== -1) c.classList.add('mem-case-pleine', 'mem-case-donnee');
        phrase.appendChild(c);
      });
      majSuivante();
    }
    function prochainVide() { return phrase.querySelector('.mem-case:not(.mem-case-pleine)'); }
    function majSuivante() {
      Array.prototype.forEach.call(phrase.querySelectorAll('.mem-case-suivante'), function (x) { x.classList.remove('mem-case-suivante'); });
      const s = prochainVide();
      if (s) s.classList.add('mem-case-suivante');
    }

    // ---------- Le plateau : tuiles de mots ----------
    function construirePlateau(tour) {
      plateau.innerHTML = '';
      plateau.classList.remove('mem-plateau-vide', 'mem-plateau-sorti');
      const manquants = PHRASE.filter(function (id, i) { return tour.places.indexOf(i) === -1; });
      const base = manquants.concat(tour.distracteurs || []);
      let ordre = melanger(base);
      for (let essai = 0; essai < 12 && ordre.length > 1 && ordre.join() === base.join(); essai++) ordre = melanger(base);
      ordre.forEach(function (id, i) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'mem-tuile mem-entree-cachee';
        b.dataset.id = id;
        b.textContent = MOTS[id];
        plateau.appendChild(b);
        planifier(function () { b.classList.remove('mem-entree-cachee'); }, 80 + i * 90);
      });
    }

    // ---------- Le sens d'un mot (étiquette qui glisse d'une tuile à l'autre) ----------
    function montrerSens(t) {
      t.dataset.vu = '1';
      sens.textContent = T('sens_' + t.dataset.id);
      const rs = scene.getBoundingClientRect();
      const r = t.getBoundingClientRect();
      const largeur = sens.offsetWidth;
      const centre = r.left - rs.left + r.width / 2;
      const x = Math.max(largeur / 2 + 10, Math.min(rs.width - largeur / 2 - 10, centre));
      sens.style.left = x + 'px';
      sens.style.top = (r.top - rs.top - 10) + 'px';
      sens.style.setProperty('--dx', Math.round(centre - x) + 'px');
      sens.classList.add('mem-sens-visible');
    }
    function cacherSens() { sens.classList.remove('mem-sens-visible'); }
    function selectionner(t) {
      if (selection && selection !== t) selection.classList.remove('mem-tuile-choisie');
      selection = t;
      t.classList.add('mem-tuile-choisie');
      montrerSens(t);
    }
    function deselectionner() {
      if (selection) selection.classList.remove('mem-tuile-choisie');
      selection = null;
      cacherSens();
    }

    plateau.addEventListener('click', function (e) {
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (!t || verrou || t.classList.contains('mem-tuile-partie')) return;
      // 1er toucher : on montre le sens ; 2e toucher (ou survol déjà fait) : on place
      if (t.dataset.vu !== '1') { selectionner(t); return; }
      placer(t);
    });
    plateau.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse' || verrou) return;
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (t && !t.classList.contains('mem-tuile-partie')) montrerSens(t);
    });
    plateau.addEventListener('pointerout', function (e) {
      if (e.pointerType !== 'mouse') return;
      const t = e.target.closest ? e.target.closest('.mem-tuile') : null;
      if (!t) return;
      if (selection) montrerSens(selection); else cacherSens();
    });

    // ---------- Placer un mot ----------
    function lecteurReagit(classe, duree) {
      if (!lecteurEl) return;
      lecteurEl.classList.remove('mem-lecteur-saut', 'mem-lecteur-oups');
      void lecteurEl.offsetWidth;
      lecteurEl.classList.add(classe);
      planifier(function () { lecteurEl.classList.remove(classe); }, duree);
    }

    function erreur(t) {
      t.classList.remove('mem-secoue');
      void t.offsetWidth;
      t.classList.add('mem-secoue');
      lecteurReagit('mem-lecteur-oups', 500);
      erreurs++;
      if (erreurs >= 2) {
        const cible = prochainVide();
        const bonne = cible && plateau.querySelector('.mem-tuile[data-id="' + cible.dataset.id + '"]:not(.mem-tuile-partie)');
        if (bonne) bonne.classList.add('mem-indice');
      }
    }

    function voler(t, cible) {
      return new Promise(function (resolve) {
        const rs = scene.getBoundingClientRect();
        const rt = t.getBoundingClientRect();
        const rc = cible.getBoundingClientRect();
        const clone = t.cloneNode(true);
        clone.classList.remove('mem-tuile-choisie', 'mem-indice', 'mem-entree-cachee');
        clone.classList.add('mem-vol');
        clone.style.left = (rt.left - rs.left) + 'px';
        clone.style.top = (rt.top - rs.top) + 'px';
        clone.style.width = rt.width + 'px';
        clone.style.height = rt.height + 'px';
        scene.appendChild(clone);
        t.classList.add('mem-tuile-partie');
        const dx = (rc.left + rc.width / 2) - (rt.left + rt.width / 2);
        const dy = (rc.top + rc.height / 2) - (rt.top + rt.height / 2);
        void clone.offsetWidth;
        const duree = reduit ? 0 : 520;
        clone.style.transition = 'transform ' + duree + 'ms cubic-bezier(.25,.9,.3,1.12)';
        clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        planifier(function () {
          if (clone.parentNode) clone.parentNode.removeChild(clone);
          resolve();
        }, duree + 30);
      });
    }

    function placer(t) {
      const cible = prochainVide();
      if (!cible) return;
      if (t.dataset.id !== cible.dataset.id) { erreur(t); return; }
      verrou = true;
      t.classList.remove('mem-indice');
      deselectionner();
      voler(t, cible).then(function () {
        cible.classList.add('mem-case-pleine', 'mem-case-pop');
        cible.classList.remove('mem-case-suivante');
        etincelles(cible, 7, false);
        erreurs = 0;
        majSuivante();
        if (!prochainVide()) { tourReussi(); return; }
        parlerPendant('heureuse', 260);
        verrou = false;
      });
    }

    // ---------- Fin de tour / tours suivants ----------
    let numeroTour = 0;
    async function tourReussi() {
      // les tuiles restantes (le « piège ») s'effacent : la phrase est complète
      Array.prototype.forEach.call(plateau.querySelectorAll('.mem-tuile:not(.mem-tuile-partie)'), function (t) {
        t.classList.add('mem-tuile-efface');
      });
      bulle.classList.add('mem-reussi');
      lecteurReagit('mem-lecteur-saut', 650);
      parlerPendant('heureuse', 900);
      await attendre(1300);
      bulle.classList.remove('mem-reussi');
      if (numeroTour + 1 < TOURS.length) {
        numeroTour++;
        phrase.classList.add('mem-phrase-sort');
        plateau.classList.add('mem-plateau-vide');
        await attendre(380);
        construirePhrase(TOURS[numeroTour]);
        phrase.classList.remove('mem-phrase-sort');
        construirePlateau(TOURS[numeroTour]);
        erreurs = 0;
        verrou = false;
      } else {
        await restauration();
      }
    }

    // ---------- Dialogue en texte (même mécanique que sequence-reveil-bek.js) ----------
    function dire(texte, exp, opts) {
      opts = opts || {};
      return new Promise(function (resolve) {
        const f = formes(exp);
        montrer(f.ferme || f.fixe);
        bek.classList.toggle('rbek-respire', !f.ferme);
        phrase.classList.add('mem-cache');
        bulleTexte.classList.remove('mem-cache');
        bulle.classList.remove('rbek-bulle-cachee');
        const signes = Array.from(texte);
        let i = 0, fini = false, ouverte = false;
        bulleTape.textContent = '';
        bulleReste.textContent = texte;

        function terminer() {
          if (fini) return;
          fini = true;
          bulle.removeEventListener('click', terminer);
          bulleTape.textContent = texte;
          bulleReste.textContent = '';
          if (f.ferme) montrer(f.ferme);
          bek.classList.remove('rbek-respire');
          planifier(attendreSuite, 300);
        }
        function attendreSuite() {
          let avance = false;
          function avancer() {
            if (avance) return;
            avance = true;
            bulle.removeEventListener('click', avancer);
            bulle.classList.remove('rbek-bulle-suite');
            planifier(resolve, 150);
          }
          bulle.classList.add('rbek-bulle-suite');
          bulle.addEventListener('click', avancer);
          fleche.addEventListener('click', avancer, { once: true });
        }
        function bougerBouche() {
          if (fini) return;
          ouverte = !ouverte;
          montrer(ouverte ? f.ouvert : f.ferme);
          planifier(bougerBouche, 90 + Math.random() * 110);
        }
        function taper() {
          if (fini) return;
          i++;
          bulleTape.textContent = signes.slice(0, i).join('');
          bulleReste.textContent = signes.slice(i).join('');
          if (i >= signes.length) { terminer(); return; }
          const c = signes[i - 1];
          const pause = '.?!\u2026\u3002\uff01\uff1f'.indexOf(c) !== -1 ? PAUSE_FORTE : (',;:\uff0c\u3001'.indexOf(c) !== -1 ? PAUSE_FAIBLE : 0);
          planifier(taper, VITESSE_TEXTE + pause);
        }
        bulle.addEventListener('click', terminer);
        if (f.ferme) bougerBouche();
        taper();
      });
    }

    // Réplique du Lecteur (bulle propre, en bas à gauche)
    function direLecteur(texte) {
      return new Promise(function (resolve) {
        if (!lb) { resolve(); return; }
        lb.querySelector('.mem-lb-texte').textContent = texte;
        lb.classList.remove('mem-lb-cachee');
        const btn = lb.querySelector('.mem-lb-fleche');
        planifier(function () { btn.focus({ preventScroll: true }); }, 500);
        btn.addEventListener('click', function () {
          lb.classList.add('mem-lb-cachee');
          planifier(resolve, 300);
        }, { once: true });
      });
    }

    // ---------- Souvenir reconstitué : on sort de la mémoire ----------
    async function restauration() {
      scene.classList.add('mem-restauree');
      etincelles(bulle, 22, true);
      await parlerPendant('heureuse', 1100);
      await attendre(300);

      plateau.classList.add('mem-plateau-sorti');
      bulle.classList.add('rbek-bulle-cachee');
      cacherSens();
      await attendre(500);

      // le fond chaud se retire : on revient à Bek, concentrée
      scene.classList.remove('mem-souvenir');
      exprimer('effort');
      await attendre(1200);

      await dire('Je parle fran\u00e7ais\u00a0!', 'heureuse');
      await dire(T('bekFin'), 'triste');
      bulle.classList.add('rbek-bulle-cachee');
      await attendre(400);

      if (lecteurEl) await direLecteur(T('lecteurFin'));
      if (typeof callbacks.onTermine === 'function') {
        try { callbacks.onTermine(); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    // ================= Démarrage =================
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return;
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        bek.appendChild(img);
        poses[nom] = img;
      });
    }
    async function lancer(etat) {
      if (arrete) return;
      creerPoses(etat || {});
      exprimer('heureuse');
      scene.classList.add('mem-prete');
      await attendre(650);
      bulle.classList.remove('rbek-bulle-cachee');
      construirePhrase(TOURS[0]);
      if (lecteurEl) planifier(function () { lecteurEl.classList.remove('mem-lecteur-cache'); }, 300);
      await attendre(700);
      construirePlateau(TOURS[0]);
      await attendre(500);
      verrou = false;
    }

    if (options.precharger === false) lancer({});
    else precharger(POSES, urlImage).then(lancer);

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
      }
    };
  }

  window.KebBekMemoire = { demarrerMemoire: demarrerMemoire, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
