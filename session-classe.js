/* ==================================================================
   session-classe.js — module autonome de "navigation partagée
   prof→élèves" (chantier mis de côté à la session du 13-08-2026,
   repris et précisé le 14-08-2026). Expose window.KebBekSessionClasse
   avec deux surfaces d'API séparées, jamais mélangées : une pour le
   prof (créer/contrôler une session), une pour l'élève (rejoindre/
   suivre). Ce module ne rend AUCUN écran lui-même — contrairement à
   professeur.js/menu-principal.js, il n'a pas de fonction
   demarrerXxx(idConteneur, callbacks) — il n'est qu'une couche de
   données/Realtime que d'autres écrans (Mode professeur, futures
   pages de leçon) branchent selon leurs propres besoins d'affichage.

   Modèle retenu (précisions de Raphaël, 14-08-2026) :
     - Alternance de contrôle, PAS une diffusion continue — deux
       valeurs possibles pour `controle` : 'professeur' (les élèves
       suivent l'écran/l'étape du prof — partie conversation/lecture)
       ou 'eleves' (chacun travaille de son côté — partie exercices,
       pour que les points reflètent la force réelle de chaque élève
       plutôt qu'une copie de la démo du prof). C'est TOUJOURS le prof
       qui déclenche la bascule, jamais automatique.
     - `etat` est un objet JSON libre (ex. {page, section, step}) —
       volontairement pas typé ici : ce module ne sait rien du contenu
       pédagogique, chaque page de leçon décide ce que "l'état" signifie
       pour elle. Utile aussi pour la future section "discussion de
       groupe" visible seulement du prof : rien n'empêche cette section
       de ne PAS pousser d'état vers les élèves (le prof peut choisir
       de ne rien synchroniser pendant ce temps).
     - Tous les élèves de Raphaël sont à distance en pratique — le
       présentiel (`mode`) reste possible côté schéma mais n'a pour
       l'instant aucun comportement distinct : même mécanisme pour les
       deux, jusqu'à preuve du besoin contraire.

   Architecture technique : PAS de canal broadcast manuel — la ligne
   sessions_classe EST la source de vérité, propagée aux élèves via
   Supabase Realtime (postgres_changes) sur cette ligne précise. Un
   élève qui rejoint en retard lit simplement l'état courant (aucun
   historique d'événements à rattraper). Aucune donnée personnelle ni
   pointage dans cette ligne — les points continuent de passer
   uniquement par attribuer_recompense_enseignant (professeur.js),
   entièrement indépendant de ce module.

   Suppose window.KebBekProgression (progression.js) déjà chargé,
   réutilise progression.client — même principe que professeur.js.
   ================================================================== */

(function () {

  function client() {
    const progression = window.KebBekProgression || null;
    return progression ? progression.client : null;
  }

  // ---------- Persistance locale (prof) ----------
  // 🆕 (14-08-2026) : permet à une AUTRE page (ex. dialogue-d1.html) de
  // savoir, sans plomberie supplémentaire, si CE navigateur fait tourner
  // une session en tant que prof — utile pour qu'une page de leçon
  // pousse automatiquement son état de navigation quand le prof y
  // navigue lui-même. localStorage (pas sessionStorage) volontairement :
  // le prof peut ouvrir la leçon dans un nouvel onglet plutôt que dans
  // celui du panneau Mode professeur. Aucune donnée sensible ici (juste
  // id/code/controle, déjà publics via le code partagé) — la vraie
  // protection reste côté RPC (SECURITY DEFINER, vérifie l'auth.uid()
  // propriétaire), ceci n'est qu'un confort d'UI, jamais une frontière
  // de sécurité.
  const CLE_SESSION_PROF = 'kbb_session_prof_active';

  function memoriserSessionProf(session) {
    try {
      if (session && session.active) {
        localStorage.setItem(CLE_SESSION_PROF, JSON.stringify(session));
      } else {
        localStorage.removeItem(CLE_SESSION_PROF);
      }
    } catch (e) { /* stockage indisponible — dégradation silencieuse */ }
  }

  // Lit la session prof active mémorisée dans CE navigateur, ou null.
  // Lecture pure (ne vérifie rien côté serveur) — une page qui s'en sert
  // pour pousser un état doit rester tolérante à un échec RPC (session
  // entre-temps fermée depuis un autre onglet, par ex.).
  function sessionProfActive() {
    try {
      const brut = localStorage.getItem(CLE_SESSION_PROF);
      return brut ? JSON.parse(brut) : null;
    } catch (e) { return null; }
  }

  // ---------- Côté professeur ----------

  // Crée une nouvelle session (le compte doit être un enseignant
  // reconnu — vérifié côté RPC, jamais côté client, même philosophie
  // que essayerModeProfesseur). Retourne la ligne sessions_classe
  // complète (contient le code à afficher/dicter aux élèves) ou null
  // en cas d'échec.
  async function demarrerSession(mode) {
    const c = client();
    if (!c) return null;
    try {
      const { data, error } = await c.rpc('creer_session_classe', { p_mode: mode || 'distance' });
      if (error) { console.warn('session-classe.js : demarrerSession a échoué.', error); return null; }
      memoriserSessionProf(data);
      return data || null;
    } catch (e) {
      console.warn('session-classe.js : demarrerSession a échoué (réseau).', e);
      return null;
    }
  }

  // Bascule le contrôle et/ou pousse un nouvel état, en un seul appel.
  // p_controle et p_etat sont tous deux optionnels — passer seulement
  // celui qui change (ex. changerControle(id, 'eleves') pour une pure
  // bascule sans toucher à l'état de navigation courant).
  async function mettreAJour(sessionId, controle, etat) {
    const c = client();
    if (!c || !sessionId) return null;
    try {
      const { data, error } = await c.rpc('mettre_a_jour_session_classe', {
        p_session_id: sessionId,
        p_controle: controle || null,
        p_etat: etat || null
      });
      if (error) { console.warn('session-classe.js : mettreAJour a échoué.', error); return null; }
      memoriserSessionProf(data);
      return data || null;
    } catch (e) {
      console.warn('session-classe.js : mettreAJour a échoué (réseau).', e);
      return null;
    }
  }

  // Raccourcis pour les deux usages les plus fréquents — évite à
  // l'appelant de se souvenir de la forme exacte de mettreAJour().
  function changerControle(sessionId, controle) { return mettreAJour(sessionId, controle, null); }
  function pousserEtat(sessionId, etat) { return mettreAJour(sessionId, null, etat); }

  async function fermerSession(sessionId) {
    const c = client();
    if (!c || !sessionId) return false;
    try {
      const { data, error } = await c.rpc('fermer_session_classe', { p_session_id: sessionId });
      if (error) { console.warn('session-classe.js : fermerSession a échoué.', error); return false; }
      if (data) memoriserSessionProf(null);
      return !!data;
    } catch (e) {
      console.warn('session-classe.js : fermerSession a échoué (réseau).', e);
      return false;
    }
  }

  // ---------- Côté élève ----------

  // Élève actuellement abonné, s'il y a lieu — un seul à la fois (un
  // élève ne suit qu'une session en même temps). null si jamais
  // rejoint ou après quitterSession()/onFermee().
  let abonnementActif = null;

  // Rejoint une session par son code, s'abonne aux mises à jour en
  // temps réel de sa ligne, puis appelle callbacks.onEtat(session) une
  // première fois immédiatement (pour l'état déjà en cours au moment
  // de rejoindre) et à chaque changement ensuite. callbacks.onFermee()
  // est appelé si le prof ferme la session pendant que l'élève est
  // abonné (utile pour ramener l'élève à une navigation libre plutôt
  // que de le laisser bloqué sur un état qui ne bougera plus).
  //
  // Retourne true si la jonction a réussi, false sinon (code invalide/
  // expiré, ou déjà abonné à une autre session — voir quitterSession()
  // d'abord dans ce cas).
  async function rejoindreSession(code, callbacks) {
    callbacks = callbacks || {};
    const c = client();
    if (!c) return false;
    if (abonnementActif) {
      console.warn('session-classe.js : déjà abonné à une session — appelle quitterSession() avant d\u2019en rejoindre une autre.');
      return false;
    }

    // 🐛 CORRIGÉ (14-08-2026, deuxième passe — diagnostiqué en test réel) :
    // déplacé ICI (avant même l'appel RPC) plutôt que juste avant
    // .subscribe(). setAuth() déclenche une reconnexion de la websocket
    // Realtime — appelé juste avant .subscribe(), il entre en course avec
    // l'abonnement du canal lui-même (CHANNEL_ERROR "socket closed: 1001"
    // observé en test, avant stabilisation tardive). Le temps de l'aller-
    // retour RPC qui suit sert ici de délai naturel pour que la
    // reconnexion se stabilise AVANT la création du canal.
    try {
      const { data: sessionAuth } = await c.auth.getSession();
      if (sessionAuth && sessionAuth.session) {
        await c.realtime.setAuth(sessionAuth.session.access_token);
      }
    } catch (e) {
      console.warn('session-classe.js : setAuth Realtime a échoué — abonnement tenté quand même.', e);
    }

    let session;
    try {
      const { data, error } = await c.rpc('rejoindre_session_classe', { p_code: code });
      if (error || !data) {
        if (typeof callbacks.onErreur === 'function') callbacks.onErreur();
        return false;
      }
      session = data;
    } catch (e) {
      console.warn('session-classe.js : rejoindreSession a échoué (réseau).', e);
      if (typeof callbacks.onErreur === 'function') callbacks.onErreur();
      return false;
    }

    const canal = c
      .channel('session_classe_' + session.id)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'sessions_classe', filter: 'id=eq.' + session.id },
        function (payload) {
          console.log('session-classe.js [diagnostic] : événement postgres_changes reçu.', payload);
          const nouvelle = payload.new;
          if (!nouvelle.active) {
            quitterSession();
            if (typeof callbacks.onFermee === 'function') callbacks.onFermee();
            return;
          }
          if (typeof callbacks.onEtat === 'function') callbacks.onEtat(nouvelle);
        }
      )
      .subscribe(function (statut, err) {
        // 🩺 diagnostic temporaire (14-08-2026) — à retirer une fois le
        // canal confirmé fiable. Statuts possibles : SUBSCRIBED,
        // CHANNEL_ERROR, TIMED_OUT, CLOSED.
        console.log('session-classe.js [diagnostic] : statut du canal =', statut, err || '');
      });

    abonnementActif = { canal: canal, sessionId: session.id };

    // État déjà en cours au moment de rejoindre — l'élève ne doit pas
    // attendre le PROCHAIN changement pour voir où en est la classe.
    if (typeof callbacks.onEtat === 'function') callbacks.onEtat(session);

    return true;
  }

  // Se désabonne proprement — à appeler quand l'élève quitte la page
  // de leçon, ou automatiquement si le prof ferme la session (voir
  // onFermee ci-dessus).
  function quitterSession() {
    if (!abonnementActif) return;
    const c = client();
    if (c) c.removeChannel(abonnementActif.canal);
    abonnementActif = null;
  }

  window.KebBekSessionClasse = {
    demarrerSession,
    changerControle,
    pousserEtat,
    fermerSession,
    sessionProfActive,
    rejoindreSession,
    quitterSession
  };
})();
