"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import MetaPixel from "./MetaPixel";

const STORAGE_KEY = "consentement-mesure";

/** « attente » = rendu serveur, avant de savoir ce que le navigateur a stocké. */
type Consent = "accepte" | "refuse" | "inconnu" | "attente";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Consent {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepte" || stored === "refuse" ? stored : "inconnu";
}

const getServerSnapshot = (): Consent => "attente";

function decide(value: "accepte" | "refuse") {
  window.localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((listener) => listener());
}

/**
 * Bandeau de consentement RGPD.
 *
 * Le public est français : aucun script de mesure ou de publicité ne doit
 * s'exécuter avant un consentement explicite. Le Pixel n'est monté que si
 * l'utilisateur a accepté.
 */
export default function ConsentBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {consent === "accepte" && pixelId && <MetaPixel id={pixelId} />}

      {consent === "inconnu" && (
        <div
          role="dialog"
          aria-label="Consentement aux cookies de mesure"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <div className="pointer-events-auto flex w-full max-w-[406px] flex-col gap-3.5 rounded-banner bg-surface px-5 pt-4.5 pb-4 shadow-banner sm:max-w-3xl sm:flex-row sm:items-center">
            <p className="flex-1 text-[13px] leading-[1.5] text-navy/78 text-pretty">
              Nous utilisons des cookies de mesure d&apos;audience et de publicité pour comprendre
              d&apos;où viennent nos visiteurs. Ils ne sont déposés qu&apos;avec votre accord.{" "}
              <Link href="/mentions-legales" className="text-orange underline">
                En savoir plus
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2.5">
              <button
                type="button"
                onClick={() => decide("accepte")}
                className="h-11 flex-1 rounded-full bg-orange px-5 text-sm font-semibold text-cream transition-colors hover:bg-orange-dark sm:flex-none"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => decide("refuse")}
                className="h-11 flex-1 rounded-full border border-line-strong px-5 text-sm font-medium text-navy transition-colors hover:bg-sand-100 sm:flex-none"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
