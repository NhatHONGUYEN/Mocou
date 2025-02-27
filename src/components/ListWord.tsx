"use client";

import { notFound, useRouter } from "next/navigation";
import { useWordList } from "@/hooks/useWordList";
import { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function GameCategoryPage({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false); // État pour la modal

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

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

  const handleCheckAnswer = () => {
    if (userInput === wordList[currentIndex].translation) {
      setScore((prevScore) => prevScore + 1);
      goToNextWord();
    } else {
      alert("Incorrect. Essayez encore !");
    }
    setUserInput("");
  };

  const goToNextWord = () => {
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
    } else {
      setIsFinished(true);
      setShowDialog(true); // 🔥 Activer la modal
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setUserInput("");
    setIsFinished(false);
    setScore(0);
    setShowDialog(false); // Fermer la modal après le restart
  };

  const handleShowHint = () => {
    alert(`Indice : ${wordList[currentIndex].hint}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  const currentWord = wordList[currentIndex];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Catégorie : {category}</h1>
      <div className="mb-4">
        <p>
          Score : {score} / {wordList.length}
        </p>
      </div>
      <div className="mb-4">
        <strong className="text-lg">Mot : {currentWord.word}</strong>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Entrez la traduction"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex gap-4 mb-4">
        <Button onClick={handleCheckAnswer}>Vérifier</Button>
        <Button onClick={goToNextWord}>Suivant</Button>
        <Button onClick={handleShowHint} variant="outline">
          Afficher l&apos;indice
        </Button>
      </div>
      <div>
        <p>
          Progression : {currentIndex + 1} / {wordList.length}
        </p>
      </div>

      {/* MODAL */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="p-6">
          <AlertDialogTitle>Félicitations 🎉</AlertDialogTitle>
          <AlertDialogDescription>
            Vous avez terminé la liste avec un score de{" "}
            <strong>
              {score} / {wordList.length}
            </strong>{" "}
            !
          </AlertDialogDescription>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => router.push("/scores")}>
              Voir les scores
            </Button>
            <Button onClick={restartGame}>Recommencer</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
