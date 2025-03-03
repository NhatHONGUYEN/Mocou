"use client";

import { notFound, useRouter } from "next/navigation";
import { useWordList } from "@/hooks/useWordList";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import Loader from "./Loader";
import { useGameStore } from "@/store/useGameStore";

export default function GameCategory({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Get state and actions from Zustand store
  const {
    currentIndex,
    userInput,
    score,
    showDialog,
    showNextWordModal,
    currentCategory,
    setUserInput,
    checkAnswer,
    goToNextWord,
    confirmNextWord,
    restartGame,
    resetGameState,
    showHint,
    setWordList,
    setShowDialog,
  } = useGameStore();

  // Set word list when it's loaded and reset if category changes
  useEffect(() => {
    if (wordList) {
      // If category has changed, reset the game
      if (currentCategory !== category) {
        setWordList(wordList, category);
      }
    }
  }, [wordList, category, currentCategory, setWordList]);

  // Focus on input when current index changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    // If you want to preserve state across navigations within your site,
    // but reset when the user closes the tab/window
    const handleBeforeUnload = () => {
      resetGameState();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    // Cleanup function to run when component is unmounted
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [resetGameState]);

  if (!wordList && !isLoading) {
    return notFound();
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>Une erreur s&apos;est produite lors du chargement des données.</div>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkAnswer(category, userId);
    }
  };

  const currentWord = wordList[currentIndex];

  return (
    <div className="py-32">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Catégorie : {category}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Score : {score} / {wordList.length}
          </p>
          <p className="text-lg font-semibold mb-4">Mot : {currentWord.word}</p>
          <Input
            type="text"
            placeholder="Entrez la traduction"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex flex-col gap-4 mb-4">
            <Button onClick={() => checkAnswer(category, userId)}>
              <Check className="w-4 h-4 mr-2" /> Vérifier
            </Button>
            <Button onClick={() => goToNextWord(category, userId)}>
              <ArrowRight className="w-4 h-4 mr-2" /> Suivant
            </Button>
            <Button onClick={showHint}>
              <Lightbulb className="w-4 h-4 mr-2" /> Indice
            </Button>
          </div>
          <p>
            Progression : {currentIndex + 1} / {wordList.length}
          </p>
        </CardContent>
      </Card>

      {/* MODAL pour le mot suivant */}
      <AlertDialog
        open={showNextWordModal}
        onOpenChange={() => setShowDialog(!showNextWordModal)}
      >
        <AlertDialogContent className="p-6 text-center bg-bg">
          <AlertDialogTitle>La Solution</AlertDialogTitle>
          <AlertDialogDescription>
            Mot : {currentWord.word}
            <Image
              src={currentWord.imageUrl}
              alt={currentWord.word}
              className="mb-4 mx-auto w-40 h-40 mt-4 object-cover rounded-lg"
              width={300}
              height={200}
            />
            Traduction : {currentWord.translation}
          </AlertDialogDescription>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={confirmNextWord}>Fermer</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* MODAL de fin de jeu */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="p-6 bg-bg">
          <AlertDialogTitle>Félicitations 🎉</AlertDialogTitle>
          <AlertDialogDescription>
            Vous avez terminé la liste avec un score de{" "}
            <strong>
              {score} / {wordList.length}
            </strong>{" "}
            !
          </AlertDialogDescription>
          <div className="flex justify-end gap-4 mt-4">
            {/* Si l'utilisateur n'est pas connecté */}
            {!userId && (
              <Button onClick={() => router.push("/")}>
                Retour à l&apos;accueil
              </Button>
            )}

            {/* Si l'utilisateur est connecté */}
            {userId && (
              <>
                <Button onClick={() => router.push("/history")}>
                  Voir les scores
                </Button>
                <Button onClick={restartGame}>Recommencer</Button>
              </>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
