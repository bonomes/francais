/* ==================================================================
   sequence-telechargement-langue.js — module autonome, même patron
   que les autres écrans : window.KebBekTelechargementLangue.
   demarrerSequenceTelechargementLangue(idConteneur, options, callbacks).

   🆕 (20-09-2026) Réécriture complète — l'ancienne version (un simple
   bouton "Télécharger" puis une barre, sur une page à part) ne
   correspondait pas à l'intention de Raphaël. Nouvelle mise en scène,
   en un seul écran continu :

     1. Bek (celle qui vient de flotter et d'atterrir à la fin de
        sequence-televersement.js) réapparaît en fond, À LA MÊME
        TAILLE — ce module rejoue l'image plutôt que de tenter de
        garder vivant le DOM interne de l'autre séquence (fragile,
        dépendrait de ses détails internes).
     2. Pause de 2 s, immobile — DELAI_AVANT_PANNEAU ci-dessous.
     3. Un panneau apparaît par-dessus : une LISTE DE FICHIERS de
        langues (les langues d'interface du site, transmises via
        options.langues — voir LANGUES dans index.html), français
        inclus, VISUELLEMENT IDENTIQUE aux autres (pas de bordure
        pointillée, pas d'opacité réduite — un fichier ne "a l'air"
        pas cassé tant qu'on n'a pas essayé de l'ouvrir).
     4. Clic sur une vraie langue → sélection visuelle + bouton
        "Téléversement" (traduit) apparaît au bas du MÊME panneau.
        Clic sur "français" → message bref "Fichier fragmenté ou
        introuvable" en surimpression sur le fichier, rien d'autre —
        jamais de sélection, jamais de navigation.
     5. Clic sur "Téléversement" → le panneau se retire, l'image de
        fond passe (fondu) de la pose "atterrie" à la pose "réception"
        (particules de lumière) — MÊME BOÎTE, donc même taille — avec
        la barre de progression (barre-progression.js) en dessous.
     6. À 100 % : le mot "Réinitialisation" (traduit), une pause, puis
        callbacks.onFin(codeLangueChoisie).

   Dépend de barre-progression.js (window.KebBekBarreProgression),
   chargé avant celui-ci.

   Dictionnaire couvrant les 19 langues du site (voir LANGUES dans
   index.html) — traductions faites de mon mieux, à valider par des
   locuteurs natifs avant mise en ligne, comme le reste des textes du
   site. Sans traduction disponible pour un code inattendu, repli sur
   l'anglais.
   ================================================================== */

const DICO_TELECHARGEMENT_LANGUE = {
  fr: { bouton: 'Téléversement', reinitialisation: 'Réinitialisation', erreurFrancais: 'Fichier fragmenté ou introuvable',
    titre: 'Sélectionne un fichier de langue',
    avertissement: 'Veux-tu vraiment changer la langue pour {langue} ? Tu pourras la changer plus tard dans les réglages.',
    confirmer: 'Oui, changer', annuler: 'Annuler' },
  en: { bouton: 'Upload', reinitialisation: 'Reset', erreurFrancais: 'File fragmented or not found',
    titre: 'Select a language file',
    avertissement: 'Are you sure you want to change the language to {langue}? You can change it later in settings.',
    confirmer: 'Yes, switch', annuler: 'Cancel' },
  es: { bouton: 'Subir', reinitialisation: 'Reinicio', erreurFrancais: 'Archivo fragmentado o no encontrado',
    titre: 'Selecciona un archivo de idioma',
    avertissement: '¿Seguro que quieres cambiar el idioma a {langue}? Podrás cambiarlo más tarde en los ajustes.',
    confirmer: 'Sí, cambiar', annuler: 'Cancelar' },
  it: { bouton: 'Caricamento', reinitialisation: 'Ripristino', erreurFrancais: 'File frammentato o non trovato',
    titre: 'Seleziona un file di lingua',
    avertissement: 'Vuoi davvero cambiare la lingua in {langue}? Potrai cambiarla più tardi nelle impostazioni.',
    confirmer: 'Sì, cambia', annuler: 'Annulla' },
  pt: { bouton: 'Carregar', reinitialisation: 'Reinício', erreurFrancais: 'Ficheiro fragmentado ou não encontrado',
    titre: 'Seleciona um ficheiro de idioma',
    avertissement: 'Tens a certeza de que queres mudar o idioma para {langue}? Podes alterá-lo mais tarde nas definições.',
    confirmer: 'Sim, mudar', annuler: 'Cancelar' },
  ca: { bouton: 'Pujada', reinitialisation: 'Reinici', erreurFrancais: 'Fitxer fragmentat o no trobat',
    titre: "Selecciona un fitxer d'idioma",
    avertissement: "Segur que vols canviar l'idioma a {langue}? Ho podràs canviar més tard als ajustos.",
    confirmer: 'Sí, canviar', annuler: 'Cancel·la' },
  eo: { bouton: 'Alŝuto', reinitialisation: 'Restarigo', erreurFrancais: 'Dosiero fragmentita aŭ ne trovita',
    titre: 'Elektu lingvan dosieron',
    avertissement: 'Ĉu vi certe volas ŝanĝi la lingvon al {langue}? Vi povos ŝanĝi ĝin poste en la agordoj.',
    confirmer: 'Jes, ŝanĝi', annuler: 'Nuligi' },
  zh: { bouton: '上传', reinitialisation: '重置', erreurFrancais: '文件已损坏或未找到',
    titre: '选择一个语言文件',
    avertissement: '你确定要把语言改成{langue}吗？你以后可以在设置里更改。',
    confirmer: '是，更改', annuler: '取消' },
  ja: { bouton: 'アップロード', reinitialisation: 'リセット', erreurFrancais: 'ファイルが破損しているか見つかりません',
    titre: '言語ファイルを選んでね',
    avertissement: '言語を{langue}に変更してもいい？あとで設定から変更できるよ。',
    confirmer: 'うん、変更する', annuler: 'キャンセル' },
  ko: { bouton: '업로드', reinitialisation: '재설정', erreurFrancais: '파일이 손상되었거나 찾을 수 없습니다',
    titre: '언어 파일을 선택하세요',
    avertissement: '언어를 {langue}(으)로 변경하시겠어요? 나중에 설정에서 바꿀 수 있어요.',
    confirmer: '네, 변경할게요', annuler: '취소' },
  vi: { bouton: 'Tải lên', reinitialisation: 'Đặt lại', erreurFrancais: 'Tệp bị phân mảnh hoặc không tìm thấy',
    titre: 'Chọn một tệp ngôn ngữ',
    avertissement: 'Bạn có chắc muốn đổi ngôn ngữ sang {langue} không? Bạn có thể đổi lại sau trong phần cài đặt.',
    confirmer: 'Có, đổi', annuler: 'Hủy' },
  ht: { bouton: 'Voye', reinitialisation: 'Reyinisyalizasyon', erreurFrancais: 'Fichye frajmante oswa pa jwenn',
    titre: 'Chwazi yon fichye lang',
    avertissement: 'Èske ou sèten ou vle chanje lang pou {langue}? Ou ka chanje l pita nan paramèt yo.',
    confirmer: 'Wi, chanje', annuler: 'Anile' },
  tl: { bouton: 'I-upload', reinitialisation: 'I-reset', erreurFrancais: 'Nasira o hindi nahanap ang file',
    titre: 'Pumili ng language file',
    avertissement: 'Sigurado ka bang gusto mong palitan ang wika sa {langue}? Puwede mo itong baguhin sa settings mamaya.',
    confirmer: 'Oo, palitan', annuler: 'Kanselahin' },
  id: { bouton: 'Unggah', reinitialisation: 'Atur Ulang', erreurFrancais: 'File rusak atau tidak ditemukan',
    titre: 'Pilih berkas bahasa',
    avertissement: 'Yakin ingin mengganti bahasa ke {langue}? Kamu bisa mengubahnya lagi nanti di pengaturan.',
    confirmer: 'Ya, ganti', annuler: 'Batal' },
  nl: { bouton: 'Uploaden', reinitialisation: 'Reset', erreurFrancais: 'Bestand gefragmenteerd of niet gevonden',
    titre: 'Kies een taalbestand',
    avertissement: 'Weet je zeker dat je de taal wilt wijzigen naar {langue}? Je kunt dit later nog aanpassen in de instellingen.',
    confirmer: 'Ja, wijzigen', annuler: 'Annuleren' },
  de: { bouton: 'Hochladen', reinitialisation: 'Zurücksetzen', erreurFrancais: 'Datei fragmentiert oder nicht gefunden',
    titre: 'Wähle eine Sprachdatei',
    avertissement: 'Möchtest du die Sprache wirklich zu {langue} ändern? Du kannst das später in den Einstellungen wieder ändern.',
    confirmer: 'Ja, ändern', annuler: 'Abbrechen' },
  fa: { bouton: 'بارگذاری', reinitialisation: 'بازنشانی', erreurFrancais: 'فایل خرد شده یا یافت نشد',
    titre: 'یک فایل زبان را انتخاب کن',
    avertissement: 'مطمئنی می\u200cخواهی زبان را به {langue} تغییر بدهی؟ می\u200cتوانی بعداً از تنظیمات آن را تغییر دهی.',
    confirmer: 'بله، تغییر بده', annuler: 'لغو' },
  sv: { bouton: 'Ladda upp', reinitialisation: 'Återställning', erreurFrancais: 'Filen är fragmenterad eller hittades inte',
    titre: 'Välj en språkfil',
    avertissement: 'Är du säker på att du vill ändra språket till {langue}? Du kan ändra det senare i inställningarna.',
    confirmer: 'Ja, byt', annuler: 'Avbryt' },
  no: { bouton: 'Last opp', reinitialisation: 'Tilbakestilling', erreurFrancais: 'Filen er fragmentert eller ble ikke funnet',
    titre: 'Velg en språkfil',
    avertissement: 'Er du sikker på at du vil endre språket til {langue}? Du kan endre det senere i innstillingene.',
    confirmer: 'Ja, bytt', annuler: 'Avbryt' },
  ru: { bouton: 'Загрузка', reinitialisation: 'Сброс', erreurFrancais: 'Файл повреждён или не найден',
    titre: 'Выбери языковой файл',
    avertissement: 'Ты уверен(а), что хочешь изменить язык на {langue}? Позже ты сможешь изменить это в настройках.',
    confirmer: 'Да, изменить', annuler: 'Отмена' }
};
// 🚧 Traductions faites de mon mieux, pas relues par une personne native
// de chacune de ces langues — à valider avant mise en ligne, comme pour
// tout le reste du site (voir DICO_MENU et les autres dictionnaires).

function tTelechargementLangue(codeLangue, cle) {
  const dico = DICO_TELECHARGEMENT_LANGUE[codeLangue] || DICO_TELECHARGEMENT_LANGUE.en;
  return dico[cle] || DICO_TELECHARGEMENT_LANGUE.en[cle];
}

/**
 * @param {string} idConteneur
 * @param {object} options
 *   - langues (requis) — tableau [{code, natif, fr}, ...] des langues
 *     d'interface du site (même forme que LANGUES dans index.html) ;
 *     ce module ajoute lui-même l'entrée "français" à la suite, elle
 *     ne doit PAS être incluse dans ce tableau.
 *   - imageAtterrissage (défaut 'images/telechargement/televersement_bek_06.webp')
 *     — Bek juste après avoir atterri (même image que la fin de
 *     sequence-televersement.js).
 *   - imageReception (défaut 'images/telechargement/televersement_bek_langue_01.webp')
 *     — Bek recevant la langue (particules de lumière), affichée à la
 *     MÊME taille que l'image d'atterrissage.
 *   - delaiAvantPanneau (ms, défaut 2000) — pause immobile avant que
 *     le panneau de fichiers apparaisse.
 *   - duree (ms, défaut 2600) — durée de la barre de progression.
 *   - pauseFin (ms, défaut 1400) — temps d'affichage de
 *     "Réinitialisation" avant onFin.
 *   - langueInitiale (défaut 'en') — 🆕 (27-09-2026, demande de Raphaël)
 *     code de la langue dans laquelle l'élève a lu la lettre (voir
 *     onInstaller dans lettre-initiale.js). Sert à : (1) présélectionner
 *     d'emblée le bon fichier dans la grille (et afficher directement son
 *     bouton de téléversement) si c'est une vraie langue de la liste, et
 *     (2) choisir la langue d'affichage du titre du panneau et de
 *     l'avertissement de changement de langue (voir plus bas). Si
 *     l'élève avait lu la lettre en français, rien n'est présélectionné
 *     (le fichier français est volontairement toujours cassé) — le
 *     titre/avertissement s'affichent alors en français quand même.
 * @param {object} callbacks
 *   - onFin(codeLangueChoisie) — appelé une fois la pause finale écoulée
 */
function demarrerSequenceTelechargementLangue(idConteneur, options, callbacks) {
  options = options || {};
  callbacks = callbacks || {};

  const conteneur = document.getElementById(idConteneur);
  if (!conteneur) return;
  if (!window.KebBekBarreProgression) {
    console.warn('sequence-telechargement-langue : barre-progression.js doit être chargé avant.');
  }

  const langues = Array.isArray(options.langues) ? options.langues : [];
  const imageAtterrissage = typeof options.imageAtterrissage === 'string'
    ? options.imageAtterrissage : 'images/telechargement/televersement_bek_06.webp';
  const imageReception = typeof options.imageReception === 'string'
    ? options.imageReception : 'images/telechargement/televersement_bek_langue_01.webp';
  const delaiAvantPanneau = typeof options.delaiAvantPanneau === 'number' ? options.delaiAvantPanneau : 2000;
  const duree = typeof options.duree === 'number' ? options.duree : 2600;
  const pauseFin = typeof options.pauseFin === 'number' ? options.pauseFin : 1400;
  const langueInitiale = typeof options.langueInitiale === 'string' ? options.langueInitiale : 'en';

  conteneur.innerHTML =
    '<div class="stlg-scene" id="stlgScene">' +
      '<div class="stlg-fond-bek">' +
        '<img class="stlg-image-bek stlg-image-atterrissage" id="stlgImgAtterrissage" src="' + imageAtterrissage + '" alt="Bek">' +
        '<img class="stlg-image-bek stlg-image-reception" id="stlgImgReception" src="' + imageReception + '" alt="Bek">' +
        '<div class="stlg-faisceau" aria-hidden="true">' +
          '<span class="stlg-particule"></span>' +
          '<span class="stlg-particule"></span>' +
          '<span class="stlg-particule"></span>' +
          '<span class="stlg-particule"></span>' +
        '</div>' +
      '</div>' +
      '<div class="stlg-panneau stlg-panneau-cachee" id="stlgPanneau">' +
        '<p class="stlg-titre" id="stlgTitre">' + tTelechargementLangue(langueInitiale, 'titre') + '</p>' +
        '<div class="stlg-grille" id="stlgGrille"></div>' +
        '<div class="stlg-zone-bouton" id="stlgZoneBouton"></div>' +
      '</div>' +
      '<div class="stlg-zone-barre" id="stlgZoneBarre" hidden></div>' +
    '</div>';

  const scene = document.getElementById('stlgScene');
  const panneau = document.getElementById('stlgPanneau');
  const grille = document.getElementById('stlgGrille');
  const zoneBouton = document.getElementById('stlgZoneBouton');
  const zoneBarre = document.getElementById('stlgZoneBarre');
  const imgReception = document.getElementById('stlgImgReception');

  // ---------- 1-2. Bek atterrie, seule, pendant delaiAvantPanneau ----------
  let codeLangueChoisie = null;

  function creerFichierLangue(langue) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'stlg-fichier';
    el.dataset.code = langue.code;
    el.innerHTML =
      '<span class="stlg-fichier-badge" aria-hidden="true">' + langue.code.toUpperCase() + '</span>' +
      '<span class="stlg-fichier-natif">' + langue.natif + '</span>';
    el.addEventListener('click', function () { choisirFichier(langue.code, el); });
    return el;
  }

  function creerFichierFrancais() {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'stlg-fichier';
    el.dataset.code = 'fr';
    el.innerHTML =
      '<span class="stlg-fichier-badge" aria-hidden="true">FR</span>' +
      '<span class="stlg-fichier-natif">Français</span>' +
      '<span class="stlg-fichier-erreur" aria-live="polite">' + tTelechargementLangue('fr', 'erreurFrancais') + '</span>';
    el.addEventListener('click', function () {
      if (el.classList.contains('stlg-fichier-erreur-active')) return;
      el.classList.add('stlg-fichier-erreur-active');
      setTimeout(function () { el.classList.remove('stlg-fichier-erreur-active'); }, 2200);
    });
    return el;
  }

  langues.forEach(function (l) { grille.appendChild(creerFichierLangue(l)); });
  grille.appendChild(creerFichierFrancais());

  // 🆕 (27-09-2026) Présélection : si langueInitiale correspond à une vraie
  // langue de la grille (pas 'fr', toujours cassé exprès — voir
  // creerFichierFrancais), on la sélectionne et on affiche directement son
  // bouton de téléversement, SANS passer par l'avertissement (c'est déjà
  // la langue de l'élève, rien ne change). Repli sur rien de présélectionné
  // si langueInitiale est 'fr' ou absente de la liste.
  const elInitial = grille.querySelector('[data-code="' + langueInitiale + '"]');
  if (elInitial && langueInitiale !== 'fr') {
    selectionnerFichier(langueInitiale, elInitial);
  }

  // Sélectionne réellement un fichier (met à jour codeLangueChoisie, la
  // surbrillance, et le bouton de téléversement) — jamais appelée
  // directement pour un changement de langue, voir choisirFichier plus bas.
  function selectionnerFichier(codeLangue, elFichier) {
    codeLangueChoisie = codeLangue;
    grille.querySelectorAll('.stlg-fichier').forEach(function (el) {
      el.classList.toggle('stlg-fichier-selectionne', el === elFichier);
    });
    afficherBoutonTeleversement(codeLangue);
  }

  // 🆕 (27-09-2026, demande de Raphaël) Avertissement affiché UNIQUEMENT si
  // la langue cliquée diffère de langueInitiale (celle de la lettre) — pas
  // de la sélection courante : choisir une 2e langue différente après en
  // avoir déjà confirmé une 1re redemande quand même confirmation, chaque
  // fois, tant qu'on ne revient pas sur langueInitiale elle-même.
  function choisirFichier(codeLangue, elFichier) {
    if (codeLangue === codeLangueChoisie) return; // déjà sélectionnée, rien à faire
    if (codeLangue !== langueInitiale) {
      demanderConfirmationChangement(codeLangue, elFichier);
      return;
    }
    selectionnerFichier(codeLangue, elFichier);
  }

  function demanderConfirmationChangement(codeLangue, elFichier) {
    const langueInfo = langues.find(function (l) { return l.code === codeLangue; });
    const nomNatif = langueInfo ? langueInfo.natif : codeLangue.toUpperCase();
    const texte = tTelechargementLangue(langueInitiale, 'avertissement').replace('{langue}', nomNatif);
    zoneBouton.innerHTML =
      '<div class="stlg-bloc stlg-entree-cachee stlg-avertissement" id="stlgAvertissement">' +
        '<p class="stlg-avertissement-texte">' + texte + '</p>' +
        '<div class="stlg-avertissement-boutons">' +
          '<button type="button" class="stlg-btn-annuler" id="stlgBtnAnnulerChangement">' +
            tTelechargementLangue(langueInitiale, 'annuler') +
          '</button>' +
          '<button type="button" class="stlg-btn-confirmer" id="stlgBtnConfirmerChangement">' +
            tTelechargementLangue(langueInitiale, 'confirmer') +
          '</button>' +
        '</div>' +
      '</div>';
    requestAnimationFrame(function () {
      const bloc = document.getElementById('stlgAvertissement');
      if (bloc) setTimeout(function () { bloc.classList.remove('stlg-entree-cachee'); }, 30);
    });
    document.getElementById('stlgBtnConfirmerChangement').addEventListener('click', function () {
      selectionnerFichier(codeLangue, elFichier);
    });
    document.getElementById('stlgBtnAnnulerChangement').addEventListener('click', function () {
      // Retour à langueInitiale si elle était présélectionnable ; sinon
      // (ex. lettre lue en français) retour à l'état neutre de départ.
      const elRetour = grille.querySelector('[data-code="' + langueInitiale + '"]');
      if (elRetour && langueInitiale !== 'fr') {
        selectionnerFichier(langueInitiale, elRetour);
      } else {
        codeLangueChoisie = null;
        grille.querySelectorAll('.stlg-fichier').forEach(function (el) { el.classList.remove('stlg-fichier-selectionne'); });
        zoneBouton.innerHTML = '';
      }
    });
  }

  function afficherBoutonTeleversement(codeLangue) {
    zoneBouton.innerHTML =
      '<button type="button" class="stlg-bloc stlg-entree-cachee stlg-bouton-televerser" id="stlgBtnTeleverser">' +
        tTelechargementLangue(codeLangue, 'bouton') +
      '</button>';
    requestAnimationFrame(function () {
      const btn = document.getElementById('stlgBtnTeleverser');
      if (btn) {
        setTimeout(function () { btn.classList.remove('stlg-entree-cachee'); }, 30);
        btn.addEventListener('click', function () { lancerTeleversement(codeLangue); });
      }
    });
  }

  // ---------- 5-6. Panneau retiré, image de réception + barre + Réinitialisation ----------
  function lancerTeleversement(codeLangue) {
    console.debug('sequence-telechargement-langue : téléversement lancé pour', codeLangue);
    panneau.classList.add('stlg-panneau-cachee');
    setTimeout(function () {
      panneau.hidden = true;
      scene.classList.add('stlg-reception');
      zoneBarre.hidden = false;
      console.debug('sequence-telechargement-langue : image de réception + barre affichées');

      if (!window.KebBekBarreProgression) {
        setTimeout(terminerAvecReinitialisation, duree);
        return;
      }
      window.KebBekBarreProgression.demarrerBarreProgression('stlgZoneBarre', { cible: 100, duree: duree }, {
        onFin: terminerAvecReinitialisation
      });

      function terminerAvecReinitialisation() {
        scene.classList.add('stlg-fin-barre');
        zoneBarre.innerHTML = '<span class="stlg-bloc" style="font-weight:700; color:#FFF5E8;">' +
          tTelechargementLangue(codeLangue, 'reinitialisation') +
        '</span>';
        setTimeout(function () {
          if (typeof callbacks.onFin === 'function') callbacks.onFin(codeLangue);
        }, pauseFin);
      }
    }, 360); // doit correspondre à la transition CSS de .stlg-panneau
  }

  // ---------- Démarrage : préchargement des deux images, puis pause, puis panneau ----------
  function precharger(src) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = resolve;
      img.onerror = function () { console.warn('sequence-telechargement-langue : image introuvable →', src); resolve(); };
      img.src = src;
    });
  }
  Promise.all([precharger(imageAtterrissage), precharger(imageReception)]).then(function () {
    scene.classList.add('stlg-prete');
    setTimeout(function () {
      panneau.hidden = false;
      requestAnimationFrame(function () { panneau.classList.remove('stlg-panneau-cachee'); });
    }, delaiAvantPanneau);
  });
}

window.KebBekTelechargementLangue = { demarrerSequenceTelechargementLangue };
