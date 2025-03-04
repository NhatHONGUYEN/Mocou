// components/game/WordCard.tsx

import { Check, ArrowRight, Lightbulb } from "lucide-react";
import { RefObject } from "react";
import { WordData } from "@/lib/type";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress"; // Ajout de l'import

interface WordCardProps {
  category: string;
  currentWord: WordData;
  score: number;
  totalWords: number;
  currentIndex: number;
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onCheck: () => void;
  onNext: () => void;
  onHint: () => void;
}

export function WordCard({
  category,
  currentWord,
  score,
  totalWords,
  currentIndex,
  userInput,
  onInputChange,
  onKeyDown,
  inputRef,
  onCheck,
  onNext,
  onHint,
}: WordCardProps) {
  // Calculer le pourcentage de progression pour la barre
  const progressPercentage =
    totalWords > 0 ? Math.round(((currentIndex + 1) / totalWords) * 100) : 0;

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Catégorie : {category}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          Score : {score} / {totalWords}
        </p>
        <p className="text-lg font-semibold mb-4">Mot : {currentWord.word}</p>
        <div className="mb-4">
          <Input
            id="translation-input"
            type="text"
            placeholder="Entrez la traduction"
            value={userInput}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            ref={inputRef}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Button onClick={onCheck}>
            <Check className="w-4 h-4 mr-2" /> Vérifier
          </Button>
          <Button onClick={onNext}>
            <ArrowRight className="w-4 h-4 mr-2" /> Suivant
          </Button>
          <Button onClick={onHint}>
            <Lightbulb className="w-4 h-4 mr-2" /> Indice
          </Button>
        </div>

        {/* Remplacer le paragraphe par la barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between  ">
            <span>Progression</span>
            <span>
              {currentIndex + 1} / {totalWords}
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
