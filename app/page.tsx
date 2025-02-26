// app/page.tsx
"use client"; // Indique que ce composant est côté client

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Si la session est en cours de chargement
  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page d'inscription
  if (!session) {
    router.push("/sign-up");
    return null;
  }

  // Si l'utilisateur est connecté, affichez le contenu de la page d'accueil
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1>Bonjour, {session.user?.name || "utilisateur"} !</h1>
    </div>
  );
}
