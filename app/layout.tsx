import type { Metadata } from "next";
import { Archivo_Black, Lexend_Mega } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import QueryProvider from "@/lib/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ScreenSize } from "@/components/ScreenSize";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${lexendMega.variable} antialiased`}
      >
        <SessionProvider>
          <QueryProvider>
            <div className="mx-auto max-w-6xl">
              <Header />
              {children}
            </div>
            <Toaster />
            <ScreenSize />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
