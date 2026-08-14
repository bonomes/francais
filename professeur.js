/* ==================================================================
   professeur.js — module autonome de l'écran "Mode professeur", même
   patron d'architecture que menu-principal.js/identite-eleve.js :
   window.KebBekProfesseur.demarrerEcranProfesseur(idConteneur, callbacks)
   rend tout l'écran dans le conteneur donné, communique avec la page
   hôte uniquement via callbacks — ce module ne navigue nulle part
   lui-même et ne connaît rien de la structure de la page.

   Ce que fait cet écran (premier jet, session du 13-08-2026) :
     1. Recherche d'un élève par courriel de compte (lier_eleve_par_courriel)
        — retourne la ligne eleves si trouvée, sinon message clair (élève
        introuvable, ou courriel appartenant à plusieurs profils — cas
        "un parent, plusieurs enfants", pas géré ici pour l'instant, voir
        note plus bas).
     2. Attribution d'un succès à l'élève trouvé (attribuer_recompense_enseignant)
        — liste de succès CODÉE EN DUR (SUCCES_DISPONIBLES ci-dessous),
        décision de Raphaël (session du 13-08-2026) : le catalogue de
        succès grandit "au cas par cas", en parallèle des leçons, au même
        rythme que le code front — une vraie table Supabase serait un
        aller-retour de plus à chaque nouvelle leçon, pour un gain nul
        tant que la liste reste courte. Migrer vers une table si/quand
        cette liste devient longue (30-40+ entrées).

   Suppose window.KebBekProgression (progression.js) déjà chargé ET déjà
   authentifié comme compte enseignant reconnu (voir essayerModeProfesseur
   dans progression.js, appelé par menu-principal.js avant même d'afficher
   le bouton "Mode professeur" qui mène ici) — ce module réutilise le
   CLIENT Supabase déjà connecté (progression.client), n'en crée jamais un
   nouveau. Si progression absent ou pas de session : rend un message
   d'erreur sobre plutôt qu'un écran cassé (même philosophie que le mode
   dégradé de menu-principal.js).

   ⚠️ POINT OUVERT — "un parent, plusieurs enfants" (voir COMPTES_ELEVES) :
   lier_eleve_par_courriel(p_courriel_eleve) prend le courriel du COMPTE,
   pas de l'élève individuellement, et retourne UNE seule ligne eleves
   côté SQL (retour USER-DEFINED eleves, pas SETOF). Si un compte a
   plusieurs profils élèves, le comportement exact (quel profil revient ?)
   dépend de la fonction SQL elle-même, pas de ce module — à vérifier
   côté Raphaël si ce cas se présente en pratique. Pas bloquant pour
   l'instant (aucun compte multi-profils dans les données actuelles).
   ================================================================== */

(function () {

  // ---------- Catalogue des succès (codé en dur, voir note en tête) ----------
  // Chaque entrée : id (correspond au succes_id stocké côté Supabase,
  // texte libre — AUCUNE validation serveur ne garantit la cohérence,
  // donc cette liste EST la source de vérité), nom affiché, et valeurs
  // par défaut de récompense (modifiables par le prof avant d'attribuer,
  // les paramètres p_piasses/p_points_bonis de attribuer_recompense_enseignant
  // acceptent n'importe quelle valeur, pas seulement ces défauts).
  //
  // 🆕 Ajouter une entrée ici à chaque nouvelle leçon qui introduit un
  // nouveau succès — même geste que l'ajout de la leçon elle-même.
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

        '<div class="kbp-section kbp-section-cachee" id="kbpSectionEleve">' +
          '<div class="kbp-fiche-eleve" id="kbpFicheEleve"></div>' +

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

    // ---------- Recherche élève ----------
    let eleveTrouve = null; // { id, prenom, niveau, piasses, points_bonis, ... }
    const champCourriel = document.getElementById('kbpCourriel');
    const messageRecherche = document.getElementById('kbpMessageRecherche');
    const sectionEleve = document.getElementById('kbpSectionEleve');
    const ficheEleve = document.getElementById('kbpFicheEleve');
    const btnChercher = document.getElementById('kbpBtnChercher');

    async function chercherEleve() {
      const courriel = champCourriel.value.trim();
      messageRecherche.textContent = '';
      messageRecherche.className = 'kbp-message';
      if (!courriel) {
        messageRecherche.textContent = 'Entre un courriel d\u2019abord.';
        messageRecherche.classList.add('kbp-message-erreur');
        return;
      }
      btnChercher.disabled = true;
      btnChercher.textContent = 'Recherche\u2026';
      try {
        const { data, error } = await client.rpc('lier_eleve_par_courriel', { p_courriel_eleve: courriel });
        if (error || !data) {
          eleveTrouve = null;
          sectionEleve.classList.add('kbp-section-cachee');
          messageRecherche.textContent = '\u00c9l\u00e8ve introuvable pour ce courriel.';
          messageRecherche.classList.add('kbp-message-erreur');
          return;
        }
        eleveTrouve = data;
        rendreFicheEleve();
        sectionEleve.classList.remove('kbp-section-cachee');
        messageRecherche.textContent = '';
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

    function rendreFicheEleve() {
      if (!eleveTrouve) return;
      ficheEleve.innerHTML =
        '<p class="kbp-fiche-nom">' + (eleveTrouve.prenom || 'Sans pr\u00e9nom') + '</p>' +
        '<p class="kbp-fiche-detail">Niveau ' + (eleveTrouve.niveau != null ? eleveTrouve.niveau : '\u2014') +
          ' \u00b7 ' + (eleveTrouve.piasses != null ? eleveTrouve.piasses : 0) + ' P$' +
          ' \u00b7 ' + (eleveTrouve.points_bonis != null ? eleveTrouve.points_bonis : 0) + ' PB</p>';
    }

    // ---------- Attribution ----------
    const btnAttribuer = document.getElementById('kbpBtnAttribuer');
    const messageAttribution = document.getElementById('kbpMessageAttribution');

    btnAttribuer.addEventListener('click', async function () {
      if (!eleveTrouve) return;
      const succesId = selectSucces.value;
      const piasses = parseInt(document.getElementById('kbpPiasses').value, 10) || 0;
      const pointsBonis = parseInt(document.getElementById('kbpPointsBonis').value, 10) || 0;
      const note = document.getElementById('kbpNote').value.trim() || null;

      messageAttribution.textContent = '';
      messageAttribution.className = 'kbp-message';
      btnAttribuer.disabled = true;
      btnAttribuer.textContent = 'Attribution\u2026';
      try {
        const { data, error } = await client.rpc('attribuer_recompense_enseignant', {
          p_eleve_id: eleveTrouve.id,
          p_succes_id: succesId,
          p_piasses: piasses,
          p_points_bonis: pointsBonis,
          p_note: note
        });
        if (error || !data) {
          messageAttribution.textContent = 'L\u2019attribution a \u00e9chou\u00e9 \u2014 r\u00e9essaie.';
          messageAttribution.classList.add('kbp-message-erreur');
          return;
        }
        // Mise à jour optimiste des soldes affichés — pas de nouvel aller-
        // retour réseau juste pour ça, le prof voit l'effet immédiatement.
        eleveTrouve.piasses = (eleveTrouve.piasses || 0) + piasses;
        eleveTrouve.points_bonis = (eleveTrouve.points_bonis || 0) + pointsBonis;
        rendreFicheEleve();
        messageAttribution.textContent = 'Succ\u00e8s attribu\u00e9 \u2713';
        messageAttribution.classList.add('kbp-message-succes');
      } catch (e) {
        console.warn('professeur.js : attribution a \u00e9chou\u00e9.', e);
        messageAttribution.textContent = 'Erreur \u2014 r\u00e9essaie.';
        messageAttribution.classList.add('kbp-message-erreur');
      } finally {
        btnAttribuer.disabled = false;
        btnAttribuer.textContent = 'Attribuer';
      }
    });
  }

  window.KebBekProfesseur = { demarrerEcranProfesseur };
})();
