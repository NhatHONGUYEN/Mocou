"use client";

import { useSession } from "next-auth/react";
import { SignOut } from "./signout-button";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeaderUserButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session /* Boutons de connexion et d'inscription */ ? (
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={"/sign-in"}>Log In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      ) : (
        <SignOut />
      )}
    </div>
  );
}
