"use client";

import { useSession } from "next-auth/react";
import { SignOut } from "./signout-button";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Menu } from "lucide-react"; // Importez une icône de menu pour le déclencheur du Sheet

export default function HeaderUserButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          {/* Affichage pour les écrans larges */}
          <div className="hidden md:flex gap-4">
            <Button asChild size="sm">
              <Link href={"/sign-in"}>Se Connecter</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={"/sign-up"}>S&apos;inscrire</Link>
            </Button>
          </div>

          {/* Affichage pour les écrans mobiles */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>
                    <h1 className="text-2xl">Menu Utilisateur</h1>
                  </SheetTitle>
                  <SheetDescription>
                    Connectez-vous ou inscrivez-vous pour accéder à plus de
                    fonctionnalités.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <Button asChild size="sm">
                    <Link href={"/sign-in"}>Se Connecter</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={"/sign-up"}>S&apos;inscrire</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      ) : (
        <SignOut />
      )}
    </div>
  );
}
