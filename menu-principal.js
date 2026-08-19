/* ==================================================================
   menu-principal.js — module autonome du menu principal (post-tutoriel
   / post-identité), même patron d'architecture que identite-eleve.js :
   window.KebBekMenu.demarrerMenuPrincipal(idConteneur, options, callbacks)
   rend tout le menu dans le conteneur donné, communique avec la page
   hôte uniquement via callbacks — ce module ne navigue nulle part
   lui-même et ne connaît rien de la structure de la page.

   Remplace l'ancien menu inline de index_01.html (.carte-menu) — repris
   ici comme base visuelle (langage "boutons-pilules", palette
   beige/brun/pêche déjà en place sur le site) mais reconstruit :
     - "Ma fiche" n'est plus un panneau vide à remplir manuellement :
       il lit l'identité réelle via window.KebBekProgression
       (lireIdentite / estInvite), affiche prénom + avatar Keb/Bek
       selon le genre déjà choisi, et permet de se déconnecter
       (nouvelle fonction progression.js : deconnecter()).
     - Entrée animée en cascade des boutons (plus vivant que l'apparition
       statique d'origine), micro-interaction au clic (pression réelle,
       pas juste hover).
     - "Bravo & sac" reste "Bientôt" (l'écran n'existe pas encore) — le
       vrai sac (sac-a-dos.js, #sacBouton) continue de vivre en dehors
       de cette carte, exactement comme avant, ce module ne le
       remplace pas.

   Suppose sac-a-dos.js déjà chargé si la page utilise #sacBouton (pas
   une dépendance dure de CE fichier). Dépend en revanche de
   window.KebBekProgression (progression.js) pour "Ma fiche" — si
   absent, la carte se rend quand même (mode dégradé : "Ma fiche"
   affiche juste un état invité générique, jamais une carte cassée).
   ================================================================== */

const CLE_LANGUE_MENU = 'kebbek_langue'; // même clé que sac-a-dos.js (langueActuelleSac) — un seul réglage de langue pour tout le site
function langueActuelleMenu() {
  try { return localStorage.getItem(CLE_LANGUE_MENU) || 'en'; }
  catch (e) { return 'en'; }
}

// 🆕 Les 19 langues du site (mêmes codes que TEXTES_IDENTITE dans
// index.html) sont maintenant toutes couvertes — plus de repli silencieux
// sur l'anglais pour ce menu. tMenuOuDefaut() garde son filet de sécurité
// (defaut passé par l'appelant) pour toute clé qui manquerait malgré tout.
const DICO_MENU = {
  fr: {
    salutation: 'Salut, {prenom} !',
    salutationInvite: 'Bienvenue !',
    menuHistoires: 'Histoires et leçons',
    menuBravo: 'Bravo et récompenses',
    badgeBientot: 'Bientôt',
    menuMaFiche: 'Ma fiche',
    menuProfesseur: 'Mode professeur',
    menuPrives: 'Cours privés',
    menuContact: 'Contact',
    retourAccueil: 'Retour à l\u2019accueil',
    ficheInvite: 'Tu explores en mode invité pour l\u2019instant.',
    ficheBtnCompte: 'Créer un compte',
    ficheBtnReconnexion: 'Se reconnecter',
    ficheConnecte: 'Connecté(e)',
    ficheBtnDeconnexion: 'Se déconnecter',
    ficheDeconnexionEnCours: 'Déconnexion…'
  },
  en: {
    salutation: 'Hi, {prenom}!',
    salutationInvite: 'Welcome!',
    menuHistoires: 'Stories & lessons',
    menuBravo: 'Bravo & rewards',
    badgeBientot: 'Soon',
    menuMaFiche: 'My profile',
    menuProfesseur: 'Teacher mode',
    menuPrives: 'Private lessons',
    menuContact: 'Contact',
    retourAccueil: 'Back to home',
    ficheInvite: 'You\u2019re exploring as a guest for now.',
    ficheBtnCompte: 'Create an account',
    ficheBtnReconnexion: 'Log in',
    ficheConnecte: 'Signed in',
    ficheBtnDeconnexion: 'Sign out',
    ficheDeconnexionEnCours: 'Signing out…'
  },
  es: {
    salutation: '\u00a1Hola, {prenom}!',
    salutationInvite: '\u00a1Bienvenido!',
    menuHistoires: 'Historias y lecciones',
    menuBravo: 'Bravo y recompensas',
    badgeBientot: 'Pronto',
    menuMaFiche: 'Mi perfil',
    menuProfesseur: 'Modo profesor',
    menuPrives: 'Clases privadas',
    menuContact: 'Contacto',
    retourAccueil: 'Volver al inicio',
    ficheInvite: 'Por ahora est\u00e1s explorando como invitado.',
    ficheBtnCompte: 'Crear una cuenta',
    ficheBtnReconnexion: 'Iniciar sesión',
    ficheConnecte: 'Sesi\u00f3n iniciada',
    ficheBtnDeconnexion: 'Cerrar sesi\u00f3n',
    ficheDeconnexionEnCours: 'Cerrando sesi\u00f3n\u2026'
  },
  it: {
    salutation: 'Ciao, {prenom}!',
    salutationInvite: 'Benvenuto!',
    menuHistoires: 'Storie e lezioni',
    menuBravo: 'Bravo e premi',
    badgeBientot: 'Presto',
    menuMaFiche: 'Il mio profilo',
    menuProfesseur: 'Modalità insegnante',
    menuPrives: 'Lezioni private',
    menuContact: 'Contatto',
    retourAccueil: 'Torna alla home',
    ficheInvite: 'Per ora stai esplorando come ospite.',
    ficheBtnCompte: 'Crea un account',
    ficheBtnReconnexion: 'Accedi',
    ficheConnecte: 'Accesso effettuato',
    ficheBtnDeconnexion: 'Disconnetti',
    ficheDeconnexionEnCours: 'Disconnessione\u2026'
  },
  pt: {
    salutation: 'Oi, {prenom}!',
    salutationInvite: 'Bem-vindo!',
    menuHistoires: 'Hist\u00f3rias e li\u00e7\u00f5es',
    menuBravo: 'Bravo e recompensas',
    badgeBientot: 'Em breve',
    menuMaFiche: 'Meu perfil',
    menuProfesseur: 'Modo professor',
    menuPrives: 'Aulas particulares',
    menuContact: 'Contato',
    retourAccueil: 'Voltar ao início',
    ficheInvite: 'Voc\u00ea est\u00e1 explorando como convidado por enquanto.',
    ficheBtnCompte: 'Criar uma conta',
    ficheBtnReconnexion: 'Entrar',
    ficheConnecte: 'Sess\u00e3o iniciada',
    ficheBtnDeconnexion: 'Sair',
    ficheDeconnexionEnCours: 'Saindo\u2026'
  },
  ca: {
    salutation: 'Hola, {prenom}!',
    salutationInvite: 'Benvingut!',
    menuHistoires: 'Hist\u00f2ries i llic\u00f3ns',
    menuBravo: 'Bravo i recompenses',
    badgeBientot: 'Aviat',
    menuMaFiche: 'El meu perfil',
    menuProfesseur: 'Mode professor',
    menuPrives: 'Classes privades',
    menuContact: 'Contacte',
    retourAccueil: 'Torna a l\u2019inici',
    ficheInvite: 'Ara mateix estàs explorant com a convidat.',
    ficheBtnCompte: 'Crear un compte',
    ficheBtnReconnexion: 'Inicia sessió',
    ficheConnecte: 'Sessi\u00f3 iniciada',
    ficheBtnDeconnexion: 'Tancar sessi\u00f3',
    ficheDeconnexionEnCours: 'Tancant sessi\u00f3\u2026'
  },
  eo: {
    salutation: 'Saluton, {prenom}!',
    salutationInvite: 'Bonvenon!',
    menuHistoires: 'Rakontoj kaj lecionoj',
    menuBravo: 'Bravo kaj rekompencoj',
    badgeBientot: 'Bald\u0227u',
    menuMaFiche: 'Mia profilo',
    menuProfesseur: 'Instruista reĝimo',
    menuPrives: 'Privataj lecionoj',
    menuContact: 'Kontakto',
    retourAccueil: 'Reen al la hejmo',
    ficheInvite: 'Vi nun esploras kiel gasto.',
    ficheBtnCompte: 'Krei konton',
    ficheBtnReconnexion: 'Ensaluti',
    ficheConnecte: 'Ensalutinta',
    ficheBtnDeconnexion: 'Elsaluti',
    ficheDeconnexionEnCours: 'Elsalutante\u2026'
  },
  zh: {
    salutation: '\u4f60\u597d\uff0c{prenom}\uff01',
    salutationInvite: '\u6b22\u8fce\uff01',
    menuHistoires: '\u6545\u4e8b\u548c\u8bfe\u7a0b',
    menuBravo: 'Bravo \u4e0e\u5956\u52b1',
    badgeBientot: '\u5373\u5c06\u63a8\u51fa',
    menuMaFiche: '\u6211\u7684\u8d44\u6599',
    menuProfesseur: '教师模式',
    menuPrives: '\u79c1\u4eba\u8bfe\u7a0b',
    menuContact: '\u8054\u7cfb\u6211\u4eec',
    retourAccueil: '返回首页',
    ficheInvite: '\u4f60\u76ee\u524d\u4ee5\u8bbf\u5ba2\u8eab\u4efd\u6d4f\u89c8\u3002',
    ficheBtnCompte: '\u521b\u5efa\u8d26\u53f7',
    ficheBtnReconnexion: '登录',
    ficheConnecte: '\u5df2\u767b\u5f55',
    ficheBtnDeconnexion: '\u9000\u51fa\u767b\u5f55',
    ficheDeconnexionEnCours: '\u6b63\u5728\u9000\u51fa\u2026'
  },
  ja: {
    salutation: '\u3084\u3042\u3001{prenom}\uff01',
    salutationInvite: '\u3088\u3046\u3053\u305d\uff01',
    menuHistoires: '\u304a\u8a71\u3068\u30ec\u30c3\u30b9\u30f3',
    menuBravo: 'Bravo\u3068\u3054\u307b\u3046\u3073',
    badgeBientot: '\u8fd1\u65e5\u516c\u958b',
    menuMaFiche: '\u30de\u30a4\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb',
    menuProfesseur: '先生モード',
    menuPrives: '\u30d7\u30e9\u30a4\u30d9\u30fc\u30c8\u30ec\u30c3\u30b9\u30f3',
    menuContact: '\u304a\u554f\u3044\u5408\u308f\u305b',
    retourAccueil: 'ホームに戻る',
    ficheInvite: '\u4eca\u306f\u30b2\u30b9\u30c8\u3068\u3057\u3066\u5229\u7528\u3057\u3066\u3044\u307e\u3059\u3002',
    ficheBtnCompte: '\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210',
    ficheBtnReconnexion: 'ログイン',
    ficheConnecte: '\u30ed\u30b0\u30a4\u30f3\u4e2d',
    ficheBtnDeconnexion: '\u30ed\u30b0\u30a2\u30a6\u30c8',
    ficheDeconnexionEnCours: '\u30ed\u30b0\u30a2\u30a6\u30c8\u4e2d\u2026'
  },
  ko: {
    salutation: '\uc548\ub155, {prenom}!',
    salutationInvite: '\ud658\uc601\ud574\uc694!',
    menuHistoires: '\uc774\uc57c\uae30\uc640 \uc218\uc5c5',
    menuBravo: 'Bravo\uc640 \ubcf4\uc0c1',
    badgeBientot: '\uacf5 \uacf5\uac1c',
    menuMaFiche: '\ub0b4 \ud504\ub85c\ud544',
    menuProfesseur: '선생님 모드',
    menuPrives: '\uac1c\uc778 \uc218\uc5c5',
    menuContact: '\ubb38\uc758\ud558\uae30',
    retourAccueil: '홈으로 돌아가기',
    ficheInvite: '\uc9c0\uae08\uc740 \uac8c\uc2a4\ud2b8\ub85c \ub458\ub7ec\ubcf4\uace0 \uc788\uc5b4\uc694.',
    ficheBtnCompte: '\uacc4\uc815 \ub9cc\ub4e4\uae30',
    ficheBtnReconnexion: '로그인',
    ficheConnecte: '\ub85c\uadf8\uc778\ub428',
    ficheBtnDeconnexion: '\ub85c\uadf8\uc544\uc6c3',
    ficheDeconnexionEnCours: '\ub85c\uadf8\uc544\uc6c3 \uc911\u2026'
  },
  vi: {
    salutation: 'Ch\u00e0o, {prenom}!',
    salutationInvite: 'Ch\u00e0o m\u1eebng!',
    menuHistoires: 'C\u00e2u chuy\u1ec7n v\u00e0 b\u00e0i h\u1ecdc',
    menuBravo: 'Bravo v\u00e0 ph\u1ea7n th\u01b0\u1edfng',
    badgeBientot: 'S\u1eafp ra m\u1eaft',
    menuMaFiche: 'H\u1ed3 s\u01a1 c\u1ee7a t\u00f4i',
    menuProfesseur: 'Chế độ giáo viên',
    menuPrives: 'B\u00e0i h\u1ecdc ri\u00eang',
    menuContact: 'Li\u00ean h\u1ec7',
    retourAccueil: 'Quay lại trang chủ',
    ficheInvite: 'B\u1ea1n \u0111ang kh\u00e1m ph\u00e1 v\u1edbi t\u01b0 c\u00e1ch kh\u00e1ch.',
    ficheBtnCompte: 'T\u1ea1o t\u00e0i kho\u1ea3n',
    ficheBtnReconnexion: 'Đăng nhập',
    ficheConnecte: '\u0110\u00e3 \u0111\u0103ng nh\u1eadp',
    ficheBtnDeconnexion: '\u0110\u0103ng xu\u1ea5t',
    ficheDeconnexionEnCours: '\u0110ang \u0111\u0103ng xu\u1ea5t\u2026'
  },
  ht: {
    salutation: 'Alo, {prenom}!',
    salutationInvite: 'Byenveni!',
    menuHistoires: 'Istwa ak leson',
    menuBravo: 'Bravo ak rekonpans',
    badgeBientot: 'Byento',
    menuMaFiche: 'Pwofil mwen',
    menuProfesseur: 'Mòd pwofèsè',
    menuPrives: 'Kou priv\u00e9',
    menuContact: 'Kontak',
    retourAccueil: 'Retounen nan akèy',
    ficheInvite: 'Kounye a ou ap eksplore k\u00f2m envite.',
    ficheBtnCompte: 'Kreye yon kont',
    ficheBtnReconnexion: 'Konekte',
    ficheConnecte: 'Konekte',
    ficheBtnDeconnexion: 'Dekonekte',
    ficheDeconnexionEnCours: 'Ap dekonekte\u2026'
  },
  tl: {
    salutation: 'Kamusta, {prenom}!',
    salutationInvite: 'Maligayang pagdating!',
    menuHistoires: 'Mga kuwento at aralin',
    menuBravo: 'Bravo at gantimpala',
    badgeBientot: 'Malapit na',
    menuMaFiche: 'Aking profile',
    menuProfesseur: 'Mode ng guro',
    menuPrives: 'Pribadong aralin',
    menuContact: 'Makipag-ugnayan',
    retourAccueil: 'Bumalik sa home',
    ficheInvite: 'Kasalukuyan kang naggagalugad bilang bisita.',
    ficheBtnCompte: 'Gumawa ng account',
    ficheBtnReconnexion: 'Mag-log in',
    ficheConnecte: 'Naka-sign in',
    ficheBtnDeconnexion: 'Mag-sign out',
    ficheDeconnexionEnCours: 'Nagsa-sign out\u2026'
  },
  id: {
    salutation: 'Hai, {prenom}!',
    salutationInvite: 'Selamat datang!',
    menuHistoires: 'Cerita dan pelajaran',
    menuBravo: 'Bravo & hadiah',
    badgeBientot: 'Segera',
    menuMaFiche: 'Profilku',
    menuProfesseur: 'Mode guru',
    menuPrives: 'Les privat',
    menuContact: 'Kontak',
    retourAccueil: 'Kembali ke beranda',
    ficheInvite: 'Kamu sedang menjelajah sebagai tamu.',
    ficheBtnCompte: 'Buat akun',
    ficheBtnReconnexion: 'Masuk',
    ficheConnecte: 'Sudah masuk',
    ficheBtnDeconnexion: 'Keluar',
    ficheDeconnexionEnCours: 'Sedang keluar\u2026'
  },
  nl: {
    salutation: 'Hoi, {prenom}!',
    salutationInvite: 'Welkom!',
    menuHistoires: 'Verhalen en lessen',
    menuBravo: 'Bravo & beloningen',
    badgeBientot: 'Binnenkort',
    menuMaFiche: 'Mijn profiel',
    menuProfesseur: 'Docentmodus',
    menuPrives: 'Priv\u00e9lessen',
    menuContact: 'Contact',
    retourAccueil: 'Terug naar home',
    ficheInvite: 'Je verkent nu als gast.',
    ficheBtnCompte: 'Account aanmaken',
    ficheBtnReconnexion: 'Inloggen',
    ficheConnecte: 'Ingelogd',
    ficheBtnDeconnexion: 'Uitloggen',
    ficheDeconnexionEnCours: 'Bezig met uitloggen\u2026'
  },
  de: {
    salutation: 'Hallo, {prenom}!',
    salutationInvite: 'Willkommen!',
    menuHistoires: 'Geschichten & Lektionen',
    menuBravo: 'Bravo & Belohnungen',
    badgeBientot: 'Bald',
    menuMaFiche: 'Mein Profil',
    menuProfesseur: 'Lehrermodus',
    menuPrives: 'Privatunterricht',
    menuContact: 'Kontakt',
    retourAccueil: 'Zurück zur Startseite',
    ficheInvite: 'Du erkundest gerade als Gast.',
    ficheBtnCompte: 'Konto erstellen',
    ficheBtnReconnexion: 'Anmelden',
    ficheConnecte: 'Angemeldet',
    ficheBtnDeconnexion: 'Abmelden',
    ficheDeconnexionEnCours: 'Wird abgemeldet\u2026'
  },
  fa: {
    salutation: '\u0633\u0644\u0627\u0645\u060c {prenom}!',
    salutationInvite: '\u062e\u0648\u0634 \u0622\u0645\u062f\u06cc!',
    menuHistoires: '\u062f\u0627\u0633\u062a\u0627\u0646\u200c\u0647\u0627 \u0648 \u062f\u0631\u0633\u200c\u0647\u0627',
    menuBravo: '\u0628\u0631\u0627\u0648\u0648 \u0648 \u062c\u0627\u06cc\u0632\u0647\u200c\u0647\u0627',
    badgeBientot: '\u0628\u0647\u200c\u0632\u0648\u062f\u06cc',
    menuMaFiche: '\u067e\u0631\u0648\u0641\u0627\u06cc\u0644 \u0645\u0646',
    menuProfesseur: 'حالت معلم',
    menuPrives: '\u06a9\u0644\u0627\u0633\u200c\u0647\u0627\u06cc \u062e\u0635\u0648\u0635\u06cc',
    menuContact: '\u062a\u0645\u0627\u0633',
    retourAccueil: 'بازگشت به صفحه اصلی',
    ficheInvite: '\u0627\u0644\u0627\u0646 \u0628\u0647\u200c\u0635\u0648\u0631\u062a \u0645\u0647\u0645\u0627\u0646 \u062f\u0631 \u062d\u0627\u0644 \u06a9\u0627\u0648\u0634 \u0647\u0633\u062a\u06cc.',
    ficheBtnCompte: '\u0633\u0627\u062e\u062a \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc',
    ficheBtnReconnexion: 'ورود',
    ficheConnecte: '\u0648\u0627\u0631\u062f \u0634\u062f\u0647',
    ficheBtnDeconnexion: '\u062e\u0631\u0648\u062c',
    ficheDeconnexionEnCours: '\u062f\u0631 \u062d\u0627\u0644 \u062e\u0631\u0648\u062c\u2026'
  },
  sv: {
    salutation: 'Hej, {prenom}!',
    salutationInvite: 'V\u00e4lkommen!',
    menuHistoires: 'Ber\u00e4ttelser & lektioner',
    menuBravo: 'Bravo & bel\u00f6ningar',
    badgeBientot: 'Snart',
    menuMaFiche: 'Min profil',
    menuProfesseur: 'Lärarläge',
    menuPrives: 'Privatlektioner',
    menuContact: 'Kontakt',
    retourAccueil: 'Tillbaka till start',
    ficheInvite: 'Du utforskar just nu som g\u00e4st.',
    ficheBtnCompte: 'Skapa ett konto',
    ficheBtnReconnexion: 'Logga in',
    ficheConnecte: 'Inloggad',
    ficheBtnDeconnexion: 'Logga ut',
    ficheDeconnexionEnCours: 'Loggar ut\u2026'
  },
  no: {
    salutation: 'Hei, {prenom}!',
    salutationInvite: 'Velkommen!',
    menuHistoires: 'Historier og leksjoner',
    menuBravo: 'Bravo og bel\u00f8nninger',
    badgeBientot: 'Snart',
    menuMaFiche: 'Min profil',
    menuProfesseur: 'Lærermodus',
    menuPrives: 'Privattimer',
    menuContact: 'Kontakt',
    retourAccueil: 'Tilbake til start',
    ficheInvite: 'Du utforsker n\u00e5 som gjest.',
    ficheBtnCompte: 'Opprett konto',
    ficheBtnReconnexion: 'Logg inn',
    ficheConnecte: 'Logget inn',
    ficheBtnDeconnexion: 'Logg ut',
    ficheDeconnexionEnCours: 'Logger ut\u2026'
  },
  ru: {
    salutation: '\u041f\u0440\u0438\u0432\u0435\u0442, {prenom}!',
    salutationInvite: '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c!',
    menuHistoires: '\u0418\u0441\u0442\u043e\u0440\u0438\u0438 \u0438 \u0443\u0440\u043e\u043a\u0438',
    menuBravo: 'Bravo \u0438 \u043d\u0430\u0433\u0440\u0430\u0434\u044b',
    badgeBientot: '\u0421\u043a\u043e\u0440\u043e',
    menuMaFiche: '\u041c\u043e\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c',
    menuProfesseur: 'Режим учителя',
    menuPrives: '\u0427\u0430\u0441\u0442\u043d\u044b\u0435 \u0443\u0440\u043e\u043a\u0438',
    menuContact: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
    retourAccueil: 'Вернуться на главную',
    ficheInvite: '\u0421\u0435\u0439\u0447\u0430\u0441 \u0442\u044b \u0432 \u0433\u043e\u0441\u0442\u0435\u0432\u043e\u043c \u0440\u0435\u0436\u0438\u043c\u0435.',
    ficheBtnCompte: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442',
    ficheBtnReconnexion: 'Войти',
    ficheConnecte: '\u0412\u044b \u0432\u043e\u0448\u043b\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443',
    ficheBtnDeconnexion: '\u0412\u044b\u0439\u0442\u0438',
    ficheDeconnexionEnCours: '\u0412\u044b\u0445\u043e\u0434\u2026'
  }
};

function tMenuOuDefaut(cle, defaut) {
  const dict = DICO_MENU[langueActuelleMenu()] || DICO_MENU.en;
  if (dict && dict[cle] !== undefined) return dict[cle];
  return defaut;
}

function tMenuAvecVariables(cle, variables) {
  let texte = tMenuOuDefaut(cle, cle);
  Object.keys(variables || {}).forEach(k => {
    texte = texte.replace('{' + k + '}', variables[k]);
  });
  return texte;
}

// ---------- Icônes (mêmes tracés SVG que l'ancien menu — réutilisés tels
// quels : déjà cohérents avec le reste du site, aucune raison de les
// réinventer) ----------
const ICONES_MENU = {
  histoires: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/>',
  bravo: '<path d="M6 6h15l-1.5 9h-12Z"/><path d="M6 6 5 3H2"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17.5" cy="19" r="1.4"/>',
  fiche: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  prives: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  // 🆕 Mode professeur — un porte-bloc/écritoire, pour rester distinct
  // de "fiche" (silhouette élève) sans introduire un style d'icône
  // différent des autres (même trait, mêmes proportions viewBox 24).
  professeur: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/><path d="M9 21h6"/>',
  // 🆕 Flèche de retour (voir .kbm-retour dans le CSS) — simple flèche
  // gauche, même trait/viewBox 24 que le reste des icônes du menu.
  retour: '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>'
};

function svgIconeMenu(id) {
  return '<svg class="kbm-icone" viewBox="0 0 24 24">' + ICONES_MENU[id] + '</svg>';
}

// 🆕 (demande de Raphaël, refonte visuelle du menu) Icône "en médaillon" —
// pastille de couleur derrière l'icône, une par entrée (voir
// .kbm-icone-chip-* dans le CSS), pour des boutons plus expressifs/mignons
// qu'un simple trait sur fond uni. Utilisée pour les entrées de
// .kbm-liste uniquement — la flèche de retour (svgIconeMenu ci-dessus,
// sans médaillon) reste volontairement plus discrète, ce n'est pas une
// entrée de menu.
function svgIconeMenuChip(id) {
  return '<span class="kbm-icone-chip kbm-icone-chip-' + id + '">' +
    '<svg class="kbm-icone" viewBox="0 0 24 24">' + ICONES_MENU[id] + '</svg>' +
  '</span>';
}

/**
 * Rend le menu principal dans le conteneur donné.
 *
 * @param {string} idConteneur - id de l'élément hôte (vidé puis rempli).
 * @param {object} callbacks - { onHistoires, onPrives, onContact,
 *   onCreerCompte, onSeReconnecter, onModeProfesseur, onRetourAccueil } —
 *   chacun optionnel ; non fourni = bouton inactif plutôt qu'une erreur
 *   (onRetourAccueil non fourni : la flèche de retour n'est même pas
 *   rendue, voir plus bas).
 *   onCreerCompte et onSeReconnecter sont tous deux appelés depuis
 *   "Ma fiche" en mode invité (destination — probablement relancer la
 *   séquence identité, à l'étape compte ou directement en mode
 *   reconnexion — décidée par la page hôte, ce module ne le sait pas).
 *   onModeProfesseur n'est jamais appelé sans que le bouton "Mode
 *   professeur" ait d'abord été affiché — ce module vérifie lui-même
 *   (via progression.essayerModeProfesseur) que le compte connecté est
 *   un compte enseignant reconnu avant de rendre ce bouton.
 */
async function demarrerMenuPrincipal(idConteneur, callbacks) {
  callbacks = callbacks || {};
  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) { console.warn('menu-principal.js : conteneur introuvable.', idConteneur); return; }

  const progression = window.KebBekProgression || null;
  // 🆕 CORRIGÉ (session du 13-08-2026, signalé par Raphaël) — filet de
  // sécurité : ce module lisait l'identité (lireIdentite juste plus bas)
  // SANS jamais s'assurer que la session Supabase/le profil actif
  // avaient été restaurés sur CETTE page, ce qui retombait sur
  // l'identité invité (localStorage) pour un élève connecté si la page
  // hôte oubliait l'appel — exactement le bug vécu sur index.html.
  // restaurerSessionEtProfil() (progression.js) est idempotente : sans
  // effet si la page hôte l'a déjà appelée elle-même, donc aucun risque
  // à l'appeler systématiquement ici aussi — même principe de "double
  // vérification" que le mode dégradé déjà en place juste en dessous
  // pour un site sans progression.js du tout.
  if (progression && progression.restaurerSessionEtProfil) {
    await progression.restaurerSessionEtProfil();
  }
  const invite = !progression || progression.estInvite() || !progression.session;
  const identite = progression ? await progression.lireIdentite() : { prenom: null, genre: null };
  // 🆕 Mode professeur — n'a de sens que pour un compte réellement
  // connecté (pas invité). essayerModeProfesseur() (progression.js)
  // appelle le RPC creer_profil_enseignant() : succès seulement si le
  // courriel du compte figure dans la liste blanche côté Supabase —
  // aucune vérification client, la liste elle-même n'est pas lisible
  // par le navigateur. Échec = pas un compte prof, on n'affiche
  // simplement rien (jamais une erreur visible pour un élève).
  // 🐛 CORRIGÉ (session du 13-08-2026) : essayerModeProfesseur() ne lance
  // JAMAIS d'exception (voir progression.js) — elle retourne `null` en
  // cas d'échec, jamais un rejet de promesse. L'ancien `.then(() =>
  // true).catch(() => false)` ignorait donc la valeur résolue et
  // affichait TOUJOURS `true` pour n'importe quel compte connecté, prof
  // ou pas — bug silencieux, jamais déclenché en test parce que le seul
  // compte de test (raphael.s.b@live.ca) est justement dans la liste
  // blanche. Corrigé : on vérifie maintenant la valeur elle-même.
  const profilProfesseur = !invite && progression && progression.essayerModeProfesseur
    ? await progression.essayerModeProfesseur()
    : null;
  const estProfesseur = !!profilProfesseur;

  conteneur.innerHTML =
    // 🆕 (demande de Raphaël) Titre au-dessus du menu : réutilise
    // désormais le logo "Les Bonomes" (page_titre_02, même fichier que
    // l'en-tête permanent de l'écran d'accueil dans index.html — voir
    // .titre-accueil-img) plutôt que l'ancienne image d'écran-titre.
    // Nom simplifié, cohérent sur tout le site.
    '<img class="kbm-titre-img" src="images/accueil/page_titre_02.webp" width="1376" height="768" alt="Les Bonomes">' +
    // 🆕 (demande de Raphaël) Flèche discrète, coin supérieur GAUCHE de
    // l'écran entier (position: fixed, voir .kbm-retour dans le CSS) —
    // ramène à l'écran d'accueil (personnages Keb/Bek), pour qu'un élève
    // puisse retourner y survoler/toucher les personnages plusieurs fois
    // (succès secrets) sans devoir tout recharger la page. Rendue
    // seulement si la page hôte fournit onRetourAccueil —
    // même patron que le bouton "Mode professeur" plus bas (optionnel,
    // jamais un bouton mort si le callback manque). Ne relance JAMAIS le
    // choix de langue ni le bloc Connexion/Première leçon : c'est la
    // page hôte (index.html) qui décide quoi réafficher, ce module ne
    // fait qu'émettre le clic.
    (typeof callbacks.onRetourAccueil === 'function' ?
      '<button type="button" class="kbm-retour" data-menu="retourAccueil" aria-label="' + tMenuOuDefaut('retourAccueil', 'Back to home') + '" title="' + tMenuOuDefaut('retourAccueil', 'Back to home') + '">' +
        svgIconeMenu('retour') +
      '</button>'
    : '') +
    '<div class="kbm-carte">' +
      '<div class="kbm-salutation">' +
        (identite.prenom
          ? tMenuAvecVariables('salutation', { prenom: identite.prenom })
          : tMenuOuDefaut('salutationInvite', 'Welcome!')) +
      '</div>' +
      '<div class="kbm-liste" id="kbmListe">' +

        '<button type="button" class="kbm-bouton kbm-entree-cachee" data-menu="histoires">' +
          svgIconeMenuChip('histoires') +
          '<span>' + tMenuOuDefaut('menuHistoires', 'Stories & lessons') + '</span>' +
        '</button>' +

        '<button type="button" class="kbm-bouton kbm-a-venir kbm-entree-cachee" data-menu="bravo" aria-disabled="true">' +
          svgIconeMenuChip('bravo') +
          '<span>' + tMenuOuDefaut('menuBravo', 'Bravo & rewards') + '</span>' +
          '<span class="kbm-badge">' + tMenuOuDefaut('badgeBientot', 'Soon') + '</span>' +
        '</button>' +

        '<button type="button" class="kbm-bouton kbm-ma-fiche kbm-entree-cachee" id="kbmBtnFiche" aria-expanded="false">' +
          svgIconeMenuChip('fiche') +
          '<span>' + tMenuOuDefaut('menuMaFiche', 'My profile') + '</span>' +
          '<span class="kbm-chevron">&#9660;</span>' +
        '</button>' +
        '<div class="kbm-fiche-panneau" id="kbmFichePanneau"></div>' +

        (estProfesseur ?
          '<button type="button" class="kbm-bouton kbm-entree-cachee" data-menu="professeur">' +
            svgIconeMenuChip('professeur') +
            '<span>' + tMenuOuDefaut('menuProfesseur', 'Teacher mode') + '</span>' +
          '</button>'
        : '') +

        '<button type="button" class="kbm-bouton kbm-entree-cachee" data-menu="prives">' +
          svgIconeMenuChip('prives') +
          '<span>' + tMenuOuDefaut('menuPrives', 'Private lessons') + '</span>' +
        '</button>' +

        '<button type="button" class="kbm-bouton kbm-entree-cachee" data-menu="contact">' +
          svgIconeMenuChip('contact') +
          '<span>' + tMenuOuDefaut('menuContact', 'Contact') + '</span>' +
        '</button>' +

      '</div>' +
    '</div>';

  // ---------- Entrée en cascade ----------
  // Chaque bouton démarre invisible/décalé (.kbm-entree-cachee, voir CSS),
  // puis la classe est retirée avec un léger délai croissant — effet de
  // liste qui "s'installe" plutôt qu'un bloc figé qui apparaît d'un coup.
  const entrees = conteneur.querySelectorAll('.kbm-entree-cachee');
  entrees.forEach((el, i) => {
    setTimeout(() => el.classList.remove('kbm-entree-cachee'), 70 + i * 60);
  });

  // ---------- Callbacks des boutons simples ----------
  const brancher = (selecteur, cb) => {
    const el = conteneur.querySelector(selecteur);
    if (el && typeof cb === 'function') el.addEventListener('click', cb);
  };
  brancher('[data-menu="histoires"]', callbacks.onHistoires);
  brancher('[data-menu="professeur"]', callbacks.onModeProfesseur);
  brancher('[data-menu="prives"]', callbacks.onPrives);
  brancher('[data-menu="contact"]', callbacks.onContact);
  brancher('[data-menu="retourAccueil"]', callbacks.onRetourAccueil);

  // ---------- "Ma fiche" ----------
  const btnFiche = document.getElementById('kbmBtnFiche');
  const panneauFiche = document.getElementById('kbmFichePanneau');

  function rendreFiche() {
    if (invite) {
      panneauFiche.innerHTML =
        '<p class="kbm-fiche-texte">' + tMenuOuDefaut('ficheInvite', 'You\u2019re exploring as a guest for now.') + '</p>' +
        '<button type="button" class="kbm-fiche-btn kbm-fiche-btn-principal" id="kbmBtnCreerCompte">' +
          tMenuOuDefaut('ficheBtnCompte', 'Create an account') +
        '</button>' +
        // 🆕 "Se reconnecter" (demande de Raphaël, session du 13-08-2026) —
        // un élève qui a déjà un compte mais se retrouve en mode invité sur
        // cet appareil/fureteur (pas juste un tout nouvel élève) doit
        // pouvoir le faire depuis "Ma fiche" aussi, pas seulement depuis le
        // lien discret de l'écran "First time?" (index.html). Style discret
        // (kbm-fiche-btn-discret, déjà utilisé pour "Se déconnecter") pour
        // ne jamais concurrencer visuellement "Créer un compte", qui reste
        // le choix par défaut pour la majorité des invités.
        '<button type="button" class="kbm-fiche-btn kbm-fiche-btn-discret" id="kbmBtnSeReconnecter">' +
          tMenuOuDefaut('ficheBtnReconnexion', 'Log in') +
        '</button>';
      const btnCompte = document.getElementById('kbmBtnCreerCompte');
      if (btnCompte && typeof callbacks.onCreerCompte === 'function') {
        btnCompte.addEventListener('click', callbacks.onCreerCompte);
      }
      const btnReconnexion = document.getElementById('kbmBtnSeReconnecter');
      if (btnReconnexion && typeof callbacks.onSeReconnecter === 'function') {
        btnReconnexion.addEventListener('click', callbacks.onSeReconnecter);
      }
    } else {
      panneauFiche.innerHTML =
        '<p class="kbm-fiche-texte">' +
          '<span class="kbm-fiche-statut">' + tMenuOuDefaut('ficheConnecte', 'Signed in') + '</span>' +
        '</p>' +
        '<button type="button" class="kbm-fiche-btn kbm-fiche-btn-discret" id="kbmBtnDeconnexion">' +
          tMenuOuDefaut('ficheBtnDeconnexion', 'Sign out') +
        '</button>';
      const btnDeco = document.getElementById('kbmBtnDeconnexion');
      if (btnDeco) {
        btnDeco.addEventListener('click', async function () {
          btnDeco.disabled = true;
          btnDeco.textContent = tMenuOuDefaut('ficheDeconnexionEnCours', 'Signing out…');
          if (progression) await progression.deconnecter();
          window.location.reload();
        });
      }
    }
  }
  rendreFiche();

  if (btnFiche) {
    btnFiche.addEventListener('click', function () {
      const ouvert = panneauFiche.classList.toggle('kbm-ouvert');
      btnFiche.setAttribute('aria-expanded', String(ouvert));
      btnFiche.classList.toggle('kbm-ouvert', ouvert);
    });
  }
}

window.KebBekMenu = { demarrerMenuPrincipal };
