"use client";

import { useCategories } from "@/hooks/useCategories"; // Importez le hook
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Game() {
  const { data: categories, error, isLoading } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Choisissez une catégorie
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Découvrez nos différentes catégories et choisissez celle qui vous
          intéresse le plus.
        </p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 grid-cols-2 md:grid-cols-3">
        {categories.map(
          (
            categoryData: { category: string; imageUrl: string },
            index: number
          ) => {
            const slug = categoryData.category.replace(/\s+/g, "-"); // Calculer le slug pour chaque catégorie
            return (
              <div key={index} className="flex flex-col items-center">
                <Avatar className="mb-4 bg-main size-20 p-4 md:mb-5 lg:size-24">
                  <AvatarImage src={categoryData.imageUrl} />
                  <AvatarFallback>{categoryData.category[0]}</AvatarFallback>
                </Avatar>
                <Button
                  onClick={() => router.push(`/game/${slug}`)}
                  className="text-center font-medium"
                >
                  {categoryData.category}
                </Button>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
