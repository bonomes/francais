# Jeu Bravo — Synthèse des mécaniques (v7)

> **Nature de ce document : compilation.** Ce fichier vise à réunir, en un seul endroit autonome, l'ensemble des décisions de conception discutées jusqu'ici. Il ne fait allusion à aucune version antérieure et ne suppose pas que le lecteur en ait vu une.
>
> **Règles de mise à jour, à respecter à chaque nouvelle session :**
> 1. Aucune information pertinente n'est jamais supprimée d'une mise à jour à l'autre — elle est **reprise intégralement** dans la nouvelle version, pas résumée ni renvoyée à un document précédent.
> 2. La **seule section qui peut être librement réécrite** est « Prochaine étape » (dernière section) : les items complétés en sortent, les nouveaux y entrent.
> 3. Si une décision plus récente **entre en conflit** avec une information existante (ex. un nom de table changé, une règle révisée), l'ancienne information n'est **pas laissée telle quelle** à son emplacement d'origine ; le conflit est réglé sur place et, si utile pour comprendre l'historique de la décision, une courte note de résolution est ajoutée (« anciennement appelé X, renommé Y pour telle raison »).
> 4. Toute nouvelle décision est ajoutée à la section pertinente existante plutôt que reléguée dans une liste de changements séparée — ce document décrit l'état actuel du jeu, pas son historique de versions.

## 1. Concept général

Bravo est un jeu de cartes à développer, jeu par tour dans l'esprit de Yu-Gi-Oh / Magic: The Gathering, mais joué sur un échiquier plus grand que les jeux habituels de ce type. Le jeu serait en ligne — jugé la meilleure option étant donné la diversité des valeurs à gérer (visibilité des cartes, points multiples, transferts, etc.).

**Ancrage narratif** : dans la fiction de l'univers Keb & Bek, c'est Keb qui a inventé le jeu pour jouer avec Bek, en s'inspirant de l'univers de Nagar et de son propre intérêt pour les jeux de cartes. Bek s'occupait des dessins — un projet à deux. Dans l'univers de Nagar, les personnages (dont une héroïne) défendent des endroits contre des envahisseurs ; ces personnages oniriques sont assimilés à des anges gardiens du monde réel — gardiens des pensées, de la nature, etc.

**Objectif pédagogique** : permettre aux élèves d'apprendre et de pratiquer le français tout en jouant avec de véritables éléments de stratégie.

## 2. Déblocage et acquisition des cartes

**Deux mécanismes distincts, gardés séparés :**

- **Conditions « site interne »** (clics, découvertes, mystères, ex. : cliquer sur le sandwich dans d1) → enregistrées directement dans le profil Supabase de l'élève (table `conditions_completees`), lues par la page bravo de la carte visée. Aucun code généré, aucun passage par le sac — ces conditions n'ont rien à protéger contre le partage ou la revente.
- **Verrou prof** (mot de passe à usage unique, lié au compte courriel) → réservé aux cartes qui doivent inciter à prendre des cours privés. L'élève fournit son code au professeur, qui génère sur demande un mot de passe à usage unique, associé au compte courriel unique de l'élève ; ce lien au compte empêche la revente ou le partage du code. Le code affiché à l'élève, s'il y a lieu, se génère au moment voulu à partir de l'état du profil — il n'est jamais accumulé condition par condition dans le sac.

**Boucle d'acquisition :**
1. Conditions remplies → constatées dans le profil (par défaut, trois conditions pour une carte bronze, sauf indication contraire — à préciser au cas par cas).
2. Paiement en P$/PB.
3. **Étape ultime** : évaluation (français, lore, ou les deux) → détermine à la fois l'obtention de la carte et sa **variante** (voir section 3), selon trois seuils de notation.

P$ et PB s'accumulent séparément : activités, connexion quotidienne, succès débloqués. Les succès peuvent donner des P$, des PB, des codes (avec ou sans mot de passe), ou un mélange des trois.

**Échange de cartes :** mécanisme d'échange entre élèves envisagé (à concevoir — transfert de propriété en base, pas un simple partage de code). Limite de quantité possédable par carte — parfois une seule copie pour les cartes uniques.

## 3. Rareté, variante, et types de cartes

**Rareté** — cinq niveaux (six valeurs), indiquée par un médaillon dans le coin supérieur droit de l'image, en ordre croissant :
`bronze → argent → or → vert → violet → blanc` (carte unique ou ultra-limitée)

Code toujours l'**exclusivité d'acquisition** d'une carte. Reste la seule valeur lue par les règles de compatibilité combattant/équipement (« même grade ou inférieur »).

**Variante** — axe séparé, orthogonal à la rareté. Une carte donnée (ex. « Le sandwich de Ginette », bronze) peut exister en **cinq paliers de qualité** : `standard`, `supérieure` (lettrage dégradé argenté), `suprême` (lettrage dégradé doré, bordure holographique), `brillante` (dégradé doré, effet holographique sur toute la surface de la carte, pas seulement la bordure), et `unique` (illustration alternative, exemplaires strictement limités en circulation). La variante :
- ne change jamais la rareté ni la compatibilité d'équipement ;
- pour les trois premiers paliers, se décide à l'étape ultime (évaluation) selon **trois seuils de notation** : note suffisante → standard, très bonne → supérieure, excellente → suprême ;
- les deux paliers au-delà du suprême (`brillante`, `unique`) ne sont **pas** systématiques — réservés à certaines cartes seulement, jamais une règle automatique — et s'obtiennent par note excellente + une condition additionnelle + une touche de hasard. **Principe de conception retenu** : le hasard n'offre jamais qu'un bonus par rapport à la note méritée, il ne peut jamais faire perdre un palier déjà acquis par le mérite — la note excellente et la condition additionnelle garantissent au minimum le palier suprême ; le tirage au hasard ne décide que de l'accès à un palier encore plus rare, jamais d'un recul ;
- se signale visuellement par le lettrage du nom (dégradé argenté/doré selon le palier), par une bordure holographique au suprême, et par un effet holographique couvrant toute la carte au palier brillante — sans toucher au médaillon de rareté ni au reste du gabarit ;
- ne concerne pas nécessairement toutes les cartes — beaucoup resteront disponibles en standard seulement ;
- n'a pas de bonification automatique selon un pourcentage fixe — chaque carte est ajustée à la main, au cas par cas (voir les repères indicatifs en section 5). Tendance retenue : un gain décroissant d'un palier à l'autre plutôt qu'un taux constant, pour qu'une carte bronze, même à son palier le plus élevé, ne rivalise jamais en puissance avec une carte dédiée de rareté supérieure — la rareté des paliers `brillante` et surtout `unique` doit venir principalement de la rareté d'obtention et de la valeur de collection, pas d'un écart de puissance disproportionné.

**Palier `unique`** — le plus rare : illustration alternative (pas seulement un traitement du lettrage), exemplaires strictement plafonnés en circulation (ex. 5 au total pour une carte donnée). Nécessitera un plafond de quantité formalisé dans le schéma (section 16), pas encore en place. Ce palier peut aussi porter un effet conditionnel propre à son illustration — ex. pour une éventuelle version « unique » du sandwich de Ginette montrant Keb en train de le manger, un bonus supplémentaire si le personnage-joueur en jeu est justement Keb. Idée à concevoir en détail au moment de produire cette carte précise ; le format `effet.parametres` (section 16) ne supporte pas encore ce genre de condition liée au personnage-joueur.

**Édition** — axe distinct de la variante, voir section 4.

**Types de cartes :**

| Type | Description |
|---|---|
| **Joueur** | Prédisposée en début de partie (pas piochée). Attributs propres qui influencent le déroulement du jeu. Ex. : « Keb - Bonome » standard fait avancer les combattants de deux cases en sortant de la base ; des cartes de Bek augmentent le PD des combattants dans la base, ou les PV de la base. |
| **Vêtement** | Rattachée à la carte joueur, prédisposée dès le début de la partie. |
| **Base** | Peut représenter toute sorte de lieu (ex. une chambre à coucher) ; contient un maximum de cinq objets en début de partie. |
| **Héros** | Combattant prédisposé d'office, jouable immédiatement sur l'échiquier. |
| **Équipement** | Pour les combattants (voir section 6, transport). |
| **Consommable** | Nourriture, potions, ou tout autre objet à effet immédiat, unique, puis défaussé — par opposition à l'équipement qui reste en jeu. Ex. : « Le sandwich de Ginette » (bronze, PC 1, effet : redonne des PV à un combattant). |
| **Terrain** | Jouée sur l'échiquier, bénéficie ou nuit aux combattants qui s'y trouvent (voir section 7). |

## 4. Format visuel des cartes

**Format physique** : format classique des cartes de jeu (standard poker/TCG, ~63×88 mm).

**Recto vs verso :**
- Pas de verso neutre/caché : les deux faces sont utilisées.
- **Recto** : image + gabarit visuel — nom, médaillon de rareté (avec le PC inscrit dedans), grand espace image.
- **Verso** : description narrative + effet, en champs de données (voir section 16) plutôt qu'en image — modifiable sans repasser par la production graphique.

**Principe directeur** : le médaillon de rareté n'est qu'un symbole dans le coin supérieur droit — pas une bordure métallique complète. L'ensemble du gabarit reste sobre (trait fin, fond crème uni).

**Gabarit universel (toute carte)** — deux espaces :
1. **Bande supérieure** : nom de la carte + médaillon de rareté, dans lequel est inscrit le **PC** (économie d'espace, puisque le PC concerne toutes les cartes, contrairement à PA/PD/PV/PE qui ne concernent que les combattants).
2. **Zone image** : grand espace réservé au dessin.

**Bande combattant** (ajoutée manuellement au bas des cartes combattants uniquement) : quatre cases délimitées (libellé + espace de valeur, une par PV/PA/PD/PE) — cohérence visuelle avec le reste du gabarit plutôt qu'une bande continue sans division. Génération encore à produire (voir « Prochaine étape »).

**Typographie retenue** : **Lora Medium** — bon compromis entre caractère et sobriété, sans la rondeur BD écartée plus tôt. (À reconfirmer une fois : le poids affiché lors du premier essai ressemblait un peu à SemiBold/Bold — vérifier que la bonne variante est bien chargée pour la cohérence des prochaines cartes.)

**Production** :
1. Générer par IA le gabarit vide (voir invite ci-dessous) et, séparément, l'illustration de chaque carte.
2. Superposer manuellement dans GIMP le gabarit par-dessus l'illustration, cadrer.
3. Le fichier « projet » de chaque carte (avant aplatissement) est conservé — produire une variante supérieure = régénérer uniquement le lettrage du nom (dégradé argenté/doré) via IA, puis recomposer : quelques minutes par variante, pas une nouvelle production complète.

Sur Supabase, seules les valeurs essentielles et le code de chaque carte sont entreposés — l'image est téléchargeable ailleurs, à partir de Bravo. Première carte complète produite : « Le sandwich de Ginette » (Consommable, bronze, PC 1).

**Invite de génération** (gabarit universel, à réutiliser en changeant seulement la palette de couleurs pour chaque niveau de rareté — utile pour produire les gabarits des paliers non encore générés, et pour la bande combattant à venir) :

> *Gabarit vide de carte à jouer collectionnable, format classique de carte de jeu (ratio 2,5:3,5, portrait), style sobre et minimaliste. Un simple trait fin uni délimite le contour, coins légèrement arrondis. À l'intérieur, exactement deux zones séparées par une fine ligne horizontale : (1) une bande supérieure avec un espace vide pour le nom à gauche et un médaillon circulaire sobre en bronze/cuivre (vide, sans gravure) dans le coin supérieur droit ; (2) une grande zone image vide occupant le reste de la carte. Aucun texte, aucun chiffre, aucune bordure ornementale épaisse, aucune troisième zone. Style plat, vectoriel simple, palette crème/blanc cassé avec le médaillon en bronze/cuivre comme seule touche de couleur.*

Le gabarit bronze de base a déjà été généré et validé à partir de cette invite (style sobre, trait fin, fond crème, médaillon avec léger dégradé) ; il sert de référence stylistique pour tous les éléments graphiques subséquents, dont la bande combattant et les autres paliers de rareté (mêmes proportions, palette de couleur changée selon le niveau).

**Leçon retenue sur les invites de retouche** : le générateur d'images (Gemini) ignore le contenu d'une invite antérieure et ne se souvient pas d'une autre image déjà générée — chaque invite de retouche doit être autonome, formulée par rapport à l'image de base fournie en entrée (pas besoin de la redécrire en entier), en énonçant concrètement ce qui doit être retouché et ce qui doit rester identique. Ne jamais écrire « comme la version précédente » si cette version n'est pas l'image fournie en entrée.

**Invites finales validées — « Le sandwich de Ginette », paliers 3 à 5** (à partir de l'image de la carte bronze de base, ou de l'illustration alternative pour le palier 5) :

*Palier 3 — suprême (or), bordure holographique discrète :*
> *À partir du gabarit existant de la carte « Le sandwich de Ginette » (bronze), régénère la bande supérieure avec un traitement métallique brossé doré (dégradé de teintes or claire sur le fond de la bande et sur le lettrage du nom « Le sandwich de Ginette »), même police (Lora Medium), même taille, même position. Le médaillon de rareté reste inchangé (bronze/cuivre, identique à toutes les versions). Ajoute également un effet de bordure holographique fine tout autour du contour extérieur de la carte (reflet subtil arc-en-ciel/iridescent sur le trait de contour, sans toucher à l'illustration ni au fond crème du reste du gabarit). Illustration et bande "Consommable" en bas identiques à l'original.*

*Palier 4 — brillante (or, holo pleine carte) :*
> *À partir de cette image, retouche uniquement les éléments suivants :*
> *— Bande supérieure : remplace le fond et le lettrage actuels du nom « Le sandwich de Ginette » par un traitement métallique brossé doré (dégradé de teintes or), avec un reflet lumineux traversant la bande et le lettrage (doré reluisant), comme une surface métallique polie qui capte la lumière.*
> *— Sur toute la surface visible de la carte, y compris l'illustration du sandwich, ajoute un effet holographique irisé (reflets subtils arc-en-ciel qui semblent changer selon l'angle de vue), assez présent pour recouvrir toute la carte, sans pour autant masquer les détails de l'illustration en dessous.*
> *Ne change rien d'autre : le médaillon circulaire bronze/cuivre avec le chiffre « 1 » reste identique, l'illustration (sandwich, assiette, table, objets en arrière-plan) reste la même, la bande inférieure « Consommable » reste identique, le contour et les coins arrondis de la carte restent identiques.*
> **Ajustement retenu pour la prochaine régénération** : le mot « Consommable » de la bande inférieure devrait lui aussi recevoir le même traitement doré reluisant (pas laissé en noir comme dans la première version produite).

*Palier 5 — unique (illustration alternative, lumière + symbole, sans traitement métallique) :*
> *À partir de cette image, retouche uniquement les éléments suivants :*
> *— Éclairage de la scène : remplace la lumière neutre actuelle de la cuisine par une lumière chaude et dorée de fin de journée (golden hour) — comme si le soleil couchant entrait par la fenêtre. Rendu magnifique pour accentuer l'unicité de la carte. Le sujet (Keb mangeant le sandwich) et la composition restent identiques, seule l'ambiance lumineuse change.*
> *— Ajoute une petite étoile simple et discrète (contour fin, une seule, pas dorée ni scintillante) dans un coin discret de la carte — dans le coin inférieur gauche de l'image — assez petite pour ne pas attirer l'attention en premier, mais visible à qui la cherche.*
> *Ne change rien d'autre : le médaillon circulaire bronze/cuivre avec le chiffre « 1 » reste identique, la composition et les personnages restent les mêmes, la bande supérieure et le nom « Le sandwich de Ginette » restent en lettrage noir simple (pas de traitement doré/argenté — le palier unique ne suit pas la progression métallique des autres paliers), la bande inférieure « Consommable » reste identique.*

Les deux images (palier 3 et palier 4) confirment déjà visuellement le principe retenu en section 3 : médaillon bronze/cuivre invariant à tous les paliers, seule la bande/le lettrage et l'ampleur de l'effet holographique progressent.

**Édition — axe distinct de la variante** : le gabarit visuel actuel constitue une première édition. Si une édition future redessine le gabarit ou la présentation des paliers (ex. une deuxième édition mieux réussie visuellement), les cartes déjà produites sous une édition antérieure **ne sont jamais retirées ni re-stylées rétroactivement** pour s'aligner sur la nouvelle présentation — elles demeurent valides telles quelles, comme témoins de leur édition d'origine. Ceci concerne uniquement l'**apparence** (le gabarit, l'image) : les valeurs de jeu (`effet`/`parametres`, section 16) continuent de suivre le principe habituel de rééquilibrage automatique — un rééquilibrage futur s'applique normalement aux cartes de toutes les éditions, seule l'image/le template reste figé par édition. Un champ `edition` n'est pas encore formalisé dans le schéma (section 16) — à ajouter le moment venu.

## 5. Combattants — valeurs essentielles

| Valeur | Signification |
|---|---|
| **PV** (points de vigueur) | Perdre tous ses PV = tomber dans le sommeil. Attaquer coûte des PV de base à l'attaquant ; se déplacer en coûte aussi (distinct du PC — voir section 10). Se reposer restaure des PV. |
| **PA** (points d'attaque) | Valeur offensive. |
| **PD** (points de défense) | Dégât subi par le défenseur = PA de l'attaquant − PD du défenseur. |
| **PC** (points de commande) | Coût pour toute action — déplacer, attaquer, mettre en jeu. *(Anciennement appelés « points d'énergie » dans une formulation antérieure ; le terme PC a été retenu pour éviter la confusion avec PE.)* |
| **PE** (points d'expérience) | Cédés à la carte qui vainc ce combattant. Permet de monter de niveau et de remplacer la carte par celle du niveau suivant si l'élève la possède. |

**Échelle retenue** : unités et dizaines (ex. PV 5-30, PA 1-10), plutôt que des milliers comme Yu-Gi-Oh. Avantages : calcul mental simple pour un jeune public (renforce même le vocabulaire numérique en français pendant le jeu), différenciation déjà assurée par les cinq niveaux de rareté, marge de manœuvre pour de futures extensions sans « power creep » immédiat.

### 5.1 Valeurs de référence par rareté (combattants)

Point de départ chiffré, à ajuster carte par carte selon ce qui a du sens narrativement — pas une formule rigide, un **repère** pour ne pas partir de zéro à chaque nouvelle carte.

| Rareté | PV | PA | PD | PC (mise en jeu) | PE cédé si vaincu |
|---|---|---|---|---|---|
| Bronze | 8–12 | 2–3 | 1–2 | 1 | 1 |
| Argent | 12–16 | 3–4 | 2–3 | 1–2 | 2 |
| Or | 16–20 | 4–5 | 3–4 | 2 | 3 |
| Vert | 20–24 | 5–6 | 4–5 | 2–3 | 4 |
| Violet | 24–28 | 6–8 | 5–6 | 3 | 5 |
| Blanc | 28–30 | 8–10 | 6–7 | 3–4 | 6–8 |

Logique derrière ces chiffres : une progression douce (pas de saut brutal entre paliers), un ratio PA/PD qui laisse toujours un peu de dégât net dans un combat entre cartes de même rareté (donc des combats à plusieurs échanges, pas réglés en un coup), et un pool de PV qui permet à un combattant bronze d'encaisser 3 à 5 attaques adverses avant de s'endormir.

**Repère de cohérence avec le coût de déplacement (section 10)** : à 1 PV par case franchie (valeur par défaut), traverser les cinq cases séparant la base du joueur de la forteresse adverse (section 15) coûte 5 PV — environ la moitié du pool bronze. Ça laisse une marge suffisante pour au moins un échange de combat sans que la seule traversée du plateau suffise à endormir un combattant bronze, tout en rendant le repos et le repli à la forteresse (section 10) des choix réels plutôt que des détails.

**PD comme levier d'archétype, PV comme vitalité brute** : à l'intérieur d'une même rareté, ce n'est pas nécessairement le PV qui doit varier pour distinguer un combattant entraîné d'une créature sans défense — c'est surtout le **PD**. Un coup est fatal en un seul échange dès que PV du défenseur ≤ PA de l'attaquant − PD du défenseur ; avec un PD proche de 0, presque tout le PA de l'attaquant passe en dégât brut, peu importe que le PV du défenseur soit par ailleurs « raisonnable » pour une créature vivante — ça permet des combats à une seule frappe, réalistes et volontairement rapides, sans contredire la logique d'échanges multiples entre deux vrais combattants du repère plus haut.

*Exemple illustratif (carte fictive, pour calibrer l'intuition — pas une carte prévue au jeu)* : un « soldat ordinaire » bronze (PV 10, PA 3, PD 2) affronte une « poule » bronze (PV 3, PA 1, PD 0). Dégât infligé par le soldat : 3 − 0 = 3 ≥ 3 PV → la poule meurt immédiatement, comme attendu d'un combat aussi asymétrique. Une contre-attaque de la poule (1 − 2 = 0 dégât net) rebondit sans effet sur l'armure du soldat.

Le **PE reste une valeur indépendante, fixée directement sur chaque carte** — pas dérivée automatiquement du déroulement du combat, cohérent avec le principe qu'aucune valeur n'est calculée par une formule rigide, tout est ajusté à la main (section 3). Une créature sans défense comme la poule de l'exemple recevrait tout naturellement un PE bas, voire nul, simplement parce que c'est le choix qui a du sens pour cette carte-là, pas parce qu'une règle générale l'impose.

### 5.2 Valeurs de référence par rareté (consommables)

Basé sur « Le sandwich de Ginette » (bronze, PC 1, soin) comme premier étalon.

| Rareté | PC | Effet (ordre de grandeur) |
|---|---|---|
| Bronze | 1 | Soin ~8–10 PV, ou effet équivalent |
| Argent | 1 | Soin ~11–14 PV |
| Or | 1–2 | Soin ~14–18 PV |
| Vert | 2 | Soin ~18–22 PV, ou effet double (ex. soin + petit buff court) |
| Violet | 2 | Effet fort ou combiné |
| Blanc | 2–3 | Effet exceptionnel, carte à part |

**Cinq paliers de « Le sandwich de Ginette »** (calibré sur un combattant-repère de 15 PV, indépendamment de la rareté du combattant qui le consomme) :

| Palier | PV rendus | % d'une jauge de 15 |
|---|---|---|
| Standard | 7 | ~47 % |
| Supérieure (argentée) | 9 | ~60 % |
| Suprême (dorée) | 10 | ~67 % |
| Brillante (dorée, holo pleine carte) | 11 | ~73 % |
| Unique (illustration alternative, ≤5 exemplaires) | 11 ou 12* | ~73–80 % |

\* Palier `unique` pas encore finalisé — piste envisagée : une illustration alternative montrant Keb en train de manger le sandwich, avec un bonus (11 → 12) si le personnage-joueur en jeu est justement Keb. Carte à concevoir en détail plus tard (voir « Prochaine étape »).

Repère de conception qui s'en dégage (voir section 3) : le gain d'un palier à l'autre décroît en valeur absolue plutôt que de suivre un pourcentage fixe — pas de règle automatique, mais un plafond volontairement modeste même aux paliers les plus élevés pour une carte bronze ; la rareté des deux derniers paliers vient surtout de la difficulté d'obtention et de la valeur de collection, pas d'un écart de puissance disproportionné.

*Note ouverte* : le combattant-repère de 15 PV utilisé pour ce calibrage est traité comme un repère générique de calibration (le sandwich pouvant être consommé par un combattant de n'importe quelle rareté), distinct de la fourchette bronze de la table 5.1 (8–12 PV) — à confirmer si ce repère devrait plutôt faire remonter cette fourchette.

**Règles de combat :**
- Dégât standard : PA attaquant − PD défenseur, déduit des PV du défenseur.
- Si PA attaquant < PD défenseur, la différence (PD − PA) est infligée en retour sur les PV de l'**attaquant**, si c'est une attaque physique.
- Chaque attaque coûte des PV à l'attaquant, de base.
- Attaques à distance possibles ; certaines cartes possèdent une riposte automatique en cas de contact (mêlée), qui coûte des PV à l'attaquant initial — un trait propre à la carte défenseure, pas une règle universelle du corps-à-corps.
- Certains monstres infligent un minimum garanti de PV perdus, peu importe le rapport PA/PD.
- Certains équipements donnent une attaque à distance à des cartes qui n'en ont normalement pas.

### 5.3 Coup critique (optionnel, par carte)

- Certaines cartes (pas toutes) peuvent porter un **coup critique** : au moment de l'attaque, un lancer d'**un ou deux dés** (choix propre à la carte) détermine un résultat spécial.
- **Coup critique** (double de l'attaque normale) si le résultat atteint ou dépasse un **seuil haut** propre à la carte.
- **Attaque affaiblie** (carte plus vulnérable) si le résultat est égal ou inférieur à un **seuil bas** propre à la carte.
- **Principe de conception** : ni les dés (un ou deux) ni les seuils ne sont fixés d'avance pour toutes les cartes — chaque carte définit ses propres valeurs, cohérent avec le principe général de la section 3 (rien n'est calculé par une formule rigide, tout est ajusté à la main). Une carte puissante et rare peut ainsi avoir un seuil haut plus facile à atteindre qu'un seuil bas (plus de chances de critique que de faiblesse), et une carte plus faible l'inverse — l'asymétrie entre les deux probabilités est un levier d'équilibrage volontaire, pas une erreur à corriger.
- Techniquement : nouveau `type` `coup_critique` dans `effet.parametres` (voir section 16) — `des` (1 ou 2), `seuil_critique`, `seuil_faible`.

## 6. Forteresse, transport d'équipement, et objets par défaut

- La **forteresse** (du monde de Nagar) se trouve de part et d'autre de l'échiquier. Les combattants peuvent s'y retrancher pour augmenter leur PD et leur PA. Capacité maximale : deux combattants à la fois.
- **Équipement et transport** : un équipement ne peut être *donné* qu'à un combattant près de la forteresse, puis *transféré* à un autre combattant (rapidement si le « transporteur » se déplace vite).
- **Cartes trésor** : certaines cartes terrain simulent la découverte d'un trésor ; jouer « découverte d'un trésor » permet de jouer *et* équiper la carte équipement de façon concomitante.
- **Objet par défaut (« caché »)** : certaines cartes combattants transportent par défaut un objet de leur propre rareté (ex. un « Soldat simple » bronze transporte un objet bronze de PC 1), utilisable/consommable **sans dépenser de PC**, peu importe où le combattant se trouve — même sans transport physique jusqu'à la forteresse. Indiqué au **verso** (effet spécial), plutôt qu'un symbole sur le devant, pour préserver l'effet de surprise à la découverte et rester cohérent avec le principe que le verso porte les effets spéciaux.

## 7. Terrain, objets au sol, et pièges

- Cartes terrain jouables sur l'échiquier, bénéficiant ou nuisant aux combattants qui s'y trouvent ; chaque joueur en dispose de deux ou trois à sa guise, placées avant le début de la partie.
- Un objet/équipement peut être laissé sur le terrain pour être récupéré plus tard — par n'importe quel joueur, y compris l'adversaire.
- **Pièges** : au lieu (ou en plus) d'objets de valeur, une carte laissée au sol peut être un piège. L'adversaire choisit, à ses risques : la ramasser (objet précieux ou piège), ou la détruire sans la regarder.

## 8. Zones de cartes : main, entrepôt, terrain

- **Main** : zone la plus exposée — vulnérable aux cartes « effet » adverses (ex. destruction/vol de cartes en main).
- **Limite de main** : 7 cartes par défaut. Si la main est pleine et que la carte piochée n'est **pas** une carte objet, une carte doit être remise sous le paquet — un **« renvoi »**, choisi par le joueur (pas automatique). *Image : comme un général qui renvoie un soldat chez lui faute d'espace pour l'accueillir.* Certaines cartes effet permettront de dépasser cette limite par défaut.
- **Entrepôt** : zone de réserve pour les cartes objets uniquement, dans laquelle on peut piger à son tour. Protection supérieure à la main, mais récupérer une carte coûte 1 PC, et une carte de l'entrepôt ne peut pas être jouée pendant le tour adverse.
- Cohérence du système : les cartes objets ont toujours une soupape (main → entrepôt) qui leur évite de déclencher un renvoi ; tous les autres types de cartes n'ont que le renvoi comme soupape en cas de main pleine.

## 9. Le sommeil (cimetière)

- Les combattants ne « meurent » pas : ils **s'endorment**. C'est le « cimetière » du jeu.
- Un combattant endormi peut se réveiller et retourner soit dans le paquet de l'éveil, soit dans la main.
- **Symbolisme** : illustre le fait qu'une tentation vaincue dans la vraie vie peut revenir — il faut veiller au grain. Le « renvoi » (section 8) suit la même logique douce : rien n'est jamais perdu, seulement retardé.
- La victoire/défaite symbolise, dans la fiction, si les personnages font de beaux ou de mauvais rêves.
- Un réveil qui fait sortir une carte fait rétrocéder le processus de victoire défensive (recul), mais ne l'interrompt pas.

## 10. Points de commande (PC) — économie d'action

- Les PC servent à toute action : déplacer, attaquer, mettre en jeu.
- Coût normal : 1 PC par action. Certaines cartes puissantes exigent plus d'1 PC. Des cartes peuvent réduire le PC requis, jamais en dessous de 1.
- **Déplacement — coût PC vs coût PV, deux compteurs séparés** : une commande de déplacement coûte toujours **1 PC**, peu importe la distance parcourue par cette commande. Le coût en **PV** est distinct et propre à chaque unité — **1 PV par case franchie** par défaut. Certaines cartes peuvent, via un effet spécial, franchir plus d'une case par commande de déplacement, à un coût PV plus élevé par case (l'exploit de vitesse épuise davantage) — jamais une règle universelle, un effet à concevoir carte par carte. Voir section 5.1 pour le repère de cohérence entre ce coût et la taille du plateau.
- **Unités « de choc »** : certaines cartes combattantes permettent, pour un coût total de **1 PC** (plutôt que 3 : 1 par avance, 1 par attaque, 1 par retrait), d'avancer d'une case, d'attaquer, puis de se retirer d'une case. Le coût en PV de ces trois actions suit son tarif normal (voir ci-dessus), la remise ne porte que sur le PC. Aucune règle d'exemption spéciale n'est nécessaire pour la riposte (section 5) : puisque l'unité n'est plus au contact après son retrait, un adversaire qui veut riposter doit d'abord avancer (1 PC, avec le risque de mettre le pied sur un piège — section 7) puis attaquer (1 PC) — la fuite ne rend donc pas la riposte impossible, elle la rend simplement plus coûteuse et plus risquée pour le poursuivant.
- Les PC s'accumulent à raison de 2 par tour (modifiable par certains attributs).
- **Rappel** : ramener une carte à la forteresse récupère la moitié de ses PC par défaut ; la carte retourne en main (pas de sacrifice). Aucun bonus automatique au-delà du coût initial — un surplus ne peut venir que d'une conversion de PE (la carte doit avoir combattu et vaincu).

## 11. Visibilité et brouillard de guerre

- Les cartes en jeu sont cachées tant qu'elles ne sont pas à portée de vue : deux cases devant, deux cases de côté, ou une case en diagonale (sauf attribut qui permet de voir plus loin). Certaines cartes terrain permettent aussi de demeurer caché.

## 12. Bonus d'élimination et équilibrage

- Éliminer 5 ennemis (pas nécessairement de suite) donne 1 ou 2 PC de plus par tour — bonus **permanent et cumulatif**, se répétant à chaque tranche de 5 éliminations.
- Conséquence : il n'est pas avantageux de simplement « bloquer » avec des cartes faibles.
- **Contrepoids d'équilibrage** : un joueur qui bloque peut accumuler des PC pour poser une carte très puissante et rattraper son désavantage rapidement. Chaque stratégie est une lame à double tranchant — le jeu se joue dans le timing.

## 13. Pioche

- Une carte par tour (modifiable par certains attributs).

## 14. Conditions de victoire

| Type | Condition |
|---|---|
| **Offensive** | Faire perdre tous les PV de la base adverse et y pénétrer. |
| **Défensive** | Éliminer, sans riposte, cinq ennemis ou plus totalisant 50 PV, de façon ininterrompue (un réveil fait rétrocéder mais n'interrompt pas). |

## 15. Échiquier

- Étendue variable ; forme standard = 5 cases × 5 cases.
- Attaque standard : devant ou à côté, pas obliquement ; certaines cartes permettent d'attaquer obliquement ou à distance de deux cases et plus.
- Sur un plateau standard, un combattant doit franchir **cinq cases** pour atteindre la forteresse adverse depuis sa position de départ — ce nombre sert de référence pour calibrer le coût en PV du déplacement (section 10) et les pools de PV par rareté (section 5.1).

## 16. Schéma de données — cartes, variantes, effets

**Statut** : déployé sur Supabase (projet Bravo), introspecté et confirmé sur la base réelle — pas un schéma planifié. *(Note de résolution : les tables avaient d'abord été planifiées sous les noms `cartes` / `cartes_variantes` / `cartes_possedees` ; au moment du déploiement réel, elles ont été mises en place sous les noms `objets` / `objets_variantes` / `inventaire`, ci-dessous, qui sont les noms à jour.)*

**Principe** : une carte possédée par un élève ne stocke jamais ses propres valeurs de jeu ; elle pointe vers la définition de la carte (et sa variante, s'il y a lieu), qui restent la seule source de vérité. Un rééquilibrage plus tard se répercute automatiquement sur tous les exemplaires déjà possédés.

- **`objets`** (catalogue, palier standard) : `id`, `nom`, `type`, `rarete`, `prix_piasses`, `prix_points_bonis`, `image`, `effet` (jsonb), `variante`, `description_narrative`. Lecture publique (RLS).
- **`objets_variantes`** (une ligne par palier au-dessus du standard) : `objet_id`, `variante`, `effet` (jsonb), `image`. Lecture publique (RLS).
- **`inventaire`** (par élève) : `id`, `eleve_id`, `objet_id`, `source`, `obtenu_le`, `variante`.
- **`codes`** (verrou prof, section 2) : `id`, `code`, `objet_id`, `source`, `utilise_le`, `eleve_id_utilise`.
- **`conditions_completees`** (par élève, micro-conditions de déblocage — section 2) : `eleve_id`, `condition_id`, `complete_le`. Écriture via la fonction `marquer_condition_complete` (garde d'appartenance + idempotence).

**`effet`** (jsonb sur `objets`/`objets_variantes`) — format générique, lisible par le moteur, commun à tous les types de cartes :
```json
{
  "texte": "Redonne des PV à un combattant",
  "parametres": {
    "type": "soin",
    "cible": "combattant_choisi",
    "valeur": 10,
    "duree": null
  }
}
```
- `texte` : la phrase lisible par l'élève, ajustable indépendamment de `parametres` — le moteur lit `parametres`, l'élève lit `texte`.
- `parametres.type` : action à exécuter (`soin`, `degats`, `buff`, `debuff`, `invocation`, `piege`, ...) — enum enrichi au besoin, carte par carte, jamais fixé à l'avance dans son ensemble.
- `parametres.cible` : qui reçoit l'effet (`soi`, `combattant_choisi`, `tous_allies`, `zone`, ...).
- `parametres.valeur` : le nombre brut — c'est ce qui change entre `objets.effet` (standard) et `objets_variantes.effet` (palier supérieur).
- `parametres.duree` : `null` pour un effet immédiat unique (ex. consommable), ou un nombre de tours pour un effet qui persiste.
- `parametres.stat` : pour un `type` `buff`/`debuff`, précise quelle statistique est modifiée (`PV`, `PA`, `PD`, `PC`).

**Effets combinés** : `effet.parametres` peut être **soit un objet unique** (cartes simples, comme les exemples ci-dessus), **soit une liste d'objets** quand plusieurs effets se déclenchent ensemble sur la même carte — rétrocompatible, rien à changer pour les cartes déjà définies avec un objet seul.

*Exemple — attaque spéciale d'un dragon (dégâts + auto-affaiblissement)* :
```json
{
  "texte": "Souffle dévastateur — inflige de lourds dégâts, mais expose le dragon pendant 2 tours",
  "parametres": [
    {"type": "degats", "cible": "adversaire_choisi", "valeur": 8, "duree": null},
    {"type": "debuff", "cible": "soi", "stat": "PD", "valeur": -2, "duree": 2}
  ]
}
```

*Extension envisagée, pas encore implémentée* : un effet conditionnel selon le personnage-joueur en jeu (ex. bonus si Keb est en jeu, pour une éventuelle carte `unique` — voir section 3) nécessitera probablement un champ `condition` supplémentaire dans `parametres`, à concevoir le moment venu.

*Exemple — « Le sandwich de Ginette » (trois lignes dans `objets_variantes`, en plus de la ligne standard dans `objets`) :*
- Standard (`objets`) : `{"texte":"Redonne des PV à un combattant","parametres":{"type":"soin","cible":"combattant_choisi","valeur":7,"duree":null}}`
- Supérieure (`objets_variantes`, `variante = "superieure"`) : `{"texte":"Redonne des PV à un combattant","parametres":{"type":"soin","cible":"combattant_choisi","valeur":9,"duree":null}}`
- Suprême (`objets_variantes`, `variante = "supreme"`) : `{"texte":"Redonne des PV à un combattant","parametres":{"type":"soin","cible":"combattant_choisi","valeur":10,"duree":null}}`

*Exemple — coup critique (section 5.3), sur une carte combattant puissante et rare (plus encline au critique qu'à la faiblesse) :*
```json
{"type": "coup_critique", "des": 2, "seuil_critique": 9, "seuil_faible": 2}
```
*Contre-exemple, carte plus faible (plus encline à la faiblesse) :*
```json
{"type": "coup_critique", "des": 1, "seuil_critique": 6, "seuil_faible": 2}
```

### 16.1 Répertoire d'effets envisagés (brainstorm Claude, à valider carte par carte)

Le document précise que l'enum `parametres.type` s'enrichit « au besoin, carte par carte, jamais fixé à l'avance dans son ensemble » (section 16). Cette liste n'a pas vocation à figer cet enum — c'est un répertoire d'idées, à piger et ajuster au moment de concevoir une carte précise, pas une norme à appliquer systématiquement.

**Dégâts et soin**
| Type envisagé | Idée |
|---|---|
| `degats_zone` | Dégâts à la cible et à tout combattant adjacent (allié ou ennemi selon la carte) |
| `vol_pv` | Inflige des dégâts à la cible et rend l'équivalent en PV à l'utilisateur (vampirisme) |
| `poison` | Dégâts différés, répétés sur plusieurs tours (`duree` > 0, valeur appliquée à chaque tour plutôt qu'une fois) |
| `soin_zone` | Soigne plusieurs alliés à la fois plutôt qu'une seule cible |
| `regeneration` | Soin différé, réparti sur plusieurs tours — symétrique du poison |
| `sacrifice` | L'utilisateur perd des PV (ou une autre ressource) pour amplifier un autre effet combiné |

**Contrôle et plateau**
| Type envisagé | Idée |
|---|---|
| `poussee` | Force la cible à reculer d'une case (peut la pousser sur un piège, section 7) |
| `attraction` | Inverse de `poussee` — force la cible adverse à avancer vers l'utilisateur |
| `teleportation` | Déplace un combattant allié sans consommer de PV |
| `gel` | La cible ne peut ni se déplacer ni attaquer pendant `duree` tours (sans pour autant s'endormir) |
| `echange_position` | Échange la position de deux combattants sur l'échiquier |
| `mur` | Crée un obstacle temporaire bloquant une case du plateau |

**Cartes, main, et pioche**
| Type envisagé | Idée |
|---|---|
| `pioche_supplementaire` | Pioche une ou plusieurs cartes de plus que la normale |
| `vol_carte` | Prend une carte au hasard dans la main adverse |
| `destruction_main` | Détruit une carte précise ou au hasard dans la main adverse (lien avec la vulnérabilité de la main, section 8) |
| `protection_renvoi` | Évite le renvoi (section 8) pour ce tour, même main pleine |
| `regard_paquet` | Permet de regarder et/ou réorganiser les cartes du dessus du paquet |
| `recyclage` | Remet une carte endormie (cimetière, section 9) directement en main, hors du cycle normal de réveil |

**Points de commande (PC)**
| Type envisagé | Idée |
|---|---|
| `recuperation_pc` | Rend des PC immédiatement à l'utilisateur |
| `sabotage_pc` | Réduit les PC disponibles de l'adversaire au tour suivant |
| `partage_pc` | Transfère des PC d'un allié à un autre |

**Visibilité (section 11)**
| Type envisagé | Idée |
|---|---|
| `camouflage` | Rend un combattant invisible pendant `duree` tours, même à portée de vue normale |
| `reperage` | Révèle une zone du plateau adverse normalement cachée |
| `marquage` | Rend une cible visible en permanence, ciblable même hors de la portée de vue normale |

**Combat spécial**
| Type envisagé | Idée |
|---|---|
| `coup_critique` | Voir section 5.3 |
| `riposte_differee` | Permet à une unité « de choc » (section 10) de riposter malgré son retrait |
| `reveil` | Réveille directement un combattant du sommeil (cimetière, section 9) en jeu, sans repasser par le paquet/la main |
| `esquive` | Chance (tirage de dé, comme le coup critique) d'éviter complètement une attaque, propre à la carte défenseure |
| `partage_degats` | Répartit les dégâts subis par un combattant entre plusieurs alliés proches |
| `invocation` | Fait entrer une nouvelle carte combattant directement en jeu, hors de la pioche/pose normale |

**Narratif / conditionnel** *(nécessite le champ `condition` déjà envisagé en section 3/16, pas encore implémenté)*
| Type envisagé | Idée |
|---|---|
| `bonus_personnage_joueur` | Bonus si un personnage-joueur précis est en jeu (déjà noté pour l'éventuelle carte `unique` du sandwich de Ginette, section 3) |
| `bonus_synergie` | Bonus si une autre carte précise est aussi en jeu (combo entre deux cartes désignées) |
| `bonus_lieu` | Bonus si le combat se déroule sur une carte terrain précise (lien section 7) |
| `bonus_horde` | Bonus qui augmente avec le nombre d'alliés d'un type donné actuellement en jeu |

## 17. Déblocage câblé côté site — état d'avancement

- Les trois conditions de déblocage de « Le sandwich de Ginette » sont maintenant définies (détail et statut dans `bravo-catalogue-cartes.md`) : le clic sur le sandwich dans `dialogue-d1.html` (câblée), la complétion des questions de fin de d1 (fonctionnalité pas encore développée sur le site), et une question à réponse construite (« Qui adore les sandwichs de Ginette ? »).
- Par défaut (sauf indication contraire) : trois conditions par carte bronze — confirmé par cet exemple.

## 18. Prochaine étape

- Les cartes elles-mêmes (statistiques, effets, variantes chiffrées) sont désormais listées dans le document compagnon `bravo-catalogue-cartes.md`, pas ici — ce document-ci reste dédié aux règles, principes de conception, et au schéma.
- Chiffrer, carte par carte, les valeurs `des`/`seuil_critique`/`seuil_faible` du coup critique (section 5.3) au moment de désigner quelles cartes en bénéficient — pas de règle universelle à établir.
- Le répertoire d'effets (section 16.1) est un brainstorm à trier — retenir/écarter/ajuster au cas par cas plutôt qu'un enum à implémenter en bloc.
- Formaliser dans le schéma Supabase réel (pas seulement documenté ici) les nouveaux champs `stat` et le support d'`effet.parametres` en liste — utiles dès la première carte à effet combiné (ex. le dragon).

- Confirmer si le combattant-repère de 15 PV utilisé pour calibrer le sandwich (section 5.2) doit faire remonter la fourchette bronze de la table 5.1 (8–12 PV), ou rester un repère de calibration distinct puisqu'un consommable peut être utilisé par un combattant de n'importe quelle rareté.
- Formaliser dans le schéma (section 16) : un champ `edition` (pour figer l'apparence par édition, section 4) et un plafond de quantité pour le palier `unique` (ex. `quantite_max` sur `objets_variantes`) — les deux principes sont tranchés, la mise en œuvre technique reste à faire.
- Concevoir en détail la future carte `unique` du sandwich de Ginette (illustration de Keb, effet conditionnel 11→12 si Keb est le personnage-joueur en jeu) et le champ `condition` correspondant dans `effet.parametres` — pas urgent, à faire au moment de produire cette carte précise.
- Fixer le surcoût PV exact pour les effets de vitesse (cartes qui franchissent plus d'une case par commande de déplacement) — resté ouvert, à concevoir carte par carte.
- Chiffrer les autres cartes concrètes à venir en s'appuyant sur les repères de la section 5 (ajuster à la main, pas de recalcul automatique).
- Développer la fonctionnalité « questions de fin de d1 » sur le site (n'existe pas encore), puis câbler les conditions 2 et 3 du sandwich de Ginette (déjà définies, voir `bravo-catalogue-cartes.md`).
- Génération de la bande combattant définitive (4 cases, style assorti au gabarit de base — réutiliser l'invite de génération de la section 4).
- Vérifier la variante exacte de Lora utilisée (Medium confirmé, pas SemiBold/Bold par erreur).
- Détailler le mécanisme d'échange de cartes (transfert de propriété en base, pas un simple partage de code).
- Rédiger les premières questions de français/lore pour l'étape ultime de déblocage des cartes, en cohérence avec les trois seuils de notation (section 2/3).

---
*Document de compilation, mis à jour au fil des sessions de conception.*
