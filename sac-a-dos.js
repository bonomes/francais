/* ==================================================================
   sac-a-dos.js — logique du composant "sac à dos", PARTAGÉE par toutes
   les pages qui l'utilisent (index.html, parcours.html,
   intro-bonomes.html, et toute future page de leçon sous lecons/).

   Avant l'extraction dans ce fichier (signalé par Raphaël : "ce serait
   moche de devoir changer tous les fichiers"), cette logique était
   copiée-collée dans chaque page — et avait déjà légèrement divergé :
   intro-bonomes.html avait gagné une vérification anti-doublon
   (ajouterAuSac refusait déjà un mot déjà présent) que index.html et
   parcours.html n'avaient pas ; à l'inverse, index.html utilisait le
   système de traduction du site (t()) pour les libellés de catégorie,
   qu'intro-bonomes.html n'avait pas encore. Réconciliés ici une bonne
   fois : la vérification anti-doublon s'applique maintenant partout,
   et chaque catégorie a un nom de repli en clair (nomParDefaut) utilisé
   uniquement sur les pages qui n'ont pas (encore) de fonction t()
   globale — dès qu'une page en gagne une, les vrais libellés traduits
   prennent automatiquement le dessus, sans rien à changer ici.

   Suppose la présence dans le HTML de la page des éléments suivants
   (voir le bloc HTML "sac à dos" à copier depuis index.html ou
   parcours.html) : #sacBouton, #sacBadge, #iconeSac, #sacPanneau,
   #sacSousTitre, #sacCorps. #btnAjouterTest est optionnel (absent sur
   intro-bonomes.html, volontairement — pas de bouton de test pendant
   l'introduction narrative).
   ================================================================== */

const CLE_SAC = 'keb_bek_sac_a_dos';

const CATEGORIES_SAC = [
  { id: 'mots',     cle: 'catMots',     nomParDefaut: 'Words learned', icone: iconeSacLivre() },
  { id: 'codes',    cle: 'catCodes',    nomParDefaut: 'Codes',         icone: iconeSacCle() },
  { id: 'succes',   cle: 'catSucces',   nomParDefaut: 'Achievements',  icone: iconeSacEtoile() },
  { id: 'trophees', cle: 'catTrophees', nomParDefaut: 'Trophies',      icone: iconeSacTrophee() },
  { id: 'cartes',   cle: 'catCartes',   nomParDefaut: 'Cards',         icone: iconeSacCarte() }
];

// Traduit via le système du site si cette page en a un (index.html,
// parcours.html), sinon retombe sur l'anglais en clair (intro-bonomes.html
// pour l'instant) — voir note de tête de fichier.
function tSacOuDefaut(cle, defaut) {
  return (typeof t === 'function') ? t(cle) : defaut;
}

function sacParDefaut() {
  return { version: 1, mots: [], codes: [], succes: [], trophees: [], cartes: [] };
}

function chargerSac() {
  try {
    const brut = localStorage.getItem(CLE_SAC);
    if (!brut) return sacParDefaut();
    return Object.assign(sacParDefaut(), JSON.parse(brut));
  } catch (e) {
    console.warn('Sac à dos illisible, réinitialisation.', e);
    return sacParDefaut();
  }
}

function sauvegarderSac(sac) {
  try {
    localStorage.setItem(CLE_SAC, JSON.stringify(sac));
  } catch (e) {
    console.warn('Impossible de sauvegarder le sac à dos (localStorage indisponible ou plein).', e);
  }
}

function ajouterAuSac(categorie, item) {
  const sac = chargerSac();
  if (!sac[categorie]) sac[categorie] = [];
  const identifiant = item.mot || item.code || item.titre || item.nom;
  const dejaLa = sac[categorie].some(i => (i.mot || i.code || i.titre || i.nom) === identifiant);
  if (!dejaLa) {
    item.obtenu_le = item.obtenu_le || new Date().toISOString();
    sac[categorie].push(item);
    sauvegarderSac(sac);
  }
  rafraichirAffichageSac();
}

function compterToutSac(sac) {
  return CATEGORIES_SAC.reduce((total, cat) => total + (sac[cat.id] ? sac[cat.id].length : 0), 0);
}

function rafraichirAffichageSac() {
  const boutonEl = document.getElementById('sacBouton');
  if (!boutonEl) return; // page sans sac à dos : rien à faire

  const sac = chargerSac();
  const total = compterToutSac(sac);

  const badge = document.getElementById('sacBadge');
  badge.textContent = total;
  badge.classList.toggle('vide', total === 0);

  document.getElementById('sacSousTitre').textContent =
    total === 0
      ? tSacOuDefaut('sacVide', 'nothing yet')
      : (typeof tAvecVariables === 'function'
          ? tAvecVariables(total === 1 ? 'sacUnItem' : 'sacPlusieursItems', { n: total })
          : (total === 1 ? '1 item saved' : total + ' items saved'));

  const corps = document.getElementById('sacCorps');
  corps.innerHTML = '';

  CATEGORIES_SAC.forEach(cat => {
    const items = sac[cat.id] || [];
    const div = document.createElement('div');
    div.className = 'sac-categorie';
    div.innerHTML =
      '<div class="sac-cat-entete" onclick="toggleCategorieSac(this)">' +
        '<span class="sac-cat-icone">' + cat.icone + '</span>' +
        '<span>' + tSacOuDefaut(cat.cle, cat.nomParDefaut) + '</span>' +
        '<span class="sac-cat-compteur">' + items.length + '</span>' +
        '<span class="sac-cat-chevron">&#9660;</span>' +
      '</div>' +
      '<div class="sac-cat-liste">' +
        (items.length === 0
          ? '<div class="sac-vide">' + tSacOuDefaut('sacRienIci', 'Nothing here yet.') + '</div>'
          : items.map(i => '<div class="sac-item"><span class="sac-item-nom">' + (i.nom || i.mot || i.code || '—') + '</span><span class="sac-item-detail">' + (i.trad || i.description || i.titre || '') + '</span></div>').join('')
        ) +
      '</div>';
    corps.appendChild(div);
  });
}

function toggleCategorieSac(entete) {
  entete.parentElement.classList.toggle('repliee');
}

function toggleSacADos() {
  const bouton = document.getElementById('sacBouton');
  const panneau = document.getElementById('sacPanneau');
  const ouvert = panneau.classList.toggle('ouvert');
  bouton.classList.toggle('ouvert', ouvert);
}

document.addEventListener('click', (e) => {
  const bouton = document.getElementById('sacBouton');
  const panneau = document.getElementById('sacPanneau');
  if (!bouton || !panneau) return;
  if (panneau.classList.contains('ouvert') &&
      !panneau.contains(e.target) &&
      e.target !== bouton && !bouton.contains(e.target)) {
    panneau.classList.remove('ouvert');
    bouton.classList.remove('ouvert');
  }
});

// ---------- Icônes de catégorie (traits simples, cohérents avec le style du site) ----------

function iconeSacLivre() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5C4 3.7 4.7 3 5.5 3H12V21H5.5C4.7 21 4 20.3 4 19.5Z"/><path d="M20 4.5C20 3.7 19.3 3 18.5 3H12V21H18.5C19.3 21 20 20.3 20 19.5Z"/></svg>';
}
function iconeSacCle() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8 20 3"/><path d="M16 7l3 3"/><path d="M13.5 9.5l2.5 2.5"/></svg>';
}
function iconeSacEtoile() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2-4.8-4.3 6.4-.6Z"/></svg>';
}
function iconeSacTrophee() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v6a4 4 0 0 1-8 0Z"/><path d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5C4 8.5 5.5 10 8 10"/><path d="M16 5h2.5A1.5 1.5 0 0 1 20 6.5C20 8.5 18.5 10 16 10"/><path d="M12 14v3"/><path d="M9 20.5h6"/><path d="M9.5 17.5h5l.5 3h-6Z"/></svg>';
}
function iconeSacCarte() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="12" height="16" rx="2"/><path d="M20 7.5 16 19"/></svg>';
}

// ---------- Bouton de test optionnel (présent seulement sur les pages qui le souhaitent) ----------

const EXEMPLES_SAC = [
  { categorie: 'mots', item: { mot: 'papillon', trad: 'butterfly' } },
  { categorie: 'mots', item: { mot: 'gentil', trad: 'kind' } },
  { categorie: 'codes', item: { code: 'A7K2', description: 'bonus access — lesson 3' } },
  { categorie: 'succes', item: { titre: 'First lesson completed' } },
  { categorie: 'trophees', item: { titre: 'Trophy: 7-day streak' } },
  { categorie: 'cartes', item: { nom: 'Keb (bonome)', trad: 'common' } }
];
let indexExempleSac = 0;

function ajouterExempleAleatoireSac() {
  const ex = EXEMPLES_SAC[indexExempleSac % EXEMPLES_SAC.length];
  indexExempleSac++;
  ajouterAuSac(ex.categorie, Object.assign({}, ex.item));
}

rafraichirAffichageSac();
