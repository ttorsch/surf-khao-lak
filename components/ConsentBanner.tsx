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
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ocean-900/10 bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-2.5 sm:flex-row sm:items-center">
            <p className="flex-1 text-xs leading-snug text-ocean-800">
              Nous utilisons des cookies de mesure d&apos;audience et de publicité pour comprendre
              d&apos;où viennent nos visiteurs. Ils ne sont déposés qu&apos;avec votre accord.{" "}
              <Link href="/mentions-legales" className="underline">
                En savoir plus
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide("accepte")}
                className="min-h-11 flex-1 rounded-full bg-ocean-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-ocean-800 sm:flex-none"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => decide("refuse")}
                className="min-h-11 flex-1 rounded-full px-5 text-sm font-semibold text-ocean-800 ring-1 ring-ocean-900/15 transition-colors hover:bg-ocean-50 sm:flex-none"
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
