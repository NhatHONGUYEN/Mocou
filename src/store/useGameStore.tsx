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
            set({ currentIndex: currentIndex + 1, userInput: "" });
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
        set({ showNextWordModal: false });
        setTimeout(() => {
          set((state) => ({
            currentIndex: state.currentIndex + 1,
            userInput: "",
          }));
        }, 300);
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
        });
      },

      setWordList: (wordList, category) =>
        set({
          wordList,
          currentCategory: category,
          currentIndex: 0,
          score: 0,
          isFinished: false,
          userInput: "",
        }),

      showHint: () => {
        const { wordList, currentIndex } = get();
        if (!wordList) return;

        toast({
          title: "Indice :",
          description: wordList[currentIndex].hint,
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
      }),
    } as PersistOptions // Utilisez le type PersistOptions
  )
);
