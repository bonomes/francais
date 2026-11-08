/* ==================================================================
   professeur.js — module autonome de l'écran "Mode professeur", même
   patron d'architecture que menu-principal.js/identite-eleve.js :
   window.KebBekProfesseur.demarrerEcranProfesseur(idConteneur, callbacks)
   rend tout l'écran dans le conteneur donné, communique avec la page
   hôte uniquement via callbacks — ce module ne navigue nulle part
   lui-même et ne connaît rien de la structure de la page.

   Ce que fait cet écran :
     1. Recherche par courriel de compte (lier_eleve_par_courriel, retourne
        TOUS les profils élèves de ce compte — un compte-parent peut en
        avoir plusieurs, voir migration Supabase du 13-08-2026).
     2. Sélection d'UN OU PLUSIEURS profils parmi les résultats — cases à
        cocher (session du 13-08-2026, demande de Raphaël) : utile à la
        fois pour "un compte, plusieurs enfants" ET pour "une classe de
        plusieurs élèves reçoit le même succès en même temps". Un seul
        profil trouvé = ajouté automatiquement au panier, aucun clic de
        plus requis (cas le plus fréquent).
     3. 🆕 PANIER CUMULATIF (session du 14-08-2026, ex-limite connue
        levée) : chaque recherche AJOUTE au panier plutôt que de le
        remplacer — le prof peut chercher plusieurs courriels différents
        à la suite (plusieurs familles d'une même classe) et les
        retrouver tous ensemble avant d'attribuer. Le champ courriel se
        vide après chaque ajout pour enchaîner directement sur la
        recherche suivante. Déduplication par id de profil : chercher
        deux fois le même courriel, ou le même élève via deux comptes
        différents (improbable mais pas impossible), ne le duplique
        jamais dans le panier. Chaque fiche du panier a un petit bouton
        "Retirer" pour corriger une erreur de sélection sans tout
        recommencer.
     4. Attribution d'un succès à TOUS les profils du panier d'un coup
        (attribuer_recompense_enseignant, une fois par profil) — liste de
        succès CODÉE EN DUR (SUCCES_DISPONIBLES ci-dessous), décision de
        Raphaël (session du 13-08-2026) : le catalogue grandit "au cas
        par cas", en parallèle des leçons, au même rythme que le code
        front — une vraie table Supabase serait un aller-retour de plus
        à chaque nouvelle leçon, pour un gain nul tant que la liste reste
        courte. Migrer vers une table si/quand elle devient longue
        (30-40+ entrées).

     5. 🆕 RÉSULTATS D'ÉPREUVE (08-11-2026) : chaque fiche du panier a un bouton « Résultats » qui lit la dernière passation de l'élève
        (lire_epreuves_enseignant : l'élève doit être lié à ce compte enseignant, ce qui est le cas dès qu'il est dans le panier). On y voit le bilan,
        chaque question avec la réponse donnée et son statut, les boutons « Copier » (question + réponse, ou tout) et un commentaire du professeur
        (commenter_epreuve), gardé avec la passation et effacé si l'élève la refait. Les textes de l'élève sont toujours échappés avant affichage.

   Suppose window.KebBekProgression (progression.js) déjà chargé ET déjà
   authentifié comme compte enseignant reconnu (voir essayerModeProfesseur
   dans progression.js, appelé par menu-principal.js avant même d'afficher
   le bouton "Mode professeur" qui mène ici) — ce module réutilise le
   CLIENT Supabase déjà connecté (progression.client), n'en crée jamais un
   nouveau. Si progression absent ou pas de session : rend un message
   d'erreur sobre plutôt qu'un écran cassé (même philosophie que le mode
   dégradé de menu-principal.js).
   ================================================================== */

(function () {

  // ---------- Catalogue des succès (codé en dur, voir note en tête) ----------
  const SUCCES_DISPONIBLES = [
    { id: 'd1_clic_sandwich', nom: 'D1 — A trouvé le sandwich', piasses: 5, pointsBonis: 0 }
  ];

  // 🆕 Épreuves lisibles par le professeur : id (resultats_epreuves.epreuve_id) → titre affiché
  const EPREUVES = { m1_epreuve: 'Première mémoire \u2014 L\u2019\u00e9preuve' };
  const STATUTS = {
    ok: ['Correct', 'ok'], presque: ['Presque (accent ou apostrophe)', 'presque'], partiel: ['Partiel', 'presque'],
    non: ['Incorrect', 'non'], libre: ['R\u00e9ponse libre', 'libre'], passe: ['Pass\u00e9e', 'non']
  };
  const TYPES = { dictee: 'Dict\u00e9e', image: 'Question sur image', comprehension: 'Compr\u00e9hension', libre: 'Question libre', defi: 'D\u00e9fi' };

  // Tout texte venant d'un élève (prénom, réponses) passe par là avant d'entrer dans du HTML.
  function echapper(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function texteAttendu(a) { return Array.isArray(a) ? a.join(' / ') : (a == null ? '' : String(a)); }
  function copierTexte(texte) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(texte);
    return new Promise(function (resolve, reject) {
      const t = document.createElement('textarea');
      t.value = texte; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? resolve() : reject(new Error('copie refus\u00e9e')); } catch (e) { reject(e); } finally { document.body.removeChild(t); }
    });
  }

  // ---------- Rendu ----------

  function demarrerEcranProfesseur(idConteneur, callbacks) {
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) { console.warn('professeur.js : conteneur introuvable.', idConteneur); return; }

    const progression = window.KebBekProgression || null;
    const client = progression ? progression.client : null;

    // Mode dégradé : pas de client Supabase authentifié disponible. Ne
    // devrait normalement jamais arriver (menu-principal.js ne montre le
    // bouton qui mène ici qu'après un essayerModeProfesseur() réussi),
    // mais ce module ne suppose jamais que l'appelant a fait les choses
    // dans le bon ordre — filet de sécurité, même philosophie que le
    // reste du site.
    if (!client) {
      conteneur.innerHTML =
        '<div class="kbp-carte">' +
          '<p class="kbp-erreur">Le mode professeur n\u2019est pas disponible pour l\u2019instant (session non reconnue). Reviens au menu et r\u00e9essaie.</p>' +
          '<button type="button" class="kbp-bouton-retour" id="kbpBtnRetourErreur">Retour au menu</button>' +
        '</div>';
      brancherRetour();
      return;
    }

    conteneur.innerHTML =
      '<div class="kbp-carte">' +
        '<div class="kbp-entete">' +
          '<h2 class="kbp-titre">Mode professeur</h2>' +
          '<button type="button" class="kbp-bouton-retour" id="kbpBtnRetour">&larr; Retour</button>' +
        '</div>' +

        '<div class="kbp-section">' +
          '<label class="kbp-etiquette" for="kbpCourriel">Courriel du compte \u00e9l\u00e8ve</label>' +
          '<div class="kbp-ligne-recherche">' +
            '<input type="email" id="kbpCourriel" class="kbp-champ" placeholder="eleve@exemple.com" autocomplete="off">' +
            '<button type="button" class="kbp-bouton-action" id="kbpBtnChercher">Chercher</button>' +
          '</div>' +
          '<p class="kbp-message" id="kbpMessageRecherche"></p>' +
        '</div>' +

        '<div class="kbp-section kbp-section-cachee" id="kbpSectionChoix">' +
          '<p class="kbp-etiquette">Plusieurs profils trouv\u00e9s pour ce courriel \u2014 coche celui ou ceux \u00e0 s\u00e9lectionner :</p>' +
          '<div class="kbp-liste-choix" id="kbpListeChoix"></div>' +
          '<button type="button" class="kbp-bouton-action" id="kbpBtnConfirmerChoix">Confirmer la s\u00e9lection</button>' +
        '</div>' +

        '<div class="kbp-section kbp-section-cachee" id="kbpSectionEleve">' +
          '<div class="kbp-fiches-eleves" id="kbpFichesEleves"></div>' +

          '<label class="kbp-etiquette" for="kbpSucces">Succ\u00e8s \u00e0 attribuer</label>' +
          '<select id="kbpSucces" class="kbp-champ"></select>' +

          '<div class="kbp-ligne-valeurs">' +
            '<label class="kbp-etiquette-inline">P$ <input type="number" id="kbpPiasses" class="kbp-champ-court" min="0"></label>' +
            '<label class="kbp-etiquette-inline">PB <input type="number" id="kbpPointsBonis" class="kbp-champ-court" min="0"></label>' +
          '</div>' +

          '<label class="kbp-etiquette" for="kbpNote">Note (optionnelle, visible dans l\u2019historique)</label>' +
          '<textarea id="kbpNote" class="kbp-champ kbp-champ-note" rows="2"></textarea>' +

          '<button type="button" class="kbp-bouton-action kbp-bouton-attribuer" id="kbpBtnAttribuer">Attribuer</button>' +
          '<p class="kbp-message" id="kbpMessageAttribution"></p>' +
        '</div>' +
      '</div>';

    // ---------- Retour ----------
    function brancherRetour() {
      const btn = document.getElementById('kbpBtnRetourErreur') || document.getElementById('kbpBtnRetour');
      if (btn && typeof callbacks.onRetour === 'function') {
        btn.addEventListener('click', callbacks.onRetour);
      }
    }
    brancherRetour();

    // ---------- Session de classe (navigation partagée) ----------
    // 🆕 (14-08-2026, suite) : RETIRÉE d'ici — cette section faisait
    // doublon avec le widget flottant "Cours en direct"
    // (widget-session-prof.js), désormais présent sur toutes les pages,
    // y compris celle-ci. Un seul endroit gère la session de classe
    // maintenant ; cet écran se concentre sur la recherche/attribution
    // de succès (voir sa propre note de tête, point 1-4).

    // ---------- Liste des succès ----------
    const selectSucces = document.getElementById('kbpSucces');
    SUCCES_DISPONIBLES.forEach(function (s) {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.nom;
      selectSucces.appendChild(opt);
    });

    function appliquerDefautsSucces() {
      const s = SUCCES_DISPONIBLES.find(function (x) { return x.id === selectSucces.value; });
      if (!s) return;
      document.getElementById('kbpPiasses').value = s.piasses;
      document.getElementById('kbpPointsBonis').value = s.pointsBonis;
    }
    selectSucces.addEventListener('change', appliquerDefautsSucces);
    if (SUCCES_DISPONIBLES.length > 0) appliquerDefautsSucces();

    // ---------- Recherche + sélection (0, 1, ou plusieurs profils) ----------
    // Panier cumulatif de profils sélectionnés — jamais un seul objet,
    // même quand il n'y en a qu'un, pour que l'attribution n'ait qu'un
    // seul chemin de code (une boucle) au lieu de deux. 🆕 Persiste
    // maintenant à travers plusieurs recherches successives (14-08-2026)
    // — voir ajouterAuPanier() ; n'est vidé que par un retrait manuel
    // (bouton "Retirer" sur une fiche) ou en quittant l'écran.
    let eleveSelection = [];
    const champCourriel = document.getElementById('kbpCourriel');
    const messageRecherche = document.getElementById('kbpMessageRecherche');
    const sectionEleve = document.getElementById('kbpSectionEleve');
    const sectionChoix = document.getElementById('kbpSectionChoix');
    const listeChoix = document.getElementById('kbpListeChoix');
    const fichesEleves = document.getElementById('kbpFichesEleves');
    const btnChercher = document.getElementById('kbpBtnChercher');
    const btnConfirmerChoix = document.getElementById('kbpBtnConfirmerChoix');

    // Ajoute des profils au panier existant (jamais un remplacement) —
    // déduplication par id, pour qu'une recherche répétée du même
    // courriel (ou un même élève retrouvé via deux recherches) ne crée
    // jamais de doublon dans le panier. Retourne le nombre de profils
    // réellement ajoutés (utile pour distinguer « déjà dans le panier »
    // d'un vrai ajout dans le message affiché au prof).
    function ajouterAuPanier(profils) {
      let ajoutes = 0;
      profils.forEach(function (p) {
        if (!eleveSelection.some(function (el) { return el.id === p.id; })) {
          eleveSelection.push(p);
          ajoutes++;
        }
      });
      return ajoutes;
    }

    async function chercherEleve() {
      const courriel = champCourriel.value.trim();
      messageRecherche.textContent = '';
      messageRecherche.className = 'kbp-message';
      sectionChoix.classList.add('kbp-section-cachee');
      // 🆕 Panier cumulatif (14-08-2026) : eleveSelection n'est PLUS
      // vidé ici — chaque recherche s'ajoute au panier existant plutôt
      // que de l'écraser. sectionEleve reste affichée si le panier
      // contient déjà des profils d'une recherche précédente.
      if (!courriel) {
        messageRecherche.textContent = 'Entre un courriel d\u2019abord.';
        messageRecherche.classList.add('kbp-message-erreur');
        return;
      }
      btnChercher.disabled = true;
      btnChercher.textContent = 'Recherche\u2026';
      try {
        const { data, error } = await client.rpc('lier_eleve_par_courriel', { p_courriel_eleve: courriel });
        if (error) {
          messageRecherche.textContent = 'Erreur de recherche \u2014 r\u00e9essaie.';
          messageRecherche.classList.add('kbp-message-erreur');
          return;
        }
        const profils = data || [];
        if (profils.length === 0) {
          messageRecherche.textContent = '\u00c9l\u00e8ve introuvable pour ce courriel.';
          messageRecherche.classList.add('kbp-message-erreur');
        } else if (profils.length === 1) {
          // Un seul profil : ajout direct au panier, aucun clic de plus.
          const ajoutes = ajouterAuPanier(profils);
          rendreFichesEleves();
          sectionEleve.classList.remove('kbp-section-cachee');
          champCourriel.value = '';
          champCourriel.focus();
          if (ajoutes === 0) {
            messageRecherche.textContent = 'D\u00e9j\u00e0 dans la s\u00e9lection.';
          }
        } else {
          // Plusieurs profils (parent, plusieurs enfants) : cases à
          // cocher — toutes décochées par défaut, le prof choisit qui
          // reçoit l'attribution (un seul enfant, ou les deux à la fois).
          // Le panier existant (d'une recherche précédente) n'est pas
          // touché tant que le prof n'a pas confirmé ce nouveau choix.
          rendreListeChoix(profils);
          sectionChoix.classList.remove('kbp-section-cachee');
        }
      } catch (e) {
        console.warn('professeur.js : chercherEleve a \u00e9chou\u00e9.', e);
        messageRecherche.textContent = 'Erreur de recherche \u2014 r\u00e9essaie.';
        messageRecherche.classList.add('kbp-message-erreur');
      } finally {
        btnChercher.disabled = false;
        btnChercher.textContent = 'Chercher';
      }
    }
    btnChercher.addEventListener('click', chercherEleve);
    champCourriel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') chercherEleve();
    });

    // Formatte une date ISO en jj/mm/aaaa, sobrement — assez pour
    // distinguer deux profils du même prénom (« créé le 12/03/2026 »),
    // pas une horloge précise dont personne n'a besoin ici.
    function formaterDate(iso) {
      if (!iso) return '';
      const d = new Date(iso);
      if (isNaN(d)) return '';
      return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    }

    function rendreListeChoix(profils) {
      listeChoix.innerHTML = '';
      profils.forEach(function (p, i) {
        const idCase = 'kbpChoix' + i;
        const item = document.createElement('label');
        item.className = 'kbp-choix-item';
        item.setAttribute('for', idCase);
        item.innerHTML =
          '<input type="checkbox" id="' + idCase + '" class="kbp-choix-case" data-index="' + i + '">' +
          '<span class="kbp-choix-texte">' +
            '<span class="kbp-choix-nom">' + echapper(p.prenom || 'Sans pr\u00e9nom') + '</span>' +
            '<span class="kbp-choix-detail">cr\u00e9\u00e9 le ' + formaterDate(p.cree_le) + ' \u00b7 niveau ' + (p.niveau != null ? p.niveau : '\u2014') + '</span>' +
          '</span>';
        listeChoix.appendChild(item);
      });
      // Stocké sur l'élément pour que btnConfirmerChoix retrouve les
      // profils correspondant aux cases cochées sans dépendance externe.
      listeChoix._profils = profils;
    }

    btnConfirmerChoix.addEventListener('click', function () {
      const profils = listeChoix._profils || [];
      const cases = listeChoix.querySelectorAll('.kbp-choix-case:checked');
      if (cases.length === 0) {
        messageRecherche.textContent = 'Coche au moins un profil.';
        messageRecherche.classList.add('kbp-message-erreur');
        return;
      }
      const choisis = Array.prototype.map.call(cases, function (c) {
        return profils[parseInt(c.dataset.index, 10)];
      });
      // 🆕 Panier cumulatif : ajoute au panier existant plutôt que de
      // l'écraser (même logique que le cas "un seul profil" ci-dessus).
      ajouterAuPanier(choisis);
      messageRecherche.textContent = '';
      rendreFichesEleves();
      sectionChoix.classList.add('kbp-section-cachee');
      sectionEleve.classList.remove('kbp-section-cachee');
      champCourriel.value = '';
      champCourriel.focus();
    });

    // Affiche une petite fiche par profil du panier (nom + solde), avec
    // un bouton "Retirer" pour corriger une erreur de sélection sans
    // devoir tout recommencer — plusieurs cartes empilées si panier à
    // plusieurs profils, une seule sinon.
    // 🆕 Résultats d'épreuve : cache par profil (lecture à la demande, jamais en tâche de fond) + profils dont le panneau est ouvert.
    const epreuvesParEleve = {};     // id → { etat: 'chargement' | 'erreur' | 'ok', lignes: [...] }
    const panneauxOuverts = {};      // id → true

    function htmlEpreuve(el, ep) {
      const titre = EPREUVES[ep.epreuve_id] || ep.epreuve_id;
      const liste = Array.isArray(ep.resultats) ? ep.resultats : [];
      const b = ep.bilan || {};
      const puces = ['ok', 'presque', 'partiel', 'non', 'libre', 'passe'].filter(function (k) { return b[k]; }).map(function (k) {
        return '<span class="kbp-puce kbp-puce-' + STATUTS[k][1] + '">' + b[k] + ' ' + echapper(STATUTS[k][0].split(' (')[0].toLowerCase()) + '</span>';
      }).join('');
      const questions = liste.map(function (r, i) {
        const st = STATUTS[r.statut] || [r.statut || '?', 'libre'];
        const attendu = (r.statut === 'non' || r.statut === 'partiel') && r.attendu ? '<p class="kbp-q-attendu">Attendu : ' + echapper(texteAttendu(r.attendu)) + '</p>' : '';
        const essais = r.essais > 1 ? ' \u00b7 ' + r.essais + ' essais' : '';
        return '<div class="kbp-question kbp-question-' + st[1] + '">' +
          '<p class="kbp-q-entete"><span class="kbp-q-type">' + echapper(TYPES[r.type] || r.type || '') + '</span><span class="kbp-q-statut">' + echapper(st[0]) + echapper(essais) + '</span></p>' +
          '<p class="kbp-q-texte">' + echapper(r.question) + '</p>' +
          '<p class="kbp-q-reponse">' + (r.reponse ? echapper(r.reponse) : '<em>\u2014</em>') + '</p>' + attendu +
          '<button type="button" class="kbp-bouton-copier" data-eleve-id="' + el.id + '" data-epreuve="' + echapper(ep.epreuve_id) + '" data-q="' + i + '">Copier</button>' +
        '</div>';
      }).join('');
      return '<div class="kbp-epreuve" data-epreuve="' + echapper(ep.epreuve_id) + '">' +
        '<p class="kbp-epreuve-titre">' + echapper(titre) + '</p>' +
        '<p class="kbp-epreuve-meta">Termin\u00e9e le ' + formaterDate(ep.termine_le) + ' \u00b7 passation n\u00b0 ' + (ep.passations || 1) + '</p>' +
        (puces ? '<div class="kbp-puces">' + puces + '</div>' : '') +
        questions +
        '<button type="button" class="kbp-bouton-copier kbp-copier-tout" data-eleve-id="' + el.id + '" data-epreuve="' + echapper(ep.epreuve_id) + '" data-q="tout">Tout copier</button>' +
        '<label class="kbp-etiquette" for="kbpCom-' + el.id + '-' + echapper(ep.epreuve_id) + '">Commentaire du professeur</label>' +
        '<textarea id="kbpCom-' + el.id + '-' + echapper(ep.epreuve_id) + '" class="kbp-champ kbp-champ-note kbp-commentaire" rows="2" maxlength="2000" data-eleve-id="' + el.id + '" data-epreuve="' + echapper(ep.epreuve_id) + '">' + echapper(ep.commentaire_prof || '') + '</textarea>' +
        '<button type="button" class="kbp-bouton-action kbp-bouton-commenter" data-eleve-id="' + el.id + '" data-epreuve="' + echapper(ep.epreuve_id) + '">Enregistrer le commentaire</button>' +
        '<p class="kbp-message kbp-message-com"></p>' +
      '</div>';
    }

    function htmlResultats(el) {
      if (!panneauxOuverts[el.id]) return '';
      const c = epreuvesParEleve[el.id];
      let corps;
      if (!c || c.etat === 'chargement') corps = '<p class="kbp-message">Chargement\u2026</p>';
      else if (c.etat === 'erreur') corps = '<p class="kbp-message kbp-message-erreur">Lecture impossible \u2014 r\u00e9essaie.</p>';
      else if (c.lignes.length === 0) corps = '<p class="kbp-message">Aucune \u00e9preuve termin\u00e9e pour l\u2019instant.</p>';
      else corps = c.lignes.map(function (ep) { return htmlEpreuve(el, ep); }).join('');
      return '<div class="kbp-resultats">' + corps + '</div>';
    }

    function rendreFichesEleves() {
      fichesEleves.innerHTML = eleveSelection.map(function (el) {
        const nom = echapper(el.prenom || 'Sans pr\u00e9nom');
        return '<div class="kbp-fiche-eleve" data-eleve-id="' + el.id + '">' +
          '<div class="kbp-fiche-entete">' +
            '<p class="kbp-fiche-nom">' + nom + '</p>' +
            '<button type="button" class="kbp-fiche-retirer" data-eleve-id="' + el.id + '" aria-label="Retirer ' + nom + ' de la s\u00e9lection">&times;</button>' +
          '</div>' +
          '<p class="kbp-fiche-detail">Niveau ' + (el.niveau != null ? el.niveau : '\u2014') +
            ' \u00b7 ' + (el.piasses != null ? el.piasses : 0) + ' P$' +
            ' \u00b7 ' + (el.points_bonis != null ? el.points_bonis : 0) + ' PB</p>' +
          '<button type="button" class="kbp-bouton-resultats" data-eleve-id="' + el.id + '" aria-expanded="' + (panneauxOuverts[el.id] ? 'true' : 'false') + '">' + (panneauxOuverts[el.id] ? 'Masquer les r\u00e9sultats' : 'R\u00e9sultats des \u00e9preuves') + '</button>' +
          htmlResultats(el) +
        '</div>';
      }).join('');
    }

    async function chargerResultats(id) {
      epreuvesParEleve[id] = { etat: 'chargement', lignes: [] };
      rendreFichesEleves();
      try {
        const { data, error } = await client.rpc('lire_epreuves_enseignant', { p_eleve_id: id });
        epreuvesParEleve[id] = error ? { etat: 'erreur', lignes: [] } : { etat: 'ok', lignes: data || [] };
        if (error) console.warn('professeur.js : lecture des \u00e9preuves refus\u00e9e.', error);
      } catch (e) {
        console.warn('professeur.js : lecture des \u00e9preuves a \u00e9chou\u00e9.', e);
        epreuvesParEleve[id] = { etat: 'erreur', lignes: [] };
      }
      rendreFichesEleves();
    }

    function texteQuestion(r) {
      const st = (STATUTS[r.statut] || [r.statut || ''])[0];
      return 'Question : ' + (r.question || '') + '\nR\u00e9ponse : ' + (r.reponse || '') + (r.statut && r.statut !== 'libre' ? '\n(' + st + ')' : '');
    }

    // Un seul écouteur délégué sur le conteneur des fiches plutôt qu'un
    // par bouton "Retirer" — rendreFichesEleves() réécrit tout le HTML
    // à chaque changement du panier (attribution, ajout), donc des
    // écouteurs individuels seraient reperdus à chaque rendu.
    fichesEleves.addEventListener('click', async function (e) {
      // 🆕 bouton « Résultats des épreuves » (ouvre / referme, lit à la première ouverture)
      const btnRes = e.target.closest('.kbp-bouton-resultats');
      if (btnRes) {
        const idR = btnRes.dataset.eleveId;
        panneauxOuverts[idR] = !panneauxOuverts[idR];
        if (panneauxOuverts[idR] && !epreuvesParEleve[idR]) { chargerResultats(idR); } else { rendreFichesEleves(); }
        return;
      }
      // 🆕 « Copier » (une question) / « Tout copier »
      const btnCopie = e.target.closest('.kbp-bouton-copier');
      if (btnCopie) {
        const c = epreuvesParEleve[btnCopie.dataset.eleveId];
        const ep = c && c.lignes.find(function (x) { return x.epreuve_id === btnCopie.dataset.epreuve; });
        if (!ep) return;
        const liste = Array.isArray(ep.resultats) ? ep.resultats : [];
        const eleve = eleveSelection.find(function (x) { return x.id === btnCopie.dataset.eleveId; });
        const texte = btnCopie.dataset.q === 'tout'
          ? (eleve && eleve.prenom ? eleve.prenom + ' \u2014 ' : '') + (EPREUVES[ep.epreuve_id] || ep.epreuve_id) + '\n\n' + liste.map(texteQuestion).join('\n\n')
          : texteQuestion(liste[parseInt(btnCopie.dataset.q, 10)] || {});
        const avant = btnCopie.textContent;
        try { await copierTexte(texte); btnCopie.textContent = 'Copi\u00e9 \u2713'; } catch (err) { btnCopie.textContent = 'Copie impossible'; }
        setTimeout(function () { btnCopie.textContent = avant; }, 1600);
        return;
      }
      // 🆕 commentaire du professeur
      const btnCom = e.target.closest('.kbp-bouton-commenter');
      if (btnCom) {
        const zone = btnCom.closest('.kbp-epreuve');
        const champ = zone.querySelector('.kbp-commentaire');
        const msg = zone.querySelector('.kbp-message-com');
        btnCom.disabled = true; msg.className = 'kbp-message kbp-message-com'; msg.textContent = '';
        try {
          const { data, error } = await client.rpc('commenter_epreuve', { p_eleve_id: btnCom.dataset.eleveId, p_epreuve_id: btnCom.dataset.epreuve, p_commentaire: champ.value });
          if (error || !data) { msg.textContent = 'Enregistrement impossible \u2014 r\u00e9essaie.'; msg.classList.add('kbp-message-erreur'); }
          else {
            const c = epreuvesParEleve[btnCom.dataset.eleveId];
            const ep = c && c.lignes.find(function (x) { return x.epreuve_id === btnCom.dataset.epreuve; });
            if (ep) ep.commentaire_prof = champ.value.trim() || null;
            msg.textContent = 'Commentaire enregistr\u00e9 \u2713'; msg.classList.add('kbp-message-succes');
          }
        } catch (err) { msg.textContent = 'Enregistrement impossible \u2014 r\u00e9essaie.'; msg.classList.add('kbp-message-erreur'); }
        btnCom.disabled = false;
        return;
      }
      const btn = e.target.closest('.kbp-fiche-retirer');
      if (!btn) return;
      const id = btn.dataset.eleveId;
      eleveSelection = eleveSelection.filter(function (el) { return el.id !== id; });
      delete epreuvesParEleve[id]; delete panneauxOuverts[id];
      rendreFichesEleves();
      if (eleveSelection.length === 0) {
        sectionEleve.classList.add('kbp-section-cachee');
      }
    });

    // ---------- Attribution (à tous les profils sélectionnés) ----------
    const btnAttribuer = document.getElementById('kbpBtnAttribuer');
    const messageAttribution = document.getElementById('kbpMessageAttribution');

    btnAttribuer.addEventListener('click', async function () {
      if (eleveSelection.length === 0) return;
      const succesId = selectSucces.value;
      const piasses = parseInt(document.getElementById('kbpPiasses').value, 10) || 0;
      const pointsBonis = parseInt(document.getElementById('kbpPointsBonis').value, 10) || 0;
      const note = document.getElementById('kbpNote').value.trim() || null;

      messageAttribution.textContent = '';
      messageAttribution.className = 'kbp-message';
      btnAttribuer.disabled = true;
      btnAttribuer.textContent = eleveSelection.length > 1 ? 'Attribution\u2026 (0/' + eleveSelection.length + ')' : 'Attribution\u2026';

      // Une attribution par profil sélectionné, en séquence (pas en
      // parallèle) — pour pouvoir afficher une vraie progression sur un
      // groupe (« 3/12 ») et éviter de saturer l'API si un jour une
      // classe entière est sélectionnée. Chaque échec individuel est
      // compté séparément : un profil qui échoue n'empêche pas les
      // suivants d'être traités.
      let reussites = 0;
      const echecs = [];
      for (let i = 0; i < eleveSelection.length; i++) {
        const el = eleveSelection[i];
        try {
          const { data, error } = await client.rpc('attribuer_recompense_enseignant', {
            p_eleve_id: el.id,
            p_succes_id: succesId,
            p_piasses: piasses,
            p_points_bonis: pointsBonis,
            p_note: note
          });
          if (error || !data) {
            echecs.push(el.prenom || el.id);
          } else {
            el.piasses = (el.piasses || 0) + piasses;
            el.points_bonis = (el.points_bonis || 0) + pointsBonis;
            reussites++;
          }
        } catch (e) {
          console.warn('professeur.js : attribution a \u00e9chou\u00e9 pour', el.id, e);
          echecs.push(el.prenom || el.id);
        }
        if (eleveSelection.length > 1) {
          btnAttribuer.textContent = 'Attribution\u2026 (' + (i + 1) + '/' + eleveSelection.length + ')';
        }
      }

      rendreFichesEleves();
      if (echecs.length === 0) {
        messageAttribution.textContent = reussites > 1
          ? 'Succ\u00e8s attribu\u00e9 \u00e0 ' + reussites + ' \u00e9l\u00e8ves \u2713'
          : 'Succ\u00e8s attribu\u00e9 \u2713';
        messageAttribution.classList.add('kbp-message-succes');
      } else if (reussites === 0) {
        messageAttribution.textContent = 'L\u2019attribution a \u00e9chou\u00e9 \u2014 r\u00e9essaie.';
        messageAttribution.classList.add('kbp-message-erreur');
      } else {
        messageAttribution.textContent = reussites + ' r\u00e9ussie(s), \u00e9chec pour : ' + echecs.join(', ');
        messageAttribution.classList.add('kbp-message-erreur');
      }
      btnAttribuer.disabled = false;
      btnAttribuer.textContent = 'Attribuer';
    });
  }

  window.KebBekProfesseur = { demarrerEcranProfesseur };
})();
