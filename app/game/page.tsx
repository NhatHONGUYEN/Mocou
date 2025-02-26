"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Utilisez "next/navigation" pour Next.js 13+
import { Button } from "@/components/ui/button";

export default function Game() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialisez le router

  useEffect(() => {
    // Fonction pour récupérer les catégories
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1>Choisissez une catégorie</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Button
              onClick={() => router.push(`/game/${category}`)} // Redirection vers /app/game/[slug]
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
