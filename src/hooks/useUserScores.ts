// hooks/useUserScores.ts
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type ScoreWithUser = {
  id: string;
  userId: string;
  score: number;
  category: string;
  createdAt: string;
};

const fetchUserScores = async (userId: string): Promise<ScoreWithUser[]> => {
  if (!userId) return [];

  const response = await fetch(`/api/scores?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des scores");
  }
  return response.json();
};

export function useUserScores() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["scores", userId],
    queryFn: () => fetchUserScores(userId!),
    enabled: !!userId, // Only run query if userId exists
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
