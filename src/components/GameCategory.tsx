"use client";

import { notFound, useRouter } from "next/navigation";
import { useWordList } from "@/hooks/useWordList";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { useGameStore } from "@/store/useGameStore";
import { WordCard } from "./WordCard";
import { NextWordModal } from "./NextWordModal";
import { EndGameModal } from "./EndGameModal";
import { WordData } from "@/lib/type";

export default function GameCategory({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Récupérer l'état et les actions du store Zustand
  const {
    currentIndex,
    currentWordId, // Ajoutez cette ligne
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

  // Définir la liste de mots lorsqu'elle est chargée et réinitialiser si la catégorie change
  useEffect(() => {
    if (wordList) {
      // Si la catégorie a changé, réinitialiser le jeu
      if (currentCategory !== category) {
        setWordList(wordList, category);
      }
    }
  }, [wordList, category, currentCategory, setWordList]);

  // Mettre le focus sur l'input lorsque l'index courant change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    // Pour préserver l'état lors des navigations sur le site, mais réinitialiser lorsque l'utilisateur ferme l'onglet/fenêtre
    const handleBeforeUnload = () => {
      resetGameState();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    // Fonction de nettoyage à exécuter lorsque le composant est démonté
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

  // Ajoutez une vérification pour s'assurer qu'un mot valide est toujours disponible
  const getValidCurrentWord = () => {
    // Si nous avons un ID, chercher le mot correspondant
    if (currentWordId && wordList) {
      const wordById = wordList.find(
        (word: WordData) => word.id === currentWordId
      );
      if (wordById) return wordById;
    }

    // Sinon, essayer d'utiliser l'index
    if (wordList && wordList.length > 0) {
      // Garantir que l'index est dans les limites du tableau
      const safeIndex = Math.max(
        0,
        Math.min(currentIndex, wordList.length - 1)
      );
      return wordList[safeIndex];
    }

    // Si tout échoue, retourner null pour pouvoir gérer ce cas
    return null;
  };

  const currentWord = getValidCurrentWord();

  // Puis, ajoutez une vérification avant de rendre les composants
  if (!currentWord) {
    return <Loader />;
  }

  return (
    <div className="py-32">
      <WordCard
        category={category}
        currentWord={currentWord}
        score={score}
        totalWords={wordList.length}
        currentIndex={currentIndex}
        userInput={userInput}
        onInputChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        onCheck={() => checkAnswer(category, userId)}
        onNext={() => goToNextWord(category, userId)}
        onHint={showHint}
      />

      <NextWordModal
        isOpen={showNextWordModal}
        onClose={() => setShowDialog(!showNextWordModal)}
        currentWord={currentWord}
        onConfirm={confirmNextWord}
      />

      <EndGameModal
        isOpen={showDialog}
        onClose={(value) => {
          setShowDialog(value);
          // Si le modal se ferme sans utiliser les boutons, réinitialiser quand même
          if (!value) {
            restartGame();
          }
        }}
        score={score}
        totalWords={wordList.length}
        isLoggedIn={!!userId}
        onViewScores={() => {
          restartGame(); // Important: réinitialiser avant de naviguer
          router.push("/history");
        }}
        onRestart={() => {
          restartGame();
          // Forcer une mise au point sur l'input après réinitialisation
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 0);
        }}
        onHome={() => {
          restartGame(); // Important: réinitialiser avant de naviguer
          router.push("/");
        }}
      />
    </div>
  );
}
