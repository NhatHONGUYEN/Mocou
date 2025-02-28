"use client";

import { notFound, useRouter } from "next/navigation";
import { useWordList } from "@/hooks/useWordList";
import { useState, useRef, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import Loader from "./Loader";

export default function GameCategoryPage({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [showNextWordModal, setShowNextWordModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const userId = session?.user?.id;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!showNextWordModal && isClosing) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
      setIsClosing(false);
    }
  }, [showNextWordModal, isClosing]);

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

  const handleCheckAnswer = () => {
    if (userInput === wordList[currentIndex].translation) {
      setScore((prevScore) => prevScore + 1);
      toast({
        description: (
          <Image
            src="/correct.gif"
            alt="Bravo"
            className="ml-16"
            width={200}
            height={200}
          />
        ),
        duration: 2000,
      });

      // Vérifier si c'est le dernier mot
      if (currentIndex === wordList.length - 1) {
        setIsFinished(true);
        setShowDialog(true);

        // Enregistrer le score si l'utilisateur est connecté
        if (userId) {
          saveScore(score, category);
        }
      } else {
        // Passer au mot suivant sans ouvrir le dialogue
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setUserInput("");
      }
    } else {
      toast({
        description: (
          <div className="flex pl-20 gap-4">
            <Image src="/Incorrect.gif" alt="Bravo" width={200} height={200} />
          </div>
        ),
        duration: 3000,
      });
    }
    setUserInput("");
  };

  const goToNextWord = () => {
    if (currentIndex < wordList.length - 1) {
      setShowNextWordModal(true);
    } else {
      setIsFinished(true);
      setShowDialog(true);

      // Enregistrer le score si l'utilisateur est connecté
      if (userId) {
        saveScore(score, category);
      }
    }
  };

  const confirmNextWord = () => {
    setShowNextWordModal(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
    }, 300);
  };
  const restartGame = () => {
    setCurrentIndex(0);
    setUserInput("");
    setIsFinished(false);
    setScore(0);
    setShowDialog(false);
  };

  const saveScore = async (score: number, category: string) => {
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          score,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du score");
      }

      const data = await response.json();
      console.log("Score enregistré :", data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleShowHint = () => {
    toast({
      title: "Indice :",
      description: wordList[currentIndex].hint,
      variant: "destructive",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  const currentWord = wordList[currentIndex];

  return (
    <div className="py-32">
      <Card className="max-w-sm  mx-auto">
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
          <div className="flex flex-col gap-4  mb-4">
            <Button onClick={handleCheckAnswer}>
              <Check className="w-4 h-4 mr-2" /> Vérifier
            </Button>
            <Button onClick={goToNextWord}>
              <ArrowRight className="w-4 h-4 mr-2" /> Suivant
            </Button>
            <Button onClick={handleShowHint}>
              <Lightbulb className="w-4 h-4 mr-2" /> Indice
            </Button>
          </div>
          <p>
            Progression : {currentIndex + 1} / {wordList.length}
          </p>
        </CardContent>
      </Card>

      {/* MODAL pour le mot suivant */}
      <AlertDialog open={showNextWordModal} onOpenChange={setShowNextWordModal}>
        <AlertDialogContent className="p-6  text-center bg-bg">
          <AlertDialogTitle>La Solution</AlertDialogTitle>
          <AlertDialogDescription>
            Mot : {currentWord.word}
            <Image
              src={currentWord.imageUrl}
              alt={currentWord.word}
              className="mb-4 mx-auto w-40 md:w-full mt-4  rounded-lg"
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
                <Button
                  onClick={() => {
                    saveScore(score, category);
                    restartGame();
                  }}
                >
                  Recommencer
                </Button>
              </>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
