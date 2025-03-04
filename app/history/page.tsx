"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Loader from "@/components/Loader";
import { useUserScores } from "@/hooks/useUserScores";
import FADE_DOWN_ANIMATION_VARIANTS from "../../animation/FADE_DOWN_ANIMATION_VARIANTS";

export default function HistoryPage() {
  const { data: scores = [], isLoading, error } = useUserScores();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Une erreur est survenue: {(error as Error).message}</div>;
  }

  return (
    <FADE_DOWN_ANIMATION_VARIANTS>
      <section className="py-32">
        <h1 className="text-2xl font-bold mb-4">
          🌟 Vos exploits linguistiques avec Mocou 🎯
        </h1>
        <Card>
          <CardHeader>
            <h1>Historique 🏅</h1>
          </CardHeader>
          <CardContent>
            {/* TABLEAU RESPONSIVE - Affiché sur tablettes/desktop */}
            <div className="overflow-x-auto hidden md:block">
              <Table className="min-w-full">
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
                    <TableRow key={score.id} className="hover:bg-bg">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{score.score}</TableCell>
                      <TableCell>{score.category}</TableCell>
                      <TableCell>
                        {new Date(score.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* AFFICHAGE MOBILE (CARTES) */}
            <div className="block md:hidden">
              {scores.map((score, index) => (
                <div
                  key={score.id}
                  className="p-4 border-2 border-text rounded-lg mb-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">#{index + 1}</span>
                  </div>
                  <p className="text-xs mt-1">Catégorie: {score.category}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="font-semibold">Score: {score.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </FADE_DOWN_ANIMATION_VARIANTS>
  );
}
