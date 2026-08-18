import { NextResponse } from "next/server";
import { getClass } from "@/lib/classes";
import { toStripeAmount } from "@/lib/format";
import { getStripe, siteUrl } from "@/lib/stripe";

export const runtime = "nodejs";

type Payload = {
  slug?: unknown;
  date?: unknown;
  participants?: unknown;
  level?: unknown;
  name?: unknown;
  email?: unknown;
  notes?: unknown;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Le prix n'est JAMAIS lu depuis la requête : seul le slug est accepté,
  // le serveur retrouve le tarif réel dans lib/classes.ts.
  const slug = typeof body.slug === "string" ? body.slug : "";
  const surfClass = getClass(slug);
  if (!surfClass) {
    return NextResponse.json({ error: "Ce cours n'existe pas." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const date = typeof body.date === "string" ? body.date : "";
  const level = typeof body.level === "string" ? body.level.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 400) : "";
  const participants = Number(body.participants);

  if (name.length < 2) {
    return NextResponse.json({ error: "Merci d'indiquer votre nom." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }
  if (!isDate(date)) {
    return NextResponse.json({ error: "Merci de choisir une date valide." }, { status: 400 });
  }
  if (!Number.isInteger(participants) || participants < 1 || participants > 8) {
    return NextResponse.json(
      { error: "Le nombre de participants doit être compris entre 1 et 8." },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      customer_email: email,
      line_items: [
        {
          quantity: participants,
          price_data: {
            currency: "thb",
            unit_amount: toStripeAmount(surfClass.priceThb),
            product_data: {
              name: surfClass.name,
              description: surfClass.pitch,
            },
          },
        },
      ],
      // Ce qui transforme un paiement en réservation exploitable.
      metadata: {
        classSlug: surfClass.slug,
        className: surfClass.name,
        date,
        participants: String(participants),
        level,
        customerName: name,
        notes,
      },
      success_url: `${siteUrl()}/reservation/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/reservation/annulee?cours=${surfClass.slug}`,
    });

    if (!session.url) throw new Error("Stripe n'a pas renvoyé d'URL de paiement");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Aucune donnée personnelle du client n'est journalisée.
    console.error("Échec de création de la session Stripe", error);
    return NextResponse.json(
      { error: "Le paiement est momentanément indisponible. Merci de réessayer." },
      { status: 500 },
    );
  }
}
