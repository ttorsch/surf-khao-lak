import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ocean-900 px-5 py-10 text-white/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg text-white">{site.name}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/conditions" className="hover:text-white">
            Conditions de vente
          </Link>
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
          <a href={`mailto:${site.contact.email}`} className="hover:text-white">
            Nous écrire
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-5xl text-xs text-white/45">
        © {new Date().getFullYear()} {site.name} — {site.city}, {site.country}
      </p>
    </footer>
  );
}
