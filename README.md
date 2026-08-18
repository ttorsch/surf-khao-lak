# Surf Khao Lak

Landing page francophone qui convertit le trafic publicitaire Meta (Facebook / Instagram)
en réservations payées de cours de surf à Khao Lak, Thaïlande.

Les règles du projet sont dans [`AGENTS.md`](./AGENTS.md) (miroir : `CLAUDE.md`, `GEMINI.md`).

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés Stripe de test
npm run dev
```

http://localhost:3000

## Webhook Stripe en local

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Reporter la valeur `whsec_…` affichée dans `STRIPE_WEBHOOK_SECRET`.

## Structure

| Chemin | Rôle |
|---|---|
| `lib/classes.ts` | **Source unique de vérité** : cours, prix, durées, conditions |
| `lib/site.ts` | Coordonnées, adresse, mentions légales |
| `lib/stripe.ts` | Client Stripe (serveur uniquement) |
| `app/api/checkout` | Création de la session Stripe Checkout |
| `app/api/webhooks/stripe` | Réception des événements Stripe |
| `components/` | Hero, Slider, ClassCard, ContactBlock, … |

## ⚠️ À faire avant la mise en production

- [ ] Remplacer les données provisoires de `lib/classes.ts` (noms, tarifs, durées, conditions)
- [ ] Remplacer les données provisoires de `lib/site.ts` (nom, adresse, téléphone, e-mail, Instagram, mentions légales)
- [ ] Passer `PLACEHOLDER_DATA` à `false` dans `lib/site.ts`
- [ ] Fournir les photos et les brancher via la prop `src` de `PlaceholderImage`
  (tant qu'aucune photo n'est fournie, un badge « Photo à fournir » s'affiche sur le site)
- [ ] Renseigner les variables d'environnement dans Vercel
- [ ] Configurer le webhook Stripe en production
- [ ] Brancher l'envoi d'e-mail de confirmation dans `app/api/webhooks/stripe/route.ts`
- [ ] Faire relire les mentions légales et les CGV par un professionnel du droit français
