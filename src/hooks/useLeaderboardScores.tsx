import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export interface ScoreWithUser {
  id: string;
  userId: string;
  score: number;
  category: string;
  createdAt: string;
  user: User;
}

/**
 * Custom hook to fetch leaderboard scores
 */
export function useLeaderboardScores() {
  return useQuery<ScoreWithUser[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response = await fetch("/api/scores");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des scores");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
