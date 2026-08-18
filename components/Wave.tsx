/**
 * Séparateur en vague entre deux sections — signature visuelle de la maquette.
 *
 * La forme déborde volontairement de quelques pixels sur la section suivante :
 * découpée pile sur la limite, sa dernière ligne était lissée par-dessus le
 * fond sombre et laissait un liseré horizontal visible sur toute la largeur.
 */
export default function Wave({
  fill,
  position = "bottom",
  className = "",
}: {
  /** Couleur de la section VERS laquelle on va */
  fill: string;
  position?: "top" | "bottom";
  className?: string;
}) {
  const isBottom = position === "bottom";
  const path = isBottom
    ? "M0 30 C 60 6, 108 6, 168 26 S 286 46, 344 26 S 408 8, 430 18 L430 46 L0 46 Z"
    : "M0 0 L430 0 L430 12 C 372 34, 320 34, 262 16 S 132 -2, 68 18 S 16 28, 0 22 Z";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-[46px] ${
        isBottom ? "bottom-0" : "top-0"
      } ${className}`}
    >
      <svg
        viewBox="0 0 430 46"
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
      >
        <path d={path} fill={fill} />
      </svg>
      {/* Débord plein : prolonge la vague au-delà de la limite de section. */}
      <span
        className={`absolute inset-x-0 h-1 ${isBottom ? "top-full" : "bottom-full"}`}
        style={{ background: fill }}
      />
    </div>
  );
}
