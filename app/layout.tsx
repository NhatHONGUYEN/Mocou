// app/layout.tsx
import type { Metadata } from "next";
import { Archivo_Black, Lexend_Mega } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import FADE_DOWN_ANIMATION_VARIANTS from "../animation/FADE_DOWN_ANIMATION_VARIANTS";
import Footer from "@/components/footer/Footer";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"], // Archivo Black n'a qu'un seul poids dispo
});

const lexendMega = Lexend_Mega({
  variable: "--font-lexend-mega",
  subsets: ["latin"],
  weight: ["400"], // Lexend Mega aussi
});

export const metadata: Metadata = {
  title: "Mocou",
  description:
    "Découvrez Mocou, l'application ludique où Pochacco vous guide dans l'apprentissage du vocabulaire coréen ! Mémorisez des mots, relevez des défis quotidiens et suivez votre progression tout en vous amusant. Idéal pour débutants et passionnés de culture coréenne.",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Mocou",
    description:
      "Découvrez Mocou, l'application ludique où Pochacco vous guide dans l'apprentissage du vocabulaire coréen ! Mémorisez des mots, relevez des défis quotidiens et suivez votre progression tout en vous amusant. Idéal pour débutants et passionnés de culture coréenne.",
    url: "https://mocou.vercel.app/",
    siteName: "Mocou",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Mocou - Jeu d'apprentissage du vocabulaire coréen avec Pochacco",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mocou",
    description:
      "Découvrez Mocou, l'application ludique où Pochacco vous guide dans l'apprentissage du vocabulaire coréen ! Mémorisez des mots, relevez des défis quotidiens et suivez votre progression tout en vous amusant. Idéal pour débutants et passionnés de culture coréenne.",
    images: [
      {
        url: "/logo.jpg",
        alt: "Mocou - Jeu d'apprentissage du vocabulaire coréen avec Pochacco",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${lexendMega.variable} antialiased`}
      >
        <Providers>
          <div className="mx-auto w-72 sm:w-96 md:w-[600px] lg:w-[800px] xl:w-full max-w-4xl">
            <FADE_DOWN_ANIMATION_VARIANTS>
              <Header />
              {children}
              <Footer />
            </FADE_DOWN_ANIMATION_VARIANTS>
          </div>
        </Providers>
      </body>
    </html>
  );
}
