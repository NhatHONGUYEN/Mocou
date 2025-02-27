"use client";

import { notFound, useRouter } from "next/navigation"; // Importez useRouter
import { useWordList } from "@/hooks/useWordList";
import { useState, useRef, useEffect } from "react";

export default function GameCategoryPage({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const [currentIndex, setCurrentIndex] = useState(0); // Index du mot actuel
  const [userInput, setUserInput] = useState(""); // Saisie de l'utilisateur
  const [isFinished, setIsFinished] = useState(false); // État pour savoir si le jeu est terminé
  const inputRef = useRef<HTMLInputElement | null>(null); // Référence pour l'input
  const router = useRouter(); // Hook pour la navigation

  // Focus sur l'input au chargement ou changement de mot
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

  // Vérifier si l'utilisateur a répondu correctement
  const handleCheckAnswer = () => {
    if (userInput === wordList[currentIndex].translation) {
      alert("Correct !");
      goToNextWord(); // Passer au mot suivant
    } else {
      alert("Incorrect. Essayez encore !");
    }
    setUserInput(""); // Réinitialiser la saisie
  };

  // Passer au mot suivant
  const goToNextWord = () => {
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
    } else {
      setIsFinished(true); // Marquer le jeu comme terminé
      const shouldRestart = window.confirm(
        "Félicitations, vous avez terminé la liste !\n\nCliquez sur OK pour recommencer ou Annuler pour retourner à l'accueil."
      );

      if (shouldRestart) {
        restartGame(); // Recommencer le jeu
      } else {
        router.push("/"); // Retour à l'accueil
      }
    }
  };

  // Recommencer le jeu
  const restartGame = () => {
    setCurrentIndex(0);
    setUserInput("");
    setIsFinished(false);
  };

  // Afficher l'indice
  const handleShowHint = () => {
    alert(`Indice : ${wordList[currentIndex].hint}`);
  };

  // Gérer l'appui sur la touche "Enter"
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer(); // Valider la réponse
    }
  };

  // Si la liste est terminée
  if (isFinished) {
    return null; // Ne rien afficher car l'alerte est déjà gérée
  }

  // Rendu du mot actuel
  const currentWord = wordList[currentIndex];

  return (
    <div>
      <h1>Catégorie : {category}</h1>
      <div>
        <strong>Mot : {currentWord.word}</strong>
      </div>
      <div>
        <input
          type="text"
          placeholder="Entrez la traduction"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown} // Écouter l'événement keydown
          ref={inputRef}
        />
      </div>
      <div>
        <button onClick={handleCheckAnswer}>Vérifier</button>
        <button onClick={goToNextWord}>Suivant</button>
        <button onClick={handleShowHint}>Afficher l&apos;indice</button>
      </div>
      <div>
        <p>
          Progression : {currentIndex + 1} / {wordList.length}
        </p>
      </div>
    </div>
  );
}
