import type { Metadata } from "next";
import Link from "next/link";
import { classes } from "@/lib/classes";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Conditions générales de vente" };

/**
 * ⚠️ Contenu à faire valider par un professionnel du droit français avant
 * la mise en ligne. Les tarifs et délais d'annulation sont lus depuis
 * lib/classes.ts — ils ne sont jamais recopiés à la main.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl text-ocean-900">Conditions générales de vente</h1>

      <div className="mt-8 space-y-8 text-ocean-800/85">
        <section>
          <h2 className="font-display text-xl text-ocean-900">1. Objet</h2>
          <p className="mt-2">
            Les présentes conditions régissent la vente de cours de surf dispensés par{" "}
            {site.legal.company} à {site.beach}, {site.city}, {site.country}. Toute réservation
            vaut acceptation de ces conditions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">2. Prestations et tarifs</h2>
          <p className="mt-2">Tarifs par personne, taxes comprises, en bahts thaïlandais (THB) :</p>
          <ul className="mt-3 space-y-1.5">
            {classes.map((c) => (
              <li key={c.slug} className="flex justify-between gap-4">
                <Link href={`/cours/${c.slug}`} className="underline">
                  {c.name}
                </Link>
                <span className="font-medium whitespace-nowrap">{formatPrice(c.priceThb)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">3. Réservation et paiement</h2>
          <p className="mt-2">
            La réservation est ferme dès réception du paiement intégral, effectué en ligne via
            Stripe. L&apos;horaire précis de la séance est confirmé par message la veille, en
            fonction des marées et des conditions de mer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">4. Annulation par le client</h2>
          <ul className="mt-2 space-y-2">
            {classes.map((c) => (
              <li key={c.slug}>
                <span className="font-medium text-ocean-900">{c.name} — </span>
                {c.conditions.cancellation}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">5. Annulation pour raison météo</h2>
          <ul className="mt-2 space-y-2">
            {classes.map((c) => (
              <li key={c.slug}>
                <span className="font-medium text-ocean-900">{c.name} — </span>
                {c.conditions.weather}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            La décision d&apos;annuler pour raison de sécurité appartient au moniteur et ne peut
            être contestée.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">6. Conditions de participation</h2>
          <p className="mt-2">
            Chaque cours indique son âge minimum et le niveau de nage requis sur sa page dédiée.
            Les participants mineurs doivent être accompagnés d&apos;un adulte responsable. Le
            moniteur peut refuser l&apos;accès à l&apos;eau à toute personne dont l&apos;état
            (fatigue, alcool, blessure) rendrait la séance dangereuse, sans remboursement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">7. Remboursements</h2>
          <p className="mt-2">
            Les remboursements sont effectués via Stripe, sur le moyen de paiement d&apos;origine,
            sous 5 à 10 jours ouvrés.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">8. Réclamations</h2>
          <p className="mt-2">
            Pour toute réclamation, écrivez à {site.contact.email}. Nous nous engageons à répondre
            sous 7 jours.
          </p>
        </section>
      </div>
    </main>
  );
}
