import { NextResponse } from "next/server";
import { billableQuantity, getClass } from "@/lib/classes";
import { toStripeAmount } from "@/lib/format";
import {
  normalizeParticipant,
  participantsMetadata,
  validateParticipant,
} from "@/lib/participants";
import { getStripe, siteUrl } from "@/lib/stripe";

export const runtime = "nodejs";

type Payload = {
  slug?: unknown;
  date?: unknown;
  french?: unknown;
  people?: unknown;
};

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

  const date = typeof body.date === "string" ? body.date : "";
  // Le client n'envoie qu'un booléen ; le montant vient du catalogue, et un
  // cours qui ne propose pas l'option ne peut pas être facturé pour elle.
  const supplement = surfClass.frenchSupplementThb;
  const french = body.french === true && supplement !== null;

  if (!isDate(date)) {
    return NextResponse.json({ error: "Merci de choisir une date valide." }, { status: 400 });
  }

  // Une fiche par élève. Le nombre de participants se déduit des fiches
  // reçues, jamais d'un compteur envoyé à part : les deux ne peuvent pas
  // diverger.
  if (!Array.isArray(body.people)) {
    return NextResponse.json({ error: "Fiches participants manquantes." }, { status: 400 });
  }

  const people = body.people.map(normalizeParticipant);
  const participants = people.length;

  // Les bornes viennent du catalogue, jamais de la requête.
  if (participants < surfClass.minParticipants || participants > surfClass.maxParticipants) {
    return NextResponse.json(
      {
        error:
          surfClass.minParticipants === surfClass.maxParticipants
            ? `Cette formule se réserve pour ${surfClass.maxParticipants} participants.`
            : `Le nombre de participants doit être compris entre ${surfClass.minParticipants} et ${surfClass.maxParticipants}.`,
      },
      { status: 400 },
    );
  }

  for (const [index, person] of people.entries()) {
    const problem = validateParticipant(person, index, index === 0);
    if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  }

  const lead = people[0];

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      // Le participant 1 est le contact. S'il n'a laissé qu'un téléphone,
      // Stripe demande lui-même l'e-mail du reçu au moment du paiement.
      ...(lead.email ? { customer_email: lead.email } : {}),
      line_items: [
        {
          // Un tarif « forfait » / « groupe » se vend en un seul exemplaire.
          quantity: billableQuantity(surfClass, participants),
          price_data: {
            currency: "thb",
            unit_amount: toStripeAmount(surfClass.priceThb),
            product_data: {
              name: surfClass.name,
              description: surfClass.pitch,
            },
          },
        },
        // Supplément langue : forfaitaire, une seule fois par réservation.
        ...(french && supplement !== null
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "thb",
                  unit_amount: toStripeAmount(supplement),
                  product_data: {
                    name: "Cours en français",
                    description: "Supplément par réservation",
                  },
                },
              },
            ]
          : []),
      ],
      // Ce qui transforme un paiement en réservation exploitable.
      // Les fiches participants y figurent avec le numéro de passeport
      // tronqué — le numéro complet ne quitte jamais le navigateur.
      metadata: {
        classSlug: surfClass.slug,
        className: surfClass.name,
        date,
        participants: String(participants),
        french: french ? "oui" : "non",
        customerName: lead.fullName,
        ...participantsMetadata(people),
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
