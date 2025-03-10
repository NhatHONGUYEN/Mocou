"use client";

import Image from "next/image";
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
import { useLeaderboardScores } from "@/hooks/useLeaderboardScores";
import FADE_DOWN_ANIMATION_VARIANTS from "../../animation/FADE_DOWN_ANIMATION_VARIANTS";

export default function LeaderboardPage() {
  const { data: scores = [], isLoading, error } = useLeaderboardScores();

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
          Les champions de Mocou - Qui sera au sommet ? 🔝
        </h1>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Notre hall de la renommée 🏅{" "}
            </h2>
          </CardHeader>
          <CardContent>
            {/* TABLEAU RESPONSIVE */}
            <div className="overflow-x-auto hidden md:block">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Catégorie
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scores.slice(0, 10).map((score, index) => (
                    <TableRow key={score.id} className="hover:bg-bg">
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
                      <TableCell className="hidden md:table-cell">
                        {score.category}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
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
                  <div className="flex gap-4 items-center">
                    <p className="font-bold">
                      {score.user.name || score.user.email}
                    </p>
                    <span>#{index + 1}</span>
                  </div>
                  <p className="text-xs mt-1">{score.category}</p>
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
