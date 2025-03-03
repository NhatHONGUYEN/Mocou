import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { WordData } from "@/lib/type";

// Helper function to normalize strings (remove case sensitivity and accents)
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

interface GameState {
  // Game state
  currentIndex: number;
  score: number;
  isFinished: boolean;
  userInput: string;
  currentCategory: string | null;

  // UI state
  showDialog: boolean;
  showNextWordModal: boolean;
  isClosing: boolean;

  // Words data
  wordList: WordData[] | null;

  // Actions
  setUserInput: (input: string) => void;
  checkAnswer: (category: string, userId?: string) => void;
  goToNextWord: (category: string, userId?: string) => void;
  confirmNextWord: () => void;
  restartGame: () => void;
  resetGameState: () => void;
  setWordList: (wordList: WordData[], category: string) => void;
  showHint: () => void;
  saveScore: (userId: string, score: number, category: string) => Promise<void>;
  setShowDialog: (show: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentIndex: 0,
      score: 0,
      isFinished: false,
      userInput: "",
      showDialog: false,
      showNextWordModal: false,
      isClosing: false,
      wordList: null,
      currentCategory: null,

      // Actions
      setUserInput: (input) => set({ userInput: input }),

      checkAnswer: (category, userId) => {
        const { userInput, wordList, currentIndex, score } = get();

        if (!wordList) return;

        // Normalize both strings - removes case sensitivity and accents
        const normalizedInput = normalizeString(userInput);
        const normalizedAnswer = normalizeString(
          wordList[currentIndex].translation
        );

        if (normalizedInput === normalizedAnswer) {
          set({ score: score + 1 });

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

          // Check if it's the last word
          if (currentIndex === wordList.length - 1) {
            set({ isFinished: true, showDialog: true });

            // Save score if user is logged in
            if (userId) {
              get().saveScore(userId, score + 1, category);
            }
          } else {
            // Go to next word
            set({ currentIndex: currentIndex + 1, userInput: "" });
          }
        } else {
          toast({
            description: (
              <div className="flex pl-20 gap-4">
                <Image
                  src="/Incorrect.gif"
                  alt="Bravo"
                  width={200}
                  height={200}
                />
              </div>
            ),
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

          // Save score if user is logged in
          if (userId) {
            get().saveScore(userId, score, category);
          }
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
          // Reset game state when loading a new category
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

      saveScore: async (userId, score, category) => {
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
      },

      setShowDialog: (show) => set({ showDialog: show }),
    }),
    {
      name: "game-storage", // name of the localStorage key
      partialize: (state) => ({
        currentIndex: state.currentIndex,
        score: state.score,
        wordList: state.wordList,
        isFinished: state.isFinished,
        currentCategory: state.currentCategory,
      }),
    }
  )
);
