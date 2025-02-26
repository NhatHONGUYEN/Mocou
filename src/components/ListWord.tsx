"use client";

import { notFound } from "next/navigation";
import { useWordList } from "@/hooks/useWordList"; // Importez le hook

type Word = {
  id: number;
  word: string;
  translation: string;
  hint: string;
  score: number;
};

export default function GameCategoryPage({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);

  if (!wordList && !isLoading) {
    return notFound();
  }

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return (
      <div>Une erreur s&apos;est produite lors du chargement des données.</div>
    );
  }

  return (
    <div>
      <h1>Catégorie : {category}</h1>
      <ul>
        {wordList.map((word: Word) => (
          <li key={word.id}>
            <strong>{word.word}</strong> - {word.translation} (Indice:{" "}
            {word.hint})
          </li>
        ))}
      </ul>
    </div>
  );
}
