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

// ==================================================================
// Vocabulaire du sac, centralisé ici (v49) — même logique que
// l'extraction de la logique/CSS en v42 : avant, chaque page qui
// affiche le sac dupliquait catMots/catCodes/.../sacVide/etc. dans son
// propre dictionnaire local (confirmé : catMots apparaissait déjà 19
// fois dans intro-bonomes.html et 20 fois dans parcours.html, une fois
// par langue). Ici, une seule fois par langue — tSacOuDefaut() le
// consulte en premier, avant de retomber sur le t() propre à la page.
// Toute future leçon qui affiche le sac hérite de ces traductions sans
// rien dupliquer dans son propre dictionnaire.
//
// Valeurs copiées telles quelles depuis les dictionnaires déjà en
// place dans parcours.html (source la plus complète, 20 langues) —
// rien de réinventé, à l'exception de sacRetirer (nouveau cette
// session, absent partout jusqu'ici, voir BONOMES_v48).
//
// Nommage volontairement distinct de ce qu'utilisent déjà les pages
// (CLE_LANGUE_SAC, pas CLE_LANGUE ; langueActuelleSac, pas
// langueActuelle) : ce fichier est chargé en <script> classique, donc
// dans le MÊME scope global que le script de la page hôte — réutiliser
// un nom déjà déclaré là-bas (ex. CLE_LANGUE) provoquerait une
// SyntaxError qui casserait toute la page. Vérifié absent des pages
// hôtes avant de choisir ces noms.
// ==================================================================
const CLE_LANGUE_SAC = 'kebbek_langue';
function langueActuelleSac() {
  try { return localStorage.getItem(CLE_LANGUE_SAC) || 'en'; }
  catch (e) { return 'en'; }
}

const DICO_SAC = {
  fr: { catMots: "Mots appris", catCodes: "Codes", catSucces: "Réussites", catTrophees: "Trophées", catCartes: "Cartes", sacVide: "rien pour l'instant", sacRienIci: "Rien ici pour l'instant.", sacRetirer: "Retirer", sacCopier: "Copier", sacUnItem: "{n} élément enregistré", sacPlusieursItems: "{n} éléments enregistrés", sacIntroPremiereFois: "Des mots que tu as déjà croisés sont ici ! Tu peux les copier ou les enlever — bientôt, tu pourras cocher les nouveaux mots que tu veux garder.", sacIntroCompris: "Compris !" },
  en: { catMots: "Words learned", catCodes: "Codes", catSucces: "Achievements", catTrophees: "Trophies", catCartes: "Cards", sacVide: "nothing yet", sacRienIci: "Nothing here yet.", sacRetirer: "Remove", sacCopier: "Copy", sacUnItem: "{n} item saved", sacPlusieursItems: "{n} items saved", sacIntroPremiereFois: "Some words you've already come across are here! You can copy them or remove them — soon, you'll be able to check off any new word you want to keep.", sacIntroCompris: "Got it!" },
  es: { catMots: "Palabras aprendidas", catCodes: "Códigos", catSucces: "Logros", catTrophees: "Trofeos", catCartes: "Cartas", sacVide: "nada todavía", sacRienIci: "Todavía no hay nada aquí.", sacRetirer: "Quitar", sacCopier: "Copiar", sacUnItem: "{n} elemento guardado", sacPlusieursItems: "{n} elementos guardados", sacIntroPremiereFois: "Algunas palabras que ya has visto están aquí. Puedes copiarlas o quitarlas — pronto podrás marcar las palabras nuevas que quieras conservar.", sacIntroCompris: "¡Entendido!" },
  pt: { catMots: "Palavras aprendidas", catCodes: "Códigos", catSucces: "Sucessos", catTrophees: "Troféus", catCartes: "Cartas", sacVide: "nada ainda", sacRienIci: "Ainda não há nada aqui.", sacRetirer: "Remover", sacCopier: "Copiar", sacUnItem: "{n} item guardado", sacPlusieursItems: "{n} itens guardados", sacIntroPremiereFois: "Algumas palavras que já viste estão aqui. Podes copiá-las ou removê-las — em breve, vais poder assinalar as novas palavras que queres guardar.", sacIntroCompris: "Entendido!" },
  it: { catMots: "Parole imparate", catCodes: "Codici", catSucces: "Traguardi", catTrophees: "Trofei", catCartes: "Carte", sacVide: "ancora niente", sacRienIci: "Ancora niente qui.", sacRetirer: "Rimuovi", sacCopier: "Copia", sacUnItem: "{n} elemento salvato", sacPlusieursItems: "{n} elementi salvati", sacIntroPremiereFois: "Alcune parole che hai già incontrato sono qui. Puoi copiarle o rimuoverle — presto potrai selezionare le nuove parole che vuoi conservare.", sacIntroCompris: "Capito!" },
  de: { catMots: "Gelernte Wörter", catCodes: "Codes", catSucces: "Erfolge", catTrophees: "Trophäen", catCartes: "Karten", sacVide: "noch nichts", sacRienIci: "Hier ist noch nichts.", sacRetirer: "Entfernen", sacCopier: "Kopieren", sacUnItem: "{n} Gegenstand gespeichert", sacPlusieursItems: "{n} Gegenstände gespeichert", sacIntroPremiereFois: "Ein paar Wörter, die dir schon begegnet sind, sind schon hier. Du kannst sie kopieren oder entfernen — bald kannst du neue Wörter ankreuzen, die du behalten willst.", sacIntroCompris: "Verstanden!" },
  nl: { catMots: "Geleerde woorden", catCodes: "Codes", catSucces: "Prestaties", catTrophees: "Trofeeën", catCartes: "Kaarten", sacVide: "nog niets", sacRienIci: "Hier is nog niets.", sacRetirer: "Verwijderen", sacCopier: "Kopiëren", sacUnItem: "{n} item opgeslagen", sacPlusieursItems: "{n} items opgeslagen", sacIntroPremiereFois: "Een paar woorden die je al bent tegengekomen staan hier al. Je kunt ze kopiëren of verwijderen — binnenkort kun je nieuwe woorden aanvinken die je wilt bewaren.", sacIntroCompris: "Begrepen!" },
  ca: { catMots: "Paraules apreses", catCodes: "Codis", catSucces: "Assoliments", catTrophees: "Trofeus", catCartes: "Cartes", sacVide: "encara res", sacRienIci: "Encara no hi ha res aquí.", sacRetirer: "Treure", sacCopier: "Copiar", sacUnItem: "{n} element desat", sacPlusieursItems: "{n} elements desats", sacIntroPremiereFois: "Algunes paraules que ja has trobat són aquí. Les pots copiar o treure — aviat podràs marcar les paraules noves que vulguis conservar.", sacIntroCompris: "Entès!" },
  ru: { catMots: "Выученные слова", catCodes: "Коды", catSucces: "Достижения", catTrophees: "Трофеи", catCartes: "Карточки", sacVide: "пока пусто", sacRienIci: "Здесь пока ничего нет.", sacRetirer: "Убрать", sacCopier: "Копировать", sacUnItem: "Сохранено: {n}", sacPlusieursItems: "Сохранено: {n}", sacIntroPremiereFois: "Некоторые слова, которые тебе уже встречались, уже здесь. Их можно скопировать или убрать — скоро ты сможешь отмечать новые слова, которые хочешь сохранить.", sacIntroCompris: "Понятно!" },
  zh: { catMots: "学会的单词", catCodes: "兑换码", catSucces: "成就", catTrophees: "奖杯", catCartes: "卡片", sacVide: "还没有内容", sacRienIci: "这里还没有内容。", sacRetirer: "移除", sacCopier: "复制", sacUnItem: "已保存 {n} 项", sacPlusieursItems: "已保存 {n} 项", sacIntroPremiereFois: "你已经遇到过的一些单词已经在这里了。你可以复制或移除它们——很快你就能勾选想保留的新单词了。", sacIntroCompris: "知道了！" },
  ja: { catMots: "習った単語", catCodes: "コード", catSucces: "達成記録", catTrophees: "トロフィー", catCartes: "カード", sacVide: "まだ何もありません", sacRienIci: "まだここには何もありません。", sacRetirer: "削除", sacCopier: "コピー", sacUnItem: "{n}個 保存済み", sacPlusieursItems: "{n}個 保存済み", sacIntroPremiereFois: "すでに出会った単語がいくつかここにあります。コピーしたり削除したりできます — もうすぐ、残したい新しい単語にチェックを入れられるようになります。", sacIntroCompris: "わかった！" },
  ko: { catMots: "배운 단어", catCodes: "코드", catSucces: "업적", catTrophees: "트로피", catCartes: "카드", sacVide: "아직 없음", sacRienIci: "아직 여기에 아무것도 없어요.", sacRetirer: "제거", sacCopier: "복사", sacUnItem: "{n}개 저장됨", sacPlusieursItems: "{n}개 저장됨", sacIntroPremiereFois: "이미 만난 몇몇 단어가 여기 있어요. 복사하거나 지울 수 있어요 — 곧 간직하고 싶은 새 단어에 체크할 수 있게 될 거예요.", sacIntroCompris: "알겠어요!" },
  vi: { catMots: "Từ đã học", catCodes: "Mã", catSucces: "Thành tích", catTrophees: "Cúp", catCartes: "Thẻ bài", sacVide: "chưa có gì", sacRienIci: "Chưa có gì ở đây.", sacRetirer: "Xóa", sacCopier: "Sao chép", sacUnItem: "Đã lưu {n} món", sacPlusieursItems: "Đã lưu {n} món", sacIntroPremiereFois: "Một số từ bạn đã từng gặp đã có ở đây rồi. Bạn có thể sao chép hoặc xóa chúng — sắp tới bạn sẽ có thể đánh dấu những từ mới muốn giữ lại.", sacIntroCompris: "Đã hiểu!" },
  tl: { catMots: "Mga natutunang salita", catCodes: "Mga kodigo", catSucces: "Mga tagumpay", catTrophees: "Mga trofeo", catCartes: "Mga kard", sacVide: "wala pa", sacRienIci: "Wala pang laman dito.", sacRetirer: "Alisin", sacCopier: "Kopyahin", sacUnItem: "{n} bagay ang naka-imbak", sacPlusieursItems: "{n} na bagay ang naka-imbak", sacIntroPremiereFois: "May mga salita ka nang nakasalubong na nandito na. Puwede mo silang kopyahin o alisin — malapit ka nang makapag-check ng mga bagong salitang gusto mong itago.", sacIntroCompris: "Nakuha ko!" },
  id: { catMots: "Kata yang dipelajari", catCodes: "Kode", catSucces: "Pencapaian", catTrophees: "Piala", catCartes: "Kartu", sacVide: "belum ada", sacRienIci: "Belum ada apa-apa di sini.", sacRetirer: "Hapus", sacCopier: "Salin", sacUnItem: "{n} item tersimpan", sacPlusieursItems: "{n} item tersimpan", sacIntroPremiereFois: "Beberapa kata yang sudah kamu temui sudah ada di sini. Kamu bisa menyalin atau menghapusnya — segera kamu bisa mencentang kata baru yang ingin disimpan.", sacIntroCompris: "Mengerti!" },
  ht: { catMots: "Mo yo aprann", catCodes: "Kòd", catSucces: "Reyisit", catTrophees: "Twofe", catCartes: "Kat", sacVide: "poko gen anyen", sacRienIci: "Poko gen anyen isit la.", sacRetirer: "Retire", sacCopier: "Kopye", sacUnItem: "{n} bagay anrejistre", sacPlusieursItems: "{n} bagay anrejistre", sacIntroPremiereFois: "Gen kèk mo ou deja kwaze ki deja la a. Ou ka kopye yo oswa retire yo — talè konsa, w ap ka koche nouvo mo ou vle konsève.", sacIntroCompris: "Konpri!" },
  fa: { catMots: "کلمات یاد گرفته‌شده", catCodes: "کدها", catSucces: "دستاوردها", catTrophees: "جام‌ها", catCartes: "کارت‌ها", sacVide: "هنوز چیزی نیست", sacRienIci: "هنوز چیزی اینجا نیست.", sacRetirer: "حذف", sacCopier: "کپی", sacUnItem: "{n} مورد ذخیره شد", sacPlusieursItems: "{n} مورد ذخیره شد", sacIntroPremiereFois: "چند کلمه که قبلاً باهاشون روبه‌رو شدی همین‌جا هستن! می‌تونی کپی‌شون کنی یا حذفشون کنی — به‌زودی می‌تونی کلمه‌های جدیدی که می‌خوای نگه داری رو تیک بزنی.", sacIntroCompris: "متوجه شدم!" },
  no: { catMots: "Lærte ord", catCodes: "Koder", catSucces: "Prestasjoner", catTrophees: "Trofeer", catCartes: "Kort", sacVide: "ingenting ennå", sacRienIci: "Ingenting her ennå.", sacRetirer: "Fjern", sacCopier: "Kopier", sacUnItem: "{n} gjenstand lagret", sacPlusieursItems: "{n} gjenstander lagret", sacIntroPremiereFois: "Noen ord du allerede har møtt ligger her. Du kan kopiere dem eller fjerne dem — snart kan du hake av nye ord du vil beholde.", sacIntroCompris: "Skjønner!" },
  sv: { catMots: "Inlärda ord", catCodes: "Koder", catSucces: "Prestationer", catTrophees: "Troféer", catCartes: "Kort", sacVide: "inget än", sacRienIci: "Inget här än.", sacRetirer: "Ta bort", sacCopier: "Kopiera", sacUnItem: "{n} sak sparad", sacPlusieursItems: "{n} saker sparade", sacIntroPremiereFois: "Några ord du redan har stött på finns redan här. Du kan kopiera eller ta bort dem — snart kan du kryssa i nya ord du vill spara.", sacIntroCompris: "Uppfattat!" },
  eo: { catMots: "Lernitaj vortoj", catCodes: "Kodoj", catSucces: "Atingoj", catTrophees: "Trofeoj", catCartes: "Kartoj", sacVide: "ankoraŭ nenio", sacRienIci: "Ankoraŭ nenio ĉi tie.", sacRetirer: "Forigi", sacCopier: "Kopii", sacUnItem: "{n} objekto konservita", sacPlusieursItems: "{n} objektoj konservitaj", sacIntroPremiereFois: "Kelkaj vortoj, kiujn vi jam renkontis, jam estas ĉi tie. Vi povas kopii aŭ forigi ilin — baldaŭ vi povos marki novajn vortojn, kiujn vi volas konservi.", sacIntroCompris: "Komprenite!" }
};

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
// Traduit d'abord via DICO_SAC (partagé, voir plus haut) ; si une clé n'y
// est pas (ne devrait pas arriver pour le vocabulaire du sac lui-même,
// mais reste une sécurité), retombe sur le t() de la page si elle en a
// un (index.html, parcours.html), puis sur la valeur par défaut passée
// en anglais. Le test "val !== cle" écarte le repli ultime de certaines
// pages (retourner la clé brute telle quelle) qui n'est pas une vraie
// traduction.
function tSacOuDefaut(cle, defaut) {
  const dict = DICO_SAC[langueActuelleSac()] || DICO_SAC.en;
  if (dict && dict[cle] !== undefined) return dict[cle];
  if (typeof t === 'function') {
    const val = t(cle);
    if (val !== undefined && val !== cle) return val;
  }
  return defaut;
}

// Équivalent de tSacOuDefaut() pour les chaînes avec variables
// (sacUnItem/sacPlusieursItems) — même ordre de priorité.
function tSacAvecVariables(cle, variables) {
  const dict = DICO_SAC[langueActuelleSac()] || DICO_SAC.en;
  let texte = (dict && dict[cle] !== undefined) ? dict[cle]
    : (typeof tAvecVariables === 'function' ? null : cle);
  if (texte === null) return tAvecVariables(cle, variables);
  Object.keys(variables).forEach(nomVar => {
    texte = texte.replace('{' + nomVar + '}', variables[nomVar]);
  });
  return texte;
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

// 🐛 CORRIGÉ, round 2 (signalé par Raphaël : le correctif précédent
// n'avait rien changé) : le drapeau booléen ne se levait que pour un
// AJOUT RÉEL (dejaLa === false). Mais en pratique, sur souris, le mot
// est presque toujours déjà ajouté par le SURVOL (mouseenter → ouvre
// l'infobulle → ajoute au sac) avant même que le clic n'arrive — le
// clic qui suit trouve donc le mot déjà présent (dejaLa === true), ne
// lève jamais le drapeau pour CE clic précis, et le panneau se
// refermait quand même. D'où l'observation de Raphaël : il fallait
// "cliquer deux fois" (le premier clic fermait sans rien ajouter de
// visible, puisque l'ajout réel avait déjà eu lieu, silencieusement,
// au survol juste avant).
//
// Remplacé par un horodatage plutôt qu'un drapeau : dernierAppelAuSacLe
// est mis à jour à CHAQUE appel d'ajouterAuSac (ajout réel OU rappel
// d'un mot déjà là), et le détecteur de clic extérieur plus bas vérifie
// si cet appel est tout récent (moins de DELAI_IGNORER_FERMETURE_SAC)
// plutôt que d'exiger qu'il ait eu lieu PENDANT ce clic précis. Couvre
// à la fois survol-puis-clic (souris, ajout un peu avant le clic) et
// tap direct (tactile, ajout et clic quasi simultanés).
let dernierAppelAuSacLe = 0;
const DELAI_IGNORER_FERMETURE_SAC = 400; // ms

function ajouterAuSac(categorie, item) {
  dernierAppelAuSacLe = Date.now();
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

// Retire un item du sac par son identifiant (mot/code/titre/nom — même
// logique de correspondance qu'ajouterAuSac). Utilisé à la fois par le
// bouton "retirer" de chaque item dans le panneau, et par le point
// d'appel local de chaque page quand une case à cocher est décochée
// (ex. afficherCaseSauvegarde() dans intro-bonomes.html) — décocher
// doit annuler l'ajout, pas simplement ignorer le changement.
function retirerDuSac(categorie, identifiant) {
  const sac = chargerSac();
  if (!sac[categorie]) return;
  sac[categorie] = sac[categorie].filter(i => (i.mot || i.code || i.titre || i.nom) !== identifiant);
  sauvegarderSac(sac);
  rafraichirAffichageSac();
}

// Copie le texte d'un item (mot + traduction) dans le presse-papiers.
// navigator.clipboard demande un contexte sécurisé (https ou localhost) —
// GitHub Pages sert toujours en https, donc pas de repli nécessaire pour
// la production ; execCommand (obsolète) volontairement pas utilisé ici.
// Petit retour visuel (coche 1,1s) plutôt qu'une alerte bloquante.
function copierDepuisSac(bouton) {
  const texte = bouton.dataset.texte || '';
  if (!navigator.clipboard || !texte) return;
  navigator.clipboard.writeText(texte).then(() => {
    const original = bouton.innerHTML;
    bouton.innerHTML = '&#10003;';
    bouton.classList.add('copie');
    setTimeout(() => {
      bouton.innerHTML = original;
      bouton.classList.remove('copie');
    }, 1100);
  }).catch(e => console.warn('Copie impossible.', e));
}

// Échappement minimal pour insérer une valeur dynamique dans un attribut
// HTML construit via innerHTML — nécessaire ici parce que identifiant
// peut contenir une apostrophe (élisions françaises : "l'ami", "d'accord"),
// ce qui casserait un attribut si on l'insérait sans échappement.
function echapperAttribut(valeur) {
  return String(valeur)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
      : tSacAvecVariables(total === 1 ? 'sacUnItem' : 'sacPlusieursItems', { n: total });

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
          : items.map(i => {
              const identifiant = i.mot || i.code || i.titre || i.nom || '';
              const nomAffiche = i.nom || i.mot || i.code || '—';
              const detailAffiche = i.trad || i.description || i.titre || '';
              const texteACopier = detailAffiche ? (nomAffiche + ' : ' + detailAffiche) : nomAffiche;
              return '<div class="sac-item">' +
                '<span class="sac-item-principal">' +
                  '<span class="sac-item-nom">' + nomAffiche + '</span>' +
                  '<span class="sac-item-detail">' + detailAffiche + '</span>' +
                '</span>' +
                '<button type="button" class="sac-item-copier" title="' + echapperAttribut(tSacOuDefaut('sacCopier', 'Copy')) + '" ' +
                  'data-texte="' + echapperAttribut(texteACopier) + '" ' +
                  'onclick="copierDepuisSac(this)">&#10697;</button>' +
                '<button type="button" class="sac-item-retirer" title="' + echapperAttribut(tSacOuDefaut('sacRetirer', 'Remove')) + '" ' +
                  'data-cat="' + cat.id + '" data-id="' + echapperAttribut(identifiant) + '" ' +
                  'onclick="retirerDuSac(this.dataset.cat, this.dataset.id)">&times;</button>' +
              '</div>';
            }).join('')
        ) +
      '</div>';
    corps.appendChild(div);
  });
}

function toggleCategorieSac(entete) {
  entete.parentElement.classList.toggle('repliee');
}

// ---------- Bannière d'introduction (première ouverture seulement) ----------
//
// sacIntroPremiereFois/sacIntroCompris existent dans DICO_SAC depuis une
// session précédente, mais rien ne les affichait encore — la tâche s'était
// arrêtée à la traduction, avant l'affichage réel. Complété ici : la
// bannière apparaît au-dessus de la liste au tout premier "sacBouton" cliqué
// qui ouvre le panneau, quelle que soit la page (clé localStorage partagée,
// comme CLE_SAC lui-même), et ne réapparaît plus une fois "Compris !" cliqué.
const CLE_SAC_INTRO_VUE = 'keb_bek_sac_intro_vue';

function afficherIntroSacSiPremiereFois() {
  try {
    if (localStorage.getItem(CLE_SAC_INTRO_VUE) === '1') return;
  } catch (e) { return; }
  const panneau = document.getElementById('sacPanneau');
  const corps = document.getElementById('sacCorps');
  if (!panneau || !corps || document.getElementById('sacIntro')) return;

  const div = document.createElement('div');
  div.className = 'sac-intro';
  div.id = 'sacIntro';
  div.innerHTML =
    '<p>' + tSacOuDefaut('sacIntroPremiereFois', "Some words you've already come across are here! You can copy them or remove them — soon, you'll be able to check off any new word you want to keep.") + '</p>' +
    '<button type="button" id="btnSacIntroCompris">' + tSacOuDefaut('sacIntroCompris', 'Got it!') + '</button>';
  panneau.insertBefore(div, corps);

  document.getElementById('btnSacIntroCompris').addEventListener('click', () => {
    try { localStorage.setItem(CLE_SAC_INTRO_VUE, '1'); } catch (e) {}
    div.remove();
  });
}

function toggleSacADos() {
  const bouton = document.getElementById('sacBouton');
  const panneau = document.getElementById('sacPanneau');
  const ouvert = panneau.classList.toggle('ouvert');
  bouton.classList.toggle('ouvert', ouvert);
  if (ouvert) afficherIntroSacSiPremiereFois();
}

// 🐛 CORRIGÉ (signalé par Raphaël : le sac se refermait tout seul à
// chaque mot retiré, gênant pour en éliminer plusieurs d'affilée) :
// ce détecteur écoutait en phase de BULLE (par défaut). Cliquer sur
// "retirer" (×) déclenche retirerDuSac() → rafraichirAffichageSac(),
// qui fait corps.innerHTML = '' et reconstruit toute la liste — y
// compris le bouton tout juste cliqué, qui se retrouve détaché du DOM
// avant même que ce détecteur ne s'exécute. panneau.contains(e.target)
// répondait alors "faux" pour un e.target qui n'existe plus dans
// l'arbre, faisant croire à un clic extérieur, donc fermant le
// panneau — alors que le clic était bel et bien à l'intérieur.
// Corrigé en écoutant en phase de CAPTURE (3ᵉ argument `true`) : ce
// détecteur s'exécute alors AVANT que le clic n'atteigne le bouton et
// ne déclenche la reconstruction du DOM, donc e.target est encore
// bien attaché au moment du test — robuste pour ce bouton comme pour
// tout futur bouton du panneau qui modifierait le DOM à son tour.
//
// 🆕 Round 2 : le délai (setTimeout 0) reste nécessaire pour la même
// raison qu'avant (ce détecteur tourne en CAPTURE, avant que le clic
// n'atteigne sa cible), mais vérifie maintenant la RÉCENCE du dernier
// appel à ajouterAuSac (dernierAppelAuSacLe, voir plus haut) plutôt
// qu'un drapeau propre à ce seul clic — pour couvrir le cas où l'ajout
// a eu lieu au SURVOL, juste avant le clic, pas pendant le clic
// lui-même (voir le commentaire détaillé sur ajouterAuSac plus haut).
document.addEventListener('click', (e) => {
  const bouton = document.getElementById('sacBouton');
  const panneau = document.getElementById('sacPanneau');
  if (!bouton || !panneau) return;
  const dehors = panneau.classList.contains('ouvert') &&
      !panneau.contains(e.target) &&
      e.target !== bouton && !bouton.contains(e.target);
  if (!dehors) return;
  setTimeout(() => {
    if (Date.now() - dernierAppelAuSacLe < DELAI_IGNORER_FERMETURE_SAC) {
      return; // ce clic est lié à un ajout tout récent au sac : on le garde ouvert
    }
    panneau.classList.remove('ouvert');
    bouton.classList.remove('ouvert');
  }, 0);
}, true);

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
