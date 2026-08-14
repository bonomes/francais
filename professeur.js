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
        cocher (🆕 session du 13-08-2026, demande de Raphaël) : utile à la
        fois pour "un compte, plusieurs enfants" ET pour "une classe de
        plusieurs élèves reçoit le même succès en même temps" (dans ce
        second cas, en pratique, le prof fait une recherche par courriel
        pour chaque élève avant de les avoir tous dans la sélection —
        cet écran ne cherche qu'un compte à la fois, voir limite plus
        bas). Un seul profil trouvé = sélectionné automatiquement, aucun
        clic de plus requis (cas le plus fréquent).
     3. Attribution d'un succès à TOUS les profils sélectionnés d'un coup
        (attribuer_recompense_enseignant, une fois par profil) — liste de
        succès CODÉE EN DUR (SUCCES_DISPONIBLES ci-dessous), décision de
        Raphaël (session du 13-08-2026) : le catalogue grandit "au cas
        par cas", en parallèle des leçons, au même rythme que le code
        front — une vraie table Supabase serait un aller-retour de plus
        à chaque nouvelle leçon, pour un gain nul tant que la liste reste
        courte. Migrer vers une table si/quand elle devient longue
        (30-40+ entrées).

   ⚠️ LIMITE CONNUE : la sélection multiple ne couvre que les profils
   d'UN SEUL courriel recherché à la fois — pas encore un "panier" qui
   accumulerait des élèves de plusieurs courriels différents d'une
   recherche à l'autre. Pour une classe de plusieurs FAMILLES différentes
   recevant le même succès, il faut donc répéter recherche+attribution
   par courriel pour l'instant. Un vrai panier cumulatif entre recherches
   est possible plus tard si ce besoin devient fréquent en pratique — pas
   construit maintenant, pour ne pas complexifier un premier jet avant de
   savoir si c'est vraiment nécessaire.

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
    let eleveSelection = []; // tableau de profils eleves sélectionnés — jamais un seul objet, même quand il n'y en a qu'un, pour que l'attribution n'ait qu'un seul chemin de code (une boucle) au lieu de deux.
    const champCourriel = document.getElementById('kbpCourriel');
    const messageRecherche = document.getElementById('kbpMessageRecherche');
    const sectionEleve = document.getElementById('kbpSectionEleve');
    const sectionChoix = document.getElementById('kbpSectionChoix');
    const listeChoix = document.getElementById('kbpListeChoix');
    const fichesEleves = document.getElementById('kbpFichesEleves');
    const btnChercher = document.getElementById('kbpBtnChercher');
    const btnConfirmerChoix = document.getElementById('kbpBtnConfirmerChoix');

    async function chercherEleve() {
      const courriel = champCourriel.value.trim();
      messageRecherche.textContent = '';
      messageRecherche.className = 'kbp-message';
      sectionChoix.classList.add('kbp-section-cachee');
      sectionEleve.classList.add('kbp-section-cachee');
      eleveSelection = [];
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
          // Un seul profil : sélection directe, aucun clic de plus.
          eleveSelection = [profils[0]];
          rendreFichesEleves();
          sectionEleve.classList.remove('kbp-section-cachee');
        } else {
          // Plusieurs profils (parent, plusieurs enfants) : cases à
          // cocher — toutes décochées par défaut, le prof choisit qui
          // reçoit l'attribution (un seul enfant, ou les deux à la fois).
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
            '<span class="kbp-choix-nom">' + (p.prenom || 'Sans pr\u00e9nom') + '</span>' +
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
      eleveSelection = Array.prototype.map.call(cases, function (c) {
        return profils[parseInt(c.dataset.index, 10)];
      });
      messageRecherche.textContent = '';
      rendreFichesEleves();
      sectionChoix.classList.add('kbp-section-cachee');
      sectionEleve.classList.remove('kbp-section-cachee');
    });

    // Affiche une petite fiche par profil sélectionné (nom + solde) —
    // plusieurs cartes empilées si sélection multiple, une seule sinon.
    function rendreFichesEleves() {
      fichesEleves.innerHTML = eleveSelection.map(function (el) {
        return '<div class="kbp-fiche-eleve" data-eleve-id="' + el.id + '">' +
          '<p class="kbp-fiche-nom">' + (el.prenom || 'Sans pr\u00e9nom') + '</p>' +
          '<p class="kbp-fiche-detail">Niveau ' + (el.niveau != null ? el.niveau : '\u2014') +
            ' \u00b7 ' + (el.piasses != null ? el.piasses : 0) + ' P$' +
            ' \u00b7 ' + (el.points_bonis != null ? el.points_bonis : 0) + ' PB</p>' +
        '</div>';
      }).join('');
    }

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
