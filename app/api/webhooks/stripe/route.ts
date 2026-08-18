import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Réception des événements Stripe.
 *
 * Toute la logique d'exécution de la réservation (e-mail de confirmation,
 * notification du moniteur) appartient ici, et non à la page de succès :
 * un client qui ferme son onglet ne doit pas perdre sa réservation.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    // La signature est vérifiée sur chaque requête.
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("Signature de webhook Stripe invalide", error);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // On ne journalise qu'un identifiant, jamais les données personnelles.
    console.log(`Réservation confirmée — session ${session.id}`);

    // TODO — envoi de l'e-mail de confirmation au client et de la notification
    // au moniteur. Les détails de la réservation sont dans session.metadata.
  }

  return NextResponse.json({ received: true });
}
