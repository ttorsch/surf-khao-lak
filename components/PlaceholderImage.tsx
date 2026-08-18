import Image, { type StaticImageData } from "next/image";

/**
 * Emplacement photo.
 *
 * Tant qu'aucune vraie photo n'est fournie, un bloc dégradé s'affiche avec un
 * badge « PHOTO À FOURNIR » bien visible : une image de remplacement ne doit
 * jamais partir en production sans qu'on s'en aperçoive.
 *
 * Dès qu'une photo existe, il suffit de passer `src` — un import statique de
 * préférence, qui apporte gratuitement les dimensions (donc aucun décalage de
 * mise en page) et le flou de chargement.
 */
export default function PlaceholderImage({
  src,
  alt,
  label,
  priority = false,
  className = "",
  sizes = "100vw",
  objectPosition,
}: {
  src?: string | StaticImageData;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectPosition?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={typeof src === "string" ? "empty" : "blur"}
        style={objectPosition ? { objectPosition } : undefined}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 flex items-start justify-center bg-[linear-gradient(150deg,var(--color-blue-soft),var(--color-blue))] pt-3.5 ${className}`}
    >
      <span className="rounded-full bg-navy/62 px-3.5 py-[7px] text-center text-[10px] font-semibold tracking-[0.12em] text-cream uppercase">
        Photo à fournir — {label}
      </span>
    </div>
  );
}
