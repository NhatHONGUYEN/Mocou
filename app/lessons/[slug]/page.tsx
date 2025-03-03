"use client";

import React from "react";
import { useWordList } from "@/hooks/useWordList";
import { useParams } from "next/navigation";

// Type pour représenter la structure d'un mot
interface Word {
  id: string;
  word: string;
  translation: string;
  imageUrl: string;
}

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: words, isLoading, isError, error } = useWordList(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Erreur: {(error as Error).message}
        </div>
      </div>
    );
  }

  // Titres des leçons pour l'affichage
  const lessonTitles: Record<string, string> = {
    animaux: "Animaux",
    aliments: "Aliments",
    "objets-du-quotidien": "Objets du quotidien",
  };

  const title = lessonTitles[slug] || slug;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Leçon : {title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words?.map((item: Word) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-medium">{item.word}</h3>
            <p className="text-gray-600">{item.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
