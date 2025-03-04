"use client";

import { useSession } from "next-auth/react";
import { SignOut } from "./signout-button";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeaderUserButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          {/* Affichage pour les écrans larges */}
          <div className="hidden lg:flex gap-4">
            <Button asChild size="sm">
              <Link href={"/sign-in"}>Se Connecter</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={"/sign-up"}>S&apos;inscrire</Link>
            </Button>
          </div>
        </>
      ) : (
        <SignOut />
      )}
    </div>
  );
}
