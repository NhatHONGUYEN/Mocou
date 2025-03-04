export type WordData = {
  id: string;
  word: string;
  translation: string;
  hint: string;
  imageUrl: string;
  category: string;
};

// Type pour les données d'un mote pour l'état du jeu
export type GameState = {
  currentWordId: string | null;
  currentIndex: number;
  score: number;
  isFinished: boolean;
  userInput: string;
  currentCategory: string | null;
  showDialog: boolean;
  showNextWordModal: boolean;
  wordList: WordData[] | null;

  setUserInput: (input: string) => void;
  checkAnswer: (category: string, userId?: string) => void;
  goToNextWord: (category: string, userId?: string) => void;
  confirmNextWord: () => void;
  restartGame: () => void;
  resetGameState: () => void;
  setWordList: (wordList: WordData[], category: string) => void;
  showHint: () => void;
  setShowDialog: (show: boolean) => void;
};

// Type pour les options de persistance de Zustand
export type PersistOptions = {
  name: string;
  partialize: (state: GameState) => Partial<GameState>;
};

export type EndGameModalProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  score: number;
  totalWords: number;
  isLoggedIn: boolean;
  onViewScores: () => void;
  onRestart: () => void;
  onHome: () => void;
};

import { RefObject } from "react";

export type WordCardProps = {
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
};
