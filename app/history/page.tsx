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

export default function HistoryPage() {
  const { data: scores = [], isLoading, error } = useUserScores();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Une erreur est survenue: {(error as Error).message}</div>;
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
