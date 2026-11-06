# Numérique & Vous — contexte pour Claude

## Qui / quoi
- Loïc Auvray, 19 ans, entrepreneur individuel à Ollioules (Var), SIRET 939 882 957 00029. Aussi alternant BTS MCO (Castorama La Garde) et fondateur de Clic & Mémé (aide numérique seniors).
- Numérique & Vous : création de sites internet + gestion Google Ads pour artisans et TPE du Var (plombiers, électriciens, chauffagistes, couvreurs…).
- AUCUN PRIX affiché sur le site : tout est sur devis après audit gratuit. Offre de lancement : 30 jours de diffusion Google Ads offerts (gestion + pub) à la livraison d'un site, compteur au premier affichage, sous réserve de volume de recherches. Pub achetée au nom du client via contrat de mandat (loi Sapin), refacturée au centime sans marge, gestion et pub sur 2 lignes, facturées d'avance ; sans accord écrit, pub en pause.
- Contact : 06 67 06 21 85, numeriquevous@gmail.com. Formulaire via Formspree.

## Préférences de travail de Loïc
- Réponses directes, sans flatterie ni remplissage. Challenger ses hypothèses quand c'est justifié. Terminer par des actions concrètes.
- Jamais de faux avis, faux chiffres ou faux clients sur le site. Pas d'avis Google pour l'instant.
- Ton du site : voix d'agence, « nous » / « vous », jamais « je ». Pas de « notre équipe » (Loïc est seul).
- Seule la maquette Auto Lagoubran est montrée (« Exemple de réalisation », présentée comme site de démonstration). Activ Plomberie retirée.

## Site (ce dépôt)
- HTML/CSS/JS statique, sans build. Déployé par Cloudflare (Workers static assets, `wrangler.jsonc`) sur numeriquevous.fr. Toute fusion sur `main` part en production.
- Pages : index, creation-site-internet, google-ads, a-propos (« Notre histoire »), contact, merci, mentions-legales. URLs sans `.html`.
- `styles.css` = design system unique. `site.js` = header, menu, reveals, FAQ. `hero.js` = animation « Google en direct » de l'accueil. `cookie-consent.js` = Google Consent Mode v2 (gtag chargé après consentement, conversion d'appel `conversion_appel`).

## Règles de design (refonte nov. 2026, inspirée d'Auto Lagoubran)
- Palette conservée : encre #1a1046, nuit #130c36 (sections sombres, footer), violet #4c1d95, lilas #c4b5fd (accent sur fond sombre), fond #f4f2f8. Ambre #f59e0b réservé à la notification et aux étoiles du hero.
- Polices : Archivo (titres), Inter (texte), auto-hébergées dans /fonts.
- Interdits (aspect « généré par IA ») : grilles de cartes blanches arrondies, bordure colorée à gauche des cartes, emojis comme icônes, gros blocs à dégradé violet, disque décoratif derrière le hero, eyebrow en majuscules espacées avec trait, bandeau défilant.
- À utiliser : alternance sections claires/sombres, listes numérotées à filets fins, colonnes à filet supérieur, cadres à coins (`.corner`), frise à points (`.timeline`), FAQ en deux colonnes, icônes SVG au trait (`svg.i`), boutons à rayon 6 px.
- Pas de photo de Loïc sur le site (retirée à sa demande ; `photo_loic.png` reste dans le dépôt, non utilisée).
