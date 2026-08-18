import Link from "next/link";
import CtaButton from "@/components/CtaButton";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      <p className="font-display text-6xl text-ocean-300">404</p>
      <h1 className="font-display mt-3 text-3xl text-ocean-900">Cette page a pris le large</h1>
      <p className="mt-3 text-ocean-800/80">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <CtaButton href="/#cours" className="mt-7">
        Voir nos cours
      </CtaButton>
      <Link href="/" className="mt-4 inline-flex min-h-11 items-center text-ocean-800 underline">
        Revenir à l&apos;accueil
      </Link>
    </main>
  );
}
