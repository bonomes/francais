/* ==================================================================
   lettre-initiale.js — module autonome, même patron que les autres
   écrans : window.KebBekLettreInitiale.demarrerLettreInitiale
   (idConteneur, options, callbacks).

   🆕 Extrait d'accueil.html (qui reste le banc d'essai autonome de ce
   module — voir son propre script, qui appelle désormais
   demarrerLettreInitiale au lieu de porter toute la logique en dur).

   Remplace ecran-demarrage.js comme tout premier écran du site :
   l'enveloppe tombe, le joueur l'ouvre, lit le courriel des Bonomes,
   répond Oui/Non. En cas de Oui → remerciement → badge sur
   l'enveloppe → 2e courriel avec le lien « Installer Bek ».

   Dépend de barre-progression.js + sequence-televersement.js
   (window.KebBekBarreProgression / window.KebBekTeleversement),
   chargés avant celui-ci — mais seulement si callbacks.onInstaller
   n'est PAS fourni (voir plus bas).

   @param {string} idConteneur
   @param {object} options
   *   - dossierImagesTeleversement — transmis à sequence-televersement.js
   *     si ce module lance lui-même la séquence (voir onInstaller ci-
   *     dessous). Défaut 'images/accueil/sequence_02/'.
   * @param {object} callbacks
   *   - onSeConnecter() — déclenché par « Déjà installés sur un autre
   *     fureteur ? Reconnecte-toi ici. », sans argument, comme
   *     l'ancien onSeConnecter d'ecran-demarrage.js : un simple
   *     déclencheur, la page hôte décide quoi faire (ex. relancer la
   *     vraie mécanique de reconnexion déjà branchée ailleurs sur le
   *     site plutôt que d'en dupliquer une ici).
   *   - onInstaller(codeLangue) — 🆕 déclenché au clic sur « Installer Bek »,
   *     codeLangue étant la langue choisie dans la lettre — à faire suivre
   *     jusqu'à sequence-telechargement-langue.js pour présélection,
   *     JUSTE AVANT que ce module lance sa propre séquence de
   *     téléversement plein écran. Si fourni, ce module NE LANCE PAS
   *     sequence-televersement.js lui-même : il masque la lettre et
   *     rend la main à la page hôte (utile pour insérer, par ex., le
   *     choix Keb/Bek d'ecran-televersement.js avant la séquence —
   *     c'est elle qui devra alors appeler sequence-televersement.js
   *     et gérer la suite). Si absent, ce module gère tout lui-même
   *     de bout en bout (comportement du banc d'essai accueil.html).
   *   - onFin(codeLangue) — appelé une fois Bek atterrie, MAIS SEULEMENT si
   *     onInstaller n'était pas fourni (sinon c'est la page hôte qui
   *     sait quand sa propre séquence se termine). codeLangue est la
   *     langue choisie dans la lettre (voir cl-lang-zone/changerLangue
   *     plus bas) — permet à la page hôte de la présélectionner à
   *     l'étape suivante (sequence-telechargement-langue.js).
   ================================================================== */

(function () {
  const LANGUES = [
    { code: 'fr', natif: 'Français' },
    { code: 'en', natif: 'English' },
    { code: 'es', natif: 'Español' },
    { code: 'it', natif: 'Italiano' },
    { code: 'pt', natif: 'Português' },
    { code: 'ca', natif: 'Català' },
    { code: 'eo', natif: 'Esperanto' },
    { code: 'zh', natif: '中文' },
    { code: 'ja', natif: '日本語' },
    { code: 'ko', natif: '한국어' },
    { code: 'vi', natif: 'Tiếng Việt' },
    { code: 'ht', natif: 'Kreyòl ayisyen' },
    { code: 'tl', natif: 'Tagalog' },
    { code: 'id', natif: 'Bahasa Indonesia' },
    { code: 'nl', natif: 'Nederlands' },
    { code: 'de', natif: 'Deutsch' },
    { code: 'fa', natif: 'فارسی' },
    { code: 'sv', natif: 'Svenska' },
    { code: 'no', natif: 'Norsk' },
    { code: 'ru', natif: 'Русский' }
  ];

  // 🚧 Traductions faites de mon mieux, non relues par des locuteurs
  // natifs — à valider avant mise en ligne, comme pour le reste du site.
  const DICO_LETTRE = {
    fr: { salutation: 'Bonjour !', objet1: 'Les Bonomes déménagent', corps: "Nous sommes les Bonomes ! Nous cherchons un endroit où déposer nos valises. On est gentils et on ne prend pas beaucoup de place. Est-ce qu'on peut s'installer sur ton fureteur ?", oui: 'Oui', non: 'Non', dommage: 'Dommage. Merci quand même !', regrets: 'Des regrets ?', recommencer: 'Recommencer', remerciement: "Merci infiniment ! On va t'envoyer un lien pour que tu puisses nous installer chez toi !", fermer: 'Fermer', objet2: 'Ton lien est arrivé !', message2Intro: 'Voici ton lien !', installerBek: 'Installer Bek et Keb', reconnexionLien: 'Déjà installés sur un autre fureteur ? Reconnecte-toi ici.' },
    en: { salutation: 'Hello!', objet1: 'The Bonomes are moving', corps: "We're the Bonomes! We're looking for a place to set down our bags. We're friendly, and we don't take up much space. Can we move into your browser?", oui: 'Yes', non: 'No', dommage: 'Too bad. Thanks anyway!', regrets: 'Having second thoughts?', recommencer: 'Start over', remerciement: "Thank you so much! We'll send you a link so you can install us at your place!", fermer: 'Close', objet2: 'Your link has arrived!', message2Intro: "Here's your link!", installerBek: 'Install Bek and Keb', reconnexionLien: 'Already installed on a different browser? Reconnect here.' },
    es: { salutation: '¡Hola!', objet1: 'Los Bonomes se mudan', corps: '¡Somos los Bonomes! Buscamos un lugar donde dejar nuestras maletas. Somos simpáticos y no ocupamos mucho espacio. ¿Podemos instalarnos en tu navegador?', oui: 'Sí', non: 'No', dommage: 'Qué lástima. ¡Gracias de todos modos!', regrets: '¿Te lo estás pensando mejor?', recommencer: 'Volver a empezar', remerciement: '¡Muchísimas gracias! Te enviaremos un enlace para que puedas instalarnos en tu casa!', fermer: 'Cerrar', objet2: '¡Tu enlace ha llegado!', message2Intro: '¡Aquí tienes tu enlace!', installerBek: 'Instalar a Bek y Keb', reconnexionLien: '¿Ya instalados en otro navegador? Reconéctate aquí.' },
    it: { salutation: 'Ciao!', objet1: 'I Bonomes traslocano', corps: 'Siamo i Bonomes! Cerchiamo un posto dove posare le valigie. Siamo simpatici e non occupiamo molto spazio. Possiamo stabilirci nel tuo browser?', oui: 'Sì', non: 'No', dommage: 'Peccato. Grazie lo stesso!', regrets: 'Hai ripensamenti?', recommencer: 'Ricomincia', remerciement: 'Grazie infinite! Ti manderemo un link per installarci a casa tua!', fermer: 'Chiudi', objet2: 'Il tuo link è arrivato!', message2Intro: 'Ecco il tuo link!', installerBek: 'Installa Bek e Keb', reconnexionLien: 'Già installati su un altro browser? Riconnettiti qui.' },
    pt: { salutation: 'Olá!', objet1: 'Os Bonomes vão mudar-se', corps: 'Somos os Bonomes! Estamos à procura de um lugar para pousar as malas. Somos simpáticos e não ocupamos muito espaço. Podemos instalar-nos no teu navegador?', oui: 'Sim', non: 'Não', dommage: 'Que pena. Obrigado(a) na mesma!', regrets: 'Está a repensar?', recommencer: 'Recomeçar', remerciement: 'Muito obrigado! Vamos enviar-te um link para nos instalares na tua casa!', fermer: 'Fechar', objet2: 'O teu link chegou!', message2Intro: 'Aqui está o teu link!', installerBek: 'Instalar a Bek e o Keb', reconnexionLien: 'Já instalado(a) noutro navegador? Reconecta-te aqui.' },
    ca: { salutation: 'Hola!', objet1: 'Els Bonomes es muden', corps: "Som els Bonomes! Busquem un lloc on deixar les maletes. Som simpàtics i no ocupem gaire espai. Ens podem instal·lar al teu navegador?", oui: 'Sí', non: 'No', dommage: 'Quina llàstima. Gràcies igualment!', regrets: 'T\'ho estàs repensant?', recommencer: 'Tornar a començar', remerciement: 'Moltes gràcies! T\'enviarem un enllaç perquè ens puguis instal·lar a casa teva!', fermer: 'Tanca', objet2: 'El teu enllaç ha arribat!', message2Intro: 'Aquí tens el teu enllaç!', installerBek: 'Instal·lar la Bek i en Keb', reconnexionLien: 'Ja instal·lats en un altre navegador? Reconnecta\'t aquí.' },
    eo: { salutation: 'Saluton!', objet1: 'La Bonomoj translokiĝas', corps: 'Ni estas la Bonomoj! Ni serĉas lokon por demeti niajn valizojn. Ni estas afablaj kaj ne okupas multe da spaco. Ĉu ni povas ekloĝi en via retumilo?', oui: 'Jes', non: 'Ne', dommage: 'Domaĝe. Dankon tamen!', regrets: 'Ĉu vi rekonsideras?', recommencer: 'Rekomenci', remerciement: 'Koran dankon! Ni sendos al vi ligilon, por ke vi povu instali nin ĉe vi!', fermer: 'Fermi', objet2: 'Via ligilo alvenis!', message2Intro: 'Jen via ligilo!', installerBek: 'Instali Bek kaj Keb', reconnexionLien: 'Ĉu jam instalita en alia retumilo? Rekonektiĝu ĉi tie.' },
    zh: { salutation: '你好！', objet1: 'Bonomes要搬家了', corps: '我们是Bonomes！我们在找一个地方放下行李。我们很友善，也不占多少空间。我们可以安顿在你的浏览器里吗？', oui: '可以', non: '不可以', dommage: '真可惜。还是谢谢你！', regrets: '要再想想吗？', recommencer: '重新开始', remerciement: '非常感谢！我们会给你发一个链接，让你把我们安装在你这里！', fermer: '关闭', objet2: '你的链接到了！', message2Intro: '这是你的链接！', installerBek: '安装贝克和凯博', reconnexionLien: '已经安装在其他浏览器上了？点此重新连接。' },
    ja: { salutation: 'こんにちは！', objet1: 'ボノムたちが引っ越します', corps: '私たちはボノムです！荷物を下ろせる場所を探しています。私たちは優しくて、場所もあまり取りません。あなたのブラウザに住んでもいいですか？', oui: 'はい', non: 'いいえ', dommage: '残念です。でもありがとう！', regrets: '考え直しますか？', recommencer: 'もう一度', remerciement: '本当にありがとう！リンクを送るから、私たちを君のところにインストールしてね！', fermer: '閉じる', objet2: 'リンクが届きました！', message2Intro: 'リンクはこちら！', installerBek: 'ベックとケブをインストール', reconnexionLien: '別のブラウザにすでにインストール済みですか？こちらから再接続。' },
    ko: { salutation: '안녕하세요!', objet1: '보놈들이 이사해요', corps: '우리는 보놈이에요! 짐을 내려놓을 곳을 찾고 있어요. 우리는 친절하고 자리도 많이 차지하지 않아요. 당신의 브라우저에 자리 잡아도 될까요?', oui: '네', non: '아니요', dommage: '아쉽네요. 그래도 고마워요!', regrets: '다시 생각해 보시겠어요?', recommencer: '다시 시작', remerciement: '정말 고마워요! 우리를 설치할 수 있게 링크를 보내줄게요!', fermer: '닫기', objet2: '링크가 도착했어요!', message2Intro: '여기 링크가 있어요!', installerBek: '벡과 케브 설치하기', reconnexionLien: '다른 브라우저에 이미 설치되어 있나요? 여기서 다시 연결하세요.' },
    vi: { salutation: 'Xin chào!', objet1: 'Các Bonomes chuyển nhà', corps: 'Chúng tôi là Bonomes! Chúng tôi đang tìm một nơi để đặt hành lý xuống. Chúng tôi thân thiện và không chiếm nhiều chỗ. Chúng tôi có thể ở trong trình duyệt của bạn không?', oui: 'Có', non: 'Không', dommage: 'Tiếc quá. Dù sao cũng cảm ơn bạn!', regrets: 'Bạn đổi ý chưa?', recommencer: 'Bắt đầu lại', remerciement: 'Cảm ơn bạn rất nhiều! Chúng tôi sẽ gửi cho bạn một liên kết để bạn cài đặt chúng tôi!', fermer: 'Đóng', objet2: 'Liên kết của bạn đã đến!', message2Intro: 'Đây là liên kết của bạn!', installerBek: 'Cài đặt Bek và Keb', reconnexionLien: 'Đã cài đặt trên trình duyệt khác rồi? Kết nối lại tại đây.' },
    ht: { salutation: 'Bonjou!', objet1: 'Bonom yo ap demenaje', corps: 'Nou se Bonom yo! N ap chèche yon kote pou depoze malèt nou. Nou janti e nou pa pran anpil plas. Èske nou ka enstale nan navigatè ou a?', oui: 'Wi', non: 'Non', dommage: 'Domaj. Mèsi kanmenm!', regrets: 'Ou chanje lide?', recommencer: 'Rekòmanse', remerciement: 'Mèsi anpil! Nou pral voye yon lyen pou ou ka enstale nou lakay ou!', fermer: 'Fèmen', objet2: 'Lyen ou an rive!', message2Intro: 'Men lyen ou an!', installerBek: 'Enstale Bek ak Keb', reconnexionLien: 'Ou deja enstale sou yon lòt navigatè? Rekonekte la a.' },
    tl: { salutation: 'Kumusta!', objet1: 'Lumilipat ang mga Bonomes', corps: 'Kami ang mga Bonomes! Naghahanap kami ng lugar para ibaba ang aming mga bagahe. Mabait kami at hindi kami gumagamit ng maraming espasyo. Maaari ba kaming manirahan sa iyong browser?', oui: 'Oo', non: 'Hindi', dommage: 'Sayang naman. Salamat pa rin!', regrets: 'Nag-iisip ka pa ba?', recommencer: 'Magsimula ulit', remerciement: 'Maraming salamat! Magpapadala kami ng link para ma-install mo kami sa iyo!', fermer: 'Isara', objet2: 'Dumating na ang link mo!', message2Intro: 'Narito ang link mo!', installerBek: 'I-install sina Bek at Keb', reconnexionLien: 'Naka-install na sa ibang browser? Mag-reconnect dito.' },
    id: { salutation: 'Halo!', objet1: 'Para Bonomes akan pindah', corps: 'Kami adalah Bonomes! Kami sedang mencari tempat untuk meletakkan koper kami. Kami ramah dan tidak memakan banyak tempat. Bolehkah kami tinggal di peramban kamu?', oui: 'Ya', non: 'Tidak', dommage: 'Sayang sekali. Terima kasih!', regrets: 'Berubah pikiran?', recommencer: 'Mulai lagi', remerciement: 'Terima kasih banyak! Kami akan mengirimkan tautan agar kamu bisa menginstal kami di tempatmu!', fermer: 'Tutup', objet2: 'Tautanmu telah tiba!', message2Intro: 'Ini tautanmu!', installerBek: 'Instal Bek dan Keb', reconnexionLien: 'Sudah terpasang di peramban lain? Sambungkan lagi di sini.' },
    nl: { salutation: 'Hallo!', objet1: 'De Bonomes verhuizen', corps: 'Wij zijn de Bonomes! We zijn op zoek naar een plek om onze koffers neer te zetten. We zijn vriendelijk en nemen niet veel ruimte in. Mogen we intrekken in jouw browser?', oui: 'Ja', non: 'Nee', dommage: 'Jammer. Toch bedankt!', regrets: 'Toch nog twijfels?', recommencer: 'Opnieuw beginnen', remerciement: 'Heel erg bedankt! We sturen je een link zodat je ons bij jou kan installeren!', fermer: 'Sluiten', objet2: 'Je link is aangekomen!', message2Intro: 'Hier is je link!', installerBek: 'Bek en Keb installeren', reconnexionLien: 'Al geïnstalleerd in een andere browser? Maak hier opnieuw verbinding.' },
    de: { salutation: 'Hallo!', objet1: 'Die Bonomes ziehen um', corps: 'Wir sind die Bonomes! Wir suchen einen Platz, um unsere Koffer abzustellen. Wir sind freundlich und nehmen nicht viel Platz ein. Dürfen wir in deinem Browser einziehen?', oui: 'Ja', non: 'Nein', dommage: 'Schade. Trotzdem danke!', regrets: 'Überlegst du es dir anders?', recommencer: 'Neu beginnen', remerciement: 'Vielen herzlichen Dank! Wir schicken dir einen Link, damit du uns bei dir installieren kannst!', fermer: 'Schließen', objet2: 'Dein Link ist angekommen!', message2Intro: 'Hier ist dein Link!', installerBek: 'Bek und Keb installieren', reconnexionLien: 'Schon in einem anderen Browser installiert? Hier neu verbinden.' },
    fa: { salutation: 'سلام!', objet1: 'بونوم‌ها اسباب‌کشی می‌کنند', corps: 'ما بونوم‌ها هستیم! دنبال جایی می‌گردیم که چمدان‌هایمان را زمین بگذاریم. ما مهربان هستیم و جای زیادی نمی‌گیریم. می‌توانیم در مرورگر تو جا بگیریم؟', oui: 'بله', non: 'خیر', dommage: 'حیف شد. به‌هر حال ممنون!', regrets: 'نظرت عوض شد؟', recommencer: 'از نو شروع', remerciement: 'خیلی ممنون! لینکی برایت می‌فرستیم تا بتوانی ما را نزد خودت نصب کنی!', fermer: 'بستن', objet2: 'لینک تو رسید!', message2Intro: 'این هم لینک تو!', installerBek: 'نصب بک و کب', reconnexionLien: 'قبلاً روی مرورگر دیگری نصب شده؟ اینجا دوباره وصل شو.' },
    sv: { salutation: 'Hej!', objet1: 'Bonomes flyttar', corps: 'Vi är Bonomes! Vi letar efter en plats att ställa ner våra väskor. Vi är snälla och tar inte mycket plats. Får vi flytta in i din webbläsare?', oui: 'Ja', non: 'Nej', dommage: 'Synd. Tack ändå!', regrets: 'Ångrar du dig?', recommencer: 'Börja om', remerciement: 'Tack så jättemycket! Vi skickar en länk så att du kan installera oss hos dig!', fermer: 'Stäng', objet2: 'Din länk har kommit!', message2Intro: 'Här är din länk!', installerBek: 'Installera Bek och Keb', reconnexionLien: 'Redan installerad i en annan webbläsare? Anslut igen här.' },
    no: { salutation: 'Hei!', objet1: 'Bonomene flytter', corps: 'Vi er Bonomene! Vi leter etter et sted å sette fra oss veskene våre. Vi er snille og tar ikke mye plass. Kan vi flytte inn i nettleseren din?', oui: 'Ja', non: 'Nei', dommage: 'Synd. Takk likevel!', regrets: 'Angrer du deg?', recommencer: 'Begynn på nytt', remerciement: 'Tusen takk! Vi sender deg en lenke slik at du kan installere oss hos deg!', fermer: 'Lukk', objet2: 'Lenken din har kommet!', message2Intro: 'Her er lenken din!', installerBek: 'Installer Bek og Keb', reconnexionLien: 'Allerede installert i en annen nettleser? Koble til på nytt her.' },
    ru: { salutation: 'Привет!', objet1: 'Bonomes переезжают', corps: 'Мы — Bonomes! Мы ищем место, куда бы поставить наши чемоданы. Мы дружелюбные и не занимаем много места. Можно нам поселиться в твоём браузере?', oui: 'Да', non: 'Нет', dommage: 'Жаль. Всё равно спасибо!', regrets: 'Передумал(а)?', recommencer: 'Начать заново', remerciement: 'Огромное спасибо! Мы пришлём тебе ссылку, чтобы ты мог установить нас у себя!', fermer: 'Закрыть', objet2: 'Твоя ссылка пришла!', message2Intro: 'Вот твоя ссылка!', installerBek: 'Установить Бек и Кеб', reconnexionLien: 'Уже установлены в другом браузере? Подключись заново здесь.' }
  };

  const codesValides = LANGUES.map(function (l) { return l.code; });
  const CLE_LANGUE = 'kebbek_langue'; // même clé que menu-principal.js / sac-a-dos.js / l'ancien ecran-demarrage.js

  function detecterLangueNavigateur() {
    try {
      const enregistree = localStorage.getItem(CLE_LANGUE);
      if (enregistree && codesValides.indexOf(enregistree) !== -1) return enregistree;
    } catch (e) { /* localStorage indisponible (mode privé, etc.) : on ignore */ }
    const brut = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
    const principal = brut.split('-')[0];
    return codesValides.indexOf(principal) !== -1 ? principal : 'fr';
  }

  const CHEMIN_ETOILE = 'M12 0 C12.6 6.4 14.2 9.8 24 12 C14.2 14.2 12.6 17.6 12 24 C11.4 17.6 9.8 14.2 0 12 C9.8 9.8 11.4 6.4 12 0 Z';
  const COULEURS_ETOILES = ['#FFE6BE', '#FFD8A0', '#FFF3DC'];

  const TEMPLATE =
    '<div class="li-scene">' +
      '<div class="enveloppe-conteneur" id="enveloppe">' +
        '<img class="enveloppe-img fermee" id="img-fermee" src="images/accueil/sequence_01/lettre-initiale_fermée_01.webp" alt="Enveloppe fermée">' +
        '<img class="enveloppe-img ouverte" id="img-ouverte" src="images/accueil/sequence_01/lettre-initiale_ouverte_01.webp" alt="Enveloppe ouverte">' +
        '<div class="li-lueur-halo"></div>' +
        '<div class="li-lueur-coeur"></div>' +
        '<div class="li-etoiles-zone" id="zone-etoiles"></div>' +
        '<div class="li-eclat-halo"></div>' +
        '<div class="li-eclat-rayons"></div>' +
        '<div class="li-eclat-onde"></div>' +
        '<div class="badge-notif" id="badgeNotif">1</div>' +
      '</div>' +

      '<div class="cl-cadre" id="clCadre">' +
        '<div class="cl-entete">' +
          '<div class="cl-entete-lignes">' +
            '<p class="cl-entete-ligne"><span class="cl-entete-label" id="clLabelDe">De :</span> Kaleb B</p>' +
            '<p class="cl-entete-ligne"><span class="cl-entete-label" id="clLabelA">À :</span> toncourriel@coucourriel.ca</p>' +
            '<p class="cl-entete-ligne"><span class="cl-entete-label" id="clLabelObjet">Objet :</span> <span id="clObjet">Les Bonomes déménagent</span></p>' +
          '</div>' +
          '<div class="cl-lang-zone">' +
            '<button type="button" class="cl-lang-discret" id="clSelecteur">' +
              '<span id="clSelecteurBadge">FR</span><span class="cl-selecteur-chevron">&#9662;</span>' +
            '</button>' +
            '<div class="cl-menu-langues" id="clMenu"></div>' +
          '</div>' +
        '</div>' +

        '<div class="cl-vue" id="clVueLettre">' +
          '<div class="cl-texte">' +
            '<p class="cl-salutation" id="clSalutation">Bonjour !</p>' +
            '<p class="cl-corps" id="clCorps"></p>' +
          '</div>' +
          '<div class="cl-boutons">' +
            '<button type="button" class="cl-btn cl-btn-refuser" id="clBtnRefuser">Non</button>' +
            '<button type="button" class="cl-btn cl-btn-accepter" id="clBtnAccepter">Oui</button>' +
          '</div>' +
          '<button type="button" class="cl-lien-reconnexion" id="clLienReconnexion">' +
            '<span id="clLienReconnexionTexte"></span>' +
          '</button>' +
        '</div>' +

        '<div class="cl-vue" id="clVueRemerciement" hidden>' +
          '<div class="cl-texte">' +
            '<p class="cl-corps" id="clRemerciementTexte"></p>' +
          '</div>' +
          '<div class="cl-boutons">' +
            '<button type="button" class="cl-btn cl-btn-refuser" id="clBtnFermer"></button>' +
          '</div>' +
        '</div>' +

        '<div class="cl-vue cl-dommage" id="clVueDommage" hidden>' +
          '<p class="cl-dommage-texte" id="clDommageTexte"></p>' +
          '<p class="cl-dommage-regrets" id="clRegrets"></p>' +
          '<button type="button" class="cl-btn-recommencer" id="clBtnRecommencer"></button>' +
        '</div>' +

        '<div class="cl-vue" id="clVueMessage2" hidden>' +
          '<div class="cl-texte">' +
            '<p class="cl-corps" id="clMessage2Intro"></p>' +
            '<button type="button" class="cl-lien-televersement" id="clLienTeleversement"></button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  function demarrerLettreInitiale(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};

    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return;
    conteneur.innerHTML = TEMPLATE;

    let langueActuelle = detecterLangueNavigateur();
    let minuteurRegrets = null;
    let minuteurBadge = null;
    let sequenceTeleversementActive = null;
    let peutCliquerEnveloppe = false;
    let callbackClicSuivant = null;

    function texte(cle) {
      const t = DICO_LETTRE[langueActuelle];
      return (t && t[cle] !== undefined) ? t[cle] : DICO_LETTRE.fr[cle];
    }

    // ---------- éléments ----------
    const enveloppeEl = document.getElementById('enveloppe');
    const zoneEtoiles = document.getElementById('zone-etoiles');
    const badgeNotif = document.getElementById('badgeNotif');
    const cadre = document.getElementById('clCadre');
    const vueLettre = document.getElementById('clVueLettre');
    const vueDommage = document.getElementById('clVueDommage');
    const vueRemerciement = document.getElementById('clVueRemerciement');
    const vueMessage2 = document.getElementById('clVueMessage2');
    const selecteur = document.getElementById('clSelecteur');
    const selecteurBadge = document.getElementById('clSelecteurBadge');
    const menu = document.getElementById('clMenu');
    const salutationEl = document.getElementById('clSalutation');
    const corpsEl = document.getElementById('clCorps');
    const btnAccepter = document.getElementById('clBtnAccepter');
    const btnRefuser = document.getElementById('clBtnRefuser');
    const dommageTexteEl = document.getElementById('clDommageTexte');
    const regretsEl = document.getElementById('clRegrets');
    const btnRecommencer = document.getElementById('clBtnRecommencer');
    const remerciementTexteEl = document.getElementById('clRemerciementTexte');
    const btnFermer = document.getElementById('clBtnFermer');
    const message2IntroEl = document.getElementById('clMessage2Intro');
    const lienTeleversementEl = document.getElementById('clLienTeleversement');
    const objetEl = document.getElementById('clObjet');
    const lienReconnexionEl = document.getElementById('clLienReconnexion');
    const lienReconnexionTexteEl = document.getElementById('clLienReconnexionTexte');

    // ---------- enveloppe : étoiles + chute + ouverture/fermeture ----------
    function jaillirEtoiles() {
      zoneEtoiles.innerHTML = '';
      const nb = 10;
      for (let i = 0; i < nb; i++) {
        const angle = (360 / nb) * i + (Math.random() * 22 - 11);
        const distance = 70 + Math.random() * 90;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance * 0.85 - 18;

        const taille = 9 + Math.random() * 9;
        const duree = 0.65 + Math.random() * 0.35;
        const delai = Math.random() * 0.15;
        const rotation = Math.random() * 140 - 70;
        const couleur = COULEURS_ETOILES[i % COULEURS_ETOILES.length];

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.classList.add('li-etoile');
        svg.style.width = taille + 'px';
        svg.style.height = taille + 'px';
        svg.style.setProperty('--tx', tx.toFixed(1) + 'px');
        svg.style.setProperty('--ty', ty.toFixed(1) + 'px');
        svg.style.setProperty('--fin-echelle', (0.5 + Math.random() * 0.4).toFixed(2));
        svg.style.setProperty('--rot', rotation.toFixed(0) + 'deg');
        svg.style.animationDuration = duree.toFixed(2) + 's';
        svg.style.animationDelay = delai.toFixed(2) + 's';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', CHEMIN_ETOILE);
        path.setAttribute('fill', couleur);
        svg.appendChild(path);
        zoneEtoiles.appendChild(svg);
      }
    }

    function demarrerChute() {
      enveloppeEl.classList.remove('flotte', 'eclater');
      zoneEtoiles.innerHTML = '';
      void enveloppeEl.offsetWidth; // force reflow pour permettre de rejouer l'animation
      enveloppeEl.classList.add('tombe');
      peutCliquerEnveloppe = false;
      reinitialiser();

      setTimeout(function () {
        enveloppeEl.classList.remove('tombe');
        enveloppeEl.classList.add('flotte');
        peutCliquerEnveloppe = true;
      }, 1150);
    }

    // ouvre l'enveloppe (éclat du cachet + fondu vers l'image ouverte), puis
    // appelle callback() une fois la lettre visible — réutilisé pour le
    // premier clic et pour la réouverture au clic sur le badge « 1 »
    function ouvrirEnveloppe(callback) {
      peutCliquerEnveloppe = false;
      enveloppeEl.classList.remove('flotte');
      enveloppeEl.classList.add('eclater');
      jaillirEtoiles();
      setTimeout(function () {
        if (callback) callback();
      }, 1300);
    }

    // referme l'enveloppe (redevient l'image fermée, flottante) sans rejouer
    // toute la chute — utilisé une fois la lettre initiale lue et fermée
    function refermerEnveloppe() {
      enveloppeEl.classList.remove('eclater');
      zoneEtoiles.innerHTML = '';
      void enveloppeEl.offsetWidth;
      enveloppeEl.classList.add('flotte');
      peutCliquerEnveloppe = false;
    }

    // rend l'enveloppe cliquable pour un seul prochain clic, avec un
    // callback dédié (utilisé pour le badge de notification : c'est bien
    // l'enveloppe elle-même qu'on clique, jamais le badge — voir
    // .badge-notif { pointer-events: none } dans le CSS)
    function activerClicPourEnveloppe(callback) {
      callbackClicSuivant = callback;
      peutCliquerEnveloppe = true;
    }

    enveloppeEl.addEventListener('click', function () {
      if (!peutCliquerEnveloppe) return;
      if (callbackClicSuivant) {
        const cb = callbackClicSuivant;
        callbackClicSuivant = null;
        ouvrirEnveloppe(cb);
        return;
      }
      ouvrirEnveloppe(function () { afficherCadre(); });
    });

    // ---------- construction du menu déroulant de langues ----------
    LANGUES.forEach(function (l) {
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'cl-option-langue';
      opt.dataset.code = l.code;
      opt.innerHTML = '<span class="cl-option-badge">' + l.code.toUpperCase() + '</span><span>' + l.natif + '</span>';
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        changerLangue(l.code);
        fermerMenu();
      });
      menu.appendChild(opt);
    });

    function ouvrirMenu() {
      menu.classList.add('cl-menu-visible');
      selecteur.classList.add('cl-ouvert');
    }
    function fermerMenu() {
      menu.classList.remove('cl-menu-visible');
      selecteur.classList.remove('cl-ouvert');
    }
    selecteur.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('cl-menu-visible')) fermerMenu(); else ouvrirMenu();
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== selecteur) fermerMenu();
    });

    function changerLangue(code) {
      langueActuelle = DICO_LETTRE[code] ? code : 'fr';
      try { localStorage.setItem(CLE_LANGUE, langueActuelle); } catch (e) { /* mode privé, etc. */ }
      const langueInfo = LANGUES.find(function (l) { return l.code === langueActuelle; });
      selecteurBadge.textContent = langueActuelle.toUpperCase();
      selecteur.title = langueInfo.natif;
      menu.querySelectorAll('.cl-option-langue').forEach(function (opt) {
        opt.classList.toggle('cl-option-selectionnee', opt.dataset.code === langueActuelle);
      });
      const t = DICO_LETTRE[langueActuelle];
      salutationEl.textContent = t.salutation;
      corpsEl.textContent = t.corps;
      btnAccepter.textContent = t.oui;
      btnRefuser.textContent = t.non;
      lienReconnexionTexteEl.textContent = t.reconnexionLien;
      // ne retraduit le sujet du 1er courriel que si le 2e n'est pas déjà
      // affiché (sinon changer de langue depuis le menu, sur le 2e
      // courriel, écraserait son propre sujet "objet2" avec celui du 1er)
      if (vueMessage2.hidden) {
        objetEl.textContent = t.objet1;
      } else {
        objetEl.textContent = t.objet2;
      }
    }

    // ---------- Refuser : « Dommage » puis, après 5 s, « Des regrets ? » ----------
    function afficherDommage() {
      const t = DICO_LETTRE[langueActuelle];
      dommageTexteEl.textContent = t.dommage;
      regretsEl.textContent = t.regrets;
      btnRecommencer.textContent = t.recommencer;
      regretsEl.classList.remove('cl-visible');
      btnRecommencer.classList.remove('cl-visible');

      vueLettre.hidden = true;
      vueDommage.hidden = false;

      if (minuteurRegrets) clearTimeout(minuteurRegrets);
      minuteurRegrets = setTimeout(function () {
        regretsEl.classList.add('cl-visible');
        btnRecommencer.classList.add('cl-visible');
      }, 5000);
    }

    btnRefuser.addEventListener('click', afficherDommage);
    btnRecommencer.addEventListener('click', function () { demarrerChute(); });

    function masquerToutesLesVues() {
      vueLettre.hidden = true;
      vueDommage.hidden = true;
      vueRemerciement.hidden = true;
      vueMessage2.hidden = true;
    }

    // ---------- "Oui" → remerciement → (Fermer) → badge → 2e courriel ----------
    btnAccepter.addEventListener('click', function () {
      remerciementTexteEl.textContent = texte('remerciement');
      btnFermer.textContent = texte('fermer');
      masquerToutesLesVues();
      vueRemerciement.hidden = false;
    });

    // ---------- « Déjà installés sur un autre fureteur ? » ----------
    // 🆕 simple déclencheur, pas de champ courriel local : la vraie
    // mécanique de reconnexion (courriel + code) vit déjà ailleurs sur le
    // site (voir demarrerReconnexionDepuisIndex côté index.html) — pas la
    // peine de la dupliquer ici, comme dans l'ancien ecran-demarrage.js.
    lienReconnexionEl.addEventListener('click', function () {
      if (typeof callbacks.onSeConnecter === 'function') callbacks.onSeConnecter();
    });

    // affiche le 2e courriel — déclenché par le clic sur l'ENVELOPPE (jamais
    // sur le badge « 1 » lui-même, qui n'est qu'un indicateur visuel)
    function ouvrirEtAfficherMessage2() {
      badgeNotif.classList.remove('cl-visible');
      objetEl.textContent = texte('objet2');
      message2IntroEl.textContent = texte('message2Intro');
      lienTeleversementEl.textContent = texte('installerBek');
      masquerToutesLesVues();
      vueMessage2.hidden = false;
      cadre.classList.add('cl-visible');
    }

    btnFermer.addEventListener('click', function () {
      cadre.classList.remove('cl-visible');
      // l'enveloppe redevient fermée, comme si on attendait un nouveau message
      refermerEnveloppe();
      if (minuteurBadge) clearTimeout(minuteurBadge);
      minuteurBadge = setTimeout(function () {
        badgeNotif.classList.add('cl-visible');
        // rend l'enveloppe cliquable de nouveau : c'est le clic sur le
        // courriel (l'enveloppe), pas sur le badge, qui rouvre le 2e message
        activerClicPourEnveloppe(ouvrirEtAfficherMessage2);
      }, 3000);
    });

    // ---------- « Installer Bek » ----------
    // Si callbacks.onInstaller est fourni, la page hôte reprend la main
    // (ex. insérer le choix Keb/Bek avant sa propre séquence). Sinon, ce
    // module gère tout lui-même — comportement du banc d'essai accueil.html.
    function lancerSequenceTeleversementInterne() {
      if (!window.KebBekTeleversement) {
        console.warn('lettre-initiale : sequence-televersement.js non chargé.');
        return;
      }
      let hote = document.getElementById('tvbkConteneur');
      if (!hote) {
        hote = document.createElement('div');
        hote.id = 'tvbkConteneur';
        document.body.appendChild(hote);
      }
      sequenceTeleversementActive = window.KebBekTeleversement.demarrerSequenceTeleversement(
        'tvbkConteneur',
        { dossierImages: options.dossierImagesTeleversement || 'images/accueil/sequence_02/' },
        {
          onFin: function () {
            sequenceTeleversementActive = null;
            if (typeof callbacks.onFin === 'function') callbacks.onFin(langueActuelle);
          }
        }
      );
    }

    lienTeleversementEl.addEventListener('click', function () {
      masquerToutesLesVues();
      cadre.classList.remove('cl-visible');
      if (typeof callbacks.onInstaller === 'function') {
        callbacks.onInstaller(langueActuelle);
        return;
      }
      lancerSequenceTeleversementInterne();
    });

    function arreterSequenceTeleversement() {
      if (sequenceTeleversementActive) {
        sequenceTeleversementActive.arreter();
        sequenceTeleversementActive = null;
      }
      const hote = document.getElementById('tvbkConteneur');
      if (hote) hote.innerHTML = '';
    }

    function afficherCadre() {
      cadre.classList.add('cl-visible');
    }

    function reinitialiser() {
      arreterSequenceTeleversement();
      cadre.classList.remove('cl-visible');
      fermerMenu();
      if (minuteurRegrets) { clearTimeout(minuteurRegrets); minuteurRegrets = null; }
      if (minuteurBadge) { clearTimeout(minuteurBadge); minuteurBadge = null; }
      badgeNotif.classList.remove('cl-visible');
      masquerToutesLesVues();
      vueLettre.hidden = false;
      regretsEl.classList.remove('cl-visible');
      btnRecommencer.classList.remove('cl-visible');
      changerLangue(langueActuelle); // conserve la langue choisie d'un essai à l'autre
    }

    changerLangue(langueActuelle);
    demarrerChute();

    // méthodes exposées pour le banc d'essai (accueil.html — bouton "rejouer")
    return {
      demarrerChute: demarrerChute,
      arreterSequenceTeleversement: arreterSequenceTeleversement
    };
  }

  window.KebBekLettreInitiale = { demarrerLettreInitiale: demarrerLettreInitiale };
})();
