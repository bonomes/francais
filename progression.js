// ============================================================
// progression.js — module partagé de progression élève
//
// Inclus par parcours.html, intro-bonomes.html, et toute future leçon
// (lecons/**/*.html) via :
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
//   <script src="[chemin relatif vers la racine]/progression.js"></script>
// — le CDN Supabase doit être chargé AVANT ce fichier.
//
// Expose window.KebBekProgression = { ... } — une seule instance, un seul
// endroit où corriger la logique de compte/invité pour tout le site.
//
// Ce que ce module fait :
//   - Détecte session connectée (Supabase) vs invité (kebbek_invite).
//   - Charge/crée les profils élèves du compte (plusieurs profils par
//     courriel possibles — un parent avec plusieurs enfants, confirmé par
//     Raphaël dans COMPTES_ELEVES_v10).
//   - Lit et écrit la progression (chapitres complétés), compte ou local.
//   - Migre la progression invité → compte, une seule fois, juste après
//     la création d'un nouveau profil — jamais sur une reconnexion
//     normale (voir règle de fusion, COMPTES_ELEVES_v10 section 5).
//   - 🆕 v51/étape 3 : lit et écrit l'identité de l'élève (genre 'm'/'f'
//     + nationalité, code ISO alpha-2) — mécanisme introduit par la
//     Leçon 1 (exercices.js "choix_identite"), mais consommable par tout
//     futur contenu qui en a besoin. Même symétrie compte/invité que la
//     progression, migration séparée (migrerIdentiteInviteVersCompte),
//     à appeler juste après migrerProgressionInviteVersCompte().
//     ⚠️ Suppose une fonction SQL enregistrer_identite_eleve(p_eleve_id,
//     p_genre, p_nationalite) côté Supabase — voir schéma SQL fourni à
//     part. La colonne d'appartenance utilisée dans cette fonction pour
//     vérifier que l'élève appartient bien au compte courant (compte_id)
//     a été confirmée par introspection réelle du schéma (COMPTES_ELEVES) —
//     plus une hypothèse.
//
// Ce que ce module NE fait PAS (délibérément, hors scope pour l'instant) :
//   - Migrer le sac à dos (bloqué tant que son contenu n'est pas rattaché
//     à de vrais `objets` — voir COMPTES_ELEVES_v09/v10, "point ouvert").
//   - Décider qui affiche quoi à l'écran — ce module est un fournisseur de
//     données, pas une UI. Chaque page reste responsable de son affichage.
//
// CORRECTION (COMPTES_ELEVES_v11) : definirClient() et definirSession()
// existaient déjà dans le fichier mais n'étaient PAS exposées sur
// window.KebBekProgression — une page hôte qui possède déjà son propre
// client Supabase (index.html) n'avait donc aucun moyen réel de l'injecter
// ici malgré l'intention documentée ci-dessus. Corrigé : les deux
// fonctions sont maintenant dans l'objet exporté en bas de fichier.
//
// 🆕 AJOUT — séquence identité "Oui" (nom + genre + tranche d'âge,
// voir identite-eleve.js) :
//   - prenom : PAS ajouté ici. La colonne eleves.prenom est déjà
//     écrite via creerProfil(prenom) (RPC creer_profil existante) au
//     moment de la création du profil — ce module n'a donc rien de
//     nouveau à faire pour l'écrire côté compte. Il est cependant
//     ajouté à l'objet d'identité INVITÉ ci-dessous par simple
//     commodité (un seul objet local à lire/écrire pour tout ce que la
//     séquence "Oui" collecte d'un coup), et lu depuis eleves.prenom
//     côté compte dans lireIdentite() — ⚠️ SUPPOSE que cette colonne
//     s'appelle bien `prenom` (déduit de l'usage de creerProfil, pas
//     confirmé par introspection directe du schéma).
//   - adulte : booléen, tranche d'âge captée par le choix de
//     silhouette (garçon/homme/fille/femme). null = non renseigné
//     (profils existants, ou invité qui n'a pas encore répondu).
//     ⚠️ SUPPOSE que la colonne eleves.adulte existe (voir
//     bravo_schema_v07__PROPOSITION.sql fourni séparément — à exécuter
//     sur Supabase avant que ce module puisse réellement l'écrire) et
//     que enregistrer_identite_eleve accepte un p_adulte optionnel.
//   - Les deux nouveaux champs suivent exactement le même principe que
//     genre/nationalite déjà en place : passer `undefined` = "ne pas
//     modifier ce champ", pour ne jamais écraser une valeur déjà
//     enregistrée en modifiant seulement les autres.
// ============================================================

(function () {
  const URL_PROJET_SUPABASE = 'https://ehdaoljriwalakofitui.supabase.co';
  const CLE_ANON_SUPABASE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZGFvbGpyaXdhbGFrb2ZpdHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTUyNzYsImV4cCI6MjA5OTA3MTI3Nn0.Ha4lwEuBcAnj4xnjBVZc1dqV4GVzpHHSkp-4tbu1UZU';

  const CLE_INVITE_LOCALE = 'kebbek_invite';
  const CLE_PROGRESSION_INVITE = 'kebbek_progression_invite'; // { [chapitre_id]: true }
  // 🆕 Étendu pour la séquence identité "Oui" (prenom, adulte) — un seul
  // objet plutôt qu'une clé de plus par champ : prenom/genre/adulte sont
  // maintenant capturés ensemble, dans la même séquence, au même moment
  // (voir identite-eleve.js) — les séparer en clés distinctes n'aurait
  // fait que dupliquer la même logique de repli/migration trois fois.
  const CLE_IDENTITE_INVITE = 'kebbek_identite_invite'; // { genre: 'm'|'f'|null, nationalite: code|null, prenom: string|null, adulte: boolean|null }
  const CLE_DERNIER_PROFIL = 'kebbek_dernier_profil';

  // clientSupabase : peut être injecté par la page hôte via definirClient()
  // si elle en a déjà un (cas d'index.html, qui gère sa propre connexion) —
  // sinon, ce module en crée un lui-même au premier appel qui en a besoin
  // (cas de parcours.html / intro-bonomes.html / futures leçons, qui n'ont
  // aucune autre raison d'avoir un client Supabase).
  let clientSupabase = null;

  function clientOuAutoCree() {
    if (clientSupabase) return clientSupabase;
    if (window.supabase && window.supabase.createClient) {
      try {
        clientSupabase = window.supabase.createClient(URL_PROJET_SUPABASE, CLE_ANON_SUPABASE);
      } catch (e) {
        console.warn('progression.js : échec de création du client Supabase.', e);
      }
    } else {
      console.warn('progression.js : le CDN Supabase doit être chargé AVANT ce fichier — module en mode invité seulement.');
    }
    return clientSupabase;
  }

  function definirClient(client) { clientSupabase = client; }
  function definirSession(session) { sessionActuelle = session; }

  let sessionActuelle = null;
  let profilActifId = null;

  async function initSession() {
    const client = clientOuAutoCree();
    if (!client) return null;
    try {
      const { data } = await client.auth.getSession();
      sessionActuelle = data.session;
    } catch (e) {
      console.warn('progression.js : initSession a échoué.', e);
    }
    return sessionActuelle;
  }

  function estInvite() {
    return !sessionActuelle && localStorage.getItem(CLE_INVITE_LOCALE) === '1';
  }

  // ---------- Profils (plusieurs par courriel possibles) ----------

  async function profilsDuCompte() {
    if (!clientSupabase || !sessionActuelle) return [];
    const { data, error } = await clientSupabase.from('eleves').select('*').order('cree_le', { ascending: true });
    if (error) { console.warn('progression.js : profilsDuCompte a échoué.', error); return []; }
    return data || [];
  }

  // Retourne { profil, estNouveau } — estNouveau sert de signal exact pour
  // déclencher la migration invité→compte (voir règle de fusion, jamais
  // sur une reconnexion normale).
  async function creerProfil(prenom) {
    if (!clientSupabase) return null;
    const { data, error } = await clientSupabase.rpc('creer_profil', { p_prenom: prenom });
    if (error) { console.warn('progression.js : creerProfil a échoué.', error); return null; }
    return data;
  }

  function definirProfilActif(id) {
    profilActifId = id;
    if (id) localStorage.setItem(CLE_DERNIER_PROFIL, id);
  }

  function dernierProfilConnu() {
    return localStorage.getItem(CLE_DERNIER_PROFIL);
  }

  // 🆕 Déconnexion — nécessaire pour le nouveau menu principal ("Ma
  // fiche" → Se déconnecter). Symétrique de definirProfilActif() : vide
  // la session ET le profil actif, et oublie le dernier profil connu
  // (sinon dernierProfilConnu() reproposerait ce profil à la prochaine
  // visite malgré la déconnexion). N'échoue jamais bruyamment côté
  // appelant : si le signOut réseau échoue, l'état LOCAL est quand même
  // nettoyé (repli sûr, voir même philosophie que clientOuAutoCree()).
  async function deconnecter() {
    if (clientSupabase && sessionActuelle) {
      try { await clientSupabase.auth.signOut(); }
      catch (e) { console.warn('progression.js : deconnecter (signOut réseau) a échoué — état local nettoyé quand même.', e); }
    }
    sessionActuelle = null;
    profilActifId = null;
    try { localStorage.removeItem(CLE_DERNIER_PROFIL); } catch (e) {}
  }

  // ---------- Progression : lecture ----------

  function progressionInviteLocale() {
    try { return JSON.parse(localStorage.getItem(CLE_PROGRESSION_INVITE) || '{}'); }
    catch (e) { return {}; }
  }

  // Retourne une Map simple { [chapitre_id]: true } pour les chapitres
  // complétés — peu importe la source (compte ou invité), même forme en
  // sortie pour que parcours.html n'ait pas à savoir laquelle c'est.
  async function lireProgression() {
    if (sessionActuelle && profilActifId && clientSupabase) {
      const { data, error } = await clientSupabase
        .from('progression_chapitres')
        .select('chapitre_id')
        .eq('eleve_id', profilActifId);
      if (error) { console.warn('progression.js : lireProgression a échoué.', error); return {}; }
      const carte = {};
      (data || []).forEach(r => { carte[r.chapitre_id] = true; });
      return carte;
    }
    return progressionInviteLocale();
  }

  // ---------- Identité (genre/nationalité) — v51/COMPTES_ELEVES, étape 3 ----------
  //
  // Introduit pour le mécanisme d'identification de la Leçon 1 (voir
  // BONOMES_v47/v51, exercices.js "choix_identite"). Même principe de
  // symétrie compte/invité que la progression ci-dessus :
  //   - genre : 'm' ou 'f' (choisi via bouton Keb/Bek, jamais une case
  //     "homme/femme" abstraite), ou null si non renseigné.
  //   - nationalite : code pays ISO 3166-1 alpha-2 (ex. 'FR', 'US'), même
  //     format que ce que renvoie nationalites.js / exercices.js
  //     (choix_identite renvoie { genre, nationalite: code }).
  //   - Un profil créé avant ce champ (ou un invité qui n'a encore rien
  //     choisi) doit lire { genre: null, nationalite: null } — jamais une
  //     erreur bloquante. Toute page consommatrice doit traiter null comme
  //     "non renseigné", pas comme un échec.
  //
  // Écriture faite via une fonction RPC dédiée (enregistrer_identite_eleve,
  // voir SQL fourni séparément), pas un .update() direct sur la table —
  // même choix que creerProfil()/marquerChapitreComplete() : les écritures
  // qui touchent la ligne d'un élève passent par du SQL qui vérifie
  // lui-même l'appartenance (auth.uid()), plutôt que de dépendre d'une
  // policy RLS d'UPDATE dont l'existence n'est pas confirmée ici.

  function identiteInviteLocale() {
    try {
      return Object.assign(
        { genre: null, nationalite: null, prenom: null, adulte: null },
        JSON.parse(localStorage.getItem(CLE_IDENTITE_INVITE) || '{}')
      );
    } catch (e) {
      return { genre: null, nationalite: null, prenom: null, adulte: null };
    }
  }

  // Retourne { genre, nationalite, prenom, adulte } — peu importe la
  // source (compte ou invité), même forme en sortie, comme
  // lireProgression(). Côté compte, prenom vient de eleves.prenom
  // (déjà écrite par creerProfil(), voir note en tête de fichier) et
  // adulte de eleves.adulte (⚠️ colonne à ajouter, voir
  // bravo_schema_v07__PROPOSITION.sql).
  async function lireIdentite() {
    if (sessionActuelle && profilActifId && clientSupabase) {
      const { data, error } = await clientSupabase
        .from('eleves')
        .select('genre, nationalite, prenom, adulte')
        .eq('id', profilActifId)
        .single();
      if (error) {
        console.warn('progression.js : lireIdentite a échoué.', error);
        return { genre: null, nationalite: null, prenom: null, adulte: null };
      }
      return {
        genre: data.genre || null,
        nationalite: data.nationalite || null,
        prenom: data.prenom || null,
        adulte: (data.adulte === true || data.adulte === false) ? data.adulte : null
      };
    }
    return identiteInviteLocale();
  }

  function enregistrerIdentiteInvite(genre, nationalite, prenom, adulte) {
    const actuel = identiteInviteLocale();
    const suivant = {
      genre: genre !== undefined ? genre : actuel.genre,
      nationalite: nationalite !== undefined ? nationalite : actuel.nationalite,
      prenom: prenom !== undefined ? prenom : actuel.prenom,
      adulte: adulte !== undefined ? adulte : actuel.adulte
    };
    try {
      localStorage.setItem(CLE_IDENTITE_INVITE, JSON.stringify(suivant));
      return true;
    } catch (e) {
      console.warn('progression.js : enregistrerIdentiteInvite a échoué (localStorage indisponible ou plein).', e);
      return false;
    }
  }

  // genre/nationalite/prenom/adulte : passer undefined (pas null) pour
  // "ne pas modifier ce champ" — permet d'enregistrer un sous-ensemble
  // des champs sans écraser les autres (même principe déjà en place
  // pour genre/nationalite). Note : prenom est accepté ici pour le mode
  // invité (stockage local le temps qu'un profil existe), mais côté
  // COMPTE le prénom ne passe PAS par cette fonction — il est écrit une
  // seule fois, à la création du profil, via creerProfil(prenom). Le
  // passer ici alors qu'une session existe n'a donc aucun effet côté
  // compte (RPC actuelle : seuls genre/nationalite/adulte y sont
  // envoyés) ; à réviser si un jour on veut permettre de renommer un
  // profil existant.
  async function enregistrerIdentite(genre, nationalite, prenom, adulte) {
    if (sessionActuelle && profilActifId && clientSupabase) {
      const { error } = await clientSupabase.rpc('enregistrer_identite_eleve', {
        p_eleve_id: profilActifId,
        p_genre: genre !== undefined ? genre : null,
        p_nationalite: nationalite !== undefined ? nationalite : null,
        p_adulte: adulte !== undefined ? adulte : null
      });
      if (error) { console.warn('progression.js : enregistrerIdentite (compte) a échoué.', error); return false; }
      return true;
    }
    return enregistrerIdentiteInvite(genre, nationalite, prenom, adulte);
  }

  // ---------- Progression : écriture ----------

  function marquerChapitreInvite(chapitreId) {
    const p = progressionInviteLocale();
    if (p[chapitreId]) return false; // déjà fait, rien de nouveau à signaler
    p[chapitreId] = true;
    localStorage.setItem(CLE_PROGRESSION_INVITE, JSON.stringify(p));
    return true;
  }

  // objetRecompenseId est optionnel — voir marquer_chapitre_complete côté
  // SQL, qui n'accorde la récompense qu'au tout premier appel réussi pour
  // ce chapitre (idempotent par construction).
  async function marquerChapitreComplete(chapitreId, objetRecompenseId) {
    if (sessionActuelle && profilActifId && clientSupabase) {
      const { data, error } = await clientSupabase.rpc('marquer_chapitre_complete', {
        p_eleve_id: profilActifId,
        p_chapitre_id: chapitreId,
        p_objet_recompense_id: objetRecompenseId || null
      });
      if (error) { console.warn('progression.js : marquerChapitreComplete (compte) a échoué.', error); return false; }
      return true;
    }
    return marquerChapitreInvite(chapitreId);
  }

  // ---------- Migration invité → compte ----------
  //
  // À appeler UNE SEULE FOIS, immédiatement après un creerProfil() réussi
  // dans la même session navigateur qui avait de la progression invité —
  // jamais sur une reconnexion à un profil déjà existant (voir règle de
  // fusion, COMPTES_ELEVES_v10 section 5). Idempotent grâce à
  // marquer_chapitre_complete : rejouer cette migration par erreur ne
  // peut pas dupliquer de récompense.

  async function migrerProgressionInviteVersCompte(eleveId) {
    const locale = progressionInviteLocale();
    const ids = Object.keys(locale);
    if (ids.length === 0 || !clientSupabase) return;
    for (const chapitreId of ids) {
      try {
        await clientSupabase.rpc('marquer_chapitre_complete', {
          p_eleve_id: eleveId, p_chapitre_id: chapitreId, p_objet_recompense_id: null
        });
      } catch (e) {
        console.warn('progression.js : échec de migration pour', chapitreId, e);
      }
    }
    localStorage.removeItem(CLE_PROGRESSION_INVITE);
  }

  // Symétrique de migrerProgressionInviteVersCompte(), pour l'identité —
  // fonction SÉPARÉE plutôt que fusionnée dans celle-ci, pour ne rien
  // changer à l'API déjà appelée depuis parcours.html/intro-bonomes.html.
  // À appeler juste après elle (même moment : immédiatement après un
  // creerProfil() réussi qui avait de la progression et/ou une identité
  // invité en attente) — jamais sur une reconnexion normale, même règle
  // de fusion que COMPTES_ELEVES_v10 section 5.
  //
  // Rien à migrer si l'invité n'avait jamais choisi ni genre ni
  // nationalité ni tranche d'âge (cas le plus courant si la séquence
  // identité n'a pas encore été faite en mode invité) — sort
  // immédiatement dans ce cas, sans appel réseau inutile — mais on
  // nettoie quand même la clé locale ici (petit ajustement : la version
  // précédente de cette sortie anticipée ne le faisait pas, laissant un
  // objet vide traîner indéfiniment). Le prénom n'entre PAS dans cette
  // condition de sortie anticipée : il est déjà passé directement à
  // creerProfil(prenom) au moment de la création du profil (voir note
  // en tête de fichier), pas migré ici.
  async function migrerIdentiteInviteVersCompte(eleveId) {
    const locale = identiteInviteLocale();
    if ((locale.genre === null && locale.nationalite === null && locale.adulte === null) || !clientSupabase) {
      localStorage.removeItem(CLE_IDENTITE_INVITE);
      return;
    }
    try {
      await clientSupabase.rpc('enregistrer_identite_eleve', {
        p_eleve_id: eleveId,
        p_genre: locale.genre,
        p_nationalite: locale.nationalite,
        p_adulte: locale.adulte
      });
    } catch (e) {
      console.warn('progression.js : échec de migration de l\'identité invité.', e);
    }
    localStorage.removeItem(CLE_IDENTITE_INVITE);
  }

  window.KebBekProgression = {
    initSession,
    definirClient,
    definirSession,
    estInvite,
    profilsDuCompte,
    creerProfil,
    definirProfilActif,
    dernierProfilConnu,
    deconnecter,
    lireProgression,
    marquerChapitreComplete,
    migrerProgressionInviteVersCompte,
    lireIdentite,
    enregistrerIdentite,
    migrerIdentiteInviteVersCompte,
    get client() { return clientSupabase; },
    get session() { return sessionActuelle; },
    get profilActifId() { return profilActifId; },
    set profilActifId(v) { definirProfilActif(v); }
  };
})();
