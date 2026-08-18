"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/lib/slides";
import PlaceholderImage from "./PlaceholderImage";

/**
 * Le bloc « séduction ». Il vend la sensation, pas le produit.
 * Défilement automatique, gestes tactiles, pas d'interaction dépendant du survol.
 *
 * Une seule photo est montée à la fois : on ne télécharge que ce qui est vu.
 * Le flou de chargement des imports statiques couvre le temps de fetch.
 */
export default function Slider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [go]);

  const slide = slides[index];

  return (
    <section aria-label="Photos de l'école" className="mx-auto max-w-5xl px-5.5 pt-9 pb-2">
      <div>
        <h2 className="font-display text-[28px] leading-[1.1] text-navy sm:text-4xl">
          Apprendre à surfer chez nous
        </h2>
        <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-navy/72 text-pretty">
          De l&apos;eau à 29 °C, des vagues d&apos;apprentissage et personne pour vous presser.
        </p>

        <div className="relative mt-5 h-[260px] overflow-hidden rounded-card shadow-card sm:h-96">
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
                src={slide.src}
                objectPosition={slide.objectPosition}
                label={`photo ${index + 1}`}
                alt={slide.alt}
                sizes="(max-width: 640px) 100vw, 1024px"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Photo précédente"
            className="absolute top-1/2 left-3.5 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-sand-50/90 text-navy transition-colors hover:bg-orange hover:text-cream"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Photo suivante"
            className="absolute top-1/2 right-3.5 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-sand-50/90 text-navy transition-colors hover:bg-orange hover:text-cream"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-[7px]">
            {slides.map((s, i) => (
              <button
                key={s.src.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à la photo ${i + 1}`}
                aria-current={i === index}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`block h-[7px] rounded-full transition-all duration-200 ${
                    i === index ? "w-[22px] bg-orange" : "w-[7px] bg-sand-50/55"
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
