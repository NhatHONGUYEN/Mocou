"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories"; // Importez le hook

export default function Game() {
  const router = useRouter();
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <div>
      <h1>Choisissez une catégorie</h1>
      <ul>
        {categories.map((category: string, index: number) => (
          <li key={index}>
            <Button
              onClick={() => {
                const slug = category.replace(/\s+/g, "-");
                router.push(`/game/${slug}`);
              }}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
