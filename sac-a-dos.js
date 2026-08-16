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
  fr: { catMots: "Mots appris", catCodes: "Codes", catSucces: "Réussites", catTrophees: "Trophées", catCartes: "Cartes", sacVide: "rien pour l'instant", sacRienIci: "Rien ici pour l'instant.", sacRetirer: "Retirer", sacCopier: "Copier", sacUnItem: "{n} élément enregistré", sacPlusieursItems: "{n} éléments enregistrés", sacIntroPremiereFois: "Des mots que tu as déjà croisés sont ici ! Tu peux les copier ou les enlever — bientôt, tu pourras cocher les nouveaux mots que tu veux garder.", sacIntroCompris: "Compris !", sacViderCategorie: "Vider", sacViderTout: "Tout vider", sacConfirmViderCategorie: "Vider complètement « {categorie} » ? Cette action est irréversible.", sacConfirmViderTout: "Vider complètement le sac à dos ? Cette action est irréversible.", sacCopierCategorie: "Copier la catégorie", sacCopierTout: "Copier tout le sac", sacRienACopier: "Rien à copier dans cette catégorie.", sacModalCopierPuisVider: "Copier, puis vider", sacModalViderSansCopier: "Vider sans copier", sacModalAnnuler: "Annuler", natureArticle: "Articles", natureDeterminant: "Déterminants", natureNom: "Noms", naturePronom: "Pronoms", natureVerbe: "Verbes", natureAdjectif: "Adjectifs", natureAdverbe: "Adverbes", naturePreposition: "Prépositions", natureConjonction: "Conjonctions", natureInterjection: "Interjections", natureExpression: "Expressions", natureAutre: "Autres", naturePrefixeVerbe: "verbe", conjIndicatifPresent: "Indicatif présent", conjImperatifPresent: "Impératif", catGrammaire: "Points de grammaire", sacExemple: "Exemple", sacAjouterAuSac: "Ajouter au sac" },
  en: { catMots: "Words learned", catCodes: "Codes", catSucces: "Achievements", catTrophees: "Trophies", catCartes: "Cards", sacVide: "nothing yet", sacRienIci: "Nothing here yet.", sacRetirer: "Remove", sacCopier: "Copy", sacUnItem: "{n} item saved", sacPlusieursItems: "{n} items saved", sacIntroPremiereFois: "Some words you've already come across are here! You can copy them or remove them — soon, you'll be able to check off any new word you want to keep.", sacIntroCompris: "Got it!", sacViderCategorie: "Clear", sacViderTout: "Clear everything", sacConfirmViderCategorie: "Completely clear \"{categorie}\"? This can't be undone.", sacConfirmViderTout: "Completely clear the whole backpack? This can't be undone.", sacCopierCategorie: "Copy this category", sacCopierTout: "Copy the whole backpack", sacRienACopier: "Nothing to copy in this category.", sacModalCopierPuisVider: "Copy, then clear", sacModalViderSansCopier: "Clear without copying", sacModalAnnuler: "Cancel", natureArticle: "Articles", natureDeterminant: "Determiners", natureNom: "Nouns", naturePronom: "Pronouns", natureVerbe: "Verbs", natureAdjectif: "Adjectives", natureAdverbe: "Adverbs", naturePreposition: "Prepositions", natureConjonction: "Conjunctions", natureInterjection: "Interjections", natureExpression: "Expressions", natureAutre: "Other", naturePrefixeVerbe: "verb", conjIndicatifPresent: "Present indicative", conjImperatifPresent: "Imperative", catGrammaire: "Grammar points", sacExemple: "Example", sacAjouterAuSac: "Add to backpack" },
  es: { catMots: "Palabras aprendidas", catCodes: "Códigos", catSucces: "Logros", catTrophees: "Trofeos", catCartes: "Cartas", sacVide: "nada todavía", sacRienIci: "Todavía no hay nada aquí.", sacRetirer: "Quitar", sacCopier: "Copiar", sacUnItem: "{n} elemento guardado", sacPlusieursItems: "{n} elementos guardados", sacIntroPremiereFois: "Algunas palabras que ya has visto están aquí. Puedes copiarlas o quitarlas — pronto podrás marcar las palabras nuevas que quieras conservar.", sacIntroCompris: "¡Entendido!", sacViderCategorie: "Vaciar", sacViderTout: "Vaciar todo", sacConfirmViderCategorie: "¿Vaciar completamente «{categorie}»? Esto no se puede deshacer.", sacConfirmViderTout: "¿Vaciar completamente toda la mochila? Esto no se puede deshacer.", sacCopierCategorie: "Copiar esta categoría", sacCopierTout: "Copiar toda la mochila", sacRienACopier: "No hay nada que copiar en esta categoría.", sacModalCopierPuisVider: "Copiar y luego vaciar", sacModalViderSansCopier: "Vaciar sin copiar", sacModalAnnuler: "Cancelar", natureArticle: "Artículos", natureDeterminant: "Determinantes", natureNom: "Sustantivos", naturePronom: "Pronombres", natureVerbe: "Verbos", natureAdjectif: "Adjetivos", natureAdverbe: "Adverbios", naturePreposition: "Preposiciones", natureConjonction: "Conjunciones", natureInterjection: "Interjecciones", natureExpression: "Expresiones", natureAutre: "Otros", naturePrefixeVerbe: "verbo", conjIndicatifPresent: "Presente de indicativo", conjImperatifPresent: "Imperativo", catGrammaire: "Gramática", sacExemple: "Ejemplo", sacAjouterAuSac: "Añadir a la mochila" },
  pt: { catMots: "Palavras aprendidas", catCodes: "Códigos", catSucces: "Sucessos", catTrophees: "Troféus", catCartes: "Cartas", sacVide: "nada ainda", sacRienIci: "Ainda não há nada aqui.", sacRetirer: "Remover", sacCopier: "Copiar", sacUnItem: "{n} item guardado", sacPlusieursItems: "{n} itens guardados", sacIntroPremiereFois: "Algumas palavras que já viste estão aqui. Podes copiá-las ou removê-las — em breve, vais poder assinalar as novas palavras que queres guardar.", sacIntroCompris: "Entendido!", sacViderCategorie: "Limpar", sacViderTout: "Limpar tudo", sacConfirmViderCategorie: "Limpar completamente «{categorie}»? Esta ação não pode ser desfeita.", sacConfirmViderTout: "Limpar completamente toda a mochila? Esta ação não pode ser desfeita.", sacCopierCategorie: "Copiar esta categoria", sacCopierTout: "Copiar toda a mochila", sacRienACopier: "Nada para copiar nesta categoria.", sacModalCopierPuisVider: "Copiar e depois limpar", sacModalViderSansCopier: "Limpar sem copiar", sacModalAnnuler: "Cancelar", natureArticle: "Artigos", natureDeterminant: "Determinantes", natureNom: "Substantivos", naturePronom: "Pronomes", natureVerbe: "Verbos", natureAdjectif: "Adjetivos", natureAdverbe: "Advérbios", naturePreposition: "Preposições", natureConjonction: "Conjunções", natureInterjection: "Interjeições", natureExpression: "Expressões", natureAutre: "Outros", naturePrefixeVerbe: "verbo", conjIndicatifPresent: "Presente do indicativo", conjImperatifPresent: "Imperativo", catGrammaire: "Gramática", sacExemple: "Exemplo", sacAjouterAuSac: "Adicionar à mochila" },
  it: { catMots: "Parole imparate", catCodes: "Codici", catSucces: "Traguardi", catTrophees: "Trofei", catCartes: "Carte", sacVide: "ancora niente", sacRienIci: "Ancora niente qui.", sacRetirer: "Rimuovi", sacCopier: "Copia", sacUnItem: "{n} elemento salvato", sacPlusieursItems: "{n} elementi salvati", sacIntroPremiereFois: "Alcune parole che hai già incontrato sono qui. Puoi copiarle o rimuoverle — presto potrai selezionare le nuove parole che vuoi conservare.", sacIntroCompris: "Capito!", sacViderCategorie: "Svuota", sacViderTout: "Svuota tutto", sacConfirmViderCategorie: "Svuotare completamente «{categorie}»? Non si può annullare.", sacConfirmViderTout: "Svuotare completamente tutto lo zaino? Non si può annullare.", sacCopierCategorie: "Copia questa categoria", sacCopierTout: "Copia tutto lo zaino", sacRienACopier: "Niente da copiare in questa categoria.", sacModalCopierPuisVider: "Copia, poi svuota", sacModalViderSansCopier: "Svuota senza copiare", sacModalAnnuler: "Annulla", natureArticle: "Articoli", natureDeterminant: "Determinanti", natureNom: "Nomi", naturePronom: "Pronomi", natureVerbe: "Verbi", natureAdjectif: "Aggettivi", natureAdverbe: "Avverbi", naturePreposition: "Preposizioni", natureConjonction: "Congiunzioni", natureInterjection: "Interiezioni", natureExpression: "Espressioni", natureAutre: "Altro", naturePrefixeVerbe: "verbo", conjIndicatifPresent: "Indicativo presente", conjImperatifPresent: "Imperativo", catGrammaire: "Grammatica", sacExemple: "Esempio", sacAjouterAuSac: "Aggiungi allo zaino" },
  de: { catMots: "Gelernte Wörter", catCodes: "Codes", catSucces: "Erfolge", catTrophees: "Trophäen", catCartes: "Karten", sacVide: "noch nichts", sacRienIci: "Hier ist noch nichts.", sacRetirer: "Entfernen", sacCopier: "Kopieren", sacUnItem: "{n} Gegenstand gespeichert", sacPlusieursItems: "{n} Gegenstände gespeichert", sacIntroPremiereFois: "Ein paar Wörter, die dir schon begegnet sind, sind schon hier. Du kannst sie kopieren oder entfernen — bald kannst du neue Wörter ankreuzen, die du behalten willst.", sacIntroCompris: "Verstanden!", sacViderCategorie: "Leeren", sacViderTout: "Alles leeren", sacConfirmViderCategorie: "„{categorie}” vollständig leeren? Das kann nicht rückgängig gemacht werden.", sacConfirmViderTout: "Den ganzen Rucksack vollständig leeren? Das kann nicht rückgängig gemacht werden.", sacCopierCategorie: "Diese Kategorie kopieren", sacCopierTout: "Den ganzen Rucksack kopieren", sacRienACopier: "Nichts zu kopieren in dieser Kategorie.", sacModalCopierPuisVider: "Kopieren, dann leeren", sacModalViderSansCopier: "Leeren ohne zu kopieren", sacModalAnnuler: "Abbrechen", natureArticle: "Artikel", natureDeterminant: "Determinanten", natureNom: "Nomen", naturePronom: "Pronomen", natureVerbe: "Verben", natureAdjectif: "Adjektive", natureAdverbe: "Adverbien", naturePreposition: "Präpositionen", natureConjonction: "Konjunktionen", natureInterjection: "Interjektionen", natureExpression: "Ausdrücke", natureAutre: "Sonstiges", naturePrefixeVerbe: "Verb", conjIndicatifPresent: "Präsens Indikativ", conjImperatifPresent: "Imperativ", catGrammaire: "Grammatik", sacExemple: "Beispiel", sacAjouterAuSac: "Zum Rucksack hinzufügen" },
  nl: { catMots: "Geleerde woorden", catCodes: "Codes", catSucces: "Prestaties", catTrophees: "Trofeeën", catCartes: "Kaarten", sacVide: "nog niets", sacRienIci: "Hier is nog niets.", sacRetirer: "Verwijderen", sacCopier: "Kopiëren", sacUnItem: "{n} item opgeslagen", sacPlusieursItems: "{n} items opgeslagen", sacIntroPremiereFois: "Een paar woorden die je al bent tegengekomen staan hier al. Je kunt ze kopiëren of verwijderen — binnenkort kun je nieuwe woorden aanvinken die je wilt bewaren.", sacIntroCompris: "Begrepen!", sacViderCategorie: "Leegmaken", sacViderTout: "Alles leegmaken", sacConfirmViderCategorie: "„{categorie}” helemaal leegmaken? Dit kan niet ongedaan worden gemaakt.", sacConfirmViderTout: "De hele rugzak helemaal leegmaken? Dit kan niet ongedaan worden gemaakt.", sacCopierCategorie: "Deze categorie kopiëren", sacCopierTout: "De hele rugzak kopiëren", sacRienACopier: "Niets om te kopiëren in deze categorie.", sacModalCopierPuisVider: "Kopiëren, dan leegmaken", sacModalViderSansCopier: "Leegmaken zonder te kopiëren", sacModalAnnuler: "Annuleren", natureArticle: "Lidwoorden", natureDeterminant: "Determinanten", natureNom: "Zelfstandige naamwoorden", naturePronom: "Voornaamwoorden", natureVerbe: "Werkwoorden", natureAdjectif: "Bijvoeglijke naamwoorden", natureAdverbe: "Bijwoorden", naturePreposition: "Voorzetsels", natureConjonction: "Voegwoorden", natureInterjection: "Tussenwerpsels", natureExpression: "Uitdrukkingen", natureAutre: "Overig", naturePrefixeVerbe: "werkwoord", conjIndicatifPresent: "Tegenwoordige tijd", conjImperatifPresent: "Gebiedende wijs", catGrammaire: "Grammatica", sacExemple: "Voorbeeld", sacAjouterAuSac: "Aan de rugzak toevoegen" },
  ca: { catMots: "Paraules apreses", catCodes: "Codis", catSucces: "Assoliments", catTrophees: "Trofeus", catCartes: "Cartes", sacVide: "encara res", sacRienIci: "Encara no hi ha res aquí.", sacRetirer: "Treure", sacCopier: "Copiar", sacUnItem: "{n} element desat", sacPlusieursItems: "{n} elements desats", sacIntroPremiereFois: "Algunes paraules que ja has trobat són aquí. Les pots copiar o treure — aviat podràs marcar les paraules noves que vulguis conservar.", sacIntroCompris: "Entès!", sacViderCategorie: "Buidar", sacViderTout: "Buidar-ho tot", sacConfirmViderCategorie: "Buidar completament «{categorie}»? Això no es pot desfer.", sacConfirmViderTout: "Buidar completament tota la motxilla? Això no es pot desfer.", sacCopierCategorie: "Copiar aquesta categoria", sacCopierTout: "Copiar tota la motxilla", sacRienACopier: "No hi ha res a copiar en aquesta categoria.", sacModalCopierPuisVider: "Copiar i després buidar", sacModalViderSansCopier: "Buidar sense copiar", sacModalAnnuler: "Cancel·la", natureArticle: "Articles", natureDeterminant: "Determinants", natureNom: "Noms", naturePronom: "Pronoms", natureVerbe: "Verbs", natureAdjectif: "Adjectius", natureAdverbe: "Adverbis", naturePreposition: "Preposicions", natureConjonction: "Conjuncions", natureInterjection: "Interjeccions", natureExpression: "Expressions", natureAutre: "Altres", naturePrefixeVerbe: "verb", conjIndicatifPresent: "Present d'indicatiu", conjImperatifPresent: "Imperatiu", catGrammaire: "Gramàtica", sacExemple: "Exemple", sacAjouterAuSac: "Afegir a la motxilla" },
  ru: { catMots: "Выученные слова", catCodes: "Коды", catSucces: "Достижения", catTrophees: "Трофеи", catCartes: "Карточки", sacVide: "пока пусто", sacRienIci: "Здесь пока ничего нет.", sacRetirer: "Убрать", sacCopier: "Копировать", sacUnItem: "Сохранено: {n}", sacPlusieursItems: "Сохранено: {n}", sacIntroPremiereFois: "Некоторые слова, которые тебе уже встречались, уже здесь. Их можно скопировать или убрать — скоро ты сможешь отмечать новые слова, которые хочешь сохранить.", sacIntroCompris: "Понятно!", sacViderCategorie: "Очистить", sacViderTout: "Очистить всё", sacConfirmViderCategorie: "Полностью очистить «{categorie}»? Это необратимо.", sacConfirmViderTout: "Полностью очистить весь рюкзак? Это необратимо.", sacCopierCategorie: "Скопировать эту категорию", sacCopierTout: "Скопировать весь рюкзак", sacRienACopier: "В этой категории нечего копировать.", sacModalCopierPuisVider: "Скопировать, затем очистить", sacModalViderSansCopier: "Очистить без копирования", sacModalAnnuler: "Отмена", natureArticle: "Артикли", natureDeterminant: "Детерминативы", natureNom: "Существительные", naturePronom: "Местоимения", natureVerbe: "Глаголы", natureAdjectif: "Прилагательные", natureAdverbe: "Наречия", naturePreposition: "Предлоги", natureConjonction: "Союзы", natureInterjection: "Междометия", natureExpression: "Выражения", natureAutre: "Другое", naturePrefixeVerbe: "глагол", conjIndicatifPresent: "Настоящее время изъявительного наклонения", conjImperatifPresent: "Повелительное наклонение", catGrammaire: "Грамматика", sacExemple: "Пример", sacAjouterAuSac: "Добавить в рюкзак" },
  zh: { catMots: "学会的单词", catCodes: "兑换码", catSucces: "成就", catTrophees: "奖杯", catCartes: "卡片", sacVide: "还没有内容", sacRienIci: "这里还没有内容。", sacRetirer: "移除", sacCopier: "复制", sacUnItem: "已保存 {n} 项", sacPlusieursItems: "已保存 {n} 项", sacIntroPremiereFois: "你已经遇到过的一些单词已经在这里了。你可以复制或移除它们——很快你就能勾选想保留的新单词了。", sacIntroCompris: "知道了！", sacViderCategorie: "清空", sacViderTout: "全部清空", sacConfirmViderCategorie: "完全清空「{categorie}」？此操作无法撤销。", sacConfirmViderTout: "完全清空整个背包？此操作无法撤销。", sacCopierCategorie: "复制此分类", sacCopierTout: "复制整个背包", sacRienACopier: "此分类中没有可复制的内容。", sacModalCopierPuisVider: "先复制，再清空", sacModalViderSansCopier: "不复制，直接清空", sacModalAnnuler: "取消", natureArticle: "冠词", natureDeterminant: "限定词", natureNom: "名词", naturePronom: "代词", natureVerbe: "动词", natureAdjectif: "形容词", natureAdverbe: "副词", naturePreposition: "介词", natureConjonction: "连词", natureInterjection: "感叹词", natureExpression: "表达方式", natureAutre: "其他", naturePrefixeVerbe: "动词", conjIndicatifPresent: "陈述式现在时", conjImperatifPresent: "命令式", catGrammaire: "语法要点", sacExemple: "例句", sacAjouterAuSac: "添加到背包" },
  ja: { catMots: "習った単語", catCodes: "コード", catSucces: "達成記録", catTrophees: "トロフィー", catCartes: "カード", sacVide: "まだ何もありません", sacRienIci: "まだここには何もありません。", sacRetirer: "削除", sacCopier: "コピー", sacUnItem: "{n}個 保存済み", sacPlusieursItems: "{n}個 保存済み", sacIntroPremiereFois: "すでに出会った単語がいくつかここにあります。コピーしたり削除したりできます — もうすぐ、残したい新しい単語にチェックを入れられるようになります。", sacIntroCompris: "わかった！", sacViderCategorie: "空にする", sacViderTout: "全部空にする", sacConfirmViderCategorie: "「{categorie}」を完全に空にしますか？元に戻せません。", sacConfirmViderTout: "リュック全体を完全に空にしますか？元に戻せません。", sacCopierCategorie: "このカテゴリーをコピー", sacCopierTout: "リュック全体をコピー", sacRienACopier: "このカテゴリーにはコピーするものがありません。", sacModalCopierPuisVider: "コピーしてから空にする", sacModalViderSansCopier: "コピーせずに空にする", sacModalAnnuler: "キャンセル", natureArticle: "冠詞", natureDeterminant: "限定詞", natureNom: "名詞", naturePronom: "代名詞", natureVerbe: "動詞", natureAdjectif: "形容詞", natureAdverbe: "副詞", naturePreposition: "前置詞", natureConjonction: "接続詞", natureInterjection: "間投詞", natureExpression: "表現", natureAutre: "その他", naturePrefixeVerbe: "動詞", conjIndicatifPresent: "直説法現在形", conjImperatifPresent: "命令形", catGrammaire: "文法ポイント", sacExemple: "例文", sacAjouterAuSac: "リュックに追加" },
  ko: { catMots: "배운 단어", catCodes: "코드", catSucces: "업적", catTrophees: "트로피", catCartes: "카드", sacVide: "아직 없음", sacRienIci: "아직 여기에 아무것도 없어요.", sacRetirer: "제거", sacCopier: "복사", sacUnItem: "{n}개 저장됨", sacPlusieursItems: "{n}개 저장됨", sacIntroPremiereFois: "이미 만난 몇몇 단어가 여기 있어요. 복사하거나 지울 수 있어요 — 곧 간직하고 싶은 새 단어에 체크할 수 있게 될 거예요.", sacIntroCompris: "알겠어요!", sacViderCategorie: "비우기", sacViderTout: "전체 비우기", sacConfirmViderCategorie: "「{categorie}」를 완전히 비울까요? 되돌릴 수 없어요.", sacConfirmViderTout: "가방 전체를 완전히 비울까요? 되돌릴 수 없어요.", sacCopierCategorie: "이 카테고리 복사", sacCopierTout: "가방 전체 복사", sacRienACopier: "이 카테고리에는 복사할 게 없어요.", sacModalCopierPuisVider: "복사한 다음 비우기", sacModalViderSansCopier: "복사하지 않고 비우기", sacModalAnnuler: "취소", natureArticle: "관사", natureDeterminant: "한정사", natureNom: "명사", naturePronom: "대명사", natureVerbe: "동사", natureAdjectif: "형용사", natureAdverbe: "부사", naturePreposition: "전치사", natureConjonction: "접속사", natureInterjection: "감탄사", natureExpression: "표현", natureAutre: "기타", naturePrefixeVerbe: "동사", conjIndicatifPresent: "직설법 현재", conjImperatifPresent: "명령법", catGrammaire: "문법 포인트", sacExemple: "예문", sacAjouterAuSac: "가방에 추가" },
  vi: { catMots: "Từ đã học", catCodes: "Mã", catSucces: "Thành tích", catTrophees: "Cúp", catCartes: "Thẻ bài", sacVide: "chưa có gì", sacRienIci: "Chưa có gì ở đây.", sacRetirer: "Xóa", sacCopier: "Sao chép", sacUnItem: "Đã lưu {n} món", sacPlusieursItems: "Đã lưu {n} món", sacIntroPremiereFois: "Một số từ bạn đã từng gặp đã có ở đây rồi. Bạn có thể sao chép hoặc xóa chúng — sắp tới bạn sẽ có thể đánh dấu những từ mới muốn giữ lại.", sacIntroCompris: "Đã hiểu!", sacViderCategorie: "Xóa hết", sacViderTout: "Xóa tất cả", sacConfirmViderCategorie: "Xóa hoàn toàn «{categorie}»? Không thể hoàn tác.", sacConfirmViderTout: "Xóa hoàn toàn cả ba lô? Không thể hoàn tác.", sacCopierCategorie: "Sao chép mục này", sacCopierTout: "Sao chép cả ba lô", sacRienACopier: "Không có gì để sao chép trong mục này.", sacModalCopierPuisVider: "Sao chép rồi xóa", sacModalViderSansCopier: "Xóa mà không sao chép", sacModalAnnuler: "Hủy", natureArticle: "Mạo từ", natureDeterminant: "Từ hạn định", natureNom: "Danh từ", naturePronom: "Đại từ", natureVerbe: "Động từ", natureAdjectif: "Tính từ", natureAdverbe: "Trạng từ", naturePreposition: "Giới từ", natureConjonction: "Liên từ", natureInterjection: "Thán từ", natureExpression: "Cách diễn đạt", natureAutre: "Khác", naturePrefixeVerbe: "động từ", conjIndicatifPresent: "Hiện tại trần thuật", conjImperatifPresent: "Mệnh lệnh cách", catGrammaire: "Điểm ngữ pháp", sacExemple: "Ví dụ", sacAjouterAuSac: "Thêm vào ba lô" },
  tl: { catMots: "Mga natutunang salita", catCodes: "Mga kodigo", catSucces: "Mga tagumpay", catTrophees: "Mga trofeo", catCartes: "Mga kard", sacVide: "wala pa", sacRienIci: "Wala pang laman dito.", sacRetirer: "Alisin", sacCopier: "Kopyahin", sacUnItem: "{n} bagay ang naka-imbak", sacPlusieursItems: "{n} na bagay ang naka-imbak", sacIntroPremiereFois: "May mga salita ka nang nakasalubong na nandito na. Puwede mo silang kopyahin o alisin — malapit ka nang makapag-check ng mga bagong salitang gusto mong itago.", sacIntroCompris: "Nakuha ko!", sacViderCategorie: "Linisin", sacViderTout: "Linisin lahat", sacConfirmViderCategorie: "Talagang linisin ang “{categorie}”? Hindi na ito puwedeng bawiin.", sacConfirmViderTout: "Talagang linisin ang buong bag? Hindi na ito puwedeng bawiin.", sacCopierCategorie: "Kopyahin ang kategoryang ito", sacCopierTout: "Kopyahin ang buong bag", sacRienACopier: "Walang makokopya sa kategoryang ito.", sacModalCopierPuisVider: "Kopyahin, pagkatapos ay linisin", sacModalViderSansCopier: "Linisin nang hindi kinokopya", sacModalAnnuler: "Kanselahin", natureArticle: "Mga artikulo", natureDeterminant: "Mga pantukoy", natureNom: "Mga pangngalan", naturePronom: "Mga panghalip", natureVerbe: "Mga pandiwa", natureAdjectif: "Mga pang-uri", natureAdverbe: "Mga pang-abay", naturePreposition: "Mga pang-ukol", natureConjonction: "Mga pangatnig", natureInterjection: "Mga pandamdam", natureExpression: "Mga pananalita", natureAutre: "Iba pa", naturePrefixeVerbe: "pandiwa", conjIndicatifPresent: "Kasalukuyang tagapagpahayag", conjImperatifPresent: "Utos", catGrammaire: "Mga tuntunin sa gramatika", sacExemple: "Halimbawa", sacAjouterAuSac: "Idagdag sa bag" },
  id: { catMots: "Kata yang dipelajari", catCodes: "Kode", catSucces: "Pencapaian", catTrophees: "Piala", catCartes: "Kartu", sacVide: "belum ada", sacRienIci: "Belum ada apa-apa di sini.", sacRetirer: "Hapus", sacCopier: "Salin", sacUnItem: "{n} item tersimpan", sacPlusieursItems: "{n} item tersimpan", sacIntroPremiereFois: "Beberapa kata yang sudah kamu temui sudah ada di sini. Kamu bisa menyalin atau menghapusnya — segera kamu bisa mencentang kata baru yang ingin disimpan.", sacIntroCompris: "Mengerti!", sacViderCategorie: "Kosongkan", sacViderTout: "Kosongkan semua", sacConfirmViderCategorie: "Kosongkan sepenuhnya “{categorie}”? Tindakan ini tidak dapat dibatalkan.", sacConfirmViderTout: "Kosongkan seluruh tas sepenuhnya? Tindakan ini tidak dapat dibatalkan.", sacCopierCategorie: "Salin kategori ini", sacCopierTout: "Salin seluruh tas", sacRienACopier: "Tidak ada yang bisa disalin di kategori ini.", sacModalCopierPuisVider: "Salin, lalu kosongkan", sacModalViderSansCopier: "Kosongkan tanpa menyalin", sacModalAnnuler: "Batal", natureArticle: "Artikel", natureDeterminant: "Determinator", natureNom: "Kata benda", naturePronom: "Kata ganti", natureVerbe: "Kata kerja", natureAdjectif: "Kata sifat", natureAdverbe: "Kata keterangan", naturePreposition: "Kata depan", natureConjonction: "Kata sambung", natureInterjection: "Kata seru", natureExpression: "Ungkapan", natureAutre: "Lainnya", naturePrefixeVerbe: "kata kerja", conjIndicatifPresent: "Present indikatif", conjImperatifPresent: "Imperatif", catGrammaire: "Poin tata bahasa", sacExemple: "Contoh", sacAjouterAuSac: "Tambahkan ke tas" },
  ht: { catMots: "Mo yo aprann", catCodes: "Kòd", catSucces: "Reyisit", catTrophees: "Twofe", catCartes: "Kat", sacVide: "poko gen anyen", sacRienIci: "Poko gen anyen isit la.", sacRetirer: "Retire", sacCopier: "Kopye", sacUnItem: "{n} bagay anrejistre", sacPlusieursItems: "{n} bagay anrejistre", sacIntroPremiereFois: "Gen kèk mo ou deja kwaze ki deja la a. Ou ka kopye yo oswa retire yo — talè konsa, w ap ka koche nouvo mo ou vle konsève.", sacIntroCompris: "Konpri!", sacViderCategorie: "Vide", sacViderTout: "Vide tout", sacConfirmViderCategorie: "Vide « {categorie} » nèt? Aksyon sa a pa ka defèt.", sacConfirmViderTout: "Vide tout sak la nèt? Aksyon sa a pa ka defèt.", sacCopierCategorie: "Kopye kategori sa a", sacCopierTout: "Kopye tout sak la", sacRienACopier: "Pa gen anyen pou kopye nan kategori sa a.", sacModalCopierPuisVider: "Kopye, epi vide", sacModalViderSansCopier: "Vide san kopye", sacModalAnnuler: "Anile", natureArticle: "Atik", natureDeterminant: "Detèminan", natureNom: "Non", naturePronom: "Pwonon", natureVerbe: "Vèb", natureAdjectif: "Adjektif", natureAdverbe: "Advèb", naturePreposition: "Prepozisyon", natureConjonction: "Konjonksyon", natureInterjection: "Entèjeksyon", natureExpression: "Ekspresyon", natureAutre: "Lòt", naturePrefixeVerbe: "vèb", conjIndicatifPresent: "Prezan endikatif", conjImperatifPresent: "Enperatif", catGrammaire: "Pwen gramè", sacExemple: "Egzanp", sacAjouterAuSac: "Ajoute nan sak la" },
  fa: { catMots: "کلمات یاد گرفته‌شده", catCodes: "کدها", catSucces: "دستاوردها", catTrophees: "جام‌ها", catCartes: "کارت‌ها", sacVide: "هنوز چیزی نیست", sacRienIci: "هنوز چیزی اینجا نیست.", sacRetirer: "حذف", sacCopier: "کپی", sacUnItem: "{n} مورد ذخیره شد", sacPlusieursItems: "{n} مورد ذخیره شد", sacIntroPremiereFois: "چند کلمه که قبلاً باهاشون روبه‌رو شدی همین‌جا هستن! می‌تونی کپی‌شون کنی یا حذفشون کنی — به‌زودی می‌تونی کلمه‌های جدیدی که می‌خوای نگه داری رو تیک بزنی.", sacIntroCompris: "متوجه شدم!", sacViderCategorie: "خالی کردن", sacViderTout: "خالی کردن همه", sacConfirmViderCategorie: "«{categorie}» کاملاً خالی شود؟ این کار قابل بازگشت نیست.", sacConfirmViderTout: "کل کوله‌پشتی کاملاً خالی شود؟ این کار قابل بازگشت نیست.", sacCopierCategorie: "کپی این دسته", sacCopierTout: "کپی کل کوله‌پشتی", sacRienACopier: "چیزی برای کپی در این دسته نیست.", sacModalCopierPuisVider: "کپی، سپس خالی کردن", sacModalViderSansCopier: "خالی کردن بدون کپی", sacModalAnnuler: "لغو", natureArticle: "حرف تعریف", natureDeterminant: "وابسته‌های اسم", natureNom: "اسم‌ها", naturePronom: "ضمیرها", natureVerbe: "فعل‌ها", natureAdjectif: "صفت‌ها", natureAdverbe: "قیدها", naturePreposition: "حروف اضافه", natureConjonction: "حروف ربط", natureInterjection: "صوت‌ها", natureExpression: "عبارت‌ها", natureAutre: "سایر", naturePrefixeVerbe: "فعل", conjIndicatifPresent: "زمان حال اخباری", conjImperatifPresent: "امری", catGrammaire: "نکات دستوری", sacExemple: "مثال", sacAjouterAuSac: "افزودن به کوله‌پشتی" },
  no: { catMots: "Lærte ord", catCodes: "Koder", catSucces: "Prestasjoner", catTrophees: "Trofeer", catCartes: "Kort", sacVide: "ingenting ennå", sacRienIci: "Ingenting her ennå.", sacRetirer: "Fjern", sacCopier: "Kopier", sacUnItem: "{n} gjenstand lagret", sacPlusieursItems: "{n} gjenstander lagret", sacIntroPremiereFois: "Noen ord du allerede har møtt ligger her. Du kan kopiere dem eller fjerne dem — snart kan du hake av nye ord du vil beholde.", sacIntroCompris: "Skjønner!", sacViderCategorie: "Tøm", sacViderTout: "Tøm alt", sacConfirmViderCategorie: "Tømme «{categorie}» helt? Dette kan ikke angres.", sacConfirmViderTout: "Tømme hele sekken helt? Dette kan ikke angres.", sacCopierCategorie: "Kopier denne kategorien", sacCopierTout: "Kopier hele sekken", sacRienACopier: "Ingenting å kopiere i denne kategorien.", sacModalCopierPuisVider: "Kopier, og tøm så", sacModalViderSansCopier: "Tøm uten å kopiere", sacModalAnnuler: "Avbryt", natureArticle: "Artikler", natureDeterminant: "Determinativer", natureNom: "Substantiver", naturePronom: "Pronomen", natureVerbe: "Verb", natureAdjectif: "Adjektiver", natureAdverbe: "Adverb", naturePreposition: "Preposisjoner", natureConjonction: "Konjunksjoner", natureInterjection: "Interjeksjoner", natureExpression: "Uttrykk", natureAutre: "Annet", naturePrefixeVerbe: "verb", conjIndicatifPresent: "Presens indikativ", conjImperatifPresent: "Imperativ", catGrammaire: "Grammatikkpunkter", sacExemple: "Eksempel", sacAjouterAuSac: "Legg til i sekken" },
  sv: { catMots: "Inlärda ord", catCodes: "Koder", catSucces: "Prestationer", catTrophees: "Troféer", catCartes: "Kort", sacVide: "inget än", sacRienIci: "Inget här än.", sacRetirer: "Ta bort", sacCopier: "Kopiera", sacUnItem: "{n} sak sparad", sacPlusieursItems: "{n} saker sparade", sacIntroPremiereFois: "Några ord du redan har stött på finns redan här. Du kan kopiera eller ta bort dem — snart kan du kryssa i nya ord du vill spara.", sacIntroCompris: "Uppfattat!", sacViderCategorie: "Töm", sacViderTout: "Töm allt", sacConfirmViderCategorie: "Tömma «{categorie}» helt? Det går inte att ångra.", sacConfirmViderTout: "Tömma hela ryggsäcken helt? Det går inte att ångra.", sacCopierCategorie: "Kopiera denna kategori", sacCopierTout: "Kopiera hela ryggsäcken", sacRienACopier: "Inget att kopiera i denna kategori.", sacModalCopierPuisVider: "Kopiera, töm sedan", sacModalViderSansCopier: "Töm utan att kopiera", sacModalAnnuler: "Avbryt", natureArticle: "Artiklar", natureDeterminant: "Determinerare", natureNom: "Substantiv", naturePronom: "Pronomen", natureVerbe: "Verb", natureAdjectif: "Adjektiv", natureAdverbe: "Adverb", naturePreposition: "Prepositioner", natureConjonction: "Konjunktioner", natureInterjection: "Interjektioner", natureExpression: "Uttryck", natureAutre: "Övrigt", naturePrefixeVerbe: "verb", conjIndicatifPresent: "Presens indikativ", conjImperatifPresent: "Imperativ", catGrammaire: "Grammatikpunkter", sacExemple: "Exempel", sacAjouterAuSac: "Lägg till i ryggsäcken" },
  eo: { catMots: "Lernitaj vortoj", catCodes: "Kodoj", catSucces: "Atingoj", catTrophees: "Trofeoj", catCartes: "Kartoj", sacVide: "ankoraŭ nenio", sacRienIci: "Ankoraŭ nenio ĉi tie.", sacRetirer: "Forigi", sacCopier: "Kopii", sacUnItem: "{n} objekto konservita", sacPlusieursItems: "{n} objektoj konservitaj", sacIntroPremiereFois: "Kelkaj vortoj, kiujn vi jam renkontis, jam estas ĉi tie. Vi povas kopii aŭ forigi ilin — baldaŭ vi povos marki novajn vortojn, kiujn vi volas konservi.", sacIntroCompris: "Komprenite!", sacViderCategorie: "Malplenigi", sacViderTout: "Malplenigi ĉion", sacConfirmViderCategorie: "Ĉu tute malplenigi «{categorie}»? Tio ne malfareblas.", sacConfirmViderTout: "Ĉu tute malplenigi la tutan sakon? Tio ne malfareblas.", sacCopierCategorie: "Kopii ĉi tiun kategorion", sacCopierTout: "Kopii la tutan sakon", sacRienACopier: "Nenio kopiebla en ĉi tiu kategorio.", sacModalCopierPuisVider: "Kopii, poste malplenigi", sacModalViderSansCopier: "Malplenigi sen kopii", sacModalAnnuler: "Nuligi", natureArticle: "Artikoloj", natureDeterminant: "Determinantoj", natureNom: "Substantivoj", naturePronom: "Pronomoj", natureVerbe: "Verboj", natureAdjectif: "Adjektivoj", natureAdverbe: "Adverboj", naturePreposition: "Prepozicioj", natureConjonction: "Konjunkcioj", natureInterjection: "Interjekcioj", natureExpression: "Esprimoj", natureAutre: "Aliaj", naturePrefixeVerbe: "verbo", conjIndicatifPresent: "Prezenco de indikativo", conjImperatifPresent: "Imperativo", catGrammaire: "Gramatikaj punktoj", sacExemple: "Ekzemplo", sacAjouterAuSac: "Aldoni al la sako" }
};

// 🆕 (16-08-2026, chantier "contexte + grammaire dans le sac") : nouvelle
// catégorie "grammaire", au même niveau que "mots" — PAS un sous-groupe de
// "mots" (demande explicite de Raphaël : une note de grammaire n'est pas
// un mot, mélanger les deux aurait rendu "Mots appris" bruyant). Placée
// juste après "mots" puisque c'est le même genre de contenu pédagogique
// (à l'inverse de codes/succès/trophées/cartes, qui sont des objets de
// progression, pas du contenu linguistique).
const CATEGORIES_SAC = [
  { id: 'mots',      cle: 'catMots',      nomParDefaut: 'Words learned', icone: iconeSacLivre() },
  { id: 'grammaire', cle: 'catGrammaire', nomParDefaut: 'Grammar points',icone: iconeSacGrammaire() },
  { id: 'codes',     cle: 'catCodes',     nomParDefaut: 'Codes',         icone: iconeSacCle() },
  { id: 'succes',    cle: 'catSucces',    nomParDefaut: 'Achievements',  icone: iconeSacEtoile() },
  { id: 'trophees',  cle: 'catTrophees',  nomParDefaut: 'Trophies',      icone: iconeSacTrophee() },
  { id: 'cartes',    cle: 'catCartes',    nomParDefaut: 'Cards',         icone: iconeSacCarte() }
];

// 🆕 Sous-groupement par nature grammaticale — UNIQUEMENT à l'intérieur de
// la catégorie "mots" (demande de Raphaël : actuellement les mots y sont
// listés dans l'ordre d'ajout, "au hasard"). Champ `type` NOUVEAU sur les
// items de mots (ex. { mot: 'papillon', trad: 'butterfly', type: 'nom' }) —
// n'existe encore nulle part ailleurs dans le site (confirmé par Raphaël) :
// tant qu'un item de mot n'a pas ce champ, il tombe dans le seau "autre"
// ci-dessous plutôt que de disparaître ou de faire planter l'affichage.
// L'ordre de ce tableau EST l'ordre d'affichage des sous-groupes.
//
// 🆕 (retour Raphaël, 15-08-2026, "la catégorie autre est trop large") :
// ajout de 'determinant' (mon/ton/ce/cette… — distinct de 'article', qui
// reste réservé à un/une/le/la/des) et 'conjonction', pour que les mots-
// outils les plus courants aient chacun un vrai sous-groupe plutôt que
// de s'entasser dans "autre". "autre" reste un dernier repli (mots pas
// encore classés), mais ne devrait plus être la destination par défaut
// d'un mot-outil courant.
const NATURES_MOTS = [
  { id: 'article',      cle: 'natureArticle',      nomParDefaut: 'Articles' },
  { id: 'determinant',  cle: 'natureDeterminant',  nomParDefaut: 'Determiners' },
  { id: 'nom',          cle: 'natureNom',          nomParDefaut: 'Nouns' },
  { id: 'pronom',       cle: 'naturePronom',       nomParDefaut: 'Pronouns' },
  { id: 'verbe',        cle: 'natureVerbe',        nomParDefaut: 'Verbs' },
  { id: 'adjectif',     cle: 'natureAdjectif',     nomParDefaut: 'Adjectives' },
  { id: 'adverbe',      cle: 'natureAdverbe',      nomParDefaut: 'Adverbs' },
  { id: 'preposition',  cle: 'naturePreposition',  nomParDefaut: 'Prepositions' },
  { id: 'conjonction',  cle: 'natureConjonction',  nomParDefaut: 'Conjunctions' },
  { id: 'interjection', cle: 'natureInterjection', nomParDefaut: 'Interjections' },
  { id: 'expression',   cle: 'natureExpression',   nomParDefaut: 'Expressions' },
  { id: 'autre',        cle: 'natureAutre',        nomParDefaut: 'Other' }
];

// 🆕 (retour Raphaël, 15-08-2026) : conjugaisons connues, pour le sous-
// groupement des verbes par mode/temps À L'INTÉRIEUR de chaque infinitif
// (voir rendreGroupeVerbes plus bas). Une page peut passer n'importe
// quelle clé ici ; une clé absente de ce dictionnaire est simplement
// affichée telle quelle (repli, voir libelleConjugaison) plutôt que de
// faire disparaître le sous-titre.
const CONJUGAISONS_VERBES = {
  indicatif_present: { cle: 'conjIndicatifPresent', nomParDefaut: 'Present indicative' },
  imperatif_present: { cle: 'conjImperatifPresent', nomParDefaut: 'Imperative' }
};
function libelleConjugaison(cleConjugaison) {
  const conj = CONJUGAISONS_VERBES[cleConjugaison];
  return conj ? tSacOuDefaut(conj.cle, conj.nomParDefaut) : cleConjugaison;
}

// Traduit via le système du site si cette page en a un (index.html,
// parcours.html), sinon retombe sur l'anglais en clair (intro-bonomes.html
// pour l'instant) — voir note de tête de fichier.
// Traduit d'abord via DICO_SAC (partagé, voir plus haut) ; si une clé n'y
// est pas (ne devrait pas arriver pour le vocabulaire du sac lui-même,
// mais reste une sécurité), retombe sur le t() de la page si elle en a
// un (index.html, parcours.html), puis sur la valeur par défaut passée
// en anglais. Le test "val !== cle" écarte le repli ultime de certaines
// pages (retourner la clé brute telle quelle) qui n'est pas une vraie
// traduction. try/catch autour de t() : certaines pages hôtes lèvent une
// erreur pour une clé qu'elles ne connaissent pas plutôt que de renvoyer
// la clé telle quelle — jamais laisser ça remonter et casser l'appelant
// (voir bug réel corrigé ci-dessous dans tSacAvecVariables, même famille
// de problème).
function tSacOuDefaut(cle, defaut) {
  const dict = DICO_SAC[langueActuelleSac()] || DICO_SAC.en;
  if (dict && dict[cle] !== undefined) return dict[cle];
  if (typeof t === 'function') {
    try {
      const val = t(cle);
      if (val !== undefined && val !== cle) return val;
    } catch (e) { /* repli silencieux vers `defaut`, voir note ci-dessus */ }
  }
  return defaut;
}

// Équivalent de tSacOuDefaut() pour les chaînes avec variables
// (sacUnItem/sacPlusieursItems, sacConfirmViderCategorie, etc.), même
// ordre de priorité.
//
// 🐛 CORRIGÉ (cause réelle de "la poubelle ne fait rien, même pas
// l'invite de confirmation" signalé par Raphaël en chinois) : contrairement
// à tSacOuDefaut() ci-dessus, cette fonction n'avait AUCUN filet de
// sécurité — dès qu'une langue autre que fr/en (zh ici) ne connaissait pas
// une des nouvelles clés (sacConfirmViderCategorie, ajoutée cette session,
// jamais traduite au-delà de fr/en), elle renvoyait directement le
// résultat de tAvecVariables(cle, variables) — la fonction de traduction
// PROPRE À LA PAGE hôte — sans jamais vérifier s'il s'agissait d'un
// résultat valide. Si cette fonction hôte ne connaît pas non plus cette
// clé toute neuve (normal : elle vit uniquement dans DICO_SAC, jamais
// dans le dictionnaire de la page), elle peut très bien lever une
// exception plutôt que de renvoyer la clé telle quelle. Comme cet appel
// est l'argument même de window.confirm(...), une exception ici empêche
// window.confirm() d'être appelé DU TOUT — d'où "aucun effet, pas même
// l'invite" : ce n'était jamais viderCategorieSac() qui échouait, mais la
// traduction du message qui plantait avant même d'atteindre confirm().
// Corrigé en donnant à tSacAvecVariables() le même filet que
// tSacOuDefaut() : un troisième paramètre `defaut` optionnel, un
// try/catch autour de l'appel à la page hôte, et — nouveau filet
// supplémentaire propre à cette fonction — un repli sur DICO_SAC.en[cle]
// si aucun `defaut` explicite n'est fourni par l'appelant (utile ici
// puisque DICO_SAC.en possède déjà toutes ces clés, contrairement au
// dictionnaire de la page hôte).
function tSacAvecVariables(cle, variables, defaut) {
  const dict = DICO_SAC[langueActuelleSac()] || DICO_SAC.en;
  let texte = null;
  if (dict && dict[cle] !== undefined) {
    texte = dict[cle];
  } else if (typeof tAvecVariables === 'function') {
    try {
      const val = tAvecVariables(cle, variables);
      if (val !== undefined && val !== cle) texte = val;
    } catch (e) { /* repli silencieux vers `defaut`/DICO_SAC.en, voir note ci-dessus */ }
  }
  if (texte === null) {
    texte = (defaut !== undefined) ? defaut : (DICO_SAC.en[cle] || cle);
  }
  Object.keys(variables).forEach(nomVar => {
    texte = texte.replace('{' + nomVar + '}', variables[nomVar]);
  });
  return texte;
}

function sacParDefaut() {
  return { version: 1, mots: [], grammaire: [], codes: [], succes: [], trophees: [], cartes: [] };
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
  // 🆕 item.cle ajouté (16-08-2026) : identifiant des items de la nouvelle
  // catégorie "grammaire" (ex. 'd1_gJai') — ni mot, ni code, ni titre, ni
  // nom au sens des autres catégories. Même position de repli que les
  // autres (dernier de la liste), donc n'affecte aucun item existant.
  const identifiant = item.mot || item.code || item.titre || item.nom || item.cle;
  const dejaLa = sac[categorie].some(i => (i.mot || i.code || i.titre || i.nom || i.cle) === identifiant);
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
  sac[categorie] = sac[categorie].filter(i => (i.mot || i.code || i.titre || i.nom || i.cle) !== identifiant);
  sauvegarderSac(sac);
  rafraichirAffichageSac();
}

// ---------- Confirmation personnalisée pour les actions "vider" ----------
//
// Remplace window.confirm() (utilisé dans une version précédente) —
// Raphaël a demandé qu'on puisse PROPOSER de copier le contenu avant de
// l'effacer, ce qu'une boîte native (OK/Annuler seulement) ne permet pas
// d'offrir en un seul geste. Une seule modale, réutilisée pour les deux
// cas (une catégorie ou tout le sac) : `message` change selon le
// contexte, `executerCopie`/`executerVider` sont les deux actions
// réelles, propres à l'appelant (voir viderCategorieSac/viderToutSac
// ci-dessous). "Copier puis vider" est le premier bouton (le choix le
// plus sûr) et reçoit le focus par défaut ; l'action reste IRRÉVERSIBLE
// dans tous les cas dès qu'un des deux boutons de vidage est cliqué —
// copier ne fait qu'ajouter une sauvegarde avant, jamais annuler le
// vidage lui-même.
function demanderConfirmationVider(message, executerCopie, executerVider) {
  // Une seule modale à la fois — filet de sécurité si une précédente
  // traînait encore (ne devrait pas arriver en usage normal).
  const ancienne = document.getElementById('sacModalOverlay');
  if (ancienne) ancienne.remove();

  const overlay = document.createElement('div');
  overlay.id = 'sacModalOverlay';
  overlay.className = 'sac-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'sac-modal';
  modal.setAttribute('role', 'alertdialog');
  modal.setAttribute('aria-modal', 'true');

  const texteMsg = document.createElement('p');
  texteMsg.className = 'sac-modal-message';
  texteMsg.textContent = message;
  modal.appendChild(texteMsg);

  const actions = document.createElement('div');
  actions.className = 'sac-modal-actions';

  function fermer() { overlay.remove(); }

  const btnCopierPuisVider = document.createElement('button');
  btnCopierPuisVider.type = 'button';
  btnCopierPuisVider.className = 'sac-modal-btn sac-modal-btn-copier';
  btnCopierPuisVider.textContent = tSacOuDefaut('sacModalCopierPuisVider', 'Copy, then clear');
  btnCopierPuisVider.addEventListener('click', function () {
    fermer();
    try { executerCopie(); } catch (e) { console.warn('Copie avant vidage impossible.', e); }
    executerVider();
  });

  const btnViderSansCopier = document.createElement('button');
  btnViderSansCopier.type = 'button';
  btnViderSansCopier.className = 'sac-modal-btn sac-modal-btn-vider';
  btnViderSansCopier.textContent = tSacOuDefaut('sacModalViderSansCopier', 'Clear without copying');
  btnViderSansCopier.addEventListener('click', function () {
    fermer();
    executerVider();
  });

  const btnAnnuler = document.createElement('button');
  btnAnnuler.type = 'button';
  btnAnnuler.className = 'sac-modal-btn sac-modal-btn-annuler';
  btnAnnuler.textContent = tSacOuDefaut('sacModalAnnuler', 'Cancel');
  btnAnnuler.addEventListener('click', fermer);

  actions.appendChild(btnCopierPuisVider);
  actions.appendChild(btnViderSansCopier);
  actions.appendChild(btnAnnuler);
  modal.appendChild(actions);
  overlay.appendChild(modal);

  // Clic sur le fond sombre (hors modale) = annuler, comme "Échap" pour
  // qui n'y penserait pas.
  overlay.addEventListener('click', function (e) { if (e.target === overlay) fermer(); });
  document.addEventListener('keydown', function echapUneFois(e) {
    if (e.key === 'Escape') { fermer(); document.removeEventListener('keydown', echapUneFois); }
  });

  document.body.appendChild(overlay);
  btnAnnuler.focus(); // le choix le plus prudent (ne rien faire) reçoit le focus clavier par défaut
}

// ---------- Vider (catégorie par catégorie, ou tout le sac) ----------
//
// Action IRRÉVERSIBLE (voir demande explicite : "avec une demande
// confirmation avant de le faire, car c'est irréversible") — jamais de
// suppression silencieuse, toujours via demanderConfirmationVider()
// ci-dessus, qui propose aussi de copier le contenu avant de l'effacer
// (demande explicite de Raphaël).
function viderCategorieSac(categorieId) {
  const sac = chargerSac();
  if (!sac[categorieId] || sac[categorieId].length === 0) return; // rien à vider
  const cat = CATEGORIES_SAC.find(c => c.id === categorieId);
  const nomCategorie = cat ? tSacOuDefaut(cat.cle, cat.nomParDefaut) : categorieId;
  const message = tSacAvecVariables('sacConfirmViderCategorie', { categorie: nomCategorie });

  demanderConfirmationVider(
    message,
    function () { // "Copier puis vider" : copie le contenu ACTUEL de la catégorie avant qu'il ne disparaisse
      if (!navigator.clipboard) return;
      const texte = sac[categorieId].map(ligneCopiableItem).join('\n');
      navigator.clipboard.writeText(texte).catch(e => console.warn('Copie impossible.', e));
    },
    function () { // vidage réel — relit le sac au cas où il aurait changé entre-temps
      const sacFrais = chargerSac();
      sacFrais[categorieId] = [];
      sauvegarderSac(sacFrais);
      rafraichirAffichageSac();
    }
  );
}

function viderToutSac() {
  const sac = chargerSac();
  if (compterToutSac(sac) === 0) return; // déjà vide, rien à confirmer
  const message = tSacOuDefaut('sacConfirmViderTout', "Completely clear the whole backpack? This can't be undone.");

  demanderConfirmationVider(
    message,
    function () { // "Copier puis vider" : même regroupement par catégorie que copierToutSac()
      if (!navigator.clipboard) return;
      const blocs = CATEGORIES_SAC
        .map(cat => {
          const items = sac[cat.id] || [];
          if (items.length === 0) return null;
          const nomCategorie = tSacOuDefaut(cat.cle, cat.nomParDefaut);
          return nomCategorie + '\n' + items.map(ligneCopiableItem).map(l => '- ' + l).join('\n');
        })
        .filter(Boolean);
      navigator.clipboard.writeText(blocs.join('\n\n')).catch(e => console.warn('Copie impossible.', e));
    },
    function () {
      sauvegarderSac(sacParDefaut());
      rafraichirAffichageSac();
    }
  );
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

// Construit le texte d'un item comme une seule ligne "nom : détail" —
// même logique que texteACopier dans rafraichirAffichageSac(), extraite
// ici pour être réutilisée par copierCategorieSac()/copierToutSac() sans
// dupliquer la règle nomAffiche/detailAffiche à deux endroits.
// 🆕 (retour Raphaël, 15-08-2026, "un nom devrait TOUJOURS indiquer son
// genre") : nom d'affichage d'un item, article ('un'/'une', si présent
// et pertinent pour ce mot) préfixé et genre ('m'/'f') suffixé "(m)"/"(f)"
// — UNIQUEMENT pour les items de type 'nom' (un verbe ou un adjectif n'a
// pas de genre propre à afficher ici). Les deux champs sont optionnels et
// indépendants : "faim" n'a pas d'article naturel dans ce dialogue
// ("j'ai faim", jamais "une faim") mais affiche quand même son genre
// ("faim (f)") ; "sandwich" affiche les deux ("un sandwich (m)").
function nomAvecGenre(item) {
  const base = item.nom || item.mot || item.code || '—';
  if (item.type !== 'nom') return base;
  const prefixe = item.article ? item.article + ' ' : '';
  const suffixe = item.genre === 'f' ? ' (f)' : item.genre === 'm' ? ' (m)' : '';
  return prefixe + base + suffixe;
}

// ==================================================================
// 🆕 (16-08-2026, chantier "contexte + grammaire dans le sac") : un mot
// ou une note de grammaire ajoutés au sac peuvent maintenant porter une
// phrase d'exemple (item.exemple, la phrase du dialogue telle quelle) et
// sa traduction (item.exempleTrad) — les deux champs sont optionnels et
// n'existent sur AUCUN item déjà enregistré avant cette session : tout
// le rendu ci-dessous doit donc dégrader proprement en l'absence de ces
// champs (un ancien mot sans exemple s'affiche exactement comme avant,
// juste sans le bloc "exemple").
//
// Les notes de grammaire, elles, arrivent avec du **gras léger** façon
// Markdown (déjà le cas dans dialogue-d2.html avant cette session — voir
// GRAMMAIRE plus bas dans chaque page de dialogue) : formaterMarkdownLeger
// le convertit en <strong> pour l'affichage (ici ET dans le "À retenir"
// de la page elle-même, qui appelle désormais cette même fonction — un
// seul endroit où la règle "** = gras" est définie). Un item de grammaire
// n'a pas de titre stocké séparément : extraireTitreGrammaire() le déduit
// du premier terme mis en évidence (gras ou « guillemets »), ce qui reste
// correct dans les 20 langues puisque ce terme est toujours le mot
// français que la note explique, jamais traduit lui-même.
// ==================================================================
function formaterMarkdownLeger(texteBrut) {
  return String(texteBrut || '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function extraireTitreGrammaire(texteBrut) {
  const brut = String(texteBrut || '');
  const gras = brut.match(/\*\*(.+?)\*\*/);
  if (gras) return gras[1];
  const guillemets = brut.match(/«\s*([^»]+?)\s*»/);
  if (guillemets) return guillemets[1];
  const texteSansMarquage = brut.replace(/\*\*/g, '').trim();
  return texteSansMarquage.length > 40 ? texteSansMarquage.slice(0, 40).trim() + '…' : texteSansMarquage;
}

// Bloc "exemple" replié par défaut (retour Raphaël : la phrase ne doit
// s'afficher qu'au clic, pour ne pas alourdir le panneau) — un seul
// bouton-bascule, pas de libellé "cacher" distinct : le chevron pivote
// via la classe .ouvert plutôt que de changer le texte du bouton, ce qui
// évite d'ajouter une deuxième clé de traduction juste pour ça.
function rendreBlocExemple(exemple, exempleTrad) {
  if (!exemple) return '';
  const traduction = exempleTrad ? '<div class="sac-exemple-trad">' + exempleTrad + '</div>' : '';
  return '<button type="button" class="sac-exemple-toggle" ' +
      'onclick="this.classList.toggle(\'ouvert\'); this.nextElementSibling.classList.toggle(\'ouvert\')">' +
      '<span class="sac-exemple-chevron">&#9656;</span> ' + tSacOuDefaut('sacExemple', 'Example') +
    '</button>' +
    '<div class="sac-exemple">« ' + exemple + ' »' + traduction + '</div>';
}

function ligneCopiableItem(item) {
  // 🆕 Item de grammaire (item.cle + item.texte, voir rendreLigneGrammaireSac
  // plus bas) : forme différente d'un mot, traité à part plutôt que de
  // forcer nomAvecGenre() à comprendre une forme qui n'est pas la sienne.
  if (item.cle !== undefined && item.texte !== undefined) {
    const titre = extraireTitreGrammaire(item.texte);
    let ligne = (titre ? titre + ' — ' : '') + String(item.texte).replace(/\*\*/g, '');
    if (item.exemple) {
      ligne += '\n    ' + item.exemple + (item.exempleTrad ? ' — ' + item.exempleTrad : '');
    }
    return ligne;
  }
  const nomAffiche = nomAvecGenre(item);
  const detailAffiche = item.trad || item.description || item.titre || '';
  let ligne = detailAffiche ? (nomAffiche + ' : ' + detailAffiche) : nomAffiche;
  if (item.exemple) {
    ligne += '\n    ' + item.exemple + (item.exempleTrad ? ' — ' + item.exempleTrad : '');
  }
  return ligne;
}

// Copie tout le contenu d'UNE catégorie, une ligne par item — bouton
// dédié dans l'en-tête de chaque catégorie (voir rafraichirAffichageSac).
// Même retour visuel (coche temporaire) que copierDepuisSac() ci-dessus,
// appliqué au bouton de catégorie plutôt qu'à un bouton d'item.
function copierCategorieSac(bouton, categorieId) {
  const sac = chargerSac();
  const items = sac[categorieId] || [];
  if (!navigator.clipboard || items.length === 0) return;
  const texte = items.map(ligneCopiableItem).join('\n');
  navigator.clipboard.writeText(texte).then(() => {
    bouton.classList.add('copie');
    setTimeout(() => bouton.classList.remove('copie'), 1100);
  }).catch(e => console.warn('Copie impossible.', e));
}

// Copie TOUT le sac (toutes les catégories non vides, groupées sous leur
// nom traduit) — bouton dédié dans le pied du panneau.
function copierToutSac(bouton) {
  const sac = chargerSac();
  if (!navigator.clipboard || compterToutSac(sac) === 0) return;
  const blocs = CATEGORIES_SAC
    .map(cat => {
      const items = sac[cat.id] || [];
      if (items.length === 0) return null;
      const nomCategorie = tSacOuDefaut(cat.cle, cat.nomParDefaut);
      return nomCategorie + '\n' + items.map(ligneCopiableItem).map(l => '- ' + l).join('\n');
    })
    .filter(Boolean);
  navigator.clipboard.writeText(blocs.join('\n\n')).then(() => {
    bouton.classList.add('copie');
    setTimeout(() => bouton.classList.remove('copie'), 1100);
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

// Rendu d'une ligne d'item — extrait tel quel de l'ancien code inline de
// rafraichirAffichageSac() (aucun changement de comportement), pour être
// réutilisable à la fois par le rendu simple (autres catégories) et par le
// rendu groupé par nature (catégorie "mots" seulement, voir plus bas).
function rendreLigneItemSac(i, categorieId) {
  const identifiant = i.mot || i.code || i.titre || i.nom || '';
  const nomAffichePlain = nomAvecGenre(i);
  const detailAffiche = i.trad || i.description || i.titre || '';
  const texteACopier = detailAffiche ? (nomAffichePlain + ' : ' + detailAffiche) : nomAffichePlain;
  // 🆕 Affichage : même contenu que nomAffichePlain, mais le suffixe de
  // genre est isolé dans son propre <span> pour une mise en valeur
  // discrète (voir .sac-item-genre dans sac-a-dos.css) sans toucher au
  // texte copié (data-texte ci-dessous reste nomAffichePlain, en clair).
  const base = i.nom || i.mot || i.code || '—';
  const estNomAvecGenre = i.type === 'nom' && (i.genre === 'f' || i.genre === 'm');
  const prefixeArticle = (i.type === 'nom' && i.article) ? i.article + ' ' : '';
  const nomAfficheHtml = estNomAvecGenre
    ? prefixeArticle + base + ' <span class="sac-item-genre">(' + i.genre + ')</span>'
    : prefixeArticle + base;
  // 🆕 (16-08-2026) : bloc exemple replié — voir rendreBlocExemple ci-dessus.
  // Vide (donc invisible) pour tout item ajouté avant cette session.
  return '<div class="sac-item">' +
    '<span class="sac-item-principal">' +
      '<span class="sac-item-ligne">' +
        '<span class="sac-item-nom">' + nomAfficheHtml + '</span>' +
        '<span class="sac-item-detail">' + detailAffiche + '</span>' +
      '</span>' +
      rendreBlocExemple(i.exemple, i.exempleTrad) +
    '</span>' +
    '<button type="button" class="sac-item-copier" title="' + echapperAttribut(tSacOuDefaut('sacCopier', 'Copy')) + '" ' +
      'data-texte="' + echapperAttribut(texteACopier) + '" ' +
      'onclick="copierDepuisSac(this)">&#10697;</button>' +
    '<button type="button" class="sac-item-retirer" title="' + echapperAttribut(tSacOuDefaut('sacRetirer', 'Remove')) + '" ' +
      'data-cat="' + categorieId + '" data-id="' + echapperAttribut(identifiant) + '" ' +
      'onclick="retirerDuSac(this.dataset.cat, this.dataset.id)">&times;</button>' +
  '</div>';
}

// 🆕 (16-08-2026) : rendu d'un item de la catégorie "grammaire" — forme
// différente d'un mot (un titre court + un paragraphe, pas un mot + une
// traduction), donc pas de réutilisation de rendreLigneItemSac ici.
// Réutilise quand même les mêmes briques (rendreBlocExemple, boutons
// copier/retirer avec les mêmes classes CSS) pour rester visuellement
// cohérent avec le reste du sac.
function rendreLigneGrammaireSac(i, categorieId) {
  const identifiant = i.cle || '';
  const titre = extraireTitreGrammaire(i.texte);
  const texteHtml = formaterMarkdownLeger(i.texte);
  const texteACopier = ligneCopiableItem(i);
  return '<div class="sac-grammaire-item">' +
    '<div class="sac-grammaire-corps">' +
      (titre ? '<div class="sac-grammaire-titre">' + titre + '</div>' : '') +
      '<div class="sac-grammaire-texte">' + texteHtml + '</div>' +
      rendreBlocExemple(i.exemple, i.exempleTrad) +
    '</div>' +
    '<div class="sac-grammaire-actions">' +
      '<button type="button" class="sac-item-copier" title="' + echapperAttribut(tSacOuDefaut('sacCopier', 'Copy')) + '" ' +
        'data-texte="' + echapperAttribut(texteACopier) + '" ' +
        'onclick="copierDepuisSac(this)">&#10697;</button>' +
      '<button type="button" class="sac-item-retirer" title="' + echapperAttribut(tSacOuDefaut('sacRetirer', 'Remove')) + '" ' +
        'data-cat="' + categorieId + '" data-id="' + echapperAttribut(identifiant) + '" ' +
        'onclick="retirerDuSac(this.dataset.cat, this.dataset.id)">&times;</button>' +
    '</div>' +
  '</div>';
}

function rendreItemsGrammaireSac(items, categorieId) {
  return items.map(i => rendreLigneGrammaireSac(i, categorieId)).join('');
}

// 🆕 (retour Raphaël, 15-08-2026, "verbe 'avoir', indicatif présent —
// classé d'abord comme le verbe avoir avec une sous-catégorie pour la
// conjugaison") : rendu spécifique du sous-groupe "Verbes" — regroupé
// D'ABORD par infinitif (item.infinitif, ex. 'avoir'), puis À L'INTÉRIEUR
// par conjugaison (item.conjugaison, ex. 'indicatif_present', voir
// CONJUGAISONS_VERBES). Un item sans infinitif connu retombe sur sa
// propre forme (mot lui-même) plutôt que de disparaître — même logique
// de repli que le reste de ce fichier (voir NATURES_MOTS). L'ordre des
// sous-groupes suit l'ordre de première apparition dans `items` (déjà
// dans l'ordre d'ajout au sac).
function rendreGroupeVerbes(items, categorieId) {
  const infinitifs = [];
  const parInfinitif = {};
  items.forEach(function (i) {
    const inf = i.infinitif || i.mot || i.nom;
    if (!parInfinitif[inf]) { parInfinitif[inf] = []; infinitifs.push(inf); }
    parInfinitif[inf].push(i);
  });
  return infinitifs.map(function (inf) {
    const itemsVerbe = parInfinitif[inf];
    const conjugaisons = [];
    const parConjugaison = {};
    itemsVerbe.forEach(function (i) {
      const cle = i.conjugaison || '';
      if (!parConjugaison[cle]) { parConjugaison[cle] = []; conjugaisons.push(cle); }
      parConjugaison[cle].push(i);
    });
    return '<div class="sac-verbe-groupe">' +
      '<div class="sac-verbe-infinitif">' + tSacOuDefaut('naturePrefixeVerbe', 'verb') + ' « ' + inf + ' »</div>' +
      conjugaisons.map(function (cj) {
        const itemsCj = parConjugaison[cj];
        const titreCj = cj ? '<div class="sac-verbe-conjugaison">' + libelleConjugaison(cj) + '</div>' : '';
        return titreCj + itemsCj.map(function (i) { return rendreLigneItemSac(i, categorieId); }).join('');
      }).join('') +
    '</div>';
  }).join('');
}

// Rendu d'origine, sans sous-groupement — toujours utilisé pour codes/
// succès/trophées/cartes, qui n'ont pas de nature grammaticale.
function rendreItemsSacSimple(items, categorieId) {
  return items.map(i => rendreLigneItemSac(i, categorieId)).join('');
}

// 🆕 Rendu groupé par nature grammaticale — catégorie "mots" uniquement.
// Un item sans champ `type` (tout le vocabulaire existant, voir note sur
// NATURES_MOTS plus haut) tombe dans le sous-groupe "autre" plutôt que de
// disparaître. Un sous-groupe entièrement vide n'est simplement pas rendu
// (pas de "Verbes (0)" vide qui encombrerait la liste pour rien).
function rendreItemsMotsParNature(items, categorieId) {
  return NATURES_MOTS.map(nature => {
    const itemsDuGroupe = items.filter(i => (i.type || 'autre') === nature.id);
    if (itemsDuGroupe.length === 0) return '';
    // 🆕 (retour Raphaël, 15-08-2026) : le sous-groupe "Verbes" a son propre
    // rendu (par infinitif puis par conjugaison, voir rendreGroupeVerbes) —
    // tous les autres sous-groupes gardent le rendu simple d'origine.
    const contenu = nature.id === 'verbe'
      ? rendreGroupeVerbes(itemsDuGroupe, categorieId)
      : itemsDuGroupe.map(i => rendreLigneItemSac(i, categorieId)).join('');
    return '<div class="sac-nature-groupe">' +
      '<div class="sac-nature-titre">' + tSacOuDefaut(nature.cle, nature.nomParDefaut) + '</div>' +
      contenu +
    '</div>';
  }).join('');
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

  // Boutons du pied "Copier tout" / "Vider tout" — texte traduit et
  // désactivés (jamais masqués) quand le sac est vide, rien à copier ou
  // vider dans ce cas.
  const btnCopierTout = document.getElementById('btnCopierToutSac');
  if (btnCopierTout) {
    btnCopierTout.textContent = tSacOuDefaut('sacCopierTout', 'Copy the whole backpack');
    btnCopierTout.disabled = (total === 0);
  }
  const btnViderTout = document.getElementById('btnViderToutSac');
  if (btnViderTout) {
    btnViderTout.textContent = tSacOuDefaut('sacViderTout', "Clear everything");
    btnViderTout.disabled = (total === 0);
  }

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
        (items.length > 0
          ? '<button type="button" class="sac-cat-action sac-cat-copier" title="' + echapperAttribut(tSacOuDefaut('sacCopierCategorie', 'Copy this category')) + '" ' +
              'onclick="event.stopPropagation(); copierCategorieSac(this, \'' + cat.id + '\')">&#10697;</button>' +
            '<button type="button" class="sac-cat-action sac-cat-vider" title="' + echapperAttribut(tSacOuDefaut('sacViderCategorie', 'Clear')) + '" ' +
              'onclick="event.stopPropagation(); viderCategorieSac(\'' + cat.id + '\')">&#128465;</button>'
          : '') +
        '<span class="sac-cat-chevron">&#9660;</span>' +
      '</div>' +
      '<div class="sac-cat-liste">' +
        (items.length === 0
          ? '<div class="sac-vide">' + tSacOuDefaut('sacRienIci', 'Nothing here yet.') + '</div>'
          : (cat.id === 'mots' ? rendreItemsMotsParNature(items, cat.id)
             : cat.id === 'grammaire' ? rendreItemsGrammaireSac(items, cat.id)
             : rendreItemsSacSimple(items, cat.id))
        ) +
      '</div>';
    corps.appendChild(div);
  });
}

// ---------- Solde (P$ / PB) ----------
//
// 🆕 Demande de Raphaël : afficher dans le sac la quantité de piasses et
// de points bonis dont l'élève dispose (eleves.piasses / points_bonis,
// déjà existantes côté Supabase — voir progression.js:lireSolde()).
// Séparée de rafraichirAffichageSac() (qui reste 100% synchrone, elle) :
// le solde vient du réseau, pas de localStorage, donc async par nature,
// et n'a besoin d'être rafraîchi qu'à l'ouverture du sac / au chargement
// de la page — jamais à chaque ajout/retrait local d'un mot (qui ne
// change aucune piasse). Repli silencieux (0/0) si KebBekProgression
// est absent (page qui n'aurait pas chargé progression.js) ou si les
// éléments d'affichage n'existent pas encore dans le HTML de la page —
// même philosophie que rafraichirAffichageSac() : jamais d'erreur
// bloquante pour une page qui n'a pas (encore) ce composant.
async function rafraichirSoldeSac() {
  const elPiasses = document.getElementById('sacSoldePiasses');
  const elPointsBonis = document.getElementById('sacSoldePointsBonis');
  if (!elPiasses || !elPointsBonis) return; // page sans bloc solde dans le HTML : rien à faire

  let solde = { piasses: 0, points_bonis: 0 };
  if (window.KebBekProgression && typeof window.KebBekProgression.lireSolde === 'function') {
    try { solde = await window.KebBekProgression.lireSolde(); }
    catch (e) { console.warn('sac-a-dos.js : rafraichirSoldeSac a échoué.', e); }
  }
  elPiasses.textContent = solde.piasses;
  elPointsBonis.textContent = solde.points_bonis;
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
  if (ouvert) {
    afficherIntroSacSiPremiereFois();
    rafraichirSoldeSac(); // 🆕 à jour à chaque ouverture (des piasses ont pu être dépensées/gagnées ailleurs entre-temps)
  }
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
// 🆕 (16-08-2026) : icône "grammaire" — une fiche à lignes plutôt qu'un
// livre fermé (iconeSacLivre), pour rester distincte au premier coup
// d'œil dans la liste des catégories.
function iconeSacGrammaire() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>';
}

// ---------- Bouton de test optionnel (présent seulement sur les pages qui le souhaitent) ----------

// 🆕 (16-08-2026) : items d'exemple enrichis avec exemple/exempleTrad pour
// tester visuellement le nouveau bloc "exemple replié" sans avoir besoin
// d'ouvrir une vraie leçon, + un item de la nouvelle catégorie "grammaire".
const EXEMPLES_SAC = [
  { categorie: 'mots', item: { mot: 'papillon', trad: 'butterfly', type: 'nom', genre: 'm', article: 'un', exemple: 'Un papillon vole dans le jardin.', exempleTrad: 'A butterfly is flying in the garden.', source: 'demo' } },
  { categorie: 'mots', item: { mot: 'gentil', trad: 'kind', type: 'adjectif' } },
  { categorie: 'grammaire', item: { cle: 'demo_gExemple', texte: '**Un/une** s\'accorde avec le genre du nom : « un papillon » (masculin), « une pomme » (féminin).', exemple: 'Un papillon vole dans le jardin.', exempleTrad: 'A butterfly is flying in the garden.', source: 'demo' } },
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
rafraichirSoldeSac(); // 🆕 pré-rempli dès le chargement (pas seulement à l'ouverture) : si KebBekProgression n'est pas encore prêt, retombe simplement sur 0/0 puis se corrigera à la première ouverture réelle
