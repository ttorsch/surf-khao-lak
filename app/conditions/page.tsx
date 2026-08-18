import type { Metadata } from "next";
import Link from "next/link";
import { classes } from "@/lib/classes";
import { formatPrice, priceSuffix } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Conditions générales de vente" };

/** Information que l'école n'a pas encore communiquée : jamais inventée. */
function AConfirmer() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 uppercase">
      à confirmer
    </span>
  );
}

/**
 * ⚠️ Contenu à faire valider par un professionnel du droit français avant
 * la mise en ligne. Les tarifs et délais d'annulation sont lus depuis
 * lib/classes.ts — ils ne sont jamais recopiés à la main.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl text-navy">Conditions générales de vente</h1>

      <div className="mt-8 space-y-8 text-navy/85">
        <section>
          <h2 className="font-display text-xl text-navy">1. Objet</h2>
          <p className="mt-2">
            Les présentes conditions régissent la vente de cours de surf dispensés par{" "}
            {site.legal.company} à {site.beach}, {site.city}, {site.country}. Toute réservation
            vaut acceptation de ces conditions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">2. Prestations et tarifs</h2>
          <p className="mt-2">Tarifs taxes comprises, en bahts thaïlandais (THB) :</p>
          <ul className="mt-3 space-y-1.5">
            {classes.map((c) => (
              <li key={c.slug} className="flex justify-between gap-4">
                <Link href={`/cours/${c.slug}`} className="underline">
                  {c.name}
                </Link>
                <span className="font-medium whitespace-nowrap">
                  {formatPrice(c.priceThb)} <span className="font-normal text-navy/60">{priceSuffix(c)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">3. Réservation et paiement</h2>
          <p className="mt-2">
            La réservation est ferme dès réception du paiement intégral, effectué en ligne via
            Stripe. L&apos;horaire précis de la séance est confirmé par message la veille, en
            fonction des marées et des conditions de mer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">4. Annulation par le client</h2>
          <ul className="mt-2 space-y-2">
            {classes.map((c) => (
              <li key={c.slug}>
                <span className="font-medium text-navy">{c.name} — </span>
                {c.conditions.cancellation ?? <AConfirmer />}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">5. Annulation pour raison météo</h2>
          <ul className="mt-2 space-y-2">
            {classes.map((c) => (
              <li key={c.slug}>
                <span className="font-medium text-navy">{c.name} — </span>
                {c.conditions.weather ?? <AConfirmer />}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            La décision d&apos;annuler pour raison de sécurité appartient au moniteur et ne peut
            être contestée.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">6. Conditions de participation</h2>
          <p className="mt-2">
            Chaque cours indique sa tranche d&apos;âge et son niveau requis sur sa page dédiée.
            Les participants mineurs doivent être accompagnés d&apos;un adulte responsable. Le
            moniteur peut refuser l&apos;accès à l&apos;eau à toute personne dont l&apos;état
            (fatigue, alcool, blessure) rendrait la séance dangereuse, sans remboursement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">7. Remboursements</h2>
          <p className="mt-2">
            Les remboursements sont effectués via Stripe, sur le moyen de paiement d&apos;origine,
            sous 5 à 10 jours ouvrés.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy">8. Réclamations</h2>
          <p className="mt-2">
            Pour toute réclamation, écrivez à {site.contact.email}. Nous nous engageons à répondre
            sous 7 jours.
          </p>
        </section>
      </div>
    </main>
  );
}
