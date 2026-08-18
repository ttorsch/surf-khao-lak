import type { Metadata } from "next";
import Link from "next/link";
import { getClass } from "@/lib/classes";
import { whatsappUrl } from "@/lib/site";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Paiement interrompu",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ cours?: string }> };

/** Retour d'annulation Stripe : récupération en douceur, sans culpabiliser. */
export default async function CancelledPage({ searchParams }: Props) {
  const { cours } = await searchParams;
  const surfClass = cours ? getClass(cours) : undefined;

  return (
    <main className="mx-auto max-w-xl px-5 py-16 text-center">
      <h1 className="font-display text-3xl text-ocean-900">Paiement interrompu</h1>
      <p className="mt-3 text-ocean-800/80">
        Aucun montant n&apos;a été débité. Votre place n&apos;est pas réservée, mais vous pouvez
        reprendre là où vous en étiez.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <CtaButton href={surfClass ? `/reservation/${surfClass.slug}` : "/#cours"}>
          {surfClass ? `Reprendre : ${surfClass.name}` : "Revoir les cours"}
        </CtaButton>
        <CtaButton href={surfClass ? `/cours/${surfClass.slug}` : "/"} variant="secondary">
          Relire les détails
        </CtaButton>
      </div>

      <p className="mt-8 text-ocean-800/75">
        Un doute, une question sur les dates ?{" "}
        <a
          href={whatsappUrl("Bonjour ! J'ai une question avant de réserver.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-600 underline"
        >
          Parlons-en sur WhatsApp
        </a>
        .
      </p>

      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-ocean-800 underline">
        Revenir à l&apos;accueil
      </Link>
    </main>
  );
}
