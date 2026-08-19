import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 pt-6 pb-16 text-center">
      <CheckCircle2 className="mx-auto size-14 text-orange" aria-hidden />
      <h1 className="font-display mt-5 text-3xl text-navy">C&apos;est réservé !</h1>
      <p className="mt-3 text-navy/80">
        Merci, votre paiement est bien passé. Vous allez recevoir un e-mail de confirmation avec
        le détail de votre séance.
      </p>

      <ol className="mt-8 space-y-3 text-left">
        {[
          "Nous vous confirmons l'horaire exact par message la veille, en fonction des marées.",
          "Rendez-vous directement sur la plage, 15 minutes avant l'heure.",
          "Apportez un maillot, une serviette et de la crème solaire. On s'occupe du reste.",
        ].map((step, i) => (
          <li key={step} className="flex gap-3 rounded-soft bg-surface p-4 shadow-soft">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white">
              {i + 1}
            </span>
            <span className="text-navy/85">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-navy/72">
        Une question d&apos;ici là ?{" "}
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue underline"
        >
          Écrivez-nous sur WhatsApp
        </a>{" "}
        ou appelez le {site.contact.phone}.
      </p>

      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-navy underline">
        Revenir à l&apos;accueil
      </Link>
    </main>
    </>
  );
}
