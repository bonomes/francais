/* ==================================================================
   widget-session-prof.js — widget flottant "Cours en direct", présent
   sur N'IMPORTE QUELLE page qui le charge (index.html, parcours.html,
   dialogue-d1.html, futures leçons), pas seulement l'écran "Mode
   professeur" (professeur.js). Objectif (Raphaël, 14-08-2026) :
   pouvoir démarrer/fermer une session et basculer le contrôle
   professeur↔élèves depuis n'importe quel écran, sans devoir revenir
   au menu principal.

   Ne fait AUCUNE UI de recherche/attribution de succès — ça reste le
   rôle exclusif de professeur.js (écran "Mode professeur" complet).
   Ce widget ne touche qu'à la session de classe elle-même (mêmes
   quatre opérations que la section "Session de classe" déjà présente
   dans professeur.js : démarrer, fermer, changerControle ×2) — logique
   volontairement dupliquée plutôt que partagée avec professeur.js,
   parce que ce dernier rend son bloc À L'INTÉRIEUR d'un conteneur
   fourni par la page hôte (demarrerEcranProfesseur(idConteneur, ...))
   alors que ce widget s'injecte LUI-MÊME dans <body>, sur n'importe
   quelle page, sans conteneur préexistant — deux contextes de rendu
   trop différents pour un seul bloc de code réutilisé proprement.

   Détection "ce compte est-il un prof reconnu" : AUCUNE vérification
   locale ne peut répondre à cette question (voir la note déjà écrite
   dans progression.js au-dessus de essayerModeProfesseur — la liste
   blanche des enseignants n'est pas lisible côté client). Ce widget
   délègue donc entièrement à progression.essayerModeProfesseur() :
   retourne null pour n'importe quel compte élève ou invité (cas normal,
   pas une erreur) — le widget ne s'affiche tout simplement jamais dans
   ce cas, sans aucun message.

   Suppose window.KebBekProgression ET window.KebBekSessionClasse déjà
   chargés, ET la page hôte déjà rendue à un point où
   progression.session est établie (après restaurerSessionEtProfil()
   ou équivalent) — appeler initialiser() plus tôt ne casse rien
   (essayerModeProfesseur() sort proprement si pas de session), mais
   ne montrera jamais le widget à un prof qui n'a pas encore été
   authentifié au moment de l'appel. Suppose aussi widget-session-prof.css
   chargé (styles kbw-*, absents sinon).
   ================================================================== */

(function () {

  let widgetDeja = false; // idempotence — une page qui appellerait initialiser() deux fois par erreur ne doit pas dupliquer le DOM

  async function initialiser() {
    if (widgetDeja) return;

    const progression = window.KebBekProgression || null;
    const sessionClasse = window.KebBekSessionClasse || null;
    if (!progression || !sessionClasse) return; // modules absents — dégradation silencieuse, même philosophie que le reste du site

    let profilProf;
    try {
      profilProf = await progression.essayerModeProfesseur();
    } catch (e) {
      return; // jamais d'exception qui remonte à la page hôte
    }
    if (!profilProf) return; // pas un compte prof — cas normal, écrasante majorité des appels

    widgetDeja = true;
    construireWidget(sessionClasse);
  }

  function construireWidget(sessionClasse) {
    const conteneur = document.createElement('div');
    conteneur.id = 'kbwWidget';
    conteneur.innerHTML =
      '<button type="button" class="kbw-pastille" id="kbwBtnPastille" aria-expanded="false">' +
        '<span class="kbw-point" id="kbwPoint"></span>' +
        '<span>Cours en direct</span>' +
      '</button>' +
      '<div class="kbw-panneau kbw-panneau-cachee" id="kbwPanneau">' +
        '<div class="kbw-entete">' +
          '<h2 class="kbw-titre">Session de classe</h2>' +
          '<button type="button" class="kbw-fermer-panneau" id="kbwBtnFermerPanneau" aria-label="Fermer">&times;</button>' +
        '</div>' +

        '<div id="kbwInactif">' +
          '<button type="button" class="kbw-bouton-action" id="kbwBtnDemarrer">D\u00e9marrer une session</button>' +
        '</div>' +

        '<div id="kbwActif" style="display:none">' +
          '<p class="kbw-code">Code \u00e0 partager : <strong id="kbwCode"></strong></p>' +
          '<div class="kbw-ligne-controle">' +
            '<button type="button" class="kbw-bouton-controle" id="kbwBtnControleProf" data-controle="professeur">Prof contr\u00f4le</button>' +
            '<button type="button" class="kbw-bouton-controle" id="kbwBtnControleEleves" data-controle="eleves">\u00c9l\u00e8ves contr\u00f4lent</button>' +
          '</div>' +

          // 🆕 (14-08-2026, sixième vague — "discussion de groupe", demande
          // de Raphaël) : grille montrant TOUS les élèves connectés en même
          // temps, sans avoir à cliquer un par un. Remplace l'ancienne
          // simple liste de pastilles (voir kbw-eleves-liste, conservée mais
          // masquée dans le HTML — cachée dès qu'au moins un élève est
          // connecté, voir rafraichirListeEleves()). Chaque tuile montre un
          // aperçu de ce que l'élève écrit EN CE MOMENT ; un clic ouvre le
          // détail complet (question posée, réponse en cours, et l'historique
          // des erreurs pour cet élève cette session-ci — voir kbw-erreurs).
          '<div class="kbw-eleves">' +
            '<div class="kbw-eleves-entete">' +
              '<p class="kbw-eleves-titre">\u00c9l\u00e8ves connect\u00e9s</p>' +
              '<span class="kbw-badge-erreurs kbw-badge-cachee" id="kbwBadgeErreursTotal"></span>' +
            '</div>' +
            '<p class="kbw-eleves-vide" id="kbwElevesVide">Personne pour l\u2019instant.</p>' +
            '<div class="kbw-grille-eleves" id="kbwGrilleEleves"></div>' +
          '</div>' +

          '<div class="kbw-activite kbw-activite-cachee" id="kbwActivite">' +
            '<div class="kbw-activite-entete">' +
              '<p class="kbw-activite-nom" id="kbwActiviteNom"></p>' +
              '<button type="button" class="kbw-fermer-panneau" id="kbwBtnFermerActivite" aria-label="Fermer">&times;</button>' +
            '</div>' +
            '<p class="kbw-activite-question" id="kbwActiviteQuestion"></p>' +
            '<p class="kbw-activite-detail" id="kbwActiviteDetail"></p>' +
            '<div class="kbw-erreurs" id="kbwErreurs"></div>' +
          '</div>' +

          '<button type="button" class="kbw-bouton-fermer-session" id="kbwBtnFermerSession">Fermer la session</button>' +
        '</div>' +

        '<p class="kbw-message" id="kbwMessage"></p>' +
      '</div>';
    document.body.appendChild(conteneur);

    const btnPastille = document.getElementById('kbwBtnPastille');
    const panneau = document.getElementById('kbwPanneau');
    const btnFermerPanneau = document.getElementById('kbwBtnFermerPanneau');
    const point = document.getElementById('kbwPoint');
    const blocInactif = document.getElementById('kbwInactif');
    const blocActif = document.getElementById('kbwActif');
    const codeSpan = document.getElementById('kbwCode');
    const btnDemarrer = document.getElementById('kbwBtnDemarrer');
    const btnControleProf = document.getElementById('kbwBtnControleProf');
    const btnControleEleves = document.getElementById('kbwBtnControleEleves');
    const btnFermerSession = document.getElementById('kbwBtnFermerSession');
    const message = document.getElementById('kbwMessage');
    const elevesVide = document.getElementById('kbwElevesVide');
    const grilleEleves = document.getElementById('kbwGrilleEleves');
    const badgeErreursTotal = document.getElementById('kbwBadgeErreursTotal');
    const blocActivite = document.getElementById('kbwActivite');
    const activiteNom = document.getElementById('kbwActiviteNom');
    const activiteQuestion = document.getElementById('kbwActiviteQuestion');
    const activiteDetail = document.getElementById('kbwActiviteDetail');
    const blocErreurs = document.getElementById('kbwErreurs');
    const btnFermerActivite = document.getElementById('kbwBtnFermerActivite');

    let session = null; // ligne sessions_classe courante, ou null

    // ---------- Ouverture / fermeture du panneau ----------
    btnPastille.addEventListener('click', function () {
      const ouvert = !panneau.classList.contains('kbw-panneau-cachee');
      panneau.classList.toggle('kbw-panneau-cachee', ouvert);
      btnPastille.setAttribute('aria-expanded', String(!ouvert));
    });
    btnFermerPanneau.addEventListener('click', function () {
      panneau.classList.add('kbw-panneau-cachee');
      btnPastille.setAttribute('aria-expanded', 'false');
    });
    // Clic à l'extérieur du widget = referme le panneau (jamais un clic
    // À L'INTÉRIEUR, y compris sur la pastille elle-même — son propre
    // écouteur gère déjà ce cas juste au-dessus).
    document.addEventListener('click', function (e) {
      if (panneau.classList.contains('kbw-panneau-cachee')) return;
      if (conteneur.contains(e.target)) return;
      panneau.classList.add('kbw-panneau-cachee');
      btnPastille.setAttribute('aria-expanded', 'false');
    });

    // ---------- Affichage selon l'état ----------
    function rafraichirBoutonsControle() {
      if (!session) return;
      btnControleProf.classList.toggle('kbw-bouton-controle-actif', session.controle === 'professeur');
      btnControleEleves.classList.toggle('kbw-bouton-controle-actif', session.controle === 'eleves');
    }

    function afficherSessionActive() {
      blocInactif.style.display = 'none';
      blocActif.style.display = '';
      codeSpan.textContent = session.code;
      point.classList.add('kbw-point-actif');
      rafraichirBoutonsControle();
      sessionClasse.ecouterActiviteEleves(session.id, { onListe: majListeEleves });
    }

    function afficherAucuneSession() {
      session = null;
      blocActif.style.display = 'none';
      blocInactif.style.display = '';
      point.classList.remove('kbw-point-actif');
      sessionClasse.arreterEcouteActivite();
      elevesConnus = [];
      eleveVisualiseId = null;
      erreursParEleve = {}; // 🆕 fin de session — l'historique d'erreurs n'a plus de sens à garder
      rafraichirGrilleEleves();
      rafraichirBadgeTotal();
      cacherActivite();
    }

    // ---------- Élèves connectés (Presence) — "discussion de groupe" ----------
    // 🆕 (14-08-2026, troisième vague, puis sixième vague — demande de
    // Raphaël) : une GRILLE affiche TOUS les élèves connectés en même
    // temps (aperçu de ce qu'ils écrivent), plus besoin de cliquer un par
    // un pour suivre l'ensemble de la classe. Un clic sur une tuile ouvre
    // le détail complet (question posée + historique des erreurs de cet
    // élève cette session-ci). Aucune écriture en base — tout repose sur
    // Presence (voir ecouterActiviteEleves dans session-classe.js) SAUF
    // l'historique des erreurs, qui est reconstitué et gardé en mémoire
    // ICI, côté widget (voir erreursParEleve plus bas) — Presence étant un
    // état instantané (remplacé à chaque annonce, jamais cumulé côté
    // serveur), une erreur disparaîtrait sinon dès que l'élève reprend un
    // exercice suivant. Portée volontairement limitée à la session en
    // cours (perdu si le prof recharge la page) : Raphaël veut pouvoir
    // consulter l'erreur PENDANT que le cours tourne, pas un historique
    // permanent — ça resterait à faire séparément (table en base) si
    // besoin plus tard.
    let elevesConnus = []; // [{id, prenom, etat}]
    let eleveVisualiseId = null;
    let erreursParEleve = {}; // { [id]: [{question, reponse_donnee, reponse_correcte, ts, vue}] }

    // Aperçu COURT pour une tuile de la grille — une ligne, sans détail.
    function apercuCourt(etat) {
      if (!etat) return 'Navigation libre\u2026';
      if (etat.reponse_en_cours) return '\u00ab\u00a0' + etat.reponse_en_cours + '\u00a0\u00bb';
      if (etat.reponse_en_cours === '') return '\u2026';
      if (etat.section === 'exercices') return 'Exercices';
      if (etat.section === 'dialogue' && typeof etat.etape === 'number') return '\u00c9tape ' + (etat.etape + 1);
      return 'En le\u00e7on';
    }

    // Traduit l'`etat` libre annoncé par une page de leçon (ex.
    // {page:'dialogues/d1/', section:'dialogue', etape:2} ou
    // {page:'dialogues/d1/', section:'exercices'}) en une phrase lisible,
    // pour le panneau de détail (pas la tuile — voir apercuCourt).
    function formaterActivite(etat) {
      if (!etat) return 'Navigation libre (menu, parcours\u2026)';
      let nomLecon = etat.page || null;
      const correspondance = nomLecon && nomLecon.match(/dialogues\/d(\d+)\//);
      if (correspondance) nomLecon = 'Dialogue ' + correspondance[1];
      if (etat.reponse_en_cours !== undefined && etat.reponse_en_cours !== null) {
        return (nomLecon || 'Le\u00e7on') + ' \u2014 en train d\u2019\u00e9crire : \u00ab\u00a0' +
          (etat.reponse_en_cours || '\u2026') + '\u00a0\u00bb';
      }
      if (etat.section === 'exercices') return (nomLecon || 'Le\u00e7on') + ' \u2014 exercices';
      if (etat.section === 'dialogue' && typeof etat.etape === 'number') {
        return (nomLecon || 'Le\u00e7on') + ' \u2014 \u00e9tape ' + (etat.etape + 1);
      }
      return nomLecon || 'En le\u00e7on';
    }

    // Nombre d'erreurs PAS ENCORE consultées pour un élève (ou au total,
    // sans argument) — alimente les badges (pastille de tuile + en-tête).
    function nbErreursNonVues(id) {
      const source = id
        ? (erreursParEleve[id] || [])
        : Object.keys(erreursParEleve).reduce(function (acc, k) { return acc.concat(erreursParEleve[k]); }, []);
      return source.filter(function (e) { return !e.vue; }).length;
    }

    function rafraichirBadgeTotal() {
      const total = nbErreursNonVues();
      badgeErreursTotal.textContent = total ? String(total) : '';
      badgeErreursTotal.classList.toggle('kbw-badge-cachee', total === 0);
    }

    function cacherActivite() {
      blocActivite.classList.add('kbw-activite-cachee');
      eleveVisualiseId = null;
    }

    function afficherActivite(eleve) {
      eleveVisualiseId = eleve.id;
      activiteNom.textContent = eleve.prenom;
      const question = eleve.etat && eleve.etat.question;
      activiteQuestion.textContent = question ? 'Question : ' + question : '';
      activiteQuestion.style.display = question ? '' : 'none';
      activiteDetail.textContent = formaterActivite(eleve.etat);

      // Historique des erreurs de CET élève — les marque vues en les
      // ouvrant (fait disparaître les badges, mais garde la liste visible
      // ici : consulter une erreur ne doit pas la faire disparaître du
      // panneau, seulement du compteur "non lu").
      const erreurs = erreursParEleve[eleve.id] || [];
      blocErreurs.innerHTML = '';
      erreurs.slice().reverse().forEach(function (err) { // plus récente en premier
        err.vue = true;
        const carte = document.createElement('div');
        carte.className = 'kbw-erreur-carte';
        const q = document.createElement('p');
        q.className = 'kbw-erreur-question';
        q.textContent = err.question || 'Question';
        const rep = document.createElement('p');
        rep.className = 'kbw-erreur-reponses';
        rep.innerHTML = '<span class="kbw-erreur-fautive">' + escHtml(err.reponse_donnee || '\u2014') +
          '</span> \u2192 <span class="kbw-erreur-correcte">' + escHtml(err.reponse_correcte || '') + '</span>';
        carte.appendChild(q);
        carte.appendChild(rep);
        blocErreurs.appendChild(carte);
      });
      rafraichirGrilleEleves(); // enlève les badges désormais consultés
      rafraichirBadgeTotal();
      blocActivite.classList.remove('kbw-activite-cachee');
    }

    function escHtml(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function rafraichirGrilleEleves() {
      grilleEleves.innerHTML = '';
      elevesVide.style.display = elevesConnus.length ? 'none' : '';
      elevesConnus.forEach(function (eleve) {
        const tuile = document.createElement('button');
        tuile.type = 'button';
        tuile.className = 'kbw-tuile-eleve';
        tuile.classList.toggle('kbw-tuile-eleve-actif', eleve.id === eleveVisualiseId);

        const nom = document.createElement('span');
        nom.className = 'kbw-tuile-nom';
        nom.textContent = eleve.prenom;
        tuile.appendChild(nom);

        const apercu = document.createElement('span');
        apercu.className = 'kbw-tuile-apercu';
        apercu.textContent = apercuCourt(eleve.etat);
        tuile.appendChild(apercu);

        const nbNonVues = nbErreursNonVues(eleve.id);
        if (nbNonVues) {
          const badge = document.createElement('span');
          badge.className = 'kbw-badge-erreurs kbw-badge-tuile';
          badge.textContent = String(nbNonVues);
          tuile.appendChild(badge);
        }

        tuile.addEventListener('click', function () { afficherActivite(eleve); });
        grilleEleves.appendChild(tuile);
      });
      // L'élève visualisé s'est déconnecté entre-temps — referme le panneau
      // plutôt que de laisser un dernier état affiché qui ne bougera plus.
      if (eleveVisualiseId && !elevesConnus.some(function (e) { return e.id === eleveVisualiseId; })) {
        cacherActivite();
      } else if (eleveVisualiseId) {
        // Toujours connecté — rafraîchit le détail au cas où son activité
        // aurait changé depuis le dernier clic (le panneau reste ouvert).
        const courant = elevesConnus.filter(function (e) { return e.id === eleveVisualiseId; })[0];
        if (courant) {
          activiteDetail.textContent = formaterActivite(courant.etat);
          const question = courant.etat && courant.etat.question;
          activiteQuestion.textContent = question ? 'Question : ' + question : '';
          activiteQuestion.style.display = question ? '' : 'none';
        }
      }
    }

    function majListeEleves(liste) {
      elevesConnus = liste || [];
      // 🆕 Détecte les erreurs NEUVES (ts jamais vu pour cet élève) et les
      // accumule — voir la note en tête de section. `ts` distingue deux
      // erreurs sur le même exercice (ex. l'élève revient dessus plus tard).
      elevesConnus.forEach(function (eleve) {
        const err = eleve.etat && eleve.etat.erreur;
        if (!err || !err.ts) return;
        const liste = erreursParEleve[eleve.id] || (erreursParEleve[eleve.id] = []);
        const dejaConnue = liste.some(function (e) { return e.ts === err.ts; });
        if (dejaConnue) return;
        liste.push({
          question: eleve.etat.question || null,
          reponse_donnee: err.reponse_donnee,
          reponse_correcte: err.reponse_correcte,
          ts: err.ts,
          vue: eleve.id === eleveVisualiseId // déjà ouvert = considérée vue tout de suite
        });
      });
      rafraichirGrilleEleves();
      rafraichirBadgeTotal();
    }

    btnFermerActivite.addEventListener('click', cacherActivite);

    // Restaure l'affichage si une session tourne déjà dans ce navigateur
    // (ex. démarrée depuis l'écran Mode professeur, ou depuis ce widget
    // sur une autre page avant une navigation réelle — site multi-pages,
    // voir memoriserSessionProf dans session-classe.js).
    const sessionRestauree = sessionClasse.sessionProfActive();
    if (sessionRestauree) {
      session = sessionRestauree;
      afficherSessionActive();
      nettoyerPageSiPerimee();
    }

    // 🐛 CORRIGÉ (14-08-2026, "élève catapulté dans une leçon périmée") :
    // etat.page (poussé par une page de leçon comme dialogue-d1.html) ne
    // s'efface JAMAIS tout seul quand le prof quitte cette leçon pour une
    // page normale (parcours.html, menu…) — il n'y a pas d'événement
    // "je pars" fiable côté navigateur. Un élève qui rejoint APRÈS ce
    // moment-là, ou qui reçoit une mise à jour de contrôle, se faisait
    // donc rediriger vers une leçon que le prof a pourtant quittée depuis
    // longtemps (l'ancien etat.page, jamais nettoyé). Correctif : dès que
    // ce widget se charge sur une page qui n'est PAS elle-même une leçon
    // (voir window.KebBekPageEnDirect — absent ici, posé uniquement par
    // les pages de leçon comme dialogue-d1.html), et qu'une session tourne
    // avec un etat.page encore renseigné, on l'efface tout de suite. Ce
    // widget étant chargé sur TOUTES les pages, ce nettoyage se déclenche
    // automatiquement à la prochaine page visitée par le prof — pas besoin
    // d'un événement au moment précis où il quitte la leçon.
    async function nettoyerPageSiPerimee() {
      if (window.KebBekPageEnDirect) return; // cette page gère elle-même son etat.page — ne jamais y toucher ici
      if (!session || !session.etat || !session.etat.page) return; // déjà propre, rien à faire
      const maj = await sessionClasse.pousserEtat(session.id, Object.assign({}, session.etat, { page: null }));
      if (maj) { session = maj; rafraichirBoutonsControle(); }
    }

    // ---------- Démarrer ----------
    btnDemarrer.addEventListener('click', async function () {
      btnDemarrer.disabled = true;
      btnDemarrer.textContent = 'D\u00e9marrage\u2026';
      message.textContent = '';
      message.className = 'kbw-message';
      // Mode figé à 'distance', même choix que professeur.js (aucun
      // usage réel du présentiel actuellement, voir sa propre note).
      const nouvelleSession = await sessionClasse.demarrerSession('distance');
      btnDemarrer.disabled = false;
      btnDemarrer.textContent = 'D\u00e9marrer une session';
      if (!nouvelleSession) {
        message.textContent = 'Impossible de d\u00e9marrer \u2014 r\u00e9essaie.';
        message.classList.add('kbw-message-erreur');
        return;
      }
      session = nouvelleSession;
      afficherSessionActive();
    });

    // ---------- Bascule du contrôle ----------
    [btnControleProf, btnControleEleves].forEach(function (btn) {
      btn.addEventListener('click', async function () {
        if (!session) return;
        const controle = btn.dataset.controle;
        if (session.controle === controle) return;
        const maj = await sessionClasse.changerControle(session.id, controle);
        if (!maj) {
          message.textContent = 'Erreur \u2014 r\u00e9essaie.';
          message.classList.add('kbw-message-erreur');
          return;
        }
        session = maj;
        message.textContent = '';
        rafraichirBoutonsControle();
      });
    });

    // ---------- Fermer la session ----------
    btnFermerSession.addEventListener('click', async function () {
      if (!session) return;
      const reussi = await sessionClasse.fermerSession(session.id);
      if (!reussi) {
        message.textContent = 'Erreur \u2014 r\u00e9essaie.';
        message.classList.add('kbw-message-erreur');
        return;
      }
      afficherAucuneSession();
    });
  }

  // Permet à une page hôte de masquer temporairement le widget (ex.
  // pendant que l'écran "Mode professeur" de professeur.js est affiché
  // par-dessus — il a déjà sa propre section "Session de classe"
  // identique, pas besoin des deux en même temps). Sans danger si
  // appelé avant initialiser() (le widget n'existe pas encore) ou si
  // le compte n'est pas prof (le conteneur n'existe jamais).
  function masquer() {
    const c = document.getElementById('kbwWidget');
    if (c) c.style.display = 'none';
  }
  function afficher() {
    const c = document.getElementById('kbwWidget');
    if (c) c.style.display = '';
  }

  window.KebBekWidgetSessionProf = { initialiser, masquer, afficher };
})();
