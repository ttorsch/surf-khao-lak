import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import ConsentBanner from "@/components/ConsentBanner";
import Footer from "@/components/Footer";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002"),
  title: {
    default: `${site.name} — Cours de surf à Khao Lak`,
    template: `%s — ${site.name}`,
  },
  description:
    "Apprenez à surfer à Khao Lak avec des moniteurs francophones. Cours découverte, cours privés et stages, planche et lycra fournis. Réservation en ligne.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#067bb4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
