import Image from "next/image";

/**
 * Emplacement photo.
 *
 * Tant qu'aucune vraie photo n'est fournie, un bloc dégradé s'affiche avec un
 * badge « PHOTO À FOURNIR » bien visible : une image de remplacement ne doit
 * jamais partir en production sans qu'on s'en aperçoive.
 *
 * Dès qu'un fichier existe dans /public, il suffit de passer `src` pour que le
 * composant rende un next/image optimisé à la place.
 */
export default function PlaceholderImage({
  src,
  alt,
  label,
  priority = false,
  className = "",
  sizes = "100vw",
}: {
  src?: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 flex items-start justify-center bg-gradient-to-br from-ocean-300 via-ocean-500 to-ocean-800 pt-4 ${className}`}
    >
      <span className="rounded-full bg-black/55 px-3 py-1.5 text-center text-[11px] font-semibold tracking-wide text-white uppercase">
        Photo à fournir — {label}
      </span>
    </div>
  );
}
