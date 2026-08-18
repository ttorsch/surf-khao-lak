"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

/**
 * Le bloc « séduction ». Il vend la sensation, pas le produit.
 * Défilement automatique, gestes tactiles, pas d'interaction dépendant du survol.
 */
const slides = [
  { label: "plage au lever du soleil", alt: "La plage de Khao Lak au lever du soleil" },
  { label: "élève debout sur sa planche", alt: "Une élève debout sur sa planche, souriante" },
  { label: "groupe sur le sable", alt: "Un petit groupe pendant l'échauffement sur le sable" },
  { label: "coucher de soleil dans l'eau", alt: "Des surfeurs dans l'eau au coucher du soleil" },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [go]);

  return (
    <section aria-label="Photos de l'école" className="bg-ocean-900 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          Ça se passe comme ça, chez nous
        </h2>
        <p className="mt-2 max-w-md text-white/70">
          De l&apos;eau à 29 °C, des vagues d&apos;apprentissage et personne pour vous presser.
        </p>

        <div className="relative mt-6 aspect-4/5 overflow-hidden rounded-3xl sm:aspect-16/9">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                if (info.offset.x > 60) go(-1);
              }}
            >
              <PlaceholderImage
                label={slides[index].label}
                alt={slides[index].alt}
                sizes="(max-width: 640px) 100vw, 1024px"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Photo précédente"
            className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Photo suivante"
            className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à la photo ${i + 1}`}
                aria-current={i === index}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
