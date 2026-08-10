# Jeu Bravo — Catalogue des cartes

> **Nature de ce document : compilation, distincte du document de mécaniques (`bravo-mecanique-synthese`).** Ce fichier répertorie les cartes elles-mêmes (statistiques, effets, variantes, conditions de déblocage) ; les règles générales, principes de conception, et le schéma de données restent dans le document de mécaniques — on n'y répète pas la logique derrière les chiffres, seulement les valeurs retenues, avec un renvoi à la section pertinente du document de mécaniques au besoin.
>
> **Règles de mise à jour** (mêmes principes que le document de mécaniques) :
> 1. Aucune carte n'est supprimée d'une mise à jour à l'autre — une carte rééquilibrée voit ses valeurs corrigées sur place (l'ancienne valeur n'est pas laissée traîner ailleurs), pas dupliquée dans une nouvelle entrée.
> 2. Ce catalogue est une **zone de travail et de référence humaine** — la source de vérité définitive, une fois une carte réellement entrée en jeu, reste la base Supabase (`objets` / `objets_variantes`, voir section 16 du document de mécaniques). Une carte marquée « en jeu » ci-dessous est supposée refléter fidèlement ce qui est en base ; en cas d'écart constaté, la base a préséance et ce document est corrigé en conséquence.
> 3. Une carte peut être listée ici avant d'exister en base (statut « en conception ») — utile pour brainstormer et chiffrer avant l'implémentation.

**Statuts possibles** : `en jeu` (existe en base, jouable) · `en conception` (chiffrée ici, pas encore en base) · `idée` (mentionnée mais pas chiffrée).

---

## Consommables

### Le sandwich de Ginette
**Statut** : en jeu · **Rareté** : bronze · **PC** : 1 · **Code** : *(à confirmer dans `objets`)*

**Effet narratif (`effet_texte`)** : « Redonne des PV à un combattant. »

**Effet moteur (`effet.parametres`)** — `type: soin`, `cible: combattant_choisi`, `duree: null` :

| Palier | `variante` | Valeur (PV rendus) | Traitement visuel |
|---|---|---|---|
| 1 — Standard | `null` | 7 | Lettrage neutre |
| 2 — Supérieure | `superieure` | 9 | Lettrage dégradé argenté |
| 3 — Suprême | `supreme` | 10 | Lettrage dégradé doré + bordure holographique |
| 4 — Brillante | `brillante` | 11 | Dégradé doré, holographique sur toute la carte |
| 5 — Unique | `unique` | 11 (12 si le personnage-joueur en jeu est Keb — condition pas encore implémentée dans le schéma) | Illustration alternative (Keb mangeant le sandwich), ≤5 exemplaires en circulation — carte pas encore finalisée |

*Calibré sur un combattant-repère de 15 PV (voir section 5.2 du document de mécaniques). Les paliers 4 et 5 ne sont pas systématiques (note excellente + condition additionnelle + hasard-bonus-seulement, section 3).*

**Conditions de déblocage (`conditions_completees`)** — trois conditions, cohérent avec le repère « trois conditions par défaut pour une carte bronze » (section 17 du document de mécaniques) :

| # | `condition_id` | Description | Statut |
|---|---|---|---|
| 1 | `d1_clic_sandwich` | Cliquer sur le sandwich dans `dialogue-d1.html` | En place, câblée |
| 2 | `d1_questions_completees` | Compléter les questions à la fin de d1 | Condition définie, mais la fonctionnalité « questions de fin de d1 » n'existe pas encore sur le site — dépend de son développement |
| 3 | `d1_question_qui_aime_sandwichs` | Répondre, en phrase complète, à la question « Qui adore les sandwichs de Ginette ? » | Condition définie, pas encore câblée |

**Production** : gabarit + illustration + lettrage produits pour les 4 premiers paliers (images fournies). Palier « unique » : illustration alternative encore à produire.

---

## Combattants

*(aucune carte chiffrée pour l'instant)*

### Repères de conception à réutiliser (non chiffrés, exemples illustratifs seulement — voir section 5.1 du document de mécaniques)
- « Soldat ordinaire » (bronze, archétype combattant) : PV 10, PA 3, PD 2 — carte fictive, pas prévue au jeu, sert d'exemple de calibration.
- « Poule » (bronze, archétype créature sans défense) : PV 3, PA 1, PD 0 — carte fictive, pas prévue au jeu, sert d'exemple de calibration (coup fatal en un échange).

---

## Terrain

*(aucune carte chiffrée pour l'instant)*

## Équipement

*(aucune carte chiffrée pour l'instant)*

## Joueur / Vêtement / Base / Héros

*(aucune carte chiffrée pour l'instant)*

---
*Document de compilation, mis à jour au fil des sessions de conception, en parallèle de `bravo-mecanique-synthese`.*
