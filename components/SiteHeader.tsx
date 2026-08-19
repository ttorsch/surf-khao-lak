import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "./Logo";

/**
 * En-tête des pages intérieures : la page d'accueil porte déjà la marque dans
 * son héros, mais on arrive souvent directement sur une page de cours ou de
 * réservation depuis une publicité. Le logo y sert aussi de retour à l'accueil.
 */
export default function SiteHeader({ className = "" }: { className?: string }) {
  return (
    <header className={`mx-auto w-full max-w-3xl px-5.5 pt-5 ${className}`}>
      <Link
        href="/"
        aria-label={`${site.name} — retour à l'accueil`}
        className="inline-flex rounded-full"
      >
        <Logo markSize={34} />
      </Link>
    </header>
  );
}
