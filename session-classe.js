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

  // ---------- Persistance locale (élève) ----------
  // 🆕 (14-08-2026, deuxième vague) : symétrique de CLE_SESSION_PROF,
  // mais pour l'élève. Corrige un vrai bug d'expérience relevé par
  // Raphaël : le site est multi-pages (pas une SPA) — quitter la page
  // de leçon détruit TOUT le contexte JS en mémoire, donc l'abonnement
  // Realtime (abonnementActif ci-dessous) est perdu à chaque navigation
  // réelle, même vers une autre page qui participe aussi à la session
  // (ex. retour à parcours.html). Sans mémorisation, l'élève devrait
  // retaper le code à chaque page — ce n'est plus vraiment "en direct".
  // Seul le CODE est mémorisé (pas toute la ligne comme côté prof) :
  // rejoindre_session_classe() fait de toute façon une lecture fraîche
  // à chaque appel, la ligne mémorisée deviendrait vite périmée pour
  // rien. Se réabonner sur une nouvelle page est donc une VRAIE
  // rejonction (nouvel appel RPC, nouveau canal), pas une reprise de
  // canal — la reconnexion Realtime ne survivrait de toute façon pas à
  // un rechargement complet de page.
  const CLE_SESSION_ELEVE = 'kbb_session_eleve_active';

  function memoriserSessionEleve(code) {
    try {
      if (code) {
        localStorage.setItem(CLE_SESSION_ELEVE, code);
      } else {
        localStorage.removeItem(CLE_SESSION_ELEVE);
      }
    } catch (e) { /* stockage indisponible — dégradation silencieuse */ }
  }

  // Code de session élève mémorisé dans CE navigateur, ou null. Lecture
  // pure — ne garantit pas que la session est toujours active (voir
  // reprendreSessionEleve() pour une vraie tentative de rejonction).
  function sessionEleveActive() {
    try {
      return localStorage.getItem(CLE_SESSION_ELEVE) || null;
    } catch (e) { return null; }
  }

  // Tente de rejoindre automatiquement la session mémorisée, s'il y en
  // a une — à appeler par chaque page qui participe (parcours.html,
  // pages de leçon) juste après sa propre restauration de session/
  // profil, PLUTÔT que de réimplémenter la lecture localStorage dans
  // chaque page. Retourne true si une rejonction a réussi, false s'il
  // n'y avait rien à reprendre OU si la session mémorisée n'est plus
  // valide (fermée entre-temps depuis une autre page/onglet — dans ce
  // cas le code périmé est aussi nettoyé automatiquement).
  async function reprendreSessionEleve(callbacks) {
    const code = sessionEleveActive();
    if (!code) return false;
    const reussi = await rejoindreSession(code, callbacks);
    if (!reussi) memoriserSessionEleve(null); // code périmé — évite de retenter indéfiniment
    return reussi;
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

  // 🆕 (14-08-2026, troisième vague) : identité annoncée en Presence sur
  // le canal — {id, prenom}. Lue une seule fois à la jonction (via
  // progression.js), pas à chaque annonce : un élève ne change pas de
  // prénom en cours de session. `id` sert de clé Presence (permet, en
  // théorie, de distinguer deux onglets du même élève — non exploité
  // pour l'instant, mais évite d'avoir à revoir la forme des données
  // plus tard si Raphaël le demande).
  async function infoEleveCourant() {
    const progression = window.KebBekProgression || null;
    if (!progression) return { id: null, prenom: 'Élève' };
    try {
      const identite = await progression.lireIdentite();
      return {
        id: progression.profilActifId || null,
        prenom: (identite && identite.prenom) || 'Élève'
      };
    } catch (e) {
      return { id: progression.profilActifId || null, prenom: 'Élève' };
    }
  }

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

    // 🆕 (14-08-2026, troisième vague) : identité Presence lue AVANT la
    // création du canal — le .track() du statut SUBSCRIBED plus bas en a
    // besoin immédiatement, pas question d'attendre un aller-retour DB à
    // ce moment-là (course possible avec la fermeture rapide de la page).
    const infoEleve = await infoEleveCourant();

    // 🐛 CORRIGÉ (14-08-2026, troisième passe — diagnostiqué en test réel) :
    // remplacé postgres_changes par Broadcast depuis la base. postgres_changes
    // livrait systématiquement "errors: 401 Unauthorized" (new/old vides)
    // malgré RLS/JWT/publication tous corrects — comportement documenté par
    // Supabase elle-même comme la raison de préférer Broadcast aujourd'hui.
    // Voir mettre_a_jour_session_classe / fermer_session_classe (SQL) pour
    // le realtime.send() correspondant, et la policy RLS sur
    // realtime.messages qui autorise sa réception.
    //
    // 🆕 (14-08-2026, troisième vague) : presence: { key } ajouté au même
    // canal plutôt qu'un canal séparé — Presence et Broadcast cohabitent
    // sans conflit sur un même topic (confirmé par la doc Supabase), et un
    // seul abonnement WebSocket reste plus simple à faire vivre/mourir avec
    // la page qu'une paire. Permet au widget flottant du prof (canal
    // d'écoute séparé, voir ecouterActiviteEleves) de savoir qui est
    // connecté ET ce que chacun fait, sans table ni écriture DB.
    const canal = c
      .channel('session_classe:' + session.id, { config: { private: true, presence: { key: infoEleve.id || undefined } } })
      .on('broadcast', { event: 'maj' }, function (message) {
        const maj = message.payload || {};
        if (maj.active === false) {
          quitterSession();
          if (typeof callbacks.onFermee === 'function') callbacks.onFermee();
          return;
        }
        // Fusionné avec l'état déjà connu plutôt que remplacé en bloc — le
        // message ne porte que {controle, etat, active}, pas la ligne
        // entière (id, code, mode... n'ont pas besoin d'être redonnés à
        // chaque mise à jour, seuls id/code sont utiles à l'appelant et
        // ils ne changent jamais après la jonction).
        session = Object.assign({}, session, maj);
        if (typeof callbacks.onEtat === 'function') callbacks.onEtat(session);
      })
      .subscribe(function (statut) {
        // best-effort, silencieux — un élève dont la toute première annonce
        // échoue reste simplement invisible du widget prof jusqu'à la
        // prochaine annoncerActivite() réussie, jamais une erreur bloquante.
        if (statut === 'SUBSCRIBED') {
          canal.track({ prenom: infoEleve.prenom, etat: null }).catch(function () {});
        }
      });

    abonnementActif = { canal: canal, sessionId: session.id, infoEleve: infoEleve };
    memoriserSessionEleve(session.code);

    // État déjà en cours au moment de rejoindre — l'élève ne doit pas
    // attendre le PROCHAIN changement pour voir où en est la classe.
    if (typeof callbacks.onEtat === 'function') callbacks.onEtat(session);

    return true;
  }

  // Se désabonne proprement — à appeler quand l'élève quitte la page
  // de leçon, ou automatiquement si le prof ferme la session (voir
  // onFermee ci-dessus). Efface aussi le code mémorisé : un "quitter"
  // explicite ne doit jamais se retrouver rejoint automatiquement à la
  // prochaine page (voir reprendreSessionEleve).
  function quitterSession() {
    if (!abonnementActif) return;
    const c = client();
    if (c) c.removeChannel(abonnementActif.canal);
    abonnementActif = null;
    memoriserSessionEleve(null);
  }

  // 🆕 (14-08-2026, troisième vague) : "ce que fait l'élève en direct" —
  // à appeler par la page de leçon elle-même (ex. dialogue-d1.html, dans
  // synchroniserEtatSession) à chaque changement d'étape LOCAL, que ce
  // navigateur soit prof ou élève, avec ou sans session active. Aucun
  // effet si l'élève n'a rejoint aucune session (abonnementActif null) —
  // même philosophie "best-effort, silencieux" que pousserEtat. `etat`
  // suit exactement la même forme libre que l'état poussé par le prof
  // ({page, section, etape, ...}) — chaque page de leçon décide de son
  // contenu, ce module ne l'interprète jamais.
  function annoncerActivite(etat) {
    if (!abonnementActif) return;
    abonnementActif.canal
      .track({ prenom: abonnementActif.infoEleve.prenom, etat: etat || null })
      .catch(function () {});
  }

  // ---------- Côté professeur : voir l'activité des élèves ----------
  // 🆕 (14-08-2026, troisième vague) : canal d'ÉCOUTE séparé de celui
  // qu'utilise rejoindreSession() côté élève — un même navigateur ne joue
  // jamais les deux rôles à la fois sur la même session (voir garde
  // sessionClasse.sessionProfActive() déjà en place côté pages élève), mais
  // structurellement ce sont deux abonnements indépendants au même topic
  // ('session_classe:<id>'), Presence et Broadcast étant répliqués à tout
  // abonné du topic, peu importe qui l'a créé.
  let ecouteActive = null; // { canal, sessionId } | null

  // Transforme le presenceState() brut du SDK ({ clé: [ {...dernier track},
  // ... ] }) en une liste plate [{ id, prenom, etat }], un élément par
  // élève actuellement connecté (onglet fermé/perdu = disparaît tout seul,
  // géré par le serveur Realtime — rien à nettoyer manuellement ici).
  function analyserPresence(canal) {
    const brut = canal.presenceState();
    const liste = [];
    Object.keys(brut).forEach(function (cle) {
      const entrees = brut[cle];
      if (!entrees || !entrees.length) return;
      const derniere = entrees[entrees.length - 1];
      liste.push({ id: cle, prenom: derniere.prenom || 'Élève', etat: derniere.etat || null });
    });
    return liste;
  }

  // S'abonne à l'activité en direct des élèves d'UNE session (celle que ce
  // navigateur anime). callbacks.onListe(liste) est appelé une première
  // fois dès la synchronisation initiale, puis à chaque connexion/
  // déconnexion/annonce d'un élève. Un seul abonnement d'écoute à la fois
  // (nouvel appel = remplace le précédent, voir arreterEcouteActivite).
  async function ecouterActiviteEleves(sessionId, callbacks) {
    callbacks = callbacks || {};
    const c = client();
    if (!c || !sessionId) return false;
    arreterEcouteActivite();

    // Même précaution que côté rejoindreSession() (voir sa note) — setAuth
    // avant .subscribe(), pas juste avant, pour laisser la reconnexion
    // Realtime se stabiliser.
    try {
      const { data: sessionAuth } = await c.auth.getSession();
      if (sessionAuth && sessionAuth.session) {
        await c.realtime.setAuth(sessionAuth.session.access_token);
      }
    } catch (e) { /* best-effort, abonnement tenté quand même */ }

    // Pas de presence.key ici : ce navigateur ne s'annonce pas lui-même
    // (le prof n'est pas "un élève" dans la liste), il ne fait qu'écouter
    // — la clé Presence n'a de sens que pour qui appelle .track().
    const canal = c
      .channel('session_classe:' + sessionId, { config: { private: true } })
      .on('presence', { event: 'sync' }, function () {
        if (typeof callbacks.onListe === 'function') callbacks.onListe(analyserPresence(canal));
      })
      .subscribe();

    ecouteActive = { canal: canal, sessionId: sessionId };
    return true;
  }

  function arreterEcouteActivite() {
    if (!ecouteActive) return;
    const c = client();
    if (c) c.removeChannel(ecouteActive.canal);
    ecouteActive = null;
  }

  window.KebBekSessionClasse = {
    demarrerSession,
    changerControle,
    pousserEtat,
    fermerSession,
    sessionProfActive,
    rejoindreSession,
    reprendreSessionEleve,
    sessionEleveActive,
    quitterSession,
    annoncerActivite,
    ecouterActiviteEleves,
    arreterEcouteActivite
  };
})();
