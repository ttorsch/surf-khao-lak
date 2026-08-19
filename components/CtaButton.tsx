import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-orange text-cream shadow-orange hover:bg-orange-dark active:bg-orange-dark",
  secondary:
    "border border-line-strong bg-transparent text-navy hover:bg-sand-100 active:bg-sand-100",
  ghost: "border border-cream/50 bg-cream/10 text-cream hover:bg-cream/20 active:bg-cream/25",
};

/**
 * Bouton pilule de la maquette. Hauteur 50 px : cible tactile confortable.
 *
 * `size="sm"` resserre le texte et les marges sur mobile uniquement : c'est ce
 * qui permet de poser deux boutons côte à côte sur 390 px sans que le libellé
 * passe à la ligne. Au-delà de 640 px, on retrouve la taille de la maquette.
 */
const sizes = {
  md: "px-6 text-[15px]",
  sm: "px-4 text-sm sm:px-6 sm:text-[15px]",
};

export default function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors ${sizes[size]} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
