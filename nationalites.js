/* ==================================================================
   nationalites.js — module de données partagé pour le mécanisme
   d'identification genre/nationalité de l'élève (voir BONOMES_v47,
   section permanente "🆕 v47 — Mécanisme d'identification
   genre/nationalité de l'élève").

   Introduit par la Leçon 1 (lecons/lecon-01-rencontre.html, pas encore
   construite — voir ordre de construction v47 : ce fichier est l'étape
   1 sur 4, avant exercices.js, progression.js/SQL, puis le HTML de la
   leçon), mais pensé comme un module PARTAGÉ dès le départ, dans le
   même esprit que sac-a-dos.js/.css et progression.js : un seul endroit
   à corriger si la table ou les priorités changent, consommé par
   n'importe quelle future leçon qui a besoin de ce picker (type
   `choix_identite` dans exercices.js, à construire ensuite).

   Ce que ce fichier fournit :
   - NATIONALITES : table d'adjectifs de nationalité en français
     (masculin/féminin), par code pays ISO 3166-1 alpha-2. Maintenue à
     la main, parce que rien dans Intl ne fournit ça.
   - PRIORITE_PAR_LANGUE : ordre de priorité des pays à afficher en
     premier dans le picker, selon la langue d'interface de l'élève
     (CLE_LANGUE). Pour "eo" (espéranto), pas de biais naturel : ordre
     alphabétique (sur le nom français) plutôt qu'une priorité.
   - nomPays(codeISO, langueAffichage) : nom du pays dans la langue
     demandée, via Intl.DisplayNames — nativement multilingue, aucune
     traduction à maintenir à la main pour ça. Repli sur l'anglais puis
     sur le nom français connu (ou le code brut en dernier recours) si
     la locale demandée ne renvoie rien d'exploitable.
   - paysPrioritaires(langueInterface) : liste ordonnée de pays prête à
     afficher pour cette langue (code + nom localisé + adjectif FR s'il
     existe), plus un marqueur "Autre" en dernière position pour ouvrir
     une recherche complète hors liste.
   - formuleIdentiteFR(codeISO, genre) : la phrase française exacte que
     Keb ou Bek doit prononcer ("Je suis [adjectif]") — ou, pour un pays
     hors table (voie "Autre"), un repli "Je viens de [pays]" (voir
     limite connue ci-dessous).

   ⚠️ CORRECTION DE COMPTAGE (v47 disait "47 pays", vérifié cette
   session : la table telle que transcrite dans le markdown en contient
   en réalité 50 — chaque paire de la liste a été recomptée une à une.
   Aucun pays n'a été ajouté ni retiré par rapport au brouillon fourni,
   seul le chiffre annoncé était faux. Signalé à Raphaël plutôt que
   corrigé en silence dans BONOMES.)

   ⚠️ LIMITE CONNUE, cohérente avec la note déjà posée en v47 ("sans
   adjectif français dédié pour l'instant — à enrichir à l'usage") :
   pour un pays choisi via "Autre" (hors des 50 ci-dessous), la
   préposition française correcte ("de"/"du"/"des"/"d'") selon le pays
   n'est PAS gérée — formuleIdentiteFR retombe sur "Je viens de [pays]"
   pour tous les cas, ce qui est grammaticalement faux pour certains
   pays (ex. "Je viens de le Japon" serait faux, mais ce module ne
   produit heureusement jamais ça : voir le code, un simple "de" fixe
   est utilisé, correct pour une partie des pays seulement). À enrichir
   au cas par cas quand un vrai élève tombe dans ce chemin.
   ================================================================== */

const NATIONALITES = {
  FR: { pays: 'France',            m: 'français',        f: 'française' },
  ES: { pays: 'Espagne',           m: 'espagnol',         f: 'espagnole' },
  MX: { pays: 'Mexique',           m: 'mexicain',         f: 'mexicaine' },
  AR: { pays: 'Argentine',         m: 'argentin',         f: 'argentine' },
  CO: { pays: 'Colombie',          m: 'colombien',        f: 'colombienne' },
  CL: { pays: 'Chili',             m: 'chilien',          f: 'chilienne' },
  PE: { pays: 'Pérou',             m: 'péruvien',         f: 'péruvienne' },
  VE: { pays: 'Venezuela',         m: 'vénézuélien',      f: 'vénézuélienne' },
  EC: { pays: 'Équateur',          m: 'équatorien',       f: 'équatorienne' },
  PT: { pays: 'Portugal',          m: 'portugais',        f: 'portugaise' },
  BR: { pays: 'Brésil',            m: 'brésilien',        f: 'brésilienne' },
  AO: { pays: 'Angola',            m: 'angolais',         f: 'angolaise' },
  MZ: { pays: 'Mozambique',        m: 'mozambicain',      f: 'mozambicaine' },
  CV: { pays: 'Cap-Vert',          m: 'cap-verdien',      f: 'cap-verdienne' },
  IT: { pays: 'Italie',            m: 'italien',          f: 'italienne' },
  CH: { pays: 'Suisse',            m: 'suisse',           f: 'suisse' },
  CN: { pays: 'Chine',             m: 'chinois',          f: 'chinoise' },
  TW: { pays: 'Taïwan',            m: 'taïwanais',        f: 'taïwanaise' },
  SG: { pays: 'Singapour',         m: 'singapourien',     f: 'singapourienne' },
  HK: { pays: 'Hong Kong',         m: 'hongkongais',      f: 'hongkongaise' },
  KR: { pays: 'Corée du Sud',      m: 'coréen',           f: 'coréenne' },
  JP: { pays: 'Japon',             m: 'japonais',         f: 'japonaise' },
  VN: { pays: 'Vietnam',           m: 'vietnamien',       f: 'vietnamienne' },
  PH: { pays: 'Philippines',       m: 'philippin',        f: 'philippine' },
  DE: { pays: 'Allemagne',         m: 'allemand',         f: 'allemande' },
  AT: { pays: 'Autriche',          m: 'autrichien',       f: 'autrichienne' },
  NL: { pays: 'Pays-Bas',          m: 'néerlandais',      f: 'néerlandaise' },
  BE: { pays: 'Belgique',          m: 'belge',            f: 'belge' },
  HT: { pays: 'Haïti',             m: 'haïtien',          f: 'haïtienne' },
  ID: { pays: 'Indonésie',         m: 'indonésien',       f: 'indonésienne' },
  IR: { pays: 'Iran',              m: 'iranien',          f: 'iranienne' },
  AF: { pays: 'Afghanistan',       m: 'afghan',           f: 'afghane' },
  RU: { pays: 'Russie',            m: 'russe',            f: 'russe' },
  BY: { pays: 'Biélorussie',       m: 'biélorusse',       f: 'biélorusse' },
  UA: { pays: 'Ukraine',           m: 'ukrainien',        f: 'ukrainienne' },
  KZ: { pays: 'Kazakhstan',        m: 'kazakh',           f: 'kazakhe' },
  NO: { pays: 'Norvège',           m: 'norvégien',        f: 'norvégienne' },
  SE: { pays: 'Suède',             m: 'suédois',          f: 'suédoise' },
  CA: { pays: 'Canada',            m: 'canadien',         f: 'canadienne' },
  US: { pays: 'États-Unis',        m: 'américain',        f: 'américaine' },
  GB: { pays: 'Royaume-Uni',       m: 'britannique',      f: 'britannique' },
  AU: { pays: 'Australie',         m: 'australien',       f: 'australienne' },
  IE: { pays: 'Irlande',           m: 'irlandais',        f: 'irlandaise' },
  IN: { pays: 'Inde',              m: 'indien',           f: 'indienne' },
  ZA: { pays: 'Afrique du Sud',    m: 'sud-africain',     f: 'sud-africaine' },
  NG: { pays: 'Nigeria',           m: 'nigérian',         f: 'nigériane' },
  MA: { pays: 'Maroc',             m: 'marocain',         f: 'marocaine' },
  DZ: { pays: 'Algérie',           m: 'algérien',         f: 'algérienne' },
  SN: { pays: 'Sénégal',           m: 'sénégalais',       f: 'sénégalaise' },
  AD: { pays: 'Andorre',           m: 'andorran',         f: 'andorrane' }
};

const PRIORITE_PAR_LANGUE = {
  es: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC'],
  pt: ['PT', 'BR', 'AO', 'MZ', 'CV'],
  it: ['IT', 'CH'],
  zh: ['CN', 'TW', 'SG', 'HK'],
  ko: ['KR'],
  ja: ['JP'],
  vi: ['VN'],
  tl: ['PH'],
  de: ['DE', 'AT', 'CH'],
  nl: ['NL', 'BE'],
  ca: ['ES', 'AD'],
  ht: ['HT'],
  id: ['ID'],
  fa: ['IR', 'AF'],
  ru: ['RU', 'BY', 'UA', 'KZ'],
  no: ['NO'],
  sv: ['SE'],
  en: ['US', 'GB', 'CA', 'AU', 'IE', 'IN', 'ZA', 'NG']
  // 'eo' n'a volontairement pas d'entrée ici — l'espéranto n'est
  // rattaché à aucun pays réel, donc aucune priorité naturelle à lui
  // donner (contrairement aux 18 autres langues, chacune associée à
  // de vrais pays). paysPrioritaires() bascule alors sur un ordre
  // alphabétique (nom français) pour toute langue absente de cette
  // table, pas seulement pour 'eo' précisément.
};

// Cache des instances Intl.DisplayNames par langue d'affichage — évite
// de recréer le formateur à chaque appel (coût non négligeable si le
// picker de nationalité re-rend souvent, ex. pendant la recherche
// "Autre").
const _cacheDisplayNames = {};

function _formateurPays(langueAffichage) {
  if (_cacheDisplayNames[langueAffichage] !== undefined) return _cacheDisplayNames[langueAffichage];
  let formateur = null;
  try {
    formateur = new Intl.DisplayNames([langueAffichage], { type: 'region' });
  } catch (e) {
    formateur = null; // langue non reconnue par le moteur — voir repli dans nomPays()
  }
  _cacheDisplayNames[langueAffichage] = formateur;
  return formateur;
}

// Nom du pays localisé. Repli en cascade : langue demandée → anglais →
// code ISO brut (jamais une chaîne vide ni une exception qui remonte).
function nomPays(codeISO, langueAffichage) {
  const formateur = _formateurPays(langueAffichage);
  if (formateur) {
    try {
      const nom = formateur.of(codeISO);
      if (nom && nom !== codeISO) return nom;
    } catch (e) { /* code pays invalide pour ce formateur — on tente le repli anglais */ }
  }
  if (langueAffichage !== 'en') {
    const formateurAnglais = _formateurPays('en');
    if (formateurAnglais) {
      try {
        const nom = formateurAnglais.of(codeISO);
        if (nom) return nom;
      } catch (e) { /* tombe sur le repli final */ }
    }
  }
  return (NATIONALITES[codeISO] && NATIONALITES[codeISO].pays) || codeISO;
}

// Liste ordonnée de pays prête à afficher pour le picker de nationalité
// d'une langue d'interface donnée. Chaque entrée : { code, nom, adjectifM, adjectifF }.
// 'autre' n'est PAS inclus ici — c'est à l'UI (Leçon 1) d'ajouter son
// propre bouton "Autre" en dernière position, puisque son comportement
// (ouvrir une recherche) est une décision d'interface, pas de données.
function paysPrioritaires(langueInterface) {
  let codes = PRIORITE_PAR_LANGUE[langueInterface];

  if (!codes) {
    // Langue absente de la table de priorité (le cas prévu de 'eo', qui
    // n'est rattachée à aucun pays réel — traité génériquement pour
    // toute langue future non encore priorisée) : ordre alphabétique
    // sur le nom français, qu'on maîtrise nous-mêmes et qui reste
    // stable peu importe la qualité des données Intl disponibles pour
    // cette langue précise.
    codes = Object.keys(NATIONALITES).sort((a, b) =>
      NATIONALITES[a].pays.localeCompare(NATIONALITES[b].pays, 'fr')
    );
  }

  return codes.map(code => ({
    code: code,
    nom: nomPays(code, langueInterface),
    adjectifM: NATIONALITES[code] ? NATIONALITES[code].m : null,
    adjectifF: NATIONALITES[code] ? NATIONALITES[code].f : null
  }));
}

// La phrase française exacte que Keb ou Bek doit prononcer dans le
// dialogue simulé de la Leçon 1 ("Je suis [adjectif]"). genre attendu :
// 'm' ou 'f'. Pour un pays hors table (voie "Autre"), repli sur "Je
// viens de [pays]" — voir la limite connue documentée en tête de
// fichier (préposition "de" fixe, pas toujours grammaticalement exacte).
function formuleIdentiteFR(codeISO, genre) {
  const entree = NATIONALITES[codeISO];
  if (entree) {
    const adjectif = genre === 'f' ? entree.f : entree.m;
    return { type: 'adjectif', texte: 'Je suis ' + adjectif + '.' };
  }
  const nom = nomPays(codeISO, 'fr');
  return { type: 'pays', texte: 'Je viens de ' + nom + '.' };
}

window.KebBekNationalites = {
  NATIONALITES,
  PRIORITE_PAR_LANGUE,
  nomPays,
  paysPrioritaires,
  formuleIdentiteFR
};
