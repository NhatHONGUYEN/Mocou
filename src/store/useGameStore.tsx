import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { normalizeString } from "./utils";
import {
  CorrectAnswerToast,
  IncorrectAnswerToast,
} from "@/components/ToastAnswer";
import { saveScore } from "./gameActions";

import { GameState, PersistOptions } from "@/lib/type"; // Importez les types

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentIndex: 0,
      score: 0,
      isFinished: false,
      userInput: "",
      showDialog: false,
      showNextWordModal: false,
      wordList: null,
      currentCategory: null,
      currentWordId: null,

      setUserInput: (input) => set({ userInput: input }),

      checkAnswer: (category, userId) => {
        const { userInput, wordList, currentIndex, score } = get();
        if (!wordList) return;

        const normalizedInput = normalizeString(userInput);
        const normalizedAnswer = normalizeString(
          wordList[currentIndex].translation
        );

        if (normalizedInput === normalizedAnswer) {
          const newScore = score + 1;
          set({ score: newScore });

          toast({
            description: <CorrectAnswerToast />,
            duration: 2000,
          });

          if (currentIndex === wordList.length - 1) {
            set({ isFinished: true, showDialog: true });
            if (userId) saveScore(userId, newScore, category);
          } else {
            const nextIndex = currentIndex + 1;
            set({
              currentIndex: nextIndex,
              currentWordId: wordList[nextIndex].id, // Mettre à jour currentWordId
              userInput: "",
            });
          }
        } else {
          toast({
            description: <IncorrectAnswerToast />,
            duration: 3000,
          });
          set({ userInput: "" });
        }
      },
      goToNextWord: (category, userId) => {
        const { wordList, currentIndex, score } = get();
        if (!wordList) return;

        if (currentIndex < wordList.length - 1) {
          set({ showNextWordModal: true });
        } else {
          set({ isFinished: true, showDialog: true });
          if (userId) saveScore(userId, score, category);
        }
      },

      confirmNextWord: () => {
        const { wordList, currentWordId } = get();
        if (!wordList || !currentWordId) return;

        // Fermer la modal immédiatement
        set({ showNextWordModal: false });

        // Utiliser un délai pour permettre à la modal de se fermer avant de passer au mot suivant
        setTimeout(() => {
          const currentPos = wordList.findIndex(
            (word) => word.id === currentWordId
          );
          if (currentPos === -1) return;

          const nextPos = (currentPos + 1) % wordList.length;
          const nextWordId = wordList[nextPos].id;

          set({
            currentIndex: nextPos,
            currentWordId: nextWordId,
            userInput: "",
          });
        }, 300); // Ajustez le délai en fonction de la durée de l'animation de fermeture de la modal
      },

      restartGame: () => {
        set({
          currentIndex: 0,
          userInput: "",
          isFinished: false,
          score: 0,
          showDialog: false,
        });
      },

      resetGameState: () => {
        set({
          currentIndex: 0,
          score: 0,
          isFinished: false,
          userInput: "",
          showDialog: false,
          showNextWordModal: false,
          wordList: null,
          currentCategory: null,
          currentWordId: null, // Modification du gameState pour stocker l'ID courant
        });
      },

      setWordList: (wordList, category) => {
        // Mélanger les mots
        const shuffledWords = shuffleArray(wordList);

        set({
          wordList: shuffledWords,
          currentCategory: category,
          currentIndex: 0, // Conserver pour compatibilité
          currentWordId: shuffledWords.length > 0 ? shuffledWords[0].id : null,
          score: 0,
          isFinished: false,
          userInput: "",
        });
      },

      showHint: () => {
        const { wordList, currentWordId } = get();
        if (!wordList) return;

        toast({
          title: "Indice :",
          description:
            currentWordId !== null
              ? wordList.find((word) => word.id === currentWordId)?.hint
              : "No hint available",
          variant: "destructive",
        });
      },

      setShowDialog: (show) => set({ showDialog: show }),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({
        currentIndex: state.currentIndex,
        score: state.score,
        wordList: state.wordList,
        isFinished: state.isFinished,
        currentCategory: state.currentCategory,
        currentWordId: state.currentWordId,
      }),
    } as PersistOptions
  )
);

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
