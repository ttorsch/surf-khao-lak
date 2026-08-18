"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

/**
 * Barre d'action collante : le visiteur ne doit jamais avoir à remonter la page
 * pour trouver comment réserver. Elle apparaît une fois le héros dépassé.
 */
export default function StickyCta({
  href,
  label,
  price,
}: {
  href: string;
  label: string;
  price?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ocean-900/10 bg-sand-50/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            {price && (
              <p className="font-display text-lg text-ocean-900 whitespace-nowrap">{price}</p>
            )}
            <Link
              href={href}
              className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-sunset-500 px-6 font-semibold text-white shadow-lg shadow-sunset-600/25 transition-colors hover:bg-sunset-600"
            >
              {label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
