import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-sunset-500 text-white shadow-lg shadow-sunset-600/25 hover:bg-sunset-600 active:bg-sunset-600",
  secondary:
    "bg-white text-ocean-800 ring-1 ring-ocean-800/15 hover:bg-ocean-50 active:bg-ocean-100",
  ghost: "bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25 active:bg-white/30",
};

/** Bouton d'action. Hauteur minimale 44 px pour la cible tactile. */
export default function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
