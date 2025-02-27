"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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
      <Card>
        <CardHeader>Classement</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Joueur</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow
                  key={score.id}
                  className="hover:bg-blank hover:text-bg"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{score.score}</TableCell>
                  <TableCell>{score.category}</TableCell>
                  <TableCell>
                    {new Date(score.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
