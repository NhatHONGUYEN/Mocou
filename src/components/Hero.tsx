"use client";

import NoUserHero from "@/components/NoUserHero";
import UserHero from "@/components/UserHero";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loader from "./Loader";

export default function Hero() {
  const { data: session, status } = useSession();

  useEffect(() => {}, [session, status]);

  // Show loading state
  if (status === "loading") {
    return <Loader />;
  }

  return <>{status === "unauthenticated" ? <NoUserHero /> : <UserHero />}</>;
}
