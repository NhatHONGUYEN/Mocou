export interface WordData {
  id: string;
  word: string;
  translation: string;
  hint: string;
  imageUrl: string;
  category: string;
}

// Type pour les données d'un mote pour l'état du jeu
export interface GameState {
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
}

// Type pour les options de persistance de Zustand
export interface PersistOptions {
  name: string;
  partialize: (state: GameState) => Partial<GameState>;
}
