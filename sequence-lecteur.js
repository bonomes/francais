/* ==================================================================
   sequence-lecteur.js — le fichier « .mem » est illisible : l'élève
   télécharge « Le Lecteur », qui l'ouvrira.

   🆕 (18-10-2026) Module autonome, même patron que sequence-reveil-bek.js :
   il se pose PAR-DESSUS la scène du réveil (l'élément .rbek-scene) et ne
   connaît rien du reste de la page.

   Déroulement :
     1. afficherCommentaire(scene, options) — au bas de l'écran, l'élève
        s'interroge dans sa langue : « What's that ? A file ? » (une
        « pensée » pâle, volontairement différente des bulles de Bek).
     2. demarrer(scene, options, callbacks) — au clic sur la bulle .mem :
        a. fenêtre « fichier illisible » (apparence SYSTÈME : police du
           système, à plat, sans relief — pour qu'on sente que c'est
           l'ordinateur qui parle, pas un personnage). Oui / Non ;
        b. installation : l'icône du Lecteur se remplit du bas vers le haut ;
        c. « Téléchargement terminé » + bouton Ouvrir ;
        d. le Lecteur apparaît, dit un mot, et on plonge (callbacks.onPret).

   🚧 L'« installation » est entièrement fictive : rien n'est téléchargé.
   La fenêtre garde le style du site et ne ressemble pas à une vraie boîte
   de dialogue de navigateur (les élèves ont 13-14 ans : on ne les habitue
   pas à cliquer « oui » sur une vraie fenêtre d'installation).

   🆕 (01-11-2026) Dictionnaire complet : fr + les 19 langues du site (en, es,
   it, pt, ca, eo, zh, ja, ko, vi, ht, tl, id, nl, de, fa, sv, no, ru ; repli :
   en, puis fr). Avant, l'italien (entre autres) retombait sur l'anglais.
   ℹ️ pt = portugais du Brésil (la langue de l'élève ; Bek, elle, parle celui du
   Portugal) ; zh = chinois simplifié. À faire relire par des locuteurs avant
   la mise en ligne.

   🎨 L'icône du Lecteur est PROVISOIRE (SVG dessiné ici, voir svgLecteur).
   Pour la remplacer par un vrai dessin : options.imageLecteur = 'url.webp'
   (ou window.KebBekLecteur.IMAGE_LECTEUR) — elle prend la place du SVG partout.

   @param {Element} scene
   @param {object} options : langue, imageLecteur, dureeInstallation (ms)
   @param {object} callbacks : onAnnule() (l'élève a dit « non »), onPret()
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_INSTALLE = 'kebbek_lecteur_installe';

  const DICO = {
    fr: {
      commentaire: 'C\u2019est quoi, \u00e7a\u00a0? Un fichier\u00a0?',
      erreurTitre: 'Fichier illisible',
      erreurTexte: 'Ce fichier ne peut pas \u00eatre ouvert sur cet appareil. Voulez-vous t\u00e9l\u00e9charger une extension capable de le lire et de le r\u00e9parer\u00a0?',
      oui: 'Oui', non: 'Non',
      nomLecteur: 'Le Lecteur',
      installation: 'T\u00e9l\u00e9chargement de \u00ab\u00a0Le Lecteur\u00a0\u00bb\u2026',
      termine: 'T\u00e9l\u00e9chargement termin\u00e9',
      ouvrir: 'Ouvrir',
      lecteur1: 'Salut\u00a0! Je suis Le Lecteur. Je peux ouvrir ce souvenir\u2026 et t\u2019aider \u00e0 le comprendre.',
      plonger: 'Plonger'
    },
    en: {
      commentaire: 'What\u2019s that? A file?',
      erreurTitre: 'Unreadable file',
      erreurTexte: 'This file can\u2019t be opened on this device. Would you like to download an extension that can read and repair it?',
      oui: 'Yes', non: 'No',
      nomLecteur: 'The Reader',
      installation: 'Downloading \u201cThe Reader\u201d\u2026',
      termine: 'Download complete',
      ouvrir: 'Open',
      lecteur1: 'Hi! I\u2019m The Reader. I can open this memory\u2026 and help you understand it.',
      plonger: 'Dive in'
    },
    es: {
      commentaire: '\u00bfQu\u00e9 es eso? \u00bfUn archivo?',
      erreurTitre: 'Archivo ilegible',
      erreurTexte: 'Este archivo no se puede abrir en este dispositivo. \u00bfQuieres descargar una extensi\u00f3n capaz de leerlo y repararlo?',
      oui: 'S\u00ed', non: 'No',
      nomLecteur: 'El Lector',
      installation: 'Descargando \u00abEl Lector\u00bb\u2026',
      termine: 'Descarga completada',
      ouvrir: 'Abrir',
      lecteur1: '\u00a1Hola! Soy El Lector. Puedo abrir este recuerdo\u2026 y ayudarte a entenderlo.',
      plonger: 'Sumergirse'
    },
    it: {
      commentaire: 'Che cos\u2019\u00e8? Un file?',
      erreurTitre: 'File illeggibile',
      erreurTexte: 'Questo file non pu\u00f2 essere aperto su questo dispositivo. Vuoi scaricare un\u2019estensione in grado di leggerlo e ripararlo?',
      oui: 'S\u00ec', non: 'No',
      nomLecteur: 'Il Lettore',
      installation: 'Download di \u00abIl Lettore\u00bb in corso\u2026',
      termine: 'Download completato',
      ouvrir: 'Apri',
      lecteur1: 'Ciao! Sono Il Lettore. Posso aprire questo ricordo\u2026 e aiutarti a capirlo.',
      plonger: 'Immergiti'
    },
    pt: {
      commentaire: 'O que \u00e9 isso? Um arquivo?',
      erreurTitre: 'Arquivo ileg\u00edvel',
      erreurTexte: 'Este arquivo n\u00e3o pode ser aberto neste dispositivo. Quer baixar uma extens\u00e3o capaz de l\u00ea-lo e repar\u00e1-lo?',
      oui: 'Sim', non: 'N\u00e3o',
      nomLecteur: 'O Leitor',
      installation: 'Baixando \u00abO Leitor\u00bb\u2026',
      termine: 'Download conclu\u00eddo',
      ouvrir: 'Abrir',
      lecteur1: 'Oi! Eu sou O Leitor. Posso abrir esta lembran\u00e7a\u2026 e ajudar voc\u00ea a entend\u00ea-la.',
      plonger: 'Mergulhar'
    },
    ca: {
      commentaire: 'Qu\u00e8 \u00e9s aix\u00f2? Un fitxer?',
      erreurTitre: 'Fitxer il\u00b7legible',
      erreurTexte: 'Aquest fitxer no es pot obrir en aquest dispositiu. Vols baixar una extensi\u00f3 capa\u00e7 de llegir-lo i reparar-lo?',
      oui: 'S\u00ed', non: 'No',
      nomLecteur: 'El Lector',
      installation: 'S\u2019est\u00e0 baixant \u00abEl Lector\u00bb\u2026',
      termine: 'Baixada completada',
      ouvrir: 'Obre',
      lecteur1: 'Hola! S\u00f3c El Lector. Puc obrir aquest record\u2026 i ajudar-te a entendre\u2019l.',
      plonger: 'Submergeix-te'
    },
    eo: {
      commentaire: 'Kio tio estas? Dosiero?',
      erreurTitre: 'Nelegebla dosiero',
      erreurTexte: '\u0108i tiun dosieron ne eblas malfermi en \u0109i tiu aparato. \u0108u vi volas el\u015duti etenda\u0135on, kiu kapablas legi kaj ripari \u011din?',
      oui: 'Jes', non: 'Ne',
      nomLecteur: 'La Legilo',
      installation: 'El\u015dutado de \u00abLa Legilo\u00bb\u2026',
      termine: 'El\u015duto fini\u011dis',
      ouvrir: 'Malfermi',
      lecteur1: 'Saluton! Mi estas La Legilo. Mi povas malfermi \u0109i tiun memora\u0135on\u2026 kaj helpi vin kompreni \u011din.',
      plonger: 'Plon\u011di'
    },
    zh: {
      commentaire: '\u8fd9\u662f\u4ec0\u4e48\uff1f\u662f\u4e00\u4e2a\u6587\u4ef6\u5417\uff1f',
      erreurTitre: '\u6587\u4ef6\u65e0\u6cd5\u8bfb\u53d6',
      erreurTexte: '\u6b64\u8bbe\u5907\u65e0\u6cd5\u6253\u5f00\u8be5\u6587\u4ef6\u3002\u662f\u5426\u4e0b\u8f7d\u4e00\u4e2a\u80fd\u591f\u8bfb\u53d6\u5e76\u4fee\u590d\u5b83\u7684\u6269\u5c55\u7a0b\u5e8f\uff1f',
      oui: '\u662f', non: '\u5426',
      nomLecteur: '\u9605\u8bfb\u5668',
      installation: '\u6b63\u5728\u4e0b\u8f7d\u201c\u9605\u8bfb\u5668\u201d\u2026',
      termine: '\u4e0b\u8f7d\u5b8c\u6210',
      ouvrir: '\u6253\u5f00',
      lecteur1: '\u4f60\u597d\uff01\u6211\u662f\u9605\u8bfb\u5668\u3002\u6211\u53ef\u4ee5\u6253\u5f00\u8fd9\u6bb5\u8bb0\u5fc6\u2026\u2026\u5e76\u5e2e\u4f60\u7406\u89e3\u5b83\u3002',
      plonger: '\u6f5c\u5165'
    },
    ja: {
      commentaire: '\u3053\u308c\u3001\u306a\u306b\uff1f\u30d5\u30a1\u30a4\u30eb\uff1f',
      erreurTitre: '\u8aad\u307f\u8fbc\u3081\u306a\u3044\u30d5\u30a1\u30a4\u30eb',
      erreurTexte: '\u3053\u306e\u30d5\u30a1\u30a4\u30eb\u306f\u3053\u306e\u30c7\u30d0\u30a4\u30b9\u3067\u306f\u958b\u3051\u307e\u305b\u3093\u3002\u8aad\u307f\u53d6\u308a\u3068\u4fee\u5fa9\u304c\u3067\u304d\u308b\u62e1\u5f35\u6a5f\u80fd\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059\u304b\uff1f',
      oui: '\u306f\u3044', non: '\u3044\u3044\u3048',
      nomLecteur: '\u30ea\u30fc\u30c0\u30fc',
      installation: '\u300c\u30ea\u30fc\u30c0\u30fc\u300d\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u4e2d\u2026',
      termine: '\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u5b8c\u4e86',
      ouvrir: '\u958b\u304f',
      lecteur1: '\u3053\u3093\u306b\u3061\u306f\uff01\u308f\u305f\u3057\u306f\u300c\u30ea\u30fc\u30c0\u30fc\u300d\u3067\u3059\u3002\u3053\u306e\u8a18\u61b6\u3092\u958b\u3044\u3066\u3001\u7406\u89e3\u3059\u308b\u304a\u624b\u4f1d\u3044\u3082\u3067\u304d\u307e\u3059\u3088\u3002',
      plonger: '\u98db\u3073\u8fbc\u3080'
    },
    ko: {
      commentaire: '\uc774\uac8c \ubb50\uc9c0? \ud30c\uc77c\uc778\uac00?',
      erreurTitre: '\uc77d\uc744 \uc218 \uc5c6\ub294 \ud30c\uc77c',
      erreurTexte: '\uc774 \uae30\uae30\uc5d0\uc11c\ub294 \uc774 \ud30c\uc77c\uc744 \uc5f4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ud30c\uc77c\uc744 \uc77d\uace0 \ubcf5\uad6c\ud560 \uc218 \uc788\ub294 \ud655\uc7a5 \ud504\ub85c\uadf8\ub7a8\uc744 \ub2e4\uc6b4\ub85c\ub4dc\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?',
      oui: '\uc608', non: '\uc544\ub2c8\uc694',
      nomLecteur: '\ub9ac\ub354',
      installation: '\u201c\ub9ac\ub354\u201d \ub2e4\uc6b4\ub85c\ub4dc \uc911\u2026',
      termine: '\ub2e4\uc6b4\ub85c\ub4dc \uc644\ub8cc',
      ouvrir: '\uc5f4\uae30',
      lecteur1: '\uc548\ub155\ud558\uc138\uc694! \uc800\ub294 \ub9ac\ub354\uc608\uc694. \uc774 \uae30\uc5b5\uc744 \uc5f4\uc5b4 \ub4dc\ub9b4 \uc218 \uc788\uace0\u2026 \uc774\ud574\ud558\ub294 \uac83\ub3c4 \ub3c4\uc640\ub4dc\ub9b4\uac8c\uc694.',
      plonger: '\ub6f0\uc5b4\ub4e4\uae30'
    },
    vi: {
      commentaire: 'C\u00e1i g\u00ec v\u1eady? M\u1ed9t t\u1ec7p \u00e0?',
      erreurTitre: 'T\u1ec7p kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c',
      erreurTexte: 'Kh\u00f4ng th\u1ec3 m\u1edf t\u1ec7p n\u00e0y tr\u00ean thi\u1ebft b\u1ecb n\u00e0y. B\u1ea1n c\u00f3 mu\u1ed1n t\u1ea3i xu\u1ed1ng m\u1ed9t ti\u1ec7n \u00edch m\u1edf r\u1ed9ng c\u00f3 th\u1ec3 \u0111\u1ecdc v\u00e0 s\u1eeda n\u00f3 kh\u00f4ng?',
      oui: 'C\u00f3', non: 'Kh\u00f4ng',
      nomLecteur: 'Tr\u00ecnh \u0111\u1ecdc',
      installation: '\u0110ang t\u1ea3i xu\u1ed1ng \u201cTr\u00ecnh \u0111\u1ecdc\u201d\u2026',
      termine: 'T\u1ea3i xu\u1ed1ng ho\u00e0n t\u1ea5t',
      ouvrir: 'M\u1edf',
      lecteur1: 'Ch\u00e0o b\u1ea1n! M\u00ecnh l\u00e0 Tr\u00ecnh \u0111\u1ecdc. M\u00ecnh c\u00f3 th\u1ec3 m\u1edf k\u00fd \u1ee9c n\u00e0y\u2026 v\u00e0 gi\u00fap b\u1ea1n hi\u1ec3u n\u00f3.',
      plonger: 'L\u1eb7n v\u00e0o'
    },
    ht: {
      commentaire: 'Kisa sa ye? Yon fichye?',
      erreurTitre: 'Fichye ki pa ka li',
      erreurTexte: 'Yo pa ka louvri fichye sa a sou apar\u00e8y sa a. \u00c8ske ou vle telechaje yon ekstansyon ki kapab li l epi repare l?',
      oui: 'Wi', non: 'Non',
      nomLecteur: 'Lekt\u00e8 a',
      installation: 'Ap telechaje \u00ab Lekt\u00e8 a \u00bb\u2026',
      termine: 'Telechajman fini',
      ouvrir: 'Louvri',
      lecteur1: 'Bonjou! Mwen se Lekt\u00e8 a. Mwen ka louvri souvni sa a\u2026 epi ede w konprann li.',
      plonger: 'Plonje'
    },
    tl: {
      commentaire: 'Ano \u2019yon? Isang file?',
      erreurTitre: 'Hindi mabasang file',
      erreurTexte: 'Hindi mabuksan ang file na ito sa device na ito. Gusto mo bang mag-download ng extension na kayang bumasa at mag-ayos nito?',
      oui: 'Oo', non: 'Hindi',
      nomLecteur: 'Ang Tagabasa',
      installation: 'Dina-download ang \u201cTagabasa\u201d\u2026',
      termine: 'Tapos na ang pag-download',
      ouvrir: 'Buksan',
      lecteur1: 'Hi! Ako ang Tagabasa. Mabubuksan ko ang alaalang ito\u2026 at matutulungan kitang maintindihan ito.',
      plonger: 'Sumisid'
    },
    id: {
      commentaire: 'Apa itu? Sebuah berkas?',
      erreurTitre: 'Berkas tidak terbaca',
      erreurTexte: 'Berkas ini tidak dapat dibuka di perangkat ini. Apakah Anda ingin mengunduh ekstensi yang mampu membaca dan memperbaikinya?',
      oui: 'Ya', non: 'Tidak',
      nomLecteur: 'Si Pembaca',
      installation: 'Mengunduh \u201cSi Pembaca\u201d\u2026',
      termine: 'Unduhan selesai',
      ouvrir: 'Buka',
      lecteur1: 'Hai! Aku Si Pembaca. Aku bisa membuka kenangan ini\u2026 dan membantumu memahaminya.',
      plonger: 'Menyelam'
    },
    nl: {
      commentaire: 'Wat is dat? Een bestand?',
      erreurTitre: 'Onleesbaar bestand',
      erreurTexte: 'Dit bestand kan niet worden geopend op dit apparaat. Wil je een extensie downloaden die het kan lezen en herstellen?',
      oui: 'Ja', non: 'Nee',
      nomLecteur: 'De Lezer',
      installation: 'Bezig met downloaden van \u201cDe Lezer\u201d\u2026',
      termine: 'Download voltooid',
      ouvrir: 'Openen',
      lecteur1: 'Hoi! Ik ben De Lezer. Ik kan deze herinnering openen\u2026 en je helpen begrijpen wat erin zit.',
      plonger: 'Duiken'
    },
    de: {
      commentaire: 'Was ist das? Eine Datei?',
      erreurTitre: 'Datei nicht lesbar',
      erreurTexte: 'Diese Datei kann auf diesem Ger\u00e4t nicht ge\u00f6ffnet werden. M\u00f6chtest du eine Erweiterung herunterladen, die sie lesen und reparieren kann?',
      oui: 'Ja', non: 'Nein',
      nomLecteur: 'Der Leser',
      installation: '\u201eDer Leser\u201c wird heruntergeladen\u2026',
      termine: 'Download abgeschlossen',
      ouvrir: '\u00d6ffnen',
      lecteur1: 'Hallo! Ich bin Der Leser. Ich kann diese Erinnerung \u00f6ffnen\u2026 und dir helfen, sie zu verstehen.',
      plonger: 'Eintauchen'
    },
    fa: {
      commentaire: '\u0627\u06cc\u0646 \u0686\u06cc\u0647\u061f \u06cc\u06a9 \u0641\u0627\u06cc\u0644\u061f',
      erreurTitre: '\u0641\u0627\u06cc\u0644 \u0646\u0627\u062e\u0648\u0627\u0646\u0627',
      erreurTexte: '\u0627\u06cc\u0646 \u0641\u0627\u06cc\u0644 \u0631\u0648\u06cc \u0627\u06cc\u0646 \u062f\u0633\u062a\u06af\u0627\u0647 \u0628\u0627\u0632 \u0646\u0645\u06cc\u200c\u0634\u0648\u062f. \u0645\u06cc\u200c\u062e\u0648\u0627\u0647\u06cc\u062f \u0627\u0641\u0632\u0648\u0646\u0647\u200c\u0627\u06cc \u062f\u0627\u0646\u0644\u0648\u062f \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u0628\u062a\u0648\u0627\u0646\u062f \u0622\u0646 \u0631\u0627 \u0628\u062e\u0648\u0627\u0646\u062f \u0648 \u062a\u0639\u0645\u06cc\u0631 \u06a9\u0646\u062f\u061f',
      oui: '\u0628\u0644\u0647', non: '\u062e\u06cc\u0631',
      nomLecteur: '\u062e\u0648\u0627\u0646\u0646\u062f\u0647',
      installation: '\u062f\u0631 \u062d\u0627\u0644 \u062f\u0627\u0646\u0644\u0648\u062f \u00ab\u062e\u0648\u0627\u0646\u0646\u062f\u0647\u00bb\u2026',
      termine: '\u062f\u0627\u0646\u0644\u0648\u062f \u06a9\u0627\u0645\u0644 \u0634\u062f',
      ouvrir: '\u0628\u0627\u0632 \u06a9\u0631\u062f\u0646',
      lecteur1: '\u0633\u0644\u0627\u0645! \u0645\u0646 \u062e\u0648\u0627\u0646\u0646\u062f\u0647\u200c\u0627\u0645. \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u0645 \u0627\u06cc\u0646 \u062e\u0627\u0637\u0631\u0647 \u0631\u0627 \u0628\u0627\u0632 \u06a9\u0646\u0645\u2026 \u0648 \u06a9\u0645\u06a9\u062a \u06a9\u0646\u0645 \u0622\u0646 \u0631\u0627 \u0628\u0641\u0647\u0645\u06cc.',
      plonger: '\u0634\u06cc\u0631\u062c\u0647'
    },
    sv: {
      commentaire: 'Vad \u00e4r det h\u00e4r? En fil?',
      erreurTitre: 'Ol\u00e4sbar fil',
      erreurTexte: 'Den h\u00e4r filen kan inte \u00f6ppnas p\u00e5 den h\u00e4r enheten. Vill du ladda ner ett till\u00e4gg som kan l\u00e4sa och reparera den?',
      oui: 'Ja', non: 'Nej',
      nomLecteur: 'L\u00e4saren',
      installation: 'Laddar ner \u201dL\u00e4saren\u201d\u2026',
      termine: 'Nedladdningen \u00e4r klar',
      ouvrir: '\u00d6ppna',
      lecteur1: 'Hej! Jag \u00e4r L\u00e4saren. Jag kan \u00f6ppna det h\u00e4r minnet\u2026 och hj\u00e4lpa dig att f\u00f6rst\u00e5 det.',
      plonger: 'Dyk in'
    },
    no: {
      commentaire: 'Hva er dette? En fil?',
      erreurTitre: 'Uleselig fil',
      erreurTexte: 'Denne filen kan ikke \u00e5pnes p\u00e5 denne enheten. Vil du laste ned en utvidelse som kan lese og reparere den?',
      oui: 'Ja', non: 'Nei',
      nomLecteur: 'Leseren',
      installation: 'Laster ned \u00abLeseren\u00bb\u2026',
      termine: 'Nedlastingen er fullf\u00f8rt',
      ouvrir: '\u00c5pne',
      lecteur1: 'Hei! Jeg er Leseren. Jeg kan \u00e5pne dette minnet\u2026 og hjelpe deg med \u00e5 forst\u00e5 det.',
      plonger: 'Dykk inn'
    },
    ru: {
      commentaire: '\u0427\u0442\u043e \u044d\u0442\u043e? \u0424\u0430\u0439\u043b?',
      erreurTitre: '\u0424\u0430\u0439\u043b \u043d\u0435 \u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044f',
      erreurTexte: '\u042d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043d\u0430 \u044d\u0442\u043e\u043c \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435. \u0425\u043e\u0442\u0438\u0442\u0435 \u0441\u043a\u0430\u0447\u0430\u0442\u044c \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u0438\u0435, \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u0441\u043c\u043e\u0436\u0435\u0442 \u0435\u0433\u043e \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u0442\u044c \u0438 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c?',
      oui: '\u0414\u0430', non: '\u041d\u0435\u0442',
      nomLecteur: '\u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044c',
      installation: '\u0421\u043a\u0430\u0447\u0438\u0432\u0430\u043d\u0438\u0435 \u00ab\u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044f\u00bb\u2026',
      termine: '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430',
      ouvrir: '\u041e\u0442\u043a\u0440\u044b\u0442\u044c',
      lecteur1: '\u041f\u0440\u0438\u0432\u0435\u0442! \u042f \u0427\u0438\u0442\u0430\u0442\u0435\u043b\u044c. \u042f \u043c\u043e\u0433\u0443 \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u044d\u0442\u043e \u0432\u043e\u0441\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u0435\u2026 \u0438 \u043f\u043e\u043c\u043e\u0447\u044c \u0442\u0435\u0431\u0435 \u0435\u0433\u043e \u043f\u043e\u043d\u044f\u0442\u044c.',
      plonger: '\u041f\u043e\u0433\u0440\u0443\u0437\u0438\u0442\u044c\u0441\u044f'
    }
  };

  const LANGUES_POLICE_SYSTEME = ['ru', 'vi'];
  const LANGUES_DROITE_A_GAUCHE = ['fa'];

  // Progression de l'installation : [temps relatif 0-1, avancement 0-1]. Un
  // petit palier vers 60 % rend la barre crédible (comme un vrai téléchargement).
  const COURBE = [[0, 0], [0.22, 0.30], [0.48, 0.44], [0.60, 0.47], [0.84, 0.92], [1, 1]];

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function traduire(langue, cle) {
    return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // ---------- Icône provisoire du Lecteur ----------
  // Petite créature-loupe : corps rond pêche, deux « pages » en guise d'ailes,
  // deux yeux, un sourire, un reflet. Même palette que le reste du site.
  function svgLecteur(classe) {
    return '<svg class="' + classe + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
      '<g stroke="#4A3B33" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' +
        '<g class="lect-aile lect-aile-g"><rect x="2" y="34" width="34" height="46" rx="10" fill="#FFFFFF" transform="rotate(-18 19 57)"/></g>' +
        '<g class="lect-aile lect-aile-d"><rect x="84" y="34" width="34" height="46" rx="10" fill="#FFFFFF" transform="rotate(18 101 57)"/></g>' +
        '<circle cx="60" cy="62" r="38" fill="#F0A98B"/>' +
        '<circle cx="60" cy="62" r="28" fill="#FFF0E4" stroke-width="3"/>' +
      '</g>' +
      '<circle cx="50" cy="58" r="4.2" fill="#4A3B33"/>' +
      '<circle cx="70" cy="58" r="4.2" fill="#4A3B33"/>' +
      '<path d="M51 70q9 8 18 0" fill="none" stroke="#4A3B33" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M40 48q6-10 18-11" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".9"/>' +
      '</svg>';
  }
  function htmlIcone(options, classe) {
    const url = (options && options.imageLecteur) || (window.KebBekLecteur && window.KebBekLecteur.IMAGE_LECTEUR);
    if (url) return '<img class="' + classe + '" src="' + echapper(url) + '" alt="" draggable="false">';
    return svgLecteur(classe);
  }

  function appliquerLangue(el, langue) {
    if (LANGUES_POLICE_SYSTEME.indexOf(langue) !== -1) el.classList.add('lect-police-systeme');
    if (LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1) el.setAttribute('dir', 'rtl');
  }

  // ================= 1. Le commentaire de l'élève =================
  let commentaireCourant = null;

  function afficherCommentaire(scene, options) {
    retirerCommentaire();
    const langue = langueActuelle(options);
    const p = document.createElement('p');
    p.className = 'lect-pensee';
    p.textContent = traduire(langue, 'commentaire');
    appliquerLangue(p, langue);
    scene.appendChild(p);
    const id = setTimeout(function () { p.classList.add('lect-pensee-visible'); }, (options && options.delai) || 900);
    commentaireCourant = { el: p, id: id };
    return { retirer: retirerCommentaire };
  }
  function retirerCommentaire() {
    if (!commentaireCourant) return;
    clearTimeout(commentaireCourant.id);
    const el = commentaireCourant.el;
    commentaireCourant = null;
    el.classList.remove('lect-pensee-visible');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  // ================= 2. La séquence =================
  function demarrer(scene, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const langue = langueActuelle(options);
    const T = function (cle) { return traduire(langue, cle); };
    const duree = typeof options.dureeInstallation === 'number' ? options.dureeInstallation : 3600;
    const minuteurs = [];
    let vivante = true;
    let image = null;

    function planifier(fn, ms) {
      const id = setTimeout(function () { if (vivante && document.body.contains(scene)) fn(); }, ms);
      minuteurs.push(id);
      return id;
    }
    function nettoyer() {
      vivante = false;
      minuteurs.forEach(clearTimeout);
    }

    retirerCommentaire();

    const voile = document.createElement('div');
    voile.className = 'lect-voile';
    appliquerLangue(voile, langue);
    scene.appendChild(voile);
    planifier(function () { voile.classList.add('lect-voile-visible'); }, 20);

    function retirerVoile() {
      voile.classList.remove('lect-voile-visible');
      setTimeout(function () { if (voile.parentNode) voile.parentNode.removeChild(voile); }, 350);
    }

    // ---------- a. Fenêtre « fichier illisible » ----------
    function fenetreErreur() {
      const carte = document.createElement('div');
      carte.className = 'lect-carte';
      carte.setAttribute('role', 'alertdialog');
      carte.setAttribute('aria-labelledby', 'lectTitre');
      carte.setAttribute('aria-describedby', 'lectTexte');
      carte.innerHTML =
        '<div class="lect-entete"><span class="lect-alerte" aria-hidden="true">!</span>' +
          '<h2 class="lect-titre" id="lectTitre">' + echapper(T('erreurTitre')) + '</h2></div>' +
        '<div class="lect-fichier" dir="ltr">identite-fr.mem</div>' +
        '<p class="lect-texte" id="lectTexte">' + echapper(T('erreurTexte')) + '</p>' +
        '<div class="lect-boutons">' +
          '<button type="button" class="lect-btn lect-btn-clair" id="lectNon">' + echapper(T('non')) + '</button>' +
          '<button type="button" class="lect-btn" id="lectOui">' + echapper(T('oui')) + '</button>' +
        '</div>';
      voile.appendChild(carte);
      planifier(function () { carte.classList.add('lect-carte-visible'); }, 60);
      planifier(function () { const o = carte.querySelector('#lectOui'); if (o) o.focus(); }, 400);

      carte.querySelector('#lectNon').addEventListener('click', function () {
        // « Non » : la fenêtre se ferme, la bulle .mem reste cliquable
        carte.classList.remove('lect-carte-visible');
        retirerVoile();
        nettoyer();
        if (typeof callbacks.onAnnule === 'function') {
          try { callbacks.onAnnule(); } catch (e) { console.warn('onAnnule a échoué.', e); }
        }
      });
      carte.querySelector('#lectOui').addEventListener('click', function () {
        carte.classList.remove('lect-carte-visible');
        planifier(function () { carte.remove(); installation(); }, 260);
      });
    }

    // ---------- b + c. Installation puis « terminé » ----------
    function installation() {
      const carte = document.createElement('div');
      carte.className = 'lect-carte lect-carte-install';
      carte.setAttribute('role', 'dialog');
      carte.setAttribute('aria-live', 'polite');
      carte.innerHTML =
        '<div class="lect-icone-install" style="--p:0">' +
          '<span class="lect-icone-fond">' + htmlIcone(options, 'lect-icone-img') + '</span>' +
          '<span class="lect-icone-plein">' + htmlIcone(options, 'lect-icone-img') + '</span>' +
        '</div>' +
        '<h2 class="lect-titre lect-titre-install" id="lectTitreInstall">' + echapper(T('installation')) + '</h2>' +
        '<div class="lect-barre" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="lect-barre-remplie"></span></div>' +
        '<div class="lect-pourcent" dir="ltr">0 %</div>' +
        '<div class="lect-boutons lect-boutons-seul"><button type="button" class="lect-btn lect-cache" id="lectOuvrir">' + echapper(T('ouvrir')) + '</button></div>';
      voile.appendChild(carte);
      planifier(function () { carte.classList.add('lect-carte-visible'); }, 40);

      const icone = carte.querySelector('.lect-icone-install');
      const barre = carte.querySelector('.lect-barre');
      const remplie = carte.querySelector('.lect-barre-remplie');
      const pourcent = carte.querySelector('.lect-pourcent');
      const titre = carte.querySelector('.lect-titre-install');
      const bouton = carte.querySelector('#lectOuvrir');

      function avancement(t) {
        for (let i = 1; i < COURBE.length; i++) {
          if (t <= COURBE[i][0]) {
            const a = COURBE[i - 1], b = COURBE[i];
            return a[1] + (b[1] - a[1]) * ((t - a[0]) / (b[0] - a[0]));
          }
        }
        return 1;
      }

      const debut = performance.now() + 450; // petite attente avant de démarrer
      function image2() {
        if (!vivante) return;
        const t = Math.max(0, Math.min(1, (performance.now() - debut) / duree));
        const p = avancement(t);
        const pct = Math.round(p * 100);
        icone.style.setProperty('--p', String(p));
        remplie.style.transform = 'scaleX(' + p + ')';
        pourcent.textContent = pct + ' %';
        barre.setAttribute('aria-valuenow', String(pct));
        if (t < 1) { image = requestAnimationFrame(image2); return; }
        fini();
      }
      image = requestAnimationFrame(image2);

      function fini() {
        carte.classList.add('lect-carte-termine');
        titre.textContent = T('termine');
        planifier(function () {
          bouton.classList.remove('lect-cache');
          bouton.focus();
        }, 500);
      }

      bouton.addEventListener('click', function () {
        bouton.disabled = true;
        carte.classList.remove('lect-carte-visible');
        planifier(function () { carte.remove(); apparitionLecteur(); }, 280);
      });
    }

    // ---------- d. Le Lecteur apparaît ----------
    function apparitionLecteur() {
      voile.classList.add('lect-voile-leger'); // plus de fond assombri
      const zone = document.createElement('div');
      zone.className = 'lect-lecteur-zone';
      zone.innerHTML =
        '<div class="lect-lecteur-bulle" role="status">' +
          '<p class="lect-lecteur-texte">' + echapper(T('lecteur1')) + '</p>' +
          '<button type="button" class="lect-btn" id="lectPlonger">' + echapper(T('plonger')) + '</button>' +
        '</div>' +
        '<div class="lect-lecteur" aria-label="' + echapper(T('nomLecteur')) + '">' + htmlIcone(options, 'lect-lecteur-img') + '</div>';
      voile.appendChild(zone);
      planifier(function () { zone.classList.add('lect-lecteur-visible'); }, 40);
      planifier(function () { const b = zone.querySelector('#lectPlonger'); if (b) b.focus(); }, 700);

      zone.querySelector('#lectPlonger').addEventListener('click', function () {
        zone.querySelector('#lectPlonger').disabled = true;
        try { localStorage.setItem(CLE_INSTALLE, '1'); } catch (e) {}
        retirerVoile();
        nettoyer();
        if (typeof callbacks.onPret === 'function') {
          try { callbacks.onPret(); } catch (e) { console.warn('onPret a échoué.', e); }
        }
      });
    }

    fenetreErreur();

    return {
      arreter: function () {
        nettoyer();
        if (image) cancelAnimationFrame(image);
        if (voile.parentNode) voile.parentNode.removeChild(voile);
      }
    };
  }

  function estInstalle() {
    try { return localStorage.getItem(CLE_INSTALLE) === '1'; } catch (e) { return false; }
  }

  window.KebBekLecteur = {
    afficherCommentaire: afficherCommentaire,
    retirerCommentaire: retirerCommentaire,
    demarrer: demarrer,
    estInstalle: estInstalle,
    htmlIcone: htmlIcone,   // réutilisé par sequence-memoire.js (le Lecteur reste présent dans la leçon)
    IMAGE_LECTEUR: null
  };
})();
