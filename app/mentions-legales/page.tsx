import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales" };

/**
 * ⚠️ Contenu à faire valider par un professionnel du droit français avant
 * la mise en ligne. Les champs « TODO » viennent de lib/site.ts.
 */
export default function LegalPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl text-ocean-900">Mentions légales</h1>

      <div className="mt-8 space-y-8 text-ocean-800/85">
        <section>
          <h2 className="font-display text-xl text-ocean-900">Éditeur du site</h2>
          <p className="mt-2">
            {site.legal.company}
            <br />
            {site.address}, {site.city}, {site.country}
            <br />
            Immatriculation : {site.legal.registration}
            <br />
            Directeur de la publication : {site.legal.director}
            <br />
            Contact : {site.contact.email} — {site.contact.phone}
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">Hébergement</h2>
          <p className="mt-2">{site.legal.host}</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">Paiements</h2>
          <p className="mt-2">
            Les paiements sont traités par Stripe. Aucune donnée de carte bancaire n&apos;est
            collectée ni stockée par {site.name}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">Données personnelles</h2>
          <p className="mt-2">
            Les informations collectées lors d&apos;une réservation (nom, e-mail, date souhaitée,
            nombre de participants, niveau) servent uniquement à organiser votre séance et à vous
            envoyer votre confirmation. Elles ne sont ni vendues ni cédées à des tiers.
          </p>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression de vos données. Pour l&apos;exercer, écrivez à {site.contact.email}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">Cookies et mesure d&apos;audience</h2>
          <p className="mt-2">
            Ce site utilise des cookies de mesure d&apos;audience et de publicité (Meta Pixel) afin
            de comprendre l&apos;origine de ses visiteurs. Ces cookies ne sont déposés
            qu&apos;après votre consentement explicite, recueilli par le bandeau affiché lors de
            votre première visite. Vous pouvez refuser sans que cela n&apos;affecte votre
            navigation ni votre possibilité de réserver.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean-900">Propriété intellectuelle</h2>
          <p className="mt-2">
            Les textes et photographies présents sur ce site sont la propriété de{" "}
            {site.legal.company} et ne peuvent être reproduits sans autorisation.
          </p>
        </section>
      </div>
    </main>
  );
}
