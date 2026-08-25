import Link from "next/link";
import { site } from "@/lib/site";
import Wave from "./Wave";

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-navy px-5.5 pt-11 pb-8 text-cream">
      <Wave fill="var(--color-sand-50)" position="top" />

      <div className="relative mx-auto max-w-5xl">
        <nav className="mt-5.5 flex flex-wrap gap-x-5.5 gap-y-2.5 text-sm">
          <Link href="/conditions" className="text-cream/82 hover:text-cream">
            Conditions de vente
          </Link>
          <Link href="/mentions-legales" className="text-cream/82 hover:text-cream">
            Mentions légales
          </Link>
          <a href={`mailto:${site.contact.email}`} className="text-cream/82 hover:text-cream">
            Nous écrire
          </a>
        </nav>
        <p className="mt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} {site.name} — {site.city}, {site.country}
        </p>
      </div>
    </footer>
  );
}
