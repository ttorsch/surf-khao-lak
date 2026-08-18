import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-orange text-cream shadow-orange hover:bg-orange-dark active:bg-orange-dark",
  secondary:
    "border border-line-strong bg-transparent text-navy hover:bg-sand-100 active:bg-sand-100",
  ghost: "border border-cream/50 bg-cream/10 text-cream hover:bg-cream/20 active:bg-cream/25",
};

/** Bouton pilule de la maquette. Hauteur 50 px : cible tactile confortable. */
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
      className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
