import { useQuery } from "@tanstack/react-query";

async function fetchWordList(category: string) {
  const response = await fetch(`/api/word?category=${category}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useWordList(category: string) {
  return useQuery({
    queryKey: ["wordList", category],
    queryFn: () => fetchWordList(category),
  });
}
