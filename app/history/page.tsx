"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
}

export default function HistoryPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [scores, setScores] = useState<ScoreWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`/api/scores?userId=${userId}`);
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

    if (userId) {
      fetchScores();
    }
  }, [userId]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mon historique de scores</h1>
      <Card>
        <CardHeader>Historique</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
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
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{score.score}</TableCell>
                  <TableCell className="text-center">
                    {score.category}
                  </TableCell>
                  <TableCell className="text-center">
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
