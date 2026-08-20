// ==================================================================
// mot-tooltip.js — fiche de mot enrichie, module partagé pour toute
// leçon de dialogue (dialogue-d1.html aujourd'hui, lecons/*.html à
// venir). Demande de Raphaël (session du 20-08-2026) : remplacer la
// petite bulle de traduction littérale par une vraie fiche —
// traduction littérale + naturelle, phrase d'exemple traduite, et pour
// un verbe conjugué, un détail dépliable (infinitif + mode/temps/
// personne). Plus de lueur pulsée ni de vol vers le sac au double-clic
// (voir .iden-mot dans dialogue-d1.html, obsolète) : le sac se remplit
// maintenant tout seul via la progression, ce module est purement
// informatif.
//
// Dépend de progression.js (chargé AVANT ce fichier) pour le client
// Supabase déjà connecté — voir window.KebBekProgression.client. Pas
// de client Supabase créé ici : "un seul endroit" pour la connexion,
// comme le reste du site.
//
// API PUBLIQUE (window.KebBekMotTooltip) :
//   - creerMotCliquable(texteBrut, chapitreId) → construit les <span
//     class="mtt-mot"> cliquables pour UNE réplique de dialogue (même
//     découpe mot par mot + fusion de la ponctuation isolée que
//     l'ancien construireBulleMots de dialogue-d1.html), déjà câblés
//     au clic. La page hôte n'a plus qu'à vider son conteneur de bulle
//     et y ajouter le fragment retourné.
//   - fermer() → ferme la fiche ouverte, s'il y en a une (utile avant
//     de changer de réplique/étape, pour ne jamais laisser une fiche
//     périmée affichée par-dessus le nouveau texte).
//
// Silencieux si un mot n'est pas encore au dictionnaire (aucune ligne
// mots_occurrences pour ce chapitre) : le mot reste affiché tel quel,
// juste sans devenir cliquable — jamais de fiche vide, même esprit que
// l'ancien "pas de bulle vide si le mot n'est pas encore au
// dictionnaire" de dialogue-d1.html.
// ==================================================================

(function () {

  // Catégorie grammaticale (mots.categorie_grammaticale) traduite dans les
  // 19 langues du site (même liste que TRADUCTIONS/INTERFACE ailleurs sur le
  // site — 'fr' volontairement absent, comme pour le reste du lexique : un
  // apprenant à interface française n'a pas besoin qu'on lui traduise le
  // français vers le français).
  const DICO_CATEGORIE = {
  "nom": {
    "en": "noun",
    "es": "sustantivo",
    "it": "sostantivo",
    "pt": "substantivo",
    "ca": "substantiu",
    "eo": "substantivo",
    "zh": "名词",
    "ja": "名詞",
    "ko": "명사",
    "vi": "danh từ",
    "ht": "non",
    "tl": "pangngalan",
    "id": "kata benda",
    "nl": "zelfstandig naamwoord",
    "de": "Substantiv",
    "fa": "اسم",
    "sv": "substantiv",
    "no": "substantiv",
    "ru": "существительное"
  },
  "verbe": {
    "en": "verb",
    "es": "verbo",
    "it": "verbo",
    "pt": "verbo",
    "ca": "verb",
    "eo": "verbo",
    "zh": "动词",
    "ja": "動詞",
    "ko": "동사",
    "vi": "động từ",
    "ht": "vèb",
    "tl": "pandiwa",
    "id": "kata kerja",
    "nl": "werkwoord",
    "de": "Verb",
    "fa": "فعل",
    "sv": "verb",
    "no": "verb",
    "ru": "глагол"
  },
  "adjectif": {
    "en": "adjective",
    "es": "adjetivo",
    "it": "aggettivo",
    "pt": "adjetivo",
    "ca": "adjectiu",
    "eo": "adjektivo",
    "zh": "形容词",
    "ja": "形容詞",
    "ko": "형용사",
    "vi": "tính từ",
    "ht": "adjektif",
    "tl": "pang-uri",
    "id": "kata sifat",
    "nl": "bijvoeglijk naamwoord",
    "de": "Adjektiv",
    "fa": "صفت",
    "sv": "adjektiv",
    "no": "adjektiv",
    "ru": "прилагательное"
  },
  "adverbe": {
    "en": "adverb",
    "es": "adverbio",
    "it": "avverbio",
    "pt": "advérbio",
    "ca": "adverbi",
    "eo": "adverbo",
    "zh": "副词",
    "ja": "副詞",
    "ko": "부사",
    "vi": "trạng từ",
    "ht": "advèb",
    "tl": "pang-abay",
    "id": "kata keterangan",
    "nl": "bijwoord",
    "de": "Adverb",
    "fa": "قید",
    "sv": "adverb",
    "no": "adverb",
    "ru": "наречие"
  },
  "pronom": {
    "en": "pronoun",
    "es": "pronombre",
    "it": "pronome",
    "pt": "pronome",
    "ca": "pronom",
    "eo": "pronomo",
    "zh": "代词",
    "ja": "代名詞",
    "ko": "대명사",
    "vi": "đại từ",
    "ht": "pwonon",
    "tl": "panghalip",
    "id": "kata ganti",
    "nl": "voornaamwoord",
    "de": "Pronomen",
    "fa": "ضمیر",
    "sv": "pronomen",
    "no": "pronomen",
    "ru": "местоимение"
  },
  "preposition": {
    "en": "preposition",
    "es": "preposición",
    "it": "preposizione",
    "pt": "preposição",
    "ca": "preposició",
    "eo": "prepozicio",
    "zh": "介词",
    "ja": "前置詞",
    "ko": "전치사",
    "vi": "giới từ",
    "ht": "prepozisyon",
    "tl": "pang-ukol",
    "id": "kata depan",
    "nl": "voorzetsel",
    "de": "Präposition",
    "fa": "حرف اضافه",
    "sv": "preposition",
    "no": "preposisjon",
    "ru": "предлог"
  },
  "article": {
    "en": "article",
    "es": "artículo",
    "it": "articolo",
    "pt": "artigo",
    "ca": "article",
    "eo": "artikolo",
    "zh": "冠词",
    "ja": "冠詞",
    "ko": "관사",
    "vi": "mạo từ",
    "ht": "atik",
    "tl": "pantukoy",
    "id": "kata sandang",
    "nl": "lidwoord",
    "de": "Artikel",
    "fa": "حرف تعریف",
    "sv": "artikel",
    "no": "artikkel",
    "ru": "артикль"
  },
  "conjonction": {
    "en": "conjunction",
    "es": "conjunción",
    "it": "congiunzione",
    "pt": "conjunção",
    "ca": "conjunció",
    "eo": "konjunkcio",
    "zh": "连词",
    "ja": "接続詞",
    "ko": "접속사",
    "vi": "liên từ",
    "ht": "konjonksyon",
    "tl": "pangatnig",
    "id": "kata sambung",
    "nl": "voegwoord",
    "de": "Konjunktion",
    "fa": "حرف ربط",
    "sv": "konjunktion",
    "no": "konjunksjon",
    "ru": "союз"
  },
  "interjection": {
    "en": "interjection",
    "es": "interjección",
    "it": "interiezione",
    "pt": "interjeição",
    "ca": "interjecció",
    "eo": "interjekcio",
    "zh": "感叹词",
    "ja": "感嘆詞",
    "ko": "감탄사",
    "vi": "thán từ",
    "ht": "entèjeksyon",
    "tl": "pandamdam",
    "id": "kata seru",
    "nl": "tussenwerpsel",
    "de": "Interjektion",
    "fa": "صوت",
    "sv": "interjektion",
    "no": "interjeksjon",
    "ru": "междометие"
  },
  "nombre": {
    "en": "number",
    "es": "número",
    "it": "numero",
    "pt": "número",
    "ca": "número",
    "eo": "numeralo",
    "zh": "数词",
    "ja": "数詞",
    "ko": "수사",
    "vi": "số từ",
    "ht": "nonm",
    "tl": "bilang",
    "id": "kata bilangan",
    "nl": "telwoord",
    "de": "Zahlwort",
    "fa": "عدد",
    "sv": "räkneord",
    "no": "tallord",
    "ru": "числительное"
  },
  "autre": {
    "en": "other",
    "es": "otro",
    "it": "altro",
    "pt": "outro",
    "ca": "altre",
    "eo": "alia",
    "zh": "其他",
    "ja": "その他",
    "ko": "기타",
    "vi": "khác",
    "ht": "lòt",
    "tl": "iba",
    "id": "lainnya",
    "nl": "overig",
    "de": "Sonstiges",
    "fa": "دیگر",
    "sv": "övrigt",
    "no": "annet",
    "ru": "другое"
  }
};

  // Mode/temps/personne (mots_occurrences.mode/temps/personne) — verbes
  // conjugués uniquement, affiché dans la section "Détails" dépliable.
  const DICO_MODE = {
  "indicatif": {
    "en": "indicative",
    "es": "indicativo",
    "it": "indicativo",
    "pt": "indicativo",
    "ca": "indicatiu",
    "eo": "indikativo",
    "zh": "直陈式",
    "ja": "直説法",
    "ko": "직설법",
    "vi": "lối trình bày",
    "ht": "endikatif",
    "tl": "indikatibo",
    "id": "indikatif",
    "nl": "aantonende wijs",
    "de": "Indikativ",
    "fa": "وجه اخباری",
    "sv": "indikativ",
    "no": "indikativ",
    "ru": "изъявительное наклонение"
  },
  "imperatif": {
    "en": "imperative",
    "es": "imperativo",
    "it": "imperativo",
    "pt": "imperativo",
    "ca": "imperatiu",
    "eo": "imperativo",
    "zh": "命令式",
    "ja": "命令法",
    "ko": "명령법",
    "vi": "lối mệnh lệnh",
    "ht": "enperatif",
    "tl": "utos",
    "id": "imperatif",
    "nl": "gebiedende wijs",
    "de": "Imperativ",
    "fa": "وجه امری",
    "sv": "imperativ",
    "no": "imperativ",
    "ru": "повелительное наклонение"
  },
  "subjonctif": {
    "en": "subjunctive",
    "es": "subjuntivo",
    "it": "congiuntivo",
    "pt": "conjuntivo",
    "ca": "subjuntiu",
    "eo": "subjunktivo",
    "zh": "虚拟式",
    "ja": "接続法",
    "ko": "접속법",
    "vi": "lối giả định",
    "ht": "sibjonktif",
    "tl": "subjuntibo",
    "id": "subjunktif",
    "nl": "aanvoegende wijs",
    "de": "Konjunktiv",
    "fa": "وجه التزامی",
    "sv": "konjunktiv",
    "no": "konjunktiv",
    "ru": "сослагательное наклонение"
  },
  "infinitif": {
    "en": "infinitive",
    "es": "infinitivo",
    "it": "infinito",
    "pt": "infinitivo",
    "ca": "infinitiu",
    "eo": "infinitivo",
    "zh": "不定式",
    "ja": "不定法",
    "ko": "부정법",
    "vi": "nguyên mẫu",
    "ht": "enfinitif",
    "tl": "impinitibo",
    "id": "infinitif",
    "nl": "infinitief",
    "de": "Infinitiv",
    "fa": "مصدر",
    "sv": "infinitiv",
    "no": "infinitiv",
    "ru": "инфинитив"
  },
  "participe": {
    "en": "participle",
    "es": "participio",
    "it": "participio",
    "pt": "particípio",
    "ca": "participi",
    "eo": "participo",
    "zh": "分词",
    "ja": "分詞",
    "ko": "분사",
    "vi": "phân từ",
    "ht": "patisip",
    "tl": "partisipyo",
    "id": "partisipel",
    "nl": "deelwoord",
    "de": "Partizip",
    "fa": "صفت فعلی",
    "sv": "particip",
    "no": "partisipp",
    "ru": "причастие"
  },
  "conditionnel": {
    "en": "conditional",
    "es": "condicional",
    "it": "condizionale",
    "pt": "condicional",
    "ca": "condicional",
    "eo": "kondicionalo",
    "zh": "条件式",
    "ja": "条件法",
    "ko": "조건법",
    "vi": "lối điều kiện",
    "ht": "kondisyonèl",
    "tl": "kondisyonal",
    "id": "kondisional",
    "nl": "voorwaardelijke wijs",
    "de": "Konditional",
    "fa": "وجه شرطی",
    "sv": "konditionalis",
    "no": "konjunktiv II",
    "ru": "условное наклонение"
  }
};
  const DICO_TEMPS = {
  "present": {
    "en": "present",
    "es": "presente",
    "it": "presente",
    "pt": "presente",
    "ca": "present",
    "eo": "prezenco",
    "zh": "现在时",
    "ja": "現在形",
    "ko": "현재형",
    "vi": "thì hiện tại",
    "ht": "prezan",
    "tl": "kasalukuyan",
    "id": "kini",
    "nl": "tegenwoordige tijd",
    "de": "Präsens",
    "fa": "زمان حال",
    "sv": "presens",
    "no": "presens",
    "ru": "настоящее время"
  },
  "passe-compose": {
    "en": "compound past",
    "es": "pretérito perfecto compuesto",
    "it": "passato prossimo",
    "pt": "pretérito perfeito composto",
    "ca": "passat compost",
    "eo": "kunmetita preterito",
    "zh": "复合过去时",
    "ja": "複合過去形",
    "ko": "복합 과거형",
    "vi": "thì quá khứ kép",
    "ht": "pase konpoze",
    "tl": "tambalang nakaraan",
    "id": "lampau majemuk",
    "nl": "voltooid tegenwoordige tijd",
    "de": "passé composé",
    "fa": "ماضی مرکب",
    "sv": "sammansatt perfekt",
    "no": "sammensatt fortid",
    "ru": "сложное прошедшее время"
  },
  "imparfait": {
    "en": "imperfect",
    "es": "pretérito imperfecto",
    "it": "imperfetto",
    "pt": "pretérito imperfeito",
    "ca": "imperfet",
    "eo": "paseo daŭra",
    "zh": "未完成过去时",
    "ja": "半過去形",
    "ko": "반과거형",
    "vi": "thì quá khứ chưa hoàn thành",
    "ht": "enpafè",
    "tl": "di-ganap na nakaraan",
    "id": "lampau tak sempurna",
    "nl": "onvoltooid verleden tijd",
    "de": "Imperfekt",
    "fa": "ماضی استمراری",
    "sv": "imperfekt",
    "no": "imperfektum",
    "ru": "имперфект"
  },
  "futur": {
    "en": "future",
    "es": "futuro",
    "it": "futuro",
    "pt": "futuro",
    "ca": "futur",
    "eo": "futuro",
    "zh": "将来时",
    "ja": "未来形",
    "ko": "미래형",
    "vi": "thì tương lai",
    "ht": "fiti",
    "tl": "panghinaharap",
    "id": "masa depan",
    "nl": "toekomende tijd",
    "de": "Futur",
    "fa": "زمان آینده",
    "sv": "futurum",
    "no": "futurum",
    "ru": "будущее время"
  },
  "futur-proche": {
    "en": "near future",
    "es": "futuro próximo",
    "it": "futuro prossimo",
    "pt": "futuro próximo",
    "ca": "futur pròxim",
    "eo": "proksima futuro",
    "zh": "近将来时",
    "ja": "近接未来形",
    "ko": "근접 미래형",
    "vi": "thì tương lai gần",
    "ht": "fiti prè",
    "tl": "malapit na hinaharap",
    "id": "masa depan dekat",
    "nl": "nabije toekomende tijd",
    "de": "nahe Zukunft",
    "fa": "آینده نزدیک",
    "sv": "nära framtid",
    "no": "nær fremtid",
    "ru": "ближайшее будущее"
  }
};
  const DICO_PERSONNE = {
  "1s": {
    "en": "1st person singular",
    "es": "1.ª persona del singular",
    "it": "1ª persona singolare",
    "pt": "1.ª pessoa do singular",
    "ca": "1a persona del singular",
    "eo": "unua persono singularo",
    "zh": "第一人称单数",
    "ja": "一人称単数",
    "ko": "1인칭 단수",
    "vi": "ngôi thứ nhất số ít",
    "ht": "premye moun siperlatif",
    "tl": "unang panauhan isahan",
    "id": "orang pertama tunggal",
    "nl": "eerste persoon enkelvoud",
    "de": "1. Person Singular",
    "fa": "اول شخص مفرد",
    "sv": "första person singular",
    "no": "første person entall",
    "ru": "1-е лицо единственного числа"
  },
  "2s": {
    "en": "2nd person singular",
    "es": "2.ª persona del singular",
    "it": "2ª persona singolare",
    "pt": "2.ª pessoa do singular",
    "ca": "2a persona del singular",
    "eo": "dua persono singularo",
    "zh": "第二人称单数",
    "ja": "二人称単数",
    "ko": "2인칭 단수",
    "vi": "ngôi thứ hai số ít",
    "ht": "dezyèm moun siperlatif",
    "tl": "ikalawang panauhan isahan",
    "id": "orang kedua tunggal",
    "nl": "tweede persoon enkelvoud",
    "de": "2. Person Singular",
    "fa": "دوم شخص مفرد",
    "sv": "andra person singular",
    "no": "andre person entall",
    "ru": "2-е лицо единственного числа"
  },
  "3s": {
    "en": "3rd person singular",
    "es": "3.ª persona del singular",
    "it": "3ª persona singolare",
    "pt": "3.ª pessoa do singular",
    "ca": "3a persona del singular",
    "eo": "tria persono singularo",
    "zh": "第三人称单数",
    "ja": "三人称単数",
    "ko": "3인칭 단수",
    "vi": "ngôi thứ ba số ít",
    "ht": "twazyèm moun siperlatif",
    "tl": "ikatlong panauhan isahan",
    "id": "orang ketiga tunggal",
    "nl": "derde persoon enkelvoud",
    "de": "3. Person Singular",
    "fa": "سوم شخص مفرد",
    "sv": "tredje person singular",
    "no": "tredje person entall",
    "ru": "3-е лицо единственного числа"
  },
  "1p": {
    "en": "1st person plural",
    "es": "1.ª persona del plural",
    "it": "1ª persona plurale",
    "pt": "1.ª pessoa do plural",
    "ca": "1a persona del plural",
    "eo": "unua persono pluralo",
    "zh": "第一人称复数",
    "ja": "一人称複数",
    "ko": "1인칭 복수",
    "vi": "ngôi thứ nhất số nhiều",
    "ht": "premye moun pliryèl",
    "tl": "unang panauhan maramihan",
    "id": "orang pertama jamak",
    "nl": "eerste persoon meervoud",
    "de": "1. Person Plural",
    "fa": "اول شخص جمع",
    "sv": "första person plural",
    "no": "første person flertall",
    "ru": "1-е лицо множественного числа"
  },
  "2p": {
    "en": "2nd person plural",
    "es": "2.ª persona del plural",
    "it": "2ª persona plurale",
    "pt": "2.ª pessoa do plural",
    "ca": "2a persona del plural",
    "eo": "dua persono pluralo",
    "zh": "第二人称复数",
    "ja": "二人称複数",
    "ko": "2인칭 복수",
    "vi": "ngôi thứ hai số nhiều",
    "ht": "dezyèm moun pliryèl",
    "tl": "ikalawang panauhan maramihan",
    "id": "orang kedua jamak",
    "nl": "tweede persoon meervoud",
    "de": "2. Person Plural",
    "fa": "دوم شخص جمع",
    "sv": "andra person plural",
    "no": "andre person flertall",
    "ru": "2-е лицо множественного числа"
  },
  "3p": {
    "en": "3rd person plural",
    "es": "3.ª persona del plural",
    "it": "3ª persona plurale",
    "pt": "3.ª pessoa do plural",
    "ca": "3a persona del plural",
    "eo": "tria persono pluralo",
    "zh": "第三人称复数",
    "ja": "三人称複数",
    "ko": "3인칭 복수",
    "vi": "ngôi thứ ba số nhiều",
    "ht": "twazyèm moun pliryèl",
    "tl": "ikatlong panauhan maramihan",
    "id": "orang ketiga jamak",
    "nl": "derde persoon meervoud",
    "de": "3. Person Plural",
    "fa": "سوم شخص جمع",
    "sv": "tredje person plural",
    "no": "tredje person flertall",
    "ru": "3-е лицо множественного числа"
  }
};

  // Textes d'interface de la fiche (étiquettes, pas du contenu
  // linguistique) — mêmes 19 langues que le reste du lexique.
  const DICO_MTT = {
  "en": {
    "naturel": "In natural speech",
    "exemple": "Example",
    "details": "Details",
    "infinitif": "Infinitive",
    "fermer": "Close"
  },
  "es": {
    "naturel": "En el habla natural",
    "exemple": "Ejemplo",
    "details": "Detalles",
    "infinitif": "Infinitivo",
    "fermer": "Cerrar"
  },
  "it": {
    "naturel": "Nel parlato naturale",
    "exemple": "Esempio",
    "details": "Dettagli",
    "infinitif": "Infinito",
    "fermer": "Chiudi"
  },
  "pt": {
    "naturel": "Na fala natural",
    "exemple": "Exemplo",
    "details": "Detalhes",
    "infinitif": "Infinitivo",
    "fermer": "Fechar"
  },
  "ca": {
    "naturel": "En el parlar natural",
    "exemple": "Exemple",
    "details": "Detalls",
    "infinitif": "Infinitiu",
    "fermer": "Tanca"
  },
  "eo": {
    "naturel": "En natura parolo",
    "exemple": "Ekzemplo",
    "details": "Detaloj",
    "infinitif": "Infinitivo",
    "fermer": "Fermi"
  },
  "zh": {
    "naturel": "自然说法",
    "exemple": "例句",
    "details": "详情",
    "infinitif": "不定式",
    "fermer": "关闭"
  },
  "ja": {
    "naturel": "自然な言い方",
    "exemple": "例文",
    "details": "詳細",
    "infinitif": "不定法",
    "fermer": "閉じる"
  },
  "ko": {
    "naturel": "자연스러운 표현",
    "exemple": "예문",
    "details": "세부 정보",
    "infinitif": "부정법",
    "fermer": "닫기"
  },
  "vi": {
    "naturel": "Cách nói tự nhiên",
    "exemple": "Ví dụ",
    "details": "Chi tiết",
    "infinitif": "Nguyên mẫu",
    "fermer": "Đóng"
  },
  "ht": {
    "naturel": "Fason natirèl pou di li",
    "exemple": "Egzanp",
    "details": "Detay",
    "infinitif": "Enfinitif",
    "fermer": "Fèmen"
  },
  "tl": {
    "naturel": "Sa natural na pananalita",
    "exemple": "Halimbawa",
    "details": "Mga detalye",
    "infinitif": "Impinitibo",
    "fermer": "Isara"
  },
  "id": {
    "naturel": "Dalam ucapan alami",
    "exemple": "Contoh",
    "details": "Detail",
    "infinitif": "Infinitif",
    "fermer": "Tutup"
  },
  "nl": {
    "naturel": "In natuurlijk taalgebruik",
    "exemple": "Voorbeeld",
    "details": "Details",
    "infinitif": "Infinitief",
    "fermer": "Sluiten"
  },
  "de": {
    "naturel": "Im natürlichen Sprachgebrauch",
    "exemple": "Beispiel",
    "details": "Details",
    "infinitif": "Infinitiv",
    "fermer": "Schließen"
  },
  "fa": {
    "naturel": "در گفتار طبیعی",
    "exemple": "مثال",
    "details": "جزئیات",
    "infinitif": "مصدر",
    "fermer": "بستن"
  },
  "sv": {
    "naturel": "I naturligt tal",
    "exemple": "Exempel",
    "details": "Detaljer",
    "infinitif": "Infinitiv",
    "fermer": "Stäng"
  },
  "no": {
    "naturel": "I naturlig tale",
    "exemple": "Eksempel",
    "details": "Detaljer",
    "infinitif": "Infinitiv",
    "fermer": "Lukk"
  },
  "ru": {
    "naturel": "В естественной речи",
    "exemple": "Пример",
    "details": "Подробнее",
    "infinitif": "Инфинитив",
    "fermer": "Закрыть"
  }
};

  // ================================================================
  // Découpe une réplique en mots cliquables — même logique de fusion
  // de la ponctuation isolée ("Mange\u00A0!" → un seul mot cliquable,
  // pas un "!" à part) que construireBulleMots dans dialogue-d1.html
  // et afficherBulle dans identite-eleve.js. Reprise ici à l'identique
  // plutôt que réappelée depuis dialogue-d1.html : ce module ne doit
  // dépendre d'aucune fonction interne d'une page hôte particulière.
  // ================================================================
  const PONCTUATION_SEULE = /^[.,!?;:'"«»\u2026]+$/;

  function creerMotCliquable(texteBrut, chapitreId) {
    const fragment = document.createDocumentFragment();
    const brutSepares = String(texteBrut).split(/\s+/).filter(Boolean);
    const mots = [];
    brutSepares.forEach(function (tok) {
      if (PONCTUATION_SEULE.test(tok) && mots.length > 0) {
        mots[mots.length - 1] += '\u00A0' + tok;
      } else {
        mots.push(tok);
      }
    });
    mots.forEach(function (motBrut, idx) {
      const span = document.createElement('span');
      span.className = 'mtt-mot';
      span.textContent = motBrut + (idx < mots.length - 1 ? '\u00A0' : '');
      const motNettoye = motBrut.replace(/^[\s.,!?;:'"«»\u2026]+|[\s.,!?;:'"«»\u2026]+$/g, '');
      span.tabIndex = 0;
      span.addEventListener('click', function (e) {
        e.stopPropagation();
        basculerFiche(span, motNettoye, chapitreId);
      });
      span.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); e.stopPropagation();
          basculerFiche(span, motNettoye, chapitreId);
        }
      });
      fragment.appendChild(span);
    });
    return fragment;
  }

  // ================================================================
  // Récupération + cache — une entrée de cache par (mot nettoyé en
  // minuscules, chapitre, langue), jamais réinterrogée deux fois dans
  // la même visite de page.
  // ================================================================
  const cache = new Map();

  async function recupererFiche(mot, chapitreId, langue) {
    const cle = mot.toLowerCase() + '|' + (chapitreId || '') + '|' + langue;
    if (cache.has(cle)) return cache.get(cle);

    const client = window.KebBekProgression && window.KebBekProgression.client;
    if (!client) { console.warn('mot-tooltip.js : progression.js doit être chargé AVANT ce fichier (client Supabase absent).'); return null; }

    // D'abord une correspondance précise sur ce chapitre (une même forme
    // de surface peut avoir un sens différent d'un chapitre à l'autre) ;
    // repli sur n'importe quel chapitre si rien de spécifique n'existe
    // encore, plutôt que de rester silencieux pour un mot qui EST au
    // dictionnaire mais pas encore annoté pour cette leçon précise.
    let occ = null;
    try {
      const { data } = await client
        .from('mots_occurrences')
        .select('id, mot_id, forme_flechie, phrase_exemple, mode, temps, personne, mots(lemme, categorie_grammaticale, genre)')
        .ilike('forme_flechie', mot)
        .eq('chapitre_id', chapitreId || '')
        .limit(1);
      if (data && data.length) occ = data[0];
      if (!occ) {
        const { data: data2 } = await client
          .from('mots_occurrences')
          .select('id, mot_id, forme_flechie, phrase_exemple, mode, temps, personne, mots(lemme, categorie_grammaticale, genre)')
          .ilike('forme_flechie', mot)
          .limit(1);
        if (data2 && data2.length) occ = data2[0];
      }
    } catch (e) {
      console.warn('mot-tooltip.js : échec de la requête mots_occurrences.', e);
    }
    if (!occ) { cache.set(cle, null); return null; }

    const [{ data: traductions }, { data: occTrad }] = await Promise.all([
      client.from('mots_traductions').select('traduction_litterale, traduction_naturelle').eq('mot_id', occ.mot_id).eq('langue', langue).limit(1),
      client.from('mots_occurrences_traductions').select('traduction_phrase').eq('occurrence_id', occ.id).eq('langue', langue).limit(1)
    ]);

    const fiche = {
      formeFlechie: occ.forme_flechie,
      lemme: occ.mots ? occ.mots.lemme : occ.forme_flechie,
      categorie: occ.mots ? occ.mots.categorie_grammaticale : null,
      genre: occ.mots ? occ.mots.genre : null,
      phraseExemple: occ.phrase_exemple,
      mode: occ.mode, temps: occ.temps, personne: occ.personne,
      litterale: traductions && traductions[0] ? traductions[0].traduction_litterale : null,
      naturelle: traductions && traductions[0] ? traductions[0].traduction_naturelle : null,
      phraseTrad: occTrad && occTrad[0] ? occTrad[0].traduction_phrase : null
    };
    cache.set(cle, fiche);
    return fiche;
  }

  // ================================================================
  // Affichage de la carte.
  // ================================================================
  let carteEl = null;
  let ancreActive = null;

  function texteDico(dico, cle, langue) {
    const parLangue = dico[cle];
    if (!parLangue) return cle;
    return parLangue[langue] || parLangue.en || cle;
  }

  function langueActuelle() {
    try {
      const v = localStorage.getItem('kebbek_langue');
      if (v) return v;
    } catch (e) {}
    return 'en';
  }

  function garantirCarte() {
    if (carteEl) return carteEl;
    carteEl = document.createElement('div');
    carteEl.className = 'mtt-carte';
    carteEl.setAttribute('role', 'dialog');
    document.body.appendChild(carteEl);
    carteEl.addEventListener('click', function (e) { e.stopPropagation(); });
    return carteEl;
  }

  function fermer() {
    if (!carteEl) return;
    carteEl.classList.remove('mtt-carte-visible');
    if (ancreActive) ancreActive.classList.remove('mtt-mot-ouvert');
    ancreActive = null;
  }

  document.addEventListener('click', fermer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
  window.addEventListener('scroll', fermer, true);
  window.addEventListener('resize', fermer);

  function positionnerCarte(ancre) {
    const rectAncre = ancre.getBoundingClientRect();
    const rectCarte = carteEl.getBoundingClientRect();
    const marge = 10;
    let top = rectAncre.bottom + marge;
    let auDessus = false;
    if (top + rectCarte.height > window.innerHeight - marge) {
      top = rectAncre.top - rectCarte.height - marge;
      auDessus = true;
      if (top < marge) top = marge; // ni au-dessus ni en dessous ne suffit : on colle en haut du viewport plutôt que de sortir de l'écran
    }
    let left = rectAncre.left + rectAncre.width / 2 - rectCarte.width / 2;
    left = Math.max(marge, Math.min(left, window.innerWidth - rectCarte.width - marge));
    carteEl.style.top = top + 'px';
    carteEl.style.left = left + 'px';
    carteEl.classList.toggle('mtt-carte-au-dessus', auDessus);
  }

  function construireContenuCarte(fiche, langue) {
    const carte = garantirCarte();
    const estConjugue = !!(fiche.mode || fiche.temps || fiche.personne);
    const naturelleDiffere = fiche.naturelle && fiche.naturelle !== fiche.litterale;

    let html = '<button type="button" class="mtt-fermer" aria-label="' + texteDico(DICO_MTT, 'fermer', langue) + '">\u2715</button>';
    html += '<div class="mtt-entete">';
    html += '<span class="mtt-mot-titre">' + escapeHtml(fiche.formeFlechie) + '</span>';
    if (fiche.categorie) html += '<span class="mtt-categorie">' + escapeHtml(texteDico(DICO_CATEGORIE, fiche.categorie, langue)) + '</span>';
    html += '</div>';

    html += '<div class="mtt-corps">';
    if (fiche.litterale) {
      html += '<div class="mtt-ligne-trad"><span class="mtt-ligne-trad-valeur">' + escapeHtml(fiche.litterale) + '</span></div>';
    }
    if (naturelleDiffere) {
      html += '<div class="mtt-ligne-trad mtt-trad-naturelle">';
      html += '<span class="mtt-ligne-trad-valeur">' + escapeHtml(fiche.naturelle) + '</span>';
      html += '<span class="mtt-ligne-trad-etiquette">' + escapeHtml(texteDico(DICO_MTT, 'naturel', langue)) + '</span>';
      html += '</div>';
    }
    if (fiche.phraseExemple) {
      html += '<div class="mtt-exemple">';
      html += '<span class="mtt-exemple-fr">\u00AB\u00A0' + escapeHtml(fiche.phraseExemple) + '\u00A0\u00BB</span>';
      if (fiche.phraseTrad) html += '<span class="mtt-exemple-trad">' + escapeHtml(fiche.phraseTrad) + '</span>';
      html += '</div>';
    }
    if (estConjugue) {
      html += '<button type="button" class="mtt-details-toggle" aria-expanded="false">';
      html += '<span class="mtt-details-chevron">\u25B8</span>' + escapeHtml(texteDico(DICO_MTT, 'details', langue));
      html += '</button>';
      html += '<div class="mtt-details-panneau"><dl class="mtt-details-grille">';
      html += '<dt>' + escapeHtml(texteDico(DICO_MTT, 'infinitif', langue)) + '</dt><dd>' + escapeHtml(fiche.lemme) + '</dd>';
      if (fiche.mode) html += '<dt>' + escapeHtml(capitaliser(texteDico(DICO_MODE, fiche.mode, langue))) + '</dt><dd>' + escapeHtml(fiche.temps ? texteDico(DICO_TEMPS, fiche.temps, langue) : '\u2014') + '</dd>';
      if (fiche.personne) html += '<dt></dt><dd>' + escapeHtml(capitaliser(texteDico(DICO_PERSONNE, fiche.personne, langue))) + '</dd>';
      html += '</dl></div>';
    }
    html += '</div>';

    carte.innerHTML = html;

    if (estConjugue) {
      const toggle = carte.querySelector('.mtt-details-toggle');
      const panneau = carte.querySelector('.mtt-details-panneau');
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const ouvert = panneau.classList.toggle('mtt-details-ouvert');
        toggle.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      });
    }

    carte.querySelector('.mtt-fermer').addEventListener('click', function (e) { e.stopPropagation(); fermer(); });
  }

  function capitaliser(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  async function basculerFiche(ancre, mot, chapitreId) {
    if (ancreActive === ancre && carteEl && carteEl.classList.contains('mtt-carte-visible')) {
      fermer();
      return;
    }
    fermer();
    const langue = langueActuelle();
    const fiche = await recupererFiche(mot, chapitreId, langue);
    if (!fiche) return; // mot pas encore au dictionnaire : repli silencieux
    ancreActive = ancre;
    ancre.classList.add('mtt-mot-ouvert');
    construireContenuCarte(fiche, langue);
    const carte = garantirCarte();
    carte.classList.add('mtt-carte-visible');
    // Position calculée APRÈS mise en page (offsetWidth/Height fiables) —
    // double rAF plutôt qu'un simple setTimeout(0), plus fiable pour
    // attendre un cycle de rendu complet.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { positionnerCarte(ancre); });
    });
  }

  window.KebBekMotTooltip = {
    creerMotCliquable: creerMotCliquable,
    fermer: fermer
  };

})();
