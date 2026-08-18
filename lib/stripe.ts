import Stripe from "stripe";

/**
 * Client Stripe côté serveur uniquement.
 * STRIPE_SECRET_KEY ne doit jamais être exposée au navigateur.
 *
 * Initialisation paresseuse : le build ne doit pas échouer si la variable
 * d'environnement n'est pas encore définie.
 */
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY manquante");
    client = new Stripe(key);
  }
  return client;
}

export const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
