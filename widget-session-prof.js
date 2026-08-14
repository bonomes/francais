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
    }

    function afficherAucuneSession() {
      session = null;
      blocActif.style.display = 'none';
      blocInactif.style.display = '';
      point.classList.remove('kbw-point-actif');
    }

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
