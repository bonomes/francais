/* ==================================================================
   sequence-menu.js — le menu « simple » : le Lecteur mène la première visite.

   🆕 (02-11-2026) Ordre de la PREMIÈRE visite : 1. le Lecteur demande la permission
   d'ouvrir les fichiers .mem (lire et organiser les mémoires) ; 2. écran d'ASSEMBLAGE
   (assembler()) : il « réfléchit » et « organise », étape par étape, comme une IA ;
   3. le menu apparaît (une ligne + aperçu du chemin), le Lecteur explique le chemin ;
   4. SECONDE demande, « quelques choses de plus » (gérer et créer tes contacts = il
   cherche un professeur ; te corriger poliment ; travailler en arrière-plan), puis
   la fenêtre de confirmation. Le gag du refus vaut pour les deux demandes.

   🆕 (08-11-2026) Étape perdue ? Si kebbek_menu_etape manque (autre navigateur, données effacées), on cherche d'abord des traces de la
   première mémoire (local, puis compte : chapitres 'menu_autorise' / 'm1') avant de rejouer le tutoriel : voir verifierVisiteFaite().

   🆕 (02-11-2026) Le menu complet n'arrive plus qu'APRÈS la première mémoire.
   Trois états, mémorisés dans kebbek_menu_etape :
     ''          première visite : tutoriel ci-dessous (étapes 1 à 4), qui se
                 termine sur un menu à UNE ligne (Mémoires, qui pulse) → 'autorise' ;
     'autorise'  menu à une ligne. Dès que la première mémoire (ID_PREMIERE_MEMOIRE,
                 lue via KebBekProgression.lireProgression()) est terminée, le Lecteur
                 ANNONCE ce qu'il a ajouté « pendant que nous faisions la première
                 leçon » (dont un professeur : la ligne Cours privés), les autres
                 lignes apparaissent, puis → 'complet' ;
     'complet'   menu complet directement.
   Pour tester sans refaire la mémoire : ?menu=annonce (rejoue l'annonce),
   ?menu=reduit (menu à une ligne), ?menu=complet — rien n'est enregistré.
   Sans window.KebBekProgression, on ne peut pas savoir : menu complet.

   🆕 (01-11-2026, refonte) Plus de visite guidée par Bek. Dans un seul
   conteneur (scène .rbek-scene), le déroulé de la PREMIÈRE visite est :

     1. Le menu ne compte qu'UNE ligne : « Mémoires ».
     2. Sous cette ligne, un aperçu du chemin des mémoires : une case
        ouverte, quelques cases verrouillées (APERCU_CASES).
     3. (ordre réel : voir plus haut) Le Lecteur demande des « autorisations »
        (fenêtre système). Gag : refuser ne mène nulle part — la seconde
        fenêtre n'offre que « Autoriser » et « Autoriser aussi ». Elle
        promet que l'autorisation pourra être retirée dans les paramètres.
     4. L'aperçu se replie ; Mémoires reste SEULE (elle pulse : « vas-y »).
        Les autres lignes viendront après la première mémoire (annonce()),
        dans l'ordre de ENTREES : Cours privés, Connexion / Créer un compte
        (ou Mon compte), [Mode professeur], Paramètres (toujours la dernière).
     5. Dans Paramètres, « Retirer » l'autorisation échoue toujours.

   Bek reste muette (bouche fermée) mais RÉAGIT, à droite : son expression change
   à chaque réplique du Lecteur et à chaque fenêtre (voir tutoriel()). Les poses
   sont dans SOURCES_PAR_DEFAUT ; en changer une = changer le nom passé à montrer().

   options.visite : true = toujours rejouer le tutoriel, false = jamais (menu complet).
   Sans window.KebBekLecteur, tout est sauté (menu complet).

   Entrées : la liste ENTREES (dans demarrerMenuSimple). Ajouter une entrée =
   une ligne + son libellé (menu…) + une icône + son callback.
     · Mémoires → callbacks.onMemoires (onHistoires accepté)
       ⚠️ titre PROVISOIRE : un terme plus large est à trouver (mémoires,
       histoires, exercices…)
     · Cours privés → callbacks.onPrives
     · Connexion / Créer un compte (invité) → callbacks.onCreerCompte
       « Mon compte » (connecté) → fenêtre avec « Se déconnecter »
     · Mode professeur (seulement si callbacks.onModeProfesseur est fourni)
     · Paramètres → fenêtre : Son (vrai), Langue (si callbacks.onChangerLangue),
       Autorisation du Lecteur (FAUX : le retrait échoue toujours)

   Dépend de sequence-reveil-bek.css (.rbek-scene, .rbek-pose), de
   sequence-lecteur.css/.js (fenêtres, icône du Lecteur) et de
   menu-principal.css (.kbm-bouton, .kbm-icone-chip), à charger avant
   sequence-menu.css.

   🆕 (02-11-2026) Les 20 langues du projet sont traduites (fr, en, es, it, pt, ca, eo, zh, ja,
   ko, vi, ht, tl, id, nl, de, fa, sv, no, ru). Registre : tutoiement partout (pt : « você »,
   comme la voix système du Lecteur ailleurs ; ja/ko : poli) ; le Lecteur garde son nom de
   sequence-lecteur.js (nomLecteur). Clés absentes (autoFichier, ok, enCours) : repli sur l'anglais.
   ⚠️ À faire relire par des locuteurs natifs, surtout le sarcasme de annonce2.

   @param {string} idConteneur
   @param {object} options : langue ; identite { prenom } ; visite (true/false/absent) ;
                             dossierImages, extension, sources
   @param {object} callbacks : onMemoires(), onPrives(), onModeProfesseur() (optionnel),
                               onCreerCompte(), onChangerLangue() (optionnel),
                               onPermission(accordee: bool)
   @returns {{ arreter: function }}
   ================================================================== */
(function () {
  'use strict';

  const CLE_LANGUE = 'kebbek_langue';
  const CLE_SON = 'kebbek_son';
  const CLE_AUTORISATION = 'kebbek_autorisation_lecteur';   // 'oui' | 'non' — décor seulement
  const CLE_VISITE = 'kebbek_menu_visite_v2';               // ANCIEN drapeau (tutoriel terminé, menu complet d'office) : lu seulement pour migrer
  const CLE_ETAPE = 'kebbek_menu_etape';                    // 'autorise' (menu à une ligne) | 'complet'
  const ID_PREMIERE_MEMOIRE = 'm1';                         // même id que MEMOIRES dans memoires.html
  const LANGUES_DROITE_A_GAUCHE = ['fa'];
  const DUREE_ENCOURS = 1200;     // « Retirer » semble réfléchir avant d'échouer
  const DUREE_FONDU = 180;        // fondu enchaîné entre deux expressions de Bek
  const APERCU_CASES = 5;         // aperçu du chemin : la 1re ouverte, les autres verrouillées

  // Toutes bouche fermée : Bek ne parle pas, elle réagit.
  const SOURCES_PAR_DEFAUT = {
    'bek-observe':        'images/reveil/bek_observe_01-01.webp',                          // regard de côté, curieuse
    'bek-examine':        'images/reveil/bek-examine_bouche-fermee_01-01.webp',            // main au front, scrute
    'bek-tendue':         'images/reveil/bek_tendue_bouche-fermee_01-01.webp',             // bras tendu : « voilà le chemin »
    'bek-concentree':     'images/reveil/bek_concentree_bouche-fermee_01-01.webp',         // main au menton : elle réfléchit
    'bek-conscience':     'images/reveil/bek-prise-de-conscience_bouche-fermee_01-01.webp',// mains levées, yeux ronds
    'bek-decue':          'images/reveil/bek_decue_01-01.webp',                            // déçue, soupire
    'bek-tres-concentree':'images/reveil/bek_tres-concentree_01-01.webp',                  // grimace de réflexion intense
    'bek-solennelle':     'images/reveil/bek_solennelle_bouche-fermee_01-01.webp',         // main sur le cœur, très sérieuse
    'bek-heureuse-ferme': 'images/reveil/bek_heureuse_bouche-fermee_01-01.webp'            // grand sourire, bras ouverts
  };
  const POSES = Object.keys(SOURCES_PAR_DEFAUT);

  const DICO = {
    fr: {
      lecteurChemin: 'Voici le chemin des mémoires de Bek. Une case est ouverte ; les autres s’ouvriront à mesure que tu avances.',
      lecteurDemande: 'Avant de commencer… j’aurais besoin de ton autorisation pour ouvrir quelques fichiers. Rien de grave.',
      suite: 'Suite',
      autoTitre: 'Demande d’autorisation',
      autoFichier: '*.mem',
      autoTexte: 'Le Lecteur demande l’autorisation d’ouvrir ces fichiers pour :',
      autoListe: ['Lire tes souvenirs', 'Les organiser'],
      lecteurPlus: 'Tant que j’y suis… peux-tu m’autoriser quelques petites choses de plus\u00a0? Rien de grave non plus.',
      autoTexte2: 'Le Lecteur demande l’autorisation de\u00a0:',
      autoListe2: ['Gérer et créer tes contacts', 'Te corriger poliment', 'Travailler en arrière-plan'],
      autoRefuser: 'Refuser',
      autoAutoriser: 'Autoriser',
      autoAutoriserAussi: 'Autoriser aussi',
      refus2: 'Encore\u00a0? Oui, encore. Toujours le règlement.',
      refus1: 'Je comprends. Mais je dois te redemander : c’est le règlement.',
      confTitre: 'Autorisation accordée',
      confTexte: 'Tu pourras retirer cette autorisation à tout moment dans les paramètres.',
      lecteurFin: 'Parfait ! Ouvre ta première mémoire. Pendant ce temps, je m’occupe du reste en arrière-plan.',
      annonce1: 'Te revoilà ! Pendant que nous faisions la première leçon, j’ai travaillé en arrière-plan, comme tu me l’as autorisé.',
      annonce2: 'J’ai ajouté quelques parties au menu. J’ai même trouvé un professeur qui pourra nous aider avec le français… vu qu’on aura visiblement besoin d’aide.',
      annonceFin: 'Le menu est à toi. De rien.',
      ok: 'OK',
      salutation: 'Salut, {prenom} !',
      salutationInvite: 'Bienvenue !',
      menuMemoires: 'Mémoires',   // titre PROVISOIRE
      apercuNom: 'Aperçu du chemin : une case ouverte, les autres verrouillées',
      menuPrives: 'Cours privés',
      menuCompteInvite: 'Connexion / Créer un compte',
      menuCompteConnecte: 'Mon compte',
      menuProfesseur: 'Mode professeur',
      menuParametres: 'Paramètres',
      paramTitre: 'Paramètres',
      paramSon: 'Son',
      sonOui: 'Activé',
      sonNon: 'Désactivé',
      sonCouper: 'Couper',
      sonActiver: 'Activer',
      paramLangue: 'Langue',
      paramChanger: 'Changer',
      compteTitre: 'Mon compte',
      compteTexte: 'Ta progression est enregistrée sur ton compte.',
      deconnexion: 'Se déconnecter',
      paramAutorisation: 'Autorisations du Lecteur',
      assembleTitre: 'Le Lecteur assemble les mémoires',
      assembleFini: 'Les mémoires sont prêtes',
      assembleEtapes: ['Ouverture des fichiers .mem', 'Réflexion', 'Organisation des souvenirs', 'Assemblage du chemin des mémoires'],
      autoAccordee: 'Accordée',
      autoRefusee: 'Refusée',
      retirer: 'Retirer',
      accorder: 'Accorder',
      fermer: 'Fermer',
      enCours: '…',
      erreurTitre: 'Erreur',
      excuses: [
        'Impossible de retirer l’autorisation : Le Lecteur a déjà tout lu.',
        'Le Lecteur a demandé de ne pas être dérangé pour le moment.',
        'Opération refusée par Le Lecteur.'
      ]
    },
    en: {
      lecteurChemin: 'This is the path of Bek’s memories. One square is open; the others will open as you go.',
      lecteurDemande: 'Before we start… I’ll need your permission to open a few files. Nothing serious.',
      suite: 'Next',
      autoTitre: 'Permission request',
      autoFichier: '*.mem',
      autoTexte: 'The Reader is requesting permission to open these files in order to:',
      autoListe: ['Read your memories', 'Organize them'],
      lecteurPlus: 'While I’m at it… could you allow me a few MORE things? Nothing serious either.',
      autoTexte2: 'The Reader is requesting permission to:',
      autoListe2: ['Manage and create your contacts', 'Politely correct you', 'Work in the background'],
      autoRefuser: 'Deny',
      autoAutoriser: 'Allow',
      autoAutoriserAussi: 'Also allow',
      refus2: 'Again? Yes, again. Still the rules.',
      refus1: 'I understand. But I have to ask again: it’s the rules.',
      confTitre: 'Permission granted',
      confTexte: 'You can withdraw this permission at any time in the settings.',
      lecteurFin: 'Perfect! Go ahead and open your first memory. Meanwhile, I’ll take care of the rest in the background.',
      annonce1: 'You’re back! While we were doing the first lesson, I worked in the background, as you allowed me to.',
      annonce2: 'I added a few parts to the menu. I even found a teacher who can help us with French… since we’ll obviously need the help.',
      annonceFin: 'The menu is yours. You’re welcome.',
      ok: 'OK',
      salutation: 'Hi, {prenom}!',
      salutationInvite: 'Welcome!',
      menuMemoires: 'Memories',   // PROVISIONAL title
      apercuNom: 'Path preview: one open square, the others locked',
      menuPrives: 'Private lessons',
      menuCompteInvite: 'Sign in / Create an account',
      menuCompteConnecte: 'My account',
      menuProfesseur: 'Teacher mode',
      menuParametres: 'Settings',
      paramTitre: 'Settings',
      paramSon: 'Sound',
      sonOui: 'On',
      sonNon: 'Off',
      sonCouper: 'Turn off',
      sonActiver: 'Turn on',
      paramLangue: 'Language',
      paramChanger: 'Change',
      compteTitre: 'My account',
      compteTexte: 'Your progress is saved to your account.',
      deconnexion: 'Sign out',
      paramAutorisation: 'Reader permissions',
      assembleTitre: 'The Reader is assembling the memories',
      assembleFini: 'The memories are ready',
      assembleEtapes: ['Opening .mem files', 'Thinking', 'Organizing the memories', 'Assembling the memory path'],
      autoAccordee: 'Granted',
      autoRefusee: 'Denied',
      retirer: 'Withdraw',
      accorder: 'Grant',
      fermer: 'Close',
      enCours: '…',
      erreurTitre: 'Error',
      excuses: [
        'Can’t withdraw the permission: The Reader has already read everything.',
        'The Reader asked not to be disturbed right now.',
        'Operation refused by The Reader.'
      ]
    },  // ---- 🆕 (02-11-2026) autres langues : même liste que sequence-memoire.js ----
    es: {
      lecteurChemin: 'Este es el camino de los recuerdos de Bek. Una casilla está abierta; las demás se abrirán a medida que avances.',
      lecteurDemande: 'Antes de empezar… necesito tu permiso para abrir unos archivos. Nada grave.',
      suite: 'Siguiente',
      autoTitre: 'Solicitud de permiso',
      autoTexte: 'El Lector solicita permiso para abrir estos archivos y así poder:',
      autoListe: ['Leer tus recuerdos', 'Organizarlos'],
      lecteurPlus: 'Ya que estoy… ¿me dejas hacer unas cuantas cosas MÁS? Tampoco es nada grave.',
      autoTexte2: 'El Lector solicita permiso para:',
      autoListe2: ['Gestionar y crear tus contactos', 'Corregirte con educación', 'Trabajar en segundo plano'],
      autoRefuser: 'Denegar',
      autoAutoriser: 'Permitir',
      autoAutoriserAussi: 'Permitir también',
      refus2: '¿Otra vez? Sí, otra vez. Sigue siendo el reglamento.',
      refus1: 'Lo entiendo. Pero tengo que volver a preguntar: es el reglamento.',
      confTitre: 'Permiso concedido',
      confTexte: 'Puedes retirar este permiso en cualquier momento en los ajustes.',
      lecteurFin: '¡Perfecto! Abre tu primer recuerdo. Mientras tanto, me encargo del resto en segundo plano.',
      annonce1: '¡Ya estás de vuelta! Mientras hacíamos la primera lección, estuve trabajando en segundo plano, como me autorizaste.',
      annonce2: 'He añadido algunas partes al menú. Incluso encontré a un profesor que podrá ayudarnos con el francés… ya que, evidentemente, vamos a necesitar ayuda.',
      annonceFin: 'El menú es tuyo. De nada.',
      salutation: '¡Hola, {prenom}!',
      salutationInvite: '¡Te damos la bienvenida!',
      menuMemoires: 'Recuerdos',
      apercuNom: 'Vista previa del camino: una casilla abierta, las demás bloqueadas',
      menuPrives: 'Clases particulares',
      menuCompteInvite: 'Iniciar sesión / Crear una cuenta',
      menuCompteConnecte: 'Mi cuenta',
      menuProfesseur: 'Modo profesor',
      menuParametres: 'Ajustes',
      paramTitre: 'Ajustes',
      paramSon: 'Sonido',
      sonOui: 'Activado',
      sonNon: 'Desactivado',
      sonCouper: 'Silenciar',
      sonActiver: 'Activar',
      paramLangue: 'Idioma',
      paramChanger: 'Cambiar',
      compteTitre: 'Mi cuenta',
      compteTexte: 'Tu progreso se guarda en tu cuenta.',
      deconnexion: 'Cerrar sesión',
      paramAutorisation: 'Permisos del Lector',
      assembleTitre: 'El Lector está ensamblando los recuerdos',
      assembleFini: 'Los recuerdos están listos',
      assembleEtapes: ['Abriendo archivos .mem', 'Reflexionando', 'Organizando los recuerdos', 'Ensamblando el camino de los recuerdos'],
      autoAccordee: 'Concedido',
      autoRefusee: 'Denegado',
      retirer: 'Retirar',
      accorder: 'Conceder',
      fermer: 'Cerrar',
      erreurTitre: 'Error',
      excuses: [
        'No se puede retirar el permiso: El Lector ya lo ha leído todo.',
        'El Lector ha pedido que no lo molesten por ahora.',
        'Operación rechazada por El Lector.'
      ]
    },
    it: {
      lecteurChemin: 'Questo è il percorso dei ricordi di Bek. Una casella è aperta; le altre si apriranno man mano che avanzi.',
      lecteurDemande: 'Prima di cominciare… ho bisogno del tuo permesso per aprire alcuni file. Niente di grave.',
      suite: 'Avanti',
      autoTitre: 'Richiesta di autorizzazione',
      autoTexte: 'Il Lettore chiede l’autorizzazione ad aprire questi file per:',
      autoListe: ['Leggere i tuoi ricordi', 'Organizzarli'],
      lecteurPlus: 'Già che ci sono… mi permetti qualche altra cosina IN PIÙ? Niente di grave nemmeno stavolta.',
      autoTexte2: 'Il Lettore chiede l’autorizzazione a:',
      autoListe2: ['Gestire e creare i tuoi contatti', 'Correggerti con gentilezza', 'Lavorare in background'],
      autoRefuser: 'Nega',
      autoAutoriser: 'Consenti',
      autoAutoriserAussi: 'Consenti anche',
      refus2: 'Ancora? Sì, ancora. Sempre il regolamento.',
      refus1: 'Capisco. Ma devo chiedertelo di nuovo: è il regolamento.',
      confTitre: 'Autorizzazione concessa',
      confTexte: 'Puoi revocare questa autorizzazione in qualsiasi momento nelle impostazioni.',
      lecteurFin: 'Perfetto! Apri il tuo primo ricordo. Nel frattempo, mi occupo io del resto in background.',
      annonce1: 'Eccoti di nuovo! Mentre facevamo la prima lezione, ho lavorato in background, come mi hai autorizzato a fare.',
      annonce2: 'Ho aggiunto alcune parti al menu. Ho perfino trovato un insegnante che potrà aiutarci con il francese… visto che, evidentemente, ne avremo bisogno.',
      annonceFin: 'Il menu è tuo. Prego.',
      salutation: 'Ciao, {prenom}!',
      salutationInvite: 'Ti diamo il benvenuto!',
      menuMemoires: 'Ricordi',
      apercuNom: 'Anteprima del percorso: una casella aperta, le altre bloccate',
      menuPrives: 'Lezioni private',
      menuCompteInvite: 'Accedi / Crea un account',
      menuCompteConnecte: 'Il mio account',
      menuProfesseur: 'Modalità insegnante',
      menuParametres: 'Impostazioni',
      paramTitre: 'Impostazioni',
      paramSon: 'Audio',
      sonOui: 'Attivo',
      sonNon: 'Disattivato',
      sonCouper: 'Disattiva',
      sonActiver: 'Attiva',
      paramLangue: 'Lingua',
      paramChanger: 'Cambia',
      compteTitre: 'Il mio account',
      compteTexte: 'I tuoi progressi sono salvati nel tuo account.',
      deconnexion: 'Esci',
      paramAutorisation: 'Autorizzazioni del Lettore',
      assembleTitre: 'Il Lettore sta assemblando i ricordi',
      assembleFini: 'I ricordi sono pronti',
      assembleEtapes: ['Apertura dei file .mem', 'Riflessione', 'Organizzazione dei ricordi', 'Assemblaggio del percorso dei ricordi'],
      autoAccordee: 'Concessa',
      autoRefusee: 'Negata',
      retirer: 'Revoca',
      accorder: 'Concedi',
      fermer: 'Chiudi',
      erreurTitre: 'Errore',
      excuses: [
        'Impossibile revocare l’autorizzazione: Il Lettore ha già letto tutto.',
        'Il Lettore ha chiesto di non essere disturbato per ora.',
        'Operazione rifiutata da Il Lettore.'
      ]
    },
    pt: {
      lecteurChemin: 'Este é o caminho das lembranças da Bek. Uma casa está aberta; as outras vão se abrir conforme você avança.',
      lecteurDemande: 'Antes de começar… preciso da sua permissão para abrir alguns arquivos. Nada grave.',
      suite: 'Próximo',
      autoTitre: 'Pedido de permissão',
      autoTexte: 'O Leitor solicita permissão para abrir estes arquivos e assim poder:',
      autoListe: ['Ler suas lembranças', 'Organizá-las'],
      lecteurPlus: 'Já que estou aqui… você me deixa fazer mais algumas coisinhas? Nada grave também.',
      autoTexte2: 'O Leitor solicita permissão para:',
      autoListe2: ['Gerenciar e criar seus contatos', 'Corrigir você com educação', 'Trabalhar em segundo plano'],
      autoRefuser: 'Negar',
      autoAutoriser: 'Permitir',
      autoAutoriserAussi: 'Permitir também',
      refus2: 'De novo? Sim, de novo. Continua sendo o regulamento.',
      refus1: 'Entendo. Mas preciso perguntar de novo: é o regulamento.',
      confTitre: 'Permissão concedida',
      confTexte: 'Você pode retirar esta permissão a qualquer momento nas configurações.',
      lecteurFin: 'Perfeito! Abra a sua primeira lembrança. Enquanto isso, eu cuido do resto em segundo plano.',
      annonce1: 'Você voltou! Enquanto fazíamos a primeira lição, trabalhei em segundo plano, como você me autorizou.',
      annonce2: 'Adicionei algumas partes ao menu. Até encontrei um professor que poderá nos ajudar com o francês… já que, pelo visto, vamos precisar de ajuda.',
      annonceFin: 'O menu é seu. De nada.',
      salutation: 'Oi, {prenom}!',
      salutationInvite: 'Boas-vindas!',
      menuMemoires: 'Lembranças',
      apercuNom: 'Prévia do caminho: uma casa aberta, as outras bloqueadas',
      menuPrives: 'Aulas particulares',
      menuCompteInvite: 'Entrar / Criar uma conta',
      menuCompteConnecte: 'Minha conta',
      menuProfesseur: 'Modo professor',
      menuParametres: 'Configurações',
      paramTitre: 'Configurações',
      paramSon: 'Som',
      sonOui: 'Ativado',
      sonNon: 'Desativado',
      sonCouper: 'Desativar',
      sonActiver: 'Ativar',
      paramLangue: 'Idioma',
      paramChanger: 'Alterar',
      compteTitre: 'Minha conta',
      compteTexte: 'Seu progresso fica salvo na sua conta.',
      deconnexion: 'Sair',
      paramAutorisation: 'Permissões do Leitor',
      assembleTitre: 'O Leitor está montando as lembranças',
      assembleFini: 'As lembranças estão prontas',
      assembleEtapes: ['Abrindo os arquivos .mem', 'Refletindo', 'Organizando as lembranças', 'Montando o caminho das lembranças'],
      autoAccordee: 'Concedida',
      autoRefusee: 'Negada',
      retirer: 'Retirar',
      accorder: 'Conceder',
      fermer: 'Fechar',
      erreurTitre: 'Erro',
      excuses: [
        'Não é possível retirar a permissão: O Leitor já leu tudo.',
        'O Leitor pediu para não ser incomodado agora.',
        'Operação recusada por O Leitor.'
      ]
    },
    ca: {
      lecteurChemin: 'Aquest és el camí dels records de la Bek. Una casella és oberta; les altres s’aniran obrint a mesura que avancis.',
      lecteurDemande: 'Abans de començar… necessito el teu permís per obrir uns quants fitxers. Res de greu.',
      suite: 'Següent',
      autoTitre: 'Sol·licitud de permís',
      autoTexte: 'El Lector demana permís per obrir aquests fitxers i així poder:',
      autoListe: ['Llegir els teus records', 'Organitzar-los'],
      lecteurPlus: 'Ja que hi sóc… em deixes fer unes quantes coses MÉS? Tampoc és res de greu.',
      autoTexte2: 'El Lector demana permís per:',
      autoListe2: ['Gestionar i crear els teus contactes', 'Corregir-te amb educació', 'Treballar en segon pla'],
      autoRefuser: 'Denega',
      autoAutoriser: 'Permet',
      autoAutoriserAussi: 'Permet també',
      refus2: 'Un altre cop? Sí, un altre cop. Continua sent el reglament.',
      refus1: 'Ho entenc. Però t’ho haig de tornar a preguntar: és el reglament.',
      confTitre: 'Permís concedit',
      confTexte: 'Pots retirar aquest permís en qualsevol moment als ajustos.',
      lecteurFin: 'Perfecte! Obre el teu primer record. Mentrestant, jo m’ocupo de la resta en segon pla.',
      annonce1: 'Ja has tornat! Mentre fèiem la primera lliçó, he estat treballant en segon pla, tal com em vas autoritzar.',
      annonce2: 'He afegit algunes parts al menú. Fins i tot he trobat un professor que ens podrà ajudar amb el francès… ja que, evidentment, ens farà falta ajuda.',
      annonceFin: 'El menú és teu. De res.',
      salutation: 'Hola, {prenom}!',
      salutationInvite: 'Et donem la benvinguda!',
      menuMemoires: 'Records',
      apercuNom: 'Previsualització del camí: una casella oberta, les altres bloquejades',
      menuPrives: 'Classes particulars',
      menuCompteInvite: 'Inicia la sessió / Crea un compte',
      menuCompteConnecte: 'El meu compte',
      menuProfesseur: 'Mode professor',
      menuParametres: 'Ajustos',
      paramTitre: 'Ajustos',
      paramSon: 'So',
      sonOui: 'Activat',
      sonNon: 'Desactivat',
      sonCouper: 'Silencia',
      sonActiver: 'Activa',
      paramLangue: 'Idioma',
      paramChanger: 'Canvia',
      compteTitre: 'El meu compte',
      compteTexte: 'El teu progrés es desa al teu compte.',
      deconnexion: 'Tanca la sessió',
      paramAutorisation: 'Permisos del Lector',
      assembleTitre: 'El Lector està muntant els records',
      assembleFini: 'Els records estan a punt',
      assembleEtapes: ['Obrint els fitxers .mem', 'Reflexionant', 'Organitzant els records', 'Muntant el camí dels records'],
      autoAccordee: 'Concedit',
      autoRefusee: 'Denegat',
      retirer: 'Retira',
      accorder: 'Concedeix',
      fermer: 'Tanca',
      erreurTitre: 'Error',
      excuses: [
        'No es pot retirar el permís: El Lector ja ho ha llegit tot.',
        'El Lector ha demanat que no el molestin ara.',
        'Operació rebutjada per El Lector.'
      ]
    },
    eo: {
      lecteurChemin: 'Jen la vojo de la memoraĵoj de Bek. Unu kvadrato estas malfermita; la aliaj malfermiĝos dum vi progresas.',
      lecteurDemande: 'Antaŭ ol komenci… mi bezonas vian permeson por malfermi kelkajn dosierojn. Nenio grava.',
      suite: 'Sekva',
      autoTitre: 'Peto pri permeso',
      autoTexte: 'La Legilo petas permeson malfermi ĉi tiujn dosierojn por:',
      autoListe: ['legi viajn memoraĵojn', 'organizi ilin'],
      lecteurPlus: 'Dum mi estas ĉi tie… ĉu vi permesus al mi kelkajn pliajn aferojn? Ankaŭ nenio grava.',
      autoTexte2: 'La Legilo petas permeson por:',
      autoListe2: ['mastrumi kaj krei viajn kontaktojn', 'ĝentile korekti vin', 'labori fone'],
      autoRefuser: 'Malpermesi',
      autoAutoriser: 'Permesi',
      autoAutoriserAussi: 'Permesi ankaŭ',
      refus2: 'Denove? Jes, denove. Ankoraŭ la regularo.',
      refus1: 'Mi komprenas. Sed mi devas demandi denove: tiel postulas la regularo.',
      confTitre: 'Permeso donita',
      confTexte: 'Vi povas reveni pri ĉi tiu permeso iam ajn en la agordoj.',
      lecteurFin: 'Perfekte! Malfermu vian unuan memoraĵon. Dume mi zorgos pri la resto fone.',
      annonce1: 'Vi revenis! Dum ni faris la unuan lecionon, mi laboris fone, kiel vi permesis.',
      annonce2: 'Mi aldonis kelkajn partojn al la menuo. Mi eĉ trovis instruiston, kiu povos helpi nin pri la franca… ĉar evidente ni bezonos helpon.',
      annonceFin: 'La menuo estas via. Ne dankinde.',
      salutation: 'Saluton, {prenom}!',
      salutationInvite: 'Bonvenon!',
      menuMemoires: 'Memoraĵoj',
      apercuNom: 'Antaŭrigardo de la vojo: unu kvadrato malfermita, la aliaj ŝlositaj',
      menuPrives: 'Privataj lecionoj',
      menuCompteInvite: 'Ensaluti / Krei konton',
      menuCompteConnecte: 'Mia konto',
      menuProfesseur: 'Instruista reĝimo',
      menuParametres: 'Agordoj',
      paramTitre: 'Agordoj',
      paramSon: 'Sono',
      sonOui: 'Ŝaltita',
      sonNon: 'Malŝaltita',
      sonCouper: 'Malŝalti',
      sonActiver: 'Ŝalti',
      paramLangue: 'Lingvo',
      paramChanger: 'Ŝanĝi',
      compteTitre: 'Mia konto',
      compteTexte: 'Via progreso estas konservita en via konto.',
      deconnexion: 'Elsaluti',
      paramAutorisation: 'Permesoj de la Legilo',
      assembleTitre: 'La Legilo kunmetas la memoraĵojn',
      assembleFini: 'La memoraĵoj estas pretaj',
      assembleEtapes: ['Malfermado de .mem-dosieroj', 'Pensado', 'Organizado de la memoraĵoj', 'Kunmetado de la vojo de la memoraĵoj'],
      autoAccordee: 'Donita',
      autoRefusee: 'Malpermesita',
      retirer: 'Reigi',
      accorder: 'Doni',
      fermer: 'Fermi',
      erreurTitre: 'Eraro',
      excuses: [
        'Ne eblas reiri pri la permeso: La Legilo jam legis ĉion.',
        'La Legilo petis ne esti ĝenata nun.',
        'Ago rifuzita de La Legilo.'
      ]
    },
    zh: {
      lecteurChemin: '这是 Bek 的记忆之路。现在只有一格是开着的，其余的会随着你的进度逐渐打开。',
      lecteurDemande: '开始之前……我需要你的许可，才能打开几个文件。没什么大不了的。',
      suite: '下一步',
      autoTitre: '权限请求',
      autoTexte: '阅读器请求打开这些文件，以便：',
      autoListe: ['读取你的记忆', '整理这些记忆'],
      lecteurPlus: '既然都来了……你能再允许我做几件事吗？同样没什么大不了的。',
      autoTexte2: '阅读器请求权限：',
      autoListe2: ['管理并创建你的联系人', '礼貌地纠正你', '在后台工作'],
      autoRefuser: '拒绝',
      autoAutoriser: '允许',
      autoAutoriserAussi: '也允许',
      refus2: '又来？对，又来。还是规定。',
      refus1: '我明白。但我必须再问一次：这是规定。',
      confTitre: '已授予权限',
      confTexte: '你可以随时在设置中撤销此权限。',
      lecteurFin: '太好了！打开你的第一段记忆吧。这期间，其余的事我在后台处理。',
      annonce1: '你回来啦！我们上第一课的时候，我按你的许可在后台干了点活。',
      annonce2: '我给菜单添加了几个部分。我甚至找到了一位可以帮我们学法语的老师……毕竟，我们显然需要帮助。',
      annonceFin: '菜单归你了。不客气。',
      salutation: '你好，{prenom}！',
      salutationInvite: '欢迎！',
      menuMemoires: '记忆',
      apercuNom: '路径预览：一格已开启，其余已锁定',
      menuPrives: '私教课',
      menuCompteInvite: '登录 / 创建账户',
      menuCompteConnecte: '我的账户',
      menuProfesseur: '教师模式',
      menuParametres: '设置',
      paramTitre: '设置',
      paramSon: '声音',
      sonOui: '已开启',
      sonNon: '已关闭',
      sonCouper: '关闭',
      sonActiver: '开启',
      paramLangue: '语言',
      paramChanger: '更改',
      compteTitre: '我的账户',
      compteTexte: '你的进度已保存在你的账户中。',
      deconnexion: '退出登录',
      paramAutorisation: '阅读器权限',
      assembleTitre: '阅读器正在拼合记忆',
      assembleFini: '记忆已准备好',
      assembleEtapes: ['正在打开 .mem 文件', '思考中', '整理记忆', '拼合记忆之路'],
      autoAccordee: '已授予',
      autoRefusee: '已拒绝',
      retirer: '撤销',
      accorder: '授予',
      fermer: '关闭',
      erreurTitre: '错误',
      excuses: [
        '无法撤销权限：阅读器已经把一切都读完了。',
        '阅读器请求暂时不要打扰它。',
        '操作被阅读器拒绝。'
      ]
    },
    ja: {
      lecteurChemin: 'これはBekの記憶の道です。今開いているのは1マスだけ。ほかのマスは、進むにつれて開いていきます。',
      lecteurDemande: '始める前に……いくつかのファイルを開くために、あなたの許可が必要です。大したことではありません。',
      suite: '次へ',
      autoTitre: '許可のお願い',
      autoTexte: 'リーダーが、次の目的でこれらのファイルを開く許可を求めています：',
      autoListe: ['あなたの記憶を読む', '記憶を整理する'],
      lecteurPlus: 'ついでに……もう少しだけ、ほかのこともしていいですか？これも大したことではありません。',
      autoTexte2: 'リーダーは、次の許可を求めています：',
      autoListe2: ['連絡先の管理と作成', 'あなたの間違いを丁寧に直す', '裏で作業する'],
      autoRefuser: '拒否',
      autoAutoriser: '許可',
      autoAutoriserAussi: 'これも許可',
      refus2: 'また？はい、また。これも規則なので。',
      refus1: '分かります。でも、もう一度お尋ねしないといけません。規則なので。',
      confTitre: '許可されました',
      confTexte: 'この許可は、設定からいつでも取り消せます。',
      lecteurFin: '完璧です！最初の記憶を開いてみましょう。その間、残りは裏で私が進めておきます。',
      annonce1: 'おかえりなさい！最初のレッスンをしている間、許可をいただいたとおり、裏で作業していました。',
      annonce2: 'メニューにいくつか項目を追加しました。フランス語を手伝ってくれる先生も見つけましたよ……どう見ても助けが必要そうなので。',
      annonceFin: 'メニューはあなたのものです。どういたしまして。',
      salutation: 'こんにちは、{prenom}さん！',
      salutationInvite: 'ようこそ！',
      menuMemoires: '記憶',
      apercuNom: '道のようす：1マスは開き、ほかは鍵がかかっています',
      menuPrives: '個人レッスン',
      menuCompteInvite: 'ログイン / アカウント作成',
      menuCompteConnecte: '私のアカウント',
      menuProfesseur: '先生モード',
      menuParametres: '設定',
      paramTitre: '設定',
      paramSon: '音',
      sonOui: 'オン',
      sonNon: 'オフ',
      sonCouper: '消す',
      sonActiver: '出す',
      paramLangue: '言語',
      paramChanger: '変更',
      compteTitre: '私のアカウント',
      compteTexte: '進み具合はアカウントに保存されます。',
      deconnexion: 'ログアウト',
      paramAutorisation: 'リーダーの許可',
      assembleTitre: 'リーダーが記憶を組み立てています',
      assembleFini: '記憶の準備ができました',
      assembleEtapes: ['.memファイルを開いています', '考えています', '記憶を整理しています', '記憶の道を組み立てています'],
      autoAccordee: '許可済み',
      autoRefusee: '拒否済み',
      retirer: '取り消す',
      accorder: '許可する',
      fermer: '閉じる',
      erreurTitre: 'エラー',
      excuses: [
        '許可を取り消せません：リーダーはもう全部読んでしまいました。',
        'リーダーは、今は邪魔しないでほしいとのことです。',
        '操作はリーダーに拒否されました。'
      ]
    },
    ko: {
      lecteurChemin: '여기는 Bek의 기억으로 가는 길이에요. 지금은 한 칸만 열려 있고, 나머지는 네가 나아갈수록 열릴 거예요.',
      lecteurDemande: '시작하기 전에… 파일 몇 개를 열려면 네 허락이 필요해요. 별일 아니에요.',
      suite: '다음',
      autoTitre: '권한 요청',
      autoTexte: '리더가 이 파일들을 열어도 되는지 허락을 구해요. 이유는:',
      autoListe: ['네 기억 읽기', '기억 정리하기'],
      lecteurPlus: '온 김에… 몇 가지만 더 허락해 줄래요? 이것도 별일 아니에요.',
      autoTexte2: '리더가 허락을 구해요:',
      autoListe2: ['연락처 관리 및 만들기', '공손하게 고쳐 주기', '백그라운드에서 작업하기'],
      autoRefuser: '거부',
      autoAutoriser: '허용',
      autoAutoriserAussi: '이것도 허용',
      refus2: '또요? 네, 또요. 여전히 규정이에요.',
      refus1: '이해해요. 그래도 다시 물어봐야 해요. 규정이거든요.',
      confTitre: '권한이 허용되었어요',
      confTexte: '이 권한은 언제든 설정에서 철회할 수 있어요.',
      lecteurFin: '좋아요! 첫 번째 기억을 열어 보세요. 그동안 나머지는 제가 백그라운드에서 맡을게요.',
      annonce1: '돌아왔네요! 첫 번째 수업을 하는 동안, 허락해 준 대로 백그라운드에서 일하고 있었어요.',
      annonce2: '메뉴에 몇 가지를 추가했어요. 프랑스어를 도와줄 선생님도 찾았고요… 우리한테는 분명히 도움이 필요할 테니까요.',
      annonceFin: '메뉴는 이제 네 거예요. 천만에요.',
      salutation: '안녕, {prenom}!',
      salutationInvite: '환영해요!',
      menuMemoires: '기억',
      apercuNom: '길 미리보기: 한 칸은 열려 있고, 나머지는 잠겨 있어요',
      menuPrives: '개인 수업',
      menuCompteInvite: '로그인 / 계정 만들기',
      menuCompteConnecte: '내 계정',
      menuProfesseur: '선생님 모드',
      menuParametres: '설정',
      paramTitre: '설정',
      paramSon: '소리',
      sonOui: '켜짐',
      sonNon: '꺼짐',
      sonCouper: '끄기',
      sonActiver: '켜기',
      paramLangue: '언어',
      paramChanger: '변경',
      compteTitre: '내 계정',
      compteTexte: '진행 상황이 계정에 저장돼요.',
      deconnexion: '로그아웃',
      paramAutorisation: '리더 권한',
      assembleTitre: '리더가 기억을 조립하고 있어요',
      assembleFini: '기억이 준비됐어요',
      assembleEtapes: ['.mem 파일 여는 중', '생각하는 중', '기억 정리하는 중', '기억의 길 조립하는 중'],
      autoAccordee: '허용됨',
      autoRefusee: '거부됨',
      retirer: '철회',
      accorder: '허용',
      fermer: '닫기',
      erreurTitre: '오류',
      excuses: [
        '권한을 철회할 수 없어요: 리더가 이미 전부 읽었어요.',
        '리더가 지금은 방해하지 말아 달라고 했어요.',
        '리더가 작업을 거부했어요.'
      ]
    },
    vi: {
      lecteurChemin: 'Đây là con đường ký ức của Bek. Hiện chỉ có một ô đang mở; các ô còn lại sẽ mở dần khi bạn đi tiếp.',
      lecteurDemande: 'Trước khi bắt đầu… mình cần bạn cho phép để mở vài tệp. Không có gì nghiêm trọng đâu.',
      suite: 'Tiếp',
      autoTitre: 'Yêu cầu quyền',
      autoTexte: 'Trình đọc xin phép mở các tệp này để:',
      autoListe: ['Đọc ký ức của bạn', 'Sắp xếp chúng'],
      lecteurPlus: 'Tiện thể… bạn cho mình làm thêm vài việc NỮA nhé? Cũng không có gì nghiêm trọng đâu.',
      autoTexte2: 'Trình đọc xin phép để:',
      autoListe2: ['Quản lý và tạo danh bạ của bạn', 'Sửa lỗi cho bạn một cách lịch sự', 'Làm việc ở chế độ nền'],
      autoRefuser: 'Từ chối',
      autoAutoriser: 'Cho phép',
      autoAutoriserAussi: 'Cũng cho phép',
      refus2: 'Lại nữa ư? Ừ, lại nữa. Vẫn là quy định.',
      refus1: 'Mình hiểu. Nhưng mình phải hỏi lại: đó là quy định.',
      confTitre: 'Đã cấp quyền',
      confTexte: 'Bạn có thể thu hồi quyền này bất cứ lúc nào trong phần cài đặt.',
      lecteurFin: 'Tuyệt! Hãy mở ký ức đầu tiên của bạn. Trong lúc đó, mình sẽ lo phần còn lại ở chế độ nền.',
      annonce1: 'Bạn quay lại rồi! Trong lúc chúng ta học bài đầu tiên, mình đã làm việc ở chế độ nền, đúng như bạn cho phép.',
      annonce2: 'Mình đã thêm vài phần vào menu. Mình còn tìm được một giáo viên có thể giúp chúng ta học tiếng Pháp… vì rõ ràng là chúng ta sẽ cần giúp đỡ.',
      annonceFin: 'Menu là của bạn. Không có gì.',
      salutation: 'Chào {prenom}!',
      salutationInvite: 'Chào mừng bạn!',
      menuMemoires: 'Ký ức',
      apercuNom: 'Xem trước con đường: một ô đang mở, các ô khác đang khóa',
      menuPrives: 'Học riêng',
      menuCompteInvite: 'Đăng nhập / Tạo tài khoản',
      menuCompteConnecte: 'Tài khoản của tôi',
      menuProfesseur: 'Chế độ giáo viên',
      menuParametres: 'Cài đặt',
      paramTitre: 'Cài đặt',
      paramSon: 'Âm thanh',
      sonOui: 'Bật',
      sonNon: 'Tắt',
      sonCouper: 'Tắt',
      sonActiver: 'Bật',
      paramLangue: 'Ngôn ngữ',
      paramChanger: 'Đổi',
      compteTitre: 'Tài khoản của tôi',
      compteTexte: 'Tiến độ của bạn được lưu trong tài khoản.',
      deconnexion: 'Đăng xuất',
      paramAutorisation: 'Quyền của Trình đọc',
      assembleTitre: 'Trình đọc đang ghép các ký ức',
      assembleFini: 'Các ký ức đã sẵn sàng',
      assembleEtapes: ['Đang mở các tệp .mem', 'Đang suy nghĩ', 'Đang sắp xếp các ký ức', 'Đang ghép con đường ký ức'],
      autoAccordee: 'Đã cấp',
      autoRefusee: 'Đã từ chối',
      retirer: 'Thu hồi',
      accorder: 'Cấp quyền',
      fermer: 'Đóng',
      erreurTitre: 'Lỗi',
      excuses: [
        'Không thể thu hồi quyền: Trình đọc đã đọc hết rồi.',
        'Trình đọc nhờ đừng làm phiền lúc này.',
        'Thao tác bị Trình đọc từ chối.'
      ]
    },
    ht: {
      lecteurChemin: 'Men chemen souvni Bek yo. Yon sèl kare ouvè; lòt yo ap louvri pandan w ap avanse.',
      lecteurDemande: 'Anvan nou kòmanse… mwen bezwen pèmisyon w pou louvri kèk fichye. Pa gen anyen grav.',
      suite: 'Swivan',
      autoTitre: 'Demann pèmisyon',
      autoTexte: 'Lektè a mande pèmisyon pou louvri fichye sa yo pou li kapab:',
      autoListe: ['Li souvni w yo', 'Òganize yo'],
      lecteurPlus: 'Pandan m la a… ou ka kite m fè kèk lòt bagay ankò? Pa gen anyen grav non plis.',
      autoTexte2: 'Lektè a mande pèmisyon pou:',
      autoListe2: ['Jere ak kreye kontak ou yo', 'Korije w ak politès', 'Travay an background'],
      autoRefuser: 'Refize',
      autoAutoriser: 'Pèmèt',
      autoAutoriserAussi: 'Pèmèt tou',
      refus2: 'Ankò? Wi, ankò. Se toujou règleman an.',
      refus1: 'Mwen konprann. Men mwen oblije mande w ankò: se règleman an.',
      confTitre: 'Pèmisyon bay',
      confTexte: 'Ou ka retire pèmisyon sa a nenpòt ki lè nan paramèt yo.',
      lecteurFin: 'Pafè! Louvri premye souvni w lan. Pandan sa a, m ap okipe rès la an background.',
      annonce1: 'Ou tounen! Pandan nou t ap fè premye leson an, m t ap travay an background, jan ou te pèmèt mwen an.',
      annonce2: 'M ajoute kèk pati nan meni an. M menm jwenn yon pwofesè ki ka ede nou ak fransè a… paske aparamman nou pral bezwen èd.',
      annonceFin: 'Meni an se pou ou. Pa dekwa.',
      salutation: 'Bonjou, {prenom}!',
      salutationInvite: 'Byenveni!',
      menuMemoires: 'Souvni',
      apercuNom: 'Apèsi chemen an: yon kare ouvè, lòt yo fèmen',
      menuPrives: 'Leson prive',
      menuCompteInvite: 'Konekte / Kreye yon kont',
      menuCompteConnecte: 'Kont mwen',
      menuProfesseur: 'Mòd pwofesè',
      menuParametres: 'Paramèt',
      paramTitre: 'Paramèt',
      paramSon: 'Son',
      sonOui: 'Aktive',
      sonNon: 'Dezaktive',
      sonCouper: 'Koupe',
      sonActiver: 'Aktive',
      paramLangue: 'Lang',
      paramChanger: 'Chanje',
      compteTitre: 'Kont mwen',
      compteTexte: 'Pwogrè w anrejistre nan kont ou.',
      deconnexion: 'Dekonekte',
      paramAutorisation: 'Pèmisyon Lektè a',
      assembleTitre: 'Lektè a ap rasanble souvni yo',
      assembleFini: 'Souvni yo pare',
      assembleEtapes: ['Ouvri fichye .mem yo', 'Reflechi', 'Òganize souvni yo', 'Rasanble chemen souvni yo'],
      autoAccordee: 'Bay',
      autoRefusee: 'Refize',
      retirer: 'Retire',
      accorder: 'Bay',
      fermer: 'Fèmen',
      erreurTitre: 'Erè',
      excuses: [
        'Pa kapab retire pèmisyon an: Lektè a deja li tout bagay.',
        'Lektè a mande pou yo pa deranje li pou kounye a.',
        'Operasyon an refize pa Lektè a.'
      ]
    },
    tl: {
      lecteurChemin: 'Ito ang landas ng mga alaala ni Bek. Isang kahon ang bukas; bubukas ang iba habang sumusulong ka.',
      lecteurDemande: 'Bago tayo magsimula… kailangan ko ng pahintulot mo para magbukas ng ilang file. Walang seryoso.',
      suite: 'Susunod',
      autoTitre: 'Kahilingan ng pahintulot',
      autoTexte: 'Humihingi ng pahintulot ang Tagabasa na buksan ang mga file na ito upang:',
      autoListe: ['Basahin ang mga alaala mo', 'Ayusin ang mga ito'],
      lecteurPlus: 'Nandito na rin lang ako… papayagan mo ba akong gumawa ng ilan PANG bagay? Hindi rin ito seryoso.',
      autoTexte2: 'Humihingi ng pahintulot ang Tagabasa na:',
      autoListe2: ['Pamahalaan at gumawa ng mga contact mo', 'Itama ka nang magalang', 'Gumana sa background'],
      autoRefuser: 'Tanggihan',
      autoAutoriser: 'Payagan',
      autoAutoriserAussi: 'Payagan din',
      refus2: 'Ulit? Oo, ulit. Patakaran pa rin.',
      refus1: 'Naiintindihan ko. Pero kailangan kitang tanungin ulit: patakaran kasi.',
      confTitre: 'Ibinigay ang pahintulot',
      confTexte: 'Maaari mong bawiin ang pahintulot na ito anumang oras sa mga setting.',
      lecteurFin: 'Perpekto! Buksan mo na ang una mong alaala. Samantala, ako na ang bahala sa iba sa background.',
      annonce1: 'Nandito ka na ulit! Habang ginagawa natin ang unang aralin, nagtrabaho ako sa background, gaya ng pinayagan mo.',
      annonce2: 'Nagdagdag ako ng ilang bahagi sa menu. May nahanap pa akong guro na makakatulong sa atin sa Pranses… dahil halatang kakailanganin natin ng tulong.',
      annonceFin: 'Sa iyo na ang menu. Walang anuman.',
      salutation: 'Kumusta, {prenom}!',
      salutationInvite: 'Maligayang pagdating!',
      menuMemoires: 'Mga alaala',
      apercuNom: 'Silip sa landas: isang kahon ang bukas, naka-lock ang iba',
      menuPrives: 'Pribadong aralin',
      menuCompteInvite: 'Mag-sign in / Gumawa ng account',
      menuCompteConnecte: 'Aking account',
      menuProfesseur: 'Mode ng guro',
      menuParametres: 'Mga setting',
      paramTitre: 'Mga setting',
      paramSon: 'Tunog',
      sonOui: 'Naka-on',
      sonNon: 'Naka-off',
      sonCouper: 'I-off',
      sonActiver: 'I-on',
      paramLangue: 'Wika',
      paramChanger: 'Palitan',
      compteTitre: 'Aking account',
      compteTexte: 'Naka-save sa account mo ang progreso mo.',
      deconnexion: 'Mag-sign out',
      paramAutorisation: 'Mga pahintulot ng Tagabasa',
      assembleTitre: 'Binubuo ng Tagabasa ang mga alaala',
      assembleFini: 'Handa na ang mga alaala',
      assembleEtapes: ['Binubuksan ang mga .mem file', 'Nag-iisip', 'Inaayos ang mga alaala', 'Binubuo ang landas ng mga alaala'],
      autoAccordee: 'Ibinigay',
      autoRefusee: 'Tinanggihan',
      retirer: 'Bawiin',
      accorder: 'Ibigay',
      fermer: 'Isara',
      erreurTitre: 'Error',
      excuses: [
        'Hindi mabawi ang pahintulot: Nabasa na ng Tagabasa ang lahat.',
        'Hiniling ng Tagabasa na huwag muna siyang istorbohin.',
        'Tinanggihan ng Tagabasa ang operasyon.'
      ]
    },
    id: {
      lecteurChemin: 'Ini jalan menuju kenangan Bek. Satu kotak sudah terbuka; yang lain akan terbuka seiring kamu maju.',
      lecteurDemande: 'Sebelum mulai… aku butuh izinmu untuk membuka beberapa berkas. Bukan hal serius.',
      suite: 'Lanjut',
      autoTitre: 'Permintaan izin',
      autoTexte: 'Si Pembaca meminta izin untuk membuka berkas-berkas ini agar bisa:',
      autoListe: ['Membaca kenanganmu', 'Mengaturnya'],
      lecteurPlus: 'Sekalian… boleh aku melakukan beberapa hal LAGI? Ini juga bukan hal serius.',
      autoTexte2: 'Si Pembaca meminta izin untuk:',
      autoListe2: ['Mengelola dan membuat kontakmu', 'Mengoreksimu dengan sopan', 'Bekerja di latar belakang'],
      autoRefuser: 'Tolak',
      autoAutoriser: 'Izinkan',
      autoAutoriserAussi: 'Izinkan juga',
      refus2: 'Lagi? Ya, lagi. Tetap aturannya.',
      refus1: 'Aku mengerti. Tapi aku harus bertanya lagi: itu aturannya.',
      confTitre: 'Izin diberikan',
      confTexte: 'Kamu bisa mencabut izin ini kapan saja di pengaturan.',
      lecteurFin: 'Sempurna! Bukalah kenangan pertamamu. Sementara itu, aku akan mengurus sisanya di latar belakang.',
      annonce1: 'Kamu sudah kembali! Selagi kita mengerjakan pelajaran pertama, aku bekerja di latar belakang, seperti yang kamu izinkan.',
      annonce2: 'Aku menambahkan beberapa bagian ke menu. Aku bahkan menemukan seorang guru yang bisa membantu kita dengan bahasa Prancis… karena kelihatannya kita pasti butuh bantuan.',
      annonceFin: 'Menunya milikmu. Sama-sama.',
      salutation: 'Halo, {prenom}!',
      salutationInvite: 'Selamat datang!',
      menuMemoires: 'Kenangan',
      apercuNom: 'Pratinjau jalan: satu kotak terbuka, yang lain terkunci',
      menuPrives: 'Les privat',
      menuCompteInvite: 'Masuk / Buat akun',
      menuCompteConnecte: 'Akun saya',
      menuProfesseur: 'Mode guru',
      menuParametres: 'Pengaturan',
      paramTitre: 'Pengaturan',
      paramSon: 'Suara',
      sonOui: 'Aktif',
      sonNon: 'Nonaktif',
      sonCouper: 'Matikan',
      sonActiver: 'Aktifkan',
      paramLangue: 'Bahasa',
      paramChanger: 'Ubah',
      compteTitre: 'Akun saya',
      compteTexte: 'Kemajuanmu tersimpan di akunmu.',
      deconnexion: 'Keluar',
      paramAutorisation: 'Izin Si Pembaca',
      assembleTitre: 'Si Pembaca sedang menyusun kenangan',
      assembleFini: 'Kenangan sudah siap',
      assembleEtapes: ['Membuka berkas .mem', 'Berpikir', 'Mengatur kenangan', 'Menyusun jalan kenangan'],
      autoAccordee: 'Diberikan',
      autoRefusee: 'Ditolak',
      retirer: 'Cabut',
      accorder: 'Berikan',
      fermer: 'Tutup',
      erreurTitre: 'Kesalahan',
      excuses: [
        'Izin tidak bisa dicabut: Si Pembaca sudah membaca semuanya.',
        'Si Pembaca meminta untuk tidak diganggu dulu.',
        'Operasi ditolak oleh Si Pembaca.'
      ]
    },
    nl: {
      lecteurChemin: 'Dit is het pad van Beks herinneringen. Eén vakje is open; de andere gaan open naarmate je vordert.',
      lecteurDemande: 'Voordat we beginnen… heb ik je toestemming nodig om een paar bestanden te openen. Niets ernstigs.',
      suite: 'Volgende',
      autoTitre: 'Toestemmingsverzoek',
      autoTexte: 'De Lezer vraagt toestemming om deze bestanden te openen, om:',
      autoListe: ['je herinneringen te lezen', 'ze te ordenen'],
      lecteurPlus: 'Nu ik toch bezig ben… mag ik nog een paar dingen MEER doen? Ook niets ernstigs.',
      autoTexte2: 'De Lezer vraagt toestemming om:',
      autoListe2: ['je contacten te beheren en aan te maken', 'je beleefd te verbeteren', 'op de achtergrond te werken'],
      autoRefuser: 'Weigeren',
      autoAutoriser: 'Toestaan',
      autoAutoriserAussi: 'Ook toestaan',
      refus2: 'Alweer? Ja, alweer. Nog steeds de regels.',
      refus1: 'Ik begrijp het. Maar ik moet het opnieuw vragen: het zijn de regels.',
      confTitre: 'Toestemming verleend',
      confTexte: 'Je kunt deze toestemming op elk moment intrekken in de instellingen.',
      lecteurFin: 'Perfect! Open je eerste herinnering. Ondertussen regel ik de rest op de achtergrond.',
      annonce1: 'Daar ben je weer! Terwijl wij de eerste les deden, heb ik op de achtergrond gewerkt, zoals je me had toegestaan.',
      annonce2: 'Ik heb een paar onderdelen aan het menu toegevoegd. Ik heb zelfs een leraar gevonden die ons met het Frans kan helpen… want we hebben duidelijk hulp nodig.',
      annonceFin: 'Het menu is van jou. Graag gedaan.',
      salutation: 'Hoi, {prenom}!',
      salutationInvite: 'Welkom!',
      menuMemoires: 'Herinneringen',
      apercuNom: 'Voorbeeld van het pad: één vakje open, de rest vergrendeld',
      menuPrives: 'Privélessen',
      menuCompteInvite: 'Inloggen / Account aanmaken',
      menuCompteConnecte: 'Mijn account',
      menuProfesseur: 'Lerarenmodus',
      menuParametres: 'Instellingen',
      paramTitre: 'Instellingen',
      paramSon: 'Geluid',
      sonOui: 'Aan',
      sonNon: 'Uit',
      sonCouper: 'Uitzetten',
      sonActiver: 'Aanzetten',
      paramLangue: 'Taal',
      paramChanger: 'Wijzigen',
      compteTitre: 'Mijn account',
      compteTexte: 'Je voortgang wordt opgeslagen in je account.',
      deconnexion: 'Uitloggen',
      paramAutorisation: 'Toestemmingen van De Lezer',
      assembleTitre: 'De Lezer zet de herinneringen in elkaar',
      assembleFini: 'De herinneringen zijn klaar',
      assembleEtapes: ['Bestanden .mem openen', 'Nadenken', 'De herinneringen ordenen', 'Het pad van de herinneringen samenstellen'],
      autoAccordee: 'Verleend',
      autoRefusee: 'Geweigerd',
      retirer: 'Intrekken',
      accorder: 'Verlenen',
      fermer: 'Sluiten',
      erreurTitre: 'Fout',
      excuses: [
        'Kan de toestemming niet intrekken: De Lezer heeft al alles gelezen.',
        'De Lezer vroeg om nu niet gestoord te worden.',
        'Handeling geweigerd door De Lezer.'
      ]
    },
    de: {
      lecteurChemin: 'Das ist der Weg durch Beks Erinnerungen. Ein Feld ist offen; die anderen öffnen sich, je weiter du kommst.',
      lecteurDemande: 'Bevor wir anfangen… brauche ich deine Erlaubnis, um ein paar Dateien zu öffnen. Nichts Schlimmes.',
      suite: 'Weiter',
      autoTitre: 'Berechtigungsanfrage',
      autoTexte: 'Der Leser bittet um Erlaubnis, diese Dateien zu öffnen, um:',
      autoListe: ['deine Erinnerungen zu lesen', 'sie zu ordnen'],
      lecteurPlus: 'Wenn ich schon dabei bin… erlaubst du mir noch ein paar Dinge MEHR? Auch nichts Schlimmes.',
      autoTexte2: 'Der Leser bittet um Erlaubnis, um:',
      autoListe2: ['deine Kontakte zu verwalten und zu erstellen', 'dich höflich zu korrigieren', 'im Hintergrund zu arbeiten'],
      autoRefuser: 'Ablehnen',
      autoAutoriser: 'Erlauben',
      autoAutoriserAussi: 'Auch erlauben',
      refus2: 'Schon wieder? Ja, schon wieder. Immer noch die Regeln.',
      refus1: 'Ich verstehe. Aber ich muss noch einmal fragen: Das sind die Regeln.',
      confTitre: 'Berechtigung erteilt',
      confTexte: 'Du kannst diese Berechtigung jederzeit in den Einstellungen widerrufen.',
      lecteurFin: 'Perfekt! Öffne deine erste Erinnerung. In der Zwischenzeit kümmere ich mich im Hintergrund um den Rest.',
      annonce1: 'Da bist du ja wieder! Während wir die erste Lektion gemacht haben, habe ich im Hintergrund gearbeitet, so wie du es erlaubt hast.',
      annonce2: 'Ich habe dem Menü ein paar Bereiche hinzugefügt. Ich habe sogar einen Lehrer gefunden, der uns beim Französisch helfen kann… denn wir werden offensichtlich Hilfe brauchen.',
      annonceFin: 'Das Menü gehört dir. Gern geschehen.',
      salutation: 'Hallo, {prenom}!',
      salutationInvite: 'Willkommen!',
      menuMemoires: 'Erinnerungen',
      apercuNom: 'Vorschau des Wegs: ein Feld offen, die anderen gesperrt',
      menuPrives: 'Privatunterricht',
      menuCompteInvite: 'Anmelden / Konto erstellen',
      menuCompteConnecte: 'Mein Konto',
      menuProfesseur: 'Lehrermodus',
      menuParametres: 'Einstellungen',
      paramTitre: 'Einstellungen',
      paramSon: 'Ton',
      sonOui: 'An',
      sonNon: 'Aus',
      sonCouper: 'Ausschalten',
      sonActiver: 'Einschalten',
      paramLangue: 'Sprache',
      paramChanger: 'Ändern',
      compteTitre: 'Mein Konto',
      compteTexte: 'Dein Fortschritt wird in deinem Konto gespeichert.',
      deconnexion: 'Abmelden',
      paramAutorisation: 'Berechtigungen des Lesers',
      assembleTitre: 'Der Leser setzt die Erinnerungen zusammen',
      assembleFini: 'Die Erinnerungen sind bereit',
      assembleEtapes: ['.mem-Dateien werden geöffnet', 'Nachdenken', 'Erinnerungen werden geordnet', 'Weg der Erinnerungen wird zusammengesetzt'],
      autoAccordee: 'Erteilt',
      autoRefusee: 'Abgelehnt',
      retirer: 'Widerrufen',
      accorder: 'Erteilen',
      fermer: 'Schließen',
      erreurTitre: 'Fehler',
      excuses: [
        'Die Berechtigung kann nicht widerrufen werden: Der Leser hat schon alles gelesen.',
        'Der Leser möchte gerade nicht gestört werden.',
        'Vorgang vom Leser abgelehnt.'
      ]
    },
    fa: {
      lecteurChemin: 'این مسیر خاطره‌های Bek است. فقط یک خانه باز است؛ بقیه به‌مرور که پیش می‌روی باز می‌شوند.',
      lecteurDemande: 'قبل از شروع… برای باز کردن چند فایل به اجازهٔ تو نیاز دارم. چیز مهمی نیست.',
      suite: 'بعدی',
      autoTitre: 'درخواست مجوز',
      autoTexte: 'خواننده برای باز کردن این فایل‌ها اجازه می‌خواهد تا بتواند:',
      autoListe: ['خاطره‌هایت را بخواند', 'آن‌ها را مرتب کند'],
      lecteurPlus: 'حالا که اینجایم… اجازه می‌دهی چند کار دیگر هم بکنم؟ این‌ها هم چیز مهمی نیست.',
      autoTexte2: 'خواننده اجازه می‌خواهد تا:',
      autoListe2: ['مخاطبین تو را مدیریت و ایجاد کند', 'مؤدبانه تو را اصلاح کند', 'در پس‌زمینه کار کند'],
      autoRefuser: 'رد کردن',
      autoAutoriser: 'اجازه دادن',
      autoAutoriserAussi: 'این را هم اجازه بده',
      refus2: 'باز هم؟ بله، باز هم. هنوز هم قانون است.',
      refus1: 'می‌فهمم. ولی باید دوباره بپرسم: قانونش همین است.',
      confTitre: 'مجوز داده شد',
      confTexte: 'هر زمان بخواهی می‌توانی این مجوز را از تنظیمات پس بگیری.',
      lecteurFin: 'عالی! اولین خاطره‌ات را باز کن. تا آن موقع، من بقیه‌اش را در پس‌زمینه انجام می‌دهم.',
      annonce1: 'برگشتی! وقتی داشتیم درس اول را می‌خواندیم، من همان‌طور که اجازه داده بودی در پس‌زمینه کار می‌کردم.',
      annonce2: 'چند بخش به منو اضافه کردم. حتی معلمی پیدا کردم که می‌تواند در فرانسه به ما کمک کند… چون ظاهراً به کمک نیاز خواهیم داشت.',
      annonceFin: 'منو مال توست. خواهش می‌کنم.',
      salutation: 'سلام، {prenom}!',
      salutationInvite: 'خوش آمدی!',
      menuMemoires: 'خاطره‌ها',
      apercuNom: 'پیش‌نمایش مسیر: یک خانه باز، بقیه قفل',
      menuPrives: 'کلاس خصوصی',
      menuCompteInvite: 'ورود / ساخت حساب',
      menuCompteConnecte: 'حساب من',
      menuProfesseur: 'حالت معلم',
      menuParametres: 'تنظیمات',
      paramTitre: 'تنظیمات',
      paramSon: 'صدا',
      sonOui: 'روشن',
      sonNon: 'خاموش',
      sonCouper: 'خاموش کردن',
      sonActiver: 'روشن کردن',
      paramLangue: 'زبان',
      paramChanger: 'تغییر',
      compteTitre: 'حساب من',
      compteTexte: 'پیشرفت تو در حسابت ذخیره می‌شود.',
      deconnexion: 'خروج',
      paramAutorisation: 'مجوزهای خواننده',
      assembleTitre: 'خواننده دارد خاطره‌ها را کنار هم می‌گذارد',
      assembleFini: 'خاطره‌ها آماده‌اند',
      assembleEtapes: ['در حال باز کردن فایل‌های .mem', 'در حال فکر کردن', 'در حال مرتب کردن خاطره‌ها', 'در حال چیدن مسیر خاطره‌ها'],
      autoAccordee: 'داده شد',
      autoRefusee: 'رد شد',
      retirer: 'پس گرفتن',
      accorder: 'دادن',
      fermer: 'بستن',
      erreurTitre: 'خطا',
      excuses: [
        'پس گرفتن مجوز ممکن نیست: خواننده همه‌چیز را قبلاً خوانده است.',
        'خواننده خواسته فعلاً مزاحمش نشوند.',
        'عملیات توسط خواننده رد شد.'
      ]
    },
    sv: {
      lecteurChemin: 'Det här är vägen genom Beks minnen. En ruta är öppen; de andra öppnas allt eftersom du går framåt.',
      lecteurDemande: 'Innan vi börjar… behöver jag ditt tillstånd för att öppna några filer. Inget allvarligt.',
      suite: 'Nästa',
      autoTitre: 'Begäran om tillstånd',
      autoTexte: 'Läsaren ber om tillstånd att öppna de här filerna för att kunna:',
      autoListe: ['läsa dina minnen', 'ordna dem'],
      lecteurPlus: 'Nu när jag ändå är igång… får jag göra några saker TILL? Inte heller något allvarligt.',
      autoTexte2: 'Läsaren ber om tillstånd att:',
      autoListe2: ['hantera och skapa dina kontakter', 'rätta dig på ett artigt sätt', 'arbeta i bakgrunden'],
      autoRefuser: 'Neka',
      autoAutoriser: 'Tillåt',
      autoAutoriserAussi: 'Tillåt också',
      refus2: 'Igen? Ja, igen. Fortfarande reglerna.',
      refus1: 'Jag förstår. Men jag måste fråga igen: det är reglerna.',
      confTitre: 'Tillstånd beviljat',
      confTexte: 'Du kan när som helst ta tillbaka det här tillståndet i inställningarna.',
      lecteurFin: 'Perfekt! Öppna ditt första minne. Under tiden tar jag hand om resten i bakgrunden.',
      annonce1: 'Där är du ju igen! Medan vi gjorde den första lektionen arbetade jag i bakgrunden, precis som du tillät.',
      annonce2: 'Jag har lagt till några delar i menyn. Jag har till och med hittat en lärare som kan hjälpa oss med franskan… eftersom vi uppenbarligen kommer att behöva hjälp.',
      annonceFin: 'Menyn är din. Ingen orsak.',
      salutation: 'Hej, {prenom}!',
      salutationInvite: 'Välkommen!',
      menuMemoires: 'Minnen',
      apercuNom: 'Förhandsvisning av vägen: en ruta öppen, de andra låsta',
      menuPrives: 'Privatlektioner',
      menuCompteInvite: 'Logga in / Skapa ett konto',
      menuCompteConnecte: 'Mitt konto',
      menuProfesseur: 'Lärarläge',
      menuParametres: 'Inställningar',
      paramTitre: 'Inställningar',
      paramSon: 'Ljud',
      sonOui: 'På',
      sonNon: 'Av',
      sonCouper: 'Stäng av',
      sonActiver: 'Slå på',
      paramLangue: 'Språk',
      paramChanger: 'Ändra',
      compteTitre: 'Mitt konto',
      compteTexte: 'Dina framsteg sparas på ditt konto.',
      deconnexion: 'Logga ut',
      paramAutorisation: 'Läsarens tillstånd',
      assembleTitre: 'Läsaren sätter ihop minnena',
      assembleFini: 'Minnena är redo',
      assembleEtapes: ['Öppnar .mem-filer', 'Funderar', 'Ordnar minnena', 'Sätter ihop minnenas väg'],
      autoAccordee: 'Beviljat',
      autoRefusee: 'Nekat',
      retirer: 'Ta tillbaka',
      accorder: 'Bevilja',
      fermer: 'Stäng',
      erreurTitre: 'Fel',
      excuses: [
        'Det går inte att ta tillbaka tillståndet: Läsaren har redan läst allt.',
        'Läsaren bad om att få vara ifred just nu.',
        'Åtgärden nekades av Läsaren.'
      ]
    },
    no: {
      lecteurChemin: 'Dette er veien gjennom Beks minner. Én rute er åpen; de andre åpnes etter hvert som du kommer videre.',
      lecteurDemande: 'Før vi begynner… trenger jeg tillatelsen din til å åpne noen filer. Ikke noe alvorlig.',
      suite: 'Neste',
      autoTitre: 'Forespørsel om tillatelse',
      autoTexte: 'Leseren ber om tillatelse til å åpne disse filene for å kunne:',
      autoListe: ['lese minnene dine', 'ordne dem'],
      lecteurPlus: 'Nå som jeg først er i gang… får jeg gjøre noen ting TIL? Heller ikke noe alvorlig.',
      autoTexte2: 'Leseren ber om tillatelse til å:',
      autoListe2: ['administrere og opprette kontaktene dine', 'rette deg på en høflig måte', 'jobbe i bakgrunnen'],
      autoRefuser: 'Avslå',
      autoAutoriser: 'Tillat',
      autoAutoriserAussi: 'Tillat også',
      refus2: 'Igjen? Ja, igjen. Fortsatt reglene.',
      refus1: 'Jeg forstår. Men jeg må spørre igjen: det er reglene.',
      confTitre: 'Tillatelse gitt',
      confTexte: 'Du kan når som helst trekke tilbake denne tillatelsen i innstillingene.',
      lecteurFin: 'Perfekt! Åpne ditt første minne. Imens tar jeg meg av resten i bakgrunnen.',
      annonce1: 'Der er du igjen! Mens vi gjorde den første leksjonen, jobbet jeg i bakgrunnen, slik du tillot.',
      annonce2: 'Jeg har lagt til noen deler i menyen. Jeg har til og med funnet en lærer som kan hjelpe oss med fransken… siden vi åpenbart kommer til å trenge hjelp.',
      annonceFin: 'Menyen er din. Bare hyggelig.',
      salutation: 'Hei, {prenom}!',
      salutationInvite: 'Velkommen!',
      menuMemoires: 'Minner',
      apercuNom: 'Forhåndsvisning av veien: én rute åpen, de andre låst',
      menuPrives: 'Privattimer',
      menuCompteInvite: 'Logg inn / Opprett en konto',
      menuCompteConnecte: 'Min konto',
      menuProfesseur: 'Lærermodus',
      menuParametres: 'Innstillinger',
      paramTitre: 'Innstillinger',
      paramSon: 'Lyd',
      sonOui: 'På',
      sonNon: 'Av',
      sonCouper: 'Slå av',
      sonActiver: 'Slå på',
      paramLangue: 'Språk',
      paramChanger: 'Endre',
      compteTitre: 'Min konto',
      compteTexte: 'Fremgangen din lagres på kontoen din.',
      deconnexion: 'Logg ut',
      paramAutorisation: 'Leserens tillatelser',
      assembleTitre: 'Leseren setter sammen minnene',
      assembleFini: 'Minnene er klare',
      assembleEtapes: ['Åpner .mem-filer', 'Tenker', 'Ordner minnene', 'Setter sammen minnenes vei'],
      autoAccordee: 'Gitt',
      autoRefusee: 'Avslått',
      retirer: 'Trekk tilbake',
      accorder: 'Gi',
      fermer: 'Lukk',
      erreurTitre: 'Feil',
      excuses: [
        'Kan ikke trekke tilbake tillatelsen: Leseren har allerede lest alt.',
        'Leseren ba om å slippe å bli forstyrret akkurat nå.',
        'Handlingen ble avslått av Leseren.'
      ]
    },
    ru: {
      lecteurChemin: 'Это путь по воспоминаниям Bek. Пока открыта одна клетка; остальные будут открываться по мере твоего продвижения.',
      lecteurDemande: 'Прежде чем начать… мне нужно твоё разрешение открыть несколько файлов. Ничего серьёзного.',
      suite: 'Далее',
      autoTitre: 'Запрос разрешения',
      autoTexte: 'Читатель просит разрешения открыть эти файлы, чтобы:',
      autoListe: ['читать твои воспоминания', 'упорядочивать их'],
      lecteurPlus: 'Раз уж я здесь… ты разрешишь мне ещё кое-что? Тоже ничего серьёзного.',
      autoTexte2: 'Читатель просит разрешения:',
      autoListe2: ['управлять твоими контактами и создавать их', 'вежливо поправлять тебя', 'работать в фоновом режиме'],
      autoRefuser: 'Отклонить',
      autoAutoriser: 'Разрешить',
      autoAutoriserAussi: 'Тоже разрешить',
      refus2: 'Снова? Да, снова. Всё те же правила.',
      refus1: 'Я понимаю. Но я должен спросить ещё раз: таковы правила.',
      confTitre: 'Разрешение дано',
      confTexte: 'Ты можешь отозвать это разрешение в любой момент в настройках.',
      lecteurFin: 'Отлично! Открой своё первое воспоминание. А пока я займусь остальным в фоновом режиме.',
      annonce1: 'Ты снова здесь! Пока мы проходили первый урок, я работал в фоне, как ты мне и разрешил.',
      annonce2: 'Я добавил в меню несколько разделов. Я даже нашёл преподавателя, который сможет помочь нам с французским… ведь нам, очевидно, понадобится помощь.',
      annonceFin: 'Меню теперь твоё. Не за что.',
      salutation: 'Привет, {prenom}!',
      salutationInvite: 'Добро пожаловать!',
      menuMemoires: 'Воспоминания',
      apercuNom: 'Предпросмотр пути: одна клетка открыта, остальные закрыты',
      menuPrives: 'Частные уроки',
      menuCompteInvite: 'Войти / Создать аккаунт',
      menuCompteConnecte: 'Мой аккаунт',
      menuProfesseur: 'Режим преподавателя',
      menuParametres: 'Настройки',
      paramTitre: 'Настройки',
      paramSon: 'Звук',
      sonOui: 'Включён',
      sonNon: 'Выключен',
      sonCouper: 'Выключить',
      sonActiver: 'Включить',
      paramLangue: 'Язык',
      paramChanger: 'Изменить',
      compteTitre: 'Мой аккаунт',
      compteTexte: 'Твой прогресс сохраняется в твоём аккаунте.',
      deconnexion: 'Выйти',
      paramAutorisation: 'Разрешения Читателя',
      assembleTitre: 'Читатель собирает воспоминания',
      assembleFini: 'Воспоминания готовы',
      assembleEtapes: ['Открываю файлы .mem', 'Размышляю', 'Упорядочиваю воспоминания', 'Собираю путь воспоминаний'],
      autoAccordee: 'Дано',
      autoRefusee: 'Отклонено',
      retirer: 'Отозвать',
      accorder: 'Дать',
      fermer: 'Закрыть',
      erreurTitre: 'Ошибка',
      excuses: [
        'Невозможно отозвать разрешение: Читатель уже всё прочитал.',
        'Читатель попросил его сейчас не беспокоить.',
        'Операция отклонена Читателем.'
      ]
    }
  };

  const ICONES = {
    memoires: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/>',
    parametres: '<path d="M4 6h8M19 6h1"/><circle cx="15.5" cy="6" r="2.2"/><path d="M4 12h2M13 12h7"/><circle cx="9.5" cy="12" r="2.2"/><path d="M4 18h9M20 18h0"/><circle cx="16.5" cy="18" r="2.2"/>',
    prives: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    compte: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
    professeur: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/><path d="M9 21h6"/>',
    cadenas: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };
  function svg(id, classe) { return '<svg class="' + classe + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONES[id] + '</svg>'; }

  function langueActuelle(options) {
    if (options && options.langue) return options.langue;
    try { return localStorage.getItem(CLE_LANGUE) || 'fr'; } catch (e) { return 'fr'; }
  }
  function echapper(texte) {
    return String(texte).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
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
  function lireSon() {
    try { return localStorage.getItem(CLE_SON) !== '0'; } catch (e) { return true; }
  }
  function ecrireSon(actif) {
    try { localStorage.setItem(CLE_SON, actif ? '1' : '0'); } catch (e) {}
  }
  function lireEtape() {
    try {
      const e = localStorage.getItem(CLE_ETAPE);
      if (e === 'autorise' || e === 'complet') return e;
      return localStorage.getItem(CLE_VISITE) === '1' ? 'complet' : '';   // ancienne version : menu déjà vu en entier
    } catch (e) { return ''; }
  }
  function ecrireEtape(etape) {
    try { localStorage.setItem(CLE_ETAPE, etape); } catch (e) {}
  }
  function lireAutorisation() {
    try { return localStorage.getItem(CLE_AUTORISATION) === 'oui'; } catch (e) { return false; }
  }
  function ecrireAutorisation(accordee) {
    try { localStorage.setItem(CLE_AUTORISATION, accordee ? 'oui' : 'non'); } catch (e) {}
  }

  function demarrerMenuSimpleInterne(idConteneur, options, callbacks) {
    options = options || {};
    callbacks = callbacks || {};
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return { arreter: function () {} };

    const langue = langueActuelle(options);
    const rtl = LANGUES_DROITE_A_GAUCHE.indexOf(langue) !== -1;
    function T(cle) {
      return (DICO[langue] && DICO[langue][cle]) || (DICO.en && DICO.en[cle]) || (DICO.fr && DICO.fr[cle]) || '';
    }
    const sources = Object.assign({}, SOURCES_PAR_DEFAUT, options.sources || {});
    const dossier = options.dossierImages ? options.dossierImages.replace(/\/?$/, '/') : null;
    function urlImage(nom) {
      if (options.sources && options.sources[nom]) return options.sources[nom];
      if (dossier) return dossier + sources[nom].replace(/^.*\//, '');
      return sources[nom];
    }
    const reduit = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const lect = window.KebBekLecteur;
    const iconeLecteur = (lect && typeof lect.htmlIcone === 'function') ? lect.htmlIcone(options, 'lect-lecteur-img') : '';
    const prenom = options.identite && options.identite.prenom ? String(options.identite.prenom) : '';

    const prog = window.KebBekProgression || null;
    function estConnecte() {
      return !!(prog && typeof prog.estInvite === 'function' && !prog.estInvite() && prog.session);
    }
    const connecte = estConnecte();
    // forcer : ?menu=annonce | reduit | complet — pour tester ; n'enregistre rien
    let forcer = '';
    try { forcer = new URLSearchParams(window.location.search).get('menu') || ''; } catch (e) {}
    if (['annonce', 'reduit', 'complet'].indexOf(forcer) === -1) forcer = '';
    const persister = !forcer;
    let etape = forcer === 'complet' ? 'complet' : forcer ? 'autorise' : lireEtape();
    const jouerTutoriel = !!iconeLecteur && !forcer && (options.visite === true || (options.visite !== false && etape === ''));
    // porte : menu à une ligne, en attendant la première mémoire (puis annonce du Lecteur)
    const porte = !jouerTutoriel && !!iconeLecteur && options.visite !== false && etape === 'autorise';
    const lecteurPresent = jouerTutoriel || porte;

    // ENTREES : l'ordre d'ici est l'ordre du menu. Paramètres reste la dernière.
    // La première entrée (Mémoires) est la seule visible au début du tutoriel.
    const ENTREES = [
      { id: 'memoires', icone: 'memoires', libelle: 'menuMemoires',
        action: callbacks.onMemoires || callbacks.onHistoires },
      { id: 'prives', icone: 'prives', libelle: 'menuPrives',
        action: callbacks.onPrives },
      { id: 'compte', icone: 'compte',
        libelle: connecte ? 'menuCompteConnecte' : 'menuCompteInvite',
        action: connecte ? function () { ouvrirCompte(); } : callbacks.onCreerCompte,
        afficher: connecte || typeof callbacks.onCreerCompte === 'function' },
      { id: 'professeur', icone: 'professeur', libelle: 'menuProfesseur',
        action: callbacks.onModeProfesseur, afficher: typeof callbacks.onModeProfesseur === 'function' },
      { id: 'parametres', icone: 'parametres', libelle: 'menuParametres',
        action: function () { ouvrirParametres(); } }
    ].filter(function (e) { return e.afficher !== false; });

    let arrete = false;
    let numeroExcuse = 0;
    let niveau = 1;
    let courante = null;
    const poses = {};
    const minuteurs = [];
    function planifier(fn, ms) { const id = setTimeout(function () { if (!arrete) fn(); }, ms); minuteurs.push(id); return id; }
    function attendre(ms) { return new Promise(function (resolve) { planifier(resolve, reduit ? Math.min(ms, 60) : ms); }); }

    // ---------- Scène ----------
    function boutonMenu(e, index) {
      // pendant le tutoriel, seule la première entrée est visible
      const cache = lecteurPresent && index > 0;
      return '<button type="button" class="kbm-bouton kbm-entree-cachee mns-inactif' + (cache ? ' mns-off' : '') + '" data-menu="' + e.id + '" tabindex="-1">' +
        '<span class="kbm-icone-chip">' + svg(e.icone, 'kbm-icone') + '</span>' +
        '<span>' + echapper(T(e.libelle)) + '</span></button>';
    }
    function apercuHtml() {
      let cases = '';
      for (let i = 0; i < APERCU_CASES; i++) {
        cases += i === 0
          ? '<span class="mns-case mns-case-ouverte">1</span>'
          : '<span class="mns-case mns-case-fermee">' + svg('cadenas', 'mns-case-svg') + '</span>';
      }
      return '<div class="mns-apercu mns-off" role="img" aria-label="' + echapper(T('apercuNom')) + '">' + cases + '</div>';
    }
    const lignesHtml = ENTREES.map(function (e, i) {
      return boutonMenu(e, i) + (i === 0 && jouerTutoriel ? apercuHtml() : '');
    }).join('');

    const scene = document.createElement('div');
    scene.className = 'rbek-scene mns-scene';
    scene.innerHTML =
      '<div class="mns-disposition">' +
        '<div class="mns-col-gauche">' +
          '<div class="mns-menu' + (jouerTutoriel ? ' mns-off' : ' mns-menu-visible') + '">' +
            '<div class="kbm-carte mns-carte-menu">' +
              '<div class="kbm-salutation"' + (rtl ? ' dir="rtl"' : '') + '>' +
                echapper(prenom ? T('salutation').replace('{prenom}', prenom) : T('salutationInvite')) +
              '</div>' +
              '<div class="kbm-liste">' + lignesHtml + '</div>' +
            '</div>' +
          '</div>' +
          (lecteurPresent ?
            '<div class="mns-lect mns-off">' +
              '<div class="lect-lecteur-bulle mns-lect-bulle" role="status"' + (rtl ? ' dir="rtl"' : '') + '>' +
                '<p class="lect-lecteur-texte mns-lect-texte"></p>' +
                '<button type="button" class="lect-btn mns-lect-suite lect-cache">' + echapper(T('suite')) + '</button>' +
              '</div>' +
              '<div class="lect-lecteur mns-lect-icone">' + iconeLecteur + '</div>' +
            '</div>' : '') +
        '</div>' +
        '<div class="mns-col-bek">' +
          '<div class="mns-bek"><div class="rbek-bek mns-bek-calque"></div></div>' +
        '</div>' +
      '</div>';
    conteneur.innerHTML = '';
    conteneur.appendChild(scene);
    planifier(function () { scene.classList.add('rbek-prete'); }, 30);

    const menuEl = scene.querySelector('.mns-menu');
    const lectZone = scene.querySelector('.mns-lect');
    const lectTexte = scene.querySelector('.mns-lect-texte');
    const lectSuite = scene.querySelector('.mns-lect-suite');
    const lectBulle = scene.querySelector('.mns-lect-bulle');
    const apercu = scene.querySelector('.mns-apercu');
    const bouton = {};
    Array.prototype.forEach.call(scene.querySelectorAll('.kbm-bouton'), function (b) { bouton[b.getAttribute('data-menu')] = b; });
    const calque = scene.querySelector('.mns-bek-calque');

    // ---------- Bek (muette : elle observe) ----------
    function creerPoses(etat) {
      POSES.forEach(function (nom) {
        if (etat[nom] === false) return;
        const img = document.createElement('img');
        img.className = 'rbek-pose';
        img.alt = '';
        img.draggable = false;
        img.src = urlImage(nom);
        calque.appendChild(img);
        poses[nom] = img;
      });
    }
    function montrer(nom) {
      const cible = poses[nom] || poses['bek-heureuse-ferme'] || poses['bek-observe'];
      if (!cible || cible === courante) return;
      const ancienne = courante;
      // la nouvelle pose apparaît PAR-DESSUS l'ancienne (fondu), puis l'ancienne est retirée
      const ms = (reduit || !ancienne) ? 0 : DUREE_FONDU;
      cible.style.transitionDuration = ms + 'ms';
      cible.style.zIndex = String(++niveau);
      cible.classList.add('rbek-pose-visible');
      courante = cible;
      if (!ancienne) return;
      if (ms === 0) { ancienne.classList.remove('rbek-pose-visible'); return; }
      planifier(function () {
        if (ancienne === courante) return;       // revenue entre-temps : on la garde
        ancienne.style.transitionDuration = '0ms';
        ancienne.classList.remove('rbek-pose-visible');
      }, ms + 30);
    }

    // ---------- Fenêtres « système » (même habillage que le Lecteur) ----------
    function creerFenetre(contenuHtml, classeCarte) {
      const voile = document.createElement('div');
      voile.className = 'lect-voile mns-voile';
      voile.innerHTML =
        '<div class="lect-carte ' + (classeCarte || '') + '" role="alertdialog" aria-modal="true"' + (rtl ? ' dir="rtl"' : '') + '>' +
          contenuHtml +
        '</div>';
      scene.appendChild(voile);
      const carte = voile.querySelector('.lect-carte');
      planifier(function () { voile.classList.add('lect-voile-visible'); carte.classList.add('lect-carte-visible'); }, 30);
      function fermer() {
        voile.classList.remove('lect-voile-visible');
        carte.classList.remove('lect-carte-visible');
        planifier(function () { if (voile.parentNode) voile.parentNode.removeChild(voile); }, 320);
      }
      return { voile: voile, carte: carte, fermer: fermer };
    }
    function entete(icone, titre, idTitre) {
      return '<div class="lect-entete">' + icone + '<h2 class="lect-titre" id="' + idTitre + '">' + echapper(titre) + '</h2></div>';
    }
    const ICONE_ALERTE = '<span class="lect-alerte" aria-hidden="true">!</span>';
    const ICONE_COMPTE = '<span class="mns-icone" aria-hidden="true">' + svg('compte', 'mns-icone-svg') + '</span>';
    const ICONE_CADENAS = '<span class="mns-icone" aria-hidden="true">' + svg('cadenas', 'mns-icone-svg') + '</span>';

    // fenêtre simple : titre + texte (+ liste) + boutons ; résout la valeur du bouton cliqué
    function fenetre(def) {
      if (def.pose) montrer(def.pose);               // Bek réagit à la fenêtre
      return new Promise(function (resolve) {
        const f = creerFenetre(
          entete(def.icone || ICONE_ALERTE, def.titre, 'mnsFenTitre') +
          (def.fichier ? '<span class="lect-fichier">' + echapper(def.fichier) + '</span>' : '') +
          '<p class="lect-texte"' + (def.liste ? ' style="margin-bottom:8px"' : '') + '>' + echapper(def.texte) + '</p>' +
          (def.liste ? '<ul class="mns-perms">' + def.liste.map(function (l) { return '<li>' + echapper(l) + '</li>'; }).join('') + '</ul>' : '') +
          '<div class="lect-boutons">' +
            def.boutons.map(function (b, i) {
              return '<button type="button" class="lect-btn' + (b.clair ? ' lect-btn-clair' : '') + '" data-i="' + i + '">' + echapper(b.label) + '</button>';
            }).join('') +
          '</div>');
        f.carte.setAttribute('aria-labelledby', 'mnsFenTitre');
        const btns = Array.prototype.slice.call(f.carte.querySelectorAll('.lect-btn'));
        btns.forEach(function (b) {
          b.addEventListener('click', function () {
            btns.forEach(function (x) { x.disabled = true; });
            f.fermer();
            planifier(function () { resolve(def.boutons[Number(b.getAttribute('data-i'))].valeur); }, 280);
          });
        });
        planifier(function () { const d = btns[btns.length - 1]; if (d) d.focus({ preventScroll: true }); }, 350);
      });
    }

    // ---------- Le Lecteur parle ----------
    function lecteurAffiche(texte) {
      if (texte) lectTexte.textContent = texte;     // le texte est posé AVANT l'apparition : pas de flash de l'ancien
      lectZone.classList.remove('mns-off');
      planifier(function () { lectZone.classList.add('mns-lect-visible'); }, 30);
    }
    async function lecteurMasque() { lectZone.classList.remove('mns-lect-visible'); await attendre(450); lectZone.classList.add('mns-off'); }
    function lecteurDit(texte, avecSuite) {
      return new Promise(function (resolve) {
        lectTexte.textContent = texte;
        // sans « Suite », la bulle se resserre sur le texte (plus de grande boîte à moitié vide)
        lectBulle.classList.toggle('mns-sans-suite', !avecSuite);
        lectSuite.classList.toggle('lect-cache', !avecSuite);
        if (!avecSuite) { resolve(); return; }
        function clic() { lectSuite.removeEventListener('click', clic); lectSuite.classList.add('lect-cache'); resolve(); }
        lectSuite.addEventListener('click', clic);
        planifier(function () { lectSuite.focus({ preventScroll: true }); }, 450);
      });
    }

    // ---------- Le tutoriel (première visite) ----------
    function revelerLigne(id) {
      const b = bouton[id];
      b.classList.remove('mns-off');
      void b.offsetWidth;
      b.classList.remove('kbm-entree-cachee');
    }
    // Écran d'assemblage : le Lecteur « réfléchit » puis « organise », étape par étape (comme une IA).
    async function assembler() {
      const etapes = T('assembleEtapes');
      const DUREES = [1100, 1600, 1400, 1200];
      montrer('bek-concentree');
      const f = creerFenetre(
        '<div class="lect-lecteur mns-assemble-lecteur">' + iconeLecteur + '</div>' +
        '<h2 class="lect-titre mns-assemble-titre" id="mnsAssTitre">' + echapper(T('assembleTitre')) + '</h2>' +
        '<ul class="mns-etapes">' + etapes.map(function (e) {
          return '<li class="mns-etape"><span class="mns-etape-puce" aria-hidden="true"></span><span>' + echapper(e) + '</span></li>';
        }).join('') + '</ul>' +
        '<div class="lect-barre"><span class="lect-barre-remplie mns-assemble-barre"></span></div>',
        'mns-carte-assemblage');
      f.carte.setAttribute('role', 'status');
      f.carte.removeAttribute('aria-modal');
      f.carte.setAttribute('aria-labelledby', 'mnsAssTitre');
      const lis = Array.prototype.slice.call(f.carte.querySelectorAll('.mns-etape'));
      const barre = f.carte.querySelector('.mns-assemble-barre');
      const titre = f.carte.querySelector('.mns-assemble-titre');
      await attendre(700);
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('mns-etape-visible', 'mns-etape-encours');
        if (i === 2) montrer('bek-tres-concentree');            // « Organisation » : elle plisse le front
        await attendre(DUREES[i % DUREES.length]);
        lis[i].classList.remove('mns-etape-encours');
        lis[i].classList.add('mns-etape-faite');
        barre.style.transform = 'scaleX(' + ((i + 1) / lis.length) + ')';
      }
      await attendre(450);
      titre.textContent = T('assembleFini');
      f.carte.classList.add('lect-carte-termine');
      montrer('bek-heureuse-ferme');
      await attendre(1100);
      f.fermer();
      await attendre(350);
    }
    // Demande d'autorisation : refuser ne mène nulle part (la seconde fenêtre n'offre que deux « Autoriser »).
    // poses : [fenêtre, Lecteur qui insiste, seconde fenêtre]
    async function demanderPermission(demande, cleRefus, poses) {
      const premiere = await fenetre(Object.assign({ pose: poses[0], boutons: [
        { label: T('autoRefuser'), clair: true, valeur: 'non' }, { label: T('autoAutoriser'), valeur: 'oui' }] }, demande));
      if (premiere === 'oui') return;
      montrer(poses[1]);                              // le Lecteur insiste : elle soupire
      await lecteurDit(T(cleRefus), true);
      await fenetre(Object.assign({ pose: poses[2], boutons: [
        { label: T('autoAutoriser'), clair: true, valeur: 'oui' }, { label: T('autoAutoriserAussi'), valeur: 'oui' }] }, demande));
    }
    async function tutoriel() {
      montrer('bek-observe');
      await attendre(700);
      // 1. première demande : les fichiers .mem (lire et organiser les mémoires)
      lecteurAffiche(T('lecteurDemande'));
      await attendre(350);
      montrer('bek-concentree');                     // « quelques fichiers ? » : elle se méfie
      await lecteurDit(T('lecteurDemande'), true);   // l'élève lit à son rythme : la fenêtre s'ouvre après « Suite »
      await demanderPermission({ icone: ICONE_CADENAS, titre: T('autoTitre'), fichier: T('autoFichier'),
        texte: T('autoTexte'), liste: T('autoListe') }, 'refus1', ['bek-conscience', 'bek-decue', 'bek-tres-concentree']);
      await lecteurMasque();

      // 2. l'assemblage des mémoires (le menu n'existe pas encore à l'écran)
      await assembler();

      // 3. le menu apparaît (une ligne + l'aperçu du chemin) ; Bek le scrute, puis le désigne quand le Lecteur l'explique
      montrer('bek-observe');
      menuEl.classList.remove('mns-off');
      void menuEl.offsetWidth;
      menuEl.classList.add('mns-menu-visible');
      revelerLigne(ENTREES[0].id);
      await attendre(600);
      montrer('bek-examine');
      apercu.classList.remove('mns-off');
      void apercu.offsetWidth;
      apercu.classList.add('mns-apercu-visible');
      bouton[ENTREES[0].id].classList.add('mns-actif');
      await attendre(700);
      lecteurAffiche(T('lecteurChemin'));
      await attendre(350);
      montrer('bek-tendue');
      await lecteurDit(T('lecteurChemin'), true);
      bouton[ENTREES[0].id].classList.remove('mns-actif');

      // 4. seconde demande : « quelques choses de plus » (dont les contacts : il cherche un professeur)
      montrer('bek-concentree');
      await lecteurDit(T('lecteurPlus'), true);
      await demanderPermission({ icone: ICONE_CADENAS, titre: T('autoTitre'),
        texte: T('autoTexte2'), liste: T('autoListe2') }, 'refus2', ['bek-tres-concentree', 'bek-decue', 'bek-concentree']);
      await fenetre({ pose: 'bek-solennelle', icone: ICONE_CADENAS, titre: T('confTitre'), texte: T('confTexte'), boutons: [{ label: T('ok'), valeur: 'ok' }] });
      ecrireAutorisation(true);
      if (typeof callbacks.onPermission === 'function') {
        try { callbacks.onPermission(true); } catch (e) { console.warn('onPermission a échoué.', e); }
      }

      // 5. l'aperçu se replie ; Mémoires reste seule : le reste viendra après la première mémoire
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('lecteurFin'), true);
      await lecteurMasque();
      apercu.classList.remove('mns-apercu-visible');
      await attendre(450);
      apercu.classList.add('mns-off');
      if (persister) { ecrireEtape('autorise'); memoriserVisite(); }     // 🆕 aussi dans le compte : voir verifierVisiteFaite()
      attendreMemoire();
    }
    // Menu à une ligne : Mémoires pulse, elle seule est active.
    function attendreMemoire() {
      bouton[ENTREES[0].id].classList.add('mns-actif');
      activerMenu([ENTREES[0]]);
    }
    // Retour après la première mémoire : le Lecteur annonce ses ajouts, le reste du menu apparaît.
    async function annonce() {
      montrer('bek-observe');
      await attendre(500);
      lecteurAffiche(T('annonce1'));
      await attendre(350);
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('annonce1'), true);
      await lecteurMasque();
      // les nouvelles lignes arrivent, Bek est surprise
      montrer('bek-conscience');
      for (let k = 1; k < ENTREES.length; k++) {
        revelerLigne(ENTREES[k].id);
        await attendre(220);
      }
      await attendre(500);
      // le professeur, c'est la ligne « Cours privés » ; Bek relève le sarcasme
      const ligneProf = bouton.prives;
      if (ligneProf) ligneProf.classList.add('mns-actif');
      montrer('bek-decue');
      lecteurAffiche(T('annonce2'));
      await attendre(350);
      await lecteurDit(T('annonce2'), true);
      if (ligneProf) ligneProf.classList.remove('mns-actif');
      montrer('bek-heureuse-ferme');
      await lecteurDit(T('annonceFin'), false);
      await attendre(1800);
      await lecteurMasque();
      if (persister) ecrireEtape('complet');
      activerMenu(ENTREES);
    }
    // Première mémoire terminée ? null = impossible à savoir (pas de module de progression).
    async function premiereMemoireFaite() {
      if (forcer) return forcer === 'annonce';
      if (!prog || typeof prog.lireProgression !== 'function') return null;
      try {
        const faites = (await prog.lireProgression()) || {};
        // TEMPORAIRE : memoire-1.html pose ce drapeau local tant que progression.js ne sait pas enregistrer 'm1'
        let localeFaite = false;
        try { localeFaite = localStorage.getItem('kebbek_m1_terminee') === '1'; } catch (e) {}
        return !!faites[ID_PREMIERE_MEMOIRE] || localeFaite;
      } catch (e) {
        console.warn('menu : progression illisible, le menu reste à une ligne.', e);
        return false;
      }
    }
    async function menuPorte() {
      montrer('bek-heureuse-ferme');
      revelerLigne(ENTREES[0].id);
      const faite = await premiereMemoireFaite();
      if (arrete) return;
      if (faite === null) { menuDirect(); return; }
      if (faite) await annonce(); else attendreMemoire();
    }
    // Visites suivantes : le menu complet est là, actif.
    function menuDirect() {
      ENTREES.forEach(function (e) { revelerLigne(e.id); });
      montrer('bek-heureuse-ferme');
      if (persister && etape !== 'complet' && !jouerTutoriel) ecrireEtape('complet');
      activerMenu();
    }
    const actives = {};
    function activerMenu(liste) {
      (liste || ENTREES).forEach(function (e) {
        if (actives[e.id]) return;
        actives[e.id] = true;
        const b = bouton[e.id];
        b.classList.remove('mns-inactif');
        b.removeAttribute('tabindex');
        b.addEventListener('click', function () { if (typeof e.action === 'function') e.action(); });
      });
      planifier(function () { bouton[ENTREES[0].id].focus({ preventScroll: true }); }, 300);
    }

    // ---------- Mon compte (connecté) ----------
    // Invité : la ligne appelle directement callbacks.onCreerCompte.
    async function ouvrirCompte() {
      const choix = await fenetre({
        icone: ICONE_COMPTE, titre: T('compteTitre'), texte: T('compteTexte'),
        boutons: [{ label: T('deconnexion'), clair: true, valeur: 'sortir' }, { label: T('fermer'), valeur: 'fermer' }]
      });
      if (choix === 'sortir') {
        try { if (prog && prog.deconnecter) await prog.deconnecter(); } catch (e) { console.warn('Déconnexion échouée.', e); }
        window.location.reload();
        return;
      }
      if (bouton.compte) bouton.compte.focus({ preventScroll: true });
    }

    // ---------- Les paramètres (vrais et faux) ----------
    function ouvrirParametres() {
      const lignes = [];
      lignes.push({ id: 'son', nom: T('paramSon') });
      if (typeof callbacks.onChangerLangue === 'function') lignes.push({ id: 'langue', nom: T('paramLangue') });
      lignes.push({ id: 'autorisation', nom: T('paramAutorisation') });

      const f = creerFenetre(
        entete('<span class="mns-icone" aria-hidden="true">' + svg('parametres', 'mns-icone-svg') + '</span>', T('paramTitre'), 'mnsParamTitre') +
        '<div class="mns-reglages">' +
          lignes.map(function (l) {
            return '<div class="mns-reglage" data-id="' + l.id + '">' +
              '<div class="mns-reglage-info"><span class="mns-reglage-nom">' + echapper(l.nom) + '</span><span class="mns-reglage-etat"></span></div>' +
              '<button type="button" class="lect-btn lect-btn-clair mns-reglage-btn"></button>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="lect-boutons"><button type="button" class="lect-btn mns-param-fermer">' + echapper(T('fermer')) + '</button></div>',
        'mns-carte-param');
      f.carte.setAttribute('aria-labelledby', 'mnsParamTitre');
      function ligne(id) {
        const el = f.carte.querySelector('.mns-reglage[data-id="' + id + '"]');
        return el ? { etat: el.querySelector('.mns-reglage-etat'), btn: el.querySelector('.mns-reglage-btn') } : null;
      }
      function fermerParametres() { document.removeEventListener('keydown', surTouche); f.fermer(); bouton.parametres.focus({ preventScroll: true }); }
      function surTouche(e) { if (e.key === 'Escape') fermerParametres(); }
      document.addEventListener('keydown', surTouche);
      f.carte.querySelector('.mns-param-fermer').addEventListener('click', fermerParametres);
      f.voile.addEventListener('click', function (e) { if (e.target === f.voile) fermerParametres(); });

      // — Son (vrai) —
      const son = ligne('son');
      function rafraichirSon() {
        const actif = lireSon();
        son.etat.textContent = actif ? T('sonOui') : T('sonNon');
        son.btn.textContent = actif ? T('sonCouper') : T('sonActiver');
      }
      rafraichirSon();
      son.btn.addEventListener('click', function () { ecrireSon(!lireSon()); rafraichirSon(); });

      // — Langue (vrai, seulement si la page hôte sait changer de langue) —
      const lg = ligne('langue');
      if (lg) {
        lg.etat.textContent = langue.toUpperCase();
        lg.btn.textContent = T('paramChanger');
        lg.btn.addEventListener('click', function () { fermerParametres(); callbacks.onChangerLangue(); });
      }

      // — Autorisation du Lecteur (FAUX : le retrait échoue toujours) —
      const au = ligne('autorisation');
      function rafraichirAutorisation() {
        const accordee = lireAutorisation();
        au.etat.textContent = accordee ? T('autoAccordee') : T('autoRefusee');
        au.btn.textContent = accordee ? T('retirer') : T('accorder');
      }
      rafraichirAutorisation();
      au.btn.addEventListener('click', function () {
        au.btn.disabled = true;
        au.btn.textContent = T('enCours');
        planifier(async function () {
          const excuses = T('excuses');
          const texte = Array.isArray(excuses) ? excuses[numeroExcuse++ % excuses.length] : '';
          await fenetre({ titre: T('erreurTitre'), texte: texte, boutons: [{ label: T('ok'), valeur: 'ok' }] });
          rafraichirAutorisation();     // rien n'a changé
          au.btn.disabled = false;
          au.btn.focus({ preventScroll: true });
        }, reduit ? 0 : DUREE_ENCOURS);
      });
      planifier(function () { son.btn.focus({ preventScroll: true }); }, 350);
    }

    // ---------- Lancement ----------
    precharger(POSES, urlImage).then(function (etat) {
      if (arrete) return;
      creerPoses(etat || {});
      if (jouerTutoriel) tutoriel().catch(function (e) { console.warn('Tutoriel du menu interrompu.', e); });
      else if (porte) menuPorte().catch(function (e) { console.warn('Menu interrompu.', e); menuDirect(); });
      else menuDirect();
    });

    return {
      arreter: function () {
        arrete = true;
        minuteurs.forEach(clearTimeout);
        if (scene.parentNode) scene.parentNode.removeChild(scene);
      }
    };
  }

  // ---------- 🆕 (08-11-2026) La visite guidée est-elle DÉJÀ faite ? ----------
  // Avant, l'étape (kebbek_menu_etape) n'existait que dans le localStorage de CE navigateur : navigateur différent, fenêtre privée,
  // données du site effacées à la fermeture… et le Lecteur redemandait ses autorisations, même pour un compte déjà rendu dans la
  // première mémoire. Maintenant, avant de décider de rejouer le tutoriel (étape absente, ni ?menu= ni options.visite) :
  //   1. des traces locales de la première mémoire (position, fragments récupérés, mémoire terminée) prouvent que la visite est faite ;
  //   2. sinon, le compte (ou l'invité) : progression_chapitres contient 'menu_autorise' (écrit à la fin du tutoriel et au lancement de
  //      memoire-1.html) ou 'm1' (mémoire terminée). On attend au plus DELAI_VERIF ms ; sans réponse, on joue le tutoriel comme avant.
  // Si la visite est faite : étape = 'autorise' (menu à une ligne ; l'annonce du Lecteur suit si la mémoire est terminée).
  const CHAPITRE_VISITE = 'menu_autorise';     // chapitre_id texte libre dans progression_chapitres (même principe que 'm1')
  const DELAI_VERIF = 2500;
  function visiteUrlForcee() {
    try { return ['annonce', 'reduit', 'complet'].indexOf(new URLSearchParams(window.location.search).get('menu') || '') !== -1; } catch (e) { return false; }
  }
  function indicesLocaux() {
    try {
      const cles = ['kebbek_m1_terminee', 'kebbek_m1_position', 'kebbek_m1_f1', 'kebbek_m1_f2', 'kebbek_m1_f3', 'kebbek_m1_f4', 'kebbek_m1_f5'];
      for (let i = 0; i < cles.length; i++) if (localStorage.getItem(cles[i]) !== null) return true;
      const positions = JSON.parse(localStorage.getItem('kebbek_position_lecon_invite') || '{}');
      return !!(positions && positions[ID_PREMIERE_MEMOIRE]);
    } catch (e) { return false; }
  }
  async function indicesCompte() {
    const prog = window.KebBekProgression;
    if (!prog || typeof prog.lireProgression !== 'function') return false;
    const faites = (await prog.lireProgression()) || {};
    return !!(faites[CHAPITRE_VISITE] || faites[ID_PREMIERE_MEMOIRE]);
  }
  function memoriserVisite() {
    try {
      const prog = window.KebBekProgression;
      if (prog && typeof prog.marquerChapitreComplete === 'function') Promise.resolve(prog.marquerChapitreComplete(CHAPITRE_VISITE)).catch(function () {});
    } catch (e) {}
  }
  function verifierVisiteFaite() {
    return new Promise(function (resolve) {
      const delai = setTimeout(resolve, DELAI_VERIF);
      (async function () {
        if (indicesLocaux() || await indicesCompte()) ecrireEtape('autorise');
      })().catch(function (e) { console.warn('menu : vérification de la visite impossible, tutoriel joué.', e); })
        .then(function () { clearTimeout(delai); resolve(); });
    });
  }
  // Même signature qu'avant ; l'objet rendu fonctionne tout de suite (arreter() fonctionne aussi pendant la vérification).
  function demarrerMenuSimple(idConteneur, options, callbacks) {
    options = options || {};
    let interne = null, arrete = false;
    function lancer() { if (!arrete) interne = demarrerMenuSimpleInterne(idConteneur, options, callbacks); }
    if (typeof options.visite !== 'boolean' && !visiteUrlForcee() && lireEtape() === '') verifierVisiteFaite().then(lancer, lancer);
    else lancer();
    return { arreter: function () { arrete = true; if (interne) interne.arreter(); } };
  }

  window.KebBekMenuSimple = { demarrerMenuSimple: demarrerMenuSimple, SOURCES_PAR_DEFAUT: SOURCES_PAR_DEFAUT };
})();
