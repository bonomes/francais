/* ==================================================================
   sequence-m1.js — la PREMIÈRE MÉMOIRE du parcours (02-11-2026).

   Ce que Bek « se rappelle » : elle mange un sandwich, puis une poutine.
   Ce que l'élève apprend (dans cet ordre de priorité) :
     1. l'ordre de la phrase : sujet – verbe – objet ;
     2. les noms ont un genre : un sandwich / une poutine ;
     3. un 2e verbe en -er (« je parle » → « je mange » : -e après « je »).

   Déroulé (une mémoire = 6 étapes, voir plan dans la fiche kebbek-memoire-1) :
     1. « Je mange. » — on touche les mots (voix + sens) ; remarque sur le -e.
     2. « Je mange un sandwich » en 3 passages :
          lecture (mots cliquables) → ordre (le souvenir « s'efface » : on
          replace les mots) → écriture (quelques mots à compléter).
     3. « Je mange une poutine » : mêmes 3 passages, mais on écrit TOUTE la phrase.
     4. Image : Bek mange un sandwich — « Tu es Bek. Que fais-tu maintenant ? »
     5. Image : Bek mange une poutine — même question (réponse écrite, sans aide).
     6. Exercice audio : on entend la phrase, on choisit les bonnes cases.
   Après chaque notion, une petite carte « Savais-tu ? » (culture).

   Le Lecteur commente : indices, remarques sarcastiques, piques.
   Bek réagit avec subtilité : à la poutine, son enthousiasme est très bas
   (un indice pour plus tard — le système Bravo ; rien n'est expliqué ici).

   VOIX : audio/fr/<id>.mp3 s'il existe (enregistrements de Raphaël, à venir),
   sinon la synthèse vocale du navigateur. Ids : les mots (je, mange, un, une,
   sandwich, poutine, parle, francais) et les phrases (m1-je-mange,
   m1-je-mange-un-sandwich, m1-je-mange-une-poutine, m1-je-parle-francais).

   IMAGES manquantes (à produire) : images/m1/bek_mange-sandwich_01-01.webp et
   images/m1/bek_mange-poutine_01-01.webp. Tant qu'elles n'existent pas, Bek
   garde une pose existante et une vignette dessinée (SVG) montre l'aliment.

   Dépend de : sequence-reveil-bek.css (.rbek-scene, .rbek-bek, .rbek-pose),
   sequence-lecteur.css/.js (bulle et icône du Lecteur), sequence-m1.css.
   Facultatif : window.KebBekMots (mots.js) — les mots appris y sont ajoutés.

   @param {string} idConteneur
   @param {object} options   : langue ; dossierAudio ('audio/fr/') ; voixLangue ('fr-CA') ;
                               imageLecteur ; sources { pose: url }
   @param {object} callbacks : onTermine({ mots, fragments }) ; onQuitter()
   Principe du projet : le module ne navigue jamais lui-même.
   🆕 Textes : les 20 langues du projet (fr, en, es, it, pt, ca, eo, zh, ja, ko, vi, ht, tl, id,
   nl, de, fa, sv, no, ru). Tutoiement ; « poutine » reste en lettres latines en ko, ru et fa
   (sa transcription locale se lit comme le nom du président russe). À faire relire par des
   locuteurs natifs, surtout les piques du Lecteur (quip*).
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const MOTS_APPRIS = ['mange', 'un', 'une', 'sandwich', 'poutine'];
  const ETAPES_TOTAL = 6;

  // Poses : toutes bouche fermée (Bek réagit, elle ne parle pas).
  const SOURCES_PAR_DEFAUT = {
    'bek-observe':        'images/reveil/bek_observe_01-01.webp',
    'bek-examine':        'images/reveil/bek-examine_bouche-fermee_01-01.webp',
    'bek-concentree':     'images/reveil/bek_concentree_bouche-fermee_01-01.webp',
    'bek-conscience':     'images/reveil/bek-prise-de-conscience_bouche-fermee_01-01.webp',
    'bek-heureuse-ferme': 'images/reveil/bek_heureuse_bouche-fermee_01-01.webp',
    // 🎨 à produire : Bek qui mange (le sourire est franc) ; Bek qui mange sa poutine
    // (enthousiasme très bas : poli, un peu éteint — pas une grimace)
    'bek-mange-sandwich': 'images/m1/bek_mange-sandwich_01-01.webp',
    'bek-mange-poutine':  'images/m1/bek_mange-poutine_01-01.webp',
    // 🎨 facultatives : variante « bouche ouverte » (elle dit la phrase) et images de l'animation « elle mange »
    'bek-sandwich-ouverte':   'images/m1/bek_mange-sandwich_bouche-ouverte_01-01.webp',
    'bek-sandwich-bouchee':   'images/m1/bek_mange-sandwich_bouchee_01-01.webp',
    'bek-sandwich-mastique-a':'images/m1/bek_mange-sandwich_mastique-a_01-01.webp',
    'bek-sandwich-mastique-b':'images/m1/bek_mange-sandwich_mastique-b_01-01.webp',
    'bek-poutine-ouverte':    'images/m1/bek_mange-poutine_bouche-ouverte_01-01.webp',
    'bek-poutine-bouchee':    'images/m1/bek_mange-poutine_bouchee_01-01.webp',
    'bek-poutine-mastique-a': 'images/m1/bek_mange-poutine_mastique-a_01-01.webp',
    'bek-poutine-mastique-b': 'images/m1/bek_mange-poutine_mastique-b_01-01.webp'
  };
  // Boucle « elle mange » : base → bouchée → mastication A/B (× tours) → base, pause, on recommence.
  // Elle ne se joue que si TOUTES les images de la boucle existent (sinon : la pose fixe, comme avant).
  const MANGER = {
    sandwich: { base: 'bek-mange-sandwich', ouverte: 'bek-sandwich-ouverte', bouchee: 'bek-sandwich-bouchee',
                mastique: ['bek-sandwich-mastique-a', 'bek-sandwich-mastique-b'], msBouchee: 450, msMastique: 260, tours: 4, pause: 1600 },
    poutine:  { base: 'bek-mange-poutine',  ouverte: 'bek-poutine-ouverte',  bouchee: 'bek-poutine-bouchee',
                mastique: ['bek-poutine-mastique-a', 'bek-poutine-mastique-b'],   msBouchee: 650, msMastique: 480, tours: 2, pause: 2400 }
  };
  const POSE_DE_REPLI = { 'bek-mange-sandwich': 'bek-heureuse-ferme', 'bek-mange-poutine': 'bek-observe' };
  const VIGNETTE_DE = { 'bek-mange-sandwich': 'sandwich', 'bek-mange-poutine': 'poutine' };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);

  const AFFICHE = { je: 'je', mange: 'mange', parle: 'parle', un: 'un', une: 'une', sandwich: 'sandwich', poutine: 'poutine', francais: 'français' };
  const ROLE = { je: 's', mange: 'v', parle: 'v', un: 'o', une: 'o', sandwich: 'o', poutine: 'o', francais: 'o' };
  const GENRE = { sandwich: 'genre_m', poutine: 'genre_f' };

  const PHRASES = {
    mange:    { mots: ['je', 'mange'],                  texte: 'Je mange.',               audio: 'm1-je-mange',             tr: 'tr_mange' },
    sandwich: { mots: ['je', 'mange', 'un', 'sandwich'], texte: 'Je mange un sandwich.',   audio: 'm1-je-mange-un-sandwich', tr: 'tr_sandwich' },
    poutine:  { mots: ['je', 'mange', 'une', 'poutine'], texte: 'Je mange une poutine.',   audio: 'm1-je-mange-une-poutine', tr: 'tr_poutine' },
    parle:    { mots: ['je', 'parle', 'francais'],      texte: 'Je parle français.',      audio: 'm1-je-parle-francais',    tr: 'tr_parle' }
  };
  const BANQUE_LIBRE = ['je', 'mange', 'parle', 'un', 'une', 'sandwich', 'poutine', 'francais'];

  const DICO = {
    fr: {
      titre: 'Première mémoire', quitter: 'Quitter la mémoire', son: 'Son', suite: 'Suite', continuer: 'Continuer', valider: 'Valider',
      intro: 'Voilà. Ce souvenir est un peu abîmé, mais on devrait pouvoir en tirer quelques mots.',
      c_mange: 'Touche les mots pour les entendre.',
      c_lire: 'Touche les mots pour les entendre et voir leur sens.',
      c_ordre: 'Le souvenir s’efface… Remets les mots dans l’ordre.',
      c_ecrire_part: 'Complète les mots qui manquent.',
      c_ecrire: 'Écris la phrase en français.',
      c_image: 'Tu es Bek. Que fais-tu maintenant\u00a0?',
      c_audio: 'Écoute, puis choisis les bons mots.',
      reecouter: 'Réécouter', sans_son: 'Je n’entends rien', construire_vide: 'Touche les mots pour construire ta phrase.',
      role_s: 'sujet', role_v: 'verbe', role_o: 'objet', genre_m: 'masculin', genre_f: 'féminin',
      noteE_titre: 'Remarque', noteE: 'Avec « je », les verbes en -er se terminent par -e. On n’entend pas ce -e.',
      tr_mange: '', tr_sandwich: '', tr_poutine: '', tr_parle: '',
      sens_je: 'moi', sens_mange: 'manger (moi)', sens_parle: 'parler (moi)', sens_un: 'un (mot masculin)', sens_une: 'une (mot féminin)',
      sens_sandwich: 'sandwich', sens_poutine: 'poutine', sens_francais: 'la langue française',
      quipErreur: ['Presque. Ce qui, en français comme ailleurs, veut dire «\u00a0non\u00a0».', 'Prends ton temps. J’ai tout le mien.', 'Intéressant. Mais non.'],
      quipOk: ['Voilà.', 'Exact.', 'Pas mal du tout.', 'On progresse.'],
      quipUne: 'Une poutine, pas «\u00a0un\u00a0». La grammaire décide, pas toi.',
      quipPoutine: 'Remarque son enthousiasme. Je dis ça, je dis rien.',
      quipSandwich: 'Elle a l’air de bien apprécier son sandwich. Retiens ça.',
      quipReponse: 'Voici la réponse. Ne le répète à personne.',
      quipAccent: 'Presque\u00a0! Regarde les accents.',
      quipSansSon: 'Pas de son\u00a0? Voici le texte. Je ne dirai rien.',
      cult_titre: 'Savais-tu\u00a0?',
      cult_sandwich: 'Selon la légende, le mot «\u00a0sandwich\u00a0» vient d’un comte anglais qui mangeait sa viande entre deux tranches de pain pour ne pas quitter sa partie de cartes.',
      cult_poutine: 'La poutine, ce sont des frites, du fromage en grains (qui fait «\u00a0squick\u00a0» sous la dent) et de la sauce brune. Elle est née au Québec vers la fin des années 1950, et plusieurs villages s’en disputent l’honneur.',
      fin: 'Souvenir reconstitué. Tu sais maintenant dire ce que tu manges. Ce que tu ne manges pas… ça viendra.'
    },
    en: {
      titre: 'First memory', quitter: 'Leave the memory', son: 'Sound', suite: 'Next', continuer: 'Continue', valider: 'Check',
      intro: 'There. This memory is a bit damaged, but we should be able to pull a few words out of it.',
      c_mange: 'Tap the words to hear them.',
      c_lire: 'Tap the words to hear them and see what they mean.',
      c_ordre: 'The memory is fading… Put the words back in order.',
      c_ecrire_part: 'Fill in the missing words.',
      c_ecrire: 'Write the sentence in French.',
      c_image: 'You are Bek. What are you doing now?',
      c_audio: 'Listen, then pick the right words.',
      reecouter: 'Listen again', sans_son: 'I can’t hear anything', construire_vide: 'Tap the words to build your sentence.',
      role_s: 'subject', role_v: 'verb', role_o: 'object', genre_m: 'masculine', genre_f: 'feminine',
      noteE_titre: 'Note', noteE: 'After “je”, verbs ending in -er end in -e. You don’t hear that -e.',
      tr_mange: 'I eat.', tr_sandwich: 'I eat a sandwich.', tr_poutine: 'I eat a poutine.', tr_parle: 'I speak French.',
      sens_je: 'I', sens_mange: 'eat', sens_parle: 'speak', sens_un: 'a (masculine word)', sens_une: 'a (feminine word)',
      sens_sandwich: 'sandwich', sens_poutine: 'poutine (fries, cheese curds and gravy)', sens_francais: 'French (the language)',
      quipErreur: ['Almost. Which, in French as elsewhere, means “no”.', 'Take your time. I have all of mine.', 'Interesting. But no.'],
      quipOk: ['There.', 'Exactly.', 'Not bad at all.', 'We’re getting somewhere.'],
      quipUne: 'A poutine, not “un”. Grammar decides, not you.',
      quipPoutine: 'Notice her enthusiasm. I’m just saying.',
      quipSandwich: 'She seems to really enjoy her sandwich. Remember that.',
      quipReponse: 'Here’s the answer. Don’t tell anyone.',
      quipAccent: 'Almost! Check the accents.',
      quipSansSon: 'No sound? Here’s the text. I won’t say a word.',
      cult_titre: 'Did you know?',
      cult_sandwich: 'According to legend, the word “sandwich” comes from an English earl who ate his meat between two slices of bread so he wouldn’t have to leave his card game.',
      cult_poutine: 'Poutine is fries, cheese curds (which squeak against your teeth) and brown gravy. It was born in Quebec in the late 1950s, and several villages claim the honour.',
      fin: 'Memory restored. You can now say what you eat. What you don’t eat… that will come.'
    },  // ---- 🆕 (03-11-2026) autres langues : mêmes 20 langues que le menu ----
    es: {
      titre: 'Primer recuerdo',
      quitter: 'Salir del recuerdo',
      son: 'Sonido',
      suite: 'Siguiente',
      continuer: 'Continuar',
      valider: 'Comprobar',
      intro: 'Listo. Este recuerdo está un poco dañado, pero deberíamos poder sacarle algunas palabras.',
      c_mange: 'Toca las palabras para oírlas.',
      c_lire: 'Toca las palabras para oírlas y ver qué significan.',
      c_ordre: 'El recuerdo se desvanece… Pon las palabras en orden.',
      c_ecrire_part: 'Completa las palabras que faltan.',
      c_ecrire: 'Escribe la frase en francés.',
      c_image: 'Eres Bek. ¿Qué haces ahora?',
      c_audio: 'Escucha y elige las palabras correctas.',
      reecouter: 'Volver a escuchar',
      sans_son: 'No oigo nada',
      construire_vide: 'Toca las palabras para construir tu frase.',
      role_s: 'sujeto',
      role_v: 'verbo',
      role_o: 'objeto',
      genre_m: 'masculino',
      genre_f: 'femenino',
      noteE_titre: 'Observación',
      noteE: 'Después de «je», los verbos en -er terminan en -e. Esa -e no se oye.',
      tr_mange: 'Yo como.',
      tr_sandwich: 'Yo como un sándwich.',
      tr_poutine: 'Yo como una poutine.',
      tr_parle: 'Yo hablo francés.',
      sens_je: 'yo',
      sens_mange: 'comer',
      sens_parle: 'hablar',
      sens_un: 'un (palabra masculina)',
      sens_une: 'una (palabra femenina)',
      sens_sandwich: 'sándwich',
      sens_poutine: 'poutine (patatas fritas, queso en grano y salsa)',
      sens_francais: 'el idioma francés',
      quipErreur: ['Casi. Que, en francés como en cualquier idioma, significa «no».', 'Tómate tu tiempo. Yo tengo todo el mío.', 'Interesante. Pero no.'],
      quipOk: ['Eso es.', 'Exacto.', 'Nada mal.', 'Vamos avanzando.'],
      quipUne: 'Una poutine, no «un». La gramática decide, no tú.',
      quipPoutine: 'Fíjate en su entusiasmo. Lo digo y no lo digo.',
      quipSandwich: 'Parece que disfruta de su sándwich. Recuérdalo.',
      quipReponse: 'Aquí está la respuesta. No se lo cuentes a nadie.',
      quipAccent: '¡Casi! Mira los acentos.',
      quipSansSon: '¿Sin sonido? Aquí tienes el texto. No diré nada.',
      cult_titre: '¿Sabías que…?',
      cult_sandwich: 'Según la leyenda, la palabra «sandwich» viene de un conde inglés que comía la carne entre dos rebanadas de pan para no dejar su partida de cartas.',
      cult_poutine: 'La poutine son patatas fritas, queso en grano (que «chirría» entre los dientes) y salsa oscura. Nació en Quebec a finales de los años 1950, y varios pueblos se disputan el honor.',
      fin: 'Recuerdo reconstruido. Ya sabes decir lo que comes. Lo que no comes… ya llegará.'
    },
    it: {
      titre: 'Primo ricordo',
      quitter: 'Esci dal ricordo',
      son: 'Audio',
      suite: 'Avanti',
      continuer: 'Continua',
      valider: 'Verifica',
      intro: 'Ecco. Questo ricordo è un po’ rovinato, ma dovremmo riuscire a ricavarne qualche parola.',
      c_mange: 'Tocca le parole per ascoltarle.',
      c_lire: 'Tocca le parole per ascoltarle e vederne il significato.',
      c_ordre: 'Il ricordo sbiadisce… Rimetti le parole in ordine.',
      c_ecrire_part: 'Completa le parole mancanti.',
      c_ecrire: 'Scrivi la frase in francese.',
      c_image: 'Sei Bek. Che cosa fai adesso?',
      c_audio: 'Ascolta, poi scegli le parole giuste.',
      reecouter: 'Riascolta',
      sans_son: 'Non sento niente',
      construire_vide: 'Tocca le parole per costruire la tua frase.',
      role_s: 'soggetto',
      role_v: 'verbo',
      role_o: 'oggetto',
      genre_m: 'maschile',
      genre_f: 'femminile',
      noteE_titre: 'Nota',
      noteE: 'Dopo «je», i verbi in -er finiscono in -e. Questa -e non si sente.',
      tr_mange: 'Io mangio.',
      tr_sandwich: 'Io mangio un panino.',
      tr_poutine: 'Io mangio una poutine.',
      tr_parle: 'Io parlo francese.',
      sens_je: 'io',
      sens_mange: 'mangiare',
      sens_parle: 'parlare',
      sens_un: 'un (parola maschile)',
      sens_une: 'una (parola femminile)',
      sens_sandwich: 'panino',
      sens_poutine: 'poutine (patatine, formaggio in grani e salsa)',
      sens_francais: 'la lingua francese',
      quipErreur: ['Quasi. Che, in francese come altrove, vuol dire «no».', 'Prenditi il tuo tempo. Io ho tutto il mio.', 'Interessante. Ma no.'],
      quipOk: ['Ecco.', 'Esatto.', 'Niente male.', 'Stiamo facendo progressi.'],
      quipUne: 'Una poutine, non «un». Decide la grammatica, non tu.',
      quipPoutine: 'Nota il suo entusiasmo. Io lo dico, ma non dico niente.',
      quipSandwich: 'Sembra apprezzare molto il suo panino. Ricordalo.',
      quipReponse: 'Ecco la risposta. Non dirlo a nessuno.',
      quipAccent: 'Quasi! Guarda gli accenti.',
      quipSansSon: 'Niente audio? Ecco il testo. Non dirò nulla.',
      cult_titre: 'Lo sapevi?',
      cult_sandwich: 'Secondo la leggenda, la parola «sandwich» viene da un conte inglese che mangiava la carne tra due fette di pane per non lasciare la sua partita a carte.',
      cult_poutine: 'La poutine è fatta di patatine fritte, formaggio in grani (che «cigola» sotto i denti) e salsa scura. È nata in Québec alla fine degli anni ’50, e più paesi se ne contendono il merito.',
      fin: 'Ricordo ricostruito. Ora sai dire che cosa mangi. Quello che non mangi… arriverà.'
    },
    pt: {
      titre: 'Primeira lembrança',
      quitter: 'Sair da lembrança',
      son: 'Som',
      suite: 'Próximo',
      continuer: 'Continuar',
      valider: 'Verificar',
      intro: 'Pronto. Esta lembrança está meio danificada, mas devemos conseguir tirar algumas palavras dela.',
      c_mange: 'Toque nas palavras para ouvi-las.',
      c_lire: 'Toque nas palavras para ouvi-las e ver o que significam.',
      c_ordre: 'A lembrança está se apagando… Coloque as palavras em ordem.',
      c_ecrire_part: 'Complete as palavras que faltam.',
      c_ecrire: 'Escreva a frase em francês.',
      c_image: 'Você é a Bek. O que você está fazendo agora?',
      c_audio: 'Escute e escolha as palavras certas.',
      reecouter: 'Ouvir de novo',
      sans_son: 'Não estou ouvindo nada',
      construire_vide: 'Toque nas palavras para montar a sua frase.',
      role_s: 'sujeito',
      role_v: 'verbo',
      role_o: 'objeto',
      genre_m: 'masculino',
      genre_f: 'feminino',
      noteE_titre: 'Observação',
      noteE: 'Depois de “je”, os verbos em -er terminam em -e. Esse -e não se ouve.',
      tr_mange: 'Eu como.',
      tr_sandwich: 'Eu como um sanduíche.',
      tr_poutine: 'Eu como uma poutine.',
      tr_parle: 'Eu falo francês.',
      sens_je: 'eu',
      sens_mange: 'comer',
      sens_parle: 'falar',
      sens_un: 'um (palavra masculina)',
      sens_une: 'uma (palavra feminina)',
      sens_sandwich: 'sanduíche',
      sens_poutine: 'poutine (batata frita, queijo em grãos e molho)',
      sens_francais: 'a língua francesa',
      quipErreur: ['Quase. O que, em francês como em qualquer língua, quer dizer “não”.', 'Fique à vontade. Eu tenho todo o meu tempo.', 'Interessante. Mas não.'],
      quipOk: ['Isso.', 'Exato.', 'Nada mal.', 'Estamos progredindo.'],
      quipUne: 'Uma poutine, não “un”. Quem decide é a gramática, não você.',
      quipPoutine: 'Repare no entusiasmo dela. Eu só comentei.',
      quipSandwich: 'Ela parece gostar muito do sanduíche. Guarde isso.',
      quipReponse: 'Aqui está a resposta. Não conte para ninguém.',
      quipAccent: 'Quase! Olhe os acentos.',
      quipSansSon: 'Sem som? Aqui está o texto. Não vou dizer nada.',
      cult_titre: 'Você sabia?',
      cult_sandwich: 'Segundo a lenda, a palavra “sandwich” vem de um conde inglês que comia carne entre duas fatias de pão para não largar o jogo de cartas.',
      cult_poutine: 'A poutine é feita de batata frita, queijo em grãos (que “range” nos dentes) e molho escuro. Nasceu no Quebec no fim dos anos 1950, e várias cidades disputam essa honra.',
      fin: 'Lembrança reconstruída. Agora você sabe dizer o que come. O que você não come… isso vem depois.'
    },
    ca: {
      titre: 'Primer record',
      quitter: 'Surt del record',
      son: 'So',
      suite: 'Següent',
      continuer: 'Continua',
      valider: 'Comprova',
      intro: 'Ja està. Aquest record està una mica malmès, però hauríem de poder-ne treure algunes paraules.',
      c_mange: 'Toca les paraules per sentir-les.',
      c_lire: 'Toca les paraules per sentir-les i veure què signifiquen.',
      c_ordre: 'El record s’esvaeix… Posa les paraules en ordre.',
      c_ecrire_part: 'Completa les paraules que falten.',
      c_ecrire: 'Escriu la frase en francès.',
      c_image: 'Ets la Bek. Què fas ara?',
      c_audio: 'Escolta i tria les paraules correctes.',
      reecouter: 'Torna a escoltar',
      sans_son: 'No sento res',
      construire_vide: 'Toca les paraules per construir la teva frase.',
      role_s: 'subjecte',
      role_v: 'verb',
      role_o: 'objecte',
      genre_m: 'masculí',
      genre_f: 'femení',
      noteE_titre: 'Observació',
      noteE: 'Després de «je», els verbs en -er acaben en -e. Aquesta -e no se sent.',
      tr_mange: 'Jo menjo.',
      tr_sandwich: 'Jo menjo un entrepà.',
      tr_poutine: 'Jo menjo una poutine.',
      tr_parle: 'Jo parlo francès.',
      sens_je: 'jo',
      sens_mange: 'menjar',
      sens_parle: 'parlar',
      sens_un: 'un (paraula masculina)',
      sens_une: 'una (paraula femenina)',
      sens_sandwich: 'entrepà',
      sens_poutine: 'poutine (patates fregides, formatge en grans i salsa)',
      sens_francais: 'la llengua francesa',
      quipErreur: ['Gairebé. Que, en francès com a tot arreu, vol dir «no».', 'Pren-te el teu temps. Jo tinc tot el meu.', 'Interessant. Però no.'],
      quipOk: ['Això.', 'Exacte.', 'Gens malament.', 'Anem avançant.'],
      quipUne: 'Una poutine, no «un». Decideix la gramàtica, no tu.',
      quipPoutine: 'Fixa’t en el seu entusiasme. Ho dic i no ho dic.',
      quipSandwich: 'Sembla que gaudeix de l’entrepà. Recorda-ho.',
      quipReponse: 'Aquí tens la resposta. No ho expliquis a ningú.',
      quipAccent: 'Gairebé! Mira els accents.',
      quipSansSon: 'Sense so? Aquí tens el text. No diré res.',
      cult_titre: 'Ho sabies?',
      cult_sandwich: 'Segons la llegenda, la paraula «sandwich» ve d’un comte anglès que menjava la carn entre dues llesques de pa per no deixar la seva partida de cartes.',
      cult_poutine: 'La poutine és feta de patates fregides, formatge en grans (que «grinyola» entre les dents) i salsa fosca. Va néixer al Quebec a finals dels anys cinquanta, i diversos pobles se’n disputen l’honor.',
      fin: 'Record reconstruït. Ara saps dir què menges. El que no menges… ja arribarà.'
    },
    eo: {
      titre: 'Unua memoraĵo',
      quitter: 'Forlasi la memoraĵon',
      son: 'Sono',
      suite: 'Sekva',
      continuer: 'Daŭrigi',
      valider: 'Kontroli',
      intro: 'Jen. Ĉi tiu memoraĵo estas iom difektita, sed ni devus povi eltiri el ĝi kelkajn vortojn.',
      c_mange: 'Tuŝu la vortojn por aŭdi ilin.',
      c_lire: 'Tuŝu la vortojn por aŭdi ilin kaj vidi ilian signifon.',
      c_ordre: 'La memoraĵo paliĝas… Metu la vortojn en la ĝustan ordon.',
      c_ecrire_part: 'Plenigu la mankantajn vortojn.',
      c_ecrire: 'Skribu la frazon france.',
      c_image: 'Vi estas Bek. Kion vi faras nun?',
      c_audio: 'Aŭskultu, poste elektu la ĝustajn vortojn.',
      reecouter: 'Aŭskulti denove',
      sans_son: 'Mi nenion aŭdas',
      construire_vide: 'Tuŝu la vortojn por konstrui vian frazon.',
      role_s: 'subjekto',
      role_v: 'verbo',
      role_o: 'objekto',
      genre_m: 'vira',
      genre_f: 'ina',
      noteE_titre: 'Rimarko',
      noteE: 'Post «je», la verboj je -er finiĝas per -e. Tiun -e oni ne aŭdas.',
      tr_mange: 'Mi manĝas.',
      tr_sandwich: 'Mi manĝas sandviĉon.',
      tr_poutine: 'Mi manĝas poutinon.',
      tr_parle: 'Mi parolas la francan.',
      sens_je: 'mi',
      sens_mange: 'manĝi',
      sens_parle: 'paroli',
      sens_un: 'unu (vira vorto)',
      sens_une: 'unu (ina vorto)',
      sens_sandwich: 'sandviĉo',
      sens_poutine: 'poutino (fritoj, fromaĝeroj kaj saŭco)',
      sens_francais: 'la franca lingvo',
      quipErreur: ['Preskaŭ. Kio, france kiel aliloke, signifas «ne».', 'Prenu vian tempon. Mi havas la tutan mian.', 'Interese. Sed ne.'],
      quipOk: ['Jen.', 'Ĝuste.', 'Tute ne malbone.', 'Ni progresas.'],
      quipUne: '«une» poutino, ne «un». La gramatiko decidas, ne vi.',
      quipPoutine: 'Rimarku ŝian entuziasmon. Mi nur diras.',
      quipSandwich: 'Ŝi ŝajnas multe ŝati sian sandviĉon. Memoru tion.',
      quipReponse: 'Jen la respondo. Ne diru tion al neniu.',
      quipAccent: 'Preskaŭ! Rigardu la supersignojn.',
      quipSansSon: 'Neniu sono? Jen la teksto. Mi diros nenion.',
      cult_titre: 'Ĉu vi sciis?',
      cult_sandwich: 'Laŭ la legendo, la vorto «sandwich» devenas de angla grafo, kiu manĝis sian viandon inter du pantranĉaĵoj por ne forlasi sian kartludon.',
      cult_poutine: 'Poutine konsistas el fritoj, fromaĝeroj (kiuj «knaras» sub la dentoj) kaj bruna saŭco. Ĝi naskiĝis en Kebekio fine de la 1950-aj jaroj, kaj pluraj vilaĝoj disputas pri la honoro.',
      fin: 'Memoraĵo rekonstruita. Nun vi scias diri, kion vi manĝas. Kion vi ne manĝas… tio venos poste.'
    },
    zh: {
      titre: '第一段记忆',
      quitter: '离开这段记忆',
      son: '声音',
      suite: '下一步',
      continuer: '继续',
      valider: '检查',
      intro: '好了。这段记忆有点受损，但我们应该能从中找出几个词。',
      c_mange: '点一点这些词，听听它们的发音。',
      c_lire: '点一点这些词，听发音，看意思。',
      c_ordre: '记忆正在消退……请把词按顺序放回去。',
      c_ecrire_part: '把缺少的词补上。',
      c_ecrire: '请用法语写出这句话。',
      c_image: '你是 Bek。你现在在做什么？',
      c_audio: '先听，再选出正确的词。',
      reecouter: '再听一遍',
      sans_son: '我听不到声音',
      construire_vide: '点一点下面的词，组成你的句子。',
      role_s: '主语',
      role_v: '动词',
      role_o: '宾语',
      genre_m: '阳性',
      genre_f: '阴性',
      noteE_titre: '小提示',
      noteE: '跟在 “je” 后面，以 -er 结尾的动词要以 -e 结尾。这个 -e 不发音。',
      tr_mange: '我吃。',
      tr_sandwich: '我吃一个三明治。',
      tr_poutine: '我吃一份肉汁奶酪薯条。',
      tr_parle: '我说法语。',
      sens_je: '我',
      sens_mange: '吃',
      sens_parle: '说',
      sens_un: '一个（阳性词）',
      sens_une: '一个（阴性词）',
      sens_sandwich: '三明治',
      sens_poutine: '肉汁奶酪薯条（薯条、奶酪粒和肉汁）',
      sens_francais: '法语',
      quipErreur: ['差一点。而“差一点”，在法语里和别处一样，意思是“不对”。', '慢慢来。我的时间多得很。', '有意思。但不对。'],
      quipOk: ['对了。', '没错。', '相当不错。', '有进步。'],
      quipUne: '是 “une” poutine，不是 “un”。由语法决定，不由你决定。',
      quipPoutine: '注意看她的热情。我可什么都没说。',
      quipSandwich: '她好像很喜欢她的三明治。记住这一点。',
      quipReponse: '答案在这儿。别告诉别人。',
      quipAccent: '差一点！看看重音符号。',
      quipSansSon: '没有声音？文字在这儿。我什么都不说。',
      cult_titre: '你知道吗？',
      cult_sandwich: '据说，“sandwich”这个词来自一位英国伯爵：他为了不离开牌桌，把肉夹在两片面包之间吃。',
      cult_poutine: '肉汁奶酪薯条由薯条、奶酪粒（咬下去会“吱吱”响）和棕色肉汁组成。它诞生于二十世纪五十年代末的魁北克，好几个小镇都争着说是自己的发明。',
      fin: '记忆已复原。现在你会说自己吃什么了。不吃什么……以后再说。'
    },
    ja: {
      titre: '最初の記憶',
      quitter: '記憶をとじる',
      son: 'サウンド',
      suite: '次へ',
      continuer: 'つづける',
      valider: '確認',
      intro: 'はい。この記憶は少し傷んでいますが、いくつか言葉を取り出せるはずです。',
      c_mange: '言葉にふれて、音を聞いてみましょう。',
      c_lire: '言葉にふれて、音と意味を確かめましょう。',
      c_ordre: '記憶が消えかけています……言葉を正しい順にもどしましょう。',
      c_ecrire_part: 'たりない言葉を書きましょう。',
      c_ecrire: 'この文をフランス語で書きましょう。',
      c_image: 'あなたはBekです。いま、なにをしていますか？',
      c_audio: '聞いてから、正しい言葉をえらびましょう。',
      reecouter: 'もう一度聞く',
      sans_son: '音が聞こえません',
      construire_vide: '言葉にふれて、文を組み立てましょう。',
      role_s: '主語',
      role_v: '動詞',
      role_o: '目的語',
      genre_m: '男性',
      genre_f: '女性',
      noteE_titre: 'ポイント',
      noteE: '「je」のあとでは、-er で終わる動詞は -e で終わります。この -e は発音しません。',
      tr_mange: 'わたしは食べます。',
      tr_sandwich: 'わたしはサンドイッチを食べます。',
      tr_poutine: 'わたしはプーティンを食べます。',
      tr_parle: 'わたしはフランス語を話します。',
      sens_je: 'わたし',
      sens_mange: '食べる',
      sens_parle: '話す',
      sens_un: 'ひとつの（男性名詞）',
      sens_une: 'ひとつの（女性名詞）',
      sens_sandwich: 'サンドイッチ',
      sens_poutine: 'プーティン（フライドポテトにチーズとグレイビーソース）',
      sens_francais: 'フランス語',
      quipErreur: ['おしい。フランス語でも、ほかの言葉でも、「おしい」は「ちがう」という意味です。', 'ゆっくりどうぞ。わたしには時間がたっぷりあります。', 'おもしろい答えです。でも、ちがいます。'],
      quipOk: ['はい、それです。', 'そのとおり。', 'なかなかいいですね。', '進んでいますね。'],
      quipUne: 'プーティンは「un」ではなく「une」です。決めるのは文法で、あなたではありません。',
      quipPoutine: '彼女の熱意に注目してください。わたしは何も言っていませんが。',
      quipSandwich: '彼女はサンドイッチが気に入っているようです。覚えておいてください。',
      quipReponse: '答えはこちらです。だれにも言わないでください。',
      quipAccent: 'おしい！アクセント記号を見てください。',
      quipSansSon: '音が出ませんか？では、文字をどうぞ。何も言いません。',
      cult_titre: '知っていましたか？',
      cult_sandwich: '言い伝えによると、「sandwich」という言葉は、トランプのゲームをやめずに肉をパンにはさんで食べたイギリスの伯爵に由来します。',
      cult_poutine: 'プーティンは、フライドポテト、かむと「キュッ」と鳴るチーズカード、そして茶色いソースでできています。1950年代の終わりごろケベックで生まれ、いくつもの町が発祥の地を名乗っています。',
      fin: '記憶がよみがえりました。これで、何を食べるかが言えますね。何を食べないか……それはまたこんど。'
    },
    ko: {
      titre: '첫 번째 기억',
      quitter: '기억에서 나가기',
      son: '소리',
      suite: '다음',
      continuer: '계속',
      valider: '확인',
      intro: '자, 됐어요. 이 기억은 조금 상했지만, 거기서 단어 몇 개는 건질 수 있을 거예요.',
      c_mange: '단어를 눌러서 들어 보세요.',
      c_lire: '단어를 눌러서 소리와 뜻을 확인해 보세요.',
      c_ordre: '기억이 흐려지고 있어요… 단어를 순서대로 다시 놓아 보세요.',
      c_ecrire_part: '빠진 단어를 채워 보세요.',
      c_ecrire: '이 문장을 프랑스어로 써 보세요.',
      c_image: '너는 Bek이에요. 지금 뭘 하고 있나요?',
      c_audio: '듣고 나서 알맞은 단어를 골라 보세요.',
      reecouter: '다시 듣기',
      sans_son: '아무 소리도 안 들려요',
      construire_vide: '단어를 눌러서 문장을 만들어 보세요.',
      role_s: '주어',
      role_v: '동사',
      role_o: '목적어',
      genre_m: '남성',
      genre_f: '여성',
      noteE_titre: '참고',
      noteE: '“je” 뒤에서는 -er로 끝나는 동사가 -e로 끝나요. 이 -e는 소리 나지 않아요.',
      tr_mange: '나는 먹어요.',
      tr_sandwich: '나는 샌드위치를 먹어요.',
      tr_poutine: '나는 poutine을 먹어요.',
      tr_parle: '나는 프랑스어를 말해요.',
      sens_je: '나',
      sens_mange: '먹다',
      sens_parle: '말하다',
      sens_un: '하나의 (남성 명사)',
      sens_une: '하나의 (여성 명사)',
      sens_sandwich: '샌드위치',
      sens_poutine: 'poutine (감자튀김에 치즈 커드와 그레이비 소스)',
      sens_francais: '프랑스어',
      quipErreur: ['아깝네요. 프랑스어에서도, 다른 말에서도 “아깝다”는 “틀렸다”는 뜻이에요.', '천천히 하세요. 저는 시간이 아주 많아요.', '흥미로운 답이에요. 그래도 아니에요.'],
      quipOk: ['그거예요.', '맞아요.', '꽤 괜찮은데요.', '점점 나아지고 있어요.'],
      quipUne: 'poutine은 “un”이 아니라 “une”예요. 정하는 건 문법이지, 네가 아니에요.',
      quipPoutine: '그녀의 열정을 잘 보세요. 저는 아무 말도 안 했어요.',
      quipSandwich: '그녀는 샌드위치가 꽤 마음에 드는 모양이에요. 기억해 두세요.',
      quipReponse: '정답은 여기 있어요. 아무한테도 말하지 마세요.',
      quipAccent: '아깝네요! 악센트를 보세요.',
      quipSansSon: '소리가 안 나요? 여기 글자가 있어요. 아무 말 안 할게요.',
      cult_titre: '알고 있었나요?',
      cult_sandwich: '전해지는 이야기로는 “sandwich”라는 말은 카드 게임을 멈추지 않으려고 고기를 빵 두 쪽 사이에 끼워 먹은 영국 백작에게서 왔어요.',
      cult_poutine: 'poutine은 감자튀김, 씹으면 “뽀드득” 소리가 나는 치즈 커드, 갈색 그레이비 소스로 만들어요. 1950년대 말 퀘벡에서 태어났고, 여러 마을이 자기네가 원조라고 주장해요.',
      fin: '기억이 복원됐어요. 이제 무엇을 먹는지 말할 수 있어요. 먹지 않는 것은… 나중에 알려 줄게요.'
    },
    vi: {
      titre: 'Ký ức đầu tiên',
      quitter: 'Rời khỏi ký ức',
      son: 'Âm thanh',
      suite: 'Tiếp',
      continuer: 'Tiếp tục',
      valider: 'Kiểm tra',
      intro: 'Xong rồi. Ký ức này hơi bị hỏng, nhưng chắc mình lấy được vài từ ra.',
      c_mange: 'Chạm vào các từ để nghe.',
      c_lire: 'Chạm vào các từ để nghe và xem nghĩa.',
      c_ordre: 'Ký ức đang mờ dần… Hãy xếp các từ lại cho đúng thứ tự.',
      c_ecrire_part: 'Điền các từ còn thiếu.',
      c_ecrire: 'Viết câu này bằng tiếng Pháp.',
      c_image: 'Bạn là Bek. Bây giờ bạn đang làm gì?',
      c_audio: 'Nghe rồi chọn đúng các từ.',
      reecouter: 'Nghe lại',
      sans_son: 'Mình không nghe thấy gì',
      construire_vide: 'Chạm vào các từ để ghép thành câu của bạn.',
      role_s: 'chủ ngữ',
      role_v: 'động từ',
      role_o: 'tân ngữ',
      genre_m: 'giống đực',
      genre_f: 'giống cái',
      noteE_titre: 'Lưu ý',
      noteE: 'Sau “je”, các động từ kết thúc bằng -er sẽ tận cùng bằng -e. Chữ -e này không đọc.',
      tr_mange: 'Tôi ăn.',
      tr_sandwich: 'Tôi ăn một cái bánh mì kẹp.',
      tr_poutine: 'Tôi ăn một phần poutine.',
      tr_parle: 'Tôi nói tiếng Pháp.',
      sens_je: 'tôi',
      sens_mange: 'ăn',
      sens_parle: 'nói',
      sens_un: 'một (từ giống đực)',
      sens_une: 'một (từ giống cái)',
      sens_sandwich: 'bánh mì kẹp',
      sens_poutine: 'poutine (khoai tây chiên, phô mai vụn và nước sốt)',
      sens_francais: 'tiếng Pháp',
      quipErreur: ['Gần đúng rồi. Mà trong tiếng Pháp cũng như ở đâu, “gần đúng” nghĩa là “sai”.', 'Cứ từ từ. Mình có cả đống thời gian.', 'Thú vị đấy. Nhưng không phải.'],
      quipOk: ['Đúng rồi.', 'Chính xác.', 'Không tệ chút nào.', 'Đang tiến bộ đấy.'],
      quipUne: 'Là “une” poutine, không phải “un”. Ngữ pháp quyết định, không phải bạn.',
      quipPoutine: 'Để ý độ hào hứng của cô ấy nhé. Mình chỉ nói vậy thôi.',
      quipSandwich: 'Cô ấy có vẻ rất thích bánh mì của mình. Nhớ điều đó nhé.',
      quipReponse: 'Đáp án đây. Đừng nói với ai nhé.',
      quipAccent: 'Gần đúng rồi! Xem lại dấu nhé.',
      quipSansSon: 'Không có tiếng à? Đây là chữ. Mình sẽ không nói gì.',
      cult_titre: 'Bạn có biết không?',
      cult_sandwich: 'Theo truyền thuyết, từ “sandwich” bắt nguồn từ một bá tước người Anh, ông kẹp thịt giữa hai lát bánh mì để khỏi phải rời ván bài.',
      cult_poutine: 'Poutine gồm khoai tây chiên, phô mai vụn (cắn vào nghe “kít kít”) và nước sốt nâu. Món này ra đời ở Québec vào cuối thập niên 1950, và nhiều thị trấn tranh nhau là quê hương của nó.',
      fin: 'Ký ức đã được phục hồi. Giờ bạn đã nói được mình ăn gì. Còn món bạn không ăn… sẽ đến sau.'
    },
    ht: {
      titre: 'Premye souvni',
      quitter: 'Soti nan souvni a',
      son: 'Son',
      suite: 'Swivan',
      continuer: 'Kontinye',
      valider: 'Verifye',
      intro: 'Men li. Souvni sa a yon ti jan domaje, men nou ta dwe kapab rale kèk mo ladan l.',
      c_mange: 'Manyen mo yo pou tande yo.',
      c_lire: 'Manyen mo yo pou tande yo epi wè sa yo vle di.',
      c_ordre: 'Souvni a ap disparèt… Remete mo yo nan lòd.',
      c_ecrire_part: 'Ranpli mo ki manke yo.',
      c_ecrire: 'Ekri fraz la an fransè.',
      c_image: 'Ou se Bek. Kisa w ap fè kounye a?',
      c_audio: 'Koute, apre sa chwazi bon mo yo.',
      reecouter: 'Koute ankò',
      sans_son: 'Mwen pa tande anyen',
      construire_vide: 'Manyen mo yo pou konstwi fraz ou.',
      role_s: 'sijè',
      role_v: 'vèb',
      role_o: 'konpleman',
      genre_m: 'maskilen',
      genre_f: 'fenmen',
      noteE_titre: 'Remak',
      noteE: 'Apre « je », vèb ki fini an -er yo fini an -e. Yo pa tande -e sa a.',
      tr_mange: 'Mwen manje.',
      tr_sandwich: 'Mwen manje yon sandwich.',
      tr_poutine: 'Mwen manje yon poutine.',
      tr_parle: 'Mwen pale fransè.',
      sens_je: 'mwen',
      sens_mange: 'manje',
      sens_parle: 'pale',
      sens_un: 'yon (mo maskilen)',
      sens_une: 'yon (mo fenmen)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (fri, fwomaj an grenn ak sòs)',
      sens_francais: 'lang fransè a',
      quipErreur: ['Prèske. Sa ki, an fransè kou nenpòt ki kote, vle di « non ».', 'Pran tan w. Mwen gen tout pa m.', 'Enteresan. Men non.'],
      quipOk: ['Men li.', 'Egzakteman.', 'Pa mal ditou.', 'N ap avanse.'],
      quipUne: 'Yon poutine, se pa « un ». Se gramè ki deside, se pa ou.',
      quipPoutine: 'Gade ak ki antouzyasm li ye. Mwen sèlman di sa.',
      quipSandwich: 'Li sanble li renmen sandwich li a anpil. Sonje sa.',
      quipReponse: 'Men repons lan. Pa di pèsonn.',
      quipAccent: 'Prèske! Gade aksan yo.',
      quipSansSon: 'Pa gen son? Men tèks la. Mwen p ap di anyen.',
      cult_titre: 'Èske w te konnen?',
      cult_sandwich: 'Daprè lejand lan, mo « sandwich » soti nan yon konte anglè ki te manje vyann li ant de moso pen pou l pa kite pati kat li a.',
      cult_poutine: 'Poutine fèt ak fri, fwomaj an grenn (ki « kriye » anba dan yo) ak sòs mawon. Li fèt nan Kebèk nan fen ane 1950 yo, e plizyè vil ap diskite sou onè sa a.',
      fin: 'Souvni a retabli. Kounye a ou ka di sa w ap manje. Sa w pa manje… sa ap vini pita.'
    },
    tl: {
      titre: 'Unang alaala',
      quitter: 'Lumabas sa alaala',
      son: 'Tunog',
      suite: 'Susunod',
      continuer: 'Magpatuloy',
      valider: 'Suriin',
      intro: 'Ayan. Medyo sira ang alaalang ito, pero dapat makakuha tayo ng ilang salita mula rito.',
      c_mange: 'Pindutin ang mga salita para marinig ang mga ito.',
      c_lire: 'Pindutin ang mga salita para marinig at makita ang kahulugan.',
      c_ordre: 'Naglalaho ang alaala… Ibalik ang mga salita sa tamang ayos.',
      c_ecrire_part: 'Kumpletuhin ang mga nawawalang salita.',
      c_ecrire: 'Isulat ang pangungusap sa Pranses.',
      c_image: 'Ikaw si Bek. Ano ang ginagawa mo ngayon?',
      c_audio: 'Making ka, tapos piliin ang tamang mga salita.',
      reecouter: 'Pakinggan ulit',
      sans_son: 'Wala akong marinig',
      construire_vide: 'Pindutin ang mga salita para buuin ang pangungusap mo.',
      role_s: 'simuno',
      role_v: 'pandiwa',
      role_o: 'layon',
      genre_m: 'panlalaki',
      genre_f: 'pambabae',
      noteE_titre: 'Paalala',
      noteE: 'Pagkatapos ng “je”, ang mga pandiwang nagtatapos sa -er ay nagtatapos sa -e. Hindi naririnig ang -e na ito.',
      tr_mange: 'Kumakain ako.',
      tr_sandwich: 'Kumakain ako ng sandwich.',
      tr_poutine: 'Kumakain ako ng poutine.',
      tr_parle: 'Nagsasalita ako ng Pranses.',
      sens_je: 'ako',
      sens_mange: 'kumain',
      sens_parle: 'magsalita',
      sens_un: 'isang (salitang panlalaki)',
      sens_une: 'isang (salitang pambabae)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (french fries, cheese curds at gravy)',
      sens_francais: 'ang wikang Pranses',
      quipErreur: ['Malapit na. Na, sa Pranses at saanman, ay nangangahulugang “hindi”.', 'Dahan-dahan lang. Marami akong oras.', 'Kawili-wili. Pero hindi.'],
      quipOk: ['Ayan.', 'Eksakto.', 'Hindi masama.', 'Umuusad na tayo.'],
      quipUne: 'Isang “une” poutine, hindi “un”. Ang gramatika ang nagpapasya, hindi ikaw.',
      quipPoutine: 'Tingnan mo ang sigla niya. Sinasabi ko lang.',
      quipSandwich: 'Mukhang nasisiyahan siya sa sandwich niya. Tandaan mo iyon.',
      quipReponse: 'Narito ang sagot. Huwag mong sabihin kanino man.',
      quipAccent: 'Malapit na! Tingnan ang mga tuldik.',
      quipSansSon: 'Walang tunog? Narito ang teksto. Wala akong sasabihin.',
      cult_titre: 'Alam mo ba?',
      cult_sandwich: 'Ayon sa alamat, ang salitang “sandwich” ay galing sa isang Ingles na konde na kumain ng karne sa pagitan ng dalawang hiwa ng tinapay para hindi iwan ang laro niya ng baraha.',
      cult_poutine: 'Ang poutine ay gawa sa french fries, cheese curds (na “tumitili” sa ngipin) at kayumangging gravy. Isinilang ito sa Quebec noong huling bahagi ng dekada 1950, at maraming bayan ang nag-aagawan sa karangalan.',
      fin: 'Naibalik na ang alaala. Kaya mo nang sabihin kung ano ang kinakain mo. Ang hindi mo kinakain… susunod na iyon.'
    },
    id: {
      titre: 'Kenangan pertama',
      quitter: 'Keluar dari kenangan',
      son: 'Suara',
      suite: 'Lanjut',
      continuer: 'Lanjut',
      valider: 'Periksa',
      intro: 'Nah. Kenangan ini agak rusak, tapi kita seharusnya bisa mengambil beberapa kata darinya.',
      c_mange: 'Sentuh kata-katanya untuk mendengarnya.',
      c_lire: 'Sentuh kata-katanya untuk mendengar dan melihat artinya.',
      c_ordre: 'Kenangannya memudar… Susun kembali kata-katanya dengan urutan yang benar.',
      c_ecrire_part: 'Lengkapi kata yang hilang.',
      c_ecrire: 'Tulis kalimatnya dalam bahasa Prancis.',
      c_image: 'Kamu adalah Bek. Apa yang kamu lakukan sekarang?',
      c_audio: 'Dengarkan, lalu pilih kata yang tepat.',
      reecouter: 'Dengarkan lagi',
      sans_son: 'Aku tidak mendengar apa-apa',
      construire_vide: 'Sentuh kata-katanya untuk menyusun kalimatmu.',
      role_s: 'subjek',
      role_v: 'verba',
      role_o: 'objek',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Catatan',
      noteE: 'Setelah “je”, kata kerja berakhiran -er berakhir dengan -e. Bunyi -e ini tidak terdengar.',
      tr_mange: 'Aku makan.',
      tr_sandwich: 'Aku makan sandwich.',
      tr_poutine: 'Aku makan poutine.',
      tr_parle: 'Aku berbicara bahasa Prancis.',
      sens_je: 'aku',
      sens_mange: 'makan',
      sens_parle: 'berbicara',
      sens_un: 'sebuah (kata maskulin)',
      sens_une: 'sebuah (kata feminin)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (kentang goreng, keju butiran, dan saus)',
      sens_francais: 'bahasa Prancis',
      quipErreur: ['Hampir. Yang, dalam bahasa Prancis maupun bahasa lain, artinya “bukan”.', 'Santai saja. Aku punya banyak waktu.', 'Menarik. Tapi bukan.'],
      quipOk: ['Nah itu dia.', 'Tepat.', 'Lumayan juga.', 'Kita maju.'],
      quipUne: 'Sebuah “une” poutine, bukan “un”. Tata bahasa yang menentukan, bukan kamu.',
      quipPoutine: 'Perhatikan semangatnya. Aku cuma bilang.',
      quipSandwich: 'Dia kelihatan sangat menikmati sandwich-nya. Ingat itu.',
      quipReponse: 'Ini jawabannya. Jangan bilang siapa-siapa.',
      quipAccent: 'Hampir! Lihat tanda aksennya.',
      quipSansSon: 'Tidak ada suara? Ini tulisannya. Aku tidak akan bilang apa-apa.',
      cult_titre: 'Tahukah kamu?',
      cult_sandwich: 'Menurut legenda, kata “sandwich” berasal dari seorang earl Inggris yang makan daging di antara dua potong roti agar tidak meninggalkan permainan kartunya.',
      cult_poutine: 'Poutine terdiri dari kentang goreng, keju butiran (yang “berdecit” di gigi), dan saus cokelat. Makanan ini lahir di Quebec pada akhir 1950-an, dan beberapa kota berebut kehormatan itu.',
      fin: 'Kenangan telah dipulihkan. Sekarang kamu bisa mengatakan apa yang kamu makan. Yang tidak kamu makan… nanti menyusul.'
    },
    nl: {
      titre: 'Eerste herinnering',
      quitter: 'De herinnering verlaten',
      son: 'Geluid',
      suite: 'Volgende',
      continuer: 'Verder',
      valider: 'Controleren',
      intro: 'Zo. Deze herinnering is een beetje beschadigd, maar we zouden er een paar woorden uit moeten kunnen halen.',
      c_mange: 'Tik op de woorden om ze te horen.',
      c_lire: 'Tik op de woorden om ze te horen en hun betekenis te zien.',
      c_ordre: 'De herinnering vervaagt… Zet de woorden terug in de goede volgorde.',
      c_ecrire_part: 'Vul de ontbrekende woorden in.',
      c_ecrire: 'Schrijf de zin in het Frans.',
      c_image: 'Jij bent Bek. Wat doe je nu?',
      c_audio: 'Luister en kies de juiste woorden.',
      reecouter: 'Opnieuw luisteren',
      sans_son: 'Ik hoor niets',
      construire_vide: 'Tik op de woorden om je zin te maken.',
      role_s: 'onderwerp',
      role_v: 'werkwoord',
      role_o: 'object',
      genre_m: 'mannelijk',
      genre_f: 'vrouwelijk',
      noteE_titre: 'Opmerking',
      noteE: 'Na “je” eindigen werkwoorden op -er op -e. Die -e hoor je niet.',
      tr_mange: 'Ik eet.',
      tr_sandwich: 'Ik eet een sandwich.',
      tr_poutine: 'Ik eet een poutine.',
      tr_parle: 'Ik spreek Frans.',
      sens_je: 'ik',
      sens_mange: 'eten',
      sens_parle: 'spreken',
      sens_un: 'een (mannelijk woord)',
      sens_une: 'een (vrouwelijk woord)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (friet, kaaskruim en jus)',
      sens_francais: 'de Franse taal',
      quipErreur: ['Bijna. Wat in het Frans, net als overal, “nee” betekent.', 'Neem je tijd. Ik heb al de mijne.', 'Interessant. Maar nee.'],
      quipOk: ['Zo.', 'Precies.', 'Niet slecht.', 'We schieten op.'],
      quipUne: 'Een “une” poutine, geen “un”. De grammatica beslist, niet jij.',
      quipPoutine: 'Let op haar enthousiasme. Ik zeg het maar.',
      quipSandwich: 'Ze lijkt echt van haar sandwich te genieten. Onthoud dat.',
      quipReponse: 'Hier is het antwoord. Vertel het aan niemand.',
      quipAccent: 'Bijna! Kijk naar de accenten.',
      quipSansSon: 'Geen geluid? Hier is de tekst. Ik zeg niets.',
      cult_titre: 'Wist je dat?',
      cult_sandwich: 'Volgens de legende komt het woord “sandwich” van een Engelse graaf die zijn vlees tussen twee sneetjes brood at om zijn kaartspel niet te hoeven verlaten.',
      cult_poutine: 'Poutine bestaat uit friet, kaaskruim (dat “piept” tussen je tanden) en bruine jus. Het ontstond eind jaren 1950 in Quebec, en meerdere dorpen betwisten die eer.',
      fin: 'Herinnering hersteld. Nu kun je zeggen wat je eet. Wat je niet eet… komt later.'
    },
    de: {
      titre: 'Erste Erinnerung',
      quitter: 'Erinnerung verlassen',
      son: 'Ton',
      suite: 'Weiter',
      continuer: 'Weiter',
      valider: 'Prüfen',
      intro: 'So. Diese Erinnerung ist ein bisschen beschädigt, aber wir sollten ein paar Wörter daraus holen können.',
      c_mange: 'Tippe auf die Wörter, um sie zu hören.',
      c_lire: 'Tippe auf die Wörter, um sie zu hören und ihre Bedeutung zu sehen.',
      c_ordre: 'Die Erinnerung verblasst… Bring die Wörter wieder in die richtige Reihenfolge.',
      c_ecrire_part: 'Ergänze die fehlenden Wörter.',
      c_ecrire: 'Schreibe den Satz auf Französisch.',
      c_image: 'Du bist Bek. Was machst du gerade?',
      c_audio: 'Hör zu und wähle dann die richtigen Wörter.',
      reecouter: 'Nochmal anhören',
      sans_son: 'Ich höre nichts',
      construire_vide: 'Tippe auf die Wörter, um deinen Satz zu bauen.',
      role_s: 'Subjekt',
      role_v: 'Verb',
      role_o: 'Objekt',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Hinweis',
      noteE: 'Nach „je“ enden Verben auf -er mit -e. Dieses -e hört man nicht.',
      tr_mange: 'Ich esse.',
      tr_sandwich: 'Ich esse ein Sandwich.',
      tr_poutine: 'Ich esse eine Poutine.',
      tr_parle: 'Ich spreche Französisch.',
      sens_je: 'ich',
      sens_mange: 'essen',
      sens_parle: 'sprechen',
      sens_un: 'ein (maskulines Wort)',
      sens_une: 'eine (feminines Wort)',
      sens_sandwich: 'Sandwich',
      sens_poutine: 'Poutine (Pommes, Käsebruch und Bratensoße)',
      sens_francais: 'die französische Sprache',
      quipErreur: ['Fast. Was auf Französisch wie überall „nein“ bedeutet.', 'Lass dir Zeit. Ich habe meine ganze.', 'Interessant. Aber nein.'],
      quipOk: ['So.', 'Genau.', 'Gar nicht schlecht.', 'Wir kommen voran.'],
      quipUne: 'Eine „une“ Poutine, nicht „un“. Die Grammatik entscheidet, nicht du.',
      quipPoutine: 'Achte auf ihre Begeisterung. Ich sage ja nur.',
      quipSandwich: 'Sie scheint ihr Sandwich wirklich zu genießen. Merk dir das.',
      quipReponse: 'Hier ist die Antwort. Sag es niemandem.',
      quipAccent: 'Fast! Achte auf die Akzente.',
      quipSansSon: 'Kein Ton? Hier ist der Text. Ich sage nichts.',
      cult_titre: 'Wusstest du schon?',
      cult_sandwich: 'Der Legende nach stammt das Wort „Sandwich“ von einem englischen Grafen, der sein Fleisch zwischen zwei Brotscheiben aß, um sein Kartenspiel nicht zu verlassen.',
      cult_poutine: 'Poutine besteht aus Pommes, Käsebruch (der zwischen den Zähnen „quietscht“) und brauner Soße. Sie entstand Ende der 1950er-Jahre in Québec, und mehrere Dörfer streiten sich um die Ehre.',
      fin: 'Erinnerung wiederhergestellt. Jetzt kannst du sagen, was du isst. Was du nicht isst… kommt später.'
    },
    fa: {
      titre: 'اولین خاطره',
      quitter: 'خروج از خاطره',
      son: 'صدا',
      suite: 'بعدی',
      continuer: 'ادامه',
      valider: 'بررسی',
      intro: 'خب. این خاطره کمی آسیب دیده، ولی باید بتوانیم چند کلمه از آن بیرون بکشیم.',
      c_mange: 'روی کلمه‌ها بزن تا صدایشان را بشنوی.',
      c_lire: 'روی کلمه‌ها بزن تا صدا و معنایشان را ببینی.',
      c_ordre: 'خاطره دارد محو می‌شود… کلمه‌ها را به ترتیب درست برگردان.',
      c_ecrire_part: 'کلمه‌های جاافتاده را کامل کن.',
      c_ecrire: 'جمله را به فرانسوی بنویس.',
      c_image: 'تو Bek هستی. الان چه‌کار می‌کنی؟',
      c_audio: 'گوش بده، بعد کلمه‌های درست را انتخاب کن.',
      reecouter: 'دوباره گوش بده',
      sans_son: 'چیزی نمی‌شنوم',
      construire_vide: 'روی کلمه‌ها بزن تا جمله‌ات را بسازی.',
      role_s: 'نهاد',
      role_v: 'فعل',
      role_o: 'مفعول',
      genre_m: 'مذکر',
      genre_f: 'مؤنث',
      noteE_titre: 'نکته',
      noteE: 'بعد از «je»، فعل‌هایی که به -er ختم می‌شوند به -e تمام می‌شوند. این -e تلفظ نمی‌شود.',
      tr_mange: 'من می‌خورم.',
      tr_sandwich: 'من یک ساندویچ می‌خورم.',
      tr_poutine: 'من یک poutine می‌خورم.',
      tr_parle: 'من فرانسوی صحبت می‌کنم.',
      sens_je: 'من',
      sens_mange: 'خوردن',
      sens_parle: 'صحبت کردن',
      sens_un: 'یک (کلمهٔ مذکر)',
      sens_une: 'یک (کلمهٔ مؤنث)',
      sens_sandwich: 'ساندویچ',
      sens_poutine: 'poutine (سیب‌زمینی سرخ‌کرده، پنیر دانه‌ای و سس)',
      sens_francais: 'زبان فرانسوی',
      quipErreur: ['نزدیک بود. که در فرانسوی هم مثل هر جای دیگر یعنی «نه».', 'عجله نکن. من همهٔ وقت دنیا را دارم.', 'جالب بود. ولی نه.'],
      quipOk: ['همین.', 'دقیقاً.', 'بد نبود.', 'داریم پیش می‌رویم.'],
      quipUne: 'یک poutine «une» است، نه «un». دستور زبان تصمیم می‌گیرد، نه تو.',
      quipPoutine: 'به شور و شوقش دقت کن. من فقط می‌گویم.',
      quipSandwich: 'انگار از ساندویچش خیلی لذت می‌برد. این را یادت نگه دار.',
      quipReponse: 'جواب این است. به کسی نگو.',
      quipAccent: 'نزدیک بود! به آکسان‌ها نگاه کن.',
      quipSansSon: 'صدا نیست؟ این هم متن. من چیزی نمی‌گویم.',
      cult_titre: 'می‌دانستی؟',
      cult_sandwich: 'طبق افسانه، واژهٔ «sandwich» از یک کنت انگلیسی آمده که گوشتش را بین دو تکه نان می‌خورد تا بازی ورقش را رها نکند.',
      cult_poutine: 'poutine از سیب‌زمینی سرخ‌کرده، پنیر دانه‌ای (که زیر دندان «جیرجیر» می‌کند) و سس قهوه‌ای درست می‌شود. اواخر دههٔ ۱۹۵۰ در کبک به وجود آمد و چند شهر بر سر این افتخار با هم اختلاف دارند.',
      fin: 'خاطره بازسازی شد. حالا می‌توانی بگویی چه می‌خوری. اینکه چه نمی‌خوری… بعداً می‌رسد.'
    },
    sv: {
      titre: 'Första minnet',
      quitter: 'Lämna minnet',
      son: 'Ljud',
      suite: 'Nästa',
      continuer: 'Fortsätt',
      valider: 'Kontrollera',
      intro: 'Så där. Det här minnet är lite skadat, men vi borde kunna få ut några ord ur det.',
      c_mange: 'Tryck på orden för att höra dem.',
      c_lire: 'Tryck på orden för att höra dem och se vad de betyder.',
      c_ordre: 'Minnet bleknar… Lägg orden i rätt ordning igen.',
      c_ecrire_part: 'Fyll i orden som saknas.',
      c_ecrire: 'Skriv meningen på franska.',
      c_image: 'Du är Bek. Vad gör du nu?',
      c_audio: 'Lyssna och välj sedan rätt ord.',
      reecouter: 'Lyssna igen',
      sans_son: 'Jag hör ingenting',
      construire_vide: 'Tryck på orden för att bygga din mening.',
      role_s: 'subjekt',
      role_v: 'verb',
      role_o: 'objekt',
      genre_m: 'maskulinum',
      genre_f: 'femininum',
      noteE_titre: 'Anmärkning',
      noteE: 'Efter ”je” slutar verb på -er med -e. Det -e:et hörs inte.',
      tr_mange: 'Jag äter.',
      tr_sandwich: 'Jag äter en macka.',
      tr_poutine: 'Jag äter en poutine.',
      tr_parle: 'Jag talar franska.',
      sens_je: 'jag',
      sens_mange: 'äta',
      sens_parle: 'tala',
      sens_un: 'en (maskulint ord)',
      sens_une: 'en (feminint ord)',
      sens_sandwich: 'macka',
      sens_poutine: 'poutine (pommes frites, ostbitar och sås)',
      sens_francais: 'det franska språket',
      quipErreur: ['Nästan. Vilket på franska, precis som överallt, betyder ”nej”.', 'Ta den tid du behöver. Jag har all min.', 'Intressant. Men nej.'],
      quipOk: ['Så där.', 'Precis.', 'Inte illa alls.', 'Vi kommer framåt.'],
      quipUne: 'En ”une” poutine, inte ”un”. Grammatiken bestämmer, inte du.',
      quipPoutine: 'Lägg märke till hennes entusiasm. Jag säger bara det.',
      quipSandwich: 'Hon verkar verkligen gilla sin macka. Kom ihåg det.',
      quipReponse: 'Här är svaret. Berätta det inte för någon.',
      quipAccent: 'Nästan! Titta på accenterna.',
      quipSansSon: 'Inget ljud? Här är texten. Jag säger ingenting.',
      cult_titre: 'Visste du det?',
      cult_sandwich: 'Enligt legenden kommer ordet ”sandwich” från en engelsk earl som åt sitt kött mellan två brödskivor för att inte lämna sitt kortspel.',
      cult_poutine: 'Poutine består av pommes frites, ostbitar (som ”gnisslar” mot tänderna) och brun sås. Den föddes i Québec i slutet av 1950-talet, och flera byar tvistar om äran.',
      fin: 'Minnet är återställt. Nu kan du säga vad du äter. Vad du inte äter… kommer senare.'
    },
    no: {
      titre: 'Første minne',
      quitter: 'Forlat minnet',
      son: 'Lyd',
      suite: 'Neste',
      continuer: 'Fortsett',
      valider: 'Sjekk',
      intro: 'Sånn. Dette minnet er litt skadet, men vi burde kunne få ut noen ord av det.',
      c_mange: 'Trykk på ordene for å høre dem.',
      c_lire: 'Trykk på ordene for å høre dem og se hva de betyr.',
      c_ordre: 'Minnet blekner… Sett ordene tilbake i riktig rekkefølge.',
      c_ecrire_part: 'Fyll inn ordene som mangler.',
      c_ecrire: 'Skriv setningen på fransk.',
      c_image: 'Du er Bek. Hva gjør du nå?',
      c_audio: 'Lytt, og velg så de riktige ordene.',
      reecouter: 'Lytt igjen',
      sans_son: 'Jeg hører ingenting',
      construire_vide: 'Trykk på ordene for å bygge setningen din.',
      role_s: 'subjekt',
      role_v: 'verb',
      role_o: 'objekt',
      genre_m: 'maskulin',
      genre_f: 'feminin',
      noteE_titre: 'Merk',
      noteE: 'Etter «je» ender verb på -er med -e. Den -e-en høres ikke.',
      tr_mange: 'Jeg spiser.',
      tr_sandwich: 'Jeg spiser en sandwich.',
      tr_poutine: 'Jeg spiser en poutine.',
      tr_parle: 'Jeg snakker fransk.',
      sens_je: 'jeg',
      sens_mange: 'spise',
      sens_parle: 'snakke',
      sens_un: 'en (maskulint ord)',
      sens_une: 'en (feminint ord)',
      sens_sandwich: 'sandwich',
      sens_poutine: 'poutine (pommes frites, osteklumper og saus)',
      sens_francais: 'det franske språket',
      quipErreur: ['Nesten. Som på fransk, som overalt ellers, betyr «nei».', 'Ta deg tid. Jeg har all min.', 'Interessant. Men nei.'],
      quipOk: ['Sånn.', 'Nettopp.', 'Ikke verst.', 'Vi kommer fremover.'],
      quipUne: 'En «une» poutine, ikke «un». Grammatikken bestemmer, ikke du.',
      quipPoutine: 'Legg merke til entusiasmen hennes. Jeg sier bare det.',
      quipSandwich: 'Hun ser ut til å like sandwichen sin skikkelig godt. Husk det.',
      quipReponse: 'Her er svaret. Ikke si det til noen.',
      quipAccent: 'Nesten! Se på aksentene.',
      quipSansSon: 'Ingen lyd? Her er teksten. Jeg sier ingenting.',
      cult_titre: 'Visste du at …?',
      cult_sandwich: 'Ifølge legenden kommer ordet «sandwich» fra en engelsk jarl som spiste kjøttet sitt mellom to brødskiver for ikke å forlate kortspillet.',
      cult_poutine: 'Poutine består av pommes frites, osteklumper (som «knirker» mellom tennene) og brun saus. Den oppstod i Québec på slutten av 1950-tallet, og flere landsbyer krangler om æren.',
      fin: 'Minnet er gjenopprettet. Nå kan du si hva du spiser. Det du ikke spiser … kommer senere.'
    },
    ru: {
      titre: 'Первое воспоминание',
      quitter: 'Выйти из воспоминания',
      son: 'Звук',
      suite: 'Далее',
      continuer: 'Продолжить',
      valider: 'Проверить',
      intro: 'Вот. Это воспоминание немного повреждено, но несколько слов из него мы вытащить сможем.',
      c_mange: 'Нажимай на слова, чтобы их услышать.',
      c_lire: 'Нажимай на слова, чтобы услышать их и увидеть значение.',
      c_ordre: 'Воспоминание стирается… Верни слова в правильный порядок.',
      c_ecrire_part: 'Впиши недостающие слова.',
      c_ecrire: 'Напиши предложение по-французски.',
      c_image: 'Ты — Bek. Что ты делаешь сейчас?',
      c_audio: 'Послушай и выбери правильные слова.',
      reecouter: 'Послушать ещё раз',
      sans_son: 'Я ничего не слышу',
      construire_vide: 'Нажимай на слова, чтобы составить своё предложение.',
      role_s: 'подлежащее',
      role_v: 'глагол',
      role_o: 'дополнение',
      genre_m: 'мужской род',
      genre_f: 'женский род',
      noteE_titre: 'Заметка',
      noteE: 'После «je» глаголы на -er оканчиваются на -e. Это -e не произносится.',
      tr_mange: 'Я ем.',
      tr_sandwich: 'Я ем бутерброд.',
      tr_poutine: 'Я ем poutine.',
      tr_parle: 'Я говорю по-французски.',
      sens_je: 'я',
      sens_mange: 'есть (кушать)',
      sens_parle: 'говорить',
      sens_un: 'один (слово мужского рода)',
      sens_une: 'одна (слово женского рода)',
      sens_sandwich: 'бутерброд',
      sens_poutine: 'poutine (картофель фри, сырные гранулы и соус)',
      sens_francais: 'французский язык',
      quipErreur: ['Почти. Что по-французски, как и везде, означает «нет».', 'Не торопись. У меня времени сколько угодно.', 'Интересно. Но нет.'],
      quipOk: ['Вот так.', 'Именно.', 'Совсем неплохо.', 'Мы продвигаемся.'],
      quipUne: 'Poutine — «une», а не «un». Решает грамматика, а не ты.',
      quipPoutine: 'Обрати внимание на её энтузиазм. Я просто говорю.',
      quipSandwich: 'Кажется, ей очень нравится её бутерброд. Запомни это.',
      quipReponse: 'Вот ответ. Никому не рассказывай.',
      quipAccent: 'Почти! Посмотри на ударения и значки.',
      quipSansSon: 'Нет звука? Вот текст. Я ничего не скажу.',
      cult_titre: 'Знаешь ли ты?',
      cult_sandwich: 'Согласно легенде, слово «sandwich» пришло от английского графа, который ел мясо между двумя ломтями хлеба, чтобы не отрываться от карточной игры.',
      cult_poutine: 'Poutine состоит из картофеля фри, сырных гранул (которые «скрипят» на зубах) и коричневого соуса. Блюдо появилось в Квебеке в конце 1950-х, и несколько городков спорят за честь его изобретения.',
      fin: 'Воспоминание восстановлено. Теперь ты умеешь сказать, что ты ешь. А чего ты не ешь… это потом.'
    }
  };

  const DESSINS = {   // vignettes provisoires (traits à la main, sans emoji)
    sandwich: '<path d="M10 38c0-12 12-20 30-20s30 8 30 20c0 3-2 4-4 4H14c-2 0-4-1-4-4Z" fill="#F2C98B"/><path d="M12 46c10 3 14-3 22 0s12-3 22 0 10-2 12 0v4H12Z" fill="#8DBF6A"/><path d="M12 53c8 3 16 0 26 2s18 0 28-2v6c0 3-2 5-5 5H17c-3 0-5-2-5-5Z" fill="#F2C98B"/><path d="M10 38c0-12 12-20 30-20s30 8 30 20M12 46c10 3 14-3 22 0s12-3 22 0 10-2 12 0M12 53v6c0 3 2 5 5 5h46c3 0 5-2 5-5v-6" fill="none" stroke="#4A3B33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    poutine: '<path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="#F7F1E8"/><path d="M14 42l6-18 5 17 7-20 5 19 7-17 4 17 6-14 3 16Z" fill="#F0C75E"/><path d="M12 42c6 4 10-2 16 1s10-3 16 0 10-2 16 0 8-1 10 0c-2 6-8 8-20 8s-30 0-38-9Z" fill="#8A5A3C"/><circle cx="26" cy="38" r="4" fill="#FFF6D8"/><circle cx="42" cy="36" r="4.5" fill="#FFF6D8"/><circle cx="56" cy="39" r="3.5" fill="#FFF6D8"/><path d="M8 40h64c0 14-12 26-32 26S8 54 8 40Z" fill="none" stroke="#4A3B33" stroke-width="3" stroke-linejoin="round"/>'
  };

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function melanger(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function normaliser(s) { return String(s || '').toLowerCase().replace(/[.!?¡¿,;:«»"]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function sansAccents(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function lireSon() { try { return localStorage.getItem(CLE_SON) !== '0'; } catch (e) { return true; } }
  function precharger(noms, urlDe) {
    const etat = {};
    const toutes = Promise.all(noms.map(function (nom) {
      return new Promise(function (resolve) {
        const img = new Image();
        img.onload = function () { etat[nom] = true; resolve(); };
        img.onerror = function () { etat[nom] = false; resolve(); };
        img.src = urlDe(nom);
      });
    }));
    const delaiMax = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    return Promise.race([toutes, delaiMax]).then(function () { return etat; });
  }

  function demarrer(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) { console.warn('sequence-m1 : conteneur introuvable (' + idConteneur + ').'); return { arreter: function () {} }; }

    const langue = langueActuelle(options);
    function T(cle) {
      const v = (DICO[langue] && DICO[langue][cle]);
      if (v !== undefined && v !== null) return v;
      return (DICO.en && DICO.en[cle] !== undefined ? DICO.en[cle] : (DICO.fr && DICO.fr[cle])) || '';
    }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});

    let arrete = false;
    const minuteurs = [];
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    const scene = document.createElement('div');
    scene.className = 'rbek-scene m1-scene';
    let segments = '';
    for (let i = 0; i < ETAPES_TOTAL; i++) segments += '<span class="m1-segment"></span>';
    scene.innerHTML =
      '<button type="button" class="m1-quitter" aria-label="' + echapper(T('quitter')) + '">&#8249;</button>' +
      '<button type="button" class="m1-son" aria-label="' + echapper(T('son')) + '" aria-pressed="true">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path class="m1-son-ondes" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg></button>' +
      '<div class="m1-disposition">' +
        '<div class="m1-col-gauche">' +
          '<div class="m1-carte">' +
            '<div class="m1-progres" aria-hidden="true">' + segments + '</div>' +
            '<p class="m1-consigne" role="status"></p>' +
            '<div class="m1-zone"></div>' +
            '<div class="m1-actions"></div>' +
          '</div>' +
          '<div class="m1-lect m1-off">' +
            '<div class="lect-lecteur-bulle m1-lect-bulle" role="status">' +
              '<p class="lect-lecteur-texte m1-lect-texte"></p>' +
              '<button type="button" class="lect-btn m1-lect-suite">' + echapper(T('suite')) + '</button>' +
            '</div>' +
            '<div class="lect-lecteur m1-lect-icone">' + iconeLecteur + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="m1-col-bek">' +
          '<div class="m1-bek"><div class="rbek-bek m1-calque"></div></div>' +
          '<div class="m1-vignette m1-off" aria-hidden="true"></div>' +
        '</div>' +
      '</div>';
    conteneur.innerHTML = '';
    conteneur.appendChild(scene);
    planifier(function () { scene.classList.add('rbek-prete'); }, 30);

    const q = function (s) { return scene.querySelector(s); };
    const elConsigne = q('.m1-consigne'), zone = q('.m1-zone'), actions = q('.m1-actions');
    const lectZone = q('.m1-lect'), lectTexte = q('.m1-lect-texte'), lectSuite = q('.m1-lect-suite');
    const calque = q('.m1-calque'), vignette = q('.m1-vignette');
    const segs = scene.querySelectorAll('.m1-segment');
    const boutonSon = q('.m1-son');

    // ---------- Voix : audio/fr/<id>.mp3, sinon la synthèse du navigateur ----------
    const son = { actif: lireSon() };
    const dispoAudio = {};
    function reglerBoutonSon() { boutonSon.setAttribute('aria-pressed', son.actif ? 'true' : 'false'); boutonSon.classList.toggle('m1-son-coupe', !son.actif); }
    reglerBoutonSon();
    boutonSon.addEventListener('click', function () {
      son.actif = !son.actif;
      try { localStorage.setItem(CLE_SON, son.actif ? '1' : '0'); } catch (e) {}
      if (!son.actif) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
      reglerBoutonSon();
    });
    function synthese(texte) {
      try {
        const ss = window.speechSynthesis;
        if (!ss || !window.SpeechSynthesisUtterance) return;
        const u = new window.SpeechSynthesisUtterance(texte);
        u.lang = options.voixLangue || 'fr-CA';
        u.rate = 0.85;
        u.pitch = 1.1;
        const voix = ss.getVoices ? ss.getVoices() : [];
        const fr = voix.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf('fr') === 0; });
        const choisie = fr.filter(function (v) { return v.lang.toLowerCase().replace('_', '-') === 'fr-ca'; })[0] || fr[0];
        if (choisie) u.voice = choisie;
        ss.cancel();
        ss.speak(u);
      } catch (e) {}
    }
    function dire(id, texte) {
      if (!son.actif) return;
      if (dispoAudio[id] === false) { synthese(texte); return; }
      let repli = false;
      function secours() { if (repli) return; repli = true; dispoAudio[id] = false; synthese(texte); }
      try {
        const a = new Audio((options.dossierAudio || 'audio/fr/') + id + '.mp3');
        a.addEventListener('error', secours, { once: true });
        const p = a.play();
        if (p && p.then) p.then(function () { dispoAudio[id] = true; }).catch(function () { if (dispoAudio[id] !== true) secours(); });
      } catch (e) { secours(); }
    }
    const direMot = function (id) { dire(id, AFFICHE[id]); };
    const direPhrase = function (ph) { dire(ph.audio, ph.texte); };

    // ---------- Bek : poses, avec repli tant qu'une image manque ----------
    const poses = {}, manquantes = {};
    let courante = null, niveau = 1;
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) { manquantes[nom] = true; return; }
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = sources[nom];
        calque.appendChild(img);
        poses[nom] = img;
      });
    }
    function montrer(nom) {
      const reelle = poses[nom] ? nom : (POSE_DE_REPLI[nom] || 'bek-observe');
      const cible = poses[reelle] || poses['bek-observe'];
      // vignette dessinée : seulement tant que la vraie image de Bek qui mange est absente
      const dessin = VIGNETTE_DE[nom];
      if (dessin && !poses[nom]) {
        vignette.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true">' + DESSINS[dessin] + '</svg>';
        vignette.classList.remove('m1-off');
      } else vignette.classList.add('m1-off');
      if (!cible || cible === courante) return;
      const ancienne = courante;
      const ms = (reduit || !ancienne) ? 0 : 180;
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms === 0) { ancienne.classList.remove('rbek-pose-visible'); return; }
      planifier(function () {
        if (ancienne === courante) return;
        ancienne.style.transitionDuration = '0ms';
        ancienne.classList.remove('rbek-pose-visible');
      }, ms + 30);
    }

    // ---------- Bek mange (boucle d'images) et Bek parle (bouche ouverte) ----------
    function mouvementReduit() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    function bouclePrete(cle) {
      const m = MANGER[cle];
      return !!(m && poses[m.bouchee] && m.mastique.every(function (n) { return poses[n]; }));
    }
    let jetonManger = 0;
    function pause(ms) { return new Promise(function (resolve) { planifier(resolve, ms); }); }   // durée réelle (pas raccourcie)
    // cycles : nombre de passages (absent = en boucle jusqu'à l'arrêt). Renvoie la fonction d'arrêt.
    function animerManger(cle, cycles) {
      const m = MANGER[cle];
      if (!m || mouvementReduit() || !bouclePrete(cle)) return function () {};
      const jeton = ++jetonManger;
      (async function boucle() {
        let n = 0;
        while (jeton === jetonManger && !arrete && (cycles === undefined || n < cycles)) {
          await pause(m.pause); if (jeton !== jetonManger) return;
          montrer(m.bouchee); await pause(m.msBouchee);
          for (let t = 0; t < m.tours * 2 && jeton === jetonManger; t++) { montrer(m.mastique[t % 2]); await pause(m.msMastique); }
          if (jeton !== jetonManger) return;
          montrer(m.base); n++;
        }
      })();
      return function () { if (jeton === jetonManger) jetonManger++; montrer(m.base); };
    }
    async function bekDit(cle, ms) {      // bouche ouverte le temps de dire la phrase (si l'image existe)
      const m = MANGER[cle];
      if (!m || !poses[m.ouverte]) return;
      montrer(m.ouverte); await attendre(ms || 1500); montrer(m.base);
    }

    // ---------- Le Lecteur : indices, piques ----------
    let lectMinuteur = null;
    function lecteurAfficher(texte, avecSuite) {
      if (lectMinuteur) { clearTimeout(lectMinuteur); lectMinuteur = null; }
      lectTexte.textContent = texte;
      lectSuite.classList.toggle('m1-off', !avecSuite);
      q('.m1-lect-bulle').classList.toggle('m1-sans-suite', !avecSuite);
      lectZone.classList.remove('m1-off');
      planifier(function () { lectZone.classList.add('m1-lect-visible'); }, 30);
    }
    function lecteurMasquer() {
      lectZone.classList.remove('m1-lect-visible');
      lectMinuteur = setTimeout(function () { if (!arrete) lectZone.classList.add('m1-off'); }, 450);
      minuteurs.push(lectMinuteur);
    }
    function lecteurDit(texte) {          // avec « Suite » : l'élève lit à son rythme
      return new Promise(function (resolve) {
        lecteurAfficher(texte, true);
        lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); };
      });
    }
    function lecteurIndice(texte, ms) {   // sans « Suite » : se retire tout seul
      lecteurAfficher(texte, false);
      lectMinuteur = setTimeout(function () { if (!arrete) lecteurMasquer(); }, ms || 4500);
      minuteurs.push(lectMinuteur);
    }
    function auHasard(liste) { return liste[Math.floor(Math.random() * liste.length)]; }

    // ---------- Aides d'affichage ----------
    function consigne(txt) { elConsigne.textContent = txt; }
    function vider() { zone.innerHTML = ''; actions.innerHTML = ''; zone.removeAttribute('data-mode'); zone.removeAttribute('data-phrase'); }
    function etape(n) { Array.prototype.forEach.call(segs, function (s, i) { s.classList.toggle('m1-segment-fait', i < n); }); }
    function boutonAction(label, clair) {
      return new Promise(function (resolve) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'lect-btn m1-btn' + (clair ? ' lect-btn-clair' : '');
        b.textContent = label;
        b.addEventListener('click', function () { b.disabled = true; resolve(); });
        actions.appendChild(b);
      });
    }
    function groupes(phrase) {   // [{role, mots:[id…]}] : sujet / verbe / objet (article + nom = un seul objet)
      const g = [];
      phrase.mots.forEach(function (id) {
        const r = ROLE[id];
        if (g.length && g[g.length - 1].role === r) g[g.length - 1].mots.push(id);
        else g.push({ role: r, mots: [id] });
      });
      return g;
    }
    function tuile(id, classe) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'm1-tuile m1-role-' + ROLE[id] + (classe ? ' ' + classe : '');
      b.setAttribute('data-id', id);
      b.textContent = AFFICHE[id];
      return b;
    }
    function ligneGroupes(phrase, remplisseur) {
      const ligne = document.createElement('div');
      ligne.className = 'm1-phrase';
      groupes(phrase).forEach(function (g) {
        const bloc = document.createElement('div');
        bloc.className = 'm1-groupe';
        const lib = document.createElement('span');
        lib.className = 'm1-role m1-role-' + g.role;
        lib.textContent = T('role_' + g.role);
        const rang = document.createElement('div');
        rang.className = 'm1-rang';
        g.mots.forEach(function (id) { rang.appendChild(remplisseur(id)); });
        bloc.appendChild(lib);
        bloc.appendChild(rang);
        ligne.appendChild(bloc);
      });
      const point = document.createElement('span');
      point.className = 'm1-point';
      point.textContent = '.';
      ligne.appendChild(point);
      return ligne;
    }
    function ligneTraduction(phrase) {
      const t = T(phrase.tr);
      if (!t) return null;
      const p = document.createElement('p');
      p.className = 'm1-trad';
      p.textContent = t;
      return p;
    }
    function secouer(el) {
      if (!el || reduit) return;
      el.classList.remove('m1-secoue'); void el.offsetWidth; el.classList.add('m1-secoue');
    }

    // ---------- 1. Lecture : on touche les mots (voix + sens) ----------
    async function lecture(phrase, cle) {
      vider();
      zone.setAttribute('data-mode', 'lecture'); zone.setAttribute('data-phrase', cle);
      const touches = {};
      const sens = document.createElement('p');
      sens.className = 'm1-sens';
      sens.innerHTML = '&nbsp;';
      const ligne = ligneGroupes(phrase, function (id) {
        const b = tuile(id, 'm1-tuile-lue');
        b.addEventListener('click', function () {
          direMot(id);
          touches[id] = true;
          Array.prototype.forEach.call(ligne.querySelectorAll('.m1-tuile'), function (t) { t.classList.toggle('m1-tuile-choisie', t === b); });
          sens.textContent = AFFICHE[id] + ' = ' + T('sens_' + id);
          if (phrase.mots.every(function (m) { return touches[m]; })) ouvrirSuite();
        });
        return b;
      });
      zone.appendChild(ligne);
      const nom = phrase.mots[phrase.mots.length - 1];
      if (GENRE[nom]) {
        const badge = document.createElement('p');
        badge.className = 'm1-genre';
        badge.textContent = AFFICHE[nom] + ' : ' + T(GENRE[nom]);
        zone.appendChild(badge);
      }
      const tr = ligneTraduction(phrase);
      if (tr) zone.appendChild(tr);
      zone.appendChild(sens);
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      function ouvrirSuite() {
        if (actions.firstChild) return;
        boutonAction(T('continuer')).then(fini);
      }
      await attendre(300);
      direPhrase(phrase);
      await promesse;
    }

    // ---------- 2. Ordre : le souvenir s'efface, on replace les mots ----------
    async function ordre(phrase, cle, distracteurs) {
      vider();
      zone.setAttribute('data-mode', 'ordre'); zone.setAttribute('data-phrase', cle);
      const cases = [];
      const ligne = ligneGroupes(phrase, function () {
        const c = document.createElement('span');
        c.className = 'm1-case';
        cases.push(c);
        return c;
      });
      zone.appendChild(ligne);
      const plateau = document.createElement('div');
      plateau.className = 'm1-plateau';
      zone.appendChild(plateau);
      let suivant = 0, erreurs = 0, verrou = false;
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      melanger(phrase.mots.concat(distracteurs || [])).forEach(function (id) {
        const t = tuile(id);
        t.addEventListener('click', function () {
          if (verrou || t.classList.contains('m1-tuile-partie')) return;
          const attendu = phrase.mots[suivant];
          if (id === attendu) {
            t.classList.add('m1-tuile-partie');
            Array.prototype.forEach.call(plateau.querySelectorAll('.m1-indice'), function (x) { x.classList.remove('m1-indice'); });
            const c = cases[suivant];
            c.className = 'm1-case m1-case-pleine m1-role-' + ROLE[id];
            c.textContent = AFFICHE[id];
            direMot(id);
            suivant++;
            erreurs = 0;
            if (suivant === phrase.mots.length) {
              verrou = true;
              planifier(function () { direPhrase(phrase); lecteurIndice(auHasard(T('quipOk')), 2200); }, 400);
              planifier(fini, 1300);
            }
          } else {
            erreurs++;
            secouer(t);
            lecteurIndice(id === 'un' && attendu === 'une' ? T('quipUne') : auHasard(T('quipErreur')), 4200);
            if (erreurs >= 2) {      // la bonne tuile se met à briller
              const bonne = plateau.querySelector('.m1-tuile[data-id="' + attendu + '"]:not(.m1-tuile-partie)');
              if (bonne) bonne.classList.add('m1-indice');
            }
          }
        });
        plateau.appendChild(t);
      });
      await promesse;
    }

    // ---------- 3. Écriture : quelques mots (cloze) ou la phrase entière ----------
    async function ecrire(phrase, cle, manquants, sansTraduction) {
      vider();
      zone.setAttribute('data-mode', 'ecrire'); zone.setAttribute('data-phrase', cle);
      const cloze = !!manquants;
      const champs = [];
      let champPhrase = null;
      if (!sansTraduction) { const tr = ligneTraduction(phrase); if (tr) zone.appendChild(tr); }
      if (cloze) {
        let rang = 0;
        const ligne = ligneGroupes(phrase, function (id) {
          const idx = rang++;
          if (manquants.indexOf(idx) === -1) { const s = tuile(id, 'm1-tuile-donnee'); s.disabled = true; return s; }
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.className = 'm1-champ m1-role-' + ROLE[id];
          inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false;
          inp.setAttribute('data-idx', String(idx));
          inp.size = Math.max(AFFICHE[id].length, 4);
          champs.push(inp);
          return inp;
        });
        zone.appendChild(ligne);
      } else {
        champPhrase = document.createElement('input');
        champPhrase.type = 'text';
        champPhrase.className = 'm1-champ m1-champ-phrase';
        champPhrase.setAttribute('autocomplete', 'off'); champPhrase.setAttribute('autocapitalize', 'sentences'); champPhrase.setAttribute('autocorrect', 'off'); champPhrase.spellcheck = false;
        zone.appendChild(champPhrase);
      }
      const indice = document.createElement('p');
      indice.className = 'm1-sens';
      indice.innerHTML = '&nbsp;';
      zone.appendChild(indice);
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bValider = document.createElement('button');
      bValider.type = 'button'; bValider.className = 'lect-btn m1-btn'; bValider.textContent = T('valider');
      actions.appendChild(bValider);
      let erreurs = 0, termine = false;

      function termineBien() {
        termine = true;
        bValider.disabled = true;
        direPhrase(phrase);
        lecteurIndice(auHasard(T('quipOk')), 2200);
        planifier(fini, 1300);
      }
      function verifier() {
        if (termine) return;
        let toutBon = true, seulementAccents = true;
        if (cloze) {
          champs.forEach(function (c) {
            const attendu = phrase.mots[Number(c.getAttribute('data-idx'))];
            const donne = normaliser(c.value);
            const bon = donne === AFFICHE[attendu];
            c.classList.toggle('m1-ok', bon); c.classList.toggle('m1-ko', !bon);
            if (!bon) { toutBon = false; if (sansAccents(donne) !== sansAccents(AFFICHE[attendu])) seulementAccents = false; }
          });
        } else {
          const donne = normaliser(champPhrase.value);
          const attendu = normaliser(phrase.texte);
          toutBon = donne === attendu;
          if (!toutBon) seulementAccents = sansAccents(donne) === sansAccents(attendu);
          champPhrase.classList.toggle('m1-ok', toutBon); champPhrase.classList.toggle('m1-ko', !toutBon);
        }
        if (toutBon) { termineBien(); return; }
        if (seulementAccents) { lecteurIndice(T('quipAccent'), 4200); return; }   // pas une vraie erreur
        erreurs++;
        secouer(cloze ? champs[0].parentNode : champPhrase);
        lecteurIndice(auHasard(T('quipErreur')), 4200);
        if (erreurs === 2) {             // indice : les premières lettres
          indice.textContent = phrase.mots.map(function (id) { return AFFICHE[id].charAt(0) + '…'; }).join(' ');
        }
        if (erreurs >= 3) {              // la réponse apparaît ; on ne bloque pas l'élève
          termine = true;
          bValider.disabled = true;
          if (cloze) champs.forEach(function (c) { c.value = AFFICHE[phrase.mots[Number(c.getAttribute('data-idx'))]]; c.classList.add('m1-ok'); c.classList.remove('m1-ko'); });
          else { champPhrase.value = phrase.texte; champPhrase.classList.add('m1-ok'); champPhrase.classList.remove('m1-ko'); }
          lecteurIndice(T('quipReponse'), 4200);
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      }
      bValider.addEventListener('click', verifier);
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verifier(); } });
      const premier = cloze ? champs[0] : champPhrase;
      planifier(function () { try { premier.focus(); } catch (e) {} }, 200);
      await promesse;
    }

    // ---------- 4-6. Construire une phrase libre à partir d'une banque de mots ----------
    async function construire(phrase, cle, options2) {
      options2 = options2 || {};
      vider();
      zone.setAttribute('data-mode', 'construire'); zone.setAttribute('data-phrase', cle);
      const plateauPhrase = document.createElement('div');
      plateauPhrase.className = 'm1-construction';
      const vide = document.createElement('span');
      vide.className = 'm1-construction-vide';
      vide.textContent = T('construire_vide');
      plateauPhrase.appendChild(vide);
      zone.appendChild(plateauPhrase);
      const banque = document.createElement('div');
      banque.className = 'm1-plateau';
      zone.appendChild(banque);
      const choisis = [];          // ids dans l'ordre
      let erreurs = 0, termine = false;
      let fini;
      const promesse = new Promise(function (resolve) { fini = resolve; });
      const bValider = document.createElement('button');
      bValider.type = 'button'; bValider.className = 'lect-btn m1-btn'; bValider.textContent = T('valider');
      bValider.disabled = true;
      actions.appendChild(bValider);

      function rafraichir() {
        plateauPhrase.innerHTML = '';
        if (!choisis.length) plateauPhrase.appendChild(vide);
        choisis.forEach(function (id, i) {
          const t = tuile(id, 'm1-tuile-posee');
          t.addEventListener('click', function () {
            if (termine) return;
            choisis.splice(i, 1);
            const orig = banque.querySelector('.m1-tuile[data-id="' + id + '"].m1-tuile-partie');
            if (orig) orig.classList.remove('m1-tuile-partie');
            rafraichir();
          });
          plateauPhrase.appendChild(t);
        });
        bValider.disabled = termine || !choisis.length;
      }
      melanger(options2.banque || BANQUE_LIBRE).forEach(function (id) {
        const t = tuile(id);
        t.addEventListener('click', function () {
          if (termine || t.classList.contains('m1-tuile-partie')) return;
          t.classList.add('m1-tuile-partie');
          t.classList.remove('m1-indice');
          choisis.push(id);
          if (options2.direAuClic !== false) direMot(id);
          rafraichir();
        });
        banque.appendChild(t);
      });
      bValider.addEventListener('click', function () {
        if (termine) return;
        const bon = choisis.length === phrase.mots.length && choisis.every(function (id, i) { return id === phrase.mots[i]; });
        if (bon) {
          termine = true; bValider.disabled = true;
          plateauPhrase.classList.add('m1-ok');
          direPhrase(phrase);
          lecteurIndice(auHasard(T('quipOk')), 2200);
          planifier(fini, 1400);
          return;
        }
        erreurs++;
        secouer(plateauPhrase);
        const uneMalPlacee = phrase.mots.indexOf('une') !== -1 && choisis.indexOf('un') !== -1;
        lecteurIndice(uneMalPlacee ? T('quipUne') : auHasard(T('quipErreur')), 4200);
        if (erreurs >= 3) {          // on montre la bonne phrase, sans bloquer
          termine = true; bValider.disabled = true;
          choisis.length = 0;
          Array.prototype.forEach.call(banque.querySelectorAll('.m1-tuile'), function (t) { t.classList.remove('m1-tuile-partie'); });
          phrase.mots.forEach(function (id) {
            choisis.push(id);
            const orig = banque.querySelector('.m1-tuile[data-id="' + id + '"]:not(.m1-tuile-partie)');
            if (orig) orig.classList.add('m1-tuile-partie');
          });
          rafraichir();
          bValider.disabled = true;
          lecteurIndice(T('quipReponse'), 4200);
          direPhrase(phrase);
          boutonAction(T('continuer')).then(fini);
        }
      });
      rafraichir();
      await promesse;
    }

    // ---------- Carte « Savais-tu ? » / remarque ----------
    async function carte(titre, texte, visuel) {
      vider();
      zone.setAttribute('data-mode', 'carte');
      const c = document.createElement('div');
      c.className = 'm1-note';
      if (visuel) c.appendChild(visuel);
      const h = document.createElement('p'); h.className = 'm1-note-titre'; h.textContent = titre;
      const p = document.createElement('p'); p.className = 'm1-note-texte'; p.textContent = texte;
      c.appendChild(h); c.appendChild(p);
      zone.appendChild(c);
      await boutonAction(T('continuer'));
    }
    function pairesE() {          // parl|e  mang|e : le -e est surligné
      const d = document.createElement('div');
      d.className = 'm1-paire';
      [['parl', 'e'], ['mang', 'e']].forEach(function (p) {
        const s = document.createElement('span');
        s.className = 'm1-radical';
        s.innerHTML = '<b>je</b> ' + echapper(p[0]) + '<i>' + echapper(p[1]) + '</i>';
        d.appendChild(s);
      });
      return d;
    }

    // ---------- Les étapes ----------
    async function etapeMange() {
      etape(0); montrer('bek-observe');
      consigne(T('c_mange'));
      await lecture(PHRASES.mange, 'mange');
      await carte(T('noteE_titre'), T('noteE'), pairesE());
    }
    async function etapePhrase(cle, n) {
      etape(n);
      const ph = PHRASES[cle];
      montrer(cle === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      animerManger(cle, 1);                 // un seul cycle : elle mange pendant qu'on lit, puis pose fixe
      consigne(T('c_lire'));
      planifier(function () { lecteurIndice(cle === 'sandwich' ? T('quipSandwich') : T('quipPoutine'), 6000); }, 1500);
      await lecture(ph, cle);
      consigne(T('c_ordre'));
      await ordre(ph, cle, cle === 'poutine' ? ['un'] : []);
      consigne(cle === 'sandwich' ? T('c_ecrire_part') : T('c_ecrire'));
      await ecrire(ph, cle, cle === 'sandwich' ? [1, 3] : null);
      await carte(T('cult_titre'), T('cult_' + cle));
    }
    async function etapeImage(cle, n) {
      etape(n);
      montrer(cle === 'sandwich' ? 'bek-mange-sandwich' : 'bek-mange-poutine');
      consigne(T('c_image'));
      const arreter = animerManger(cle);    // elle mange en boucle tant que l'élève cherche
      if (cle === 'sandwich') await construire(PHRASES.sandwich, 'image-sandwich');
      else await ecrire(PHRASES.poutine, 'image-poutine', null, true);
      arreter();
      await bekDit(cle, 1500);              // bonne réponse : elle dit la phrase (bouche ouverte)
    }
    // ---------- Exercice audio : écoute avant de construire ----------
    // (surcharge de construire pour l'étape 6 : bouton « écouter » + texte révélable)
    const construireSimple = construire;
    async function construireAudio(phrase, cle) {
      const entete = document.createElement('div');
      entete.className = 'm1-ecoute';
      const bEcoute = document.createElement('button');
      bEcoute.type = 'button'; bEcoute.className = 'm1-haut-parleur'; bEcoute.setAttribute('aria-label', T('reecouter'));
      bEcoute.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg><span>' + echapper(T('reecouter')) + '</span>';
      bEcoute.addEventListener('click', function () { direPhrase(phrase); });
      const lienTexte = document.createElement('button');
      lienTexte.type = 'button'; lienTexte.className = 'm1-lien'; lienTexte.textContent = T('sans_son');
      const texteRevele = document.createElement('p');
      texteRevele.className = 'm1-texte-revele m1-off';
      texteRevele.textContent = phrase.texte;
      lienTexte.addEventListener('click', function () { texteRevele.classList.remove('m1-off'); lecteurIndice(T('quipSansSon'), 3500); });
      entete.appendChild(bEcoute); entete.appendChild(lienTexte); entete.appendChild(texteRevele);
      const attente = construireSimple(phrase, cle, { direAuClic: false });
      zone.insertBefore(entete, zone.firstChild);     // construire() vient de remplir la zone (synchrone jusqu'au premier await)
      planifier(function () { direPhrase(phrase); }, 400);
      await attente;
    }

    async function fin() {
      etape(ETAPES_TOTAL);
      montrer('bek-heureuse-ferme');
      try {
        const banque = window.KebBekMots;
        if (banque && typeof banque.ajouter === 'function') {
          const p = banque.ajouter(MOTS_APPRIS);       // pas de await : la sortie ne dépend pas du réseau
          if (p && typeof p.catch === 'function') p.catch(function (e) { console.warn('sequence-m1 : mots non enregistrés.', e); });
        }
      } catch (e) { console.warn('sequence-m1 : mots non enregistrés.', e); }
      vider();
      consigne('');
      await lecteurDit(T('fin'));
      await attendre(300);
      if (typeof callbacks.onTermine === 'function') {
        try { callbacks.onTermine({ mots: MOTS_APPRIS.slice(), fragments: 1 }); } catch (e) { console.warn('onTermine a échoué.', e); }
      }
    }

    async function deroule() {
      await attendre(500);
      lecteurAfficher(T('intro'), true);
      montrer('bek-observe');
      await new Promise(function (resolve) { lectSuite.onclick = function () { lectSuite.onclick = null; lecteurMasquer(); resolve(); }; });
      await etapeMange();
      await etapePhrase('sandwich', 1);
      await etapePhrase('poutine', 2);
      await etapeImage('sandwich', 3);
      await etapeImage('poutine', 4);
      // étape 6 : écoute puis cases (la phrase d'abord, « Je mange. » ensuite, puis la poutine)
      etape(5); montrer('bek-observe'); consigne(T('c_audio'));
      for (const cle of ['parle', 'mange', 'poutine']) await construireAudio(PHRASES[cle], 'audio-' + cle);
      await fin();
    }

    q('.m1-quitter').addEventListener('click', function () {
      if (typeof callbacks.onQuitter === 'function') callbacks.onQuitter();
    });

    // ---------- Lancement ----------
    precharger(POSES, function (nom) { return sources[nom]; }).then(function (etat) {
      if (arrete) return;
      creerPoses(etat);
      deroule().catch(function (e) { console.warn('sequence-m1 interrompue.', e); });
    });

    return {
      arreter: function () {
        arrete = true;
        jetonManger++;
        minuteurs.forEach(clearTimeout);
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  window.KebBekM1 = { demarrer: demarrer, MOTS_APPRIS: MOTS_APPRIS };
})();
