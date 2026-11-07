/* ==================================================================
   sequence-compte.js — création du compte (courriel + code), voix du système.

   🆕 (01-11-2026) Étape suivante de sequence-memoire.js : quand l'élève choisit
   « Créer un compte » (callbacks.onCompte de la mémoire), la page hôte appelle
   ce module. Fenêtre plate (même habillage que les fenêtres du Lecteur), posée
   sur la scène de la mémoire encore à l'écran (sinon, sur le conteneur) :

     1. courriel → envoi d'un code (Supabase signInWithOtp, sans mot de passe) ;
     2. code → vérification (verifyOtp), puis session adoptée par progression.js ;
     3. routeur post-authentification (même règles que l'ancien identite-eleve.js) :
          0 profil   → nouveau compte : creerProfil(prénom) + migrations invité→compte
                       + enregistrerIdentite ;
          1 profil   → reconnexion normale : on adopte ce profil, rien n'est créé ;
          2+ profils → écran « Qui es-tu ? » (un bouton par prénom + « Ajouter un profil »).
        🆕 Compte DÉJÀ existant ET progression faite en invité : la progression du compte a
        préséance, mais l'élève choisit (écran « conflit ») :
          · garder celle du compte → la progression d'invité est effacée, après confirmation ;
          · garder la nouvelle → elle est migrée dans un NOUVEAU profil du même courriel
            (nécessite options.identite, sinon ce choix n'est pas proposé) ;
          · « Continuer sans compte » → déconnexion, l'invité retrouve sa progression intacte.
        Sans progression d'invité (identité seule), rien n'est demandé : comme avant.
     À tout moment : « Continuer sans compte » rend la main (onAnnule) — l'élève
     reste invité, rien n'est perdu ni écrit.

   Dépend de window.KebBekProgression (progression.js, avec le CDN Supabase chargé
   avant) et des classes .lect-voile / .lect-carte / .lect-btn de sequence-lecteur.css.
   Textes dans les 20 langues (fr + 19) ; registres alignés sur la voix du système
   (ko : poli ; ja : です・ます ; pt : portugais du Brésil, comme le Lecteur).

   @param {string} idConteneur
   @param {object} options : langue,
                             identite { prenom, genre: 'm'|'f', adulte: bool } — celle
                             confirmée dans la mémoire ; sert à créer le profil
                             (sans elle, un compte flambant neuf ne peut pas être créé :
                             onAnnule est appelé)
   @param {object} callbacks : onComplet({ prenom, genre, adulte }) — compte créé ou
                               retrouvé, profil actif défini ;
                               onAnnule() — « Continuer sans compte »
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_INVITE = 'kebbek_invite';      // ⚠️ dupliquée de CLE_INVITE_LOCALE (progression.js, non exposée)
  // ⚠️ Clés locales de l'invité, dupliquées de progression.js (non exposées). Une progression
  // d'invité = chapitres, conditions ou positions de leçon ; le personnage choisi s'efface avec
  // elles mais ne compte pas pour détecter un conflit ; l'identité (prénom…) n'est jamais effacée.
  const CLES_PROGRES_INVITE = ['kebbek_progression_invite', 'kebbek_conditions_invite', 'kebbek_position_lecon_invite', 'kebbek_mots_invite'];
  const CLES_EFFACEES_INVITE = CLES_PROGRES_INVITE.concat(['kebbek_personnage_choisi_invite']);
  function progresInviteLocal() {
    return CLES_PROGRES_INVITE.some(function (cle) {
      try {
        const v = localStorage.getItem(cle);
        if (!v) return false;
        const o = JSON.parse(v);
        return !!o && typeof o === 'object' && Object.keys(o).length > 0;
      } catch (e) { return false; }
    });
  }
  function effacerProgresInvite() {
    CLES_EFFACEES_INVITE.forEach(function (cle) { try { localStorage.removeItem(cle); } catch (e) {} });
  }
  const LANGUES_DROITE_A_GAUCHE = ['fa'];
  const DICO = {
    fr: {
      titre: 'Cr\u00e9e ton compte',
      texte: 'Entre ton courriel \u2014 on t\u2019envoie un code, sans mot de passe.',
      email: 'Courriel',
      envoyer: 'Envoyer le code',
      code: 'Code',
      verifier: 'Confirmer',
      codeEnvoye: 'Code envoy\u00e9 ! Regarde dans ton courriel.',
      courrielVide: 'Entre ton courriel, s\u2019il te pla\u00eet.',
      codeVide: 'Entre le code, s\u2019il te pla\u00eet.',
      envoiEnCours: 'Envoi\u2026',
      verifEnCours: 'V\u00e9rification\u2026',
      indisponible: 'La cr\u00e9ation de compte n\u2019est pas disponible pour le moment.',
      lienInvite: 'Continuer sans compte',
      avertInvite: 'Tu pourrais perdre ta progression si les donn\u00e9es de ton navigateur sont effac\u00e9es.',
      codeInvalide: 'Code incorrect ou expir\u00e9.',
      profilTitre: 'Qui es-tu ?',
      profilAjouter: '+ Ajouter un profil',
      conflitTitre: 'Ce compte a d\u00e9j\u00e0 une progression',
      conflitTexte: 'Tu as aussi avanc\u00e9 sans te connecter. Quelle progression veux-tu garder\u00a0?',
      conflitGarder: 'Garder celle du compte',
      conflitNouveau: 'Garder la nouvelle, dans un nouveau profil',
      effacerTitre: 'Effacer ta progression\u00a0?',
      effacerTexte: 'Ce que tu as fait sans te connecter sera effac\u00e9 d\u00e9finitivement.',
      effacer: 'Effacer',
      retour: 'Retour'
    },
    en: {
      titre: 'Create your account',
      texte: 'Enter your email \u2014 we\'ll send you a code, no password needed.',
      email: 'Email',
      envoyer: 'Send code',
      code: 'Code',
      verifier: 'Confirm',
      codeEnvoye: 'Code sent! Check your email.',
      courrielVide: 'Please enter your email.',
      codeVide: 'Please enter the code.',
      envoiEnCours: 'Sending\u2026',
      verifEnCours: 'Checking\u2026',
      indisponible: 'Account creation isn\'t available right now.',
      lienInvite: 'Continue without an account',
      avertInvite: 'Your progress could be lost if your browser data is cleared.',
      codeInvalide: 'Incorrect or expired code.',
      profilTitre: 'Who are you?',
      profilAjouter: '+ Add a profile',
      conflitTitre: 'This account already has progress',
      conflitTexte: 'You also made progress without signing in. Which progress do you want to keep?',
      conflitGarder: 'Keep the account\'s progress',
      conflitNouveau: 'Keep the new one, in a new profile',
      effacerTitre: 'Erase your progress?',
      effacerTexte: 'What you did without signing in will be erased for good.',
      effacer: 'Erase',
      retour: 'Back'
    },
    es: {
      titre: 'Crea tu cuenta',
      texte: 'Escribe tu correo \u2014 te enviaremos un c\u00f3digo, sin contrase\u00f1a.',
      email: 'Correo electr\u00f3nico',
      envoyer: 'Enviar c\u00f3digo',
      code: 'C\u00f3digo',
      verifier: 'Confirmar',
      codeEnvoye: '\u00a1C\u00f3digo enviado! Revisa tu correo.',
      courrielVide: 'Escribe tu correo, por favor.',
      codeVide: 'Escribe el c\u00f3digo, por favor.',
      envoiEnCours: 'Enviando\u2026',
      verifEnCours: 'Comprobando\u2026',
      indisponible: 'La creaci\u00f3n de cuentas no est\u00e1 disponible ahora mismo.',
      lienInvite: 'Continuar sin cuenta',
      avertInvite: 'Tu progreso podr\u00eda perderse si se borran los datos del navegador.',
      codeInvalide: 'C\u00f3digo incorrecto o caducado.',
      profilTitre: '\u00bfQui\u00e9n eres?',
      profilAjouter: '+ A\u00f1adir un perfil',
      conflitTitre: 'Esta cuenta ya tiene progreso',
      conflitTexte: 'Tambi\u00e9n avanzaste sin iniciar sesi\u00f3n. \u00bfQu\u00e9 progreso quieres conservar?',
      conflitGarder: 'Conservar el de la cuenta',
      conflitNouveau: 'Conservar el nuevo, en un perfil nuevo',
      effacerTitre: '\u00bfBorrar tu progreso?',
      effacerTexte: 'Lo que hiciste sin iniciar sesi\u00f3n se borrar\u00e1 para siempre.',
      effacer: 'Borrar',
      retour: 'Volver'
    },
    it: {
      titre: 'Crea il tuo account',
      texte: 'Inserisci la tua email \u2014 ti invieremo un codice, senza password.',
      email: 'Email',
      envoyer: 'Invia codice',
      code: 'Codice',
      verifier: 'Conferma',
      codeEnvoye: 'Codice inviato! Controlla la tua email.',
      courrielVide: 'Inserisci la tua email, per favore.',
      codeVide: 'Inserisci il codice, per favore.',
      envoiEnCours: 'Invio in corso\u2026',
      verifEnCours: 'Verifica in corso\u2026',
      indisponible: 'La creazione dell\'account non \u00e8 disponibile al momento.',
      lienInvite: 'Continua senza account',
      avertInvite: 'I tuoi progressi potrebbero andare persi se i dati del browser vengono cancellati.',
      codeInvalide: 'Codice errato o scaduto.',
      profilTitre: 'Chi sei?',
      profilAjouter: '+ Aggiungi un profilo',
      conflitTitre: 'Questo account ha gi\u00e0 dei progressi',
      conflitTexte: 'Hai anche proseguito senza accedere. Quali progressi vuoi tenere?',
      conflitGarder: 'Tieni quelli dell\'account',
      conflitNouveau: 'Tieni quelli nuovi, in un nuovo profilo',
      effacerTitre: 'Cancellare i tuoi progressi?',
      effacerTexte: 'Ci\u00f2 che hai fatto senza accedere verr\u00e0 cancellato definitivamente.',
      effacer: 'Cancella',
      retour: 'Indietro'
    },
    pt: {
      titre: 'Crie sua conta',
      texte: 'Digite seu e-mail \u2014 enviaremos um c\u00f3digo, sem senha.',
      email: 'E-mail',
      envoyer: 'Enviar c\u00f3digo',
      code: 'C\u00f3digo',
      verifier: 'Confirmar',
      codeEnvoye: 'C\u00f3digo enviado! Confira seu e-mail.',
      courrielVide: 'Digite seu e-mail, por favor.',
      codeVide: 'Digite o c\u00f3digo, por favor.',
      envoiEnCours: 'Enviando\u2026',
      verifEnCours: 'Verificando\u2026',
      indisponible: 'A cria\u00e7\u00e3o de conta n\u00e3o est\u00e1 dispon\u00edvel no momento.',
      lienInvite: 'Continuar sem conta',
      avertInvite: 'Seu progresso pode ser perdido se os dados do navegador forem apagados.',
      codeInvalide: 'C\u00f3digo incorreto ou expirado.',
      profilTitre: 'Quem \u00e9 voc\u00ea?',
      profilAjouter: '+ Adicionar um perfil',
      conflitTitre: 'Esta conta j\u00e1 tem progresso',
      conflitTexte: 'Voc\u00ea tamb\u00e9m avan\u00e7ou sem entrar. Qual progresso voc\u00ea quer manter?',
      conflitGarder: 'Manter o da conta',
      conflitNouveau: 'Manter o novo, em um novo perfil',
      effacerTitre: 'Apagar seu progresso?',
      effacerTexte: 'O que voc\u00ea fez sem entrar ser\u00e1 apagado para sempre.',
      effacer: 'Apagar',
      retour: 'Voltar'
    },
    ca: {
      titre: 'Crea el teu compte',
      texte: 'Escriu el teu correu \u2014 t\'enviarem un codi, sense contrasenya.',
      email: 'Correu electr\u00f2nic',
      envoyer: 'Envia el codi',
      code: 'Codi',
      verifier: 'Confirma',
      codeEnvoye: 'Codi enviat! Revisa el teu correu.',
      courrielVide: 'Escriu el teu correu, si us plau.',
      codeVide: 'Escriu el codi, si us plau.',
      envoiEnCours: 'Enviant\u2026',
      verifEnCours: 'Comprovant\u2026',
      indisponible: 'La creaci\u00f3 de comptes no est\u00e0 disponible ara mateix.',
      lienInvite: 'Continua sense compte',
      avertInvite: 'El teu progr\u00e9s es podria perdre si s\'esborren les dades del navegador.',
      codeInvalide: 'Codi incorrecte o caducat.',
      profilTitre: 'Qui ets?',
      profilAjouter: '+ Afegeix un perfil',
      conflitTitre: 'Aquest compte ja t\u00e9 progr\u00e9s',
      conflitTexte: 'Tamb\u00e9 has avan\u00e7at sense iniciar la sessi\u00f3. Quin progr\u00e9s vols conservar?',
      conflitGarder: 'Conserva el del compte',
      conflitNouveau: 'Conserva el nou, en un perfil nou',
      effacerTitre: 'Vols esborrar el teu progr\u00e9s?',
      effacerTexte: 'El que has fet sense iniciar la sessi\u00f3 s\'esborrar\u00e0 per sempre.',
      effacer: 'Esborra',
      retour: 'Enrere'
    },
    eo: {
      titre: 'Kreu vian konton',
      texte: 'Enigu vian retpo\u015dton \u2014 ni sendos al vi kodon, neniu pasvorto necesas.',
      email: 'Retpo\u015dto',
      envoyer: 'Sendi kodon',
      code: 'Kodo',
      verifier: 'Konfirmi',
      codeEnvoye: 'Kodo sendita! Kontrolu vian retpo\u015dton.',
      courrielVide: 'Bonvolu enigi vian retpo\u015dton.',
      codeVide: 'Bonvolu enigi la kodon.',
      envoiEnCours: 'Sendante\u2026',
      verifEnCours: 'Kontrolante\u2026',
      indisponible: 'Konto-kreado ne disponeblas nun.',
      lienInvite: 'Da\u016drigi sen konto',
      avertInvite: 'Via progreso povus perdi\u011di se la retumilaj datumoj estas vi\u015ditaj.',
      codeInvalide: 'Mal\u011dusta a\u016d eksvalidi\u011dinta kodo.',
      profilTitre: 'Kiu vi estas?',
      profilAjouter: '+ Aldoni profilon',
      conflitTitre: '\u0108i tiu konto jam havas progreson',
      conflitTexte: 'Vi anka\u016d progresis sen ensaluti. Kiun progreson vi volas konservi?',
      conflitGarder: 'Konservi tiun de la konto',
      conflitNouveau: 'Konservi la novan, en nova profilo',
      effacerTitre: '\u0108u forvi\u015di vian progreson?',
      effacerTexte: 'Tio, kion vi faris sen ensaluti, estos forvi\u015dita por\u0109iam.',
      effacer: 'Forvi\u015di',
      retour: 'Reen'
    },
    zh: {
      titre: '\u521b\u5efa\u4f60\u7684\u8d26\u53f7',
      texte: '\u8f93\u5165\u4f60\u7684\u90ae\u7bb1\u2014\u2014\u6211\u4eec\u4f1a\u53d1\u4e00\u4e2a\u9a8c\u8bc1\u7801\u7ed9\u4f60\uff0c\u4e0d\u9700\u8981\u5bc6\u7801\u3002',
      email: '\u90ae\u7bb1',
      envoyer: '\u53d1\u9001\u9a8c\u8bc1\u7801',
      code: '\u9a8c\u8bc1\u7801',
      verifier: '\u786e\u8ba4',
      codeEnvoye: '\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff01\u53bb\u67e5\u770b\u4f60\u7684\u90ae\u7bb1\u5427\u3002',
      courrielVide: '\u8bf7\u8f93\u5165\u4f60\u7684\u90ae\u7bb1\u3002',
      codeVide: '\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\u3002',
      envoiEnCours: '\u53d1\u9001\u4e2d\u2026\u2026',
      verifEnCours: '\u6838\u5bf9\u4e2d\u2026\u2026',
      indisponible: '\u76ee\u524d\u6682\u65f6\u65e0\u6cd5\u521b\u5efa\u8d26\u53f7\u3002',
      lienInvite: '\u4e0d\u521b\u5efa\u8d26\u53f7\uff0c\u7ee7\u7eed',
      avertInvite: '\u5982\u679c\u6e05\u9664\u6d4f\u89c8\u5668\u6570\u636e\uff0c\u4f60\u7684\u5b66\u4e60\u8fdb\u5ea6\u53ef\u80fd\u4f1a\u4e22\u5931\u3002',
      codeInvalide: '\u9a8c\u8bc1\u7801\u4e0d\u6b63\u786e\u6216\u5df2\u8fc7\u671f\u3002',
      profilTitre: '\u4f60\u662f\u8c01\uff1f',
      profilAjouter: '+ \u6dfb\u52a0\u4e00\u4e2a\u6863\u6848',
      conflitTitre: '\u8fd9\u4e2a\u8d26\u53f7\u5df2\u7ecf\u6709\u5b66\u4e60\u8fdb\u5ea6',
      conflitTexte: '\u4f60\u4e4b\u524d\u6ca1\u767b\u5f55\u65f6\u4e5f\u5b66\u4e86\u4e00\u4e9b\u5185\u5bb9\u3002\u4f60\u60f3\u4fdd\u7559\u54ea\u4e00\u4efd\u8fdb\u5ea6\uff1f',
      conflitGarder: '\u4fdd\u7559\u8d26\u53f7\u91cc\u7684\u8fdb\u5ea6',
      conflitNouveau: '\u4fdd\u7559\u65b0\u7684\u8fdb\u5ea6\uff0c\u653e\u8fdb\u65b0\u6863\u6848',
      effacerTitre: '\u8981\u6e05\u9664\u4f60\u7684\u8fdb\u5ea6\u5417\uff1f',
      effacerTexte: '\u4f60\u6ca1\u767b\u5f55\u65f6\u5b66\u7684\u5185\u5bb9\u4f1a\u88ab\u6c38\u4e45\u6e05\u9664\u3002',
      effacer: '\u6e05\u9664',
      retour: '\u8fd4\u56de'
    },
    ja: {
      titre: '\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u3059\u308b',
      texte: '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u30b3\u30fc\u30c9\u3092\u304a\u9001\u308a\u3057\u307e\u3059\u3002\u30d1\u30b9\u30ef\u30fc\u30c9\u306f\u4e0d\u8981\u3067\u3059\u3002',
      email: '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9',
      envoyer: '\u30b3\u30fc\u30c9\u3092\u9001\u308b',
      code: '\u30b3\u30fc\u30c9',
      verifier: '確認する',
      codeEnvoye: '\u30b3\u30fc\u30c9\u3092\u9001\u308a\u307e\u3057\u305f\u3002\u30e1\u30fc\u30eb\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
      courrielVide: '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
      codeVide: '\u30b3\u30fc\u30c9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
      envoiEnCours: '\u9001\u4fe1\u4e2d\u2026',
      verifEnCours: '\u78ba\u8a8d\u4e2d\u2026',
      indisponible: '\u73fe\u5728\u3001\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u3067\u304d\u307e\u305b\u3093\u3002',
      lienInvite: '\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u3089\u305a\u306b\u7d9a\u3051\u308b',
      avertInvite: '\u30d6\u30e9\u30a6\u30b6\u306e\u30c7\u30fc\u30bf\u3092\u6d88\u3059\u3068\u3001\u9032\u307f\u5177\u5408\u304c\u5931\u308f\u308c\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002',
      codeInvalide: '\u30b3\u30fc\u30c9\u304c\u9055\u3046\u304b\u3001\u671f\u9650\u304c\u5207\u308c\u3066\u3044\u307e\u3059\u3002',
      profilTitre: 'だれが使いますか？',
      profilAjouter: '\uff0b \u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8ffd\u52a0',
      conflitTitre: 'このアカウントにはすでに進み具合があります',
      conflitTexte: 'ログインせずに進めた分もあります。どちらの進み具合を残しますか？',
      conflitGarder: 'アカウントのほうを残す',
      conflitNouveau: '新しいほうを、新しいプロフィールに残す',
      effacerTitre: '進み具合を消しますか？',
      effacerTexte: 'ログインせずに進めた分は、完全に消えてしまいます。',
      effacer: '消す',
      retour: '戻る'
    },
    ko: {
      titre: '\uacc4\uc815 \ub9cc\ub4e4\uae30',
      texte: '\uc774\uba54\uc77c\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694. \ucf54\ub4dc\ub97c \ubcf4\ub0b4 \ub4dc\ub9b4\uac8c\uc694. \ube44\ubc00\ubc88\ud638\ub294 \ud544\uc694 \uc5c6\uc5b4\uc694.',
      email: '\uc774\uba54\uc77c',
      envoyer: '\ucf54\ub4dc \ubcf4\ub0b4\uae30',
      code: '\ucf54\ub4dc',
      verifier: '\ud655\uc778',
      codeEnvoye: '\ucf54\ub4dc\ub97c \ubcf4\ub0c8\uc5b4\uc694! \uc774\uba54\uc77c\uc744 \ud655\uc778\ud574 \uc8fc\uc138\uc694.',
      courrielVide: '\uc774\uba54\uc77c\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
      codeVide: '\ucf54\ub4dc\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
      envoiEnCours: '\ubcf4\ub0b4\ub294 \uc911\u2026',
      verifEnCours: '\ud655\uc778\ud558\ub294 \uc911\u2026',
      indisponible: '\uc9c0\uae08\uc740 \uacc4\uc815\uc744 \ub9cc\ub4e4 \uc218 \uc5c6\uc5b4\uc694.',
      lienInvite: '\uacc4\uc815 \uc5c6\uc774 \uacc4\uc18d\ud558\uae30',
      avertInvite: '\ube0c\ub77c\uc6b0\uc800 \ub370\uc774\ud130\ub97c \uc9c0\uc6b0\uba74 \uc9c4\ud589 \uc0c1\ud669\uc774 \uc0ac\ub77c\uc9c8 \uc218 \uc788\uc5b4\uc694.',
      codeInvalide: '\ucf54\ub4dc\uac00 \uc62c\ubc14\ub974\uc9c0 \uc54a\uac70\ub098 \ub9cc\ub8cc\ub418\uc5c8\uc5b4\uc694.',
      profilTitre: '\ub204\uad6c\uc138\uc694?',
      profilAjouter: '+ \ud504\ub85c\ud544 \ucd94\uac00',
      conflitTitre: '\uc774 \uacc4\uc815\uc5d0\ub294 \uc774\ubbf8 \uc9c4\ud589 \uc0c1\ud669\uc774 \uc788\uc5b4\uc694',
      conflitTexte: '\ub85c\uadf8\uc778\ud558\uc9c0 \uc54a\uace0 \uc9c4\ud589\ud55c \ub0b4\uc6a9\ub3c4 \uc788\uc5b4\uc694. \uc5b4\ub290 \ucabd \uc9c4\ud589 \uc0c1\ud669\uc744 \ub0a8\uae38\uae4c\uc694?',
      conflitGarder: '\uacc4\uc815\uc758 \uc9c4\ud589 \uc0c1\ud669 \ub0a8\uae30\uae30',
      conflitNouveau: '\uc0c8 \uc9c4\ud589 \uc0c1\ud669\uc744 \uc0c8 \ud504\ub85c\ud544\uc5d0 \ub0a8\uae30\uae30',
      effacerTitre: '\uc9c4\ud589 \uc0c1\ud669\uc744 \uc9c0\uc6b8\uae4c\uc694?',
      effacerTexte: '\ub85c\uadf8\uc778\ud558\uc9c0 \uc54a\uace0 \uc9c4\ud589\ud55c \ub0b4\uc6a9\uc740 \uc644\uc804\ud788 \uc9c0\uc6cc\uc838\uc694.',
      effacer: '\uc9c0\uc6b0\uae30',
      retour: '\ub4a4\ub85c'
    },
    vi: {
      titre: 'T\u1ea1o t\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n',
      texte: 'Nh\u1eadp email c\u1ee7a b\u1ea1n \u2014 ch\u00fang t\u00f4i s\u1ebd g\u1eedi m\u00e3, kh\u00f4ng c\u1ea7n m\u1eadt kh\u1ea9u.',
      email: 'Email',
      envoyer: 'G\u1eedi m\u00e3',
      code: 'M\u00e3',
      verifier: 'X\u00e1c nh\u1eadn',
      codeEnvoye: '\u0110\u00e3 g\u1eedi m\u00e3! H\u00e3y ki\u1ec3m tra email c\u1ee7a b\u1ea1n.',
      courrielVide: 'Vui l\u00f2ng nh\u1eadp email c\u1ee7a b\u1ea1n.',
      codeVide: 'Vui l\u00f2ng nh\u1eadp m\u00e3.',
      envoiEnCours: '\u0110ang g\u1eedi\u2026',
      verifEnCours: '\u0110ang ki\u1ec3m tra\u2026',
      indisponible: 'Hi\u1ec7n ch\u01b0a th\u1ec3 t\u1ea1o t\u00e0i kho\u1ea3n.',
      lienInvite: 'Ti\u1ebfp t\u1ee5c m\u00e0 kh\u00f4ng c\u1ea7n t\u00e0i kho\u1ea3n',
      avertInvite: 'Ti\u1ebfn tr\u00ecnh c\u1ee7a b\u1ea1n c\u00f3 th\u1ec3 b\u1ecb m\u1ea5t n\u1ebfu d\u1eef li\u1ec7u tr\u00ecnh duy\u1ec7t b\u1ecb x\u00f3a.',
      codeInvalide: 'M\u00e3 kh\u00f4ng \u0111\u00fang ho\u1eb7c \u0111\u00e3 h\u1ebft h\u1ea1n.',
      profilTitre: 'B\u1ea1n l\u00e0 ai?',
      profilAjouter: '+ Th\u00eam h\u1ed3 s\u01a1',
      conflitTitre: 'T\u00e0i kho\u1ea3n n\u00e0y \u0111\u00e3 c\u00f3 ti\u1ebfn tr\u00ecnh',
      conflitTexte: 'B\u1ea1n c\u0169ng \u0111\u00e3 h\u1ecdc m\u00e0 ch\u01b0a \u0111\u0103ng nh\u1eadp. B\u1ea1n mu\u1ed1n gi\u1eef ti\u1ebfn tr\u00ecnh n\u00e0o?',
      conflitGarder: 'Gi\u1eef ti\u1ebfn tr\u00ecnh c\u1ee7a t\u00e0i kho\u1ea3n',
      conflitNouveau: 'Gi\u1eef ti\u1ebfn tr\u00ecnh m\u1edbi, trong m\u1ed9t h\u1ed3 s\u01a1 m\u1edbi',
      effacerTitre: 'X\u00f3a ti\u1ebfn tr\u00ecnh c\u1ee7a b\u1ea1n?',
      effacerTexte: 'Nh\u1eefng g\u00ec b\u1ea1n \u0111\u00e3 l\u00e0m khi ch\u01b0a \u0111\u0103ng nh\u1eadp s\u1ebd b\u1ecb x\u00f3a v\u0129nh vi\u1ec5n.',
      effacer: 'X\u00f3a',
      retour: 'Quay l\u1ea1i'
    },
    ht: {
      titre: 'Kreye kont ou',
      texte: 'Antre im\u00e8l ou \u2014 nou pral voye yon k\u00f2d, pa gen modpas.',
      email: 'Im\u00e8l',
      envoyer: 'Voye k\u00f2d',
      code: 'K\u00f2d',
      verifier: 'Konfime',
      codeEnvoye: 'K\u00f2d voye! Tcheke im\u00e8l ou.',
      courrielVide: 'Tanpri antre im\u00e8l ou.',
      codeVide: 'Tanpri antre k\u00f2d la.',
      envoiEnCours: 'Ap voye\u2026',
      verifEnCours: 'Ap tcheke\u2026',
      indisponible: 'Kreyasyon kont pa disponib kounye a.',
      lienInvite: 'Kontinye san kont',
      avertInvite: 'Pwogr\u00e8 ou ka p\u00e8di si done navigat\u00e8 a efase.',
      codeInvalide: 'K\u00f2d la pa bon oswa li ekspire.',
      profilTitre: 'Ki moun ou ye?',
      profilAjouter: '+ Ajoute yon pwofil',
      conflitTitre: 'Kont sa a gen pwogr\u00e8 deja',
      conflitTexte: 'Ou te avanse san ou pa konekte tou. Ki pwogr\u00e8 ou vle kenbe?',
      conflitGarder: 'Kenbe pwogr\u00e8 kont lan',
      conflitNouveau: 'Kenbe nouvo a, nan yon nouvo pwofil',
      effacerTitre: 'Efase pwogr\u00e8 ou?',
      effacerTexte: 'Sa ou te f\u00e8 san ou pa konekte a pral efase pou tout bon.',
      effacer: 'Efase',
      retour: 'Retounen'
    },
    tl: {
      titre: 'Gumawa ng iyong account',
      texte: 'Ilagay ang iyong email \u2014 magpapadala kami ng code, walang password na kailangan.',
      email: 'Email',
      envoyer: 'Ipadala ang code',
      code: 'Code',
      verifier: 'Kumpirmahin',
      codeEnvoye: 'Naipadala na ang code! Tingnan ang iyong email.',
      courrielVide: 'Pakilagay ang iyong email.',
      codeVide: 'Pakilagay ang code.',
      envoiEnCours: 'Ipinapadala\u2026',
      verifEnCours: 'Sinusuri\u2026',
      indisponible: 'Hindi available sa ngayon ang paggawa ng account.',
      lienInvite: 'Magpatuloy nang walang account',
      avertInvite: 'Maaaring mawala ang iyong progreso kung mabubura ang data ng browser.',
      codeInvalide: 'Mali o expired na ang code.',
      profilTitre: 'Sino ka?',
      profilAjouter: '+ Magdagdag ng profile',
      conflitTitre: 'May progreso na ang account na ito',
      conflitTexte: 'Nagpatuloy ka rin nang hindi naka-sign in. Aling progreso ang gusto mong panatilihin?',
      conflitGarder: 'Panatilihin ang progreso ng account',
      conflitNouveau: 'Panatilihin ang bago, sa bagong profile',
      effacerTitre: 'Buburahin ang iyong progreso?',
      effacerTexte: 'Ang ginawa mo nang hindi naka-sign in ay buburahin nang tuluyan.',
      effacer: 'Burahin',
      retour: 'Bumalik'
    },
    id: {
      titre: 'Buat akunmu',
      texte: 'Masukkan emailmu \u2014 kami akan kirim kode, tanpa kata sandi.',
      email: 'Email',
      envoyer: 'Kirim kode',
      code: 'Kode',
      verifier: 'Konfirmasi',
      codeEnvoye: 'Kode terkirim! Cek emailmu.',
      courrielVide: 'Silakan masukkan emailmu.',
      codeVide: 'Silakan masukkan kode.',
      envoiEnCours: 'Mengirim\u2026',
      verifEnCours: 'Memeriksa\u2026',
      indisponible: 'Pembuatan akun belum tersedia saat ini.',
      lienInvite: 'Lanjutkan tanpa akun',
      avertInvite: 'Progresmu bisa hilang jika data browser dihapus.',
      codeInvalide: 'Kode salah atau sudah kedaluwarsa.',
      profilTitre: 'Siapa kamu?',
      profilAjouter: '+ Tambah profil',
      conflitTitre: 'Akun ini sudah punya progres',
      conflitTexte: 'Kamu juga sudah belajar tanpa masuk. Progres mana yang ingin kamu simpan?',
      conflitGarder: 'Simpan progres akun',
      conflitNouveau: 'Simpan yang baru, di profil baru',
      effacerTitre: 'Hapus progresmu?',
      effacerTexte: 'Yang kamu kerjakan tanpa masuk akan dihapus permanen.',
      effacer: 'Hapus',
      retour: 'Kembali'
    },
    nl: {
      titre: 'Maak je account aan',
      texte: 'Vul je e-mailadres in \u2014 we sturen je een code, geen wachtwoord nodig.',
      email: 'E-mail',
      envoyer: 'Code versturen',
      code: 'Code',
      verifier: 'Bevestigen',
      codeEnvoye: 'Code verstuurd! Check je e-mail.',
      courrielVide: 'Vul alsjeblieft je e-mailadres in.',
      codeVide: 'Vul alsjeblieft de code in.',
      envoiEnCours: 'Versturen\u2026',
      verifEnCours: 'Controleren\u2026',
      indisponible: 'Account aanmaken is nu niet beschikbaar.',
      lienInvite: 'Doorgaan zonder account',
      avertInvite: 'Je voortgang kan verloren gaan als je browsergegevens worden gewist.',
      codeInvalide: 'Onjuiste of verlopen code.',
      profilTitre: 'Wie ben jij?',
      profilAjouter: '+ Profiel toevoegen',
      conflitTitre: 'Dit account heeft al voortgang',
      conflitTexte: 'Je bent ook verder gekomen zonder in te loggen. Welke voortgang wil je bewaren?',
      conflitGarder: 'Bewaar die van het account',
      conflitNouveau: 'Bewaar de nieuwe, in een nieuw profiel',
      effacerTitre: 'Je voortgang wissen?',
      effacerTexte: 'Wat je zonder inloggen hebt gedaan, wordt definitief gewist.',
      effacer: 'Wissen',
      retour: 'Terug'
    },
    de: {
      titre: 'Erstelle dein Konto',
      texte: 'Gib deine E-Mail-Adresse ein \u2014 wir schicken dir einen Code, kein Passwort n\u00f6tig.',
      email: 'E-Mail',
      envoyer: 'Code senden',
      code: 'Code',
      verifier: 'Best\u00e4tigen',
      codeEnvoye: 'Code gesendet! Sieh in deinem Postfach nach.',
      courrielVide: 'Bitte gib deine E-Mail-Adresse ein.',
      codeVide: 'Bitte gib den Code ein.',
      envoiEnCours: 'Wird gesendet\u2026',
      verifEnCours: 'Wird gepr\u00fcft\u2026',
      indisponible: 'Die Kontoerstellung ist gerade nicht verf\u00fcgbar.',
      lienInvite: 'Ohne Konto fortfahren',
      avertInvite: 'Dein Fortschritt k\u00f6nnte verloren gehen, wenn deine Browserdaten gel\u00f6scht werden.',
      codeInvalide: 'Falscher oder abgelaufener Code.',
      profilTitre: 'Wer bist du?',
      profilAjouter: '+ Profil hinzuf\u00fcgen',
      conflitTitre: 'Dieses Konto hat bereits Fortschritte',
      conflitTexte: 'Du bist auch ohne Anmeldung vorangekommen. Welchen Fortschritt m\u00f6chtest du behalten?',
      conflitGarder: 'Fortschritt des Kontos behalten',
      conflitNouveau: 'Den neuen behalten, in einem neuen Profil',
      effacerTitre: 'Deinen Fortschritt l\u00f6schen?',
      effacerTexte: 'Was du ohne Anmeldung gemacht hast, wird endg\u00fcltig gel\u00f6scht.',
      effacer: 'L\u00f6schen',
      retour: 'Zur\u00fcck'
    },
    fa: {
      titre: '\u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc\u200c\u0627\u062a \u0631\u0627 \u0628\u0633\u0627\u0632',
      texte: '\u0627\u06cc\u0645\u06cc\u0644\u062a \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646 \u2014 \u06a9\u062f\u06cc \u0628\u0631\u0627\u06cc\u062a \u0645\u06cc\u200c\u0641\u0631\u0633\u062a\u06cc\u0645\u060c \u0628\u062f\u0648\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631.',
      email: '\u0627\u06cc\u0645\u06cc\u0644',
      envoyer: '\u0627\u0631\u0633\u0627\u0644 \u06a9\u062f',
      code: '\u06a9\u062f',
      verifier: '\u062a\u0623\u06cc\u06cc\u062f',
      codeEnvoye: '\u06a9\u062f \u0627\u0631\u0633\u0627\u0644 \u0634\u062f! \u0627\u06cc\u0645\u06cc\u0644\u062a \u0631\u0627 \u0686\u06a9 \u06a9\u0646.',
      courrielVide: '\u0644\u0637\u0641\u0627\u064b \u0627\u06cc\u0645\u06cc\u0644\u062a \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646.',
      codeVide: '\u0644\u0637\u0641\u0627\u064b \u06a9\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646.',
      envoiEnCours: '\u062f\u0631 \u062d\u0627\u0644 \u0627\u0631\u0633\u0627\u0644\u2026',
      verifEnCours: '\u062f\u0631 \u062d\u0627\u0644 \u0628\u0631\u0631\u0633\u06cc\u2026',
      indisponible: '\u0633\u0627\u062e\u062a \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062f\u0631 \u062d\u0627\u0644 \u062d\u0627\u0636\u0631 \u0645\u0645\u06a9\u0646 \u0646\u06cc\u0633\u062a.',
      lienInvite: '\u0627\u062f\u0627\u0645\u0647 \u0628\u062f\u0648\u0646 \u0633\u0627\u062e\u062a \u062d\u0633\u0627\u0628',
      avertInvite: '\u0627\u06af\u0631 \u062f\u0627\u062f\u0647\u200c\u0647\u0627\u06cc \u0645\u0631\u0648\u0631\u06af\u0631 \u067e\u0627\u06a9 \u0634\u0648\u062f\u060c \u0645\u0645\u06a9\u0646 \u0627\u0633\u062a \u067e\u06cc\u0634\u0631\u0641\u062a\u062a \u0627\u0632 \u0628\u06cc\u0646 \u0628\u0631\u0648\u062f.',
      codeInvalide: '\u06a9\u062f \u0646\u0627\u062f\u0631\u0633\u062a \u0627\u0633\u062a \u06cc\u0627 \u0645\u0646\u0642\u0636\u06cc \u0634\u062f\u0647.',
      profilTitre: '\u062a\u0648 \u06a9\u06cc \u0647\u0633\u062a\u06cc\u061f',
      profilAjouter: '+ \u0627\u0641\u0632\u0648\u062f\u0646 \u0646\u0645\u0627\u06cc\u0647',
      conflitTitre: '\u0627\u06cc\u0646 \u062d\u0633\u0627\u0628 \u0627\u0632 \u0642\u0628\u0644 \u067e\u06cc\u0634\u0631\u0641\u062a \u062f\u0627\u0631\u062f',
      conflitTexte: '\u0628\u062f\u0648\u0646 \u0648\u0631\u0648\u062f \u0647\u0645 \u067e\u06cc\u0634 \u0631\u0641\u062a\u06cc. \u06a9\u062f\u0627\u0645 \u067e\u06cc\u0634\u0631\u0641\u062a \u0631\u0627 \u0645\u06cc\u200c\u062e\u0648\u0627\u0647\u06cc \u0646\u06af\u0647 \u062f\u0627\u0631\u06cc\u061f',
      conflitGarder: '\u067e\u06cc\u0634\u0631\u0641\u062a \u062d\u0633\u0627\u0628 \u0631\u0627 \u0646\u06af\u0647 \u062f\u0627\u0631',
      conflitNouveau: '\u067e\u06cc\u0634\u0631\u0641\u062a \u062c\u062f\u06cc\u062f \u0631\u0627 \u062f\u0631 \u06cc\u06a9 \u0646\u0645\u0627\u06cc\u0647\u0654 \u062c\u062f\u06cc\u062f \u0646\u06af\u0647 \u062f\u0627\u0631',
      effacerTitre: '\u067e\u06cc\u0634\u0631\u0641\u062a\u062a \u067e\u0627\u06a9 \u0634\u0648\u062f\u061f',
      effacerTexte: '\u0622\u0646\u0686\u0647 \u0628\u062f\u0648\u0646 \u0648\u0631\u0648\u062f \u0627\u0646\u062c\u0627\u0645 \u062f\u0627\u062f\u06cc \u0628\u0631\u0627\u06cc \u0647\u0645\u06cc\u0634\u0647 \u067e\u0627\u06a9 \u0645\u06cc\u200c\u0634\u0648\u062f.',
      effacer: '\u067e\u0627\u06a9 \u06a9\u0646',
      retour: '\u0628\u0627\u0632\u06af\u0634\u062a'
    },
    sv: {
      titre: 'Skapa ditt konto',
      texte: 'Ange din e-post \u2014 vi skickar en kod, inget l\u00f6senord beh\u00f6vs.',
      email: 'E-post',
      envoyer: 'Skicka kod',
      code: 'Kod',
      verifier: 'Bekr\u00e4fta',
      codeEnvoye: 'Koden \u00e4r skickad! Kolla din e-post.',
      courrielVide: 'Ange din e-postadress.',
      codeVide: 'Ange koden.',
      envoiEnCours: 'Skickar\u2026',
      verifEnCours: 'Kontrollerar\u2026',
      indisponible: 'Det g\u00e5r inte att skapa konto just nu.',
      lienInvite: 'Forts\u00e4tt utan konto',
      avertInvite: 'Dina framsteg kan g\u00e5 f\u00f6rlorade om webbl\u00e4sarens data rensas.',
      codeInvalide: 'Felaktig eller utg\u00e5ngen kod.',
      profilTitre: 'Vem \u00e4r du?',
      profilAjouter: '+ L\u00e4gg till en profil',
      conflitTitre: 'Det h\u00e4r kontot har redan framsteg',
      conflitTexte: 'Du har ocks\u00e5 kommit fram\u00e5t utan att logga in. Vilka framsteg vill du beh\u00e5lla?',
      conflitGarder: 'Beh\u00e5ll kontots framsteg',
      conflitNouveau: 'Beh\u00e5ll de nya, i en ny profil',
      effacerTitre: 'Radera dina framsteg?',
      effacerTexte: 'Det du gjorde utan att logga in raderas permanent.',
      effacer: 'Radera',
      retour: 'Tillbaka'
    },
    no: {
      titre: 'Opprett kontoen din',
      texte: 'Skriv inn e-posten din \u2014 vi sender deg en kode, ikke noe passord n\u00f8dvendig.',
      email: 'E-post',
      envoyer: 'Send kode',
      code: 'Kode',
      verifier: 'Bekreft',
      codeEnvoye: 'Koden er sendt! Sjekk e-posten din.',
      courrielVide: 'Skriv inn e-posten din.',
      codeVide: 'Skriv inn koden.',
      envoiEnCours: 'Sender\u2026',
      verifEnCours: 'Sjekker\u2026',
      indisponible: 'Det er ikke mulig \u00e5 opprette konto akkurat n\u00e5.',
      lienInvite: 'Fortsett uten konto',
      avertInvite: 'Fremgangen din kan g\u00e5 tapt hvis nettleserdataene slettes.',
      codeInvalide: 'Feil eller utl\u00f8pt kode.',
      profilTitre: 'Hvem er du?',
      profilAjouter: '+ Legg til en profil',
      conflitTitre: 'Denne kontoen har allerede fremgang',
      conflitTexte: 'Du har ogs\u00e5 kommet videre uten \u00e5 logge inn. Hvilken fremgang vil du beholde?',
      conflitGarder: 'Behold kontoens fremgang',
      conflitNouveau: 'Behold den nye, i en ny profil',
      effacerTitre: 'Slette fremgangen din?',
      effacerTexte: 'Det du gjorde uten \u00e5 logge inn, blir slettet for godt.',
      effacer: 'Slett',
      retour: 'Tilbake'
    },
    ru: {
      titre: '\u0421\u043e\u0437\u0434\u0430\u0439 \u0441\u0432\u043e\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442',
      texte: '\u0412\u0432\u0435\u0434\u0438 \u0441\u0432\u043e\u044e \u043f\u043e\u0447\u0442\u0443 \u2014 \u043c\u044b \u043f\u0440\u0438\u0448\u043b\u0451\u043c \u043a\u043e\u0434, \u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043d\u0443\u0436\u0435\u043d.',
      email: 'Email',
      envoyer: '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u0434',
      code: '\u041a\u043e\u0434',
      verifier: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c',
      codeEnvoye: '\u041a\u043e\u0434 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d! \u041f\u0440\u043e\u0432\u0435\u0440\u044c \u043f\u043e\u0447\u0442\u0443.',
      courrielVide: '\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438 \u0441\u0432\u043e\u044e \u043f\u043e\u0447\u0442\u0443.',
      codeVide: '\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438 \u043a\u043e\u0434.',
      envoiEnCours: '\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430\u2026',
      verifEnCours: '\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430\u2026',
      indisponible: '\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e.',
      lienInvite: '\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u0431\u0435\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430',
      avertInvite: '\u0422\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u043e\u0442\u0435\u0440\u044f\u043d, \u0435\u0441\u043b\u0438 \u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \u0431\u0443\u0434\u0443\u0442 \u043e\u0447\u0438\u0449\u0435\u043d\u044b.',
      codeInvalide: '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u0438\u043b\u0438 \u043f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u0434.',
      profilTitre: '\u041a\u0442\u043e \u0442\u044b?',
      profilAjouter: '+ \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c',
      conflitTitre: '\u0412 \u044d\u0442\u043e\u043c \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0435 \u0443\u0436\u0435 \u0435\u0441\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441',
      conflitTexte: '\u0411\u0435\u0437 \u0432\u0445\u043e\u0434\u0430 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u0442\u043e\u0436\u0435 \u043d\u0430\u043a\u043e\u043f\u0438\u043b\u0441\u044f \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441. \u041a\u0430\u043a\u043e\u0439 \u0438\u0437 \u043d\u0438\u0445 \u0445\u043e\u0447\u0435\u0448\u044c \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c?',
      conflitGarder: '\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430',
      conflitNouveau: '\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439, \u0432 \u043d\u043e\u0432\u043e\u043c \u043f\u0440\u043e\u0444\u0438\u043b\u0435',
      effacerTitre: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0442\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441?',
      effacerTexte: '\u0422\u043e, \u0447\u0442\u043e \u0431\u044b\u043b\u043e \u0441\u0434\u0435\u043b\u0430\u043d\u043e \u0431\u0435\u0437 \u0432\u0445\u043e\u0434\u0430 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043b\u0435\u043d\u043e \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430.',
      effacer: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c',
      retour: '\u041d\u0430\u0437\u0430\u0434'
    }
  };

  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function demarrerCompte(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    let langue = options.langue;
    if (!langue) { try { langue = localStorage.getItem(CLE_LANGUE); } catch (e) {} }
    if (!langue || !DICO[langue]) langue = 'fr';
    function T(cle) { return (DICO[langue] && DICO[langue][cle]) || DICO.en[cle] || DICO.fr[cle] || ''; }
    const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
    const IDENTITE = (options.identite && typeof options.identite === 'object' && options.identite.prenom)
      ? { prenom: String(options.identite.prenom), genre: options.identite.genre === 'f' ? 'f' : 'm', adulte: !!options.identite.adulte }
      : null;
    const P = function () { return window.KebBekProgression; };

    let arrete = false;
    let invitePrecedent = null;     // valeur de kebbek_invite avant la connexion (restaurée si l'élève renonce)
    const minuteurs = [];
    function planifier(fn, ms) { minuteurs.push(setTimeout(function () { if (!arrete) fn(); }, ms)); }

    // La fenêtre se pose sur la scène de la mémoire (position absolue) ; à défaut, sur le conteneur.
    const hote = conteneur.querySelector('.rbek-scene') || conteneur;
    const voile = document.createElement('div');
    voile.className = 'lect-voile cpt-voile' + (hote === conteneur ? ' cpt-voile-seul' : '');
    voile.innerHTML =
      '<div class="lect-carte cpt-carte" role="dialog" aria-modal="true" aria-labelledby="cptTitre"' + (rtl ? ' dir="rtl"' : '') + '>' +
        '<div class="lect-entete">' +
          '<span class="cpt-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></span>' +
          '<h2 class="lect-titre" id="cptTitre"></h2>' +
        '</div>' +
        '<div class="cpt-corps"></div>' +
      '</div>';
    hote.appendChild(voile);
    const carte = voile.querySelector('.cpt-carte');
    const titre = voile.querySelector('#cptTitre');
    const corps = voile.querySelector('.cpt-corps');
    planifier(function () { voile.classList.add('lect-voile-visible'); carte.classList.add('lect-carte-visible'); }, 40);

    function fermer(suite) {
      carte.classList.remove('lect-carte-visible');
      voile.classList.remove('lect-voile-visible');
      planifier(function () { voile.remove(); suite(); }, 320);
    }
    function terminer(identite) {
      fermer(function () {
        if (typeof callbacks.onComplet === 'function') {
          try { callbacks.onComplet(identite); } catch (e) { console.warn('onComplet a échoué.', e); }
        }
      });
    }
    function annuler() {
      fermer(function () {
        if (typeof callbacks.onAnnule === 'function') {
          try { callbacks.onAnnule(); } catch (e) { console.warn('onAnnule a échoué.', e); }
        }
      });
    }

    // ---------- éléments communs ----------
    function message() {
      const p = document.createElement('p');
      p.className = 'cpt-msg';
      p.setAttribute('role', 'status');
      return {
        el: p,
        dire: function (txt, erreur) { p.textContent = txt; p.classList.toggle('cpt-msg-erreur', !!erreur); }
      };
    }
    function lienInvite() {
      const boite = document.createElement('div');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cpt-lien';
      b.textContent = T('lienInvite');
      b.addEventListener('click', annuler);
      const av = document.createElement('p');
      av.className = 'cpt-avert';
      av.textContent = T('avertInvite');
      boite.appendChild(b);
      boite.appendChild(av);
      return boite;
    }
    function champ(type, placeholder, extra) {
      const c = document.createElement('input');
      c.type = type;
      c.className = 'cpt-champ';
      c.placeholder = placeholder;
      c.setAttribute('aria-label', placeholder);
      c.maxLength = 120;
      c.spellcheck = false;
      Object.keys(extra || {}).forEach(function (k) { c[k] = extra[k]; });
      return c;
    }
    function bouton(libelle) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'lect-btn cpt-btn';
      b.textContent = libelle;
      return b;
    }

    // ---------- 1. courriel ----------
    function etapeCourriel() {
      titre.textContent = T('titre');
      corps.innerHTML = '';
      const intro = document.createElement('p');
      intro.className = 'lect-texte';
      intro.textContent = T('texte');
      const email = champ('email', T('email'), { autocomplete: 'email', inputMode: 'email' });
      email.setAttribute('dir', 'ltr');
      const envoyer = bouton(T('envoyer'));
      const msg = message();
      corps.appendChild(intro);
      corps.appendChild(email);
      corps.appendChild(msg.el);
      corps.appendChild(envoyer);
      corps.appendChild(lienInvite());

      async function envoi() {
        const adresse = email.value.trim();
        if (!adresse) { msg.dire(T('courrielVide'), true); email.focus(); return; }
        const prog = P();
        if (!prog) { msg.dire(T('indisponible'), true); return; }
        envoyer.disabled = true;
        msg.dire(T('envoiEnCours'), false);
        try { await prog.initSession(); } catch (e) { console.warn('initSession a échoué.', e); }
        const client = prog.client;
        if (!client) { msg.dire(T('indisponible'), true); envoyer.disabled = false; return; }
        let res;
        try { res = await client.auth.signInWithOtp({ email: adresse, options: { shouldCreateUser: true } }); }
        catch (e) { res = { error: e }; }
        if (arrete) return;
        envoyer.disabled = false;
        if (res.error) { msg.dire(res.error.message || T('indisponible'), true); return; }
        etapeCode(adresse);
      }
      envoyer.addEventListener('click', envoi);
      email.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); envoi(); } });
      planifier(function () { email.focus({ preventScroll: true }); }, 450);
    }

    // ---------- 2. code ----------
    function etapeCode(adresse) {
      titre.textContent = T('titre');
      corps.innerHTML = '';
      const intro = document.createElement('p');
      intro.className = 'lect-texte';
      intro.textContent = T('codeEnvoye');
      const code = champ('text', T('code'), { autocomplete: 'one-time-code', inputMode: 'numeric' });
      code.setAttribute('dir', 'ltr');
      const verifier = bouton(T('verifier'));
      const msg = message();
      corps.appendChild(intro);
      corps.appendChild(code);
      corps.appendChild(msg.el);
      corps.appendChild(verifier);
      corps.appendChild(lienInvite());

      async function verif() {
        const token = code.value.trim();
        if (!token) { msg.dire(T('codeVide'), true); code.focus(); return; }
        const prog = P();
        verifier.disabled = true;
        msg.dire(T('verifEnCours'), false);
        let res;
        try { res = await prog.client.auth.verifyOtp({ email: adresse, token: token, type: 'email' }); }
        catch (e) { res = { error: e }; }
        if (arrete) return;
        if (res.error || !res.data || !res.data.session) {
          msg.dire(T('codeInvalide'), true);
          verifier.disabled = false;
          code.focus();
          return;
        }
        prog.definirSession(res.data.session);
        try { invitePrecedent = localStorage.getItem(CLE_INVITE); localStorage.removeItem(CLE_INVITE); } catch (e) {}
        await apresAuthentification();
      }
      verifier.addEventListener('click', verif);
      code.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); verif(); } });
      planifier(function () { code.focus({ preventScroll: true }); }, 100);
    }

    // ---------- 3. routeur post-authentification ----------
    async function apresAuthentification() {
      let profils = [];
      try { profils = await P().profilsDuCompte(); } catch (e) { console.warn('profilsDuCompte a échoué.', e); }
      if (arrete) return;
      if (profils.length >= 1 && progresInviteLocal()) { etapeConflit(profils); return; }
      suiteProfilsExistants(profils);
    }
    function suiteProfilsExistants(profils) {
      if (profils.length === 1) { utiliserProfil(profils[0]); return; }
      if (profils.length > 1) { etapeChoixProfil(profils); return; }
      creerNouveauProfil();
    }

    // Adopte un profil DÉJÀ existant : jamais de migration invité→compte ici (règle de
    // fusion : uniquement au tout premier creerProfil() réussi), jamais d'écriture non plus.
    function utiliserProfil(profil) {
      P().definirProfilActif(profil.id);
      terminer({ prenom: profil.prenom, genre: profil.genre === 'f' ? 'f' : 'm', adulte: !!profil.adulte });
    }

    async function creerNouveauProfil() {
      if (!IDENTITE) { annuler(); return; }           // pas de prénom connu : on ne crée rien à l'aveugle
      const prog = P();
      let res = null;
      try { res = await prog.creerProfil(IDENTITE.prenom); } catch (e) { console.warn('creerProfil a échoué.', e); }
      if (arrete) return;
      if (!res || !res.profil || !res.profil.id) {
        console.warn('creerNouveauProfil : aucun profil exploitable.', res);
        etapeErreurFinale();
        return;
      }
      prog.definirProfilActif(res.profil.id);
      if (res.estNouveau) {
        const id = res.profil.id;
        const migrations = ['migrerProgressionInviteVersCompte', 'migrerIdentiteInviteVersCompte', 'migrerPersonnageInviteVersCompte', 'migrerPositionsLeconInviteVersCompte'];
        for (let i = 0; i < migrations.length; i++) {
          if (typeof prog[migrations[i]] !== 'function') continue;
          try { await prog[migrations[i]](id); } catch (e) { console.warn(migrations[i] + ' a échoué.', e); }
        }
        // 🆕 (02-11-2026) banque de mots de l'élève (mots.js) : même moment, même règle
        if (window.KebBekMots && typeof window.KebBekMots.migrerInviteVersCompte === 'function') {
          try { await window.KebBekMots.migrerInviteVersCompte(id); } catch (e) { console.warn('migrerMotsInviteVersCompte a échoué.', e); }
        }
      }
      // prénom déjà écrit par creerProfil ; nationalité non collectée ici (undefined = ne pas toucher)
      try { await prog.enregistrerIdentite(IDENTITE.genre, undefined, undefined, IDENTITE.adulte); }
      catch (e) { console.warn('enregistrerIdentite a échoué.', e); }
      if (arrete) return;
      terminer(Object.assign({}, IDENTITE));
    }

    // ---------- conflit : le compte a déjà une progression, l'invité aussi ----------
    function texteEtBoutons(texte, boutons) {
      corps.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'lect-texte';
      p.textContent = texte;
      corps.appendChild(p);
      boutons.forEach(function (b) { corps.appendChild(b); });
      return corps;
    }
    function etapeConflit(profils) {
      titre.textContent = T('conflitTitre');
      const garder = bouton(T('conflitGarder'));
      garder.addEventListener('click', function () { etapeConfirmerEffacement(profils); });
      const boutons = [garder];
      if (IDENTITE) {
        const nouveau = bouton(T('conflitNouveau'));
        nouveau.classList.add('lect-btn-clair');
        nouveau.addEventListener('click', function () { nouveau.disabled = true; creerNouveauProfil(); });
        boutons.push(nouveau);
      }
      texteEtBoutons(T('conflitTexte'), boutons);
      const lien = document.createElement('button');
      lien.type = 'button';
      lien.className = 'cpt-lien';
      lien.textContent = T('lienInvite');
      lien.addEventListener('click', sortirSansCompte);
      corps.appendChild(lien);
      planifier(function () { garder.focus({ preventScroll: true }); }, 100);
    }
    function etapeConfirmerEffacement(profils) {
      titre.textContent = T('effacerTitre');
      const effacer = bouton(T('effacer'));
      effacer.addEventListener('click', function () {
        effacerProgresInvite();
        suiteProfilsExistants(profils);
      });
      const retour = bouton(T('retour'));
      retour.classList.add('lect-btn-clair');
      retour.addEventListener('click', function () { etapeConflit(profils); });
      texteEtBoutons(T('effacerTexte'), [retour, effacer]);
      planifier(function () { retour.focus({ preventScroll: true }); }, 100);
    }
    // Renoncer APRÈS la connexion : on se déconnecte et l'invité retrouve tout tel quel.
    async function sortirSansCompte() {
      try { if (P() && P().deconnecter) await P().deconnecter(); } catch (e) { console.warn('deconnecter a échoué.', e); }
      try { if (invitePrecedent !== null) localStorage.setItem(CLE_INVITE, invitePrecedent); } catch (e) {}
      if (!arrete) annuler();
    }

    function etapeErreurFinale() {
      titre.textContent = T('titre');
      corps.innerHTML = '';
      const msg = message();
      msg.dire(T('indisponible'), true);
      corps.appendChild(msg.el);
      corps.appendChild(lienInvite());
    }

    function etapeChoixProfil(profils) {
      titre.textContent = T('profilTitre');
      corps.innerHTML = '';
      const liste = document.createElement('div');
      liste.className = 'cpt-profils';
      profils.forEach(function (profil) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cpt-profil';
        b.textContent = profil.prenom;
        b.setAttribute('dir', 'auto');
        b.addEventListener('click', function () { utiliserProfil(profil); });
        liste.appendChild(b);
      });
      corps.appendChild(liste);
      if (IDENTITE) {
        const ajouter = document.createElement('button');
        ajouter.type = 'button';
        ajouter.className = 'cpt-lien';
        ajouter.textContent = T('profilAjouter');
        ajouter.addEventListener('click', function () { ajouter.disabled = true; creerNouveauProfil(); });
        corps.appendChild(ajouter);
      }
      const premier = liste.querySelector('.cpt-profil');
      if (premier) planifier(function () { premier.focus({ preventScroll: true }); }, 100);
    }

    etapeCourriel();

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        if (voile.parentNode) voile.parentNode.removeChild(voile);
      }
    };
  }

  window.KebBekCompte = { demarrerCompte: demarrerCompte };
})();
