import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function GameCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = params.slug; // Récupère le slug (nom de la catégorie)

  // Récupérer les mots de la catégorie spécifiée
  const wordList = await prisma.wordList.findUnique({
    where: {
      category: category,
    },
    include: {
      words: true, // Inclure les mots associés
    },
  });

  if (!wordList) {
    return notFound(); // Affiche une page 404 si la catégorie n'existe pas
  }

  return (
    <div>
      <h1>Catégorie : {category}</h1>
      <ul>
        {wordList.words.map((word) => (
          <li key={word.id}>
            <strong>{word.word}</strong> - {word.translation} (Indice:{" "}
            {word.hint}, Score: {word.score})
          </li>
        ))}
      </ul>
    </div>
  );
}
