/* ==================================================================
   memoires-textes.js — textes traduits de memoires.html (le chemin des mémoires).

   🆕 (07-11-2026) Le français est écrit directement dans memoires.html (repli) ; ce fichier apporte les 19 autres langues du site :
   en, es, it, pt, ca, eo, zh, ja, ko, vi, ht, tl, id, nl, de, fa, sv, no, ru. Langue lue dans localStorage « kebbek_langue »
   (comme sequence-m1.js). Repli : anglais, puis français. Si ce fichier manque, la page reste en français.

   Structure : window.KebBekMemoiresTextes[langue] = {
     ui : libellés de la page ({k} et {n} dans fragmentSur) ;
     m  : { <id de la mémoire> : { titre, teaser, resume, notions[], fragments : { f1…f5 : { titre, notions[] } } } }
   }
   Pour traduire une autre mémoire : ajouter son id dans m (m2, m3…). Pour un nouveau fragment : ajouter fN.
   Tutoiement partout (« Você » en portugais) ; « poutine » reste en lettres latines (comme dans les leçons).
   ⚠️ À faire relire par des locuteurs natifs, surtout fa, ht, tl, eo, ko et ja.
   ================================================================== */
window.KebBekMemoiresTextes = {
  en: {
    ui: { sousTitre: "Choose a memory", commencer: "Start", continuer: "Continue", fragmentSur: "Fragment {k} of {n}", revoir: "Replay",
      verrouille: "Finish the previous memory to open this one.", preparation: "This memory is still being prepared ✏️", avec: "With", mystere: "Someone mysterious",
      programme: "Fragments and vocabulary", rappel: "To review:", legende: "m. = masculine · f. = feminine", repeter: "Repeat", recupere: "recovered", titrePage: "Memories", retour: "Back", fermer: "Close", etatVerrouille: "locked", etatTermine: "completed" },
    m: { m1: {
      titre: "First memory", teaser: "It all starts here…",
      resume: "A memory is damaged: only pieces of it are left. Fragment by fragment, you find your first sentences in French: saying what you eat, what you watch, what you like. At the end, you repair the memory on your own.",
      notions: ["Sentence order", "Masculine and feminine", "Un/une and le/la", "Verbs in -er with “je”", "“J’aime” + infinitive"],
      fragments: {
        f1: { titre: "I eat", notions: ["Sentence order: subject, verb, object", "A noun is masculine (un) or feminine (une)", "With “je”, a verb in -er ends in -e"] },
        f2: { titre: "The sandwich, the poutine", notions: ["“un” and “une”: something new", "“le” and “la”: the thing we’re talking about, already known", "Masculine: un → le. Feminine: une → la"] },
        f3: { titre: "I watch", notions: ["Another -er verb: regarder", "The object comes right after the verb, with no little word", "The verb chooses its object: regarder is not manger"] },
        f4: { titre: "I like", notions: ["“je” before a vowel becomes “j’”: j’aime", "After “aimer”, the verb stays in the infinitive: manger, regarder, jouer"] },
        f5: { titre: "The repair", notions: ["Putting it all together, on your own: the four pieces reunited", "Six sentences to put back in place"] },
        f6: { titre: "The final test", notions: ["Writing what you hear, with no boxes and no hints", "Answering questions about pictures with “je”", "Remembering what you learned about Bek", "Challenge: conjugating “étudier” and saying “j’aime étudier”"] } } } }
  },
  es: {
    ui: { sousTitre: "Elige un recuerdo", commencer: "Empezar", continuer: "Continuar", fragmentSur: "Fragmento {k} de {n}", revoir: "Volver a ver",
      verrouille: "Termina el recuerdo anterior para abrir este.", preparation: "Este recuerdo todavía está en preparación ✏️", avec: "Con", mystere: "Alguien misterioso",
      programme: "Fragmentos y vocabulario", rappel: "Para repasar:", legende: "m. = masculino · f. = femenino", repeter: "Repetir", recupere: "recuperado", titrePage: "Recuerdos", retour: "Volver", fermer: "Cerrar", etatVerrouille: "bloqueada", etatTermine: "terminada" },
    m: { m1: {
      titre: "Primer recuerdo", teaser: "Todo empieza aquí…",
      resume: "Un recuerdo está dañado y solo quedan trozos. Fragmento a fragmento, recuperas tus primeras frases en francés: decir lo que comes, lo que miras, lo que te gusta. Al final, reparas el recuerdo por tu cuenta.",
      notions: ["El orden de la frase", "Masculino y femenino", "Un/une y le/la", "Los verbos en -er con «je»", "J’aime + infinitivo"],
      fragments: {
        f1: { titre: "Como", notions: ["El orden de la frase: sujeto, verbo, objeto", "Un nombre es masculino (un) o femenino (une)", "Con «je», un verbo en -er termina en -e"] },
        f2: { titre: "El sándwich, la poutine", notions: ["«un» y «une»: algo nuevo", "«le» y «la»: aquello de lo que hablamos, ya conocido", "Masculino: un → le. Femenino: une → la"] },
        f3: { titre: "Miro", notions: ["Otro verbo en -er: regarder", "El objeto va justo después del verbo, sin palabrita en medio", "El verbo elige su objeto: regarder no es manger"] },
        f4: { titre: "Me gusta", notions: ["«je» delante de una vocal se convierte en «j’»: j’aime", "Después de «aimer», el verbo queda en infinitivo: manger, regarder, jouer"] },
        f5: { titre: "La reparación", notions: ["Juntarlo todo por tu cuenta: los cuatro trozos reunidos", "Seis frases que volver a poner en su sitio"] },
        f6: { titre: "La prueba final", notions: ["Escribir lo que oyes, sin casillas y sin pistas", "Responder con «je» a preguntas sobre imágenes", "Recordar lo que aprendiste sobre Bek", "Reto: conjugar «étudier» y decir «j’aime étudier»"] } } } }
  },
  it: {
    ui: { sousTitre: "Scegli un ricordo", commencer: "Inizia", continuer: "Continua", fragmentSur: "Frammento {k} di {n}", revoir: "Rivedi",
      verrouille: "Completa il ricordo precedente per aprire questo.", preparation: "Questo ricordo è ancora in preparazione ✏️", avec: "Con", mystere: "Qualcuno di misterioso",
      programme: "Frammenti e vocabolario", rappel: "Per ripassare:", legende: "m. = maschile · f. = femminile", repeter: "Ripeti", recupere: "recuperato", titrePage: "Ricordi", retour: "Indietro", fermer: "Chiudi", etatVerrouille: "bloccata", etatTermine: "completata" },
    m: { m1: {
      titre: "Primo ricordo", teaser: "Tutto comincia qui…",
      resume: "Un ricordo è danneggiato e ne restano solo dei pezzi. Frammento dopo frammento, ritrovi le tue prime frasi in francese: dire cosa mangi, cosa guardi, cosa ti piace. Alla fine, ripari il ricordo in autonomia.",
      notions: ["L’ordine della frase", "Maschile e femminile", "Un/une e le/la", "I verbi in -er con «je»", "J’aime + infinito"],
      fragments: {
        f1: { titre: "Mangio", notions: ["L’ordine della frase: soggetto, verbo, oggetto", "Un nome è maschile (un) o femminile (une)", "Con «je», un verbo in -er finisce in -e"] },
        f2: { titre: "Il panino, la poutine", notions: ["«un» e «une»: una cosa nuova", "«le» e «la»: la cosa di cui si parla, già nota", "Maschile: un → le. Femminile: une → la"] },
        f3: { titre: "Guardo", notions: ["Un altro verbo in -er: regarder", "L’oggetto viene subito dopo il verbo, senza parolina in mezzo", "Il verbo sceglie il suo oggetto: regarder non è manger"] },
        f4: { titre: "Mi piace", notions: ["«je» davanti a una vocale diventa «j’»: j’aime", "Dopo «aimer», il verbo resta all’infinito: manger, regarder, jouer"] },
        f5: { titre: "La riparazione", notions: ["Rimettere tutto insieme in autonomia: i quattro pezzi riuniti", "Sei frasi da rimettere al loro posto"] },
        f6: { titre: "La prova finale", notions: ["Scrivere ciò che senti, senza caselle e senza aiuti", "Rispondere con «je» a domande sulle immagini", "Ricordare ciò che hai imparato su Bek", "Sfida: coniugare «étudier» e dire «j’aime étudier»"] } } } }
  },
  pt: {
    ui: { sousTitre: "Escolha uma lembrança", commencer: "Começar", continuer: "Continuar", fragmentSur: "Fragmento {k} de {n}", revoir: "Rever",
      verrouille: "Termine a lembrança anterior para abrir esta.", preparation: "Esta lembrança ainda está em preparação ✏️", avec: "Com", mystere: "Alguém misterioso",
      programme: "Fragmentos e vocabulário", rappel: "Para revisar:", legende: "m. = masculino · f. = feminino", repeter: "Repetir", recupere: "recuperado", titrePage: "Lembranças", retour: "Voltar", fermer: "Fechar", etatVerrouille: "bloqueada", etatTermine: "concluída" },
    m: { m1: {
      titre: "Primeira lembrança", teaser: "Tudo começa aqui…",
      resume: "Uma lembrança está danificada e só restam pedaços. Fragmento a fragmento, você reencontra suas primeiras frases em francês: dizer o que come, o que olha, do que gosta. No fim, você conserta a lembrança por conta própria.",
      notions: ["A ordem da frase", "Masculino e feminino", "Un/une e le/la", "Os verbos em -er com «je»", "J’aime + infinitivo"],
      fragments: {
        f1: { titre: "Eu como", notions: ["A ordem da frase: sujeito, verbo, objeto", "Um substantivo é masculino (un) ou feminino (une)", "Com «je», um verbo em -er termina em -e"] },
        f2: { titre: "O sanduíche, a poutine", notions: ["«un» e «une»: algo novo", "«le» e «la»: a coisa de que se fala, já conhecida", "Masculino: un → le. Feminino: une → la"] },
        f3: { titre: "Eu olho", notions: ["Outro verbo em -er: regarder", "O objeto vem logo depois do verbo, sem palavrinha no meio", "O verbo escolhe o seu objeto: regarder não é manger"] },
        f4: { titre: "Eu gosto", notions: ["«je» diante de vogal vira «j’»: j’aime", "Depois de «aimer», o verbo fica no infinitivo: manger, regarder, jouer"] },
        f5: { titre: "O conserto", notions: ["Juntar tudo por conta própria: os quatro pedaços reunidos", "Seis frases para colocar de volta no lugar"] },
        f6: { titre: "A prova final", notions: ["Escrever o que ouve, sem caixas e sem pistas", "Responder com «je» a perguntas sobre imagens", "Lembrar-se do que aprendeu sobre a Bek", "Desafio: conjugar «étudier» e dizer «j’aime étudier»"] } } } }
  },
  ca: {
    ui: { sousTitre: "Tria un record", commencer: "Començar", continuer: "Continuar", fragmentSur: "Fragment {k} de {n}", revoir: "Tornar a veure",
      verrouille: "Acaba el record anterior per obrir aquest.", preparation: "Aquest record encara està en preparació ✏️", avec: "Amb", mystere: "Algú misteriós",
      programme: "Fragments i vocabulari", rappel: "Per repassar:", legende: "m. = masculí · f. = femení", repeter: "Repetir", recupere: "recuperat", titrePage: "Records", retour: "Enrere", fermer: "Tanca", etatVerrouille: "bloquejada", etatTermine: "acabada" },
    m: { m1: {
      titre: "Primer record", teaser: "Tot comença aquí…",
      resume: "Un record està malmès i només en queden trossos. Fragment a fragment, retrobes les teves primeres frases en francès: dir què menges, què mires, què t’agrada. Al final, repares el record pel teu compte.",
      notions: ["L’ordre de la frase", "Masculí i femení", "Un/une i le/la", "Els verbs en -er amb «je»", "J’aime + infinitiu"],
      fragments: {
        f1: { titre: "Menjo", notions: ["L’ordre de la frase: subjecte, verb, objecte", "Un nom és masculí (un) o femení (une)", "Amb «je», un verb en -er acaba en -e"] },
        f2: { titre: "L’entrepà, la poutine", notions: ["«un» i «une»: una cosa nova", "«le» i «la»: la cosa de què parlem, ja coneguda", "Masculí: un → le. Femení: une → la"] },
        f3: { titre: "Miro", notions: ["Un altre verb en -er: regarder", "L’objecte ve just després del verb, sense paraulita pel mig", "El verb tria el seu objecte: regarder no és manger"] },
        f4: { titre: "M’agrada", notions: ["«je» davant de vocal esdevé «j’»: j’aime", "Després d’«aimer», el verb es queda en infinitiu: manger, regarder, jouer"] },
        f5: { titre: "La reparació", notions: ["Ajuntar-ho tot pel teu compte: els quatre trossos reunits", "Sis frases per tornar al seu lloc"] },
        f6: { titre: "La prova final", notions: ["Escriure el que sents, sense caselles i sense pistes", "Respondre amb «je» a preguntes sobre imatges", "Recordar el que has après sobre la Bek", "Repte: conjugar «étudier» i dir «j’aime étudier»"] } } } }
  },
  eo: {
    ui: { sousTitre: "Elektu memoraĵon", commencer: "Komenci", continuer: "Daŭrigi", fragmentSur: "Fragmento {k} el {n}", revoir: "Revidi",
      verrouille: "Finu la antaŭan memoraĵon por malfermi ĉi tiun.", preparation: "Ĉi tiu memoraĵo ankoraŭ estas preparata ✏️", avec: "Kun", mystere: "Iu mistera",
      programme: "Fragmentoj kaj vortprovizo", rappel: "Por ripeti:", legende: "m. = vira genro · f. = ina genro", repeter: "Ripeti", recupere: "retrovita", titrePage: "Memoraĵoj", retour: "Reen", fermer: "Fermi", etatVerrouille: "ŝlosita", etatTermine: "finita" },
    m: { m1: {
      titre: "Unua memoraĵo", teaser: "Ĉio komenciĝas ĉi tie…",
      resume: "Memoraĵo estas difektita kaj restas nur pecoj. Fragmento post fragmento, vi retrovas viajn unuajn frazojn en la franca: diri kion vi manĝas, kion vi rigardas, kion vi ŝatas. Fine, vi mem riparas la memoraĵon.",
      notions: ["La ordo de la frazo", "Vira kaj ina genro", "Un/une kaj le/la", "La verboj je -er kun «je»", "J’aime + infinitivo"],
      fragments: {
        f1: { titre: "Mi manĝas", notions: ["La ordo de la frazo: subjekto, verbo, objekto", "Substantivo estas vira (un) aŭ ina (une)", "Kun «je», verbo je -er finiĝas per -e"] },
        f2: { titre: "La sandviĉo, la poutine", notions: ["«un» kaj «une»: nova afero", "«le» kaj «la»: la afero, pri kiu oni parolas, jam konata", "Vira: un → le. Ina: une → la"] },
        f3: { titre: "Mi rigardas", notions: ["Alia verbo je -er: regarder", "La objekto venas tuj post la verbo, sen vorteto inter ili", "La verbo elektas sian objekton: regarder ne estas manger"] },
        f4: { titre: "Mi ŝatas", notions: ["«je» antaŭ vokalo fariĝas «j’»: j’aime", "Post «aimer», la verbo restas en infinitivo: manger, regarder, jouer"] },
        f5: { titre: "La riparo", notions: ["Kunmeti ĉion mem: la kvar pecoj kune", "Ses frazoj remetendaj en sian lokon"] },
        f6: { titre: "La fina provo", notions: ["Skribi tion, kion oni aŭdas, sen kaŝtoj kaj sen helpoj", "Respondi per «je» al demandoj pri bildoj", "Memori tion, kion vi lernis pri Bek", "Defio: konjugi «étudier» kaj diri «j’aime étudier»"] } } } }
  },
  zh: {
    ui: { sousTitre: "选择一段记忆", commencer: "开始", continuer: "继续", fragmentSur: "第 {k} 个片段，共 {n} 个", revoir: "重温",
      verrouille: "先完成上一段记忆，才能打开这一段。", preparation: "这段记忆还在准备中 ✏️", avec: "和", mystere: "一位神秘的人",
      programme: "片段与词汇", rappel: "复习：", legende: "m. = 阳性 · f. = 阴性", repeter: "再练一遍", recupere: "已找回", titrePage: "记忆", retour: "返回", fermer: "关闭", etatVerrouille: "已锁定", etatTermine: "已完成" },
    m: { m1: {
      titre: "第一段记忆", teaser: "一切从这里开始……",
      resume: "一段记忆受损了，只剩下一些碎片。一个片段接一个片段，你找回自己的第一批法语句子：说说你吃什么、看什么、喜欢什么。最后，你要自己把这段记忆修复好。",
      notions: ["句子的语序", "阳性和阴性", "Un/une 和 le/la", "以 «je» 为主语的 -er 动词", "J’aime + 动词原形"],
      fragments: {
        f1: { titre: "我吃", notions: ["句子的语序：主语、动词、宾语", "名词分阳性（un）和阴性（une）", "主语是 «je» 时，-er 动词以 -e 结尾"] },
        f2: { titre: "三明治和 poutine", notions: ["«un» 和 «une»：一件新的事物", "«le» 和 «la»：正在谈论的、已经知道的事物", "阳性：un → le。阴性：une → la"] },
        f3: { titre: "我看", notions: ["另一个 -er 动词：regarder", "宾语直接跟在动词后面，中间没有小词", "动词决定它的宾语：regarder 不是 manger"] },
        f4: { titre: "我喜欢", notions: ["«je» 在元音前变成 «j’»：j’aime", "在 «aimer» 后面，动词用原形：manger、regarder、jouer"] },
        f5: { titre: "修复", notions: ["自己把一切拼起来：四块碎片合在一起", "六个句子要放回原位"] },
        f6: { titre: "最终测验", notions: ["写下你听到的内容，没有格子，也没有提示", "用“je”回答关于图片的问题", "回想你学到的关于 Bek 的内容", "挑战：给“étudier”变位，并说出“j’aime étudier”"] } } } }
  },
  ja: {
    ui: { sousTitre: "記憶を選んでください", commencer: "はじめる", continuer: "つづける", fragmentSur: "{n}個中 {k}個目のかけら", revoir: "もう一度見る",
      verrouille: "前の記憶を終えると、この記憶が開きます。", preparation: "この記憶はまだ準備中です ✏️", avec: "登場：", mystere: "謎の人物",
      programme: "かけらと語彙", rappel: "復習：", legende: "m. = 男性名詞 · f. = 女性名詞", repeter: "もう一度やる", recupere: "取り戻した", titrePage: "記憶", retour: "戻る", fermer: "閉じる", etatVerrouille: "ロック中", etatTermine: "完了" },
    m: { m1: {
      titre: "最初の記憶", teaser: "すべてはここから…",
      resume: "ある記憶がこわれて、かけらだけが残っています。かけらをひとつずつ集めて、フランス語の最初の文を取り戻しましょう。食べるもの、見るもの、好きなものを言ってみます。最後は、ひとりで記憶を直します。",
      notions: ["文の順序", "男性と女性", "Un/une と le/la", "«je» といっしょに使う -er 動詞", "J’aime + 動詞の原形"],
      fragments: {
        f1: { titre: "食べる", notions: ["文の順序：主語、動詞、目的語", "名詞は男性（un）か女性（une）", "«je» のとき、-er 動詞は -e で終わる"] },
        f2: { titre: "サンドイッチと poutine", notions: ["«un» と «une»：新しいもの", "«le» と «la»：話題になっている、すでに知っているもの", "男性：un → le。女性：une → la"] },
        f3: { titre: "見る", notions: ["もうひとつの -er 動詞：regarder", "目的語は動詞のすぐあとに来る。小さな言葉は入らない", "動詞が目的語を選ぶ：regarder は manger ではない"] },
        f4: { titre: "好き", notions: ["母音の前で «je» は «j’» になる：j’aime", "«aimer» のあとの動詞は原形のまま：manger、regarder、jouer"] },
        f5: { titre: "修復", notions: ["ひとりですべて組み合わせる：4つのかけらがそろう", "元の場所にもどす6つの文"] },
        f6: { titre: "総仕上げ", notions: ["聞こえたとおりに書く：マスもヒントもなし", "«je» を使って、絵についての質問に答える", "ベックについて学んだことを思い出す", "チャレンジ：étudier を活用して «j’aime étudier» と言う"] } } } }
  },
  ko: {
    ui: { sousTitre: "기억을 골라 보세요", commencer: "시작하기", continuer: "이어서 하기", fragmentSur: "조각 {k} / {n}", revoir: "다시 보기",
      verrouille: "이 기억을 열려면 앞의 기억을 먼저 끝내세요.", preparation: "이 기억은 아직 준비 중이에요 ✏️", avec: "함께", mystere: "수수께끼의 누군가",
      programme: "조각과 어휘", rappel: "복습:", legende: "m. = 남성 · f. = 여성", repeter: "다시 하기", recupere: "되찾음", titrePage: "기억", retour: "뒤로", fermer: "닫기", etatVerrouille: "잠김", etatTermine: "완료" },
    m: { m1: {
      titre: "첫 번째 기억", teaser: "모든 것이 여기서 시작돼요…",
      resume: "기억 하나가 망가져서 조각만 남았어요. 조각을 하나씩 모으면서 프랑스어 첫 문장들을 되찾아요. 무엇을 먹는지, 무엇을 보는지, 무엇을 좋아하는지 말해 보는 거예요. 마지막에는 혼자서 기억을 고쳐요.",
      notions: ["문장의 순서", "남성과 여성", "Un/une와 le/la", "«je»와 함께 쓰는 -er 동사", "J’aime + 동사원형"],
      fragments: {
        f1: { titre: "먹어요", notions: ["문장의 순서: 주어, 동사, 목적어", "명사는 남성(un) 또는 여성(une)이에요", "«je» 뒤에서 -er 동사는 -e로 끝나요"] },
        f2: { titre: "샌드위치와 poutine", notions: ["«un»과 «une»: 새로운 것", "«le»와 «la»: 이야기 중인, 이미 아는 것", "남성: un → le. 여성: une → la"] },
        f3: { titre: "봐요", notions: ["또 하나의 -er 동사: regarder", "목적어는 동사 바로 뒤에 와요. 작은 단어는 끼지 않아요", "동사가 목적어를 정해요: regarder는 manger가 아니에요"] },
        f4: { titre: "좋아해요", notions: ["모음 앞에서 «je»는 «j’»가 돼요: j’aime", "«aimer» 뒤의 동사는 원형 그대로예요: manger, regarder, jouer"] },
        f5: { titre: "복구", notions: ["혼자서 전부 맞추기: 네 조각을 하나로", "제자리에 돌려놓을 문장 여섯 개"] },
        f6: { titre: "마지막 시험", notions: ["칸도 힌트도 없이 들은 것 쓰기", "그림에 대한 질문에 “je”로 대답하기", "Bek에 대해 배운 것을 기억해 내기", "도전: “étudier”를 변화시키고 “j’aime étudier” 말하기"] } } } }
  },
  vi: {
    ui: { sousTitre: "Chọn một ký ức", commencer: "Bắt đầu", continuer: "Tiếp tục", fragmentSur: "Mảnh {k} trên {n}", revoir: "Xem lại",
      verrouille: "Hoàn thành ký ức trước để mở ký ức này.", preparation: "Ký ức này vẫn đang được chuẩn bị ✏️", avec: "Cùng với", mystere: "Một người bí ẩn",
      programme: "Các mảnh và từ vựng", rappel: "Để ôn lại:", legende: "m. = giống đực · f. = giống cái", repeter: "Làm lại", recupere: "đã tìm lại", titrePage: "Ký ức", retour: "Quay lại", fermer: "Đóng", etatVerrouille: "bị khóa", etatTermine: "đã hoàn thành" },
    m: { m1: {
      titre: "Ký ức đầu tiên", teaser: "Mọi thứ bắt đầu từ đây…",
      resume: "Một ký ức bị hỏng, chỉ còn lại những mảnh vụn. Từng mảnh một, bạn tìm lại những câu tiếng Pháp đầu tiên của mình: nói mình ăn gì, xem gì, thích gì. Cuối cùng, bạn tự sửa lại ký ức.",
      notions: ["Thứ tự trong câu", "Giống đực và giống cái", "Un/une và le/la", "Động từ -er với «je»", "J’aime + động từ nguyên mẫu"],
      fragments: {
        f1: { titre: "Tôi ăn", notions: ["Thứ tự trong câu: chủ ngữ, động từ, tân ngữ", "Danh từ là giống đực (un) hoặc giống cái (une)", "Với «je», động từ -er kết thúc bằng -e"] },
        f2: { titre: "Bánh mì kẹp và poutine", notions: ["«un» và «une»: một thứ mới", "«le» và «la»: thứ đang được nói đến, đã biết rồi", "Giống đực: un → le. Giống cái: une → la"] },
        f3: { titre: "Tôi xem", notions: ["Một động từ -er khác: regarder", "Tân ngữ đứng ngay sau động từ, không có từ nhỏ nào xen vào", "Động từ chọn tân ngữ của nó: regarder không phải manger"] },
        f4: { titre: "Tôi thích", notions: ["«je» trước nguyên âm thành «j’»: j’aime", "Sau «aimer», động từ giữ nguyên mẫu: manger, regarder, jouer"] },
        f5: { titre: "Sửa chữa", notions: ["Tự ghép tất cả lại: bốn mảnh hợp thành một", "Sáu câu cần đặt lại đúng chỗ"] },
        f6: { titre: "Bài thử cuối cùng", notions: ["Viết những gì bạn nghe được, không có ô và không có gợi ý", "Trả lời các câu hỏi về hình ảnh với “je”", "Nhớ lại những gì bạn đã học về Bek", "Thử thách: chia động từ “étudier” và nói “j’aime étudier”"] } } } }
  },
  ht: {
    ui: { sousTitre: "Chwazi yon souvni", commencer: "Kòmanse", continuer: "Kontinye", fragmentSur: "Moso {k} sou {n}", revoir: "Gade ankò",
      verrouille: "Fini souvni anvan an pou louvri sa a.", preparation: "Souvni sa a poko pare ✏️", avec: "Avèk", mystere: "Yon moun mistè",
      programme: "Moso ak vokabilè", rappel: "Pou revize:", legende: "m. = maskilen · f. = feminen", repeter: "Repete", recupere: "jwenn ankò", titrePage: "Souvni", retour: "Tounen", fermer: "Fèmen", etatVerrouille: "vérouye", etatTermine: "fini" },
    m: { m1: {
      titre: "Premye souvni", teaser: "Tout bagay kòmanse isit la…",
      resume: "Yon souvni domaje, se sèlman moso ki rete. Moso apre moso, ou jwenn premye fraz franse ou yo ankò: di sa w manje, sa w gade, sa w renmen. Nan fen, ou repare souvni a poukont ou.",
      notions: ["Lòd fraz la", "Maskilen ak feminen", "Un/une ak le/la", "Vèb an -er ak «je»", "J’aime + enfinitif"],
      fragments: {
        f1: { titre: "M manje", notions: ["Lòd fraz la: sijè, vèb, konplè", "Yon non se maskilen (un) oswa feminen (une)", "Ak «je», yon vèb an -er fini ak -e"] },
        f2: { titre: "Sandwich la, poutine nan", notions: ["«un» ak «une»: yon bagay nouvo", "«le» ak «la»: bagay nou ap pale de li a, ki deja konnen", "Maskilen: un → le. Feminen: une → la"] },
        f3: { titre: "M gade", notions: ["Yon lòt vèb an -er: regarder", "Konplè a vini dirèkteman apre vèb la, san ti mo ant yo", "Vèb la chwazi konplè li: regarder pa manger"] },
        f4: { titre: "M renmen", notions: ["«je» devan yon vwayèl vin «j’»: j’aime", "Apre «aimer», vèb la rete nan enfinitif: manger, regarder, jouer"] },
        f5: { titre: "Reparasyon an", notions: ["Mete tout ansanm poukont ou: kat moso yo reyini", "Sis fraz pou remete kote yo ye"] },
        f6: { titre: "Dènye tès la", notions: ["Ekri sa w tande a, san bwat e san endis", "Reponn kesyon sou imaj ak « je »", "Sonje sa w te aprann sou Bek", "Defi: konjige « étudier » epi di « j’aime étudier »"] } } } }
  },
  tl: {
    ui: { sousTitre: "Pumili ng alaala", commencer: "Magsimula", continuer: "Magpatuloy", fragmentSur: "Piraso {k} sa {n}", revoir: "Balikan",
      verrouille: "Tapusin muna ang nakaraang alaala para mabuksan ito.", preparation: "Inihahanda pa ang alaalang ito ✏️", avec: "Kasama si", mystere: "Isang misteryosong tao",
      programme: "Mga piraso at bokabularyo", rappel: "Para sa pagrerepaso:", legende: "m. = panlalaki · f. = pambabae", repeter: "Ulitin", recupere: "nabawi na", titrePage: "Mga alaala", retour: "Bumalik", fermer: "Isara", etatVerrouille: "naka-lock", etatTermine: "tapos na" },
    m: { m1: {
      titre: "Unang alaala", teaser: "Dito nagsisimula ang lahat…",
      resume: "May sirang alaala at mga piraso na lang ang natira. Isa-isang piraso, mababawi mo ang una mong mga pangungusap sa Pranses: sabihin kung ano ang kinakain mo, pinapanood mo, at gusto mo. Sa dulo, ikaw mismo ang mag-aayos ng alaala.",
      notions: ["Ang pagkakasunod-sunod ng pangungusap", "Panlalaki at pambabae", "Un/une at le/la", "Ang mga pandiwang -er kasama ang «je»", "J’aime + pawatas"],
      fragments: {
        f1: { titre: "Kumakain ako", notions: ["Ang pagkakasunod-sunod: paksa, pandiwa, layon", "Ang pangngalan ay panlalaki (un) o pambabae (une)", "Kapag «je» ang paksa, nagtatapos sa -e ang pandiwang -er"] },
        f2: { titre: "Ang sandwich, ang poutine", notions: ["«un» at «une»: bagong bagay", "«le» at «la»: ang bagay na pinag-uusapan, kilala na", "Panlalaki: un → le. Pambabae: une → la"] },
        f3: { titre: "Tumitingin ako", notions: ["Isa pang pandiwang -er: regarder", "Ang layon ay sumusunod agad sa pandiwa, walang maliit na salita sa pagitan", "Ang pandiwa ang pumipili ng layon nito: hindi manger ang regarder"] },
        f4: { titre: "Gusto ko", notions: ["Ang «je» bago ang patinig ay nagiging «j’»: j’aime", "Pagkatapos ng «aimer», nananatiling pawatas ang pandiwa: manger, regarder, jouer"] },
        f5: { titre: "Ang pag-aayos", notions: ["Pagsama-samahin ang lahat nang mag-isa: ang apat na piraso", "Anim na pangungusap na ibabalik sa tamang lugar"] },
        f6: { titre: "Ang huling pagsubok", notions: ["Pagsulat ng naririnig mo, walang kahon at walang pahiwatig", "Pagsagot sa mga tanong tungkol sa mga larawan gamit ang «je»", "Pag-alala sa natutunan mo tungkol kay Bek", "Hamon: i-conjugate ang «étudier» at sabihin ang «j’aime étudier»"] } } } }
  },
  id: {
    ui: { sousTitre: "Pilih satu kenangan", commencer: "Mulai", continuer: "Lanjutkan", fragmentSur: "Kepingan {k} dari {n}", revoir: "Lihat lagi",
      verrouille: "Selesaikan kenangan sebelumnya untuk membuka yang ini.", preparation: "Kenangan ini masih disiapkan ✏️", avec: "Bersama", mystere: "Seseorang yang misterius",
      programme: "Kepingan dan kosakata", rappel: "Untuk mengulang:", legende: "m. = maskulin · f. = feminin", repeter: "Ulangi", recupere: "ditemukan kembali", titrePage: "Kenangan", retour: "Kembali", fermer: "Tutup", etatVerrouille: "terkunci", etatTermine: "selesai" },
    m: { m1: {
      titre: "Kenangan pertama", teaser: "Semuanya dimulai di sini…",
      resume: "Sebuah kenangan rusak dan hanya tersisa serpihan. Kepingan demi kepingan, kamu menemukan kembali kalimat-kalimat pertamamu dalam bahasa Prancis: menyebutkan apa yang kamu makan, apa yang kamu tonton, apa yang kamu suka. Di akhir, kamu memperbaiki kenangan itu sendiri.",
      notions: ["Urutan kalimat", "Maskulin dan feminin", "Un/une dan le/la", "Kata kerja -er dengan «je»", "J’aime + infinitif"],
      fragments: {
        f1: { titre: "Aku makan", notions: ["Urutan kalimat: subjek, kata kerja, objek", "Kata benda itu maskulin (un) atau feminin (une)", "Dengan «je», kata kerja -er berakhir dengan -e"] },
        f2: { titre: "Sandwich dan poutine", notions: ["«un» dan «une»: sesuatu yang baru", "«le» dan «la»: hal yang sedang dibicarakan, sudah dikenal", "Maskulin: un → le. Feminin: une → la"] },
        f3: { titre: "Aku melihat", notions: ["Kata kerja -er lainnya: regarder", "Objek langsung mengikuti kata kerja, tanpa kata kecil di antaranya", "Kata kerja memilih objeknya: regarder bukan manger"] },
        f4: { titre: "Aku suka", notions: ["«je» di depan huruf vokal menjadi «j’»: j’aime", "Setelah «aimer», kata kerja tetap berbentuk infinitif: manger, regarder, jouer"] },
        f5: { titre: "Perbaikan", notions: ["Menyatukan semuanya sendiri: empat kepingan digabung", "Enam kalimat untuk dikembalikan ke tempatnya"] },
        f6: { titre: "Ujian terakhir", notions: ["Menulis apa yang kamu dengar, tanpa kotak dan tanpa petunjuk", "Menjawab pertanyaan tentang gambar dengan «je»", "Mengingat apa yang sudah kamu pelajari tentang Bek", "Tantangan: mengonjugasikan «étudier» dan mengatakan «j’aime étudier»"] } } } }
  },
  nl: {
    ui: { sousTitre: "Kies een herinnering", commencer: "Beginnen", continuer: "Verdergaan", fragmentSur: "Fragment {k} van {n}", revoir: "Opnieuw bekijken",
      verrouille: "Rond de vorige herinnering af om deze te openen.", preparation: "Deze herinnering is nog in voorbereiding ✏️", avec: "Met", mystere: "Iemand mysterieus",
      programme: "Fragmenten en woordenschat", rappel: "Om te herhalen:", legende: "m. = mannelijk · f. = vrouwelijk", repeter: "Herhalen", recupere: "teruggevonden", titrePage: "Herinneringen", retour: "Terug", fermer: "Sluiten", etatVerrouille: "vergrendeld", etatTermine: "voltooid" },
    m: { m1: {
      titre: "Eerste herinnering", teaser: "Hier begint alles…",
      resume: "Een herinnering is beschadigd en er zijn nog maar stukjes van over. Fragment na fragment vind je je eerste Franse zinnen terug: zeggen wat je eet, waar je naar kijkt en wat je leuk vindt. Aan het eind herstel je de herinnering helemaal zelf.",
      notions: ["De volgorde van de zin", "Mannelijk en vrouwelijk", "Un/une en le/la", "Werkwoorden op -er met «je»", "J’aime + infinitief"],
      fragments: {
        f1: { titre: "Ik eet", notions: ["De volgorde van de zin: onderwerp, werkwoord, lijdend voorwerp", "Een zelfstandig naamwoord is mannelijk (un) of vrouwelijk (une)", "Met «je» eindigt een werkwoord op -er op -e"] },
        f2: { titre: "De sandwich, de poutine", notions: ["«un» en «une»: iets nieuws", "«le» en «la»: het ding waarover we praten, al bekend", "Mannelijk: un → le. Vrouwelijk: une → la"] },
        f3: { titre: "Ik kijk", notions: ["Nog een werkwoord op -er: regarder", "Het voorwerp komt direct na het werkwoord, zonder woordje ertussen", "Het werkwoord kiest zijn voorwerp: regarder is niet manger"] },
        f4: { titre: "Ik hou van", notions: ["«je» voor een klinker wordt «j’»: j’aime", "Na «aimer» blijft het werkwoord in de infinitief: manger, regarder, jouer"] },
        f5: { titre: "Het herstel", notions: ["Alles zelf samenvoegen: de vier stukjes bij elkaar", "Zes zinnen die je weer op hun plek zet"] },
        f6: { titre: "De eindtoets", notions: ["Opschrijven wat je hoort, zonder vakjes en zonder hints", "Vragen over afbeeldingen beantwoorden met «je»", "Onthouden wat je over Bek hebt geleerd", "Uitdaging: «étudier» vervoegen en «j’aime étudier» zeggen"] } } } }
  },
  de: {
    ui: { sousTitre: "Wähle eine Erinnerung", commencer: "Starten", continuer: "Weiter", fragmentSur: "Fragment {k} von {n}", revoir: "Noch einmal ansehen",
      verrouille: "Schließe die vorherige Erinnerung ab, um diese zu öffnen.", preparation: "Diese Erinnerung ist noch in Vorbereitung ✏️", avec: "Mit", mystere: "Jemand Geheimnisvolles",
      programme: "Fragmente und Wortschatz", rappel: "Zum Wiederholen:", legende: "m. = maskulin · f. = feminin", repeter: "Wiederholen", recupere: "wiedergefunden", titrePage: "Erinnerungen", retour: "Zurück", fermer: "Schließen", etatVerrouille: "gesperrt", etatTermine: "abgeschlossen" },
    m: { m1: {
      titre: "Erste Erinnerung", teaser: "Hier fängt alles an …",
      resume: "Eine Erinnerung ist beschädigt, nur Bruchstücke sind übrig. Fragment für Fragment findest du deine ersten Sätze auf Französisch wieder: sagen, was du isst, was du ansiehst, was du magst. Am Ende reparierst du die Erinnerung ganz allein.",
      notions: ["Die Satzstellung", "Maskulin und feminin", "Un/une und le/la", "Verben auf -er mit «je»", "J’aime + Infinitiv"],
      fragments: {
        f1: { titre: "Ich esse", notions: ["Die Satzstellung: Subjekt, Verb, Objekt", "Ein Nomen ist maskulin (un) oder feminin (une)", "Mit «je» endet ein Verb auf -er auf -e"] },
        f2: { titre: "Das Sandwich, die Poutine", notions: ["«un» und «une»: etwas Neues", "«le» und «la»: die Sache, über die man spricht, schon bekannt", "Maskulin: un → le. Feminin: une → la"] },
        f3: { titre: "Ich schaue", notions: ["Noch ein Verb auf -er: regarder", "Das Objekt steht direkt nach dem Verb, ohne Wörtchen dazwischen", "Das Verb wählt sein Objekt: regarder ist nicht manger"] },
        f4: { titre: "Ich mag", notions: ["«je» vor einem Vokal wird zu «j’»: j’aime", "Nach «aimer» bleibt das Verb im Infinitiv: manger, regarder, jouer"] },
        f5: { titre: "Die Reparatur", notions: ["Alles allein zusammensetzen: die vier Stücke vereint", "Sechs Sätze, die an ihren Platz zurückmüssen"] },
        f6: { titre: "Die Abschlussprüfung", notions: ["Aufschreiben, was du hörst, ohne Kästchen und ohne Hinweise", "Fragen zu Bildern mit «je» beantworten", "Sich daran erinnern, was du über Bek gelernt hast", "Herausforderung: «étudier» konjugieren und «j’aime étudier» sagen"] } } } }
  },
  fa: {
    ui: { sousTitre: "یک خاطره انتخاب کن", commencer: "شروع", continuer: "ادامه", fragmentSur: "قطعهٔ {k} از {n}", revoir: "دوباره دیدن",
      verrouille: "برای باز کردن این خاطره، اول خاطرهٔ قبلی را تمام کن.", preparation: "این خاطره هنوز در حال آماده\u200cسازی است ✏️", avec: "همراه", mystere: "یک نفر مرموز",
      programme: "قطعه\u200cها و واژگان", rappel: "برای مرور:", legende: "m. = مذکر · f. = مؤنث", repeter: "تکرار", recupere: "پیدا شد", titrePage: "خاطره\u200cها", retour: "بازگشت", fermer: "بستن", etatVerrouille: "قفل‌شده", etatTermine: "تمام‌شده" },
    m: { m1: {
      titre: "اولین خاطره", teaser: "همه\u200cچیز از اینجا شروع می\u200cشود…",
      resume: "یک خاطره آسیب دیده و فقط تکه\u200cهایی از آن مانده است. قطعه به قطعه، اولین جمله\u200cهای فرانسهٔ خودت را دوباره پیدا می\u200cکنی: گفتن اینکه چه می\u200cخوری، چه تماشا می\u200cکنی و چه چیزی را دوست داری. در پایان، خودت خاطره را ترمیم می\u200cکنی.",
      notions: ["ترتیب کلمات در جمله", "مذکر و مؤنث", "Un/une و le/la", "فعل\u200cهای -er با «je»", "J’aime + مصدر"],
      fragments: {
        f1: { titre: "من می\u200cخورم", notions: ["ترتیب کلمات: نهاد، فعل، مفعول", "اسم یا مذکر است (un) یا مؤنث (une)", "با «je»، فعل -er به -e ختم می\u200cشود"] },
        f2: { titre: "ساندویچ و poutine", notions: ["«un» و «une»: چیزی تازه", "«le» و «la»: چیزی که دربارهٔ آن حرف می\u200cزنیم و از قبل می\u200cشناسیمش", "مذکر: un → le. مؤنث: une → la"] },
        f3: { titre: "من نگاه می\u200cکنم", notions: ["یک فعل -er دیگر: regarder", "مفعول درست بعد از فعل می\u200cآید، بدون کلمهٔ کوچکی در میان", "فعل مفعولش را انتخاب می\u200cکند: regarder همان manger نیست"] },
        f4: { titre: "من دوست دارم", notions: ["«je» قبل از مصوت به «j’» تبدیل می\u200cشود: j’aime", "بعد از «aimer»، فعل به\u200cصورت مصدر می\u200cماند: manger، regarder، jouer"] },
        f5: { titre: "ترمیم", notions: ["همه را خودت کنار هم بگذار: چهار تکه کنار هم", "شش جمله که باید سر جایشان برگردند"] },
        f6: { titre: "آزمون پایانی", notions: ["نوشتن آنچه می‌شنوی، بدون کادر و بدون راهنمایی", "پاسخ دادن به پرسش‌هایی دربارهٔ تصویرها با «je»", "به یاد آوردن آنچه دربارهٔ Bek یاد گرفته‌ای", "چالش: صرف کردن «étudier» و گفتن «j’aime étudier»"] } } } }
  },
  sv: {
    ui: { sousTitre: "Välj ett minne", commencer: "Börja", continuer: "Fortsätt", fragmentSur: "Fragment {k} av {n}", revoir: "Se igen",
      verrouille: "Avsluta det förra minnet för att öppna det här.", preparation: "Det här minnet är fortfarande under förberedelse ✏️", avec: "Med", mystere: "Någon mystisk",
      programme: "Fragment och ordförråd", rappel: "För repetition:", legende: "m. = maskulinum · f. = femininum", repeter: "Upprepa", recupere: "återfunnet", titrePage: "Minnen", retour: "Tillbaka", fermer: "Stäng", etatVerrouille: "låst", etatTermine: "avklarad" },
    m: { m1: {
      titre: "Första minnet", teaser: "Här börjar allt …",
      resume: "Ett minne är skadat och bara bitar finns kvar. Fragment för fragment hittar du dina första meningar på franska: att säga vad du äter, vad du tittar på och vad du gillar. I slutet lagar du minnet helt själv.",
      notions: ["Meningens ordföljd", "Maskulinum och femininum", "Un/une och le/la", "Verb på -er med «je»", "J’aime + infinitiv"],
      fragments: {
        f1: { titre: "Jag äter", notions: ["Ordföljden: subjekt, verb, objekt", "Ett substantiv är maskulint (un) eller feminint (une)", "Med «je» slutar ett verb på -er på -e"] },
        f2: { titre: "Smörgåsen, poutinen", notions: ["«un» och «une»: något nytt", "«le» och «la»: det man pratar om, redan känt", "Maskulinum: un → le. Femininum: une → la"] },
        f3: { titre: "Jag tittar", notions: ["Ännu ett verb på -er: regarder", "Objektet kommer direkt efter verbet, utan småord emellan", "Verbet väljer sitt objekt: regarder är inte manger"] },
        f4: { titre: "Jag gillar", notions: ["«je» framför en vokal blir «j’»: j’aime", "Efter «aimer» står verbet i infinitiv: manger, regarder, jouer"] },
        f5: { titre: "Reparationen", notions: ["Sätta ihop allt själv: de fyra bitarna förenade", "Sex meningar som ska tillbaka på plats"] },
        f6: { titre: "Slutprovet", notions: ["Skriva det du hör, utan rutor och utan tips", "Svara på frågor om bilder med «je»", "Minnas vad du har lärt dig om Bek", "Utmaning: böja «étudier» och säga «j’aime étudier»"] } } } }
  },
  no: {
    ui: { sousTitre: "Velg et minne", commencer: "Begynn", continuer: "Fortsett", fragmentSur: "Fragment {k} av {n}", revoir: "Se igjen",
      verrouille: "Fullfør det forrige minnet for å åpne dette.", preparation: "Dette minnet er fortsatt under forberedelse ✏️", avec: "Med", mystere: "Noen mystisk",
      programme: "Fragmenter og ordforråd", rappel: "For repetisjon:", legende: "m. = maskulin · f. = feminin", repeter: "Gjenta", recupere: "gjenfunnet", titrePage: "Minner", retour: "Tilbake", fermer: "Lukk", etatVerrouille: "låst", etatTermine: "fullført" },
    m: { m1: {
      titre: "Første minne", teaser: "Her begynner alt …",
      resume: "Et minne er skadet, og bare biter er igjen. Fragment for fragment finner du dine første setninger på fransk: å si hva du spiser, hva du ser på og hva du liker. Til slutt reparerer du minnet helt selv.",
      notions: ["Rekkefølgen i setningen", "Maskulin og feminin", "Un/une og le/la", "Verb på -er med «je»", "J’aime + infinitiv"],
      fragments: {
        f1: { titre: "Jeg spiser", notions: ["Rekkefølgen: subjekt, verb, objekt", "Et substantiv er maskulint (un) eller feminint (une)", "Med «je» ender et verb på -er på -e"] },
        f2: { titre: "Sandwichen, poutinen", notions: ["«un» og «une»: noe nytt", "«le» og «la»: tingen man snakker om, allerede kjent", "Maskulin: un → le. Feminin: une → la"] },
        f3: { titre: "Jeg ser på", notions: ["Enda et verb på -er: regarder", "Objektet kommer rett etter verbet, uten småord imellom", "Verbet velger sitt objekt: regarder er ikke manger"] },
        f4: { titre: "Jeg liker", notions: ["«je» foran en vokal blir «j’»: j’aime", "Etter «aimer» står verbet i infinitiv: manger, regarder, jouer"] },
        f5: { titre: "Reparasjonen", notions: ["Sette alt sammen selv: de fire bitene forent", "Seks setninger som skal tilbake på plass"] },
        f6: { titre: "Sluttesten", notions: ["Skrive det du hører, uten ruter og uten hint", "Svare på spørsmål om bilder med «je»", "Huske det du har lært om Bek", "Utfordring: bøye «étudier» og si «j’aime étudier»"] } } } }
  },
  ru: {
    ui: { sousTitre: "Выбери воспоминание", commencer: "Начать", continuer: "Продолжить", fragmentSur: "Фрагмент {k} из {n}", revoir: "Пересмотреть",
      verrouille: "Закончи предыдущее воспоминание, чтобы открыть это.", preparation: "Это воспоминание ещё готовится ✏️", avec: "С", mystere: "Кто-то таинственный",
      programme: "Фрагменты и словарь", rappel: "Для повторения:", legende: "m. = мужской род · f. = женский род", repeter: "Повторить", recupere: "найден", titrePage: "Воспоминания", retour: "Назад", fermer: "Закрыть", etatVerrouille: "закрыто", etatTermine: "пройдено" },
    m: { m1: {
      titre: "Первое воспоминание", teaser: "Всё начинается здесь…",
      resume: "Одно воспоминание повреждено, от него остались лишь обрывки. Фрагмент за фрагментом ты находишь свои первые фразы по-французски: говоришь, что ты ешь, на что смотришь, что любишь. В конце ты восстанавливаешь воспоминание без подсказок.",
      notions: ["Порядок слов в предложении", "Мужской и женский род", "Un/une и le/la", "Глаголы на -er с «je»", "J’aime + инфинитив"],
      fragments: {
        f1: { titre: "Я ем", notions: ["Порядок слов: подлежащее, глагол, дополнение", "Существительное бывает мужского (un) или женского (une) рода", "С «je» глагол на -er заканчивается на -e"] },
        f2: { titre: "Сэндвич и poutine", notions: ["«un» и «une»: что-то новое", "«le» и «la»: то, о чём говорят, уже известное", "Мужской род: un → le. Женский род: une → la"] },
        f3: { titre: "Я смотрю", notions: ["Ещё один глагол на -er: regarder", "Дополнение идёт сразу после глагола, без лишних слов между ними", "Глагол выбирает своё дополнение: regarder — это не manger"] },
        f4: { titre: "Мне нравится", notions: ["«je» перед гласной превращается в «j’»: j’aime", "После «aimer» глагол остаётся в инфинитиве: manger, regarder, jouer"] },
        f5: { titre: "Починка", notions: ["Собрать всё вместе без подсказок: четыре части воедино", "Шесть предложений, которые нужно вернуть на место"] },
        f6: { titre: "Заключительное испытание", notions: ["Записывать то, что слышишь, без клеток и без подсказок", "Отвечать на вопросы по картинкам с «je»", "Вспоминать то, что ты узнал(а) о Bek", "Испытание: проспрягать «étudier» и сказать «j’aime étudier»"] } } } }
  }
};
