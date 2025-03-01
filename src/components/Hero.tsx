"use client";

import NoUserHero from "@/components/NoUserHero";
import UserHero from "@/components/UserHero";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Hero() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

  // Show loading state
  if (status === "loading") {
    return <div className="py-32 text-center">Chargement...</div>;
  }

  return <>{status === "unauthenticated" ? <NoUserHero /> : <UserHero />}</>;
}
