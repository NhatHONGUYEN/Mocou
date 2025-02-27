"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ScoreWithUser {
  id: string;
  userId: string;
  score: number;
  category: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreWithUser[]>([]);
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
      <h1 className="text-xl font-bold mb-4">Classement des scores</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Joueur</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Catégorie</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border">
                <div className="flex items-center">
                  {score.user.image && (
                    <Image
                      src={score.user.image}
                      alt={score.user.name || "Utilisateur"}
                      className="w-8 h-8 rounded-full mr-2"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{score.user.name || score.user.email}</span>
                </div>
              </td>
              <td className="p-2 border text-center">{score.score}</td>
              <td className="p-2 border text-center">{score.category}</td>
              <td className="p-2 border text-center">
                {new Date(score.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
