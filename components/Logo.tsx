import { site } from "@/lib/site";

/**
 * Logo « Surf Khao Lak » — disque solaire orange et deux vagues.
 *
 * Règles de construction reprises de la maquette :
 * - traits arrondis d'épaisseur constante ;
 * - une seule vague en dessous de 24 px ;
 * - sur photo, utiliser la version pleine (pastille) : elle porte son propre
 *   fond et ne dépend pas de la couleur derrière.
 */
type Tone = "onLight" | "onDark";

export function LogoMark({
  size = 46,
  tone = "onLight",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  /* Sous 24 px, la seconde vague se referme : on n'en garde qu'une, plus épaisse. */
  const compact = size < 24;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className={`block shrink-0 ${className}`}
    >
      <circle cx="32" cy="21" r="13" fill="var(--color-orange)" />
      <path
        d="M4 42 C 13 34, 23 50, 32 42 S 51 34, 60 42"
        fill="none"
        stroke={tone === "onDark" ? "var(--color-cream)" : "var(--color-blue)"}
        strokeWidth={compact ? 8 : 6}
        strokeLinecap="round"
      />
      {!compact && (
        <path
          d="M10 55 C 18 48, 26 61, 34 54 S 48 48, 54 55"
          fill="none"
          stroke="var(--color-blue-soft)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/** Version pleine : pastille orange, marque en crème. Pour les fonds photo. */
export function LogoBadge({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className={`block shrink-0 ${className}`}
    >
      <rect width="64" height="64" rx="20" fill="var(--color-orange)" />
      {/* La marque occupe 44 px sur 64, comme l'icône d'app de la maquette. */}
      <g transform="translate(10 10) scale(0.6875)">
        <circle cx="32" cy="21" r="12" fill="var(--color-cream)" />
        <path
          d="M6 43 C 15 35, 24 51, 32 43 S 50 35, 58 43"
          fill="none"
          stroke="var(--color-cream)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M12 56 C 19 49, 27 62, 34 55 S 47 49, 52 56"
          fill="none"
          stroke="var(--color-cream)"
          strokeOpacity="0.6"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** Lockup horizontal : nom à gauche, marque à droite. */
export default function Logo({
  tone = "onLight",
  variant = "mark",
  markSize = 40,
  spread = false,
  className = "",
}: {
  tone?: Tone;
  /** « badge » = pastille pleine, à préférer sur une photo */
  variant?: "mark" | "badge";
  markSize?: number;
  /** Occupe toute la largeur : nom collé à gauche, marque collée à droite */
  spread?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`${
        spread ? "flex w-full justify-between" : "inline-flex"
      } items-center gap-3 ${className}`}
    >
      <span
        className={`font-display text-xl leading-[1.05] font-bold tracking-[-0.02em] ${
          tone === "onDark" ? "text-cream" : "text-navy"
        }`}
      >
        {site.name}
      </span>
      {variant === "badge" ? (
        <LogoBadge size={markSize} />
      ) : (
        <LogoMark size={markSize} tone={tone} />
      )}
    </span>
  );
}
