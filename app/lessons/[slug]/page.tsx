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
import FADE_DOWN_ANIMATION_VARIANTS from "../../../animation/FADE_DOWN_ANIMATION_VARIANTS";
import { WordData } from "@/lib/type";
import { lessonTitles } from "@/lib/data";

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

  const title = lessonTitles[slug] || slug;
  const description = `Découvrez les mots coréens des ${title.toLowerCase()} avec Pochacco ! 🐶 Apprenez à votre rythme et impressionnez vos amis avec votre nouveau vocabulaire. Prêt à enrichir votre coréen ? Let's go ! 🇰🇷`;

  return (
    <FADE_DOWN_ANIMATION_VARIANTS>
      <div className="container mx-auto py-32">
        <div className="mb-16">
          <h1 className="text-3xl font-bold mb-4">
            📚 Explorons ensemble les {title} en coréen ! 🇰🇷
          </h1>
          <p className="text-muted-foreground ">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {words?.map((item: WordData) => (
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
    </FADE_DOWN_ANIMATION_VARIANTS>
  );
}
