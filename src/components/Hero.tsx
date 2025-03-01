"use client";

import NoUserHero from "@/components/NoUserHero";
import UserHero from "@/components/UserHero";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();

  console.log("Session:", session); // Pour déboguer

  return <>{!session ? <NoUserHero /> : <UserHero />}</>;
}
