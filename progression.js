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
// ============================================================

(function () {
  const URL_PROJET_SUPABASE = 'https://ehdaoljriwalakofitui.supabase.co';
  const CLE_ANON_SUPABASE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZGFvbGpyaXdhbGFrb2ZpdHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTUyNzYsImV4cCI6MjA5OTA3MTI3Nn0.Ha4lwEuBcAnj4xnjBVZc1dqV4GVzpHHSkp-4tbu1UZU';

  const CLE_INVITE_LOCALE = 'kebbek_invite';
  const CLE_PROGRESSION_INVITE = 'kebbek_progression_invite'; // { [chapitre_id]: true }
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

  window.KebBekProgression = {
    initSession,
    definirClient,
    definirSession,
    estInvite,
    profilsDuCompte,
    creerProfil,
    definirProfilActif,
    dernierProfilConnu,
    lireProgression,
    marquerChapitreComplete,
    migrerProgressionInviteVersCompte,
    get client() { return clientSupabase; },
    get session() { return sessionActuelle; },
    get profilActifId() { return profilActifId; },
    set profilActifId(v) { definirProfilActif(v); }
  };
})();
