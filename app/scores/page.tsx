"use client";

import { useEffect, useState } from "react";

interface Score {
  id: string;
  userId: string;
  score: number;
  category: string;
  createdAt: string;
}

export default function ScoresPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("/api/scores");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des scores");
        }
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Scores</h1>
      <ul>
        {scores.map((score) => (
          <li key={score.id} className="mb-2">
            <strong>Utilisateur :</strong> {score.userId} |{" "}
            <strong>Score :</strong> {score.score} |{" "}
            <strong>Catégorie :</strong> {score.category} |{" "}
            <strong>Date :</strong> {new Date(score.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
