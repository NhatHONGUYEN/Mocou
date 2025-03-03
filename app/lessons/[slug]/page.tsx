"use client";

import React from "react";
import { useWordList } from "@/hooks/useWordList";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

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
    return <Loader />;
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
  const description = `Apprenez le vocabulaire des ${title.toLowerCase()} pour enrichir votre communication quotidienne.`;

  return (
    <div className="container mx-auto py-32">
      <div className="mb-16">
        <h1 className="text-3xl font-bold mb-2">Leçon : {title}</h1>
        <p className="text-lg text-muted-foreground ">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words?.map((item: Word) => (
          <Card
            key={item.id}
            className="relative overflow-hidden rounded-2xl group"
          >
            <CardHeader className="pb-2 text-center"></CardHeader>
            <CardContent className="pt-0 pb-4 flex justify-center">
              {/* Conteneur pour l'effet de zoom */}
              <div className="w-40 h-40 rounded-lg overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover"
                    width={300}
                    height={200}
                    style={{ transformOrigin: "center" }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-center space-y-2">
              <p className="font-bold">Mot : {item.word}</p>
              <div>Traduction : {item.translation}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
