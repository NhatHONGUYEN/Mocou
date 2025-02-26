"use client";

import { notFound } from "next/navigation";
import { useWordList } from "@/hooks/useWordList";
import { useState, useRef, useEffect } from "react";

type Word = {
  id: number;
  word: string;
  translation: string;
  hint: string;
  score: number;
};

export default function GameCategoryPage({ category }: { category: string }) {
  const { data: wordList, isLoading, isError } = useWordList(category);
  const [userInputs, setUserInputs] = useState<string[]>([]); // Tableau pour stocker les saisies
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Références pour les inputs

  // Initialiser le tableau des saisies et des références
  useEffect(() => {
    if (wordList) {
      setUserInputs(new Array(wordList.length).fill("")); // Initialiser avec des chaînes vides
      inputRefs.current = new Array(wordList.length).fill(null); // Initialiser les références
    }
  }, [wordList]);

  // Focus sur le premier input au chargement
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [wordList]);

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

  return (
    <div>
      <h1>Catégorie : {category}</h1>
      <ul className="grid grid-cols-4 gap-10">
        {wordList.map((word: Word, index: number) => (
          <li key={word.id}>
            <div>
              <strong>{word.word}</strong> {/* Afficher le mot */}
            </div>
            <div>
              <input
                type="text"
                placeholder="Entrez la traduction"
                value={userInputs[index] || ""}
                onChange={(e) => {
                  const newInputs = [...userInputs]; // Copier le tableau des saisies
                  newInputs[index] = e.target.value; // Mettre à jour la saisie correspondante
                  setUserInputs(newInputs); // Mettre à jour l'état
                }}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }} // Assigner la référence
              />
            </div>
            <div>
              <button
                onClick={() => {
                  // Vérifier si la saisie correspond à la traduction
                  if (userInputs[index] === word.translation) {
                    alert("Correct !");
                    // Focus sur le prochain input
                    if (inputRefs.current[index + 1]) {
                      if (inputRefs.current[index + 1]) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }
                  } else {
                    alert("Incorrect. Essayez encore !");
                  }
                  const newInputs = [...userInputs];
                  newInputs[index] = ""; // Réinitialiser la saisie
                  setUserInputs(newInputs);
                }}
              >
                Vérifier
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  // Afficher l'indice
                  alert(`Indice : ${word.hint}`);
                }}
              >
                Afficher l&apos;indice
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
