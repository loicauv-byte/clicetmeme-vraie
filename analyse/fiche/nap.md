# Cohérence nom-adresse-téléphone (site ↔ fiche Google)

*Vérifié le 6 novembre 2026 sur les 7 pages du site.*

| Élément | Référence (fiche-client.md) | Sur le site | Statut |
|---|---|---|---|
| Nom | Numérique & Vous | « Numérique & Vous » partout (en-tête, pied de page, données structurées `"name"`) | Identique |
| Téléphone | 06 67 06 21 85 | « 06 67 06 21 85 » affiché, `tel:+33667062185`, JSON-LD `"+33667062185"` | Identique |
| Ville | Ollioules 83190 | Pied de page « Ollioules, Var (83) », JSON-LD `Ollioules / 83190 / Var` | Identique |
| Adresse complète | 97B allée des Églantiers | Uniquement dans `mentions-legales.html` ligne 81 (obligation légale), écrit « 97B Allée des Églantiers » | Normal : l'adresse est masquée sur la fiche, pas sur les mentions légales |
| Site | https://www.numeriquevous.fr | Canonical `https://www.numeriquevous.fr/` | Identique |

## Écarts à corriger
1. **Fiche Google (pas le site)** : la catégorie « Assistance et services informatiques » et la description « Informaticien indépendant… dépannage PC… formation IA » ne correspondent plus au site. Corrigé par `fiche-google.md`.
2. **Mineur, sur le site** : `index.html` ligne 40, `"areaServed"` ne cite que 5 villes alors que la fiche couvrira tout le Var. Correction possible plus tard (ajouter « Var »), sans urgence.

Aucun écart de nom ou de téléphone.
