import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-xl px-5 py-16 text-center">
      <CheckCircle2 className="mx-auto size-14 text-ocean-500" aria-hidden />
      <h1 className="font-display mt-5 text-3xl text-ocean-900">C&apos;est réservé !</h1>
      <p className="mt-3 text-ocean-800/80">
        Merci, votre paiement est bien passé. Vous allez recevoir un e-mail de confirmation avec
        le détail de votre séance.
      </p>

      <ol className="mt-8 space-y-3 text-left">
        {[
          "Nous vous confirmons l'horaire exact par message la veille, en fonction des marées.",
          "Rendez-vous directement sur la plage, 15 minutes avant l'heure.",
          "Apportez un maillot, une serviette et de la crème solaire. On s'occupe du reste.",
        ].map((step, i) => (
          <li key={step} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ocean-900/8">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ocean-600 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <span className="text-ocean-800/85">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-ocean-800/75">
        Une question d&apos;ici là ?{" "}
        <a
          href={whatsappUrl("Bonjour ! Je viens de réserver un cours.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean-600 underline"
        >
          Écrivez-nous sur WhatsApp
        </a>{" "}
        ou appelez le {site.contact.phone}.
      </p>

      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-ocean-800 underline">
        Revenir à l&apos;accueil
      </Link>
    </main>
  );
}
