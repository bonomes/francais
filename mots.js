/* ==================================================================
   mots.js — la banque de mots que l'élève connaît (02-11-2026).

   Les leçons y ajoutent les mots appris ; memoires.html y puise pour les
   mots qui flottent en arrière-plan. Même symétrie compte / invité que
   progression.js :
     - invité  : localStorage 'kebbek_mots_invite' (tableau de mots) ;
     - compte  : table `mots_connus` via deux RPC (voir mots_connus.sql —
                 ⚠️ À EXÉCUTER sur Supabase ; tant que ce n'est pas fait, le
                 compte retombe sans bruit sur la copie locale).
   Chaque mot n'est gardé qu'une fois (sans tenir compte des majuscules).

   API (window.KebBekMots) :
     ajouter(mots)              — string ou tableau ; renvoie les mots VRAIMENT nouveaux
     lire()                     — Promise<string[]> (compte + copie locale, sans doublon)
     migrerInviteVersCompte(id) — à appeler avec les autres migrations, après creerProfil()
   ================================================================== */
(function () {
  'use strict';
  const CLE = 'kebbek_mots_invite';
  const MAX = 5000;

  function prog() { return window.KebBekProgression || null; }
  function enCompte() {
    const p = prog();
    return !!(p && p.session && p.profilActifId && p.client);
  }
  function nettoyer(liste) {
    const vus = {}, sortie = [];
    (liste || []).forEach(function (m) {
      const mot = String(m == null ? '' : m).trim();
      if (!mot || mot.length > 40) return;
      const cle = mot.toLocaleLowerCase();
      if (vus[cle]) return;
      vus[cle] = true;
      sortie.push(mot);
    });
    return sortie;
  }
  function lireLocal() {
    try { return nettoyer(JSON.parse(localStorage.getItem(CLE) || '[]')); } catch (e) { return []; }
  }
  function ecrireLocal(liste) {
    try { localStorage.setItem(CLE, JSON.stringify(liste.slice(-MAX))); return true; } catch (e) { return false; }
  }

  async function ajouter(mots) {
    const entrants = nettoyer(Array.isArray(mots) ? mots : [mots]);
    const connus = {};
    lireLocal().forEach(function (m) { connus[m.toLocaleLowerCase()] = true; });
    const nouveaux = entrants.filter(function (m) { return !connus[m.toLocaleLowerCase()]; });
    if (nouveaux.length) ecrireLocal(lireLocal().concat(nouveaux));      // la copie locale existe toujours
    if (enCompte() && entrants.length) {
      try {
        const p = prog();
        const { error } = await p.client.rpc('ajouter_mots_connus', { p_eleve_id: p.profilActifId, p_mots: entrants });
        if (error) console.warn('mots.js : ajouter (compte) a échoué (RPC pas encore créée ?).', error);
      } catch (e) { console.warn('mots.js : ajouter a échoué.', e); }
    }
    return nouveaux;
  }

  async function lire() {
    let liste = lireLocal();
    if (enCompte()) {
      try {
        const p = prog();
        const { data, error } = await p.client.rpc('lire_mots_connus', { p_eleve_id: p.profilActifId });
        if (error) console.warn('mots.js : lire (compte) a échoué (RPC pas encore créée ?).', error);
        else liste = nettoyer((data || []).map(function (r) { return r.mot; }).concat(liste));
      } catch (e) { console.warn('mots.js : lire a échoué.', e); }
    }
    return liste;
  }

  async function migrerInviteVersCompte(eleveId) {
    const locaux = lireLocal();
    const p = prog();
    if (!locaux.length || !p || !p.client) return;
    try {
      const { error } = await p.client.rpc('ajouter_mots_connus', { p_eleve_id: eleveId, p_mots: locaux });
      if (error) { console.warn('mots.js : migration échouée, copie locale conservée.', error); return; }
      try { localStorage.removeItem(CLE); } catch (e) {}
    } catch (e) { console.warn('mots.js : migration échouée.', e); }
  }

  window.KebBekMots = { ajouter: ajouter, lire: lire, migrerInviteVersCompte: migrerInviteVersCompte };
})();
